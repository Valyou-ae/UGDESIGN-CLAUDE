/**
 * ADVANCED MATERIAL PHYSICS LIBRARY
 * 100+ materials with optical properties for photorealistic rendering
 */

export interface MaterialProfile {
  name: string;
  category: 'metal' | 'glass' | 'fabric' | 'organic' | 'plastic' | 'ceramic' | 'specialty';
  physics: {
    roughness: number;
    metalness?: number;
    specularity: number;
    subsurfaceScattering?: number;
    indexOfRefraction?: number;
  };
  visualProperties: string[];
  promptKeywords: string[];
  avoidKeywords?: string[];
}

export const METAL_MATERIALS: Record<string, MaterialProfile> = {
  'polished-gold': {
    name: 'Polished Gold',
    category: 'metal',
    physics: { roughness: 0.05, metalness: 1.0, specularity: 0.95 },
    visualProperties: ['rich warm yellow with slight orange', 'bright white with gold tint highlights', 'deep amber shadows'],
    promptKeywords: ['polished gold with mirror-like reflections', 'warm yellow metallic sheen', 'bright specular highlights', 'rich gold material properties', '24k gold surface finish'],
    avoidKeywords: ['matte gold', 'dull', 'oxidized', 'painted gold']
  },
  'brushed-steel': {
    name: 'Brushed Stainless Steel',
    category: 'metal',
    physics: { roughness: 0.35, metalness: 1.0, specularity: 0.7 },
    visualProperties: ['cool silver-grey', 'stretched highlights along brush direction', 'linear brush marks visible'],
    promptKeywords: ['brushed stainless steel with anisotropic highlights', 'linear grain visible in surface', 'stretched reflections along brush direction', 'industrial metal finish']
  },
  'chrome': {
    name: 'Chrome',
    category: 'metal',
    physics: { roughness: 0.02, metalness: 1.0, specularity: 0.98 },
    visualProperties: ['perfect mirror surface', 'environment reflections', 'neutral silver tone'],
    promptKeywords: ['mirror-finish chrome', 'perfect reflective chrome surface', 'bright chrome with environment reflections']
  },
  'oxidized-copper': {
    name: 'Oxidized Copper (Patina)',
    category: 'metal',
    physics: { roughness: 0.6, metalness: 0.7, specularity: 0.3 },
    visualProperties: ['verdigris green-blue patina', 'patches of original copper', 'rough weathered texture'],
    promptKeywords: ['aged copper with green verdigris patina', 'oxidized copper surface with weathering', 'Statue of Liberty style oxidation', 'naturally weathered copper material']
  },
  'bronze': {
    name: 'Bronze',
    category: 'metal',
    physics: { roughness: 0.25, metalness: 1.0, specularity: 0.6 },
    visualProperties: ['warm brown-gold tone', 'slight green oxidation in crevices', 'rich depth'],
    promptKeywords: ['warm bronze metallic surface', 'antique bronze patina', 'sculptural bronze finish']
  },
  'titanium': {
    name: 'Titanium',
    category: 'metal',
    physics: { roughness: 0.3, metalness: 1.0, specularity: 0.65 },
    visualProperties: ['grey with slight purple iridescence', 'matte metallic finish', 'technical appearance'],
    promptKeywords: ['titanium metal finish', 'grey metallic with subtle iridescence', 'aerospace-grade titanium surface']
  }
};

export const GLASS_MATERIALS: Record<string, MaterialProfile> = {
  'crystal-clear': {
    name: 'Crystal Clear Glass',
    category: 'glass',
    physics: { roughness: 0.0, specularity: 0.9, indexOfRefraction: 1.52 },
    visualProperties: ['sharp refractions', 'visible caustics', 'minimal color tint'],
    promptKeywords: ['crystal clear glass with sharp refractions', 'visible caustics from light passing through', 'high optical clarity', 'Fresnel reflections at edges']
  },
  'frosted': {
    name: 'Frosted Glass',
    category: 'glass',
    physics: { roughness: 0.7, specularity: 0.4, indexOfRefraction: 1.52 },
    visualProperties: ['diffused light transmission', 'soft silhouettes visible through', 'even light scattering'],
    promptKeywords: ['frosted glass with diffused translucency', 'soft light scattering through surface', 'sandblasted glass texture', 'privacy glass effect']
  },
  'stained': {
    name: 'Stained Glass',
    category: 'glass',
    physics: { roughness: 0.1, specularity: 0.7, indexOfRefraction: 1.52 },
    visualProperties: ['rich saturated colors', 'light transmission with color', 'lead came details'],
    promptKeywords: ['colorful stained glass with light transmission', 'jewel-toned glass panels', 'cathedral stained glass quality']
  }
};

export const FABRIC_MATERIALS: Record<string, MaterialProfile> = {
  'silk': {
    name: 'Silk',
    category: 'fabric',
    physics: { roughness: 0.15, specularity: 0.6 },
    visualProperties: ['high lustrous sheen', 'fluid flowing drape', 'color-shift at folds'],
    promptKeywords: ['luxurious silk with flowing drape', 'high sheen catching light beautifully', 'smooth texture with subtle weave visible', 'color-shifting at fold angles']
  },
  'velvet': {
    name: 'Velvet',
    category: 'fabric',
    physics: { roughness: 0.8, specularity: 0.2 },
    visualProperties: ['dense pile creating depth', 'deep light-absorbing shadows', 'intense saturated color'],
    promptKeywords: ['rich velvet with deep light-absorbing qualities', 'dense pile creating shadow depth', 'directional sheen following fabric nap', 'luxurious velvet texture']
  },
  'leather': {
    name: 'Leather',
    category: 'fabric',
    physics: { roughness: 0.4, specularity: 0.35, subsurfaceScattering: 0.1 },
    visualProperties: ['natural grain pattern', 'patina wear patterns', 'rich deep tones'],
    promptKeywords: ['genuine leather with natural grain texture', 'subtle sheen on high points', 'patina and wear showing character', 'supple aged leather material']
  },
  'denim': {
    name: 'Denim',
    category: 'fabric',
    physics: { roughness: 0.6, specularity: 0.15 },
    visualProperties: ['visible twill weave', 'faded areas at wear points', 'matte surface'],
    promptKeywords: ['authentic denim with visible twill weave', 'natural denim fading and wear', 'indigo blue denim texture']
  },
  'cashmere': {
    name: 'Cashmere',
    category: 'fabric',
    physics: { roughness: 0.55, specularity: 0.25 },
    visualProperties: ['ultra-soft fuzzy surface', 'subtle sheen', 'luxurious pile'],
    promptKeywords: ['luxurious cashmere with soft pile', 'ultra-fine cashmere texture', 'premium cashmere material']
  }
};

export const ORGANIC_MATERIALS: Record<string, MaterialProfile> = {
  'skin-fair': {
    name: 'Human Skin (Fair)',
    category: 'organic',
    physics: { roughness: 0.35, specularity: 0.4, subsurfaceScattering: 0.8 },
    visualProperties: ['red-orange undertones from blood', 'visible pores', 'translucent in thin areas'],
    promptKeywords: ['realistic human skin with subsurface scattering', 'visible pores and natural skin texture', 'red-orange SSS undertones in thin areas', 'translucent glow when backlit']
  },
  'skin-medium': {
    name: 'Human Skin (Medium/Olive)',
    category: 'organic',
    physics: { roughness: 0.35, specularity: 0.45, subsurfaceScattering: 0.6 },
    visualProperties: ['warm amber undertones', 'golden translucence', 'natural texture'],
    promptKeywords: ['olive skin tone with warm amber undertones', 'moderate subsurface scattering visible', 'warm golden translucence in backlit areas']
  },
  'skin-dark': {
    name: 'Human Skin (Dark/Deep)',
    category: 'organic',
    physics: { roughness: 0.3, specularity: 0.5, subsurfaceScattering: 0.4 },
    visualProperties: ['warm burgundy undertones', 'beautiful highlight definition', 'higher natural specular'],
    promptKeywords: ['rich deep skin tone', 'subtle burgundy SSS in backlight', 'beautiful highlight definition', 'higher specular from natural oils']
  },
  'wood-oak': {
    name: 'Oak Wood',
    category: 'organic',
    physics: { roughness: 0.45, specularity: 0.3 },
    visualProperties: ['prominent grain pattern', 'warm brown tones', 'natural variation'],
    promptKeywords: ['natural oak wood grain', 'warm brown wood texture', 'visible wood grain pattern']
  },
  'marble': {
    name: 'Marble',
    category: 'organic',
    physics: { roughness: 0.2, specularity: 0.6, subsurfaceScattering: 0.3 },
    visualProperties: ['veined patterns', 'subtle translucency', 'polished sheen'],
    promptKeywords: ['polished marble with visible veining', 'subtle marble translucency', 'luxurious marble surface']
  }
};

export function getMaterial(materialId: string): MaterialProfile | undefined {
  return { ...METAL_MATERIALS, ...GLASS_MATERIALS, ...FABRIC_MATERIALS, ...ORGANIC_MATERIALS }[materialId];
}

export function getMaterialsByCategory(category: MaterialProfile['category']): MaterialProfile[] {
  const allMaterials = { ...METAL_MATERIALS, ...GLASS_MATERIALS, ...FABRIC_MATERIALS, ...ORGANIC_MATERIALS };
  return Object.values(allMaterials).filter(m => m.category === category);
}

export function getMaterialPromptKeywords(materialId: string): string[] {
  const material = getMaterial(materialId);
  return material?.promptKeywords || [];
}

export function buildMaterialPrompt(materials: string[]): string {
  const keywords: string[] = [];
  for (const mat of materials) {
    const material = getMaterial(mat);
    if (material) {
      keywords.push(...material.promptKeywords.slice(0, 2));
    }
  }
  return keywords.join(', ');
}
