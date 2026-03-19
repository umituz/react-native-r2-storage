/**
 * R2 URL Builder Service
 * @description Utilities for building and parsing R2 URLs
 */

import type { R2URLOptions, R2ResourceType } from "../../domain/entities";
import { getR2BaseURL, getR2Paths } from "./r2Config.service";
import { VIDEO_EXTENSIONS, IMAGE_EXTENSIONS } from "../constants";

/**
 * Build a public R2 URL for a given key
 */
export function buildR2URL(keyOrOptions: string | R2URLOptions): string {
  const baseURL = getR2BaseURL();

  if (typeof keyOrOptions === "string") {
    return `${baseURL}/${keyOrOptions}`;
  }

  const { key, variant } = keyOrOptions;
  let finalKey = key;

  // Add variant prefix if specified (for image variants)
  if (variant) {
    const keyParts = key.split("/");
    const filename = keyParts.pop();
    const path = keyParts.join("/");
    finalKey = path ? `${path}/${variant}_${filename}` : `${variant}_${filename}`;
  }

  return `${baseURL}/${finalKey}`;
}

/**
 * Build a video URL
 */
export function buildVideoURL(videoKey: string): string {
  const paths = getR2Paths();
  return buildR2URL(`${paths.videos}/${videoKey}`);
}

/**
 * Build an image URL
 */
export function buildImageURL(imageKey: string): string {
  const paths = getR2Paths();
  return buildR2URL(`${paths.images}/${imageKey}`);
}

/**
 * Build an image source for React Native Image component
 * Returns { uri: string } format required by <Image source={...} />
 */
export function buildImageSource(imageKey: string): { uri: string } {
  return { uri: buildImageURL(imageKey) };
}

/**
 * Build a thumbnail URL
 */
export function buildThumbnailURL(thumbnailKey: string): string {
  const paths = getR2Paths();
  return buildR2URL(`${paths.thumbnails}/${thumbnailKey}`);
}

/**
 * Build an upload URL (for user uploads)
 */
export function buildUploadURL(uploadKey: string): string {
  const paths = getR2Paths();
  return buildR2URL(`${paths.uploads}/${uploadKey}`);
}

/**
 * Extract key from R2 URL
 */
export function extractR2Key(url: string): string | null {
  const baseURL = getR2BaseURL();

  if (!url.startsWith(baseURL)) {
    return null;
  }

  const key = url.slice(baseURL.length).replace(/^\//, "");
  return key || null;
}

/**
 * Get resource type from key
 */
export function getResourceTypeFromKey(key: string): R2ResourceType | null {
  const paths = getR2Paths();

  if (key.startsWith(`${paths.videos}/`)) {
    return "video";
  }

  if (key.startsWith(`${paths.images}/`)) {
    return "image";
  }

  if (key.startsWith(`${paths.thumbnails}/`)) {
    return "image";
  }

  // Try to determine from file extension
  const lowerKey = key.toLowerCase();
  if (VIDEO_EXTENSIONS.some((ext) => lowerKey.endsWith(ext))) {
    return "video";
  }

  if (IMAGE_EXTENSIONS.some((ext) => lowerKey.endsWith(ext))) {
    return "image";
  }

  return null;
}

/**
 * Check if URL is an R2 URL
 */
export function isR2URL(url: string): boolean {
  const baseURL = getR2BaseURL();
  return url.startsWith(baseURL);
}

/**
 * Convert R2 URL to CDN URL if custom domain is used
 * (No-op for now, but useful for future CDN integration)
 */
export function toCDNURL(url: string): string {
  // Currently R2 public URL is the CDN URL
  // In the future, this could convert to a custom CDN domain
  return url;
}
