import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProductsExplorer } from "@/components/products/ProductsExplorer";

export const metadata: Metadata = {
  title: "Proprietary Software Products & IP Engines",
  description:
    "SafeAct Industrial VR, Education ERP, Hospital HMS, Hotel PMS, HRMS, and spatial WebXR applications built and deployed across India and the UAE by Virtoy Technologies.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Proprietary Product Ecosystem"
        title="Field-Tested Software Systems & Spatial Engines"
        description="16 production software systems spanning industrial safety, enterprise ERP, hospital healthcare, and immersive AR/VR simulation — ready for custom enterprise deployment."
        breadcrumb={[{ label: "Products" }]}
      />

      <ProductsExplorer />
    </>
  );
}

