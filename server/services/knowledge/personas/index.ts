import { Persona, AgeGroup, Ethnicity, Size, Sex, ETHNICITIES, SIZES, AGE_GROUPS } from './types';
import { getAllBabyPersonas, getBabyPersona } from './babyPersonas';
import { getAllToddlerPersonas, getToddlerPersona } from './toddlerPersonas';
import { getAllKidsPersonas, getKidsPersona } from './kidsPersonas';
import { getAllTeenPersonas, getTeenPersona } from './teenPersonas';
import { getAllYoungAdultPersonas, getYoungAdultPersona } from './youngAdultPersonas';
import { getAllAdultPersonas, getAdultPersona } from './adultPersonas';
import { getAllSeniorPersonas, getSeniorPersona } from './seniorPersonas';

export * from './types';
export * from './babyPersonas';
export * from './toddlerPersonas';
export * from './kidsPersonas';
export * from './teenPersonas';
export * from './youngAdultPersonas';
export * from './adultPersonas';
export * from './seniorPersonas';

export const AGE_GROUP_SPECS = {
  'Baby': { ageRange: '0-2', count: 112 },
  'Toddler': { ageRange: '2-5', count: 112 },
  'Kids': { ageRange: '6-12', count: 112 },
  'Teen': { ageRange: '13-17', count: 112 },
  'Young Adult': { ageRange: '18-29', count: 112 },
  'Adult': { ageRange: '30-50', count: 112 },
  'Senior': { ageRange: '50+', count: 112 }
};

export const PERSONA_STATS = {
  totalPersonas: 784,
  ageGroups: 7,
  ethnicities: 8,
  sizes: 7,
  sexes: 2,
  personasPerAgeGroup: 112
};

export function getPersona(
  ageGroup: AgeGroup,
  ethnicity: Ethnicity,
  sex: Sex,
  size: Size
): Persona | undefined {
  switch (ageGroup) {
    case 'Baby': return getBabyPersona(ethnicity, sex, size);
    case 'Toddler': return getToddlerPersona(ethnicity, sex, size);
    case 'Kids': return getKidsPersona(ethnicity, sex, size);
    case 'Teen': return getTeenPersona(ethnicity, sex, size);
    case 'Young Adult': return getYoungAdultPersona(ethnicity, sex, size);
    case 'Adult': return getAdultPersona(ethnicity, sex, size);
    case 'Senior': return getSeniorPersona(ethnicity, sex, size);
    default: return undefined;
  }
}

export function getAllPersonas(): Persona[] {
  return [
    ...getAllBabyPersonas(),
    ...getAllToddlerPersonas(),
    ...getAllKidsPersonas(),
    ...getAllTeenPersonas(),
    ...getAllYoungAdultPersonas(),
    ...getAllAdultPersonas(),
    ...getAllSeniorPersonas()
  ];
}

export function getPersonasByAgeGroup(ageGroup: AgeGroup): Persona[] {
  switch (ageGroup) {
    case 'Baby': return getAllBabyPersonas();
    case 'Toddler': return getAllToddlerPersonas();
    case 'Kids': return getAllKidsPersonas();
    case 'Teen': return getAllTeenPersonas();
    case 'Young Adult': return getAllYoungAdultPersonas();
    case 'Adult': return getAllAdultPersonas();
    case 'Senior': return getAllSeniorPersonas();
    default: return [];
  }
}

export function filterPersonas(options: {
  ageGroup?: AgeGroup;
  ethnicity?: Ethnicity;
  sex?: Sex;
  size?: Size;
}): Persona[] {
  let personas = options.ageGroup ? getPersonasByAgeGroup(options.ageGroup) : getAllPersonas();
  
  if (options.ethnicity) {
    personas = personas.filter(p => p.ethnicity === options.ethnicity);
  }
  if (options.sex) {
    personas = personas.filter(p => p.sex === options.sex);
  }
  if (options.size) {
    personas = personas.filter(p => p.size === options.size);
  }
  
  return personas;
}

export function getPersonaFilters() {
  return {
    ageGroups: AGE_GROUPS,
    ethnicities: ETHNICITIES,
    sizes: SIZES,
    sexes: ['Female', 'Male'] as Sex[]
  };
}

export function getPersonaById(id: string): Persona | undefined {
  return getAllPersonas().find(p => p.id === id);
}
