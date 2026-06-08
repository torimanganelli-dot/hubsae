import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/api/supabaseClient";
import { useAuth } from "@/lib/AuthContext";
import { ALL_MODULES, getProgress } from "@/components/sae/constants";
import LearnerHome from "@/components/sae/LearnerHome";
import SprintView from "@/components/sae/SprintView";
import ManagerView from "@/components/sae/ManagerView";
import Leaderboard from "@/components/sae/Leaderboard";
import PostCapstone from "@/components/sae/PostCapstone";
import WelcomeVideoModal, { shouldShowWelcomeVideo } from "@/components/sae/WelcomeVideoModal";

export default function Home() {
  const { user, isLoadingAuth, logout, signIn, signUp, refreshUser } = useAuth();

  const [topView, setTopView] = useState("learner");
  const [activeMod, setActiveMod] = useState(null);
  const [activeAct, setActiveAct] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allSubs, setAllSubs] = useState({});
  const [loading, setLoading] = useState(true);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [roleInput, setRoleInput] = useState("user");
  const [savingName, setSavingName] = useState(false);

  const [authMode, setAuthMode] = useState("signin");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const loadAllDataDebounced = useRef(null);

  const loadAllData = async () => {
    try {
      const res = await fetch("/api/leaderboard");
      const { users, subs } = await res.json();
      setAllUsers(users || []);
      const grouped = {};
      for (const sub of (subs || [])) {
        if (!grouped[sub.user_id]) grouped[sub.user_id] = {};
        grouped[sub.user_id][sub.activity_id] = sub;
      }
      setAllSubs(grouped);
    } catch (e) {
      console.error("loadAllData error:", e);
    }
  };

  useEffect(() => {
    if (!isLoadingAuth) {
      if (user) {
        loadAllData().then(() => {
          setLoading(false);
          if (user.full_name?.trim() && shouldShowWelcomeVideo()) {
            setShowWelcomeVideo(true);
          }
        });
      } else {
        setLoading(false);
      }
    }
  }, [isLoadingAuth, user]);

  const myId = user?.id;
  const mySubs = allSubs[myId] || {};

  const handleAuth = async () => {
    if (!authEmail.trim() || !authPassword.trim()) return;
    setAuthError("");
    setAuthLoading(true);
    try {
      if (authMode === "signin") {
        await signIn(authEmail.trim(), authPassword.trim());
      } else {
        await signUp(authEmail.trim(), authPassword.trim());
        setAuthError("Account created! You can now sign in.");
        setAuthMode("signin");
      }
    } catch (e) {
      setAuthError(e.message || "Authentication failed. Please try again.");
    }
    setAuthLoading(false);
  };

  const handleUpdateSub = async (actId, data) => {
    const modFound = ALL_MODULES.find(m => m.acts.find(a => a.id === actId));
    const existing = allSubs[myId]?.[actId];
    const payload = {
      ...data,
      activity_id: actId,
      module_id: String(modFound?.id),
      user_id: myId,
      user_name: user?.full_name,
    };
    let saved;
    if (existing?.id) {
      const { data: updated } = await supabase.from("submissions").update(payload).eq("id", existing.id).select().single();
      saved = updated;
    } else {
      const { data: created } = await supabase.from("submissions").insert(payload).select().single();
      saved = created;
    }
    setAllSubs(prev => ({ ...prev, [myId]: { ...(prev[myId] || {}), [actId]: saved } }));
    if (loadAllDataDebounced.current) clearTimeout(loadAllDataDebounced.current);
    loadAllDataDebounced.current = setTimeout(() => loadAllData(), 2000);
  };

  const handleSaveName = async () => {
    if (!nameInput.trim()) return;
    setSavingName(true);
    await supabase.from("profiles").upsert({ id: myId, email: user.email, full_name: nameInput.trim(), role: roleInput });
    await refreshUser();
    setSavingName(false);
    if (shouldShowWelcomeVideo()) setShowWelcomeVideo(true);
    await loadAllData();
  };

  const handleOpenSprint = (modId) => { setActiveMod(modId); setActiveAct(null); };
  const handleBack = () => { setActiveMod(null); setActiveAct(null); };
  const mod = activeMod ? ALL_MODULES.find(m => m.id == activeMod) : null;
  const progress = mod ? getProgress(mySubs, mod) : 0;
  const isAdmin = user?.role === "admin";
  const navTabs = [
    { id: "learner", label: "My Learning" },
    { id: "postcapstone", label: "Post-Capstone" },
    ...(isAdmin ? [{ id: "manager", label: "Manager View" }] : []),
    { id: "leaderboard", label: "Leaderboard" },
  ];

  if (loading || isLoadingAuth) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F6F9" }}>
        <div style={{ color: "#757584", fontSize: 14 }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F6F9", fontFamily: "system-ui,-apple-system,sans-serif" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 36, maxWidth: 400, width: "90%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#0678D5", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 24 }}>👋</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#18252D", marginBottom: 6 }}>
            {authMode === "signin" ? "Sign in" : "Create account"}
          </div>
          <div style={{ fontSize: 13, color: "#757584", marginBottom: 24 }}>
            {authMode === "signin" ? "Enter your email and password to continue." : "Create your account to get started."}
          </div>
          <input
            type="email"
            value={authEmail}
            onChange={e => { setAuthEmail(e.target.value); setAuthError(""); }}
            placeholder="Work email"
            autoFocus
            style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "2px solid #D1D9E0", fontSize: 15, marginBottom: 12, outline: "none", boxSizing: "border-box" }}
          />
          <input
            type="password"
            value={authPassword}
            onChange={e => { setAuthPassword(e.target.value); setAuthError(""); }}
            onKeyDown={e => e.key === "Enter" && handleAuth()}
            placeholder="Password"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "2px solid #D1D9E0", fontSize: 15, marginBottom: 12, outline: "none", boxSizing: "border-box" }}
          />
          {authError && (
            <div style={{ fontSize: 12, color: authError.includes("created") ? "#1A6B3A" : "#AC1534", marginBottom: 12 }}>
              {authError}
            </div>
          )}
          <button
            onClick={handleAuth}
            disabled={!authEmail.trim() || !authPassword.trim() || authLoading}
            style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: (authEmail.trim() && authPassword.trim()) ? "#0678D5" : "#D1D9E0", color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer", marginBottom: 12 }}
          >
            {authLoading ? "Please wait..." : authMode === "signin" ? "Sign In" : "Create Account"}
          </button>
          <div style={{ fontSize: 12, color: "#757584" }}>
            {authMode === "signin" ? (
              <span>No account? <span onClick={() => { setAuthMode("signup"); setAuthError(""); }} style={{ color: "#0678D5", cursor: "pointer", fontWeight: 700 }}>Create one</span></span>
            ) : (
              <span>Have an account? <span onClick={() => { setAuthMode("signin"); setAuthError(""); }} style={{ color: "#0678D5", cursor: "pointer", fontWeight: 700 }}>Sign in</span></span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!user?.full_name?.trim()) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F6F9", fontFamily: "system-ui,-apple-system,sans-serif" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 36, maxWidth: 400, width: "90%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#18252D", marginBottom: 6 }}>Complete your profile</div>
          <div style={{ fontSize: 13, color: "#757584", marginBottom: 24 }}>Enter your name to continue.</div>
          <input
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSaveName()}
            placeholder="Full Name (First Last)"
            autoFocus
            style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "2px solid #D1D9E0", fontSize: 15, marginBottom: 12, outline: "none", boxSizing: "border-box" }}
          />
          <select
            value={roleInput}
            onChange={e => setRoleInput(e.target.value)}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "2px solid #D1D9E0", fontSize: 15, marginBottom: 16, outline: "none", boxSizing: "border-box", background: "#fff" }}
          >
            <option value="user">Participant</option>
            <option value="admin">Manager</option>
          </select>
          <button
            onClick={handleSaveName}
            disabled={!nameInput.trim() || savingName}
            style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: nameInput.trim() ? "#0678D5" : "#D1D9E0", color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer" }}
          >
            {savingName ? "Saving..." : "Get Started"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showWelcomeVideo && <WelcomeVideoModal onClose={() => setShowWelcomeVideo(false)} />}
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F4F6F9", fontFamily: "system-ui,-apple-system,sans-serif", fontSize: 14 }}>
        <div style={{ background: "#18252D", height: 52, display: "flex", alignItems: "center", padding: "0 20px", gap: 16, flexShrink: 0, borderBottom: "2px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#00AEEF,#0678D5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff" }} />
            </div>
            <span style={{ fontWeight: 900, color: "#fff", fontSize: 17, letterSpacing: ".04em" }}>HUB</span>
            <span style={{ color: "rgba(255,255,255,.3)", margin: "0 6px" }}>|</span>
            <span style={{ color: "rgba(255,255,255,.5)", fontSize: 11, fontWeight: 600 }}>SAE Growth Engine</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: 3 }}>
            {navTabs.map(t => (
              <button key={t.id} onClick={() => { setTopView(t.id); if (t.id !== "learner") { setActiveMod(null); setActiveAct(null); } }}
                style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: topView === t.id ? "#fff" : "transparent", color: topView === t.id ? "#18252D" : "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: topView === t.id ? 700 : 500, cursor: "pointer" }}>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0678D5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, border: "2px solid #F3B921" }}>
              {user.full_name?.split(" ").filter(Boolean).map(n => n[0]).join("").slice(0, 2).toUpperCase() || "??"}
            </div>
            <button onClick={logout} style={{ background: "none", border: "1px solid rgba(255,255,255,.2)", borderRadius: 6, color: "rgba(255,255,255,.5)", fontSize: 11, padding: "5px 10px", cursor: "pointer" }}>
              Sign out
            </button>
          </div>
        </div>
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {topView === "learner" && (
            <>
              {!activeMod ? (
                <div style={{ flex: 1, overflowY: "auto" }}><LearnerHome user={user} subs={mySubs} onOpenSprint={handleOpenSprint} /></div>
              ) : (
                <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
                  {mod && <SprintView mod={mod} subs={mySubs} activeAct={activeAct} onSetAct={setActiveAct} onBack={handleBack} progress={progress} onUpdateSub={handleUpdateSub} userName={user?.full_name} onNextSprint={(nextId) => { setActiveMod(nextId); setActiveAct(null); }} />}
                </div>
              )}
            </>
          )}
          {topView === "manager" && isAdmin && <div style={{ flex: 1, overflowY: "auto" }}><ManagerView users={allUsers} allSubs={allSubs} /></div>}
          {topView === "postcapstone" && <div style={{ flex: 1, overflowY: "auto" }}><PostCapstone userId={myId} userName={user?.full_name} /></div>}
          {topView === "leaderboard" && <div style={{ flex: 1, overflowY: "auto" }}><Leaderboard users={allUsers} allSubs={allSubs} currentUserId={myId} /></div>}
        </div>
      </div>
    </>
  );
}
