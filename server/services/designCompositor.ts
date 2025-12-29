/**
 * DESIGN COMPOSITOR SERVICE
 * Two-stage mockup pipeline: Generate blank garments, then composite exact design
 * This ensures the design is preserved pixel-perfect across all angles
 */

import sharp from 'sharp';
import { logger } from '../logger';
import { getDistortionParams, type DistortionParameters } from './knowledge/distortionPhysics';

interface CompositeOptions {
  designBase64: string;
  blankGarmentBase64: string;
  productName: string;
  cameraAngle: 'front' | 'three-quarter' | 'side' | 'closeup';
  printWidthPercent?: number;
  printTopPercent?: number;
}

interface CompositeResult {
  composited: string;
  success: boolean;
  error?: string;
}

interface PlacementRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  perspectiveSkew: number;
  rotationDeg: number;
}

function getPlacementForAngle(
  imageWidth: number,
  imageHeight: number,
  angle: 'front' | 'three-quarter' | 'side' | 'closeup',
  params: DistortionParameters
): PlacementRegion {
  const printWidthRatio = params.printWidthInches / 14;
  
  switch (angle) {
    case 'front':
      return {
        x: imageWidth * 0.25,
        y: imageHeight * 0.22,
        width: imageWidth * 0.5 * printWidthRatio,
        height: imageHeight * 0.35 * printWidthRatio,
        perspectiveSkew: 0,
        rotationDeg: 0
      };
    case 'three-quarter':
      return {
        x: imageWidth * 0.20,
        y: imageHeight * 0.22,
        width: imageWidth * 0.45 * printWidthRatio,
        height: imageHeight * 0.35 * printWidthRatio,
        perspectiveSkew: 15,
        rotationDeg: -3
      };
    case 'side':
      return {
        x: imageWidth * 0.15,
        y: imageHeight * 0.24,
        width: imageWidth * 0.25 * printWidthRatio,
        height: imageHeight * 0.30 * printWidthRatio,
        perspectiveSkew: 35,
        rotationDeg: -8
      };
    case 'closeup':
      return {
        x: imageWidth * 0.15,
        y: imageHeight * 0.10,
        width: imageWidth * 0.70 * printWidthRatio,
        height: imageHeight * 0.60 * printWidthRatio,
        perspectiveSkew: 0,
        rotationDeg: 0
      };
    default:
      return {
        x: imageWidth * 0.25,
        y: imageHeight * 0.22,
        width: imageWidth * 0.5,
        height: imageHeight * 0.35,
        perspectiveSkew: 0,
        rotationDeg: 0
      };
  }
}

async function applyPerspectiveTransform(
  designBuffer: Buffer,
  placement: PlacementRegion
): Promise<Buffer> {
  const { width, height, perspectiveSkew, rotationDeg } = placement;
  
  let transformedDesign = sharp(designBuffer)
    .resize(Math.round(width), Math.round(height), { fit: 'fill' });
  
  if (rotationDeg !== 0) {
    transformedDesign = transformedDesign.rotate(rotationDeg, { background: { r: 0, g: 0, b: 0, alpha: 0 } });
  }
  
  if (perspectiveSkew !== 0) {
    const skewFactor = 1 - (perspectiveSkew / 100);
    const newWidth = Math.round(width * skewFactor);
    transformedDesign = transformedDesign.resize(newWidth, Math.round(height), { fit: 'fill' });
  }
  
  return transformedDesign.png().toBuffer();
}

async function extractLightingFromGarment(
  garmentBuffer: Buffer,
  placement: PlacementRegion
): Promise<{ brightness: number; contrast: number }> {
  const region = await sharp(garmentBuffer)
    .extract({
      left: Math.round(placement.x),
      top: Math.round(placement.y),
      width: Math.round(Math.min(placement.width, 100)),
      height: Math.round(Math.min(placement.height, 100))
    })
    .greyscale()
    .raw()
    .toBuffer();
  
  const pixels = new Uint8Array(region);
  let sum = 0;
  for (let i = 0; i < pixels.length; i++) {
    sum += pixels[i];
  }
  const avgBrightness = sum / pixels.length / 255;
  
  let variance = 0;
  for (let i = 0; i < pixels.length; i++) {
    const diff = (pixels[i] / 255) - avgBrightness;
    variance += diff * diff;
  }
  const contrast = Math.sqrt(variance / pixels.length);
  
  return {
    brightness: avgBrightness,
    contrast: Math.min(contrast * 2, 1)
  };
}

export async function compositeDesignOntoGarment(options: CompositeOptions): Promise<CompositeResult> {
  const { designBase64, blankGarmentBase64, productName, cameraAngle } = options;
  
  try {
    logger.info("Starting design composition", { source: "designCompositor", productName, cameraAngle });
    
    const garmentBuffer = Buffer.from(blankGarmentBase64, 'base64');
    const designBuffer = Buffer.from(designBase64, 'base64');
    
    const garmentMeta = await sharp(garmentBuffer).metadata();
    const imageWidth = garmentMeta.width || 1024;
    const imageHeight = garmentMeta.height || 1024;
    
    const distortionParams = getDistortionParams(productName);
    const placement = getPlacementForAngle(imageWidth, imageHeight, cameraAngle, distortionParams);
    
    const transformedDesign = await applyPerspectiveTransform(designBuffer, placement);
    const transformedMeta = await sharp(transformedDesign).metadata();
    
    const lighting = await extractLightingFromGarment(garmentBuffer, placement);
    
    let adjustedDesign = sharp(transformedDesign);
    
    const brightnessAdjust = lighting.brightness - 0.5;
    if (Math.abs(brightnessAdjust) > 0.1) {
      adjustedDesign = adjustedDesign.modulate({
        brightness: 1 + (brightnessAdjust * 0.3)
      });
    }
    
    const finalDesign = await adjustedDesign.png().toBuffer();
    
    const composited = await sharp(garmentBuffer)
      .composite([{
        input: finalDesign,
        left: Math.round(placement.x),
        top: Math.round(placement.y),
        blend: 'over'
      }])
      .png()
      .toBuffer();
    
    const compositedBase64 = composited.toString('base64');
    
    logger.info("Design composition completed", { 
      source: "designCompositor",
      placement,
      lighting,
      designSize: { width: transformedMeta.width, height: transformedMeta.height }
    });
    
    return {
      composited: compositedBase64,
      success: true
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error("Design composition failed", { source: "designCompositor", error: errorMessage });
    return {
      composited: '',
      success: false,
      error: errorMessage
    };
  }
}

export function getBlankGarmentPrompt(renderSpec: {
  productDescription?: string;
  personaDescription?: string;
  materialDescription?: string;
  lightingDescription?: string;
  environmentDescription?: string;
  cameraDescription?: string;
  humanRealismDescription?: string;
  negativePrompts?: string;
}): string {
  const productInfo = renderSpec.productDescription || "t-shirt";
  const personaInfo = renderSpec.personaDescription || "";
  const materialInfo = renderSpec.materialDescription || "";
  const lightingInfo = renderSpec.lightingDescription || "natural lighting";
  const environmentInfo = renderSpec.environmentDescription || "lifestyle setting";
  const cameraInfo = renderSpec.cameraDescription || "front view";
  const humanRealism = renderSpec.humanRealismDescription || "";
  const negatives = renderSpec.negativePrompts || "";
  
  return `TASK: PHOTOREALISTIC BLANK GARMENT RENDER

You are a photorealistic rendering engine. Generate a mockup photograph of a model wearing a BLANK, UNPRINTED garment.

===== CRITICAL REQUIREMENT =====
The garment must be COMPLETELY BLANK - NO design, NO artwork, NO graphics, NO text, NO patterns.
Just a solid-colored garment with realistic fabric folds, creases, and lighting.

===== GARMENT SPECIFICATION =====
${productInfo}
${materialInfo ? `Material: ${materialInfo}` : ''}

The garment should show:
- Natural fabric folds and creases from wear
- Realistic draping over body contours
- Authentic fabric texture visible
- Proper lighting and shadows on fabric surface

===== MODEL SPECIFICATION =====
${personaInfo ? personaInfo : 'Generate an appropriate model for the garment.'}
${humanRealism ? `\n${humanRealism}` : ''}

===== SCENE & CAMERA =====
Environment: ${environmentInfo}
Lighting: ${lightingInfo}
Camera: ${cameraInfo}

===== NEGATIVE PROMPT =====
${negatives}

any design, any artwork, any text, any graphics, any pattern on garment, printed garment,
logo, brand name, illustration, picture on shirt, decorated garment

===== OUTPUT =====
Generate a single photorealistic photograph of the model wearing a COMPLETELY BLANK, solid-color garment with no designs or artwork whatsoever.`;
}
