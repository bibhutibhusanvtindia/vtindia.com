"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Layers,
  PiggyBank,
  RefreshCw,
  Server,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/ui/Table";
import { SubscriptionItem } from "@/data/admin/types";

export function SubscriptionManagerModule({
  subscriptions,
  onUpdateSeats,
}: {
  subscriptions: SubscriptionItem[];
  onUpdateSeats: (subId: string, seatCount: number, activeSeats: number) => void;
}) {
  const [optimizingSubId, setOptimizingSubId] = useState<string | null>(null);

  const totalMonthlySpend = subscriptions.reduce((sum, s) => sum + s.costPerMonth, 0);
  const expiringSoonCount = subscriptions.filter((s) => s.daysUntilRenewal <= 7).length;

  const handleOptimizeClaude = (subId: string) => {
    setOptimizingSubId(subId);
    setTimeout(() => {
      onUpdateSeats(subId, 6, 6);
      setOptimizingSubId(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-rose-200/70 bg-gradient-to-r from-rose-50/90 via-pink-50/50 to-rose-100/50 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-[#D6135F] shadow-sm">
              <CreditCard className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">AI Software &amp; Subscription Manager</h2>
            <Badge variant="brand" size="xs">
              Smart Renewal Countdown
            </Badge>
          </div>
          <p className="text-xs text-slate-600">
            Track Claude Pro, Antigravity Pro, AWS Cloud, GitHub, and Google Workspace with AI seat rationalization &amp; cost savings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="amber" size="sm">
            {expiringSoonCount} Auto-Renewing in &le; 7 Days
          </Badge>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-l-4 border-l-[#F0186C] border-slate-200/80 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-600">Total Monthly SaaS Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-slate-900 font-mono">
              ${totalMonthlySpend} <span className="text-xs font-normal text-slate-500">/ mo (₹{Math.round(totalMonthlySpend * 83).toLocaleString("en-IN")})</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Across 7 mission-critical developer &amp; AI tools</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 border-slate-200/80 bg-white shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-semibold text-slate-600">AI Cost Savings Identified</CardTitle>
            <PiggyBank className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-emerald-700 font-mono">
              ₹1,53,600 <span className="text-xs font-normal text-slate-500">/ year</span>
            </div>
            <p className="mt-1 text-xs text-emerald-700 font-medium">
              Via Claude seat rationalization &amp; AWS Reserved Nodes
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 border-slate-200/80 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-slate-600">Urgent Renewal Countdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-amber-700 font-mono">
              3 Days Left
            </div>
            <p className="mt-1 text-xs text-slate-500 truncate">
              Claude Pro Team Plan ($200/mo) renews Sep 21
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table with Smart Countdown & AI Optimizer */}
      <Card className="border-slate-200/80 bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <CardTitle className="text-sm font-bold text-slate-900">Active Subscriptions &amp; AI Tools</CardTitle>
            <CardDescription className="text-xs text-slate-500">Live seat utilization, renewal countdowns, and automated cost optimization recommendations.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-100 bg-slate-50/50">
                <TableHead className="text-slate-700 font-semibold">Tool &amp; Provider</TableHead>
                <TableHead className="text-slate-700 font-semibold">Category</TableHead>
                <TableHead className="text-slate-700 font-semibold">Monthly Cost</TableHead>
                <TableHead className="text-slate-700 font-semibold">Renewal Countdown</TableHead>
                <TableHead className="text-slate-700 font-semibold">Seats (Active / Total)</TableHead>
                <TableHead className="text-slate-700 font-semibold">AI Cost Optimization</TableHead>
                <TableHead className="text-right text-slate-700 font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => {
                const isClaude = sub.name.includes("Claude");
                const hasInactiveSeats = sub.seatCount > sub.activeSeats;

                return (
                  <TableRow key={sub.id} className="border-slate-100 hover:bg-slate-50">
                    <TableCell>
                      <div className="font-bold text-slate-900">{sub.name}</div>
                      <div className="text-[11px] text-slate-500">{sub.provider}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" size="xs" className="uppercase">
                        {sub.category.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono font-bold text-slate-900">
                      ${sub.costPerMonth} <span className="text-[10px] text-slate-500">/mo</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Badge
                          variant={
                            sub.daysUntilRenewal <= 3
                              ? "destructive"
                              : sub.daysUntilRenewal <= 7
                              ? "warning"
                              : "brand"
                          }
                          size="xs"
                          className="font-mono flex items-center gap-1"
                        >
                          <Clock className="h-2.5 w-2.5" />
                          {sub.daysUntilRenewal}d left
                        </Badge>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{sub.nextRenewalDate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="font-mono font-bold text-slate-900">{sub.activeSeats}</span>
                        <span className="text-slate-400">/</span>
                        <span className="font-mono text-slate-500">{sub.seatCount} seats</span>
                      </div>
                      {hasInactiveSeats && (
                        <div className="text-[10px] font-semibold text-amber-700">
                          {sub.seatCount - sub.activeSeats} inactive seat(s)
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-[11px] text-slate-700 leading-relaxed">{sub.optimizationTip}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      {isClaude && hasInactiveSeats ? (
                        <Button
                          variant="emerald"
                          size="xs"
                          onClick={() => handleOptimizeClaude(sub.id)}
                          disabled={optimizingSubId === sub.id}
                        >
                          <Sparkles className="h-3 w-3" />
                          <span>{optimizingSubId === sub.id ? "Optimizing..." : "Save $50/mo"}</span>
                        </Button>
                      ) : (
                        <Badge variant="outline" size="xs" className="text-emerald-700 border-emerald-300 bg-emerald-50">
                          ✓ Optimized
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
