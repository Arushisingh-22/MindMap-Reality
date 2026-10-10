import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const ForgotPassword: React.FC = () => {
  const { resetPassword, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setLoading(true);
    const { error } = await resetPassword(email.trim());
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    } else {
      setSuccessMessage(`A password reset link has been dispatched to ${email}. Please check your inbox.`);
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
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-brand-text tracking-tight">
            Reset Your Password
          </h1>
          <p className="text-xs text-brand-muted">
            Enter your registered email address and we'll send you a secure link to reset your account credentials.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage ? (
          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-3 animate-in fade-in">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed font-medium">
              {successMessage}
            </p>
            <Link
              to="/login"
              className="inline-block px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors mt-2"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="reset-email" className="text-xs font-semibold text-brand-text block mb-1.5">
                Registered Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.edu"
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
                <Mail className="w-4 h-4" />
              )}
              <span>{loading ? 'Sending Reset Link...' : 'Send Reset Link'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
