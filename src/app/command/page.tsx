import type { Metadata } from "next";
import { CommandCenterShell } from "@/components/admin/CommandCenterShell";

export const metadata: Metadata = {
  title: "Executive Command Hub",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CommandPage() {
  return <CommandCenterShell />;
}
