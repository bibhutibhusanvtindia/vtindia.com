"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/lib/icons";
import { products } from "@/data/products";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/lib/translations";

const FEATURED = ["safeact", "mobile-applications", "education-erp"];

export function ProductsShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { lang, t } = useLanguage();

  const CATEGORIES = [
    {
      id: "all",
      label: lang === "hi" ? "सभी उत्पाद" : lang === "or" ? "ସମସ୍ତ ପ୍ରଡକ୍ଟ" : "All Products",
    },
    {
      id: "enterprise",
      label: lang === "hi" ? "एंटरप्राइज व सुरक्षा" : lang === "or" ? "ଶିଳ୍ପ ଓ ସୁରକ୍ଷା" : "Enterprise & Safety",
      slugs: ["safeact", "payroll-software", "inventory-software", "asset-management", "crm-software"],
    },
    {
      id: "institutional",
      label: lang === "hi" ? "कैंपस व शिक्षा" : lang === "or" ? "ଶିକ୍ଷା ଓ କଲେଜ" : "Campus & Education",
      slugs: ["education-erp", "school-management", "college-management", "library-management"],
    },
    {
      id: "specialized",
      label: lang === "hi" ? "हेल्थकेयर व होटल" : lang === "or" ? "ହସ୍ପିଟାଲ୍ ଓ ହୋଟେଲ୍" : "Healthcare & Hospitality",
      slugs: ["hospital-management", "hotel-pms", "micro-finance", "billing-software"],
    },
  ];

  const featured = FEATURED.map((slug) => products.find((p) => p.slug === slug)!).filter(Boolean);
  
  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory);
  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    return currentCategory?.slugs?.includes(p.slug);
  });

  return (
    <section className="relative overflow-hidden py-24">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -left-48 top-1/2 h-96 w-96 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("products_eyebrow")}
            title={t("products_title")}
            description={t("products_subtitle")}
          />
          <Reveal delay={0.1}>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold shadow-sm transition hover:border-primary/50 hover:text-primary"
            >
              {t("products_view_all")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Featured 3 Flagship Products with 3D Tilt Spotlight */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {featured.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <SpotlightCard
                enableTilt={true}
                className="h-full shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/15"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group relative flex h-full flex-col justify-between p-8"
                >
                  <div
                    className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/[0.06] blur-3xl transition-transform duration-700 group-hover:scale-125"
                    aria-hidden="true"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-1.5 w-0 bg-gradient-to-r from-primary via-accent to-accent-strong transition-all duration-500 group-hover:w-full"
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                        <Icon name={product.icon} className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{product.summary}</p>

                    <ul className="mt-6 space-y-2">
                      {product.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-muted">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {product.usedBy?.length ? (
                    <div className="relative mt-8 border-t border-border/70 pt-4">
                      <p className="text-[11px] font-semibold text-foreground">
                        {lang === "hi"
                          ? "प्रमाणित परिनियोजन:"
                          : lang === "or"
                          ? "ପ୍ରମାଣିତ ପ୍ରକଳ୍ପ:"
                          : "Verified Deployments:"}
                      </p>
                      <p className="mt-1 text-xs text-muted line-clamp-1">{product.usedBy.join(" · ")}</p>
                    </div>
                  ) : (
                    <div className="relative mt-8 border-t border-border/70 pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                        {lang === "hi"
                          ? "आर्किटेक्चर देखें"
                          : lang === "or"
                          ? "ଆର୍କିଟେକ୍ଚର ଦେଖନ୍ତୁ"
                          : "Learn architecture"}{" "}
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  )}
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Category Filter Tabs for Extended Ecosystem */}
        <div className="mt-14 border-t border-border/70 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {lang === "hi"
                  ? `सभी प्रणालियां देखें (${products.length} उत्पाद)`
                  : lang === "or"
                  ? `ସମସ୍ତ ସଫ୍ଟୱେର୍ (${products.length}ଟି ପ୍ରଡକ୍ଟ)`
                  : `Explore Full Suite (${products.length} systems)`}
              </span>
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "border border-border bg-surface text-muted hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group flex h-full items-center gap-3 rounded-2xl border border-border/80 bg-surface/90 px-4 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/[0.02] hover:shadow-md hover:shadow-primary/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white">
                      <Icon name={product.icon} className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {product.name}
                      </span>
                      <span className="block truncate text-[11px] text-muted">{product.features[0]}</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-primary" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
