import React from "react";

const VIDEO_URL = "https://hubinternational4.sharepoint.com/:v:/s/SFD/IQBobuP-P8VZTY0iZZICgBTzAYAaW0NKXQDHQeGXU9rU1xo?e=UONg6g";
const STORAGE_KEY = "hub_sae_welcome_video_seen";

export default function WelcomeVideoModal({ onClose }) {
  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, padding: 20
    }}>
      <div style={{
        background: "#18252D", borderRadius: 16, padding: 24,
        maxWidth: 720, width: "100%", boxShadow: "0 8px 40px rgba(0,0,0,0.4)"
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#F3B921", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4 }}>★ Welcome</div>
            <div style={{ fontSize: 17, fontWeight: 900, color: "#fff" }}>Welcome to the HUB SAE Growth Engine</div>
          </div>
          <button onClick={handleClose} style={{
            background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
            borderRadius: 8, width: 32, height: 32, cursor: "pointer",
            fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }}>✕</button>
        </div>

        <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 32, marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>▶️</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 16, lineHeight: 1.5 }}>
            Watch the welcome video to get started with the HUB SAE Growth Engine.
          </div>
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0678D5", color: "#fff", padding: "12px 24px", borderRadius: 8, fontWeight: 800, fontSize: 14, textDecoration: "none" }}
          >
            ▶ Watch Welcome Video →
          </a>
        </div>

        <button onClick={handleClose} style={{
          width: "100%", padding: "13px", borderRadius: 10, border: "none",
          background: "#0678D5", color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer"
        }}>
          Get Started →
        </button>
      </div>
    </div>
  );
}

export function shouldShowWelcomeVideo() {
  return !localStorage.getItem(STORAGE_KEY);
}