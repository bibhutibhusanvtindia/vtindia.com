"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Boxes,
  CheckCircle2,
  Cpu,
  Database,
  Eye,
  Flame,
  Glasses,
  Play,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type TabMode = "vr-physics" | "safeact-stream" | "cloud-engine";

export function InteractiveExperienceCenter() {
  const [activeTab, setActiveTab] = useState<TabMode>("vr-physics");

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface py-24">
      {/* Background Cyber Mesh Glow */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-primary/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-accent-strong/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Live Interactive Technology Lab
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Experience the Engine <span className="gradient-text">In Real Time</span>
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
              Interact with our live simulation engines, industrial telemetry dashboards, and cloud architecture simulators.
            </p>
          </div>

          {/* Interactive Mode Pills */}
          <div className="flex flex-wrap gap-2 rounded-2xl border border-border/80 bg-surface-muted/80 p-1.5 backdrop-blur-md" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === "vr-physics"}
              onClick={() => setActiveTab("vr-physics")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                activeTab === "vr-physics"
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <Glasses className="h-4 w-4" />
              <span>3D Spatial Physics</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "safeact-stream"}
              onClick={() => setActiveTab("safeact-stream")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                activeTab === "safeact-stream"
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>SafeAct Hazard Telemetry</span>
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "cloud-engine"}
              onClick={() => setActiveTab("cloud-engine")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                activeTab === "cloud-engine"
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <Cpu className="h-4 w-4" />
              <span>ERP Cloud Pipeline</span>
            </button>
          </div>
        </div>

        {/* Interactive Sandbox Container */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {activeTab === "vr-physics" && <VRPhysicsSandbox key="vr-physics" />}
            {activeTab === "safeact-stream" && <SafeActTelemetrySandbox key="safeact-stream" />}
            {activeTab === "cloud-engine" && <CloudArchitectureSandbox key="cloud-engine" />}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

/** 1. 3D Spatial Physics Interactive Sandbox */
function VRPhysicsSandbox() {
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [wireframe, setWireframe] = useState(false);
  const [particles, setParticles] = useState(true);
  const [drillMode, setDrillMode] = useState<"fire" | "confined" | "height">("fire");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      <SpotlightCard enableTilt={false} className="p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Controls */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-500">
                Spatial 3D Engine: Online
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Virtual Reality Simulation Sandbox
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Test real-time parameter controls that drive our 6-DOF industrial training simulators deployed at Tata Steel and Vedanta.
            </p>

            {/* Interactive Drill Mode Selector */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Select Simulation Drill:</p>
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {[
                  { id: "fire", label: "Chemical Fire Drill" },
                  { id: "confined", label: "Confined Space" },
                  { id: "height", label: "High-Altitude Rig" },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDrillMode(d.id as any)}
                    className={`rounded-xl border p-2 text-center text-xs font-semibold transition-all ${
                      drillMode === d.id
                        ? "border-primary bg-primary/10 text-primary font-bold shadow-sm"
                        : "border-border bg-surface-muted text-muted hover:text-foreground"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter Toggles */}
            <div className="mt-6 space-y-4 rounded-2xl border border-border/80 bg-surface-muted/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">Orbital Rotation Speed:</span>
                <div className="flex items-center gap-1.5">
                  {[0.5, 1, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => setRotationSpeed(s)}
                      className={`rounded-lg px-2.5 py-1 font-mono text-xs font-semibold transition ${
                        rotationSpeed === s ? "bg-primary text-white" : "bg-surface text-muted hover:text-foreground"
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border/60 pt-3">
                <span className="text-xs font-medium text-foreground">Holographic Wireframe Grid:</span>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`rounded-lg px-3 py-1 font-mono text-xs font-semibold transition ${
                    wireframe ? "bg-primary text-white" : "bg-surface text-muted"
                  }`}
                >
                  {wireframe ? "ENABLED" : "SOLID"}
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-border/60 pt-3">
                <span className="text-xs font-medium text-foreground">Spatial Particle Physics:</span>
                <button
                  onClick={() => setParticles(!particles)}
                  className={`rounded-lg px-3 py-1 font-mono text-xs font-semibold transition ${
                    particles ? "bg-emerald-600 text-white" : "bg-surface text-muted"
                  }`}
                >
                  {particles ? "ACTIVE (60 FPS)" : "MUTED"}
                </button>
              </div>
            </div>

            {/* Live Telemetry Pills */}
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-border/70 bg-surface p-2.5">
                <p className="text-[10px] text-muted">Physics FPS</p>
                <p className="font-mono text-sm font-bold text-emerald-500">90 FPS</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-surface p-2.5">
                <p className="text-[10px] text-muted">Tracking Latency</p>
                <p className="font-mono text-sm font-bold text-primary">&lt;11 ms</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-surface p-2.5">
                <p className="text-[10px] text-muted">Headset Support</p>
                <p className="font-mono text-xs font-bold text-foreground">6-DOF Native</p>
              </div>
            </div>
          </div>

          {/* Right: Live Interactive Hologram Viewport */}
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-primary/30 bg-[#0c060d] p-6 shadow-2xl lg:col-span-7">
            {/* Ambient Background Grid and Radial Halo */}
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

            {/* Rotating 3D Hologram Nodes */}
            <div className="relative flex h-64 w-64 items-center justify-center">
              {/* Outer Orbit Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20 / rotationSpeed, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-primary/40"
              >
                <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-lg shadow-primary" />
                <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent-strong shadow-lg shadow-accent-strong" />
              </motion.div>

              {/* Middle Orbit Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14 / rotationSpeed, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-primary/25"
              >
                <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-emerald-400 shadow-md shadow-emerald-400" />
              </motion.div>

              {/* Center 3D Isometric Cube / Core */}
              <motion.div
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 10 / rotationSpeed,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className={`relative flex h-28 w-28 items-center justify-center rounded-2xl border-2 transition-all ${
                  wireframe
                    ? "border-primary/80 bg-transparent shadow-lg shadow-primary/20"
                    : "border-primary bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent shadow-2xl shadow-primary/40 backdrop-blur-sm"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Boxes className="h-12 w-12 text-white drop-shadow-[0_0_12px_rgba(240,24,108,0.8)]" />
              </motion.div>
            </div>

            {/* Live HUD Badges on the 3D Canvas */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-lg border border-white/15 bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span>Drill Active: {drillMode.toUpperCase()}</span>
            </div>

            <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-lg border border-white/15 bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Spatial Biometrics Synced</span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/** 2. SafeAct Live Industrial Hazard Telemetry Simulator */
function SafeActTelemetrySandbox() {
  const [alertCount, setAlertCount] = useState(0);
  const [logs, setLogs] = useState([
    { id: 1, time: "10:42:15", location: "Tata Steel · Blast Furnace #3", type: "PPE Compliance Check", status: "100% Validated", severity: "normal" },
    { id: 2, time: "10:42:18", location: "Vedanta Aluminum · Smelter Potline", type: "Thermal Gas Pressure", status: "Stable · 1.4 Bar", severity: "normal" },
    { id: 3, time: "10:42:22", location: "JSPL Angul · Pellet Plant", type: "Conveyor Proximity Sensor", status: "Clearance 3.2m", severity: "normal" },
  ]);

  const triggerHazardDrill = () => {
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      location: "Tata Steel Kalinganagar · Zone 4B",
      type: "SIMULATED HAZARD DRILL · Gas Influx",
      status: "Automated Evacuation Siren Fired · VR Checklist Deployed",
      severity: "alert",
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    setAlertCount((c) => c + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      <SpotlightCard enableTilt={false} className="p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                SafeAct Industrial Telemetry
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Real-Time Plant Safety Console
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Live event stream mirroring the SafeAct incident management platform used across steel, mining, and power generation facilities.
            </p>

            <div className="mt-6 rounded-2xl border border-border/80 bg-surface-muted/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-foreground">Interactive Simulation Trigger</p>
                  <p className="text-[11px] text-muted">Inject an emergency safety drill into the live pipeline</p>
                </div>
                <button
                  onClick={triggerHazardDrill}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-md shadow-primary/25 transition hover:bg-primary-strong active:scale-95"
                >
                  <Flame className="h-3.5 w-3.5" />
                  Simulate Drill
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-border/70 bg-surface p-2.5">
                <p className="text-[10px] text-muted">Total Drills</p>
                <p className="font-mono text-sm font-bold text-foreground">{40 + alertCount}</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-surface p-2.5">
                <p className="text-[10px] text-muted">Incident Rate</p>
                <p className="font-mono text-sm font-bold text-emerald-500">0.00% Zero</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-surface p-2.5">
                <p className="text-[10px] text-muted">Active Workers</p>
                <p className="font-mono text-sm font-bold text-foreground">2,840 Live</p>
              </div>
            </div>
          </div>

          {/* Right: Live Terminal Event Stream */}
          <div className="flex flex-col justify-between rounded-3xl border border-border/90 bg-[#080509] p-5 font-mono text-xs text-white shadow-xl lg:col-span-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[11px] text-white/60">safeact-telemetry-feed:port-3600</span>
              </div>
              <span className="text-[10px] text-emerald-400">STREAMING ACTIVE</span>
            </div>

            <div className="my-4 space-y-2.5 overflow-y-auto max-h-72">
              <AnimatePresence>
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-xl border p-3 ${
                      log.severity === "alert"
                        ? "border-primary/60 bg-primary/20 text-white font-semibold"
                        : "border-white/10 bg-white/5 text-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/50">[{log.time}] {log.location}</span>
                      {log.severity === "alert" ? (
                        <span className="rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">DRILL INJECTED</span>
                      ) : (
                        <span className="text-[10px] text-emerald-400">VERIFIED</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs">{log.type}</p>
                    <p className="mt-0.5 text-[11px] text-white/70">{log.status}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-white/50">
              <span>Verified Deployment: Tata Steel · Vedanta · JSPL</span>
              <span>Encrypted SHA-256</span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/** 3. ERP Cloud Architecture & Query Pipeline Sandbox */
function CloudArchitectureSandbox() {
  const [requestCount, setRequestCount] = useState(14820);
  const [dbLatency, setDbLatency] = useState(0.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequestCount((c) => c + Math.floor(Math.random() * 5 + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      <SpotlightCard enableTilt={false} className="p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-400" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-500">
                Enterprise Cloud Mesh
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              High-Throughput ERP Engine
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Built on scalable microservice clusters with sub-millisecond query caches powering 84+ institutions across Eastern India and UAE.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface-muted/60 p-3">
                <span className="text-xs font-medium text-foreground">API Throughput (req/sec):</span>
                <span className="font-mono text-xs font-bold text-primary">4,820 req/s</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface-muted/60 p-3">
                <span className="text-xs font-medium text-foreground">Redis Cache Latency:</span>
                <span className="font-mono text-xs font-bold text-emerald-500">{dbLatency} ms</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface-muted/60 p-3">
                <span className="text-xs font-medium text-foreground">Annual Uptime SLA:</span>
                <span className="font-mono text-xs font-bold text-foreground">99.98% High Availability</span>
              </div>
            </div>
          </div>

          {/* Right: Architecture Diagram Nodes */}
          <div className="flex flex-col gap-4 rounded-3xl border border-border/90 bg-surface-muted/40 p-6 lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">Live Pipeline Nodes</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-primary/30 bg-surface p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Server className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-foreground">Edge CDN &amp; Nginx</h4>
                <p className="mt-1 text-[11px] text-muted">SSL Termination &amp; DDoS Shield</p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-500">
                  <CheckCircle2 className="h-3 w-3" /> Healthy
                </div>
              </div>

              <div className="rounded-2xl border border-primary/30 bg-surface p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Cpu className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-foreground">Node/Python Microservices</h4>
                <p className="mt-1 text-[11px] text-muted">Auto-Scaling Docker Pods</p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-500">
                  <CheckCircle2 className="h-3 w-3" /> 16 Pods Live
                </div>
              </div>

              <div className="rounded-2xl border border-primary/30 bg-surface p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Database className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-foreground">PostgreSQL &amp; Redis</h4>
                <p className="mt-1 text-[11px] text-muted">ACID Multi-AZ Replication</p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-500">
                  <CheckCircle2 className="h-3 w-3" /> 0.8ms Query
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-surface p-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted">Total Requests Processed:</span>
              <span className="font-mono text-sm font-bold text-primary">{requestCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
