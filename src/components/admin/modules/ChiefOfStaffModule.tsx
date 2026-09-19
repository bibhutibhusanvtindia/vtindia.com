"use client";

import { useState, useRef, useEffect } from "react";
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
  PipelineDeal,
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
  deals = [],
  onSelectTab,
}: {
  financials: FinancialMetrics;
  projects: ProjectHealth[];
  attentionItems: AttentionItem[];
  socialLeads: SocialLead[];
  prospects: ProspectItem[];
  subscriptions: SubscriptionItem[];
  deals?: PipelineDeal[];
  onSelectTab: (tab: string) => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Namaste Sir 🙏. I am your AI Chief of Staff with live telemetry across Virtoy enterprise operations, active client projects, receivables, and incoming B2B pipeline. How can I assist leadership today?",
      timestamp: "09:00 AM",
      aiData: {
        answer: "Namaste Sir 🙏. I am your AI Chief of Staff with live telemetry across Virtoy enterprise operations, active client projects, receivables, and incoming B2B pipeline. How can I assist leadership today?",
        suggestedActions: [
          { label: "Check Operational Telemetry", actionId: "view_receivables", targetTab: "dashboard" },
          { label: "Explore Deal Matrix", actionId: "view_deals", targetTab: "deals" },
          { label: "Scout B2B Radar", actionId: "scout_radar", targetTab: "prospector" },
        ],
      },
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputVal;
    if (!textToSend.trim() || isThinking) return;

    // Check voice navigation shortcuts
    const lower = textToSend.toLowerCase();
    if (lower.includes("go to deal") || lower.includes("open deal") || lower.includes("show deal")) {
      onSelectTab("deals");
    } else if (lower.includes("go to lead") || lower.includes("open lead") || lower.includes("show lead")) {
      onSelectTab("social-leads");
    } else if (lower.includes("go to prospect") || lower.includes("open prospect") || lower.includes("scout")) {
      onSelectTab("prospector");
    } else if (lower.includes("go to briefing") || lower.includes("generate report")) {
      onSelectTab("briefing");
    }

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
        deals,
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

  const handleVoiceListenToggle = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice speech recognition is supported in Google Chrome and Microsoft Edge. Please use Chrome/Edge or type your query.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setInputVal(transcript);
          handleSend(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
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
      <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200/90 bg-gradient-to-br from-white via-[#FFF5F8] to-[#FCE7F3]/70 p-6 sm:p-7 shadow-sm">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-[#F0186C]/15 to-[#FF4D8D]/5 blur-3xl" />
        
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-sm shadow-[#F0186C]/25">
                <Bot className="h-5 w-5" />
              </span>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                AI Chief of Staff{" "}
                <span className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] bg-clip-text text-transparent">
                  Copilot
                </span>
              </h2>
              <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#D6135F] border border-pink-200">
                Strategic AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Natural language executive queries grounded in live revenue telemetry, engineering deliveries, and CRM pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSend("Prepare our Monday management review agenda")}
              className="border-2 border-pink-200 bg-white text-[#D6135F] hover:bg-pink-50 hover:border-[#F0186C] font-bold text-xs gap-1.5 px-3.5 py-2 rounded-xl shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#F0186C]" />
              Generate Board Agenda
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[11px] font-black text-[#D6135F] shrink-0 uppercase tracking-wider">Quick Prompts:</span>
        {PROMPT_SUGGESTIONS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="shrink-0 rounded-2xl border border-pink-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#F0186C] hover:bg-pink-50 hover:text-[#D6135F] transition-all shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Conversation Card */}
      <div className="flex flex-col h-[600px] rounded-3xl border border-pink-100 bg-white shadow-sm overflow-hidden">
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
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6135F] to-[#F0186C] text-white shadow-sm shadow-[#F0186C]/25">
                    <Bot className="h-5 w-5" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isAi
                      ? "border border-pink-100 bg-gradient-to-br from-[#FFF9FA] via-pink-50/30 to-white text-slate-800"
                      : "bg-gradient-to-r from-[#D6135F] via-[#E01563] to-[#F0186C] text-white rounded-br-none shadow-md shadow-[#F0186C]/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1.5 text-[11px] font-bold opacity-80">
                    <span className={isAi ? "text-[#D6135F]" : "text-white"}>{isAi ? "AI Chief of Staff" : "Executive"}</span>
                    <span className="font-mono text-[10px]">{msg.timestamp}</span>
                  </div>

                  {/* Body Content */}
                  <div className="whitespace-pre-wrap space-y-2 font-sans font-normal">{msg.text}</div>

                  {/* AI Metrics Highlights if present */}
                  {msg.aiData?.highlightMetrics && msg.aiData.highlightMetrics.length > 0 && (
                    <div className="mt-3.5 grid grid-cols-3 gap-2.5 border-t border-pink-100 pt-3">
                      {msg.aiData.highlightMetrics.map((m) => (
                        <div key={m.label} className="rounded-2xl bg-white p-2.5 text-center border border-pink-100 shadow-2xs">
                          <div className="text-[10px] font-semibold text-slate-500">{m.label}</div>
                          <div className="font-black text-slate-900 font-mono text-sm mt-0.5">{m.value}</div>
                          {m.trend && <div className="text-[10px] text-[#D6135F] font-bold">{m.trend}</div>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* AI Suggested Action Buttons if present */}
                  {msg.aiData?.suggestedActions && msg.aiData.suggestedActions.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-pink-100 pt-3">
                      {msg.aiData.suggestedActions.map((act) => (
                        <Button
                          key={act.label}
                          variant="outline"
                          size="xs"
                          onClick={() => {
                            if (act.targetTab) onSelectTab(act.targetTab);
                            else if (act.actionId.startsWith("ask_")) handleSend(act.label);
                          }}
                          className="border border-pink-200 bg-white text-[#D6135F] hover:bg-[#F0186C] hover:text-white font-bold text-xs gap-1 rounded-xl shadow-2xs transition-all"
                        >
                          <Sparkles className="h-3 w-3" />
                          {act.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Bottom AI utility buttons */}
                  {isAi && (
                    <div className="mt-3.5 flex items-center justify-end gap-3.5 text-[11px] text-slate-500 border-t border-pink-100/70 pt-2 font-medium">
                      <button
                        onClick={() => handleSpeechToggle(msg.text)}
                        className="flex items-center gap-1 hover:text-[#D6135F] transition-colors"
                        title="Listen to response"
                      >
                        {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                        <span>{isSpeaking ? "Mute" : "Listen Voice"}</span>
                      </button>
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="flex items-center gap-1 hover:text-[#D6135F] transition-colors"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="h-3.5 w-3.5 text-emerald-600 font-bold" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedId === msg.id ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isThinking && (
            <div className="flex gap-3 items-center text-xs text-slate-600 font-medium">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-pink-100 text-[#D6135F] animate-pulse">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl border border-pink-200 bg-pink-50/50 p-3.5 shadow-2xs">
                <Loader2 className="h-4 w-4 animate-spin text-[#F0186C]" />
                <span>AI Chief of Staff is analyzing Virtoy telemetry &amp; project registries...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-pink-100 bg-gradient-to-r from-pink-50/40 via-white to-pink-50/40 p-4">
          {isListening && (
            <div className="mb-2.5 flex items-center justify-between rounded-2xl border-2 border-[#F0186C] bg-pink-50/90 px-4 py-2 text-xs font-bold text-[#D6135F] animate-pulse">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F0186C] opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#F0186C]" />
                </span>
                <span>🎙️ Listening to voice query... Speak naturally</span>
              </div>
              <button
                type="button"
                onClick={handleVoiceListenToggle}
                className="text-[11px] underline hover:text-rose-800"
              >
                Cancel
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2.5"
          >
            <button
              type="button"
              onClick={handleVoiceListenToggle}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? "bg-rose-500 text-white border-rose-600 animate-pulse ring-4 ring-rose-300/50 shadow-md"
                  : "bg-white border-2 border-pink-200 text-[#D6135F] hover:bg-pink-50"
              }`}
              title={isListening ? "Listening... click to stop" : "Voice Input (Speech-to-Text)"}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>

            <Input
              type="text"
              placeholder="Ask your AI Chief of Staff (e.g. 'Prepare our Monday agenda', 'What deals need attention?')..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-white border-2 border-pink-200/90 text-slate-900 placeholder:text-slate-400 rounded-xl focus:border-[#F0186C] text-xs sm:text-sm py-2"
            />
            <Button
              type="submit"
              disabled={!inputVal.trim() || isThinking}
              className="bg-gradient-to-r from-[#D6135F] to-[#F0186C] hover:from-[#B00D4D] hover:to-[#D6135F] text-white font-bold shadow-md shadow-[#F0186C]/25 rounded-xl px-4 py-2"
            >
              <Send className="h-4 w-4" />
              <span>Ask Assistant</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
