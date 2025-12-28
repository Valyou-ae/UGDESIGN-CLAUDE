/**
 * NEGATIVE PROMPTS KNOWLEDGE BASE
 * Quality control exclusions for AI image generation
 * Version: 1.0
 */

export const NEGATIVE_PROMPT_CATEGORIES = {
  // TECHNICAL ISSUES
  technical: [
    'blurry', 'out of focus', 'motion blur', 'camera shake',
    'grainy', 'noisy', 'low resolution', 'pixelated',
    'compression artifacts', 'jpeg artifacts', 'banding',
    'chromatic aberration', 'lens distortion', 'vignetting',
    'overexposed', 'underexposed', 'blown highlights', 'crushed blacks'
  ],
  
  // AI ARTIFACTS
  aiArtifacts: [
    'AI artifacts', 'generated glitches', 'distorted features',
    'melted appearance', 'merged objects', 'floating elements',
    'duplicate elements', 'extra limbs', 'missing limbs',
    'deformed', 'mutated', 'disfigured', 'malformed'
  ],
  
  // HUMAN SUBJECT ISSUES
  humanSubject: [
    'wrong number of fingers', 'extra fingers', 'missing fingers',
    'deformed hands', 'awkward hands', 'unnatural pose',
    'distorted face', 'asymmetrical face', 'uncanny valley',
    'dead eyes', 'vacant stare', 'crossed eyes',
    'extra limbs', 'missing limbs', 'fused body parts',
    'incorrect anatomy', 'disproportionate'
  ],
  
  // COMPOSITION ISSUES
  composition: [
    'cluttered', 'messy composition', 'poor framing',
    'awkward cropping', 'cut off subject', 'unbalanced',
    'distracting background', 'busy background',
    'competing elements', 'chaotic arrangement'
  ],
  
  // LIGHTING ISSUES
  lighting: [
    'bad lighting', 'harsh shadows', 'flat lighting',
    'wrong shadow direction', 'multiple shadow directions',
    'conflicting light sources', 'unnatural lighting',
    'direct flash', 'on-camera flash', 'red eye'
  ],
  
  // PRODUCT/MOCKUP SPECIFIC
  mockupSpecific: [
    'cheap appearance', 'low-quality mockup', 'fake looking',
    'unrealistic materials', 'poor texture', 'plastic appearance',
    'incorrect proportions', 'warped product', 'distorted print',
    'wrong product color', 'inaccurate print placement'
  ],
  
  // STYLE ISSUES
  style: [
    'amateur photography', 'snapshot quality', 'dated style',
    'oversaturated', 'undersaturated', 'muddy colors',
    'unrealistic colors', 'color cast', 'wrong white balance',
    'watermark', 'text overlay', 'signature'
  ],
  
  // FABRIC/APPAREL SPECIFIC
  fabricApparel: [
    'stiff fabric', 'unnatural drape', 'no wrinkles',
    'excessive wrinkles', 'fabric clipping', 'floating fabric',
    'wrong fabric texture', 'plastic fabric', 'paper-like',
    'print not following contours', 'flat print on 3D surface'
  ],
  
  // GEMINI-SPECIFIC
  geminiSpecific: [
    'anime style', 'cartoon', 'illustration', 'painting',
    'sketch', 'drawing', 'digital art', '3D render',
    'CGI', 'video game', 'unrealistic', 'fantasy'
  ]
};

export function buildNegativePrompt(options: {
  productType?: 'apparel' | 'phone-case' | 'home' | 'accessory';
  includeHumans?: boolean;
  context?: 'ecommerce' | 'lifestyle' | 'editorial';
  platform?: 'gemini' | 'midjourney' | 'stable-diffusion';
}): string {
  const prompts: string[] = [];
  
  // Always include technical and AI artifacts
  prompts.push(...NEGATIVE_PROMPT_CATEGORIES.technical);
  prompts.push(...NEGATIVE_PROMPT_CATEGORIES.aiArtifacts);
  prompts.push(...NEGATIVE_PROMPT_CATEGORIES.composition);
  prompts.push(...NEGATIVE_PROMPT_CATEGORIES.lighting);
  prompts.push(...NEGATIVE_PROMPT_CATEGORIES.style);
  prompts.push(...NEGATIVE_PROMPT_CATEGORIES.mockupSpecific);
  
  // Add human-specific if applicable
  if (options.includeHumans) {
    prompts.push(...NEGATIVE_PROMPT_CATEGORIES.humanSubject);
  }
  
  // Add apparel-specific if applicable
  if (options.productType === 'apparel') {
    prompts.push(...NEGATIVE_PROMPT_CATEGORIES.fabricApparel);
  }
  
  // Add platform-specific
  if (options.platform === 'gemini') {
    prompts.push(...NEGATIVE_PROMPT_CATEGORIES.geminiSpecific);
  }
  
  return [...new Set(prompts)].join(', ');
}

export function getQuickNegativePrompt(type: 'product' | 'apparel-model' | 'lifestyle'): string {
  const base = 'blurry, low quality, distorted, deformed, ugly, bad anatomy, bad proportions';
  
  if (type === 'product') {
    return base + ', cheap appearance, unrealistic, CGI, 3D render';
  }
  if (type === 'apparel-model') {
    return base + ', wrong fingers, extra limbs, stiff fabric, plastic appearance, unnatural pose';
  }
  return base + ', amateur photography, snapshot, cluttered background';
}
