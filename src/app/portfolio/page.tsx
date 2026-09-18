import type { Metadata } from "next";
import { PortfolioContent } from "@/components/portfolio/PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work by Virtoy Technologies for colleges, associations, industry and government-facing programmes across Odisha and beyond.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
