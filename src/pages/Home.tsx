import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  FlaskConical,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle,
  HelpCircle,
  Clock,
  Bookmark,
  Check,
  TrendingUp,
  Award,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  Layers,
} from 'lucide-react';
import { concepts } from '../data/concepts';
import { subjects } from '../data/subjects';
import { useProgress } from '../contexts/ProgressContext';
import { quizQuestions } from '../data/quizQuestions';

export const Home: React.FC = () => {
  const { completedConceptIds, isConceptCompleted, toggleConceptCompleted, isBookmarked, toggleBookmark } = useProgress();

  // Featured concept: Ohm's Law
  const featuredConcept = concepts.find((c) => c.id === 'ohms-law') || concepts[0];

  // Daily Challenge Question (deterministic for today)
  const todayQuestion = quizQuestions[0]; // Ohm's law question
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);

  // Mini Interactive Circuit for Hero
  const [heroVoltage, setHeroVoltage] = useState(6);
  const heroResistance = 3;
  const heroCurrent = (heroVoltage / heroResistance).toFixed(1);

  // Incomplete concepts for Continue Learning
  const inProgressConcepts = concepts.filter((c) => !completedConceptIds.includes(c.id)).slice(0, 3);
  const completedCount = completedConceptIds.length;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-4 sm:pt-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/80 text-sky-700 dark:text-sky-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>Real-World Educational Learning Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-text tracking-tight leading-[1.1]">
              Every Chapter Has a <span className="text-brand-primary">Real-World Story.</span>
            </h1>

            <p className="text-lg sm:text-xl text-brand-muted leading-relaxed max-w-2xl">
              Understand what you learn, discover where it matters, and apply your knowledge beyond the classroom. From circuits to chemical balances and probability.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                to="/explore"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base text-white bg-brand-primary hover:bg-brand-primary-hover shadow-lg shadow-sky-500/25 active:scale-95 transition-all text-center"
              >
                <Compass className="w-5 h-5" />
                <span>Start Exploring</span>
              </Link>
              <Link
                to="/lab"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base text-brand-text bg-brand-card hover:bg-brand-surface border border-brand-border active:scale-95 transition-all text-center"
              >
                <FlaskConical className="w-5 h-5 text-brand-primary" />
                <span>Try an Interactive Experiment</span>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-brand-border/60 max-w-lg">
              <div>
                <span className="text-2xl font-black text-brand-text font-mono">12</span>
                <p className="text-xs text-brand-muted">Subject Disciplines</p>
              </div>
              <div>
                <span className="text-2xl font-black text-brand-text font-mono">36+</span>
                <p className="text-xs text-brand-muted">Applied Concepts</p>
              </div>
              <div>
                <span className="text-2xl font-black text-brand-text font-mono">4</span>
                <p className="text-xs text-brand-muted">Virtual Lab Sims</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Concept Preview */}
          <div className="lg:col-span-5">
            <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400">
                    <Zap className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider block">Live Concept Widget</span>
                    <h3 className="text-sm font-bold text-brand-text">Ohm's Law: Voltage vs Current</h3>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-brand-surface text-brand-primary">
                  I = V / R
                </span>
              </div>

              {/* Interactive Circuit Slider */}
              <div className="mt-5 space-y-4">
                <div className="bg-brand-surface/70 p-4 rounded-2xl border border-brand-border/60">
                  <div className="flex justify-between items-center text-xs font-semibold mb-2">
                    <span className="text-brand-text">Adjust Source Voltage:</span>
                    <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">{heroVoltage} Volts</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    step={1}
                    value={heroVoltage}
                    onChange={(e) => setHeroVoltage(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer h-2 bg-brand-border rounded-lg"
                    aria-label="Adjust source voltage"
                  />
                  <div className="flex justify-between text-[10px] text-brand-muted mt-1 font-mono">
                    <span>2V (Low push)</span>
                    <span>6V</span>
                    <span>12V (High push)</span>
                  </div>
                </div>

                {/* Live Output Box */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-brand-surface rounded-xl border border-brand-border/60">
                    <span className="text-[11px] text-brand-muted block font-medium">Constant Resistance</span>
                    <span className="text-xl font-extrabold text-brand-text font-mono mt-0.5 block">{heroResistance} Ω</span>
                  </div>
                  <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800/60">
                    <span className="text-[11px] text-sky-700 dark:text-sky-300 block font-medium">Resulting Current</span>
                    <span className="text-xl font-extrabold text-sky-600 dark:text-sky-400 font-mono mt-0.5 block">
                      {heroCurrent} A
                    </span>
                  </div>
                </div>

                {/* Animated visual bulb glow preview */}
                <div className="p-4 bg-brand-surface/40 rounded-2xl border border-brand-border/60 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-brand-text block">Real-World Observation</span>
                    <p className="text-xs text-brand-muted">
                      As voltage increases, current surges, lighting up the filament bulb.
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 shadow-inner"
                    style={{
                      backgroundColor: `rgba(250, 204, 21, ${heroVoltage / 12})`,
                      boxShadow: `0 0 ${heroVoltage * 2}px rgba(250, 204, 21, 0.8)`,
                    }}
                  >
                    <Zap className="w-5 h-5 text-amber-700 dark:text-amber-300" />
                  </div>
                </div>

                <Link
                  to="/concept/ohms-law"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-brand-primary bg-brand-surface hover:bg-brand-surface-hover rounded-xl border border-brand-border transition-colors"
                >
                  <span>Explore Full Lesson & Simulation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. HOW IT WORKS (LEARN -> CONNECT -> APPLY -> TEST) */}
      {/* ========================================================================= */}
      <section className="py-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
            Pedagogical Framework
          </span>
          <h2 className="text-3xl font-extrabold text-brand-text tracking-tight">
            How MindMap Reality Works
          </h2>
          <p className="text-sm text-brand-muted">
            We bridge the gap between abstract academic formulas and their concrete manifestations in human life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Learn',
              desc: 'Understand foundational principles with clean definitions, key terms, formulas, and worked examples.',
              color: 'text-sky-500',
              bgColor: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/60',
            },
            {
              step: '02',
              title: 'Connect',
              desc: 'Discover where the concept appears in everyday devices, ecosystems, financial markets, and society.',
              color: 'text-teal-500',
              bgColor: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/60',
            },
            {
              step: '03',
              title: 'Apply',
              desc: 'Solve realistic problems and experiment with interactive simulations to see causes and effects directly.',
              color: 'text-indigo-500',
              bgColor: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/60',
            },
            {
              step: '04',
              title: 'Test Yourself',
              desc: 'Validate your understanding with scenario-based challenges, immediate explanations, and score tracking.',
              color: 'text-purple-500',
              bgColor: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60',
            },
          ].map((item) => (
            <div
              key={item.step}
              className={`p-6 rounded-2xl border ${item.bgColor} flex flex-col justify-between transition-transform hover:-translate-y-1 duration-200`}
            >
              <div>
                <span className={`text-2xl font-black font-mono ${item.color} block mb-3`}>
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-brand-text mb-2">{item.title}</h3>
                <p className="text-xs text-brand-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FEATURED CONCEPT (OHM'S LAW) */}
      {/* ========================================================================= */}
      <section className="py-6">
        <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-sky-100 dark:bg-sky-950/80 text-brand-primary">
                  Featured Master Lesson
                </span>
                <span className="px-2 py-0.5 text-xs rounded-md bg-brand-surface text-brand-muted font-medium">
                  {featuredConcept.subjectName}
                </span>
                <span className="px-2 py-0.5 text-xs rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-semibold">
                  {featuredConcept.difficulty}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-text">
                {featuredConcept.title}
              </h3>

              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {featuredConcept.learn.definition}
              </p>

              {/* Real-World Context Callout */}
              <div className="p-4 bg-brand-surface rounded-2xl border border-brand-border/60 space-y-2">
                <span className="text-xs font-bold text-brand-text uppercase tracking-wider block">
                  Everyday Connection:
                </span>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {featuredConcept.connect.realWorldSummary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-brand-muted pt-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-brand-primary" />
                  {featuredConcept.readingTime}
                </span>
                <span>•</span>
                <span className="font-mono font-medium">Formula: I = V / R</span>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 pt-4 lg:pt-0">
              <Link
                to={`/concept/${featuredConcept.id}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-primary hover:bg-brand-primary-hover shadow-sm transition-all text-center"
              >
                <span>Explore Concept</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/lab"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-brand-text bg-brand-surface hover:bg-brand-surface-hover border border-brand-border transition-colors text-center"
              >
                <FlaskConical className="w-4 h-4 text-brand-primary" />
                <span>Launch Interactive Sim</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED SUBJECTS (PHYSICS, CHEMISTRY, BIOLOGY, MATHEMATICS) */}
      {/* ========================================================================= */}
      <section className="py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block mb-1">
              Academic Disciplines
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text tracking-tight">
              Featured Subjects
            </h2>
          </div>
          <Link
            to="/subjects"
            className="inline-flex items-center gap-1 text-sm font-bold text-brand-primary hover:text-brand-primary-hover"
          >
            <span>View All 12 Subjects</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.slice(0, 4).map((subject) => (
            <Link
              key={subject.id}
              to={`/subjects?selected=${subject.id}`}
              className="bg-brand-card border border-brand-border hover:border-brand-primary/60 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white mb-4 shadow-sm"
                  style={{ backgroundColor: subject.color || '#38A9F5' }}
                >
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-primary transition-colors mb-2">
                  {subject.name}
                </h3>
                <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed mb-4">
                  {subject.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {subject.topics.slice(0, 2).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 rounded-md bg-brand-surface text-[11px] font-medium text-brand-muted"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-brand-primary flex items-center gap-1">
                  <span>{subject.conceptCount} Lessons available</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. DAILY CHALLENGE INTERACTIVE SECTION */}
      {/* ========================================================================= */}
      <section className="py-6">
        <div className="bg-gradient-to-br from-sky-500/10 via-brand-card to-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border/60">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-sky-500 text-white shadow-sm">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block">
                    Daily Knowledge Challenge
                  </span>
                  <h3 className="text-lg font-bold text-brand-text">Test Your Intuition Today</h3>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-surface text-brand-muted">
                {todayQuestion.topic}
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-base sm:text-lg font-bold text-brand-text">
                {todayQuestion.question}
              </p>

              <div className="space-y-2.5">
                {todayQuestion.options.map((option, idx) => {
                  let buttonStyle = 'bg-brand-card border-brand-border text-brand-text hover:bg-brand-surface';
                  if (challengeSubmitted) {
                    if (idx === todayQuestion.correctAnswerIndex) {
                      buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                    } else if (selectedAnswer === idx) {
                      buttonStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-300';
                    }
                  } else if (selectedAnswer === idx) {
                    buttonStyle = 'bg-sky-500/10 border-brand-primary text-brand-primary font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !challengeSubmitted && setSelectedAnswer(idx)}
                      disabled={challengeSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${buttonStyle}`}
                    >
                      <span>{option}</span>
                      {challengeSubmitted && idx === todayQuestion.correctAnswerIndex && (
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {!challengeSubmitted ? (
                <button
                  onClick={() => selectedAnswer !== null && setChallengeSubmitted(true)}
                  disabled={selectedAnswer === null}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 rounded-xl transition-all shadow-sm"
                >
                  Submit Daily Answer
                </button>
              ) : (
                <div className="p-4 bg-brand-surface rounded-2xl border border-brand-border space-y-2 animate-in fade-in">
                  <span className="text-xs font-bold text-brand-text uppercase tracking-wider block">
                    {selectedAnswer === todayQuestion.correctAnswerIndex ? '🎉 Correct!' : '💡 Explanation:'}
                  </span>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {todayQuestion.explanation}
                  </p>
                  {todayQuestion.realWorldContext && (
                    <p className="text-xs text-brand-primary font-medium mt-1">
                      Real-world: {todayQuestion.realWorldContext}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CONTINUE LEARNING SECTION */}
      {/* ========================================================================= */}
      <section className="py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block mb-1">
              Your Journey
            </span>
            <h2 className="text-2xl font-extrabold text-brand-text">Continue Learning</h2>
          </div>
          <Link to="/progress" className="text-xs font-bold text-brand-primary hover:underline">
            View Full Progress ({completedCount} completed)
          </Link>
        </div>

        {completedCount > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inProgressConcepts.map((concept) => (
              <div
                key={concept.id}
                className="bg-brand-card border border-brand-border rounded-2xl p-5 flex flex-col justify-between hover:shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
                    <span className="font-semibold text-brand-primary">{concept.subjectName}</span>
                    <span>{concept.readingTime}</span>
                  </div>
                  <h4 className="text-base font-bold text-brand-text mb-2">{concept.title}</h4>
                  <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                    {concept.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between">
                  <Link
                    to={`/concept/${concept.id}`}
                    className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
                  >
                    <span>Read Lesson</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <button
                    onClick={() => toggleBookmark(concept.id)}
                    className="p-1.5 text-brand-muted hover:text-brand-primary rounded-lg"
                    aria-label="Bookmark concept"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isBookmarked(concept.id) ? 'fill-sky-500 text-sky-500' : ''}`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-brand-card border border-brand-border rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/80 text-brand-primary mx-auto flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text">Start Your Learning Journey</h3>
              <p className="text-xs text-brand-muted max-w-md mx-auto mt-1 leading-relaxed">
                You haven't completed any concepts yet. Pick any subject from the catalog to see how principles come alive in the real world.
              </p>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-primary rounded-xl shadow-sm hover:bg-brand-primary-hover"
            >
              <Compass className="w-4 h-4" />
              <span>Browse All Concepts</span>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};
