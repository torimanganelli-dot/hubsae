import React, { useState } from "react";

const C5 = "#F3B921"; // Sprint 5 gold

const SECTIONS = [
  { id: "hook", label: "Why Renewals Fail", icon: "⚠️" },
  { id: "audit", label: "90-Day Account Audit", icon: "1" },
  { id: "session", label: "Renewal Strategy Session", icon: "2" },
  { id: "convo", label: "Proactive Conversation", icon: "3" },
  { id: "narrative", label: "Renewal Narrative", icon: "4" },
  { id: "premium", label: "Premium Increase", icon: "5" },
  { id: "sprint", label: "Your Sprint", icon: "🎯" },
  { id: "claude", label: "AI Assistant", icon: "🤖" },
];

export default function S5Learning() {
  const [active, setActive] = useState("hook");

  const sections = {
    hook: <HookSection onNext={() => setActive("audit")} />,
    audit: <AuditSection onNext={() => setActive("session")} />,
    session: <SessionSection onNext={() => setActive("convo")} />,
    convo: <ConvoSection onNext={() => setActive("narrative")} />,
    narrative: <NarrativeSection onNext={() => setActive("premium")} />,
    premium: <PremiumSection onNext={() => setActive("sprint")} />,
    sprint: <SprintSection onNext={() => setActive("claude")} />,
    claude: <ClaudeSection />,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#F4F6F9" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #1a3a5c 0%, #2e6da4 100%)`, padding: "20px 24px 16px", color: "#fff" }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4 }}>Sprint 5 · Learning Module</div>
        <div style={{ fontSize: 17, fontWeight: 900 }}>Renewal Strategy Session</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.75)", marginTop: 2 }}>From the 90-day audit to the premium increase conversation.</div>
      </div>

      {/* Nav tabs */}
      <div style={{ display: "flex", overflowX: "auto", background: "#fff", borderBottom: "1px solid #D1D9E0", padding: "0 8px", gap: 2, flexShrink: 0 }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            padding: "10px 12px", background: "none", border: "none", borderBottom: `3px solid ${active === s.id ? "#2e6da4" : "transparent"}`,
            color: active === s.id ? "#2e6da4" : "#757584", fontWeight: active === s.id ? 800 : 400,
            fontSize: 11, whiteSpace: "nowrap", cursor: "pointer", display: "flex", alignItems: "center", gap: 5
          }}>
            <span>{s.icon}</span>{s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {sections[active]}
      </div>
    </div>
  );
}

function NavBtn({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ marginTop: 24, background: "linear-gradient(135deg,#1a3a5c,#2e6da4)", color: "#fff", border: "none", borderRadius: 8, padding: "11px 22px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
      {label} →
    </button>
  );
}

function Callout({ type = "info", children }) {
  const styles = {
    info: { borderLeft: "4px solid #2e6da4", background: "#f0f6fc", color: "#1a3a5c" },
    warn: { borderLeft: "4px solid #c0392b", background: "#fdf3f2", color: "#7b1f1a" },
    success: { borderLeft: "4px solid #1e8a6e", background: "#f0faf7", color: "#145c4a" },
  };
  return (
    <div style={{ ...styles[type], borderRadius: "0 8px 8px 0", padding: "14px 18px", margin: "16px 0", fontSize: 13, fontStyle: "italic", lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

function Card({ children, style }) {
  return <div style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 10, padding: 16, marginBottom: 10, ...style }}>{children}</div>;
}

function ScriptBox({ children }) {
  return (
    <div style={{ background: "#1e2a38", color: "#e8f0f8", borderRadius: 10, padding: "18px 22px", margin: "16px 0", fontSize: 13, lineHeight: 1.7 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#7ab3d8", marginBottom: 10 }}>💬 Sample Language</div>
      {children}
    </div>
  );
}

function HookSection({ onNext }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: "#1a3a5c", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6 }}>The Core Problem</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: "#18252D", marginBottom: 8 }}>Why Most Renewals Are Already Lost</div>
      <p style={{ fontSize: 13, color: "#4a5a6e", lineHeight: 1.7, marginBottom: 0 }}>Before we run the session, you need to understand the failure mode you're trying to avoid.</p>
      <Callout type="warn">Most renewals are lost 90 days before the renewal date — not at it.</Callout>
      <p style={{ fontSize: 13, color: "#4a5a6e", lineHeight: 1.7, marginBottom: 16 }}>The client got a certificate update in March, a check-in call in July, and a renewal proposal in October. That's not an advisory relationship. That's a service subscription.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: "#fff", border: "1px solid #f0b8b4", borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#c0392b", marginBottom: 8 }}>❌ Transactional AE</div>
          <p style={{ fontSize: 13, color: "#4a5a6e", margin: 0, lineHeight: 1.6 }}>Treats the account like a policy to process. Shows up at renewal hoping goodwill carries the conversation.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #a8d8ca", borderRadius: 10, padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#1e8a6e", marginBottom: 8 }}>✅ Advisory AE</div>
          <p style={{ fontSize: 13, color: "#4a5a6e", margin: 0, lineHeight: 1.6 }}>Runs diagnostics year-round. Accumulates value evidence. Walks into renewal ready to prove their worth.</p>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "#4a5a6e", lineHeight: 1.7 }}>Two things kill retention that have nothing to do with price: the client doesn't feel <strong>understood</strong>, and the client doesn't feel like you're <strong>ahead of them</strong>. Both are fixable. This sprint fixes them.</p>
      <NavBtn label="Phase 1: 90-Day Account Audit" onClick={onNext} />
    </div>
  );
}

function AuditSection({ onNext }) {
  const [checked, setChecked] = useState([false, false, false, false]);
  const dims = [
    { icon: "🤝", title: "Relationship Health", desc: "Contacts, decision-makers, ownership changes, friction points, communication gaps." },
    { icon: "📈", title: "Business Change", desc: "Revenue, headcount, locations, contracts, technology — what's different since last renewal?" },
    { icon: "🛡️", title: "Coverage & Risk Position", desc: "Has the program kept pace? Any gaps or exposures opened during the policy year?" },
    { icon: "💡", title: "Value Evidence", desc: "What have you done in the last 12 months? Claims handled, risk identified, cost savings." },
  ];
  const toggle = (i) => setChecked(c => c.map((v, j) => j === i ? !v : v));
  const allDone = checked.every(Boolean);

  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: "#1a3a5c", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6 }}>Phase 1 · 90 Days Out</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: "#18252D", marginBottom: 8 }}>The Account Audit</div>
      <p style={{ fontSize: 13, color: "#4a5a6e", lineHeight: 1.7, marginBottom: 16 }}>Before entering any renewal conversation, build your strategic picture across all four dimensions. Click each to mark it reviewed.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {dims.map((d, i) => (
          <div key={i} onClick={() => toggle(i)} style={{ background: checked[i] ? "#f6fdf9" : "#fff", border: `1px solid ${checked[i] ? "#1e8a6e" : "#D1D9E0"}`, borderRadius: 10, padding: 16, cursor: "pointer", position: "relative", transition: "all .2s" }}>
            {checked[i] && <div style={{ position: "absolute", top: 10, right: 10, background: "#1e8a6e", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✓</div>}
            <div style={{ fontSize: 22, marginBottom: 8 }}>{d.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a3a5c", marginBottom: 4 }}>{d.title}</div>
            <p style={{ fontSize: 12, color: "#5a6a7e", margin: 0, lineHeight: 1.5 }}>{d.desc}</p>
          </div>
        ))}
      </div>
      {allDone && <Callout type="success">✓ All four dimensions reviewed. You're ready for the internal strategy session.</Callout>}
      <NavBtn label="Phase 2: Renewal Strategy Session" onClick={onNext} />
    </div>
  );
}

function SessionSection({ onNext }) {
  const [checked, setChecked] = useState({});
  const items = [
    { title: "State of the relationship — honestly?", sub: "Don't sugarcoat. What's the real temperature of this account?" },
    { title: "What will the market do?", sub: "Rate environment, claims history, carrier appetite on this account." },
    { title: "What's our renewal narrative?", sub: "What story are we walking in with? Define it before the client does." },
    { title: "Open opportunities from the year?", sub: "What do we want to advance or close at this renewal?" },
    { title: "Who needs to be in the room?", sub: "Specialist, risk services, claims, producer — who's required?" },
    { title: "What's the client's likely concern?", sub: "Price? Coverage? Service? What objection will we face first?" },
    { title: "Our response to each concern?", sub: "Don't let the client surface an objection you haven't already war-gamed." },
    { title: "What does a great outcome look like?", sub: "Define success beyond \"retained.\" Premium growth? New lines? Deeper access?" },
  ];

  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: "#2e6da4", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6 }}>Phase 2 · Internal Meeting</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: "#18252D", marginBottom: 8 }}>The Renewal Strategy Session</div>
      <p style={{ fontSize: 13, color: "#4a5a6e", lineHeight: 1.7, marginBottom: 16 }}>Run this 30-minute internal session before you ever sit down with the client. Work through each agenda item.</p>
      <div>
        {items.map((item, i) => (
          <div key={i} onClick={() => setChecked(c => ({ ...c, [i]: !c[i] }))}
            style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 16px", background: checked[i] ? "#f6fdf9" : "#fff", border: `1px solid ${checked[i] ? "#1e8a6e" : "#D1D9E0"}`, borderRadius: 8, marginBottom: 8, cursor: "pointer" }}>
            <div style={{ width: 22, height: 22, border: `2px solid ${checked[i] ? "#1e8a6e" : "#D1D9E0"}`, borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", background: checked[i] ? "#1e8a6e" : "transparent", marginTop: 1 }}>
              {checked[i] ? "✓" : ""}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a3a5c" }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#6a7a8e", marginTop: 2 }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <NavBtn label="Phase 3: Proactive Conversation" onClick={onNext} />
    </div>
  );
}

function ConvoSection({ onNext }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: "#1e8a6e", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6 }}>Phase 3 · 60–75 Days Out</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: "#18252D", marginBottom: 8 }}>The Proactive Renewal Conversation</div>
      <p style={{ fontSize: 13, color: "#4a5a6e", lineHeight: 1.7, marginBottom: 0 }}>You go first. Always. The client who calls you first is already thinking about alternatives.</p>
      <Callout type="warn">Don't wait for the client to reach out. The proactive call happens 60–75 days before renewal — not at it.</Callout>
      <div style={{ fontSize: 13, fontWeight: 800, color: "#1a3a5c", margin: "20px 0 12px" }}>The Three-Part Opening</div>
      {[
        { n: 1, color: "#1e8a6e", title: "Year in Review", desc: "What happened, what you did, what changed. Be specific and documented." },
        { n: 2, color: "#1e8a6e", title: "Forward Look", desc: "What the market is doing, what you anticipate, what you're planning." },
        { n: 3, color: "#1e8a6e", title: "The Alignment Question", desc: "The most important question in the entire renewal cycle. Ask it before committing to any strategy." },
      ].map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 10, position: "relative" }}>
          {i < 2 && <div style={{ position: "absolute", left: 17, top: 40, width: 2, height: "calc(100% - 4px)", background: "#dde3ec" }} />}
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: s.color, color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", zIndex: 1 }}>{s.n}</div>
          <Card style={{ flex: 1, marginBottom: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a3a5c", marginBottom: 4 }}>{s.title}</div>
            <p style={{ fontSize: 12, color: "#5a6a7e", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
          </Card>
        </div>
      ))}
      <ScriptBox>"Before I share what we're seeing in the market and how we're planning your renewal, I want to make sure I understand what's most important to you going into this. What would make this renewal feel like a win for you?"</ScriptBox>
      <Callout type="success">The answer to that question IS your renewal strategy. Everything you build after it should deliver that outcome.</Callout>
      <NavBtn label="Phase 4: Renewal Narrative" onClick={onNext} />
    </div>
  );
}

function NarrativeSection({ onNext }) {
  const steps = [
    { n: 1, color: "#1a3a5c", title: "The Year in Review", desc: "Claims, service events, risk changes, advisory conversations. Your value evidence assembled into a timeline." },
    { n: 2, color: "#2e6da4", title: "How Their Business Changed", desc: "Connect business changes to coverage implications. Position yourself as someone who was paying attention." },
    { n: 3, color: "#1e8a6e", title: "Market Context", desc: "Be honest and specific. Clients respect directness about market realities far more than vague optimism." },
    { n: 4, color: "#7b3fa8", title: "Our Recommendation", desc: "Outcome first, financial case, brief coverage summary. Lead with what it does for them." },
    { n: 5, color: "#c0392b", title: "What's Next", desc: "Open opportunities and what you'll accomplish together in the next 12 months. The renewal is the beginning of the next cycle — not the end." },
  ];

  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: "#7b3fa8", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6 }}>Phase 4 · Client Meeting</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: "#18252D", marginBottom: 8 }}>The Renewal Narrative</div>
      <p style={{ fontSize: 13, color: "#4a5a6e", lineHeight: 1.7, marginBottom: 16 }}>Don't deliver a proposal. Tell a story. A renewal narrative is a structured account of the year — not a coverage summary.</p>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 10, position: "relative" }}>
          {i < steps.length - 1 && <div style={{ position: "absolute", left: 17, top: 40, width: 2, height: "calc(100% - 4px)", background: "#dde3ec" }} />}
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: s.color, color: "#fff", fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", zIndex: 1 }}>{s.n}</div>
          <Card style={{ flex: 1, marginBottom: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a3a5c", marginBottom: 4 }}>{s.title}</div>
            <p style={{ fontSize: 12, color: "#5a6a7e", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
          </Card>
        </div>
      ))}
      <NavBtn label="Phase 5: Premium Increase" onClick={onNext} />
    </div>
  );
}

function PremiumSection({ onNext }) {
  const moves = [
    { n: 1, title: "Contextualize Before You Reveal", desc: "Don't lead with the number. Lead with market context and the factors driving the increase.", script: '"Before I share the numbers, I want to walk you through what\'s driving them — because the market context matters here."' },
    { n: 2, title: "Connect to Their Own Data", desc: "Loss-driven? Connect to their loss run. Market-driven? Show industry comparisons. The increase should feel explainable, not arbitrary.", script: '"Your loss ratio this year came in at 68% — above the threshold carriers use to trigger rate action. Here\'s what that means for your renewal."' },
    { n: 3, title: "Show What You Did to Mitigate It", desc: "What alternatives did you explore? What did you negotiate? The client needs to see you fought for them.", script: null },
    { n: 4, title: "Reframe Cost as Cost-of-Risk", desc: "Put both numbers on the table — what they're paying and what they're protecting.", script: '"You\'re paying $X more this year. What that buys you is the same transfer of a $Y exposure. In a year where your claims activity increased, that transfer is more valuable — not less."' },
  ];

  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: "#c0392b", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6 }}>Phase 5 · The Hard Conversation</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: "#18252D", marginBottom: 8 }}>The Premium Increase Conversation</div>
      <p style={{ fontSize: 13, color: "#4a5a6e", lineHeight: 1.7, marginBottom: 0 }}>The conversation most AEs dread — and don't prepare for. These four moves separate advisors from order-takers.</p>
      <Callout type="warn">Failure mode: Apologize for the increase, rush to market, position yourself as an order-taker. The account is now in play.</Callout>
      {moves.map((m, i) => (
        <div key={i}>
          <div style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 8, padding: "14px 18px", marginBottom: m.script ? 0 : 10, display: "flex", gap: 14, alignItems: "flex-start", borderBottomLeftRadius: m.script ? 0 : 8, borderBottomRightRadius: m.script ? 0 : 8 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: .5, textTransform: "uppercase", color: "#fff", background: "#c0392b", borderRadius: 4, padding: "3px 8px", flexShrink: 0, marginTop: 2 }}>Move {m.n}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a3a5c", marginBottom: 3 }}>{m.title}</div>
              <p style={{ fontSize: 12, color: "#5a6a7e", margin: 0, lineHeight: 1.5 }}>{m.desc}</p>
            </div>
          </div>
          {m.script && (
            <ScriptBox>{m.script}</ScriptBox>
          )}
        </div>
      ))}
      <NavBtn label="Your Sprint" onClick={onNext} />
    </div>
  );
}

function SprintSection({ onNext }) {
  const deliverables = [
    { icon: "🔍", title: "Select a renewal account (90-day window)", desc: "Pick an A or B account renewing within 90 days." },
    { icon: "📋", title: "Complete the 90-Day Account Audit", desc: "All four dimensions: relationship, business change, coverage, value evidence." },
    { icon: "💰", title: "Build your Value Evidence List", desc: "Specific. What you did, what you prevented, what you saved." },
    { icon: "🧠", title: "Run the Internal Renewal Strategy Session", desc: "30 minutes. Use the agenda in phase 2." },
    { icon: "📞", title: "Execute the Proactive Renewal Conversation", desc: "60–75 days out. Ask the alignment question." },
    { icon: "📄", title: "Build and deliver the Renewal Narrative", desc: "5-part structure. Business language throughout." },
  ];

  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: C5, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6 }}>🎯 Sprint Objective</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: "#18252D", marginBottom: 8 }}>Your Sprint 5 Deliverables</div>
      <div style={{ background: `${C5}12`, border: `1px solid ${C5}30`, borderRadius: 12, padding: 16, marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: "#18252D", lineHeight: 1.7, margin: 0 }}>Complete a 90-Day Account Audit. Execute a Proactive Renewal Conversation. Deliver a Renewal Narrative.</p>
      </div>
      {deliverables.map((d, i) => (
        <div key={i} style={{ display: "flex", gap: 12, padding: "12px 16px", background: "#fff", border: "1px solid #D1D9E0", borderRadius: 8, marginBottom: 8 }}>
          <div style={{ fontSize: 20, flexShrink: 0 }}>{d.icon}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#18252D", marginBottom: 2 }}>{d.title}</div>
            <div style={{ fontSize: 12, color: "#757584", lineHeight: 1.5 }}>{d.desc}</div>
          </div>
        </div>
      ))}
      <NavBtn label="AI Assistant" onClick={onNext} />
    </div>
  );
}

function ClaudeSection() {
  const [copied, setCopied] = useState(null);
  const prompts = [
    { lbl: "Alignment Question Prep", tpl: "I'm going into a proactive renewal conversation with a [TITLE] at a [INDUSTRY] company. What are their most likely concerns? Give me a diagnostic question for each." },
    { lbl: "Premium Increase Script", tpl: "Client facing [X]% premium increase. Drivers: [REASONS]. Build a four-move conversation: context before the number, connection to their data, what I did to mitigate it, cost-of-risk reframe." },
    { lbl: "Renewal Narrative Builder", tpl: "Help me build a renewal narrative. Year in review: [DESCRIPTION]. Business changes: [DESCRIPTION]. Market context: [RATE ENVIRONMENT]." },
  ];

  const copy = (tpl, i) => {
    navigator.clipboard.writeText(tpl);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: "#2e6da4", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 6 }}>🤖 AI Assistant</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: "#18252D", marginBottom: 8 }}>Use Claude to Build Your Renewal</div>
      <p style={{ fontSize: 13, color: "#4a5a6e", lineHeight: 1.7, marginBottom: 16 }}>The Sprint 5 Claude project is pre-loaded with the Renewal Strategy framework, alignment question templates, premium increase scripts, and narrative builders.</p>
      <a href="https://claude.ai/project/019cafcd-9c60-7559-a667-dcd2e1177f89" target="_blank" rel="noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "linear-gradient(135deg,#1a3a5c,#2e6da4)", color: "#fff", padding: "14px 22px", borderRadius: 10, fontWeight: 800, fontSize: 14, textDecoration: "none", marginBottom: 24 }}>
        Open Renewal Strategy Assistant →
      </a>
      <div style={{ fontSize: 12, fontWeight: 800, color: "#18252D", marginBottom: 10, textTransform: "uppercase", letterSpacing: ".06em" }}>Starter Prompts</div>
      {prompts.map((p, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 10, padding: 14, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#1a3a5c" }}>{p.lbl}</div>
            <button onClick={() => copy(p.tpl, i)} style={{ fontSize: 11, color: "#2e6da4", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>
              {copied === i ? "✓ Copied" : "Copy"}
            </button>
          </div>
          <div style={{ fontSize: 12, color: "#757584", lineHeight: 1.6, fontFamily: "monospace", background: "#F4F6F9", borderRadius: 6, padding: "8px 10px" }}>{p.tpl}</div>
        </div>
      ))}
    </div>
  );
}