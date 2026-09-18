"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "emerald" | "indigo" | "brand";
  size?: "default" | "sm" | "lg" | "icon" | "xs";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white hover:brightness-105 shadow-sm active:scale-[0.98]",
      brand: "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white hover:brightness-105 shadow-sm active:scale-[0.98]",
      secondary: "bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 active:scale-[0.98]",
      outline: "border border-slate-200 bg-white text-slate-700 hover:border-rose-300 hover:bg-rose-50/50 hover:text-[#D6135F] active:scale-[0.98]",
      ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]",
      destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-xs active:scale-[0.98]",
      link: "text-[#D6135F] underline-offset-4 hover:underline p-0 h-auto font-medium",
      emerald: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs active:scale-[0.98]",
      indigo: "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white hover:brightness-105 shadow-sm active:scale-[0.98]",
    }[variant];

    const sizeStyles = {
      default: "h-9 px-4 py-2 text-xs font-semibold rounded-xl",
      sm: "h-8 px-3 text-xs font-medium rounded-lg",
      xs: "h-7 px-2.5 text-[11px] font-medium rounded-md",
      lg: "h-11 px-6 text-sm font-semibold rounded-2xl",
      icon: "h-9 w-9 p-0 rounded-xl flex items-center justify-center",
    }[size];

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50",
          variantStyles,
          sizeStyles,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
