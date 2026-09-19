"use client";

import * as React from "react";
import { PieChart, Sparkles, Building2, ChevronRight, Layers } from "lucide-react";
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

export const SECTOR_DISTRIBUTION: SectorItem[] = [
  {
    name: "Logistics & Supply Chain",
    value: 2200000,
    displayValue: "₹22.0L",
    percentage: 32.1,
    color: "#F0186C", // Virtoy Pink
    bgLight: "bg-pink-50",
    borderLight: "border-pink-200",
    dealsCount: 1,
    highlightClient: "Al-Futtaim Heavy Logistics UAE",
  },
  {
    name: "Heavy Steel & Mining",
    value: 1400000,
    displayValue: "₹14.0L",
    percentage: 20.4,
    color: "#D6135F", // Deep Crimson
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
    dealsCount: 2,
    highlightClient: "Tata Steel & Jagannath Steels",
  },
  {
    name: "Hospitals & Healthcare",
    value: 1100000,
    displayValue: "₹11.0L",
    percentage: 16.1,
    color: "#3B82F6", // Electric Blue
    bgLight: "bg-blue-50",
    borderLight: "border-blue-200",
    dealsCount: 1,
    highlightClient: "Medisurge Hospital Kolkata",
  },
  {
    name: "Real Estate & 3D Spatial",
    value: 850000,
    displayValue: "₹8.5L",
    percentage: 12.4,
    color: "#8B5CF6", // Purple
    bgLight: "bg-purple-50",
    borderLight: "border-purple-200",
    dealsCount: 1,
    highlightClient: "Prestige Urban Builders Mumbai",
  },
  {
    name: "Hotels & Hospitality",
    value: 750000,
    displayValue: "₹7.5L",
    percentage: 10.9,
    color: "#10B981", // Emerald
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-200",
    dealsCount: 1,
    highlightClient: "Royal Heritage Resorts Jaipur",
  },
  {
    name: "Higher Education ERP",
    value: 550000,
    displayValue: "₹5.5L",
    percentage: 8.0,
    color: "#F59E0B", // Amber
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    dealsCount: 1,
    highlightClient: "Utkal Institute & Banki College",
  },
];

export function SectorPipelinePieChart({ onSelectSector }: SectorPipelinePieChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(0); // default first item
  const [chartType, setChartType] = React.useState<"donut" | "pie">("donut");

  const totalValue = SECTOR_DISTRIBUTION.reduce((sum, item) => sum + item.value, 0);

  // SVG parameters
  const size = 260;
  const center = size / 2;
  const radius = chartType === "donut" ? 95 : 105;
  const innerRadius = chartType === "donut" ? 62 : 0;

  // Calculate slice angles
  let accumulatedAngle = -90; // Start at top 12 o'clock

  const slices = SECTOR_DISTRIBUTION.map((sector, index) => {
    const angle = (sector.percentage / 100) * 360;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angle;
    accumulatedAngle += angle;

    // Convert polar coordinates to Cartesian
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

    // SVG path string
    let pathData = "";
    if (chartType === "donut") {
      pathData = [
        `M ${x1} ${y1}`,
        `A ${activeRadius} ${activeRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${activeInnerRadius} ${activeInnerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
        `Z`,
      ].join(" ");
    } else {
      pathData = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${activeRadius} ${activeRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`,
      ].join(" ");
    }

    return {
      ...sector,
      index,
      pathData,
      isHovered,
    };
  });

  const activeSector = hoveredIndex !== null ? SECTOR_DISTRIBUTION[hoveredIndex] : null;

  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-pink-100">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#D6135F] border border-pink-200 shadow-xs">
            <PieChart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">B2B Deal Pipeline by Industry</h3>
            <p className="text-xs text-slate-500">Sector share of active ₹68,50,000 enterprise opportunities</p>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-pink-50/60 p-1 border border-pink-200/70">
          <button
            onClick={() => setChartType("donut")}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
              chartType === "donut"
                ? "bg-[#F0186C] text-white shadow-xs"
                : "text-slate-600 hover:text-[#D6135F]"
            }`}
          >
            Donut
          </button>
          <button
            onClick={() => setChartType("pie")}
            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
              chartType === "pie"
                ? "bg-[#F0186C] text-white shadow-xs"
                : "text-slate-600 hover:text-[#D6135F]"
            }`}
          >
            Solid Pie
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-4">
        {/* SVG Donut / Pie Chart */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-56 h-56 sm:w-64 sm:h-64 overflow-visible select-none drop-shadow-sm"
          >
            <defs>
              <filter id="pieGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Render Slices */}
            {slices.map((slice) => (
              <path
                key={slice.name}
                d={slice.pathData}
                fill={slice.color}
                stroke="#FFFFFF"
                strokeWidth={slice.isHovered ? "3" : "2"}
                className="cursor-pointer transition-all duration-300 hover:opacity-95"
                onMouseEnter={() => setHoveredIndex(slice.index)}
                onClick={() => {
                  setHoveredIndex(slice.index);
                  if (onSelectSector) onSelectSector(slice.name);
                }}
                filter={slice.isHovered ? "url(#pieGlow)" : undefined}
                style={{
                  transformOrigin: `${center}px ${center}px`,
                }}
              />
            ))}

            {/* Donut Center Display */}
            {chartType === "donut" && (
              <g className="pointer-events-none select-none">
                <circle cx={center} cy={center} r={innerRadius - 4} fill="#FFFFFF" />
                <circle cx={center} cy={center} r={innerRadius - 4} fill="#FFF5F8" opacity="0.6" />
                <text
                  x={center}
                  y={center - 10}
                  textAnchor="middle"
                  className="fill-slate-600 text-[10px] font-extrabold uppercase tracking-wider"
                >
                  {activeSector ? "Sector Share" : "Total Pipeline"}
                </text>
                <text
                  x={center}
                  y={center + 11}
                  textAnchor="middle"
                  className="fill-slate-900 text-[15px] font-black font-mono"
                >
                  {activeSector ? activeSector.displayValue : "₹68.50L"}
                </text>
                <text
                  x={center}
                  y={center + 26}
                  textAnchor="middle"
                  className="fill-[#D6135F] text-[10px] font-bold"
                >
                  {activeSector ? `${activeSector.percentage}%` : "6 Key Sectors"}
                </text>
              </g>
            )}
          </svg>

          {/* Quick helper tip */}
          <span className="text-[11px] text-slate-600 mt-2 font-medium">
            Hover or click slices to inspect sector deals
          </span>
        </div>

        {/* Interactive Legends & Sector Metrics */}
        <div className="lg:col-span-7 space-y-2.5">
          {SECTOR_DISTRIBUTION.map((item, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.name}
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => {
                  setHoveredIndex(idx);
                  if (onSelectSector) onSelectSector(item.name);
                }}
                className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  isHovered
                    ? `${item.bgLight} ${item.borderLight} shadow-xs translate-x-1`
                    : "bg-slate-50/60 border-slate-100 hover:bg-pink-50/30 hover:border-pink-200"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Colored indicator dot / bar */}
                  <span
                    className="h-4 w-4 rounded-lg shrink-0 transition-transform"
                    style={{
                      backgroundColor: item.color,
                      transform: isHovered ? "scale(1.2)" : "scale(1)",
                    }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 truncate">{item.name}</span>
                      <span className="text-[10px] text-slate-500 font-semibold shrink-0">
                        ({item.dealsCount} {item.dealsCount === 1 ? "deal" : "deals"})
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{item.highlightClient}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-right">
                  <div>
                    <div className="text-xs font-black text-slate-900 font-mono">{item.displayValue}</div>
                    <div className="text-[10px] font-bold text-slate-500">{item.percentage}%</div>
                  </div>
                  {/* Mini progress pill */}
                  <div className="hidden sm:block w-14 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
