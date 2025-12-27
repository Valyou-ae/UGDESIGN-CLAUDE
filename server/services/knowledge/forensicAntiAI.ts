/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FORENSIC ANTI-AI DETECTION SYSTEM
 * Hyper-Realism Tier 2, Feature 9 | Impact: +15% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Techniques to make AI-generated images indistinguishable from photographs.
 * Adds authentic photographic markers and eliminates AI tells.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface AntiDetectionTechnique {
  name: string;
  category: TechniqueCategory;
  description: string;
  aiTellItFixes: string;
  implementation: string;
  promptKeywords: string[];
  importance: 'critical' | 'important' | 'helpful';
}

export type TechniqueCategory = 
  | 'human_anatomy' 
  | 'optical' 
  | 'environmental' 
  | 'texture' 
  | 'lighting' 
  | 'artifacts';

export interface AITell {
  name: string;
  description: string;
  whereToCheck: string;
  fix: string;
  negativeKeywords: string[];
}

// ============================================================================
// CRITICAL AI TELLS TO ELIMINATE
// ============================================================================

export const AI_TELLS: Record<string, AITell> = {
  dead_eyes: {
    name: "Dead/Lifeless Eyes",
    description: "Eyes lacking catchlight and life",
    whereToCheck: "Pupils and iris in all portraits",
    fix: "Always include bright catchlight at 10 or 2 o'clock",
    negativeKeywords: ["dead eyes", "lifeless eyes", "no catchlight", "dull eyes"]
  },

  plastic_skin: {
    name: "Plastic/Waxy Skin",
    description: "Skin lacking pores and natural texture",
    whereToCheck: "Nose, cheeks, forehead (T-zone)",
    fix: "Include visible pores, texture, subsurface scattering",
    negativeKeywords: ["plastic skin", "waxy skin", "smooth skin", "airbrushed"]
  },

  wrong_fingers: {
    name: "Incorrect Finger Count",
    description: "4, 6, or malformed fingers",
    whereToCheck: "All visible hands",
    fix: "Explicitly specify 'five fingers per hand'",
    negativeKeywords: ["extra fingers", "missing fingers", "deformed hands", "wrong finger count"]
  },

  perfect_symmetry: {
    name: "Uncanny Symmetry",
    description: "Faces too perfectly symmetrical",
    whereToCheck: "Facial features comparison",
    fix: "Request 'natural facial asymmetry'",
    negativeKeywords: ["perfectly symmetrical", "mirror face"]
  },

  texture_artifacts: {
    name: "Repetitive Textures",
    description: "AI pattern repetition in textures",
    whereToCheck: "Fabric, skin, backgrounds",
    fix: "Request 'organic non-repeating textures'",
    negativeKeywords: ["repetitive pattern", "tiling texture", "pattern artifacts"]
  },

  impossible_lighting: {
    name: "Inconsistent Lighting",
    description: "Multiple conflicting light sources",
    whereToCheck: "Shadow directions, highlight positions",
    fix: "Specify single coherent light source",
    negativeKeywords: ["conflicting shadows", "impossible lighting", "multiple light directions"]
  },

  blurry_text: {
    name: "Distorted Text",
    description: "Text that's almost readable but wrong",
    whereToCheck: "Any text in image",
    fix: "Avoid text or specify 'no visible text'",
    negativeKeywords: ["blurry text", "distorted letters", "unreadable text"]
  },

  edge_artifacts: {
    name: "Edge Blending Issues",
    description: "Unnatural transitions between objects",
    whereToCheck: "Hair edges, object boundaries",
    fix: "Request 'natural edge transitions'",
    negativeKeywords: ["harsh edges", "unnatural transitions", "floating objects"]
  }
};

// ============================================================================
// ANTI-DETECTION TECHNIQUES
// ============================================================================

export const ANTI_DETECTION_TECHNIQUES: Record<string, AntiDetectionTechnique> = {
  authentic_imperfections: {
    name: "Authentic Imperfections",
    category: "texture",
    description: "Add subtle flaws that real photos have",
    aiTellItFixes: "Removes too-perfect AI look",
    implementation: "Include dust, minor scratches, slight noise",
    promptKeywords: [
      "authentic photo imperfections",
      "subtle dust on lens",
      "natural image artifacts",
      "real camera characteristics"
    ],
    importance: "critical"
  },

  lens_characteristics: {
    name: "Real Lens Behavior",
    category: "optical",
    description: "Simulate actual camera lens properties",
    aiTellItFixes: "Removes uniformly sharp AI rendering",
    implementation: "Include vignetting, chromatic aberration, DOF falloff",
    promptKeywords: [
      "natural lens vignetting",
      "authentic depth of field",
      "optical lens characteristics",
      "camera lens rendering"
    ],
    importance: "important"
  },

  skin_authenticity: {
    name: "Authentic Skin Rendering",
    category: "human_anatomy",
    description: "Real skin texture and behavior",
    aiTellItFixes: "Eliminates plastic/waxy skin",
    implementation: "Visible pores, SSS, natural imperfections",
    promptKeywords: [
      "authentic skin texture",
      "visible pores on nose and cheeks",
      "subsurface scattering in skin",
      "natural skin imperfections"
    ],
    importance: "critical"
  },

  eye_life: {
    name: "Living Eye Rendering",
    category: "human_anatomy",
    description: "Eyes that appear alive",
    aiTellItFixes: "Fixes dead/lifeless eyes",
    implementation: "Catchlights, wet surface, iris detail",
    promptKeywords: [
      "bright catchlight in eyes",
      "living engaged eyes",
      "wet glossy eye surface",
      "detailed iris texture"
    ],
    importance: "critical"
  },

  environmental_coherence: {
    name: "Environmental Coherence",
    category: "environmental",
    description: "Consistent, believable environment",
    aiTellItFixes: "Removes disconnected AI compositions",
    implementation: "Consistent lighting, scale, perspective",
    promptKeywords: [
      "coherent environmental context",
      "consistent lighting throughout",
      "realistic spatial relationships",
      "believable scene composition"
    ],
    importance: "important"
  },

  analog_markers: {
    name: "Analog Photo Markers",
    category: "artifacts",
    description: "Subtle signs of real photography",
    aiTellItFixes: "Adds authentic camera signatures",
    implementation: "Film grain, sensor noise, color science",
    promptKeywords: [
      "authentic film grain",
      "camera sensor characteristics",
      "natural color science",
      "photographic rendering"
    ],
    importance: "helpful"
  }
};

// ============================================================================
// COMPREHENSIVE NEGATIVE PROMPTS
// ============================================================================

export const ANTI_AI_NEGATIVE_PROMPTS = {
  human_essential: [
    "dead eyes",
    "lifeless eyes",
    "no catchlight",
    "plastic skin",
    "waxy skin",
    "smooth skin no pores",
    "wrong finger count",
    "extra fingers",
    "missing fingers",
    "deformed hands",
    "uncanny valley",
    "perfect symmetry"
  ],

  texture_essential: [
    "blurry textures",
    "repetitive patterns",
    "tiling artifacts",
    "smooth unrealistic surfaces",
    "digital artifacts",
    "compression artifacts"
  ],

  composition_essential: [
    "conflicting shadows",
    "impossible lighting",
    "floating objects",
    "disconnected elements",
    "wrong scale",
    "perspective errors"
  ],

  style_essential: [
    "cartoon",
    "anime",
    "illustration",
    "render",
    "CGI look",
    "video game",
    "artificial look"
  ]
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get AI tell by name
 */
export function getAITell(name: string): AITell | undefined {
  return AI_TELLS[name];
}

/**
 * Get technique by name
 */
export function getTechnique(name: string): AntiDetectionTechnique | undefined {
  return ANTI_DETECTION_TECHNIQUES[name];
}

/**
 * Generate comprehensive anti-detection prompt
 */
export function generateAntiDetectionPrompt(): string {
  const criticalTechniques = Object.values(ANTI_DETECTION_TECHNIQUES)
    .filter(t => t.importance === 'critical')
    .flatMap(t => t.promptKeywords.slice(0, 2));
  
  return criticalTechniques.join(', ');
}

/**
 * Generate comprehensive negative prompt
 */
export function generateAntiAINegativePrompt(): string {
  return [
    ...ANTI_AI_NEGATIVE_PROMPTS.human_essential,
    ...ANTI_AI_NEGATIVE_PROMPTS.texture_essential,
    ...ANTI_AI_NEGATIVE_PROMPTS.composition_essential,
    ...ANTI_AI_NEGATIVE_PROMPTS.style_essential
  ].join(', ');
}

/**
 * Get negative prompts for specific category
 */
export function getNegativePromptsForCategory(
  category: keyof typeof ANTI_AI_NEGATIVE_PROMPTS
): string[] {
  return ANTI_AI_NEGATIVE_PROMPTS[category];
}

/**
 * Check portrait for common AI tells
 */
export function getPortraitCheckList(): { item: string; fix: string }[] {
  return [
    { item: "Eyes have catchlight?", fix: "Add 'bright catchlight in eyes'" },
    { item: "Skin has visible pores?", fix: "Add 'natural skin texture with visible pores'" },
    { item: "Hands have 5 fingers?", fix: "Add 'anatomically correct hands with five fingers'" },
    { item: "Face has slight asymmetry?", fix: "Add 'natural facial asymmetry'" },
    { item: "Lighting is consistent?", fix: "Add 'coherent lighting direction'" },
    { item: "Shadows match light source?", fix: "Add 'consistent shadow direction'" }
  ];
}

/**
 * Generate authenticity enhancement prompt
 */
export function generateAuthenticityPrompt(): string {
  return [
    "photorealistic photograph",
    "authentic camera characteristics",
    "natural imperfections",
    "real photography aesthetics",
    "professional photo quality"
  ].join(', ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  AI_TELLS,
  ANTI_DETECTION_TECHNIQUES,
  ANTI_AI_NEGATIVE_PROMPTS,
  getAITell,
  getTechnique,
  generateAntiDetectionPrompt,
  generateAntiAINegativePrompt,
  getNegativePromptsForCategory,
  getPortraitCheckList,
  generateAuthenticityPrompt
};
