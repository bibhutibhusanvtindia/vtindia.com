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

  const handleToggle = () => {
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
          ? "border-primary/50 bg-primary/10 text-primary shadow-sm shadow-primary/10"
          : "border-border/80 bg-surface/80 text-muted hover:border-primary/50 hover:text-primary"
      }`}
    >
      {enabled ? (
        <Volume2 className={`h-4 w-4 text-primary ${isSpeaking ? "animate-pulse" : ""}`} />
      ) : (
        <VolumeX className="h-4 w-4 transition-transform group-hover:scale-110" />
      )}
    </button>
  );
}
