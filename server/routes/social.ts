import type { Express, Request, Response } from "express";
import type { Middleware } from "./middleware";
import type { AuthenticatedRequest } from "../types";
import { storage } from "../storage";
import { logger } from "../logger";
import { isAuthenticated } from "../replitAuth";

export function registerSocialRoutes(app: Express, middleware: Middleware) {
  const { requireAuth, getUserId } = middleware;

  // Optional auth middleware - allows both authenticated and unauthenticated users
  const optionalAuth = (req: Request, res: Response, next: () => void) => {
    if (req.headers.authorization || req.cookies?.['connect.sid']) {
      return isAuthenticated(req, res, next);
    }
    next();
  };

  // Follow a user
  app.post("/api/users/:userId/follow", requireAuth, async (req: Request, res: Response) => {
    try {
      const followerId = getUserId(req as AuthenticatedRequest);
      const { userId: followingId } = req.params;

      if (!followerId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      if (followerId === followingId) {
        return res.status(400).json({ message: "Cannot follow yourself" });
      }

      const targetUser = await storage.getUser(followingId);
      if (!targetUser) {
        return res.status(404).json({ message: "User not found" });
      }

      await storage.followUser(followerId, followingId);
      const followerCount = await storage.getFollowerCount(followingId);

      res.json({ success: true, isFollowing: true, followerCount });
    } catch (error) {
      logger.error("Follow user error", error, { source: "social" });
      res.status(500).json({ message: "Failed to follow user" });
    }
  });

  // Unfollow a user
  app.delete("/api/users/:userId/follow", requireAuth, async (req: Request, res: Response) => {
    try {
      const followerId = getUserId(req as AuthenticatedRequest);
      const { userId: followingId } = req.params;

      if (!followerId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      await storage.unfollowUser(followerId, followingId);
      const followerCount = await storage.getFollowerCount(followingId);

      res.json({ success: true, isFollowing: false, followerCount });
    } catch (error) {
      logger.error("Unfollow user error", error, { source: "social" });
      res.status(500).json({ message: "Failed to unfollow user" });
    }
  });

  // Check if following a user
  app.get("/api/users/:userId/following", requireAuth, async (req: Request, res: Response) => {
    try {
      const followerId = getUserId(req as AuthenticatedRequest);
      const { userId: followingId } = req.params;

      if (!followerId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const isFollowing = await storage.isFollowing(followerId, followingId);
      res.json({ isFollowing });
    } catch (error) {
      logger.error("Check following error", error, { source: "social" });
      res.status(500).json({ message: "Failed to check follow status" });
    }
  });

  // Get a user's followers
  app.get("/api/users/:userId/followers", optionalAuth, async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
      const offset = parseInt(req.query.offset as string) || 0;

      const { users, total } = await storage.getFollowers(userId, limit, offset);

      // Sanitize user data - remove sensitive fields
      const sanitizedUsers = users.map(u => ({
        id: u.id,
        username: u.username,
        displayName: u.displayName,
        profileImageUrl: u.profileImageUrl,
        followedAt: u.followedAt,
      }));

      res.json({ users: sanitizedUsers, total });
    } catch (error) {
      logger.error("Get followers error", error, { source: "social" });
      res.status(500).json({ message: "Failed to get followers" });
    }
  });

  // Get users that a user is following
  app.get("/api/users/:userId/following-list", optionalAuth, async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
      const offset = parseInt(req.query.offset as string) || 0;

      const { users, total } = await storage.getFollowing(userId, limit, offset);

      // Sanitize user data
      const sanitizedUsers = users.map(u => ({
        id: u.id,
        username: u.username,
        displayName: u.displayName,
        profileImageUrl: u.profileImageUrl,
        followedAt: u.followedAt,
      }));

      res.json({ users: sanitizedUsers, total });
    } catch (error) {
      logger.error("Get following error", error, { source: "social" });
      res.status(500).json({ message: "Failed to get following list" });
    }
  });

  // Get creator profile with follow stats
  app.get("/api/creators/:creatorId", optionalAuth, async (req: Request, res: Response) => {
    try {
      const { creatorId } = req.params;
      const viewerId = getUserId(req as AuthenticatedRequest) || null;

      const profile = await storage.getCreatorProfile(creatorId, viewerId);
      if (!profile) {
        return res.status(404).json({ message: "Creator not found" });
      }

      // Sanitize user data
      const { user, ...stats } = profile;
      res.json({
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        bio: user.bio,
        profileImageUrl: user.profileImageUrl,
        createdAt: user.createdAt,
        ...stats,
      });
    } catch (error) {
      logger.error("Get creator profile error", error, { source: "social" });
      res.status(500).json({ message: "Failed to get creator profile" });
    }
  });

  // Get public images by creator
  app.get("/api/creators/:creatorId/images", optionalAuth, async (req: Request, res: Response) => {
    try {
      const { creatorId } = req.params;
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
      const offset = parseInt(req.query.offset as string) || 0;

      // Get all user images and filter to public ones
      const { images } = await storage.getImagesByUserId(creatorId, 1000, 0);
      const publicImages = images.filter(img => img.isPublic);
      
      const paginatedImages = publicImages.slice(offset, offset + limit);

      res.json({ 
        images: paginatedImages, 
        total: publicImages.length 
      });
    } catch (error) {
      logger.error("Get creator images error", error, { source: "social" });
      res.status(500).json({ message: "Failed to get creator images" });
    }
  });

  // Discovery feed - public images with creator info
  app.get("/api/discover", optionalAuth, async (req: Request, res: Response) => {
    try {
      const viewerId = getUserId(req as AuthenticatedRequest) || null;
      const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
      const offset = parseInt(req.query.offset as string) || 0;

      const { images, total } = await storage.getDiscoveryFeed(viewerId, limit, offset);

      res.json({ images, total });
    } catch (error) {
      logger.error("Discovery feed error", error, { source: "social" });
      res.status(500).json({ message: "Failed to get discovery feed" });
    }
  });

  // Get current user's follow stats
  app.get("/api/me/follow-stats", requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req as AuthenticatedRequest);
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const [followerCount, followingCount] = await Promise.all([
        storage.getFollowerCount(userId),
        storage.getFollowingCount(userId),
      ]);

      res.json({ followerCount, followingCount });
    } catch (error) {
      logger.error("Get follow stats error", error, { source: "social" });
      res.status(500).json({ message: "Failed to get follow stats" });
    }
  });
}
