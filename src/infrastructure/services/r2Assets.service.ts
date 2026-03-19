/**
 * R2 Assets Service
 * @description Manage asset catalogs and provide asset selection utilities
 */

import { getAssetCatalog } from "./r2Config.service";

/**
 * Get a random video key from the catalog
 */
export function getRandomVideoKey(): string | null {
  const catalog = getAssetCatalog();
  if (catalog.length === 0) {
    return null;
  }
  const index = Math.floor(Math.random() * catalog.length);
  return catalog[index];
}

/**
 * Get multiple random video keys
 */
export function getRandomVideoKeys(count: number): string[] {
  const catalog = getAssetCatalog();
  if (catalog.length === 0) {
    return [];
  }
  const shuffled = [...catalog].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, catalog.length));
}

/**
 * Get video key by index
 */
export function getVideoKeyByIndex(index: number): string | null {
  const catalog = getAssetCatalog();
  return catalog[index] ?? null;
}

/**
 * Get total video count
 */
export function getVideoCount(): number {
  return getAssetCatalog().length;
}

/**
 * Check if video key exists in catalog
 */
export function hasVideoKey(key: string): boolean {
  const catalog = getAssetCatalog();
  return catalog.some((videoKey) => videoKey === key);
}

/**
 * Get all video keys
 */
export function getAllVideoKeys(): readonly string[] {
  return getAssetCatalog();
}
