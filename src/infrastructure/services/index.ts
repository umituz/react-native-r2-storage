/**
 * Infrastructure Services Barrel Export
 */

// Config Service
export {
  r2ConfigService,
  getR2Config,
  getR2Paths,
  getR2PublicDomain,
  getR2BaseURL,
  getR2Endpoint,
  getAssetCatalog,
  validateR2Config,
  isR2Configured,
} from "./r2Config.service";

// URL Builder Service
export {
  buildR2URL,
  buildVideoURL,
  buildImageURL,
  buildImageSource,
  buildThumbnailURL,
  buildUploadURL,
  extractR2Key,
  getResourceTypeFromKey,
  isR2URL,
  toCDNURL,
} from "./r2UrlBuilder.service";

// Assets Service
export {
  getRandomVideoKey,
  getRandomVideoKeys,
  getVideoKeyByIndex,
  getVideoCount,
  hasVideoKey,
  getAllVideoKeys,
} from "./r2Assets.service";
