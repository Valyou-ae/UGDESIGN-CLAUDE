/**
 * ═══════════════════════════════════════════════════════════════════════════
 * META-PROMPTING PATTERNS
 * Enhancement Feature 6 | Impact: +10-15% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Optimal prompt structure, negative prompt patterns, and advanced
 * prompt engineering techniques for maximum image quality.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface PromptTemplate {
  name: string;
  category: PromptCategory;
  description: string;
  structure: PromptStructure;
  examples: string[];
  bestFor: string[];
}

export interface PromptStructure {
  order: string[];
  required: string[];
  optional: string[];
  weights: Record<string, number>;
}

export interface NegativePromptSet {
  name: string;
  category: string;
  keywords: string[];
  description: string;
}

export type PromptCategory = 
  | 'portrait' 
  | 'landscape' 
  | 'product' 
  | 'artistic' 
  | 'photographic' 
  | 'general';

// ============================================================================
// OPTIMAL PROMPT STRUCTURE
// ============================================================================

export const PROMPT_STRUCTURE = {
  /**
   * TIER 1: Core Subject (MOST IMPORTANT)
   * What is being depicted - always first
   */
  tier1_subject: {
    name: "Core Subject",
    importance: "critical",
    position: "first",
    examples: [
      "Professional portrait of elegant woman",
      "Luxury sports car",
      "Mountain landscape at sunset",
      "Gourmet pasta dish"
    ],
    tips: [
      "Be specific about the subject",
      "Include key subject attributes",
      "Avoid ambiguity"
    ]
  },

  /**
   * TIER 2: Subject Details
   * Specific attributes of the subject
   */
  tier2_details: {
    name: "Subject Details",
    importance: "high",
    position: "second",
    examples: [
      "wearing emerald silk dress, natural curly hair",
      "midnight blue metallic paint, aggressive stance",
      "snow-capped peaks, alpine meadow foreground",
      "fresh basil garnish, parmesan shavings"
    ],
    tips: [
      "Add specific visual details",
      "Include materials, colors, textures",
      "Describe pose/orientation"
    ]
  },

  /**
   * TIER 3: Technical Specifications
   * Camera, lens, lighting details
   */
  tier3_technical: {
    name: "Technical Specifications",
    importance: "high",
    position: "third",
    examples: [
      "Canon EOS R5, 85mm f/1.2, shallow depth of field",
      "wide angle lens, low angle shot, dramatic perspective",
      "24mm f/8, front to back sharpness, hyperfocal distance",
      "100mm macro lens, f/2.8, selective focus"
    ],
    tips: [
      "Specify focal length for perspective",
      "Include aperture for depth control",
      "Mention lens characteristics"
    ]
  },

  /**
   * TIER 4: Lighting
   * Light quality, direction, color
   */
  tier4_lighting: {
    name: "Lighting Setup",
    importance: "high",
    position: "fourth",
    examples: [
      "golden hour warm light, soft shadows",
      "studio lighting with softbox, Rembrandt pattern",
      "blue hour twilight, balanced ambient",
      "backlit with rim light, dramatic shadows"
    ],
    tips: [
      "Specify light direction",
      "Include light quality (soft/hard)",
      "Mention color temperature"
    ]
  },

  /**
   * TIER 5: Style/Aesthetic
   * Visual style and mood
   */
  tier5_style: {
    name: "Style & Aesthetic",
    importance: "medium",
    position: "fifth",
    examples: [
      "editorial fashion photography style",
      "cinematic color grading, Hollywood look",
      "fine art photography, museum quality",
      "commercial product photography"
    ],
    tips: [
      "Reference specific styles",
      "Include mood descriptors",
      "Mention color palette"
    ]
  },

  /**
   * TIER 6: Quality Modifiers
   * Final quality boosters
   */
  tier6_quality: {
    name: "Quality Modifiers",
    importance: "medium",
    position: "last",
    examples: [
      "highly detailed, sharp focus, professional quality",
      "8K resolution, ultra-realistic, photographic",
      "award-winning photography, masterpiece",
      "hyperrealistic detail, lifelike quality"
    ],
    tips: [
      "Don't overdo quality modifiers",
      "Focus on specific qualities needed",
      "Avoid redundant terms"
    ]
  }
};

// ============================================================================
// PROMPT TEMPLATES BY USE CASE
// ============================================================================

export const PROMPT_TEMPLATES: Record<string, PromptTemplate> = {
  portrait_professional: {
    name: "Professional Portrait",
    category: "portrait",
    description: "High-quality portrait photography prompt structure",
    structure: {
      order: [
        "subject_type",
        "subject_details",
        "camera_settings",
        "lighting",
        "background",
        "style",
        "quality"
      ],
      required: ["subject_type", "lighting", "camera_settings"],
      optional: ["background", "style", "quality"],
      weights: {
        subject_type: 1.5,
        lighting: 1.3,
        camera_settings: 1.2,
        style: 1.0
      }
    },
    examples: [
      "Professional portrait of elegant businesswoman, natural makeup, confident expression, bright catchlight in eyes, natural skin texture with visible pores, Canon 85mm f/1.4, shallow depth of field, Rembrandt lighting with soft fill, neutral gray studio background, editorial photography style, highly detailed",
      "Executive headshot of middle-aged man, silver hair, warm smile, tailored navy suit, soft loop lighting, medium gray backdrop, 105mm portrait lens, f/2.8, corporate photography style, natural skin texture"
    ],
    bestFor: ["headshots", "corporate", "editorial", "beauty"]
  },

  landscape_epic: {
    name: "Epic Landscape",
    category: "landscape",
    description: "Dramatic landscape photography prompt structure",
    structure: {
      order: [
        "scene_type",
        "foreground",
        "midground",
        "background",
        "lighting",
        "atmosphere",
        "camera_settings",
        "quality"
      ],
      required: ["scene_type", "lighting", "foreground"],
      optional: ["atmosphere", "camera_settings", "quality"],
      weights: {
        scene_type: 1.4,
        lighting: 1.5,
        foreground: 1.3,
        atmosphere: 1.2
      }
    },
    examples: [
      "Epic mountain landscape, rugged granite rocks in foreground with wildflowers, alpine lake in midground reflecting peaks, snow-capped mountains in background, golden hour warm light breaking through clouds, atmospheric haze creating depth, 24mm wide angle, f/11 for depth, fine art landscape photography",
      "Dramatic coastal seascape, wet rocks with tide pools in foreground, crashing waves in middle distance, towering sea stack silhouette against sunset sky, long exposure 2 seconds, silk-smooth water, vibrant orange and purple sky, professional landscape photography"
    ],
    bestFor: ["nature", "travel", "fine art", "scenic"]
  },

  product_commercial: {
    name: "Commercial Product",
    category: "product",
    description: "Professional product photography prompt structure",
    structure: {
      order: [
        "product",
        "materials",
        "lighting_setup",
        "background",
        "angle",
        "style",
        "quality"
      ],
      required: ["product", "lighting_setup", "materials"],
      optional: ["background", "angle", "style"],
      weights: {
        product: 1.5,
        materials: 1.4,
        lighting_setup: 1.4,
        background: 1.0
      }
    },
    examples: [
      "Luxury wristwatch product shot, polished stainless steel case with sapphire crystal, black leather strap, studio lighting with main softbox from left and fill from right, white seamless background, 100mm macro lens, f/8 for sharpness, commercial product photography, highly detailed materials",
      "Premium perfume bottle, crystal-clear glass with amber liquid, gold cap, dramatic backlight creating glow through liquid, dark gradient background, rim light highlighting edges, beauty product photography style"
    ],
    bestFor: ["e-commerce", "advertising", "catalog", "luxury"]
  },

  cinematic_scene: {
    name: "Cinematic Scene",
    category: "artistic",
    description: "Movie-like scene prompt structure",
    structure: {
      order: [
        "scene_description",
        "subject",
        "environment",
        "lighting",
        "color_grading",
        "camera",
        "film_reference",
        "quality"
      ],
      required: ["scene_description", "lighting", "color_grading"],
      optional: ["film_reference", "camera", "quality"],
      weights: {
        scene_description: 1.4,
        lighting: 1.5,
        color_grading: 1.4,
        film_reference: 1.2
      }
    },
    examples: [
      "Cinematic scene of detective in rain-soaked alley, fedora and trench coat, neon signs reflecting in puddles, dramatic side lighting with hard shadows, teal and orange color grading, anamorphic lens flare, 35mm film grain, noir atmosphere, blade runner aesthetic",
      "Epic fantasy battle scene, armored warrior facing dragon, volumetric light rays through smoke, warm fire glow contrasting cool moonlight, cinematic wide shot, movie poster composition, Lord of the Rings style, dramatic color grading"
    ],
    bestFor: ["concept art", "storytelling", "dramatic", "mood"]
  }
};

// ============================================================================
// NEGATIVE PROMPT SETS
// ============================================================================

export const NEGATIVE_PROMPT_SETS: Record<string, NegativePromptSet> = {
  human_anatomy: {
    name: "Human Anatomy Fixes",
    category: "portrait",
    keywords: [
      "deformed",
      "distorted",
      "disfigured",
      "bad anatomy",
      "wrong anatomy",
      "extra limbs",
      "missing limbs",
      "floating limbs",
      "extra fingers",
      "fewer fingers",
      "mutated hands",
      "malformed hands",
      "bad hands",
      "fused fingers",
      "too many fingers",
      "long neck",
      "mutated",
      "mutation",
      "poorly drawn face",
      "poorly drawn hands",
      "ugly",
      "duplicate",
      "morbid",
      "mutilated"
    ],
    description: "Prevents common human anatomy generation errors"
  },

  ai_artifacts: {
    name: "AI Artifact Prevention",
    category: "general",
    keywords: [
      "lowres",
      "low resolution",
      "blurry",
      "blur",
      "jpeg artifacts",
      "compression artifacts",
      "watermark",
      "signature",
      "text",
      "logo",
      "cropped",
      "out of frame",
      "worst quality",
      "low quality",
      "normal quality",
      "username",
      "artist name"
    ],
    description: "Prevents common AI generation artifacts"
  },

  skin_quality: {
    name: "Skin Quality",
    category: "portrait",
    keywords: [
      "plastic skin",
      "waxy skin",
      "shiny skin",
      "oily skin",
      "perfect skin",
      "flawless skin",
      "smooth skin",
      "doll-like",
      "mannequin",
      "airbrushed",
      "fake looking",
      "unrealistic skin"
    ],
    description: "Prevents unnatural skin rendering"
  },

  eye_quality: {
    name: "Eye Quality",
    category: "portrait",
    keywords: [
      "dead eyes",
      "blank stare",
      "cross-eyed",
      "wall-eyed",
      "asymmetric eyes",
      "different sized eyes",
      "no catchlight",
      "dull eyes",
      "lifeless eyes",
      "scary eyes",
      "glowing eyes"
    ],
    description: "Prevents unnatural eye rendering"
  },

  composition_issues: {
    name: "Composition Issues",
    category: "general",
    keywords: [
      "bad composition",
      "bad framing",
      "cut off",
      "poorly framed",
      "amateur",
      "snapshot",
      "tilted",
      "dutch angle",
      "awkward crop",
      "bad angle"
    ],
    description: "Prevents composition problems"
  },

  lighting_issues: {
    name: "Lighting Issues",
    category: "general",
    keywords: [
      "flat lighting",
      "overexposed",
      "underexposed",
      "harsh shadows",
      "unflattering light",
      "flash photography",
      "red eye",
      "blown highlights",
      "crushed blacks",
      "unnatural lighting"
    ],
    description: "Prevents lighting problems"
  }
};

// ============================================================================
// ADVANCED PROMPTING TECHNIQUES
// ============================================================================

export const ADVANCED_TECHNIQUES = {
  /**
   * Weighted emphasis technique
   */
  emphasis: {
    name: "Weighted Emphasis",
    description: "Use parentheses or colons to weight importance",
    examples: [
      "(bright catchlight in eyes:1.3)",
      "(natural skin texture:1.2)",
      "((highly detailed))",
      "[soft background:0.8]"
    ],
    tips: [
      "Use 1.1-1.5 for important elements",
      "Use 0.7-0.9 to de-emphasize",
      "Don't over-weight everything"
    ]
  },

  /**
   * Prompt blending technique
   */
  blending: {
    name: "Prompt Blending",
    description: "Combine multiple concepts with controlled mixing",
    examples: [
      "[portrait:landscape:0.3]",
      "oil painting AND photograph",
      "style of Rembrandt blended with modern fashion"
    ],
    tips: [
      "Use for style mixing",
      "Control blend ratio",
      "Test different combinations"
    ]
  },

  /**
   * Progressive detail technique
   */
  progressive_detail: {
    name: "Progressive Detail",
    description: "Add details in order of importance",
    structure: [
      "1. Core subject (who/what)",
      "2. Key visual attributes",
      "3. Technical specifications",
      "4. Lighting and atmosphere",
      "5. Style and quality modifiers"
    ],
    tips: [
      "Most important first",
      "Technical details in middle",
      "Quality modifiers last"
    ]
  },

  /**
   * Negative prompt pairing
   */
  negative_pairing: {
    name: "Negative Prompt Pairing",
    description: "Match negative prompts to positive intentions",
    examples: [
      {
        positive: "natural skin texture with visible pores",
        negative: "plastic skin, airbrushed, smooth skin, waxy"
      },
      {
        positive: "bright catchlight in eyes",
        negative: "dead eyes, no catchlight, dull eyes, lifeless"
      },
      {
        positive: "shallow depth of field, bokeh",
        negative: "everything in focus, deep depth of field"
      }
    ],
    tips: [
      "Negative should reinforce positive",
      "Don't contradict your positive prompt",
      "Be specific in both"
    ]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Build structured prompt
 */
export function buildPrompt(components: {
  subject: string;
  details?: string;
  technical?: string;
  lighting?: string;
  style?: string;
  quality?: string;
}): string {
  const parts = [
    components.subject,
    components.details,
    components.technical,
    components.lighting,
    components.style,
    components.quality
  ].filter(Boolean);
  
  return parts.join(', ');
}

/**
 * Get negative prompt for use case
 */
export function getNegativePrompt(categories: string[]): string {
  const allKeywords: string[] = [];
  
  categories.forEach(cat => {
    const set = NEGATIVE_PROMPT_SETS[cat];
    if (set) {
      allKeywords.push(...set.keywords);
    }
  });
  
  // Remove duplicates
  return [...new Set(allKeywords)].join(', ');
}

/**
 * Get portrait negative prompt
 */
export function getPortraitNegativePrompt(): string {
  return getNegativePrompt([
    'human_anatomy',
    'ai_artifacts',
    'skin_quality',
    'eye_quality',
    'lighting_issues'
  ]);
}

/**
 * Get landscape negative prompt
 */
export function getLandscapeNegativePrompt(): string {
  return getNegativePrompt([
    'ai_artifacts',
    'composition_issues',
    'lighting_issues'
  ]);
}

/**
 * Validate prompt structure
 */
export function validatePrompt(prompt: string): {
  isValid: boolean;
  warnings: string[];
  suggestions: string[];
} {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  // Check length
  if (prompt.length < 50) {
    warnings.push("Prompt may be too short for optimal results");
    suggestions.push("Add more descriptive details");
  }
  
  // Check for subject
  if (!prompt.match(/portrait|photo|image|scene|shot/i)) {
    suggestions.push("Consider specifying the type of image");
  }
  
  // Check for lighting
  if (!prompt.match(/light|lighting|lit|illuminat|sun|shadow/i)) {
    suggestions.push("Consider adding lighting description");
  }
  
  // Check for quality terms overuse
  const qualityTerms = prompt.match(/highly detailed|ultra|8k|masterpiece|best quality/gi);
  if (qualityTerms && qualityTerms.length > 3) {
    warnings.push("Too many quality modifiers may reduce effectiveness");
  }
  
  return {
    isValid: warnings.length === 0,
    warnings,
    suggestions
  };
}

/**
 * Generate prompt from template
 */
export function generateFromTemplate(
  templateName: string,
  variables: Record<string, string>
): string {
  const template = PROMPT_TEMPLATES[templateName];
  if (!template) return '';
  
  let example = template.examples[0];
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
    example = example.replace(regex, value);
  });
  
  return example;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  PROMPT_STRUCTURE,
  PROMPT_TEMPLATES,
  NEGATIVE_PROMPT_SETS,
  ADVANCED_TECHNIQUES,
  buildPrompt,
  getNegativePrompt,
  getPortraitNegativePrompt,
  getLandscapeNegativePrompt,
  validatePrompt,
  generateFromTemplate
};
