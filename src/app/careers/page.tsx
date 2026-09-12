import type { Metadata } from "next";
import { Award, Clock, HeartPulse, MapPin, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CareerForm } from "@/components/forms/CareerForm";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Grow your career with Virtoy Technologies — challenging projects, flexible working time, health insurance and an award-winning team.",
  alternates: { canonical: "/careers" },
};

const benefits = [
  { icon: Sparkles, title: "Challenging projects", body: "Engaging initiatives requiring innovation and strategic problem-solving." },
  { icon: Clock, title: "Custom working time", body: "Flexible schedules fostering productivity and work-life balance." },
  { icon: HeartPulse, title: "Health insurance", body: "Comprehensive coverage ensuring your well-being and peace of mind." },
  { icon: MapPin, title: "Close to city center", body: "Conveniently located with easy access." },
  { icon: Award, title: "Award winning team", body: "Work alongside recognised professionals delivering real impact." },
  { icon: Users, title: "Great people", body: "A collaborative culture with supportive leadership and room to grow." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Grow your career with us"
        title="Would you like to join us?"
        description="Whether you're passionate about solving real-world challenges, streamlining enterprise operations, or crafting elegant digital experiences, you'll find purpose here."
        breadcrumb={[{ label: "Careers" }]}
      />

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Why Virtoy"
            title="Build high-impact solutions while delivering exceptional customer experiences"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-muted py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="Apply now" title="Send us your details" />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              We review every application. Share your background and attach your resume — if there&apos;s a fit, our
              team will reach out to you directly.
            </p>
          </div>
          <Reveal delay={0.1}>
            <CareerForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
