/**
 * LIGHTING SETUPS KNOWLEDGE BASE
 * Professional lighting configurations for AI-generated product mockups
 * Version: 1.0
 */

import { LightingSetup } from './types';

export const LIGHTING_SETUPS: LightingSetup[] = [
  // STUDIO LIGHTING
  { id: 'three-point', name: 'Three-Point Lighting', category: 'studio',
    description: 'Classic professional setup with key, fill, and rim lights',
    promptPhrase: 'professional three-point lighting, key light from 45 degrees, soft fill light, rim light for separation, studio quality',
    bestFor: ['product photography', 'professional portraits', 'commercial'] },
  { id: 'clamshell', name: 'Clamshell Beauty', category: 'studio',
    description: 'Beauty lighting with top and bottom softboxes',
    promptPhrase: 'clamshell beauty lighting, soft even illumination, catchlights in eyes, minimal shadows, glamour photography',
    bestFor: ['beauty', 'fashion', 'close-ups'] },
  { id: 'rembrandt', name: 'Rembrandt Lighting', category: 'studio',
    description: 'Dramatic with triangle of light on cheek',
    promptPhrase: 'Rembrandt lighting, 45-degree key light, triangle shadow on cheek, dramatic portrait lighting',
    bestFor: ['dramatic portraits', 'artistic', 'editorial'] },
  { id: 'butterfly', name: 'Butterfly/Paramount', category: 'studio',
    description: 'Frontal lighting creating butterfly shadow under nose',
    promptPhrase: 'butterfly lighting, frontal key light from above, symmetrical illumination, Hollywood glamour',
    bestFor: ['beauty', 'fashion', 'glamour'] },
  { id: 'split', name: 'Split Lighting', category: 'studio',
    description: 'Half face lit, half in shadow',
    promptPhrase: 'split lighting, 90-degree side key, half-lit face, high contrast dramatic',
    bestFor: ['dramatic', 'moody', 'artistic'] },
  { id: 'high-key', name: 'High Key', category: 'studio',
    description: 'Bright even lighting with minimal shadows',
    promptPhrase: 'high-key lighting, bright even illumination, white background, minimal shadows, clean commercial',
    bestFor: ['e-commerce', 'product shots', 'clean aesthetic'] },
  
  // NATURAL LIGHTING
  { id: 'golden-hour', name: 'Golden Hour', category: 'natural',
    description: 'Warm sunset/sunrise light',
    promptPhrase: 'golden hour lighting, warm orange glow, long soft shadows, magical atmosphere, natural warmth',
    bestFor: ['lifestyle', 'outdoor', 'romantic'] },
  { id: 'blue-hour', name: 'Blue Hour', category: 'natural',
    description: 'Cool twilight ambient light',
    promptPhrase: 'blue hour lighting, cool twilight tones, soft ambient glow, moody atmosphere',
    bestFor: ['moody', 'artistic', 'editorial'] },
  { id: 'overcast', name: 'Overcast Soft', category: 'natural',
    description: 'Diffused cloudy day light',
    promptPhrase: 'overcast natural lighting, soft diffused daylight, even illumination, no harsh shadows',
    bestFor: ['portraits', 'products', 'versatile'] },
  { id: 'window', name: 'Window Light', category: 'natural',
    description: 'Soft directional light from window',
    promptPhrase: 'soft window lighting, natural directional light, gentle gradient shadows, indoor natural',
    bestFor: ['indoor lifestyle', 'portraits', 'products'] },
  { id: 'direct-sun', name: 'Direct Sunlight', category: 'natural',
    description: 'Bright harsh sunlight',
    promptPhrase: 'direct sunlight, high contrast, defined shadows, vibrant colors, outdoor bright',
    bestFor: ['summer', 'bold', 'energetic'] },
  { id: 'backlit', name: 'Backlit/Rim', category: 'natural',
    description: 'Subject lit from behind',
    promptPhrase: 'backlit natural light, sun behind subject, glowing rim light, ethereal atmosphere',
    bestFor: ['artistic', 'dreamy', 'silhouette'] },
  
  // LIFESTYLE LIGHTING
  { id: 'cafe', name: 'Cafe Ambient', category: 'lifestyle',
    description: 'Warm cozy indoor ambient',
    promptPhrase: 'warm cafe ambient lighting, cozy atmosphere, soft tungsten warmth, lifestyle indoor',
    bestFor: ['lifestyle', 'casual', 'warm'] },
  { id: 'urban', name: 'Urban Street', category: 'lifestyle',
    description: 'City environment mixed lighting',
    promptPhrase: 'urban street lighting, mixed city lights, contemporary atmosphere, street style',
    bestFor: ['streetwear', 'urban', 'contemporary'] },
  { id: 'gym', name: 'Gym/Sports', category: 'lifestyle',
    description: 'Bright athletic facility lighting',
    promptPhrase: 'bright gym lighting, energetic atmosphere, athletic facility, sports environment',
    bestFor: ['athletic wear', 'fitness', 'sports'] },
  { id: 'outdoor-park', name: 'Park/Nature', category: 'lifestyle',
    description: 'Natural outdoor environment',
    promptPhrase: 'natural park lighting, dappled sunlight through trees, outdoor leisure, nature setting',
    bestFor: ['outdoor', 'casual', 'lifestyle'] },
  
  // DRAMATIC LIGHTING
  { id: 'low-key', name: 'Low Key', category: 'dramatic',
    description: 'Dark moody with minimal light',
    promptPhrase: 'low-key dramatic lighting, dark shadows, minimal illumination, moody atmosphere',
    bestFor: ['dramatic', 'moody', 'artistic'] },
  { id: 'neon', name: 'Neon/Colored', category: 'dramatic',
    description: 'Colored gel lighting',
    promptPhrase: 'neon colored lighting, vibrant gel lights, cyberpunk atmosphere, bold colors',
    bestFor: ['creative', 'nightlife', 'bold'] },
  { id: 'spotlight', name: 'Spotlight', category: 'dramatic',
    description: 'Single focused light source',
    promptPhrase: 'single spotlight, focused illumination, dark surroundings, theatrical dramatic',
    bestFor: ['theatrical', 'product focus', 'dramatic'] },
  { id: 'silhouette', name: 'Silhouette', category: 'dramatic',
    description: 'Subject as dark shape against light background',
    promptPhrase: 'silhouette lighting, backlit subject, dark figure against bright background, dramatic shape',
    bestFor: ['artistic', 'mysterious', 'shape-focused'] }
];

export function getLightingSetup(id: string): LightingSetup | undefined {
  return LIGHTING_SETUPS.find(l => l.id === id);
}

export function getLightingByCategory(category: LightingSetup['category']): LightingSetup[] {
  return LIGHTING_SETUPS.filter(l => l.category === category);
}

export function buildLightingPrompt(id: string): string {
  const setup = getLightingSetup(id);
  return setup ? setup.promptPhrase : '';
}

export function getRecommendedLighting(productType: string, style: string): LightingSetup {
  if (style === 'commercial' || style === 'ecommerce') return LIGHTING_SETUPS.find(l => l.id === 'three-point')!;
  if (style === 'lifestyle') return LIGHTING_SETUPS.find(l => l.id === 'golden-hour')!;
  if (style === 'dramatic') return LIGHTING_SETUPS.find(l => l.id === 'low-key')!;
  return LIGHTING_SETUPS[0];
}
