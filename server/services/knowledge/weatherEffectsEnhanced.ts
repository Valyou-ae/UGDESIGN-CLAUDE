/**
 * ═══════════════════════════════════════════════════════════════════════════
 * WEATHER & ATMOSPHERIC EFFECTS
 * Enhancement Feature 8 | Impact: +10-15% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Comprehensive weather conditions and atmospheric effects for environmental
 * authenticity and mood creation.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface WeatherCondition {
  name: string;
  category: WeatherCategory;
  description: string;
  
  visualCharacteristics: {
    skyAppearance: string;
    lightQuality: string;
    colorTemperature: string;
    visibility: string;
    shadows: string;
  };
  
  atmosphericEffects: {
    particles: string;
    haze: string;
    reflections: string;
    moisture: string;
  };
  
  moodImpact: {
    primaryMood: string;
    secondaryMoods: string[];
    energyLevel: 'high' | 'medium' | 'low';
  };
  
  technicalConsiderations: {
    exposure: string;
    whiteBalance: string;
    contrastHandling: string;
  };
  
  bestFor: string[];
  promptKeywords: string[];
}

export type WeatherCategory = 
  | 'clear' 
  | 'cloudy' 
  | 'precipitation' 
  | 'fog' 
  | 'storm' 
  | 'special';

export interface AtmosphericEffect {
  name: string;
  description: string;
  physics: string;
  visualResult: string;
  promptKeywords: string[];
}

// ============================================================================
// WEATHER CONDITIONS
// ============================================================================

export const WEATHER_CONDITIONS: Record<string, WeatherCondition> = {
  clear_sunny: {
    name: "Clear Sunny Day",
    category: "clear",
    description: "Bright direct sunlight with blue sky",
    visualCharacteristics: {
      skyAppearance: "Deep blue gradient, possibly with white clouds",
      lightQuality: "Hard, directional, high contrast",
      colorTemperature: "5500-6500K neutral daylight",
      visibility: "Excellent, sharp horizon",
      shadows: "Hard, well-defined, deep"
    },
    atmosphericEffects: {
      particles: "Minimal visible particles",
      haze: "Clear with slight atmospheric perspective at distance",
      reflections: "Strong specular from surfaces",
      moisture: "Dry surfaces unless morning dew"
    },
    moodImpact: {
      primaryMood: "Energetic and optimistic",
      secondaryMoods: ["cheerful", "vibrant", "lively"],
      energyLevel: "high"
    },
    technicalConsiderations: {
      exposure: "Watch for blown highlights",
      whiteBalance: "Daylight or auto",
      contrastHandling: "Use fill or reflector for portraits"
    },
    bestFor: ["landscapes", "sports", "lifestyle", "architecture"],
    promptKeywords: [
      "bright sunny day",
      "clear blue sky",
      "hard sunlight with sharp shadows",
      "vibrant daylight colors"
    ]
  },

  golden_hour: {
    name: "Golden Hour",
    category: "clear",
    description: "Warm low-angle sun within hour of sunrise/sunset",
    visualCharacteristics: {
      skyAppearance: "Warm gradients from orange to blue",
      lightQuality: "Soft directional, warm glow",
      colorTemperature: "2500-3500K warm orange-gold",
      visibility: "Good with warm atmospheric glow",
      shadows: "Long, soft-edged, purple-tinted"
    },
    atmosphericEffects: {
      particles: "Dust and particles glow",
      haze: "Warm golden haze, enhanced atmosphere",
      reflections: "Warm reflections on surfaces",
      moisture: "Dew may be present at sunrise"
    },
    moodImpact: {
      primaryMood: "Romantic and magical",
      secondaryMoods: ["warm", "nostalgic", "dreamy"],
      energyLevel: "medium"
    },
    technicalConsiderations: {
      exposure: "Protect highlights in sky",
      whiteBalance: "Keep warm or enhance",
      contrastHandling: "Natural low contrast is flattering"
    },
    bestFor: ["portraits", "landscapes", "romance", "lifestyle"],
    promptKeywords: [
      "golden hour warm light",
      "magic hour glow",
      "sunset golden illumination",
      "warm orange-gold lighting",
      "long soft shadows"
    ]
  },

  overcast: {
    name: "Overcast Sky",
    category: "cloudy",
    description: "Even cloud cover creating giant softbox",
    visualCharacteristics: {
      skyAppearance: "Uniform gray to white clouds",
      lightQuality: "Extremely soft, diffused, even",
      colorTemperature: "6000-7000K slightly cool",
      visibility: "Good but muted",
      shadows: "Very soft or no shadows"
    },
    atmosphericEffects: {
      particles: "Not visible",
      haze: "Slight overall haze",
      reflections: "Soft, diffused reflections",
      moisture: "Often higher humidity"
    },
    moodImpact: {
      primaryMood: "Calm and contemplative",
      secondaryMoods: ["peaceful", "muted", "serene"],
      energyLevel: "low"
    },
    technicalConsiderations: {
      exposure: "Easy, even exposure",
      whiteBalance: "May need warming",
      contrastHandling: "May need to add contrast in post"
    },
    bestFor: ["portraits", "product", "nature details", "even lighting needs"],
    promptKeywords: [
      "overcast soft diffused lighting",
      "cloudy day even illumination",
      "giant softbox sky",
      "soft shadowless light"
    ]
  },

  rainy: {
    name: "Rainy Weather",
    category: "precipitation",
    description: "Active rainfall with wet surfaces",
    visualCharacteristics: {
      skyAppearance: "Dark gray clouds, dramatic",
      lightQuality: "Dim, diffused, moody",
      colorTemperature: "6500-8000K cool gray",
      visibility: "Reduced by rain",
      shadows: "Minimal, very soft"
    },
    atmosphericEffects: {
      particles: "Visible raindrops, streaks with motion",
      haze: "Rain creates atmospheric depth",
      reflections: "Strong wet surface reflections",
      moisture: "Everything wet and glistening"
    },
    moodImpact: {
      primaryMood: "Melancholic and dramatic",
      secondaryMoods: ["moody", "emotional", "cinematic"],
      energyLevel: "medium"
    },
    technicalConsiderations: {
      exposure: "Underexpose slightly for mood",
      whiteBalance: "Keep cool or slightly warm for variety",
      contrastHandling: "High contrast between wet/dry"
    },
    bestFor: ["moody portraits", "street photography", "dramatic scenes", "noir"],
    promptKeywords: [
      "rainy weather atmosphere",
      "rain-slicked wet streets",
      "raindrops visible in air",
      "glistening wet surfaces",
      "moody rain atmosphere"
    ]
  },

  foggy: {
    name: "Foggy/Misty",
    category: "fog",
    description: "Dense moisture creating ethereal atmosphere",
    visualCharacteristics: {
      skyAppearance: "Uniform gray, no visible sky",
      lightQuality: "Extremely diffused, glowing",
      colorTemperature: "Neutral to cool",
      visibility: "Very limited, objects fade",
      shadows: "None visible"
    },
    atmosphericEffects: {
      particles: "Dense water droplets in air",
      haze: "Maximum atmospheric effect",
      reflections: "Muted, softened",
      moisture: "High humidity, possible condensation"
    },
    moodImpact: {
      primaryMood: "Mysterious and ethereal",
      secondaryMoods: ["dreamy", "haunting", "peaceful"],
      energyLevel: "low"
    },
    technicalConsiderations: {
      exposure: "Meter carefully, easy to overexpose",
      whiteBalance: "Keep neutral or add mood",
      contrastHandling: "Very low natural contrast"
    },
    bestFor: ["fine art", "mysterious scenes", "minimalist", "atmospheric"],
    promptKeywords: [
      "thick fog atmosphere",
      "misty ethereal conditions",
      "objects fading into fog",
      "mysterious foggy atmosphere",
      "diffused fog lighting"
    ]
  },

  stormy: {
    name: "Stormy Weather",
    category: "storm",
    description: "Dramatic storm clouds with dynamic lighting",
    visualCharacteristics: {
      skyAppearance: "Dark dramatic clouds, possible breaks",
      lightQuality: "Variable, dramatic, unpredictable",
      colorTemperature: "Variable, often cooler",
      visibility: "Variable based on precipitation",
      shadows: "Can be dramatic if sun breaks through"
    },
    atmosphericEffects: {
      particles: "Rain, possibly dust or debris",
      haze: "Variable atmospheric conditions",
      reflections: "Wet surfaces if raining",
      moisture: "High, variable"
    },
    moodImpact: {
      primaryMood: "Dramatic and powerful",
      secondaryMoods: ["intense", "epic", "threatening"],
      energyLevel: "high"
    },
    technicalConsiderations: {
      exposure: "Challenging, protect equipment",
      whiteBalance: "Match dramatic mood",
      contrastHandling: "Often naturally high contrast"
    },
    bestFor: ["landscapes", "epic scenes", "dramatic", "weather photography"],
    promptKeywords: [
      "dramatic storm clouds",
      "stormy atmospheric conditions",
      "threatening dark sky",
      "epic storm lighting",
      "dramatic weather atmosphere"
    ]
  },

  snowy: {
    name: "Snowy Weather",
    category: "precipitation",
    description: "Falling snow and snow-covered environment",
    visualCharacteristics: {
      skyAppearance: "Gray overcast to white",
      lightQuality: "Bright from snow reflection, soft",
      colorTemperature: "Cool blue-white",
      visibility: "Reduced during snowfall",
      shadows: "Soft, often blue-tinted"
    },
    atmosphericEffects: {
      particles: "Visible snowflakes in air",
      haze: "Snow creates white haze",
      reflections: "High albedo from snow surfaces",
      moisture: "Frozen moisture, frost"
    },
    moodImpact: {
      primaryMood: "Peaceful and pure",
      secondaryMoods: ["magical", "cold", "clean"],
      energyLevel: "low"
    },
    technicalConsiderations: {
      exposure: "Overexpose +1 to +2 stops",
      whiteBalance: "Add warmth if desired",
      contrastHandling: "Low contrast, may need boost"
    },
    bestFor: ["winter scenes", "holiday", "peaceful imagery", "nature"],
    promptKeywords: [
      "snowy winter atmosphere",
      "falling snowflakes visible",
      "snow-covered landscape",
      "winter wonderland conditions",
      "cold blue snow light"
    ]
  },

  blue_hour: {
    name: "Blue Hour",
    category: "special",
    description: "Twilight period with deep blue sky",
    visualCharacteristics: {
      skyAppearance: "Deep blue gradient, possibly stars",
      lightQuality: "Dim, cool, ethereal",
      colorTemperature: "10000-15000K very cool blue",
      visibility: "Good but darkening",
      shadows: "Minimal, very soft"
    },
    atmosphericEffects: {
      particles: "Not visible",
      haze: "Blue atmospheric glow",
      reflections: "Balanced with artificial lights",
      moisture: "Variable"
    },
    moodImpact: {
      primaryMood: "Serene and contemplative",
      secondaryMoods: ["peaceful", "melancholic", "magical"],
      energyLevel: "low"
    },
    technicalConsiderations: {
      exposure: "Long exposures may be needed",
      whiteBalance: "Keep blue or balance with lights",
      contrastHandling: "Balance with artificial light sources"
    },
    bestFor: ["city photography", "architecture", "twilight scenes", "calm mood"],
    promptKeywords: [
      "blue hour twilight",
      "deep blue sky atmosphere",
      "twilight blue cast",
      "balanced natural and artificial light"
    ]
  }
};

// ============================================================================
// ATMOSPHERIC EFFECTS
// ============================================================================

export const ATMOSPHERIC_EFFECTS: Record<string, AtmosphericEffect> = {
  volumetric_light: {
    name: "Volumetric Light Rays",
    description: "Visible light beams through atmosphere",
    physics: "Light scattering through particles (dust, mist, smoke)",
    visualResult: "God rays, light shafts, crepuscular rays",
    promptKeywords: [
      "volumetric light rays",
      "god rays through atmosphere",
      "visible light beams",
      "sunbeams through dust",
      "crepuscular rays"
    ]
  },

  atmospheric_perspective: {
    name: "Atmospheric Perspective",
    description: "Objects fade with distance due to atmosphere",
    physics: "Light scattering reduces contrast and shifts color with distance",
    visualResult: "Distant objects appear lighter, bluer, less detailed",
    promptKeywords: [
      "atmospheric perspective depth",
      "distant objects fading blue",
      "layered atmospheric depth",
      "aerial perspective haze"
    ]
  },

  heat_shimmer: {
    name: "Heat Shimmer/Mirage",
    description: "Visual distortion from heated air",
    physics: "Temperature gradients cause light refraction",
    visualResult: "Wavering, distorted distant objects",
    promptKeywords: [
      "heat shimmer distortion",
      "hot air wavering effect",
      "mirage heat haze",
      "temperature distortion"
    ]
  },

  dust_particles: {
    name: "Dust Particles in Light",
    description: "Visible dust motes floating in light beams",
    physics: "Small particles scatter and reflect light",
    visualResult: "Sparkling particles visible in light shafts",
    promptKeywords: [
      "dust particles in light",
      "floating dust motes",
      "particles catching light",
      "dusty atmosphere"
    ]
  },

  morning_mist: {
    name: "Morning Mist/Ground Fog",
    description: "Low-lying mist at ground level",
    physics: "Cool air traps moisture near ground",
    visualResult: "Ethereal ground-level fog with clear sky above",
    promptKeywords: [
      "morning mist ground fog",
      "low-lying ethereal mist",
      "ground fog with clear sky",
      "dawn mist atmosphere"
    ]
  },

  rainbow: {
    name: "Rainbow",
    description: "Light refraction through water droplets",
    physics: "Sunlight dispersed by rain droplets at 42° angle",
    visualResult: "Colorful arc in sky opposite sun",
    promptKeywords: [
      "rainbow in sky",
      "colorful rainbow arc",
      "post-rain rainbow",
      "double rainbow"
    ]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get weather condition by name
 */
export function getWeatherCondition(name: string): WeatherCondition | undefined {
  return WEATHER_CONDITIONS[name];
}

/**
 * Get conditions by category
 */
export function getConditionsByCategory(category: WeatherCategory): WeatherCondition[] {
  return Object.values(WEATHER_CONDITIONS).filter(c => c.category === category);
}

/**
 * Generate weather prompt
 */
export function generateWeatherPrompt(condition: WeatherCondition): string {
  return condition.promptKeywords.join(', ');
}

/**
 * Generate atmospheric effect prompt
 */
export function generateAtmosphericPrompt(effect: AtmosphericEffect): string {
  return effect.promptKeywords.join(', ');
}

/**
 * Get weather for mood
 */
export function getWeatherForMood(mood: string): WeatherCondition | undefined {
  const moodMap: Record<string, string> = {
    happy: 'clear_sunny',
    romantic: 'golden_hour',
    mysterious: 'foggy',
    dramatic: 'stormy',
    peaceful: 'overcast',
    melancholic: 'rainy',
    magical: 'snowy',
    serene: 'blue_hour'
  };
  
  const weatherKey = moodMap[mood.toLowerCase()];
  return weatherKey ? WEATHER_CONDITIONS[weatherKey] : undefined;
}

/**
 * Combine weather with atmospheric effect
 */
export function combineWeatherAtmospheric(
  weather: WeatherCondition,
  effect: AtmosphericEffect
): string {
  return [
    ...weather.promptKeywords.slice(0, 2),
    ...effect.promptKeywords.slice(0, 2)
  ].join(', ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  WEATHER_CONDITIONS,
  ATMOSPHERIC_EFFECTS,
  getWeatherCondition,
  getConditionsByCategory,
  generateWeatherPrompt,
  generateAtmosphericPrompt,
  getWeatherForMood,
  combineWeatherAtmospheric
};
