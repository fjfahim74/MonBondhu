"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function VoiceAssistant() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/assistant?auto=1")}
      aria-label="ভয়েস সহায়ক"
      className="rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-sm"
      title="ভয়েস সহায়ক"
    >
      🎤
    </button>
  );
}
