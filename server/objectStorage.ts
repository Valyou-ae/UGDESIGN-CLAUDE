import { S3Client, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { logger } from './logger';

/**
 * Object Storage Service for Cloudflare R2
 * Compatible with AWS S3 API
 */

// Initialize S3 client for R2 (S3-compatible)
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'auto',
  endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || process.env.S3_BUCKET_NAME || 'ugli-images';
const PUBLIC_URL = process.env.R2_PUBLIC_URL || process.env.S3_PUBLIC_URL || `https://images.ugli.design`;

/**
 * Upload an image to R2 object storage
 * @param imageId - Unique identifier for the image
 * @param buffer - Image data as Buffer
 * @param mimeType - MIME type of the image (e.g., 'image/png')
 * @param isPublic - Whether the image should be publicly accessible
 * @returns Public URL of the uploaded image
 */
export async function uploadImage(
  imageId: number,
  buffer: Buffer,
  mimeType: string,
  isPublic: boolean = false
): Promise<string> {
  const extension = getExtension(mimeType);
  const key = isPublic 
    ? `public/${imageId}.${extension}`
    : `private/${imageId}.${extension}`;

  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
        CacheControl: 'public, max-age=31536000, immutable',
        // For public images, set ACL (if R2 supports it)
        ...(isPublic && { ACL: 'public-read' }),
      },
    });

    await upload.done();
    
    const url = `${PUBLIC_URL}/${key}`;
    
    logger.info('Image uploaded to object storage', {
      source: 'storage',
      imageId,
      key,
      size: buffer.length,
      isPublic,
    });
    
    return url;
  } catch (error) {
    logger.error('Failed to upload image to object storage', error as Error, {
      source: 'storage',
      imageId,
      key,
    });
    throw error;
  }
}

/**
 * Delete an image from R2 object storage
 * @param imageId - Unique identifier for the image
 * @param isPublic - Whether the image is in the public or private folder
 */
export async function deleteImage(imageId: number, isPublic: boolean = false): Promise<void> {
  // Try all common extensions since we don't know which one was used
  const extensions = ['png', 'jpg', 'jpeg', 'webp'];
  
  for (const ext of extensions) {
    const key = isPublic ? `public/${imageId}.${ext}` : `private/${imageId}.${ext}`;
    
    try {
      await s3Client.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }));
      
      logger.info('Image deleted from object storage', {
        source: 'storage',
        imageId,
        key,
      });
      
      // If successful, no need to try other extensions
      break;
    } catch (error: any) {
      // Ignore 404 errors (file doesn't exist)
      if (error.name !== 'NoSuchKey' && error.$metadata?.httpStatusCode !== 404) {
        logger.error('Failed to delete image from object storage', error as Error, {
          source: 'storage',
          imageId,
          key,
        });
      }
    }
  }
}

/**
 * Check if an image exists in R2 object storage
 * @param imageId - Unique identifier for the image
 * @param isPublic - Whether the image is in the public or private folder
 * @returns True if the image exists, false otherwise
 */
export async function imageExists(imageId: number, isPublic: boolean = false): Promise<boolean> {
  const extensions = ['png', 'jpg', 'jpeg', 'webp'];
  
  for (const ext of extensions) {
    const key = isPublic ? `public/${imageId}.${ext}` : `private/${imageId}.${ext}`;
    
    try {
      await s3Client.send(new HeadObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }));
      
      return true;
    } catch (error: any) {
      // Continue checking other extensions
      continue;
    }
  }
  
  return false;
}

/**
 * Get the file extension for a given MIME type
 * @param mimeType - MIME type of the image
 * @returns File extension (without the dot)
 */
function getExtension(mimeType: string): string {
  const map: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp',
    'image/gif': 'gif',
  };
  return map[mimeType] || 'png';
}

/**
 * Get object storage statistics
 * @returns Statistics about the object storage service
 */
export function getStorageStats() {
  return {
    provider: process.env.R2_BUCKET_NAME ? 'Cloudflare R2' : 'AWS S3',
    bucket: BUCKET_NAME,
    publicUrl: PUBLIC_URL,
    configured: !!(process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID),
  };
}

// ============================================================================
// PERSONA HEADSHOT CACHE (Persistent R2 Storage)
// ============================================================================

const HEADSHOT_CACHE_PREFIX = 'cache/headshots';
const HEADSHOT_CACHE_TTL_HOURS = 6;

/**
 * Save a persona headshot to R2 cache
 * @param cacheKey - Unique cache key for the persona
 * @param headshotBase64 - Base64 encoded headshot image
 */
export async function cacheHeadshotToR2(cacheKey: string, headshotBase64: string): Promise<void> {
  const safeKey = cacheKey.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 200);
  const key = `${HEADSHOT_CACHE_PREFIX}/${safeKey}.txt`;
  
  try {
    const metadata = JSON.stringify({
      createdAt: Date.now(),
      expiresAt: Date.now() + (HEADSHOT_CACHE_TTL_HOURS * 60 * 60 * 1000)
    });
    
    await s3Client.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: headshotBase64,
      ContentType: 'text/plain',
      Metadata: {
        'cache-metadata': metadata
      }
    }));
    
    logger.info('Headshot cached to R2', { source: 'storage', cacheKey: safeKey });
  } catch (error) {
    logger.warn('Failed to cache headshot to R2', { source: 'storage', error: (error as Error).message });
  }
}

/**
 * Retrieve a persona headshot from R2 cache
 * @param cacheKey - Unique cache key for the persona
 * @returns Base64 encoded headshot or null if not found/expired
 */
export async function getHeadshotFromR2(cacheKey: string): Promise<string | null> {
  const safeKey = cacheKey.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 200);
  const key = `${HEADSHOT_CACHE_PREFIX}/${safeKey}.txt`;
  
  try {
    const response = await s3Client.send(new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    }));
    
    if (!response.Body) return null;
    
    // Check expiration from metadata
    const metadataStr = response.Metadata?.['cache-metadata'];
    if (metadataStr) {
      try {
        const metadata = JSON.parse(metadataStr);
        if (metadata.expiresAt && Date.now() > metadata.expiresAt) {
          logger.info('Headshot cache expired', { source: 'storage', cacheKey: safeKey });
          return null;
        }
      } catch {
        // Ignore metadata parse errors
      }
    }
    
    const bodyContents = await response.Body.transformToString();
    logger.info('Headshot retrieved from R2 cache', { source: 'storage', cacheKey: safeKey });
    return bodyContents;
  } catch (error: any) {
    if (error.name !== 'NoSuchKey' && error.$metadata?.httpStatusCode !== 404) {
      logger.warn('Failed to get headshot from R2', { source: 'storage', error: (error as Error).message });
    }
    return null;
  }
}

/**
 * Check if R2 storage is configured and available
 */
export function isR2Configured(): boolean {
  return !!(process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID) && 
         !!(process.env.R2_BUCKET_NAME || process.env.S3_BUCKET_NAME);
}
