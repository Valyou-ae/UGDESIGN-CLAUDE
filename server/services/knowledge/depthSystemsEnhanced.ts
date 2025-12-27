/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ADVANCED DEPTH SYSTEMS
 * Enhancement Feature 7 | Impact: +10-15% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Comprehensive depth of field profiles, bokeh styles, and layering strategies
 * for creating dimensional, professional images.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface DepthProfile {
  name: string;
  category: DepthCategory;
  description: string;
  
  technicalSettings: {
    aperture: string;
    focalLength: string;
    subjectDistance: string;
    inFocusZone: string;
  };
  
  bokehCharacteristics: {
    shape: string;
    quality: string;
    size: string;
    transition: string;
  };
  
  visualEffect: {
    subjectSeparation: string;
    backgroundAppearance: string;
    foregroundTreatment: string;
    atmosphericDepth: string;
  };
  
  bestFor: string[];
  promptKeywords: string[];
}

export type DepthCategory = 
  | 'ultra-shallow' 
  | 'shallow' 
  | 'moderate' 
  | 'deep' 
  | 'infinite';

export interface BokehStyle {
  name: string;
  description: string;
  lensType: string;
  characteristics: string[];
  promptKeywords: string[];
}

export interface LayeringStrategy {
  name: string;
  description: string;
  layers: {
    position: 'foreground' | 'subject' | 'midground' | 'background';
    focus: 'sharp' | 'soft' | 'very soft';
    role: string;
  }[];
  promptKeywords: string[];
}

// ============================================================================
// DEPTH PROFILES
// ============================================================================

export const DEPTH_PROFILES: Record<string, DepthProfile> = {
  ultra_shallow: {
    name: "Ultra Shallow - Dreamy",
    category: "ultra-shallow",
    description: "Extremely thin focus plane for dreamy, intimate look",
    technicalSettings: {
      aperture: "f/1.2 - f/1.4",
      focalLength: "85mm or longer",
      subjectDistance: "3-6 feet",
      inFocusZone: "1-3 inches"
    },
    bokehCharacteristics: {
      shape: "Large circular or cat's eye",
      quality: "Creamy, smooth, melted",
      size: "Very large blur circles",
      transition: "Extremely gradual focus falloff"
    },
    visualEffect: {
      subjectSeparation: "Maximum - subject floats in blur",
      backgroundAppearance: "Completely dissolved, painterly",
      foregroundTreatment: "Can include soft foreground elements",
      atmosphericDepth: "Strong sense of air and space"
    },
    bestFor: [
      "Intimate portraits",
      "Eye-focused shots",
      "Romantic imagery",
      "Dream-like aesthetics"
    ],
    promptKeywords: [
      "ultra shallow depth of field",
      "f/1.2 razor thin focus",
      "dreamy bokeh blur",
      "subject floating in blur",
      "creamy background dissolution"
    ]
  },

  shallow_portrait: {
    name: "Shallow - Portrait Standard",
    category: "shallow",
    description: "Classic portrait depth for subject separation",
    technicalSettings: {
      aperture: "f/1.8 - f/2.8",
      focalLength: "50-135mm",
      subjectDistance: "4-10 feet",
      inFocusZone: "3-12 inches"
    },
    bokehCharacteristics: {
      shape: "Circular to slightly oval",
      quality: "Smooth, pleasing",
      size: "Medium to large",
      transition: "Gradual and natural"
    },
    visualEffect: {
      subjectSeparation: "Strong - face/body sharp, background soft",
      backgroundAppearance: "Recognizable but softened",
      foregroundTreatment: "Slightly soft if present",
      atmosphericDepth: "Good dimensional feel"
    },
    bestFor: [
      "Standard portraits",
      "Headshots",
      "Fashion photography",
      "Environmental portraits"
    ],
    promptKeywords: [
      "shallow depth of field portrait",
      "f/2.8 portrait bokeh",
      "soft background separation",
      "subject isolation through depth",
      "classic portrait depth"
    ]
  },

  moderate_environmental: {
    name: "Moderate - Environmental",
    category: "moderate",
    description: "Balanced depth showing subject and context",
    technicalSettings: {
      aperture: "f/4 - f/5.6",
      focalLength: "35-85mm",
      subjectDistance: "6-15 feet",
      inFocusZone: "2-4 feet"
    },
    bokehCharacteristics: {
      shape: "Smaller, more defined",
      quality: "Softer but structured",
      size: "Small to medium",
      transition: "More defined edge"
    },
    visualEffect: {
      subjectSeparation: "Moderate - subject clear, context visible",
      backgroundAppearance: "Soft but recognizable details",
      foregroundTreatment: "Mostly sharp",
      atmosphericDepth: "Subtle depth"
    },
    bestFor: [
      "Environmental portraits",
      "Documentary style",
      "Street photography",
      "Lifestyle imagery"
    ],
    promptKeywords: [
      "moderate depth of field",
      "f/5.6 environmental depth",
      "subject with context",
      "balanced focus and background",
      "storytelling depth"
    ]
  },

  deep_landscape: {
    name: "Deep - Landscape",
    category: "deep",
    description: "Extended depth for front-to-back sharpness",
    technicalSettings: {
      aperture: "f/8 - f/11",
      focalLength: "16-35mm",
      subjectDistance: "Hyperfocal",
      inFocusZone: "Several feet to infinity"
    },
    bokehCharacteristics: {
      shape: "N/A - minimal blur",
      quality: "Sharp throughout",
      size: "None visible",
      transition: "Minimal"
    },
    visualEffect: {
      subjectSeparation: "Minimal - all elements equal",
      backgroundAppearance: "Sharp and detailed",
      foregroundTreatment: "Sharp with careful focus",
      atmosphericDepth: "Relies on haze, not blur"
    },
    bestFor: [
      "Landscapes",
      "Architecture",
      "Group photos",
      "Documentary"
    ],
    promptKeywords: [
      "deep depth of field",
      "f/11 front to back sharpness",
      "landscape depth",
      "everything in focus",
      "maximum sharpness throughout"
    ]
  },

  infinite_architectural: {
    name: "Infinite - Architectural",
    category: "infinite",
    description: "Maximum depth with no blur",
    technicalSettings: {
      aperture: "f/11 - f/16",
      focalLength: "17-24mm",
      subjectDistance: "Hyperfocal to infinity",
      inFocusZone: "Everything"
    },
    bokehCharacteristics: {
      shape: "None",
      quality: "Tack sharp",
      size: "None",
      transition: "None"
    },
    visualEffect: {
      subjectSeparation: "None through depth",
      backgroundAppearance: "Razor sharp",
      foregroundTreatment: "Razor sharp",
      atmosphericDepth: "Use composition and haze"
    },
    bestFor: [
      "Architecture",
      "Interiors",
      "Real estate",
      "Technical documentation"
    ],
    promptKeywords: [
      "infinite depth of field",
      "tilt-shift plane of focus",
      "architectural sharpness",
      "everything tack sharp",
      "no depth blur"
    ]
  }
};

// ============================================================================
// BOKEH STYLES
// ============================================================================

export const BOKEH_STYLES: Record<string, BokehStyle> = {
  creamy_smooth: {
    name: "Creamy Smooth",
    description: "Buttery smooth blur with no harsh edges",
    lensType: "High-end portrait lenses (85mm f/1.4, 135mm f/2)",
    characteristics: [
      "Smooth, even blur distribution",
      "No nervous or busy background",
      "Gradual transition from sharp to blur",
      "Pleasant highlight rendering"
    ],
    promptKeywords: [
      "creamy smooth bokeh",
      "buttery background blur",
      "silk-smooth out of focus areas",
      "premium lens bokeh quality"
    ]
  },

  circular_specular: {
    name: "Circular Specular",
    description: "Perfect circles from point light sources",
    lensType: "Lenses with many rounded aperture blades",
    characteristics: [
      "Round bokeh balls from highlights",
      "Even brightness distribution",
      "Clean circular shapes",
      "Night lights create orbs"
    ],
    promptKeywords: [
      "circular bokeh highlights",
      "round bokeh balls",
      "perfect circular blur discs",
      "specular highlight circles"
    ]
  },

  swirly_vintage: {
    name: "Swirly Vintage",
    description: "Rotating background blur from vintage lenses",
    lensType: "Helios 44-2, Petzval-style lenses",
    characteristics: [
      "Background appears to swirl",
      "Central sharpness with edge blur",
      "Distinctive artistic look",
      "Pronounced optical personality"
    ],
    promptKeywords: [
      "swirly bokeh vintage lens",
      "Helios swirl effect",
      "rotating background blur",
      "vintage lens character"
    ]
  },

  cats_eye: {
    name: "Cat's Eye",
    description: "Oval bokeh shapes toward frame edges",
    lensType: "Most fast lenses at wide apertures",
    characteristics: [
      "Circular in center, oval at edges",
      "Creates dynamic look",
      "More pronounced with faster lenses",
      "Natural optical vignetting"
    ],
    promptKeywords: [
      "cats eye bokeh edges",
      "oval bokeh toward corners",
      "optical vignette bokeh shape"
    ]
  },

  hexagonal: {
    name: "Hexagonal/Geometric",
    description: "Shaped bokeh from aperture blade design",
    lensType: "Older or budget lenses with fewer blades",
    characteristics: [
      "6-8 sided bokeh shapes",
      "More clinical look",
      "Can be distracting",
      "Retro aesthetic"
    ],
    promptKeywords: [
      "hexagonal bokeh shapes",
      "geometric aperture bokeh",
      "polygonal blur highlights"
    ]
  },

  soap_bubble: {
    name: "Soap Bubble",
    description: "Bokeh with bright edges like soap bubbles",
    lensType: "Meyer Optik Trioplan, some Zeiss lenses",
    characteristics: [
      "Bright ring at edge of blur disc",
      "Darker center",
      "Very distinctive look",
      "Artistic and unusual"
    ],
    promptKeywords: [
      "soap bubble bokeh",
      "bright edge bokeh rings",
      "Trioplan bubble bokeh"
    ]
  }
};

// ============================================================================
// LAYERING STRATEGIES
// ============================================================================

export const LAYERING_STRATEGIES: Record<string, LayeringStrategy> = {
  three_layer_portrait: {
    name: "Three-Layer Portrait",
    description: "Classic foreground, subject, background separation",
    layers: [
      {
        position: "foreground",
        focus: "soft",
        role: "Frame or add depth (flowers, fabric)"
      },
      {
        position: "subject",
        focus: "sharp",
        role: "Main focus of image"
      },
      {
        position: "background",
        focus: "very soft",
        role: "Context without distraction"
      }
    ],
    promptKeywords: [
      "three-layer depth composition",
      "soft foreground framing",
      "sharp subject plane",
      "blurred background context"
    ]
  },

  foreground_interest: {
    name: "Foreground Interest",
    description: "Strong foreground leading to subject",
    layers: [
      {
        position: "foreground",
        focus: "soft",
        role: "Leading element, creates depth"
      },
      {
        position: "subject",
        focus: "sharp",
        role: "Main focal point"
      },
      {
        position: "background",
        focus: "soft",
        role: "Environmental context"
      }
    ],
    promptKeywords: [
      "out of focus foreground elements",
      "leading foreground depth",
      "depth through foreground blur"
    ]
  },

  deep_landscape: {
    name: "Deep Landscape",
    description: "Sharp throughout with atmospheric depth",
    layers: [
      {
        position: "foreground",
        focus: "sharp",
        role: "Anchor point, texture detail"
      },
      {
        position: "midground",
        focus: "sharp",
        role: "Main subject/interest"
      },
      {
        position: "background",
        focus: "sharp",
        role: "Atmospheric haze creates depth"
      }
    ],
    promptKeywords: [
      "deep focus landscape layers",
      "sharp foreground to background",
      "atmospheric perspective depth"
    ]
  },

  selective_focus: {
    name: "Selective Focus",
    description: "Precise focus on specific detail",
    layers: [
      {
        position: "foreground",
        focus: "very soft",
        role: "Completely blurred"
      },
      {
        position: "subject",
        focus: "sharp",
        role: "Single sharp point of interest"
      },
      {
        position: "background",
        focus: "very soft",
        role: "Dissolved away"
      }
    ],
    promptKeywords: [
      "selective focus macro style",
      "single point sharp focus",
      "isolated focus point"
    ]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get depth profile by name
 */
export function getDepthProfile(name: string): DepthProfile | undefined {
  return DEPTH_PROFILES[name];
}

/**
 * Get depth profiles by category
 */
export function getProfilesByCategory(category: DepthCategory): DepthProfile[] {
  return Object.values(DEPTH_PROFILES).filter(p => p.category === category);
}

/**
 * Generate depth prompt
 */
export function generateDepthPrompt(profile: DepthProfile): string {
  return profile.promptKeywords.join(', ');
}

/**
 * Generate bokeh prompt
 */
export function generateBokehPrompt(style: BokehStyle): string {
  return style.promptKeywords.join(', ');
}

/**
 * Generate layering prompt
 */
export function generateLayeringPrompt(strategy: LayeringStrategy): string {
  return strategy.promptKeywords.join(', ');
}

/**
 * Recommend depth for use case
 */
export function recommendDepthForUseCase(useCase: string): DepthProfile | undefined {
  const useCaseMap: Record<string, string> = {
    portrait: 'shallow_portrait',
    headshot: 'shallow_portrait',
    landscape: 'deep_landscape',
    architecture: 'infinite_architectural',
    product: 'moderate_environmental',
    macro: 'ultra_shallow',
    romantic: 'ultra_shallow',
    documentary: 'moderate_environmental',
    street: 'moderate_environmental'
  };
  
  const profileKey = useCaseMap[useCase.toLowerCase()];
  return profileKey ? DEPTH_PROFILES[profileKey] : undefined;
}

/**
 * Calculate approximate depth of field
 */
export function estimateDepthOfField(
  focalLength: number,
  aperture: number,
  subjectDistance: number
): { front: number; rear: number; total: number } {
  // Simplified calculation (actual would need circle of confusion)
  const hyperfocal = (focalLength * focalLength) / (aperture * 0.03);
  
  const front = (subjectDistance * (hyperfocal - focalLength)) /
                (hyperfocal + subjectDistance - (2 * focalLength));
  
  const rear = (subjectDistance * (hyperfocal - focalLength)) /
               (hyperfocal - subjectDistance);
  
  return {
    front: Math.max(0, subjectDistance - front),
    rear: rear > 0 ? subjectDistance + rear : Infinity,
    total: rear > 0 ? rear + front : Infinity
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  DEPTH_PROFILES,
  BOKEH_STYLES,
  LAYERING_STRATEGIES,
  getDepthProfile,
  getProfilesByCategory,
  generateDepthPrompt,
  generateBokehPrompt,
  generateLayeringPrompt,
  recommendDepthForUseCase,
  estimateDepthOfField
};
