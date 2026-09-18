"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Avatar({
  src,
  alt = "Avatar",
  fallback,
  name,
  className,
  size = "default",
}: {
  src?: string;
  alt?: string;
  fallback?: string;
  name?: string;
  className?: string;
  size?: "xs" | "sm" | "default" | "lg" | "xl";
}) {
  const [error, setError] = React.useState(false);

  const initials = fallback || (name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2) : alt.slice(0, 2));

  const sizeStyles = {
    xs: "h-6 w-6 text-[9px]",
    sm: "h-7 w-7 text-[10px]",
    default: "h-9 w-9 text-xs",
    lg: "h-11 w-11 text-sm",
    xl: "h-14 w-14 text-base",
  }[size];

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-surface-muted font-bold text-foreground shadow-sm",
        sizeStyles,
        className
      )}
    >
      {src && !error ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="60px"
          className="aspect-square h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span className="select-none uppercase text-primary font-bold">{initials}</span>
      )}
    </div>
  );
}

export function Alert({
  variant = "default",
  className,
  children,
  icon: Icon,
}: {
  variant?: "default" | "destructive" | "success" | "warning" | "indigo";
  className?: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const variantStyles = {
    default: "bg-surface-muted text-foreground border-border",
    destructive: "bg-destructive/10 text-destructive border-destructive/20 [&>svg]:text-destructive",
    success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 [&>svg]:text-emerald-600",
    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30 [&>svg]:text-amber-600",
    indigo: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30 [&>svg]:text-indigo-600",
  }[variant];

  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-2xl border p-4 text-xs leading-relaxed [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
        variantStyles,
        className
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </div>
  );
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn("mb-1 font-semibold leading-none tracking-tight text-foreground", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <div className={cn("text-xs leading-relaxed text-muted", className)} {...props} />;
}

export function Separator({
  orientation = "horizontal",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      role="separator"
      className={cn(
        "shrink-0 bg-border/80",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
}
