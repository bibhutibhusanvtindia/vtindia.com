"use client";

import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/translations";

export function PrivacyContent() {
  const { t } = useLanguage();

  const paragraphs = [t("privacy_p1"), t("privacy_p2"), t("privacy_p3")];

  const principles = [
    t("privacy_pr1"),
    t("privacy_pr2"),
    t("privacy_pr3"),
    t("privacy_pr4"),
    t("privacy_pr5"),
    t("privacy_pr6"),
  ];

  return (
    <>
      <PageHero
        eyebrow={t("hero_privacy_eyebrow")}
        title={t("hero_privacy_title")}
        breadcrumb={[{ label: "Privacy Policy" }]}
      />

      <section className="py-20">
        <Container className="max-w-3xl">
          <div className="space-y-5">
            {paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-base leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {principles.map((principle) => (
                <div
                  key={principle}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm transition-all duration-300 hover:border-primary/50"
                >
                  <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">{principle}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
