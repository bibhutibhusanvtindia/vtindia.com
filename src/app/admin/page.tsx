import type { Metadata } from "next";
import { CommandCenterShell } from "@/components/admin/CommandCenterShell";

export const metadata: Metadata = {
  title: "AI Executive Command Center & B2B Growth Platform",
  description:
    "Single-screen executive command engine for Virtoy Technologies leadership: live financial telemetry, AI chief of staff, omnichannel lead capture, and B2B map prospecting.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <CommandCenterShell />;
}
