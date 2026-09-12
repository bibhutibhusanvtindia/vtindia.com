import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectGrid } from "@/components/ProjectGrid";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work by Virtoy Technologies for colleges, associations, industry and government-facing programmes across Odisha and beyond.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="A portfolio built on trust"
        description="Projects delivered for colleges, associations, industry and government-facing programmes."
        breadcrumb={[{ label: "Portfolio" }]}
      />

      <section className="py-20">
        <Container>
          <h2 className="sr-only">Featured projects</h2>
          <ProjectGrid items={portfolio} />

          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted">
              These are the projects featured on the VT India homepage. A further{" "}
              <Link href="/clients" className="font-semibold text-primary hover:underline">
                84 client organisations
              </Link>{" "}
              — colleges, hospitals, hotels, associations and industrial groups — are listed with their logos and
              websites.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
