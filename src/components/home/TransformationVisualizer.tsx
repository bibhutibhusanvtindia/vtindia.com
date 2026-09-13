"use client";

import { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
  Flame,
  GraduationCap,
  HeartPulse,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { playHapticBeep } from "@/lib/sound";
import { useLanguage } from "@/lib/translations";

interface TransformationStory {
  id: string;
  category: string;
  client: string;
  icon: typeof Flame;
  title: string;
  before: {
    title: string;
    points: string[];
    metric: string;
    metricLabel: string;
  };
  after: {
    title: string;
    points: string[];
    metric: string;
    metricLabel: string;
  };
}

const STORIES_MAP: Record<"en" | "hi" | "or", TransformationStory[]> = {
  en: [
    {
      id: "industrial-safety",
      category: "Heavy Industry & Mining",
      client: "Tata Steel & Vedanta Facilities",
      icon: Flame,
      title: "Industrial Hazard Safety & Hazmat Simulation",
      before: {
        title: "Traditional Physical Drills",
        points: [
          "Dangerous live-fire and high-altitude physical training",
          "Manual paper compliance audits and logbooks",
          "High recurring cost of setting up mock disaster zones",
          "Low retention of emergency evacuation procedures",
        ],
        metric: "18 Days",
        metricLabel: "Average training cycle duration",
      },
      after: {
        title: "Virtoy SafeAct 6-DOF VR Simulator",
        points: [
          "100% zero-risk photorealistic virtual hazmat scenarios",
          "Real-time biometric reaction scoring & automated LMS sync",
          "Instant multi-user collaborative disaster response drills",
          "Certified compliance logs exported with cryptographic audit",
        ],
        metric: "92% Retention",
        metricLabel: "0 Incidents Recorded in Field",
      },
    },
    {
      id: "campus-erp",
      category: "Higher Education & Universities",
      client: "Centurion University & 40k+ Students",
      icon: GraduationCap,
      title: "Integrated Campus ERP & NAAC Automation",
      before: {
        title: "Fragmented Legacy Spreadsheets",
        points: [
          "Disjointed department databases and slow paper fee receipts",
          "Weeks required to compile NAAC/NBA accreditation data",
          "Frequent system crashes during exam result publication",
          "Manual timetable scheduling with high conflict rates",
        ],
        metric: "4-5 Weeks",
        metricLabel: "To compile annual compliance report",
      },
      after: {
        title: "Virtoy Campus Management Cloud",
        points: [
          "Unified single-sign-on portal for 40,000+ daily active users",
          "1-Click automated NAAC/NBA criteria data aggregation",
          "Sub-second response times even during peak admissions",
          "Mobile-first fee payment, attendance & grading portal",
        ],
        metric: "<0.8s Latency",
        metricLabel: "99.98% Peak Examination Uptime",
      },
    },
    {
      id: "healthcare-hms",
      category: "Healthcare & Hospitals",
      client: "Multi-Speciality Hospitals",
      icon: HeartPulse,
      title: "Clinical Hospital Management & Queue Engine",
      before: {
        title: "Paper Records & Crowded OPDs",
        points: [
          "Long patient wait times with chaotic OPD registration queues",
          "Physical paper prescriptions prone to misplacement",
          "Delayed diagnostic lab report delivery to doctors",
          "Disjointed pharmacy inventory and billing leaks",
        ],
        metric: "45 Mins",
        metricLabel: "Average OPD waiting time",
      },
      after: {
        title: "Virtoy Hospital HMS & Telemetry",
        points: [
          "Smart QR kiosk self-check-in with live token display",
          "Integrated electronic health records (EHR) & e-prescriptions",
          "Direct lab equipment telemetry synchronization",
          "Automated pharmaceutical inventory re-ordering",
        ],
        metric: "8 Mins",
        metricLabel: "82% Reduction in Patient Wait Time",
      },
    },
  ],
  hi: [
    {
      id: "industrial-safety",
      category: "भारी उद्योग एवं खनन",
      client: "टाटा स्टील एवं वेदांता संयंत्र",
      icon: Flame,
      title: "औद्योगिक खतरा सुरक्षा एवं वीआर सिमुलेशन",
      before: {
        title: "पारंपरिक प्रत्यक्ष अभ्यास",
        points: [
          "खतरनाक आग और ऊंचाई पर वास्तविक जोखिम भरा प्रशिक्षण",
          "कागजी अनुपालन ऑडिट और धीमे लॉगबुक रिकॉर्ड",
          "नकली आपदा क्षेत्र तैयार करने की अत्यधिक लागत",
          "आपातकालीन निकासी प्रक्रियाओं का कमजोर स्मरण",
        ],
        metric: "18 दिन",
        metricLabel: "औसत प्रशिक्षण चक्र अवधि",
      },
      after: {
        title: "विर्टॉय सेफएक्ट 6-DoF वीआर सिमुलेटर",
        points: [
          "100% शून्य-जोखिम वाला यथार्थवादी वर्चुअल ट्रेनिंग वातावरण",
          "रीयल-टाइम बायोमेट्रिक रिएक्शन स्कोरिंग और एलएमएस सिंक",
          "त्वरित बहु-उपयोगकर्ता सहयोगी आपदा प्रतिक्रिया ड्रिल",
          "क्रिप्टोग्राफिक ऑडिट के साथ प्रमाणित अनुपालन लॉग",
        ],
        metric: "92% स्मरण दर",
        metricLabel: "फील्ड में 0 दुर्घटनाएं दर्ज",
      },
    },
    {
      id: "campus-erp",
      category: "उच्च शिक्षा एवं विश्वविद्यालय",
      client: "सेंचुरियन यूनिवर्सिटी एवं 40k+ छात्र",
      icon: GraduationCap,
      title: "एकीकृत कैंपस ईआरपी एवं नैक ऑटोमेशन",
      before: {
        title: "बिखरा हुआ पुराना सिस्टम",
        points: [
          "विभागीय डेटाबेस का बिखराव और धीमी कागजी रसीदें",
          "नैक/एनबीए मान्यता डेटा संकलन में हफ्तों की देरी",
          "परीक्षा परिणाम जारी होते समय सिस्टम क्रैश",
          "मैन्युअल टाइमटेबल और कक्षाओं के टकराव",
        ],
        metric: "4-5 सप्ताह",
        metricLabel: "वार्षिक रिपोर्ट तैयार करने का समय",
      },
      after: {
        title: "विर्टॉय कैंपस मैनेजमेंट क्लाउड",
        points: [
          "40,000+ सक्रिय उपयोगकर्ताओं के लिए एकल पोर्टल",
          "1-क्लिक में स्वचालित नैक/एनबीए डेटा संकलन",
          "पीक एडमिशन में भी सेकंड से कम का रिस्पॉन्स समय",
          "मोबाइल-प्रथम फीस भुगतान, उपस्थिति और ग्रेडिंग",
        ],
        metric: "<0.8s प्रतिक्रिया",
        metricLabel: "99.98% परीक्षा अपटाइम",
      },
    },
    {
      id: "healthcare-hms",
      category: "स्वास्थ्य सेवा एवं अस्पताल",
      client: "मल्टी-स्पेशियलिटी अस्पताल",
      icon: HeartPulse,
      title: "अस्पताल प्रबंधन प्रणाली एवं स्मार्ट कतार",
      before: {
        title: "कागजी रिकॉर्ड और ओपीडी भीड़",
        points: [
          "ओपीडी कतारों में मरीजों का लंबा इंतजार",
          "कागजी पर्चियों के खोने और खराब होने का खतरा",
          "डॉक्टरों तक लैब रिपोर्ट पहुंचने में देरी",
          "फार्मेसी इन्वेंट्री और बिलिंग में विसंगतियां",
        ],
        metric: "45 मिनट",
        metricLabel: "औसत ओपीडी प्रतीक्षा समय",
      },
      after: {
        title: "विर्टॉय हॉस्पिटल एचएमएस एवं टेलीमेट्री",
        points: [
          "स्मार्ट क्यूआर कियोस्क सेल्फ चेक-इन एवं लाइव टोकन",
          "एकीकृत इलेक्ट्रॉनिक स्वास्थ्य रिकॉर्ड (EHR)",
          "लैब उपकरणों से सीधे रिपोर्ट का डिजिटल सिंक",
          "स्वचालित दवा इन्वेंट्री और बिलिंग प्रबंधन",
        ],
        metric: "8 मिनट",
        metricLabel: "प्रतीक्षा समय में 82% की कमी",
      },
    },
  ],
  or: [
    {
      id: "industrial-safety",
      category: "ଭାରୀ ଶିଳ୍ପ ଓ ଖଣି",
      client: "ଟାଟା ଷ୍ଟିଲ୍ ଓ ବେଦାନ୍ତ ପ୍ଲାଣ୍ଟ",
      icon: Flame,
      title: "ଶିଳ୍ପ ନିରାପତ୍ତା ଓ ଭିଆର୍ ସିମ୍ୟୁଲେସନ୍",
      before: {
        title: "ପାରମ୍ପରିକ ବିପଦପୂର୍ଣ୍ଣ ପ୍ରଶିକ୍ଷଣ",
        points: [
          "ନିଆଁ ଓ ଉଚ୍ଚ ସ୍ଥାନରେ ବିପଦଜନକ ବାସ୍ତବ ପ୍ରଶିକ୍ଷଣ",
          "କାଗଜପତ୍ରରେ ଧୀମା ରେକର୍ଡ ଓ ଅନୁପାଳନ ଅଡିଟ୍",
          "ମକ୍ ଡ୍ରିଲ୍ ପାଇଁ ବାରମ୍ବାର ଅତ୍ୟଧିକ ଖର୍ଚ୍ଚ",
          "ଜରୁରୀକାଳୀନ ପଦ୍ଧତି ମନେ ରଖିବାରେ ଅସୁବିଧା",
        ],
        metric: "୧୮ ଦିନ",
        metricLabel: "ହାରାହାରି ଟ୍ରେନିଂ ସମୟ",
      },
      after: {
        title: "ଭର୍ଚ୍ଚୋଏ ସେଫ୍‌ଆକ୍ଟ 6-DoF VR ସିମ୍ୟୁଲେଟର",
        points: [
          "୧୦୦% ବିପଦମୁକ୍ତ ବାସ୍ତବଧର୍ମୀ ଭର୍ଚୁଆଲ୍ ପରିବେଶ",
          "ରିଅଲ୍-ଟାଇମ୍ ବାୟୋମେଟ୍ରିକ୍ ସ୍କୋରିଂ ଓ LMS ସିଙ୍କ୍",
          "ଏକାଧିକ କର୍ମଚାରୀଙ୍କ ମିଳିତ ଜରୁରୀକାଳୀନ ଡ୍ରିଲ୍",
          "ଅଡିଟ୍-ଯୋଗ୍ୟ ପ୍ରମାଣିତ ଡିଜିଟାଲ୍ ଲଗ୍ ରିପୋର୍ଟ",
        ],
        metric: "୯୨% ସ୍ମରଣ ଶକ୍ତି",
        metricLabel: "କ୍ଷେତ୍ରରେ ୦ ଦୁର୍ଘଟଣା ରେକର୍ଡ",
      },
    },
    {
      id: "campus-erp",
      category: "ଉଚ୍ଚ ଶିକ୍ଷା ଓ ବିଶ୍ୱବିଦ୍ୟାଳୟ",
      client: "ସେଞ୍ଚୁରିଅନ୍ ୟୁନିଭର୍ସିଟି ଓ ୪୦ ହଜାର+ ଛାତ୍ର",
      icon: GraduationCap,
      title: "ସମନ୍ୱିତ କ୍ୟାମ୍ପସ୍ ERP ଓ NAAC ଅଟୋମେସନ୍",
      before: {
        title: "ବିଭାଜିତ ପୁରୁଣା ସିଷ୍ଟମ୍",
        points: [
          "ବିଭାଗୀୟ ଡାଟାବେସ୍‌ର ଅସଙ୍ଗତି ଓ ଧୀମା କାଗଜ ରସିଦ",
          "NAAC/NBA ତଥ୍ୟ ସଂଗ୍ରହରେ ସପ୍ତାହ ସପ୍ତାହ ବିଳମ୍ବ",
          "ପରୀକ୍ଷା ଫଳାଫଳ ସମୟରେ ସିଷ୍ଟମ୍ କ୍ରାସ୍",
          "ମାନୁଆଲ୍ ସମୟସାରଣୀରେ ବାରମ୍ବାର ତ୍ରୁଟି",
        ],
        metric: "୪-୫ ସପ୍ତାହ",
        metricLabel: "ବାର୍ଷିକ ରିପୋର୍ଟ ପ୍ରସ୍ତୁତି ସମୟ",
      },
      after: {
        title: "ଭର୍ଚ୍ଚୋଏ କ୍ୟାମ୍ପସ୍ ମ୍ୟାନେଜମେଣ୍ଟ କ୍ଲାଉଡ୍",
        points: [
          "୪୦,୦୦୦+ ଦୈନିକ ୟୁଜର୍ ପାଇଁ ଏକକ ପୋର୍ଟାଲ୍",
          "୧-କ୍ଲିକ୍‌ରେ ସ୍ୱୟଂଚାଳିତ NAAC/NBA ତଥ୍ୟ ସଂଗ୍ରହ",
          "ପିକ୍ ଆଡମିଶନ ସମୟରେ ମଧ୍ୟ ତୁରନ୍ତ ସେବା",
          "ମୋବାଇଲ୍-ପ୍ରଥମ ଫିସ୍ ପୈଠ, ଉପସ୍ଥାନ ଓ ଗ୍ରେଡିଂ",
        ],
        metric: "<୦.୮ ସେକେଣ୍ଡ",
        metricLabel: "୯୯.୯୮% ପରୀକ୍ଷା ଅପଟାଇମ୍",
      },
    },
    {
      id: "healthcare-hms",
      category: "ସ୍ୱାସ୍ଥ୍ୟସେବା ଓ ଡାକ୍ତରଖାନା",
      client: "ମଲ୍ଟି-ସ୍ପେଶାଲିଟି ହସ୍ପିଟାଲ୍",
      icon: HeartPulse,
      title: "ଡାକ୍ତରଖାନା ପରିଚାଳନା ଓ ସ୍ମାର୍ଟ କ୍ୟୁ ସିଷ୍ଟମ୍",
      before: {
        title: "କାଗଜପତ୍ର ରେକର୍ଡ ଓ ଅତ୍ୟଧିକ ଭିଡ଼",
        points: [
          "OPD ପଞ୍ଜୀକରଣ ଲାଇନରେ ରୋଗୀଙ୍କ ଦୀର୍ଘ ଅପେକ୍ଷା",
          "କାଗଜ ପ୍ରେସକ୍ରିପସନ୍ ହଜିଯିବାର ଆଶଙ୍କା",
          "ଡାକ୍ତରଙ୍କ ପାଖରେ ଲ୍ୟାବ୍ ରିପୋର୍ଟ ପହଞ୍ଚିବାରେ ବିଳମ୍ବ",
          "ଫାର୍ମାସୀ ଷ୍ଟକ୍ ଓ ବିଲିଂରେ ଅସଙ୍ଗତି",
        ],
        metric: "୪୫ ମିନିଟ୍",
        metricLabel: "ହାରାହାରି OPD ଅପେକ୍ଷା ସମୟ",
      },
      after: {
        title: "ଭର୍ଚ୍ଚୋଏ ହସ୍ପିଟାଲ୍ HMS ଓ ଟେଲିମେଟ୍ରି",
        points: [
          "ସ୍ମାର୍ଟ QR କିଓସ୍କ ସେଲ୍ଫ ଚେକ୍-ଇନ୍ ଓ ଲାଇଭ୍ ଟୋକନ୍",
          "ଏକୀକୃତ ଇଲେକ୍ଟ୍ରୋନିକ୍ ହେଲଥ୍ ରେକର୍ଡ (EHR)",
          "ଲ୍ୟାବ୍ ଯନ୍ତ୍ରାଂଶରୁ ସିଧାସଳଖ ରିପୋର୍ଟ ସିଙ୍କ୍",
          "ସ୍ୱୟଂଚାଳିତ ଔଷଧ ଷ୍ଟକ୍ ପୁନଃ-ଅର୍ଡର ପରିଚାଳନା",
        ],
        metric: "୮ ମିନିଟ୍",
        metricLabel: "ରୋଗୀ ଅପେକ୍ଷା ସମୟରେ ୮୨% ହ୍ରାସ",
      },
    },
  ],
};

export function TransformationVisualizer() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const { lang, t } = useLanguage();

  const stories = STORIES_MAP[lang] || STORIES_MAP.en;
  const story = stories[activeStoryIdx] || stories[0];

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface py-24">
      {/* Ambient background light */}
      <div
        className="pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("trans_badge")}
            title={t("trans_title")}
            description={t("trans_desc")}
          />
        </div>

        {/* Story Category Tabs */}
        <div className="mt-10 flex flex-wrap gap-3">
          {stories.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveStoryIdx(idx);
                playHapticBeep(650, 0.04);
              }}
              className={`flex items-center gap-2 rounded-2xl border px-5 py-3 text-xs font-semibold transition-all sm:text-sm ${
                activeStoryIdx === idx
                  ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                  : "border-border/80 bg-surface text-muted hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <s.icon className="h-4 w-4" />
              <span>{s.category}</span>
            </button>
          ))}
        </div>

        {/* Active Transformation Card */}
        <div className="mt-8">
          <SpotlightCard enableTilt={false} className="p-6 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
              <div>
                <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                  {story.client}
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {story.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-muted px-3.5 py-1.5 font-mono text-xs font-bold text-muted">
                <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                <span>
                  {lang === "hi" ? "इंटरएक्टिव तुलना" : lang === "or" ? "ତୁଳନାତ୍ମକ ବିବରଣୀ" : "Interactive Comparison"}
                </span>
              </div>
            </div>

            {/* Side-by-Side Comparison Grid */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
              {/* Left: Before (Legacy) */}
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-600">
                    <XCircle className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {lang === "hi" ? "विर्टॉय से पहले" : lang === "or" ? "ଭର୍ଚ୍ଚୋଏ ପୂର୍ବରୁ" : "Before Virtoy"}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-rose-600/80">
                    {lang === "hi" ? "पारंपरिक प्रक्रिया" : lang === "or" ? "ପାରମ୍ପରିକ ପଦ୍ଧତି" : "Legacy Workflow"}
                  </span>
                </div>

                <h4 className="mt-4 text-lg font-bold text-foreground sm:text-xl">
                  {story.before.title}
                </h4>

                <ul className="mt-6 space-y-3">
                  {story.before.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs text-muted sm:text-sm">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-xl border border-rose-500/20 bg-surface p-4">
                  <p className="text-[11px] font-medium text-muted">{story.before.metricLabel}</p>
                  <p className="mt-1 font-mono text-xl font-bold text-rose-600 sm:text-2xl">
                    {story.before.metric}
                  </p>
                </div>
              </div>

              {/* Right: After (Virtoy Solution) */}
              <div className="rounded-2xl border-2 border-primary/40 bg-primary/[0.03] p-6 shadow-lg shadow-primary/5 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-5 w-5 stroke-[2.5]" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {lang === "hi" ? "विर्टॉय समाधान के साथ" : lang === "or" ? "ଭର୍ଚ୍ଚୋଏ ସମାଧାନ ସହ" : "With Virtoy Solution"}
                    </span>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                    {lang === "hi" ? "आधुनिक स्टैक" : lang === "or" ? "ଆଧୁନିକ ଷ୍ଟାକ୍" : "Modern Stack"}
                  </span>
                </div>

                <h4 className="mt-4 text-lg font-bold text-foreground sm:text-xl">
                  {story.after.title}
                </h4>

                <ul className="mt-6 space-y-3">
                  {story.after.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs text-foreground sm:text-sm font-medium">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-xl border border-primary/30 bg-surface p-4 shadow-sm">
                  <p className="text-[11px] font-medium text-muted">{story.after.metricLabel}</p>
                  <p className="mt-1 font-mono text-xl font-bold text-primary sm:text-2xl">
                    {story.after.metric}
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </Container>
    </section>
  );
}
