import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length) {
    env[key.trim()] = values.join('=').trim();
  }
});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

async function testAuth() {
  console.log('Testing Authentication Flow...');
  
  const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  const testEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!';
  const testName = 'Test User';
  
  console.log(`1. Attempting to create user: ${testEmail} (bypassing email confirmation)`);
  
  const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
    email: testEmail,
    password: testPassword,
    email_confirm: true,
    user_metadata: { full_name: testName }
  });
  
  if (createError) {
    console.error('[ERROR] Failed to create user:', createError.message);
    return;
  }
  console.log('[OK] User created successfully:', newUser.user.id);
  
  console.log(`2. Attempting to login with created user...`);
  const { data: sessionData, error: signInError } = await userClient.auth.signInWithPassword({
    email: testEmail,
    password: testPassword
  });
  
  if (signInError) {
    console.error('[ERROR] Failed to sign in:', signInError.message);
    return;
  }
  
  console.log('[OK] Sign in successful! Received session token.');
  console.log(`   User Email: ${sessionData.user.email}`);
  console.log(`   User Name: ${sessionData.user.user_metadata.full_name}`);
  
  console.log('\nAll authentication tests passed! The flow works perfectly.');
}

testAuth();
