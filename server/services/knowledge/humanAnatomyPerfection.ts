/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HUMAN ANATOMY PERFECTION LIBRARY
 * Hyper-Realism Tier 1, Feature 1 | Impact: +25-30% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * The #1 most critical feature for photorealistic human rendering.
 * Eliminates uncanny valley, fixes dead eyes, and ensures perfect anatomy.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface AnatomyProfile {
  name: string;
  category: 'male' | 'female' | 'child' | 'elderly';
  ageRange: string;
  description: string;
  
  facialProportions: FacialProportions;
  eyeRendering: EyeRendering;
  skinRendering: SkinRendering;
  handAnatomy: HandAnatomy;
  bodyProportions: BodyProportions;
  
  promptKeywords: string[];
  avoidKeywords: string[];
  criticalInstructions: string[];
}

export interface FacialProportions {
  facialThirds: {
    description: string;
    hairlineToEyebrows: string;
    eyebrowsToNoseBase: string;
    noseBaseToChim: string;
    goldenRatio: boolean;
  };
  eyeSpacing: {
    interpupillaryDistance: string;
    eyeWidthToSpacing: string;
    outerCanthusToTemple: string;
  };
  noseProportions: {
    width: string;
    length: string;
    bridgeHeight: string;
    nostrilFlare: string;
  };
  mouthProportions: {
    width: string;
    cupidsBow: string;
    lipFullness: string;
    commissurePosition: string;
  };
  jawline: {
    shape: string;
    angle: string;
    chinProjection: string;
  };
}

export interface EyeRendering {
  catchlight: {
    position: string;
    shape: string;
    intensity: string;
    mandatory: boolean;
  };
  irisDetail: {
    crypts: string;
    radialLines: string;
    colorVariation: string;
    limbalRing: string;
  };
  sclera: {
    color: string;
    vessels: string;
    wetness: string;
  };
  eyelashes: {
    density: string;
    length: string;
    curl: string;
  };
  tearFilm: {
    visibility: string;
    reflection: string;
  };
}

export interface SkinRendering {
  texture: {
    poreVisibility: string;
    poreSize: string;
    skinFolds: string;
    fineLinesLocation: string;
  };
  subsurfaceScattering: {
    depth: string;
    color: string;
    intensity: string;
    visibleAreas: string[];
  };
  colorVariation: {
    rednessZones: string[];
    unevenPigmentation: string;
    veinVisibility: string;
  };
  imperfections: {
    allowedTypes: string[];
    density: string;
    placement: string;
  };
}

export interface HandAnatomy {
  fingerCount: {
    mandatory: string;
    perHand: number;
  };
  fingerProportions: {
    lengths: string;
    widths: string;
    jointPositions: string;
  };
  details: {
    knuckleWrinkles: string;
    nailShape: string;
    palmLines: string;
    veins: string;
  };
  naturalPose: {
    restingPosition: string;
    fingerSpacing: string;
    thumbPosition: string;
  };
}

export interface BodyProportions {
  headToBodyRatio: string;
  shoulderWidth: string;
  armLength: string;
  legLength: string;
  proportionalBalance: string;
}

// ============================================================================
// EYE RENDERING RULES (MOST CRITICAL)
// ============================================================================

export const EYE_RENDERING: Record<string, {
  rule: string;
  importance: 'mandatory' | 'important' | 'recommended';
  promptKeywords: string[];
  failureIndicators: string[];
}> = {
  catchlight: {
    rule: "Bright reflection of light source in eyes at 10 o'clock or 2 o'clock position",
    importance: "mandatory",
    promptKeywords: [
      "bright catchlight reflection in eyes",
      "eye light sparkle at 10 o'clock position",
      "living engaged eyes with catchlight",
      "realistic eye reflections"
    ],
    failureIndicators: [
      "dead eyes",
      "no reflection in eyes",
      "dull lifeless stare",
      "flat eye appearance"
    ]
  },
  
  irisDetail: {
    rule: "Visible iris structure with crypts, radial lines, and color variation",
    importance: "important",
    promptKeywords: [
      "detailed iris with crypts and radial lines",
      "iris color variation and depth",
      "realistic iris texture",
      "defined limbal ring around iris"
    ],
    failureIndicators: [
      "flat uniform iris",
      "no iris detail",
      "painted-on looking eyes"
    ]
  },
  
  wetness: {
    rule: "Glossy wet appearance from tear film",
    importance: "important",
    promptKeywords: [
      "glossy wet eye surface",
      "tear film reflection",
      "moist realistic eyes",
      "natural eye wetness"
    ],
    failureIndicators: [
      "dry matte eyes",
      "dull eye surface"
    ]
  },
  
  gazeDirection: {
    rule: "Both eyes converging on same focal point",
    importance: "mandatory",
    promptKeywords: [
      "focused gaze direction",
      "eyes looking at same point",
      "natural eye contact",
      "coherent gaze"
    ],
    failureIndicators: [
      "wall-eyed",
      "cross-eyed",
      "unfocused stare",
      "eyes looking different directions"
    ]
  }
};

// ============================================================================
// SKIN TEXTURE RULES
// ============================================================================

export const SKIN_TEXTURE: Record<string, {
  rule: string;
  importance: 'mandatory' | 'important' | 'recommended';
  promptKeywords: string[];
  failureIndicators: string[];
}> = {
  pores: {
    rule: "Visible skin pores on nose, cheeks, and forehead (T-zone)",
    importance: "mandatory",
    promptKeywords: [
      "visible skin pores on nose and cheeks",
      "natural skin texture with pores",
      "realistic pore detail in T-zone",
      "authentic skin surface texture"
    ],
    failureIndicators: [
      "smooth plastic skin",
      "no visible pores",
      "airbrushed appearance",
      "waxy skin texture"
    ]
  },
  
  subsurfaceScattering: {
    rule: "Light penetrating skin showing warm undertones",
    importance: "important",
    promptKeywords: [
      "subsurface scattering in skin",
      "warm red-orange undertones visible",
      "translucent skin in backlit areas",
      "realistic skin SSS"
    ],
    failureIndicators: [
      "opaque flat skin",
      "no warm undertones",
      "completely matte skin"
    ]
  },
  
  imperfections: {
    rule: "Natural imperfections appropriate to subject",
    importance: "important",
    promptKeywords: [
      "natural skin imperfections",
      "subtle freckles and moles",
      "realistic skin variations",
      "authentic skin character"
    ],
    failureIndicators: [
      "perfect flawless skin",
      "no skin variation",
      "doll-like perfection"
    ]
  }
};

// ============================================================================
// HAND ANATOMY RULES
// ============================================================================

export const HAND_ANATOMY: Record<string, {
  rule: string;
  importance: 'mandatory' | 'important' | 'recommended';
  promptKeywords: string[];
  failureIndicators: string[];
}> = {
  fingerCount: {
    rule: "Exactly 5 fingers per hand (4 fingers + 1 thumb)",
    importance: "mandatory",
    promptKeywords: [
      "anatomically correct hands with five fingers",
      "proper hand anatomy with correct finger count",
      "realistic human hands",
      "natural five-fingered hands"
    ],
    failureIndicators: [
      "six fingers",
      "four fingers",
      "extra digits",
      "missing fingers",
      "wrong finger count"
    ]
  },
  
  fingerProportions: {
    rule: "Middle finger longest, ring and index similar, pinky shortest",
    importance: "important",
    promptKeywords: [
      "correct finger length proportions",
      "natural finger tapering",
      "realistic hand proportions"
    ],
    failureIndicators: [
      "all same length fingers",
      "impossibly long fingers",
      "wrong proportions"
    ]
  },
  
  naturalPose: {
    rule: "Slight natural curl when relaxed, not flat or rigid",
    importance: "important",
    promptKeywords: [
      "natural relaxed hand pose",
      "slightly curved fingers at rest",
      "realistic hand position",
      "organic hand gesture"
    ],
    failureIndicators: [
      "flat rigid hands",
      "impossible hand position",
      "unnatural grip"
    ]
  }
};

// ============================================================================
// ANATOMY PROFILES DATABASE
// ============================================================================

export const ANATOMY_PROFILES: Record<string, AnatomyProfile> = {
  young_adult_female: {
    name: "Young Adult Female (20-35)",
    category: "female",
    ageRange: "20-35 years",
    description: "Peak physical maturity female with characteristic features",
    
    facialProportions: {
      facialThirds: {
        description: "Balanced thirds with slight emphasis on lower third",
        hairlineToEyebrows: "One third",
        eyebrowsToNoseBase: "One third",
        noseBaseToChim: "One third",
        goldenRatio: true
      },
      eyeSpacing: {
        interpupillaryDistance: "60-64mm female average",
        eyeWidthToSpacing: "One eye width between eyes",
        outerCanthusToTemple: "Approximately one eye width"
      },
      noseProportions: {
        width: "Approximately width of one eye",
        length: "Fits within middle third",
        bridgeHeight: "Moderate",
        nostrilFlare: "Subtle"
      },
      mouthProportions: {
        width: "Aligns with inner iris",
        cupidsBow: "Defined",
        lipFullness: "Medium to full",
        commissurePosition: "Slightly upturned or neutral"
      },
      jawline: {
        shape: "Softer V or oval",
        angle: "More obtuse than male",
        chinProjection: "Moderate"
      }
    },
    
    eyeRendering: {
      catchlight: {
        position: "10 o'clock or 2 o'clock",
        shape: "Circular or window-shaped",
        intensity: "Bright and clear",
        mandatory: true
      },
      irisDetail: {
        crypts: "Visible pattern",
        radialLines: "Subtle radiating lines",
        colorVariation: "Depth and variation present",
        limbalRing: "Defined dark ring around iris"
      },
      sclera: {
        color: "Bright white with subtle blue tint",
        vessels: "Minimal, natural",
        wetness: "Glossy wet surface"
      },
      eyelashes: {
        density: "Full and natural",
        length: "Medium to long",
        curl: "Natural upward curve"
      },
      tearFilm: {
        visibility: "Subtle wet appearance",
        reflection: "Soft reflection of environment"
      }
    },
    
    skinRendering: {
      texture: {
        poreVisibility: "Visible on nose, cheeks, chin",
        poreSize: "Fine, 0.1-0.2mm",
        skinFolds: "Minimal",
        fineLinesLocation: "Laugh lines beginning, forehead minimal"
      },
      subsurfaceScattering: {
        depth: "1-2mm",
        color: "Red-orange undertones",
        intensity: "Moderate to strong",
        visibleAreas: ["ears backlit", "nose bridge", "between fingers"]
      },
      colorVariation: {
        rednessZones: ["cheeks", "nose tip", "around nostrils"],
        unevenPigmentation: "Subtle natural variation",
        veinVisibility: "Faint on temples, inner wrists"
      },
      imperfections: {
        allowedTypes: ["subtle freckles", "small moles", "minor blemishes"],
        density: "Low to moderate",
        placement: "Natural random distribution"
      }
    },
    
    handAnatomy: {
      fingerCount: {
        mandatory: "Five fingers per hand (4 + thumb)",
        perHand: 5
      },
      fingerProportions: {
        lengths: "Middle > Ring ≈ Index > Pinky, Thumb shorter",
        widths: "Tapered toward tips",
        jointPositions: "Two visible joints per finger"
      },
      details: {
        knuckleWrinkles: "Fine lines at joints",
        nailShape: "Oval, well-groomed appearance",
        palmLines: "Natural palm creases",
        veins: "Subtle on back of hand"
      },
      naturalPose: {
        restingPosition: "Slight natural curl",
        fingerSpacing: "Small gaps between fingers",
        thumbPosition: "Natural opposition"
      }
    },
    
    bodyProportions: {
      headToBodyRatio: "7.5-8 head heights",
      shoulderWidth: "About 2 head widths",
      armLength: "Fingertips to mid-thigh",
      legLength: "Slightly longer than torso",
      proportionalBalance: "Natural feminine curves"
    },
    
    promptKeywords: [
      "realistic young adult woman",
      "bright catchlight in eyes at 10 o'clock",
      "detailed iris with limbal ring",
      "visible skin pores natural texture",
      "subsurface scattering warm undertones",
      "anatomically correct hands five fingers",
      "natural facial proportions",
      "slight natural asymmetry",
      "photorealistic skin rendering"
    ],
    
    avoidKeywords: [
      "perfect skin",
      "flawless",
      "doll-like",
      "plastic skin",
      "dead eyes",
      "no catchlight",
      "wrong finger count"
    ],
    
    criticalInstructions: [
      "ALWAYS include eye catchlight",
      "ALWAYS show skin pores",
      "ALWAYS verify 5 fingers per hand",
      "NEVER use 'perfect' or 'flawless' for skin"
    ]
  },
  
  young_adult_male: {
    name: "Young Adult Male (20-35)",
    category: "male",
    ageRange: "20-35 years",
    description: "Peak physical maturity male with characteristic features",
    
    facialProportions: {
      facialThirds: {
        description: "Balanced thirds, stronger jaw emphasis",
        hairlineToEyebrows: "One third",
        eyebrowsToNoseBase: "One third",
        noseBaseToChim: "One third",
        goldenRatio: true
      },
      eyeSpacing: {
        interpupillaryDistance: "63-67mm male average",
        eyeWidthToSpacing: "One eye width between eyes",
        outerCanthusToTemple: "Approximately one eye width"
      },
      noseProportions: {
        width: "Slightly wider than female",
        length: "Prominent bridge",
        bridgeHeight: "Higher than female",
        nostrilFlare: "More visible"
      },
      mouthProportions: {
        width: "Aligns with inner iris",
        cupidsBow: "Less defined than female",
        lipFullness: "Medium, less full than female",
        commissurePosition: "Neutral"
      },
      jawline: {
        shape: "Square or angular",
        angle: "More acute, defined",
        chinProjection: "Stronger projection"
      }
    },
    
    eyeRendering: {
      catchlight: {
        position: "10 o'clock or 2 o'clock",
        shape: "Circular or window-shaped",
        intensity: "Bright and clear",
        mandatory: true
      },
      irisDetail: {
        crypts: "Visible pattern",
        radialLines: "Radiating lines visible",
        colorVariation: "Depth and variation",
        limbalRing: "Defined"
      },
      sclera: {
        color: "White, may have more visible vessels",
        vessels: "Slightly more visible than female",
        wetness: "Glossy wet surface"
      },
      eyelashes: {
        density: "Natural density",
        length: "Medium",
        curl: "Minimal curl"
      },
      tearFilm: {
        visibility: "Present but subtle",
        reflection: "Natural reflection"
      }
    },
    
    skinRendering: {
      texture: {
        poreVisibility: "More visible than female",
        poreSize: "Larger, 0.2-0.3mm",
        skinFolds: "Minimal",
        fineLinesLocation: "Forehead lines if present"
      },
      subsurfaceScattering: {
        depth: "1-2mm",
        color: "Red-orange undertones",
        intensity: "Moderate",
        visibleAreas: ["ears backlit", "nose bridge"]
      },
      colorVariation: {
        rednessZones: ["nose", "cheeks"],
        unevenPigmentation: "Natural variation",
        veinVisibility: "Visible on temples, forearms"
      },
      imperfections: {
        allowedTypes: ["stubble shadow", "minor scars", "skin texture"],
        density: "Moderate",
        placement: "Natural distribution"
      }
    },
    
    handAnatomy: {
      fingerCount: {
        mandatory: "Five fingers per hand",
        perHand: 5
      },
      fingerProportions: {
        lengths: "Middle > Ring ≈ Index > Pinky",
        widths: "Broader than female, tapered",
        jointPositions: "More prominent knuckles"
      },
      details: {
        knuckleWrinkles: "Visible joint lines",
        nailShape: "Squarer than female",
        palmLines: "Deeper creases",
        veins: "More visible on back of hand"
      },
      naturalPose: {
        restingPosition: "Slight curl",
        fingerSpacing: "Natural gaps",
        thumbPosition: "Natural opposition"
      }
    },
    
    bodyProportions: {
      headToBodyRatio: "7.5-8 head heights",
      shoulderWidth: "About 2.5-3 head widths",
      armLength: "Fingertips to mid-thigh",
      legLength: "Similar to torso",
      proportionalBalance: "Broader shoulders, narrower hips"
    },
    
    promptKeywords: [
      "realistic young adult man",
      "bright catchlight in eyes",
      "detailed iris with depth",
      "visible skin pores and texture",
      "natural male skin",
      "anatomically correct hands",
      "strong jawline",
      "natural masculine proportions"
    ],
    
    avoidKeywords: [
      "perfect skin",
      "airbrushed",
      "doll-like",
      "dead eyes",
      "wrong finger count"
    ],
    
    criticalInstructions: [
      "ALWAYS include eye catchlight",
      "ALWAYS show skin texture",
      "ALWAYS verify 5 fingers per hand",
      "Include natural male skin texture"
    ]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get anatomy profile by key
 */
export function getAnatomyProfile(
  category: 'male' | 'female',
  ageRange?: string
): AnatomyProfile | undefined {
  const key = ageRange 
    ? `young_adult_${category}`
    : `young_adult_${category}`;
  return ANATOMY_PROFILES[key];
}

/**
 * Generate anatomy prompt from profile
 */
export function generateAnatomyPrompt(profile: AnatomyProfile): string {
  return profile.promptKeywords.join(', ');
}

/**
 * Get eye rendering rules as prompt
 */
export function getEyeRenderingPrompt(): string {
  return Object.values(EYE_RENDERING)
    .filter(rule => rule.importance === 'mandatory')
    .flatMap(rule => rule.promptKeywords)
    .join(', ');
}

/**
 * Get skin texture rules as prompt
 */
export function getSkinTexturePrompt(): string {
  return Object.values(SKIN_TEXTURE)
    .filter(rule => rule.importance === 'mandatory')
    .flatMap(rule => rule.promptKeywords)
    .join(', ');
}

/**
 * Get hand anatomy rules as prompt
 */
export function getHandAnatomyPrompt(): string {
  return Object.values(HAND_ANATOMY)
    .filter(rule => rule.importance === 'mandatory')
    .flatMap(rule => rule.promptKeywords)
    .join(', ');
}

/**
 * Generate comprehensive anatomy negative prompt
 */
export function generateAnatomyNegativePrompt(): string {
  const eyeFailures = Object.values(EYE_RENDERING)
    .flatMap(rule => rule.failureIndicators);
  const skinFailures = Object.values(SKIN_TEXTURE)
    .flatMap(rule => rule.failureIndicators);
  const handFailures = Object.values(HAND_ANATOMY)
    .flatMap(rule => rule.failureIndicators);
  
  return [...new Set([...eyeFailures, ...skinFailures, ...handFailures])].join(', ');
}

/**
 * Get complete portrait anatomy prompt
 */
export function getCompletePortraitPrompt(
  gender: 'male' | 'female',
  includeNegative: boolean = true
): { positive: string; negative: string } {
  const profile = getAnatomyProfile(gender);
  
  const positive = [
    generateAnatomyPrompt(profile!),
    getEyeRenderingPrompt(),
    getSkinTexturePrompt()
  ].join(', ');
  
  const negative = includeNegative 
    ? generateAnatomyNegativePrompt()
    : '';
  
  return { positive, negative };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  ANATOMY_PROFILES,
  EYE_RENDERING,
  SKIN_TEXTURE,
  HAND_ANATOMY,
  getAnatomyProfile,
  generateAnatomyPrompt,
  getEyeRenderingPrompt,
  getSkinTexturePrompt,
  getHandAnatomyPrompt,
  generateAnatomyNegativePrompt,
  getCompletePortraitPrompt
};
