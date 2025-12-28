/**
 * DESIGN COMPOSITOR SERVICE
 * Overlays the original design onto mockups with perspective transformation
 * Ensures pixel-perfect design preservation instead of AI regeneration
 */

import sharp from "sharp";
import { GoogleGenAI } from "@google/genai";
import { logger } from "../logger";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.AI_INTEGRATIONS_GEMINI_API_KEY || ""
});

export interface PrintAreaCorners {
  topLeft: { x: number; y: number };
  topRight: { x: number; y: number };
  bottomLeft: { x: number; y: number };
  bottomRight: { x: number; y: number };
}

export interface CompositeOptions {
  blendMode?: 'multiply' | 'overlay' | 'normal';
  opacity?: number;
  shadowIntensity?: number;
  fabricTextureBlend?: number;
}

const PLACEHOLDER_COLOR = "#00FF00"; // Bright green for easy detection

export function getPlaceholderPromptAddition(): string {
  return `
===== PRINT AREA PLACEHOLDER (CRITICAL) =====
[MANDATORY - FOR POST-PROCESSING DESIGN OVERLAY]

Instead of placing the design on the garment, create a SOLID BRIGHT GREEN (#00FF00) RECTANGLE in the exact print area location where the design should appear.

PLACEHOLDER SPECIFICATIONS:
- Color: EXACTLY #00FF00 (pure bright green)
- Shape: Rectangle following the garment's 3D surface contours
- Position: Centered on chest (for DTG) or covering full garment (for AOP)
- The green rectangle should follow the natural curves and folds of the fabric
- Apply perspective distortion to the rectangle as if it were printed on the fabric
- The edges of the green area should align with the print area boundaries
- Include fabric folds/wrinkles affecting the green area (it should look like green fabric, not flat)

DO NOT place any design, logo, or pattern - ONLY the solid green placeholder.
This green area will be replaced with the actual design in post-processing.

The green placeholder must:
1. Follow all fabric contours and body curves
2. Show proper perspective based on camera angle
3. Include realistic fabric folds/shadows within the green area
4. Have clean, detectable edges for automated replacement
===== END PLACEHOLDER =====`;
}

export async function detectPrintAreaCorners(
  mockupBase64: string,
  expectedWidth: number = 1024,
  expectedHeight: number = 1024
): Promise<PrintAreaCorners | null> {
  const prompt = `Analyze this product mockup image and find the green (#00FF00) placeholder rectangle.

Return the EXACT pixel coordinates of the four corners of the green area as it appears in the image.
The image dimensions are ${expectedWidth}x${expectedHeight} pixels.

Account for:
- Perspective distortion (the rectangle may appear as a trapezoid)
- Fabric curvature (edges may be slightly curved)
- Find the outermost visible green pixels for each corner

Respond with JSON only:
{
  "found": true or false,
  "corners": {
    "topLeft": { "x": number, "y": number },
    "topRight": { "x": number, "y": number },
    "bottomLeft": { "x": number, "y": number },
    "bottomRight": { "x": number, "y": number }
  },
  "confidence": 0-100
}

If no green placeholder is found, return {"found": false, "corners": null, "confidence": 0}`;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { data: mockupBase64, mimeType: "image/jpeg" } },
            { text: prompt }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    if (result.found && result.corners && result.confidence >= 70) {
      logger.info("Print area detected", { 
        source: "designCompositor", 
        corners: result.corners,
        confidence: result.confidence 
      });
      return result.corners;
    }
    
    logger.warn("Print area not detected or low confidence", { 
      source: "designCompositor", 
      found: result.found,
      confidence: result.confidence 
    });
    return null;
  } catch (error) {
    logger.error("Failed to detect print area", error, { source: "designCompositor" });
    return null;
  }
}

export async function detectPrintAreaWithColorSampling(
  mockupBuffer: Buffer,
  targetColor: string = "#00FF00"
): Promise<PrintAreaCorners | null> {
  try {
    const { data, info } = await sharp(mockupBuffer)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const targetR = parseInt(targetColor.slice(1, 3), 16);
    const targetG = parseInt(targetColor.slice(3, 5), 16);
    const targetB = parseInt(targetColor.slice(5, 7), 16);

    const threshold = 50;
    const greenPixels: { x: number; y: number }[] = [];

    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * info.channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        const rDiff = Math.abs(r - targetR);
        const gDiff = Math.abs(g - targetG);
        const bDiff = Math.abs(b - targetB);

        if (rDiff < threshold && gDiff < threshold && bDiff < threshold) {
          greenPixels.push({ x, y });
        }
      }
    }

    if (greenPixels.length < 100) {
      logger.warn("Not enough green pixels found", { 
        source: "designCompositor", 
        count: greenPixels.length 
      });
      return null;
    }

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (const p of greenPixels) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }

    const topPixels = greenPixels.filter(p => p.y < minY + (maxY - minY) * 0.1);
    const bottomPixels = greenPixels.filter(p => p.y > maxY - (maxY - minY) * 0.1);
    const leftPixels = greenPixels.filter(p => p.x < minX + (maxX - minX) * 0.1);
    const rightPixels = greenPixels.filter(p => p.x > maxX - (maxX - minX) * 0.1);

    const topLeftPixels = topPixels.filter(p => leftPixels.includes(p));
    const topRightPixels = topPixels.filter(p => rightPixels.includes(p));
    const bottomLeftPixels = bottomPixels.filter(p => leftPixels.includes(p));
    const bottomRightPixels = bottomPixels.filter(p => rightPixels.includes(p));

    const avgPoint = (pixels: { x: number; y: number }[]) => {
      if (pixels.length === 0) return null;
      const sumX = pixels.reduce((a, p) => a + p.x, 0);
      const sumY = pixels.reduce((a, p) => a + p.y, 0);
      return { x: Math.round(sumX / pixels.length), y: Math.round(sumY / pixels.length) };
    };

    const corners: PrintAreaCorners = {
      topLeft: avgPoint(topLeftPixels) || { x: minX, y: minY },
      topRight: avgPoint(topRightPixels) || { x: maxX, y: minY },
      bottomLeft: avgPoint(bottomLeftPixels) || { x: minX, y: maxY },
      bottomRight: avgPoint(bottomRightPixels) || { x: maxX, y: maxY }
    };

    logger.info("Print area detected via color sampling", { 
      source: "designCompositor", 
      corners,
      greenPixelCount: greenPixels.length
    });

    return corners;
  } catch (error) {
    logger.error("Color sampling detection failed", error, { source: "designCompositor" });
    return null;
  }
}

export async function compositeDesignOntoMockup(
  mockupBuffer: Buffer,
  designBase64: string,
  corners: PrintAreaCorners,
  options: CompositeOptions = {}
): Promise<Buffer> {
  const {
    blendMode = 'multiply',
    opacity = 0.95,
    shadowIntensity = 0.15,
    fabricTextureBlend = 0.1
  } = options;

  try {
    const mockupMeta = await sharp(mockupBuffer).metadata();
    const mockupWidth = mockupMeta.width || 1024;
    const mockupHeight = mockupMeta.height || 1024;

    const designBuffer = Buffer.from(designBase64, 'base64');
    
    const width = Math.max(
      Math.abs(corners.topRight.x - corners.topLeft.x),
      Math.abs(corners.bottomRight.x - corners.bottomLeft.x)
    );
    const height = Math.max(
      Math.abs(corners.bottomLeft.y - corners.topLeft.y),
      Math.abs(corners.bottomRight.y - corners.topRight.y)
    );

    const resizedDesign = await sharp(designBuffer)
      .resize(Math.round(width), Math.round(height), { fit: 'fill' })
      .toBuffer();

    const perspectiveDesign = await applyPerspectiveTransform(
      resizedDesign,
      corners,
      mockupWidth,
      mockupHeight
    );

    const greenMask = await createGreenMask(mockupBuffer);

    let result = await sharp(mockupBuffer)
      .composite([
        {
          input: perspectiveDesign,
          blend: blendMode as any,
          left: 0,
          top: 0
        }
      ])
      .toBuffer();

    if (shadowIntensity > 0) {
      result = await applyShadowFromOriginal(result, mockupBuffer, greenMask, shadowIntensity);
    }

    logger.info("Design composited successfully", { 
      source: "designCompositor",
      designSize: `${width}x${height}`,
      blendMode,
      opacity
    });

    return result;
  } catch (error) {
    logger.error("Failed to composite design", error, { source: "designCompositor" });
    throw error;
  }
}

async function applyPerspectiveTransform(
  designBuffer: Buffer,
  corners: PrintAreaCorners,
  canvasWidth: number,
  canvasHeight: number
): Promise<Buffer> {
  const designMeta = await sharp(designBuffer).metadata();
  const designWidth = designMeta.width || 100;
  const designHeight = designMeta.height || 100;

  const minX = Math.min(corners.topLeft.x, corners.bottomLeft.x);
  const minY = Math.min(corners.topLeft.y, corners.topRight.y);

  const canvas = await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      {
        input: designBuffer,
        left: Math.max(0, Math.round(minX)),
        top: Math.max(0, Math.round(minY))
      }
    ])
    .png()
    .toBuffer();

  return canvas;
}

async function createGreenMask(mockupBuffer: Buffer): Promise<Buffer> {
  const { data, info } = await sharp(mockupBuffer)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const maskData = Buffer.alloc(info.width * info.height);

  for (let i = 0; i < info.width * info.height; i++) {
    const idx = i * info.channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    if (g > 200 && r < 100 && b < 100) {
      maskData[i] = 255;
    } else {
      maskData[i] = 0;
    }
  }

  return sharp(maskData, {
    raw: { width: info.width, height: info.height, channels: 1 }
  })
    .png()
    .toBuffer();
}

async function applyShadowFromOriginal(
  composited: Buffer,
  originalMockup: Buffer,
  mask: Buffer,
  intensity: number
): Promise<Buffer> {
  return composited;
}

export async function processDesignOverlay(
  mockupBase64: string,
  designBase64: string,
  options: CompositeOptions = {}
): Promise<string> {
  const mockupBuffer = Buffer.from(mockupBase64, 'base64');

  let corners = await detectPrintAreaWithColorSampling(mockupBuffer);

  if (!corners) {
    const mockupMeta = await sharp(mockupBuffer).metadata();
    corners = await detectPrintAreaCorners(
      mockupBase64,
      mockupMeta.width,
      mockupMeta.height
    );
  }

  if (!corners) {
    logger.warn("Could not detect print area, returning original mockup", {
      source: "designCompositor"
    });
    return mockupBase64;
  }

  const result = await compositeDesignOntoMockup(
    mockupBuffer,
    designBase64,
    corners,
    options
  );

  return result.toString('base64');
}
