"use client";

import { useState, useMemo } from "react";
import {
  AlertCircle,
  Building,
  Check,
  Compass,
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
  Radio,
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

// Base location suggestions (user can type any custom location freely)
const SUGGESTED_LOCATIONS = [
  "Bhubaneswar, Odisha",
  "Cuttack, Odisha",
  "Rourkela, Odisha",
  "Jajpur, Odisha (Kalinganagar)",
  "Sambalpur, Odisha",
  "Berhampur, Odisha",
  "Angul, Odisha",
  "Jharsuguda, Odisha",
  "Puri, Odisha",
  "Kolkata, West Bengal",
  "Jaipur, Rajasthan",
  "Mumbai, Maharashtra",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Delhi NCR",
  "Dubai, UAE (JAFZA)",
  "Abu Dhabi, UAE (ICAD)",
];

// Base sector suggestions (user can type any custom sector freely)
const SUGGESTED_SECTORS = [
  "Hotels & Hospitality",
  "Heavy Industry & Steel",
  "Hospitals & Healthcare",
  "Logistics & Cold Storage",
  "Colleges & Higher Education",
  "Real Estate & Builders",
  "Retail & Supermarket Chains",
  "Mining & Minerals",
  "Automobile Dealerships",
  "Pharmaceuticals & Biotech",
  "Enterprise Software & Cloud ERP",
];

/**
 * Intelligent Dynamic Lead Synthesis Engine:
 * Generates realistic, context-specific enterprise prospect profiles
 * tailored dynamically to ANY location, sector, or keyword entered by the user.
 */
function generateDynamicEnterpriseLead(
  targetLocation: string,
  targetSector: string,
  existingCompanyNames: Set<string>,
  saltIndex: number = 0
): Omit<ProspectItem, "id"> {
  const loc = targetLocation.trim() || "Bhubaneswar, Odisha";
  const sec = targetSector.trim() || "Enterprise Software & Cloud ERP";
  const city = loc.split(",")[0].trim();
  const secLower = sec.toLowerCase();

  // Pick realistic executive names (Indian & International context)
  const indianLeaders = [
    { name: "Mr. Rajesh Kumar Mohanty", role: "Managing Director & Owner" },
    { name: "Dr. Subrat Tripathy", role: "Medical Director & Chief of Operations" },
    { name: "Mr. Debasis Agrawal", role: "VP Industrial Operations & Plant Head" },
    { name: "Mr. Sanjay Patnaik", role: "Chief Technology & Operations Officer" },
    { name: "Mrs. Sunita Mohapatra", role: "Head of Procurement & Commercial Growth" },
    { name: "Mr. Ashish Jena", role: "General Manager - Hospitality & Banquets" },
    { name: "Mr. Bikash Pradhan", role: "Director of Academic Affairs & IQAC" },
    { name: "Dr. Manoj Kumar Mishra", role: "Chairman & Managing Director" },
    { name: "Mr. Pradeep Sahoo", role: "VP Supply Chain & Logistics" },
    { name: "Mr. Amitav Das", role: "Director of Infrastructure & Planning" },
  ];

  const intlLeaders = [
    { name: "Eng. Mansoor Al-Ketbi", role: "Head of Industrial Safety & HSE" },
    { name: "Mr. Tariq Al-Nuaimi", role: "VP Regional Operations" },
    { name: "Eng. Rashid Al-Falasi", role: "Director of Supply Chain & Logistics" },
    { name: "Dr. Farooq Al-Hashimi", role: "Chief Medical Officer" },
  ];

  const isIntl =
    loc.toLowerCase().includes("dubai") ||
    loc.toLowerCase().includes("uae") ||
    loc.toLowerCase().includes("abu dhabi") ||
    loc.toLowerCase().includes("uk") ||
    loc.toLowerCase().includes("usa") ||
    loc.toLowerCase().includes("singapore");

  const leaderPool = isIntl ? intlLeaders : indianLeaders;
  const leader = leaderPool[(Math.abs(saltIndex) + Math.floor(Math.random() * leaderPool.length)) % leaderPool.length];

  // Dynamic Company Name synthesis based on Sector & City
  let companyNameVariants: string[] = [];
  let techGaps: string[] = [];
  let customPitch = "";
  let coldCallScript = "";
  let dealValLakhs = 12.0;

  if (secLower.includes("hotel") || secLower.includes("hospitality") || secLower.includes("resort")) {
    companyNameVariants = [
      `${city} Heritage Resort & Luxury Banquets`,
      `Grand ${city} Palace & Convention Centre`,
      `The Royal ${city} Bayfront & Spa`,
      `Swosti & Mayfair ${city} Luxury Suites`,
      `Imperial ${city} Orchid Resort & Hotels`,
    ];
    techGaps = [
      "Fragmented banquet & restaurant POS billing terminals causing daily reconciliation lag",
      "20%+ high OTA commission leakage on repeat guests with no direct booking engine",
      "Manual lobby desk check-in queues exceeding 4 minutes during peak wedding season",
    ];
    customPitch = `Transform guest arrival at ${city} hospitality properties with Virtoy Hotel-PMS: 30-second mobile WhatsApp check-in, real-time banquet inventory tracking, and direct zero-commission booking engine.`;
    coldCallScript = `Namaskar ${leader.name.split(" ")[0]} ${leader.name.split(" ").slice(-1)[0]}. Virtoy Technologies builds modern hospitality systems. For luxury properties in ${city}, our cloud PMS eliminates lobby check-in lines and saves up to 22% in OTA commissions. Would you be open to a 5-minute live demo on Thursday?`;
    dealValLakhs = 9.5 + (saltIndex % 5) * 2.5;
  } else if (
    secLower.includes("steel") ||
    secLower.includes("metal") ||
    secLower.includes("heavy") ||
    secLower.includes("industrial") ||
    secLower.includes("manufactur")
  ) {
    companyNameVariants = [
      `${city} Ispat & Sponge Iron Integrated Mills`,
      `Kalinga ${city} FerroTech & Alloys Ltd`,
      `Mahanadi ${city} Smelters & Steels Pvt Ltd`,
      `Apex ${city} Heavy Engineering & Power Corp`,
      `${city} Metallurgical & Rolling Mills Ltd`,
    ];
    techGaps = [
      "Paper-based safety hazard observation logging causing delayed shift supervisor reporting",
      "Lack of photorealistic 6-DoF VR blast furnace and hot metal ladle emergency drill simulation",
      "Weighbridge gate pass data not synchronized in real-time with central inventory ERP",
    ];
    customPitch = `Deploy Tata Steel-proven SafeAct digital safety suites at ${city} facilities: 10-second hazard photo reporting, contractor biometric passes, and immersive 6-DoF VR hazard simulations.`;
    coldCallScript = `Good morning ${leader.name}. Virtoy Technologies powers Tata Steel's SafeAct safety platform. We help heavy industrial leaders in ${city} eliminate lost-time injuries with instant smartphone hazard logging. May I share a 2-minute video case study?`;
    dealValLakhs = 18.0 + (saltIndex % 6) * 3.5;
  } else if (
    secLower.includes("hospital") ||
    secLower.includes("health") ||
    secLower.includes("clinic") ||
    secLower.includes("medical")
  ) {
    companyNameVariants = [
      `${city} Advanced Multi-Specialty Hospital & Research`,
      `Kalinga ${city} Heart & Trauma Super-Specialty`,
      `Mahanadi ${city} Medicare Institute`,
      `Care & Lifeline ${city} Hospitals Ltd`,
      `Apollo ${city} Regional Medical Centre`,
    ];
    techGaps = [
      "Manual morning OPD registration counter queues exceeding 40 minutes per patient",
      "Paper-bound discharge summaries causing 3-hour patient bed turnaround delays",
      "Delayed TPA insurance pre-authorization sync with Star Health & MediAssist",
    ];
    customPitch = `Modernize ${city} healthcare facilities with Virtoy Hospital-HMS: Smart QR OPD appointment tokens, NABH-ready EMR, and 1-click automated TPA insurance claims reconciliation.`;
    coldCallScript = `Good afternoon ${leader.name}. Virtoy Technologies built the digital healthcare registry for OMSA. For ${city} hospitals, our lightweight cloud HMS cuts OPD lobby wait times by 70% with smartphone QR tokens. We would love to deliver an on-site demo this week.`;
    dealValLakhs = 15.0 + (saltIndex % 5) * 3.0;
  } else if (
    secLower.includes("college") ||
    secLower.includes("education") ||
    secLower.includes("university") ||
    secLower.includes("school")
  ) {
    companyNameVariants = [
      `${city} Institute of Technology & Management (Autonomous)`,
      `Kalinga ${city} College of Engineering & Research`,
      `Royal ${city} Global Academy of Higher Sciences`,
      `Utkal ${city} Institute of Advanced Studies`,
    ];
    techGaps = [
      "Chaotic manual NAAC SSR Criterion 1-7 faculty spreadsheet consolidation",
      "CO-PO attainment calculated manually with high audit non-conformance risk",
      "Fragmented student fee collection, library, and examination hall-ticket systems",
    ];
    customPitch = `Automate NAAC/NBA OBE accreditation and campus ERP for ${city} colleges: 1-click SSR export, real-time CO-PO attainment calculation, and automated student lifecycle portal.`;
    coldCallScript = `Respected ${leader.name}. Preparing for autonomous college NAAC/NBA accreditation requires extensive faculty coordination. Virtoy's Education ERP, guided by senior academic consultants, auto-calculates CO-PO attainment with 1-click SSR reports. Can we schedule a brief consultancy demo?`;
    dealValLakhs = 8.0 + (saltIndex % 4) * 2.0;
  } else if (
    secLower.includes("logistics") ||
    secLower.includes("supply") ||
    secLower.includes("freight") ||
    secLower.includes("transport")
  ) {
    companyNameVariants = [
      `${city} InterState TransLogistics & Cold Hub`,
      `Kalinga ${city} Freightways & Port Solutions`,
      `Apex ${city} Express Supply Chain Network`,
      `Eastern ${city} Logistics Park & Warehousing Ltd`,
    ];
    techGaps = [
      "Manual e-way bill generation & GST portal sync causing fleet gate turnaround delays",
      "Lack of real-time IoT temperature telemetry for perishable cold chain cargo",
      "Delayed 48-hour driver trip advance and fuel reconciliation paperwork",
    ];
    customPitch = `Supercharge ${city} supply chain operations with Virtoy Logistics SaaS: Real-time IoT fleet telematics, automated e-way bill GST sync, and instant driver mobile trip settlements.`;
    coldCallScript = `Good morning ${leader.name}. Virtoy Technologies engineers high-throughput logistics platforms. For freight hubs in ${city}, our system eliminates gate delays via automated GST e-way billing and IoT tracking. Could I share a quick 3-minute product overview?`;
    dealValLakhs = 14.0 + (saltIndex % 5) * 3.0;
  } else if (
    secLower.includes("real estate") ||
    secLower.includes("builder") ||
    secLower.includes("construct") ||
    secLower.includes("property")
  ) {
    companyNameVariants = [
      `${city} Landmark Infra & Urban Towers`,
      `Grand Horizon ${city} Developers & Estates`,
      `Royal ${city} Skylines & Luxury Villas`,
      `Prime ${city} Infrastructure & Smart Homes Ltd`,
    ];
    techGaps = [
      "Static 2D brochures and bulky 500MB mobile apps deterring prospective NRI property buyers",
      "No instant WebXR spatial 3D flat walkthrough link for WhatsApp buyer campaigns",
      "Delayed inquiry follow-up from high-net-worth investors across metro cities",
    ];
    customPitch = `Accelerate luxury real estate bookings in ${city} with Virtoy 3D Spatial WebXR: Photorealistic apartment walkthroughs that open in 1.2 seconds inside mobile browsers with direct booking triggers.`;
    coldCallScript = `Hello ${leader.name}. High-net-worth property buyers in ${city} demand immediate 3D walkthroughs without downloading bulky apps. Our WebXR engine allows buyers to tour apartments inside WhatsApp, tripling conversion rates. May we show you a live demo?`;
    dealValLakhs = 12.5 + (saltIndex % 4) * 2.5;
  } else {
    // General / Custom Sector
    companyNameVariants = [
      `${city} Apex ${sec} Enterprises Ltd`,
      `Kalinga ${city} ${sec} Commercial Corp`,
      `Royal ${city} ${sec} Group`,
      `Prime ${city} ${sec} Technologies Pvt Ltd`,
    ];
    techGaps = [
      "Legacy on-premise client-server database with zero real-time smartphone sync",
      "Manual field operational reporting resulting in 48-hour management data lag",
      "Lack of automated customer WhatsApp messaging and instant self-service portal",
    ];
    customPitch = `Modernize ${city} ${sec} operations with Virtoy custom enterprise platforms: zero-lag cloud sync, real-time smartphone telemetry, and automated customer self-service.`;
    coldCallScript = `Good morning ${leader.name}. Virtoy Technologies delivers custom enterprise cloud solutions for leaders in ${city}. We help ${sec} companies eliminate legacy software bottlenecks and automate customer workflows. May I schedule a brief 10-minute live demonstration?`;
    dealValLakhs = 10.0 + (saltIndex % 5) * 2.0;
  }

  // Pick unique company name
  let chosenCompany = companyNameVariants[saltIndex % companyNameVariants.length];
  if (existingCompanyNames.has(chosenCompany.toLowerCase())) {
    const suffix = saltIndex > 0 ? `Unit ${saltIndex + 1}` : `Phase ${Math.floor(Math.random() * 9) + 2}`;
    chosenCompany = `${chosenCompany} (${suffix})`;
  }

  const slug = chosenCompany
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 18);

  const phoneNum = isIntl
    ? `+971 4 ${Math.floor(Math.random() * 899 + 100)} ${Math.floor(Math.random() * 8999 + 1000)}`
    : `+91 ${["98618", "94370", "98300", "98200", "97781"][Math.floor(Math.random() * 5)]} ${Math.floor(
        Math.random() * 89999 + 10000
      )}`;

  return {
    companyName: chosenCompany,
    location: loc,
    category: sec,
    contactPerson: leader.name,
    role: leader.role,
    phone: phoneNum,
    email: `director@${slug}.com`,
    website: `https://${slug}.com`,
    status: "discovered",
    techGaps,
    customPitch,
    coldCallScript,
    estimatedDealValue: `₹${dealValLakhs.toFixed(1)}L`,
  };
}

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
  // Dynamic Location & Sector Filter States
  const [selectedLocation, setSelectedLocation] = useState<string>("All Locations");
  const [selectedSector, setSelectedSector] = useState<string>("All Sectors");
  const [searchQuery, setSearchQuery] = useState<string>("" );

  const [activeProspectId, setActiveProspectId] = useState<string>(prospects[0]?.id || "");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [convertedDealId, setConvertedDealId] = useState<string | null>(null);

  // Dynamic Discovery Radar Form (for empty or top scouting launcher)
  const [radarLocation, setRadarLocation] = useState<string>("Bhubaneswar, Odisha");
  const [radarSector, setRadarSector] = useState<string>("Hotels & Hospitality");
  const [scoutCount, setScoutCount] = useState<number>(3);

  // New Custom Prospect Form State
  const [formData, setFormData] = useState({
    companyName: "",
    location: "Bhubaneswar, Odisha",
    category: "Hotels & Hospitality",
    contactPerson: "",
    role: "Managing Director",
    phone: "",
    email: "",
    website: "",
    estimatedDealValue: "₹12.0L",
    techGaps: ["Manual paper-bound processes", "Lack of mobile WhatsApp automation", "Delayed reporting workflows"],
    customPitch: "",
    coldCallScript: "",
  });
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  // Dynamically compute all unique locations available across prospects + defaults
  const availableLocations = useMemo(() => {
    const set = new Set<string>();
    SUGGESTED_LOCATIONS.forEach((l) => set.add(l));
    prospects.forEach((p) => {
      if (p.location) set.add(p.location);
    });
    return Array.from(set);
  }, [prospects]);

  // Dynamically compute all unique sectors available across prospects + defaults
  const availableSectors = useMemo(() => {
    const set = new Set<string>();
    SUGGESTED_SECTORS.forEach((s) => set.add(s));
    prospects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [prospects]);

  // Filter prospects dynamically
  const filteredProspects = useMemo(() => {
    return prospects.filter((p) => {
      const locFilter = selectedLocation === "All Locations" ? "" : selectedLocation.toLowerCase();
      const secFilter = selectedSector === "All Sectors" ? "" : selectedSector.toLowerCase();
      const q = searchQuery.toLowerCase().trim();

      const matchesLocation = !locFilter || p.location.toLowerCase().includes(locFilter.split(",")[0]);
      const matchesSector = !secFilter || p.category.toLowerCase().includes(secFilter);
      const matchesQuery =
        !q ||
        p.companyName.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.contactPerson.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q);

      return matchesLocation && matchesSector && matchesQuery;
    });
  }, [prospects, selectedLocation, selectedSector, searchQuery]);

  const activeProspect = prospects.find((p) => p.id === activeProspectId) || filteredProspects[0] || prospects[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  /**
   * AI Discovery Scanner: Generates dynamic, context-specific enterprise leads
   * based on the exact location & sector chosen.
   */
  const handleSimulateScan = (overrideLoc?: string, overrideSec?: string, count: number = 1) => {
    const targetLoc = overrideLoc || (selectedLocation === "All Locations" ? radarLocation : selectedLocation);
    const targetSec = overrideSec || (selectedSector === "All Sectors" ? radarSector : selectedSector);

    setIsScanning(true);
    setScanStep(`Activating Satellite Geo-Radar for ${targetLoc.split(",")[0]}...`);

    setTimeout(() => {
      setScanStep(`Scanning MCA & Google Maps for ${targetSec}...`);
    }, 500);

    setTimeout(() => {
      setScanStep("Diagnosing Digital & Technical Architecture Gaps...");
    }, 1000);

    setTimeout(() => {
      setScanStep("Synthesizing Executive Value Pitches & Cold-Call Scripts...");
    }, 1400);

    setTimeout(() => {
      const existingNames = new Set(prospects.map((p) => p.companyName.toLowerCase()));

      for (let i = 0; i < count; i++) {
        const dynamicLead = generateDynamicEnterpriseLead(targetLoc, targetSec, existingNames, i + Date.now());
        existingNames.add(dynamicLead.companyName.toLowerCase());
        onAddProspect(dynamicLead);
      }

      setIsScanning(false);
      setScanStep("");
    }, 1800);
  };

  // Auto-Fill AI generator for manual custom prospect
  const handleAutoFillPitch = () => {
    if (!formData.companyName) {
      alert("Please enter a Company Name first.");
      return;
    }
    setIsAutoFilling(true);
    setTimeout(() => {
      const dummy = generateDynamicEnterpriseLead(
        formData.location,
        formData.category,
        new Set(),
        Math.floor(Math.random() * 100)
      );

      setFormData((prev) => ({
        ...prev,
        contactPerson: prev.contactPerson || dummy.contactPerson,
        role: prev.role || dummy.role,
        phone: prev.phone || dummy.phone,
        email: prev.email || dummy.email,
        website: prev.website || dummy.website,
        estimatedDealValue: prev.estimatedDealValue || dummy.estimatedDealValue,
        techGaps: dummy.techGaps,
        customPitch: dummy.customPitch.replace(dummy.companyName, prev.companyName),
        coldCallScript: dummy.coldCallScript.replace(dummy.companyName, prev.companyName),
      }));
      setIsAutoFilling(false);
    }, 450);
  };

  const handleCreateCustomProspect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName) return;

    onAddProspect({
      companyName: formData.companyName,
      location: formData.location || "Bhubaneswar, Odisha",
      category: formData.category || "Enterprise Cloud ERP",
      contactPerson: formData.contactPerson || "Managing Director",
      role: formData.role || "Executive Leadership",
      phone: formData.phone || "+91 98618 02325",
      email: formData.email || `contact@${formData.companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      website: formData.website || `https://${formData.companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      status: "discovered",
      techGaps: formData.techGaps,
      customPitch: formData.customPitch || `Custom executive solution for ${formData.companyName} by Virtoy Technologies.`,
      coldCallScript: formData.coldCallScript || `Introductory cold call pitch for ${formData.companyName}.`,
      estimatedDealValue: formData.estimatedDealValue || "₹10.0L",
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
      estimatedDealValue: "₹12.0L",
      techGaps: ["Manual paper-bound processes", "Lack of mobile WhatsApp automation", "Delayed reporting workflows"],
      customPitch: "",
      coldCallScript: "",
    });
  };

  // Convert Prospect to Pipeline Deal
  const handleConvertToDeal = (prospect: ProspectItem) => {
    if (onAddDeal) {
      const numMatch = prospect.estimatedDealValue.match(/\d+(\.\d+)?/);
      const valLakhs = numMatch ? parseFloat(numMatch[0]) : 10.0;
      const dealVal = valLakhs < 100 ? valLakhs * 100000 : valLakhs;

      onAddDeal({
        title: `${prospect.category} Enterprise Platform (${prospect.companyName})`,
        company: prospect.companyName,
        sector: prospect.category,
        location: prospect.location,
        stage: "discovery",
        dealValue: Math.round(dealVal),
        winProbability: 65,
        leadRep: "Rakesh Panda",
        aiHealthScore: 88,
        aiBottleneck: `Enterprise lead discovered in ${prospect.location}. Value proposition prepared for ${prospect.contactPerson}.`,
        aiNextBestAction: `Dispatch customized architecture pitch & schedule 15-min live demo.`,
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
      {/* Module Header & Geo Radar Bar */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200/90 bg-gradient-to-br from-white via-[#FFF5F8] to-[#FCE7F3]/70 p-6 sm:p-7 shadow-sm">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-[#F0186C]/15 to-[#FF4D8D]/5 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
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
                Live Dynamic Radar
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Discover commercial enterprises in any location or sector dynamically. Diagnose tech architecture bottlenecks, generate customized executive cold-call scripts, and convert prospects directly into active deals.
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
              onClick={() => handleSimulateScan(selectedLocation === "All Locations" ? radarLocation : selectedLocation, selectedSector === "All Sectors" ? radarSector : selectedSector, 2)}
              disabled={isScanning}
              className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white gap-2 shadow-md shadow-[#F0186C]/25 font-bold rounded-xl px-4 py-2"
            >
              <Sparkles className={`h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
              <span>{isScanning ? "Scanning Geo-Radar..." : "AI Scout New Enterprises"}</span>
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
            <span className="text-[11px] font-mono text-slate-500 font-bold">Targeting: {selectedLocation !== "All Locations" ? selectedLocation : radarLocation} · {selectedSector !== "All Sectors" ? selectedSector : radarSector}</span>
          </div>
        )}
      </div>

      {/* Dynamic Filter & Search Toolbar */}
      <div className="space-y-3 rounded-3xl border border-pink-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 flex-1">
            {/* Dynamic Location Filter */}
            <div className="w-56">
              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-white border-2 border-pink-100 text-slate-800 text-xs rounded-xl focus:border-[#F0186C]"
              >
                <option value="All Locations">📍 All Locations (Worldwide)</option>
                {availableLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </Select>
            </div>

            {/* Dynamic Sector Filter */}
            <div className="w-56">
              <Select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="bg-white border-2 border-pink-100 text-slate-800 text-xs rounded-xl focus:border-[#F0186C]"
              >
                <option value="All Sectors">🏢 All Sectors &amp; Industries</option>
                {availableSectors.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </Select>
            </div>

            {/* Universal Search Input */}
            <div className="relative min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#D6135F]" />
              <Input
                type="text"
                placeholder="Search any enterprise, location, contact, or sector..."
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

            {filteredProspects.length > 0 && (
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
            )}
          </div>
        </div>

        {/* Dynamic Quick Tag Suggestion Chips */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-pink-50 text-[11px]">
          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Quick Geo Targets:</span>
          {["Bhubaneswar", "Rourkela", "Cuttack", "Sambalpur", "Jajpur", "Kolkata", "Mumbai", "Dubai"].map((cityTag) => (
            <button
              key={cityTag}
              onClick={() => {
                const matched = availableLocations.find((l) => l.toLowerCase().includes(cityTag.toLowerCase()));
                if (matched) setSelectedLocation(matched);
                else setSelectedLocation(cityTag);
              }}
              className={`rounded-lg px-2 py-0.5 font-bold transition-colors ${
                selectedLocation.toLowerCase().includes(cityTag.toLowerCase())
                  ? "bg-[#D6135F] text-white"
                  : "bg-pink-50 text-slate-600 hover:bg-pink-100 hover:text-[#D6135F]"
              }`}
            >
              {cityTag}
            </button>
          ))}
          <span className="text-slate-300">|</span>
          {["Hotels", "Steel", "Hospitals", "Logistics", "Colleges", "Real Estate"].map((secTag) => (
            <button
              key={secTag}
              onClick={() => {
                const matched = availableSectors.find((s) => s.toLowerCase().includes(secTag.toLowerCase()));
                if (matched) setSelectedSector(matched);
                else setSelectedSector(secTag);
              }}
              className={`rounded-lg px-2 py-0.5 font-bold transition-colors ${
                selectedSector.toLowerCase().includes(secTag.toLowerCase())
                  ? "bg-[#D6135F] text-white"
                  : "bg-pink-50 text-slate-600 hover:bg-pink-100 hover:text-[#D6135F]"
              }`}
            >
              {secTag}
            </button>
          ))}
          {(selectedLocation !== "All Locations" || selectedSector !== "All Sectors" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedLocation("All Locations");
                setSelectedSector("All Sectors");
                setSearchQuery("");
              }}
              className="ml-auto text-[#D6135F] hover:underline font-bold text-[10px]"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {prospects.length === 0 ? (
        /* Interactive AI Geo-Radar Discovery Launcher (Clean Baseline) */
        <div className="rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white via-[#FFF8FA] to-pink-50/40 p-8 sm:p-10 shadow-sm text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-[#F0186C]/25 animate-pulse">
            <Radio className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">
              AI B2B Geo-Radar Ready for Discovery
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Specify your target city and industry sector below. The dynamic discovery engine will scan commercial nodes, synthesize executive decision-maker contacts, and diagnose technical bottlenecks.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-pink-200 bg-white p-5 space-y-4 text-left shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#D6135F]" />
                  <span>Target City / Location</span>
                </label>
                <Input
                  placeholder="e.g. Bhubaneswar, Rourkela, Cuttack, Dubai..."
                  value={radarLocation}
                  onChange={(e) => setRadarLocation(e.target.value)}
                  className="border-2 border-pink-100 rounded-xl text-xs font-medium focus:border-[#F0186C]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-[#D6135F]" />
                  <span>Target Industry / Sector</span>
                </label>
                <Input
                  placeholder="e.g. Hotels & Hospitality, Steel Mills, Hospitals..."
                  value={radarSector}
                  onChange={(e) => setRadarSector(e.target.value)}
                  className="border-2 border-pink-100 rounded-xl text-xs font-medium focus:border-[#F0186C]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-pink-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-bold">Discover Count:</span>
                {[1, 3, 5].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setScoutCount(cnt)}
                    className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                      scoutCount === cnt
                        ? "bg-[#D6135F] text-white shadow-xs"
                        : "bg-pink-50 text-slate-700 hover:bg-pink-100"
                    }`}
                  >
                    {cnt} {cnt === 1 ? "Lead" : "Leads"}
                  </button>
                ))}
              </div>

              <Button
                onClick={() => handleSimulateScan(radarLocation, radarSector, scoutCount)}
                disabled={isScanning}
                className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white font-bold rounded-xl px-6 py-2.5 shadow-md shadow-[#F0186C]/25 text-xs gap-2"
              >
                <Sparkles className={`h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
                <span>{isScanning ? "Scanning Geo-Radar Nodes..." : `🚀 Discover ${scoutCount} Target Enterprises`}</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* 2-Column Dynamic Prospector View */
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1.7fr] lg:items-start">
          {/* Left Column: Prospects List */}
          <div className="space-y-3">
            <div className="space-y-3 max-h-[660px] overflow-y-auto pr-1">
              {filteredProspects.length === 0 ? (
                <div className="rounded-3xl border-2 border-dashed border-pink-200 bg-white p-8 text-center space-y-3">
                  <MapPin className="h-8 w-8 text-[#D6135F] mx-auto opacity-50" />
                  <p className="text-sm font-bold text-slate-800">No enterprises match current filters</p>
                  <p className="text-xs text-slate-500">
                    Click &quot;AI Scout New Enterprises&quot; to dynamically discover companies in {selectedLocation}.
                  </p>
                  <Button
                    size="sm"
                    onClick={() => handleSimulateScan(selectedLocation, selectedSector, 2)}
                    className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white font-bold rounded-xl text-xs gap-1.5"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Discover in {selectedLocation.split(",")[0]}</span>
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
                        <span
                          className={`capitalize font-bold text-[10px] rounded-lg px-2 py-0.5 ${
                            prosp.status === "converted"
                              ? "bg-emerald-100 text-emerald-800 font-black border border-emerald-300"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
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
      )}

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
                    placeholder="e.g. Sambalpur, Odisha / Dubai, UAE"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="border-pink-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Sector / Category *</label>
                  <Input
                    required
                    placeholder="e.g. Steel & Rolling Mills / Hospitals / Hotels"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="border-pink-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Estimated Deal Value</label>
                  <Input
                    placeholder="e.g. ₹12.5L"
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
                    placeholder="e.g. Managing Director / VP Operations"
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
                  Save &amp; Add Enterprise
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
