import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../../logger';

const HEADSHOTS_DIR = 'attached_assets/personas';

const ETHNICITY_TO_FILENAME: Record<string, string> = {
  'White': 'white',
  'Black': 'black',
  'Hispanic': 'hispanic',
  'Asian': 'asian',
  'Indian': 'indian',
  'Southeast Asian': 'se_asian',
  'Indigenous': 'indigenous',
  'Middle Eastern': 'middle_eastern'
};

const ETHNICITY_CODE_TO_NAME: Record<string, string> = {
  'WHT': 'White',
  'BLK': 'Black',
  'HSP': 'Hispanic',
  'ASN': 'Asian',
  'IND': 'Indian',
  'SEA': 'Southeast Asian',
  'IDG': 'Indigenous',
  'MDE': 'Middle Eastern'
};

const AGE_CODE_TO_PREFIX: Record<string, string> = {
  'AD': 'adult',
  'TN': 'teen',
  'YA': 'young_adult'
};

const SEX_CODE_TO_FILENAME: Record<string, string> = {
  'M': 'male',
  'F': 'female'
};

export interface HeadshotInfo {
  personaId: string;
  filePath: string | null;
  exists: boolean;
  ethnicity: string;
  ageGroup: string;
  sex: string;
  size: string;
}

export function getHeadshotPath(personaId: string): string | null {
  const parts = personaId.split('_');
  if (parts.length < 5) {
    logger.warn('Invalid persona ID format', { source: 'headshotMapping', personaId });
    return null;
  }

  const [ethnicityCode, ageCode, sexCode, sizeCode] = parts;
  
  const agePrefix = AGE_CODE_TO_PREFIX[ageCode];
  const ethnicityName = ETHNICITY_CODE_TO_NAME[ethnicityCode];
  const ethnicityFilename = ethnicityName ? ETHNICITY_TO_FILENAME[ethnicityName] : null;
  const sexFilename = SEX_CODE_TO_FILENAME[sexCode];
  const sizeFilename = sizeCode.toLowerCase();

  if (!agePrefix || !ethnicityFilename || !sexFilename) {
    logger.warn('Could not map persona ID to filename', { 
      source: 'headshotMapping', 
      personaId,
      ageCode,
      ethnicityCode,
      sexCode
    });
    return null;
  }

  const filename = `${agePrefix}_${ethnicityFilename}_${sexFilename}_${sizeFilename}_headshot.png`;
  const fullPath = path.join(HEADSHOTS_DIR, filename);

  if (fs.existsSync(fullPath)) {
    return fullPath;
  }

  const filenameNoSuffix = `${agePrefix}_${ethnicityFilename}_${sexFilename}_${sizeFilename}.png`;
  const fullPathNoSuffix = path.join(HEADSHOTS_DIR, filenameNoSuffix);
  
  if (fs.existsSync(fullPathNoSuffix)) {
    return fullPathNoSuffix;
  }

  return null;
}

export function getHeadshotBase64(personaId: string): string | null {
  const filePath = getHeadshotPath(personaId);
  if (!filePath) {
    return null;
  }

  try {
    const imageBuffer = fs.readFileSync(filePath);
    return imageBuffer.toString('base64');
  } catch (error) {
    logger.error('Failed to read headshot file', error, { source: 'headshotMapping', filePath });
    return null;
  }
}

export function checkHeadshotExists(personaId: string): boolean {
  return getHeadshotPath(personaId) !== null;
}

export interface MissingHeadshot {
  personaId: string;
  expectedPath: string;
  ethnicity: string;
  ageGroup: string;
  sex: string;
  size: string;
}

export function findAllMissingHeadshots(): MissingHeadshot[] {
  const ethnicities = ['WHT', 'BLK', 'HSP', 'ASN', 'IND', 'SEA', 'IDG', 'MDE'];
  const ageGroups = ['AD', 'TN', 'YA'];
  const sexes = ['M', 'F'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
  
  const missing: MissingHeadshot[] = [];
  
  for (const ageCode of ageGroups) {
    for (const ethnicityCode of ethnicities) {
      for (const sexCode of sexes) {
        for (const sizeCode of sizes) {
          const personaId = `${ethnicityCode}_${ageCode}_${sexCode}_${sizeCode}_001`;
          const exists = checkHeadshotExists(personaId);
          
          if (!exists) {
            const agePrefix = AGE_CODE_TO_PREFIX[ageCode];
            const ethnicityName = ETHNICITY_CODE_TO_NAME[ethnicityCode];
            const ethnicityFilename = ETHNICITY_TO_FILENAME[ethnicityName];
            const sexFilename = SEX_CODE_TO_FILENAME[sexCode];
            const sizeFilename = sizeCode.toLowerCase();
            
            const expectedPath = path.join(
              HEADSHOTS_DIR,
              `${agePrefix}_${ethnicityFilename}_${sexFilename}_${sizeFilename}_headshot.png`
            );
            
            missing.push({
              personaId,
              expectedPath,
              ethnicity: ethnicityName,
              ageGroup: ageCode === 'AD' ? 'Adult' : ageCode === 'TN' ? 'Teen' : 'Young Adult',
              sex: sexCode === 'M' ? 'Male' : 'Female',
              size: sizeCode
            });
          }
        }
      }
    }
  }
  
  return missing;
}

export function getMissingHeadshotsByAgeGroup(): Record<string, MissingHeadshot[]> {
  const allMissing = findAllMissingHeadshots();
  
  return {
    'Adult': allMissing.filter(h => h.ageGroup === 'Adult'),
    'Teen': allMissing.filter(h => h.ageGroup === 'Teen'),
    'Young Adult': allMissing.filter(h => h.ageGroup === 'Young Adult')
  };
}

export function getHeadshotInventory(): {
  total: number;
  existing: number;
  missing: number;
  byAgeGroup: Record<string, { existing: number; missing: number }>;
} {
  const ethnicities = ['WHT', 'BLK', 'HSP', 'ASN', 'IND', 'SEA', 'IDG', 'MDE'];
  const ageGroups = ['AD', 'TN', 'YA'];
  const sexes = ['M', 'F'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
  
  const total = ethnicities.length * ageGroups.length * sexes.length * sizes.length;
  let existing = 0;
  
  const byAgeGroup: Record<string, { existing: number; missing: number }> = {
    'Adult': { existing: 0, missing: 0 },
    'Teen': { existing: 0, missing: 0 },
    'Young Adult': { existing: 0, missing: 0 }
  };
  
  for (const ageCode of ageGroups) {
    const ageGroupName = ageCode === 'AD' ? 'Adult' : ageCode === 'TN' ? 'Teen' : 'Young Adult';
    
    for (const ethnicityCode of ethnicities) {
      for (const sexCode of sexes) {
        for (const sizeCode of sizes) {
          const personaId = `${ethnicityCode}_${ageCode}_${sexCode}_${sizeCode}_001`;
          const exists = checkHeadshotExists(personaId);
          
          if (exists) {
            existing++;
            byAgeGroup[ageGroupName].existing++;
          } else {
            byAgeGroup[ageGroupName].missing++;
          }
        }
      }
    }
  }
  
  return {
    total,
    existing,
    missing: total - existing,
    byAgeGroup
  };
}
