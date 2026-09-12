"use client";

// High-fidelity Web Audio API synthesizer for interactive audio feedback & chimes
let audioCtx: AudioContext | null = null;
let soundEnabled = false;

type SoundListener = (enabled: boolean) => void;
type SpeechListener = (state: { isPlaying: boolean; text: string; title: string; topicIndex: number }) => void;

const soundListeners: Set<SoundListener> = new Set();
const speechListeners: Set<SpeechListener> = new Set();

export const VOICE_TOPICS = [
  {
    id: "overview",
    title: "Company Overview",
    subtitle: "IIT Heritage & Mission",
    text: "Welcome to Virtoy Technologies. Founded by a team of IIT alumni and experienced engineering professionals, we provide world-class IT solutions, custom software, and immersive AR and VR systems to enterprises and institutions across Eastern India and the UAE.",
  },
  {
    id: "products",
    title: "16 Digital Products",
    subtitle: "Safeact, ERP & VR Suites",
    text: "Virtoy has engineered 16 proprietary products, including Safeact industrial safety simulator, Education ERP for universities, Library Management, Hotel PMS, and the Krushi Odisha 2025 virtual reality pavilion for the Government of Odisha.",
  },
  {
    id: "services",
    title: "8 Engineering Services",
    subtitle: "Software, Cloud & Mobile",
    text: "Our core engineering services span custom web applications, native iOS and Android mobile development, automation systems, enterprise ERPs, and round-the-clock dedicated technical support.",
  },
  {
    id: "clients",
    title: "84+ Client Deployments",
    subtitle: "Education, Industry & Government",
    text: "We are proud to power over 84 verified clients across Odisha and Eastern India, spanning leading autonomous colleges, government bodies, healthcare providers, and heavy industrial corporations.",
  },
];

let currentTopicIndex = 0;
let isSpeakingState = false;
let currentSpeechText = "";
let currentSpeechTitle = "";

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function subscribeSound(fn: SoundListener): () => void {
  soundListeners.add(fn);
  return () => soundListeners.delete(fn);
}

export function subscribeSpeech(fn: SpeechListener): () => void {
  speechListeners.add(fn);
  return () => speechListeners.delete(fn);
}

function notifySpeech() {
  speechListeners.forEach((fn) =>
    fn({
      isPlaying: isSpeakingState,
      text: currentSpeechText,
      title: currentSpeechTitle,
      topicIndex: currentTopicIndex,
    })
  );
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  soundListeners.forEach((fn) => fn(soundEnabled));

  if (soundEnabled) {
    playChimeStartup();
    // Auto start the voice tour when sound is enabled
    startVoiceTour(0);
  } else {
    stopVoiceNarration();
  }
  return soundEnabled;
}

export function enableSoundAndPlay(topicIdx = 0) {
  soundEnabled = true;
  soundListeners.forEach((fn) => fn(true));
  playChimeStartup();
  startVoiceTour(topicIdx);
}

/**
 * Crystal clear pleasant chime tone when sound is activated
 */
export function playChimeStartup() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const startTime = ctx.currentTime + idx * 0.07;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.12, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.35);
  });
}

/**
 * Interactive haptic click tone
 */
export function playChimeClick() {
  playHapticBeep(800, 0.04, "sine", 0.08);
}

export function playHapticBeep(
  freq = 640,
  duration = 0.05,
  type: OscillatorType = "sine",
  gainVal = 0.08
) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // AudioContext blocked
  }
}

export function playChimeSuccess() {
  if (!soundEnabled) return;
  playHapticBeep(523.25, 0.08, "sine", 0.08);
  setTimeout(() => playHapticBeep(659.25, 0.08, "sine", 0.08), 60);
  setTimeout(() => playHapticBeep(783.99, 0.12, "sine", 0.1), 120);
}

/**
 * Start or jump to a specific Voice Tour topic
 */
export function startVoiceTour(topicIdx = 0) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const topic = VOICE_TOPICS[topicIdx] || VOICE_TOPICS[0];
  currentTopicIndex = topicIdx;
  speakText(topic.text, topic.title);
}

export function nextVoiceTopic() {
  const nextIdx = (currentTopicIndex + 1) % VOICE_TOPICS.length;
  startVoiceTour(nextIdx);
}

export function prevVoiceTopic() {
  const prevIdx = (currentTopicIndex - 1 + VOICE_TOPICS.length) % VOICE_TOPICS.length;
  startVoiceTour(prevIdx);
}

export function speakText(text: string, title = "Virtoy Voice Guide") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  // Chrome quirk fix: resume synth before speak
  if (synth.paused) {
    synth.resume();
  }

  currentSpeechText = text;
  currentSpeechTitle = title;
  isSpeakingState = true;
  notifySpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.05;
  utterance.volume = 1.0;

  const chooseVoice = () => {
    const voices = synth.getVoices();
    const englishVoice =
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("Samantha") ||
            v.name.includes("David") ||
            v.name.includes("Zira") ||
            v.name.includes("Microsoft"))
      ) || voices.find((v) => v.lang.startsWith("en")) || voices[0];

    if (englishVoice) {
      utterance.voice = englishVoice;
    }
  };

  chooseVoice();
  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = chooseVoice;
  }

  utterance.onend = () => {
    isSpeakingState = false;
    currentSpeechText = "";
    notifySpeech();
  };

  utterance.onerror = () => {
    isSpeakingState = false;
    currentSpeechText = "";
    notifySpeech();
  };

  synth.speak(utterance);
}

export function stopVoiceNarration() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  isSpeakingState = false;
  currentSpeechText = "";
  notifySpeech();
}
