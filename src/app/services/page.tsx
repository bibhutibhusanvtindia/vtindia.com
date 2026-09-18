import type { Metadata } from "next";
import { ServicesContent } from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Enterprise IT & Software Engineering Services",
  description:
    "End-to-end custom software development, mobile iOS/Android engineering, WebXR/VR simulation, digital marketing, SEO, and NAAC accreditation systems.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
