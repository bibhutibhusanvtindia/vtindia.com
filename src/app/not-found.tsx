import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">This page could not be found</h1>
      <p className="mt-4 max-w-md text-muted">
        The page you are looking for may have moved. Try our services, products, or get in touch with us directly.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-strong"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
        >
          Contact us
        </Link>
      </div>
    </Container>
  );
}
