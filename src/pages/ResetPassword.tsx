import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, KeyRound, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const ResetPassword: React.FC = () => {
  const { updatePassword, isConfigured } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both fields.');
      return;
    }

    setLoading(true);
    const { error } = await updatePassword(password);
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-text transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Login</span>
        </Link>

        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white mx-auto shadow-md shadow-sky-500/20">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-brand-text tracking-tight">
            Set Your New Password
          </h1>
          <p className="text-xs text-brand-muted">
            Choose a strong password with at least 6 characters to secure your account.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {success ? (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-3 animate-in fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-emerald-800 dark:text-emerald-300">
              Password Updated Successfully!
            </h3>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed font-medium">
              Your password has been changed. You can now continue your learning journey.
            </p>
            <Link
              to="/progress"
              className="inline-block px-5 py-2.5 text-xs font-bold text-white bg-brand-primary hover:bg-brand-primary-hover rounded-xl shadow-sm transition-all mt-2"
            >
              Go to Learning Dashboard
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="text-xs font-semibold text-brand-text block mb-1.5">
                New Password (min 6 characters)
              </label>
              <div className="relative">
                <input
                  id="new-password"
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
              <label htmlFor="confirm-new-password" className="text-xs font-semibold text-brand-text block mb-1.5">
                Confirm New Password
              </label>
              <input
                id="confirm-new-password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm bg-brand-surface border border-brand-border rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 rounded-xl shadow-md shadow-sky-500/20 active:scale-95 transition-all"
            >
              {loading ? (
                <span className="inline-block animate-spin mr-2">⏳</span>
              ) : (
                <KeyRound className="w-4 h-4" />
              )}
              <span>{loading ? 'Saving New Password...' : 'Update Password'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
