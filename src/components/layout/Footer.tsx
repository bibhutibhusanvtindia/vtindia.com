import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { products } from "@/data/products";
import { FacebookIcon, LinkedinIcon, XIcon, YoutubeIcon } from "@/lib/social-icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface-muted">
      {/* premium ground: faint grid + a single deep magenta bloom, kept low so
          the footer reads as a considered ending rather than a pink slab */}
      <div
        className="absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-primary/[0.09] blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo variant="footer" className="h-10 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.tagline}</p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { href: site.social.facebook, icon: FacebookIcon, label: "Facebook" },
              { href: site.social.x, icon: XIcon, label: "X" },
              { href: site.social.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
              { href: site.social.youtube, icon: YoutubeIcon, label: "YouTube" },
            ].map(({ href, icon: SocialIcon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:border-primary hover:text-primary"
              >
                <SocialIcon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">Services</p>
          <ul className="mt-4 space-y-2">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm text-muted transition hover:text-foreground">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Products</p>
          <ul className="mt-4 space-y-2">
            {products.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="text-sm text-muted transition hover:text-foreground">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Get in touch</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {site.offices.map((office) => (
              <li key={office.city} className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <strong className="text-foreground">{office.label}: </strong>
                  {office.address}
                </span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <a href={site.phones[0].href} className="hover:text-foreground">
                {site.phones[0].number}
              </a>
              {" / "}
              <a href={site.phones[1].href} className="hover:text-foreground">
                {site.phones[1].number}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${site.email}`} className="hover:text-foreground">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-4 py-8 pb-14 text-xs text-muted sm:flex-row sm:pb-8">
          <p>
            © {site.copyrightYear} {site.legalName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/careers" className="hover:text-foreground">
              Careers
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
