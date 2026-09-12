"use client";

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

export const SUGGESTED_QUESTIONS = [
  "What is SafeAct VR Simulator?",
  "Tell me about Education ERP",
  "How many clients do you have?",
  "Where are your office locations?",
  "Who founded Virtoy Technologies?",
  "How can I get a project quote?",
];

/**
 * Knowledge Engine strictly grounded on vtindia.com verified data
 */
export function answerCustomerQuery(query: string): BotAnswer {
  const q = query.toLowerCase().trim();

  // 1. Safeact / VR / AR
  if (q.includes("safeact") || q.includes("safety") || q.includes("hazard") || q.includes("turbine")) {
    const safeact = products.find((p) => p.slug === "safeact");
    return {
      text: "SafeAct is Virtoy's industrial workplace safety platform. It provides real-time incident reporting, department-level compliance visualization (piloted at Kalinga Units I and II), and VR hazard simulations with 6-DoF physics.",
      speechText:
        "SafeAct is our industrial workplace safety platform. It provides real-time incident reporting and virtual reality hazard simulations for heavy industries.",
      actionUrl: "/products/safeact",
      actionLabel: "View SafeAct Details",
    };
  }

  if (q.includes("krushi") || q.includes("agriculture") || q.includes("farming") || q.includes("mobile app")) {
    return {
      text: "Our flagship Krushi Odisha 2025 mobile & VR solution was developed in collaboration with the Government of Odisha to deliver experiential farming training and virtual machinery simulations to over 40,000 farmers.",
      speechText:
        "Krushi Odisha 2025 was developed for the Government of Odisha, integrating mobile access with virtual reality simulations for agricultural communities.",
      actionUrl: "/products/mobile-applications",
      actionLabel: "Explore Mobile Solutions",
    };
  }

  if (q.includes("ar") || q.includes("vr") || q.includes("virtual reality") || q.includes("augmented")) {
    return {
      text: "Virtoy builds high-fidelity AR & VR experiences for industrial safety, healthcare simulations, and government outreach — transforming complex manual procedures into interactive spatial simulations.",
      speechText:
        "Virtoy builds high-fidelity AR and VR experiences for industrial safety, educational outreach, and interactive simulations.",
      actionUrl: "/products/virtual-reality",
      actionLabel: "Explore AR / VR Suite",
    };
  }

  // 2. Education ERP / Library / Campus
  if (q.includes("education") || q.includes("college") || q.includes("campus") || q.includes("school") || q.includes("naac")) {
    return {
      text: "Virtoy Education ERP provides digital campus management for universities and autonomous colleges. Used by institutions like Banki Autonomous College, Government College Sundargarh, and Sarbati Devi Women's College across 8+ academic departments.",
      speechText:
        "Our Education ERP provides digital campus management, student and faculty portals, and study material distribution for colleges and universities across Odisha.",
      actionUrl: "/products/education-erp",
      actionLabel: "Explore Education ERP",
    };
  }

  if (q.includes("library") || q.includes("book")) {
    return {
      text: "Our Library Management System automates cataloging, student borrower records, return schedules, and fine calculations. Deployed at 9+ educational institutions across Odisha.",
      speechText:
        "Virtoy's Library Management System automates book tracking, borrower records, and return schedules across educational institutions.",
      actionUrl: "/products/library-management",
      actionLabel: "View Library System",
    };
  }

  if (q.includes("hotel") || q.includes("pms") || q.includes("room")) {
    return {
      text: "Hotel PMS is Virtoy's property management system streamlining reservations, check-in/out, housekeeping, and billing for hotels and resorts such as Hotel Dionyx and Shertineco Resort.",
      speechText:
        "Hotel PMS streamlines reservations, guest management, and billing for hospitality businesses.",
      actionUrl: "/products/hotel-pms",
      actionLabel: "View Hotel PMS",
    };
  }

  // 3. Clients & Portfolio
  if (q.includes("client") || q.includes("customer") || q.includes("portfolio") || q.includes("work") || q.includes("trust")) {
    return {
      text: `Virtoy Technologies has 84+ verified institutional deployments across Eastern India, including Tata Steel, Aarti Steels, Paradeep Phosphates, High Court Bar Association, Salipur College, and the Government of Odisha.`,
      speechText:
        "We have over 84 verified client deployments spanning educational institutions, heavy industries, government bodies, and healthcare organizations.",
      actionUrl: "/clients",
      actionLabel: "View All 84 Clients",
    };
  }

  // 4. Founders, Leadership & Team
  if (q.includes("founder") || q.includes("ceo") || q.includes("anup") || q.includes("pritiranjan") || q.includes("team") || q.includes("iit") || q.includes("who")) {
    return {
      text: "Virtoy was founded by Mr. Anup Patnaik (Co-Founder, IIT Alumni) and is led by Mr. Pritiranjan Sahu (CEO), Mrs. Piyali Sahu (COO), and Mr. Kailash Patnaik (Sr. NAAC Consultant), with a strong team of senior software and mobile engineers.",
      speechText:
        "Virtoy Technologies was founded by IIT alumni Mr. Anup Patnaik and is led by CEO Pritiranjan Sahu and COO Piyali Sahu with a dedicated engineering team.",
      actionUrl: "/team",
      actionLabel: "Meet the Team",
    };
  }

  // 5. Office & Locations & Contacts
  if (q.includes("office") || q.includes("location") || q.includes("where") || q.includes("address") || q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("kolkata") || q.includes("bhubaneswar")) {
    return {
      text: `Virtoy operates two major centers:\n• Kolkata Head Office: 3rd Floor, Jharanalaya, 635 Baishnabghatta, Patuli, Kolkata - 700084 (03369029591)\n• Bhubaneswar Office: Room 409, O-HUB, SEZ Road, Chandaka Industrial Estate (+91 9861802325)\n• Email: info@vtindia.com`,
      speechText:
        "Our head office is in Kolkata at Baishnabghatta Patuli, and our development centre is at O-HUB in Bhubaneswar, Odisha. You can reach us at 9861802325.",
      actionUrl: "/contact",
      actionLabel: "View Contact Page",
    };
  }

  // 6. Quote / Pricing / Services
  if (q.includes("quote") || q.includes("cost") || q.includes("price") || q.includes("hire") || q.includes("develop") || q.includes("service") || q.includes("project")) {
    return {
      text: "We offer end-to-end custom software development, web applications, mobile apps, enterprise ERPs, and AR/VR solutions. Contact our engineering team for a customized proposal and timeline.",
      speechText:
        "We offer custom software, mobile apps, ERPs, and AR VR solutions. Get in touch with our team to discuss your project requirements.",
      actionUrl: "/contact",
      actionLabel: "Request Proposal",
    };
  }

  // Default fallback grounded answer
  return {
    text: `Virtoy Technologies Pvt. Ltd. is an enterprise IT & spatial computing company founded by IIT alumni. We offer 16 proprietary software products and 8 engineering services across Eastern India and the UAE, powering 84+ verified institutional clients.`,
    speechText:
      "Virtoy Technologies is an enterprise IT and AR VR company founded by IIT alumni. We deliver custom software, enterprise ERPs, and immersive spatial solutions.",
    actionUrl: "/products",
    actionLabel: "Explore All Products",
  };
}
