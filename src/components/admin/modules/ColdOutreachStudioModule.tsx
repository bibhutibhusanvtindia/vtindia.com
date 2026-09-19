"use client";

import * as React from "react";
import {
  Zap,
  Send,
  Copy,
  Check,
  Sparkles,
  PhoneCall,
  Mail,
  MessageSquare,
  Share2,
  Sliders,
  Target,
  FileText,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Input } from "@/components/admin/ui/Input";
import { Textarea } from "@/components/admin/ui/Textarea";
import { Select } from "@/components/admin/ui/Select";
import { OutreachTemplate, OutreachChannel } from "@/data/admin/types";
import { WhatsAppIcon, LinkedinIcon } from "@/lib/social-icons";

export function ColdOutreachStudioModule({
  templates,
}: {
  templates: OutreachTemplate[];
}) {
  const [selectedChannel, setSelectedChannel] = React.useState<OutreachChannel>("whatsapp");
  const [selectedSector, setSelectedSector] = React.useState<string>("Healthcare");
  const [clientName, setClientName] = React.useState<string>("Apollo Care Hospital");
  const [contactPerson, setContactPerson] = React.useState<string>("Dr. Mishra");
  const [tone, setTone] = React.useState<string>("roi_driven");
  const [copied, setCopied] = React.useState(false);

  // Active generated pitch state
  const [generatedHook, setGeneratedHook] = React.useState<string>("");
  const [generatedBody, setGeneratedBody] = React.useState<string>("");
  const [generatedCta, setGeneratedCta] = React.useState<string>("");
  const [isGenerating, setIsGenerating] = React.useState(false);

  const matchedTemplate = React.useMemo(() => {
    return (
      templates.find((t) => t.sector.toLowerCase().includes(selectedSector.toLowerCase())) ||
      templates[0]
    );
  }, [templates, selectedSector]);

  React.useEffect(() => {
    if (matchedTemplate) {
      setGeneratedHook(matchedTemplate.hook);
      setGeneratedBody(
        matchedTemplate.body
          .replace("[Name]", contactPerson || "Executive")
          .replace("Medisurge", clientName || "Your Hospital")
          .replace("Royal Heritage", clientName || "Your Property")
      );
      setGeneratedCta(matchedTemplate.callToAction);
    }
  }, [matchedTemplate, clientName, contactPerson]);

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let customHook = "";
      let customBody = "";
      let customCta = "";

      if (selectedSector === "Healthcare") {
        customHook = `Eliminate lobby OPD congestion at ${clientName} by 70% with 1-click QR passes.`;
        customBody = `Respected ${contactPerson} 🙏, Virtoy Technologies built the digital registry for OMSA. For multi-specialty healthcare centers like ${clientName}, our cloud HMS automates OPD queues, instant digital discharge notes, and TPA claims sync with zero counter lag.`;
        customCta = `Would you be open to a 5-minute visual demo this week? Reply 'YES' or visit https://vtindia.com/products/hospital-hms`;
      } else if (selectedSector === "Hotels & Hospitality") {
        customHook = `Stop losing 22% OTA commissions on repeat guests at ${clientName}.`;
        customBody = `Namaste ${contactPerson} ✨, Travelers love ${clientName}, but aggregator booking portals take 20%+ in fees. Virtoy's Hotel-PMS equips your resort with 1-click WhatsApp room keys, direct booking engine, and unified restaurant billing.`;
        customCta = `Watch our 60-second resort walkthrough: https://vtindia.com/products/hotel-pms`;
      } else if (selectedSector === "Manufacturing & Heavy Steel") {
        customHook = `Tata Steel & JAFZA standard: Replace 6-hour paper safety inductions with 15-min VR simulations.`;
        customBody = `Hello ${contactPerson}. Industrial safety heads at steel plants face recurrent shopfloor incidents because classroom slides fail to build muscle memory. Virtoy's SafeAct 6-DoF VR simulator trains contract workers in hazardous blast furnace emergency scenarios before they step onto the live floor.`;
        customCta = `Let's schedule a 10-minute VR headset demo preview at your facility.`;
      } else if (selectedSector === "Higher Education") {
        customHook = `Automate NAAC SSR Criterion 1-7 documentation in 1 unified dashboard for ${clientName}.`;
        customBody = `Respected ${contactPerson}, preparing for NAAC/NBA accreditation often requires months of chaotic spreadsheet collection. Guided by senior NAAC consultants, Virtoy's Education ERP automates CO-PO mapping, student feedback analytics, and NIRF metrics.`;
        customCta = `Schedule an on-campus consultancy walkthrough: contact@vtindia.com`;
      } else {
        customHook = `Triple high-intent property buyer conversions with 3D Spatial WebXR tours.`;
        customBody = `Hi ${contactPerson}, luxury real estate buyers demand interactive 3D walkthroughs before visiting sample flats. Our WebXR engine delivers photo-realistic 3D apartment tours directly inside WhatsApp without downloading apps.`;
        customCta = `Experience the live 3D walkthrough: https://vtindia.com/products/webxr-spatial`;
      }

      setGeneratedHook(customHook);
      setGeneratedBody(customBody);
      setGeneratedCta(customCta);
      setIsGenerating(false);
    }, 450);
  };

  const fullPitchText = `${generatedHook}\n\n${generatedBody}\n\n${generatedCta}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppSend = () => {
    const encoded = encodeURIComponent(fullPitchText);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200/90 bg-gradient-to-br from-white via-[#FFF5F8] to-[#FCE7F3]/70 p-6 sm:p-7 shadow-sm">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-[#F0186C]/15 to-[#FF4D8D]/5 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-sm shadow-[#F0186C]/25">
                <Zap className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                AI B2B Cold Outreach{" "}
                <span className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] bg-clip-text text-transparent">
                  Studio
                </span>
              </h2>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
                Multi-Channel AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Generate high-converting, tailored executive cold pitches for WhatsApp, LinkedIn, Email, and Phone calls in 1 click.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              size="sm"
              className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white gap-2 shadow-md shadow-[#F0186C]/25 font-bold rounded-xl px-4 py-2"
            >
              <Sparkles className="h-4 w-4" />
              {isGenerating ? "Synthesizing AI Pitch..." : "Generate AI Pitch"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Configuration Controls */}
        <div className="space-y-4 lg:col-span-5">
          <div className="rounded-3xl border border-pink-100 bg-white p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-pink-100 pb-3">
              <Sliders className="h-4 w-4 text-[#D6135F]" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Outreach Parameters</h3>
            </div>

            {/* Target Channel */}
            <div>
              <label className="text-[11px] font-bold text-slate-700">Target Channel</label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant={selectedChannel === "whatsapp" ? "brand" : "outline"}
                  onClick={() => setSelectedChannel("whatsapp")}
                  className={`text-xs gap-1.5 justify-start rounded-xl font-bold ${
                    selectedChannel === "whatsapp"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm"
                      : "border-2 border-pink-100 text-slate-700 bg-white hover:bg-pink-50/50 hover:border-pink-300"
                  }`}
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  WhatsApp Direct
                </Button>
                <Button
                  size="sm"
                  variant={selectedChannel === "linkedin" ? "brand" : "outline"}
                  onClick={() => setSelectedChannel("linkedin")}
                  className={`text-xs gap-1.5 justify-start rounded-xl font-bold ${
                    selectedChannel === "linkedin"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                      : "border-2 border-pink-100 text-slate-700 bg-white hover:bg-pink-50/50 hover:border-pink-300"
                  }`}
                >
                  <LinkedinIcon className="h-3.5 w-3.5" />
                  LinkedIn InMail
                </Button>
                <Button
                  size="sm"
                  variant={selectedChannel === "email" ? "brand" : "outline"}
                  onClick={() => setSelectedChannel("email")}
                  className={`text-xs gap-1.5 justify-start rounded-xl font-bold ${
                    selectedChannel === "email"
                      ? "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white shadow-sm"
                      : "border-2 border-pink-100 text-slate-700 bg-white hover:bg-pink-50/50 hover:border-pink-300"
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  Executive Email
                </Button>
                <Button
                  size="sm"
                  variant={selectedChannel === "cold_call" ? "brand" : "outline"}
                  onClick={() => setSelectedChannel("cold_call")}
                  className={`text-xs gap-1.5 justify-start rounded-xl font-bold ${
                    selectedChannel === "cold_call"
                      ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm"
                      : "border-2 border-pink-100 text-slate-700 bg-white hover:bg-pink-50/50 hover:border-pink-300"
                  }`}
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  60s Cold Call
                </Button>
              </div>
            </div>

            {/* Target Sector */}
            <div>
              <label className="text-[11px] font-bold text-slate-700">Target Industry / Sector</label>
              <Select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="mt-1 bg-white border-2 border-pink-100 text-slate-800 text-xs rounded-xl focus:border-[#F0186C]"
              >
                <option value="Healthcare">Hospitals & Healthcare (HMS / OMSA Registry)</option>
                <option value="Hotels & Hospitality">Hotels & Luxury Resorts (Hotel-PMS)</option>
                <option value="Manufacturing & Heavy Steel">Heavy Industry & Steel (SafeAct VR / Telemetry)</option>
                <option value="Higher Education">Higher Education (NAAC/NBA IQAC ERP)</option>
                <option value="Real Estate & Architecture">Real Estate Builders (WebXR Spatial Twins)</option>
              </Select>
            </div>

            {/* Client & Contact Person */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700">Company Name</label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Royal Heritage"
                  className="mt-1 text-xs bg-white border-2 border-pink-100 rounded-xl focus:border-[#F0186C]"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700">Contact Person</label>
                <Input
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Dr. Mishra / Mr. Singh"
                  className="mt-1 text-xs bg-white border-2 border-pink-100 rounded-xl focus:border-[#F0186C]"
                />
              </div>
            </div>

            {/* Strategic Tone */}
            <div>
              <label className="text-[11px] font-bold text-slate-700">Value Pitch Strategy & Tone</label>
              <Select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="mt-1 bg-white border-2 border-pink-100 text-slate-800 text-xs rounded-xl focus:border-[#F0186C]"
              >
                <option value="roi_driven">ROI & Cost Savings Focus (Direct Financial Impact)</option>
                <option value="social_proof">Client Social Proof (Tata Steel / OMSA / Govt Credentials)</option>
                <option value="tech_urgency">Pain Point & Tech Gap Urgency (Immediate Action)</option>
                <option value="consultative">Executive Advisory & NAAC Consultancy Tone</option>
              </Select>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="rounded-3xl border border-pink-200/80 bg-gradient-to-br from-pink-50/70 to-rose-50/40 p-4 text-xs space-y-2 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-[#D6135F]">
              <Lightbulb className="h-4 w-4" />
              Virtoy Growth Playbook Tip
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed font-medium">
              Leading with our verified client credentials (Tata Steel SafeAct, OMSA Health Registry, 18+ NAAC Colleges) triples reply rates compared to generic software pitches.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Pitch Workspace */}
        <div className="space-y-4 lg:col-span-7">
          <div className="rounded-3xl border border-pink-100 bg-white p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#D6135F]" />
                <h3 className="text-sm font-bold text-slate-900">Synthesized Pitch Preview</h3>
                <span className="rounded-full bg-pink-50 px-2.5 py-0.5 text-[10px] font-bold text-[#D6135F] border border-pink-200">
                  {selectedChannel.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={handleCopy}
                  className="gap-1 text-xs border-pink-200 text-slate-700 hover:bg-pink-50 rounded-xl"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied!" : "Copy Full Pitch"}
                </Button>

                {selectedChannel === "whatsapp" && (
                  <Button
                    size="xs"
                    onClick={handleWhatsAppSend}
                    className="gap-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm rounded-xl font-bold"
                  >
                    <WhatsAppIcon className="h-3 w-3" />
                    Open WhatsApp Web
                  </Button>
                )}
              </div>
            </div>

            {/* Hook Headline */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#D6135F]">
                1. Attention Hook (Opening Line)
              </span>
              <Input
                value={generatedHook}
                onChange={(e) => setGeneratedHook(e.target.value)}
                className="font-bold text-slate-900 bg-white border-2 border-pink-100 text-xs rounded-xl focus:border-[#F0186C]"
              />
            </div>

            {/* Pitch Body */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">
                2. Value Proposition & Credibility Anchor
              </span>
              <Textarea
                value={generatedBody}
                onChange={(e) => setGeneratedBody(e.target.value)}
                className="min-h-[140px] text-xs text-slate-800 leading-relaxed bg-white border-2 border-pink-100 font-sans rounded-xl focus:border-[#F0186C]"
              />
            </div>

            {/* Call to Action */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                3. Low-Friction Call-To-Action (CTA)
              </span>
              <Input
                value={generatedCta}
                onChange={(e) => setGeneratedCta(e.target.value)}
                className="text-slate-900 bg-white border-2 border-pink-100 text-xs rounded-xl focus:border-[#F0186C]"
              />
            </div>

            {/* Full Formatted Preview Box */}
            <div className="rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50/40 to-rose-50/20 p-4 text-xs">
              <span className="text-[10px] font-black text-[#D6135F] uppercase tracking-wider">
                Full Message Output:
              </span>
              <p className="mt-2 whitespace-pre-wrap font-sans text-slate-800 text-xs leading-relaxed font-normal">
                {fullPitchText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
