"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Factory,
  GraduationCap,
  HeartPulse,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/lib/translations";

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

const CASE_STUDIES_MAP: Record<"en" | "hi" | "or", CaseStudy[]> = {
  en: [
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
  ],
  hi: [
    {
      id: "tata-steel-safeact",
      client: "टाटा स्टील एवं भारी औद्योगिक संयंत्र",
      industry: "स्टील एवं खनन सुरक्षा",
      badge: "औद्योगिक सुरक्षा वीआर",
      icon: Factory,
      headline: "6-DoF वीआर सिमुलेशन द्वारा शून्य-दुर्घटना सुरक्षा परिवर्तन",
      challenge:
        "ब्लास्ट फर्नेस और सीमित स्थानों में रखरखाव प्रशिक्षण में वास्तविक जोखिम और कम स्मरण दर थी।",
      solution:
        "40+ फिजिक्स-आधारित सिमुलेशन और बायोमेट्रिक स्कोरिंग के साथ सेफएक्ट वीआर तैनात किया गया।",
      results: [
        { metric: "92%", label: "प्रशिक्षण स्मरण दर" },
        { metric: "0", label: "प्रशिक्षण दुर्घटनाएं" },
        { metric: "100%", label: "ऑडिट अनुपालन" },
      ],
      tags: ["SafeAct VR", "Meta Quest 3", "LMS Integration", "Tata Steel"],
    },
    {
      id: "campus-erp-odisha",
      client: "सरकारी एवं ऑटोनॉमस विश्वविद्यालय",
      industry: "उच्च शिक्षा",
      badge: "कैंपस डिजिटलीकरण",
      icon: GraduationCap,
      headline: "40,000+ छात्रों के लिए एकीकृत डिजिटल कैंपस एवं परीक्षा ईआरपी",
      challenge:
        "कागजी रजिस्टर, बिखरा हुआ फीस संग्रह और धीमी परीक्षा ग्रेडिंग के कारण प्रशासनिक बाधाएं।",
      solution:
        "पेपरलेस एडमिशन, स्वचालित फीस गेटवे, बारकोड हॉल-टिकट और डिजिटल मूल्यांकन ईआरपी लागू किया।",
      results: [
        { metric: "40K+", label: "दैनिक सक्रिय उपयोगकर्ता" },
        { metric: "85%", label: "प्रशासनिक समय की बचत" },
        { metric: "100%", label: "सटीक फीस समाधान" },
      ],
      tags: ["Education ERP", "Next.js & Postgres", "High Availability", "Campus Suite"],
    },
    {
      id: "hospital-hms",
      client: "क्षेत्रीय स्वास्थ्य सेवा एवं अस्पताल",
      industry: "स्वास्थ्य अवसंरचना",
      badge: "चिकित्सीय विश्वसनीयता",
      icon: HeartPulse,
      headline: "तत्काल मरीज रिकॉर्ड प्राप्ति एवं शून्य डाउनटाइम फार्मेसी प्रबंधन",
      challenge:
        "ओपीडी पीक घंटों में बिना किसी क्लाउड देरी के मजबूत और विश्वसनीय डिजिटल रिकॉर्ड की आवश्यकता थी।",
      solution:
        "सब-मिलीसेकंड लोकल कैशिंग और ई-प्रिस्क्रिप्शन सिंक के साथ विर्टॉय हॉस्पिटल एचएमएस निर्मित किया गया।",
      results: [
        { metric: "<0.8s", label: "रिकॉर्ड क्वेरी गति" },
        { metric: "99.98%", label: "सिस्टम अपटाइम" },
        { metric: "3x", label: "बिलिंग दक्षता" },
      ],
      tags: ["Hospital HMS", "Redis Cache", "Pharmacy ERP", "Healthcare"],
    },
  ],
  or: [
    {
      id: "tata-steel-safeact",
      client: "ଟାଟା ଷ୍ଟିଲ୍ ଓ ଭାରୀ ଶିଳ୍ପ ସଂସ୍ଥା",
      industry: "ଇସ୍ପାତ ଓ ଖଣି ସୁରକ୍ଷା",
      badge: "ଶିଳ୍ପ ନିରାପତ୍ତା VR",
      icon: Factory,
      headline: "6-DoF VR ସିମ୍ୟୁଲେସନ୍ ଦ୍ୱାରା ଶୂନ୍ୟ-ଦୁର୍ଘଟଣା ସୁରକ୍ଷା ରୂପାନ୍ତରଣ",
      challenge:
        "ବ୍ଲାଷ୍ଟ ଫର୍ଣ୍ଣେସ୍ ଏବଂ ବିପଦଜନକ ସ୍ଥାନରେ ଟେକ୍ନିସିଆନମାନଙ୍କ ପାଇଁ ବାସ୍ତବ ପ୍ରଶିକ୍ଷଣରେ ଉଚ୍ଚ ବିପଦ ରହିଥିଲା।",
      solution:
        "୪୦+ ଫିଜିକ୍ସ ସିମ୍ୟୁଲେସନ୍ ଏବଂ ବାୟୋମେଟ୍ରିକ୍ ସ୍କୋର ଟ୍ରାକିଂ ସହ ସେଫ୍‌ଆକ୍ଟ VR ସୁଇଟ୍ ସ୍ଥାପନ କରାଗଲା।",
      results: [
        { metric: "୯୨%", label: "ସ୍ମରଣ ଶକ୍ତି ହାର" },
        { metric: "୦", label: "ତାଲିମ ଦୁର୍ଘଟଣା" },
        { metric: "୧୦୦%", label: "ଅଡିଟ୍ ଅନୁପାଳନ" },
      ],
      tags: ["SafeAct VR", "Meta Quest 3", "LMS Integration", "Tata Steel"],
    },
    {
      id: "campus-erp-odisha",
      client: "କଲେଜ ଓ ସରକାରୀ ବିଶ୍ୱବିଦ୍ୟାଳୟ",
      industry: "ଉଚ୍ଚ ଶିକ୍ଷା",
      badge: "କ୍ୟାମ୍ପସ୍ ଡିଜିଟାଇଜେସନ୍",
      icon: GraduationCap,
      headline: "୪୦,୦୦୦+ ଛାତ୍ରଙ୍କ ପାଇଁ ଏକୀକୃତ ଡିଜିଟାଲ୍ କ୍ୟାମ୍ପସ୍ ଓ ପରୀକ୍ଷା ERP",
      challenge:
        "ମାନୁଆଲ୍ ରେଜିଷ୍ଟର, ଧୀମା ଫିସ୍ ସଂଗ୍ରହ ଏବଂ ପରୀକ୍ଷା ଖାତା ମୂଲ୍ୟାୟନରେ ପ୍ରଶାସନିକ ବିଳମ୍ବ।",
      solution:
        "ପେପରଲେସ୍ ଆଡମିଶନ, ଅଟୋମେଟେଡ୍ ଫିସ୍ ଗେଟୱେ ଏବଂ ବାରକୋଡ୍ ହଲ୍-ଟିକେଟ୍ ସହ ଭର୍ଚ୍ଚୋଏ ERP ପ୍ରଚଳନ।",
      results: [
        { metric: "୪୦K+", label: "ଦୈନିକ ସକ୍ରିୟ ୟୁଜର୍" },
        { metric: "୮୫%", label: "ପ୍ରଶାସନିକ ସମୟ ସଞ୍ଚୟ" },
        { metric: "୧୦୦%", label: "ଫିସ୍ ସମାଧାନ" },
      ],
      tags: ["Education ERP", "Next.js & Postgres", "High Availability", "Campus Suite"],
    },
    {
      id: "hospital-hms",
      client: "ଆଞ୍ଚଳିକ ହସ୍ପିଟାଲ୍ ଓ ଚିକିତ୍ସା କେନ୍ଦ୍ର",
      industry: "ସ୍ୱାସ୍ଥ୍ୟ ଭିତ୍ତିଭୂମି",
      badge: "କ୍ଲିନିକାଲ୍ ନିର୍ଭରଯୋଗ୍ୟତା",
      icon: HeartPulse,
      headline: "ତୁରନ୍ତ ରୋଗୀ ରେକର୍ଡ ପ୍ରାପ୍ତି ଓ ଜିରୋ ଡାଉନଟାଇମ୍ ଫାର୍ମାସୀ ପରିଚାଳନା",
      challenge:
        "OPD ସମୟରେ ବିନା କୌଣସି ବିଳମ୍ବରେ ରୋଗୀଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ଦେଖିବାର ଦୃଢ଼ ଆବଶ୍ୟକତା ଥିଲା।",
      solution:
        "ଲୋକାଲ୍ କ୍ୟାଚିଂ ଏବଂ ଇ-ପ୍ରେସକ୍ରିପସନ୍ ସହ ଭର୍ଚ୍ଚୋଏ ହସ୍ପିଟାଲ୍ ମ୍ୟାନେଜମେଣ୍ଟ ସିଷ୍ଟମ୍ ନିର୍ମାଣ କରାଗଲା।",
      results: [
        { metric: "<୦.୮s", label: "ରେକର୍ଡ ସର୍ଚ୍ଚ ଗତି" },
        { metric: "୯୯.୯୮%", label: "ସିଷ୍ଟମ୍ ଅପଟାଇମ୍" },
        { metric: "୩x", label: "ବିଲିଂ କାର୍ଯ୍ୟଦକ୍ଷତା" },
      ],
      tags: ["Hospital HMS", "Redis Cache", "Pharmacy ERP", "Healthcare"],
    },
  ],
};

export function ImpactStories() {
  const [activeStudy, setActiveStudy] = useState(0);
  const { lang, t } = useLanguage();
  
  const studies = CASE_STUDIES_MAP[lang] || CASE_STUDIES_MAP.en;
  const current = studies[activeStudy] || studies[0];
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
            eyebrow={t("impact_badge")}
            title={t("impact_title")}
            description={t("impact_desc")}
          />
        </div>

        {/* Interactive Case Study Navigator */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Selection List: 4 Cols */}
          <div className="space-y-3 lg:col-span-4">
            {studies.map((study, idx) => {
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
                      {lang === "hi" ? "सत्यापित प्रभाव" : lang === "or" ? "ପ୍ରମାଣିତ ପ୍ରଭାବ" : "Field Verified"}
                    </span>
                  </div>

                  <h4 className="mt-6 text-lg font-bold tracking-tight text-foreground">
                    {current.headline}
                  </h4>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/80 bg-surface-muted/50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted">
                        {lang === "hi" ? "परिचालन चुनौती" : lang === "or" ? "କାର୍ଯ୍ୟକ୍ଷମ ଆହ୍ୱାନ" : "The Operational Challenge"}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-foreground">{current.challenge}</p>
                    </div>
                    <div className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        {lang === "hi" ? "विर्टॉय का समाधान" : lang === "or" ? "ଭର୍ଚ୍ଚୋଏର ସମାଧାନ" : "The Virtoy Solution"}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-foreground">{current.solution}</p>
                    </div>
                  </div>

                  {/* Impact Results Bar */}
                  <div className="mt-8 rounded-2xl border border-border/80 bg-surface-muted p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                      {lang === "hi" ? "मापने योग्य परिणाम" : lang === "or" ? "ମାପନଯୋଗ୍ୟ ଫଳାଫଳ" : "Measurable Outcomes"}
                    </p>
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
                      <span>
                        {lang === "hi" ? "केस स्टडी पीडीएफ का अनुरोध करें" : lang === "or" ? "କେସ୍ ଷ୍ଟଡି PDF ଅନୁରୋଧ କରନ୍ତୁ" : "Request Case Study PDF"}
                      </span>
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
