"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/translations";

interface ComparisonRow {
  category: string;
  virtoy: string;
  traditional: string;
  inhouse: string;
  highlight?: boolean;
}

const COMPARISON_MAP: Record<"en" | "hi" | "or", ComparisonRow[]> = {
  en: [
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
  ],
  hi: [
    {
      category: "इंजीनियरिंग नेतृत्व",
      virtoy: "आईआईटी पूर्व छात्रों और वरिष्ठ सिस्टम विशेषज्ञों द्वारा संचालित",
      traditional: "गैर-तकनीकी प्रबंधकों के अधीन जूनियर डेवलपर्स",
      inhouse: "विशेषज्ञ प्रतिभा (AR/VR, WebGL) भर्ती में भारी कठिनाई",
      highlight: true,
    },
    {
      category: "सोर्स कोड एवं आईपी स्वामित्व",
      virtoy: "100% पूर्ण आईपी स्वामित्व एवं वेंडर लॉक-इन से पूर्ण मुक्ति",
      traditional: "लाइसेंसिंग प्रतिबंध एवं छिपी हुई शर्तें",
      inhouse: "पूर्ण आईपी, लेकिन कर्मचारियों के जाने पर ज्ञान का नुकसान",
    },
    {
      category: "उत्पादन MVP समयसीमा",
      virtoy: "4 – 8 सप्ताह (16 पूर्व-निर्मित एंटरप्राइज इंजनों द्वारा त्वरित)",
      traditional: "6 – 12 महीने और बार-बार देरी",
      inhouse: "9+ महीने (भर्ती + ट्रेनिंग + इंफ्रास्ट्रक्चर)",
      highlight: true,
    },
    {
      category: "इमर्सिव एआर/वीआर एवं 3D क्षमता",
      virtoy: "इन-हाउस 6-DoF वीआर, वेबएक्सआर और फिजिक्स सिमुलेशन लैब",
      traditional: "तृतीय-पक्ष एजेंसियों को आउटसोर्स और अत्यधिक लागत",
      inhouse: "यूनिटी/अनरियल के लिए अलग से भारी वेतन लागत",
    },
    {
      category: "एंटरप्राइज एसएलए एवं सहायता",
      virtoy: "24/7 दोहरे क्षेत्रीय हब (कोलकाता हेड ऑफिस एवं भुवनेश्वर ओ-हब)",
      traditional: "घंटे के हिसाब से बिलिंग और धीमी प्रतिक्रिया",
      inhouse: "आंतरिक सहायता शिफ्ट प्रबंधन की आवश्यकता",
    },
    {
      category: "प्रमाणन एवं मानक",
      virtoy: "आईएसओ 9001:2015, एमएसएमई पंजीकृत, स्टार्टअप इंडिया प्रमाणित",
      traditional: "अस्थिर मानक और अप्रमाणित गुणवत्ता",
      inhouse: "कस्टम ऑडिट और विनियामक अनुपालन का बोझ",
    },
  ],
  or: [
    {
      category: "ଇଞ୍ଜିନିୟରିଂ ନେତୃତ୍ୱ",
      virtoy: "ଆଇଆଇଟି ପ୍ରତିଭା ଓ ବରିଷ୍ଠ ସିଷ୍ଟମ୍ ବିଶେଷଜ୍ଞଙ୍କ ଦ୍ୱାରା ପରିଚାଳିତ",
      traditional: "ଅଣ-ବୈଷୟିକ ପରିଚାଳକଙ୍କ ଅଧୀନରେ କନିଷ୍ଠ ଡେଭଲପର୍",
      inhouse: "ସ୍ୱତନ୍ତ୍ର ଦକ୍ଷତା (AR/VR, WebGL) ନିଯୁକ୍ତିରେ କଠିନତା",
      highlight: true,
    },
    {
      category: "ସୋର୍ସ କୋଡ୍ ଓ ଆଇପି ମାଲିକାନା",
      virtoy: "୧୦୦% ସମ୍ପୂର୍ଣ୍ଣ ଆଇପି ମାଲିକାନା ଓ ଭେଣ୍ଡର ଲକ୍-ଇନ୍ ମୁକ୍ତ",
      traditional: "ଲାଇସେନ୍ସିଂ ପ୍ରତିବନ୍ଧକ ଓ ଲୁକ୍କାୟିତ ସର୍ତ୍ତ",
      inhouse: "ନିଜର ଆଇପି, କିନ୍ତୁ କର୍ମଚାରୀ ପରିବର୍ତ୍ତନରେ ଜ୍ଞାନ ହ୍ରାସ",
    },
    {
      category: "ପ୍ରଡକ୍ସନ୍ MVP ସମୟ",
      virtoy: "୪ – ୮ ସପ୍ତାହ (୧୬ଟି ପ୍ରି-ବିଲ୍ଟ ଏଣ୍ଟରପ୍ରାଇଜ୍ ଇଞ୍ଜିନ୍ ଦ୍ୱାରା ତ୍ୱରାନ୍ୱିତ)",
      traditional: "୬ – ୧୨ ମାସ ଏବଂ ବାରମ୍ବାର ବିଳମ୍ବ",
      inhouse: "୯+ ମାସ (ନିଯୁକ୍ତି + ପ୍ରଶିକ୍ଷଣ + ସ୍କାଫୋଲ୍ଡିଂ)",
      highlight: true,
    },
    {
      category: "ଏଆର୍/ଭିଆର୍ ଓ 3D ଗଭୀରତା",
      virtoy: "ଇନ୍-ହାଉସ୍ 6-DoF VR, WebXR ଓ ଫିଜିକ୍ସ ସିମ୍ୟୁଲେସନ୍ ଲ୍ୟାବ୍",
      traditional: "ଅନ୍ୟ ଏଜେନ୍ସିକୁ ଆଉଟସୋର୍ସ ଓ ଅଧିକ ଖର୍ଚ୍ଚ",
      inhouse: "ୟୁନିଟି/ଅନରିଅଲ୍ ପାଇଁ ସ୍ୱତନ୍ତ୍ର ବ୍ୟୟବହୁଳ ଟିମ୍",
    },
    {
      category: "ଏଣ୍ଟରପ୍ରାଇଜ୍ SLA ଓ ସପୋର୍ଟ",
      virtoy: "୨୪/୭ ଦୁଇଟି ଆଞ୍ଚଳିକ କେନ୍ଦ୍ର (କୋଲକାତା ମୁଖ୍ୟାଳୟ ଓ ଭୁବନେଶ୍ୱର ଓ-ହବ୍)",
      traditional: "ଘଣ୍ଟା ହିସାବରେ ବିଲିଂ ଏବଂ ମନ୍ଥର ଉତ୍ତର",
      inhouse: "ଆଭ୍ୟନ୍ତରୀଣ ସପୋର୍ଟ ସିଫ୍ଟ ଆବଶ୍ୟକତା",
    },
    {
      category: "ପ୍ରମାଣପତ୍ର ଓ ମାନ୍ୟତା",
      virtoy: "ISO 9001:2015, MSME ପଞ୍ଜୀକୃତ, ଷ୍ଟାର୍ଟଅପ୍ ଇଣ୍ଡିଆ ସ୍ୱୀକୃତ",
      traditional: "ଅସ୍ଥିର ମାନଦଣ୍ଡ ଓ ଅପ୍ରମାଣିତ କାର୍ଯ୍ୟଦକ୍ଷତା",
      inhouse: "କଷ୍ଟମ୍ ଅଡିଟ୍ ଏବଂ ସାଂସ୍ଥାନିକ ଅନୁପାଳନ ଖର୍ଚ୍ଚ",
    },
  ],
};

export function ComparisonMatrix() {
  const { lang, t } = useLanguage();
  const rows = COMPARISON_MAP[lang] || COMPARISON_MAP.en;

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
            eyebrow={t("comp_badge")}
            title={t("comp_title")}
            description={t("comp_desc")}
          />
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface px-6 py-3 text-sm font-semibold shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
            >
              {lang === "hi"
                ? "कस्टम आर्किटेक्चर प्रस्ताव लें"
                : lang === "or"
                ? "କଷ୍ଟମ୍ ଆର୍କିଟେକ୍ଚର ପ୍ରସ୍ତାବ ନିଅନ୍ତୁ"
                : "Request Custom Technical Architecture"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Matrix Comparison Table */}
        <div className="mt-14 overflow-x-auto pb-4">
          <div className="min-w-[760px] rounded-3xl border border-border/80 bg-surface shadow-xl">
            {/* Header Columns */}
            <div className="grid grid-cols-12 items-center border-b border-border/80 bg-surface-muted/40 p-4 text-xs font-bold uppercase tracking-wider sm:p-6 sm:text-sm">
              <div className="col-span-4 text-muted">
                {lang === "hi" ? "तुलना बिंदु" : lang === "or" ? "ତୁଳନାତ୍ମକ ବିନ୍ଦୁ" : "Evaluation Vector"}
              </div>
              <div className="col-span-4 relative rounded-2xl border-2 border-primary bg-primary/10 px-4 py-3 text-center text-primary shadow-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-sm">
                  {lang === "hi" ? "सर्वश्रेष्ठ विकल्प" : lang === "or" ? "ସର୍ବୋତ୍ତମ ମଡେଲ୍" : "Recommended Model"}
                </div>
                <span className="flex items-center justify-center gap-1.5 font-bold">
                  <Sparkles className="h-4 w-4" />{" "}
                  {lang === "hi" ? "विर्टॉय इंजीनियरिंग" : lang === "or" ? "ଭର୍ଚ୍ଚୋଏ ଇଞ୍ଜିନିୟରିଂ" : "Virtoy Engineering"}
                </span>
              </div>
              <div className="col-span-2 text-center text-muted">
                {lang === "hi" ? "पारंपरिक एजेंसी" : lang === "or" ? "ପାରମ୍ପରିକ ଏଜେନ୍ସି" : "Traditional Agency"}
              </div>
              <div className="col-span-2 text-center text-muted">
                {lang === "hi" ? "इन-हाउस भर्ती" : lang === "or" ? "ଇନ-ହାଉସ୍ ଟିମ୍" : "In-House Hiring"}
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-border/60">
              {rows.map((row) => (
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
                      <span className="font-bold">
                        {lang === "hi" ? "एंटरप्राइज ग्रेड" : lang === "or" ? "ଏଣ୍ଟରପ୍ରାଇଜ୍ ଗ୍ରେଡ୍" : "Enterprise Grade"}
                      </span>
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
                  {lang === "hi"
                    ? "मानक मास्टर सर्विस एग्रीमेंट (MSA), एनडीए और माइलस्टोन डिलीवरी द्वारा समर्थित।"
                    : lang === "or"
                    ? "ମାନକ ମାଷ୍ଟର ସର୍ଭିସ୍ ଚୁକ୍ତି (MSA), NDA ଏବଂ ମାଇଲଷ୍ଟୋନ୍ ଡେଲିଭରି ଦ୍ୱାରା ସୁରକ୍ଷିତ।"
                    : "Backed by standard master service agreements, NDA protection, and milestone-based sign-offs."}
                </span>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline sm:text-sm"
              >
                {lang === "hi"
                  ? "आर्किटेक्चर परामर्श बुक करें"
                  : lang === "or"
                  ? "ଆର୍କିଟେକ୍ଚର ପରାମର୍ଶ ବୁକ୍ କରନ୍ତୁ"
                  : "Schedule Architecture Consultation"}{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
