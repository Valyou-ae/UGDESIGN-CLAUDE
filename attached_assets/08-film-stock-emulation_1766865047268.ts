/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FILM STOCK EMULATION SYSTEM
 * Hyper-Realism Tier 2, Feature 8 | Impact: +10-15% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Advanced film stock simulation for authentic analog aesthetics.
 * Extends the basic film stock library with processing variations.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface AdvancedFilmProfile {
  name: string;
  manufacturer: string;
  type: FilmType;
  iso: number;
  era: string;
  
  colorScience: {
    saturation: string;
    contrast: string;
    colorShift: string;
    skinToneRendering: string;
    highlightRolloff: string;
    shadowCharacter: string;
  };
  
  grainStructure: {
    size: string;
    distribution: string;
    colorNoise: string;
    intensity: string;
  };
  
  tonalResponse: {
    dynamicRange: string;
    midtoneContrast: string;
    highlights: string;
    shadows: string;
  };
  
  bestFor: string[];
  promptKeywords: string[];
  processingVariations: ProcessingVariation[];
}

export type FilmType = 'color_negative' | 'color_reversal' | 'black_white' | 'cinema';

export interface ProcessingVariation {
  name: string;
  description: string;
  effect: string;
  promptModifier: string;
}

// ============================================================================
// ICONIC FILM STOCKS
// ============================================================================

export const ICONIC_FILM_STOCKS: Record<string, AdvancedFilmProfile> = {
  kodak_portra_400: {
    name: "Kodak Portra 400",
    manufacturer: "Kodak",
    type: "color_negative",
    iso: 400,
    era: "1998-present",
    colorScience: {
      saturation: "Natural, slightly subdued",
      contrast: "Low to medium, forgiving",
      colorShift: "Warm skin tones, cool shadows",
      skinToneRendering: "Legendary - warm, flattering, natural",
      highlightRolloff: "Extremely smooth, creamy",
      shadowCharacter: "Open, detailed, slight blue shift"
    },
    grainStructure: {
      size: "Fine for 400 ISO",
      distribution: "Uniform, organic",
      colorNoise: "Very low",
      intensity: "Subtle, pleasant"
    },
    tonalResponse: {
      dynamicRange: "Exceptional latitude",
      midtoneContrast: "Smooth, low contrast",
      highlights: "Holds detail beautifully",
      shadows: "Recoverable, open"
    },
    bestFor: ["Portraits", "Weddings", "Fashion", "Natural light"],
    promptKeywords: [
      "Kodak Portra 400 film",
      "warm skin tones Portra",
      "creamy highlight rolloff",
      "fine film grain texture",
      "analog film aesthetic",
      "professional color negative"
    ],
    processingVariations: [
      {
        name: "Pushed +1",
        description: "One stop push processing",
        effect: "More grain, higher contrast, slightly warmer",
        promptModifier: "pushed Portra 400, contrasty film look"
      },
      {
        name: "Overexposed",
        description: "Overexposed by 1-2 stops",
        effect: "Creamy highlights, pastel colors, dreamy",
        promptModifier: "overexposed Portra, pastel film colors, dreamy"
      }
    ]
  },

  kodak_ektar_100: {
    name: "Kodak Ektar 100",
    manufacturer: "Kodak",
    type: "color_negative",
    iso: 100,
    era: "2008-present",
    colorScience: {
      saturation: "High, vivid, punchy",
      contrast: "Higher than Portra",
      colorShift: "Neutral to cool",
      skinToneRendering: "Less flattering than Portra, more realistic",
      highlightRolloff: "Sharper transition",
      shadowCharacter: "Deep, rich blacks"
    },
    grainStructure: {
      size: "World's finest color negative grain",
      distribution: "Extremely tight",
      colorNoise: "Minimal",
      intensity: "Almost invisible"
    },
    tonalResponse: {
      dynamicRange: "Very good",
      midtoneContrast: "Punchy, defined",
      highlights: "Clean but less forgiving",
      shadows: "Deep, saturated"
    },
    bestFor: ["Landscapes", "Travel", "Product", "Architecture"],
    promptKeywords: [
      "Kodak Ektar 100 film",
      "vibrant saturated colors",
      "ultra fine grain",
      "punchy color negative",
      "vivid landscape film"
    ],
    processingVariations: [
      {
        name: "Standard",
        description: "Normal C-41 processing",
        effect: "Maximum sharpness and color",
        promptModifier: "sharp Ektar, vivid colors"
      }
    ]
  },

  fuji_velvia_50: {
    name: "Fujifilm Velvia 50",
    manufacturer: "Fujifilm",
    type: "color_reversal",
    iso: 50,
    era: "1990-present",
    colorScience: {
      saturation: "Extreme, legendary",
      contrast: "Very high",
      colorShift: "Enhanced reds, greens, blues",
      skinToneRendering: "Too saturated for portraits",
      highlightRolloff: "Abrupt, slides clip quickly",
      shadowCharacter: "Dense, dramatic"
    },
    grainStructure: {
      size: "Extremely fine",
      distribution: "Tight, uniform",
      colorNoise: "None visible",
      intensity: "Invisible"
    },
    tonalResponse: {
      dynamicRange: "Limited, 5 stops",
      midtoneContrast: "Extremely punchy",
      highlights: "Clip easily, must protect",
      shadows: "Deep, rich"
    },
    bestFor: ["Landscapes", "Nature", "Flowers", "Sunset/sunrise"],
    promptKeywords: [
      "Fuji Velvia 50 slide film",
      "hyper-saturated colors",
      "vivid greens and reds",
      "dramatic slide film",
      "high contrast transparency"
    ],
    processingVariations: [
      {
        name: "E-6 Standard",
        description: "Standard reversal processing",
        effect: "Maximum saturation",
        promptModifier: "Velvia saturated, vivid slide film"
      }
    ]
  },

  kodak_trix_400: {
    name: "Kodak Tri-X 400",
    manufacturer: "Kodak",
    type: "black_white",
    iso: 400,
    era: "1954-present",
    colorScience: {
      saturation: "N/A - Black and white",
      contrast: "Classic medium-high",
      colorShift: "N/A",
      skinToneRendering: "Beautiful tonal separation",
      highlightRolloff: "Gradual, filmic",
      shadowCharacter: "Rich, detailed blacks"
    },
    grainStructure: {
      size: "Medium, characterful",
      distribution: "Organic, random",
      colorNoise: "N/A",
      intensity: "Visible but pleasant"
    },
    tonalResponse: {
      dynamicRange: "Excellent latitude",
      midtoneContrast: "Strong, defined",
      highlights: "Holdable",
      shadows: "Recoverable"
    },
    bestFor: ["Street", "Documentary", "Portraits", "Journalism"],
    promptKeywords: [
      "Kodak Tri-X 400 black and white",
      "classic film grain",
      "rich black and white tones",
      "documentary film aesthetic",
      "gritty organic grain"
    ],
    processingVariations: [
      {
        name: "Pushed to 1600",
        description: "Two stop push processing",
        effect: "Chunky grain, high contrast, gritty",
        promptModifier: "pushed Tri-X, gritty grain, high contrast B&W"
      },
      {
        name: "Rodinal Stand",
        description: "Stand development in Rodinal",
        effect: "Extreme sharpness, edge effects, lower contrast",
        promptModifier: "sharp Tri-X, acutance, subtle grain"
      }
    ]
  },

  cinestill_800t: {
    name: "CineStill 800T",
    manufacturer: "CineStill",
    type: "cinema",
    iso: 800,
    era: "2012-present",
    colorScience: {
      saturation: "Moderate to high",
      contrast: "Medium",
      colorShift: "Tungsten balanced, cool under daylight",
      skinToneRendering: "Cinematic, slightly cool",
      highlightRolloff: "Halation around highlights",
      shadowCharacter: "Cool, blue-green shift"
    },
    grainStructure: {
      size: "Moderate to large",
      distribution: "Filmic, organic",
      colorNoise: "Some in shadows",
      intensity: "Noticeable, characteristic"
    },
    tonalResponse: {
      dynamicRange: "Good cinema latitude",
      midtoneContrast: "Moderate",
      highlights: "Red halation halos",
      shadows: "Cool, atmospheric"
    },
    bestFor: ["Night photography", "Neon", "Cinematic", "Urban"],
    promptKeywords: [
      "CineStill 800T tungsten film",
      "red halation around lights",
      "cinematic night photography",
      "neon light film aesthetic",
      "tungsten balanced film"
    ],
    processingVariations: [
      {
        name: "Tungsten Light",
        description: "Under tungsten/neon lighting",
        effect: "Maximum halation, balanced colors",
        promptModifier: "CineStill halation, neon glow, night film"
      },
      {
        name: "Daylight",
        description: "Used in daylight without filter",
        effect: "Strong blue/cyan cast",
        promptModifier: "CineStill daylight, blue cast, cold film"
      }
    ]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get film stock by name
 */
export function getFilmStock(name: string): AdvancedFilmProfile | undefined {
  return ICONIC_FILM_STOCKS[name];
}

/**
 * Get film stocks by type
 */
export function getFilmStocksByType(type: FilmType): AdvancedFilmProfile[] {
  return Object.values(ICONIC_FILM_STOCKS).filter(film => film.type === type);
}

/**
 * Generate film stock prompt
 */
export function generateFilmPrompt(film: AdvancedFilmProfile): string {
  return film.promptKeywords.join(', ');
}

/**
 * Generate film with processing variation
 */
export function generateFilmWithProcessing(
  film: AdvancedFilmProfile,
  variationName: string
): string {
  const variation = film.processingVariations.find(v => v.name === variationName);
  if (variation) {
    return `${film.promptKeywords.slice(0, 2).join(', ')}, ${variation.promptModifier}`;
  }
  return generateFilmPrompt(film);
}

/**
 * Recommend film for use case
 */
export function recommendFilmForUseCase(useCase: string): AdvancedFilmProfile | undefined {
  const useCaseMap: Record<string, string> = {
    portrait: 'kodak_portra_400',
    landscape: 'fuji_velvia_50',
    street: 'kodak_trix_400',
    night: 'cinestill_800t',
    travel: 'kodak_ektar_100',
    wedding: 'kodak_portra_400',
    documentary: 'kodak_trix_400',
    urban: 'cinestill_800t'
  };
  
  const key = useCaseMap[useCase.toLowerCase()];
  return key ? ICONIC_FILM_STOCKS[key] : undefined;
}

/**
 * Get film grain prompt based on intensity
 */
export function getGrainPrompt(intensity: 'subtle' | 'medium' | 'heavy'): string {
  const grainMap: Record<string, string> = {
    subtle: "subtle fine film grain, organic texture",
    medium: "visible film grain, analog texture, organic noise",
    heavy: "chunky film grain, gritty texture, pushed film look"
  };
  return grainMap[intensity];
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  ICONIC_FILM_STOCKS,
  getFilmStock,
  getFilmStocksByType,
  generateFilmPrompt,
  generateFilmWithProcessing,
  recommendFilmForUseCase,
  getGrainPrompt
};
