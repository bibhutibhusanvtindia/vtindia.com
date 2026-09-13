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
    hero_badge_sub: "पूर्वी भारत और यूएई",
    hero_slide1_eyebrow: "हम आपके व्यवसाय को नई पहचान दिलाते हैं",
    hero_slide1_title: "आईटी की आधुनिक दुनिया में कदम रखें",
    hero_slide1_subtitle: "पूर्वी भारत, यूएई और वैश्विक स्तर पर व्यवसायों के लिए अभिनव और मजबूत आईटी समाधान।",
    hero_slide1_b1_title: "84+ प्रमाणित क्लाइंट्स",
    hero_slide1_b1_sub: "टाटा स्पंज · आदित्य बिड़ला · नाल्को",
    hero_slide1_b2_title: "आईएसओ 9001 एवं एमएसएमई",
    hero_slide1_b2_sub: "प्रमाणित गुणवत्ता मानक",
    hero_slide1_b3_title: "आईआईटी पूर्व छात्रों द्वारा स्थापित",
    hero_slide1_b3_sub: "इंजीनियरिंग उत्कृष्टता",
    hero_slide1_loc: "विर्टॉय कोलकाता मुख्य कार्यालय",

    hero_slide2_eyebrow: "उच्च-प्रदर्शन मोबाइल ऐप्स का निर्माण",
    hero_slide2_title: "शक्तिशाली मोबाइल ऐप्स के भविष्य में प्रवेश करें",
    hero_slide2_subtitle: "उच्च गतिशीलता, त्रुटिहीन अनुभव और व्यावसायिक वर्कफ़्लो के लिए तैयार नेटिव एंड्रॉइड और आईओएस ऐप्स।",
    hero_slide2_b1_title: "40K+ सक्रिय उपयोगकर्ता",
    hero_slide2_b1_sub: "कृषि ओडिशा प्लेटफॉर्म",
    hero_slide2_b2_title: "फ्लटर और रिएक्ट नेटिव",
    hero_slide2_b2_sub: "क्रॉस-प्लेटफॉर्म तकनीक",
    hero_slide2_b3_title: "शून्य डाउनटाइम आर्किटेक्चर",
    hero_slide2_b3_sub: "क्लाउड-नेटिव इंफ्रास्ट्रक्चर",
    hero_slide2_loc: "मोबाइल समाधान इंजीनियरिंग केंद्र",

    hero_slide3_eyebrow: "स्पेशियल कंप्यूटिंग और मेटावर्स",
    hero_slide3_title: "वीआर के साथ वास्तविकता को पुनः परिभाषित करें",
    hero_slide3_subtitle: "इमर्सिव वीआर सेफ्टी सिमुलेटर जो खतरनाक औद्योगिक प्रक्रियाओं को शून्य-जोखिम सीखने में बदलते हैं।",
    hero_slide3_b1_title: "सेफएक्ट हैज़र्ड सिमुलेटर",
    hero_slide3_b1_sub: "भारी उद्योगों के लिए तैयार",
    hero_slide3_b2_title: "6-DoF उच्च सटीकता",
    hero_slide3_b2_sub: "इंटरएक्टिव फिजिक्स इंजन",
    hero_slide3_b3_title: "ओडिशा सरकार का मंडप",
    hero_slide3_b3_sub: "कृषि 2025 वीआर एक्सपो",
    hero_slide3_loc: "विर्टॉय एआर/वीआर इंटरएक्टिव लैब",

    hero_cta_services: "सेवाएं देखें",
    hero_cta_voice_tour: "ऑडियो टूर",
    hero_cta_contact: "संपर्क करें",
    hero_trust_clients: "84+ प्रमाणित क्लाइंट्स",
    hero_trust_products: "16 डिजिटल उत्पाद",
    hero_trust_support: "24/7 विशेषज्ञ सपोर्ट",

    // Client Marquee
    marquee_eyebrow: "उद्योग जगत द्वारा विश्वसनीय",
    marquee_title: "पूर्वी भारत और यूएई में 84 प्रमाणित परिनियोजन",
    marquee_desc: "प्रमुख उद्योगों, सरकारी विश्वविद्यालयों, मेडिकल संस्थानों और कॉर्पोरेट उद्यमों को सशक्त बनाना।",
    marquee_btn: "सभी 84+ क्लाइंट्स देखें",

    // About Section
    about_eyebrow: "विर्टॉय इंडिया परिचय",
    about_title: "सफलता और नवाचार के लिए मजबूत टीमों का निर्माण",
    about_description: "आईआईटी पूर्व छात्रों और अनुभवी इंजीनियरिंग पेशेवरों द्वारा स्थापित, विर्टॉय टेक्नोलॉजीज सॉफ्टवेयर, वेब, मोबाइल, एआर/वीआर और एंटरप्राइज समाधान प्रदान करता है।",
    about_vision_title: "हमारा विजन",
    about_vision_desc: "ओडिशा में एक विश्व स्तरीय आईटी केंद्र स्थापित करना, प्रतिभा पलायन को रोकना और जमीनी स्तर तक उन्नत तकनीक पहुंचाना।",
    about_mission_title: "हमारा मिशन",
    about_mission_desc: "संस्थानों और व्यवसायों को सशक्त बनाने के लिए अत्याधुनिक सॉफ्टवेयर आर्किटेक्चर के साथ नवाचार को आगे बढ़ाना।",
    about_support_title: "हमारा सपोर्ट",
    about_support_desc: "प्रमाणित तकनीकी विशेषज्ञों की समर्पित टीम चौबीसों घंटे विश्वसनीय सहायता और निर्बाध संचालन सुनिश्चित करती है।",
    about_btn: "हमारे बारे में और जानें",

    // Interactive Experience Center
    exp_badge: "लाइव इंटरएक्टिव टेक्नोलॉजी लैब",
    exp_title: "रियल टाइम में हमारे इंजन का अनुभव करें",
    exp_desc: "हमारे लाइव सिमुलेशन इंजन, औद्योगिक टेलीमेट्री डैशबोर्ड और क्लाउड आर्किटेक्चर के साथ इंटरैक्ट करें।",
    exp_tab_vr: "वीआर फिजिक्स सिमुलेटर",
    exp_tab_safeact: "सेफएक्ट लाइव टेलीमेट्री",
    exp_tab_cloud: "क्लाउड आर्किटेक्चर बेंच",

    // Spatial Lab
    spatial_badge: "स्पेशियल कंप्यूटिंग और एआर/वीआर लैब",
    spatial_title: "अगली पीढ़ी के इमर्सिव स्पेशल सिमुलेशन",
    spatial_desc: "एंटरप्राइज और सरकारी परियोजनाओं के लिए तैयार उच्च-सटीकता वाले 3D डिजिटल ट्विन और वर्चुअल ट्रेनिंग वातावरण।",
    spatial_btn_demo: "वर्चुअल रियलिटी लैब शुरू करें",

    // Comparison Matrix
    comp_badge: "एंटरप्राइज मानक तुलना",
    comp_title: "विर्टॉय पारंपरिक आईटी कंपनियों से बेहतर क्यों है",
    comp_desc: "हमारे आईआईटी इंजीनियरिंग मानक, ऑन-ग्राउंड सपोर्ट और मॉड्यूलर सॉफ्टवेयर आईपी का विस्तृत विवरण।",

    // Transformation Visualizer
    trans_badge: "संस्थागत आधुनिकीकरण",
    trans_title: "पारंपरिक प्रक्रियाओं को स्वायत्त डिजिटल सिस्टम में बदलें",
    trans_desc: "विर्टॉय सॉफ्टवेयर सिस्टम लागू करने से पहले और बाद का स्पष्ट अंतर देखें।",

    // Impact Stories
    impact_badge: "सिद्ध परिणाम और प्रभाव",
    impact_title: "84+ क्लाइंट्स के लिए प्रमाणित परिणाम",
    impact_desc: "भारी उद्योग, राज्य कृषि और विश्वविद्यालयों में हमारी सफलता की कहानियां।",

    // ROI Calculator
    roi_badge: "लागत और दक्षता कैलकुलेटर",
    roi_title: "विर्टॉय सिस्टम के साथ अपने आरओआई की गणना करें",
    roi_desc: "अपने संस्थान के लिए बचाए गए कार्य घंटे, त्रुटि दरों में कमी और अपटाइम लाभ का अनुमान लगाएं।",

    // Tech Stack Hub
    tech_badge: "आर्किटेक्चर और टेक्नोलॉजी",
    tech_title: "आधुनिक, स्केलेबल और सुरक्षित टेक स्टैक",
    tech_desc: "नेक्स्ट.जेएस, फ्लटर, पायटॉर्च, यूनिटी 3D और हाई-अवेलेबिलिटी पोस्टग्रेएसक्यूएल पर आधारित।",

    // Project Configurator
    config_badge: "त्वरित प्रोजेक्ट अनुमान",
    config_title: "अपने एंटरप्राइज समाधान को कॉन्फ़िगर करें",
    config_desc: "अपनी आवश्यकताएं चुनें और त्वरित आर्किटेक्चरल अनुमान प्राप्त करें।",

    // Live Telemetry
    telemetry_badge: "सिस्टम हेल्थ और एसएलए स्थिति",
    telemetry_title: "लाइव ऑपरेशंस और इंफ्रास्ट्रक्चर टेलीमेट्री",
    telemetry_desc: "हमारे क्लाउड नोड्स, ईआरपी सिस्टम और सपोर्ट डेस्क की वास्तविक समय में निगरानी।",

    // Global Footprint
    footprint_badge: "दोहरे नवाचार केंद्र",
    footprint_title: "पूर्वी भारत को वैश्विक बाजारों से जोड़ना",
    footprint_desc: "कोलकाता हेड ऑफिस और भुवनेश्वर ओ-हब केंद्र से भारत और यूएई में सेवाएं।",

    // Portfolio
    portfolio_badge: "प्रमाणित संस्थागत पोर्टफोलियो",
    portfolio_title: "सक्रिय सिस्टम और केस स्टडीज",
    portfolio_desc: "ओडिशा और पूर्वी भारत में विश्वविद्यालयों और उद्योगों को शक्ति प्रदान करने वाले सॉफ्टवेयर।",

    // Testimonials
    test_badge: "क्लाइंट प्रतिक्रियाएं",
    test_title: "संस्थागत प्रमुख विर्टॉय के बारे में क्या कहते हैं",
    test_desc: "उद्योग निदेशकों, प्रिंसिपल्स और सुरक्षा प्रबंधकों से प्रामाणिक प्रतिक्रिया।",

    // Enterprise FAQ
    faq_badge: "अक्सर पूछे जाने वाले प्रश्न",
    faq_title: "महत्वपूर्ण प्रश्न और उत्तर",
    faq_desc: "हमारे इंजीनियरिंग मानकों, डिलीवरी समयसीमा और 24/7 एसएलए गारंटी के बारे में स्पष्ट जानकारी।",

    // Accreditations
    accred_badge: "प्रमाणित गुणवत्ता",
    accred_title: "उद्योग मान्यता और मानक",
    accred_desc: "आईएसओ 9001 प्रमाणित, एमएसएमई पंजीकृत और नैक डिजिटलीकरण मानकों के अनुरूप।",

    // Team Preview
    team_badge: "नेतृत्व एवं इंजीनियरिंग",
    team_title: "आईआईटी पूर्व छात्रों और वरिष्ठ इंजीनियरों के नेतृत्व में",
    team_desc: "हमारा नेतृत्व शीर्ष शोध संस्थानों और सॉफ्टवेयर कंपनियों से वर्षों का अनुभव लेकर आता है।",
    team_btn: "पूरी टीम से मिलें",

    // Careers Teaser
    careers_badge: "हमारी टीम में शामिल हों",
    careers_title: "पूर्वी भारत से अत्याधुनिक तकनीक का निर्माण करें",
    careers_desc: "हम कोलकाता और भुवनेश्वर में प्रतिभाशाली सॉफ्टवेयर, मोबाइल और वीआर डेवलपर्स की तलाश में हैं।",
    careers_btn: "उपलब्ध करियर देखें",

    // Products Section
    products_eyebrow: "हमारा उत्पाद इकोसिस्टम",
    products_title: "फील्ड में सिद्ध उद्देश्य-निर्मित सॉफ्टवेयर",
    products_subtitle: "नीचे दिया गया प्रत्येक उत्पाद वास्तविक संस्थागत और औद्योगिक परिनियोजन में सिद्ध है।",
    products_view_all: "सभी 16 उत्पाद देखें",
    products_explore_btn: "उत्पाद देखें",
    products_live_demo: "डेमो का अनुरोध करें",

    // Services Section
    services_eyebrow: "हम क्या करते हैं",
    services_title: "आपकी वृद्धि के लिए तैयार सेवाएं",
    services_subtitle: "कोड की पहली लाइन से लेकर नैक-रेडी ईआरपी वर्कफ़्लो तक—एक दशक के अनुभव के साथ।",
    services_view_all: "सभी 8 सेवाएं देखें",

    // Why Virtoy
    why_eyebrow: "विर्टॉय ही क्यों",
    why_title: "उद्योग जगत विर्टॉय टेक्नोलॉजीज पर भरोसा क्यों करता है",
    why_card1_title: "आईआईटी पूर्व छात्रों द्वारा स्थापित",
    why_card1_desc: "भारत के शीर्ष प्रौद्योगिकी संस्थानों (IIT) के पूर्व छात्रों द्वारा तैयार मजबूत सॉफ्टवेयर आर्किटेक्चर।",
    why_card2_title: "84+ प्रमाणित क्लाइंट्स",
    why_card2_desc: "अग्रणी ऑटोनॉमस कॉलेजों, भारी उद्योगों और सरकारी परियोजनाओं में सिद्ध ट्रैक रिकॉर्ड।",
    why_card3_title: "24/7 समर्पित सहायता और दो क्षेत्रीय हब",
    why_card3_desc: "कोलकाता और भुवनेश्वर से प्रमाणित सॉफ्टवेयर इंजीनियरों तक सीधी पहुंच।",
    why_card4_title: "अत्याधुनिक एआर/वीआर नवाचार",
    why_card4_desc: "पूर्वी भारत में स्पेशियल कंप्यूटिंग और वीआर सुरक्षा प्रशिक्षण सिमुलेटर में अग्रणी।",

    // Contact CTA
    cta_eyebrow: "संपर्क करें",
    cta_title: "क्या आपके पास कोई नया प्रोजेक्ट है? आइए निर्माण करें।",
    cta_subtitle: "भारत और यूएई में हमारे कार्यालयों पर आएं या सीधे हमारी इंजीनियरिंग टीम से संपर्क करें।",
    cta_btn_contact: "चर्चा शुरू करें",
    cta_btn_call: "सीधा संपर्क: +91 9861802325",

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
  },
};
