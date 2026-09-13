"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/translations";

interface FAQItem {
  question: string;
  category: string;
  answer: string;
}

const FAQS_MAP: Record<"en" | "hi" | "or", FAQItem[]> = {
  en: [
    {
      category: "Architecture & IP",
      question: "How does Virtoy ensure zero vendor lock-in and full source code transparency?",
      answer:
        "Every enterprise deployment is built on open, standardized, and type-safe foundations (Next.js, Node.js, Python, PostgreSQL, Unity/WebXR). Clients retain full IP ownership or dedicated on-premise licensing rights, ensuring your internal teams or future audits have complete autonomy without proprietary black-box restrictions.",
    },
    {
      category: "AR / VR & Simulation",
      question: "Can SafeAct VR hazard simulation integrate directly with our enterprise LMS and SAP HRMS?",
      answer:
        "Yes. SafeAct VR is engineered with native SCORM, xAPI, and RESTful webhook connectors. When a plant worker or safety officer completes an emergency evacuation drill or fire hazard test, their reaction scores, biometric telemetry, and certification timestamps synchronize automatically with your central compliance database.",
    },
    {
      category: "SLA & Support",
      question: "What on-ground engineering support and response SLAs are provided?",
      answer:
        "We operate dual regional engineering centers at our Kolkata Head Office and Bhubaneswar O-HUB. Enterprise contracts include dedicated Technical Leads, 24/7 incident monitoring, guaranteed <15-minute response times for critical pipelines, and on-site engineering teams for heavy plant deployments.",
    },
    {
      category: "Enterprise Scale",
      question: "How do Virtoy's ERP suites handle high-concurrency peak institutional loads?",
      answer:
        "Our ERP systems utilize multi-tier caching with Redis and PostgreSQL connection pooling, capable of sustaining 40,000+ simultaneous student/employee queries with sub-second response times, verified in live university admission and examination seasons.",
    },
    {
      category: "Accreditations",
      question: "What certifications and government credentials validate Virtoy Technologies?",
      answer:
        "Virtoy Technologies Pvt. Ltd. is ISO 9001:2015 Certified, recognized by Startup India, registered with MSME (Government of India), empanelled with OCAC (Odisha Computer Application Centre), and supported by Startup Odisha.",
    },
  ],
  hi: [
    {
      category: "आर्किटेक्चर एवं आईपी",
      question: "विर्टॉय वेंडर लॉक-इन से मुक्ति और पूर्ण सोर्स कोड पारदर्शिता कैसे सुनिश्चित करता है?",
      answer:
        "प्रत्येक एंटरप्राइज परिनियोजन खुले और मानकीकृत स्टैक (Next.js, Node.js, Python, PostgreSQL, Unity/WebXR) पर बनाया जाता है। क्लाइंट्स के पास पूर्ण आईपी स्वामित्व या ऑन-प्रिमाइसेस लाइसेंस अधिकार रहते हैं, जिससे आपकी आंतरिक टीम को पूर्ण स्वतंत्रता मिलती है।",
    },
    {
      category: "एआर / वीआर सिमुलेशन",
      question: "क्या सेफएक्ट वीआर सिमुलेटर हमारे मौजूदा एंटरप्राइज एलएमएस और एसएपी एचआरएमएस से जुड़ सकता है?",
      answer:
        "हाँ। सेफएक्ट वीआर नेटिव SCORM, xAPI और RESTful वेबहुक से लैस है। जब कोई प्लांट वर्कर आपातकालीन ड्रिल पूरी करता है, तो उसके रिएक्शन स्कोर और सर्टिफिकेशन रिकॉर्ड केंद्रीय डेटाबेस में स्वतः सिंक हो जाते हैं।",
    },
    {
      category: "एसएलए एवं सहायता",
      question: "विर्टॉय द्वारा क्या ऑन-ग्राउंड इंजीनियरिंग सहायता और एसएलए प्रदान किए जाते हैं?",
      answer:
        "हम कोलकाता मुख्य कार्यालय और भुवनेश्वर ओ-हब से दोहरे इंजीनियरिंग केंद्र संचालित करते हैं। एंटरप्राइज अनुबंधों में समर्पित टेक्निकल लीड्स, 24/7 मॉनिटरिंग और महत्वपूर्ण सिस्टम के लिए <15 मिनट का गारंटीड रिस्पॉन्स समय शामिल है।",
    },
    {
      category: "एंटरप्राइज स्केल",
      question: "विर्टॉय के ईआरपी सिस्टम भारी लोड और पीक ट्रैफिक को कैसे संभालते हैं?",
      answer:
        "हमारे ईआरपी सिस्टम रेडिस और पोस्टग्रेएसक्यूएल कनेक्शन पूलिंग का उपयोग करते हैं, जो विश्वविद्यालय प्रवेश और परीक्षा के समय 40,000+ समवर्ती छात्रों/कर्मचारियों के प्रश्नों को एक सेकंड से भी कम समय में प्रोसेस करने में सक्षम हैं।",
    },
    {
      category: "प्रमाणन एवं मान्यताएं",
      question: "विर्टॉय टेक्नोलॉजीज के पास कौन से सरकारी प्रमाणपत्र और मान्यताएं हैं?",
      answer:
        "विर्टॉय टेक्नोलॉजीज प्राइवेट लिमिटेड आईएसओ 9001:2015 प्रमाणित है, स्टार्टअप इंडिया द्वारा मान्यता प्राप्त है, भारत सरकार के एमएसएमई में पंजीकृत है और स्टार्टअप ओडिशा द्वारा समर्थित है।",
    },
  ],
  or: [
    {
      category: "ଆର୍କିଟେକ୍ଚର ଓ ଆଇପି",
      question: "ଭର୍ଚ୍ଚୋଏ ଭେଣ୍ଡର ଲକ୍-ଇନ୍ ମୁକ୍ତ ଏବଂ ସମ୍ପୂର୍ଣ୍ଣ ସୋର୍ସ କୋଡ୍ ସ୍ୱଚ୍ଛତା କିପରି ସୁନିଶ୍ଚିତ କରେ?",
      answer:
        "ପ୍ରତ୍ୟେକ ଏଣ୍ଟରପ୍ରାଇଜ୍ ସଫ୍ଟୱେର୍ ମୁକ୍ତ ଓ ମାନକ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା (Next.js, Node.js, Python, PostgreSQL, Unity/WebXR) ଉପରେ ନିର୍ମିତ। ଗ୍ରାହକମାନେ ସମ୍ପୂର୍ଣ୍ଣ ଆଇପି ମାଲିକାନା କିମ୍ବା ଉତ୍ସର୍ଗୀକୃତ ଅନ୍-ପ୍ରିମାଇସେସ୍ ଲାଇସେନ୍ସ ଅଧିକାର ପାଆନ୍ତି।",
    },
    {
      category: "ଏଆର୍ / ଭିଆର୍ ସିମ୍ୟୁଲେସନ୍",
      question: "ସେଫ୍‌ଆକ୍ଟ ଭିଆର୍ ସିମ୍ୟୁଲେଟର ଆମର ବିଦ୍ୟମାନ LMS କିମ୍ବା SAP ସହିତ ଯୋଡ଼ି ହୋଇପାରିବ କି?",
      answer:
        "ହଁ। ସେଫ୍‌ଆକ୍ଟ ଭିଆର୍ SCORM, xAPI ଏବଂ RESTful ୱେବ୍‌ହୁକ୍ ସହିତ ସମ୍ପୂର୍ଣ୍ଣ ସୁସଙ୍ଗତ। ଯେତେବେଳେ କର୍ମଚାରୀ ଜରୁରୀକାଳୀନ ଡ୍ରିଲ୍ ଶେଷ କରନ୍ତି, ସେମାନଙ୍କ ଟ୍ରେନିଂ ସ୍କୋର ଏବଂ ପ୍ରମାଣପତ୍ର ସ୍ୱୟଂଚାଳିତ ଭାବେ କେନ୍ଦ୍ରୀୟ ଡାଟାବେସ୍ ସହ ସିଙ୍କ୍ ହୁଏ।",
    },
    {
      category: "SLA ଓ ସପୋର୍ଟ",
      question: "ଭର୍ଚ୍ଚୋଏ ଦ୍ୱାରା କିପରି ଅନ୍-ଗ୍ରାଉଣ୍ଡ ଇଞ୍ଜିନିୟରିଂ ସହାୟତା ଏବଂ SLA ପ୍ରଦାନ କରାଯାଏ?",
      answer:
        "ଆମେ କୋଲକାତା ମୁଖ୍ୟ କାର୍ଯ୍ୟାଳୟ ଏବଂ ଭୁବନେଶ୍ୱର ଓ-ହବ୍ ରୁ ଦୁଇଟି ଇଞ୍ଜିନିୟରିଂ କେନ୍ଦ୍ର ପରିଚାଳନା କରୁ। ଏଣ୍ଟରପ୍ରାଇଜ୍ ଚୁକ୍ତିରେ ଉତ୍ସର୍ଗୀକୃତ ଟେକ୍ନିକାଲ୍ ଲିଡ୍, ୨୪/୭ ମନିଟରିଂ ଏବଂ <୧୫ ମିନିଟ୍‌ର ତୁରନ୍ତ ରେସପନ୍ସ ସମୟ ସାମିଲ୍ ଅଛି।",
    },
    {
      category: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ସ୍କେଲ୍",
      question: "ଭର୍ଚ୍ଚୋଏର ERP ସିଷ୍ଟମ୍ କିପରି ଅତ୍ୟଧିକ ୟୁଜର୍ ଟ୍ରାଫିକ୍ ନିୟନ୍ତ୍ରଣ କରେ?",
      answer:
        "ଆମର ERP ସିଷ୍ଟମ୍ ରେଡିସ୍ କ୍ୟାଚିଂ ଏବଂ ପୋଷ୍ଟଗ୍ରେସ୍କ୍ୟୁଏଲ୍ କନେକ୍ସନ୍ ପୁଲିଂ ବ୍ୟବହାର କରେ, ଯାହା ପରୀକ୍ଷା ଓ ଆଡମିଶନ ସମୟରେ ୪୦,୦୦୦+ ଛାତ୍ରଛାତ୍ରୀ/କର୍ମଚାରୀଙ୍କ ଲାଇଭ୍ ଟ୍ରାଫିକ୍‌କୁ ବିନା କୌଣସି ବିଳମ୍ବରେ ନିୟନ୍ତ୍ରଣ କରିପାରେ।",
    },
    {
      category: "ସ୍ୱୀକୃତି ଓ ପ୍ରମାଣପତ୍ର",
      question: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍‌କୁ କେଉଁ ସରକାରୀ ପ୍ରମାଣପତ୍ର ଓ ମାନ୍ୟତା ପ୍ରଦାନ କରାଯାଇଛି?",
      answer:
        "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ପ୍ରାଇଭେଟ୍ ଲିମିଟେଡ୍ ISO 9001:2015 ପ୍ରମାଣିତ, ଷ୍ଟାର୍ଟଅପ୍ ଇଣ୍ଡିଆ ଦ୍ୱାରା ସ୍ୱୀକୃତ, ଭାରତ ସରକାରଙ୍କ MSME ରେ ପଞ୍ଜୀକୃତ ଏବଂ ଷ୍ଟାର୍ଟଅପ୍ ଓଡ଼ିଶା ଦ୍ୱାରା ସମର୍ଥିତ।",
    },
  ],
};

export function EnterpriseFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { lang, t } = useLanguage();

  const faqs = FAQS_MAP[lang] || FAQS_MAP.en;

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted/60 py-24">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("faq_badge")}
            title={t("faq_title")}
            description={t("faq_desc")}
          />
        </div>

        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal key={faq.question} delay={idx * 0.05}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-primary/50 bg-surface shadow-md shadow-primary/10"
                      : "border-border/80 bg-surface/80 hover:border-primary/30"
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                        {faq.category}
                      </span>
                      <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                        isOpen ? "rotate-180 border-primary bg-primary text-white" : "border-border text-muted"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                      >
                        <div className="border-t border-border/60 px-6 pb-6 pt-4">
                          <p className="text-sm leading-relaxed text-muted sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
