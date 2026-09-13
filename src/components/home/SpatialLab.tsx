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

const VR_MODULES_MAP: Record<"en" | "hi" | "or", VRModule[]> = {
  en: [
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
  ],
  hi: [
    {
      id: "safeact-vr",
      title: "सेफएक्ट इंडस्ट्रियल वीआर हैज़र्ड सिमुलेटर",
      category: "भारी उद्योग एवं खनन सुरक्षा",
      badge: "एंटरप्राइज फ्लैगशिप",
      description:
        "टाटा स्टील और वेदांता के लिए विकसित 6-DoF वर्चुअल रियलिटी ट्रेनिंग प्लेटफॉर्म, जो बिना किसी शारीरिक जोखिम के खतरनाक औद्योगिक परिदृश्यों का सटीक सिमुलेशन प्रदान करता है।",
      image: "/images/hero/hero-vr.jpg",
      metrics: [
        { label: "खतरा परिदृश्य", value: "40+ वास्तविक परिदृश्य" },
        { label: "दुर्घटना कमी", value: "92% स्मरण दर" },
        { label: "सिमुलेशन सटीकता", value: "भौतिकी आधारित" },
      ],
      features: [
        "गतिशील आग, रासायनिक और ऊंचाई खतरा परिदृश्य",
        "रीयल-टाइम बायोमेट्रिक और रिएक्शन-टाइम स्कोरिंग",
        "बहु-उपयोगकर्ता आपातकालीन निकासी अभ्यास",
        "एलएमएस एकीकरण एवं स्वचालित अनुपालन प्रमाणन",
      ],
      headsets: ["Meta Quest 3 / Pro", "HTC Vive Focus 3", "Apple Vision Pro", "WebXR"],
    },
    {
      id: "spatial-digital-twin",
      title: "स्पेशियल 3D डिजिटल ट्विन एवं फैक्ट्री फ्लोर",
      category: "स्मार्ट मैन्युफैक्चरिंग एवं आर्किटेक्चर",
      badge: "स्पेशियल 3D",
      description:
        "रीयल-टाइम आईओटी टेलीमेट्री, बीआईएम एकीकरण और स्पेशियल नेविगेशन के साथ इंटरएक्टिव 3D डिजिटल ट्विन्स एवं आर्किटेक्चरल वॉकथ्रू।",
      image: "/images/hero/hero-developer.jpg",
      metrics: [
        { label: "रेंडरिंग इंजन", value: "Unreal 5 एवं Unity" },
        { label: "फ्रेम दर", value: "90 FPS स्थिर" },
        { label: "आईओटी सिंक्रोनाइज़ेशन", value: "<50ms लेटेंसी" },
      ],
      features: [
        "फोटो-रियलिस्टिक रीयल-टाइम सीएडी / बीआईएम मॉडल",
        "3D स्पेस में लाइव सेंसर डेटा ओवरले",
        "इंटरएक्टिव कोलिशन डिटेक्शन वॉकथ्रू",
        "क्रॉस-प्लेटफॉर्म वेबजीएल व स्टैंडअलोन सॉफ्टवेयर",
      ],
      headsets: ["Meta Quest 3", "PC VR / HTC Vive", "Apple Vision Pro", "WebGL"],
    },
    {
      id: "medical-xr",
      title: "मेडिकल एवं सर्जिकल एक्सआर प्रशिक्षण",
      category: "हेल्थकेयर एवं एनाटॉमी सिमुलेशन",
      badge: "क्लिनिकल XR",
      description:
        "मेडिकल कॉलेजों और स्वास्थ्य संस्थानों के लिए उच्च-सटीक 3D एनाटॉमिकल मॉडलिंग और सर्जिकल प्रक्रिया सिमुलेशन।",
      image: "/images/hero/hero-mobile.jpg",
      metrics: [
        { label: "एनाटॉमिकल सटीकता", value: "सब-मिलीमीटर" },
        { label: "हैप्टिक फीडबैक", value: "समर्थित" },
        { label: "मल्टी-प्लेटफॉर्म", value: "iOS / Android / XR" },
      ],
      features: [
        "इंटरएक्टिव 3D अंग मैनिपुलेशन",
        "चरण-दर-चरण निर्देशित सर्जिकल वर्कफ़्लो",
        "बहु-छात्र सहयोगात्मक परीक्षा कक्ष",
        "व्यापक स्कोरिंग और प्रदर्शन विश्लेषण",
      ],
      headsets: ["Meta Quest 3", "Apple Vision Pro", "Tablet AR", "WebXR"],
    },
  ],
  or: [
    {
      id: "safeact-vr",
      title: "ସେଫ୍‌ଆକ୍ଟ ଶିଳ୍ପ VR ବିପଦ ସିମ୍ୟୁଲେଟର",
      category: "ଭାରୀ ଶିଳ୍ପ ଓ ଖଣି ନିରାପତ୍ତା",
      badge: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ଫ୍ଲାଗ୍‌ସିପ୍",
      description:
        "ଟାଟା ଷ୍ଟିଲ୍ ଓ ବେଦାନ୍ତା ପାଇଁ ନିୟୋଜିତ ୬-DoF ଭର୍ଚ୍ଚୁଆଲ୍ ରିଆଲିଟି ପ୍ରଶିକ୍ଷଣ ପ୍ଲାଟଫର୍ମ, ଯାହା ଶୂନ୍ୟ ବିପଦରେ ଶିଳ୍ପ ଦୁର୍ଘଟଣାର ସଠିକ୍ ସିମ୍ୟୁଲେସନ୍ ପ୍ରଦାନ କରେ।",
      image: "/images/hero/hero-vr.jpg",
      metrics: [
        { label: "ବିପଦ ଦୃଶ୍ୟାବଳୀ", value: "୪୦+ ବାସ୍ତବ ଡ୍ରିଲ୍" },
        { label: "ଦୁର୍ଘଟଣା ହ୍ରାସ", value: "୯୨% ସ୍ମରଣ ହାର" },
        { label: "ସଠିକତା", value: "ଭୌତିକ ବିଜ୍ଞାନ ଆଧାରିତ" },
      ],
      features: [
        "ନିଆଁ, ରାସାୟନିକ ଓ ଉଚ୍ଚତା ବିପଦର ରିଅଲ୍-ଟାଇମ୍ ଡ୍ରିଲ୍",
        "ବାୟୋମେଟ୍ରିକ୍ ଓ ରିଆକ୍ସନ୍ ସ୍କୋରିଂ ସିଷ୍ଟମ୍",
        "ବହୁ-ଉପଭୋକ୍ତା ଜରୁରୀକାଳୀନ ଉଦ୍ଧାର ଅଭ୍ୟାସ",
        "LMS ସଂଯୋଗ ଓ ସ୍ୱୟଂଚାଳିତ ପ୍ରମାଣପତ୍ର",
      ],
      headsets: ["Meta Quest 3 / Pro", "HTC Vive Focus 3", "Apple Vision Pro", "WebXR"],
    },
    {
      id: "spatial-digital-twin",
      title: "ସ୍ପାସିଆଲ୍ 3D ଡିଜିଟାଲ୍ ଟ୍ୱିନ୍ ଓ କାରଖାନା ମଡେଲ୍",
      category: "ସ୍ମାର୍ଟ ଉତ୍ପାଦନ ଓ ଆର୍କିଟେକ୍ଚର",
      badge: "ସ୍ପାସିଆଲ୍ 3D",
      description:
        "ରିଅଲ୍-ଟାଇମ୍ IoT ଟେଲିମେଟ୍ରି, BIM ଇଣ୍ଟିଗ୍ରେସନ୍ ସହ ଇଣ୍ଟରାକ୍ଟିଭ୍ 3D ଡିଜିଟାଲ୍ ଟ୍ୱିନ୍ ଓ କାରଖାନା ୱାକ୍‌ଥ୍ରୁ।",
      image: "/images/hero/hero-developer.jpg",
      metrics: [
        { label: "ରେଣ୍ଡରିଂ ଇଞ୍ଜିନ୍", value: "Unreal 5 ଓ Unity" },
        { label: "ଫ୍ରେମ୍ ରେଟ୍", value: "୯୦ FPS ସ୍ଥିର" },
        { label: "IoT ସମନ୍ୱୟ", value: "<୫୦ms ଲେଟେନ୍ସି" },
      ],
      features: [
        "ଫଟୋ-ରିଅଲିଷ୍ଟିକ୍ CAD / BIM ଆସେଟ୍ ପ୍ରୋସେସିଂ",
        "3D ସ୍ପେସ୍‌ରେ ଲାଇଭ୍ ସେନ୍ସର ଡାଟା ପ୍ରଦର୍ଶନ",
        "ଇଣ୍ଟରାକ୍ଟିଭ୍ କଲିଜନ୍ ଡିଟେକ୍ସନ୍",
        "କ୍ରସ୍-ପ୍ଲାଟଫର୍ମ WebGL ଓ ସଫ୍ଟୱେର୍",
      ],
      headsets: ["Meta Quest 3", "PC VR / HTC Vive", "Apple Vision Pro", "WebGL"],
    },
    {
      id: "medical-xr",
      title: "ଚିକିତ୍ସା ଓ ଶଲ୍ୟକର୍ମ XR ପ୍ରଶିକ୍ଷଣ",
      category: "ସ୍ୱାସ୍ଥ୍ୟସେବା ଓ ଶରୀରବିଜ୍ଞାନ",
      badge: "କ୍ଲିନିକାଲ୍ XR",
      description:
        "ମେଡିକାଲ୍ କଲେଜ ଓ ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରତିଷ୍ଠାନ ପାଇଁ ଉଚ୍ଚ-ସଠିକ 3D ଆନାଟୋମି ଏବଂ ଶଲ୍ୟଚିକିତ୍ସା ପ୍ରଣାଳୀ ସିମ୍ୟୁଲେସନ୍।",
      image: "/images/hero/hero-mobile.jpg",
      metrics: [
        { label: "ଆନାଟୋମିକାଲ୍ ସଠିକତା", value: "ସବ୍-ମିଲିମିଟର" },
        { label: "ହାପ୍ଟିକ୍ ଫିଡ୍‌ବ୍ୟାକ୍", value: "ସମର୍ଥିତ" },
        { label: "ମଲ୍ଟି-ପ୍ଲାଟଫର୍ମ", value: "iOS / Android / XR" },
      ],
      features: [
        "ଇଣ୍ଟରାକ୍ଟିଭ୍ 3D ଅଙ୍ଗ ପ୍ରତ୍ୟଙ୍ଗ ପରିଚାଳନା",
        "ପର୍ଯ୍ୟାୟକ୍ରମେ ଅସ୍ତ୍ରୋପଚାର ପ୍ରଶିକ୍ଷଣ",
        "ବହୁ-ଛାତ୍ର ସହଯୋଗୀ ପରୀକ୍ଷା କକ୍ଷ",
        "ବ୍ୟାପକ ସ୍କୋରିଂ ଓ ମୂଲ୍ୟାଙ୍କନ ରିପୋର୍ଟ",
      ],
      headsets: ["Meta Quest 3", "Apple Vision Pro", "Tablet AR", "WebXR"],
    },
  ],
};

import { useLanguage } from "@/lib/translations";

export function SpatialLab() {
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState<"3d-sandbox" | "field-case">("3d-sandbox");
  const { lang, t } = useLanguage();
  const modules = VR_MODULES_MAP[lang] || VR_MODULES_MAP.en;
  const activeModule = modules[activeTab] || modules[0];

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
              {t("spatial_badge")}
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {lang === "hi" ? (
                <>
                  शून्य-जोखिम प्रशिक्षण के लिए <span className="gradient-text">इमर्सिव सिमुलेशन</span>
                </>
              ) : lang === "or" ? (
                <>
                  ବିପଦମୁକ୍ତ ପ୍ରଶିକ୍ଷଣ ପାଇଁ <span className="gradient-text">ଇମର୍ସିଭ୍ ସିମ୍ୟୁଲେସନ୍</span>
                </>
              ) : (
                <>
                  Immersive Simulations for <span className="gradient-text">Zero-Risk Mastery</span>
                </>
              )}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
              {t("spatial_desc")}
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
                {lang === "hi" ? "लाइव 3D स्टूडियो" : lang === "or" ? "ଲାଇଭ୍ 3D ଷ୍ଟୁଡିଓ" : "Live 3D WebXR Studio"}
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
                {lang === "hi" ? "फील्ड परिनियोजन" : lang === "or" ? "ପ୍ରକଳ୍ପ ସମୂହ" : "Field Deployments"}
              </button>
            </div>

            <Reveal delay={0.1}>
              <Link
                href="/products/virtual-reality"
                className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface px-5 py-2.5 text-xs font-semibold shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
              >
                {lang === "hi" ? "वीआर विवरण" : lang === "or" ? "ଭିଆର୍ ବିବରଣୀ" : "VR Overview"}
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
              {modules.map((mod, idx) => (
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
                        <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                          {lang === "hi" ? "क्षमताएं एवं आर्किटेक्चर" : lang === "or" ? "କ୍ଷମତା ଓ ଆର୍କିଟେକ୍ଚର" : "Capabilities & Architecture"}
                        </p>
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
                        <span className="text-xs font-semibold text-foreground">
                          {lang === "hi" ? "समर्थित हेडसेट:" : lang === "or" ? "ସମର୍ଥିତ ହେଡ୍‌ସେଟ୍:" : "Hardware Target:"}
                        </span>
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
                            <span className="font-mono text-xs font-semibold text-white">
                              {lang === "hi" ? "स्पेशियल टेलीमेट्री सक्रिय" : lang === "or" ? "ସ୍ପାସିଆଲ୍ ଟେଲିମେଟ୍ରି ସକ୍ରିୟ" : "Spatial Telemetry Active"}
                            </span>
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
