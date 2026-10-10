# MindMap Reality: Supabase Setup & Configuration Guide

This step-by-step guide explains how to connect your **MindMap Reality** educational website to a live Supabase project for real-time authentication, account session persistence, and cross-device learning progress synchronization.

---

## 📋 Overview of What Is Handled

- **Client Integration**: `@supabase/supabase-js` is fully installed and initialized in [`src/services/supabase.ts`](file:///c:/Users/Arushi/Desktop/MindMap%20Reality/src/services/supabase.ts).
- **Authentication Flows**: Email/password signup, login, session persistence, logout, and password resets are wired up in [`src/contexts/AuthContext.tsx`](file:///c:/Users/Arushi/Desktop/MindMap%20Reality/src/contexts/AuthContext.tsx), [`src/pages/Login.tsx`](file:///c:/Users/Arushi/Desktop/MindMap%20Reality/src/pages/Login.tsx), [`src/pages/SignUp.tsx`](file:///c:/Users/Arushi/Desktop/MindMap%20Reality/src/pages/SignUp.tsx), [`src/pages/ForgotPassword.tsx`](file:///c:/Users/Arushi/Desktop/MindMap%20Reality/src/pages/ForgotPassword.tsx), and [`src/pages/ResetPassword.tsx`](file:///c:/Users/Arushi/Desktop/MindMap%20Reality/src/pages/ResetPassword.tsx).
- **Data Synchronization**: Completed concepts, bookmarks, and quiz attempts sync automatically to Supabase PostgreSQL in [`src/contexts/ProgressContext.tsx`](file:///c:/Users/Arushi/Desktop/MindMap%20Reality/src/contexts/ProgressContext.tsx).
- **Guest Fallback & Migration**: Unauthenticated learners retain progress in `localStorage`. Once an account is created, an **Import Guest Progress** button merges local work into their cloud account without duplicates.
- **Security**: PostgreSQL Row Level Security (RLS) ensures users can access only their own records.

---

## 🛠️ Step 1: Create a Free Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and log in or create a free account.
2. Click **New Project**.
3. Enter a project name (e.g. `mindmap-reality`).
4. Set a strong database password and choose the region closest to you.
5. Click **Create new project** and wait ~1–2 minutes for the database to provision.

---

## 🔑 Step 2: Retrieve API Keys & Configure Environment

1. In your Supabase Project Dashboard, click the **Settings** (gear icon) in the left sidebar.
2. Navigate to **API** (under Project Settings).
3. Under **Project URL**, copy the `URL` (e.g., `https://abcdefghijkl.supabase.co`).
4. Under **Project API Keys**, copy the `anon` / `public` key (starts with `eyJ...`).
   > ⚠️ **IMPORTANT**: Use ONLY the `anon` / `public` key. **Never** use or expose the `service_role` secret key in client code.
5. In your project root folder (`MindMap Reality`), create a `.env` file (copied from `.env.example`):
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
6. Save the file. Vite automatically picks up changes on restart.

---

## 🗄️ Step 3: Run the Database Migrations

You can set up all required database tables, indexes, and Row Level Security policies in one click:

1. In your Supabase Dashboard, click **SQL Editor** in the left sidebar.
2. Click **New Query**.
3. Open [`supabase/schema.sql`](file:///c:/Users/Arushi/Desktop/MindMap%20Reality/supabase/schema.sql) in this repository, copy the entire SQL script, and paste it into the Supabase SQL editor.
4. Click **Run** (or press `Ctrl + Enter`).
5. You will see `Success. No rows returned`.

### What This Creates:
- **`public.profiles`**: Stores user display names linked to `auth.users(id)`.
- **`public.user_progress`**: Stores completed lessons per user (`user_id`, `concept_id`).
- **`public.bookmarks`**: Stores saved lessons per user (`user_id`, `concept_id`).
- **`public.quiz_attempts`**: Stores assessment results per user (`score`, `total_questions`, `incorrect_question_ids`).
- **Row Level Security (RLS)**: Enforces `auth.uid() = user_id` on all tables, preventing any cross-user data leakage.
- **Automatic User Trigger**: `handle_new_user()` automatically creates a profile row whenever a new user registers.

*Note: Individual numbered migration files are also available under [`supabase/migrations/`](file:///c:/Users/Arushi/Desktop/MindMap%20Reality/supabase/migrations/) if you use the Supabase CLI.*

---

## ✉️ Step 4: Configure Authentication Settings in Supabase

1. In your Supabase Dashboard, go to **Authentication** -> **URL Configuration**.
2. Set **Site URL** to:
   ```
   http://localhost:3000
   ```
   *(When deploying to production, update this to your live domain, e.g. `https://mindmapreality.com`).*
3. Under **Redirect URLs**, add:
   ```
   http://localhost:3000/**
   http://localhost:3000/reset-password
   ```
4. Click **Save**.
5. *(Optional for local development)*: Under **Authentication** -> **Providers** -> **Email**:
   - If you want immediate sign-in without waiting for email verification during testing, toggle **Confirm email** to `OFF`.
   - If you keep **Confirm email** `ON`, users must click the verification link sent to their inbox before their first login.

---

## 🚀 Step 5: Test the Integration

1. Start your local development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:3000` in your browser.
3. Click **Sign Up** in the navbar:
   - Create a test account (e.g. `student@test.com`).
4. Complete an educational concept (e.g. *Ohm's Law*) and bookmark another concept.
5. Open **My Progress** (`/progress`):
   - Notice the status badge reads: **"Account Cloud Sync Active"** with your email.
   - Go to your Supabase Dashboard -> **Table Editor** -> `user_progress` and `bookmarks` to observe your rows stored securely in PostgreSQL!
6. Test anonymous migration:
   - Log out, mark a concept as completed as a guest learner, then log back in.
   - The dashboard will show the **Import Guest Progress** button, allowing you to merge your offline records into your cloud account.

---

## 🔍 Verification & Troubleshooting

- **"Supabase is not configured" Banner**: This banner only appears when `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` is missing or contains placeholder values. Once valid credentials are placed in `.env`, the banner disappears automatically.
- **CORS / Redirect Errors**: Ensure `http://localhost:3000/**` is added in Supabase Dashboard -> Authentication -> URL Configuration -> Redirect URLs.
- **Row Level Security (RLS) Permission Denied**: Ensure you ran [`supabase/schema.sql`](file:///c:/Users/Arushi/Desktop/MindMap%20Reality/supabase/schema.sql) which configures the `auth.uid() = user_id` policies for `SELECT`, `INSERT`, `UPDATE`, and `DELETE`.
