"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Icon } from "@/lib/icons";
import { getLocalizedServices } from "@/data/localizedServices";
import { useLanguage } from "@/lib/translations";

export function ServicesExplorer() {
  const { lang, t } = useLanguage();
  const localizedServices = getLocalizedServices(lang);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {localizedServices.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.07}>
              <Link href={`/services/${service.slug}`} className="block h-full">
                <SpotlightCard
                  enableTilt={true}
                  className="group flex h-full flex-col justify-between p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/25">
                        <Icon name={service.icon} className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-muted group-hover:text-primary">
                        0{i + 1}
                      </span>
                    </div>

                    <h2 className="mt-6 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {service.name}
                    </h2>
                    <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
                      {service.summary}
                    </p>

                    {service.highlights && service.highlights.length > 0 && (
                      <div className="mt-6 border-t border-border/70 pt-4">
                        <ul className="space-y-2">
                          {service.highlights.slice(0, 3).map((h) => (
                            <li key={h} className="flex items-start gap-2 text-xs text-muted">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-border/70 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                      {t("services_consultation")}
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
