"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline" | "indigo" | "amber" | "cyan" | "emerald" | "brand";
  size?: "default" | "sm" | "xs";
}

export function Badge({ className, variant = "default", size = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-[#F0186C]/15 text-[#FF4D8D] border-[#F0186C]/30",
    brand: "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white border-transparent shadow-sm shadow-[#F0186C]/25",
    secondary: "bg-[#1F101A] text-slate-300 border-[#3D1E30]",
    success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    destructive: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    outline: "bg-transparent text-slate-300 border-[#3D1E30]",
    indigo: "bg-[#F0186C]/15 text-[#FF4D8D] border-[#F0186C]/30",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    cyan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
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
