import {
  FinancialMetrics,
  ProjectHealth,
  AttentionItem,
  SocialLead,
  ProspectItem,
  ProofVaultItem,
  SubscriptionItem,
  AuditLog,
  ExecutiveBriefingData,
} from "@/data/admin/types";

export interface AIResponse {
  answer: string;
  insights?: string[];
  suggestedActions?: { label: string; actionId: string; targetTab?: string }[];
  highlightMetrics?: { label: string; value: string; trend?: string }[];
}

export function generateChiefOfStaffResponse(
  query: string,
  context: {
    financials: FinancialMetrics;
    projects: ProjectHealth[];
    attentionItems: AttentionItem[];
    socialLeads: SocialLead[];
    prospects: ProspectItem[];
    subscriptions: SubscriptionItem[];
  }
): AIResponse {
  const q = query.toLowerCase();

  // Query: How is the company doing today? / Company health / Overview
  if (
    q.includes("how is the company doing") ||
    q.includes("overview") ||
    q.includes("health") ||
    q.includes("status") ||
    q.includes("today")
  ) {
    return {
      answer: `Good day, Sir. Virtoy Technologies is operating at high momentum today. Monthly revenue stands at ₹24.8L (82.7% of the ₹30.0L monthly target) with an 18.4% MoM growth rate. 

We have 12 active production deployments with our key heavy-industry project (SafeAct for Tata Steel) at 88% completion and Krushi Odisha 2025 Spatial VR Expo at 94%.

However, 2 critical items require executive oversight today: ₹4.20L in overdue receivables from Tata Steel Kalinga Phase 2, and 3 high-intent B2B social inquiries from Dubai and Jaipur waiting for technical proposals.`,
      insights: [
        "Monthly Revenue: ₹24.8L (+18.4% MoM) — On track to reach target with 2 pending enterprise closes.",
        "Total Active Pipeline: ₹68.5L across heavy industry, higher education, and UAE logistics.",
        "Team Engineering Velocity: 91% on-time milestone delivery index.",
      ],
      highlightMetrics: [
        { label: "Monthly Revenue", value: "₹24.8L", trend: "+18.4% MoM" },
        { label: "Receivables Pending", value: "₹4.20L", trend: "14 days overdue" },
        { label: "Active Pipeline", value: "₹68.5L", trend: "6 enterprise deals" },
      ],
      suggestedActions: [
        { label: "Review Overdue Invoices", actionId: "view_vault", targetTab: "vault" },
        { label: "Inspect High-Intent Leads", actionId: "view_leads", targetTab: "social_leads" },
        { label: "Generate Executive Briefing", actionId: "gen_briefing", targetTab: "briefing" },
      ],
    };
  }

  // Query: What needs my attention? / Attention items / Blockers / Critical
  if (
    q.includes("attention") ||
    q.includes("blocker") ||
    q.includes("urgent") ||
    q.includes("critical") ||
    q.includes("what needs")
  ) {
    return {
      answer: `Sir, here are the top 3 items requiring your immediate executive intervention:

1. **Tata Steel Kalinga Overdue Invoice (₹4.20L)**: The SAP workflow clearance has stalled for 14 days following Phase 1 acceptance. Recommendation: Have COO Piyali Sahu send the formal escalation letter to Asit Mishra.
2. **Claude Pro Team Subscription Renewal (3 Days Left)**: AI seat audit found 2 inactive developer seats. Downgrading before Sep 21 saves ₹41,000 annually.
3. **High-Value UAE Logistics Lead (₹22.0L)**: Al-Futtaim Logistics in JAFZA Dubai requested a 6-DoF forklift VR demo after watching our SafeAct simulation.`,
      insights: [
        "Receivables risk: 1 enterprise invoice > 14 days overdue.",
        "SaaS cost saving opportunity: ₹41,000/yr ready for 1-click execution.",
        "High-conversion window: UAE lead inquiry is under 1 hour old.",
      ],
      suggestedActions: [
        { label: "Send Invoice Reminder", actionId: "send_invoice", targetTab: "vault" },
        { label: "Optimize AI Seats", actionId: "opt_seats", targetTab: "subscriptions" },
        { label: "Draft UAE VR Proposal", actionId: "reply_lead", targetTab: "social_leads" },
      ],
    };
  }

  // Query: Management review agenda / Monday meeting
  if (
    q.includes("agenda") ||
    q.includes("management review") ||
    q.includes("meeting") ||
    q.includes("review") ||
    q.includes("monday")
  ) {
    return {
      answer: `Here is the structured **Leadership & Operations Review Agenda** prepared for your upcoming executive session:

### 📋 Virtoy Technologies Executive Review Agenda
**1. Financial & Cashflow Velocity (15 Mins)** — Lead: Mrs. Piyali Sahu (COO)
- Review Q3 revenue run-rate (₹24.8L current vs ₹30.0L target).
- Escalation plan for Tata Steel Kalinga Phase 2 milestone invoice (₹4.20L).

**2. Engineering & Delivery Milestones (20 Mins)** — Lead: Niranjan Sahu & Ashwin Yadav
- Krushi Odisha 2025 Spatial Expo load test results (40K concurrent capacity).
- SafeAct Quest 3 multilingual (Odia/Hindi) voice module staging.
- Banki Autonomous College semester grade engine sign-off.

**3. B2B Growth & Omnichannel Pipeline (15 Mins)** — Lead: Rakesh Panda
- Evaluation of 5 new high-intent social leads (Dubai Logistics, Jaipur Heritage Hotels).
- B2B Maps Prospector outreach campaign for Kolkata hospitals & Jajpur steel plants.

**4. AI Tooling & Infrastructure Optimization (10 Mins)** — Lead: Mr. Anup Patnaik
- Cloudflare strict SSL audit and Claude Pro seat rationalization.`,
      insights: [
        "Agenda optimized for 60-minute crisp executive decision-making.",
        "Covers revenue recovery, engineering quality, pipeline expansion, and infrastructure cost controls.",
      ],
      suggestedActions: [
        { label: "Export Full Briefing PDF", actionId: "export_pdf", targetTab: "briefing" },
        { label: "View Team Audit Trail", actionId: "audit_trail", targetTab: "audit" },
      ],
    };
  }

  // Query: Revenue / Financials / Targets
  if (q.includes("revenue") || q.includes("financial") || q.includes("target") || q.includes("money") || q.includes("cashflow")) {
    return {
      answer: `Monthly financial breakdown:
- **Current Revenue**: ₹24,80,000 (82.7% of target).
- **Target Revenue**: ₹30,00,000 (₹5.20L gap remaining for the month).
- **Overdue Collections**: ₹4,20,000 (Tata Steel Kalinga).
- **Active Pipeline Potential**: ₹68,50,000 across 6 high-probability enterprise proposals.
- **Collection Velocity**: 94.2% on-time settlement over the past 90 days.

Closing the Grand Kalinga PMS expansion (₹4.5L) and Jaipur Heritage Hotel deal (₹7.5L) will comfortably push total monthly collections beyond ₹36.0L.`,
      highlightMetrics: [
        { label: "Achieved Revenue", value: "₹24.8L", trend: "82.7% Target" },
        { label: "Monthly Target", value: "₹30.0L", trend: "₹5.2L to go" },
        { label: "Pipeline Value", value: "₹68.5L", trend: "High probability" },
      ],
      suggestedActions: [
        { label: "View Financial Graphs", actionId: "view_dash", targetTab: "dashboard" },
      ],
    };
  }

  // Default fallback response with smart contextual recommendations
  return {
    answer: `Sir, I am monitoring all operations across Virtoy Technologies. 

Currently tracking **12 active projects**, **₹24.8L in monthly revenue**, **7 active software subscriptions**, and **5 qualified omnichannel leads**.

You can ask me to:
- Generate leadership review agendas
- Analyze revenue targets & collection bottlenecks
- Draft tailored B2B client pitches
- Summarize developer activity & discussion proofs`,
    insights: [
      "All systems operating within normal parameters.",
      "Dual Innovation Hubs (Kolkata HQ & Bhubaneswar O-HUB) connected with zero reported downtime.",
    ],
    suggestedActions: [
      { label: "What needs my attention?", actionId: "ask_attention" },
      { label: "Prepare management review agenda", actionId: "ask_agenda" },
      { label: "How is the company doing today?", actionId: "ask_overview" },
    ],
  };
}

export function generateExecutiveBriefingData(context: {
  financials: FinancialMetrics;
  projects: ProjectHealth[];
  attentionItems: AttentionItem[];
  socialLeads: SocialLead[];
  prospects: ProspectItem[];
  subscriptions: SubscriptionItem[];
}): ExecutiveBriefingData {
  return {
    generatedAt: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    preparedFor: "Mr. Pritiranjan Sahu (CEO) & Executive Leadership",
    executiveSummary:
      "Virtoy Technologies Pvt. Ltd. maintained strong commercial velocity this cycle, recording ₹24.8L in monthly revenue (+18.4% MoM) and expanding total enterprise pipeline to ₹68.5L. Primary engineering operations remain healthy with SafeAct Industrial VR and Krushi Odisha Spatial WebXR on track for timely delivery. Executive focus this week centers on recovering ₹4.20L in overdue receivables and converting 3 high-intent overseas & domestic enterprise leads.",
    kpiSnapshot: {
      monthlyRevenue: "₹24,80,000",
      momGrowth: "+18.4%",
      pipelineVolume: "₹68,50,000",
      collectionEfficiency: "94.2%",
      activeDeployments: 12,
    },
    criticalBlockers: [
      {
        item: "Tata Steel Kalinga Phase 2 milestone invoice (₹4.20L) pending SAP release for 14 days.",
        owner: "Mrs. Piyali Sahu (COO)",
        impact: "Receivable cashflow delay; Phase 3 scheduling pending.",
      },
      {
        item: "Claude Pro annual subscription auto-renewal with 2 inactive developer seats ($50/mo waste).",
        owner: "Mr. Anup Patnaik (Co-Founder)",
        impact: "Avoidable SaaS overhead (₹41,000/yr).",
      },
    ],
    topWins: [
      {
        client: "Odisha Medical Services Association (OMSA)",
        deal: "State-wide Digital Voting & Identity Registry Portal",
        value: "₹5,20,000",
        rep: "Niranjan Sahu",
      },
      {
        client: "Grand Kalinga Hotels & Suites",
        deal: "Cloud PMS & WhatsApp Automated Guest Room Service",
        value: "₹4,50,000",
        rep: "Rakesh Panda",
      },
      {
        client: "Banki Autonomous College",
        deal: "IQAC & NAAC SSR Document Automation ERP",
        value: "₹6,80,000",
        rep: "Mr. Kailash Patnaik",
      },
    ],
    weeklyFocus: [
      "Secure payment clearance for Tata Steel Kalinga Phase 2 invoice.",
      "Conduct 40K concurrent virtual user load test on AWS Chandaka node for Krushi Odisha Expo.",
      "Deliver live VR telemetry demonstrations to Al-Futtaim Heavy Logistics Dubai and Royal Heritage Jaipur.",
      "Execute Claude Pro team seat rationalization and AWS savings plan.",
    ],
  };
}
