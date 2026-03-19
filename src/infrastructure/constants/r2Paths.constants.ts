/**
 * R2 Default Paths Constants
 * @description Default path structure for R2 storage
 */

import type { R2PathStructure } from "../../domain/entities";

/**
 * Default R2 path structure
 */
export const DEFAULT_R2_PATHS: R2PathStructure = {
  videos: "videos",
  images: "images",
  thumbnails: "thumbnails",
  uploads: "uploads",
} as const;

/**
 * Video file extensions
 */
export const VIDEO_EXTENSIONS = [".mp4", ".mov", ".webm", ".avi"] as const;

/**
 * Image file extensions
 */
export const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"] as const;
