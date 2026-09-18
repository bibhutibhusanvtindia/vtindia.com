import type { Metadata } from "next";
import { TestimonialsContent } from "@/components/testimonials/TestimonialsContent";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients say about working with Virtoy Technologies Pvt. Ltd.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return <TestimonialsContent />;
}
