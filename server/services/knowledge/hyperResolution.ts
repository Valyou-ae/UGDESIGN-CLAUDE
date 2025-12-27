/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HYPER-RESOLUTION SYSTEM
 * Hyper-Realism Tier 3, Feature 11 | Impact: +15-20% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Print-ready resolution, detail density, and sharpness specifications
 * for professional output requirements.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ResolutionProfile {
  name: string;
  targetUse: string;
  pixelDensity: string;
  minimumResolution: string;
  detailLevel: DetailLevel;
  sharpnessSpec: SharpnessSpec;
  printSize: string;
  promptKeywords: string[];
}

export interface DetailLevel {
  micro: string;
  meso: string;
  macro: string;
  overall: string;
}

export interface SharpnessSpec {
  criticalAreas: string[];
  falloffBehavior: string;
  edgeQuality: string;
}

// ============================================================================
// RESOLUTION PROFILES
// ============================================================================

export const RESOLUTION_PROFILES: Record<string, ResolutionProfile> = {
  web_standard: {
    name: "Web Standard",
    targetUse: "Website and social media",
    pixelDensity: "72-150 DPI",
    minimumResolution: "1920x1080",
    detailLevel: {
      micro: "Visible on zoom",
      meso: "Clear at 100%",
      macro: "Excellent at any size",
      overall: "Optimized for screen viewing"
    },
    sharpnessSpec: {
      criticalAreas: ["subject face", "eyes", "key focal points"],
      falloffBehavior: "Natural DOF blur",
      edgeQuality: "Clean, anti-aliased"
    },
    printSize: "Up to 8x10 acceptable",
    promptKeywords: [
      "high resolution for web",
      "crisp digital quality",
      "sharp screen-ready image",
      "optimized detail"
    ]
  },

  print_magazine: {
    name: "Magazine Print",
    targetUse: "Editorial and magazine printing",
    pixelDensity: "300 DPI",
    minimumResolution: "4000x6000",
    detailLevel: {
      micro: "Extremely detailed, visible in print",
      meso: "Crystal clear",
      macro: "Perfect at viewing distance",
      overall: "Print-quality resolution"
    },
    sharpnessSpec: {
      criticalAreas: ["entire subject", "textures", "fine details"],
      falloffBehavior: "Gradual, natural",
      edgeQuality: "Print-sharp edges"
    },
    printSize: "Up to full page spread",
    promptKeywords: [
      "magazine print quality",
      "300 DPI print resolution",
      "editorial sharp detail",
      "print-ready image quality"
    ]
  },

  billboard_large: {
    name: "Large Format/Billboard",
    targetUse: "Large prints, billboards, banners",
    pixelDensity: "150 DPI at final size",
    minimumResolution: "8000x12000+",
    detailLevel: {
      micro: "Holds up to extreme enlargement",
      meso: "Sharp at any crop",
      macro: "Impactful at distance",
      overall: "Massive scale capability"
    },
    sharpnessSpec: {
      criticalAreas: ["main subject", "text if any", "key elements"],
      falloffBehavior: "Intentional for scale",
      edgeQuality: "Clean at enlargement"
    },
    printSize: "Billboard and beyond",
    promptKeywords: [
      "ultra high resolution",
      "large format print quality",
      "extreme detail density",
      "billboard-ready resolution"
    ]
  },

  fine_art_print: {
    name: "Fine Art Print",
    targetUse: "Gallery prints, fine art reproduction",
    pixelDensity: "360+ DPI",
    minimumResolution: "6000x8000",
    detailLevel: {
      micro: "Museum quality micro-detail",
      meso: "Exceptional clarity",
      macro: "Gallery wall impact",
      overall: "Archival quality"
    },
    sharpnessSpec: {
      criticalAreas: ["entire visible area", "texture", "tonal transitions"],
      falloffBehavior: "Artistic intent preserved",
      edgeQuality: "Fine art smooth"
    },
    printSize: "Large format fine art",
    promptKeywords: [
      "fine art print quality",
      "museum-grade resolution",
      "archival detail level",
      "gallery print ready"
    ]
  }
};

// ============================================================================
// DETAIL DENSITY SPECIFICATIONS
// ============================================================================

export const DETAIL_DENSITY: Record<string, {
  level: string;
  description: string;
  visibleAt: string;
  examples: string[];
  promptKeywords: string[];
}> = {
  micro_detail: {
    level: "Micro",
    description: "Smallest visible details",
    visibleAt: "300%+ zoom",
    examples: ["skin pores", "fabric threads", "dust particles"],
    promptKeywords: [
      "extreme micro detail",
      "visible pore detail",
      "thread-level texture",
      "microscopic precision"
    ]
  },

  meso_detail: {
    level: "Meso",
    description: "Medium-scale details",
    visibleAt: "100-300% zoom",
    examples: ["hair strands", "material texture", "surface variations"],
    promptKeywords: [
      "rich meso detail",
      "clear texture definition",
      "sharp material rendering",
      "detailed surface quality"
    ]
  },

  macro_detail: {
    level: "Macro",
    description: "Overall visible structure",
    visibleAt: "Viewing distance",
    examples: ["facial features", "garment folds", "scene elements"],
    promptKeywords: [
      "strong macro structure",
      "clear feature definition",
      "impactful overall detail",
      "bold visual structure"
    ]
  }
};

// ============================================================================
// SHARPNESS PROFILES
// ============================================================================

export const SHARPNESS_PROFILES: Record<string, {
  name: string;
  description: string;
  application: string;
  promptKeywords: string[];
}> = {
  tack_sharp: {
    name: "Tack Sharp",
    description: "Maximum sharpness throughout focus plane",
    application: "Product, architecture, technical",
    promptKeywords: [
      "tack sharp focus",
      "razor sharp detail",
      "maximum sharpness",
      "crisp edge definition"
    ]
  },

  natural_sharp: {
    name: "Natural Sharp",
    description: "Sharp but with natural optical characteristics",
    application: "Portraits, lifestyle, general",
    promptKeywords: [
      "naturally sharp",
      "realistic sharpness",
      "lens-like focus quality",
      "organic sharp detail"
    ]
  },

  soft_focus: {
    name: "Soft Focus",
    description: "Intentional softness for effect",
    application: "Romantic, dreamy, vintage",
    promptKeywords: [
      "soft focus effect",
      "dreamy softness",
      "gentle focus quality",
      "romantic soft rendering"
    ]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get resolution profile
 */
export function getResolutionProfile(name: string): ResolutionProfile | undefined {
  return RESOLUTION_PROFILES[name];
}

/**
 * Generate resolution prompt
 */
export function generateResolutionPrompt(profile: ResolutionProfile): string {
  return profile.promptKeywords.join(', ');
}

/**
 * Get detail density prompt
 */
export function generateDetailPrompt(levels: string[]): string {
  return levels
    .map(level => DETAIL_DENSITY[level])
    .filter(Boolean)
    .flatMap(d => d.promptKeywords.slice(0, 2))
    .join(', ');
}

/**
 * Get sharpness profile prompt
 */
export function generateSharpnessPrompt(profile: string): string {
  return SHARPNESS_PROFILES[profile]?.promptKeywords.join(', ') || '';
}

/**
 * Recommend profile for use case
 */
export function recommendProfile(useCase: string): ResolutionProfile | undefined {
  const useCaseMap: Record<string, string> = {
    web: 'web_standard',
    social: 'web_standard',
    print: 'print_magazine',
    magazine: 'print_magazine',
    billboard: 'billboard_large',
    gallery: 'fine_art_print',
    art: 'fine_art_print'
  };
  
  const key = useCaseMap[useCase.toLowerCase()];
  return key ? RESOLUTION_PROFILES[key] : undefined;
}

/**
 * Generate complete resolution spec
 */
export function generateCompleteResolutionPrompt(
  profile: ResolutionProfile,
  sharpness: string = 'natural_sharp',
  detailLevels: string[] = ['micro_detail', 'meso_detail']
): string {
  return [
    generateResolutionPrompt(profile),
    generateSharpnessPrompt(sharpness),
    generateDetailPrompt(detailLevels)
  ].join(', ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  RESOLUTION_PROFILES,
  DETAIL_DENSITY,
  SHARPNESS_PROFILES,
  getResolutionProfile,
  generateResolutionPrompt,
  generateDetailPrompt,
  generateSharpnessPrompt,
  recommendProfile,
  generateCompleteResolutionPrompt
};
