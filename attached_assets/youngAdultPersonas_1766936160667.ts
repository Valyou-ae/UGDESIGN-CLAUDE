/**
 * ============================================================================
 * YOUNG ADULT PERSONAS (Ages 18-24)
 * ============================================================================
 * 96 Total: 8 Ethnicities × 6 Sizes × 2 Sexes
 */

import { Persona, Ethnicity, Size, ETHNICITY_CODES } from './types';

// ============================================================================
// NAME DATABASES
// ============================================================================

const FEMALE_NAMES: Record<Ethnicity, string[]> = {
  'White': ['Ashley', 'Brittany', 'Jessica', 'Stephanie', 'Nicole', 'Samantha'],
  'Black': ['Brianna', 'Kiara', 'Jazmine', 'Alicia', 'Shayla', 'Diamond'],
  'Hispanic': ['Daniela', 'Alejandra', 'Valeria', 'Fernanda', 'Andrea', 'Paula'],
  'Asian': ['Michelle', 'Christina', 'Angela', 'Tiffany', 'Grace', 'Amy'],
  'Indian': ['Neha', 'Pooja', 'Sneha', 'Shruti', 'Nikita', 'Pallavi'],
  'Southeast Asian': ['Thao', 'Kim', 'Hanh', 'Sumalee', 'Nari', 'Soraya'],
  'Indigenous': ['Sierra', 'Autumn', 'Willow', 'Raven', 'River', 'Sky'],
  'Middle Eastern': ['Aisha', 'Dina', 'Lina', 'Mira', 'Rana', 'Salma']
};

const MALE_NAMES: Record<Ethnicity, string[]> = {
  'White': ['Brandon', 'Tyler', 'Ryan', 'Justin', 'Kyle', 'Derek'],
  'Black': ['DeShawn', 'Tyrell', 'Marquis', 'Rashad', 'Jalen', 'Terrence'],
  'Hispanic': ['Alejandro', 'Fernando', 'Eduardo', 'Javier', 'Pablo', 'Sergio'],
  'Asian': ['Kevin', 'Brian', 'Daniel', 'Eric', 'Jason', 'Andrew'],
  'Indian': ['Rahul', 'Nikhil', 'Karan', 'Siddharth', 'Varun', 'Aryan'],
  'Southeast Asian': ['Tran', 'Vinh', 'Dao', 'Prem', 'Arun', 'Sak'],
  'Indigenous': ['Hunter', 'Hawk', 'Bear', 'Wolf', 'Storm', 'River'],
  'Middle Eastern': ['Ali', 'Rami', 'Sami', 'Nabil', 'Kareem', 'Jamal']
};

// ============================================================================
// SIZE SPECIFICATIONS
// ============================================================================

const FEMALE_SIZE_SPECS: Record<Size, { height: string; weight: string; build: string }> = {
  'XS': { height: '155cm (5\'1")', weight: '48kg (106lbs)', build: 'Petite slim frame' },
  'S': { height: '160cm (5\'3")', weight: '54kg (119lbs)', build: 'Slim athletic frame' },
  'M': { height: '165cm (5\'5")', weight: '61kg (134lbs)', build: 'Average athletic frame' },
  'L': { height: '170cm (5\'7")', weight: '70kg (154lbs)', build: 'Sturdy athletic frame' },
  'XL': { height: '173cm (5\'8")', weight: '82kg (181lbs)', build: 'Large athletic frame' },
  '2XL': { height: '175cm (5\'9")', weight: '95kg (209lbs)', build: 'Plus size frame' }
};

const MALE_SIZE_SPECS: Record<Size, { height: string; weight: string; build: string }> = {
  'XS': { height: '163cm (5\'4")', weight: '57kg (126lbs)', build: 'Slim lean frame' },
  'S': { height: '168cm (5\'6")', weight: '65kg (143lbs)', build: 'Slim athletic frame' },
  'M': { height: '175cm (5\'9")', weight: '75kg (165lbs)', build: 'Average athletic frame' },
  'L': { height: '180cm (5\'11")', weight: '86kg (190lbs)', build: 'Sturdy muscular frame' },
  'XL': { height: '183cm (6\'0")', weight: '98kg (216lbs)', build: 'Large muscular frame' },
  '2XL': { height: '185cm (6\'1")', weight: '113kg (249lbs)', build: 'Very large frame' }
};

// ============================================================================
// ETHNICITY-SPECIFIC CHARACTERISTICS
// ============================================================================

const SKIN_TONES: Record<Ethnicity, string> = {
  'White': 'Fair with fresh glow',
  'Black': 'Rich brown with vibrant glow',
  'Hispanic': 'Warm olive with fresh glow',
  'Asian': 'Fair with golden undertones',
  'Indian': 'Warm brown with healthy glow',
  'Southeast Asian': 'Light tan with warm glow',
  'Indigenous': 'Warm reddish-brown',
  'Middle Eastern': 'Olive with warm vibrant glow'
};

const EYE_COLORS: Record<Ethnicity, string> = {
  'White': 'Blue-green',
  'Black': 'Dark brown',
  'Hispanic': 'Warm brown',
  'Asian': 'Dark brown',
  'Indian': 'Dark brown',
  'Southeast Asian': 'Dark brown',
  'Indigenous': 'Dark brown',
  'Middle Eastern': 'Dark brown'
};

const HAIR_COLORS: Record<Ethnicity, string> = {
  'White': 'Light brown',
  'Black': 'Black',
  'Hispanic': 'Dark brown',
  'Asian': 'Black',
  'Indian': 'Black',
  'Southeast Asian': 'Black',
  'Indigenous': 'Black',
  'Middle Eastern': 'Dark brown to black'
};

const FACIAL_FEATURES: Record<Ethnicity, { female: string; male: string }> = {
  'White': {
    female: 'Fresh youthful features, bright eyes, clear complexion',
    male: 'Young defined features, bright eyes, clean jawline'
  },
  'Black': {
    female: 'Vibrant youthful glow, full lips, bright expressive eyes',
    male: 'Strong young features, confident expression, bright eyes'
  },
  'Hispanic': {
    female: 'Fresh warm glow, expressive eyes, youthful beauty',
    male: 'Young strong features, warm expression, defined jaw'
  },
  'Asian': {
    female: 'Fresh youthful features, almond eyes, porcelain skin',
    male: 'Clean young features, almond eyes, smooth complexion'
  },
  'Indian': {
    female: 'Fresh glow, expressive dark eyes, elegant young features',
    male: 'Young strong features, expressive eyes, confident presence'
  },
  'Southeast Asian': {
    female: 'Fresh soft features, warm eyes, gentle youthful beauty',
    male: 'Young warm features, friendly eyes, approachable expression'
  },
  'Indigenous': {
    female: 'High cheekbones, youthful strength, natural vibrant beauty',
    male: 'High cheekbones, strong young features, confident bearing'
  },
  'Middle Eastern': {
    female: 'Striking dark eyes, fresh elegant features, vibrant beauty',
    male: 'Strong young features, dark expressive eyes, confident presence'
  }
};

// ============================================================================
// PERSONA GENERATOR FUNCTION
// ============================================================================

function generateYoungAdultPersona(
  ethnicity: Ethnicity,
  sex: 'Female' | 'Male',
  size: Size,
  sizeIndex: number
): Persona {
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
  const id = `${prefix}_YA_${sexCode}_${sizeCode}_001`;
  
  const hairStyle = sex === 'Female' ? 'Long flowing contemporary style' : 'Short modern styled';
  const age = 18 + sizeIndex; // Ages 18-23 across sizes
  const pronoun = sex === 'Female' ? 'She' : 'He';
  const possessive = sex === 'Female' ? 'Her' : 'His';

  const fullDescription = `${name} is a ${age}-year-old young adult ${sex.toLowerCase()} of ${ethnicity} heritage, standing ${specs.height} tall and weighing approximately ${specs.weight}. ${pronoun} has a ${specs.build} with youthful proportions. ${possessive} face shows ${facialFeatures}. ${pronoun} has ${hairStyle.toLowerCase()} ${hairColor.toLowerCase()} hair and ${eyeColor.toLowerCase()} eyes. ${possessive} ${skinTone.toLowerCase()} skin is fresh and vibrant. ${name} exudes youthful energy and contemporary style.`;

  return {
    id,
    name,
    age: 'Young Adult',
    ageRange: '18-24',
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

// ============================================================================
// GENERATE ALL YOUNG ADULT PERSONAS
// ============================================================================

const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
const ETHNICITIES: Ethnicity[] = [
  'White', 'Black', 'Hispanic', 'Asian', 
  'Indian', 'Southeast Asian', 'Indigenous', 'Middle Eastern'
];

export const youngAdultPersonas: Persona[] = [];

// Generate all combinations
ETHNICITIES.forEach(ethnicity => {
  ['Female', 'Male'].forEach(sex => {
    SIZES.forEach((size, index) => {
      youngAdultPersonas.push(
        generateYoungAdultPersona(ethnicity, sex as 'Female' | 'Male', size, index)
      );
    });
  });
});

// ============================================================================
// LOOKUP HELPERS
// ============================================================================

export function getYoungAdultPersona(
  ethnicity: Ethnicity,
  sex: 'Female' | 'Male',
  size: Size
): Persona | undefined {
  return youngAdultPersonas.find(
    p => p.ethnicity === ethnicity && p.sex === sex && p.size === size
  );
}

export function getYoungAdultPersonasByEthnicity(ethnicity: Ethnicity): Persona[] {
  return youngAdultPersonas.filter(p => p.ethnicity === ethnicity);
}

export function getYoungAdultPersonasBySex(sex: 'Female' | 'Male'): Persona[] {
  return youngAdultPersonas.filter(p => p.sex === sex);
}

export function getYoungAdultPersonasBySize(size: Size): Persona[] {
  return youngAdultPersonas.filter(p => p.size === size);
}

// Total: 96 Young Adult Personas (8 ethnicities × 6 sizes × 2 sexes)
export default youngAdultPersonas;
