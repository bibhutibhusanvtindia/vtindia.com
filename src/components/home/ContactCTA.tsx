"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function ContactCTA() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted py-24">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-primary/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Get in touch"
            title="Have an idea or enterprise project? Let's build it."
            description="Visit our offices in India & the UAE or connect with our engineering team directly."
          />
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong hover:shadow-xl hover:shadow-primary/35"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Start a Conversation</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {site.offices.map((office, i) => (
            <Reveal key={office.city} delay={i * 0.08}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/90 p-7 shadow-sm backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                />

                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-[10px] font-semibold text-muted">
                      {office.city}
                    </span>
                  </div>

                  <h3 className="mt-5 font-bold tracking-tight text-foreground">{office.label}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{office.address}</p>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4">
                  <p className="text-xs font-semibold text-primary">{office.phone}</p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Fast Direct Channel Card */}
          <Reveal delay={0.24}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/5 via-surface to-surface p-7 shadow-sm backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/15">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent-strong"
              />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/25">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>

                <h3 className="mt-5 font-bold tracking-tight text-foreground">Direct Desk</h3>
                <p className="mt-1 text-xs text-muted">Response within 24 business hours</p>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-border/80 bg-surface px-3 py-2">
                  <span className="truncate text-xs font-medium text-foreground">{site.email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="ml-2 flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-strong"
                    title="Copy email"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 border-t border-border/60 pt-4">
                <a
                  href={site.phones[0].href}
                  className="flex items-center gap-2 text-xs font-semibold text-muted transition hover:text-primary"
                >
                  <Phone className="h-3.5 w-3.5 text-primary" /> {site.phones[0].number}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

