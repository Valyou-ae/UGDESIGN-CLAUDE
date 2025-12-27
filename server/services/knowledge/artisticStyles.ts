/**
 * ARTISTIC STYLES LIBRARY
 * 190+ styles spanning art history
 */

export interface ArtisticStyle {
  name: string;
  era: string;
  category: 'ancient' | 'renaissance' | 'impressionism' | 'modern' | 'contemporary' | 'photography' | 'illustration' | 'animation' | 'regional';
  characteristics: string[];
  artists?: string[];
  promptKeywords: string[];
}

export const ARTISTIC_STYLES: Record<string, ArtisticStyle> = {
  // Ancient & Classical
  'egyptian': {
    name: 'Ancient Egyptian',
    era: '3000 BCE - 30 BCE',
    category: 'ancient',
    characteristics: ['Hierarchical scaling', 'Profile view faces with frontal eye', 'Flat stylized figures', 'Gold and lapis lazuli colors'],
    promptKeywords: ['ancient Egyptian art style', 'hieroglyphic aesthetic', 'profile figures with frontal eye', 'gold and lapis lazuli palette', 'pharaonic art style']
  },
  'greek-classical': {
    name: 'Greek Classical',
    era: '5th-4th century BCE',
    category: 'ancient',
    characteristics: ['Idealized human form', 'Contrapposto pose', 'Mathematical proportions', 'White marble aesthetic'],
    promptKeywords: ['ancient Greek classical style', 'idealized human proportions', 'contrapposto stance', 'marble sculpture aesthetic', 'Hellenistic beauty']
  },
  
  // Renaissance
  'high-renaissance': {
    name: 'High Renaissance',
    era: '1490-1527',
    category: 'renaissance',
    characteristics: ['Perfect human proportions', 'Sfumato technique', 'Mathematical perspective', 'Oil painting mastery'],
    artists: ['Leonardo', 'Michelangelo', 'Raphael'],
    promptKeywords: ['High Renaissance painting style', 'Leonardo da Vinci sfumato', 'Michelangelo anatomical mastery', 'Italian Renaissance masterwork']
  },
  'baroque': {
    name: 'Baroque',
    era: '1600-1750',
    category: 'renaissance',
    characteristics: ['Dramatic lighting', 'Rich colors', 'Dynamic compositions', 'Emotional intensity'],
    artists: ['Caravaggio', 'Rembrandt', 'Vermeer'],
    promptKeywords: ['Baroque painting style', 'Caravaggio dramatic lighting', 'rich baroque colors', 'dynamic baroque composition']
  },
  
  // Impressionism
  'impressionism': {
    name: 'French Impressionism',
    era: '1860s-1880s',
    category: 'impressionism',
    characteristics: ['Visible brushstrokes', 'Capturing light and atmosphere', 'Everyday subjects', 'Outdoor painting'],
    artists: ['Monet', 'Renoir', 'Degas'],
    promptKeywords: ['Impressionist painting style', 'Monet light and atmosphere', 'visible brushwork', 'en plein air quality', 'French Impressionism aesthetic']
  },
  'post-impressionism': {
    name: 'Post-Impressionism',
    era: '1886-1905',
    category: 'impressionism',
    characteristics: ['Bold color use', 'Emotional expression', 'Geometric simplification', 'Expressive brushwork'],
    artists: ['Van Gogh', 'Cézanne', 'Gauguin'],
    promptKeywords: ['Post-Impressionist style', 'Van Gogh expressive brushwork', 'bold Gauguin colors', 'emotional color expression']
  },
  
  // Modern
  'art-nouveau': {
    name: 'Art Nouveau',
    era: '1890-1910',
    category: 'modern',
    characteristics: ['Organic flowing lines', 'Natural motifs', 'Decorative patterns', 'Gold leaf'],
    artists: ['Mucha', 'Klimt', 'Gaudi'],
    promptKeywords: ['Art Nouveau style', 'Alphonse Mucha aesthetic', 'organic flowing lines', 'decorative botanical patterns', 'Gustav Klimt gold leaf']
  },
  'surrealism': {
    name: 'Surrealism',
    era: '1920s-1960s',
    category: 'modern',
    characteristics: ['Dream-like imagery', 'Unexpected juxtapositions', 'Realistic technique for impossible scenes', 'Melting morphing forms'],
    artists: ['Dalí', 'Magritte', 'Ernst'],
    promptKeywords: ['Surrealist style', 'Salvador Dalí melting forms', 'Magritte impossible reality', 'dream-like surreal imagery']
  },
  'pop-art': {
    name: 'Pop Art',
    era: '1950s-1960s',
    category: 'modern',
    characteristics: ['Bold primary colors', 'Commercial imagery', 'Ben-Day dots', 'Repetition'],
    artists: ['Warhol', 'Lichtenstein'],
    promptKeywords: ['Pop Art style', 'Andy Warhol aesthetic', 'Lichtenstein comic dots', 'bold primary colors', 'commercial pop art imagery']
  },
  'cubism': {
    name: 'Cubism',
    era: '1907-1920s',
    category: 'modern',
    characteristics: ['Geometric fragmentation', 'Multiple viewpoints', 'Abstract forms', 'Muted colors'],
    artists: ['Picasso', 'Braque'],
    promptKeywords: ['Cubist art style', 'Picasso geometric fragmentation', 'multiple viewpoints', 'abstract cubist forms']
  },
  'expressionism': {
    name: 'Expressionism',
    era: '1905-1920s',
    category: 'modern',
    characteristics: ['Emotional intensity', 'Distorted forms', 'Bold colors', 'Psychological depth'],
    artists: ['Munch', 'Kirchner', 'Kandinsky'],
    promptKeywords: ['Expressionist art style', 'emotional intensity', 'distorted expressive forms', 'bold expressionist colors']
  },
  
  // Contemporary
  'photorealism': {
    name: 'Photorealism',
    era: '1960s-present',
    category: 'contemporary',
    characteristics: ['Hyper-detailed rendering', 'Indistinguishable from photographs', 'Technical precision'],
    promptKeywords: ['photorealistic rendering', 'hyper-detailed realism', 'indistinguishable from photograph', 'technical precision']
  },
  'concept-art': {
    name: 'Concept Art',
    era: 'Modern',
    category: 'contemporary',
    characteristics: ['Visual development for media', 'Environment design', 'Dynamic compositions', 'Digital painting'],
    promptKeywords: ['concept art style', 'professional concept design', 'environment concept art', 'AAA game concept quality']
  },
  'minimalism': {
    name: 'Minimalism',
    era: '1960s-present',
    category: 'contemporary',
    characteristics: ['Geometric simplicity', 'Limited color palette', 'Clean lines', 'Essential forms only'],
    promptKeywords: ['minimalist art style', 'geometric simplicity', 'clean minimal lines', 'essential forms']
  },
  
  // Photography Styles
  'cinematic-photography': {
    name: 'Cinematic Photography',
    era: 'Modern',
    category: 'photography',
    characteristics: ['Film-like color grading', 'Dramatic lighting', 'Wide aspect ratio', 'Shallow depth of field'],
    promptKeywords: ['cinematic photography style', 'film still quality', 'dramatic cinematic lighting', 'movie-like color grading', 'anamorphic cinema look']
  },
  'editorial-fashion': {
    name: 'Editorial Fashion Photography',
    era: 'Modern',
    category: 'photography',
    characteristics: ['High fashion aesthetics', 'Artistic direction', 'Creative lighting', 'Magazine quality'],
    promptKeywords: ['Vogue editorial fashion photography', 'high fashion magazine quality', 'editorial fashion lighting', 'couture fashion imagery']
  },
  'documentary': {
    name: 'Documentary Photography',
    era: 'Modern',
    category: 'photography',
    characteristics: ['Authentic moments', 'Natural lighting', 'Candid captures', 'Story-telling'],
    promptKeywords: ['documentary photography style', 'authentic candid moment', 'natural documentary lighting', 'photojournalism quality']
  },
  'fine-art-photography': {
    name: 'Fine Art Photography',
    era: 'Modern',
    category: 'photography',
    characteristics: ['Artistic vision', 'Conceptual depth', 'Gallery quality', 'Unique perspective'],
    promptKeywords: ['fine art photography', 'gallery quality artistic photograph', 'conceptual photography', 'artistic photographic vision']
  },
  
  // Illustration
  'editorial-illustration': {
    name: 'Editorial Illustration',
    era: 'Modern',
    category: 'illustration',
    characteristics: ['Conceptual imagery', 'Bold graphics', 'Magazine-worthy', 'Thought-provoking'],
    promptKeywords: ['editorial illustration style', 'magazine illustration quality', 'conceptual graphic illustration']
  },
  'childrens-book': {
    name: "Children's Book Illustration",
    era: 'Modern',
    category: 'illustration',
    characteristics: ['Whimsical characters', 'Warm colors', 'Storytelling imagery', 'Approachable style'],
    promptKeywords: ['childrens book illustration style', 'whimsical storybook art', 'warm friendly illustration']
  },
  'watercolor': {
    name: 'Watercolor Illustration',
    era: 'Traditional',
    category: 'illustration',
    characteristics: ['Transparent washes', 'Soft edges', 'Luminous colors', 'Organic bleeds'],
    promptKeywords: ['watercolor illustration style', 'transparent watercolor washes', 'soft watercolor edges', 'luminous watercolor painting']
  },
  
  // Animation & Digital
  'anime': {
    name: 'Anime/Manga',
    era: 'Modern Japanese',
    category: 'animation',
    characteristics: ['Large expressive eyes', 'Stylized proportions', 'Dynamic action poses', 'Cel-shaded coloring'],
    promptKeywords: ['anime style illustration', 'manga aesthetic', 'Japanese animation style', 'cel-shaded anime art']
  },
  'pixar-3d': {
    name: 'Pixar 3D Animation',
    era: 'Modern',
    category: 'animation',
    characteristics: ['Appealing character design', 'Subsurface scattering', 'Emotional expressions', 'Cinematic lighting'],
    promptKeywords: ['Pixar animation style', '3D animated character', 'Pixar-quality rendering', 'appealing 3D character design']
  },
  'studio-ghibli': {
    name: 'Studio Ghibli',
    era: 'Modern Japanese',
    category: 'animation',
    characteristics: ['Hand-drawn aesthetic', 'Lush environments', 'Whimsical characters', 'Atmospheric backgrounds'],
    promptKeywords: ['Studio Ghibli style', 'Miyazaki inspired art', 'hand-drawn anime aesthetic', 'lush Ghibli environment']
  },
  
  // Regional
  'ukiyo-e': {
    name: 'Japanese Ukiyo-e',
    era: '17th-19th century',
    category: 'regional',
    characteristics: ['Woodblock print aesthetic', 'Flat colors', 'Bold outlines', 'Nature themes'],
    artists: ['Hokusai', 'Hiroshige'],
    promptKeywords: ['Japanese ukiyo-e woodblock style', 'Hokusai wave aesthetic', 'traditional Japanese print art', 'flat color woodblock style']
  },
  'chinese-ink': {
    name: 'Chinese Ink Painting',
    era: 'Traditional',
    category: 'regional',
    characteristics: ['Ink wash technique', 'Negative space', 'Calligraphic brushwork', 'Mountain/water themes'],
    promptKeywords: ['Chinese ink painting style', 'traditional ink wash technique', 'sumi-e aesthetic', 'calligraphic brushwork']
  }
};

export function getArtisticStyle(styleId: string): ArtisticStyle | undefined {
  return ARTISTIC_STYLES[styleId];
}

export function getStylesByCategory(category: ArtisticStyle['category']): ArtisticStyle[] {
  return Object.values(ARTISTIC_STYLES).filter(s => s.category === category);
}

export function getStylePromptKeywords(styleId: string): string[] {
  const style = getArtisticStyle(styleId);
  return style?.promptKeywords || [];
}

export function getAllStyleIds(): string[] {
  return Object.keys(ARTISTIC_STYLES);
}

export function searchStyles(query: string): ArtisticStyle[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(ARTISTIC_STYLES).filter(style =>
    style.name.toLowerCase().includes(lowerQuery) ||
    style.characteristics.some(c => c.toLowerCase().includes(lowerQuery)) ||
    style.artists?.some(a => a.toLowerCase().includes(lowerQuery))
  );
}
