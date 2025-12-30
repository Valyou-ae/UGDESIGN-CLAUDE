/**
 * STREAMLINED MOCKUP PROMPT BUILDER
 * 
 * New 3-section structure optimized for Gemini:
 * 1. UNBREAKABLE RULES - The absolute source of truth
 * 2. DETAILED SPECIFICATIONS - Variable parameters for this job
 * 3. QUALITY CONTROL - Prose-based negatives
 */

import type {
  MockupAngle,
  ModelDetails,
  ProductColor,
  Product,
  UnifiedPersona,
  DesignAnalysis,
  JourneyType,
  OutputQuality
} from "@shared/mockupTypes";
import { OUTPUT_QUALITY_SPECS } from "@shared/mockupTypes";
import { PersonaLock } from "../eliteMockupGenerator";

export interface MockupPromptInput {
  designAnalysis: DesignAnalysis;
  product: Product;
  color: ProductColor;
  angle: MockupAngle;
  modelDetails?: ModelDetails;
  personaLock?: PersonaLock;
  journey: JourneyType;
  currentSize?: string;
  lightingPreset?: string;
  environmentPrompt?: string;
  outputQuality?: OutputQuality;
  hasHeadshot?: boolean;
  hasPreviousReference?: boolean;
}

export interface StreamlinedPrompt {
  imageLabels: string;
  unbreakableRules: string;
  detailedSpecs: string;
  qualityControl: string;
  fullPrompt: string;
}

/**
 * Build the image asset labels section
 */
function buildImageLabels(hasHeadshot: boolean, hasPreviousReference: boolean): string {
  const labels: string[] = [];
  
  labels.push(`[IMAGE 1] DESIGN ASSET
The exact artwork to transfer onto the garment. Copy every pixel, color, and detail exactly as shown.`);

  if (hasHeadshot) {
    labels.push(`[IMAGE 2] MODEL IDENTITY
The person who wears the garment. Match their face, skin tone, hair, and body exactly. Ignore the background and lighting of this photo.`);
  }

  if (hasPreviousReference) {
    const imageNum = hasHeadshot ? 3 : 2;
    labels.push(`[IMAGE ${imageNum}] ENVIRONMENT REFERENCE
Match the background, lighting, and photography style from this reference.`);
  }

  return labels.join('\n\n');
}

/**
 * SECTION 1: UNBREAKABLE RULES
 * Three concise rules that are the absolute source of truth
 */
function buildUnbreakableRules(input: MockupPromptInput): string {
  const { personaLock, product, color, journey, designAnalysis } = input;

  return `
// ═══════════════════════════════════════════════════════════════
// UNBREAKABLE RULES - The Absolute Source of Truth
// ═══════════════════════════════════════════════════════════════

RULE 1: MODEL IDENTITY LOCK
${personaLock ? `The model in the final image MUST be the exact same person shown in [IMAGE 2].
- Face: ${personaLock.persona.facialFeatures}
- Hair: ${personaLock.persona.hairStyle}, ${personaLock.persona.hairColor}
- Skin: ${personaLock.persona.skinTone}
- Eyes: ${personaLock.persona.eyeColor}
- Age: ${personaLock.persona.age} years old
- Sex: ${personaLock.persona.sex}
- Ethnicity: ${personaLock.persona.ethnicity}
Do NOT substitute with a different person. The result must be immediately recognizable as the same individual.` : 'No model reference provided. Generate an appropriate model for the garment.'}

RULE 2: DESIGN INTEGRITY LOCK
The design from [IMAGE 1] is PRINTED FABRIC, not a digital overlay.
- TRANSFER the exact artwork onto the garment - do not redraw or reinterpret
- The design IS the fabric - they are one unified material
- Design must follow every fold, crease, and body curve because it IS the garment
- Design shares identical lighting and shadows with the rest of the garment
- Fabric weave texture shows through the printed ink
${journey === 'AOP' ? `- AOP: Pattern covers the entire garment surface edge-to-edge with seamless continuity
- No boundary exists between design and fabric - they are ONE piece of printed cotton` : `- DTG PRINT AREA BOUNDARIES (CRITICAL):
  * The design MUST stay within the chest print area ONLY (approximately 12" x 16" maximum)
  * Design MUST NOT extend onto sleeves, shoulders, collar, sides, or hem
  * Solid ${color.name} fabric MUST be visible on ALL areas outside the print zone
  * This is NOT all-over print - there MUST be clear boundaries where design ends
- Placement: ${designAnalysis.suggestedPlacement || 'center chest'}`}

RULE 3: PARAMETER LOCK
- Garment Color: ${color.name} (${color.hex}) - exact match required on all non-printed areas
- Design Colors: ${designAnalysis.dominantColors.join(', ')} - reproduce accurately without color shift
- Fit: Garment must fit naturally for the specified size
- No color drift or creative interpretation allowed

// ═══════════════════════════════════════════════════════════════
`;
}

/**
 * SECTION 2: DETAILED SPECIFICATIONS
 * Variable parameters organized by category
 */
function buildDetailedSpecs(input: MockupPromptInput): string {
  const { 
    product, color, angle, personaLock, modelDetails, 
    journey, currentSize, lightingPreset, environmentPrompt, outputQuality 
  } = input;

  const qualitySpec = OUTPUT_QUALITY_SPECS[outputQuality || 'high'];
  const size = currentSize || modelDetails?.modelSize || personaLock?.persona.size || 'M';

  // Model specification
  const modelSpec = personaLock ? `
1. THE MODEL
Identity: ${personaLock.persona.name} (ID: ${personaLock.persona.id})
Demographics: ${personaLock.persona.age}-year-old ${personaLock.persona.sex} (${personaLock.persona.ethnicity})
Body: ${personaLock.persona.height}, ${personaLock.persona.weight}, ${personaLock.persona.build} build
Face: ${personaLock.persona.facialFeatures}
Hair: ${personaLock.persona.hairStyle}, ${personaLock.persona.hairColor}
Skin: ${personaLock.persona.skinTone}
${modelDetails?.customization?.expression ? `Expression: ${modelDetails.customization.expression}` : ''}
${modelDetails?.customization?.poseSuggestion ? `Pose: ${modelDetails.customization.poseSuggestion}` : ''}

SIZE-TO-BODY RULE (Size: ${size}):
${getSizeBodyRule(size)}` : `
1. THE MODEL
Display on invisible mannequin or flat lay (no human model).`;

  // Garment specification
  const garmentSpec = `
2. THE GARMENT
Product: ${product.name}
Category: ${product.category}${product.subcategory ? ` > ${product.subcategory}` : ''}
Color: ${color.name} (${color.hex})
Size: ${size}
Print Method: ${journey === 'AOP' ? 'All-Over Print (Sublimation)' : 'DTG (Direct-to-Garment)'}

Wear Condition: Naturally worn (2-3 uses, ~5 washes)
- 7+ visible creases and micro-wrinkles from natural wear
- Fabric has comfortable lived-in softness
- Colors slightly softened (~5%) from washing
- Micro-wrinkles at underarms, sides, and movement areas`;

  // Scene specification
  const sceneSpec = `
3. THE SCENE
Environment: ${environmentPrompt || 'Clean studio backdrop, lifestyle context'}
Lighting: ${lightingPreset || 'Three-point studio lighting, soft key at 45°, 1:3 fill ratio'}
Camera Angle: ${angle}
${getCameraSpecForAngle(angle)}`;

  // 3D Distortion specification
  const distortionSpec = `
4. 3D DISTORTION & FABRIC PHYSICS
The design exists on a curved 3D surface (the human torso):

Body Curvature:
- Center of design (camera-facing) appears at full width
- Sides recede toward body edges due to natural perspective
- Horizontal lines in design curve following body contour

Fold Behavior:
- When garment folds, design folds with it (same material)
- A fold through text causes the text to break at the crease
- Minimum 7 visible folds/creases that interrupt the design

${getAngleFoldBehavior(angle)}

Compression Zones:
- Underarms: fabric bunches, design bunches with it
- Chest: fabric stretches, design stretches proportionally
- Sides: subtle distortion toward body edges

Unified Material Physics:
- Design ink saturated into cotton fibers
- Fabric weave visible through printed colors
- Light and shadow affect design and fabric identically`;

  // Technical requirements
  const technicalSpec = `
5. TECHNICAL OUTPUT
Resolution: ${qualitySpec.resolution}px (${qualitySpec.name} quality)
Style: Photorealistic commercial product photography
Focus: Sharp, professional studio standards
`;

  return `
// ═══════════════════════════════════════════════════════════════
// DETAILED SPECIFICATIONS - Parameters for This Job
// ═══════════════════════════════════════════════════════════════
${modelSpec}
${garmentSpec}
${sceneSpec}
${distortionSpec}
${technicalSpec}
// ═══════════════════════════════════════════════════════════════
`;
}

/**
 * SECTION 3: QUALITY CONTROL
 * Prose-based negatives instead of keyword lists
 */
function buildQualityControl(input: MockupPromptInput): string {
  const { personaLock, journey } = input;
  const hasModel = !!personaLock;

  return `
// ═══════════════════════════════════════════════════════════════
// QUALITY CONTROL - What to Avoid
// ═══════════════════════════════════════════════════════════════

FABRIC REALISM:
Do not render the design as a flat digital overlay or sticker. The design must not remain perfectly flat while the fabric folds around it - this is the most common failure. The design should never have its own separate lighting that differs from the garment. Avoid colors that are too vibrant or saturated compared to real ink on fabric. The design should not have unnaturally crisp boundaries or appear to "float" on top of the garment.

TECHNICAL QUALITY:
Avoid blurry, out-of-focus, or grainy images. Do not produce overexposed or underexposed results. Ensure correct white balance and natural skin tones${hasModel ? ' that match the reference' : ''}. Avoid any visible jpeg artifacts, pixelation, or noise.

${hasModel ? `IDENTITY CONSISTENCY:
Do not substitute the person in [IMAGE 2] with a different person. The face, hair, skin tone, and body type must match exactly. Do not change the model's age, sex, or ethnicity. The same individual must be recognizable across all generated images.

` : ''}${journey === 'AOP' ? `PATTERN CONTINUITY:
For all-over print, the pattern must cover the entire garment seamlessly. Avoid visible seams or breaks in the pattern. The pattern should wrap naturally around the garment without distortion or misalignment at construction seams.

` : ''}ANATOMICAL ACCURACY:
${hasModel ? 'Ensure correct human proportions with properly formed hands (5 fingers each), natural eye alignment, and realistic body positioning. Avoid uncanny valley effects or anatomical impossibilities.' : 'Ensure the garment hangs naturally on the mannequin with correct fabric physics.'}

// ═══════════════════════════════════════════════════════════════
`;
}

/**
 * Helper: Get size-to-body matching rule
 */
function getSizeBodyRule(size: string): string {
  const rules: Record<string, string> = {
    'XS': 'Very slim/petite person. Narrow shoulders, thin frame. Weight 100-120 lbs.',
    'S': 'Slim/lean person. Smaller frame, lean build. Weight 120-140 lbs.',
    'M': 'Average/athletic person. Standard proportions. Weight 140-170 lbs.',
    'L': 'Solid/sturdy person. Slightly larger frame. Weight 170-200 lbs.',
    'XL': 'Larger/stocky person. Fuller build, broader shoulders. Weight 200-230 lbs.',
    'XXL': 'Heavyset person. Broad frame, larger belly visible. Weight 230-270 lbs.',
    'XXXL': 'Plus-size person. Very broad frame, visible larger body mass. Weight 270-310 lbs.',
    '4XL': 'Plus-size person. Extra broad frame, clearly heavy build. Weight 310-350 lbs.',
    '5XL': 'Very large plus-size person. Very broad frame, very heavy build. Weight 350-400+ lbs.'
  };
  return rules[size] || rules['M'];
}

/**
 * Helper: Get camera specifications for angle
 */
function getCameraSpecForAngle(angle: MockupAngle): string {
  const specs: Record<MockupAngle, string> = {
    'front': 'Lens: 50mm, f/4 | Straight-on view, centered composition',
    'three-quarter': 'Lens: 35mm, f/4 | 45° rotation, dynamic perspective',
    'side': 'Lens: 85mm, f/2.8 | 90° profile view, sharp detail',
    'closeup': 'Lens: 100mm macro, f/2.8 | Tight crop on print area, texture detail',
    'size-chart': 'Lens: 50mm, f/5.6 | Full garment visible, flat lay or mannequin'
  };
  return specs[angle] || specs['front'];
}

/**
 * Helper: Get angle-specific fold behavior instructions
 */
function getAngleFoldBehavior(angle: MockupAngle): string {
  const behaviors: Record<MockupAngle, string> = {
    'front': `Angle-Specific (Front View):
- Design centered on chest, minimal perspective distortion
- Folds primarily vertical from gravity, horizontal from body movement
- Design elements near armholes curve slightly inward`,

    'three-quarter': `Angle-Specific (Three-Quarter View):
- Design wraps around torso curve, far side foreshortens significantly
- Side closest to camera shows full detail, far side compresses 40-60%
- Folds at side seam create shadow valleys where design darkens
- Natural fabric bunching at waist and underarm areas`,

    'side': `Angle-Specific (Side/Profile View):
- Only a narrow strip of the front design is visible, heavily foreshortened
- Design wraps dramatically around the curved torso edge
- Side seam folds create deep creases where design disappears into shadows
- Underarm area shows compressed fabric bunching with design following folds
- Print elements "turn the corner" around the body edge with perspective warp
- Visible folds at waist and hip area where fabric naturally gathers`,

    'closeup': `Angle-Specific (Closeup View):
- Fabric texture and weave highly visible through ink
- Micro-creases and thread-level detail apparent
- Design ink shows subtle absorption into cotton fibers
- Any folds in frame create clear breaks in the design continuity`,

    'size-chart': `Angle-Specific (Size Chart/Flat):
- Minimal distortion, design displayed for clarity
- Natural fabric drape if on mannequin
- Focus on accurate size representation`
  };
  return behaviors[angle] || behaviors['front'];
}

/**
 * Main function: Build the complete streamlined prompt
 */
export function buildStreamlinedPrompt(input: MockupPromptInput): StreamlinedPrompt {
  const imageLabels = buildImageLabels(
    input.hasHeadshot || false, 
    input.hasPreviousReference || false
  );
  const unbreakableRules = buildUnbreakableRules(input);
  const detailedSpecs = buildDetailedSpecs(input);
  const qualityControl = buildQualityControl(input);

  const fullPrompt = `${imageLabels}

${unbreakableRules}
${detailedSpecs}
${qualityControl}

FINAL OUTPUT: Generate a single photorealistic product photograph. Transfer the exact artwork from [IMAGE 1] onto the garment. The design IS the fabric - it naturally drapes, folds, and curves with the garment because they are the same material.`;

  return {
    imageLabels,
    unbreakableRules,
    detailedSpecs,
    qualityControl,
    fullPrompt
  };
}

/**
 * Export for use in eliteMockupGenerator
 */
export { buildImageLabels, buildUnbreakableRules, buildDetailedSpecs, buildQualityControl };
