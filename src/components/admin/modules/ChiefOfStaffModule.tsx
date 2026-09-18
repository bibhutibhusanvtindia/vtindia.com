"use client";

import { useState } from "react";
import {
  Bot,
  Check,
  Copy,
  FileText,
  HelpCircle,
  Lightbulb,
  Loader2,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";
import { Badge } from "@/components/admin/ui/Badge";
import { Input } from "@/components/admin/ui/Input";
import { generateChiefOfStaffResponse, AIResponse } from "@/lib/adminAi";
import {
  FinancialMetrics,
  ProjectHealth,
  AttentionItem,
  SocialLead,
  ProspectItem,
  SubscriptionItem,
} from "@/data/admin/types";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  aiData?: AIResponse;
}

const PROMPT_SUGGESTIONS = [
  "How is the company doing today?",
  "What needs my immediate executive attention?",
  "Prepare our Monday management review agenda",
  "Analyze Q3 revenue vs targets",
  "Draft response to enterprise prospect for SafeAct",
];

export function ChiefOfStaffModule({
  financials,
  projects,
  attentionItems,
  socialLeads,
  prospects,
  subscriptions,
  onSelectTab,
}: {
  financials: FinancialMetrics;
  projects: ProjectHealth[];
  attentionItems: AttentionItem[];
  socialLeads: SocialLead[];
  prospects: ProspectItem[];
  subscriptions: SubscriptionItem[];
  onSelectTab: (tab: string) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Namaste Sir 🙏. I am your AI Chief of Staff with live telemetry across our ₹24.8L monthly revenue, 12 active client projects, overdue receivables, and incoming B2B pipeline. How can I assist leadership today?",
      timestamp: "09:00 AM",
      aiData: {
        answer: "Namaste Sir 🙏. I am your AI Chief of Staff with live telemetry across our ₹24.8L monthly revenue, 12 active client projects, overdue receivables, and incoming B2B pipeline. How can I assist leadership today?",
        suggestedActions: [
          { label: "Check Overdue Receivables", actionId: "view_receivables", targetTab: "proof-vault" },
          { label: "Prepare Management Agenda", actionId: "ask_agenda" },
          { label: "Review Deal Pipeline", actionId: "view_pipeline", targetTab: "deals" },
        ],
      },
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputVal;
    if (!textToSend.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputVal("");
    setIsThinking(true);

    setTimeout(() => {
      const response = generateChiefOfStaffResponse(textToSend, {
        financials,
        projects,
        attentionItems,
        socialLeads,
        prospects,
        subscriptions,
      });

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        aiData: response,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 450);
  };

  const handleSpeechToggle = (textToRead: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = textToRead.replace(/[#*`_]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Module Header Card */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#3D1E30] bg-gradient-to-r from-[#1C0915] via-[#12060E] to-[#2B0E1E] p-5 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D6135F]/20 text-[#FF4D8D]">
              <Bot className="h-4 w-4" />
            </span>
            <h2 className="text-xl font-black tracking-tight text-white">AI Chief of Staff</h2>
            <Badge variant="brand" size="sm">
              Strategic Copilot
            </Badge>
          </div>
          <p className="text-xs text-rose-200/60">
            Natural language executive queries grounded in live revenue telemetry, engineering deliveries, and CRM pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSend("Prepare our Monday management review agenda")}
            className="border-[#3D1E30] bg-[#160A12] text-rose-200 hover:border-[#F0186C]/50 hover:bg-[#200E1C] text-xs gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#FF4D8D]" />
            Generate Board Agenda
          </Button>
        </div>
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[11px] font-bold text-rose-300/60 shrink-0 uppercase tracking-wider">Quick Prompts:</span>
        {PROMPT_SUGGESTIONS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="shrink-0 rounded-xl border border-[#2D1625] bg-[#140810] px-3 py-1.5 text-xs text-rose-200 hover:border-[#F0186C]/50 hover:bg-[#1E0C18] transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Conversation Card */}
      <Card className="flex flex-col h-[580px] border-[#3D1E30] bg-[#10070D]/95 shadow-2xl">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isAi = msg.sender === "ai";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAi ? "items-start" : "items-end justify-end"}`}
              >
                {isAi && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6135F] to-[#F0186C] text-white shadow-md shadow-[#F0186C]/25">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed shadow-sm ${
                    isAi
                      ? "border border-[#2D1625] bg-[#160A13] text-rose-50"
                      : "bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white rounded-br-none"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-70">
                    <span className="font-bold">{isAi ? "AI Chief of Staff" : "Executive"}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Body Content */}
                  <div className="whitespace-pre-wrap space-y-2 font-sans">{msg.text}</div>

                  {/* AI Metrics Highlights if present */}
                  {msg.aiData?.highlightMetrics && msg.aiData.highlightMetrics.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#2A1322] pt-3">
                      {msg.aiData.highlightMetrics.map((m) => (
                        <div key={m.label} className="rounded-xl bg-[#200E1C] p-2 text-center border border-[#3D1E30]">
                          <div className="text-[10px] text-rose-300/70">{m.label}</div>
                          <div className="font-bold text-white font-mono">{m.value}</div>
                          {m.trend && <div className="text-[9px] text-[#FF4D8D] font-semibold">{m.trend}</div>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* AI Suggested Action Buttons if present */}
                  {msg.aiData?.suggestedActions && msg.aiData.suggestedActions.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#2A1322] pt-3">
                      {msg.aiData.suggestedActions.map((act) => (
                        <Button
                          key={act.label}
                          variant="outline"
                          size="xs"
                          onClick={() => {
                            if (act.targetTab) onSelectTab(act.targetTab);
                            else if (act.actionId.startsWith("ask_")) handleSend(act.label);
                          }}
                          className="border-[#3D1E30] bg-[#200E1C] text-rose-200 hover:border-[#F0186C]/50 hover:text-white"
                        >
                          <Sparkles className="h-3 w-3 text-[#FF4D8D]" />
                          {act.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Bottom AI utility buttons */}
                  {isAi && (
                    <div className="mt-3 flex items-center justify-end gap-3 text-[10px] text-rose-300/60 border-t border-[#2A1322] pt-2">
                      <button
                        onClick={() => handleSpeechToggle(msg.text)}
                        className="flex items-center gap-1 hover:text-[#FF4D8D] transition-colors"
                        title="Listen to response"
                      >
                        {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                        <span>{isSpeaking ? "Mute" : "Listen"}</span>
                      </button>
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="flex items-center gap-1 hover:text-[#FF4D8D] transition-colors"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedId === msg.id ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex gap-3 items-center text-xs text-rose-300/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D6135F]/20 text-[#FF4D8D] animate-pulse">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-[#2D1625] bg-[#160A13] p-3">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#FF4D8D]" />
                <span>AI Chief of Staff is analyzing Virtoy company telemetry...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-[#2A1322] bg-[#12070E] p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <Input
              type="text"
              placeholder="Ask your AI Chief of Staff (e.g. 'Prepare our Monday agenda', 'What deals need attention?')..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-[#1A0B16] border-[#3D1E30] text-rose-100 placeholder:text-rose-300/40"
            />
            <Button
              type="submit"
              disabled={!inputVal.trim() || isThinking}
              className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] text-white font-bold"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Ask Assistant</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
