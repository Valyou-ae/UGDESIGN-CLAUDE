/**
 * PRODUCT ANGLE DETAILS KNOWLEDGE BASE
 * Camera angles and compositions for product mockups
 * Version: 1.0
 */

import { CameraAngle } from './types';

export const CAMERA_ANGLES: CameraAngle[] = [
  // STANDARD PRODUCT ANGLES
  { id: 'front', name: 'Front View', description: 'Direct frontal shot',
    promptPhrase: 'front view, straight-on angle, centered subject, direct frontal perspective',
    bestFor: ['hero shots', 'e-commerce', 'product display'] },
  { id: 'three-quarter', name: 'Three-Quarter View', description: '45-degree angle showing dimension',
    promptPhrase: 'three-quarter view, 45-degree angle, dimensional perspective, showing depth',
    bestFor: ['product showcase', 'adding dimension', 'versatile'] },
  { id: 'side', name: 'Side Profile', description: '90-degree side view',
    promptPhrase: 'side profile view, 90-degree angle, profile perspective, clean side shot',
    bestFor: ['fit display', 'silhouette', 'construction details'] },
  { id: 'back', name: 'Back View', description: 'Rear perspective',
    promptPhrase: 'back view, rear perspective, showing back design, reverse angle',
    bestFor: ['back prints', 'construction', 'complete view'] },
  { id: 'low-angle', name: 'Low Angle (Worms Eye)', description: 'Camera looking up',
    promptPhrase: 'low angle shot, camera looking up, powerful perspective, dynamic view',
    bestFor: ['power shots', 'dramatic', 'heroic'] },
  { id: 'high-angle', name: 'High Angle (Birds Eye)', description: 'Camera looking down',
    promptPhrase: 'high angle shot, camera looking down, approachable perspective, overview',
    bestFor: ['flat lay', 'approachable', 'casual'] },
  { id: 'over-shoulder', name: 'Over the Shoulder', description: 'POV from behind subject',
    promptPhrase: 'over the shoulder view, POV perspective, environmental context',
    bestFor: ['lifestyle', 'context', 'storytelling'] },
  
  // DETAIL ANGLES
  { id: 'close-up', name: 'Close-Up Detail', description: 'Tight crop on details',
    promptPhrase: 'close-up detail shot, macro perspective, tight crop, showing texture and details',
    bestFor: ['fabric detail', 'print quality', 'texture'] },
  { id: 'collar-detail', name: 'Collar/Neckline', description: 'Focus on collar area',
    promptPhrase: 'collar detail shot, neckline focus, construction details, tag area',
    bestFor: ['apparel details', 'branding', 'construction'] },
  { id: 'sleeve-detail', name: 'Sleeve/Arm Detail', description: 'Focus on arm area',
    promptPhrase: 'sleeve detail shot, arm area focus, cuff details, arm construction',
    bestFor: ['sleeve design', 'AOP patterns', 'fit'] },
  
  // LIFESTYLE ANGLES
  { id: 'action', name: 'Action/Movement', description: 'Dynamic motion shot',
    promptPhrase: 'action shot, dynamic movement, caught in motion, energetic perspective',
    bestFor: ['athletic wear', 'dynamic', 'lifestyle'] },
  { id: 'candid', name: 'Candid/Natural', description: 'Unposed natural moment',
    promptPhrase: 'candid natural shot, unposed moment, authentic lifestyle, documentary style',
    bestFor: ['lifestyle', 'authentic', 'relatable'] },
  { id: 'environmental', name: 'Environmental Portrait', description: 'Subject in context',
    promptPhrase: 'environmental portrait, subject in setting, contextual background, lifestyle scene',
    bestFor: ['storytelling', 'context', 'brand narrative'] },
  
  // PRODUCT-SPECIFIC
  { id: 'flat-lay', name: 'Flat Lay', description: 'Product laid flat, shot from above',
    promptPhrase: 'flat lay product shot, laid flat, directly overhead, clean arrangement',
    bestFor: ['e-commerce', 'no model', 'clean display'] },
  { id: 'hanger', name: 'On Hanger', description: 'Product displayed on hanger',
    promptPhrase: 'product on hanger, hanging display, retail presentation, clean background',
    bestFor: ['retail', 'e-commerce', 'no model'] }
];

export const CAMERA_DISTANCES = {
  'extreme-close-up': 'macro detail, extreme close-up, filling frame',
  'close-up': 'close-up shot, tight framing, detail focus',
  'medium-close': 'medium close shot, upper body, product focus',
  'medium': 'medium shot, waist up, balanced framing',
  'medium-wide': 'medium wide shot, full product, environmental context',
  'wide': 'wide shot, full environment, complete scene'
};

export const COMPOSITION_RULES = {
  'rule-of-thirds': 'rule of thirds composition, subject on intersection point',
  'center': 'centered composition, symmetrical, balanced',
  'golden-ratio': 'golden ratio composition, natural flow, pleasing proportions',
  'diagonal': 'diagonal composition, dynamic lines, energy',
  'frame-within-frame': 'frame within frame, natural framing elements',
  'negative-space': 'negative space composition, minimal, breathing room'
};

export function getCameraAngle(id: string): CameraAngle | undefined {
  return CAMERA_ANGLES.find(a => a.id === id);
}

export function buildAnglePrompt(id: string): string {
  const angle = getCameraAngle(id);
  return angle ? angle.promptPhrase : '';
}

export function getRecommendedAngle(productType: string, context: string): CameraAngle {
  if (context === 'ecommerce') return CAMERA_ANGLES.find(a => a.id === 'front')!;
  if (context === 'lifestyle') return CAMERA_ANGLES.find(a => a.id === 'three-quarter')!;
  if (context === 'detail') return CAMERA_ANGLES.find(a => a.id === 'close-up')!;
  return CAMERA_ANGLES[0];
}
