"use client";

import { useEffect, useState } from "react";
import {
  Server,
  Activity,
  ShieldCheck,
  Zap,
  Radio,
  Globe,
  Lock,
  Cpu,
  RefreshCw,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { playHapticBeep } from "@/lib/sound";

interface ServerNode {
  name: string;
  location: string;
  role: string;
  status: string;
  baseLatency: number;
}

const NODES_MAP: Record<"en" | "hi" | "or", ServerNode[]> = {
  en: [
    {
      name: "Bhubaneswar O-HUB Cluster",
      location: "Odisha, India",
      role: "Spatial WebXR & R&D Simulation Engine",
      status: "Operational",
      baseLatency: 12,
    },
    {
      name: "Kolkata HQ Datacenter",
      location: "West Bengal, India",
      role: "Primary Enterprise ERP & Core Services Hub",
      status: "Optimal",
      baseLatency: 15,
    },
    {
      name: "Asia-Pacific Cloud Gateway",
      location: "Mumbai / UAE Edge",
      role: "Multi-Region Redundancy & High-Availability API",
      status: "Optimal",
      baseLatency: 22,
    },
  ],
  hi: [
    {
      name: "भुवनेश्वर ओ-हब क्लस्टर",
      location: "ओडिशा, भारत",
      role: "स्पेशियल वेबएक्सआर एवं अनुसंधान सिमुलेशन इंजन",
      status: "सक्रिय परिचालन",
      baseLatency: 12,
    },
    {
      name: "कोलकाता मुख्यालय डेटा सेंटर",
      location: "पश्चिम बंगाल, भारत",
      role: "मुख्य एंटरप्राइज ईआरपी एवं कोर सेवा हब",
      status: "इष्टतम स्थिति",
      baseLatency: 15,
    },
    {
      name: "एशिया-प्रशांत क्लाउड गेटवे",
      location: "मुंबई / यूएई एज",
      role: "बहु-क्षेत्रीय रिडंडेंसी एवं उच्च-उपलब्धता एपीआई",
      status: "इष्टतम स्थिति",
      baseLatency: 22,
    },
  ],
  or: [
    {
      name: "ଭୁବନେଶ୍ୱର O-HUB କ୍ଲଷ୍ଟର୍",
      location: "ଓଡ଼ିଶା, ଭାରତ",
      role: "ସ୍ପାସିଆଲ୍ WebXR ଓ ଗବେଷଣା ସିମ୍ୟୁଲେସନ୍ ଇଞ୍ଜିନ୍",
      status: "ସକ୍ରିୟ ପରିଚାଳନା",
      baseLatency: 12,
    },
    {
      name: "କୋଲକାତା ମୁଖ୍ୟାଳୟ ଡାଟା ସେଣ୍ଟର୍",
      location: "ପଶ୍ଚିମବଙ୍ଗ, ଭାରତ",
      role: "ମୁଖ୍ୟ ଏଣ୍ଟରପ୍ରାଇଜ୍ ERP ଓ ସେବା ହବ୍",
      status: "ସର୍ବୋତ୍ତମ ସ୍ଥିତି",
      baseLatency: 15,
    },
    {
      name: "ଏସିଆ-ପ୍ରଶାନ୍ତ କ୍ଲାଉଡ୍ ଗେଟୱେ",
      location: "ମୁମ୍ବାଇ / ୟୁଏଇ",
      role: "ବହୁ-ଆଞ୍ଚଳିକ ନିରବଚ୍ଛିନ୍ନ API ନେଟୱର୍କ",
      status: "ସର୍ବୋତ୍ତମ ସ୍ଥିତି",
      baseLatency: 22,
    },
  ],
};

import { useLanguage } from "@/lib/translations";

export function LiveTelemetryCenter() {
  const [latencies, setLatencies] = useState<number[]>([12, 15, 22]);
  const [lastPingTime, setLastPingTime] = useState<string>("Just now");
  const [isPinging, setIsPinging] = useState(false);
  const { lang, t } = useLanguage();

  const nodes = NODES_MAP[lang] || NODES_MAP.en;

  // Live slight ping jitter simulation
  const refreshPings = () => {
    setIsPinging(true);
    playHapticBeep(780, 0.04);
    setTimeout(() => {
      setLatencies(
        nodes.map((node) => node.baseLatency + Math.floor(Math.random() * 5 - 2))
      );
      setLastPingTime(new Date().toLocaleTimeString());
      setIsPinging(false);
    }, 400);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLatencies(
        nodes.map((node) => node.baseLatency + Math.floor(Math.random() * 5 - 2))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [nodes]);

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted/50 py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t("telemetry_badge")}
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {t("telemetry_title")}
            </h2>
            <p className="mt-2 text-sm text-muted sm:text-base">
              {t("telemetry_desc")}
            </p>
          </div>

          <button
            onClick={refreshPings}
            disabled={isPinging}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-foreground shadow-sm transition hover:border-primary hover:text-primary"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-primary ${isPinging ? "animate-spin" : ""}`} />
            <span>{lang === "hi" ? "सभी क्लस्टर्स पिंग करें" : lang === "or" ? "ସମସ୍ତ କ୍ଲଷ୍ଟର୍ ପିଙ୍ଗ୍ କରନ୍ତୁ" : "Ping All Clusters"}</span>
          </button>
        </div>

        {/* 3 Node Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {nodes.map((node, i) => (
            <SpotlightCard key={node.name} enableTilt={false} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-xs font-bold text-emerald-600">
                    {node.status}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-primary">
                  {latencies[i]} ms
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold text-foreground sm:text-lg">
                {node.name}
              </h3>
              <p className="text-xs text-muted">{node.location}</p>

              <div className="mt-4 border-t border-border/80 pt-3">
                <p className="text-[11px] leading-relaxed text-muted">{node.role}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Security & Reliability SLA Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-surface p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>
                {lang === "hi"
                  ? "ISO 9001:2015 गुणवत्ता प्रमाणित"
                  : lang === "or"
                  ? "ISO 9001:2015 ଗୁଣବତ୍ତା ପ୍ରମାଣିତ"
                  : "ISO 9001:2015 Quality Certified"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              <span>
                {lang === "hi"
                  ? "TLS 1.3 एवं एंड-टू-एंड एन्क्रिप्शन"
                  : lang === "or"
                  ? "TLS 1.3 ଓ ଏଣ୍ଡ-ଟୁ-ଏଣ୍ଡ ଏନକ୍ରିପସନ୍"
                  : "TLS 1.3 & End-to-End Encryption"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>
                {lang === "hi"
                  ? "99.98% गारंटीड अपटाइम एसएलए"
                  : lang === "or"
                  ? "୯୯.୯୮% ଗ୍ୟାରେଣ୍ଟିଡ୍ ଅପଟାଇମ୍ SLA"
                  : "99.98% Guaranteed Uptime SLA"}
              </span>
            </div>
          </div>

          <span className="font-mono text-[11px] text-muted">
            {lang === "hi" ? "अंतिम पिंग:" : lang === "or" ? "ଶେଷ ପିଙ୍ଗ୍:" : "Last Ping:"} {lastPingTime}
          </span>
        </div>
      </Container>
    </section>
  );
}
