import { Persona, Ethnicity, Size } from './types';

const ETHNICITIES = ['White', 'Black', 'Hispanic', 'Asian', 'Indian', 'Southeast Asian', 'Indigenous', 'Diverse'] as const;
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

const FEMALE_NAMES: Record<string, string[]> = {
  'White': ['Margaret', 'Patricia', 'Barbara', 'Elizabeth', 'Dorothy', 'Helen', 'Ruth'],
  'Black': ['Gladys', 'Bernice', 'Delores', 'Mildred', 'Ernestine', 'Shirley', 'Lorraine'],
  'Hispanic': ['Rosa', 'Carmen', 'Dolores', 'Esperanza', 'Guadalupe', 'Beatriz', 'Teresa'],
  'Asian': ['Sachiko', 'Mei Ling', 'Akiko', 'Chiyo', 'Fumiko', 'Haruko', 'Keiko'],
  'Indian': ['Lakshmi', 'Kamala', 'Sarita', 'Padma', 'Meena', 'Gita', 'Sushila'],
  'Southeast Asian': ['Bua', 'Dao', 'Phuong', 'Lan', 'Hoa', 'Mai', 'Nguyet'],
  'Indigenous': ['Winona', 'Aiyana', 'Halona', 'Chenoa', 'Onawa', 'Kaya', 'Naira'],
  'Diverse': ['Sylvia', 'Gloria', 'Vera', 'Iris', 'Pearl', 'Opal', 'Ruby']
};

const MALE_NAMES: Record<string, string[]> = {
  'White': ['Robert', 'William', 'Richard', 'Thomas', 'Charles', 'George', 'Donald'],
  'Black': ['Willie', 'James', 'Henry', 'Samuel', 'Walter', 'Eugene', 'Roosevelt'],
  'Hispanic': ['Jose', 'Miguel', 'Roberto', 'Antonio', 'Francisco', 'Manuel', 'Luis'],
  'Asian': ['Hiroshi', 'Takeshi', 'Masao', 'Kenji', 'Tadashi', 'Yoshio', 'Akira'],
  'Indian': ['Ramesh', 'Suresh', 'Mahesh', 'Rajesh', 'Dinesh', 'Mohan', 'Krishna'],
  'Southeast Asian': ['Somchai', 'Boun', 'Phong', 'Tuan', 'Nguyen', 'Duc', 'Minh'],
  'Indigenous': ['Chayton', 'Takoda', 'Ahanu', 'Koda', 'Mato', 'Elan', 'Nikan'],
  'Diverse': ['Samuel', 'Bernard', 'Raymond', 'Leonard', 'Harold', 'Warren', 'Clarence']
};

const SIZE_SPECS: Record<string, { height: string; weight: string; build: string }> = {
  'XS': { height: '157cm (5\'2")', weight: '48kg (106lbs)', build: 'Petite slender frame' },
  'S': { height: '160cm (5\'3")', weight: '54kg (119lbs)', build: 'Slim graceful frame' },
  'M': { height: '163cm (5\'4")', weight: '63kg (139lbs)', build: 'Average build with soft curves' },
  'L': { height: '165cm (5\'5")', weight: '73kg (161lbs)', build: 'Full figured with dignified presence' },
  'XL': { height: '166cm (5\'5.5")', weight: '84kg (185lbs)', build: 'Large frame with comfortable proportions' },
  'XXL': { height: '168cm (5\'6")', weight: '97kg (214lbs)', build: 'Plus size with matronly presence' },
  'XXXL': { height: '170cm (5\'7")', weight: '113kg (249lbs)', build: 'Very large frame with grandmother presence' }
};

const SKIN_TONES: Record<string, string> = {
  'White': 'Fair with age spots and fine lines',
  'Black': 'Rich dark brown with mature glow',
  'Hispanic': 'Warm olive with distinguished lines',
  'Asian': 'Fair with golden undertones and wisdom lines',
  'Indian': 'Warm brown with graceful aging',
  'Southeast Asian': 'Light tan with natural aging',
  'Indigenous': 'Warm reddish-brown with distinguished features',
  'Diverse': 'Warm caramel with graceful aging'
};

function generateSeniorPersona(ethnicity: string, sex: 'Female' | 'Male', size: string, sizeIndex: number): Persona {
  const names = sex === 'Female' ? FEMALE_NAMES[ethnicity] : MALE_NAMES[ethnicity];
  const name = names[sizeIndex];
  const specs = SIZE_SPECS[size];
  const skinTone = SKIN_TONES[ethnicity];
  const prefix = ethnicity.substring(0, 3).toUpperCase();
  const sexCode = sex === 'Female' ? 'F' : 'M';
  const id = `${prefix}_SR_${sexCode}_${size}_001`;
  const eyeColor = ['White'].includes(ethnicity) ? 'Blue' : ['Diverse'].includes(ethnicity) ? 'Hazel' : 'Dark brown';
  const hairColor = 'Silver gray';
  const hairStyle = sex === 'Female' ? 'Short elegant silver' : 'Short distinguished gray';

  return {
    id, name, age: 'Senior', sex, ethnicity: ethnicity as Ethnicity, size: size as Size,
    height: specs.height, weight: specs.weight, build: specs.build,
    facialFeatures: `Distinguished ${sex.toLowerCase()} face with wisdom lines, gentle ${eyeColor.toLowerCase()} eyes, warm expression`,
    hairStyle, hairColor, eyeColor, skinTone,
    fullDescription: `${name} is a distinguished senior ${sex.toLowerCase()} in ${sex === 'Female' ? 'her' : 'his'} ${60 + sizeIndex * 3}s of ${ethnicity} heritage, standing ${specs.height} tall and weighing approximately ${specs.weight}. ${sex === 'Female' ? 'She' : 'He'} has a ${specs.build} with mature proportions. ${sex === 'Female' ? 'Her' : 'His'} face has distinguished wisdom lines, gentle ${eyeColor.toLowerCase()} eyes, and a warm welcoming expression. ${sex === 'Female' ? 'Her' : 'His'} ${hairColor.toLowerCase()} hair is styled in a ${hairStyle.toLowerCase()} manner.`
  };
}

export const SENIOR_FEMALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as Record<Ethnicity, Record<Size, Persona[]>>;
export const SENIOR_MALE_PERSONAS: Record<Ethnicity, Record<Size, Persona[]>> = {} as Record<Ethnicity, Record<Size, Persona[]>>;

ETHNICITIES.forEach(ethnicity => {
  SENIOR_FEMALE_PERSONAS[ethnicity] = {} as Record<Size, Persona[]>;
  SENIOR_MALE_PERSONAS[ethnicity] = {} as Record<Size, Persona[]>;
  SIZES.forEach((size, sizeIndex) => {
    SENIOR_FEMALE_PERSONAS[ethnicity][size] = [generateSeniorPersona(ethnicity, 'Female', size, sizeIndex)];
    SENIOR_MALE_PERSONAS[ethnicity][size] = [generateSeniorPersona(ethnicity, 'Male', size, sizeIndex)];
  });
});

export function getSeniorPersona(ethnicity: Ethnicity, sex: 'Female' | 'Male', size: Size): Persona | undefined {
  const collection = sex === 'Female' ? SENIOR_FEMALE_PERSONAS : SENIOR_MALE_PERSONAS;
  return collection[ethnicity]?.[size]?.[0];
}

export function getAllSeniorPersonas(): Persona[] {
  const all: Persona[] = [];
  ETHNICITIES.forEach(ethnicity => {
    SIZES.forEach(size => {
      const female = getSeniorPersona(ethnicity, 'Female', size);
      const male = getSeniorPersona(ethnicity, 'Male', size);
      if (female) all.push(female);
      if (male) all.push(male);
    });
  });
  return all;
}

export const SENIOR_PERSONAS = { female: SENIOR_FEMALE_PERSONAS, male: SENIOR_MALE_PERSONAS };
