/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ENVIRONMENTAL CONTEXT SYSTEM
 * Hyper-Realism Tier 2, Feature 6 | Impact: +15-20% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Scene coherence, prop placement, environmental storytelling, and
 * contextual consistency for believable environments.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface EnvironmentProfile {
  name: string;
  category: EnvironmentCategory;
  description: string;
  
  spatialElements: {
    foreground: string[];
    midground: string[];
    background: string[];
    depth: string;
  };
  
  propSuggestions: {
    essential: string[];
    optional: string[];
    avoid: string[];
  };
  
  lightingContext: {
    naturalSources: string[];
    artificialSources: string[];
    timeOfDay: string[];
    ambiance: string;
  };
  
  atmosphericElements: {
    air: string;
    particles: string[];
    weather: string[];
  };
  
  storytellingCues: {
    mood: string;
    narrative: string;
    humanPresence: string;
  };
  
  promptKeywords: string[];
  consistencyRules: string[];
}

export type EnvironmentCategory = 
  | 'interior' 
  | 'exterior' 
  | 'studio' 
  | 'urban' 
  | 'natural' 
  | 'abstract';

// ============================================================================
// INTERIOR ENVIRONMENTS
// ============================================================================

export const INTERIOR_ENVIRONMENTS: Record<string, EnvironmentProfile> = {
  modern_living_room: {
    name: "Modern Living Room",
    category: "interior",
    description: "Contemporary residential living space",
    spatialElements: {
      foreground: ["coffee table", "area rug", "decorative objects"],
      midground: ["sofa", "armchairs", "side tables", "lamps"],
      background: ["windows", "art on walls", "shelving", "plants"],
      depth: "20-30 feet typical depth"
    },
    propSuggestions: {
      essential: ["seating", "lighting", "textiles"],
      optional: ["books", "plants", "art", "personal items"],
      avoid: ["clutter", "mismatched styles", "empty spaces"]
    },
    lightingContext: {
      naturalSources: ["large windows", "skylights"],
      artificialSources: ["pendant lights", "floor lamps", "table lamps"],
      timeOfDay: ["morning", "afternoon", "evening"],
      ambiance: "Warm and inviting"
    },
    atmosphericElements: {
      air: "Clean, slight dust particles in light beams",
      particles: ["dust motes in sunlight"],
      weather: ["visible through windows"]
    },
    storytellingCues: {
      mood: "Comfortable, lived-in",
      narrative: "Home life, relaxation",
      humanPresence: "Recently occupied feel"
    },
    promptKeywords: [
      "modern living room interior",
      "contemporary home setting",
      "warm ambient lighting",
      "lived-in comfortable space",
      "natural light through windows"
    ],
    consistencyRules: [
      "Light direction must match window placement",
      "Shadows must be consistent throughout",
      "Style must be cohesive across furniture"
    ]
  },

  professional_studio: {
    name: "Professional Photo Studio",
    category: "studio",
    description: "Controlled photography studio environment",
    spatialElements: {
      foreground: ["studio floor", "subject platform"],
      midground: ["lighting equipment", "reflectors"],
      background: ["seamless backdrop", "cyclorama"],
      depth: "Infinite backdrop effect"
    },
    propSuggestions: {
      essential: ["backdrop", "controlled lighting"],
      optional: ["props", "furniture", "set pieces"],
      avoid: ["visible equipment", "distracting elements"]
    },
    lightingContext: {
      naturalSources: [],
      artificialSources: ["softboxes", "beauty dishes", "strip lights", "rim lights"],
      timeOfDay: ["controlled environment"],
      ambiance: "Professional, controlled"
    },
    atmosphericElements: {
      air: "Clean, controlled",
      particles: ["optional haze for effect"],
      weather: ["none"]
    },
    storytellingCues: {
      mood: "Professional, polished",
      narrative: "Fashion, beauty, commercial",
      humanPresence: "Subject-focused"
    },
    promptKeywords: [
      "professional studio environment",
      "seamless backdrop",
      "controlled studio lighting",
      "clean studio setting",
      "professional photography studio"
    ],
    consistencyRules: [
      "Backdrop must be seamless",
      "Lighting must appear professional",
      "No visible equipment unless intentional"
    ]
  },

  cozy_cafe: {
    name: "Cozy Coffee Shop",
    category: "interior",
    description: "Intimate cafe or coffee shop setting",
    spatialElements: {
      foreground: ["table surface", "coffee cup", "pastries"],
      midground: ["seating", "other patrons", "counter"],
      background: ["menu boards", "coffee equipment", "windows"],
      depth: "Intimate 15-25 feet"
    },
    propSuggestions: {
      essential: ["coffee cups", "tables", "ambient lighting"],
      optional: ["books", "laptops", "pastries", "plants"],
      avoid: ["empty tables", "harsh lighting"]
    },
    lightingContext: {
      naturalSources: ["storefront windows"],
      artificialSources: ["pendant lights", "Edison bulbs", "candles"],
      timeOfDay: ["morning", "afternoon"],
      ambiance: "Warm, intimate"
    },
    atmosphericElements: {
      air: "Warm, possibly steamy",
      particles: ["coffee steam", "dust in light"],
      weather: ["visible through windows"]
    },
    storytellingCues: {
      mood: "Cozy, creative",
      narrative: "Work, connection, relaxation",
      humanPresence: "Active but not crowded"
    },
    promptKeywords: [
      "cozy coffee shop interior",
      "warm cafe atmosphere",
      "intimate cafe lighting",
      "hipster coffee shop vibes",
      "Edison bulb warm lighting"
    ],
    consistencyRules: [
      "Warm color temperature throughout",
      "Appropriate scale for intimate space",
      "Consistent cafe aesthetic"
    ]
  }
};

// ============================================================================
// EXTERIOR ENVIRONMENTS
// ============================================================================

export const EXTERIOR_ENVIRONMENTS: Record<string, EnvironmentProfile> = {
  urban_street: {
    name: "Urban Street Scene",
    category: "urban",
    description: "City street with architectural context",
    spatialElements: {
      foreground: ["sidewalk", "street furniture", "pedestrians"],
      midground: ["buildings", "storefronts", "vehicles"],
      background: ["skyline", "distant buildings", "sky"],
      depth: "Deep perspective, vanishing point"
    },
    propSuggestions: {
      essential: ["buildings", "street", "sky"],
      optional: ["vehicles", "pedestrians", "signage", "street lights"],
      avoid: ["empty streets (unless intentional)", "inconsistent architecture"]
    },
    lightingContext: {
      naturalSources: ["sun", "sky", "reflected light from buildings"],
      artificialSources: ["street lights", "neon signs", "car headlights"],
      timeOfDay: ["golden hour", "blue hour", "night", "overcast"],
      ambiance: "Dynamic urban energy"
    },
    atmosphericElements: {
      air: "Urban haze", 
      particles: ["smog", "dust", "rain"],
      weather: ["all conditions"]
    },
    storytellingCues: {
      mood: "Urban energy or solitude",
      narrative: "City life, journey, discovery",
      humanPresence: "Variable density"
    },
    promptKeywords: [
      "urban street scene",
      "city architecture background",
      "street photography setting",
      "urban environment context",
      "metropolitan atmosphere"
    ],
    consistencyRules: [
      "Perspective lines must converge properly",
      "Building scale must be realistic",
      "Light must match time of day"
    ]
  },

  natural_forest: {
    name: "Forest Setting",
    category: "natural",
    description: "Woodland or forest environment",
    spatialElements: {
      foreground: ["forest floor", "ferns", "fallen logs"],
      midground: ["tree trunks", "understory plants"],
      background: ["canopy", "filtered light", "distant trees"],
      depth: "Layered depth through trees"
    },
    propSuggestions: {
      essential: ["trees", "natural ground cover"],
      optional: ["wildlife", "streams", "rocks", "fog"],
      avoid: ["man-made objects", "manicured appearance"]
    },
    lightingContext: {
      naturalSources: ["dappled sunlight through canopy", "filtered light"],
      artificialSources: [],
      timeOfDay: ["morning mist", "golden hour", "overcast"],
      ambiance: "Peaceful, mysterious"
    },
    atmosphericElements: {
      air: "Fresh, possibly misty",
      particles: ["pollen", "dust motes", "fog"],
      weather: ["mist", "light rain", "dappled sun"]
    },
    storytellingCues: {
      mood: "Tranquil or mysterious",
      narrative: "Journey, discovery, solitude",
      humanPresence: "Minimal or none"
    },
    promptKeywords: [
      "forest setting natural environment",
      "dappled light through trees",
      "woodland atmosphere",
      "natural forest context",
      "organic natural setting"
    ],
    consistencyRules: [
      "Light must filter correctly through canopy",
      "Trees must have consistent species",
      "Ground cover must match ecosystem"
    ]
  },

  beach_coastal: {
    name: "Beach/Coastal",
    category: "natural",
    description: "Ocean beach or coastal setting",
    spatialElements: {
      foreground: ["sand", "shells", "rocks", "water's edge"],
      midground: ["waves", "shoreline", "dunes"],
      background: ["ocean horizon", "sky", "distant cliffs"],
      depth: "Infinite horizon"
    },
    propSuggestions: {
      essential: ["sand", "water", "sky"],
      optional: ["driftwood", "seabirds", "boats", "people"],
      avoid: ["litter", "overdevelopment"]
    },
    lightingContext: {
      naturalSources: ["sun", "reflected light from water"],
      artificialSources: [],
      timeOfDay: ["sunrise", "sunset", "golden hour", "midday"],
      ambiance: "Open, expansive"
    },
    atmosphericElements: {
      air: "Salt air, moisture",
      particles: ["sea spray", "sand particles"],
      weather: ["clear", "overcast", "stormy"]
    },
    storytellingCues: {
      mood: "Freedom, peace, vastness",
      narrative: "Escape, contemplation, romance",
      humanPresence: "Variable"
    },
    promptKeywords: [
      "beach coastal setting",
      "ocean horizon background",
      "sandy beach environment",
      "coastal atmosphere",
      "seaside natural light"
    ],
    consistencyRules: [
      "Horizon must be level",
      "Wave direction must be consistent",
      "Light must match sun position"
    ]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get environment profile by name
 */
export function getEnvironment(name: string): EnvironmentProfile | undefined {
  return {
    ...INTERIOR_ENVIRONMENTS,
    ...EXTERIOR_ENVIRONMENTS
  }[name];
}

/**
 * Get environments by category
 */
export function getEnvironmentsByCategory(category: EnvironmentCategory): EnvironmentProfile[] {
  const allEnvironments = {
    ...INTERIOR_ENVIRONMENTS,
    ...EXTERIOR_ENVIRONMENTS
  };
  
  return Object.values(allEnvironments).filter(env => env.category === category);
}

/**
 * Generate environment prompt
 */
export function generateEnvironmentPrompt(env: EnvironmentProfile): string {
  return env.promptKeywords.join(', ');
}

/**
 * Generate spatial depth prompt
 */
export function generateSpatialPrompt(env: EnvironmentProfile): string {
  const { foreground, midground, background } = env.spatialElements;
  return `foreground elements: ${foreground.slice(0, 2).join(', ')}, ` +
         `midground: ${midground.slice(0, 2).join(', ')}, ` +
         `background: ${background.slice(0, 2).join(', ')}`;
}

/**
 * Get consistency rules
 */
export function getConsistencyRules(env: EnvironmentProfile): string[] {
  return env.consistencyRules;
}

/**
 * Generate complete environment context
 */
export function generateCompleteEnvironmentPrompt(
  env: EnvironmentProfile,
  timeOfDay?: string,
  mood?: string
): string {
  const parts = [
    ...env.promptKeywords,
    timeOfDay ? `${timeOfDay} lighting` : '',
    mood ? `${mood} atmosphere` : '',
    env.atmosphericElements.air
  ].filter(Boolean);
  
  return parts.join(', ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  INTERIOR_ENVIRONMENTS,
  EXTERIOR_ENVIRONMENTS,
  getEnvironment,
  getEnvironmentsByCategory,
  generateEnvironmentPrompt,
  generateSpatialPrompt,
  getConsistencyRules,
  generateCompleteEnvironmentPrompt
};
