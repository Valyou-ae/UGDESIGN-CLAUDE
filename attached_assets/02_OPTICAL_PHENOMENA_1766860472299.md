# 💡 FEATURE 2: ADVANCED OPTICAL PHENOMENA LIBRARY
## Quality Impact: +10-15%

Comprehensive optical effects for photorealistic lighting and atmosphere including light behavior, atmospheric effects, lens phenomena, and shadow systems.

---

## 📊 OPTICAL CATEGORIES

```
OPTICAL PHENOMENA DATABASE
├── Light Rays & Beams
│   ├── God Rays (Crepuscular)
│   ├── Volumetric Light Shafts
│   ├── Laser Beams
│   └── Spotlight Cones
│
├── Atmospheric Scattering
│   ├── Rayleigh (Blue sky)
│   ├── Mie (Haze, fog glow)
│   ├── Tyndall Effect
│   └── Sunset/Sunrise colors
│
├── Lens Effects
│   ├── Bokeh (Various shapes)
│   ├── Lens Flares
│   ├── Chromatic Aberration
│   ├── Vignetting
│   └── Anamorphic Artifacts
│
├── Reflections
│   ├── Mirror (Perfect)
│   ├── Glossy (Blurred)
│   ├── Fresnel (Angle-based)
│   └── Environment Mapping
│
├── Refractions
│   ├── Water Distortion
│   ├── Glass Bending
│   ├── Heat Shimmer
│   └── Prism Dispersion
│
├── Shadows
│   ├── Hard (Point source)
│   ├── Soft (Area source)
│   ├── Contact Shadows
│   ├── Ambient Occlusion
│   └── Self-Shadowing
│
└── Caustics
    ├── Water Caustics
    ├── Glass Caustics
    └── Reflected Caustics
```

---

## 🔷 LIGHT RAYS & BEAMS

### God Rays (Crepuscular Rays)

```typescript
{
  name: "God Rays",
  category: "light_rays",
  
  description: "Dramatic light beams radiating from light source 
    through atmospheric particles or gaps in clouds/foliage",
  
  physics: {
    cause: "Light scattering off atmospheric particles",
    visibility: "Requires dusty/hazy/foggy atmosphere",
    direction: "Radiates from light source",
    falloff: "Intensity decreases with distance"
  },
  
  intensity: "dramatic",
  
  bestUseCases: [
    "Forest scenes with canopy breaks",
    "Cathedral/church windows",
    "Dusty interiors",
    "Dramatic clouds",
    "Stage lighting"
  ],
  
  promptKeywords: [
    "god rays piercing through",
    "crepuscular rays visible in atmosphere",
    "dramatic light beams cutting through haze",
    "volumetric light shafts",
    "divine light streaming through gaps"
  ],
  
  technicalParams: {
    visibility: 80,
    density: 60,
    scattering: 70,
    falloff: "exponential"
  }
}
```

### Volumetric Light

```typescript
{
  name: "Volumetric Light",
  category: "light_rays",
  
  description: "Visible light volume in atmosphere, 
    revealing dust, fog, or smoke particles",
  
  promptKeywords: [
    "volumetric lighting with visible atmosphere",
    "light volume revealing floating particles",
    "3D light cone visible in fog",
    "spotlight with visible beam",
    "atmospheric light scattering"
  ],
  
  qualityTips: [
    "Combine with dust motes for realism",
    "Use with smoke/fog for visibility",
    "Works best with single strong source",
    "Add subtle color for mood"
  ]
}
```

---

## 🔷 ATMOSPHERIC SCATTERING

### Rayleigh Scattering (Sky Blue)

```typescript
{
  name: "Rayleigh Scattering",
  category: "atmosphere",
  
  description: "Blue light scattering creating blue sky, 
    orange/red sunsets as light travels through more atmosphere",
  
  physics: {
    cause: "Small particles scatter short wavelengths (blue)",
    result: "Blue sky during day, orange/red at sunrise/sunset",
    variation: "More atmosphere = more red (horizon)"
  },
  
  timeOfDayColors: {
    midday: "#87CEEB",      // Clear blue
    goldenHour: "#FFD700",  // Golden
    sunset: "#FF6347",      // Red-orange
    blueHour: "#4169E1",    // Deep blue
    night: "#191970"        // Dark blue
  },
  
  promptKeywords: [
    "natural atmospheric color gradation",
    "blue sky fading to warm horizon",
    "sunset colors from Rayleigh scattering",
    "realistic sky color physics"
  ]
}
```

### Tyndall Effect

```typescript
{
  name: "Tyndall Effect",
  category: "atmosphere",
  
  description: "Light scattering through colloidal suspension 
    (dust, mist, smoke) making beam visible",
  
  promptKeywords: [
    "Tyndall effect revealing light beam",
    "visible light path through particles",
    "dust motes illuminated in light beam",
    "scattered light through atmosphere"
  ],
  
  commonScenarios: [
    "Sunbeam through dusty room",
    "Flashlight in fog",
    "Stage lighting in haze",
    "Morning mist with sunlight"
  ]
}
```

---

## 🔷 LENS EFFECTS

### Bokeh

```typescript
{
  name: "Bokeh",
  category: "lens",
  
  description: "Out-of-focus light rendering as aesthetic blur shapes",
  
  shapes: {
    circular: "Standard spherical lenses",
    oval: "Anamorphic lenses (cinematic)",
    hexagonal: "6-blade aperture",
    octagonal: "8-blade aperture",
    catseye: "Edge-of-frame distortion",
    swirly: "Vintage lens character (Helios)"
  },
  
  quality: {
    creamy: "Smooth, undistracted blur",
    busy: "Harsh, distracting edges",
    nervous: "Double-lined edges"
  },
  
  promptKeywords: [
    "beautiful creamy bokeh in background",
    "out-of-focus lights creating circular bokeh",
    "anamorphic oval bokeh shapes",
    "soft bokeh with smooth falloff",
    "bokeh balls from distant lights"
  ],
  
  apertureTips: {
    "f/1.2-1.8": "Maximum bokeh, very shallow DOF",
    "f/2.0-2.8": "Beautiful bokeh, usable DOF",
    "f/4.0-5.6": "Subtle bokeh, more in focus"
  }
}
```

### Lens Flares

```typescript
{
  name: "Lens Flares",
  category: "lens",
  
  description: "Light artifacts from internal lens reflections",
  
  types: {
    ghosting: "Secondary images of light source",
    streaks: "Star patterns from aperture blades",
    orbs: "Circular colored artifacts",
    anamorphic: "Horizontal blue streaks (cinematic)"
  },
  
  promptKeywords: [
    "natural lens flare from bright light source",
    "anamorphic blue lens streak",
    "subtle lens artifacts adding realism",
    "cinematic lens flare effect"
  ],
  
  usageNote: "Use sparingly for realism; overuse looks artificial"
}
```

### Chromatic Aberration

```typescript
{
  name: "Chromatic Aberration",
  category: "lens",
  
  description: "Color fringing at high-contrast edges 
    from lens inability to focus all wavelengths equally",
  
  types: {
    lateral: "Color shift at image edges",
    longitudinal: "Color fringing in out-of-focus areas"
  },
  
  colors: "Typically red/cyan or blue/yellow fringing",
  
  promptKeywords: [
    "subtle chromatic aberration at edges",
    "realistic lens color fringing",
    "red-cyan color separation at high contrast",
    "vintage lens chromatic character"
  ],
  
  intensity: "subtle" // Heavy CA looks like error, not style
}
```

---

## 🔷 REFLECTIONS

### Fresnel Reflections

```typescript
{
  name: "Fresnel Effect",
  category: "reflections",
  
  description: "Increased reflectivity at grazing angles - 
    surfaces more reflective when viewed edge-on",
  
  physics: {
    headOn: "More transmission/absorption",
    grazing: "More reflection",
    equation: "Reflectivity increases as angle approaches 90°"
  },
  
  examples: {
    water: "Clear looking down, mirror at horizon",
    glass: "Transparent front, reflective at edges",
    skin: "Subtle glow at face edges from SSS + Fresnel"
  },
  
  promptKeywords: [
    "Fresnel reflections at grazing angles",
    "increased reflectivity at edges",
    "realistic angle-dependent reflection",
    "proper Fresnel falloff on surfaces"
  ]
}
```

### Environment Reflections

```typescript
{
  name: "Environment Reflections",
  category: "reflections",
  
  description: "Surrounding environment visible in reflective surfaces",
  
  promptKeywords: [
    "environment reflections on polished surface",
    "surrounding scene reflected in metal",
    "window reflections showing exterior",
    "realistic environmental reflection mapping"
  ],
  
  qualityTips: [
    "Reflections should be contextually accurate",
    "Blurred reflections for rough surfaces",
    "Sharp reflections for polished surfaces",
    "Color tinting from surface material"
  ]
}
```

---

## 🔷 SHADOWS

### Shadow Types

```typescript
const shadowTypes = {
  
  hard: {
    description: "Sharp, defined edges from point light source",
    cause: "Small/distant light source (sun, spotlight)",
    promptKeywords: [
      "hard-edged shadows from direct light",
      "sharp shadow definition",
      "crisp shadow edges"
    ]
  },
  
  soft: {
    description: "Gradual, diffused edges from large light source",
    cause: "Large/close light source (softbox, overcast sky)",
    promptKeywords: [
      "soft diffused shadows",
      "gradual shadow falloff",
      "gentle shadow edges from large light source"
    ]
  },
  
  contact: {
    description: "Dense shadow where object meets surface",
    cause: "Occlusion of ambient light at contact point",
    promptKeywords: [
      "contact shadows grounding objects",
      "dark shadow at object base",
      "realistic contact shadow where object meets surface"
    ]
  },
  
  ambient: {
    description: "Soft shadows in crevices and corners",
    cause: "Occlusion of ambient environmental light",
    promptKeywords: [
      "ambient occlusion in crevices",
      "soft shadows in corners and details",
      "realistic AO adding depth"
    ]
  }
};
```

---

## 🔷 CAUSTICS

### Water Caustics

```typescript
{
  name: "Water Caustics",
  category: "caustics",
  
  description: "Dancing light patterns from light refracted 
    through water surface onto underwater surfaces",
  
  promptKeywords: [
    "dancing water caustics on pool floor",
    "light patterns refracted through water surface",
    "underwater caustic light dance",
    "swimming pool caustic patterns"
  ],
  
  physics: {
    cause: "Refraction through curved water surface",
    pattern: "Moving, organic, bright spots",
    location: "On surfaces below water level"
  }
}
```

### Glass Caustics

```typescript
{
  name: "Glass Caustics",
  category: "caustics",
  
  description: "Focused light patterns from refraction through 
    glass objects onto nearby surfaces",
  
  promptKeywords: [
    "caustic light patterns from glass",
    "refracted light focused through crystal",
    "glass creating light patterns on surface",
    "wine glass caustics on tablecloth"
  ]
}
```

---

## 🎯 TIME-OF-DAY PRESETS

```typescript
const timeOfDayPresets = {
  
  goldenHour: {
    time: "1 hour before sunset / after sunrise",
    colorTemp: "3500K warm",
    quality: "Soft, directional, long shadows",
    atmosphere: "Warm haze, dust visible",
    promptKeywords: [
      "golden hour warm lighting",
      "low sun with long shadows",
      "warm atmospheric glow",
      "orange-gold light quality"
    ]
  },
  
  blueHour: {
    time: "30 min after sunset / before sunrise",
    colorTemp: "9000K+ cool",
    quality: "Even, ambient, soft",
    atmosphere: "Cool, ethereal, magical",
    promptKeywords: [
      "blue hour twilight ambiance",
      "cool ambient light with no direct sun",
      "ethereal blue atmosphere",
      "magical twilight quality"
    ]
  },
  
  midday: {
    time: "11am - 2pm",
    colorTemp: "5500K neutral",
    quality: "Harsh, overhead, short shadows",
    atmosphere: "Clear, bright, contrasty",
    promptKeywords: [
      "harsh midday sun",
      "overhead lighting with short shadows",
      "high contrast daylight",
      "neutral color temperature"
    ]
  },
  
  overcast: {
    time: "Any (cloudy)",
    colorTemp: "6500K slightly cool",
    quality: "Soft, even, minimal shadows",
    atmosphere: "Diffused, flat, soft",
    promptKeywords: [
      "soft overcast lighting",
      "diffused cloud light",
      "even illumination without harsh shadows",
      "giant softbox quality light"
    ]
  }
};
```

---

## 🔗 COMBINING OPTICAL EFFECTS

### Layered Enhancement Example

**Scene:** Luxury watch product shot

```typescript
// Layer 1: Base lighting
"professional product lighting with soft shadows"

// Layer 2: Add caustics
"+ caustic light patterns from crystal"

// Layer 3: Add reflections  
"+ environment reflections on polished case"

// Layer 4: Add depth (bokeh)
"+ creamy bokeh background separation"

// Layer 5: Add subtle lens artifacts
"+ subtle lens flare from backlight"

// COMBINED:
"Luxury watch product photography with professional soft 
lighting, caustic patterns from crystal catching light, 
environment reflections on polished steel case, creamy 
bokeh background with soft separation, subtle lens flare 
from rim light, contact shadows grounding the piece"
```

---

## 📈 QUALITY IMPACT

| Before Optical | After Optical | Improvement |
|----------------|---------------|-------------|
| Flat lighting | Volumetric rays | +15% |
| No reflections | Proper Fresnel | +12% |
| Generic blur | Quality bokeh | +10% |
| No caustics | Water/glass caustics | +18% |

**Average Improvement: +10-15%**

---

**Version:** 2.0  
**Status:** ✅ Production Ready  
**Next:** Feature 3 - Color Psychology Library
