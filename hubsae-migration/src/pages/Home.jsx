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
  const { user, isLoadingAuth, logout, refreshUser } = useAuth();

  const [topView, setTopView] = useState("learner");
  const [activeMod, setActiveMod] = useState(null);
  const [activeAct, setActiveAct] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allSubs, setAllSubs] = useState({});
  const [aiMsgs, setAiMsgs] = useState({});
  const [loading, setLoading] = useState(true);
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [roleInput, setRoleInput] = useState("user");
  const [savingName, setSavingName] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [magicLinkEmail, setMagicLinkEmail] = useState("");
  const [sendingLink, setSendingLink] = useState(false);

  const { navigateToLogin } = useAuth();

  const loadAllDataDebounced = useRef(null);

  const loadAllData = async () => {
    try {
      // Uses the Vercel API route which queries with service role key
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
      const { data: updated } = await supabase
        .from("submissions")
        .update(payload)
        .eq("id", existing.id)
        .select()
        .single();
      saved = updated;
    } else {
      const { data: created } = await supabase
        .from("submissions")
        .insert(payload)
        .select()
        .single();
      saved = created;
    }

    setAllSubs(prev => ({
      ...prev,
      [myId]: { ...(prev[myId] || {}), [actId]: saved },
    }));

    if (loadAllDataDebounced.current) clearTimeout(loadAllDataDebounced.current);
    loadAllDataDebounced.current = setTimeout(() => loadAllData(), 2000);
  };

  // First-time profile setup — saves to the profiles table
  const handleSaveName = async () => {
    if (!nameInput.trim() || !emailInput.trim()) return;
    if (user?.email && emailInput.trim().toLowerCase() !== user.email.toLowerCase()) {
      setEmailError("Email doesn't match your account. Please enter your invite email.");
      return;
    }
    setEmailError("");
    setSavingName(true);
    const trimmedName = nameInput.trim();
    try {
      await supabase
        .from("profiles")
        .upsert({
          id: myId,
          email: user.email,
          full_name: trimmedName,
          role: roleInput,
        });
      await refreshUser();
    } catch (e) {
      console.error("Failed to save profile:", e);
    }
    setSavingName(false);
    if (shouldShowWelcomeVideo()) setShowWelcomeVideo(true);
    await loadAllData();
  };

  const handleSendMagicLink = async () => {
    if (!magicLinkEmail.trim()) return;
    setSendingLink(true);
    try {
      await navigateToLogin(magicLinkEmail.trim());
      setMagicLinkSent(true);
    } catch (e) {
      console.error("Magic link error:", e);
    }
    setSendingLink(false);
  };

  const handleOpenSprint = (modId) => {
    setActiveMod(modId);
    setActiveAct(null);
  };

  const handleBack = () => {
    setActiveMod(null);
    setActiveAct(null);
  };

  const mod = activeMod ? ALL_MODULES.find(m => m.id == activeMod) : null;
  const progress = mod ? getProgress(mySubs, mod) : 0;
  const isAdmin = user?.role === "admin";

  const navTabs = [
    { id: "learner", label: "📚 My Learning" },
    { id: "postcapstone", label: "🚀 Post-Capstone" },
    ...(isAdmin ? [{ id: "manager", label: "📊 Manager View" }] : []),
    { id: "leaderboard", label: "🏆 Leaderboard" },
  ];

  // Loading state
  if (loading || isLoadingAuth) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F6F9" }}>
        <div style={{ color: "#757584", fontSize: 14 }}>Loading…</div>
      </div>
    );
  }

  // Not logged in — show magic link login screen
  if (!user) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F6F9", fontFamily: "system-ui,-apple-system,sans-serif" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 36, maxWidth: 400, width: "90%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#0678D5", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 24 }}>👋</span>
          </div>
          {magicLinkSent ? (
            <>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#18252D", marginBottom: 8 }}>Check your email</div>
              <div style={{ fontSize: 13, color: "#757584" }}>We sent a login link to <strong>{magicLinkEmail}</strong>. Click the link in that email to sign in.</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#18252D", marginBottom: 6 }}>Sign in</div>
              <div style={{ fontSize: 13, color: "#757584", marginBottom: 24 }}>Enter your work email and we'll send you a sign-in link.</div>
              <input
                type="email"
                value={magicLinkEmail}
                onChange={e => setMagicLinkEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendMagicLink()}
                placeholder="Your work email"
                autoFocus
                style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: "2px solid #D1D9E0", fontSize: 15, marginBottom: 12, outline: "none", boxSizing: "border-box" }}
              />
              <button
                onClick={handleSendMagicLink}
                disabled={!magicLinkEmail.trim() || sendingLink}
                style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: magicLinkEmail.trim() ? "#0678D5" : "#D1D9E0", color: "#fff", fontWeight: 800, fontSize: 14, cursor: magicLinkEmail.trim() ? "pointer" : "default" }}
              >
                {sendingLink ? "Sending…" : "Send Login Link →"}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Logged in but no name yet — profile setup
  if (!user?.full_name?.trim()) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F6F9", fontFamily: "system-ui,-apple-system,sans-serif" }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 36, maxWidth: 400, width: "90%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#0678D5", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 24 }}>👋</span>
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#18252D", marginBottom: 6 }}>Complete your profile</div>
          <div style={{ fontSize: 13, color: "#757584", marginBottom: 24 }}>Confirm your email and set your display name.</div>
          <input
            type="email"
            value={emailInput}
            onChange={e => { setEmailInput(e.target.value); setEmailError(""); }}
            placeholder="Your work email"
            autoFocus
            style={{ width: "100%", padding: "12px 14px", borderRadius: 8, border: `2px solid ${emailError ? "#AC1534" : "#D1D9E0"}`, fontSize: 15, marginBottom: 4, outline: "none", boxSizing: "border-box" }}
          />
          {emailError && <div style={{ fontSize: 11, color: "#AC1534", marginBottom: 8, textAlign: "left" }}>{emailError}</div>}
          {!emailError && <div style={{ height: 12 }} />}
          <input
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSaveName()}
            placeholder="Full Name (First Last)"
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
            disabled={!nameInput.trim() || !emailInput.trim() || savingName}
            style={{ width: "100%", padding: "12px", borderRadius: 8, border: "none", background: (nameInput.trim() && emailInput.trim()) ? "#0678D5" : "#D1D9E0", color: "#fff", fontWeight: 800, fontSize: 14, cursor: (nameInput.trim() && emailInput.trim()) ? "pointer" : "default" }}
          >
            {savingName ? "Saving…" : "Get Started →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {showWelcomeVideo && <WelcomeVideoModal onClose={() => setShowWelcomeVideo(false)} />}
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F4F6F9", fontFamily: "system-ui,-apple-system,sans-serif", fontSize: 14 }}>
        {/* Top Nav */}
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
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0678D5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, border: "2px solid #F3B921" }}>
                {user.full_name?.split(" ").filter(Boolean).map(n => n[0]).join("").slice(0, 2).toUpperCase() || user.email?.slice(0, 2).toUpperCase() || "??"}
              </div>
              <button onClick={logout} style={{ background: "none", border: "1px solid rgba(255,255,255,.2)", borderRadius: 6, color: "rgba(255,255,255,.5)", fontSize: 11, padding: "5px 10px", cursor: "pointer" }}>
                Sign out
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {topView === "learner" && (
            <>
              {!activeMod ? (
                <div style={{ flex: 1, overflowY: "auto" }}>
                  <LearnerHome user={user} subs={mySubs} onOpenSprint={handleOpenSprint} />
                </div>
              ) : (
                <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
                  {mod && (
                    <SprintView
                      mod={mod}
                      subs={mySubs}
                      activeAct={activeAct}
                      onSetAct={setActiveAct}
                      onBack={handleBack}
                      progress={progress}
                      onUpdateSub={handleUpdateSub}
                      userName={user?.full_name}
                      onNextSprint={(nextId) => { setActiveMod(nextId); setActiveAct(null); }}
                    />
                  )}
                </div>
              )}
            </>
          )}
          {topView === "manager" && isAdmin && (
            <div style={{ flex: 1, overflowY: "auto" }}>
              <ManagerView users={allUsers} allSubs={allSubs} />
            </div>
          )}
          {topView === "postcapstone" && (
            <div style={{ flex: 1, overflowY: "auto" }}>
              <PostCapstone userId={myId} userName={user?.full_name} />
            </div>
          )}
          {topView === "leaderboard" && (
            <div style={{ flex: 1, overflowY: "auto" }}>
              <Leaderboard users={allUsers} allSubs={allSubs} currentUserId={myId} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
