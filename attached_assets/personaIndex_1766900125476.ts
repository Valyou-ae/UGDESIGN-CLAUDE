/**
 * COMPLETE PERSONA LIBRARY INDEX
 * 
 * Total: 784 unique personas across 7 age groups
 * 
 * Coverage: 8 ethnicities × 7 sizes × 2 sexes × 7 age groups = 784 personas
 */

// Age Group Imports
export * from './youngAdultPersonas';
export * from './adultPersonas';
export * from './teenPersonas';
export * from './seniorPersonas';
export * from './kidsPersonas';
export * from './toddlerPersonas';
export * from './babyPersonas';

// Types
export type AgeGroup = 'Baby' | 'Toddler' | 'Kids' | 'Teen' | 'Young Adult' | 'Adult' | 'Senior';
export type Ethnicity = 'White' | 'Black' | 'Hispanic' | 'Asian' | 'Indian' | 'Southeast Asian' | 'Indigenous' | 'Diverse';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Sex = 'Female' | 'Male';

// Age Group Specifications
export const AGE_GROUP_SPECS = {
  'Baby': { ageRange: '0-2', count: 112, file: 'babyPersonas.ts' },
  'Toddler': { ageRange: '2-5', count: 112, file: 'toddlerPersonas.ts' },
  'Kids': { ageRange: '6-12', count: 112, file: 'kidsPersonas.ts' },
  'Teen': { ageRange: '13-17', count: 112, file: 'teenPersonas.ts' },
  'Young Adult': { ageRange: '18-29', count: 112, file: 'youngAdultPersonas.ts' },
  'Adult': { ageRange: '30-50', count: 112, file: 'adultPersonas.ts' },
  'Senior': { ageRange: '50+', count: 112, file: 'seniorPersonas.ts' }
};

// Ethnicity Coverage
export const ETHNICITIES: Ethnicity[] = [
  'White',
  'Black', 
  'Hispanic',
  'Asian',
  'Indian',
  'Southeast Asian',
  'Indigenous',
  'Diverse'
];

// Size Specifications
export const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

// Summary Statistics
export const PERSONA_STATS = {
  totalPersonas: 784,
  ageGroups: 7,
  ethnicities: 8,
  sizes: 7,
  sexes: 2,
  personasPerAgeGroup: 112,
  personasPerEthnicity: 98,
  personasPerSize: 112,
  personasPerSex: 392
};

console.log('Complete Persona Library loaded: 784 unique personas');
