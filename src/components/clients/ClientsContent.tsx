"use client";

import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { FilterGrid } from "@/components/FilterGrid";
import { clients, clientCategories } from "@/data/portfolio";
import { useLanguage } from "@/lib/translations";

export function ClientsContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("hero_clients_eyebrow")}
        title={t("hero_clients_title")}
        description={t("hero_clients_desc")}
        breadcrumb={[{ label: "Clients" }]}
      />

      <section className="py-20">
        <Container>
          <FilterGrid items={clients} categories={clientCategories} />
        </Container>
      </section>
    </>
  );
}
