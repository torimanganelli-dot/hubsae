import React, { useState, useRef, useEffect } from "react";

export default function AICoach({ mod, aiMsgs, onUpdateMsgs }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selPrompt, setSelPrompt] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [aiMsgs]);

  const applyPrompt = (i) => {
    setSelPrompt(i);
    setInput(mod.prompts[i].tpl);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    const newMsgs = [...aiMsgs, { r: "u", c: text }];
    onUpdateMsgs(newMsgs);
    setInput("");
    setLoading(true);

    try {
      // Calls the Vercel API route — keeps the Anthropic API key server-side
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMsgs }),
      });
      const data = await res.json();
      const reply = data.reply || "I couldn't generate a response. Please try again.";
      onUpdateMsgs([...newMsgs, { r: "a", c: reply }]);
    } catch {
      onUpdateMsgs([...newMsgs, { r: "a", c: "Connection error. Please try again." }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <div style={{ flexShrink: 0, borderBottom: "1px solid #D1D9E0", padding: "14px 18px", background: "#fff" }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: "#757584", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Guided Prompts</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {mod.prompts.map((p, i) => (
            <button key={i} onClick={() => applyPrompt(i)} style={{
              fontSize: 11, padding: "7px 12px", borderRadius: 8,
              border: `2px solid ${selPrompt === i ? mod.color : "#D1D9E0"}`,
              background: selPrompt === i ? mod.color + "15" : "#fff",
              color: selPrompt === i ? mod.color : "#757584",
              fontWeight: 600, cursor: "pointer"
            }}>{p.lbl}</button>
          ))}
        </div>
      </div>
      <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
        {aiMsgs.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: 40 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, margin: "0 auto 12px", background: mod.color + "15", border: `2px solid ${mod.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✦</div>
            <div style={{ fontWeight: 800, color: "#18252D", fontSize: 16, marginBottom: 6 }}>AI Coach</div>
            <div style={{ fontSize: 12, color: "#757584", maxWidth: 320, margin: "0 auto", lineHeight: 1.6 }}>Select a guided prompt or ask anything about this sprint.</div>
          </div>
        ) : (
          aiMsgs.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.r === "u" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "85%", borderRadius: 12, padding: "12px 16px", fontSize: 12, lineHeight: 1.7, whiteSpace: "pre-wrap",
                background: m.r === "u" ? mod.color : "#fff",
                color: m.r === "u" ? "#fff" : "#18252D",
                border: m.r === "u" ? "none" : "1px solid #D1D9E0",
                alignSelf: m.r === "u" ? "flex-end" : "flex-start"
              }}>{m.c}</div>
            </div>
          ))
        )}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ maxWidth: "85%", borderRadius: 12, padding: "12px 16px", fontSize: 12, background: "#fff", border: "1px solid #D1D9E0", color: "#757584" }}>Thinking…</div>
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0, borderTop: "1px solid #D1D9E0", padding: "12px 18px", background: "#fff", display: "flex", gap: 8 }}>
        <textarea
          rows={2} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder="Ask your coach anything…"
          style={{ flex: 1, background: "#EEF0E2", border: "1px solid #D1D9E0", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#18252D", resize: "none", outline: "none", lineHeight: 1.5, fontFamily: "inherit" }}
        />
        <button onClick={sendMessage} disabled={loading}
          style={{ width: 38, height: 38, alignSelf: "flex-end", borderRadius: 8, border: "none", background: mod.color, color: "#fff", fontSize: 16, cursor: "pointer" }}>↑</button>
      </div>
    </div>
  );
}
