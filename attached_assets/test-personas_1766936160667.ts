/**
 * Quick Test Script - Run this to verify all personas are working
 * Usage: npx ts-node test-personas.ts
 */

import { allPersonas, validateCoverage, PERSONA_STATS, getPersona } from './index';

console.log('\n========================================');
console.log('PERSONA LIBRARY VERIFICATION TEST');
console.log('========================================\n');

// 1. Check total count
console.log('📊 Total Personas:', allPersonas.length);
console.log('   Expected: 288');
console.log('   Status:', allPersonas.length === 288 ? '✅ PASS' : '❌ FAIL');

// 2. Validate coverage
const coverage = validateCoverage();
console.log('\n📋 Coverage Check:');
console.log('   Coverage:', coverage.coverage + '%');
console.log('   Complete:', coverage.isComplete ? '✅ YES' : '❌ NO');
if (!coverage.isComplete) {
  console.log('   Missing:', coverage.missing.length, 'personas');
}

// 3. Check Middle Eastern personas specifically
const middleEasternPersonas = allPersonas.filter(p => p.ethnicity === 'Middle Eastern');
console.log('\n🆕 Middle Eastern Personas:');
console.log('   Count:', middleEasternPersonas.length);
console.log('   Expected: 36');
console.log('   Status:', middleEasternPersonas.length === 36 ? '✅ PASS' : '❌ FAIL');

// 4. Test specific lookup
console.log('\n🔍 Sample Lookups:');
const testCases = [
  { age: 'Adult', eth: 'Middle Eastern', sex: 'Female', size: 'M' },
  { age: 'Teen', eth: 'Middle Eastern', sex: 'Male', size: 'XL' },
  { age: 'Young Adult', eth: 'Asian', sex: 'Female', size: '2XL' }
];

testCases.forEach(tc => {
  const p = getPersona(tc.age as any, tc.eth as any, tc.sex as any, tc.size as any);
  console.log(`   ${tc.age} ${tc.eth} ${tc.sex} ${tc.size}:`, p ? `✅ ${p.name}` : '❌ NOT FOUND');
});

// 5. Stats summary
console.log('\n📈 Statistics:');
console.log('   By Age Group:', JSON.stringify(PERSONA_STATS.byAgeGroup));
console.log('   By Sex:', JSON.stringify(PERSONA_STATS.bySex));

console.log('\n========================================');
console.log('TEST COMPLETE');
console.log('========================================\n');
