import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Bookmark,
  RotateCcw,
  Cloud,
  CloudOff,
  Clock,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  Download,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';
import { subjects } from '../data/subjects';
import { concepts } from '../data/concepts';

export const Progress: React.FC = () => {
  const { user, isConfigured } = useAuth();
  const {
    completedConceptIds,
    bookmarkedConceptIds,
    quizAttempts,
    isSyncing,
    syncError,
    getCompletionPercentage,
    getSubjectProgress,
    getOverallQuizAccuracy,
    getRecommendedConcepts,
    resetProgress,
    importLocalProgressToAccount,
    hasLocalProgressToImport,
  } = useProgress();

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const completionPercent = getCompletionPercentage();
  const quizAccuracy = getOverallQuizAccuracy();
  const recommendedConcepts = getRecommendedConcepts();

  // Bookmarked concepts details
  const bookmarkedConcepts = concepts.filter((c) => bookmarkedConceptIds.includes(c.id));

  // Achievements calculations
  const achievements = [
    {
      id: 'first-step',
      name: 'First Step',
      desc: 'Completed your first educational concept',
      unlocked: completedConceptIds.length >= 1,
    },
    {
      id: 'curious-mind',
      name: 'Curious Mind',
      desc: 'Completed at least 5 concepts',
      unlocked: completedConceptIds.length >= 5,
    },
    {
      id: 'quiz-taker',
      name: 'Assessment Explorer',
      desc: 'Completed at least 1 quiz challenge',
      unlocked: quizAttempts.length >= 1,
    },
    {
      id: 'quiz-master',
      name: 'Honor Roll',
      desc: 'Achieved an overall quiz accuracy of 80% or higher',
      unlocked: quizAttempts.length >= 2 && quizAccuracy >= 80,
    },
  ];

  const handleImport = async () => {
    setImportStatus('Importing...');
    const res = await importLocalProgressToAccount();
    if (res.success) {
      setImportStatus(`Successfully synced ${res.count} local items to your account!`);
      setTimeout(() => setImportStatus(null), 4000);
    } else {
      setImportStatus(`Import error: ${res.error || 'Failed to sync'}`);
    }
  };

  const handleConfirmReset = async () => {
    await resetProgress();
    setResetDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Learning Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-text tracking-tight">
            My Learning Progress
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Track concept masteries, historical quiz scores, and subject completions.
          </p>
        </div>

        {/* Reset progress button */}
        {(completedConceptIds.length > 0 || quizAttempts.length > 0 || bookmarkedConceptIds.length > 0) && (
          <button
            onClick={() => setResetDialogOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl hover:bg-rose-100 self-start sm:self-center transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        )}
      </div>

      {/* Cloud Sync Status Callout */}
      {!user ? (
        <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <CloudOff className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-brand-text">Anonymous Guest Mode</h3>
              <p className="text-xs text-brand-muted leading-relaxed mt-0.5">
                Your progress is stored locally on this device. Create an account or sign in to synchronize your bookmarks and completions across devices with Supabase.
              </p>
            </div>
          </div>
          <Link
            to="/signup"
            className="px-4 py-2 text-xs font-bold text-white bg-brand-primary rounded-xl hover:bg-brand-primary-hover shrink-0 text-center"
          >
            Sign Up to Sync
          </Link>
        </div>
      ) : (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Cloud className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-brand-text">Account Cloud Sync Active</h3>
              <p className="text-xs text-brand-muted mt-0.5">
                Connected as <strong className="text-brand-text">{user.email}</strong>. Progress automatically syncs to your personal profile.
              </p>
            </div>
          </div>

          {hasLocalProgressToImport && (
            <button
              onClick={handleImport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-200 dark:bg-emerald-900 rounded-xl hover:bg-emerald-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Import Guest Progress</span>
            </button>
          )}
        </div>
      )}

      {isSyncing && (
        <div className="p-3 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl text-xs text-brand-primary font-medium flex items-center gap-2">
          <span className="animate-spin">🔄</span>
          <span>Synchronizing progress with Supabase cloud database...</span>
        </div>
      )}

      {syncError && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-300 font-medium flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{syncError}</span>
        </div>
      )}

      {importStatus && (
        <div className="p-3 bg-brand-surface rounded-xl border border-brand-border text-xs text-brand-text font-medium">
          {importStatus}
        </div>
      )}

      {/* Primary KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-brand-muted block">Completed Concepts</span>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-3xl font-black text-brand-text font-mono">
              {completedConceptIds.length}
            </span>
            <span className="text-xs text-brand-muted">/ {concepts.length}</span>
          </div>
          <div className="w-full bg-brand-surface h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-brand-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-brand-muted block">Overall Quiz Accuracy</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-black text-sky-600 dark:text-sky-400 font-mono">
              {quizAccuracy}%
            </span>
          </div>
          <span className="text-[11px] text-brand-muted block mt-3">
            Across {quizAttempts.length} quiz sessions
          </span>
        </div>

        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-brand-muted block">Bookmarked Lessons</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-black text-brand-text font-mono">
              {bookmarkedConceptIds.length}
            </span>
          </div>
          <span className="text-[11px] text-brand-muted block mt-3">
            Saved for future reference
          </span>
        </div>

        <div className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-brand-muted block">Unlocked Achievements</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">
              {achievements.filter((a) => a.unlocked).length} / {achievements.length}
            </span>
          </div>
          <span className="text-[11px] text-brand-muted block mt-3">
            Curriculum milestones
          </span>
        </div>
      </div>

      {/* Subject-Wise Progress Breakdown */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-text">Subject Discipline Progress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((s) => {
            const prog = getSubjectProgress(s.id);
            return (
              <div key={s.id} className="p-3.5 bg-brand-surface rounded-xl border border-brand-border/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-brand-text">{s.name}</span>
                  <span className="text-brand-muted font-mono font-medium">
                    {prog.completed}/{prog.total} ({prog.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-brand-card h-2 rounded-full overflow-hidden border border-brand-border/40">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${prog.percentage}%`,
                      backgroundColor: s.color || '#38A9F5',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Concepts Based on Performance */}
      {recommendedConcepts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg font-bold text-brand-text">Recommended Next Lessons</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedConcepts.map((rec) => (
              <Link
                key={rec.id}
                to={`/concept/${rec.id}`}
                className="p-5 bg-brand-card border border-brand-border rounded-2xl hover:border-brand-primary transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-brand-muted mb-2">
                    <span className="font-semibold text-brand-primary">{rec.subjectName}</span>
                    <span>{rec.readingTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-brand-text group-hover:text-brand-primary transition-colors mb-2">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                    {rec.shortDescription}
                  </p>
                </div>
                <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-bold text-brand-primary mt-4">
                  <span>Start Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bookmarked Lessons Section */}
      {bookmarkedConcepts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg font-bold text-brand-text">Bookmarked Lessons</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bookmarkedConcepts.map((b) => (
              <Link
                key={b.id}
                to={`/concept/${b.id}`}
                className="p-4 bg-brand-card border border-brand-border rounded-xl hover:border-brand-primary transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold text-brand-primary block">{b.subjectName}</span>
                  <h4 className="text-sm font-bold text-brand-text group-hover:text-brand-primary truncate max-w-[200px]">
                    {b.title}
                  </h4>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-muted group-hover:text-brand-primary" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Attempt History */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-text">Historical Quiz Attempts</h2>
        {quizAttempts.length === 0 ? (
          <div className="text-center py-6 text-brand-muted space-y-2">
            <HelpCircle className="w-8 h-8 mx-auto text-brand-muted" />
            <p className="text-xs">No quiz sessions recorded yet.</p>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-brand-primary rounded-xl"
            >
              <span>Take Your First Quiz</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-brand-border/60">
            {quizAttempts.map((attempt) => (
              <div key={attempt.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-brand-text block">{attempt.topic}</span>
                  <span className="text-brand-muted">
                    {new Date(attempt.completedAt).toLocaleDateString()} • {attempt.subjectId}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-brand-primary block">
                    {attempt.score} / {attempt.totalQuestions}
                  </span>
                  <span className="text-[11px] text-brand-muted">
                    {Math.round((attempt.score / attempt.totalQuestions) * 100)}% accuracy
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Milestone Achievements */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-brand-text">Learning Milestones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-xl border transition-all ${
                ach.unlocked
                  ? 'bg-brand-surface border-brand-primary/40'
                  : 'bg-brand-surface/30 border-brand-border/40 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Award className={`w-4 h-4 ${ach.unlocked ? 'text-brand-primary' : 'text-brand-muted'}`} />
                <h3 className="text-xs font-bold text-brand-text">{ach.name}</h3>
              </div>
              <p className="text-[11px] text-brand-muted leading-relaxed">{ach.desc}</p>
              <span className={`text-[10px] font-bold uppercase mt-2 block ${ach.unlocked ? 'text-emerald-500' : 'text-brand-muted'}`}>
                {ach.unlocked ? 'Unlocked ✓' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-brand-card border border-brand-border rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2.5 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Reset Learning Progress?</h3>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              This will permanently delete all completed concept marks, bookmarked lessons, and historical quiz attempts {user ? 'from your cloud database account' : 'from this local browser'}. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setResetDialogOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-brand-text bg-brand-surface rounded-xl hover:bg-brand-surface-hover"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm"
              >
                Yes, Reset All Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
