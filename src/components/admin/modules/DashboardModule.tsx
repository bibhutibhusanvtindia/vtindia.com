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
      {/* Top Banner: Ganesh Chaturthi AI Executive Commitment */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-surface to-indigo-500/10 p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 items-center rounded-full bg-primary/20 px-2.5 text-[10px] font-bold text-primary">
                ✨ EXECUTIVE AI ENGINE
              </span>
              <span className="text-[11px] font-semibold text-muted">Virtoy Executive Command Center</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
              AI Executive Command Center &amp; B2B Growth Platform
            </h2>
            <p className="text-xs text-muted max-w-2xl leading-relaxed">
              Single-screen operational visibility: Real-time revenue telemetry, AI chief of staff assistant, social lead capture, and B2B map prospecting.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="indigo"
              size="sm"
              onClick={() => onSelectTab("chief_of_staff")}
              className="shadow-sm"
            >
              <Bot className="h-3.5 w-3.5" />
              Ask AI Chief of Staff
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectTab("briefing")}
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              1-Click Briefing
            </Button>
          </div>
        </div>
      </div>

      {/* 4 Core Financial & Operations Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Monthly Revenue */}
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted">Monthly Revenue (Sep)</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">₹24,80,000</div>
            <div className="mt-1 flex items-center justify-between text-xs text-muted">
              <span className="flex items-center text-emerald-600 font-semibold">
                <TrendingUp className="mr-1 h-3.5 w-3.5" />
                +{financials.momGrowth}% MoM
              </span>
              <span className="font-mono text-[11px]">Target: ₹30.0L</span>
            </div>
            {/* Progress bar */}
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${(financials.monthlyRevenue / financials.targetRevenue) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted">Active Deployments</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Layers className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">12 Systems</div>
            <div className="mt-1 flex items-center justify-between text-xs text-muted">
              <span>6 High-Impact Enterprise</span>
              <Badge variant="default" size="xs">
                91% On-Time
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted truncate">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span>Tata Steel · Krushi Odisha · OMSA</span>
            </div>
          </CardContent>
        </Card>

        {/* Overdue Receivables */}
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted">Overdue Receivables</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">₹4,20,000</div>
            <div className="mt-1 flex items-center justify-between text-xs text-muted">
              <span className="text-amber-600 font-semibold">1 Invoice &gt; 14 Days</span>
              <span className="font-mono text-[11px]">{financials.collectionVelocity}% Velocity</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-muted truncate">Tata Steel Kalinga Phase 2</span>
              <button
                onClick={() => onSelectTab("vault")}
                className="text-primary font-bold hover:underline"
              >
                Track &rarr;
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Active Pipeline Value */}
        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted">Enterprise Pipeline</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
              <Sparkles className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight text-foreground">₹68,50,000</div>
            <div className="mt-1 flex items-center justify-between text-xs text-muted">
              <span className="text-indigo-600 font-semibold">{hotLeadsCount} Hot Leads (Score &gt; 90)</span>
              <span className="font-mono text-[11px]">5 Channels</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-muted truncate">Dubai Logistics + Jaipur Hotels</span>
              <button
                onClick={() => onSelectTab("social_leads")}
                className="text-primary font-bold hover:underline"
              >
                Qualify &rarr;
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-Time AI Attention Matrix */}
      <Card className="border-amber-500/30 bg-surface">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/70">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm">Real-Time AI Attention Matrix</CardTitle>
              <CardDescription>
                High-priority blockers and revenue opportunities surfaced by the Virtoy intelligence agent.
              </CardDescription>
            </div>
          </div>
          <Badge variant="amber" size="sm">
            {attentionItems.length} Urgent Items
          </Badge>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          {attentionItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border/80 bg-surface-muted/50 p-3.5 transition hover:border-border"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                    item.severity === "critical"
                      ? "bg-destructive animate-pulse"
                      : item.severity === "high"
                      ? "bg-amber-500"
                      : "bg-primary"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                    <Badge
                      variant={
                        item.severity === "critical"
                          ? "destructive"
                          : item.severity === "high"
                          ? "warning"
                          : "default"
                      }
                      size="xs"
                      className="uppercase text-[9px]"
                    >
                      {item.severity}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted leading-relaxed max-w-3xl">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => onSelectTab(item.actionModule)}
                >
                  {item.actionLabel}
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onResolveAttentionItem(item.id)}
                  title="Mark resolved"
                  className="text-muted hover:text-emerald-600"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}

          {attentionItems.length === 0 && (
            <div className="p-6 text-center text-xs text-muted">
              ✨ All critical items resolved. Operational health is at 100%.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active High-Impact Projects Health Grid */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm">High-Impact Project Deployments</CardTitle>
            <CardDescription>Live engineering telemetry across active heavy industry and institutional clients.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => onSelectTab("vault")}>
            View Discussion Vault &rarr;
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project &amp; Client</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Health Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Deal Value</TableHead>
                <TableHead>Lead Engineer</TableHead>
                <TableHead>Next Milestone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((proj) => (
                <TableRow key={proj.id}>
                  <TableCell>
                    <div className="font-bold text-foreground">{proj.name}</div>
                    <div className="text-[11px] text-muted">{proj.client}</div>
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
                          ? "default"
                          : proj.status === "at_risk"
                          ? "warning"
                          : "destructive"
                      }
                      size="xs"
                      className="uppercase"
                    >
                      {proj.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-semibold">{proj.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono font-bold text-foreground">{proj.dealValue}</TableCell>
                  <TableCell className="text-xs text-muted">{proj.leadEngineer}</TableCell>
                  <TableCell>
                    <div className="text-[11px] font-medium text-foreground">{proj.nextMilestone}</div>
                    <div className="text-[10px] text-muted flex items-center gap-1 mt-0.5">
                      <Clock className="h-2.5 w-2.5" />
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
