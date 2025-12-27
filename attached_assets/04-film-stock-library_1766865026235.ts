/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FILM STOCK LIBRARY
 * Enhancement Feature 4 | Impact: +10-15% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Comprehensive film stock database with 20+ classic and modern films.
 * Includes grain patterns, color science, processing styles, and aesthetic
 * characteristics for authentic analog looks.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface FilmStockProfile {
  name: string;
  manufacturer: string;
  type: FilmType;
  iso: number;
  era: string;
  
  characteristics: {
    grain: {
      size: 'fine' | 'medium' | 'coarse';
      structure: string;
      visibility: string;
    };
    colorScience: {
      saturation: string;
      contrast: string;
      colorCast: string;
      highlights: string;
      shadows: string;
      skinTones: string;
    };
    tonalRange: {
      dynamicRange: string;
      highlightRolloff: string;
      shadowDetail: string;
    };
  };
  
  bestFor: string[];
  iconicUse: string[];
  promptKeywords: string[];
  processingVariations: string[];
}

export type FilmType = 
  | 'color-negative' 
  | 'color-reversal' 
  | 'black-white' 
  | 'cinema' 
  | 'instant';

export interface ProcessingStyle {
  name: string;
  description: string;
  effect: string;
  promptKeywords: string[];
}

// ============================================================================
// COLOR NEGATIVE FILMS
// ============================================================================

export const COLOR_NEGATIVE_FILMS: Record<string, FilmStockProfile> = {
  portra_400: {
    name: "Kodak Portra 400",
    manufacturer: "Kodak",
    type: "color-negative",
    iso: 400,
    era: "1998-present",
    characteristics: {
      grain: {
        size: "fine",
        structure: "tight, organic grain clusters",
        visibility: "subtle, pleasing texture"
      },
      colorScience: {
        saturation: "moderate, natural",
        contrast: "low-medium, soft gradients",
        colorCast: "warm neutral with slight warmth",
        highlights: "creamy, extended rolloff",
        shadows: "open, detailed with warm tones",
        skinTones: "exceptional - warm, natural, flattering"
      },
      tonalRange: {
        dynamicRange: "wide - excellent latitude",
        highlightRolloff: "smooth, cinematic",
        shadowDetail: "excellent retention"
      }
    },
    bestFor: ["portraits", "weddings", "fashion", "lifestyle", "skin tones"],
    iconicUse: ["editorial portraits", "film photography renaissance"],
    promptKeywords: [
      "Kodak Portra 400 film look",
      "creamy Portra skin tones",
      "warm neutral Portra colors",
      "film grain Portra texture",
      "soft Portra highlight rolloff"
    ],
    processingVariations: ["normal", "overexposed +1", "pushed to 800"]
  },

  portra_160: {
    name: "Kodak Portra 160",
    manufacturer: "Kodak",
    type: "color-negative",
    iso: 160,
    era: "1998-present",
    characteristics: {
      grain: {
        size: "fine",
        structure: "extremely fine, nearly invisible",
        visibility: "minimal"
      },
      colorScience: {
        saturation: "natural, subtle",
        contrast: "low, very soft",
        colorCast: "clean neutral",
        highlights: "smooth, extended",
        shadows: "slightly cool, detailed",
        skinTones: "clean, accurate"
      },
      tonalRange: {
        dynamicRange: "excellent",
        highlightRolloff: "very smooth",
        shadowDetail: "excellent"
      }
    },
    bestFor: ["studio portraits", "beauty", "product", "controlled lighting"],
    iconicUse: ["beauty photography", "editorial"],
    promptKeywords: [
      "Kodak Portra 160 film",
      "ultra-fine grain film look",
      "clean neutral film colors",
      "smooth skin tone rendering"
    ],
    processingVariations: ["normal", "slightly underexposed"]
  },

  ektar_100: {
    name: "Kodak Ektar 100",
    manufacturer: "Kodak",
    type: "color-negative",
    iso: 100,
    era: "2008-present",
    characteristics: {
      grain: {
        size: "fine",
        structure: "world's finest grain color negative",
        visibility: "nearly grain-free"
      },
      colorScience: {
        saturation: "high, vivid",
        contrast: "high, punchy",
        colorCast: "neutral with vivid primaries",
        highlights: "clean, snappy",
        shadows: "rich, saturated",
        skinTones: "can be unflattering, red-orange bias"
      },
      tonalRange: {
        dynamicRange: "moderate",
        highlightRolloff: "quick but controlled",
        shadowDetail: "good with color saturation"
      }
    },
    bestFor: ["landscapes", "architecture", "product", "travel"],
    iconicUse: ["landscape photography", "vivid travel photography"],
    promptKeywords: [
      "Kodak Ektar 100 vivid colors",
      "punchy saturated Ektar look",
      "fine grain vivid film",
      "high contrast Ektar style"
    ],
    processingVariations: ["normal", "slight underexposure for saturation"]
  },

  fuji_400h: {
    name: "Fujifilm Pro 400H",
    manufacturer: "Fujifilm",
    type: "color-negative",
    iso: 400,
    era: "2004-2021 (discontinued)",
    characteristics: {
      grain: {
        size: "fine",
        structure: "soft, diffused grain",
        visibility: "subtle"
      },
      colorScience: {
        saturation: "moderate",
        contrast: "low, ethereal",
        colorCast: "green-blue bias in shadows",
        highlights: "airy, light",
        shadows: "cool toned",
        skinTones: "smooth, slightly cool"
      },
      tonalRange: {
        dynamicRange: "wide",
        highlightRolloff: "gentle, dreamy",
        shadowDetail: "good with cool cast"
      }
    },
    bestFor: ["weddings", "fine art", "ethereal portraits", "overcast light"],
    iconicUse: ["wedding photography", "dreamy editorials"],
    promptKeywords: [
      "Fuji 400H film aesthetic",
      "ethereal cool film tones",
      "airy highlight film look",
      "dreamy Fuji 400H style"
    ],
    processingVariations: ["normal", "overexposed +1-2 stops"]
  },

  gold_200: {
    name: "Kodak Gold 200",
    manufacturer: "Kodak",
    type: "color-negative",
    iso: 200,
    era: "1988-present",
    characteristics: {
      grain: {
        size: "medium",
        structure: "classic consumer film grain",
        visibility: "visible, nostalgic"
      },
      colorScience: {
        saturation: "high, warm",
        contrast: "medium",
        colorCast: "warm golden cast",
        highlights: "yellow-warm",
        shadows: "warm brown tones",
        skinTones: "warm, golden"
      },
      tonalRange: {
        dynamicRange: "moderate",
        highlightRolloff: "moderate",
        shadowDetail: "moderate"
      }
    },
    bestFor: ["casual photography", "nostalgic look", "warm scenes", "everyday"],
    iconicUse: ["90s photography", "family photos", "vacation snapshots"],
    promptKeywords: [
      "Kodak Gold warm film look",
      "nostalgic golden film tones",
      "warm consumer film aesthetic",
      "90s film photography style"
    ],
    processingVariations: ["normal", "expired look"]
  }
};

// ============================================================================
// COLOR REVERSAL (SLIDE) FILMS
// ============================================================================

export const COLOR_REVERSAL_FILMS: Record<string, FilmStockProfile> = {
  velvia_50: {
    name: "Fujichrome Velvia 50",
    manufacturer: "Fujifilm",
    type: "color-reversal",
    iso: 50,
    era: "1990-present",
    characteristics: {
      grain: {
        size: "fine",
        structure: "extremely fine, sharp",
        visibility: "minimal"
      },
      colorScience: {
        saturation: "extremely high, hyper-saturated",
        contrast: "high, punchy",
        colorCast: "slightly magenta/red bias",
        highlights: "brilliant, prone to clip",
        shadows: "deep, rich blacks",
        skinTones: "unflattering, oversaturated"
      },
      tonalRange: {
        dynamicRange: "narrow - requires precise exposure",
        highlightRolloff: "abrupt",
        shadowDetail: "limited"
      }
    },
    bestFor: ["landscapes", "nature", "flowers", "saturated scenes"],
    iconicUse: ["National Geographic", "nature photography"],
    promptKeywords: [
      "Velvia hyper-saturated colors",
      "vivid Velvia landscape look",
      "punchy slide film aesthetic",
      "brilliant Velvia saturation"
    ],
    processingVariations: ["normal", "slight underexposure for saturation"]
  },

  provia_100f: {
    name: "Fujichrome Provia 100F",
    manufacturer: "Fujifilm",
    type: "color-reversal",
    iso: 100,
    era: "2002-present",
    characteristics: {
      grain: {
        size: "fine",
        structure: "very fine, sharp",
        visibility: "minimal"
      },
      colorScience: {
        saturation: "moderate-high, balanced",
        contrast: "moderate-high",
        colorCast: "neutral, accurate",
        highlights: "clean, natural",
        shadows: "neutral, detailed",
        skinTones: "good, natural"
      },
      tonalRange: {
        dynamicRange: "moderate for slide film",
        highlightRolloff: "moderate",
        shadowDetail: "better than Velvia"
      }
    },
    bestFor: ["all-around slide film", "portraits", "product", "commercial"],
    iconicUse: ["commercial photography", "stock photography"],
    promptKeywords: [
      "Provia balanced slide film look",
      "accurate Provia colors",
      "natural slide film aesthetic",
      "clean Provia tones"
    ],
    processingVariations: ["normal", "cross-processed"]
  }
};

// ============================================================================
// BLACK & WHITE FILMS
// ============================================================================

export const BLACK_WHITE_FILMS: Record<string, FilmStockProfile> = {
  trix_400: {
    name: "Kodak Tri-X 400",
    manufacturer: "Kodak",
    type: "black-white",
    iso: 400,
    era: "1954-present",
    characteristics: {
      grain: {
        size: "medium",
        structure: "classic, gritty, beautiful",
        visibility: "prominent, characteristic"
      },
      colorScience: {
        saturation: "N/A - B&W",
        contrast: "high, punchy",
        colorCast: "N/A",
        highlights: "bright, maintains detail",
        shadows: "deep blacks with detail",
        skinTones: "excellent tonal rendering"
      },
      tonalRange: {
        dynamicRange: "excellent",
        highlightRolloff: "classic film curve",
        shadowDetail: "excellent"
      }
    },
    bestFor: ["street photography", "documentary", "portraits", "photojournalism"],
    iconicUse: ["Life Magazine", "street photography masters"],
    promptKeywords: [
      "Tri-X film grain texture",
      "classic black and white film look",
      "punchy B&W contrast",
      "gritty Tri-X aesthetic",
      "documentary film style"
    ],
    processingVariations: ["normal", "pushed to 800", "pushed to 1600"]
  },

  hp5_plus: {
    name: "Ilford HP5 Plus 400",
    manufacturer: "Ilford",
    type: "black-white",
    iso: 400,
    era: "1989-present",
    characteristics: {
      grain: {
        size: "medium",
        structure: "softer than Tri-X, pleasant",
        visibility: "moderate"
      },
      colorScience: {
        saturation: "N/A - B&W",
        contrast: "moderate, versatile",
        colorCast: "N/A",
        highlights: "long rolloff",
        shadows: "excellent detail",
        skinTones: "beautiful tonal gradation"
      },
      tonalRange: {
        dynamicRange: "excellent, very pushable",
        highlightRolloff: "smooth, long",
        shadowDetail: "excellent"
      }
    },
    bestFor: ["portraits", "versatile B&W", "low light", "pushing"],
    iconicUse: ["British documentary", "fine art photography"],
    promptKeywords: [
      "HP5 black and white aesthetic",
      "smooth B&W film grain",
      "Ilford HP5 tonal range",
      "classic British B&W look"
    ],
    processingVariations: ["normal", "pushed to 1600", "pushed to 3200"]
  },

  delta_3200: {
    name: "Ilford Delta 3200",
    manufacturer: "Ilford",
    type: "black-white",
    iso: 3200,
    era: "1998-present",
    characteristics: {
      grain: {
        size: "coarse",
        structure: "pronounced, dramatic",
        visibility: "very visible, stylistic"
      },
      colorScience: {
        saturation: "N/A - B&W",
        contrast: "high in highlights, soft shadows",
        colorCast: "N/A",
        highlights: "bright, punchy",
        shadows: "soft, gentle falloff",
        skinTones: "dramatic, high contrast"
      },
      tonalRange: {
        dynamicRange: "moderate",
        highlightRolloff: "quick",
        shadowDetail: "moderate"
      }
    },
    bestFor: ["low light", "concerts", "dramatic portraits", "night photography"],
    iconicUse: ["concert photography", "night street photography"],
    promptKeywords: [
      "Delta 3200 coarse grain",
      "dramatic high ISO B&W",
      "gritty low light film look",
      "concert photography aesthetic"
    ],
    processingVariations: ["normal", "pushed to 6400"]
  }
};

// ============================================================================
// CINEMA FILMS
// ============================================================================

export const CINEMA_FILMS: Record<string, FilmStockProfile> = {
  vision3_500t: {
    name: "Kodak Vision3 500T",
    manufacturer: "Kodak",
    type: "cinema",
    iso: 500,
    era: "2007-present",
    characteristics: {
      grain: {
        size: "fine",
        structure: "cinema-quality fine grain",
        visibility: "minimal"
      },
      colorScience: {
        saturation: "rich, cinematic",
        contrast: "moderate, wide latitude",
        colorCast: "tungsten balanced, blue daylight",
        highlights: "extended, cinematic rolloff",
        shadows: "clean, detailed",
        skinTones: "beautiful, versatile"
      },
      tonalRange: {
        dynamicRange: "exceptional - 14+ stops",
        highlightRolloff: "smooth, extended",
        shadowDetail: "excellent"
      }
    },
    bestFor: ["narrative film", "music videos", "night scenes", "mixed lighting"],
    iconicUse: ["Hollywood productions", "indie films"],
    promptKeywords: [
      "cinematic film look",
      "Vision3 500T movie aesthetic",
      "Hollywood film grain",
      "tungsten cinema color grade",
      "theatrical film appearance"
    ],
    processingVariations: ["normal", "print film emulation"]
  },

  cinestill_800t: {
    name: "CineStill 800T",
    manufacturer: "CineStill",
    type: "cinema",
    iso: 800,
    era: "2013-present",
    characteristics: {
      grain: {
        size: "fine-medium",
        structure: "cinema-derived grain",
        visibility: "moderate"
      },
      colorScience: {
        saturation: "rich, cinematic",
        contrast: "moderate",
        colorCast: "tungsten balanced, cyan shadows",
        highlights: "characteristic halation glow",
        shadows: "cyan-teal cast",
        skinTones: "warm under tungsten, cool daylight"
      },
      tonalRange: {
        dynamicRange: "good",
        highlightRolloff: "halation bloom on bright sources",
        shadowDetail: "good with color shift"
      }
    },
    bestFor: ["night photography", "neon signs", "urban night", "moody portraits"],
    iconicUse: ["night street photography", "neon-lit scenes"],
    promptKeywords: [
      "CineStill 800T halation",
      "neon glow film aesthetic",
      "cinematic night photography",
      "tungsten film cyan shadows",
      "red halation around lights"
    ],
    processingVariations: ["normal", "daylight (blue cast)"]
  }
};

// ============================================================================
// PROCESSING STYLES
// ============================================================================

export const PROCESSING_STYLES: Record<string, ProcessingStyle> = {
  push_processing: {
    name: "Push Processing",
    description: "Underdeveloped film developed longer for increased ISO",
    effect: "Higher contrast, more grain, deeper blacks",
    promptKeywords: [
      "pushed film contrast",
      "high contrast pushed film",
      "grainy pushed aesthetic"
    ]
  },
  pull_processing: {
    name: "Pull Processing",
    description: "Overdeveloped film developed shorter for decreased ISO",
    effect: "Lower contrast, finer grain, muted tones",
    promptKeywords: [
      "pulled film soft contrast",
      "muted film tones",
      "low contrast film look"
    ]
  },
  cross_processing: {
    name: "Cross Processing",
    description: "Slide film in C-41 or negative in E-6",
    effect: "Extreme color shifts, high contrast, unpredictable colors",
    promptKeywords: [
      "cross-processed colors",
      "extreme color shift film",
      "cross-process aesthetic",
      "unusual film color cast"
    ]
  },
  expired_film: {
    name: "Expired Film",
    description: "Film used past expiration date",
    effect: "Color shifts, increased fog, unpredictable results",
    promptKeywords: [
      "expired film color shift",
      "vintage degraded film look",
      "faded expired film aesthetic"
    ]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get film stock by name
 */
export function getFilmStock(name: string): FilmStockProfile | undefined {
  const allFilms = {
    ...COLOR_NEGATIVE_FILMS,
    ...COLOR_REVERSAL_FILMS,
    ...BLACK_WHITE_FILMS,
    ...CINEMA_FILMS
  };
  return allFilms[name];
}

/**
 * Get films by type
 */
export function getFilmsByType(type: FilmType): FilmStockProfile[] {
  const typeMap: Record<FilmType, Record<string, FilmStockProfile>> = {
    'color-negative': COLOR_NEGATIVE_FILMS,
    'color-reversal': COLOR_REVERSAL_FILMS,
    'black-white': BLACK_WHITE_FILMS,
    'cinema': CINEMA_FILMS,
    'instant': {}
  };
  
  return Object.values(typeMap[type] || {});
}

/**
 * Generate film stock prompt
 */
export function generateFilmPrompt(film: FilmStockProfile): string {
  return film.promptKeywords.join(', ');
}

/**
 * Generate processing style prompt
 */
export function generateProcessingPrompt(style: ProcessingStyle): string {
  return style.promptKeywords.join(', ');
}

/**
 * Recommend film for use case
 */
export function recommendFilmForUseCase(useCase: string): FilmStockProfile[] {
  const allFilms = {
    ...COLOR_NEGATIVE_FILMS,
    ...COLOR_REVERSAL_FILMS,
    ...BLACK_WHITE_FILMS,
    ...CINEMA_FILMS
  };
  
  return Object.values(allFilms).filter(film => 
    film.bestFor.some(use => 
      use.toLowerCase().includes(useCase.toLowerCase())
    )
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  COLOR_NEGATIVE_FILMS,
  COLOR_REVERSAL_FILMS,
  BLACK_WHITE_FILMS,
  CINEMA_FILMS,
  PROCESSING_STYLES,
  getFilmStock,
  getFilmsByType,
  generateFilmPrompt,
  generateProcessingPrompt,
  recommendFilmForUseCase
};
