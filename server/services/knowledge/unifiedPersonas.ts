import { UnifiedPersona, AgeGroup, Sex, Ethnicity, Size } from '@shared/mockupTypes';
import { ADULT_PERSONAS } from './adultPersonas';
import { TEEN_PERSONAS } from './teenPersonas';
import { YOUNG_ADULT_PERSONAS } from './youngAdultPersonas';
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

export function getPersona(id: string): UnifiedPersona | undefined {
  return ALL_PERSONAS.find(persona => persona.id === id);
}

export function getPersonasByAgeGroup(ageGroup: AgeGroup): UnifiedPersona[] {
  const ageGroupIdPrefix: Record<AgeGroup, string> = {
    'Baby': 'baby-',
    'Toddler': 'toddler-',
    'Kids': 'kids-',
    'Teen': 'teen-',
    'Young Adult': 'young-adult-',
    'Adult': 'adult-',
    'Senior': 'senior-'
  };

  const prefix = ageGroupIdPrefix[ageGroup];
  if (!prefix) return [];

  return ALL_PERSONAS.filter(persona => persona.id.startsWith(prefix));
}

export function getPersonasBySex(sex: Sex): UnifiedPersona[] {
  return ALL_PERSONAS.filter(persona => persona.sex === sex);
}

export function getPersonasByEthnicity(ethnicity: Ethnicity): UnifiedPersona[] {
  return ALL_PERSONAS.filter(persona => persona.ethnicity === ethnicity);
}

export interface PersonaFilters {
  ageGroup?: AgeGroup;
  sex?: Sex;
  ethnicity?: Ethnicity;
  size?: Size | string;
}

export function getRandomPersona(filters?: PersonaFilters): UnifiedPersona {
  let personas = ALL_PERSONAS;

  if (filters) {
    if (filters.ageGroup) {
      const ageGroupIdPrefix: Record<AgeGroup, string> = {
        'Baby': 'baby-',
        'Toddler': 'toddler-',
        'Kids': 'kids-',
        'Teen': 'teen-',
        'Young Adult': 'young-adult-',
        'Adult': 'adult-',
        'Senior': 'senior-'
      };
      
      const prefix = ageGroupIdPrefix[filters.ageGroup];
      personas = personas.filter(p => p.id.startsWith(prefix));
    }

    if (filters.sex) {
      personas = personas.filter(p => p.sex === filters.sex);
    }

    if (filters.ethnicity && filters.ethnicity !== 'Diverse') {
      personas = personas.filter(p => p.ethnicity === filters.ethnicity);
    }

    if (filters.size) {
      const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
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
    return ALL_PERSONAS[Math.floor(Math.random() * ALL_PERSONAS.length)];
  }

  return personas[Math.floor(Math.random() * personas.length)];
}

export { ADULT_PERSONAS } from './adultPersonas';
export { TEEN_PERSONAS } from './teenPersonas';
export { YOUNG_ADULT_PERSONAS } from './youngAdultPersonas';
