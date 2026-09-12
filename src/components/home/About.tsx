"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Eye, HeartHandshake, Target, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { products } from "@/data/products";
import { clients } from "@/data/portfolio";
import { team } from "@/data/team";

const pillars = [
  { icon: Eye, title: "Our Vision", body: site.vision, tag: "Strategic Focus" },
  { icon: Target, title: "Our Mission", body: site.mission, tag: "Execution" },
  { icon: HeartHandshake, title: "Our Support", body: site.supportPhilosophy, tag: "Commitment" },
];

/**
 * Counters use only figures that are verifiable from the migrated data itself —
 * the number of clients, products, services and people actually on this site.
 * No performance or revenue statistics are claimed, because the old site
 * publishes none.
 */
const facts = [
  { value: clients.length, label: "Client organisations", suffix: "+" },
  { value: products.length, label: "Products built", suffix: "" },
  { value: services.length, label: "Service lines", suffix: "" },
  { value: team.length, label: "Team members", suffix: "+" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    const duration = 1500;
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * value);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [isInView, value, shouldReduceMotion]);

  return (
    <span ref={ref} className="font-mono text-3xl font-bold tracking-tight text-primary sm:text-4xl">
      {shouldReduceMotion ? value : displayValue}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background ambient light */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-16">
          {/* Left: statement + verifiable counters */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3 w-3" />
                About VT India
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Building strong teams for <span className="gradient-text">success and innovation</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted">{site.description}</p>
              <p className="mt-4 text-base leading-relaxed text-muted">{site.founded}</p>

              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
              >
                <span>View more about us</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/80 p-5 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <dt className="sr-only">{fact.label}</dt>
                    <dd>
                      <AnimatedCounter value={fact.value} suffix={fact.suffix} />
                      <span className="mt-2 block text-xs font-medium leading-tight text-muted">{fact.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right: pillars as an offset, overlapping stack */}
          <div className="grid gap-4">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.1 * i}>
                <div
                  className={`group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/90 p-8 shadow-sm backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 ${
                    i === 1 ? "lg:ml-8" : i === 2 ? "lg:ml-4" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-primary via-accent to-accent-strong opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-400 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/30">
                      <pillar.icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-border/70 bg-surface-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted transition group-hover:border-primary/30 group-hover:text-primary">
                      {pillar.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{pillar.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

