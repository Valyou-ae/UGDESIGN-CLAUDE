/**
 * ═══════════════════════════════════════════════════════════════════════════
 * OPTICAL PHENOMENA LIBRARY
 * Enhancement Feature 2 | Impact: +10-15% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Master light behavior through reflections, refractions, caustics, iridescence,
 * and other optical phenomena for photorealistic lighting.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface OpticalEffect {
  name: string;
  category: OpticalCategory;
  description: string;
  physics: string;
  visualCharacteristics: {
    appearance: string;
    intensity: string;
    colorBehavior: string;
    viewingAngleDependency: string;
  };
  technicalRequirements: {
    lighting: string[];
    surfaceProperties: string[];
    cameraAngle: string[];
  };
  commonSubjects: string[];
  promptKeywords: string[];
}

export type OpticalCategory = 
  | 'reflection' 
  | 'refraction' 
  | 'scattering' 
  | 'dispersion' 
  | 'interference' 
  | 'special';

export interface ReflectionType {
  name: string;
  description: string;
  surfaceType: string;
  reflectionQuality: string;
  examples: string[];
  technicalNotes: string;
  promptTemplate: string;
}

// ============================================================================
// REFLECTION EFFECTS
// ============================================================================

export const REFLECTION_EFFECTS: Record<string, OpticalEffect> = {
  mirror_reflection: {
    name: "Mirror/Specular Reflection",
    category: "reflection",
    description: "Perfect mirror-like reflections from smooth polished surfaces",
    physics: "Light reflects at equal angle to incident angle from smooth surface",
    visualCharacteristics: {
      appearance: "Clear, sharp, mirror-like reflection of environment",
      intensity: "High intensity, minimal scatter",
      colorBehavior: "Reflects colors accurately, slight color shift possible",
      viewingAngleDependency: "Strong Fresnel effect - more reflective at grazing angles"
    },
    technicalRequirements: {
      lighting: ["Clear light source", "Defined environment to reflect"],
      surfaceProperties: ["Very smooth surface", "Polished finish", "Low roughness"],
      cameraAngle: ["Position to show reflected environment", "Consider reflection angle"]
    },
    commonSubjects: [
      "Chrome objects", "Still water", "Polished metal", 
      "Glass windows", "Mirrors", "Wet surfaces"
    ],
    promptKeywords: [
      "mirror-like reflection",
      "perfect specular reflection",
      "clear sharp reflections",
      "polished surface reflecting environment",
      "Fresnel reflections at edges"
    ]
  },

  diffuse_reflection: {
    name: "Diffuse Reflection",
    category: "reflection",
    description: "Soft scattered reflections from rough surfaces",
    physics: "Light scatters in multiple directions from microscopically rough surface",
    visualCharacteristics: {
      appearance: "Soft, blurred, diffused reflection",
      intensity: "Lower than specular, spread over area",
      colorBehavior: "Takes on surface color mixing",
      viewingAngleDependency: "Relatively uniform from all angles"
    },
    technicalRequirements: {
      lighting: ["Any lighting works", "Diffuse lighting preferred"],
      surfaceProperties: ["Rough or textured surface", "Matte finish"],
      cameraAngle: ["Less dependent on viewing angle"]
    },
    commonSubjects: [
      "Matte paint", "Concrete", "Paper", 
      "Rough stone", "Unpolished wood", "Fabric"
    ],
    promptKeywords: [
      "soft diffuse reflections",
      "matte surface light scatter",
      "subtle surface sheen",
      "rough surface light behavior"
    ]
  },

  wet_surface_reflection: {
    name: "Wet Surface Reflection",
    category: "reflection",
    description: "Enhanced reflectivity from water film on surfaces",
    physics: "Thin water layer creates smooth reflective surface over rough base",
    visualCharacteristics: {
      appearance: "Glossy wet look with sharp reflections",
      intensity: "High - water smooths surface roughness",
      colorBehavior: "Deeper color saturation, clear reflections",
      viewingAngleDependency: "Strong Fresnel effect enhanced by water"
    },
    technicalRequirements: {
      lighting: ["Point light sources for highlights", "Sky for ambient reflection"],
      surfaceProperties: ["Any base material with water film"],
      cameraAngle: ["Low angles emphasize reflections"]
    },
    commonSubjects: [
      "Wet streets after rain", "Dewy grass", "Wet skin",
      "Rain-soaked surfaces", "Wet leaves"
    ],
    promptKeywords: [
      "wet surface reflections",
      "rain-slicked streets reflecting lights",
      "glistening wet surface",
      "water droplets on surface",
      "post-rain reflections"
    ]
  }
};

// ============================================================================
// REFRACTION EFFECTS
// ============================================================================

export const REFRACTION_EFFECTS: Record<string, OpticalEffect> = {
  glass_refraction: {
    name: "Glass Refraction",
    category: "refraction",
    description: "Light bending through glass creating distortion and displacement",
    physics: "Light changes speed and direction when entering/exiting glass (IOR ~1.52)",
    visualCharacteristics: {
      appearance: "Distorted, magnified, or inverted view through glass",
      intensity: "Depends on glass thickness and curvature",
      colorBehavior: "Slight chromatic aberration at edges",
      viewingAngleDependency: "More distortion at oblique angles"
    },
    technicalRequirements: {
      lighting: ["Backlight subject behind glass for visibility"],
      surfaceProperties: ["Transparent glass", "Clean surface"],
      cameraAngle: ["Through glass for refraction effect"]
    },
    commonSubjects: [
      "Glass spheres", "Water glasses", "Bottles",
      "Windows", "Lenses", "Prisms"
    ],
    promptKeywords: [
      "glass refraction distortion",
      "light bending through glass",
      "magnifying glass effect",
      "distorted view through curved glass"
    ]
  },

  water_refraction: {
    name: "Water Refraction",
    category: "refraction",
    description: "Light bending at water surface creating underwater distortion",
    physics: "Light changes direction at air-water interface (IOR 1.33)",
    visualCharacteristics: {
      appearance: "Objects appear displaced, bent at water line",
      intensity: "Strong at water surface line",
      colorBehavior: "Blue shift with depth, caustics patterns",
      viewingAngleDependency: "Maximum effect at oblique angles"
    },
    technicalRequirements: {
      lighting: ["Strong overhead light for caustics"],
      surfaceProperties: ["Clear water", "Relatively calm surface"],
      cameraAngle: ["Half in/half out or underwater looking up"]
    },
    commonSubjects: [
      "Swimming pools", "Fish tanks", "Underwater scenes",
      "Partially submerged objects", "Drinking glasses"
    ],
    promptKeywords: [
      "water refraction bending light",
      "underwater light distortion",
      "caustic patterns from water",
      "bent appearance at waterline"
    ]
  },

  atmospheric_refraction: {
    name: "Atmospheric Refraction",
    category: "refraction",
    description: "Light bending through atmosphere creating mirages and distortion",
    physics: "Temperature gradients in air cause density changes that bend light",
    visualCharacteristics: {
      appearance: "Shimmer, mirage, distortion of distant objects",
      intensity: "Stronger with larger temperature differentials",
      colorBehavior: "Can separate colors slightly",
      viewingAngleDependency: "Most visible looking across hot surfaces"
    },
    technicalRequirements: {
      lighting: ["Strong sun/heat source"],
      surfaceProperties: ["Hot ground surface"],
      cameraAngle: ["Low angle across heated surface"]
    },
    commonSubjects: [
      "Desert mirages", "Hot road shimmer", "Heat haze",
      "Distant horizon distortion"
    ],
    promptKeywords: [
      "heat shimmer distortion",
      "mirage effect on hot surface",
      "atmospheric heat haze",
      "wavering air from heat"
    ]
  }
};

// ============================================================================
// SCATTERING EFFECTS
// ============================================================================

export const SCATTERING_EFFECTS: Record<string, OpticalEffect> = {
  rayleigh_scattering: {
    name: "Rayleigh Scattering",
    category: "scattering",
    description: "Atmospheric scattering creating blue sky and warm sunsets",
    physics: "Small particles scatter short wavelengths (blue) more than long (red)",
    visualCharacteristics: {
      appearance: "Blue sky during day, orange/red during sunset",
      intensity: "Stronger with more atmosphere (horizon vs overhead)",
      colorBehavior: "Blue scattered, red transmitted through",
      viewingAngleDependency: "Most blue at 90° from sun"
    },
    technicalRequirements: {
      lighting: ["Natural daylight"],
      surfaceProperties: ["N/A - atmospheric effect"],
      cameraAngle: ["Sky in frame"]
    },
    commonSubjects: [
      "Sky backgrounds", "Landscape horizons", "Sunsets",
      "Aerial photography", "Mountain vistas"
    ],
    promptKeywords: [
      "blue sky from Rayleigh scattering",
      "golden hour warm light",
      "atmospheric color gradient",
      "sunset orange-red sky"
    ]
  },

  mie_scattering: {
    name: "Mie Scattering",
    category: "scattering",
    description: "Scattering from larger particles creating haze and glows",
    physics: "Larger particles (dust, water droplets) scatter all wavelengths equally",
    visualCharacteristics: {
      appearance: "White haze, glows around lights, fog",
      intensity: "Depends on particle concentration",
      colorBehavior: "White/gray - all wavelengths scattered equally",
      viewingAngleDependency: "Strongest in forward direction (toward light)"
    },
    technicalRequirements: {
      lighting: ["Visible light source for glow effect"],
      surfaceProperties: ["N/A - atmospheric effect"],
      cameraAngle: ["Toward light source for maximum effect"]
    },
    commonSubjects: [
      "Foggy scenes", "Dusty environments", "Light beams in mist",
      "Glowing lights in haze", "Overcast skies"
    ],
    promptKeywords: [
      "atmospheric haze scattering",
      "fog diffusing light",
      "dusty air light beams",
      "hazy glowing atmosphere"
    ]
  },

  volumetric_scattering: {
    name: "Volumetric Light Scattering",
    category: "scattering",
    description: "God rays and light beams through particulate atmosphere",
    physics: "Light scattering in participating media makes beam paths visible",
    visualCharacteristics: {
      appearance: "Visible light rays, god rays, crepuscular rays",
      intensity: "Depends on particle density and light intensity",
      colorBehavior: "Takes color of light source",
      viewingAngleDependency: "Most visible when looking toward light"
    },
    technicalRequirements: {
      lighting: ["Strong directional light (sun, spotlight)"],
      surfaceProperties: ["Particulate atmosphere (dust, fog, smoke)"],
      cameraAngle: ["Looking toward light source"]
    },
    commonSubjects: [
      "Forest sunbeams", "Dusty warehouse", "Stage lighting",
      "Cathedral windows", "Underwater light shafts"
    ],
    promptKeywords: [
      "volumetric light rays",
      "god rays through clouds",
      "sunbeams through dust",
      "visible light beams in mist",
      "crepuscular rays at sunset"
    ]
  }
};

// ============================================================================
// SPECIAL OPTICAL EFFECTS
// ============================================================================

export const SPECIAL_EFFECTS: Record<string, OpticalEffect> = {
  caustics: {
    name: "Caustics",
    category: "special",
    description: "Concentrated light patterns from focused reflections/refractions",
    physics: "Curved reflective/refractive surfaces focus light into bright patterns",
    visualCharacteristics: {
      appearance: "Bright curved patterns, concentrated light pools",
      intensity: "Very bright in focus areas",
      colorBehavior: "Can separate into spectrum with dispersion",
      viewingAngleDependency: "Patterns move with light source position"
    },
    technicalRequirements: {
      lighting: ["Point light source or strong directional light"],
      surfaceProperties: ["Curved reflective or refractive surface"],
      cameraAngle: ["Surface where caustics land in frame"]
    },
    commonSubjects: [
      "Swimming pool bottoms", "Glass on table", "Wine glasses",
      "Jewelry reflections", "Water surface patterns"
    ],
    promptKeywords: [
      "caustic light patterns",
      "swimming pool caustics",
      "refracted light patterns",
      "concentrated light ribbons"
    ]
  },

  iridescence: {
    name: "Iridescence",
    category: "interference",
    description: "Rainbow color effects from thin film interference",
    physics: "Thin layers cause light wave interference creating color patterns",
    visualCharacteristics: {
      appearance: "Rainbow colors that shift with viewing angle",
      intensity: "Subtle to strong depending on film thickness",
      colorBehavior: "Full spectrum colors, angle-dependent",
      viewingAngleDependency: "Strong - colors shift with viewing angle"
    },
    technicalRequirements: {
      lighting: ["Bright light to show colors clearly"],
      surfaceProperties: ["Thin transparent layers (oil, soap, etc.)"],
      cameraAngle: ["Angle to show color shifts"]
    },
    commonSubjects: [
      "Soap bubbles", "Oil on water", "Beetle shells",
      "Peacock feathers", "Abalone shells"
    ],
    promptKeywords: [
      "iridescent rainbow shimmer",
      "soap bubble colors",
      "oil slick rainbow pattern",
      "thin film interference colors"
    ]
  },

  bokeh: {
    name: "Bokeh",
    category: "special",
    description: "Aesthetic quality of out-of-focus areas",
    physics: "Aperture shape and lens characteristics determine blur quality",
    visualCharacteristics: {
      appearance: "Smooth or textured circular blur discs",
      intensity: "Size increases with distance from focus plane",
      colorBehavior: "Color fringing possible at edges",
      viewingAngleDependency: "Shape can become elliptical toward frame edges"
    },
    technicalRequirements: {
      lighting: ["Point lights create distinct bokeh shapes"],
      surfaceProperties: ["N/A - lens effect"],
      cameraAngle: ["Shallow depth of field, background lights"]
    },
    commonSubjects: [
      "Night city backgrounds", "Christmas lights", "Portraits",
      "Macro photography", "Candles in background"
    ],
    promptKeywords: [
      "creamy smooth bokeh",
      "circular bokeh highlights",
      "beautiful out-of-focus background",
      "bokeh balls of light",
      "shallow depth of field bokeh"
    ]
  }
};

// ============================================================================
// TIME OF DAY COLOR TEMPERATURES
// ============================================================================

export const TIME_OF_DAY_TEMPERATURES: Record<string, {
  kelvin: number;
  description: string;
  colorCast: string;
  promptKeywords: string[];
}> = {
  blue_hour_morning: {
    kelvin: 12000,
    description: "Pre-sunrise blue cast",
    colorCast: "Deep blue",
    promptKeywords: ["blue hour lighting", "pre-dawn blue cast", "twilight blue"]
  },
  golden_hour_morning: {
    kelvin: 3500,
    description: "Shortly after sunrise warm light",
    colorCast: "Warm golden-orange",
    promptKeywords: ["golden hour morning light", "warm sunrise glow", "golden morning"]
  },
  midday_sun: {
    kelvin: 5500,
    description: "Neutral daylight",
    colorCast: "Neutral white",
    promptKeywords: ["midday sunlight", "neutral daylight", "high noon"]
  },
  overcast: {
    kelvin: 6500,
    description: "Cloudy sky diffused light",
    colorCast: "Slightly cool blue",
    promptKeywords: ["overcast soft lighting", "cloudy day light", "diffused daylight"]
  },
  golden_hour_evening: {
    kelvin: 3000,
    description: "Hour before sunset warm light",
    colorCast: "Rich warm orange-gold",
    promptKeywords: ["golden hour evening", "warm sunset light", "magic hour glow"]
  },
  blue_hour_evening: {
    kelvin: 10000,
    description: "Post-sunset blue twilight",
    colorCast: "Cool blue-purple",
    promptKeywords: ["blue hour twilight", "post-sunset blue", "evening blue cast"]
  },
  tungsten: {
    kelvin: 3200,
    description: "Indoor incandescent light",
    colorCast: "Warm orange-yellow",
    promptKeywords: ["warm tungsten lighting", "incandescent glow", "warm indoor light"]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get optical effect by name
 */
export function getOpticalEffect(name: string): OpticalEffect | undefined {
  const allEffects = {
    ...REFLECTION_EFFECTS,
    ...REFRACTION_EFFECTS,
    ...SCATTERING_EFFECTS,
    ...SPECIAL_EFFECTS
  };
  return allEffects[name];
}

/**
 * Get all effects in a category
 */
export function getEffectsByCategory(category: OpticalCategory): OpticalEffect[] {
  const categoryMap: Record<OpticalCategory, Record<string, OpticalEffect>> = {
    reflection: REFLECTION_EFFECTS,
    refraction: REFRACTION_EFFECTS,
    scattering: SCATTERING_EFFECTS,
    dispersion: {},
    interference: {},
    special: SPECIAL_EFFECTS
  };
  
  return Object.values(categoryMap[category] || {});
}

/**
 * Generate optical effect prompt
 */
export function generateOpticalPrompt(effect: OpticalEffect): string {
  return effect.promptKeywords.join(', ');
}

/**
 * Get time of day lighting prompt
 */
export function getTimeOfDayPrompt(timeOfDay: string): string {
  const time = TIME_OF_DAY_TEMPERATURES[timeOfDay];
  if (!time) return '';
  return `${time.promptKeywords.join(', ')}, ${time.kelvin}K color temperature`;
}

/**
 * Combine multiple optical effects for a scene
 */
export function generateSceneOpticalPrompt(effects: OpticalEffect[]): string {
  return effects
    .map(e => e.promptKeywords.slice(0, 2).join(', '))
    .join(', ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  REFLECTION_EFFECTS,
  REFRACTION_EFFECTS,
  SCATTERING_EFFECTS,
  SPECIAL_EFFECTS,
  TIME_OF_DAY_TEMPERATURES,
  getOpticalEffect,
  getEffectsByCategory,
  generateOpticalPrompt,
  getTimeOfDayPrompt,
  generateSceneOpticalPrompt
};
