import type { Metadata } from "next";
import { ClientsContent } from "@/components/clients/ClientsContent";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Educational institutions, healthcare providers, hotels, industry and corporate clients served by Virtoy Technologies Pvt. Ltd.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return <ClientsContent />;
}
