"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Search, Building2 } from "lucide-react";
import { clsx } from "clsx";
import type { ClientEntry } from "@/data/portfolio";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/lib/translations";

export function FilterGrid({ items, categories }: { items: ClientEntry[]; categories: readonly string[] }) {
  const { t } = useLanguage();
  const [active, setActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "All":
        return t("clients_cat_all");
      case "Educational Institutions":
        return t("clients_cat_edu");
      case "Healthcare Providers":
        return t("clients_cat_health");
      case "Hotels & Hospitality":
        return t("clients_cat_hotel");
      case "Industrial & Corporate":
        return t("clients_cat_ind");
      case "Government & Associations":
        return t("clients_cat_gov");
      default:
        return category;
    }
  };

  const visible = useMemo(() => {
    let result = active === "All" ? items : items.filter((item) => item.category === active);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.location && item.location.toLowerCase().includes(q)) ||
          item.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [items, active, searchQuery]);

  const availableCategories = useMemo(
    () => categories.filter((c) => c === "All" || items.some((item) => item.category === c)),
    [categories, items],
  );

  const countFor = (category: string) =>
    category === "All" ? items.length : items.filter((i) => i.category === category).length;

  return (
    <div>
      {/* Top Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-surface p-4 shadow-sm backdrop-blur-sm sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              className={clsx(
                "rounded-xl px-4 py-2 text-xs font-semibold transition-all",
                active === category
                  ? "bg-primary text-white shadow-md shadow-primary/25"
                  : "bg-surface-muted text-muted hover:bg-surface-muted/80 hover:text-foreground",
              )}
            >
              {getCategoryLabel(category)}
              <span className={clsx("ml-1.5 font-mono text-[11px]", active === category ? "text-white/90" : "text-muted/70")}>
                {countFor(category)}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder={t("clients_search_ph")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface-muted/50 py-2 pl-10 pr-4 text-xs font-medium text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-muted">
        <span>
          {t("products_showing")} <strong className="text-foreground">{visible.length}</strong> {t("products_of")} {items.length} {t("clients_verified_partners")}
        </span>
        {(active !== "All" || searchQuery) && (
          <button
            onClick={() => {
              setActive("All");
              setSearchQuery("");
            }}
            className="font-semibold text-primary hover:underline"
          >
            {t("clients_reset")}
          </button>
        )}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item) => {
            const isLinked = item.linkStatus === "ok" && item.link;

            const cardContent = (
              <SpotlightCard
                enableTilt={true}
                className="group flex h-full flex-col justify-between p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
              >
                <div>
                  <div className="flex h-36 items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-white p-4">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={280}
                        height={230}
                        className={clsx(
                          "max-h-full w-auto object-contain transition duration-500",
                          isLinked && "group-hover:scale-105",
                        )}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted">
                        <Building2 className="h-8 w-8 text-primary/40" />
                        <span className="text-center text-xs font-bold text-foreground">{item.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-semibold text-muted">
                          {getCategoryLabel(item.category)}
                        </span>
                        <h3 className="mt-2 text-sm font-bold tracking-tight text-foreground">{item.name}</h3>
                        {item.location ? <p className="mt-1 text-xs text-muted">{item.location}</p> : null}
                      </div>
                      {isLinked ? (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted transition group-hover:bg-primary group-hover:text-white">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {item.linkStatus === "unavailable" ? (
                  <p className="mt-3 border-t border-border/70 pt-2 text-[10px] text-muted">
                    {t("clients_private_deployment")}
                  </p>
                ) : isLinked ? (
                  <div className="mt-4 border-t border-border/70 pt-2 text-[11px] font-semibold text-primary">
                    {t("clients_visit_portal")}
                  </div>
                ) : null}
              </SpotlightCard>
            );

            return (
              <motion.div
                key={`${item.name}-${item.category}-${item.image ?? ""}`}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                {isLinked ? (
                  <a href={item.link!} target="_blank" rel="noreferrer noopener" className="block h-full">
                    {cardContent}
                  </a>
                ) : (
                  cardContent
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {visible.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-border/80 bg-surface p-12 text-center">
          <p className="text-base font-semibold text-foreground">{t("clients_no_match")}</p>
          <p className="mt-1 text-xs text-muted">{t("clients_no_match_sub")}</p>
        </div>
      ) : null}
    </div>
  );
}
