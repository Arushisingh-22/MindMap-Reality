import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Layers,
  Search,
  BookOpen,
  ArrowRight,
  Clock,
  CheckCircle,
  Bookmark,
  ChevronLeft,
  X,
  Zap,
  FlaskConical,
  Dna,
  Sigma,
  Code,
  Globe2,
  Landmark,
  Scale,
  TrendingUp,
  Wrench,
  Brain,
  Palette,
} from 'lucide-react';
import { subjects } from '../data/subjects';
import { concepts } from '../data/concepts';
import { useProgress } from '../contexts/ProgressContext';
import { Subject } from '../types';

// Map icon names to Lucide icon components
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Zap,
  FlaskConical,
  Dna,
  Sigma,
  Code,
  Globe2,
  Landmark,
  Scale,
  TrendingUp,
  Wrench,
  Brain,
  Palette,
};

export const Subjects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSubjectParam = searchParams.get('selected');
  const [subjectQuery, setSubjectQuery] = useState('');
  const { isConceptCompleted, isBookmarked, toggleBookmark } = useProgress();

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectParam) || null;

  // Filtered subjects list
  const filteredSubjects = subjects.filter((s) => {
    if (!subjectQuery.trim()) return true;
    const q = subjectQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.topics.some((t) => t.toLowerCase().includes(q))
    );
  });

  const selectSubject = (subjectId: string) => {
    setSearchParams({ selected: subjectId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSelectedSubject = () => {
    setSearchParams({});
  };

  // Concepts for the currently selected subject
  const subjectConcepts = selectedSubject
    ? concepts.filter((c) => c.subjectId === selectedSubject.id)
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Curriculum Subject Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-text tracking-tight">
          12 Fundamental Academic Disciplines
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          From physics and quantum mechanics to history, economics, and psychology. Select any discipline to inspect its structured concept lessons.
        </p>
      </div>

      {/* If a specific subject is selected, show Dedicated Subject View */}
      {selectedSubject ? (
        <div className="space-y-6 animate-in fade-in">
          {/* Back Button & Subject Banner */}
          <div className="bg-brand-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
              <button
                onClick={clearSelectedSubject}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-muted hover:text-brand-text bg-brand-surface px-3 py-1.5 rounded-xl border border-brand-border self-start"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to All 12 Subjects</span>
              </button>

              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-brand-primary self-start sm:self-auto">
                {subjectConcepts.length} Active Lessons Available
              </span>
            </div>

            <div className="mt-6 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md"
                style={{ backgroundColor: selectedSubject.color || '#38A9F5' }}
              >
                {(() => {
                  const Icon = iconMap[selectedSubject.iconName] || Layers;
                  return <Icon className="w-8 h-8" />;
                })()}
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-brand-text">
                  {selectedSubject.name}
                </h2>
                <p className="text-sm text-brand-muted max-w-2xl leading-relaxed">
                  {selectedSubject.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedSubject.topics.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-lg bg-brand-surface border border-brand-border/60 text-xs font-semibold text-brand-text"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Concepts Grid for this specific subject */}
          <div>
            <h3 className="text-lg font-bold text-brand-text mb-4">
              Available Lessons in {selectedSubject.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjectConcepts.map((concept) => {
                const completed = isConceptCompleted(concept.id);
                const bookmarked = isBookmarked(concept.id);

                return (
                  <div
                    key={concept.id}
                    className="bg-brand-card border border-brand-border rounded-2xl p-6 flex flex-col justify-between hover:border-brand-primary/50 hover:shadow-md transition-all duration-200 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-brand-surface text-brand-muted">
                          {concept.difficulty}
                        </span>
                        <button
                          onClick={() => toggleBookmark(concept.id)}
                          className="p-1.5 text-brand-muted hover:text-brand-primary rounded-lg transition-colors"
                          aria-label="Toggle bookmark"
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-sky-500 text-sky-500' : ''}`} />
                        </button>
                      </div>

                      <Link to={`/concept/${concept.id}`} className="block group">
                        <h4 className="text-base font-bold text-brand-text group-hover:text-brand-primary transition-colors leading-snug mb-2">
                          {concept.title}
                        </h4>
                      </Link>

                      <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed mb-4">
                        {concept.shortDescription}
                      </p>

                      <div className="p-2.5 bg-brand-surface/60 rounded-xl border border-brand-border/60 mb-4">
                        <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-0.5">
                          Practical Context:
                        </span>
                        <p className="text-xs text-brand-text font-medium line-clamp-2">
                          {concept.connect.examples[0]?.title || concept.connect.realWorldSummary}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-brand-muted">
                        <Clock className="w-3.5 h-3.5 text-brand-primary" />
                        <span>{concept.readingTime}</span>
                        {completed && (
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Done</span>
                          </span>
                        )}
                      </div>
                      <Link
                        to={`/concept/${concept.id}`}
                        className="font-bold text-brand-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
                      >
                        <span>Start Lesson</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Overview Grid of all 12 Subjects */
        <div className="space-y-6">
          {/* Search box for subjects */}
          <div className="bg-brand-card border border-brand-border rounded-2xl p-4 shadow-sm max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={subjectQuery}
                onChange={(e) => setSubjectQuery(e.target.value)}
                placeholder="Search subject disciplines or topics (e.g., Physics, Cryptography)..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-brand-surface border border-brand-border rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              {subjectQuery && (
                <button
                  onClick={() => setSubjectQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text"
                  aria-label="Clear subject search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => {
              const Icon = iconMap[subject.iconName] || Layers;
              return (
                <div
                  key={subject.id}
                  onClick={() => selectSubject(subject.id)}
                  className="bg-brand-card border border-brand-border hover:border-brand-primary/60 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-sm"
                        style={{ backgroundColor: subject.color || '#38A9F5' }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-brand-surface text-brand-muted">
                        {subject.conceptCount} Lessons
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-brand-text group-hover:text-brand-primary transition-colors mb-2">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed line-clamp-3 mb-4">
                      {subject.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {subject.topics.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-brand-surface text-[11px] font-medium text-brand-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-bold text-brand-primary">
                    <span>View Curriculum</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
