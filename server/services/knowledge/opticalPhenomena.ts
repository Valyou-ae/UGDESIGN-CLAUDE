export interface OpticalEffect {
  id: string;
  name: string;
  category: 'light_rays' | 'atmosphere' | 'lens' | 'reflections' | 'shadows' | 'caustics';
  description: string;
  promptKeywords: string[];
  negativePrompts?: string[];
  intensity?: 'subtle' | 'moderate' | 'dramatic';
}

export const lightRays: OpticalEffect[] = [
  {
    id: 'god-rays',
    name: 'God Rays',
    category: 'light_rays',
    description: 'Dramatic light beams radiating from light source through atmospheric particles',
    promptKeywords: [
      'god rays piercing through',
      'crepuscular rays visible in atmosphere',
      'dramatic light beams cutting through haze',
      'volumetric light shafts',
      'divine light streaming through gaps'
    ],
    intensity: 'dramatic'
  },
  {
    id: 'volumetric-light',
    name: 'Volumetric Light',
    category: 'light_rays',
    description: 'Visible light volume in atmosphere revealing dust, fog, or smoke particles',
    promptKeywords: [
      'volumetric lighting with visible atmosphere',
      'light volume revealing floating particles',
      '3D light cone visible in fog',
      'spotlight with visible beam',
      'atmospheric light scattering'
    ],
    intensity: 'moderate'
  }
];

export const atmosphericScattering: OpticalEffect[] = [
  {
    id: 'rayleigh-scattering',
    name: 'Rayleigh Scattering',
    category: 'atmosphere',
    description: 'Blue light scattering creating blue sky, orange/red sunsets',
    promptKeywords: [
      'natural atmospheric color gradation',
      'blue sky fading to warm horizon',
      'sunset colors from Rayleigh scattering',
      'realistic sky color physics'
    ],
    intensity: 'moderate'
  },
  {
    id: 'tyndall-effect',
    name: 'Tyndall Effect',
    category: 'atmosphere',
    description: 'Light scattering through colloidal suspension making beam visible',
    promptKeywords: [
      'Tyndall effect revealing light beam',
      'visible light path through particles',
      'dust motes illuminated in light beam',
      'scattered light through atmosphere'
    ],
    intensity: 'moderate'
  }
];

export const lensEffects: OpticalEffect[] = [
  {
    id: 'bokeh-circular',
    name: 'Circular Bokeh',
    category: 'lens',
    description: 'Out-of-focus light rendering as circular aesthetic blur shapes',
    promptKeywords: [
      'beautiful creamy bokeh in background',
      'out-of-focus lights creating circular bokeh',
      'soft bokeh with smooth falloff',
      'bokeh balls from distant lights'
    ],
    intensity: 'moderate'
  },
  {
    id: 'bokeh-anamorphic',
    name: 'Anamorphic Bokeh',
    category: 'lens',
    description: 'Oval bokeh shapes from anamorphic lenses for cinematic look',
    promptKeywords: [
      'anamorphic oval bokeh shapes',
      'cinematic anamorphic blur',
      'stretched oval bokeh lights'
    ],
    intensity: 'moderate'
  },
  {
    id: 'lens-flare',
    name: 'Lens Flares',
    category: 'lens',
    description: 'Light artifacts from internal lens reflections',
    promptKeywords: [
      'natural lens flare from bright light source',
      'anamorphic blue lens streak',
      'subtle lens artifacts adding realism',
      'cinematic lens flare effect'
    ],
    intensity: 'subtle',
    negativePrompts: ['overblown lens flare', 'artificial flare']
  },
  {
    id: 'chromatic-aberration',
    name: 'Chromatic Aberration',
    category: 'lens',
    description: 'Color fringing at high-contrast edges from lens imperfection',
    promptKeywords: [
      'subtle chromatic aberration at edges',
      'realistic lens color fringing',
      'red-cyan color separation at high contrast',
      'vintage lens chromatic character'
    ],
    intensity: 'subtle'
  },
  {
    id: 'vignette',
    name: 'Vignette',
    category: 'lens',
    description: 'Darkening at image edges focusing attention to center',
    promptKeywords: [
      'natural lens vignette',
      'subtle darkening at edges',
      'cinematic vignette framing'
    ],
    intensity: 'subtle'
  }
];

export const reflections: OpticalEffect[] = [
  {
    id: 'fresnel-reflections',
    name: 'Fresnel Effect',
    category: 'reflections',
    description: 'Increased reflectivity at grazing angles - surfaces more reflective when viewed edge-on',
    promptKeywords: [
      'Fresnel reflections at grazing angles',
      'increased reflectivity at edges',
      'realistic angle-dependent reflection',
      'proper Fresnel falloff on surfaces'
    ],
    intensity: 'moderate'
  },
  {
    id: 'environment-reflections',
    name: 'Environment Reflections',
    category: 'reflections',
    description: 'Surrounding environment visible in reflective surfaces',
    promptKeywords: [
      'environment reflections on polished surface',
      'surrounding scene reflected in metal',
      'window reflections showing exterior',
      'realistic environmental reflection mapping'
    ],
    intensity: 'moderate'
  },
  {
    id: 'mirror-reflection',
    name: 'Mirror Reflection',
    category: 'reflections',
    description: 'Perfect sharp reflection on highly polished surfaces',
    promptKeywords: [
      'perfect mirror reflection',
      'sharp polished surface reflection',
      'crystal clear reflection'
    ],
    intensity: 'dramatic'
  }
];

export const shadows: OpticalEffect[] = [
  {
    id: 'hard-shadows',
    name: 'Hard Shadows',
    category: 'shadows',
    description: 'Sharp, defined edges from point light source',
    promptKeywords: [
      'hard-edged shadows from direct light',
      'sharp shadow definition',
      'crisp shadow edges'
    ],
    intensity: 'dramatic'
  },
  {
    id: 'soft-shadows',
    name: 'Soft Shadows',
    category: 'shadows',
    description: 'Gradual, diffused edges from large light source',
    promptKeywords: [
      'soft diffused shadows',
      'gradual shadow falloff',
      'gentle shadow edges from large light source'
    ],
    intensity: 'subtle'
  },
  {
    id: 'contact-shadows',
    name: 'Contact Shadows',
    category: 'shadows',
    description: 'Dense shadow where object meets surface',
    promptKeywords: [
      'contact shadows grounding objects',
      'dark shadow at object base',
      'realistic contact shadow where object meets surface'
    ],
    intensity: 'moderate'
  },
  {
    id: 'ambient-occlusion',
    name: 'Ambient Occlusion',
    category: 'shadows',
    description: 'Soft shadows in crevices and corners',
    promptKeywords: [
      'ambient occlusion in crevices',
      'soft shadows in corners and details',
      'realistic AO adding depth'
    ],
    intensity: 'subtle'
  }
];

export const caustics: OpticalEffect[] = [
  {
    id: 'water-caustics',
    name: 'Water Caustics',
    category: 'caustics',
    description: 'Dancing light patterns from light refracted through water surface',
    promptKeywords: [
      'dancing water caustics on pool floor',
      'light patterns refracted through water surface',
      'underwater caustic light dance',
      'swimming pool caustic patterns'
    ],
    intensity: 'dramatic'
  },
  {
    id: 'glass-caustics',
    name: 'Glass Caustics',
    category: 'caustics',
    description: 'Focused light patterns from refraction through glass objects',
    promptKeywords: [
      'caustic light patterns from glass',
      'refracted light focused through crystal',
      'glass creating light patterns on surface',
      'wine glass caustics on tablecloth'
    ],
    intensity: 'moderate'
  }
];

export interface TimeOfDayPreset {
  id: string;
  name: string;
  time: string;
  colorTemp: string;
  quality: string;
  atmosphere: string;
  promptKeywords: string[];
}

export const timeOfDayPresets: TimeOfDayPreset[] = [
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    time: '1 hour before sunset / after sunrise',
    colorTemp: '3500K warm',
    quality: 'Soft, directional, long shadows',
    atmosphere: 'Warm haze, dust visible',
    promptKeywords: [
      'golden hour warm lighting',
      'low sun with long shadows',
      'warm atmospheric glow',
      'orange-gold light quality'
    ]
  },
  {
    id: 'blue-hour',
    name: 'Blue Hour',
    time: '30 min after sunset / before sunrise',
    colorTemp: '9000K+ cool',
    quality: 'Even, ambient, soft',
    atmosphere: 'Cool, ethereal, magical',
    promptKeywords: [
      'blue hour twilight ambiance',
      'cool ambient light with no direct sun',
      'ethereal blue atmosphere',
      'magical twilight quality'
    ]
  },
  {
    id: 'midday',
    name: 'Midday',
    time: '11am - 2pm',
    colorTemp: '5500K neutral',
    quality: 'Harsh, overhead, short shadows',
    atmosphere: 'Clear, bright, contrasty',
    promptKeywords: [
      'harsh midday sun',
      'overhead lighting with short shadows',
      'high contrast daylight',
      'neutral color temperature'
    ]
  },
  {
    id: 'overcast',
    name: 'Overcast',
    time: 'Any (cloudy)',
    colorTemp: '6500K slightly cool',
    quality: 'Soft, even, minimal shadows',
    atmosphere: 'Diffused, flat, soft',
    promptKeywords: [
      'soft overcast lighting',
      'diffused cloud light',
      'even illumination without harsh shadows',
      'giant softbox quality light'
    ]
  }
];

export const allOpticalEffects: OpticalEffect[] = [
  ...lightRays,
  ...atmosphericScattering,
  ...lensEffects,
  ...reflections,
  ...shadows,
  ...caustics
];

export function getOpticalEffectById(id: string): OpticalEffect | undefined {
  return allOpticalEffects.find(e => e.id === id);
}

export function getOpticalEffectsByCategory(category: OpticalEffect['category']): OpticalEffect[] {
  return allOpticalEffects.filter(e => e.category === category);
}

export function getTimeOfDayById(id: string): TimeOfDayPreset | undefined {
  return timeOfDayPresets.find(t => t.id === id);
}
