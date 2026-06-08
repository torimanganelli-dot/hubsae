export const S2_LAYERS = [
  {
    id: 0, col: "#2563EB", bd: "#BFDBFE", badge: "Layer 1: Situation",
    title: "Understand what's actually happening in their business",
    goal: "Build a business picture — not data for an application. Understand what has changed, what is growing, and where new complexity is entering their world.",
    listen: "Operational shifts, headcount changes, new service lines, geographic expansion, new contracts, technology changes.",
    trap: "Asking questions you already know the answer to. Fake curiosity kills credibility. Only ask what you genuinely don't know.",
    scenario: `You sit down with Marcus, CFO of a regional logistics company. You've held their account for three years. Renewal is 60 days out. He's cordial but has 40 minutes budgeted.\n\nHow do you open the conversation?`,
    choices: [
      { t: `"So Marcus, I pulled your policy and wanted to walk you through what's renewing this year."`, ok: false, fb: "This is presenting, not diagnosing. You've walked in with answers before you understand his current reality." },
      { t: `"Before we talk renewal at all — walk me through how the business has changed in the last 12 months."`, ok: true, fb: "This is the move. One open question and you've signaled you're here to understand, not just transact." },
      { t: `"Have you had any claims this year? Any issues with the current coverage?"`, ok: false, fb: "Claims-first anchors the conversation in problems that have already happened. You want to surface what's coming." }
    ],
    rQuote: `"Honestly, it's been a lot. We picked up two new regional contracts, brought on about 60 drivers in six months. And we're starting to move temperature-controlled freight, which we've never done before."`,
    breakdown: ["Rapid hiring (60 drivers) — onboarding risk, driver qualification, potential coverage gaps", "New cargo type (temperature-controlled) — likely not contemplated in the current cargo form", "New contracts — probably carrying liability clauses you haven't reviewed"],
    note: "You asked one question. Marcus handed you three risk gaps. That's the Situation layer working.",
    qs: [`"Walk me through how your business has changed in the last 12 months."`, `"What's driving growth right now — and where is that growth creating new complexity?"`, `"How has your workforce changed since we last sat down?"`, `"Are there new services, clients, or geographies you've taken on that we haven't talked about?"`]
  },
  {
    id: 1, col: "#7C3AED", bd: "#DDD6FE", badge: "Layer 2: Problem",
    title: "Surface the risks they haven't fully named yet",
    goal: "Ask questions that lead the client to identify problems themselves. Their version of the problem is always more powerful than yours.",
    listen: "Unmanaged exposures, coverage assumptions that may be wrong, areas where they feel uncertain.",
    trap: "The moment you hear a problem signal, your instinct is to solve it. Resist. One more question at this layer is almost always worth more than pivoting to a solution.",
    scenario: `Marcus mentioned he's moving temperature-controlled freight for the first time. You have a strong hunch his cargo form doesn't cover it properly.\n\nWhat's your next move?`,
    choices: [
      { t: `"I need to flag something — standard cargo forms typically exclude temperature-sensitive freight. You're probably not covered."`, ok: false, fb: "You named the problem before he did. Now it's your opinion, not his reality." },
      { t: `"The temp-controlled work — is that something your current coverage was built for, or is that new territory?"`, ok: true, fb: "Right move. You're leading him toward the gap with a question, not a declaration." },
      { t: `"Great — so let's talk about what a cargo endorsement for refrigerated freight would look like."`, ok: false, fb: "You've skipped two entire layers. Slow down." }
    ],
    rQuote: `"New territory. We bought some refrigerated units but honestly, I'm not sure our coverage has caught up with what we're actually hauling now."`,
    breakdown: ["He's acknowledged uncertainty — that's a problem signal", "He hasn't fully named the gap yet — don't name it for him", "Your next question should probe the assumption further, not pivot to a fix"],
    note: `Follow up: "What do you know about how your cargo policy treats temperature-sensitive freight specifically?" — Let him confirm he doesn't know.`,
    qs: [`"What keeps you up at night from a risk standpoint — outside of the obvious?"`, `"If something went sideways in [operational area], how would that play out for you?"`, `"How confident are you that your coverage reflects what you're actually doing today — versus 18 months ago?"`, `"Where in your business are you most dependent on something you don't fully control?"`]
  },
  {
    id: 2, col: "#B45309", bd: "#FDE68A", badge: "Layer 3: Implication",
    title: "Expand the consequence until the client feels the weight of it",
    goal: "Help the client sit with what happens if nothing changes. People don't act on problems. They act on consequences.",
    listen: "Dollar amounts, operational dependencies, contractual exposure, personal liability, downstream clients.",
    trap: "Moving to Layer 4 before the client has verbalized the consequence themselves. If you said it, it's your opinion. If they said it, it's their decision.",
    scenario: `Marcus has acknowledged he's not sure his cargo coverage handles temperature-sensitive freight. He's exposed but doesn't fully feel it yet.\n\nHow do you help him feel the weight of that?`,
    choices: [
      { t: `"Most cargo policies have perishables exclusions — the good news is we can add an endorsement pretty easily."`, ok: false, fb: "You jumped straight to the solution. The cost of inaction hasn't landed." },
      { t: `"If a load of refrigerated product was rejected at delivery — let's say it's a $200K shipment — and it turned out the loss wasn't covered, what does that look like for you?"`, ok: true, fb: "This is the implication layer. You've made the risk concrete and asked him to walk through the consequence himself." },
      { t: `"That's a real concern. A lot of our clients in logistics have run into this exact issue."`, ok: false, fb: "Pivoting to other clients is a distraction. Keep the focus on Marcus and his specific exposure." }
    ],
    rQuote: `"That would be a serious problem. These new contracts have penalty clauses. We'd probably be on the hook for the full load plus their operational delays."\n\nYou: "How many temp-controlled loads are you running per month?"\n\nMarcus: "Maybe 15 to 20."\n\nYou: "Does your team know that's where things stand?"\n\nMarcus: "No. I'm not sure I fully knew it until right now."`,
    breakdown: ["He calculated the exposure himself — that's the cost of inaction landing", "He surfaced the penalty clauses — a contractual obligation you can reference in your proposal", "He acknowledged his team doesn't know — you've created an internal urgency he owns"],
    note: "You didn't scare him. You helped him finish a thought he hadn't finished. That's the difference between pressure and advisory.",
    qs: [`"If that scenario played out, what's the downstream impact on your operations?"`, `"Have you thought through what that would cost — in downtime, revenue, client relationships?"`, `"How long could the business absorb that kind of disruption before it became serious?"`, `"Who else inside your organization would feel the impact — and are they aware of the exposure?"`]
  },
  {
    id: 3, col: "#065F46", bd: "#A7F3D0", badge: "Layer 4: Need-Payoff",
    title: "Let them tell you what solving it would be worth",
    goal: "Ask what a solution would mean to them. When they articulate the value, they own the decision. You do not pitch here.",
    listen: "Internal champions, urgency signals, how they'll frame it to others, decision authority, budget framing.",
    trap: "Closing too early. The moment they signal interest, it's tempting to shift into presentation mode. Stay curious one beat longer.",
    scenario: `Marcus now understands the gap and the consequences. He's leaning forward. You haven't pitched anything yet.\n\nWhat's your next move?`,
    choices: [
      { t: `"Great — let me put together a proposal for a refrigerated cargo endorsement and get it to you by end of week."`, ok: false, fb: "Too fast. You don't yet know who else is involved or what he needs to make an internal case." },
      { t: `"If we could close that gap before renewal — what would that mean for you operationally?"`, ok: true, fb: "This is it. You're asking him to articulate the value in his own words. Whatever he says becomes the foundation of your proposal." },
      { t: `"So it sounds like this is something we should prioritize. Should I loop in your risk manager?"`, ok: false, fb: "You're moving to logistics before he's told you what this is worth to him. Ask the need-payoff question first." }
    ],
    rQuote: `"Honestly? Peace of mind on these new contracts. I don't want to be the CFO who won the business and then blew up the company on an uninsured loss."\n\nYou: "How would you present a solution like this internally?"\n\nMarcus: "I'd want to loop in our VP of Operations, but if the numbers make sense, this is my call."`,
    breakdown: ["He named the value himself: peace of mind, personal accountability, protecting the new contracts", "He identified the internal champion: VP of Operations", "He confirmed decision authority: his call if the numbers work", "He gave you a clear closing condition: make the numbers make sense"],
    note: "You haven't pitched a single product. Marcus just sold himself — and told you exactly how to close.",
    qs: [`"If we could close that gap, what would that be worth to you operationally?"`, `"What would it mean for you personally if this was handled correctly before renewal?"`, `"How would you present a solution like this internally — who else would need to be part of that conversation?"`, `"On a scale of urgency, where does this sit for you right now?"`]
  }
];