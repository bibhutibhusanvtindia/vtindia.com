import type { Metadata } from "next";
import { PrivacyContent } from "@/components/privacy/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Virtoy Technologies Pvt. Ltd. treats customer information and confidentiality.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
