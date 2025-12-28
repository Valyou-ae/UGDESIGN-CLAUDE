/**
 * ============================================================================
 * PERSONA SYSTEM - TYPE DEFINITIONS
 * ============================================================================
 * POD Mockup Generator - Unified Personas Knowledge Base
 * 
 * Specifications:
 * - 8 Ethnicities: White, Black, Hispanic, Asian, Indian, Southeast Asian, Indigenous, Middle Eastern
 * - 6 Sizes: XS, S, M, L, XL, 2XL
 * - 3 Age Groups: Teen (13-17), Young Adult (18-24), Adult (25-45)
 * - 2 Sexes: Male, Female
 * - Total: 288 personas
 */

export type Ethnicity = 
  | 'White' 
  | 'Black' 
  | 'Hispanic' 
  | 'Asian' 
  | 'Indian' 
  | 'Southeast Asian' 
  | 'Indigenous' 
  | 'Middle Eastern';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL';

export type AgeGroup = 'Teen' | 'Young Adult' | 'Adult';

export type Sex = 'Male' | 'Female';

export interface Persona {
  id: string;
  name: string;
  age: AgeGroup;
  ageRange: string;
  sex: Sex;
  ethnicity: Ethnicity;
  size: Size;
  height: string;
  weight: string;
  build: string;
  facialFeatures: string;
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  skinTone: string;
  fullDescription: string;
  version: string;
  createdDate: string;
}

export interface PersonaCollection {
  [ethnicity: string]: {
    [sex: string]: {
      [size: string]: Persona[];
    };
  };
}

// ID Format: ETH_AGE_SEX_SIZE_001
// Examples: WHT_AD_F_M_001, MDE_TN_M_XL_001
export const ETHNICITY_CODES: Record<Ethnicity, string> = {
  'White': 'WHT',
  'Black': 'BLK',
  'Hispanic': 'HSP',
  'Asian': 'ASN',
  'Indian': 'IND',
  'Southeast Asian': 'SEA',
  'Indigenous': 'IDG',
  'Middle Eastern': 'MDE'
};

export const AGE_CODES: Record<AgeGroup, string> = {
  'Teen': 'TN',
  'Young Adult': 'YA',
  'Adult': 'AD'
};

export const AGE_RANGES: Record<AgeGroup, string> = {
  'Teen': '13-17',
  'Young Adult': '18-24',
  'Adult': '25-45'
};

export const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

export const ETHNICITIES: Ethnicity[] = [
  'White',
  'Black',
  'Hispanic',
  'Asian',
  'Indian',
  'Southeast Asian',
  'Indigenous',
  'Middle Eastern'
];
