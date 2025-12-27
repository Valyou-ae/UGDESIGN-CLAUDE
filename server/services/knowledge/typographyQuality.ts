export interface TextQualityKeywords {
  sharpness: string[];
  consistency: string[];
  integration: string[];
}

export const textQuality: TextQualityKeywords = {
  sharpness: [
    'crisp sharp text',
    'perfectly rendered typography',
    'clear legible text',
    'tack-sharp lettering'
  ],
  consistency: [
    'consistent letter spacing',
    'proper kerning',
    'even text weight',
    'uniform typography'
  ],
  integration: [
    'seamlessly integrated text',
    'naturally placed typography',
    'environmental text blending',
    'realistic text on surface'
  ]
};

export interface FontCategory {
  id: string;
  name: string;
  mood: string;
  promptKeywords: string[];
}

export const fontCategories: FontCategory[] = [
  {
    id: 'serif',
    name: 'Serif',
    mood: 'Traditional, elegant, trustworthy',
    promptKeywords: [
      'elegant serif typography',
      'classic serif font style',
      'traditional serif lettering'
    ]
  },
  {
    id: 'sans-serif',
    name: 'Sans-Serif',
    mood: 'Modern, clean, minimal',
    promptKeywords: [
      'clean sans-serif typography',
      'modern minimal font',
      'contemporary sans-serif'
    ]
  },
  {
    id: 'script',
    name: 'Script',
    mood: 'Decorative, personal, flowing',
    promptKeywords: [
      'flowing script typography',
      'elegant cursive lettering',
      'decorative script font'
    ]
  },
  {
    id: 'display',
    name: 'Display',
    mood: 'Bold, impactful, attention-grabbing',
    promptKeywords: [
      'bold display typography',
      'impactful headline font',
      'attention-grabbing text'
    ]
  },
  {
    id: 'monospace',
    name: 'Monospace',
    mood: 'Technical, code, retro',
    promptKeywords: [
      'monospace technical typography',
      'code-style lettering',
      'fixed-width font style'
    ]
  }
];

export interface LegibilityRule {
  id: string;
  name: string;
  rule: string;
  promptKeywords: string[];
}

export const legibilityRules: LegibilityRule[] = [
  {
    id: 'contrast',
    name: 'Contrast',
    rule: 'Minimum 4.5:1 contrast ratio',
    promptKeywords: [
      'high contrast text',
      'clearly visible typography',
      'legible text against background'
    ]
  },
  {
    id: 'size',
    name: 'Size',
    rule: 'Appropriate size for viewing distance',
    promptKeywords: [
      'appropriately sized text',
      'readable font size',
      'properly scaled typography'
    ]
  },
  {
    id: 'background',
    name: 'Background',
    rule: 'Clean background behind text',
    promptKeywords: [
      'clean text background',
      'uncluttered text area',
      'clear text placement'
    ]
  }
];

export interface TechnicalCheck {
  id: string;
  name: string;
  check: string;
  issues: string[];
  promptFix: string;
  negativePrompt?: string;
}

export const technicalChecks: TechnicalCheck[] = [
  {
    id: 'resolution',
    name: 'Resolution',
    check: 'Is output at requested resolution?',
    issues: ['Upscaling artifacts', 'Soft details'],
    promptFix: '8k resolution, extremely detailed, sharp throughout'
  },
  {
    id: 'sharpness',
    name: 'Sharpness',
    check: 'Is focus sharp where intended?',
    issues: ['Soft focus', 'Motion blur unintended'],
    promptFix: 'tack sharp focus, crisp details'
  },
  {
    id: 'noise',
    name: 'Noise',
    check: 'Is noise level appropriate?',
    issues: ['Excessive grain', 'Color noise'],
    promptFix: 'clean image, low noise'
  },
  {
    id: 'artifacts',
    name: 'Artifacts',
    check: 'Are there compression or generation artifacts?',
    issues: ['Banding', 'Posterization', 'Halos'],
    promptFix: 'artifact-free, clean rendering',
    negativePrompt: 'jpeg artifacts, compression artifacts, banding'
  }
];

export interface AnatomicalCheck {
  id: string;
  name: string;
  check: string;
  commonIssues: string[];
  promptFix: string;
  negativePrompt: string;
}

export const anatomicalChecks: AnatomicalCheck[] = [
  {
    id: 'hands',
    name: 'Hands',
    check: 'Are hands anatomically correct?',
    commonIssues: [
      'Wrong finger count',
      'Fused fingers',
      'Impossible poses',
      'Wrong proportions'
    ],
    promptFix: 'anatomically correct hands, proper finger count',
    negativePrompt: 'bad hands, wrong fingers, fused fingers, extra fingers'
  },
  {
    id: 'face',
    name: 'Face',
    check: 'Is face properly rendered?',
    commonIssues: [
      'Asymmetric features',
      'Wrong eye placement',
      'Distorted proportions'
    ],
    promptFix: 'symmetrical face, proper facial proportions',
    negativePrompt: 'asymmetric face, distorted features, wrong proportions'
  },
  {
    id: 'body',
    name: 'Body',
    check: 'Are body proportions correct?',
    commonIssues: [
      'Wrong limb length',
      'Twisted torso',
      'Floating limbs'
    ],
    promptFix: 'anatomically correct body, proper proportions',
    negativePrompt: 'bad anatomy, wrong proportions, extra limbs'
  }
];

export interface ConsistencyCheck {
  id: string;
  name: string;
  check: string;
  issues: string[];
  promptFix: string;
}

export const consistencyChecks: ConsistencyCheck[] = [
  {
    id: 'lighting',
    name: 'Lighting',
    check: 'Is lighting consistent across scene?',
    issues: ['Multiple light directions', 'Inconsistent shadows'],
    promptFix: 'consistent lighting direction, unified light source'
  },
  {
    id: 'shadows',
    name: 'Shadows',
    check: 'Do shadows match light sources?',
    issues: ['Wrong shadow direction', 'Missing shadows'],
    promptFix: 'accurate shadow casting, consistent shadow direction'
  },
  {
    id: 'color',
    name: 'Color',
    check: 'Is color palette harmonious?',
    issues: ['Clashing colors', 'Unintended color cast'],
    promptFix: 'harmonious color palette, color coherence'
  },
  {
    id: 'style',
    name: 'Style',
    check: 'Is artistic style consistent?',
    issues: ['Mixed styles', 'Inconsistent rendering'],
    promptFix: 'consistent artistic style throughout'
  }
];

export interface QualityScore {
  category: string;
  weight: number;
  criteria: string[];
}

export const qualityScoring: QualityScore[] = [
  {
    category: 'technical',
    weight: 30,
    criteria: ['Resolution', 'Sharpness', 'Noise', 'Artifacts']
  },
  {
    category: 'anatomical',
    weight: 25,
    criteria: ['Hands', 'Face', 'Body', 'Proportions']
  },
  {
    category: 'consistency',
    weight: 25,
    criteria: ['Lighting', 'Shadows', 'Color', 'Style']
  },
  {
    category: 'composition',
    weight: 20,
    criteria: ['Framing', 'Balance', 'Flow', 'Subject']
  }
];

export const preGenerationChecklist: string[] = [
  'Subject clearly described',
  'Lighting setup specified',
  'Camera/lens defined',
  'Style/mood included',
  'Quality keywords added',
  'Negative prompts included',
  'Aspect ratio appropriate',
  'Key details not conflicting'
];

export const postGenerationChecklist: string[] = [
  'Resolution meets requirements',
  'Focus is sharp where intended',
  'Anatomy is correct (especially hands/face)',
  'Lighting is consistent',
  'Shadows are accurate',
  'No visible artifacts',
  'Colors are harmonious',
  'Composition is balanced',
  'Style matches request',
  'No unwanted elements'
];

export function getFontCategoryById(id: string): FontCategory | undefined {
  return fontCategories.find(f => f.id === id);
}

export function getQualityKeywords(type: keyof TextQualityKeywords = 'sharpness'): string[] {
  return textQuality[type];
}

export function getAllQualityFixes(): string[] {
  return [
    ...technicalChecks.map(c => c.promptFix),
    ...anatomicalChecks.map(c => c.promptFix),
    ...consistencyChecks.map(c => c.promptFix)
  ];
}

export function getAllNegativePrompts(): string[] {
  return [
    ...technicalChecks.filter(c => c.negativePrompt).map(c => c.negativePrompt!),
    ...anatomicalChecks.map(c => c.negativePrompt)
  ];
}
