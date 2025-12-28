/**
 * BABY PERSONAS (Ages 0-2) - Complete 112 personas
 * 56 Female + 56 Male across 8 ethnicities × 7 sizes
 */

import { Persona, Ethnicity, Size } from '../types';

const ETHNICITIES = ['White', 'Black', 'Hispanic', 'Asian', 'Indian', 'Southeast Asian', 'Indigenous', 'Diverse'] as const;
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

// Female baby names by ethnicity
const FEMALE_NAMES: Record<string, string[]> = {
  'White': ['Lily', 'Rose', 'Daisy', 'Ivy', 'Violet', 'Poppy', 'Iris'],
  'Black': ['Ava', 'Nyla', 'Zara', 'Kali', 'Nia', 'Sade', 'Amani'],
  'Hispanic': ['Mia', 'Luz', 'Sol', 'Rosa', 'Cielo', 'Perla', 'Alba'],
  'Asian': ['Mei', 'Yuki', 'Hana', 'Ai', 'Riko', 'Sora', 'Yua'],
  'Indian': ['Asha', 'Devi', 'Kira', 'Maya', 'Nila', 'Priti', 'Tara'],
  'Southeast Asian': ['Mai', 'Hoa', 'Lan', 'Chi', 'Anh', 'Linh', 'Thao'],
  'Indigenous': ['Fawn', 'Skye', 'Luna', 'Rain', 'Dawn', 'Dove', 'Star'],
  'Diverse': ['Ari', 'Eden', 'Haven', 'Nova', 'Sage', 'Quinn', 'Wren']
};

// Male baby names by ethnicity
const MALE_NAMES: Record<string, string[]> = {
  'White': ['Finn', 'Cole', 'Luke', 'Drew', 'Blake', 'Chase', 'Grant'],
  'Black': ['Kai', 'Jace', 'Zion', 'Milo', 'Deon', 'Tyree', 'Kofi'],
  'Hispanic': ['Rio', 'Cruz', 'Nico', 'Teo', 'Rafa', 'Hugo', 'Beni'],
  'Asian': ['Ren', 'Hiro', 'Taka', 'Ryu', 'Shin', 'Koji', 'Masa'],
  'Indian': ['Dev', 'Raj', 'Arun', 'Neel', 'Vik', 'Jay', 'Ram'],
  'Southeast Asian': ['Ahn', 'Bao', 'Duc', 'Hien', 'Kien', 'Minh', 'Tam'],
  'Indigenous': ['Bear', 'Hawk', 'Wolf', 'Fox', 'Elk', 'Crow', 'Brave'],
  'Diverse': ['Arlo', 'Bo', 'Ezra', 'Luca', 'Miles', 'Noel', 'Theo']
};

// Height/Weight by size (baby appropriate - 0-2 years)
const SIZE_SPECS: Record<string, { height: string; weight: string; build: string; ageDesc: string }> = {
  'XS': { height: '55cm (1\'10")', weight: '5kg (11lbs)', build: 'Tiny newborn frame', ageDesc: '0-3 month' },
  'S': { height: '65cm (2\'2")', weight: '7kg (15lbs)', build: 'Small infant frame', ageDesc: '3-6 month' },
  'M': { height: '72cm (2\'4")', weight: '9kg (20lbs)', build: 'Average baby frame', ageDesc: '6-12 month' },
  'L': { height: '78cm (2\'7")', weight: '11kg (24lbs)', build: 'Sturdy baby frame', ageDesc: '12-18 month' },
  'XL': { height: '82cm (2\'8")', weight: '12kg (26lbs)', build: 'Large baby frame', ageDesc: '18-24 month' },
  'XXL': { height: '85cm (2\'9")', weight: '14kg (31lbs)', build: 'Plus size baby frame', ageDesc: '18-24 month' },
  'XXXL': { height: '88cm (2\'11")', weight: '15kg (33lbs)', build: 'Very large baby frame', ageDesc: '24 month' }
};

// Skin tones by ethnicity
const SKIN_TONES: Record<string, string> = {
  'White': 'Fair with soft pink undertones',
  'Black': 'Rich brown with natural baby softness',
  'Hispanic': 'Warm olive with healthy baby glow',
  'Asian': 'Fair with soft golden undertones',
  'Indian': 'Warm brown with baby softness',
  'Southeast Asian': 'Light tan with natural baby glow',
  'Indigenous': 'Warm reddish-brown with baby softness',
  'Diverse': 'Warm caramel with baby glow'
};

function generateBabyPersona(
  ethnicity: string,
  sex: 'Female' | 'Male',
  size: string,
  sizeIndex: number
): Persona {
  const names = sex === 'Female' ? FEMALE_NAMES[ethnicity] : MALE_NAMES[ethnicity];
  const name = names[sizeIndex];
  const specs = SIZE_SPECS[size];
  const skinTone = SKIN_TONES[ethnicity];
  
  const prefix = ethnicity.substring(0, 3).toUpperCase();
  const sexCode = sex === 'Female' ? 'F' : 'M';
  const id = `${prefix}_BB_${sexCode}_${size}_001`;
  
  const hairDesc = sizeIndex < 2 ? 'wispy' : 'soft';
  const hairColor = ['White', 'Diverse'].includes(ethnicity) ? 
    (sizeIndex < 3 ? 'Light downy fuzz' : 'Light brown') : 
    (sizeIndex < 3 ? 'Dark downy fuzz' : 'Black');
  
  const eyeColor = ['White'].includes(ethnicity) ? 'Blue' : 
    ['Diverse'].includes(ethnicity) ? 'Hazel' : 'Dark brown';
  
  const hairStyle = sizeIndex < 2 ? 'Soft downy fuzz' : 
    (sex === 'Female' ? 'Soft wisps with tiny bow' : 'Soft baby hair');

  return {
    id,
    name,
    age: 'Baby',
    sex,
    ethnicity: ethnicity as Ethnicity,
    size: size as Size,
    height: specs.height,
    weight: specs.weight,
    build: specs.build,
    facialFeatures: `Round baby face with chubby cheeks, big curious ${eyeColor.toLowerCase()} eyes, tiny button nose, gummy or emerging-teeth smile`,
    hairStyle,
    hairColor,
    eyeColor,
    skinTone,
    fullDescription: `${name} is a ${specs.ageDesc} baby ${sex.toLowerCase()} of ${ethnicity} heritage, measuring ${specs.height} and weighing approximately ${specs.weight}. ${sex === 'Female' ? 'She' : 'He'} has a ${specs.build} with adorable baby proportions including chubby limbs and rounded baby tummy. ${sex === 'Female' ? 'Her' : 'His'} round baby face features chubby cheeks, big curious ${eyeColor.toLowerCase()} eyes, a tiny button nose, and an adorable baby smile. ${sex === 'Female' ? 'Her' : 'His'} ${hairColor.toLowerCase()} ${hairStyle.toLowerCase()} frames ${sex === 'Female' ? 'her' : 'his'} ${skinTone.toLowerCase()}.`
  };
}

// Generate all personas
export const BABY_FEMALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as any;
export const BABY_MALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as any;

ETHNICITIES.forEach(ethnicity => {
  BABY_FEMALE_PERSONAS[ethnicity] = {} as any;
  BABY_MALE_PERSONAS[ethnicity] = {} as any;
  
  SIZES.forEach((size, sizeIndex) => {
    BABY_FEMALE_PERSONAS[ethnicity][size] = [generateBabyPersona(ethnicity, 'Female', size, sizeIndex)];
    BABY_MALE_PERSONAS[ethnicity][size] = [generateBabyPersona(ethnicity, 'Male', size, sizeIndex)];
  });
});

// Helper functions
export function getBabyPersona(ethnicity: Ethnicity, sex: 'Female' | 'Male', size: Size): Persona | undefined {
  const collection = sex === 'Female' ? BABY_FEMALE_PERSONAS : BABY_MALE_PERSONAS;
  return collection[ethnicity]?.[size]?.[0];
}

export function getAllBabyPersonas(): Persona[] {
  const all: Persona[] = [];
  ETHNICITIES.forEach(ethnicity => {
    SIZES.forEach(size => {
      const female = getBabyPersona(ethnicity, 'Female', size);
      const male = getBabyPersona(ethnicity, 'Male', size);
      if (female) all.push(female);
      if (male) all.push(male);
    });
  });
  return all;
}

export const BABY_PERSONAS = {
  female: BABY_FEMALE_PERSONAS,
  male: BABY_MALE_PERSONAS
};

// Verify count
console.log(`Total Baby Personas: ${getAllBabyPersonas().length}`); // Should be 112
