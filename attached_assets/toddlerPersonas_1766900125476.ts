/**
 * TODDLER PERSONAS (Ages 2-5) - Complete 112 personas
 * 56 Female + 56 Male across 8 ethnicities × 7 sizes
 */

import { Persona, Ethnicity, Size } from '../types';

const ETHNICITIES = ['White', 'Black', 'Hispanic', 'Asian', 'Indian', 'Southeast Asian', 'Indigenous', 'Diverse'] as const;
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

// Female names by ethnicity
const FEMALE_NAMES: Record<string, string[]> = {
  'White': ['Chloe', 'Mia', 'Ella', 'Charlotte', 'Harper', 'Amelia', 'Scarlett'],
  'Black': ['Zuri', 'Nia', 'Amara', 'Imani', 'Kira', 'Saniya', 'Treasure'],
  'Hispanic': ['Luna', 'Mila', 'Bella', 'Rosa', 'Carmen', 'Elena', 'Marisol'],
  'Asian': ['Yui', 'Rin', 'Suki', 'Akari', 'Kana', 'Haru', 'Momo'],
  'Indian': ['Anika', 'Diya', 'Isha', 'Riya', 'Tara', 'Nisha', 'Pooja'],
  'Southeast Asian': ['Ly', 'An', 'Ngoc', 'Dao', 'Tam', 'Kim', 'Yen'],
  'Indigenous': ['Nita', 'Waya', 'Nova', 'Sani', 'Onawa', 'Catori', 'Hurit'],
  'Diverse': ['Maya', 'Layla', 'Skye', 'Sage', 'River', 'Willow', 'Aurora']
};

// Male names by ethnicity
const MALE_NAMES: Record<string, string[]> = {
  'White': ['Jack', 'Lucas', 'Henry', 'Owen', 'Max', 'Theo', 'Charlie'],
  'Black': ['Jaden', 'Khalil', 'Miles', 'Zion', 'Kamari', 'Darius', 'King'],
  'Hispanic': ['Leo', 'Marco', 'Rafael', 'Adrian', 'Emilio', 'Paco', 'Tito'],
  'Asian': ['Yuto', 'Haruki', 'Sota', 'Ken', 'Dai', 'Taro', 'Goro'],
  'Indian': ['Aarav', 'Dev', 'Rohan', 'Krish', 'Veer', 'Kabir', 'Amar'],
  'Southeast Asian': ['Binh', 'Tuan', 'Nam', 'Duc', 'Hieu', 'Long', 'Quoc'],
  'Indigenous': ['Ahote', 'Bidzil', 'Cochise', 'Dakota', 'Elsu', 'Hakan', 'Kitchi'],
  'Diverse': ['Jaylen', 'Mateo', 'Elias', 'Kai', 'Zander', 'Micah', 'Phoenix']
};

// Height/Weight by size (toddler appropriate)
const SIZE_SPECS: Record<string, { height: string; weight: string; build: string }> = {
  'XS': { height: '82cm (2\'8")', weight: '10kg (22lbs)', build: 'Petite tiny toddler frame' },
  'S': { height: '89cm (2\'11")', weight: '12kg (26lbs)', build: 'Small slim toddler frame' },
  'M': { height: '97cm (3\'2")', weight: '15kg (33lbs)', build: 'Average toddler frame' },
  'L': { height: '102cm (3\'4")', weight: '18kg (40lbs)', build: 'Sturdy larger toddler frame' },
  'XL': { height: '106cm (3\'6")', weight: '21kg (46lbs)', build: 'Large husky toddler frame' },
  'XXL': { height: '108cm (3\'6.5")', weight: '24kg (53lbs)', build: 'Plus size toddler frame' },
  'XXXL': { height: '111cm (3\'8")', weight: '27kg (60lbs)', build: 'Very large toddler frame' }
};

// Skin tones by ethnicity
const SKIN_TONES: Record<string, string> = {
  'White': 'Fair with rosy cheeks',
  'Black': 'Rich brown with natural glow',
  'Hispanic': 'Warm olive with rosy cheeks',
  'Asian': 'Fair with golden undertones',
  'Indian': 'Warm brown with healthy glow',
  'Southeast Asian': 'Light tan with natural glow',
  'Indigenous': 'Warm reddish-brown with natural glow',
  'Diverse': 'Warm caramel with natural glow'
};

function generateToddlerPersona(
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
  const id = `${prefix}_TD_${sexCode}_${size}_001`;
  
  const hairColor = ['White', 'Diverse'].includes(ethnicity) ? 
    (sex === 'Female' ? 'Light brown with golden highlights' : 'Light brown') : 'Black';
  
  const eyeColor = ['White'].includes(ethnicity) ? 'Blue' : 
    ['Diverse'].includes(ethnicity) ? 'Hazel' : 'Dark brown';
  
  const hairStyle = sex === 'Female' ? 
    (sizeIndex < 2 ? 'Short curly with bow' : 'Medium with colorful clips') :
    (sizeIndex < 2 ? 'Short messy' : 'Short neat');

  return {
    id,
    name,
    age: 'Toddler',
    sex,
    ethnicity: ethnicity as Ethnicity,
    size: size as Size,
    height: specs.height,
    weight: specs.weight,
    build: specs.build,
    facialFeatures: `Round cherub face with chubby cheeks, bright ${eyeColor.toLowerCase()} eyes, tiny nose, sweet toddler smile`,
    hairStyle,
    hairColor,
    eyeColor,
    skinTone,
    fullDescription: `${name} is a ${size === 'XS' ? '2' : size === 'S' ? '3' : size === 'M' ? '4' : '5'}-year-old toddler ${sex.toLowerCase()} of ${ethnicity} heritage, standing ${specs.height} tall and weighing approximately ${specs.weight}. ${sex === 'Female' ? 'She' : 'He'} has a ${specs.build} with chubby toddler proportions. ${sex === 'Female' ? 'Her' : 'His'} round cherub face features chubby cheeks, bright ${eyeColor.toLowerCase()} eyes, a tiny nose, and a sweet toddler smile. ${sex === 'Female' ? 'Her' : 'His'} ${hairColor.toLowerCase()} hair frames ${sex === 'Female' ? 'her' : 'his'} ${skinTone.toLowerCase()}.`
  };
}

// Generate all personas
export const TODDLER_FEMALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as any;
export const TODDLER_MALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as any;

ETHNICITIES.forEach(ethnicity => {
  TODDLER_FEMALE_PERSONAS[ethnicity] = {} as any;
  TODDLER_MALE_PERSONAS[ethnicity] = {} as any;
  
  SIZES.forEach((size, sizeIndex) => {
    TODDLER_FEMALE_PERSONAS[ethnicity][size] = [generateToddlerPersona(ethnicity, 'Female', size, sizeIndex)];
    TODDLER_MALE_PERSONAS[ethnicity][size] = [generateToddlerPersona(ethnicity, 'Male', size, sizeIndex)];
  });
});

// Helper functions
export function getToddlerPersona(ethnicity: Ethnicity, sex: 'Female' | 'Male', size: Size): Persona | undefined {
  const collection = sex === 'Female' ? TODDLER_FEMALE_PERSONAS : TODDLER_MALE_PERSONAS;
  return collection[ethnicity]?.[size]?.[0];
}

export function getAllToddlerPersonas(): Persona[] {
  const all: Persona[] = [];
  ETHNICITIES.forEach(ethnicity => {
    SIZES.forEach(size => {
      const female = getToddlerPersona(ethnicity, 'Female', size);
      const male = getToddlerPersona(ethnicity, 'Male', size);
      if (female) all.push(female);
      if (male) all.push(male);
    });
  });
  return all;
}

export const TODDLER_PERSONAS = {
  female: TODDLER_FEMALE_PERSONAS,
  male: TODDLER_MALE_PERSONAS
};

// Verify count
console.log(`Total Toddler Personas: ${getAllToddlerPersonas().length}`); // Should be 112
