/**
 * Brand logo configuration.
 *
 * To swap in an official high-resolution asset: drop the file into
 * `web/public/images/brand/` and point `src` at it. Update `intrinsicWidth` /
 * `intrinsicHeight` to the new file's real pixel dimensions (any aspect ratio
 * is fine — the header/footer size by HEIGHT with `w-auto`, so the layout does
 * not shift and the logo is never stretched). An SVG works too; set the
 * intrinsic values to its viewBox dimensions.
 *
 * Rules that must not be broken: no recolouring, no CSS filters, no forced
 * aspect ratio, no recreation. The magenta in this file IS the brand reference.
 */
export const logo = {
  src: "/images/brand/logo-alt.png",
  srcFooter: "/images/brand/logo-alt.png",
  intrinsicWidth: 186,
  intrinsicHeight: 59,
  intrinsicWidthFooter: 186,
  intrinsicHeightFooter: 59,
  alt: "Virtoy Technologies",
  /** Sampled from the logo artwork — the source of the entire colour system. */
  brandColor: "#F0186C",
};

export const site = {
  name: "Virtoy Technologies",
  legalName: "Virtoy Technologies Pvt. Ltd.",
  shortName: "Virtoy",
  url: "https://vtindia.com",
  tagline:
    "Virtoy Technologies Pvt. Ltd. is a premium Information Technology company providing world class IT solutions to customers across Eastern India, the UAE and the UK.",
  description:
    "Founded by a team of young, experienced IIT alumni and engineering professionals, Virtoy Technologies builds software, web, mobile, AR/VR and enterprise solutions for clients across Eastern India and the Middle East.",
  vision:
    "To create a world class IT solutions facility in Odisha, India to reverse the brain drain trend and take technology right into the grass roots in India & overseas to transform lives — and to create a global hub of cutting edge technologies.",
  mission: "Driving innovation with cutting-edge technology to empower businesses and communities.",
  supportPhilosophy:
    "A dedicated support team of certified technical experts delivers reliable, 24/7 support, ensuring seamless operations and client satisfaction.",
  founded:
    "Founded by a team of young, very experienced IIT and energetic engineering professionals from diverse backgrounds.",
  email: "info@vtindia.com",
  whatsapp: "https://wa.me/+917008304367",
  phones: [
    { label: "Bhubaneswar", number: "9861802325", href: "tel:+919861802325" },
    { label: "Kolkata", number: "03369029591", href: "tel:+913369029591" },
  ],
  offices: [
    {
      city: "Kolkata",
      label: "Head Office",
      address: "3rd Floor, Jharanalaya, 635 Baishnabghatta, Patuli, Kolkata, West Bengal - 700084",
      phone: "03369029591",
    },
    {
      city: "Bhubaneswar",
      label: "Bhubaneswar Office",
      address:
        "Tower-A, 4th Floor, Room 409, (O-HUB), SEZ Road, Chandaka Industrial Estate, Bhubaneswar, Odisha, India",
      phone: "9861802325",
    },
  ],
  social: {
    facebook: "https://www.facebook.com/share/1Bj64ghTGB/",
    x: "https://x.com/Virtoytech",
    linkedin: "https://www.linkedin.com/in/virtoy-technologies-02aa82264",
    youtube: "https://www.youtube.com/@virtoytechnologies1709",
  },
  copyrightYear: 2026,
  privacyPolicy: [
    "Virtoy Technologies Pvt. Ltd. consider customers privacy as an important concern and care by all means that the important and crucial information is kept confidential at all levels. All information pertained to client business is considered secure and private.",
    "We do not share any knowledge, information, processes, ideas or documents, concerning the business and affairs of the Customer or any of its dealings and transactions.",
  ],
  privacyPrinciples: ["Security", "Trust", "Confidentiality", "Protection", "Consent", "Compliance"],
};

export type HeroSlide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  badge1Title: string;
  badge1Subtitle: string;
  badge2Title: string;
  badge2Subtitle: string;
  badge3Title: string;
  badge3Subtitle: string;
  locationLabel: string;
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "We can help you creating differences",
    title: "Need to explore the IT world",
    subtitle:
      "Innovative, robust IT solutions for businesses across Eastern India, the UAE and beyond.",
    image: "/images/hero/hero-developer.jpg",
    badge1Title: "84+ Client Deployments",
    badge1Subtitle: "Tata Sponge · Aditya Birla · NALCO",
    badge2Title: "ISO 9001 & MSME",
    badge2Subtitle: "Government Recognized",
    badge3Title: "Enterprise ERP & Software",
    badge3Subtitle: "16+ Systems Deployed",
    locationLabel: "Bhubaneswar Development Centre",
  },
  {
    eyebrow: "We Can Help You Redefine Reality with VR",
    title: "Step into the future of the VR world",
    subtitle: "Immersive AR/VR experiences that turn training, learning and outreach into interaction.",
    image: "/images/hero/hero-vr.jpg",
    badge1Title: "AR/VR Immersive Tech",
    badge1Subtitle: "Spatial 3D & Virtual Simulations",
    badge2Title: "Krushi Odisha 2025",
    badge2Subtitle: "Government Pavilion Delivery",
    badge3Title: "Safeact VR Training",
    badge3Subtitle: "Workplace Hazard Simulation",
    locationLabel: "Virtoy AR/VR Interactive Lab",
  },
  {
    eyebrow: "Dreaming of innovation",
    title: "Turning ideas into powerful mobile apps",
    subtitle: "From concept to scalable, high-performance Android & iOS enterprise applications.",
    image: "/images/hero/hero-mobile.jpg",
    badge1Title: "Mobile & Cloud Apps",
    badge1Subtitle: "Native iOS & Android Architecture",
    badge2Title: "100% Reliable Delivery",
    badge2Subtitle: "IIT Alumni Engineering Force",
    badge3Title: "Institutional Portals",
    badge3Subtitle: "84+ Active Deployments",
    locationLabel: "Mobile Solutions Engineering Hub",
  },
];

/**
 * The 5 marks shown in the scrolling logo strip near the foot of the old
 * homepage (`.logo-scroll-container`, live — not commented out). The old markup
 * labels them only as "Partner Logo 1..5" with no section heading, so the names
 * below were read from the artwork itself. The *relationship* each mark implies
 * (certified / empanelled / registered) is NOT asserted anywhere in the old
 * source — see docs/CONTENT_DIFFERENCE_REPORT.md; VT India should confirm the
 * heading wording.
 */
export const accreditations = [
  { name: "ISO 9001 Certified", image: "/images/partners/partner1.png" },
  { name: "OCAC — Odisha Computer Application Centre", image: "/images/partners/partner2.png" },
  { name: "MSME — Ministry of Micro, Small & Medium Enterprises, Government of India", image: "/images/partners/partner3.png" },
  { name: "Startup India", image: "/images/partners/partner4.png" },
  { name: "Startup Odisha", image: "/images/partners/partner5.png" },
];

/**
 * Capability labels. Every entry traces to a real VT India service or product:
 *   Software Development / Web Application / Mobile App Consulting / Digital
 *   Marketing / Project Management  -> services
 *   Augmented Reality + Virtual Reality / SME-ERP + Education ERP / IOT -> products
 *   Automation -> "automation tools", stated on the Software Development page
 *
 * "AI" was previously listed here in error — it is NOT claimed anywhere in the
 * recovered vtindia.com content, so it has been removed rather than presented
 * as a company capability.
 */
export const capabilities = [
  "Software Development",
  "Web Applications",
  "Mobile Apps",
  "Automation",
  "AR / VR",
  "Enterprise ERP",
  "Digital Marketing",
  "Project Management",
];

/** Short labels for the hero technology-ecosystem nodes. Same sourcing rule. */
export const ecosystemNodes = [
  { label: "Software", href: "/services/software-development" },
  { label: "Web", href: "/services/web-application" },
  { label: "Mobile", href: "/products/mobile-applications" },
  { label: "AR / VR", href: "/products/virtual-reality" },
  { label: "ERP", href: "/products/sme-erp" },
  { label: "IoT", href: "/products/iot" },
  { label: "Digital", href: "/services/digital-marketing" },
  { label: "Automation", href: "/services/software-development" },
];
