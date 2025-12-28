/**
 * ============================================================================
 * UNIFIED PERSONAS INDEX
 * ============================================================================
 * POD Mockup Generator - Complete Persona Library
 * 
 * SPECIFICATIONS:
 * - 8 Ethnicities: White, Black, Hispanic, Asian, Indian, Southeast Asian, Indigenous, Middle Eastern
 * - 6 Sizes: XS, S, M, L, XL, 2XL
 * - 3 Age Groups: Teen (13-17), Young Adult (18-24), Adult (25-45)
 * - 2 Sexes: Male, Female
 * - Total: 288 Personas
 * 
 * UPDATED: December 28, 2025
 * VERSION: 2.0
 */

// ============================================================================
// IMPORTS
// ============================================================================

import { 
  Persona, 
  Ethnicity, 
  Size, 
  AgeGroup, 
  Sex,
  ETHNICITY_CODES,
  AGE_CODES,
  AGE_RANGES,
  SIZES,
  ETHNICITIES
} from './types';

import { adultPersonas, getAdultPersona } from './adultPersonas';
import { teenPersonas, getTeenPersona } from './teenPersonas';
import { youngAdultPersonas, getYoungAdultPersona } from './youngAdultPersonas';

// ============================================================================
// COMBINED EXPORTS
// ============================================================================

export * from './types';
export { adultPersonas } from './adultPersonas';
export { teenPersonas } from './teenPersonas';
export { youngAdultPersonas } from './youngAdultPersonas';

// ============================================================================
// ALL PERSONAS COMBINED
// ============================================================================

export const allPersonas: Persona[] = [
  ...teenPersonas,
  ...youngAdultPersonas,
  ...adultPersonas
];

// ============================================================================
// UNIFIED LOOKUP FUNCTION
// ============================================================================

/**
 * Get a specific persona by age group, ethnicity, sex, and size
 */
export function getPersona(
  ageGroup: AgeGroup,
  ethnicity: Ethnicity,
  sex: Sex,
  size: Size
): Persona | undefined {
  switch (ageGroup) {
    case 'Teen':
      return getTeenPersona(ethnicity, sex, size);
    case 'Young Adult':
      return getYoungAdultPersona(ethnicity, sex, size);
    case 'Adult':
      return getAdultPersona(ethnicity, sex, size);
    default:
      return undefined;
  }
}

/**
 * Get all personas matching specific criteria
 */
export function getPersonas(criteria: {
  ageGroup?: AgeGroup;
  ethnicity?: Ethnicity;
  sex?: Sex;
  size?: Size;
}): Persona[] {
  return allPersonas.filter(p => {
    if (criteria.ageGroup && p.age !== criteria.ageGroup) return false;
    if (criteria.ethnicity && p.ethnicity !== criteria.ethnicity) return false;
    if (criteria.sex && p.sex !== criteria.sex) return false;
    if (criteria.size && p.size !== criteria.size) return false;
    return true;
  });
}

/**
 * Get random persona matching criteria
 */
export function getRandomPersona(criteria?: {
  ageGroup?: AgeGroup;
  ethnicity?: Ethnicity;
  sex?: Sex;
  size?: Size;
}): Persona {
  const matches = criteria ? getPersonas(criteria) : allPersonas;
  return matches[Math.floor(Math.random() * matches.length)];
}

// ============================================================================
// STATISTICS & VALIDATION
// ============================================================================

export const PERSONA_STATS = {
  totalPersonas: allPersonas.length,
  teenCount: teenPersonas.length,
  youngAdultCount: youngAdultPersonas.length,
  adultCount: adultPersonas.length,
  
  byAgeGroup: {
    'Teen': teenPersonas.length,
    'Young Adult': youngAdultPersonas.length,
    'Adult': adultPersonas.length
  },
  
  byEthnicity: ETHNICITIES.reduce((acc, eth) => {
    acc[eth] = allPersonas.filter(p => p.ethnicity === eth).length;
    return acc;
  }, {} as Record<string, number>),
  
  bySize: SIZES.reduce((acc, size) => {
    acc[size] = allPersonas.filter(p => p.size === size).length;
    return acc;
  }, {} as Record<string, number>),
  
  bySex: {
    'Male': allPersonas.filter(p => p.sex === 'Male').length,
    'Female': allPersonas.filter(p => p.sex === 'Female').length
  }
};

/**
 * Validate persona coverage - ensures all combinations exist
 */
export function validateCoverage(): { 
  isComplete: boolean; 
  missing: string[];
  coverage: number;
} {
  const ageGroups: AgeGroup[] = ['Teen', 'Young Adult', 'Adult'];
  const missing: string[] = [];
  
  ageGroups.forEach(age => {
    ETHNICITIES.forEach(eth => {
      (['Male', 'Female'] as Sex[]).forEach(sex => {
        SIZES.forEach(size => {
          const persona = getPersona(age, eth, sex, size);
          if (!persona) {
            missing.push(`${age} | ${eth} | ${sex} | ${size}`);
          }
        });
      });
    });
  });
  
  const expectedTotal = 3 * 8 * 2 * 6; // 288
  const coverage = ((expectedTotal - missing.length) / expectedTotal) * 100;
  
  return {
    isComplete: missing.length === 0,
    missing,
    coverage
  };
}

// ============================================================================
// PROMPT GENERATION HELPERS
// ============================================================================

/**
 * Generate AI image prompt from persona
 */
export function generatePrompt(persona: Persona): string {
  return `${persona.fullDescription} Professional photography, high-quality mockup, lifestyle setting.`;
}

/**
 * Generate concise model description for prompt
 */
export function getModelDescription(persona: Persona): string {
  return `${persona.ageRange} year old ${persona.sex.toLowerCase()} of ${persona.ethnicity} heritage, ${persona.build}, ${persona.height}, ${persona.skinTone} skin, ${persona.hairColor} ${persona.hairStyle.toLowerCase()} hair, ${persona.eyeColor} eyes`;
}

// ============================================================================
// QUICK REFERENCE
// ============================================================================

export const QUICK_REF = {
  ethnicities: ETHNICITIES,
  sizes: SIZES,
  ageGroups: ['Teen', 'Young Adult', 'Adult'] as AgeGroup[],
  sexes: ['Male', 'Female'] as Sex[],
  totalCombinations: 8 * 6 * 3 * 2 // 288
};

// Default export
export default {
  allPersonas,
  getPersona,
  getPersonas,
  getRandomPersona,
  validateCoverage,
  generatePrompt,
  getModelDescription,
  PERSONA_STATS,
  QUICK_REF
};
