/**
 * COLOR PSYCHOLOGY & EMOTIONAL RESONANCE
 * 50+ emotional color palettes and harmony systems
 */

export interface ColorEmotion {
  color: string;
  hex: string;
  emotions: {
    positive: string[];
    negative: string[];
  };
  psychological: Record<string, string>;
  useCases: string[];
  promptKeywords: string[];
}

export interface ColorPalette {
  name: string;
  category: 'cinematic' | 'mood' | 'temperature' | 'harmony';
  colors: string[];
  mood: string;
  promptKeywords: string[];
}

export const COLOR_EMOTIONS: Record<string, ColorEmotion> = {
  'red': {
    color: 'Red',
    hex: '#FF0000',
    emotions: {
      positive: ['passion', 'love', 'energy', 'power', 'excitement'],
      negative: ['anger', 'danger', 'aggression', 'warning']
    },
    psychological: {
      physicalEffect: 'Increases heart rate and metabolism',
      attention: 'Highest attention-grabbing color',
      appetite: 'Stimulates hunger'
    },
    useCases: ['Call-to-action', 'Food photography', 'Romantic scenes', 'Action imagery'],
    promptKeywords: ['passionate red tones', 'energetic red accents', 'romantic red lighting', 'dramatic red color palette']
  },
  'blue': {
    color: 'Blue',
    hex: '#0000FF',
    emotions: {
      positive: ['trust', 'calm', 'stability', 'wisdom', 'loyalty'],
      negative: ['coldness', 'sadness', 'aloofness']
    },
    psychological: {
      physicalEffect: 'Lowers heart rate, calming',
      trust: 'Most trusted color in business',
      focus: 'Increases productivity'
    },
    useCases: ['Corporate imagery', 'Technology scenes', 'Serene landscapes', 'Night photography'],
    promptKeywords: ['calm blue atmosphere', 'trustworthy blue tones', 'serene blue color palette', 'cool blue lighting']
  },
  'yellow': {
    color: 'Yellow',
    hex: '#FFFF00',
    emotions: {
      positive: ['joy', 'optimism', 'creativity', 'warmth', 'clarity'],
      negative: ['cowardice', 'caution', 'anxiety']
    },
    psychological: {
      physicalEffect: 'Stimulates mental activity',
      mood: 'Most cheerful color'
    },
    useCases: ['Summer scenes', 'Joyful imagery', 'Childrens content', 'Vintage nostalgic'],
    promptKeywords: ['joyful yellow sunshine', 'warm golden yellow tones', 'optimistic yellow accents', 'cheerful yellow palette']
  },
  'green': {
    color: 'Green',
    hex: '#00FF00',
    emotions: {
      positive: ['nature', 'growth', 'harmony', 'health', 'renewal'],
      negative: ['envy', 'inexperience', 'boredom']
    },
    psychological: {
      effect: 'Calming, balancing',
      association: 'Nature and environment'
    },
    useCases: ['Nature photography', 'Health wellness', 'Environmental themes', 'Calming scenes'],
    promptKeywords: ['natural green environment', 'lush green vegetation', 'fresh green tones', 'organic green palette']
  },
  'purple': {
    color: 'Purple',
    hex: '#800080',
    emotions: {
      positive: ['royalty', 'mystery', 'spirituality', 'luxury', 'creativity'],
      negative: ['arrogance', 'moodiness']
    },
    psychological: {
      association: 'Royalty and luxury',
      effect: 'Inspires creativity'
    },
    useCases: ['Luxury products', 'Mystical scenes', 'Creative themes', 'Premium branding'],
    promptKeywords: ['royal purple tones', 'mysterious purple atmosphere', 'luxurious purple palette', 'spiritual purple lighting']
  },
  'orange': {
    color: 'Orange',
    hex: '#FFA500',
    emotions: {
      positive: ['creativity', 'enthusiasm', 'warmth', 'adventure', 'confidence'],
      negative: ['aggression', 'immaturity']
    },
    psychological: {
      effect: 'Energizing without intensity of red',
      appetite: 'Stimulates appetite'
    },
    useCases: ['Autumn scenes', 'Food photography', 'Adventure themes', 'Sunset imagery'],
    promptKeywords: ['warm orange glow', 'enthusiastic orange tones', 'autumn orange palette', 'sunset orange atmosphere']
  }
};

export const COLOR_PALETTES: Record<string, ColorPalette> = {
  // Cinematic Palettes
  'teal-orange': {
    name: 'Teal & Orange',
    category: 'cinematic',
    colors: ['#008080', '#FF8C00'],
    mood: 'Blockbuster cinematic',
    promptKeywords: ['teal and orange color grading', 'blockbuster color palette', 'Hollywood teal orange grade', 'cinematic color contrast']
  },
  'noir': {
    name: 'Film Noir',
    category: 'cinematic',
    colors: ['#000000', '#FFFFFF', '#808080'],
    mood: 'Dramatic, mysterious',
    promptKeywords: ['film noir high contrast lighting', 'dramatic noir shadows', 'chiaroscuro noir style', 'moody noir atmosphere']
  },
  'neon-cyberpunk': {
    name: 'Neon Cyberpunk',
    category: 'cinematic',
    colors: ['#FF00FF', '#00FFFF', '#FFFF00', '#1a1a2e'],
    mood: 'Futuristic, urban',
    promptKeywords: ['neon cyberpunk color palette', 'magenta and cyan neon lights', 'futuristic urban glow', 'Blade Runner inspired colors']
  },
  'pastel-dreams': {
    name: 'Pastel Dreams',
    category: 'cinematic',
    colors: ['#FFB6C1', '#E6E6FA', '#98FB98', '#FFDAB9'],
    mood: 'Romantic, ethereal',
    promptKeywords: ['soft pastel color palette', 'dreamy muted tones', 'romantic pastel atmosphere', 'ethereal soft colors']
  },
  
  // Mood Palettes
  'romantic': {
    name: 'Romantic',
    category: 'mood',
    colors: ['Soft pink', 'Warm red', 'Blush', 'Gold'],
    mood: 'Love, intimacy, warmth',
    promptKeywords: ['romantic warm pink tones', 'soft blush color palette', 'intimate golden warmth', 'love-inspired color mood']
  },
  'mysterious': {
    name: 'Mysterious',
    category: 'mood',
    colors: ['Deep purple', 'Midnight blue', 'Black', 'Silver'],
    mood: 'Enigmatic, intriguing',
    promptKeywords: ['mysterious dark purples', 'enigmatic midnight blues', 'shadowy mysterious palette', 'intrigue-filled color mood']
  },
  'energetic': {
    name: 'Energetic',
    category: 'mood',
    colors: ['Bright orange', 'Electric yellow', 'Hot pink', 'Lime'],
    mood: 'Dynamic, vibrant, active',
    promptKeywords: ['energetic vibrant colors', 'dynamic bright palette', 'high-energy color mood', 'vivid saturated tones']
  },
  'melancholic': {
    name: 'Melancholic',
    category: 'mood',
    colors: ['Muted blue', 'Grey', 'Desaturated green', 'Dusty purple'],
    mood: 'Sad, contemplative, pensive',
    promptKeywords: ['melancholic muted tones', 'contemplative desaturated colors', 'pensive grey-blue palette', 'somber color mood']
  },
  'peaceful': {
    name: 'Peaceful',
    category: 'mood',
    colors: ['Soft blue', 'Sage green', 'Cream', 'Lavender'],
    mood: 'Calm, tranquil, serene',
    promptKeywords: ['peaceful serene colors', 'tranquil soft palette', 'calming gentle tones', 'zen-like color mood']
  },
  'nostalgic': {
    name: 'Nostalgic',
    category: 'mood',
    colors: ['Sepia', 'Faded yellow', 'Warm brown', 'Cream'],
    mood: 'Vintage, wistful, memories',
    promptKeywords: ['nostalgic vintage tones', 'sepia-tinted colors', 'warm nostalgic palette', 'memory-evoking color mood']
  },
  
  // Temperature Palettes
  'warm': {
    name: 'Warm Colors',
    category: 'temperature',
    colors: ['Red', 'Orange', 'Yellow', 'Warm Brown'],
    mood: 'Cozy, intimate, energizing',
    promptKeywords: ['warm color palette creating intimacy', 'advancing warm tones', 'cozy warm atmosphere', 'energetic warm colors']
  },
  'cool': {
    name: 'Cool Colors',
    category: 'temperature',
    colors: ['Blue', 'Green', 'Purple', 'Cool Grey'],
    mood: 'Calm, professional, distant',
    promptKeywords: ['cool color palette creating depth', 'receding cool tones', 'calm cool atmosphere', 'professional cool colors']
  },
  
  // Harmony Systems
  'complementary': {
    name: 'Complementary',
    category: 'harmony',
    colors: ['Opposite colors on wheel'],
    mood: 'High contrast, vibrant',
    promptKeywords: ['complementary color contrast', 'vibrant opposing colors', 'high color contrast composition']
  },
  'analogous': {
    name: 'Analogous',
    category: 'harmony',
    colors: ['Adjacent colors on wheel'],
    mood: 'Harmonious, serene',
    promptKeywords: ['harmonious analogous colors', 'naturally blending color tones', 'serene color harmony']
  },
  'triadic': {
    name: 'Triadic',
    category: 'harmony',
    colors: ['Three equally spaced colors'],
    mood: 'Balanced, dynamic',
    promptKeywords: ['balanced triadic color scheme', 'dynamic three-color harmony', 'vibrant triadic palette']
  }
};

export function getColorEmotion(color: string): ColorEmotion | undefined {
  return COLOR_EMOTIONS[color.toLowerCase()];
}

export function getColorPalette(paletteId: string): ColorPalette | undefined {
  return COLOR_PALETTES[paletteId];
}

export function getPalettesByCategory(category: ColorPalette['category']): ColorPalette[] {
  return Object.values(COLOR_PALETTES).filter(p => p.category === category);
}

export function getMoodPalettes(): ColorPalette[] {
  return getPalettesByCategory('mood');
}

export function getCinematicPalettes(): ColorPalette[] {
  return getPalettesByCategory('cinematic');
}

export function buildColorPrompt(palette: string, mood?: string): string {
  const paletteData = getColorPalette(palette);
  if (paletteData) {
    return paletteData.promptKeywords.slice(0, 3).join(', ');
  }
  
  // If no palette found, try to match mood
  if (mood) {
    const moodPalettes = getMoodPalettes();
    const matched = moodPalettes.find(p => p.name.toLowerCase().includes(mood.toLowerCase()));
    if (matched) {
      return matched.promptKeywords.slice(0, 3).join(', ');
    }
  }
  
  return '';
}
