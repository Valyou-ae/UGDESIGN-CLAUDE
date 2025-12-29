/**
 * FABRIC PHYSICS
 * Critical module for ensuring designs behave as fabric, not overlays
 * The design IS fabric - it naturally drapes, folds, and curves with the garment
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
===== FABRIC PHYSICS (CRITICAL FOR REALISM) =====
[THE DESIGN IS FABRIC - IT BEHAVES EXACTLY LIKE FABRIC]

The design [IMAGE 1] IS printed fabric. It naturally drapes, folds, and curves because it IS fabric - not an image applied to fabric.

【NATURAL BODY CURVATURE】
The torso has a curved surface (approximately ${params.chestWidth}cm / ~${Math.round(params.chestWidth / 2.54)}" chest width).
The design fabric naturally follows this curvature:
- The center of the design (facing the camera) appears at full width
- The sides of the design recede toward the body's edges due to natural perspective
- This is how fabric naturally appears when draped over a curved surface

【FABRIC FOLDS AND CREASES】
Because the design IS fabric, it naturally responds to folds and creases:
- When the garment folds, the design folds with it - they are one material
- A vertical fold through a letter "O" causes the "O" to fold - the left and right sides separate at the crease
- A horizontal crease causes the design above and below to shift - natural fabric behavior
- The design does NOT remain perfectly flat while the garment wrinkles around it

【REQUIRED FABRIC BEHAVIOR】
- Minimum ${params.foldCount}+ visible creases and micro-wrinkles from natural wear
- Micro-wrinkles concentrated at underarms, sides, and movement areas
- Natural drape following body contours
- The design fabric follows EVERY fold and crease because it IS the garment fabric

【PRINT DIMENSIONS】
The design occupies approximately ${params.printWidthInches} inches width on the garment front, centered on the chest.

【UNIFIED MATERIAL PHYSICS】
- The design ink has saturated into the cotton fibers
- Fabric weave texture is visible through the printed colors
- When fabric stretches, the design stretches (same material)
- When fabric compresses at folds, the design compresses (same material)
- Light and shadow affect design and fabric identically (same surface)
- There is NO boundary between design and fabric - they are ONE piece of printed cotton

===== END FABRIC PHYSICS =====`;
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

export function getDesignAsFabricBlock(): string {
  return `
===== DESIGN IS FABRIC =====
[CRITICAL: THE DESIGN IS NOT AN IMAGE - IT IS PRINTED FABRIC]

The design asset [IMAGE 1] represents fabric that has been printed with this artwork. It is NOT a digital image to be placed on top of fabric.

【THE DESIGN IS ALREADY FABRIC】
Understand that [IMAGE 1] shows you what the FABRIC looks like after printing:
- The artwork exists as ink saturated INTO cotton fibers
- Cotton weave texture is visible through the printed colors
- Slight thread variation exists within the printed areas
- Natural fabric imperfections are present in the design area
- The design has the same physical properties as the garment fabric

【SINGLE UNIFIED MATERIAL】
There is only ONE material in this mockup - printed cotton fabric:
- The garment IS the design, the design IS the garment
- They are not two things combined - they are one piece of fabric
- Folds in the garment ARE folds in the design (same material)
- Light on the garment IS light on the design (same surface)
- There is no boundary, no edge, no separation

【MENTAL MODEL】
The design was printed onto this exact piece of cotton fabric DURING manufacturing, BEFORE the garment was cut and sewn.

When you see [IMAGE 1], you are seeing what the fabric looks like.
When you render the garment, you are rendering that same fabric draped on a body.
The fabric naturally folds, curves, and creases - and the design does too, because they are the same thing.

===== END DESIGN IS FABRIC =====`;
}

export function getImageAssetRules(): string {
  return `
===== CORE ASSETS & UNBREAKABLE RULES =====

RULE 1: DESIGN ASSET LOCK (NON-NEGOTIABLE)
[IMAGE 1] is the EXACT artwork. You must TRANSFER this image onto the garment fabric - do NOT recreate, redraw, or reinterpret it.
- TRANSFER means: the exact pixels, colors, typography, and styling from [IMAGE 1] appear on the fabric
- Do NOT generate new artwork inspired by [IMAGE 1] - COPY it exactly
- Every character of text must match the exact font, spacing, and styling
- Every illustration element must match the exact colors, line weights, and proportions
- If the design says "Santa Paws" in a specific font, render "Santa Paws" in that EXACT font
- This is a TECHNICAL COPY operation, not a creative interpretation

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

export function getSeamIntegrationBlock(): string {
  return `
===== SEAM & CONSTRUCTION INTEGRATION =====
[THE DESIGN FLOWS THROUGH GARMENT CONSTRUCTION]

The design was printed on the fabric BEFORE the garment was cut and sewn. Therefore:

【SEAM LINE BEHAVIOR】
- The design continues through side seams (may show slight offset from sewing)
- Shoulder seams create natural breaks in the design
- Hem stitching creates subtle horizontal lines that cross through the design
- Collar stitching shows where design meets garment edge

【COMPRESSION ZONES - DESIGN MUST RESPOND】
At underarm areas:
- Fabric bunches and compresses
- Design must show compression, bunching, and micro-folds
- Text and artwork break apart at these fold lines

At chest center:
- Fabric stretches slightly over chest contour
- Design stretches proportionally with fabric

At side seams:
- Fabric naturally pulls toward the sides
- Design shows subtle distortion toward body edges

【STITCH IMPRESSIONS】
Where visible stitching exists:
- Stitch lines create tiny shadows THROUGH the printed area
- The design shows micro-interruptions where needle holes exist
- This is subtle but contributes to "printed before construction" authenticity

===== END SEAM INTEGRATION =====`;
}

export function getPositiveFabricRequirements(): string {
  return `
===== MANDATORY FABRIC INTERACTIONS =====
[THESE MUST BE VISIBLE IN THE FINAL RENDER]

The following fabric behaviors are REQUIRED - renders lacking these will be rejected:

【FOLD DISCONTINUITIES】
✓ At least 3 visible folds/creases that interrupt the design
✓ When a fold crosses text, the text must show a break at the fold line
✓ Letters do NOT remain perfectly aligned across fold lines

【BODY CURVATURE RESPONSE】
✓ Design narrows toward body edges (natural perspective)
✓ Design curves around torso cylinder
✓ Horizontal lines in the design appear slightly curved following body contour

【COMPRESSION EVIDENCE】
✓ At underarm areas: fabric bunches, design bunches with it
✓ At movement creases: design shows corresponding creases
✓ At natural wear points: micro-wrinkles affect design appearance

【UNIFIED LIGHTING】
✓ Shadows on fabric = shadows on design (same intensity)
✓ Highlights on fabric = highlights on design (same brightness)
✓ No lighting difference between printed and blank areas

===== END MANDATORY REQUIREMENTS =====`;
}
