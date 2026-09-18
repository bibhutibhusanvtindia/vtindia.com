"use client";

import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getLocalizedTestimonials } from "@/data/localizedTestimonials";
import { useLanguage } from "@/lib/translations";

export function TestimonialsContent() {
  const { lang, t } = useLanguage();
  const testimonials = getLocalizedTestimonials(lang);
  const quoted = testimonials.filter((t) => t.quote);
  const rated = testimonials.filter((t) => !t.quote);

  return (
    <>
      <PageHero
        eyebrow={t("hero_testimonials_eyebrow")}
        title={t("hero_testimonials_title")}
        breadcrumb={[{ label: "Testimonials" }]}
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {quoted.map((testimonial, i) => (
              <Reveal key={testimonial.name} delay={i * 0.08}>
                <figure className="h-full rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
                  <Quote className="h-8 w-8 text-primary/40" />
                  <blockquote className="mt-5 text-base leading-relaxed text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-border pt-4">
                    <span className="font-semibold text-foreground">{testimonial.name}</span>
                    {testimonial.role ? <span className="block text-sm text-primary">{testimonial.role}</span> : null}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold text-foreground">{t("test_more_reviews")}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rated.map((testimonial, i) => (
              <Reveal key={testimonial.name} delay={(i % 3) * 0.06}>
                <div className="flex items-center justify-between rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/50">
                  <span className="font-medium text-foreground">{testimonial.name}</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-primary">
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
