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
      default: "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white hover:brightness-110 shadow-md shadow-[#F0186C]/25 active:scale-[0.98]",
      brand: "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white hover:brightness-110 shadow-md shadow-[#F0186C]/25 active:scale-[0.98]",
      secondary: "bg-[#22121D] text-slate-200 border border-[#3D1E30] hover:bg-[#2E1827] active:scale-[0.98]",
      outline: "border border-[#3D1E30] bg-[#160A12] text-slate-200 hover:border-[#F0186C]/50 hover:bg-[#24101D] hover:text-white active:scale-[0.98]",
      ghost: "text-slate-300 hover:bg-[#24101D] hover:text-white active:scale-[0.98]",
      destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm active:scale-[0.98]",
      link: "text-[#FF4D8D] underline-offset-4 hover:underline p-0 h-auto",
      emerald: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm active:scale-[0.98]",
      indigo: "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white hover:brightness-110 shadow-md shadow-[#F0186C]/25 active:scale-[0.98]",
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
