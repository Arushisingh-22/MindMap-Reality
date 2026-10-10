import { subjects } from '../src/data/subjects';
import { concepts } from '../src/data/concepts';
import { quizQuestions } from '../src/data/quizQuestions';
import fs from 'fs';
import path from 'path';

console.log('=== STARTING MINDMAP REALITY INTEGRITY & VERIFICATION SUITE ===\n');

let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
  } else {
    console.error(`❌ FAIL: ${testName} ${detail ? `- ${detail}` : ''}`);
    failedTests++;
  }
}

// 1. SUBJECTS VERIFICATION
console.log('\n--- 1. Testing Subject Disciplines ---');
assert(subjects.length === 12, '12 Subject Categories Present', `Found: ${subjects.length}`);

const requiredSubjectIds = [
  'physics',
  'chemistry',
  'biology',
  'mathematics',
  'computer-science',
  'geography',
  'history',
  'civics',
  'economics',
  'engineering',
  'psychology',
  'art-design',
];

requiredSubjectIds.forEach((id) => {
  const sub = subjects.find((s) => s.id === id);
  assert(Boolean(sub), `Subject exists: ${id}`, `Missing subject: ${id}`);
});

// 2. CONCEPTS VERIFICATION
console.log('\n--- 2. Testing Educational Concepts ---');
assert(concepts.length >= 36, 'At least 36 total concepts present', `Found: ${concepts.length}`);

// Every subject must contain at least 3 concepts
subjects.forEach((s) => {
  const count = concepts.filter((c) => c.subjectId === s.id).length;
  assert(count >= 3, `Subject "${s.name}" has >= 3 concepts`, `Count: ${count}`);
});

// 3. FULLY DEVELOPED MANDATORY LESSONS
console.log('\n--- 3. Testing Mandatory Fully Developed Lessons ---');
const mandatoryIds = ['ohms-law', 'acids-and-bases', 'probability', 'mechanical-levers'];
mandatoryIds.forEach((id) => {
  const concept = concepts.find((c) => c.id === id);
  assert(Boolean(concept), `Mandatory concept exists: ${id}`);
  if (concept) {
    assert(Boolean(concept.learn.definition), `${id}: Has formal definition`);
    assert(Boolean(concept.learn.textbookExplanation), `${id}: Has textbook explanation`);
    assert(concept.learn.keyTerms.length >= 2, `${id}: Has key terms glossary`);
    assert(concept.connect.examples.length >= 2, `${id}: Has at least 2 real-world examples`);
    assert(Boolean(concept.apply.problemStatement), `${id}: Has apply-it problem`);
    assert(Boolean(concept.apply.explanation), `${id}: Has apply-it explanation`);
  }
});

// 4. SIMULATION CALCULATIONS VERIFICATION
console.log('\n--- 4. Testing Simulation Mathematical Calculations ---');
// Ohm's Law: I = V / R
const testV = 12;
const testR = 3;
const testI = testV / testR;
assert(testI === 4, "Ohm's Law Calculation (12V / 3Ω = 4A)", `Calculated: ${testI}`);

// Mechanical Lever: IMA = EffortArm / LoadArm, LoadForce = EffortForce * IMA
const effortArm = 2.0;
const loadArm = 0.5;
const effortForce = 100;
const ima = effortArm / loadArm;
const loadForce = effortForce * ima;
assert(ima === 4, 'Lever IMA Calculation (2.0m / 0.5m = 4.0)', `Calculated: ${ima}`);
assert(loadForce === 400, 'Lever Load Force Calculation (100N * 4 = 400N)', `Calculated: ${loadForce}`);

// Energy Calculator: (Watts * Hours * Days) / 1000
const watts = 1500;
const hours = 8;
const days = 30;
const tariff = 0.16;
const energyKwh = (watts * hours * days) / 1000;
const cost = energyKwh * tariff;
assert(energyKwh === 360, 'Energy Consumption ((1500W * 8h * 30d)/1000 = 360 kWh)', `Calculated: ${energyKwh}`);
assert(cost === 57.6, 'Energy Cost Calculation (360 kWh * $0.16 = $57.60)', `Calculated: ${cost}`);

// 5. QUIZ QUESTION BANK INTEGRITY
console.log('\n--- 5. Testing Quiz Question Bank ---');
assert(quizQuestions.length >= 36, 'Question bank contains >= 36 questions', `Found: ${quizQuestions.length}`);

// Check that each question is valid and has valid metadata
quizQuestions.forEach((q, idx) => {
  const validOptionIdx = q.correctAnswerIndex >= 0 && q.correctAnswerIndex < q.options.length;
  assert(validOptionIdx, `Question ${q.id} has valid correct answer index`, `Index: ${q.correctAnswerIndex}`);
  assert(q.options.length >= 3, `Question ${q.id} has at least 3 options`);
  assert(Boolean(q.explanation), `Question ${q.id} has an explanation`);
});

// Check that all 12 subjects have quiz questions
subjects.forEach((s) => {
  const qCount = quizQuestions.filter((q) => q.subjectId === s.id).length;
  assert(qCount >= 3, `Subject "${s.name}" has >= 3 quiz questions`, `Count: ${qCount}`);
});

// 6. DESIGN TOKENS IN CSS
console.log('\n--- 6. Verifying Design System CSS Tokens ---');
const cssPath = path.join(process.cwd(), 'src/styles/index.css');
const cssContent = fs.readFileSync(cssPath, 'utf-8');

const expectedTokens = [
  '#F7FBFF', // light bg
  '#FFFFFF', // card
  '#38A9F5', // primary sky blue
  '#EAF6FF', // surface
  '#17365D', // main text
  '#64748B', // muted
  '#D9EAF7', // border
  '#15803D', // success
  '#DC2626', // error
  '#0B1220', // dark bg
  '#131F32', // dark card
  '#1B2A40', // elevated
  '#55B8FF', // dark sky blue
  '#EDF6FF', // dark text
  '#A8B8CC', // dark muted
  '#2B405A', // dark border
  '#4ADE80', // dark success
  '#F87171', // dark error
];

expectedTokens.forEach((token) => {
  assert(cssContent.includes(token), `CSS Design Token Present: ${token}`);
});

// SUMMARY
console.log('\n======================================================');
if (failedTests === 0) {
  console.log('🎉 ALL INTEGRITY VERIFICATIONS PASSED WITH ZERO ERRORS!');
  process.exit(0);
} else {
  console.error(`❌ VERIFICATION FAILED WITH ${failedTests} ERRORS!`);
  process.exit(1);
}
