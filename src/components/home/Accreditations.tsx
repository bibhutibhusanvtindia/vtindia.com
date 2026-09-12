import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { accreditations } from "@/data/site";

/**
 * Migrated from the old homepage's scrolling logo strip. The old site shows
 * these 5 marks with no heading; a neutral heading is used here for
 * accessibility and scannability. Each mark keeps its own official colours on a
 * white tile — none are recoloured or filtered.
 */
export function Accreditations() {
  return (
    <section className="relative overflow-hidden border-t border-border py-20">
      <div
        className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000,transparent)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Recognised &amp; registered
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Accreditations &amp; recognition
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {accreditations.map((item) => (
              <li
                key={item.name}
                className="group relative flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-400 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex h-16 w-full items-center justify-center rounded-xl bg-white p-2.5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={160}
                    height={64}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <p className="text-center text-[11px] font-medium leading-tight text-muted">
                  {item.name.split("—")[0].trim()}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
