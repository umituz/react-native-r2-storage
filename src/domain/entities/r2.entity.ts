/**
 * R2 Entity
 * @description Core types for Cloudflare R2 storage integration
 */

/**
 * R2 resource type
 */
export type R2ResourceType = "video" | "image";

/**
 * R2 asset metadata
 */
export interface R2Asset {
  readonly key: string;
  readonly url: string;
  readonly type: R2ResourceType;
  readonly size?: number;
  readonly lastModified?: Date;
}

/**
 * R2 video asset with metadata
 */
export interface R2VideoAsset extends R2Asset {
  readonly type: "video";
  readonly duration?: number;
  readonly thumbnail?: string;
}

/**
 * R2 image asset with metadata
 */
export interface R2ImageAsset extends R2Asset {
  readonly type: "image";
  readonly width?: number;
  readonly height?: number;
}

/**
 * R2 configuration interface
 */
export interface R2Config {
  readonly accountId: string;
  readonly accessKeyId?: string;
  readonly secretAccessKey?: string;
  readonly bucketName: string;
  readonly publicDomain: string;
  readonly pathStructure?: R2PathStructure;
}

/**
 * R2 path structure configuration
 */
export interface R2PathStructure {
  readonly videos: string;
  readonly images: string;
  readonly thumbnails: string;
  readonly uploads: string;
}

/**
 * R2 URL builder options
 */
export interface R2URLOptions {
  readonly key: string;
  readonly type?: R2ResourceType;
  readonly variant?: string;
}

/**
 * R2 initialization options
 */
export interface R2InitOptions {
  readonly config: R2Config;
  readonly assetCatalog?: R2AssetCatalog;
}

/**
 * R2 asset catalog for managing asset collections
 */
export interface R2AssetCatalog {
  readonly videos?: readonly string[];
  readonly images?: readonly string[];
}
