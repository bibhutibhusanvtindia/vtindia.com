"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Glasses,
  Globe,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/lib/translations";

interface TechItem {
  name: string;
  category: "spatial" | "fullstack" | "mobile" | "cloud";
  role: string;
  badge: string;
  level: string;
}

const CATEGORIES_MAP = {
  en: [
    { id: "all", label: "All Engineering Stacks" },
    { id: "spatial", label: "AR / VR & Spatial 3D", icon: Glasses },
    { id: "fullstack", label: "Enterprise Web & API", icon: Globe },
    { id: "mobile", label: "Mobile Apps (iOS / Android)", icon: Smartphone },
    { id: "cloud", label: "Cloud & DevOps Infrastructure", icon: Cloud },
  ],
  hi: [
    { id: "all", label: "सभी इंजीनियरिंग स्टैक" },
    { id: "spatial", label: "एआर/वीआर एवं स्पेशियल 3D", icon: Glasses },
    { id: "fullstack", label: "एंटरप्राइज वेब एवं एपीआई", icon: Globe },
    { id: "mobile", label: "मोबाइल ऐप्स (iOS/Android)", icon: Smartphone },
    { id: "cloud", label: "क्लाउड एवं डेवऑप्स", icon: Cloud },
  ],
  or: [
    { id: "all", label: "ସମସ୍ତ ଇଞ୍ଜିନିୟରିଂ ଷ୍ଟାକ୍" },
    { id: "spatial", label: "AR/VR ଓ ସ୍ପାସିଆଲ୍ 3D", icon: Glasses },
    { id: "fullstack", label: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ୱେବ୍ ଓ API", icon: Globe },
    { id: "mobile", label: "ମୋବାଇଲ୍ ଆପ୍ (iOS/Android)", icon: Smartphone },
    { id: "cloud", label: "କ୍ଲାଉଡ୍ ଓ DevOps", icon: Cloud },
  ],
};

const TECH_ITEMS_MAP: Record<"en" | "hi" | "or", TechItem[]> = {
  en: [
    // Spatial & AR/VR
    { name: "Unreal Engine 5", category: "spatial", role: "High-fidelity industrial physics simulations", badge: "Spatial XR", level: "Production Tier" },
    { name: "Unity 3D / C#", category: "spatial", role: "Cross-platform VR simulation for SafeAct & XR apps", badge: "Meta Quest / Vive", level: "Production Tier" },
    { name: "WebXR & Three.js", category: "spatial", role: "Zero-install browser-based 3D digital twins", badge: "WebGL 2.0", level: "Production Tier" },
    { name: "Blender & CAD Pipelines", category: "spatial", role: "Industrial BIM asset optimization & spatial rig", badge: "3D Modeling", level: "Asset Pipeline" },

    // Enterprise Web & API
    { name: "Next.js & React", category: "fullstack", role: "High-speed SSR & modern enterprise interfaces", badge: "Frontend Core", level: "Production Tier" },
    { name: "TypeScript", category: "fullstack", role: "Strict compile-time type safety across all ERP systems", badge: "Type Safety", level: "Standard" },
    { name: "Node.js & Express", category: "fullstack", role: "Scalable asynchronous REST & WebSocket APIs", badge: "Backend Core", level: "Production Tier" },
    { name: "Python & FastAPI", category: "fullstack", role: "Data processing, automated reporting & analytics", badge: "Analytics", level: "Production Tier" },
    { name: "PostgreSQL & Redis", category: "fullstack", role: "ACID compliant relational storage & high-speed cache", badge: "Database", level: "Enterprise Tier" },

    // Mobile
    { name: "Flutter", category: "mobile", role: "High-performance cross-platform iOS and Android apps", badge: "Cross-Platform", level: "Production Tier" },
    { name: "React Native", category: "mobile", role: "Native component bridge for enterprise mobility", badge: "Mobile Core", level: "Production Tier" },
    { name: "Kotlin (Android)", category: "mobile", role: "Hardware-level barcode/RFID scanner integrations", badge: "Native Android", level: "Hardware Bridge" },
    { name: "Swift (iOS)", category: "mobile", role: "High-security executive mobile dashboards", badge: "Native iOS", level: "Hardware Bridge" },

    // Cloud & DevOps
    { name: "AWS & Google Cloud", category: "cloud", role: "Multi-region cloud infrastructure with 99.9% uptime", badge: "Cloud Platform", level: "Enterprise Tier" },
    { name: "Docker & Kubernetes", category: "cloud", role: "Containerized microservices & auto-scaling clusters", badge: "DevOps", level: "Production Tier" },
    { name: "Nginx & Load Balancing", category: "cloud", role: "High-concurrency reverse proxy & SSL termination", badge: "Network", level: "Standard" },
    { name: "ISO 9001 Compliance", category: "cloud", role: "Certified quality management & strict code audit", badge: "Accreditation", level: "Certified" },
  ],
  hi: [
    // Spatial & AR/VR
    { name: "Unreal Engine 5", category: "spatial", role: "उच्च-सटीक औद्योगिक भौतिकी सिमुलेशन", badge: "स्पेशियल XR", level: "उत्पादन स्तर" },
    { name: "Unity 3D / C#", category: "spatial", role: "सेफएक्ट और एक्सआर ऐप्स के लिए क्रॉस-प्लेटफॉर्म वीआर", badge: "मेटा क्वेस्ट / वाइव", level: "उत्पादन स्तर" },
    { name: "WebXR & Three.js", category: "spatial", role: "बिना इंस्टाल के ब्राउज़र-आधारित 3D डिजिटल ट्विन्स", badge: "वेबजीएल 2.0", level: "उत्पादन स्तर" },
    { name: "Blender & CAD Pipelines", category: "spatial", role: "औद्योगिक बीआईएम मॉडल और स्पेशियल रिगिंग", badge: "3D मॉडलिंग", level: "एसेट पाइपलाइन" },

    // Enterprise Web & API
    { name: "Next.js & React", category: "fullstack", role: "हाई-स्पीड एसएसआर और आधुनिक एंटरप्राइज इंटरफेस", badge: "फ्रंटएंड कोर", level: "उत्पादन स्तर" },
    { name: "TypeScript", category: "fullstack", role: "सभी ईआरपी प्रणालियों में सख्त टाइप सुरक्षा", badge: "टाइप सुरक्षा", level: "मानक" },
    { name: "Node.js & Express", category: "fullstack", role: "स्केलेबल एसिंक्रोनस रेस्ट और वेबसॉकेट एपीआई", badge: "बैकएंड कोर", level: "उत्पादन स्तर" },
    { name: "Python & FastAPI", category: "fullstack", role: "डेटा प्रोसेसिंग, स्वचालित रिपोर्टिंग और एनालिटिक्स", badge: "एनालिटिक्स", level: "उत्पादन स्तर" },
    { name: "PostgreSQL & Redis", category: "fullstack", role: "एसीआईडी रिलेशनल स्टोरेज और हाई-स्पीड कैश", badge: "डेटाबेस", level: "एंटरप्राइज स्तर" },

    // Mobile
    { name: "Flutter", category: "mobile", role: "उच्च-प्रदर्शन क्रॉस-प्लेटफॉर्म आईओएस और एंड्रॉइड ऐप्स", badge: "क्रॉस-प्लेटफॉर्म", level: "उत्पादन स्तर" },
    { name: "React Native", category: "mobile", role: "एंटरप्राइज मोबिलिटी के लिए नेटिव कंपोनेंट ब्रिज", badge: "मोबाइल कोर", level: "उत्पादन स्तर" },
    { name: "Kotlin (Android)", category: "mobile", role: "हार्डवेयर स्तर बारकोड/आरएफआईडी स्कैनर एकीकरण", badge: "नेटिव एंड्रॉइड", level: "हार्डवेयर ब्रिज" },
    { name: "Swift (iOS)", category: "mobile", role: "उच्च-सुरक्षा कार्यकारी मोबाइल डैशबोर्ड", badge: "नेटिव iOS", level: "हार्डवेयर ब्रिज" },

    // Cloud & DevOps
    { name: "AWS & Google Cloud", category: "cloud", role: "99.9% अपटाइम के साथ मल्टी-रीजन क्लाउड इंफ्रास्ट्रक्चर", badge: "क्लाउड प्लेटफॉर्म", level: "एंटरप्राइज स्तर" },
    { name: "Docker & Kubernetes", category: "cloud", role: "कंटेनराइज्ड माइक्रोसर्विस और ऑटो-स्केलिंग क्लस्टर्स", badge: "डेवऑप्स", level: "उत्पादन स्तर" },
    { name: "Nginx & Load Balancing", category: "cloud", role: "हाई-कंकरेंसी रिवर्स प्रॉक्सी और एसएसएल टर्मिनेशन", badge: "नेटवर्क", level: "मानक" },
    { name: "ISO 9001 Compliance", category: "cloud", role: "प्रमाणित गुणवत्ता प्रबंधन और कोड ऑडिट", badge: "प्रमाणन", level: "प्रमाणित" },
  ],
  or: [
    // Spatial & AR/VR
    { name: "Unreal Engine 5", category: "spatial", role: "ଉଚ୍ଚମାନର ଶିଳ୍ପ ଭୌତିକ ବିଜ୍ଞାନ ସିମ୍ୟୁଲେସନ୍", badge: "ସ୍ପାସିଆଲ୍ XR", level: "ପ୍ରଡକ୍ସନ୍ ସ୍ତର" },
    { name: "Unity 3D / C#", category: "spatial", role: "ସେଫ୍‌ଆକ୍ଟ ଓ XR ପାଇଁ କ୍ରସ୍-ପ୍ଲାଟଫର୍ମ VR ସିମ୍ୟୁଲେସନ୍", badge: "Meta Quest / Vive", level: "ପ୍ରଡକ୍ସନ୍ ସ୍ତର" },
    { name: "WebXR & Three.js", category: "spatial", role: "ବ୍ରାଉଜର୍-ଆଧାରିତ 3D ଡିଜିଟାଲ୍ ଟ୍ୱିନ୍", badge: "WebGL 2.0", level: "ପ୍ରଡକ୍ସନ୍ ସ୍ତର" },
    { name: "Blender & CAD Pipelines", category: "spatial", role: "ଶିଳ୍ପ BIM ଆସେଟ୍ ଅପ୍ଟିମାଇଜେସନ୍", badge: "3D ମଡେଲିଂ", level: "ଆସେଟ୍ ପାଇପ୍‌ଲାଇନ୍" },

    // Enterprise Web & API
    { name: "Next.js & React", category: "fullstack", role: "ଦ୍ରୁତ SSR ଓ ଆଧୁନିକ ଏଣ୍ଟରପ୍ରାଇଜ୍ ଇଣ୍ଟରଫେସ୍", badge: "ଫ୍ରଣ୍ଟଏଣ୍ଡ କୋର୍", level: "ପ୍ରଡକ୍ସନ୍ ସ୍ତର" },
    { name: "TypeScript", category: "fullstack", role: "ERP ସିଷ୍ଟମ୍‌ରେ କୋଡ୍ ସୁରକ୍ଷା ଓ ଟାଇପ୍ ସେଫ୍ଟି", badge: "ଟାଇପ୍ ସେଫ୍ଟି", level: "ମାନକ" },
    { name: "Node.js & Express", category: "fullstack", role: "ସ୍କେଲେବଲ୍ REST ଓ WebSocket API", badge: "ବ୍ୟାକ୍‌ଏଣ୍ଡ କୋର୍", level: "ପ୍ରଡକ୍ସନ୍ ସ୍ତର" },
    { name: "Python & FastAPI", category: "fullstack", role: "ଡାଟା ପ୍ରୋସେସିଂ, ସ୍ୱୟଂଚାଳିତ ରିପୋର୍ଟ ଓ ଆନାଲିଟିକ୍ସ", badge: "ଆନାଲିଟିକ୍ସ", level: "ପ୍ରଡକ୍ସନ୍ ସ୍ତର" },
    { name: "PostgreSQL & Redis", category: "fullstack", role: "ACID ଡାଟାବେସ୍ ଓ ହାଇ-ସ୍ପିଡ୍ କ୍ୟାଶ୍", badge: "ଡାଟାବେସ୍", level: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ସ୍ତର" },

    // Mobile
    { name: "Flutter", category: "mobile", role: "ଉଚ୍ଚ କ୍ଷମତାସମ୍ପନ୍ନ iOS ଓ Android ଆପ୍", badge: "କ୍ରସ୍-ପ୍ଲାଟଫର୍ମ", level: "ପ୍ରଡକ୍ସନ୍ ସ୍ତର" },
    { name: "React Native", category: "mobile", role: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ମୋବାଇଲ୍ ବ୍ରିଜ୍", badge: "ମୋବାଇଲ୍ କୋର୍", level: "ପ୍ରଡକ୍ସନ୍ ସ୍ତର" },
    { name: "Kotlin (Android)", category: "mobile", role: "ହାର୍ଡୱେର୍ ବାର୍‌କୋଡ୍/RFID ସ୍କାନର୍ ସଂଯୋଗ", badge: "ନେଟିଭ୍ Android", level: "ହାର୍ଡୱେର୍ ବ୍ରିଜ୍" },
    { name: "Swift (iOS)", category: "mobile", role: "ସୁରକ୍ଷିତ ଏକଜିକ୍ୟୁଟିଭ୍ ମୋବାଇଲ୍ ଡ୍ୟାସବୋର୍ଡ", badge: "ନେଟିଭ୍ iOS", level: "ହାର୍ଡୱେର୍ ବ୍ରିଜ୍" },

    // Cloud & DevOps
    { name: "AWS & Google Cloud", category: "cloud", role: "୯୯.୯% ଅପଟାଇମ୍ ସହ କ୍ଲାଉଡ୍ ଭିତ୍ତିଭୂମି", badge: "କ୍ଲାଉଡ୍ ପ୍ଲାଟଫର୍ମ", level: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ସ୍ତର" },
    { name: "Docker & Kubernetes", category: "cloud", role: "କଣ୍ଟେନରାଇଜ୍‌ଡ୍ ମାଇକ୍ରୋସର୍ଭିସ୍ କ୍ଲଷ୍ଟର୍", badge: "DevOps", level: "ପ୍ରଡକ୍ସନ୍ ସ୍ତର" },
    { name: "Nginx & Load Balancing", category: "cloud", role: "ହାଇ-କନକରେନ୍ସି ରିଭର୍ସ ପ୍ରକ୍ସି ଓ SSL", badge: "ନେଟୱର୍କ", level: "ମାନକ" },
    { name: "ISO 9001 Compliance", category: "cloud", role: "ପ୍ରମାଣିତ ଗୁଣବତ୍ତା ପରିଚାଳନା ଓ ଅଡିଟ୍", badge: "ମାନ୍ୟତା", level: "ପ୍ରମାଣିତ" },
  ],
};

export function TechStackHub() {
  const [activeTab, setActiveTab] = useState("all");
  const { lang, t } = useLanguage();

  const categories = CATEGORIES_MAP[lang] || CATEGORIES_MAP.en;
  const items = TECH_ITEMS_MAP[lang] || TECH_ITEMS_MAP.en;

  const filteredItems = items.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface py-24">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("tech_badge")}
            title={t("tech_title")}
            description={t("tech_desc")}
          />
        </div>

        {/* Category Tabs */}
        <div className="mt-12 flex flex-wrap gap-2.5" role="tablist" aria-label="Technology Stacks">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeTab === cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                activeTab === cat.id
                  ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                  : "border-border/80 bg-surface-muted/60 text-muted hover:border-primary/40 hover:bg-surface hover:text-foreground"
              }`}
            >
              {cat.icon && <cat.icon className="h-4 w-4" />}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <SpotlightCard className="flex h-full flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                        {tech.badge}
                      </span>
                      <span className="font-mono text-[10px] font-semibold text-muted">
                        {tech.level}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-bold tracking-tight text-foreground">
                      {tech.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {tech.role}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1 text-[11px] font-semibold text-primary">
                    <Sparkles className="h-3 w-3" />
                    <span>
                      {lang === "hi" ? "उत्पादन सत्यापित" : lang === "or" ? "ପ୍ରଡକ୍ସନ୍ ପ୍ରମାଣିତ" : "Production Grade"}
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
