"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface FAQItem {
  question: string;
  category: string;
  answer: string;
}

const FAQS: FAQItem[] = [
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
];

export function EnterpriseFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            eyebrow="Executive Decision Guide"
            title="Frequently Asked Questions"
            description="Clear, transparent answers to help executive leadership, safety directors, and technical teams evaluate Virtoy."
          />
        </div>

        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {FAQS.map((faq, idx) => {
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
