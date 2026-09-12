"use client";

// High-fidelity Web Audio API synthesizer for interactive audio feedback & chimes
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

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
let hasGreetedUser = false;

export function getAudioContext(): AudioContext | null {
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
  fn(soundEnabled);
  return () => soundListeners.delete(fn);
}

export function subscribeSpeech(fn: SpeechListener): () => void {
  speechListeners.add(fn);
  fn({
    isPlaying: isSpeakingState,
    text: currentSpeechText,
    title: currentSpeechTitle,
    topicIndex: currentTopicIndex,
  });
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
    startVoiceTour(currentTopicIndex);
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
 * Crystal clear pleasant chime tone when sound is activated (Loud & Audible)
 */
export function playChimeStartup() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  } catch {
    // AudioContext blocked before gesture
  }
}

/**
 * Interactive haptic click tone
 */
export function playChimeClick() {
  playHapticBeep(800, 0.04, "sine", 0.12);
}

export function playHapticBeep(
  freq = 640,
  duration = 0.05,
  type: OscillatorType = "sine",
  gainVal = 0.12
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
  playHapticBeep(523.25, 0.08, "sine", 0.12);
  setTimeout(() => playHapticBeep(659.25, 0.08, "sine", 0.12), 60);
  setTimeout(() => playHapticBeep(783.99, 0.12, "sine", 0.15), 120);
}

/**
 * Auto Greeting on website open:
 * Speaks ONLY the warm welcome greeting, nothing else until the user clicks something.
 */
export function triggerWelcomeGreeting(force = false) {
  if (typeof window === "undefined") return;
  if (hasGreetedUser && !force) return;
  hasGreetedUser = true;

  if (soundEnabled) {
    playChimeStartup();
    speakText(
      "A warm welcome to Virtoy Technologies Private Limited.",
      "Welcome to Virtoy Technologies"
    );
  }
}

export function resetGreetingState() {
  hasGreetedUser = false;
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
  if (!soundEnabled) return;

  const synth = window.speechSynthesis;

  try {
    synth.cancel();
    if (synth.paused) {
      synth.resume();
    }
  } catch {
    // Speech synthesis error
  }

  currentSpeechText = text;
  currentSpeechTitle = title;
  isSpeakingState = true;
  notifySpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  const assignVoice = () => {
    const voices = synth.getVoices();
    if (voices.length > 0) {
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
    }
  };

  assignVoice();
  if (synth.getVoices().length === 0) {
    synth.onvoiceschanged = () => {
      assignVoice();
    };
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

  try {
    synth.speak(utterance);
    // Chrome bug fix: occasionally wake up speech synthesis if it idles
    if (synth.paused) {
      synth.resume();
    }
  } catch {
    isSpeakingState = false;
    notifySpeech();
  }
}

export function stopVoiceNarration() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
  isSpeakingState = false;
  currentSpeechText = "";
  notifySpeech();
}
