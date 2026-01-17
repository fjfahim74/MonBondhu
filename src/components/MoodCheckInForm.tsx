"use client";
import React from "react";
import { BanglaMoodLabels, upsertTodayMood, getTodayMood } from "@/lib/mood";

interface Props {
  onSaved?: () => void;
}

export const MoodCheckInForm: React.FC<Props> = ({ onSaved }) => {
  const existing = getTodayMood();
  const [mood, setMood] = React.useState<number>(existing?.moodLevel || 3);
  const [note, setNote] = React.useState<string>(existing?.note || "");
  const [saved, setSaved] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    upsertTodayMood(mood, note.trim() || undefined);
    setSaved(true);
    onSaved?.();
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-md border bg-white/50 dark:bg-neutral-900/50 backdrop-blur">
      <div className="space-y-2">
        <label className="font-medium">আজ আপনার মন কেমন?</label>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(BanglaMoodLabels).map(([level, label]) => {
            const num = Number(level);
            const active = num === mood;
            return (
              <button
                key={level}
                type="button"
                onClick={() => setMood(num)}
                className={`text-xs sm:text-sm rounded-md border px-2 py-2 transition ${active ? "bg-primary-600 text-white border-primary-600" : "hover:bg-primary-50 dark:hover:bg-neutral-800"}`}
                aria-pressed={active}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-2">
        <label className="font-medium" htmlFor="note">কিছু লিখতে চান? (ঐচ্ছিক)</label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-800"
          rows={3}
          placeholder="যেমন: আজ একটু চিন্তা বেশি..."
        />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" className="btn btn-primary">সংরক্ষণ</button>
        {saved && <span className="text-green-600 text-sm">সংরক্ষণ হয়েছে</span>}
      </div>
      {existing && <p className="text-xs text-neutral-600 dark:text-neutral-400">আজ আপনি আগে {BanglaMoodLabels[existing.moodLevel]} নির্বাচন করেছিলেন; পুনরায় পরিবর্তন করতে পারেন।</p>}
    </form>
  );
};

export default MoodCheckInForm;
