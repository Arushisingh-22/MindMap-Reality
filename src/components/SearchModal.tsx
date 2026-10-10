import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { concepts } from '../data/concepts';
import { subjects } from '../data/subjects';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.trim().toLowerCase();

  const matchingConcepts = normalized
    ? concepts.filter(
        (c) =>
          c.title.toLowerCase().includes(normalized) ||
          c.shortDescription.toLowerCase().includes(normalized) ||
          c.subjectName.toLowerCase().includes(normalized) ||
          c.category.toLowerCase().includes(normalized)
      ).slice(0, 6)
    : [];

  const matchingSubjects = normalized
    ? subjects.filter(
        (s) =>
          s.name.toLowerCase().includes(normalized) ||
          s.description.toLowerCase().includes(normalized) ||
          s.topics.some((t) => t.toLowerCase().includes(normalized))
      ).slice(0, 3)
    : [];

  const handleSelect = (url: string) => {
    onClose();
    navigate(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-brand-text/40 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-brand-card border border-brand-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-brand-border gap-3">
          <Search className="w-5 h-5 text-sky-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all concepts, subjects, or real-world applications... (e.g. Ohm's Law, GPS, DNA)"
            className="w-full bg-transparent text-base text-brand-text placeholder-brand-muted focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-brand-surface text-brand-muted hover:text-brand-text"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-4">
          {!normalized ? (
            <div className="py-6 text-center text-brand-muted">
              <p className="text-sm">Type keywords above to find concepts across all 12 subjects.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Ohm’s Law', 'Probability', 'Acids & Bases', 'Levers', 'Cryptocurrency', 'Tectonics'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs bg-brand-surface text-brand-text rounded-lg border border-brand-border hover:bg-brand-surface-hover"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : matchingConcepts.length === 0 && matchingSubjects.length === 0 ? (
            <div className="py-8 text-center text-brand-muted">
              <p className="text-sm font-medium text-brand-text">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for broader keywords like Physics, Electricity, Biology, or Market.</p>
            </div>
          ) : (
            <>
              {matchingSubjects.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-brand-muted uppercase tracking-wider block mb-2 px-1">
                    Matching Subjects
                  </span>
                  <div className="space-y-1.5">
                    {matchingSubjects.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleSelect(`/subjects?selected=${s.id}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-brand-surface flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
                            <Layers className="w-4 h-4" />
                          </span>
                          <div>
                            <span className="text-sm font-semibold text-brand-text group-hover:text-brand-primary">
                              {s.name}
                            </span>
                            <span className="text-xs text-brand-muted block">{s.conceptCount} concepts available</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchingConcepts.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-brand-muted uppercase tracking-wider block mb-2 px-1">
                    Educational Concepts ({matchingConcepts.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchingConcepts.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleSelect(`/concept/${c.id}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-brand-surface flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="p-1.5 rounded-lg bg-brand-surface text-brand-primary mt-0.5">
                            <BookOpen className="w-4 h-4" />
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-brand-text group-hover:text-brand-primary">
                                {c.title}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-surface text-brand-muted font-medium">
                                {c.subjectName}
                              </span>
                            </div>
                            <p className="text-xs text-brand-muted line-clamp-1 mt-0.5">
                              {c.shortDescription}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-brand-surface/40 border-t border-brand-border text-[11px] text-brand-muted flex justify-between items-center">
          <span>Press ESC to close</span>
          <span>Tip: Click any result to jump directly to the lesson</span>
        </div>
      </div>
    </div>
  );
};
