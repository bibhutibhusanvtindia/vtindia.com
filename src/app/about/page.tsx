import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, HeartHandshake, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description: site.tagline,
  alternates: { canonical: "/about" },
};

const pillars = [
  { icon: Eye, title: "Our Vision", body: site.vision },
  { icon: Target, title: "Our Mission", body: site.mission },
  { icon: HeartHandshake, title: "Our Support", body: site.supportPhilosophy },
];

const capabilities = [
  "Simple jazzy websites through to full-fledged web applications, web portals and intranet apps",
  "Digital marketing and mobile apps",
  "Custom software and database solutions",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A premium IT company built by engineers, for growing businesses"
        description={site.tagline}
        breadcrumb={[{ label: "About Us" }]}
      />

      <section className="py-20">
        <Container className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading eyebrow="Who we are" title="Technology. Experience. Innovation." />
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-muted">{site.founded}</p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Virtoy Technology is a team of passionate and highly skilled professionals, dedicated to deliver the
                best — a collective of highly skilled techno-commercial resources across all experience levels.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                We are an energetic team of very dedicated developers and digital commandos, led by senior technical
                enthusiasts, delivering innovative software solutions, web development and digital transformation.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.1 * i}>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <pillar.icon className="h-6 w-6 text-primary" />
                  <h2 className="mt-4 text-lg font-semibold">{pillar.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-muted py-20">
        <Container>
          <SectionHeading eyebrow="What we cover" title="From a first website to enterprise-scale systems" />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {capabilities.map((item, i) => (
              <Reveal key={item} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6">
                  <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-strong"
              >
                Explore our services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
              >
                Meet the team
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
