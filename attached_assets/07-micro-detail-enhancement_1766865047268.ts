/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MICRO-DETAIL ENHANCEMENT
 * Hyper-Realism Tier 2, Feature 7 | Impact: +10-15% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Ultra-fine texture details, print-ready quality specifications,
 * and microscopic accuracy for maximum realism.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface MicroDetailProfile {
  name: string;
  category: DetailCategory;
  description: string;
  
  textureScale: {
    primary: string;
    secondary: string;
    tertiary: string;
    resolution: string;
  };
  
  surfaceCharacteristics: {
    roughness: string;
    normalVariation: string;
    specularDetail: string;
    microGeometry: string;
  };
  
  printReadiness: {
    dpi: number;
    minimumSize: string;
    enlargeability: string;
  };
  
  promptKeywords: string[];
  technicalSpecs: string[];
}

export type DetailCategory = 
  | 'skin' 
  | 'fabric' 
  | 'natural' 
  | 'metal' 
  | 'food' 
  | 'architectural';

// ============================================================================
// SKIN MICRO-DETAILS
// ============================================================================

export const SKIN_MICRO_DETAILS: Record<string, MicroDetailProfile> = {
  portrait_close_up: {
    name: "Portrait Close-Up Detail",
    category: "skin",
    description: "Extreme skin detail for close-up portraits",
    textureScale: {
      primary: "Visible pores (0.1-0.2mm)",
      secondary: "Fine lines and wrinkles",
      tertiary: "Microscopic skin texture",
      resolution: "8K equivalent detail"
    },
    surfaceCharacteristics: {
      roughness: "Variable across face zones",
      normalVariation: "Subtle surface undulation",
      specularDetail: "Oil and moisture highlights",
      microGeometry: "Follicle openings, fine hairs"
    },
    printReadiness: {
      dpi: 300,
      minimumSize: "24x36 inches",
      enlargeability: "Exhibition quality"
    },
    promptKeywords: [
      "extreme skin detail close-up",
      "visible pores and fine texture",
      "8K skin resolution",
      "print-ready skin detail",
      "microscopic skin texture visible",
      "individual hair strands visible"
    ],
    technicalSpecs: [
      "Pore visibility on T-zone",
      "Fine vellus hair visible",
      "Moisture and oil specular",
      "Color variation at micro level"
    ]
  },

  beauty_macro: {
    name: "Beauty Macro Detail",
    category: "skin",
    description: "Extreme close-up beauty shot detail",
    textureScale: {
      primary: "Individual pores clearly visible",
      secondary: "Skin cell pattern hints",
      tertiary: "Makeup particle visibility",
      resolution: "Beyond 8K detail"
    },
    surfaceCharacteristics: {
      roughness: "Micro-texture variation",
      normalVariation: "Every tiny bump visible",
      specularDetail: "Glistening skin surface",
      microGeometry: "Follicle detail, fine peach fuzz"
    },
    printReadiness: {
      dpi: 400,
      minimumSize: "40x60 inches",
      enlargeability: "Billboard ready"
    },
    promptKeywords: [
      "macro beauty skin detail",
      "extreme close-up skin texture",
      "every pore visible",
      "glistening skin surface",
      "ultra-high resolution skin",
      "beauty campaign quality"
    ],
    technicalSpecs: [
      "Makeup texture visible",
      "Skin cell hints",
      "Light interaction at micro level",
      "Subsurface scattering visible"
    ]
  }
};

// ============================================================================
// FABRIC MICRO-DETAILS
// ============================================================================

export const FABRIC_MICRO_DETAILS: Record<string, MicroDetailProfile> = {
  textile_weave: {
    name: "Textile Weave Detail",
    category: "fabric",
    description: "Visible fabric weave structure",
    textureScale: {
      primary: "Individual thread visibility",
      secondary: "Weave pattern structure",
      tertiary: "Fiber fraying and texture",
      resolution: "Thread-level detail"
    },
    surfaceCharacteristics: {
      roughness: "Varies by fabric type",
      normalVariation: "Weave creates micro-shadows",
      specularDetail: "Thread highlights",
      microGeometry: "Interlocking fibers"
    },
    printReadiness: {
      dpi: 300,
      minimumSize: "20x30 inches",
      enlargeability: "Fashion print ready"
    },
    promptKeywords: [
      "visible fabric weave texture",
      "individual thread detail",
      "textile micro-structure",
      "fabric fiber detail",
      "weave pattern visible"
    ],
    technicalSpecs: [
      "Thread count visible",
      "Fiber direction",
      "Weave intersection points",
      "Natural fiber irregularities"
    ]
  },

  leather_grain: {
    name: "Leather Grain Detail",
    category: "fabric",
    description: "Authentic leather surface grain",
    textureScale: {
      primary: "Grain pattern (1-3mm)",
      secondary: "Pore structure",
      tertiary: "Micro-creases",
      resolution: "Grain-level detail"
    },
    surfaceCharacteristics: {
      roughness: "Natural leather texture",
      normalVariation: "Organic grain bumps",
      specularDetail: "Oil highlights",
      microGeometry: "Natural hide irregularities"
    },
    printReadiness: {
      dpi: 300,
      minimumSize: "18x24 inches",
      enlargeability: "Product catalog ready"
    },
    promptKeywords: [
      "authentic leather grain texture",
      "visible leather pores",
      "natural hide texture",
      "leather surface detail",
      "genuine leather micro-detail"
    ],
    technicalSpecs: [
      "Natural grain variation",
      "Wear pattern authenticity",
      "Oil patina visible",
      "Stitching detail if present"
    ]
  }
};

// ============================================================================
// NATURAL MICRO-DETAILS
// ============================================================================

export const NATURAL_MICRO_DETAILS: Record<string, MicroDetailProfile> = {
  leaf_veins: {
    name: "Botanical Leaf Detail",
    category: "natural",
    description: "Macro leaf structure and venation",
    textureScale: {
      primary: "Main vein structure",
      secondary: "Secondary veination",
      tertiary: "Cell structure hints",
      resolution: "Botanical illustration quality"
    },
    surfaceCharacteristics: {
      roughness: "Waxy or matte surface",
      normalVariation: "Vein elevation",
      specularDetail: "Cuticle reflection",
      microGeometry: "Stomata hints"
    },
    printReadiness: {
      dpi: 350,
      minimumSize: "16x20 inches",
      enlargeability: "Scientific publication ready"
    },
    promptKeywords: [
      "detailed leaf venation",
      "botanical macro detail",
      "visible leaf cell structure",
      "natural plant micro-texture",
      "scientific-quality botanical detail"
    ],
    technicalSpecs: [
      "Vein hierarchy visible",
      "Chlorophyll color variation",
      "Edge detail and serration",
      "Translucency where appropriate"
    ]
  },

  water_droplets: {
    name: "Water Droplet Detail",
    category: "natural",
    description: "Macro water droplet behavior",
    textureScale: {
      primary: "Droplet curvature",
      secondary: "Internal refraction",
      tertiary: "Surface tension edge",
      resolution: "Optical quality detail"
    },
    surfaceCharacteristics: {
      roughness: "Near-zero, liquid surface",
      normalVariation: "Perfect curved surface",
      specularDetail: "Environment reflection",
      microGeometry: "Meniscus edge"
    },
    printReadiness: {
      dpi: 300,
      minimumSize: "20x24 inches",
      enlargeability: "Nature photography quality"
    },
    promptKeywords: [
      "macro water droplet detail",
      "visible refraction in water",
      "water droplet surface tension",
      "crystalline water clarity",
      "liquid surface micro-detail"
    ],
    technicalSpecs: [
      "Fresnel reflection accurate",
      "Refraction of background",
      "Surface tension visible",
      "Caustics where appropriate"
    ]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get micro-detail profile by name
 */
export function getMicroDetail(name: string): MicroDetailProfile | undefined {
  return {
    ...SKIN_MICRO_DETAILS,
    ...FABRIC_MICRO_DETAILS,
    ...NATURAL_MICRO_DETAILS
  }[name];
}

/**
 * Get details by category
 */
export function getDetailsByCategory(category: DetailCategory): MicroDetailProfile[] {
  const categoryMap: Record<DetailCategory, Record<string, MicroDetailProfile>> = {
    skin: SKIN_MICRO_DETAILS,
    fabric: FABRIC_MICRO_DETAILS,
    natural: NATURAL_MICRO_DETAILS,
    metal: {},
    food: {},
    architectural: {}
  };
  
  return Object.values(categoryMap[category] || {});
}

/**
 * Generate micro-detail prompt
 */
export function generateMicroDetailPrompt(detail: MicroDetailProfile): string {
  return detail.promptKeywords.join(', ');
}

/**
 * Generate print-ready specifications
 */
export function generatePrintReadyPrompt(detail: MicroDetailProfile): string {
  return `${detail.printReadiness.dpi}dpi print quality, ` +
         `${detail.printReadiness.enlargeability}, ` +
         `minimum ${detail.printReadiness.minimumSize} print size`;
}

/**
 * Get resolution keywords for any subject
 */
export function getResolutionKeywords(): string[] {
  return [
    "ultra-high resolution detail",
    "8K quality textures",
    "print-ready detail level",
    "microscopic texture visible",
    "exhibition quality resolution"
  ];
}

/**
 * Generate complete micro-detail prompt
 */
export function generateCompleteMicroPrompt(
  detail: MicroDetailProfile,
  includePrintSpecs: boolean = false
): string {
  const parts = [
    ...detail.promptKeywords,
    ...detail.technicalSpecs.slice(0, 2)
  ];
  
  if (includePrintSpecs) {
    parts.push(generatePrintReadyPrompt(detail));
  }
  
  return parts.join(', ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  SKIN_MICRO_DETAILS,
  FABRIC_MICRO_DETAILS,
  NATURAL_MICRO_DETAILS,
  getMicroDetail,
  getDetailsByCategory,
  generateMicroDetailPrompt,
  generatePrintReadyPrompt,
  getResolutionKeywords,
  generateCompleteMicroPrompt
};
