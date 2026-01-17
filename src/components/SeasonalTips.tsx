"use client";
import React from "react";
import { getCurrentMonth, getTipsForMonth, BanglaTipsCopy, TIPS } from "@/lib/tips";

const monthNamesBn = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];

export const SeasonalTips: React.FC = () => {
  const [month, setMonth] = React.useState<number>(getCurrentMonth());
  const [tips, setTips] = React.useState(() => getTipsForMonth(month));
  const [expanded, setExpanded] = React.useState<string | null>(null);

  function handleMonthChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const m = Number(e.target.value);
    setMonth(m);
    setTips(getTipsForMonth(m));
    setExpanded(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label htmlFor="month" className="text-sm font-medium">{BanglaTipsCopy.monthLabel}</label>
          <select id="month" value={month} onChange={handleMonthChange} className="rounded-md border px-3 py-2 text-sm dark:bg-neutral-800">
            {monthNamesBn.map((n,i)=>(<option key={i+1} value={i+1}>{n}</option>))}
          </select>
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">মোট পরামর্শ: {tips.length}</div>
        <button type="button" onClick={()=>{ setMonth(getCurrentMonth()); setTips(getTipsForMonth(getCurrentMonth())); }} className="btn btn-secondary text-xs">বর্তমান মাস</button>
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {tips.map(t => {
          const open = expanded === t.id;
          return (
            <li key={t.id} className="rounded-md border p-4 bg-white/60 dark:bg-neutral-900/50">
              <div className="flex justify-between items-start gap-3">
                <h3 className="font-semibold text-sm">{t.titleBn}</h3>
                <button onClick={()=> setExpanded(open? null : t.id)} className="text-xs rounded px-2 py-1 border hover:bg-primary-50 dark:hover:bg-neutral-800">{open? 'বন্ধ' : 'আরও'}</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="px-2 py-0.5 rounded-full border bg-white dark:bg-neutral-800">{t.category}</span>
              </div>
              {open && (
                <ul className="mt-3 list-disc ms-4 space-y-1 text-xs">
                  {t.bodyBn.map((line, idx)=>(<li key={idx}>{line}</li>))}
                </ul>
              )}
            </li>
          );
        })}
        {!tips.length && (
          <li className="text-sm text-neutral-600 dark:text-neutral-400">কোনো পরামর্শ নেই।</li>
        )}
      </ul>
      <p className="text-xs text-neutral-600 dark:text-neutral-400">{BanglaTipsCopy.disclaimer}</p>
    </div>
  );
};

export default SeasonalTips;
