"use client";

import * as React from "react";
import { Activity, ShieldCheck, Zap, TrendingUp, CheckCircle2 } from "lucide-react";

import { FinancialMetrics, ProjectHealth, AttentionItem, SocialLead } from "@/data/admin/types";

interface GaugeItem {
  id: string;
  label: string;
  sublabel: string;
  value: number; // 0 - 100
  displayValue: string;
  color: string;
  target: string;
  status: string;
}

export function OperationalHealthGauges({
  financials,
  projects = [],
  socialLeads = [],
  attentionItems = [],
}: {
  financials?: FinancialMetrics;
  projects?: ProjectHealth[];
  socialLeads?: SocialLead[];
  attentionItems?: AttentionItem[];
}) {
  const [hoveredGauge, setHoveredGauge] = React.useState<string | null>(null);

  const collectionVal = financials?.collectionVelocity ?? 100;
  const onScheduleCount = projects.filter((p) => p.status === "completed" || p.status === "on_track").length;
  const deliveryVal = projects.length > 0 ? Math.round((onScheduleCount / projects.length) * 100) : 100;
  const highIntentCount = socialLeads.filter((l) => l.qualificationScore >= 80).length;
  const leadVal = socialLeads.length > 0 ? Math.round((highIntentCount / socialLeads.length) * 100) : 100;
  const critBlockers = attentionItems.filter((a) => a.severity === "critical").length;
  const syncVal = critBlockers === 0 ? 100 : Math.max(80, 100 - critBlockers * 5);

  const gauges: GaugeItem[] = [
    {
      id: "collection",
      label: "Cash Collection Velocity",
      sublabel: "Invoice recovery & settlement index",
      value: collectionVal,
      displayValue: `${collectionVal}%`,
      color: "#10B981", // Emerald
      target: "Target: >90%",
      status: (financials?.overdueReceivables ?? 0) === 0 ? "100% Cleared" : "In Recovery",
    },
    {
      id: "delivery",
      label: "Milestone Delivery Rate",
      sublabel: "Active client software sprints on schedule",
      value: deliveryVal,
      displayValue: `${deliveryVal}%`,
      color: "#F0186C", // Virtoy Pink
      target: "Target: >88%",
      status: projects.length > 0 ? `${projects.length} Active` : "On Schedule",
    },
    {
      id: "leads",
      label: "Lead AI Qualification Rate",
      sublabel: "Inbound scoring >80 intent",
      value: leadVal,
      displayValue: `${leadVal}%`,
      color: "#3B82F6", // Blue
      target: "Target: >85%",
      status: socialLeads.length > 0 ? `${socialLeads.length} Captured` : "Active Radar",
    },
    {
      id: "uptime",
      label: "AI Agents & Telemetry Sync",
      sublabel: "Claude + Antigravity live stream",
      value: syncVal,
      displayValue: `${syncVal}%`,
      color: "#8B5CF6", // Purple
      target: "Target: 99.9%",
      status: critBlockers === 0 ? "Real-time" : `${critBlockers} Urgent`,
    },
  ];

  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-pink-100">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#D6135F] border border-pink-200 shadow-xs">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Executive Velocity &amp; Health Gauges</h3>
            <p className="text-xs text-slate-500">Real-time composite telemetry scores across core operations</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
          <span className="h-2 w-2 rounded-full bg-[#F0186C] animate-pulse" />
          All 4 Systems Optimal
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
        {gauges.map((g) => {
          const isHovered = hoveredGauge === g.id;
          const strokeDashoffset = 100 - g.value;

          return (
            <div
              key={g.id}
              onMouseEnter={() => setHoveredGauge(g.id)}
              onMouseLeave={() => setHoveredGauge(null)}
              className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all cursor-pointer ${
                isHovered
                  ? "bg-pink-50/50 border-pink-300 shadow-xs -translate-y-1"
                  : "bg-slate-50/40 border-slate-100 hover:bg-pink-50/20 hover:border-pink-200"
              }`}
            >
              {/* Semi-circular radial ring gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background ring */}
                  <path
                    className="text-slate-100"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Progress ring */}
                  <path
                    strokeDasharray="100, 100"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    strokeWidth="3.4"
                    stroke={g.color}
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>

                {/* Center metric */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-base font-black text-slate-900 font-mono">{g.displayValue}</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                    {g.status}
                  </span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-900 mt-2">{g.label}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{g.sublabel}</p>
              <span className="mt-2 text-[10px] font-mono font-bold text-[#D6135F] bg-white px-2 py-0.5 rounded-md border border-pink-100 shadow-2xs">
                {g.target}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
