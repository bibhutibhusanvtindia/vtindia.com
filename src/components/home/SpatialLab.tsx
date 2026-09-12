"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Compass,
  Cpu,
  Eye,
  Glasses,
  Headphones,
  Layers,
  ShieldAlert,
  Sparkles,
  Zap,
  RotateCw,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SpatialHologramCanvas } from "@/components/home/SpatialHologramCanvas";

interface VRModule {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
  features: string[];
  headsets: string[];
}

const VR_MODULES: VRModule[] = [
  {
    id: "safeact-vr",
    title: "SafeAct Industrial VR Hazard Simulator",
    category: "Heavy Industry & Mining Safety",
    badge: "Enterprise Flagship",
    description:
      "Full 6-DOF virtual reality hazard training environment deployed for Tata Steel and Vedanta, simulating high-risk industrial scenarios with zero physical danger.",
    image: "/images/hero/hero-vr.jpg",
    metrics: [
      { label: "Hazard Scenarios", value: "40+ Real Scenarios" },
      { label: "Accident Reduction", value: "92% Retention" },
      { label: "Simulation Accuracy", value: "Physics-Based" },
    ],
    features: [
      "Dynamic fire, chemical & height hazard scenarios",
      "Real-time biometric & reaction-time scoring",
      "Multi-user cooperative emergency evacuation drills",
      "LMS integration & automated compliance certification",
    ],
    headsets: ["Meta Quest 3 / Pro", "HTC Vive Focus 3", "Apple Vision Pro", "WebXR Browser"],
  },
  {
    id: "spatial-digital-twin",
    title: "Spatial 3D Digital Twin & Factory Floor",
    category: "Smart Manufacturing & Architecture",
    badge: "Spatial 3D",
    description:
      "Interactive 3D digital twins and architectural walkthroughs with real-time IoT telemetry, BIM integration, and spatial spatial navigation.",
    image: "/images/hero/hero-developer.jpg",
    metrics: [
      { label: "Rendering Engine", value: "Unreal 5 & Unity" },
      { label: "Frame Rate", value: "90 FPS Locked" },
      { label: "IoT Synchronization", value: "<50ms Latency" },
    ],
    features: [
      "Photorealistic real-time CAD / BIM asset ingestion",
      "Live sensor data overlaid in 3D spatial space",
      "Interactive collision detection & walkthroughs",
      "Cross-platform WebGL & standalone executable",
    ],
    headsets: ["Meta Quest 3", "PC VR / HTC Vive", "Apple Vision Pro", "WebGL (Desktop/Mobile)"],
  },
  {
    id: "medical-xr",
    title: "Medical & Surgical XR Interactive Training",
    category: "Healthcare & Anatomy Simulation",
    badge: "Clinical XR",
    description:
      "High-precision 3D anatomical modeling and surgical procedural simulations for medical colleges and healthcare institutions.",
    image: "/images/hero/hero-mobile.jpg",
    metrics: [
      { label: "Anatomical Fidelity", value: "Sub-millimeter" },
      { label: "Haptic Feedback", value: "Supported" },
      { label: "Multi-Platform", value: "iOS / Android / XR" },
    ],
    features: [
      "Interactive volumetric 3D organ manipulation",
      "Step-by-step guided surgical workflow validation",
      "Multi-student collaborative examination rooms",
      "Comprehensive scoring and performance analytics",
    ],
    headsets: ["Meta Quest 3", "Apple Vision Pro", "Tablet AR (iOS/Android)", "WebXR"],
  },
];

export function SpatialLab() {
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState<"3d-sandbox" | "field-case">("3d-sandbox");
  const activeModule = VR_MODULES[activeTab];

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted/60 py-24">
      {/* High-tech Cyber Grid & Ambient Magenta Glow */}
      <div
        className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_80%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-primary/[0.07] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-1/4 h-96 w-96 rounded-full bg-accent-strong/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <Glasses className="h-3.5 w-3.5" />
              Spatial Computing &amp; AR/VR Studio
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Immersive Simulations for <span className="gradient-text">Zero-Risk Mastery</span>
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
              Engineered by IIT alumni and 3D simulation specialists, Virtoy designs photorealistic virtual reality and spatial workflows deployed across heavy industry, education, and defense.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-2xl border border-border bg-surface p-1 shadow-sm">
              <button
                onClick={() => setViewMode("3d-sandbox")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  viewMode === "3d-sandbox"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <RotateCw className="h-3.5 w-3.5" />
                Live 3D WebXR Studio
              </button>
              <button
                onClick={() => setViewMode("field-case")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  viewMode === "field-case"
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                Field Deployments
              </button>
            </div>

            <Reveal delay={0.1}>
              <Link
                href="/products/virtual-reality"
                className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface px-5 py-2.5 text-xs font-semibold shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
              >
                VR Overview
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Dynamic Display Area */}
        {viewMode === "3d-sandbox" ? (
          <div className="mt-10">
            <SpatialHologramCanvas />
          </div>
        ) : (
          <>
            {/* Interactive Module Switcher Tabs */}
            <div className="mt-12 flex flex-wrap gap-3" role="tablist" aria-label="VR Simulation Modules">
              {VR_MODULES.map((mod, idx) => (
                <button
                  key={mod.id}
                  role="tab"
                  aria-selected={activeTab === idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2.5 rounded-2xl border px-5 py-3 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                    activeTab === idx
                      ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                      : "border-border/80 bg-surface text-muted hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {idx === 0 && <ShieldAlert className="h-4 w-4" />}
                  {idx === 1 && <Boxes className="h-4 w-4" />}
                  {idx === 2 && <Zap className="h-4 w-4" />}
                  <span>{mod.title.split(" ")[0]} {mod.title.split(" ")[1]}</span>
                </button>
              ))}
            </div>

            {/* Active Simulation Showcase Card */}
            <div className="mt-8">
              <SpotlightCard enableTilt={false} className="p-6 sm:p-10 lg:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeModule.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4 }}
                    className="grid items-center gap-10 lg:grid-cols-12"
                  >
                    {/* Left: Spec Details */}
                    <div className="lg:col-span-7">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                          {activeModule.badge}
                        </span>
                        <span className="text-xs font-medium text-muted">
                          {activeModule.category}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {activeModule.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                        {activeModule.description}
                      </p>

                      {/* Core Metrics Grid */}
                      <div className="mt-8 grid grid-cols-1 gap-3 border-y border-border/80 py-6 xs:grid-cols-3 sm:gap-4">
                        {activeModule.metrics.map((m) => (
                          <div key={m.label} className="rounded-xl bg-surface/50 p-2.5 sm:bg-transparent sm:p-0">
                            <p className="text-[11px] font-medium text-muted">{m.label}</p>
                            <p className="mt-1 font-mono text-sm font-bold text-foreground sm:text-base">{m.value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Features Checklist */}
                      <div className="mt-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-foreground">Capabilities &amp; Architecture</p>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {activeModule.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-2 text-xs text-muted">
                              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Hardware Support Badges */}
                      <div className="mt-8 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">Hardware Target:</span>
                        {activeModule.headsets.map((h) => (
                          <span
                            key={h}
                            className="rounded-lg border border-border/80 bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Immersive Preview Frame */}
                    <div className="relative lg:col-span-5">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/80 bg-surface-muted shadow-2xl">
                        <Image
                          src={activeModule.image}
                          alt={activeModule.title}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover object-center transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* HUD Status Bar */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/20 bg-black/50 px-4 py-2.5 backdrop-blur-md">
                          <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <span className="font-mono text-xs font-semibold text-white">Spatial Telemetry Active</span>
                          </div>
                          <span className="rounded bg-primary/80 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                            6-DOF VR
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </SpotlightCard>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
