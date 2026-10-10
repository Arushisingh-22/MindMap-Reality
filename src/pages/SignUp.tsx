import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  ArrowLeft,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const SignUp: React.FC = () => {
  const { signUp, isConfigured, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verificationRequired, setVerificationRequired] = useState(false);

  if (user) {
    navigate('/progress', { replace: true });
  }

  const validateEmail = (mail: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-check.');
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage('Please accept the Terms of Service to create an account.');
      return;
    }

    setLoading(true);
    const { error, requiresVerification } = await signUp(name.trim(), email.trim(), password);
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    } else if (requiresVerification) {
      setVerificationRequired(true);
    } else {
      navigate('/progress');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-text transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>

        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white mx-auto shadow-md shadow-sky-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-brand-text tracking-tight">
            Start Your Learning Journey
          </h1>
          <p className="text-xs text-brand-muted">
            Create an account to synchronize your progress and bookmarks across devices.
          </p>
        </div>

        {/* Backend Configuration Notice */}
        {!isConfigured && (
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-left flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Account Sync Notice:</strong> Account creation requires configuring Supabase in <code className="bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded font-mono">.env</code>. You can use all learning modules and save local progress without an account.
            </div>
          </div>
        )}

        {verificationRequired ? (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-emerald-800 dark:text-emerald-300">
              Account Created! Check Your Inbox
            </h3>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
              We sent a verification confirmation link to <strong className="text-emerald-900 dark:text-emerald-200">{email}</strong>. Please confirm your email, then return here to log in.
            </p>
            <Link
              to="/login"
              className="inline-block px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors mt-2"
            >
              Proceed to Login
            </Link>
          </div>
        ) : (
          <>
            {errorMessage && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="signup-name" className="text-xs font-semibold text-brand-text block mb-1.5">
                  Full Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Johnson"
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-surface border border-brand-border rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label htmlFor="signup-email" className="text-xs font-semibold text-brand-text block mb-1.5">
                  Email Address
                </label>
                <input
                  id="signup-email"
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
                <label htmlFor="signup-password" className="text-xs font-semibold text-brand-text block mb-1.5">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
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

              <div>
                <label htmlFor="signup-confirm-password" className="text-xs font-semibold text-brand-text block mb-1.5">
                  Confirm Password
                </label>
                <input
                  id="signup-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-surface border border-brand-border rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="accent-sky-500 rounded mt-0.5"
                />
                <label htmlFor="terms" className="text-xs text-brand-muted cursor-pointer leading-relaxed">
                  I agree to the MindMap Reality terms and open learning policy.
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
                  <UserPlus className="w-4 h-4" />
                )}
                <span>{loading ? 'Creating Profile...' : 'Create Account'}</span>
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-brand-muted border-t border-brand-border/60">
              <span>Already have an account? </span>
              <Link to="/login" className="font-bold text-brand-primary hover:underline">
                Log in here
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
