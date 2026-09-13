"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building,
  CheckCircle2,
  Globe2,
  MapPin,
  Phone,
  Radio,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { site } from "@/data/site";

interface HubInfo {
  city: string;
  label: string;
  type: string;
  address: string;
  phone: string;
  focus: string;
  status: string;
}

const HUBS_MAP: Record<"en" | "hi" | "or", HubInfo[]> = {
  en: [
    {
      city: "Bhubaneswar, Odisha",
      label: "Innovation & Spatial Computing Center",
      type: "Engineering & R&D Hub",
      address: "Tower-A, 4th Floor, Room 409, (O-HUB), SEZ Road, Chandaka Industrial Estate, Bhubaneswar, Odisha",
      phone: "9861802325",
      focus: "AR/VR Simulators · 3D Spatial Systems · Enterprise ERP R&D",
      status: "Active 24/7 Operations",
    },
    {
      city: "Kolkata, West Bengal",
      label: "Corporate Head Office",
      type: "Corporate Headquarters",
      address: "3rd Floor, Jharanalaya, 635 Baishnabghatta, Patuli, Kolkata, West Bengal - 700084",
      phone: "03369029591",
      focus: "Enterprise Software Architecture · Client Relations · Corporate Governance",
      status: "Corporate Management",
    },
  ],
  hi: [
    {
      city: "भुवनेश्वर, ओडिशा",
      label: "नवाचार एवं स्पेशियल कंप्यूटिंग केंद्र",
      type: "इंजीनियरिंग एवं अनुसंधान हब",
      address: "टावर-ए, चौथी मंजिल, कमरा 409, (ओ-हब), सेज रोड, चंदका औद्योगिक एस्टेट, भुवनेश्वर, ओडिशा",
      phone: "9861802325",
      focus: "एआर/वीआर सिमुलेटर · 3D स्पेशियल सिस्टम्स · एंटरप्राइज ईआरपी अनुसंधान",
      status: "24/7 सक्रिय परिचालन",
    },
    {
      city: "कोलकाता, पश्चिम बंगाल",
      label: "कॉर्पोरेट प्रधान कार्यालय",
      type: "कॉर्पोरेट मुख्यालय",
      address: "तीसरी मंजिल, झरनालय, 635 वैष्णवघाटा, पटुली, कोलकाता, पश्चिम बंगाल - 700084",
      phone: "03369029591",
      focus: "एंटरप्राइज सॉफ्टवेयर आर्किटेक्चर · क्लाइंट संबंध · कॉर्पोरेट गवर्नेंस",
      status: "कॉर्पोरेट प्रबंधन",
    },
  ],
  or: [
    {
      city: "ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା",
      label: "ଉଦ୍ଭାବନ ଓ ସ୍ପାସିଆଲ୍ କମ୍ପ୍ୟୁଟିଂ କେନ୍ଦ୍ର",
      type: "ଇଞ୍ଜିନିୟରିଂ ଓ ଗବେଷଣା ହବ୍",
      address: "ଟାୱାର-ଏ, ଚତୁର୍ଥ ମହଲା, ରୁମ୍ ୪୦୯, (O-HUB), SEZ ରୋଡ୍, ଚନ୍ଦକା ଶିଳ୍ପାଞ୍ଚଳ, ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା",
      phone: "9861802325",
      focus: "AR/VR ସିମ୍ୟୁଲେଟର · 3D ସ୍ପାସିଆଲ୍ ସିଷ୍ଟମ୍ · ଏଣ୍ଟରପ୍ରାଇଜ୍ ERP ଗବେଷଣା",
      status: "୨୪/୭ ସକ୍ରିୟ ପରିଚାଳନା",
    },
    {
      city: "କୋଲକାତା, ପଶ୍ଚିମବଙ୍ଗ",
      label: "କର୍ପୋରେଟ୍ ମୁଖ୍ୟ କାର୍ଯ୍ୟାଳୟ",
      type: "କର୍ପୋରେଟ୍ ମୁଖ୍ୟାଳୟ",
      address: "ତୃତୀୟ ମହଲା, ଝରଣାଳୟ, ୬୩୫ ବୈଷ୍ଣବଘାଟା, ପାଟୁଲି, କୋଲକାତା, ପଶ୍ଚିମବଙ୍ଗ - ୭୦୦୦୮୪",
      phone: "03369029591",
      focus: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ସଫ୍ଟୱେର୍ ଆର୍କିଟେକ୍ଚର · ଗ୍ରାହକ ସମ୍ପର୍କ · କର୍ପୋରେଟ୍ ପରିଚାଳନା",
      status: "କର୍ପୋରେଟ୍ ନେତୃତ୍ୱ",
    },
  ],
};

const DEPLOYMENT_REGIONS_MAP = {
  en: [
    { name: "Eastern India Core", area: "Odisha · West Bengal · Jharkhand", desc: "84+ Enterprise & Institutional Clients" },
    { name: "Middle East Presence", area: "United Arab Emirates (UAE)", desc: "Enterprise IT & Logistics Systems" },
    { name: "United Kingdom", area: "London & Regional Partners", desc: "Software & Strategic Technology Consulting" },
  ],
  hi: [
    { name: "पूर्वी भारत मुख्य क्षेत्र", area: "ओडिशा · पश्चिम बंगाल · झारखंड", desc: "84+ एंटरप्राइज व संस्थागत क्लाइंट्स" },
    { name: "मध्य पूर्व उपस्थिति", area: "संयुक्त अरब अमीरात (UAE)", desc: "एंटरप्राइज आईटी एवं लॉजिस्टिक्स सिस्टम्स" },
    { name: "यूनाइटेड किंगडम", area: "लंदन एवं क्षेत्रीय भागीदार", desc: "सॉफ्टवेयर एवं रणनीतिक परामर्श" },
  ],
  or: [
    { name: "ପୂର୍ବ ଭାରତ କେନ୍ଦ୍ର", area: "ଓଡ଼ିଶା · ପଶ୍ଚିମବଙ୍ଗ · ଝାଡ଼ଖଣ୍ଡ", desc: "୮୪+ ଏଣ୍ଟରପ୍ରାଇଜ୍ ଓ ସାଂସ୍ଥାନିକ ଗ୍ରାହକ" },
    { name: "ମଧ୍ୟପ୍ରାଚ୍ୟ ଉପସ୍ଥିତି", area: "ୟୁନାଇଟେଡ୍ ଆରବ ଏମିରେଟ୍ସ (UAE)", desc: "ଏଣ୍ଟରପ୍ରାଇଜ୍ IT ଓ ଲଜିଷ୍ଟିକ୍ସ ପ୍ରଣାଳୀ" },
    { name: "ୟୁନାଇଟେଡ୍ କିଙ୍ଗଡମ୍", area: "ଲଣ୍ଡନ ଓ ଆଞ୍ଚଳିକ ପାର୍ଟନର", desc: "ସଫ୍ଟୱେର୍ ଓ ରଣନୀତିକ ପରାମର୍ଶ" },
  ],
};

import { useLanguage } from "@/lib/translations";

export function GlobalFootprint() {
  const [selectedHub, setSelectedHub] = useState(0);
  const { lang, t } = useLanguage();

  const hubs = HUBS_MAP[lang] || HUBS_MAP.en;
  const regions = DEPLOYMENT_REGIONS_MAP[lang] || DEPLOYMENT_REGIONS_MAP.en;
  const hub = hubs[selectedHub] || hubs[0];

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface py-24">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("footprint_badge")}
            title={t("footprint_title")}
            description={t("footprint_desc")}
          />
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Hub Switcher: 5 Cols */}
          <div className="space-y-4 lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              {lang === "hi" ? "प्राथमिक केंद्र चुनें" : lang === "or" ? "ମୁଖ୍ୟ କେନ୍ଦ୍ର ଚୟନ କରନ୍ତୁ" : "Select Primary Operations Center"}
            </p>
            {hubs.map((h, i) => {
              const isSelected = i === selectedHub;
              return (
                <button
                  key={h.city}
                  onClick={() => setSelectedHub(i)}
                  className={`flex w-full flex-col rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-primary bg-primary/[0.08] shadow-lg shadow-primary/10"
                      : "border-border/80 bg-surface-muted/60 hover:border-primary/40 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                      {h.type}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      {h.status}
                    </span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-foreground">{h.city}</h4>
                  <p className="mt-1 text-xs text-muted">{h.label}</p>
                </button>
              );
            })}

            {/* Global Regions Strip */}
            <div className="mt-6 rounded-2xl border border-border/80 bg-surface-muted/50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                {lang === "hi" ? "क्लाइंट परिनियोजन विस्तार" : lang === "or" ? "ପ୍ରକଳ୍ପ ବିସ୍ତୃତି" : "Client Deployment Reach"}
              </p>
              <div className="mt-3 space-y-2.5">
                {regions.map((reg) => (
                  <div key={reg.name} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <div>
                      <span className="font-bold text-foreground">{reg.name}: </span>
                      <span className="text-muted">{reg.area} ({reg.desc})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Hub Detail Card: 7 Cols */}
          <div className="lg:col-span-7">
            <SpotlightCard enableTilt={false} className="p-6 sm:p-10">
              <div className="flex items-center justify-between border-b border-border/80 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/25">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary">{hub.type}</span>
                    <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {hub.city}
                    </h3>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-600">
                  {lang === "hi" ? "डायरेक्ट लाइन सक्रिय" : lang === "or" ? "ସିଧାସଳଖ ଲାଇନ୍ ସକ୍ରିୟ" : "Direct Line Active"}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    {lang === "hi" ? "केंद्र का पता:" : lang === "or" ? "କେନ୍ଦ୍ରର ଠିକଣା:" : "Facility Address:"}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">{hub.address}</p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-surface-muted/60 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    {lang === "hi" ? "विशिष्ट इंजीनियरिंग फोकस:" : lang === "or" ? "ମୁଖ୍ୟ ଇଞ୍ଜିନିୟରିଂ ଲକ୍ଷ୍ୟ:" : "Specialized Engineering Focus:"}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-primary">{hub.focus}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <a
                    href={`tel:+91${hub.phone}`}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {lang === "hi" ? "कॉल करें:" : lang === "or" ? "କଲ୍ କରନ୍ତୁ:" : "Call Direct:"} {hub.phone}
                  </a>
                  <span className="text-xs text-muted">
                    {lang === "hi" ? "आधिकारिक ईमेल:" : lang === "or" ? "ଅଫିସିଆଲ୍ ଇମେଲ୍:" : "Official Email:"} <strong className="text-foreground">{site.email}</strong>
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
