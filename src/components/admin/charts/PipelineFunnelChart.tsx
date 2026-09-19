"use client";

import * as React from "react";
import { Filter, ArrowRight, TrendingUp, CheckCircle2, DollarSign, Sparkles, Briefcase } from "lucide-react";
import { PipelineDeal } from "@/data/admin/types";

interface PipelineFunnelChartProps {
  deals?: PipelineDeal[];
}

export function PipelineFunnelChart({ deals = [] }: PipelineFunnelChartProps) {
  const [hoveredStage, setHoveredStage] = React.useState<string | null>(null);

  const stageConfigs = [
    { id: "discovery", label: "1. Discovery & Qualify", color: "#3B82F6", bgLight: "bg-blue-50/70", borderLight: "border-blue-200" },
    { id: "scoping", label: "2. Scoping & Architecture", color: "#8B5CF6", bgLight: "bg-purple-50/70", borderLight: "border-purple-200" },
    { id: "proposal", label: "3. Tech Architecture & Pitch", color: "#F59E0B", bgLight: "bg-amber-50/70", borderLight: "border-amber-200" },
    { id: "negotiation", label: "4. Security & Pricing Finalization", color: "#F0186C", bgLight: "bg-pink-50/70", borderLight: "border-pink-200" },
    { id: "won", label: "5. Closed / Contract Won", color: "#10B981", bgLight: "bg-emerald-50/70", borderLight: "border-emerald-200" },
  ];

  const stagesData = React.useMemo(() => {
    return stageConfigs.map((cfg) => {
      const matchingDeals = deals.filter((d) => d.stage === cfg.id);
      const totalVal = matchingDeals.reduce((sum, d) => sum + d.dealValue, 0);
      const avgWinProb = matchingDeals.length > 0 ? Math.round(matchingDeals.reduce((sum, d) => sum + d.winProbability, 0) / matchingDeals.length) : (cfg.id === "won" ? 100 : 50);
      const clients = matchingDeals.map((d) => d.company).slice(0, 2).join(" + ") || "No active deals";

      return {
        id: cfg.id,
        label: cfg.label,
        count: matchingDeals.length,
        totalValue: totalVal,
        displayValue: totalVal > 0 ? `₹${(totalVal / 100000).toFixed(1)}L` : "₹0",
        winProb: avgWinProb,
        color: cfg.color,
        bgLight: cfg.bgLight,
        borderLight: cfg.borderLight,
        client: clients,
        conversionRate: cfg.id === "won" ? "Won 🎉" : `${avgWinProb}%`,
      };
    });
  }, [deals]);

  const totalPipeline = deals.reduce((sum, d) => sum + d.dealValue, 0);
  const weightedPipeline = deals.reduce((sum, d) => sum + (d.dealValue * d.winProbability) / 100, 0);

  const displayTotal = totalPipeline > 0 ? `₹${(totalPipeline / 100000).toFixed(1)}L` : "₹0";
  const displayWeighted = weightedPipeline > 0 ? `₹${(weightedPipeline / 100000).toFixed(1)}L` : "₹0";

  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-pink-100">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#D6135F] border border-pink-200 shadow-xs">
            <Filter className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Pipeline Conversion Funnel &amp; Velocity</h3>
            <p className="text-xs text-slate-500">Stage progression from discovery to closed enterprise contracts</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            Total Pipeline: {displayTotal}
          </span>
          <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
            Weighted: {displayWeighted}
          </span>
        </div>
      </div>

      {deals.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
          <Briefcase className="h-10 w-10 text-pink-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">Pipeline Funnel is Empty</h4>
          <p className="text-xs text-slate-500 max-w-sm">
            Add deals in Deal Pipeline Matrix or convert prospects to track conversion velocity through all 5 stages.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {stagesData.map((stage, idx) => {
            const isHovered = hoveredStage === stage.id;
            const pctOfTotal = totalPipeline > 0 ? (stage.totalValue / totalPipeline) * 100 : 0;

            return (
              <div
                key={stage.id}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                className={`rounded-2xl border p-4 transition-all duration-200 ${
                  isHovered
                    ? "border-[#F0186C] bg-pink-50/30 shadow-sm"
                    : "border-pink-100/70 bg-white hover:border-pink-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white"
                      style={{ backgroundColor: stage.color }}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-xs text-slate-900">{stage.label}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{stage.client}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-right">
                      <div className="font-mono font-black text-slate-900">{stage.displayValue}</div>
                      <div className="text-[10px] text-slate-500">{stage.count} {stage.count === 1 ? "Deal" : "Deals"}</div>
                    </div>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                      {stage.conversionRate}
                    </span>
                  </div>
                </div>

                {/* Funnel Width Indicator */}
                <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(8, pctOfTotal)}%`,
                      backgroundColor: stage.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
