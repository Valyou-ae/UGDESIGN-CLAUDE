/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SKIN RENDERING MASTERY
 * Hyper-Realism Tier 2, Feature 10 | Impact: +20% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Advanced skin rendering techniques for beauty, fashion, and portrait
 * photography. Extends basic skin materials with specialized applications.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface SkinProfile {
  name: string;
  ethnicity: string;
  undertone: 'cool' | 'warm' | 'neutral';
  
  baseCharacteristics: {
    colorRange: string;
    pigmentation: string;
    translucency: string;
  };
  
  textureDetails: {
    poreSize: string;
    poreDistribution: string;
    fineLinesPattern: string;
    surfaceOil: string;
  };
  
  subsurfaceScattering: {
    depth: string;
    color: string;
    intensity: string;
    visibleAreas: string[];
  };
  
  agingCharacteristics: {
    youngAdult: string;
    middleAge: string;
    mature: string;
  };
  
  promptKeywords: string[];
  lightingConsiderations: string[];
}

export interface BeautyTechnique {
  name: string;
  description: string;
  effect: string;
  promptKeywords: string[];
  avoidWith: string[];
}

export interface SkinCondition {
  name: string;
  description: string;
  visualCharacteristics: string;
  promptKeywords: string[];
}

// ============================================================================
// SKIN PROFILES BY ETHNICITY
// ============================================================================

export const SKIN_PROFILES: Record<string, SkinProfile> = {
  east_asian: {
    name: "East Asian Skin",
    ethnicity: "East Asian",
    undertone: "warm",
    baseCharacteristics: {
      colorRange: "Light to medium with golden/yellow undertones",
      pigmentation: "Even distribution, occasional hyperpigmentation",
      translucency: "Moderate to high"
    },
    textureDetails: {
      poreSize: "Fine to medium",
      poreDistribution: "T-zone concentration",
      fineLinesPattern: "Typically fewer early wrinkles",
      surfaceOil: "Variable, often combination skin"
    },
    subsurfaceScattering: {
      depth: "1-1.5mm",
      color: "Warm golden-pink",
      intensity: "High in thin areas",
      visibleAreas: ["ears", "fingertips", "nose bridge"]
    },
    agingCharacteristics: {
      youngAdult: "Smooth, even tone",
      middleAge: "Minimal lines, potential pigmentation",
      mature: "Graceful aging, fewer deep wrinkles"
    },
    promptKeywords: [
      "East Asian skin tone",
      "golden warm undertones",
      "luminous skin quality",
      "fine skin texture",
      "natural healthy glow"
    ],
    lightingConsiderations: [
      "Avoid overly warm light that emphasizes yellow",
      "Soft diffused light flattering",
      "Watch for shine in T-zone"
    ]
  },

  south_asian: {
    name: "South Asian Skin",
    ethnicity: "South Asian",
    undertone: "warm",
    baseCharacteristics: {
      colorRange: "Light to deep brown with warm undertones",
      pigmentation: "Variable, potential for uneven tone",
      translucency: "Lower in deeper tones"
    },
    textureDetails: {
      poreSize: "Medium",
      poreDistribution: "Even across face",
      fineLinesPattern: "Varies with skin type",
      surfaceOil: "Often oilier skin type"
    },
    subsurfaceScattering: {
      depth: "0.5-1.5mm depending on depth",
      color: "Warm amber-red",
      intensity: "Variable based on skin depth",
      visibleAreas: ["lips", "ears when backlit"]
    },
    agingCharacteristics: {
      youngAdult: "Rich, warm tones",
      middleAge: "Potential hyperpigmentation",
      mature: "Generally ages well"
    },
    promptKeywords: [
      "South Asian skin tone",
      "rich warm brown undertones",
      "natural skin texture",
      "warm amber skin",
      "beautiful brown complexion"
    ],
    lightingConsiderations: [
      "Requires adequate lighting for detail",
      "Watch exposure carefully",
      "Golden hour very flattering"
    ]
  },

  african: {
    name: "African/Dark Skin",
    ethnicity: "African/Caribbean",
    undertone: "neutral",
    baseCharacteristics: {
      colorRange: "Medium to very deep brown",
      pigmentation: "Rich melanin content",
      translucency: "Lower, beautiful specular highlights"
    },
    textureDetails: {
      poreSize: "Variable",
      poreDistribution: "Even",
      fineLinesPattern: "Often fewer visible early wrinkles",
      surfaceOil: "Natural oils create beautiful highlights"
    },
    subsurfaceScattering: {
      depth: "0.3-0.5mm",
      color: "Deep burgundy-brown",
      intensity: "Subtle but present",
      visibleAreas: ["thin skin areas when strongly backlit"]
    },
    agingCharacteristics: {
      youngAdult: "Beautiful even tone",
      middleAge: "Minimal visible aging",
      mature: "Ages beautifully"
    },
    promptKeywords: [
      "deep dark skin with specular highlights",
      "rich melanin skin tones",
      "beautiful dark complexion",
      "natural skin oils creating highlights",
      "warm burgundy undertones"
    ],
    lightingConsiderations: [
      "Proper exposure critical - don't underexpose",
      "Highlight specular for dimension",
      "Multiple light sources help show form"
    ]
  },

  caucasian: {
    name: "Caucasian Skin",
    ethnicity: "European/Caucasian",
    undertone: "cool",
    baseCharacteristics: {
      colorRange: "Very fair to medium",
      pigmentation: "Variable, freckles common",
      translucency: "High, especially in fair skin"
    },
    textureDetails: {
      poreSize: "Fine to medium",
      poreDistribution: "T-zone concentration",
      fineLinesPattern: "Earlier visible aging",
      surfaceOil: "Variable by type"
    },
    subsurfaceScattering: {
      depth: "1-2mm",
      color: "Pink-red-orange",
      intensity: "Very high in fair skin",
      visibleAreas: ["ears", "fingers", "nose", "lips"]
    },
    agingCharacteristics: {
      youngAdult: "Clear, translucent quality",
      middleAge: "Fine lines begin, sun damage may show",
      mature: "More visible aging signs"
    },
    promptKeywords: [
      "fair Caucasian skin",
      "strong subsurface scattering",
      "translucent skin quality",
      "visible veins and undertones",
      "natural skin redness variation"
    ],
    lightingConsiderations: [
      "Easy to overexpose fair skin",
      "Watch for excessive redness",
      "SSS very visible in backlight"
    ]
  }
};

// ============================================================================
// BEAUTY TECHNIQUES
// ============================================================================

export const BEAUTY_TECHNIQUES: Record<string, BeautyTechnique> = {
  natural_beauty: {
    name: "Natural Beauty",
    description: "Skin looks naturally beautiful with minimal intervention",
    effect: "Healthy, glowing, real skin",
    promptKeywords: [
      "natural beauty skin",
      "healthy glowing complexion",
      "real skin texture",
      "minimal retouching look"
    ],
    avoidWith: ["heavy makeup", "airbrushed"]
  },

  editorial_beauty: {
    name: "Editorial Beauty",
    description: "High fashion beauty with perfect skin",
    effect: "Polished but still textured",
    promptKeywords: [
      "editorial beauty skin",
      "polished complexion",
      "high fashion skin quality",
      "refined but textured"
    ],
    avoidWith: ["over-smoothed", "plastic skin"]
  },

  dewy_skin: {
    name: "Dewy/Glass Skin",
    description: "Luminous, hydrated appearance",
    effect: "Reflective, healthy, moisturized look",
    promptKeywords: [
      "dewy luminous skin",
      "glass skin effect",
      "hydrated glowing complexion",
      "lit from within glow"
    ],
    avoidWith: ["matte", "dry skin"]
  },

  matte_beauty: {
    name: "Matte Beauty",
    description: "Shine-free refined appearance",
    effect: "Velvet, non-reflective finish",
    promptKeywords: [
      "matte beauty finish",
      "velvet skin texture",
      "shine-free complexion",
      "soft matte skin"
    ],
    avoidWith: ["oily", "shiny", "wet look"]
  }
};

// ============================================================================
// SKIN CONDITIONS FOR AUTHENTICITY
// ============================================================================

export const SKIN_CONDITIONS: Record<string, SkinCondition> = {
  healthy: {
    name: "Healthy Skin",
    description: "Normal, well-balanced skin",
    visualCharacteristics: "Even tone, slight natural flush, good hydration",
    promptKeywords: ["healthy balanced skin", "natural skin condition", "good skin quality"]
  },

  sun_kissed: {
    name: "Sun-Kissed",
    description: "Light tan with warmth",
    visualCharacteristics: "Golden undertones, slight freckling, warm glow",
    promptKeywords: ["sun-kissed skin", "golden tan", "warm summer glow"]
  },

  winter_pale: {
    name: "Winter Pale",
    description: "Lighter skin from less sun exposure",
    visualCharacteristics: "Paler tone, more translucent, visible veins",
    promptKeywords: ["porcelain winter skin", "fair complexion", "translucent pale skin"]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get skin profile by ethnicity
 */
export function getSkinProfile(ethnicity: string): SkinProfile | undefined {
  const keyMap: Record<string, string> = {
    'asian': 'east_asian',
    'east asian': 'east_asian',
    'south asian': 'south_asian',
    'indian': 'south_asian',
    'african': 'african',
    'black': 'african',
    'caucasian': 'caucasian',
    'european': 'caucasian',
    'white': 'caucasian'
  };
  
  const key = keyMap[ethnicity.toLowerCase()] || ethnicity.toLowerCase().replace(' ', '_');
  return SKIN_PROFILES[key];
}

/**
 * Generate skin prompt
 */
export function generateSkinPrompt(profile: SkinProfile): string {
  return profile.promptKeywords.join(', ');
}

/**
 * Generate beauty technique prompt
 */
export function generateBeautyPrompt(technique: BeautyTechnique): string {
  return technique.promptKeywords.join(', ');
}

/**
 * Combine skin profile with beauty technique
 */
export function generateCompleteSkinPrompt(
  profile: SkinProfile,
  technique: BeautyTechnique
): string {
  return [
    ...profile.promptKeywords.slice(0, 3),
    ...technique.promptKeywords.slice(0, 2)
  ].join(', ');
}

/**
 * Get lighting recommendations for skin type
 */
export function getLightingForSkin(profile: SkinProfile): string[] {
  return profile.lightingConsiderations;
}

/**
 * Generate negative prompt for skin
 */
export function generateSkinNegativePrompt(): string {
  return [
    "plastic skin",
    "waxy skin",
    "smooth skin no pores",
    "airbrushed skin",
    "doll-like skin",
    "uncanny valley",
    "grey ashy skin"
  ].join(', ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  SKIN_PROFILES,
  BEAUTY_TECHNIQUES,
  SKIN_CONDITIONS,
  getSkinProfile,
  generateSkinPrompt,
  generateBeautyPrompt,
  generateCompleteSkinPrompt,
  getLightingForSkin,
  generateSkinNegativePrompt
};
