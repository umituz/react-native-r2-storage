/**
 * @umituz/react-native-r2-storage
 * Cloudflare R2 storage integration for React Native
 *
 * IMPORTANT: Apps should NOT use this root barrel import.
 * Use subpath imports instead:
 * - '@umituz/react-native-r2-storage/domain' - Types and entities
 * - '@umituz/react-native-r2-storage/infrastructure' - Services and utilities
 * - '@umituz/react-native-r2-storage/init' - Initialization functions
 *
 * @example
 * ```ts
 * // ✅ GOOD: Use subpath imports
 * import { buildVideoURL, initR2 } from '@umituz/react-native-r2-storage/infrastructure';
 * import type { R2Config } from '@umituz/react-native-r2-storage/domain';
 *
 * // ❌ BAD: Don't use root barrel
 * import { buildVideoURL } from '@umituz/react-native-r2-storage';
 * ```
 */

// Re-export for backward compatibility (not recommended for new code)
export * from "./domain";
export * from "./infrastructure";
export * from "./init";
