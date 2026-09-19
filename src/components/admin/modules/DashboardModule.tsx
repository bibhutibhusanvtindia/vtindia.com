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
  ArrowRight,
  Activity,
  Check,
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
  PipelineDeal,
  SubscriptionItem,
} from "@/data/admin/types";
import {
  RevenueTrendChart,
  SectorPipelinePieChart,
  PipelineFunnelChart,
  LeadSourcePieChart,
  OperationalHealthGauges,
} from "@/components/admin/charts";

export function DashboardModule({
  financials,
  projects = [],
  attentionItems = [],
  socialLeads = [],
  prospects = [],
  deals = [],
  subscriptions = [],
  onSelectTab,
  onResolveAttentionItem,
}: {
  financials: FinancialMetrics;
  projects: ProjectHealth[];
  attentionItems: AttentionItem[];
  socialLeads: SocialLead[];
  prospects: ProspectItem[];
  deals?: PipelineDeal[];
  subscriptions?: SubscriptionItem[];
  onSelectTab: (tab: string) => void;
  onResolveAttentionItem: (id: string) => void;
}) {
  const hotLeadsCount = socialLeads.filter((l) => l.qualificationScore >= 90).length;
  const pipelineTotal = deals.reduce((sum, d) => sum + d.dealValue, 0) || financials.totalPipelineValue;

  const displayRevenue = financials.monthlyRevenue > 0 ? `₹${financials.monthlyRevenue.toLocaleString("en-IN")}` : "₹0";
  const displayTarget = financials.targetRevenue > 0 ? `Target: ₹${(financials.targetRevenue / 100000).toFixed(1)}L` : "Target: Baseline";
  const displayReceivables = financials.overdueReceivables > 0 ? `₹${financials.overdueReceivables.toLocaleString("en-IN")}` : "₹0";
  const displayPipeline = pipelineTotal > 0 ? `₹${pipelineTotal.toLocaleString("en-IN")}` : "₹0";

  return (
    <div className="space-y-6">
      {/* 4 Core Financial & Operations Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Monthly Revenue */}
        <div className="group relative overflow-hidden rounded-3xl border border-pink-100 bg-white p-5 shadow-xs hover:border-pink-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D6135F] to-[#F0186C]" />
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Monthly Revenue</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#D6135F] border border-pink-200/70 shadow-xs group-hover:scale-110 transition-transform">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-black tracking-tight text-slate-900 font-mono mt-1">{displayRevenue}</div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              <TrendingUp className="mr-1 h-3.5 w-3.5" />
              +{financials.momGrowth}% MoM
            </span>
            <span className="font-mono text-[11px] text-slate-500 font-medium">{displayTarget}</span>
          </div>
          {/* Progress bar */}
          <div className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#D6135F] via-[#F0186C] to-[#FF4D8D] transition-all duration-500"
              style={{
                width: `${financials.targetRevenue > 0 ? Math.min(100, (financials.monthlyRevenue / financials.targetRevenue) * 100) : 0}%`,
              }}
            />
          </div>
        </div>

        {/* Active Projects */}
        <div className="group relative overflow-hidden rounded-3xl border border-pink-100 bg-white p-5 shadow-xs hover:border-pink-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D6135F] to-[#F0186C]" />
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Deployments</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#D6135F] border border-pink-200/70 shadow-xs group-hover:scale-110 transition-transform">
              <Layers className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-black tracking-tight text-slate-900 font-mono mt-1">
            {projects.length} {projects.length === 1 ? "System" : "Systems"}
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
            <span className="font-semibold text-slate-700">{projects.length} Active Deployments</span>
            <span className="inline-flex items-center rounded-lg bg-pink-50 px-2 py-0.5 text-[10px] font-bold text-[#D6135F] border border-pink-200">
              100% On-Time
            </span>
          </div>
          <div className="mt-3.5 flex items-center gap-1.5 text-[11px] text-slate-600 font-medium truncate">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{projects.length > 0 ? projects.map((p) => p.client).slice(0, 3).join(" · ") : "Zero active client blockers"}</span>
          </div>
        </div>

        {/* Overdue Receivables */}
        <div className="group relative overflow-hidden rounded-3xl border border-pink-100 bg-white p-5 shadow-xs hover:border-pink-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overdue Receivables</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 text-amber-700 border border-amber-200 shadow-xs group-hover:scale-110 transition-transform">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-black tracking-tight text-amber-700 font-mono mt-1">{displayReceivables}</div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
            <span
              className={
                financials.overdueReceivables > 0
                  ? "text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200"
                  : "text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200"
              }
            >
              {financials.overdueReceivables > 0 ? "In Recovery" : "0 Overdue Invoices"}
            </span>
            <span className="font-mono text-[11px] text-slate-500">{financials.collectionVelocity}% Velocity</span>
          </div>
          <div className="mt-3.5 flex items-center justify-between text-[11px]">
            <span className="text-slate-700 font-medium truncate">
              {financials.overdueReceivables > 0 ? "Outstanding balance pending" : "All accounts cleared"}
            </span>
            <button
              onClick={() => onSelectTab("proof-vault")}
              className="text-[#D6135F] font-bold hover:underline inline-flex items-center gap-0.5"
            >
              Vault <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Active Pipeline Value */}
        <div className="group relative overflow-hidden rounded-3xl border border-pink-100 bg-white p-5 shadow-xs hover:border-pink-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D6135F] via-[#F0186C] to-[#FF4D8D]" />
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Enterprise Pipeline</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#D6135F] border border-pink-200/70 shadow-xs group-hover:scale-110 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-black tracking-tight text-slate-900 font-mono mt-1">{displayPipeline}</div>
          <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
            <span className="text-[#D6135F] font-bold bg-pink-50 px-2 py-0.5 rounded-lg border border-pink-200">
              {hotLeadsCount} Inbound Leads
            </span>
            <span className="font-mono text-[11px] text-slate-500 font-medium">{deals.length} Active Deals</span>
          </div>
          <div className="mt-3.5 flex items-center justify-between text-[11px]">
            <span className="text-slate-700 font-medium truncate">{deals.length > 0 ? `${deals[0].company}` : "Ready for opportunities"}</span>
            <button
              onClick={() => onSelectTab("deals")}
              className="text-[#D6135F] font-bold hover:underline inline-flex items-center gap-0.5"
            >
              Pipeline <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Executive Visual Analytics & Telemetry Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <RevenueTrendChart financials={financials} />
        </div>
        <div className="lg:col-span-5">
          <SectorPipelinePieChart deals={deals} onSelectSector={() => onSelectTab("deals")} />
        </div>
      </div>

      {/* Conversion Funnel & Inbound Channel Share Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PipelineFunnelChart deals={deals} />
        <LeadSourcePieChart leads={socialLeads} />
      </div>

      {/* Operational Velocity & Health Radial Gauges */}
      <OperationalHealthGauges
        financials={financials}
        projects={projects}
        socialLeads={socialLeads}
        attentionItems={attentionItems}
      />

      {/* Real-Time AI Attention Matrix */}
      <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
        <div className="flex flex-row items-center justify-between pb-4 border-b border-pink-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 text-[#D6135F] border border-pink-200">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Real-Time AI Attention Matrix</h3>
              <p className="text-xs text-slate-500">
                High-priority blockers and revenue opportunities surfaced by the Virtoy intelligence agent.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-rose-200">
            <span className="h-2 w-2 rounded-full bg-[#F0186C]" />
            {attentionItems.length} Urgent Items
          </span>
        </div>

        <div className="pt-4 space-y-3">
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
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 transition-all hover:border-pink-300 hover:bg-pink-50/30 hover:shadow-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                      item.severity === "critical"
                        ? "bg-[#F0186C] ring-4 ring-rose-100 animate-pulse"
                        : item.severity === "high"
                        ? "bg-amber-500 ring-4 ring-amber-100"
                        : "bg-[#D6135F] ring-4 ring-pink-100"
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                      <span
                        className={`uppercase text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                          item.severity === "critical"
                            ? "bg-rose-50 text-[#D6135F] border-rose-200"
                            : item.severity === "high"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {item.severity}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-3xl">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onSelectTab(mappedModule)}
                    className="border-2 border-pink-200 bg-white text-[#D6135F] hover:bg-[#F0186C] hover:text-white hover:border-[#F0186C] font-bold text-xs gap-1 px-3 py-1.5 rounded-xl transition-all shadow-xs"
                  >
                    {item.actionLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onResolveAttentionItem(item.id)}
                    title="Mark resolved"
                    className="text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}

          {attentionItems.length === 0 && (
            <div className="p-8 text-center text-xs font-semibold text-emerald-700 bg-emerald-50/50 rounded-2xl border border-emerald-200">
              ✨ All systems operational. Zero critical attention items.
            </div>
          )}
        </div>
      </div>

      {/* Active High-Impact Projects Health Grid */}
      <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
        <div className="flex flex-row items-center justify-between pb-4 border-b border-pink-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">High-Impact Project Deployments</h3>
            <p className="text-xs text-slate-500">
              Live engineering telemetry across active heavy industry and institutional clients.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectTab("proof-vault")}
            className="text-xs font-bold border-2 border-pink-200 bg-white text-[#D6135F] hover:bg-pink-50 hover:border-[#F0186C] rounded-xl"
          >
            View Discussion Vault &rarr;
          </Button>
        </div>
        <div className="pt-2 overflow-x-auto">
          {projects.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-medium bg-pink-50/20 rounded-2xl border border-dashed border-pink-200">
              No active project deployments logged yet. Convert deals to register new client deployments.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-pink-100 bg-pink-50/30">
                  <TableHead className="text-slate-700 font-bold">Project &amp; Client</TableHead>
                  <TableHead className="text-slate-700 font-bold">Category</TableHead>
                  <TableHead className="text-slate-700 font-bold">Health Status</TableHead>
                  <TableHead className="text-slate-700 font-bold">Progress</TableHead>
                  <TableHead className="text-slate-700 font-bold">Deal Value</TableHead>
                  <TableHead className="text-slate-700 font-bold">Lead Engineer</TableHead>
                  <TableHead className="text-slate-700 font-bold">Next Milestone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((proj) => (
                  <TableRow key={proj.id} className="border-slate-100 hover:bg-pink-50/20 transition-colors">
                    <TableCell>
                      <div className="font-bold text-slate-900">{proj.name}</div>
                      <div className="text-[11px] text-[#D6135F] font-semibold">{proj.client}</div>
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
                        className="uppercase font-mono font-bold"
                      >
                        {proj.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#D6135F] to-[#F0186C]"
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-slate-700">{proj.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono font-bold text-slate-900">{proj.dealValue}</TableCell>
                    <TableCell className="text-xs text-slate-700 font-medium">{proj.leadEngineer}</TableCell>
                    <TableCell>
                      <div className="text-[11px] font-semibold text-slate-900">{proj.nextMilestone}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3 text-[#D6135F]" />
                        Due {proj.dueDate}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
