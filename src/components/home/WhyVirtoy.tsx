"use client";

import { Award, CheckCircle2, Cpu, GraduationCap, Headphones, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const PILLARS = [
  {
    icon: GraduationCap,
    number: "01",
    title: "Founded by IIT Alumni & Senior Engineers",
    tagline: "Engineering Rigor at Every Layer",
    description:
      "Founded by a team of experienced IIT alumni and energetic engineering professionals, building systems with mathematical precision and zero architectural debt.",
    highlights: [
      "Microservice & monolithic hybrid architectures",
      "Strict compile-time type safety & peer code reviews",
      "Zero-latency WebGL & real-time simulation pipelines",
    ],
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "84+ Verified Enterprise & Institutional Deployments",
    tagline: "Field-Tested in Heavy Industry & Education",
    description:
      "Proven track record delivering mission-critical safety, ERP, and digital systems for industrial giants like Tata Steel, Vedanta, JSPL, and Dalmia Cement.",
    highlights: [
      "99.8% client retention rate over 10+ years",
      "Over 40,000+ daily active users across systems",
      "Multi-facility enterprise data synchronization",
    ],
  },
  {
    icon: Layers,
    number: "03",
    title: "16 Proprietary Production Software Systems",
    tagline: "Modular IP, Ready for Custom Deployment",
    description:
      "From SafeAct Industrial Safety to Campus ERP, Healthcare Systems, and Hotel PMS — we build and own our core software IP with rapid customization.",
    highlights: [
      "Full source-level customization for enterprise workflows",
      "Zero third-party vendor lock-in",
      "Comprehensive API integration with existing legacy systems",
    ],
  },
  {
    icon: Headphones,
    number: "04",
    title: "24/7 Dedicated Support SLA & Dual Regional Hubs",
    tagline: "On-Ground Engineering Support",
    description:
      "Direct access to certified software engineers stationed at our Kolkata Head Office and Bhubaneswar O-HUB, ensuring immediate turnaround.",
    highlights: [
      "Dedicated account managers & technical leads",
      "Strict uptime SLAs & proactive system monitoring",
      "On-site deployment, training & compliance auditing",
    ],
  },
];

export function WhyVirtoy() {
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
            eyebrow="The Virtoy Advantage"
            title="Why Leading Enterprises & Institutions Choose Us"
            description="A blend of elite IIT engineering heritage, proven industrial reliability, and a decade of hands-on delivery."
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

                  <span className="mt-6 inline-block text-xs font-semibold text-primary">
                    {pillar.tagline}
                  </span>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {pillar.description}
                  </p>

                  <div className="mt-6 border-t border-border/70 pt-4">
                    <ul className="space-y-2">
                      {pillar.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-muted">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{h}</span>
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
