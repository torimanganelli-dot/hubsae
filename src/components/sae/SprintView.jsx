import React from "react";
import { C, ALL_MODULES } from "./constants";
import ActivitySidebar from "./ActivitySidebar";
import StandardActivity from "./StandardActivity";
import ReflectionActivity from "./ReflectionActivity";
import S1Learning from "./S1Learning";
import S2Learning from "./S2Learning";
import S3Learning from "./S3Learning";
import S4Learning from "./S4Learning";
import S5Learning from "./S5Learning";
import S6Learning from "./S6Learning";

export default function SprintView({ mod, subs, activeAct, onSetAct, onBack, progress, onUpdateSub, userName, onNextSprint }) {
  const isS1 = mod.id === 1;
  const isS2 = mod.id === 2;
  const isS3 = mod.id === 3;
  const isS4 = mod.id === 4;
  const isS5 = mod.id === 5;
  const isS6 = mod.id === 6;
  const hasSprints = isS1 || isS2 || isS3 || isS4 || isS5 || isS6;

  // Ordered activity list for Next navigation
  const activityOrder = hasSprints
    ? ["learn", "launch", "hyper", ...mod.acts.map(a => a.id)]
    : mod.acts.map(a => a.id);

  const handleSetAct = (act) => {
    if (act === "learn" && subs[`${mod.id}-learn`]?.status !== "visited") {
      onUpdateSub(`${mod.id}-learn`, { status: "visited", module_id: String(mod.id) });
    }
    if (act === "launch" && subs[`${mod.id}-launch`]?.status !== "visited") {
      onUpdateSub(`${mod.id}-launch`, { status: "visited", module_id: String(mod.id) });
    }
    onSetAct(act);
  };

  const handleNext = () => {
    if (!activeAct) {
      handleSetAct(activityOrder[0]);
      return;
    }
    const idx = activityOrder.indexOf(activeAct);
    if (idx !== -1 && idx < activityOrder.length - 1) {
      handleSetAct(activityOrder[idx + 1]);
    }
  };

  const currentIdx = activeAct ? activityOrder.indexOf(activeAct) : -1;
  const hasNext = currentIdx !== -1 && currentIdx < activityOrder.length - 1;
  const isLastActivity = currentIdx === activityOrder.length - 1;

  // Find next sprint (sprints are 1-6, capstone comes after)
  const currentModIdx = ALL_MODULES.findIndex(m => m.id === mod.id);
  const nextMod = currentModIdx !== -1 && currentModIdx < ALL_MODULES.length - 1 ? ALL_MODULES[currentModIdx + 1] : null;

  const renderMain = () => {
    if (!activeAct) {
      return <SprintOverview mod={mod} subs={subs} onSetAct={handleSetAct} />;
    }
    if (isS1 && activeAct === "learn") return <S1Learning />;
    if (isS2 && activeAct === "learn") return <S2Learning />;
    if (isS3 && activeAct === "learn") return <S3Learning />;
    if (isS4 && activeAct === "learn") return <S4Learning />;
    if (isS5 && activeAct === "learn") return <S5Learning />;
    if (isS6 && activeAct === "learn") return <S6Learning />;
    if ((isS1 || isS2 || isS3 || isS4 || isS5 || isS6) && activeAct === "launch") return <LaunchView mod={mod} />;
    if ((isS1 || isS2 || isS3 || isS4 || isS5 || isS6) && activeAct === "hyper") return <HyperboundView mod={mod} />;
    const act = mod.acts.find(a => a.id === activeAct);
    if (!act) return <div style={{ padding: 24, color: "#757584" }}>Select an activity.</div>;
    const sub = subs[act.id] || {};
    if (act.isRef) return <ReflectionActivity mod={mod} act={act} sub={sub} onUpdate={d => onUpdateSub(act.id, d)} userName={userName} />;
    return <StandardActivity mod={mod} act={act} sub={sub} onUpdate={d => onUpdateSub(act.id, d)} allSubs={subs} userName={userName} />;
  };

  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      <ActivitySidebar mod={mod} subs={subs} activeAct={activeAct} onSetAct={handleSetAct} onBack={onBack} progress={progress} />
      <div style={{ flex: 1, overflowY: "auto", background: "#F4F6F9", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>{renderMain()}</div>
        {activeAct && (
          <div style={{ flexShrink: 0, borderTop: "1px solid #D1D9E0", background: "#fff", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <button onClick={() => onSetAct(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid #D1D9E0", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, color: "#757584", cursor: "pointer" }}>
              🏠 Sprint Home
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              {hasNext && (
                <button onClick={handleNext} style={{ display: "flex", alignItems: "center", gap: 6, background: mod.color, border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
                  Next →
                </button>
              )}
              {isLastActivity && nextMod && onNextSprint && (
                <button onClick={() => onNextSprint(nextMod.id)} style={{ display: "flex", alignItems: "center", gap: 6, background: nextMod.color, border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
                  {nextMod.id === "capstone" ? "★ Start Capstone →" : `Sprint ${nextMod.id}: ${nextMod.title} →`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SprintOverview({ mod, subs, onSetAct }) {
  const spRev = mod.acts.reduce((a, act) => a + (subs[act.id]?.revenue || 0), 0);
  const isS1 = mod.id === 1, isS2 = mod.id === 2, isS3 = mod.id === 3, isS4 = mod.id === 4, isS5 = mod.id === 5, isS6 = mod.id === 6;
  const hasLaunch = isS1 || isS2 || isS3 || isS4 || isS5 || isS6;

  const launchInfo = isS1
    ? { title: "Account Opportunity Scanner", sub: "Claude project — run your book scan" }
    : isS2
    ? { title: "Diagnostic Conversation Assistant", sub: "Claude project — prep & debrief conversations" }
    : isS3
    ? { title: "Strategic Presentation Assistant", sub: "Claude project — build & stress-test your recommendation" }
    : isS4
    ? { title: "Cross-Sell Execution Assistant", sub: "Claude project — surface signals & build briefs" }
    : isS5
    ? { title: "Renewal Strategy Assistant", sub: "Claude project — build your renewal from audit to narrative" }
    : isS6
    ? { title: "Executive Relationship Development Assistant", sub: "Claude project — map accounts & build your entry point" }
    : null;

  const tile1 = hasLaunch ? (
    <div onClick={() => onSetAct("launch")} style={{ background: mod.color + "12", border: `2px solid ${mod.color}30`, borderRadius: 12, padding: 16, cursor: "pointer" }}>
      <div style={{ fontSize: 22, marginBottom: 8 }}>🚀</div>
      <div style={{ fontSize: 16, fontWeight: 900, color: mod.color }}>Step 2: Launch</div>
      <div style={{ fontWeight: 700, color: "#18252D", fontSize: 13, marginBottom: 2 }}>{launchInfo.title}</div>
      <div style={{ fontSize: 11, color: "#757584" }}>{launchInfo.sub}</div>
    </div>
  ) : (
    <div onClick={() => onSetAct(mod.acts[0]?.id || "")} style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 12, padding: 16, cursor: "pointer" }}>
      <div style={{ fontSize: 22, marginBottom: 8 }}>🛠</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: mod.color }}>{mod.acts.length}</div>
      <div style={{ fontWeight: 700, color: "#18252D", fontSize: 13, marginBottom: 2 }}>Activities</div>
      <div style={{ fontSize: 11, color: "#757584" }}>Complete &amp; submit for AI review</div>
    </div>
  );

  return (
    <div style={{ padding: 24 }}>
      <div style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 14, padding: 24, marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: mod.color, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>{mod.id === "capstone" ? "★ Capstone" : "Sprint " + mod.id} · {mod.dur}</div>
        <div style={{ fontSize: 18, fontWeight: 900, color: "#18252D", marginBottom: 4 }}>{mod.title}</div>
        <div style={{ fontSize: 12, color: "#385263", fontStyle: "italic", marginBottom: 16 }}>{mod.sub}</div>
        <div style={{ background: mod.color + "08", borderRadius: 10, padding: 16, border: `1px solid ${mod.color}20` }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: mod.color, marginBottom: 6, textTransform: "uppercase" }}>Sprint Objective</div>
          <p style={{ fontSize: 13, color: "#18252D", lineHeight: 1.7, margin: 0 }}>{mod.obj}</p>
        </div>
      </div>
      {mod.videoUrl && (
        <div style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "12px 16px 0", fontSize: 11, fontWeight: 700, color: "#757584", textTransform: "uppercase", letterSpacing: ".06em" }}>🎬 Sprint Overview Video</div>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src={`https://player.vimeo.com/video/${mod.videoUrl}`}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: hasLaunch ? "1fr 1fr 1fr 1fr" : "1fr 1fr", gap: 10 }}>
        {hasLaunch && (
          <div onClick={() => onSetAct("learn")} style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 12, padding: 16, cursor: "pointer" }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>📖</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: mod.color }}>Step 1: Learn</div>
            <div style={{ fontWeight: 700, color: "#18252D", fontSize: 13, marginBottom: 2 }}>Learning Module</div>
            <div style={{ fontSize: 11, color: "#757584" }}>Start here — build the framework</div>
          </div>
        )}
        {tile1}
        {hasLaunch && (
          <div onClick={() => onSetAct(`${mod.id}-rf`)} style={{ background: mod.color + "12", border: `2px solid ${mod.color}30`, borderRadius: 12, padding: 16, cursor: "pointer" }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>✍️</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: mod.color }}>Step 3: Reflect</div>
            <div style={{ fontWeight: 700, color: "#18252D", fontSize: 13, marginBottom: 2 }}>Sprint Reflection</div>
            <div style={{ fontSize: 11, color: "#757584" }}>Submit your reflection for AI review</div>
          </div>
        )}
        <div style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>💰</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#3EBD3E" }}>${(spRev / 1000).toFixed(0)}K</div>
          <div style={{ fontWeight: 700, color: "#18252D", fontSize: 13, marginBottom: 2 }}>Revenue</div>
          <div style={{ fontSize: 11, color: "#757584" }}>Self-reported this sprint</div>
        </div>
      </div>
    </div>
  );
}

function LaunchView({ mod }) {
  const isS1 = mod.id === 1;
  const isS3 = mod.id === 3;
  const isS4 = mod.id === 4;
  const isS5 = mod.id === 5;
  const isS6 = mod.id === 6;
  const color = isS1 ? C.eBlue : isS3 ? C.rBlue : isS4 ? C.hGreen : isS5 ? C.cGold : isS6 ? C.sBlue : C.cLight;
  const label = isS1 ? "Sprint 1 Tool" : isS3 ? "Sprint 3 Tool" : isS4 ? "Sprint 4 Tool" : isS5 ? "Sprint 5 Tool" : isS6 ? "Sprint 6 Tool" : "Sprint 2 Tool";
  const title = isS1 ? "Account Opportunity Scanner" : isS3 ? "Strategic Presentation Assistant" : isS4 ? "Cross-Sell Execution Assistant" : isS5 ? "Renewal Strategy Assistant" : isS6 ? "Executive Relationship Development Assistant" : "Diagnostic Conversation Assistant";
  const desc = isS1
    ? "Use the designated Claude project to run your Sprint 1 account scans."
    : isS3
    ? "Use the dedicated Claude project to build and stress-test your Sprint 3 strategic recommendations. Pre-loaded with the 5-part presentation framework, Mirror Back templates, financial case builders, and decision conversation scripts."
    : isS4
    ? "Use the dedicated Claude project to execute your Sprint 4 cross-sell work. Pre-loaded with the 6 signal types, the three-part entry point framework, specialist brief templates, and objection-handling tools."
    : isS5
    ? "Use the dedicated Claude project to build your Sprint 5 renewal from audit to narrative. Pre-loaded with the 90-day audit framework, alignment question templates, premium increase scripts, and the 5-part renewal narrative structure."
    : isS6
    ? "Use the dedicated Claude project to execute your Sprint 6 executive relationship work. Pre-loaded with the 4-question mapping framework, three entry point scripts, the 5-part executive conversation structure, and the quarterly engagement rhythm."
    : "Use the dedicated Claude project to prepare and debrief your Sprint 2 diagnostic conversations. Pre-loaded with the 4-layer framework, question banks, and conversation reconstruction tools.";
  const url = isS1 ? "https://claude.ai/project/019cafc9-809b-711b-b475-43626b10183a" : isS3 ? "https://claude.ai/project/019cafcb-d7d0-71d8-a288-bdb0fa945e41" : isS4 ? "https://claude.ai/project/019cafcc-cb1a-77cf-b3a3-a632cff897b1" : isS5 ? "https://claude.ai/project/019cafcd-9c60-7559-a667-dcd2e1177f89" : isS6 ? "https://claude.ai/project/019cafce-a4a6-7068-b813-e062edbf9397" : "https://claude.ai/project/019cafca-e631-7451-ae7a-7ad8d072968e";
  const steps = isS1
    ? ["Open the Claude project using the button above.", "Paste a list of your current book of business, including account name, industry, employee count or revenue size, current lines of coverage, what you know about their business right now, changes in the last 12 months and known pain points.", "The scanner will surface signals, rank opportunities, and help you build your 1-Page Strategies.", "Once complete, return here and complete your Sprint Reflection below."]
    : isS3
    ? ["Open the Claude project using the button above.", "Paste your diagnostic notes from Sprint 2 — the client's exact words, the implication moment, and the identified gap.", "Build your Mirror Back, financial case, and 1-Page Strategic Recommendation using the framework.", "After delivering to your client, return here to complete your Sprint Reflection."]
    : isS4
    ? ["Complete the learning module first — especially the Meridian Case File — to train your signal recognition.", "Paste your notes from your top 8 accounts. The assistant will help you categorize signals and score by urgency, receptivity, and revenue.", "Build your Cross-Sell Briefs for your top 2–3 action accounts, including what NOT to do.", "After each conversation, return here to debrief and complete your Sprint Reflection."]
    : isS5
    ? ["Complete the learning module first — work through all five phases of the Renewal Strategy Session.", "Select your live A or B account renewing within 90 days. Paste your audit notes into the assistant.", "Build your Value Evidence List, internal session agenda, and proactive conversation plan.", "After executing the renewal, return here to complete your Sprint Reflection."]
    : isS6
    ? ["Complete the learning module first — work through all four capabilities: Mapping, Entry Point, Conversation, and Rhythm.", "Pull up your top 5 A-tier accounts and answer the four mapping questions for each one honestly.", "Identify your executive target account and build your entry point script using the framework.", "After executing your executive outreach and conversation, return here to complete your Sprint Reflection."]
    : ["Complete the learning module first so the framework is loaded.", "Paste your account context — client name, industry, what you already know, and the specific opportunity.", "Build your Conversation Prep Sheet: your Layer 1 opener, your Layer 3 implication question, and your definition of a successful outcome.", "After each conversation, return here to reconstruct it, score yourself by layer, and identify your personal failure mode."];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 14, padding: 24, marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>🚀 {label}</div>
        <div style={{ fontSize: 16, fontWeight: 900, color: "#18252D", marginBottom: 8 }}>{title}</div>
        <p style={{ fontSize: 13, color: "#385263", lineHeight: 1.7, margin: "0 0 20px" }}>{desc}</p>
        <a href={url} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: color, color: "#fff", padding: "14px 24px", borderRadius: 10, fontWeight: 800, fontSize: 14, textDecoration: "none" }}>
          Open {title} →
        </a>
      </div>
      <div style={{ background: color + "08", border: `1px solid ${color}20`, borderRadius: 12, padding: 18 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontSize: 12, color: "#385263", lineHeight: 1.6 }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HyperboundView({ mod }) {
  const isS1 = mod.id === 1;
  const spLabel = isS1 ? "Sprint 1 Account Opportunity Identification" : mod.id === 3 ? "Sprint 3 Strategic Account Presentation & Proposal" : mod.id === 4 ? "Sprint 4 Cross-Sell Execution" : mod.id === 5 ? "Sprint 5 Renewal Strategy" : mod.id === 6 ? "Sprint 6 Executive Relationship Development" : "Sprint 2 Diagnostic Client Conversations";
  const spCode = encodeURIComponent(spLabel);
  const benefits = ["Rehearse your opening question before the real call", "Practice the implication layer — the hardest part to do live", "Get comfortable with objections in a no-stakes environment", "Build confidence going into your Action Account conversation"];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ background: "#18252D", borderRadius: 14, padding: 22, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(243,185,33,.2)", border: "2px solid rgba(243,185,33,.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🎙️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>Optional · Before You Have the Real Conversation</div>
            <div style={{ fontSize: 15, fontWeight: 900, color: "#fff", marginBottom: 8 }}>Practice it first with Hyperbound</div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.7)", lineHeight: 1.7, margin: "0 0 16px" }}>
              Hyperbound lets you run your {spLabel} conversations in a realistic AI roleplay before you pick up the phone.
            </p>
            <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>To get access</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 600, marginBottom: 3 }}>Contact Tori Manganelli to schedule your Hyperbound session</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>HUB Sales Force Development · Hyperbound access &amp; scheduling</div>
                </div>
                <a href={`mailto:tori.manganelli@hubinternational.com?subject=Hyperbound Session Request — ${spCode}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F3B921", color: "#18252D", padding: "11px 18px", borderRadius: 8, fontWeight: 800, fontSize: 12, textDecoration: "none", flexShrink: 0 }}>✉ Email Tori to Schedule</a>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {benefits.map(t => (
                <div key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.06)", borderRadius: 8, padding: "7px 12px", margin: "0 6px 6px 0" }}>
                  <span style={{ color: "#F3B921", fontSize: 11 }}>✓</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,.7)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 12, padding: 18, marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#18252D", marginBottom: 6 }}>This step is optional</div>
        <p style={{ fontSize: 12, color: "#757584", lineHeight: 1.6, margin: 0 }}>Not every conversation requires a Hyperbound session — but if you're going into a high-stakes account meeting or working on a skill you need to develop, this is how you walk in prepared instead of hopeful.</p>
      </div>
      <div style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 12, padding: 18, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#18252D", marginBottom: 4 }}>📅 Schedule 1:1 Coaching</div>
          <div style={{ fontSize: 11, color: "#757584" }}>Book time with your HUB Sales Force Development coach</div>
        </div>
        <a href="https://outlook.office.com/bookwithme/user/64ad068b94944190b7b4a72b4d71faed@hubinternational.com/meetingtype/NUmSxOIRWEGoXREZGUJkKA2?anonymous&ep=mlink" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0678D5", color: "#fff", padding: "10px 18px", borderRadius: 8, fontWeight: 700, fontSize: 12, textDecoration: "none", flexShrink: 0 }}>Book a Session →</a>
      </div>
    </div>
  );
}