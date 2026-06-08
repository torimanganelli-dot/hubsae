// PostCapstone.jsx — replace the top import only; rest of file is unchanged.
// Find this line at the top of your existing PostCapstone.jsx:
//   import { base44 } from "@/api/base44Client";
// Replace it with:
import { supabase } from "@/api/supabaseClient";

// Then replace these three patterns anywhere they appear in PostCapstone.jsx:
//
// PATTERN 1 — loading entries:
//   base44.entities.PostCapstoneEntry.filter({ user_id: userId })
// Replace with:
//   supabase.from("post_capstone_entries").select("*").eq("user_id", userId).then(({ data }) => data)
//
// PATTERN 2 — updating an existing entry:
//   base44.entities.PostCapstoneEntry.update(existing.id, payload)
// Replace with:
//   supabase.from("post_capstone_entries").update(payload).eq("id", existing.id).select().single().then(({ data }) => data)
//
// PATTERN 3 — creating a new entry:
//   base44.entities.PostCapstoneEntry.create(payload)
// Replace with:
//   supabase.from("post_capstone_entries").insert(payload).select().single().then(({ data }) => data)
//
// The complete updated versions of the three affected code blocks are below.
// Copy these into PostCapstone.jsx over the existing blocks.

// ─────────────────────────────────────────────────────────────
// BLOCK A: initial load (replaces the .filter call around line 130)
// ─────────────────────────────────────────────────────────────
// supabase
//   .from("post_capstone_entries")
//   .select("*")
//   .eq("user_id", userId)
//   .then(({ data }) => {
//     const map = {};
//     for (const e of (data || [])) {
//       if (!map[e.month]) map[e.month] = {};
//       map[e.month][e.competency] = e;
//     }
//     setEntries(map);
//   });

// ─────────────────────────────────────────────────────────────
// BLOCK B: save / update a competency response (around line 165-175)
// ─────────────────────────────────────────────────────────────
// if (existing?.id) {
//   const { data: updated } = await supabase
//     .from("post_capstone_entries")
//     .update(payload)
//     .eq("id", existing.id)
//     .select()
//     .single();
//   saved = updated;
// } else {
//   const { data: created } = await supabase
//     .from("post_capstone_entries")
//     .insert(payload)
//     .select()
//     .single();
//   saved = created;
// }

// ─────────────────────────────────────────────────────────────
// BLOCK C: complete month (around line 255-275)
// ─────────────────────────────────────────────────────────────
// const sharedPayload = { month_completed: true };
// const monthEntries = Object.values(entries[activeMonth] || {});
// await Promise.all(
//   monthEntries.map(e =>
//     supabase.from("post_capstone_entries").update(sharedPayload).eq("id", e.id)
//   )
// );
// if (monthEntries.length === 0) {
//   await supabase.from("post_capstone_entries").insert({
//     user_id: userId,
//     user_name: userName,
//     month: activeMonth,
//     competency: "general",
//     month_completed: true,
//   });
// }
// const { data: fresh } = await supabase
//   .from("post_capstone_entries")
//   .select("*")
//   .eq("user_id", userId);
// const map = {};
// for (const e of (fresh || [])) {
//   if (!map[e.month]) map[e.month] = {};
//   map[e.month][e.competency] = e;
// }
// setEntries(map);
