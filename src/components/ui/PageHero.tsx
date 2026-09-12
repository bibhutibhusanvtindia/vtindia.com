import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

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
              Home
            </Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-primary">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
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
