export interface DepthLayer {
  id: string;
  name: string;
  position: string;
  focus: string;
  purpose: string;
  elements?: string[];
  promptKeywords: string[];
}

export const depthLayers: DepthLayer[] = [
  {
    id: 'extreme-foreground',
    name: 'Extreme Foreground',
    position: 'Nearest to camera',
    focus: 'Out of focus blur',
    purpose: 'Frame and depth cue',
    elements: ['Leaves', 'Fabric', 'Objects'],
    promptKeywords: [
      'out-of-focus foreground element',
      'blurred framing element',
      'extreme foreground bokeh'
    ]
  },
  {
    id: 'foreground',
    name: 'Foreground',
    position: 'In front of subject',
    focus: 'Sharp or slight blur',
    purpose: 'Context and leading',
    elements: ['Props', 'Ground', 'Architecture'],
    promptKeywords: [
      'foreground interest',
      'leading elements in foreground',
      'contextual foreground'
    ]
  },
  {
    id: 'subject',
    name: 'Subject',
    position: 'Primary focus plane',
    focus: 'Tack sharp',
    purpose: 'Main interest',
    promptKeywords: [
      'sharp focus on subject',
      'tack-sharp main subject',
      'perfect focus plane'
    ]
  },
  {
    id: 'midground',
    name: 'Midground',
    position: 'Behind subject',
    focus: 'Beginning blur',
    purpose: 'Environmental context',
    promptKeywords: [
      'transitional midground',
      'context behind subject',
      'environmental depth'
    ]
  },
  {
    id: 'background',
    name: 'Background',
    position: 'Furthest from camera',
    focus: 'Full bokeh blur',
    purpose: 'Separation and mood',
    promptKeywords: [
      'creamy bokeh background',
      'soft background separation',
      'atmospheric background blur'
    ]
  }
];

export interface AtmosphericPerspective {
  distance: 'near' | 'mid' | 'far';
  contrast: string;
  saturation: string;
  color: string;
  detail: string;
}

export const atmosphericPerspective: Record<'near' | 'mid' | 'far', AtmosphericPerspective> = {
  near: {
    distance: 'near',
    contrast: 'Full (100%)',
    saturation: 'Full (100%)',
    color: 'True color',
    detail: 'Maximum'
  },
  mid: {
    distance: 'mid',
    contrast: 'Reduced (70%)',
    saturation: 'Reduced (75%)',
    color: 'Slight blue shift',
    detail: 'Moderate'
  },
  far: {
    distance: 'far',
    contrast: 'Low (40%)',
    saturation: 'Low (50%)',
    color: 'Blue-grey',
    detail: 'Minimal'
  }
};

export const atmosphericKeywords: string[] = [
  'atmospheric perspective in distance',
  'haze creating depth separation',
  'reduced contrast in background',
  'aerial perspective effect'
];

export interface BokehShape {
  id: string;
  name: string;
  source: string;
  quality: 'creamy' | 'busy' | 'catseye' | 'swirly';
  promptKeywords: string[];
}

export const bokehShapes: BokehShape[] = [
  {
    id: 'circular',
    name: 'Circular Bokeh',
    source: 'Standard spherical lens',
    quality: 'creamy',
    promptKeywords: [
      'creamy circular bokeh',
      'round bokeh balls',
      'smooth circular blur'
    ]
  },
  {
    id: 'oval',
    name: 'Oval Bokeh',
    source: 'Anamorphic lenses',
    quality: 'creamy',
    promptKeywords: [
      'anamorphic oval bokeh',
      'stretched cinematic bokeh',
      'horizontal oval blur shapes'
    ]
  },
  {
    id: 'hexagonal',
    name: 'Hexagonal Bokeh',
    source: '6-blade aperture',
    quality: 'busy',
    promptKeywords: [
      'hexagonal bokeh shapes',
      'six-sided bokeh',
      'geometric aperture bokeh'
    ]
  },
  {
    id: 'swirly',
    name: 'Swirly Bokeh',
    source: 'Helios/vintage lenses',
    quality: 'swirly',
    promptKeywords: [
      'swirly bokeh pattern',
      'vintage Helios bokeh',
      'dreamy swirl background blur'
    ]
  },
  {
    id: 'catseye',
    name: 'Cat-eye Bokeh',
    source: 'Edge-of-frame distortion',
    quality: 'catseye',
    promptKeywords: [
      'cat-eye bokeh at edges',
      'elongated edge bokeh',
      'oval distortion bokeh'
    ]
  }
];

export interface ApertureGuide {
  fStop: string;
  blur: string;
  description: string;
  promptKeywords: string[];
}

export const apertureGuide: ApertureGuide[] = [
  {
    fStop: 'f/1.2-1.4',
    blur: 'Maximum blur',
    description: 'Extreme separation, razor-thin focus',
    promptKeywords: ['shot at f/1.2', 'extreme shallow depth of field', 'maximum background blur']
  },
  {
    fStop: 'f/1.8-2.0',
    blur: 'Strong blur',
    description: 'Beautiful separation, usable focus plane',
    promptKeywords: ['shot at f/1.8', 'beautiful bokeh separation', 'shallow depth of field']
  },
  {
    fStop: 'f/2.8',
    blur: 'Moderate blur',
    description: 'Good separation, wider focus range',
    promptKeywords: ['shot at f/2.8', 'moderate depth of field', 'balanced bokeh']
  },
  {
    fStop: 'f/4.0',
    blur: 'Subtle blur',
    description: 'More context, subtle background softness',
    promptKeywords: ['shot at f/4', 'subtle background blur', 'moderate depth']
  },
  {
    fStop: 'f/5.6+',
    blur: 'Minimal blur',
    description: 'Sharp throughout, landscape/architecture',
    promptKeywords: ['shot at f/8', 'deep depth of field', 'sharp throughout']
  }
];

export function getDepthLayerById(id: string): DepthLayer | undefined {
  return depthLayers.find(l => l.id === id);
}

export function getBokehShapeById(id: string): BokehShape | undefined {
  return bokehShapes.find(b => b.id === id);
}

export function getApertureByFStop(fStop: string): ApertureGuide | undefined {
  return apertureGuide.find(a => a.fStop === fStop);
}

export interface DepthConfig {
  focusLayer?: string;
  bokehShape?: string;
  aperture?: string;
  useAtmospheric?: boolean;
}

export function applyDepthSystem(prompt: string, config: DepthConfig): string {
  const enhancements: string[] = [];
  
  if (config.focusLayer) {
    const layer = getDepthLayerById(config.focusLayer);
    if (layer) {
      enhancements.push(...layer.promptKeywords.slice(0, 2));
    }
  }
  
  if (config.bokehShape) {
    const bokeh = getBokehShapeById(config.bokehShape);
    if (bokeh) {
      enhancements.push(bokeh.promptKeywords[0]);
    }
  }
  
  if (config.aperture) {
    const aperture = apertureGuide.find(a => a.fStop.includes(config.aperture!));
    if (aperture) {
      enhancements.push(aperture.promptKeywords[0]);
    }
  }
  
  if (config.useAtmospheric) {
    enhancements.push(...atmosphericKeywords.slice(0, 2));
  }
  
  return enhancements.length > 0 
    ? `${prompt}, ${enhancements.join(', ')}` 
    : prompt;
}
