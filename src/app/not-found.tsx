"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useLanguage } from "@/lib/translations";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm font-bold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {t("notfound_title")}
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        {t("notfound_desc")}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-strong shadow-md shadow-primary/20"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("notfound_btn_home")}
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
        >
          {t("notfound_btn_contact")}
        </Link>
      </div>
    </Container>
  );
}
