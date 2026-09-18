"use client";

import Link from "next/link";
import { ArrowRight, Eye, HeartHandshake, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/lib/translations";

export function AboutContent() {
  const { lang, t } = useLanguage();

  const pillars = [
    { icon: Eye, title: t("about_vision_title"), body: t("about_vision_desc") },
    { icon: Target, title: t("about_mission_title"), body: t("about_mission_desc") },
    { icon: HeartHandshake, title: t("about_support_title"), body: t("about_support_desc") },
  ];

  const capabilities = [t("about_cap1"), t("about_cap2"), t("about_cap3")];

  return (
    <>
      <PageHero
        eyebrow={t("hero_about_eyebrow")}
        title={t("hero_about_title")}
        description={t("hero_about_desc")}
        breadcrumb={[{ label: "About Us" }]}
      />

      <section className="py-20">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading eyebrow={t("about_who_eyebrow")} title={t("about_who_title")} />
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-muted">{t("about_description")}</p>
              <p className="mt-4 text-base leading-relaxed text-muted">{t("about_p1")}</p>
              <p className="mt-4 text-base leading-relaxed text-muted">{t("about_p2")}</p>
            </Reveal>
          </div>

          <div className="grid gap-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.1 * i}>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <pillar.icon className="h-6 w-6 text-primary" />
                  <h2 className="mt-4 text-lg font-semibold">{pillar.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-muted py-20">
        <Container>
          <SectionHeading eyebrow={t("about_cover_eyebrow")} title={t("about_cover_title")} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {capabilities.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6">
                  <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-strong"
              >
                {t("about_btn_services")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
              >
                {t("about_btn_team")}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
