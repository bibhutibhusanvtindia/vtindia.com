"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Factory,
  GraduationCap,
  HeartPulse,
  LineChart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  badge: string;
  icon: typeof Factory;
  headline: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  tags: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "tata-steel-safeact",
    client: "Tata Steel & Heavy Industrial Plants",
    industry: "Steel & Mining Safety",
    badge: "Industrial Safety VR",
    icon: Factory,
    headline: "Zero-Incident Safety Transformation via 6-DOF VR Hazard Simulation",
    challenge:
      "High-risk blast furnace and confined space maintenance training carried real physical risks and low classroom retention for plant technicians.",
    solution:
      "Deployed SafeAct Industrial Virtual Reality Suite featuring 40+ physics-based hazard drill simulations with biometric score tracking.",
    results: [
      { metric: "92%", label: "Drill Retention Rate" },
      { metric: "0", label: "Training Incidents" },
      { metric: "100%", label: "Audit Compliance" },
    ],
    tags: ["SafeAct VR", "Meta Quest 3", "LMS Integration", "Tata Steel"],
  },
  {
    id: "campus-erp-odisha",
    client: "Colleges & State Universities",
    industry: "Higher Education",
    badge: "Campus Digitization",
    icon: GraduationCap,
    headline: "Unified Digital Campus & Automated Examination ERP for 40,000+ Students",
    challenge:
      "Disparate manual registers, fragmented student fee collection, and delayed examination grading caused administrative bottlenecks.",
    solution:
      "Implemented Virtoy Education ERP Suite spanning paperless admissions, automated fee gateways, barcode hall-ticket generation, and digital evaluation.",
    results: [
      { metric: "40K+", label: "Daily Active Users" },
      { metric: "85%", label: "Admin Time Saved" },
      { metric: "100%", label: "Fee Reconciliation" },
    ],
    tags: ["Education ERP", "Next.js & Postgres", "High Availability", "Campus Suite"],
  },
  {
    id: "hospital-hms",
    client: "Regional Healthcare & Diagnostic Centers",
    industry: "Healthcare Infrastructure",
    badge: "Clinical Reliability",
    icon: HeartPulse,
    headline: "Sub-Second Patient Record Retrieval & Zero-Downtime Pharmacy Management",
    challenge:
      "High patient footfall during peak OPD hours required robust, fault-tolerant electronic health records without cloud lag.",
    solution:
      "Architected Virtoy Hospital Management System with sub-millisecond local caching, automated prescription sync, and multi-department billing.",
    results: [
      { metric: "<0.8s", label: "Record Query Latency" },
      { metric: "99.98%", label: "System Uptime" },
      { metric: "3x", label: "Billing Throughput" },
    ],
    tags: ["Hospital HMS", "Redis Cache", "Pharmacy ERP", "Healthcare"],
  },
];

export function ImpactStories() {
  const [activeStudy, setActiveStudy] = useState(0);
  const current = CASE_STUDIES[activeStudy];
  const Icon = current.icon;

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface py-24">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -right-36 top-1/3 h-96 w-96 rounded-full bg-primary/[0.05] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-36 bottom-1/3 h-96 w-96 rounded-full bg-accent-strong/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Proven Impact"
            title="Enterprise Case Studies & Field Results"
            description="Explore how Virtoy’s software and VR solutions power safety, governance, and daily operations across Eastern India’s largest enterprises."
          />
        </div>

        {/* Interactive Case Study Navigator */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Selection List: 4 Cols */}
          <div className="space-y-3 lg:col-span-4">
            {CASE_STUDIES.map((study, idx) => {
              const StudyIcon = study.icon;
              const isSelected = idx === activeStudy;
              return (
                <button
                  key={study.id}
                  onClick={() => setActiveStudy(idx)}
                  className={`group relative flex w-full flex-col rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-primary bg-primary/[0.08] shadow-lg shadow-primary/10"
                      : "border-border/80 bg-surface-muted/60 hover:border-primary/40 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                      {study.badge}
                    </span>
                    <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? "text-primary translate-x-1" : "text-muted group-hover:text-foreground"}`} />
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-foreground">{study.client}</h4>
                  <p className="mt-1 text-xs text-muted line-clamp-1">{study.headline}</p>
                </button>
              );
            })}
          </div>

          {/* Right Detail Card: 8 Cols */}
          <div className="lg:col-span-8">
            <SpotlightCard enableTilt={false} className="p-6 sm:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/25">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-primary">{current.industry}</p>
                        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                          {current.client}
                        </h3>
                      </div>
                    </div>
                    <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-xs font-bold text-primary">
                      Field Verified
                    </span>
                  </div>

                  <h4 className="mt-6 text-lg font-bold tracking-tight text-foreground">
                    {current.headline}
                  </h4>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/80 bg-surface-muted/50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">The Operational Challenge</p>
                      <p className="mt-2 text-xs leading-relaxed text-foreground">{current.challenge}</p>
                    </div>
                    <div className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">The Virtoy Solution</p>
                      <p className="mt-2 text-xs leading-relaxed text-foreground">{current.solution}</p>
                    </div>
                  </div>

                  {/* Impact Results Bar */}
                  <div className="mt-8 rounded-2xl border border-border/80 bg-surface-muted p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground">Measurable Outcomes</p>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {current.results.map((res) => (
                        <div key={res.label} className="text-center">
                          <p className="font-mono text-2xl font-bold text-primary sm:text-3xl">{res.metric}</p>
                          <p className="mt-1 text-[11px] font-semibold text-muted">{res.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {current.tags.map((t) => (
                        <span key={t} className="rounded-lg border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition hover:gap-2"
                    >
                      <span>Request Case Study PDF</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </SpotlightCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
