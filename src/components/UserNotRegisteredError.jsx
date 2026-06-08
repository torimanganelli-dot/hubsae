import React from "react";

export default function UserNotRegisteredError() {
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F6F9", fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 36, maxWidth: 400, width: "90%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: "#18252D", marginBottom: 8 }}>Access Restricted</div>
        <div style={{ fontSize: 13, color: "#757584" }}>You are not registered for this application. Please contact your administrator.</div>
      </div>
    </div>
  );
}
