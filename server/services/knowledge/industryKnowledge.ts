export interface InteriorStyle {
  id: string;
  name: string;
  characteristics: string[];
  materials: string[];
  colors: string[];
  promptKeywords: string[];
}

export const interiorStyles: InteriorStyle[] = [
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    characteristics: ['Clean lines', 'Neutral color palette', 'Open spaces', 'Functional furniture', 'Minimal decoration'],
    materials: ['Concrete', 'Glass', 'Steel', 'White walls'],
    colors: ['White', 'Grey', 'Black', 'Beige'],
    promptKeywords: [
      'modern minimalist interior',
      'clean lines and open space',
      'neutral color palette',
      'functional minimalist design',
      'contemporary minimal aesthetic'
    ]
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    characteristics: ['Light and airy', 'Natural materials', 'Functional beauty', 'Hygge coziness', 'White with wood accents'],
    materials: ['Light wood', 'Wool', 'Linen', 'Leather'],
    colors: ['White', 'Light grey', 'Pale blue', 'Natural wood'],
    promptKeywords: [
      'Scandinavian interior design',
      'Nordic minimalist style',
      'hygge cozy atmosphere',
      'light wood and white palette',
      'functional Scandi beauty'
    ]
  },
  {
    id: 'industrial',
    name: 'Industrial',
    characteristics: ['Exposed brick', 'Metal fixtures', 'Raw materials', 'Open ductwork', 'Factory aesthetic'],
    materials: ['Brick', 'Steel', 'Concrete', 'Reclaimed wood'],
    colors: ['Grey', 'Brown', 'Black', 'Rust'],
    promptKeywords: [
      'industrial loft interior',
      'exposed brick and metal',
      'raw industrial materials',
      'factory converted aesthetic',
      'urban industrial design'
    ]
  },
  {
    id: 'mid-century-modern',
    name: 'Mid-Century Modern',
    characteristics: ['Organic curves', 'Functional design', 'Bold accent colors', 'Iconic furniture pieces', '1950s-60s aesthetic'],
    materials: ['Teak', 'Walnut', 'Leather', 'Brass'],
    colors: ['Mustard', 'Teal', 'Orange', 'Brown'],
    promptKeywords: [
      'mid-century modern interior',
      '1960s retro design',
      'Eames era furniture',
      'organic curves and wood',
      'vintage modern aesthetic'
    ]
  },
  {
    id: 'bohemian',
    name: 'Bohemian',
    characteristics: ['Eclectic mix', 'Rich textures', 'Global influences', 'Plants and natural elements', 'Layered textiles'],
    materials: ['Rattan', 'Macrame', 'Kilim rugs', 'Velvet'],
    colors: ['Terracotta', 'Turquoise', 'Mustard', 'Purple'],
    promptKeywords: [
      'bohemian eclectic interior',
      'boho chic design',
      'layered textiles and patterns',
      'global influenced decor',
      'artistic bohemian space'
    ]
  },
  {
    id: 'traditional',
    name: 'Traditional',
    characteristics: ['Classic elegance', 'Symmetrical layouts', 'Rich fabrics', 'Ornate details', 'Timeless design'],
    materials: ['Mahogany', 'Silk', 'Velvet', 'Marble'],
    colors: ['Navy', 'Burgundy', 'Gold', 'Cream'],
    promptKeywords: [
      'traditional elegant interior',
      'classic timeless design',
      'symmetrical formal layout',
      'rich fabrics and details',
      'sophisticated traditional style'
    ]
  },
  {
    id: 'coastal',
    name: 'Coastal',
    characteristics: ['Beach-inspired', 'Light and breezy', 'Natural textures', 'Ocean colors', 'Relaxed atmosphere'],
    materials: ['Driftwood', 'Wicker', 'Linen', 'Rope'],
    colors: ['White', 'Navy', 'Seafoam', 'Sandy beige'],
    promptKeywords: [
      'coastal beach interior',
      'nautical inspired design',
      'ocean colors and textures',
      'breezy coastal aesthetic',
      'beachside living style'
    ]
  },
  {
    id: 'art-deco',
    name: 'Art Deco',
    characteristics: ['Geometric patterns', 'Bold colors', 'Glamorous details', 'Luxurious materials', '1920s elegance'],
    materials: ['Marble', 'Brass', 'Velvet', 'Mirror'],
    colors: ['Gold', 'Black', 'Emerald', 'Navy'],
    promptKeywords: [
      'art deco interior design',
      '1920s glamour aesthetic',
      'geometric patterns and gold',
      'luxurious art deco style',
      'gatsby era elegance'
    ]
  }
];

export interface InteriorMood {
  id: string;
  name: string;
  lighting: string;
  textures: string;
  colors: string;
  promptKeywords: string[];
}

export const interiorMoods: InteriorMood[] = [
  {
    id: 'cozy-warm',
    name: 'Cozy & Warm',
    lighting: 'Warm ambient, candles, fireplace glow',
    textures: 'Soft blankets, plush rugs, velvet',
    colors: 'Warm neutrals, amber, terracotta',
    promptKeywords: [
      'cozy warm interior atmosphere',
      'inviting comfortable space',
      'warm ambient lighting',
      'hygge inspired comfort'
    ]
  },
  {
    id: 'light-airy',
    name: 'Light & Airy',
    lighting: 'Natural daylight, sheer curtains',
    textures: 'Light linens, cotton, smooth surfaces',
    colors: 'White, cream, pale pastels',
    promptKeywords: [
      'light airy interior',
      'bright natural daylight',
      'fresh open atmosphere',
      'breezy light-filled space'
    ]
  },
  {
    id: 'bold-dramatic',
    name: 'Bold & Dramatic',
    lighting: 'Dramatic contrast, accent lighting',
    textures: 'Rich velvet, lacquer, metallics',
    colors: 'Deep jewel tones, black, gold',
    promptKeywords: [
      'bold dramatic interior',
      'high contrast design',
      'jewel tone palette',
      'dramatic sophisticated space'
    ]
  },
  {
    id: 'calm-serene',
    name: 'Calm & Serene',
    lighting: 'Soft diffused, natural light',
    textures: 'Smooth, minimal, organic',
    colors: 'Soft blues, greens, neutrals',
    promptKeywords: [
      'calm serene interior',
      'peaceful zen atmosphere',
      'tranquil minimal space',
      'soothing color palette'
    ]
  }
];

export interface FashionCategory {
  id: string;
  name: string;
  characteristics: string[];
  promptKeywords: string[];
}

export const fashionCategories: FashionCategory[] = [
  {
    id: 'high-fashion',
    name: 'High Fashion / Haute Couture',
    characteristics: ['Avant-garde designs', 'Luxury materials', 'Artistic expression', 'Editorial quality', 'Designer runway'],
    promptKeywords: [
      'haute couture fashion',
      'high fashion editorial',
      'luxury designer wear',
      'avant-garde fashion design',
      'runway fashion quality'
    ]
  },
  {
    id: 'streetwear',
    name: 'Streetwear',
    characteristics: ['Urban casual', 'Graphic elements', 'Sneaker culture', 'Youth oriented', 'Brand focused'],
    promptKeywords: [
      'streetwear fashion style',
      'urban street fashion',
      'casual sneaker culture',
      'contemporary street style',
      'hypebeast aesthetic'
    ]
  },
  {
    id: 'minimalist',
    name: 'Minimalist Fashion',
    characteristics: ['Clean silhouettes', 'Neutral palette', 'Quality over quantity', 'Timeless pieces', 'Understated elegance'],
    promptKeywords: [
      'minimalist fashion style',
      'clean simple silhouettes',
      'understated elegant wear',
      'capsule wardrobe aesthetic',
      'refined minimal fashion'
    ]
  },
  {
    id: 'vintage',
    name: 'Vintage / Retro',
    characteristics: ['Period-specific styles', 'Nostalgic references', 'Classic patterns', 'Timeless silhouettes', 'Era-inspired'],
    promptKeywords: [
      'vintage fashion style',
      'retro inspired clothing',
      'classic vintage aesthetic',
      'nostalgic fashion era',
      'period costume design'
    ]
  },
  {
    id: 'bohemian',
    name: 'Bohemian Fashion',
    characteristics: ['Flowy fabrics', 'Earthy colors', 'Eclectic patterns', 'Natural elements', 'Free-spirited'],
    promptKeywords: [
      'bohemian fashion style',
      'boho chic clothing',
      'free-spirited fashion',
      'earthy flowy fabrics',
      'festival fashion aesthetic'
    ]
  },
  {
    id: 'athleisure',
    name: 'Athleisure',
    characteristics: ['Sport-inspired', 'Comfortable', 'Performance fabrics', 'Casual luxury', 'Active lifestyle'],
    promptKeywords: [
      'athleisure fashion style',
      'sporty casual wear',
      'athletic luxury fashion',
      'performance lifestyle wear',
      'modern active style'
    ]
  }
];

export interface ProductTechnique {
  id: string;
  name: string;
  use: string;
  characteristics: string[];
  promptKeywords: string[];
}

export const productTechniques: ProductTechnique[] = [
  {
    id: 'white-background',
    name: 'White Background / Infinity Cove',
    use: 'E-commerce, catalog',
    characteristics: ['Clean isolation', 'No distractions', 'Focus on product', 'Professional clarity'],
    promptKeywords: [
      'product on white background',
      'clean isolated product shot',
      'e-commerce product photography',
      'infinity cove white backdrop',
      'catalog quality product image'
    ]
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle Context',
    use: 'Marketing, advertising',
    characteristics: ['Product in use', 'Environmental context', 'Storytelling', 'Aspirational setting'],
    promptKeywords: [
      'lifestyle product photography',
      'product in use context',
      'aspirational product imagery',
      'marketing lifestyle shot',
      'contextual product scene'
    ]
  },
  {
    id: 'flat-lay',
    name: 'Flat Lay',
    use: 'Social media, editorial',
    characteristics: ['Overhead view', 'Arranged composition', 'Multiple products', 'Styled props'],
    promptKeywords: [
      'flat lay product photography',
      'overhead arranged composition',
      'styled flat lay setup',
      'Instagram flat lay aesthetic',
      'curated overhead shot'
    ]
  },
  {
    id: 'hero',
    name: 'Hero Shot',
    use: 'Advertising, campaigns',
    characteristics: ['Dramatic lighting', 'Impactful angle', 'Premium feel', 'Attention-grabbing'],
    promptKeywords: [
      'hero product shot',
      'dramatic product lighting',
      'premium product photography',
      'impactful product angle',
      'advertising hero image'
    ]
  },
  {
    id: 'macro',
    name: 'Macro / Detail',
    use: 'Quality showcase, luxury',
    characteristics: ['Extreme close-up', 'Texture detail', 'Material quality', 'Craftsmanship focus'],
    promptKeywords: [
      'macro product detail shot',
      'extreme close-up texture',
      'material quality showcase',
      'craftsmanship detail photography'
    ]
  }
];

export interface ProductLighting {
  id: string;
  name: string;
  effect: string;
  use: string;
  promptKeywords: string[];
}

export const productLighting: ProductLighting[] = [
  {
    id: 'softbox',
    name: 'Softbox Lighting',
    effect: 'Even, diffused, minimal shadows',
    use: 'General product, e-commerce',
    promptKeywords: [
      'soft diffused product lighting',
      'even professional illumination',
      'softbox lit product'
    ]
  },
  {
    id: 'rim-light',
    name: 'Rim / Edge Lighting',
    effect: 'Glowing edges, separation',
    use: 'Premium products, tech',
    promptKeywords: [
      'rim lit product edges',
      'glowing edge lighting',
      'product separation light'
    ]
  },
  {
    id: 'dramatic',
    name: 'Dramatic Single Source',
    effect: 'Strong shadows, dimension',
    use: 'Luxury, artistic',
    promptKeywords: [
      'dramatic single source light',
      'strong shadow product shot',
      'moody product lighting'
    ]
  },
  {
    id: 'natural',
    name: 'Natural Window Light',
    effect: 'Soft, authentic, lifestyle',
    use: 'Lifestyle, organic products',
    promptKeywords: [
      'natural window light product',
      'soft authentic lighting',
      'lifestyle natural illumination'
    ]
  }
];

export function getInteriorStyleById(id: string): InteriorStyle | undefined {
  return interiorStyles.find(s => s.id === id);
}

export function getInteriorMoodById(id: string): InteriorMood | undefined {
  return interiorMoods.find(m => m.id === id);
}

export function getFashionCategoryById(id: string): FashionCategory | undefined {
  return fashionCategories.find(f => f.id === id);
}

export function getProductTechniqueById(id: string): ProductTechnique | undefined {
  return productTechniques.find(t => t.id === id);
}

export function getProductLightingById(id: string): ProductLighting | undefined {
  return productLighting.find(l => l.id === id);
}

export type IndustryType = 'interior' | 'fashion' | 'product';

export interface IndustryConfig {
  industry: IndustryType;
  style?: string;
  mood?: string;
  technique?: string;
  lighting?: string;
}

export function applyIndustryKnowledge(prompt: string, config: IndustryConfig): string {
  const enhancements: string[] = [];
  
  if (config.industry === 'interior') {
    if (config.style) {
      const style = getInteriorStyleById(config.style);
      if (style) enhancements.push(...style.promptKeywords.slice(0, 2));
    }
    if (config.mood) {
      const mood = getInteriorMoodById(config.mood);
      if (mood) enhancements.push(mood.promptKeywords[0]);
    }
  }
  
  if (config.industry === 'fashion') {
    if (config.style) {
      const category = getFashionCategoryById(config.style);
      if (category) enhancements.push(...category.promptKeywords.slice(0, 2));
    }
  }
  
  if (config.industry === 'product') {
    if (config.technique) {
      const technique = getProductTechniqueById(config.technique);
      if (technique) enhancements.push(...technique.promptKeywords.slice(0, 2));
    }
    if (config.lighting) {
      const lighting = getProductLightingById(config.lighting);
      if (lighting) enhancements.push(lighting.promptKeywords[0]);
    }
  }
  
  return enhancements.length > 0 
    ? `${prompt}, ${enhancements.join(', ')}, professional ${config.industry} quality` 
    : prompt;
}
