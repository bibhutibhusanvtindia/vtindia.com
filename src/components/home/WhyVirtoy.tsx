"use client";

import { Award, CheckCircle2, Cpu, GraduationCap, Headphones, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/lib/translations";

export function WhyVirtoy() {
  const { lang, t } = useLanguage();

  const PILLARS = [
    {
      icon: GraduationCap,
      number: "01",
      title: t("why_card1_title"),
      tagline: lang === "hi" ? "हर स्तर पर इंजीनियरिंग मानक" : lang === "or" ? "ଉଚ୍ଚମାନର ଇଞ୍ଜିନିୟରିଂ" : "Engineering Rigor at Every Layer",
      description: t("why_card1_desc"),
      highlights: [
        lang === "hi" ? "माइक्रोसर्विस एवं हाइब्रिड आर्किटेक्चर" : lang === "or" ? "ମାଇକ୍ରୋସର୍ଭିସ୍ ଓ ହାଇବ୍ରିଡ୍ ଆର୍କିଟେକ୍ଚର" : "Microservice & monolithic hybrid architectures",
        lang === "hi" ? "सख्त टाइप सेफ्टी और कोड ऑडिट" : lang === "or" ? "କୋଡ୍ ସୁରକ୍ଷା ଓ ଅଡିଟ୍" : "Strict compile-time type safety & peer code reviews",
        lang === "hi" ? "रियल-टाइम सिमुलेशन पाइपलाइन" : lang === "or" ? "ରିଅଲ୍-ଟାଇମ୍ ସିମ୍ୟୁଲେସନ୍" : "Zero-latency WebGL & real-time simulation pipelines",
      ],
    },
    {
      icon: ShieldCheck,
      number: "02",
      title: t("why_card2_title"),
      tagline: lang === "hi" ? "उद्योग व शिक्षा में सिद्ध सफलता" : lang === "or" ? "ଶିଳ୍ପ ଓ ଶିକ୍ଷାରେ ପରୀକ୍ଷିତ" : "Field-Tested in Heavy Industry & Education",
      description: t("why_card2_desc"),
      highlights: [
        lang === "hi" ? "10+ वर्षों में 99.8% ग्राहक प्रतिधारण" : lang === "or" ? "୧୦+ ବର୍ଷରେ ୯୯.୮% ଗ୍ରାହକ ବିଶ୍ୱାସ" : "99.8% client retention rate over 10+ years",
        lang === "hi" ? "40,000+ दैनिक सक्रिय उपयोगकर्ता" : lang === "or" ? "୪୦,୦୦୦+ ଦୈନିକ ଉପଭୋକ୍ତା" : "Over 40,000+ daily active users across systems",
        lang === "hi" ? "मल्टी-फैसिलिटी एंटरप्राइज डेटा सिंक" : lang === "or" ? "ଏଣ୍ଟରପ୍ରାଇଜ୍ ଡାଟା ସିଙ୍କ୍" : "Multi-facility enterprise data synchronization",
      ],
    },
    {
      icon: Layers,
      number: "03",
      title: lang === "hi" ? "16 प्रोप्राइटरी सॉफ्टवेयर उत्पाद" : lang === "or" ? "୧୬ଟି ଡିଜିଟାଲ୍ ସଫ୍ଟୱେର୍ ପ୍ରଡକ୍ଟ" : "16 Proprietary Production Software Systems",
      tagline: lang === "hi" ? "कस्टम डिप्लॉयमेंट के लिए तैयार" : lang === "or" ? "କଷ୍ଟମ୍ ବ୍ୟବହାର ପାଇଁ ପ୍ରସ୍ତୁତ" : "Modular IP, Ready for Custom Deployment",
      description: lang === "hi" ? "सेफएक्ट इंडस्ट्रियल सेफ्टी से लेकर कैंपस ईआरपी, हॉस्पिटल और होटल पीएमएस तक—हमारा अपना कोर सॉफ्टवेयर।" : lang === "or" ? "ସେଫ୍‌ଆକ୍ଟ ଶିଳ୍ପ ନିରାପତ୍ତା ଠାରୁ କ୍ୟାମ୍ପସ୍ ଇଆରପି ଓ ହୋଟେଲ୍ ପିଏମ୍ଏସ୍ ପର୍ଯ୍ୟନ୍ତ ନିଜସ୍ୱ ସଫ୍ଟୱେର୍।" : "From SafeAct Industrial Safety to Campus ERP, Healthcare Systems, and Hotel PMS — we build and own our core software IP with rapid customization.",
      highlights: [
        lang === "hi" ? "एंटरप्राइज वर्कफ़्लो के लिए पूर्ण कस्टमाइज़ेशन" : lang === "or" ? "ସମ୍ପୂର୍ଣ୍ଣ କଷ୍ଟମାଇଜେସନ୍ ସୁବିଧା" : "Full source-level customization for enterprise workflows",
        lang === "hi" ? "शून्य थर्ड-पार्टी वेंडर निर्भरता" : lang === "or" ? "ଶୂନ ତୃତୀୟ ପକ୍ଷ ନିର୍ଭରତା" : "Zero third-party vendor lock-in",
        lang === "hi" ? "मौजूदा सिस्टम के साथ एपीआई एकीकरण" : lang === "or" ? "ଏପିଆଇ ଇଣ୍ଟିଗ୍ରେସନ୍ ସୁବିଧା" : "Comprehensive API integration with existing legacy systems",
      ],
    },
    {
      icon: Headphones,
      number: "04",
      title: t("why_card3_title"),
      tagline: lang === "hi" ? "कोलकाता और भुवनेश्वर से ऑन-ग्राउंड सहायता" : lang === "or" ? "କୋଲକାତା ଓ ଭୁବନେଶ୍ୱରରୁ ସପୋର୍ଟ" : "On-Ground Engineering Support",
      description: t("why_card3_desc"),
      highlights: [
        lang === "hi" ? "समर्पित अकाउंट मैनेजर व टेक्निकल लीड्स" : lang === "or" ? "ଉତ୍ସର୍ଗୀକୃତ ଟେକ୍ନିକାଲ୍ ଟିମ୍" : "Dedicated account managers & technical leads",
        lang === "hi" ? "सख्त अपटाइम एसएलए व प्रोएक्टिव मॉनिटरिंग" : lang === "or" ? "୯୯.୯% ଅପଟାଇମ୍ ସୁନିଶ୍ଚିତ" : "Strict uptime SLAs & proactive system monitoring",
        lang === "hi" ? "ऑन-साइट इंस्टालेशन व ट्रेनिंग सपोर्ट" : lang === "or" ? "ଅନ-ସାଇଟ୍ ଟ୍ରେନିଂ ଓ ଇନଷ୍ଟଲେସନ୍" : "On-site deployment, training & compliance auditing",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted/40 py-24">
      {/* Subtle brand ambient glow */}
      <div
        className="pointer-events-none absolute -right-32 top-1/2 h-80 w-80 rounded-full bg-primary/[0.05] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-1/3 h-80 w-80 rounded-full bg-accent-strong/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("why_eyebrow")}
            title={t("why_title")}
            description={
              lang === "hi"
                ? "आईआईटी इंजीनियरिंग उत्कृष्टता, सिद्ध विश्वसनीयता और एक दशक का अनुभव।"
                : lang === "or"
                ? "ଆଇଆଇଟି ଇଞ୍ଜିନିୟରିଂ ଉତ୍କର୍ଷତା, ନିର୍ଭରଯୋଗ୍ୟତା ଏବଂ ଗୋଟିଏ ଦଶନ୍ଧିର ଅଭିଜ୍ଞତା।"
                : "A blend of elite IIT engineering heritage, proven industrial reliability, and a decade of hands-on delivery."
            }
          />
        </div>

        {/* 2x2 Bento Grid with 3D Spotlight Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={idx * 0.08}>
                <SpotlightCard
                  enableTilt={true}
                  className="group h-full p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/15"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-muted/60 group-hover:text-primary">
                      {pillar.number}
                    </span>
                  </div>

                  <div className="mt-6">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {pillar.tagline}
                    </span>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.description}</p>
                  </div>

                  <div className="mt-6 border-t border-border/70 pt-5">
                    <ul className="space-y-2.5">
                      {pillar.highlights.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-xs text-muted">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
