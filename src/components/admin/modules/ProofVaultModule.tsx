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
  };

  const typeConfig: Record<ProofVaultItem["type"], { icon: React.ComponentType<{ className?: string }>; label: string; color: string }> = {
    whatsapp_screenshot: { icon: FileImage, label: "WhatsApp Screenshot", color: "text-emerald-500 bg-emerald-500/10" },
    audio_recording: { icon: FileAudio, label: "Audio Recording", color: "text-indigo-500 bg-indigo-500/10" },
    meeting_note: { icon: FileText, label: "Meeting Minutes", color: "text-amber-500 bg-amber-500/10" },
    contract: { icon: FileCheck2, label: "Executed Contract", color: "text-primary bg-primary/10" },
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">📎 Proof &amp; Discussion Vault</h2>
            <Badge variant="indigo" size="xs">
              Audit Stamped
            </Badge>
          </div>
          <p className="text-xs text-muted">
            Immutable repository of client WhatsApp screenshots, audio calls, and AI-extracted meeting commitments.
          </p>
        </div>

        {/* Upload Proof Dialog */}
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">
              <Plus className="h-3.5 w-3.5" />
              Upload Discussion Proof
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <form onSubmit={handleCreateProof}>
              <DialogHeader>
                <DialogTitle>Upload Client Discussion Proof</DialogTitle>
                <DialogDescription>
                  Attach client screenshots or recordings. AI will extract discussion takeaways and action items.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 mt-4">
                <div>
                  <label className="text-[11px] font-semibold text-muted">Client / Organization Name</label>
                  <Input
                    required
                    placeholder="e.g. Tata Sponge / Aditya Birla"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted">Deal &amp; Project Title</label>
                  <Input
                    required
                    placeholder="e.g. SafeAct Phase 2 VR Training Expansion"
                    value={newDealTitle}
                    onChange={(e) => setNewDealTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-muted">Deal Value</label>
                    <Input
                      placeholder="e.g. ₹14.5L"
                      value={newDealValue}
                      onChange={(e) => setNewDealValue(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted">Proof Type</label>
                    <Select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as ProofVaultItem["type"])}
                      options={[
                        { value: "whatsapp_screenshot", label: "WhatsApp Screenshot" },
                        { value: "audio_recording", label: "Audio Recording" },
                        { value: "meeting_note", label: "Meeting Minutes" },
                        { value: "contract", label: "Executed Contract" },
                      ]}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-muted">Discussion Transcript / Notes</label>
                  <Textarea
                    rows={3}
                    placeholder="Paste WhatsApp discussion text or key bullet points..."
                    value={newTakeawayText}
                    onChange={(e) => setNewTakeawayText(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default" size="sm">
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
          <div className="text-xs text-muted px-1">
            <span>
              Tracking <strong className="text-foreground">{vaultItems.length}</strong> verified proof records
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
                      ? "border-primary bg-primary/[0.04] shadow-md ring-1 ring-primary"
                      : "border-border/80 bg-surface hover:border-border hover:bg-surface-muted/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${cfg.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.clientName}
                        </h4>
                        <p className="text-[11px] text-muted line-clamp-1">{item.dealTitle}</p>
                      </div>
                    </div>

                    <span className="font-mono font-bold text-xs text-foreground shrink-0">{item.dealValue}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-muted border-t border-border/60 pt-2">
                    <span>Uploaded by: <strong className="text-foreground">{item.uploadedBy}</strong></span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Takeaways, Commitments & Action Items */}
        {activeItem ? (
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-start justify-between pb-3 border-b border-border/70">
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
                    <CardTitle className="text-base">{activeItem.clientName}</CardTitle>
                    <Badge variant="indigo" size="xs" className="font-mono">
                      {activeItem.dealValue}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-1">
                    {activeItem.dealTitle} · Attached: {activeItem.fileName}
                  </CardDescription>
                </div>
              </div>

              <Badge variant="outline" size="xs">
                {typeConfig[activeItem.type].label}
              </Badge>
            </CardHeader>

            <CardContent className="pt-5 space-y-5">
              {/* Proof Metadata Chip */}
              <div className="flex items-center justify-between rounded-xl border border-border bg-surface-muted/50 p-3 text-xs text-muted">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-primary" />
                  <span>
                    Audited by: <strong className="text-foreground">{activeItem.uploadedBy}</strong> ({activeItem.uploadedByRole})
                  </span>
                </div>
                <span className="font-mono text-[10px]">{activeItem.timestamp}</span>
              </div>

              {/* AI Key Takeaways */}
              <div>
                <label className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span>AI Extracted Key Discussion Takeaways</span>
                </label>
                <div className="mt-2 space-y-2">
                  {activeItem.takeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-surface-muted/40 p-3 text-xs leading-relaxed text-foreground"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commitments & Agreed Timelines */}
              {activeItem.commitments && activeItem.commitments.length > 0 && (
                <div>
                  <label className="text-[11px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Agreed Client &amp; Company Commitments</span>
                  </label>
                  <div className="mt-2 space-y-1.5">
                    {activeItem.commitments.map((com, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-2.5 text-xs text-foreground"
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
                  <label className="text-[11px] font-bold text-muted uppercase tracking-wider">
                    Follow-Up Action Items &amp; Assigned Reps
                  </label>
                  <div className="mt-2 space-y-2">
                    {activeItem.actionItems.map((act, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-border bg-surface p-3 text-xs"
                      >
                        <span className="font-semibold text-foreground">{act.task}</span>
                        <div className="flex items-center gap-3 text-muted text-[11px]">
                          <span className="text-primary font-medium">{act.assignedTo}</span>
                          <span className="font-mono">Due: {act.due}</span>
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
