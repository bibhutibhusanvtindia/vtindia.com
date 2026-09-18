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
    whatsapp_screenshot: { icon: FileImage, color: "text-[#D6135F] bg-rose-50 border border-rose-200", label: "WhatsApp Screenshot" },
    audio_recording: { icon: FileAudio, color: "text-purple-700 bg-purple-50 border border-purple-200", label: "Call Recording" },
    meeting_note: { icon: FileText, color: "text-emerald-700 bg-emerald-50 border border-emerald-200", label: "Meeting Minutes" },
    contract: { icon: FileCheck2, color: "text-amber-700 bg-amber-50 border border-amber-200", label: "Executed Contract" },
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-rose-200/70 bg-gradient-to-r from-rose-50/90 via-pink-50/50 to-rose-100/50 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-[#D6135F] shadow-sm">
              <Paperclip className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Client Proof &amp; Discussion Vault</h2>
            <Badge variant="brand" size="xs">
              Audit-Locked Repo
            </Badge>
          </div>
          <p className="text-xs text-slate-600">
            Immutable repository of client WhatsApp chats, meeting transcripts, and call recordings with AI commitment extraction.
          </p>
        </div>

        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white gap-1.5 shadow-sm shadow-[#F0186C]/25 font-bold">
              <Plus className="h-3.5 w-3.5" />
              Upload Discussion Proof
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-white border-slate-200 text-slate-900">
            <DialogHeader>
              <DialogTitle className="text-slate-900">Upload Client Discussion Proof</DialogTitle>
              <DialogDescription className="text-slate-500 text-xs">
                Archive WhatsApp chat screenshots or meeting minutes to automatically synthesize deliverables and action items.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateProof} className="space-y-3.5 py-2 text-xs">
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Client / Organization Name</label>
                  <Input
                    required
                    placeholder="e.g. Tata Sponge / Aditya Birla"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="mt-1 bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Deal &amp; Project Title</label>
                  <Input
                    required
                    placeholder="e.g. SafeAct Phase 2 VR Training Expansion"
                    value={newDealTitle}
                    onChange={(e) => setNewDealTitle(e.target.value)}
                    className="mt-1 bg-white border-slate-200 text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700">Deal Value</label>
                    <Input
                      placeholder="e.g. ₹14.5L"
                      value={newDealValue}
                      onChange={(e) => setNewDealValue(e.target.value)}
                      className="mt-1 bg-white border-slate-200 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700">Proof Type</label>
                    <Select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as ProofVaultItem["type"])}
                      className="mt-1 bg-white border-slate-200 text-slate-800"
                    >
                      <option value="whatsapp_screenshot">WhatsApp Screenshot</option>
                      <option value="audio_recording">Audio Recording</option>
                      <option value="meeting_note">Meeting Minutes</option>
                      <option value="contract">Executed Contract</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Discussion Transcript / Notes</label>
                  <Textarea
                    rows={3}
                    placeholder="Paste WhatsApp discussion text or key bullet points..."
                    value={newTakeawayText}
                    onChange={(e) => setNewTakeawayText(e.target.value)}
                    className="mt-1 bg-white border-slate-200 text-slate-900"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadOpen(false)} className="border-slate-200 text-slate-700">
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white font-bold shadow-sm shadow-[#F0186C]/25">
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
          <div className="text-xs text-slate-500 px-1">
            <span>
              Tracking <strong className="text-slate-900">{vaultItems.length}</strong> verified proof records
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
                  className={`group relative flex flex-col gap-2 rounded-2xl border p-4 cursor-pointer transition-all shadow-sm ${
                    isSelected
                      ? "border-[#F0186C] bg-rose-50/60 ring-1 ring-[#F0186C]"
                      : "border-slate-200/80 bg-white hover:border-rose-300 hover:bg-rose-50/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${cfg.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#D6135F] transition-colors">
                          {item.clientName}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{item.dealTitle}</p>
                      </div>
                    </div>

                    <span className="font-mono font-bold text-xs text-emerald-700 shrink-0">{item.dealValue}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-100 pt-2">
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
          <Card className="border-slate-200/80 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between pb-3 border-b border-slate-100">
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
                    <CardTitle className="text-base text-slate-900">{activeItem.clientName}</CardTitle>
                    <Badge variant="brand" size="xs" className="font-mono">
                      {activeItem.dealValue}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-1 text-xs text-slate-500">
                    {activeItem.dealTitle} · Attached: {activeItem.fileName}
                  </CardDescription>
                </div>
              </div>

              <Badge variant="outline" size="xs" className="border-slate-200 text-slate-700">
                {typeConfig[activeItem.type].label}
              </Badge>
            </CardHeader>

            <CardContent className="pt-5 space-y-5">
              {/* Proof Metadata Chip */}
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-[#D6135F]" />
                  <span>
                    Audited by: <strong className="text-slate-900">{activeItem.uploadedBy}</strong> ({activeItem.uploadedByRole})
                  </span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">{activeItem.timestamp}</span>
              </div>

              {/* AI Key Takeaways */}
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#D6135F]" />
                  <span>AI Extracted Key Discussion Takeaways</span>
                </label>
                <div className="mt-2 space-y-2">
                  {activeItem.takeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-800"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commitments & Agreed Timelines */}
              {activeItem.commitments && activeItem.commitments.length > 0 && (
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Agreed Client &amp; Company Commitments</span>
                  </label>
                  <div className="mt-2 space-y-1.5">
                    {activeItem.commitments.map((com, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-2.5 text-xs text-emerald-950 font-medium"
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
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Follow-Up Action Items &amp; Assigned Reps
                  </label>
                  <div className="mt-2 space-y-2">
                    {activeItem.actionItems.map((act, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
                      >
                        <span className="font-semibold text-slate-900">{act.task}</span>
                        <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                          <span className="text-[#D6135F] font-medium">{act.assignedTo}</span>
                          <span className="font-mono text-slate-600">Due: {act.due}</span>
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
