"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/lib/translations";

export interface LocalizedTeamMember {
  name: string;
  title: string;
  bio: string;
  photo?: string;
  featured?: boolean;
}

const TEAM_MAP: Record<"en" | "hi" | "or", LocalizedTeamMember[]> = {
  en: [
    {
      name: "Mr. Anup Patnaik",
      title: "Co-founder",
      bio: "Mr. Anup Patnaik is the driving force behind Virtoy's vision and innovation, shaping company culture, engineering rigor, and technological agility.",
      photo: "/images/team/Mr_ANUP.png",
      featured: true,
    },
    {
      name: "Mr. Pritiranjan Sahu",
      title: "CEO",
      bio: "Chief Executive Officer driving technological innovation and scaling enterprise digital solutions for global and regional deployments.",
      photo: "/images/team/Mr_PRITIRANJAN.png",
      featured: true,
    },
    {
      name: "Mrs. Piyali Sahu",
      title: "COO",
      bio: "Chief Operating Officer driving operational excellence and strategic growth at Virtoy Technology Pvt. Ltd.",
      photo: "/images/team/Mrs_PIYALI.png",
      featured: true,
    },
    {
      name: "Mr. Kailash Patnaik",
      title: "Sr. Consultant, NAAC",
      bio: "Senior NAAC Consultant guiding institutions towards seamless digital accreditation and institutional quality frameworks.",
      photo: "/images/team/Mr_KAILASH.png",
      featured: true,
    },
  ],
  hi: [
    {
      name: "श्री अनूप पटनायक",
      title: "सह-संस्थापक (Co-founder)",
      bio: "श्री अनूप पटनायक विर्टॉय के विजन और नवाचार के मुख्य सूत्रधार हैं, जो कंपनी की संस्कृति, इंजीनियरिंग मानकों और तकनीकी गतिशीलता को आकार देते हैं।",
      photo: "/images/team/Mr_ANUP.png",
      featured: true,
    },
    {
      name: "श्री प्रीतिरंजन साहू",
      title: "सीईओ (CEO)",
      bio: "मुख्य कार्यकारी अधिकारी, जो तकनीकी नवाचार का नेतृत्व करते हैं और वैश्विक व क्षेत्रीय स्तर पर एंटरप्राइज डिजिटल समाधानों का विस्तार करते हैं।",
      photo: "/images/team/Mr_PRITIRANJAN.png",
      featured: true,
    },
    {
      name: "श्रीमती पियाली साहू",
      title: "सीओओ (COO)",
      bio: "विर्टॉय टेक्नोलॉजीज में परिचालन उत्कृष्टता, मानव संसाधन और रणनीतिक विकास का नेतृत्व करने वाली मुख्य परिचालन अधिकारी।",
      photo: "/images/team/Mrs_PIYALI.png",
      featured: true,
    },
    {
      name: "श्री कैलाश पटनायक",
      title: "वरिष्ठ सलाहकार, नैक (NAAC)",
      bio: "वरिष्ठ नैक सलाहकार, जो शैक्षणिक संस्थानों को निर्बाध डिजिटल प्रत्यायन और गुणवत्ता मानकों के लिए मार्गदर्शन प्रदान करते हैं।",
      photo: "/images/team/Mr_KAILASH.png",
      featured: true,
    },
  ],
  or: [
    {
      name: "ଶ୍ରୀ ଅନୁପ ପଟ୍ଟନାୟକ",
      title: "ସହ-ପ୍ରତିଷ୍ଠାତା (Co-founder)",
      bio: "ଶ୍ରୀ ଅନୁପ ପଟ୍ଟନାୟକ ଭର୍ଚ୍ଚୋଏର ଲକ୍ଷ୍ୟ ଓ ନବସୃଜନର ପ୍ରମୁଖ ମାର୍ଗଦର୍ଶକ, ଯିଏ ଇଞ୍ଜିନିୟରିଂ ଉତ୍କର୍ଷତା ଓ ବୈଷୟିକ ଅଗ୍ରଗତି ପରିଚାଳନା କରନ୍ତି।",
      photo: "/images/team/Mr_ANUP.png",
      featured: true,
    },
    {
      name: "ଶ୍ରୀ ପ୍ରୀତିରଞ୍ଜନ ସାହୁ",
      title: "ସିଇଓ (CEO)",
      bio: "ମୁଖ୍ୟ କାର୍ଯ୍ୟନିର୍ବାହୀ ଅଧିକାରୀ, ଯିଏ ବୈଷୟିକ ଉଦ୍ଭାବନର ନେତୃତ୍ୱ ନେଇ ସମଗ୍ର ଭାରତ ଓ ବିଶ୍ୱସ୍ତରରେ ଏଣ୍ଟରପ୍ରାଇଜ୍ ସଫ୍ଟୱେର୍ ସମାଧାନ ବିସ୍ତାର କରୁଛନ୍ତି।",
      photo: "/images/team/Mr_PRITIRANJAN.png",
      featured: true,
    },
    {
      name: "ଶ୍ରୀମତୀ ପିୟାଲୀ ସାହୁ",
      title: "ସିଓଓ (COO)",
      bio: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍‌ରେ କାର୍ଯ୍ୟକ୍ଷମତା, ସାଂଗଠନିକ ଦକ୍ଷତା ଏବଂ ରଣନୀତିକ ଅଭିବୃଦ୍ଧିର ନେତୃତ୍ୱ ନେଉଥିବା ମୁଖ୍ୟ ପରିଚାଳନା ଅଧିକାରୀ।",
      photo: "/images/team/Mrs_PIYALI.png",
      featured: true,
    },
    {
      name: "ଶ୍ରୀ କୈଳାସ ପଟ୍ଟନାୟକ",
      title: "ବରିଷ୍ଠ ପରାମର୍ଶଦାତା, NAAC",
      bio: "ବରିଷ୍ଠ NAAC ପରାମର୍ଶଦାତା, ଯିଏ ଶିକ୍ଷାନୁଷ୍ଠାନମାନଙ୍କୁ ସହଜ ଡିଜିଟାଲ୍ ସ୍ୱୀକୃତି ଏବଂ ଗୁଣବତ୍ତା ମାନଦଣ୍ଡ ପାଇଁ ମାର୍ଗଦର୍ଶନ କରନ୍ତି।",
      photo: "/images/team/Mr_KAILASH.png",
      featured: true,
    },
  ],
};

export function TeamPreview() {
  const { lang, t } = useLanguage();
  const currentTeam = TEAM_MAP[lang] || TEAM_MAP.en;

  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("team_badge")}
            title={t("team_title")}
            description={t("team_desc")}
          />
          <Reveal delay={0.1}>
            <Link
              href="/team"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold transition hover:border-primary/50 hover:text-primary"
            >
              {lang === "hi"
                ? "सभी 14 सदस्यों से मिलें"
                : lang === "or"
                ? "ସମସ୍ତ ୧୪ ସଦସ୍ୟଙ୍କ ସହ ମିଶନ୍ତୁ"
                : "Meet all 14 members"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {currentTeam.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
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
                  <h3 className="font-semibold leading-tight text-foreground">{member.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-primary">{member.title}</p>
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
