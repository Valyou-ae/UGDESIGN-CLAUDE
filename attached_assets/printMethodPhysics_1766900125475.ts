/**
 * PRINT METHOD PHYSICS KNOWLEDGE BASE
 * Physical properties of different print methods and fabrics
 * Version: 1.0
 */

import { PrintMethod } from './types';

export const PRINT_METHODS: PrintMethod[] = [
  {
    id: 'dtg',
    name: 'Direct-to-Garment (DTG)',
    physics: 'Ink absorbs into fabric fibers, becomes part of the fabric',
    fabricBehavior: 'Print moves and stretches with fabric naturally',
    promptEnhancements: [
      'print integrated into fabric texture',
      'ink absorbed into cotton fibers',
      'soft hand feel, print follows fabric drape',
      'slight texture variation in print',
      'natural fabric movement in printed area'
    ]
  },
  {
    id: 'screen',
    name: 'Screen Printing',
    physics: 'Ink sits on top of fabric surface as thin layer',
    fabricBehavior: 'Slight stiffness in heavily printed areas',
    promptEnhancements: [
      'bold opaque print layer',
      'slight texture on print surface',
      'crisp solid colors',
      'minimal fabric show-through',
      'slight stiffness in large solid areas'
    ]
  },
  {
    id: 'sublimation',
    name: 'Dye Sublimation',
    physics: 'Dye becomes part of polyester fibers at molecular level',
    fabricBehavior: 'No texture change, fully integrated',
    promptEnhancements: [
      'vibrant all-over print',
      'no texture difference between printed and unprinted areas',
      'colors integrated into synthetic fabric',
      'print follows body contours seamlessly',
      'athletic performance fabric feel'
    ]
  },
  {
    id: 'htv',
    name: 'Heat Transfer Vinyl (HTV)',
    physics: 'Vinyl layer adhered to fabric surface',
    fabricBehavior: 'Distinct texture, slightly raised from fabric',
    promptEnhancements: [
      'glossy or matte vinyl surface',
      'defined edges on design',
      'slightly raised from fabric',
      'clean solid color blocks',
      'distinct material transition'
    ]
  }
];

export const FABRIC_PHYSICS = {
  cotton: {
    drape: 'natural relaxed drape',
    texture: 'soft matte fabric texture',
    stretch: 'minimal stretch, holds shape',
    wrinkles: 'natural soft wrinkles and folds',
    weight: 'medium weight, structured'
  },
  polyester: {
    drape: 'smooth flowing drape',
    texture: 'slight sheen, smooth surface',
    stretch: 'good stretch recovery',
    wrinkles: 'wrinkle-resistant, smooth',
    weight: 'lightweight, athletic feel'
  },
  blend: {
    drape: 'balanced drape',
    texture: 'soft with slight structure',
    stretch: 'comfortable stretch',
    wrinkles: 'moderate wrinkle resistance',
    weight: 'medium weight, comfortable'
  },
  fleece: {
    drape: 'heavier structured drape',
    texture: 'soft fuzzy texture',
    stretch: 'good stretch',
    wrinkles: 'minimal wrinkles',
    weight: 'medium-heavy weight, cozy'
  }
};

export const CONTOUR_BEHAVIOR = {
  chest: 'print stretches slightly across chest contour, follows body curves',
  stomach: 'print may compress or stretch based on body position',
  back: 'print relatively flat on back, slight curve following spine',
  shoulders: 'print follows rounded shoulder contour',
  sleeves: 'print wraps around cylindrical arm shape'
};

export function getPrintMethod(id: string): PrintMethod | undefined {
  return PRINT_METHODS.find(p => p.id === id);
}

export function buildPhysicsPrompt(printMethod: string, fabricType: keyof typeof FABRIC_PHYSICS): string {
  const method = getPrintMethod(printMethod);
  const fabric = FABRIC_PHYSICS[fabricType];
  
  if (!method || !fabric) return '';
  
  return `${method.promptEnhancements.slice(0, 3).join(', ')}, ${fabric.drape}, ${fabric.texture}`;
}

export function getContourBehavior(bodyArea: keyof typeof CONTOUR_BEHAVIOR): string {
  return CONTOUR_BEHAVIOR[bodyArea];
}
