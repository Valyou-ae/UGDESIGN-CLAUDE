/**
 * ═══════════════════════════════════════════════════════════════════════════
 * QUALITY CONTROL CHECKLIST
 * Enhancement Feature 10 | Impact: +5-10% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Comprehensive validation checklists for technical quality, anatomical
 * accuracy, and consistency across different image types.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface QualityChecklist {
  name: string;
  category: ChecklistCategory;
  description: string;
  items: ChecklistItem[];
  scoringThresholds: {
    excellent: number;
    good: number;
    acceptable: number;
    needsWork: number;
  };
}

export interface ChecklistItem {
  name: string;
  description: string;
  importance: 'critical' | 'important' | 'nice-to-have';
  checkMethod: string;
  passCriteria: string;
  failIndicators: string[];
  promptFixes: string[];
}

export type ChecklistCategory = 
  | 'technical' 
  | 'anatomical' 
  | 'consistency' 
  | 'composition' 
  | 'lighting'
  | 'materials';

export interface ValidationResult {
  passed: boolean;
  score: number;
  passedItems: string[];
  failedItems: string[];
  recommendations: string[];
}

// ============================================================================
// TECHNICAL QUALITY CHECKLIST
// ============================================================================

export const TECHNICAL_CHECKLIST: QualityChecklist = {
  name: "Technical Quality",
  category: "technical",
  description: "Fundamental image quality metrics",
  items: [
    {
      name: "Sharpness",
      description: "In-focus areas are crisp and detailed",
      importance: "critical",
      checkMethod: "Zoom to 100%, check edges and fine details",
      passCriteria: "Clear edges, visible fine detail, no blur where unintended",
      failIndicators: [
        "Soft focus on subject",
        "Muddy details",
        "Oversharpening halos"
      ],
      promptFixes: [
        "sharp focus on subject",
        "crisp detailed rendering",
        "high resolution quality"
      ]
    },
    {
      name: "Noise/Grain",
      description: "Appropriate noise levels for style",
      importance: "important",
      checkMethod: "Check shadow areas and smooth gradients",
      passCriteria: "Consistent grain if any, no color noise, natural look",
      failIndicators: [
        "Excessive color noise",
        "Patchy noise pattern",
        "Unnatural smoothness"
      ],
      promptFixes: [
        "clean image quality",
        "natural film grain",
        "professional noise levels"
      ]
    },
    {
      name: "Exposure",
      description: "Proper tonal range and brightness",
      importance: "critical",
      checkMethod: "Check histogram and key areas",
      passCriteria: "No clipped highlights or crushed shadows (unless intentional)",
      failIndicators: [
        "Blown out highlights",
        "Crushed black shadows",
        "Overall too dark/bright"
      ],
      promptFixes: [
        "properly exposed image",
        "balanced highlights and shadows",
        "full tonal range"
      ]
    },
    {
      name: "Color Accuracy",
      description: "Believable, consistent colors",
      importance: "important",
      checkMethod: "Check skin tones, neutrals, and known colors",
      passCriteria: "Natural colors, consistent white balance, no unwanted casts",
      failIndicators: [
        "Color banding",
        "Unnatural color casts",
        "Oversaturated colors"
      ],
      promptFixes: [
        "accurate natural colors",
        "proper white balance",
        "realistic color rendering"
      ]
    },
    {
      name: "Artifacts",
      description: "Free from AI generation artifacts",
      importance: "critical",
      checkMethod: "Scan entire image for anomalies",
      passCriteria: "No visible compression, warping, or generation artifacts",
      failIndicators: [
        "JPEG-like blocking",
        "Warped textures",
        "Strange patterns",
        "Melted details"
      ],
      promptFixes: [
        "high quality rendering",
        "clean artifact-free image",
        "professional quality"
      ]
    }
  ],
  scoringThresholds: {
    excellent: 95,
    good: 85,
    acceptable: 70,
    needsWork: 50
  }
};

// ============================================================================
// ANATOMICAL ACCURACY CHECKLIST
// ============================================================================

export const ANATOMICAL_CHECKLIST: QualityChecklist = {
  name: "Anatomical Accuracy",
  category: "anatomical",
  description: "Human anatomy correctness",
  items: [
    {
      name: "Eye Quality",
      description: "Eyes appear alive and realistic",
      importance: "critical",
      checkMethod: "Check for catchlights, iris detail, and gaze",
      passCriteria: "Bright catchlights, detailed iris, consistent gaze direction",
      failIndicators: [
        "Dead/lifeless eyes",
        "No catchlight",
        "Wall-eyed or cross-eyed",
        "Asymmetric eyes"
      ],
      promptFixes: [
        "bright catchlight in eyes",
        "realistic living eyes",
        "detailed iris with limbal ring"
      ]
    },
    {
      name: "Hand Anatomy",
      description: "Correct hand structure and finger count",
      importance: "critical",
      checkMethod: "Count fingers, check proportions, verify natural pose",
      passCriteria: "5 fingers per hand, correct proportions, natural pose",
      failIndicators: [
        "Wrong finger count (4 or 6)",
        "Extra joints",
        "Impossible poses",
        "Merged fingers"
      ],
      promptFixes: [
        "anatomically correct hands with five fingers",
        "natural hand pose",
        "realistic hand anatomy"
      ]
    },
    {
      name: "Facial Proportions",
      description: "Correct facial structure",
      importance: "critical",
      checkMethod: "Check thirds, eye spacing, symmetry",
      passCriteria: "Natural proportions, slight asymmetry, age-appropriate",
      failIndicators: [
        "Uncanny valley feeling",
        "Wrong proportions",
        "Excessive symmetry",
        "Deformed features"
      ],
      promptFixes: [
        "natural facial proportions",
        "realistic face structure",
        "slight natural asymmetry"
      ]
    },
    {
      name: "Skin Texture",
      description: "Realistic skin appearance",
      importance: "critical",
      checkMethod: "Check for pores, texture, subsurface scattering",
      passCriteria: "Visible pores, natural texture, SSS in backlit areas",
      failIndicators: [
        "Plastic/waxy skin",
        "Too smooth",
        "No visible pores",
        "Flat unrealistic skin"
      ],
      promptFixes: [
        "natural skin texture with visible pores",
        "subsurface scattering in skin",
        "realistic human skin detail"
      ]
    },
    {
      name: "Body Proportions",
      description: "Correct body structure",
      importance: "important",
      checkMethod: "Check limb lengths, body ratios, pose possibility",
      passCriteria: "7.5-8 head heights, natural proportions, possible pose",
      failIndicators: [
        "Impossible body position",
        "Wrong limb lengths",
        "Unnatural proportions"
      ],
      promptFixes: [
        "anatomically correct body proportions",
        "natural body structure",
        "realistic human physique"
      ]
    },
    {
      name: "Teeth/Mouth",
      description: "Correct dental and mouth anatomy",
      importance: "important",
      checkMethod: "Check tooth count, shape, and placement if visible",
      passCriteria: "Natural teeth, correct count, proper placement",
      failIndicators: [
        "Too many teeth",
        "Deformed teeth",
        "Unnatural gums"
      ],
      promptFixes: [
        "natural teeth anatomy",
        "realistic mouth and teeth",
        "correct dental structure"
      ]
    }
  ],
  scoringThresholds: {
    excellent: 95,
    good: 85,
    acceptable: 70,
    needsWork: 50
  }
};

// ============================================================================
// CONSISTENCY CHECKLIST
// ============================================================================

export const CONSISTENCY_CHECKLIST: QualityChecklist = {
  name: "Internal Consistency",
  category: "consistency",
  description: "Coherence of image elements",
  items: [
    {
      name: "Lighting Consistency",
      description: "Light sources and shadows match",
      importance: "critical",
      checkMethod: "Trace shadows to light sources, check highlight placement",
      passCriteria: "All shadows point correctly, consistent highlight direction",
      failIndicators: [
        "Conflicting shadow directions",
        "Impossible lighting",
        "Inconsistent highlight positions"
      ],
      promptFixes: [
        "consistent lighting direction",
        "coherent shadow placement",
        "unified light source"
      ]
    },
    {
      name: "Perspective Consistency",
      description: "All elements share same perspective",
      importance: "critical",
      checkMethod: "Check vanishing points, relative sizes",
      passCriteria: "Single consistent perspective, correct size relationships",
      failIndicators: [
        "Multiple perspectives",
        "Objects wrong size for distance",
        "Perspective warping"
      ],
      promptFixes: [
        "consistent perspective throughout",
        "correct spatial relationships",
        "unified viewpoint"
      ]
    },
    {
      name: "Style Consistency",
      description: "Unified visual style across image",
      importance: "important",
      checkMethod: "Compare rendering style of different elements",
      passCriteria: "Same level of detail, consistent rendering approach",
      failIndicators: [
        "Mixed rendering styles",
        "Some areas more detailed than others",
        "Stylistic inconsistency"
      ],
      promptFixes: [
        "consistent artistic style",
        "unified rendering approach",
        "coherent visual treatment"
      ]
    },
    {
      name: "Color Harmony",
      description: "Colors work together coherently",
      importance: "important",
      checkMethod: "Check color temperature consistency, palette harmony",
      passCriteria: "Consistent color temperature, harmonious palette",
      failIndicators: [
        "Clashing colors",
        "Inconsistent color temperature",
        "Random color elements"
      ],
      promptFixes: [
        "harmonious color palette",
        "consistent color temperature",
        "unified color scheme"
      ]
    },
    {
      name: "Scale Relationships",
      description: "Objects are correctly sized relative to each other",
      importance: "critical",
      checkMethod: "Compare known object sizes",
      passCriteria: "Objects correctly sized for their distance and type",
      failIndicators: [
        "Giant or tiny objects",
        "Wrong size relationships",
        "Inconsistent scales"
      ],
      promptFixes: [
        "correct object scales",
        "proper size relationships",
        "realistic proportions"
      ]
    }
  ],
  scoringThresholds: {
    excellent: 95,
    good: 85,
    acceptable: 70,
    needsWork: 50
  }
};

// ============================================================================
// COMPOSITION CHECKLIST
// ============================================================================

export const COMPOSITION_CHECKLIST: QualityChecklist = {
  name: "Composition Quality",
  category: "composition",
  description: "Visual arrangement and flow",
  items: [
    {
      name: "Subject Placement",
      description: "Subject positioned effectively",
      importance: "important",
      checkMethod: "Check rule of thirds, visual weight",
      passCriteria: "Subject well-placed, balanced composition",
      failIndicators: [
        "Awkward centering",
        "Subject too small",
        "Poor framing"
      ],
      promptFixes: [
        "well-composed framing",
        "subject on rule of thirds",
        "balanced composition"
      ]
    },
    {
      name: "Visual Balance",
      description: "Image feels balanced and stable",
      importance: "important",
      checkMethod: "Check visual weight distribution",
      passCriteria: "Balanced visual weight, intentional asymmetry if present",
      failIndicators: [
        "Heavy on one side",
        "Unintentional imbalance",
        "Awkward weight distribution"
      ],
      promptFixes: [
        "balanced visual composition",
        "proper visual weight",
        "harmonious arrangement"
      ]
    },
    {
      name: "Leading Lines",
      description: "Lines guide viewer through image",
      importance: "nice-to-have",
      checkMethod: "Trace natural eye path through image",
      passCriteria: "Lines lead to subject or through scene naturally",
      failIndicators: [
        "Lines leading out of frame",
        "Distracting line elements"
      ],
      promptFixes: [
        "leading lines toward subject",
        "compositional flow",
        "guided eye path"
      ]
    },
    {
      name: "Negative Space",
      description: "Empty space used effectively",
      importance: "nice-to-have",
      checkMethod: "Evaluate breathing room and empty areas",
      passCriteria: "Negative space enhances composition",
      failIndicators: [
        "Cluttered composition",
        "No breathing room",
        "Wasted space"
      ],
      promptFixes: [
        "effective negative space",
        "breathing room in composition",
        "balanced positive and negative space"
      ]
    }
  ],
  scoringThresholds: {
    excellent: 90,
    good: 80,
    acceptable: 65,
    needsWork: 45
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get checklist by category
 */
export function getChecklist(category: ChecklistCategory): QualityChecklist | undefined {
  const checklists: Record<string, QualityChecklist> = {
    technical: TECHNICAL_CHECKLIST,
    anatomical: ANATOMICAL_CHECKLIST,
    consistency: CONSISTENCY_CHECKLIST,
    composition: COMPOSITION_CHECKLIST
  };
  return checklists[category];
}

/**
 * Get critical items from checklist
 */
export function getCriticalItems(checklist: QualityChecklist): ChecklistItem[] {
  return checklist.items.filter(item => item.importance === 'critical');
}

/**
 * Generate fix prompt from failed items
 */
export function generateFixPrompt(failedItems: ChecklistItem[]): string {
  const fixes = failedItems.flatMap(item => item.promptFixes);
  return [...new Set(fixes)].join(', ');
}

/**
 * Calculate checklist score
 */
export function calculateScore(
  checklist: QualityChecklist,
  passedItems: string[]
): number {
  const weights = {
    critical: 3,
    important: 2,
    'nice-to-have': 1
  };
  
  let totalWeight = 0;
  let earnedWeight = 0;
  
  checklist.items.forEach(item => {
    const weight = weights[item.importance];
    totalWeight += weight;
    if (passedItems.includes(item.name)) {
      earnedWeight += weight;
    }
  });
  
  return Math.round((earnedWeight / totalWeight) * 100);
}

/**
 * Get score rating
 */
export function getScoreRating(
  score: number,
  thresholds: QualityChecklist['scoringThresholds']
): string {
  if (score >= thresholds.excellent) return 'Excellent';
  if (score >= thresholds.good) return 'Good';
  if (score >= thresholds.acceptable) return 'Acceptable';
  return 'Needs Work';
}

/**
 * Validate image against checklist
 */
export function validateAgainstChecklist(
  checklist: QualityChecklist,
  passedItems: string[]
): ValidationResult {
  const failedItems = checklist.items
    .filter(item => !passedItems.includes(item.name))
    .map(item => item.name);
  
  const failedItemObjects = checklist.items
    .filter(item => failedItems.includes(item.name));
  
  const score = calculateScore(checklist, passedItems);
  
  return {
    passed: score >= checklist.scoringThresholds.acceptable,
    score,
    passedItems,
    failedItems,
    recommendations: failedItemObjects.flatMap(item => item.promptFixes)
  };
}

/**
 * Get portrait quality checklist
 */
export function getPortraitChecklist(): QualityChecklist[] {
  return [
    TECHNICAL_CHECKLIST,
    ANATOMICAL_CHECKLIST,
    CONSISTENCY_CHECKLIST
  ];
}

/**
 * Get landscape quality checklist
 */
export function getLandscapeChecklist(): QualityChecklist[] {
  return [
    TECHNICAL_CHECKLIST,
    CONSISTENCY_CHECKLIST,
    COMPOSITION_CHECKLIST
  ];
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  TECHNICAL_CHECKLIST,
  ANATOMICAL_CHECKLIST,
  CONSISTENCY_CHECKLIST,
  COMPOSITION_CHECKLIST,
  getChecklist,
  getCriticalItems,
  generateFixPrompt,
  calculateScore,
  getScoreRating,
  validateAgainstChecklist,
  getPortraitChecklist,
  getLandscapeChecklist
};
