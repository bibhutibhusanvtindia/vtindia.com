"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/translations";

const CRUMB_TRANSLATIONS: Record<string, { hi: string; or: string }> = {
  Home: { hi: "होम", or: "ମୁଖ୍ୟ ପୃଷ୍ଠା" },
  "About Us": { hi: "हमारे बारे में", or: "ଆମ ବିଷୟରେ" },
  About: { hi: "हमारे बारे में", or: "ଆମ ବିଷୟରେ" },
  Services: { hi: "सेवाएं", or: "ସେବା" },
  Products: { hi: "उत्पाद", or: "ପ୍ରଡକ୍ଟ" },
  Portfolio: { hi: "पोर्टफोलियो", or: "ପୋର୍ଟଫୋଲିଓ" },
  Clients: { hi: "क्लाइंट्स", or: "ଗ୍ରାହକ" },
  "Our Team": { hi: "हमारी टीम", or: "ଆମ ଟିମ୍" },
  Team: { hi: "हमारी टीम", or: "ଆମ ଟିମ୍" },
  Testimonials: { hi: "प्रशंसापत्र", or: "ଗ୍ରାହକ ପ୍ରତିକ୍ରିୟା" },
  Careers: { hi: "करियर", or: "ନିଯୁକ୍ତି" },
  Contact: { hi: "संपर्क", or: "ଯୋଗାଯୋଗ" },
  "Privacy Policy": { hi: "गोपनीयता नीति", or: "ଗୋପନୀୟତା ନୀତି" },
  Privacy: { hi: "गोपनीयता नीति", or: "ଗୋପନୀୟତା ନୀତି" },
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  const { lang, t } = useLanguage();

  const translateCrumb = (label: string) => {
    if (lang === "en") return label;
    const mapping = CRUMB_TRANSLATIONS[label];
    if (mapping && mapping[lang]) return mapping[lang];
    return label;
  };

  return (
    <section className="relative overflow-hidden border-b border-border bg-surface-muted">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/10 blur-[100px]"
        aria-hidden="true"
      />
      <Container className="relative py-20">
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted">
            <Link href="/" className="hover:text-primary">
              {t("nav_home")}
            </Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-primary">
                    {translateCrumb(crumb.label)}
                  </Link>
                ) : (
                  <span className="text-foreground">{translateCrumb(crumb.label)}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}
        <Reveal>
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
          ) : null}
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h1>
          {description ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p> : null}
        </Reveal>
      </Container>
    </section>
  );
}
