"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/lib/icons";
import { services } from "@/data/services";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/lib/translations";

export function ServicesGrid() {
  const { lang, t } = useLanguage();
  const [lead, ...rest] = services.slice(0, 6);

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
