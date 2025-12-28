export interface ValidationResult {
  valid: boolean;
  error?: string;
  warnings?: string[];
}

export interface ImageValidationConfig {
  maxSizeBytes: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  allowedTypes: string[];
  compressionThresholdBytes: number;
  compressionQuality: number;
}

const DEFAULT_CONFIG: ImageValidationConfig = {
  maxSizeBytes: 10 * 1024 * 1024, // 10MB
  minWidth: 300,
  maxWidth: 4096,
  minHeight: 300,
  maxHeight: 4096,
  allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
  compressionThresholdBytes: 2 * 1024 * 1024, // 2MB
  compressionQuality: 0.85
};

export class ImageValidator {
  private config: ImageValidationConfig;

  constructor(config: Partial<ImageValidationConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async validateFile(file: File): Promise<ValidationResult> {
    const warnings: string[] = [];

    if (!this.config.allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file type. Please upload PNG, JPEG, or WebP images.`
      };
    }

    if (file.size > this.config.maxSizeBytes) {
      return {
        valid: false,
        error: `File too large. Maximum size is ${Math.round(this.config.maxSizeBytes / (1024 * 1024))}MB.`
      };
    }

    try {
      const dimensions = await this.getImageDimensions(file);

      if (dimensions.width < this.config.minWidth || dimensions.height < this.config.minHeight) {
        return {
          valid: false,
          error: `Image too small. Minimum size is ${this.config.minWidth}x${this.config.minHeight} pixels.`
        };
      }

      if (dimensions.width > this.config.maxWidth || dimensions.height > this.config.maxHeight) {
        return {
          valid: false,
          error: `Image too large. Maximum size is ${this.config.maxWidth}x${this.config.maxHeight} pixels.`
        };
      }

      if (file.size > this.config.compressionThresholdBytes) {
        warnings.push('Large file detected. Image will be optimized for faster processing.');
      }

      return { valid: true, warnings: warnings.length > 0 ? warnings : undefined };
    } catch {
      return {
        valid: false,
        error: 'Failed to process image. Please try a different file.'
      };
    }
  }

  private getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };

      img.src = url;
    });
  }

  async compressIfNeeded(file: File): Promise<File> {
    if (file.size <= this.config.compressionThresholdBytes) {
      return file;
    }

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return file;

      const img = await this.loadImage(file);
      
      let { width, height } = img;
      const maxDimension = 2048;
      
      if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.\w+$/, '.jpg'), {
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          this.config.compressionQuality
        );
      });
    } catch {
      return file;
    }
  }

  private loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };

      img.src = url;
    });
  }

  async processFile(file: File): Promise<{ file: File; dataUrl: string } | { error: string }> {
    const validation = await this.validateFile(file);
    
    if (!validation.valid) {
      return { error: validation.error || 'Invalid file' };
    }

    const processedFile = await this.compressIfNeeded(file);
    const dataUrl = await this.fileToDataUrl(processedFile);

    return { file: processedFile, dataUrl };
  }

  private fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
}

export const imageValidator = new ImageValidator();
