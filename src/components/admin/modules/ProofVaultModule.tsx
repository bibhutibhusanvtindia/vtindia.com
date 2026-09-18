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
    whatsapp_screenshot: { icon: FileImage, color: "text-[#FF4D8D] bg-[#D6135F]/15 border border-[#F0186C]/30", label: "WhatsApp Screenshot" },
    audio_recording: { icon: FileAudio, color: "text-purple-400 bg-purple-500/15 border border-purple-500/30", label: "Call Recording" },
    meeting_note: { icon: FileText, color: "text-emerald-400 bg-emerald-500/15 border border-emerald-500/30", label: "Meeting Minutes" },
    contract: { icon: FileCheck2, color: "text-amber-400 bg-amber-500/15 border border-amber-500/30", label: "Executed Contract" },
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#3D1E30] bg-gradient-to-r from-[#1C0915] via-[#12060E] to-[#2B0E1E] p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D6135F]/20 text-[#FF4D8D]">
              <Paperclip className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-black tracking-tight text-white">Client Proof &amp; Discussion Vault</h2>
            <Badge variant="brand" size="xs">
              Audit-Locked Repo
            </Badge>
          </div>
          <p className="text-xs text-rose-200/60">
            Immutable repository of client WhatsApp chats, meeting transcripts, and call recordings with AI commitment extraction.
          </p>
        </div>

        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white gap-1.5 shadow-md shadow-[#F0186C]/25 font-bold">
              <Plus className="h-3.5 w-3.5" />
              Upload Discussion Proof
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-[#0E060C] border-[#3D1E30] text-slate-100">
            <DialogHeader>
              <DialogTitle className="text-white">Upload Client Discussion Proof</DialogTitle>
              <DialogDescription className="text-rose-200/60 text-xs">
                Archive WhatsApp chat screenshots or meeting minutes to automatically synthesize deliverables and action items.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateProof} className="space-y-3.5 py-2 text-xs">
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-rose-200">Client / Organization Name</label>
                  <Input
                    required
                    placeholder="e.g. Tata Sponge / Aditya Birla"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="mt-1 bg-[#1A0B16] border-[#3D1E30]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-rose-200">Deal &amp; Project Title</label>
                  <Input
                    required
                    placeholder="e.g. SafeAct Phase 2 VR Training Expansion"
                    value={newDealTitle}
                    onChange={(e) => setNewDealTitle(e.target.value)}
                    className="mt-1 bg-[#1A0B16] border-[#3D1E30]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-rose-200">Deal Value</label>
                    <Input
                      placeholder="e.g. ₹14.5L"
                      value={newDealValue}
                      onChange={(e) => setNewDealValue(e.target.value)}
                      className="mt-1 bg-[#1A0B16] border-[#3D1E30]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-rose-200">Proof Type</label>
                    <Select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as ProofVaultItem["type"])}
                      className="mt-1 bg-[#1A0B16] border-[#3D1E30] text-rose-100"
                    >
                      <option value="whatsapp_screenshot">WhatsApp Screenshot</option>
                      <option value="audio_recording">Audio Recording</option>
                      <option value="meeting_note">Meeting Minutes</option>
                      <option value="contract">Executed Contract</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-rose-200">Discussion Transcript / Notes</label>
                  <Textarea
                    rows={3}
                    placeholder="Paste WhatsApp discussion text or key bullet points..."
                    value={newTakeawayText}
                    onChange={(e) => setNewTakeawayText(e.target.value)}
                    className="mt-1 bg-[#1A0B16] border-[#3D1E30]"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white font-bold">
                  <UploadCloud className="h-3.5 w-3.5" />
                  Save to Vault
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 2-Column Vault Grid */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1.7fr] lg:items-start">
        {/* Left Column: Proof Items List */}
        <div className="space-y-3">
          <div className="text-xs text-slate-400 px-1">
            <span>
              Tracking <strong className="text-white">{vaultItems.length}</strong> verified proof records
            </span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {vaultItems.map((item) => {
              const isSelected = activeItem?.id === item.id;
              const cfg = typeConfig[item.type];
              const Icon = cfg.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItemId(item.id)}
                  className={`group relative flex flex-col gap-2 rounded-2xl border p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#F0186C] bg-[#1E0C18] shadow-lg shadow-[#F0186C]/10 ring-1 ring-[#F0186C]"
                      : "border-[#2D1625] bg-[#12070E] hover:border-[#F0186C]/40 hover:bg-[#1A0B16]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${cfg.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-rose-100 group-hover:text-[#FF4D8D] transition-colors">
                          {item.clientName}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{item.dealTitle}</p>
                      </div>
                    </div>

                    <span className="font-mono font-bold text-xs text-emerald-400 shrink-0">{item.dealValue}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-[#2A1322] pt-2">
                    <span>Uploaded by: <strong className="text-rose-100">{item.uploadedBy}</strong></span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Takeaways, Commitments & Action Items */}
        {activeItem ? (
          <Card className="border-[#3D1E30] bg-[#10070D]/95 shadow-2xl">
            <CardHeader className="flex flex-row items-start justify-between pb-3 border-b border-[#2A1322]">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                    typeConfig[activeItem.type].color
                  }`}
                >
                  {(() => {
                    const Icon = typeConfig[activeItem.type].icon;
                    return <Icon className="h-5 w-5" />;
                  })()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base text-white">{activeItem.clientName}</CardTitle>
                    <Badge variant="brand" size="xs" className="font-mono">
                      {activeItem.dealValue}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-1 text-xs text-rose-200/60">
                    {activeItem.dealTitle} · Attached: {activeItem.fileName}
                  </CardDescription>
                </div>
              </div>

              <Badge variant="outline" size="xs" className="border-[#3D1E30] text-rose-200">
                {typeConfig[activeItem.type].label}
              </Badge>
            </CardHeader>

            <CardContent className="pt-5 space-y-5">
              {/* Proof Metadata Chip */}
              <div className="flex items-center justify-between rounded-xl border border-[#2D1625] bg-[#160A13] p-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-[#FF4D8D]" />
                  <span>
                    Audited by: <strong className="text-rose-100">{activeItem.uploadedBy}</strong> ({activeItem.uploadedByRole})
                  </span>
                </div>
                <span className="font-mono text-[10px] text-rose-300/70">{activeItem.timestamp}</span>
              </div>

              {/* AI Key Takeaways */}
              <div>
                <label className="text-[11px] font-bold text-rose-300/70 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#FF4D8D]" />
                  <span>AI Extracted Key Discussion Takeaways</span>
                </label>
                <div className="mt-2 space-y-2">
                  {activeItem.takeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl border border-[#2D1625] bg-[#160A13] p-3 text-xs leading-relaxed text-rose-50"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commitments & Agreed Timelines */}
              {activeItem.commitments && activeItem.commitments.length > 0 && (
                <div>
                  <label className="text-[11px] font-bold text-rose-300/70 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Agreed Client &amp; Company Commitments</span>
                  </label>
                  <div className="mt-2 space-y-1.5">
                    {activeItem.commitments.map((com, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-2.5 text-xs text-rose-100"
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
                  <label className="text-[11px] font-bold text-rose-300/70 uppercase tracking-wider">
                    Follow-Up Action Items &amp; Assigned Reps
                  </label>
                  <div className="mt-2 space-y-2">
                    {activeItem.actionItems.map((act, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-[#2D1625] bg-[#160A13] p-3 text-xs"
                      >
                        <span className="font-semibold text-rose-100">{act.task}</span>
                        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                          <span className="text-[#FF4D8D] font-medium">{act.assignedTo}</span>
                          <span className="font-mono text-rose-300/60">Due: {act.due}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
