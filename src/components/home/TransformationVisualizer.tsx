"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
  Flame,
  GraduationCap,
  HeartPulse,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { playHapticBeep } from "@/lib/sound";

interface TransformationStory {
  id: string;
  category: string;
  client: string;
  icon: typeof Flame;
  title: string;
  before: {
    title: string;
    points: string[];
    metric: string;
    metricLabel: string;
  };
  after: {
    title: string;
    points: string[];
    metric: string;
    metricLabel: string;
  };
}

const STORIES: TransformationStory[] = [
  {
    id: "industrial-safety",
    category: "Heavy Industry & Mining",
    client: "Tata Steel & Vedanta Facilities",
    icon: Flame,
    title: "Industrial Hazard Safety & Hazmat Simulation",
    before: {
      title: "Traditional Physical Drills",
      points: [
        "Dangerous live-fire and high-altitude physical training",
        "Manual paper compliance audits and logbooks",
        "High recurring cost of setting up mock disaster zones",
        "Low retention of emergency evacuation procedures",
      ],
      metric: "18 Days",
      metricLabel: "Average training cycle duration",
    },
    after: {
      title: "Virtoy SafeAct 6-DOF VR Simulator",
      points: [
        "100% zero-risk photorealistic virtual hazmat scenarios",
        "Real-time biometric reaction scoring & automated LMS sync",
        "Instant multi-user collaborative disaster response drills",
        "Certified compliance logs exported with cryptographic audit",
      ],
      metric: "92% Retention",
      metricLabel: "0 Incidents Recorded in Field",
    },
  },
  {
    id: "campus-erp",
    category: "Higher Education & Universities",
    client: "Centurion University & 40k+ Students",
    icon: GraduationCap,
    title: "Integrated Campus ERP & NAAC Automation",
    before: {
      title: "Fragmented Legacy Spreadsheets",
      points: [
        "Disjointed department databases and slow paper fee receipts",
        "Weeks required to compile NAAC/NBA accreditation data",
        "Frequent system crashes during exam result publication",
        "Manual timetable scheduling with high conflict rates",
      ],
      metric: "4-5 Weeks",
      metricLabel: "To compile annual compliance report",
    },
    after: {
      title: "Virtoy Campus Management Cloud",
      points: [
        "Unified single-sign-on portal for 40,000+ daily active users",
        "1-Click automated NAAC/NBA criteria data aggregation",
        "Sub-second response times even during peak admissions",
        "Mobile-first fee payment, attendance & grading portal",
      ],
      metric: "<0.8s Latency",
      metricLabel: "99.98% Peak Examination Uptime",
    },
  },
  {
    id: "healthcare-hms",
    category: "Healthcare & Hospitals",
    client: "Multi-Speciality Hospitals",
    icon: HeartPulse,
    title: "Clinical Hospital Management & Queue Engine",
    before: {
      title: "Paper Records & Crowded OPDs",
      points: [
        "Long patient wait times with chaotic OPD registration queues",
        "Physical paper prescriptions prone to misplacement",
        "Delayed diagnostic lab report delivery to doctors",
        "Disjointed pharmacy inventory and billing leaks",
      ],
      metric: "45 Mins",
      metricLabel: "Average OPD waiting time",
    },
    after: {
      title: "Virtoy Hospital HMS & Telemetry",
      points: [
        "Smart QR kiosk self-check-in with live token display",
        "Integrated electronic health records (EHR) & e-prescriptions",
        "Direct lab equipment telemetry synchronization",
        "Automated pharmaceutical inventory re-ordering",
      ],
      metric: "8 Mins",
      metricLabel: "82% Reduction in Patient Wait Time",
    },
  },
];

export function TransformationVisualizer() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100%

  const story = STORIES[activeStoryIdx];
  const Icon = story.icon;

  return (
    <section className="relative overflow-hidden border-t border-border bg-surface py-24">
      {/* Ambient background light */}
      <div
        className="pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Proven Institutional Impact"
            title="Before vs. After: The Virtoy Transformation"
            description="See how our custom engineering and spatial systems replace slow, high-risk legacy workflows with automated, real-time software."
          />
        </div>

        {/* Story Category Tabs */}
        <div className="mt-10 flex flex-wrap gap-3">
          {STORIES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveStoryIdx(idx);
                playHapticBeep(650, 0.04);
              }}
              className={`flex items-center gap-2 rounded-2xl border px-5 py-3 text-xs font-semibold transition-all sm:text-sm ${
                activeStoryIdx === idx
                  ? "border-primary bg-primary text-white shadow-lg shadow-primary/25"
                  : "border-border/80 bg-surface text-muted hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <s.icon className="h-4 w-4" />
              <span>{s.category}</span>
            </button>
          ))}
        </div>

        {/* Active Transformation Card */}
        <div className="mt-8">
          <SpotlightCard enableTilt={false} className="p-6 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
              <div>
                <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                  {story.client}
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {story.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-muted px-3.5 py-1.5 font-mono text-xs font-bold text-muted">
                <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                <span>Interactive Comparison</span>
              </div>
            </div>

            {/* Side-by-Side Comparison Grid */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
              {/* Left: Before (Legacy) */}
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.02] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-600">
                    <XCircle className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Before Virtoy</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-rose-600/80">Legacy Workflow</span>
                </div>

                <h4 className="mt-4 text-lg font-bold text-foreground sm:text-xl">
                  {story.before.title}
                </h4>

                <ul className="mt-6 space-y-3">
                  {story.before.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs text-muted sm:text-sm">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-xl border border-rose-500/20 bg-surface p-4">
                  <p className="text-[11px] font-medium text-muted">{story.before.metricLabel}</p>
                  <p className="mt-1 font-mono text-xl font-bold text-rose-600 sm:text-2xl">
                    {story.before.metric}
                  </p>
                </div>
              </div>

              {/* Right: After (Virtoy Solution) */}
              <div className="rounded-2xl border-2 border-primary/40 bg-primary/[0.03] p-6 shadow-lg shadow-primary/5 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="h-5 w-5 stroke-[2.5]" />
                    <span className="text-xs font-bold uppercase tracking-wider">With Virtoy Solution</span>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                    Modern Stack
                  </span>
                </div>

                <h4 className="mt-4 text-lg font-bold text-foreground sm:text-xl">
                  {story.after.title}
                </h4>

                <ul className="mt-6 space-y-3">
                  {story.after.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs text-foreground sm:text-sm font-medium">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-xl border border-primary/30 bg-surface p-4 shadow-sm">
                  <p className="text-[11px] font-medium text-muted">{story.after.metricLabel}</p>
                  <p className="mt-1 font-mono text-xl font-bold text-primary sm:text-2xl">
                    {story.after.metric}
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </Container>
    </section>
  );
}
