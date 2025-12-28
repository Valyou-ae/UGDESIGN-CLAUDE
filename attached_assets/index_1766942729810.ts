/**
 * ============================================================================
 * COMPLETE MISSING PERSONAS INDEX
 * ============================================================================
 * Total: 232 Missing Personas
 * - Adult (25-45): 72 personas
 * - Teen (13-17): 82 personas  
 * - Young Adult (18-24): 78 personas
 * 
 * Created: 2025-12-28
 * Version: 2.0
 * ============================================================================
 */

import { missingAdultPersonas } from './adultPersonas_MISSING';
import { missingTeenPersonas } from './teenPersonas_MISSING';
import { missingYoungAdultPersonas } from './youngAdultPersonas_MISSING';

// ============================================================================
// COMBINED EXPORTS
// ============================================================================

export { missingAdultPersonas } from './adultPersonas_MISSING';
export { missingTeenPersonas } from './teenPersonas_MISSING';
export { missingYoungAdultPersonas } from './youngAdultPersonas_MISSING';

// ============================================================================
// ALL MISSING PERSONAS COMBINED
// ============================================================================

export const allMissingPersonas = [
  ...missingAdultPersonas,
  ...missingTeenPersonas,
  ...missingYoungAdultPersonas
];

// ============================================================================
// STATISTICS
// ============================================================================

export const MISSING_STATS = {
  total: allMissingPersonas.length,
  adult: missingAdultPersonas.length,
  teen: missingTeenPersonas.length,
  youngAdult: missingYoungAdultPersonas.length,
  
  bySize: {
    'XS': allMissingPersonas.filter(p => p.size === 'XS').length,
    'S': allMissingPersonas.filter(p => p.size === 'S').length,
    'M': allMissingPersonas.filter(p => p.size === 'M').length,
    'L': allMissingPersonas.filter(p => p.size === 'L').length,
    'XL': allMissingPersonas.filter(p => p.size === 'XL').length,
    '2XL': allMissingPersonas.filter(p => p.size === '2XL').length
  },
  
  byEthnicity: {
    'White': allMissingPersonas.filter(p => p.ethnicity === 'White').length,
    'Black': allMissingPersonas.filter(p => p.ethnicity === 'Black').length,
    'Hispanic': allMissingPersonas.filter(p => p.ethnicity === 'Hispanic').length,
    'Asian': allMissingPersonas.filter(p => p.ethnicity === 'Asian').length,
    'Indian': allMissingPersonas.filter(p => p.ethnicity === 'Indian').length,
    'Southeast Asian': allMissingPersonas.filter(p => p.ethnicity === 'Southeast Asian').length,
    'Middle Eastern': allMissingPersonas.filter(p => p.ethnicity === 'Middle Eastern').length,
    'Indigenous': allMissingPersonas.filter(p => p.ethnicity === 'Indigenous').length
  }
};

// ============================================================================
// LOOKUP HELPERS
// ============================================================================

export function getMissingPersona(
  age: 'Adult' | 'Teen' | 'Young Adult',
  ethnicity: string,
  sex: 'Male' | 'Female',
  size: string
) {
  return allMissingPersonas.find(
    p => p.age === age && 
         p.ethnicity === ethnicity && 
         p.sex === sex && 
         p.size === size
  );
}

export function getMissingPersonasByAge(age: 'Adult' | 'Teen' | 'Young Adult') {
  return allMissingPersonas.filter(p => p.age === age);
}

export function getMissingPersonasByEthnicity(ethnicity: string) {
  return allMissingPersonas.filter(p => p.ethnicity === ethnicity);
}

export function getMissingPersonasBySize(size: string) {
  return allMissingPersonas.filter(p => p.size === size);
}

// ============================================================================
// VERIFICATION
// ============================================================================

export function verifyMissingPersonas() {
  console.log('\n========================================');
  console.log('MISSING PERSONAS VERIFICATION');
  console.log('========================================\n');
  
  console.log('📊 Total Missing Personas:', allMissingPersonas.length);
  console.log('   Expected: 232');
  console.log('   Status:', allMissingPersonas.length === 232 ? '✅ PASS' : '❌ FAIL');
  
  console.log('\n📋 By Age Group:');
  console.log('   Adult (72):', missingAdultPersonas.length === 72 ? '✅' : '❌', missingAdultPersonas.length);
  console.log('   Teen (82):', missingTeenPersonas.length === 82 ? '✅' : '❌', missingTeenPersonas.length);
  console.log('   Young Adult (78):', missingYoungAdultPersonas.length === 78 ? '✅' : '❌', missingYoungAdultPersonas.length);
  
  console.log('\n📋 By Size:');
  Object.entries(MISSING_STATS.bySize).forEach(([size, count]) => {
    console.log(`   ${size}: ${count}`);
  });
  
  console.log('\n📋 By Ethnicity:');
  Object.entries(MISSING_STATS.byEthnicity).forEach(([eth, count]) => {
    console.log(`   ${eth}: ${count}`);
  });
  
  console.log('\n========================================\n');
}

export default {
  allMissingPersonas,
  missingAdultPersonas,
  missingTeenPersonas,
  missingYoungAdultPersonas,
  getMissingPersona,
  MISSING_STATS,
  verifyMissingPersonas
};
