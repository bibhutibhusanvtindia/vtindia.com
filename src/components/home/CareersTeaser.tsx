"use client";

import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/translations";

export function CareersTeaser() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-t border-border py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary via-primary-strong to-accent p-10 text-white shadow-2xl shadow-primary/25 sm:p-16">
            <div className="absolute inset-0 bg-grid opacity-15" aria-hidden="true" />
            <div
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                <Briefcase className="h-3.5 w-3.5" />
                {t("careers_badge")}
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                {t("careers_title")}
              </h2>
              
              <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
                {t("careers_desc")}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/careers"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-bold text-primary shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                  <span className="relative">{t("careers_btn")}</span>
                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

