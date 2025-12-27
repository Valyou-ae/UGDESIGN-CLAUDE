/**
 * CINEMATIC DNA SYSTEM
 * 7 Core Components for Cinematic Excellence
 */

export interface AtmosphericEffect {
  type: string;
  description: string;
  promptKeywords: string[];
}

export interface LightingSystem {
  name: string;
  category: 'studio' | 'natural' | 'dramatic' | 'practical';
  description: string;
  promptKeywords: string[];
  bestFor: string[];
}

export interface DepthLayer {
  position: string;
  focus: string;
  purpose: string;
  promptKeywords: string[];
}

export interface ColorGrade {
  name: string;
  shadows: string;
  highlights: string;
  mood: string;
  promptKeywords: string[];
}

export const ATMOSPHERIC_EFFECTS: Record<string, AtmosphericEffect> = {
  'ground-fog': {
    type: 'fog',
    description: 'Low-lying fog that hugs surfaces',
    promptKeywords: ['low ground fog', 'fog hugging the terrain', 'misty ground layer']
  },
  'volumetric-fog': {
    type: 'fog',
    description: 'Fog with visible light rays through it',
    promptKeywords: ['volumetric fog with light rays', 'god rays through fog', 'atmospheric light scattering']
  },
  'morning-mist': {
    type: 'mist',
    description: 'Ethereal, delicate morning atmosphere',
    promptKeywords: ['ethereal morning mist', 'delicate misty atmosphere', 'dawn mist rising']
  },
  'dust-motes': {
    type: 'particles',
    description: 'Floating dust particles in light beams',
    promptKeywords: ['dust motes dancing in sunbeams', 'floating particles in light', 'visible dust in volumetric light']
  },
  'god-rays': {
    type: 'light',
    description: 'Dramatic light beams from light source through atmosphere',
    promptKeywords: ['god rays piercing through', 'crepuscular rays visible in atmosphere', 'dramatic light beams cutting through haze', 'volumetric light shafts']
  },
  'smoke': {
    type: 'particles',
    description: 'Wispy smoke trails adding atmosphere',
    promptKeywords: ['wispy smoke trails', 'atmospheric smoke haze', 'curling smoke in light']
  }
};

export const CINEMATIC_LIGHTING: Record<string, LightingSystem> = {
  'three-point': {
    name: 'Three-Point Lighting',
    category: 'studio',
    description: 'Key light, fill light, and rim light for professional dimensional look',
    promptKeywords: ['professional three-point lighting setup', 'key light with fill and rim separation', 'balanced studio illumination'],
    bestFor: ['portraits', 'product photography', 'professional headshots']
  },
  'rembrandt': {
    name: 'Rembrandt Lighting',
    category: 'studio',
    description: 'Classic portrait lighting with triangle of light under eye',
    promptKeywords: ['Rembrandt lighting with triangle highlight', 'classic portrait lighting with shadowed side', 'dimensional facial illumination'],
    bestFor: ['dramatic portraits', 'artistic photography', 'character studies']
  },
  'butterfly': {
    name: 'Butterfly/Paramount Lighting',
    category: 'studio',
    description: 'Symmetrical beauty lighting from directly above',
    promptKeywords: ['butterfly lighting creating symmetrical beauty', 'glamorous overhead illumination', 'classic Hollywood portrait lighting'],
    bestFor: ['beauty photography', 'fashion', 'glamour shots']
  },
  'split': {
    name: 'Split Lighting',
    category: 'dramatic',
    description: 'Half face lit, half in shadow for maximum drama',
    promptKeywords: ['dramatic split lighting half face illuminated', 'high contrast half-face lighting', 'mysterious split illumination'],
    bestFor: ['dramatic portraits', 'film noir aesthetic', 'mysterious subjects']
  },
  'golden-hour': {
    name: 'Golden Hour',
    category: 'natural',
    description: 'Warm, low-angle sunlight with long shadows',
    promptKeywords: ['golden hour warm side lighting', 'low sun with long shadows', 'warm atmospheric glow', 'orange-gold light quality'],
    bestFor: ['landscapes', 'lifestyle photography', 'romantic scenes']
  },
  'blue-hour': {
    name: 'Blue Hour',
    category: 'natural',
    description: 'Cool, ambient twilight with ethereal quality',
    promptKeywords: ['blue hour twilight ambiance', 'cool ambient light with no direct sun', 'ethereal blue atmosphere', 'magical twilight quality'],
    bestFor: ['cityscapes', 'moody portraits', 'atmospheric scenes']
  },
  'chiaroscuro': {
    name: 'Chiaroscuro',
    category: 'dramatic',
    description: 'Strong light/dark contrast for dramatic effect',
    promptKeywords: ['chiaroscuro lighting with strong contrast', 'dramatic light and shadow interplay', 'renaissance painting lighting'],
    bestFor: ['dramatic art', 'fine art photography', 'editorial']
  },
  'low-key': {
    name: 'Low-Key Lighting',
    category: 'dramatic',
    description: 'Predominantly dark with minimal fill',
    promptKeywords: ['low-key dramatic with minimal fill', 'predominantly dark illumination', 'deep shadow emphasis'],
    bestFor: ['moody portraits', 'product drama', 'film noir']
  },
  'high-key': {
    name: 'High-Key Lighting',
    category: 'studio',
    description: 'Bright, minimal shadows, clean and airy',
    promptKeywords: ['high-key bright with minimal shadows', 'clean bright illumination', 'airy light-filled scene'],
    bestFor: ['beauty', 'fashion', 'commercial photography']
  },
  'window-light': {
    name: 'Window Light',
    category: 'practical',
    description: 'Natural light through windows for soft, natural look',
    promptKeywords: ['soft natural window light', 'diffused daylight through windows', 'natural interior illumination'],
    bestFor: ['lifestyle', 'interior photography', 'natural portraits']
  }
};

export const DEPTH_LAYERS: Record<string, DepthLayer> = {
  'extreme-foreground': {
    position: 'Nearest to camera',
    focus: 'Out of focus blur',
    purpose: 'Frame and depth cue',
    promptKeywords: ['out-of-focus foreground element', 'blurred framing element', 'extreme foreground bokeh']
  },
  'foreground': {
    position: 'In front of subject',
    focus: 'Sharp or slight blur',
    purpose: 'Context and leading lines',
    promptKeywords: ['foreground interest', 'leading elements in foreground', 'contextual foreground']
  },
  'subject': {
    position: 'Primary focus plane',
    focus: 'Tack sharp',
    purpose: 'Main interest',
    promptKeywords: ['sharp focus on subject', 'tack-sharp main subject', 'perfect focus plane']
  },
  'midground': {
    position: 'Behind subject',
    focus: 'Beginning blur',
    purpose: 'Environmental context',
    promptKeywords: ['transitional midground', 'context behind subject', 'environmental depth']
  },
  'background': {
    position: 'Furthest from camera',
    focus: 'Full bokeh blur',
    purpose: 'Separation and mood',
    promptKeywords: ['creamy bokeh background', 'soft background separation', 'atmospheric background blur']
  }
};

export const COLOR_GRADES: Record<string, ColorGrade> = {
  'teal-orange': {
    name: 'Teal & Orange',
    shadows: 'Teal/cyan push',
    highlights: 'Warm orange',
    mood: 'Blockbuster cinematic',
    promptKeywords: ['teal and orange color grading', 'blockbuster color palette', 'Hollywood teal orange grade', 'cinematic color contrast']
  },
  'bleach-bypass': {
    name: 'Bleach Bypass',
    shadows: 'Dense, crushed',
    highlights: 'Desaturated, gritty',
    mood: 'Gritty, documentary',
    promptKeywords: ['desaturated bleach bypass look', 'gritty high contrast grade', 'war film color treatment']
  },
  'warm-nostalgic': {
    name: 'Warm Nostalgic',
    shadows: 'Lifted, faded',
    highlights: 'Yellow/amber',
    mood: 'Nostalgic, vintage',
    promptKeywords: ['warm nostalgic color palette', 'vintage film warmth', 'faded nostalgic tones']
  },
  'cool-modern': {
    name: 'Cool Modern',
    shadows: 'Blue/cyan',
    highlights: 'Clean white',
    mood: 'Sci-fi, corporate',
    promptKeywords: ['cool modern cinematic grade', 'clean cool color palette', 'contemporary cool tones']
  },
  'pastel-dreams': {
    name: 'Pastel Dreams',
    shadows: 'Soft pink',
    highlights: 'Lavender/cream',
    mood: 'Romantic, ethereal',
    promptKeywords: ['soft pastel color palette', 'dreamy muted tones', 'romantic pastel atmosphere']
  },
  'neon-cyberpunk': {
    name: 'Neon Cyberpunk',
    shadows: 'Deep blue-black',
    highlights: 'Magenta/cyan neon',
    mood: 'Futuristic, urban',
    promptKeywords: ['neon cyberpunk color palette', 'magenta and cyan neon lights', 'futuristic urban glow', 'Blade Runner inspired colors']
  }
};

export function getAtmosphericEffect(type: string): AtmosphericEffect | undefined {
  return ATMOSPHERIC_EFFECTS[type];
}

export function getCinematicLighting(type: string): LightingSystem | undefined {
  return CINEMATIC_LIGHTING[type];
}

export function getDepthLayerPrompts(): string[] {
  return Object.values(DEPTH_LAYERS).flatMap(layer => layer.promptKeywords);
}

export function getColorGrade(type: string): ColorGrade | undefined {
  return COLOR_GRADES[type];
}

export function buildCinematicPrompt(config: {
  atmosphere?: string;
  lighting?: string;
  depthEmphasis?: boolean;
  colorGrade?: string;
}): string {
  const parts: string[] = [];
  
  if (config.atmosphere && ATMOSPHERIC_EFFECTS[config.atmosphere]) {
    parts.push(...ATMOSPHERIC_EFFECTS[config.atmosphere].promptKeywords.slice(0, 2));
  }
  
  if (config.lighting && CINEMATIC_LIGHTING[config.lighting]) {
    parts.push(...CINEMATIC_LIGHTING[config.lighting].promptKeywords.slice(0, 2));
  }
  
  if (config.depthEmphasis) {
    parts.push('layered depth with clear spatial separation', 'foreground interest leading to background');
  }
  
  if (config.colorGrade && COLOR_GRADES[config.colorGrade]) {
    parts.push(...COLOR_GRADES[config.colorGrade].promptKeywords.slice(0, 2));
  }
  
  return parts.join(', ');
}
