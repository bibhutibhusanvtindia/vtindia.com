"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Icon } from "@/lib/icons";
import { products, type Product } from "@/data/products";

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "safety", label: "Industrial & Safety" },
  { id: "erp", label: "Enterprise & ERP" },
  { id: "spatial", label: "AR/VR & Spatial" },
  { id: "specialized", label: "Healthcare & Portals" },
];

export function ProductsExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = products.filter((p) => {
    // Search match
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
            {CATEGORIES.map((cat) => (
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
              placeholder="Search 16 systems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-muted/50 py-2 pl-10 pr-4 text-xs font-medium text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 flex items-center justify-between text-xs text-muted">
          <span>
            Showing <strong className="text-foreground">{filteredProducts.length}</strong> of{" "}
            {products.length} proprietary software systems
          </span>
          {selectedCategory !== "all" && (
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="font-semibold text-primary hover:underline"
            >
              Reset filters
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
                        IP ENGINE
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
                          <span className="text-foreground">Live Deployments: </span>
                          {product.usedBy.slice(0, 2).join(", ")}
                          {product.usedBy.length > 2 ? ` +${product.usedBy.length - 2} more` : ""}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                      Explore Architecture Specs
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
