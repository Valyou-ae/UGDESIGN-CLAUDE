import { Persona, Ethnicity, Size } from './types';

const ETHNICITIES = ['White', 'Black', 'Hispanic', 'Asian', 'Indian', 'Southeast Asian', 'Indigenous', 'Diverse'] as const;
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

const FEMALE_NAMES: Record<string, string[]> = {
  'White': ['Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Charlotte'],
  'Black': ['Aaliyah', 'Zoe', 'Imani', 'Destiny', 'Jasmine', 'Brianna', 'Kiara'],
  'Hispanic': ['Sofia', 'Valentina', 'Camila', 'Luna', 'Victoria', 'Mariana', 'Gabriela'],
  'Asian': ['Yuki', 'Mei', 'Sakura', 'Hana', 'Lin', 'Yuna', 'Aiko'],
  'Indian': ['Priya', 'Ananya', 'Divya', 'Aisha', 'Neha', 'Kavya', 'Rhea'],
  'Southeast Asian': ['Linh', 'Mai', 'Dao', 'Nguyet', 'Trinh', 'Hoa', 'Kim'],
  'Indigenous': ['Kaya', 'Aiyana', 'Naya', 'Winona', 'Chenoa', 'Halona', 'Shania'],
  'Diverse': ['Maya', 'Zara', 'Luna', 'Aria', 'Nova', 'Sierra', 'Sage']
};

const MALE_NAMES: Record<string, string[]> = {
  'White': ['Liam', 'Noah', 'Oliver', 'Ethan', 'Aiden', 'Lucas', 'Mason'],
  'Black': ['Jayden', 'Malik', 'Darius', 'Marcus', 'Andre', 'Terrell', 'Xavier'],
  'Hispanic': ['Diego', 'Mateo', 'Santiago', 'Sebastian', 'Alejandro', 'Carlos', 'Luis'],
  'Asian': ['Kenji', 'Hiroshi', 'Chen', 'Wei', 'Takeshi', 'Akira', 'Yuki'],
  'Indian': ['Raj', 'Amit', 'Vikram', 'Deepak', 'Suresh', 'Anil', 'Rohit'],
  'Southeast Asian': ['Somchai', 'Nguyen', 'Boun', 'Kiet', 'Phong', 'Tuan', 'Minh'],
  'Indigenous': ['Chayton', 'Takoda', 'Ahanu', 'Koda', 'Elan', 'Mato', 'Nikan'],
  'Diverse': ['Elias', 'Kai', 'Andre', 'Marcus', 'Daniel', 'Isaiah', 'Gabriel']
};

const SIZE_SPECS: Record<string, { height: string; weight: string; build: string }> = {
  'XS': { height: '157cm (5\'2")', weight: '50kg (110lbs)', build: 'Petite slim frame' },
  'S': { height: '163cm (5\'4")', weight: '57kg (125lbs)', build: 'Slim athletic frame' },
  'M': { height: '168cm (5\'6")', weight: '65kg (143lbs)', build: 'Average athletic frame' },
  'L': { height: '173cm (5\'8")', weight: '75kg (165lbs)', build: 'Sturdy athletic frame' },
  'XL': { height: '175cm (5\'9")', weight: '85kg (187lbs)', build: 'Large athletic frame' },
  'XXL': { height: '178cm (5\'10")', weight: '100kg (220lbs)', build: 'Plus size frame' },
  'XXXL': { height: '180cm (5\'11")', weight: '115kg (253lbs)', build: 'Very large frame' }
};

const SKIN_TONES: Record<string, string> = {
  'White': 'Fair with warm undertones',
  'Black': 'Rich deep brown',
  'Hispanic': 'Warm olive',
  'Asian': 'Fair with golden undertones',
  'Indian': 'Warm brown',
  'Southeast Asian': 'Light tan',
  'Indigenous': 'Warm reddish-brown',
  'Diverse': 'Warm caramel'
};

function generateYoungAdultPersona(ethnicity: string, sex: 'Female' | 'Male', size: string, sizeIndex: number): Persona {
  const names = sex === 'Female' ? FEMALE_NAMES[ethnicity] : MALE_NAMES[ethnicity];
  const name = names[sizeIndex];
  const specs = SIZE_SPECS[size];
  const skinTone = SKIN_TONES[ethnicity];
  const prefix = ethnicity.substring(0, 3).toUpperCase();
  const sexCode = sex === 'Female' ? 'F' : 'M';
  const id = `${prefix}_YA_${sexCode}_${size}_001`;
  const eyeColor = ['White'].includes(ethnicity) ? 'Blue' : ['Diverse'].includes(ethnicity) ? 'Hazel' : 'Dark brown';
  const hairColor = ['White', 'Diverse'].includes(ethnicity) ? 'Light brown' : 'Black';
  const hairStyle = sex === 'Female' ? 'Long flowing' : 'Short styled';

  return {
    id, name, age: 'Young Adult', sex, ethnicity: ethnicity as Ethnicity, size: size as Size,
    height: specs.height, weight: specs.weight, build: specs.build,
    facialFeatures: `Youthful ${sex.toLowerCase()} face with clear skin, bright ${eyeColor.toLowerCase()} eyes, fresh appearance`,
    hairStyle, hairColor, eyeColor, skinTone,
    fullDescription: `${name} is a ${20 + sizeIndex}-year-old young adult ${sex.toLowerCase()} of ${ethnicity} heritage, standing ${specs.height} tall and weighing approximately ${specs.weight}. ${sex === 'Female' ? 'She' : 'He'} has a ${specs.build} with youthful proportions. ${sex === 'Female' ? 'Her' : 'His'} face has clear skin, bright ${eyeColor.toLowerCase()} eyes, and a fresh youthful appearance. ${sex === 'Female' ? 'Her' : 'His'} ${hairColor.toLowerCase()} hair is styled in a ${hairStyle.toLowerCase()} manner.`
  };
}

export const YOUNG_ADULT_FEMALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as Record<Ethnicity, Record<Size, Persona[]>>;
export const YOUNG_ADULT_MALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as Record<Ethnicity, Record<Size, Persona[]>>;

ETHNICITIES.forEach(ethnicity => {
  YOUNG_ADULT_FEMALE_PERSONAS[ethnicity] = {} as Record<Size, Persona[]>;
  YOUNG_ADULT_MALE_PERSONAS[ethnicity] = {} as Record<Size, Persona[]>;
  SIZES.forEach((size, sizeIndex) => {
    YOUNG_ADULT_FEMALE_PERSONAS[ethnicity][size] = [generateYoungAdultPersona(ethnicity, 'Female', size, sizeIndex)];
    YOUNG_ADULT_MALE_PERSONAS[ethnicity][size] = [generateYoungAdultPersona(ethnicity, 'Male', size, sizeIndex)];
  });
});

export function getYoungAdultPersona(ethnicity: Ethnicity, sex: 'Female' | 'Male', size: Size): Persona | undefined {
  const collection = sex === 'Female' ? YOUNG_ADULT_FEMALE_PERSONAS : YOUNG_ADULT_MALE_PERSONAS;
  return collection[ethnicity]?.[size]?.[0];
}

export function getAllYoungAdultPersonas(): Persona[] {
  const all: Persona[] = [];
  ETHNICITIES.forEach(ethnicity => {
    SIZES.forEach(size => {
      const female = getYoungAdultPersona(ethnicity, 'Female', size);
      const male = getYoungAdultPersona(ethnicity, 'Male', size);
      if (female) all.push(female);
      if (male) all.push(male);
    });
  });
  return all;
}

export const YOUNG_ADULT_PERSONAS = { female: YOUNG_ADULT_FEMALE_PERSONAS, male: YOUNG_ADULT_MALE_PERSONAS };
