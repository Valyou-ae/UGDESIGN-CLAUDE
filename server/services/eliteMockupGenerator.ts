/**
 * ELITE MOCKUP GENERATOR SERVICE
 * Implements the "Lock-In" consistency system for high-quality product mockups
 */

import { promises as fs } from 'fs';
import path from 'path';
import { GoogleGenAI, Modality } from "@google/genai";
import { logger } from "../logger";
import type {
  MockupAngle,
  ModelDetails,
  BrandStyleKey,
  MaterialPresetKey,
  ProductColor,
  Product,
  GenerationJob,
  GeneratedMockup,
  MockupBatch,
  JourneyType,
  MockupGenerationRequest,
  UnifiedPersona,
  DesignAnalysis,
  Size,
  OutputQuality,
  ModelCustomization
} from "@shared/mockupTypes";
import { OUTPUT_QUALITY_SPECS } from "@shared/mockupTypes";
import {
  BRAND_STYLES,
  CAMERA_SPECS,
  getCameraSpecsForAngle,
  getNegativePrompts,
  getContourDistortionPrompt,
  getLightingSetup,
  getFabricPhysics,
  getPrintMethod,
  getMaterialPreset,
  getSomaticProfile,
  getSomaticProfilePrompt,
  getProduct,
  getFullHumanRealismPrompt,
  getRandomPersona,
  getExactPersona,
  getEthnicFeatures,
  getRandomName,
  getGarmentBlueprintPrompt,
  getProductNegativePrompts,
  getProductVisualAnchors,
  getPrintRealismBlock,
  getPrintRealismNegatives,
  get3DDistortionPhysicsBlock,
  getGarmentConditionBlock,
  getRenderingEngineFraming,
  getImageAssetRules,
  getDesignAsFabricBlock,
  getSeamIntegrationBlock,
  getPositiveFabricRequirements
} from "./knowledge";
import { getHeadshotPath, getHeadshotBase64 } from "./knowledge/headshotMapping";
import { compositeDesignOntoGarment, getBlankGarmentPrompt } from "./designCompositor";
import { buildStreamlinedPrompt, type MockupPromptInput } from "./promptBuilders/mockupPromptBuilder";

const genAI = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.AI_INTEGRATIONS_GEMINI_API_KEY || ""
});

const MODELS = {
  FAST_ANALYSIS: "gemini-2.5-flash",
  IMAGE_GENERATION: "gemini-3-pro-image-preview",
} as const;

const GENERATION_CONFIG = {
  MAX_CONCURRENT_JOBS: 3,
  RATE_LIMIT_PER_MINUTE: 10,
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 2000,
  JOB_TIMEOUT_MS: 60000,
  // USE_STREAMLINED_PROMPT: true = V2 (new 3-section structure), false = V1 (legacy verbose)
  // Set env var USE_STREAMLINED_PROMPT=false to disable V2
  USE_STREAMLINED_PROMPT: process.env.USE_STREAMLINED_PROMPT !== 'false', // Default to V2 unless explicitly disabled
};

let currentJobCount = 0;
let lastMinuteRequests: number[] = [];

interface LockData {
  type: string;
  locked: boolean;
  summary: string;
  details: Record<string, string | string[] | number | boolean | undefined>;
}

interface RenderSpecification {
  locks: {
    persona?: LockData;
    product: LockData;
    color: LockData;
    sizeFit?: LockData;
    design: LockData;
    camera: LockData;
    lighting: LockData;
    aopPhysics?: LockData;
    contour?: LockData;
  };
  personaDescription: string;
  productDescription: string;
  designDescription: string;
  cameraDescription: string;
  lightingDescription: string;
  environmentDescription: string;
  materialDescription: string;
  contourDescription: string;
  printIntegrationDescription: string;
  humanRealismDescription: string;
  negativePrompts: string;
  fullPrompt: string;
}

export interface PersonaLock {
  persona: UnifiedPersona;
  headshot?: string;
  somaticDescription: string;
}

export async function analyzeDesignForMockup(imageBase64: string): Promise<DesignAnalysis> {
  const systemInstruction = `You are an expert product design analyst. Analyze this uploaded design for product mockup placement.

Determine:
1. Dominant colors (3-5 hex codes)
2. Style (minimalist, bold, vintage, modern, artistic, etc.)
3. Complexity (simple, moderate, complex, highly detailed)
4. Suggested placement (center chest, full front, small logo, all-over print)
5. Has transparency (true/false)
6. Design type (logo, illustration, photograph, text-based, pattern, graphic)
7. For AOP patterns: suggest an accent color that would work well on collar/cuffs

Respond with JSON:
{
  "dominantColors": ["#hex1", "#hex2"],
  "style": "style description",
  "complexity": "simple|moderate|complex|highly detailed",
  "suggestedPlacement": "placement",
  "hasTransparency": true or false,
  "designType": "type",
  "aopAccentColor": "#hex or null"
}`;

  try {
    const response = await genAI.models.generateContent({
      model: MODELS.FAST_ANALYSIS,
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { data: imageBase64, mimeType: "image/png" } },
            { text: "Analyze this design for product mockup placement." }
          ]
        }
      ],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0,
        topP: 1,
        topK: 1
      }
    });

    const rawJson = response.text;
    if (rawJson) {
      return JSON.parse(rawJson) as DesignAnalysis;
    }
  } catch (error) {
    logger.error("Design analysis failed", error, { source: "eliteMockupGenerator" });
  }

  return {
    dominantColors: ["#000000", "#FFFFFF"],
    style: "modern",
    complexity: "moderate",
    suggestedPlacement: "center chest",
    hasTransparency: false,
    designType: "graphic"
  };
}

export async function generatePersonaLock(modelDetails: ModelDetails): Promise<PersonaLock> {
  const ageGroupMap: Record<string, 'Baby' | 'Toddler' | 'Kids' | 'Teen' | 'Young Adult' | 'Adult' | 'Senior'> = {
    'Baby': 'Baby',
    'Toddler': 'Toddler',
    'Kids': 'Kids',
    'Teen': 'Teen',
    'Young Adult': 'Young Adult',
    'Adult': 'Adult',
    'Senior': 'Senior'
  };
  
  const ageGroup = ageGroupMap[modelDetails.age] || 'Adult';
  
  logger.info("Selecting persona with filters", { 
    source: "eliteMockupGenerator", 
    ageGroup, 
    sex: modelDetails.sex, 
    ethnicity: modelDetails.ethnicity, 
    size: modelDetails.modelSize 
  });
  
  let persona = getExactPersona(
    modelDetails.ethnicity,
    modelDetails.sex,
    modelDetails.modelSize,
    ageGroup
  );

  if (!persona) {
    logger.info("No exact persona match, falling back to random", { source: "eliteMockupGenerator" });
    persona = getRandomPersona({
      ageGroup,
      sex: modelDetails.sex,
      ethnicity: modelDetails.ethnicity,
      size: modelDetails.modelSize
    });
  }

  if (!persona) {
    throw new Error("No matching persona found");
  }

  const isExactMatch = persona.ethnicity === modelDetails.ethnicity && 
                       persona.sex === modelDetails.sex && 
                       persona.size === modelDetails.modelSize &&
                       persona.ageGroup === ageGroup;

  // Use headshot mapping to find pre-stored headshot for this persona
  const headshotPath = getHeadshotPath(persona.id);
  if (headshotPath) {
    persona.headshotUrl = headshotPath;
    logger.info("Headshot found for persona via mapping", { 
      source: "eliteMockupGenerator", 
      personaId: persona.id,
      headshotPath 
    });
  } else {
    logger.warn("No headshot found for persona", { 
      source: "eliteMockupGenerator", 
      personaId: persona.id 
    });
  }

  logger.info("Persona selected for mockup generation", { 
    source: "eliteMockupGenerator", 
    personaId: persona.id,
    personaName: persona.name,
    personaAge: persona.age,
    personaAgeGroup: persona.ageGroup,
    personaSex: persona.sex,
    personaEthnicity: persona.ethnicity,
    personaSize: persona.size,
    requestedAge: modelDetails.age,
    requestedSex: modelDetails.sex,
    requestedEthnicity: modelDetails.ethnicity,
    requestedSize: modelDetails.modelSize,
    isExactMatch,
    hasHeadshot: !!headshotPath
  });

  const somaticProfile = getSomaticProfile(
    modelDetails.age,
    modelDetails.sex,
    modelDetails.ethnicity,
    modelDetails.modelSize
  );

  const somaticPrompt = getSomaticProfilePrompt(
    modelDetails.age,
    modelDetails.sex,
    modelDetails.ethnicity,
    modelDetails.modelSize
  );

  const somaticDescription = `${persona.fullDescription} ${somaticProfile.description} Height: ${somaticProfile.height}, weight: ${somaticProfile.weight}, ${somaticProfile.build} build. ${somaticPrompt}`;

  // Pre-load headshot base64 if available
  const headshot = headshotPath ? getHeadshotBase64(persona.id) : undefined;

  return {
    persona,
    headshot: headshot || undefined,
    somaticDescription
  };
}

export async function generatePersonaHeadshot(
  personaLock: PersonaLock,
  maxRetries: number = GENERATION_CONFIG.MAX_RETRIES
): Promise<string> {
  if (personaLock.persona.headshotUrl) {
    try {
      const headshotPath = path.join(process.cwd(), personaLock.persona.headshotUrl);
      const fileBuffer = await fs.readFile(headshotPath);
      const base64Data = fileBuffer.toString('base64');
      logger.info(`Loaded pre-stored headshot for persona ${personaLock.persona.id}`, { source: "eliteMockupGenerator" });
      return base64Data;
    } catch (error) {
      logger.warn(`Pre-stored headshot not found for ${personaLock.persona.id}, falling back to generation`, { source: "eliteMockupGenerator" });
    }
  }

  const ethnicFeatures = getEthnicFeatures(personaLock.persona.ethnicity);
  
  const headshotPrompt = `Professional passport-style headshot photograph of a ${personaLock.persona.age}-year-old ${personaLock.persona.sex.toLowerCase()} ${personaLock.persona.ethnicity} person.

===== CRITICAL IDENTITY DETAILS (PERSONA ANCHOR) =====
[MANDATORY - This headshot establishes the visual anchor for all subsequent mockup images]

PERSONA IDENTITY:
- Name: ${personaLock.persona.name}
- ${personaLock.somaticDescription}

ETHNIC FEATURE GUIDANCE (${personaLock.persona.ethnicity}):
- Typical hair colors for ethnicity: ${ethnicFeatures.hairColors.join(", ")}
- Typical eye colors for ethnicity: ${ethnicFeatures.eyeColors.join(", ")}
- Common hair styles: ${ethnicFeatures.hairStyles.join(", ")}

SPECIFIC APPEARANCE:
- Hair style: ${personaLock.persona.hairStyle}
- Hair color: ${personaLock.persona.hairColor}
- Eye color: ${personaLock.persona.eyeColor}
- Skin tone: ${personaLock.persona.skinTone}
- Facial features: ${personaLock.persona.facialFeatures}
===== END IDENTITY =====

CAMERA SPECIFICATIONS:
- Lens: 85mm portrait lens, f/2.8
- Framing: Head and shoulders, centered
- Background: Neutral gray studio backdrop
- Expression: Neutral, pleasant, natural

LIGHTING:
- Three-point studio lighting
- Soft key light at 45 degrees
- Fill light at 1:3 ratio
- Subtle rim light for separation

STYLE:
- Clean, professional, ID-photo quality
- Sharp focus on eyes
- Natural skin texture with authentic pores and subtle imperfections
- No retouching artifacts
- Culturally authentic appearance`;

  const negatives = getNegativePrompts('apparel', true);
  const fullPrompt = `${headshotPrompt}\n\nMUST AVOID: ${negatives}`;

  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await genAI.models.generateContent({
        model: MODELS.IMAGE_GENERATION,
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
        config: { responseModalities: [Modality.TEXT, Modality.IMAGE] }
      });

      const candidates = response.candidates;
      if (candidates && candidates.length > 0) {
        const content = candidates[0].content;
        if (content && content.parts) {
          for (const part of content.parts) {
            if (part.inlineData && part.inlineData.data) {
              return part.inlineData.data;
            }
          }
        }
      }
      
      lastError = new Error("No image data in response");
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      logger.error(`Headshot attempt ${attempt + 1}/${maxRetries} failed`, lastError, { source: "eliteMockupGenerator" });
      
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => 
          setTimeout(resolve, GENERATION_CONFIG.RETRY_DELAY_MS * Math.pow(2, attempt))
        );
      }
    }
  }

  throw new Error(`Persona headshot generation failed after ${maxRetries} attempts: ${lastError?.message}`);
}

/**
 * Calculate size-appropriate print area for design
 * Scales design with body size to maintain proportional appearance
 * Fixes issue where designs appear too small on 2XL+ sizes
 */
function getScaledPrintArea(
  baseWidth: number, 
  baseHeight: number, 
  size: string
): { width: number; height: number } {
  // Size multipliers based on industry standards
  // M size is baseline (1.00), others scale proportionally
  const sizeMultipliers: Record<string, number> = {
    'XS': 0.85,   // 85% - petite frame
    'S': 0.92,    // 92% - slim frame
    'M': 1.00,    // 100% - baseline (12" if base is 12")
    'L': 1.08,    // 108% - larger frame
    'XL': 1.17,   // 117% - stocky frame
    '2XL': 1.33,  // 133% - plus size (16" if base is 12")
    '3XL': 1.42,  // 142% - larger plus size
    '4XL': 1.50,  // 150% - extra large plus size
    '5XL': 1.58   // 158% - very large plus size
  };
  
  const multiplier = sizeMultipliers[size] || 1.00;
  
  logger.debug("Scaling print area for size", {
    source: "eliteMockupGenerator",
    size,
    multiplier,
    baseWidth,
    scaledWidth: (baseWidth * multiplier).toFixed(1)
  });
  
  return {
    width: Math.round(baseWidth * multiplier * 10) / 10,  // Round to 1 decimal
    height: Math.round(baseHeight * multiplier * 10) / 10
  };
}

export function buildRenderSpecification(
  designAnalysis: DesignAnalysis,
  product: Product,
  color: ProductColor,
  angle: MockupAngle,
  modelDetails: ModelDetails | undefined,
  personaLock: PersonaLock | undefined,
  brandStyle: BrandStyleKey,
  journey: JourneyType,
  materialCondition: MaterialPresetKey = 'BRAND_NEW',
  lightingPreset?: string,
  environmentPrompt?: string,
  currentSize?: string,
  patternScale?: number,
  outputQuality: OutputQuality = 'high'
): RenderSpecification {
  const qualitySpec = OUTPUT_QUALITY_SPECS[outputQuality];
  const style = BRAND_STYLES[brandStyle];
  const cameraSpec = getCameraSpecsForAngle(angle);
  const lightingSetup = lightingPreset ? getLightingSetup(lightingPreset) : getLightingSetup('three-point-classic');
  const materialPreset = getMaterialPreset(materialCondition);
  const printMethod = getPrintMethod(journey);
  const fabricPhysics = getFabricPhysics(product.subcategory || product.category);
  const garmentBlueprint = product.isWearable ? getGarmentBlueprintPrompt(product) : "";

  const sizeForBody = (currentSize || modelDetails?.modelSize || personaLock?.persona.size || 'M') as Size;
  
  // PERSONA-FIRST APPROACH: Use persona's embedded body data ONLY if size matches
  // This ensures size-specific body variation while using persona data when applicable
  // If generating a different size than the persona's native size, fall back to somatic profiles
  const personaSizeMatches = personaLock?.persona?.size === sizeForBody;
  const personaHasBodyData = personaLock?.persona?.height && personaLock?.persona?.weight && personaLock?.persona?.build;
  
  // Only use persona body data if the persona's size matches the requested size
  const personaBodyData = (personaSizeMatches && personaHasBodyData) ? {
    height: personaLock!.persona.height,
    weight: personaLock!.persona.weight,
    build: personaLock!.persona.build,
    description: personaLock!.persona.fullDescription || `${personaLock!.persona.build} build, ${personaLock!.persona.height} tall, ${personaLock!.persona.weight}`
  } : null;
  
  // FALLBACK: Use somatic profile when persona size doesn't match OR no persona available
  // This ensures each size gets appropriate body proportions
  const somaticFallback = !personaBodyData && modelDetails ? getSomaticProfile(
    modelDetails.age,
    modelDetails.sex,
    modelDetails.ethnicity,
    sizeForBody
  ) : null;
  
  // Unified body data: persona (if size matches) first, somatic fallback for other sizes
  const bodyData = personaBodyData || somaticFallback;

  const customization = modelDetails?.customization;
  const customizationBlock = customization ? `
===== MODEL CUSTOMIZATION (USER PREFERENCES) =====
${customization.hairStyle ? `- Hair Style Preference: ${customization.hairStyle} hair length` : ''}
${customization.expression ? `- Expression: ${customization.expression} facial expression - ${
  customization.expression === 'Smiling' ? 'warm, genuine smile showing confidence' :
  customization.expression === 'Serious' ? 'focused, determined, professional demeanor' :
  customization.expression === 'Candid' ? 'natural, unposed, caught-in-the-moment look' :
  'neutral, relaxed expression'
}` : ''}
${customization.poseSuggestion ? `- Pose Style: ${customization.poseSuggestion} pose - ${
  customization.poseSuggestion === 'Casual' ? 'relaxed, natural stance, hands in pockets or at sides' :
  customization.poseSuggestion === 'Athletic' ? 'dynamic, active pose suggesting movement or energy' :
  customization.poseSuggestion === 'Professional' ? 'confident business stance, poised and polished' :
  'everyday lifestyle pose, natural and relatable'
}` : ''}
===== END MODEL CUSTOMIZATION =====` : '';

  const personaLockBlock = product.isWearable && personaLock ? `
===== PERSONA LOCK (CONSISTENCY ANCHOR) =====
[LOCKED - DO NOT DEVIATE FROM THESE IDENTITY DETAILS]
[THIS SAME PERSON MUST APPEAR IN EVERY SHOT]

PRIMARY IDENTITY:
- Persona ID: ${personaLock.persona.id}
- Name: ${personaLock.persona.name}
- Age: ${personaLock.persona.age}
- Sex: ${personaLock.persona.sex} (MUST be ${personaLock.persona.sex.toLowerCase()} - do not show opposite sex)
- Ethnicity: ${personaLock.persona.ethnicity} (CRITICAL - see enforcement below)

FACIAL IDENTITY (KEEP CONSISTENT ACROSS ALL SIZES):
- Hair: ${customization?.hairStyle || personaLock.persona.hairStyle}, ${personaLock.persona.hairColor}
- Eyes: ${personaLock.persona.eyeColor}
- Skin tone: ${personaLock.persona.skinTone}
- Facial features: ${personaLock.persona.facialFeatures}
${customizationBlock}

===== SIZE-SPECIFIC BODY TYPE (SIZE: ${sizeForBody}) =====
[CRITICAL - BODY MUST MATCH THE GARMENT SIZE - THIS IS MANDATORY]
${bodyData ? `
- Height: ${bodyData.height}
- Weight: ${bodyData.weight}
- Build: ${bodyData.build}
- Body description: ${bodyData.description}
` : `
- Height: ${personaLock.persona.height}
- Weight: ${personaLock.persona.weight}
- Build: ${personaLock.persona.build}
`}
===== SIZE-TO-BODY MATCHING RULES (MANDATORY) =====
${sizeForBody === 'XS' ? `XS BODY REQUIREMENT: Very slim/petite person. Narrow shoulders, thin frame. Weight 100-120 lbs. DO NOT show average or large body.` :
sizeForBody === 'S' ? `S BODY REQUIREMENT: Slim/lean person. Smaller frame, lean build. Weight 120-140 lbs. DO NOT show average or large body.` :
sizeForBody === 'M' ? `M BODY REQUIREMENT: Average/athletic person. Standard proportions. Weight 140-170 lbs. DO NOT show very thin or heavy body.` :
sizeForBody === 'L' ? `L BODY REQUIREMENT: Solid/sturdy person. Slightly larger frame. Weight 170-200 lbs. DO NOT show thin or very heavy body.` :
sizeForBody === 'XL' ? `XL BODY REQUIREMENT: Larger/stocky person. Fuller build, broader shoulders. Weight 200-230 lbs. DO NOT show thin or average body.` :
sizeForBody === 'XXL' ? `XXL BODY REQUIREMENT: Heavyset person. Broad frame, larger belly visible. Weight 230-270 lbs. DO NOT show thin, average, or only slightly large body.` :
sizeForBody === 'XXXL' ? `XXXL BODY REQUIREMENT: Plus-size person. Very broad frame, visible larger body mass. Weight 270-310 lbs. DO NOT show thin or average body - MUST be clearly plus-size.` :
sizeForBody === '4XL' ? `4XL BODY REQUIREMENT: Plus-size person. Extra broad frame, clearly heavy build. Weight 310-350 lbs. DO NOT show anything less than clearly plus-size body.` :
sizeForBody === '5XL' ? `5XL BODY REQUIREMENT: Very large plus-size person. Very broad frame, very heavy build clearly visible. Weight 350-400+ lbs. DO NOT show anything less than very heavy plus-size body.` :
`Body should match the garment size appropriately.`}

BODY SIZE VIOLATION EXAMPLES (DO NOT DO THESE):
- Showing a slim/athletic person for 4XL or 5XL = CRITICAL VIOLATION
- Showing a heavy person for XS or S = CRITICAL VIOLATION
- Showing the same body type for all sizes = CRITICAL VIOLATION
===== END SIZE-SPECIFIC BODY =====

===== CRITICAL IDENTITY ENFORCEMENT =====
[MANDATORY - FAILURE TO MATCH THESE IS NOT ACCEPTABLE]

1. AGE ENFORCEMENT (CRITICAL):
   - The model MUST appear to be ${personaLock.persona.age} years old
   - DO NOT show an older or younger person
   - If age is 13-17, the model MUST look like a TEENAGER, not an adult
   - If age is 18-24, the model MUST look like a YOUNG ADULT, not middle-aged
   - Facial features, skin texture, and body proportions must match the specified age

2. SEX ENFORCEMENT:
   - The model MUST be ${personaLock.persona.sex.toLowerCase()}
   - Do NOT show a ${personaLock.persona.sex === 'Male' ? 'female' : 'male'} under any circumstances

3. ETHNICITY ENFORCEMENT (HIGHEST PRIORITY):
   - Ethnicity: ${personaLock.persona.ethnicity}
   - Skin tone: ${personaLock.persona.skinTone} (EXACT MATCH REQUIRED)
   - Facial features: ${personaLock.persona.facialFeatures}
   - Eye shape/color: ${personaLock.persona.eyeColor}
   - Hair texture/color: ${personaLock.persona.hairColor}, ${personaLock.persona.hairStyle}
   - DO NOT substitute one ethnicity for another (e.g., do not show Asian when Middle Eastern is specified)
   - DO NOT blend ethnic features incorrectly

4. BODY SIZE ENFORCEMENT (SIZE: ${sizeForBody}):
${bodyData ? `   - Build: ${bodyData.build}
   - Weight: ${bodyData.weight}
   - Height: ${bodyData.height}
   - The body MUST match these size-specific specifications
   - A ${sizeForBody} garment should be worn by a person with ${bodyData.build}` : `   - Build: ${personaLock.persona.build}
   - Weight: ${personaLock.persona.weight}
   - The body MUST match these specifications exactly`}

5. CROSS-SHOT CONSISTENCY:
   - This EXACT same person must appear in ALL angle shots
   - Same face, same body, same features across front, side, three-quarter, and close-up views
   - If a reference headshot image is provided, match that EXACT person in every shot

${getFullHumanRealismPrompt()}
===== END PERSONA LOCK =====` : product.isWearable ? `
===== DISPLAY MODE =====
Product displayed on invisible mannequin or flat lay (no human model).
===== END DISPLAY MODE =====` : "";

  const patternScaleInches = patternScale ? Math.round((patternScale / 100) * 12) : 6;
  
  const aopColorRules = journey === 'AOP' ? `
===== AOP COLOR DERIVATION RULES =====
[CRITICAL - IGNORE USER COLOR SELECTION FOR AOP]
- BASE COLOR: Derive the garment's base/background color from the OVERALL PERCEIVED BACKGROUND of the seamless pattern image
- The base color is NOT "${color.name}" - analyze the pattern and determine the dominant background color
- TRIM COLOR: Sample the most prominent NON-BACKGROUND accent color from the pattern
${designAnalysis.aopAccentColor ? `- Suggested accent color for trim: ${designAnalysis.aopAccentColor}` : '- Analyze pattern to find the most prominent accent color'}
- Use this trim color for: collar, cuffs, waistband, or any solid-colored construction elements
- The trim color MUST be consistent across ALL mockups in this batch
===== END AOP COLOR RULES =====` : '';

  const colorLockBlock = journey === 'AOP' ? `
===== COLOR LOCK (AOP MODE) =====
[LOCKED - COLORS DERIVED FROM PATTERN]
- Pattern analysis: Use the seamless pattern image as the source of truth for ALL colors
- Base color: Extract from pattern background (NOT the user's color selection)
- Trim/accent color: ${designAnalysis.aopAccentColor || 'Extract most prominent non-background color from pattern'}
- This trim color must be used for: collars, cuffs, waistbands, handles, edges
- Design colors: Pattern colors must be reproduced with EXACT fidelity
- The same trim color must appear on ALL mockups in this batch
${aopColorRules}
===== END COLOR LOCK =====` : `
===== COLOR LOCK =====
[LOCKED - EXACT COLORS REQUIRED]
- Product base color: ${color.name} (${color.hex})
- This EXACT color must be visible on all non-printed areas of the product
- Design colors: ${designAnalysis.dominantColors.join(", ")}
- Design colors must be reproduced accurately without color shift
===== END COLOR LOCK =====`;

  const sizeFitLockBlock = product.isWearable && personaLock ? `
===== SIZE/FIT LOCK =====
[LOCKED - GARMENT MUST FIT AS SPECIFIED]
- Garment size: ${sizeForBody}
${bodyData ? `- Model body type: ${bodyData.build}
- Model weight range: ${bodyData.weight}
- Model height range: ${bodyData.height}` : `- Build type: ${personaLock.persona.build}`}
- Garment must appear properly fitted for this body type
- The person wearing ${sizeForBody} should have a body that naturally fits ${sizeForBody} clothing
- No baggy or overly tight appearance unless specified by product type
${materialPreset.promptAddition}
===== END SIZE/FIT LOCK =====` : "";

  const printSpec = product.printSpec;
  const basePrintWidth = printSpec?.printAreaWidth || 12;
  const basePrintHeight = printSpec?.printAreaHeight || 16;

  // SCALE print area based on body size to fix 2XL+ artwork size issues
  const scaledPrintArea = getScaledPrintArea(basePrintWidth, basePrintHeight, sizeForBody);

  const printAreaDesc = `${scaledPrintArea.width}" x ${scaledPrintArea.height}" (scaled for ${sizeForBody} size)`;

  logger.info("Using size-scaled print area", {
    source: "eliteMockupGenerator",
    size: sizeForBody,
    baseArea: `${basePrintWidth}" x ${basePrintHeight}"`,
    scaledArea: `${scaledPrintArea.width}" x ${scaledPrintArea.height}"`
  });

  const placementDesc = printSpec?.placementDescription || 'Center-chest placement';
  const surfaceDesc = printSpec?.surfaceType || 'flexible';

  const designLockBlock = `
===== DESIGN LOCK =====
[LOCKED - DESIGN APPLICATION AND SIZE RULES]
[THE DESIGN MUST BE THE SAME SIZE IN EVERY SHOT]
[THE DESIGN MUST BE IDENTICAL IN EVERY SHOT - NO MODIFICATIONS]

===== DESIGN IMMUTABILITY (HIGHEST PRIORITY - ABSOLUTELY CRITICAL) =====
[CRITICAL - DO NOT ALTER THE DESIGN IN ANY WAY]
[VIOLATION OF THIS IS THE MOST SERIOUS ERROR POSSIBLE]

PIXEL-PERFECT REPRODUCTION REQUIRED:
- The provided design image is IMMUTABLE and must not be changed AT ALL
- Use the EXACT design as provided - do not redraw, recreate, or reinterpret
- Do NOT make the design "cuter", "simpler", "more stylized", or "different"
- Do NOT change the art style (if design is vintage, keep vintage - do not make it cartoon)
- Do NOT change character poses, expressions, or arrangements in the design
- Do NOT add elements that weren't in the original design
- Do NOT remove elements that were in the original design

PRESERVE EXACTLY:
- All borders, outlines, and strokes exactly as they appear
- All colors exactly as they appear (no color shifts, adjustments, or corrections)
- All text/typography exactly as it appears (same font, size, arrangement)
- If the design has a border/outline, ALL mockups must show that border/outline
- If the design does NOT have a border/outline, do NOT add one
- The design must look IDENTICAL across all sizes (XS through 5XL)
- The design must look IDENTICAL across all angle shots (front, side, three-quarter, close-up)

THE ONLY ACCEPTABLE CHANGES:
- Natural fabric distortion from body contours (design bends with fabric)
- Lighting and shadow integration with the garment
- Perspective changes due to camera angle

DESIGN ALTERATION VIOLATIONS (DO NOT DO THESE):
- Changing art style (e.g., vintage to cartoon) = CRITICAL VIOLATION
- Changing colors in the design = CRITICAL VIOLATION
- Reinterpreting or "improving" the design = CRITICAL VIOLATION
- Making characters look different = CRITICAL VIOLATION
- Adding or removing decorative elements = CRITICAL VIOLATION
===== END IMMUTABILITY =====

- Design style: ${designAnalysis.style}
- Design complexity: ${designAnalysis.complexity}
- Design type: ${designAnalysis.designType}
${journey === 'DTG' ? `- Placement: ${printSpec?.placement || designAnalysis.suggestedPlacement}` : `- Placement: FULL COVERAGE (All-Over Print)`}

${journey === 'DTG' ? `===== PRINT SPECIFICATION (POD INDUSTRY STANDARD) =====
[MANDATORY - PRODUCT-SPECIFIC PRINT AREA]
- Product: ${product.name}
- Print area: ${printAreaDesc}
- Placement: ${printSpec?.placement || 'center'}
- Placement description: ${placementDesc}
- Surface type: ${surfaceDesc}
${printSpec?.bleed ? `- Bleed: ${printSpec.bleed}"` : ''}
${printSpec?.safeZone ? `- Safe zone: ${printSpec.safeZone}" from edges` : ''}
${printSpec?.wrapAround ? '- Wrap-around: Yes (design continues around edges/seams)' : ''}
${printSpec?.notes ? `- Notes: ${printSpec.notes}` : ''}` : `===== AOP PRINT SPECIFICATION (FULL COVERAGE) =====
[MANDATORY - ALL-OVER PRINT COVERS ENTIRE GARMENT]
- Product: ${product.name}
- Coverage: 100% - ENTIRE SURFACE OF GARMENT
- Placement: EDGE-TO-EDGE (no blank areas, no center placement)
- The pattern/design tiles seamlessly across the ENTIRE garment
- THERE IS NO "PRINT AREA" - THE ENTIRE FABRIC IS THE DESIGN
- Collar, cuffs, and trim may have solid accent color derived from pattern`}

${journey === 'DTG' ? `===== DESIGN SIZE LOCK (CRITICAL) =====
[MANDATORY - IDENTICAL DESIGN SIZE ACROSS ALL ANGLES]
- The design must be printed at EXACTLY the specified print area dimensions
- Design size must be IDENTICAL whether viewed from front, side, three-quarter, or any angle
- DO NOT make the design smaller in some shots and larger in others
- When the camera angle changes, the design should appear the SAME physical size on the product
- Only the close-up shot should show the design larger (because the camera is zoomed in)

SIZE CONSISTENCY RULES:
1. FRONT VIEW: Design visible at full print area size (${scaledPrintArea.width}" wide, scaled for ${sizeForBody} body)
2. THREE-QUARTER VIEW: Same design, same size, visible at an angle (appears slightly compressed due to perspective)
3. SIDE VIEW: Design may be partially visible from the side, but same physical size
4. CLOSE-UP VIEW: Zoomed in on the design, so it appears larger (this is expected)` : `===== AOP PATTERN CONSISTENCY LOCK (CRITICAL) =====
[MANDATORY - PATTERN COVERS EVERYTHING]
- The pattern tiles seamlessly across the ENTIRE garment surface
- EVERY ANGLE must show the same pattern covering all visible fabric
- There is NO blank fabric, NO solid color base - ONLY the pattern
- Pattern scale must be IDENTICAL across all angles and all views

AOP CONSISTENCY RULES:
1. FRONT VIEW: Pattern covers entire front of garment edge-to-edge
2. THREE-QUARTER VIEW: Same pattern visible, covering all fabric at angle
3. SIDE VIEW: Pattern continues on side, maintaining tile consistency
4. CLOSE-UP VIEW: Zoomed into the pattern - showing pattern detail, NOT a logo`}

${journey === 'DTG' ? `
DTG PRINT METHOD:
- Design printed directly onto fabric surface
- Maintains original colors and proportions
- Slight texture integration with fabric
- Design follows natural fabric contours and folds

===== PRINT AREA BOUNDARIES (HIGHEST PRIORITY - ABSOLUTE LIMIT) =====
[CRITICAL - THE DESIGN MUST STAY WITHIN THE PRINT AREA ONLY]
[THIS IS NOT ALL-OVER PRINT - THE DESIGN HAS STRICT BOUNDARIES]

MAXIMUM PRINT AREA DIMENSIONS:
- Width: ${scaledPrintArea.width} inches maximum (scaled for ${sizeForBody} size)
- Height: ${printSpec?.printAreaHeight || 16} inches maximum
- The design MUST NOT exceed these dimensions under any circumstances

BOUNDARY ENFORCEMENT (MANDATORY):
- The design occupies ONLY the designated chest print area
- The design MUST NOT extend onto the sleeves
- The design MUST NOT extend onto the shoulders
- The design MUST NOT extend onto the collar/neckline area
- The design MUST NOT extend onto the sides/underarm areas
- The design MUST NOT extend to the bottom hem area
- The design MUST NOT wrap around to the back

WHAT THE FINAL RESULT MUST LOOK LIKE:
- A traditional screen-printed t-shirt with a rectangular design on the chest
- Solid ${color.name} fabric visible on sleeves, shoulders, sides, collar, and below the design
- Clear visible separation between where the design ENDS and plain fabric BEGINS
- The design appears as if pressed/printed in a defined rectangular area on the front chest

DO NOT GENERATE:
- All-over print appearance where design covers entire garment
- Design bleeding onto sleeves or shoulders
- Design extending beyond the chest/front torso area
- Design that touches the collar, armholes, or hem
===== END PRINT AREA BOUNDARIES =====

===== SIZE-SPECIFIC DESIGN SCALING (CRITICAL) =====
[MANDATORY - DESIGN MUST BE PROPORTIONAL TO BODY SIZE]

For ${sizeForBody} size garment:
- Design width: ${scaledPrintArea.width} inches (height: ${scaledPrintArea.height} inches)
- The design must fill approximately 35-45% of the chest width
- The design must look PROPORTIONAL to the ${sizeForBody} body - neither too small nor too large
${sizeForBody === 'XS' || sizeForBody === 'S' ? 
  `- For ${sizeForBody} (petite/slim), the design is ${Math.round((1 - scaledPrintArea.width / basePrintWidth) * 100)}% smaller than baseline to match smaller frame` :
sizeForBody === '2XL' || sizeForBody === '3XL' || sizeForBody === '4XL' || sizeForBody === '5XL' ?
  `- For ${sizeForBody} (plus-size), the design MUST be ${Math.round((scaledPrintArea.width / basePrintWidth - 1) * 100)}% LARGER than baseline
   - DO NOT use the same small design size as you would for M/L sizes
   - The ${scaledPrintArea.width}" design should appear substantial on the ${sizeForBody} body
   - If the design looks too small or "child-sized" on this ${sizeForBody} body, that is a CRITICAL FAILURE` :
  `- For ${sizeForBody} (standard), the design uses baseline proportional sizing`
}

⚠️ CRITICAL SIZE PROPORTION RULES:
- A ${sizeForBody} body requires a ${scaledPrintArea.width}" wide design (NOT the baseline 12" size)
- The design must maintain consistent visual proportion across ALL sizes
- Larger bodies need proportionally larger designs to look professional
- The same 12" design on both M and 5XL bodies = CRITICAL FAILURE

PROPORTION FAILURE EXAMPLES (DO NOT DO THESE):
- Tiny design on 2XL/3XL/4XL/5XL body (looks like children's sizing) = CRITICAL FAILURE
- Using 12" design on 48"+ chest (design covers <25% of chest) = FAILURE
- Design looking like a "pocket logo" when it should be a full chest print = FAILURE
- Same visual design size on XS and 5XL bodies = FAILURE
===== END SIZE-SPECIFIC SCALING =====

CRITICAL PLACEMENT RULES FOR DTG:
- The design/graphic MUST be placed CENTERED on the chest area
- Design should be horizontally centered between left and right edges of shirt front
- Design should be vertically positioned in the upper-center chest area (below collar, above stomach)
- DO NOT place the design on the side, shoulder, sleeve, or off-center
- The design must appear as if professionally screen-printed in the traditional chest logo position
- SURROUNDING AREAS (sleeves, shoulders, sides, collar) MUST show only solid ${color.name} fabric
${fabricPhysics ? `
FABRIC BEHAVIOR:
- Weight: ${fabricPhysics.weight}
- Drape factor: ${fabricPhysics.drapeFactor}%
- Surface texture: ${fabricPhysics.textureDensity}
- Fold characteristics: ${fabricPhysics.foldCharacteristics}` : ''}` : `
AOP PRINT METHOD:
- Seamless edge-to-edge sublimation print
- Pattern tiles continuously across entire garment
- Dye infused into fabric fibers (not on top)
- Zero texture difference between print and fabric
- Pattern maintains scale consistency across seams`}
${printMethod.technicalDescription}
===== END DESIGN LOCK =====`;

  const printIntegrationDescription = product.isWearable ? `
===== PRINT INTEGRATION PHYSICS (CRITICAL - REALISTIC FABRIC PRINTING) =====
[MANDATORY - THE DESIGN MUST LOOK ACTUALLY PRINTED ON FABRIC, NOT DIGITALLY OVERLAID]

ANTI-STICKER MANDATE (HIGHEST PRIORITY):
- The design is NOT a sticker, decal, or digital overlay
- The design must appear ABSORBED INTO the fabric fibers
- The design must look like professional ${journey === 'DTG' ? 'Direct-to-Garment printing' : 'sublimation printing'}
- NEVER render the design as if it's sitting ON TOP of the fabric
- The design is PART OF the fabric, not applied to its surface

INK ABSORPTION PHYSICS:
${journey === 'DTG' ? `- DTG ink saturates into cotton/blend fibers creating a soft, matte finish
- Water-based inks penetrate fiber structure leaving no raised texture
- Ink density varies naturally across print - slightly heavier in dense color areas
- White underbase (if any) creates subtle thickness difference, barely perceptible
- Print areas have same tactile feel as unprintable fabric (soft hand)` : `- Sublimation dye becomes ONE with polyester fibers at molecular level
- NO ink layer sitting on top - the color IS the fiber color now
- Zero texture difference between printed and unprinted areas
- Colors appear from WITHIN the fabric, not on its surface
- Pattern seamlessly integrates as if the fabric was woven with colored threads`}

CONTOUR ADHERENCE (CRITICAL FOR REALISM):
- Where fabric FOLDS: design compresses, colors deepen slightly in shadow
- Where fabric STRETCHES: design expands proportionally with fiber spacing
- Where fabric CURVES over body: design warps naturally following 3D contour
- At CREASES: design shows micro-shadowing, colors darken in valleys
- At PEAKS: design shows highlights, subtle fabric texture visible through ink
- The design MUST bend, stretch, compress, and shadow WITH the fabric

FOLD/CREASE BEHAVIOR:
- Horizontal chest folds: design distorts horizontally, darkens in crease depth
- Vertical side wrinkles: design warps vertically, follows fabric drape
- Arm movement creases: design compresses at joints, stretches at extension
- Body contour curves: design follows torso curvature seamlessly
- Shoulder transitions: design perspective shifts naturally at shoulder curve

${fabricPhysics ? `FABRIC-SPECIFIC PRINT BEHAVIOR:
- Fabric weight: ${fabricPhysics.weight} - affects how ink settles and shadows form
- Surface texture: ${fabricPhysics.textureDensity} - visible through lighter ink areas
- Print absorption: ${fabricPhysics.printAbsorption} - determines ink penetration depth
- Fold behavior: ${fabricPhysics.foldCharacteristics} - guides contour distortion patterns` : ''}

LIGHTING INTEGRATION:
- Design responds to scene lighting exactly as fabric does
- Shadows on fabric = shadows on design (same darkness, same edge softness)
- Highlights on fabric = subtle ink sheen on design
- Design colors shift with ambient light color temperature
- NO separate lighting on design vs fabric - they are ONE surface

WHAT THIS SHOULD LOOK LIKE:
- A real photograph of an actually printed garment
- You can almost feel the fabric texture through the design
- The design is inseparable from the fabric surface
- Natural, professional print shop quality
- NOT a mockup with a graphic overlaid in Photoshop
===== END PRINT INTEGRATION PHYSICS =====` : "";

  const aopCloseupOverride = journey === 'AOP' && angle === 'closeup' ? `
===== AOP CLOSEUP CLARIFICATION (CRITICAL) =====
[MANDATORY - FOR ALL-OVER PRINT CLOSEUPS]
This is a CLOSEUP of an ALL-OVER PRINT garment. The "design" is NOT a logo or graphic in the center.

FOR AOP CLOSEUPS:
- The ENTIRE visible fabric area is covered with the repeating pattern
- There is NO blank/solid fabric - the pattern covers EVERYTHING edge-to-edge
- The closeup should show the seamless pattern covering the chest/fabric area
- The pattern tiles continuously across the entire visible surface
- Focus on showing: pattern detail, fabric texture with pattern, how pattern flows over body contours
- DO NOT show: a single logo/graphic in the center, blank fabric around a design, DTG-style placement

THE ENTIRE GARMENT IS THE DESIGN. The closeup shows a zoomed-in section of the all-over pattern.
===== END AOP CLOSEUP =====` : '';

  const cameraLockBlock = `
===== CAMERA/POSE LOCK =====
[LOCKED - EXACT CAMERA SETTINGS]
- View: ${angle.toUpperCase()}
- Lens type: ${cameraSpec?.lensType || '50-85mm portrait lens'}
- Focal length: ${cameraSpec?.focalLength || 'standard'}
- Aperture: ${cameraSpec?.aperture || 'f/5.6-f/8'}
- Depth of field: ${cameraSpec?.depthOfField || 'moderate, subject sharp'}
- Perspective: ${cameraSpec?.perspective || 'eye level'}
${cameraSpec?.promptAddition || 'Standard product photography angle'}
${cameraSpec?.technicalDescription || 'Professional product shot'}
${aopCloseupOverride}
===== END CAMERA/POSE LOCK =====`;

  const lightingLockBlock = `
===== LIGHTING LOCK =====
[LOCKED - CONSISTENT LIGHTING ACROSS ALL SHOTS]
- Setup: ${lightingSetup?.name || 'Three-point studio lighting'}
- Color temperature: ${lightingSetup?.technicalSpecs?.colorTemperature || '5500K-6000K'}
- Key to fill ratio: ${lightingSetup?.technicalSpecs?.lightRatio || '3:1'}
- Shadow type: ${lightingSetup?.technicalSpecs?.shadowType || 'soft, graduated'}
- Highlights: ${lightingSetup?.technicalSpecs?.highlights || 'controlled specular'}
${lightingSetup?.promptPhrase || 'Professional three-point studio lighting'}
${lightingSetup?.promptDetails || ''}
===== END LIGHTING LOCK =====`;

  const aopPhysicsLockBlock = journey === 'AOP' ? `
===== AOP CONSTRUCTION/SCALE/PHYSICS LOCKS =====
[LOCKED - AOP-SPECIFIC REQUIREMENTS]

CONSTRUCTION LOCK:
- Pattern must tile seamlessly across all panels
- No visible seam interruption of pattern
- Pattern aligns at side seams, shoulder seams, and armholes
${garmentBlueprint ? `- Product-specific construction: ${garmentBlueprint}` : ''}

SCALE LOCK (CRITICAL - PHYSICAL UNITS):
- Pattern scale: The pattern repeats exactly every ${patternScaleInches} inches
- This is a PHYSICAL measurement, not a percentage
- The pattern tile size must be ${patternScaleInches}" x ${patternScaleInches}" on the final garment
- Same element should be same physical size on front and back panels
- Scale should not distort at edges or seams
- Maintain IDENTICAL pattern scale across ALL mockups in this batch

PHYSICS LOCK (FABRIC vs PATTERN SEPARATION):
[CRITICAL - DO NOT CONFUSE PATTERN TEXTURE WITH FABRIC TEXTURE]
- The visual texture in the pattern (e.g., a "knit" or "woven" look) is just a 2D design
- The ACTUAL fabric physics must be: sublimation polyester (lightweight, smooth, slightly shiny)
- DO NOT render the garment as heavy/thick just because the pattern looks like a sweater texture
- A t-shirt with a "knit sweater" pattern must still look like a lightweight polyester t-shirt
- Fabric weight and drape: appropriate for sublimation polyester, NOT for the pattern's visual appearance
- Pattern conforms to body contours naturally
- Folds and creases affect pattern realistically (compression in valleys, stretch on peaks)
${fabricPhysics ? `
FABRIC PHYSICS DETAILS:
- Weight: ${fabricPhysics.weight}
- Drape factor: ${fabricPhysics.drapeFactor}%
- Surface texture: ${fabricPhysics.textureDensity}
- Print absorption: ${fabricPhysics.printAbsorption}
- Fold characteristics: ${fabricPhysics.foldCharacteristics}` : ''}
===== END AOP LOCKS =====` : "";

  const productKeywords = product.promptKeywords?.length ? product.promptKeywords.join(', ') : product.name;
  const productVisualAnchors = getProductVisualAnchors(product);
  const productSpecificNegatives = getProductNegativePrompts(product);
  
  const productTypeReinforcement = `
===== PRODUCT TYPE (CRITICAL - DO NOT IGNORE) =====
[MANDATORY - THE GARMENT TYPE MUST MATCH]
[THIS IS THE HIGHEST PRIORITY INSTRUCTION FOR GARMENT RENDERING]

- Product: ${product.name} (${product.frontendName || product.name})
- Subcategory: ${product.subcategory || product.category}
- Keywords: ${productKeywords}
${product.printSpec?.notes ? `- Notes: ${product.printSpec.notes}` : ''}

CRITICAL PRODUCT ENFORCEMENT:
- The garment must be a ${product.name.toUpperCase()}, not a different type of clothing
- If this is "Knitwear" or "Sweater", the model must wear a KNIT SWEATER with visible yarn/knit texture, NOT a thin T-shirt
- If this is "Hoodie", the model must wear a hoodie with a hood, NOT a t-shirt
- If this is "Long Sleeve", the model must wear a LONG-SLEEVED garment with sleeves extending to the wrists, NOT short sleeves
- DO NOT substitute the product type for a simpler garment (like a basic t-shirt)
${productVisualAnchors}

PRODUCT-SPECIFIC BANS (DO NOT RENDER):
${productSpecificNegatives.length > 0 ? productSpecificNegatives.map(neg => `- DO NOT: ${neg}`).join('\n') : '- None specified'}
===== END PRODUCT TYPE =====`;

  const garmentConstructionBlock = product.isWearable && garmentBlueprint ? `
===== GARMENT CONSTRUCTION DETAILS =====
${garmentBlueprint}
===== END GARMENT CONSTRUCTION =====` : "";

  const contourDescription = product.isWearable && personaLock
    ? `
===== CONTOUR DISTORTION RULES =====
${getContourDistortionPrompt()}
===== END CONTOUR RULES =====`
    : "";

  // Normalize scene/environment to explicit description
  const normalizedEnvironment = (() => {
    const scene = (environmentPrompt || style.preferredEnvironment || '').toLowerCase();
    if (scene.includes('studio') || scene === 'minimal' || scene === 'clean' || scene === 'white' || scene.includes('gray') || scene.includes('grey')) {
      return {
        setting: 'PROFESSIONAL STUDIO',
        description: 'Clean, neutral gray or white studio backdrop. Professional photography studio setting with seamless backdrop paper.',
        forbidden: 'NO outdoor scenes, NO urban streets, NO graffiti walls, NO brick alleys, NO coffee shops, NO lifestyle settings, NO nature backgrounds, NO beach scenes',
        lighting: 'Studio lighting only - softboxes, key light, fill light'
      };
    } else if (scene.includes('beach') || scene.includes('ocean') || scene.includes('tropical') || scene.includes('sand') || scene.includes('sunny') || scene.includes('summer')) {
      return {
        setting: 'BEACH / TROPICAL',
        description: `Sunny beach setting with golden sand, turquoise ocean waves, palm trees, and bright summery daylight. ${environmentPrompt || 'Tropical paradise vibes with clear blue sky.'}`,
        forbidden: 'NO studio backdrops, NO urban scenes, NO indoor settings, NO gray backgrounds, NO winter scenes',
        lighting: 'Bright natural sunlight, warm golden tones, summery atmosphere'
      };
    } else if (scene.includes('urban') || scene.includes('street') || scene.includes('city') || scene.includes('graffiti')) {
      return {
        setting: 'URBAN STREET',
        description: 'Urban city street with buildings, possibly graffiti or street art in background. Consistent urban environment.',
        forbidden: 'NO studio backdrops, NO nature scenes, NO indoor settings, NO beach or park settings',
        lighting: 'Natural outdoor daylight, consistent throughout batch'
      };
    } else if (scene.includes('outdoor') || scene.includes('nature') || scene.includes('lifestyle') || scene.includes('park') || scene.includes('garden')) {
      return {
        setting: 'OUTDOOR LIFESTYLE',
        description: 'Natural outdoor setting with soft natural light. Park, garden, or natural environment.',
        forbidden: 'NO studio backdrops, NO urban/city scenes, NO indoor settings',
        lighting: 'Soft natural daylight, golden hour or overcast lighting'
      };
    } else if (scene.includes('cafe') || scene.includes('coffee') || scene.includes('indoor') || scene.includes('restaurant') || scene.includes('home')) {
      return {
        setting: 'INDOOR LIFESTYLE',
        description: `Cozy indoor setting with warm ambient lighting. ${environmentPrompt || 'Modern interior with tasteful decor.'}`,
        forbidden: 'NO outdoor scenes, NO studio backdrops, NO urban streets',
        lighting: 'Warm indoor ambient lighting, natural window light mixing with interior lights'
      };
    } else if (environmentPrompt && environmentPrompt.length > 20) {
      // If a custom detailed prompt was provided, use it directly
      return {
        setting: 'CUSTOM SCENE',
        description: environmentPrompt,
        forbidden: 'Maintain consistency - do not change the scene between shots',
        lighting: 'Appropriate lighting for the described scene'
      };
    } else {
      return {
        setting: 'PROFESSIONAL STUDIO',
        description: 'Clean, neutral gray or white studio backdrop. Professional e-commerce photography setting.',
        forbidden: 'NO outdoor scenes, NO urban streets, NO graffiti walls, NO lifestyle settings',
        lighting: 'Studio lighting - professional 3-point setup'
      };
    }
  })();

  const environmentBlock = `
===== ENVIRONMENT LOCK (CRITICAL - SAME BACKGROUND EVERY SHOT) =====
[LOCKED - IDENTICAL ENVIRONMENT ACROSS ALL ANGLES AND ALL SIZES]
[VIOLATION OF THIS LOCK IS A CRITICAL FAILURE]

MANDATORY SETTING: ${normalizedEnvironment.setting}
- Scene Description: ${normalizedEnvironment.description}
- Brand style: ${style.name}
- Mood: ${style.description}
- Atmosphere: ${style.atmosphere}

FORBIDDEN BACKGROUNDS (DO NOT USE):
${normalizedEnvironment.forbidden}

LIGHTING REQUIREMENT:
${normalizedEnvironment.lighting}

BATCH CONSISTENCY (CRITICAL):
- EVERY mockup in this batch MUST have the EXACT SAME background
- If one mockup shows a gray studio backdrop, ALL mockups must show that gray studio backdrop
- The background CANNOT change between different sizes (XS, S, M, L, XL, etc.)
- The background CANNOT change between different angles (front, side, three-quarter)
- The SAME physical location/studio must appear in EVERY shot
- Background elements must be PIXEL-FOR-PIXEL identical where possible
- DO NOT introduce variety - consistency is more important than visual interest

ENVIRONMENT VIOLATION EXAMPLES (DO NOT DO THESE):
- XS in studio, but L in urban street = VIOLATION
- Front view in graffiti alley, side view in plain studio = VIOLATION
- 4XL with industrial backdrop, 5XL with modern loft = VIOLATION
===== END ENVIRONMENT LOCK =====`;

  const baseNegatives = getNegativePrompts(product.productType, product.isWearable && !!personaLock);
  const printRealismNegatives = getPrintRealismNegatives();
  // Add product-specific negatives and print realism negatives - append cleanly
  const additionalNegatives = [...productSpecificNegatives, ...printRealismNegatives].filter(Boolean);
  const negativePrompts = additionalNegatives.length > 0 
    ? `${baseNegatives}

PRINT REALISM NEGATIVES:
${additionalNegatives.map(neg => `• ${neg}`).join('\n')}`
    : baseNegatives;
  
  // Get the print realism block
  const printRealismBlock = getPrintRealismBlock();

  const fullPrompt = `ELITE MOCKUP GENERATION - RENDER SPECIFICATION
================================================================

${productTypeReinforcement}

${printRealismBlock}

${personaLockBlock}

${colorLockBlock}

${sizeFitLockBlock}

${designLockBlock}

${cameraLockBlock}

${lightingLockBlock}

${aopPhysicsLockBlock}

${garmentConstructionBlock}

${contourDescription}

${printIntegrationDescription}

${environmentBlock}

===== TECHNICAL REQUIREMENTS =====
- Output: Photorealistic commercial product photography
- Target Resolution: ${qualitySpec.resolution}px (${qualitySpec.name} quality - ${qualitySpec.bestFor})
- Quality: Sharp focus, professional studio standards, high detail
- Design: Must follow fabric contours naturally with accurate color reproduction
- Style: ${style.technicalNotes}
===== END REQUIREMENTS =====

===== NEGATIVE PROMPTS (MUST AVOID) =====
${negativePrompts}
===== END NEGATIVES =====

${product.isWearable && personaLock ? `===== FINAL IDENTITY REMINDER =====
[CRITICAL - READ BEFORE GENERATING]
If a reference photo was provided, the person in your output MUST be the SAME person.
- Same face, same hair, same beard/facial hair (if any)
- Same skin tone, same ethnicity
- DO NOT substitute with a different person
- The result should be immediately recognizable as the same individual
===== END REMINDER =====` : ''}`;

  const locks: RenderSpecification['locks'] = {
    product: {
      type: 'PRODUCT_LOCK',
      locked: true,
      summary: `${product.name} - ${product.category}`,
      details: {
        productId: product.id,
        productName: product.name,
        category: product.category,
        subcategory: product.subcategory,
        productType: product.productType,
        isWearable: product.isWearable,
        printMethod: journey,
        materialCondition: materialCondition,
        materialPresetName: materialPreset.name,
        fabricDescription: materialPreset.description
      }
    },
    color: {
      type: 'COLOR_LOCK',
      locked: true,
      summary: `${color.name} (${color.hex})`,
      details: {
        productColor: color.name,
        productHex: color.hex,
        designColors: designAnalysis.dominantColors,
        aopAccentColor: designAnalysis.aopAccentColor
      }
    },
    design: {
      type: 'DESIGN_LOCK',
      locked: true,
      summary: journey === 'AOP' ? `AOP Pattern - ${designAnalysis.style}` : `${designAnalysis.designType} - ${designAnalysis.style}`,
      details: {
        style: designAnalysis.style,
        complexity: designAnalysis.complexity,
        designType: journey === 'AOP' ? 'seamless-pattern' : designAnalysis.designType,
        placement: journey === 'AOP' ? 'full-coverage-aop' : designAnalysis.suggestedPlacement,
        printMethod: journey,
        hasTransparency: designAnalysis.hasTransparency,
        isAOP: journey === 'AOP',
        aopNote: journey === 'AOP' ? 'Pattern covers entire garment surface edge-to-edge' : undefined
      }
    },
    camera: {
      type: 'CAMERA_LOCK',
      locked: true,
      summary: `${angle} view`,
      details: {
        angle,
        lensType: cameraSpec?.lensType,
        focalLength: cameraSpec?.focalLength,
        aperture: cameraSpec?.aperture,
        depthOfField: cameraSpec?.depthOfField
      }
    },
    lighting: {
      type: 'LIGHTING_LOCK',
      locked: true,
      summary: lightingSetup?.name || 'Three-point studio',
      details: {
        setupName: lightingSetup?.name,
        colorTemperature: lightingSetup?.technicalSpecs?.colorTemperature,
        lightRatio: lightingSetup?.technicalSpecs?.lightRatio,
        shadowType: lightingSetup?.technicalSpecs?.shadowType
      }
    }
  };

  if (product.isWearable && personaLock) {
    locks.persona = {
      type: 'PERSONA_LOCK',
      locked: true,
      summary: `${personaLock.persona.name} (${personaLock.persona.sex}, ${personaLock.persona.ethnicity}, ${personaLock.persona.age})`,
      details: {
        personaId: personaLock.persona.id,
        name: personaLock.persona.name,
        age: personaLock.persona.age,
        sex: personaLock.persona.sex,
        ethnicity: personaLock.persona.ethnicity,
        height: personaLock.persona.height,
        weight: personaLock.persona.weight,
        build: personaLock.persona.build,
        hairStyle: personaLock.persona.hairStyle,
        hairColor: personaLock.persona.hairColor,
        eyeColor: personaLock.persona.eyeColor,
        skinTone: personaLock.persona.skinTone,
        hasHeadshot: !!personaLock.headshot
      }
    };

    locks.sizeFit = {
      type: 'SIZE_FIT_LOCK',
      locked: true,
      summary: `${personaLock.persona.size} - ${personaLock.persona.build}`,
      details: {
        size: personaLock.persona.size,
        build: personaLock.persona.build,
        materialCondition: materialCondition
      }
    };

    locks.contour = {
      type: 'CONTOUR_LOCK',
      locked: true,
      summary: 'Body contour distortion applied',
      details: {
        appliedTo: product.name,
        personaBuild: personaLock.persona.build
      }
    };
  }

  if (journey === 'AOP') {
    locks.aopPhysics = {
      type: 'AOP_PHYSICS_LOCK',
      locked: true,
      summary: 'Seamless all-over print physics',
      details: {
        patternType: 'seamless',
        scaleMethod: 'physical_units',
        fabricType: 'sublimation_polyester',
        constructionRules: 'panel_alignment'
      }
    };
  }

  return {
    locks,
    personaDescription: personaLockBlock,
    productDescription: `Product: ${product.name} | Color: ${color.name} (${color.hex}) | Category: ${product.category} | Type: ${product.productType} | Print: ${journey} | Material: ${materialPreset.name}`,
    designDescription: designLockBlock,
    cameraDescription: cameraLockBlock,
    lightingDescription: lightingLockBlock,
    environmentDescription: environmentBlock,
    materialDescription: materialPreset.promptAddition,
    contourDescription,
    printIntegrationDescription,
    humanRealismDescription: product.isWearable && personaLock ? getFullHumanRealismPrompt() : "",
    negativePrompts,
    fullPrompt
  };
}

async function waitForRateLimit(): Promise<void> {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;
  lastMinuteRequests = lastMinuteRequests.filter(t => t > oneMinuteAgo);

  if (lastMinuteRequests.length >= GENERATION_CONFIG.RATE_LIMIT_PER_MINUTE) {
    const oldestRequest = lastMinuteRequests[0];
    const waitTime = oldestRequest - oneMinuteAgo + 100;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }

  lastMinuteRequests.push(now);
}

async function waitForConcurrencySlot(): Promise<void> {
  while (currentJobCount >= GENERATION_CONFIG.MAX_CONCURRENT_JOBS) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  currentJobCount++;
}

function releaseConcurrencySlot(): void {
  currentJobCount = Math.max(0, currentJobCount - 1);
}

export async function generateSingleMockup(
  designBase64: string,
  renderSpec: RenderSpecification,
  personaHeadshot?: string,
  previousMockupReference?: string
): Promise<GeneratedMockup | null> {
  await waitForRateLimit();
  await waitForConcurrencySlot();

  try {
    const parts: Array<{ text?: string; inlineData?: { data: string; mimeType: string } }> = [];

    // IMPORTANT: Design image comes FIRST as [IMAGE 1]
    parts.push({
      inlineData: { data: designBase64, mimeType: "image/png" }
    });
    parts.push({
      text: `[IMAGE 1] - DESIGN ASSET (SOURCE MATERIAL - DO NOT REDRAW)
This is the EXACT artwork to TRANSFER onto the garment fabric.
- COPY this image exactly - do NOT generate new artwork inspired by it
- Every letter, every color, every detail must match this source exactly
- This is a TECHNICAL TRANSFER operation, not creative interpretation`
    });

    // Headshot comes SECOND as [IMAGE 2]
    if (personaHeadshot) {
      parts.push({
        inlineData: { data: personaHeadshot, mimeType: "image/png" }
      });
      parts.push({
        text: `[IMAGE 2] - MODEL IDENTITY REFERENCE
This is the person who must wear the garment. Match their face, skin tone, hair, and body build EXACTLY.
IGNORE the background and lighting of this photo - use only for identity matching.`
      });
    }

    // Add previous mockup as consistency reference for background/lighting
    if (previousMockupReference) {
      parts.push({
        inlineData: { data: previousMockupReference, mimeType: "image/png" }
      });
      parts.push({
        text: `[IMAGE 3] - STYLE/ENVIRONMENT REFERENCE
Match the background, lighting, camera angle, and photography style from this reference image exactly.`
      });
    }

    // Extract product name for distortion physics
    const productName = renderSpec.locks?.product?.details?.productName as string || "t-shirt";
    
    // Build the comprehensive technical prompt - include ALL renderSpec lock descriptions
    const productInfo = renderSpec.productDescription || "t-shirt";
    const personaInfo = renderSpec.personaDescription || "";
    const materialInfo = renderSpec.materialDescription || "";
    const lightingInfo = renderSpec.lightingDescription || "natural lighting";
    const environmentInfo = renderSpec.environmentDescription || "lifestyle setting";
    const cameraInfo = renderSpec.cameraDescription || "front view";
    const negatives = renderSpec.negativePrompts || "";
    
    // Critical lock blocks that must be preserved
    const designLock = renderSpec.designDescription || "";
    const contourLock = renderSpec.contourDescription || "";
    const printIntegration = renderSpec.printIntegrationDescription || "";
    const humanRealism = renderSpec.humanRealismDescription || "";
    
    // Get the new physics-based blocks
    const renderingFraming = getRenderingEngineFraming();
    const imageAssetRules = getImageAssetRules();
    const designAsFabric = getDesignAsFabricBlock();
    const distortionPhysics = get3DDistortionPhysicsBlock(productName);
    const garmentCondition = getGarmentConditionBlock();
    const printRealism = getPrintRealismBlock();
    const seamIntegration = getSeamIntegrationBlock();
    const positiveFabricReqs = getPositiveFabricRequirements();
    
    const technicalPrompt = `${renderingFraming}

${imageAssetRules}

${designAsFabric}

${seamIntegration}

===== SECTION 2: RENDER PARAMETERS =====

【GARMENT SPECIFICATION】
${productInfo}
${materialInfo ? `Material: ${materialInfo}` : ''}
${contourLock ? `Body Contours: ${contourLock}` : ''}
${garmentCondition}

【MODEL SPECIFICATION】
${personaInfo ? personaInfo : 'Generate an appropriate model for the garment.'}
${personaHeadshot ? 'VERIFICATION: The final rendered person must match [IMAGE 2] visually.' : ''}
${humanRealism ? `\n【HUMAN REALISM REQUIREMENTS】\n${humanRealism}` : ''}

【DESIGN LOCK - CRITICAL】
${designLock ? designLock : 'The design from [IMAGE 1] must be reproduced exactly as provided.'}

【SCENE & CAMERA】
Environment: ${environmentInfo}
Lighting: ${lightingInfo}
Camera: ${cameraInfo}

===== END RENDER PARAMETERS =====

${distortionPhysics}

${positiveFabricReqs}

${printRealism}

${printIntegration ? `【PRINT INTEGRATION LOCK】\n${printIntegration}` : ''}

===== NEGATIVE PROMPT (MANDATORY EXCLUSIONS) =====
${negatives}

blurry, out of focus, soft focus, motion blur, unfocused, grainy, noisy, pixelated, 
jpeg artifacts, overexposed, underexposed, wrong white balance, incorrect skin tones,
design that remains rigid while fabric folds around it, design with different lighting than fabric,
perfectly smooth fabric with no natural creases, design edges that don't follow fabric curves,
printed area that looks separate from the garment material, unnaturally crisp design boundaries,
design that is redrawn or reinterpreted instead of copied exactly from source image
===== END NEGATIVES =====

FINAL OUTPUT: Generate a single photorealistic product photograph. TRANSFER the exact artwork from [IMAGE 1] onto the garment - do not redraw or reinterpret it. The design IS the fabric - it naturally drapes, folds, and curves with the garment because they are the same material.`;

    parts.push({ text: technicalPrompt });

    logger.info("Calling Gemini API for mockup generation", { 
      source: "eliteMockupGenerator", 
      model: MODELS.IMAGE_GENERATION,
      hasPersonaHeadshot: !!personaHeadshot,
      hasPreviousReference: !!previousMockupReference,
      referenceMode: personaHeadshot ? "environment_only" : "full_consistency"
    });
    
    const response = await genAI.models.generateContent({
      model: MODELS.IMAGE_GENERATION,
      contents: [{ role: "user", parts }],
      config: { responseModalities: [Modality.TEXT, Modality.IMAGE] }
    });

    logger.info("Gemini API response received", { source: "eliteMockupGenerator", hasCandidates: !!response.candidates, candidateCount: response.candidates?.length || 0 });

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      const finishReason = (response as { promptFeedback?: { blockReason?: string } }).promptFeedback?.blockReason;
      logger.error("No candidates in mockup response", { source: "eliteMockupGenerator", finishReason, responseText: response.text?.substring(0, 500) });
      return null;
    }

    const content = candidates[0].content;
    const finishReason = candidates[0].finishReason;
    
    if (!content || !content.parts) {
      logger.error("No content parts in mockup response", { source: "eliteMockupGenerator", finishReason });
      return null;
    }

    // Log what parts we received
    const partTypes = content.parts.map(p => {
      if (p.inlineData) return `image/${p.inlineData.mimeType}`;
      if (p.text) return `text(${p.text.substring(0, 100)}...)`;
      return 'unknown';
    });
    logger.info("Response parts received", { source: "eliteMockupGenerator", partTypes, finishReason });

    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        logger.info("Mockup image generated successfully", { source: "eliteMockupGenerator" });
        return {
          imageData: part.inlineData.data,
          mimeType: part.inlineData.mimeType || "image/png",
          jobId: "",
          color: "",
          angle: "front"
        };
      }
    }

    // Log text content if any (usually contains error/refusal message)
    const textContent = content.parts.find(p => p.text)?.text;
    logger.error("No image data in mockup response", { source: "eliteMockupGenerator", finishReason, textResponse: textContent?.substring(0, 500) });
    return null;
  } catch (error) {
    logger.error("Single mockup generation failed", error, { source: "eliteMockupGenerator" });
    return null;
  } finally {
    releaseConcurrencySlot();
  }
}

/**
 * V2: Generate mockup using the streamlined 3-section prompt structure
 * This is the optimized version designed for better Gemini comprehension
 */
export async function generateSingleMockupV2(
  designBase64: string,
  promptInput: MockupPromptInput,
  personaHeadshot?: string,
  previousMockupReference?: string
): Promise<GeneratedMockup | null> {
  await waitForRateLimit();
  await waitForConcurrencySlot();

  try {
    const parts: Array<{ text?: string; inlineData?: { data: string; mimeType: string } }> = [];

    // [IMAGE 1] Design asset
    parts.push({
      inlineData: { data: designBase64, mimeType: "image/png" }
    });

    // [IMAGE 2] Headshot (if provided)
    if (personaHeadshot) {
      parts.push({
        inlineData: { data: personaHeadshot, mimeType: "image/png" }
      });
    }

    // [IMAGE 3] Previous reference (if provided)
    if (previousMockupReference) {
      parts.push({
        inlineData: { data: previousMockupReference, mimeType: "image/png" }
      });
    }

    // Build the streamlined prompt
    const streamlinedPrompt = buildStreamlinedPrompt({
      ...promptInput,
      hasHeadshot: !!personaHeadshot,
      hasPreviousReference: !!previousMockupReference
    });

    // Add the complete prompt as text
    parts.push({ text: streamlinedPrompt.fullPrompt });

    logger.info("Calling Gemini API with STREAMLINED prompt (V2)", { 
      source: "eliteMockupGenerator", 
      model: MODELS.IMAGE_GENERATION,
      promptVersion: "v2-streamlined",
      hasPersonaHeadshot: !!personaHeadshot,
      hasPreviousReference: !!previousMockupReference,
      promptLength: streamlinedPrompt.fullPrompt.length
    });
    
    const response = await genAI.models.generateContent({
      model: MODELS.IMAGE_GENERATION,
      contents: [{ role: "user", parts }],
      config: { responseModalities: [Modality.TEXT, Modality.IMAGE] }
    });

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      const finishReason = (response as { promptFeedback?: { blockReason?: string } }).promptFeedback?.blockReason;
      logger.error("No candidates in V2 mockup response", { source: "eliteMockupGenerator", finishReason });
      return null;
    }

    const content = candidates[0].content;
    if (!content || !content.parts) {
      logger.error("No content parts in V2 mockup response", { source: "eliteMockupGenerator" });
      return null;
    }

    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        logger.info("V2 Mockup image generated successfully", { source: "eliteMockupGenerator" });
        return {
          imageData: part.inlineData.data,
          mimeType: part.inlineData.mimeType || "image/png",
          jobId: "",
          color: "",
          angle: promptInput.angle
        };
      }
    }

    const textContent = content.parts.find(p => p.text)?.text;
    logger.error("No image data in V2 mockup response", { source: "eliteMockupGenerator", textResponse: textContent?.substring(0, 500) });
    return null;
  } catch (error) {
    logger.error("V2 mockup generation failed", error, { source: "eliteMockupGenerator" });
    return null;
  } finally {
    releaseConcurrencySlot();
  }
}

export async function generateBlankGarment(
  renderSpec: RenderSpecification,
  personaHeadshot?: string,
  previousMockupReference?: string
): Promise<GeneratedMockup | null> {
  await waitForRateLimit();
  await waitForConcurrencySlot();

  try {
    const parts: Array<{ text?: string; inlineData?: { data: string; mimeType: string } }> = [];

    if (personaHeadshot) {
      parts.push({
        inlineData: { data: personaHeadshot, mimeType: "image/png" }
      });
      parts.push({
        text: `[IMAGE 1] - MODEL IDENTITY REFERENCE
This is the person who must wear the garment. Match their face, skin tone, hair, and body build EXACTLY.
IGNORE the background and lighting of this photo - use only for identity matching.`
      });
    }

    if (previousMockupReference) {
      // Extract product name from renderSpec for explicit product type warning
      const productMatch = renderSpec.productDescription?.match(/Product:\s*([^|]+)/);
      const productName = productMatch ? productMatch[1].trim() : "garment";
      
      // Extract camera description from renderSpec to determine framing instructions
      const cameraDescription = renderSpec.cameraDescription || "front view";
      
      // Determine framing instructions based on angle to prevent reference copying
      let framingInstructions = "";
      if (cameraDescription.toLowerCase().includes("closeup")) {
        framingInstructions = `

🎥 CRITICAL CAMERA FRAMING LOCK:
- This is a CLOSEUP shot, NOT a medium shot like the reference
- Camera distance: 3-4 feet (much closer than the reference image)
- Framing: Crop from JUST BELOW THE CHIN to MID-TORSO
- The model's face may be PARTIALLY or FULLY out of frame
- Focus on the DESIGN and FABRIC TEXTURE in detail
- This is a TIGHT shot - do NOT use the medium shot framing from the reference
- The reference shows COLOR/STYLE, but FRAMING must be CLOSEUP as specified`;
      } else if (cameraDescription.toLowerCase().includes("side")) {
        framingInstructions = `

🎥 CRITICAL CAMERA ANGLE LOCK:
- This is a SIDE PROFILE shot, NOT a front view like the reference
- Camera position: 90° perpendicular to the subject (pure profile)
- Only ONE side of the face is visible
- Shoulder, hip, and ear should align vertically
- The design on the chest will be visible from the side angle
- Do NOT use the front-facing angle from the reference`;
      } else if (cameraDescription.toLowerCase().includes("three-quarter")) {
        framingInstructions = `

🎥 CRITICAL CAMERA ANGLE LOCK:
- This is a THREE-QUARTER view (30-45° angle), NOT a straight front view
- Model is turned 30-45° relative to the camera
- Both front and side of the garment are visible
- Shows 3D depth and fit
- Do NOT use the straight-on front angle from the reference`;
      } else {
        // Front view - reference framing is okay
        framingInstructions = `

🎥 CAMERA ANGLE: Front view (similar framing to reference is acceptable for this angle)`;
      }
      
      parts.push({
        inlineData: { data: previousMockupReference, mimeType: "image/png" }
      });
      parts.push({
        text: `[IMAGE 2] - STYLE/ENVIRONMENT + COLOR REFERENCE
Match the following from this reference image:
1. GARMENT COLOR (CRITICAL): Sample and match the EXACT RGB color of the garment
2. Background, lighting, and photography style
3. Model identity and pose (if visible)

🔴 CRITICAL PRODUCT TYPE LOCK:
- The garment MUST be a: ${productName}
- DO NOT change the product type (e.g., DO NOT convert long-sleeve to short-sleeve, t-shirt to tank, etc.)
- If you see sleeves in the reference, generate the SAME sleeve type
- The reference shows the STYLE, but product type MUST match the specification: ${productName}
${framingInstructions}

⚠️ IMPORTANT INSTRUCTIONS:
- The garment in this reference has artwork - generate a BLANK version without any design
- Keep the EXACT SAME garment color as shown in the reference
- Keep the EXACT SAME product type (${productName})
- DO NOT copy the camera angle or framing from the reference - use the angle/framing specified in the prompt below
- Match ONLY the color, lighting, and model identity - the camera angle, framing, and product type are specified separately`
      });
    }

    const blankGarmentPrompt = getBlankGarmentPrompt({
      productDescription: renderSpec.productDescription,
      personaDescription: renderSpec.personaDescription,
      materialDescription: renderSpec.materialDescription,
      lightingDescription: renderSpec.lightingDescription,
      environmentDescription: renderSpec.environmentDescription,
      cameraDescription: renderSpec.cameraDescription,
      humanRealismDescription: renderSpec.humanRealismDescription,
      negativePrompts: renderSpec.negativePrompts,
      hasColorReference: !!previousMockupReference
    });

    parts.push({ text: blankGarmentPrompt });

    logger.info("Calling Gemini API for BLANK garment generation", { 
      source: "eliteMockupGenerator", 
      model: MODELS.IMAGE_GENERATION,
      mode: "blank_garment",
      hasColorReference: !!previousMockupReference,
      hasPersonaHeadshot: !!personaHeadshot
    });
    
    const response = await genAI.models.generateContent({
      model: MODELS.IMAGE_GENERATION,
      contents: [{ role: "user", parts }],
      config: { responseModalities: [Modality.TEXT, Modality.IMAGE] }
    });

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      logger.error("No candidates in blank garment response", { source: "eliteMockupGenerator" });
      return null;
    }

    const content = candidates[0].content;
    if (!content || !content.parts) {
      logger.error("No content parts in blank garment response", { source: "eliteMockupGenerator" });
      return null;
    }

    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        logger.info("Blank garment generated successfully", { 
          source: "eliteMockupGenerator",
          hasReference: !!previousMockupReference,
          productDescription: renderSpec.productDescription?.substring(0, 100)
        });
        return {
          imageData: part.inlineData.data,
          mimeType: part.inlineData.mimeType || "image/png",
          jobId: "",
          color: "",
          angle: "front"
        };
      }
    }

    return null;
  } catch (error) {
    logger.error("Blank garment generation failed", error, { source: "eliteMockupGenerator" });
    return null;
  } finally {
    releaseConcurrencySlot();
  }
}

export async function generateTwoStageMockup(
  designBase64: string,
  renderSpec: RenderSpecification,
  productName: string,
  cameraAngle: 'front' | 'three-quarter' | 'side' | 'closeup',
  personaHeadshot?: string,
  previousMockupReference?: string
): Promise<GeneratedMockup | null> {
  logger.info("Starting two-stage mockup generation", { 
    source: "eliteMockupGenerator", 
    productName, 
    cameraAngle,
    mode: "two_stage_composite"
  });

  const blankGarment = await generateBlankGarment(renderSpec, personaHeadshot, previousMockupReference);
  
  if (!blankGarment) {
    logger.error("Two-stage pipeline: Blank garment generation failed", { source: "eliteMockupGenerator" });
    return null;
  }

  logger.info("Blank garment generated, starting design composition", { 
    source: "eliteMockupGenerator",
    cameraAngle,
    blankGarmentSize: blankGarment.imageData.length
  });

  const compositeResult = await compositeDesignOntoGarment({
    designBase64,
    blankGarmentBase64: blankGarment.imageData,
    productName,
    cameraAngle
  });

  if (!compositeResult.success) {
    logger.error("Two-stage pipeline: Design composition failed, will retry with fallback", { 
      source: "eliteMockupGenerator", 
      error: compositeResult.error,
      cameraAngle
    });
    return null;
  }

  logger.info("Two-stage mockup generation completed successfully", { 
    source: "eliteMockupGenerator",
    cameraAngle,
    compositedSize: compositeResult.composited.length
  });
  
  return {
    imageData: compositeResult.composited,
    mimeType: "image/png",
    jobId: "",
    color: "",
    angle: cameraAngle
  };
}

export async function generateMockupWithRetry(
  designBase64: string,
  renderSpec: RenderSpecification,
  personaHeadshot?: string,
  previousMockupReference?: string,
  maxRetries: number = GENERATION_CONFIG.MAX_RETRIES
): Promise<GeneratedMockup | null> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await generateSingleMockup(designBase64, renderSpec, personaHeadshot, previousMockupReference);
      if (result) {
        return result;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      logger.error(`Attempt ${attempt + 1}/${maxRetries} failed`, lastError, { source: "eliteMockupGenerator" });

      if (attempt < maxRetries - 1) {
        await new Promise(resolve => 
          setTimeout(resolve, GENERATION_CONFIG.RETRY_DELAY_MS * Math.pow(2, attempt))
        );
      }
    }
  }

  logger.error(`All ${maxRetries} attempts failed. Last error`, lastError, { source: "eliteMockupGenerator" });
  return null;
}

/**
 * V2 retry wrapper for streamlined prompt generation
 */
export async function generateMockupWithRetryV2(
  designBase64: string,
  promptInput: MockupPromptInput,
  personaHeadshot?: string,
  previousMockupReference?: string,
  maxRetries: number = GENERATION_CONFIG.MAX_RETRIES
): Promise<GeneratedMockup | null> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const result = await generateSingleMockupV2(designBase64, promptInput, personaHeadshot, previousMockupReference);
      if (result) {
        return result;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      logger.error(`V2 Attempt ${attempt + 1}/${maxRetries} failed`, lastError, { source: "eliteMockupGenerator" });

      if (attempt < maxRetries - 1) {
        await new Promise(resolve => 
          setTimeout(resolve, GENERATION_CONFIG.RETRY_DELAY_MS * Math.pow(2, attempt))
        );
      }
    }
  }

  logger.error(`All ${maxRetries} V2 attempts failed. Last error`, lastError, { source: "eliteMockupGenerator" });
  return null;
}

/**
 * Helper: Create MockupPromptInput from existing generation data
 */
export function createMockupPromptInput(
  designAnalysis: DesignAnalysis,
  product: Product,
  color: ProductColor,
  angle: MockupAngle,
  journey: JourneyType,
  options?: {
    modelDetails?: ModelDetails;
    personaLock?: PersonaLock;
    currentSize?: string;
    lightingPreset?: string;
    environmentPrompt?: string;
    outputQuality?: OutputQuality;
  }
): MockupPromptInput {
  return {
    designAnalysis,
    product,
    color,
    angle,
    journey,
    modelDetails: options?.modelDetails,
    personaLock: options?.personaLock,
    currentSize: options?.currentSize,
    lightingPreset: options?.lightingPreset,
    environmentPrompt: options?.environmentPrompt,
    outputQuality: options?.outputQuality || 'high',
  };
}

export interface BatchGenerationError {
  type: 'persona_lock_failed' | 'design_analysis_failed' | 'batch_failed';
  message: string;
  details?: string;
}

export async function generateMockupBatch(
  request: MockupGenerationRequest,
  onProgress?: (completed: number, total: number, job: GenerationJob) => void,
  onError?: (error: BatchGenerationError) => void
): Promise<MockupBatch> {
  const batchId = `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const designAnalysis = await analyzeDesignForMockup(request.designImage);

  // SIZE-SPECIFIC PERSONAS: Select one persona per size for accurate body representation
  // Each size gets its own persona with matching body proportions
  const personaLocksBySize: Map<string, PersonaLock> = new Map();
  const headshotsBySize: Map<string, string> = new Map();
  
  const jobs: GenerationJob[] = [];
  const sizesToGenerate = request.sizes && request.sizes.length > 0 
    ? request.sizes 
    : [request.modelDetails?.modelSize || 'M'];

  // Handle existing persona lock (for cross-batch face/headshot consistency)
  // When reusing a persona, apply it to ALL sizes for consistent facial appearance
  // The render spec will use somatic fallback for body proportions when size doesn't match
  if (request.existingPersonaLock && request.product.isWearable) {
    const existingLock = request.existingPersonaLock as PersonaLock;
    const existingSize = existingLock.persona.size || 'M';
    
    // Apply existing persona to ALL requested sizes for face/headshot consistency
    for (const size of sizesToGenerate) {
      personaLocksBySize.set(size, existingLock);
      if (existingLock.headshot) {
        headshotsBySize.set(size, existingLock.headshot);
      }
    }
    
    logger.info("Existing persona lock applied to all sizes for face consistency", { 
      source: "eliteMockupGenerator",
      existingPersonaSize: existingSize,
      appliedToSizes: sizesToGenerate,
      note: "Body proportions will use somatic fallback for non-matching sizes"
    });
  }

  // Pre-generate persona locks for each size that doesn't have one yet
  if (request.product.isWearable && request.modelDetails) {
    for (const size of sizesToGenerate) {
      // Skip if we already have a persona for this size from existingPersonaLock
      if (personaLocksBySize.has(size)) {
        continue;
      }
      
      try {
        // Create size-specific model details to get matching persona
        const sizeModelDetails: ModelDetails = { 
          ...request.modelDetails, 
          modelSize: size as Size 
        };
        
        const sizePersonaLock = await generatePersonaLock(sizeModelDetails);
        
        logger.info("Size-specific persona selected", { 
          source: "eliteMockupGenerator", 
          size,
          personaId: sizePersonaLock.persona.id,
          personaName: sizePersonaLock.persona.name,
          personaSize: sizePersonaLock.persona.size,
          personaBuild: sizePersonaLock.persona.build,
          hasHeadshot: !!sizePersonaLock.headshot
        });
        
        // Use pre-loaded headshot from generatePersonaLock (already loaded via mapping)
        if (sizePersonaLock.headshot) {
          headshotsBySize.set(size, sizePersonaLock.headshot);
        }
        
        personaLocksBySize.set(size, sizePersonaLock);
      } catch (error) {
        logger.warn("Persona lock generation failed for size, job will use somatic fallback", { 
          source: "eliteMockupGenerator", 
          size,
          error: error instanceof Error ? error.message : String(error) 
        });
        // Don't add to map - job will have undefined personaLock and use somatic fallback
      }
    }
    
    logger.info("Size-specific personas loaded", { 
      source: "eliteMockupGenerator", 
      sizesWithPersonas: Array.from(personaLocksBySize.keys()),
      sizesWithHeadshots: Array.from(headshotsBySize.keys())
    });
  }
  
  const baseColor = request.colors[0];
  const editColors = request.colorSwapMode && request.colors.length > 1 
    ? request.colors.slice(1) 
    : [];
  const colorsToGenerate = request.colorSwapMode ? [baseColor] : request.colors;
  
  const baseJobIds: Map<string, string> = new Map();
  
  for (const size of sizesToGenerate) {
    for (const color of colorsToGenerate) {
      for (const angle of request.angles) {
        const sizeModelDetails = request.modelDetails 
          ? { ...request.modelDetails, modelSize: size as Size }
          : undefined;
        
        const sizePersonaLock = personaLocksBySize.get(size);
        const sizeHeadshot = headshotsBySize.get(size);
        
        const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        if (request.colorSwapMode) {
          baseJobIds.set(`${size}_${angle}`, jobId);
        }
        
        jobs.push({
          id: jobId,
          designImage: request.designImage,
          product: request.product,
          color,
          angle,
          size,
          modelDetails: sizeModelDetails,
          brandStyle: request.brandStyle,
          lightingPreset: request.lightingPreset,
          materialCondition: request.materialCondition,
          environmentPrompt: request.environmentPrompt,
          personaLockImage: sizeHeadshot,
          personaLock: sizePersonaLock,
          status: 'pending',
          retryCount: 0,
          createdAt: Date.now()
        });
      }
    }
  }
  
  if (request.colorSwapMode && editColors.length > 0) {
    for (const size of sizesToGenerate) {
      for (const editColor of editColors) {
        for (const angle of request.angles) {
          const baseJobId = baseJobIds.get(`${size}_${angle}`);
          
          jobs.push({
            id: `edit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            designImage: request.designImage,
            product: request.product,
            color: editColor,
            angle,
            size,
            modelDetails: request.modelDetails 
              ? { ...request.modelDetails, modelSize: size as Size }
              : undefined,
            brandStyle: request.brandStyle,
            lightingPreset: request.lightingPreset,
            materialCondition: request.materialCondition,
            environmentPrompt: request.environmentPrompt,
            status: 'pending',
            retryCount: 0,
            createdAt: Date.now(),
            isColorEditJob: true,
            sourceColor: baseColor,
            baseJobId
          });
        }
      }
    }
    
    logger.info("Color swap mode: created base + edit jobs", {
      source: "eliteMockupGenerator",
      baseColor: baseColor.name,
      editColors: editColors.map(c => c.name),
      baseJobCount: baseJobIds.size,
      editJobCount: editColors.length * sizesToGenerate.length * request.angles.length
    });
  }
  
  // For backward compatibility, use the first size's persona as the batch persona
  const firstSize = sizesToGenerate[0];
  const personaLock = personaLocksBySize.get(firstSize);
  const personaHeadshot = headshotsBySize.get(firstSize);

  const batch: MockupBatch = {
    id: batchId,
    designImage: request.designImage,
    designAnalysis,
    product: request.product,
    colors: request.colors,
    angles: request.angles,
    modelDetails: request.modelDetails,
    brandStyle: request.brandStyle,
    lightingPreset: request.lightingPreset,
    materialCondition: request.materialCondition,
    environmentPrompt: request.environmentPrompt,
    personaLockImage: personaHeadshot,
    personaLock: personaLock,
    jobs,
    status: 'processing',
    createdAt: Date.now()
  };

  let completedCount = 0;
  const totalJobs = jobs.length;

  const baseJobs = jobs.filter(j => !j.isColorEditJob);
  const colorEditJobs = jobs.filter(j => j.isColorEditJob);
  
  const hasPreStoredHeadshots = headshotsBySize.size > 0;
  
  if (request.colorSwapMode && colorEditJobs.length > 0) {
    logger.info("Color swap mode: processing base jobs first, then edit jobs", {
      source: "eliteMockupGenerator",
      baseJobCount: baseJobs.length,
      editJobCount: colorEditJobs.length
    });
    
    const batchSize = GENERATION_CONFIG.MAX_CONCURRENT_JOBS;
    let batchReferenceImage: string | undefined;
    
    for (let i = 0; i < baseJobs.length; i += batchSize) {
      const batchJobsSlice = baseJobs.slice(i, i + batchSize);
      await Promise.all(batchJobsSlice.map(job => processJobWithReference(job, batchReferenceImage)));
      
      const successfulJob = batchJobsSlice.find(j => j.result?.imageData);
      if (successfulJob?.result?.imageData && !batchReferenceImage) {
        batchReferenceImage = successfulJob.result.imageData;
      }
    }
    
    const jobResultMap = new Map<string, string>();
    for (const job of baseJobs) {
      if (job.result?.imageData) {
        jobResultMap.set(job.id, job.result.imageData);
      }
    }
    
    for (const editJob of colorEditJobs) {
      if (!editJob.baseJobId) continue;
      
      const baseImageData = jobResultMap.get(editJob.baseJobId);
      if (!baseImageData) {
        editJob.status = 'failed';
        editJob.error = 'Base job did not produce an image';
        editJob.completedAt = Date.now();
        completedCount++;
        if (onProgress) onProgress(completedCount, totalJobs, editJob);
        continue;
      }
      
      editJob.status = 'processing';
      editJob.startedAt = Date.now();
      
      const editResult = await colorSwapEdit(
        baseImageData,
        editJob.sourceColor!,
        editJob.color,
        editJob.product
      );
      
      if (editResult) {
        editJob.status = 'completed';
        editJob.result = {
          ...editResult,
          jobId: editJob.id,
          angle: editJob.angle
        };
      } else {
        editJob.status = 'failed';
        editJob.error = 'Color swap edit failed';
      }
      
      editJob.completedAt = Date.now();
      completedCount++;
      if (onProgress) onProgress(completedCount, totalJobs, editJob);
    }
  } else if (request.product.isWearable && personaLocksBySize.size > 0) {
    // CRITICAL: Force sequential processing for ALL wearables with persona locks
    // This ensures the first mockup becomes a visual reference for subsequent angles
    // Parallel processing breaks consistency (different persona/color interpretations)
    logger.info("Using sequential processing for persona consistency", { 
      source: "eliteMockupGenerator",
      hasPreStoredHeadshots,
      reason: "Reference-based consistency required for wearables"
    });
    
    let firstSuccessfulMockup: string | undefined;
    for (const job of jobs) {
      await processJobWithReference(job, firstSuccessfulMockup);
      
      if (!firstSuccessfulMockup && job.result?.imageData) {
        firstSuccessfulMockup = job.result.imageData;
        logger.info("First mockup captured for cross-angle consistency reference", { source: "eliteMockupGenerator" });
      }
      
      completedCount++;
      if (onProgress) {
        onProgress(completedCount, totalJobs, job);
      }
    }
  } else {
    const batchSize = GENERATION_CONFIG.MAX_CONCURRENT_JOBS;
    logger.info(`Processing ${jobs.length} jobs in parallel batches of ${batchSize}`, { source: "eliteMockupGenerator", hasPreStoredHeadshots, sizesWithHeadshots: headshotsBySize.size });
    
    let batchReferenceImage: string | undefined;
    
    for (let i = 0; i < jobs.length; i += batchSize) {
      const batchJobsSlice = jobs.slice(i, i + batchSize);
      const batchIndex = Math.floor(i / batchSize);
      
      await Promise.all(batchJobsSlice.map(job => processJobWithReference(job, batchReferenceImage)));
      
      const successfulJob = batchJobsSlice.find(j => j.result?.imageData);
      if (successfulJob?.result?.imageData) {
        const isFirstReference = !batchReferenceImage;
        batchReferenceImage = successfulJob.result.imageData;
        
        if (isFirstReference) {
          logger.info("First successful mockup captured for cross-batch consistency reference", { 
            source: "eliteMockupGenerator",
            batchIndex,
            referenceJobId: successfulJob.id
          });
        } else {
          logger.debug("Reference image updated from batch", { 
            source: "eliteMockupGenerator",
            batchIndex,
            referenceJobId: successfulJob.id
          });
        }
      } else {
        logger.warn("No successful mockups in batch, reference unchanged", { 
          source: "eliteMockupGenerator",
          batchIndex,
          hasExistingReference: !!batchReferenceImage
        });
      }
    }
  }
  
  async function processJobWithReference(job: GenerationJob, referenceImage?: string): Promise<void> {
    job.status = 'processing';
    job.startedAt = Date.now();

    // Use job-specific persona lock for size-accurate body representation
    // If undefined, buildRenderSpecification will use somatic profile fallback
    const jobPersonaLock = job.personaLock ? (job.personaLock as unknown as PersonaLock) : undefined;
    const jobHeadshot = job.personaLockImage;

    const renderSpec = buildRenderSpecification(
      designAnalysis,
      request.product,
      job.color,
      job.angle,
      job.modelDetails,
      jobPersonaLock,
      request.brandStyle,
      request.journey,
      request.materialCondition,
      request.lightingPreset,
      request.environmentPrompt,
      job.modelDetails?.modelSize,
      request.patternScale,
      request.outputQuality
    );

    // Use two-stage pipeline for exact design preservation
    // Stage 1: Generate blank garment, Stage 2: Composite exact design
    // ENABLED BY DEFAULT for better design accuracy and fabric integration
    const useTwoStagePipeline = request.useTwoStagePipeline ?? true;
    
    let result: GeneratedMockup | null = null;
    
    if (useTwoStagePipeline && request.product.isWearable) {
      logger.info("Using two-stage pipeline for exact design preservation", { 
        source: "eliteMockupGenerator",
        jobId: job.id,
        angle: job.angle
      });
      
      const cameraAngle = job.angle === 'front' ? 'front' 
        : job.angle === 'three-quarter' ? 'three-quarter'
        : job.angle === 'side' ? 'side'
        : 'closeup';
      
      result = await generateTwoStageMockup(
        request.designImage,
        renderSpec,
        request.product.name,
        cameraAngle,
        jobHeadshot,
        referenceImage
      );
      
      // Fallback to single-stage if two-stage fails
      if (!result) {
        logger.warn("Two-stage pipeline failed, falling back to single-stage", { 
          source: "eliteMockupGenerator",
          jobId: job.id
        });
        result = await generateMockupWithRetry(
          request.designImage,
          renderSpec,
          jobHeadshot,
          referenceImage
        );
      }
    } else {
      // Check if streamlined prompt (V2) is enabled
      if (GENERATION_CONFIG.USE_STREAMLINED_PROMPT) {
        // Use V2 with streamlined 3-section prompt
        const promptInput = createMockupPromptInput(
          designAnalysis,
          request.product,
          job.color,
          job.angle,
          request.journey,
          {
            modelDetails: job.modelDetails,
            personaLock: jobPersonaLock,
            currentSize: job.modelDetails?.modelSize,
            lightingPreset: request.lightingPreset,
            environmentPrompt: request.environmentPrompt,
            outputQuality: request.outputQuality
          }
        );
        
        logger.info("Using V2 streamlined prompt for generation", { 
          source: "eliteMockupGenerator",
          jobId: job.id,
          angle: job.angle,
          promptVersion: "v2"
        });
        
        result = await generateMockupWithRetryV2(
          request.designImage,
          promptInput,
          jobHeadshot,
          referenceImage
        );
      } else {
        // Use original V1 pipeline
        result = await generateMockupWithRetry(
          request.designImage,
          renderSpec,
          jobHeadshot,
          referenceImage
        );
      }
    }

    if (result) {
      job.status = 'completed';
      job.result = {
        ...result,
        jobId: job.id,
        color: job.color.name,
        angle: job.angle
      };
    } else {
      job.status = 'failed';
      job.error = 'Generation failed after max retries';
    }

    job.completedAt = Date.now();
    completedCount++;

    if (onProgress) {
      onProgress(completedCount, totalJobs, job);
    }
  }

  const failedJobs = jobs.filter(j => j.status === 'failed').length;
  const completedJobs = jobs.filter(j => j.status === 'completed').length;

  if (failedJobs === 0) {
    batch.status = 'completed';
  } else if (completedJobs > 0) {
    batch.status = 'partial';
  } else {
    batch.status = 'failed';
  }

  batch.completedAt = Date.now();

  return batch;
}

export async function refineMockup(
  originalJob: GenerationJob,
  refinementPrompt: string,
  originalDesignBase64: string
): Promise<GeneratedMockup | null> {
  if (!originalJob.result) {
    throw new Error("Cannot refine a job without a result");
  }

  const refinedPrompt = `${originalJob.result.prompt || ''}

REFINEMENT REQUEST:
${refinementPrompt}

Maintain all other aspects of the original image but apply the refinement above.`;

  const renderSpec: RenderSpecification = {
    locks: {
      product: {
        type: 'PRODUCT_LOCK',
        locked: true,
        summary: `${originalJob.product.name} - ${originalJob.product.category}`,
        details: {
          productId: originalJob.product.id,
          productName: originalJob.product.name,
          category: originalJob.product.category,
          productType: originalJob.product.productType,
          isWearable: originalJob.product.isWearable,
          refinementMode: true
        }
      },
      color: {
        type: 'COLOR_LOCK',
        locked: true,
        summary: originalJob.color.name,
        details: { productColor: originalJob.color.name, productHex: originalJob.color.hex }
      },
      design: {
        type: 'DESIGN_LOCK',
        locked: true,
        summary: 'Refinement of existing design',
        details: { refinementMode: true }
      },
      camera: {
        type: 'CAMERA_LOCK',
        locked: true,
        summary: originalJob.angle,
        details: { angle: originalJob.angle }
      },
      lighting: {
        type: 'LIGHTING_LOCK',
        locked: true,
        summary: 'Inherited from original',
        details: {}
      }
    },
    personaDescription: "",
    productDescription: `Product: ${originalJob.product.name}`,
    designDescription: "Refinement mode - modifying existing mockup",
    cameraDescription: `${originalJob.angle} view`,
    lightingDescription: "Inherited from original generation",
    environmentDescription: "",
    materialDescription: "",
    contourDescription: "",
    printIntegrationDescription: "",
    humanRealismDescription: "",
    negativePrompts: getNegativePrompts(originalJob.product.productType, originalJob.product.isWearable),
    fullPrompt: refinedPrompt
  };

  return generateMockupWithRetry(
    originalDesignBase64,
    renderSpec,
    originalJob.personaLockImage
  );
}

export async function colorSwapEdit(
  baseImageData: string,
  sourceColor: ProductColor,
  targetColor: ProductColor,
  product: Product
): Promise<GeneratedMockup | null> {
  const sourceColorName = sourceColor.name.toLowerCase();
  const targetColorName = targetColor.name.toLowerCase();
  
  const isTargetDark = ['black', 'navy', 'charcoal', 'dark'].some(c => targetColorName.includes(c));
  const artworkInstruction = isTargetDark 
    ? "The artwork/design on the garment should be inverted to white/light colors for visibility on the dark fabric."
    : "The artwork/design on the garment should remain dark for visibility on the light fabric.";
  
  const printRealismBlock = getPrintRealismBlock();
  const distortionPhysics = get3DDistortionPhysicsBlock(product.name);
  
  const editPrompt = `PRECISE COLOR EDIT ONLY - Change the ${product.name} color from ${sourceColor.name} (${sourceColor.hex}) to ${targetColor.name} (${targetColor.hex}).

CRITICAL REQUIREMENTS:
1. ONLY change the apparel/product color - nothing else
2. Keep the EXACT same model, face, pose, expression
3. Keep the EXACT same background, lighting, camera angle
4. Keep the EXACT same composition and framing
5. ${artworkInstruction}
6. The garment fit, wrinkles, and draping should remain identical
7. Do NOT change any other aspect of the image
8. The printed design must remain BONDED to the fabric - it follows all folds and contours

${distortionPhysics}

${printRealismBlock}

This is a fabric color swap. The output should be identical except for the product color change, with the design still appearing as a real physical print on the fabric.`;

  logger.info("Color swap edit initiated", { 
    source: "eliteMockupGenerator",
    from: sourceColor.name,
    to: targetColor.name,
    product: product.name,
    isTargetDark
  });

  try {
    const response = await genAI.models.generateContent({
      model: MODELS.IMAGE_GENERATION,
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { data: baseImageData, mimeType: "image/jpeg" } },
            { text: editPrompt }
          ]
        }
      ],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
        temperature: 0.1,
        topP: 0.8,
        topK: 20
      }
    });

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          logger.info("Color swap edit successful", { 
            source: "eliteMockupGenerator",
            from: sourceColor.name,
            to: targetColor.name
          });
          
          return {
            imageData: part.inlineData.data || "",
            mimeType: part.inlineData.mimeType || "image/jpeg",
            jobId: `color_edit_${Date.now()}`,
            color: targetColor.name,
            angle: "front" as MockupAngle,
            prompt: editPrompt
          };
        }
      }
    }

    logger.warn("Color swap edit returned no image", { source: "eliteMockupGenerator" });
    return null;
  } catch (error) {
    logger.error("Color swap edit failed", error, { source: "eliteMockupGenerator" });
    return null;
  }
}
