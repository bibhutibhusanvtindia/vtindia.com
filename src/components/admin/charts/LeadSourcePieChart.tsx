"use client";

import * as React from "react";
import { MessageSquare, Flame, TrendingUp, Users } from "lucide-react";
import { SocialLead } from "@/data/admin/types";

interface LeadSourcePieChartProps {
  leads?: SocialLead[];
}

interface ChannelData {
  platform: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
  dealVolume: string;
  avgScore: number;
  speed: string;
}

const PLATFORM_CONFIGS: Record<string, { label: string; color: string; speed: string }> = {
  whatsapp: { label: "WhatsApp Business", color: "#25D366", speed: "< 5 mins" },
  instagram: { label: "Instagram DM / Reels", color: "#F0186C", speed: "12 mins" },
  youtube: { label: "YouTube Inquiries", color: "#EF4444", speed: "25 mins" },
  twitter: { label: "Twitter (X) Mentions", color: "#0284C7", speed: "40 mins" },
  facebook: { label: "Facebook Leads", color: "#1877F2", speed: "30 mins" },
};

export function LeadSourcePieChart({ leads = [] }: LeadSourcePieChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(0);

  const channelData: ChannelData[] = React.useMemo(() => {
    if (!leads || leads.length === 0) return [];

    const total = leads.length;
    const map = new Map<string, { count: number; totalScore: number }>();

    leads.forEach((l) => {
      const p = l.platform || "whatsapp";
      const existing = map.get(p) || { count: 0, totalScore: 0 };
      existing.count += 1;
      existing.totalScore += l.qualificationScore || 90;
      map.set(p, existing);
    });

    return Array.from(map.entries()).map(([plat, data]) => {
      const cfg = PLATFORM_CONFIGS[plat] || { label: plat, color: "#F0186C", speed: "15 mins" };
      const pct = (data.count / total) * 100;
      return {
        platform: plat,
        label: cfg.label,
        count: data.count,
        percentage: Math.round(pct),
        color: cfg.color,
        dealVolume: `${data.count} Leads`,
        avgScore: Math.round(data.totalScore / data.count),
        speed: cfg.speed,
      };
    });
  }, [leads]);

  const size = 220;
  const center = size / 2;
  const radius = 80;
  const innerRadius = 50;

  let accumulatedAngle = -90;

  const slices = channelData.map((ch, index) => {
    const angle = (ch.percentage / 100) * 360;
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

    return { ...ch, pathData, isHovered };
  });

  const activeChannel = hoveredIndex !== null && channelData[hoveredIndex] ? channelData[hoveredIndex] : channelData[0];

  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-pink-100">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#D6135F] border border-pink-200 shadow-xs">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Omnichannel Lead Distribution</h3>
            <p className="text-xs text-slate-500">Inbound volume across WhatsApp, Instagram, YouTube &amp; Social</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            {leads.length} Inbound Inquiries
          </span>
        </div>
      </div>

      {channelData.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
          <MessageSquare className="h-10 w-10 text-pink-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No Inbound Social Leads Yet</h4>
          <p className="text-xs text-slate-500 max-w-sm">
            Inbound inquiries from WhatsApp, Instagram, or Web forms will be categorized and analyzed here automatically.
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
                    key={slice.platform}
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
                  Top Channel
                </text>
                <text x={center} y={center + 12} textAnchor="middle" className="fill-slate-900 text-sm font-black">
                  {activeChannel ? `${activeChannel.percentage}%` : "0%"}
                </text>
              </g>
            </svg>
          </div>

          {/* Breakdown cards */}
          <div className="space-y-2.5">
            {channelData.map((ch, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={ch.platform}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`flex items-center justify-between rounded-2xl border p-3 cursor-pointer transition-all ${
                    isHovered
                      ? "border-[#F0186C] bg-pink-50/40 shadow-xs"
                      : "border-pink-100/70 bg-white hover:border-pink-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: ch.color }} />
                    <span className="text-xs font-bold text-slate-900">{ch.label}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-mono font-bold text-slate-700">{ch.count} Leads</span>
                    <span className="font-bold text-[#D6135F]">{ch.percentage}%</span>
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
