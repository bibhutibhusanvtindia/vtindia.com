"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/lib/icons";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/lib/translations";

export interface LocalizedService {
  slug: string;
  name: string;
  summary: string;
  highlights: string[];
  icon: string;
}

const SERVICES_MAP: Record<"en" | "hi" | "or", LocalizedService[]> = {
  en: [
    {
      slug: "software-development",
      name: "Software Development",
      summary: "Innovative, robust, and high-performance software solutions for diverse industries.",
      highlights: ["Web applications", "Mobile apps", "Enterprise systems", "Automation tools"],
      icon: "Code2",
    },
    {
      slug: "web-application",
      name: "Web Application",
      summary: "Custom-built, scalable, and efficient web solutions tailored to your business needs.",
      highlights: ["Business analysis", "Market & competitor research", "Security-first architecture", "Modern design standards"],
      icon: "Globe",
    },
    {
      slug: "digital-marketing",
      name: "Digital Marketing",
      summary: "Strategic online growth through SEO, social media, and advertising.",
      highlights: ["Social & video marketing", "Paid advertising", "Lead generation", "Brand visibility"],
      icon: "Megaphone",
    },
    {
      slug: "seo-consulting",
      name: "SEO Consulting",
      summary: "Expert guidance to improve visibility, fix technical issues, and attract the right audience.",
      highlights: ["Website audits", "Keyword research", "On-page & off-page SEO", "Performance analysis"],
      icon: "Search",
    },
    {
      slug: "internet-marketing",
      name: "Internet Marketing",
      summary: "Driving brand visibility and engagement through strategic internet marketing solutions.",
      highlights: ["SEO & social media", "Email campaigns", "Pay-per-click ads", "Real-time tracking"],
      icon: "TrendingUp",
    },
    {
      slug: "mobile-app-consulting",
      name: "Mobile App Consulting",
      summary: "Expert guidance for seamless, user-friendly, and scalable mobile solutions.",
      highlights: ["Architecture & platform strategy", "Security guidance", "Backend integration", "Performance optimization"],
      icon: "Smartphone",
    },
    {
      slug: "project-management",
      name: "Project Management",
      summary: "Strategic planning and execution to ensure timely and successful project delivery.",
      highlights: ["Agile / Scrum / Waterfall", "Risk management", "Stakeholder communication", "Scope & timeline control"],
      icon: "ClipboardList",
    },
    {
      slug: "naac-nba",
      name: "NAAC & NBA Accreditation Consulting",
      summary: "Guiding institutions toward seamless accreditation and growth.",
      highlights: ["Readiness assessment", "IQAC workflow ERP", "Mentor & advisor access", "Predictive accreditation insight"],
      icon: "GraduationCap",
    },
  ],
  hi: [
    {
      slug: "software-development",
      name: "सॉफ्टवेयर विकास",
      summary: "विभिन्न उद्योगों के लिए अभिनव, मजबूत और उच्च प्रदर्शन वाले सॉफ्टवेयर समाधान।",
      highlights: ["वेब एप्लिकेशन", "मोबाइल ऐप्स", "एंटरप्राइज सिस्टम्स", "ऑटोमेशन टूल्स"],
      icon: "Code2",
    },
    {
      slug: "web-application",
      name: "वेब एप्लिकेशन",
      summary: "आपकी व्यावसायिक आवश्यकताओं के अनुरूप निर्मित, स्केलेबल और कुशल वेब समाधान।",
      highlights: ["व्यावसायिक विश्लेषण", "बाजार व प्रतिस्पर्धा अनुसंधान", "सुरक्षा-प्रथम आर्किटेक्चर", "आधुनिक डिजाइन मानक"],
      icon: "Globe",
    },
    {
      slug: "digital-marketing",
      name: "डिजिटल मार्केटिंग",
      summary: "एसईओ, सोशल मीडिया और विज्ञापनों के माध्यम से रणनीतिक ऑनलाइन विकास।",
      highlights: ["सोशल एवं वीडियो मार्केटिंग", "पेड विज्ञापन", "लीड जनरेशन", "ब्रांड दृश्यता"],
      icon: "Megaphone",
    },
    {
      slug: "seo-consulting",
      name: "एसईओ परामर्श",
      summary: "सर्च रैंकिंग सुधारने, तकनीकी समस्याओं को ठीक करने और सही दर्शकों को आकर्षित करने हेतु विशेषज्ञ मार्गदर्शन।",
      highlights: ["वेबसाइट ऑडिट", "कीवर्ड अनुसंधान", "ऑन-पेज व ऑफ-पेज एसईओ", "प्रदर्शन विश्लेषण"],
      icon: "Search",
    },
    {
      slug: "internet-marketing",
      name: "इंटरनेट मार्केटिंग",
      summary: "रणनीतिक इंटरनेट मार्केटिंग समाधानों के माध्यम से ब्रांड दृश्यता और जुड़ाव बढ़ाना।",
      highlights: ["एसईओ व सोशल मीडिया", "ईमेल अभियान", "पे-पर-क्लिक विज्ञापन", "रियल-टाइम ट्रैकिंग"],
      icon: "TrendingUp",
    },
    {
      slug: "mobile-app-consulting",
      name: "मोबाइल ऐप परामर्श",
      summary: "सहज, उपयोगकर्ता-अनुकूल और स्केलेबल मोबाइल समाधानों के लिए विशेषज्ञ मार्गदर्शन।",
      highlights: ["आर्किटेक्चर व प्लेटफॉर्म रणनीति", "सुरक्षा मार्गदर्शन", "बैकएंड एकीकरण", "प्रदर्शन अनुकूलन"],
      icon: "Smartphone",
    },
    {
      slug: "project-management",
      name: "प्रोजेक्ट मैनेजमेंट",
      summary: "समय पर और सफल प्रोजेक्ट डिलीवरी सुनिश्चित करने के लिए रणनीतिक योजना और निष्पादन।",
      highlights: ["एजाइल / स्क्रम / वॉटरफॉल", "जोखिम प्रबंधन", "हितधारक संचार", "स्कोप व समयसीमा नियंत्रण"],
      icon: "ClipboardList",
    },
    {
      slug: "naac-nba",
      name: "नैक एवं एनबीए प्रत्यायन परामर्श",
      summary: "संस्थानों को निर्बाध प्रत्यायन और शैक्षणिक विकास की दिशा में मार्गदर्शन।",
      highlights: ["तैयारी का मूल्यांकन", "आईक्यूएसी वर्कफ़्लो ईआरपी", "मेंटर व सलाहकार सहायता", "अनुमानित प्रत्यायन विश्लेषण"],
      icon: "GraduationCap",
    },
  ],
  or: [
    {
      slug: "software-development",
      name: "ସଫ୍ଟୱେର୍ ଡେଭଲପମେଣ୍ଟ",
      summary: "ବିଭିନ୍ନ ଶିଳ୍ପ ଓ ବ୍ୟବସାୟ ପାଇଁ ଅଭିନବ, ଶକ୍ତିଶାଳୀ ଏବଂ ଉଚ୍ଚ କାର୍ଯ୍ୟକ୍ଷମ ସଫ୍ଟୱେର୍ ସମାଧାନ।",
      highlights: ["ୱେବ୍ ଆପ୍ଲିକେସନ୍", "ମୋବାଇଲ୍ ଆପ୍", "ଏଣ୍ଟରପ୍ରାଇଜ୍ ସିଷ୍ଟମ୍", "ଅଟୋମେସନ୍ ଟୁଲ୍ସ"],
      icon: "Code2",
    },
    {
      slug: "web-application",
      name: "ୱେବ୍ ଆପ୍ଲିକେସନ୍",
      summary: "ଆପଣଙ୍କ ବ୍ୟବସାୟିକ ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ନିର୍ମିତ ସୁରକ୍ଷିତ ଓ ସ୍କେଲେବଲ୍ ୱେବ୍ ସମାଧାନ।",
      highlights: ["ବ୍ୟବସାୟିକ ବିଶ୍ଳେଷଣ", "ପ୍ରତିଯୋଗୀ ଅନୁସନ୍ଧାନ", "ସୁରକ୍ଷିତ ଆର୍କିଟେକ୍ଚର", "ଆଧୁନିକ ଡିଜାଇନ୍ ମାନଦଣ୍ଡ"],
      icon: "Globe",
    },
    {
      slug: "digital-marketing",
      name: "ଡିଜିଟାଲ୍ ମାର୍କେଟିଂ",
      summary: "SEO, ସୋସିଆଲ୍ ମିଡିଆ ଏବଂ ବିଜ୍ଞାପନ ମାଧ୍ୟମରେ ରଣନୀତିକ ଅନଲାଇନ୍ ଅଭିବୃଦ୍ଧି।",
      highlights: ["ସୋସିଆଲ୍ ଓ ଭିଡିଓ ମାର୍କେଟିଂ", "ବିଜ୍ଞାପନ ଅଭିଯାନ", "ଲିଡ୍ ଜେନେରେସନ୍", "ବ୍ରାଣ୍ଡ୍ ଲୋକପ୍ରିୟତା"],
      icon: "Megaphone",
    },
    {
      slug: "seo-consulting",
      name: "SEO କନସଲ୍ଟିଂ",
      summary: "ଗୁଗୁଲ୍ ରେଙ୍କିଙ୍ଗ୍ ବୃଦ୍ଧି, ବୈଷୟିକ ତ୍ରୁଟି ସଂଶୋଧନ ଏବଂ ଲକ୍ଷ୍ୟଭିତ୍ତିକ ଟ୍ରାଫିକ୍ ପାଇଁ ବିଶେଷଜ୍ଞ ପରାମର୍ଶ।",
      highlights: ["ୱେବସାଇଟ୍ ଅଡିଟ୍", "କୀ-ୱାର୍ଡ ରିସର୍ଚ୍ଚ", "ଅନ୍-ପେଜ୍ ଓ ଅଫ୍-ପେଜ୍ SEO", "ପରଫରମାନ୍ସ ଆନାଲିସିସ୍"],
      icon: "Search",
    },
    {
      slug: "internet-marketing",
      name: "ଇଣ୍ଟରନେଟ୍ ମାର୍କେଟିଂ",
      summary: "ରଣନୀତିକ ଇଣ୍ଟରନେଟ୍ ମାର୍କେଟିଂ ମାଧ୍ୟମରେ ବ୍ରାଣ୍ଡ୍ ପରିଚୟ ଏବଂ ଗ୍ରାହକ ଯୋଗାଯୋଗ ବୃଦ୍ଧି।",
      highlights: ["SEO ଓ ସୋସିଆଲ୍ ମିଡିଆ", "ଇମେଲ୍ କ୍ୟାମ୍ପେନ୍", "PPC ବିଜ୍ଞାପନ", "ରିଅଲ୍-ଟାଇମ୍ ଟ୍ରାକିଂ"],
      icon: "TrendingUp",
    },
    {
      slug: "mobile-app-consulting",
      name: "ମୋବାଇଲ୍ ଆପ୍ କନସଲ୍ଟିଂ",
      summary: "ଉତ୍କୃଷ୍ଟ, ୟୁଜର୍-ଫ୍ରେଣ୍ଡଲି ଏବଂ ସ୍କେଲେବଲ୍ ମୋବାଇଲ୍ ସମାଧାନ ପାଇଁ ବିଶେଷଜ୍ଞ ମାର୍ଗଦର୍ଶନ।",
      highlights: ["ଆର୍କିଟେକ୍ଚର ଓ ପ୍ଲାଟଫର୍ମ ରଣନୀତି", "ସୁରକ୍ଷା ମାର୍ଗଦର୍ଶନ", "ବ୍ୟାକଏଣ୍ଡ ସଂଯୋଗ", "କାର୍ଯ୍ୟକ୍ଷମତା ବୃଦ୍ଧି"],
      icon: "Smartphone",
    },
    {
      slug: "project-management",
      name: "ପ୍ରୋଜେକ୍ଟ ମ୍ୟାନେଜମେଣ୍ଟ",
      summary: "ସମୟାନୁବର୍ତ୍ତୀ ଏବଂ ସଫଳ ପ୍ରକଳ୍ପ ସମ୍ପାଦନ ପାଇଁ ରଣନୀତିକ ଯୋଜନା ଓ ପରିଚାଳନା।",
      highlights: ["Agile / Scrum / Waterfall", "ବିପଦ ପରିଚାଳନା", "ଗ୍ରାହକ ଯୋଗାଯୋଗ", "ସମୟ ଓ ବଜେଟ୍ ନିୟନ୍ତ୍ରଣ"],
      icon: "ClipboardList",
    },
    {
      slug: "naac-nba",
      name: "NAAC ଓ NBA ସ୍ୱୀକୃତି ପରାମର୍ଶ",
      summary: "ଶିକ୍ଷାନୁଷ୍ଠାନମାନଙ୍କୁ ସହଜ ପ୍ରତ୍ୟାୟନ (Accreditation) ଏବଂ ଅଭିବୃଦ୍ଧି ପାଇଁ ମାର୍ଗଦର୍ଶନ।",
      highlights: ["ପ୍ରସ୍ତୁତି ମୂଲ୍ୟାଙ୍କନ", "IQAC ୱାର୍କଫ୍ଲୋ ERP", "ପରାମର୍ଶଦାତା ସହାୟତା", "ପୂର୍ବାନୁମାନ ବିଶ୍ଳେଷଣ"],
      icon: "GraduationCap",
    },
  ],
};

export function ServicesGrid() {
  const { lang, t } = useLanguage();
  const currentServices = SERVICES_MAP[lang] || SERVICES_MAP.en;
  const [lead, ...rest] = currentServices.slice(0, 6);

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted py-24">
      {/* faint brand pattern */}
      <div
        className="absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("services_eyebrow")}
            title={t("services_title")}
            description={t("services_subtitle")}
          />
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold shadow-sm transition hover:border-primary/50 hover:text-primary"
            >
              {t("services_view_all")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Lead card */}
          <Reveal className="lg:row-span-2">
            <Link
              href={`/services/${lead.slug}`}
              data-voice-speak={`Flagship Service: ${lead.name}. ${lead.summary}. Our core capabilities include ${lead.highlights.join(", ")}.`}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary via-primary to-primary-strong p-8 text-white shadow-xl shadow-primary/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/35"
            >
              <div className="absolute inset-0 bg-grid opacity-[0.14]" aria-hidden="true" />
              <div
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl transition-transform duration-700 group-hover:scale-125"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-white/90 backdrop-blur-sm">
                    {lang === "hi"
                      ? "प्रमुख पेशकश"
                      : lang === "or"
                      ? "ପ୍ରମୁଖ ସେବା"
                      : "Flagship Offering"}
                  </span>
                  <span className="font-mono text-xs text-white/70">01</span>
                </div>

                <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                  <Icon name={lead.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-white">{lead.name}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85">{lead.summary}</p>
              </div>

              <div className="relative mt-10">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                  {lang === "hi"
                    ? "मुख्य क्षमताएं"
                    : lang === "or"
                    ? "ମୁଖ୍ୟ କ୍ଷମତା"
                    : "Core Capabilities"}
                </p>
                <ul className="mt-3 space-y-2">
                  {lead.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-xs text-white/90">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-4">
                  <span className="text-xs font-medium text-white/80">
                    {lang === "hi"
                      ? "एंटरप्राइज आर्किटेक्चर"
                      : lang === "or"
                      ? "ଏଣ୍ଟରପ୍ରାଇଜ୍ ଆର୍କିଟେକ୍ଚର"
                      : "Tailored Enterprise Architecture"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    {lang === "hi"
                      ? "सेवा देखें"
                      : lang === "or"
                      ? "ସେବା ଦେଖନ୍ତୁ"
                      : "Explore service"}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {rest.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 2) * 0.07}>
              <SpotlightCard
                enableTilt={true}
                className="h-full shadow-sm transition-all duration-400 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
              >
                <Link
                  href={`/services/${service.slug}`}
                  data-voice-speak={`Service: ${service.name}. ${service.summary}. Key highlights include ${service.highlights.slice(0, 2).join(", ")}.`}
                  className="group relative flex h-full flex-col justify-between p-6 sm:p-7"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-400 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/30">
                        <Icon name={service.icon} className="h-5 w-5" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2">{service.summary}</p>
                  </div>

                  <div className="mt-6 border-t border-border/70 pt-3">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-all group-hover:gap-2">
                      {lang === "hi"
                        ? "विवरण देखें"
                        : lang === "or"
                        ? "ବିବରଣୀ ଦେଖନ୍ତୁ"
                        : "View details"}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
