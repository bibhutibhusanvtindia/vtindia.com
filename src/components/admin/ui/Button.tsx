"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "emerald" | "indigo";
  size?: "default" | "sm" | "lg" | "icon" | "xs";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-primary text-white hover:bg-primary-strong shadow-sm active:scale-[0.98]",
      secondary: "bg-surface-muted text-foreground hover:bg-surface-muted/80 active:scale-[0.98]",
      outline: "border border-border bg-surface text-foreground hover:bg-surface-muted hover:border-primary/50 active:scale-[0.98]",
      ghost: "text-foreground hover:bg-surface-muted active:scale-[0.98]",
      destructive: "bg-destructive text-white hover:bg-destructive/90 shadow-sm active:scale-[0.98]",
      link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      emerald: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm active:scale-[0.98]",
      indigo: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm active:scale-[0.98]",
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
