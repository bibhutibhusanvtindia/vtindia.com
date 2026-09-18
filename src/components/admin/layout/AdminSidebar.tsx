"use client";

import * as React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Bot,
  FileSpreadsheet,
  Inbox,
  Compass,
  Briefcase,
  Zap,
  FolderGit2,
  CreditCard,
  History,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Shield,
  Activity,
  Users,
  Sparkles,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/admin/ui/Badge";
import { Button } from "@/components/admin/ui/Button";
import { Avatar } from "@/components/admin/ui/Avatar";
import { Employee } from "@/data/admin/types";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning" | "destructive" | "indigo" | "amber" | "cyan" | "emerald" | "brand";
}

interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    groupTitle: "Executive Core",
    items: [
      { id: "dashboard", label: "Executive Command", icon: LayoutDashboard, badge: "4 Alert", badgeVariant: "destructive" },
      { id: "chief-of-staff", label: "AI Chief of Staff", icon: Bot, badge: "Voice AI", badgeVariant: "brand" },
      { id: "briefing", label: "1-Click Briefings", icon: FileSpreadsheet },
    ],
  },
  {
    groupTitle: "B2B Growth & Revenue",
    items: [
      { id: "social-leads", label: "Omnichannel Leads", icon: Inbox, badge: "5 New", badgeVariant: "emerald" },
      { id: "prospector", label: "B2B Maps Prospector", icon: Compass },
      { id: "deals", label: "Deal Pipeline Matrix", icon: Briefcase, badge: "₹68.5L", badgeVariant: "brand" },
      { id: "cold-outreach", label: "AI Outreach Studio", icon: Zap },
    ],
  },
  {
    groupTitle: "Operations & Assets",
    items: [
      { id: "proof-vault", label: "Proof & Discussion Vault", icon: FolderGit2, badge: "3 Proofs", badgeVariant: "secondary" },
      { id: "subscriptions", label: "AI & Subscriptions", icon: CreditCard, badge: "Save ₹1.53L", badgeVariant: "emerald" },
      { id: "audit-trail", label: "Multi-Rep Audit Trail", icon: History },
    ],
  },
];

export function AdminSidebar({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  currentEmployee,
  onOpenEmployeeSwitcher,
  mobileOpen,
  onCloseMobile,
}: {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  currentEmployee: Employee;
  onOpenEmployeeSwitcher: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-[#2A1322] bg-[#0C060A]/98 text-slate-100 backdrop-blur-xl transition-all duration-300 ease-in-out shadow-2xl",
          collapsed ? "w-20" : "w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-[#2A1322] px-4 bg-[#10070D]">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1D0A17] border border-[#3D1E30] shadow-inner">
              <Logo variant="primary" className="h-6 w-auto" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black tracking-tight text-white">VIRTOY</span>
                  <span className="rounded bg-[#D6135F]/20 px-1 py-0.2 text-[9px] font-bold text-[#FF4D8D] font-mono">
                    COMMAND
                  </span>
                </div>
                <span className="text-[10px] text-rose-300/70 font-medium leading-none mt-0.5">
                  AI B2B Growth Platform
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <Button
            variant="ghost"
            size="xs"
            onClick={onToggleCollapse}
            className="hidden h-7 w-7 p-0 text-slate-400 hover:bg-[#1E0C18] hover:text-[#FF4D8D] lg:flex"
            title={collapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>

          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="xs"
            onClick={onCloseMobile}
            className="flex h-7 w-7 p-0 text-slate-400 hover:bg-[#1E0C18] hover:text-[#FF4D8D] lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Live System Telemetry Pill (when expanded) */}
        {!collapsed && (
          <div className="mx-3 mt-3 rounded-xl border border-[#2D1625] bg-[#160A13]/80 p-2.5 shadow-inner">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F0186C] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F0186C]" />
                </span>
                <span className="font-semibold text-rose-200">AI Engines Live</span>
              </div>
              <span className="font-mono text-[10px] text-[#FF4D8D]">99.9% Telemetry</span>
            </div>
            <p className="mt-1 text-[10px] text-slate-400 leading-tight">
              Claude 3.7 + Antigravity B2B Scout Synced
            </p>
          </div>
        )}

        {/* Navigation Item Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.groupTitle} className="space-y-1">
              {!collapsed && (
                <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {group.groupTitle}
                </span>
              )}

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-xs font-semibold transition-all",
                        isActive
                          ? "bg-gradient-to-r from-[#D6135F]/20 to-[#F0186C]/10 text-[#FF4D8D] font-bold border border-[#F0186C]/40 shadow-md shadow-[#F0186C]/10"
                          : "text-slate-400 hover:bg-[#1D0C18]/60 hover:text-slate-200"
                      )}
                    >
                      {/* Active Left Indicator Pill with Virtoy Pink Gradient */}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-gradient-to-b from-[#D6135F] to-[#FF4D8D]" />
                      )}

                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive ? "text-[#FF4D8D]" : "text-slate-400 group-hover:text-[#FDA4AF]"
                        )}
                      />

                      {!collapsed && (
                        <span className="flex-1 text-left truncate">{item.label}</span>
                      )}

                      {!collapsed && item.badge && (
                        <Badge
                          variant={item.badgeVariant || "default"}
                          size="xs"
                          className="shrink-0 font-mono font-bold"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom User Profile & Switcher */}
        <div className="border-t border-[#2A1322] p-3 bg-[#10070D]">
          {!collapsed ? (
            <div className="space-y-2">
              <div
                onClick={onOpenEmployeeSwitcher}
                className="group flex cursor-pointer items-center justify-between rounded-xl border border-[#2D1625] bg-[#160A13] p-2 transition-colors hover:border-[#F0186C]/40 hover:bg-[#200E1C]"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Avatar name={currentEmployee.name} src={currentEmployee.avatar} size="sm" />
                  <div className="flex flex-col text-left truncate">
                    <span className="text-xs font-bold text-slate-100 truncate group-hover:text-[#FF4D8D]">
                      {currentEmployee.name}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate leading-tight">
                      {currentEmployee.title}
                    </span>
                  </div>
                </div>

                <Badge variant="brand" size="xs" className="uppercase shrink-0 font-mono">
                  {currentEmployee.role}
                </Badge>
              </div>

              <div className="flex items-center justify-between px-1 text-[11px]">
                <button
                  onClick={onOpenEmployeeSwitcher}
                  className="flex items-center gap-1 text-slate-400 hover:text-[#FF4D8D] transition-colors"
                >
                  <Users className="h-3 w-3" />
                  <span>Switch Role</span>
                </button>

                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <span>Public Site</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={onOpenEmployeeSwitcher}
                title={`Switch Role: Logged in as ${currentEmployee.name} (${currentEmployee.role})`}
                className="group relative"
              >
                <Avatar name={currentEmployee.name} src={currentEmployee.avatar} size="sm" />
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[#F0186C] border-2 border-[#0C060A]" />
              </button>
              <Link
                href="/"
                target="_blank"
                title="Public Site"
                className="text-slate-500 hover:text-slate-300 p-1"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
