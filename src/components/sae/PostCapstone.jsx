import React, { useState, useEffect } from "react";
import { supabase } from "@/api/supabaseClient";

const MONTHS = [
  {
    id: 1,
    label: "Month 1",
    theme: "Sustain",
    color: "#263746",
    lightColor: "#EEF1F4",
    desc: "You finished the program with momentum. This month is about protecting it. Go back to the accounts you worked during the sprints and ask: what did I start that I haven't finished? What did I identify but not act on?",
    reflectionQ1: "What was the most important thing that happened in your book this month?",
    reflectionQ2: "What did you do this month that you would not have done before the program?",
    metrics: [
      { key: "revenue_influenced", label: "Revenue influenced this month ($)", prefix: "$" },
      { key: "metric2", label: "Accounts with active opportunities" },
      { key: "metric3", label: "Diagnostic conversations held" },
      { key: "metric4", label: "Cross-sell introductions made" },
    ],
    completeCTA: "Complete Month 1 — Move to Expand →",
  },
  {
    id: 2,
    label: "Month 2",
    theme: "Expand",
    color: "#0678D5",
    lightColor: "#EBF3FC",
    desc: "Month 1 was about the accounts you already know. Month 2 is about transfer — taking the approach that worked on your capstone account and deliberately applying it somewhere new.",
    reflectionQ1: "What worked when you transferred your approach to a new account — and what didn't?",
    reflectionQ2: "What is the one skill that still feels inconsistent — something you can execute on familiar accounts but not yet on new ones?",
    metrics: [
      { key: "revenue_influenced", label: "Revenue influenced this month ($)", prefix: "$" },
      { key: "metric2", label: "New accounts worked strategically" },
      { key: "metric3", label: "Hyperbound sessions completed" },
      { key: "metric4", label: "Executive meetings held or scheduled" },
    ],
    completeCTA: "Complete Month 2 — Move to Prove →",
  },
  {
    id: 3,
    label: "Month 3",
    theme: "Prove",
    color: "#1A6B3A",
    lightColor: "#EAF4EE",
    desc: "This is the month you build your story. Not a polished narrative — an honest, evidence-based account of what changed between the start of the program and now.",
    reflectionQ1: "What is the single most valuable habit you built during this program that you will carry forward permanently?",
    reflectionQ2: "If you were briefing your replacement on this book in 90 days — what would you tell them about the accounts you've repositioned and the relationships you've changed?",
    metrics: [
      { key: "revenue_influenced", label: "Total revenue influenced over 90 days ($)", prefix: "$" },
      { key: "metric2", label: "Accounts fully repositioned" },
      { key: "metric3", label: "Executive relationships established" },
      { key: "metric4", label: "Renewals with strategic narrative" },
    ],
    completeCTA: "Complete Month 3 — Track Finished ✓",
  },
];

const COMPETENCIES = [
  { id: "business_acumen", emoji: "🏢", label: "Business Acumen", sub: "Reading clients as businesses, not coverage accounts",
    prompts: {
      1: ["Pick one account you mapped during the program. What has changed in their business since you last reviewed them — new leadership, market pressures, growth, or contraction? How does that shift your view of their risk?",
          "What is one thing happening in this client's industry right now that they probably haven't connected to their insurance yet? How would you bring that into a conversation?"],
      2: ["Choose one of your two new target accounts. Write a 3-sentence business description of this client — no insurance language. Who are they, what do they do, what's happening in their world right now?",
          "What do you know about this client's business that a transactional AM would never find in the account file? If the answer is nothing yet — what's your plan to find it before your next conversation?"],
      3: ["Before the program: how did you typically prepare for a client meeting? After the program: what do you do now that you didn't do before? Be specific — not 'I do more research' but exactly what you look at and why.",
          "Name one client who now sees you differently because of how you talk about their business. What changed in how they respond to you?"],
    }
  },
  { id: "risk_identification", emoji: "🔍", label: "Risk Identification", sub: "Systematic opportunity scanning",
    prompts: {
      1: ["Run the 5-question Opportunity Scan on one account you haven't scanned before. What came up that wasn't in your original mapping work?",
          "Of all the gaps you identified during the program, which ones are still unresolved? Rank them. Which one do you act on this month?"],
      2: ["Run the full Opportunity Scan on both of your new target accounts. What are the top two gaps on each account — gaps the client doesn't know you've identified?",
          "Which of those four gaps has the highest revenue potential and the clearest path to a conversation? That's your priority. What is your opening move?"],
      3: ["Across the accounts you've scanned over the last 90 days: how much total revenue opportunity have you identified? List the accounts and the gaps.",
          "What percentage of your book has now been scanned with the Opportunity Scan? What's your commitment for the next 90 days?"],
    }
  },
  { id: "client_influence", emoji: "💬", label: "Client Influence", sub: "Diagnostic conversations — SPIN and 4-layer framework",
    prompts: {
      1: ["Think about the last meaningful client conversation you had. Did you get to the implication layer — where the client articulated what the gap actually costs them? If not, what would you do differently?",
          "Identify one client conversation you've been avoiding. What is the diagnostic question you need to ask that you haven't asked yet? Schedule it this month."],
      2: ["Before your next diagnostic conversation on a new account — book a Hyperbound session. Run the simulation first. What did the practice conversation surface that changed how you planned to open?",
          "After the actual conversation: what did the client say that you didn't expect? What layer did you reach — situation, problem, implication, or need-payoff? What would have gotten you one layer deeper?"],
      3: ["What is the best client quote you've received in the last 90 days — a moment where a client told you something about their business that you would not have heard if you were still running transactional meetings?",
          "What is your personal failure mode in a diagnostic conversation — the habit you fall back to under pressure? What is your trigger to catch yourself?"],
    }
  },
  { id: "cross_sell", emoji: "⚡", label: "Cross-Sell Execution", sub: "Signal-first cross-sell approach",
    prompts: {
      1: ["Look at your top 10 accounts. Using the 6 signal categories, identify the one account with the strongest active signal right now. What is the signal and what line does it point to?",
          "For that account: have you briefed the specialist? If not, what is preventing you? Write the 3-part introduction sequence you would use to open that door."],
      2: ["On your two new target accounts — what cross-sell signals are present right now? Don't guess. Name the signal category, name the specific signal, name the line it points to.",
          "Make one specialist introduction this month on a new account. Afterward: how did the client respond to the 3-part introduction? What would you refine for the next one?"],
      3: ["Since starting the program: how many cross-sell introductions have you made? How many resulted in a conversation? How many closed? What does the conversion rate tell you?",
          "Which specialist relationship do you need to build that you haven't built yet? What is the business case you'd make to that specialist for why your accounts are worth their time?"],
    }
  },
  { id: "renewal_strategy", emoji: "📅", label: "Renewal Strategy", sub: "Proactive 90-day renewal runway",
    prompts: {
      1: ["Which accounts renew in the next 90 days? For each one: have you started the renewal runway or are you still in reactive mode? What is the first proactive move you make this week?",
          "Think about your last renewal that included a premium increase conversation. Did you use the 4-move sequence? What worked and what would you change?"],
      2: ["On a renewal coming up in the next 60 days that you haven't strategically prepared: start the runway today. What are the three things you need to know about this client's business before you sit down with them?",
          "If premium is going up on this account: have you used the alignment question technique to set expectations before the number lands? What is the specific language you'll use?"],
      3: ["Compare your first renewal using the new approach to your last renewal before the program. What was different? Where did the client respond differently to you?",
          "Which renewal in the next quarter represents your highest risk of losing the account — and what is your plan for it?"],
    }
  },
  { id: "executive_relationships", emoji: "🤝", label: "Executive Relationships", sub: "Getting above the day-to-day contact",
    prompts: {
      1: ["On your top 5 accounts: at what level are you having conversations? Day-to-day contact, manager, or C-suite? For any account stuck at day-to-day — what is your plan to move up?",
          "Have you had one executive-level conversation since completing the program? If yes — what did you learn that you wouldn't have learned from your day-to-day contact? If no — which account and which executive is your target this month?"],
      2: ["On one of your new target accounts: who is the executive you need to know? What is the business reason — not the insurance reason — that justifies asking for that meeting?",
          "Book a Hyperbound session to practice the executive meeting opening before you go live. After the session: what did you learn about how you show up in that environment?"],
      3: ["Since completing the program: how many executive relationships have you initiated or deepened? For each one — what did you learn about the account that changed how you manage it?",
          "What is your executive relationship goal for the next 90 days? Name the accounts, name the executives, name the business triggers you'll use."],
    }
  },
];

export default function PostCapstone({ userId, userName }) {
  const [entries, setEntries] = useState([]);
  const [activeMonth, setActiveMonth] = useState(1);
  const [expandedComp, setExpandedComp] = useState(null);
  const [localData, setLocalData] = useState({});
  const [saving, setSaving] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.PostCapstoneEntry.filter({ user_id: userId }).then(data => {
      setEntries(data);
      // Build localData map: `${month}-${competency}` -> entry
      const map = {};
      data.forEach(e => {
        map[`${e.month}-${e.competency}`] = e;
        map[`${e.month}-reflection`] = map[`${e.month}-reflection`] || e; // store month-level data too
      });
      // Also build month-level reflection/metrics from the first entry per month that has them
      const monthMap = {};
      data.forEach(e => {
        if (!monthMap[e.month]) monthMap[e.month] = {};
        if (e.reflection_q1) monthMap[e.month].reflection_q1 = e.reflection_q1;
        if (e.reflection_q2) monthMap[e.month].reflection_q2 = e.reflection_q2;
        if (e.revenue_influenced != null) monthMap[e.month].revenue_influenced = e.revenue_influenced;
        if (e.metric2 != null) monthMap[e.month].metric2 = e.metric2;
        if (e.metric3 != null) monthMap[e.month].metric3 = e.metric3;
        if (e.metric4 != null) monthMap[e.month].metric4 = e.metric4;
        if (e.top3) monthMap[e.month].top3 = e.top3;
      });
      setLocalData({ ...map, ...Object.fromEntries(Object.entries(monthMap).map(([k, v]) => [`month-${k}`, v])) });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [userId]);

  const getEntry = (month, competency) => entries.find(e => e.month === month && e.competency === competency);
  const getMonthEntry = (month) => entries.find(e => e.month === month && e.month_completed);

  const getLocal = (key, field, fallback = "") => localData[key]?.[field] ?? fallback;
  const setLocal = (key, field, value) => setLocalData(prev => ({ ...prev, [key]: { ...(prev[key] || {}), [field]: value } }));

  const saveCompetency = async (month, competency) => {
    const key = `${month}-${competency}`;
    const data = localData[key] || {};
    setSaving(prev => ({ ...prev, [key]: true }));
    const existing = getEntry(month, competency);
    const payload = { user_id: userId, user_name: userName, month, competency, response: data.response || "", completed: true };
    let saved;
    if (existing?.id) {
      saved = await base44.entities.PostCapstoneEntry.update(existing.id, payload);
    } else {
      saved = await base44.entities.PostCapstoneEntry.create(payload);
    }
    setEntries(prev => existing?.id ? prev.map(e => e.id === existing.id ? saved : e) : [...prev, saved]);
    setSaving(prev => ({ ...prev, [key]: false }));
  };

  const emptyOpp = () => ({ account: "", type: "", revenue: "", signal: "" });
  const getTop3 = (month) => {
    const raw = localData[`month-${month}`]?.top3;
    if (!raw || !Array.isArray(raw)) return [emptyOpp(), emptyOpp(), emptyOpp()];
    return [...raw, emptyOpp(), emptyOpp(), emptyOpp()].slice(0, 3).map(o => ({ ...emptyOpp(), ...o }));
  };
  const setTop3Field = (month, i, field, value) => {
    const current = getTop3(month);
    const updated = current.map((t, idx) => idx === i ? { ...t, [field]: value } : t);
    setLocal(`month-${month}`, "top3", updated);
  };

  const downloadMonthReport = (month) => {
    const mDef = MONTHS.find(m => m.id === month);
    const mData = localData[`month-${month}`] || {};
    const top3 = getTop3(month);

    let text = `HUB SAE GROWTH ENGINE — POST-CAPSTONE TRACK\n`;
    text += `${mDef.label} of 3: ${mDef.theme}\n`;
    text += `Participant: ${userName}\n`;
    text += `Date: ${new Date().toLocaleDateString()}\n`;
    text += `${"=".repeat(60)}\n\n`;

    text += `THEME\n${"-".repeat(40)}\n${mDef.desc}\n\n`;

    text += `COMPETENCY RESPONSES\n${"=".repeat(60)}\n\n`;
    COMPETENCIES.forEach(comp => {
      const key = `${month}-${comp.id}`;
      const entry = getEntry(month, comp.id);
      const response = localData[key]?.response || entry?.response || "";
      text += `${comp.emoji} ${comp.label}\n`;
      text += `${comp.sub}\n`;
      text += `${"-".repeat(40)}\n`;
      text += response || "(No response recorded)";
      text += `\n\n`;
    });

    text += `REFLECTION\n${"=".repeat(60)}\n\n`;
    text += `Q1: ${mDef.reflectionQ1}\n`;
    text += (mData.reflection_q1 || "(No response recorded)") + `\n\n`;
    text += `Q2: ${mDef.reflectionQ2}\n`;
    text += (mData.reflection_q2 || "(No response recorded)") + `\n\n`;

    text += `SELF-REPORTED OUTCOMES\n${"=".repeat(60)}\n\n`;
    mDef.metrics.forEach(metric => {
      const val = mData[metric.key];
      text += `${metric.label}: ${metric.prefix || ""}${val != null && val !== "" ? val : "0"}\n`;
    });

    text += `\nTOP 3 OPPORTUNITIES THIS MONTH\n${"=".repeat(60)}\n\n`;
    top3.forEach((opp, i) => {
      text += `#${i + 1}: ${opp.account || "—"}\n`;
      if (opp.type) text += `  Type: ${opp.type}\n`;
      if (opp.revenue) text += `  Est. Revenue: $${opp.revenue}\n`;
      if (opp.signal) text += `  Signal/Reason: ${opp.signal}\n`;
      text += "\n";
    });

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Post-Capstone_Month${month}_${(userName || "SAE").replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveMonthReflection = async (month) => {
    const mData = localData[`month-${month}`] || {};
    const top3 = getTop3(month);
    const sharedPayload = {
      reflection_q1: mData.reflection_q1 || "",
      reflection_q2: mData.reflection_q2 || "",
      revenue_influenced: parseFloat(mData.revenue_influenced) || 0,
      metric2: parseFloat(mData.metric2) || 0,
      metric3: parseFloat(mData.metric3) || 0,
      metric4: parseFloat(mData.metric4) || 0,
      top3,
      month_completed: true,
    };
    // Update all competency entries for this month with reflection + metrics, mark month_completed
    const monthEntries = entries.filter(e => e.month === month);
    const updates = monthEntries.map(e =>
      base44.entities.PostCapstoneEntry.update(e.id, sharedPayload)
    );
    // If no competency entries yet, create a summary entry
    if (monthEntries.length === 0) {
      await base44.entities.PostCapstoneEntry.create({
        user_id: userId, user_name: userName, month,
        competency: "summary",
        ...sharedPayload,
      });
    } else {
      await Promise.all(updates);
    }
    // Reload
    const fresh = await base44.entities.PostCapstoneEntry.filter({ user_id: userId });
    setEntries(fresh);
    if (month < 3) setActiveMonth(month + 1);
  };

  const monthDef = MONTHS.find(m => m.id === activeMonth);
  const color = monthDef.color;
  const lightColor = monthDef.lightColor;

  const completedMonths = [1, 2, 3].filter(m => entries.some(e => e.month === m && e.month_completed));

  // Total revenue across all months
  const totalRevenue = entries.reduce((sum, e) => sum + (e.revenue_influenced || 0), 0);

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#757584" }}>Loading…</div>;

  return (
    <div style={{ padding: 24, maxWidth: 860, margin: "0 auto", width: "100%", fontFamily: "system-ui,-apple-system,sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#18252D", borderRadius: 16, padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#F3B921", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8 }}>★ Post-Capstone Track</div>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 4 }}>90-Day Growth Continuation</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", lineHeight: 1.6, marginBottom: 16 }}>Your work doesn't stop at the Designation. Over the next 90 days, apply all six competencies to your live book each month.</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["3", "Monthly Sprints"], ["6", "Competencies / Month"], ["~60 min", "Per Month"], ["$" + (totalRevenue / 1000).toFixed(0) + "K", "Revenue Tracked"]].map(([v, l]) => (
            <div key={l} style={{ background: "rgba(255,255,255,.1)", borderRadius: 10, padding: "10px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#F3B921" }}>{v}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Month Tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {MONTHS.map(m => {
          const done = completedMonths.includes(m.id);
          const active = activeMonth === m.id;
          return (
            <button key={m.id} onClick={() => setActiveMonth(m.id)}
              style={{ flex: 1, padding: "14px 10px", borderRadius: 12, border: `2px solid ${active ? m.color : done ? m.color + "60" : "#D1D9E0"}`, background: active ? m.color : done ? m.lightColor : "#fff", color: active ? "#fff" : done ? m.color : "#757584", fontWeight: 800, fontSize: 12, cursor: "pointer", textAlign: "center" }}>
              <div style={{ fontSize: 16, marginBottom: 2 }}>{done ? "✓" : m.id}</div>
              <div>{m.label}</div>
              <div style={{ fontSize: 10, fontWeight: 500, opacity: .8 }}>{m.theme}</div>
            </button>
          );
        })}
      </div>

      {/* Month Content */}
      <div style={{ background: "#fff", border: `2px solid ${color}30`, borderRadius: 14, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Month {activeMonth} of 3 · {monthDef.theme}</div>
        <p style={{ fontSize: 13, color: "#385263", lineHeight: 1.7, margin: 0 }}>{monthDef.desc}</p>
        <div style={{ fontSize: 11, color: "#757584", marginTop: 8 }}>⏱ Approx. 60 minutes total this month</div>
      </div>

      {/* Competencies */}
      {COMPETENCIES.map(comp => {
        const key = `${activeMonth}-${comp.id}`;
        const entry = getEntry(activeMonth, comp.id);
        const isComplete = entry?.completed;
        const isExpanded = expandedComp === key;
        const prompts = comp.prompts[activeMonth] || [];

        return (
          <div key={comp.id} style={{ background: "#fff", border: `1px solid ${isComplete ? color + "40" : "#D1D9E0"}`, borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
            <div onClick={() => setExpandedComp(isExpanded ? null : key)}
              style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", background: isComplete ? lightColor : "#fff" }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>{comp.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: "#18252D" }}>{comp.label}</div>
                <div style={{ fontSize: 11, color: "#757584" }}>{comp.sub}</div>
              </div>
              {isComplete && <span style={{ fontSize: 11, fontWeight: 700, color, background: color + "15", padding: "3px 10px", borderRadius: 99 }}>✓ Complete</span>}
              <span style={{ color: "#757584", fontSize: 14 }}>{isExpanded ? "▲" : "▼"}</span>
            </div>

            {isExpanded && (
              <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${color}20` }}>
                <div style={{ background: lightColor, borderRadius: 10, padding: 14, margin: "14px 0 12px" }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>Your prompts this month</div>
                  {prompts.map((p, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < prompts.length - 1 ? 10 : 0 }}>
                      <div style={{ width: 20, height: 20, borderRadius: 5, background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                      <p style={{ fontSize: 12, color: "#385263", lineHeight: 1.6, margin: 0 }}>{p}</p>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#757584", textTransform: "uppercase", marginBottom: 6 }}>Your response</div>
                <textarea
                  rows={5}
                  value={getLocal(key, "response", entry?.response || "")}
                  onChange={e => setLocal(key, "response", e.target.value)}
                  placeholder="Be specific — name the account, the moment, the outcome."
                  style={{ width: "100%", background: "#EEF0E2", border: "1px solid #D1D9E0", borderRadius: 8, padding: "12px 14px", fontSize: 12, color: "#18252D", lineHeight: 1.7, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                />
                <button
                  onClick={() => saveCompetency(activeMonth, comp.id)}
                  disabled={saving[key]}
                  style={{ marginTop: 10, padding: "10px 20px", borderRadius: 8, border: "none", background: saving[key] ? "#E3E3E3" : color, color: "#fff", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
                  {saving[key] ? "Saving…" : isComplete ? "✓ Update Response" : "Mark Complete"}
                </button>
              </div>
            )}
          </div>
        );
      })}

      {/* Month Reflection & Outcomes */}
      <div style={{ background: "#fff", border: `2px solid ${color}40`, borderRadius: 14, padding: 24, marginTop: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 900, color: "#18252D", marginBottom: 4 }}>Month {activeMonth} Reflection & Outcomes</div>
        <div style={{ fontSize: 12, color: "#757584", marginBottom: 16, lineHeight: 1.5 }}>Complete this after working through all six competencies. Be specific — this becomes part of your performance narrative.</div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#18252D", marginBottom: 6 }}>{monthDef.reflectionQ1}</div>
          <textarea rows={3} value={getLocal(`month-${activeMonth}`, "reflection_q1")}
            onChange={e => setLocal(`month-${activeMonth}`, "reflection_q1", e.target.value)}
            style={{ width: "100%", background: "#EEF0E2", border: "1px solid #D1D9E0", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#18252D", lineHeight: 1.6, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#18252D", marginBottom: 6 }}>{monthDef.reflectionQ2}</div>
          <textarea rows={3} value={getLocal(`month-${activeMonth}`, "reflection_q2")}
            onChange={e => setLocal(`month-${activeMonth}`, "reflection_q2", e.target.value)}
            style={{ width: "100%", background: "#EEF0E2", border: "1px solid #D1D9E0", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#18252D", lineHeight: 1.6, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
        </div>

        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 12 }}>Self-reported outcomes</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {monthDef.metrics.map(metric => (
            <div key={metric.key} style={{ background: "#F4F6F9", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#385263", marginBottom: 8 }}>{metric.label}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {metric.prefix && <span style={{ color: "#757584", fontSize: 14 }}>{metric.prefix}</span>}
                <input
                  type="number"
                  value={getLocal(`month-${activeMonth}`, metric.key, "")}
                  onChange={e => setLocal(`month-${activeMonth}`, metric.key, e.target.value)}
                  placeholder="0"
                  style={{ width: "100%", background: "#EEF0E2", border: "1px solid #D1D9E0", borderRadius: 7, padding: "8px 10px", fontSize: 14, fontWeight: 700, outline: "none", fontFamily: "inherit" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Top 3 Opportunities */}
        <div style={{ borderTop: "1px solid #E3E3E3", paddingTop: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>🏆 Top 3 Opportunities This Month</div>
          <div style={{ fontSize: 12, color: "#757584", marginBottom: 14, lineHeight: 1.5 }}>Log your top 3 opportunities identified this month.</div>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ border: "1px solid #D1D9E0", borderRadius: 10, padding: 14, marginBottom: 10, background: "#FAFBFC" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{i + 1}</div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#757584", textTransform: "uppercase", letterSpacing: ".06em" }}>Opportunity {i + 1}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#757584", marginBottom: 4, textTransform: "uppercase" }}>Account Name</div>
                  <input value={getTop3(activeMonth)[i]?.account || ""} onChange={e => setTop3Field(activeMonth, i, "account", e.target.value)}
                    placeholder="e.g. Meridian Logistics"
                    style={{ width: "100%", background: "#EEF0E2", border: "1px solid #D1D9E0", borderRadius: 7, padding: "8px 10px", fontSize: 12, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#757584", marginBottom: 4, textTransform: "uppercase" }}>Opportunity Type</div>
                  <select value={getTop3(activeMonth)[i]?.type || ""} onChange={e => setTop3Field(activeMonth, i, "type", e.target.value)}
                    style={{ width: "100%", background: "#EEF0E2", border: "1px solid #D1D9E0", borderRadius: 7, padding: "8px 10px", fontSize: 12, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}>
                    <option value="">Select type…</option>
                    <option value="Cyber">Cyber</option>
                    <option value="EPLI">EPLI</option>
                    <option value="D&O">D&O</option>
                    <option value="Workers Comp">Workers Comp</option>
                    <option value="Commercial Auto">Commercial Auto</option>
                    <option value="Property">Property</option>
                    <option value="GL">General Liability</option>
                    <option value="Umbrella">Umbrella / Excess</option>
                    <option value="Benefits">Employee Benefits</option>
                    <option value="Life / Disability">Life / Disability</option>
                    <option value="Financial Lines">Financial Lines</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#757584", marginBottom: 4, textTransform: "uppercase" }}>Est. Revenue</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 13, color: "#757584" }}>$</span>
                    <input value={getTop3(activeMonth)[i]?.revenue || ""} onChange={e => setTop3Field(activeMonth, i, "revenue", e.target.value)}
                      placeholder="e.g. 28,000"
                      style={{ flex: 1, background: "#EEF0E2", border: "1px solid #D1D9E0", borderRadius: 7, padding: "8px 10px", fontSize: 12, outline: "none", fontFamily: "inherit" }} />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#757584", marginBottom: 4, textTransform: "uppercase" }}>Signal / Reason</div>
                  <input value={getTop3(activeMonth)[i]?.signal || ""} onChange={e => setTop3Field(activeMonth, i, "signal", e.target.value)}
                    placeholder="e.g. No cyber coverage despite WMS platform"
                    style={{ width: "100%", background: "#EEF0E2", border: "1px solid #D1D9E0", borderRadius: 7, padding: "8px 10px", fontSize: 12, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => saveMonthReflection(activeMonth)}
          style={{ width: "100%", padding: 14, borderRadius: 10, border: "none", background: color, color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
          {monthDef.completeCTA}
        </button>

        {/* Download & Submit */}
        <div style={{ background: "#F4F6F9", border: "1px solid #D1D9E0", borderRadius: 12, padding: 18, marginTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#18252D", marginBottom: 4 }}>📎 Submit Your Month {activeMonth} Report</div>
          <div style={{ fontSize: 11, color: "#757584", lineHeight: 1.6, marginBottom: 14 }}>Download your report as a .txt file, then upload it to SharePoint to officially submit.</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => downloadMonthReport(activeMonth)}
              style={{ flex: 1, minWidth: 160, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 18px", borderRadius: 8, border: `2px solid ${color}`, background: "#fff", color, fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
              ⬇ Download Month {activeMonth} Report
            </button>
            <a
              href="https://hubinternational4.sharepoint.com/:f:/s/SFD/IgCPZzO4ALHQQLDsfKGnoFRbAZguRqdyUxn4-S2kZeUlp1o?e=0iuikc"
              target="_blank"
              rel="noreferrer"
              style={{ flex: 1, minWidth: 160, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 18px", borderRadius: 8, border: "none", background: "#0678D5", color: "#fff", fontWeight: 800, fontSize: 12, textDecoration: "none" }}>
              ☁ Upload to SharePoint →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}