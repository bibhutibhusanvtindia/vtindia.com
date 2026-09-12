import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Virtoy Technologies Pvt. Ltd. treats customer information and confidentiality.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Explore our Privacy Policy" breadcrumb={[{ label: "Privacy Policy" }]} />

      <section className="py-20">
        <Container className="max-w-3xl">
          <div className="space-y-5">
            {site.privacyPolicy.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-base leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {site.privacyPrinciples.map((principle) => (
                <div key={principle} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{principle}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
