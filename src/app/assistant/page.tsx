"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { createRecognizer, inferIntent, speakBn, isSpeechRecognitionSupported } from "@/lib/voice";

export default function AssistantPage({ searchParams }: { searchParams?: Record<string,string> }) {
  const router = useRouter();
  const [listening, setListening] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");
  const [reply, setReply] = React.useState("");
  const recRef = React.useRef<SpeechRecognition | null>(null);
  const transcriptRef = React.useRef("");

  const onResult = React.useCallback((e: SpeechRecognitionEvent) => {
    let text = "";
    for (const r of e.results as any) text += r[0]?.transcript || "";
    text = text.trim();
    transcriptRef.current = text;
    setTranscript(text);
  }, []);

  const onEnd = React.useCallback(() => {
    setListening(false);
    const said = transcriptRef.current || transcript;
    if (!said) return;
    const intent = inferIntent(said);
    if (intent.speak) speakBn(intent.speak);
    if (intent.type === "smalltalk" && intent.speak) {
      setReply(intent.speak);
    } else if (intent.type === "navigate" && intent.path) {
      router.push(intent.path);
    } else if (intent.type === "map") {
      router.push("/tracker#facility-map");
    }
  }, [router, transcript]);

  const start = React.useCallback(() => {
    if (!isSpeechRecognitionSupported()) {
      speakBn("দুঃখিত, আপনার ব্রাউজারে ভয়েস সমর্থিত নয়");
      return;
    }
    const rec = createRecognizer("bn-BD");
    if (!rec) return;
    recRef.current = rec;
    setTranscript("");
    setReply("");
    setListening(true);
    rec.onresult = onResult;
    rec.onerror = () => setListening(false);
    rec.onend = onEnd;
    try { rec.start(); } catch {}
  }, [onEnd, onResult]);

  const stop = React.useCallback(() => { recRef.current?.stop?.(); }, []);

  const handleManual = (e: React.FormEvent) => {
    e.preventDefault();
    const said = transcript.trim();
    if (!said) return;
    const intent = inferIntent(said);
    if (intent.speak) speakBn(intent.speak);
    if (intent.type === "smalltalk" && intent.speak) {
      setReply(intent.speak);
    } else if (intent.type === "navigate" && intent.path) {
      router.push(intent.path);
    } else if (intent.type === "map") {
      router.push("/tracker#facility-map");
    } else {
      setReply(intent.speak || "");
    }
  };

  // Auto start if query param present
  React.useEffect(() => {
    if (searchParams?.auto && !listening) {
      start();
    }
  }, [searchParams, start, listening]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="bg-gradient-to-br from-white/90 to-blue-50/70 dark:from-neutral-900/80 dark:to-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl backdrop-blur p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">মনবন্ধু সহায়ক</h1>
        <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">ভয়েস বা লেখা দিয়ে নির্দেশ দিন: "মুড", "সহায়তা", "ট্র্যাকার", "কর্মী", "পরামর্শ", "মানচিত্র" অথবা ছোট আলাপ ("হ্যালো", "কেমন আছ", "সময় কত").</p>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <button onClick={start} disabled={listening} className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium shadow disabled:opacity-60 disabled:shadow-none transition active:scale-[.97]">{listening ? "Listening…" : "🎤 Start Voice"}</button>
          <button onClick={stop} className="px-5 py-2.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100 text-sm font-medium shadow transition active:scale-[.97]">Stop</button>
          <span className={`text-sm font-medium ${listening ? 'text-green-600 dark:text-green-400' : 'text-neutral-500 dark:text-neutral-400'}`}>{listening ? 'শুনছে…' : 'নিষ্ক্রিয়'}</span>
        </div>
        <form onSubmit={handleManual} className="mb-6 flex gap-3 items-stretch">
          <input
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            placeholder="আপনার বার্তা লিখুন বা বলুন..."
            className="flex-1 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white/60 dark:bg-neutral-900/60 px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner"
          />
          <button type="submit" className="px-6 py-3 rounded-xl bg-primary text-white text-sm md:text-base font-semibold shadow hover:shadow-md transition active:scale-[.97]">পাঠান</button>
        </form>
        <div className="space-y-3 min-h-[100px] mb-4">
          {transcript && (
            <div className="rounded-lg bg-blue-100 dark:bg-blue-900/40 px-4 py-3 text-sm md:text-base"><span className="font-semibold text-blue-700 dark:text-blue-300">আপনি:</span> {transcript}</div>
          )}
          {reply && (
            <div className="rounded-lg bg-emerald-100 dark:bg-emerald-900/40 px-4 py-3 text-sm md:text-base"><span className="font-semibold text-emerald-700 dark:text-emerald-300">সহায়ক:</span> {reply}</div>
          )}
          {!transcript && !reply && (
            <div className="text-sm md:text-base text-neutral-500 dark:text-neutral-400">কিছু বলুন বা লিখুন শুরু করার জন্য…</div>
          )}
        </div>
        <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">প্রাইভেসি: অডিও সার্ভারে পাঠানো হয় না—সব প্রক্রিয়াকরণ আপনার ব্রাউজারে।</div>
      </div>
    </div>
  );
}
