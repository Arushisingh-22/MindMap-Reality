# MindMap Reality 🌐⚡

> **"Every Chapter Has a Real-World Story."**
> Understand what you learn, discover where it matters, and apply your knowledge beyond the classroom.

MindMap Reality is a responsive full-stack educational web application designed to connect classroom theory with real-world applications across 12 disciplines.

---

## 🚀 Key Features

### 1. Seven Main Learning Pages
- **Home (`/`)**: Hero story, live Ohm's law interactive preview, featured concept, 4 featured subjects, How It Works (*Learn → Connect → Apply → Test Yourself*), daily challenge with interactive feedback, and continue learning section.
- **Explore Concepts (`/explore`)**: Searchable and filterable concept catalog by Subject (12 subjects), Real-World Domain (8 categories), and Difficulty (Beginner, Intermediate, Advanced) with instant clear filters and zero-state recovery.
- **Subjects (`/subjects`)**: Directory of all 12 disciplines with metadata, topic highlights, concept counts, and dedicated subject drill-down views.
- **Concept Detail (`/concept/:conceptId`)**: Signature 3-tab learning experience:
  - **1. Textbook Principle**: Definitions, textbook-style explanation, key terms, formula, worked step-by-step example, and key takeaways.
  - **2. Real-World Connection**: Everyday context, at least two practical case studies with domain badges, and embedded interactive simulation.
  - **3. Apply It Challenge**: Real-world problem statement, interactive scenario answer selection, and step-by-step reasoning.
  - *Plus*: Bookmarking, mark completed toggle, prev/next navigation, simulation launchers, and quiz shortcuts.
- **Interactive Lab (`/lab`)**: Four working educational simulators:
  - **Ohm's Law**: Voltage (1-12V), Resistance (1-12Ω), calculated current, power dissipation, glowing filament bulb, and animated electron flow.
  - **Mechanical Lever**: Effort arm, load arm, effort force, ideal mechanical advantage (IMA), and load force calculations with dynamic labeled SVG schematic.
  - **Probability & Law of Large Numbers**: Roll 1x, 10x, 100x, 1,000x fair dice, empirical frequency tracking, and real-time bar chart showing convergence to theoretical 16.7%.
  - **Household Energy Calculator**: Appliance power ratings (with presets), daily usage, days, tariff ($/kWh), total energy (kWh), billing cost ($), and CO2 emissions.
- **Quiz & Challenges (`/quiz`)**:
  - Filter by Subject and Difficulty.
  - Step-by-step multiple-choice questions with immediate correctness feedback and in-depth explanations.
  - Score summary, accuracy percentage, celebration confetti, retry incorrect questions, and restart quiz.
- **My Progress (`/progress`)**:
  - Completed concepts progress bar and percentage.
  - Overall quiz accuracy percentage.
  - Subject-by-subject progress breakdown across all 12 subjects.
  - Bookmarked lessons with direct jump links.
  - Historical quiz session records.
  - Milestone achievement badges.
  - Recommended next lessons based on quiz performance.
  - Reset progress dialog.

### 2. Dedicated Authentication Pages
- **Login (`/login`)**: Email/password authentication, show/hide password, remember me, route redirection (returns to intended destination).
- **Sign Up (`/signup`)**: Name, email, password match validation, password strength criteria, terms acceptance, email confirmation guidance.
- **Forgot Password (`/forgot-password`)**: Password reset link dispatcher connected to Supabase Auth.

### 3. Dual-Tier Persistence
- **Guest / Anonymous Users**: Learning progress, bookmarks, and quiz attempts are saved locally via `LocalStorage`.
- **Authenticated Users**: Synchronized to Supabase PostgreSQL database tables with Row Level Security (RLS). Includes an explicit **Import Guest Progress** button to merge local offline work into an account without duplicates.

### 4. Visual Design System & Themes
- Color tokens matching sky-blue (`#38A9F5`), white (`#FFFFFF`), and dark-navy (`#0B1220` / `#131F32`).
- Seamless **Light Mode** and **Dark Mode** toggle in navbar and mobile drawer.
- Respects OS preference on first visit, remembers user selection in LocalStorage, and transitions smoothly without resetting quiz or simulation states.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS with custom design token variables
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **Animations / Effects**: Canvas Confetti
- **Backend / Auth / Database**: Supabase Authentication & PostgreSQL (with safe offline guest mode)

---

## 📦 Getting Started

### 1. Installation

```bash
# Clone or navigate to the project directory
cd "MindMap Reality"

# Install dependencies
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your web browser.

### 3. Run Automated Integrity Verification Tests

```bash
npm test
```

Verifies:
- All 12 subject categories
- 36+ applied concepts (including mandatory lessons)
- Simulation mathematical formulas
- Quiz question bank and correct answer integrity
- Design system CSS color tokens

### 4. Build for Production

```bash
npm run build
```

Creates an optimized production bundle in `dist/`.

---

## 🗄️ Supabase Configuration (Optional Cloud Sync)

MindMap Reality works offline out of the box using LocalStorage for guest learners. To enable multi-device account synchronization:

1. Create a free project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
   ```
3. Open the **SQL Editor** in your Supabase Dashboard and run the script in `supabase/schema.sql`. This sets up:
   - `profiles` table with automatic user creation trigger
   - `user_progress` table for completed lessons
   - `bookmarks` table for saved lessons
   - `quiz_attempts` table for historical test records
   - Row Level Security (RLS) policies ensuring users only read and write their own data.
