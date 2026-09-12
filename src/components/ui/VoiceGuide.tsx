"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  SkipForward,
  SkipBack,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Headphones,
  Send,
  ArrowRight,
  Bot,
  HelpCircle,
} from "lucide-react";
import {
  isSoundEnabled,
  subscribeSound,
  subscribeSpeech,
  startVoiceTour,
  nextVoiceTopic,
  prevVoiceTopic,
  stopVoiceNarration,
  speakText,
  VOICE_TOPICS,
  toggleSound,
  enableSoundAndPlay,
  playChimeClick,
  playChimeStartup,
} from "@/lib/sound";
import {
  answerCustomerQuery,
  SUGGESTED_QUESTIONS,
  BotAnswer,
} from "@/lib/virtoyBot";

export function VoiceGuide() {
  const [soundOn, setSoundOn] = useState(false);
  const [speechState, setSpeechState] = useState<{
    isPlaying: boolean;
    text: string;
    title: string;
    topicIndex: number;
  }>({
    isPlaying: false,
    text: "",
    title: "",
    topicIndex: 0,
  });

  // Display mode: 'pill' (compact), 'tour' (audio player), 'chat' (ask customer question)
  const [viewMode, setViewMode] = useState<"pill" | "tour" | "chat">("pill");
  const [customerQuery, setCustomerQuery] = useState("");
  const [botResponse, setBotResponse] = useState<BotAnswer | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    const unsubSound = subscribeSound((on) => {
      setSoundOn(on);
      if (on && viewMode === "pill") {
        setViewMode("tour");
      }
    });

    const unsubSpeech = subscribeSpeech((state) => {
      setSpeechState(state);
      if (state.isPlaying && viewMode === "pill") {
        setViewMode("tour");
      }
    });

    // Global click listener for spoken elements
    const handleVoiceTrigger = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-voice-speak]");
      if (target) {
        const textToSpeak = target.getAttribute("data-voice-speak");
        if (textToSpeak) {
          speakText(textToSpeak, "Overview Narration");
          setViewMode("tour");
        }
      }
    };

    window.addEventListener("click", handleVoiceTrigger);

    return () => {
      unsubSound();
      unsubSpeech();
      window.removeEventListener("click", handleVoiceTrigger);
    };
  }, [viewMode]);

  const handleSendQuery = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customerQuery.trim()) return;

    playChimeClick();
    const res = answerCustomerQuery(customerQuery);
    setBotResponse(res);
    speakText(res.speechText, `Virtoy AI: ${customerQuery.slice(0, 24)}...`);
    setCustomerQuery("");
  };

  const handleSelectSuggested = (q: string) => {
    playChimeClick();
    const res = answerCustomerQuery(q);
    setBotResponse(res);
    speakText(res.speechText, `Virtoy AI: ${q}`);
  };

  // 1. Minimized Floating Pill View (Ultra-compact, zero screen obstruction)
  if (viewMode === "pill") {
    return (
      <div className="fixed bottom-6 right-24 z-40 animate-rise-in font-sans">
        <button
          onClick={() => {
            playChimeStartup();
            if (!soundOn) enableSoundAndPlay(0);
            setViewMode("tour");
          }}
          className="group flex items-center gap-2.5 rounded-full border border-primary/30 bg-surface/90 px-4 py-2.5 shadow-lg shadow-primary/15 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-surface hover:shadow-xl hover:shadow-primary/25"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
          </span>
          <Headphones className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold text-foreground">
            {speechState.isPlaying ? "Listening to Voice..." : "Voice & AI Guide"}
          </span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
            Interactive
          </span>
        </button>
      </div>
    );
  }

  // 2. Expanded Interactive Card (Docked neatly beside WhatsApp button)
  return (
    <div className="fixed bottom-6 right-4 sm:right-24 z-50 w-[calc(100vw-2rem)] sm:w-[26rem] max-w-[28rem] animate-rise-in font-sans">
      <div className="relative overflow-hidden rounded-3xl border border-primary/35 bg-surface/95 p-4 sm:p-5 shadow-2xl shadow-primary/25 backdrop-blur-2xl transition-all">
        {/* Header with Switcher Tabs & Controls */}
        <div className="flex items-center justify-between gap-2 border-b border-border/70 pb-3">
          <div className="flex items-center gap-1 rounded-full bg-surface-muted p-1">
            <button
              onClick={() => {
                playChimeClick();
                setViewMode("tour");
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                viewMode === "tour"
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <Headphones className="h-3.5 w-3.5" />
              Audio Tour
            </button>

            <button
              onClick={() => {
                playChimeClick();
                setViewMode("chat");
                setTimeout(() => inputRef.current?.focus(), 150);
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                viewMode === "chat"
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Ask Virtoy AI
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode("pill")}
              title="Minimize to floating badge"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-muted text-muted hover:text-foreground transition"
            >
              <ChevronDown className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                stopVoiceNarration();
                setViewMode("pill");
              }}
              title="Mute & Close"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-muted text-muted hover:bg-rose-500/10 hover:text-rose-500 transition"
            >
              <VolumeX className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ================= VIEW: AUDIO TOUR ================= */}
        {viewMode === "tour" && (
          <div className="mt-3.5 space-y-3.5">
            {/* Live Waveform & Current Topic text */}
            <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.04] to-accent-strong/[0.04] p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-white text-[11px] font-bold">
                    0{speechState.topicIndex + 1}
                  </div>
                  <span className="text-xs font-bold text-foreground">
                    {VOICE_TOPICS[speechState.topicIndex]?.title}
                  </span>
                </div>

                {speechState.isPlaying ? (
                  <div className="flex items-end gap-1 h-3.5 px-2 py-0.5 rounded-full bg-primary/10">
                    <span className="w-0.5 bg-primary rounded-full animate-[bounce_0.6s_infinite_100ms] h-full" />
                    <span className="w-0.5 bg-primary rounded-full animate-[bounce_0.6s_infinite_200ms] h-3/4" />
                    <span className="w-0.5 bg-primary rounded-full animate-[bounce_0.6s_infinite_300ms] h-full" />
                    <span className="w-0.5 bg-primary rounded-full animate-[bounce_0.6s_infinite_150ms] h-1/2" />
                    <span className="w-0.5 bg-primary rounded-full animate-[bounce_0.6s_infinite_250ms] h-4/5" />
                  </div>
                ) : (
                  <span className="text-[10px] font-semibold text-muted">Paused</span>
                )}
              </div>

              <p className="text-xs leading-relaxed text-foreground font-medium line-clamp-3">
                {speechState.text ||
                  VOICE_TOPICS[speechState.topicIndex]?.text}
              </p>
            </div>

            {/* Topic Selection Chips */}
            <div className="grid grid-cols-2 gap-2">
              {VOICE_TOPICS.map((topic, idx) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    playChimeClick();
                    startVoiceTour(idx);
                  }}
                  className={`flex flex-col items-start rounded-xl p-2.5 text-left transition-all ${
                    speechState.topicIndex === idx && speechState.isPlaying
                      ? "border border-primary bg-primary/15 text-primary shadow-sm"
                      : "border border-border/70 bg-surface text-muted hover:border-primary/40 hover:text-foreground hover:bg-surface-muted"
                  }`}
                >
                  <span className="text-xs font-bold leading-tight line-clamp-1">
                    {topic.title}
                  </span>
                  <span className="text-[10px] opacity-75 truncate w-full mt-0.5">
                    {topic.subtitle}
                  </span>
                </button>
              ))}
            </div>

            {/* Playback Action Controls */}
            <div className="flex items-center justify-between border-t border-border/70 pt-3">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    playChimeClick();
                    prevVoiceTopic();
                  }}
                  title="Previous Topic"
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-surface text-muted hover:border-primary/40 hover:text-foreground transition"
                >
                  <SkipBack className="h-4 w-4" />
                </button>

                {speechState.isPlaying ? (
                  <button
                    onClick={() => {
                      playChimeClick();
                      stopVoiceNarration();
                    }}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-primary/25 hover:bg-primary-strong transition"
                  >
                    <Square className="h-3 w-3 fill-current" />
                    Pause Tour
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      playChimeStartup();
                      startVoiceTour(speechState.topicIndex);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-primary/25 hover:bg-primary-strong transition"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    Play Voice
                  </button>
                )}

                <button
                  onClick={() => {
                    playChimeClick();
                    nextVoiceTopic();
                  }}
                  title="Next Topic"
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-surface text-muted hover:border-primary/40 hover:text-foreground transition"
                >
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => setViewMode("chat")}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
              >
                <span>Ask a question</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* ================= VIEW: CUSTOMER QUESTION / AI INPUT ================= */}
        {viewMode === "chat" && (
          <div className="mt-3.5 space-y-3">
            {/* Bot Response Bubble (if available) */}
            {botResponse ? (
              <div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-3.5 space-y-2.5 animate-rise-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                    <Bot className="h-3.5 w-3.5" />
                    Virtoy Verified Answer
                  </div>
                  {speechState.isPlaying && (
                    <span className="text-[10px] font-semibold text-primary animate-pulse">
                      Speaking aloud...
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-foreground whitespace-pre-line font-medium">
                  {botResponse.text}
                </p>
                {botResponse.actionUrl && (
                  <Link
                    href={botResponse.actionUrl}
                    onClick={() => setViewMode("pill")}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-strong transition shadow-sm"
                  >
                    {botResponse.actionLabel || "Learn More"}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-3 text-center">
                <p className="text-xs font-semibold text-foreground">
                  Ask anything about Virtoy Technologies
                </p>
                <p className="text-[11px] text-muted mt-0.5">
                  Type your query below or pick a suggested topic to get instant spoken answers.
                </p>
              </div>
            )}

            {/* Suggested Questions Grid */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted flex items-center gap-1">
                <HelpCircle className="h-3 w-3 text-primary" />
                Popular Questions
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSelectSuggested(q)}
                    className="rounded-lg border border-border/80 bg-surface px-2.5 py-1 text-[11px] font-medium text-muted hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer Input Field */}
            <form onSubmit={handleSendQuery} className="relative mt-2">
              <input
                ref={inputRef}
                type="text"
                value={customerQuery}
                onChange={(e) => setCustomerQuery(e.target.value)}
                placeholder="Ask about SafeAct, ERP, clients, offices..."
                className="w-full rounded-2xl border border-border bg-surface py-2.5 pl-3.5 pr-11 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                disabled={!customerQuery.trim()}
                title="Send query"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-xl bg-primary text-white shadow-sm disabled:opacity-40 hover:bg-primary-strong transition"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
