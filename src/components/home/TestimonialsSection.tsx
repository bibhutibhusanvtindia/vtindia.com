"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Quote, ShieldCheck, Star, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const quotes = testimonials.filter((t) => t.quote);
  const excellentReviews = testimonials.filter((t) => !t.quote);
  const [activeQuote, setActiveQuote] = useState(0);

  const current = quotes[activeQuote];

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-24">
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Executive trust"
            title="Trusted by safety leaders & industry heads"
            description="Direct feedback from operational and safety executives whose daily workflows depend on Virtoy software."
          />
          <Reveal delay={0.1}>
            <Link
              href="/testimonials"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold shadow-sm transition hover:border-primary/50 hover:text-primary"
            >
              All reviews &amp; ratings
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-stretch">
          {/* Main Featured Testimonial Card */}
          <Reveal className="h-full">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/90 p-8 shadow-sm backdrop-blur-md sm:p-10">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-accent-strong"
              />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                    <span className="ml-2 text-xs font-semibold text-foreground">Verified Assessment</span>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold text-primary">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Client Endorsement
                  </div>
                </div>

                <div className="relative mt-8">
                  <Quote className="h-10 w-10 text-primary/15" />
                  <div className="min-h-[140px]">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeQuote}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                        className="text-lg font-medium leading-relaxed tracking-tight text-foreground sm:text-xl"
                      >
                        &ldquo;{current.quote}&rdquo;
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-6">
                <div>
                  <h4 className="font-semibold text-foreground">{current.name}</h4>
                  <p className="text-xs font-medium text-primary">{current.role}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveQuote((prev) => (prev === 0 ? quotes.length - 1 : prev - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition hover:border-primary/50 hover:text-primary"
                    aria-label="Previous quote"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="font-mono text-xs text-muted">
                    {activeQuote + 1} / {quotes.length}
                  </span>
                  <button
                    onClick={() => setActiveQuote((prev) => (prev === quotes.length - 1 ? 0 : prev + 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition hover:border-primary/50 hover:text-primary"
                    aria-label="Next quote"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Institutional Satisfaction Column */}
          <Reveal delay={0.15} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-border/80 bg-surface/90 p-8 shadow-sm backdrop-blur-md">
              <div>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  <h3 className="text-base font-semibold tracking-tight text-foreground">Verified Client Ratings</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Client representatives and department administrators rate Virtoy Technologies with consistent excellence.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {excellentReviews.map((item) => (
                    <div
                      key={item.name}
                      className="group flex flex-col justify-between rounded-xl border border-border/70 bg-surface-muted/60 p-3.5 transition hover:border-primary/40 hover:bg-surface"
                    >
                      <span className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-muted">Rating:</span>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center">
                <p className="text-xs font-semibold text-primary">
                  100% Authentic Client Feedback
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  All reviews sourced directly from institutional deployments across Eastern India.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
