-- ==============================================================================
-- Migration: 20261010000003_create_bookmarks.sql
-- Description: Stores bookmarked educational concepts per authenticated user
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  concept_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_user_bookmark UNIQUE (user_id, concept_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Bookmarks RLS Policies: strictly bound to auth.uid() = user_id
CREATE POLICY "Users can view own bookmarks"
  ON public.bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookmarks"
  ON public.bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bookmarks"
  ON public.bookmarks FOR DELETE
  USING (auth.uid() = user_id);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_concept ON public.bookmarks(concept_id);
