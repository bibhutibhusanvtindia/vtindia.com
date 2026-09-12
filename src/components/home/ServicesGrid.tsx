import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/lib/icons";
import { services } from "@/data/services";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function ServicesGrid() {
  const [lead, ...rest] = services.slice(0, 6);

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted py-24">
      {/* faint brand pattern so the band isn't a flat grey slab */}
      <div
        className="absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="What we do"
            title="Services built around your growth"
            description="From the first line of code to accreditation-ready ERP workflows — refined over a decade of delivery."
          />
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold shadow-sm transition hover:border-primary/50 hover:text-primary"
            >
              All 8 services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Lead card — deliberately larger so the grid has a focal point */}
          <Reveal className="lg:row-span-2">
            <Link
              href={`/services/${lead.slug}`}
              data-voice-speak={`Flagship Service: ${lead.name}. ${lead.summary}. Our core capabilities include ${lead.highlights.join(", ")}.`}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary via-primary to-primary-strong p-8 text-white shadow-xl shadow-primary/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/35"
            >
              <div className="absolute inset-0 bg-grid opacity-[0.14]" aria-hidden="true" />
              <div
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl transition-transform duration-700 group-hover:scale-125"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-white/90 backdrop-blur-sm">
                    Flagship Offering
                  </span>
                  <span className="font-mono text-xs text-white/70">01</span>
                </div>

                <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                  <Icon name={lead.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-white">{lead.name}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85">{lead.summary}</p>
              </div>

              <div className="relative mt-10">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">Core Capabilities</p>
                <ul className="mt-3 space-y-2">
                  {lead.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-xs text-white/90">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-4">
                  <span className="text-xs font-medium text-white/80">Tailored Enterprise Architecture</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Explore service
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>

          {rest.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 2) * 0.07}>
              <SpotlightCard
                enableTilt={true}
                className="h-full shadow-sm transition-all duration-400 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
              >
                <Link
                  href={`/services/${service.slug}`}
                  data-voice-speak={`Service Line: ${service.name}. ${service.summary}. Key capability: ${service.highlights[0]}.`}
                  className="group relative flex h-full flex-col justify-between p-6"
                >
                  {/* magenta accent bar that draws in on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-[3px] w-0 bg-gradient-to-r from-primary to-accent-strong transition-all duration-500 group-hover:w-full"
                  />

                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-400 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                        <Icon name={service.icon} className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs font-semibold text-muted/70">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 font-semibold tracking-tight transition-colors group-hover:text-primary">{service.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{service.summary}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                    <span className="text-[11px] font-medium text-muted">
                      {service.highlights[0]}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-all duration-300 group-hover:translate-x-1">
                      Details <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
