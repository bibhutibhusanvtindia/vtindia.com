import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { featuredTeam, team } from "@/data/team";

export function TeamPreview() {
  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="We are there for you" title="Our professionals" />
          <Reveal delay={0.1}>
            <Link
              href="/team"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold transition hover:border-primary/50 hover:text-primary"
            >
              Meet all {team.length}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTeam.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  ) : null}
                  {/* magenta wash that lifts on hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  {/* bio revealed over the image on hover, desktop only */}
                  <p className="absolute inset-x-0 bottom-0 hidden translate-y-3 p-5 text-xs leading-relaxed text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 lg:block">
                    {member.bio}
                  </p>
                </div>

                <div className="p-5">
                  <h3 className="font-semibold leading-tight">{member.name}</h3>
                  <p className="mt-1 text-sm text-primary">{member.title}</p>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted lg:hidden">{member.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
