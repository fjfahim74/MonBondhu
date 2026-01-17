"use client";
import React from "react";
import { enqueueHelpRequest, flushHelpQueue, getHelpQueue, BanglaConsent } from "@/lib/help";

const categories: { value: any; label: string }[] = [
  { value: "stress", label: "চাপ" },
  { value: "sadness", label: "মন খারাপ" },
  { value: "anxious", label: "উদ্বিগ্ন" },
  { value: "other", label: "অন্যান্য" },
];

export const HelpRequestForm: React.FC = () => {
  const [category, setCategory] = React.useState("stress");
  const [note, setNote] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [queue, setQueue] = React.useState(getHelpQueue());
  const [sending, setSending] = React.useState(false);
  const [lastResult, setLastResult] = React.useState<string | null>(null);

  function refresh() { setQueue(getHelpQueue()); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    enqueueHelpRequest({ category: category as any, note: note.trim() || undefined, consentConfirmed: true });
    setNote("");
    setConsent(false);
    refresh();
  }

  async function handleFlush() {
    setSending(true);
    const res = await flushHelpQueue();
    setSending(false);
    setLastResult(`পাঠানো হয়েছে: ${res.sent}, ব্যর্থ: ${res.failed}`);
    refresh();
  }

  React.useEffect(() => {
    const onOnline = () => { handleFlush(); };
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-md border bg-white/60 dark:bg-neutral-900/50 backdrop-blur">
        <h2 className="font-semibold text-lg">গোপন সহায়তা অনুরোধ</h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">{BanglaConsent.short}</p>
        <div className="space-y-2">
          <label className="font-medium text-sm">সমস্যার ধরন</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => {
              const active = c.value === category;
              return (
                <button type="button" key={c.value} onClick={() => setCategory(c.value)}
                  className={`px-3 py-1.5 rounded-md border text-sm ${active ? 'bg-primary-600 text-white border-primary-600' : 'hover:bg-primary-50 dark:hover:bg-neutral-800'}`}>{c.label}</button>
              );
            })}
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="note" className="font-medium text-sm">কিছু লিখতে চান? (ঐচ্ছিক, সর্বোচ্চ ৫০০ অক্ষর)</label>
            <textarea id="note" value={note} onChange={e => setNote(e.target.value)} maxLength={500}
              rows={4} className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-800" placeholder="আপনি যা শেয়ার করতে স্বস্তি বোধ করেন তা লিখুন..." />
        </div>
        <label className="flex items-start gap-2 text-sm select-none cursor-pointer">
          <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1" />
          <span>{BanglaConsent.checkbox}</span>
        </label>
        <div className="flex gap-3 items-center">
          <button type="submit" disabled={!consent} className="btn btn-primary disabled:opacity-40">কিউতে যোগ করুন</button>
          <button type="button" onClick={handleFlush} disabled={sending || !queue.some(q=>q.status==='queued') || !navigator.onLine} className="btn btn-secondary disabled:opacity-40">এখনই পাঠান</button>
          {sending && <span className="text-sm text-neutral-500">পাঠানো হচ্ছে...</span>}
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">{BanglaConsent.disclaimer}</p>
        {lastResult && <p className="text-sm text-neutral-700 dark:text-neutral-300">{lastResult}</p>}
      </form>
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">লোকাল কিউ</h3>
        {queue.length === 0 && <p className="text-xs text-neutral-500">কোনো অনুরোধ কিউতে নেই।</p>}
        <ul className="space-y-2">
          {queue.slice().reverse().map(item => (
            <li key={item.id} className="rounded border p-2 text-xs flex flex-col gap-1 bg-white/70 dark:bg-neutral-800/60">
              <div className="flex justify-between"><span>{new Date(item.createdAt).toLocaleString()}</span><span className={`font-medium ${item.status==='sent' ? 'text-green-600' : item.status==='failed' ? 'text-amber-600' : 'text-blue-600'}`}>{item.status}</span></div>
              <div>ধরন: {item.category}</div>
              {item.note && <div className="line-clamp-3 whitespace-pre-line">{item.note}</div>}
              {item.ref && <div>রেফ: {item.ref}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HelpRequestForm;
