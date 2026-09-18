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
      <div className="relative overflow-hidden rounded-2xl border border-rose-200/80 bg-gradient-to-r from-rose-50/80 via-pink-50/50 to-rose-100/50 p-6 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-6 items-center rounded-full bg-[#D6135F]/10 px-2.5 text-[10px] font-bold text-[#D6135F] font-mono border border-[#F0186C]/20">
                ✨ EXECUTIVE AI ENGINE
              </span>
              <span className="text-[11px] font-semibold text-slate-600">Virtoy Executive Command Center</span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              AI Executive Command Center &amp; B2B Growth Platform
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Single-screen executive visibility: Real-time revenue telemetry, AI chief of staff assistant, B2B deal matrix, and omnichannel pipeline prospecting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              onClick={() => onSelectTab("chief-of-staff")}
              className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white gap-1.5 shadow-sm text-xs font-bold"
            >
              <Bot className="h-3.5 w-3.5" />
              Ask AI Chief of Staff
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectTab("deals")}
              className="border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:bg-rose-50/50 hover:text-[#D6135F] text-xs gap-1.5"
            >
              <Briefcase className="h-3.5 w-3.5 text-[#D6135F]" />
              Deal Matrix
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectTab("cold-outreach")}
              className="border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:bg-rose-50/50 hover:text-[#D6135F] text-xs gap-1.5"
            >
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              AI Outreach
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectTab("briefing")}
              className="border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:bg-rose-50/50 hover:text-[#D6135F] text-xs gap-1.5"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" />
              1-Click Briefing
            </Button>
          </div>
        </div>
      </div>

      {/* 4 Core Financial & Operations Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Monthly Revenue */}
        <Card className="border-l-4 border-l-[#F0186C] border-slate-200/80 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500">Monthly Revenue (Sep)</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-[#D6135F]">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-slate-900 font-mono">₹24,80,000</div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center text-emerald-600 font-semibold">
                <TrendingUp className="mr-1 h-3.5 w-3.5" />
                +{financials.momGrowth}% MoM
              </span>
              <span className="font-mono text-[11px] text-slate-400">Target: ₹30.0L</span>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#D6135F] to-[#F0186C] transition-all duration-500"
                style={{ width: `${(financials.monthlyRevenue / financials.targetRevenue) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card className="border-l-4 border-l-[#D6135F] border-slate-200/80 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500">Active Deployments</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-[#D6135F]">
              <Layers className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-slate-900 font-mono">12 Systems</div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
              <span>6 High-Impact Enterprise</span>
              <Badge variant="brand" size="xs">
                91% On-Time
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span>Tata Steel · Krushi Odisha · OMSA</span>
            </div>
          </CardContent>
        </Card>

        {/* Overdue Receivables */}
        <Card className="border-l-4 border-l-amber-500 border-slate-200/80 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500">Overdue Receivables</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-amber-600 font-mono">₹4,20,000</div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
              <span className="text-amber-600 font-semibold">1 Invoice &gt; 14 Days</span>
              <span className="font-mono text-[11px] text-slate-400">{financials.collectionVelocity}% Velocity</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-slate-600 truncate">Tata Steel Kalinga Phase 2</span>
              <button
                onClick={() => onSelectTab("proof-vault")}
                className="text-[#D6135F] font-bold hover:underline"
              >
                Track &rarr;
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Active Pipeline Value */}
        <Card className="border-l-4 border-l-[#F0186C] border-slate-200/80 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500">Enterprise Pipeline</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-[#D6135F]">
              <Sparkles className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-slate-900 font-mono">₹68,50,000</div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
              <span className="text-[#D6135F] font-semibold">{hotLeadsCount} Hot Leads (Score &gt; 90)</span>
              <span className="font-mono text-[11px] text-slate-400">6 Active Deals</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-slate-600 truncate">Dubai Logistics + Jaipur Hotels</span>
              <button
                onClick={() => onSelectTab("deals")}
                className="text-[#D6135F] font-bold hover:underline"
              >
                Pipeline &rarr;
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-Time AI Attention Matrix */}
      <Card className="border-slate-200/80 bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-[#D6135F]">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-slate-900">Real-Time AI Attention Matrix</CardTitle>
              <CardDescription className="text-xs text-slate-500">
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
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 transition hover:border-rose-300 hover:bg-rose-50/30"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                      item.severity === "critical"
                        ? "bg-[#F0186C] animate-pulse"
                        : item.severity === "high"
                        ? "bg-amber-500"
                        : "bg-[#D6135F]"
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
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
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-3xl">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onSelectTab(mappedModule)}
                    className="border-slate-200 bg-white text-slate-700 hover:text-[#D6135F]"
                  >
                    {item.actionLabel}
                    <ArrowUpRight className="h-3 w-3 text-[#D6135F]" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onResolveAttentionItem(item.id)}
                    title="Mark resolved"
                    className="text-slate-400 hover:text-emerald-600"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}

          {attentionItems.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-500">
              ✨ All critical items resolved. Operational health is at 100%.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active High-Impact Projects Health Grid */}
      <Card className="border-slate-200/80 bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <CardTitle className="text-sm font-bold text-slate-900">High-Impact Project Deployments</CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Live engineering telemetry across active heavy industry and institutional clients.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectTab("proof-vault")}
            className="text-xs border-slate-200 bg-white text-slate-700 hover:text-[#D6135F]"
          >
            View Discussion Vault &rarr;
          </Button>
        </CardHeader>
        <CardContent className="pt-2">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="text-slate-600">Project &amp; Client</TableHead>
                <TableHead className="text-slate-600">Category</TableHead>
                <TableHead className="text-slate-600">Health Status</TableHead>
                <TableHead className="text-slate-600">Progress</TableHead>
                <TableHead className="text-slate-600">Deal Value</TableHead>
                <TableHead className="text-slate-600">Lead Engineer</TableHead>
                <TableHead className="text-slate-600">Next Milestone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((proj) => (
                <TableRow key={proj.id} className="border-slate-100 hover:bg-slate-50/70">
                  <TableCell>
                    <div className="font-bold text-slate-900">{proj.name}</div>
                    <div className="text-[11px] text-slate-500">{proj.client}</div>
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
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#D6135F] to-[#F0186C]"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-slate-700">{proj.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono font-bold text-slate-900">{proj.dealValue}</TableCell>
                  <TableCell className="text-xs text-slate-600">{proj.leadEngineer}</TableCell>
                  <TableCell>
                    <div className="text-[11px] font-medium text-slate-900">{proj.nextMilestone}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="h-2.5 w-2.5 text-slate-400" />
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
