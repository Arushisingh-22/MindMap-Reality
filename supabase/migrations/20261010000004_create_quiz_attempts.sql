-- ==============================================================================
-- Migration: 20261010000004_create_quiz_attempts.sql
-- Description: Stores quiz assessment attempt history per authenticated user
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject_id TEXT NOT NULL,
  topic TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0),
  total_questions INTEGER NOT NULL CHECK (total_questions > 0),
  incorrect_question_ids JSONB DEFAULT '[]'::jsonb NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Quiz Attempts RLS Policies: strictly bound to auth.uid() = user_id
CREATE POLICY "Users can view own quiz attempts"
  ON public.quiz_attempts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz attempts"
  ON public.quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own quiz attempts"
  ON public.quiz_attempts FOR DELETE
  USING (auth.uid() = user_id);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON public.quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_completed_at ON public.quiz_attempts(user_id, completed_at DESC);
