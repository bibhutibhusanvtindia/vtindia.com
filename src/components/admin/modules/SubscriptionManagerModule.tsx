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
import { SubscriptionSpendChart } from "@/components/admin/charts";

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
      <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200/90 bg-gradient-to-br from-white via-[#FFF5F8] to-[#FCE7F3]/70 p-6 sm:p-7 shadow-sm">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-[#F0186C]/15 to-[#FF4D8D]/5 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-sm shadow-[#F0186C]/25">
                <CreditCard className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                AI Software &amp;{" "}
                <span className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] bg-clip-text text-transparent">
                  Subscription Manager
                </span>
              </h2>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
                Smart Countdown
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Track Claude Pro, Antigravity Pro, AWS Cloud, GitHub, and Google Workspace with AI seat rationalization &amp; cost savings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-2xl border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-800 shadow-2xs">
              ⚠️ {expiringSoonCount} Auto-Renewing in &le; 7 Days
            </span>
          </div>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Monthly SaaS Spend</span>
          <div className="text-3xl font-black tracking-tight text-slate-900 font-mono mt-1">
            ${totalMonthlySpend} <span className="text-xs font-bold text-slate-500">/ mo (₹{Math.round(totalMonthlySpend * 83).toLocaleString("en-IN")})</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 font-medium">Across 7 mission-critical developer &amp; AI tools</p>
        </div>

        <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Cost Savings Identified</span>
            <PiggyBank className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black tracking-tight text-emerald-700 font-mono mt-1">
            ₹1,53,600 <span className="text-xs font-bold text-slate-500">/ year</span>
          </div>
          <p className="mt-1 text-xs text-emerald-700 font-bold">
            Via Claude seat rationalization &amp; AWS Reserved Nodes
          </p>
        </div>

        <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-xs hover:border-pink-300 hover:shadow-md transition-all">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Urgent Renewal Countdown</span>
          <div className="text-3xl font-black tracking-tight text-amber-700 font-mono mt-1">
            3 Days Left
          </div>
          <p className="mt-1 text-xs text-slate-500 truncate font-medium">
            Claude Pro Team Plan ($200/mo) renews Sep 21
          </p>
        </div>
      </div>

      {/* SaaS & AI Cloud Spend Distribution Chart */}
      <SubscriptionSpendChart subscriptions={subscriptions} />

      {/* Subscriptions Table with Smart Countdown & AI Optimizer */}
      <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
        <div className="flex flex-row items-center justify-between pb-4 border-b border-pink-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Subscriptions &amp; AI Tools</h3>
            <p className="text-xs text-slate-500">Live seat utilization, renewal countdowns, and automated cost optimization recommendations.</p>
          </div>
        </div>
        <div className="pt-2 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-pink-100 bg-pink-50/30">
                <TableHead className="text-slate-700 font-bold">Tool &amp; Provider</TableHead>
                <TableHead className="text-slate-700 font-bold">Category</TableHead>
                <TableHead className="text-slate-700 font-bold">Monthly Cost</TableHead>
                <TableHead className="text-slate-700 font-bold">Renewal Countdown</TableHead>
                <TableHead className="text-slate-700 font-bold">Seats (Active / Total)</TableHead>
                <TableHead className="text-slate-700 font-bold">AI Cost Optimization</TableHead>
                <TableHead className="text-right text-slate-700 font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => {
                const isClaude = sub.name.includes("Claude");
                const hasInactiveSeats = sub.seatCount > sub.activeSeats;

                return (
                  <TableRow key={sub.id} className="border-slate-100 hover:bg-pink-50/20 transition-colors">
                    <TableCell>
                      <div className="font-bold text-slate-900">{sub.name}</div>
                      <div className="text-[11px] text-[#D6135F] font-semibold">{sub.provider}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" size="xs" className="uppercase font-bold">
                        {sub.category.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono font-black text-slate-900">
                      ${sub.costPerMonth} <span className="text-[10px] text-slate-500 font-normal">/mo</span>
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
                          className="font-mono flex items-center gap-1 font-bold"
                        >
                          <Clock className="h-2.5 w-2.5" />
                          {sub.daysUntilRenewal}d left
                        </Badge>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{sub.nextRenewalDate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="font-mono font-black text-slate-900">{sub.activeSeats}</span>
                        <span className="text-slate-400">/</span>
                        <span className="font-mono text-slate-500 font-semibold">{sub.seatCount} seats</span>
                      </div>
                      {hasInactiveSeats && (
                        <div className="text-[10px] font-bold text-amber-700">
                          {sub.seatCount - sub.activeSeats} inactive seat(s)
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-[11px] text-slate-700 leading-relaxed font-medium">{sub.optimizationTip}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      {isClaude && hasInactiveSeats ? (
                        <Button
                          variant="emerald"
                          size="xs"
                          onClick={() => handleOptimizeClaude(sub.id)}
                          disabled={optimizingSubId === sub.id}
                          className="rounded-xl font-bold shadow-xs"
                        >
                          <Sparkles className="h-3 w-3" />
                          <span>{optimizingSubId === sub.id ? "Optimizing..." : "Save $50/mo"}</span>
                        </Button>
                      ) : (
                        <span className="inline-block text-[10px] font-bold text-emerald-700 border border-emerald-300 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          ✓ Optimized
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
