export type Service = {
  slug: string;
  oldPath: string;
  name: string;
  heading: string;
  summary: string;
  body: string[];
  highlights: string[];
  icon: string;
};

export const services: Service[] = [
  {
    slug: "software-development",
    oldPath: "/home/softwaredevelopment",
    name: "Software Development",
    heading: "Custom Software Services",
    summary: "Innovative, robust, and high-performance software solutions for diverse industries.",
    body: [
      "Virtoy Technologies is a premium Information Technology company providing world-class IT solutions to customers across Eastern India, the UAE, and the UK. The firm was established by IIT alumni and engineering professionals focused on innovation, integrity, and technical excellence.",
      "We blend technical expertise with strategic insight to solve real-world problems through cutting-edge technology, ensuring solutions are scalable and secure while remaining aligned with the unique goals of each client.",
      "Our services span web applications, mobile apps, enterprise systems, and automation tools — backed by a growing global footprint and a reputation for reliability, transparency and measurable results.",
    ],
    highlights: ["Web applications", "Mobile apps", "Enterprise systems", "Automation tools"],
    icon: "Code2",
  },
  {
    slug: "web-application",
    oldPath: "/home/webapplication",
    name: "Web Application",
    heading: "Maintenance and Support Strategy",
    summary: "Custom-built, scalable, and efficient web solutions tailored to your business needs.",
    body: [
      "With over 13 years of experience and roughly 300 clients worldwide, our web application team pairs extensive development experience with world-class professionals and consultants.",
      "Every engagement starts with business analysis to understand your processes and requirements, followed by elaborate research and market study to analyze competition before development begins.",
      "Security is built into the design and architecture from day one — protecting against unauthorized access and vulnerabilities such as SQL injection — while our design practice treats every website as a professionally crafted, standards-based experience.",
    ],
    highlights: ["Business analysis", "Market & competitor research", "Security-first architecture", "Modern design standards"],
    icon: "Globe",
  },
  {
    slug: "digital-marketing",
    oldPath: "/home/digitalmarketing",
    name: "Digital Marketing",
    heading: "Essential Digital Marketing Strategies",
    summary: "Strategic online growth through SEO, social media, and advertising.",
    body: [
      "Internet usage keeps growing, and it plays a crucial role in earning customer trust. We help you reach your audience where they already spend their time — Facebook, ad placements, video marketing or a fully-fledged website — delivered globally at affordable rates.",
      "Our customized internet marketing solutions engage your targeted audience for better online visibility and increased brand awareness, converting visitors into leads that regularly turn into new customers.",
    ],
    highlights: ["Social & video marketing", "Paid advertising", "Lead generation", "Brand visibility"],
    icon: "Megaphone",
  },
  {
    slug: "seo-consulting",
    oldPath: "/home/seoconsulting",
    name: "SEO Consulting",
    heading: "Optimize Visibility and Grow Your Traffic",
    summary: "Expert guidance to improve visibility, fix technical issues, and attract the right audience.",
    body: [
      "We begin every engagement with a full website audit — surfacing technical issues, content gaps and missed opportunities that shape a custom SEO plan tailored to your goals.",
      "From there, keyword research ensures your content targets the terms your customers are already searching for, while on-page work (structure, headings, metadata, internal linking) and off-page work (backlinks, local SEO) build authority.",
      "We continuously analyze performance — technical structure, user experience, and ranking blockers — to keep improving long-term, organic growth.",
    ],
    highlights: ["Website audits", "Keyword research", "On-page & off-page SEO", "Performance analysis"],
    icon: "Search",
  },
  {
    slug: "internet-marketing",
    oldPath: "/home/internetmarketing",
    name: "Internet Marketing",
    heading: "Smart Marketing Strategies",
    summary: "Driving brand visibility and engagement through strategic internet marketing solutions.",
    body: [
      "Internet marketing uses digital channels — SEO, social media, email and paid ads — to promote businesses online, reach targeted audiences and drive engagement, leads and sales.",
      "It goes beyond having a website: it's about building an online presence that attracts, engages and converts your audience, connecting you directly with the people who matter, tracking results in real time, and adapting quickly to changing trends.",
    ],
    highlights: ["SEO & social media", "Email campaigns", "Pay-per-click ads", "Real-time tracking"],
    icon: "TrendingUp",
  },
  {
    slug: "mobile-app-consulting",
    oldPath: "/home/mobileappconsulting",
    name: "Mobile App Consulting",
    heading: "Empowering Your Mobile App Journey",
    summary: "Expert guidance for seamless, user-friendly, and scalable mobile solutions.",
    body: [
      "Mobile app consulting helps teams turn complex ideas into functional, user-friendly applications. We guide architecture, platform selection and security — ensuring efficient development, smooth deployment and alignment with business goals while minimizing risk and maximizing ROI.",
      "Through expert analysis and strategic planning, we streamline workflows, integrate backend systems and optimize app performance — helping you deliver high-quality apps faster, with scalability and long-term success built in.",
    ],
    highlights: ["Architecture & platform strategy", "Security guidance", "Backend integration", "Performance optimization"],
    icon: "Smartphone",
  },
  {
    slug: "project-management",
    oldPath: "/home/projectmanagement",
    name: "Project Management",
    heading: "Streamlining Projects for Maximum Success",
    summary: "Strategic planning and execution to ensure timely and successful project delivery.",
    body: [
      "Project management brings structure, accountability and clear direction to every initiative, keeping teams focused and efficient across the project lifecycle — better control over scope, timelines and cost, and smoother stakeholder communication.",
      "We apply methodologies like Agile, Scrum and Waterfall depending on the engagement, treat risk management as a critical, ongoing discipline, and turn ideas into actionable plans without losing structural clarity.",
    ],
    highlights: ["Agile / Scrum / Waterfall", "Risk management", "Stakeholder communication", "Scope & timeline control"],
    icon: "ClipboardList",
  },
  {
    slug: "naac-nba",
    oldPath: "/home/naacnba",
    name: "NAAC & NBA Accreditation Consulting",
    heading: "NAAC / NBA Accreditation Consulting",
    summary: "Guiding institutions toward seamless accreditation and growth.",
    body: [
      "We support institutions preparing for the NAAC and NBA accreditation journey, helping them assess readiness ahead of new frameworks and awards.",
      "Our team connects institutions with assessment professionals, mentors and advisors, and provides an in-house-developed ERP tool that supports the institutional internal quality assurance (IQAC) workflow from conception through the award of accreditation — so leadership can visualize a predictive accreditation outcome well in advance.",
    ],
    highlights: ["Readiness assessment", "IQAC workflow ERP", "Mentor & advisor access", "Predictive accreditation insight"],
    icon: "GraduationCap",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
