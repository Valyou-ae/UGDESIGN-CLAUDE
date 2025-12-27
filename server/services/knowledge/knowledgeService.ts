/**
 * UNIFIED KNOWLEDGE SERVICE
 * Central service for querying and applying knowledge base to prompts
 */

import { 
  ATMOSPHERIC_EFFECTS, 
  CINEMATIC_LIGHTING, 
  COLOR_GRADES,
  buildCinematicPrompt 
} from './cinematicDNA';

import {
  getMaterial,
  getMaterialsByCategory,
  buildMaterialPrompt
} from './materialPhysics';

import {
  ARTISTIC_STYLES,
  getArtisticStyle,
  getStylesByCategory,
  searchStyles
} from './artisticStyles';

import {
  COLOR_PALETTES,
  getColorPalette,
  getMoodPalettes,
  getCinematicPalettes,
  buildColorPrompt
} from './colorPsychology';

import {
  FILM_STOCKS,
  getFilmStock,
  getFilmStocksByType,
  buildFilmStockPrompt
} from './filmStocks';

import {
  SUBJECT_LIBRARIES,
  getSubjectLibrary,
  buildSubjectPrompt
} from './subjectLibraries';

import {
  QUALITY_KEYWORDS,
  getUniversalNegatives,
  getNegativesForSubject,
  buildQualityEnhancement
} from './qualityControl';

export interface KnowledgeConfig {
  style?: string;
  mood?: string;
  colorPalette?: string;
  filmStock?: string;
  lighting?: string;
  atmosphere?: string;
  materials?: string[];
  subject?: string;
  qualityLevel?: 'basic' | 'standard' | 'premium';
}

export interface EnhancedPrompt {
  enhancedPrompt: string;
  negativePrompts: string[];
  appliedKnowledge: string[];
}

/**
 * Apply knowledge base enhancements to a prompt
 */
export function enhancePromptWithKnowledge(
  basePrompt: string,
  config: KnowledgeConfig
): EnhancedPrompt {
  const enhancements: string[] = [];
  const appliedKnowledge: string[] = [];
  
  // Apply artistic style
  if (config.style) {
    const style = getArtisticStyle(config.style);
    if (style) {
      enhancements.push(...style.promptKeywords.slice(0, 3));
      appliedKnowledge.push(`Style: ${style.name}`);
    }
  }
  
  // Apply color palette/mood
  if (config.colorPalette || config.mood) {
    const colorPrompt = buildColorPrompt(config.colorPalette || '', config.mood);
    if (colorPrompt) {
      enhancements.push(colorPrompt);
      appliedKnowledge.push(`Color: ${config.colorPalette || config.mood}`);
    }
  }
  
  // Apply film stock
  if (config.filmStock) {
    const filmPrompt = buildFilmStockPrompt(config.filmStock);
    if (filmPrompt) {
      enhancements.push(filmPrompt);
      appliedKnowledge.push(`Film: ${config.filmStock}`);
    }
  }
  
  // Apply cinematic elements (lighting, atmosphere)
  if (config.lighting || config.atmosphere) {
    const cinematicPrompt = buildCinematicPrompt({
      lighting: config.lighting,
      atmosphere: config.atmosphere,
      depthEmphasis: true
    });
    if (cinematicPrompt) {
      enhancements.push(cinematicPrompt);
      if (config.lighting) appliedKnowledge.push(`Lighting: ${config.lighting}`);
      if (config.atmosphere) appliedKnowledge.push(`Atmosphere: ${config.atmosphere}`);
    }
  }
  
  // Apply materials
  if (config.materials && config.materials.length > 0) {
    const materialPrompt = buildMaterialPrompt(config.materials);
    if (materialPrompt) {
      enhancements.push(materialPrompt);
      appliedKnowledge.push(`Materials: ${config.materials.join(', ')}`);
    }
  }
  
  // Apply subject-specific techniques
  if (config.subject) {
    const subjectPrompt = buildSubjectPrompt(config.subject, config.lighting);
    if (subjectPrompt) {
      enhancements.push(subjectPrompt);
      appliedKnowledge.push(`Subject: ${config.subject}`);
    }
  }
  
  // Apply quality enhancement
  const qualityLevel = config.qualityLevel || 'standard';
  const qualityPrompt = buildQualityEnhancement(qualityLevel);
  enhancements.push(qualityPrompt);
  
  // Build negative prompts based on subject
  const subjectType = detectSubjectType(basePrompt, config.subject);
  const negativePrompts = getNegativesForSubject(subjectType);
  
  // Combine base prompt with enhancements
  const enhancedPrompt = enhancements.length > 0
    ? `${basePrompt}, ${enhancements.join(', ')}`
    : basePrompt;
  
  return {
    enhancedPrompt,
    negativePrompts,
    appliedKnowledge
  };
}

/**
 * Detect subject type from prompt content
 */
function detectSubjectType(prompt: string, configSubject?: string): 'portrait' | 'landscape' | 'product' | 'general' {
  if (configSubject) {
    if (['portrait', 'fashion'].includes(configSubject)) return 'portrait';
    if (['landscape'].includes(configSubject)) return 'landscape';
    if (['product', 'food', 'automotive'].includes(configSubject)) return 'product';
  }
  
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('person') || lowerPrompt.includes('woman') || 
      lowerPrompt.includes('man') || lowerPrompt.includes('portrait') ||
      lowerPrompt.includes('face') || lowerPrompt.includes('model')) {
    return 'portrait';
  }
  
  if (lowerPrompt.includes('landscape') || lowerPrompt.includes('mountain') ||
      lowerPrompt.includes('forest') || lowerPrompt.includes('ocean') ||
      lowerPrompt.includes('sunset') || lowerPrompt.includes('nature')) {
    return 'landscape';
  }
  
  if (lowerPrompt.includes('product') || lowerPrompt.includes('bottle') ||
      lowerPrompt.includes('package') || lowerPrompt.includes('mockup')) {
    return 'product';
  }
  
  return 'general';
}

/**
 * Get all available styles for UI selection
 */
export function getAvailableStyles(): Array<{ id: string; name: string; category: string }> {
  return Object.entries(ARTISTIC_STYLES).map(([id, style]) => ({
    id,
    name: style.name,
    category: style.category
  }));
}

/**
 * Get all available color palettes for UI selection
 */
export function getAvailablePalettes(): Array<{ id: string; name: string; category: string; mood: string }> {
  return Object.entries(COLOR_PALETTES).map(([id, palette]) => ({
    id,
    name: palette.name,
    category: palette.category,
    mood: palette.mood
  }));
}

/**
 * Get all available film stocks for UI selection
 */
export function getAvailableFilmStocks(): Array<{ id: string; name: string; type: string }> {
  return Object.entries(FILM_STOCKS).map(([id, stock]) => ({
    id,
    name: stock.name,
    type: stock.type
  }));
}

/**
 * Get all available lighting setups for UI selection
 */
export function getAvailableLighting(): Array<{ id: string; name: string; category: string }> {
  return Object.entries(CINEMATIC_LIGHTING).map(([id, lighting]) => ({
    id,
    name: lighting.name,
    category: lighting.category
  }));
}

/**
 * Get all available atmospheric effects for UI selection
 */
export function getAvailableAtmosphericEffects(): Array<{ id: string; type: string; description: string }> {
  return Object.entries(ATMOSPHERIC_EFFECTS).map(([id, effect]) => ({
    id,
    type: effect.type,
    description: effect.description
  }));
}

/**
 * Get subject library options for UI
 */
export function getAvailableSubjects(): Array<{ id: string; name: string }> {
  return Object.entries(SUBJECT_LIBRARIES).map(([id, library]) => ({
    id,
    name: library.name
  }));
}

/**
 * Quick enhancement for mockup generation
 */
export function enhanceForMockup(
  prompt: string,
  productType: string,
  lighting?: string,
  mood?: string
): string {
  const enhancements: string[] = [];
  
  // Add product photography techniques
  const productLibrary = getSubjectLibrary('product') || getSubjectLibrary('fashion');
  if (productLibrary && lighting) {
    const setup = productLibrary.lightingSetups.find(l => 
      l.name.toLowerCase().includes(lighting.toLowerCase())
    );
    if (setup) {
      enhancements.push(...setup.promptKeywords.slice(0, 2));
    }
  }
  
  // Add mood-based colors
  if (mood) {
    const colorPrompt = buildColorPrompt('', mood);
    if (colorPrompt) {
      enhancements.push(colorPrompt);
    }
  }
  
  // Add quality keywords
  enhancements.push('professional product photography', 'commercial quality', 'sharp focus');
  
  return enhancements.length > 0
    ? `${prompt}, ${enhancements.join(', ')}`
    : prompt;
}

// Export for direct access
export {
  ARTISTIC_STYLES,
  COLOR_PALETTES,
  FILM_STOCKS,
  CINEMATIC_LIGHTING,
  ATMOSPHERIC_EFFECTS,
  SUBJECT_LIBRARIES,
  QUALITY_KEYWORDS
};
