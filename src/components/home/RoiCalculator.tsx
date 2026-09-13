"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  ShieldAlert,
  ArrowRight,
  Sliders,
  Building2,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/lib/translations";

interface IndustryConfig {
  id: string;
  name: string;
  hourlyValue: number;
  incidentCost: number;
  typicalDeliveryWeeks: number;
  riskReductionRate: string;
}

const INDUSTRIES_MAP: Record<"en" | "hi" | "or", IndustryConfig[]> = {
  en: [
    {
      id: "industrial",
      name: "Heavy Industry & Mining",
      hourlyValue: 850,
      incidentCost: 1500000,
      typicalDeliveryWeeks: 8,
      riskReductionRate: "92%",
    },
    {
      id: "education",
      name: "Universities & Colleges",
      hourlyValue: 450,
      incidentCost: 500000,
      typicalDeliveryWeeks: 6,
      riskReductionRate: "95%",
    },
    {
      id: "healthcare",
      name: "Hospital & Healthcare",
      hourlyValue: 950,
      incidentCost: 2000000,
      typicalDeliveryWeeks: 10,
      riskReductionRate: "99%",
    },
    {
      id: "enterprise",
      name: "Corporate ERP & SaaS",
      hourlyValue: 700,
      incidentCost: 800000,
      typicalDeliveryWeeks: 6,
      riskReductionRate: "88%",
    },
  ],
  hi: [
    {
      id: "industrial",
      name: "भारी उद्योग एवं खनन",
      hourlyValue: 850,
      incidentCost: 1500000,
      typicalDeliveryWeeks: 8,
      riskReductionRate: "92%",
    },
    {
      id: "education",
      name: "विश्वविद्यालय एवं कॉलेज",
      hourlyValue: 450,
      incidentCost: 500000,
      typicalDeliveryWeeks: 6,
      riskReductionRate: "95%",
    },
    {
      id: "healthcare",
      name: "अस्पताल एवं स्वास्थ्य सेवा",
      hourlyValue: 950,
      incidentCost: 2000000,
      typicalDeliveryWeeks: 10,
      riskReductionRate: "99%",
    },
    {
      id: "enterprise",
      name: "कॉर्पोरेट ईआरपी एवं सास",
      hourlyValue: 700,
      incidentCost: 800000,
      typicalDeliveryWeeks: 6,
      riskReductionRate: "88%",
    },
  ],
  or: [
    {
      id: "industrial",
      name: "ଭାରୀ ଶିଳ୍ପ ଓ ଖଣି",
      hourlyValue: 850,
      incidentCost: 1500000,
      typicalDeliveryWeeks: 8,
      riskReductionRate: "୯୨%",
    },
    {
      id: "education",
      name: "କଲେଜ ଓ ବିଶ୍ୱବିଦ୍ୟାଳୟ",
      hourlyValue: 450,
      incidentCost: 500000,
      typicalDeliveryWeeks: 6,
      riskReductionRate: "୯୫%",
    },
    {
      id: "healthcare",
      name: "ଡାକ୍ତରଖାନା ଓ ସ୍ୱାସ୍ଥ୍ୟସେବା",
      hourlyValue: 950,
      incidentCost: 2000000,
      typicalDeliveryWeeks: 10,
      riskReductionRate: "୯୯%",
    },
    {
      id: "enterprise",
      name: "କର୍ପୋରେଟ୍ ERP ଓ SaaS",
      hourlyValue: 700,
      incidentCost: 800000,
      typicalDeliveryWeeks: 6,
      riskReductionRate: "୮୮%",
    },
  ],
};

export function RoiCalculator() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("industrial");
  const [teamSize, setTeamSize] = useState<number>(350);
  const [solutionTier, setSolutionTier] = useState<"standard" | "immersive" | "enterprise">(
    "immersive"
  );
  const { lang, t } = useLanguage();

  const industries = INDUSTRIES_MAP[lang] || INDUSTRIES_MAP.en;
  const ind = industries.find((i) => i.id === selectedIndustry) || industries[0];

  // Calculations
  const tierMultiplier = solutionTier === "standard" ? 1 : solutionTier === "immersive" ? 1.4 : 1.8;
  const deliveryWeeks = Math.round(ind.typicalDeliveryWeeks * (solutionTier === "standard" ? 0.8 : 1.2));
  const annualHoursSaved = Math.round(teamSize * 14 * tierMultiplier);
  const annualEfficiencyValue = Math.round((annualHoursSaved * ind.hourlyValue) / 100000); // In Lakhs
  const incidentMitigationPercent = ind.riskReductionRate;

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted/50 py-24">
      {/* Background radial glow */}
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
          <SectionHeading
            eyebrow={t("roi_badge")}
            title={t("roi_title")}
            description={t("roi_desc")}
          />
        </div>

        {/* Calculator Widget Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Left: Interactive Controls (7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard enableTilt={false} className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Sliders className="h-4 w-4" />
                <span>
                  {lang === "hi"
                    ? "संस्थागत पैरामीटर कॉन्फ़िगर करें"
                    : lang === "or"
                    ? "ସାଂସ୍ଥାନିକ ମାନଦଣ୍ଡ କନଫିଗର୍ କରନ୍ତୁ"
                    : "Configure Institutional Parameters"}
                </span>
              </div>

              {/* 1. Industry Selector */}
              <div className="mt-6">
                <label className="text-xs font-semibold text-foreground">
                  {lang === "hi"
                    ? "उद्योग क्षेत्र चुनें:"
                    : lang === "or"
                    ? "ଶିଳ୍ପ କ୍ଷେତ୍ର ଚୟନ କରନ୍ତୁ:"
                    : "Select Industry Domain:"}
                </label>
                <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {industries.map((industry) => (
                    <button
                      key={industry.id}
                      onClick={() => setSelectedIndustry(industry.id)}
                      className={`rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                        selectedIndustry === industry.id
                          ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
                          : "border-border bg-surface text-muted hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      <Building2 className="mb-1.5 h-4 w-4 opacity-80" />
                      <span className="block leading-tight">{industry.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Team / Student / Personnel Slider */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <label htmlFor="team-slider" className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    {lang === "hi"
                      ? "लक्षित उपयोगकर्ता / दैनिक कर्मचारी:"
                      : lang === "or"
                      ? "ଲକ୍ଷିତ ୟୁଜର୍ / ଦୈନିକ କର୍ମଚାରୀ:"
                      : "Target Users / Daily Personnel:"}
                  </label>
                  <span className="font-mono text-sm font-bold text-primary">
                    {teamSize.toLocaleString()} {lang === "hi" ? "उपयोगकर्ता" : lang === "or" ? "ୟୁଜର୍" : "Users"}
                  </span>
                </div>
                <input
                  id="team-slider"
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-muted accent-primary"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
                  <span>50</span>
                  <span>1,000</span>
                  <span>2,500</span>
                  <span>5,000+</span>
                </div>
              </div>

              {/* 3. Solution Tier Selector */}
              <div className="mt-8">
                <label className="text-xs font-semibold text-foreground">
                  {lang === "hi"
                    ? "तकनीकी स्टैक एवं समाधान स्तर:"
                    : lang === "or"
                    ? "ବୈଷୟିକ ଷ୍ଟାକ୍ ଓ ସମାଧାନ ସ୍ତର:"
                    : "Target Technical Stack & Scope:"}
                </label>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                  <button
                    onClick={() => setSolutionTier("standard")}
                    className={`rounded-xl border p-3 text-left text-xs transition ${
                      solutionTier === "standard"
                        ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary"
                        : "border-border bg-surface text-muted hover:text-foreground"
                    }`}
                  >
                    <p className="font-bold text-foreground">
                      {lang === "hi" ? "वेब एवं क्लाउड ईआरपी" : lang === "or" ? "ୱେବ୍ ଓ କ୍ଲାଉଡ୍ ERP" : "Web & Cloud ERP"}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">
                      {lang === "hi" ? "कोर डेटाबेस एवं पोर्टल्स" : lang === "or" ? "କୋର୍ ଡାଟାବେସ୍ ଓ ପୋର୍ଟାଲ୍" : "Core databases & portals"}
                    </p>
                  </button>

                  <button
                    onClick={() => setSolutionTier("immersive")}
                    className={`rounded-xl border p-3 text-left text-xs transition ${
                      solutionTier === "immersive"
                        ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary"
                        : "border-border bg-surface text-muted hover:text-foreground"
                    }`}
                  >
                    <p className="font-bold text-foreground">
                      {lang === "hi" ? "6-DoF वीआर सिमुलेशन" : lang === "or" ? "6-DoF VR ସିମ୍ୟୁଲେସନ୍" : "6-DOF AR/VR Simulation"}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">
                      {lang === "hi" ? "फिजिक्स ड्रिल्स एवं एक्सआर" : lang === "or" ? "ଫିଜିକ୍ସ ଡ୍ରିଲ୍ ଓ XR ମଡ୍ୟୁଲ୍" : "Physics hazmat & XR"}
                    </p>
                  </button>

                  <button
                    onClick={() => setSolutionTier("enterprise")}
                    className={`rounded-xl border p-3 text-left text-xs transition ${
                      solutionTier === "enterprise"
                        ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary"
                        : "border-border bg-surface text-muted hover:text-foreground"
                    }`}
                  >
                    <p className="font-bold text-foreground">
                      {lang === "hi" ? "पूर्ण इकोसिस्टम" : lang === "or" ? "ସମ୍ପୂର୍ଣ୍ଣ ଇକୋସିଷ୍ଟମ୍" : "Full Ecosystem"}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">
                      {lang === "hi" ? "वेब + मोबाइल + वीआर + आईओटी" : lang === "or" ? "ୱେବ୍ + ମୋବାଇଲ୍ + VR" : "Web + Mobile + VR + IoT Sync"}
                    </p>
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right: Live Impact Projection HUD (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border-2 border-primary/30 bg-surface p-6 shadow-2xl sm:p-8">
              {/* Corner watermark */}
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between border-b border-border/80 pb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
                    {lang === "hi" ? "अनुमानित डिलीवरी एवं आरओआई" : lang === "or" ? "ଆନୁମାନିକ ଡେଲିଭରି ଓ ROI" : "Projected Delivery & ROI"}
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600">
                    {lang === "hi" ? "रीयल-टाइम गणना" : lang === "or" ? "ରିଅଲ୍-ଟାଇମ୍ ଗଣନା" : "Calculated in Real-Time"}
                  </span>
                </div>

                {/* Key Metric 1: Sprint Delivery */}
                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted">
                      {lang === "hi" ? "अनुमानित उत्पादन समयसीमा" : lang === "or" ? "ଆନୁମାନିକ ପ୍ରଡକ୍ସନ୍ ସମୟସୀମା" : "Estimated Production Sprint"}
                    </p>
                    <p className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {deliveryWeeks} – {deliveryWeeks + 2} {lang === "hi" ? "सप्ताह" : lang === "or" ? "ସପ୍ତାହ" : "Weeks"}
                    </p>
                    <p className="text-[11px] text-muted">
                      {lang === "hi" ? "उपयोगकर्ता परीक्षण के साथ पूर्ण परिनियोजन।" : lang === "or" ? "ୟୁଜର୍ ଟେଷ୍ଟିଂ ସହ ସମ୍ପୂର୍ଣ୍ଣ ନିୟୋଜନ।" : "Full staging deployment with acceptance testing."}
                    </p>
                  </div>
                </div>

                {/* Key Metric 2: Annual Hours Saved */}
                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted">
                      {lang === "hi" ? "वार्षिक बचाए गए कार्य घंटे" : lang === "or" ? "ବାର୍ଷିକ ସଞ୍ଚିତ କାର୍ଯ୍ୟ ଘଣ୍ଟା" : "Annual Operational Hours Saved"}
                    </p>
                    <p className="font-mono text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                      {annualHoursSaved.toLocaleString()}+ {lang === "hi" ? "घंटे" : lang === "or" ? "ଘଣ୍ଟା" : "Hours"}
                    </p>
                    <p className="text-[11px] text-muted">
                      {lang === "hi" ? `अनुमानित उत्पादकता लाभ ₹${annualEfficiencyValue} लाख/वर्ष।` : lang === "or" ? `ଆନୁମାନିକ ଉତ୍ପାଦନ ଲାଭ ₹${annualEfficiencyValue} ଲକ୍ଷ/ବର୍ଷ।` : `Est. productivity gain ₹${annualEfficiencyValue} Lakhs/yr.`}
                    </p>
                  </div>
                </div>

                {/* Key Metric 3: Safety / Risk Reduction */}
                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted">
                      {lang === "hi" ? "सुरक्षा एवं अनुपालन सटीकता" : lang === "or" ? "ସୁରକ୍ଷା ଓ ଅନୁପାଳନ ସଠିକତା" : "Safety & Compliance Accuracy"}
                    </p>
                    <p className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {incidentMitigationPercent} {lang === "hi" ? "स्मरण" : lang === "or" ? "ସ୍ମରଣ" : "Retention"}
                    </p>
                    <p className="text-[11px] text-muted">
                      {lang === "hi" ? "प्रशिक्षण अभ्यास के दौरान शून्य शारीरिक दुर्घटना जोखिम।" : lang === "or" ? "ତାଲିମ ସମୟରେ ଶୂନ୍ୟ ଶାରୀରିକ ଦୁର୍ଘଟଣା ବିପଦ।" : "Zero physical incident risk during training drills."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct CTA */}
              <div className="mt-8 border-t border-border/80 pt-6">
                <Link
                  href={`/contact?subject=Scope%20for%20${encodeURIComponent(
                    ind.name
                  )}%20(${teamSize}%20users)&tier=${solutionTier}`}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30"
                >
                  {lang === "hi"
                    ? "तकनीकी प्रस्ताव एवं ब्लूप्रिंट प्राप्त करें"
                    : lang === "or"
                    ? "ବୈଷୟିକ ପ୍ରସ୍ତାବ ଓ ବ୍ଲୁପ୍ରିଣ୍ଟ ପ୍ରାପ୍ତ କରନ୍ତୁ"
                    : "Request Technical Blueprint & Proposal"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="mt-2 text-center text-[10px] text-muted">
                  {lang === "hi"
                    ? "निश्चित माइलस्टोन कोट, पूर्ण आर्किटेक्चर आरेख और एसएलए शर्तें शामिल हैं।"
                    : lang === "or"
                    ? "ନିର୍ଦ୍ଦିଷ୍ଟ ମାଇଲଷ୍ଟୋନ୍ କୋଟ୍, ଆର୍କିଟେକ୍ଚର ଡାଇଗ୍ରାମ୍ ଓ SLA ସର୍ତ୍ତ ଅନ୍ତର୍ଭୁକ୍ତ।"
                    : "Includes fixed milestone quote, full architecture diagram & SLA terms."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
