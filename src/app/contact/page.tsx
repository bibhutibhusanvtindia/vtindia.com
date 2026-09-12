import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/data/site";
import { FacebookIcon, LinkedinIcon, XIcon, YoutubeIcon } from "@/lib/social-icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Virtoy Technologies Pvt. Ltd. — offices in Kolkata and Bhubaneswar. Email info@vtindia.com or call 9861802325.",
  alternates: { canonical: "/contact" },
};

const socials = [
  { href: site.social.facebook, icon: FacebookIcon, label: "Facebook" },
  { href: site.social.x, icon: XIcon, label: "X" },
  { href: site.social.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  { href: site.social.youtube, icon: YoutubeIcon, label: "YouTube" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Have an idea? Let's build it together."
        description="Come and visit our offices or simply send us an email anytime you want. We are open to all suggestions from our clients."
        breadcrumb={[{ label: "Contact" }]}
      />

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="space-y-5">
            {site.offices.map((office, i) => (
              <Reveal key={office.city} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="mt-4 font-semibold">{office.label}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{office.address}</p>
                  <p className="mt-3 text-sm font-medium text-primary">{office.phone}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-semibold">Reach us directly</h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-4 flex items-center gap-2 text-sm text-muted transition hover:text-primary"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  {site.email}
                </a>
                {site.phones.map((phone) => (
                  <a
                    key={phone.number}
                    href={phone.href}
                    className="mt-2 flex items-center gap-2 text-sm text-muted transition hover:text-primary"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    {phone.number}
                    <span className="text-xs text-muted">({phone.label})</span>
                  </a>
                ))}
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-2 flex items-center gap-2 text-sm text-muted transition hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Chat on WhatsApp
                </a>

                <div className="mt-6 flex items-center gap-3">
                  {socials.map(({ href, icon: SocialIcon, label }) => (
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
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
