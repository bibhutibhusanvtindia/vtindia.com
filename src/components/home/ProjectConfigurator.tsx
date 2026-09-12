"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Glasses,
  Globe,
  Layers,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const PLATFORMS = [
  { id: "vr-spatial", name: "AR / VR & Spatial 3D", icon: Glasses, desc: "6-DOF hazard training, digital twins, or WebXR" },
  { id: "enterprise-web", name: "Enterprise Web & Cloud", icon: Globe, desc: "High-concurrency ERP, CRM, or SaaS platform" },
  { id: "mobile-apps", name: "Mobile Applications", icon: Smartphone, desc: "Native iOS & Android or Flutter multi-platform" },
  { id: "campus-erp", name: "Institutional Campus Suite", icon: Layers, desc: "Education ERP, library, and examination systems" },
];

const SCALES = [
  { id: "pilot", name: "Pilot / MVP Deployment", time: "4 - 8 Weeks", desc: "Rapid prototype or initial facility rollout" },
  { id: "facility", name: "Full Enterprise Deployment", time: "2 - 4 Months", desc: "Multi-facility production deployment with SLAs" },
  { id: "institutional", name: "Multi-Location Enterprise Network", time: "3 - 6 Months", desc: "State-wide or nationwide enterprise infrastructure" },
];

const MODULES = [
  { id: "iot", label: "Real-time IoT Telemetry Sync", tag: "Hardware Bridge" },
  { id: "biometrics", label: "Biometric & Reaction Analytics", tag: "Safety / LMS" },
  { id: "sla", label: "24/7 Dedicated Support & SLA", tag: "Enterprise Support" },
  { id: "iso", label: "ISO 9001 Compliance Code Audit", tag: "Governance" },
];

export function ProjectConfigurator() {
  const [selectedPlatform, setSelectedPlatform] = useState("vr-spatial");
  const [selectedScale, setSelectedScale] = useState("facility");
  const [selectedModules, setSelectedModules] = useState<string[]>(["sla", "iot"]);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const currentPlatform = PLATFORMS.find((p) => p.id === selectedPlatform)!;
  const currentScale = SCALES.find((s) => s.id === selectedScale)!;

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted/50 py-24">
      {/* Background Lighting */}
      <div
        className="pointer-events-none absolute left-1/3 top-1/4 h-80 w-80 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <Zap className="h-3.5 w-3.5" />
              Solution Scope Builder
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Configure Your <span className="gradient-text">Enterprise Architecture</span>
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
              Select your solution parameters to preview architecture highlights, delivery timelines, and certified deployment standards.
            </p>
          </div>
        </div>

        {/* 3-Step Interactive Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Left Controls: 8 Cols */}
          <div className="space-y-8 lg:col-span-7">
            {/* Step 1: Platform Selection */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                Step 01 · Select Solution Platform
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {PLATFORMS.map((plat) => {
                  const Icon = plat.icon;
                  const isSelected = selectedPlatform === plat.id;
                  return (
                    <button
                      key={plat.id}
                      onClick={() => setSelectedPlatform(plat.id)}
                      className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                        isSelected
                          ? "border-primary bg-primary/[0.08] shadow-md shadow-primary/10"
                          : "border-border/80 bg-surface hover:border-primary/40 hover:bg-surface-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isSelected ? "bg-primary text-white" : "bg-primary/10 text-primary"}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      </div>
                      <h4 className="mt-3 text-sm font-bold text-foreground">{plat.name}</h4>
                      <p className="mt-1 text-xs text-muted">{plat.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale Selection */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                Step 02 · Deployment Scale &amp; Scope
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {SCALES.map((scale) => {
                  const isSelected = selectedScale === scale.id;
                  return (
                    <button
                      key={scale.id}
                      onClick={() => setSelectedScale(scale.id)}
                      className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                        isSelected
                          ? "border-primary bg-primary/[0.08] shadow-md shadow-primary/10"
                          : "border-border/80 bg-surface hover:border-primary/40 hover:bg-surface-muted"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-primary">{scale.time}</span>
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                        </div>
                        <h4 className="mt-2 text-xs font-bold text-foreground">{scale.name}</h4>
                      </div>
                      <p className="mt-2 text-[11px] text-muted">{scale.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Modules */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                Step 03 · Enterprise Add-On Capabilities
              </p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {MODULES.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                        isChecked
                          ? "border-primary/60 bg-primary/10 text-foreground font-semibold"
                          : "border-border/80 bg-surface text-muted hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-5 w-5 items-center justify-center rounded-md border ${isChecked ? "border-primary bg-primary text-white" : "border-border bg-surface"}`}>
                          {isChecked && <Check className="h-3 w-3" />}
                        </div>
                        <span className="text-xs">{mod.label}</span>
                      </div>
                      <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] text-muted">{mod.tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Architecture Summary Card: 5 Cols */}
          <div className="lg:col-span-5">
            <SpotlightCard enableTilt={false} className="sticky top-28 p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-border/80 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Custom Architecture Blueprint
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600">
                  Ready to Deploy
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-[11px] font-semibold text-muted">Selected Domain:</p>
                  <p className="mt-0.5 text-base font-bold text-foreground">{currentPlatform.name}</p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted">Estimated Deployment Timeline:</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-mono text-sm font-bold text-foreground">{currentScale.time}</span>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted">Active Enterprise Modules ({selectedModules.length}):</p>
                  <ul className="mt-2 space-y-1.5">
                    {selectedModules.map((mId) => {
                      const m = MODULES.find((mod) => mod.id === mId);
                      return (
                        <li key={mId} className="flex items-center gap-2 text-xs text-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                          <span>{m?.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-xs font-bold text-primary">Virtoy Engineering Guarantee</p>
                  <p className="mt-1 text-[11px] text-muted">
                    Engineered by IIT alumni · 99.8% proven uptime · Direct on-ground support from Kolkata HQ &amp; Bhubaneswar O-HUB.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-strong"
                >
                  Request Technical Proposal
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
