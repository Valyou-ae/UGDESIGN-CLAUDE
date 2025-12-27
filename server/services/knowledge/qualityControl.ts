/**
 * QUALITY CONTROL & META-PROMPTING
 * Systematic validation, negative prompts, and quality enhancement
 */

export interface QualityCheck {
  category: 'technical' | 'anatomical' | 'consistency' | 'composition';
  checks: string[];
  promptFixes: string[];
  negativePrompts: string[];
}

export const QUALITY_KEYWORDS = {
  resolution: [
    '8k resolution',
    'ultra high definition',
    'extremely detailed',
    'intricate details',
    'hyperdetailed'
  ],
  rendering: [
    'photorealistic rendering',
    'ray-traced lighting',
    'physically based materials',
    'octane render quality',
    'unreal engine 5 quality'
  ],
  photography: [
    'award-winning photography',
    'professional photograph',
    'magazine quality',
    'National Geographic quality',
    'Vogue editorial quality'
  ],
  sharpness: [
    'tack sharp focus',
    'crisp details',
    'sharp throughout',
    'perfect focus'
  ]
};

export const UNIVERSAL_NEGATIVES = [
  'blurry', 'out of focus', 'low quality', 'low resolution',
  'pixelated', 'jpeg artifacts', 'compression artifacts',
  'noise', 'grainy', 'oversaturated', 'overexposed',
  'underexposed', 'bad anatomy', 'bad proportions',
  'deformed', 'distorted', 'disfigured', 'mutated',
  'extra limbs', 'missing limbs', 'floating limbs',
  'disconnected limbs', 'malformed', 'ugly', 'duplicate',
  'morbid', 'mutilated', 'watermark', 'signature',
  'text', 'logo', 'cropped', 'worst quality'
];

export const PORTRAIT_NEGATIVES = [
  'bad hands', 'wrong fingers', 'too many fingers',
  'fused fingers', 'bad eyes', 'crossed eyes',
  'asymmetric eyes', 'bad teeth', 'missing teeth',
  'plastic skin', 'waxy skin', 'mannequin',
  'uncanny valley', 'lifeless eyes', 'dead eyes',
  'unnatural pose', 'stiff pose', 'awkward expression'
];

export const LANDSCAPE_NEGATIVES = [
  'artificial looking', 'fake colors',
  'oversaturated sky', 'unnatural lighting',
  'floating objects', 'inconsistent shadows',
  'lens distortion', 'chromatic aberration'
];

export const PRODUCT_NEGATIVES = [
  'floating product', 'incorrect perspective',
  'wrong scale', 'unnatural shadows',
  'harsh reflections', 'color bleeding'
];

export const QUALITY_CHECKS: Record<string, QualityCheck> = {
  technical: {
    category: 'technical',
    checks: ['Resolution meets requirements', 'Focus is sharp where intended', 'Noise level appropriate', 'No compression artifacts'],
    promptFixes: ['8k resolution', 'extremely detailed', 'sharp throughout', 'tack sharp focus', 'crisp details'],
    negativePrompts: ['blurry', 'low quality', 'pixelated', 'jpeg artifacts', 'noise', 'soft focus']
  },
  anatomical: {
    category: 'anatomical',
    checks: ['Hands anatomically correct', 'Face properly rendered', 'Body proportions correct', 'Natural poses'],
    promptFixes: ['anatomically correct hands with proper finger count', 'symmetrical face with proper proportions', 'natural human anatomy', 'correct body proportions'],
    negativePrompts: PORTRAIT_NEGATIVES
  },
  consistency: {
    category: 'consistency',
    checks: ['Lighting consistent across scene', 'Shadows match light sources', 'Color palette harmonious', 'Style consistent throughout'],
    promptFixes: ['consistent lighting direction', 'unified light source', 'accurate shadow casting', 'harmonious color palette'],
    negativePrompts: ['inconsistent lighting', 'wrong shadows', 'clashing colors', 'mixed styles']
  },
  composition: {
    category: 'composition',
    checks: ['Framing quality', 'Subject placement', 'Balance assessment', 'Visual flow'],
    promptFixes: ['balanced composition', 'proper framing', 'visual harmony', 'clear focal point'],
    negativePrompts: ['poor composition', 'awkward framing', 'unbalanced', 'cluttered']
  }
};

export const PROMPT_STRUCTURE = {
  order: [
    'Subject (who/what)',
    'Action/pose',
    'Setting/environment',
    'Lighting',
    'Style/mood',
    'Technical (camera, lens)',
    'Quality enhancers'
  ],
  example: {
    subject: 'Beautiful woman with flowing red hair',
    action: 'looking over shoulder with confident smile',
    setting: 'in modern minimalist apartment',
    lighting: 'golden hour light streaming through windows',
    style: 'editorial fashion photography style',
    technical: 'shot on Canon EOS R5 with 85mm f/1.4',
    quality: '8k resolution, highly detailed, professional'
  }
};

export function getQualityKeywords(category: keyof typeof QUALITY_KEYWORDS): string[] {
  return QUALITY_KEYWORDS[category] || [];
}

export function getUniversalNegatives(): string[] {
  return UNIVERSAL_NEGATIVES;
}

export function getNegativesForSubject(subject: 'portrait' | 'landscape' | 'product' | 'general'): string[] {
  switch (subject) {
    case 'portrait':
      return [...UNIVERSAL_NEGATIVES, ...PORTRAIT_NEGATIVES];
    case 'landscape':
      return [...UNIVERSAL_NEGATIVES, ...LANDSCAPE_NEGATIVES];
    case 'product':
      return [...UNIVERSAL_NEGATIVES, ...PRODUCT_NEGATIVES];
    default:
      return UNIVERSAL_NEGATIVES;
  }
}

export function buildQualityEnhancement(level: 'basic' | 'standard' | 'premium'): string {
  switch (level) {
    case 'basic':
      return 'high quality, detailed';
    case 'standard':
      return `${QUALITY_KEYWORDS.resolution[0]}, ${QUALITY_KEYWORDS.sharpness[0]}, ${QUALITY_KEYWORDS.photography[0]}`;
    case 'premium':
      return `${QUALITY_KEYWORDS.resolution.slice(0, 2).join(', ')}, ${QUALITY_KEYWORDS.rendering[0]}, ${QUALITY_KEYWORDS.photography[0]}, ${QUALITY_KEYWORDS.sharpness[0]}`;
  }
}

export function getQualityCheck(category: string): QualityCheck | undefined {
  return QUALITY_CHECKS[category];
}
