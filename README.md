# @umituz/react-native-r2-storage

Cloudflare R2 storage integration for React Native apps with URL building, asset management, and configurable storage paths.

## Features

- 🔧 **Flexible Configuration** - Configure R2 via code or environment variables
- 📦 **Asset Management** - Built-in asset catalog for videos and images
- 🔗 **URL Building** - Utilities for building public URLs, video URLs, image URLs
- 🎯 **Type Safe** - Full TypeScript support with comprehensive types
- 🚀 **Zero Dependencies** - Only peer dependencies on React and React Native
- 📁 **Configurable Paths** - Customize storage path structure

## Installation

```bash
npm install @umituz/react-native-r2-storage
```

## Quick Start

### 1. Initialize R2

```typescript
import { initR2 } from '@umituz/react-native-r2-storage/init';
import type { R2Config } from '@umituz/react-native-r2-storage/domain';

const config: R2Config = {
  accountId: 'your-account-id',
  bucketName: 'your-bucket-name',
  publicDomain: 'your-domain.r2.dev',
};

initR2({
  config,
  assetCatalog: {
    videos: ['video1.mp4', 'video2.mp4'],
    images: ['image1.jpg', 'image2.jpg'],
  },
});
```

### 2. Use URL Builders

```typescript
import { buildVideoURL, buildImageURL, buildImageSource } from '@umituz/react-native-r2-storage/infrastructure';

// Build URLs
const videoUrl = buildVideoURL('video-key.mp4');
const imageUrl = buildImageURL('image-key.jpg');

// For React Native Image component
const imageSource = buildImageSource('image-key.jpg');

// Use in Image component
<Image source={imageSource} style={styles.image} />
```

### 3. Access Asset Catalog

```typescript
import {
  getRandomVideoKey,
  getVideoCount,
  getAllVideoKeys
} from '@umituz/react-native-r2-storage/infrastructure';

const randomKey = getRandomVideoKey();
const totalVideos = getVideoCount();
const allKeys = getAllVideoKeys();
```

## Environment Variables

You can also configure R2 via environment variables:

```bash
EXPO_PUBLIC_R2_ACCOUNT_ID=your-account-id
EXPO_PUBLIC_R2_BUCKET_NAME=your-bucket-name
EXPO_PUBLIC_R2_PUBLIC_DOMAIN=your-domain.r2.dev
EXPO_PUBLIC_R2_ACCESS_KEY_ID=your-access-key
EXPO_PUBLIC_R2_SECRET_ACCESS_KEY=your-secret-key
```

Then initialize with:

```typescript
import { initR2FromEnv } from '@umituz/react-native-r2-storage/init';

initR2FromEnv();
```

## API Reference

### Initialization (`@umituz/react-native-r2-storage/init`)

#### `initR2(options: R2InitOptions): void`

Initialize R2 with configuration.

#### `initR2FromEnv(): void`

Initialize R2 from environment variables.

#### `resetR2(): void`

Reset R2 configuration (useful for testing).

### URL Building (`@umituz/react-native-r2-storage/infrastructure`)

#### `buildR2URL(keyOrOptions: string | R2URLOptions): string`

Build a public R2 URL for a given key.

#### `buildVideoURL(videoKey: string): string`

Build a video URL.

#### `buildImageURL(imageKey: string): string`

Build an image URL.

#### `buildImageSource(imageKey: string): { uri: string }`

Build an image source for React Native Image component.

#### `buildThumbnailURL(thumbnailKey: string): string`

Build a thumbnail URL.

#### `buildUploadURL(uploadKey: string): string`

Build an upload URL for user uploads.

### Utilities (`@umituz/react-native-r2-storage/infrastructure`)

#### `extractR2Key(url: string): string | null`

Extract key from R2 URL.

#### `getResourceTypeFromKey(key: string): R2ResourceType | null`

Get resource type from key.

#### `isR2URL(url: string): boolean`

Check if URL is an R2 URL.

### Asset Management (`@umituz/react-native-r2-storage/infrastructure`)

#### `getRandomVideoKey(): string | null`

Get a random video key from catalog.

#### `getRandomVideoKeys(count: number): string[]`

Get multiple random video keys.

#### `getVideoKeyByIndex(index: number): string | null`

Get video key by index.

#### `getVideoCount(): number`

Get total video count.

#### `hasVideoKey(key: string): boolean`

Check if video key exists in catalog.

#### `getAllVideoKeys(): readonly string[]`

Get all video keys.

## Configuration

### Path Structure

You can customize the path structure:

```typescript
import { initR2 } from '@umituz/react-native-r2-storage/init';

initR2({
  config: {
    accountId: 'your-account-id',
    bucketName: 'your-bucket-name',
    publicDomain: 'your-domain.r2.dev',
    pathStructure: {
      videos: 'custom-videos',
      images: 'custom-images',
      thumbnails: 'custom-thumbnails',
      uploads: 'custom-uploads',
    },
  },
});
```

## Types

### `R2Config`

```typescript
interface R2Config {
  readonly accountId: string;
  readonly accessKeyId?: string;
  readonly secretAccessKey?: string;
  readonly bucketName: string;
  readonly publicDomain: string;
  readonly pathStructure?: R2PathStructure;
}
```

### `R2Asset`

```typescript
interface R2Asset {
  readonly key: string;
  readonly url: string;
  readonly type: R2ResourceType;
  readonly size?: number;
  readonly lastModified?: Date;
}
```

### `R2ResourceType`

```typescript
type R2ResourceType = "video" | "image";
```

## License

MIT

## Author

umituz
