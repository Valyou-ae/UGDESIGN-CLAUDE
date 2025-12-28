export type AgeGroup = 'Baby' | 'Toddler' | 'Kids' | 'Teen' | 'Young Adult' | 'Adult' | 'Senior';
export type Ethnicity = 'White' | 'Black' | 'Hispanic' | 'Asian' | 'Indian' | 'Southeast Asian' | 'Indigenous' | 'Diverse';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Sex = 'Female' | 'Male';

export interface Persona {
  id: string;
  name: string;
  age: AgeGroup;
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
}

export const ETHNICITIES: Ethnicity[] = ['White', 'Black', 'Hispanic', 'Asian', 'Indian', 'Southeast Asian', 'Indigenous', 'Diverse'];
export const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
export const AGE_GROUPS: AgeGroup[] = ['Baby', 'Toddler', 'Kids', 'Teen', 'Young Adult', 'Adult', 'Senior'];
