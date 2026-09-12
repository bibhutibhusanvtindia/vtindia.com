import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";

export const metadata: Metadata = {
  title: "Enterprise IT & Software Engineering Services",
  description:
    "End-to-end custom software development, mobile iOS/Android engineering, WebXR/VR simulation, digital marketing, SEO, and NAAC accreditation systems.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Engineering Service Lines"
        title="Enterprise Capabilities Architected for Scale"
        description="Eight specialized service lines delivered by IIT alumni engineering pods, refined over a decade of production execution across Eastern India, the UAE and the UK."
        breadcrumb={[{ label: "Services" }]}
      />

      <ServicesExplorer />
    </>
  );
}

