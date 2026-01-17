import { z } from "zod";

// Types
export const MoodEntrySchema = z.object({
  id: z.string(),
  date: z.string(), // YYYY-MM-DD
  moodLevel: z.number().min(1).max(5),
  tags: z.array(z.string()).optional(),
  note: z.string().optional(),
});

export type MoodEntry = z.infer<typeof MoodEntrySchema>;

const STORAGE_KEY = "monbondhu:moodLogs";

function todayYmd(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseDate(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function daysBetween(a: string, b: string): number {
  const d1 = parseDate(a);
  const d2 = parseDate(b);
  const ms = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function safeGetStorage(): Storage | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
  } catch {}
  return null;
}

export function getMoodLogs(): MoodEntry[] {
  const ls = safeGetStorage();
  if (!ls) return [];
  const raw = ls.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    const arr = z.array(MoodEntrySchema).safeParse(parsed);
    return arr.success ? arr.data : [];
  } catch {
    return [];
  }
}

function setMoodLogs(entries: MoodEntry[]): void {
  const ls = safeGetStorage();
  if (!ls) return;
  ls.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function upsertTodayMood(moodLevel: number, note?: string, tags?: string[]): MoodEntry {
  const date = todayYmd();
  const entries = getMoodLogs();
  const existingIdx = entries.findIndex((e) => e.date === date);
  const entry: MoodEntry = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
    date,
    moodLevel,
    ...(note ? { note } : {}),
    ...(tags && tags.length ? { tags } : {}),
  };
  if (existingIdx >= 0) entries[existingIdx] = entry;
  else entries.push(entry);
  // Keep only last 180 entries to bound storage
  entries.sort((a, b) => (a.date < b.date ? -1 : 1));
  setMoodLogs(entries.slice(-180));
  return entry;
}

export function getTodayMood(): MoodEntry | undefined {
  const date = todayYmd();
  return getMoodLogs().find((e) => e.date === date);
}

export function getLastEntry(): MoodEntry | undefined {
  const arr = getMoodLogs();
  if (!arr.length) return undefined;
  return arr[arr.length - 1];
}

export function daysSinceLastEntry(): number | undefined {
  const last = getLastEntry();
  if (!last) return undefined;
  return daysBetween(last.date, todayYmd());
}

export function getRecentDays(days: number): { date: string; value?: number }[] {
  const out: { date: string; value?: number }[] = [];
  const map = new Map(getMoodLogs().map((e) => [e.date, e.moodLevel] as const));
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const ymd = todayYmd(d);
    const v = map.get(ymd);
    out.push({ date: ymd, value: v });
  }
  return out;
}

export const BanglaMoodLabels: Record<number, string> = {
  1: "খুব খারাপ",
  2: "খারাপ",
  3: "মাঝামাঝি",
  4: "ভাল",
  5: "খুব ভাল",
};

export const BanglaNudges = {
  gentleMissed: "আপনি কয়েকদিন ধরে চেক-ইন করেননি। আবার বলতে চান, আজ কেমন আছেন?",
  privacy: "আপনার তথ্য শুধুমাত্র এই ডিভাইসে সংরক্ষিত হয়। আমরা কোনো ব্যক্তিগত তথ্য সার্ভারে পাঠাই না।",
  crisis: "আপনি যদি তৎক্ষণাৎ সাহায্য চান, এই নম্বরে যোগাযোগ করুন:",
};

export const CrisisNumbers = [
  { label: "ক্লিনিক/হাসপাতাল জরুরি", phone: "999" },
  // Placeholder NGO helpline; replace with local resource in deployment
  { label: "মানসিক সহায়তা (এনজিও)", phone: "+880XXXXXXXXXX" },
];
