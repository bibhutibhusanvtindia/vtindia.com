"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline" | "indigo" | "amber" | "cyan" | "emerald";
  size?: "default" | "sm" | "xs";
}

export function Badge({ className, variant = "default", size = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-surface-muted text-foreground border-border",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    outline: "bg-transparent text-foreground border-border",
    indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    amber: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
    cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  }[variant];

  const sizeStyles = {
    default: "px-2.5 py-0.5 text-[11px] font-semibold rounded-full",
    sm: "px-2 py-0.5 text-[10px] font-semibold rounded-full",
    xs: "px-1.5 py-0.2 text-[9px] font-semibold rounded",
  }[size];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantStyles,
        sizeStyles,
        className
      )}
      {...props}
    />
  );
}
