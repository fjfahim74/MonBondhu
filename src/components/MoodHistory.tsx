"use client";
import React from "react";
import { getMoodLogs, getRecentDays, BanglaMoodLabels, daysSinceLastEntry } from "@/lib/mood";

export const MoodHistory: React.FC = () => {
  const [entries, setEntries] = React.useState(() => getMoodLogs());
  const [recent, setRecent] = React.useState(() => getRecentDays(14));
  const gapDays = daysSinceLastEntry();

  React.useEffect(() => {
    const id = setInterval(() => {
      setEntries(getMoodLogs());
      setRecent(getRecentDays(14));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4">
      {gapDays !== undefined && gapDays >= 3 && (
        <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm dark:border-amber-600 dark:bg-amber-900/30">
          আপনি {gapDays} দিন ধরে চেক-ইন করেননি। আজ আবার নিজেকে একটু জিজ্ঞেস করুন—আপনার মন কেমন আছে?
        </div>
      )}
      <div className="rounded-md border p-4 bg-white/50 dark:bg-neutral-900/50 backdrop-blur">
        <h3 className="font-semibold mb-2 text-sm">গত ১৪ দিনের ধারাবাহিকতা</h3>
        <div className="flex gap-1 overflow-x-auto">
          {recent.map((d) => (
            <div key={d.date} className="flex flex-col items-center w-10">
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center text-[10px] ${
                  d.value
                    ? `bg-primary-${d.value + 3}00 text-white`
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500"
                }`}
                title={d.value ? BanglaMoodLabels[d.value] : "কোনো লগ নেই"}
              >
                {d.value ?? "-"}
              </div>
              <span className="mt-1 text-[10px] tabular-nums">
                {d.date.split("-")[2]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">সাম্প্রতিক নোট</h3>
        {entries.slice(-5).reverse().map((e) => (
          <div key={e.id} className="rounded border p-2 text-xs bg-white/70 dark:bg-neutral-800/60">
            <div className="font-medium">{e.date} • {BanglaMoodLabels[e.moodLevel]}</div>
            {e.note && <div className="mt-1 whitespace-pre-line">{e.note}</div>}
          </div>
        ))}
        {!entries.length && <p className="text-xs text-neutral-600 dark:text-neutral-400">এখনো কোনো mood চেক-ইন নেই। আজ একটি শুরু করুন।</p>}
      </div>
    </div>
  );
};

export default MoodHistory;
