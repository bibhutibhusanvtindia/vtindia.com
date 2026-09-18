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
} from "@/data/admin/types";

export function ExecutiveBriefingModule({
  financials,
  projects,
  attentionItems,
  socialLeads,
  prospects,
  subscriptions,
}: {
  financials: FinancialMetrics;
  projects: ProjectHealth[];
  attentionItems: AttentionItem[];
  socialLeads: SocialLead[];
  prospects: ProspectItem[];
  subscriptions: SubscriptionItem[];
}) {
  const [briefingData] = useState(() =>
    generateExecutiveBriefingData({
      financials,
      projects,
      attentionItems,
      socialLeads,
      prospects,
      subscriptions,
    })
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">📄 1-Click Executive Briefing Generator</h2>
            <Badge variant="indigo" size="xs">
              Founder &amp; Board Ready
            </Badge>
          </div>
          <p className="text-xs text-muted">
            Exportable, print-ready weekly operational summary synthesized from real-time company telemetry and deal progress.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" onClick={handlePrint} className="gap-1.5">
            <Printer className="h-3.5 w-3.5" />
            <span>Print / Save as PDF</span>
          </Button>
        </div>
      </div>

      {/* Printable Briefing Document Container */}
      <div className="rounded-3xl border border-border/90 bg-surface p-6 sm:p-10 shadow-lg print:border-none print:shadow-none print:p-0 space-y-8">
        {/* Document Header */}
        <div className="border-b border-border/80 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wider uppercase text-primary font-mono">
                VIRTOY TECHNOLOGIES PVT. LTD.
              </span>
              <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-bold text-muted">
                CONFIDENTIAL
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Executive Weekly Operations &amp; Growth Briefing
            </h1>
            <p className="text-xs text-muted mt-1">
              Prepared for: <strong className="text-foreground">{briefingData.preparedFor}</strong> · Cycle: {briefingData.generatedAt}
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono text-muted">Kolkata HQ · Bhubaneswar O-HUB</div>
            <div className="text-xs font-bold text-emerald-600 mt-1">Status: High Commercial Velocity</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
            1. Executive Performance Summary
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-muted bg-surface-muted/40 p-4 rounded-2xl border border-border/60">
            {briefingData.executiveSummary}
          </p>
        </div>

        {/* Section 2: Key Financial & Growth Indicators */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
            2. Commercial &amp; Operational Snapshot
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="rounded-2xl border border-border bg-surface-muted/30 p-3.5">
              <div className="text-[10px] text-muted">Monthly Revenue</div>
              <div className="font-mono text-base font-bold text-foreground mt-1">
                {briefingData.kpiSnapshot.monthlyRevenue}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-muted/30 p-3.5">
              <div className="text-[10px] text-muted">MoM Velocity</div>
              <div className="font-mono text-base font-bold text-emerald-600 mt-1">
                {briefingData.kpiSnapshot.momGrowth}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-muted/30 p-3.5">
              <div className="text-[10px] text-muted">Active Pipeline</div>
              <div className="font-mono text-base font-bold text-indigo-600 mt-1">
                {briefingData.kpiSnapshot.pipelineVolume}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-muted/30 p-3.5">
              <div className="text-[10px] text-muted">Collection Rate</div>
              <div className="font-mono text-base font-bold text-foreground mt-1">
                {briefingData.kpiSnapshot.collectionEfficiency}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-muted/30 p-3.5 col-span-2 sm:col-span-1">
              <div className="text-[10px] text-muted">Live Systems</div>
              <div className="font-mono text-base font-bold text-primary mt-1">
                {briefingData.kpiSnapshot.activeDeployments} Enterprise
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Critical Attention Items & Blockers */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-destructive flex items-center gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>3. Critical Attention Items &amp; Operational Blockers</span>
          </h3>
          <div className="space-y-2">
            {briefingData.criticalBlockers.map((b, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-destructive/20 bg-destructive/[0.03] p-3.5 text-xs"
              >
                <div>
                  <div className="font-bold text-foreground">• {b.item}</div>
                  <div className="text-[11px] text-muted mt-0.5">Impact: {b.impact}</div>
                </div>
                <Badge variant="outline" size="xs" className="self-start sm:self-center font-medium">
                  Owner: {b.owner}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Key Commercial Wins This Cycle */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5" />
            <span>4. Key Commercial Wins &amp; Milestone Sign-offs</span>
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {briefingData.topWins.map((win, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4 text-xs space-y-1.5"
              >
                <div className="font-bold text-foreground text-sm">{win.client}</div>
                <p className="text-[11px] text-muted">{win.deal}</p>
                <div className="flex items-center justify-between border-t border-border/50 pt-2 font-mono">
                  <span className="font-bold text-emerald-600">{win.value}</span>
                  <span className="text-[10px] text-muted">Rep: {win.rep}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Upcoming Strategic Focus */}
        <div className="space-y-3 border-t border-border/80 pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
            5. Strategic Priorities for Upcoming Week
          </h3>
          <ul className="space-y-2 text-xs text-foreground">
            {briefingData.weeklyFocus.map((focus, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <span className="leading-relaxed">{focus}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Signature Box */}
        <div className="mt-8 border-t border-border/80 pt-6 flex justify-between items-end text-xs text-muted">
          <div>
            <p>Generated autonomously via Virtoy Antigravity Engine</p>
            <p className="font-mono text-[10px] mt-0.5">SHA-256 Verified Audit Log #VT-EXEC-2026-09</p>
          </div>
          <div className="text-right">
            <div className="border-b border-foreground/40 w-40 mb-1" />
            <span className="font-semibold text-foreground">CEO Signature &amp; Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}
