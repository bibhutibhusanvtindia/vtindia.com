"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { clients } from "@/data/portfolio";

/**
 * Two counter-scrolling rows of real client logos. Logos rest in monochrome so
 * 80+ different brand palettes read as one calm band, and return to full colour
 * on hover — nothing is permanently recoloured or misrepresented.
 *
 * Pauses on hover and freezes entirely under prefers-reduced-motion.
 */
const withLogos = clients.filter((c) => c.image);
const rowA = withLogos.filter((_, i) => i % 2 === 0).slice(0, 20);
const rowB = withLogos.filter((_, i) => i % 2 === 1).slice(0, 20);

export function ClientMarquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted/60 py-24">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-primary/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-accent-strong/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Trusted by Industry Leaders
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
                {withLogos.length} Verified Deployments Across <span className="gradient-text">Eastern India &amp; UAE</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Powering heavy industrial giants, state universities, medical institutions, and corporate enterprises.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/clients"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface px-6 py-3.5 text-sm font-semibold shadow-sm transition hover:border-primary hover:bg-primary hover:text-white"
            >
              View all 84+ clients
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </Container>

      <div className="relative mt-14 space-y-4">
        <MarqueeRow items={rowA} duration={58} reverse={false} paused={!!shouldReduceMotion} />
        <MarqueeRow items={rowB} duration={72} reverse paused={!!shouldReduceMotion} />

        {/* Edge gradient dissolves */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-background via-background/80 to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-background via-background/80 to-transparent z-10"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse,
  paused,
}: {
  items: typeof clients;
  duration: number;
  reverse: boolean;
  paused: boolean;
}) {
  return (
    <div className="group flex overflow-hidden" aria-hidden="true">
      {[0, 1].map((copy) => (
        <motion.div
          key={copy}
          className="flex shrink-0 gap-4 pr-4 [animation-play-state:running] group-hover:[animation-play-state:paused]"
          animate={paused ? undefined : { x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
        >
          {items.map((client) => (
            <div
              key={`${copy}-${client.name}-${client.image}`}
              className="flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white p-3.5 shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-2xl hover:shadow-primary/25"
              title={client.name}
            >
              <Image
                src={client.image!}
                alt={client.name}
                width={144}
                height={80}
                className="max-h-full w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
