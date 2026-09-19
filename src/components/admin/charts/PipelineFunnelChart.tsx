"use client";

import * as React from "react";
import { Filter, ArrowRight, TrendingUp, CheckCircle2, DollarSign, Sparkles } from "lucide-react";
import { PipelineDeal } from "@/data/admin/types";

interface PipelineFunnelChartProps {
  deals?: PipelineDeal[];
}

export function PipelineFunnelChart({ deals }: PipelineFunnelChartProps) {
  const [hoveredStage, setHoveredStage] = React.useState<string | null>(null);

  const stagesData = [
    {
      id: "discovery",
      label: "1. Discovery & Qualify",
      count: 1,
      totalValue: 750000,
      displayValue: "₹7.5L",
      winProb: 55,
      color: "#3B82F6", // Blue
      bgLight: "bg-blue-50/70",
      borderLight: "border-blue-200",
      client: "Royal Heritage Resorts Jaipur",
      conversionRate: "100%",
    },
    {
      id: "scoping",
      label: "2. Scoping & Architecture",
      count: 1,
      totalValue: 550000,
      displayValue: "₹5.5L",
      winProb: 70,
      color: "#8B5CF6", // Purple
      bgLight: "bg-purple-50/70",
      borderLight: "border-purple-200",
      client: "Utkal Institute Bhubaneswar",
      conversionRate: "88%",
    },
    {
      id: "proposal",
      label: "3. Tech Architecture & Pitch",
      count: 2,
      totalValue: 3050000,
      displayValue: "₹30.5L",
      winProb: 72,
      color: "#F59E0B", // Amber
      bgLight: "bg-amber-50/70",
      borderLight: "border-amber-200",
      client: "Al-Futtaim Dubai + Prestige Urban Mumbai",
      conversionRate: "76%",
    },
    {
      id: "negotiation",
      label: "4. Security & Pricing Finalization",
      count: 1,
      totalValue: 1100000,
      displayValue: "₹11.0L",
      winProb: 85,
      color: "#F0186C", // Virtoy Pink
      bgLight: "bg-pink-50/70",
      borderLight: "border-pink-200",
      client: "Medisurge Hospital Kolkata",
      conversionRate: "85%",
    },
    {
      id: "won",
      label: "5. Closed / Contract Won",
      count: 1,
      totalValue: 1400000,
      displayValue: "₹14.0L",
      winProb: 100,
      color: "#10B981", // Emerald
      bgLight: "bg-emerald-50/70",
      borderLight: "border-emerald-200",
      client: "Shree Jagannath Steels Jajpur",
      conversionRate: "Won 🎉",
    },
  ];

  const totalPipeline = 6850000;
  const weightedPipeline = 4920000; // sum of (value * winProbability / 100)

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
            Weighted Value: ₹49.20L (71.8%)
          </span>
        </div>
      </div>

      {/* Stage Bars Progression */}
      <div className="space-y-3 pt-4">
        {stagesData.map((stage, index) => {
          const isHovered = hoveredStage === stage.id;
          const barWidthPercent = (stage.totalValue / 3500000) * 100; // scaled relative to max stage ₹30.5L

          return (
            <div
              key={stage.id}
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isHovered
                  ? `${stage.bgLight} ${stage.borderLight} shadow-xs translate-x-1`
                  : "bg-slate-50/50 border-slate-100 hover:bg-pink-50/30 hover:border-pink-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="text-xs font-bold text-slate-900">{stage.label}</span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    ({stage.count} {stage.count === 1 ? "deal" : "deals"})
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-slate-500 text-[11px]">Win Prob: <strong className="text-slate-800">{stage.winProb}%</strong></span>
                  <div className="h-3.5 w-px bg-slate-200" />
                  <span className="font-black text-slate-900">{stage.displayValue}</span>
                </div>
              </div>

              {/* Graphical Funnel Progress Bar */}
              <div className="h-3 w-full rounded-full bg-slate-200/80 overflow-hidden relative">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(barWidthPercent, 12)}%`,
                    backgroundColor: stage.color,
                  }}
                />
              </div>

              {/* Stage details on hover */}
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate">{stage.client}</span>
                <span className="font-semibold text-[#D6135F] shrink-0">Stage Conversion: {stage.conversionRate}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-pink-100 pt-4 text-center">
        <div className="p-2">
          <span className="text-[10px] font-extrabold uppercase text-slate-600 block">Total Pipeline</span>
          <span className="text-sm font-black text-slate-900 font-mono">₹68.50L</span>
        </div>
        <div className="p-2 border-x border-pink-100">
          <span className="text-[10px] font-extrabold uppercase text-[#D6135F] block">Weighted Value</span>
          <span className="text-sm font-black text-[#D6135F] font-mono">₹49.20L</span>
        </div>
        <div className="p-2">
          <span className="text-[10px] font-extrabold uppercase text-emerald-600 block">Average Win Rate</span>
          <span className="text-sm font-black text-emerald-700 font-mono">74.5%</span>
        </div>
      </div>
    </div>
  );
}
