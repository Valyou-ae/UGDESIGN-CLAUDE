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
  type KnowledgeConfig
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
      res.json({
        styles: getAvailableStyles(),
        palettes: getAvailablePalettes(),
        filmStocks: getAvailableFilmStocks(),
        lighting: getAvailableLighting(),
        atmospheric: getAvailableAtmosphericEffects(),
        subjects: getAvailableSubjects()
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
}
