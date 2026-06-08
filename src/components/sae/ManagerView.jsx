import React, { useState, useEffect } from "react";
import { ALL_MODULES, getProgress, getTotalRevenue, getOverallProgress, statusColor } from "./constants";
import { supabase } from "@/api/supabaseClient";

const pb = (pct, color, h = 4) => (
  <div style={{ height: h, background: "#E3E3E3", borderRadius: 99, overflow: "hidden" }}>
    <div style={{ height: "100%", width: pct + "%", background: color, borderRadius: 99 }} />
  </div>
);

const Avatar = ({ name, size = 32 }) => {
  const initials = name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "??";
  return <div style={{ width: size, height: size, borderRadius: "50%", background: "#0678D5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: size * .36, flexShrink: 0 }}>{initials}</div>;
};

export default function ManagerView({ users: initialUsers, allSubs }) {
  const [detail, setDetail] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [cohorts, setCohorts] = useState([]);
  const [editModal, setEditModal] = useState(null); // { userId, name, cohort_id }
  const [selectedCohort, setSelectedCohort] = useState("all");

  useEffect(() => {
    // Fetch fresh user and cohort data on mount to pick up any cohort changes
    Promise.all([
      supabase.from("profiles").select("*").order("full_name").then(({ data }) => data || []),
      supabase.from("cohorts").select("*").order("name").then(({ data }) => data || []),
    ]).then(([freshUsers, freshCohorts]) => {
      setUsers(freshUsers);
      setCohorts(freshCohorts);
    }).catch(() => {
      setUsers(initialUsers);
    });
  }, []);

  const filteredUsers = selectedCohort === "all" ? users : users.filter(u => u.cohort_id === selectedCohort);

  const handleSaveEdit = async () => {
    const { userId, name, cohort_id } = editModal;
    await supabase.from("profiles").update({ full_name: name, cohort_id: cohort_id || null }).eq("id", userId);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, full_name: name, cohort_id } : u));
    setEditModal(null);
  };

  const fiveDaysAgo = Date.now() - 5 * 24 * 60 * 60 * 1000;

  const data = filteredUsers.map(u => {
    const s = allSubs[u.id] || {};
    const subList = Object.values(s);
    const lastActivity = subList.length > 0
      ? Math.max(...subList.map(x => new Date(x.updated_date || x.created_date || 0).getTime()))
      : 0;
    const stalled = subList.length === 0 || lastActivity < fiveDaysAgo;
    return { ...u, subs: s, rev: getTotalRevenue(s), ov: getOverallProgress(s), opps: subList.filter(x => x.status === "approved" && x.revenue > 0).length, stalled };
  });

  if (detail) {
    const u = data.find(u => u.id === detail);
    return <ManagerDetail u={u} onBack={() => setDetail(null)} />;
  }

  const tot = data.reduce((a, u) => a + u.rev, 0);
  const avg = Math.round(data.reduce((a, u) => a + u.ov, 0) / data.length);
  const st = data.filter(u => u.stalled).length;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900 }}>Manager Dashboard</div>
          <div style={{ fontSize: 13, color: "#757584" }}>{filteredUsers.length} SAEs {selectedCohort !== "all" ? `in ${cohorts.find(c => c.id === selectedCohort)?.name || "cohort"}` : "across all cohorts"}</div>
        </div>
        <select
          value={selectedCohort}
          onChange={e => setSelectedCohort(e.target.value)}
          style={{ padding: "9px 14px", borderRadius: 8, border: "1.5px solid #D1D9E0", fontSize: 13, fontWeight: 600, background: "#fff", cursor: "pointer", outline: "none" }}
        >
          <option value="all">All Cohorts</option>
          {cohorts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        {[["💰", "Total Revenue", "$" + (tot / 1000).toFixed(0) + "K", "#3EBD3E", ""], ["📊", "Avg Progress", avg + "%", "#0678D5", ""], ["👥", "Participants", users.length, "#18252D", ""], ["⚠️", "Stalled (5+ days)", st, st > 0 ? "#AC1534" : "#3EBD3E", st > 0 ? "Needs attention" : "All on track"]].map(([ic, lb, val, col, sub]) => (
          <div key={lb} style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 16, marginBottom: 6 }}>{ic}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#757584", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>{lb}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: col }}>{val}</div>
            {sub && <div style={{ fontSize: 10, color: "#757584", marginTop: 2 }}>{sub}</div>}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
        {data.map(u => (
          <div key={u.id} style={{ background: "#fff", border: `2px solid ${u.stalled ? "#AC1534" : "#D1D9E0"}`, borderRadius: 14, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <Avatar name={u.full_name} size={36} />
              <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setDetail(u.id)}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{u.full_name}</div>
                <div style={{ fontSize: 11, color: "#757584" }}>{u.email}</div>
                {u.cohort_id && cohorts.find(c => c.id === u.cohort_id) && (
                  <div style={{ fontSize: 10, color: "#0678D5", marginTop: 2 }}>📌 {cohorts.find(c => c.id === u.cohort_id).name}</div>
                )}
              </div>
              {u.stalled && <span style={{ fontSize: 10, background: "rgba(172,21,52,.12)", color: "#AC1534", padding: "3px 8px", borderRadius: 99, fontWeight: 700 }}>Stalled</span>}
              <button
                onClick={e => { e.stopPropagation(); setEditModal({ userId: u.id, name: u.full_name || "", cohort_id: u.cohort_id || "" }); }}
                style={{ background: "none", border: "1px solid #D1D9E0", borderRadius: 6, padding: "4px 8px", fontSize: 11, color: "#385263", cursor: "pointer", fontWeight: 600 }}
              >✎</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 900, color: "#3EBD3E" }}>${(u.rev / 1000).toFixed(0)}K</div><div style={{ fontSize: 10, color: "#757584" }}>Revenue</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 900, color: "#0678D5" }}>{u.ov}%</div><div style={{ fontSize: 10, color: "#757584" }}>Progress</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 18, fontWeight: 900, color: "#18252D" }}>{u.opps}</div><div style={{ fontSize: 10, color: "#757584" }}>Opps</div></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, cursor: "pointer" }} onClick={() => setDetail(u.id)}>
              {ALL_MODULES.map(m => {
                const p = getProgress(u.subs, m);
                return (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 24, fontSize: 10, color: "#757584" }}>{m.id === "capstone" ? "SC" : "S" + m.id}</div>
                    <div style={{ flex: 1 }}>{pb(p, m.color)}</div>
                    <div style={{ width: 28, fontSize: 10, fontWeight: 700, textAlign: "right", color: m.color }}>{p}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 360, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: "#18252D", marginBottom: 20 }}>Edit User</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#757584", marginBottom: 6, textTransform: "uppercase" }}>Name</div>
            <input
              autoFocus
              value={editModal.name}
              onChange={e => setEditModal(p => ({ ...p, name: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #D1D9E0", fontSize: 13, marginBottom: 16, boxSizing: "border-box", outline: "none" }}
            />
            <div style={{ fontSize: 11, fontWeight: 700, color: "#757584", marginBottom: 6, textTransform: "uppercase" }}>Cohort</div>
            <select
              value={editModal.cohort_id}
              onChange={e => setEditModal(p => ({ ...p, cohort_id: e.target.value }))}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #D1D9E0", fontSize: 13, marginBottom: 20, boxSizing: "border-box", background: "#fff" }}
            >
              <option value="">— No Cohort —</option>
              {cohorts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setEditModal(null)} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "1px solid #D1D9E0", background: "none", fontSize: 13, cursor: "pointer" }}>Cancel</button>
              <button onClick={handleSaveEdit} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", background: "#0678D5", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>Save</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 14, overflow: "hidden" }}>
      </div>
      <div style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 14, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#EEF0E2" }}>
              <th style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#757584", textTransform: "uppercase" }}>SAE</th>
              {ALL_MODULES.map(m => <th key={m.id} style={{ padding: "10px 12px", textAlign: "center", fontSize: 10, fontWeight: 700, color: m.color, textTransform: "uppercase" }}>{m.id === "capstone" ? "Cap" : "S" + m.id}</th>)}
              <th style={{ padding: "10px 12px", textAlign: "center", fontSize: 10, fontWeight: 700, color: "#757584", textTransform: "uppercase" }}>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u, ri) => (
              <tr key={u.id} style={{ borderTop: "1px solid #E3E3E3", background: ri % 2 === 0 ? "transparent" : "rgba(238,240,226,.4)" }}>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar name={u.full_name} size={24} />
                    <span style={{ fontWeight: 600, fontSize: 12 }}>{u.full_name}</span>
                  </div>
                </td>
                {ALL_MODULES.map(m => {
                  const p = getProgress(u.subs, m);
                  return <td key={m.id} style={{ padding: "12px 8px", textAlign: "center", fontSize: 12, fontWeight: 700, color: p === 100 ? "#3EBD3E" : p > 50 ? "#F3B921" : p > 0 ? "#0678D5" : "#D1D9E0" }}>{p}%</td>;
                })}
                <td style={{ padding: "12px 12px", textAlign: "center", fontWeight: 700, color: "#3EBD3E", fontSize: 12 }}>${(u.rev / 1000).toFixed(0)}K</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ManagerDetail({ u, onBack }) {
  const coach = [
    u.ov < 50 ? `📌 Engagement: Under 50% progress. Schedule a check-in: "Which activity are you most stuck on?"` : null,
    u.rev < 50000 ? `📌 Revenue tracking: Low self-reports. Ask: "Walk me through your top 3 accounts — what opportunity signals have you documented?"` : null,
    `📌 Diagnostic discipline: Ask to see their Conversation Prep Sheet. "What's your Implication question?"`,
    `📌 Commercial mindset: "Pick your top A account. What's the business situation there right now — not the coverage, the business?"`,
  ].filter(Boolean);

  return (
    <div style={{ padding: 24 }}>
      <button onClick={onBack} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #D1D9E0", background: "transparent", color: "#385263", fontSize: 12, fontWeight: 600, marginBottom: 16, cursor: "pointer" }}>← Back to overview</button>
      <div style={{ background: "#18252D", borderRadius: 14, padding: 20, display: "flex", alignItems: "center", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#0678D5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
          {u.full_name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 900, color: "#fff" }}>{u.full_name}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>{u.email}</div>
        </div>
        {[["$" + (u.rev / 1000).toFixed(0) + "K", "Revenue", "#F3B921"], [u.ov + "%", "Progress", "#00AEEF"], [u.opps, "Opps", "#3EBD3E"]].map(([v, l, c]) => (
          <div key={l} style={{ background: "rgba(255,255,255,.12)", borderRadius: 10, padding: "10px 16px", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: c }}>{v}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)" }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(6,120,213,.08)", border: "2px solid rgba(6,120,213,.25)", borderRadius: 14, padding: 18, marginBottom: 20 }}>
        <div style={{ fontWeight: 800, color: "#0678D5", fontSize: 14, marginBottom: 12 }}>✦ Manager Coaching Recommendations</div>
        {coach.map((c, i) => <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 12, fontSize: 12, color: "#18252D", border: "1px solid #D1D9E0", marginBottom: 8, lineHeight: 1.6 }}>{c}</div>)}
      </div>
      {ALL_MODULES.map(m => {
        const p = getProgress(u.subs, m);
        const app = m.acts.filter(a => u.subs[a.id]?.status === "approved").length;
        const pend = m.acts.filter(a => u.subs[a.id]?.status !== "approved").length;
        return (
          <div key={m.id} style={{ background: "#fff", border: "1px solid #D1D9E0", borderRadius: 12, padding: 16, marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: "#fff" }}>{m.id === "capstone" ? "★" : m.id}</div>
              <div style={{ flex: 1, fontWeight: 700, color: "#18252D", fontSize: 13 }}>{m.title}</div>
              <div style={{ fontWeight: 800, color: m.color, fontSize: 15 }}>{p}%</div>
            </div>
            <div style={{ height: 4, background: "#E3E3E3", borderRadius: 99, overflow: "hidden", marginBottom: 8 }}>
              <div style={{ height: "100%", width: p + "%", background: m.color, borderRadius: 99 }} />
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 11 }}>
              <span style={{ color: "#3EBD3E", fontWeight: 600 }}>✓ {app} approved</span>
              <span style={{ color: "#757584" }}>○ {pend} pending</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}