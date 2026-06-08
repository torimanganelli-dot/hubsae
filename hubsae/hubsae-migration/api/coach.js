// api/coach.js
// Vercel serverless function that proxies AI Coach messages to Anthropic.
// Keeps the ANTHROPIC_API_KEY out of the browser bundle.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;
  if (!messages?.length) {
    return res.status(400).json({ error: "No messages provided" });
  }

  // Convert the app's compact message format { r: "u"|"a", c: "..." }
  // into Anthropic's messages format
  const anthropicMessages = messages.map(m => ({
    role: m.r === "u" ? "user" : "assistant",
    content: m.c,
  }));

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system:
          "You are an executive sales coach for HUB International's SAE Growth Engine program. " +
          "You help Strategic Account Executives develop consultative selling skills, " +
          "identify revenue opportunities, and deepen client relationships. " +
          "Be concise, direct, and practical. Use insurance industry context where relevant.",
        messages: anthropicMessages,
      }),
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || "I couldn't generate a response. Please try again.";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Coach API error:", error);
    return res.status(500).json({ error: error.message });
  }
}
