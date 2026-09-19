"use client";

import * as React from "react";
import { PieChart, Sparkles, Building2, ChevronRight, Layers, Briefcase } from "lucide-react";
import { PipelineDeal } from "@/data/admin/types";

interface SectorPipelinePieChartProps {
  deals?: PipelineDeal[];
  onSelectSector?: (sector: string) => void;
}

export interface SectorItem {
  name: string;
  value: number; // in Rupees
  displayValue: string;
  percentage: number;
  color: string;
  bgLight: string;
  borderLight: string;
  dealsCount: number;
  highlightClient: string;
}

const SECTOR_COLORS = [
  { color: "#F0186C", bgLight: "bg-pink-50", borderLight: "border-pink-200" },
  { color: "#D6135F", bgLight: "bg-rose-50", borderLight: "border-rose-200" },
  { color: "#3B82F6", bgLight: "bg-blue-50", borderLight: "border-blue-200" },
  { color: "#8B5CF6", bgLight: "bg-purple-50", borderLight: "border-purple-200" },
  { color: "#10B981", bgLight: "bg-emerald-50", borderLight: "border-emerald-200" },
  { color: "#F59E0B", bgLight: "bg-amber-50", borderLight: "border-amber-200" },
  { color: "#06B6D4", bgLight: "bg-cyan-50", borderLight: "border-cyan-200" },
];

export function SectorPipelinePieChart({ deals = [], onSelectSector }: SectorPipelinePieChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(0);
  const [chartType, setChartType] = React.useState<"donut" | "pie">("donut");

  // Dynamically group deals by sector
  const sectorDistribution: SectorItem[] = React.useMemo(() => {
    if (!deals || deals.length === 0) {
      return [];
    }

    const map = new Map<string, { total: number; count: number; client: string }>();
    deals.forEach((d) => {
      const sec = d.sector || "Enterprise Tech";
      const existing = map.get(sec) || { total: 0, count: 0, client: d.company };
      existing.total += d.dealValue;
      existing.count += 1;
      existing.client = d.company;
      map.set(sec, existing);
    });

    const totalPipeline = Array.from(map.values()).reduce((sum, item) => sum + item.total, 0);

    return Array.from(map.entries()).map(([name, data], idx) => {
      const colorScheme = SECTOR_COLORS[idx % SECTOR_COLORS.length];
      const pct = totalPipeline > 0 ? (data.total / totalPipeline) * 100 : 0;
      const displayLakhs = (data.total / 100000).toFixed(1);

      return {
        name,
        value: data.total,
        displayValue: `₹${displayLakhs}L`,
        percentage: parseFloat(pct.toFixed(1)),
        color: colorScheme.color,
        bgLight: colorScheme.bgLight,
        borderLight: colorScheme.borderLight,
        dealsCount: data.count,
        highlightClient: data.client,
      };
    });
  }, [deals]);

  const totalValue = sectorDistribution.reduce((sum, item) => sum + item.value, 0);
  const displayTotal = totalValue >= 10000000 ? `₹${(totalValue / 10000000).toFixed(2)} Cr` : `₹${(totalValue / 100000).toFixed(1)}L`;

  // SVG parameters
  const size = 260;
  const center = size / 2;
  const radius = chartType === "donut" ? 95 : 105;
  const innerRadius = chartType === "donut" ? 62 : 0;

  // Calculate slice angles
  let accumulatedAngle = -90;

  const slices = sectorDistribution.map((sector, index) => {
    const angle = (sector.percentage / 100) * 360;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angle;
    accumulatedAngle += angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const isHovered = hoveredIndex === index;
    const activeRadius = isHovered ? radius + 6 : radius;
    const activeInnerRadius = isHovered && chartType === "donut" ? innerRadius - 2 : innerRadius;

    const x1 = center + activeRadius * Math.cos(startRad);
    const y1 = center + activeRadius * Math.sin(startRad);
    const x2 = center + activeRadius * Math.cos(endRad);
    const y2 = center + activeRadius * Math.sin(endRad);

    const x3 = center + activeInnerRadius * Math.cos(endRad);
    const y3 = center + activeInnerRadius * Math.sin(endRad);
    const x4 = center + activeInnerRadius * Math.cos(startRad);
    const y4 = center + activeInnerRadius * Math.sin(startRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    let pathData = "";
    if (chartType === "donut") {
      pathData = [
        `M ${x1} ${y1}`,
        `A ${activeRadius} ${activeRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${activeInnerRadius} ${activeInnerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
        "Z",
      ].join(" ");
    } else {
      pathData = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${activeRadius} ${activeRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        "Z",
      ].join(" ");
    }

    return {
      ...sector,
      pathData,
      isHovered,
    };
  });

  const activeSector = hoveredIndex !== null ? sectorDistribution[hoveredIndex] : sectorDistribution[0];

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200/90 bg-gradient-to-br from-white via-[#FFF9FB] to-[#FFF3F7] p-6 shadow-sm">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-[#F0186C]/10 to-[#FF4D8D]/5 blur-3xl" />

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-pink-100/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F0186C] to-[#D6135F] text-white shadow-md shadow-[#F0186C]/25">
            <PieChart className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black tracking-tight text-slate-900">
                B2B Deal Pipeline by Industry
              </h3>
              <span className="rounded-full bg-pink-50 px-2.5 py-0.5 text-[10px] font-black uppercase text-[#D6135F] border border-pink-200">
                {sectorDistribution.length} Sectors
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Sector share of active {displayTotal} enterprise opportunities
            </p>
          </div>
        </div>

        {/* Toggle: Donut vs Solid Pie */}
        <div className="flex items-center gap-1 rounded-2xl border border-pink-200 bg-white p-1 shadow-2xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setChartType("donut")}
            className={`rounded-xl px-3 py-1 text-xs font-bold transition-all ${
              chartType === "donut"
                ? "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white shadow-xs"
                : "text-slate-600 hover:text-[#D6135F] hover:bg-pink-50"
            }`}
          >
            Donut
          </button>
          <button
            type="button"
            onClick={() => setChartType("pie")}
            className={`rounded-xl px-3 py-1 text-xs font-bold transition-all ${
              chartType === "pie"
                ? "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white shadow-xs"
                : "text-slate-600 hover:text-[#D6135F] hover:bg-pink-50"
            }`}
          >
            Solid Pie
          </button>
        </div>
      </div>

      {/* Main Content View */}
      {sectorDistribution.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
          <Briefcase className="h-10 w-10 text-pink-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No Active Pipeline Deals Logged Yet</h4>
          <p className="text-xs text-slate-500 max-w-sm">
            Convert leads from B2B Maps Prospector or Omnichannel Leads to automatically visualize industry pipeline share.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1.3fr] items-center">
          {/* SVG Pie / Donut Chart */}
          <div className="relative flex flex-col items-center justify-center py-2">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
              <defs>
                <filter id="pie-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#F0186C" floodOpacity="0.18" />
                </filter>
              </defs>

              <g filter="url(#pie-shadow)">
                {slices.map((slice, index) => (
                  <path
                    key={slice.name}
                    d={slice.pathData}
                    fill={slice.color}
                    className="cursor-pointer transition-all duration-300 ease-out hover:opacity-95"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onClick={() => onSelectSector && onSelectSector(slice.name)}
                  />
                ))}
              </g>

              {/* Center Donut Hole Text */}
              {chartType === "donut" && (
                <g className="pointer-events-none">
                  <circle cx={center} cy={center} r={innerRadius - 4} fill="#FFFFFF" />
                  <text
                    x={center}
                    y={center - 12}
                    textAnchor="middle"
                    className="fill-slate-400 text-[10px] font-bold uppercase tracking-wider"
                  >
                    Sector Share
                  </text>
                  <text
                    x={center}
                    y={center + 10}
                    textAnchor="middle"
                    className="fill-slate-900 font-mono text-base font-black"
                  >
                    {activeSector ? activeSector.displayValue : displayTotal}
                  </text>
                  <text
                    x={center}
                    y={center + 26}
                    textAnchor="middle"
                    className="fill-[#D6135F] text-[11px] font-black"
                  >
                    {activeSector ? `${activeSector.percentage}%` : "100%"}
                  </text>
                </g>
              )}
            </svg>

            <span className="mt-3 text-[11px] text-slate-400 font-medium">
              Hover or click slices to inspect sector metrics
            </span>
          </div>

          {/* Interactive Sector Breakdown Cards */}
          <div className="space-y-2.5">
            {sectorDistribution.map((sector, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={sector.name}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={() => onSelectSector && onSelectSector(sector.name)}
                  className={`group flex items-center justify-between rounded-2xl border p-3 cursor-pointer transition-all duration-200 ${
                    isHovered
                      ? "border-[#F0186C] bg-white ring-2 ring-[#F0186C]/30 shadow-md shadow-pink-500/5 -translate-y-0.5"
                      : "border-pink-100/70 bg-white/70 hover:bg-white hover:border-pink-200"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full shadow-xs"
                      style={{ backgroundColor: sector.color }}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="truncate text-xs font-bold text-slate-900 group-hover:text-[#D6135F]">
                          {sector.name}
                        </h4>
                        <span className="shrink-0 text-[10px] text-slate-400 font-medium">
                          ({sector.dealsCount} {sector.dealsCount === 1 ? "deal" : "deals"})
                        </span>
                      </div>
                      <div className="truncate text-[10px] text-slate-500 font-medium">
                        {sector.highlightClient}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <div className="text-right">
                      <div className="font-mono text-xs font-black text-slate-900">{sector.displayValue}</div>
                      <div className="text-[10px] font-bold text-slate-500">{sector.percentage}%</div>
                    </div>

                    {/* Progress pill */}
                    <div className="h-1.5 w-12 rounded-full bg-slate-100 overflow-hidden hidden sm:block">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, sector.percentage)}%`, backgroundColor: sector.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
