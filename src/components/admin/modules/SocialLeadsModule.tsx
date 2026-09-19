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
  Plus,
  RefreshCw,
  Send,
  Sparkles,
  TrendingUp,
  UserCheck,
  X,
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
import { Input } from "@/components/admin/ui/Input";
import { Select } from "@/components/admin/ui/Select";
import { Textarea } from "@/components/admin/ui/Textarea";
import { SocialLead, SocialPlatform, PipelineDeal } from "@/data/admin/types";
import { LeadSourcePieChart } from "@/components/admin/charts";

export function SocialLeadsModule({
  leads,
  onUpdateStatus,
  onUpdateReply,
  onAddLead,
  onAddDeal,
  onSelectTab,
}: {
  leads: SocialLead[];
  onUpdateStatus: (id: string, status: SocialLead["status"]) => void;
  onUpdateReply: (id: string, reply: string) => void;
  onAddLead?: (lead: Omit<SocialLead, "id" | "timestamp">) => void;
  onAddDeal?: (deal: Omit<PipelineDeal, "id" | "lastActivity">) => void;
  onSelectTab?: (tabId: string) => void;
}) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [activeLeadId, setActiveLeadId] = useState<string>(leads[0]?.id || "");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [convertedDealId, setConvertedDealId] = useState<string | null>(null);

  // New Inbound Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    platform: "whatsapp" as SocialPlatform,
    senderName: "",
    senderHandle: "",
    message: "",
    qualificationScore: 92,
    sentiment: "high_intent" as SocialLead["sentiment"],
    estimatedDealValue: "₹8.0L",
    assignedRep: "Rakesh Panda",
    techInterests: ["Custom ERP", "Mobile App"],
    suggestedReply: "",
  });
  const [isAutoQualifying, setIsAutoQualifying] = useState(false);

  const filteredLeads = leads.filter((lead) => {
    if (selectedPlatform === "all") return true;
    return lead.platform === selectedPlatform;
  });

  const activeLead = leads.find((l) => l.id === activeLeadId) || filteredLeads[0] || leads[0];

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
      const refreshedReply = `Namaste ${lead.senderName}! Thank you for reaching out to Virtoy Technologies regarding ${lead.techInterests.join(
        " & "
      )}. We have engineered similar high-reliability systems for Tata Steel, state healthcare, and hospitality chains. We can schedule an exclusive 15-minute live technical demonstration for your team tomorrow. Would morning 11:30 AM or afternoon 4:00 PM suit you?`;
      onUpdateReply(lead.id, refreshedReply);
      setIsGeneratingReply(false);
    }, 400);
  };

  // Convert Social Lead to Pipeline Deal Matrix
  const handleConvertToDeal = (lead: SocialLead) => {
    if (onAddDeal) {
      const numMatch = lead.estimatedDealValue.match(/\d+(\.\d+)?/);
      const valLakhs = numMatch ? parseFloat(numMatch[0]) : 7.5;
      const dealVal = valLakhs < 100 ? valLakhs * 100000 : valLakhs;

      onAddDeal({
        title: `Inbound ${lead.techInterests[0] || "Custom Tech"} Project (${lead.senderName})`,
        company: lead.senderName,
        sector: lead.techInterests.join(" / "),
        location: "India / Inbound",
        stage: "discovery",
        dealValue: Math.round(dealVal),
        winProbability: lead.qualificationScore > 90 ? 75 : 60,
        leadRep: lead.assignedRep,
        aiHealthScore: lead.qualificationScore,
        aiBottleneck: `High-intent inbound inquiry received via ${platformIcons[lead.platform].label}. Awaiting demo confirmation.`,
        aiNextBestAction: `Dispatch calendar link and 1-page architecture PDF via ${platformIcons[lead.platform].label}.`,
        expectedClose: new Date(Date.now() + 25 * 86400000).toISOString().split("T")[0],
      });

      onUpdateStatus(lead.id, "won");
      setConvertedDealId(lead.id);
      setTimeout(() => setConvertedDealId(null), 4000);
    }
  };

  // Auto-Qualify Inbound Lead
  const handleAutoQualify = () => {
    if (!newLeadForm.message) {
      alert("Please enter the client message first.");
      return;
    }
    setIsAutoQualifying(true);
    setTimeout(() => {
      const msg = newLeadForm.message.toLowerCase();
      let detectedTech = ["Custom Enterprise Web/App"];
      let estVal = "₹6.5L - ₹9.0L";
      let rep = "Rakesh Panda";

      if (msg.includes("hotel") || msg.includes("resort") || msg.includes("pms") || msg.includes("booking")) {
        detectedTech = ["Hotel-PMS", "WhatsApp Guest Check-in", "OTA Channel Sync"];
        estVal = "₹7.5L";
        rep = "Rakesh Panda";
      } else if (msg.includes("vr") || msg.includes("safety") || msg.includes("hazard") || msg.includes("industrial") || msg.includes("steel")) {
        detectedTech = ["SafeAct VR", "6-DoF Spatial Simulators", "Industrial Safety App"];
        estVal = "₹18.0L";
        rep = "Ashwin Yadav";
      } else if (msg.includes("hospital") || msg.includes("doctor") || msg.includes("clinic") || msg.includes("opd") || msg.includes("hms")) {
        detectedTech = ["Hospital HMS", "NABH Registry", "Smart QR OPD"];
        estVal = "₹12.5L";
        rep = "Niranjan Sahu";
      } else if (msg.includes("naac") || msg.includes("college") || msg.includes("university") || msg.includes("iqac")) {
        detectedTech = ["Education ERP", "NAAC/NBA Automation", "Student Portal"];
        estVal = "₹5.5L";
        rep = "Mr. Kailash Patnaik";
      }

      const reply = `Namaste ${newLeadForm.senderName || "Sir/Madam"}! Thank you for contacting Virtoy Technologies. We specialize in ${detectedTech.join(
        ", "
      )} with proven deployments for enterprise leaders. We would love to host a 15-minute live interactive demonstration for your team this week. When would be a convenient time?`;

      setNewLeadForm((prev) => ({
        ...prev,
        qualificationScore: 95,
        sentiment: "high_intent",
        techInterests: detectedTech,
        estimatedDealValue: estVal,
        assignedRep: rep,
        suggestedReply: reply,
      }));
      setIsAutoQualifying(false);
    }, 450);
  };

  const handleCreateInboundLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.senderName || !newLeadForm.message || !onAddLead) return;

    onAddLead({
      platform: newLeadForm.platform,
      senderName: newLeadForm.senderName,
      senderHandle: newLeadForm.senderHandle || "@client",
      message: newLeadForm.message,
      qualificationScore: newLeadForm.qualificationScore,
      sentiment: newLeadForm.sentiment,
      estimatedDealValue: newLeadForm.estimatedDealValue,
      status: "new",
      suggestedReply:
        newLeadForm.suggestedReply ||
        `Thank you for reaching out to Virtoy Technologies! We will connect with you shortly.`,
      assignedRep: newLeadForm.assignedRep,
      techInterests: newLeadForm.techInterests,
    });

    setIsAddModalOpen(false);
    setNewLeadForm({
      platform: "whatsapp",
      senderName: "",
      senderHandle: "",
      message: "",
      qualificationScore: 92,
      sentiment: "high_intent",
      estimatedDealValue: "₹8.0L",
      assignedRep: "Rakesh Panda",
      techInterests: ["Custom ERP", "Mobile App"],
      suggestedReply: "",
    });
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
                  Capture Engine
                </span>
              </h2>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                Live Inbound Stream
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Auto-capture, AI-qualify, and instantly respond to client inquiries from WhatsApp, Instagram, YouTube, Twitter (X), and Facebook.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onAddLead && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddModalOpen(true)}
                className="border-2 border-pink-200 bg-white text-slate-800 hover:bg-pink-50 rounded-xl font-bold gap-1.5 shadow-2xs"
              >
                <Plus className="h-4 w-4 text-[#D6135F]" />
                <span>Simulate Inbound Inquiry</span>
              </Button>
            )}

            {/* Platform Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1 rounded-2xl border-2 border-pink-200 bg-white p-1 shadow-2xs">
              {["all", "whatsapp", "instagram", "youtube", "twitter", "facebook"].map((plat) => (
                <button
                  key={plat}
                  onClick={() => setSelectedPlatform(plat)}
                  className={`rounded-xl px-2.5 py-1 text-xs font-bold capitalize transition-all ${
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
              Total Inbound Pipeline: ₹47.3L
            </span>
          </div>

          <div className="space-y-3 max-h-[660px] overflow-y-auto pr-1">
            {filteredLeads.map((lead) => {
              const isSelected = activeLead?.id === lead.id;
              const platConfig = platformIcons[lead.platform];
              const IconComponent = platConfig.icon;

              return (
                <div
                  key={lead.id}
                  onClick={() => setActiveLeadId(lead.id)}
                  className={`group relative flex flex-col gap-3 rounded-3xl border p-4.5 cursor-pointer transition-all shadow-xs ${
                    isSelected
                      ? "border-[#F0186C] bg-gradient-to-br from-[#FFF8FA] to-pink-50/50 ring-2 ring-[#F0186C]/40 shadow-sm"
                      : "border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50/30 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${platConfig.color}`}>
                        <IconComponent className="h-4 w-4" />
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#D6135F] transition-colors">
                          {lead.senderName}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-medium">{lead.senderHandle}</span>
                      </div>
                    </div>

                    {/* AI Score Badge */}
                    <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-black text-emerald-700 border border-emerald-200">
                      <Flame className="h-3.5 w-3.5 text-emerald-600 fill-emerald-600" />
                      <span>{lead.qualificationScore}% Score</span>
                    </div>
                  </div>

                  {/* Message Preview */}
                  <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed bg-pink-50/30 p-2.5 rounded-2xl border border-pink-100/60">
                    &ldquo;{lead.message}&rdquo;
                  </p>

                  {/* Bottom Metadata */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-pink-100/70 pt-2 font-medium">
                    <span className="font-mono text-emerald-700 font-bold">{lead.estimatedDealValue}</span>
                    <span className="text-[10px] text-slate-400">{lead.timestamp}</span>
                    <span className={`capitalize font-bold text-[10px] rounded-lg px-2 py-0.5 ${
                      lead.status === "won"
                        ? "bg-emerald-100 text-emerald-800 font-black border border-emerald-300"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {lead.status === "won" ? "🎉 Won Deal" : lead.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Lead Deep Intelligence & 1-Click Action Hub */}
        {activeLead ? (
          <div className="rounded-3xl border border-pink-100 bg-white p-6 space-y-5 shadow-sm">
            {/* Converted Deal Alert */}
            {convertedDealId === activeLead.id && (
              <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4 flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-2.5">
                  <Check className="h-5 w-5 text-emerald-600 font-black" />
                  <div>
                    <h5 className="text-xs font-black text-emerald-900">Successfully Transferred to Pipeline Deal Matrix!</h5>
                    <p className="text-[11px] text-emerald-700">Created new deal under {activeLead.assignedRep}.</p>
                  </div>
                </div>
                {onSelectTab && (
                  <Button
                    size="xs"
                    onClick={() => onSelectTab("deals")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs gap-1"
                  >
                    <span>View Deals ➔</span>
                  </Button>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-pink-100">
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${platformIcons[activeLead.platform].color}`}>
                  {(() => {
                    const Icon = platformIcons[activeLead.platform].icon;
                    return <Icon className="h-5 w-5" />;
                  })()}
                </span>
                <div>
                  <h3 className="text-base font-black text-slate-900">{activeLead.senderName}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span>{activeLead.senderHandle}</span>
                    <span>&bull;</span>
                    <span className="capitalize text-[#D6135F] font-bold">{platformIcons[activeLead.platform].label}</span>
                  </div>
                </div>
              </div>

              {/* Status Update & Convert Buttons */}
              <div className="flex items-center gap-2">
                <div className="w-36">
                  <Select
                    value={activeLead.status}
                    onChange={(e) => onUpdateStatus(activeLead.id, e.target.value as SocialLead["status"])}
                    className="bg-white border-2 border-pink-200 text-slate-800 text-xs rounded-xl focus:border-[#F0186C]"
                  >
                    <option value="new">🆕 New</option>
                    <option value="qualified">🔥 Qualified</option>
                    <option value="demo_booked">📅 Demo Booked</option>
                    <option value="proposal_sent">📄 Proposal Sent</option>
                    <option value="won">🎉 Won Deal</option>
                    <option value="archived">📁 Archived</option>
                  </Select>
                </div>

                {activeLead.status !== "won" && onAddDeal && (
                  <Button
                    size="xs"
                    onClick={() => handleConvertToDeal(activeLead)}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl text-xs gap-1 shadow-sm"
                    title="Convert into Active Deal"
                  >
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Convert to Deal</span>
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-5">
              {/* Full Inbound Client Message */}
              <div>
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                  Original Inbound Inquiry
                </label>
                <div className="mt-1.5 rounded-2xl border border-pink-100 bg-pink-50/30 p-4 text-xs sm:text-sm leading-relaxed text-slate-800 font-normal">
                  &ldquo;{activeLead.message}&rdquo;
                </div>
              </div>

              {/* AI Qualification Metrics Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50/40 to-white p-4">
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">AI Score</div>
                  <div className="font-mono font-black text-[#D6135F] text-base mt-0.5">
                    {activeLead.qualificationScore}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Estimated Scope</div>
                  <div className="font-mono font-black text-emerald-700 text-xs sm:text-sm mt-0.5">
                    {activeLead.estimatedDealValue}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Sentiment</div>
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
                        size="sm"
                        onClick={() => {
                          handleCopy(activeLead.suggestedReply, activeLead.id);
                          window.open(
                            `https://wa.me/${activeLead.senderHandle.replace(/\D/g, "")}?text=${encodeURIComponent(
                              activeLead.suggestedReply
                            )}`,
                            "_blank"
                          );
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm text-xs gap-1.5"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>Send WhatsApp ➔</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Modal: Simulate / Log Inbound Inquiry */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl border-2 border-pink-200 bg-white p-6 sm:p-7 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-100 text-[#D6135F]">
                  <Plus className="h-4 w-4" />
                </span>
                <h3 className="text-lg font-black text-slate-900">Simulate / Capture Inbound Inquiry</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-pink-50 flex items-center justify-center text-slate-500 hover:text-[#D6135F]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInboundLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Platform Channel</label>
                  <Select
                    value={newLeadForm.platform}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, platform: e.target.value as SocialPlatform })}
                    className="border-pink-200 rounded-xl"
                  >
                    <option value="whatsapp">🟢 WhatsApp</option>
                    <option value="instagram">📸 Instagram</option>
                    <option value="youtube">▶️ YouTube</option>
                    <option value="twitter">🐦 Twitter (X)</option>
                    <option value="facebook">👥 Facebook</option>
                  </Select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Sender / Company Name *</label>
                  <Input
                    required
                    placeholder="e.g. Dr. Rajesh Verma / Heritage Hotel"
                    value={newLeadForm.senderName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, senderName: e.target.value })}
                    className="border-pink-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Sender Phone / Handle</label>
                <Input
                  placeholder="e.g. +91 98618 02325 or @heritage_hotel"
                  value={newLeadForm.senderHandle}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, senderHandle: e.target.value })}
                  className="border-pink-200 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Inbound Message / Inquiry Text *</label>
                <Textarea
                  required
                  rows={3}
                  placeholder="e.g. We are looking for custom Hotel-PMS software with WhatsApp room keys for our 80-room property in Puri..."
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  className="border-pink-200 rounded-xl text-xs"
                />
              </div>

              {/* AI Auto-Qualify Trigger */}
              <div className="rounded-2xl border border-pink-200 bg-pink-50/60 p-3 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-[#D6135F]">AI Inbound Lead Qualification</h5>
                  <p className="text-[11px] text-slate-600">Auto-detect tech domain, estimate deal value, and draft instant reply.</p>
                </div>
                <Button
                  type="button"
                  size="xs"
                  disabled={isAutoQualifying}
                  onClick={handleAutoQualify}
                  className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white font-bold rounded-xl text-xs gap-1 shadow-xs"
                >
                  <Sparkles className={`h-3.5 w-3.5 ${isAutoQualifying ? "animate-spin" : ""}`} />
                  <span>{isAutoQualifying ? "Analyzing..." : "Auto-Qualify"}</span>
                </Button>
              </div>

              {newLeadForm.suggestedReply && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Drafted AI Reply</label>
                  <Textarea
                    rows={3}
                    value={newLeadForm.suggestedReply}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, suggestedReply: e.target.value })}
                    className="border-pink-200 rounded-xl text-xs"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-pink-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-600 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white font-bold rounded-xl px-5"
                >
                  Capture &amp; Process Lead
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
