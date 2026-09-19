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

const CATEGORY_STYLES: Record<string, { label: string; color: string; bgLight: string; borderLight: string }> = {
  cloud_infra: { label: "Cloud & Server Infra", color: "#F59E0B", bgLight: "bg-amber-50", borderLight: "border-amber-200" },
  ai_tool: { label: "Executive AI & Copilots", color: "#F0186C", bgLight: "bg-pink-50", borderLight: "border-pink-200" },
  productivity: { label: "Google Workspace & Email", color: "#3B82F6", bgLight: "bg-blue-50", borderLight: "border-blue-200" },
  dev_ops: { label: "DevOps & CI/CD", color: "#10B981", bgLight: "bg-emerald-50", borderLight: "border-emerald-200" },
  domain: { label: "Design & DNS Domains", color: "#8B5CF6", bgLight: "bg-purple-50", borderLight: "border-purple-200" },
};

export function SubscriptionSpendChart({ subscriptions = [] }: SubscriptionSpendChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(0);

  const categorySpend: SpendCategory[] = React.useMemo(() => {
    if (!subscriptions || subscriptions.length === 0) return [];

    const totalSpend = subscriptions.reduce((sum, s) => sum + s.costPerMonth, 0);
    const map = new Map<string, { total: number; tools: string[]; seats: number }>();

    subscriptions.forEach((s) => {
      const cat = s.category || "productivity";
      const existing = map.get(cat) || { total: 0, tools: [], seats: 0 };
      existing.total += s.costPerMonth;
      existing.tools.push(s.name);
      existing.seats += s.seatCount;
      map.set(cat, existing);
    });

    return Array.from(map.entries()).map(([cat, data]) => {
      const style = CATEGORY_STYLES[cat] || { label: cat, color: "#F0186C", bgLight: "bg-pink-50", borderLight: "border-pink-200" };
      const pct = totalSpend > 0 ? (data.total / totalSpend) * 100 : 0;
      return {
        category: cat,
        label: style.label,
        monthlyCostUSD: data.total,
        percentage: parseFloat(pct.toFixed(1)),
        color: style.color,
        bgLight: style.bgLight,
        borderLight: style.borderLight,
        tools: data.tools.slice(0, 2).join(" + "),
        seats: `${data.seats} total seats`,
      };
    });
  }, [subscriptions]);

  const totalMonthlyUSD = subscriptions.reduce((sum, s) => sum + s.costPerMonth, 0);
  const totalMonthlyINR = Math.round(totalMonthlyUSD * 83);

  const size = 220;
  const center = size / 2;
  const radius = 80;
  const innerRadius = 52;

  let accumulatedAngle = -90;

  const slices = categorySpend.map((cat, index) => {
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
      "Z",
    ].join(" ");

    return { ...cat, pathData, isHovered };
  });

  const activeCat = hoveredIndex !== null && categorySpend[hoveredIndex] ? categorySpend[hoveredIndex] : categorySpend[0];

  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-pink-100">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#D6135F] border border-pink-200 shadow-xs">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">SaaS &amp; Cloud Subscription Spend</h3>
            <p className="text-xs text-slate-500">Monthly breakdown across Cloud, AI &amp; Developer Tools</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
            Total: ${totalMonthlyUSD}/mo (₹{(totalMonthlyINR / 1000).toFixed(1)}k)
          </span>
        </div>
      </div>

      {categorySpend.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
          <CreditCard className="h-10 w-10 text-pink-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No Subscriptions Tracked Yet</h4>
          <p className="text-xs text-slate-500 max-w-sm">
            Add recurring cloud infrastructure, developer seats, and AI tools to analyze monthly recurring expenses.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr] items-center">
          {/* SVG Donut Chart */}
          <div className="relative flex flex-col items-center justify-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <g>
                {slices.map((slice, index) => (
                  <path
                    key={slice.category}
                    d={slice.pathData}
                    fill={slice.color}
                    className="cursor-pointer transition-all duration-200"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredIndex(index)}
                  />
                ))}
              </g>

              {/* Center Label */}
              <g className="pointer-events-none">
                <text x={center} y={center - 8} textAnchor="middle" className="fill-slate-400 text-[10px] font-bold uppercase">
                  Monthly Total
                </text>
                <text x={center} y={center + 12} textAnchor="middle" className="fill-slate-900 text-sm font-black font-mono">
                  ${totalMonthlyUSD}
                </text>
              </g>
            </svg>
          </div>

          {/* Breakdown cards */}
          <div className="space-y-2.5">
            {categorySpend.map((cat, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={cat.category}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`flex items-center justify-between rounded-2xl border p-3 cursor-pointer transition-all ${
                    isHovered
                      ? "border-[#F0186C] bg-pink-50/40 shadow-xs"
                      : "border-pink-100/70 bg-white hover:border-pink-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{cat.label}</div>
                      <div className="text-[10px] text-slate-500">{cat.tools}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono font-bold text-slate-700">${cat.monthlyCostUSD}</span>
                    <span className="font-bold text-[#D6135F]">{cat.percentage}%</span>
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
