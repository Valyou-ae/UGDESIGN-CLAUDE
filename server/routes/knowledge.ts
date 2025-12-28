import type { Express, Request, Response } from "express";
import type { Middleware } from "./middleware";
import {
  getAvailableStyles,
  getAvailablePalettes,
  getAvailableFilmStocks,
  getAvailableLighting,
  getAvailableAtmosphericEffects,
  getAvailableSubjects,
  enhancePromptWithKnowledge,
  type KnowledgeConfig,
  allOpticalEffects,
  timeOfDayPresets,
  depthLayers,
  bokehShapes,
  apertureGuide,
  allWeatherEffects,
  timeOfDay,
  seasons,
  fontCategories,
  interiorStyles,
  fashionCategories,
  productTechniques,
  // Enhanced Libraries (Batch 1)
  ENHANCED_METAL_MATERIALS,
  ENHANCED_SKIN_MATERIALS,
  ENHANCED_FABRIC_MATERIALS,
  REFLECTION_EFFECTS,
  REFRACTION_EFFECTS,
  SCATTERING_EFFECTS,
  COLOR_PROFILES,
  EMOTIONAL_PALETTES,
  COLOR_HARMONIES,
  COLOR_NEGATIVE_FILMS,
  COLOR_REVERSAL_FILMS,
  BLACK_WHITE_FILMS,
  CINEMA_FILMS,
  ENHANCED_PORTRAIT_LIBRARY,
  ENHANCED_ARCHITECTURE_LIBRARY,
  ENHANCED_FOOD_LIBRARY,
  ENHANCED_FASHION_LIBRARY,
  ENHANCED_AUTOMOTIVE_LIBRARY,
  ENHANCED_LANDSCAPE_LIBRARY,
  DEPTH_PROFILES,
  BOKEH_STYLES,
  WEATHER_CONDITIONS,
  FONT_CATEGORIES,
  // Hyper-Realism Libraries (Batch 2)
  ANATOMY_PROFILES,
  EYE_RENDERING,
  LENS_PROFILES,
  AI_TELLS,
  ANTI_DETECTION_TECHNIQUES
} from "../services/knowledge";
import { logger } from "../logger";

export async function registerKnowledgeRoutes(app: Express, middleware: Middleware) {
  const { requireAuth } = middleware;

  app.get("/api/knowledge/styles", async (_req: Request, res: Response) => {
    try {
      const styles = getAvailableStyles();
      const grouped = styles.reduce((acc, style) => {
        if (!acc[style.category]) acc[style.category] = [];
        acc[style.category].push({ id: style.id, name: style.name });
        return acc;
      }, {} as Record<string, Array<{ id: string; name: string }>>);
      res.json({ styles, grouped });
    } catch (error) {
      logger.error("Failed to get styles", error, { source: "knowledge" });
      res.status(500).json({ message: "Failed to fetch styles" });
    }
  });

  app.get("/api/knowledge/palettes", async (_req: Request, res: Response) => {
    try {
      const palettes = getAvailablePalettes();
      const grouped = palettes.reduce((acc, palette) => {
        if (!acc[palette.category]) acc[palette.category] = [];
        acc[palette.category].push({ id: palette.id, name: palette.name, mood: palette.mood });
        return acc;
      }, {} as Record<string, Array<{ id: string; name: string; mood: string }>>);
      res.json({ palettes, grouped });
    } catch (error) {
      logger.error("Failed to get palettes", error, { source: "knowledge" });
      res.status(500).json({ message: "Failed to fetch palettes" });
    }
  });

  app.get("/api/knowledge/film-stocks", async (_req: Request, res: Response) => {
    try {
      const filmStocks = getAvailableFilmStocks();
      const grouped = filmStocks.reduce((acc, stock) => {
        if (!acc[stock.type]) acc[stock.type] = [];
        acc[stock.type].push({ id: stock.id, name: stock.name });
        return acc;
      }, {} as Record<string, Array<{ id: string; name: string }>>);
      res.json({ filmStocks, grouped });
    } catch (error) {
      logger.error("Failed to get film stocks", error, { source: "knowledge" });
      res.status(500).json({ message: "Failed to fetch film stocks" });
    }
  });

  app.get("/api/knowledge/lighting", async (_req: Request, res: Response) => {
    try {
      const lighting = getAvailableLighting();
      const grouped = lighting.reduce((acc, light) => {
        if (!acc[light.category]) acc[light.category] = [];
        acc[light.category].push({ id: light.id, name: light.name });
        return acc;
      }, {} as Record<string, Array<{ id: string; name: string }>>);
      res.json({ lighting, grouped });
    } catch (error) {
      logger.error("Failed to get lighting options", error, { source: "knowledge" });
      res.status(500).json({ message: "Failed to fetch lighting options" });
    }
  });

  app.get("/api/knowledge/atmospheric", async (_req: Request, res: Response) => {
    try {
      const effects = getAvailableAtmosphericEffects();
      res.json({ effects });
    } catch (error) {
      logger.error("Failed to get atmospheric effects", error, { source: "knowledge" });
      res.status(500).json({ message: "Failed to fetch atmospheric effects" });
    }
  });

  app.get("/api/knowledge/subjects", async (_req: Request, res: Response) => {
    try {
      const subjects = getAvailableSubjects();
      res.json({ subjects });
    } catch (error) {
      logger.error("Failed to get subjects", error, { source: "knowledge" });
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  app.get("/api/knowledge/all", async (_req: Request, res: Response) => {
    try {
      const lighting = getAvailableLighting().map(l => ({
        id: l.id,
        name: l.name,
        category: l.category,
        description: `${l.category} lighting technique`
      }));
      
      res.json({
        styles: getAvailableStyles(),
        palettes: getAvailablePalettes(),
        filmStocks: getAvailableFilmStocks(),
        lighting,
        subjects: getAvailableSubjects(),
        opticalEffects: allOpticalEffects.map(e => ({ id: e.id, name: e.name, category: e.category })),
        timeOfDay: timeOfDayPresets.map(t => ({ id: t.id, name: t.name })),
        depthLayers: depthLayers.map(d => ({ id: d.id, name: d.name })),
        bokehShapes: bokehShapes.map(b => ({ id: b.id, name: b.name })),
        weather: allWeatherEffects.map(w => ({ id: w.id, name: w.name, category: w.category })),
        seasons: seasons.map(s => ({ id: s.id, name: s.name })),
        fonts: fontCategories.map(f => ({ id: f.id, name: f.name, mood: f.mood })),
        interiorStyles: interiorStyles.map(i => ({ id: i.id, name: i.name })),
        fashionStyles: fashionCategories.map(f => ({ id: f.id, name: f.name })),
        productTechniques: productTechniques.map(p => ({ id: p.id, name: p.name, use: p.use })),
        
        // Enhanced Libraries (Batch 1) - +10-20% Quality Boost
        enhanced: {
          materials: {
            metals: Object.entries(ENHANCED_METAL_MATERIALS).map(([id, m]) => ({ id, name: m.name, category: m.category })),
            skins: Object.entries(ENHANCED_SKIN_MATERIALS).map(([id, m]) => ({ id, name: m.name, category: m.category })),
            fabrics: Object.entries(ENHANCED_FABRIC_MATERIALS).map(([id, m]) => ({ id, name: m.name, category: m.category }))
          },
          opticalEffects: {
            reflections: Object.entries(REFLECTION_EFFECTS).map(([id, e]) => ({ id, name: e.name })),
            refractions: Object.entries(REFRACTION_EFFECTS).map(([id, e]) => ({ id, name: e.name })),
            scattering: Object.entries(SCATTERING_EFFECTS).map(([id, e]) => ({ id, name: e.name }))
          },
          colorPsychology: {
            profiles: Object.entries(COLOR_PROFILES).map(([id, c]) => ({ id, name: c.name, emotion: c.emotion })),
            palettes: Object.entries(EMOTIONAL_PALETTES).map(([id, p]) => ({ id, name: p.name, mood: p.mood })),
            harmonies: Object.entries(COLOR_HARMONIES).map(([id, h]) => ({ id, name: h.name }))
          },
          filmStocks: {
            colorNegative: Object.entries(COLOR_NEGATIVE_FILMS).map(([id, f]) => ({ id, name: f.name })),
            colorReversal: Object.entries(COLOR_REVERSAL_FILMS).map(([id, f]) => ({ id, name: f.name })),
            blackWhite: Object.entries(BLACK_WHITE_FILMS).map(([id, f]) => ({ id, name: f.name })),
            cinema: Object.entries(CINEMA_FILMS).map(([id, f]) => ({ id, name: f.name }))
          },
          subjectLibraries: {
            portrait: { id: 'portrait', name: ENHANCED_PORTRAIT_LIBRARY.name, techniques: ENHANCED_PORTRAIT_LIBRARY.techniques?.length || 0 },
            architecture: { id: 'architecture', name: ENHANCED_ARCHITECTURE_LIBRARY.name, techniques: ENHANCED_ARCHITECTURE_LIBRARY.techniques?.length || 0 },
            food: { id: 'food', name: ENHANCED_FOOD_LIBRARY.name, techniques: ENHANCED_FOOD_LIBRARY.techniques?.length || 0 },
            fashion: { id: 'fashion', name: ENHANCED_FASHION_LIBRARY.name, techniques: ENHANCED_FASHION_LIBRARY.techniques?.length || 0 },
            automotive: { id: 'automotive', name: ENHANCED_AUTOMOTIVE_LIBRARY.name, techniques: ENHANCED_AUTOMOTIVE_LIBRARY.techniques?.length || 0 },
            landscape: { id: 'landscape', name: ENHANCED_LANDSCAPE_LIBRARY.name, techniques: ENHANCED_LANDSCAPE_LIBRARY.techniques?.length || 0 }
          },
          depth: {
            profiles: Object.entries(DEPTH_PROFILES).map(([id, p]) => ({ id, name: p.name, category: p.category })),
            bokehStyles: Object.entries(BOKEH_STYLES).map(([id, b]) => ({ id, name: b.name }))
          },
          weatherConditions: Object.entries(WEATHER_CONDITIONS).map(([id, w]) => ({ id, name: w.name, category: w.category })),
          typography: Object.entries(FONT_CATEGORIES).map(([id, f]) => ({ id, name: f.name, mood: f.mood }))
        },
        
        // Hyper-Realism Libraries (Batch 2) - +25-30% Quality Boost
        hyperRealism: {
          humanAnatomy: {
            profiles: Object.entries(ANATOMY_PROFILES).map(([id, p]) => ({ id, name: p.name })),
            eyeRendering: Object.entries(EYE_RENDERING).map(([id, e]) => ({ id, name: e.name }))
          },
          lenses: Object.entries(LENS_PROFILES).map(([id, l]) => ({ id, name: l.name, category: l.category })),
          antiAI: {
            tells: Object.entries(AI_TELLS).map(([id, t]) => ({ id, name: t.name, severity: t.severity })),
            techniques: Object.entries(ANTI_DETECTION_TECHNIQUES).map(([id, t]) => ({ id, name: t.name, category: t.category }))
          }
        },
        
        // Summary stats
        stats: {
          totalModules: 48,
          enhancedModules: 10,
          hyperRealismModules: 15,
          qualityBoostRange: '+10-30%'
        }
      });
    } catch (error) {
      logger.error("Failed to get all knowledge options", error, { source: "knowledge" });
      res.status(500).json({ message: "Failed to fetch knowledge options" });
    }
  });

  app.post("/api/knowledge/enhance", requireAuth, async (req: Request, res: Response) => {
    try {
      const { prompt, config } = req.body as { prompt: string; config: KnowledgeConfig };
      
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ message: "Prompt is required" });
      }

      const result = enhancePromptWithKnowledge(prompt, config || {});
      res.json(result);
    } catch (error) {
      logger.error("Failed to enhance prompt with knowledge", error, { source: "knowledge" });
      res.status(500).json({ message: "Failed to enhance prompt" });
    }
  });

  // ============================================================================
  // PERSONA LIBRARY ENDPOINTS (784 personas across 7 age groups)
  // ============================================================================

  app.get("/api/knowledge/personas/filters", async (_req: Request, res: Response) => {
    try {
      const { getPersonaFilters, AGE_GROUP_SPECS, PERSONA_STATS } = await import("../services/knowledge/personas");
      const filters = getPersonaFilters();
      res.json({
        filters,
        ageGroupSpecs: AGE_GROUP_SPECS,
        stats: PERSONA_STATS
      });
    } catch (error) {
      logger.error("Failed to get persona filters", error, { source: "knowledge" });
      res.status(500).json({ message: "Failed to fetch persona filters" });
    }
  });

  app.get("/api/knowledge/personas", async (req: Request, res: Response) => {
    try {
      const { filterPersonas } = await import("../services/knowledge/personas");
      const { ageGroup, ethnicity, sex, size } = req.query;
      
      const personas = filterPersonas({
        ageGroup: ageGroup as any,
        ethnicity: ethnicity as any,
        sex: sex as any,
        size: size as any
      });

      res.json({
        personas,
        count: personas.length,
        filters: { ageGroup, ethnicity, sex, size }
      });
    } catch (error) {
      logger.error("Failed to get personas", error, { source: "knowledge" });
      res.status(500).json({ message: "Failed to fetch personas" });
    }
  });

  app.get("/api/knowledge/personas/:id", async (req: Request, res: Response) => {
    try {
      const { getPersonaById } = await import("../services/knowledge/personas");
      const { id } = req.params;
      
      const persona = getPersonaById(id);
      if (!persona) {
        return res.status(404).json({ message: "Persona not found" });
      }

      res.json(persona);
    } catch (error) {
      logger.error("Failed to get persona by ID", error, { source: "knowledge" });
      res.status(500).json({ message: "Failed to fetch persona" });
    }
  });

  app.get("/api/knowledge/persona", async (req: Request, res: Response) => {
    try {
      const { getPersona } = await import("../services/knowledge/personas");
      const { ageGroup, ethnicity, sex, size } = req.query;

      if (!ageGroup || !ethnicity || !sex || !size) {
        return res.status(400).json({ 
          message: "Missing required query params: ageGroup, ethnicity, sex, size" 
        });
      }

      const persona = getPersona(
        ageGroup as any,
        ethnicity as any,
        sex as any,
        size as any
      );

      if (!persona) {
        return res.status(404).json({ message: "Persona not found for given criteria" });
      }

      res.json(persona);
    } catch (error) {
      logger.error("Failed to get specific persona", error, { source: "knowledge" });
      res.status(500).json({ message: "Failed to fetch persona" });
    }
  });
}
