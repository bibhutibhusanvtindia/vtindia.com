export type EmployeeRole =
  | "ceo"
  | "coo"
  | "cofounder"
  | "consultant"
  | "tech_lead"
  | "developer"
  | "sales";

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: EmployeeRole;
  title: string;
  department: "Executive" | "Engineering" | "Consulting" | "Operations" | "Growth & Sales";
  avatar?: string;
  pin: string;
  phone: string;
  status: "online" | "away" | "in_meeting";
}

export interface FinancialMetrics {
  monthlyRevenue: number; // e.g. 2480000 (₹24.8L)
  targetRevenue: number; // e.g. 3000000 (₹30L)
  activeProjectsCount: number;
  overdueReceivables: number; // e.g. 420000 (₹4.2L)
  totalPipelineValue: number; // e.g. 6850000 (₹68.5L)
  momGrowth: number; // e.g. 18.4 (%)
  collectionVelocity: number; // e.g. 94.2 (%)
  revenueByMonth: { month: string; actual: number; target: number }[];
}

export interface ProjectHealth {
  id: string;
  name: string;
  client: string;
  category: "Safety VR" | "Enterprise ERP" | "Hospital HMS" | "Govt App" | "WebXR";
  status: "on_track" | "at_risk" | "critical" | "completed";
  progress: number;
  dealValue: string;
  leadEngineer: string;
  nextMilestone: string;
  dueDate: string;
}

export interface AttentionItem {
  id: string;
  title: string;
  description: string;
  category: "receivable" | "subscription" | "lead" | "delivery" | "security";
  severity: "critical" | "high" | "medium";
  actionLabel: string;
  actionModule: string;
  timestamp: string;
}

export type SocialPlatform = "instagram" | "youtube" | "facebook" | "twitter" | "whatsapp";

export interface SocialLead {
  id: string;
  platform: SocialPlatform;
  senderName: string;
  senderHandle: string;
  avatarUrl?: string;
  message: string;
  timestamp: string;
  qualificationScore: number; // 0 - 100
  sentiment: "positive" | "neutral" | "high_intent";
  estimatedDealValue: string;
  status: "new" | "qualified" | "demo_booked" | "proposal_sent" | "won" | "archived";
  suggestedReply: string;
  assignedRep: string;
  techInterests: string[];
}

export interface ProspectItem {
  id: string;
  companyName: string;
  location: string;
  category: string;
  contactPerson: string;
  role: string;
  phone: string;
  email: string;
  website: string;
  status: "discovered" | "contacted" | "in_negotiation" | "converted";
  techGaps: string[];
  customPitch: string;
  coldCallScript: string;
  estimatedDealValue: string;
}

export interface ProofVaultItem {
  id: string;
  clientName: string;
  dealTitle: string;
  dealValue: string;
  uploadedBy: string;
  uploadedByRole: string;
  type: "whatsapp_screenshot" | "audio_recording" | "meeting_note" | "contract";
  fileUrl?: string;
  fileName: string;
  timestamp: string;
  takeaways: string[];
  commitments: string[];
  objections: string[];
  actionItems: { task: string; assignedTo: string; due: string }[];
}

export interface SubscriptionItem {
  id: string;
  name: string;
  provider: string;
  category: "ai_tool" | "cloud_infra" | "dev_ops" | "productivity" | "domain";
  costPerMonth: number; // in USD
  currency: string;
  billingCycle: "monthly" | "annual";
  nextRenewalDate: string;
  daysUntilRenewal: number;
  seatCount: number;
  activeSeats: number;
  optimizationTip: string;
  status: "active" | "expiring_soon" | "review_needed";
}

export interface AuditLog {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeRole: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
}

export interface ExecutiveBriefingData {
  generatedAt: string;
  preparedFor: string;
  executiveSummary: string;
  kpiSnapshot: {
    monthlyRevenue: string;
    momGrowth: string;
    pipelineVolume: string;
    collectionEfficiency: string;
    activeDeployments: number;
  };
  criticalBlockers: { item: string; owner: string; impact: string }[];
  topWins: { client: string; deal: string; value: string; rep: string }[];
  weeklyFocus: string[];
}
