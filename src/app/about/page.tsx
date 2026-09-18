import type { Metadata } from "next";
import { site } from "@/data/site";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: site.tagline,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutContent />;
}
