export type Product = {
  slug: string;
  oldPath: string;
  name: string;
  heading: string;
  summary: string;
  body: string[];
  features: string[];
  usedBy?: string[];
  icon: string;
};

export const products: Product[] = [
  {
    slug: "safeact",
    oldPath: "/home/sefeact",
    name: "Safeact",
    heading: "Transforming Workplace Safety with Safeact",
    summary: "A workplace safety platform for real-time incident reporting and compliance tracking.",
    body: [
      "Safeact gives organizations a secure, role-based dashboard offering a real-time overview of safety metrics — tracking open tasks, monitoring progress and flagging issues instantly for faster, informed decisions.",
      "Department-level compliance pie charts (piloted at Kalinga Units I and II) enable quick visual analysis of high-risk areas, while the Observation Form lets employees report near-misses, unsafe acts or incidents, prioritized by plant, department and severity.",
      "A dedicated Notice section keeps everyone informed with schedules, policy changes and official communications, viewable or downloadable as PDF.",
    ],
    features: ["Secure role-based login", "Real-time safety dashboard", "Department compliance visualization", "Incident/observation reporting", "Notices & communications"],
    icon: "ShieldCheck",
  },
  {
    slug: "hotel-pms",
    oldPath: "/home/hotel",
    name: "Hotel-PMS",
    heading: "Hotel PMS – Smart Hotel Property Management System",
    summary: "A comprehensive property management system for hospitality operations.",
    body: [
      "Hotel PMS streamlines hotel operations and enhances guest experience with a secure login for controlled staff access and centralized data management.",
      "An integrated dashboard manages reservations, guest check-in/check-out, room availability, billing and housekeeping in real time, with booking management, guest records, payment tracking and reporting built in.",
      "Built for scalability in real-world hospitality environments, it improves operational efficiency, service quality and overall hotel performance.",
    ],
    features: ["Role-based staff login", "Reservation & billing", "Room & guest management", "Housekeeping operations", "Reporting tools"],
    icon: "BedDouble",
  },
  {
    slug: "education-erp",
    oldPath: "/home/college",
    name: "Education ERP",
    heading: "Education ERP – Smart Digital Campus Management System",
    summary: "Digital campus management for academic and administrative operations.",
    body: [
      "Education ERP streamlines academic and administrative operations with a secure login, a centralized dashboard integrating student, parent and faculty data, multi-department faculty management, and structured study-material distribution.",
      "Institutions such as Banki Autonomous College use the platform for departments spanning Commerce, History, Education, Odia, Philosophy, Political Science and Botany.",
    ],
    features: ["Secure login interface", "Parent/student/faculty dashboard", "Faculty & course lists", "Study material distribution"],
    usedBy: ["Government College Sundargarh", "Sarbati Devi Women's College Rajgangpur", "Banki Autonomous College"],
    icon: "School",
  },
  {
    slug: "library-management",
    oldPath: "/home/library",
    name: "Library Management",
    heading: "Library Management System – Smart Digital Library Administration",
    summary: "Automates library operations for educational institutions.",
    body: [
      "A secure admin login protects access and data integrity, while a centralized dashboard gives real-time visibility of books, students, staff and subjects.",
      "The system tracks issued books with borrower details, return status, due dates and fine management, and automates returns with instant inventory updates.",
    ],
    features: ["Admin login interface", "Centralized dashboard", "Issue list tracking", "Automated return & fine management"],
    usedBy: ["9 educational institutions across Odisha"],
    icon: "BookOpen",
  },
  {
    slug: "mobile-applications",
    oldPath: "/home/mobile",
    name: "Mobile Applications",
    heading: "Mobile Applications – Innovative Digital Experiences & Smart Solutions",
    summary: "Interactive, purpose-driven mobile experiences across specialized sectors.",
    body: [
      "Our flagship mobile release, Krushi Odisha 2025, was developed in collaboration with the Government of Odisha to integrate knowledge sharing with virtual reality for the agricultural community.",
      "The app lets farmers explore modern farming practices, experience virtual field environments, operate agricultural machinery, and build practical skills through immersive simulation — without real-world limitations — combining mobile accessibility with VR-based experiential learning.",
    ],
    features: ["VR-based experiential learning", "Field & machinery simulation", "Government partnership delivery", "Mobile-first accessibility"],
    usedBy: ["Krushi Odisha 2025 — Government of Odisha"],
    icon: "Sprout",
  },
  {
    slug: "billing-management",
    oldPath: "/home/billing",
    name: "Billing Management",
    heading: "Billing Management System – Smart & Scalable Business Billing Solution",
    summary: "Streamlines invoicing and financial operations for businesses of any size.",
    body: [
      "The system enables efficient time-and-billing tracking, automated invoice generation, and seamless customer payment management for both services and products.",
      "It supports multi-store and multi-company environments for centralized control across distributed operations, plus recurring, subscription-based and rental billing models — improving billing accuracy and financial control.",
    ],
    features: ["Automated invoicing", "Multi-store / multi-company billing", "Recurring & subscription billing", "Payment tracking"],
    icon: "Receipt",
  },
  {
    slug: "sme-erp",
    oldPath: "/home/erp",
    name: "SME-ERP",
    heading: "SME-ERP – Integrated Enterprise Resource Planning for Smart Business Management",
    summary: "Centralizes core operations for small and medium enterprises.",
    body: [
      "SME-ERP centralizes business operations with a secure login, an intuitive dashboard, and structured modules with role-based access and permissions across departments.",
      "It integrates key business functions into one unified system for informed decision-making, with a demo available on request.",
    ],
    features: ["Role-based dashboard", "Departmental workflow modules", "Unified business data", "Demo booking"],
    icon: "Building2",
  },
  {
    slug: "bilingual-websites",
    oldPath: "/home/bilingual",
    name: "Bilingual Websites",
    heading: "Bilingual Websites – Inclusive Multilingual Digital Platforms",
    summary: "English/Odia multilingual platforms for inclusive public communication.",
    body: [
      "Bilingual websites provide seamless user experiences in both English and Odia, ensuring inclusive information delivery and improved public engagement through smooth language switching and structured content presentation.",
      "The ATLC website is a live example — a bilingual platform supporting both English and Odia for inclusive communication, widely adopted by institutional and public service platforms.",
    ],
    features: ["English ⇄ Odia language switching", "Structured content presentation", "Institutional adoption"],
    usedBy: ["Academy of Tribal Languages and Culture (ATLC)", "Maa Cuttack Chandi"],
    icon: "Languages",
  },
  {
    slug: "augmented-reality",
    oldPath: "/home/ar",
    name: "Augmented Reality",
    heading: "Augmented Reality – Immersive Interactive Digital Experiences",
    summary: "AR experiences for learning, engagement and real-time visualization.",
    body: [
      "Our AR platform integrates virtual elements into real-world environments so users can explore information engagingly, supporting exhibitions, awareness programs and training with experiential learning.",
      "Krushi Odisha 2025 demonstrates AR content for government agricultural initiatives, including schemes for chemical-free farming, soil-health programs and disaster-response crop insurance subsidies.",
    ],
    features: ["Real-world + virtual overlays", "Exhibition & training use cases", "Government initiative showcases"],
    icon: "Scan",
  },
  {
    slug: "virtual-reality",
    oldPath: "/home/vr",
    name: "Virtual Reality",
    heading: "Virtual Reality – Immersive Simulation & Interactive Digital Environments",
    summary: "Immersive VR environments for training, education and entertainment.",
    body: [
      "Powered by Multiprocessor Systems-on-Chip (MPSo), our VR solutions enable real-time rendering, high-speed data processing and seamless multi-sensory interaction.",
      "Applications span sports simulation, medical training, defense simulation, smart manufacturing and education — all built on energy-efficient, high-performance parallel processing.",
    ],
    features: ["MPSo-powered real-time rendering", "Sports & training simulation", "Medical & defense use cases", "Parallel data processing"],
    icon: "Glasses",
  },
  {
    slug: "hrms",
    oldPath: "/home/hrms",
    name: "HRMS",
    heading: "Human Resource Management System",
    summary: "Automates workforce management and organizational operations.",
    body: [
      "HRMS streamlines workforce management with secure, role-based access for administrators and users, efficient management of employee records, appointments and performance tracking.",
      "A live dashboard gives real-time insight into organizational activity and financial performance, including income/expense charts and role-based statistics for management control.",
    ],
    features: ["Role-based admin access", "Employee record management", "Appointment scheduling", "Income/expense dashboards"],
    icon: "Users",
  },
  {
    slug: "digital-certificate-management",
    oldPath: "/home/digital",
    name: "Digital Certificate Management",
    heading: "Digital Certificate Management System",
    summary: "Automates issuance, approval and distribution of digital certificates.",
    body: [
      "Users submit a certificate request form; an admin reviews and approves it after quick validation; the system generates a certificate with the user's name and position, which appears on their personal dashboard for one-click download or print.",
      "This eliminates manual paperwork and reduces processing time for organizations, institutions and professional associations.",
    ],
    features: ["Online request form", "Admin approval workflow", "Auto-generated certificates", "Dashboard download/print"],
    usedBy: ["All Odisha Tax Advocates' Association", "Association of Surgical Oncologists"],
    icon: "FileBadge",
  },
  {
    slug: "iot",
    oldPath: "/home/iot",
    name: "IOT",
    heading: "Internet of Things (IoT) Solutions",
    summary: "Connects physical devices and sensors for real-time data and automation.",
    body: [
      "IoT connects physical objects embedded with sensors and software to collect, exchange and analyze real-time data — from smart home appliances and wearable health monitors to industrial automation and healthcare equipment.",
      "Our solutions help organizations optimize operations, enhance productivity and deliver smarter, more responsive services across manufacturing, healthcare, agriculture, transportation and smart infrastructure.",
    ],
    features: ["Sensor & device networking", "Real-time data analytics", "Cross-industry deployment", "Demo booking"],
    icon: "Cpu",
  },
  {
    slug: "ecommerce",
    oldPath: "/home/ecommerce",
    name: "E-Commerce Applications",
    heading: "Ecommerce Websites",
    summary: "Full digital commerce platforms from catalog to checkout.",
    body: [
      "Our ecommerce platforms support seamless customer registration and secure login for personalized shopping, order tracking and faster checkouts.",
      "Customers browse featured products, manage their cart, and complete purchases through a streamlined, secure checkout — helping businesses expand reach and deliver a smooth online shopping experience.",
    ],
    features: ["Customer registration & login", "Product catalog & cart", "Secure checkout", "Order tracking"],
    icon: "ShoppingCart",
  },
  {
    slug: "digital-directory",
    oldPath: "/home/directory",
    name: "Digital Directory",
    heading: "Digital Directory",
    summary: "A centralized electronic directory for contacts, business listings and institutional resources.",
    body: [
      "A Digital Directory is an advanced electronic platform designed to store, organize, and manage contact information, business listings, and institutional resources in a centralized digital environment.",
      "It offers real-time access through web applications, mobile platforms or dedicated software, enabling users to search and retrieve information quickly and efficiently through structured data management, easy updates and seamless accessibility.",
      "The solution serves organizations, campuses, corporate offices and professional networks — improving information visibility, communication and data retrieval.",
    ],
    features: [
      "Centralized contact & listing management",
      "Real-time web and mobile access",
      "Fast search and retrieval",
      "Structured data with easy updates",
    ],
    icon: "BookUser",
  },
  {
    slug: "online-voting",
    oldPath: "/home/online",
    name: "Online Voting",
    heading: "Secure and Efficient Online Voting System",
    summary: "A transparent digital platform for conducting elections.",
    body: [
      "Voters register through an online form or QR code and verify their identity before participating. Once authenticated, they review their details and cast their vote securely.",
      "The platform ensures accuracy, data integrity and confidentiality throughout the election process — ideal for associations and institutions running digital elections.",
    ],
    features: ["QR / online voter registration", "Identity verification", "Secure vote casting", "Accuracy & confidentiality controls"],
    usedBy: ["Odisha Medical Services Association", "Odisha Agricultural Services Association"],
    icon: "Vote",
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
