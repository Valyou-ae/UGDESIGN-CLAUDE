/**
 * STREAMLINED MOCKUP PROMPT BUILDER
 * 
 * 3-section structure optimized for Gemini:
 * 1. UNBREAKABLE RULES - Core constraints (identity, design, parameters)
 * 2. DETAILED SPECIFICATIONS - Variable parameters for this job
 * 3. QUALITY CONTROL - What to avoid
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
  
  labels.push(`[IMAGE 1] DESIGN ASSET - Copy every pixel exactly as shown.`);

  if (hasHeadshot) {
    labels.push(`[IMAGE 2] MODEL IDENTITY - Match this person's face, skin, hair, and body exactly.`);
  }

  if (hasPreviousReference) {
    const imageNum = hasHeadshot ? 3 : 2;
    labels.push(`[IMAGE ${imageNum}] ENVIRONMENT REFERENCE - Match background, lighting, and photography style.`);
  }

  return labels.join('\n');
}

/**
 * SECTION 1: UNBREAKABLE RULES
 */
function buildUnbreakableRules(input: MockupPromptInput): string {
  const { personaLock, product, color, journey, designAnalysis } = input;

  const modelRule = personaLock ? 
    `Face: ${personaLock.persona.facialFeatures} | Hair: ${personaLock.persona.hairStyle}, ${personaLock.persona.hairColor}
Skin: ${personaLock.persona.skinTone} | Eyes: ${personaLock.persona.eyeColor}
Age: ${personaLock.persona.age} | Sex: ${personaLock.persona.sex} | Ethnicity: ${personaLock.persona.ethnicity}
The result must be immediately recognizable as the same individual from [IMAGE 2].` 
    : 'No model reference provided. Use invisible mannequin or flat lay.';

  const dtgPlacement = `DTG PRINT ZONE (CRITICAL):
- Design MUST be PERFECTLY CENTERED on the chest (equal distance from left and right armholes)
- Maximum print area: 12" wide × 14" tall, positioned 2-3" below collar
- Design MUST NOT touch or extend onto: sleeves, shoulders, collar, side seams, or hem
- Solid ${color.name} fabric MUST be clearly visible on ALL areas outside the print zone
- The printed area should occupy roughly 30-40% of the visible front garment surface`;

  const aopPlacement = `AOP COVERAGE: Pattern covers entire garment edge-to-edge with seamless continuity. No boundary between design and fabric.`;

  return `
═══ UNBREAKABLE RULES ═══

1. MODEL IDENTITY
${modelRule}

2. DESIGN PLACEMENT
${journey === 'AOP' ? aopPlacement : dtgPlacement}

3. FABRIC INTEGRATION
The design is PRINTED INK on cotton, not a digital overlay:
- Design follows every fold and body curve because it IS the fabric
- Fabric weave texture shows through printed colors
- Light and shadow affect design and fabric identically
- Minimum 5-7 visible folds that interrupt and distort the design naturally

4. COLOR LOCK
- Garment: ${color.name} (${color.hex}) - exact match on non-printed areas
- Design: ${designAnalysis.dominantColors.slice(0, 4).join(', ')} - no color shift
`;
}

/**
 * SECTION 2: DETAILED SPECIFICATIONS
 */
function buildDetailedSpecs(input: MockupPromptInput): string {
  const { 
    product, color, angle, personaLock, modelDetails, 
    journey, currentSize, lightingPreset, environmentPrompt, outputQuality 
  } = input;

  const qualitySpec = OUTPUT_QUALITY_SPECS[outputQuality || 'high'];
  const size = currentSize || modelDetails?.modelSize || personaLock?.persona.size || 'M';

  const modelSpec = personaLock ? `
MODEL: ${personaLock.persona.name} (${personaLock.persona.age}yo ${personaLock.persona.sex}, ${personaLock.persona.ethnicity})
Build: ${personaLock.persona.height}, ${personaLock.persona.weight}, ${personaLock.persona.build}
${modelDetails?.customization?.expression ? `Expression: ${modelDetails.customization.expression}` : ''}
Size ${size}: ${getSizeBodyRule(size)}` : `Display: Invisible mannequin or flat lay`;

  const cameraSpec = getCameraSpecForAngle(angle);
  const foldSpec = getAngleFoldBehavior(angle);

  return `
═══ SPECIFICATIONS ═══

${modelSpec}

GARMENT: ${product.name} in ${color.name}
Size: ${size} | Method: ${journey === 'AOP' ? 'All-Over Print' : 'DTG'}
Condition: Naturally worn (soft fabric, 5-7 creases from movement)

CAMERA: ${angle} view
${cameraSpec}

FABRIC PHYSICS (${angle}):
${foldSpec}

SCENE: ${environmentPrompt || 'Clean studio backdrop'}
Lighting: ${lightingPreset || 'Three-point studio, soft key at 45°'}

OUTPUT: ${qualitySpec.resolution}px, photorealistic commercial photography
`;
}

/**
 * SECTION 3: QUALITY CONTROL
 */
function buildQualityControl(input: MockupPromptInput): string {
  const { personaLock, journey, color } = input;
  const hasModel = !!personaLock;

  const dtgWarnings = journey !== 'AOP' ? `
DTG FAILURES TO AVOID:
- Design bleeding onto sleeves, shoulders, or sides (keep within chest zone)
- Design off-center (must be perfectly centered horizontally)
- Design too large (should not dominate the entire garment)
- Missing ${color.name} fabric visibility around the print` : '';

  return `
═══ AVOID THESE FAILURES ═══

DESIGN INTEGRATION:
- Flat/sticker-like overlay that ignores fabric folds
- Design with different lighting than the garment
- Unnaturally crisp edges that "float" on fabric
- Design remaining undistorted while fabric wraps around body
${dtgWarnings}
${hasModel ? `
IDENTITY:
- Substituting a different person than [IMAGE 2]
- Changing face, age, ethnicity, or body type` : ''}

TECHNICAL:
- Blurry, grainy, or poorly lit images
- Incorrect anatomy (wrong finger count, misaligned eyes)
- Visible artifacts or unnatural color casts
`;
}

/**
 * Helper: Get size-to-body matching rule (condensed)
 */
function getSizeBodyRule(size: string): string {
  const rules: Record<string, string> = {
    'XS': 'Petite frame, 100-120 lbs',
    'S': 'Slim build, 120-140 lbs',
    'M': 'Average/athletic, 140-170 lbs',
    'L': 'Solid build, 170-200 lbs',
    'XL': 'Fuller build, 200-230 lbs',
    'XXL': 'Broad frame, 230-270 lbs',
    'XXXL': 'Plus-size, 270-310 lbs',
    '4XL': 'Plus-size, 310-350 lbs',
    '5XL': 'Plus-size, 350-400+ lbs'
  };
  return rules[size] || rules['M'];
}

/**
 * Helper: Get camera specifications for angle (condensed)
 */
function getCameraSpecForAngle(angle: MockupAngle): string {
  const specs: Record<MockupAngle, string> = {
    'front': '50mm f/4, straight-on, centered composition',
    'three-quarter': '35mm f/4, 45° rotation, dynamic perspective',
    'side': '85mm f/2.8, 90° profile, sharp detail',
    'closeup': '100mm macro f/2.8, tight crop on print area',
    'size-chart': '50mm f/5.6, full garment visible'
  };
  return specs[angle] || specs['front'];
}

/**
 * Helper: Get angle-specific fold behavior (condensed)
 */
function getAngleFoldBehavior(angle: MockupAngle): string {
  const behaviors: Record<MockupAngle, string> = {
    'front': `- Design centered on chest with minimal perspective distortion
- Vertical gravity folds, horizontal movement creases
- Design curves slightly inward near armholes
- Body contour creates subtle horizontal warping across design`,

    'three-quarter': `- Design wraps around torso, far side foreshortens 40-60%
- Side closest to camera shows full detail
- Folds at side seam create shadow valleys
- Natural bunching at waist and underarm`,

    'side': `- Only narrow strip of front design visible, heavily foreshortened
- Design wraps dramatically around torso edge
- Deep creases at side seam where design disappears
- Print elements "turn the corner" with perspective warp`,

    'closeup': `- Fabric weave highly visible through ink
- Micro-creases and thread-level detail apparent
- Clear breaks in design continuity at any folds`,

    'size-chart': `- Minimal distortion for clarity
- Natural fabric drape on mannequin
- Accurate size representation`
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

GENERATE: A photorealistic product photo with the design from [IMAGE 1] printed onto the ${input.color.name} ${input.product.name}. The design is ink on fabric - it folds, curves, and stretches with the garment naturally.`;

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
