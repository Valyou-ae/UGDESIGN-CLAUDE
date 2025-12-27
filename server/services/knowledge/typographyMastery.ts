/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TYPOGRAPHY MASTERY
 * Enhancement Feature 9 | Impact: +5-10% quality boost
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Text rendering specifications, font categories, and typographic best
 * practices for images containing text elements.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface FontCategory {
  name: string;
  description: string;
  characteristics: string[];
  emotionalQualities: string[];
  bestFor: string[];
  avoidFor: string[];
  exampleFonts: string[];
  promptKeywords: string[];
}

export interface TextRenderingSpec {
  name: string;
  description: string;
  technicalRequirements: {
    minimumSize: string;
    contrast: string;
    spacing: string;
    alignment: string;
  };
  qualityIndicators: string[];
  promptKeywords: string[];
}

export interface TypographicComposition {
  name: string;
  description: string;
  hierarchy: string[];
  spacing: string;
  promptKeywords: string[];
}

// ============================================================================
// FONT CATEGORIES
// ============================================================================

export const FONT_CATEGORIES: Record<string, FontCategory> = {
  serif: {
    name: "Serif",
    description: "Traditional fonts with decorative strokes at letter ends",
    characteristics: [
      "Small lines at letter terminals",
      "Classic, traditional appearance",
      "High readability in print",
      "Varied stroke weights"
    ],
    emotionalQualities: [
      "trustworthy",
      "established",
      "traditional",
      "authoritative",
      "elegant"
    ],
    bestFor: [
      "luxury brands",
      "editorial content",
      "traditional businesses",
      "book titles",
      "formal invitations"
    ],
    avoidFor: [
      "tech startups",
      "casual/playful brands",
      "small digital text"
    ],
    exampleFonts: [
      "Times New Roman",
      "Garamond",
      "Bodoni",
      "Playfair Display",
      "Georgia"
    ],
    promptKeywords: [
      "elegant serif typography",
      "classic serif letterforms",
      "traditional serif font styling"
    ]
  },

  sans_serif: {
    name: "Sans Serif",
    description: "Clean fonts without decorative strokes",
    characteristics: [
      "No serifs at letter ends",
      "Clean, modern appearance",
      "Excellent screen readability",
      "Even stroke weights"
    ],
    emotionalQualities: [
      "modern",
      "clean",
      "minimal",
      "accessible",
      "forward-thinking"
    ],
    bestFor: [
      "tech companies",
      "digital interfaces",
      "modern branding",
      "startups",
      "minimalist design"
    ],
    avoidFor: [
      "traditional luxury",
      "vintage aesthetics",
      "formal documents"
    ],
    exampleFonts: [
      "Helvetica",
      "Arial",
      "Futura",
      "Gotham",
      "Proxima Nova"
    ],
    promptKeywords: [
      "clean sans-serif typography",
      "modern minimalist font",
      "crisp sans-serif letterforms"
    ]
  },

  script: {
    name: "Script/Cursive",
    description: "Handwritten-style flowing letterforms",
    characteristics: [
      "Connected or near-connected letters",
      "Flowing, organic strokes",
      "Personal, handmade feel",
      "Decorative flourishes"
    ],
    emotionalQualities: [
      "elegant",
      "personal",
      "romantic",
      "feminine",
      "artistic"
    ],
    bestFor: [
      "wedding invitations",
      "luxury branding",
      "signatures",
      "romantic content",
      "artistic projects"
    ],
    avoidFor: [
      "body text",
      "technical content",
      "small sizes",
      "corporate documents"
    ],
    exampleFonts: [
      "Snell Roundhand",
      "Great Vibes",
      "Brush Script",
      "Pacifico",
      "Dancing Script"
    ],
    promptKeywords: [
      "elegant script typography",
      "flowing cursive letterforms",
      "handwritten script font"
    ]
  },

  display: {
    name: "Display/Decorative",
    description: "Unique fonts for headlines and attention",
    characteristics: [
      "High visual impact",
      "Unique, memorable shapes",
      "Limited readability at small sizes",
      "Strong personality"
    ],
    emotionalQualities: [
      "bold",
      "unique",
      "attention-grabbing",
      "creative",
      "expressive"
    ],
    bestFor: [
      "headlines",
      "logos",
      "posters",
      "advertising",
      "creative projects"
    ],
    avoidFor: [
      "body text",
      "long reading",
      "professional documents",
      "small sizes"
    ],
    exampleFonts: [
      "Impact",
      "Cooper Black",
      "Lobster",
      "Bebas Neue",
      "Custom display fonts"
    ],
    promptKeywords: [
      "bold display typography",
      "impactful headline font",
      "decorative display letterforms"
    ]
  },

  monospace: {
    name: "Monospace",
    description: "Fixed-width fonts where each character takes equal space",
    characteristics: [
      "Equal character widths",
      "Technical appearance",
      "Clear alignment",
      "Typewriter aesthetic"
    ],
    emotionalQualities: [
      "technical",
      "precise",
      "retro",
      "coding",
      "systematic"
    ],
    bestFor: [
      "code display",
      "technical content",
      "retro designs",
      "tabular data",
      "terminal aesthetics"
    ],
    avoidFor: [
      "elegant branding",
      "flowing text",
      "luxury content"
    ],
    exampleFonts: [
      "Courier",
      "Consolas",
      "Monaco",
      "Fira Code",
      "JetBrains Mono"
    ],
    promptKeywords: [
      "monospace technical typography",
      "fixed-width code font",
      "typewriter style letterforms"
    ]
  }
};

// ============================================================================
// TEXT RENDERING SPECIFICATIONS
// ============================================================================

export const TEXT_RENDERING_SPECS: Record<string, TextRenderingSpec> = {
  sharp_readable: {
    name: "Sharp Readable Text",
    description: "Crisp, perfectly legible text rendering",
    technicalRequirements: {
      minimumSize: "At least 12pt equivalent",
      contrast: "High contrast against background",
      spacing: "Adequate letter and line spacing",
      alignment: "Consistent alignment"
    },
    qualityIndicators: [
      "No blur or softness on letters",
      "Clean edges on all characters",
      "Consistent stroke weight",
      "Proper kerning and spacing"
    ],
    promptKeywords: [
      "sharp crisp text rendering",
      "perfectly legible typography",
      "clear readable letterforms",
      "high contrast text"
    ]
  },

  neon_glowing: {
    name: "Neon Glowing Text",
    description: "Illuminated text with glow effects",
    technicalRequirements: {
      minimumSize: "Large, headline scale",
      contrast: "Bright against dark background",
      spacing: "Extra wide for glow spread",
      alignment: "Usually centered"
    },
    qualityIndicators: [
      "Consistent glow intensity",
      "Color bleed from tubes",
      "Visible tube structure",
      "Realistic light falloff"
    ],
    promptKeywords: [
      "neon sign glowing text",
      "illuminated neon typography",
      "glowing tube letter effect",
      "realistic neon sign lighting"
    ]
  },

  embossed_3d: {
    name: "Embossed 3D Text",
    description: "Text with dimensional depth and shadows",
    technicalRequirements: {
      minimumSize: "Large for visible depth",
      contrast: "Needs appropriate lighting",
      spacing: "Account for shadow spread",
      alignment: "Typically centered or aligned"
    },
    qualityIndicators: [
      "Consistent depth and bevel",
      "Proper shadow direction",
      "Material surface detail",
      "Lighting consistency"
    ],
    promptKeywords: [
      "3D embossed typography",
      "dimensional raised letters",
      "beveled text with shadows",
      "sculptural letterforms"
    ]
  },

  handwritten: {
    name: "Handwritten Text",
    description: "Natural handwritten text appearance",
    technicalRequirements: {
      minimumSize: "Variable like real handwriting",
      contrast: "Ink-like appearance",
      spacing: "Natural, slightly uneven",
      alignment: "Organic, not perfect"
    },
    qualityIndicators: [
      "Natural stroke variation",
      "Organic character shapes",
      "Realistic ink bleed",
      "Personal, unique style"
    ],
    promptKeywords: [
      "authentic handwritten text",
      "natural pen strokes",
      "organic handwriting style",
      "personal written letterforms"
    ]
  }
};

// ============================================================================
// TYPOGRAPHIC COMPOSITIONS
// ============================================================================

export const TYPOGRAPHIC_COMPOSITIONS: Record<string, TypographicComposition> = {
  headline_subhead: {
    name: "Headline with Subhead",
    description: "Classic hierarchy with main and supporting text",
    hierarchy: [
      "Large bold headline",
      "Smaller supporting subhead",
      "Optional body text"
    ],
    spacing: "Clear separation between levels",
    promptKeywords: [
      "headline typography hierarchy",
      "main text with subhead",
      "typographic size hierarchy"
    ]
  },

  centered_elegant: {
    name: "Centered Elegant",
    description: "Formal centered composition",
    hierarchy: [
      "Centered main text",
      "Balanced left and right",
      "Vertical spacing emphasis"
    ],
    spacing: "Generous vertical spacing",
    promptKeywords: [
      "centered elegant typography",
      "symmetrical text layout",
      "formal centered composition"
    ]
  },

  asymmetric_modern: {
    name: "Asymmetric Modern",
    description: "Dynamic off-center composition",
    hierarchy: [
      "Offset large type",
      "Contrasting small elements",
      "White space as element"
    ],
    spacing: "Intentional imbalance",
    promptKeywords: [
      "asymmetric modern typography",
      "dynamic text composition",
      "contemporary layout design"
    ]
  },

  layered_dimensional: {
    name: "Layered Dimensional",
    description: "Text at multiple depths",
    hierarchy: [
      "Foreground text sharp",
      "Background text soft",
      "Depth through focus and size"
    ],
    spacing: "Overlap and depth relationships",
    promptKeywords: [
      "layered typography depth",
      "dimensional text composition",
      "multi-plane text layout"
    ]
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get font category by name
 */
export function getFontCategory(name: string): FontCategory | undefined {
  return FONT_CATEGORIES[name];
}

/**
 * Get font categories for use case
 */
export function getFontsForUseCase(useCase: string): FontCategory[] {
  return Object.values(FONT_CATEGORIES).filter(cat =>
    cat.bestFor.some(use => 
      use.toLowerCase().includes(useCase.toLowerCase())
    )
  );
}

/**
 * Generate font category prompt
 */
export function generateFontPrompt(category: FontCategory): string {
  return category.promptKeywords.join(', ');
}

/**
 * Generate text rendering prompt
 */
export function generateRenderingPrompt(spec: TextRenderingSpec): string {
  return spec.promptKeywords.join(', ');
}

/**
 * Generate composition prompt
 */
export function generateCompositionPrompt(comp: TypographicComposition): string {
  return comp.promptKeywords.join(', ');
}

/**
 * Get complete typography prompt
 */
export function generateTypographyPrompt(
  fontCategory: FontCategory,
  rendering: TextRenderingSpec,
  composition: TypographicComposition
): string {
  return [
    ...fontCategory.promptKeywords,
    ...rendering.promptKeywords,
    ...composition.promptKeywords
  ].join(', ');
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  FONT_CATEGORIES,
  TEXT_RENDERING_SPECS,
  TYPOGRAPHIC_COMPOSITIONS,
  getFontCategory,
  getFontsForUseCase,
  generateFontPrompt,
  generateRenderingPrompt,
  generateCompositionPrompt,
  generateTypographyPrompt
};
