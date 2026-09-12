import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership and engineering team behind Virtoy Technologies Pvt. Ltd. — the people delivering software, mobile, AR/VR and ERP solutions.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  const leadership = team.filter((m) => m.featured);
  const rest = team.filter((m) => !m.featured);

  return (
    <>
      <PageHero
        eyebrow="We are there for you"
        title="Our professionals"
        description="A team of passionate and highly skilled professionals, dedicated to deliver the best."
        breadcrumb={[{ label: "Our Team" }]}
      />

      <section className="py-20">
        <Container>
          <h2 className="text-2xl font-semibold">Leadership</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08}>
                <div className="group h-full overflow-hidden rounded-2xl border border-border bg-surface">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary">{member.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{member.bio}</p>
                    {member.extendedBio ? (
                      <p className="mt-2 text-xs leading-relaxed text-muted">{member.extendedBio}</p>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <h2 className="mt-20 text-2xl font-semibold">Engineering &amp; delivery</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((member, i) => (
              <Reveal key={member.name} delay={(i % 3) * 0.06}>
                <div className="group flex h-full gap-4 rounded-2xl border border-border bg-surface p-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-muted">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="80px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-primary">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary">{member.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{member.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
