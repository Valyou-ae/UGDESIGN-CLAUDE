/**
 * IMPLEMENTATION GUIDE
 * Complete integration patterns for Mockup Generator
 * Version: 1.0
 */

// ============================================================================
// QUICK START
// ============================================================================

/*
 * STEP 1: Import Knowledge Base Modules
 * 
 * import { getLightingSetup, buildLightingPrompt } from './lightingSetups';
 * import { getCameraAngle, buildAnglePrompt } from './productAngleDetails';
 * import { buildNegativePrompt } from './negativePrompts';
 * import { GEMINI_CONFIG, GEMINI_PARAMETERS } from './platformOptimization';
 * import { buildPhysicsPrompt } from './printMethodPhysics';
 * import { getYoungAdultPersona } from './youngAdultPersonas';
 */

// ============================================================================
// BASIC PROMPT BUILDER
// ============================================================================

export function buildBasicMockupPrompt(options: {
  product: string;
  productType: 'apparel' | 'phone-case' | 'home';
  lighting?: string;
  angle?: string;
}): { mainPrompt: string; negativePrompt: string } {
  
  const mainPrompt = `
    Professional product photography.
    Shot on Sony A7R V with 85mm f/1.4 lens.
    ${options.lighting || 'Professional studio lighting, three-point setup'}.
    ${options.angle || 'Front view, centered composition'}.
    ${options.product}.
    Photorealistic, 8K resolution, tack-sharp focus, commercial quality.
  `.trim().replace(/\s+/g, ' ');
  
  const negativePrompt = 'blurry, low quality, distorted, deformed, ugly, amateur, CGI, 3D render, cartoon, illustration';
  
  return { mainPrompt, negativePrompt };
}

// ============================================================================
// ADVANCED PROMPT BUILDER WITH PERSONA
// ============================================================================

export function buildAdvancedMockupPrompt(options: {
  product: string;
  productType: 'apparel' | 'phone-case' | 'home';
  persona?: {
    ethnicity: string;
    sex: string;
    age: string;
    size: string;
    description: string;
  };
  printMethod?: 'dtg' | 'screen' | 'sublimation' | 'htv';
  fabricType?: 'cotton' | 'polyester' | 'blend' | 'fleece';
  style?: 'commercial' | 'lifestyle' | 'editorial';
}): { mainPrompt: string; negativePrompt: string; parameters: object } {
  
  let modelDescription = '';
  if (options.persona) {
    modelDescription = `${options.persona.description}, wearing`;
  }
  
  const lightingStyle = options.style === 'lifestyle' 
    ? 'natural golden hour lighting' 
    : 'professional three-point studio lighting';
  
  const mainPrompt = `
    Professional ${options.style || 'commercial'} photography.
    Shot on Sony A7R V with 85mm f/1.4 lens at f/2.8.
    ${lightingStyle}.
    ${modelDescription} ${options.product}.
    Photorealistic, 8K resolution, tack-sharp focus, magazine quality.
  `.trim().replace(/\s+/g, ' ');
  
  const negativePrompt = 'blurry, low quality, distorted, deformed, ugly, bad anatomy, wrong fingers, extra limbs, stiff fabric, plastic appearance, amateur photography, CGI, 3D render, cartoon';
  
  const parameters = {
    temperature: 0.4,
    topK: 32,
    topP: 0.8
  };
  
  return { mainPrompt, negativePrompt, parameters };
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
 * EXAMPLE 1: Basic Product Shot
 * 
 * const { mainPrompt, negativePrompt } = buildBasicMockupPrompt({
 *   product: 'white t-shirt with geometric pattern design on front',
 *   productType: 'apparel'
 * });
 * 
 * // Send to Gemini API
 * const result = await generateImage(mainPrompt, negativePrompt);
 */

/*
 * EXAMPLE 2: Lifestyle Shot with Model
 * 
 * import { getYoungAdultPersona } from './youngAdultPersonas';
 * 
 * const persona = getYoungAdultPersona('Asian', 'Female', 'M');
 * 
 * const { mainPrompt, negativePrompt, parameters } = buildAdvancedMockupPrompt({
 *   product: 'oversized hoodie with vintage logo print',
 *   productType: 'apparel',
 *   persona: {
 *     ethnicity: persona.ethnicity,
 *     sex: persona.sex,
 *     age: persona.age,
 *     size: persona.size,
 *     description: persona.fullDescription
 *   },
 *   printMethod: 'screen',
 *   fabricType: 'fleece',
 *   style: 'lifestyle'
 * });
 */

// ============================================================================
// BEST PRACTICES
// ============================================================================

export const BEST_PRACTICES = {
  promptStructure: [
    '1. Front-load technical camera specs (Gemini responds best)',
    '2. Include lighting details early in prompt',
    '3. Describe subject/product clearly',
    '4. Add style and quality modifiers at end',
    '5. ALWAYS use negative prompts for quality control'
  ],
  
  commonMistakes: [
    'Forgetting negative prompts (50% quality difference!)',
    'Vague descriptions instead of specific details',
    'Conflicting instructions (petite body + XXXL size)',
    'Missing print method physics for apparel',
    'Not specifying lighting style'
  ],
  
  qualityTips: [
    'Use specific camera models for authenticity',
    'Include lens focal length and aperture',
    'Specify lighting type and direction',
    'Add fabric physics for apparel realism',
    'Use unified personas for consistent models'
  ]
};

console.log('Implementation Guide loaded. Ready to build mockups!');
