import type { Metadata } from "next";
import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients say about working with Virtoy Technologies Pvt. Ltd.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const quoted = testimonials.filter((t) => t.quote);
  const rated = testimonials.filter((t) => !t.quote);

  return (
    <>
      <PageHero
        eyebrow="Client feedback"
        title="What our clients say"
        breadcrumb={[{ label: "Testimonials" }]}
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {quoted.map((testimonial, i) => (
              <Reveal key={testimonial.name} delay={i * 0.08}>
                <figure className="h-full rounded-2xl border border-border bg-surface p-8">
                  <Quote className="h-8 w-8 text-primary/40" />
                  <blockquote className="mt-5 text-base leading-relaxed text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-border pt-4">
                    <span className="font-semibold">{testimonial.name}</span>
                    {testimonial.role ? <span className="block text-sm text-primary">{testimonial.role}</span> : null}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold">More client reviews</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rated.map((testimonial, i) => (
              <Reveal key={testimonial.name} delay={(i % 3) * 0.06}>
                <div className="flex items-center justify-between rounded-2xl border border-border bg-surface p-5">
                  <span className="font-medium">{testimonial.name}</span>
                  <span className="flex items-center gap-1 text-sm text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    {testimonial.rating}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
