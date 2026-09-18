"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectGrid } from "@/components/ProjectGrid";
import { portfolio } from "@/data/portfolio";
import { useLanguage } from "@/lib/translations";

export function PortfolioContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("hero_portfolio_eyebrow")}
        title={t("hero_portfolio_title")}
        description={t("hero_portfolio_desc")}
        breadcrumb={[{ label: "Portfolio" }]}
      />

      <section className="py-20">
        <Container>
          <h2 className="sr-only">{t("portfolio_featured_heading")}</h2>
          <ProjectGrid items={portfolio} />

          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted">
              {t("portfolio_bottom_note_1")}{" "}
              <Link href="/clients" className="font-semibold text-primary hover:underline">
                {t("portfolio_bottom_note_clients")}
              </Link>{" "}
              {t("portfolio_bottom_note_2")}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
