import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * The CSP is tuned to this site specifically and was verified against every
 * page before shipping. Exceptions are documented in docs/PRODUCTION_DEPLOYMENT.md:
 *
 *  - 'unsafe-inline' on style-src  : required by Next.js/Tailwind inline critical
 *                                    CSS and by Framer Motion, which animates via
 *                                    inline style attributes. Without it the hero
 *                                    animation and all scroll reveals break.
 *  - 'unsafe-inline' on script-src : required by Next.js's inline bootstrap and
 *                                    RSC flight-data scripts.
 *  - 'unsafe-eval' (dev only)      : required by the React Refresh dev runtime.
 *                                    NOT sent in production.
 *  - data: / blob: on img-src      : next/image emits blob/data URIs while
 *                                    optimising and for placeholders.
 *
 * Everything else is locked down: no external scripts, frames, or object embeds
 * are permitted, and the site loads no third-party runtime assets (fonts are
 * self-hosted by next/font).
 *
 * Strict-Transport-Security is intentionally NOT set here — enable it at the
 * reverse proxy/CDN once HTTPS is confirmed stable in production.
 */
const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "form-action 'self'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // ---------------------------------------------------------------
      // Canonical host: vtindia.com (apex). Sends www -> apex in ONE hop,
      // preserving the path. Prefer doing this at the CDN/host layer too —
      // an edge rule avoids the app being hit at all. http -> https must be
      // configured at the host/CDN; Next.js cannot enforce scheme itself.
      // ---------------------------------------------------------------
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.vtindia.com" }],
        destination: "https://vtindia.com/:path*",
        permanent: true,
      },

      { source: "/home/about", destination: "/about", permanent: true },
      { source: "/home/team", destination: "/team", permanent: true },
      { source: "/home/testimonials", destination: "/testimonials", permanent: true },
      { source: "/home/privacy", destination: "/privacy", permanent: true },
      { source: "/home/career", destination: "/careers", permanent: true },
      { source: "/home/clients", destination: "/clients", permanent: true },
      { source: "/home/contact", destination: "/contact", permanent: true },

      { source: "/home/naacnba", destination: "/services/naac-nba", permanent: true },
      { source: "/home/softwaredevelopment", destination: "/services/software-development", permanent: true },
      { source: "/home/webapplication", destination: "/services/web-application", permanent: true },
      { source: "/home/digitalmarketing", destination: "/services/digital-marketing", permanent: true },
      { source: "/home/seoconsulting", destination: "/services/seo-consulting", permanent: true },
      { source: "/home/internetmarketing", destination: "/services/internet-marketing", permanent: true },
      { source: "/home/mobileappconsulting", destination: "/services/mobile-app-consulting", permanent: true },
      { source: "/home/projectmanagement", destination: "/services/project-management", permanent: true },

      { source: "/home/sefeact", destination: "/products/safeact", permanent: true },
      { source: "/home/hotel", destination: "/products/hotel-pms", permanent: true },
      { source: "/home/college", destination: "/products/education-erp", permanent: true },
      { source: "/home/library", destination: "/products/library-management", permanent: true },
      { source: "/home/mobile", destination: "/products/mobile-applications", permanent: true },
      { source: "/home/billing", destination: "/products/billing-management", permanent: true },
      { source: "/home/erp", destination: "/products/sme-erp", permanent: true },
      { source: "/home/bilingual", destination: "/products/bilingual-websites", permanent: true },
      { source: "/home/ar", destination: "/products/augmented-reality", permanent: true },
      { source: "/home/vr", destination: "/products/virtual-reality", permanent: true },
      { source: "/home/hrms", destination: "/products/hrms", permanent: true },
      { source: "/home/digital", destination: "/products/digital-certificate-management", permanent: true },
      { source: "/home/iot", destination: "/products/iot", permanent: true },
      { source: "/home/ecommerce", destination: "/products/ecommerce", permanent: true },
      { source: "/home/online", destination: "/products/online-voting", permanent: true },
      { source: "/home/directory", destination: "/products/digital-directory", permanent: true },

      // The old site served its homepage at /home/index as well as /
      { source: "/home/index", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
