import type { Metadata } from "next";
import { TeamContent } from "@/components/team/TeamContent";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership and engineering team behind Virtoy Technologies Pvt. Ltd. — the people delivering software, mobile, AR/VR and ERP solutions.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return <TeamContent />;
}
