import type { Metadata } from "next";
import { CareersContent } from "@/components/careers/CareersContent";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Grow your career with Virtoy Technologies — challenging projects, flexible working time, health insurance and an award-winning team.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return <CareersContent />;
}
