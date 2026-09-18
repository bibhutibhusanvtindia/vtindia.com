"use client";

import { PageHero } from "@/components/ui/PageHero";
import { ProductsExplorer } from "@/components/products/ProductsExplorer";
import { useLanguage } from "@/lib/translations";

export function ProductsContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={t("hero_products_eyebrow")}
        title={t("hero_products_title")}
        description={t("hero_products_desc")}
        breadcrumb={[{ label: "Products" }]}
      />

      <ProductsExplorer />
    </>
  );
}
