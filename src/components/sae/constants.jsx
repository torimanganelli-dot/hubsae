export const C = {
  eBlue: "#0678D5",
  cLight: "#385263",
  rBlue: "#1818B5",
  hGreen: "#3EBD3E",
  cGold: "#F3B921",
  sBlue: "#00AEEF",
  pRed: "#AC1534",
  cGray: "#757584",
  cDark: "#18252D"
};

export const S1Q = [
  { k: "q1", l: "1. Where did your assumptions about a client's business turn out to be wrong — and what did you miss because of those assumptions?" },
  { k: "q2", l: "2. If a client asked you right now, \"What keeps you up at night about my business?\" — which accounts could you answer confidently, and which ones exposed a gap?" },
];

export const S2Q = [
  { k: "q1", l: "1. When your client started to feel the weight of a risk, what did you do next — and was that the right move?" },
  { k: "q2", l: "2. Think about the moment you most wanted to pitch. What were you feeling, and what did that urge cost you in the conversation?" },
  { k: "q3", l: "3. Which question landed harder than you expected? What does that tell you about what your client is actually carrying?" },
  { k: "q4", l: "4. If your client had to describe the value of your last conversation to a colleague, what would they say — and would it sound like an insurance meeting or a business conversation?" },
  { k: "q5", l: "5. Where in this sprint did you learn something about a client that you should have known a year ago?" },
];

export const S3Q = [
  { k: "q1", l: "1. When you opened with the Mirror Back, what did the client's reaction tell you about how well you actually listened in Sprint 2?" },
  { k: "q2", l: "2. Think about the moment you introduced the financial case. Did it feel like a revelation to them — or a transaction? What made the difference?" },
  { k: "q3", l: "3. Did you reach the Decision Conversation, or did you find a reason not to? Be honest about what stopped you." },
  { k: "q4", l: "4. Whose language was in your recommendation — yours or theirs? Where did the line blur, and what did it cost you?" },
  { k: "q5", l: "5. If this client described your presentation to their CFO tomorrow, would they lead with the problem you solved or the product you sold?" },
];

export const S5Q = [
  { k: "q1", l: "1. When you built your value evidence list, what had you done for this client that they probably didn't fully register — and whose fault is that?" },
  { k: "q2", l: "2. Think about the moment you asked the alignment question and heard the answer. What did you almost get wrong about this renewal because you assumed you already knew?" },
  { k: "q3", l: "3. If a premium increase happened — did you lead it like an advisor or deliver it like a messenger? What's the difference, and where did you land?" },
  { k: "q4", l: "4. What would this renewal have looked like if you'd walked in without the 90-day audit — and which clients in your book are currently getting that version of you?" },
  { k: "q5", l: "5. The renewal is over. What did you learn about this client's business that should have changed how you managed them 6 months ago?" },
];

export const S6Q = [
  { k: "q1", l: "1. What did the executive tell you that no one else at that account could have — and what does it change about how you manage them going forward?" },
  { k: "q2", l: "2. At what point in the executive conversation did you feel the pull to talk about insurance? What did you do with that impulse?" },
  { k: "q3", l: "3. Which account in your book are you still most vulnerable on — and what are you willing to do about it?" },
];

export const S4Q = [
  { k: "q1", l: "1. What signal had been sitting in your notes — unacted on — before this sprint forced you to look? What does that tell you about how you've been listening?" },
  { k: "q2", l: "2. When you introduced the cross-sell conversation, did the client feel advised or sold to? How do you know?" },
  { k: "q3", l: "3. Think about the moment you felt awkward about bringing up additional coverage with a client you already have. Where did that hesitation come from — and is it serving them or protecting you?" },
  { k: "q5", l: "4. If every signal your clients sent you in the last 12 months had been acted on — what would your book look like right now?" },
];

export const SPRINTS = [
  {
    id: 1, color: C.eBlue, title: "Account Opportunity Identification", videoUrl: "",
    sub: "See the money hiding in your existing book", dur: "2 Weeks",
    obj: "Use the Account Opportunity Scanner to scan your top accounts & build an Opportunity Map.",
    acts: [{ id: "1-rf", lbl: "Sprint Reflection", sg: "Honest specific answers to all 5 questions. Named accounts, named moments. Revenue accurately self-reported.", isRef: true, qs: S1Q, spUrl: "https://hubinternational4.sharepoint.com/:f:/s/SFD/IgCOBvfsgtZjS4aSduAASQskAfXgMqeFgYV-2DtREsjzZV0?e=6SVZ4A" }],
    prompts: [
      { lbl: "Business Intelligence Scan", tpl: "I manage a [INDUSTRY] company with [REVENUE/HEADCOUNT]. What are the top 3-5 risk gaps I should probe for? Frame as business risks, not insurance products." },
      { lbl: "Opportunity Prioritization", tpl: "Here are my accounts: [LIST]. Rank by likely opportunity for expansion. Explain your reasoning." },
      { lbl: "Financial Impact Framing", tpl: "Help me frame the cost of [RISK/GAP] for a CFO in [INDUSTRY] with [REVENUE]. What's the financial risk of not addressing this?" },
    ]
  },
  {
    id: 2, color: C.cLight, title: "Diagnostic Client Conversations", videoUrl: "",
    sub: "Stop explaining. Start uncovering.", dur: "2 Weeks",
    obj: "Run 2 diagnostic conversations using the 4-layer framework. Get clients to the Implication layer in their own words — without pitching a single product.",
    acts: [{ id: "2-rf", lbl: "Sprint Reflection", sg: "Honest specific answers to all 5 questions. Named accounts, named moments. Revenue accurately self-reported.", isRef: true, qs: S2Q, spUrl: "https://hubinternational4.sharepoint.com/:f:/s/SFD/IgB2JgajLWCvRowxGIowbwuiAeY_8fiKqnQmxHbP6Da-jL0?e=DHm2vi" }],
    prompts: [
      { lbl: "Question Builder", tpl: "I'm preparing a diagnostic conversation with a [INDUSTRY] owner about [SPECIFIC GAP]. Build 3 Situation, 3 Problem, 3 Implication, and 2 Need-Payoff questions. Conversational." },
      { lbl: "Implication Deepener", tpl: "My client acknowledged [SPECIFIC RISK] but didn't seem concerned. Build 4-5 implication questions that expand the consequence without being alarmist." },
      { lbl: "Conversation Reconstruction", tpl: "I just completed a conversation about [TOPIC]: [BRIEF NARRATIVE]. Analyze against a diagnostic framework. Where did I probe well? Where did I revert to presenting?" },
    ]
  },
  {
    id: 3, color: C.rBlue, title: "Strategic Account Presentation & Proposal", videoUrl: "",
    sub: "Present like an advisor. Get decisions like one.", dur: "2 Weeks",
    obj: "Build and deliver one strategic recommendation for a live account. Reach the Decision Conversation.",
    acts: [{ id: "3-rf", lbl: "Sprint Reflection", sg: "Honest specific answers to all 5 questions. Named accounts, named moments. Revenue accurately self-reported.", isRef: true, qs: S3Q, spUrl: "https://hubinternational4.sharepoint.com/:f:/s/SFD/IgA1JahSO5ZUR7R2Gmca0YuCAciNJmvERvnNFAQDKPG1k64?e=dOFN3z" }],
    prompts: [
      { lbl: "Mirror Back Builder", tpl: "Here are my diagnostic notes: [PASTE NOTES]. Write a 3-4 sentence Mirror Back using the client's language." },
      { lbl: "Financial Case Builder", tpl: "Client: [INDUSTRY], [REVENUE]. Exposure: [SPECIFIC RISK]. Build a directional financial case: cost of risk, cost of solution, ratio." },
      { lbl: "Presentation Stress Test", tpl: "Here is my recommendation: [PASTE]. Stress test it: Does it lead with their problem? Is the financial case clear? What would make a CFO push back?" },
    ]
  },
  {
    id: 4, color: C.hGreen, title: "Cross-Sell Execution", videoUrl: "",
    sub: "Grow the account. Without starting over.", dur: "2 Weeks",
    obj: "Build a Cross-Sell Signal Map across 8 accounts. Brief one specialist. Execute 2 cross-sell conversations.",
    acts: [{ id: "4-rf", lbl: "Sprint Reflection", sg: "Honest specific answers to all 5 questions. Named accounts, named moments. Revenue accurately self-reported.", isRef: true, qs: S4Q, spUrl: "https://hubinternational4.sharepoint.com/:f:/s/SFD/IgD4sYvaHufGQb0qnY3-d68bAe9M2OTC9sFULU1ArVUbvhg?e=fXbJh7" }],
    prompts: [
      { lbl: "Signal Mining", tpl: "Here are my notes from a client conversation: [PASTE NOTES]. Analyze for cross-sell signals. Categorize as growth/workforce/technology/contractual/financial/claims." },
      { lbl: "Specialist Brief Builder", tpl: "I need to bring a [CYBER/EPLI/FINANCIAL LINES] specialist into a meeting. Client: [INDUSTRY], [CONTEXT]. Opportunity: [SPECIFIC SIGNAL]. Build a brief." },
      { lbl: "Objection Handling", tpl: "Client said: '[SPECIFIC OBJECTION].' Coverage explored: [LINE]. Give me a diagnostic response that explores the objection rather than defending the recommendation." },
    ]
  },
  {
    id: 5, color: C.cGold, title: "Renewal Strategy", videoUrl: "",
    sub: "The renewal is not an event. It's the proof.", dur: "2 Weeks",
    obj: "Complete a 90-Day Account Audit. Execute a Proactive Renewal Conversation. Deliver a Renewal Narrative.",
    acts: [{ id: "5-rf", lbl: "Sprint Reflection", sg: "Honest specific answers to all 5 questions. Named accounts, named moments. Revenue accurately self-reported.", isRef: true, qs: S5Q, spUrl: "https://hubinternational4.sharepoint.com/:f:/s/SFD/IgAN5CVYSMgQSZHDTXEt0EO4ASPb_Ll51nY1jaV3GItniRE?e=zI5cfh" }],
    prompts: [
      { lbl: "Alignment Question Prep", tpl: "I'm going into a proactive renewal conversation with a [TITLE] at a [INDUSTRY] company. What are their most likely concerns? Give me a diagnostic question for each." },
      { lbl: "Premium Increase Script", tpl: "Client facing [X]% premium increase. Drivers: [REASONS]. Build a four-move conversation: context before the number, connection to their data, what I did to mitigate it, cost-of-risk reframe." },
      { lbl: "Renewal Narrative Builder", tpl: "Help me build a renewal narrative. Year in review: [DESCRIPTION]. Business changes: [DESCRIPTION]. Market context: [RATE ENVIRONMENT]." },
    ]
  },
  {
    id: 6, color: C.sBlue, title: "Executive Relationship Development", videoUrl: "",
    sub: "Get above the contact. Own the relationship.", dur: "2 Weeks",
    obj: "Map executive relationships across 5 A-tier accounts. Execute one entry point. Deliver an executive conversation.",
    acts: [{ id: "6-rf", lbl: "Sprint Reflection", sg: "Honest specific answers to all 3 questions. Named accounts, named moments. Revenue accurately self-reported.", isRef: true, qs: S6Q, spUrl: "https://hubinternational4.sharepoint.com/:f:/s/SFD/IgCkZS5iMpRTTLOfdHFANy2sASMjcZISdcKYfhIDEZPTfFM?e=cPMFSe" }],
    prompts: [
      { lbl: "Executive Research Brief", tpl: "Preparing for a first meeting with the [CFO/CEO/COO] of [COMPANY], a [INDUSTRY] company. Identify 3 strategic priorities, 2 risk implications, and one insight that shows I understand their business better than a typical broker." },
      { lbl: "Entry Point Script", tpl: "I want a first meeting with the [TITLE] at [COMPANY]. My existing contact is [CURRENT CONTACT]. Business trigger: [SPECIFIC TRIGGER]. Write a 3-sentence outreach: business context, specific reason, direct ask for 20 minutes." },
      { lbl: "Executive Follow-Up Note", tpl: "Just had a first executive meeting. They told me: [BRIEF SUMMARY]. Write a follow-up note under 150 words: reference one specific thing they said, add one forward-looking implication, propose one concrete next step." },
    ]
  },
];

export const CAPSTONE = {
  id: "capstone", color: C.cDark, title: "Capstone: The Strategic Account Review",
  sub: "Prove it. On a real account. In front of the people who matter.", dur: "2 Weeks Prep + Live Event",
  obj: "Build a Strategic Account Dossier across all 6 sprint disciplines. Present to a panel. Earn your HUB SAE designation.",
  acts: [
    { id: "c-1", lbl: "Capstone account selected + rationale documented", noRevenue: true, sg: "Selection rationale, connection to all 6 sprints.", instructions: "Choose a real A-tier account from your book. Write 2–3 sentences explaining why you selected this account and how your work across all 6 sprints connects to it. This becomes the foundation of your entire dossier." },
    { id: "c-2", lbl: "Dossier Section 1: Opportunity Map", noRevenue: true, sg: "Business-only framing, signal specificity.", instructions: "Using your Sprint 1 work on this account, document the top 3 business risks or opportunities you identified. Frame everything in business terms — no insurance jargon. Include the specific signals that surfaced each opportunity." },
    { id: "c-3", lbl: "Dossier Section 2: Diagnostic Intelligence", noRevenue: true, sg: "Genuine client intelligence, implication layer quote.", instructions: "Draw from your Sprint 2 diagnostic conversations. Document a specific implication-layer moment where the client articulated the consequence of the risk in their own words. Quote them directly if possible. Show that you diagnosed, not pitched." },
    { id: "c-4", lbl: "Dossier Section 3: Recommendation Delivered", noRevenue: true, sg: "Financial case presence, decision conversation evidence.", instructions: "Using your Sprint 3 work, describe the strategic recommendation you built and delivered. Include the financial case (cost of risk vs. cost of solution), the client's language from your Mirror Back, and evidence that you reached a decision conversation." },
    { id: "c-5", lbl: "Dossier Section 4: Cross-Sell Execution", noRevenue: true, sg: "Signal sourcing, three-part entry point evidence.", instructions: "From your Sprint 4 work, document at least one cross-sell signal you identified, which line of coverage it pointed to, how you introduced it using the three-part entry point, and what happened in that conversation." },
    { id: "c-6", lbl: "Dossier Section 5: Renewal Strategy", noRevenue: true, sg: "Proactiveness evidence, alignment question quality.", instructions: "Using your Sprint 5 work, document how you approached the renewal differently — specifically your 90-day audit findings, the alignment question you asked, and how you framed any premium changes or coverage adjustments in business terms." },
    { id: "c-7", lbl: "Dossier Section 6: Executive Relationship", noRevenue: true, sg: "Evidence specificity, plan credibility.", instructions: "From your Sprint 6 work, document the executive relationship status at this account: who you've reached, how you got there, what you learned from them that no one else could have told you, and what your next executive touch looks like." },
    { id: "c-9", lbl: "Forward Commitment (3 specific commitments)", noRevenue: true, sg: "Specificity of all three, survives follow-up questioning.", instructions: "Write exactly 3 forward commitments for this account — each one specific enough that your manager could follow up on it in 90 days. Vague intentions don't count. Each commitment should have a named action, a named contact, and a timeframe." },
    { id: "c-compile", lbl: "Compile & Submit Full Dossier", noRevenue: true, isCompile: true, sg: "All capstone sections compiled into one document and submitted to SharePoint.", instructions: "Download your complete Capstone Dossier as a single .txt file — it will include all sections you've completed above. Then upload it to the SharePoint link provided to officially submit your dossier for review.", spUrl: "https://hubinternational4.sharepoint.com/:f:/s/SFD/IgBmMigB_NtTQLHROX7r_bAZAZ-YOA1hCnxsp9aLYWHp9RA?e=H8fUkx" },
    { id: "c-final", lbl: "Presentation & Advancement Checklist", noRevenue: false, isChecklist: true, sg: "The capstone is scored across four areas: the quality of the Strategic Account Dossier (30 points), the outcomes documented in the impact summary (25 points), live presentation performance (25 points), and the strength of the forward commitments (20 points). To receive the SAE designation, participants must score a minimum of 70 out of 100.", instructions: "Schedule your presentation to finish your Capstone.",
      checks: [
        { id: "check-review", lbl: "Manager pre-review completed", detail: "Share your dossier with your manager before the live presentation. Incorporate their feedback — the panel will ask about it." },
        { id: "check-pres", lbl: "45-min live presentation delivered", detail: "Present your full Strategic Account Dossier to the panel. Walk them through all 6 sections, your Commercial Impact Summary, and your Forward Commitments." },
        { id: "check-qa", lbl: "Q&A with panel completed", detail: "Answer the panel's questions directly and honestly. They will probe your evidence, your revenue estimates, and your forward commitments." },
        { id: "check-decision", lbl: "Advancement decision received", detail: "Receive and document the panel's advancement decision and any feedback given." },
      ],
      revenueLabel: "Any additional revenue influence"
    },
  ],
  prompts: [
    { lbl: "Dossier Section Builder", tpl: "Building capstone dossier for [ACCOUNT NAME], a [INDUSTRY] company. For Sprint [NUMBER], here's what I did: [DESCRIBE WORK]. Help me write this section in business language." },
    { lbl: "Commercial Impact Framing", tpl: "Building my Commercial Impact Summary. Sprint 1: [OUTCOME], Sprint 2: [OUTCOME], Sprint 3-6: [OUTCOMES]. Frame each as revenue influenced with a defensible estimate." },
    { lbl: "Panel Q&A Prep", tpl: "Preparing for capstone panel Q&A. Account: [DESCRIPTION], Commercial impact: [KEY NUMBERS], Biggest commitment: [COMMITMENT]. Help me prepare for the hardest version of each likely question." },
  ]
};

export const ALL_MODULES = [...SPRINTS, CAPSTONE];

export const statusColor = (s) =>
  s === "approved" || s === "Strong" ? "#3EBD3E"
    : s === "adequate" || s === "Adequate" ? "#F3B921"
    : s === "needs_work" || s === "Needs Work" ? "#AC1534"
    : "#757584";

export const getProgress = (subs, mod) => {
  if (mod.id === "capstone") {
    const done = mod.acts.filter(a => ["approved", "adequate"].includes(subs[a.id]?.status)).length;
    return Math.round(done / mod.acts.length * 100);
  }
  // For sprints: 3 steps — Learn visited, Launch visited, Reflection completed
  const learnVisited = subs[`${mod.id}-learn`]?.status === "visited" ? 1 : 0;
  const launchVisited = subs[`${mod.id}-launch`]?.status === "visited" ? 1 : 0;
  const reflectionDone = ["approved", "adequate"].includes(subs[`${mod.id}-rf`]?.status) ? 1 : 0;
  return Math.round((learnVisited + launchVisited + reflectionDone) / 3 * 100);
};

export const getTotalRevenue = (subs) =>
  Object.values(subs).reduce((a, s) => a + (s.revenue || 0), 0);

export const getOverallProgress = (subs) =>
  Math.round(ALL_MODULES.reduce((a, m) => a + getProgress(subs, m), 0) / ALL_MODULES.length);