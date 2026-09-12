import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/lib/icons";
import { products, productBySlug } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={product.name}
        title={product.heading}
        description={product.summary}
        breadcrumb={[{ label: "Products", href: "/products" }, { label: product.name }]}
      />

      <section className="py-20">
        <Container className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Icon name={product.icon} className="h-6 w-6" />
            </div>
            <div className="mt-8 space-y-5">
              {product.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-base leading-relaxed text-muted">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <Reveal delay={0.1}>
              <aside className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">Key features</h2>
                <ul className="mt-5 space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-strong"
                >
                  Book a demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </aside>
            </Reveal>

            {product.usedBy ? (
              <Reveal delay={0.16}>
                <aside className="rounded-2xl border border-border bg-surface-muted p-7">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground">
                    <Building className="h-4 w-4 text-primary" />
                    Used by
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {product.usedBy.map((org) => (
                      <li key={org} className="text-sm text-muted">
                        {org}
                      </li>
                    ))}
                  </ul>
                </aside>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-muted py-20">
        <Container>
          <h2 className="text-2xl font-semibold">More from our product ecosystem</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 0.08}>
                <Link
                  href={`/products/${other.slug}`}
                  className="group flex h-full flex-col gap-2 rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-accent/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
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
