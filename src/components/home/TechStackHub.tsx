"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Boxes,
  Cloud,
  Cpu,
  Database,
  Glasses,
  Globe,
  Layers,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

interface TechItem {
  name: string;
  category: "spatial" | "fullstack" | "mobile" | "cloud";
  role: string;
  badge: string;
  level: string;
}

const TECH_CATEGORIES = [
  { id: "all", label: "All Engineering Stacks" },
  { id: "spatial", label: "AR / VR & Spatial 3D", icon: Glasses },
  { id: "fullstack", label: "Enterprise Web & API", icon: Globe },
  { id: "mobile", label: "Mobile Apps (iOS / Android)", icon: Smartphone },
  { id: "cloud", label: "Cloud & DevOps Infrastructure", icon: Cloud },
];

const TECH_ITEMS: TechItem[] = [
  // Spatial & AR/VR
  { name: "Unreal Engine 5", category: "spatial", role: "High-fidelity industrial physics simulations", badge: "Spatial XR", level: "Production Tier" },
  { name: "Unity 3D / C#", category: "spatial", role: "Cross-platform VR simulation for SafeAct & XR apps", badge: "Meta Quest / Vive", level: "Production Tier" },
  { name: "WebXR & Three.js", category: "spatial", role: "Zero-install browser-based 3D digital twins", badge: "WebGL 2.0", level: "Production Tier" },
  { name: "Blender & CAD Pipelines", category: "spatial", role: "Industrial BIM asset optimization & spatial rig", badge: "3D Modeling", level: "Asset Pipeline" },

  // Enterprise Web & API
  { name: "Next.js & React", category: "fullstack", role: "High-speed SSR & modern enterprise interfaces", badge: "Frontend Core", level: "Production Tier" },
  { name: "TypeScript", category: "fullstack", role: "Strict compile-time type safety across all ERP systems", badge: "Type Safety", level: "Standard" },
  { name: "Node.js & Express", category: "fullstack", role: "Scalable asynchronous REST & WebSocket APIs", badge: "Backend Core", level: "Production Tier" },
  { name: "Python & FastAPI", category: "fullstack", role: "Data processing, automated reporting & analytics", badge: "Analytics", level: "Production Tier" },
  { name: "PostgreSQL & Redis", category: "fullstack", role: "ACID compliant relational storage & high-speed cache", badge: "Database", level: "Enterprise Tier" },

  // Mobile
  { name: "Flutter", category: "mobile", role: "High-performance cross-platform iOS and Android apps", badge: "Cross-Platform", level: "Production Tier" },
  { name: "React Native", category: "mobile", role: "Native component bridge for enterprise mobility", badge: "Mobile Core", level: "Production Tier" },
  { name: "Kotlin (Android)", category: "mobile", role: "Hardware-level barcode/RFID scanner integrations", badge: "Native Android", level: "Hardware Bridge" },
  { name: "Swift (iOS)", category: "mobile", role: "High-security executive mobile dashboards", badge: "Native iOS", level: "Hardware Bridge" },

  // Cloud & DevOps
  { name: "AWS & Google Cloud", category: "cloud", role: "Multi-region cloud infrastructure with 99.9% uptime", badge: "Cloud Platform", level: "Enterprise Tier" },
  { name: "Docker & Kubernetes", category: "cloud", role: "Containerized microservices & auto-scaling clusters", badge: "DevOps", level: "Production Tier" },
  { name: "Nginx & Load Balancing", category: "cloud", role: "High-concurrency reverse proxy & SSL termination", badge: "Network", level: "Standard" },
  { name: "ISO 9001 Compliance", category: "cloud", role: "Certified quality management & strict code audit", badge: "Accreditation", level: "Certified" },
];

export function TechStackHub() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems = TECH_ITEMS.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface py-24">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Engineering Standards"
            title="Enterprise Technology Stack"
            description="Modern, scalable, and type-safe architectures engineered by our team of IIT alumni and senior software architects."
          />
        </div>

        {/* Category Tabs */}
        <div className="mt-12 flex flex-wrap gap-2.5" role="tablist" aria-label="Technology Stacks">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeTab === cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                activeTab === cat.id
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "border border-border bg-surface-muted/70 text-muted hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filtered Grid with Spotlight Effect */}
        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {filteredItems.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <SpotlightCard
                  enableTilt={true}
                  className="h-full p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-primary">
                      {tech.badge}
                    </span>
                    <span className="text-[10px] font-semibold text-muted">
                      {tech.level}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">
                    {tech.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {tech.role}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
