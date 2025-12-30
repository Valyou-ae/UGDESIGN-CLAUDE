/**
 * ENHANCED DESIGN COMPOSITOR SERVICE
 * Smart Object-level mockup compositing with:
 * - TRUE perspective warping via ImageMagick -distort Perspective
 * - Luminance map extraction for realistic lighting integration  
 * - Multiply/overlay blend modes for fabric bonding
 * - Product-specific print zones with curvature profiles
 */

import sharp from 'sharp';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, unlink, readFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { logger } from '../logger';
import { getDistortionParams, type DistortionParameters } from './knowledge/distortionPhysics';

const execAsync = promisify(exec);

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
  curvature: CurvatureProfile;
}

interface CurvatureProfile {
  type: 'flat' | 'cylindrical' | 'torso';
  intensity: number;
  topShrink: number;
  bottomShrink: number;
  centerBulge: number;
}

interface QuadCorners {
  topLeft: { x: number; y: number };
  topRight: { x: number; y: number };
  bottomLeft: { x: number; y: number };
  bottomRight: { x: number; y: number };
}

interface LuminanceMap {
  brightness: number;
  contrast: number;
  shadowIntensity: number;
  highlightIntensity: number;
  gradientDirection: 'left' | 'right' | 'center' | 'uniform';
}

const PRODUCT_CURVATURE_PROFILES: Record<string, CurvatureProfile> = {
  'tshirt': { type: 'torso', intensity: 0.15, topShrink: 0.03, bottomShrink: 0.02, centerBulge: 0.08 },
  'hoodie': { type: 'torso', intensity: 0.12, topShrink: 0.04, bottomShrink: 0.03, centerBulge: 0.06 },
  'sweatshirt': { type: 'torso', intensity: 0.12, topShrink: 0.03, bottomShrink: 0.02, centerBulge: 0.07 },
  'tank': { type: 'torso', intensity: 0.18, topShrink: 0.02, bottomShrink: 0.01, centerBulge: 0.10 },
  'longsleeve': { type: 'torso', intensity: 0.14, topShrink: 0.03, bottomShrink: 0.02, centerBulge: 0.07 },
  'polo': { type: 'torso', intensity: 0.13, topShrink: 0.03, bottomShrink: 0.02, centerBulge: 0.06 },
  'mug': { type: 'cylindrical', intensity: 0.25, topShrink: 0.10, bottomShrink: 0.10, centerBulge: 0.15 },
  'bottle': { type: 'cylindrical', intensity: 0.20, topShrink: 0.08, bottomShrink: 0.08, centerBulge: 0.12 },
  'default': { type: 'flat', intensity: 0.05, topShrink: 0.01, bottomShrink: 0.01, centerBulge: 0.02 }
};

const ANGLE_PLACEMENT_CONFIG: Record<string, { 
  xOffset: number; yOffset: number; 
  widthRatio: number; heightRatio: number;
  perspectiveSkew: number; rotation: number;
  curvatureMultiplier: number;
}> = {
  'front': { xOffset: 0.25, yOffset: 0.20, widthRatio: 0.50, heightRatio: 0.38, perspectiveSkew: 0, rotation: 0, curvatureMultiplier: 1.0 },
  'three-quarter': { xOffset: 0.18, yOffset: 0.20, widthRatio: 0.42, heightRatio: 0.36, perspectiveSkew: 18, rotation: -4, curvatureMultiplier: 1.3 },
  'side': { xOffset: 0.12, yOffset: 0.22, widthRatio: 0.22, heightRatio: 0.32, perspectiveSkew: 40, rotation: -10, curvatureMultiplier: 1.8 },
  'closeup': { xOffset: 0.12, yOffset: 0.08, widthRatio: 0.76, heightRatio: 0.65, perspectiveSkew: 0, rotation: 0, curvatureMultiplier: 0.8 }
};

function getCurvatureProfile(productName: string): CurvatureProfile {
  const normalized = productName.toLowerCase().replace(/[^a-z]/g, '');
  for (const [key, profile] of Object.entries(PRODUCT_CURVATURE_PROFILES)) {
    if (normalized.includes(key)) {
      return profile;
    }
  }
  return PRODUCT_CURVATURE_PROFILES['default'];
}

function getPlacementForAngle(
  imageWidth: number,
  imageHeight: number,
  angle: 'front' | 'three-quarter' | 'side' | 'closeup',
  params: DistortionParameters,
  productName: string
): PlacementRegion {
  const config = ANGLE_PLACEMENT_CONFIG[angle];
  const printWidthRatio = params.printWidthInches / 14;
  const curvature = getCurvatureProfile(productName);
  
  const adjustedCurvature: CurvatureProfile = {
    ...curvature,
    intensity: curvature.intensity * config.curvatureMultiplier,
    topShrink: curvature.topShrink * config.curvatureMultiplier,
    bottomShrink: curvature.bottomShrink * config.curvatureMultiplier,
    centerBulge: curvature.centerBulge * config.curvatureMultiplier
  };
  
  return {
    x: imageWidth * config.xOffset,
    y: imageHeight * config.yOffset,
    width: imageWidth * config.widthRatio * printWidthRatio,
    height: imageHeight * config.heightRatio * printWidthRatio,
    perspectiveSkew: config.perspectiveSkew,
    rotationDeg: config.rotation,
    curvature: adjustedCurvature
  };
}

function calculateQuadCorners(placement: PlacementRegion): QuadCorners {
  const { x, y, width, height, perspectiveSkew, curvature } = placement;
  
  const skewRad = (perspectiveSkew * Math.PI) / 180;
  const horizontalOffset = Math.sin(skewRad) * height * 0.3;
  
  const topShrinkPx = width * curvature.topShrink;
  const bottomShrinkPx = width * curvature.bottomShrink;
  
  const perspectiveTaper = perspectiveSkew > 0 ? (perspectiveSkew / 100) * 0.15 : 0;
  const farSideShrink = width * perspectiveTaper;
  
  return {
    topLeft: { 
      x: x + topShrinkPx, 
      y: y 
    },
    topRight: { 
      x: x + width - topShrinkPx - farSideShrink, 
      y: y + (perspectiveSkew > 0 ? horizontalOffset * 0.3 : 0)
    },
    bottomLeft: { 
      x: x + bottomShrinkPx, 
      y: y + height 
    },
    bottomRight: { 
      x: x + width - bottomShrinkPx - farSideShrink * 1.2, 
      y: y + height - (perspectiveSkew > 0 ? horizontalOffset * 0.2 : 0)
    }
  };
}

async function applyPerspectiveWarpWithImageMagick(
  designBuffer: Buffer,
  placement: PlacementRegion,
  quadCorners: QuadCorners
): Promise<{ buffer: Buffer; offsetX: number; offsetY: number }> {
  const { width, height, rotationDeg, curvature, perspectiveSkew } = placement;
  const targetWidth = Math.round(width);
  const targetHeight = Math.round(height);
  
  let baseDesign = await sharp(designBuffer)
    .resize(targetWidth, targetHeight, { 
      fit: 'fill',
      kernel: 'lanczos3'
    })
    .png()
    .toBuffer();
  
  if (rotationDeg !== 0) {
    baseDesign = await sharp(baseDesign)
      .rotate(rotationDeg, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  }
  
  const baseMeta = await sharp(baseDesign).metadata();
  const baseWidth = baseMeta.width || targetWidth;
  const baseHeight = baseMeta.height || targetHeight;
  
  if (perspectiveSkew <= 0 && curvature.type === 'flat') {
    return { buffer: baseDesign, offsetX: 0, offsetY: 0 };
  }
  
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 8);
  const inputPath = join(tmpdir(), `design_input_${timestamp}_${random}.png`);
  const outputPath = join(tmpdir(), `design_output_${timestamp}_${random}.png`);
  
  try {
    await writeFile(inputPath, baseDesign);
    
    const srcTopLeft = { x: 0, y: 0 };
    const srcTopRight = { x: baseWidth, y: 0 };
    const srcBottomLeft = { x: 0, y: baseHeight };
    const srcBottomRight = { x: baseWidth, y: baseHeight };
    
    const minX = Math.min(
      quadCorners.topLeft.x, 
      quadCorners.topRight.x, 
      quadCorners.bottomLeft.x, 
      quadCorners.bottomRight.x
    );
    const minY = Math.min(
      quadCorners.topLeft.y, 
      quadCorners.topRight.y, 
      quadCorners.bottomLeft.y, 
      quadCorners.bottomRight.y
    );
    
    const dstTopLeft = { 
      x: quadCorners.topLeft.x - minX, 
      y: quadCorners.topLeft.y - minY 
    };
    const dstTopRight = { 
      x: quadCorners.topRight.x - minX, 
      y: quadCorners.topRight.y - minY 
    };
    const dstBottomLeft = { 
      x: quadCorners.bottomLeft.x - minX, 
      y: quadCorners.bottomLeft.y - minY 
    };
    const dstBottomRight = { 
      x: quadCorners.bottomRight.x - minX, 
      y: quadCorners.bottomRight.y - minY 
    };
    
    if (curvature.type === 'torso' && curvature.centerBulge > 0) {
      const bulgeAmount = curvature.centerBulge * baseWidth * 0.1;
      const midY = (dstTopLeft.y + dstBottomLeft.y) / 2;
      dstTopLeft.x -= bulgeAmount * 0.3;
      dstTopRight.x += bulgeAmount * 0.3;
      dstBottomLeft.x -= bulgeAmount * 0.3;
      dstBottomRight.x += bulgeAmount * 0.3;
    }
    
    const perspectiveArgs = [
      `${srcTopLeft.x},${srcTopLeft.y}`,
      `${dstTopLeft.x},${dstTopLeft.y}`,
      `${srcTopRight.x},${srcTopRight.y}`,
      `${dstTopRight.x},${dstTopRight.y}`,
      `${srcBottomRight.x},${srcBottomRight.y}`,
      `${dstBottomRight.x},${dstBottomRight.y}`,
      `${srcBottomLeft.x},${srcBottomLeft.y}`,
      `${dstBottomLeft.x},${dstBottomLeft.y}`
    ].join(' ');
    
    const command = `convert "${inputPath}" -alpha set -virtual-pixel transparent -distort Perspective "${perspectiveArgs}" "${outputPath}"`;
    
    logger.info("Executing ImageMagick perspective transform", { 
      source: "designCompositor",
      command: command.substring(0, 200) + "..."
    });
    
    await execAsync(command, { timeout: 30000 });
    
    const warpedBuffer = await readFile(outputPath);
    
    await Promise.all([
      unlink(inputPath).catch(() => {}),
      unlink(outputPath).catch(() => {})
    ]);
    
    const warpedMeta = await sharp(warpedBuffer).metadata();
    
    logger.info("ImageMagick perspective transform completed", { 
      source: "designCompositor",
      inputSize: { width: baseWidth, height: baseHeight },
      outputSize: { width: warpedMeta.width, height: warpedMeta.height },
      normalizedOffset: { x: minX, y: minY }
    });
    
    return { buffer: warpedBuffer, offsetX: Math.round(minX), offsetY: Math.round(minY) };
    
  } catch (error) {
    logger.warn("ImageMagick perspective transform failed, falling back to Sharp", { 
      source: "designCompositor",
      error: error instanceof Error ? error.message : String(error)
    });
    
    await Promise.all([
      unlink(inputPath).catch(() => {}),
      unlink(outputPath).catch(() => {})
    ]);
    
    return applyFallbackPerspectiveWarp(baseDesign, placement, quadCorners, baseWidth, baseHeight);
  }
}

async function applyFallbackPerspectiveWarp(
  baseDesign: Buffer,
  placement: PlacementRegion,
  quadCorners: QuadCorners,
  baseWidth: number,
  baseHeight: number
): Promise<{ buffer: Buffer; offsetX: number; offsetY: number }> {
  const { curvature, perspectiveSkew } = placement;
  
  const minX = Math.min(
    quadCorners.topLeft.x, 
    quadCorners.topRight.x, 
    quadCorners.bottomLeft.x, 
    quadCorners.bottomRight.x
  );
  const minY = Math.min(
    quadCorners.topLeft.y, 
    quadCorners.topRight.y, 
    quadCorners.bottomLeft.y, 
    quadCorners.bottomRight.y
  );
  
  const topWidth = Math.abs(quadCorners.topRight.x - quadCorners.topLeft.x);
  const bottomWidth = Math.abs(quadCorners.bottomRight.x - quadCorners.bottomLeft.x);
  
  const numStrips = Math.min(Math.max(Math.round(baseHeight / 3), 30), 100);
  const stripHeight = Math.ceil(baseHeight / numStrips);
  
  const strips: { input: Buffer; left: number; top: number }[] = [];
  const maxWidth = Math.max(topWidth, bottomWidth) * 1.1;
  
  for (let i = 0; i < numStrips; i++) {
    const y = i * stripHeight;
    const actualStripHeight = Math.min(stripHeight, baseHeight - y);
    
    if (actualStripHeight <= 0) break;
    
    const progress = (y + actualStripHeight / 2) / baseHeight;
    const stripWidth = topWidth + (bottomWidth - topWidth) * progress;
    
    let curvatureOffset = 0;
    if (curvature.type === 'torso' || curvature.type === 'cylindrical') {
      const centerProgress = Math.abs(progress - 0.5) * 2;
      curvatureOffset = (1 - centerProgress) * curvature.centerBulge * baseWidth * 0.15;
    }
    
    const finalStripWidth = Math.max(10, Math.round(stripWidth + curvatureOffset));
    
    try {
      const stripBuffer = await sharp(baseDesign)
        .extract({ left: 0, top: y, width: baseWidth, height: actualStripHeight })
        .resize(finalStripWidth, actualStripHeight, { fit: 'fill' })
        .png()
        .toBuffer();
      
      const leftOffset = Math.round((maxWidth - finalStripWidth) / 2);
      const leftEdgeShift = (quadCorners.bottomLeft.x - quadCorners.topLeft.x) * progress;
      const horizontalShift = Math.round(leftEdgeShift * 0.5);
      
      strips.push({
        input: stripBuffer,
        left: Math.max(0, leftOffset + horizontalShift),
        top: y
      });
    } catch (err) {
      logger.warn("Strip extraction failed", { source: "designCompositor", strip: i });
    }
  }
  
  if (strips.length === 0) {
    return { buffer: baseDesign, offsetX: Math.round(minX), offsetY: Math.round(minY) };
  }
  
  const canvasWidth = Math.round(maxWidth * 1.3);
  const canvasHeight = baseHeight;
  
  const warpedBuffer = await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite(strips.map(strip => ({
      input: strip.input,
      left: Math.max(0, strip.left),
      top: Math.max(0, strip.top),
      blend: 'over' as const
    })))
    .png()
    .toBuffer();
  
  let trimOffsetLeft = 0;
  let trimOffsetTop = 0;
  let finalBuffer: Buffer;
  
  try {
    const trimResult = await sharp(warpedBuffer)
      .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 })
      .toBuffer({ resolveWithObject: true });
    
    finalBuffer = trimResult.data;
    
    const originalMeta = await sharp(warpedBuffer).metadata();
    const originalWidth = originalMeta.width || canvasWidth;
    const originalHeight = originalMeta.height || canvasHeight;
    
    trimOffsetLeft = Math.round((originalWidth - trimResult.info.width) / 2);
    trimOffsetTop = Math.round((originalHeight - trimResult.info.height) / 2);
    
    if (trimResult.info.trimOffsetLeft !== undefined) {
      trimOffsetLeft = -trimResult.info.trimOffsetLeft;
    }
    if (trimResult.info.trimOffsetTop !== undefined) {
      trimOffsetTop = -trimResult.info.trimOffsetTop;
    }
  } catch {
    finalBuffer = warpedBuffer;
    trimOffsetLeft = 0;
    trimOffsetTop = 0;
  }
  
  const minStripLeft = strips.length > 0 ? Math.min(...strips.map(s => s.left)) : 0;
  
  return { 
    buffer: finalBuffer, 
    offsetX: Math.round(minX) + minStripLeft,
    offsetY: Math.round(minY)
  };
}

async function extractShadowMask(
  garmentBuffer: Buffer,
  placement: PlacementRegion
): Promise<Buffer> {
  const garmentMeta = await sharp(garmentBuffer).metadata();
  const imgWidth = garmentMeta.width || 1024;
  const imgHeight = garmentMeta.height || 1024;
  
  const safeX = Math.max(0, Math.min(Math.round(placement.x), imgWidth - 10));
  const safeY = Math.max(0, Math.min(Math.round(placement.y), imgHeight - 10));
  const safeWidth = Math.min(Math.round(placement.width), imgWidth - safeX);
  const safeHeight = Math.min(Math.round(placement.height), imgHeight - safeY);
  
  if (safeWidth < 10 || safeHeight < 10) {
    return sharp({
      create: {
        width: Math.round(placement.width) || 100,
        height: Math.round(placement.height) || 100,
        channels: 4,
        background: { r: 128, g: 128, b: 128, alpha: 255 }
      }
    }).png().toBuffer();
  }
  
  const shadowMask = await sharp(garmentBuffer)
    .extract({
      left: safeX,
      top: safeY,
      width: safeWidth,
      height: safeHeight
    })
    .greyscale()
    .normalize()
    .modulate({ brightness: 1.1 })
    .blur(2)
    .png()
    .toBuffer();
  
  return shadowMask;
}

async function extractLuminanceMap(
  garmentBuffer: Buffer,
  placement: PlacementRegion
): Promise<LuminanceMap> {
  const garmentMeta = await sharp(garmentBuffer).metadata();
  const imgWidth = garmentMeta.width || 1024;
  const imgHeight = garmentMeta.height || 1024;
  
  const safeX = Math.max(0, Math.min(Math.round(placement.x), imgWidth - 10));
  const safeY = Math.max(0, Math.min(Math.round(placement.y), imgHeight - 10));
  const safeWidth = Math.min(Math.round(placement.width), imgWidth - safeX);
  const safeHeight = Math.min(Math.round(placement.height), imgHeight - safeY);
  
  if (safeWidth < 10 || safeHeight < 10) {
    return {
      brightness: 0.5,
      contrast: 0.3,
      shadowIntensity: 0.2,
      highlightIntensity: 0.2,
      gradientDirection: 'uniform'
    };
  }
  
  const region = await sharp(garmentBuffer)
    .extract({
      left: safeX,
      top: safeY,
      width: safeWidth,
      height: safeHeight
    })
    .resize(50, 50, { fit: 'fill' })
    .greyscale()
    .raw()
    .toBuffer();
  
  const pixels = new Uint8Array(region);
  const totalPixels = pixels.length;
  
  let sum = 0;
  let minVal = 255;
  let maxVal = 0;
  
  for (let i = 0; i < totalPixels; i++) {
    sum += pixels[i];
    if (pixels[i] < minVal) minVal = pixels[i];
    if (pixels[i] > maxVal) maxVal = pixels[i];
  }
  
  const avgBrightness = sum / totalPixels / 255;
  const contrast = (maxVal - minVal) / 255;
  
  let shadowCount = 0;
  let highlightCount = 0;
  for (let i = 0; i < totalPixels; i++) {
    if (pixels[i] < 80) shadowCount++;
    if (pixels[i] > 200) highlightCount++;
  }
  
  const shadowIntensity = shadowCount / totalPixels;
  const highlightIntensity = highlightCount / totalPixels;
  
  let leftSum = 0;
  let rightSum = 0;
  const rowSize = 50;
  for (let row = 0; row < 50; row++) {
    for (let col = 0; col < 25; col++) {
      leftSum += pixels[row * rowSize + col];
    }
    for (let col = 25; col < 50; col++) {
      rightSum += pixels[row * rowSize + col];
    }
  }
  
  const leftAvg = leftSum / (50 * 25);
  const rightAvg = rightSum / (50 * 25);
  const gradientDiff = Math.abs(leftAvg - rightAvg);
  
  let gradientDirection: 'left' | 'right' | 'center' | 'uniform' = 'uniform';
  if (gradientDiff > 20) {
    gradientDirection = leftAvg > rightAvg ? 'left' : 'right';
  } else if (shadowIntensity > 0.3 || highlightIntensity > 0.3) {
    gradientDirection = 'center';
  }
  
  return {
    brightness: avgBrightness,
    contrast,
    shadowIntensity,
    highlightIntensity,
    gradientDirection
  };
}

async function createLightingOverlay(
  width: number,
  height: number,
  luminance: LuminanceMap
): Promise<Buffer> {
  const centerX = width / 2;
  const centerY = height / 2;
  
  const shadowOpacity = Math.round(luminance.shadowIntensity * 80);
  const highlightOpacity = Math.round(luminance.highlightIntensity * 40);
  
  let gradientSvg: string;
  
  if (luminance.gradientDirection === 'left') {
    gradientSvg = `
      <svg width="${width}" height="${height}">
        <defs>
          <linearGradient id="lightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:${highlightOpacity / 255}" />
            <stop offset="50%" style="stop-color:rgb(128,128,128);stop-opacity:0" />
            <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:${shadowOpacity / 255}" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#lightGrad)" />
      </svg>
    `;
  } else if (luminance.gradientDirection === 'right') {
    gradientSvg = `
      <svg width="${width}" height="${height}">
        <defs>
          <linearGradient id="lightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(0,0,0);stop-opacity:${shadowOpacity / 255}" />
            <stop offset="50%" style="stop-color:rgb(128,128,128);stop-opacity:0" />
            <stop offset="100%" style="stop-color:rgb(255,255,255);stop-opacity:${highlightOpacity / 255}" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#lightGrad)" />
      </svg>
    `;
  } else if (luminance.gradientDirection === 'center') {
    gradientSvg = `
      <svg width="${width}" height="${height}">
        <defs>
          <radialGradient id="lightGrad" cx="50%" cy="45%" r="60%">
            <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:${highlightOpacity / 255}" />
            <stop offset="60%" style="stop-color:rgb(128,128,128);stop-opacity:0" />
            <stop offset="100%" style="stop-color:rgb(0,0,0);stop-opacity:${shadowOpacity / 255}" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#lightGrad)" />
      </svg>
    `;
  } else {
    const uniformBrightness = Math.round(128 + (luminance.brightness - 0.5) * 60);
    gradientSvg = `
      <svg width="${width}" height="${height}">
        <rect width="100%" height="100%" fill="rgb(${uniformBrightness},${uniformBrightness},${uniformBrightness})" opacity="0.15" />
      </svg>
    `;
  }
  
  return Buffer.from(gradientSvg);
}

async function applyLightingToDesign(
  designBuffer: Buffer,
  luminance: LuminanceMap
): Promise<Buffer> {
  const meta = await sharp(designBuffer).metadata();
  const width = meta.width || 100;
  const height = meta.height || 100;
  
  const brightnessAdjust = 1 + (luminance.brightness - 0.5) * 0.4;
  const saturationAdjust = 1 - luminance.shadowIntensity * 0.15;
  
  let adjustedDesign = sharp(designBuffer)
    .modulate({
      brightness: Math.max(0.7, Math.min(1.3, brightnessAdjust)),
      saturation: Math.max(0.8, Math.min(1.1, saturationAdjust))
    });
  
  if (luminance.contrast > 0.4) {
    adjustedDesign = adjustedDesign.linear(
      1 + (luminance.contrast - 0.4) * 0.3,
      -(luminance.contrast - 0.4) * 20
    );
  }
  
  const designWithLighting = await adjustedDesign.png().toBuffer();
  
  if (luminance.gradientDirection !== 'uniform') {
    const lightingOverlay = await createLightingOverlay(width, height, luminance);
    
    return sharp(designWithLighting)
      .composite([{
        input: await sharp(lightingOverlay).png().toBuffer(),
        blend: 'soft-light'
      }])
      .png()
      .toBuffer();
  }
  
  return designWithLighting;
}

export async function compositeDesignOntoGarment(options: CompositeOptions): Promise<CompositeResult> {
  const { designBase64, blankGarmentBase64, productName, cameraAngle } = options;
  
  try {
    logger.info("Starting enhanced design composition", { 
      source: "designCompositor", 
      productName, 
      cameraAngle 
    });
    
    const garmentBuffer = Buffer.from(blankGarmentBase64, 'base64');
    const designBuffer = Buffer.from(designBase64, 'base64');
    
    const garmentMeta = await sharp(garmentBuffer).metadata();
    const imageWidth = garmentMeta.width || 1024;
    const imageHeight = garmentMeta.height || 1024;
    
    const distortionParams = getDistortionParams(productName);
    const placement = getPlacementForAngle(imageWidth, imageHeight, cameraAngle, distortionParams, productName);
    
    const quadCorners = calculateQuadCorners(placement);
    
    logger.info("Calculated placement region", { 
      source: "designCompositor",
      placement: {
        x: placement.x,
        y: placement.y,
        width: placement.width,
        height: placement.height,
        perspectiveSkew: placement.perspectiveSkew,
        curvatureType: placement.curvature.type
      },
      quadCorners
    });
    
    const { buffer: warpedDesign, offsetX, offsetY } = await applyPerspectiveWarpWithImageMagick(designBuffer, placement, quadCorners);
    const warpedMeta = await sharp(warpedDesign).metadata();
    
    logger.info("Perspective warp applied", { 
      source: "designCompositor",
      originalSize: { width: placement.width, height: placement.height },
      warpedSize: { width: warpedMeta.width, height: warpedMeta.height },
      offset: { x: offsetX, y: offsetY }
    });
    
    const luminance = await extractLuminanceMap(garmentBuffer, placement);
    const shadowMask = await extractShadowMask(garmentBuffer, placement);
    
    logger.info("Luminance and shadow mask extracted", { 
      source: "designCompositor",
      luminance
    });
    
    const litDesign = await applyLightingToDesign(warpedDesign, luminance);
    const litMeta = await sharp(litDesign).metadata();
    const litWidth = litMeta.width || 100;
    const litHeight = litMeta.height || 100;
    
    const resizedShadowMask = await sharp(shadowMask)
      .resize(litWidth, litHeight, { fit: 'fill' })
      .png()
      .toBuffer();
    
    const designWithShadows = await sharp(litDesign)
      .composite([{
        input: resizedShadowMask,
        blend: 'multiply'
      }])
      .png()
      .toBuffer();
    
    const compositeX = offsetX;
    const compositeY = offsetY;
    
    const composited = await sharp(garmentBuffer)
      .composite([{
        input: designWithShadows,
        left: Math.max(0, compositeX),
        top: Math.max(0, compositeY),
        blend: 'over'
      }])
      .png()
      .toBuffer();
    
    const compositedBase64 = composited.toString('base64');
    
    logger.info("Enhanced design composition completed successfully", { 
      source: "designCompositor",
      finalPosition: { x: compositeX, y: compositeY },
      luminanceApplied: luminance.gradientDirection !== 'uniform'
    });
    
    return {
      composited: compositedBase64,
      success: true
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error("Design composition failed", { 
      source: "designCompositor", 
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    });
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
  hasColorReference?: boolean;
}): string {
  const productInfo = renderSpec.productDescription || "t-shirt";
  const personaInfo = renderSpec.personaDescription || "";
  const materialInfo = renderSpec.materialDescription || "";
  const lightingInfo = renderSpec.lightingDescription || "natural lighting";
  const environmentInfo = renderSpec.environmentDescription || "lifestyle setting";
  const cameraInfo = renderSpec.cameraDescription || "front view";
  const humanRealism = renderSpec.humanRealismDescription || "";
  const negatives = renderSpec.negativePrompts || "";
  const hasColorRef = renderSpec.hasColorReference || false;
  
  // Extract color info from productDescription for color matching
  const colorMatch = productInfo.match(/Color:\s*([^(]+)\s*\(([^)]+)\)/);
  const colorName = colorMatch ? colorMatch[1].trim() : "";
  const colorHex = colorMatch ? colorMatch[2].trim() : "";
  
  // Extract product type from productDescription for explicit lock
  const productMatch = productInfo.match(/Product:\s*([^|]+)/);
  const productType = productMatch ? productMatch[1].trim() : "t-shirt";
  
  const productTypeLockBlock = hasColorRef ? `

🔴 PRODUCT TYPE LOCK (MANDATORY):
- Garment type: ${productType}
- This product type is NON-NEGOTIABLE
- If a reference image is provided, it shows COLOR and STYLE only
- DO NOT copy the garment type from the reference if it differs
- DO NOT substitute (e.g., short-sleeve for long-sleeve, tank for t-shirt)
- The product type MUST be: ${productType}
` : "";
  
  const colorReferenceBlock = hasColorRef ? `

===== COLOR CONSISTENCY REQUIREMENT (CRITICAL) =====
[MANDATORY - EXACT COLOR MATCH REQUIRED]

A reference image has been provided that shows the EXACT target garment color.

⚠️ STRICT COLOR MATCHING PROTOCOL:
1. VISUAL REFERENCE PRIORITY: The reference image shows the EXACT ${colorName} color you must match
2. SAMPLE RGB VALUES: Extract the garment color RGB values from the reference image
3. REPRODUCE EXACTLY: The garment in this render must use the SAME RGB values as the reference
4. MATCH ALL ASPECTS:
   - Base color (RGB values)
   - Color temperature (warm/cool undertones)
   - Saturation level
   - Brightness/value
   - Fabric texture appearance under lighting

⚠️ CRITICAL RULES:
- DO NOT interpret "${colorName}" as text - use the VISUAL REFERENCE ONLY
- DO NOT create a different shade (lighter, darker, or different hue)
- DO NOT introduce color drift or variation
- The color must be PIXEL-IDENTICAL to the reference garment color
- Lighting effects (shadows/highlights) are OK, but base color must match exactly

⚠️ WHAT TO AVOID (NEGATIVE PROMPTS FOR COLOR):
- Different shade than reference image
- Lighter or darker base color than reference
- Different hue (e.g., blue-gray when reference is warm-gray)
- Inconsistent color temperature
- Color drift or color variation
- Reinterpreting the color name instead of matching the visual

✅ SUCCESS CRITERIA:
The garment color in this image must be INDISTINGUISHABLE from the reference image color.
When placed side-by-side, the colors should appear identical.

===== END COLOR CONSISTENCY REQUIREMENT =====` : "";
  
  return `TASK: PHOTOREALISTIC BLANK GARMENT RENDER FOR DESIGN COMPOSITING

You are a photorealistic rendering engine. Generate a mockup photograph of a model wearing a BLANK, UNPRINTED garment.

===== CRITICAL REQUIREMENT =====
${hasColorRef ? `🔴🔴🔴 EXTREMELY IMPORTANT - READ CAREFULLY 🔴🔴🔴

You are being shown a REFERENCE IMAGE that has artwork/design on the garment.
YOUR TASK: Generate the SAME garment but COMPLETELY BLANK (no design).

⚠️ DO NOT COPY THE DESIGN FROM THE REFERENCE:
- The reference image shows artwork/text/graphics on the chest
- You MUST generate the SAME garment WITHOUT any artwork/text/graphics
- The garment must be SOLID COLOR with NO design whatsoever
- This is a BLANK TEMPLATE that will have design added later

🚫 CRITICAL VIOLATIONS TO AVOID:
- Copying the design/text/artwork from the reference image
- Generating ANY text, graphics, or patterns on the garment
- Adding decorations, logos, or designs of any kind

✅ WHAT TO COPY FROM REFERENCE:
- Garment color (exact RGB match)
- Model identity (same person)
- Lighting and background style
- Camera angle and photography style

✅ WHAT NOT TO COPY FROM REFERENCE:
- The design/artwork/text on the chest ← DO NOT COPY THIS
- Any graphics or patterns on the garment ← DO NOT COPY THIS

The garment MUST be COMPLETELY BLANK - just solid colored fabric with no designs.

===== END CRITICAL REQUIREMENT =====` : `The garment must be COMPLETELY BLANK - NO design, NO artwork, NO graphics, NO text, NO patterns.
Just a solid-colored garment with realistic fabric folds, creases, and lighting.`}

IMPORTANT: The chest/print area should be clearly visible and well-lit for design compositing.

===== GARMENT SPECIFICATION =====
${productInfo}
${materialInfo ? `Material: ${materialInfo}` : ''}
${productTypeLockBlock}
${colorReferenceBlock}

The garment should show:
- Natural fabric folds and creases from wear
- Realistic draping over body contours
- Visible fabric texture with appropriate lighting
- Clear definition of the print area (chest region for shirts)
- Proper shadows that define the garment's 3D form

===== MODEL SPECIFICATION =====
${personaInfo ? personaInfo : 'Generate an appropriate model for the garment.'}
${humanRealism ? `\n${humanRealism}` : ''}

===== SCENE & CAMERA =====
Environment: ${environmentInfo}
Lighting: ${lightingInfo}
Camera: ${cameraInfo}

${hasColorRef ? `⚠️ CAMERA ANGLE PRIORITY:
If a reference image was provided, you MUST use the camera angle specified above (${cameraInfo}).
DO NOT copy the camera angle from the reference image - it may be different.
The reference is ONLY for color, lighting, and model identity matching.
` : ''}
Ensure the lighting clearly defines:
- The curvature of the torso/chest area
- Natural shadows in fabric folds
- Consistent light direction across the garment

===== NEGATIVE PROMPT =====
${negatives}

any design, any artwork, any text, any graphics, any pattern on garment, printed garment,
logo, brand name, illustration, picture on shirt, decorated garment, embroidery, patches

===== OUTPUT =====
Generate a single photorealistic photograph of the model wearing a COMPLETELY BLANK, solid-color garment with no designs or artwork whatsoever. The garment should have clearly visible fabric texture and lighting that will allow a design to be composited realistically.`;
}
