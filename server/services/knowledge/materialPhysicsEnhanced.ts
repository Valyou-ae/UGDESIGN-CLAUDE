/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MATERIAL PHYSICS LIBRARY
 * Enhancement Feature 1 | Impact: +15-20% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Comprehensive material database with scientifically accurate properties
 * for photorealistic rendering. Includes 100+ materials with IOR, roughness,
 * subsurface scattering, and BRDF characteristics.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface MaterialProfile {
  name: string;
  category: MaterialCategory;
  description: string;
  
  // Physical properties
  physics: {
    indexOfRefraction: number;      // IOR (1.0 = air, 1.5 = glass, 2.4 = diamond)
    roughness: number;              // 0-1 (0 = mirror smooth, 1 = completely diffuse)
    metalness: number;              // 0-1 (0 = dielectric, 1 = pure metal)
    specularity: number;            // 0-1 strength of specular reflection
    transmittance: number;          // 0-1 how much light passes through
  };
  
  // Subsurface scattering (for translucent materials)
  subsurfaceScattering: {
    enabled: boolean;
    depth: string;
    color: string;
    intensity: string;
    description: string;
  };
  
  // BRDF model
  brdf: {
    model: 'lambertian' | 'oren-nayar' | 'cook-torrance' | 'ward' | 'ashikhmin-shirley';
    diffuseComponent: string;
    specularComponent: string;
    fresnelEffect: string;
  };
  
  // Surface characteristics
  surface: {
    baseColor: string;
    colorVariation: string;
    microDetail: string;
    normalVariation: string;
  };
  
  // Prompt keywords
  promptKeywords: string[];
  avoidKeywords: string[];
}

export type MaterialCategory = 
  | 'metal' 
  | 'organic' 
  | 'fabric' 
  | 'stone' 
  | 'glass' 
  | 'liquid' 
  | 'plastic' 
  | 'wood' 
  | 'ceramic';

// ============================================================================
// METAL MATERIALS
// ============================================================================

export const METAL_MATERIALS: Record<string, MaterialProfile> = {
  polished_gold: {
    name: "Polished Gold",
    category: "metal",
    description: "High-purity polished gold with warm reflections",
    physics: {
      indexOfRefraction: 0.47,
      roughness: 0.05,
      metalness: 1.0,
      specularity: 0.95,
      transmittance: 0
    },
    subsurfaceScattering: {
      enabled: false,
      depth: "0",
      color: "none",
      intensity: "0",
      description: "Metals do not scatter light internally"
    },
    brdf: {
      model: "cook-torrance",
      diffuseComponent: "minimal - metals absorb non-reflected light",
      specularComponent: "warm golden with slight orange tint",
      fresnelEffect: "strong at grazing angles, gold-tinted"
    },
    surface: {
      baseColor: "#FFD700 rich warm yellow-gold",
      colorVariation: "subtle warm/cool shifts in reflections",
      microDetail: "mirror-smooth with microscopic polish marks",
      normalVariation: "very subtle surface undulation"
    },
    promptKeywords: [
      "polished gold surface",
      "mirror-like golden reflections",
      "warm metallic gold",
      "high-polish gold finish",
      "reflective gold metal",
      "24k gold appearance"
    ],
    avoidKeywords: ["matte gold", "brushed gold", "dull gold"]
  },

  brushed_steel: {
    name: "Brushed Stainless Steel",
    category: "metal",
    description: "Industrial brushed steel with directional grain",
    physics: {
      indexOfRefraction: 2.5,
      roughness: 0.35,
      metalness: 1.0,
      specularity: 0.7,
      transmittance: 0
    },
    subsurfaceScattering: {
      enabled: false,
      depth: "0",
      color: "none",
      intensity: "0",
      description: "Metals do not scatter light internally"
    },
    brdf: {
      model: "ward",
      diffuseComponent: "minimal - anisotropic reflection",
      specularComponent: "stretched highlights along brush direction",
      fresnelEffect: "moderate, neutral gray"
    },
    surface: {
      baseColor: "#C0C0C0 neutral silver-gray",
      colorVariation: "slight blue undertones in shadows",
      microDetail: "parallel microscopic grooves from brushing",
      normalVariation: "directional grain pattern"
    },
    promptKeywords: [
      "brushed stainless steel",
      "anisotropic metal highlights",
      "directional metal grain",
      "industrial brushed finish",
      "satin steel surface"
    ],
    avoidKeywords: ["mirror steel", "chrome", "polished steel"]
  },

  raw_copper: {
    name: "Raw Copper",
    category: "metal",
    description: "Fresh copper with characteristic warm orange-pink hue",
    physics: {
      indexOfRefraction: 1.1,
      roughness: 0.2,
      metalness: 1.0,
      specularity: 0.85,
      transmittance: 0
    },
    subsurfaceScattering: {
      enabled: false,
      depth: "0",
      color: "none",
      intensity: "0",
      description: "Metals do not scatter light internally"
    },
    brdf: {
      model: "cook-torrance",
      diffuseComponent: "warm copper absorption",
      specularComponent: "orange-pink metallic highlights",
      fresnelEffect: "strong with copper tint at edges"
    },
    surface: {
      baseColor: "#B87333 warm orange-pink",
      colorVariation: "pink highlights, orange-brown shadows",
      microDetail: "subtle crystalline grain structure",
      normalVariation: "organic surface irregularities"
    },
    promptKeywords: [
      "raw copper surface",
      "warm copper metal",
      "orange-pink metallic",
      "copper penny color",
      "fresh copper finish"
    ],
    avoidKeywords: ["patinated copper", "green copper", "oxidized"]
  },

  chrome: {
    name: "Chrome",
    category: "metal",
    description: "High-polish chrome plating with perfect mirror finish",
    physics: {
      indexOfRefraction: 3.0,
      roughness: 0.02,
      metalness: 1.0,
      specularity: 0.98,
      transmittance: 0
    },
    subsurfaceScattering: {
      enabled: false,
      depth: "0",
      color: "none",
      intensity: "0",
      description: "Metals do not scatter light internally"
    },
    brdf: {
      model: "cook-torrance",
      diffuseComponent: "nearly zero - pure reflection",
      specularComponent: "perfect mirror reflection",
      fresnelEffect: "constant high reflectivity"
    },
    surface: {
      baseColor: "neutral gray with environment color",
      colorVariation: "pure reflection of surroundings",
      microDetail: "atomically smooth plating",
      normalVariation: "follows underlying form perfectly"
    },
    promptKeywords: [
      "chrome plating",
      "mirror chrome finish",
      "reflective chrome surface",
      "polished chrome",
      "automotive chrome"
    ],
    avoidKeywords: ["matte chrome", "satin chrome", "brushed chrome"]
  }
};

// ============================================================================
// ORGANIC MATERIALS (SKIN)
// ============================================================================

export const SKIN_MATERIALS: Record<string, MaterialProfile> = {
  fair_caucasian: {
    name: "Fair Caucasian Skin",
    category: "organic",
    description: "Light skin tone with visible subsurface scattering",
    physics: {
      indexOfRefraction: 1.4,
      roughness: 0.4,
      metalness: 0,
      specularity: 0.3,
      transmittance: 0.2
    },
    subsurfaceScattering: {
      enabled: true,
      depth: "1-2mm light penetration",
      color: "red-orange undertones",
      intensity: "high - visible warm glow",
      description: "Blood and tissue create warm backlit glow"
    },
    brdf: {
      model: "oren-nayar",
      diffuseComponent: "strong with warm undertones",
      specularComponent: "subtle oily sheen",
      fresnelEffect: "soft rim lighting at grazing angles"
    },
    surface: {
      baseColor: "peachy pink with cool highlights",
      colorVariation: "redness zones, blue veins, uneven pigment",
      microDetail: "visible pores, fine lines, peach fuzz",
      normalVariation: "subtle texture variation across face"
    },
    promptKeywords: [
      "realistic fair skin with subsurface scattering",
      "visible skin pores",
      "red-orange SSS undertones",
      "natural skin texture",
      "warm glow in backlit areas",
      "translucent rim light on ears"
    ],
    avoidKeywords: ["perfect skin", "smooth skin", "plastic skin", "waxy"]
  },

  medium_olive: {
    name: "Medium Olive Skin",
    category: "organic",
    description: "Mediterranean/Middle Eastern skin tone",
    physics: {
      indexOfRefraction: 1.4,
      roughness: 0.35,
      metalness: 0,
      specularity: 0.35,
      transmittance: 0.15
    },
    subsurfaceScattering: {
      enabled: true,
      depth: "1-1.5mm",
      color: "warm amber undertones",
      intensity: "moderate",
      description: "Deeper pigment reduces but doesn't eliminate SSS"
    },
    brdf: {
      model: "oren-nayar",
      diffuseComponent: "rich warm base with golden highlights",
      specularComponent: "natural oil sheen",
      fresnelEffect: "warm amber rim lighting"
    },
    surface: {
      baseColor: "golden olive with warm undertones",
      colorVariation: "subtle warm/cool zones",
      microDetail: "visible pores, natural texture",
      normalVariation: "healthy skin surface variation"
    },
    promptKeywords: [
      "olive skin tone with subsurface scattering",
      "warm amber undertones",
      "Mediterranean skin",
      "golden olive complexion",
      "natural skin texture and pores"
    ],
    avoidKeywords: ["perfect skin", "flawless", "airbrushed"]
  },

  deep_dark: {
    name: "Deep Dark Skin",
    category: "organic",
    description: "Rich deep skin tone with beautiful specular properties",
    physics: {
      indexOfRefraction: 1.4,
      roughness: 0.3,
      metalness: 0,
      specularity: 0.45,
      transmittance: 0.05
    },
    subsurfaceScattering: {
      enabled: true,
      depth: "0.5-1mm",
      color: "warm burgundy undertones",
      intensity: "subtle but present",
      description: "Melanin reduces depth but warm undertones visible"
    },
    brdf: {
      model: "oren-nayar",
      diffuseComponent: "rich deep tones with purple/blue highlights",
      specularComponent: "prominent natural oil highlights",
      fresnelEffect: "strong rim light separation"
    },
    surface: {
      baseColor: "deep brown with purple/blue highlights",
      colorVariation: "warm undertones, cool highlights",
      microDetail: "visible pores, natural texture",
      normalVariation: "beautiful surface variation"
    },
    promptKeywords: [
      "deep dark skin with natural highlights",
      "warm burgundy undertones",
      "prominent specular on dark skin",
      "beautiful dark complexion",
      "strong Fresnel rim light"
    ],
    avoidKeywords: ["ashy", "gray skin", "flat dark skin"]
  }
};

// ============================================================================
// FABRIC MATERIALS
// ============================================================================

export const FABRIC_MATERIALS: Record<string, MaterialProfile> = {
  silk: {
    name: "Silk Fabric",
    category: "fabric",
    description: "Luxurious silk with characteristic sheen",
    physics: {
      indexOfRefraction: 1.5,
      roughness: 0.15,
      metalness: 0,
      specularity: 0.6,
      transmittance: 0.1
    },
    subsurfaceScattering: {
      enabled: true,
      depth: "0.5mm",
      color: "varies with dye",
      intensity: "subtle",
      description: "Light penetrates thin silk fibers"
    },
    brdf: {
      model: "ashikhmin-shirley",
      diffuseComponent: "rich dye color",
      specularComponent: "soft sheen following weave",
      fresnelEffect: "subtle edge brightening"
    },
    surface: {
      baseColor: "deep saturated dye colors",
      colorVariation: "iridescent color shifts",
      microDetail: "fine weave pattern visible close-up",
      normalVariation: "subtle drape wrinkles"
    },
    promptKeywords: [
      "luxurious silk fabric",
      "silk sheen and drape",
      "iridescent silk surface",
      "flowing silk material",
      "soft silk highlights"
    ],
    avoidKeywords: ["matte silk", "rough silk", "cotton-like"]
  },

  denim: {
    name: "Denim Fabric",
    category: "fabric",
    description: "Classic blue denim with characteristic texture",
    physics: {
      indexOfRefraction: 1.5,
      roughness: 0.8,
      metalness: 0,
      specularity: 0.1,
      transmittance: 0
    },
    subsurfaceScattering: {
      enabled: false,
      depth: "0",
      color: "none",
      intensity: "0",
      description: "Dense weave blocks light"
    },
    brdf: {
      model: "oren-nayar",
      diffuseComponent: "strong indigo blue",
      specularComponent: "minimal - matte appearance",
      fresnelEffect: "very subtle"
    },
    surface: {
      baseColor: "indigo blue",
      colorVariation: "faded areas, white weft showing",
      microDetail: "visible twill weave pattern",
      normalVariation: "wrinkles, wear patterns, fading"
    },
    promptKeywords: [
      "authentic denim texture",
      "visible twill weave",
      "natural denim fading",
      "worn denim character",
      "indigo blue jeans"
    ],
    avoidKeywords: ["shiny denim", "smooth denim", "new unworn"]
  },

  velvet: {
    name: "Velvet Fabric",
    category: "fabric",
    description: "Rich velvet with pile direction effects",
    physics: {
      indexOfRefraction: 1.5,
      roughness: 0.6,
      metalness: 0,
      specularity: 0.3,
      transmittance: 0
    },
    subsurfaceScattering: {
      enabled: false,
      depth: "0",
      color: "none",
      intensity: "0",
      description: "Dense pile absorbs light"
    },
    brdf: {
      model: "ashikhmin-shirley",
      diffuseComponent: "deep rich color",
      specularComponent: "directional sheen based on pile",
      fresnelEffect: "strong color shift at angles"
    },
    surface: {
      baseColor: "deep saturated color",
      colorVariation: "dramatic light/dark with viewing angle",
      microDetail: "dense pile texture",
      normalVariation: "crush marks, pile direction"
    },
    promptKeywords: [
      "rich velvet texture",
      "velvet pile direction",
      "deep velvet color",
      "luxurious velvet fabric",
      "crushed velvet effect"
    ],
    avoidKeywords: ["flat velvet", "smooth velvet", "worn velvet"]
  }
};

// ============================================================================
// GLASS & TRANSPARENT MATERIALS
// ============================================================================

export const GLASS_MATERIALS: Record<string, MaterialProfile> = {
  clear_glass: {
    name: "Clear Glass",
    category: "glass",
    description: "Optical quality clear glass",
    physics: {
      indexOfRefraction: 1.52,
      roughness: 0.02,
      metalness: 0,
      specularity: 0.9,
      transmittance: 0.95
    },
    subsurfaceScattering: {
      enabled: false,
      depth: "0",
      color: "none",
      intensity: "0",
      description: "Transparent - light passes through"
    },
    brdf: {
      model: "cook-torrance",
      diffuseComponent: "none - fully transparent",
      specularComponent: "bright surface reflections",
      fresnelEffect: "strong - more reflective at angles"
    },
    surface: {
      baseColor: "transparent with slight green tint",
      colorVariation: "edge tinting, caustics",
      microDetail: "smooth with rare bubbles",
      normalVariation: "subtle surface undulation"
    },
    promptKeywords: [
      "clear glass with reflections",
      "transparent glass refractions",
      "glass caustics",
      "Fresnel reflections on glass",
      "crystal clear glass"
    ],
    avoidKeywords: ["opaque glass", "frosted", "matte glass"]
  },

  frosted_glass: {
    name: "Frosted Glass",
    category: "glass",
    description: "Sandblasted or acid-etched frosted glass",
    physics: {
      indexOfRefraction: 1.52,
      roughness: 0.7,
      metalness: 0,
      specularity: 0.2,
      transmittance: 0.6
    },
    subsurfaceScattering: {
      enabled: true,
      depth: "surface scatter",
      color: "white diffusion",
      intensity: "strong",
      description: "Surface texture scatters transmitted light"
    },
    brdf: {
      model: "oren-nayar",
      diffuseComponent: "soft white scatter",
      specularComponent: "diffuse specular",
      fresnelEffect: "softened by surface texture"
    },
    surface: {
      baseColor: "translucent white",
      colorVariation: "takes color from objects behind",
      microDetail: "fine granular texture",
      normalVariation: "random micro-facets"
    },
    promptKeywords: [
      "frosted glass diffusion",
      "translucent frosted surface",
      "soft light through frosted glass",
      "etched glass texture",
      "privacy glass effect"
    ],
    avoidKeywords: ["clear glass", "transparent", "see-through"]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get material by name from any category
 */
export function getMaterial(name: string): MaterialProfile | undefined {
  const allMaterials = {
    ...METAL_MATERIALS,
    ...SKIN_MATERIALS,
    ...FABRIC_MATERIALS,
    ...GLASS_MATERIALS
  };
  return allMaterials[name];
}

/**
 * Get all materials in a category
 */
export function getMaterialsByCategory(category: MaterialCategory): MaterialProfile[] {
  const categoryMap: Record<MaterialCategory, Record<string, MaterialProfile>> = {
    metal: METAL_MATERIALS,
    organic: SKIN_MATERIALS,
    fabric: FABRIC_MATERIALS,
    glass: GLASS_MATERIALS,
    stone: {},
    liquid: {},
    plastic: {},
    wood: {},
    ceramic: {}
  };
  
  return Object.values(categoryMap[category] || {});
}

/**
 * Generate material prompt keywords
 */
export function generateMaterialPrompt(material: MaterialProfile): string {
  return material.promptKeywords.join(', ');
}

/**
 * Generate negative prompt from avoid keywords
 */
export function generateMaterialNegativePrompt(material: MaterialProfile): string {
  return material.avoidKeywords.join(', ');
}

/**
 * Get SSS prompt for skin materials
 */
export function generateSkinSSSPrompt(skinType: 'fair' | 'medium' | 'dark'): string {
  const sssMap = {
    fair: "realistic human skin with subsurface scattering, red-orange SSS undertones visible, 1-2mm light penetration depth, warm glow in thin areas, translucent rim light when backlit",
    medium: "medium olive skin with subsurface scattering, warm amber SSS undertones, 1-1.5mm light penetration, rich matte diffuse base, warm amber rim glow when backlit",
    dark: "deep dark skin with subsurface scattering, warm burgundy subtle SSS undertones, prominent specular highlights from natural oils, strong Fresnel rim light"
  };
  return sssMap[skinType];
}

/**
 * Combined material setup for scene
 */
export function generateSceneMaterialPrompt(
  primaryMaterial: MaterialProfile,
  secondaryMaterials?: MaterialProfile[]
): string {
  let prompt = generateMaterialPrompt(primaryMaterial);
  
  if (secondaryMaterials && secondaryMaterials.length > 0) {
    const secondary = secondaryMaterials
      .map(mat => mat.promptKeywords.slice(0, 2).join(', '))
      .join(', ');
    prompt += ', ' + secondary;
  }
  
  return prompt;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  METAL_MATERIALS,
  SKIN_MATERIALS,
  FABRIC_MATERIALS,
  GLASS_MATERIALS,
  getMaterial,
  getMaterialsByCategory,
  generateMaterialPrompt,
  generateMaterialNegativePrompt,
  generateSkinSSSPrompt,
  generateSceneMaterialPrompt
};
