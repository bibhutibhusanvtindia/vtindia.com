import { services } from "@/data/services";
import { products } from "@/data/products";

export const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Client Partners", href: "/clients" },
  { label: "Careers", href: "/careers" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const serviceLinks = [
  { label: "All 8 Services Overview", href: "/services" },
  ...services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
];

export const productLinks = [
  { label: "All 16 Products Overview", href: "/products" },
  ...products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
];

export const topLevelLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

