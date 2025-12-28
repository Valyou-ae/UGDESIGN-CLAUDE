/**
 * PLATFORM OPTIMIZATION KNOWLEDGE BASE
 * AI platform-specific configurations and optimizations
 * Version: 1.0
 */

export const GEMINI_CONFIG = {
  name: 'Google Gemini',
  model: 'gemini-pro-vision',
  strengths: ['photorealism', 'product accuracy', 'lighting', 'human subjects'],
  weaknesses: ['very abstract concepts', 'text in images'],
  
  promptStructure: {
    order: ['camera/technical', 'lighting', 'subject', 'style', 'quality'],
    frontLoad: true,
    maxLength: 1500
  },
  
  keywords: {
    quality: ['photorealistic', '8K resolution', 'ultra-detailed', 'professional photography'],
    camera: ['shot on Sony A7R V', '85mm f/1.4 lens', 'tack-sharp focus'],
    lighting: ['professional studio lighting', 'soft natural light'],
    style: ['commercial quality', 'editorial finish', 'magazine quality']
  }
};

export const GEMINI_PARAMETERS = {
  photorealisticMockup: {
    temperature: 0.4,
    topK: 32,
    topP: 0.8
  },
  creativeLifestyle: {
    temperature: 0.7,
    topK: 40,
    topP: 0.9
  },
  consistentProduct: {
    temperature: 0.3,
    topK: 20,
    topP: 0.7
  }
};

export const MIDJOURNEY_CONFIG = {
  name: 'Midjourney',
  strengths: ['artistic', 'creative', 'stylized', 'atmosphere'],
  weaknesses: ['exact product accuracy', 'specific text'],
  
  parameters: {
    version: '--v 6',
    quality: '--q 2',
    stylize: '--s 100',
    aspectRatios: { portrait: '--ar 3:4', landscape: '--ar 4:3', square: '--ar 1:1' }
  },
  
  promptStyle: 'descriptive, artistic, mood-focused'
};

export const STABLE_DIFFUSION_CONFIG = {
  name: 'Stable Diffusion',
  strengths: ['customization', 'control', 'LoRA support', 'inpainting'],
  weaknesses: ['requires fine-tuning for best results'],
  
  parameters: {
    steps: 30,
    cfgScale: 7,
    sampler: 'DPM++ 2M Karras'
  },
  
  promptStyle: 'tag-based, weighted tokens'
};

export const DALLE_CONFIG = {
  name: 'DALL-E 3',
  strengths: ['instruction following', 'text in images', 'creative'],
  weaknesses: ['less control over style'],
  
  parameters: {
    size: '1024x1024',
    quality: 'hd',
    style: 'natural'
  },
  
  promptStyle: 'natural language, descriptive'
};

export function getPlatformConfig(platform: 'gemini' | 'midjourney' | 'stable-diffusion' | 'dalle') {
  switch (platform) {
    case 'gemini': return GEMINI_CONFIG;
    case 'midjourney': return MIDJOURNEY_CONFIG;
    case 'stable-diffusion': return STABLE_DIFFUSION_CONFIG;
    case 'dalle': return DALLE_CONFIG;
  }
}

export function optimizePromptForPlatform(prompt: string, platform: 'gemini' | 'midjourney'): string {
  if (platform === 'gemini') {
    return `${GEMINI_CONFIG.keywords.camera[0]}, ${prompt}, ${GEMINI_CONFIG.keywords.quality.join(', ')}`;
  }
  if (platform === 'midjourney') {
    return `${prompt} ${MIDJOURNEY_CONFIG.parameters.version} ${MIDJOURNEY_CONFIG.parameters.quality}`;
  }
  return prompt;
}
