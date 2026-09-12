"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building,
  CheckCircle2,
  Globe2,
  MapPin,
  Phone,
  Radio,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { site } from "@/data/site";

const HUBS = [
  {
    city: "Bhubaneswar, Odisha",
    label: "Innovation & Spatial Computing Center",
    type: "Engineering & R&D Hub",
    address: "Tower-A, 4th Floor, Room 409, (O-HUB), SEZ Road, Chandaka Industrial Estate, Bhubaneswar, Odisha",
    phone: "9861802325",
    focus: "AR/VR Simulators · 3D Spatial Systems · Enterprise ERP R&D",
    status: "Active 24/7 Operations",
  },
  {
    city: "Kolkata, West Bengal",
    label: "Corporate Head Office",
    type: "Corporate Headquarters",
    address: "3rd Floor, Jharanalaya, 635 Baishnabghatta, Patuli, Kolkata, West Bengal - 700084",
    phone: "03369029591",
    focus: "Enterprise Software Architecture · Client Relations · Corporate Governance",
    status: "Corporate Management",
  },
];

const DEPLOYMENT_REGIONS = [
  { name: "Eastern India Core", area: "Odisha · West Bengal · Jharkhand", desc: "84+ Enterprise & Institutional Clients" },
  { name: "Middle East Presence", area: "United Arab Emirates (UAE)", desc: "Enterprise IT & Logistics Systems" },
  { name: "United Kingdom", area: "London & Regional Partners", desc: "Software & Strategic Technology Consulting" },
];

export function GlobalFootprint() {
  const [selectedHub, setSelectedHub] = useState(0);
  const hub = HUBS[selectedHub];

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface py-24">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Regional Presence & Global Reach"
            title="Dual Regional Hubs, Worldwide Delivery"
            description="Anchored by our Innovation Hub at O-HUB Bhubaneswar and Corporate HQ in Kolkata, serving clients across India, the UAE, and the UK."
          />
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Hub Switcher: 5 Cols */}
          <div className="space-y-4 lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              Select Primary Operations Center
            </p>
            {HUBS.map((h, i) => {
              const isSelected = i === selectedHub;
              return (
                <button
                  key={h.city}
                  onClick={() => setSelectedHub(i)}
                  className={`flex w-full flex-col rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-primary bg-primary/[0.08] shadow-lg shadow-primary/10"
                      : "border-border/80 bg-surface-muted/60 hover:border-primary/40 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                      {h.type}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      {h.status}
                    </span>
                  </div>
                  <h4 className="mt-3 text-base font-bold text-foreground">{h.city}</h4>
                  <p className="mt-1 text-xs text-muted">{h.label}</p>
                </button>
              );
            })}

            {/* Global Regions Strip */}
            <div className="mt-6 rounded-2xl border border-border/80 bg-surface-muted/50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                Client Deployment Reach
              </p>
              <div className="mt-3 space-y-2.5">
                {DEPLOYMENT_REGIONS.map((reg) => (
                  <div key={reg.name} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <div>
                      <span className="font-bold text-foreground">{reg.name}: </span>
                      <span className="text-muted">{reg.area} ({reg.desc})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Hub Detail Card: 7 Cols */}
          <div className="lg:col-span-7">
            <SpotlightCard enableTilt={false} className="p-6 sm:p-10">
              <div className="flex items-center justify-between border-b border-border/80 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/25">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-primary">{hub.type}</span>
                    <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {hub.city}
                    </h3>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-600">
                  Direct Line Active
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Facility Address:</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground">{hub.address}</p>
                </div>

                <div className="rounded-2xl border border-border/80 bg-surface-muted/60 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Specialized Engineering Focus:</p>
                  <p className="mt-1 text-xs font-semibold text-primary">{hub.focus}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <a
                    href={`tel:+91${hub.phone}`}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call Direct: {hub.phone}
                  </a>
                  <span className="text-xs text-muted">
                    Official Email: <strong className="text-foreground">{site.email}</strong>
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
