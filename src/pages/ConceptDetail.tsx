import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Globe2,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Share2,
  Info,
  Check,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import { concepts } from '../data/concepts';
import { useProgress } from '../contexts/ProgressContext';
import { OhmsLawSim } from '../components/simulations/OhmsLawSim';
import { MechanicalLeverSim } from '../components/simulations/MechanicalLeverSim';
import { ProbabilitySim } from '../components/simulations/ProbabilitySim';
import { EnergyCalculatorSim } from '../components/simulations/EnergyCalculatorSim';

type Tab = 'textbook' | 'real-world' | 'apply-it';

export const ConceptDetail: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('textbook');

  const {
    isConceptCompleted,
    toggleConceptCompleted,
    isBookmarked,
    toggleBookmark,
  } = useProgress();

  // Find concept
  const concept = concepts.find((c) => c.id === conceptId);

  // Apply-It interactive state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reset local interactive state when conceptId changes
  useEffect(() => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setActiveTab('textbook');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [conceptId]);

  if (!concept) {
    return (
      <div className="bg-brand-card border border-brand-border rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 my-12">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-brand-text">Concept Not Found</h2>
        <p className="text-sm text-brand-muted">
          The concept ID "<strong className="text-brand-text">{conceptId}</strong>" does not exist in the curriculum database.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-brand-primary rounded-xl hover:bg-brand-primary-hover shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Explore Catalog</span>
        </Link>
      </div>
    );
  }

  // Calculate previous and next concepts
  const currentIndex = concepts.findIndex((c) => c.id === concept.id);
  const prevConcept = currentIndex > 0 ? concepts[currentIndex - 1] : null;
  const nextConcept = currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : null;

  const completed = isConceptCompleted(concept.id);
  const bookmarked = isBookmarked(concept.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const selectedOption = concept.apply.options?.find((opt) => opt.id === selectedOptionId);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border/60">
        <div className="flex items-center gap-2 text-xs text-brand-muted">
          <Link to="/explore" className="hover:text-brand-primary">
            Explore
          </Link>
          <span>/</span>
          <Link to={`/subjects?selected=${concept.subjectId}`} className="hover:text-brand-primary font-medium">
            {concept.subjectName}
          </Link>
          <span>/</span>
          <span className="text-brand-text font-bold truncate max-w-[200px] sm:max-w-xs">{concept.title}</span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(concept.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              bookmarked
                ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-400 text-brand-primary'
                : 'bg-brand-card border-brand-border text-brand-muted hover:text-brand-text'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-sky-500' : ''}`} />
            <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-border bg-brand-card text-brand-muted hover:text-brand-text text-xs font-semibold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
          </button>

          {/* Mark Complete Button */}
          <button
            onClick={() => toggleConceptCompleted(concept.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              completed
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-700 dark:text-emerald-300'
                : 'bg-brand-primary text-white border-brand-primary hover:bg-brand-primary-hover shadow-sm'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{completed ? 'Completed ✓' : 'Mark Completed'}</span>
          </button>
        </div>
      </div>

      {/* Concept Hero Header Banner */}
      <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-sky-100 dark:bg-sky-950/80 text-brand-primary">
            {concept.subjectName}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-surface text-brand-muted">
            {concept.category}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-surface text-brand-text">
            {concept.difficulty}
          </span>
          <span className="flex items-center gap-1 text-xs text-brand-muted ml-auto font-medium">
            <Clock className="w-3.5 h-3.5 text-brand-primary" />
            {concept.readingTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-brand-text tracking-tight leading-tight">
          {concept.title}
        </h1>

        <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-3xl">
          {concept.shortDescription}
        </p>

        {/* Action Shortcuts (Sim & Quiz) */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {concept.simulationId && (
            <Link
              to="/lab"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800 rounded-xl hover:bg-sky-100 transition-colors"
            >
              <FlaskConical className="w-4 h-4 text-sky-500" />
              <span>Launch Interactive Lab Simulation</span>
            </Link>
          )}
          <Link
            to={`/quiz?subject=${concept.subjectId}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-text bg-brand-surface border border-brand-border rounded-xl hover:bg-brand-surface-hover transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-purple-500" />
            <span>Take {concept.subjectName} Quiz</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SIGNATURE THREE-TAB NAVIGATION BAR */}
      {/* ========================================================================= */}
      <div className="border-b border-brand-border">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-px" role="tablist">
          <button
            onClick={() => setActiveTab('textbook')}
            role="tab"
            aria-selected={activeTab === 'textbook'}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'textbook'
                ? 'border-brand-primary text-brand-primary bg-sky-500/5'
                : 'border-transparent text-brand-muted hover:text-brand-text hover:border-brand-border'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Textbook Principle</span>
          </button>

          <button
            onClick={() => setActiveTab('real-world')}
            role="tab"
            aria-selected={activeTab === 'real-world'}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'real-world'
                ? 'border-brand-primary text-brand-primary bg-sky-500/5'
                : 'border-transparent text-brand-muted hover:text-brand-text hover:border-brand-border'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>2. Real-World Connection</span>
          </button>

          <button
            onClick={() => setActiveTab('apply-it')}
            role="tab"
            aria-selected={activeTab === 'apply-it'}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'apply-it'
                ? 'border-brand-primary text-brand-primary bg-sky-500/5'
                : 'border-transparent text-brand-muted hover:text-brand-text hover:border-brand-border'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>3. Apply It Challenge</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TEXTBOOK PRINCIPLE */}
      {/* ========================================================================= */}
      {activeTab === 'textbook' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Formal Definition */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block">
              Core Formal Definition
            </span>
            <p className="text-base sm:text-lg font-medium text-brand-text leading-relaxed bg-brand-surface/60 p-4 rounded-xl border border-brand-border/60">
              "{concept.learn.definition}"
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-brand-text">Theoretical Foundations</h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                {concept.learn.textbookExplanation}
              </p>
            </div>
          </div>

          {/* Mathematical Formula (if present) */}
          {concept.learn.formula && (
            <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 rounded-2xl p-6 space-y-3">
              <span className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider block">
                Mathematical Law / Formula
              </span>
              <div className="py-3 px-4 bg-brand-card rounded-xl border border-sky-200 dark:border-sky-800 flex items-center justify-center font-mono text-xl sm:text-2xl font-black text-brand-primary">
                <BlockMath math={concept.learn.formula} />              </div>
              {concept.learn.formulaExplanation && (
                <p className="text-xs text-sky-800 dark:text-sky-300 font-medium">
                  {concept.learn.formulaExplanation}
                </p>
              )}
            </div>
          )}

          {/* Key Terminology Glossary */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-brand-text">Key Terms & Physical Constants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {concept.learn.keyTerms.map((kt) => (
                <div key={kt.term} className="p-4 bg-brand-surface rounded-xl border border-brand-border/60 space-y-1">
                  <span className="text-sm font-bold text-brand-primary block">{kt.term}</span>
                  <p className="text-xs text-brand-muted leading-relaxed">{kt.definition}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Worked Example (if present) */}
          {concept.learn.workedExample && (
            <div className="bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-brand-text">Worked Step-by-Step Example</h3>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl space-y-2">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block">
                  Problem:
                </span>
                <p className="text-xs sm:text-sm text-brand-text font-medium leading-relaxed">
                  {concept.learn.workedExample.problem}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-brand-muted uppercase tracking-wider block">
                  Derivation Steps:
                </span>
                <ol className="list-decimal list-inside space-y-2 text-xs text-brand-muted font-medium">
                  {concept.learn.workedExample.steps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">
                      <span className="text-brand-text font-normal">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-3 bg-brand-surface rounded-xl border border-brand-border font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Solution: {concept.learn.workedExample.solution}
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          <div className="bg-brand-surface/60 border border-brand-border rounded-2xl p-6 space-y-3">
            <span className="text-xs font-bold text-brand-text uppercase tracking-wider block">
              Core Takeaways
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-muted">
              {concept.learn.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-brand-text">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: REAL-WORLD CONNECTION */}
      {/* ========================================================================= */}
      {activeTab === 'real-world' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Summary Box */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8 space-y-3 shadow-sm">
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block">
              Why This Concept Matters In The World
            </span>
            <p className="text-base sm:text-lg text-brand-text leading-relaxed">
              {concept.connect.realWorldSummary}
            </p>
          </div>

          {/* Embedded Lab Simulation (if matching) */}
          {concept.simulationId === 'ohms-law' && <OhmsLawSim />}
          {concept.simulationId === 'mechanical-lever' && <MechanicalLeverSim />}
          {concept.simulationId === 'probability' && <ProbabilitySim />}
          {concept.simulationId === 'energy-calc' && <EnergyCalculatorSim />}

          {/* Real World Examples Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-brand-text">Concrete Everyday Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {concept.connect.examples.map((example, idx) => (
                <div
                  key={idx}
                  className="bg-brand-card border border-brand-border rounded-2xl p-6 space-y-3 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    {example.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950 text-brand-primary inline-block">
                        {example.badge}
                      </span>
                    )}
                    <h4 className="text-base font-bold text-brand-text">{example.title}</h4>
                    <p className="text-xs text-brand-muted leading-relaxed">{example.context}</p>
                  </div>
                  <div className="p-3 bg-brand-surface rounded-xl border border-brand-border/60">
                    <span className="text-[10px] font-bold text-brand-text uppercase tracking-wider block mb-0.5">
                      Why It Matters:
                    </span>
                    <p className="text-xs text-brand-primary font-medium">{example.whyItMatters}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: APPLY IT CHALLENGE */}
      {/* ========================================================================= */}
      {activeTab === 'apply-it' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                  Practical Application Challenge
                </span>
                <h3 className="text-xl font-bold text-brand-text">Test Your Real-World Intuition</h3>
              </div>
            </div>

            {/* Scenario Box */}
            <div className="p-4 bg-brand-surface rounded-2xl border border-brand-border space-y-1">
              <span className="text-xs font-bold text-brand-text block">Real Scenario:</span>
              <p className="text-xs text-brand-muted leading-relaxed">{concept.apply.scenario}</p>
            </div>

            {/* Problem Statement */}
            <p className="text-base font-bold text-brand-text leading-snug">
              {concept.apply.problemStatement}
            </p>

            {/* Multiple Choice Options */}
            {concept.apply.options && (
              <div className="space-y-3">
                {concept.apply.options.map((opt) => {
                  let buttonStyle = 'bg-brand-card border-brand-border text-brand-text hover:bg-brand-surface';
                  if (isSubmitted) {
                    if (opt.isCorrect) {
                      buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold';
                    } else if (selectedOptionId === opt.id) {
                      buttonStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-300';
                    }
                  } else if (selectedOptionId === opt.id) {
                    buttonStyle = 'bg-sky-500/10 border-brand-primary text-brand-primary font-bold';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => !isSubmitted && setSelectedOptionId(opt.id)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${buttonStyle}`}
                    >
                      <span>{opt.text}</span>
                      {isSubmitted && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Submit / Retry Actions */}
            {!isSubmitted ? (
              <button
                onClick={() => selectedOptionId && setIsSubmitted(true)}
                disabled={!selectedOptionId}
                className="px-6 py-2.5 text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 rounded-xl transition-all shadow-sm"
              >
                Submit Answer
              </button>
            ) : (
              <div className="p-5 bg-brand-surface rounded-2xl border border-brand-border space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                      selectedOption?.isCorrect
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {selectedOption?.isCorrect ? 'Correct! 🎉' : 'Needs Review'}
                  </span>
                </div>

                <p className="text-xs text-brand-text leading-relaxed">
                  {selectedOption?.feedback}
                </p>

                <div className="pt-2 border-t border-brand-border/60">
                  <span className="text-[11px] font-bold text-brand-muted uppercase tracking-wider block mb-1">
                    Complete Reasoning:
                  </span>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {concept.apply.explanation}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSelectedOptionId(null);
                  }}
                  className="text-xs font-bold text-brand-primary hover:underline pt-1 block"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PREVIOUS AND NEXT LESSON NAVIGATION */}
      {/* ========================================================================= */}
      <div className="pt-6 border-t border-brand-border flex items-center justify-between gap-4">
        {prevConcept ? (
          <Link
            to={`/concept/${prevConcept.id}`}
            className="flex items-center gap-2 p-3 rounded-2xl border border-brand-border hover:bg-brand-card transition-colors group text-left max-w-[45%]"
          >
            <ChevronLeft className="w-5 h-5 text-brand-muted group-hover:text-brand-primary shrink-0" />
            <div>
              <span className="text-[10px] text-brand-muted block uppercase font-bold">Previous Lesson</span>
              <span className="text-xs sm:text-sm font-bold text-brand-text truncate block group-hover:text-brand-primary">
                {prevConcept.title}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextConcept && (
          <Link
            to={`/concept/${nextConcept.id}`}
            className="flex items-center gap-2 p-3 rounded-2xl border border-brand-border hover:bg-brand-card transition-colors group text-right max-w-[45%] ml-auto"
          >
            <div>
              <span className="text-[10px] text-brand-muted block uppercase font-bold">Next Lesson</span>
              <span className="text-xs sm:text-sm font-bold text-brand-text truncate block group-hover:text-brand-primary">
                {nextConcept.title}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-brand-muted group-hover:text-brand-primary shrink-0" />
          </Link>
        )}
      </div>

      {/* ========================================================================= */}
      {/* RELATED CONCEPTS SECTION */}
      {/* ========================================================================= */}
      {concept.relatedConceptIds.length > 0 && (
        <div className="pt-6 space-y-4">
          <h3 className="text-lg font-bold text-brand-text">Related Concepts in this Domain</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {concept.relatedConceptIds.map((relId) => {
              const rel = concepts.find((c) => c.id === relId);
              if (!rel) return null;
              return (
                <Link
                  key={rel.id}
                  to={`/concept/${rel.id}`}
                  className="p-4 bg-brand-card border border-brand-border rounded-xl hover:border-brand-primary/60 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-[10px] font-bold text-brand-primary block mb-1">
                      {rel.subjectName}
                    </span>
                    <h4 className="text-sm font-bold text-brand-text group-hover:text-brand-primary transition-colors">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-xs text-brand-muted flex items-center gap-1 mt-3">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
