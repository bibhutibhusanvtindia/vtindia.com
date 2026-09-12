"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  Sparkles,
  TrendingUp,
  Clock,
  ShieldAlert,
  ArrowRight,
  Sliders,
  DollarSign,
  Building2,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

interface IndustryConfig {
  id: string;
  name: string;
  hourlyValue: number;
  incidentCost: number;
  typicalDeliveryWeeks: number;
  riskReductionRate: string;
}

const INDUSTRIES: IndustryConfig[] = [
  {
    id: "industrial",
    name: "Heavy Industry & Mining",
    hourlyValue: 850,
    incidentCost: 1500000,
    typicalDeliveryWeeks: 8,
    riskReductionRate: "92%",
  },
  {
    id: "education",
    name: "Universities & Higher Ed",
    hourlyValue: 450,
    incidentCost: 500000,
    typicalDeliveryWeeks: 6,
    riskReductionRate: "95%",
  },
  {
    id: "healthcare",
    name: "Hospital & Healthcare",
    hourlyValue: 950,
    incidentCost: 2000000,
    typicalDeliveryWeeks: 10,
    riskReductionRate: "99%",
  },
  {
    id: "enterprise",
    name: "Corporate ERP & SaaS",
    hourlyValue: 700,
    incidentCost: 800000,
    typicalDeliveryWeeks: 6,
    riskReductionRate: "88%",
  },
];

export function RoiCalculator() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("industrial");
  const [teamSize, setTeamSize] = useState<number>(350);
  const [solutionTier, setSolutionTier] = useState<"standard" | "immersive" | "enterprise">(
    "immersive"
  );

  const ind = INDUSTRIES.find((i) => i.id === selectedIndustry) || INDUSTRIES[0];

  // Calculations
  const tierMultiplier = solutionTier === "standard" ? 1 : solutionTier === "immersive" ? 1.4 : 1.8;
  const deliveryWeeks = Math.round(ind.typicalDeliveryWeeks * (solutionTier === "standard" ? 0.8 : 1.2));
  const annualHoursSaved = Math.round(teamSize * 14 * tierMultiplier);
  const annualEfficiencyValue = Math.round((annualHoursSaved * ind.hourlyValue) / 100000); // In Lakhs
  const incidentMitigationPercent = ind.riskReductionRate;

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface-muted/50 py-24">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-primary/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-accent-strong/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Interactive ROI & Scope Engine"
            title="Calculate Your Institutional Impact & Time Saved"
            description="Estimate deployment speed, operational efficiency, and capital savings powered by Virtoy's pre-architected modules."
          />
        </div>

        {/* Calculator Widget Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Left: Interactive Controls (7 cols) */}
          <div className="lg:col-span-7">
            <SpotlightCard enableTilt={false} className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Sliders className="h-4 w-4" />
                <span>Configure Institutional Parameters</span>
              </div>

              {/* 1. Industry Selector */}
              <div className="mt-6">
                <label className="text-xs font-semibold text-foreground">
                  Select Industry Domain:
                </label>
                <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {INDUSTRIES.map((industry) => (
                    <button
                      key={industry.id}
                      onClick={() => setSelectedIndustry(industry.id)}
                      className={`rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                        selectedIndustry === industry.id
                          ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
                          : "border-border bg-surface text-muted hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      <Building2 className="mb-1.5 h-4 w-4 opacity-80" />
                      <span className="block leading-tight">{industry.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Team / Student / Personnel Slider */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <label htmlFor="team-slider" className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    Target Users / Daily Personnel:
                  </label>
                  <span className="font-mono text-sm font-bold text-primary">
                    {teamSize.toLocaleString()} Users
                  </span>
                </div>
                <input
                  id="team-slider"
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-muted accent-primary"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
                  <span>50</span>
                  <span>1,000</span>
                  <span>2,500</span>
                  <span>5,000+</span>
                </div>
              </div>

              {/* 3. Solution Tier Selector */}
              <div className="mt-8">
                <label className="text-xs font-semibold text-foreground">
                  Target Technical Stack &amp; Scope:
                </label>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                  <button
                    onClick={() => setSolutionTier("standard")}
                    className={`rounded-xl border p-3 text-left text-xs transition ${
                      solutionTier === "standard"
                        ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary"
                        : "border-border bg-surface text-muted hover:text-foreground"
                    }`}
                  >
                    <p className="font-bold text-foreground">Web &amp; Cloud ERP</p>
                    <p className="mt-1 text-[11px] text-muted">Core databases, portals &amp; APIs</p>
                  </button>

                  <button
                    onClick={() => setSolutionTier("immersive")}
                    className={`rounded-xl border p-3 text-left text-xs transition ${
                      solutionTier === "immersive"
                        ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary"
                        : "border-border bg-surface text-muted hover:text-foreground"
                    }`}
                  >
                    <p className="font-bold text-foreground">6-DOF AR/VR Simulation</p>
                    <p className="mt-1 text-[11px] text-muted">Physics hazmat drills &amp; XR modules</p>
                  </button>

                  <button
                    onClick={() => setSolutionTier("enterprise")}
                    className={`rounded-xl border p-3 text-left text-xs transition ${
                      solutionTier === "enterprise"
                        ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary"
                        : "border-border bg-surface text-muted hover:text-foreground"
                    }`}
                  >
                    <p className="font-bold text-foreground">Full Ecosystem</p>
                    <p className="mt-1 text-[11px] text-muted">Web + Mobile + VR + IoT Sync</p>
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right: Live Impact Projection HUD (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border-2 border-primary/30 bg-surface p-6 shadow-2xl sm:p-8">
              {/* Corner watermark */}
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between border-b border-border/80 pb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted">
                    Projected Delivery &amp; ROI
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600">
                    Calculated in Real-Time
                  </span>
                </div>

                {/* Key Metric 1: Sprint Delivery */}
                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted">Estimated Production Sprint</p>
                    <p className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {deliveryWeeks} – {deliveryWeeks + 2} Weeks
                    </p>
                    <p className="text-[11px] text-muted">
                      Full staging deployment with user acceptance testing.
                    </p>
                  </div>
                </div>

                {/* Key Metric 2: Annual Hours Saved */}
                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted">Annual Operational Hours Saved</p>
                    <p className="font-mono text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                      {annualHoursSaved.toLocaleString()}+ Hours
                    </p>
                    <p className="text-[11px] text-muted">
                      Est. productivity gain equivalent to ₹{annualEfficiencyValue} Lakhs/yr.
                    </p>
                  </div>
                </div>

                {/* Key Metric 3: Safety / Risk Reduction */}
                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted">Safety &amp; Compliance Accuracy</p>
                    <p className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {incidentMitigationPercent} Retention
                    </p>
                    <p className="text-[11px] text-muted">
                      Zero physical incident risk during training drills.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct CTA */}
              <div className="mt-8 border-t border-border/80 pt-6">
                <Link
                  href={`/contact?subject=Scope%20for%20${encodeURIComponent(
                    ind.name
                  )}%20(${teamSize}%20users)&tier=${solutionTier}`}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30"
                >
                  Request Technical Blueprint &amp; Proposal
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="mt-2 text-center text-[10px] text-muted">
                  Includes fixed milestone quote, full architecture diagram &amp; SLA terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
