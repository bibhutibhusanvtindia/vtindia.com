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
  LogOut,
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
  onResetData,
  onLogout,
}: {
  onOpenMobileSidebar: () => void;
  currentEmployee: Employee;
  onOpenEmployeeSwitcher: () => void;
  attentionItems: AttentionItem[];
  onSelectTab: (tabId: string) => void;
  onResolveAttentionItem: (id: string) => void;
  onResetData?: () => void;
  onLogout?: () => void;
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
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-pink-100/90 bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8 shadow-xs">
      {/* Left: Mobile Menu + Search / Command Bar */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenMobileSidebar}
          className="flex h-9 w-9 p-0 text-slate-500 hover:bg-pink-50 hover:text-[#D6135F] lg:hidden rounded-xl"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Global Search / Command Bar Trigger */}
        <button
          onClick={() => onSelectTab("chief-of-staff")}
          className="hidden sm:flex items-center gap-2 rounded-xl border border-pink-200/80 bg-pink-50/40 px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:border-[#F0186C] hover:bg-white transition-all shadow-2xs group"
        >
          <Search className="h-3.5 w-3.5 text-[#D6135F] group-hover:scale-110 transition-transform" />
          <span>Ask AI Chief of Staff or search commands...</span>
          <kbd className="ml-4 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#D6135F] border border-pink-200 shadow-2xs">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right: Telemetry + Quick Actions + Notifications + Profile */}
      <div className="flex items-center gap-3">
        {/* Live IST Telemetry */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50/70 px-3 py-1 text-xs shadow-2xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F0186C] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F0186C]" />
          </span>
          <span className="text-[11px] font-mono font-bold text-slate-800">
            {timeStr ? `${timeStr} IST` : "Live Systems"}
          </span>
        </div>

        {/* Quick Action: Ask AI Chief of Staff */}
        <Button
          size="sm"
          onClick={() => onSelectTab("chief-of-staff")}
          className="hidden sm:inline-flex bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white text-xs gap-1.5 shadow-md shadow-[#F0186C]/25 font-bold rounded-xl px-3.5 py-2 hover:scale-[1.02] transition-all"
        >
          <Sparkles className="h-3.5 w-3.5 text-rose-100" />
          <span>Ask AI</span>
        </Button>

        {/* Reset Store Data Button */}
        {onResetData && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm("Are you sure you want to refresh all workspace records to initial operational data?")) {
                onResetData();
              }
            }}
            className="hidden sm:inline-flex h-9 w-9 p-0 text-slate-500 hover:bg-pink-50 hover:text-[#D6135F] rounded-xl transition-colors"
            title="Refresh Operational Data"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}

        {/* Attention Notifications Dropover */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className="relative h-9 w-9 p-0 text-slate-600 hover:bg-pink-50 hover:text-[#D6135F] rounded-xl transition-colors"
            title="Attention Alerts"
          >
            <Bell className="h-4 w-4" />
            {attentionItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F0186C] text-[9px] font-bold text-white font-mono shadow-sm animate-pulse">
                {attentionItems.length}
              </span>
            )}
          </Button>

          {/* Notifications Dropdown Card */}
          {notificationsOpen && (
            <div className="absolute right-0 top-11 z-50 w-80 sm:w-96 rounded-3xl border-2 border-pink-200 bg-white p-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-pink-100 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-[#D6135F]" />
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
                    className="rounded-2xl border border-pink-100 bg-pink-50/30 p-3 transition-colors hover:border-[#F0186C] hover:bg-pink-50/70"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900 text-[11px] leading-tight">
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
                    <p className="mt-1 text-[10px] text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between pt-1 border-t border-pink-100/60 text-[10px]">
                      <button
                        onClick={() => {
                          setNotificationsOpen(false);
                          onSelectTab(
                            item.actionModule === "vault"
                              ? "proof-vault"
                              : item.actionModule === "social_leads"
                              ? "social-leads"
                              : item.actionModule === "subscriptions"
                              ? "subscriptions"
                              : item.actionModule || "dashboard"
                          );
                        }}
                        className="font-bold text-[#D6135F] hover:underline"
                      >
                        {item.actionLabel} &rarr;
                      </button>
                      <button
                        onClick={() => onResolveAttentionItem(item.id)}
                        className="text-slate-400 hover:text-emerald-700 font-medium"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Role Avatar */}
        <button
          onClick={onOpenEmployeeSwitcher}
          className="flex items-center gap-2 rounded-2xl border border-pink-200 bg-pink-50/40 p-1 pr-2.5 transition-all hover:border-[#F0186C] hover:bg-pink-50 hover:shadow-xs"
        >
          <Avatar name={currentEmployee.name} src={currentEmployee.avatar} size="xs" />
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[11px] font-bold text-slate-900 leading-none">
              {currentEmployee.name.split(" ")[0]}
            </span>
            <span className="text-[9px] font-bold text-[#D6135F] uppercase font-mono">
              {currentEmployee.role}
            </span>
          </div>
        </button>

        {/* Quick Logout Button */}
        {onLogout && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="h-9 w-9 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            title="Log out to public website"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
