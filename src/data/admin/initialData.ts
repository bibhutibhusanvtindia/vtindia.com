import {
  Employee,
  FinancialMetrics,
  ProjectHealth,
  AttentionItem,
  SocialLead,
  ProspectItem,
  ProofVaultItem,
  SubscriptionItem,
  AuditLog,
  PipelineDeal,
  OutreachTemplate,
} from "./types";

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "emp-1",
    name: "Mr. Pritiranjan Sahu",
    email: "pritiranjan@vtindia.com",
    role: "ceo",
    title: "Chief Executive Officer & Founder",
    department: "Executive",
    avatar: "/images/team/Mr_PRITIRANJAN.png",
    pin: "1111",
    phone: "+91 9861802325",
    status: "online",
  },
  {
    id: "emp-2",
    name: "Mr. Anup Patnaik",
    email: "anup@vtindia.com",
    role: "cofounder",
    title: "Co-Founder & Head of Tech Strategy",
    department: "Executive",
    avatar: "/images/team/Mr_ANUP.png",
    pin: "2222",
    phone: "+91 9437012345",
    status: "online",
  },
  {
    id: "emp-3",
    name: "Mrs. Piyali Sahu",
    email: "piyali@vtindia.com",
    role: "coo",
    title: "Chief Operating Officer",
    department: "Operations",
    avatar: "/images/team/Mrs_PIYALI.png",
    pin: "3333",
    phone: "+91 9861802326",
    status: "online",
  },
  {
    id: "emp-4",
    name: "Mr. Kailash Patnaik",
    email: "kailash@vtindia.com",
    role: "consultant",
    title: "Sr. Consultant (NAAC/NBA Systems)",
    department: "Consulting",
    avatar: "/images/team/Mr_KAILASH.png",
    pin: "4444",
    phone: "+91 9437198765",
    status: "away",
  },
  {
    id: "emp-5",
    name: "Niranjan Sahu",
    email: "niranjan@vtindia.com",
    role: "tech_lead",
    title: "Sr. Software Engineer & Tech Pod Lead",
    department: "Engineering",
    avatar: "/images/team/Mr_Niranjan.png",
    pin: "5555",
    phone: "+91 9778100234",
    status: "online",
  },
  {
    id: "emp-6",
    name: "Ashwin Yadav",
    email: "ashwin@vtindia.com",
    role: "developer",
    title: "Lead Mobile & Spatial AR/VR Engineer",
    department: "Engineering",
    avatar: "/images/team/Mr_Ashwin.png",
    pin: "6666",
    phone: "+91 9861802325",
    status: "online",
  },
  {
    id: "emp-7",
    name: "Ajay Maharana",
    email: "ajay@vtindia.com",
    role: "developer",
    title: "Sr. Database & Backend Architect",
    department: "Engineering",
    avatar: "/images/team/Mr_Ajay.png",
    pin: "7777",
    phone: "+91 9437012345",
    status: "in_meeting",
  },
  {
    id: "emp-8",
    name: "Rakesh Panda",
    email: "rakesh.p@vtindia.com",
    role: "sales",
    title: "Enterprise Growth & Sales Executive",
    department: "Growth & Sales",
    pin: "8888",
    phone: "+91 9861802326",
    status: "online",
  },
];

export const INITIAL_FINANCIALS: FinancialMetrics = {
  monthlyRevenue: 0,
  targetRevenue: 0,
  activeProjectsCount: 0,
  overdueReceivables: 0,
  totalPipelineValue: 0,
  momGrowth: 0,
  collectionVelocity: 100,
  revenueByMonth: [
    { month: "Apr", actual: 0, target: 0 },
    { month: "May", actual: 0, target: 0 },
    { month: "Jun", actual: 0, target: 0 },
    { month: "Jul", actual: 0, target: 0 },
    { month: "Aug", actual: 0, target: 0 },
    { month: "Sep", actual: 0, target: 0 },
  ],
};

export const INITIAL_PROJECTS: ProjectHealth[] = [];

export const INITIAL_ATTENTION_ITEMS: AttentionItem[] = [];

export const INITIAL_SOCIAL_LEADS: SocialLead[] = [];

export const INITIAL_PROSPECTS: ProspectItem[] = [];

export const INITIAL_PROOF_VAULT: ProofVaultItem[] = [];

export const INITIAL_SUBSCRIPTIONS: SubscriptionItem[] = [];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log-init",
    employeeId: "emp-1",
    employeeName: "Mr. Pritiranjan Sahu",
    employeeRole: "CEO",
    action: "Workspace Initialized",
    module: "System Administration",
    details: "Executive Command Center activated with clean operational baseline.",
    timestamp: "Today",
  },
];

export const INITIAL_PIPELINE_DEALS: PipelineDeal[] = [];

export const INITIAL_OUTREACH_TEMPLATES: OutreachTemplate[] = [
  {
    id: "outreach-1",
    title: "Hospital OPD Queue Elimination & Smart HMS",
    sector: "Healthcare",
    targetRole: "Medical Superintendent / Hospital Director",
    channel: "whatsapp",
    hook: "Hospital lobby OPD congestion drops by 70% with 1-click QR tokens.",
    body: "Respected Doctor 🙏, Virtoy Technologies engineered the digital healthcare registry for OMSA. For multi-specialty hospitals, our lightweight cloud HMS eliminates lobby counter lines with QR WhatsApp appointment tokens, instant digital prescriptions, and 100% automated TPA claims. Would you be open to a 5-minute visual demo this week?",
    callToAction: "Reply 'DEMO' or tap https://vtindia.com/products/hospital-hms",
    suggestedFollowUpDays: 2,
  },
  {
    id: "outreach-2",
    title: "Hotel Direct Booking & WhatsApp Room Keys",
    sector: "Hotels & Hospitality",
    targetRole: "General Manager / Owner",
    channel: "whatsapp",
    hook: "Stop paying 18-25% OTA commissions on repeat guests.",
    body: "Namaste Sir ✨, We noticed travelers love your property, but third-party booking portals are taking 20%+ in commissions. Virtoy's Hotel-PMS equips your resort with instant WhatsApp direct check-ins, zero-commission web booking engine, and unified restaurant POS.",
    callToAction: "See our 60-second resort walkthrough: https://vtindia.com/products/hotel-pms",
    suggestedFollowUpDays: 3,
  },
  {
    id: "outreach-3",
    title: "Heavy Industry 6-DoF VR Safety Induction",
    sector: "Manufacturing & Heavy Steel",
    targetRole: "VP Health & Safety / Plant Head",
    channel: "linkedin",
    hook: "Tata Steel standard: Transform 6-hour paper inductions into 15-min VR simulations.",
    body: "Hi [Name], industrial safety heads face high near-miss rates because traditional classroom slides fail to build muscle memory. Virtoy's SafeAct VR simulator allows plant workers to experience high-voltage, blast furnace, and forklift hazard emergencies in photorealistic 3D before entering the live shop floor.",
    callToAction: "Let's connect for a 10-min virtual headset simulation preview.",
    suggestedFollowUpDays: 4,
  },
  {
    id: "outreach-4",
    title: "College NAAC/NBA OBE Accreditation Automation",
    sector: "Higher Education",
    targetRole: "Principal / IQAC Coordinator",
    channel: "email",
    hook: "Automate NAAC SSR Criterion 1-7 documentation in 1 unified dashboard.",
    body: "Respected Principal, preparing for autonomous college NAAC/NBA accreditation often requires months of chaotic faculty spreadsheet coordination. Virtoy's Education ERP, guided by senior academic consultants, auto-calculates CO-PO attainment, student feedback analytics, and NIRF metrics with 1-click SSR exports.",
    callToAction: "Schedule an on-campus consultancy walkthrough: contact@vtindia.com",
    suggestedFollowUpDays: 3,
  },
];
