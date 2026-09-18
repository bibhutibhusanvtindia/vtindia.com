"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/translations";

const ACCREDITATIONS_MAP = {
  en: [
    { name: "ISO 9001 Certified", image: "/images/partners/partner1.png" },
    { name: "OCAC Odisha", image: "/images/partners/partner2.png" },
    { name: "MSME Govt of India", image: "/images/partners/partner3.png" },
    { name: "Startup India", image: "/images/partners/partner4.png" },
    { name: "Startup Odisha", image: "/images/partners/partner5.png" },
  ],
  hi: [
    { name: "आईएसओ 9001 प्रमाणित", image: "/images/partners/partner1.png" },
    { name: "ओसीएसी ओडिशा", image: "/images/partners/partner2.png" },
    { name: "एमएसएमई भारत सरकार", image: "/images/partners/partner3.png" },
    { name: "स्टार्टअप इंडिया", image: "/images/partners/partner4.png" },
    { name: "स्टार्टअप ओडिशा", image: "/images/partners/partner5.png" },
  ],
  or: [
    { name: "ISO 9001 ପ୍ରମାଣିତ", image: "/images/partners/partner1.png" },
    { name: "OCAC ଓଡ଼ିଶା", image: "/images/partners/partner2.png" },
    { name: "MSME ଭାରତ ସରକାର", image: "/images/partners/partner3.png" },
    { name: "ଷ୍ଟାର୍ଟଅପ୍ ଇଣ୍ଡିଆ", image: "/images/partners/partner4.png" },
    { name: "ଷ୍ଟାର୍ଟଅପ୍ ଓଡ଼ିଶା", image: "/images/partners/partner5.png" },
  ],
};

export function Accreditations() {
  const { lang, t } = useLanguage();
  const items = ACCREDITATIONS_MAP[lang] || ACCREDITATIONS_MAP.en;

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
              {t("accred_badge")}
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {t("accred_title")}
            </h2>
            <p className="mt-3 text-sm text-muted">
              {t("accred_desc")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((item) => (
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
                  {item.name}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
