"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  FileAudio,
  FileCheck2,
  FileImage,
  FileText,
  MessageSquare,
  Paperclip,
  Plus,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  User,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/admin/ui/Dialog";
import { Input } from "@/components/admin/ui/Input";
import { Textarea } from "@/components/admin/ui/Textarea";
import { Select } from "@/components/admin/ui/Select";
import { ProofVaultItem } from "@/data/admin/types";

export function ProofVaultModule({
  vaultItems,
  onAddVaultItem,
}: {
  vaultItems: ProofVaultItem[];
  onAddVaultItem: (item: Omit<ProofVaultItem, "id" | "timestamp" | "uploadedBy" | "uploadedByRole">) => void;
}) {
  const [activeItemId, setActiveItemId] = useState<string>(vaultItems[0]?.id || "");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Form state for new proof upload
  const [newClientName, setNewClientName] = useState("");
  const [newDealTitle, setNewDealTitle] = useState("");
  const [newDealValue, setNewDealValue] = useState("₹5,00,000");
  const [newType, setNewType] = useState<ProofVaultItem["type"]>("whatsapp_screenshot");
  const [newFileName, setNewFileName] = useState("WhatsApp_Chat_Client_Agreement.png");
  const [newTakeawayText, setNewTakeawayText] = useState("");

  const activeItem = vaultItems.find((v) => v.id === activeItemId) || vaultItems[0];

  const handleCreateProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newDealTitle) return;

    onAddVaultItem({
      clientName: newClientName,
      dealTitle: newDealTitle,
      dealValue: newDealValue,
      type: newType,
      fileName: newFileName,
      takeaways: newTakeawayText
        ? newTakeawayText.split("\n").filter(Boolean)
        : [
            "Client confirmed scope approval and milestone schedule.",
            "Agreed on 50% advance invoice against deliverable handover.",
          ],
      commitments: ["Deliver sandbox preview staging within 7 business days."],
      objections: [],
      actionItems: [
        { task: "Prepare commercial agreement draft", assignedTo: "Mrs. Piyali Sahu", due: "2026-09-26" },
      ],
    });

    setIsUploadOpen(false);
    setNewClientName("");
    setNewDealTitle("");
    setNewTakeawayText("");
  };

  const typeConfig: Record<ProofVaultItem["type"], { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
    whatsapp_screenshot: { icon: FileImage, color: "text-[#D6135F] bg-pink-50 border border-pink-200", label: "WhatsApp Screenshot" },
    audio_recording: { icon: FileAudio, color: "text-purple-700 bg-purple-50 border border-purple-200", label: "Call Recording" },
    meeting_note: { icon: FileText, color: "text-emerald-700 bg-emerald-50 border border-emerald-200", label: "Meeting Minutes" },
    contract: { icon: FileCheck2, color: "text-amber-700 bg-amber-50 border border-amber-200", label: "Executed Contract" },
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
                <Paperclip className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Client Proof &amp;{" "}
                <span className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] bg-clip-text text-transparent">
                  Discussion Vault
                </span>
              </h2>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
                Audit-Locked Repo
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Immutable repository of client WhatsApp chats, meeting transcripts, and call recordings with AI commitment extraction.
            </p>
          </div>

          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white gap-2 shadow-md shadow-[#F0186C]/25 font-bold rounded-xl px-4 py-2">
                <Plus className="h-4 w-4" />
                Upload Discussion Proof
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg bg-white border-2 border-pink-200 text-slate-900 shadow-2xl rounded-3xl">
              <DialogHeader>
                <DialogTitle className="text-slate-900">Upload Client Discussion Proof</DialogTitle>
                <DialogDescription className="text-slate-500 text-xs">
                  Archive WhatsApp chat screenshots or meeting minutes to automatically synthesize deliverables and action items.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateProof} className="space-y-3.5 py-2 text-xs">
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Client / Organization Name</label>
                    <Input
                      required
                      placeholder="e.g. Tata Sponge / Aditya Birla"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="mt-1 bg-white border-2 border-pink-100 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Deal &amp; Project Title</label>
                    <Input
                      required
                      placeholder="e.g. SafeAct Phase 2 VR Training Expansion"
                      value={newDealTitle}
                      onChange={(e) => setNewDealTitle(e.target.value)}
                      className="mt-1 bg-white border-2 border-pink-100 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700">Deal Value</label>
                      <Input
                        placeholder="e.g. ₹14.5L"
                        value={newDealValue}
                        onChange={(e) => setNewDealValue(e.target.value)}
                        className="mt-1 bg-white border-2 border-pink-100 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700">Proof Type</label>
                      <Select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as ProofVaultItem["type"])}
                        className="mt-1 bg-white border-2 border-pink-100 text-slate-800 rounded-xl"
                      >
                        <option value="whatsapp_screenshot">WhatsApp Screenshot</option>
                        <option value="audio_recording">Audio Recording</option>
                        <option value="meeting_note">Meeting Minutes</option>
                        <option value="contract">Executed Contract</option>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Discussion Transcript / Notes</label>
                    <Textarea
                      rows={3}
                      placeholder="Paste WhatsApp discussion text or key bullet points..."
                      value={newTakeawayText}
                      onChange={(e) => setNewTakeawayText(e.target.value)}
                      className="mt-1 bg-white border-2 border-pink-100 text-slate-900 rounded-xl"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadOpen(false)} className="rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white font-bold rounded-xl shadow-md shadow-[#F0186C]/25">
                    <UploadCloud className="h-4 w-4" />
                    Save to Vault
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 2-Column Vault Grid */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1.7fr] lg:items-start">
        {/* Left Column: Proof Items List */}
        <div className="space-y-3">
          <div className="text-xs text-slate-500 px-1 font-semibold">
            <span>
              Tracking <strong className="text-[#D6135F] font-bold">{vaultItems.length}</strong> verified proof records
            </span>
          </div>

          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {vaultItems.map((item) => {
              const isSelected = activeItem?.id === item.id;
              const cfg = typeConfig[item.type];
              const Icon = cfg.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItemId(item.id)}
                  className={`group relative flex flex-col gap-2.5 rounded-3xl border p-4 cursor-pointer transition-all shadow-xs ${
                    isSelected
                      ? "border-[#F0186C] bg-gradient-to-br from-[#FFF8FA] to-pink-50/50 ring-2 ring-[#F0186C]/40 shadow-sm"
                      : "border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50/30 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${cfg.color} shadow-2xs`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#D6135F] transition-colors">
                          {item.clientName}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 font-medium">{item.dealTitle}</p>
                      </div>
                    </div>

                    <span className="font-mono font-black text-xs text-emerald-700 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                      {item.dealValue}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-pink-100/70 pt-2 font-medium">
                    <span>Uploaded by: <strong className="text-slate-800">{item.uploadedBy}</strong></span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Takeaways, Commitments & Action Items */}
        {activeItem ? (
          <div className="rounded-3xl border border-pink-100 bg-white p-6 space-y-5 shadow-sm">
            <div className="flex flex-row items-start justify-between pb-4 border-b border-pink-100">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    typeConfig[activeItem.type].color
                  } shadow-xs`}
                >
                  {(() => {
                    const Icon = typeConfig[activeItem.type].icon;
                    return <Icon className="h-5 w-5" />;
                  })()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">{activeItem.clientName}</h3>
                    <span className="font-mono text-xs font-black rounded-lg bg-emerald-50 px-2.5 py-0.5 text-emerald-800 border border-emerald-200">
                      {activeItem.dealValue}
                    </span>
                  </div>
                  <p className="line-clamp-1 text-xs text-slate-500 font-medium mt-0.5">
                    {activeItem.dealTitle} · Attached: {activeItem.fileName}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
                {typeConfig[activeItem.type].label}
              </span>
            </div>

            <div className="space-y-5">
              {/* Proof Metadata Chip */}
              <div className="flex items-center justify-between rounded-2xl border border-pink-200/80 bg-gradient-to-br from-pink-50/40 to-white p-3.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#D6135F]" />
                  <span>
                    Audited by: <strong className="text-slate-900">{activeItem.uploadedBy}</strong> ({activeItem.uploadedByRole})
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#D6135F] font-bold">{activeItem.timestamp}</span>
              </div>

              {/* AI Key Takeaways */}
              <div>
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-[#D6135F]" />
                  <span>AI Extracted Key Discussion Takeaways</span>
                </label>
                <div className="mt-2 space-y-2">
                  {activeItem.takeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-2xl border border-pink-100 bg-pink-50/20 p-3.5 text-xs leading-relaxed text-slate-800 font-medium"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commitments & Agreed Timelines */}
              {activeItem.commitments && activeItem.commitments.length > 0 && (
                <div>
                  <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Agreed Client &amp; Company Commitments</span>
                  </label>
                  <div className="mt-2 space-y-1.5">
                    {activeItem.commitments.map((com, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-950 font-bold"
                      >
                        • {com}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Items Grid */}
              {activeItem.actionItems && activeItem.actionItems.length > 0 && (
                <div>
                  <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
                    Follow-Up Action Items &amp; Assigned Reps
                  </label>
                  <div className="mt-2 space-y-2">
                    {activeItem.actionItems.map((act, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-2xl border border-pink-100 bg-white p-3.5 text-xs shadow-2xs"
                      >
                        <span className="font-bold text-slate-900">{act.task}</span>
                        <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                          <span className="text-[#D6135F] font-bold">{act.assignedTo}</span>
                          <span className="font-mono text-slate-600 font-medium">Due: {act.due}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
