import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { QuizAttempt, UserProgress, Concept } from '../types';
import { useAuth } from './AuthContext';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { concepts } from '../data/concepts';

interface ProgressContextType {
  completedConceptIds: string[];
  bookmarkedConceptIds: string[];
  quizAttempts: QuizAttempt[];
  isLoading: boolean;
  isSyncing: boolean;
  syncError: string | null;
  toggleBookmark: (conceptId: string) => Promise<void>;
  toggleConceptCompleted: (conceptId: string) => Promise<void>;
  saveQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => Promise<void>;
  resetProgress: () => Promise<void>;
  importLocalProgressToAccount: () => Promise<{ success: boolean; count: number; error?: string }>;
  isConceptCompleted: (conceptId: string) => boolean;
  isBookmarked: (conceptId: string) => boolean;
  getCompletionPercentage: () => number;
  getSubjectProgress: (subjectId: string) => { completed: number; total: number; percentage: number };
  getOverallQuizAccuracy: () => number;
  getRecommendedConcepts: () => Concept[];
  hasLocalProgressToImport: boolean;
}

const LOCAL_STORAGE_KEY = 'mindmap_reality_guest_progress';

const getInitialGuestProgress = (): UserProgress => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        completedConceptIds: Array.isArray(parsed.completedConceptIds) ? parsed.completedConceptIds : [],
        bookmarkedConceptIds: Array.isArray(parsed.bookmarkedConceptIds) ? parsed.bookmarkedConceptIds : [],
        quizAttempts: Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : [],
        lastActiveAt: parsed.lastActiveAt || new Date().toISOString(),
      };
    }
  } catch (e) {
    console.warn('Error reading local progress from LocalStorage:', e);
  }

  return {
    completedConceptIds: [],
    bookmarkedConceptIds: [],
    quizAttempts: [],
    lastActiveAt: new Date().toISOString(),
  };
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [completedConceptIds, setCompletedConceptIds] = useState<string[]>([]);
  const [bookmarkedConceptIds, setBookmarkedConceptIds] = useState<string[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [hasLocalProgressToImport, setHasLocalProgressToImport] = useState(false);

  // Check if guest progress exists in localStorage
  const checkLocalProgressAvailable = useCallback(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const hasData =
          (parsed.completedConceptIds?.length > 0) ||
          (parsed.bookmarkedConceptIds?.length > 0) ||
          (parsed.quizAttempts?.length > 0);
        setHasLocalProgressToImport(hasData);
      } else {
        setHasLocalProgressToImport(false);
      }
    } catch {
      setHasLocalProgressToImport(false);
    }
  }, []);

  // Save guest progress to localStorage
  const saveGuestProgress = (
    completed: string[],
    bookmarked: string[],
    attempts: QuizAttempt[]
  ) => {
    try {
      const payload: UserProgress = {
        completedConceptIds: completed,
        bookmarkedConceptIds: bookmarked,
        quizAttempts: attempts,
        lastActiveAt: new Date().toISOString(),
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
      checkLocalProgressAvailable();
    } catch (e) {
      console.warn('Failed to save progress in LocalStorage:', e);
    }
  };

  // Load progress when user changes (guest vs logged in)
  useEffect(() => {
    let isMounted = true;
    checkLocalProgressAvailable();

    const loadData = async () => {
      setIsLoading(true);
      setSyncError(null);

      if (!user) {
        // Guest mode: load from LocalStorage
        const guestData = getInitialGuestProgress();
        if (isMounted) {
          setCompletedConceptIds(guestData.completedConceptIds);
          setBookmarkedConceptIds(guestData.bookmarkedConceptIds);
          setQuizAttempts(guestData.quizAttempts);
          setIsLoading(false);
        }
        return;
      }

      // Authenticated mode: fetch from Supabase
      if (isSupabaseConfigured() && supabase) {
        try {
          setIsSyncing(true);
          const [progressRes, bookmarksRes, quizRes] = await Promise.all([
            supabase.from('user_progress').select('concept_id').eq('user_id', user.id),
            supabase.from('bookmarks').select('concept_id').eq('user_id', user.id),
            supabase
              .from('quiz_attempts')
              .select('*')
              .eq('user_id', user.id)
              .order('completed_at', { ascending: false }),
          ]);

          if (isMounted) {
            if (progressRes.error) {
              console.warn('Progress fetch warning:', progressRes.error.message);
              setSyncError('Could not sync completed concepts: ' + progressRes.error.message);
            } else if (progressRes.data) {
              setCompletedConceptIds(progressRes.data.map((r: any) => r.concept_id));
            }

            if (bookmarksRes.error) {
              console.warn('Bookmarks fetch warning:', bookmarksRes.error.message);
            } else if (bookmarksRes.data) {
              setBookmarkedConceptIds(bookmarksRes.data.map((r: any) => r.concept_id));
            }

            if (quizRes.error) {
              console.warn('Quiz attempts fetch warning:', quizRes.error.message);
            } else if (quizRes.data) {
              setQuizAttempts(
                quizRes.data.map((r: any) => ({
                  id: r.id,
                  userId: r.user_id,
                  subjectId: r.subject_id,
                  topic: r.topic,
                  score: r.score,
                  totalQuestions: r.total_questions,
                  incorrectQuestionIds: Array.isArray(r.incorrect_question_ids)
                    ? r.incorrect_question_ids
                    : [],
                  completedAt: r.completed_at,
                }))
              );
            }
          }
        } catch (err: any) {
          console.error('Error fetching authenticated progress from Supabase:', err);
          if (isMounted) {
            setSyncError(err.message || 'Network error fetching account data.');
          }
        } finally {
          if (isMounted) setIsSyncing(false);
        }
      }

      if (isMounted) {
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [user, checkLocalProgressAvailable]);

  // Toggle bookmark
  const toggleBookmark = async (conceptId: string) => {
    const isCurrentlyBookmarked = bookmarkedConceptIds.includes(conceptId);
    const updated = isCurrentlyBookmarked
      ? bookmarkedConceptIds.filter((id) => id !== conceptId)
      : [...bookmarkedConceptIds, conceptId];

    setBookmarkedConceptIds(updated);

    if (!user) {
      saveGuestProgress(completedConceptIds, updated, quizAttempts);
      return;
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        setIsSyncing(true);
        if (isCurrentlyBookmarked) {
          const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('user_id', user.id)
            .eq('concept_id', conceptId);
          if (error) setSyncError('Bookmark delete error: ' + error.message);
        } else {
          const { error } = await supabase
            .from('bookmarks')
            .insert({ user_id: user.id, concept_id: conceptId });
          if (error) setSyncError('Bookmark save error: ' + error.message);
        }
      } catch (err: any) {
        console.error('Error syncing bookmark to Supabase:', err);
        setSyncError(err.message);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  // Toggle concept completed
  const toggleConceptCompleted = async (conceptId: string) => {
    const isCurrentlyCompleted = completedConceptIds.includes(conceptId);
    const updated = isCurrentlyCompleted
      ? completedConceptIds.filter((id) => id !== conceptId)
      : [...completedConceptIds, conceptId];

    setCompletedConceptIds(updated);

    if (!user) {
      saveGuestProgress(updated, bookmarkedConceptIds, quizAttempts);
      return;
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        setIsSyncing(true);
        if (isCurrentlyCompleted) {
          const { error } = await supabase
            .from('user_progress')
            .delete()
            .eq('user_id', user.id)
            .eq('concept_id', conceptId);
          if (error) setSyncError('Progress delete error: ' + error.message);
        } else {
          const { error } = await supabase
            .from('user_progress')
            .insert({ user_id: user.id, concept_id: conceptId, completed: true });
          if (error) setSyncError('Progress save error: ' + error.message);
        }
      } catch (err: any) {
        console.error('Error syncing concept progress to Supabase:', err);
        setSyncError(err.message);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  // Save quiz attempt
  const saveQuizAttempt = async (attempt: Omit<QuizAttempt, 'id' | 'completedAt'>) => {
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: 'quiz-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      completedAt: new Date().toISOString(),
      userId: user?.id,
    };

    const updatedAttempts = [newAttempt, ...quizAttempts];
    setQuizAttempts(updatedAttempts);

    if (!user) {
      saveGuestProgress(completedConceptIds, bookmarkedConceptIds, updatedAttempts);
      return;
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        setIsSyncing(true);
        const { error } = await supabase.from('quiz_attempts').insert({
          user_id: user.id,
          subject_id: attempt.subjectId,
          topic: attempt.topic,
          score: attempt.score,
          total_questions: attempt.totalQuestions,
          incorrect_question_ids: attempt.incorrectQuestionIds,
        });
        if (error) setSyncError('Quiz attempt save error: ' + error.message);
      } catch (err: any) {
        console.error('Error saving quiz attempt to Supabase:', err);
        setSyncError(err.message);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  // Import anonymous local progress into the signed-in account
  const importLocalProgressToAccount = async (): Promise<{
    success: boolean;
    count: number;
    error?: string;
  }> => {
    if (!user) {
      return { success: false, count: 0, error: 'User must be signed in to import progress.' };
    }

    const localData = getInitialGuestProgress();
    let importedItemsCount = 0;

    // Merge completed concepts without duplicates
    const newCompleted = Array.from(new Set([...completedConceptIds, ...localData.completedConceptIds]));
    // Merge bookmarks without duplicates
    const newBookmarks = Array.from(new Set([...bookmarkedConceptIds, ...localData.bookmarkedConceptIds]));
    // Merge attempts
    const newAttempts = [...localData.quizAttempts, ...quizAttempts];

    setCompletedConceptIds(newCompleted);
    setBookmarkedConceptIds(newBookmarks);
    setQuizAttempts(newAttempts);

    if (isSupabaseConfigured() && supabase) {
      try {
        setIsSyncing(true);

        // Sync completed
        for (const cid of localData.completedConceptIds) {
          if (!completedConceptIds.includes(cid)) {
            const { error } = await supabase.from('user_progress').upsert(
              { user_id: user.id, concept_id: cid, completed: true },
              { onConflict: 'user_id,concept_id' }
            );
            if (!error) importedItemsCount++;
          }
        }

        // Sync bookmarks
        for (const cid of localData.bookmarkedConceptIds) {
          if (!bookmarkedConceptIds.includes(cid)) {
            const { error } = await supabase.from('bookmarks').upsert(
              { user_id: user.id, concept_id: cid },
              { onConflict: 'user_id,concept_id' }
            );
            if (!error) importedItemsCount++;
          }
        }

        // Sync quiz attempts
        for (const qa of localData.quizAttempts) {
          const { error } = await supabase.from('quiz_attempts').insert({
            user_id: user.id,
            subject_id: qa.subjectId,
            topic: qa.topic,
            score: qa.score,
            total_questions: qa.totalQuestions,
            incorrect_question_ids: qa.incorrectQuestionIds,
          });
          if (!error) importedItemsCount++;
        }
      } catch (err: any) {
        setSyncError(err.message);
        return { success: false, count: importedItemsCount, error: err.message };
      } finally {
        setIsSyncing(false);
      }
    }

    // Clean up local storage after import
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setHasLocalProgressToImport(false);
    } catch {}

    return { success: true, count: importedItemsCount };
  };

  // Reset progress
  const resetProgress = async () => {
    setCompletedConceptIds([]);
    setBookmarkedConceptIds([]);
    setQuizAttempts([]);

    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setHasLocalProgressToImport(false);
    } catch {}

    if (user && isSupabaseConfigured() && supabase) {
      try {
        setIsSyncing(true);
        await Promise.all([
          supabase.from('user_progress').delete().eq('user_id', user.id),
          supabase.from('bookmarks').delete().eq('user_id', user.id),
          supabase.from('quiz_attempts').delete().eq('user_id', user.id),
        ]);
      } catch (err: any) {
        console.error('Error clearing Supabase progress:', err);
        setSyncError(err.message);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const isConceptCompleted = (conceptId: string) => completedConceptIds.includes(conceptId);
  const isBookmarked = (conceptId: string) => bookmarkedConceptIds.includes(conceptId);

  const getCompletionPercentage = () => {
    if (concepts.length === 0) return 0;
    return Math.round((completedConceptIds.length / concepts.length) * 100);
  };

  const getSubjectProgress = (subjectId: string) => {
    const subjectConcepts = concepts.filter((c) => c.subjectId === subjectId);
    const total = subjectConcepts.length;
    if (total === 0) return { completed: 0, total: 0, percentage: 0 };
    const completed = subjectConcepts.filter((c) => completedConceptIds.includes(c.id)).length;
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    };
  };

  const getOverallQuizAccuracy = () => {
    if (quizAttempts.length === 0) return 0;
    const totalScore = quizAttempts.reduce((acc, curr) => acc + curr.score, 0);
    const totalPossible = quizAttempts.reduce((acc, curr) => acc + curr.totalQuestions, 0);
    if (totalPossible === 0) return 0;
    return Math.round((totalScore / totalPossible) * 100);
  };

  const getRecommendedConcepts = (): Concept[] => {
    const incorrectSubjectSet = new Set<string>();
    quizAttempts.forEach((attempt) => {
      if (attempt.score < attempt.totalQuestions) {
        incorrectSubjectSet.add(attempt.subjectId);
      }
    });

    if (incorrectSubjectSet.size > 0) {
      const candidates = concepts.filter(
        (c) => incorrectSubjectSet.has(c.subjectId) && !completedConceptIds.includes(c.id)
      );
      if (candidates.length > 0) return candidates.slice(0, 3);
    }

    return concepts.filter((c) => !completedConceptIds.includes(c.id)).slice(0, 3);
  };

  return (
    <ProgressContext.Provider
      value={{
        completedConceptIds,
        bookmarkedConceptIds,
        quizAttempts,
        isLoading,
        isSyncing,
        syncError,
        toggleBookmark,
        toggleConceptCompleted,
        saveQuizAttempt,
        resetProgress,
        importLocalProgressToAccount,
        isConceptCompleted,
        isBookmarked,
        getCompletionPercentage,
        getSubjectProgress,
        getOverallQuizAccuracy,
        getRecommendedConcepts,
        hasLocalProgressToImport,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
