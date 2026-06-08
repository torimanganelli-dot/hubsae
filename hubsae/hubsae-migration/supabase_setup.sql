-- ============================================================
-- HUB SAE Growth Engine — Supabase database setup
-- Run this in the Supabase SQL Editor (supabase.com > your project > SQL Editor)
-- ============================================================

-- 1. PROFILES TABLE
-- Stores display name, role, and cohort assignment for each user.
-- The id column links to auth.users (Supabase's built-in auth table).
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  role        text not null default 'user' check (role in ('admin', 'user')),
  cohort_id   uuid,
  created_at  timestamptz default now()
);

-- 2. COHORTS TABLE
create table if not exists cohorts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  created_at  timestamptz default now()
);

-- Add the cohort foreign key now that cohorts exists
alter table profiles
  add constraint profiles_cohort_id_fkey
  foreign key (cohort_id) references cohorts(id) on delete set null;

-- 3. SUBMISSIONS TABLE
create table if not exists submissions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  user_name   text,
  activity_id text not null,
  module_id   text not null,
  text        text,
  revenue     numeric default 0,
  score       numeric,
  status      text default 'pending' check (status in ('pending','approved','adequate','needs_work')),
  feedback    jsonb,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 4. POST_CAPSTONE_ENTRIES TABLE
create table if not exists post_capstone_entries (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  user_name           text,
  month               int not null check (month in (1,2,3)),
  competency          text not null,
  response            text,
  completed           boolean default false,
  reflection_q1       text,
  reflection_q2       text,
  revenue_influenced  numeric default 0,
  metric2             numeric default 0,
  metric3             numeric default 0,
  metric4             numeric default 0,
  top3                jsonb,
  month_completed     boolean default false,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Authenticated users can read everything (needed for leaderboard
-- cohort filtering), but can only write their own rows.
-- The leaderboard API route uses the service role key which
-- bypasses RLS entirely.
-- ============================================================

alter table profiles enable row level security;
alter table submissions enable row level security;
alter table post_capstone_entries enable row level security;
alter table cohorts enable row level security;

-- Profiles: read all, write own
create policy "profiles_select" on profiles for select to authenticated using (true);
create policy "profiles_insert" on profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update" on profiles for update to authenticated using (auth.uid() = id);

-- Cohorts: read all, only admins write (handled in app logic; no RLS restriction here)
create policy "cohorts_select" on cohorts for select to authenticated using (true);
create policy "cohorts_all"    on cohorts for all    to authenticated using (true);

-- Submissions: read all, write own
create policy "submissions_select" on submissions for select to authenticated using (true);
create policy "submissions_insert" on submissions for insert to authenticated with check (auth.uid() = user_id);
create policy "submissions_update" on submissions for update to authenticated using (auth.uid() = user_id);

-- Post-capstone entries: read own, write own
create policy "pce_select" on post_capstone_entries for select to authenticated using (auth.uid() = user_id);
create policy "pce_insert" on post_capstone_entries for insert to authenticated with check (auth.uid() = user_id);
create policy "pce_update" on post_capstone_entries for update to authenticated using (auth.uid() = user_id);

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- This trigger fires whenever a new user signs up via Supabase Auth
-- and creates a matching row in profiles automatically.
-- ============================================================

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
