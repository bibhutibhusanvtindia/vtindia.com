"use client";

import * as React from "react";
import { TrendingUp, ArrowUpRight, Sparkles, Target, DollarSign, Calendar } from "lucide-react";
import { FinancialMetrics } from "@/data/admin/types";

interface RevenueTrendChartProps {
  financials: FinancialMetrics;
}

export function RevenueTrendChart({ financials }: RevenueTrendChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(5);
  const [activeView, setActiveView] = React.useState<"trend" | "mom">("trend");

  // Derive dynamic monthly data from financials
  const monthlyData = React.useMemo(() => {
    const raw = financials.revenueByMonth || [];
    if (raw.length === 0) {
      return [
        { month: "Apr", actual: 0, target: 0, growth: 0, deals: 0, fullActual: "₹0" },
        { month: "May", actual: 0, target: 0, growth: 0, deals: 0, fullActual: "₹0" },
        { month: "Jun", actual: 0, target: 0, growth: 0, deals: 0, fullActual: "₹0" },
        { month: "Jul", actual: 0, target: 0, growth: 0, deals: 0, fullActual: "₹0" },
        { month: "Aug", actual: 0, target: 0, growth: 0, deals: 0, fullActual: "₹0" },
        { month: "Sep", actual: 0, target: 0, growth: 0, deals: 0, fullActual: "₹0", isCurrent: true },
      ];
    }
    return raw.map((item, idx) => ({
      month: item.month,
      actual: item.actual,
      target: item.target,
      growth: idx === 0 ? 0 : item.actual > 0 ? 10.0 : 0,
      deals: 0,
      fullActual: `₹${(item.actual * 100000).toLocaleString("en-IN")}`,
      isCurrent: idx === raw.length - 1,
    }));
  }, [financials]);

  // SVG Chart dimensions and coordinates
  const width = 640;
  const height = 240;
  const paddingX = 45;
  const paddingY = 30;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const maxVal = Math.max(30, ...monthlyData.map((d) => Math.max(d.actual, d.target)));
  const minVal = 0;

  const getX = (index: number) => paddingX + (index / (monthlyData.length - 1)) * chartWidth;
  const getY = (val: number) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * chartHeight;

  // Generate smooth bezier curve path
  const actualPoints = monthlyData.map((d, i) => ({ x: getX(i), y: getY(d.actual) }));
  const targetPoints = monthlyData.map((d, i) => ({ x: getX(i), y: getY(d.target) }));

  const generateSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return "";
    let path = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return path;
  };

  const actualLinePath = generateSmoothPath(actualPoints);
  const targetLinePath = generateSmoothPath(targetPoints);
  const areaPath = `${actualLinePath} L ${actualPoints[actualPoints.length - 1].x},${height - paddingY} L ${actualPoints[0].x},${height - paddingY} Z`;

  const activePoint = hoveredIndex !== null && monthlyData[hoveredIndex] ? monthlyData[hoveredIndex] : monthlyData[monthlyData.length - 1];

  const totalActualSum = monthlyData.reduce((acc, m) => acc + m.actual, 0);
  const currentActualDisplay = financials.monthlyRevenue > 0 ? `₹${(financials.monthlyRevenue / 100000).toFixed(2)}L` : "₹0";
  const currentTargetDisplay = financials.targetRevenue > 0 ? `₹${(financials.targetRevenue / 100000).toFixed(2)}L` : "₹0";
  const sixMonthTotalDisplay = totalActualSum > 0 ? (totalActualSum >= 100 ? `₹${(totalActualSum / 100).toFixed(3)} Cr` : `₹${totalActualSum.toFixed(1)}L`) : "₹0";

  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-pink-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#D6135F] border border-pink-200 shadow-xs">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Revenue Trajectory &amp; Growth Telemetry</h3>
              <p className="text-xs text-slate-500">Monthly actual cashflow vs milestone targets (in ₹ Lakhs)</p>
            </div>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 rounded-xl bg-pink-50/60 p-1 border border-pink-200/70">
          <button
            onClick={() => setActiveView("trend")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              activeView === "trend"
                ? "bg-[#F0186C] text-white shadow-xs"
                : "text-slate-600 hover:text-[#D6135F] hover:bg-white/60"
            }`}
          >
            Actual vs Target
          </button>
          <button
            onClick={() => setActiveView("mom")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              activeView === "mom"
                ? "bg-[#F0186C] text-white shadow-xs"
                : "text-slate-600 hover:text-[#D6135F] hover:bg-white/60"
            }`}
          >
            MoM Growth %
          </button>
        </div>
      </div>

      {/* Metric Summaries */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 py-4 border-b border-pink-100/60">
        <div className="rounded-2xl bg-pink-50/40 p-3 border border-pink-100">
          <div className="text-[10px] font-bold uppercase text-slate-500">Current Revenue</div>
          <div className="mt-0.5 text-base font-black font-mono text-slate-900">{currentActualDisplay}</div>
          <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
            <ArrowUpRight className="h-3 w-3" />
            <span>+{financials.momGrowth}% MoM</span>
          </div>
        </div>

        <div className="rounded-2xl bg-pink-50/40 p-3 border border-pink-100">
          <div className="text-[10px] font-bold uppercase text-slate-500">Milestone Target</div>
          <div className="mt-0.5 text-base font-black font-mono text-slate-900">{currentTargetDisplay}</div>
          <div className="text-[10px] text-slate-500 font-medium">Target Baseline</div>
        </div>

        <div className="rounded-2xl bg-pink-50/40 p-3 border border-pink-100">
          <div className="text-[10px] font-bold uppercase text-slate-500">6-Month Total</div>
          <div className="mt-0.5 text-base font-black font-mono text-slate-900">{sixMonthTotalDisplay}</div>
          <div className="text-[10px] text-slate-500 font-medium">{financials.activeProjectsCount} Deployments</div>
        </div>

        <div className="rounded-2xl bg-pink-50/40 p-3 border border-pink-100">
          <div className="text-[10px] font-bold uppercase text-slate-500">Collection Velocity</div>
          <div className="mt-0.5 text-base font-black font-mono text-emerald-700">{financials.collectionVelocity}%</div>
          <div className="text-[10px] font-bold text-slate-500">On-Time Clearance</div>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="mt-4 relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56 overflow-visible">
          <defs>
            {/* Gradient Fill for Area */}
            <linearGradient id="actualAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F0186C" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F0186C" stopOpacity="0.0" />
            </linearGradient>

            {/* Target Line Gradient */}
            <linearGradient id="targetGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 10, 20, 30].map((val) => {
            const y = getY(val);
            return (
              <g key={val} className="text-slate-300">
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#F1F5F9" strokeDasharray="4 4" strokeWidth="1" />
                <text x={paddingX - 10} y={y + 3} textAnchor="end" className="text-[9px] fill-slate-400 font-mono">
                  ₹{val}L
                </text>
              </g>
            );
          })}

          {/* Target line (Dashed) */}
          <path d={targetLinePath} fill="none" stroke="url(#targetGradient)" strokeWidth="2" strokeDasharray="5 5" className="opacity-60" />

          {/* Actual Line Gradient Area */}
          <path d={areaPath} fill="url(#actualAreaGradient)" />

          {/* Actual Line (Solid Pink) */}
          <path d={actualLinePath} fill="none" stroke="#F0186C" strokeWidth="3.5" strokeLinecap="round" />

          {/* Data Points */}
          {monthlyData.map((d, i) => {
            const pt = actualPoints[i];
            const isHovered = hoveredIndex === i;
            return (
              <g key={d.month} className="cursor-pointer" onMouseEnter={() => setHoveredIndex(i)}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 7 : 4}
                  fill="#FFFFFF"
                  stroke="#F0186C"
                  strokeWidth={isHovered ? 3.5 : 2.5}
                  className="transition-all duration-200"
                />
                {/* X-axis labels */}
                <text
                  x={pt.x}
                  y={height - 8}
                  textAnchor="middle"
                  className={`text-[10px] font-bold ${isHovered ? "fill-[#F0186C] font-black" : "fill-slate-500"}`}
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-3 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-6 rounded-full bg-[#F0186C]" />
            <span>Actual Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-6 border-b-2 border-dashed border-slate-400" />
            <span>Milestone Target</span>
          </div>
        </div>
      </div>
    </div>
  );
}
