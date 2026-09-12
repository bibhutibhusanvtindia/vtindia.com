import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { FilterGrid } from "@/components/FilterGrid";
import { clients, clientCategories } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Educational institutions, healthcare providers, hotels, industry and corporate clients served by Virtoy Technologies Pvt. Ltd.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we work with"
        title="Our clients"
        description="Colleges, hospitals, hotels, associations and industrial groups across Odisha, West Bengal and beyond."
        breadcrumb={[{ label: "Clients" }]}
      />

      <section className="py-20">
        <Container>
          <FilterGrid items={clients} categories={clientCategories} />
        </Container>
      </section>
    </>
  );
}
