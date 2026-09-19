"use client";

import * as React from "react";
import {
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  Plus,
  Building2,
  DollarSign,
  AlertCircle,
  Calendar,
  Sparkles,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Input } from "@/components/admin/ui/Input";
import { Select } from "@/components/admin/ui/Select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/admin/ui/Dialog";
import { PipelineDeal, DealStage } from "@/data/admin/types";
import { SectorPipelinePieChart, PipelineFunnelChart } from "@/components/admin/charts";

const STAGES: { id: DealStage; label: string; color: string; bg: string }[] = [
  { id: "discovery", label: "1. Discovery & Qualify", color: "text-blue-700", bg: "border-blue-200 bg-blue-50/40" },
  { id: "scoping", label: "2. Scoping & Gap Analysis", color: "text-purple-700", bg: "border-purple-200 bg-purple-50/40" },
  { id: "proposal", label: "3. Tech Architecture & Proposal", color: "text-amber-800", bg: "border-amber-200 bg-amber-50/40" },
  { id: "negotiation", label: "4. Security & Negotiation", color: "text-[#D6135F]", bg: "border-pink-200 bg-pink-50/40" },
  { id: "won", label: "5. Closed / Contract Won 🎉", color: "text-emerald-700", bg: "border-emerald-200 bg-emerald-50/40" },
];

export function PipelineDealMatrixModule({
  deals,
  onUpdateDealStage,
  onAddDeal,
}: {
  deals: PipelineDeal[];
  onUpdateDealStage: (dealId: string, stage: DealStage) => void;
  onAddDeal: (deal: Omit<PipelineDeal, "id" | "lastActivity">) => void;
}) {
  const [sectorFilter, setSectorFilter] = React.useState<string>("all");
  const [selectedDeal, setSelectedDeal] = React.useState<PipelineDeal | null>(null);
  const [isNewDialogOpen, setIsNewDialogOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"all" | "kanban" | "charts">("all");

  // New Deal Form State
  const [newTitle, setNewTitle] = React.useState("");
  const [newCompany, setNewCompany] = React.useState("");
  const [newSector, setNewSector] = React.useState("Hotels & Hospitality");
  const [newLocation, setNewLocation] = React.useState("Bhubaneswar, Odisha");
  const [newValue, setNewValue] = React.useState("850000");
  const [newProb, setNewProb] = React.useState("65");
  const [newRep, setNewRep] = React.useState("Ashwin Yadav");
  const [newBottleneck, setNewBottleneck] = React.useState("");

  const filteredDeals = React.useMemo(() => {
    return deals.filter((d) => (sectorFilter === "all" ? true : d.sector === sectorFilter));
  }, [deals, sectorFilter]);

  const totalPipeline = React.useMemo(() => {
    return deals.reduce((sum, d) => sum + (d.stage !== "lost" ? d.dealValue : 0), 0);
  }, [deals]);

  const weightedPipeline = React.useMemo(() => {
    return deals.reduce((sum, d) => sum + (d.stage !== "lost" ? (d.dealValue * d.winProbability) / 100 : 0), 0);
  }, [deals]);

  const handleCreateDeal = () => {
    if (!newTitle || !newCompany) return;
    onAddDeal({
      title: newTitle,
      company: newCompany,
      sector: newSector,
      location: newLocation,
      stage: "discovery",
      dealValue: Number(newValue) || 500000,
      winProbability: Number(newProb) || 50,
      leadRep: newRep,
      aiHealthScore: 85,
      aiBottleneck: newBottleneck || "Initial stakeholder discovery pending.",
      aiNextBestAction: "Deliver 1-page executive capability brief and client ROI benchmark.",
      expectedClose: "2026-10-30",
    });
    setIsNewDialogOpen(false);
    setNewTitle("");
    setNewCompany("");
    setNewBottleneck("");
  };

  const getStageNext = (current: DealStage): DealStage | null => {
    if (current === "discovery") return "scoping";
    if (current === "scoping") return "proposal";
    if (current === "proposal") return "negotiation";
    if (current === "negotiation") return "won";
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200/90 bg-gradient-to-br from-white via-[#FFF5F8] to-[#FCE7F3]/70 p-6 sm:p-7 shadow-sm">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-[#F0186C]/15 to-[#FF4D8D]/5 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-sm shadow-[#F0186C]/25">
                <Briefcase className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                B2B Deal Pipeline &amp;{" "}
                <span className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] bg-clip-text text-transparent">
                  Growth Matrix
                </span>
              </h2>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
                {deals.length} Active Deals
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Real-time visual CRM forecasting, AI deal health diagnostics, and automated stage progression.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-44 text-xs bg-white border-2 border-pink-200 text-slate-800 rounded-xl"
            >
              <option value="all">All B2B Sectors</option>
              <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
              <option value="Hospitals & Healthcare">Hospitals & Healthcare</option>
              <option value="Higher Education">Higher Education</option>
              <option value="Hotels & Hospitality">Hotels & Hospitality</option>
              <option value="Heavy Steel & Mining">Heavy Steel & Mining</option>
              <option value="Real Estate & Architecture">Real Estate & Architecture</option>
            </Select>

            <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white gap-1.5 shadow-md shadow-[#F0186C]/25 font-bold rounded-xl px-4 py-2">
                  <Plus className="h-4 w-4" />
                  Add New Deal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-white border-2 border-pink-200 text-slate-900 shadow-2xl rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-slate-900">Create B2B Pipeline Deal</DialogTitle>
                  <DialogDescription className="text-slate-500 text-xs">
                    Register a high-value enterprise prospect into the revenue pipeline matrix.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-2 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Project / Scope Title</label>
                    <Input
                      placeholder="e.g. 6-DoF VR Crane Hazard Training Suite"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="mt-1 bg-white border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Target Enterprise / Client</label>
                    <Input
                      placeholder="e.g. JSW Steel / Kalinga Port"
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      className="mt-1 bg-white border-slate-200 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700">Sector</label>
                      <Select value={newSector} onChange={(e) => setNewSector(e.target.value)} className="mt-1 bg-white border-slate-200 rounded-xl">
                        <option value="Heavy Steel & Mining">Heavy Steel & Mining</option>
                        <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                        <option value="Hospitals & Healthcare">Hospitals & Healthcare</option>
                        <option value="Higher Education">Higher Education</option>
                        <option value="Hotels & Hospitality">Hotels & Hospitality</option>
                        <option value="Real Estate & Architecture">Real Estate & Architecture</option>
                      </Select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700">Estimated Value (₹ INR)</label>
                      <Input
                        type="number"
                        placeholder="850000"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        className="mt-1 bg-white border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700">Win Probability (%)</label>
                      <Input
                        type="number"
                        placeholder="65"
                        value={newProb}
                        onChange={(e) => setNewProb(e.target.value)}
                        className="mt-1 bg-white border-slate-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700">Lead Account Rep</label>
                      <Select value={newRep} onChange={(e) => setNewRep(e.target.value)} className="mt-1 bg-white border-slate-200 rounded-xl">
                        <option value="Ashwin Yadav">Ashwin Yadav</option>
                        <option value="Rakesh Panda">Rakesh Panda</option>
                        <option value="Niranjan Sahu">Niranjan Sahu</option>
                        <option value="Mr. Kailash Patnaik">Mr. Kailash Patnaik</option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Current Key Bottleneck / Question</label>
                    <Input
                      placeholder="e.g. Awaiting board budget approval on Phase 1"
                      value={newBottleneck}
                      onChange={(e) => setNewBottleneck(e.target.value)}
                      className="mt-1 bg-white border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" size="sm" onClick={() => setIsNewDialogOpen(false)} className="rounded-xl">
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleCreateDeal} className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white font-bold rounded-xl">
                    Save to Pipeline
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* KPI Value Counters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Pipeline Value</span>
          <div className="text-3xl font-black text-slate-900 font-mono mt-1">
            ₹{(totalPipeline / 100000).toFixed(1)} Lakh
          </div>
          <p className="mt-1 text-[11px] text-emerald-700 font-bold">
            Across {deals.length} active enterprise deals
          </p>
        </div>

        <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Weighted Forecast</span>
          <div className="text-3xl font-black text-[#D6135F] font-mono mt-1">
            ₹{(weightedPipeline / 100000).toFixed(1)} Lakh
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Probability-adjusted expected close
          </p>
        </div>

        <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg AI Health Score</span>
          <div className="text-3xl font-black text-emerald-700 font-mono mt-1">
            {deals.length > 0 ? (deals.reduce((sum, d) => sum + d.aiHealthScore, 0) / deals.length).toFixed(1) : "100"} / 100
          </div>
          <p className="mt-1 text-[11px] text-emerald-700 font-bold">
            Conversion velocity &amp; engagement
          </p>
        </div>

        <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Deals Count</span>
          <div className="text-3xl font-black text-slate-900 font-mono mt-1">
            {deals.length} {deals.length === 1 ? "Deal" : "Deals"}
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            Across {deals.length > 0 ? new Set(deals.map((d) => d.sector)).size : 0} commercial sectors
          </p>
        </div>
      </div>

      {/* Visual Analytics View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3 rounded-2xl border border-pink-100 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Display Layout:</span>
          <div className="flex items-center gap-1 rounded-xl bg-pink-50/60 p-1 border border-pink-200/70">
            <button
              onClick={() => setViewMode("all")}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                viewMode === "all"
                  ? "bg-[#F0186C] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#D6135F]"
              }`}
            >
              Full Overview
            </button>
            <button
              onClick={() => setViewMode("charts")}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                viewMode === "charts"
                  ? "bg-[#F0186C] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#D6135F]"
              }`}
            >
              Sector &amp; Funnel Charts
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                viewMode === "kanban"
                  ? "bg-[#F0186C] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#D6135F]"
              }`}
            >
              Kanban Stages
            </button>
          </div>
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing <strong>{filteredDeals.length}</strong> deals • Total: <strong>₹{(totalPipeline / 100000).toFixed(1)}L</strong>
        </span>
      </div>

      {/* Charts Grid (Visible in 'all' and 'charts' mode) */}
      {(viewMode === "all" || viewMode === "charts") && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <PipelineFunnelChart deals={deals} />
          </div>
          <div className="lg:col-span-5">
            <SectorPipelinePieChart
              deals={deals}
              onSelectSector={(sec) => setSectorFilter(sec)}
            />
          </div>
        </div>
      )}

      {/* Visual Kanban Columns (Visible in 'all' and 'kanban' mode) */}
      {(viewMode === "all" || viewMode === "kanban") && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {STAGES.map((stage) => {
          const stageDeals = filteredDeals.filter((d) => d.stage === stage.id);
          const stageValue = stageDeals.reduce((sum, d) => sum + d.dealValue, 0);

          return (
            <div key={stage.id} className="flex flex-col rounded-3xl border border-pink-100 bg-white p-4 min-h-[480px] shadow-xs">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-pink-100">
                <div className="space-y-0.5">
                  <span className={`text-xs font-black tracking-tight ${stage.color}`}>{stage.label}</span>
                  <p className="text-[10px] text-slate-500 font-mono font-bold">
                    ₹{(stageValue / 100000).toFixed(1)}L • {stageDeals.length} deals
                  </p>
                </div>
                <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-bold text-[#D6135F] border border-pink-200">
                  {stageDeals.length}
                </span>
              </div>

              {/* Deal Cards Container */}
              <div className="flex-1 space-y-3 overflow-y-auto pr-0.5">
                {stageDeals.map((deal) => {
                  const nextStage = getStageNext(deal.stage);

                  return (
                    <div
                      key={deal.id}
                      onClick={() => setSelectedDeal(deal)}
                      className="group relative cursor-pointer rounded-2xl border border-slate-200/90 bg-slate-50/40 p-3.5 transition-all hover:border-[#F0186C] hover:bg-pink-50/30 hover:shadow-sm hover:-translate-y-0.5"
                    >
                      {/* Top Row: Company & Value */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-black text-[#D6135F] uppercase tracking-wider">
                            {deal.sector}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#D6135F]">
                            {deal.company}
                          </h4>
                        </div>
                        <span className="rounded-lg bg-emerald-50 px-2 py-0.5 text-[11px] font-black text-emerald-700 font-mono shrink-0 border border-emerald-200">
                          ₹{(deal.dealValue / 100000).toFixed(1)}L
                        </span>
                      </div>

                      {/* Scope Title */}
                      <p className="mt-1.5 text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {deal.title}
                      </p>

                      {/* AI Health Metric & Win Probability */}
                      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px]">
                        <div className="flex items-center gap-1 text-slate-500 font-semibold">
                          <Sparkles className="h-3 w-3 text-amber-500" />
                          <span>AI Health:</span>
                          <span className="font-bold text-emerald-700 font-mono">{deal.aiHealthScore}%</span>
                        </div>
                        <div className="flex items-center gap-1 font-mono text-slate-500">
                          <span>Win Prob:</span>
                          <span className="font-black text-[#D6135F]">{deal.winProbability}%</span>
                        </div>
                      </div>

                      {/* Rep & Next Stage Action */}
                      <div className="mt-2.5 flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-500 font-medium truncate max-w-[100px]">
                          👤 {deal.leadRep.split(" ")[0]}
                        </span>

                        {nextStage && (
                          <Button
                            size="xs"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateDealStage(deal.id, nextStage);
                            }}
                            className="h-6 text-[10px] text-[#D6135F] hover:text-[#F0186C] hover:bg-pink-100/70 p-1 px-2 gap-0.5 font-bold rounded-lg"
                          >
                            Advance
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {stageDeals.length === 0 && (
                  <div className="flex h-32 flex-col items-center justify-center rounded-2xl border border-dashed border-pink-200/80 p-4 text-center">
                    <p className="text-[11px] text-slate-400 font-medium">No deals in this stage</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      )}

      {/* Deal Detail Inspection Drawer / Modal */}
      {selectedDeal && (
        <div className="rounded-3xl border-2 border-pink-200 bg-white p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="brand" size="sm">
                  {selectedDeal.sector}
                </Badge>
                <Badge variant="outline" size="sm" className="border-pink-200 text-slate-700">
                  📍 {selectedDeal.location}
                </Badge>
                <Badge variant="success" size="sm">
                  Win Probability: {selectedDeal.winProbability}%
                </Badge>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1.5">{selectedDeal.title}</h3>
              <p className="text-xs text-slate-500">
                Target Enterprise: <strong className="text-slate-800">{selectedDeal.company}</strong> • Managed by{" "}
                <strong className="text-slate-800">{selectedDeal.leadRep}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-emerald-700 font-mono">
                ₹{(selectedDeal.dealValue / 100000).toFixed(1)} Lakh
              </span>
              <Button size="sm" variant="outline" onClick={() => setSelectedDeal(null)} className="rounded-xl">
                Close
              </Button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-pink-100 pt-4">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                Current Bottleneck / Risk
              </div>
              <p className="mt-1 text-xs text-slate-700 leading-relaxed">{selectedDeal.aiBottleneck}</p>
            </div>

            <div className="rounded-2xl border border-pink-200 bg-pink-50/50 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#D6135F]">
                <Sparkles className="h-4 w-4" />
                AI Recommended Next Best Action
              </div>
              <p className="mt-1 text-xs text-slate-700 leading-relaxed">{selectedDeal.aiNextBestAction}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-pink-100 pt-3 text-xs">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Calendar className="h-4 w-4 text-[#D6135F]" />
              <span>Target Close Date: <strong className="text-slate-800">{selectedDeal.expectedClose}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-bold">Move to Stage:</span>
              {STAGES.map((s) => (
                <Button
                  key={s.id}
                  size="xs"
                  variant={selectedDeal.stage === s.id ? "brand" : "outline"}
                  onClick={() => {
                    onUpdateDealStage(selectedDeal.id, s.id);
                    setSelectedDeal({ ...selectedDeal, stage: s.id });
                  }}
                  className={`text-[10px] rounded-xl font-bold ${
                    selectedDeal.stage === s.id ? "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white shadow-xs" : "border-slate-200 text-slate-700"
                  }`}
                >
                  {s.label.split(". ")[1]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
