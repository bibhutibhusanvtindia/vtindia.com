"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  Filter,
  Flame,
  MessageCircle,
  MessageSquare,
  RefreshCw,
  Send,
  Sparkles,
} from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
  XIcon,
  YoutubeIcon,
} from "@/lib/social-icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Select } from "@/components/admin/ui/Select";
import { Textarea } from "@/components/admin/ui/Textarea";
import { SocialLead, SocialPlatform } from "@/data/admin/types";
import { LeadSourcePieChart } from "@/components/admin/charts";

export function SocialLeadsModule({
  leads,
  onUpdateStatus,
  onUpdateReply,
}: {
  leads: SocialLead[];
  onUpdateStatus: (id: string, status: SocialLead["status"]) => void;
  onUpdateReply: (id: string, reply: string) => void;
}) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [activeLeadId, setActiveLeadId] = useState<string>(leads[0]?.id || "");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);

  const filteredLeads = leads.filter((lead) => {
    if (selectedPlatform === "all") return true;
    return lead.platform === selectedPlatform;
  });

  const activeLead = leads.find((l) => l.id === activeLeadId) || filteredLeads[0];

  const platformIcons: Record<SocialPlatform, { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
    whatsapp: { icon: WhatsAppIcon, color: "text-emerald-700 bg-emerald-50 border border-emerald-200", label: "WhatsApp" },
    instagram: { icon: InstagramIcon, color: "text-[#D6135F] bg-pink-50 border border-pink-200", label: "Instagram" },
    youtube: { icon: YoutubeIcon, color: "text-red-700 bg-red-50 border border-red-200", label: "YouTube" },
    twitter: { icon: XIcon, color: "text-sky-700 bg-sky-50 border border-sky-200", label: "Twitter (X)" },
    facebook: { icon: FacebookIcon, color: "text-blue-700 bg-blue-50 border border-blue-200", label: "Facebook" },
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerateReply = (lead: SocialLead) => {
    setIsGeneratingReply(true);
    setTimeout(() => {
      const refreshedReply = `Namaste ${lead.senderName}! Thank you for reaching out regarding ${lead.techInterests.join(
        " & "
      )}. Virtoy Technologies has engineered similar solutions for Tata Steel and state healthcare platforms. We can schedule an exclusive 15-minute live technical walkthrough tomorrow at 11:30 AM. Would that work for you?`;
      onUpdateReply(lead.id, refreshedReply);
      setIsGeneratingReply(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200/90 bg-gradient-to-br from-white via-[#FFF5F8] to-[#FCE7F3]/70 p-6 sm:p-7 shadow-sm">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-[#F0186C]/15 to-[#FF4D8D]/5 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-sm shadow-[#F0186C]/25">
                <MessageSquare className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Omnichannel Social Lead{" "}
                <span className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] bg-clip-text text-transparent">
                  Capture
                </span>
              </h2>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                Live Stream Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Auto-capture and AI-qualify client inquiries from Instagram, YouTube, WhatsApp, Twitter (X), and Facebook.
            </p>
          </div>

          {/* Platform Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border-2 border-pink-200 bg-white p-1.5 shadow-2xs">
            {["all", "whatsapp", "instagram", "youtube", "twitter", "facebook"].map((plat) => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold capitalize transition-all ${
                  selectedPlatform === plat
                    ? "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white shadow-sm"
                    : "text-slate-600 hover:text-[#D6135F] hover:bg-pink-50/70"
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Omnichannel Channel Share Pie Chart */}
      <LeadSourcePieChart leads={leads} />

      {/* Main 2-Column Interface */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1.7fr] lg:items-start">
        {/* Left Column: List of Leads */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-semibold">
            <span>
              Showing <strong className="text-slate-900 font-bold">{filteredLeads.length}</strong> incoming inquiries
            </span>
            <span className="text-[11px] font-mono text-emerald-700 font-bold">
              Total Deal Value: ₹47.3L
            </span>
          </div>

          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {filteredLeads.map((lead) => {
              const isSelected = activeLead?.id === lead.id;
              const platConfig = platformIcons[lead.platform];
              const IconComponent = platConfig.icon;

              return (
                <div
                  key={lead.id}
                  onClick={() => setActiveLeadId(lead.id)}
                  className={`group relative flex flex-col gap-2.5 rounded-3xl border p-4 cursor-pointer transition-all shadow-xs ${
                    isSelected
                      ? "border-[#F0186C] bg-gradient-to-br from-[#FFF8FA] to-pink-50/50 ring-2 ring-[#F0186C]/40 shadow-sm"
                      : "border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50/30 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-2xl ${platConfig.color} shadow-2xs`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#D6135F] transition-colors">
                          {lead.senderName}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium">{lead.senderHandle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="font-mono flex items-center gap-0.5 text-[10px] font-black rounded-lg bg-pink-50 px-2 py-0.5 text-[#D6135F] border border-pink-200">
                        <Flame className="h-3 w-3" />
                        {lead.qualificationScore} pts
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{lead.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed font-normal">{lead.message}</p>

                  <div className="mt-1 flex items-center justify-between border-t border-pink-100/70 pt-2 text-[11px]">
                    <span className="font-mono font-black text-emerald-700">{lead.estimatedDealValue}</span>
                    <span className="capitalize font-bold text-[10px] rounded-lg bg-slate-100 px-2 py-0.5 text-slate-700">
                      {lead.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Lead Qualification & 1-Click AI Reply Engine */}
        {activeLead ? (
          <div className="rounded-3xl border border-pink-100 bg-white p-6 space-y-5 shadow-sm">
            <div className="flex flex-row items-start justify-between pb-4 border-b border-pink-100">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    platformIcons[activeLead.platform].color
                  } shadow-xs`}
                >
                  {(() => {
                    const Icon = platformIcons[activeLead.platform].icon;
                    return <Icon className="h-5 w-5" />;
                  })()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">{activeLead.senderName}</h3>
                    <span className="font-mono text-[10px] font-black rounded-full bg-pink-50 px-2.5 py-0.5 text-[#D6135F] border border-pink-200">
                      {activeLead.qualificationScore} / 100 AI SCORE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Channel: <span className="font-bold text-[#D6135F] capitalize">{activeLead.platform}</span> ·{" "}
                    Handle: {activeLead.senderHandle} · Recd: {activeLead.timestamp}
                  </p>
                </div>
              </div>

              {/* Status Selector */}
              <div className="w-40">
                <Select
                  value={activeLead.status}
                  onChange={(e) => onUpdateStatus(activeLead.id, e.target.value as SocialLead["status"])}
                  className="bg-white border-2 border-pink-200 text-slate-800 text-xs rounded-xl focus:border-[#F0186C]"
                >
                  <option value="new">🟡 New Lead</option>
                  <option value="qualified">🟢 Qualified</option>
                  <option value="demo_booked">📅 Demo Booked</option>
                  <option value="proposal_sent">📄 Proposal Sent</option>
                  <option value="won">🎉 Won / Closed</option>
                  <option value="archived">⚪ Archived</option>
                </Select>
              </div>
            </div>

            <div className="space-y-5">
              {/* Original Client Inquiry Box */}
              <div>
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                  Original Client Message
                </label>
                <div className="mt-1.5 rounded-2xl border border-pink-100 bg-pink-50/30 p-4 text-xs sm:text-sm leading-relaxed text-slate-800 font-medium">
                  &ldquo;{activeLead.message}&rdquo;
                </div>
              </div>

              {/* AI Qualification Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50/50 to-rose-50/20 p-4 text-center">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Estimated Scope</div>
                  <div className="font-mono font-black text-emerald-700 text-xs sm:text-sm mt-0.5">
                    {activeLead.estimatedDealValue}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Sentiment / Intent</div>
                  <span className="inline-block mt-0.5 text-[10px] font-bold uppercase rounded-md bg-emerald-100 px-2 py-0.5 text-emerald-800">
                    {activeLead.sentiment.replace("_", " ")}
                  </span>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Assigned Rep</div>
                  <div className="font-bold text-slate-900 text-xs mt-0.5">{activeLead.assignedRep}</div>
                </div>
              </div>

              {/* Tech Interests Tags */}
              <div>
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                  Detected Technology Inquiries
                </label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {activeLead.techInterests.map((tech) => (
                    <span key={tech} className="rounded-xl border border-pink-200 bg-pink-50/60 px-3 py-1 text-xs font-bold text-[#D6135F]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 1-Click AI Reply Engine */}
              <div className="rounded-3xl border-2 border-pink-200 bg-gradient-to-br from-white to-[#FFF5F8] p-5 space-y-3.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#D6135F]">
                    <Sparkles className="h-4 w-4 text-[#F0186C]" />
                    <span>AI-Generated Enterprise Response</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleRegenerateReply(activeLead)}
                    disabled={isGeneratingReply}
                    className="text-slate-600 hover:text-[#D6135F] hover:bg-pink-50 rounded-xl"
                  >
                    <RefreshCw className={`h-3 w-3 ${isGeneratingReply ? "animate-spin" : ""}`} />
                    <span>Regenerate</span>
                  </Button>
                </div>

                <Textarea
                  rows={4}
                  value={activeLead.suggestedReply}
                  onChange={(e) => onUpdateReply(activeLead.id, e.target.value)}
                  className="bg-white border-2 border-pink-100 text-slate-800 text-xs sm:text-sm leading-relaxed rounded-2xl focus:border-[#F0186C]"
                />

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <span className="text-[10px] text-slate-500 font-medium">
                    Tailored for {platformIcons[activeLead.platform].label} format with discovery CTA.
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(activeLead.suggestedReply, activeLead.id)}
                      className="border-2 border-pink-200 bg-white text-slate-700 hover:bg-pink-50 rounded-xl font-bold"
                    >
                      {copiedId === activeLead.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedId === activeLead.id ? "Copied" : "Copy Reply"}</span>
                    </Button>
                    {activeLead.platform === "whatsapp" && (
                      <Button
                        variant="emerald"
                        size="sm"
                        onClick={() => {
                          handleCopy(activeLead.suggestedReply, activeLead.id);
                          window.open(
                            `https://web.whatsapp.com/send?phone=${activeLead.senderHandle.replace(/\D/g, "")}&text=${encodeURIComponent(
                              activeLead.suggestedReply
                            )}`,
                            "_blank"
                          );
                        }}
                        className="shadow-md rounded-xl font-bold"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Send on WhatsApp &rarr;</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
