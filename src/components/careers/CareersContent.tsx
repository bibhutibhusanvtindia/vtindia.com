"use client";

import { Award, Clock, HeartPulse, MapPin, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CareerForm } from "@/components/forms/CareerForm";
import { useLanguage } from "@/lib/translations";

export function CareersContent() {
  const { t } = useLanguage();

  const benefits = [
    { icon: Sparkles, title: t("careers_b1_title"), body: t("careers_b1_desc") },
    { icon: Clock, title: t("careers_b2_title"), body: t("careers_b2_desc") },
    { icon: HeartPulse, title: t("careers_b3_title"), body: t("careers_b3_desc") },
    { icon: MapPin, title: t("careers_b4_title"), body: t("careers_b4_desc") },
    { icon: Award, title: t("careers_b5_title"), body: t("careers_b5_desc") },
    { icon: Users, title: t("careers_b6_title"), body: t("careers_b6_desc") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("hero_careers_eyebrow")}
        title={t("hero_careers_title")}
        description={t("hero_careers_desc")}
        breadcrumb={[{ label: "Careers" }]}
      />

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow={t("careers_why_eyebrow")}
            title={t("careers_why_title")}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-muted py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <SectionHeading eyebrow={t("careers_apply_eyebrow")} title={t("careers_apply_title")} />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              {t("careers_apply_desc")}
            </p>
          </div>
          <Reveal delay={0.1}>
            <CareerForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
