"use client";

import * as React from "react";
import { TrendingUp, ArrowUpRight, Sparkles, Target, DollarSign, Calendar } from "lucide-react";
import { FinancialMetrics } from "@/data/admin/types";

interface RevenueTrendChartProps {
  financials: FinancialMetrics;
}

export function RevenueTrendChart({ financials }: RevenueTrendChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(5); // Default to current month (Sep)
  const [activeView, setActiveView] = React.useState<"trend" | "target" | "mom">("trend");

  const monthlyData = [
    { month: "Apr", actual: 16.5, target: 18.0, growth: 12.4, deals: 4, fullActual: "₹16,50,000" },
    { month: "May", actual: 18.2, target: 20.0, growth: 10.3, deals: 6, fullActual: "₹18,20,000" },
    { month: "Jun", actual: 19.8, target: 22.0, growth: 8.8, deals: 7, fullActual: "₹19,80,000" },
    { month: "Jul", actual: 21.4, target: 24.0, growth: 8.1, deals: 8, fullActual: "₹21,40,000" },
    { month: "Aug", actual: 23.1, target: 26.0, growth: 7.9, deals: 10, fullActual: "₹23,10,000" },
    { month: "Sep", actual: 24.8, target: 30.0, growth: 18.4, deals: 12, fullActual: "₹24,80,000", isCurrent: true },
    { month: "Oct (Proj)", actual: 28.5, target: 32.0, growth: 14.9, deals: 15, fullActual: "₹28,50,000", isProjected: true },
  ];

  // SVG Chart dimensions and coordinates
  const width = 640;
  const height = 240;
  const paddingX = 45;
  const paddingY = 30;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const minVal = 12;
  const maxVal = 34;

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

  const activePoint = hoveredIndex !== null ? monthlyData[hoveredIndex] : monthlyData[5];

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

      {/* KPI highlight pills */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 py-4">
        <div className="rounded-2xl border border-pink-100 bg-gradient-to-br from-white to-[#FFF5F8] p-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Sep Revenue</span>
          <div className="text-lg font-black text-slate-900 font-mono">₹24.80L</div>
          <div className="flex items-center text-[11px] font-bold text-emerald-600">
            <ArrowUpRight className="h-3 w-3 mr-0.5" /> +18.4% MoM
          </div>
        </div>

        <div className="rounded-2xl border border-pink-100 bg-white p-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Sep Target</span>
          <div className="text-lg font-black text-slate-900 font-mono">₹30.00L</div>
          <div className="text-[11px] font-semibold text-slate-500">82.7% Attainment</div>
        </div>

        <div className="rounded-2xl border border-pink-100 bg-white p-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">6-Month Total</span>
          <div className="text-lg font-black text-slate-900 font-mono">₹1.238 Cr</div>
          <div className="text-[11px] font-semibold text-[#D6135F]">47 Deployments</div>
        </div>

        <div className="rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50/50 to-rose-100/40 p-3 border-dashed">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D6135F]">Oct Forecast</span>
          <div className="text-lg font-black text-[#D6135F] font-mono">₹28.50L</div>
          <div className="flex items-center text-[11px] font-bold text-[#D6135F]">
            <Sparkles className="h-3 w-3 mr-1" /> High Confidence
          </div>
        </div>
      </div>

      {/* SVG Interactive Area Graph */}
      <div className="relative pt-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
          <defs>
            {/* Soft pink gradient for area fill */}
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F0186C" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#FF4D8D" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#FFF5F8" stopOpacity="0.0" />
            </linearGradient>

            {/* Target line gradient */}
            <linearGradient id="targetGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="pinkGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Horizontal Grid lines */}
          {[15, 20, 25, 30].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-600 text-[10px] font-bold font-mono"
                >
                  ₹{val}L
                </text>
              </g>
            );
          })}

          {/* Area under curve */}
          <path d={areaPath} fill="url(#revenueGradient)" />

          {/* Target trajectory dashed line */}
          <path
            d={targetLinePath}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeDasharray="6 6"
            opacity="0.8"
          />

          {/* Actual revenue main line */}
          <path
            d={actualLinePath}
            fill="none"
            stroke="#F0186C"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#pinkGlow)"
          />

          {/* Hover Column guide */}
          {hoveredIndex !== null && (
            <line
              x1={getX(hoveredIndex)}
              y1={paddingY}
              x2={getX(hoveredIndex)}
              y2={height - paddingY}
              stroke="#F0186C"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.5"
            />
          )}

          {/* Data Points */}
          {monthlyData.map((d, i) => {
            const x = getX(i);
            const yActual = getY(d.actual);
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={d.month}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={() => setHoveredIndex(i)}
              >
                {/* Target node dot */}
                <circle cx={x} cy={getY(d.target)} r="3" fill="#94A3B8" opacity="0.6" />

                {/* Actual node pulse halo when hovered or current */}
                {(isHovered || d.isCurrent) && (
                  <circle
                    cx={x}
                    cy={yActual}
                    r={isHovered ? "9" : "6"}
                    fill="#F0186C"
                    opacity="0.25"
                    className="animate-pulse"
                  />
                )}

                {/* Actual node dot */}
                <circle
                  cx={x}
                  cy={yActual}
                  r={isHovered ? "5.5" : "4"}
                  fill={d.isProjected ? "#FFF" : "#F0186C"}
                  stroke={d.isProjected ? "#F0186C" : "#FFF"}
                  strokeWidth="2.5"
                  className="transition-all duration-200"
                />

                {/* Value Label above point on hover or key points */}
                <text
                  x={x}
                  y={yActual - 10}
                  textAnchor="middle"
                  className={`text-[10px] font-mono font-bold transition-all ${
                    isHovered
                      ? "fill-[#D6135F] text-[11px] font-black"
                      : d.isCurrent
                      ? "fill-slate-900"
                      : "fill-slate-500"
                  }`}
                >
                  ₹{d.actual}L
                </text>

                {/* Month label along bottom axis */}
                <text
                  x={x}
                  y={height - paddingY + 16}
                  textAnchor="middle"
                  className={`text-[10px] font-bold transition-colors ${
                    isHovered
                      ? "fill-[#F0186C] font-black"
                      : d.isCurrent
                      ? "fill-slate-900"
                      : "fill-slate-500"
                  }`}
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Dynamic Interactive Tooltip Card */}
        {activePoint && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50/70 via-white to-rose-50/50 p-3.5 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F0186C] text-white text-xs font-black">
                {activePoint.month.slice(0, 3)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900">{activePoint.month} Performance</span>
                  {activePoint.isCurrent && (
                    <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[9px] font-extrabold text-[#D6135F]">
                      Current Month
                    </span>
                  )}
                  {activePoint.isProjected && (
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[9px] font-extrabold text-purple-700">
                      Projected
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  {activePoint.deals} Active enterprise client deliverables executed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-600 block">Actual</span>
                <span className="font-black text-slate-900 text-sm">{activePoint.fullActual}</span>
              </div>
              <div className="h-6 w-px bg-pink-200" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-600 block">Target</span>
                <span className="font-bold text-slate-700 text-sm">₹{activePoint.target}.0L</span>
              </div>
              <div className="h-6 w-px bg-pink-200" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-600 block">MoM Rate</span>
                <span className="font-bold text-emerald-600 text-sm">+{activePoint.growth}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-6 rounded-full bg-[#F0186C]" />
            <span className="font-bold text-slate-700">Actual Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-6 border-b-2 border-dashed border-slate-400" />
            <span className="font-semibold text-slate-500">Monthly Target</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-[#F0186C] bg-white" />
            <span className="font-semibold text-slate-500">Milestone Node</span>
          </div>
        </div>
      </div>
    </div>
  );
}
