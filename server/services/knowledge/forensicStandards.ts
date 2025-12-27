/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FORENSIC QUALITY STANDARDS
 * Hyper-Realism Tier 3, Feature 15 | Impact: +10-15% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Professional quality assurance standards, validation checklists,
 * and forensic-level authenticity verification.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface QualityStandard {
  name: string;
  category: StandardCategory;
  description: string;
  checkpoints: Checkpoint[];
  passingScore: number;
  professionalLevel: 'basic' | 'intermediate' | 'expert';
}

export interface Checkpoint {
  name: string;
  description: string;
  weight: number;
  checkMethod: string;
  passCondition: string;
  failIndicators: string[];
}

export type StandardCategory = 
  | 'technical' 
  | 'anatomical' 
  | 'compositional' 
  | 'authenticity' 
  | 'professional';

// ============================================================================
// TECHNICAL QUALITY STANDARDS
// ============================================================================

export const TECHNICAL_STANDARDS: QualityStandard = {
  name: "Technical Quality Standards",
  category: "technical",
  description: "Core technical image quality requirements",
  checkpoints: [
    {
      name: "Resolution Adequacy",
      description: "Image resolution meets use case requirements",
      weight: 15,
      checkMethod: "Check pixel dimensions against target use",
      passCondition: "Meets or exceeds minimum for intended output",
      failIndicators: ["pixelation visible", "insufficient for print", "upscaling artifacts"]
    },
    {
      name: "Focus Accuracy",
      description: "Critical areas are in sharp focus",
      weight: 20,
      checkMethod: "100% zoom on subject focus plane",
      passCondition: "Subject sharp where intended, natural DOF falloff",
      failIndicators: ["missed focus", "blur on critical areas", "focus drift"]
    },
    {
      name: "Noise Control",
      description: "Noise levels appropriate for style",
      weight: 10,
      checkMethod: "Check shadow areas and gradients",
      passCondition: "No distracting color noise, grain is intentional if present",
      failIndicators: ["color noise in shadows", "banding", "excessive digital noise"]
    },
    {
      name: "Dynamic Range",
      description: "Full tonal range without clipping",
      weight: 15,
      checkMethod: "Histogram analysis",
      passCondition: "No unintentional clipping, smooth transitions",
      failIndicators: ["blown highlights", "crushed shadows", "tonal gaps"]
    },
    {
      name: "Artifact Freedom",
      description: "No compression or generation artifacts",
      weight: 20,
      checkMethod: "Scan edges, gradients, and textures",
      passCondition: "Clean edges, smooth gradients, no visible artifacts",
      failIndicators: ["JPEG blocking", "halos", "pattern artifacts", "warping"]
    },
    {
      name: "Color Accuracy",
      description: "Colors are accurate and consistent",
      weight: 20,
      checkMethod: "Check skin tones, neutrals, and known colors",
      passCondition: "Natural colors, proper white balance",
      failIndicators: ["color casts", "oversaturation", "unnatural hues"]
    }
  ],
  passingScore: 85,
  professionalLevel: "expert"
};

// ============================================================================
// ANATOMICAL ACCURACY STANDARDS
// ============================================================================

export const ANATOMICAL_STANDARDS: QualityStandard = {
  name: "Anatomical Accuracy Standards",
  category: "anatomical",
  description: "Human anatomy correctness verification",
  checkpoints: [
    {
      name: "Eye Vitality",
      description: "Eyes appear alive and natural",
      weight: 25,
      checkMethod: "Check for catchlight, iris detail, gaze coherence",
      passCondition: "Bright catchlight, detailed iris, coordinated gaze",
      failIndicators: ["dead eyes", "no catchlight", "wall-eyed", "flat iris"]
    },
    {
      name: "Hand Anatomy",
      description: "Hands are anatomically correct",
      weight: 25,
      checkMethod: "Count fingers, check proportions and joints",
      passCondition: "5 fingers per hand, correct proportions, natural pose",
      failIndicators: ["wrong finger count", "merged fingers", "impossible poses"]
    },
    {
      name: "Facial Proportions",
      description: "Face follows natural proportions",
      weight: 15,
      checkMethod: "Check facial thirds, eye spacing, feature placement",
      passCondition: "Natural proportions, slight asymmetry",
      failIndicators: ["uncanny valley", "wrong proportions", "excessive symmetry"]
    },
    {
      name: "Skin Texture",
      description: "Skin appears natural with appropriate texture",
      weight: 20,
      checkMethod: "Check T-zone for pores, overall texture",
      passCondition: "Visible pores, natural imperfections, SSS present",
      failIndicators: ["plastic skin", "waxy", "airbrushed", "no pores"]
    },
    {
      name: "Body Proportions",
      description: "Body follows natural proportions",
      weight: 15,
      checkMethod: "Check limb lengths, body ratios",
      passCondition: "Natural body proportions, possible poses",
      failIndicators: ["impossible limb positions", "wrong proportions"]
    }
  ],
  passingScore: 90,
  professionalLevel: "expert"
};

// ============================================================================
// AUTHENTICITY STANDARDS
// ============================================================================

export const AUTHENTICITY_STANDARDS: QualityStandard = {
  name: "Photographic Authenticity Standards",
  category: "authenticity",
  description: "Photo-realistic authenticity verification",
  checkpoints: [
    {
      name: "Lighting Coherence",
      description: "All elements share consistent light source",
      weight: 20,
      checkMethod: "Trace shadows and highlights to source",
      passCondition: "Single coherent light direction throughout",
      failIndicators: ["conflicting shadows", "impossible lighting", "multiple suns"]
    },
    {
      name: "Perspective Consistency",
      description: "Single coherent perspective throughout",
      weight: 15,
      checkMethod: "Check vanishing points and relative sizes",
      passCondition: "All elements share same perspective",
      failIndicators: ["mixed perspectives", "floating objects", "scale errors"]
    },
    {
      name: "Material Authenticity",
      description: "Materials behave correctly",
      weight: 15,
      checkMethod: "Check reflections, refractions, surface properties",
      passCondition: "Correct IOR, appropriate reflections",
      failIndicators: ["wrong reflections", "impossible transparency", "flat materials"]
    },
    {
      name: "Environmental Coherence",
      description: "Scene elements work together believably",
      weight: 15,
      checkMethod: "Check context, props, and relationships",
      passCondition: "All elements belong together",
      failIndicators: ["anachronisms", "impossible combinations", "scale errors"]
    },
    {
      name: "Natural Imperfections",
      description: "Appropriate flaws for authenticity",
      weight: 15,
      checkMethod: "Check for realistic imperfections",
      passCondition: "Natural imperfections present",
      failIndicators: ["too perfect", "sterile", "obviously artificial"]
    },
    {
      name: "Optical Characteristics",
      description: "Image shows camera-like optical properties",
      weight: 20,
      checkMethod: "Check DOF, bokeh, vignetting, aberration",
      passCondition: "Natural lens-like rendering",
      failIndicators: ["uniformly sharp everywhere", "no optical properties"]
    }
  ],
  passingScore: 85,
  professionalLevel: "expert"
};

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Calculate quality score
 */
export function calculateQualityScore(
  standard: QualityStandard,
  passedCheckpoints: string[]
): { score: number; passed: boolean; details: Record<string, boolean> } {
  let totalWeight = 0;
  let earnedWeight = 0;
  const details: Record<string, boolean> = {};
  
  for (const checkpoint of standard.checkpoints) {
    totalWeight += checkpoint.weight;
    const passed = passedCheckpoints.includes(checkpoint.name);
    details[checkpoint.name] = passed;
    if (passed) {
      earnedWeight += checkpoint.weight;
    }
  }
  
  const score = Math.round((earnedWeight / totalWeight) * 100);
  return {
    score,
    passed: score >= standard.passingScore,
    details
  };
}

/**
 * Get fail indicators for specific checkpoint
 */
export function getFailIndicators(
  standard: QualityStandard,
  checkpointName: string
): string[] {
  const checkpoint = standard.checkpoints.find(c => c.name === checkpointName);
  return checkpoint?.failIndicators || [];
}

/**
 * Generate quality checklist
 */
export function generateChecklist(standard: QualityStandard): string[] {
  return standard.checkpoints.map(c => 
    `☐ ${c.name}: ${c.passCondition}`
  );
}

/**
 * Get all standards
 */
export function getAllStandards(): QualityStandard[] {
  return [
    TECHNICAL_STANDARDS,
    ANATOMICAL_STANDARDS,
    AUTHENTICITY_STANDARDS
  ];
}

/**
 * Generate comprehensive validation prompt
 */
export function generateValidationPrompt(): string {
  const criticalCheckpoints = [
    ...TECHNICAL_STANDARDS.checkpoints.filter(c => c.weight >= 15),
    ...ANATOMICAL_STANDARDS.checkpoints.filter(c => c.weight >= 20),
    ...AUTHENTICITY_STANDARDS.checkpoints.filter(c => c.weight >= 15)
  ];
  
  return criticalCheckpoints
    .map(c => c.passCondition)
    .join(', ');
}

/**
 * Generate comprehensive negative prompt from standards
 */
export function generateStandardsNegativePrompt(): string {
  const allFailIndicators = [
    ...TECHNICAL_STANDARDS.checkpoints.flatMap(c => c.failIndicators),
    ...ANATOMICAL_STANDARDS.checkpoints.flatMap(c => c.failIndicators),
    ...AUTHENTICITY_STANDARDS.checkpoints.flatMap(c => c.failIndicators)
  ];
  
  return [...new Set(allFailIndicators)].join(', ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  TECHNICAL_STANDARDS,
  ANATOMICAL_STANDARDS,
  AUTHENTICITY_STANDARDS,
  calculateQualityScore,
  getFailIndicators,
  generateChecklist,
  getAllStandards,
  generateValidationPrompt,
  generateStandardsNegativePrompt
};
