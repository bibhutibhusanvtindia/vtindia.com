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
    whatsapp: { icon: WhatsAppIcon, color: "text-emerald-400 bg-emerald-500/15 border border-emerald-500/30", label: "WhatsApp" },
    instagram: { icon: InstagramIcon, color: "text-[#FF4D8D] bg-[#D6135F]/15 border border-[#F0186C]/30", label: "Instagram" },
    youtube: { icon: YoutubeIcon, color: "text-red-400 bg-red-500/15 border border-red-500/30", label: "YouTube" },
    twitter: { icon: XIcon, color: "text-sky-400 bg-sky-500/15 border border-sky-500/30", label: "Twitter (X)" },
    facebook: { icon: FacebookIcon, color: "text-blue-400 bg-blue-500/15 border border-blue-500/30", label: "Facebook" },
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
      <div className="flex flex-col gap-4 rounded-2xl border border-[#3D1E30] bg-gradient-to-r from-[#1C0915] via-[#12060E] to-[#2B0E1E] p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D6135F]/20 text-[#FF4D8D]">
              <MessageSquare className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-black tracking-tight text-white">Omnichannel Social Lead Capture</h2>
            <Badge variant="emerald" size="xs">
              Live Stream Active
            </Badge>
          </div>
          <p className="text-xs text-rose-200/60">
            Auto-capture and AI-qualify client inquiries from Instagram, YouTube, WhatsApp, Twitter (X), and Facebook.
          </p>
        </div>

        {/* Platform Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#3D1E30] bg-[#140810] p-1 shadow-sm">
          {["all", "whatsapp", "instagram", "youtube", "twitter", "facebook"].map((plat) => (
            <button
              key={plat}
              onClick={() => setSelectedPlatform(plat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-all ${
                selectedPlatform === plat
                  ? "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white shadow-sm font-bold"
                  : "text-slate-400 hover:text-white hover:bg-[#200E1C]"
              }`}
            >
              {plat}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Interface */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1.7fr] lg:items-start">
        {/* Left Column: List of Leads */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Showing <strong className="text-white">{filteredLeads.length}</strong> incoming inquiries
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              Total Deal Value: ₹47.3L
            </span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredLeads.map((lead) => {
              const isSelected = activeLead?.id === lead.id;
              const platConfig = platformIcons[lead.platform];
              const IconComponent = platConfig.icon;

              return (
                <div
                  key={lead.id}
                  onClick={() => setActiveLeadId(lead.id)}
                  className={`group relative flex flex-col gap-2 rounded-2xl border p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#F0186C] bg-[#1E0C18] shadow-lg shadow-[#F0186C]/10 ring-1 ring-[#F0186C]"
                      : "border-[#2D1625] bg-[#12070E] hover:border-[#F0186C]/40 hover:bg-[#1A0B16]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${platConfig.color}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-rose-100 group-hover:text-[#FF4D8D] transition-colors">
                          {lead.senderName}
                        </h4>
                        <p className="text-[10px] text-slate-400">{lead.senderHandle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant={
                          lead.qualificationScore >= 90
                            ? "brand"
                            : lead.qualificationScore >= 80
                            ? "success"
                            : "secondary"
                        }
                        size="xs"
                        className="font-mono flex items-center gap-0.5"
                      >
                        <Flame className="h-2.5 w-2.5" />
                        {lead.qualificationScore} pts
                      </Badge>
                      <span className="text-[10px] text-slate-400">{lead.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{lead.message}</p>

                  <div className="mt-1 flex items-center justify-between border-t border-[#2A1322] pt-2 text-[11px]">
                    <span className="font-mono font-bold text-emerald-400">{lead.estimatedDealValue}</span>
                    <Badge variant="outline" size="xs" className="capitalize border-[#3D1E30] text-rose-200">
                      {lead.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Lead Qualification & 1-Click AI Reply Engine */}
        {activeLead ? (
          <Card className="border-[#3D1E30] bg-[#10070D]/95 shadow-2xl">
            <CardHeader className="flex flex-row items-start justify-between pb-3 border-b border-[#2A1322]">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                    platformIcons[activeLead.platform].color
                  }`}
                >
                  {(() => {
                    const Icon = platformIcons[activeLead.platform].icon;
                    return <Icon className="h-5 w-5" />;
                  })()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base text-white">{activeLead.senderName}</CardTitle>
                    <Badge variant="brand" size="xs" className="font-mono">
                      {activeLead.qualificationScore} / 100 AI SCORE
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-rose-200/60">
                    Channel: <span className="font-semibold text-rose-100 capitalize">{activeLead.platform}</span> ·{" "}
                    Handle: {activeLead.senderHandle} · Recd: {activeLead.timestamp}
                  </CardDescription>
                </div>
              </div>

              {/* Status Selector */}
              <div className="w-36">
                <Select
                  value={activeLead.status}
                  onChange={(e) => onUpdateStatus(activeLead.id, e.target.value as SocialLead["status"])}
                  className="bg-[#1A0B16] border-[#3D1E30] text-rose-100 text-xs"
                >
                  <option value="new">🟡 New Lead</option>
                  <option value="qualified">🟢 Qualified</option>
                  <option value="demo_booked">📅 Demo Booked</option>
                  <option value="proposal_sent">📄 Proposal Sent</option>
                  <option value="won">🎉 Won / Closed</option>
                  <option value="archived">⚪ Archived</option>
                </Select>
              </div>
            </CardHeader>

            <CardContent className="pt-5 space-y-5">
              {/* Original Client Inquiry Box */}
              <div>
                <label className="text-[11px] font-bold text-rose-300/70 uppercase tracking-wider">
                  Original Client Message
                </label>
                <div className="mt-1.5 rounded-2xl border border-[#2D1625] bg-[#160A13] p-4 text-xs leading-relaxed text-rose-50">
                  &ldquo;{activeLead.message}&rdquo;
                </div>
              </div>

              {/* AI Qualification Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-[#2D1625] bg-[#140810] p-3.5 text-center">
                <div>
                  <div className="text-[10px] text-slate-400">Estimated Deal Scope</div>
                  <div className="font-mono font-bold text-emerald-400 text-xs sm:text-sm mt-0.5">
                    {activeLead.estimatedDealValue}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Sentiment / Intent</div>
                  <Badge variant="success" size="xs" className="mt-0.5 uppercase">
                    {activeLead.sentiment.replace("_", " ")}
                  </Badge>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Assigned Growth Rep</div>
                  <div className="font-semibold text-rose-100 text-xs mt-0.5">{activeLead.assignedRep}</div>
                </div>
              </div>

              {/* Tech Interests Tags */}
              <div>
                <label className="text-[11px] font-bold text-rose-300/70 uppercase tracking-wider">
                  Detected Technology Inquiries
                </label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {activeLead.techInterests.map((tech) => (
                    <Badge key={tech} variant="secondary" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 1-Click AI Reply Engine */}
              <div className="rounded-2xl border border-[#3D1E30] bg-[#160A13] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF4D8D]">
                    <Sparkles className="h-4 w-4" />
                    <span>AI-Generated Enterprise Response</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleRegenerateReply(activeLead)}
                    disabled={isGeneratingReply}
                    className="text-slate-400 hover:text-white"
                  >
                    <RefreshCw className={`h-3 w-3 ${isGeneratingReply ? "animate-spin" : ""}`} />
                    <span>Regenerate</span>
                  </Button>
                </div>

                <Textarea
                  rows={4}
                  value={activeLead.suggestedReply}
                  onChange={(e) => onUpdateReply(activeLead.id, e.target.value)}
                  className="bg-[#1A0B16] border-[#3D1E30] text-rose-100 text-xs leading-relaxed"
                />

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <span className="text-[10px] text-slate-400">
                    Tailored for {platformIcons[activeLead.platform].label} format with discovery CTA.
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(activeLead.suggestedReply, activeLead.id)}
                    >
                      {copiedId === activeLead.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
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
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Send on WhatsApp &rarr;</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
