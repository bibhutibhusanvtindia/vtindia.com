"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  Volume2,
  VolumeX,
  Plus,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Avatar } from "@/components/admin/ui/Avatar";
import { Employee, AttentionItem } from "@/data/admin/types";
import { cn } from "@/lib/utils";

export function AdminTopBar({
  onOpenMobileSidebar,
  currentEmployee,
  onOpenEmployeeSwitcher,
  attentionItems,
  onSelectTab,
  onResolveAttentionItem,
}: {
  onOpenMobileSidebar: () => void;
  currentEmployee: Employee;
  onOpenEmployeeSwitcher: () => void;
  attentionItems: AttentionItem[];
  onSelectTab: (tabId: string) => void;
  onResolveAttentionItem: (id: string) => void;
}) {
  const [timeStr, setTimeStr] = React.useState<string>("");
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  // Live IST Clock
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8 shadow-xs">
      {/* Left: Mobile Menu + Search / Command Bar */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenMobileSidebar}
          className="flex h-9 w-9 p-0 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Global Search / Command Bar Trigger */}
        <button
          onClick={() => onSelectTab("chief-of-staff")}
          className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-1.5 text-xs text-slate-600 hover:border-[#F0186C]/40 hover:bg-slate-100 transition-colors shadow-xs"
        >
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span>Ask AI Chief of Staff or search commands...</span>
          <kbd className="ml-4 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-500 border border-slate-200 shadow-xs">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right: Telemetry + Quick Actions + Notifications + Profile */}
      <div className="flex items-center gap-3">
        {/* Live IST Telemetry */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50/60 px-3 py-1 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F0186C] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F0186C]" />
          </span>
          <span className="text-[11px] font-mono font-semibold text-slate-800">
            {timeStr ? `${timeStr} IST` : "Live Systems"}
          </span>
        </div>

        {/* Quick Action: Ask AI Chief of Staff */}
        <Button
          size="sm"
          onClick={() => onSelectTab("chief-of-staff")}
          className="hidden sm:inline-flex bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:brightness-105 text-white text-xs gap-1.5 shadow-sm font-semibold"
        >
          <Sparkles className="h-3.5 w-3.5 text-rose-100" />
          <span>Ask AI</span>
        </Button>

        {/* Attention Notifications Dropover */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className="relative h-9 w-9 p-0 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            title="Attention Alerts"
          >
            <Bell className="h-4 w-4" />
            {attentionItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F0186C] text-[9px] font-bold text-white font-mono shadow-sm">
                {attentionItems.length}
              </span>
            )}
          </Button>

          {/* Notifications Dropdown Card */}
          {notificationsOpen && (
            <div className="absolute right-0 top-11 z-50 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Executive Attention Items
                  </h4>
                </div>
                <Badge variant="destructive" size="xs">
                  {attentionItems.length} Urgent
                </Badge>
              </div>

              <div className="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1 text-xs">
                {attentionItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 transition-colors hover:border-rose-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-slate-900 text-[11px] leading-tight">
                        {item.title}
                      </span>
                      <Badge
                        variant={item.severity === "critical" ? "destructive" : "warning"}
                        size="xs"
                        className="uppercase font-mono shrink-0"
                      >
                        {item.severity}
                      </Badge>
                    </div>
                    <p className="mt-1 text-[10px] text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between pt-1">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => {
                          setNotificationsOpen(false);
                          onSelectTab(item.actionModule || "dashboard");
                        }}
                        className="h-5 text-[10px] text-[#D6135F] hover:text-[#F0186C] p-0 font-semibold"
                      >
                        {item.actionLabel} →
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => onResolveAttentionItem(item.id)}
                        className="h-5 text-[10px] text-slate-500 hover:text-emerald-600 p-0"
                      >
                        Mark Done
                      </Button>
                    </div>
                  </div>
                ))}

                {attentionItems.length === 0 && (
                  <div className="py-6 text-center text-xs text-slate-500">
                    <CheckCircle2 className="mx-auto h-6 w-6 text-emerald-500 mb-1" />
                    All attention items resolved!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher Pill */}
        <button
          onClick={onOpenEmployeeSwitcher}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 p-1.5 pr-3 hover:border-rose-200 hover:bg-rose-50/40 transition-colors"
        >
          <Avatar name={currentEmployee.name} src={currentEmployee.avatar} size="xs" />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800 leading-none">
              {currentEmployee.name.split(" ")[0]} {currentEmployee.name.split(" ")[1]?.[0]}.
            </span>
            <span className="text-[9px] font-mono text-[#D6135F] uppercase font-bold leading-none mt-0.5">
              {currentEmployee.role}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}
