import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/team",
    "/services",
    "/products",
    "/portfolio",
    "/clients",
    "/careers",
    "/contact",
    "/testimonials",
    "/privacy",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      priority: path === "" ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: new Date(),
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: `${site.url}/products/${product.slug}`,
      lastModified: new Date(),
      priority: 0.7,
    })),
  ];
}
