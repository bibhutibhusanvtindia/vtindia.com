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

const CHANNEL_DATA: ChannelData[] = [
  {
    platform: "whatsapp",
    label: "WhatsApp Business API",
    count: 9,
    percentage: 38,
    color: "#25D366", // WhatsApp Green
    dealVolume: "₹34.5L",
    avgScore: 94,
    speed: "< 5 mins",
  },
  {
    platform: "instagram",
    label: "Instagram Reels & DM",
    count: 7,
    percentage: 28,
    color: "#F0186C", // Virtoy Pink / IG
    dealVolume: "₹28.0L",
    avgScore: 91,
    speed: "12 mins",
  },
  {
    platform: "youtube",
    label: "YouTube Case Studies",
    count: 4,
    percentage: 18,
    color: "#EF4444", // YouTube Red
    dealVolume: "₹16.2L",
    avgScore: 89,
    speed: "25 mins",
  },
  {
    platform: "linkedin",
    label: "LinkedIn B2B Inbound",
    count: 3,
    percentage: 11,
    color: "#0A66C2", // LinkedIn Blue
    dealVolume: "₹12.0L",
    avgScore: 88,
    speed: "30 mins",
  },
  {
    platform: "twitter",
    label: "Twitter (X) Mentions",
    count: 1,
    percentage: 5,
    color: "#0284C7", // Sky Blue
    dealVolume: "₹5.5L",
    avgScore: 85,
    speed: "1 hour",
  },
];

export function LeadSourcePieChart({ leads }: LeadSourcePieChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(0);

  const size = 220;
  const center = size / 2;
  const radius = 80;
  const innerRadius = 50;

  let accumulatedAngle = -90;

  const slices = CHANNEL_DATA.map((ch, index) => {
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
      `Z`,
    ].join(" ");

    return {
      ...ch,
      index,
      pathData,
      isHovered,
    };
  });

  const activeChannel = hoveredIndex !== null ? CHANNEL_DATA[hoveredIndex] : null;

  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-pink-100">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#D6135F] border border-pink-200 shadow-xs">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Inbound Lead Channels &amp; Share</h3>
            <p className="text-xs text-slate-500">Source attribution of incoming enterprise inquiries</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
          <Flame className="h-3.5 w-3.5 text-[#F0186C]" />
          24 Inbound Leads / Mo
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-4">
        {/* SVG Donut */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-48 h-48 sm:w-52 sm:h-52 overflow-visible select-none">
            {slices.map((slice) => (
              <path
                key={slice.platform}
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
                Top Source
              </text>
              <text
                x={center}
                y={center + 10}
                textAnchor="middle"
                className="fill-slate-900 text-sm font-black font-mono"
              >
                {activeChannel ? `${activeChannel.percentage}%` : "38%"}
              </text>
              <text
                x={center}
                y={center + 24}
                textAnchor="middle"
                className="fill-[#D6135F] text-[9px] font-bold"
              >
                {activeChannel ? activeChannel.dealVolume : "WhatsApp"}
              </text>
            </g>
          </svg>
        </div>

        {/* Channel Breakdown list */}
        <div className="md:col-span-7 space-y-2">
          {CHANNEL_DATA.map((item, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.platform}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer ${
                  isHovered
                    ? "bg-pink-50/70 border-pink-200 shadow-xs"
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
                    <span className="text-[10px] text-slate-500">{item.count} inquiries · Avg Score {item.avgScore}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-slate-900 font-mono block">{item.dealVolume}</span>
                  <span className="text-[10px] font-bold text-slate-500">{item.percentage}% share</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
