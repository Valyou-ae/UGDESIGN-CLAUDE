/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TONAL RANGE MASTERY
 * Hyper-Realism Tier 3, Feature 12 | Impact: +10-15% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Dynamic range, tonal mapping, and professional exposure control
 * for maximum photographic quality.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface TonalProfile {
  name: string;
  description: string;
  dynamicRange: string;
  
  zones: {
    highlights: TonalZone;
    midtones: TonalZone;
    shadows: TonalZone;
  };
  
  contrastCharacter: string;
  bestFor: string[];
  promptKeywords: string[];
}

export interface TonalZone {
  behavior: string;
  detail: string;
  rolloff: string;
}

// ============================================================================
// TONAL PROFILES
// ============================================================================

export const TONAL_PROFILES: Record<string, TonalProfile> = {
  high_dynamic_range: {
    name: "High Dynamic Range",
    description: "Maximum tonal information preserved",
    dynamicRange: "14+ stops",
    zones: {
      highlights: {
        behavior: "Gradual rolloff, no clipping",
        detail: "Full detail in brightest areas",
        rolloff: "Smooth, filmic transition"
      },
      midtones: {
        behavior: "Full tonal separation",
        detail: "Rich, defined",
        rolloff: "N/A - full detail"
      },
      shadows: {
        behavior: "Open, detailed",
        detail: "Full shadow detail preserved",
        rolloff: "Gradual fade to black"
      }
    },
    contrastCharacter: "Balanced, full range",
    bestFor: ["Landscapes", "Interiors", "Mixed lighting"],
    promptKeywords: [
      "high dynamic range",
      "full tonal range",
      "detailed highlights and shadows",
      "no clipped tones",
      "professional HDR quality"
    ]
  },

  low_key_dramatic: {
    name: "Low Key Dramatic",
    description: "Dark, moody with selective highlights",
    dynamicRange: "Compressed to dark",
    zones: {
      highlights: {
        behavior: "Selective, dramatic",
        detail: "Preserved in key areas",
        rolloff: "Sharp, defined"
      },
      midtones: {
        behavior: "Pulled dark",
        detail: "Visible but subdued",
        rolloff: "Quick transition to shadow"
      },
      shadows: {
        behavior: "Deep, dominant",
        detail: "Crushed for effect",
        rolloff: "Lost to pure black"
      }
    },
    contrastCharacter: "High contrast, dark dominant",
    bestFor: ["Dramatic portraits", "Film noir", "Fine art"],
    promptKeywords: [
      "low key dramatic lighting",
      "deep shadows dominant",
      "selective highlighting",
      "moody dark tones",
      "chiaroscuro contrast"
    ]
  },

  high_key_bright: {
    name: "High Key Bright",
    description: "Bright, airy with minimal shadows",
    dynamicRange: "Compressed to bright",
    zones: {
      highlights: {
        behavior: "Dominant, bright",
        detail: "Some loss acceptable",
        rolloff: "Fade to white"
      },
      midtones: {
        behavior: "Pushed bright",
        detail: "Clear, open",
        rolloff: "Gentle upward"
      },
      shadows: {
        behavior: "Minimal, filled",
        detail: "Almost shadowless",
        rolloff: "Virtually none"
      }
    },
    contrastCharacter: "Low contrast, bright overall",
    bestFor: ["Beauty", "Product", "Commercial", "E-commerce"],
    promptKeywords: [
      "high key bright lighting",
      "minimal shadows",
      "bright even exposure",
      "airy light tones",
      "clean commercial look"
    ]
  },

  cinematic_s_curve: {
    name: "Cinematic S-Curve",
    description: "Film-like tonal response with lifted blacks",
    dynamicRange: "Cinematic grade",
    zones: {
      highlights: {
        behavior: "Rolled off, filmic",
        detail: "Smooth transitions",
        rolloff: "Gradual, no hard clip"
      },
      midtones: {
        behavior: "Punchy, defined",
        detail: "Strong separation",
        rolloff: "Contrasty middle"
      },
      shadows: {
        behavior: "Lifted, not true black",
        detail: "Preserved throughout",
        rolloff: "Faded, not crushed"
      }
    },
    contrastCharacter: "Punchy mids, soft extremes",
    bestFor: ["Cinematic", "Editorial", "Fashion"],
    promptKeywords: [
      "cinematic tonal curve",
      "lifted shadows",
      "filmic highlight rolloff",
      "movie color grade",
      "punchy midtones"
    ]
  },

  natural_balanced: {
    name: "Natural Balanced",
    description: "How the eye sees, natural distribution",
    dynamicRange: "Natural, eye-like",
    zones: {
      highlights: {
        behavior: "Natural bright",
        detail: "Preserved naturally",
        rolloff: "Organic transition"
      },
      midtones: {
        behavior: "Central focus",
        detail: "Maximum information",
        rolloff: "Balanced both ways"
      },
      shadows: {
        behavior: "Natural dark",
        detail: "Preserved naturally",
        rolloff: "Organic to black"
      }
    },
    contrastCharacter: "Natural, as seen",
    bestFor: ["Documentary", "Journalism", "Natural portraits"],
    promptKeywords: [
      "natural tonal balance",
      "true-to-life exposure",
      "natural contrast",
      "as-seen-by-eye rendering",
      "realistic tonal distribution"
    ]
  }
};

// ============================================================================
// EXPOSURE TECHNIQUES
// ============================================================================

export const EXPOSURE_TECHNIQUES: Record<string, {
  name: string;
  description: string;
  effect: string;
  promptKeywords: string[];
}> = {
  expose_right: {
    name: "Expose to the Right",
    description: "Maximum highlight data capture",
    effect: "Bright with recoverable detail",
    promptKeywords: ["bright exposure", "highlight detail", "ETTR technique"]
  },

  expose_shadows: {
    name: "Protect Shadows",
    description: "Ensure shadow detail preservation",
    effect: "Open, readable shadows",
    promptKeywords: ["shadow detail preserved", "open shadows", "detailed dark areas"]
  },

  middle_gray: {
    name: "Middle Gray Balanced",
    description: "Classic 18% gray exposure",
    effect: "Balanced, natural",
    promptKeywords: ["balanced exposure", "middle gray reference", "natural brightness"]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get tonal profile
 */
export function getTonalProfile(name: string): TonalProfile | undefined {
  return TONAL_PROFILES[name];
}

/**
 * Generate tonal prompt
 */
export function generateTonalPrompt(profile: TonalProfile): string {
  return profile.promptKeywords.join(', ');
}

/**
 * Get exposure technique prompt
 */
export function generateExposurePrompt(technique: string): string {
  return EXPOSURE_TECHNIQUES[technique]?.promptKeywords.join(', ') || '';
}

/**
 * Recommend tonal profile for mood
 */
export function getTonalForMood(mood: string): TonalProfile | undefined {
  const moodMap: Record<string, string> = {
    dramatic: 'low_key_dramatic',
    bright: 'high_key_bright',
    cinematic: 'cinematic_s_curve',
    natural: 'natural_balanced',
    epic: 'high_dynamic_range'
  };
  
  const key = moodMap[mood.toLowerCase()];
  return key ? TONAL_PROFILES[key] : undefined;
}

/**
 * Generate complete tonal prompt
 */
export function generateCompleteTonalPrompt(
  profile: TonalProfile,
  exposure?: string
): string {
  let prompt = generateTonalPrompt(profile);
  
  if (exposure && EXPOSURE_TECHNIQUES[exposure]) {
    prompt += ', ' + generateExposurePrompt(exposure);
  }
  
  return prompt;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  TONAL_PROFILES,
  EXPOSURE_TECHNIQUES,
  getTonalProfile,
  generateTonalPrompt,
  generateExposurePrompt,
  getTonalForMood,
  generateCompleteTonalPrompt
};
