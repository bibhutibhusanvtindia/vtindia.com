"use client";

import * as React from "react";
import { CreditCard, Sparkles, PiggyBank, Server, Cpu } from "lucide-react";
import { SubscriptionItem } from "@/data/admin/types";

interface SubscriptionSpendChartProps {
  subscriptions?: SubscriptionItem[];
}

interface SpendCategory {
  category: string;
  label: string;
  monthlyCostUSD: number;
  percentage: number;
  color: string;
  bgLight: string;
  borderLight: string;
  tools: string;
  seats: string;
}

const CATEGORY_SPEND: SpendCategory[] = [
  {
    category: "cloud_infra",
    label: "Cloud & Server Infra",
    monthlyCostUSD: 480,
    percentage: 44.3,
    color: "#F59E0B", // Amber
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    tools: "AWS Chandaka EC2 & S3",
    seats: "Dedicated VPC",
  },
  {
    category: "ai_tool",
    label: "Executive AI & Copilots",
    monthlyCostUSD: 350,
    percentage: 32.3,
    color: "#F0186C", // Virtoy Pink
    bgLight: "bg-pink-50",
    borderLight: "border-pink-200",
    tools: "Claude Pro Team + Antigravity Pro",
    seats: "18 total seats",
  },
  {
    category: "productivity",
    label: "Google Workspace & Email",
    monthlyCostUSD: 120,
    percentage: 11.1,
    color: "#3B82F6", // Blue
    bgLight: "bg-blue-50",
    borderLight: "border-blue-200",
    tools: "vtindia.com Enterprise Mail",
    seats: "20 users",
  },
  {
    category: "dev_ops",
    label: "DevOps & CI/CD",
    monthlyCostUSD: 84,
    percentage: 7.7,
    color: "#10B981", // Emerald
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-200",
    tools: "GitHub Enterprise Cloud",
    seats: "12 developers",
  },
  {
    category: "design_domain",
    label: "Design & DNS Domains",
    monthlyCostUSD: 50,
    percentage: 4.6,
    color: "#8B5CF6", // Purple
    bgLight: "bg-purple-50",
    borderLight: "border-purple-200",
    tools: "Figma Org + Cloudflare DNS",
    seats: "3 designers",
  },
];

export function SubscriptionSpendChart({ subscriptions }: SubscriptionSpendChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(0);

  const size = 220;
  const center = size / 2;
  const radius = 80;
  const innerRadius = 52;

  let accumulatedAngle = -90;

  const slices = CATEGORY_SPEND.map((cat, index) => {
    const angle = (cat.percentage / 100) * 360;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angle;
    accumulatedAngle += angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const isHovered = hoveredIndex === index;
    const activeRadius = isHovered ? radius + 5 : radius;
    const activeInnerRadius = isHovered ? innerRadius - 2 : innerRadius;

    const x1 = center + activeRadius * Math.cos(startRad);
    const y1 = center + activeRadius * Math.sin(startRad);
    const x2 = center + activeRadius * Math.cos(endRad);
    const y2 = center + activeRadius * Math.sin(endRad);

    const x3 = center + activeInnerRadius * Math.cos(endRad);
    const y3 = center + activeInnerRadius * Math.sin(endRad);
    const x4 = center + activeInnerRadius * Math.cos(startRad);
    const y4 = center + activeInnerRadius * Math.sin(startRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${activeRadius} ${activeRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${activeInnerRadius} ${activeInnerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      `Z`,
    ].join(" ");

    return {
      ...cat,
      index,
      pathData,
      isHovered,
    };
  });

  const activeCategory = hoveredIndex !== null ? CATEGORY_SPEND[hoveredIndex] : null;

  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-pink-100">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#D6135F] border border-pink-200 shadow-xs">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">SaaS &amp; AI Cloud Spend Distribution</h3>
            <p className="text-xs text-slate-500">Breakdown of $1,084/mo (₹90,400/mo) operational subscriptions</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
          <PiggyBank className="h-3.5 w-3.5" />
          ₹41,000 / mo AI Savings
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-4">
        {/* SVG Donut */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-48 h-48 sm:w-52 sm:h-52 overflow-visible select-none">
            {slices.map((slice) => (
              <path
                key={slice.category}
                d={slice.pathData}
                fill={slice.color}
                stroke="#FFFFFF"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:opacity-95"
                onMouseEnter={() => setHoveredIndex(slice.index)}
              />
            ))}

            <g className="pointer-events-none select-none">
              <circle cx={center} cy={center} r={innerRadius - 4} fill="#FFFFFF" />
              <text
                x={center}
                y={center - 8}
                textAnchor="middle"
                className="fill-slate-600 text-[9px] font-extrabold uppercase"
              >
                Monthly Total
              </text>
              <text
                x={center}
                y={center + 10}
                textAnchor="middle"
                className="fill-slate-900 text-sm font-black font-mono"
              >
                {activeCategory ? `$${activeCategory.monthlyCostUSD}` : "$1,084"}
              </text>
              <text
                x={center}
                y={center + 24}
                textAnchor="middle"
                className="fill-[#D6135F] text-[9px] font-bold"
              >
                {activeCategory ? `${activeCategory.percentage}%` : "₹90.4K/mo"}
              </text>
            </g>
          </svg>
        </div>

        {/* Categories list */}
        <div className="md:col-span-7 space-y-2">
          {CATEGORY_SPEND.map((item, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.category}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                  isHovered
                    ? `${item.bgLight} ${item.borderLight} shadow-xs`
                    : "bg-slate-50/50 border-slate-100 hover:bg-pink-50/30"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 block truncate">{item.label}</span>
                    <span className="text-[10px] text-slate-500 truncate">{item.tools}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-slate-900 font-mono block">
                    ${item.monthlyCostUSD} <span className="text-[10px] font-normal text-slate-500">/mo</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">{item.percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
