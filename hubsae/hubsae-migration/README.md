# HUB SAE Growth Engine — Migration Guide
## Base44 → GitHub + Vercel + Supabase

---

## Files in this package

| File | What it replaces | Where it goes in your project |
|---|---|---|
| `src/api/supabaseClient.js` | `src/api/base44Client.js` | Same folder, new name |
| `src/lib/AuthContext.jsx` | `src/lib/AuthContext.jsx` | Replace existing file |
| `src/pages/Home.jsx` | `src/pages/Home.jsx` | Replace existing file |
| `src/pages/CohortAdmin.jsx` | `src/pages/CohortAdmin.jsx` | Replace existing file |
| `src/components/sae/AICoach.jsx` | `src/components/sae/AICoach.jsx` | Replace existing file |
| `api/leaderboard.js` | Base44 Deno function | New folder at project root |
| `api/coach.js` | `base44.integrations.Core.InvokeLLM` | New file in same api folder |
| `supabase_setup.sql` | Base44 entity schemas | Run once in Supabase SQL Editor |
| `.env.example` | Base44 app credentials | Copy to `.env.local`, fill in values |

---

## Step 1 — Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account + new project.
2. Wait for the project to finish provisioning (~2 min).
3. Go to **SQL Editor** in the left sidebar.
4. Paste the entire contents of `supabase_setup.sql` and click **Run**.
5. Go to **Project Settings > API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL` and `SUPABASE_URL`
   - **anon / public key** → `VITE_SUPABASE_ANON_KEY`
   - **service_role / secret key** → `SUPABASE_SERVICE_ROLE_KEY`

6. Go to **Authentication > Email** and make sure **Enable Email confirmations** is turned OFF (magic links work without it, and confirmation emails complicate the flow).

---

## Step 2 — Update your project files

1. Install the Supabase JS client:
   ```
   npm install @supabase/supabase-js
   ```

2. Delete `src/api/base44Client.js`.

3. Copy all replacement files from this package into your project at the paths shown in the table above.

4. For `PostCapstone.jsx`, follow the instructions in `src/components/sae/PostCapstone_migration_notes.js` — it's the only file that needs manual edits rather than a full replacement.

5. Create `.env.local` at the project root using `.env.example` as a template and fill in your Supabase values.

6. Delete these packages you no longer need:
   ```
   npm uninstall @base44/sdk
   ```

---

## Step 3 — Test locally

```
npm run dev
```

Open `http://localhost:5173`. You should see the magic link login screen. Enter your email, check for the Supabase email, click the link, and verify the app loads.

---

## Step 4 — Push to GitHub

1. Create a new repository at [github.com](https://github.com) (can be private).
2. In your project folder:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

Make sure `.env.local` is in `.gitignore` (Vite adds it by default).

---

## Step 5 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New Project** and import your GitHub repo.
3. Vercel will auto-detect Vite. Leave the build settings as-is.
4. Before clicking Deploy, go to **Environment Variables** and add all six variables from `.env.example`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ANTHROPIC_API_KEY` (from console.anthropic.com)
5. Click **Deploy**.

Vercel gives you a URL like `https://your-app.vercel.app`. Every push to `main` auto-deploys.

---

## Step 6 — Update Supabase auth redirect URL

1. In Supabase go to **Authentication > URL Configuration**.
2. Add your Vercel URL to **Redirect URLs**: `https://your-app.vercel.app`
3. Also add `http://localhost:5173` for local dev.

---

## How the new auth flow works

Users no longer need a Base44 account. The flow is:

1. User visits the app and sees the "Sign in" screen.
2. They enter their work email and click **Send Login Link**.
3. Supabase emails them a magic link (no password required).
4. They click the link and land back in the app, fully authenticated.
5. On first login, they're prompted to enter their name and select their role.

Admins can then assign users to cohorts via the Cohort Admin page, same as before.

---

## Notes

- The `SUPABASE_SERVICE_ROLE_KEY` is only used server-side in `api/leaderboard.js`. It never reaches the browser.
- The `ANTHROPIC_API_KEY` is only used server-side in `api/coach.js`.
- `VITE_SUPABASE_ANON_KEY` is safe to expose in the browser — Supabase's Row Level Security policies control what it can access.
