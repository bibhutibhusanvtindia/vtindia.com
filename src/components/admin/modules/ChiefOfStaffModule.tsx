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
      text: "Namaste Sir. I am your AI Chief of Staff. I have live telemetry on our ₹24.8L monthly revenue, 12 active client projects, overdue receivables, and incoming B2B leads. How can I assist you today?",
      timestamp: "Just now",
      aiData: generateChiefOfStaffResponse("overview", {
        financials,
        projects,
        attentionItems,
        socialLeads,
        prospects,
        subscriptions,
      }),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsThinking(true);

    setTimeout(() => {
      const aiResponse = generateChiefOfStaffResponse(query, {
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
        text: aiResponse.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        aiData: aiResponse,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 450);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeechToggle = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[#*`_]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">🤖 AI Chief of Staff</h2>
            <Badge variant="indigo" size="xs">
              Live Reasoning Active
            </Badge>
          </div>
          <p className="text-xs text-muted">
            Dedicated executive intelligence assistant grounded in real-time Virtoy company operations, cashflows, and deal pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSend("What needs my immediate executive attention?")}
          >
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            Instant Audit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectTab("briefing")}
          >
            <FileText className="h-3.5 w-3.5" />
            Executive Briefing
          </Button>
        </div>
      </div>

      {/* Suggested Quick Starters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-muted">Executive Prompts:</span>
        {PROMPT_SUGGESTIONS.map((sugg) => (
          <button
            key={sugg}
            onClick={() => handleSend(sugg)}
            className="rounded-xl border border-border/80 bg-surface px-3 py-1 text-[11px] font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm active:scale-95"
          >
            {sugg}
          </button>
        ))}
      </div>

      {/* Chat Conversation Card */}
      <Card className="flex flex-col h-[560px]">
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
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed shadow-sm ${
                    isAi
                      ? "border border-border/90 bg-surface text-foreground"
                      : "bg-primary text-white rounded-br-none"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-70">
                    <span className="font-bold">{isAi ? "AI Chief of Staff" : "Executive"}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Body Content */}
                  <div className="whitespace-pre-wrap space-y-2">{msg.text}</div>

                  {/* AI Metrics Highlights if present */}
                  {msg.aiData?.highlightMetrics && msg.aiData.highlightMetrics.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border/70 pt-3">
                      {msg.aiData.highlightMetrics.map((m) => (
                        <div key={m.label} className="rounded-lg bg-surface-muted/80 p-2 text-center">
                          <div className="text-[10px] text-muted">{m.label}</div>
                          <div className="font-bold text-foreground">{m.value}</div>
                          {m.trend && <div className="text-[9px] text-primary">{m.trend}</div>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* AI Suggested Action Buttons if present */}
                  {msg.aiData?.suggestedActions && msg.aiData.suggestedActions.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border/70 pt-3">
                      {msg.aiData.suggestedActions.map((act) => (
                        <Button
                          key={act.label}
                          variant="secondary"
                          size="xs"
                          onClick={() => {
                            if (act.targetTab) onSelectTab(act.targetTab);
                            else if (act.actionId.startsWith("ask_")) handleSend(act.label);
                          }}
                        >
                          <Sparkles className="h-3 w-3 text-indigo-500" />
                          {act.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Bottom AI utility buttons */}
                  {isAi && (
                    <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-muted border-t border-border/40 pt-2">
                      <button
                        onClick={() => handleSpeechToggle(msg.text)}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                        title="Listen to response"
                      >
                        {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                        <span>{isSpeaking ? "Mute" : "Listen"}</span>
                      </button>
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedId === msg.id ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex gap-3 items-center text-xs text-muted">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-600 animate-pulse">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-surface p-3">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                <span>AI Chief of Staff is analyzing Virtoy company telemetry...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-border/80 bg-surface-muted/40 p-4">
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
              className="flex-1 bg-surface"
            />
            <Button type="submit" variant="indigo" disabled={!inputVal.trim() || isThinking}>
              <Send className="h-3.5 w-3.5" />
              <span>Ask Assistant</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
