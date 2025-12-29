/**
 * 3D DISTORTION PHYSICS
 * Critical module for making designs appear bonded to fabric, not floating on top
 * Based on proven prompt structure that achieves realistic print integration
 */

export interface DistortionParameters {
  cylinderRadius: number;
  chestWidth: number;
  printWidthInches: number;
  foldCount: number;
}

export const DEFAULT_DISTORTION_PARAMS: Record<string, DistortionParameters> = {
  'tshirt': {
    cylinderRadius: 15,
    chestWidth: 30,
    printWidthInches: 14,
    foldCount: 7
  },
  'hoodie': {
    cylinderRadius: 17,
    chestWidth: 34,
    printWidthInches: 12,
    foldCount: 9
  },
  'longsleeve': {
    cylinderRadius: 15,
    chestWidth: 30,
    printWidthInches: 14,
    foldCount: 8
  },
  'sweatshirt': {
    cylinderRadius: 16,
    chestWidth: 32,
    printWidthInches: 12,
    foldCount: 8
  },
  'tanktop': {
    cylinderRadius: 14,
    chestWidth: 28,
    printWidthInches: 10,
    foldCount: 5
  },
  'default': {
    cylinderRadius: 15,
    chestWidth: 30,
    printWidthInches: 12,
    foldCount: 7
  }
};

export function getDistortionParams(productName: string): DistortionParameters {
  const normalizedName = productName.toLowerCase();
  
  if (normalizedName.includes('hoodie')) return DEFAULT_DISTORTION_PARAMS['hoodie'];
  if (normalizedName.includes('long sleeve') || normalizedName.includes('longsleeve')) return DEFAULT_DISTORTION_PARAMS['longsleeve'];
  if (normalizedName.includes('sweatshirt') || normalizedName.includes('sweater')) return DEFAULT_DISTORTION_PARAMS['sweatshirt'];
  if (normalizedName.includes('tank')) return DEFAULT_DISTORTION_PARAMS['tanktop'];
  if (normalizedName.includes('tee') || normalizedName.includes('t-shirt') || normalizedName.includes('tshirt')) return DEFAULT_DISTORTION_PARAMS['tshirt'];
  
  return DEFAULT_DISTORTION_PARAMS['default'];
}

export function get3DDistortionPhysicsBlock(productName: string): string {
  const params = getDistortionParams(productName);
  
  return `
===== 3D DISTORTION PHYSICS (CRITICAL FOR REALISM) =====
[THIS SECTION IS NON-NEGOTIABLE - FLAT DESIGNS ARE UNACCEPTABLE]

The flat design [IMAGE 1] MUST realistically distort over the 3D curves and folds of the garment.

【CYLINDRICAL WRAP - MANDATORY】
The torso is a CYLINDER with approximately ${params.cylinderRadius}cm radius (${params.chestWidth}cm diameter, ~${Math.round(params.chestWidth / 2.54)}" chest width).
You must map the flat design onto this cylindrical surface.

MENTAL MODEL: Imagine wrapping a rectangular sticker around a soda can.
- The center of the sticker (facing you) looks normal width
- The edges of the sticker (wrapping around the sides) appear much narrower due to the angle
- This is the EXACT effect needed on the garment

【FOLD INTERACTION - BONDED DESIGN】
The design is BONDED to the fabric surface. It is not floating above - it IS the fabric.

Therefore:
- Every fold in the fabric causes a corresponding distortion in the design
- If there is a fold running vertically through the letter "O", the "O" must show the fold:
  • The left side of the "O" and right side will not align perfectly
  • The fold line will create a visible discontinuity
  • The circular shape will appear "bent" at the fold
- This is NON-NEGOTIABLE. Flat, undistorted designs are REJECTED.

【FOLD REQUIREMENTS】
- Minimum ${params.foldCount}+ visible creases and micro-wrinkles from natural wear
- Micro-wrinkles concentrated at underarms and sides
- Natural drape following body contours
- Design must follow EVERY single fold and crease

【PRINT SIZE SPECIFICATION】
The design asset [IMAGE 1] must be printed on the garment at a width of approximately ${params.printWidthInches} inches.
The design is centered on the chest/front of the garment.

【DESIGN INTEGRATION PHYSICS】
- The ink from the design has SOAKED INTO the fabric fibers
- You can see subtle fabric texture THROUGH the printed areas
- Where fabric stretches, the design stretches proportionally
- Where fabric compresses (folds), the design compresses identically
- Light and shadow affect the design the same way they affect the fabric
- There is NO separation between design and fabric - they are ONE surface

===== END 3D DISTORTION PHYSICS =====`;
}

export function getGarmentConditionBlock(): string {
  return `
【GARMENT WEAR CONDITION】
The garment appears naturally worn (2-3 uses, approximately 5 washes):
- 7+ visible creases and micro-wrinkles from natural wear
- Slight micro-pilling visible on close inspection
- Colors slightly softened by approximately 5% from washing
- Fabric has comfortable lived-in softness with natural drape
- Authentic worn-in appearance (not stiff and brand-new)
- Micro-wrinkles concentrated at underarms, sides, and movement areas
- Realistic everyday garment condition`;
}

export function getRenderingEngineFraming(): string {
  return `TASK: PHOTOREALISTIC MOCKUP RENDER SPECIFICATION

You are a photorealistic rendering engine. Your task is to generate a single mockup image according to the following technical specification. Adherence to all rules is mandatory.

This is NOT a creative illustration task. This is a TECHNICAL RENDERING task with precise specifications that must be followed exactly.`;
}

export function getImageAssetRules(): string {
  return `
===== CORE ASSETS & UNBREAKABLE RULES =====

RULE 1: DESIGN ASSET LOCK (NON-NEGOTIABLE)
The design on the garment MUST be a PERFECT, 1:1, PIXEL-PERFECT, STYLISTICALLY IDENTICAL COPY of the provided design asset [IMAGE 1].
- It must not be redrawn, re-interpreted, or have its style changed
- Every detail, color, and element must match exactly
- The design is the SOURCE OF TRUTH for artwork appearance

RULE 2: MODEL IDENTITY LOCK (NON-NEGOTIABLE)
If a reference headshot [IMAGE 2] is provided, the model in the final render MUST be the EXACT SAME PERSON.
- Do not change their face, hair, skin tone, or body build
- IGNORE the background and lighting of the headshot - it is for identity reference ONLY
- Use the Scene & Lighting parameters for the final image's environment

RULE 3: COLOR & FIT LOCK (NON-NEGOTIABLE)
- The garment's fabric color MUST match the specified color exactly
- The garment fit must be realistic for the specified size
- No color drift or interpretation is allowed

===== END CORE ASSETS =====`;
}
