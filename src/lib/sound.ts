"use client";

export type VoiceLanguage = "en" | "hi" | "or";

export interface VoiceLanguageOption {
  code: VoiceLanguage;
  label: string;
  flag: string;
  nativeName: string;
}

export const VOICE_LANGUAGES: VoiceLanguageOption[] = [
  { code: "en", label: "English", flag: "🇬🇧", nativeName: "English" },
  { code: "hi", label: "Hindi", flag: "🇮🇳", nativeName: "हिन्दी" },
  { code: "or", label: "Odia", flag: "🏛️", nativeName: "ଓଡ଼ିଆ" },
];

export interface VoiceTopicItem {
  id: string;
  title: Record<VoiceLanguage, string>;
  subtitle: Record<VoiceLanguage, string>;
  text: Record<VoiceLanguage, string>;
}

export const VOICE_TOPICS: VoiceTopicItem[] = [
  {
    id: "overview",
    title: {
      en: "Company Overview",
      hi: "कंपनी परिचय",
      or: "କମ୍ପାନୀ ପରିଚୟ",
    },
    subtitle: {
      en: "IIT Heritage & Mission",
      hi: "आईआईटी विरासत और विजन",
      or: "ଆଇଆଇଟି ଐତିହ୍ୟ ଓ ଲକ୍ଷ୍ୟ",
    },
    text: {
      en: "Welcome to Virtoy Technologies. Founded by a team of IIT alumni and experienced engineering professionals, we provide world-class IT solutions, custom software, and immersive AR and VR systems across Eastern India and the UAE.",
      hi: "विर्टॉय टेक्नोलॉजीज में आपका स्वागत है। आईआईटी पूर्व छात्रों और अनुभवी इंजीनियरों द्वारा स्थापित, हम पूर्वी भारत और यूएई में विश्व स्तरीय आईटी समाधान, कस्टम सॉफ्टवेयर और एआर एवं वीआर सिस्टम प्रदान करते हैं।",
      or: "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍‌ରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ। ଆଇଆଇଟି ପୂର୍ବତନ ଛାତ୍ର ଏବଂ ଅଭିଜ୍ଞ ଇଞ୍ଜିନିୟରମାନଙ୍କ ଦ୍ୱାରା ପ୍ରତିଷ୍ଠିତ, ଆମେ ଓଡ଼ିଶା ଏବଂ ସମଗ୍ର ଭାରତରେ ବିଶ୍ୱସ୍ତରୀୟ ଆଇଟି, କଷ୍ଟମ୍ ସଫ୍ଟୱେର୍ ଏବଂ ଏଆର୍-ଭିଆର୍ ସଲ୍ୟୁସନ୍ ପ୍ରଦାନ କରୁଛୁ।",
    },
  },
  {
    id: "products",
    title: {
      en: "16 Digital Products",
      hi: "16 डिजिटल उत्पाद",
      or: "୧୬ଟି ଡିଜିଟାଲ୍ ପ୍ରଡକ୍ଟ",
    },
    subtitle: {
      en: "Safeact, ERP & VR Suites",
      hi: "सेफएक्ट, ईआरपी और वीआर",
      or: "ସେଫ୍‌ଆକ୍ଟ, ଇଆରପି ଓ ଭିଆର୍",
    },
    text: {
      en: "Virtoy has engineered 16 proprietary products, including Safeact industrial safety simulator, Education ERP for universities, Library Management, Hotel PMS, and the Krushi Odisha 2025 virtual reality pavilion.",
      hi: "विर्टॉय ने 16 प्रमुख डिजिटल उत्पाद विकसित किए हैं, जिनमें सेफएक्ट इंडस्ट्रियल सेफ्टी सिम्युलेटर, यूनिवर्सिटीज के लिए एजुकेशन ईआरपी, लाइब्रेरी मैनेजमेंट, होटल पीएमएस और कृषि ओडिशा वर्चुअल रियलिटी शामिल हैं।",
      or: "ଭର୍ଚ୍ଚୋଏ ୧୬ଟି ମୁଖ୍ୟ ଡିଜିଟାଲ୍ ପ୍ରଡକ୍ଟ ପ୍ରସ୍ତୁତ କରିଛି, ଯେଉଁଥିରେ ସେଫ୍‌ଆକ୍ଟ ଶିଳ୍ପ ନିରାପତ୍ତା ସିମ୍ୟୁଲେଟର, ଏଜୁକେସନ୍ ଇଆରପି, ଲାଇବ୍ରେରୀ ମ୍ୟାନେଜମେଣ୍ଟ, ହୋଟେଲ୍ ପିଏମ୍ଏସ୍ ଏବଂ କୃଷି ଓଡ଼ିଶା ଭର୍ଚୁଆଲ୍ ରିଆଲିଟି ପାଭିଲିଅନ୍ ଅନ୍ତର୍ଭୁକ୍ତ।",
    },
  },
  {
    id: "services",
    title: {
      en: "8 Engineering Services",
      hi: "8 इंजीनियरिंग सेवाएं",
      or: "୮ଟି ଇଞ୍ଜିନିୟରିଂ ସେବା",
    },
    subtitle: {
      en: "Software, Cloud & Mobile",
      hi: "सॉफ्टवेयर, क्लाउड और मोबाइल",
      or: "ସଫ୍ଟୱେର୍, କ୍ଲାଉଡ୍ ଓ ମୋବାଇଲ୍",
    },
    text: {
      en: "Our core engineering services span custom web applications, native iOS and Android mobile development, automation systems, enterprise ERPs, and round-the-clock dedicated technical support.",
      hi: "हमारी कोर इंजीनियरिंग सेवाओं में कस्टम वेब एप्लिकेशन, आईओएस और एंड्रॉइड मोबाइल ऐप, ऑटोमेशन सिस्टम, एंटरप्राइज ईआरपी और चौबीसों घंटे टेक्निकल सपोर्ट शामिल हैं।",
      or: "ଆମର ମୁଖ୍ୟ ଇଞ୍ଜିନିୟରିଂ ସେବାରେ କଷ୍ଟମ୍ ୱେବ୍ ଆପ୍ଲିକେସନ୍, ଆଇଓଏସ୍ ଓ ଆଣ୍ଡ୍ରଏଡ୍ ମୋବାଇଲ୍ ଆପ୍, ଅଟୋମେସନ୍ ସିଷ୍ଟମ୍ ଏବଂ ୨୪/୭ ଉତ୍ସର୍ଗୀକୃତ ଟେକ୍ନିକାଲ୍ ସପୋର୍ଟ ଅନ୍ତର୍ଭୁକ୍ତ।",
    },
  },
  {
    id: "clients",
    title: {
      en: "84+ Client Deployments",
      hi: "84+ प्रमाणित क्लाइंट्स",
      or: "୮୪+ ପ୍ରମାଣିତ ଗ୍ରାହକ",
    },
    subtitle: {
      en: "Education, Industry & Govt",
      hi: "शिक्षा, उद्योग और सरकार",
      or: "ଶିକ୍ଷା, ଶିଳ୍ପ ଓ ସରକାର",
    },
    text: {
      en: "We are proud to power over 84 verified clients across Odisha and Eastern India, spanning leading autonomous colleges, government bodies, healthcare providers, and heavy industrial corporations.",
      hi: "हम ओडिशा और पूर्वी भारत में 84 से अधिक प्रमाणित क्लाइंट्स को सेवाएं प्रदान करने पर गर्व करते हैं, जिनमें अग्रणी कॉलेज, सरकारी विभाग, अस्पताल और औद्योगिक संगठन शामिल हैं।",
      or: "ଆମେ ଓଡ଼ିଶା ଏବଂ ପୂର୍ବ ଭାରତର ୮୪ ରୁ ଅଧିକ ପ୍ରମାଣିତ ଗ୍ରାହକ, ପ୍ରମୁଖ ସ୍ୱୟଂଶାସିତ କଲେଜ, ସରକାରୀ ବିଭାଗ ଏବଂ ଶିଳ୍ପ ସଂସ୍ଥାମାନଙ୍କୁ ସେବା ପ୍ରଦାନ କରି ଗର୍ବିତ।",
    },
  },
];

// High-fidelity Web Audio API synthesizer for interactive audio feedback & chimes
let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let currentLanguage: VoiceLanguage = "en";

// Initialize language from localStorage on browser
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("virtoy_voice_lang") as VoiceLanguage;
    if (saved && (saved === "en" || saved === "hi" || saved === "or")) {
      currentLanguage = saved;
    }
  } catch {}
}

type SoundListener = (enabled: boolean) => void;
type SpeechListener = (state: { isPlaying: boolean; text: string; title: string; topicIndex: number; language: VoiceLanguage }) => void;
type LanguageListener = (lang: VoiceLanguage) => void;

const soundListeners: Set<SoundListener> = new Set();
const speechListeners: Set<SpeechListener> = new Set();
const languageListeners: Set<LanguageListener> = new Set();

let currentTopicIndex = 0;
let isSpeakingState = false;
let currentSpeechText = "";
let currentSpeechTitle = "";
let hasGreetedUser = false;
let resumeInterval: NodeJS.Timeout | null = null;
let pendingVoiceTimer: NodeJS.Timeout | null = null;

// Pre-warm voices on script load
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  try {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  } catch {}
}

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
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function getVoiceLanguage(): VoiceLanguage {
  return currentLanguage;
}

export function setVoiceLanguage(lang: VoiceLanguage) {
  currentLanguage = lang;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("virtoy_voice_lang", lang);
    } catch {}
  }
  languageListeners.forEach((fn) => fn(lang));
  notifySpeech();

  // If tour is currently playing, replay in the new language
  if (isSpeakingState) {
    startVoiceTour(currentTopicIndex);
  }
}

export function subscribeLanguage(fn: LanguageListener): () => void {
  languageListeners.add(fn);
  fn(currentLanguage);
  return () => languageListeners.delete(fn);
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
    language: currentLanguage,
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
      language: currentLanguage,
    })
  );
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  soundListeners.forEach((fn) => fn(soundEnabled));

  if (soundEnabled) {
    playChimeStartup();
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
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.055;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
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
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
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
 * Speaks simultaneously with the logo animation ONCE in the active language:
 * "Welcome to Virtoy Technologies Private Limited." (nothing else).
 */
export function triggerWelcomeGreeting() {
  if (typeof window === "undefined") return;
  if (hasGreetedUser) return; // Strict: only once per session
  hasGreetedUser = true;

  if (soundEnabled) {
    playChimeStartup();
    const greetingText =
      currentLanguage === "hi"
        ? "विर्टॉय टेक्नोलॉजीज प्राइवेट लिमिटेड में आपका स्वागत है।"
        : currentLanguage === "or"
        ? "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍ ପ୍ରାଇଭେଟ୍ ଲିମିଟେଡ୍‌ରେ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।"
        : "Welcome to Virtoy Technologies Private Limited.";

    const greetingTitle =
      currentLanguage === "hi"
        ? "विर्टॉय टेक्नोलॉजीज में स्वागत"
        : currentLanguage === "or"
        ? "ଭର୍ଚ୍ଚୋଏ ଟେକ୍ନୋଲୋଜିଜ୍‌ରେ ସ୍ୱାଗତ"
        : "Welcome to Virtoy Technologies";

    speakText(greetingText, greetingTitle, currentLanguage);
  }
}

export function hasUserBeenGreeted(): boolean {
  return hasGreetedUser;
}

export function resetGreetingState() {
  hasGreetedUser = false;
}

export function isSpeaking(): boolean {
  return isSpeakingState;
}

/**
 * Toggle playback of the Voice Tour: if speaking, pauses/stops; if stopped, plays.
 */
export function toggleVoiceTour(topicIdx = 0): boolean {
  if (isSpeakingState) {
    playChimeClick();
    stopVoiceNarration();
    return false;
  } else {
    enableSoundAndPlay(topicIdx);
    return true;
  }
}

/**
 * Start or jump to a specific Voice Tour topic
 */
export function startVoiceTour(topicIdx = 0, lang = currentLanguage) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const topic = VOICE_TOPICS[topicIdx] || VOICE_TOPICS[0];
  currentTopicIndex = topicIdx;
  const text = topic.text[lang] || topic.text.en;
  const title = topic.title[lang] || topic.title.en;

  speakText(text, title, lang);
}

export function nextVoiceTopic() {
  const nextIdx = (currentTopicIndex + 1) % VOICE_TOPICS.length;
  startVoiceTour(nextIdx);
}

export function prevVoiceTopic() {
  const prevIdx = (currentTopicIndex - 1 + VOICE_TOPICS.length) % VOICE_TOPICS.length;
  startVoiceTour(prevIdx);
}

/**
 * Select the best natural-sounding voice available in the browser for target language
 */
function findBestVoiceForLanguage(synth: SpeechSynthesis, lang: VoiceLanguage): SpeechSynthesisVoice | null {
  try {
    const voices = synth.getVoices();
    if (!voices || voices.length === 0) return null;

    if (lang === "hi") {
      const hiVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith("hi") ||
          v.name.toLowerCase().includes("hindi") ||
          v.name.toLowerCase().includes("hemant") ||
          v.name.toLowerCase().includes("kalpana") ||
          v.name.toLowerCase().includes("lekha")
      );
      if (hiVoice) return hiVoice;

      const inVoice = voices.find((v) => v.lang.toLowerCase().includes("in"));
      if (inVoice) return inVoice;
    }

    if (lang === "or") {
      const odiaVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith("or") ||
          v.name.toLowerCase().includes("odia") ||
          v.name.toLowerCase().includes("oriya")
      );
      if (odiaVoice) return odiaVoice;

      const inVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith("hi") ||
          v.lang.toLowerCase().includes("in")
      );
      if (inVoice) return inVoice;
    }

    // Default: English Natural / Premier voices
    const preferredEn = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Google") ||
          v.name.includes("Natural") ||
          v.name.includes("Samantha") ||
          v.name.includes("Jenny") ||
          v.name.includes("David") ||
          v.name.includes("Zira") ||
          v.name.includes("Microsoft") ||
          v.name.includes("English"))
    );
    if (preferredEn) return preferredEn;

    const anyEn = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
    if (anyEn) return anyEn;

    return voices[0] || null;
  } catch {
    return null;
  }
}

export function speakText(text: string, title = "Virtoy Voice Guide", lang = currentLanguage) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  if (!soundEnabled) return;

  const synth = window.speechSynthesis;

  // Clear any existing resume heartbeat and pending voice load timers
  if (resumeInterval) {
    clearInterval(resumeInterval);
    resumeInterval = null;
  }
  if (pendingVoiceTimer) {
    clearTimeout(pendingVoiceTimer);
    pendingVoiceTimer = null;
  }

  try {
    synth.cancel();
    if (synth.paused) {
      synth.resume();
    }
  } catch {}

  currentSpeechText = text;
  currentSpeechTitle = title;
  isSpeakingState = true;
  notifySpeech();

  const doSpeak = () => {
    if (!soundEnabled || !isSpeakingState) return;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "hi" ? "hi-IN" : lang === "or" ? "or-IN" : "en-US";
      utterance.rate = lang === "en" ? 1.08 : 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voice = findBestVoiceForLanguage(synth, lang);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => {
        isSpeakingState = false;
        currentSpeechText = "";
        if (resumeInterval) {
          clearInterval(resumeInterval);
          resumeInterval = null;
        }
        notifySpeech();
      };

      utterance.onerror = () => {
        isSpeakingState = false;
        currentSpeechText = "";
        if (resumeInterval) {
          clearInterval(resumeInterval);
          resumeInterval = null;
        }
        notifySpeech();
      };

      synth.speak(utterance);

      // Chrome Speech bug prevention: resume periodically while utterance is active
      resumeInterval = setInterval(() => {
        if (!soundEnabled || !isSpeakingState) {
          if (resumeInterval) {
            clearInterval(resumeInterval);
            resumeInterval = null;
          }
          return;
        }
        if (synth.speaking && synth.paused) {
          synth.resume();
        }
      }, 250);
    } catch {
      isSpeakingState = false;
      notifySpeech();
    }
  };

  const voices = synth.getVoices();
  if (voices && voices.length > 0) {
    doSpeak();
  } else {
    // Voices not loaded yet; wait for voiceschanged or trigger fallback after 60ms
    let handled = false;
    const onVoicesReady = () => {
      if (handled) return;
      handled = true;
      synth.onvoiceschanged = null;
      if (pendingVoiceTimer) {
        clearTimeout(pendingVoiceTimer);
        pendingVoiceTimer = null;
      }
      doSpeak();
    };

    synth.onvoiceschanged = onVoicesReady;
    pendingVoiceTimer = setTimeout(() => {
      onVoicesReady();
    }, 60);
  }
}

export function stopVoiceNarration() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    } catch {}
  }
  if (pendingVoiceTimer) {
    clearTimeout(pendingVoiceTimer);
    pendingVoiceTimer = null;
  }
  if (resumeInterval) {
    clearInterval(resumeInterval);
    resumeInterval = null;
  }
  isSpeakingState = false;
  currentSpeechText = "";
  notifySpeech();
}
