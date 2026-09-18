"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Icon } from "@/lib/icons";
import { getLocalizedProducts } from "@/data/localizedProducts";
import { useLanguage } from "@/lib/translations";

export function ProductsExplorer() {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: t("products_cat_all") },
    { id: "safety", label: t("products_cat_safety") },
    { id: "erp", label: t("products_cat_erp") },
    { id: "spatial", label: t("products_cat_spatial") },
    { id: "specialized", label: t("products_cat_specialized") },
  ];

  const localizedProducts = getLocalizedProducts(lang);

  const filteredProducts = localizedProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.usedBy && p.usedBy.some((u) => u.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!matchesSearch) return false;

    if (selectedCategory === "all") return true;
    if (selectedCategory === "safety") {
      return p.slug.includes("safeact") || p.slug.includes("virtual-reality");
    }
    if (selectedCategory === "erp") {
      return (
        p.slug.includes("erp") ||
        p.slug.includes("hrms") ||
        p.slug.includes("billing") ||
        p.slug.includes("hotel")
      );
    }
    if (selectedCategory === "spatial") {
      return p.slug.includes("virtual-reality") || p.slug.includes("augmented");
    }
    if (selectedCategory === "specialized") {
      return (
        p.slug.includes("hospital") ||
        p.slug.includes("voting") ||
        p.slug.includes("library") ||
        p.slug.includes("e-commerce")
      );
    }
    return true;
  });

  return (
    <section className="py-16 sm:py-20">
      <Container>
        {/* Controls Bar: Category Filter + Instant Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-surface p-4 shadow-sm backdrop-blur-sm sm:p-5">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-surface-muted text-muted hover:bg-surface-muted/80 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder={t("products_search_ph")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-muted/50 py-2 pl-10 pr-4 text-xs font-medium text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 flex items-center justify-between text-xs text-muted">
          <span>
            {t("products_showing")}{" "}
            <strong className="text-foreground">{filteredProducts.length}</strong> {t("products_of")}{" "}
            {localizedProducts.length} {t("products_software_systems")}
          </span>
          {(selectedCategory !== "all" || searchQuery.length > 0) && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="font-semibold text-primary hover:underline"
            >
              {t("products_reset_filters")}
            </button>
          )}
        </div>

        {/* Products Grid with 3D Spotlight Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 3) * 0.05}>
              <Link href={`/products/${product.slug}`} className="block h-full">
                <SpotlightCard
                  enableTilt={true}
                  className="group flex h-full flex-col justify-between p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/25">
                        <Icon name={product.icon} className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-border/80 bg-surface-muted px-2.5 py-0.5 font-mono text-[10px] font-bold text-muted group-hover:text-primary">
                        {t("products_ip_engine")}
                      </span>
                    </div>

                    <h2 className="mt-5 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                      {product.name}
                    </h2>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted sm:text-sm">
                      {product.summary}
                    </p>

                    {product.usedBy && product.usedBy.length > 0 && (
                      <div className="mt-5 border-t border-border/70 pt-3.5">
                        <p className="text-[11px] font-semibold text-muted">
                          <span className="text-foreground">{t("products_live_deployments")} </span>
                          {product.usedBy.slice(0, 2).join(", ")}
                          {product.usedBy.length > 2 ? ` +${product.usedBy.length - 2} ${t("products_more")}` : ""}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                      {t("products_explore_specs")}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
