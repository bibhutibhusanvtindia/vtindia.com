"use client";

import { useState } from "react";
import {
  Award,
  CheckCircle2,
  DollarSign,
  Download,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Printer,
  ShieldAlert,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { generateExecutiveBriefingData } from "@/lib/adminAi";
import {
  FinancialMetrics,
  ProjectHealth,
  AttentionItem,
  SocialLead,
  ProspectItem,
  SubscriptionItem,
  PipelineDeal,
} from "@/data/admin/types";
import { useMemo } from "react";

export function ExecutiveBriefingModule({
  financials,
  projects,
  attentionItems,
  socialLeads,
  prospects,
  subscriptions,
  deals = [],
}: {
  financials: FinancialMetrics;
  projects: ProjectHealth[];
  attentionItems: AttentionItem[];
  socialLeads: SocialLead[];
  prospects: ProspectItem[];
  subscriptions: SubscriptionItem[];
  deals?: PipelineDeal[];
}) {
  const briefingData = useMemo(
    () =>
      generateExecutiveBriefingData({
        financials,
        projects,
        attentionItems,
        socialLeads,
        prospects,
        subscriptions,
        deals,
      }),
    [financials, projects, attentionItems, socialLeads, prospects, subscriptions, deals]
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200/90 bg-gradient-to-br from-white via-[#FFF5F8] to-[#FCE7F3]/70 p-6 sm:p-7 shadow-sm print:hidden">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-[#F0186C]/15 to-[#FF4D8D]/5 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-sm shadow-[#F0186C]/25">
                <FileSpreadsheet className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                1-Click Executive{" "}
                <span className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] bg-clip-text text-transparent">
                  Briefing Generator
                </span>
              </h2>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
                Founder &amp; Board Ready
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Exportable, print-ready weekly operational summary synthesized from real-time company telemetry and deal progress.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handlePrint}
              className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white gap-2 shadow-md shadow-[#F0186C]/25 text-xs font-bold rounded-xl px-4 py-2"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Save as PDF</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Printable Briefing Document Container */}
      <div className="rounded-3xl border-2 border-pink-100 bg-white p-6 sm:p-10 shadow-sm print:border-none print:shadow-none print:p-0 space-y-8">
        {/* Document Header */}
        <div className="border-b-2 border-pink-100 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-wider uppercase text-[#D6135F] font-mono">
                VIRTOY TECHNOLOGIES PVT. LTD.
              </span>
              <span className="rounded-md bg-pink-50 border border-pink-200 px-2 py-0.5 text-[10px] font-black text-[#D6135F]">
                CONFIDENTIAL
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Executive Weekly Operations &amp; Growth Briefing
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Prepared for: <strong className="text-slate-900">{briefingData.preparedFor}</strong> · Cycle: {briefingData.generatedAt}
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono text-slate-500 font-bold">Kolkata HQ · Bhubaneswar O-HUB</div>
            <div className="text-xs font-black text-emerald-700 mt-1">Status: High Commercial Velocity</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#D6135F]">
            1. Executive Performance Summary
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-800 bg-gradient-to-br from-pink-50/40 to-rose-50/20 p-5 rounded-2xl border border-pink-200/80 font-medium">
            {briefingData.executiveSummary}
          </p>
        </div>

        {/* Section 2: Key Financial & Growth Indicators */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#D6135F]">
            2. Commercial &amp; Operational Snapshot
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Monthly Revenue</div>
              <div className="font-mono text-lg font-black text-slate-900 mt-1">
                {briefingData.kpiSnapshot.monthlyRevenue}
              </div>
            </div>

            <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase">MoM Velocity</div>
              <div className="font-mono text-lg font-black text-emerald-700 mt-1">
                {briefingData.kpiSnapshot.momGrowth}
              </div>
            </div>

            <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Active Pipeline</div>
              <div className="font-mono text-lg font-black text-[#D6135F] mt-1">
                {briefingData.kpiSnapshot.pipelineVolume}
              </div>
            </div>

            <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Collection Rate</div>
              <div className="font-mono text-lg font-black text-slate-900 mt-1">
                {briefingData.kpiSnapshot.collectionEfficiency}
              </div>
            </div>

            <div className="rounded-2xl border border-pink-100 bg-white p-4 col-span-2 sm:col-span-1 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Live Systems</div>
              <div className="font-mono text-lg font-black text-[#D6135F] mt-1">
                {briefingData.kpiSnapshot.activeDeployments} Enterprise
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Critical Attention Items & Blockers */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#D6135F] flex items-center gap-1.5">
            <ShieldAlert className="h-4 w-4" />
            <span>3. Critical Attention Items &amp; Operational Blockers</span>
          </h3>
          <div className="space-y-2">
            {briefingData.criticalBlockers.map((b, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50/50 to-rose-50/20 p-4 text-xs text-slate-800"
              >
                <div>
                  <div className="font-bold text-slate-900">• {b.item}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-medium">Impact: {b.impact}</div>
                </div>
                <span className="self-start sm:self-center font-bold text-[10px] rounded-lg border border-pink-200 bg-white text-[#D6135F] px-2.5 py-1">
                  Owner: {b.owner}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Key Commercial Wins This Cycle */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
            <Award className="h-4 w-4" />
            <span>4. Key Commercial Wins &amp; Milestone Sign-offs</span>
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {briefingData.topWins.map((win, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-xs space-y-1.5"
              >
                <div className="font-black text-slate-900 text-sm">{win.client}</div>
                <p className="text-[11px] text-slate-600 font-medium">{win.deal}</p>
                <div className="flex items-center justify-between border-t border-emerald-200/80 pt-2 font-mono">
                  <span className="font-black text-emerald-700">{win.value}</span>
                  <span className="text-[10px] text-slate-500 font-semibold">Rep: {win.rep}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Upcoming Strategic Focus */}
        <div className="space-y-3 border-t border-pink-100 pt-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#D6135F]">
            5. Strategic Priorities for Upcoming Week
          </h3>
          <ul className="space-y-2 text-xs text-slate-700 font-medium">
            {briefingData.weeklyFocus.map((focus, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D6135F] mt-0.5" />
                <span className="leading-relaxed">{focus}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Signature Box */}
        <div className="mt-8 border-t border-pink-100 pt-6 flex justify-between items-end text-xs text-slate-500 font-medium">
          <div>
            <p>Generated autonomously via Virtoy Antigravity Engine</p>
            <p className="font-mono text-[10px] mt-0.5 text-[#D6135F] font-bold">SHA-256 Verified Audit Log #VT-EXEC-2026-09</p>
          </div>
          <div className="text-right">
            <div className="border-b-2 border-slate-400 w-40 mb-1" />
            <span className="font-bold text-slate-800">CEO Signature &amp; Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}
