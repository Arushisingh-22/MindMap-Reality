import { createClient, SupabaseClient } from '@supabase/supabase-js';

const getEnvVar = (key: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key];
    }
  } catch {}

  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch {}

  return '';
};

const rawUrl = getEnvVar('VITE_SUPABASE_URL').trim();
const rawAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY').trim();

export interface SupabaseDiagnostics {
  isConfigured: boolean;
  hasUrl: boolean;
  hasAnonKey: boolean;
  isPlaceholderUrl: boolean;
  isPlaceholderKey: boolean;
  isValidHttpsUrl: boolean;
  message: string;
}

export const getSupabaseDiagnostics = (): SupabaseDiagnostics => {
  const hasUrl = Boolean(rawUrl);
  const hasAnonKey = Boolean(rawAnonKey);
  const isPlaceholderUrl = rawUrl.includes('your-project-id') || rawUrl.includes('example');
  const isPlaceholderKey = rawAnonKey.includes('your-anon-public-key') || rawAnonKey.includes('example');
  const isValidHttpsUrl = rawUrl.startsWith('https://');

  const isConfigured = hasUrl && hasAnonKey && !isPlaceholderUrl && !isPlaceholderKey && isValidHttpsUrl;

  let message = 'Supabase client is configured and ready for live cloud authentication and sync.';
  if (!hasUrl && !hasAnonKey) {
    message = 'Missing VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in environment.';
  } else if (!hasUrl) {
    message = 'Missing VITE_SUPABASE_URL in environment.';
  } else if (!hasAnonKey) {
    message = 'Missing VITE_SUPABASE_ANON_KEY in environment.';
  } else if (isPlaceholderUrl || isPlaceholderKey) {
    message = 'Placeholder credentials detected in environment. Please provide your actual Supabase project keys in .env.';
  } else if (!isValidHttpsUrl) {
    message = 'VITE_SUPABASE_URL must be a valid HTTPS URL (e.g. https://xyzcompany.supabase.co).';
  }

  return {
    isConfigured,
    hasUrl,
    hasAnonKey,
    isPlaceholderUrl,
    isPlaceholderKey,
    isValidHttpsUrl,
    message,
  };
};

export const isSupabaseConfigured = (): boolean => {
  return getSupabaseDiagnostics().isConfigured;
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(rawUrl, rawAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      },
    })
  : null;
