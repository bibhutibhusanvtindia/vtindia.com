"use client";

import { VoiceLanguage } from "@/lib/sound";
import { site } from "@/data/site";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { clients } from "@/data/portfolio";
import { team } from "@/data/team";

export interface BotAnswer {
  text: string;
  speechText: string;
  actionUrl?: string;
  actionLabel?: string;
}

export const SUGGESTED_QUESTIONS_BY_LANG: Record<VoiceLanguage, string[]> = {
  en: [
    "What is SafeAct VR Simulator?",
    "Tell me about Education ERP",
    "How many clients do you have?",
    "Where are your office locations?",
    "Who founded Virtoy Technologies?",
    "How can I get a project quote?",
  ],
  hi: [
    "सेफएक्ट वीआर सिम्युलेटर क्या है?",
    "एजुकेशन ईआरपी के बारे में बताएं",
    "आपके कितने क्लाइंट्स हैं?",
    "आपके कार्यालय कहां स्थित हैं?",
    "विर्टॉय के संस्थापक कौन हैं?",
    "प्रोजेक्ट कोट कैसे प्राप्त करें?",
  ],
  or: [
    "ସେଫ୍‌ଆକ୍ଟ ଭିଆର୍ ସିମ୍ୟୁଲେଟର କ'ଣ?",
    "ଏଜୁକେସନ୍ ଇଆରପି ବିଷୟରେ କୁହନ୍ତୁ",
    "ଆପଣଙ୍କର କେତୋଟି କ୍ଲାଏଣ୍ଟ ଅଛନ୍ତି?",
    "ଆପଣଙ୍କ ଅଫିସ୍ କେଉଁଠାରେ ଅଛି?",
    "ଭର୍ଚ୍ଚୋଏର ପ୍ରତିଷ୍ଠାତା କିଏ?",
    "ପ୍ରୋଜେକ୍ଟ କୋଟେସନ୍ କିପରି ପାଇବି?",
  ],
};

export const SUGGESTED_QUESTIONS = SUGGESTED_QUESTIONS_BY_LANG.en;

export function getSuggestedQuestions(lang: VoiceLanguage = "en"): string[] {
  return SUGGESTED_QUESTIONS_BY_LANG[lang] || SUGGESTED_QUESTIONS_BY_LANG.en;
}

export function getWelcomeGreeting(lang: VoiceLanguage = "en"): BotAnswer {
  switch (lang) {
    case "hi":
      return {
        text: "विर्टॉय टेक्नोलॉजीज प्राइवेट लिमिटेड में आपका स्वागत है! आज हम आपके व्यवसाय, उत्पादों या सॉफ्टवेयर समाधानों में किस प्रकार सहायता कर सकते हैं?",
        speechText: "विर्टॉय टेक्नोलॉजीज प्राइवेट लिमिटेड में आपका स्वागत है।",
        actionUrl: "/products",
        actionLabel: "16 उत्पाद देखें",
      };
    case "or":
      return {
        text: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ପ୍ରାଇଭେଟ୍ ଲିମିଟେଡ୍‌ରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ! ଆଜି ଆମେ ଆପଣଙ୍କ ବ୍ୟବସାୟ, ସଫ୍ଟୱେର୍ ବା ପ୍ରଡକ୍ଟ ସମ୍ବନ୍ଧରେ କିପରି ସାହାଯ୍ୟ କରିପାରିବା?",
        speechText: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ପ୍ରାଇଭେଟ୍ ଲିମିଟେଡ୍‌ରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।",
        actionUrl: "/products",
        actionLabel: "୧୬ଟି ପ୍ରଡକ୍ଟ ଦେଖନ୍ତୁ",
      };
    case "en":
    default:
      return {
        text: "Welcome to Virtoy Technologies Private Limited! How can I assist you with our products, services, or software solutions today?",
        speechText: "Welcome to Virtoy Technologies Private Limited.",
        actionUrl: "/products",
        actionLabel: "Explore 16 Products",
      };
  }
}

/**
 * Knowledge Engine strictly grounded on vtindia.com verified data across English, Hindi, and Odia
 */
export function answerCustomerQuery(query: string, lang: VoiceLanguage = "en"): BotAnswer {
  const q = query.toLowerCase().trim();

  // 1. Safeact / VR / AR
  if (
    q.includes("safeact") ||
    q.includes("safety") ||
    q.includes("hazard") ||
    q.includes("turbine") ||
    q.includes("सुरक्षा") ||
    q.includes("सेफएक्ट") ||
    q.includes("ସେଫ୍") ||
    q.includes("ନିରାପତ୍ତା")
  ) {
    if (lang === "hi") {
      return {
        text: "सेफएक्ट विर्टॉय का औद्योगिक सुरक्षा और अनुपालन प्लेटफॉर्म है। यह कलिंगा यूनिट 1 और 2 में पायलट किए गए रियल-टाइम इंसिडेंट रिपोर्टिंग और वीआर हैज़र्ड सिमुलेशन प्रदान करता है।",
        speechText:
          "सेफएक्ट हमारा औद्योगिक सुरक्षा प्लेटफॉर्म है जो रियल-टाइम इंसिडेंट रिपोर्टिंग और वर्चुअल रियलिटी सिमुलेशन प्रदान करता है।",
        actionUrl: "/products/safeact",
        actionLabel: "सेफएक्ट विवरण देखें",
      };
    }
    if (lang === "or") {
      return {
        text: "ସେଫ୍‌ଆକ୍ଟ ହେଉଛି ଭର୍ଚ୍ଚୋଏର ଶିଳ୍ପ ନିରାପତ୍ତା ପ୍ଲାଟଫର୍ମ। ଏହା କଳିଙ୍ଗ ୟୁନିଟ୍ ୧ ଓ ୨ ରେ ପରୀକ୍ଷିତ ରିଅଲ୍-ଟାଇମ୍ ଇନସିଡେଣ୍ଟ ରିପୋର୍ଟିଂ ଏବଂ ଭିଆର୍ ସିମ୍ୟୁଲେସନ୍ ପ୍ରଦାନ କରେ।",
        speechText:
          "ସେଫ୍‌ଆକ୍ଟ ଆମର ଶିଳ୍ପ ନିରାପତ୍ତା ଏବଂ ଭର୍ଚୁଆଲ୍ ରିଆଲିଟି ସିମ୍ୟୁଲେସନ୍ ପ୍ଲାଟଫର୍ମ।",
        actionUrl: "/products/safeact",
        actionLabel: "ସେଫ୍‌ଆକ୍ଟ ଦେଖନ୍ତୁ",
      };
    }
    return {
      text: "SafeAct is Virtoy's industrial workplace safety platform. It provides real-time incident reporting, department-level compliance visualization (piloted at Kalinga Units I and II), and VR hazard simulations with 6-DoF physics.",
      speechText:
        "SafeAct is our industrial workplace safety platform. It provides real-time incident reporting and virtual reality hazard simulations for heavy industries.",
      actionUrl: "/products/safeact",
      actionLabel: "View SafeAct Details",
    };
  }

  // 2. Krushi Odisha / Agriculture / Mobile App
  if (
    q.includes("krushi") ||
    q.includes("agriculture") ||
    q.includes("farming") ||
    q.includes("mobile app") ||
    q.includes("कृषि") ||
    q.includes("किसान") ||
    q.includes("କୃଷି") ||
    q.includes("ଚାଷୀ")
  ) {
    if (lang === "hi") {
      return {
        text: "कृषि ओडिशा 2025 मोबाइल और वीआर समाधान ओडिशा सरकार के सहयोग से 40,000 से अधिक किसानों को वर्चुअल मशीनरी सिमुलेशन और प्रशिक्षण प्रदान करने के लिए विकसित किया गया था।",
        speechText:
          "कृषि ओडिशा 2025 ओडिशा सरकार के सहयोग से विकसित किया गया एक प्रमुख मोबाइल और वर्चुअल रियलिटी समाधान है।",
        actionUrl: "/products/mobile-applications",
        actionLabel: "मोबाइल समाधान देखें",
      };
    }
    if (lang === "or") {
      return {
        text: "ଆମର କୃଷି ଓଡ଼ିଶା ୨୦୨୫ ମୋବାଇଲ୍ ଓ ଭିଆର୍ ସମାଧାନ ଓଡ଼ିଶା ସରକାରଙ୍କ ସହଯୋଗରେ ୪୦,୦୦୦ ରୁ ଅଧିକ ଚାଷୀଙ୍କୁ ଉନ୍ନତ କୃଷି ପ୍ରଶିକ୍ଷଣ ଦେବା ପାଇଁ ପ୍ରସ୍ତୁତ କରାଯାଇଥିଲା।",
        speechText:
          "କୃଷି ଓଡ଼ିଶା ୨୦୨୫ ଓଡ଼ିଶା ସରକାରଙ୍କ ସହଭାଗିତାରେ ପ୍ରସ୍ତୁତ ଏକ ଅଭିନବ ମୋବାଇଲ୍ ଓ ଭିଆର୍ ପ୍ରକଳ୍ପ।",
        actionUrl: "/products/mobile-applications",
        actionLabel: "ମୋବାଇଲ୍ ସମାଧାନ ଦେଖନ୍ତୁ",
      };
    }
    return {
      text: "Our flagship Krushi Odisha 2025 mobile & VR solution was developed in collaboration with the Government of Odisha to deliver experiential farming training and virtual machinery simulations to over 40,000 farmers.",
      speechText:
        "Krushi Odisha 2025 was developed for the Government of Odisha, integrating mobile access with virtual reality simulations for agricultural communities.",
      actionUrl: "/products/mobile-applications",
      actionLabel: "Explore Mobile Solutions",
    };
  }

  // 3. AR / VR Suite
  if (
    q.includes("ar") ||
    q.includes("vr") ||
    q.includes("virtual reality") ||
    q.includes("augmented") ||
    q.includes("वीआर") ||
    q.includes("एआर") ||
    q.includes("ଭିଆର୍") ||
    q.includes("ଏଆର୍")
  ) {
    if (lang === "hi") {
      return {
        text: "विर्टॉय औद्योगिक सुरक्षा, स्वास्थ्य सेवा सिमुलेशन और सरकारी पहलों के लिए उच्च-गुणवत्ता वाले एआर और वीआर अनुभव विकसित करता है।",
        speechText:
          "विर्टॉय इंडस्ट्रियल सेफ्टी और एजुकेशनल आउटरीच के लिए एडवांस्ड एआर और वीआर अनुभव तैयार करता है।",
        actionUrl: "/products/virtual-reality",
        actionLabel: "एआर / वीआर सूट देखें",
      };
    }
    if (lang === "or") {
      return {
        text: "ଭର୍ଚ୍ଚୋଏ ଶିଳ୍ପ ନିରାପତ୍ତା, ସ୍ୱାସ୍ଥ୍ୟସେବା ଏବଂ ସରକାରୀ ଯୋଜନା ପାଇଁ ଉଚ୍ଚମାନର ଏଆର୍ ଓ ଭିଆର୍ ଅନୁଭୂତି ନିର୍ମାଣ କରେ।",
        speechText:
          "ଭର୍ଚ୍ଚୋଏ ଇଣ୍ଡଷ୍ଟ୍ରିଆଲ୍ ସେଫ୍ଟି ଏବଂ ତାଲିମ ପାଇଁ ଅତ୍ୟାଧୁନିକ ଏଆର୍ ଓ ଭିଆର୍ ସିମ୍ୟୁଲେସନ୍ ପ୍ରଦାନ କରେ।",
        actionUrl: "/products/virtual-reality",
        actionLabel: "ଏଆର୍ / ଭିଆର୍ ଦେଖନ୍ତୁ",
      };
    }
    return {
      text: "Virtoy builds high-fidelity AR & VR experiences for industrial safety, healthcare simulations, and government outreach — transforming complex manual procedures into interactive spatial simulations.",
      speechText:
        "Virtoy builds high-fidelity AR and VR experiences for industrial safety, educational outreach, and interactive simulations.",
      actionUrl: "/products/virtual-reality",
      actionLabel: "Explore AR / VR Suite",
    };
  }

  // 4. Education ERP / Library / Campus
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("campus") ||
    q.includes("school") ||
    q.includes("naac") ||
    q.includes("कॉलेज") ||
    q.includes("शिक्षा") ||
    q.includes("ईआरपी") ||
    q.includes("କଲେଜ") ||
    q.includes("ଶିକ୍ଷା") ||
    q.includes("ଇଆରପି")
  ) {
    if (lang === "hi") {
      return {
        text: "विर्टॉय एजुकेशन ईआरपी विश्वविद्यालयों और कॉलेजों के लिए डिजिटल कैंपस प्रबंधन प्रदान करता है, जिसे बांकी ऑटोनॉमस कॉलेज, गवर्नमेंट कॉलेज सुंदरगढ़ और सर्बती देवी कॉलेज में 8+ विभागों में लागू किया गया है।",
        speechText:
          "हमारा एजुकेशन ईआरपी ओडिशा के प्रमुख कॉलेजों और विश्वविद्यालयों के लिए डिजिटल कैंपस प्रबंधन समाधान प्रदान करता है।",
        actionUrl: "/products/education-erp",
        actionLabel: "एजुकेशन ईआरपी देखें",
      };
    }
    if (lang === "or") {
      return {
        text: "ଭର୍ଚ୍ଚୋଏ ଏଜୁକେସନ୍ ଇଆରପି କଲେଜ ଏବଂ ବିଶ୍ୱବିଦ୍ୟାଳୟଗୁଡ଼ିକ ପାଇଁ ଡିଜିଟାଲ୍ କ୍ୟାମ୍ପସ୍ ପରିଚାଳନା ପ୍ରଦାନ କରେ, ଯାହା ବାଙ୍କୀ ଅଟୋନୋମସ୍ କଲେଜ, ସୁନ୍ଦରଗଡ଼ ସରକାରୀ କଲେଜ ଏବଂ ସର୍ବତୀ ଦେବୀ ମହିଳା କଲେଜରେ କାର୍ଯ୍ୟକ୍ଷମ।",
        speechText:
          "ଆମର ଏଜୁକେସନ୍ ଇଆରପି ଓଡ଼ିଶାର ପ୍ରମୁଖ କଲେଜମାନଙ୍କ ପାଇଁ ଡିଜିଟାଲ୍ କ୍ୟାମ୍ପସ୍ ମ୍ୟାନେଜମେଣ୍ଟ ପ୍ରଦାନ କରେ।",
        actionUrl: "/products/education-erp",
        actionLabel: "ଏଜୁକେସନ୍ ଇଆରପି ଦେଖନ୍ତୁ",
      };
    }
    return {
      text: "Virtoy Education ERP provides digital campus management for universities and autonomous colleges. Used by institutions like Banki Autonomous College, Government College Sundargarh, and Sarbati Devi Women's College across 8+ academic departments.",
      speechText:
        "Our Education ERP provides digital campus management, student and faculty portals, and study material distribution for colleges and universities across Odisha.",
      actionUrl: "/products/education-erp",
      actionLabel: "Explore Education ERP",
    };
  }

  // 5. Library Management
  if (
    q.includes("library") ||
    q.includes("book") ||
    q.includes("लाइब्रेरी") ||
    q.includes("पुस्तक") ||
    q.includes("ଲାଇବ୍ରେରୀ") ||
    q.includes("ବହି")
  ) {
    if (lang === "hi") {
      return {
        text: "हमारा लाइब्रेरी मैनेजमेंट सिस्टम पुस्तकों की कैटलॉगिंग, छात्र रिकॉर्ड और रिटर्न शेड्यूल को ऑटोमेट करता है। यह ओडिशा के 9 से अधिक संस्थानों में सक्रिय है।",
        speechText:
          "विर्टॉय का लाइब्रेरी मैनेजमेंट सिस्टम शिक्षण संस्थानों में किताबों और छात्र रिकॉर्ड का प्रबंधन आसान बनाता है।",
        actionUrl: "/products/library-management",
        actionLabel: "लाइब्रेरी सिस्टम देखें",
      };
    }
    if (lang === "or") {
      return {
        text: "ଆମର ଲାଇବ୍ରେରୀ ମ୍ୟାନେଜମେଣ୍ଟ ସିଷ୍ଟମ୍ ପୁସ୍ତକ ତାଲିକା, ଛାତ୍ର ରେକର୍ଡ ଏବଂ ଫେରସ୍ତ କାର୍ଯ୍ୟସୂଚୀକୁ ସ୍ୱୟଂଚାଳିତ କରେ, ଯାହା ଓଡ଼ିଶାର ୯ଟି ଶିକ୍ଷାନୁଷ୍ଠାନରେ ବ୍ୟବହୃତ।",
        speechText:
          "ଭର୍ଚ୍ଚୋଏର ଲାଇବ୍ରେରୀ ମ୍ୟାନେଜମେଣ୍ଟ ସିଷ୍ଟମ୍ ଶିକ୍ଷାନୁଷ୍ଠାନଗୁଡ଼ିକରେ ବହି ଓ ଛାତ୍ର ରେକର୍ଡ ପରିଚାଳନା ସହଜ କରେ।",
        actionUrl: "/products/library-management",
        actionLabel: "ଲାଇବ୍ରେରୀ ସିଷ୍ଟମ୍ ଦେଖନ୍ତୁ",
      };
    }
    return {
      text: "Our Library Management System automates cataloging, student borrower records, return schedules, and fine calculations. Deployed at 9+ educational institutions across Odisha.",
      speechText:
        "Virtoy's Library Management System automates book tracking, borrower records, and return schedules across educational institutions.",
      actionUrl: "/products/library-management",
      actionLabel: "View Library System",
    };
  }

  // 6. Hotel PMS
  if (
    q.includes("hotel") ||
    q.includes("pms") ||
    q.includes("room") ||
    q.includes("होटल") ||
    q.includes("हୋଟେଲ")
  ) {
    if (lang === "hi") {
      return {
        text: "होटल पीएमएस विर्टॉय का प्रॉपर्टी मैनेजमेंट सिस्टम है जो होटल डायोनिक्स और शेर्टिनेको रिज़ॉर्ट जैसे प्रतिष्ठानों के लिए आरक्षण, चेक-इन और बिलिंग को सरल बनाता है।",
        speechText:
          "होटल पीएमएस हॉस्पिटैलिटी व्यवसाय के लिए कमरों के आरक्षण और बिलिंग को सुगम बनाता है।",
        actionUrl: "/products/hotel-pms",
        actionLabel: "होटल पीएमएस देखें",
      };
    }
    if (lang === "or") {
      return {
        text: "ହୋଟେଲ୍ ପିଏମ୍ଏସ୍ ହେଉଛି ଭର୍ଚ୍ଚୋଏର ପ୍ରପର୍ଟି ମ୍ୟାନେଜମେଣ୍ଟ ସିଷ୍ଟମ୍ ଯାହା ହୋଟେଲ୍ ଡାୟୋନିକ୍ସ ଏବଂ ଶେର୍ଟିନେକୋ ରିସୋର୍ଟ ଭଳି ହୋଟେଲଗୁଡ଼ିକ ପାଇଁ ବୁକିଂ ଏବଂ ବିଲିଂ ପରିଚାଳନା କରେ।",
        speechText:
          "ହୋଟେଲ୍ ପିଏମ୍ଏସ୍ ବୁକିଂ, ଅତିଥି ପରିଚାଳନା ଏବଂ ବିଲିଂକୁ ସରଳ କରିଥାଏ।",
        actionUrl: "/products/hotel-pms",
        actionLabel: "ହୋଟେଲ୍ ପିଏମ୍ଏସ୍ ଦେଖନ୍ତୁ",
      };
    }
    return {
      text: "Hotel PMS is Virtoy's property management system streamlining reservations, check-in/out, housekeeping, and billing for hotels and resorts such as Hotel Dionyx and Shertineco Resort.",
      speechText:
        "Hotel PMS streamlines reservations, guest management, and billing for hospitality businesses.",
      actionUrl: "/products/hotel-pms",
      actionLabel: "View Hotel PMS",
    };
  }

  // 7. Clients & Portfolio
  if (
    q.includes("client") ||
    q.includes("customer") ||
    q.includes("portfolio") ||
    q.includes("work") ||
    q.includes("trust") ||
    q.includes("क्लाइंट") ||
    q.includes("ग्राहक") ||
    q.includes("ଗ୍ରାହକ") ||
    q.includes("କ୍ଲାଏଣ୍ଟ")
  ) {
    if (lang === "hi") {
      return {
        text: "विर्टॉय टेक्नोलॉजीज के पूर्वी भारत में 84 से अधिक प्रमाणित क्लाइंट्स हैं, जिनमें टाटा स्टील, आरती स्टील्स, पारादीप फॉस्फेट्स, हाई कोर्ट बार एसोसिएशन, सालेपुर कॉलेज और ओडिशा सरकार शामिल हैं।",
        speechText:
          "हमारे पास 84 से अधिक प्रमाणित क्लाइंट्स हैं जिनमें प्रमुख उद्योग, सरकारी विभाग और शैक्षणिक संस्थान शामिल हैं।",
        actionUrl: "/clients",
        actionLabel: "सभी 84 क्लाइंट्स देखें",
      };
    }
    if (lang === "or") {
      return {
        text: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍‌ର ପୂର୍ବ ଭାରତରେ ୮୪ ରୁ ଅଧିକ ପ୍ରମାଣିତ କ୍ଲାଏଣ୍ଟ ରହିଛନ୍ତି, ଯେଉଁଥିରେ ଟାଟା ଷ୍ଟିଲ୍, ଆରତୀ ଷ୍ଟିଲ୍ସ, ପାରାଦ୍ୱୀପ ଫସଫେଟ୍ସ, ହାଇକୋର୍ଟ ବାର୍ ଆସୋସିଏସନ୍, ସାଲେପୁର କଲେଜ ଏବଂ ଓଡ଼ିଶା ସରକାର ଅନ୍ତର୍ଭୁକ୍ତ।",
        speechText:
          "ଆମର ୮୪ ରୁ ଅଧିକ ପ୍ରମାଣିତ ଗ୍ରାହକ ରହିଛନ୍ତି ଯେଉଁଥିରେ ଶିଳ୍ପ, ସରକାରୀ ବିଭାଗ ଏବଂ କଲେଜ ଅନ୍ତର୍ଭୁକ୍ତ।",
        actionUrl: "/clients",
        actionLabel: "ସମସ୍ତ ୮୪ ଗ୍ରାହକ ଦେଖନ୍ତୁ",
      };
    }
    return {
      text: `Virtoy Technologies has 84+ verified institutional deployments across Eastern India, including Tata Steel, Aarti Steels, Paradeep Phosphates, High Court Bar Association, Salipur College, and the Government of Odisha.`,
      speechText:
        "We have over 84 verified client deployments spanning educational institutions, heavy industries, government bodies, and healthcare organizations.",
      actionUrl: "/clients",
      actionLabel: "View All 84 Clients",
    };
  }

  // 8. Founders, Leadership & Team
  if (
    q.includes("founder") ||
    q.includes("ceo") ||
    q.includes("anup") ||
    q.includes("pritiranjan") ||
    q.includes("team") ||
    q.includes("iit") ||
    q.includes("who") ||
    q.includes("संस्थापक") ||
    q.includes("सीईओ") ||
    q.includes("टीम") ||
    q.includes("ପ୍ରତିଷ୍ଠାତା") ||
    q.includes("ସିଇଓ") ||
    q.includes("ଟିମ୍")
  ) {
    if (lang === "hi") {
      return {
        text: "विर्टॉय की सह-स्थापना श्री अनूप पटनायक (आईआईटी पूर्व छात्र) द्वारा की गई थी और इसका नेतृत्व श्री प्रीतिरंजन साहू (सीईओ), श्रीमती पियाली साहू (सीओओ) और श्री कैलाश पटनायक (वरिष्ठ नैक सलाहकार) द्वारा किया जा रहा है।",
        speechText:
          "विर्टॉय टेक्नोलॉजीज की स्थापना आईआईटी पूर्व छात्र अनूप पटनायक द्वारा की गई थी और इसका नेतृत्व सीईओ प्रीतिरंजन साहू एवं सीओओ पियाली साहू कर रहे हैं।",
        actionUrl: "/team",
        actionLabel: "टीम से मिलें",
      };
    }
    if (lang === "or") {
      return {
        text: "ଭର୍ଚ୍ଚୋଏ ଶ୍ରୀ ଅନୁପ ପଟ୍ଟନାୟକ (ସହ-ପ୍ରତିଷ୍ଠାତା, ଆଇଆଇଟି ପୂର୍ବତନ ଛାତ୍ର)ଙ୍କ ଦ୍ୱାରା ପ୍ରତିଷ୍ଠିତ ଏବଂ ଏହାର ନେତୃତ୍ୱ ଶ୍ରୀ ପ୍ରୀତିରଞ୍ଜନ ସାହୁ (ସିଇଓ), ଶ୍ରୀମତୀ ପିୟାଲୀ ସାହୁ (ସିଓଓ) ଏବଂ ଶ୍ରୀ କୈଳାସ ପଟ୍ଟନାୟକ (ବରିଷ୍ଠ ନାକ୍ ପରାମର୍ଶଦାତା) ନେଉଛନ୍ତି।",
        speechText:
          "ଭର୍ଚ୍ଚୋଏ ଆଇଆଇଟି ପୂର୍ବତନ ଛାତ୍ର ଶ୍ରୀ ଅନୁପ ପଟ୍ଟନାୟକଙ୍କ ଦ୍ୱାରା ପ୍ରତିଷ୍ଠିତ ଏବଂ ସିଇଓ ପ୍ରୀତିରଞ୍ଜନ ସାହୁଙ୍କ ନେତୃତ୍ୱରେ ପରିଚାଳିତ।",
        actionUrl: "/team",
        actionLabel: "ଟିମ୍ ପରିଚୟ ଦେଖନ୍ତୁ",
      };
    }
    return {
      text: "Virtoy was founded by Mr. Anup Patnaik (Co-Founder, IIT Alumni) and is led by Mr. Pritiranjan Sahu (CEO), Mrs. Piyali Sahu (COO), and Mr. Kailash Patnaik (Sr. NAAC Consultant), with a strong team of senior software and mobile engineers.",
      speechText:
        "Virtoy Technologies was founded by IIT alumni Mr. Anup Patnaik and is led by CEO Pritiranjan Sahu and COO Piyali Sahu with a dedicated engineering team.",
      actionUrl: "/team",
      actionLabel: "Meet the Team",
    };
  }

  // 9. Office & Locations & Contacts
  if (
    q.includes("office") ||
    q.includes("location") ||
    q.includes("where") ||
    q.includes("address") ||
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("email") ||
    q.includes("kolkata") ||
    q.includes("bhubaneswar") ||
    q.includes("कार्यालय") ||
    q.includes("पता") ||
    q.includes("फोन") ||
    q.includes("ଅଫିସ୍") ||
    q.includes("ଠିକଣା") ||
    q.includes("ଯୋଗାଯୋଗ")
  ) {
    if (lang === "hi") {
      return {
        text: `विर्टॉय के दो प्रमुख कार्यालय हैं:\n• कोलकाता हेड ऑफिस: 3rd Floor, Jharanalaya, 635 Baishnabghatta, Patuli, Kolkata - 700084 (03369029591)\n• भुवनेश्वर ऑफिस: Room 409, O-HUB, Chandaka Industrial Estate (+91 9861802325)\n• ईमेल: info@vtindia.com`,
        speechText:
          "हमारा मुख्य कार्यालय कोलकाता में और विकास केंद्र भुवनेश्वर के ओ-हब में स्थित है। आप हमें 9861802325 पर संपर्क कर सकते हैं।",
        actionUrl: "/contact",
        actionLabel: "संपर्क पृष्ठ देखें",
      };
    }
    if (lang === "or") {
      return {
        text: `ଭର୍ଚ୍ଚୋଏର ଦୁଇଟି ପ୍ରମୁଖ କାର୍ଯ୍ୟାଳୟ ରହିଛି:\n• କୋଲକାତା ମୁଖ୍ୟ କାର୍ଯ୍ୟାଳୟ: ୩ୟ ମହଲା, ଝରଣାଳୟ, ୬୩୫ ବୈଷ୍ଣବଘାଟା, ପାଟୁଲି, କୋଲକାତା - ୭୦୦୦୮୪ (03369029591)\n• ଭୁବନେଶ୍ୱର କାର୍ଯ୍ୟାଳୟ: ରୁମ୍ ୪୦୯, ଓ-ହବ୍, ଚନ୍ଦକା ଶିଳ୍ପାଞ୍ଚଳ (+91 9861802325)\n• ଇମେଲ୍: info@vtindia.com`,
        speechText:
          "ଆମର ମୁଖ୍ୟ କାର୍ଯ୍ୟାଳୟ କୋଲକାତା ଏବଂ ବିକାଶ କେନ୍ଦ୍ର ଭୁବନେଶ୍ୱର ଓ-ହବ୍ ରେ ଅବସ୍ଥିତ। ଆପଣ ଆମକୁ ୯୮୬୧୮୦୨୩୨୫ ରେ ଯୋଗାଯୋଗ କରିପାରିବେ।",
        actionUrl: "/contact",
        actionLabel: "ଯୋଗାଯୋଗ ପୃଷ୍ଠା ଦେଖନ୍ତୁ",
      };
    }
    return {
      text: `Virtoy operates two major centers:\n• Kolkata Head Office: 3rd Floor, Jharanalaya, 635 Baishnabghatta, Patuli, Kolkata - 700084 (03369029591)\n• Bhubaneswar Office: Room 409, O-HUB, SEZ Road, Chandaka Industrial Estate (+91 9861802325)\n• Email: info@vtindia.com`,
      speechText:
        "Our head office is in Kolkata at Baishnabghatta Patuli, and our development centre is at O-HUB in Bhubaneswar, Odisha. You can reach us at 9861802325.",
      actionUrl: "/contact",
      actionLabel: "View Contact Page",
    };
  }

  // 10. Quote / Pricing / Services
  if (
    q.includes("quote") ||
    q.includes("cost") ||
    q.includes("price") ||
    q.includes("hire") ||
    q.includes("develop") ||
    q.includes("service") ||
    q.includes("project") ||
    q.includes("मूल्य") ||
    q.includes("कीमत") ||
    q.includes("सेवा") ||
    q.includes("କୋଟେସନ୍") ||
    q.includes("ମୂଲ୍ୟ") ||
    q.includes("ସେବା")
  ) {
    if (lang === "hi") {
      return {
        text: "हम एंड-टू-एंड कस्टम सॉफ्टवेयर डेवलपमेंट, वेब एप्लिकेशन, मोबाइल ऐप, एंटरप्राइज ईआरपी और एआर/वीआर समाधान प्रदान करते हैं। अपने प्रोजेक्ट प्रस्ताव के लिए हमारी टीम से संपर्क करें।",
        speechText:
          "हम कस्टम सॉफ्टवेयर, मोबाइल ऐप, ईआरपी और एआर वीआर समाधान प्रदान करते हैं। प्रोजेक्ट के लिए हमसे संपर्क करें।",
        actionUrl: "/contact",
        actionLabel: "प्रस्ताव का अनुरोध करें",
      };
    }
    if (lang === "or") {
      return {
        text: "ଆମେ କଷ୍ଟମ୍ ସଫ୍ଟୱେର୍ ବିକାଶ, ୱେବ୍ ଆପ୍ଲିକେସନ୍, ମୋବାଇଲ୍ ଆପ୍, ଏଣ୍ଟରପ୍ରାଇଜ୍ ଇଆରପି ଏବଂ ଏଆର୍/ଭିଆର୍ ସମାଧାନ ପ୍ରଦାନ କରୁ। ଆପଣଙ୍କ ପ୍ରକଳ୍ପ ପାଇଁ ଆମ ଇଞ୍ଜିନିୟରିଂ ଟିମ୍ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
        speechText:
          "ଆମେ କଷ୍ଟମ୍ ସଫ୍ଟୱେର୍, ମୋବାଇଲ୍ ଆପ୍, ଇଆରପି ଏବଂ ଏଆର୍ ଭିଆର୍ ସଲ୍ୟୁସନ୍ ପ୍ରଦାନ କରୁ। ପ୍ରକଳ୍ପ ଆଲୋଚନା ପାଇଁ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
        actionUrl: "/contact",
        actionLabel: "ପ୍ରସ୍ତାବ ଅନୁରୋଧ କରନ୍ତୁ",
      };
    }
    return {
      text: "We offer end-to-end custom software development, web applications, mobile apps, enterprise ERPs, and AR/VR solutions. Contact our engineering team for a customized proposal and timeline.",
      speechText:
        "We offer custom software, mobile apps, ERPs, and AR VR solutions. Get in touch with our team to discuss your project requirements.",
      actionUrl: "/contact",
      actionLabel: "Request Proposal",
    };
  }

  // Default fallback grounded answer
  if (lang === "hi") {
    return {
      text: "विर्टॉय टेक्नोलॉजीज प्राइवेट लिमिटेड आईआईटी पूर्व छात्रों द्वारा स्थापित एक एंटरप्राइज आईटी और स्थानिक कंप्यूटिंग कंपनी है। हम 16 डिजिटल उत्पाद और 8 इंजीनियरिंग सेवाएं प्रदान करते हैं, जो 84 से अधिक प्रमाणित क्लाइंट्स को सशक्त बनाती हैं।",
      speechText:
        "विर्टॉय टेक्नोलॉजीज आईआईटी पूर्व छात्रों द्वारा स्थापित एक एंटरप्राइज आईटी और एआर वीआर कंपनी है।",
      actionUrl: "/products",
      actionLabel: "सभी उत्पाद देखें",
    };
  }
  if (lang === "or") {
    return {
      text: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ପ୍ରାଇଭେଟ୍ ଲିମିଟେଡ୍ ଆଇଆଇଟି ପୂର୍ବତନ ଛାତ୍ରମାନଙ୍କ ଦ୍ୱାରା ପ୍ରତିଷ୍ଠିତ ଏକ ଏଣ୍ଟରପ୍ରାଇଜ୍ ଆଇଟି ଓ ସ୍ପାସିଆଲ୍ କମ୍ପ୍ୟୁଟିଂ କମ୍ପାନୀ। ଆମେ ୧୬ଟି ଡିଜିଟାଲ୍ ପ୍ରଡକ୍ଟ ଏବଂ ୮ଟି ଇଞ୍ଜିନିୟରିଂ ସେବା ପ୍ରଦାନ କରୁଛୁ।",
      speechText:
        "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ଆଇଆଇଟି ପୂର୍ବତନ ଛାତ୍ରମାନଙ୍କ ଦ୍ୱାରା ପ୍ରତିଷ୍ଠିତ ଏକ ଅଗ୍ରଣୀ ଆଇଟି ଏବଂ ଏଆର୍ ଭିଆର୍ କମ୍ପାନୀ।",
      actionUrl: "/products",
      actionLabel: "ସମସ୍ତ ପ୍ରଡକ୍ଟ ଦେଖନ୍ତୁ",
    };
  }

  return {
    text: `Virtoy Technologies Pvt. Ltd. is an enterprise IT & spatial computing company founded by IIT alumni. We offer 16 proprietary software products and 8 engineering services across Eastern India and the UAE, powering 84+ verified institutional clients.`,
    speechText:
      "Virtoy Technologies is an enterprise IT and AR VR company founded by IIT alumni. We deliver custom software, enterprise ERPs, and immersive spatial solutions.",
    actionUrl: "/products",
    actionLabel: "Explore All Products",
  };
}
