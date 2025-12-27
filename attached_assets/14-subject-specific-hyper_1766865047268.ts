/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SUBJECT-SPECIFIC HYPER-REALISM
 * Hyper-Realism Tier 3, Feature 14 | Impact: +15-20% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Specialized hyper-realism techniques for specific subject categories
 * with expert-level optimizations.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface SubjectHyperProfile {
  name: string;
  category: SubjectCategory;
  description: string;
  
  criticalElements: CriticalElement[];
  technicalSpecs: TechnicalSpec;
  commonMistakes: string[];
  expertTips: string[];
  
  promptTemplate: string;
  negativeKeywords: string[];
}

export type SubjectCategory = 
  | 'portrait' 
  | 'product' 
  | 'food' 
  | 'automotive' 
  | 'architecture' 
  | 'wildlife';

export interface CriticalElement {
  name: string;
  importance: 'essential' | 'important' | 'enhancing';
  specification: string;
  promptKeywords: string[];
}

export interface TechnicalSpec {
  idealLens: string;
  aperture: string;
  lighting: string;
  resolution: string;
}

// ============================================================================
// PORTRAIT HYPER-REALISM
// ============================================================================

export const PORTRAIT_HYPER: SubjectHyperProfile = {
  name: "Portrait Hyper-Realism",
  category: "portrait",
  description: "Maximum realism for human subjects",
  
  criticalElements: [
    {
      name: "Eye Life",
      importance: "essential",
      specification: "Bright catchlight, detailed iris, wet surface",
      promptKeywords: ["living eyes with catchlight", "detailed iris texture", "moist eye surface"]
    },
    {
      name: "Skin Authenticity",
      importance: "essential",
      specification: "Visible pores, SSS, natural imperfections",
      promptKeywords: ["authentic skin texture", "visible pores", "subsurface scattering"]
    },
    {
      name: "Hair Detail",
      importance: "important",
      specification: "Individual strands, natural movement",
      promptKeywords: ["individual hair strands", "natural hair movement", "strand-level detail"]
    },
    {
      name: "Natural Expression",
      importance: "important",
      specification: "Genuine emotion, asymmetrical features",
      promptKeywords: ["genuine expression", "natural facial asymmetry", "authentic emotion"]
    }
  ],
  
  technicalSpecs: {
    idealLens: "85mm f/1.4 or 135mm f/1.8",
    aperture: "f/1.4 - f/2.8 for subject isolation",
    lighting: "Soft directional, Rembrandt or butterfly",
    resolution: "Minimum 4000x6000 for print"
  },
  
  commonMistakes: [
    "Dead eyes without catchlight",
    "Plastic skin texture",
    "Perfect symmetry (uncanny valley)",
    "Wrong finger count on hands"
  ],
  
  expertTips: [
    "Always specify catchlight position",
    "Include skin imperfections for realism",
    "Add subtle expression asymmetry",
    "Specify lens for authentic bokeh"
  ],
  
  promptTemplate: "Professional portrait, {subject}, bright catchlight in eyes at 2 o'clock, natural skin texture with visible pores, subsurface scattering, natural facial asymmetry, shot on 85mm f/1.4, soft directional lighting, shallow depth of field",
  
  negativeKeywords: ["dead eyes", "plastic skin", "perfect symmetry", "wrong fingers", "waxy", "airbrushed"]
};

// ============================================================================
// PRODUCT HYPER-REALISM
// ============================================================================

export const PRODUCT_HYPER: SubjectHyperProfile = {
  name: "Product Hyper-Realism",
  category: "product",
  description: "Commercial-grade product visualization",
  
  criticalElements: [
    {
      name: "Material Accuracy",
      importance: "essential",
      specification: "Correct IOR, reflections, surface properties",
      promptKeywords: ["accurate material properties", "correct surface reflections", "authentic material rendering"]
    },
    {
      name: "Surface Detail",
      importance: "essential",
      specification: "Micro-texture, logos sharp, no artifacts",
      promptKeywords: ["sharp surface detail", "crisp logo rendering", "micro-texture visible"]
    },
    {
      name: "Lighting Quality",
      importance: "essential",
      specification: "Professional studio lighting, gradient transitions",
      promptKeywords: ["professional studio lighting", "smooth gradient reflections", "controlled highlights"]
    },
    {
      name: "Color Accuracy",
      importance: "important",
      specification: "True-to-life colors, no cast",
      promptKeywords: ["accurate product colors", "neutral color rendering", "true-to-life hues"]
    }
  ],
  
  technicalSpecs: {
    idealLens: "100mm macro or 70-200mm",
    aperture: "f/8 - f/16 for full sharpness",
    lighting: "Multi-light studio setup with softboxes",
    resolution: "8000x8000+ for e-commerce zoom"
  },
  
  commonMistakes: [
    "Incorrect material reflections",
    "Blurry text or logos",
    "Unrealistic color saturation",
    "Missing surface detail"
  ],
  
  expertTips: [
    "Specify exact material type",
    "Request sharp text rendering",
    "Include subtle imperfections for realism",
    "Describe lighting setup explicitly"
  ],
  
  promptTemplate: "Commercial product photography, {product}, professional studio lighting with softboxes, accurate material rendering, sharp detail throughout, neutral color accurate, high resolution commercial quality",
  
  negativeKeywords: ["blurry text", "wrong reflections", "oversaturated", "unrealistic materials", "cheap looking"]
};

// ============================================================================
// FOOD HYPER-REALISM
// ============================================================================

export const FOOD_HYPER: SubjectHyperProfile = {
  name: "Food Hyper-Realism",
  category: "food",
  description: "Appetizing food photography",
  
  criticalElements: [
    {
      name: "Freshness Cues",
      importance: "essential",
      specification: "Steam, condensation, glistening surfaces",
      promptKeywords: ["fresh glistening food", "steam rising", "dewy fresh appearance"]
    },
    {
      name: "Color Vibrancy",
      importance: "essential",
      specification: "Appetizing natural colors, not oversaturated",
      promptKeywords: ["appetizing natural colors", "vibrant but realistic", "food photography colors"]
    },
    {
      name: "Texture Detail",
      importance: "essential",
      specification: "Visible texture, crisp edges, melting effects",
      promptKeywords: ["visible food texture", "crisp edges", "detailed surface"]
    },
    {
      name: "Hero Lighting",
      importance: "important",
      specification: "Backlight for steam, side light for texture",
      promptKeywords: ["food photography lighting", "backlit steam", "texture-revealing light"]
    }
  ],
  
  technicalSpecs: {
    idealLens: "100mm macro or 50mm",
    aperture: "f/2.8 - f/5.6 for selective focus",
    lighting: "Backlight with fill, side light for texture",
    resolution: "4000x6000 minimum"
  },
  
  commonMistakes: [
    "Food looks cold/stale",
    "Colors too saturated or unnatural",
    "Missing freshness indicators",
    "Flat unappetizing lighting"
  ],
  
  expertTips: [
    "Always include freshness cues",
    "Use backlight for transparent/steam elements",
    "Selective focus on hero element",
    "Props should complement not compete"
  ],
  
  promptTemplate: "Professional food photography, {dish}, glistening fresh appearance, steam rising, appetizing natural colors, backlit with texture-revealing side light, shallow depth of field, macro detail",
  
  negativeKeywords: ["stale food", "unappetizing", "cold looking", "flat lighting", "oversaturated"]
};

// ============================================================================
// AUTOMOTIVE HYPER-REALISM
// ============================================================================

export const AUTOMOTIVE_HYPER: SubjectHyperProfile = {
  name: "Automotive Hyper-Realism",
  category: "automotive",
  description: "Showroom-quality vehicle photography",
  
  criticalElements: [
    {
      name: "Paint Reflection",
      importance: "essential",
      specification: "Accurate environment reflections, paint depth",
      promptKeywords: ["perfect paint reflections", "automotive paint depth", "environment reflected in bodywork"]
    },
    {
      name: "Surface Quality",
      importance: "essential",
      specification: "Flawless or artistic, consistent",
      promptKeywords: ["flawless automotive finish", "showroom quality", "perfect bodywork"]
    },
    {
      name: "Lighting Design",
      importance: "essential",
      specification: "Gradient strips, controlled highlights",
      promptKeywords: ["automotive studio lighting", "gradient light strips", "sculpted car lighting"]
    },
    {
      name: "Detail Rendering",
      importance: "important",
      specification: "Badges, trim, wheels sharp",
      promptKeywords: ["sharp badge detail", "crisp trim rendering", "detailed wheel spokes"]
    }
  ],
  
  technicalSpecs: {
    idealLens: "35-85mm for full car, longer for details",
    aperture: "f/8 - f/11 for sharpness throughout",
    lighting: "Large softboxes, light painting",
    resolution: "8000x6000+ for commercial use"
  },
  
  commonMistakes: [
    "Unrealistic reflections",
    "Flat, uninteresting lighting",
    "Poor paint depth rendering",
    "Visible artifacts on curves"
  ],
  
  expertTips: [
    "Specify reflection environment",
    "Include gradient strip lighting description",
    "Request paint depth and metallic particles",
    "Describe studio vs location context"
  ],
  
  promptTemplate: "Automotive photography, {vehicle}, showroom studio lighting with gradient strips, perfect paint reflections showing environment, metallic paint depth visible, sharp detail throughout, commercial quality",
  
  negativeKeywords: ["flat paint", "no reflections", "cheap lighting", "dull finish", "artifacts on curves"]
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get subject hyper-realism profile
 */
export function getSubjectProfile(category: SubjectCategory): SubjectHyperProfile | undefined {
  const profiles: Record<SubjectCategory, SubjectHyperProfile> = {
    portrait: PORTRAIT_HYPER,
    product: PRODUCT_HYPER,
    food: FOOD_HYPER,
    automotive: AUTOMOTIVE_HYPER,
    architecture: PORTRAIT_HYPER, // Placeholder
    wildlife: PORTRAIT_HYPER // Placeholder
  };
  return profiles[category];
}

/**
 * Generate subject-specific prompt
 */
export function generateSubjectPrompt(
  profile: SubjectHyperProfile,
  subject: string
): string {
  return profile.promptTemplate.replace('{subject}', subject)
    .replace('{product}', subject)
    .replace('{dish}', subject)
    .replace('{vehicle}', subject);
}

/**
 * Get critical elements as prompt
 */
export function getCriticalElementsPrompt(profile: SubjectHyperProfile): string {
  return profile.criticalElements
    .filter(el => el.importance === 'essential')
    .flatMap(el => el.promptKeywords.slice(0, 1))
    .join(', ');
}

/**
 * Get negative prompt for subject
 */
export function getSubjectNegativePrompt(profile: SubjectHyperProfile): string {
  return profile.negativeKeywords.join(', ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  PORTRAIT_HYPER,
  PRODUCT_HYPER,
  FOOD_HYPER,
  AUTOMOTIVE_HYPER,
  getSubjectProfile,
  generateSubjectPrompt,
  getCriticalElementsPrompt,
  getSubjectNegativePrompt
};
