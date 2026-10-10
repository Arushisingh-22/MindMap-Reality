
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

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
  const isPlaceholderUrl =
    rawUrl.includes('your-project-id') || rawUrl.includes('example');
  const isPlaceholderKey =
    rawAnonKey.includes('your-anon-public-key') || rawAnonKey.includes('example');
  const isValidHttpsUrl = rawUrl.startsWith('https://');

  const isConfigured =
    hasUrl && hasAnonKey && !isPlaceholderUrl &&
    !isPlaceholderKey && isValidHttpsUrl;

  let message = 'Supabase client is configured and ready for live cloud authentication and sync.';

  if (!hasUrl && !hasAnonKey) {
    message = 'Missing VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in environment.';
  } else if (!hasUrl) {
    message = 'Missing VITE_SUPABASE_URL in environment.';
  } else if (!hasAnonKey) {
    message = 'Missing VITE_SUPABASE_ANON_KEY in environment.';
  } else if (isPlaceholderUrl || isPlaceholderKey) {
    message = 'Placeholder credentials detected in environment.';
  } else if (!isValidHttpsUrl) {
    message = 'VITE_SUPABASE_URL must use HTTPS.';
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

export const isSupabaseConfigured = (): boolean =>
  getSupabaseDiagnostics().isConfigured;

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
