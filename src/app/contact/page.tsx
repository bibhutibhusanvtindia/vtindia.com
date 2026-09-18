import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Virtoy Technologies Pvt. Ltd. — offices in Kolkata and Bhubaneswar. Email info@vtindia.com or call 9861802325.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactContent />;
}
