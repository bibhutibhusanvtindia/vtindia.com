"use client";

import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  Building,
  CheckCircle2,
  Clock,
  DollarSign,
  FileSpreadsheet,
  FolderGit2,
  Layers,
  MapPin,
  Plus,
  Send,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
  Briefcase,
  Zap,
  Compass,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/Table";
import {
  FinancialMetrics,
  ProjectHealth,
  AttentionItem,
  SocialLead,
  ProspectItem,
} from "@/data/admin/types";

export function DashboardModule({
  financials,
  projects,
  attentionItems,
  socialLeads,
  prospects,
  onSelectTab,
  onResolveAttentionItem,
}: {
  financials: FinancialMetrics;
  projects: ProjectHealth[];
  attentionItems: AttentionItem[];
  socialLeads: SocialLead[];
  prospects: ProspectItem[];
  onSelectTab: (tab: string) => void;
  onResolveAttentionItem: (id: string) => void;
}) {
  const hotLeadsCount = socialLeads.filter((l) => l.qualificationScore >= 90).length;

  return (
    <div className="space-y-6">
      {/* Top Banner: Virtoy Executive Hero & Quick Actions */}
      <div className="relative overflow-hidden rounded-2xl border border-[#3D1E30] bg-gradient-to-r from-[#1C0915] via-[#12060E] to-[#2B0E1E] p-6 shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 items-center rounded-full bg-[#D6135F]/20 px-2.5 text-[10px] font-bold text-[#FF4D8D] font-mono border border-[#F0186C]/30">
                ✨ EXECUTIVE AI ENGINE
              </span>
              <span className="text-[11px] font-semibold text-rose-300/70">Virtoy Executive Command Center</span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
              AI Executive Command Center &amp; B2B Growth Platform
            </h2>
            <p className="text-xs text-rose-100/70 max-w-2xl leading-relaxed">
              Single-screen executive visibility: Real-time revenue telemetry, AI chief of staff assistant, B2B deal matrix, and omnichannel pipeline prospecting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              onClick={() => onSelectTab("chief-of-staff")}
              className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white gap-1.5 shadow-md shadow-[#F0186C]/25 text-xs font-bold"
            >
              <Bot className="h-3.5 w-3.5" />
              Ask AI Chief of Staff
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectTab("deals")}
              className="border-[#3D1E30] bg-[#160A12] text-slate-200 hover:border-[#F0186C]/50 hover:bg-[#220E1B] text-xs gap-1.5"
            >
              <Briefcase className="h-3.5 w-3.5 text-[#FF4D8D]" />
              Deal Matrix
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectTab("cold-outreach")}
              className="border-[#3D1E30] bg-[#160A12] text-slate-200 hover:border-[#F0186C]/50 hover:bg-[#220E1B] text-xs gap-1.5"
            >
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              AI Outreach
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectTab("briefing")}
              className="border-[#3D1E30] bg-[#160A12] text-slate-200 hover:border-[#F0186C]/50 hover:bg-[#220E1B] text-xs gap-1.5"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400" />
              1-Click Briefing
            </Button>
          </div>
        </div>
      </div>

      {/* 4 Core Financial & Operations Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Monthly Revenue */}
        <Card className="border-l-4 border-l-[#F0186C] border-[#2D1625] bg-[#12070E]/80 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-rose-300/70">Monthly Revenue (Sep)</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F0186C]/10 text-[#FF4D8D]">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-white font-mono">₹24,80,000</div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center text-emerald-400 font-semibold">
                <TrendingUp className="mr-1 h-3.5 w-3.5" />
                +{financials.momGrowth}% MoM
              </span>
              <span className="font-mono text-[11px] text-rose-200/60">Target: ₹30.0L</span>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#200E1C]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#D6135F] to-[#F0186C] transition-all duration-500"
                style={{ width: `${(financials.monthlyRevenue / financials.targetRevenue) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card className="border-l-4 border-l-[#FF4D8D] border-[#2D1625] bg-[#12070E]/80 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-rose-300/70">Active Deployments</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F0186C]/10 text-[#FF4D8D]">
              <Layers className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-white font-mono">12 Systems</div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
              <span>6 High-Impact Enterprise</span>
              <Badge variant="brand" size="xs">
                91% On-Time
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 truncate">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>Tata Steel · Krushi Odisha · OMSA</span>
            </div>
          </CardContent>
        </Card>

        {/* Overdue Receivables */}
        <Card className="border-l-4 border-l-amber-500 border-[#2D1625] bg-[#12070E]/80 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-rose-300/70">Overdue Receivables</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-amber-400 font-mono">₹4,20,000</div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
              <span className="text-amber-400 font-semibold">1 Invoice &gt; 14 Days</span>
              <span className="font-mono text-[11px] text-rose-200/60">{financials.collectionVelocity}% Velocity</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 truncate">Tata Steel Kalinga Phase 2</span>
              <button
                onClick={() => onSelectTab("proof-vault")}
                className="text-[#FF4D8D] font-bold hover:underline"
              >
                Track &rarr;
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Active Pipeline Value */}
        <Card className="border-l-4 border-l-[#FF4D8D] border-[#2D1625] bg-[#12070E]/80 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-rose-300/70">Enterprise Pipeline</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F0186C]/10 text-[#FF4D8D]">
              <Sparkles className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-white font-mono">₹68,50,000</div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[#FF4D8D] font-semibold">{hotLeadsCount} Hot Leads (Score &gt; 90)</span>
              <span className="font-mono text-[11px] text-rose-200/60">6 Active Deals</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 truncate">Dubai Logistics + Jaipur Hotels</span>
              <button
                onClick={() => onSelectTab("deals")}
                className="text-[#FF4D8D] font-bold hover:underline"
              >
                Pipeline &rarr;
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-Time AI Attention Matrix */}
      <Card className="border-[#3D1E30] bg-[#10070D]/90 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-[#2A1322]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F0186C]/10 text-[#FF4D8D]">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-white">Real-Time AI Attention Matrix</CardTitle>
              <CardDescription className="text-xs text-rose-200/60">
                High-priority blockers and revenue opportunities surfaced by the Virtoy intelligence agent.
              </CardDescription>
            </div>
          </div>
          <Badge variant="destructive" size="sm">
            {attentionItems.length} Urgent Items
          </Badge>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          {attentionItems.map((item) => {
            const mappedModule =
              item.actionModule === "vault"
                ? "proof-vault"
                : item.actionModule === "social_leads"
                ? "social-leads"
                : item.actionModule === "subscriptions"
                ? "subscriptions"
                : item.actionModule || "dashboard";

            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#2D1625] bg-[#160A13] p-3.5 transition hover:border-[#F0186C]/40"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                      item.severity === "critical"
                        ? "bg-[#F0186C] animate-pulse"
                        : item.severity === "high"
                        ? "bg-amber-400"
                        : "bg-[#FF4D8D]"
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-rose-100">{item.title}</h4>
                      <Badge
                        variant={
                          item.severity === "critical"
                            ? "destructive"
                            : item.severity === "high"
                            ? "warning"
                            : "default"
                        }
                        size="xs"
                        className="uppercase text-[9px] font-mono"
                      >
                        {item.severity}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-3xl">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onSelectTab(mappedModule)}
                    className="border-[#3D1E30] bg-[#1A0C16] text-rose-200 hover:text-white"
                  >
                    {item.actionLabel}
                    <ArrowUpRight className="h-3 w-3 text-[#FF4D8D]" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onResolveAttentionItem(item.id)}
                    title="Mark resolved"
                    className="text-slate-400 hover:text-emerald-400"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}

          {attentionItems.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-400">
              ✨ All critical items resolved. Operational health is at 100%.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active High-Impact Projects Health Grid */}
      <Card className="border-[#3D1E30] bg-[#10070D]/90 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-[#2A1322]">
          <div>
            <CardTitle className="text-sm font-bold text-white">High-Impact Project Deployments</CardTitle>
            <CardDescription className="text-xs text-rose-200/60">
              Live engineering telemetry across active heavy industry and institutional clients.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectTab("proof-vault")}
            className="text-xs border-[#3D1E30] bg-[#160A12] text-rose-200 hover:text-white"
          >
            View Discussion Vault &rarr;
          </Button>
        </CardHeader>
        <CardContent className="pt-2">
          <Table>
            <TableHeader>
              <TableRow className="border-[#2A1322]">
                <TableHead className="text-rose-300/70">Project &amp; Client</TableHead>
                <TableHead className="text-rose-300/70">Category</TableHead>
                <TableHead className="text-rose-300/70">Health Status</TableHead>
                <TableHead className="text-rose-300/70">Progress</TableHead>
                <TableHead className="text-rose-300/70">Deal Value</TableHead>
                <TableHead className="text-rose-300/70">Lead Engineer</TableHead>
                <TableHead className="text-rose-300/70">Next Milestone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((proj) => (
                <TableRow key={proj.id} className="border-[#2A1322]/60 hover:bg-[#1A0B16]/50">
                  <TableCell>
                    <div className="font-bold text-rose-50">{proj.name}</div>
                    <div className="text-[11px] text-slate-400">{proj.client}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" size="xs">
                      {proj.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        proj.status === "completed"
                          ? "success"
                          : proj.status === "on_track"
                          ? "brand"
                          : proj.status === "at_risk"
                          ? "warning"
                          : "destructive"
                      }
                      size="xs"
                      className="uppercase font-mono"
                    >
                      {proj.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#24101E]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#D6135F] to-[#FF4D8D]"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-rose-200">{proj.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono font-bold text-white">{proj.dealValue}</TableCell>
                  <TableCell className="text-xs text-slate-400">{proj.leadEngineer}</TableCell>
                  <TableCell>
                    <div className="text-[11px] font-medium text-rose-100">{proj.nextMilestone}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="h-2.5 w-2.5 text-rose-400/60" />
                      Due {proj.dueDate}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
