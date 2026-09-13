"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { PortfolioItem } from "@/data/portfolio";
import { useLanguage } from "@/lib/translations";

/**
 * Neutral project presentation with dynamic multi-language localization.
 */
export function ProjectGrid({ items }: { items: PortfolioItem[] }) {
  const { lang } = useLanguage();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const inner = (
          <>
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Multi-stage gradient for maximum contrast and elegance */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Top badge */}
            <div className="absolute left-5 top-5 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>
                {lang === "hi" ? "संस्थागत परिनियोजन" : lang === "or" ? "ସାଂସ୍ଥାନିକ ପ୍ରକଳ୍ପ" : "Institutional"}
              </span>
            </div>

            <div className="relative flex h-full flex-col justify-end p-6">
              <h3 className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-white">
                {item.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                {item.location ? <p className="text-xs font-medium text-white/80">{item.location}</p> : <span />}
                {item.link ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 underline-offset-4 transition group-hover:text-white group-hover:underline">
                    {lang === "hi" ? "प्रोजेक्ट देखें" : lang === "or" ? "ପ୍ରକଳ୍ପ ଦେଖନ୍ତୁ" : "View project"}{" "}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </div>
            </div>
          </>
        );

        const className =
          "group relative block h-64 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20";

        return (
          <Reveal key={item.name} delay={(i % 3) * 0.08}>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noreferrer noopener" className={className}>
                {inner}
              </a>
            ) : (
              <div className={className}>{inner}</div>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}

