import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { About } from "@/components/home/About";
import { InteractiveExperienceCenter } from "@/components/home/InteractiveExperienceCenter";
import { SpatialLab } from "@/components/home/SpatialLab";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyVirtoy } from "@/components/home/WhyVirtoy";
import { ComparisonMatrix } from "@/components/home/ComparisonMatrix";
import { TransformationVisualizer } from "@/components/home/TransformationVisualizer";
import { ImpactStories } from "@/components/home/ImpactStories";
import { RoiCalculator } from "@/components/home/RoiCalculator";
import { TechStackHub } from "@/components/home/TechStackHub";
import { ProjectConfigurator } from "@/components/home/ProjectConfigurator";
import { LiveTelemetryCenter } from "@/components/home/LiveTelemetryCenter";
import { GlobalFootprint } from "@/components/home/GlobalFootprint";
import { Portfolio } from "@/components/home/Portfolio";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { EnterpriseFAQ } from "@/components/home/EnterpriseFAQ";
import { Accreditations } from "@/components/home/Accreditations";
import { TeamPreview } from "@/components/home/TeamPreview";
import { CareersTeaser } from "@/components/home/CareersTeaser";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <About />
      <InteractiveExperienceCenter />
      <SpatialLab />
      <ProductsShowcase />
      <ServicesGrid />
      <WhyVirtoy />
      <ComparisonMatrix />
      <TransformationVisualizer />
      <ImpactStories />
      <RoiCalculator />
      <TechStackHub />
      <ProjectConfigurator />
      <LiveTelemetryCenter />
      <GlobalFootprint />
      <Portfolio />
      <TestimonialsSection />
      <EnterpriseFAQ />
      <Accreditations />
      <TeamPreview />
      <CareersTeaser />
      <ContactCTA />
    </>
  );
}

