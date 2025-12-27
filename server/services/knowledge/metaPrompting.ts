export interface PromptStructure {
  order: string[];
  example: {
    subject: string;
    action: string;
    setting: string;
    lighting: string;
    style: string;
    technical: string;
    quality: string;
  };
}

export const promptStructure: PromptStructure = {
  order: [
    '1. Subject (who/what)',
    '2. Action/pose',
    '3. Setting/environment',
    '4. Lighting',
    '5. Style/mood',
    '6. Technical (camera, lens)',
    '7. Quality enhancers'
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

export interface QualityKeywords {
  resolution: string[];
  rendering: string[];
  photography: string[];
  sharpness: string[];
}

export const qualityKeywords: QualityKeywords = {
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

export const universalNegatives: string[] = [
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

export const portraitNegatives: string[] = [
  'bad hands', 'wrong fingers', 'too many fingers',
  'fused fingers', 'bad eyes', 'crossed eyes',
  'asymmetric eyes', 'bad teeth', 'missing teeth',
  'plastic skin', 'waxy skin', 'mannequin',
  'uncanny valley', 'lifeless eyes', 'dead eyes',
  'unnatural pose', 'stiff pose', 'awkward expression'
];

export const landscapeNegatives: string[] = [
  'artificial looking', 'fake colors',
  'oversaturated sky', 'unnatural lighting',
  'floating objects', 'inconsistent shadows',
  'lens distortion', 'chromatic aberration'
];

export const productNegatives: string[] = [
  'fake looking', 'unrealistic reflections',
  'wrong proportions', 'floating product',
  'inconsistent lighting', 'harsh shadows',
  'low quality rendering', 'plastic appearance'
];

export const architectureNegatives: string[] = [
  'distorted perspective', 'uneven lines',
  'impossible geometry', 'inconsistent scale',
  'floating elements', 'unnatural materials'
];

export interface NegativePromptCategory {
  id: string;
  name: string;
  negatives: string[];
  applicableTo: string[];
}

export const negativePromptCategories: NegativePromptCategory[] = [
  {
    id: 'universal',
    name: 'Universal Quality',
    negatives: universalNegatives,
    applicableTo: ['all']
  },
  {
    id: 'portrait',
    name: 'Portrait/Human',
    negatives: portraitNegatives,
    applicableTo: ['portrait', 'fashion', 'editorial', 'human']
  },
  {
    id: 'landscape',
    name: 'Landscape/Nature',
    negatives: landscapeNegatives,
    applicableTo: ['landscape', 'nature', 'outdoor', 'scenic']
  },
  {
    id: 'product',
    name: 'Product Photography',
    negatives: productNegatives,
    applicableTo: ['product', 'commercial', 'ecommerce', 'mockup']
  },
  {
    id: 'architecture',
    name: 'Architecture/Interior',
    negatives: architectureNegatives,
    applicableTo: ['architecture', 'interior', 'building', 'real estate']
  }
];

export function getQualityEnhancers(type: keyof QualityKeywords = 'resolution', count: number = 3): string[] {
  return qualityKeywords[type].slice(0, count);
}

export function getNegativesForSubject(subjectType: string): string[] {
  const negatives = [...universalNegatives];
  
  for (const category of negativePromptCategories) {
    if (category.applicableTo.some(t => subjectType.toLowerCase().includes(t))) {
      negatives.push(...category.negatives);
    }
  }
  
  return Array.from(new Set(negatives));
}

export function buildOptimizedPrompt(elements: Partial<PromptStructure['example']>): { positive: string; negative: string } {
  const positive = [
    elements.subject,
    elements.action,
    elements.setting,
    elements.lighting,
    elements.style,
    elements.technical,
    qualityKeywords.resolution.slice(0, 2).join(', '),
    qualityKeywords.photography[0]
  ].filter(Boolean).join(', ');
  
  const subjectType = elements.subject?.toLowerCase() || '';
  const negative = getNegativesForSubject(subjectType).join(', ');
  
  return { positive, negative };
}
