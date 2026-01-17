export type VoiceIntent =
  | { type: "navigate"; path: string; speak?: string }
  | { type: "map"; speak?: string }
  | { type: "smalltalk"; speak: string }
  | { type: "unknown"; speak?: string };

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
}

export function createRecognizer(lang = "bn-BD"): SpeechRecognition | null {
  if (!isSpeechRecognitionSupported()) return null;
  const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const rec: SpeechRecognition = new SR();
  rec.lang = lang;
  // Use only final results to avoid state timing issues between onresult and onend
  rec.interimResults = false;
  rec.continuous = false;
  return rec;
}

export function speakBn(text: string) {
  if (typeof window === "undefined") return;
  const utter = new SpeechSynthesisUtterance(text);
  // Prefer Bangla voice if available
  const voices = window.speechSynthesis?.getVoices?.() || [];
  const bn = voices.find(v => v.lang?.toLowerCase().startsWith("bn")) || voices.find(v => v.lang?.toLowerCase().startsWith("en"));
  if (bn) utter.voice = bn;
  utter.lang = bn?.lang || "bn-BD";
  utter.rate = 1;
  utter.pitch = 1;
  window.speechSynthesis?.speak(utter);
}

// Simple keyword-based intent detection (Bangla keywords)
export function inferIntent(transcript: string): VoiceIntent {
  const t = (transcript || "").toLowerCase();
  // Navigation intents
  if (/মুড|চেকইন|চেক ইন|check\s?in/.test(t)) return { type: "navigate", path: "/checkin", speak: "মুড চেক-ইন খোলা হচ্ছে" };
  if (/সহায|সহায়তা|হেল্প|help/.test(t)) return { type: "navigate", path: "/help", speak: "সহায়তা পেজ খোলা হচ্ছে" };
  if (/ট্র্যাকার|tracker/.test(t)) return { type: "navigate", path: "/tracker", speak: "ট্র্যাকার খোলা হচ্ছে" };
  if (/কর্মী|chw|ওয়ার্কার|worker/.test(t)) return { type: "navigate", path: "/chw", speak: "স্বাস্থ্যকর্মী তালিকা খোলা হচ্ছে" };
  if (/পরামর্শ|টিপস|tips/.test(t)) return { type: "navigate", path: "/tips", speak: "ঋতুভিত্তিক পরামর্শ খোলা হচ্ছে" };
  if (/মানচিত্র|নিকটস্থ|হাসপাতাল|map|near/.test(t)) return { type: "map", speak: "মানচিত্র দেখানো হচ্ছে" };

  // Small talk patterns
  if (/হ্যালো|হেলো|hello|hi|সুপ্রভাত|শুভ সন্ধ্যা/.test(t)) return { type: "smalltalk", speak: "হ্যালো! আমি মনবন্ধু ভয়েস সহায়ক।" };
  if (/তুমি কে|কে তুমি|আপনি কে|who are you/.test(t)) return { type: "smalltalk", speak: "আমি মনবন্ধুর একটি সহজ ভয়েস সহায়ক — পেজ খুলতে ও ছোট কথায় উত্তর দিতে পারি।" };
  if (/কেমন (আছ|আছেন)|how are you/.test(t)) return { type: "smalltalk", speak: "আমি ভালো আছি—আপনার মুড কেমন আজ?" };
  if (/ধন্যবাদ|থ্যাংকস|thanks|thank you/.test(t)) return { type: "smalltalk", speak: "আপনাকেও ধন্যবাদ!" };
  if (/কি করতে পার|কি পারো|তুমি কি করতে পার|what can you do/.test(t)) return { type: "smalltalk", speak: "আমি এখন মুড, সহায়তা, ট্র্যাকার, কর্মী, পরামর্শ ও মানচিত্র পেজ খুলতে এবং সামান্য আলাপ করতে পারি।" };
  if (/সময়|সময়|time/.test(t)) {
    const d = new Date();
    const time = d.toLocaleTimeString("bn-BD", { hour: "numeric", minute: "2-digit" });
    return { type: "smalltalk", speak: `এখন সময় ${time}` };
  }
  if (/তারিখ|date|কোন দিন/.test(t)) {
    const d = new Date();
    const dateStr = d.toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
    return { type: "smalltalk", speak: `আজ ${dateStr}` };
  }
  // Hidden triggers (not displayed in UI instructions)
  if (/অমি\s*কে/.test(t)) return { type: "smalltalk", speak: "অমি হচ্ছে আমাদের সম্মানিত CR" };
  // Hidden neutral relationship trigger for Tanvir (তানভির/তানভীর)
  if (/(তানভির|তানভীর)\s*কে/.test(t)) return { type: "smalltalk", speak: "তানভির হচ্ছে নওমির জামাই" };
  // Hidden triggers: সৈকত & মারুফ
  if (/সৈকত\s*কে/.test(t)) return { type: "smalltalk", speak: "সৈকত যার জন্য বাইউস্ট সেমিনার আয়োজন করে" };
  if (/(maruf|মারুফ)\s*কে/.test(t)) return { type: "smalltalk", speak: "আমাদের নেক্সট সৃজন ভাইয়া" };
  return { type: "unknown", speak: "দুঃখিত, বুঝতে পারিনি। আবার বলবেন?" };
}
