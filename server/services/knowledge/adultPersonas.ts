import { UnifiedPersona, Ethnicity, Size, ETHNICITY_CODES } from '@shared/mockupTypes';

const FEMALE_NAMES: Record<string, string[]> = {
  'White': ['Jennifer', 'Sarah', 'Michelle', 'Laura', 'Karen', 'Amanda'],
  'Black': ['Keisha', 'Tamika', 'Latoya', 'Ebony', 'Monique', 'Tanya'],
  'Hispanic': ['Maria', 'Carmen', 'Rosa', 'Elena', 'Patricia', 'Guadalupe'],
  'Asian': ['Yuki', 'Mei', 'Lin', 'Sakura', 'Hana', 'Yuna'],
  'Indian': ['Priya', 'Ananya', 'Divya', 'Lakshmi', 'Sunita', 'Meera'],
  'Southeast Asian': ['Linh', 'Mai', 'Nguyet', 'Lawan', 'Mali', 'Sita'],
  'Indigenous': ['Kaya', 'Aiyana', 'Winona', 'Chenoa', 'Halona', 'Takoda'],
  'Middle Eastern': ['Fatima', 'Layla', 'Zahra', 'Amira', 'Nadia', 'Yasmin']
};

const MALE_NAMES: Record<string, string[]> = {
  'White': ['Michael', 'David', 'Christopher', 'Robert', 'William', 'Thomas'],
  'Black': ['Marcus', 'Jamal', 'Darnell', 'Terrell', 'Maurice', 'Jerome'],
  'Hispanic': ['Carlos', 'Miguel', 'Ricardo', 'Jose', 'Luis', 'Antonio'],
  'Asian': ['Kenji', 'Hiroshi', 'Chen', 'Wei', 'Takeshi', 'Akira'],
  'Indian': ['Raj', 'Amit', 'Vikram', 'Deepak', 'Suresh', 'Anil'],
  'Southeast Asian': ['Somchai', 'Nguyen', 'Boun', 'Kiet', 'Phong', 'Tuan'],
  'Indigenous': ['Chayton', 'Takoda', 'Ahanu', 'Koda', 'Elan', 'Mato'],
  'Middle Eastern': ['Omar', 'Khalid', 'Ahmed', 'Yusuf', 'Hassan', 'Tariq']
};

const FEMALE_SIZE_SPECS: Record<string, { height: string; weight: string; build: string }> = {
  'XS': { height: '157cm (5\'2")', weight: '50kg (110lbs)', build: 'Petite slim frame' },
  'S': { height: '163cm (5\'4")', weight: '57kg (125lbs)', build: 'Slim athletic frame' },
  'M': { height: '168cm (5\'6")', weight: '65kg (143lbs)', build: 'Average athletic frame' },
  'L': { height: '173cm (5\'8")', weight: '75kg (165lbs)', build: 'Sturdy athletic frame' },
  'XL': { height: '175cm (5\'9")', weight: '85kg (187lbs)', build: 'Large athletic frame' },
  '2XL': { height: '178cm (5\'10")', weight: '100kg (220lbs)', build: 'Plus size frame' }
};

const MALE_SIZE_SPECS: Record<string, { height: string; weight: string; build: string }> = {
  'XS': { height: '165cm (5\'5")', weight: '60kg (132lbs)', build: 'Slim lean frame' },
  'S': { height: '170cm (5\'7")', weight: '68kg (150lbs)', build: 'Slim athletic frame' },
  'M': { height: '178cm (5\'10")', weight: '79kg (174lbs)', build: 'Average athletic frame' },
  'L': { height: '183cm (6\'0")', weight: '90kg (198lbs)', build: 'Sturdy muscular frame' },
  'XL': { height: '185cm (6\'1")', weight: '102kg (225lbs)', build: 'Large muscular frame' },
  '2XL': { height: '188cm (6\'2")', weight: '118kg (260lbs)', build: 'Very large frame' }
};

const SKIN_TONES: Record<string, string> = {
  'White': 'Fair with warm undertones',
  'Black': 'Rich deep brown',
  'Hispanic': 'Warm olive',
  'Asian': 'Fair with golden undertones',
  'Indian': 'Warm brown',
  'Southeast Asian': 'Light tan with golden undertones',
  'Indigenous': 'Warm reddish-brown',
  'Middle Eastern': 'Olive with warm undertones'
};

const EYE_COLORS: Record<string, string> = {
  'White': 'Blue',
  'Black': 'Dark brown',
  'Hispanic': 'Warm brown',
  'Asian': 'Dark brown',
  'Indian': 'Dark brown',
  'Southeast Asian': 'Dark brown',
  'Indigenous': 'Dark brown',
  'Middle Eastern': 'Dark brown'
};

const HAIR_COLORS: Record<string, string> = {
  'White': 'Light brown',
  'Black': 'Black',
  'Hispanic': 'Dark brown',
  'Asian': 'Black',
  'Indian': 'Black',
  'Southeast Asian': 'Black',
  'Indigenous': 'Black',
  'Middle Eastern': 'Dark brown'
};

const FACIAL_FEATURES: Record<string, { female: string; male: string }> = {
  'White': {
    female: 'Defined features, bright eyes, mature elegance',
    male: 'Strong jawline, defined features, mature presence'
  },
  'Black': {
    female: 'Full lips, high cheekbones, radiant skin',
    male: 'Strong features, broad nose, confident expression'
  },
  'Hispanic': {
    female: 'Warm expressive eyes, defined cheekbones, natural beauty',
    male: 'Strong features, warm expression, defined jaw'
  },
  'Asian': {
    female: 'Delicate features, almond eyes, graceful appearance',
    male: 'Clean features, almond eyes, composed expression'
  },
  'Indian': {
    female: 'Expressive dark eyes, elegant bone structure, warm glow',
    male: 'Strong features, expressive eyes, dignified presence'
  },
  'Southeast Asian': {
    female: 'Soft features, warm eyes, gentle expression',
    male: 'Warm features, friendly eyes, approachable expression'
  },
  'Indigenous': {
    female: 'High cheekbones, strong features, natural dignity',
    male: 'High cheekbones, strong angular features, proud presence'
  },
  'Middle Eastern': {
    female: 'Striking dark eyes, defined features, elegant bone structure',
    male: 'Strong defined features, dark expressive eyes, distinguished presence'
  }
};

function generateAdultPersona(
  ethnicity: Ethnicity,
  sex: 'Female' | 'Male',
  size: Size,
  sizeIndex: number
): UnifiedPersona {
  const names = sex === 'Female' ? FEMALE_NAMES[ethnicity] : MALE_NAMES[ethnicity];
  const name = names[sizeIndex];
  const specs = sex === 'Female' ? FEMALE_SIZE_SPECS[size] : MALE_SIZE_SPECS[size];
  const skinTone = SKIN_TONES[ethnicity];
  const eyeColor = EYE_COLORS[ethnicity];
  const hairColor = HAIR_COLORS[ethnicity];
  const facialFeatures = FACIAL_FEATURES[ethnicity][sex.toLowerCase() as 'female' | 'male'];

  const prefix = ETHNICITY_CODES[ethnicity];
  const sexCode = sex === 'Female' ? 'F' : 'M';
  const sizeCode = size === '2XL' ? '2XL' : size;
  const id = `${prefix}_AD_${sexCode}_${sizeCode}_001`;

  const hairStyle = sex === 'Female' ? 'Styled professionally' : 'Short professional cut';
  const age = 25 + (sizeIndex * 3);
  const pronoun = sex === 'Female' ? 'She' : 'He';
  const possessive = sex === 'Female' ? 'Her' : 'His';

  const fullDescription = `${name} is a ${age}-year-old adult ${sex.toLowerCase()} of ${ethnicity} heritage, standing ${specs.height} tall and weighing approximately ${specs.weight}. ${pronoun} has a ${specs.build}. ${possessive} face shows ${facialFeatures}. ${pronoun} has ${hairStyle.toLowerCase()} ${hairColor.toLowerCase()} hair and ${eyeColor.toLowerCase()} eyes. ${possessive} ${skinTone.toLowerCase()} skin has a healthy mature glow. ${name} carries ${sex === 'Female' ? 'herself' : 'himself'} with confident adult presence.`;

  return {
    id,
    name,
    age: String(age),
    ageGroup: 'Adult',
    ageRange: '25-45',
    sex,
    ethnicity,
    size,
    height: specs.height,
    weight: specs.weight,
    build: specs.build,
    facialFeatures,
    hairStyle,
    hairColor,
    eyeColor,
    skinTone,
    fullDescription,
    version: '2.0',
    createdDate: '2025-12-28'
  };
}

const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
const ETHNICITIES: Ethnicity[] = [
  'White', 'Black', 'Hispanic', 'Asian',
  'Indian', 'Southeast Asian', 'Indigenous', 'Middle Eastern'
];

export const ADULT_PERSONAS: UnifiedPersona[] = [];

ETHNICITIES.forEach(ethnicity => {
  (['Female', 'Male'] as const).forEach(sex => {
    SIZES.forEach((size, index) => {
      ADULT_PERSONAS.push(
        generateAdultPersona(ethnicity, sex, size, index)
      );
    });
  });
});

export function getAdultPersona(
  ethnicity: Ethnicity,
  sex: 'Female' | 'Male',
  size: Size
): UnifiedPersona | undefined {
  return ADULT_PERSONAS.find(
    p => p.ethnicity === ethnicity && p.sex === sex && p.size === size
  );
}

export function getAdultPersonasByEthnicity(ethnicity: Ethnicity): UnifiedPersona[] {
  return ADULT_PERSONAS.filter(p => p.ethnicity === ethnicity);
}

export function getAdultPersonasBySex(sex: 'Female' | 'Male'): UnifiedPersona[] {
  return ADULT_PERSONAS.filter(p => p.sex === sex);
}

export function getAdultPersonasBySize(size: Size): UnifiedPersona[] {
  return ADULT_PERSONAS.filter(p => p.size === size);
}

export default ADULT_PERSONAS;
