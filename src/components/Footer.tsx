import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Send, CheckCircle2, Heart, ShieldCheck, Mail, Sparkles, X } from 'lucide-react';
import { subjects } from '../data/subjects';
import { supabase } from '../services/supabase';

export const Footer: React.FC = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  
const handleFeedbackSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!feedbackText.trim()) return;

  if (!supabase) {
  console.error('Supabase is not configured.');
  alert('Feedback is temporarily unavailable.');
  return;
}
  const { error } = await supabase
    .from('course_feedback')
    .insert({
      email: feedbackEmail.trim() || null,
      feedback: feedbackText.trim(),
    });

  if (error) {
    console.error('Feedback submission failed:', error.message);
    alert('Feedback could not be submitted. Please try again.');
    return;
  }

  setSubmitted(true);

  setTimeout(() => {
    setSubmitted(false);
    setFeedbackText('');
    setFeedbackEmail('');
    setFeedbackOpen(false);
  }, 2500);
};


  return (
    <>
      <footer className="w-full bg-brand-card border-t border-brand-border mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Column 1: Brand & Pedagogy */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white shadow-sm">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-brand-text">
                  MindMap<span className="text-brand-primary"> Reality</span>
                </span>
              </Link>
              <p className="text-sm text-brand-muted leading-relaxed max-w-sm">
                Empowering students to connect classroom theory with everyday reality. Transforming textbook formulas into tangible real-world mechanics.
              </p>
              <div className="p-3 bg-brand-surface rounded-xl border border-brand-border/60 max-w-sm">
                <span className="text-xs font-bold text-brand-text flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                  Our Learning Cycle
                </span>
                <p className="text-xs text-brand-muted font-mono font-medium">
                  LEARN → CONNECT → APPLY → TEST YOURSELF
                </p>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-4">
                Main Learning Pages
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/" className="text-brand-muted hover:text-brand-primary transition-colors">
                    Home Portal
                  </Link>
                </li>
                <li>
                  <Link to="/explore" className="text-brand-muted hover:text-brand-primary transition-colors">
                    Explore Concepts
                  </Link>
                </li>
                <li>
                  <Link to="/subjects" className="text-brand-muted hover:text-brand-primary transition-colors">
                    All 12 Subjects
                  </Link>
                </li>
                <li>
                  <Link to="/lab" className="text-brand-muted hover:text-brand-primary transition-colors">
                    Interactive Lab
                  </Link>
                </li>
                <li>
                  <Link to="/quiz" className="text-brand-muted hover:text-brand-primary transition-colors">
                    Quiz & Challenges
                  </Link>
                </li>
                <li>
                  <Link to="/progress" className="text-brand-muted hover:text-brand-primary transition-colors">
                    My Progress
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Featured Subjects */}
            <div>
              <h4 className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-4">
                Core Disciplines
              </h4>
              <ul className="space-y-2.5 text-sm">
                {subjects.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/subjects?selected=${s.id}`}
                      className="text-brand-muted hover:text-brand-primary transition-colors"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: About & Feedback */}
            <div>
              <h4 className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-4">
                Community & Feedback
              </h4>
              <p className="text-xs text-brand-muted mb-4 leading-relaxed">
                MindMap Reality is an open, non-profit educational product engineered for curious school and college minds worldwide.
              </p>
              <button
                onClick={() => setFeedbackOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-brand-primary bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl hover:bg-sky-100 dark:hover:bg-sky-900/40 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Send Course Feedback
              </button>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-12 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
            <p>
              © {new Date().getFullYear()} MindMap Reality. Built for educational rigor and real-world clarity.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Zero third-party trackers
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                Open learning platform
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessible Student Feedback Modal */}
      {feedbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-brand-card border border-brand-border rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setFeedbackOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface"
              aria-label="Close feedback modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-brand-primary">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-brand-text">Send Educational Feedback</h3>
            </div>
            <p className="text-xs text-brand-muted mb-4">
              Have an idea for a new real-world simulation, or noticed an error in a concept? Tell our engineering team!
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Thank You!</h4>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  Your feedback has been recorded. We continuously refine MindMap Reality based on student input.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="feedback-email" className="text-xs font-medium text-brand-text block mb-1">
                    Your Email (Optional)
                  </label>
                  <input
                    id="feedback-email"
                    type="email"
                    value={feedbackEmail}
                    onChange={(e) => setFeedbackEmail(e.target.value)}
                    placeholder="student@example.edu"
                    className="w-full px-3 py-2 text-sm bg-brand-surface border border-brand-border rounded-xl text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <div>
                  <label htmlFor="feedback-text" className="text-xs font-medium text-brand-text block mb-1">
                    Feedback or Suggestion <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="feedback-text"
                    required
                    rows={4}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Describe your feedback, suggestion, or question in detail..."
                    className="w-full px-3 py-2 text-sm bg-brand-surface border border-brand-border rounded-xl text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary-hover rounded-xl shadow-sm transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
