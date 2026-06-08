import React from "react";
import { statusColor } from "./constants";

export default function ActivitySidebar({ mod, subs, activeAct, onSetAct, onBack, progress }) {
  const isS1 = mod.id === 1;
  const isS2 = mod.id === 2;
  const isS3 = mod.id === 3;
  const isS4 = mod.id === 4;
  const isS5 = mod.id === 5;
  const isS6 = mod.id === 6;

  const learnLabel = isS1 ? "📖 Learning: See What Others Miss" : isS2 ? "📖 Learning: The Diagnostic Framework" : isS4 ? "📖 Learning: Cross-Sell Signal Recognition" : isS5 ? "📖 Learning: Renewal Strategy Session" : isS6 ? "📖 Learning: Executive Relationship Development" : "📖 Learning: Strategic Presentation Framework";
  const launchLabel = isS1 ? "🚀 Open Account Opportunity Scanner" : isS2 ? "🚀 Open Diagnostic Conversation Assistant" : isS4 ? "🚀 Open Cross-Sell Execution Assistant" : isS5 ? "🚀 Open Renewal Strategy Assistant" : isS6 ? "🚀 Open Executive Relationship Development Assistant" : "🚀 Open Strategic Presentation Assistant";

  return (
    <div style={{ width: 260, flexShrink: 0, borderRight: "1px solid #D1D9E0", overflowY: "auto", background: "#fff", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px", borderBottom: "1px solid #D1D9E0", background: mod.color + "15" }}>
        <button onClick={onBack} style={{ fontSize: 11, color: "#757584", background: "none", border: "none", cursor: "pointer", marginBottom: 6, display: "block", padding: 0 }}>← Back</button>
        <div style={{ fontWeight: 800, color: mod.color, fontSize: 13 }}>{mod.id === "capstone" ? "★ Capstone" : "Sprint " + mod.id}</div>
        <div style={{ fontSize: 11, color: "#757584", marginTop: 2, marginBottom: 10 }}>{mod.title}</div>
        <div style={{ height: 6, background: "#E3E3E3", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: progress + "%", background: mod.color, borderRadius: 99, transition: "width .4s" }} />
        </div>
        <div style={{ fontSize: 11, color: "#757584", marginTop: 4 }}>{progress}% complete</div>
      </div>
      <div style={{ padding: "8px 0", flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "6px 14px", fontSize: 10, fontWeight: 700, color: "#757584", textTransform: "uppercase", letterSpacing: ".06em" }}>Activities</div>
        {(isS1 || isS2 || isS3 || isS4 || isS5 || isS6) && (
          <>
            <SidebarBtn active={activeAct === "learn"} color={mod.color} onClick={() => onSetAct("learn")} label={learnLabel} dot={subs[`${mod.id}-learn`]?.status === "visited" ? "#3EBD3E" : "#D1D9E0"} />
            <SidebarBtn active={activeAct === "launch"} color={mod.color} onClick={() => onSetAct("launch")} label={launchLabel} dot={subs[`${mod.id}-launch`]?.status === "visited" ? "#3EBD3E" : "#D1D9E0"} />
            <SidebarBtn active={activeAct === "hyper"} color="#F3B921" onClick={() => onSetAct("hyper")} label={<>🎙️ Practice with Hyperbound <span style={{ fontSize: 9, color: "#F3B921", fontWeight: 700, marginLeft: 4 }}>Optional</span></>} />
          </>
        )}
        {mod.acts.map(a => {
          const s = subs[a.id] || {};
          return (
            <SidebarBtn key={a.id} active={activeAct === a.id} color={mod.color} onClick={() => onSetAct(a.id)}
              dot={statusColor(s.status)} label={a.lbl} />
          );
        })}
      </div>
    </div>
  );
}

function SidebarBtn({ active, color, onClick, label, dot }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", textAlign: "left", padding: "10px 14px", background: active ? color + "0a" : "transparent",
      border: "none", borderLeft: `3px solid ${active ? color : "transparent"}`, cursor: "pointer",
      display: "flex", alignItems: "flex-start", gap: 8
    }}>
      {dot !== undefined && <div style={{ width: 8, height: 8, borderRadius: "50%", background: dot, flexShrink: 0, marginTop: 4 }} />}
      <div style={{ fontSize: 11, color: active ? color : "#18252D", fontWeight: active ? 700 : 400, lineHeight: 1.4 }}>{label}</div>
    </button>
  );
}