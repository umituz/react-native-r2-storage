/**
 * R2 Initialization Module
 * @description Initialize R2 storage with configuration
 *
 * @example
 * ```ts
 * import { initR2 } from '@umituz/react-native-r2-storage/init';
 *
 * initR2({
 *   config: {
 *     accountId: 'your-account-id',
 *     bucketName: 'your-bucket',
 *     publicDomain: 'your-domain.r2.dev',
 *   },
 *   assetCatalog: {
 *     videos: ['video1.mp4', 'video2.mp4'],
 *   },
 * });
 * ```
 */

import type { R2InitOptions, R2Config, R2AssetCatalog } from "../domain/entities";
import { r2ConfigService } from "../infrastructure/services/r2Config.service";

/**
 * Initialize R2 storage with configuration
 *
 * @param options - Initialization options including config and optional asset catalog
 *
 * @example
 * ```ts
 * // Minimal configuration
 * initR2({
 *   config: {
 *     accountId: 'your-account-id',
 *     bucketName: 'your-bucket',
 *     publicDomain: 'your-domain.r2.dev',
 *   },
 * });
 *
 * // With asset catalog
 * initR2({
 *   config: {
 *     accountId: 'your-account-id',
 *     bucketName: 'your-bucket',
 *     publicDomain: 'your-domain.r2.dev',
 *   },
 *   assetCatalog: {
 *     videos: ['video1.mp4', 'video2.mp4'],
 *     images: ['image1.jpg', 'image2.jpg'],
 *   },
 * });
 * ```
 */
export function initR2(options: R2InitOptions): void {
  const { config, assetCatalog } = options;

  // Flatten asset catalog to array
  const catalog = assetCatalog
    ? [...(assetCatalog.videos ?? []), ...(assetCatalog.images ?? [])]
    : undefined;

  r2ConfigService.initialize(config, catalog);
}

/**
 * Initialize R2 from environment variables
 * Automatically reads from EXPO_PUBLIC_R2_* or R2_* env vars
 *
 * @example
 * ```ts
 * import { initR2FromEnv } from '@umituz/react-native-r2-storage/init';
 *
 * initR2FromEnv();
 * ```
 */
export function initR2FromEnv(): void {
  r2ConfigService.initialize(r2ConfigService.getConfigFromEnv());
}

/**
 * Reset R2 configuration
 * Useful for testing or re-initialization
 *
 * @example
 * ```ts
 * import { resetR2 } from '@umituz/react-native-r2-storage/init';
 *
 * resetR2();
 * ```
 */
export function resetR2(): void {
  r2ConfigService.reset();
}
