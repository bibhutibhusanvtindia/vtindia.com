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

import { useLanguage } from "@/lib/translations";

type TabMode = "vr-physics" | "safeact-stream" | "cloud-engine";

export function InteractiveExperienceCenter() {
  const [activeTab, setActiveTab] = useState<TabMode>("vr-physics");
  const { lang, t } = useLanguage();

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
              {t("exp_badge")}
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {lang === "hi" ? (
                <>
                  रियल टाइम में हमारे इंजन का <span className="gradient-text">अनुभव करें</span>
                </>
              ) : lang === "or" ? (
                <>
                  ରିଅଲ୍ ଟାଇମ୍‌ରେ ଆମ ଇଞ୍ଜିନ୍‌ର <span className="gradient-text">ଅନୁଭୂତି ନିଅନ୍ତୁ</span>
                </>
              ) : (
                <>
                  Experience the Engine <span className="gradient-text">In Real Time</span>
                </>
              )}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
              {t("exp_desc")}
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
              <span>{t("exp_tab_vr")}</span>
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
              <span>{t("exp_tab_safeact")}</span>
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
              <span>{t("exp_tab_cloud")}</span>
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
  const { lang } = useLanguage();

  const drills = [
    {
      id: "fire",
      label: lang === "hi" ? "केमिकल फायर ड्रिल" : lang === "or" ? "ରାସାୟନିକ ଅଗ୍ନି ନିରାପତ୍ତା" : "Chemical Fire Drill",
    },
    {
      id: "confined",
      label: lang === "hi" ? "सीमित स्थान ड्रिल" : lang === "or" ? "ସଂକୀର୍ଣ୍ଣ ସ୍ଥାନ ଡ୍ରିଲ୍" : "Confined Space",
    },
    {
      id: "height",
      label: lang === "hi" ? "ऊंचाई रिग ड्रिल" : lang === "or" ? "ଉଚ୍ଚତା ରିଗ୍ ଡ୍ରିଲ୍" : "High-Altitude Rig",
    },
  ];

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
                {lang === "hi" ? "स्पेशियल 3D इंजन: सक्रिय" : lang === "or" ? "ସ୍ପାସିଆଲ୍ 3D ଇଞ୍ଜିନ୍: ସକ୍ରିୟ" : "Spatial 3D Engine: Online"}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {lang === "hi" ? "वर्चुअल रियलिटी सिमुलेशन सैंडबॉक्स" : lang === "or" ? "ଭର୍ଚ୍ଚୁଆଲ୍ ରିଆଲିଟି ସିମ୍ୟୁଲେସନ୍ ସ୍ୟାଣ୍ଡବକ୍ସ" : "Virtual Reality Simulation Sandbox"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {lang === "hi"
                ? "टाटा स्टील और वेदांता में तैनात हमारे 6-DoF औद्योगिक प्रशिक्षण सिमुलेटरों के रियल-टाइम पैरामीटर नियंत्रण का परीक्षण करें।"
                : lang === "or"
                ? "ଟାଟା ଷ୍ଟିଲ୍ ଓ ବେଦାନ୍ତାରେ କାର୍ଯ୍ୟରତ ଆମ ୬-DoF ଶିଳ୍ପ ନିରାପତ୍ତା ସିମ୍ୟୁଲେଟରର ରିଅଲ୍-ଟାଇମ୍ ନିୟନ୍ତ୍ରଣ ପରୀକ୍ଷା କରନ୍ତୁ।"
                : "Test real-time parameter controls that drive our 6-DOF industrial training simulators deployed at Tata Steel and Vedanta."}
            </p>

            {/* Interactive Drill Mode Selector */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {lang === "hi" ? "सिमुलेशन ड्रिल चुनें:" : lang === "or" ? "ସିମ୍ୟୁଲେସନ୍ ଡ୍ରିଲ୍ ଚୟନ କରନ୍ତୁ:" : "Select Simulation Drill:"}
              </p>
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {drills.map((d) => (
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
                <span className="text-xs font-medium text-foreground">
                  {lang === "hi" ? "ऑर्बिटल घूर्णन गति:" : lang === "or" ? "ଘୂର୍ଣ୍ଣନ ଗତି:" : "Orbital Rotation Speed:"}
                </span>
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
                <span className="text-xs font-medium text-foreground">
                  {lang === "hi" ? "होलोग्राफिक वायरफ्रेम ग्रिड:" : lang === "or" ? "ହୋଲୋଗ୍ରାଫିକ୍ ୱାୟାରଫ୍ରେମ୍:" : "Holographic Wireframe Grid:"}
                </span>
                <button
                  onClick={() => setWireframe(!wireframe)}
                  className={`rounded-lg px-3 py-1 font-mono text-xs font-semibold transition ${
                    wireframe ? "bg-primary text-white" : "bg-surface text-muted"
                  }`}
                >
                  {wireframe
                    ? lang === "hi" ? "सक्षम" : lang === "or" ? "ସକ୍ଷମ" : "ENABLED"
                    : lang === "hi" ? "सॉलिड" : lang === "or" ? "ସଲିଡ୍" : "SOLID"}
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-border/60 pt-3">
                <span className="text-xs font-medium text-foreground">
                  {lang === "hi" ? "स्पेशियल पार्टिकल फिजिक्स:" : lang === "or" ? "ସ୍ପାସିଆଲ୍ ପାର୍ଟିକିଲ୍ ଫିଜିକ୍ସ:" : "Spatial Particle Physics:"}
                </span>
                <button
                  onClick={() => setParticles(!particles)}
                  className={`rounded-lg px-3 py-1 font-mono text-xs font-semibold transition ${
                    particles ? "bg-emerald-600 text-white" : "bg-surface text-muted"
                  }`}
                >
                  {particles
                    ? lang === "hi" ? "सक्रिय (60 FPS)" : lang === "or" ? "ସକ୍ରିୟ (୬୦ FPS)" : "ACTIVE (60 FPS)"
                    : lang === "hi" ? "शांत" : lang === "or" ? "ବନ୍ଦ" : "MUTED"}
                </button>
              </div>
            </div>

            {/* Live Telemetry Pills */}
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-border/70 bg-surface p-2.5">
                <p className="text-[10px] text-muted">
                  {lang === "hi" ? "फिजिक्स FPS" : lang === "or" ? "ଫିଜିକ୍ସ FPS" : "Physics FPS"}
                </p>
                <p className="font-mono text-sm font-bold text-emerald-500">90 FPS</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-surface p-2.5">
                <p className="text-[10px] text-muted">
                  {lang === "hi" ? "ट्रैकिंग लेटेंसी" : lang === "or" ? "ଟ୍ରାକିଂ ଲେଟେନ୍ସି" : "Tracking Latency"}
                </p>
                <p className="font-mono text-sm font-bold text-primary">&lt;11 ms</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-surface p-2.5">
                <p className="text-[10px] text-muted">
                  {lang === "hi" ? "हेडसेट सपोर्ट" : lang === "or" ? "ହେଡ୍‌ସେଟ୍ ସପୋର୍ଟ" : "Headset Support"}
                </p>
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
              <span>
                {lang === "hi"
                  ? `ड्रिल सक्रिय: ${drillMode.toUpperCase()}`
                  : lang === "or"
                  ? `ଡ୍ରିଲ୍ ସକ୍ରିୟ: ${drillMode.toUpperCase()}`
                  : `Drill Active: ${drillMode.toUpperCase()}`}
              </span>
            </div>

            <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-lg border border-white/15 bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>
                {lang === "hi"
                  ? "बायोमेट्रिक्स सिंक"
                  : lang === "or"
                  ? "ବାୟୋମେଟ୍ରିକ୍ସ ସିଙ୍କ୍"
                  : "Spatial Biometrics Synced"}
              </span>
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
  const { lang } = useLanguage();

  const [logs, setLogs] = useState([
    {
      id: 1,
      time: "10:42:15",
      location: "Tata Steel · Blast Furnace #3",
      type: "PPE Compliance Check",
      typeHi: "पीपीई अनुपालन जांच",
      typeOr: "PPE ନିୟମ ଯାଞ୍ଚ",
      status: "100% Validated",
      statusHi: "100% प्रमाणित",
      statusOr: "୧୦୦% ପ୍ରମାଣିତ",
      severity: "normal",
    },
    {
      id: 2,
      time: "10:42:18",
      location: "Vedanta Aluminum · Smelter Potline",
      type: "Thermal Gas Pressure",
      typeHi: "थर्मल गैस दबाव स्तर",
      typeOr: "ତାପଜ ଗ୍ୟାସ୍ ଚାପ",
      status: "Stable · 1.4 Bar",
      statusHi: "स्थिर · 1.4 Bar",
      statusOr: "ସ୍ଥିର · ୧.୪ Bar",
      severity: "normal",
    },
    {
      id: 3,
      time: "10:42:22",
      location: "JSPL Angul · Pellet Plant",
      type: "Conveyor Proximity Sensor",
      typeHi: "कन्वेयर निकटता सेंसर",
      typeOr: "କନଭେୟର ସେନ୍ସର ଯାଞ୍ଚ",
      status: "Clearance 3.2m",
      statusHi: "दूरी 3.2m सुरक्षित",
      statusOr: "ଦୂରତା ୩.୨m ସୁରକ୍ଷିତ",
      severity: "normal",
    },
  ]);

  const triggerHazardDrill = () => {
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      location: "Tata Steel Kalinganagar · Zone 4B",
      type: "SIMULATED HAZARD DRILL · Gas Influx",
      typeHi: "आपातकालीन सिमुलेशन ड्रिल · गैस रिसाव",
      typeOr: "ଜରୁରୀକାଳୀନ ସିମ୍ୟୁଲେସନ୍ ଡ୍ରିଲ୍ · ଗ୍ୟାସ୍ ନିର୍ଗମନ",
      status: "Automated Evacuation Siren Fired · VR Checklist Deployed",
      statusHi: "स्वचालित सायरन सक्रिय · वीआर चेकलिस्ट तैनात",
      statusOr: "ସ୍ୱୟଂଚାଳିତ ସାଇରନ୍ ସକ୍ରିୟ · VR ନିୟମାବଳୀ ଜାରି",
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
                {lang === "hi" ? "सेफएक्ट औद्योगिक टेलीमेट्री" : lang === "or" ? "ସେଫ୍‌ଆକ୍ଟ ଶିଳ୍ପ ଟେଲିମେଟ୍ରି" : "SafeAct Industrial Telemetry"}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {lang === "hi" ? "रियल-टाइम प्लांट सुरक्षा कंसोल" : lang === "or" ? "ରିଅଲ୍-ଟାଇମ୍ ପ୍ଲାଣ୍ଟ ସୁରକ୍ଷା କନସୋଲ୍" : "Real-Time Plant Safety Console"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {lang === "hi"
                ? "स्टील, खनन और ऊर्जा संयंत्रों में प्रयुक्त सेफएक्ट घटना प्रबंधन प्रणाली का सीधा लाइव इवेंट स्ट्रीम।"
                : lang === "or"
                ? "ଷ୍ଟିଲ୍, ଖଣି ଓ ଶକ୍ତି କାରଖାନାରେ ବ୍ୟବହୃତ ସେଫ୍‌ଆକ୍ଟ ପରିଚାଳନା ପ୍ରଣାଳୀର ଲାଇଭ୍ ଇଭେଣ୍ଟ ଷ୍ଟ୍ରିମ୍।"
                : "Live event stream mirroring the SafeAct incident management platform used across steel, mining, and power generation facilities."}
            </p>

            <div className="mt-6 rounded-2xl border border-border/80 bg-surface-muted/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-foreground">
                    {lang === "hi" ? "इंटरएक्टिव सिमुलेशन ट्रिगर" : lang === "or" ? "ସିମ୍ୟୁଲେସନ୍ ଟ୍ରିଗର୍" : "Interactive Simulation Trigger"}
                  </p>
                  <p className="text-[11px] text-muted">
                    {lang === "hi" ? "लाइव पाइपलाइन में आपातकालीन सुरक्षा ड्रिल इंजेक्ट करें" : lang === "or" ? "ଲାଇଭ୍ ପାଇପ୍‌ଲାଇନ୍‌ରେ ସୁରକ୍ଷା ଡ୍ରିଲ୍ ଚଲାନ୍ତୁ" : "Inject an emergency safety drill into the live pipeline"}
                  </p>
                </div>
                <button
                  onClick={triggerHazardDrill}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-md shadow-primary/25 transition hover:bg-primary-strong active:scale-95"
                >
                  <Flame className="h-3.5 w-3.5" />
                  {lang === "hi" ? "ड्रिल ट्रिगर करें" : lang === "or" ? "ଡ୍ରିଲ୍ ଚଲାନ୍ତୁ" : "Simulate Drill"}
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-border/70 bg-surface p-2.5">
                <p className="text-[10px] text-muted">
                  {lang === "hi" ? "कुल ड्रिल्स" : lang === "or" ? "ମୋଟ ଡ୍ରିଲ୍" : "Total Drills"}
                </p>
                <p className="font-mono text-sm font-bold text-foreground">{40 + alertCount}</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-surface p-2.5">
                <p className="text-[10px] text-muted">
                  {lang === "hi" ? "दुर्घटना दर" : lang === "or" ? "ଦୁର୍ଘଟଣା ହାର" : "Incident Rate"}
                </p>
                <p className="font-mono text-sm font-bold text-emerald-500">
                  {lang === "hi" ? "0.00% शून्य" : lang === "or" ? "୦.୦୦% ଶୂନ" : "0.00% Zero"}
                </p>
              </div>
              <div className="rounded-xl border border-border/70 bg-surface p-2.5">
                <p className="text-[10px] text-muted">
                  {lang === "hi" ? "सक्रिय श्रमिक" : lang === "or" ? "ସକ୍ରିୟ ଶ୍ରମିକ" : "Active Workers"}
                </p>
                <p className="font-mono text-sm font-bold text-foreground">
                  {lang === "hi" ? "2,840 लाइव" : lang === "or" ? "୨,୮୪୦ ଲାଇଭ୍" : "2,840 Live"}
                </p>
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
              <span className="text-[10px] text-emerald-400">
                {lang === "hi" ? "स्ट्रीमिंग सक्रिय" : lang === "or" ? "ଷ୍ଟ୍ରିମିଂ ସକ୍ରିୟ" : "STREAMING ACTIVE"}
              </span>
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
                        <span className="rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">
                          {lang === "hi" ? "ड्रिल इंजेक्टेड" : lang === "or" ? "ଡ୍ରିଲ୍ ସକ୍ରିୟ" : "DRILL INJECTED"}
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-400">
                          {lang === "hi" ? "सत्यापित" : lang === "or" ? "ପ୍ରମାଣିତ" : "VERIFIED"}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs">
                      {lang === "hi" ? (log as any).typeHi || log.type : lang === "or" ? (log as any).typeOr || log.type : log.type}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/70">
                      {lang === "hi" ? (log as any).statusHi || log.status : lang === "or" ? (log as any).statusOr || log.status : log.status}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-white/50">
              <span>{lang === "hi" ? "प्रमाणित परिनियोजन: टाटा स्टील · वेदांता · जेएसपीएल" : lang === "or" ? "ପ୍ରମାଣିତ ପ୍ରକଳ୍ପ: ଟାଟା ଷ୍ଟିଲ୍ · ବେଦାନ୍ତା · JSPL" : "Verified Deployment: Tata Steel · Vedanta · JSPL"}</span>
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
  const { lang } = useLanguage();

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
                {lang === "hi" ? "एंटरप्राइज क्लाउड मेश" : lang === "or" ? "ଏଣ୍ଟରପ୍ରାଇଜ୍ କ୍ଲାଉଡ୍ ମେଶ୍" : "Enterprise Cloud Mesh"}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {lang === "hi" ? "हाई-थ्रूपुट ईआरपी इंजन" : lang === "or" ? "ହାଇ-ଥ୍ରୁପୁଟ୍ ERP ଇଞ୍ଜିନ୍" : "High-Throughput ERP Engine"}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {lang === "hi"
                ? "सब-मिलीसेकंड क्वेरी कैश के साथ स्केलेबल माइक्रोसर्विस क्लस्टर, जो पूर्वी भारत और यूएई में 84+ संस्थानों को शक्ति प्रदान करता है।"
                : lang === "or"
                ? "ସବ୍-ମିଲିସେକେଣ୍ଡ କ୍ୟାଶ୍ ସହିତ ସ୍କେଲେବଲ୍ ମାଇକ୍ରୋସର୍ଭିସ୍ କ୍ଲଷ୍ଟର୍, ଯାହା ପୂର୍ବ ଭାରତ ଓ ୟୁଏଇର ୮୪+ ଅନୁଷ୍ଠାନକୁ ପରିଚାଳନା କରେ।"
                : "Built on scalable microservice clusters with sub-millisecond query caches powering 84+ institutions across Eastern India and UAE."}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface-muted/60 p-3">
                <span className="text-xs font-medium text-foreground">
                  {lang === "hi" ? "एपीआई थ्रूपुट (req/sec):" : lang === "or" ? "API ଥ୍ରୁପୁଟ୍ (req/sec):" : "API Throughput (req/sec):"}
                </span>
                <span className="font-mono text-xs font-bold text-primary">4,820 req/s</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface-muted/60 p-3">
                <span className="text-xs font-medium text-foreground">
                  {lang === "hi" ? "रेडिस कैश लेटेंसी:" : lang === "or" ? "ରେଡିସ୍ କ୍ୟାଶ୍ ଲେଟେନ୍ସି:" : "Redis Cache Latency:"}
                </span>
                <span className="font-mono text-xs font-bold text-emerald-500">{dbLatency} ms</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface-muted/60 p-3">
                <span className="text-xs font-medium text-foreground">
                  {lang === "hi" ? "वार्षिक अपटाइम एसएलए:" : lang === "or" ? "ବାର୍ଷିକ ଅପଟାଇମ୍ SLA:" : "Annual Uptime SLA:"}
                </span>
                <span className="font-mono text-xs font-bold text-foreground">
                  {lang === "hi" ? "99.98% उच्च उपलब्धता" : lang === "or" ? "୯୯.୯୮% ନିରବଚ୍ଛିନ୍ନ ସେବା" : "99.98% High Availability"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Architecture Diagram Nodes */}
          <div className="flex flex-col gap-4 rounded-3xl border border-border/90 bg-surface-muted/40 p-6 lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              {lang === "hi" ? "लाइव पाइपलाइन नोड्स" : lang === "or" ? "ଲାଇଭ୍ ପାଇପ୍‌ଲାଇନ୍ ନୋଡ୍" : "Live Pipeline Nodes"}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-primary/30 bg-surface p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Server className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-foreground">Edge CDN &amp; Nginx</h4>
                <p className="mt-1 text-[11px] text-muted">
                  {lang === "hi" ? "एसएसएल एवं डीडीओएस शील्ड" : lang === "or" ? "SSL ଓ DDoS ସୁରକ୍ଷା" : "SSL Termination & DDoS Shield"}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-500">
                  <CheckCircle2 className="h-3 w-3" />
                  {lang === "hi" ? "स्वस्थ" : lang === "or" ? "ସକ୍ରିୟ" : "Healthy"}
                </div>
              </div>

              <div className="rounded-2xl border border-primary/30 bg-surface p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Cpu className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-foreground">Node/Python Microservices</h4>
                <p className="mt-1 text-[11px] text-muted">
                  {lang === "hi" ? "ऑटो-स्केलिंग डॉकर पॉड्स" : lang === "or" ? "ଅଟୋ-ସ୍କେଲିଂ ଡକର୍ ପଡ୍‌ସ୍" : "Auto-Scaling Docker Pods"}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-500">
                  <CheckCircle2 className="h-3 w-3" />
                  {lang === "hi" ? "16 पॉड्स लाइव" : lang === "or" ? "୧୬ଟି ପଡ୍ ଲାଇଭ୍" : "16 Pods Live"}
                </div>
              </div>

              <div className="rounded-2xl border border-primary/30 bg-surface p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Database className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-foreground">PostgreSQL &amp; Redis</h4>
                <p className="mt-1 text-[11px] text-muted">
                  {lang === "hi" ? "एसीआईडी मल्टी-एज़ेड रेप्लिकेशन" : lang === "or" ? "ACID ମଲ୍ଟି-AZ ପ୍ରତିରୂପଣ" : "ACID Multi-AZ Replication"}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-500">
                  <CheckCircle2 className="h-3 w-3" /> 0.8ms Query
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-surface p-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted">
                {lang === "hi" ? "कुल प्रोसेस्ड अनुरोध:" : lang === "or" ? "ମୋଟ ପ୍ରକ୍ରିୟାକୃତ ଅନୁରୋଧ:" : "Total Requests Processed:"}
              </span>
              <span className="font-mono text-sm font-bold text-primary">{requestCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
