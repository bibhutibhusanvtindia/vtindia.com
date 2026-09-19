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
                  Lead Engine
                </span>
              </h2>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
                Live Geo-Discovery
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Locate high-value commercial enterprises, diagnose tech &amp; digital gaps, and generate customized cold-call pitches.
            </p>
          </div>

          <Button
            onClick={handleSimulateScan}
            disabled={isScanning}
            className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white gap-2 shadow-md shadow-[#F0186C]/25 font-bold rounded-xl px-4 py-2"
          >
            <Sparkles className={`h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
            <span>{isScanning ? "AI Scouting Geo-Nodes..." : "AI Scout New Enterprises"}</span>
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-pink-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* City Selector */}
          <div className="w-48">
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
              placeholder="Search companies, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-2 border-pink-100 text-slate-800 text-xs rounded-xl placeholder:text-slate-400 focus:border-[#F0186C]"
            />
          </div>
        </div>

        <div className="text-xs text-slate-600 font-semibold px-2">
          <span>
            Found <strong className="text-[#D6135F] font-black">{filteredProspects.length}</strong> Target Enterprises
          </span>
        </div>
      </div>

      {/* 2-Column Prospector View */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1.7fr] lg:items-start">
        {/* Left Column: Prospects List */}
        <div className="space-y-3">
          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {filteredProspects.map((prosp) => {
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

                  {/* Tech gaps count */}
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1 text-amber-800 font-bold">
                      <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                      {prosp.techGaps.length} Tech Gaps Diagnosed
                    </span>
                    <span className="capitalize font-bold text-[10px] rounded-lg bg-slate-100 px-2 py-0.5 text-slate-700">
                      {prosp.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Tech Gap Diagnosis & Pitch Engine */}
        {activeProspect ? (
          <div className="rounded-3xl border border-pink-100 bg-white p-6 space-y-5 shadow-sm">
            <div className="flex flex-row items-start justify-between pb-4 border-b border-pink-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">{activeProspect.companyName}</h3>
                  <span className="rounded-full bg-pink-50 px-2.5 py-0.5 text-[10px] font-bold text-[#D6135F] border border-pink-200">
                    {activeProspect.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
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

              {/* Status Update */}
              <div className="w-40">
                <Select
                  value={activeProspect.status}
                  onChange={(e) => onUpdateStatus(activeProspect.id, e.target.value as ProspectItem["status"])}
                  className="bg-white border-2 border-pink-200 text-slate-800 text-xs rounded-xl focus:border-[#F0186C]"
                >
                  <option value="discovered">🔍 Discovered</option>
                  <option value="contacted">📞 Contacted</option>
                  <option value="in_negotiation">💼 In Negotiation</option>
                  <option value="converted">🎉 Converted (Deal)</option>
                </Select>
              </div>
            </div>

            <div className="space-y-5">
              {/* Verified Decision Maker Contact Card */}
              <div className="grid grid-cols-2 gap-3 rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50/40 to-white p-4 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-black tracking-wider">Primary Contact</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{activeProspect.contactPerson}</div>
                  <div className="text-[11px] text-[#D6135F] font-bold">{activeProspect.role}</div>
                </div>
                <div className="space-y-1.5 font-medium">
                  <div className="flex items-center gap-2 text-slate-800">
                    <Phone className="h-3.5 w-3.5 text-[#D6135F]" />
                    <a href={`tel:${activeProspect.phone}`} className="hover:underline font-semibold">
                      {activeProspect.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-3.5 w-3.5 text-[#D6135F]" />
                    <a href={`mailto:${activeProspect.email}`} className="hover:underline truncate">
                      {activeProspect.email}
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
                    {copiedId === activeProspect.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
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
    </div>
  );
}
