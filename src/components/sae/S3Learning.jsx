import React, { useState } from "react";

const SECTIONS = [
  { id: "intro", lbl: "Overview", icon: "🏆" },
  { id: "mirror", lbl: "Mirror Back", icon: "🪞" },
  { id: "frame", lbl: "Recommendation Frame", icon: "🎯" },
  { id: "financial", lbl: "Financial Case", icon: "💰" },
  { id: "recommendation", lbl: "The Recommendation", icon: "📋" },
  { id: "decision", lbl: "Decision Conversation", icon: "🤝" },
];

export default function S3Learning() {
  const [active, setActive] = useState("intro");
  const [quizState, setQuizState] = useState({});
  // quizState: { [qid]: { selected, correct } }

  const answer = (qid, optIdx, correct) => {
    if (quizState[qid]) return;
    setQuizState(prev => ({ ...prev, [qid]: { selected: optIdx, correct } }));
  };

  const feedbacks = {
    q1: {
      right: "✅ Correct! Option C mirrors the client's exact words, re-anchors the problem, and asks for confirmation before presenting. This creates a clear bridge between discovery and your solution.",
      wrong: "❌ Not quite. Options A, B, and D all skip the Mirror Back step. They jump straight into features, gaps, or pricing — losing the emotional connection to the client's stated problem."
    },
    q2: {
      right: "✅ Correct! The Mirror Back step is also a real-time diagnostic check. If priorities have shifted, you need to know before you present — not after. Adapt to what's actually top of mind.",
      wrong: "❌ Not quite. Pressing on with a mismatched presentation wastes everyone's time. The mirror isn't just a formality — it's a live check that the problem you're solving still matters."
    },
    q3: {
      right: "✅ Correct! Option B leads with the specific business outcome — protecting the $4M contract — and uses the client's own concern as the frame. That's what makes a recommendation feel tailored, not generic.",
      wrong: "❌ Not quite. Options A, C, and D lead with product specs, pricing, or industry benchmarks. None of them connect to what the client told you they actually care about."
    },
    q4: {
      right: "✅ Correct! Option C builds the financial case in the right sequence: cost of the risk → cost of the solution → the ratio. The daily breakdown ($49/day vs. $500K event) makes the value visceral and easy to grasp.",
      wrong: "❌ Not quite. Options A, B, and D present premium without context. When premium comes first, it always feels like a cost. When it follows the risk exposure, it feels like a bargain."
    },
    q5: {
      right: "✅ Correct! Always start with the Mirror Back — confirm your diagnosis before presenting your solution. Even if nothing has changed, re-anchoring the problem sets up everything that follows.",
      wrong: "❌ Not quite. Jumping to the proposal, leading with price, or asking for referrals before building the case all undermine the strategic logic of the framework."
    },
    q6: {
      right: "✅ Correct! Option B uses the client's own incident as the reference point, making $31K feel like a fraction of the actual exposure. 'Less than one-seventh of last year's incident' is a ratio that sticks.",
      wrong: "❌ Not quite. Market comparisons, vague praise, and raw premium figures all miss the point. The financial case is about their risk, not industry benchmarks."
    },
    q7: {
      right: "✅ Correct! Option C does two things at once: asks for a decision AND surfaces any hidden stakeholders. That second question — about the CFO or ownership — could save you weeks of limbo.",
      wrong: "❌ Not quite. 'Take your time,' 'I'll send a PDF,' and 'What do you think?' are all invitations to delay. A strategic presentation ends with a clear request for direction."
    },
  };

  const QuizOption = ({ qid, optIdx, correct, label }) => {
    const state = quizState[qid];
    const answered = !!state;
    const isSelected = answered && state.selected === optIdx;
    const isCorrectOpt = correct;

    let bg = "#141e35", border = "1.5px solid #1e3a5f", color = "#cbd5e1";
    if (answered) {
      if (isSelected && isCorrectOpt) { bg = "#052e16"; border = "1.5px solid #22c55e"; color = "#4ade80"; }
      else if (isSelected && !isCorrectOpt) { bg = "#2d0a0a"; border = "1.5px solid #ef4444"; color = "#f87171"; }
      else if (!isSelected && isCorrectOpt) { bg = "#052e16"; border = "1.5px solid #22c55e"; color = "#4ade80"; }
      else { bg = "#141e35"; border = "1.5px solid #1e3a5f"; color = "#cbd5e1"; }
    }

    return (
      <button onClick={() => answer(qid, optIdx, isCorrectOpt)} disabled={answered}
        style={{ background: bg, border, borderRadius: 8, padding: "14px 16px", cursor: answered ? "default" : "pointer", fontSize: ".92rem", color, textAlign: "left", width: "100%", marginBottom: 8, opacity: answered && !isSelected && !isCorrectOpt ? .6 : 1 }}>
        {label}
        {isSelected && answered && (
          <div style={{ marginTop: 10, padding: "10px 12px", borderRadius: 6, background: isCorrectOpt ? "rgba(34,197,94,.1)" : "rgba(239,68,68,.1)", fontSize: ".88rem", lineHeight: 1.6 }}>
            {isCorrectOpt ? feedbacks[qid].right : feedbacks[qid].wrong}
          </div>
        )}
      </button>
    );
  };

  const navBtn = (label, to) => (
    <button onClick={() => setActive(to)} style={{ width: "100%", background: "#2563eb", color: "#fff", border: "none", padding: 14, borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: 8 }}>{label}</button>
  );

  return (
    <div style={{ background: "#0f1623", minHeight: "100%", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI',sans-serif", color: "#e2e8f0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#1a2744,#0f2552)", padding: "24px 28px", borderBottom: "2px solid #2563eb", textAlign: "center" }}>
        <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", letterSpacing: ".5px" }}>🏆 Strategic Presentation Framework</div>
        <div style={{ color: "#93c5fd", marginTop: 6, fontSize: ".9rem" }}>Interactive Training for Account Executives</div>
      </div>
      {/* Nav */}
      <div style={{ background: "rgba(17,24,39,.97)", borderBottom: "1px solid #1e3a5f", padding: "0 18px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", gap: 2, overflowX: "auto", padding: "8px 0" }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer", background: active === s.id ? "#2563eb" : "transparent", color: active === s.id ? "#fff" : "#6b7280" }}>
              {s.icon} {s.lbl}
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: "28px 20px", flex: 1, maxWidth: 760, margin: "0 auto", width: "100%" }}>
        {active === "intro" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "inline-block", background: "#1e3a5f", color: "#60a5fa", fontSize: ".72rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 99 }}>Welcome</div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.4 }}>Stop Delivering Brochures. Start Driving Decisions.</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>Most insurance proposals lead with coverage, list limits and deductibles, and then hand it to the client to "review." That's not a strategic presentation — that's a brochure delivery.</p>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>A strategic presentation does something different: it connects your client's problem — in their own words — to a recommendation that solves it in <strong style={{ color: "#60a5fa" }}>business terms</strong>.</p>
            <div style={{ background: "#0f2552", borderLeft: "4px solid #2563eb", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
              <strong style={{ display: "block", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, color: "#93c5fd" }}>Your Goal After This Module</strong>
              <p style={{ margin: 0, fontSize: ".92rem", color: "#cbd5e1" }}>Master a 5-part framework that positions you as the advisor who understood what was at stake — not the vendor who responded to a request.</p>
            </div>
            {[["1", "Mirror Back", "Prove you understood what they told you"], ["2", "Recommendation Frame", "Lead with the outcome, not the product"], ["3", "The Financial Case", "Connect cost to consequence"], ["4", "The Recommendation", "Present coverage — briefly and clearly"], ["5", "The Decision Conversation", "Ask for a decision, not feedback"]].map(([n, t, d]) => (
              <div key={n} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#141e35", borderRadius: 10, padding: 16 }}>
                <div style={{ background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: ".85rem", minWidth: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</div>
                <div><h4 style={{ color: "#fff", fontSize: ".95rem", margin: "0 0 4px" }}>{t}</h4><p style={{ color: "#94a3b8", fontSize: ".88rem", margin: 0 }}>{d}</p></div>
              </div>
            ))}
            {navBtn("Start Training →", "mirror")}
          </div>
        )}

        {active === "mirror" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "inline-block", background: "#1e3a5f", color: "#60a5fa", fontSize: ".72rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 99 }}>Section 1 of 5</div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff", margin: 0 }}>🪞 Mirror Back</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>Before you recommend anything, reflect what you heard back to the client — in <em>their</em> language, not yours. This is the most underused move in sales.</p>
            {[["✓", "Confirms Your Diagnosis", "Verifies your understanding was accurate before you build the solution"], ["✓", "Re-Anchors the Problem", "Reopens the pain before presenting the solution — critical for emotional resonance"], ["✓", "Builds Trust Through Precision", "Nothing says 'I was listening' more than playing their words back accurately"]].map(([n, t, d]) => (
              <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#141e35", borderRadius: 10, padding: 16 }}>
                <div style={{ background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: ".85rem", minWidth: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</div>
                <div><h4 style={{ color: "#fff", fontSize: ".95rem", margin: "0 0 4px" }}>{t}</h4><p style={{ color: "#94a3b8", fontSize: ".88rem", margin: 0 }}>{d}</p></div>
              </div>
            ))}
            <div style={{ background: "#052e16", borderLeft: "4px solid #22c55e", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
              <strong style={{ display: "block", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, color: "#4ade80" }}>How It Sounds</strong>
              <p style={{ margin: 0, fontSize: ".92rem", color: "#cbd5e1" }}>"Before I share what we've put together, I want to make sure I captured what you told me accurately. You mentioned your biggest concern was [client's exact words]. And the consequence of not addressing it was [their language for the impact]. Is that still where you are?"</p>
            </div>
            <div style={{ background: "#2d0a0a", borderLeft: "4px solid #ef4444", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
              <strong style={{ display: "block", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, color: "#f87171" }}>The Failure Mode</strong>
              <p style={{ margin: 0, fontSize: ".92rem", color: "#cbd5e1" }}>Skipping the mirror and opening with your recommendation. You lose the connective tissue between their problem and your solution — and the client mentally disconnects.</p>
            </div>
            {/* Quiz */}
            <div style={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 10, padding: 20, fontStyle: "italic", color: "#93c5fd", fontSize: ".93rem", lineHeight: 1.7 }}>
              <strong style={{ fontStyle: "normal", color: "#60a5fa", display: "block", marginBottom: 8, fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px" }}>Scenario</strong>
              You've completed your discovery meeting with a logistics company CFO. She told you her biggest fear is "a ransomware attack taking down our dispatch system — we'd lose $80–100K a day." You're now sitting across from her to present.
            </div>
            <div style={{ background: "#141e35", border: "1px solid #1e3a5f", borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: "#fff", fontSize: "1rem", marginBottom: 18, lineHeight: 1.5 }}>What's the best opening line for your presentation?</h3>
              <QuizOption qid="q1" optIdx={0} correct={false} label={`A. "We've put together a comprehensive cyber insurance program with $5M in limits and several key endorsements I'd like to walk you through."`} />
              <QuizOption qid="q1" optIdx={1} correct={false} label='B. "Thanks for your time. We reviewed your current program and found some significant gaps worth addressing."' />
              <QuizOption qid="q1" optIdx={2} correct={true} label={`C. "Before I share what we've put together, I want to confirm I captured what you told me. You said your biggest concern was ransomware taking down dispatch — and that the daily cost of that could run $80–100K. Is that still the core issue?"`} />
              <QuizOption qid="q1" optIdx={3} correct={false} label='D. "I have some great news — we were able to find you very competitive pricing on a cyber program."' />
            </div>
            <div style={{ background: "#141e35", border: "1px solid #1e3a5f", borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: "#fff", fontSize: "1rem", marginBottom: 18, lineHeight: 1.5 }}>A client responds to your mirror with: "Actually, since we last spoke, our board has flagged D&O as the bigger priority right now." What should you do?</h3>
              <QuizOption qid="q2" optIdx={0} correct={false} label="A. Continue with your prepared cyber presentation — you've already built it out." />
              <QuizOption qid="q2" optIdx={1} correct={true} label="B. Acknowledge the shift, ask a few quick questions about the D&O concern, and adjust your recommendation frame accordingly." />
              <QuizOption qid="q2" optIdx={2} correct={false} label="C. Tell them you'll put together a new proposal and reschedule." />
              <QuizOption qid="q2" optIdx={3} correct={false} label="D. Present cyber first, then mention you can also help with D&O at the end." />
            </div>
            {navBtn("Next: Recommendation Frame →", "frame")}
          </div>
        )}

        {active === "frame" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "inline-block", background: "#1e3a5f", color: "#60a5fa", fontSize: ".72rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 99 }}>Section 2 of 5</div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff", margin: 0 }}>🎯 The Recommendation Frame</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>Lead with the outcome, not the product. Your first sentence about the recommendation should tell the client <em>what problem it solves</em> — in business terms — before you ever mention a policy name or limit.</p>
            <div style={{ background: "#141e35", border: "1px solid #1e3a5f", borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".8px", textTransform: "uppercase", marginBottom: 8, color: "#f87171" }}>✗ Product-First (Wrong)</div>
              <p style={{ color: "#e2e8f0", fontSize: ".93rem", margin: 0, lineHeight: 1.6 }}>"We're recommending a standalone cyber policy with $5M limits, a $50K retention, and business interruption coverage included."</p>
            </div>
            <div style={{ background: "#141e35", border: "1px solid #1e3a5f", borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: ".75rem", fontWeight: 700, letterSpacing: ".8px", textTransform: "uppercase", marginBottom: 8, color: "#4ade80" }}>✓ Outcome-First (Right)</div>
              <p style={{ color: "#e2e8f0", fontSize: ".93rem", margin: 0, lineHeight: 1.6 }}>"We're recommending a structure that eliminates the revenue interruption exposure you described — the one that could cost you $80–120K per day if your dispatch platform goes down."</p>
            </div>
            <div style={{ background: "#1c1300", borderLeft: "4px solid #eab308", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
              <strong style={{ display: "block", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, color: "#facc15" }}>The Formula</strong>
              <p style={{ margin: 0, fontSize: ".92rem", color: "#cbd5e1" }}><strong style={{ color: "#fde047" }}>What problem this solves</strong> (their language) → <strong style={{ color: "#fde047" }}>What the approach does</strong> (one sentence) → <strong style={{ color: "#fde047" }}>What it protects</strong> (specific operational or financial asset)</p>
            </div>
            <div style={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 10, padding: 20, fontStyle: "italic", color: "#93c5fd", fontSize: ".93rem", lineHeight: 1.7 }}>
              <strong style={{ fontStyle: "normal", color: "#60a5fa", display: "block", marginBottom: 8, fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px" }}>Scenario</strong>
              A manufacturing client told you in discovery that their biggest fear is a product recall wiping out a major retail contract worth $4M annually. You're now framing your recommendation.
            </div>
            <div style={{ background: "#141e35", border: "1px solid #1e3a5f", borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: "#fff", fontSize: "1rem", marginBottom: 18, lineHeight: 1.5 }}>Which recommendation frame is most effective?</h3>
              <QuizOption qid="q3" optIdx={0} correct={false} label={`A. "We're recommending a product recall and contamination policy with $10M in limits and crisis management coverage."`} />
              <QuizOption qid="q3" optIdx={1} correct={true} label={`B. "We're recommending a structure designed to protect the $4M retail contract you mentioned — specifically the recall scenario that could trigger a contract termination clause."`} />
              <QuizOption qid="q3" optIdx={2} correct={false} label='C. "We found a great carrier for product liability that has very competitive pricing in your industry."' />
              <QuizOption qid="q3" optIdx={3} correct={false} label={`D. "Based on your SIC code, we're recommending a standard products liability policy which is common in manufacturing."`} />
            </div>
            {navBtn("Next: Financial Case →", "financial")}
          </div>
        )}

        {active === "financial" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "inline-block", background: "#1e3a5f", color: "#60a5fa", fontSize: ".72rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 99 }}>Section 3 of 5</div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff", margin: 0 }}>💰 The Financial Case</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>Every recommendation needs a financial frame. Not "here's the premium" — but here's what you're protecting, here's what inaction costs, and here's what this investment buys you.</p>
            {[["1", "Cost of the Risk", "The financial exposure if the gap isn't closed — use their language from discovery"], ["2", "Cost of the Solution", "The premium or investment required"], ["3", "The Ratio", "What they're transferring relative to what they're paying — make it tangible"]].map(([n, t, d]) => (
              <div key={n} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#141e35", borderRadius: 10, padding: 16 }}>
                <div style={{ background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: ".85rem", minWidth: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</div>
                <div><h4 style={{ color: "#fff", fontSize: ".95rem", margin: "0 0 4px" }}>{t}</h4><p style={{ color: "#94a3b8", fontSize: ".88rem", margin: 0 }}>{d}</p></div>
              </div>
            ))}
            <div style={{ background: "#052e16", borderLeft: "4px solid #22c55e", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
              <strong style={{ display: "block", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, color: "#4ade80" }}>Example in Practice</strong>
              <p style={{ margin: 0, fontSize: ".92rem", color: "#cbd5e1" }}>"You described a revenue interruption scenario worth $80–120K per day. The coverage structure we're recommending transfers that risk for $28,000 annually. That's roughly $77 per day to eliminate a six-figure daily exposure."</p>
            </div>
            <div style={{ background: "#2d0a0a", borderLeft: "4px solid #ef4444", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
              <strong style={{ display: "block", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, color: "#f87171" }}>The Failure Mode</strong>
              <p style={{ margin: 0, fontSize: ".92rem", color: "#cbd5e1" }}>Presenting premium first. Premium without context is always expensive. Premium in the context of what it protects is almost always reasonable. Sequence matters enormously.</p>
            </div>
            <div style={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 10, padding: 20, fontStyle: "italic", color: "#93c5fd", fontSize: ".93rem", lineHeight: 1.7 }}>
              <strong style={{ fontStyle: "normal", color: "#60a5fa", display: "block", marginBottom: 8, fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px" }}>Scenario</strong>
              A healthcare client has a $500K annual revenue exposure from a potential HIPAA breach based on their patient volume. You've put together a cyber program for $18,000/year.
            </div>
            <div style={{ background: "#141e35", border: "1px solid #1e3a5f", borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: "#fff", fontSize: "1rem", marginBottom: 18, lineHeight: 1.5 }}>Which financial frame is most effective for presenting this premium?</h3>
              <QuizOption qid="q4" optIdx={0} correct={false} label='A. "The annual premium for this program comes in at $18,000, which we think is very competitive for your exposure."' />
              <QuizOption qid="q4" optIdx={1} correct={false} label='B. "We were able to keep the cost down to $18,000 — much lower than some of the other quotes you might see."' />
              <QuizOption qid="q4" optIdx={2} correct={true} label='C. "You described a HIPAA breach scenario that could run $500K or more in notification, legal, and regulatory costs. This program transfers that exposure for $18,000 annually — roughly $49 per day to eliminate a half-million-dollar event."' />
              <QuizOption qid="q4" optIdx={3} correct={false} label={`D. "I'll send you the full premium breakdown so you can compare it to what you're paying today."`} />
            </div>
            {navBtn("Next: The Recommendation →", "recommendation")}
          </div>
        )}

        {active === "recommendation" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "inline-block", background: "#1e3a5f", color: "#60a5fa", fontSize: ".72rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 99 }}>Section 4 of 5</div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff", margin: 0 }}>📋 The Recommendation Itself</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>Now — and only now — do you present the actual coverage. After the financial case is established, the product details land in context. But keep it tight.</p>
            <div style={{ background: "#1c1300", borderLeft: "4px solid #eab308", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
              <strong style={{ display: "block", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, color: "#facc15" }}>The Rule</strong>
              <p style={{ margin: 0, fontSize: ".92rem", color: "#cbd5e1" }}>3–5 bullets maximum. If you can't explain your recommendation in 5 bullets, you haven't synthesized it yet. Your job is to translate, not to dump.</p>
            </div>
            {[["✓", "What It Covers", "In business terms — not policy language"], ["✓", "What It Doesn't Cover", "Be honest about key exclusions — this builds trust and prevents surprises"], ["✓", "What Happens Next", "If they say yes — what does the path forward look like?"]].map(([n, t, d]) => (
              <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "#141e35", borderRadius: 10, padding: 16 }}>
                <div style={{ background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: ".85rem", minWidth: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</div>
                <div><h4 style={{ color: "#fff", fontSize: ".95rem", margin: "0 0 4px" }}>{t}</h4><p style={{ color: "#94a3b8", fontSize: ".88rem", margin: 0 }}>{d}</p></div>
              </div>
            ))}
            <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>Your client doesn't need every endorsement explained. They need enough to make a decision — not enough to become an underwriter.</p>
            {navBtn("Next: Decision Conversation →", "decision")}
          </div>
        )}

        {active === "decision" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "inline-block", background: "#1e3a5f", color: "#60a5fa", fontSize: ".72rem", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 12px", borderRadius: 99 }}>Section 5 of 5</div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff", margin: 0 }}>🤝 The Decision Conversation</h2>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>Most presentations end with: <em>"Take a look and let us know what you think."</em> That is not a close. That is an invitation to delay.</p>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>A strategic presentation ends with a <strong style={{ color: "#60a5fa" }}>decision question</strong> — not a hard close, but a clear request for direction.</p>
            <div style={{ background: "#052e16", borderLeft: "4px solid #22c55e", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
              <strong style={{ display: "block", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, color: "#4ade80" }}>Decision Questions That Work</strong>
              <p style={{ margin: 0, fontSize: ".92rem", color: "#cbd5e1" }}>"Based on what we've discussed, does this approach make sense to move forward with?"<br /><br />"What would you need to see to make a decision on this before [date]?"<br /><br /><strong style={{ color: "#4ade80" }}>"Who else needs to be part of this conversation before you can move forward?"</strong></p>
            </div>
            <div style={{ background: "#1c1300", borderLeft: "4px solid #eab308", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
              <strong style={{ display: "block", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, color: "#facc15" }}>The Most Important Question</strong>
              <p style={{ margin: 0, fontSize: ".92rem", color: "#cbd5e1" }}>That third question — about who else is involved — is critical in complex accounts. If there's a CFO, board, or risk committee involved, find out <em>before</em> you present. Not after they've "reviewed it internally" for three weeks.</p>
            </div>
            <div style={{ background: "#2d0a0a", borderLeft: "4px solid #ef4444", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
              <strong style={{ display: "block", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, color: "#f87171" }}>The Failure Mode</strong>
              <p style={{ margin: 0, fontSize: ".92rem", color: "#cbd5e1" }}>Presenting to the wrong person. Always qualify: "Is there anyone else who needs to be involved in this decision?" Ask it <em>before</em> you present, not after.</p>
            </div>
            {/* Final Quiz */}
            <div style={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 10, padding: 20, fontStyle: "italic", color: "#93c5fd", fontSize: ".93rem", lineHeight: 1.7 }}>
              <strong style={{ fontStyle: "normal", color: "#60a5fa", display: "block", marginBottom: 8, fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px" }}>Full Scenario</strong>
              You're presenting to a VP of Operations at a regional trucking company. In discovery, she told you that their biggest gap is cargo theft — last year they lost $220K in a single incident, and their current policy doesn't cover it. The program you've built costs $31,000/year.
            </div>
            <div style={{ background: "#141e35", border: "1px solid #1e3a5f", borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: "#fff", fontSize: "1rem", marginBottom: 18, lineHeight: 1.5 }}>You're about to start the presentation. What's the first thing you should do?</h3>
              <QuizOption qid="q5" optIdx={0} correct={false} label="A. Pull up the proposal deck and walk through it page by page." />
              <QuizOption qid="q5" optIdx={1} correct={true} label="B. Mirror back: confirm that cargo theft and the $220K incident are still the core concern she wants to solve." />
              <QuizOption qid="q5" optIdx={2} correct={false} label="C. Start with the premium to anchor expectations early." />
              <QuizOption qid="q5" optIdx={3} correct={false} label="D. Ask her to introduce you to the CFO before you begin." />
            </div>
            <div style={{ background: "#141e35", border: "1px solid #1e3a5f", borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: "#fff", fontSize: "1rem", marginBottom: 18, lineHeight: 1.5 }}>Which financial frame correctly presents the $31,000 premium?</h3>
              <QuizOption qid="q6" optIdx={0} correct={false} label={`A. "The program comes in under $35K which I think you'll find very fair."`} />
              <QuizOption qid="q6" optIdx={1} correct={true} label={`B. "You described a cargo theft exposure that cost you $220K in a single event last year. This structure transfers that risk for $31,000 annually — less than one-seventh of what last year's incident cost you."`} />
              <QuizOption qid="q6" optIdx={2} correct={false} label={`C. "Cargo coverage typically runs $25–40K in your class, so we're right in the market."`} />
              <QuizOption qid="q6" optIdx={3} correct={false} label='D. "We priced this aggressively — I think you will be pleased with the number."' />
            </div>
            <div style={{ background: "#141e35", border: "1px solid #1e3a5f", borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: "#fff", fontSize: "1rem", marginBottom: 18, lineHeight: 1.5 }}>After presenting the coverage details, how should you close the meeting?</h3>
              <QuizOption qid="q7" optIdx={0} correct={false} label='A. "Take your time reviewing everything and reach out when you are ready."' />
              <QuizOption qid="q7" optIdx={1} correct={false} label={`B. "I'll send this over in a PDF so you can share it internally."`} />
              <QuizOption qid="q7" optIdx={2} correct={true} label={`C. "Based on what we've discussed, does this approach make sense to move forward with? And is there anyone else — a CFO or ownership group — who needs to be part of this before you can commit?"`} />
              <QuizOption qid="q7" optIdx={3} correct={false} label='D. "What do you think? Does the coverage look good to you?"' />
            </div>
            <div style={{ background: "#0f2552", borderLeft: "4px solid #2563eb", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
              <strong style={{ display: "block", fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, color: "#93c5fd" }}>Module Complete</strong>
              <p style={{ margin: 0, fontSize: ".92rem", color: "#cbd5e1" }}>You've worked through the full 5-part Strategic Presentation Framework. Return here to review any section before your next presentation.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}