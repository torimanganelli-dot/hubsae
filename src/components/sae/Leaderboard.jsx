import React, { useState } from "react";
import { getTotalRevenue, getOverallProgress, ALL_MODULES, getProgress } from "./constants";

const pb = (pct, color, h = 4) => (
  <div style={{ height: h, background: "#E3E3E3", borderRadius: 99, overflow: "hidden" }}>
    <div style={{ height: "100%", width: pct + "%", background: color, borderRadius: 99 }} />
  </div>
);

const Avatar = ({ name, size = 32 }) => {
  const initials = name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "??";
  return <div style={{ width: size, height: size, borderRadius: "50%", background: "#0678D5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * .36, flexShrink: 0 }}>{initials}</div>;
};

export default function Leaderboard({ users, allSubs, currentUserId }) {
  const [tab, setTab] = useState("revenue");
  const [period, setPeriod] = useState("total");

  // Find current user's cohort and filter to same cohort
  const currentUser = users.find(u => u.id === currentUserId);
  const cohortUsers = currentUser?.cohort_id
    ? users.filter(u => u.cohort_id === currentUser.cohort_id)
    : users;

  const ranked = cohortUsers.filter(u => u.full_name?.trim()).map(u => {
    const s = allSubs[u.id] || {};
    const opps = Object.values(s).reduce((total, sub) => {
      try { const parsed = JSON.parse(sub?.text || "{}"); return total + (parseInt(parsed.oppCount) || 0); } catch { return total; }
    }, 0);
    return { ...u, revenue: getTotalRevenue(s), sprints: getOverallProgress(s), opps };
  }).sort((a, b) => tab === "revenue" ? b.revenue - a.revenue : tab === "activity" ? b.acts - a.acts : tab === "opps" ? b.opps - a.opps : b.sprints - a.sprints);

  const medals = ["🥇", "🥈", "🥉"];
  const getVal = (u) => tab === "revenue" ? "$" + (u.revenue / 1000).toFixed(0) + "K" : tab === "opps" ? u.opps + " opps" : u.sprints + "%";

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 900 }}>Leaderboard</div>
        <div style={{ fontSize: 13, color: "#757584" }}>Live rankings across the cohort</div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 4, background: "#EEF0E2", borderRadius: 10, padding: 4 }}>
          {[["revenue", "💰 Revenue"], ["opps", "🎯 Opportunities"], ["sprint", "📊 Sprint Progress"]].map(([id, lbl]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: tab === id ? "#fff" : "transparent", color: tab === id ? "#18252D" : "#757584", fontWeight: tab === id ? 700 : 500, fontSize: 11, cursor: "pointer", boxShadow: tab === id ? "0 1px 3px rgba(0,0,0,.1)" : "none" }}>{lbl}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4, background: "#EEF0E2", borderRadius: 10, padding: 4 }}>
          {["monthly", "quarterly", "total"].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: period === p ? "#fff" : "transparent", color: period === p ? "#18252D" : "#757584", fontWeight: period === p ? 700 : 500, fontSize: 11, cursor: "pointer", textTransform: "capitalize", boxShadow: period === p ? "0 1px 3px rgba(0,0,0,.1)" : "none" }}>{p}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
        {ranked.slice(0, 3).map((u, i) => (
          <div key={u.id} style={{ borderRadius: 14, padding: 18, textAlign: "center", border: `2px solid ${i === 0 ? "rgba(243,185,33,.6)" : "#D1D9E0"}`, background: i === 0 ? "#18252D" : "#fff" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{medals[i]}</div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><Avatar name={u.full_name} size={40} /></div>
            <div style={{ fontWeight: 800, color: i === 0 ? "#fff" : "#18252D", marginTop: 8, fontSize: 14 }}>{u.full_name}</div>
            <div style={{ fontSize: 10, color: i === 0 ? "rgba(255,255,255,.5)" : "#757584", marginBottom: 10 }}>{u.email}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: i === 0 ? "#F3B921" : "#0678D5" }}>{getVal(u)}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "12px 18px", background: "#EEF0E2", display: "grid", gridTemplateColumns: "40px 1fr 100px 90px 100px", gap: 8, fontSize: 10, fontWeight: 700, color: "#757584", textTransform: "uppercase" }}>
          <div>#</div><div>Name</div><div>Revenue</div><div>Opps</div><div>Progress</div>
        </div>
        {ranked.map((u, i) => (
          <div key={u.id} style={{ padding: "14px 18px", borderTop: "1px solid #E3E3E3", display: "grid", gridTemplateColumns: "40px 1fr 100px 90px 100px", gap: 8, alignItems: "center", background: u.id === currentUserId ? "rgba(6,120,213,.06)" : "transparent" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: i < 3 ? "#F3B921" : "#757584" }}>{i + 1}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar name={u.full_name} size={28} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{u.full_name}{u.id === currentUserId && <span style={{ fontSize: 10, color: "#0678D5", fontWeight: 700, marginLeft: 4 }}>(You)</span>}</div>
                <div style={{ fontSize: 10, color: "#757584" }}>{u.email}</div>
              </div>
            </div>
            <div style={{ fontWeight: 800, fontSize: 13, color: "#3EBD3E" }}>${(u.revenue / 1000).toFixed(0)}K</div>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#F3B921" }}>{u.opps}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#0678D5", marginBottom: 4 }}>{u.sprints}%</div>
              {pb(u.sprints, "#0678D5")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}