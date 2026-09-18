"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Bot,
  ExternalLink,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  RefreshCw,
  Shield,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Avatar } from "@/components/admin/ui/Avatar";
import { Logo } from "@/components/ui/Logo";
import { Employee } from "@/data/admin/types";

export function AdminHeader({
  currentEmployee,
  onOpenEmployeeSwitcher,
  onResetData,
  activeTab,
  onSelectTab,
}: {
  currentEmployee: Employee;
  onOpenEmployeeSwitcher: () => void;
  onResetData: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}) {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-IN", {
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
    <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand + Environment Badge */}
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-3">
            <Logo variant="primary" className="h-8 w-auto" />
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold tracking-tight text-foreground">AI Executive Command</span>
                <span className="rounded bg-primary/15 px-1.5 py-0.2 text-[9px] font-bold text-primary font-mono">
                  B2B PLATFORM
                </span>
              </div>
              <p className="text-[10px] text-muted leading-none mt-0.5">Virtoy Technologies Enterprise Operations</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-border/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium text-muted">
              Live Systems · <span className="text-foreground font-mono">{timeStr} IST</span>
            </span>
          </div>
        </div>

        {/* Right: Actions + Employee Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Quick AI Chief of Staff Button */}
          <Button
            variant={activeTab === "chief_of_staff" ? "indigo" : "outline"}
            size="sm"
            onClick={() => onSelectTab("chief_of_staff")}
            className="hidden sm:inline-flex gap-1.5"
          >
            <Bot className="h-3.5 w-3.5 text-indigo-400" />
            <span>AI Chief of Staff</span>
          </Button>

          {/* Public Site Link */}
          <Link
            href="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium text-muted hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-surface-muted"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>Public Site</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>

          {/* Active Employee Chip */}
          <div
            onClick={onOpenEmployeeSwitcher}
            className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-surface-muted/60 p-1.5 pl-2.5 cursor-pointer hover:border-primary/50 hover:bg-surface-muted transition-all shadow-sm group"
          >
            <div className="text-right hidden sm:block">
              <div className="flex items-center justify-end gap-1.5">
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                  {currentEmployee.name}
                </span>
                <Badge variant="indigo" size="xs" className="uppercase font-mono">
                  {currentEmployee.role}
                </Badge>
              </div>
              <p className="text-[10px] text-muted leading-tight">{currentEmployee.title}</p>
            </div>
            <Avatar
              src={currentEmployee.avatar}
              alt={currentEmployee.name}
              fallback={currentEmployee.name}
              size="sm"
            />
          </div>

          {/* Switch User Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={onOpenEmployeeSwitcher}
            title="Switch Employee Profile"
            className="h-9 w-9 text-muted hover:text-foreground"
          >
            <Users className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
