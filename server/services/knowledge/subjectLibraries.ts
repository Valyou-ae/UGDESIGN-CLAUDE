/**
 * SUBJECT-SPECIFIC LIBRARIES
 * Professional lighting, composition, and technical specs for 6 photography subjects
 */

export interface SubjectLibrary {
  name: string;
  category: 'portrait' | 'architecture' | 'food' | 'fashion' | 'automotive' | 'landscape';
  lightingSetups: Array<{
    name: string;
    description: string;
    promptKeywords: string[];
    bestFor: string[];
  }>;
  techniques: Array<{
    name: string;
    description: string;
    promptKeywords: string[];
  }>;
  lensRecommendations?: Array<{
    focal: string;
    effect: string;
    promptKeywords: string[];
  }>;
}

export const SUBJECT_LIBRARIES: Record<string, SubjectLibrary> = {
  'portrait': {
    name: 'Portrait Photography',
    category: 'portrait',
    lightingSetups: [
      {
        name: 'Rembrandt',
        description: 'Triangle of light under eye on shadow side',
        promptKeywords: ['Rembrandt lighting with triangle highlight', 'classic portrait lighting with shadowed side', 'dimensional facial illumination'],
        bestFor: ['Dramatic portraits', 'Artistic photography', 'Character studies']
      },
      {
        name: 'Butterfly',
        description: 'Symmetrical lighting from above',
        promptKeywords: ['butterfly lighting for beauty portrait', 'symmetrical glamour lighting', 'overhead beauty illumination', 'classic Hollywood portrait lighting'],
        bestFor: ['Beauty photography', 'Symmetrical faces', 'Glamour shots']
      },
      {
        name: 'Loop',
        description: 'Small shadow from nose toward cheek',
        promptKeywords: ['natural loop lighting for portraits', 'flattering soft portrait light', 'subtle nose shadow toward cheek'],
        bestFor: ['Natural portraits', 'Versatile use', 'Flattering results']
      },
      {
        name: 'Split',
        description: 'Half face lit, half in shadow',
        promptKeywords: ['dramatic split lighting', 'half-face illumination', 'mysterious portrait lighting'],
        bestFor: ['Dramatic portraits', 'Mysterious subjects', 'Film noir aesthetic']
      }
    ],
    techniques: [
      {
        name: 'Shallow Depth of Field',
        description: 'Subject sharp, background creamy bokeh',
        promptKeywords: ['shallow depth of field portrait', 'creamy bokeh background separation', 'tack-sharp eye focus']
      },
      {
        name: 'Environmental Portrait',
        description: 'Subject in context of their environment',
        promptKeywords: ['environmental portrait in context', 'subject within their world', 'storytelling portrait']
      }
    ],
    lensRecommendations: [
      { focal: '85mm', effect: 'Classic portrait compression', promptKeywords: ['shot with 85mm portrait lens', 'flattering compression', 'beautiful subject isolation'] },
      { focal: '135mm', effect: 'Maximum compression', promptKeywords: ['shot with 135mm telephoto', 'maximum facial compression', 'extreme background separation'] },
      { focal: '50mm', effect: 'Natural perspective', promptKeywords: ['natural 50mm perspective', 'environmental portrait framing'] }
    ]
  },
  
  'architecture': {
    name: 'Architecture Photography',
    category: 'architecture',
    lightingSetups: [
      {
        name: 'Blue Hour',
        description: 'Balanced interior/exterior light',
        promptKeywords: ['blue hour architectural photography', 'balanced interior and exterior illumination', 'twilight building shot'],
        bestFor: ['Buildings with lit interiors', 'Dramatic cityscapes']
      },
      {
        name: 'Golden Hour',
        description: 'Warm facade illumination',
        promptKeywords: ['golden hour architecture', 'warm sunlit building facade', 'long shadows on structure'],
        bestFor: ['Textured facades', 'Warm atmosphere']
      },
      {
        name: 'Night',
        description: 'Lit interiors, dramatic contrast',
        promptKeywords: ['night architecture photography', 'illuminated building at night', 'dramatic nighttime structure'],
        bestFor: ['Modern buildings', 'Dramatic presentations']
      }
    ],
    techniques: [
      {
        name: 'Vertical Correction',
        description: 'Keep vertical lines straight',
        promptKeywords: ['corrected vertical perspective', 'straight architectural lines', 'professional architecture photography']
      },
      {
        name: 'Symmetry',
        description: 'Emphasize architectural symmetry',
        promptKeywords: ['symmetrical architectural composition', 'perfectly centered framing', 'balanced architectural design']
      },
      {
        name: 'Leading Lines',
        description: 'Use architectural lines to guide eye',
        promptKeywords: ['leading lines in architecture', 'perspective drawing eye through space', 'architectural depth and lines']
      }
    ]
  },
  
  'food': {
    name: 'Food Photography',
    category: 'food',
    lightingSetups: [
      {
        name: 'Backlit',
        description: 'Light from behind for translucency',
        promptKeywords: ['backlit food with translucent glow', 'rim-lit beverage photography', 'visible steam in backlight'],
        bestFor: ['Drinks', 'Sauces', 'Steam visibility']
      },
      {
        name: 'Side Light',
        description: 'Light from side for texture',
        promptKeywords: ['side-lit food showing texture', 'dramatic food surface detail', 'appetizing texture highlights'],
        bestFor: ['Textured foods', 'Bread', 'Meat']
      },
      {
        name: 'Soft Diffused',
        description: 'Diffused light for even illumination',
        promptKeywords: ['soft diffused food lighting', 'even culinary illumination', 'professional food photography light'],
        bestFor: ['Flat lay', 'Multiple items', 'Light foods']
      }
    ],
    techniques: [
      {
        name: 'Overhead/Flat Lay',
        description: '90° directly above',
        promptKeywords: ['overhead flat lay food photography', 'top-down culinary composition', 'birds eye food shot']
      },
      {
        name: '45 Degree Angle',
        description: 'Classic hero food angle',
        promptKeywords: ['45-degree food photography angle', 'classic food hero shot', 'diagonal appetizing view']
      },
      {
        name: 'Eye Level',
        description: 'Straight-on for layered items',
        promptKeywords: ['eye-level food photography', 'straight-on beverage shot', 'layered food presentation']
      }
    ]
  },
  
  'fashion': {
    name: 'Fashion Photography',
    category: 'fashion',
    lightingSetups: [
      {
        name: 'Editorial',
        description: 'Dramatic, artistic lighting',
        promptKeywords: ['editorial fashion lighting', 'dramatic fashion photography', 'high fashion illumination'],
        bestFor: ['Magazine editorials', 'Artistic fashion', 'Statement pieces']
      },
      {
        name: 'Commercial',
        description: 'Clean, even lighting',
        promptKeywords: ['commercial fashion lighting', 'clean even illumination', 'catalog-ready fashion light'],
        bestFor: ['E-commerce', 'Catalog', 'Clear garment visibility']
      },
      {
        name: 'Natural/Street',
        description: 'Urban, authentic lighting',
        promptKeywords: ['street style natural lighting', 'urban fashion candid light', 'authentic street fashion'],
        bestFor: ['Street style', 'Casual wear', 'Authentic looks']
      }
    ],
    techniques: [
      {
        name: 'Editorial Style',
        description: 'Artistic, storytelling, creative',
        promptKeywords: ['editorial fashion photography', 'artistic fashion story', 'high fashion editorial style', 'conceptual fashion imagery']
      },
      {
        name: 'Commercial Style',
        description: 'Clean, product-focused, sellable',
        promptKeywords: ['commercial fashion photography', 'clean fashion catalog style', 'product-focused fashion', 'e-commerce fashion quality']
      }
    ]
  },
  
  'automotive': {
    name: 'Automotive Photography',
    category: 'automotive',
    lightingSetups: [
      {
        name: 'Studio Gradient',
        description: 'Controlled reflections on bodywork',
        promptKeywords: ['controlled automotive reflections', 'clean car body reflections', 'professional vehicle studio lighting'],
        bestFor: ['Hero shots', 'Press images', 'Premium presentations']
      },
      {
        name: 'Golden Hour Outdoor',
        description: 'Warm natural light on bodywork',
        promptKeywords: ['golden hour automotive photography', 'warm sunset car photography', 'natural light on vehicle'],
        bestFor: ['Lifestyle shots', 'Location photography']
      }
    ],
    techniques: [
      {
        name: 'Rig Shot',
        description: 'Car sharp, background motion blur',
        promptKeywords: ['automotive rig shot', 'sharp car motion blur background', 'professional car photography']
      },
      {
        name: 'Rolling Shot',
        description: 'Shot from moving vehicle alongside',
        promptKeywords: ['rolling shot automotive', 'dynamic car in motion', 'speed blur car photography']
      },
      {
        name: 'Hero Shot',
        description: 'Dramatic static shot showcasing design',
        promptKeywords: ['hero automotive shot', 'dramatic car photography', 'sculptural vehicle lighting']
      },
      {
        name: 'Detail Shot',
        description: 'Close-up on specific features',
        promptKeywords: ['automotive detail photography', 'car design close-up', 'luxury vehicle detail']
      }
    ]
  },
  
  'landscape': {
    name: 'Landscape Photography',
    category: 'landscape',
    lightingSetups: [
      {
        name: 'Golden Hour',
        description: 'Warm, directional, long shadows',
        promptKeywords: ['golden hour landscape', 'warm sunset lighting', 'long shadows across terrain'],
        bestFor: ['Dramatic landscapes', 'Warm atmosphere', 'Long shadows']
      },
      {
        name: 'Blue Hour',
        description: 'Cool, ambient, ethereal',
        promptKeywords: ['blue hour landscape', 'ethereal twilight colors', 'cool ambient landscape light'],
        bestFor: ['Serene scenes', 'Reflections', 'Mystical atmosphere']
      },
      {
        name: 'Overcast',
        description: 'Soft, diffused, saturated colors',
        promptKeywords: ['overcast landscape photography', 'soft diffused outdoor light', 'saturated landscape colors'],
        bestFor: ['Waterfalls', 'Forests', 'Even lighting needed']
      }
    ],
    techniques: [
      {
        name: 'Foreground Interest',
        description: 'Include interesting foreground element',
        promptKeywords: ['foreground interest in landscape', 'leading element to background', 'depth through foreground']
      },
      {
        name: 'Layered Depth',
        description: 'Create depth with distinct layers',
        promptKeywords: ['layered landscape depth', 'atmospheric perspective', 'receding landscape layers']
      },
      {
        name: 'Dramatic Sky',
        description: 'Emphasize sky when dramatic',
        promptKeywords: ['dramatic sky landscape', 'epic cloud formations', 'balanced sky to land ratio']
      }
    ]
  }
};

export function getSubjectLibrary(subject: string): SubjectLibrary | undefined {
  return SUBJECT_LIBRARIES[subject];
}

export function getSubjectLightingSetups(subject: string): SubjectLibrary['lightingSetups'] {
  return SUBJECT_LIBRARIES[subject]?.lightingSetups || [];
}

export function getSubjectTechniques(subject: string): SubjectLibrary['techniques'] {
  return SUBJECT_LIBRARIES[subject]?.techniques || [];
}

export function buildSubjectPrompt(subject: string, lighting?: string, technique?: string): string {
  const library = getSubjectLibrary(subject);
  if (!library) return '';
  
  const parts: string[] = [];
  
  if (lighting) {
    const setup = library.lightingSetups.find(l => l.name.toLowerCase() === lighting.toLowerCase());
    if (setup) {
      parts.push(...setup.promptKeywords.slice(0, 2));
    }
  }
  
  if (technique) {
    const tech = library.techniques.find(t => t.name.toLowerCase() === technique.toLowerCase());
    if (tech) {
      parts.push(...tech.promptKeywords.slice(0, 2));
    }
  }
  
  return parts.join(', ');
}
