import React, { useState, useEffect } from "react";
import { supabase } from "@/api/supabaseClient";

export default function CohortAdmin() {
  const [cohorts, setCohorts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newCohortName, setNewCohortName] = useState("");
  const [newCohortDesc, setNewCohortDesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingName, setEditingName] = useState({});

  useEffect(() => {
    const load = async () => {
      const [{ data: c }, { data: u }] = await Promise.all([
        supabase.from("cohorts").select("*").order("name"),
        supabase.from("profiles").select("*").order("full_name"),
      ]);
      setCohorts(c || []);
      setUsers(u || []);
      setLoading(false);
    };
    load();
  }, []);

  const handleCreateCohort = async () => {
    if (!newCohortName.trim()) return;
    setSaving(true);
    const { data: created } = await supabase
      .from("cohorts")
      .insert({ name: newCohortName.trim(), description: newCohortDesc.trim() })
      .select()
      .single();
    setCohorts(prev => [...prev, created]);
    setNewCohortName("");
    setNewCohortDesc("");
    setSaving(false);
  };

  const handleDeleteCohort = async (id) => {
    await supabase.from("cohorts").delete().eq("id", id);
    setCohorts(prev => prev.filter(c => c.id !== id));
    // Unassign users from the deleted cohort
    const affected = users.filter(u => u.cohort_id === id);
    await Promise.all(
      affected.map(u =>
        supabase.from("profiles").update({ cohort_id: null }).eq("id", u.id)
      )
    );
    setUsers(prev => prev.map(u => u.cohort_id === id ? { ...u, cohort_id: null } : u));
  };

  const handleAssignCohort = async (userId, cohortId) => {
    await supabase.from("profiles").update({ cohort_id: cohortId || null }).eq("id", userId);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, cohort_id: cohortId } : u));
  };

  const handleSaveName = async (userId) => {
    const name = editingName[userId]?.trim();
    if (!name) return;
    await supabase.from("profiles").update({ full_name: name }).eq("id", userId);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, full_name: name } : u));
    setEditingName(prev => { const n = { ...prev }; delete n[userId]; return n; });
  };

  if (loading) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F6F9", fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <div style={{ color: "#757584", fontSize: 14 }}>Loading…</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#F4F6F9", fontFamily: "system-ui,-apple-system,sans-serif", padding: 32 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#0678D5", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 6 }}>Admin</div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#18252D" }}>Cohort Management</div>
          <div style={{ fontSize: 13, color: "#757584", marginTop: 4 }}>Create cohorts and assign users to them.</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
          {/* Left: Create + List Cohorts */}
          <div>
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #D1D9E0", marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#18252D", marginBottom: 16 }}>Create New Cohort</div>
              <input
                value={newCohortName}
                onChange={e => setNewCohortName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleCreateCohort()}
                placeholder="Cohort name (e.g. Spring 2025)"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #D1D9E0", fontSize: 13, marginBottom: 10, boxSizing: "border-box", outline: "none" }}
              />
              <input
                value={newCohortDesc}
                onChange={e => setNewCohortDesc(e.target.value)}
                placeholder="Description (optional)"
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #D1D9E0", fontSize: 13, marginBottom: 12, boxSizing: "border-box", outline: "none" }}
              />
              <button
                onClick={handleCreateCohort}
                disabled={!newCohortName.trim() || saving}
                style={{ width: "100%", padding: "11px", borderRadius: 8, border: "none", background: newCohortName.trim() ? "#0678D5" : "#D1D9E0", color: "#fff", fontWeight: 800, fontSize: 13, cursor: newCohortName.trim() ? "pointer" : "default" }}
              >
                {saving ? "Creating…" : "+ Create Cohort"}
              </button>
            </div>

            <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #D1D9E0" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#18252D", marginBottom: 16 }}>Cohorts ({cohorts.length})</div>
              {cohorts.length === 0 && <div style={{ fontSize: 12, color: "#757584" }}>No cohorts yet.</div>}
              {cohorts.map(c => (
                <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 8, background: "#F4F6F9", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#18252D" }}>{c.name}</div>
                    {c.description && <div style={{ fontSize: 11, color: "#757584" }}>{c.description}</div>}
                    <div style={{ fontSize: 11, color: "#0678D5", marginTop: 2 }}>
                      {users.filter(u => u.cohort_id === c.id).length} member(s)
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteCohort(c.id)}
                    style={{ background: "none", border: "1px solid #D1D9E0", borderRadius: 6, padding: "5px 10px", fontSize: 11, color: "#AC1534", cursor: "pointer", fontWeight: 700 }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Assign users */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, border: "1px solid #D1D9E0" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#18252D", marginBottom: 16 }}>Assign Users to Cohorts</div>
            {users.length === 0 && <div style={{ fontSize: 12, color: "#757584" }}>No users found.</div>}
            {users.map(u => {
              const isEditing = editingName[u.id] !== undefined;
              return (
                <div key={u.id} style={{ padding: "10px 0", borderBottom: "1px solid #F4F6F9" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      {isEditing ? (
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <input
                            autoFocus
                            value={editingName[u.id]}
                            onChange={e => setEditingName(prev => ({ ...prev, [u.id]: e.target.value }))}
                            onKeyDown={e => {
                              if (e.key === "Enter") handleSaveName(u.id);
                              if (e.key === "Escape") setEditingName(prev => { const n = { ...prev }; delete n[u.id]; return n; });
                            }}
                            style={{ padding: "5px 8px", borderRadius: 6, border: "1.5px solid #0678D5", fontSize: 13, outline: "none", width: 160 }}
                          />
                          <button onClick={() => handleSaveName(u.id)} style={{ padding: "5px 10px", borderRadius: 6, border: "none", background: "#0678D5", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Save</button>
                          <button onClick={() => setEditingName(prev => { const n = { ...prev }; delete n[u.id]; return n; })} style={{ padding: "5px 8px", borderRadius: 6, border: "1px solid #D1D9E0", background: "none", fontSize: 11, cursor: "pointer" }}>✕</button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#18252D" }}>{u.full_name || u.email}</div>
                          <button onClick={() => setEditingName(prev => ({ ...prev, [u.id]: u.full_name || "" }))} style={{ background: "none", border: "none", color: "#0678D5", fontSize: 11, cursor: "pointer", padding: "2px 4px" }}>✎</button>
                        </div>
                      )}
                      <div style={{ fontSize: 11, color: "#757584" }}>{u.email}</div>
                    </div>
                    <select
                      value={u.cohort_id || ""}
                      onChange={e => handleAssignCohort(u.id, e.target.value)}
                      style={{ padding: "7px 10px", borderRadius: 8, border: "1.5px solid #D1D9E0", fontSize: 12, color: "#18252D", background: "#fff", cursor: "pointer" }}
                    >
                      <option value="">— No Cohort —</option>
                      {cohorts.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
