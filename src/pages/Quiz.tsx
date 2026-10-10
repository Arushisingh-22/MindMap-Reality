import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  BookOpen,
  Filter,
  Check,
  TrendingUp,
} from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import { subjects } from '../data/subjects';
import { useProgress } from '../contexts/ProgressContext';
import { QuizQuestion, Difficulty } from '../types';

export const Quiz: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const subjectParam = searchParams.get('subject') || 'all';

  const { saveQuizAttempt } = useProgress();

  // Filters
  const [selectedSubject, setSelectedSubject] = useState<string>(subjectParam);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [quizStarted, setQuizStarted] = useState(false);

  // Active quiz session state
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; selectedIndex: number; isCorrect: boolean }[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isAttemptSaved, setIsAttemptSaved] = useState(false);

  // Filter available questions based on settings
  const availableQuestions = useMemo(() => {
    return quizQuestions.filter((q) => {
      if (selectedSubject !== 'all' && q.subjectId !== selectedSubject) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedSubject, selectedDifficulty]);

  // Start new quiz
  const handleStartQuiz = () => {
    const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random()).slice(0, 5);
    if (shuffled.length === 0) return;
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setQuizCompleted(false);
    setIsAttemptSaved(false);
    setQuizStarted(true);
  };

  const currentQ = activeQuestions[currentIndex];

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctAnswerIndex;
    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        selectedIndex: selectedOption,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Quiz completed!
      setQuizCompleted(true);
    }
  };

  // Calculate score on finish and persist to ProgressContext
  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const totalCount = activeQuestions.length;
  const accuracyPercent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  useEffect(() => {
    if (quizCompleted && !isAttemptSaved && totalCount > 0) {
      setIsAttemptSaved(true);
      const incorrectIds = userAnswers.filter((a) => !a.isCorrect).map((a) => a.questionId);

      saveQuizAttempt({
        subjectId: selectedSubject === 'all' ? 'mixed' : selectedSubject,
        topic: selectedSubject === 'all' ? 'Comprehensive Assessment' : activeQuestions[0]?.topic || 'Curriculum Quiz',
        score: correctCount,
        totalQuestions: totalCount,
        incorrectQuestionIds: incorrectIds,
      });

      // Trigger celebration confetti if score is high
      if (accuracyPercent >= 70) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {}
      }
    }
  }, [quizCompleted, isAttemptSaved, totalCount, correctCount, selectedSubject, activeQuestions, userAnswers, accuracyPercent, saveQuizAttempt]);

  // Retry only incorrect questions
  const handleRetryIncorrect = () => {
    const incorrectIds = userAnswers.filter((a) => !a.isCorrect).map((a) => a.questionId);
    const retrySubset = quizQuestions.filter((q) => incorrectIds.includes(q.id));
    if (retrySubset.length === 0) return;

    setActiveQuestions(retrySubset);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setQuizCompleted(false);
    setIsAttemptSaved(false);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Formative Educational Assessments</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-text tracking-tight">
          Quiz & Challenges
        </h1>
        <p className="text-sm text-brand-muted max-w-xl mx-auto">
          Validate your conceptual understanding through real-world academic scenarios and instant corrective feedback.
        </p>
      </div>

      {/* QUIZ CONFIGURATION SCREEN (Before starting) */}
      {!quizStarted ? (
        <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-brand-border">
            <Filter className="w-5 h-5 text-brand-primary" />
            <h3 className="text-lg font-bold text-brand-text">Configure Quiz Session</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Subject Selector */}
            <div>
              <label htmlFor="quiz-subject" className="text-xs font-semibold text-brand-muted block mb-1.5">
                Subject Discipline
              </label>
              <select
                id="quiz-subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold bg-brand-surface border border-brand-border rounded-xl text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="all">All Subjects (Comprehensive Exam)</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Selector */}
            <div>
              <label htmlFor="quiz-difficulty" className="text-xs font-semibold text-brand-muted block mb-1.5">
                Difficulty Level
              </label>
              <select
                id="quiz-difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold bg-brand-surface border border-brand-border rounded-xl text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="all">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-brand-surface rounded-2xl border border-brand-border/60 flex items-center justify-between text-xs">
            <span className="text-brand-muted">
              Matching questions pool: <strong className="text-brand-text">{availableQuestions.length}</strong>
            </span>
            <span className="text-brand-primary font-semibold">5 questions per session</span>
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={availableQuestions.length === 0}
            className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 rounded-2xl shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Begin Assessment</span>
          </button>
        </div>
      ) : quizCompleted ? (
        /* QUIZ SCORE / RESULTS SCREEN */
        <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 text-center animate-in fade-in">
          <div className="w-16 h-16 rounded-3xl bg-sky-100 dark:bg-sky-950/80 text-brand-primary mx-auto flex items-center justify-center shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-text">
              Assessment Completed!
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Here is how you performed on this challenge session.
            </p>
          </div>

          {/* Score Stats Cards */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
            <div className="p-4 bg-brand-surface rounded-2xl border border-brand-border">
              <span className="text-xs text-brand-muted block font-medium">Final Score</span>
              <span className="text-3xl font-black text-brand-text font-mono mt-0.5 block">
                {correctCount} / {totalCount}
              </span>
            </div>
            <div className="p-4 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border border-sky-200 dark:border-sky-800">
              <span className="text-xs text-sky-700 dark:text-sky-300 block font-medium">Accuracy</span>
              <span className="text-3xl font-black text-brand-primary font-mono mt-0.5 block">
                {accuracyPercent}%
              </span>
            </div>
          </div>

          {/* Review Incorrect Section */}
          {correctCount < totalCount && (
            <div className="text-left bg-brand-surface/60 rounded-2xl p-5 border border-brand-border space-y-3">
              <h3 className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                Review Questions for Improvement:
              </h3>
              <div className="space-y-2">
                {userAnswers
                  .filter((a) => !a.isCorrect)
                  .map((ans) => {
                    const q = activeQuestions.find((item) => item.id === ans.questionId);
                    if (!q) return null;
                    return (
                      <div key={q.id} className="p-3 bg-brand-card rounded-xl border border-brand-border text-xs space-y-1">
                        <p className="font-bold text-brand-text">{q.question}</p>
                        <p className="text-rose-600 dark:text-rose-400">
                          Your choice: {q.options[ans.selectedIndex]}
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Correct: {q.options[q.correctAnswerIndex]}
                        </p>
                        <p className="text-brand-muted text-[11px] pt-1">{q.explanation}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {correctCount < totalCount && (
              <button
                onClick={handleRetryIncorrect}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-brand-primary bg-sky-50 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800 rounded-xl hover:bg-sky-100"
              >
                Retry Incorrect Questions
              </button>
            )}
            <button
              onClick={handleStartQuiz}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-brand-primary hover:bg-brand-primary-hover rounded-xl shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart New Quiz</span>
            </button>
            <Link
              to="/progress"
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-brand-text bg-brand-surface border border-brand-border rounded-xl hover:bg-brand-surface-hover text-center"
            >
              View My Progress
            </Link>
          </div>
        </div>
      ) : (
        /* ACTIVE QUESTION SCREEN */
        <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-brand-muted pb-3 border-b border-brand-border">
            <span className="font-bold text-brand-primary uppercase">
              Question {currentIndex + 1} of {activeQuestions.length}
            </span>
            <span className="px-2 py-0.5 rounded bg-brand-surface text-brand-text font-medium">
              {currentQ.topic} • {currentQ.difficulty}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-brand-text leading-snug">
            {currentQ.question}
          </h2>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              let style = 'bg-brand-card border-brand-border text-brand-text hover:bg-brand-surface';
              if (isAnswerSubmitted) {
                if (idx === currentQ.correctAnswerIndex) {
                  style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                } else if (selectedOption === idx) {
                  style = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-300';
                }
              } else if (selectedOption === idx) {
                style = 'bg-sky-500/10 border-brand-primary text-brand-primary font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => !isAnswerSubmitted && setSelectedOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  {isAnswerSubmitted && idx === currentQ.correctAnswerIndex && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                  {isAnswerSubmitted && selectedOption === idx && idx !== currentQ.correctAnswerIndex && (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner when answered */}
          {isAnswerSubmitted && (
            <div className="p-4 bg-brand-surface rounded-2xl border border-brand-border space-y-2 animate-in fade-in">
              <span className="text-xs font-bold text-brand-text uppercase tracking-wider block">
                {selectedOption === currentQ.correctAnswerIndex ? '🎉 Correct!' : '💡 Explanation:'}
              </span>
              <p className="text-xs text-brand-muted leading-relaxed">
                {currentQ.explanation}
              </p>
              {currentQ.realWorldContext && (
                <p className="text-xs text-brand-primary font-medium mt-1">
                  Real-world application: {currentQ.realWorldContext}
                </p>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-brand-muted">
              {correctCount} correct so far
            </span>
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 text-xs font-bold text-white bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 rounded-xl shadow-sm transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-brand-primary hover:bg-brand-primary-hover rounded-xl shadow-sm transition-all"
              >
                <span>{currentIndex < activeQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
