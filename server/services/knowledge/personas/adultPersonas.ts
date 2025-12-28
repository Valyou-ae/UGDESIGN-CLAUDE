import { Persona, Ethnicity, Size } from './types';

const ETHNICITIES = ['White', 'Black', 'Hispanic', 'Asian', 'Indian', 'Southeast Asian', 'Indigenous', 'Diverse'] as const;
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

const FEMALE_NAMES: Record<string, string[]> = {
  'White': ['Jennifer', 'Sarah', 'Michelle', 'Laura', 'Karen', 'Amanda', 'Lisa'],
  'Black': ['Keisha', 'Tamika', 'Latoya', 'Ebony', 'Monique', 'Tanya', 'Brenda'],
  'Hispanic': ['Maria', 'Carmen', 'Rosa', 'Elena', 'Patricia', 'Guadalupe', 'Marisol'],
  'Asian': ['Yuki', 'Mei', 'Lin', 'Sakura', 'Hana', 'Yuna', 'Naomi'],
  'Indian': ['Priya', 'Ananya', 'Divya', 'Lakshmi', 'Sunita', 'Meera', 'Rekha'],
  'Southeast Asian': ['Linh', 'Mai', 'Nguyet', 'Lawan', 'Mali', 'Sita', 'Dara'],
  'Indigenous': ['Kaya', 'Aiyana', 'Winona', 'Chenoa', 'Halona', 'Takoda', 'Shania'],
  'Diverse': ['Maya', 'Zara', 'Aria', 'Nina', 'Leila', 'Jasmine', 'Bianca']
};

const MALE_NAMES: Record<string, string[]> = {
  'White': ['Michael', 'David', 'Christopher', 'Robert', 'William', 'Thomas', 'Richard'],
  'Black': ['Marcus', 'Jamal', 'Darnell', 'Terrell', 'Maurice', 'Jerome', 'Leroy'],
  'Hispanic': ['Carlos', 'Miguel', 'Ricardo', 'Jose', 'Luis', 'Antonio', 'Fernando'],
  'Asian': ['Kenji', 'Hiroshi', 'Chen', 'Wei', 'Takeshi', 'Akira', 'Yuki'],
  'Indian': ['Raj', 'Amit', 'Vikram', 'Deepak', 'Suresh', 'Anil', 'Ramesh'],
  'Southeast Asian': ['Somchai', 'Nguyen', 'Boun', 'Kiet', 'Phong', 'Tuan', 'Dara'],
  'Indigenous': ['Chayton', 'Takoda', 'Ahanu', 'Koda', 'Elan', 'Mato', 'Nikan'],
  'Diverse': ['Elias', 'Kai', 'Andre', 'Marcus', 'Daniel', 'Isaiah', 'Gabriel']
};

const SIZE_SPECS: Record<string, { height: string; weight: string; build: string }> = {
  'XS': { height: '157cm (5\'2")', weight: '52kg (115lbs)', build: 'Petite mature frame' },
  'S': { height: '163cm (5\'4")', weight: '60kg (132lbs)', build: 'Slim mature frame' },
  'M': { height: '168cm (5\'6")', weight: '70kg (154lbs)', build: 'Average mature frame' },
  'L': { height: '173cm (5\'8")', weight: '82kg (181lbs)', build: 'Sturdy mature frame' },
  'XL': { height: '175cm (5\'9")', weight: '95kg (209lbs)', build: 'Large mature frame' },
  'XXL': { height: '178cm (5\'10")', weight: '110kg (243lbs)', build: 'Plus size mature frame' },
  'XXXL': { height: '180cm (5\'11")', weight: '125kg (276lbs)', build: 'Very large mature frame' }
};

const SKIN_TONES: Record<string, string> = {
  'White': 'Fair with mature warmth',
  'Black': 'Rich deep brown with natural glow',
  'Hispanic': 'Warm olive with mature depth',
  'Asian': 'Fair with golden undertones',
  'Indian': 'Warm brown with natural glow',
  'Southeast Asian': 'Light tan with warmth',
  'Indigenous': 'Warm reddish-brown',
  'Diverse': 'Warm caramel'
};

function generateAdultPersona(ethnicity: string, sex: 'Female' | 'Male', size: string, sizeIndex: number): Persona {
  const names = sex === 'Female' ? FEMALE_NAMES[ethnicity] : MALE_NAMES[ethnicity];
  const name = names[sizeIndex];
  const specs = SIZE_SPECS[size];
  const skinTone = SKIN_TONES[ethnicity];
  const prefix = ethnicity.substring(0, 3).toUpperCase();
  const sexCode = sex === 'Female' ? 'F' : 'M';
  const id = `${prefix}_AD_${sexCode}_${size}_001`;
  const eyeColor = ['White'].includes(ethnicity) ? 'Blue' : ['Diverse'].includes(ethnicity) ? 'Hazel' : 'Dark brown';
  const hairColor = ['White', 'Diverse'].includes(ethnicity) ? 'Brown with subtle gray' : 'Black with subtle gray';
  const hairStyle = sex === 'Female' ? 'Professional medium length' : 'Short professional';

  return {
    id, name, age: 'Adult', sex, ethnicity: ethnicity as Ethnicity, size: size as Size,
    height: specs.height, weight: specs.weight, build: specs.build,
    facialFeatures: `Mature ${sex.toLowerCase()} face with defined features, wise ${eyeColor.toLowerCase()} eyes, confident expression`,
    hairStyle, hairColor, eyeColor, skinTone,
    fullDescription: `${name} is a ${35 + sizeIndex * 2}-year-old adult ${sex.toLowerCase()} of ${ethnicity} heritage, standing ${specs.height} tall and weighing approximately ${specs.weight}. ${sex === 'Female' ? 'She' : 'He'} has a ${specs.build} with mature proportions. ${sex === 'Female' ? 'Her' : 'His'} face has defined features, wise ${eyeColor.toLowerCase()} eyes, and a confident professional expression. ${sex === 'Female' ? 'Her' : 'His'} ${hairColor.toLowerCase()} hair is styled in a ${hairStyle.toLowerCase()} manner.`
  };
}

export const ADULT_FEMALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as Record<Ethnicity, Record<Size, Persona[]>>;
export const ADULT_MALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as Record<Ethnicity, Record<Size, Persona[]>>;

ETHNICITIES.forEach(ethnicity => {
  ADULT_FEMALE_PERSONAS[ethnicity] = {} as Record<Size, Persona[]>;
  ADULT_MALE_PERSONAS[ethnicity] = {} as Record<Size, Persona[]>;
  SIZES.forEach((size, sizeIndex) => {
    ADULT_FEMALE_PERSONAS[ethnicity][size] = [generateAdultPersona(ethnicity, 'Female', size, sizeIndex)];
    ADULT_MALE_PERSONAS[ethnicity][size] = [generateAdultPersona(ethnicity, 'Male', size, sizeIndex)];
  });
});

export function getAdultPersona(ethnicity: Ethnicity, sex: 'Female' | 'Male', size: Size): Persona | undefined {
  const collection = sex === 'Female' ? ADULT_FEMALE_PERSONAS : ADULT_MALE_PERSONAS;
  return collection[ethnicity]?.[size]?.[0];
}

export function getAllAdultPersonas(): Persona[] {
  const all: Persona[] = [];
  ETHNICITIES.forEach(ethnicity => {
    SIZES.forEach(size => {
      const female = getAdultPersona(ethnicity, 'Female', size);
      const male = getAdultPersona(ethnicity, 'Male', size);
      if (female) all.push(female);
      if (male) all.push(male);
    });
  });
  return all;
}

export const ADULT_PERSONAS = { female: ADULT_FEMALE_PERSONAS, male: ADULT_MALE_PERSONAS };
