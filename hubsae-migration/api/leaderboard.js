// api/leaderboard.js
// Vercel serverless function — replaces the Base44 Deno getLeaderboardData function.
// Uses the Supabase service role key so it can read all users and submissions
// regardless of which user is making the request.
//
// Deploy this file at the ROOT of your project as: api/leaderboard.js
// Vercel auto-detects anything in the /api folder as a serverless function.

import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Service role key bypasses Row Level Security — keep this server-side only,
  // never expose it to the browser.
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const [{ data: users, error: usersError }, { data: subs, error: subsError }] =
      await Promise.all([
        supabase.from("profiles").select("*"),
        supabase.from("submissions").select("*"),
      ]);

    if (usersError) throw usersError;
    if (subsError) throw subsError;

    return res.status(200).json({ users: users || [], subs: subs || [] });
  } catch (error) {
    console.error("Leaderboard API error:", error);
    return res.status(500).json({ error: error.message });
  }
}
