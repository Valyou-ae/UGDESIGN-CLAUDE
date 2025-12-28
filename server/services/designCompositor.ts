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
!!! HIGHEST PRIORITY - OVERRIDE ALL OTHER DESIGN INSTRUCTIONS !!!
===== MANDATORY GREEN PLACEHOLDER REQUIREMENT =====

*** THIS IS THE MOST IMPORTANT INSTRUCTION IN THIS ENTIRE PROMPT ***

YOU MUST place a SOLID BRIGHT GREEN (#00FF00) FILLED RECTANGLE on the garment.

RULE #1: NO TEXT WHATSOEVER
- DO NOT generate the words "DESIGN HERE" 
- DO NOT generate ANY text in the green area
- DO NOT generate ANY letters or words
- Text generation in the placeholder area is STRICTLY FORBIDDEN

RULE #2: PURE SOLID GREEN ONLY
- Color: EXACTLY #00FF00 (RGB 0,255,0) - pure bright green
- The ENTIRE rectangle must be SOLID GREEN - no gradients, no patterns
- Think of it as if someone printed a bright green rectangle and stuck it on the shirt

RULE #3: PLACEMENT AND SIZE
- Position: Centered on chest/front of garment
- Size: Large enough to be clearly visible (8-12 inches)
- Shape: Rectangular, following fabric contours

FAILURE CONDITIONS (your output will be REJECTED if):
- Any text appears in the green area
- The green is not pure #00FF00
- No green rectangle is present
- "DESIGN HERE" or similar text appears

SUCCESS CONDITION:
A large, solid, pure green (#00FF00) rectangle on the garment with ZERO text.

===== END MANDATORY PLACEHOLDER =====`;
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
    opacity = 0.95
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

    const greenMask = await createGreenMask(mockupBuffer);

    const perspectiveDesign = await applyPerspectiveTransform(
      resizedDesign,
      corners,
      mockupWidth,
      mockupHeight
    );

    const result = await replaceGreenWithDesign(
      mockupBuffer,
      perspectiveDesign,
      greenMask,
      mockupWidth,
      mockupHeight
    );

    logger.info("Design composited successfully", { 
      source: "designCompositor",
      designSize: `${width}x${height}`,
      opacity
    });

    return result;
  } catch (error) {
    logger.error("Failed to composite design", error, { source: "designCompositor" });
    throw error;
  }
}

async function replaceGreenWithDesign(
  mockupBuffer: Buffer,
  designBuffer: Buffer,
  maskBuffer: Buffer,
  canvasWidth: number,
  canvasHeight: number
): Promise<Buffer> {
  const mockupRaw = await sharp(mockupBuffer).raw().toBuffer({ resolveWithObject: true });
  const designRaw = await sharp(designBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const maskRaw = await sharp(maskBuffer).raw().toBuffer({ resolveWithObject: true });

  const outputData = Buffer.from(mockupRaw.data);
  const channels = mockupRaw.info.channels;

  // Collect edge pixels (immediately adjacent to mask boundary)
  const edgePixels: { r: number; g: number; b: number }[] = [];
  
  for (let y = 1; y < canvasHeight - 1; y++) {
    for (let x = 1; x < canvasWidth - 1; x++) {
      const maskIdx = y * canvasWidth + x;
      
      if (maskRaw.data[maskIdx] <= 128) {
        const neighbors = [
          maskRaw.data[(y - 1) * canvasWidth + x],
          maskRaw.data[(y + 1) * canvasWidth + x],
          maskRaw.data[y * canvasWidth + (x - 1)],
          maskRaw.data[y * canvasWidth + (x + 1)]
        ];
        
        if (neighbors.some(n => n > 128)) {
          const mockupIdx = (y * canvasWidth + x) * channels;
          const r = mockupRaw.data[mockupIdx];
          const g = mockupRaw.data[mockupIdx + 1];
          const b = mockupRaw.data[mockupIdx + 2];
          
          // Only include non-green pixels
          if (!(g > 200 && r < 100 && b < 100)) {
            edgePixels.push({ r, g, b });
          }
        }
      }
    }
  }
  
  // Calculate fabric color using median (robust against outliers)
  let fabricR = 255, fabricG = 255, fabricB = 255;
  if (edgePixels.length > 0) {
    edgePixels.sort((a, b) => (a.r + a.g + a.b) - (b.r + b.g + b.b));
    const median = edgePixels[Math.floor(edgePixels.length / 2)];
    fabricR = median.r;
    fabricG = median.g;
    fabricB = median.b;
  }
  
  logger.info("Fabric color detected for compositing", {
    source: "designCompositor",
    fabricColor: `rgb(${fabricR},${fabricG},${fabricB})`,
    edgePixelCount: edgePixels.length
  });

  for (let y = 0; y < canvasHeight; y++) {
    for (let x = 0; x < canvasWidth; x++) {
      const mockupIdx = (y * canvasWidth + x) * channels;
      const designIdx = (y * canvasWidth + x) * designRaw.info.channels;
      const maskIdx = y * canvasWidth + x;

      if (maskRaw.data[maskIdx] > 128) {
        const designR = designRaw.data[designIdx];
        const designG = designRaw.data[designIdx + 1];
        const designB = designRaw.data[designIdx + 2];
        const designAlpha = designRaw.info.channels === 4 ? designRaw.data[designIdx + 3] / 255 : 1;
        
        if (designAlpha > 0.05) {
          // PIXEL-PERFECT: Preserve exact design colors, blend only for transparency
          outputData[mockupIdx] = Math.round(designR * designAlpha + fabricR * (1 - designAlpha));
          outputData[mockupIdx + 1] = Math.round(designG * designAlpha + fabricG * (1 - designAlpha));
          outputData[mockupIdx + 2] = Math.round(designB * designAlpha + fabricB * (1 - designAlpha));
        } else {
          // Transparent/empty area - fill with detected fabric color
          outputData[mockupIdx] = fabricR;
          outputData[mockupIdx + 1] = fabricG;
          outputData[mockupIdx + 2] = fabricB;
        }
      }
    }
  }

  return sharp(outputData, {
    raw: {
      width: canvasWidth,
      height: canvasHeight,
      channels
    }
  })
    .jpeg({ quality: 90 })
    .toBuffer();
}

async function applyPerspectiveTransform(
  designBuffer: Buffer,
  corners: PrintAreaCorners,
  canvasWidth: number,
  canvasHeight: number
): Promise<Buffer> {
  const designRaw = await sharp(designBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const srcWidth = designRaw.info.width;
  const srcHeight = designRaw.info.height;
  const srcChannels = designRaw.info.channels;

  const outputData = Buffer.alloc(canvasWidth * canvasHeight * 4);

  const H = computeHomography(
    { x: 0, y: 0 }, { x: srcWidth - 1, y: 0 },
    { x: 0, y: srcHeight - 1 }, { x: srcWidth - 1, y: srcHeight - 1 },
    corners.topLeft, corners.topRight,
    corners.bottomLeft, corners.bottomRight
  );

  const Hinv = invertHomography(H);

  const minX = Math.max(0, Math.floor(Math.min(corners.topLeft.x, corners.bottomLeft.x)) - 2);
  const maxX = Math.min(canvasWidth, Math.ceil(Math.max(corners.topRight.x, corners.bottomRight.x)) + 2);
  const minY = Math.max(0, Math.floor(Math.min(corners.topLeft.y, corners.topRight.y)) - 2);
  const maxY = Math.min(canvasHeight, Math.ceil(Math.max(corners.bottomLeft.y, corners.bottomRight.y)) + 2);

  for (let y = minY; y < maxY; y++) {
    for (let x = minX; x < maxX; x++) {
      const src = applyHomography(Hinv, x, y);
      
      if (src.x >= -0.5 && src.x < srcWidth && src.y >= -0.5 && src.y < srcHeight) {
        const sx = Math.max(0, Math.min(srcWidth - 1, Math.floor(src.x)));
        const sy = Math.max(0, Math.min(srcHeight - 1, Math.floor(src.y)));
        const srcIdx = (sy * srcWidth + sx) * srcChannels;
        const dstIdx = (y * canvasWidth + x) * 4;

        outputData[dstIdx] = designRaw.data[srcIdx];
        outputData[dstIdx + 1] = designRaw.data[srcIdx + 1];
        outputData[dstIdx + 2] = designRaw.data[srcIdx + 2];
        outputData[dstIdx + 3] = designRaw.data[srcIdx + 3];
      }
    }
  }

  return sharp(outputData, {
    raw: { width: canvasWidth, height: canvasHeight, channels: 4 }
  })
    .png()
    .toBuffer();
}

function computeHomography(
  s0: {x:number,y:number}, s1: {x:number,y:number},
  s2: {x:number,y:number}, s3: {x:number,y:number},
  d0: {x:number,y:number}, d1: {x:number,y:number},
  d2: {x:number,y:number}, d3: {x:number,y:number}
): number[] {
  const A = [
    [s0.x, s0.y, 1, 0, 0, 0, -d0.x*s0.x, -d0.x*s0.y],
    [0, 0, 0, s0.x, s0.y, 1, -d0.y*s0.x, -d0.y*s0.y],
    [s1.x, s1.y, 1, 0, 0, 0, -d1.x*s1.x, -d1.x*s1.y],
    [0, 0, 0, s1.x, s1.y, 1, -d1.y*s1.x, -d1.y*s1.y],
    [s2.x, s2.y, 1, 0, 0, 0, -d2.x*s2.x, -d2.x*s2.y],
    [0, 0, 0, s2.x, s2.y, 1, -d2.y*s2.x, -d2.y*s2.y],
    [s3.x, s3.y, 1, 0, 0, 0, -d3.x*s3.x, -d3.x*s3.y],
    [0, 0, 0, s3.x, s3.y, 1, -d3.y*s3.x, -d3.y*s3.y]
  ];
  const b = [d0.x, d0.y, d1.x, d1.y, d2.x, d2.y, d3.x, d3.y];
  
  const h = solveLinear(A, b);
  return [...h, 1];
}

function solveLinear(A: number[][], b: number[]): number[] {
  const n = A.length;
  const aug = A.map((row, i) => [...row, b[i]]);

  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let row = col + 1; row < n; row++) {
      if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) maxRow = row;
    }
    [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];
    
    if (Math.abs(aug[col][col]) < 1e-10) continue;
    
    for (let row = col + 1; row < n; row++) {
      const f = aug[row][col] / aug[col][col];
      for (let j = col; j <= n; j++) aug[row][j] -= f * aug[col][j];
    }
  }

  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = aug[i][n];
    for (let j = i + 1; j < n; j++) sum -= aug[i][j] * x[j];
    x[i] = Math.abs(aug[i][i]) > 1e-10 ? sum / aug[i][i] : 0;
  }
  return x;
}

function invertHomography(H: number[]): number[] {
  const [a,b,c,d,e,f,g,h] = H;
  const det = a*(e-f*h) - b*(d-f*g) + c*(d*h-e*g);
  if (Math.abs(det) < 1e-10) return [1,0,0,0,1,0,0,0,1];
  
  return [
    (e - f*h) / det,
    (c*h - b) / det,
    (b*f - c*e) / det,
    (f*g - d) / det,
    (a - c*g) / det,
    (c*d - a*f) / det,
    (d*h - e*g) / det,
    (b*g - a*h) / det,
    (a*e - b*d) / det
  ];
}

function applyHomography(H: number[], x: number, y: number): {x: number, y: number} {
  const w = H[6]*x + H[7]*y + H[8];
  if (Math.abs(w) < 1e-10) return { x: -1, y: -1 };
  return {
    x: (H[0]*x + H[1]*y + H[2]) / w,
    y: (H[3]*x + H[4]*y + H[5]) / w
  };
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

export interface CompositeResult {
  success: boolean;
  imageData: string;
  reason?: string;
}

export async function processDesignOverlay(
  mockupBase64: string,
  designBase64: string,
  options: CompositeOptions = {}
): Promise<CompositeResult> {
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
    return {
      success: false,
      imageData: mockupBase64,
      reason: 'green_not_detected'
    };
  }

  const result = await compositeDesignOntoMockup(
    mockupBuffer,
    designBase64,
    corners,
    options
  );

  return {
    success: true,
    imageData: result.toString('base64')
  };
}
