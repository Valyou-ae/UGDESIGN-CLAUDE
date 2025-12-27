export interface WeatherEffect {
  id: string;
  name: string;
  category: 'rain' | 'snow' | 'fog' | 'sky' | 'season';
  description: string;
  visual?: string;
  reflections?: string;
  promptKeywords: string[];
}

export const rainEffects: WeatherEffect[] = [
  {
    id: 'light-rain',
    name: 'Light Rain',
    category: 'rain',
    description: 'Gentle drizzle, soft atmosphere',
    visual: 'Fine droplets, slight blur',
    reflections: 'Wet surfaces, subtle reflections',
    promptKeywords: [
      'light rain drizzle',
      'soft rain atmosphere',
      'wet surfaces with reflections',
      'gentle rainfall ambiance'
    ]
  },
  {
    id: 'heavy-rain',
    name: 'Heavy Rain',
    category: 'rain',
    description: 'Downpour, dramatic',
    visual: 'Visible rain streaks, splashing',
    reflections: 'Strong puddle reflections',
    promptKeywords: [
      'heavy rain downpour',
      'dramatic rainfall with streaks',
      'rain splashing on surfaces',
      'intense storm rain'
    ]
  },
  {
    id: 'after-rain',
    name: 'After Rain',
    category: 'rain',
    description: 'Wet world, fresh atmosphere',
    visual: 'Glistening surfaces, saturated colors',
    promptKeywords: [
      'after rain wet surfaces',
      'glistening post-rain world',
      'saturated colors after rainfall',
      'fresh rainy atmosphere'
    ]
  }
];

export const snowEffects: WeatherEffect[] = [
  {
    id: 'light-snow',
    name: 'Light Snowfall',
    category: 'snow',
    description: 'Gentle flurries falling',
    promptKeywords: [
      'light snow flurries falling',
      'gentle snowfall atmosphere',
      'delicate snow particles'
    ]
  },
  {
    id: 'heavy-snow',
    name: 'Heavy Blizzard',
    category: 'snow',
    description: 'Blizzard conditions with reduced visibility',
    promptKeywords: [
      'heavy blizzard snowfall',
      'intense snow storm',
      'reduced visibility from snow'
    ]
  },
  {
    id: 'fresh-snow',
    name: 'Fresh Pristine Snow',
    category: 'snow',
    description: 'Pristine, untouched snow covering',
    promptKeywords: [
      'fresh pristine snow',
      'untouched snow blanket',
      'pure white snow covering'
    ]
  },
  {
    id: 'textured-snow',
    name: 'Textured Snow',
    category: 'snow',
    description: 'Footprints, drifts, windswept patterns',
    promptKeywords: [
      'textured snow with drifts',
      'snow with visible tracks',
      'windswept snow patterns'
    ]
  }
];

export const fogTypes: WeatherEffect[] = [
  {
    id: 'ground-fog',
    name: 'Ground Fog',
    category: 'fog',
    description: 'Low-lying fog hugging the ground',
    promptKeywords: [
      'low ground fog',
      'fog hugging the terrain',
      'misty ground layer'
    ]
  },
  {
    id: 'dense-fog',
    name: 'Dense Fog',
    category: 'fog',
    description: 'Heavy fog with limited visibility',
    promptKeywords: [
      'dense thick fog',
      'limited visibility fog',
      'heavy atmospheric fog'
    ]
  },
  {
    id: 'volumetric-fog',
    name: 'Volumetric Fog',
    category: 'fog',
    description: 'Light rays visible through fog',
    promptKeywords: [
      'volumetric fog with light rays',
      'god rays through fog',
      'atmospheric light scattering'
    ]
  },
  {
    id: 'morning-mist',
    name: 'Morning Mist',
    category: 'fog',
    description: 'Ethereal, delicate mist at dawn',
    promptKeywords: [
      'ethereal morning mist',
      'delicate misty atmosphere',
      'dawn mist rising'
    ]
  }
];

export interface TimeOfDay {
  id: string;
  name: string;
  time: string;
  colorTemp: string;
  quality: string;
  shadows?: string;
  promptKeywords: string[];
}

export const timeOfDay: TimeOfDay[] = [
  {
    id: 'dawn',
    name: 'Dawn',
    time: 'Just before sunrise',
    colorTemp: '4000K warm-pink',
    quality: 'Soft, quiet, awakening',
    promptKeywords: [
      'early dawn light',
      'pre-sunrise atmosphere',
      'soft pink awakening light'
    ]
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    time: '1 hour before sunset',
    colorTemp: '3500K warm',
    quality: 'Soft, directional',
    shadows: 'Long, soft-edged',
    promptKeywords: [
      'golden hour warm lighting',
      'sunset warm glow',
      'long soft shadows',
      'orange-gold atmosphere'
    ]
  },
  {
    id: 'blue-hour',
    name: 'Blue Hour',
    time: '30 min after sunset',
    colorTemp: '9000K+ cool',
    quality: 'Ambient, soft',
    promptKeywords: [
      'blue hour twilight',
      'cool ambient light',
      'ethereal twilight atmosphere',
      'magical blue hour'
    ]
  },
  {
    id: 'night',
    name: 'Night',
    time: 'After blue hour',
    colorTemp: 'Mixed (artificial/moonlight)',
    quality: 'Dark with artificial or natural light sources',
    promptKeywords: [
      'nighttime atmosphere',
      'moonlit scene',
      'city lights at night',
      'starlit sky'
    ]
  },
  {
    id: 'midday',
    name: 'Midday',
    time: '11am - 2pm',
    colorTemp: '5500K neutral',
    quality: 'Harsh, overhead',
    shadows: 'Short, hard-edged',
    promptKeywords: [
      'harsh midday sun',
      'overhead bright lighting',
      'high contrast daylight'
    ]
  }
];

export interface Season {
  id: string;
  name: string;
  colors: string[];
  atmosphere: string;
  elements: string[];
  promptKeywords: string[];
}

export const seasons: Season[] = [
  {
    id: 'spring',
    name: 'Spring',
    colors: ['Fresh green', 'Pink blossoms', 'Soft pastels'],
    atmosphere: 'Fresh, renewal, bright',
    elements: ['Blossoms', 'New leaves', 'Rain showers'],
    promptKeywords: [
      'fresh spring atmosphere',
      'cherry blossom season',
      'new growth greenery',
      'spring renewal mood'
    ]
  },
  {
    id: 'summer',
    name: 'Summer',
    colors: ['Bright green', 'Blue sky', 'Golden sun'],
    atmosphere: 'Bright, warm, vibrant',
    elements: ['Full foliage', 'Clear skies', 'Harsh sun'],
    promptKeywords: [
      'bright summer day',
      'warm summer atmosphere',
      'full summer foliage',
      'vivid summer colors'
    ]
  },
  {
    id: 'autumn',
    name: 'Autumn',
    colors: ['Orange', 'Red', 'Gold', 'Brown'],
    atmosphere: 'Warm, nostalgic, cozy',
    elements: ['Falling leaves', 'Harvest', 'Mist'],
    promptKeywords: [
      'autumn fall colors',
      'golden orange foliage',
      'falling autumn leaves',
      'warm nostalgic autumn'
    ]
  },
  {
    id: 'winter',
    name: 'Winter',
    colors: ['White', 'Blue', 'Grey', 'Stark'],
    atmosphere: 'Cold, stark, quiet',
    elements: ['Snow', 'Bare trees', 'Ice'],
    promptKeywords: [
      'cold winter atmosphere',
      'snowy winter scene',
      'bare winter trees',
      'stark winter landscape'
    ]
  }
];

export const allWeatherEffects: WeatherEffect[] = [
  ...rainEffects,
  ...snowEffects,
  ...fogTypes
];

export function getWeatherEffectById(id: string): WeatherEffect | undefined {
  return allWeatherEffects.find(w => w.id === id);
}

export function getTimeOfDayById(id: string): TimeOfDay | undefined {
  return timeOfDay.find(t => t.id === id);
}

export function getSeasonById(id: string): Season | undefined {
  return seasons.find(s => s.id === id);
}

export interface WeatherConfig {
  weather?: string;
  timeOfDay?: string;
  season?: string;
}

export function applyWeatherAtmosphere(prompt: string, config: WeatherConfig): string {
  const enhancements: string[] = [];
  
  if (config.weather) {
    const effect = getWeatherEffectById(config.weather);
    if (effect) {
      enhancements.push(...effect.promptKeywords.slice(0, 2));
    }
  }
  
  if (config.timeOfDay) {
    const time = getTimeOfDayById(config.timeOfDay);
    if (time) {
      enhancements.push(...time.promptKeywords.slice(0, 2));
    }
  }
  
  if (config.season) {
    const season = getSeasonById(config.season);
    if (season) {
      enhancements.push(season.promptKeywords[0]);
    }
  }
  
  return enhancements.length > 0 
    ? `${prompt}, ${enhancements.join(', ')}` 
    : prompt;
}
