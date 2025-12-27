/**
 * ═══════════════════════════════════════════════════════════════════════════
 * IMPERFECTION LIBRARY
 * Hyper-Realism Tier 1, Feature 3 | Impact: +20-25% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Core Principle: PERFECT = FAKE, IMPERFECT = REAL
 * Intentional flaws that make AI images feel authentically real.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ImperfectionProfile {
  name: string;
  category: ImperfectionCategory;
  severity: 'subtle' | 'moderate' | 'noticeable';
  description: string;
  whenToUse: string[];
  visualEffect: string;
  promptKeywords: string[];
  avoidOveruse: string;
}

export type ImperfectionCategory = 
  | 'human' 
  | 'environmental' 
  | 'technical' 
  | 'lighting' 
  | 'atmospheric';

export interface ImperfectionSet {
  name: string;
  useCase: string;
  imperfections: string[];
  promptTemplate: string;
}

// ============================================================================
// HUMAN IMPERFECTIONS
// ============================================================================

export const HUMAN_IMPERFECTIONS: Record<string, ImperfectionProfile> = {
  skin_pores: {
    name: "Visible Skin Pores",
    category: "human",
    severity: "subtle",
    description: "Natural skin pores visible on nose, cheeks, forehead",
    whenToUse: ["all portraits", "close-ups", "beauty shots"],
    visualEffect: "Prevents plastic/waxy skin appearance",
    promptKeywords: [
      "visible skin pores on nose and cheeks",
      "natural skin texture with pores",
      "realistic skin surface detail"
    ],
    avoidOveruse: "Don't make pores too large or pronounced"
  },

  freckles: {
    name: "Freckles and Moles",
    category: "human",
    severity: "subtle",
    description: "Natural melanin deposits, beauty marks",
    whenToUse: ["fair-skinned subjects", "outdoor portraits", "natural looks"],
    visualEffect: "Creates unique individual appearance",
    promptKeywords: [
      "natural freckles scattered on face",
      "small beauty marks randomly placed",
      "authentic skin markings"
    ],
    avoidOveruse: "Too many can overwhelm"
  },

  fine_lines: {
    name: "Expression Lines",
    category: "human",
    severity: "subtle",
    description: "Laugh lines, smile lines, forehead creases",
    whenToUse: ["adults over 25", "expressive portraits", "natural look"],
    visualEffect: "Shows life and character",
    promptKeywords: [
      "subtle expression lines around eyes",
      "natural laugh lines",
      "fine wrinkles from expressions"
    ],
    avoidOveruse: "Match to subject's apparent age"
  },

  skin_variation: {
    name: "Uneven Skin Tone",
    category: "human",
    severity: "subtle",
    description: "Natural color variation across face",
    whenToUse: ["all skin tones", "natural lighting", "realistic portraits"],
    visualEffect: "Prevents uniform artificial look",
    promptKeywords: [
      "uneven skin tone variation",
      "natural redness in cheeks and nose",
      "color variation across face"
    ],
    avoidOveruse: "Should be subtle, not splotchy"
  },

  flyaway_hair: {
    name: "Flyaway Hair",
    category: "human",
    severity: "subtle",
    description: "Loose strands of hair not perfectly placed",
    whenToUse: ["natural portraits", "outdoor shots", "candid look"],
    visualEffect: "Prevents too-perfect styled look",
    promptKeywords: [
      "natural flyaway hair strands",
      "loose hair wisps",
      "imperfect natural hairstyle"
    ],
    avoidOveruse: "Too much looks messy"
  },

  asymmetry: {
    name: "Natural Asymmetry",
    category: "human",
    severity: "subtle",
    description: "Slight differences between face halves",
    whenToUse: ["all portraits", "realistic faces"],
    visualEffect: "Eliminates uncanny valley",
    promptKeywords: [
      "natural facial asymmetry",
      "slight differences between face halves",
      "realistic imperfect symmetry"
    ],
    avoidOveruse: "Should be subtle, not deformity"
  }
};

// ============================================================================
// ENVIRONMENTAL IMPERFECTIONS
// ============================================================================

export const ENVIRONMENTAL_IMPERFECTIONS: Record<string, ImperfectionProfile> = {
  dust_particles: {
    name: "Dust in Air",
    category: "environmental",
    severity: "subtle",
    description: "Floating dust motes visible in light beams",
    whenToUse: ["natural light", "window light", "atmospheric shots"],
    visualEffect: "Adds atmosphere and realism",
    promptKeywords: [
      "dust particles floating in light",
      "visible dust motes in sunbeam",
      "atmospheric dust in air"
    ],
    avoidOveruse: "Can look dirty if overdone"
  },

  surface_wear: {
    name: "Surface Wear and Patina",
    category: "environmental",
    severity: "moderate",
    description: "Scratches, marks, natural aging on surfaces",
    whenToUse: ["used objects", "vintage look", "lived-in spaces"],
    visualEffect: "Objects feel real and used",
    promptKeywords: [
      "natural wear marks on surfaces",
      "aged patina on materials",
      "authentic surface imperfections"
    ],
    avoidOveruse: "Match to object age and use"
  },

  fabric_wrinkles: {
    name: "Clothing Wrinkles",
    category: "environmental",
    severity: "subtle",
    description: "Natural fabric creases and folds",
    whenToUse: ["fashion", "portraits with clothing", "realistic fabric"],
    visualEffect: "Clothes look worn, not CGI",
    promptKeywords: [
      "natural fabric wrinkles",
      "realistic clothing creases",
      "worn fabric texture"
    ],
    avoidOveruse: "Excessive wrinkles look unkempt"
  },

  uneven_surfaces: {
    name: "Imperfect Surfaces",
    category: "environmental",
    severity: "subtle",
    description: "Slight unevenness in walls, floors, textures",
    whenToUse: ["interiors", "architecture", "product on surface"],
    visualEffect: "Spaces feel real, not rendered",
    promptKeywords: [
      "slightly uneven wall texture",
      "natural surface imperfections",
      "authentic material wear"
    ],
    avoidOveruse: "Should be subtle background element"
  }
};

// ============================================================================
// TECHNICAL IMPERFECTIONS
// ============================================================================

export const TECHNICAL_IMPERFECTIONS: Record<string, ImperfectionProfile> = {
  film_grain: {
    name: "Film Grain",
    category: "technical",
    severity: "subtle",
    description: "Organic texture from photographic film",
    whenToUse: ["vintage look", "artistic", "low light simulation"],
    visualEffect: "Adds texture and analog feel",
    promptKeywords: [
      "subtle film grain texture",
      "organic photographic grain",
      "analog film noise"
    ],
    avoidOveruse: "Heavy grain obscures detail"
  },

  slight_vignette: {
    name: "Natural Vignetting",
    category: "technical",
    severity: "subtle",
    description: "Slight darkening toward edges",
    whenToUse: ["portraits", "wide aperture", "vintage lenses"],
    visualEffect: "Draws eye to center, adds depth",
    promptKeywords: [
      "natural lens vignetting",
      "subtle corner darkening",
      "optical vignette effect"
    ],
    avoidOveruse: "Heavy vignette looks like filter"
  },

  lens_softness: {
    name: "Edge Softness",
    category: "technical",
    severity: "subtle",
    description: "Slight softness toward frame edges",
    whenToUse: ["wide aperture shots", "vintage lens simulation"],
    visualEffect: "Mimics real lens behavior",
    promptKeywords: [
      "slightly softer edges",
      "center sharp edge soft",
      "natural lens falloff"
    ],
    avoidOveruse: "Too much looks out of focus"
  },

  chromatic_aberration: {
    name: "Chromatic Aberration",
    category: "technical",
    severity: "subtle",
    description: "Slight color fringing in high contrast areas",
    whenToUse: ["backlit subjects", "high contrast edges"],
    visualEffect: "Mimics real optics",
    promptKeywords: [
      "subtle chromatic aberration",
      "slight color fringing on edges",
      "natural lens color separation"
    ],
    avoidOveruse: "Heavy CA looks like bad lens"
  }
};

// ============================================================================
// IMPERFECTION SETS BY USE CASE
// ============================================================================

export const IMPERFECTION_SETS: Record<string, ImperfectionSet> = {
  natural_portrait: {
    name: "Natural Portrait",
    useCase: "Authentic human portraits",
    imperfections: [
      "skin_pores",
      "fine_lines",
      "skin_variation",
      "flyaway_hair",
      "asymmetry"
    ],
    promptTemplate: "natural portrait with visible skin pores, subtle expression lines, slight facial asymmetry, natural flyaway hair strands, uneven skin tone variation"
  },

  lifestyle_shot: {
    name: "Lifestyle Photography",
    useCase: "Natural everyday scenes",
    imperfections: [
      "skin_pores",
      "fabric_wrinkles",
      "dust_particles",
      "surface_wear"
    ],
    promptTemplate: "lifestyle shot with natural skin texture, realistic clothing wrinkles, dust particles in sunlight, lived-in environment"
  },

  vintage_aesthetic: {
    name: "Vintage/Film Look",
    useCase: "Analog film simulation",
    imperfections: [
      "film_grain",
      "slight_vignette",
      "lens_softness",
      "chromatic_aberration"
    ],
    promptTemplate: "vintage film aesthetic with organic grain texture, natural vignetting, slightly soft edges, subtle chromatic aberration"
  },

  editorial_beauty: {
    name: "Editorial Beauty",
    useCase: "High-end beauty with authenticity",
    imperfections: [
      "skin_pores",
      "freckles",
      "skin_variation"
    ],
    promptTemplate: "editorial beauty with visible skin texture, natural freckles, authentic skin detail"
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get imperfection profile by name
 */
export function getImperfection(name: string): ImperfectionProfile | undefined {
  return {
    ...HUMAN_IMPERFECTIONS,
    ...ENVIRONMENTAL_IMPERFECTIONS,
    ...TECHNICAL_IMPERFECTIONS
  }[name];
}

/**
 * Get imperfections by category
 */
export function getImperfectionsByCategory(category: ImperfectionCategory): ImperfectionProfile[] {
  const categoryMap: Record<ImperfectionCategory, Record<string, ImperfectionProfile>> = {
    human: HUMAN_IMPERFECTIONS,
    environmental: ENVIRONMENTAL_IMPERFECTIONS,
    technical: TECHNICAL_IMPERFECTIONS,
    lighting: {},
    atmospheric: {}
  };
  
  return Object.values(categoryMap[category] || {});
}

/**
 * Generate imperfection prompt
 */
export function generateImperfectionPrompt(imperfection: ImperfectionProfile): string {
  return imperfection.promptKeywords.join(', ');
}

/**
 * Generate balanced imperfections for use case
 */
export function generateBalancedImperfections(useCase: string): string {
  const set = IMPERFECTION_SETS[useCase];
  if (!set) return '';
  
  return set.promptTemplate;
}

/**
 * Generate combined imperfection prompt from list
 */
export function combineImperfections(imperfectionNames: string[]): string {
  const allImperfections = {
    ...HUMAN_IMPERFECTIONS,
    ...ENVIRONMENTAL_IMPERFECTIONS,
    ...TECHNICAL_IMPERFECTIONS
  };
  
  return imperfectionNames
    .map(name => allImperfections[name])
    .filter(Boolean)
    .flatMap(imp => imp.promptKeywords.slice(0, 1))
    .join(', ');
}

/**
 * Get recommended imperfections for subject type
 */
export function getRecommendedImperfections(subjectType: string): string[] {
  const recommendationMap: Record<string, string[]> = {
    portrait: ['skin_pores', 'fine_lines', 'asymmetry', 'flyaway_hair'],
    landscape: ['dust_particles', 'film_grain'],
    product: ['surface_wear', 'dust_particles'],
    fashion: ['skin_pores', 'fabric_wrinkles', 'flyaway_hair'],
    documentary: ['skin_pores', 'fine_lines', 'dust_particles', 'film_grain']
  };
  
  return recommendationMap[subjectType.toLowerCase()] || [];
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  HUMAN_IMPERFECTIONS,
  ENVIRONMENTAL_IMPERFECTIONS,
  TECHNICAL_IMPERFECTIONS,
  IMPERFECTION_SETS,
  getImperfection,
  getImperfectionsByCategory,
  generateImperfectionPrompt,
  generateBalancedImperfections,
  combineImperfections,
  getRecommendedImperfections
};
