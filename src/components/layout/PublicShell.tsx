"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { IntroLoader } from "@/components/ui/IntroLoader";
import { VoiceGuide } from "@/components/ui/VoiceGuide";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/command");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <IntroLoader />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <VoiceGuide />
    </>
  );
}
