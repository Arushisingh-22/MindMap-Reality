import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  X,
  Clock,
  Bookmark,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { concepts } from '../data/concepts';
import { subjects } from '../data/subjects';
import { Category, Difficulty } from '../types';
import { useProgress } from '../contexts/ProgressContext';

const CATEGORIES: Category[] = [
  'Everyday Science',
  'Technology',
  'Engineering',
  'Health and Nutrition',
  'Environment',
  'Economics and Money',
  'Society and Human Behaviour',
  'Art and Design',
];

const DIFFICULTIES: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

export const Explore: React.FC = () => {
  const { isBookmarked, toggleBookmark, isConceptCompleted } = useProgress();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Filter logic
  const filteredConcepts = useMemo(() => {
    return concepts.filter((c) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          c.title.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q) ||
          c.subjectName.toLowerCase().includes(q) ||
          c.connect.realWorldSummary.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Subject
      if (selectedSubject !== 'all' && c.subjectId !== selectedSubject) {
        return false;
      }
      // Category
      if (selectedCategory !== 'all' && c.category !== selectedCategory) {
        return false;
      }
      // Difficulty
      if (selectedDifficulty !== 'all' && c.difficulty !== selectedDifficulty) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedSubject, selectedCategory, selectedDifficulty]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedSubject !== 'all' ||
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all';

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedSubject('all');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Interactive Curriculum Library</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-text tracking-tight">
          Explore Applied Concepts
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Search across 12 academic subjects to discover the fundamental laws governing our everyday physical, digital, and social reality.
        </p>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="bg-brand-card border border-brand-border rounded-2xl p-5 shadow-sm space-y-4">
        {/* Search Input Row */}
        <div className="relative">
          <Search className="w-5 h-5 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, formulas, real-world examples (e.g., Ohm's law, GPS, inflation)..."
            className="w-full pl-11 pr-10 py-3 text-sm bg-brand-surface border border-brand-border rounded-xl text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Subject Filter */}
          <div>
            <label htmlFor="subject-filter" className="text-xs font-semibold text-brand-muted block mb-1">
              Subject Discipline
            </label>
            <select
              id="subject-filter"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium bg-brand-surface border border-brand-border rounded-xl text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="all">All 12 Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.conceptCount})
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label htmlFor="category-filter" className="text-xs font-semibold text-brand-muted block mb-1">
              Real-World Domain
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium bg-brand-surface border border-brand-border rounded-xl text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="all">All Real-World Domains</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label htmlFor="difficulty-filter" className="text-xs font-semibold text-brand-muted block mb-1">
              Difficulty Level
            </label>
            <select
              id="difficulty-filter"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium bg-brand-surface border border-brand-border rounded-xl text-brand-text focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="all">All Difficulties</option>
              {DIFFICULTIES.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Pill Bar & Results Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-brand-border/60 text-xs">
          <span className="text-brand-muted font-medium">
            Showing <strong className="text-brand-text">{filteredConcepts.length}</strong> of {concepts.length} concepts
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Concepts Grid / Empty State */}
      {filteredConcepts.length === 0 ? (
        <div className="bg-brand-card border border-brand-border rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-surface text-brand-muted mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-brand-text">No matching concepts found</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            We couldn't find any concepts matching your current search criteria. Try removing some filters or searching for broader terms.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-xs font-bold text-white bg-brand-primary rounded-xl hover:bg-brand-primary-hover shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcepts.map((concept) => {
            const completed = isConceptCompleted(concept.id);
            const bookmarked = isBookmarked(concept.id);

            return (
              <div
                key={concept.id}
                className="bg-brand-card border border-brand-border rounded-2xl p-6 flex flex-col justify-between hover:border-brand-primary/50 hover:shadow-md transition-all duration-200 group"
              >
                <div>
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-sky-100 dark:bg-sky-950/80 text-brand-primary">
                        {concept.subjectName}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-brand-surface text-brand-muted">
                        {concept.difficulty}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleBookmark(concept.id)}
                      className="p-1.5 text-brand-muted hover:text-brand-primary rounded-lg transition-colors"
                      title={bookmarked ? 'Remove bookmark' : 'Bookmark concept'}
                      aria-label="Toggle bookmark"
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-sky-500 text-sky-500' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Description */}
                  <Link to={`/concept/${concept.id}`} className="block group">
                    <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-primary transition-colors leading-snug mb-2">
                      {concept.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed mb-4">
                    {concept.shortDescription}
                  </p>

                  {/* Real World Connection Tag */}
                  <div className="p-2.5 bg-brand-surface/60 rounded-xl border border-brand-border/60 mb-4">
                    <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block mb-0.5">
                      Real-World Link:
                    </span>
                    <p className="text-xs text-brand-text font-medium line-clamp-2">
                      {concept.connect.examples[0]?.title || concept.connect.realWorldSummary}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-brand-muted">
                    <Clock className="w-3.5 h-3.5 text-brand-primary" />
                    <span>{concept.readingTime}</span>
                    {completed && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/concept/${concept.id}`}
                    className="font-bold text-brand-primary group-hover:translate-x-0.5 transition-transform flex items-center gap-1"
                  >
                    <span>Read Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
