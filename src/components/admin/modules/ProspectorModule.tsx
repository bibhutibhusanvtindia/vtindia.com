"use client";

import { useState } from "react";
import {
  AlertCircle,
  Building,
  Check,
  Copy,
  Download,
  ExternalLink,
  Filter,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  UserCheck,
  X,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Input } from "@/components/admin/ui/Input";
import { Select } from "@/components/admin/ui/Select";
import { Textarea } from "@/components/admin/ui/Textarea";
import { ProspectItem, PipelineDeal } from "@/data/admin/types";

const CITIES = [
  "All Locations",
  "Bhubaneswar, Odisha",
  "Jajpur, Odisha (Kalinganagar)",
  "Kolkata, West Bengal",
  "Jaipur, Rajasthan",
  "Mumbai, Maharashtra",
  "Dubai, UAE (JAFZA)",
  "Abu Dhabi, UAE (ICAD)",
  "Delhi NCR",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
];

const SECTORS = [
  "All Sectors",
  "Hotels & Hospitality",
  "Logistics & Supply Chain",
  "Hospitals & Healthcare",
  "Heavy Industry",
  "Real Estate & Builders",
  "Autonomous Colleges",
];

// Rich Enterprise Discovery Catalog for dynamic live scanning
const SCOUT_CATALOG: Omit<ProspectItem, "id">[] = [
  {
    companyName: "Emirates Steel Arkan UAE",
    location: "Abu Dhabi, UAE (ICAD)",
    category: "Heavy Industry",
    contactPerson: "Eng. Mansoor Al-Ketbi",
    role: "Head of Industrial Safety & HSE",
    phone: "+971 2 550 1111",
    email: "mansoor.ketbi@emiratessteel.ae",
    website: "https://emiratessteel.com",
    status: "discovered",
    techGaps: [
      "Manual molten steel ladle emergency drill protocol",
      "No 6-DoF VR blast furnace simulation",
      "Delayed multilingual contractor safety credential verification",
    ],
    customPitch:
      "Deploy Virtoy SafeAct 6-DoF molten metal safety simulator across Abu Dhabi mills: eliminate live fire risks during training and train 1,200 technicians annually in Arabic & English.",
    coldCallScript:
      "Good morning Eng. Mansoor. Virtoy Technologies delivers heavy-industry VR safety simulators for Tata Steel. We specialize in hot metal furnace hazard training with zero physical risk. May I send over a 2-minute video case study?",
    estimatedDealValue: "₹28.0L ($34,000)",
  },
  {
    companyName: "Mayfair Heritage Resorts & Spas",
    location: "Bhubaneswar, Odisha",
    category: "Hotels & Hospitality",
    contactPerson: "Mr. Soumya Ranjan Dash",
    role: "VP Hospitality Operations",
    phone: "+91 98618 02325",
    email: "vp.ops@mayfairhotels.com",
    website: "https://mayfairhotels.com",
    status: "discovered",
    techGaps: [
      "Fragmented banquet & restaurant POS billing across 6 resort locations",
      "No instant WhatsApp digital room keys or VIP concierge bot",
      "3-minute check-in queue during peak wedding season",
    ],
    customPitch:
      "Transform guest arrival at Mayfair properties with Virtoy Hotel-PMS: 30-second mobile WhatsApp check-in, real-time banquet inventory tracking, and zero-commission direct booking engine.",
    coldCallScript:
      "Namaskar Mr. Dash. Virtoy Technologies builds modern hospitality ERP engines. For luxury properties like Mayfair, our cloud PMS eliminates lobby lines via WhatsApp check-in and unifies restaurant POS across all units. Would you have 5 minutes for a live demo on Friday?",
    estimatedDealValue: "₹12.0L",
  },
  {
    companyName: "Peerless Hospital & B.K. Roy Research",
    location: "Kolkata, West Bengal",
    category: "Hospitals & Healthcare",
    contactPerson: "Dr. Sabyasachi Sengupta",
    role: "Medical Director",
    phone: "+91 98300 45678",
    email: "director@peerlesshospital.com",
    website: "https://peerlesshospital.com",
    status: "discovered",
    techGaps: [
      "Manual OPD registration counter queues exceeding 40 minutes",
      "No real-time TPA insurance pre-authorization sync with Star Health & MediAssist",
      "Paper-bound discharge summaries causing 3-hour bed turnaround delays",
    ],
    customPitch:
      "Modernize Peerless Hospital with Virtoy Hospital-HMS: Smart QR OPD appointment tokens, NABH-ready EMR, and 1-click automated TPA insurance claims reconciliation.",
    coldCallScript:
      "Good afternoon Dr. Sengupta. I am calling from Virtoy Technologies in Kolkata (Patuli). We engineered the healthcare registry platform for OMSA. For Peerless Hospital, our lightweight HMS cuts OPD lobby wait times by 70% with smartphone QR tokens. We would love to deliver an on-site demo at your EM Bypass campus this week.",
    estimatedDealValue: "₹16.5L",
  },
  {
    companyName: "Lodha World One & Palava City",
    location: "Mumbai, Maharashtra",
    category: "Real Estate & Builders",
    contactPerson: "Ms. Ananya Deshmukh",
    role: "Head of Digital Marketing & Innovation",
    phone: "+91 98200 11998",
    email: "ananya.d@lodhagroup.com",
    website: "https://lodhagroup.com",
    status: "discovered",
    techGaps: [
      "Static 2D brochures and sluggish 3D apps requiring 500MB app downloads",
      "No instant WebXR spatial flat walkthrough link for WhatsApp NRI buyer campaigns",
      "Delayed buyer inquiries from overseas investors in Dubai and London",
    ],
    customPitch:
      "Accelerate luxury real estate sales with Virtoy 3D Spatial WebXR: Photorealistic apartment walkthroughs that open in 1.2 seconds inside mobile browsers with embedded EMI calculators and direct booking triggers.",
    coldCallScript:
      "Hi Ananya. High-net-worth property buyers in Mumbai demand immediate 3D walkthroughs without downloading bulky apps. Our WebXR engine allows NRI investors to tour penthouses inside WhatsApp, tripling consultation-to-booking conversion rates.",
    estimatedDealValue: "₹14.0L",
  },
  {
    companyName: "Jindal Stainless Steel Kalinganagar",
    location: "Jajpur, Odisha (Kalinganagar)",
    category: "Heavy Industry",
    contactPerson: "Mr. Deepak Panda",
    role: "Head of Safety & Environment",
    phone: "+91 94370 55432",
    email: "deepak.p@jindalstainless.com",
    website: "https://jindalstainless.com",
    status: "discovered",
    techGaps: [
      "Hazard observation logging recorded manually in paper logs",
      "Lack of real-time mobile hazard escalation alerts to shift supervisors",
      "Delayed safety compliance tracking for 2,500+ contract personnel",
    ],
    customPitch:
      "Bring Tata Steel-grade digital safety rigor to Jindal Stainless with SafeAct Mobile Suite: 10-second hazard photo reporting, auto-escalation, and contractor biometric gate passes.",
    coldCallScript:
      "Namaskar Mr. Panda. Virtoy Technologies is the engineering team behind Tata Steel's SafeAct safety platform. We help Kalinganagar steel plants eliminate paper registers and achieve zero lost-time injuries with instant smartphone incident reporting.",
    estimatedDealValue: "₹18.0L",
  },
  {
    companyName: "Manipal Hospital Whitefield",
    location: "Bangalore, Karnataka",
    category: "Hospitals & Healthcare",
    contactPerson: "Dr. Arvind Natarajan",
    role: "Chief of Medical Operations",
    phone: "+91 98450 77890",
    email: "arvind.natarajan@manipalhospitals.com",
    website: "https://manipalhospitals.com",
    status: "discovered",
    techGaps: [
      "High patient registration friction during morning OPD peak hours",
      "Doctor consultation notes not synchronized in real-time with pharmacy POS",
      "Outdated patient mobile app with low retention",
    ],
    customPitch:
      "Streamline OPD and IPD workflows at Manipal Whitefield with Virtoy's lightweight, high-performance Hospital-HMS featuring 1-click QR token issuance and real-time pharmacy dispensing sync.",
    coldCallScript:
      "Hello Dr. Natarajan. Virtoy Technologies builds NABH-compliant hospital management platforms that automate OPD queues and pharmacy dispensing. We can share a 10-minute live demonstration for your administrative board.",
    estimatedDealValue: "₹15.0L",
  },
];

export function ProspectorModule({
  prospects,
  onUpdateStatus,
  onAddProspect,
  onAddDeal,
  onSelectTab,
}: {
  prospects: ProspectItem[];
  onUpdateStatus: (id: string, status: ProspectItem["status"]) => void;
  onAddProspect: (prospect: Omit<ProspectItem, "id">) => void;
  onAddDeal?: (deal: Omit<PipelineDeal, "id" | "lastActivity">) => void;
  onSelectTab?: (tabId: string) => void;
}) {
  const [selectedCity, setSelectedCity] = useState("All Locations");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProspectId, setActiveProspectId] = useState<string>(prospects[0]?.id || "");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [convertedDealId, setConvertedDealId] = useState<string | null>(null);

  // New Prospect Form State
  const [formData, setFormData] = useState({
    companyName: "",
    location: "Bhubaneswar, Odisha",
    category: "Hotels & Hospitality",
    contactPerson: "",
    role: "Managing Director",
    phone: "",
    email: "",
    website: "",
    estimatedDealValue: "₹8.0L",
    techGaps: ["Manual paper-bound processes", "Lack of mobile WhatsApp automation", "Delayed reporting workflows"],
    customPitch: "",
    coldCallScript: "",
  });
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  // Filter prospects
  const filteredProspects = prospects.filter((p) => {
    const matchesCity = selectedCity === "All Locations" || p.location.toLowerCase().includes(selectedCity.split(",")[0].toLowerCase());
    const matchesSector = selectedSector === "All Sectors" || p.category === selectedSector;
    const matchesSearch =
      searchQuery === "" ||
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSector && matchesSearch;
  });

  const activeProspect = prospects.find((p) => p.id === activeProspectId) || filteredProspects[0] || prospects[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // AI Discovery Scanner
  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanStep("Querying Google Maps & MCA Corporate Graph...");

    setTimeout(() => {
      setScanStep("Diagnosing Digital & Technical Architecture Gaps...");
    }, 600);

    setTimeout(() => {
      setScanStep("Synthesizing Executive Value Pitch & Scripts...");
    }, 1100);

    setTimeout(() => {
      // Find candidate from catalog that hasn't been added yet
      const existingNames = new Set(prospects.map((p) => p.companyName.toLowerCase()));
      const available = SCOUT_CATALOG.filter((c) => !existingNames.has(c.companyName.toLowerCase()));

      let newProspect: Omit<ProspectItem, "id">;

      if (available.length > 0) {
        // Pick one matching the current filter if possible
        const matching = available.find(
          (c) =>
            (selectedCity === "All Locations" || c.location.includes(selectedCity.split(",")[0])) &&
            (selectedSector === "All Sectors" || c.category === selectedSector)
        );
        newProspect = matching || available[0];
      } else {
        // Synthesize dynamic one based on selected filters
        const city = selectedCity === "All Locations" ? "Bhubaneswar, Odisha" : selectedCity;
        const sector = selectedSector === "All Sectors" ? "Enterprise ERP" : selectedSector;
        const randId = Math.floor(Math.random() * 900) + 100;

        newProspect = {
          companyName: `${city.split(",")[0]} Apex Commercial Group #${randId}`,
          location: city,
          category: sector,
          contactPerson: "Mr. R. K. Mohapatra",
          role: "Chief Technology & Operations Officer",
          phone: "+91 98618 02325",
          email: `cto@apexgroup-${randId}.com`,
          website: `https://apexgroup-${randId}.in`,
          status: "discovered",
          techGaps: [
            "Legacy client-server database with no mobile synchronization",
            "Manual field operational reporting resulting in 48-hour data lag",
            "Lack of automated customer WhatsApp messaging integration",
          ],
          customPitch: `Modernize ${city.split(",")[0]} Apex Group operations with Virtoy custom enterprise platforms: zero-lag cloud sync, real-time smartphone telemetry, and automated customer engagement.`,
          coldCallScript: `Good morning Mr. Mohapatra. Virtoy Technologies delivers custom enterprise cloud solutions for conglomerates like Tata Steel. We help commercial leaders in ${city.split(",")[0]} eliminate legacy software bottlenecks and automate customer workflows. May I schedule a brief 10-minute live demonstration?`,
          estimatedDealValue: "₹10.5L",
        };
      }

      onAddProspect(newProspect);
      setIsScanning(false);
      setScanStep("");
    }, 1600);
  };

  // Auto-Fill AI generator for manual prospect
  const handleAutoFillPitch = () => {
    if (!formData.companyName) {
      alert("Please enter a Company Name first.");
      return;
    }
    setIsAutoFilling(true);
    setTimeout(() => {
      const comp = formData.companyName;
      const sec = formData.category;
      const contact = formData.contactPerson || "Executive Leadership";

      let gaps = [
        "Manual paperwork & spreadsheet bottlenecks",
        "Lack of real-time mobile tracking & alerts",
        "No customer self-service or WhatsApp integration",
      ];
      let pitch = `Transform ${comp} operations with Virtoy Technologies custom enterprise solutions: high-speed cloud architecture, automated customer notifications, and real-time management dashboards.`;
      let script = `Good morning ${contact}. This is Virtoy Technologies. We help industry leaders modernize their core business systems and eliminate operational delays. We would love to share a 5-minute visual walkthrough for ${comp}.`;

      if (sec === "Hotels & Hospitality") {
        gaps = [
          "High 20%+ OTA commissions on repeat guests",
          "No automated WhatsApp room keys or digital check-in",
          "Fragmented restaurant & banquet billing terminals",
        ];
        pitch = `Equip ${comp} with Virtoy Hotel-PMS: 30-second mobile WhatsApp check-in, direct zero-commission booking engine, and unified restaurant POS.`;
        script = `Namaste ${contact}. Virtoy Technologies builds modern hospitality systems. For ${comp}, our Hotel-PMS eliminates lobby check-in lines and saves up to 22% in OTA commissions. Would you be open to a 5-minute live preview this Thursday?`;
      } else if (sec === "Heavy Industry") {
        gaps = [
          "Unsafe observation logs recorded manually on paper",
          "No real-time blast furnace / shopfloor mobile telemetry alerts",
          "Lack of 6-DoF VR immersive hazard safety simulations",
        ];
        pitch = `Deploy Tata Steel-proven SafeAct safety suites at ${comp}: 10-second hazard photo reporting, contractor biometric passes, and photorealistic 6-DoF VR hazard training.`;
        script = `Namaskar ${contact}. Virtoy Technologies powers Tata Steel's SafeAct safety platform. We help heavy industrial plants eliminate lost-time injuries with instant smartphone hazard logging. May I share a 2-minute video case study?`;
      } else if (sec === "Hospitals & Healthcare") {
        gaps = [
          "OPD counter queues exceeding 45 minutes",
          "Delayed TPA insurance claim approvals due to manual paperwork",
          "Missing NABH-compliant electronic prescription app for doctors",
        ];
        pitch = `Modernize ${comp} with Virtoy Hospital-HMS: Smart QR OPD queues, instant digital discharge notes, and automated TPA insurance reconciliation.`;
        script = `Good afternoon ${contact}. Virtoy Technologies built the digital healthcare registry for OMSA. For ${comp}, our cloud HMS cuts lobby wait times by 70% with smartphone QR passes. We can deliver an on-site demo this week.`;
      }

      setFormData((prev) => ({
        ...prev,
        techGaps: gaps,
        customPitch: pitch,
        coldCallScript: script,
      }));
      setIsAutoFilling(false);
    }, 500);
  };

  const handleCreateCustomProspect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName) return;

    onAddProspect({
      companyName: formData.companyName,
      location: formData.location,
      category: formData.category,
      contactPerson: formData.contactPerson || "Managing Director",
      role: formData.role,
      phone: formData.phone || "+91 98618 02325",
      email: formData.email || `contact@${formData.companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      website: formData.website || `https://${formData.companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      status: "discovered",
      techGaps: formData.techGaps,
      customPitch: formData.customPitch || `Custom executive solution for ${formData.companyName} by Virtoy Technologies.`,
      coldCallScript: formData.coldCallScript || `Introductory cold call pitch for ${formData.companyName}.`,
      estimatedDealValue: formData.estimatedDealValue,
    });

    setIsAddModalOpen(false);
    setFormData({
      companyName: "",
      location: "Bhubaneswar, Odisha",
      category: "Hotels & Hospitality",
      contactPerson: "",
      role: "Managing Director",
      phone: "",
      email: "",
      website: "",
      estimatedDealValue: "₹8.0L",
      techGaps: ["Manual paper-bound processes", "Lack of mobile WhatsApp automation", "Delayed reporting workflows"],
      customPitch: "",
      coldCallScript: "",
    });
  };

  // Convert to Pipeline Deal
  const handleConvertToDeal = (prospect: ProspectItem) => {
    if (onAddDeal) {
      // Parse numeric value from estimatedDealValue
      const numMatch = prospect.estimatedDealValue.match(/\d+(\.\d+)?/);
      const valLakhs = numMatch ? parseFloat(numMatch[0]) : 8.0;
      const dealVal = valLakhs < 100 ? valLakhs * 100000 : valLakhs;

      onAddDeal({
        title: `${prospect.category} Enterprise Platform (${prospect.companyName})`,
        company: prospect.companyName,
        sector: prospect.category,
        location: prospect.location,
        stage: "discovery",
        dealValue: Math.round(dealVal),
        winProbability: 60,
        leadRep: "Rakesh Panda",
        aiHealthScore: 85,
        aiBottleneck: `Initial enterprise outreach initiated with ${prospect.contactPerson} (${prospect.role}).`,
        aiNextBestAction: `Dispatch personalized value pitch and schedule 15-minute live architecture demo.`,
        expectedClose: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      });

      onUpdateStatus(prospect.id, "converted");
      setConvertedDealId(prospect.id);
      setTimeout(() => setConvertedDealId(null), 4000);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["Company Name", "Location", "Category", "Contact Person", "Role", "Phone", "Email", "Deal Value", "Status"];
    const rows = filteredProspects.map((p) => [
      `"${p.companyName}"`,
      `"${p.location}"`,
      `"${p.category}"`,
      `"${p.contactPerson}"`,
      `"${p.role}"`,
      `"${p.phone}"`,
      `"${p.email}"`,
      `"${p.estimatedDealValue}"`,
      `"${p.status}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `virtoy_b2b_prospects_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200/90 bg-gradient-to-br from-white via-[#FFF5F8] to-[#FCE7F3]/70 p-6 sm:p-7 shadow-sm">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-[#F0186C]/15 to-[#FF4D8D]/5 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-sm shadow-[#F0186C]/25">
                <MapPin className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                AI B2B Maps Prospector &amp;{" "}
                <span className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] bg-clip-text text-transparent">
                  Lead Discovery Engine
                </span>
              </h2>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
                Live Geo-Radar
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Locate high-value commercial enterprises, diagnose tech &amp; architecture gaps, generate customized cold-call scripts, and convert prospects directly into active deals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              className="border-2 border-pink-200 bg-white text-slate-800 hover:bg-pink-50 rounded-xl font-bold gap-1.5 shadow-2xs"
            >
              <Plus className="h-4 w-4 text-[#D6135F]" />
              <span>Add Custom Enterprise</span>
            </Button>

            <Button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white gap-2 shadow-md shadow-[#F0186C]/25 font-bold rounded-xl px-4 py-2"
            >
              <Sparkles className={`h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
              <span>{isScanning ? "Scanning Geo-Nodes..." : "AI Scout New Enterprises"}</span>
            </Button>
          </div>
        </div>

        {/* Live Scanning Animated Telemetry Bar */}
        {isScanning && (
          <div className="mt-4 rounded-2xl border border-pink-200 bg-white p-3.5 shadow-xs animate-pulse flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full border-2 border-[#F0186C] border-t-transparent animate-spin" />
              <span className="text-xs font-mono font-bold text-[#D6135F]">{scanStep}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 font-bold">Scanning: {selectedCity} · {selectedSector}</span>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-pink-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* City Selector */}
          <div className="w-52">
            <Select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white border-2 border-pink-100 text-slate-800 text-xs rounded-xl focus:border-[#F0186C]"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </div>

          {/* Sector Selector */}
          <div className="w-52">
            <Select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-white border-2 border-pink-100 text-slate-800 text-xs rounded-xl focus:border-[#F0186C]"
            >
              {SECTORS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </div>

          {/* Search Input */}
          <div className="relative w-60">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#D6135F]" />
            <Input
              type="text"
              placeholder="Search enterprise, city, contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-2 border-pink-100 text-slate-800 text-xs rounded-xl placeholder:text-slate-400 focus:border-[#F0186C]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-600 font-semibold px-2">
            <span>
              Found <strong className="text-[#D6135F] font-black">{filteredProspects.length}</strong> Target Enterprises
            </span>
          </div>

          <Button
            variant="outline"
            size="xs"
            onClick={handleExportCSV}
            className="border-2 border-pink-100 text-slate-700 hover:bg-pink-50 rounded-xl font-bold gap-1.5"
            title="Export CSV"
          >
            <Download className="h-3.5 w-3.5 text-[#D6135F]" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* 2-Column Prospector View */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1.7fr] lg:items-start">
        {/* Left Column: Prospects List */}
        <div className="space-y-3">
          <div className="space-y-3 max-h-[660px] overflow-y-auto pr-1">
            {filteredProspects.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-pink-200 bg-white p-8 text-center space-y-3">
                <MapPin className="h-8 w-8 text-[#D6135F] mx-auto opacity-50" />
                <p className="text-sm font-bold text-slate-800">No enterprises match the filter criteria</p>
                <p className="text-xs text-slate-500">Click &quot;AI Scout New Enterprises&quot; to discover target companies in {selectedCity}.</p>
                <Button
                  size="sm"
                  onClick={handleSimulateScan}
                  className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white font-bold rounded-xl text-xs gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Discover Enterprises Now</span>
                </Button>
              </div>
            ) : (
              filteredProspects.map((prosp) => {
                const isSelected = activeProspect?.id === prosp.id;

                return (
                  <div
                    key={prosp.id}
                    onClick={() => setActiveProspectId(prosp.id)}
                    className={`group relative flex flex-col gap-2.5 rounded-3xl border p-4 cursor-pointer transition-all shadow-xs ${
                      isSelected
                        ? "border-[#F0186C] bg-gradient-to-br from-[#FFF8FA] to-pink-50/50 ring-2 ring-[#F0186C]/40 shadow-sm"
                        : "border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50/30 hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#D6135F] transition-colors">
                          {prosp.companyName}
                        </h4>
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                          <MapPin className="h-3 w-3 shrink-0 text-[#D6135F]" />
                          <span>{prosp.location}</span>
                        </div>
                      </div>

                      <span className="rounded-lg bg-pink-50 px-2 py-0.5 text-[10px] font-bold text-[#D6135F] border border-pink-200">
                        {prosp.category}
                      </span>
                    </div>

                    {/* Decision Maker */}
                    <div className="flex items-center justify-between text-[11px] border-t border-pink-100/70 pt-2 text-slate-600">
                      <span>
                        <strong className="text-slate-900">{prosp.contactPerson}</strong> ({prosp.role})
                      </span>
                      <span className="font-mono font-black text-emerald-700">
                        {prosp.estimatedDealValue}
                      </span>
                    </div>

                    {/* Tech gaps count & status */}
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1 text-amber-800 font-bold">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                        {prosp.techGaps.length} Architecture Gaps
                      </span>
                      <span className={`capitalize font-bold text-[10px] rounded-lg px-2 py-0.5 ${
                        prosp.status === "converted"
                          ? "bg-emerald-100 text-emerald-800 font-black border border-emerald-300"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {prosp.status === "converted" ? "🎉 Converted Deal" : prosp.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Deep Tech Gap Diagnosis & Pitch Engine */}
        {activeProspect ? (
          <div className="rounded-3xl border border-pink-100 bg-white p-6 space-y-5 shadow-sm">
            {/* Converted Success Banner */}
            {convertedDealId === activeProspect.id && (
              <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-2.5">
                  <Check className="h-5 w-5 text-emerald-600 font-black" />
                  <div>
                    <h5 className="text-xs font-black text-emerald-900">Successfully Transferred to Pipeline Deal Matrix!</h5>
                    <p className="text-[11px] text-emerald-700">A new deal record has been created for {activeProspect.companyName}.</p>
                  </div>
                </div>
                {onSelectTab && (
                  <Button
                    size="xs"
                    onClick={() => onSelectTab("deals")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs gap-1"
                  >
                    <span>View Deals ➔</span>
                  </Button>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-pink-100">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-black text-slate-900">{activeProspect.companyName}</h3>
                  <span className="rounded-full bg-pink-50 px-2.5 py-0.5 text-[10px] font-bold text-[#D6135F] border border-pink-200">
                    {activeProspect.category}
                  </span>
                  <span className="font-mono font-black text-emerald-700 text-xs">
                    Est: {activeProspect.estimatedDealValue}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-medium">
                  <span>📍 {activeProspect.location}</span>
                  <a
                    href={activeProspect.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#D6135F] hover:underline font-bold"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    Visit Website
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>

              {/* Status Update & Convert Button */}
              <div className="flex items-center gap-2">
                <div className="w-36">
                  <Select
                    value={activeProspect.status}
                    onChange={(e) => onUpdateStatus(activeProspect.id, e.target.value as ProspectItem["status"])}
                    className="bg-white border-2 border-pink-200 text-slate-800 text-xs rounded-xl focus:border-[#F0186C]"
                  >
                    <option value="discovered">🔍 Discovered</option>
                    <option value="contacted">📞 Contacted</option>
                    <option value="in_negotiation">💼 In Negotiation</option>
                    <option value="converted">🎉 Converted</option>
                  </Select>
                </div>

                {activeProspect.status !== "converted" && onAddDeal && (
                  <Button
                    size="xs"
                    onClick={() => handleConvertToDeal(activeProspect)}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs gap-1 shadow-sm"
                    title="Convert into Active Deal"
                  >
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Convert to Deal</span>
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-5">
              {/* Verified Decision Maker Contact Card & 1-Click Triggers */}
              <div className="grid sm:grid-cols-2 gap-3 rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50/40 to-white p-4 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-black tracking-wider">Primary Decision Maker</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{activeProspect.contactPerson}</div>
                  <div className="text-[11px] text-[#D6135F] font-bold">{activeProspect.role}</div>
                </div>

                <div className="space-y-2 font-medium">
                  <div className="flex items-center justify-between text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-[#D6135F]" />
                      <a href={`tel:${activeProspect.phone}`} className="hover:underline font-semibold font-mono">
                        {activeProspect.phone}
                      </a>
                    </div>
                    <a
                      href={`tel:${activeProspect.phone}`}
                      className="text-[10px] font-bold text-white bg-[#D6135F] px-2 py-0.5 rounded-lg hover:bg-[#B00D4D]"
                    >
                      Call
                    </a>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <div className="flex items-center gap-1.5 truncate mr-2">
                      <Mail className="h-3.5 w-3.5 text-[#D6135F] shrink-0" />
                      <a href={`mailto:${activeProspect.email}`} className="hover:underline truncate font-mono text-[11px]">
                        {activeProspect.email}
                      </a>
                    </div>
                    <a
                      href={`mailto:${activeProspect.email}?subject=Virtoy%20Technologies%20Proposal%20for%20${encodeURIComponent(activeProspect.companyName)}&body=${encodeURIComponent(activeProspect.customPitch)}`}
                      className="text-[10px] font-bold text-slate-700 bg-pink-100 px-2 py-0.5 rounded-lg hover:bg-pink-200 shrink-0"
                    >
                      Email
                    </a>
                  </div>

                  {/* 1-Click WhatsApp Direct Pitch */}
                  <div className="pt-1">
                    <a
                      href={`https://wa.me/${activeProspect.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(activeProspect.coldCallScript)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 text-xs shadow-xs transition-colors"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>1-Click WhatsApp Pitch</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* AI Diagnosed Technical Gaps */}
              <div>
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <span>AI Diagnosed Architecture &amp; Operational Gaps</span>
                </label>
                <div className="mt-2 space-y-1.5">
                  {activeProspect.techGaps.map((gap, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-950 font-medium"
                    >
                      <span className="font-mono text-[10px] font-black text-amber-800 mt-0.5">0{idx + 1}</span>
                      <span>{gap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tailored Value Proposition Pitch */}
              <div>
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-[#D6135F]" />
                  <span>Personalized Executive Value Pitch</span>
                </label>
                <div className="mt-1.5 rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50/40 to-rose-50/20 p-4 text-xs leading-relaxed text-slate-800 font-medium">
                  {activeProspect.customPitch}
                </div>
              </div>

              {/* Ready Cold-Call Script Box */}
              <div className="rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white to-[#FFF5F8] p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#D6135F]">
                    <span>📞 60-Second Cold-Call Telephone Script</span>
                  </div>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleCopy(activeProspect.coldCallScript, activeProspect.id)}
                    className="border-2 border-pink-200 bg-white text-slate-700 hover:bg-pink-50 rounded-xl font-bold"
                  >
                    {copiedId === activeProspect.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-[#D6135F]" />}
                    <span>{copiedId === activeProspect.id ? "Script Copied" : "Copy Script"}</span>
                  </Button>
                </div>

                <div className="rounded-2xl border border-pink-100 bg-white p-4 text-xs leading-relaxed text-slate-800 whitespace-pre-wrap font-sans font-normal">
                  &ldquo;{activeProspect.coldCallScript}&rdquo;
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Modal: Add Custom Enterprise Lead */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-3xl border-2 border-pink-200 bg-white p-6 sm:p-7 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-100 text-[#D6135F]">
                  <Plus className="h-4 w-4" />
                </span>
                <h3 className="text-lg font-black text-slate-900">Add Target Commercial Enterprise</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-pink-50 flex items-center justify-center text-slate-500 hover:text-[#D6135F]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomProspect} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Company Name *</label>
                  <Input
                    required
                    placeholder="e.g. Swosti Grand Luxury Hotels"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="border-pink-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Location / City *</label>
                  <Input
                    required
                    placeholder="e.g. Bhubaneswar, Odisha"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="border-pink-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Sector / Category</label>
                  <Select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="border-pink-200 rounded-xl"
                  >
                    {SECTORS.filter((s) => s !== "All Sectors").map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Estimated Deal Value</label>
                  <Input
                    placeholder="e.g. ₹9.5L"
                    value={formData.estimatedDealValue}
                    onChange={(e) => setFormData({ ...formData, estimatedDealValue: e.target.value })}
                    className="border-pink-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Decision Maker Name</label>
                  <Input
                    placeholder="e.g. Mr. Rajesh Mohanty"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="border-pink-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Role / Title</label>
                  <Input
                    placeholder="e.g. Managing Director / VP Ops"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="border-pink-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Contact Phone / WhatsApp</label>
                  <Input
                    placeholder="e.g. +91 98618 02325"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="border-pink-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Corporate Email</label>
                  <Input
                    placeholder="e.g. md@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-pink-200 rounded-xl"
                  />
                </div>
              </div>

              {/* AI Auto-Fill Action */}
              <div className="rounded-2xl border border-pink-200 bg-pink-50/60 p-3 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-[#D6135F]">AI Architecture Diagnosis &amp; Pitch</h5>
                  <p className="text-[11px] text-slate-600">Auto-generate technical gaps, customized value proposition, and phone script.</p>
                </div>
                <Button
                  type="button"
                  size="xs"
                  disabled={isAutoFilling}
                  onClick={handleAutoFillPitch}
                  className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white font-bold rounded-xl text-xs gap-1 shadow-xs"
                >
                  <Sparkles className={`h-3.5 w-3.5 ${isAutoFilling ? "animate-spin" : ""}`} />
                  <span>{isAutoFilling ? "Synthesizing..." : "AI Auto-Fill"}</span>
                </Button>
              </div>

              {formData.customPitch && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">AI Generated Value Pitch</label>
                  <Textarea
                    rows={2}
                    value={formData.customPitch}
                    onChange={(e) => setFormData({ ...formData, customPitch: e.target.value })}
                    className="border-pink-200 rounded-xl text-xs"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-pink-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-600 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white font-bold rounded-xl px-5"
                >
                  Save &amp; Discover Enterprise
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
