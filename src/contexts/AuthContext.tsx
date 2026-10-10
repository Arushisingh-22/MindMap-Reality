import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured, getSupabaseDiagnostics, SupabaseDiagnostics } from '../services/supabase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  diagnostics: SupabaseDiagnostics;
  isPasswordRecovery: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (name: string, email: string, password: string) => Promise<{ error: string | null; requiresVerification?: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const diagnostics = getSupabaseDiagnostics();
  const isConfigured = diagnostics.isConfigured;

  useEffect(() => {
  if (!isConfigured || !supabase) {
  setLoading(false);
  return;
}

const client = supabase;

    // Helper to fetch profile display name or fall back to user metadata / email
    const resolveUserProfile = async (supabaseUser: any): Promise<UserProfile> => {
      let displayName = supabaseUser.user_metadata?.display_name;

      if (!displayName) {
        try {
          const { data: profile } = await client
            .from('profiles')
            .select('display_name')
            .eq('id', supabaseUser.id)
            .maybeSingle();

          if (profile?.display_name) {
            displayName = profile.display_name;
          }
        } catch {
          // Fall back gracefully
        }
      }

      if (!displayName) {
        displayName = supabaseUser.email?.split('@')[0] || 'Learner';
      }

      return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        displayName,
        createdAt: supabaseUser.created_at,
      };
    };

    // 1. Initial session check on mount
    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        if (session?.user) {
          const profile = await resolveUserProfile(session.user);
          setUser(profile);
        } else {
          setUser(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Session retrieval error:', err);
        setLoading(false);
      });

    // 2. Auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsPasswordRecovery(true);
      }

      if (session?.user) {
        const profile = await resolveUserProfile(session.user);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isConfigured]);

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (!isConfigured || !supabase) {
      return {
        error:
          'Supabase is not configured yet. Please add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env to enable account authentication.',
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        // Upsert user profile record if missing
        try {
          const displayName =
            data.user.user_metadata?.display_name || data.user.email?.split('@')[0] || 'Learner';
          await supabase
            .from('profiles')
            .upsert({ id: data.user.id, display_name: displayName }, { onConflict: 'id' });
        } catch {}

        setUser({
          id: data.user.id,
          email: data.user.email || '',
          displayName:
            data.user.user_metadata?.display_name || data.user.email?.split('@')[0] || 'Learner',
          createdAt: data.user.created_at,
        });
      }

      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred during sign in.' };
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ error: string | null; requiresVerification?: boolean }> => {
    if (!isConfigured || !supabase) {
      return {
        error:
          'Supabase is not configured yet. Please configure your .env file with your Supabase project keys to register new accounts.',
      };
    }

    try {
      const trimmedEmail = email.trim();
      const trimmedName = name.trim();

      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            display_name: trimmedName,
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      // Check if email confirmation is required (user exists but no active session yet)
      const requiresVerification = Boolean(data.user && !data.session);

      if (data.user && data.session) {
        // User logged in immediately (email verification turned off)
        try {
          await supabase
            .from('profiles')
            .upsert({ id: data.user.id, display_name: trimmedName }, { onConflict: 'id' });
        } catch {}

        setUser({
          id: data.user.id,
          email: data.user.email || '',
          displayName: trimmedName || data.user.email?.split('@')[0] || 'Learner',
          createdAt: data.user.created_at,
        });
      }

      return { error: null, requiresVerification };
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred during sign up.' };
    }
  };

  const signOut = async () => {
    if (isConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Sign out error:', err);
      }
    }
    setUser(null);
  };

  const resetPassword = async (email: string): Promise<{ error: string | null }> => {
    if (!isConfigured || !supabase) {
      return {
        error:
          'Supabase is not configured yet. Please configure your .env file with your Supabase credentials to enable password resets.',
      };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred while sending reset email.' };
    }
  };

  const updatePassword = async (newPassword: string): Promise<{ error: string | null }> => {
    if (!isConfigured || !supabase) {
      return {
        error: 'Supabase authentication is not configured in this environment.',
      };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { error: error.message };
      }

      setIsPasswordRecovery(false);
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Failed to update account password.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured,
        diagnostics,
        isPasswordRecovery,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
