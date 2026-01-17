"use client";
import React from "react";
import { CHW_DATA, SKILL_LABELS_BN, Skill, listUpazilas, filterChw } from "@/lib/chw";

const STORAGE_KEY = "monbondhu:chwFilters";

function loadFilters(): { query: string; upazila: string; skills: Skill[]; availableOnly: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { query: "", upazila: "", skills: [], availableOnly: false };
    const obj = JSON.parse(raw);
    return { query: obj.query || "", upazila: obj.upazila || "", skills: obj.skills || [], availableOnly: !!obj.availableOnly };
  } catch {
    return { query: "", upazila: "", skills: [], availableOnly: false };
  }
}

function saveFilters(f: { query: string; upazila: string; skills: Skill[]; availableOnly: boolean }) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(f)); } catch {}
}

export const ChwDirectory: React.FC = () => {
  const upazilas = React.useMemo(() => listUpazilas(), []);
  const [filters, setFilters] = React.useState(loadFilters);
  const [results, setResults] = React.useState(() => filterChw(filters));

  function update(partial: Partial<typeof filters>) {
    const next = { ...filters, ...partial };
    setFilters(next);
    setResults(filterChw(next));
    saveFilters(next);
  }

  function toggleSkill(s: Skill) {
    const set = new Set(filters.skills);
    if (set.has(s)) set.delete(s); else set.add(s);
    update({ skills: Array.from(set) as Skill[] });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border p-4 bg-white/60 dark:bg-neutral-900/50">
        <div className="grid gap-3 md:grid-cols-4 items-end">
          <div className="md:col-span-2">
            <label className="text-sm font-medium" htmlFor="q">খুঁজুন</label>
            <input id="q" value={filters.query} onChange={(e) => update({ query: e.target.value })} placeholder="নাম, ইউনিয়ন, দক্ষতা..." className="w-full rounded-md border px-3 py-2 text-sm dark:bg-neutral-800" />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="upazila">উপজেলা</label>
            <select id="upazila" value={filters.upazila} onChange={(e) => update({ upazila: e.target.value })} className="w-full rounded-md border px-3 py-2 text-sm dark:bg-neutral-800">
              <option value="">সকল</option>
              {upazilas.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input id="available" type="checkbox" checked={filters.availableOnly} onChange={(e) => update({ availableOnly: e.target.checked })} />
            <label htmlFor="available" className="text-sm">শুধু বর্তমানে উপলব্ধ</label>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(SKILL_LABELS_BN) as Skill[]).map(s => {
            const active = filters.skills.includes(s);
            return (
              <button key={s} type="button" onClick={() => toggleSkill(s)} className={`text-xs px-2 py-1 rounded-full border ${active ? 'bg-primary-600 text-white border-primary-600' : 'hover:bg-primary-50 dark:hover:bg-neutral-800'}`}>{SKILL_LABELS_BN[s]}</button>
            );
          })}
        </div>
      </div>

      <div className="text-sm text-neutral-600 dark:text-neutral-400">ফলাফল: {results.length} জন</div>

      <ul className="grid gap-4 md:grid-cols-2">
        {results.map((w) => (
          <li key={w.id} className="rounded-md border p-4 bg-white/60 dark:bg-neutral-900/50">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{w.nameBn}</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">{w.union}, {w.upazila}, {w.district}</div>
                {w.verifiedBy && (
                  <div className="mt-1 inline-flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700 rounded px-2 py-0.5">
                    ✅ প্রশিক্ষিত: {w.verifiedBy}
                  </div>
                )}
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full border ${w.availability==='available' ? 'bg-green-600 text-white border-green-600' : w.availability==='away' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-300 dark:border-amber-700' : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'}`}>{w.availability === 'available' ? 'উপলব্ধ' : w.availability === 'away' ? 'ব্যস্ত/সীমিত' : 'অফলাইন'}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {w.skills.map((s) => (
                <span key={s} className="text-[11px] px-2 py-0.5 rounded-full border bg-white dark:bg-neutral-800">{SKILL_LABELS_BN[s]}</span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              {w.phone && <a className="text-primary-700 hover:underline" href={`tel:${w.phone}`}>📞 {w.phone}</a>}
              {w.whatsapp && <span>🟢 WhatsApp</span>}
              {w.hours && <span className="text-xs text-neutral-600 dark:text-neutral-400">সময়: {w.hours}</span>}
            </div>
          </li>
        ))}
        {!results.length && (
          <li className="text-sm text-neutral-600 dark:text-neutral-400">কোনো ফলাফল নেই—ফিল্টার পরিবর্তন করে দেখুন।</li>
        )}
      </ul>
    </div>
  );
};

export default ChwDirectory;
