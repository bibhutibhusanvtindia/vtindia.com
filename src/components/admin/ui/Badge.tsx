"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline" | "indigo" | "amber" | "cyan" | "emerald" | "brand";
  size?: "default" | "sm" | "xs";
}

export function Badge({ className, variant = "default", size = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-rose-50 text-[#D6135F] border-rose-200 font-semibold",
    brand: "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white border-transparent shadow-xs font-bold",
    secondary: "bg-slate-100 text-slate-700 border-slate-200 font-medium",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold",
    warning: "bg-amber-50 text-amber-800 border-amber-200 font-semibold",
    destructive: "bg-rose-50 text-rose-700 border-rose-200 font-semibold",
    outline: "bg-transparent text-slate-600 border-slate-200 font-medium",
    indigo: "bg-rose-50 text-[#D6135F] border-rose-200 font-semibold",
    amber: "bg-amber-50 text-amber-800 border-amber-200 font-semibold",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-200 font-semibold",
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
