"use client";

import { useState } from "react";
import {
  AlertCircle,
  Building,
  Check,
  Copy,
  ExternalLink,
  Filter,
  Globe,
  Mail,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Input } from "@/components/admin/ui/Input";
import { Select } from "@/components/admin/ui/Select";
import { ProspectItem } from "@/data/admin/types";

const CITIES = [
  "All Locations",
  "Jaipur, Rajasthan",
  "Dubai, UAE (JAFZA)",
  "Kolkata, West Bengal",
  "Jajpur, Odisha (Kalinganagar)",
  "Mumbai, Maharashtra",
  "Bhubaneswar, Odisha",
  "Delhi NCR",
  "Bangalore, Karnataka",
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

export function ProspectorModule({
  prospects,
  onUpdateStatus,
  onAddProspect,
}: {
  prospects: ProspectItem[];
  onUpdateStatus: (id: string, status: ProspectItem["status"]) => void;
  onAddProspect: (prospect: Omit<ProspectItem, "id">) => void;
}) {
  const [selectedCity, setSelectedCity] = useState("All Locations");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProspectId, setActiveProspectId] = useState<string>(prospects[0]?.id || "");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const filteredProspects = prospects.filter((p) => {
    const matchesCity = selectedCity === "All Locations" || p.location.includes(selectedCity.split(",")[0]);
    const matchesSector = selectedSector === "All Sectors" || p.category === selectedSector;
    const matchesSearch =
      p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSector && matchesSearch;
  });

  const activeProspect = prospects.find((p) => p.id === activeProspectId) || filteredProspects[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      onAddProspect({
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
          "Manual molten steel safety training",
          "No VR emergency evacuation simulation",
          "Delayed contractor safety accreditation",
        ],
        customPitch:
          "Deploy Virtoy SafeAct 6-DoF molten metal safety simulator across Abu Dhabi mills: eliminate live fire risks during training and train 1,200 technicians annually.",
        coldCallScript:
          "Good morning Eng. Mansoor. Virtoy Technologies delivers heavy industry VR safety simulators for Tata Steel and NALCO. We specialize in hot metal furnace hazard training with zero physical risk. May I send over a 2-minute video case study?",
        estimatedDealValue: "₹28.0L ($34,000)",
      });
      setIsScanning(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#3D1E30] bg-gradient-to-r from-[#1C0915] via-[#12060E] to-[#2B0E1E] p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D6135F]/20 text-[#FF4D8D]">
              <MapPin className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-black tracking-tight text-white">AI B2B Maps Prospector &amp; Lead Engine</h2>
            <Badge variant="brand" size="xs">
              Live Geo-Discovery
            </Badge>
          </div>
          <p className="text-xs text-rose-200/60">
            Locate high-value commercial enterprises, diagnose tech &amp; digital gaps, and generate customized cold-call pitches.
          </p>
        </div>

        <Button
          onClick={handleSimulateScan}
          disabled={isScanning}
          className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white gap-1.5 shadow-md shadow-[#F0186C]/25 font-bold"
        >
          <Sparkles className={`h-3.5 w-3.5 ${isScanning ? "animate-spin" : ""}`} />
          <span>{isScanning ? "AI Scouting Geo-Nodes..." : "AI Scout New Enterprises"}</span>
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#3D1E30] bg-[#12070E] p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* City Selector */}
          <div className="w-48">
            <Select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-[#1A0B16] border-[#3D1E30] text-rose-100 text-xs"
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
              className="bg-[#1A0B16] border-[#3D1E30] text-rose-100 text-xs"
            >
              {SECTORS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </div>

          {/* Search Input */}
          <div className="relative w-56">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-rose-400/60" />
            <Input
              type="text"
              placeholder="Search companies, leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-[#1A0B16] border-[#3D1E30] text-rose-100 text-xs placeholder:text-rose-300/40"
            />
          </div>
        </div>

        <div className="text-xs text-rose-300/70">
          <span>
            Found <strong className="text-white">{filteredProspects.length}</strong> Target Enterprises
          </span>
        </div>
      </div>

      {/* 2-Column Prospector View */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1.7fr] lg:items-start">
        {/* Left Column: Prospects List */}
        <div className="space-y-3">
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredProspects.map((prosp) => {
              const isSelected = activeProspect?.id === prosp.id;

              return (
                <div
                  key={prosp.id}
                  onClick={() => setActiveProspectId(prosp.id)}
                  className={`group relative flex flex-col gap-2 rounded-2xl border p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#F0186C] bg-[#1E0C18] shadow-lg shadow-[#F0186C]/10 ring-1 ring-[#F0186C]"
                      : "border-[#2D1625] bg-[#12070E] hover:border-[#F0186C]/40 hover:bg-[#1A0B16]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-rose-100 group-hover:text-[#FF4D8D] transition-colors">
                        {prosp.companyName}
                      </h4>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                        <MapPin className="h-3 w-3 shrink-0 text-[#FF4D8D]" />
                        <span>{prosp.location}</span>
                      </div>
                    </div>

                    <Badge variant="secondary" size="xs">
                      {prosp.category}
                    </Badge>
                  </div>

                  {/* Decision Maker */}
                  <div className="flex items-center justify-between text-[11px] border-t border-[#2A1322] pt-2 text-slate-400">
                    <span>
                      <strong className="text-rose-100">{prosp.contactPerson}</strong> ({prosp.role})
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      {prosp.estimatedDealValue}
                    </span>
                  </div>

                  {/* Tech gaps count */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1 text-amber-400 font-semibold">
                      <AlertCircle className="h-3 w-3" />
                      {prosp.techGaps.length} Tech Gaps Diagnosed
                    </span>
                    <Badge variant="outline" size="xs" className="capitalize border-[#3D1E30] text-rose-200">
                      {prosp.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Tech Gap Diagnosis & Pitch Engine */}
        {activeProspect ? (
          <Card className="border-[#3D1E30] bg-[#10070D]/95 shadow-2xl">
            <CardHeader className="flex flex-row items-start justify-between pb-3 border-b border-[#2A1322]">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base text-white">{activeProspect.companyName}</CardTitle>
                  <Badge variant="brand" size="xs">
                    {activeProspect.category}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-3 mt-1 text-xs text-rose-200/60">
                  <span>📍 {activeProspect.location}</span>
                  <a
                    href={activeProspect.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#FF4D8D] hover:underline font-semibold"
                  >
                    <Globe className="h-3 w-3" />
                    Visit Website
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </CardDescription>
              </div>

              {/* Status Update */}
              <div className="w-36">
                <Select
                  value={activeProspect.status}
                  onChange={(e) => onUpdateStatus(activeProspect.id, e.target.value as ProspectItem["status"])}
                  className="bg-[#1A0B16] border-[#3D1E30] text-rose-100 text-xs"
                >
                  <option value="discovered">🔍 Discovered</option>
                  <option value="contacted">📞 Contacted</option>
                  <option value="in_negotiation">💼 In Negotiation</option>
                  <option value="converted">🎉 Converted (Deal)</option>
                </Select>
              </div>
            </CardHeader>

            <CardContent className="pt-5 space-y-5">
              {/* Verified Decision Maker Contact Card */}
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#2D1625] bg-[#160A13] p-3.5 text-xs">
                <div>
                  <div className="text-[10px] text-rose-300/70 uppercase font-bold tracking-wider">Primary Contact</div>
                  <div className="font-bold text-white mt-0.5">{activeProspect.contactPerson}</div>
                  <div className="text-[11px] text-slate-400">{activeProspect.role}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-rose-100 font-medium">
                    <Phone className="h-3.5 w-3.5 text-[#FF4D8D]" />
                    <a href={`tel:${activeProspect.phone}`} className="hover:underline">
                      {activeProspect.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail className="h-3.5 w-3.5 text-[#FF4D8D]" />
                    <a href={`mailto:${activeProspect.email}`} className="hover:underline truncate">
                      {activeProspect.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* AI Diagnosed Technical Gaps */}
              <div>
                <label className="text-[11px] font-bold text-rose-300/70 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                  <span>AI Diagnosed Architecture &amp; Operational Gaps</span>
                </label>
                <div className="mt-2 space-y-1.5">
                  {activeProspect.techGaps.map((gap, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-2.5 text-xs text-rose-50"
                    >
                      <span className="font-mono text-[10px] font-bold text-amber-400 mt-0.5">0{idx + 1}</span>
                      <span>{gap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tailored Value Proposition Pitch */}
              <div>
                <label className="text-[11px] font-bold text-rose-300/70 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#FF4D8D]" />
                  <span>Personalized Executive Value Pitch</span>
                </label>
                <div className="mt-1.5 rounded-2xl border border-[#2D1625] bg-[#160A13] p-3.5 text-xs leading-relaxed text-rose-100">
                  {activeProspect.customPitch}
                </div>
              </div>

              {/* Ready Cold-Call Script Box */}
              <div className="rounded-2xl border border-[#3D1E30] bg-[#160A13] p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF4D8D]">
                    <span>📞 60-Second Cold-Call Telephone Script</span>
                  </div>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleCopy(activeProspect.coldCallScript, activeProspect.id)}
                  >
                    {copiedId === activeProspect.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedId === activeProspect.id ? "Script Copied" : "Copy Script"}</span>
                  </Button>
                </div>

                <div className="rounded-xl border border-[#2D1625] bg-[#10070D] p-3 text-xs leading-relaxed text-rose-50 whitespace-pre-wrap font-sans">
                  &ldquo;{activeProspect.coldCallScript}&rdquo;
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
