import {
  FinancialMetrics,
  ProjectHealth,
  AttentionItem,
  SocialLead,
  ProspectItem,
  SubscriptionItem,
  PipelineDeal,
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
    deals?: PipelineDeal[];
  }
): AIResponse {
  const q = query.toLowerCase();
  const deals = context.deals || [];
  const pipelineTotal = deals.reduce((sum, d) => sum + d.dealValue, 0) || context.financials.totalPipelineValue || 0;
  const revLakhs = context.financials.monthlyRevenue > 0 ? (context.financials.monthlyRevenue / 100000).toFixed(1) : "0";
  const pipelineLakhs = pipelineTotal > 0 ? (pipelineTotal / 100000).toFixed(1) : "0";
  const overdueLakhs = context.financials.overdueReceivables > 0 ? (context.financials.overdueReceivables / 100000).toFixed(1) : "0";
  const activeProjectsCount = context.projects.length;
  const attentionCount = context.attentionItems.length;
  const leadsCount = context.socialLeads.length;
  const prospectsCount = context.prospects.length;
  const dealsCount = deals.length;

  // Query: How is the company doing today? / Company health / Overview
  if (
    q.includes("how is the company doing") ||
    q.includes("overview") ||
    q.includes("health") ||
    q.includes("status") ||
    q.includes("today")
  ) {
    const dealsText =
      dealsCount > 0
        ? `We are currently tracking **${dealsCount} active pipeline deals** worth **₹${pipelineLakhs}L**.`
        : `Deal pipeline is clean with **0 active deals** registered.`;

    const projectsText =
      activeProjectsCount > 0
        ? `There are **${activeProjectsCount} active project deployments** underway.`
        : `No active deployment blockers logged.`;

    const attentionText =
      attentionCount > 0
        ? `**${attentionCount} items** require leadership review.`
        : `Zero critical blockers or overdue invoices flagged today.`;

    return {
      answer: `Namaste Sir 🙏. Here is today's real-time executive telemetry for Virtoy Technologies:

- **Monthly Collections**: ₹${revLakhs}L recorded for this cycle (${context.financials.momGrowth}% MoM velocity).
- **Deal Pipeline**: ${dealsText}
- **Engineering Deliveries**: ${projectsText}
- **Executive Attention**: ${attentionText}
- **Discovery Radar**: ${prospectsCount} scouted commercial enterprises and ${leadsCount} qualified inbound leads in your workspace.`,
      insights: [
        `Active Enterprise Pipeline: ₹${pipelineLakhs}L across ${dealsCount} registered opportunities.`,
        `Commercial Discovery: ${prospectsCount} target enterprises in radar.`,
        `Operational Health: ${attentionCount === 0 ? "100% on-track, zero blockers" : `${attentionCount} items requiring action`}.`,
      ],
      highlightMetrics: [
        { label: "Active Pipeline", value: `₹${pipelineLakhs}L`, trend: `${dealsCount} deals` },
        { label: "Inbound Leads", value: `${leadsCount}`, trend: "Live capture" },
        { label: "Overdue Invoices", value: `₹${overdueLakhs}L`, trend: `${context.financials.collectionVelocity}% velocity` },
      ],
      suggestedActions: [
        { label: "View Deal Pipeline Matrix", actionId: "view_deals", targetTab: "deals" },
        { label: "Live Scout B2B Leads", actionId: "view_prospects", targetTab: "prospector" },
        { label: "Export Executive Briefing", actionId: "view_briefing", targetTab: "briefing" },
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
    if (context.attentionItems.length === 0) {
      return {
        answer: `Sir, all systems are operating cleanly. There are currently **0 critical attention items** or payment blockers in your workspace.

All client invoices, developer tools, and pipeline leads are in healthy status. You can use the **B2B Maps Prospector** to scout new commercial opportunities or review the **Deal Matrix**.`,
        insights: [
          "Zero overdue invoice escalations pending.",
          "All active software subscriptions operational.",
          "Workspace synchronized with live database.",
        ],
        suggestedActions: [
          { label: "Open B2B Maps Prospector", actionId: "open_prospector", targetTab: "prospector" },
          { label: "Check Deal Pipeline", actionId: "open_deals", targetTab: "deals" },
        ],
      };
    }

    const itemsSummary = context.attentionItems
      .slice(0, 3)
      .map((item, idx) => `${idx + 1}. **${item.title}** (${item.severity.toUpperCase()}): ${item.description}`)
      .join("\n");

    return {
      answer: `Sir, here are the top items requiring your executive intervention:

${itemsSummary}`,
      insights: [
        `Total active attention items: ${context.attentionItems.length}`,
        `Highest severity: ${context.attentionItems[0]?.severity || "normal"}`,
      ],
      suggestedActions: context.attentionItems.slice(0, 2).map((item) => ({
        label: item.actionLabel || "Review Item",
        actionId: `act_${item.id}`,
        targetTab: item.actionModule || "dashboard",
      })),
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
    const dealsList =
      deals.length > 0
        ? deals.slice(0, 3).map((d) => `${d.company} (₹${(d.dealValue / 100000).toFixed(1)}L - ${d.stage})`).join(", ")
        : "Review new B2B prospect discovery pipeline";

    return {
      answer: `Here is the structured **Leadership & Operations Review Agenda** synthesized from your live workspace data:

### 📋 Virtoy Technologies Executive Review Agenda
**1. Financial Health & Pipeline Run-Rate (15 Mins)** — Lead: Mrs. Piyali Sahu (COO)
- Review active pipeline value (₹${pipelineLakhs}L across ${dealsCount} deals).
- Collections status: ₹${revLakhs}L collected, ₹${overdueLakhs}L overdue.

**2. Engineering Deliveries & Milestones (20 Mins)** — Lead: Niranjan Sahu & Ashwin Yadav
- Status of active deployments (${activeProjectsCount} active systems).
- Architecture benchmarks and client QA verification.

**3. Commercial Growth & Prospecting (15 Mins)** — Lead: Rakesh Panda
- Key opportunities in focus: ${dealsList}.
- Inbound inquiries: ${leadsCount} leads captured via social & WhatsApp channels.
- Geo-Radar campaign: ${prospectsCount} scouted enterprises.

**4. Operations & Infrastructure (10 Mins)** — Lead: Mr. Anup Patnaik (Co-Founder)
- SaaS subscriptions & developer infrastructure review (${context.subscriptions.length} active tools).`,
      insights: [
        "Agenda dynamically customized based on current active pipeline and active projects.",
        "60-minute executive session format designed for fast decision-making.",
      ],
      suggestedActions: [
        { label: "Export Full Briefing PDF", actionId: "export_pdf", targetTab: "briefing" },
        { label: "View Multi-Rep Audit Trail", actionId: "audit_trail", targetTab: "audit-trail" },
      ],
    };
  }

  // Query: Revenue / Financials / Targets
  if (q.includes("revenue") || q.includes("financial") || q.includes("target") || q.includes("money") || q.includes("cashflow")) {
    return {
      answer: `Live Financial Telemetry breakdown:
- **Monthly Collections**: ₹${context.financials.monthlyRevenue.toLocaleString("en-IN")}.
- **Target Revenue**: ₹${context.financials.targetRevenue.toLocaleString("en-IN")}.
- **Overdue Invoices**: ₹${context.financials.overdueReceivables.toLocaleString("en-IN")}.
- **Total Pipeline Volume**: ₹${pipelineTotal.toLocaleString("en-IN")} across ${dealsCount} active opportunities.
- **Settlement Velocity**: ${context.financials.collectionVelocity}% on-time collection index.`,
      highlightMetrics: [
        { label: "Collections", value: `₹${revLakhs}L`, trend: `${context.financials.momGrowth}% MoM` },
        { label: "Active Deals", value: `${dealsCount}`, trend: `₹${pipelineLakhs}L volume` },
        { label: "Overdue", value: `₹${overdueLakhs}L`, trend: "Receivables" },
      ],
      suggestedActions: [
        { label: "View Financial Graphs", actionId: "view_dash", targetTab: "dashboard" },
        { label: "Inspect Deal Pipeline", actionId: "view_deals", targetTab: "deals" },
      ],
    };
  }

  // Default fallback response
  return {
    answer: `Sir, I am monitoring live operations across Virtoy Technologies.

Currently tracking:
- **${dealsCount} active pipeline deals** (₹${pipelineLakhs}L total volume)
- **${activeProjectsCount} project deployments**
- **${leadsCount} inbound leads** & **${prospectsCount} scouted commercial enterprises**
- **${attentionCount} active attention items**

You can ask me to:
1. *"How is the company doing today?"*
2. *"Prepare our Monday management review agenda"*
3. *"What needs my immediate attention?"*
4. *"Analyze revenue and active pipeline"*`,
    insights: [
      `Workspace synchronized with ${dealsCount} deals and ${leadsCount} inbound leads.`,
      "All AI telemetry nodes operational.",
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
  deals?: PipelineDeal[];
}): ExecutiveBriefingData {
  const deals = context.deals || [];
  const pipelineTotal = deals.reduce((sum, d) => sum + d.dealValue, 0) || context.financials.totalPipelineValue || 0;
  const pipelineStr = pipelineTotal > 0 ? `₹${(pipelineTotal / 100000).toFixed(1)}L` : "₹0";
  const revStr = context.financials.monthlyRevenue > 0 ? `₹${(context.financials.monthlyRevenue / 100000).toFixed(1)}L` : "₹0";

  const topDeals = deals.map((d) => ({
    client: d.company,
    deal: d.title,
    value: `₹${(d.dealValue / 100000).toFixed(1)} Lakh`,
    rep: d.leadRep,
  }));

  const blockers = context.attentionItems.map((a) => ({
    item: a.title,
    owner: "Executive Leadership",
    impact: a.description,
  }));

  return {
    generatedAt: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    preparedFor: "Mr. Pritiranjan Sahu (CEO) & Executive Leadership",
    executiveSummary: `Virtoy Technologies Pvt. Ltd. operations telemetry report. Active pipeline volume is currently tracking at ${pipelineStr} across ${deals.length} enterprise opportunities. Total active deployments stand at ${context.projects.length} systems with ${context.socialLeads.length} inbound leads captured and ${context.prospects.length} commercial prospects in the discovery radar. ${
      context.attentionItems.length > 0
        ? `${context.attentionItems.length} operational attention items are flagged for leadership review.`
        : "All active systems and collections are operating within standard parameters with zero critical blockers."
    }`,
    kpiSnapshot: {
      monthlyRevenue: revStr,
      momGrowth: `+${context.financials.momGrowth}%`,
      pipelineVolume: pipelineStr,
      collectionEfficiency: `${context.financials.collectionVelocity}%`,
      activeDeployments: context.projects.length,
    },
    criticalBlockers:
      blockers.length > 0
        ? blockers
        : [
            {
              item: "Zero critical blockers currently flagged across engineering or collections.",
              owner: "Executive Operations",
              impact: "Standard commercial velocity maintained.",
            },
          ],
    topWins:
      topDeals.length > 0
        ? topDeals
        : [
            {
              client: "Enterprise Pipeline",
              deal: "Ready to register closed opportunities",
              value: "₹0",
              rep: "Sales & Leadership",
            },
          ],
    weeklyFocus: [
      `Review and advance ${deals.length} active deals in the Pipeline Matrix.`,
      `Follow up on ${context.socialLeads.length} qualified inbound inquiries across WhatsApp and web channels.`,
      `Scout target commercial enterprises in Odisha, India, and UAE using B2B Maps Prospector.`,
      `Maintain 100% on-time milestone delivery across ${context.projects.length} client software projects.`,
    ],
  };
}
