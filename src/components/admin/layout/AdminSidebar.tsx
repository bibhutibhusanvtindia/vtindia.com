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
  LogOut,
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
  onLogout,
}: {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  currentEmployee: Employee;
  onOpenEmployeeSwitcher: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onLogout?: () => void;
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-pink-100/90 bg-white text-slate-800 transition-all duration-300 ease-in-out shadow-xs",
          collapsed ? "w-20" : "w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-pink-100 px-4 bg-white">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-50/80 border border-pink-200/80 shadow-xs">
              <Logo variant="primary" className="h-6 w-auto" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black tracking-tight text-slate-900">VIRTOY</span>
                  <span className="rounded-md bg-gradient-to-r from-[#D6135F] to-[#F0186C] px-1.5 py-0.5 text-[9px] font-extrabold text-white font-mono shadow-xs">
                    COMMAND
                  </span>
                </div>
                <span className="text-[10px] text-[#D6135F] font-bold leading-none mt-0.5">
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
            className="hidden h-7 w-7 p-0 text-slate-400 hover:bg-pink-50 hover:text-[#D6135F] lg:flex rounded-lg"
            title={collapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>

          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="xs"
            onClick={onCloseMobile}
            className="flex h-7 w-7 p-0 text-slate-400 hover:bg-pink-50 hover:text-[#D6135F] lg:hidden rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Item Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.groupTitle} className="space-y-1">
              {!collapsed && (
                <span className="px-2 text-[10px] font-black uppercase tracking-wider text-[#D6135F]">
                  {group.groupTitle}
                </span>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-[#F0186C] via-[#E01563] to-[#D6135F] text-white font-bold shadow-md shadow-[#F0186C]/25 scale-[1.02]"
                          : "text-slate-700 hover:bg-pink-50/70 hover:text-[#D6135F]"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
                          isActive ? "text-white" : "text-slate-400 group-hover:text-[#D6135F]"
                        )}
                      />

                      {!collapsed && (
                        <span className="flex-1 text-left truncate">{item.label}</span>
                      )}

                      {!collapsed && item.badge && (
                        <Badge
                          variant={isActive ? "secondary" : item.badgeVariant || "default"}
                          size="xs"
                          className={cn(
                            "shrink-0 font-mono font-bold",
                            isActive ? "bg-white/20 text-white border-white/30" : ""
                          )}
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
        <div className="border-t border-pink-100 p-3 bg-white">
          {!collapsed ? (
            <div className="space-y-2">
              <div
                onClick={onOpenEmployeeSwitcher}
                className="group flex cursor-pointer items-center justify-between rounded-2xl border border-pink-200/80 bg-pink-50/30 p-2.5 transition-all hover:border-[#F0186C] hover:bg-pink-50/80 hover:shadow-xs"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Avatar name={currentEmployee.name} src={currentEmployee.avatar} size="sm" />
                  <div className="flex flex-col text-left truncate">
                    <span className="text-xs font-bold text-slate-900 truncate group-hover:text-[#D6135F]">
                      {currentEmployee.name}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate leading-tight">
                      {currentEmployee.title}
                    </span>
                  </div>
                </div>

                <Badge variant="brand" size="xs" className="uppercase shrink-0 font-mono font-bold">
                  {currentEmployee.role}
                </Badge>
              </div>

              <div className="flex items-center justify-between px-1 text-[11px] pt-1">
                <button
                  onClick={onOpenEmployeeSwitcher}
                  className="flex items-center gap-1 font-bold text-slate-600 hover:text-[#D6135F] transition-colors"
                >
                  <Users className="h-3.5 w-3.5 text-[#D6135F]" />
                  <span>Switch Role</span>
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-1 font-semibold text-slate-500 hover:text-[#D6135F] transition-colors"
                  >
                    <span>Site</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                  {onLogout && (
                    <button
                      onClick={onLogout}
                      title="Log out to public site"
                      className="flex items-center gap-0.5 font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-1.5 py-0.5 rounded-md transition-colors"
                    >
                      <LogOut className="h-3 w-3" />
                      <span>Exit</span>
                    </button>
                  )}
                </div>
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
                <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#F0186C] border-2 border-white" />
              </button>
              <Link
                href="/"
                target="_blank"
                title="Public Site"
                className="text-slate-400 hover:text-[#D6135F] p-1 rounded-lg"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
              {onLogout && (
                <button
                  onClick={onLogout}
                  title="Logout / Exit Command Center"
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
