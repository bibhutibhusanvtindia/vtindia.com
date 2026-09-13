"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Glasses,
  Globe,
  Layers,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/lib/translations";

const PLATFORMS_MAP = {
  en: [
    { id: "vr-spatial", name: "AR / VR & Spatial 3D", icon: Glasses, desc: "6-DOF hazard training, digital twins, or WebXR" },
    { id: "enterprise-web", name: "Enterprise Web & Cloud", icon: Globe, desc: "High-concurrency ERP, CRM, or SaaS platform" },
    { id: "mobile-apps", name: "Mobile Applications", icon: Smartphone, desc: "Native iOS & Android or Flutter multi-platform" },
    { id: "campus-erp", name: "Institutional Campus Suite", icon: Layers, desc: "Education ERP, library, and examination systems" },
  ],
  hi: [
    { id: "vr-spatial", name: "एआर/वीआर एवं स्पेशियल 3D", icon: Glasses, desc: "6-DoF खतरा प्रशिक्षण, डिजिटल ट्विन्स एवं वेबएक्सआर" },
    { id: "enterprise-web", name: "एंटरप्राइज वेब एवं क्लाउड", icon: Globe, desc: "उच्च समवर्ती ईआरपी, सीआरएम अथवा सास प्लेटफॉर्म" },
    { id: "mobile-apps", name: "मोबाइल ऐप्स", icon: Smartphone, desc: "नेटिव आईओएस, एंड्रॉइड अथवा फ्लटर ऐप्स" },
    { id: "campus-erp", name: "संस्थागत कैंपस ईआरपी", icon: Layers, desc: "शिक्षा ईआरपी, डिजिटल लाइब्रेरी और परीक्षा प्रणाली" },
  ],
  or: [
    { id: "vr-spatial", name: "AR/VR ଓ ସ୍ପାସିଆଲ୍ 3D", icon: Glasses, desc: "6-DoF ନିରାପତ୍ତା ପ୍ରଶିକ୍ଷଣ, ଡିଜିଟାଲ୍ ଟ୍ୱିନ୍ ଓ WebXR" },
    { id: "enterprise-web", name: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ୱେବ୍ ଓ କ୍ଲାଉଡ୍", icon: Globe, desc: "ଉଚ୍ଚ ଟ୍ରାଫିକ୍ ERP, CRM ବା SaaS ପ୍ଲାଟଫର୍ମ" },
    { id: "mobile-apps", name: "ମୋବାଇଲ୍ ଆପ୍ଲିକେସନ୍", icon: Smartphone, desc: "ନେଟିଭ୍ iOS, Android ବା Flutter ଆପ୍" },
    { id: "campus-erp", name: "ସାଂସ୍ଥାନିକ କ୍ୟାମ୍ପସ୍ ସୁଇଟ୍", icon: Layers, desc: "ଶିକ୍ଷା ERP, ଲାଇବ୍ରେରୀ ଓ ପରୀକ୍ଷା ପରିଚାଳନା" },
  ],
};

const SCALES_MAP = {
  en: [
    { id: "pilot", name: "Pilot / MVP Deployment", time: "4 - 8 Weeks", desc: "Rapid prototype or initial facility rollout" },
    { id: "facility", name: "Full Enterprise Deployment", time: "2 - 4 Months", desc: "Multi-facility production deployment with SLAs" },
    { id: "institutional", name: "Multi-Location Enterprise Network", time: "3 - 6 Months", desc: "State-wide or nationwide enterprise infrastructure" },
  ],
  hi: [
    { id: "pilot", name: "पायलट / एमवीपी परिनियोजन", time: "4 - 8 सप्ताह", desc: "त्वरित प्रोटोटाइप अथवा प्रारंभिक चरण" },
    { id: "facility", name: "पूर्ण एंटरप्राइज परिनियोजन", time: "2 - 4 महीने", desc: "एसएलए गारंटी के साथ बहु-संयंत्र परिनियोजन" },
    { id: "institutional", name: "बहु-स्थान नेटवर्क", time: "3 - 6 महीने", desc: "राज्यव्यापी अथवा राष्ट्रव्यापी अवसंरचना" },
  ],
  or: [
    { id: "pilot", name: "ପାଇଲଟ୍ / MVP ନିୟୋଜନ", time: "୪ - ୮ ସପ୍ତାହ", desc: "ଦ୍ରୁତ ପ୍ରୋଟୋଟାଇପ୍ ବା ପ୍ରାରମ୍ଭିକ ପର୍ଯ୍ୟାୟ" },
    { id: "facility", name: "ସମ୍ପୂର୍ଣ୍ଣ ଏଣ୍ଟରପ୍ରାଇଜ୍ ନିୟୋଜନ", time: "୨ - ୪ ମାସ", desc: "SLA ସହ ବହୁମୁଖୀ ଉତ୍ପାଦନ ନିୟୋଜନ" },
    { id: "institutional", name: "ବହୁ-କେନ୍ଦ୍ରୀୟ ନେଟୱର୍କ", time: "୩ - ୬ ମାସ", desc: "ରାଜ୍ୟସ୍ତରୀୟ ବା ଜାତୀୟ ଭିତ୍ତିଭୂମି" },
  ],
};

const MODULES_MAP = {
  en: [
    { id: "iot", label: "Real-time IoT Telemetry Sync", tag: "Hardware Bridge" },
    { id: "biometrics", label: "Biometric & Reaction Analytics", tag: "Safety / LMS" },
    { id: "sla", label: "24/7 Dedicated Support & SLA", tag: "Enterprise Support" },
    { id: "iso", label: "ISO 9001 Compliance Code Audit", tag: "Governance" },
  ],
  hi: [
    { id: "iot", label: "रीयल-टाइम आईओटी टेलीमेट्री सिंक", tag: "हार्डवेयर ब्रिज" },
    { id: "biometrics", label: "बायोमेट्रिक एवं रिएक्शन एनालिटिक्स", tag: "सुरक्षा / एलएमएस" },
    { id: "sla", label: "24/7 समर्पित सहायता एवं एसएलए", tag: "एंटरप्राइज सपोर्ट" },
    { id: "iso", label: "आईएसओ 9001 कोड ऑडिट", tag: "अनुपालन" },
  ],
  or: [
    { id: "iot", label: "ରିଅଲ୍-ଟାଇମ୍ IoT ଟେଲିମେଟ୍ରି ସିଙ୍କ୍", tag: "ହାର୍ଡୱେର୍ ବ୍ରିଜ୍" },
    { id: "biometrics", label: "ବାୟୋମେଟ୍ରିକ୍ ଓ ରିଆକ୍ସନ୍ ଆନାଲିଟିକ୍ସ", tag: "ନିରାପତ୍ତା / LMS" },
    { id: "sla", label: "୨୪/୭ ଉତ୍ସର୍ଗୀକୃତ ସପୋର୍ଟ ଓ SLA", tag: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ସପୋର୍ଟ" },
    { id: "iso", label: "ISO 9001 କୋଡ୍ ଅଡିଟ୍", tag: "ଅନୁପାଳନ" },
  ],
};

export function ProjectConfigurator() {
  const [selectedPlatform, setSelectedPlatform] = useState("vr-spatial");
  const [selectedScale, setSelectedScale] = useState("facility");
  const [selectedModules, setSelectedModules] = useState<string[]>(["sla", "iot"]);
  const { lang, t } = useLanguage();

  const platforms = PLATFORMS_MAP[lang] || PLATFORMS_MAP.en;
  const scales = SCALES_MAP[lang] || SCALES_MAP.en;
  const modules = MODULES_MAP[lang] || MODULES_MAP.en;

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const currentPlatform = platforms.find((p) => p.id === selectedPlatform) || platforms[0];
  const currentScale = scales.find((s) => s.id === selectedScale) || scales[0];

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
              {t("config_badge")}
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {lang === "hi" ? (
                <>
                  अपने एंटरप्राइज समाधान को <span className="gradient-text">कॉन्फ़िगर करें</span>
                </>
              ) : lang === "or" ? (
                <>
                  ଆପଣଙ୍କ ଏଣ୍ଟରପ୍ରାଇଜ୍ ସଫ୍ଟୱେର୍ <span className="gradient-text">କନଫିଗର୍ କରନ୍ତୁ</span>
                </>
              ) : (
                <>
                  Configure Your <span className="gradient-text">Enterprise Architecture</span>
                </>
              )}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
              {t("config_desc")}
            </p>
          </div>
        </div>

        {/* 3-Step Interactive Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Left Controls: 7 Cols */}
          <div className="space-y-8 lg:col-span-7">
            {/* Step 1: Platform Selection */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                {lang === "hi"
                  ? "चरण 01 · समाधान प्लेटफॉर्म चुनें"
                  : lang === "or"
                  ? "ପଦକ୍ଷେପ ୦୧ · ସମାଧାନ ପ୍ଲାଟଫର୍ମ ଚୟନ କରନ୍ତୁ"
                  : "Step 01 · Select Solution Platform"}
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {platforms.map((plat) => {
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
                {lang === "hi"
                  ? "चरण 02 · परिनियोजन स्तर एवं समयसीमा"
                  : lang === "or"
                  ? "ପଦକ୍ଷେପ ୦୨ · ନିୟୋଜନ ସ୍ତର ଓ ସମୟସୀମା"
                  : "Step 02 · Deployment Scale & Scope"}
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {scales.map((scale) => {
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
                {lang === "hi"
                  ? "चरण 03 · एंटरप्राइज एड-ऑन मॉड्यूल"
                  : lang === "or"
                  ? "ପଦକ୍ଷେପ ୦୩ · ଏଣ୍ଟରପ୍ରାଇଜ୍ ମଡ୍ୟୁଲ୍"
                  : "Step 03 · Enterprise Add-On Capabilities"}
              </p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {modules.map((mod) => {
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
                    {lang === "hi"
                      ? "कस्टम आर्किटेक्चर ब्लूप्रिंट"
                      : lang === "or"
                      ? "କଷ୍ଟମ୍ ଆର୍କିଟେକ୍ଚର ବ୍ଲୁପ୍ରିଣ୍ଟ"
                      : "Custom Architecture Blueprint"}
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-600">
                  {lang === "hi" ? "परिनियोजन के लिए तैयार" : lang === "or" ? "ନିୟୋଜନ ପାଇଁ ପ୍ରସ୍ତୁତ" : "Ready to Deploy"}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-[11px] font-semibold text-muted">
                    {lang === "hi" ? "चयनित डोमेन:" : lang === "or" ? "ଚୟନିତ ଡୋମେନ୍:" : "Selected Domain:"}
                  </p>
                  <p className="mt-0.5 text-base font-bold text-foreground">{currentPlatform.name}</p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted">
                    {lang === "hi" ? "अनुमानित समयसीमा:" : lang === "or" ? "ଆନୁମାନିକ ସମୟସୀମା:" : "Estimated Timeline:"}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-mono text-sm font-bold text-foreground">{currentScale.time}</span>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-muted">
                    {lang === "hi"
                      ? `सक्रिय एंटरप्राइज मॉड्यूल (${selectedModules.length}):`
                      : lang === "or"
                      ? `ସକ୍ରିୟ ଏଣ୍ଟରପ୍ରାଇଜ୍ ମଡ୍ୟୁଲ୍ (${selectedModules.length}):`
                      : `Active Enterprise Modules (${selectedModules.length}):`}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {selectedModules.map((mId) => {
                      const m = modules.find((mod) => mod.id === mId);
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
                  <p className="text-xs font-bold text-primary">
                    {lang === "hi"
                      ? "विर्टॉय इंजीनियरिंग गारंटी"
                      : lang === "or"
                      ? "ଭର୍ଚ୍ଚୋଏ ଇଞ୍ଜିନିୟରିଂ ଗ୍ୟାରେଣ୍ଟି"
                      : "Virtoy Engineering Guarantee"}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    {lang === "hi"
                      ? "आईआईटी पूर्व छात्रों द्वारा निर्मित · 99.8% अपटाइम · कोलकाता एवं भुवनेश्वर से 24/7 सहायता।"
                      : lang === "or"
                      ? "ଆଇଆଇଟି ପ୍ରତିଭାଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ · ୯୯.୮% ଅପଟାଇମ୍ · କୋଲକାତା ଓ ଭୁବନେଶ୍ୱରରୁ ସହାୟତା।"
                      : "Engineered by IIT alumni · 99.8% proven uptime · Direct support from Kolkata HQ & Bhubaneswar O-HUB."}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-strong"
                >
                  <span>
                    {lang === "hi"
                      ? "तकनीकी प्रस्ताव प्राप्त करें"
                      : lang === "or"
                      ? "ବୈଷୟିକ ପ୍ରସ୍ତାବ ପ୍ରାପ୍ତ କରନ୍ତୁ"
                      : "Request Technical Proposal"}
                  </span>
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
