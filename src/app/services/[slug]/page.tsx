import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/lib/icons";
import { services, serviceBySlug } from "@/data/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={service.heading}
        description={service.summary}
        breadcrumb={[{ label: "Services", href: "/services" }, { label: service.name }]}
      />

      <section className="py-20">
        <Container className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon name={service.icon} className="h-6 w-6" />
            </div>
            <div className="mt-8 space-y-5">
              {service.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-base leading-relaxed text-muted">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <aside className="rounded-2xl border border-border bg-surface p-7">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">What&apos;s included</h2>
              <ul className="mt-5 space-y-3">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-strong"
              >
                Get a quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-muted py-20">
        <Container>
          <h2 className="text-2xl font-semibold">Explore other services</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 0.08}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-primary/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon name={other.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-2 font-semibold">{other.name}</h3>
                  <p className="text-sm leading-relaxed text-muted">{other.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
