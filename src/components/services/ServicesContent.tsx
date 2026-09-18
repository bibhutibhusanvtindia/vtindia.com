"use client";

import { PageHero } from "@/components/ui/PageHero";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { useLanguage } from "@/lib/translations";

export function ServicesContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("hero_services_eyebrow")}
        title={t("hero_services_title")}
        description={t("hero_services_desc")}
        breadcrumb={[{ label: "Services" }]}
      />

      <ServicesExplorer />
    </>
  );
}
