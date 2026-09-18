import type { Metadata } from "next";
import { ProductsContent } from "@/components/products/ProductsContent";

export const metadata: Metadata = {
  title: "Proprietary Software Products & IP Engines",
  description:
    "SafeAct Industrial VR, Education ERP, Hospital HMS, Hotel PMS, HRMS, and spatial WebXR applications built and deployed across India and the UAE by Virtoy Technologies.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return <ProductsContent />;
}
