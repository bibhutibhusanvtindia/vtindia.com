"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/lib/icons";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/lib/translations";

export interface LocalizedProduct {
  slug: string;
  name: string;
  summary: string;
  features: string[];
  usedBy?: string[];
  icon: string;
}

const PRODUCTS_MAP: Record<"en" | "hi" | "or", LocalizedProduct[]> = {
  en: [
    {
      slug: "safeact",
      name: "Safeact",
      summary: "A workplace safety platform for real-time incident reporting and compliance tracking.",
      features: ["Secure role-based login", "Real-time safety dashboard", "Department compliance visualization"],
      usedBy: ["Tata Sponge", "Aditya Birla", "Kalinga Units I & II"],
      icon: "ShieldCheck",
    },
    {
      slug: "mobile-applications",
      name: "Mobile Applications",
      summary: "Interactive, purpose-driven mobile experiences across specialized sectors.",
      features: ["VR-based experiential learning", "Field & machinery simulation", "Government partnership delivery"],
      usedBy: ["Krushi Odisha 2025 — Government of Odisha"],
      icon: "Sprout",
    },
    {
      slug: "education-erp",
      name: "Education ERP",
      summary: "Digital campus management for academic and administrative operations.",
      features: ["Secure login interface", "Parent/student/faculty dashboard", "Faculty & course lists"],
      usedBy: ["Govt College Sundargarh", "Banki Autonomous College", "Sarbati Devi College"],
      icon: "School",
    },
    {
      slug: "hotel-pms",
      name: "Hotel-PMS",
      summary: "A comprehensive property management system for hospitality operations.",
      features: ["Role-based staff login", "Reservation & billing", "Room & guest management"],
      icon: "BedDouble",
    },
    {
      slug: "library-management",
      name: "Library Management",
      summary: "Automates library operations for educational institutions.",
      features: ["Admin login interface", "Centralized dashboard", "Issue list tracking"],
      usedBy: ["9 Educational Institutions Across Odisha"],
      icon: "BookOpen",
    },
    {
      slug: "billing-management",
      name: "Billing Management",
      summary: "Streamlines invoicing and financial operations for businesses of any size.",
      features: ["Automated invoicing", "Multi-store billing", "Recurring billing"],
      icon: "Receipt",
    },
    {
      slug: "sme-erp",
      name: "SME-ERP",
      summary: "Centralizes core operations for small and medium enterprises.",
      features: ["Role-based dashboard", "Departmental workflow", "Unified business data"],
      icon: "Building2",
    },
    {
      slug: "bilingual-websites",
      name: "Bilingual Websites",
      summary: "English/Odia multilingual platforms for inclusive public communication.",
      features: ["English ⇄ Odia language switching", "Structured content", "Institutional adoption"],
      usedBy: ["ATLC Odisha", "Maa Cuttack Chandi"],
      icon: "Languages",
    },
    {
      slug: "augmented-reality",
      name: "Augmented Reality",
      summary: "AR experiences for learning, engagement and real-time visualization.",
      features: ["Real-world + virtual overlays", "Exhibition & training", "Govt initiatives"],
      icon: "Scan",
    },
    {
      slug: "virtual-reality",
      name: "Virtual Reality",
      summary: "Immersive VR environments for training, education and entertainment.",
      features: ["Real-time 3D rendering", "Safety & industrial simulation", "Medical & defense"],
      icon: "Glasses",
    },
    {
      slug: "hrms",
      name: "HRMS",
      summary: "Automates workforce management and organizational operations.",
      features: ["Role-based admin access", "Employee records", "Performance tracking"],
      icon: "Users",
    },
    {
      slug: "digital-certificate-management",
      name: "Digital Certificate Management",
      summary: "Automates issuance, approval and distribution of digital certificates.",
      features: ["Online request form", "Admin approval workflow", "Auto-generated certificates"],
      usedBy: ["All Odisha Tax Advocates' Association"],
      icon: "FileBadge",
    },
    {
      slug: "iot",
      name: "IOT Solutions",
      summary: "Connects physical devices and sensors for real-time data and automation.",
      features: ["Sensor & device networking", "Real-time analytics", "Industrial automation"],
      icon: "Cpu",
    },
    {
      slug: "ecommerce",
      name: "E-Commerce Applications",
      summary: "Full digital commerce platforms from catalog to checkout.",
      features: ["Customer registration & login", "Product catalog & cart", "Secure checkout"],
      icon: "ShoppingCart",
    },
    {
      slug: "digital-directory",
      name: "Digital Directory",
      summary: "A centralized electronic directory for contacts, business listings and resources.",
      features: ["Centralized contact management", "Real-time web/mobile access", "Fast search"],
      icon: "BookUser",
    },
    {
      slug: "online-voting",
      name: "Online Voting",
      summary: "A transparent digital platform for conducting elections.",
      features: ["QR / online voter registration", "Identity verification", "Secure vote casting"],
      usedBy: ["Odisha Medical Services Association"],
      icon: "Vote",
    },
  ],
  hi: [
    {
      slug: "safeact",
      name: "सेफएक्ट",
      summary: "रियल-टाइम घटना रिपोर्टिंग और सुरक्षा अनुपालन ट्रैकिंग के लिए कार्यस्थल सुरक्षा प्लेटफॉर्म।",
      features: ["सुरक्षित भूमिका-आधारित लॉगिन", "रियल-टाइम सुरक्षा डैशबोर्ड", "विभागीय अनुपालन विज़ुअलाइज़ेशन"],
      usedBy: ["टाटा स्पंज", "आदित्य बिड़ला", "कलिंगा यूनिट्स I और II"],
      icon: "ShieldCheck",
    },
    {
      slug: "mobile-applications",
      name: "मोबाइल एप्लिकेशन",
      summary: "विशेष क्षेत्रों में इंटरएक्टिव और उद्देश्य-संचालित मोबाइल अनुभव।",
      features: ["वीआर-आधारित अनुभवात्मक शिक्षा", "खेत व मशीनरी सिमुलेशन", "सरकारी साझेदारी डिलीवरी"],
      usedBy: ["कृषि ओडिशा 2025 — ओडिशा सरकार"],
      icon: "Sprout",
    },
    {
      slug: "education-erp",
      name: "एजुकेशन ईआरपी",
      summary: "शैक्षणिक और प्रशासनिक संचालन के लिए डिजिटल कैंपस प्रबंधन प्रणाली।",
      features: ["सुरक्षित लॉगिन इंटरफेस", "अभिभावक/छात्र/संकाय डैशबोर्ड", "संकाय व पाठ्यक्रम सूची"],
      usedBy: ["शासकीय कॉलेज सुंदरगढ़", "बांकी स्वायत्त कॉलेज", "सरबती देवी कॉलेज"],
      icon: "School",
    },
    {
      slug: "hotel-pms",
      name: "होटल-पीएमएस",
      summary: "हॉस्पिटैलिटी संचालन और संपत्ति प्रबंधन के लिए एक व्यापक प्रणाली।",
      features: ["भूमिका-आधारित स्टाफ लॉगिन", "आरक्षण एवं बिलिंग", "कमरा व अतिथि प्रबंधन"],
      icon: "BedDouble",
    },
    {
      slug: "library-management",
      name: "लाइब्रेरी मैनेजमेंट",
      summary: "शैक्षणिक संस्थानों के लिए पुस्तकालय संचालन का स्वचालित प्रबंधन।",
      features: ["एडमिन लॉगिन इंटरफेस", "केंद्रीकृत डैशबोर्ड", "पुस्तक निर्गम ट्रैकिंग"],
      usedBy: ["ओडिशा भर में 9 शैक्षणिक संस्थान"],
      icon: "BookOpen",
    },
    {
      slug: "billing-management",
      name: "बिलिंग मैनेजमेंट",
      summary: "व्यावसायिक इनवॉइसिंग और वित्तीय संचालन को सुव्यवस्थित करने की प्रणाली।",
      features: ["स्वचालित इनवॉइसिंग", "मल्टी-स्टोर बिलिंग", "आवर्ती व सदस्यता बिलिंग"],
      icon: "Receipt",
    },
    {
      slug: "sme-erp",
      name: "एसएमई-ईआरपी",
      summary: "लघु और मध्यम उद्यमों के लिए मुख्य व्यावसायिक प्रक्रियाओं का केंद्रीकरण।",
      features: ["भूमिका-आधारित डैशबोर्ड", "विभागीय वर्कफ़्लो मॉड्यूल", "एकीकृत व्यावसायिक डेटा"],
      icon: "Building2",
    },
    {
      slug: "bilingual-websites",
      name: "द्विभाषी वेबसाइट्स",
      summary: "समावेशी सार्वजनिक संचार के लिए अंग्रेजी/ओडिया बहुभाषी प्लेटफॉर्म।",
      features: ["अंग्रेजी ⇄ ओडिया भाषा स्विचिंग", "संरचित सामग्री प्रस्तुति", "संस्थागत परिनियोजन"],
      usedBy: ["एटीएलसी ओडिशा", "मां कटक चंडी"],
      icon: "Languages",
    },
    {
      slug: "augmented-reality",
      name: "ऑगमेंटेड रियलिटी",
      summary: "शिक्षा, जुड़ाव और रियल-टाइम विज़ुअलाइज़ेशन के लिए एआर अनुभव।",
      features: ["वास्तविक + आभासी ओवरले", "प्रदर्शनी व प्रशिक्षण उपयोग", "सरकारी पहल प्रदर्शन"],
      icon: "Scan",
    },
    {
      slug: "virtual-reality",
      name: "वर्चुअल रियलिटी",
      summary: "प्रशिक्षण, शिक्षा और उद्योग के लिए इमर्सिव वीआर वातावरण।",
      features: ["रीयल-टाइम रेंडरिंग", "औद्योगिक व सुरक्षा सिमुलेशन", "चिकित्सा व रक्षा उपयोग"],
      icon: "Glasses",
    },
    {
      slug: "hrms",
      name: "एचआरएमएस",
      summary: "कर्मचारी प्रबंधन और संगठनात्मक संचालन का स्वचालन।",
      features: ["भूमिका-आधारित व्यवस्थापक पहुंच", "कर्मचारी रिकॉर्ड प्रबंधन", "प्रदर्शन ट्रैकिंग"],
      icon: "Users",
    },
    {
      slug: "digital-certificate-management",
      name: "डिजिटल प्रमाणपत्र प्रबंधन",
      summary: "डिजिटल प्रमाणपत्रों के जारी करने, अनुमोदन और वितरण का स्वचालन।",
      features: ["ऑनलाइन अनुरोध प्रपत्र", "व्यवस्थापक अनुमोदन वर्कफ़्लो", "स्वतः उत्पन्न प्रमाणपत्र"],
      usedBy: ["ऑल ओडिशा टैक्स एडवोकेट्स एसोसिएशन"],
      icon: "FileBadge",
    },
    {
      slug: "iot",
      name: "आईओटी समाधान",
      summary: "रीयल-टाइम डेटा और स्वचालन के लिए भौतिक उपकरणों और सेंसरों को जोड़ना।",
      features: ["सेंसर एवं डिवाइस नेटवर्किंग", "रियल-टाइम डेटा एनालिटिक्स", "औद्योगिक स्वचालन"],
      icon: "Cpu",
    },
    {
      slug: "ecommerce",
      name: "ई-कॉमर्स एप्लिकेशन",
      summary: "कैटलॉग से लेकर चेकआउट तक संपूर्ण डिजिटल कॉमर्स प्लेटफॉर्म।",
      features: ["ग्राहक पंजीकरण व लॉगिन", "उत्पाद कैटलॉग व कार्ट", "सुरक्षित चेकआउट"],
      icon: "ShoppingCart",
    },
    {
      slug: "digital-directory",
      name: "डिजिटल डायरेक्टरी",
      summary: "संपर्क, व्यावसायिक सूची और संस्थागत संसाधनों के लिए केंद्रीकृत इलेक्ट्रॉनिक निर्देशिका।",
      features: ["केंद्रीकृत संपर्क प्रबंधन", "रियल-टाइम वेब और मोबाइल एक्सेस", "त्वरित खोज"],
      icon: "BookUser",
    },
    {
      slug: "online-voting",
      name: "ऑनलाइन वोटिंग",
      summary: "चुनाव कराने के लिए एक पारदर्शी और सुरक्षित डिजिटल प्लेटफॉर्म।",
      features: ["क्यूआर / ऑनलाइन मतदाता पंजीकरण", "पहचान सत्यापन", "सुरक्षित मतदान"],
      usedBy: ["ओडिशा मेडिकल सर्विसेज एसोसिएशन"],
      icon: "Vote",
    },
  ],
  or: [
    {
      slug: "safeact",
      name: "ସେଫ୍‌ଆକ୍ଟ",
      summary: "ରିଅଲ୍-ଟାଇମ୍ ଦୁର୍ଘଟଣା ରିପୋର୍ଟିଂ ଏବଂ ସୁରକ୍ଷା ନିୟମାବଳୀ ଟ୍ରାକିଂ ପାଇଁ ଶିଳ୍ପ ନିରାପତ୍ତା ପ୍ଲାଟଫର୍ମ।",
      features: ["ସୁରକ୍ଷିତ ଲଗ୍-ଇନ୍ ବ୍ୟବସ୍ଥା", "ଲାଇଭ୍ ସେଫ୍ଟି ଡ୍ୟାସବୋର୍ଡ", "ବିଭାଗୀୟ ନିରାପତ୍ତା ତଥ୍ୟ"],
      usedBy: ["ଟାଟା ସ୍ପଞ୍ଜ", "ଆଦିତ୍ୟ ବିର୍ଲା", "କଳିଙ୍ଗ ୟୁନିଟ୍ I ଓ II"],
      icon: "ShieldCheck",
    },
    {
      slug: "mobile-applications",
      name: "ମୋବାଇଲ୍ ଆପ୍ଲିକେସନ୍",
      summary: "ଓଡ଼ିଶା ସରକାରଙ୍କ କୃଷି ଓଡ଼ିଶା ୨୦୨୫ ସହଯୋଗରେ ନିର୍ମିତ ଅଭିନବ ମୋବାଇଲ୍ ସମାଧାନ।",
      features: ["ଭିଆର୍ ଆଧାରିତ ଶିକ୍ଷଣ", "ମେସିନାରୀ ସିମ୍ୟୁଲେସନ୍", "ସରକାରୀ ପ୍ରକଳ୍ପ ଡେଲିଭରି"],
      usedBy: ["କୃଷି ଓଡ଼ିଶା ୨୦୨୫ — ଓଡ଼ିଶା ସରକାର"],
      icon: "Sprout",
    },
    {
      slug: "education-erp",
      name: "ଏଜୁକେସନ୍ ଇଆରପି",
      summary: "କଲେଜ ଓ ବିଶ୍ୱବିଦ୍ୟାଳୟର ପ୍ରଶାସନିକ ତଥା ଶିକ୍ଷାଦାନ ପରିଚାଳନା ପାଇଁ ସ୍ମାର୍ଟ ERP।",
      features: ["ସୁରକ୍ଷିତ ଲଗ୍-ଇନ୍", "ଛାତ୍ର, ଅଭିଭାବକ ଓ ଶିକ୍ଷକ ଡ୍ୟାସବୋର୍ଡ", "ପାଠ୍ୟକ୍ରମ ଓ ପରୀକ୍ଷା ଫଳାଫଳ"],
      usedBy: ["ସରକାରୀ କଲେଜ ସୁନ୍ଦରଗଡ଼", "ବାଙ୍କୀ ସ୍ୱୟଂଶାସିତ କଲେଜ", "ସରବତୀ ଦେବୀ ମହିଳା କଲେଜ"],
      icon: "School",
    },
    {
      slug: "hotel-pms",
      name: "ହୋଟେଲ୍-ପିଏମ୍ଏସ୍",
      summary: "ହୋଟେଲ୍ ପରିଚାଳନା, ବୁକିଂ ଏବଂ ରୁମ୍ ମ୍ୟାନେଜମେଣ୍ଟ ପାଇଁ ସ୍ମାର୍ଟ ସିଷ୍ଟମ୍।",
      features: ["ସ୍ମାର୍ଟ ଷ୍ଟାଫ୍ ଲଗ୍-ଇନ୍", "ବୁକିଂ ଓ ବିଲିଂ ମ୍ୟାନେଜମେଣ୍ଟ", "ରୁମ୍ ଓ ଗେଷ୍ଟ ଟ୍ରାକିଂ"],
      icon: "BedDouble",
    },
    {
      slug: "library-management",
      name: "ଲାଇବ୍ରେରୀ ମ୍ୟାନେଜମେଣ୍ଟ",
      summary: "ଶିକ୍ଷାନୁଷ୍ଠାନମାନଙ୍କ ପାଇଁ ସ୍ୱୟଂଚାଳିତ ଡିଜିଟାଲ୍ ଲାଇବ୍ରେରୀ ପରିଚାଳନା ପ୍ରଣାଳୀ।",
      features: ["ଆଡମିନ୍ ଲଗ୍-ଇନ୍", "କେନ୍ଦ୍ରୀକୃତ ଡ୍ୟାସବୋର୍ଡ", "ପୁସ୍ତକ ପ୍ରଦାନ ଓ ଫାଇନ୍ ଟ୍ରାକିଂ"],
      usedBy: ["ଓଡ଼ିଶାର ୯ଟି ପ୍ରମୁଖ ଶିକ୍ଷାନୁଷ୍ଠାନ"],
      icon: "BookOpen",
    },
    {
      slug: "billing-management",
      name: "ବିଲିଂ ମ୍ୟାନେଜମେଣ୍ଟ",
      summary: "ବ୍ୟବସାୟିକ ଇନଭଏସିଂ ଏବଂ ଆର୍ଥିକ ହିସାବ ନିକାଶ ପାଇଁ ସ୍ମାର୍ଟ ବିଲିଂ ସଫ୍ଟୱେର୍।",
      features: ["ସ୍ୱୟଂଚାଳିତ ଇନଭଏସ୍", "ବହୁ-ଦୋକାନ ବିଲିଂ ସୁବିଧା", "ସବସ୍କ୍ରିପସନ୍ ବିଲିଂ"],
      icon: "Receipt",
    },
    {
      slug: "sme-erp",
      name: "SME-ERP",
      summary: "କ୍ଷୁଦ୍ର ଓ ମଧ୍ୟମ ଶିଳ୍ପ ଉଦ୍ୟୋଗ ପାଇଁ ସମନ୍ୱିତ ଏଣ୍ଟରପ୍ରାଇଜ୍ ରିସୋର୍ସ ପ୍ଲାନିଂ।",
      features: ["ରୋଲ୍-ବେସଡ୍ ଡ୍ୟାସବୋର୍ଡ", "ବିଭାଗୀୟ ୱାର୍କଫ୍ଲୋ", "ସମନ୍ୱିତ ବ୍ୟବସାୟ ତଥ୍ୟ"],
      icon: "Building2",
    },
    {
      slug: "bilingual-websites",
      name: "ଦ୍ୱିଭାଷୀ ୱେବସାଇଟ୍",
      summary: "ଇଂରାଜୀ ଏବଂ ଓଡ଼ିଆ ଭାଷାରେ ସରକାରୀ ଓ ସାଂସ୍ଥାନିକ ଡିଜିଟାଲ୍ ପ୍ଲାଟଫର୍ମ।",
      features: ["ଇଂରାଜୀ ⇄ ଓଡ଼ିଆ ଭାଷା ପରିବର୍ତ୍ତନ", "ସଂରଚିତ ବିଷୟବସ୍ତୁ", "ସରକାରୀ ସ୍ୱୀକୃତି"],
      usedBy: ["ATLC ଓଡ଼ିଶା", "ମା' କଟକ ଚଣ୍ଡୀ"],
      icon: "Languages",
    },
    {
      slug: "augmented-reality",
      name: "ଅଗମେଣ୍ଟେଡ୍ ରିଆଲିଟି (AR)",
      summary: "ପ୍ରଶିକ୍ଷଣ, ପ୍ରଦର୍ଶନୀ ଏବଂ ରିଅଲ୍-ଟାଇମ୍ ଭିଜୁଆଲାଇଜେସନ୍ ପାଇଁ AR ସମାଧାନ।",
      features: ["ବାସ୍ତବ ଓ ଭର୍ଚୁଆଲ୍ ସମନ୍ୱୟ", "ପ୍ରଶିକ୍ଷଣ ସିମ୍ୟୁଲେସନ୍", "ସରକାରୀ ପ୍ରଦର୍ଶନୀ"],
      icon: "Scan",
    },
    {
      slug: "virtual-reality",
      name: "ଭର୍ଚୁଆଲ୍ ରିଆଲିଟି (VR)",
      summary: "ଶିଳ୍ପ ପ୍ରଶିକ୍ଷଣ, ଡାକ୍ତରୀ ଶିକ୍ଷା ଏବଂ ପ୍ରତିରକ୍ଷା ପାଇଁ ଇମର୍ସିଭ୍ VR ସିମ୍ୟୁଲେସନ୍।",
      features: ["ରିଅଲ୍-ଟାଇମ୍ 3D ରେଣ୍ଡରିଂ", "ଶିଳ୍ପ ନିରାପତ୍ତା ସିମ୍ୟୁଲେସନ୍", "ମେଡିକାଲ୍ ଓ ଡିଫେନ୍ସ ବ୍ୟବହାର"],
      icon: "Glasses",
    },
    {
      slug: "hrms",
      name: "HRMS",
      summary: "କର୍ମଚାରୀ ପରିଚାଳନା, ଉପସ୍ଥାନ ଏବଂ ସାଂଗଠନିକ କାର୍ଯ୍ୟର ସ୍ୱୟଂଚାଳନ।",
      features: ["ରୋଲ୍-ବେସଡ୍ ଆଡମିନ୍ ସୁବିଧା", "କର୍ମଚାରୀ ରେକର୍ଡ ପରିଚାଳନା", "ପରଫରମାନ୍ସ ଟ୍ରାକିଂ"],
      icon: "Users",
    },
    {
      slug: "digital-certificate-management",
      name: "ଡିଜିଟାଲ୍ ସାର୍ଟିଫିକେଟ୍ ମ୍ୟାନେଜମେଣ୍ଟ",
      summary: "ଡିଜିଟାଲ୍ ପ୍ରମାଣପତ୍ର ପ୍ରଦାନ, ଅନୁମୋଦନ ଏବଂ ଡାଉନଲୋଡ୍ ପାଇଁ ସ୍ୱୟଂଚାଳିତ ପ୍ରଣାଳୀ।",
      features: ["ଅନଲାଇନ୍ ଆବେଦନ ଫର୍ମ", "ଆଡମିନ୍ ଅନୁମୋଦନ ବ୍ୟବସ୍ଥା", "ଅଟୋ-ଜେନେରେଟେଡ୍ ସାର୍ଟିଫିକେଟ୍"],
      usedBy: ["ଅଲ୍ ଓଡ଼ିଶା ଟ୍ୟାକ୍ସ ଆଡଭୋକେଟ୍ସ ଆସୋସିଏସନ୍"],
      icon: "FileBadge",
    },
    {
      slug: "iot",
      name: "IoT ସମାଧାନ",
      summary: "ରିଅଲ୍-ଟାଇମ୍ ତଥ୍ୟ ସଂଗ୍ରହ ଏବଂ ଅଟୋମେସନ୍ ପାଇଁ ସ୍ମାର୍ଟ ସେନ୍ସର୍ ସଂଯୋଗ।",
      features: ["ସେନ୍ସର୍ ଓ ଡିଭାଇସ୍ ନେଟୱର୍କିଂ", "ରିଅଲ୍-ଟାଇମ୍ ଡାଟା ଆନାଲିଟିକ୍ସ", "ଶିଳ୍ପ ଅଟୋମେସନ୍"],
      icon: "Cpu",
    },
    {
      slug: "ecommerce",
      name: "ଇ-କମର୍ସ ଆପ୍ଲିକେସନ୍",
      summary: "ଉତ୍ପାଦ କାଟାଲଗ୍‌ରୁ ସୁରକ୍ଷିତ ପେମେଣ୍ଟ ଗେଟୱେ ପର୍ଯ୍ୟନ୍ତ ସମ୍ପୂର୍ଣ୍ଣ ଡିଜିଟାଲ୍ ବ୍ୟବସାୟ।",
      features: ["ଗ୍ରାହକ ପଞ୍ଜୀକରଣ ଓ ଲଗ୍-ଇନ୍", "ପ୍ରଡକ୍ଟ କାର୍ଟ ସୁବିଧା", "ସୁରକ୍ଷିତ ଚେକ୍‌ଆଉଟ୍"],
      icon: "ShoppingCart",
    },
    {
      slug: "digital-directory",
      name: "ଡିଜିଟାଲ୍ ଡାଇରେକ୍ଟୋରୀ",
      summary: "ସମ୍ପର୍କ ସୂଚୀ, ବ୍ୟବସାୟିକ ତାଲିକା ଏବଂ ସାଂସ୍ଥାନିକ ସମ୍ବଳ ପାଇଁ କେନ୍ଦ୍ରୀକୃତ ଡିଜିଟାଲ୍ ଡାଇରେକ୍ଟୋରୀ।",
      features: ["କେନ୍ଦ୍ରୀକୃତ ସମ୍ପର୍କ ପରିଚାଳନା", "ୱେବ୍ ଓ ମୋବାଇଲ୍ ଆକ୍ସେସ୍", "ଦ୍ରୁତ ସନ୍ଧାନ ସୁବିଧା"],
      icon: "BookUser",
    },
    {
      slug: "online-voting",
      name: "ଅନଲାଇନ୍ ଭୋଟିଂ",
      summary: "ନିର୍ବାଚନ ଏବଂ ସଂଘୀୟ ମତଦାନ ପାଇଁ ସ୍ୱଚ୍ଛ ଓ ସୁରକ୍ଷିତ ଡିଜିଟାଲ୍ ପ୍ଲାଟଫର୍ମ।",
      features: ["QR / ଅନଲାଇନ୍ ଭୋଟର୍ ପଞ୍ଜୀକରଣ", "ପରିଚୟ ଯାଞ୍ଚ", "ସୁରକ୍ଷିତ ମତଦାନ ପ୍ରଣାଳୀ"],
      usedBy: ["ଓଡ଼ିଶା ମେଡିକାଲ୍ ସର୍ଭିସେସ୍ ଆସୋସିଏସନ୍"],
      icon: "Vote",
    },
  ],
};

const FEATURED = ["safeact", "mobile-applications", "education-erp"];

export function ProductsShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { lang, t } = useLanguage();

  const currentProducts = PRODUCTS_MAP[lang] || PRODUCTS_MAP.en;

  const CATEGORIES = [
    {
      id: "all",
      label: lang === "hi" ? "सभी उत्पाद" : lang === "or" ? "ସମସ୍ତ ପ୍ରଡକ୍ଟ" : "All Products",
    },
    {
      id: "enterprise",
      label: lang === "hi" ? "एंटरप्राइज व सुरक्षा" : lang === "or" ? "ଶିଳ୍ପ ଓ ସୁରକ୍ଷା" : "Enterprise & Safety",
      slugs: ["safeact", "payroll-software", "inventory-software", "asset-management", "crm-software", "sme-erp", "hrms", "iot"],
    },
    {
      id: "institutional",
      label: lang === "hi" ? "कैंपस व शिक्षा" : lang === "or" ? "ଶିକ୍ଷା ଓ କଲେଜ" : "Campus & Education",
      slugs: ["education-erp", "school-management", "college-management", "library-management", "bilingual-websites", "digital-certificate-management"],
    },
    {
      id: "specialized",
      label: lang === "hi" ? "हेल्थकेयर व होटल" : lang === "or" ? "ହସ୍ପିଟାଲ୍ ଓ ହୋଟେଲ୍" : "Healthcare & Hospitality",
      slugs: ["hotel-pms", "billing-management", "ecommerce", "online-voting", "augmented-reality", "virtual-reality", "digital-directory"],
    },
  ];

  const featured = FEATURED.map((slug) => currentProducts.find((p) => p.slug === slug)!).filter(Boolean);
  
  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory);
  const filteredProducts = currentProducts.filter((p) => {
    if (activeCategory === "all") return true;
    return currentCategory?.slugs?.includes(p.slug);
  });

  return (
    <section className="relative overflow-hidden py-24">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -left-48 top-1/2 h-96 w-96 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t("products_eyebrow")}
            title={t("products_title")}
            description={t("products_subtitle")}
          />
          <Reveal delay={0.1}>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold shadow-sm transition hover:border-primary/50 hover:text-primary"
            >
              {t("products_view_all")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* Featured 3 Flagship Products with 3D Tilt Spotlight */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {featured.map((product, i) => (
            <Reveal key={product.slug} delay={i * 0.08}>
              <SpotlightCard
                enableTilt={true}
                className="h-full shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/15"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group relative flex h-full flex-col justify-between p-8"
                >
                  <div
                    className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/[0.06] blur-3xl transition-transform duration-700 group-hover:scale-125"
                    aria-hidden="true"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-1.5 w-0 bg-gradient-to-r from-primary via-accent to-accent-strong transition-all duration-500 group-hover:w-full"
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                        <Icon name={product.icon} className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{product.summary}</p>

                    <ul className="mt-6 space-y-2">
                      {product.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-muted">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {product.usedBy?.length ? (
                    <div className="relative mt-8 border-t border-border/70 pt-4">
                      <p className="text-[11px] font-semibold text-foreground">
                        {lang === "hi"
                          ? "प्रमाणित परिनियोजन:"
                          : lang === "or"
                          ? "ପ୍ରମାଣିତ ପ୍ରକଳ୍ପ:"
                          : "Verified Deployments:"}
                      </p>
                      <p className="mt-1 text-xs text-muted line-clamp-1">{product.usedBy.join(" · ")}</p>
                    </div>
                  ) : (
                    <div className="relative mt-8 border-t border-border/70 pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                        {lang === "hi"
                          ? "आर्किटेक्चर देखें"
                          : lang === "or"
                          ? "ଆର୍କିଟେକ୍ଚର ଦେଖନ୍ତୁ"
                          : "Learn architecture"}{" "}
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  )}
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Category Filter Tabs for Extended Ecosystem */}
        <div className="mt-14 border-t border-border/70 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {lang === "hi"
                  ? `सभी प्रणालियां देखें (${currentProducts.length} उत्पाद)`
                  : lang === "or"
                  ? `ସମସ୍ତ ସଫ୍ଟୱେର୍ (${currentProducts.length}ଟି ପ୍ରଡକ୍ଟ)`
                  : `Explore Full Suite (${currentProducts.length} systems)`}
              </span>
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "border border-border bg-surface text-muted hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group flex h-full items-center gap-3 rounded-2xl border border-border/80 bg-surface/90 px-4 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/[0.02] hover:shadow-md hover:shadow-primary/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white">
                      <Icon name={product.icon} className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {product.name}
                      </span>
                      <span className="block truncate text-[11px] text-muted">{product.features[0]}</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-primary" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
