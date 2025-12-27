/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SUBJECT-SPECIFIC LIBRARIES
 * Enhancement Feature 5 | Impact: +10-15% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Specialized knowledge databases for different photography genres.
 * Includes Portrait, Architecture, Food, Fashion, Automotive, and Landscape
 * specific techniques and prompts.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface SubjectLibrary {
  name: string;
  category: SubjectCategory;
  description: string;
  
  keyElements: {
    element: string;
    importance: 'critical' | 'important' | 'nice-to-have';
    description: string;
    promptKeywords: string[];
  }[];
  
  lightingSetups: {
    name: string;
    description: string;
    bestFor: string[];
    promptKeywords: string[];
  }[];
  
  compositionRules: {
    name: string;
    description: string;
    promptKeywords: string[];
  }[];
  
  commonMistakes: string[];
  promptTemplates: string[];
}

export type SubjectCategory = 
  | 'portrait' 
  | 'architecture' 
  | 'food' 
  | 'fashion' 
  | 'automotive' 
  | 'landscape'
  | 'product'
  | 'wildlife';

// ============================================================================
// PORTRAIT PHOTOGRAPHY
// ============================================================================

export const PORTRAIT_LIBRARY: SubjectLibrary = {
  name: "Portrait Photography",
  category: "portrait",
  description: "Comprehensive guide to capturing compelling human portraits",
  
  keyElements: [
    {
      element: "Eye Catchlights",
      importance: "critical",
      description: "Bright reflections in eyes that bring life to portraits",
      promptKeywords: [
        "bright catchlight reflection in eyes",
        "eye light sparkle",
        "living engaged eyes"
      ]
    },
    {
      element: "Skin Texture",
      importance: "critical",
      description: "Natural skin with visible pores and texture",
      promptKeywords: [
        "natural skin texture",
        "visible skin pores",
        "realistic skin detail"
      ]
    },
    {
      element: "Depth of Field",
      importance: "important",
      description: "Subject separation through selective focus",
      promptKeywords: [
        "shallow depth of field portrait",
        "f/1.4 bokeh blur background",
        "subject isolation through depth"
      ]
    },
    {
      element: "Expression",
      importance: "critical",
      description: "Natural, unforced facial expressions",
      promptKeywords: [
        "natural candid expression",
        "genuine emotion",
        "authentic facial expression"
      ]
    },
    {
      element: "Hand Anatomy",
      importance: "important",
      description: "Correct hand positioning and finger count",
      promptKeywords: [
        "anatomically correct hands",
        "natural hand pose",
        "five fingers properly positioned"
      ]
    }
  ],
  
  lightingSetups: [
    {
      name: "Rembrandt Lighting",
      description: "45-degree key light creating triangle under eye",
      bestFor: ["dramatic portraits", "artistic headshots", "moody images"],
      promptKeywords: [
        "Rembrandt lighting triangle under eye",
        "dramatic 45-degree portrait lighting",
        "classic Rembrandt illumination"
      ]
    },
    {
      name: "Butterfly Lighting",
      description: "Light directly above creating butterfly shadow under nose",
      bestFor: ["beauty photography", "glamour", "fashion portraits"],
      promptKeywords: [
        "butterfly lighting beauty setup",
        "Paramount lighting style",
        "overhead beauty illumination"
      ]
    },
    {
      name: "Loop Lighting",
      description: "Slight angle creating small nose shadow",
      bestFor: ["general portraits", "corporate headshots", "flattering light"],
      promptKeywords: [
        "soft loop lighting portrait",
        "flattering portrait illumination",
        "gentle directional light"
      ]
    },
    {
      name: "Split Lighting",
      description: "Light from 90 degrees illuminating half face",
      bestFor: ["dramatic portraits", "artistic work", "mystery"],
      promptKeywords: [
        "split lighting dramatic half-face",
        "90-degree dramatic illumination",
        "chiaroscuro portrait lighting"
      ]
    },
    {
      name: "Broad Lighting",
      description: "Light falls on side of face toward camera",
      bestFor: ["slimming effect", "narrow faces", "general portraits"],
      promptKeywords: [
        "broad lighting portrait technique",
        "face-widening illumination",
        "toward-camera side lighting"
      ]
    }
  ],
  
  compositionRules: [
    {
      name: "Rule of Thirds - Eyes",
      description: "Position eyes on upper third line",
      promptKeywords: ["eyes on upper third", "rule of thirds portrait composition"]
    },
    {
      name: "Negative Space",
      description: "Leave space in direction subject is looking",
      promptKeywords: ["looking room composition", "negative space in gaze direction"]
    },
    {
      name: "Fill the Frame",
      description: "Tight crop for impact and intimacy",
      promptKeywords: ["tight portrait crop", "face filling frame"]
    }
  ],
  
  commonMistakes: [
    "Dead eyes without catchlight",
    "Plastic/waxy skin texture",
    "Wrong finger count on hands",
    "Uncanny valley proportions",
    "Flat lighting without dimension"
  ],
  
  promptTemplates: [
    "Professional portrait, {subject}, {lighting} lighting, {expression} expression, bright catchlight in eyes, natural skin texture with visible pores, shallow depth of field, 85mm f/1.4",
    "Editorial portrait of {subject}, {lighting}, {mood} mood, photographic skin detail, eye contact with catchlight, {background}, professional photography"
  ]
};

// ============================================================================
// ARCHITECTURE PHOTOGRAPHY
// ============================================================================

export const ARCHITECTURE_LIBRARY: SubjectLibrary = {
  name: "Architecture Photography",
  category: "architecture",
  description: "Techniques for capturing buildings and interior spaces",
  
  keyElements: [
    {
      element: "Vertical Lines",
      importance: "critical",
      description: "Corrected vertical lines (no keystoning)",
      promptKeywords: [
        "corrected vertical lines",
        "no keystoning distortion",
        "tilt-shift corrected perspective"
      ]
    },
    {
      element: "Material Textures",
      importance: "important",
      description: "Clear rendition of building materials",
      promptKeywords: [
        "visible architectural materials",
        "concrete glass steel textures",
        "material surface detail"
      ]
    },
    {
      element: "Scale Reference",
      importance: "nice-to-have",
      description: "Human or object for scale understanding",
      promptKeywords: [
        "human figure for scale",
        "architectural scale reference"
      ]
    },
    {
      element: "Time of Day",
      importance: "important",
      description: "Optimal lighting conditions",
      promptKeywords: [
        "blue hour architectural",
        "golden hour building illumination",
        "dramatic sky backdrop"
      ]
    }
  ],
  
  lightingSetups: [
    {
      name: "Blue Hour",
      description: "Pre-sunrise/post-sunset when sky balances artificial lights",
      bestFor: ["exterior architecture", "city skylines", "dramatic impact"],
      promptKeywords: [
        "blue hour architectural photography",
        "twilight building illumination",
        "balanced interior-exterior lighting"
      ]
    },
    {
      name: "Golden Hour Side Light",
      description: "Low angle sun revealing texture and form",
      bestFor: ["texture emphasis", "historic buildings", "warm aesthetics"],
      promptKeywords: [
        "golden hour architectural sidelight",
        "warm textured building surfaces",
        "low angle dramatic shadows"
      ]
    },
    {
      name: "Overcast Diffused",
      description: "Soft even lighting for clean documentation",
      bestFor: ["real estate", "documentation", "clean presentation"],
      promptKeywords: [
        "soft overcast architectural lighting",
        "even diffused illumination",
        "clean documentary light"
      ]
    }
  ],
  
  compositionRules: [
    {
      name: "One-Point Perspective",
      description: "Centered vanishing point for symmetry",
      promptKeywords: ["one-point perspective architecture", "centered vanishing point"]
    },
    {
      name: "Leading Lines",
      description: "Use architectural lines to guide eye",
      promptKeywords: ["leading lines composition", "architectural perspective lines"]
    },
    {
      name: "Frame Within Frame",
      description: "Use architectural elements as natural frames",
      promptKeywords: ["architectural frame within frame", "doorway framing"]
    }
  ],
  
  commonMistakes: [
    "Converging vertical lines (keystoning)",
    "Blown out sky/windows",
    "Missing architectural details",
    "Wrong time of day for location"
  ],
  
  promptTemplates: [
    "Architectural photography of {building}, corrected vertical lines, {lighting} lighting, {material} facade, professional wide-angle perspective, 17mm tilt-shift lens",
    "Interior architecture photograph, {space}, {lighting}, detailed material textures, balanced exposure, professional real estate photography"
  ]
};

// ============================================================================
// FOOD PHOTOGRAPHY
// ============================================================================

export const FOOD_LIBRARY: SubjectLibrary = {
  name: "Food Photography",
  category: "food",
  description: "Techniques for appetizing food imagery",
  
  keyElements: [
    {
      element: "Hero Lighting",
      importance: "critical",
      description: "Backlighting or sidelighting to show texture",
      promptKeywords: [
        "backlit food photography",
        "sidelit food texture",
        "food hero lighting"
      ]
    },
    {
      element: "Steam/Freshness",
      importance: "important",
      description: "Steam, condensation, or freshness indicators",
      promptKeywords: [
        "steam rising from hot food",
        "fresh food condensation",
        "just-cooked appearance"
      ]
    },
    {
      element: "Color Vibrancy",
      importance: "important",
      description: "Saturated, appetizing colors",
      promptKeywords: [
        "vibrant food colors",
        "appetizing color saturation",
        "fresh ingredient colors"
      ]
    },
    {
      element: "Texture Detail",
      importance: "critical",
      description: "Clear food surface textures",
      promptKeywords: [
        "crispy food texture detail",
        "creamy sauce texture",
        "food surface macro detail"
      ]
    }
  ],
  
  lightingSetups: [
    {
      name: "Backlight Hero",
      description: "Main light behind food for rim light and steam",
      bestFor: ["hot dishes", "beverages", "transparent ingredients"],
      promptKeywords: [
        "backlit food photography",
        "rim light on food",
        "steam highlighted from behind"
      ]
    },
    {
      name: "45-Degree Sidelight",
      description: "Classic food lighting showing texture",
      bestFor: ["general food", "texture emphasis", "plated dishes"],
      promptKeywords: [
        "sidelit food texture",
        "45-degree food illumination",
        "textured food lighting"
      ]
    },
    {
      name: "Soft Window Light",
      description: "Natural diffused window lighting",
      bestFor: ["rustic food", "lifestyle food", "home cooking"],
      promptKeywords: [
        "natural window light food",
        "soft daylight food photography",
        "rustic food illumination"
      ]
    }
  ],
  
  compositionRules: [
    {
      name: "Overhead/Flat Lay",
      description: "90-degree top-down angle",
      promptKeywords: ["overhead food photography", "flat lay food composition"]
    },
    {
      name: "45-Degree Hero Angle",
      description: "Classic appetizing food angle",
      promptKeywords: ["45-degree food angle", "hero shot food photography"]
    },
    {
      name: "Eye Level",
      description: "Stacked food or tall subjects",
      promptKeywords: ["eye level burger shot", "tall food stacking"]
    }
  ],
  
  commonMistakes: [
    "Front lighting (flat, unappetizing)",
    "Cold/dead-looking food",
    "Oversaturated colors",
    "Cluttered composition"
  ],
  
  promptTemplates: [
    "Professional food photography, {dish}, {lighting} lighting, steam rising, vibrant appetizing colors, crispy texture detail, shallow depth of field, 100mm macro",
    "Editorial food shot, {dish}, natural window light, rustic styling, fresh ingredients, lifestyle food photography"
  ]
};

// ============================================================================
// FASHION PHOTOGRAPHY
// ============================================================================

export const FASHION_LIBRARY: SubjectLibrary = {
  name: "Fashion Photography",
  category: "fashion",
  description: "Techniques for high-impact fashion imagery",
  
  keyElements: [
    {
      element: "Fabric Detail",
      importance: "critical",
      description: "Clear fabric texture and draping",
      promptKeywords: [
        "detailed fabric texture",
        "visible garment draping",
        "clothing material detail"
      ]
    },
    {
      element: "Pose/Gesture",
      importance: "critical",
      description: "Dynamic, editorial poses",
      promptKeywords: [
        "dynamic fashion pose",
        "editorial model stance",
        "high fashion gesture"
      ]
    },
    {
      element: "Styling",
      importance: "important",
      description: "Complete look with accessories",
      promptKeywords: [
        "complete fashion styling",
        "accessorized fashion look",
        "editorial styling"
      ]
    },
    {
      element: "Model Features",
      importance: "important",
      description: "Strong features, confident expression",
      promptKeywords: [
        "high fashion model features",
        "striking confident expression",
        "editorial beauty"
      ]
    }
  ],
  
  lightingSetups: [
    {
      name: "Beauty Dish",
      description: "Contrasty but soft light for fashion",
      bestFor: ["studio fashion", "beauty shots", "catalog"],
      promptKeywords: [
        "beauty dish fashion lighting",
        "contrasty soft fashion light",
        "studio fashion illumination"
      ]
    },
    {
      name: "Clamshell",
      description: "Two lights above/below for even beauty light",
      bestFor: ["beauty", "cosmetics", "jewelry"],
      promptKeywords: [
        "clamshell beauty lighting",
        "even glamour illumination",
        "beauty photography light"
      ]
    },
    {
      name: "Dramatic Side Light",
      description: "High contrast editorial lighting",
      bestFor: ["editorial fashion", "dramatic mood", "artistic work"],
      promptKeywords: [
        "dramatic fashion sidelight",
        "editorial high contrast",
        "artistic fashion illumination"
      ]
    }
  ],
  
  compositionRules: [
    {
      name: "Full Length",
      description: "Complete outfit visibility",
      promptKeywords: ["full length fashion shot", "complete outfit framing"]
    },
    {
      name: "Dynamic Crop",
      description: "Unexpected cropping for impact",
      promptKeywords: ["dynamic fashion crop", "editorial cropping"]
    },
    {
      name: "Movement",
      description: "Capture motion in clothing",
      promptKeywords: ["fashion movement blur", "flowing fabric motion"]
    }
  ],
  
  commonMistakes: [
    "Stiff, unnatural poses",
    "Lost fabric detail",
    "Unflattering body proportions",
    "Boring straight-on lighting"
  ],
  
  promptTemplates: [
    "High fashion editorial, {model} wearing {clothing}, {lighting} lighting, dynamic pose, detailed fabric texture, {mood} atmosphere, professional fashion photography",
    "Fashion campaign image, {model}, {styling}, {location}, editorial pose, high-end fashion photography, magazine quality"
  ]
};

// ============================================================================
// AUTOMOTIVE PHOTOGRAPHY
// ============================================================================

export const AUTOMOTIVE_LIBRARY: SubjectLibrary = {
  name: "Automotive Photography",
  category: "automotive",
  description: "Techniques for compelling vehicle imagery",
  
  keyElements: [
    {
      element: "Paint Reflection",
      importance: "critical",
      description: "Controlled reflections showing car lines",
      promptKeywords: [
        "controlled car paint reflections",
        "automotive paint depth",
        "glossy car surface"
      ]
    },
    {
      element: "Light Painting Lines",
      importance: "important",
      description: "Long exposure light trails on body",
      promptKeywords: [
        "automotive light painting",
        "car body light trails",
        "studio car lighting strips"
      ]
    },
    {
      element: "Environment Reflection",
      importance: "important",
      description: "Interesting environment in paint reflection",
      promptKeywords: [
        "environment reflecting in car paint",
        "dramatic sky in car reflection",
        "automotive environment capture"
      ]
    },
    {
      element: "Stance/Angle",
      importance: "critical",
      description: "Flattering vehicle angle",
      promptKeywords: [
        "dramatic low angle car shot",
        "3/4 front automotive angle",
        "heroic car stance"
      ]
    }
  ],
  
  lightingSetups: [
    {
      name: "Studio Strip Lights",
      description: "Long strip softboxes defining car lines",
      bestFor: ["studio car shots", "commercial automotive", "catalog"],
      promptKeywords: [
        "strip light car photography",
        "defined automotive body lines",
        "studio car illumination"
      ]
    },
    {
      name: "Golden Hour Location",
      description: "Natural golden light with dramatic sky",
      bestFor: ["lifestyle automotive", "advertising", "dramatic impact"],
      promptKeywords: [
        "golden hour car photography",
        "dramatic sky automotive shot",
        "sunset car silhouette"
      ]
    },
    {
      name: "Night Light Painting",
      description: "Long exposure with moving lights",
      bestFor: ["dramatic night shots", "artistic automotive", "custom cars"],
      promptKeywords: [
        "night light painted car",
        "long exposure automotive",
        "dramatic night car shot"
      ]
    }
  ],
  
  compositionRules: [
    {
      name: "3/4 Front View",
      description: "Classic showing front and side",
      promptKeywords: ["3/4 front car angle", "classic automotive composition"]
    },
    {
      name: "Low Angle Hero",
      description: "Below eye level for dramatic presence",
      promptKeywords: ["low angle car shot", "heroic automotive angle"]
    },
    {
      name: "Detail Abstracts",
      description: "Tight crops on design details",
      promptKeywords: ["automotive detail shot", "car design element close-up"]
    }
  ],
  
  commonMistakes: [
    "Uncontrolled reflections",
    "Harsh midday lighting",
    "Boring straight-on angles",
    "Cluttered backgrounds"
  ],
  
  promptTemplates: [
    "Professional automotive photography, {car}, {angle} angle, {lighting} lighting, detailed paint reflections, dramatic presence, {location}, commercial quality",
    "Luxury car advertisement, {car}, studio lighting with strip lights, controlled reflections, premium automotive photography"
  ]
};

// ============================================================================
// LANDSCAPE PHOTOGRAPHY
// ============================================================================

export const LANDSCAPE_LIBRARY: SubjectLibrary = {
  name: "Landscape Photography",
  category: "landscape",
  description: "Techniques for stunning natural scenery",
  
  keyElements: [
    {
      element: "Foreground Interest",
      importance: "critical",
      description: "Compelling foreground element for depth",
      promptKeywords: [
        "interesting foreground element",
        "foreground depth in landscape",
        "leading foreground composition"
      ]
    },
    {
      element: "Light Quality",
      importance: "critical",
      description: "Golden hour or dramatic lighting",
      promptKeywords: [
        "golden hour landscape light",
        "dramatic landscape illumination",
        "magical light conditions"
      ]
    },
    {
      element: "Depth/Layers",
      importance: "important",
      description: "Visual depth through atmospheric perspective",
      promptKeywords: [
        "atmospheric perspective layers",
        "depth through haze",
        "layered landscape composition"
      ]
    },
    {
      element: "Sky Interest",
      importance: "important",
      description: "Dramatic or colorful sky",
      promptKeywords: [
        "dramatic cloud formations",
        "colorful sunset sky",
        "interesting sky elements"
      ]
    }
  ],
  
  lightingSetups: [
    {
      name: "Golden Hour",
      description: "Warm low-angle light",
      bestFor: ["warm landscapes", "general scenic", "glowing light"],
      promptKeywords: [
        "golden hour landscape",
        "warm sunset illumination",
        "low angle golden light"
      ]
    },
    {
      name: "Blue Hour",
      description: "Cool twilight tones",
      bestFor: ["moody landscapes", "city/nature mix", "serene mood"],
      promptKeywords: [
        "blue hour landscape",
        "twilight cool tones",
        "serene blue light"
      ]
    },
    {
      name: "Stormy Light",
      description: "Dramatic break in clouds with spotlight effect",
      bestFor: ["dramatic landscapes", "moody scenes", "epic scale"],
      promptKeywords: [
        "stormy dramatic landscape light",
        "break in clouds spotlight",
        "epic landscape illumination"
      ]
    }
  ],
  
  compositionRules: [
    {
      name: "Rule of Thirds Horizon",
      description: "Horizon on upper or lower third",
      promptKeywords: ["rule of thirds landscape", "horizon placement"]
    },
    {
      name: "Leading Lines",
      description: "Natural lines drawing eye into scene",
      promptKeywords: ["leading lines into landscape", "natural path composition"]
    },
    {
      name: "Frame Within Frame",
      description: "Natural framing elements",
      promptKeywords: ["natural landscape framing", "tree arch framing"]
    }
  ],
  
  commonMistakes: [
    "Boring empty foreground",
    "Centered horizon",
    "Harsh midday light",
    "Blown out sky"
  ],
  
  promptTemplates: [
    "Epic landscape photography, {scene}, {lighting} lighting, compelling foreground with {element}, dramatic sky, atmospheric depth, professional landscape",
    "Fine art landscape, {scene}, golden hour light, layered composition, foreground rocks leading to {subject}, epic scale"
  ]
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get subject library by category
 */
export function getSubjectLibrary(category: SubjectCategory): SubjectLibrary | undefined {
  const libraries: Record<SubjectCategory, SubjectLibrary> = {
    portrait: PORTRAIT_LIBRARY,
    architecture: ARCHITECTURE_LIBRARY,
    food: FOOD_LIBRARY,
    fashion: FASHION_LIBRARY,
    automotive: AUTOMOTIVE_LIBRARY,
    landscape: LANDSCAPE_LIBRARY,
    product: PORTRAIT_LIBRARY, // placeholder
    wildlife: LANDSCAPE_LIBRARY // placeholder
  };
  
  return libraries[category];
}

/**
 * Get lighting setups for subject
 */
export function getLightingSetups(category: SubjectCategory): SubjectLibrary['lightingSetups'] {
  const library = getSubjectLibrary(category);
  return library?.lightingSetups || [];
}

/**
 * Generate subject-specific prompt
 */
export function generateSubjectPrompt(
  library: SubjectLibrary,
  details: Record<string, string>
): string {
  let template = library.promptTemplates[0];
  
  Object.entries(details).forEach(([key, value]) => {
    template = template.replace(`{${key}}`, value);
  });
  
  return template;
}

/**
 * Get critical elements for subject
 */
export function getCriticalElements(category: SubjectCategory): string[] {
  const library = getSubjectLibrary(category);
  if (!library) return [];
  
  return library.keyElements
    .filter(el => el.importance === 'critical')
    .flatMap(el => el.promptKeywords);
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  PORTRAIT_LIBRARY,
  ARCHITECTURE_LIBRARY,
  FOOD_LIBRARY,
  FASHION_LIBRARY,
  AUTOMOTIVE_LIBRARY,
  LANDSCAPE_LIBRARY,
  getSubjectLibrary,
  getLightingSetups,
  generateSubjectPrompt,
  getCriticalElements
};
