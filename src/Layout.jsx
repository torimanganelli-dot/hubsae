import React from "react";

export default function Layout({ children }) {
  return (
    <div style={{ margin: 0, padding: 0, height: "100vh", overflow: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: system-ui,-apple-system,sans-serif; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f0f0f0; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
      `}</style>
      {children}
    </div>
  );
}