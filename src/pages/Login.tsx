import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  ArrowLeft,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const { signIn, isConfigured, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/progress';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already authenticated, redirect to destination
  if (user) {
    navigate(from, { replace: true });
  }

  const validateEmail = (mail: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-text transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>

        {/* Brand Header */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white mx-auto shadow-md shadow-sky-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-brand-text tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-xs text-brand-muted">
            Continue your journey from concepts to real-world understanding.
          </p>
        </div>

        {/* Backend Configuration Notice (if Supabase credentials are missing) */}
        {!isConfigured && (
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-left flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Backend Setup Note:</strong> Live authentication requires configuring your Supabase project in <code className="bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded font-mono">.env</code>. You can explore all lessons, simulations, and save local progress without logging in.
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="text-xs font-semibold text-brand-text block mb-1.5">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.edu"
              className="w-full px-3.5 py-2.5 text-sm bg-brand-surface border border-brand-border rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="login-password" className="text-xs font-semibold text-brand-text">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] font-semibold text-brand-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-brand-surface border border-brand-border rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-brand-muted">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-sky-500 rounded"
              />
              <span>Remember me on this browser</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 rounded-xl shadow-md shadow-sky-500/20 active:scale-95 transition-all"
          >
            {loading ? (
              <span className="inline-block animate-spin mr-2">⏳</span>
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            <span>{loading ? 'Verifying Account...' : 'Log In'}</span>
          </button>
        </form>

        {/* Footer Link to Signup */}
        <div className="pt-2 text-center text-xs text-brand-muted border-t border-brand-border/60">
          <span>Don't have an account yet? </span>
          <Link to="/signup" className="font-bold text-brand-primary hover:underline">
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
};
