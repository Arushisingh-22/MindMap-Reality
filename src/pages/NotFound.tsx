import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, HelpCircle } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md bg-brand-card border border-brand-border rounded-3xl p-8 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-sky-100 dark:bg-sky-950 text-brand-primary mx-auto flex items-center justify-center font-black text-2xl font-mono">
          404
        </div>
        <h1 className="text-2xl font-black text-brand-text">Page Not Found</h1>
        <p className="text-xs text-brand-muted leading-relaxed">
          The educational route you are trying to visit does not exist or has been moved to another section.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand-primary hover:bg-brand-primary-hover rounded-xl shadow-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            to="/explore"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-brand-text bg-brand-surface hover:bg-brand-surface-hover border border-brand-border rounded-xl transition-colors"
          >
            <Compass className="w-4 h-4 text-brand-primary" />
            <span>Explore Concepts</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
