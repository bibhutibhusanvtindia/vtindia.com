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

    hero_slide2_eyebrow: "Engineering high performance apps",
    hero_slide2_title: "Step into the future of powerful mobile apps",
    hero_slide2_subtitle: "Native Android & iOS solutions built for high concurrency, flawless UX, and mission-critical workflows.",
    hero_slide2_b1_title: "40K+ Active Users",
    hero_slide2_b1_sub: "Krushi Odisha Platform",
    hero_slide2_b2_title: "Flutter & React Native",
    hero_slide2_b2_sub: "Cross-Platform Precision",
    hero_slide2_b3_title: "Zero-Downtime Architecture",
    hero_slide2_b3_sub: "Cloud-Native Infrastructure",

    hero_slide3_eyebrow: "Spatial Computing & Metaverse",
    hero_slide3_title: "We can help you redefine reality with VR",
    hero_slide3_subtitle: "Immersive VR safety simulators and spatial training that turn hazardous industrial procedures into zero-risk learning.",
    hero_slide3_b1_title: "SafeAct Hazard Simulator",
    hero_slide3_b1_sub: "Heavy Industry Ready",
    hero_slide3_b2_title: "6-DoF Precision",
    hero_slide3_b2_sub: "Interactive Physical Engine",
    hero_slide3_b3_title: "Govt of Odisha Pavilion",
    hero_slide3_b3_sub: "Krushi 2025 VR Expo",

    hero_cta_services: "Explore Services",
    hero_cta_voice_tour: "Voice Tour",
    hero_cta_contact: "Contact us",
    hero_trust_clients: "84+ Clients Deployed",
    hero_trust_products: "16 Products Built",
    hero_trust_support: "24/7 Expert Support",

    // Client Marquee
    marquee_title: "Trusted by 84+ Leading Enterprises, Colleges & Government Bodies",

    // About Section
    about_eyebrow: "WHO WE ARE",
    about_title: "Engineering Excellence from Odisha to the World",
    about_description: "Founded by a team of IIT alumni and experienced engineering professionals, Virtoy Technologies delivers world-class software, enterprise ERPs, and immersive spatial solutions across Eastern India and the UAE.",
    about_vision_title: "Our Vision",
    about_vision_desc: "To establish a global IT powerhouse in Odisha, reversing brain drain and bringing deep technology solutions to the grassroots.",
    about_mission_title: "Our Mission",
    about_mission_desc: "Driving enterprise innovation with cutting-edge software architecture to empower institutions and businesses.",
    about_support_title: "24/7 Engineering Support",
    about_support_desc: "Dedicated technical consultants providing round-the-clock uptime and rapid incident response.",

    // Products Section
    products_eyebrow: "OUR DIGITAL ECOSYSTEM",
    products_title: "16 Proprietary Digital Products",
    products_subtitle: "From industrial safety simulators to campus-wide ERPs and hospitality management systems.",
    products_view_all: "View All 16 Products",
    products_explore_btn: "Explore Product",
    products_live_demo: "Request Demo",

    // Services Section
    services_eyebrow: "CORE CAPABILITIES",
    services_title: "8 Full-Lifecycle Engineering Services",
    services_subtitle: "Tailored software, mobile apps, enterprise cloud architecture, and immersive spatial tech.",
    services_view_all: "View All 8 Services",

    // Why Virtoy
    why_eyebrow: "WHY VIRTOY",
    why_title: "Why Industry Leaders Choose Virtoy Technologies",
    why_card1_title: "IIT Alumni Engineering Rigor",
    why_card1_desc: "Architected by graduates from top Indian Institutes of Technology with strict architectural standards.",
    why_card2_title: "84+ Verified Client Deployments",
    why_card2_desc: "Proven track record across leading autonomous colleges, heavy industries, and government initiatives.",
    why_card3_title: "24/7 Dedicated Technical Support",
    why_card3_desc: "Round-the-clock enterprise support desk ensuring 99.9% uptime for mission-critical operations.",
    why_card4_title: "Immersive AR/VR Innovation",
    why_card4_desc: "Pioneering spatial computing and VR safety training simulators across Eastern India.",

    // Contact CTA
    cta_eyebrow: "READY TO BUILD?",
    cta_title: "Let's Engineer Your Next Digital Milestone",
    cta_subtitle: "Talk to our senior engineering leadership in Kolkata or Bhubaneswar for custom proposals.",
    cta_btn_contact: "Start Conversation",
    cta_btn_call: "Direct Call: +91 9861802325",

    // Footer
    footer_desc: "Virtoy Technologies Pvt. Ltd. is an enterprise IT & spatial computing company founded by IIT alumni, delivering world-class software, enterprise ERPs, and VR simulations.",
    footer_quick_links: "Quick Navigation",
    footer_products_col: "Proprietary Products",
    footer_offices_col: "Office Locations",
    footer_kolkata_hq: "Kolkata Head Office",
    footer_kolkata_addr: "3rd Floor, Jharanalaya, 635 Baishnabghatta, Patuli, Kolkata - 700084",
    footer_bhubaneswar_dev: "Bhubaneswar Development Centre",
    footer_bhubaneswar_addr: "Room 409, O-HUB, SEZ Road, Chandaka Industrial Estate, Bhubaneswar, Odisha",
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

    hero_slide2_eyebrow: "उच्च-प्रदर्शन मोबाइल ऐप्स का निर्माण",
    hero_slide2_title: "शक्तिशाली मोबाइल ऐप्स के भविष्य में प्रवेश करें",
    hero_slide2_subtitle: "उच्च गतिशीलता, त्रुटिहीन अनुभव और व्यावसायिक वर्कफ़्लो के लिए तैयार नेटिव एंड्रॉइड और आईओएस ऐप्स।",
    hero_slide2_b1_title: "40K+ सक्रिय उपयोगकर्ता",
    hero_slide2_b1_sub: "कृषि ओडिशा प्लेटफॉर्म",
    hero_slide2_b2_title: "फ्लटर और रिएक्ट नेटिव",
    hero_slide2_b2_sub: "क्रॉस-प्लेटफॉर्म तकनीक",
    hero_slide2_b3_title: "शून्य डाउनटाइम आर्किटेक्चर",
    hero_slide2_b3_sub: "क्लाउड-नेटिव इंफ्रास्ट्रक्चर",

    hero_slide3_eyebrow: "स्पेशियल कंप्यूटिंग और मेटावर्स",
    hero_slide3_title: "वीआर के साथ वास्तविकता को पुनः परिभाषित करें",
    hero_slide3_subtitle: "इमर्सिव वीआर सेफ्टी सिमुलेटर जो खतरनाक औद्योगिक प्रक्रियाओं को शून्य-जोखिम सीखने में बदलते हैं।",
    hero_slide3_b1_title: "सेफएक्ट हैज़र्ड सिमुलेटर",
    hero_slide3_b1_sub: "भारी उद्योगों के लिए तैयार",
    hero_slide3_b2_title: "6-DoF उच्च सटीकता",
    hero_slide3_b2_sub: "इंटरएक्टिव फिजिक्स इंजन",
    hero_slide3_b3_title: "ओडिशा सरकार का मंडप",
    hero_slide3_b3_sub: "कृषि 2025 वीआर एक्सपो",

    hero_cta_services: "सेवाएं देखें",
    hero_cta_voice_tour: "ऑडियो टूर",
    hero_cta_contact: "संपर्क करें",
    hero_trust_clients: "84+ प्रमाणित क्लाइंट्स",
    hero_trust_products: "16 डिजिटल उत्पाद",
    hero_trust_support: "24/7 विशेषज्ञ सपोर्ट",

    // Client Marquee
    marquee_title: "84+ प्रमुख उद्योगों, कॉलेजों और सरकारी विभागों द्वारा विश्वसनीय",

    // About Section
    about_eyebrow: "हमारा परिचय",
    about_title: "ओडिशा से विश्व स्तर तक इंजीनियरिंग उत्कृष्टता",
    about_description: "आईआईटी पूर्व छात्रों और अनुभवी इंजीनियरों द्वारा स्थापित, विर्टॉय टेक्नोलॉजीज पूर्वी भारत और यूएई में विश्व स्तरीय सॉफ्टवेयर, एंटरप्राइज ईआरपी और वीआर समाधान प्रदान करता है।",
    about_vision_title: "हमारा विजन",
    about_vision_desc: "ओडिशा में एक विश्व स्तरीय आईटी केंद्र स्थापित करना, प्रतिभा पलायन को रोकना और जमीनी स्तर तक उन्नत तकनीक पहुंचाना।",
    about_mission_title: "हमारा मिशन",
    about_mission_desc: "संस्थानों और व्यवसायों को सशक्त बनाने के लिए अत्याधुनिक सॉफ्टवेयर आर्किटेक्चर के साथ नवाचार को आगे बढ़ाना।",
    about_support_title: "24/7 समर्पित सपोर्ट",
    about_support_desc: "चौबीसों घंटे अधिकतम अपटाइम और त्वरित सहायता सुनिश्चित करने वाले प्रमाणित तकनीकी विशेषज्ञ।",

    // Products Section
    products_eyebrow: "हमारा डिजिटल इकोसिस्टम",
    products_title: "16 प्रमुख डिजिटल उत्पाद",
    products_subtitle: "औद्योगिक सुरक्षा सिमुलेटर से लेकर संपूर्ण कैंपस ईआरपी और हॉस्पिटैलिटी प्रबंधन तक।",
    products_view_all: "सभी 16 उत्पाद देखें",
    products_explore_btn: "उत्पाद देखें",
    products_live_demo: "डेमो का अनुरोध करें",

    // Services Section
    services_eyebrow: "हमारी मुख्य क्षमताएं",
    services_title: "8 पूर्ण-जीवनचक्र इंजीनियरिंग सेवाएं",
    services_subtitle: "कस्टम सॉफ्टवेयर, मोबाइल ऐप, एंटरप्राइज क्लाउड और इमर्सिव स्पेशल टेक्नोलॉजी।",
    services_view_all: "सभी 8 सेवाएं देखें",

    // Why Virtoy
    why_eyebrow: "विर्टॉय ही क्यों",
    why_title: "उद्योग जगत विर्टॉय टेक्नोलॉजीज पर भरोसा क्यों करता है",
    why_card1_title: "आईआईटी इंजीनियरिंग मानक",
    why_card1_desc: "भारत के शीर्ष प्रौद्योगिकी संस्थानों (IIT) के पूर्व छात्रों द्वारा तैयार मजबूत सॉफ्टवेयर आर्किटेक्चर।",
    why_card2_title: "84+ प्रमाणित क्लाइंट्स",
    why_card2_desc: "अग्रणी ऑटोनॉमस कॉलेजों, भारी उद्योगों और सरकारी परियोजनाओं में सिद्ध ट्रैक रिकॉर्ड।",
    why_card3_title: "24/7 समर्पित तकनीकी सहायता",
    why_card3_desc: "क्रिटिकल ऑपरेशंस के लिए 99.9% अपटाइम सुनिश्चित करने वाला चौबीसों घंटे का सपोर्ट डेस्क।",
    why_card4_title: "अत्याधुनिक एआर/वीआर नवाचार",
    why_card4_desc: "पूर्वी भारत में स्पेशियल कंप्यूटिंग और वीआर सुरक्षा प्रशिक्षण सिमुलेटर में अग्रणी।",

    // Contact CTA
    cta_eyebrow: "शुरुआत करने के लिए तैयार हैं?",
    cta_title: "आइए अपने डिजिटल भविष्य का निर्माण करें",
    cta_subtitle: "कस्टम प्रस्ताव और समाधान के लिए कोलकाता या भुवनेश्वर में हमारी सीनियर टीम से संपर्क करें।",
    cta_btn_contact: "चर्चा शुरू करें",
    cta_btn_call: "सीधा संपर्क: +91 9861802325",

    // Footer
    footer_desc: "विर्टॉय टेक्नोलॉजीज प्राइवेट लिमिटेड आईआईटी पूर्व छात्रों द्वारा स्थापित एक एंटरप्राइज आईटी और स्पेशल कंप्यूटिंग कंपनी है, जो विश्व स्तरीय सॉफ्टवेयर, ईआरपी और वीआर समाधान प्रदान करती है।",
    footer_quick_links: "त्वरित नेविगेशन",
    footer_products_col: "प्रमुख उत्पाद",
    footer_offices_col: "कार्यालय के पते",
    footer_kolkata_hq: "कोलकाता मुख्य कार्यालय",
    footer_kolkata_addr: "3rd Floor, Jharanalaya, 635 Baishnabghatta, Patuli, Kolkata - 700084",
    footer_bhubaneswar_dev: "भुवनेश्वर विकास केंद्र",
    footer_bhubaneswar_addr: "Room 409, O-HUB, SEZ Road, Chandaka Industrial Estate, Bhubaneswar, Odisha",
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

    hero_slide2_eyebrow: "ଉଚ୍ଚକ୍ଷମତା ସମ୍ପନ୍ନ ମୋବାଇଲ୍ ଆପ୍ ନିର୍ମାଣ",
    hero_slide2_title: "ଶକ୍ତିଶାଳୀ ମୋବାଇଲ୍ ଆପ୍‌ର ଭବିଷ୍ୟତକୁ ସ୍ୱାଗତ",
    hero_slide2_subtitle: "ଅତ୍ୟାଧୁନିକ ଆଣ୍ଡ୍ରଏଡ୍ ଏବଂ ଆଇଓଏସ୍ ଆପ୍ଲିକେସନ୍ ଯାହା ଉତ୍କୃଷ୍ଟ କାର୍ଯ୍ୟକ୍ଷମତା ଓ ସୁରକ୍ଷା ପ୍ରଦାନ କରେ।",
    hero_slide2_b1_title: "୪୦,୦୦୦+ ସକ୍ରିୟ ଉପଭୋକ୍ତା",
    hero_slide2_b1_sub: "କୃଷି ଓଡ଼ିଶା ପ୍ଲାଟଫର୍ମ",
    hero_slide2_b2_title: "ଫ୍ଲଟର ଓ ରିଆକ୍ଟ ନେଟିଭ୍",
    hero_slide2_b2_sub: "କ୍ରସ୍-ପ୍ଲାଟଫର୍ମ ବୈଷୟିକତା",
    hero_slide2_b3_title: "ଜିରୋ ଡାଉନଟାଇମ୍ ଆର୍କିଟେକ୍ଚର",
    hero_slide2_b3_sub: "କ୍ଲାଉଡ୍ ନେଟିଭ୍ ଇନଫ୍ରାଷ୍ଟ୍ରକଚର",

    hero_slide3_eyebrow: "ସ୍ପାସିଆଲ୍ କମ୍ପ୍ୟୁଟିଂ ଓ ମେଟାଭର୍ସ",
    hero_slide3_title: "ଭିଆର୍ ସହିତ ବାସ୍ତବତାକୁ ନୂଆ ରୂପ ଦିଅନ୍ତୁ",
    hero_slide3_subtitle: "ଅଭିନବ ଭିଆର୍ ସେଫ୍ଟି ସିମ୍ୟୁଲେଟର ଯାହା ବିପଜ୍ଜନକ ଶିଳ୍ପ କାର୍ଯ୍ୟକୁ ବିପଦମୁକ୍ତ ପ୍ରଶିକ୍ଷଣରେ ପରିଣତ କରେ।",
    hero_slide3_b1_title: "ସେଫ୍‌ଆକ୍ଟ ହାଜାର୍ଡ ସିମ୍ୟୁଲେଟର",
    hero_slide3_b1_sub: "ଭାରୀ ଶିଳ୍ପ ପାଇଁ ଉପଯୁକ୍ତ",
    hero_slide3_b2_title: "6-DoF ସଠିକତା",
    hero_slide3_b2_sub: "ଇଣ୍ଟରାକ୍ଟିଭ୍ ଫିଜିକ୍ସ ଇଞ୍ଜିନ୍",
    hero_slide3_b3_title: "ଓଡ଼ିଶା ସରକାରଙ୍କ ପାଭିଲିଅନ୍",
    hero_slide3_b3_sub: "କୃଷି ୨୦୨୫ ଭିଆର୍ ଏକ୍ସପୋ",

    hero_cta_services: "ସେବା ଦେଖନ୍ତୁ",
    hero_cta_voice_tour: "ଅଡିଓ ଟୁର୍",
    hero_cta_contact: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
    hero_trust_clients: "୮୪+ ପ୍ରମାଣିତ ଗ୍ରାହକ",
    hero_trust_products: "୧୬ଟି ଡିଜିଟାଲ୍ ପ୍ରଡକ୍ଟ",
    hero_trust_support: "୨୪/୭ ବିଶେଷଜ୍ଞ ସପୋର୍ଟ",

    // Client Marquee
    marquee_title: "୮୪+ ପ୍ରମୁଖ ଶିଳ୍ପ, କଲେଜ ଏବଂ ସରକାରୀ ସଂସ୍ଥା ଦ୍ୱାରା ବିଶ୍ୱସ୍ତ",

    // About Section
    about_eyebrow: "ଆମ ପରିଚୟ",
    about_title: "ଓଡ଼ିଶାରୁ ବିଶ୍ୱସ୍ତରୀୟ ଇଞ୍ଜିନିୟରିଂ ଉତ୍କର୍ଷତା",
    about_description: "ଆଇଆଇଟି ପୂର୍ବତନ ଛାତ୍ର ଏବଂ ଅଭିଜ୍ଞ ଇଞ୍ଜିନିୟରମାନଙ୍କ ଦ୍ୱାରା ପ୍ରତିଷ୍ଠିତ, ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ବିଶ୍ୱସ୍ତରୀୟ ସଫ୍ଟୱେର୍, ଏଜୁକେସନ୍ ଇଆରପି ଏବଂ ଏଆର୍/ଭିଆର୍ ସମାଧାନ ପ୍ରଦାନ କରୁଛି।",
    about_vision_title: "ଆମର ଲକ୍ଷ୍ୟ (Vision)",
    about_vision_desc: "ଓଡ଼ିଶାରେ ଏକ ବିଶ୍ୱସ୍ତରୀୟ ଆଇଟି କେନ୍ଦ୍ର ଗଠନ କରି ମେଧା ପଳାୟନ ରୋକିବା ଏବଂ ତୃଣମୂଳ ସ୍ତରକୁ ଉନ୍ନତ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା ପହଞ୍ଚାଇବା।",
    about_mission_title: "ଆମର କାର୍ଯ୍ୟ (Mission)",
    about_mission_desc: "ଅତ୍ୟାଧୁନିକ ସଫ୍ଟୱେର୍ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା ମାଧ୍ୟମରେ ସଂସ୍ଥା ଓ ବ୍ୟବସାୟଗୁଡ଼ିକୁ ଶକ୍ତିଶାଳୀ କରିବା।",
    about_support_title: "୨୪/୭ ଉତ୍ସର୍ଗୀକୃତ ସପୋର୍ଟ",
    about_support_desc: "ସର୍ବଦା ନିର୍ଭରଯୋଗ୍ୟ ଏବଂ ତ୍ୱରିତ ସେବା ପ୍ରଦାନ କରୁଥିବା ପ୍ରମାଣିତ ଟେକ୍ନିକାଲ୍ ବିଶେଷଜ୍ଞ ଟିମ୍।",

    // Products Section
    products_eyebrow: "ଆମର ଡିଜିଟାଲ୍ ପ୍ରଡକ୍ଟ ସମୂହ",
    products_title: "୧୬ଟି ମୁଖ୍ୟ ଡିଜିଟାଲ୍ ପ୍ରଡକ୍ଟ",
    products_subtitle: "ଶିଳ୍ପ ନିରାପତ୍ତା ସିମ୍ୟୁଲେଟର ଠାରୁ କଲେଜ ଇଆରପି ଓ ହୋଟେଲ୍ ପରିଚାଳନା ପର୍ଯ୍ୟନ୍ତ।",
    products_view_all: "ସମସ୍ତ ୧୬ଟି ପ୍ରଡକ୍ଟ ଦେଖନ୍ତୁ",
    products_explore_btn: "ପ୍ରଡକ୍ଟ ଦେଖନ୍ତୁ",
    products_live_demo: "ଡେମୋ ଅନୁରୋଧ କରନ୍ତୁ",

    // Services Section
    services_eyebrow: "ଆମର ମୁଖ୍ୟ ସେବା",
    services_title: "୮ଟି ସମ୍ପୂର୍ଣ୍ଣ ଇଞ୍ଜିନିୟରିଂ ସେବା",
    services_subtitle: "କଷ୍ଟମ୍ ସଫ୍ଟୱେର୍, ମୋବାଇଲ୍ ଆପ୍, କ୍ଲାଉଡ୍ ଆର୍କିଟେକ୍ଚର ଏବଂ ଏଆର୍/ଭିଆର୍ ସମାଧାନ।",
    services_view_all: "ସମସ୍ତ ୮ଟି ସେବା ଦେଖନ୍ତୁ",

    // Why Virtoy
    why_eyebrow: "କାହିଁକି ଭର୍ଚ୍ଚୋଏ",
    why_title: "ପ୍ରମୁଖ ସଂସ୍ଥାମାନେ ଭର୍ଚ୍ଚୋଏ ଉପରେ କାହିଁକି ଭରସା କରନ୍ତି",
    why_card1_title: "ଆଇଆଇଟି ଇଞ୍ଜିନିୟରିଂ ମାନଦଣ୍ଡ",
    why_card1_desc: "ଭାରତର ପ୍ରମୁଖ ଆଇଆଇଟି ପ୍ରତିଷ୍ଠାନର ପୂର୍ବତନ ଛାତ୍ରଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ଶକ୍ତିଶାଳୀ ସଫ୍ଟୱେର୍ ଆର୍କିଟେକ୍ଚର।",
    why_card2_title: "୮୪+ ପ୍ରମାଣିତ ଗ୍ରାହକ ପ୍ରକଳ୍ପ",
    why_card2_desc: "ପ୍ରମୁଖ ସ୍ୱୟଂଶାସିତ କଲେଜ, ଭାରୀ ଶିଳ୍ପ ଏବଂ ସରକାରୀ ପ୍ରକଳ୍ପରେ ସଫଳତାର ପ୍ରମାଣିତ ଇତିହାସ।",
    why_card3_title: "୨୪/୭ ଉତ୍ସର୍ଗୀକୃତ ଟେକ୍ନିକାଲ୍ ସପୋର୍ଟ",
    why_card3_desc: "ସମସ୍ତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ କାର୍ଯ୍ୟ ପାଇଁ ୯୯.୯% ଅପଟାଇମ୍ ସୁନିଶ୍ଚିତ କରୁଥିବା ନିରନ୍ତର ସହାୟତା।",
    why_card4_title: "ଅତ୍ୟାଧୁନିକ ଏଆର୍/ଭିଆର୍ ଉଦ୍ଭାବନ",
    why_card4_desc: "ପୂର୍ବ ଭାରତରେ ସ୍ପାସିଆଲ୍ କମ୍ପ୍ୟୁଟିଂ ଏବଂ ଭିଆର୍ ନିରାପତ୍ତା ପ୍ରଶିକ୍ଷଣରେ ଅଗ୍ରଣୀ।",

    // Contact CTA
    cta_eyebrow: "ଆରମ୍ଭ କରିବା ପାଇଁ ପ୍ରସ୍ତୁତ ତ?",
    cta_title: "ଆସନ୍ତୁ ଆପଣଙ୍କ ଡିଜିଟାଲ୍ ଭବିଷ୍ୟତ ନିର୍ମାଣ କରିବା",
    cta_subtitle: "କଷ୍ଟମ୍ ପ୍ରସ୍ତାବ ଓ ପରାମର୍ଶ ପାଇଁ କୋଲକାତା ବା ଭୁବନେଶ୍ୱର ଓ-ହବ୍ ରେ ଆମ ସିନିୟର ଟିମ୍ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
    cta_btn_contact: "ଆଲୋଚନା ଆରମ୍ଭ କରନ୍ତୁ",
    cta_btn_call: "ସିଧାସଳଖ କଲ୍: +91 9861802325",

    // Footer
    footer_desc: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ପ୍ରାଇଭେଟ୍ ଲିମିଟେଡ୍ ଆଇଆଇଟି ପୂର୍ବତନ ଛାତ୍ରମାନଙ୍କ ଦ୍ୱାରା ପ୍ରତିଷ୍ଠିତ ଏକ ଏଣ୍ଟରପ୍ରାଇଜ୍ ଆଇଟି ଓ ସ୍ପାସିଆଲ୍ କମ୍ପ୍ୟୁଟିଂ କମ୍ପାନୀ।",
    footer_quick_links: "ଦ୍ରୁତ ନେଭିଗେସନ୍",
    footer_products_col: "ପ୍ରମୁଖ ପ୍ରଡକ୍ଟ",
    footer_offices_col: "କାର୍ଯ୍ୟାଳୟ ଠିକଣା",
    footer_kolkata_hq: "କୋଲକାତା ମୁଖ୍ୟ କାର୍ଯ୍ୟାଳୟ",
    footer_kolkata_addr: "3rd Floor, Jharanalaya, 635 Baishnabghatta, Patuli, Kolkata - 700084",
    footer_bhubaneswar_dev: "ଭୁବନେଶ୍ୱର ବିକାଶ କେନ୍ଦ୍ର",
    footer_bhubaneswar_addr: "Room 409, O-HUB, SEZ Road, Chandaka Industrial Estate, Bhubaneswar, Odisha",
    footer_rights: "ସର୍ବସତ୍ତ୍ୱ ସଂରକ୍ଷିତ। ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ପ୍ରାଇଭେଟ୍ ଲିମିଟେଡ୍।",
    footer_privacy: "ଗୋପନୀୟତା ନୀତି",
  },
};
