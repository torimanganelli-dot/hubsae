import React, { useState } from "react";
import { C } from "./constants";

const color = C.sBlue;

const SECTIONS = [
  { id: "hook", lbl: "The Wake-Up Call", icon: "⚡" },
  { id: "mapping", lbl: "Executive Mapping", icon: "🗺" },
  { id: "entry", lbl: "The Entry Point", icon: "🚪" },
  { id: "conversation", lbl: "The Conversation", icon: "💬" },
  { id: "rhythm", lbl: "Engagement Rhythm", icon: "🔄" },
  { id: "payoff", lbl: "The Payoff", icon: "🏆" },
  { id: "sprint", lbl: "Sprint Deliverables", icon: "🎯" },
  { id: "ai", lbl: "AI Assistant", icon: "🤖" },
];

export default function S6Learning() {
  const [active, setActive] = useState("hook");

  const sections = {
    hook: <HookSection />,
    mapping: <MappingSection />,
    entry: <EntrySection />,
    conversation: <ConversationSection />,
    rhythm: <RhythmSection />,
    payoff: <PayoffSection />,
    sprint: <SprintSection />,
    ai: <AISection />,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <div style={{ background: color, padding: "16px 20px", color: "#fff", flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", opacity: 0.75 }}>Sprint 6 · Learning Module</div>
        <div style={{ fontSize: 16, fontWeight: 900, marginTop: 2 }}>Executive Relationship Development</div>
        <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>Get above the contact. Own the relationship.</div>
      </div>
      <div style={{ display: "flex", gap: 0, overflowX: "auto", background: "#fff", borderBottom: "1px solid #D1D9E0", flexShrink: 0, padding: "0 4px" }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            padding: "10px 12px", background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap",
            borderBottom: active === s.id ? `2px solid ${color}` : "2px solid transparent",
            color: active === s.id ? color : "#757584", fontWeight: active === s.id ? 700 : 400, fontSize: 11,
          }}>{s.icon} {s.lbl}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {sections[active]}
      </div>
    </div>
  );
}

function Block({ label, type = "default", children }) {
  const styles = {
    default: { background: "#F4F6F9", border: "1px solid #D1D9E0", borderRadius: 10, padding: 16, marginBottom: 14 },
    danger: { background: "#FEF2F2", border: "1px solid #FECACA", borderLeft: "4px solid #AC1534", borderRadius: 10, padding: 16, marginBottom: 14 },
    gold: { background: "#FFFBEB", border: "1px solid #FDE68A", borderLeft: `4px solid ${C.cGold}`, borderRadius: 10, padding: 16, marginBottom: 14 },
    success: { background: "#F0FDF4", border: "1px solid #BBF7D0", borderLeft: "4px solid #3EBD3E", borderRadius: 10, padding: 16, marginBottom: 14 },
    dark: { background: "#18252D", borderRadius: 10, padding: 16, marginBottom: 14 },
    scene: { background: "linear-gradient(135deg, #18252D, #385263)", borderRadius: 12, padding: 20, marginBottom: 16, color: "#fff" },
  };
  const labelColors = { default: "#757584", danger: "#AC1534", gold: C.cGold, success: "#3EBD3E", dark: C.cGold };
  return (
    <div style={styles[type]}>
      {label && <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: labelColors[type] || "#fff", marginBottom: 6 }}>{label}</div>}
      {children}
    </div>
  );
}

function PullQuote({ children }) {
  return (
    <div style={{ borderLeft: `4px solid ${C.cGold}`, background: "#FFFBEB", padding: "14px 18px", margin: "16px 0", borderRadius: "0 8px 8px 0", fontStyle: "italic", fontSize: 14, color: "#18252D", lineHeight: 1.7 }}>
      {children}
    </div>
  );
}

function Dialog({ children }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.1)", borderLeft: `3px solid ${C.cGold}`, borderRadius: "0 8px 8px 0", padding: "10px 14px", margin: "10px 0", fontStyle: "italic", color: "rgba(255,255,255,0.9)", fontSize: 13, lineHeight: 1.6 }}>
      "{children}"
    </div>
  );
}

function HookSection() {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: color, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>The Wake-Up Call</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: "#18252D", marginBottom: 14 }}>The Account You Thought Was Safe</div>

      <Block type="scene">
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: C.cGold, marginBottom: 8 }}>📍 Scene — A Tuesday Morning in March</div>
        <div style={{ fontWeight: 700, color: "#fff", marginBottom: 8, fontSize: 14 }}>You've had this account for six years.</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: 10 }}>You know the risk manager, Dana, better than some of your own colleagues. You grab coffee when you're in the area. She sends you her kids' soccer schedules because your renewal always lands on the same weekend.</p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: 10 }}>So when your phone rings at 8:47am and it's Dana, you answer with a smile.</p>
        <Dialog>"Hey — I wanted to give you a heads up before you heard it somewhere else. We're going out to market. The CFO got a competitive quote last week and he wants us to explore options. I pushed back, I really did. But it's out of my hands."</Dialog>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginTop: 10 }}>You thank her. You hang up. You stare at the ceiling.</p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.7 }}>You have a great relationship with Dana. <strong style={{ color: "#fff" }}>The CFO doesn't know your name.</strong></p>
      </Block>

      <p style={{ fontSize: 13, color: "#385263", lineHeight: 1.7, marginBottom: 12 }}>This isn't a story about losing an account. It's a story about a gap — the gap between the person who <strong>manages</strong> your relationship and the person who <strong>decides</strong> whether to keep you.</p>

      <PullQuote>"The accounts that are truly protected are the ones where the SAE has a direct, value-based relationship with the executive layer."</PullQuote>

      <Block type="danger" label="⚠ The Hard Truth">
        <p style={{ fontSize: 13, color: "#385263", lineHeight: 1.6 }}>You can be <strong>indispensable</strong> to the person who manages your relationship — and <strong>completely invisible</strong> to the person who decides whether to keep you.</p>
      </Block>

      <p style={{ fontSize: 13, color: "#385263", lineHeight: 1.7 }}>This module is about closing that gap. Not by abandoning the relationships you've built — but by expanding your reach to the layer that makes decisions.</p>
    </div>
  );
}

function MappingSection() {
  const [open, setOpen] = useState(null);
  const questions = [
    { q: "1 · Who is the economic buyer?", a: "Who has final authority on insurance and risk spending? In most companies this is the CFO or CEO — not the risk manager you have lunch with. If you can't answer this with certainty, that uncertainty is the gap. It means a budget decision could happen with someone you've never met in the room." },
    { q: "2 · Who is your current highest contact?", a: "What's their title? What function do they own? How many levels are they from the economic buyer? A strong risk manager relationship at a company where the CFO makes the call means you're one reorganization away from starting over. Distance from the decision layer is risk." },
    { q: "3 · What does the executive layer care about?", a: "Not what coverages they need. What are their strategic priorities — growth, M&A, workforce, technology, regulatory exposure — that create risk implications? This is the bridge between their world and yours. Executives don't care about insurance. They care about the business risks that insurance is supposed to address." },
    { q: "4 · What would give you a reason to request a meeting?", a: "Executives don't take maintenance meetings. You need a specific, business-relevant reason — a market development, a risk event in their industry, a strategic conversation they'd find genuinely valuable. If you can't answer this question, you're not ready to request the meeting yet." },
  ];
  return (
    <div>
      <div style={{ background: "#18252D", borderRadius: 12, padding: 20, marginBottom: 16, color: "#fff", position: "relative" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.cGold, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Capability One</div>
        <div style={{ fontSize: 16, fontWeight: 900, color: "#fff", marginBottom: 6 }}>Executive Mapping</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>Before you can build executive relationships, you need to see clearly where you stand — and where you're blind.</p>
      </div>

      <Block type="scene">
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: C.cGold, marginBottom: 8 }}>📍 Scene — Back to you, two weeks later</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: 8 }}>You didn't lose the account. Dana went to bat hard enough and you matched the quote. But you made a decision sitting in that renewal meeting: you were going to find out exactly where you stood at every A-tier account.</p>
        <Dialog>"Who actually has final authority here? And do they know who I am?"</Dialog>
      </Block>

      <div style={{ fontSize: 14, fontWeight: 700, color: "#18252D", marginBottom: 8 }}>The Four Mapping Questions</div>
      <p style={{ fontSize: 12, color: "#757584", lineHeight: 1.6, marginBottom: 12 }}>For every A-tier account, you need honest answers to these questions. Click each one to explore what it's really asking.</p>

      {questions.map((q, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 10, marginBottom: 8, overflow: "hidden" }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#18252D" }}>{q.q}</span>
            <span style={{ color: C.cGold, fontSize: 16, transition: "transform .2s", transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
          </button>
          {open === i && <div style={{ padding: "0 16px 14px", fontSize: 13, color: "#385263", lineHeight: 1.7, borderTop: "1px solid #D1D9E0", paddingTop: 12 }}>{q.a}</div>}
        </div>
      ))}
    </div>
  );
}

function EntrySection() {
  return (
    <div>
      <div style={{ background: "#18252D", borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.cGold, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Capability Two</div>
        <div style={{ fontSize: 16, fontWeight: 900, color: "#fff", marginBottom: 6 }}>The Executive Entry Point</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>Getting to the executive level isn't about being bold enough to ask. It's about having something worth bringing.</p>
      </div>

      <p style={{ fontSize: 13, color: "#385263", lineHeight: 1.7, marginBottom: 12 }}>Most SAEs who want executive access make one of two mistakes. They either <strong>never ask</strong> — waiting for the perfect moment that doesn't come — or they ask <strong>without a reason</strong>, and come across as a vendor chasing a meeting.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <Block type="gold" label="Entry Point 1">
          <div style={{ fontSize: 13, fontWeight: 700, color: "#18252D", marginBottom: 4 }}>The Internal Introduction</div>
          <p style={{ fontSize: 12, color: "#385263", lineHeight: 1.6 }}>Your existing contact introduces you. Easiest path — but the executive's first impression of you is filtered entirely through someone else. <strong>You arrive as a vendor they were told to meet.</strong></p>
        </Block>
        <Block type="gold" label="Entry Point 2">
          <div style={{ fontSize: 13, fontWeight: 700, color: "#18252D", marginBottom: 4 }}>The Value Trigger</div>
          <p style={{ fontSize: 12, color: "#385263", lineHeight: 1.6 }}>A market event or industry development gives you a legitimate reason to reach out directly. <strong>You arrive as someone who was watching their business.</strong> This is advisor behavior.</p>
        </Block>
      </div>

      <Block type="success" label="✦ Entry Point 3 — The Highest Signal">
        <div style={{ fontSize: 13, fontWeight: 700, color: "#18252D", marginBottom: 6 }}>The Strategic Ask</div>
        <p style={{ fontSize: 12, color: "#385263", lineHeight: 1.6, marginBottom: 8 }}>You request a meeting to discuss how their risk program should evolve alongside the business. Requires the most confidence and preparation — but sends the clearest advisory signal. To pull this off, you need three things:</p>
        <ul style={{ paddingLeft: 18, fontSize: 12, color: "#385263", lineHeight: 1.8 }}>
          <li>A specific business topic relevant to their strategy</li>
          <li>An insight they probably haven't heard from current advisors</li>
          <li>The confidence to ask for 20 minutes <em>without apologizing for it</em></li>
        </ul>
      </Block>

      <div style={{ background: "#18252D", borderRadius: 10, padding: 16, marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.cGold, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>📋 Word-for-Word Framework</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, fontStyle: "italic" }}>"[Name], I've been working with [their contact] on your program for [X] years, and I've been watching some developments in [industry/risk area] that I think have direct implications for where you're taking the business. I'd welcome 20 minutes with you before [renewal/expansion/acquisition] to share a perspective. Would that be useful?"</p>
      </div>

      <Block type="dark" label="Why This Works">
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}><strong style={{ color: "#fff" }}>One sentence of context.</strong> One specific relevance statement. One direct ask. The moment you apologize for taking their time or lead with what your company does — you've classified yourself as a vendor. This script classifies you as someone who has done their homework.</p>
      </Block>
    </div>
  );
}

function ConversationSection() {
  const steps = [
    { n: 1, t: "Frame it in their terms", time: "(2 min)", p: "Open by referencing something specific happening in their business — not their program. Never open with insurance. Never reference the renewal. Start with their world." },
    { n: 2, t: "Listen for the strategic priority", time: "(5 min)", p: "Ask two or three questions and let them talk. The questions that work aren't about coverage gaps — they're about strategic direction: \"Where is the business going in the next 18–24 months that creates the most complexity for you?\"" },
    { n: 3, t: "Bring one insight", time: "(3 min)", p: "Share one specific, well-researched insight relevant to their business and risk profile. Not a product pitch. Not a list. One insight, delivered with confidence." },
    { n: 4, t: "Ask the one question that earns the next meeting", time: "(2 min)", p: "\"Given what you just told me about [their priority] — is there a conversation your team should be having about how your risk program needs to evolve to keep pace with that? I'd like to be part of it.\"" },
    { n: 5, t: "Follow up with intelligence", time: "(within 48 hrs)", p: "Not a summary of what was discussed. A forward-looking note that shows you were listening — and already thinking. One sentence referencing something specific they said. One implication. One next step. No attachments. No proposals." },
  ];

  return (
    <div>
      <div style={{ background: "#18252D", borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.cGold, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Capability Three</div>
        <div style={{ fontSize: 16, fontWeight: 900, color: "#fff", marginBottom: 6 }}>The Executive Conversation</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>Getting the meeting is 20% of the work. The conversation is where the relationship is built — or lost.</p>
      </div>

      <Block type="scene">
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: C.cGold, marginBottom: 8 }}>📍 Scene — Three months after the Dana call</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: 8 }}>You mapped your top five accounts. You identified the gaps. You reached out to the CFO of your second-largest account — a logistics company that had been quietly growing through acquisitions.</p>
        <Dialog>Most SAEs, at this moment, do one of three things — and two of them are wrong.</Dialog>
      </Block>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <Block type="danger" label="Mistake 1"><p style={{ fontSize: 12, color: "#385263", lineHeight: 1.6 }}>The SAE talks about <strong>insurance</strong> when the executive wants to talk about <strong>business</strong>.</p></Block>
        <Block type="danger" label="Mistake 2"><p style={{ fontSize: 12, color: "#385263", lineHeight: 1.6 }}>The SAE tries to <strong>impress</strong> when the executive wants to be <strong>understood</strong>.</p></Block>
      </div>

      <div style={{ fontSize: 14, fontWeight: 700, color: "#18252D", marginBottom: 14 }}>The 5-Part Executive Conversation</div>

      {steps.map(s => (
        <div key={s.n} style={{ display: "flex", gap: 14, marginBottom: 16 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#18252D", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 2 }}>{s.n}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#18252D", marginBottom: 4 }}>{s.t} <span style={{ fontWeight: 400, color: "#757584" }}>{s.time}</span></div>
            <p style={{ fontSize: 12, color: "#385263", lineHeight: 1.6 }}>{s.p}</p>
          </div>
        </div>
      ))}

      <Block type="gold" label="✦ The Core Principle">
        <p style={{ fontSize: 13, color: "#385263", lineHeight: 1.7 }}>Executives rarely get asked strategic questions by their insurance broker. The moment you ask one well — <em>"What's the risk that keeps you up at night that no one on your team is focused on?"</em> — you've differentiated yourself from every vendor they've ever met.</p>
      </Block>
    </div>
  );
}

function RhythmSection() {
  return (
    <div>
      <div style={{ background: "#18252D", borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.cGold, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Capability Four</div>
        <div style={{ fontSize: 16, fontWeight: 900, color: "#fff", marginBottom: 6 }}>The Executive Engagement Rhythm</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>Most SAEs who earn the first meeting fail to convert it into a durable relationship. Don't be most SAEs.</p>
      </div>

      <Block type="scene">
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: C.cGold, marginBottom: 8 }}>📍 Scene — Six weeks after the CFO meeting</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: 8 }}>The meeting went well. Better than you expected. The CFO mentioned two things you've been thinking about ever since: a potential acquisition in the Southeast, and a workforce expansion moving faster than their HR team could handle.</p>
        <Dialog>"At what point does staying in touch become bothering them?"</Dialog>
      </Block>

      <p style={{ fontSize: 13, color: "#385263", lineHeight: 1.7, marginBottom: 14 }}>The answer is simpler than it feels: <strong>the quality of the contact matters far more than the frequency.</strong> Executive relationships are sustained by a rhythm of relevant contact — not volume of touchpoints.</p>

      <div style={{ fontSize: 14, fontWeight: 700, color: "#18252D", marginBottom: 12 }}>The Three-Touch Quarterly Rhythm</div>

      <Block type="gold" label="Touch 1 — Quarterly">
        <div style={{ fontSize: 13, fontWeight: 700, color: "#18252D", marginBottom: 6 }}>The Intelligence Share</div>
        <p style={{ fontSize: 12, color: "#385263", lineHeight: 1.6, marginBottom: 6 }}>An unprompted note — not about the insurance program — about something relevant to their business. A regulatory shift. An M&A trend. A risk event at a peer company. Two paragraphs. No ask. No attachment.</p>
        <p style={{ fontSize: 11, color: "#757584", fontStyle: "italic" }}>Signal: "I'm watching your world even when we don't have a meeting."</p>
      </Block>

      <Block type="gold" label="Touch 2 — Quarterly">
        <div style={{ fontSize: 13, fontWeight: 700, color: "#18252D", marginBottom: 6 }}>The Strategic Check-In</div>
        <p style={{ fontSize: 12, color: "#385263", lineHeight: 1.6 }}>A 15–20 minute conversation with one agenda item: what's changed in their priorities. Not a renewal discussion. Not a service update. Open with: <em>"I wanted to check in on [the initiative they mentioned]. How has that developed — and is there anything from a risk standpoint that's evolved with it?"</em></p>
      </Block>

      <Block type="success" label="Touch 3 — At Renewal">
        <div style={{ fontSize: 13, fontWeight: 700, color: "#18252D", marginBottom: 6 }}>The Renewal Anchor</div>
        <p style={{ fontSize: 12, color: "#385263", lineHeight: 1.6, marginBottom: 6 }}>The proactive renewal conversation — but led with all the executive context you've built. You're not reviewing the program. You're connecting the program to where the business is going. <strong>This is the moment where the executive relationship becomes a retention asset.</strong></p>
        <p style={{ fontSize: 11, color: "#757584", fontStyle: "italic" }}>A competitor can match your coverage. They cannot match 12 months of strategic conversation.</p>
      </Block>
    </div>
  );
}

function PayoffSection() {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: color, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>The Payoff</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: "#18252D", marginBottom: 14 }}>One Year Later</div>

      <Block type="scene">
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: C.cGold, marginBottom: 8 }}>📍 Scene — The same account. Twelve months on.</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: 10 }}>The logistics CFO — Marcus — just forwarded you an article about cargo liability exposure in cross-border acquisitions. His note said four words:</p>
        <Dialog>Thought of you. Relevant?</Dialog>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginTop: 10, marginBottom: 10 }}>You smile. Because yes, it's relevant. And because you know what it means when an executive thinks of you unprompted.</p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: 10 }}>Three weeks later, when a competitor approaches their risk manager with a "significant savings opportunity," Marcus sends a two-line email to the risk manager before she can even respond:</p>
        <Dialog>Let's stick with our current team. I've found their perspective valuable.</Dialog>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginTop: 10 }}>No RFP. No bake-off. No matching quotes. A two-line email from someone who knows your name — and trusts your judgment.</p>
      </Block>

      <PullQuote>"A competitor can match your coverage. They cannot match the 12 months of strategic conversation you've built."</PullQuote>

      <p style={{ fontSize: 13, color: "#385263", lineHeight: 1.7, marginBottom: 12 }}>Executive relationship development isn't a tactic. It's a fundamentally different way of operating at your accounts — one that moves you from vendor to trusted advisor in the eyes of the people who make decisions.</p>

      <Block type="dark" label="The Shift in One Sentence">
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>The broker who talks about insurance gets replaced. The advisor who understands the business gets called when something matters.</p>
      </Block>
    </div>
  );
}

function SprintSection() {
  const deliverables = [
    { d: "Executive Relationship Map built (5 A-tier accounts)", sg: "Honest gap assessment, clarity of economic buyer." },
    { d: "Accounts scored on Relationship Gap + Strategic Opportunity", sg: "Logical scoring, quality of reasoning." },
    { d: "Executive Target Account selected", sg: "Quality of prioritization reasoning." },
    { d: "Executive research completed", sg: "Research depth, quality of identified insight." },
    { d: "Entry Point script built", sg: "Specificity of business trigger, directness of ask." },
    { d: "Executive outreach executed", sg: "Execution evidence, outcome specificity." },
    { d: "Executive Conversation delivered", sg: "Business framing throughout, insight delivery." },
    { d: "48-hour follow-up note sent", sg: "References specific thing they said, forward implication, next step." },
    { d: "90-Day Executive Engagement Plan built", sg: "Specificity of each touch." },
    { d: "Full Program Reflection", sg: "Specificity across all 10 questions, evidence of genuine behavior change." },
  ];

  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: color, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Sprint 6 · Deliverables</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: "#18252D", marginBottom: 6 }}>What You're Building</div>
      <p style={{ fontSize: 13, color: "#757584", lineHeight: 1.6, marginBottom: 16 }}>Map executive relationships across 5 A-tier accounts. Brief one specialist. Execute 2 cross-sell conversations.</p>

      {deliverables.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#fff", border: "1px solid #D1D9E0", borderRadius: 10, padding: 14, marginBottom: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#18252D", marginBottom: 2 }}>{item.d}</div>
            <div style={{ fontSize: 11, color: "#757584" }}>Standard: {item.sg}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AISection() {
  const [copied, setCopied] = useState(null);
  const prompts = [
    { lbl: "Executive Research Brief", tpl: "Preparing for a first meeting with the [CFO/CEO/COO] of [COMPANY], a [INDUSTRY] company. Identify 3 strategic priorities, 2 risk implications, and one insight that shows I understand their business better than a typical broker." },
    { lbl: "Entry Point Script", tpl: "I want a first meeting with the [TITLE] at [COMPANY]. My existing contact is [CURRENT CONTACT]. Business trigger: [SPECIFIC TRIGGER]. Write a 3-sentence outreach: business context, specific reason, direct ask for 20 minutes." },
    { lbl: "Executive Follow-Up Note", tpl: "Just had a first executive meeting. They told me: [BRIEF SUMMARY]. Write a follow-up note under 150 words: reference one specific thing they said, add one forward-looking implication, propose one concrete next step." },
  ];

  const copy = (i, tpl) => {
    navigator.clipboard.writeText(tpl);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <div style={{ background: "#18252D", borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.cGold, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>AI Assistant</div>
        <div style={{ fontSize: 16, fontWeight: 900, color: "#fff", marginBottom: 6 }}>Executive Relationship Development Assistant</div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 14 }}>Use the Sprint 6 Claude project to map your accounts, build your entry point script, and prepare for executive conversations. Pre-loaded with the mapping framework, entry point templates, conversation structure, and 90-day rhythm tools.</p>
        <a href="https://claude.ai/project/019cafce-a4a6-7068-b813-e062edbf9397" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: color, color: "#fff", padding: "12px 20px", borderRadius: 8, fontWeight: 800, fontSize: 13, textDecoration: "none" }}>
          Open Executive Relationship Development Assistant →
        </a>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: "#18252D", marginBottom: 10 }}>Starter Prompts — Click to Copy</div>
      {prompts.map((p, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 10, padding: 14, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: color, textTransform: "uppercase", letterSpacing: ".06em" }}>{p.lbl}</div>
            <button onClick={() => copy(i, p.tpl)} style={{ background: copied === i ? "#3EBD3E" : color, color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
              {copied === i ? "Copied!" : "Copy"}
            </button>
          </div>
          <div style={{ fontSize: 12, color: "#385263", lineHeight: 1.6, fontFamily: "monospace", background: "#F4F6F9", padding: 10, borderRadius: 6 }}>{p.tpl}</div>
        </div>
      ))}
    </div>
  );
}