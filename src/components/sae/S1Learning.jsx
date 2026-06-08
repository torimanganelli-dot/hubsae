import React, { useState } from "react";

const SECTIONS = [
  { id: "hook", lbl: "The Wake-Up Call", icon: "⚡" },
  { id: "mindset", lbl: "The Mental Model", icon: "🧠" },
  { id: "framework", lbl: "The SAE Framework", icon: "🗺️" },
  { id: "sprint", lbl: "Sprint 1 Deliverables", icon: "🎯" },
  { id: "rhythm", lbl: "Weekly Rhythm", icon: "🔁" },
  { id: "claude", lbl: "Claude as Your Assistant", icon: "🤖" },
];

const PROMPTS = [
  "I'm going to share details on one of my top accounts. Help me identify the most likely expansion opportunities, risks I should be monitoring, and the questions I should be asking in my next conversation.",
  "Here's my expansion strategy for [Account]. Challenge my assumptions. Where could this go wrong? What am I not seeing? What would make this more compelling to the client?",
  "Act as my strategic account coach. Ask me the 5 questions I need to answer about my book of business this week to make sure I'm not missing any expansion opportunities.",
];

export default function S1Learning() {
  const [active, setActive] = useState("hook");
  const [copied, setCopied] = useState(null);

  const copyPrompt = (i) => {
    navigator.clipboard.writeText(PROMPTS[i]).catch(() => {});
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ background: "#030712", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg,#2e1065 0%,#111827 60%,#030712 100%)", borderBottom: "1px solid rgba(139,92,246,.3)", padding: "24px 28px" }}>
        <div style={{ display: "inline-block", background: "rgba(139,92,246,.15)", border: "1px solid rgba(139,92,246,.3)", color: "#c4b5fd", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 99, marginBottom: 12 }}>Sprint 1 · Account Expansion</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 6 }}>See What Others Miss</div>
        <div style={{ fontSize: 12, color: "#9ca3af" }}>Most revenue is lost before the conversation starts. This sprint installs the discipline to change that — permanently.</div>
      </div>
      <div style={{ background: "rgba(17,24,39,.97)", borderBottom: "1px solid #1f2937", padding: "0 18px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", gap: 2, overflowX: "auto", padding: "8px 0" }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer", background: active === s.id ? "#7c3aed" : "transparent", color: active === s.id ? "#fff" : "#6b7280" }}>
              {s.icon} {s.lbl}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: 28, flex: 1, maxWidth: 760, margin: "0 auto", width: "100%" }}>
        {active === "hook" && <HookSection onNext={() => setActive("mindset")} />}
        {active === "mindset" && <MindsetSection onNext={() => setActive("framework")} />}
        {active === "framework" && <FrameworkSection onNext={() => setActive("sprint")} />}
        {active === "sprint" && <SprintSection onNext={() => setActive("rhythm")} />}
        {active === "rhythm" && <RhythmSection onNext={() => setActive("claude")} />}
        {active === "claude" && <ClaudeSection prompts={PROMPTS} copied={copied} onCopy={copyPrompt} onRestart={() => setActive("hook")} />}
      </div>
    </div>
  );
}

function NavBtn({ label, onClick }) {
  return <button onClick={onClick} style={{ width: "100%", background: "#7c3aed", color: "#fff", border: "none", padding: 14, borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: 8 }}>{label}</button>;
}

function HookSection({ onNext }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: 28 }}>
        <p style={{ fontSize: 18, fontWeight: 300, color: "#f3f4f6", lineHeight: 1.7, margin: "0 0 20px" }}>"Most revenue is lost before the conversation starts — because the advisor never saw the opportunity."</p>
        <div style={{ height: 1, background: "linear-gradient(90deg,#7c3aed,transparent)", marginBottom: 20 }} />
        <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7, margin: 0 }}>Think about your book right now. How many of your top accounts have needs you haven't uncovered yet? How many have grown in ways your solution hasn't caught up to? How many have handed business to a competitor — not because they preferred them, but because <strong style={{ color: "#fff" }}>you weren't there with the right conversation at the right time?</strong></p>
      </div>
      {[["70%", "of expansion revenue comes from existing accounts — when they're actively managed."], ["3x", "more likely a client expands when their SAE meets with them proactively vs. reactively."], ["1 in 4", "accounts has an active expansion opportunity right now that isn't in your CRM."]].map(([v, l]) => (
        <div key={v} style={{ display: "flex", alignItems: "center", gap: 20, background: "#111827", border: "1px solid #1f2937", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#8b5cf6", flexShrink: 0 }}>{v}</div>
          <p style={{ fontSize: 13, color: "#d1d5db", margin: 0 }}>{l}</p>
        </div>
      ))}
      <div style={{ background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.3)", borderRadius: 12, padding: 20 }}>
        <p style={{ fontWeight: 700, color: "#c4b5fd", margin: "0 0 8px" }}>The Bottom Line</p>
        <p style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.7, margin: 0 }}>Account expansion is not a function of convincing clients to buy more. It's a function of <strong style={{ color: "#fff" }}>knowing your client's business well enough to spot risks, gaps, and growth triggers they haven't named yet</strong>.</p>
      </div>
      <NavBtn label="Start Learning → The Mental Model" onClick={onNext} />
    </div>
  );
}

function MindsetSection({ onNext }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>The SAE Mental Model</div>
      <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>The best Strategic Account Executives carry a living picture of every A and B account — updated weekly.</p>
      <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: 24 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: "0 0 16px" }}>They walk into each week knowing:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[["Where is each account in its growth cycle?", "Are they scaling, steady-state, or contracting?"], ["What's changing in their business or industry?", "New hires, new leadership, new competitive threats, new regulations."], ["Where am I single-threaded?", "One contact = one point of failure. Who else should know me?"], ["What's going around me?", "What solutions are they getting elsewhere that I should own?"], ["What's the next dollar — and what's my plan to get it?", "Not a hope. A documented strategy with a named next step."]].map(([q, a], i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: 14, background: "rgba(255,255,255,.03)", borderRadius: 10 }}>
              <div style={{ color: "#8b5cf6", fontWeight: 800, fontSize: 12, flexShrink: 0, marginTop: 2 }}>{i + 1}.</div>
              <div><p style={{ color: "#fff", fontWeight: 600, fontSize: 13, margin: "0 0 4px" }}>{q}</p><p style={{ color: "#9ca3af", fontSize: 12, margin: 0 }}>{a}</p></div>
            </div>
          ))}
        </div>
      </div>
      <NavBtn label="Next → The SAE Framework" onClick={onNext} />
    </div>
  );
}

function FrameworkSection({ onNext }) {
  const questions = [
    { num: "01", col: "#8b5cf6", bg: "rgba(76,29,149,.15)", bd: "rgba(109,40,217,.3)", badge: "Growth Trigger", q: "Has this client grown, changed, or restructured in the last 12 months?", d: "New locations, headcount changes, acquisitions, new products.", p: "Is their current program built for the company they are today?" },
    { num: "02", col: "#60a5fa", bg: "rgba(29,78,216,.12)", bd: "rgba(59,130,246,.3)", badge: "Coverage Gap", q: "Is there a line of coverage they don't carry that their peers typically do?", d: "Cyber, EPLI, umbrella limits, professional liability.", p: "Would I be able to explain why it wasn't on the program if that gap triggered a claim tomorrow?" },
    { num: "03", col: "#fb923c", bg: "rgba(124,45,18,.15)", bd: "rgba(234,88,12,.3)", badge: "Risk Signal", q: "Is there an operational exposure I haven't formally addressed?", d: "Supply chain, workforce classification, contractual liability.", p: "Have I had a conversation this year about how their operations have changed?" },
    { num: "04", col: "#34d399", bg: "rgba(6,78,59,.15)", bd: "rgba(16,185,129,.3)", badge: "Financial Trigger", q: "Did their loss ratio, mod factor, or premium movement tell me something I haven't acted on?", d: "The numbers in front of you are a story. Most AEs see the data and miss the dialogue.", p: "Have I told them that story — or just handed them a renewal?" },
    { num: "05", col: "#f472b6", bg: "rgba(131,24,67,.12)", bd: "rgba(236,72,153,.3)", badge: "Relationship Gap", q: "Am I only talking to one person at this account?", d: "Single-threaded accounts are one resignation away from being lost.", p: "If my main contact left tomorrow, who at this account would go to bat for me?" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>Start Here: What Do You Actually Know?</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {questions.map(q => (
          <div key={q.num} style={{ border: `1px solid ${q.bd}`, borderRadius: 14, overflow: "hidden", background: q.bg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px 8px" }}>
              <span style={{ fontSize: 22, fontWeight: 900, opacity: .25, color: q.col }}>{q.num}</span>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: q.col }}>{q.badge}</span>
            </div>
            <div style={{ padding: "0 18px 16px" }}>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: 13, margin: "0 0 8px" }}>{q.q}</p>
              <p style={{ color: "#d1d5db", fontSize: 12, lineHeight: 1.6, margin: "0 0 10px" }}>{q.d}</p>
              <div style={{ background: "rgba(0,0,0,.2)", borderRadius: 8, padding: "10px 12px", border: "1px solid rgba(255,255,255,.04)" }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".06em", margin: "0 0 4px" }}>Ask Yourself</p>
                <p style={{ fontSize: 12, color: "#d1d5db", fontStyle: "italic", margin: 0 }}>"{q.p}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <NavBtn label="Next → Sprint 1 Deliverables" onClick={onNext} />
    </div>
  );
}

function SprintSection({ onNext }) {
  const deliverables = [
    { num: "01", g: "linear-gradient(135deg,#6d28d9,#4c1d95)", t: "Account Segmentation", d: "Account segmentation organizes your book of business into tiers — typically A, B, and C — based on revenue potential, complexity, and growth opportunity, allowing you to align your time and resources with the accounts that drive the most value." },
    { num: "02", g: "linear-gradient(135deg,#1d4ed8,#1e3a8a)", t: "3 Actionable Strategies", d: "Not ideas. Documented plays — with a named contact, a specific trigger, a value narrative, and a next step on the calendar." },
    { num: "03", g: "linear-gradient(135deg,#059669,#064e3b)", t: "A Repeatable Weekly Scan", d: "A 30-minute ritual you run every Monday. Your book is always live. Opportunities never go stale in your blind spot." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>Your Sprint 1 Deliverables</div>
      {deliverables.map(d => (
        <div key={d.num} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ background: d.g, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "rgba(255,255,255,.15)" }}>{d.num}</span>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{d.t}</span>
          </div>
          <div style={{ padding: 18 }}>
            <p style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.7, margin: 0 }}>{d.d}</p>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "rgba(124,58,237,.08)", border: "1px solid rgba(109,40,217,.3)", borderRadius: 12, padding: "14px 16px" }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>🤖</span>
        <p style={{ fontSize: 12, color: "#c4b5fd", margin: 0, lineHeight: 1.6 }}>Claude can help you execute all three deliverables. See the last tab — <strong style={{ color: "#a78bfa" }}>Claude as Your Assistant</strong> — for ready-to-use prompts.</p>
      </div>
      <NavBtn label="Next → Your Weekly Rhythm" onClick={onNext} />
    </div>
  );
}

function RhythmSection({ onNext }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>The 30-Minute Monday Scan</div>
      <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>Block it. Protect it. It's the difference between managing a book and growing one.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[["Min 0–5", "Account Pulse Check", "Review your A and B accounts. Any news, changes, or flags since last week?"], ["Min 5–15", "Signal Scan", "Check LinkedIn, news alerts, and CRM notes. Look for growth triggers, risk signals, and relationship gaps."], ["Min 15–25", "Strategy Review", "Are your 3 documented strategies still current? What moved? What needs a new approach?"], ["Min 25–30", "Commit to This Week's Move", "Name the one account action you will take before Friday. Put it on the calendar now."]].map(([t, ti, d]) => (
          <div key={t} style={{ display: "flex", gap: 14, background: "#111827", border: "1px solid #1f2937", borderRadius: 12, padding: 16 }}>
            <div style={{ flexShrink: 0 }}><span style={{ fontSize: 10, fontWeight: 700, color: "#8b5cf6", background: "rgba(76,29,149,.25)", border: "1px solid rgba(109,40,217,.3)", padding: "4px 8px", borderRadius: 6 }}>{t}</span></div>
            <div><p style={{ color: "#fff", fontWeight: 600, fontSize: 13, margin: "0 0 4px" }}>{ti}</p><p style={{ color: "#9ca3af", fontSize: 12, margin: 0 }}>{d}</p></div>
          </div>
        ))}
      </div>
      <NavBtn label="Next → Claude as Your Assistant" onClick={onNext} />
    </div>
  );
}

function ClaudeSection({ prompts, copied, onCopy, onRestart }) {
  const uses = ["Build your opportunity map", "Stress-test a strategy", "Run your weekly scan"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>Claude as Your Strategic Assistant</div>
      {prompts.map((tpl, i) => (
        <div key={i} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: 20 }}>
          <p style={{ color: "#a78bfa", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em", margin: "0 0 12px" }}>Use Claude to: {uses[i]}</p>
          <div style={{ background: "#1f2937", borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <p style={{ fontSize: 12, color: "#d1d5db", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>"{tpl}"</p>
          </div>
          <button onClick={() => onCopy(i)} style={{ fontSize: 11, fontWeight: 600, color: "#8b5cf6", background: "transparent", border: "1px solid rgba(109,40,217,.4)", padding: "6px 14px", borderRadius: 8, cursor: "pointer" }}>{copied === i ? "✓ Copied!" : "Copy Prompt"}</button>
        </div>
      ))}
      <div style={{ background: "linear-gradient(135deg,rgba(76,29,149,.3),#111827)", border: "1px solid rgba(109,40,217,.3)", borderRadius: 16, padding: 28, textAlign: "center" }}>
        <p style={{ fontSize: 18, fontWeight: 900, color: "#fff", margin: "0 0 10px" }}>You're Ready to Start Sprint 1</p>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 20px" }}>Open Claude. Pick your top 10 accounts. Start building your opportunity map.</p>
        <button onClick={onRestart} style={{ background: "#7c3aed", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>🔁 Review from the Start</button>
      </div>
    </div>
  );
}