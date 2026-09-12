"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Sparkles, ArrowRight, ShieldCheck, Zap, Layers, Cpu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface ComparisonRow {
  category: string;
  virtoy: string;
  traditional: string;
  inhouse: string;
  highlight?: boolean;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    category: "Engineering Leadership",
    virtoy: "Founded & Architected by IIT Alumni & Senior Systems Specialists",
    traditional: "Junior developers managed by non-technical account reps",
    inhouse: "High hiring friction for niche skills (AR/VR, WebGL, High-Load)",
    highlight: true,
  },
  {
    category: "Source Code & IP Ownership",
    virtoy: "100% Full IP Ownership & Zero Vendor Lock-in (Clean Repo)",
    traditional: "Licensing restrictions & hidden retention clauses",
    inhouse: "Full IP ownership, but reliant on internal knowledge retention",
  },
  {
    category: "Time to Production MVP",
    virtoy: "4 – 8 Weeks (Accelerated by 16 Pre-Built Enterprise Engines)",
    traditional: "6 – 12 Months with frequent scope creep delays",
    inhouse: "9+ Months (Hiring + Onboarding + Scaffolding)",
    highlight: true,
  },
  {
    category: "Immersive AR/VR & 3D Depth",
    virtoy: "Native In-House 6-DOF VR, WebXR & Physics Simulation Lab",
    traditional: "Outsourced to third-party studios with high markups",
    inhouse: "Requires dedicated Unity/Unreal specialized payroll",
  },
  {
    category: "Enterprise SLA & On-Ground Support",
    virtoy: "24/7 Dual Regional Hubs (Kolkata HQ & Bhubaneswar O-HUB)",
    traditional: "Hourly billable support tickets with slow response times",
    inhouse: "Internal support shifts required",
  },
  {
    category: "Compliance & Accreditations",
    virtoy: "ISO 9001:2015, MSME Registered, Startup India Certified",
    traditional: "Variable standards & unverified engineering compliance",
    inhouse: "Requires custom audit & institutional compliance overhead",
  },
];

export function ComparisonMatrix() {
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("desktop");

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface py-24">
      {/* Background cyber ambient gradient */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-primary/[0.03] blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Architectural Advantage"
            title="Why Leading Enterprises Choose Virtoy"
            description="Compare our IIT alumni engineering pod model against traditional agencies and costly in-house hiring."
          />
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface px-6 py-3 text-sm font-semibold shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
            >
              Request Custom Technical Architecture
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Matrix Comparison Table */}
        <div className="mt-14 overflow-x-auto pb-4">
          <div className="min-w-[760px] rounded-3xl border border-border/80 bg-surface shadow-xl">
            {/* Header Columns */}
            <div className="grid grid-cols-12 items-center border-b border-border/80 bg-surface-muted/40 p-4 text-xs font-bold uppercase tracking-wider sm:p-6 sm:text-sm">
              <div className="col-span-4 text-muted">Evaluation Vector</div>
              <div className="col-span-4 relative rounded-2xl border-2 border-primary bg-primary/10 px-4 py-3 text-center text-primary shadow-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-sm">
                  Recommended Model
                </div>
                <span className="flex items-center justify-center gap-1.5 font-bold">
                  <Sparkles className="h-4 w-4" /> Virtoy Engineering Pods
                </span>
              </div>
              <div className="col-span-2 text-center text-muted">Traditional Agency</div>
              <div className="col-span-2 text-center text-muted">In-House Hiring</div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-border/60">
              {COMPARISON_DATA.map((row, idx) => (
                <div
                  key={row.category}
                  className={`grid grid-cols-12 items-center p-4 transition-colors hover:bg-surface-muted/30 sm:p-6 ${
                    row.highlight ? "bg-primary/[0.02]" : ""
                  }`}
                >
                  {/* Category Title */}
                  <div className="col-span-4 pr-4">
                    <p className="text-sm font-bold text-foreground sm:text-base">
                      {row.category}
                    </p>
                  </div>

                  {/* Virtoy Pods (Highlighted) */}
                  <div className="col-span-4 rounded-xl border border-primary/20 bg-primary/[0.04] p-3.5 text-center text-xs font-semibold leading-relaxed text-foreground sm:p-4 sm:text-sm">
                    <div className="mb-1 flex items-center justify-center gap-1.5 text-primary">
                      <Check className="h-4 w-4 stroke-[3]" />
                      <span className="font-bold">Enterprise Grade</span>
                    </div>
                    {row.virtoy}
                  </div>

                  {/* Traditional Agency */}
                  <div className="col-span-2 px-3 text-center text-xs leading-relaxed text-muted">
                    <div className="mb-1 flex items-center justify-center gap-1 text-rose-500">
                      <X className="h-3.5 w-3.5" />
                    </div>
                    {row.traditional}
                  </div>

                  {/* In-House Hiring */}
                  <div className="col-span-2 px-3 text-center text-xs leading-relaxed text-muted">
                    <div className="mb-1 flex items-center justify-center gap-1 text-amber-500">
                      <span className="h-2 w-2 rounded-full bg-amber-500" />
                    </div>
                    {row.inhouse}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Summary Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/80 bg-surface-muted/60 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs text-muted sm:text-sm">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>
                  Backed by standard master service agreements, NDA protection, and milestone-based sign-offs.
                </span>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline sm:text-sm"
              >
                Schedule Architecture Consultation <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
