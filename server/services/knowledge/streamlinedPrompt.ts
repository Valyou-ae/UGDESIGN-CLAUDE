/**
 * STREAMLINED PROMPT BUILDER
 * Clean 3-section structure optimized for Gemini image generation
 * 
 * Structure:
 * 1. UNBREAKABLE RULES - The absolute source of truth
 * 2. DETAILED SPECIFICATIONS - Variable parameters for the job
 * 3. QUALITY CONTROL - Prose-based negative guidance
 */

export interface ModelSpec {
  personaId: string;
  name: string;
  age: number;
  sex: 'Male' | 'Female';
  ethnicity: string;
  height: string;
  weight: string;
  build: string;
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  skinTone: string;
  facialFeatures: string;
  size: string;
  expression?: string;
  pose?: string;
  posture?: string;
  complexionNotes?: string;
  somaticDescription?: string;
}

export interface GarmentSpec {
  productName: string;
  category: string;
  subcategory?: string;
  color: string;
  colorHex: string;
  printMethod: 'DTG' | 'AOP' | 'Sublimation';
  materialDescription: string;
  wearCondition: 'brand_new' | 'lightly_worn' | 'well_worn';
  size: string;
  printAreaWidth: number;
  printAreaHeight: number;
}

export interface SceneSpec {
  environment: string;
  lightingSetup: string;
  lightingDescription: string;
  cameraAngle: 'front' | 'three-quarter' | 'side' | 'closeup' | 'back';
  lensType: string;
  focalLength: string;
  aperture: string;
}

export interface DistortionSpec {
  chestWidth: number;
  cylinderRadius: number;
  foldCount: number;
  printWidthInches: number;
}

export interface PromptConfig {
  model?: ModelSpec;
  garment: GarmentSpec;
  scene: SceneSpec;
  distortion: DistortionSpec;
  designColors: string[];
  hasHeadshot: boolean;
  hasPreviousReference: boolean;
  isAOP: boolean;
  aopAccentColor?: string;
  // Full description blocks from renderSpec - preserve complete context
  fullPersonaDescription?: string;
  fullDesignDescription?: string;
  contourDescription?: string;
  printIntegrationDescription?: string;
  humanRealismDescription?: string;
  additionalNegatives?: string;
}

function buildUnbreakableRules(config: PromptConfig): string {
  const modelRule = config.model ? `
RULE 1: MODEL IDENTITY LOCK
The person in [IMAGE 2] is the ONLY acceptable model. You must render this EXACT individual:
- Same face, same skin tone (${config.model.skinTone}), same hair (${config.model.hairColor} ${config.model.hairStyle})
- Same body type: ${config.model.build} build, ${config.model.height}, ${config.model.weight}
- Age: ${config.model.age} years old | Sex: ${config.model.sex} | Ethnicity: ${config.model.ethnicity}
- Do NOT substitute with a different person. The result must be immediately recognizable as [IMAGE 2].
Ignore the background/lighting of [IMAGE 2] - use it ONLY for identity reference.` : `
RULE 1: MODEL IDENTITY LOCK
Display the garment on an invisible mannequin or flat lay. No human model required.`;

  return `
═══════════════════════════════════════════════════════════════════════════════
                         UNBREAKABLE RULES
═══════════════════════════════════════════════════════════════════════════════

${modelRule}

RULE 2: DESIGN INTEGRITY LOCK
[IMAGE 1] contains the EXACT artwork to transfer onto the garment. This is a TECHNICAL TRANSFER operation:
- COPY the design exactly - every pixel, color, letter, and detail must match the source
- Do NOT redraw, reinterpret, or generate new artwork "inspired by" the design
- The design IS the fabric - they are one unified material, not a sticker applied on top
- The artwork was printed INTO the cotton fibers before the garment was cut and sewn
- When the fabric folds, the design folds. When it stretches, the design stretches. Same material, same behavior.
- Fabric texture is visible through the printed ink. Shadows fall across design and fabric equally.

RULE 3: PARAMETER LOCK
These parameters are fixed and must be rendered exactly:
- Garment color: ${config.garment.color} (${config.garment.colorHex}) - visible on all non-printed areas
- Garment size: ${config.garment.size} - the fit must be appropriate for this size
- Design colors: ${config.designColors.join(', ')} - reproduced accurately, no color drift
${config.isAOP && config.aopAccentColor ? `- AOP trim color: ${config.aopAccentColor} - use on collar, cuffs, waistband` : ''}

═══════════════════════════════════════════════════════════════════════════════
`;
}

function buildDetailedSpecifications(config: PromptConfig): string {
  // Use full persona description if available, otherwise build from model spec
  const modelSection = config.fullPersonaDescription ? `
【THE MODEL】
${config.fullPersonaDescription}` : config.model ? `
【THE MODEL】
Render the person from [IMAGE 2] with these characteristics:
- Identity: ${config.model.name}, ${config.model.age}-year-old ${config.model.sex.toLowerCase()}
- Ethnicity: ${config.model.ethnicity} with ${config.model.skinTone} skin tone
- Face: ${config.model.facialFeatures}, ${config.model.eyeColor} eyes
- Hair: ${config.model.hairStyle} ${config.model.hairColor} hair
- Body: ${config.model.build} build, ${config.model.height}, ${config.model.weight}
- Size context: Body proportions must match a ${config.garment.size} garment wearer
${config.model.expression ? `- Expression: ${config.model.expression}` : ''}
${config.model.pose ? `- Pose: ${config.model.pose}` : ''}
${config.model.posture ? `- Posture: ${config.model.posture}` : ''}
${config.model.complexionNotes ? `- Complexion: ${config.model.complexionNotes}` : ''}
${config.model.somaticDescription ? `- Physical details: ${config.model.somaticDescription}` : ''}` : '';

  const wearConditionText = {
    'brand_new': 'Brand new, fresh from packaging with crisp fabric',
    'lightly_worn': 'Lightly worn (2-3 uses), natural drape with subtle creases',
    'well_worn': 'Well-worn, comfortable softness with visible wear patterns'
  }[config.garment.wearCondition];

  return `
═══════════════════════════════════════════════════════════════════════════════
                       DETAILED SPECIFICATIONS
═══════════════════════════════════════════════════════════════════════════════

【RENDERING ENGINE FRAMING】
You are a photorealistic rendering engine. This is a TECHNICAL RENDERING task with precise specifications - not a creative illustration. Adherence to all rules is mandatory.
${modelSection}

【THE GARMENT】
- Product: ${config.garment.productName} (${config.garment.category}${config.garment.subcategory ? ` / ${config.garment.subcategory}` : ''})
- Color: ${config.garment.color} (${config.garment.colorHex})
- Material: ${config.garment.materialDescription}
- Print method: ${config.garment.printMethod}
- Condition: ${wearConditionText}
- Print area: ${config.garment.printAreaWidth}" × ${config.garment.printAreaHeight}" centered on chest

【THE SCENE】
- Environment: ${config.scene.environment}
- Lighting: ${config.scene.lightingSetup} - ${config.scene.lightingDescription}
- Camera: ${config.scene.cameraAngle} view
- Lens: ${config.scene.lensType}, ${config.scene.focalLength}, ${config.scene.aperture}

【3D DISTORTION & FABRIC PHYSICS】
The torso is a curved cylinder approximately ${config.distortion.chestWidth}cm wide. The design must respond to this 3D surface:

Cylindrical Mapping:
- Design center appears at full width facing camera
- Design edges curve away toward body sides, narrowing in perspective
- Horizontal lines in the design curve to follow the torso's cylindrical shape

Fabric Behavior (minimum ${config.distortion.foldCount} visible creases required):
- Natural folds and creases interrupt the design - letters break at fold lines
- Underarm compression causes fabric bunching - design bunches with it
- Chest stretch causes fabric tension - design stretches proportionally
- Micro-wrinkles at movement areas affect both fabric and design equally

Print Integration:
- Design occupies approximately ${config.garment.printAreaWidth}" × ${config.garment.printAreaHeight}" on front
- Cotton weave texture visible through printed ink areas
- Ink is absorbed into fibers, not sitting on surface
- Single light source illuminates both fabric and design identically

【SEAM & CONSTRUCTION INTEGRATION】
The design was printed on fabric BEFORE the garment was cut and sewn:
- Design continues through side seams (may show slight offset from sewing)
- Shoulder seams create natural breaks in the design
- Hem stitching creates subtle horizontal lines through the design
- At underarm areas: fabric bunches, design must show compression and micro-folds
- At chest center: fabric stretches slightly, design stretches proportionally

【MANDATORY FABRIC BEHAVIORS】
The following MUST be visible in the final render:
- At least 3 visible folds/creases that interrupt the design
- When a fold crosses text, the text shows a break at the fold line
- Design narrows toward body edges due to natural perspective
- Horizontal lines in design curve to follow body contour
- Shadows on fabric = shadows on design (same intensity)
- Highlights on fabric = highlights on design (same brightness)
${config.fullDesignDescription ? `
【DESIGN SPECIFICATION】
${config.fullDesignDescription}` : ''}
${config.contourDescription ? `
【BODY CONTOUR DISTORTION】
${config.contourDescription}` : ''}
${config.printIntegrationDescription ? `
【PRINT INTEGRATION DETAILS】
${config.printIntegrationDescription}` : ''}
${config.humanRealismDescription ? `
【HUMAN REALISM REQUIREMENTS】
${config.humanRealismDescription}` : ''}

═══════════════════════════════════════════════════════════════════════════════
`;
}

function buildQualityControl(config: PromptConfig): string {
  const modelNegatives = config.model ? `
Do not render a different person than [IMAGE 2]. Do not change their ethnicity, age, or sex. Do not show a ${config.model.sex === 'Male' ? 'female' : 'male'} model. Do not alter their facial features, skin tone, or body type. The person must be immediately recognizable as the same individual.` : '';

  return `
═══════════════════════════════════════════════════════════════════════════════
                         QUALITY CONTROL
═══════════════════════════════════════════════════════════════════════════════

【DESIGN FAILURES TO AVOID】
Do not render the design as a flat digital overlay or sticker pasted onto the fabric. The design must not remain perfectly rectangular while the garment shows folds and creases. Do not create a visible boundary between the printed area and the blank fabric. The design should not have different lighting than the surrounding garment - no glowing, backlit, or separate shadow directions. Do not generate new artwork inspired by [IMAGE 1] - copy it exactly, including every letter, color, and detail.

【FABRIC FAILURES TO AVOID】
Do not render perfectly smooth fabric with no natural creases or wear. The garment should not look stiff and brand-new unless specified. Do not show the design ignoring body contours - it must curve with the chest and compress at underarms. Letters and artwork must break and shift at fold lines, not remain perfectly aligned across creases.

【TECHNICAL FAILURES TO AVOID】
Do not produce blurry, grainy, or pixelated output. Avoid overexposure, underexposure, or incorrect white balance. Do not render extra limbs, missing fingers, or anatomical errors. Avoid the uncanny valley - skin should have natural texture with pores and subtle imperfections, not plastic smoothness.
${modelNegatives}
${config.additionalNegatives ? `
【ADDITIONAL QUALITY REQUIREMENTS】
${config.additionalNegatives}` : ''}

【OUTPUT REQUIREMENT】
Generate a single photorealistic product photograph. The design from [IMAGE 1] must appear as a real physical print that has become one with the fabric - folding, stretching, and receiving light exactly as the garment does.

═══════════════════════════════════════════════════════════════════════════════
`;
}

function buildImageLabels(config: PromptConfig): { label: string; index: number }[] {
  const labels: { label: string; index: number }[] = [];
  let index = 1;

  labels.push({
    index,
    label: `[IMAGE ${index}] - DESIGN ASSET
This is the EXACT artwork to transfer onto the garment. Copy every pixel, color, and detail exactly. Do not redraw or reinterpret.`
  });
  index++;

  if (config.hasHeadshot) {
    labels.push({
      index,
      label: `[IMAGE ${index}] - MODEL IDENTITY REFERENCE
This is the person who must wear the garment. Match their face, skin tone, hair, and body exactly. Ignore background/lighting.`
    });
    index++;
  }

  if (config.hasPreviousReference) {
    labels.push({
      index,
      label: `[IMAGE ${index}] - STYLE/ENVIRONMENT REFERENCE
Match the background, lighting, and photography style from this reference exactly.`
    });
  }

  return labels;
}

export function buildStreamlinedPrompt(config: PromptConfig): {
  imageLabels: { label: string; index: number }[];
  promptText: string;
} {
  const imageLabels = buildImageLabels(config);
  
  const promptText = `${buildUnbreakableRules(config)}
${buildDetailedSpecifications(config)}
${buildQualityControl(config)}`;

  return { imageLabels, promptText };
}

export function getDefaultDistortionSpec(productName: string): DistortionSpec {
  const normalizedName = productName.toLowerCase();
  
  if (normalizedName.includes('hoodie')) {
    return { cylinderRadius: 17, chestWidth: 34, printWidthInches: 12, foldCount: 9 };
  }
  if (normalizedName.includes('long sleeve') || normalizedName.includes('longsleeve')) {
    return { cylinderRadius: 15, chestWidth: 30, printWidthInches: 14, foldCount: 8 };
  }
  if (normalizedName.includes('sweatshirt') || normalizedName.includes('sweater')) {
    return { cylinderRadius: 16, chestWidth: 32, printWidthInches: 12, foldCount: 8 };
  }
  if (normalizedName.includes('tank')) {
    return { cylinderRadius: 14, chestWidth: 28, printWidthInches: 10, foldCount: 5 };
  }
  
  return { cylinderRadius: 15, chestWidth: 30, printWidthInches: 14, foldCount: 7 };
}
