"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import {
  isSoundEnabled,
  subscribeSound,
  subscribeSpeech,
  toggleSound,
} from "@/lib/sound";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    setEnabled(isSoundEnabled());
    const unsubSound = subscribeSound(setEnabled);
    const unsubSpeech = subscribeSpeech((state) => setIsSpeaking(state.isPlaying));

    return () => {
      unsubSound();
      unsubSpeech();
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSound();
  };

  return (
    <button
      onClick={handleToggle}
      title={
        enabled
          ? "Virtoy Voice Guide Active (Click to Mute)"
          : "Start Virtoy Audio Tour & Voice Guide"
      }
      aria-label="Toggle Virtoy Audio Tour & Voice Guide"
      className={`group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
        enabled
          ? "border-primary bg-primary/15 text-primary shadow-md shadow-primary/20 scale-105"
          : "border-border/80 bg-surface/80 text-muted hover:border-primary/50 hover:text-primary"
      }`}
    >
      {enabled ? (
        <>
          <Volume2 className={`h-4 w-4 text-primary ${isSpeaking ? "animate-pulse" : ""}`} />
          <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
        </>
      ) : (
        <>
          <VolumeX className="h-4 w-4 transition-transform group-hover:scale-110" />
          <span className="absolute -right-1 -top-1 rounded-full bg-primary/10 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="h-2.5 w-2.5 text-primary" />
          </span>
        </>
      )}
    </button>
  );
}
