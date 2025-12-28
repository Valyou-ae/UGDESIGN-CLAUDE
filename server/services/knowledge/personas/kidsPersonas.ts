import { Persona, Ethnicity, Size } from './types';

const ETHNICITIES = ['White', 'Black', 'Hispanic', 'Asian', 'Indian', 'Southeast Asian', 'Indigenous', 'Diverse'] as const;
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

const FEMALE_NAMES: Record<string, string[]> = {
  'White': ['Emma', 'Lily', 'Sophie', 'Olivia', 'Ava', 'Grace', 'Hannah'],
  'Black': ['Aaliyah', 'Zoe', 'Maya', 'Destiny', 'Jasmine', 'Brianna', 'Diamond'],
  'Hispanic': ['Isabella', 'Sofia', 'Camila', 'Valentina', 'Lucia', 'Maria', 'Gabriela'],
  'Asian': ['Yuki', 'Mei', 'Sakura', 'Hana', 'Lin', 'Aiko', 'Yuna'],
  'Indian': ['Priya', 'Ananya', 'Divya', 'Aisha', 'Neha', 'Kavya', 'Diya'],
  'Southeast Asian': ['Linh', 'Mai', 'Dao', 'Nguyet', 'Trinh', 'Hoa', 'Kim'],
  'Indigenous': ['Kaya', 'Aiyana', 'Naya', 'Winona', 'Chenoa', 'Halona', 'Onawa'],
  'Diverse': ['Maya', 'Zara', 'Luna', 'Aria', 'Nova', 'Sage', 'Willow']
};

const MALE_NAMES: Record<string, string[]> = {
  'White': ['Jack', 'Lucas', 'Oliver', 'Ethan', 'Noah', 'Mason', 'Liam'],
  'Black': ['Jayden', 'Jordan', 'Malik', 'Darius', 'Xavier', 'Isaiah', 'Caleb'],
  'Hispanic': ['Diego', 'Santiago', 'Mateo', 'Sebastian', 'Alejandro', 'Carlos', 'Luis'],
  'Asian': ['Kenji', 'Hiroshi', 'Chen', 'Wei', 'Takeshi', 'Akira', 'Yuki'],
  'Indian': ['Arjun', 'Dev', 'Rohan', 'Vivaan', 'Kabir', 'Advait', 'Vihaan'],
  'Southeast Asian': ['Minh', 'Tuan', 'Duc', 'Hieu', 'Long', 'Nam', 'Quoc'],
  'Indigenous': ['Ahanu', 'Elan', 'Koda', 'Mato', 'Chayton', 'Takoda', 'Wapi'],
  'Diverse': ['Kai', 'Jaylen', 'Elias', 'Micah', 'Zander', 'Phoenix', 'Miles']
};

const SIZE_SPECS: Record<string, { height: string; weight: string; build: string }> = {
  'XS': { height: '107cm (3\'6")', weight: '17kg (37lbs)', build: 'Petite slender child frame' },
  'S': { height: '117cm (3\'10")', weight: '21kg (46lbs)', build: 'Slim active child frame' },
  'M': { height: '127cm (4\'2")', weight: '26kg (57lbs)', build: 'Average healthy child frame' },
  'L': { height: '137cm (4\'6")', weight: '32kg (71lbs)', build: 'Sturdy well-built child frame' },
  'XL': { height: '142cm (4\'8")', weight: '40kg (88lbs)', build: 'Larger husky child frame' },
  'XXL': { height: '147cm (4\'10")', weight: '50kg (110lbs)', build: 'Plus size child frame' },
  'XXXL': { height: '152cm (5\'0")', weight: '62kg (137lbs)', build: 'Very large child frame' }
};

const SKIN_TONES: Record<string, string> = {
  'White': 'Fair with rosy cheeks',
  'Black': 'Rich brown with natural glow',
  'Hispanic': 'Warm olive with rosy cheeks',
  'Asian': 'Fair with porcelain quality',
  'Indian': 'Warm brown with healthy glow',
  'Southeast Asian': 'Light tan with natural glow',
  'Indigenous': 'Warm reddish-brown',
  'Diverse': 'Warm caramel with natural glow'
};

function generateKidsPersona(ethnicity: string, sex: 'Female' | 'Male', size: string, sizeIndex: number): Persona {
  const names = sex === 'Female' ? FEMALE_NAMES[ethnicity] : MALE_NAMES[ethnicity];
  const name = names[sizeIndex];
  const specs = SIZE_SPECS[size];
  const skinTone = SKIN_TONES[ethnicity];
  const prefix = ethnicity.substring(0, 3).toUpperCase();
  const sexCode = sex === 'Female' ? 'F' : 'M';
  const id = `${prefix}_KD_${sexCode}_${size}_001`;
  const eyeColor = ['White'].includes(ethnicity) ? 'Blue' : ['Diverse'].includes(ethnicity) ? 'Hazel' : 'Dark brown';
  const hairColor = ['White', 'Diverse'].includes(ethnicity) ? 'Light brown' : 'Black';
  const hairStyle = sex === 'Female' ? 'Long with colorful clips' : 'Short playful style';

  return {
    id, name, age: 'Kids', sex, ethnicity: ethnicity as Ethnicity, size: size as Size,
    height: specs.height, weight: specs.weight, build: specs.build,
    facialFeatures: `Sweet child face with bright ${eyeColor.toLowerCase()} eyes, button nose, cheerful smile`,
    hairStyle, hairColor, eyeColor, skinTone,
    fullDescription: `${name} is a ${6 + sizeIndex}-year-old ${sex.toLowerCase()} of ${ethnicity} heritage, standing ${specs.height} tall and weighing approximately ${specs.weight}. ${sex === 'Female' ? 'She' : 'He'} has a ${specs.build} with healthy child proportions. ${sex === 'Female' ? 'Her' : 'His'} sweet face has bright ${eyeColor.toLowerCase()} eyes, a button nose, and a cheerful smile. ${sex === 'Female' ? 'Her' : 'His'} ${hairColor.toLowerCase()} hair is styled in a ${hairStyle.toLowerCase()} manner.`
  };
}

export const KIDS_FEMALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as Record<Ethnicity, Record<Size, Persona[]>>;
export const KIDS_MALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as Record<Ethnicity, Record<Size, Persona[]>>;

ETHNICITIES.forEach(ethnicity => {
  KIDS_FEMALE_PERSONAS[ethnicity] = {} as Record<Size, Persona[]>;
  KIDS_MALE_PERSONAS[ethnicity] = {} as Record<Size, Persona[]>;
  SIZES.forEach((size, sizeIndex) => {
    KIDS_FEMALE_PERSONAS[ethnicity][size] = [generateKidsPersona(ethnicity, 'Female', size, sizeIndex)];
    KIDS_MALE_PERSONAS[ethnicity][size] = [generateKidsPersona(ethnicity, 'Male', size, sizeIndex)];
  });
});

export function getKidsPersona(ethnicity: Ethnicity, sex: 'Female' | 'Male', size: Size): Persona | undefined {
  const collection = sex === 'Female' ? KIDS_FEMALE_PERSONAS : KIDS_MALE_PERSONAS;
  return collection[ethnicity]?.[size]?.[0];
}

export function getAllKidsPersonas(): Persona[] {
  const all: Persona[] = [];
  ETHNICITIES.forEach(ethnicity => {
    SIZES.forEach(size => {
      const female = getKidsPersona(ethnicity, 'Female', size);
      const male = getKidsPersona(ethnicity, 'Male', size);
      if (female) all.push(female);
      if (male) all.push(male);
    });
  });
  return all;
}

export const KIDS_PERSONAS = { female: KIDS_FEMALE_PERSONAS, male: KIDS_MALE_PERSONAS };
