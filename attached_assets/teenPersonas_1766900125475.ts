/**
 * TEEN PERSONAS (Ages 13-17) - Complete 112 personas
 * 56 Female + 56 Male across 8 ethnicities × 7 sizes
 */

import { Persona, Ethnicity, Size } from '../types';

const ETHNICITIES = ['White', 'Black', 'Hispanic', 'Asian', 'Indian', 'Southeast Asian', 'Indigenous', 'Diverse'] as const;
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

const FEMALE_NAMES: Record<string, string[]> = {
  'White': ['Emily', 'Madison', 'Hannah', 'Abigail', 'Grace', 'Chloe', 'Lily'],
  'Black': ['Destiny', 'Jasmine', 'Brianna', 'Trinity', 'Imani', 'Kiara', 'Aaliyah'],
  'Hispanic': ['Isabella', 'Sofia', 'Valentina', 'Camila', 'Lucia', 'Mariana', 'Daniela'],
  'Asian': ['Sakura', 'Hana', 'Yuki', 'Aiko', 'Mei', 'Yuna', 'Lin'],
  'Indian': ['Ananya', 'Priya', 'Kavya', 'Aisha', 'Neha', 'Rhea', 'Diya'],
  'Southeast Asian': ['Mai', 'Linh', 'Dao', 'Trinh', 'Hoa', 'Kim', 'Vy'],
  'Indigenous': ['Aiyana', 'Naya', 'Chenoa', 'Kaya', 'Winona', 'Halona', 'Onawa'],
  'Diverse': ['Zara', 'Maya', 'Luna', 'Aria', 'Nova', 'Sage', 'Willow']
};

const MALE_NAMES: Record<string, string[]> = {
  'White': ['Ethan', 'Jacob', 'Noah', 'Aiden', 'Ryan', 'Tyler', 'Brandon'],
  'Black': ['Jayden', 'Jordan', 'Malik', 'Darius', 'Xavier', 'Isaiah', 'Caleb'],
  'Hispanic': ['Diego', 'Santiago', 'Mateo', 'Sebastian', 'Alejandro', 'Emilio', 'Rafael'],
  'Asian': ['Ryu', 'Hiro', 'Kenji', 'Shin', 'Taro', 'Yuki', 'Ken'],
  'Indian': ['Arjun', 'Dev', 'Rohan', 'Vivaan', 'Kabir', 'Advait', 'Vihaan'],
  'Southeast Asian': ['Minh', 'Tuan', 'Duc', 'Hieu', 'Long', 'Nam', 'Quoc'],
  'Indigenous': ['Ahanu', 'Elan', 'Koda', 'Mato', 'Chayton', 'Takoda', 'Wapi'],
  'Diverse': ['Kai', 'Jaylen', 'Elias', 'Micah', 'Zander', 'Phoenix', 'Miles']
};

const SIZE_SPECS: Record<string, { height: string; weight: string; build: string }> = {
  'XS': { height: '150cm (4\'11")', weight: '42kg (93lbs)', build: 'Petite teen frame' },
  'S': { height: '157cm (5\'2")', weight: '50kg (110lbs)', build: 'Slim teen frame' },
  'M': { height: '163cm (5\'4")', weight: '57kg (126lbs)', build: 'Average teen frame' },
  'L': { height: '168cm (5\'6")', weight: '65kg (143lbs)', build: 'Sturdy teen frame' },
  'XL': { height: '173cm (5\'8")', weight: '75kg (165lbs)', build: 'Large teen frame' },
  'XXL': { height: '175cm (5\'9")', weight: '88kg (194lbs)', build: 'Plus size teen frame' },
  'XXXL': { height: '178cm (5\'10")', weight: '100kg (220lbs)', build: 'Very large teen frame' }
};

const SKIN_TONES: Record<string, string> = {
  'White': 'Fair with youthful glow',
  'Black': 'Rich brown with youthful glow',
  'Hispanic': 'Warm olive with youthful glow',
  'Asian': 'Fair with golden undertones',
  'Indian': 'Warm brown with youthful glow',
  'Southeast Asian': 'Light tan with youthful glow',
  'Indigenous': 'Warm reddish-brown',
  'Diverse': 'Warm caramel with youthful glow'
};

function generateTeenPersona(ethnicity: string, sex: 'Female' | 'Male', size: string, sizeIndex: number): Persona {
  const names = sex === 'Female' ? FEMALE_NAMES[ethnicity] : MALE_NAMES[ethnicity];
  const name = names[sizeIndex];
  const specs = SIZE_SPECS[size];
  const skinTone = SKIN_TONES[ethnicity];
  const prefix = ethnicity.substring(0, 3).toUpperCase();
  const sexCode = sex === 'Female' ? 'F' : 'M';
  const id = `${prefix}_TN_${sexCode}_${size}_001`;
  const eyeColor = ['White'].includes(ethnicity) ? 'Blue' : ['Diverse'].includes(ethnicity) ? 'Hazel' : 'Dark brown';
  const hairColor = ['White', 'Diverse'].includes(ethnicity) ? 'Light brown' : 'Black';
  const hairStyle = sex === 'Female' ? 'Long with trendy style' : 'Short trendy cut';

  return {
    id, name, age: 'Teen', sex, ethnicity: ethnicity as Ethnicity, size: size as Size,
    height: specs.height, weight: specs.weight, build: specs.build,
    facialFeatures: `Young ${sex.toLowerCase()} face with clear youthful skin, bright ${eyeColor.toLowerCase()} eyes, fresh teen appearance`,
    hairStyle, hairColor, eyeColor, skinTone,
    fullDescription: `${name} is a ${13 + sizeIndex}-year-old teen ${sex.toLowerCase()} of ${ethnicity} heritage, standing ${specs.height} tall and weighing approximately ${specs.weight}. ${sex === 'Female' ? 'She' : 'He'} has a ${specs.build} with developing teen proportions. ${sex === 'Female' ? 'Her' : 'His'} face has clear youthful skin, bright ${eyeColor.toLowerCase()} eyes, and a fresh energetic appearance. ${sex === 'Female' ? 'Her' : 'His'} ${hairColor.toLowerCase()} hair is ${hairStyle.toLowerCase()}.`
  };
}

export const TEEN_FEMALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as any;
export const TEEN_MALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as any;

ETHNICITIES.forEach(ethnicity => {
  TEEN_FEMALE_PERSONAS[ethnicity] = {} as any;
  TEEN_MALE_PERSONAS[ethnicity] = {} as any;
  SIZES.forEach((size, sizeIndex) => {
    TEEN_FEMALE_PERSONAS[ethnicity][size] = [generateTeenPersona(ethnicity, 'Female', size, sizeIndex)];
    TEEN_MALE_PERSONAS[ethnicity][size] = [generateTeenPersona(ethnicity, 'Male', size, sizeIndex)];
  });
});

export function getTeenPersona(ethnicity: Ethnicity, sex: 'Female' | 'Male', size: Size): Persona | undefined {
  const collection = sex === 'Female' ? TEEN_FEMALE_PERSONAS : TEEN_MALE_PERSONAS;
  return collection[ethnicity]?.[size]?.[0];
}

export function getAllTeenPersonas(): Persona[] {
  const all: Persona[] = [];
  ETHNICITIES.forEach(ethnicity => {
    SIZES.forEach(size => {
      const female = getTeenPersona(ethnicity, 'Female', size);
      const male = getTeenPersona(ethnicity, 'Male', size);
      if (female) all.push(female);
      if (male) all.push(male);
    });
  });
  return all;
}

export const TEEN_PERSONAS = { female: TEEN_FEMALE_PERSONAS, male: TEEN_MALE_PERSONAS };
console.log(`Total Teen Personas: ${getAllTeenPersonas().length}`); // 112
