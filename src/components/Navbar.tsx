import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Sun,
  Moon,
  Search,
  Menu,
  X,
  User,
  LogOut,
  Sparkles,
  BookOpen,
  FlaskConical,
  HelpCircle,
  TrendingUp,
  Compass,
  Layers,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSignOut = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: Sparkles },
    { to: '/explore', label: 'Explore', icon: Compass },
    { to: '/subjects', label: 'Subjects', icon: Layers },
    { to: '/lab', label: 'Interactive Lab', icon: FlaskConical },
    { to: '/quiz', label: 'Quiz', icon: HelpCircle },
    { to: '/progress', label: 'My Progress', icon: TrendingUp },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-brand-card/95 backdrop-blur-md border-b border-brand-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg py-1"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-white shadow-sm shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-brand-text leading-tight group-hover:text-brand-primary transition-colors">
                  MindMap<span className="text-brand-primary"> Reality</span>
                </span>
                <span className="text-[10px] text-brand-muted tracking-wide font-medium hidden sm:block -mt-0.5">
                  Concepts to the Real World
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-sky-500/10 text-brand-primary dark:bg-sky-400/10'
                          : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface'
                      }`
                    }
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Search Modal Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-brand-border bg-brand-surface text-brand-muted hover:text-brand-text hover:border-brand-primary/50 transition-all text-xs font-medium"
                aria-label="Open search dialog"
                title="Search concepts (Ctrl + K)"
              >
                <Search className="w-4 h-4 text-brand-primary" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-brand-card rounded border border-brand-border text-brand-muted">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl border border-brand-border bg-brand-surface hover:bg-brand-surface-hover text-brand-text hover:text-brand-primary transition-colors"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4 text-sky-600" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
              </button>

              {/* Authentication Controls */}
              {user ? (
                /* Authenticated User Menu */
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-brand-border bg-brand-surface hover:bg-brand-surface-hover transition-colors"
                    aria-expanded={userDropdownOpen}
                    aria-label="User account menu"
                  >
                    <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-brand-primary flex items-center justify-center font-bold text-xs uppercase">
                      {user.displayName.charAt(0) || user.email.charAt(0) || 'U'}
                    </div>
                    <span className="hidden sm:inline text-xs font-semibold text-brand-text max-w-[100px] truncate">
                      {user.displayName}
                    </span>
                  </button>

                  {userDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-64 bg-brand-card border border-brand-border rounded-2xl shadow-xl py-2 z-50 animate-in fade-in"
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div className="px-4 py-2.5 border-b border-brand-border">
                        <span className="text-xs font-medium text-brand-muted block">Signed in as</span>
                        <p className="text-sm font-bold text-brand-text truncate">{user.displayName}</p>
                        <p className="text-xs text-brand-muted truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/progress"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-brand-text hover:bg-brand-surface hover:text-brand-primary transition-colors"
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span>My Learning Dashboard</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-brand-border">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Unauthenticated Controls */
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3 py-1.5 text-xs font-semibold text-brand-text hover:text-brand-primary hover:bg-brand-surface rounded-xl transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-brand-primary hover:bg-brand-primary-hover rounded-xl shadow-sm shadow-sky-500/20 active:scale-95 transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-brand-muted hover:text-brand-text hover:bg-brand-surface transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-brand-border bg-brand-card px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-sky-500/10 text-brand-primary dark:bg-sky-400/10'
                          : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface'
                      }`
                    }
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile Auth Controls */}
            <div className="pt-3 border-t border-brand-border space-y-2">
              {user ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 bg-brand-surface rounded-xl">
                    <span className="text-xs text-brand-muted block">Signed in as:</span>
                    <span className="text-sm font-bold text-brand-text">{user.displayName}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-rose-600 rounded-xl bg-rose-50 dark:bg-rose-950/40"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-2 text-sm font-semibold text-brand-text bg-brand-surface rounded-xl hover:bg-brand-surface-hover"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-2 text-sm font-bold text-white bg-brand-primary rounded-xl hover:bg-brand-primary-hover shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
