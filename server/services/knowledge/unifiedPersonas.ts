import { UnifiedPersona, AgeGroup, Sex, Ethnicity, Size, ETHNICITY_CODES, AGE_CODES } from '@shared/mockupTypes';
import { ADULT_PERSONAS, getAdultPersona } from './adultPersonas';
import { TEEN_PERSONAS, getTeenPersona } from './teenPersonas';
import { YOUNG_ADULT_PERSONAS, getYoungAdultPersona } from './youngAdultPersonas';
import { BABY_PERSONAS } from './babyPersonas';
import { TODDLER_PERSONAS } from './toddlerPersonas';
import { KIDS_PERSONAS } from './kidsPersonas';
import { SENIOR_PERSONAS } from './seniorPersonas';

export const ALL_PERSONAS: UnifiedPersona[] = [
  ...BABY_PERSONAS,
  ...TODDLER_PERSONAS,
  ...KIDS_PERSONAS,
  ...TEEN_PERSONAS,
  ...YOUNG_ADULT_PERSONAS,
  ...ADULT_PERSONAS,
  ...SENIOR_PERSONAS
];

export const CORE_PERSONAS: UnifiedPersona[] = [
  ...TEEN_PERSONAS,
  ...YOUNG_ADULT_PERSONAS,
  ...ADULT_PERSONAS
];

export function getPersona(id: string): UnifiedPersona | undefined {
  return ALL_PERSONAS.find(persona => persona.id === id);
}

export function getPersonaByFilters(
  ethnicity: Ethnicity,
  sex: Sex,
  size: Size,
  ageGroup?: AgeGroup
): UnifiedPersona | undefined {
  const targetAgeGroup = ageGroup || 'Adult';
  
  switch (targetAgeGroup) {
    case 'Teen':
      return getTeenPersona(ethnicity, sex, size);
    case 'Young Adult':
      return getYoungAdultPersona(ethnicity, sex, size);
    case 'Adult':
      return getAdultPersona(ethnicity, sex, size);
    default:
      return getAdultPersona(ethnicity, sex, size);
  }
}

export function getPersonasByAgeGroup(ageGroup: AgeGroup): UnifiedPersona[] {
  switch (ageGroup) {
    case 'Teen':
      return TEEN_PERSONAS;
    case 'Young Adult':
      return YOUNG_ADULT_PERSONAS;
    case 'Adult':
      return ADULT_PERSONAS;
    case 'Baby':
      return BABY_PERSONAS;
    case 'Toddler':
      return TODDLER_PERSONAS;
    case 'Kids':
      return KIDS_PERSONAS;
    case 'Senior':
      return SENIOR_PERSONAS;
    default:
      return [];
  }
}

export function getPersonasBySex(sex: Sex): UnifiedPersona[] {
  return ALL_PERSONAS.filter(persona => persona.sex === sex);
}

export function getPersonasByEthnicity(ethnicity: Ethnicity): UnifiedPersona[] {
  return ALL_PERSONAS.filter(persona => persona.ethnicity === ethnicity);
}

export function getPersonasBySize(size: Size): UnifiedPersona[] {
  return ALL_PERSONAS.filter(persona => persona.size === size);
}

export interface PersonaFilters {
  ageGroup?: AgeGroup;
  sex?: Sex;
  ethnicity?: Ethnicity;
  size?: Size | string;
}

export function getRandomPersona(filters?: PersonaFilters): UnifiedPersona {
  let personas = CORE_PERSONAS;

  if (filters) {
    if (filters.ageGroup) {
      personas = getPersonasByAgeGroup(filters.ageGroup);
    }

    if (filters.sex) {
      personas = personas.filter(p => p.sex === filters.sex);
    }

    if (filters.ethnicity && filters.ethnicity !== 'Diverse') {
      personas = personas.filter(p => p.ethnicity === filters.ethnicity);
    }

    if (filters.size) {
      const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', '2XL', 'XXL', 'XXXL'];
      const requestedSizeIndex = sizeOrder.indexOf(filters.size as string);
      
      let sizeFilteredPersonas = personas.filter(p => p.size === filters.size);
      
      if (sizeFilteredPersonas.length === 0 && requestedSizeIndex >= 0) {
        for (let offset = 1; offset <= sizeOrder.length; offset++) {
          if (requestedSizeIndex - offset >= 0) {
            const smallerSize = sizeOrder[requestedSizeIndex - offset];
            sizeFilteredPersonas = personas.filter(p => p.size === smallerSize);
            if (sizeFilteredPersonas.length > 0) break;
          }
          if (requestedSizeIndex + offset < sizeOrder.length) {
            const largerSize = sizeOrder[requestedSizeIndex + offset];
            sizeFilteredPersonas = personas.filter(p => p.size === largerSize);
            if (sizeFilteredPersonas.length > 0) break;
          }
        }
      }
      
      if (sizeFilteredPersonas.length > 0) {
        personas = sizeFilteredPersonas;
      }
    }
  }

  if (personas.length === 0) {
    return CORE_PERSONAS[Math.floor(Math.random() * CORE_PERSONAS.length)];
  }

  return personas[Math.floor(Math.random() * personas.length)];
}

export function getExactPersona(
  ethnicity: Ethnicity,
  sex: Sex,
  size: Size,
  ageGroup: AgeGroup = 'Adult'
): UnifiedPersona | undefined {
  return getPersonaByFilters(ethnicity, sex, size, ageGroup);
}

export function generatePersonaId(
  ethnicity: Ethnicity,
  sex: Sex,
  size: Size,
  ageGroup: AgeGroup = 'Adult'
): string {
  const ethCode = ETHNICITY_CODES[ethnicity];
  const ageCode = AGE_CODES[ageGroup] || 'AD';
  const sexCode = sex === 'Female' ? 'F' : 'M';
  const sizeCode = size === '2XL' ? '2XL' : size;
  return `${ethCode}_${ageCode}_${sexCode}_${sizeCode}_001`;
}

export function parsePersonaId(id: string): {
  ethnicity?: Ethnicity;
  ageGroup?: AgeGroup;
  sex?: Sex;
  size?: Size;
} | null {
  const parts = id.split('_');
  if (parts.length < 4) return null;

  const ethCodeReverse: Record<string, Ethnicity> = {
    'WHT': 'White',
    'BLK': 'Black',
    'HSP': 'Hispanic',
    'ASN': 'Asian',
    'IND': 'Indian',
    'SEA': 'Southeast Asian',
    'IDG': 'Indigenous',
    'MDE': 'Middle Eastern'
  };

  const ageCodeReverse: Record<string, AgeGroup> = {
    'TN': 'Teen',
    'YA': 'Young Adult',
    'AD': 'Adult'
  };

  const sexCodeReverse: Record<string, Sex> = {
    'F': 'Female',
    'M': 'Male'
  };

  return {
    ethnicity: ethCodeReverse[parts[0]],
    ageGroup: ageCodeReverse[parts[1]],
    sex: sexCodeReverse[parts[2]],
    size: parts[3] as Size
  };
}

export function getPersonaStats(): {
  total: number;
  byAgeGroup: Record<string, number>;
  bySex: Record<string, number>;
  byEthnicity: Record<string, number>;
  bySize: Record<string, number>;
  coreTotal: number;
} {
  const stats = {
    total: ALL_PERSONAS.length,
    byAgeGroup: {} as Record<string, number>,
    bySex: { 'Male': 0, 'Female': 0 },
    byEthnicity: {} as Record<string, number>,
    bySize: {} as Record<string, number>,
    coreTotal: CORE_PERSONAS.length
  };

  ALL_PERSONAS.forEach(p => {
    const ageGroup = p.ageGroup || 'Unknown';
    stats.byAgeGroup[ageGroup] = (stats.byAgeGroup[ageGroup] || 0) + 1;
    stats.bySex[p.sex] = (stats.bySex[p.sex] || 0) + 1;
    stats.byEthnicity[p.ethnicity] = (stats.byEthnicity[p.ethnicity] || 0) + 1;
    stats.bySize[p.size] = (stats.bySize[p.size] || 0) + 1;
  });

  return stats;
}

export { ADULT_PERSONAS } from './adultPersonas';
export { TEEN_PERSONAS } from './teenPersonas';
export { YOUNG_ADULT_PERSONAS } from './youngAdultPersonas';
