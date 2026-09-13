"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectGrid } from "@/components/ProjectGrid";
import { portfolio } from "@/data/portfolio";
import { useLanguage } from "@/lib/translations";

export function Portfolio() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted py-24">
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("portfolio_badge")}
            title={t("portfolio_title")}
            description={t("portfolio_desc")}
          />
          <Reveal delay={0.1}>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold shadow-sm transition hover:border-primary/50 hover:text-primary"
            >
              {lang === "hi"
                ? `सभी ${portfolio.length} प्रोजेक्ट्स`
                : lang === "or"
                ? `ସମସ୍ତ ${portfolio.length}ଟି ପ୍ରକଳ୍ପ`
                : `All ${portfolio.length} projects`}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14">
          <ProjectGrid items={portfolio} />
        </div>
      </Container>
    </section>
  );
}

