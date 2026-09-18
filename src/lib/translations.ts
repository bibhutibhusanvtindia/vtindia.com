"use client";

import { useEffect, useState } from "react";
import { VoiceLanguage, getVoiceLanguage, setVoiceLanguage, subscribeLanguage } from "@/lib/sound";

export function useLanguage() {
  const [lang, setLang] = useState<VoiceLanguage>("en");

  useEffect(() => {
    setLang(getVoiceLanguage());
    const unsub = subscribeLanguage((l) => setLang(l));
    return () => unsub();
  }, []);

  return {
    lang,
    setLang: (newLang: VoiceLanguage) => setVoiceLanguage(newLang),
    t: (key: keyof typeof translations.en) => {
      const dict = translations[lang] || translations.en;
      return dict[key] || translations.en[key] || "";
    },
  };
}

export const translations = {
  en: {
    // Nav & Header
    nav_home: "Home",
    nav_company: "Company",
    nav_services: "Services",
    nav_products: "Products",
    nav_portfolio: "Portfolio",
    nav_contact: "Contact",
    nav_get_in_touch: "Get in touch",
    nav_call_us: "Call Us",
    nav_quick_command: "Quick Command",
    nav_search_placeholder: "Type a command or search...",

    // Dropdowns
    nav_about_us: "About Us",
    nav_leadership: "Leadership & Team",
    nav_clients: "Client Deployments",
    nav_testimonials: "Testimonials",
    nav_careers: "Careers",

    // Hero Section
    hero_badge: "Premium Enterprise IT Solutions",
    hero_badge_sub: "Eastern India & UAE",
    hero_slide1_eyebrow: "We can help you creating differences",
    hero_slide1_title: "Need to explore the IT world",
    hero_slide1_subtitle: "Innovative, robust IT solutions for businesses across Eastern India, the UAE and beyond.",
    hero_slide1_b1_title: "84+ Client Deployments",
    hero_slide1_b1_sub: "Tata Sponge · Aditya Birla · NALCO",
    hero_slide1_b2_title: "ISO 9001 & MSME",
    hero_slide1_b2_sub: "Certified Standards",
    hero_slide1_b3_title: "IIT Alumni Founded",
    hero_slide1_b3_sub: "Engineering Excellence",
    hero_slide1_loc: "Virtoy Kolkata Head Office",

    hero_slide2_eyebrow: "Engineering high performance apps",
    hero_slide2_title: "Step into the future of powerful mobile apps",
    hero_slide2_subtitle: "Native Android & iOS solutions built for high concurrency, flawless UX, and mission-critical workflows.",
    hero_slide2_b1_title: "40K+ Active Users",
    hero_slide2_b1_sub: "Krushi Odisha Platform",
    hero_slide2_b2_title: "Flutter & React Native",
    hero_slide2_b2_sub: "Cross-Platform Precision",
    hero_slide2_b3_title: "Zero-Downtime Architecture",
    hero_slide2_b3_sub: "Cloud-Native Infrastructure",
    hero_slide2_loc: "Mobile Solutions Engineering Hub",

    hero_slide3_eyebrow: "Spatial Computing & Metaverse",
    hero_slide3_title: "We can help you redefine reality with VR",
    hero_slide3_subtitle: "Immersive VR safety simulators and spatial training that turn hazardous industrial procedures into zero-risk learning.",
    hero_slide3_b1_title: "SafeAct Hazard Simulator",
    hero_slide3_b1_sub: "Heavy Industry Ready",
    hero_slide3_b2_title: "6-DoF Precision",
    hero_slide3_b2_sub: "Interactive Physical Engine",
    hero_slide3_b3_title: "Govt of Odisha Pavilion",
    hero_slide3_b3_sub: "Krushi 2025 VR Expo",
    hero_slide3_loc: "Virtoy AR/VR Interactive Lab",

    hero_cta_services: "Explore Services",
    hero_cta_voice_tour: "Voice Tour",
    hero_cta_contact: "Contact us",
    hero_trust_clients: "84+ Clients Deployed",
    hero_trust_products: "16 Products Built",
    hero_trust_support: "24/7 Expert Support",

    // Client Marquee
    marquee_eyebrow: "Trusted by Industry Leaders",
    marquee_title: "84 Verified Deployments Across Eastern India & UAE",
    marquee_desc: "Powering heavy industrial giants, state universities, medical institutions, and corporate enterprises.",
    marquee_btn: "View all 84+ clients",

    // About Section
    about_eyebrow: "About VT India",
    about_title: "Building strong teams for success and innovation",
    about_description: "Founded by a team of young, experienced IIT alumni and engineering professionals, Virtoy Technologies builds software, web, mobile, AR/VR and enterprise solutions for clients across Eastern India and the Middle East.",
    about_vision_title: "Our Vision",
    about_vision_desc: "To create a world class IT solutions facility in Odisha, India to reverse the brain drain trend and take technology right into the grass roots in India & overseas to transform lives — and to create a global hub of cutting edge technologies.",
    about_mission_title: "Our Mission",
    about_mission_desc: "Driving innovation with cutting-edge technology to empower businesses and communities.",
    about_support_title: "Our Support",
    about_support_desc: "A dedicated support team of certified technical experts delivers reliable, 24/7 support, ensuring seamless operations and client satisfaction.",
    about_btn: "View more about us",

    // Interactive Experience Center
    exp_badge: "Live Interactive Technology Lab",
    exp_title: "Experience the Engine In Real Time",
    exp_desc: "Interact with our live simulation engines, industrial telemetry dashboards, and cloud architecture simulators.",
    exp_tab_vr: "VR Physics Simulator",
    exp_tab_safeact: "SafeAct Live Telemetry",
    exp_tab_cloud: "Cloud Architecture Bench",

    // Spatial Lab
    spatial_badge: "Spatial Computing & AR/VR Lab",
    spatial_title: "Next-Generation Immersive Spatial Simulations",
    spatial_desc: "Experience high-fidelity 3D digital twins and virtual training environments engineered for enterprise and government deployments.",
    spatial_btn_demo: "Launch Virtual Reality Lab",

    // Comparison Matrix
    comp_badge: "Enterprise Standard Matrix",
    comp_title: "Why Virtoy Surpasses Traditional IT Vendors",
    comp_desc: "A detailed breakdown of our IIT engineering rigor, 24/7 on-ground support, and modular software IP compared to market alternatives.",

    // Transformation Visualizer
    trans_badge: "Institutional Modernization",
    trans_title: "Transforming Manual Workflows Into Autonomous Systems",
    trans_desc: "See the quantifiable leap before and after implementing Virtoy's custom software architectures.",

    // Impact Stories
    impact_badge: "Proven Real-World Impact",
    impact_title: "Delivering Quantifiable Results for 84+ Clients",
    impact_desc: "Explore verified case studies across heavy industry, state agriculture, and autonomous university campuses.",

    // ROI Calculator
    roi_badge: "Enterprise Cost & Efficiency",
    roi_title: "Calculate Your Operational ROI with Virtoy Systems",
    roi_desc: "Estimate labor hours saved, error rate reduction, and uptime gains customized for your organisation.",

    // Tech Stack Hub
    tech_badge: "Architecture & Technology",
    tech_title: "Modern, Scalable & Resilient Tech Stack",
    tech_desc: "Built on battle-tested frameworks: Next.js, Flutter, PyTorch, Unity 3D, and high-availability PostgreSQL.",

    // Project Configurator
    config_badge: "Instant Solution Scope",
    config_title: "Configure Your Enterprise Solution",
    config_desc: "Select your project requirements, target platforms, and compliance needs to generate an architectural estimate.",

    // Live Telemetry
    telemetry_badge: "System Health & SLA Status",
    telemetry_title: "Live Operations & Infrastructure Telemetry",
    telemetry_desc: "Real-time monitoring across our active cloud nodes, ERP instances, and customer support desks.",

    // Global Footprint
    footprint_badge: "Dual Innovation Hubs",
    footprint_title: "Connecting Eastern India to Global Markets",
    footprint_desc: "Operating from our Kolkata Head Office and Bhubaneswar O-HUB facility, serving India and the UAE.",

    // Portfolio
    portfolio_badge: "Verified Institutional Portfolio",
    portfolio_title: "Deployed Systems & Case Studies",
    portfolio_desc: "Explore our software deployments powering autonomous colleges, heavy industries, and government initiatives.",

    // Testimonials
    test_badge: "Client Endorsements",
    test_title: "What Institutional Leaders Say About Virtoy",
    test_desc: "Authentic feedback from directors, principals, and safety managers across Odisha and Eastern India.",

    // Enterprise FAQ
    faq_badge: "Enterprise FAQ",
    faq_title: "Frequently Asked Questions",
    faq_desc: "Clear answers regarding our engineering standards, deployment timelines, licensing models, and 24/7 SLA guarantees.",

    // Accreditations
    accred_badge: "Certified Compliance",
    accred_title: "Industry Accreditations & Standards",
    accred_desc: "ISO 9001 certified, MSME registered, and fully compliant with state NAAC educational digitization standards.",

    // Team Preview
    team_badge: "Leadership & Engineering",
    team_title: "Led by IIT Alumni & Senior Technologists",
    team_desc: "Our leadership brings decades of combined experience from premier research institutes and enterprise software firms.",
    team_btn: "Meet Full Team",

    // Careers Teaser
    careers_badge: "Join Our Engineering Team",
    careers_title: "Build Cutting-Edge Tech from Eastern India",
    careers_desc: "We are actively looking for talented software engineers, mobile developers, and 3D VR creators in Kolkata and Bhubaneswar.",
    careers_btn: "Explore Open Careers",

    // Products Section
    products_eyebrow: "Product ecosystem",
    products_title: "Purpose-built software, deployed in the field",
    products_subtitle: "Every software product below is proven in real institutional and enterprise deployments.",
    products_view_all: "All 16 products",
    products_explore_btn: "Explore Product",
    products_live_demo: "Request Demo",

    // Services Section
    services_eyebrow: "What we do",
    services_title: "Services built around your growth",
    services_subtitle: "From the first line of code to accreditation-ready ERP workflows — refined over a decade of delivery.",
    services_view_all: "All 8 services",

    // Why Virtoy
    why_eyebrow: "The Virtoy Advantage",
    why_title: "Why Leading Enterprises & Institutions Choose Us",
    why_card1_title: "Founded by IIT Alumni & Senior Engineers",
    why_card1_desc: "Founded by a team of experienced IIT alumni and energetic engineering professionals, building systems with mathematical precision and zero architectural debt.",
    why_card2_title: "84+ Verified Enterprise & Institutional Deployments",
    why_card2_desc: "Proven track record delivering mission-critical safety, ERP, and digital systems for industrial giants like Tata Steel, Vedanta, JSPL, and Dalmia Cement.",
    why_card3_title: "24/7 Dedicated Support SLA & Dual Regional Hubs",
    why_card3_desc: "Direct access to certified software engineers stationed at our Kolkata Head Office and Bhubaneswar O-HUB, ensuring immediate turnaround.",
    why_card4_title: "Immersive AR/VR Innovation",
    why_card4_desc: "Pioneering spatial computing and VR safety training simulators across Eastern India.",

    // Contact CTA
    cta_eyebrow: "Get in touch",
    cta_title: "Have an idea or enterprise project? Let's build it.",
    cta_subtitle: "Visit our offices in India & the UAE or connect with our engineering team directly.",
    cta_btn_contact: "Start a Conversation",
    cta_btn_call: "Direct Call: +91 9861802325",

    // Footer
    footer_desc: "Virtoy Technologies Pvt. Ltd. is a premium Information Technology company providing world class IT solutions to customers across Eastern India, the UAE and the UK.",
    footer_quick_links: "Quick Navigation",
    footer_products_col: "Proprietary Products",
    footer_offices_col: "Office Locations",
    footer_kolkata_hq: "Kolkata Head Office",
    footer_kolkata_addr: "3rd Floor, Jharanalaya, 635 Baishnabghatta, Patuli, Kolkata, West Bengal - 700084",
    footer_bhubaneswar_dev: "Bhubaneswar Office",
    footer_bhubaneswar_addr: "Tower-A, 4th Floor, Room 409, (O-HUB), SEZ Road, Chandaka Industrial Estate, Bhubaneswar, Odisha",
    footer_rights: "All rights reserved. Virtoy Technologies Pvt. Ltd.",
    footer_privacy: "Privacy Policy",

    // Inner Page Translations
    // Contact Page
    hero_contact_eyebrow: "Get in touch",
    hero_contact_title: "Have an idea? Let's build it together.",
    hero_contact_desc: "Come and visit our offices or simply send us an email anytime you want. We are open to all suggestions from our clients.",
    contact_reach_direct: "Reach us directly",
    contact_whatsapp_chat: "Chat on WhatsApp",
    form_name: "Your name",
    form_name_ph: "Full name",
    form_email: "Your email",
    form_email_ph: "you@company.com",
    form_phone: "Your phone",
    form_phone_ph: "+91",
    form_subject: "Subject",
    form_subject_ph: "How can we help?",
    form_message: "Your message",
    form_message_ph: "Tell us about your project",
    form_sending: "Sending…",
    form_send: "Send message",
    form_sent_title: "Thank you — your message is on its way.",
    form_sent_desc: "Our team will get back to you shortly.",
    form_send_another: "Send another message",

    // About Page
    hero_about_eyebrow: "About us",
    hero_about_title: "A premium IT company built by engineers, for growing businesses",
    hero_about_desc: "Innovative, robust IT solutions for businesses across Eastern India, the UAE and beyond.",
    about_who_eyebrow: "Who we are",
    about_who_title: "Technology. Experience. Innovation.",
    about_p1: "Virtoy Technology is a team of passionate and highly skilled professionals, dedicated to deliver the best — a collective of highly skilled techno-commercial resources across all experience levels.",
    about_p2: "We are an energetic team of very dedicated developers and digital commandos, led by senior technical enthusiasts, delivering innovative software solutions, web development and digital transformation.",
    about_cover_eyebrow: "What we cover",
    about_cover_title: "From a first website to enterprise-scale systems",
    about_cap1: "Simple jazzy websites through to full-fledged web applications, web portals and intranet apps",
    about_cap2: "Digital marketing, SEO strategy and mobile apps",
    about_cap3: "Custom software, ERP workflows and database solutions",
    about_btn_services: "Explore our services",
    about_btn_team: "Meet the team",

    // Services Page & Details
    hero_services_eyebrow: "Engineering Service Lines",
    hero_services_title: "Enterprise Capabilities Architected for Scale",
    hero_services_desc: "Eight specialized service lines delivered by IIT alumni engineering pods, refined over a decade of production execution across Eastern India, the UAE and the UK.",
    services_whats_included: "What's included",
    services_get_quote: "Get a quote",
    services_explore_other: "Explore other services",
    services_consultation: "Consultation & Roadmap",

    // Products Page & Details
    hero_products_eyebrow: "Proprietary Product Ecosystem",
    hero_products_title: "Field-Tested Software Systems & Spatial Engines",
    hero_products_desc: "16 production software systems spanning industrial safety, enterprise ERP, hospital healthcare, and immersive AR/VR simulation — ready for custom enterprise deployment.",
    products_cat_all: "All Products",
    products_cat_safety: "Industrial & Safety",
    products_cat_erp: "Enterprise & ERP",
    products_cat_spatial: "AR/VR & Spatial",
    products_cat_specialized: "Healthcare & Portals",
    products_search_ph: "Search 16 systems...",
    products_showing: "Showing",
    products_of: "of",
    products_software_systems: "proprietary software systems",
    products_reset_filters: "Reset filters",
    products_ip_engine: "IP ENGINE",
    products_live_deployments: "Live Deployments:",
    products_more: "more",
    products_explore_specs: "Explore Architecture Specs",
    products_key_features: "Key features",
    products_book_demo: "Book a demo",
    products_used_by: "Used by",
    products_more_ecosystem: "More from our product ecosystem",

    // Portfolio Page
    hero_portfolio_eyebrow: "Our work",
    hero_portfolio_title: "A portfolio built on trust",
    hero_portfolio_desc: "Projects delivered for colleges, associations, industry and government-facing programmes.",
    portfolio_featured_heading: "Featured projects",
    portfolio_bottom_note_1: "These are the projects featured on the VT India homepage. A further",
    portfolio_bottom_note_clients: "84 client organisations",
    portfolio_bottom_note_2: "— colleges, hospitals, hotels, associations and industrial groups — are listed with their logos and websites.",

    // Clients Page
    hero_clients_eyebrow: "Who we work with",
    hero_clients_title: "Our clients & partners",
    hero_clients_desc: "Colleges, hospitals, hotels, associations and industrial groups across Odisha, West Bengal and beyond.",
    clients_cat_all: "All",
    clients_cat_edu: "Educational Institutions",
    clients_cat_health: "Healthcare Providers",
    clients_cat_hotel: "Hotels & Hospitality",
    clients_cat_ind: "Industrial & Corporate",
    clients_cat_gov: "Government & Associations",
    clients_search_ph: "Search 84+ client organizations...",
    clients_verified_partners: "verified partner organizations",
    clients_reset: "Reset filter & search",
    clients_private_deployment: "Private enterprise intranet deployment",
    clients_visit_portal: "Visit portal →",
    clients_no_match: "No organizations matching your search",
    clients_no_match_sub: "Try clearing your search query or selecting a different category.",

    // Team Page
    hero_team_eyebrow: "We are there for you",
    hero_team_title: "Our professionals",
    hero_team_desc: "A team of passionate and highly skilled professionals, dedicated to deliver the best.",
    team_leadership: "Leadership",
    team_engineering: "Engineering & delivery",

    // Testimonials Page
    hero_testimonials_eyebrow: "Client feedback",
    hero_testimonials_title: "What our clients say",
    test_more_reviews: "More client reviews",

    // Careers Page
    hero_careers_eyebrow: "Grow your career with us",
    hero_careers_title: "Would you like to join us?",
    hero_careers_desc: "Whether you're passionate about solving real-world challenges, streamlining enterprise operations, or crafting elegant digital experiences, you'll find purpose here.",
    careers_why_eyebrow: "Why Virtoy",
    careers_why_title: "Build high-impact solutions while delivering exceptional customer experiences",
    careers_b1_title: "Challenging projects",
    careers_b1_desc: "Engaging initiatives requiring innovation and strategic problem-solving.",
    careers_b2_title: "Custom working time",
    careers_b2_desc: "Flexible schedules fostering productivity and work-life balance.",
    careers_b3_title: "Health insurance",
    careers_b3_desc: "Comprehensive coverage ensuring your well-being and peace of mind.",
    careers_b4_title: "Close to city center",
    careers_b4_desc: "Conveniently located with easy access.",
    careers_b5_title: "Award winning team",
    careers_b5_desc: "Work alongside recognised professionals delivering real impact.",
    careers_b6_title: "Great people",
    careers_b6_desc: "A collaborative culture with supportive leadership and room to grow.",
    careers_apply_eyebrow: "Apply now",
    careers_apply_title: "Send us your details",
    careers_apply_desc: "We review every application. Share your background and attach your resume — if there's a fit, our team will reach out to you directly.",
    form_city: "City",
    form_postcode: "Postcode",
    form_postcode_ph: "PIN code",
    form_address: "Address",
    form_address_ph: "Street address",
    form_resume: "Your resume (PDF or Word, max 5MB)",
    form_about_you: "Tell us about yourself",
    form_submitting: "Submitting…",
    form_submit_app: "Submit application",
    form_app_received: "Application received.",
    form_app_received_desc: "Thank you for your interest in joining Virtoy. We'll be in touch.",
    form_submit_another: "Submit another application",

    // Privacy Page
    hero_privacy_eyebrow: "Privacy",
    hero_privacy_title: "Explore our Privacy Policy",
    privacy_p1: "Virtoy Technologies Pvt. Ltd. treats all customer information, proprietary specifications, project documentation, and institutional datasets with the highest degree of confidentiality and data security.",
    privacy_p2: "We do not sell, distribute, or lease private client information to third parties. Access to development environments, databases, and source repositories is strictly restricted on a need-to-know basis protected by multi-factor authentication and role-based access control.",
    privacy_p3: "For enterprise and government deployments, custom Non-Disclosure Agreements (NDAs), Service Level Agreements (SLAs), and data sovereignty clauses are executed prior to production system provisioning.",
    privacy_pr1: "Strict Data Confidentiality",
    privacy_pr2: "Zero Third-Party Sharing",
    privacy_pr3: "Role-Based Access Control",
    privacy_pr4: "Encrypted Cloud Storage",
    privacy_pr5: "Enterprise NDA Protection",
    privacy_pr6: "ISO 9001 Process Rigor",

    // 404 Page
    notfound_title: "This page could not be found",
    notfound_desc: "The page you are looking for may have moved. Try our services, products, or get in touch with us directly.",
    notfound_btn_home: "Back home",
    notfound_btn_contact: "Contact us",
  },

  hi: {
    // Nav & Header
    nav_home: "होम",
    nav_company: "कंपनी",
    nav_services: "सेवाएं",
    nav_products: "उत्पाद",
    nav_portfolio: "पोर्टफोलियो",
    nav_contact: "संपर्क",
    nav_get_in_touch: "संपर्क करें",
    nav_call_us: "कॉल करें",
    nav_quick_command: "त्वरित खोज",
    nav_search_placeholder: "खोजें या कमांड टाइप करें...",

    // Dropdowns
    nav_about_us: "हमारे बारे में",
    nav_leadership: "नेतृत्व एवं टीम",
    nav_clients: "प्रमाणित क्लाइंट्स",
    nav_testimonials: "प्रशंसापत्र",
    nav_careers: "करियर",

    // Hero Section
    hero_badge: "प्रीमियम एंटरप्राइज आईटी समाधान",
    hero_badge_sub: "पूर्वी भारत एवं यूएई",
    hero_slide1_eyebrow: "हम आपको विशिष्ट पहचान दिलाने में मदद करते हैं",
    hero_slide1_title: "आईटी की आधुनिक दुनिया में कदम रखें",
    hero_slide1_subtitle: "पूर्वी भारत, यूएई और उससे आगे के व्यवसायों के लिए आधुनिक, मजबूत और स्केलेबल आईटी समाधान।",
    hero_slide1_b1_title: "84+ क्लाइंट परिनियोजन",
    hero_slide1_b1_sub: "टाटा स्पंज · आदित्य बिड़ला · नाल्को",
    hero_slide1_b2_title: "ISO 9001 एवं MSME",
    hero_slide1_b2_sub: "प्रमाणित गुणवत्ता मानक",
    hero_slide1_b3_title: "आईआईटी पूर्व छात्रों द्वारा स्थापित",
    hero_slide1_b3_sub: "इंजीनियरिंग उत्कृष्टता",
    hero_slide1_loc: "वर्टोय कोलकाता मुख्य कार्यालय",

    hero_slide2_eyebrow: "उच्च प्रदर्शन वाले मोबाइल ऐप का निर्माण",
    hero_slide2_title: "शक्तिशाली मोबाइल अनुप्रयोगों के भविष्य में प्रवेश करें",
    hero_slide2_subtitle: "नेटिव एंड्रॉइड और आईओएस समाधान, जो उच्च क्षमता और बेहतरीन यूजर अनुभव के लिए तैयार किए गए हैं।",
    hero_slide2_b1_title: "40 हजार+ सक्रिय उपयोगकर्ता",
    hero_slide2_b1_sub: "कृषि ओडिशा डिजिटल प्लेटफ़ॉर्म",
    hero_slide2_b2_title: "फ़्लटर एवं रिएक्ट नेटिव",
    hero_slide2_b2_sub: "क्रॉस-प्लेटफ़ॉर्म परिशुद्धता",
    hero_slide2_b3_title: "जीरो-डाउनटाइम आर्किटेक्चर",
    hero_slide2_b3_sub: "क्लाउड-नेटिव इंफ्रास्ट्रक्चर",
    hero_slide2_loc: "मोबाइल सॉल्यूशंस इंजीनियरिंग हब",

    hero_slide3_eyebrow: "स्थानिक कंप्यूटिंग एवं मेटावर्स",
    hero_slide3_title: "वीआर के साथ वास्तविकता को नया रूप दें",
    hero_slide3_subtitle: "इमर्सिव वीआर सुरक्षा सिमुलेटर और स्थानिक प्रशिक्षण, जो औद्योगिक प्रक्रियाओं को जोखिम-मुक्त बनाते हैं।",
    hero_slide3_b1_title: "सेफएक्ट हैज़र्ड सिमुलेटर",
    hero_slide3_b1_sub: "भारी उद्योग हेतु तैयार",
    hero_slide3_b2_title: "6-DoF परिशुद्धता",
    hero_slide3_b2_sub: "इंटरैक्टिव भौतिकी इंजन",
    hero_slide3_b3_title: "ओडिशा सरकार पैवेलियन",
    hero_slide3_b3_sub: "कृषि 2025 वीआर एक्सपो",
    hero_slide3_loc: "वर्टोय एआर/वीआर इंटरैक्टिव लैब",

    hero_cta_services: "सेवाएं देखें",
    hero_cta_voice_tour: "वॉयस टूर",
    hero_cta_contact: "संपर्क करें",
    hero_trust_clients: "84+ प्रमाणित क्लाइंट्स",
    hero_trust_products: "16 निर्मित उत्पाद",
    hero_trust_support: "24/7 विशेषज्ञ सहायता",

    // Client Marquee
    marquee_eyebrow: "उद्योग जगत के दिग्गजों द्वारा विश्वसनीय",
    marquee_title: "पूर्वी भारत और यूएई में 84 प्रमाणित परिनियोजन",
    marquee_desc: "भारी उद्योग, राज्य विश्वविद्यालयों, चिकित्सा संस्थानों और कॉर्पोरेट उद्यमों को सशक्त बनाना।",
    marquee_btn: "सभी 84+ क्लाइंट्स देखें",

    // About Section
    about_eyebrow: "वीटी इंडिया के बारे में",
    about_title: "सफलता और नवाचार के लिए मजबूत टीमों का निर्माण",
    about_description: "आईआईटी पूर्व छात्रों और अनुभवी इंजीनियरिंग पेशेवरों द्वारा स्थापित, वर्टोय टेक्नोलॉजीज सॉफ्टवेयर, वेब, मोबाइल, एआर/वीआर और एंटरप्राइज समाधान प्रदान करती है।",
    about_vision_title: "हमारा विजन",
    about_vision_desc: "ओडिशा में एक विश्वस्तरीय आईटी सुविधा केंद्र का निर्माण करना ताकि प्रतिभा पलायन को रोका जा सके और अत्याधुनिक तकनीक को जमीनी स्तर तक पहुँचाया जा सके।",
    about_mission_title: "हमारा मिशन",
    about_mission_desc: "व्यवसायों और समुदायों को सशक्त बनाने के लिए अत्याधुनिक तकनीक के साथ नवाचार को बढ़ावा देना।",
    about_support_title: "हमारा सपोर्ट",
    about_support_desc: "प्रमाणित तकनीकी विशेषज्ञों की समर्पित टीम 24/7 निर्बाध संचालन और क्लाइंट संतुष्टि सुनिश्चित करती है।",
    about_btn: "हमारे बारे में और जानें",

    // Interactive Experience Center
    exp_badge: "लाइव इंटरैक्टिव टेक्नोलॉजी लैब",
    exp_title: "रीयल टाइम में सिस्टम का अनुभव करें",
    exp_desc: "हमारे लाइव सिमुलेशन इंजन, औद्योगिक टेलीमेट्री और क्लाउड आर्किटेक्चर के साथ संवाद करें।",
    exp_tab_vr: "वीआर भौतिकी सिमुलेटर",
    exp_tab_safeact: "सेफएक्ट लाइव टेलीमेट्री",
    exp_tab_cloud: "क्लाउड आर्किटेक्चर बेंच",

    // Spatial Lab
    spatial_badge: "स्थानिक कंप्यूटिंग एवं एआर/वीआर लैब",
    spatial_title: "अगली पीढ़ी के इमर्सिव स्थानिक सिमुलेशन",
    spatial_desc: "एंटरप्राइज और सरकारी परियोजनाओं के लिए निर्मित 3D डिजिटल ट्विन और वर्चुअल प्रशिक्षण वातावरण।",
    spatial_btn_demo: "वर्चुअल रियलिटी लैब शुरू करें",

    // Comparison Matrix
    comp_badge: "एंटरप्राइज मानक मैट्रिक्स",
    comp_title: "वर्टोय पारंपरिक आईटी विक्रेताओं से आगे क्यों है",
    comp_desc: "हमारे आईआईटी इंजीनियरिंग मानक, 24/7 ऑन-ग्राउंड सहायता और मॉड्यूलर सॉफ्टवेयर आईपी का विस्तृत विवरण।",

    // Transformation Visualizer
    trans_badge: "संस्थागत आधुनिकीकरण",
    trans_title: "मैन्युअल कार्यप्रणाली को स्वायत्त प्रणालियों में बदलें",
    trans_desc: "वर्टोय के कस्टम सॉफ्टवेयर समाधानों को लागू करने से पहले और बाद का सटीक अंतर देखें।",

    // Impact Stories
    impact_badge: "प्रमाणित वास्तविक प्रभाव",
    impact_title: "84+ ग्राहकों के लिए मापने योग्य परिणाम",
    impact_desc: "भारी उद्योग, राज्य कृषि और स्वायत्त विश्वविद्यालय परिसरों में प्रमाणित केस स्टडीज।",

    // ROI Calculator
    roi_badge: "एंटरप्राइज लागत एवं दक्षता",
    roi_title: "वर्टोय सिस्टम्स के साथ अपने ROI की गणना करें",
    roi_desc: "बचत किए गए कार्य घंटे, त्रुटि दर में कमी और अपटाइम लाभ का अनुकूलित अनुमान लगाएं।",

    // Tech Stack Hub
    tech_badge: "आर्किटेक्चर एवं तकनीक",
    tech_title: "आधुनिक, स्केलेबल और लचीला टेक स्टैक",
    tech_desc: "नेक्स्ट.जेएस, फ़्लटर, पायटॉर्च, यूनिटी 3D और हाई-अवेलेबिलिटी पोस्टग्रेसक्यूएल पर आधारित।",

    // Project Configurator
    config_badge: "तत्काल समाधान स्कोप",
    config_title: "अपना एंटरप्राइज समाधान कॉन्फ़िगर करें",
    config_desc: "आर्किटेक्चरल अनुमान प्राप्त करने के लिए अपनी आवश्यकताएं और अनुपालन मानक चुनें।",

    // Live Telemetry
    telemetry_badge: "सिस्टम स्वास्थ्य एवं SLA स्थिति",
    telemetry_title: "लाइव संचालन एवं इंफ्रास्ट्रक्चर टेलीमेट्री",
    telemetry_desc: "हमारे सक्रिय क्लाउड नोड्स, ईआरपी और ग्राहक सहायता डेस्क की रीयल-टाइम निगरानी।",

    // Global Footprint
    footprint_badge: "दोहरे नवाचार केंद्र",
    footprint_title: "पूर्वी भारत को वैश्विक बाजारों से जोड़ना",
    footprint_desc: "कोलकाता मुख्यालय और भुवनेश्वर ओ-हब केंद्र से भारत और यूएई को सेवाएं।",

    // Portfolio
    portfolio_badge: "सत्यापित संस्थागत पोर्टफोलियो",
    portfolio_title: "परिनियोजित सिस्टम एवं केस स्टडीज",
    portfolio_desc: "ओडिशा के स्वायत्त कॉलेजों, भारी उद्योगों और सरकारी पहलों में कार्यरत सॉफ्टवेयर।",

    // Testimonials
    test_badge: "क्लाइंट प्रतिक्रिया",
    test_title: "संस्थागत प्रमुख वर्टोय के बारे में क्या कहते हैं",
    test_desc: "ओडिशा और पूर्वी भारत के निदेशकों, प्राचार्यों और सुरक्षा प्रबंधकों की वास्तविक प्रतिक्रिया।",

    // Enterprise FAQ
    faq_badge: "अक्सर पूछे जाने वाले प्रश्न",
    faq_title: "महत्वपूर्ण प्रश्न एवं उत्तर",
    faq_desc: "हमारे इंजीनियरिंग मानकों, समयसीमा और 24/7 SLA गारंटी से संबंधित स्पष्ट उत्तर।",

    // Accreditations
    accred_badge: "प्रमाणित अनुपालन",
    accred_title: "उद्योग प्रत्यायन एवं मानक",
    accred_desc: "ISO 9001 प्रमाणित, MSME पंजीकृत और राज्य NAAC डिजिटलीकरण मानकों के पूर्णतः अनुरूप।",

    // Team Preview
    team_badge: "नेतृत्व एवं इंजीनियरिंग",
    team_title: "आईआईटी पूर्व छात्रों एवं वरिष्ठ इंजीनियरों का नेतृत्व",
    team_desc: "हमारा नेतृत्व प्रमुख शोध संस्थानों और सॉफ्टवेयर कंपनियों का दशकों का अनुभव रखता है।",
    team_btn: "पूरी टीम से मिलें",

    // Careers Teaser
    careers_badge: "हमारी इंजीनियरिंग टीम से जुड़ें",
    careers_title: "पूर्वी भारत से अत्याधुनिक तकनीक का निर्माण करें",
    careers_desc: "हम कोलकाता और भुवनेश्वर में प्रतिभाशाली सॉफ्टवेयर, मोबाइल और वीआर डेवलपर्स की तलाश कर रहे हैं।",
    careers_btn: "करियर अवसर देखें",

    // Products Section
    products_eyebrow: "उत्पाद इकोसिस्टम",
    products_title: "वास्तविक क्षेत्र में परीक्षित सॉफ्टवेयर सिस्टम",
    products_subtitle: "प्रत्येक सॉफ्टवेयर उत्पाद वास्तविक संस्थागत और उद्यम परिनियोजन में सिद्ध है।",
    products_view_all: "सभी 16 उत्पाद",
    products_explore_btn: "उत्पाद देखें",
    products_live_demo: "डेमो का अनुरोध करें",

    // Services Section
    services_eyebrow: "हम क्या करते हैं",
    services_title: "आपकी प्रगति के लिए निर्मित सेवाएं",
    services_subtitle: "कोडिंग की पहली लाइन से लेकर नैक-रेडी ईआरपी वर्कफ़्लो तक — एक दशक के अनुभव से परिपूर्ण।",
    services_view_all: "सभी 8 सेवाएं",

    // Why Virtoy
    why_eyebrow: "वर्टोय के फायदे",
    why_title: "शीर्ष संस्थान और उद्यम हमें क्यों चुनते हैं",
    why_card1_title: "आईआईटी पूर्व छात्रों द्वारा स्थापित",
    why_card1_desc: "आईआईटी के पूर्व छात्रों द्वारा स्थापित, गणितीय सटीकता और शून्य आर्किटेक्चरल ऋण के साथ निर्मित सिस्टम।",
    why_card2_title: "84+ सत्यापित उद्यम एवं संस्थागत परिनियोजन",
    why_card2_desc: "टाटा स्टील, वेदांत, जेएसपीएल और डालमिया सीमेंट जैसे औद्योगिक दिग्गजों के लिए सिद्ध ट्रैक रिकॉर्ड।",
    why_card3_title: "24/7 समर्पित सहायता एवं दो क्षेत्रीय केंद्र",
    why_card3_desc: "कोलकाता मुख्यालय और भुवनेश्वर ओ-हब से सीधे सॉफ्टवेयर इंजीनियरों तक पहुंच।",
    why_card4_title: "इमर्सिव एआर/वीआर नवाचार",
    why_card4_desc: "पूर्वी भारत में स्थानिक कंप्यूटिंग और वीआर सुरक्षा प्रशिक्षण सिमुलेटर में अग्रणी।",

    // Contact CTA
    cta_eyebrow: "संपर्क करें",
    cta_title: "क्या आपके पास कोई प्रोजेक्ट है? आइए इसे बनाएं।",
    cta_subtitle: "भारत और यूएई में हमारे कार्यालयों में आएं या इंजीनियरिंग टीम से सीधे जुड़ें।",
    cta_btn_contact: "बातचीत शुरू करें",
    cta_btn_call: "सीधा कॉल: +91 9861802325",

    // Footer
    footer_desc: "विर्टॉय टेक्नोलॉजीज प्राइवेट लिमिटेड एक प्रमुख आईटी कंपनी है जो पूर्वी भारत, यूएई और यूके में विश्व स्तरीय समाधान प्रदान करती है।",
    footer_quick_links: "त्वरित नेविगेशन",
    footer_products_col: "प्रमुख उत्पाद",
    footer_offices_col: "कार्यालय के पते",
    footer_kolkata_hq: "कोलकाता मुख्य कार्यालय",
    footer_kolkata_addr: "3rd Floor, Jharanalaya, 635 Baishnabghatta, Patuli, Kolkata, West Bengal - 700084",
    footer_bhubaneswar_dev: "भुवनेश्वर कार्यालय",
    footer_bhubaneswar_addr: "Tower-A, 4th Floor, Room 409, (O-HUB), SEZ Road, Chandaka Industrial Estate, Bhubaneswar, Odisha",
    footer_rights: "सर्वाधिकार सुरक्षित। विर्टॉय टेक्नोलॉजीज प्राइवेट लिमिटेड।",
    footer_privacy: "गोपनीयता नीति",

    // Inner Page Translations
    // Contact Page
    hero_contact_eyebrow: "संपर्क करें",
    hero_contact_title: "क्या आपके पास कोई विचार है? आइए मिलकर बनाएं।",
    hero_contact_desc: "हमारे कार्यालयों में आएं या किसी भी समय हमें ईमेल भेजें। हम अपने ग्राहकों के सभी सुझावों का स्वागत करते हैं।",
    contact_reach_direct: "हमसे सीधे संपर्क करें",
    contact_whatsapp_chat: "व्हाट्सएप पर चैट करें",
    form_name: "आपका नाम",
    form_name_ph: "पूरा नाम",
    form_email: "आपका ईमेल",
    form_email_ph: "you@company.com",
    form_phone: "फ़ोन नंबर",
    form_phone_ph: "+91",
    form_subject: "विषय",
    form_subject_ph: "हम कैसे मदद कर सकते हैं?",
    form_message: "आपका संदेश",
    form_message_ph: "अपने प्रोजेक्ट के बारे में बताएं",
    form_sending: "भेजा जा रहा है…",
    form_send: "संदेश भेजें",
    form_sent_title: "धन्यवाद — आपका संदेश भेज दिया गया है।",
    form_sent_desc: "हमारी टीम जल्द ही आपसे संपर्क करेगी।",
    form_send_another: "एक और संदेश भेजें",

    // About Page
    hero_about_eyebrow: "हमारे बारे में",
    hero_about_title: "इंजीनियरों द्वारा निर्मित एक प्रीमियम आईटी कंपनी, बढ़ते व्यवसायों के लिए",
    hero_about_desc: "पूर्वी भारत, यूएई और उससे आगे के व्यवसायों के लिए आधुनिक, मजबूत आईटी समाधान।",
    about_who_eyebrow: "हम कौन हैं",
    about_who_title: "प्रौद्योगिकी। अनुभव। नवाचार।",
    about_p1: "वर्टोय टेक्नोलॉजी अत्यधिक कुशल और समर्पित पेशेवरों की एक टीम है जो सर्वोत्तम आईटी समाधान देने के लिए तत्पर है — सभी अनुभव स्तरों पर तकनीकी संसाधनों का एक समूह।",
    about_p2: "हम वरिष्ठ तकनीकी विशेषज्ञों के नेतृत्व में डेवलपर्स की एक ऊर्जावान टीम हैं, जो सॉफ्टवेयर समाधान, वेब विकास और डिजिटल परिवर्तन प्रदान करते हैं।",
    about_cover_eyebrow: "हम क्या कवर करते हैं",
    about_cover_title: "एक पहली वेबसाइट से लेकर एंटरप्राइज-स्तरीय सिस्टम तक",
    about_cap1: "आकर्षक वेबसाइटों से लेकर पूर्ण विकसित वेब अनुप्रयोग, वेब पोर्टल और इंट्रानेट ऐप्स",
    about_cap2: "डिजिटल मार्केटिंग, एसईओ रणनीति और मोबाइल ऐप्स",
    about_cap3: "कस्टम सॉफ्टवेयर, ईआरपी वर्कफ़्लो और डेटाबेस समाधान",
    about_btn_services: "हमारी सेवाएं देखें",
    about_btn_team: "हमारी टीम से मिलें",

    // Services Page & Details
    hero_services_eyebrow: "इंजीनियरिंग सेवा वर्ग",
    hero_services_title: "स्केल के लिए निर्मित एंटरप्राइज क्षमताएं",
    hero_services_desc: "आईआईटी पूर्व छात्रों की इंजीनियरिंग टीमों द्वारा संचालित आठ विशेष सेवा लाइनें, पूर्वी भारत, यूएई और यूके में एक दशक के अनुभव के साथ।",
    services_whats_included: "सेवा में क्या शामिल है",
    services_get_quote: "कोटेशन प्राप्त करें",
    services_explore_other: "अन्य सेवाएं देखें",
    services_consultation: "परामर्श एवं रोडमैप",

    // Products Page & Details
    hero_products_eyebrow: "स्वामित्व सॉफ्टवेयर उत्पाद इकोसिस्टम",
    hero_products_title: "क्षेत्र-परीक्षित सॉफ्टवेयर सिस्टम और स्थानिक इंजन",
    hero_products_desc: "औद्योगिक सुरक्षा, एंटरप्राइज ईआरपी, अस्पताल स्वास्थ्य सेवा और इमर्सिव एआर/वीआर सिमुलेशन में 16 सॉफ्टवेयर सिस्टम — कस्टम परिनियोजन हेतु तैयार।",
    products_cat_all: "सभी उत्पाद",
    products_cat_safety: "औद्योगिक एवं सुरक्षा",
    products_cat_erp: "एंटरप्राइज एवं ईआरपी",
    products_cat_spatial: "एआर/वीआर एवं स्थानिक",
    products_cat_specialized: "स्वास्थ्य सेवा एवं पोर्टल्स",
    products_search_ph: "16 सॉफ्टवेयर सिस्टम खोजें...",
    products_showing: "दिखाए जा रहे हैं",
    products_of: "कुल",
    products_software_systems: "स्वामित्व सॉफ्टवेयर सिस्टम",
    products_reset_filters: "फ़िल्टर रीसेट करें",
    products_ip_engine: "आईपी इंजन",
    products_live_deployments: "सक्रिय परिनियोजन:",
    products_more: "अन्य",
    products_explore_specs: "आर्किटेक्चर विवरण देखें",
    products_key_features: "प्रमुख विशेषताएं",
    products_book_demo: "डेमो बुक करें",
    products_used_by: "द्वारा उपयोगित",
    products_more_ecosystem: "हमारे प्रोडक्ट इकोसिस्टम से और अधिक",

    // Portfolio Page
    hero_portfolio_eyebrow: "हमारा कार्य",
    hero_portfolio_title: "विश्वास पर आधारित पोर्टफोलियो",
    hero_portfolio_desc: "कॉलेजों, संघों, उद्योग और सरकारी कार्यक्रमों के लिए वितरित परियोजनाएं।",
    portfolio_featured_heading: "प्रमुख परियोजनाएं",
    portfolio_bottom_note_1: "ये वीटी इंडिया होमपेज पर प्रदर्शित परियोजनाएं हैं। इसके अतिरिक्त",
    portfolio_bottom_note_clients: "84 ग्राहक संगठन",
    portfolio_bottom_note_2: "— कॉलेज, अस्पताल, होटल, संघ और औद्योगिक समूह — अपने लोगो और वेबसाइटों के साथ सूचीबद्ध हैं।",

    // Clients Page
    hero_clients_eyebrow: "हम किनके साथ काम करते हैं",
    hero_clients_title: "हमारे क्लाइंट्स एवं साझेदार",
    hero_clients_desc: "ओडिशा, पश्चिम बंगाल और उससे आगे के कॉलेज, अस्पताल, होटल, संघ और औद्योगिक समूह।",
    clients_cat_all: "सभी",
    clients_cat_edu: "शैक्षणिक संस्थान",
    clients_cat_health: "स्वास्थ्य सेवा प्रदाता",
    clients_cat_hotel: "होटल एवं आतिथ्य",
    clients_cat_ind: "औद्योगिक एवं कॉर्पोरेट",
    clients_cat_gov: "सरकारी एवं संघ",
    clients_search_ph: "84+ ग्राहक संगठन खोजें...",
    clients_verified_partners: "प्रमाणित भागीदार संगठन",
    clients_reset: "फ़िल्टर एवं खोज रीसेट करें",
    clients_private_deployment: "निजी एंटरप्राइज इंट्रानेट परिनियोजन",
    clients_visit_portal: "पोर्टल देखें →",
    clients_no_match: "आपकी खोज से मेल खाने वाला कोई संगठन नहीं मिला",
    clients_no_match_sub: "कृपया अपनी खोज क्वेरी साफ़ करें या कोई अन्य श्रेणी चुनें।",

    // Team Page
    hero_team_eyebrow: "हम आपके लिए सदैव तत्पर हैं",
    hero_team_title: "हमारे विशेषज्ञ",
    hero_team_desc: "सर्वश्रेष्ठ परिणाम देने के लिए समर्पित उत्साही और अत्यधिक कुशल पेशेवरों की एक टीम।",
    team_leadership: "नेतृत्व",
    team_engineering: "इंजीनियरिंग एवं डिलीवरी",

    // Testimonials Page
    hero_testimonials_eyebrow: "क्लाइंट प्रतिक्रिया",
    hero_testimonials_title: "हमारे ग्राहक क्या कहते हैं",
    test_more_reviews: "अन्य ग्राहक समीक्षाएं",

    // Careers Page
    hero_careers_eyebrow: "हमारे साथ अपने करियर को आगे बढ़ाएं",
    hero_careers_title: "क्या आप हमारे साथ जुड़ना चाहते हैं?",
    hero_careers_desc: "यदि आप वास्तविक दुनिया की चुनौतियों को हल करने, एंटरप्राइज सिस्टम बनाने या आधुनिक डिजिटल अनुभव तैयार करने के शौकीन हैं, तो आपका स्वागत है।",
    careers_why_eyebrow: "वर्टोय क्यों",
    careers_why_title: "असाधारण ग्राहक अनुभव प्रदान करते हुए उच्च-प्रभाव वाले समाधान बनाएं",
    careers_b1_title: "चुनौतीपूर्ण परियोजनाएं",
    careers_b1_desc: "नवाचार और रणनीतिक समस्या समाधान की आवश्यकता वाली आकर्षक पहलें।",
    careers_b2_title: "लचीला कार्य समय",
    careers_b2_desc: "उत्पादकता और कार्य-जीवन संतुलन को बढ़ावा देने वाले लचीले कार्यक्रम।",
    careers_b3_title: "स्वास्थ्य बीमा",
    careers_b3_desc: "आपकी भलाई और मानसिक शांति सुनिश्चित करने वाला व्यापक स्वास्थ्य कवर।",
    careers_b4_title: "शहर के केंद्र के समीप",
    careers_b4_desc: "आवागमन की उत्तम सुविधा के साथ सुविधाजनक स्थान।",
    careers_b5_title: "पुरस्कार विजेता टीम",
    careers_b5_desc: "वास्तविक प्रभाव देने वाले मान्यता प्राप्त पेशेवरों के साथ काम करें।",
    careers_b6_title: "उत्कृष्ट कार्य संस्कृति",
    careers_b6_desc: "सहायक नेतृत्व और विकास के अवसरों के साथ एक सहयोगी संस्कृति।",
    careers_apply_eyebrow: "अभी आवेदन करें",
    careers_apply_title: "अपना विवरण हमें भेजें",
    careers_apply_desc: "हम प्रत्येक आवेदन की समीक्षा करते हैं। अपनी पृष्ठभूमि साझा करें और बायोडाटा संलग्न करें — यदि उपयुक्त होगा, तो हमारी टीम संपर्क करेगी।",
    form_city: "शहर",
    form_postcode: "पिन कोड",
    form_postcode_ph: "पिन कोड",
    form_address: "पता",
    form_address_ph: "सड़क का पता",
    form_resume: "आपका बायोडाटा (PDF या Word, अधिकतम 5MB)",
    form_about_you: "अपने बारे में बताएं",
    form_submitting: "जमा किया जा रहा है…",
    form_submit_app: "आवेदन जमा करें",
    form_app_received: "आवेदन प्राप्त हुआ।",
    form_app_received_desc: "वर्टोय से जुड़ने में आपकी रुचि के लिए धन्यवाद। हम जल्द ही संपर्क करेंगे।",
    form_submit_another: "एक और आवेदन जमा करें",

    // Privacy Page
    hero_privacy_eyebrow: "गोपनीयता",
    hero_privacy_title: "हमारी गोपनीयता नीति पढ़ें",
    privacy_p1: "वर्टोय टेक्नोलॉजीज प्राइवेट लिमिटेड ग्राहकों की सभी सूचनाओं, विशिष्टताओं, दस्तावेज़ीकरण और डेटासेट को उच्चतम स्तर की गोपनीयता और डेटा सुरक्षा के साथ संभालती है।",
    privacy_p2: "हम तीसरे पक्षों को निजी ग्राहक जानकारी नहीं बेचते, वितरित या पट्टे पर नहीं देते हैं। विकास परिवेशों और डेटाबेस तक पहुंच सख्त प्रमाणीकरण द्वारा सुरक्षित है।",
    privacy_p3: "एंटरप्राइज और सरकारी परिनियोजन के लिए, सिस्टम प्रावधान से पहले कस्टम गैर-प्रकटीकरण समझौते (NDA), SLA और डेटा संप्रभुता खंड निष्पादित किए जाते हैं।",
    privacy_pr1: "सख्त डेटा गोपनीयता",
    privacy_pr2: "शून्य तृतीय-पक्ष साझाकरण",
    privacy_pr3: "भूमिका-आधारित पहुंच नियंत्रण",
    privacy_pr4: "एन्क्रिप्टेड क्लाउड स्टोरेज",
    privacy_pr5: "एंटरप्राइज एनडीए सुरक्षा",
    privacy_pr6: "आईएसओ 9001 प्रक्रिया मानक",

    // 404 Page
    notfound_title: "यह पृष्ठ नहीं मिल सका",
    notfound_desc: "आप जिस पृष्ठ की तलाश कर रहे हैं वह स्थानांतरित हो सकता है। हमारी सेवाओं, उत्पादों को देखें या सीधे संपर्क करें।",
    notfound_btn_home: "होम पर वापस जाएं",
    notfound_btn_contact: "संपर्क करें",
  },

  or: {
    // Nav & Header
    nav_home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
    nav_company: "କମ୍ପାନୀ",
    nav_services: "ସେବା",
    nav_products: "ପ୍ରଡକ୍ଟ",
    nav_portfolio: "ପୋର୍ଟଫୋଲିଓ",
    nav_contact: "ଯୋଗାଯୋଗ",
    nav_get_in_touch: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
    nav_call_us: "କଲ୍ କରନ୍ତୁ",
    nav_quick_command: "ତ୍ୱରିତ ସନ୍ଧାନ",
    nav_search_placeholder: "ସନ୍ଧାନ ବା କମାଣ୍ଡ ଟାଇପ୍ କରନ୍ତୁ...",

    // Dropdowns
    nav_about_us: "ଆମ ବିଷୟରେ",
    nav_leadership: "ନେତୃତ୍ୱ ଓ ଟିମ୍",
    nav_clients: "ପ୍ରମାଣିତ ଗ୍ରାହକ",
    nav_testimonials: "ପ୍ରଶଂସାପତ୍ର",
    nav_careers: "କ୍ୟାରିୟର",

    // Hero Section
    hero_badge: "ପ୍ରିମିୟମ୍ ଏଣ୍ଟରପ୍ରାଇଜ୍ ଆଇଟି ସମାଧାନ",
    hero_badge_sub: "ପୂର୍ବ ଭାରତ ଓ ୟୁଏଇ",
    hero_slide1_eyebrow: "ଆମେ ଆପଣଙ୍କ ବ୍ୟବସାୟକୁ ନୂତନ ପରିଚୟ ଦେଉ",
    hero_slide1_title: "ଆଇଟିର ଅତ୍ୟାଧୁନିକ ଦୁନିଆରେ ପ୍ରବେଶ କରନ୍ତୁ",
    hero_slide1_subtitle: "ଓଡ଼ିଶା, ପୂର୍ବ ଭାରତ, ୟୁଏଇ ତଥା ସମଗ୍ର ବିଶ୍ୱର ବ୍ୟବସାୟ ପାଇଁ ଅଭିନବ ଏବଂ ଶକ୍ତିଶାଳୀ ଆଇଟି ସମାଧାନ।",
    hero_slide1_b1_title: "୮୪+ ପ୍ରମାଣିତ ଗ୍ରାହକ",
    hero_slide1_b1_sub: "ଟାଟା ସ୍ପଞ୍ଜ · ଆଦିତ୍ୟ ବିର୍ଲା · ନାଲକୋ",
    hero_slide1_b2_title: "ISO 9001 ଓ MSME",
    hero_slide1_b2_sub: "ପ୍ରମାଣିତ ଗୁଣବତ୍ତା ମାନଦଣ୍ଡ",
    hero_slide1_b3_title: "ଆଇଆଇଟି ପ୍ରତିଷ୍ଠାତା",
    hero_slide1_b3_sub: "ଇଞ୍ଜିନିୟରିଂ ଉତ୍କର୍ଷତା",
    hero_slide1_loc: "ଭର୍ଚ୍ଚୋଏ କୋଲକାତା ମୁଖ୍ୟ କାର୍ଯ୍ୟାଳୟ",

    hero_slide2_eyebrow: "ଉଚ୍ଚକ୍ଷମତା ସମ୍ପନ୍ନ ମୋବାଇଲ୍ ଆପ୍ ନିର୍ମାଣ",
    hero_slide2_title: "ଶକ୍ତିଶାଳୀ ମୋବାଇଲ୍ ଆପ୍‌ର ଭବିଷ୍ୟତକୁ ସ୍ୱାଗତ",
    hero_slide2_subtitle: "ଅତ୍ୟାଧୁନିକ ଆଣ୍ଡ୍ରଏଡ୍ ଏବଂ ଆଇଓଏସ୍ ଆପ୍ଲିକେସନ୍ ଯାହା ଉତ୍କୃଷ୍ଟ କାର୍ଯ୍ୟକ୍ଷମତା ଓ ସୁରକ୍ଷା ପ୍ରଦାନ କରେ।",
    hero_slide2_b1_title: "୪୦,୦୦୦+ ସକ୍ରିୟ ଉପଭୋକ୍ତା",
    hero_slide2_b1_sub: "କୃଷି ଓଡ଼ିଶା ପ୍ଲାଟଫର୍ମ",
    hero_slide2_b2_title: "ଫ୍ଲଟର ଓ ରିଆକ୍ଟ ନେଟିଭ୍",
    hero_slide2_b2_sub: "କ୍ରସ୍-ପ୍ଲାଟଫର୍ମ ବୈଷୟିକତା",
    hero_slide2_b3_title: "ଜିରୋ ଡାଉନଟାଇମ୍ ଆର୍କିଟେକ୍ଚର",
    hero_slide2_b3_sub: "କ୍ଲାଉଡ୍ ନେଟିଭ୍ ଇନଫ୍ରାଷ୍ଟ୍ରକଚର",
    hero_slide2_loc: "ମୋବାଇଲ୍ ସମାଧାନ ଇଞ୍ଜିନିୟରିଂ ହବ୍",

    hero_slide3_eyebrow: "ସ୍ପାସିଆଲ୍ କମ୍ପ୍ୟୁଟିଂ ଓ ମେଟାଭର୍ସ",
    hero_slide3_title: "ଭିଆର୍ ସହିତ ବାସ୍ତବତାକୁ ନୂଆ ରୂପ ଦିଅନ୍ତୁ",
    hero_slide3_subtitle: "ଅଭିନବ ଭିଆର୍ ସେଫ୍ଟି ସିମ୍ୟୁଲେଟର ଯାହା ବିପଜ୍ଜନକ ଶିଳ୍ପ କାର୍ଯ୍ୟକୁ ବିପଦମୁକ୍ତ ପ୍ରଶିକ୍ଷଣରେ ପରିଣତ କରେ।",
    hero_slide3_b1_title: "ସେଫ୍‌ଆକ୍ଟ ହାଜାର୍ଡ ସିମ୍ୟୁଲେଟର",
    hero_slide3_b1_sub: "ଭାରୀ ଶିଳ୍ପ ପାଇଁ ଉପଯୁକ୍ତ",
    hero_slide3_b2_title: "6-DoF ସଠିକତା",
    hero_slide3_b2_sub: "ଇଣ୍ଟରାକ୍ଟିଭ୍ ଫିଜିକ୍ସ ଇଞ୍ଜିନ୍",
    hero_slide3_b3_title: "ଓଡ଼ିଶା ସରକାରଙ୍କ ପାଭିଲିଅନ୍",
    hero_slide3_b3_sub: "କୃଷି ୨୦୨୫ ଭିଆର୍ ଏକ୍ସପୋ",
    hero_slide3_loc: "ଭର୍ଚ୍ଚୋଏ ଏଆର୍/ଭିଆର୍ ଇଣ୍ଟରାକ୍ଟିଭ୍ ଲ୍ୟାବ୍",

    hero_cta_services: "ସେବା ଦେଖନ୍ତୁ",
    hero_cta_voice_tour: "ଅଡିଓ ଟୁର୍",
    hero_cta_contact: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
    hero_trust_clients: "୮୪+ ପ୍ରମାଣିତ ଗ୍ରାହକ",
    hero_trust_products: "୧୬ଟି ଡିଜିଟାଲ୍ ପ୍ରଡକ୍ଟ",
    hero_trust_support: "୨୪/୭ ବିଶେଷଜ୍ଞ ସପୋର୍ଟ",

    // Client Marquee
    marquee_eyebrow: "ପ୍ରମୁଖ ଶିଳ୍ପମାନଙ୍କ ଦ୍ୱାରା ବିଶ୍ୱସ୍ତ",
    marquee_title: "ପୂର୍ବ ଭାରତ ଓ ୟୁଏଇରେ ୮୪ଟି ପ୍ରମାଣିତ ପ୍ରକଳ୍ପ",
    marquee_desc: "ଭାରୀ ଶିଳ୍ପ, ସରକାରୀ ବିଶ୍ୱବିଦ୍ୟାଳୟ, ଡାକ୍ତରଖାନା ଏବଂ କର୍ପୋରେଟ୍ ସଂସ୍ଥାମାନଙ୍କୁ ସଶକ୍ତ କରିବା।",
    marquee_btn: "ସମସ୍ତ ୮୪+ ଗ୍ରାହକ ଦେଖନ୍ତୁ",

    // About Section
    about_eyebrow: "ଆମ ପରିଚୟ",
    about_title: "ସଫଳତା ଓ ଉଦ୍ଭାବନ ପାଇଁ ଶକ୍ତିଶାଳୀ ଟିମ୍ ନିର୍ମାଣ",
    about_description: "ଆଇଆଇଟି ପୂର୍ବତନ ଛାତ୍ର ଏବଂ ଅଭିଜ୍ଞ ଇଞ୍ଜିନିୟରମାନଙ୍କ ଦ୍ୱାରା ପ୍ରତିଷ୍ଠିତ, ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ସଫ୍ଟୱେର୍, ମୋବାଇଲ୍, ଏଆର୍/ଭିଆର୍ ଏବଂ ଏଣ୍ଟରପ୍ରାଇଜ୍ ସମାଧାନ ପ୍ରଦାନ କରୁଛି।",
    about_vision_title: "ଆମର ଲକ୍ଷ୍ୟ (Vision)",
    about_vision_desc: "ଓଡ଼ିଶାରେ ଏକ ବିଶ୍ୱସ୍ତରୀୟ ଆଇଟି କେନ୍ଦ୍ର ଗଠନ କରି ମେଧା ପଳାୟନ ରୋକିବା ଏବଂ ତୃଣମୂଳ ସ୍ତରକୁ ଉନ୍ନତ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା ପହଞ୍ଚାଇବା।",
    about_mission_title: "ଆମର କାର୍ଯ୍ୟ (Mission)",
    about_mission_desc: "ଅତ୍ୟାଧୁନିକ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା ମାଧ୍ୟମରେ ସଂସ୍ଥା ଓ ବ୍ୟବସାୟଗୁଡ଼ିକୁ ଶକ୍ତିଶାଳୀ କରିବା।",
    about_support_title: "ଆମର ସପୋର୍ଟ",
    about_support_desc: "ପ୍ରମାଣିତ ବିଶେଷଜ୍ଞ ଟିମ୍ ୨୪/୭ ନିରନ୍ତର ସହାୟତା ଏବଂ କାର୍ଯ୍ୟଦକ୍ଷତା ସୁନିଶ୍ଚିତ କରନ୍ତି।",
    about_btn: "ଆମ ବିଷୟରେ ଅଧିକ ଜାଣନ୍ତୁ",

    // Interactive Experience Center
    exp_badge: "ଲାଇଭ୍ ଇଣ୍ଟରାକ୍ଟିଭ୍ ଟେକ୍ନୋଲୋଜି ଲ୍ୟାବ୍",
    exp_title: "ରିଅଲ୍ ଟାଇମ୍‌ରେ ଆମ ଇଞ୍ଜିନ୍‌ର ଅନୁଭୂତି ନିଅନ୍ତୁ",
    exp_desc: "ଆମର ଲାଇଭ୍ ସିମ୍ୟୁଲେସନ୍ ଇଞ୍ଜିନ୍, ଶିଳ୍ପ ଟେଲିମେଟ୍ରି ଡ୍ୟାସବୋର୍ଡ ଏବଂ କ୍ଲାଉଡ୍ ଆର୍କିଟେକ୍ଚର ପରୀକ୍ଷା କରନ୍ତୁ।",
    exp_tab_vr: "ଭିଆର୍ ଫିଜିକ୍ସ ସିମ୍ୟୁଲେଟର",
    exp_tab_safeact: "ସେଫ୍‌ଆକ୍ଟ ଲାଇଭ୍ ଟେଲିମେଟ୍ରି",
    exp_tab_cloud: "କ୍ଲାଉଡ୍ ଆର୍କିଟେକ୍ଚର ବେଞ୍ଚ",

    // Spatial Lab
    spatial_badge: "ସ୍ପାସିଆଲ୍ କମ୍ପ୍ୟୁଟିଂ ଓ ଏଆର୍/ଭିଆର୍ ଲ୍ୟାବ୍",
    spatial_title: "ପରବର୍ତ୍ତୀ ପିଢ଼ିର ଇମର୍ସିଭ୍ ସ୍ପାସିଆଲ୍ ସିମ୍ୟୁଲେସନ୍",
    spatial_desc: "ଶିଳ୍ପ ଓ ସରକାରୀ ପ୍ରକଳ୍ପ ପାଇଁ ପ୍ରସ୍ତୁତ ଉଚ୍ଚମାନର 3D ଡିଜିଟାଲ୍ ଟ୍ୱିନ୍ ଏବଂ ଭର୍ଚୁଆଲ୍ ଟ୍ରେନିଂ ପରିବେଶ।",
    spatial_btn_demo: "ଭର୍ଚୁଆଲ୍ ରିଆଲିଟି ଲ୍ୟାବ୍ ଆରମ୍ଭ କରନ୍ତୁ",

    // Comparison Matrix
    comp_badge: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ମାନଦଣ୍ଡ ତୁଳନା",
    comp_title: "ପାରମ୍ପରିକ ଆଇଟି କମ୍ପାନୀ ତୁଳନାରେ ଭର୍ଚ୍ଚୋଏ କାହିଁକି ଆଗରେ",
    comp_desc: "ଆମର ଆଇଆଇଟି ଇଞ୍ଜିନିୟରିଂ ମାନଦଣ୍ଡ, ୨୪/୭ ଅନ-ଗ୍ରାଉଣ୍ଡ ସପୋର୍ଟ ଏବଂ ସଫ୍ଟୱେର୍ ଆଇପିର ବିସ୍ତୃତ ତୁଳନା।",

    // Transformation Visualizer
    trans_badge: "ସାଂସ୍ଥାନିକ ଆଧୁନିକୀକରଣ",
    trans_title: "ମାନୁଆଲ୍ କାର୍ଯ୍ୟକୁ ସ୍ୱୟଂଚାଳିତ ଡିଜିଟାଲ୍ ସିଷ୍ଟମ୍‌ରେ ପରିଣତ କରନ୍ତୁ",
    trans_desc: "ଭର୍ଚ୍ଚୋଏ ସଫ୍ଟୱେର୍ ସିଷ୍ଟମ୍ ବ୍ୟବହାର କରିବାର ପୂର୍ବ ଓ ପରର ବାସ୍ତବ ପରିବର୍ତ୍ତନ ଦେଖନ୍ତୁ।",

    // Impact Stories
    impact_badge: "ପ୍ରମାଣିତ ବାସ୍ତବ ପ୍ରଭାବ",
    impact_title: "୮୪+ ଗ୍ରାହକଙ୍କ ପାଇଁ ସଫଳତାର ରେକର୍ଡ",
    impact_desc: "ଭାରୀ ଶିଳ୍ପ, କୃଷି ବିଭାଗ ଏବଂ ସ୍ୱୟଂଶାସିତ କଲେଜରେ ଆମର ସଫଳ କେସ୍ ଷ୍ଟଡି।",

    // ROI Calculator
    roi_badge: "ମୂଲ୍ୟ ଓ କାର୍ଯ୍ୟଦକ୍ଷତା ଗଣନା",
    roi_title: "ଭର୍ଚ୍ଚୋଏ ସିଷ୍ଟମ୍ ସହିତ ଆପଣଙ୍କ ROI ଗଣନା କରନ୍ତୁ",
    roi_desc: "ସମୟ ସଞ୍ଚୟ, ତ୍ରୁଟି ହ୍ରାସ ଏବଂ ଅପଟାଇମ୍ ବୃଦ୍ଧିର ଆନୁମାନିକ ହିସାବ କରନ୍ତୁ।",

    // Tech Stack Hub
    tech_badge: "ଆର୍କିଟେକ୍ଚର ଓ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା",
    tech_title: "ଅତ୍ୟାଧୁନିକ ଓ ସୁରକ୍ଷିତ ଟେକ୍ ଷ୍ଟାକ୍",
    tech_desc: "ନେକ୍ସଟ୍.ଜେଏସ୍, ଫ୍ଲଟର, ପାଇଟର୍ଚ୍, ୟୁନିଟି 3D ଏବଂ ପୋଷ୍ଟଗ୍ରେସ୍କ୍ୟୁଏଲ୍ ଉପରେ ଆଧାରିତ।",

    // Project Configurator
    config_badge: "ପ୍ରକଳ୍ପ ଆକଳନ",
    config_title: "ଆପଣଙ୍କ ଏଣ୍ଟରପ୍ରାଇଜ୍ ସଫ୍ଟୱେର୍ କନଫିଗର୍ କରନ୍ତୁ",
    config_desc: "ଆପଣଙ୍କ ଆବଶ୍ୟକତା ଚୟନ କରି ତୁରନ୍ତ ବୈଷୟିକ ଆକଳନ ପ୍ରାପ୍ତ କରନ୍ତୁ।",

    // Live Telemetry
    telemetry_badge: "ସିଷ୍ଟମ୍ ହେଲ୍‌ଥ ଓ SLA ସ୍ଥିତି",
    telemetry_title: "ଲାଇଭ୍ ଅପରେସନ୍ସ ଓ ଟେଲିମେଟ୍ରି",
    telemetry_desc: "ଆମ କ୍ଲାଉଡ୍ ନୋଡ୍, ଇଆରପି ଏବଂ ସପୋର୍ଟ ଡେସ୍କର ପ୍ରତ୍ୟକ୍ଷ ମନିଟରିଂ।",

    // Global Footprint
    footprint_badge: "ଦୁଇଟି ଇନୋଭେସନ୍ ହବ୍",
    footprint_title: "ପୂର୍ବ ଭାରତକୁ ବିଶ୍ୱ ବଜାର ସହ ସଂଯୋଗ",
    footprint_desc: "କୋଲକାତା ମୁଖ୍ୟ କାର୍ଯ୍ୟାଳୟ ଏବଂ ଭୁବନେଶ୍ୱର ଓ-ହବ୍ ରୁ ଭାରତ ତଥା ୟୁଏଇକୁ ସେବା।",

    // Portfolio
    portfolio_badge: "ପ୍ରମାଣିତ ସାଂସ୍ଥାନିକ ପୋର୍ଟଫୋଲିଓ",
    portfolio_title: "କାର୍ଯ୍ୟକ୍ଷମ ସଫ୍ଟୱେର୍ ଓ କେସ୍ ଷ୍ଟଡିଜ୍",
    portfolio_desc: "ଓଡ଼ିଶାର କଲେଜ, ବିଶ୍ୱବିଦ୍ୟାଳୟ ଏବଂ ଶିଳ୍ପସଂସ୍ଥାମାନଙ୍କରେ ସଫଳତାର ସହ ଚାଲୁଥିବା ସଫ୍ଟୱେର୍।",

    // Testimonials
    test_badge: "ଗ୍ରାହକ ପ୍ରତିକ୍ରିୟା",
    test_title: "ସାଂସ୍ଥାନିକ ମୁଖ୍ୟମାନେ ଭର୍ଚ୍ଚୋଏ ବିଷୟରେ କ'ଣ କହନ୍ତି",
    test_desc: "ଅଧ୍ୟକ୍ଷ, ପ୍ରିନ୍ସିପାଲ୍ ଏବଂ ଶିଳ୍ପ ନିରାପତ୍ତା ମ୍ୟାନେଜରମାନଙ୍କ ପ୍ରକୃତ ମତାମତ।",

    // Enterprise FAQ
    faq_badge: "ବାରମ୍ବାର ପଚରାଯାଉଥିବା ପ୍ରଶ୍ନ",
    faq_title: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ପ୍ରଶ୍ନ ଓ ଉତ୍ତର",
    faq_desc: "ଆମର ଇଞ୍ଜିନିୟରିଂ ମାନଦଣ୍ଡ, ଡେଲିଭରି ସମୟ ଏବଂ ୨୪/୭ ସପୋର୍ଟ ସମ୍ବନ୍ଧୀୟ ସ୍ପଷ୍ଟ ଉତ୍ତର।",

    // Accreditations
    accred_badge: "ପ୍ରମାଣିତ ଗୁଣବତ୍ତା",
    accred_title: "ଶିଳ୍ପ ସ୍ୱୀକୃତି ଓ ମାନଦଣ୍ଡ",
    accred_desc: "ISO 9001 ପ୍ରମାଣିତ, MSME ପଞ୍ଜୀକୃତ ଏବଂ ନାକ୍ ଡିଜିଟାଇଜେସନ୍ ମାନଦଣ୍ଡ ଅନୁଯାୟୀ।",

    // Team Preview
    team_badge: "ନେତୃତ୍ୱ ଓ ଇଞ୍ଜିନିୟରିଂ",
    team_title: "ଆଇଆଇଟି ପ୍ରତିଭା ଏବଂ ବରିଷ୍ଠ ଇଞ୍ଜିନିୟରଙ୍କ ନେତୃତ୍ୱ",
    team_desc: "ଆମର ନେତୃତ୍ୱ ଶୀର୍ଷ ଗବେଷଣା ପ୍ରତିଷ୍ଠାନ ଏବଂ ସଫ୍ଟୱେର୍ କମ୍ପାନୀର ଅଭିଜ୍ଞତା ବହନ କରନ୍ତି।",
    team_btn: "ସମ୍ପୂର୍ଣ୍ଣ ଟିମ୍ ସହ ମିଶନ୍ତୁ",

    // Careers Teaser
    careers_badge: "ଆମ ଟିମ୍‌ରେ ଯୋଗ ଦିଅନ୍ତୁ",
    careers_title: "ପୂର୍ବ ଭାରତରୁ ଅତ୍ୟାଧୁନିକ ଟେକ୍ନୋଲୋଜି ନିର୍ମାଣ କରନ୍ତୁ",
    careers_desc: "ଆମେ କୋଲକାତା ଏବଂ ଭୁବନେଶ୍ୱରରେ ପ୍ରତିଭାବାନ ସଫ୍ଟୱେର୍, ମୋବାଇଲ୍ ଓ ଭିଆର୍ ଡେଭଲପର୍ ଖୋଜୁଛୁ।",
    careers_btn: "ନିଯୁକ୍ତି ସୁଯୋଗ ଦେଖନ୍ତୁ",

    // Products Section
    products_eyebrow: "ଆମର ପ୍ରଡକ୍ଟ ସମୂହ",
    products_title: "ବାସ୍ତବ କ୍ଷେତ୍ରରେ ପରୀକ୍ଷିତ ଡିଜିଟାଲ୍ ସଫ୍ଟୱେର୍",
    products_subtitle: "ପ୍ରତ୍ୟେକ ପ୍ରଡକ୍ଟ ବାସ୍ତବ ଶିକ୍ଷାନୁଷ୍ଠାନ ଓ ଶିଳ୍ପ ସଂସ୍ଥାରେ ସଫଳତାର ସହ କାର୍ଯ୍ୟରତ।",
    products_view_all: "ସମସ୍ତ ୧୬ଟି ପ୍ରଡକ୍ଟ",
    products_explore_btn: "ପ୍ରଡକ୍ଟ ଦେଖନ୍ତୁ",
    products_live_demo: "ଡେମୋ ଅନୁରୋଧ କରନ୍ତୁ",

    // Services Section
    services_eyebrow: "ଆମେ କ'ଣ କରୁ",
    services_title: "ଆପଣଙ୍କ ଅଭିବୃଦ୍ଧି ପାଇଁ ଉଦ୍ଦିଷ୍ଟ ସେବା",
    services_subtitle: "କୋଡିଂର ପ୍ରଥମ ଧାଡ଼ିରୁ ନାକ୍-ରେଡି ଇଆରପି ପର୍ଯ୍ୟନ୍ତ—ଏକ ଦଶନ୍ଧିର ଅଭିଜ୍ଞତାରେ ପରିପୂର୍ଣ୍ଣ।",
    services_view_all: "ସମସ୍ତ ୮ଟି ସେବା",

    // Why Virtoy
    why_eyebrow: "କାହିଁକି ଭର୍ଚ୍ଚୋଏ",
    why_title: "ପ୍ରମୁଖ ସଂସ୍ଥାମାନେ ଭର୍ଚ୍ଚୋଏ ଉପରେ କାହିଁକି ଭରସା କରନ୍ତି",
    why_card1_title: "ଆଇଆଇଟି ପ୍ରତିଷ୍ଠାତା ଓ ବରିଷ୍ଠ ଇଞ୍ଜିନିୟର",
    why_card1_desc: "ଭାରତର ପ୍ରମୁଖ ଆଇଆଇଟି ପ୍ରତିଷ୍ଠାନର ପୂର୍ବତନ ଛାତ୍ରଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ଶକ୍ତିଶାଳୀ ସଫ୍ଟୱେର୍ ଆର୍କିଟେକ୍ଚର।",
    why_card2_title: "୮୪+ ପ୍ରମାଣିତ ଗ୍ରାହକ ପ୍ରକଳ୍ପ",
    why_card2_desc: "ପ୍ରମୁଖ ସ୍ୱୟଂଶାସିତ କଲେଜ, ଭାରୀ ଶିଳ୍ପ ଏବଂ ସରକାରୀ ପ୍ରକଳ୍ପରେ ସଫଳତାର ପ୍ରମାଣିତ ଇତିହାସ।",
    why_card3_title: "୨୪/୭ ଉତ୍ସର୍ଗୀକୃତ ସପୋର୍ଟ ଓ ଦୁଇଟି କେନ୍ଦ୍ର",
    why_card3_desc: "କୋଲକାତା ମୁଖ୍ୟ କାର୍ଯ୍ୟାଳୟ ଏବଂ ଭୁବନେଶ୍ୱର ଓ-ହବ୍ ରୁ ସିଧାସଳଖ ଇଞ୍ଜିନିୟରିଂ ସହାୟତା।",
    why_card4_title: "ଅତ୍ୟାଧୁନିକ ଏଆର୍/ଭିଆର୍ ଉଦ୍ଭାବନ",
    why_card4_desc: "ପୂର୍ବ ଭାରତରେ ସ୍ପାସିଆଲ୍ କମ୍ପ୍ୟୁଟିଂ ଏବଂ ଭିଆର୍ ନିରାପତ୍ତା ପ୍ରଶିକ୍ଷଣରେ ଅଗ୍ରଣୀ।",

    // Contact CTA
    cta_eyebrow: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
    cta_title: "ନୂତନ ପ୍ରକଳ୍ପ ପାଇଁ ପ୍ରସ୍ତୁତ ତ? ଆସନ୍ତୁ ନିର୍ମାଣ କରିବା।",
    cta_subtitle: "ଭାରତ ବା ୟୁଏଇରେ ଆମ କାର୍ଯ୍ୟାଳୟ ପରିଦର୍ଶନ କରନ୍ତୁ ବା ଇଞ୍ଜିନିୟରିଂ ଟିମ୍ ସହ କଥା ହୁଅନ୍ତୁ।",
    cta_btn_contact: "ଆଲୋଚନା ଆରମ୍ଭ କରନ୍ତୁ",
    cta_btn_call: "ସିଧାସଳଖ କଲ୍: +91 9861802325",

    // Footer
    footer_desc: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ପ୍ରାଇଭେଟ୍ ଲିମିଟେଡ୍ ଏକ ଅଗ୍ରଣୀ ଆଇଟି କମ୍ପାନୀ ଯାହା ପୂର୍ବ ଭାରତ, ୟୁଏଇ ଏବଂ ୟୁକେରେ ବିଶ୍ୱସ୍ତରୀୟ ସମାଧାନ ପ୍ରଦାନ କରେ।",
    footer_quick_links: "ଦ୍ରୁତ ନେଭିଗେସନ୍",
    footer_products_col: "ପ୍ରମୁଖ ପ୍ରଡକ୍ଟ",
    footer_offices_col: "କାର୍ଯ୍ୟାଳୟ ଠିକଣା",
    footer_kolkata_hq: "କୋଲକାତା ମୁଖ୍ୟ କାର୍ଯ୍ୟାଳୟ",
    footer_kolkata_addr: "3rd Floor, Jharanalaya, 635 Baishnabghatta, Patuli, Kolkata, West Bengal - 700084",
    footer_bhubaneswar_dev: "ଭୁବନେଶ୍ୱର କାର୍ଯ୍ୟାଳୟ",
    footer_bhubaneswar_addr: "Tower-A, 4th Floor, Room 409, (O-HUB), SEZ Road, Chandaka Industrial Estate, Bhubaneswar, Odisha",
    footer_rights: "ସର୍ବସତ୍ତ୍ୱ ସଂରକ୍ଷିତ। ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ପ୍ରାଇଭେଟ୍ ଲିମିଟେଡ୍।",
    footer_privacy: "ଗୋପନୀୟତା ନୀତି",

    // Inner Page Translations
    // Contact Page
    hero_contact_eyebrow: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
    hero_contact_title: "ଆପଣଙ୍କ ପାଖରେ କିଛି ନୂତନ ଧାରଣା ଅଛି କି? ଆସନ୍ତୁ ଏକାଠି ନିର୍ମାଣ କରିବା।",
    hero_contact_desc: "ଆମ କାର୍ଯ୍ୟାଳୟ ପରିଦର୍ଶନ କରନ୍ତୁ କିମ୍ବା ଯେକୌଣସି ସମୟରେ ଆମକୁ ଇମେଲ୍ କରନ୍ତୁ। ଆମେ ସର୍ବଦା ଆପଣଙ୍କ ପରାମର୍ଶକୁ ସ୍ୱାଗତ କରୁ।",
    contact_reach_direct: "ଆମ ସହ ସିଧାସଳଖ ଯୋଗାଯୋଗ କରନ୍ତୁ",
    contact_whatsapp_chat: "ହ୍ୱାଟ୍ସଆପ୍‌ରେ କଥା ହୁଅନ୍ତୁ",
    form_name: "ଆପଣଙ୍କ ନାମ",
    form_name_ph: "ସମ୍ପୂର୍ଣ୍ଣ ନାମ",
    form_email: "ଆପଣଙ୍କ ଇମେଲ୍",
    form_email_ph: "you@company.com",
    form_phone: "ଫୋନ୍ ନମ୍ବର",
    form_phone_ph: "+91",
    form_subject: "ବିଷୟ",
    form_subject_ph: "ଆମେ କିପରି ସାହାଯ୍ୟ କରିପାରିବା?",
    form_message: "ଆପଣଙ୍କ ବାର୍ତ୍ତା",
    form_message_ph: "ଆପଣଙ୍କ ପ୍ରକଳ୍ପ ବିଷୟରେ ଜଣାନ୍ତୁ",
    form_sending: "ପଠାଯାଉଛି…",
    form_send: "ବାର୍ତ୍ତା ପଠାନ୍ତୁ",
    form_sent_title: "ଧନ୍ୟବାଦ — ଆପଣଙ୍କ ବାର୍ତ୍ତା ପଠାଯାଇଛି।",
    form_sent_desc: "ଆମ ଟିମ୍ ଖୁବ୍ ଶୀଘ୍ର ଆପଣଙ୍କ ସହ ଯୋଗାଯୋଗ କରିବେ।",
    form_send_another: "ଆଉ ଏକ ବାର୍ତ୍ତା ପଠାନ୍ତୁ",

    // About Page
    hero_about_eyebrow: "ଆମ ବିଷୟରେ",
    hero_about_title: "ଇଞ୍ଜିନିୟରମାନଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ଏକ ପ୍ରିମିୟମ୍ ଆଇଟି କମ୍ପାନୀ, ଅଭିବୃଦ୍ଧିଶୀଳ ବ୍ୟବସାୟ ପାଇଁ",
    hero_about_desc: "ପୂର୍ବ ଭାରତ, ୟୁଏଇ ଏବଂ ବିଶ୍ୱବ୍ୟାପୀ ବ୍ୟବସାୟ ପାଇଁ ଅତ୍ୟାଧୁନିକ, ଶକ୍ତିଶାଳୀ ଆଇଟି ସମାଧାନ।",
    about_who_eyebrow: "ଆମେ କିଏ",
    about_who_title: "ପ୍ରଯୁକ୍ତିବିଦ୍ୟା। ଅଭିଜ୍ଞତା। ନବସୃଜନ।",
    about_p1: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜି ହେଉଛି ଉତ୍ସର୍ଗୀକୃତ ଏବଂ ଉଚ୍ଚ କୁଶଳୀ ବୃତ୍ତିଗତମାନଙ୍କ ଏକ ଦଳ, ଯିଏ ସର୍ବୋତ୍ତମ ସେବା ପ୍ରଦାନ କରନ୍ତି — ସମସ୍ତ ଅନୁଭୂତି ସ୍ତରର ବୈଷୟିକ ସମ୍ବଳର ଏକ ସମୂହ।",
    about_p2: "ଆମେ ବରିଷ୍ଠ ଇଞ୍ଜିନିୟରଙ୍କ ନେତୃତ୍ୱରେ ସଫ୍ଟୱେର୍, ୱେବ୍ ବିକାଶ ଏବଂ ଡିଜିଟାଲ୍ ରୂପାନ୍ତରଣ ପ୍ରଦାନ କରୁଥିବା ଏକ ଉତ୍ସାହୀ ଟିମ୍।",
    about_cover_eyebrow: "ଆମର ସାମର୍ଥ୍ୟ",
    about_cover_title: "ଏକ ପ୍ରଥମ ୱେବସାଇଟ୍‌ରୁ ବୃହତ ଏଣ୍ଟରପ୍ରାଇଜ୍ ସିଷ୍ଟମ୍ ପର୍ଯ୍ୟନ୍ତ",
    about_cap1: "ସାଧାରଣ ୱେବସାଇଟ୍‌ରୁ ଆରମ୍ଭ କରି ସମ୍ପୂର୍ଣ୍ଣ ୱେବ୍ ଆପ୍ଲିକେସନ୍, ପୋର୍ଟାଲ୍ ଓ ଇଣ୍ଟ୍ରାନେଟ୍ ଆପ୍",
    about_cap2: "ଡିଜିଟାଲ୍ ମାର୍କେଟିଂ, SEO ରଣନୀତି ଏବଂ ମୋବାଇଲ୍ ଆପ୍",
    about_cap3: "କଷ୍ଟମ୍ ସଫ୍ଟୱେର୍, ERP ୱାର୍କଫ୍ଲୋ ଏବଂ ଡାଟାବେସ୍ ସମାଧାନ",
    about_btn_services: "ଆମର ସେବାଗୁଡ଼ିକ ଦେଖନ୍ତୁ",
    about_btn_team: "ଆମ ଟିମ୍ ସହ ମିଶନ୍ତୁ",

    // Services Page & Details
    hero_services_eyebrow: "ଇଞ୍ଜିନିୟରିଂ ସେବା ବର୍ଗ",
    hero_services_title: "ବୃହତ ସାଂସ୍ଥାନିକ ଅଭିବୃଦ୍ଧି ପାଇଁ ଉଦ୍ଦିଷ୍ଟ ସେବା",
    hero_services_desc: "ଆଇଆଇଟି ପୂର୍ବତନ ଛାତ୍ରଙ୍କ ନେତୃତ୍ୱରେ ୮ଟି ବିଶେଷଜ୍ଞ ସେବା, ପୂର୍ବ ଭାରତ, ୟୁଏଇ ଏବଂ ୟୁକେରେ ଏକ ଦଶନ୍ଧିର ଅଭିଜ୍ଞତାରେ ପରିପୂର୍ଣ୍ଣ।",
    services_whats_included: "ସେବାରେ କ'ଣ ଅନ୍ତର୍ଭୁକ୍ତ",
    services_get_quote: "ପ୍ରୋଜେକ୍ଟ କୋଟେସନ୍ ପାଆନ୍ତୁ",
    services_explore_other: "ଅନ୍ୟାନ୍ୟ ସେବା ଦେଖନ୍ତୁ",
    services_consultation: "ପରାମର୍ଶ ଓ ରୋଡମ୍ୟାପ୍",

    // Products Page & Details
    hero_products_eyebrow: "ନିଜସ୍ୱ ସଫ୍ଟୱେର୍ ପ୍ରଡକ୍ଟ ଇକୋସିଷ୍ଟମ୍",
    hero_products_title: "କ୍ଷେତ୍ର-ପରୀକ୍ଷିତ ସଫ୍ଟୱେର୍ ସିଷ୍ଟମ୍ ଓ ସ୍ପାସିଆଲ୍ ଇଞ୍ଜିନ୍",
    hero_products_desc: "ଶିଳ୍ପ ନିରାପତ୍ତା, କଲେଜ ଇଆରପି, ହସ୍ପିଟାଲ୍ ଓ VR ସିମୁଲେସନ୍‌ରେ ୧୬ଟି ପ୍ରଡକ୍ଟ — କଷ୍ଟମ୍ ଡେପ୍ଲୋଏମେଣ୍ଟ ପାଇଁ ପ୍ରସ୍ତୁତ।",
    products_cat_all: "ସମସ୍ତ ପ୍ରଡକ୍ଟ",
    products_cat_safety: "ଶିଳ୍ପ ଓ ନିରାପତ୍ତା",
    products_cat_erp: "ଏଣ୍ଟରପ୍ରାଇଜ୍ ଓ ERP",
    products_cat_spatial: "AR/VR ଓ ସ୍ପାସିଆଲ୍",
    products_cat_specialized: "ହସ୍ପିଟାଲ୍ ଓ ପୋର୍ଟାଲ୍ସ",
    products_search_ph: "୧୬ଟି ସିଷ୍ଟମ୍ ଖୋଜନ୍ତୁ...",
    products_showing: "ଦର୍ଶାଯାଉଛି",
    products_of: "ମୋଟ",
    products_software_systems: "ନିଜସ୍ୱ ସଫ୍ଟୱେର୍ ସିଷ୍ଟମ୍",
    products_reset_filters: "ଫିଲ୍ଟର୍ ରିସେଟ୍ କରନ୍ତୁ",
    products_ip_engine: "IP ଇଞ୍ଜିନ୍",
    products_live_deployments: "କାର୍ଯ୍ୟକ୍ଷମ ସ୍ଥାନ:",
    products_more: "ଅଧିକ",
    products_explore_specs: "ଆର୍କିଟେକ୍ଚର ବିବରଣୀ ଦେଖନ୍ତୁ",
    products_key_features: "ମୁଖ୍ୟ ବୈଶିଷ୍ଟ୍ୟ",
    products_book_demo: "ଡେମୋ ବୁକ୍ କରନ୍ତୁ",
    products_used_by: "ବ୍ୟବହାରକାରୀ ସଂସ୍ଥା",
    products_more_ecosystem: "ଆମ ପ୍ରଡକ୍ଟ ଇକୋସିଷ୍ଟମ୍‌ରୁ ଅନ୍ୟାନ୍ୟ",

    // Portfolio Page
    hero_portfolio_eyebrow: "ଆମର କାର୍ଯ୍ୟ",
    hero_portfolio_title: "ବିଶ୍ୱାସ ଉପରେ ଆଧାରିତ ପୋର୍ଟଫୋଲିଓ",
    hero_portfolio_desc: "କଲେଜ, ଶିଳ୍ପ ସଂସ୍ଥା, ଆସୋସିଏସନ୍ ଓ ସରକାରୀ ପ୍ରକଳ୍ପ ପାଇଁ ବିକଶିତ ସଫ୍ଟୱେର୍।",
    portfolio_featured_heading: "ପ୍ରମୁଖ ପ୍ରକଳ୍ପ",
    portfolio_bottom_note_1: "ଏଗୁଡ଼ିକ ଭର୍ଚ୍ଚୋଏ ଇଣ୍ଡିଆର ପ୍ରମୁଖ ପ୍ରକଳ୍ପ। ଏହା ବ୍ୟତୀତ ଅନ୍ୟ",
    portfolio_bottom_note_clients: "୮୪ଟି ଗ୍ରାହକ ସଂସ୍ଥା",
    portfolio_bottom_note_2: "— କଲେଜ, ହସ୍ପିଟାଲ୍, ହୋଟେଲ୍, ଆସୋସିଏସନ୍ ଓ ଶିଳ୍ପସଂସ୍ଥା — ତାଲିକାଭୁକ୍ତ ହୋଇଛନ୍ତି।",

    // Clients Page
    hero_clients_eyebrow: "ଆମର ସହଯୋଗୀ ସଂସ୍ଥା",
    hero_clients_title: "ଆମର ଗ୍ରାହକ ଓ ସହଯୋଗୀ",
    hero_clients_desc: "ଓଡ଼ିଶା, ପଶ୍ଚିମବଙ୍ଗ ତଥା ବିଶ୍ୱବ୍ୟାପୀ କଲେଜ, ହସ୍ପିଟାଲ୍, ହୋଟେଲ୍ ଓ ଶିଳ୍ପ ସମୂହ।",
    clients_cat_all: "ସମସ୍ତ",
    clients_cat_edu: "ଶିକ୍ଷାନୁଷ୍ଠାନ",
    clients_cat_health: "ସ୍ୱାସ୍ଥ୍ୟସେବା",
    clients_cat_hotel: "ହୋଟେଲ୍ ଓ ହସ୍ପିଟାଲିଟି",
    clients_cat_ind: "ଶିଳ୍ପ ଓ କର୍ପୋରେଟ୍",
    clients_cat_gov: "ସରକାରୀ ଓ ଆସୋସିଏସନ୍",
    clients_search_ph: "୮୪+ ଗ୍ରାହକ ସଂସ୍ଥା ଖୋଜନ୍ତୁ...",
    clients_verified_partners: "ପ୍ରମାଣିତ ସହଯୋଗୀ ସଂସ୍ଥା",
    clients_reset: "ଫିଲ୍ଟର୍ ଓ ସର୍ଚ୍ଚ ରିସେଟ୍ କରନ୍ତୁ",
    clients_private_deployment: "ସୁରକ୍ଷିତ ଇଣ୍ଟ୍ରାନେଟ୍ ପ୍ରକଳ୍ପ",
    clients_visit_portal: "ପୋର୍ଟାଲ୍ ଦେଖନ୍ତୁ →",
    clients_no_match: "କୌଣସି ସଂସ୍ଥା ମିଳିଲା ନାହିଁ",
    clients_no_match_sub: "ଦୟାକରି ସର୍ଚ୍ଚ ବଦଳାନ୍ତୁ ବା ଅନ୍ୟ କାଟାଗୋରୀ ଚୟନ କରନ୍ତୁ।",

    // Team Page
    hero_team_eyebrow: "ଆମେ ଆପଣଙ୍କ ସେବାରେ ସର୍ବଦା ଉପସ୍ଥିତ",
    hero_team_title: "ଆମର ବୃତ୍ତିଗତ ବିଶେଷଜ୍ଞ",
    hero_team_desc: "ସର୍ବୋତ୍ତମ ସେବା ପ୍ରଦାନ କରିବାକୁ ସର୍ବଦା ପ୍ରତିଶ୍ରୁତିବଦ୍ଧ ଏକ ଉତ୍ସର୍ଗୀକୃତ ଦଳ।",
    team_leadership: "ନେତୃତ୍ୱ",
    team_engineering: "ଇଞ୍ଜିନିୟରିଂ ଓ ଡେଲିଭରି",

    // Testimonials Page
    hero_testimonials_eyebrow: "ଗ୍ରାହକ ମତାମତ",
    hero_testimonials_title: "ଆମର ଗ୍ରାହକମାନେ କ'ଣ କହନ୍ତି",
    test_more_reviews: "ଅନ୍ୟାନ୍ୟ ଗ୍ରାହକ ମତାମତ",

    // Careers Page
    hero_careers_eyebrow: "ଆମ ସହିତ ଆପଣଙ୍କ କ୍ୟାରିୟର୍ ଗଢ଼ନ୍ତୁ",
    hero_careers_title: "ଆପଣ ଆମ ସହିତ ଯୋଗଦାନ କରିବାକୁ ଚାହାନ୍ତି କି?",
    hero_careers_desc: "ଯଦି ଆପଣ ବାସ୍ତବ ଆହ୍ୱାନର ସମାଧାନ ଏବଂ ଅତ୍ୟାଧୁନିକ ଡିଜିଟାଲ୍ ଉଦ୍ଭାବନ ପାଇଁ ଉତ୍ସାହୀ, ତେବେ ଆମ ଟିମ୍‌ରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।",
    careers_why_eyebrow: "କାହିଁକି ଭର୍ଚ୍ଚୋଏ",
    careers_why_title: "ଉତ୍କୃଷ୍ଟ ଗ୍ରାହକ ସେବା ସହ ଶକ୍ତିଶାଳୀ ଟେକ୍ନୋଲୋଜି ନିର୍ମାଣ କରନ୍ତୁ",
    careers_b1_title: "ଆହ୍ୱାନପୂର୍ଣ୍ଣ ପ୍ରକଳ୍ପ",
    careers_b1_desc: "ଉଦ୍ଭାବନ ଓ ସମସ୍ୟା ସମାଧାନ ଆବଶ୍ୟକ କରୁଥିବା ନୂତନ ପ୍ରକଳ୍ପ।",
    careers_b2_title: "ସୁବିଧାଜନକ କାର୍ଯ୍ୟ ସମୟ",
    careers_b2_desc: "ଉତ୍ପାଦକତା ବୃଦ୍ଧି ପାଇଁ ଫ୍ଲେକ୍ସିବଲ୍ ସମୟସୀମା।",
    careers_b3_title: "ସ୍ୱାସ୍ଥ୍ୟ ବୀମା",
    careers_b3_desc: "ଆପଣଙ୍କ ସୁରକ୍ଷା ଓ ଶାନ୍ତି ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ ସ୍ୱାସ୍ଥ୍ୟ ବୀମା।",
    careers_b4_title: "ସହରର କେନ୍ଦ୍ରସ୍ଥଳରେ କାର୍ଯ୍ୟାଳୟ",
    careers_b4_desc: "ସହଜ ଯାତାୟାତ ସୁବିଧା ବିଶିଷ୍ଟ ଉତ୍ତମ ସ୍ଥାନ।",
    careers_b5_title: "ପୁରସ୍କାରପ୍ରାପ୍ତ ଟିମ୍",
    careers_b5_desc: "ପ୍ରତିଭାବାନ ବରିଷ୍ଠ ଇଞ୍ଜିନିୟରଙ୍କ ସହ କାର୍ଯ୍ୟ କରିବାର ସୁଯୋଗ।",
    careers_b6_title: "ଉତ୍ତମ କାର୍ଯ୍ୟ ପରିବେଶ",
    careers_b6_desc: "ସହଯୋଗୀ ନେତୃତ୍ୱ ଏବଂ ଆଗକୁ ବଢ଼ିବାର ଉତ୍ତମ ସୁଯୋଗ।",
    careers_apply_eyebrow: "ଏବେ ଆବେଦନ କରନ୍ତୁ",
    careers_apply_title: "ଆପଣଙ୍କ ବିବରଣୀ ପଠାନ୍ତୁ",
    careers_apply_desc: "ଆମେ ପ୍ରତ୍ୟେକ ଆବେଦନକୁ ଗୁରୁତ୍ୱ ଦେଉ। ଆପଣଙ୍କ ରିଜ୍ୟୁମ୍ ପଠାନ୍ତୁ — ଆମ ଟିମ୍ ଆପଣଙ୍କ ସହ ଯୋଗାଯୋଗ କରିବେ।",
    form_city: "ସହର",
    form_postcode: "ପିନ୍ କୋଡ୍",
    form_postcode_ph: "ପିନ୍ କୋଡ୍",
    form_address: "ଠିକଣା",
    form_address_ph: "ରାସ୍ତା ଠିକଣା",
    form_resume: "ଆପଣଙ୍କ ରିଜ୍ୟୁମ୍ (PDF ବା Word, ସର୍ବାଧିକ 5MB)",
    form_about_you: "ଆପଣଙ୍କ ବିଷୟରେ ଜଣାନ୍ତୁ",
    form_submitting: "ଦାଖଲ କରାଯାଉଛି…",
    form_submit_app: "ଆବେଦନ ଦାଖଲ କରନ୍ତୁ",
    form_app_received: "ଆବେଦନ ଗ୍ରହଣ କରାଗଲା।",
    form_app_received_desc: "ଭର୍ଚ୍ଚୋଏରେ ଯୋଗଦେବା ପାଇଁ ଆଗ୍ରହ ପ୍ରକାଶ କରିଥିବାରୁ ଧନ୍ୟବାଦ। ଆମେ ଯୋଗାଯୋଗ କରିବୁ।",
    form_submit_another: "ଆଉ ଏକ ଆବେଦନ ଦାଖଲ କରନ୍ତୁ",

    // Privacy Page
    hero_privacy_eyebrow: "ଗୋପନୀୟତା",
    hero_privacy_title: "ଆମର ଗୋପନୀୟତା ନୀତି",
    privacy_p1: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ପ୍ରାଇଭେଟ୍ ଲିମିଟେଡ୍ ସମସ୍ତ ଗ୍ରାହକଙ୍କ ତଥ୍ୟ, ପ୍ରକଳ୍ପ ଦଲିଲ ଏବଂ ସାଂସ୍ଥାନିକ ଡାଟାସେଟ୍ କୁ ସର୍ବୋଚ୍ଚ ଗୋପନୀୟତା ଓ ସୁରକ୍ଷା ସହିତ ପରିଚାଳନା କରେ।",
    privacy_p2: "ଆମେ କୌଣସି ତୃତୀୟ ପକ୍ଷକୁ ଗ୍ରାହକଙ୍କ ତଥ୍ୟ ବିକ୍ରି ବା ବିତରଣ କରୁନାହୁଁ। ଡାଟାବେସ୍ ଏବଂ ସଫ୍ଟୱେର୍ କୋଡ୍ ସମ୍ପୂର୍ଣ୍ଣ ସୁରକ୍ଷିତ।",
    privacy_p3: "ସାଂସ୍ଥାନିକ ଓ ସରକାରୀ ପ୍ରକଳ୍ପ ପାଇଁ ସ୍ୱତନ୍ତ୍ର ଚୁକ୍ତିନାମା (NDA), SLA ଏବଂ ଡାଟା ସୁରକ୍ଷା ନିୟମ ଅନୁଯାୟୀ ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା କାର୍ଯ୍ୟକାରୀ କରାଯାଏ।",
    privacy_pr1: "କଠୋର ଡାଟା ଗୋପନୀୟତା",
    privacy_pr2: "ଶୂନ ତୃତୀୟ-ପକ୍ଷ ବ୍ୟବହାର",
    privacy_pr3: "ଆକ୍ସେସ୍ ନିୟନ୍ତ୍ରଣ",
    privacy_pr4: "ଏନକ୍ରିପ୍ଟେଡ୍ କ୍ଲାଉଡ୍ ଷ୍ଟୋରେଜ୍",
    privacy_pr5: "ଏଣ୍ଟରପ୍ରାଇଜ୍ NDA ସୁରକ୍ଷା",
    privacy_pr6: "ISO 9001 ମାନଦଣ୍ଡ",

    // 404 Page
    notfound_title: "ଏହି ପୃଷ୍ଠାଟି ମିଳିଲା ନାହିଁ",
    notfound_desc: "ଆପଣ ଖୋଜୁଥିବା ପୃଷ୍ଠାଟି ସ୍ଥାନାନ୍ତରିତ ହୋଇଥାଇପାରେ। ଆମର ସେବା, ପ୍ରଡକ୍ଟ ଦେଖନ୍ତୁ ବା ସିଧାସଳଖ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
    notfound_btn_home: "ମୁଖ୍ୟ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ",
    notfound_btn_contact: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
  },
};
