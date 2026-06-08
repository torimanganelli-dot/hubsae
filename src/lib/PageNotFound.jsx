import React from "react";

export default function PageNotFound() {
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F6F9", fontFamily: "system-ui,-apple-system,sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: "#18252D", marginBottom: 8 }}>404</div>
        <div style={{ fontSize: 16, color: "#757584" }}>Page not found</div>
      </div>
    </div>
  );
}
