/**
 * R2 Config Service
 * @description Manages R2 configuration with runtime and environment-based initialization
 */

import type { R2Config, R2PathStructure } from "../../domain/entities";
import { DEFAULT_R2_PATHS } from "../constants";

/**
 * R2 Config Service
 * Singleton service for managing R2 configuration
 */
class R2ConfigService {
  private config: R2Config | null = null;
  private assetCatalog: string[] = [];

  /**
   * Initialize R2 with configuration
   */
  initialize(config: R2Config, assetCatalog?: string[]): void {
    this.config = {
      ...config,
      pathStructure: config.pathStructure ?? DEFAULT_R2_PATHS,
    };
    if (assetCatalog) {
      this.assetCatalog = [...assetCatalog];
    }
  }

  /**
   * Check if R2 is initialized
   */
  isInitialized(): boolean {
    return this.config !== null;
  }

  /**
   * Get R2 configuration
   * Falls back to environment variables if not explicitly initialized
   */
  getConfig(): R2Config {
    if (this.config) {
      return this.config;
    }

    // Fall back to environment variables (for React Native/Expo)
    return this.getConfigFromEnv();
  }

  /**
   * Get configuration from environment variables
   * Public method for external use (e.g., initR2FromEnv)
   */
  getConfigFromEnv(): R2Config {
    const accountId =
      process.env.EXPO_PUBLIC_R2_ACCOUNT_ID ||
      process.env.R2_ACCOUNT_ID ||
      "";

    const accessKeyId =
      process.env.EXPO_PUBLIC_R2_ACCESS_KEY_ID ||
      process.env.R2_ACCESS_KEY_ID ||
      "";

    const secretAccessKey =
      process.env.EXPO_PUBLIC_R2_SECRET_ACCESS_KEY ||
      process.env.R2_SECRET_ACCESS_KEY ||
      "";

    const bucketName =
      process.env.EXPO_PUBLIC_R2_BUCKET_NAME ||
      process.env.R2_BUCKET_NAME ||
      "";

    const publicDomain =
      process.env.EXPO_PUBLIC_R2_PUBLIC_DOMAIN ||
      process.env.R2_PUBLIC_DOMAIN ||
      "";

    return {
      accountId,
      accessKeyId,
      secretAccessKey,
      bucketName,
      publicDomain,
      pathStructure: DEFAULT_R2_PATHS,
    };
  }

  /**
   * Get R2 path structure
   */
  getPaths(): R2PathStructure {
    return this.getConfig().pathStructure ?? DEFAULT_R2_PATHS;
  }

  /**
   * Get R2 public domain
   */
  getPublicDomain(): string {
    return this.getConfig().publicDomain;
  }

  /**
   * Get R2 base URL
   */
  getBaseURL(): string {
    const config = this.getConfig();
    return `https://${config.publicDomain}`;
  }

  /**
   * Get R2 endpoint URL (for S3-compatible API calls)
   */
  getEndpoint(): string {
    const config = this.getConfig();
    return `https://${config.accountId}.r2.cloudflarestorage.com`;
  }

  /**
   * Get asset catalog
   */
  getAssetCatalog(): readonly string[] {
    return this.assetCatalog;
  }

  /**
   * Validate R2 configuration
   */
  validate(): void {
    const config = this.getConfig();

    if (!config.accountId) {
      throw new Error("R2_ACCOUNT_ID is not configured");
    }

    if (!config.bucketName) {
      throw new Error("R2_BUCKET_NAME is not configured");
    }

    if (!config.publicDomain) {
      throw new Error("R2_PUBLIC_DOMAIN is not configured");
    }
  }

  /**
   * Check if R2 is properly configured
   */
  isConfigured(): boolean {
    try {
      this.validate();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Reset configuration (useful for testing)
   */
  reset(): void {
    this.config = null;
    this.assetCatalog = [];
  }
}

/**
 * Singleton instance
 */
export const r2ConfigService = new R2ConfigService();

/**
 * Convenience functions
 */
export const getR2Config = () => r2ConfigService.getConfig();
export const getR2Paths = () => r2ConfigService.getPaths();
export const getR2PublicDomain = () => r2ConfigService.getPublicDomain();
export const getR2BaseURL = () => r2ConfigService.getBaseURL();
export const getR2Endpoint = () => r2ConfigService.getEndpoint();
export const getAssetCatalog = () => r2ConfigService.getAssetCatalog();
export const validateR2Config = () => r2ConfigService.validate();
export const isR2Configured = () => r2ConfigService.isConfigured();
