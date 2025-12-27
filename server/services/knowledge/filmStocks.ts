/**
 * FILM STOCKS & POST-PROCESSING
 * 20+ authentic film stock emulations
 */

export interface FilmStock {
  name: string;
  type: 'color-negative' | 'color-reversal' | 'cinema' | 'black-white' | 'specialty';
  iso: number;
  characteristics: Record<string, string>;
  bestFor: string[];
  promptKeywords: string[];
}

export interface GrainProfile {
  level: 'fine' | 'medium' | 'heavy' | 'extreme';
  description: string;
  films: string[];
  promptKeywords: string[];
}

export const FILM_STOCKS: Record<string, FilmStock> = {
  // Color Negative Films
  'portra-400': {
    name: 'Kodak Portra 400',
    type: 'color-negative',
    iso: 400,
    characteristics: {
      skinTones: 'Exceptionally flattering, warm and natural',
      colors: 'Muted, pastel-like, low saturation',
      contrast: 'Low to medium',
      highlights: 'Smooth rolloff, never harsh',
      shadows: 'Lifted, with creamy quality',
      grain: 'Fine, pleasing structure'
    },
    bestFor: ['Portrait photography', 'Wedding/lifestyle', 'Fashion editorial', 'Travel with people'],
    promptKeywords: ['Kodak Portra 400 color profile', 'muted pastel film tones', 'flattering natural skin tones', 'low contrast lifted shadows', 'fine film grain texture', 'Portra film look']
  },
  'ektar-100': {
    name: 'Kodak Ektar 100',
    type: 'color-negative',
    iso: 100,
    characteristics: {
      colors: 'Highly saturated, punchy',
      contrast: 'High',
      grain: 'Extremely fine',
      sharpness: 'Exceptionally sharp'
    },
    bestFor: ['Landscape photography', 'Product photography', 'Architecture', 'Vivid color work'],
    promptKeywords: ['Kodak Ektar 100 vivid colors', 'highly saturated color film', 'punchy contrast', 'extremely fine grain', 'vibrant landscape colors']
  },
  'cinestill-800t': {
    name: 'Cinestill 800T',
    type: 'specialty',
    iso: 800,
    characteristics: {
      colorBalance: 'Tungsten balanced',
      halation: 'Distinctive red/orange glow around highlights',
      colors: 'Cinematic, blue-teal shadows',
      contrast: 'Medium-high',
      grain: 'Visible, characterful'
    },
    bestFor: ['Night photography', 'Neon signs', 'Urban nightscapes', 'Cinematic portraits'],
    promptKeywords: ['Cinestill 800T look', 'halation glow around lights', 'tungsten balanced film', 'cinematic night photography', 'red-orange highlight halation', 'teal shadows with neon glow']
  },
  'gold-200': {
    name: 'Kodak Gold 200',
    type: 'color-negative',
    iso: 200,
    characteristics: {
      colors: 'Warm, slightly saturated',
      contrast: 'Medium',
      grain: 'Visible but pleasing',
      character: 'Consumer film charm'
    },
    bestFor: ['Everyday photography', 'Nostalgic snapshots', 'Summer vibes'],
    promptKeywords: ['Kodak Gold 200 warm tones', 'nostalgic consumer film look', 'warm saturated colors', 'classic film photography']
  },
  
  // Color Reversal (Slide) Films
  'velvia-50': {
    name: 'Fuji Velvia 50',
    type: 'color-reversal',
    iso: 50,
    characteristics: {
      colors: 'Extreme saturation',
      contrast: 'High',
      grain: 'Extremely fine',
      reds: 'Intense, sometimes over-saturated',
      greens: 'Lush, vivid',
      blues: 'Deep, rich'
    },
    bestFor: ['Landscape photography', 'Nature/wildlife', 'Sunrise/sunset'],
    promptKeywords: ['Fuji Velvia 50 hyper-saturation', 'vivid slide film colors', 'intense color rendition', 'lush greens and deep blues', 'punchy landscape colors']
  },
  'kodachrome-64': {
    name: 'Kodachrome 64',
    type: 'color-reversal',
    iso: 64,
    characteristics: {
      colors: 'Neutral, accurate with slight warmth',
      reds: 'Legendary rich reds',
      contrast: 'Medium-high',
      sharpness: 'Exceptional'
    },
    bestFor: ['Classic photography', 'Period pieces', 'Documentary'],
    promptKeywords: ['Kodachrome 64 classic look', 'vintage Kodachrome colors', 'rich Kodachrome reds', '1960s-70s color photography look', 'classic slide film warmth']
  },
  'provia-100f': {
    name: 'Fuji Provia 100F',
    type: 'color-reversal',
    iso: 100,
    characteristics: {
      colors: 'Accurate, neutral',
      contrast: 'Medium',
      grain: 'Very fine',
      versatility: 'All-around slide film'
    },
    bestFor: ['Product photography', 'Commercial work', 'Accurate color reproduction'],
    promptKeywords: ['Fuji Provia 100F accurate colors', 'neutral slide film rendering', 'professional transparency film']
  },
  
  // Cinema Film Stocks
  'vision3-500t': {
    name: 'Kodak Vision3 500T',
    type: 'cinema',
    iso: 500,
    characteristics: {
      balance: 'Tungsten balanced (3200K)',
      dynamicRange: '15+ stops',
      grain: 'Fine for high ISO',
      colors: 'Rich, cinematic',
      shadows: 'Excellent detail retention'
    },
    bestFor: ['Major film productions', 'High-end commercials', 'Indoor/studio work'],
    promptKeywords: ['Kodak Vision3 500T cinema look', 'Hollywood film stock color', 'professional motion picture quality', '15-stop dynamic range', 'rich cinematic color rendition']
  },
  'vision3-50d': {
    name: 'Kodak Vision3 50D',
    type: 'cinema',
    iso: 50,
    characteristics: {
      balance: 'Daylight balanced (5500K)',
      dynamicRange: '16+ stops',
      grain: 'Extremely fine',
      colors: 'Natural, balanced'
    },
    bestFor: ['Daylight exteriors', 'High detail work', 'Premium productions'],
    promptKeywords: ['Kodak Vision3 50D daylight film', 'cinema daylight stock', 'extremely fine motion picture grain', 'natural daylight colors']
  },
  'arri-alexa': {
    name: 'ARRI Alexa / LogC',
    type: 'cinema',
    iso: 800,
    characteristics: {
      dynamicRange: '14+ stops',
      colorScience: 'Famous for natural rendering',
      skinTones: 'Industry-leading',
      highlights: 'Beautiful rolloff'
    },
    bestFor: ['Premium digital cinema', 'Television production', 'Commercials'],
    promptKeywords: ['ARRI Alexa color science', 'premium digital cinema look', 'natural color rendition', 'beautiful highlight rolloff', 'clean detailed shadows']
  },
  
  // Black & White Films
  'tri-x-400': {
    name: 'Kodak Tri-X 400',
    type: 'black-white',
    iso: 400,
    characteristics: {
      grain: 'Distinctive, characterful',
      contrast: 'Medium-high',
      tones: 'Rich midtones',
      look: 'Classic photojournalism'
    },
    bestFor: ['Street photography', 'Documentary', 'Portraits', 'Available light'],
    promptKeywords: ['Kodak Tri-X 400 black and white', 'classic photojournalism grain', 'characterful B&W film look', 'rich midtone contrast', 'documentary photography style']
  },
  'hp5-plus': {
    name: 'Ilford HP5 Plus 400',
    type: 'black-white',
    iso: 400,
    characteristics: {
      grain: 'Medium, pleasing',
      contrast: 'Medium',
      pushability: 'Excellent up to 3200',
      tones: 'Smooth gradation'
    },
    bestFor: ['Versatile B&W work', 'Low light', 'Classic photography'],
    promptKeywords: ['Ilford HP5 Plus film look', 'smooth B&W tonal gradation', 'classic British film character', 'versatile black and white']
  },
  'delta-3200': {
    name: 'Ilford Delta 3200',
    type: 'black-white',
    iso: 3200,
    characteristics: {
      grain: 'Prominent, artistic',
      contrast: 'High',
      character: 'Moody, atmospheric'
    },
    bestFor: ['Low light situations', 'Concert photography', 'Artistic grain effect'],
    promptKeywords: ['Ilford Delta 3200 grainy look', 'high ISO film grain', 'moody atmospheric B&W', 'concert photography aesthetic']
  }
};

export const GRAIN_PROFILES: Record<string, GrainProfile> = {
  'fine': {
    level: 'fine',
    description: 'Minimal, barely visible grain',
    films: ['Ektar 100', 'Velvia 50', 'T-MAX 100'],
    promptKeywords: ['extremely fine grain', 'nearly grainless film', 'smooth film texture']
  },
  'medium': {
    level: 'medium',
    description: 'Visible but pleasing grain',
    films: ['Portra 400', 'HP5 Plus', 'Pro 400H'],
    promptKeywords: ['fine film grain texture', 'pleasing grain structure', 'subtle film texture']
  },
  'heavy': {
    level: 'heavy',
    description: 'Prominent, characterful grain',
    films: ['Tri-X pushed', 'Delta 3200', '800T'],
    promptKeywords: ['visible film grain', 'characterful grain texture', 'gritty film look']
  },
  'extreme': {
    level: 'extreme',
    description: 'Very heavy, artistic grain',
    films: ['3200 pushed to 12800', 'Expired film'],
    promptKeywords: ['heavy film grain', 'extreme grain texture', 'lo-fi film aesthetic']
  }
};

export function getFilmStock(stockId: string): FilmStock | undefined {
  return FILM_STOCKS[stockId];
}

export function getFilmStocksByType(type: FilmStock['type']): FilmStock[] {
  return Object.values(FILM_STOCKS).filter(f => f.type === type);
}

export function getGrainProfile(level: string): GrainProfile | undefined {
  return GRAIN_PROFILES[level];
}

export function buildFilmStockPrompt(stockId: string, includeGrain: boolean = true): string {
  const stock = getFilmStock(stockId);
  if (!stock) return '';
  
  const keywords = [...stock.promptKeywords.slice(0, 3)];
  
  if (includeGrain && stock.characteristics.grain) {
    const grainLevel = stock.characteristics.grain.toLowerCase().includes('fine') ? 'fine' : 
                       stock.characteristics.grain.toLowerCase().includes('heavy') ? 'heavy' : 'medium';
    const grain = getGrainProfile(grainLevel);
    if (grain) {
      keywords.push(grain.promptKeywords[0]);
    }
  }
  
  return keywords.join(', ');
}

export function getAllFilmStockIds(): string[] {
  return Object.keys(FILM_STOCKS);
}
