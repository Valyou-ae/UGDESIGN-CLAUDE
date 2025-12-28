import { UnifiedPersona, Ethnicity, Size, ETHNICITY_CODES } from '@shared/mockupTypes';

const FEMALE_NAMES: Record<string, string[]> = {
  'White': ['Emma', 'Olivia', 'Sophia', 'Ava', 'Isabella', 'Mia'],
  'Black': ['Aaliyah', 'Imani', 'Zara', 'Nia', 'Destiny', 'Jasmine'],
  'Hispanic': ['Sofia', 'Valentina', 'Camila', 'Luna', 'Mariana', 'Isabella'],
  'Asian': ['Mei', 'Sakura', 'Yuki', 'Hana', 'Lily', 'Jade'],
  'Indian': ['Aanya', 'Ishita', 'Kavya', 'Riya', 'Saanvi', 'Diya'],
  'Southeast Asian': ['Mai', 'Linh', 'Thuy', 'Anh', 'Dara', 'Srey'],
  'Indigenous': ['Kaya', 'Nova', 'Aiyana', 'Winona', 'Dakota', 'Chenoa'],
  'Middle Eastern': ['Leila', 'Mariam', 'Sara', 'Noor', 'Hana', 'Rania']
};

const MALE_NAMES: Record<string, string[]> = {
  'White': ['Ethan', 'Liam', 'Noah', 'Mason', 'Lucas', 'Oliver'],
  'Black': ['Jordan', 'Jayden', 'Malik', 'Darius', 'Xavier', 'Elijah'],
  'Hispanic': ['Diego', 'Mateo', 'Santiago', 'Sebastian', 'Adrian', 'Gabriel'],
  'Asian': ['Kai', 'Ryu', 'Jin', 'Hiro', 'Tao', 'Ken'],
  'Indian': ['Arjun', 'Dev', 'Rohan', 'Aditya', 'Vivaan', 'Krishna'],
  'Southeast Asian': ['Lian', 'Minh', 'Thanh', 'Phan', 'Bao', 'Duc'],
  'Indigenous': ['Takoda', 'Koda', 'Chayton', 'Elan', 'Nikan', 'Ahanu'],
  'Middle Eastern': ['Adam', 'Zaid', 'Karim', 'Amir', 'Faisal', 'Bilal']
};

const FEMALE_SIZE_SPECS: Record<string, { height: string; weight: string; build: string }> = {
  'XS': { height: '150cm (4\'11")', weight: '42kg (93lbs)', build: 'Petite teen frame' },
  'S': { height: '155cm (5\'1")', weight: '48kg (106lbs)', build: 'Slim teen frame' },
  'M': { height: '160cm (5\'3")', weight: '54kg (119lbs)', build: 'Average teen frame' },
  'L': { height: '165cm (5\'5")', weight: '62kg (137lbs)', build: 'Sturdy teen frame' },
  'XL': { height: '168cm (5\'6")', weight: '72kg (159lbs)', build: 'Large teen frame' },
  '2XL': { height: '170cm (5\'7")', weight: '82kg (181lbs)', build: 'Plus size teen frame' }
};

const MALE_SIZE_SPECS: Record<string, { height: string; weight: string; build: string }> = {
  'XS': { height: '155cm (5\'1")', weight: '45kg (99lbs)', build: 'Slim lanky teen frame' },
  'S': { height: '163cm (5\'4")', weight: '52kg (115lbs)', build: 'Slim athletic teen frame' },
  'M': { height: '170cm (5\'7")', weight: '61kg (134lbs)', build: 'Average teen frame' },
  'L': { height: '175cm (5\'9")', weight: '70kg (154lbs)', build: 'Sturdy teen frame' },
  'XL': { height: '180cm (5\'11")', weight: '82kg (181lbs)', build: 'Large athletic teen frame' },
  '2XL': { height: '183cm (6\'0")', weight: '95kg (209lbs)', build: 'Very large teen frame' }
};

const SKIN_TONES: Record<string, string> = {
  'White': 'Fair with youthful glow',
  'Black': 'Rich brown with youthful glow',
  'Hispanic': 'Warm olive with youthful glow',
  'Asian': 'Fair with golden undertones',
  'Indian': 'Warm brown with youthful glow',
  'Southeast Asian': 'Light tan with youthful glow',
  'Indigenous': 'Warm reddish-brown',
  'Middle Eastern': 'Olive with warm youthful glow'
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
    female: 'Youthful features, bright eyes, clear skin',
    male: 'Youthful features, developing jawline, bright eyes'
  },
  'Black': {
    female: 'Youthful glow, full lips, bright expressive eyes',
    male: 'Youthful features, strong emerging features, bright eyes'
  },
  'Hispanic': {
    female: 'Warm youthful glow, expressive eyes, soft features',
    male: 'Youthful warmth, developing features, warm brown eyes'
  },
  'Asian': {
    female: 'Delicate youthful features, almond eyes, clear skin',
    male: 'Clean youthful features, almond eyes, smooth skin'
  },
  'Indian': {
    female: 'Youthful glow, expressive dark eyes, soft features',
    male: 'Youthful features, expressive eyes, developing frame'
  },
  'Southeast Asian': {
    female: 'Soft youthful features, warm eyes, gentle smile',
    male: 'Youthful warm features, friendly eyes, developing frame'
  },
  'Indigenous': {
    female: 'High cheekbones, youthful strength, natural beauty',
    male: 'High cheekbones, developing strong features, proud bearing'
  },
  'Middle Eastern': {
    female: 'Striking dark eyes, youthful glow, elegant features',
    male: 'Developing strong features, dark expressive eyes, youthful presence'
  }
};

function generateTeenPersona(
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
  const id = `${prefix}_TN_${sexCode}_${sizeCode}_001`;

  const hairStyle = sex === 'Female' ? 'Long trendy style' : 'Short trendy cut';
  const age = 13 + sizeIndex;
  const pronoun = sex === 'Female' ? 'She' : 'He';
  const possessive = sex === 'Female' ? 'Her' : 'His';

  const fullDescription = `${name} is a ${age}-year-old teen ${sex.toLowerCase()} of ${ethnicity} heritage, standing ${specs.height} tall and weighing approximately ${specs.weight}. ${pronoun} has a ${specs.build} with developing teen proportions. ${possessive} face shows ${facialFeatures}. ${pronoun} has ${hairStyle.toLowerCase()} ${hairColor.toLowerCase()} hair and bright ${eyeColor.toLowerCase()} eyes. ${possessive} ${skinTone.toLowerCase()} skin is clear and youthful. ${name} has an energetic teen presence.`;

  return {
    id,
    name,
    age: String(age),
    ageGroup: 'Teen',
    ageRange: '13-17',
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

export const TEEN_PERSONAS: UnifiedPersona[] = [];

ETHNICITIES.forEach(ethnicity => {
  (['Female', 'Male'] as const).forEach(sex => {
    SIZES.forEach((size, index) => {
      TEEN_PERSONAS.push(
        generateTeenPersona(ethnicity, sex, size, index)
      );
    });
  });
});

export function getTeenPersona(
  ethnicity: Ethnicity,
  sex: 'Female' | 'Male',
  size: Size
): UnifiedPersona | undefined {
  return TEEN_PERSONAS.find(
    p => p.ethnicity === ethnicity && p.sex === sex && p.size === size
  );
}

export function getTeenPersonasByEthnicity(ethnicity: Ethnicity): UnifiedPersona[] {
  return TEEN_PERSONAS.filter(p => p.ethnicity === ethnicity);
}

export function getTeenPersonasBySex(sex: 'Female' | 'Male'): UnifiedPersona[] {
  return TEEN_PERSONAS.filter(p => p.sex === sex);
}

export function getTeenPersonasBySize(size: Size): UnifiedPersona[] {
  return TEEN_PERSONAS.filter(p => p.size === size);
}

export default TEEN_PERSONAS;
