import React, { useState } from "react";

const SECTIONS = [
  { id: "hook", lbl: "The Wake-Up Call", icon: "⚡" },
  { id: "signals", lbl: "The 6 Signal Types", icon: "📡" },
  { id: "casefile", lbl: "Case File: Meridian", icon: "🗂️" },
  { id: "framework", lbl: "The Cross-Sell Framework", icon: "🗺️" },
  { id: "sprint", lbl: "Sprint 4 Deliverables", icon: "🎯" },
  { id: "claude", lbl: "Claude as Your Assistant", icon: "🤖" },
];

const PROMPTS = [
  "Here are my notes from a recent client conversation: [PASTE NOTES]. Analyze for cross-sell signals. Categorize each as growth, workforce, technology, contractual, financial, or claims — and tell me which ones are most actionable right now.",
  "I need to bring a [CYBER/EPLI/FINANCIAL LINES] specialist into a meeting with [INDUSTRY] client. Context: [WHAT YOU KNOW]. Build me a one-page brief: what the opportunity is, what to say, and what NOT to do.",
  "My client just said: '[SPECIFIC OBJECTION]'. I was exploring [LINE OF COVERAGE]. Give me a diagnostic response that explores the objection rather than defending the recommendation.",
];

const SIGNAL_TYPES = [
  { col: "#f0d060", bg: "rgba(42,32,0,.6)", bd: "rgba(240,208,96,.3)", label: "Growth", icon: "📈", desc: "Headcount growth, new locations, acquisitions, revenue milestones. A business that's growing has outgrown its current program." },
  { col: "#60c0f0", bg: "rgba(0,32,48,.6)", bd: "rgba(96,192,240,.3)", label: "Workforce", icon: "👥", desc: "New hires in sensitive roles, contractor changes, workforce restructuring, HR policy shifts. People changes create new liability exposures." },
  { col: "#a060f0", bg: "rgba(32,10,48,.6)", bd: "rgba(160,96,240,.3)", label: "Technology", icon: "💻", desc: "New software systems, cloud migrations, data handling changes, cybersecurity events at peers. Tech evolution creates new attack surfaces." },
  { col: "#f09040", bg: "rgba(48,16,0,.6)", bd: "rgba(240,144,64,.3)", label: "Contractual", icon: "📋", desc: "New client contracts, vendor agreements, certificate requests, compliance requirements. New contracts mean new indemnification exposure." },
  { col: "#60f090", bg: "rgba(0,48,32,.6)", bd: "rgba(96,240,144,.3)", label: "Financial", icon: "💰", desc: "Revenue changes, audit flags, D&O triggers, banking covenant changes. Financial stress or growth both signal coverage gaps." },
  { col: "#f06060", bg: "rgba(48,0,0,.6)", bd: "rgba(240,96,96,.3)", label: "Claims", icon: "⚠️", desc: "Near-misses, incidents that didn't become claims, frequency spikes in a line. The claim they almost had is often the cross-sell opening." },
];

const MERIDIAN_EVIDENCE = [
  {
    icon: "📧", type: "Email Thread", title: "Sarah Chen → Operations Team",
    body: `Sarah Chen wrote:\n"Team — heads up that we're finalizing the acquisition of Coastal Logistics next month. IT integration starts Q2. Make sure your teams are prepped for the system migration. Legal is still working through the liability transfer docs."\n\nMarketing Director replied:\n"Got it. Should we loop in HR? We're adding about 40 employees from their team and I know some have different benefit structures."\n\nSarah Chen: "Yes — and remind me to talk to our broker about whether we need to update anything. Last thing I need is a gap during the integration."`,
    signals: ["growth", "technology", "workforce", "contractual"]
  },
  {
    icon: "📰", type: "Industry News", title: "Regional Business Journal — Meridian Group",
    body: `Meridian Group, a $28M regional logistics firm, announced this week it has secured a $4.2M contract with a national retail chain to manage their last-mile delivery operations in three new markets.\n\nCEO David Park said the contract represents a "significant step in our expansion strategy" and noted the company plans to add 55 drivers and two regional operations managers over the next six months.\n\nThe contract includes a performance guarantee clause and SLA requirements that are new to Meridian's standard operating model.`,
    signals: ["growth", "workforce", "contractual"]
  },
  {
    icon: "☎️", type: "Call Notes", title: "Your Notes — Quarterly Check-In",
    body: `Spoke with CFO Mike Torres for 25 min.\n\nHe mentioned offhand that they had a "near miss" last quarter — a driver was in an accident and there was a question about whether the vehicle was on a personal policy or commercial. "We got lucky," he said. "Could have been a real problem."\n\nAlso mentioned they're switching from their legacy TMS to a new cloud-based system in April. "Our IT guy says the old one is basically obsolete. New one has way more data."\n\nAsked about their P&L — he said they're up 18% YoY and margins are improving. "The bank's happy," he said. Then paused: "Board is talking about whether we need D&O now that we have outside investors."`,
    signals: ["claims", "technology", "financial"]
  },
  {
    icon: "📋", type: "Certificate Request", title: "Inbound — Meridian Group",
    body: `From: ops@meridianlogistics.com\nTo: [Your email]\nSubject: COI Request — New Vendor Agreement\n\nHi — we need a certificate of insurance for a new vendor partnership we're finalizing. They're requiring:\n• $2M General Liability (we currently carry $1M)\n• $1M Professional Liability (we don't think we have this?)\n• Cyber liability endorsement confirmation\n\nCan you check what we have and let us know if we're covered? They need the cert by Friday.\n\nThanks,\nOperations`,
    signals: ["contractual", "technology"]
  },
];

export default function S4Learning() {
  const [active, setActive] = useState("hook");
  const [copied, setCopied] = useState(null);

  const copyPrompt = (i) => {
    navigator.clipboard.writeText(PROMPTS[i]).catch(() => {});
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ background: "#030712", minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg,#064e3b 0%,#111827 60%,#030712 100%)", borderBottom: "1px solid rgba(52,211,153,.3)", padding: "24px 28px" }}>
        <div style={{ display: "inline-block", background: "rgba(52,211,153,.15)", border: "1px solid rgba(52,211,153,.3)", color: "#6ee7b7", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 99, marginBottom: 12 }}>Sprint 4 · Cross-Sell Execution</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 6 }}>Grow the Account. Without Starting Over.</div>
        <div style={{ fontSize: 12, color: "#9ca3af" }}>The signals are already there. You just have to know how to read them — and what to do the moment you do.</div>
      </div>
      <div style={{ background: "rgba(17,24,39,.97)", borderBottom: "1px solid #1f2937", padding: "0 18px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", gap: 2, overflowX: "auto", padding: "8px 0" }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer", background: active === s.id ? "#059669" : "transparent", color: active === s.id ? "#fff" : "#6b7280" }}>
              {s.icon} {s.lbl}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: 28, flex: 1, maxWidth: 760, margin: "0 auto", width: "100%" }}>
        {active === "hook" && <HookSection onNext={() => setActive("signals")} />}
        {active === "signals" && <SignalsSection onNext={() => setActive("casefile")} />}
        {active === "casefile" && <CaseFileSection onNext={() => setActive("framework")} />}
        {active === "framework" && <FrameworkSection onNext={() => setActive("sprint")} />}
        {active === "sprint" && <SprintSection onNext={() => setActive("claude")} />}
        {active === "claude" && <ClaudeSection prompts={PROMPTS} copied={copied} onCopy={copyPrompt} onRestart={() => setActive("hook")} />}
      </div>
    </div>
  );
}

function NavBtn({ label, onClick }) {
  return <button onClick={onClick} style={{ width: "100%", background: "#059669", color: "#fff", border: "none", padding: 14, borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: 8 }}>{label}</button>;
}

function HookSection({ onNext }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: 28 }}>
        <p style={{ fontSize: 18, fontWeight: 300, color: "#f3f4f6", lineHeight: 1.7, margin: "0 0 20px" }}>"Every client sends signals. Most advisors walk right past them."</p>
        <div style={{ height: 1, background: "linear-gradient(90deg,#059669,transparent)", marginBottom: 20 }} />
        <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7, margin: 0 }}>Cross-selling fails when advisors treat it as a product pitch. It works when it's the natural conclusion of actually paying attention. Your clients are constantly telling you what they need — through conversations, news alerts, certificate requests, near-miss incidents. The gap isn't opportunity. <strong style={{ color: "#fff" }}>The gap is awareness.</strong></p>
      </div>
      {[["68%", "of cross-sell opportunities are surfaced from signals the advisor already had — but didn't act on."], ["2.4x", "more likely a client buys a second line when the opening comes from something they said, not something you pitched."], ["1 in 3", "certificate requests contains an implicit cross-sell signal that most advisors treat as paperwork."]].map(([v, l]) => (
        <div key={v} style={{ display: "flex", alignItems: "center", gap: 20, background: "#111827", border: "1px solid #1f2937", borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#34d399", flexShrink: 0 }}>{v}</div>
          <p style={{ fontSize: 13, color: "#d1d5db", margin: 0 }}>{l}</p>
        </div>
      ))}
      <div style={{ background: "rgba(5,150,105,.1)", border: "1px solid rgba(5,150,105,.3)", borderRadius: 12, padding: 20 }}>
        <p style={{ fontWeight: 700, color: "#6ee7b7", margin: "0 0 8px" }}>The Shift</p>
        <p style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.7, margin: 0 }}>Stop asking "what else can I sell them?" Start asking <strong style={{ color: "#fff" }}>"what are they telling me they need — and how quickly am I hearing it?"</strong> Signal literacy is a skill. This sprint builds it.</p>
      </div>
      <NavBtn label="Next → The 6 Signal Types" onClick={onNext} />
    </div>
  );
}

function SignalsSection({ onNext }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>The 6 Cross-Sell Signal Types</div>
      <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>Every signal fits one of six categories. Train yourself to recognize them in real-time — in conversations, news, email threads, and renewal reviews.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {SIGNAL_TYPES.map(s => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.bd}`, borderRadius: 14, padding: "16px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: s.col, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>{s.label}</div>
              <p style={{ fontSize: 13, color: "#d1d5db", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(5,150,105,.1)", border: "1px solid rgba(5,150,105,.3)", borderRadius: 12, padding: 20 }}>
        <p style={{ fontWeight: 700, color: "#6ee7b7", margin: "0 0 8px" }}>The Discipline</p>
        <p style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.7, margin: 0 }}>A signal only becomes an opportunity when you act on it. The best cross-sellers don't wait for the annual review — they have a system that catches signals the moment they surface.</p>
      </div>
      <NavBtn label="Next → Case File: Meridian Group" onClick={onNext} />
    </div>
  );
}

function CaseFileSection({ onNext }) {
  const [open, setOpen] = useState(null);
  const [tagged, setTagged] = useState({});

  const toggle = (i) => setOpen(open === i ? null : i);
  const tagSignal = (cardIdx, sig) => {
    setTagged(prev => {
      const card = prev[cardIdx] || [];
      if (card.includes(sig)) return { ...prev, [cardIdx]: card.filter(s => s !== sig) };
      return { ...prev, [cardIdx]: [...card, sig] };
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>Case File: Meridian Group</div>
      <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>Read each piece of client evidence below. Identify the cross-sell signals hidden in each one. Click to reveal the answers after you've made your assessment.</p>
      <div style={{ background: "rgba(5,150,105,.08)", border: "1px solid rgba(5,150,105,.2)", borderRadius: 10, padding: 14 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#6ee7b7", textTransform: "uppercase", letterSpacing: ".08em", margin: "0 0 4px" }}>Your Task</p>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>Read each document. Before you reveal the answers, ask yourself: what signal type is this? What coverage conversation does it open?</p>
      </div>
      {MERIDIAN_EVIDENCE.map((ev, i) => (
        <div key={i} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 14, overflow: "hidden" }}>
          <button onClick={() => toggle(i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", textAlign: "left" }}>
            <div style={{ fontSize: 22, flexShrink: 0 }}>{ev.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 2 }}>{ev.type}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f3f4f6" }}>{ev.title}</div>
            </div>
            <div style={{ fontSize: 12, color: "#4b5563" }}>{open === i ? "▲" : "▼"}</div>
          </button>
          {open === i && (
            <div style={{ padding: "0 20px 20px", borderTop: "1px solid #1f2937" }}>
              <div style={{ background: "#0a0f1a", borderRadius: 10, padding: 16, margin: "16px 0", fontFamily: "monospace", fontSize: 12, color: "#9ca3af", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{ev.body}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#6ee7b7", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Which signals do you see? (tap to tag)</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                {SIGNAL_TYPES.map(s => {
                  const isCorrect = ev.signals.includes(s.label.toLowerCase());
                  const isTagged = (tagged[i] || []).includes(s.label.toLowerCase());
                  return (
                    <button key={s.label} onClick={() => tagSignal(i, s.label.toLowerCase())} style={{
                      padding: "6px 14px", borderRadius: 6, border: `1px solid ${isTagged ? s.col : "rgba(255,255,255,.1)"}`,
                      background: isTagged ? s.bg : "transparent", color: isTagged ? s.col : "#6b7280",
                      fontSize: 11, fontWeight: 700, cursor: "pointer", textTransform: "uppercase", letterSpacing: ".06em"
                    }}>{s.icon} {s.label}</button>
                  );
                })}
              </div>
              <div style={{ background: "rgba(5,150,105,.1)", border: "1px solid rgba(5,150,105,.25)", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6ee7b7", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Answer Key</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {ev.signals.map(sig => {
                    const type = SIGNAL_TYPES.find(s => s.label.toLowerCase() === sig);
                    return (
                      <span key={sig} style={{ padding: "4px 12px", borderRadius: 6, background: type?.bg, border: `1px solid ${type?.bd}`, color: type?.col, fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
                        {type?.icon} {type?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <NavBtn label="Next → The Cross-Sell Framework" onClick={onNext} />
    </div>
  );
}

function FrameworkSection({ onNext }) {
  const steps = [
    { num: "01", col: "#34d399", bg: "rgba(6,78,59,.15)", bd: "rgba(16,185,129,.3)", t: "Signal Audit", d: "Scan your top accounts for the 6 signal types. Don't go from memory — pull notes, emails, and cert requests. You'll find signals you missed." },
    { num: "02", col: "#60a5fa", bg: "rgba(29,78,216,.12)", bd: "rgba(59,130,246,.3)", t: "Score by Urgency & Receptivity", d: "Not all signals are equal. Score each one: How urgent is the underlying risk? How receptive is this client to a conversation right now? Stack your list accordingly." },
    { num: "03", col: "#f472b6", bg: "rgba(131,24,67,.12)", bd: "rgba(236,72,153,.3)", t: "Build the Brief", d: "Before you bring in a specialist — or have the conversation yourself — build a one-page brief. What's the signal, what's the coverage gap, what's the opening question, and what NOT to do in the meeting." },
    { num: "04", col: "#fb923c", bg: "rgba(124,45,18,.15)", bd: "rgba(234,88,12,.3)", t: "Open With the Signal, Not the Product", d: "The three-part entry point: reference their specific signal, connect it to a business risk, ask a diagnostic question. Never lead with the line of coverage you're recommending." },
    { num: "05", col: "#a78bfa", bg: "rgba(76,29,149,.15)", bd: "rgba(109,40,217,.3)", t: "Run the Diagnostic, Then Recommend", d: "Use what you learned in Sprint 2. The cross-sell conversation is a diagnostic conversation — it just starts from a different entry point. Your job is to surface the problem before you name the solution." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>The Cross-Sell Framework</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {steps.map(s => (
          <div key={s.num} style={{ border: `1px solid ${s.bd}`, borderRadius: 14, overflow: "hidden", background: s.bg }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px 8px" }}>
              <span style={{ fontSize: 22, fontWeight: 900, opacity: .25, color: s.col }}>{s.num}</span>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: s.col }}>{s.t}</span>
            </div>
            <div style={{ padding: "0 18px 16px" }}>
              <p style={{ color: "#d1d5db", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{s.d}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "#1c1300", borderLeft: "4px solid #eab308", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
        <strong style={{ display: "block", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, color: "#facc15" }}>The Three-Part Entry Point</strong>
        <p style={{ margin: 0, fontSize: ".92rem", color: "#cbd5e1", lineHeight: 1.7 }}>
          <strong style={{ color: "#fde047" }}>1. Name the signal</strong> — "When we spoke last month, you mentioned you were adding 40 people from the Coastal acquisition."<br />
          <strong style={{ color: "#fde047" }}>2. Connect to risk</strong> — "That kind of workforce integration typically creates some gaps in coverage that aren't obvious until something happens."<br />
          <strong style={{ color: "#fde047" }}>3. Ask diagnostic question</strong> — "Have you thought through what the benefit structure looks like for the combined team — and whether your current program covers it?"
        </p>
      </div>
      <NavBtn label="Next → Sprint 4 Deliverables" onClick={onNext} />
    </div>
  );
}

function SprintSection({ onNext }) {
  const deliverables = [
    { num: "01", g: "linear-gradient(135deg,#065f46,#064e3b)", t: "Cross-Sell Signal Map", d: "A documented audit of your top 8 accounts — with at least one signal per account, categorized and scored by urgency, receptivity, and revenue potential.", a: "Use the Case File approach. Pull your notes, emails, and cert requests. The signals are already there." },
    { num: "02", g: "linear-gradient(135deg,#1d4ed8,#1e3a8a)", t: "Cross-Sell Briefs", d: "For your top 2–3 action accounts: a one-page brief covering the signal, the coverage gap, the opening question, and what NOT to do. Bring this to every specialist briefing.", a: "Use Claude to build your briefs. Paste in your notes and let it help you structure the opportunity and the boundaries." },
    { num: "03", g: "linear-gradient(135deg,#9d174d,#831843)", t: "2 Cross-Sell Conversations", d: "Execute two conversations using the three-part entry point. Start with the signal — not the product. Reach the diagnostic layer before you name a line of coverage.", a: "Use Hyperbound to rehearse before you go live. The entry point is the hardest part to execute under pressure." },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>Your Sprint 4 Deliverables</div>
      {deliverables.map(d => (
        <div key={d.num} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ background: d.g, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "rgba(255,255,255,.15)" }}>{d.num}</span>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{d.t}</span>
          </div>
          <div style={{ padding: 18 }}>
            <p style={{ fontSize: 13, color: "#d1d5db", lineHeight: 1.7, margin: "0 0 12px" }}>{d.d}</p>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "10px 12px" }}>
              <span>🤖</span><p style={{ fontSize: 12, color: "#6ee7b7", margin: 0 }}>{d.a}</p>
            </div>
          </div>
        </div>
      ))}
      <NavBtn label="Next → Claude as Your Assistant" onClick={onNext} />
    </div>
  );
}

function ClaudeSection({ prompts, copied, onCopy, onRestart }) {
  const uses = ["Surface signals from client notes", "Build a specialist brief", "Handle cross-sell objections"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>Claude as Your Strategic Assistant</div>
      {prompts.map((tpl, i) => (
        <div key={i} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: 20 }}>
          <p style={{ color: "#6ee7b7", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em", margin: "0 0 12px" }}>Use Claude to: {uses[i]}</p>
          <div style={{ background: "#1f2937", borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <p style={{ fontSize: 12, color: "#d1d5db", lineHeight: 1.7, fontStyle: "italic", margin: 0 }}>"{tpl}"</p>
          </div>
          <button onClick={() => onCopy(i)} style={{ fontSize: 11, fontWeight: 600, color: "#34d399", background: "transparent", border: "1px solid rgba(5,150,105,.4)", padding: "6px 14px", borderRadius: 8, cursor: "pointer" }}>{copied === i ? "✓ Copied!" : "Copy Prompt"}</button>
        </div>
      ))}
      <div style={{ background: "linear-gradient(135deg,rgba(6,78,59,.3),#111827)", border: "1px solid rgba(5,150,105,.3)", borderRadius: 16, padding: 28, textAlign: "center" }}>
        <p style={{ fontSize: 18, fontWeight: 900, color: "#fff", margin: "0 0 10px" }}>You're Ready to Start Sprint 4</p>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 20px" }}>Open the Sprint 4 Claude project. Pull your top 8 accounts. Start your signal audit.</p>
        <button onClick={onRestart} style={{ background: "#059669", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>🔁 Review from the Start</button>
      </div>
    </div>
  );
}