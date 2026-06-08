import React, { useMemo } from "react";
import { C, SPRINTS, CAPSTONE, ALL_MODULES, getProgress, getTotalRevenue, getOverallProgress, statusColor } from "./constants";

const pb = (pct, color, h = 6) => (
  <div style={{ height: h, background: "#E3E3E3", borderRadius: 99, overflow: "hidden" }}>
    <div style={{ height: "100%", width: pct + "%", background: color, borderRadius: 99, transition: "width .4s" }} />
  </div>
);

export default function LearnerHome({ user, subs, onOpenSprint }) {
  const ov = getOverallProgress(subs);
  const rev = getTotalRevenue(subs);
  const opps = Object.values(subs).reduce((total, sub) => {
    try {
      const parsed = JSON.parse(sub?.text || "{}");
      return total + (parseInt(parsed.oppCount) || 0);
    } catch { return total; }
  }, 0);

  // Derive top 3 opportunities from all reflection submissions
  const top3Opportunities = React.useMemo(() => {
    const results = [];
    Object.values(subs).forEach(sub => {
      try {
        const parsed = JSON.parse(sub?.text || "{}");
        if (parsed.top3) {
          parsed.top3.forEach(entry => {
            if (!entry) return;
            if (typeof entry === "string" && entry.trim()) {
              results.push({ account: entry.trim(), type: "", revenue: "", signal: "" });
            } else if (typeof entry === "object" && (entry.account || entry.signal)) {
              results.push(entry);
            }
          });
        }
      } catch {}
    });
    const parseRevenue = (r) => parseFloat(String(r || "0").replace(/[^0-9.]/g, "")) || 0;
    return results
      .filter(o => o.account || o.signal)
      .sort((a, b) => parseRevenue(b.revenue) - parseRevenue(a.revenue))
      .slice(0, 3);
  }, [subs]);

  const initials = user?.full_name?.split(" ").filter(Boolean).map(n => n[0]).join("").slice(0, 2).toUpperCase() || user?.email?.slice(0, 2).toUpperCase() || "??";

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto", width: "100%" }}>
      <div style={{ background: "#18252D", borderRadius: 16, padding: 24, marginBottom: 20, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#0678D5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, flexShrink: 0 }}>{initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>Welcome back</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{user?.full_name || user?.email || "SAE"}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>{user?.email}</div>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[["Overall", ov + "%", "#00AEEF"], ["Revenue", "$" + (rev / 1000).toFixed(0) + "K", "#F3B921"], ["Opps", opps, "#3EBD3E"]].map(([l, v, col]) => (
            <div key={l} style={{ background: "rgba(255,255,255,.12)", borderRadius: 12, padding: "12px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: col }}>{v}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 15, fontWeight: 800, color: "#18252D", marginBottom: 12 }}>Your Learning Path</div>
      {SPRINTS.map(s => {
        const pct = getProgress(subs, s);
        const active = pct > 0 && pct < 100;
        return (
          <div key={s.id} onClick={() => onOpenSprint(s.id)} style={{ background: "#fff", border: `2px solid ${active ? s.color : "#D1D9E0"}`, borderRadius: 14, padding: 18, cursor: "pointer", marginBottom: 10, transition: "border-color .2s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: pct === 100 ? s.color : s.color + "28", color: pct === 100 ? "#fff" : s.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14 }}>{pct === 100 ? "✓" : s.id}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: "#18252D", fontSize: 14 }}>{s.title}</div>
                <div style={{ fontSize: 11, color: "#757584" }}>{s.sub} · {s.dur}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 900, color: s.color }}>{pct}%</div>
            </div>
            {pb(pct, s.color)}
          </div>
        );
      })}

      <div onClick={() => onOpenSprint("capstone")} style={{ background: "#18252D", border: "2px solid rgba(243,185,33,.4)", borderRadius: 14, padding: 18, cursor: "pointer", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(243,185,33,.25)", color: "#F3B921", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>★</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, color: "#fff", fontSize: 14 }}>{CAPSTONE.title}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>{CAPSTONE.sub}</div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#F3B921" }}>{getProgress(subs, CAPSTONE)}%</div>
        </div>
        {pb(getProgress(subs, CAPSTONE), "#F3B921")}
      </div>

      <div style={{ fontSize: 15, fontWeight: 800, color: "#18252D", marginBottom: 12 }}>🎯 Top 3 Opportunities</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {top3Opportunities.length === 0 ? (
          <div style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 14, padding: 20, fontSize: 12, color: "#757584", textAlign: "center" }}>
            Complete a Sprint Reflection to populate your top opportunities here.
          </div>
        ) : (
          top3Opportunities.map((opp, i) => {
            const rankColors = ["#F3B921", "#C0C0C0", "#CD7F32"];
            const rankBg = ["#18252D", "#2A3540", "#323F47"];
            const medals = ["🥇", "🥈", "🥉"];
            return (
              <div key={i} style={{ background: "#fff", border: `1px solid ${i === 0 ? "rgba(243,185,33,.4)" : "#D1D9E0"}`, borderRadius: 14, overflow: "hidden", boxShadow: i === 0 ? "0 2px 12px rgba(243,185,33,.12)" : "none" }}>
                <div style={{ display: "flex", alignItems: "stretch" }}>
                  {/* Rank badge */}
                  <div style={{ width: 52, background: rankBg[i], display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, flexShrink: 0, padding: "14px 0" }}>
                    <div style={{ fontSize: 18 }}>{medals[i]}</div>
                    <div style={{ fontSize: 10, fontWeight: 900, color: rankColors[i], letterSpacing: ".04em" }}>#{i + 1}</div>
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                      <span style={{ fontWeight: 900, fontSize: 14, color: "#18252D" }}>{opp.account || "—"}</span>
                      {opp.type && (
                        <span style={{ fontSize: 11, fontWeight: 700, background: C.eBlue + "15", color: C.eBlue, borderRadius: 5, padding: "2px 8px" }}>{opp.type}</span>
                      )}
                    </div>
                    {opp.signal && (
                      <div style={{ fontSize: 12, color: "#557585", lineHeight: 1.5, marginBottom: opp.revenue ? 8 : 0 }}>{opp.signal}</div>
                    )}
                    {opp.revenue && (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#3EBD3E12", border: "1px solid #3EBD3E30", borderRadius: 6, padding: "3px 10px" }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "#3EBD3E" }}>Est. ${opp.revenue}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}