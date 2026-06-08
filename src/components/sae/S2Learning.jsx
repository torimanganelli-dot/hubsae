import React, { useState } from "react";
import { S2_LAYERS } from "./S2Layers";

export default function S2Learning() {
  const [phase, setPhase] = useState("intro");
  const [layer, setLayer] = useState(0);
  const [sel, setSel] = useState(null);
  const [showR, setShowR] = useState(false);
  const [showQ, setShowQ] = useState(false);
  const [done, setDone] = useState([]);

  const goNext = () => {
    if (layer < S2_LAYERS.length - 1) {
      setDone(prev => [...prev, layer]);
      setLayer(prev => prev + 1);
      setSel(null); setShowR(false); setShowQ(false);
    } else {
      setPhase("done");
    }
  };

  if (phase === "intro") {
    return (
      <div style={{ background: "#0F172A", minHeight: "100%", padding: "32px 24px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ color: "#94A3B8", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>Sprint 2 · Account Executives</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#F8FAFC", lineHeight: 1.2, marginBottom: 14 }}>The Diagnostic Conversation Framework</div>
          <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.7, margin: "0 0 20px" }}>Most AEs show up with answers. Strategic advisors show up with questions. This module teaches you a four-layer conversation structure that moves any client from surface-level renewal discussion to genuine, self-identified need.</p>
          <div style={{ background: "#1E293B", borderRadius: 12, padding: "18px 20px", marginBottom: 24, borderLeft: "3px solid #2563EB" }}>
            <div style={{ color: "#CBD5E1", fontSize: 11, fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em" }}>Your client for this module</div>
            <div style={{ color: "#F1F5F9", fontSize: 13, lineHeight: 1.6 }}><strong style={{ color: "#fff" }}>Marcus</strong>, CFO of a regional logistics company. 250 employees. You've held their commercial lines account for three years. Renewal is 60 days out. He's always been cordial but transactional.</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {S2_LAYERS.map(l => (
              <div key={l.id} style={{ background: "#1E293B", borderRadius: 8, padding: "7px 12px", fontSize: 11, color: "#94A3B8", border: "1px solid #334155" }}>{l.badge.split(":")[0]}</div>
            ))}
          </div>
          <button onClick={() => setPhase("layer")} style={{ width: "100%", background: "#2563EB", color: "#fff", border: "none", borderRadius: 8, padding: 14, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Start Module →</button>
        </div>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div style={{ background: "#0F172A", minHeight: "100%", padding: "40px 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>✓</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#F8FAFC", marginBottom: 12 }}>Module Complete</div>
          <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.7, margin: "0 0 24px" }}>You've worked through all four layers of the Diagnostic Conversation Framework with Marcus — without pitching a single product. He sold himself.</p>
          <div style={{ background: "#1E293B", borderRadius: 12, padding: 20, textAlign: "left", marginBottom: 24 }}>
            <div style={{ color: "#94A3B8", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 12 }}>Your next step</div>
            {["Book a real client conversation this week and run the framework.", "After the meeting, score yourself on each layer: 1 (skipped), 2 (partial), 3 (strong).", "The layer most AEs score lowest on: Implication. If that's you — add one more implication question before moving to solutions."].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                <div style={{ background: "#2563EB", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.5 }}>{s}</div>
              </div>
            ))}
          </div>
          <button onClick={() => { setPhase("intro"); setLayer(0); setSel(null); setShowR(false); setShowQ(false); setDone([]); }} style={{ background: "#1E293B", color: "#94A3B8", border: "1px solid #334155", borderRadius: 8, padding: "10px 20px", fontSize: 13, cursor: "pointer" }}>Restart Module</button>
        </div>
      </div>
    );
  }

  const l = S2_LAYERS[layer];
  return (
    <div style={{ background: "#0F172A", minHeight: "100%", padding: "24px 20px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
          {S2_LAYERS.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: done.includes(i) || i === layer ? "#2563EB" : "#1E293B", opacity: done.includes(i) ? 1 : i === layer ? .7 : .3 }} />
          ))}
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: l.col, fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>{l.badge}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#F8FAFC", marginBottom: 16 }}>{l.title}</div>
          {[{ lbl: "Your goal", txt: l.goal }, { lbl: "Listen for", txt: l.listen }, { lbl: "The trap", txt: l.trap }].map(x => (
            <div key={x.lbl} style={{ background: "#1E293B", borderRadius: 10, padding: "13px 15px", marginBottom: 8 }}>
              <span style={{ color: "#64748B", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em" }}>{x.lbl} </span>
              <span style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.6 }}>{x.txt}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#1E293B", border: `1px solid ${l.bd}`, borderRadius: 12, padding: 18, marginBottom: 18 }}>
          <div style={{ color: l.col, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Scenario</div>
          <p style={{ color: "#F1F5F9", fontSize: 13, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>{l.scenario}</p>
        </div>
        {l.choices.map((c, i) => {
          const isSel = sel === i, rev = sel !== null;
          let bg = "#1E293B", bd = "#334155", tc = "#CBD5E1";
          if (rev && isSel && c.ok) { bg = "#052E16"; bd = "#166534"; tc = "#D1FAE5"; }
          if (rev && isSel && !c.ok) { bg = "#2D1515"; bd = "#991B1B"; tc = "#FECACA"; }
          if (rev && !isSel && c.ok) { bg = "#052E16"; bd = "#166534"; tc = "#D1FAE5"; }
          return (
            <div key={i} onClick={() => sel === null && setSel(i)} style={{ background: bg, border: `1px solid ${bd}`, borderRadius: 10, padding: 16, cursor: sel !== null ? "default" : "pointer", marginBottom: 10 }}>
              <div style={{ color: tc, fontSize: 13, lineHeight: 1.6, marginBottom: rev && isSel ? 10 : 0 }}>{c.t}</div>
              {rev && isSel && <div style={{ color: c.ok ? "#6EE7B7" : "#FCA5A5", fontSize: 12, lineHeight: 1.6, borderTop: `1px solid ${bd}`, paddingTop: 10 }}>{c.fb}</div>}
            </div>
          );
        })}
        {sel !== null && !showR && (
          <button onClick={() => setShowR(true)} style={{ width: "100%", background: l.bd + "30", border: `1px solid ${l.bd}`, borderRadius: 10, padding: 13, fontSize: 13, fontWeight: 600, color: l.col, cursor: "pointer", marginBottom: 12 }}>See how Marcus responds →</button>
        )}
        {showR && (
          <div style={{ background: "#1E293B", borderRadius: 12, padding: 18, marginBottom: 12, borderLeft: `3px solid ${l.col}` }}>
            <div style={{ color: "#64748B", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>Marcus responds:</div>
            <p style={{ color: "#F1F5F9", fontSize: 13, lineHeight: 1.7, fontStyle: "italic", margin: "0 0 14px", whiteSpace: "pre-line" }}>"{l.rQuote}"</p>
            <div style={{ borderTop: "1px solid #334155", paddingTop: 12, marginBottom: 10 }}>
              <div style={{ color: "#64748B", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>What just happened</div>
              {l.breakdown.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                  <span style={{ color: l.col, fontSize: 14, flexShrink: 0 }}>→</span>
                  <div style={{ color: "#94A3B8", fontSize: 12, lineHeight: 1.5 }}>{b}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#0F172A", borderRadius: 8, padding: "11px 13px" }}>
              <div style={{ color: "#CBD5E1", fontSize: 12, lineHeight: 1.6 }}>{l.note}</div>
            </div>
          </div>
        )}
        {showR && !showQ && (
          <button onClick={() => setShowQ(true)} style={{ width: "100%", background: "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: 13, fontSize: 13, fontWeight: 600, color: "#94A3B8", cursor: "pointer", marginBottom: 12 }}>See question bank for this layer →</button>
        )}
        {showQ && (
          <div style={{ background: "#1E293B", borderRadius: 12, padding: 18, marginBottom: 16 }}>
            <div style={{ color: "#64748B", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Question bank · {l.badge.split(":")[0]}</div>
            {l.qs.map((q, i) => (
              <div key={i} style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.6, marginBottom: 10, paddingLeft: 12, borderLeft: "2px solid #334155" }}>{q}</div>
            ))}
          </div>
        )}
        {showQ && (
          <button onClick={goNext} style={{ width: "100%", background: "#2563EB", color: "#fff", border: "none", borderRadius: 10, padding: 14, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            {layer < S2_LAYERS.length - 1 ? `Continue to Layer ${layer + 2} →` : "Complete Module →"}
          </button>
        )}
      </div>
    </div>
  );
}