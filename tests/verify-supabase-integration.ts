import fs from 'fs';
import path from 'path';
import { getSupabaseDiagnostics, isSupabaseConfigured } from '../src/services/supabase';

console.log('=== STARTING SUPABASE INTEGRATION VERIFICATION SUITE ===\n');

let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
  } else {
    console.error(`❌ FAIL: ${testName} ${detail ? `- ${detail}` : ''}`);
    failedTests++;
  }
}

// 1. SUPABASE CLIENT & DIAGNOSTICS
console.log('\n--- 1. Testing Supabase Client Service & Diagnostics ---');
const diagnostics = getSupabaseDiagnostics();
console.log('Current Supabase Config Status:', diagnostics);
assert(typeof isSupabaseConfigured() === 'boolean', 'isSupabaseConfigured returns boolean');
assert(typeof diagnostics.isConfigured === 'boolean', 'diagnostics.isConfigured is boolean');
assert(typeof diagnostics.message === 'string' && diagnostics.message.length > 0, 'diagnostics returns helpful message');

// 2. ENVIRONMENT CONFIGURATION FILE
console.log('\n--- 2. Verifying .env.example ---');
const envExamplePath = path.join(process.cwd(), '.env.example');
assert(fs.existsSync(envExamplePath), '.env.example file exists');
const envContent = fs.readFileSync(envExamplePath, 'utf-8');
assert(envContent.includes('VITE_SUPABASE_URL='), '.env.example contains VITE_SUPABASE_URL');
assert(envContent.includes('VITE_SUPABASE_ANON_KEY='), '.env.example contains VITE_SUPABASE_ANON_KEY');
assert(!envContent.includes('SERVICE_ROLE_KEY'), '.env.example does not export a service role key variable');

// 3. SQL MIGRATION FILES
console.log('\n--- 3. Verifying SQL Migration Files ---');
const schemaSqlPath = path.join(process.cwd(), 'supabase', 'schema.sql');
assert(fs.existsSync(schemaSqlPath), 'supabase/schema.sql exists');
const schemaContent = fs.readFileSync(schemaSqlPath, 'utf-8');

// Check tables
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.profiles'), 'profiles table defined');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.user_progress'), 'user_progress table defined');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.bookmarks'), 'bookmarks table defined');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.quiz_attempts'), 'quiz_attempts table defined');

// Check RLS
assert(schemaContent.includes('ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;'), 'RLS enabled on profiles');
assert(schemaContent.includes('ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;'), 'RLS enabled on user_progress');
assert(schemaContent.includes('ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;'), 'RLS enabled on bookmarks');
assert(schemaContent.includes('ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;'), 'RLS enabled on quiz_attempts');

// Check Policies
assert(schemaContent.includes('auth.uid() = id'), 'Profiles policies check auth.uid() = id');
assert(schemaContent.includes('auth.uid() = user_id'), 'User data policies check auth.uid() = user_id');

// Check Triggers
assert(schemaContent.includes('CREATE OR REPLACE FUNCTION public.handle_new_user()'), 'handle_new_user trigger function defined');
assert(schemaContent.includes('CREATE TRIGGER on_auth_user_created'), 'on_auth_user_created trigger attached');

// Check individual migrations directory
const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations');
assert(fs.existsSync(migrationsDir), 'supabase/migrations directory exists');
const expectedMigrations = [
  '20261010000001_create_profiles.sql',
  '20261010000002_create_user_progress.sql',
  '20261010000003_create_bookmarks.sql',
  '20261010000004_create_quiz_attempts.sql',
  '20261010000005_auth_triggers_and_rls.sql',
];
expectedMigrations.forEach((filename) => {
  const filePath = path.join(migrationsDir, filename);
  assert(fs.existsSync(filePath), `Migration exists: ${filename}`);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    assert(content.length > 50, `Migration has content: ${filename}`);
  }
});

// 4. SETUP DOCUMENTATION
console.log('\n--- 4. Verifying Setup Documentation ---');
const setupDocPath = path.join(process.cwd(), 'SUPABASE_SETUP.md');
assert(fs.existsSync(setupDocPath), 'SUPABASE_SETUP.md exists');
const setupDoc = fs.readFileSync(setupDocPath, 'utf-8');
assert(setupDoc.includes('Project URL'), 'Documentation explains Project URL');
assert(setupDoc.includes('anon'), 'Documentation explains public anon key');
assert(setupDoc.includes('SQL Editor'), 'Documentation explains running SQL in dashboard');
assert(setupDoc.includes('Redirect URLs'), 'Documentation explains Redirect URLs configuration');

// 5. CODEBASE INTEGRITY
console.log('\n--- 5. Verifying App Pages & Handlers ---');
const loginPath = path.join(process.cwd(), 'src', 'pages', 'Login.tsx');
const signupPath = path.join(process.cwd(), 'src', 'pages', 'SignUp.tsx');
const forgotPath = path.join(process.cwd(), 'src', 'pages', 'ForgotPassword.tsx');
const resetPath = path.join(process.cwd(), 'src', 'pages', 'ResetPassword.tsx');
const progressPath = path.join(process.cwd(), 'src', 'pages', 'Progress.tsx');

assert(fs.existsSync(loginPath), 'Login page exists');
assert(fs.existsSync(signupPath), 'SignUp page exists');
assert(fs.existsSync(forgotPath), 'ForgotPassword page exists');
assert(fs.existsSync(resetPath), 'ResetPassword page exists');
assert(fs.existsSync(progressPath), 'Progress page exists');

const loginSrc = fs.readFileSync(loginPath, 'utf-8');
assert(loginSrc.includes('signIn('), 'Login page calls signIn');

const signupSrc = fs.readFileSync(signupPath, 'utf-8');
assert(signupSrc.includes('signUp('), 'SignUp page calls signUp');

const forgotSrc = fs.readFileSync(forgotPath, 'utf-8');
assert(forgotSrc.includes('resetPassword('), 'ForgotPassword page calls resetPassword');

const resetSrc = fs.readFileSync(resetPath, 'utf-8');
assert(resetSrc.includes('updatePassword('), 'ResetPassword page calls updatePassword');

const progressSrc = fs.readFileSync(progressPath, 'utf-8');
assert(progressSrc.includes('importLocalProgressToAccount'), 'Progress page supports guest progress import');

// SUMMARY
console.log('\n======================================================');
if (failedTests === 0) {
  console.log('🎉 ALL SUPABASE INTEGRATION TESTS PASSED WITH ZERO ERRORS!');
  process.exit(0);
} else {
  console.error(`❌ SUPABASE INTEGRATION TEST FAILED WITH ${failedTests} ERRORS!`);
  process.exit(1);
}
