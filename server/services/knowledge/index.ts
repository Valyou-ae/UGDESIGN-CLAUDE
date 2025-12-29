/**
 * KNOWLEDGE BASE INDEX
 * Central export for all Elite Mockup Generator knowledge modules
 */

export { BRAND_STYLES } from './brandStyles';

export { CAMERA_SPECS, getCameraSpecsForAngle } from './productAngleDetails';

export {
  TECHNICAL_FLAWS,
  AI_ARTIFACTS,
  UNWANTED_STYLES,
  APPAREL_NEGATIVES,
  HUMAN_SUBJECT_NEGATIVES,
  getNegativePrompts
} from './negativePrompts';

export {
  BODY_CONTOURS,
  CYLINDRICAL_MAPPING,
  FOLD_DISTORTION,
  VERTICAL_PERSPECTIVE,
  getContourDistortionPrompt
} from './contourDistortion';

export {
  STUDIO_LIGHTING,
  NATURAL_LIGHTING,
  getLightingSetup
} from './lightingSetups';

export {
  FABRIC_PHYSICS,
  DTG_PRINTING,
  SCREEN_PRINTING,
  SUBLIMATION_PRINTING,
  MATERIAL_PRESETS,
  getFabricPhysics,
  getPrintMethod,
  getMaterialPreset
} from './materialRealism';

export { NAMES_BY_ETHNICITY_AND_SEX, getRandomName } from './names';

export { ETHNIC_FEATURE_MAP, getEthnicFeatures } from './ethnicFeatures';

export {
  getSomaticProfile,
  getSomaticProfilePrompt
} from './somaticProfiles';

export {
  DTG_PRODUCTS,
  AOP_PRODUCTS,
  ACCESSORY_PRODUCTS,
  HOME_LIVING_PRODUCTS,
  PRODUCT_NAME_MAP,
  PRODUCT_SIZES,
  PRODUCT_COLORS,
  getProduct,
  getProductByFrontendName,
  getProductSizes,
  getDTGProducts,
  getAOPProducts,
  getAccessoryProducts,
  getHomeLivingProducts,
  getAllProducts,
  getProductsByCategory,
  getProductsBySubcategory,
  getGarmentBlueprint,
  getGarmentBlueprintPrompt,
  getProductBlueprint,
  getProductBlueprintPrompt,
  getProductNegativePrompts,
  getProductVisualAnchors
} from './productBlueprints';

export {
  PHOTOREALISM_CHECKLIST,
  COMMON_AI_FAILURES,
  getPhotorealismPromptAdditions,
  getAIFailureAvoidancePrompt,
  getFullHumanRealismPrompt
} from './humanRealism';

export {
  ALL_PERSONAS,
  CORE_PERSONAS,
  ADULT_PERSONAS,
  TEEN_PERSONAS,
  YOUNG_ADULT_PERSONAS,
  getPersona,
  getPersonaByFilters,
  getPersonasByAgeGroup,
  getPersonasBySex,
  getPersonasByEthnicity,
  getPersonasBySize,
  getRandomPersona,
  getExactPersona,
  generatePersonaId,
  parsePersonaId,
  getPersonaStats
} from './unifiedPersonas';

// Enhanced Knowledge Base Modules
export {
  ATMOSPHERIC_EFFECTS,
  CINEMATIC_LIGHTING,
  COLOR_GRADES,
  DEPTH_LAYERS,
  getAtmosphericEffect,
  getCinematicLighting,
  getDepthLayerPrompts,
  getColorGrade,
  buildCinematicPrompt
} from './cinematicDNA';

export {
  METAL_MATERIALS,
  GLASS_MATERIALS,
  FABRIC_MATERIALS,
  ORGANIC_MATERIALS,
  getMaterial,
  getMaterialsByCategory,
  getMaterialPromptKeywords,
  buildMaterialPrompt
} from './materialPhysics';

export {
  ARTISTIC_STYLES,
  getArtisticStyle,
  getStylesByCategory,
  getStylePromptKeywords,
  getAllStyleIds,
  searchStyles
} from './artisticStyles';

export {
  COLOR_EMOTIONS,
  COLOR_PALETTES,
  getColorEmotion,
  getColorPalette,
  getPalettesByCategory,
  getMoodPalettes,
  getCinematicPalettes,
  buildColorPrompt
} from './colorPsychology';

export {
  FILM_STOCKS,
  GRAIN_PROFILES,
  getFilmStock,
  getFilmStocksByType,
  getGrainProfile,
  buildFilmStockPrompt,
  getAllFilmStockIds
} from './filmStocks';

export {
  SUBJECT_LIBRARIES,
  getSubjectLibrary,
  getSubjectLightingSetups,
  getSubjectTechniques,
  buildSubjectPrompt
} from './subjectLibraries';

export {
  QUALITY_KEYWORDS,
  UNIVERSAL_NEGATIVES,
  PORTRAIT_NEGATIVES,
  LANDSCAPE_NEGATIVES,
  PRODUCT_NEGATIVES,
  QUALITY_CHECKS,
  getQualityKeywords,
  getUniversalNegatives,
  getNegativesForSubject,
  buildQualityEnhancement,
  getQualityCheck
} from './qualityControl';

export {
  enhancePromptWithKnowledge,
  getAvailableStyles,
  getAvailablePalettes,
  getAvailableFilmStocks,
  getAvailableLighting,
  getAvailableAtmosphericEffects,
  getAvailableSubjects,
  enhanceForMockup,
  type KnowledgeConfig,
  type EnhancedPrompt
} from './knowledgeService';

// New Knowledge Base Modules (02, 06, 07, 08, 09-10, Industry)
export {
  allOpticalEffects,
  lightRays,
  atmosphericScattering,
  lensEffects,
  reflections,
  shadows,
  caustics,
  timeOfDayPresets,
  getOpticalEffectById,
  getOpticalEffectsByCategory,
  getTimeOfDayById
} from './opticalPhenomena';

export {
  promptStructure,
  qualityKeywords,
  universalNegatives as metaUniversalNegatives,
  portraitNegatives,
  landscapeNegatives,
  productNegatives,
  architectureNegatives,
  negativePromptCategories,
  getQualityEnhancers,
  getNegativesForSubject as getMetaNegativesForSubject,
  buildOptimizedPrompt
} from './metaPrompting';

export {
  depthLayers,
  atmosphericPerspective,
  atmosphericKeywords,
  bokehShapes,
  apertureGuide,
  getDepthLayerById,
  getBokehShapeById,
  getApertureByFStop,
  applyDepthSystem
} from './depthSystems';

export {
  rainEffects,
  snowEffects,
  fogTypes,
  timeOfDay,
  seasons,
  allWeatherEffects,
  getWeatherEffectById,
  getTimeOfDayById as getWeatherTimeOfDayById,
  getSeasonById,
  applyWeatherAtmosphere
} from './weatherEffects';

export {
  textQuality,
  fontCategories,
  legibilityRules,
  technicalChecks,
  anatomicalChecks,
  consistencyChecks,
  qualityScoring,
  preGenerationChecklist,
  postGenerationChecklist,
  getFontCategoryById,
  getQualityKeywords as getTextQualityKeywords,
  getAllQualityFixes,
  getAllNegativePrompts
} from './typographyQuality';

export {
  interiorStyles,
  interiorMoods,
  fashionCategories,
  productTechniques,
  productLighting,
  getInteriorStyleById,
  getInteriorMoodById,
  getFashionCategoryById,
  getProductTechniqueById,
  getProductLightingById,
  applyIndustryKnowledge
} from './industryKnowledge';

// ============================================================================
// ENHANCED LIBRARIES (Batch 1) - +10-20% Quality Boost
// ============================================================================

// Material Physics Enhanced (100+ materials with IOR, roughness, BRDF)
export {
  METAL_MATERIALS as ENHANCED_METAL_MATERIALS,
  SKIN_MATERIALS as ENHANCED_SKIN_MATERIALS,
  FABRIC_MATERIALS as ENHANCED_FABRIC_MATERIALS,
  GLASS_MATERIALS as ENHANCED_GLASS_MATERIALS,
  getMaterial as getEnhancedMaterial,
  getMaterialsByCategory as getEnhancedMaterialsByCategory,
  generateMaterialPrompt,
  generateMaterialNegativePrompt,
  generateSkinSSSPrompt,
  generateSceneMaterialPrompt
} from './materialPhysicsEnhanced';

// Optical Phenomena Enhanced (reflections, refractions, scattering)
export {
  REFLECTION_EFFECTS,
  REFRACTION_EFFECTS,
  SCATTERING_EFFECTS,
  SPECIAL_EFFECTS as OPTICAL_SPECIAL_EFFECTS,
  TIME_OF_DAY_TEMPERATURES,
  getOpticalEffect,
  getEffectsByCategory,
  generateOpticalPrompt,
  getTimeOfDayPrompt,
  generateSceneOpticalPrompt
} from './opticalPhenomenaEnhanced';

// Color Psychology Enhanced (50+ colors with emotional palettes)
export {
  COLOR_PROFILES,
  EMOTIONAL_PALETTES,
  COLOR_HARMONIES,
  getColorProfile,
  getColorsByEmotion,
  getColorsByTemperature,
  generateColorPrompt,
  generateEmotionalPalettePrompt,
  generateHarmonyPrompt,
  getPaletteForMood
} from './colorPsychologyEnhanced';

// Film Stocks Enhanced (20+ film stocks)
export {
  COLOR_NEGATIVE_FILMS,
  COLOR_REVERSAL_FILMS,
  BLACK_WHITE_FILMS,
  CINEMA_FILMS,
  PROCESSING_STYLES,
  getFilmStock as getEnhancedFilmStock,
  getFilmsByType,
  generateFilmPrompt,
  generateProcessingPrompt,
  recommendFilmForUseCase
} from './filmStocksEnhanced';

// Subject-Specific Libraries Enhanced (Portrait, Architecture, Food, Fashion, Automotive, Landscape)
export {
  PORTRAIT_LIBRARY as ENHANCED_PORTRAIT_LIBRARY,
  ARCHITECTURE_LIBRARY as ENHANCED_ARCHITECTURE_LIBRARY,
  FOOD_LIBRARY as ENHANCED_FOOD_LIBRARY,
  FASHION_LIBRARY as ENHANCED_FASHION_LIBRARY,
  AUTOMOTIVE_LIBRARY as ENHANCED_AUTOMOTIVE_LIBRARY,
  LANDSCAPE_LIBRARY as ENHANCED_LANDSCAPE_LIBRARY
} from './subjectLibrariesEnhanced';

// Meta-Prompting Patterns Enhanced
export {
  PROMPT_STRUCTURE,
  PROMPT_TEMPLATES,
  NEGATIVE_PROMPT_SETS,
  ADVANCED_TECHNIQUES,
  buildPrompt,
  getNegativePrompt as getEnhancedNegativePrompt,
  getPortraitNegativePrompt,
  getLandscapeNegativePrompt,
  validatePrompt,
  generateFromTemplate
} from './metaPromptingEnhanced';

// Depth Systems Enhanced (DoF profiles, bokeh styles)
export {
  DEPTH_PROFILES,
  BOKEH_STYLES,
  LAYERING_STRATEGIES,
  getDepthProfile,
  getProfilesByCategory,
  generateDepthPrompt,
  generateBokehPrompt,
  generateLayeringPrompt,
  recommendDepthForUseCase,
  estimateDepthOfField
} from './depthSystemsEnhanced';

// Weather & Atmospheric Effects Enhanced
export {
  WEATHER_CONDITIONS,
  ATMOSPHERIC_EFFECTS as ENHANCED_ATMOSPHERIC_EFFECTS,
  getWeatherCondition,
  getConditionsByCategory,
  generateWeatherPrompt,
  generateAtmosphericPrompt,
  getWeatherForMood,
  combineWeatherAtmospheric
} from './weatherEffectsEnhanced';

// Typography Mastery
export {
  FONT_CATEGORIES,
  TEXT_RENDERING_SPECS,
  TYPOGRAPHIC_COMPOSITIONS,
  getFontCategory,
  getFontsForUseCase,
  generateFontPrompt,
  generateRenderingPrompt,
  generateCompositionPrompt,
  generateTypographyPrompt
} from './typographyMastery';

// Quality Control Enhanced (Checklists and Validation)
export {
  TECHNICAL_CHECKLIST,
  ANATOMICAL_CHECKLIST,
  CONSISTENCY_CHECKLIST,
  COMPOSITION_CHECKLIST,
  getChecklist,
  getCriticalItems,
  generateFixPrompt,
  calculateScore,
  getScoreRating,
  validateAgainstChecklist,
  getPortraitChecklist,
  getLandscapeChecklist
} from './qualityControlEnhanced';

// ============================================================================
// HYPER-REALISM LIBRARIES (Batch 2) - +25-30% Quality Boost
// ============================================================================

// Human Anatomy Perfection (eliminate uncanny valley)
export {
  EYE_RENDERING,
  SKIN_TEXTURE,
  HAND_ANATOMY,
  ANATOMY_PROFILES,
  getAnatomyProfile,
  generateAnatomyPrompt,
  getEyeRenderingPrompt,
  getSkinTexturePrompt,
  getHandAnatomyPrompt,
  generateAnatomyNegativePrompt,
  getCompletePortraitPrompt
} from './humanAnatomyPerfection';

// Photographic Lens Simulation
export {
  LENS_PROFILES,
  APERTURE_EFFECTS,
  calculateDepthOfField,
  getLensProfile,
  getLensesByCategory,
  generateLensPrompt,
  recommendLens,
  generateCameraPrompt
} from './lensSimulation';

// Imperfection Library (authentic flaws)
export * as ImperfectionLibrary from './imperfectionLibrary';

// Advanced Lighting Physics
export * as AdvancedLightingPhysics from './advancedLightingPhysics';

// Surface Material Accuracy
export * as SurfaceMaterialAccuracy from './surfaceMaterialAccuracy';

// Environmental Context
export * as EnvironmentalContext from './environmentalContext';

// Micro-Detail Enhancement
export * as MicroDetailEnhancement from './microDetailEnhancement';

// Film Stock Emulation (Hyper-Realistic)
export * as FilmStockEmulation from './filmStockEmulation';

// Forensic Anti-AI Detection
export {
  AI_TELLS,
  ANTI_DETECTION_TECHNIQUES,
  ANTI_AI_NEGATIVE_PROMPTS,
  getAITell,
  getTechnique,
  generateAntiDetectionPrompt,
  generateAntiAINegativePrompt,
  getNegativePromptsForCategory,
  getPortraitCheckList,
  generateAuthenticityPrompt
} from './forensicAntiAI';

// Skin Rendering Mastery
export * as SkinRenderingMastery from './skinRenderingMastery';

// Hyper-Resolution
export * as HyperResolution from './hyperResolution';

// Tonal Range
export * as TonalRange from './tonalRange';

// Behavioral Realism
export * as BehavioralRealism from './behavioralRealism';

// Subject-Specific Hyper-Realism
export * as SubjectSpecificHyper from './subjectSpecificHyper';

// Forensic Standards
export * as ForensicStandards from './forensicStandards';
