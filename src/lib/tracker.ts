import { z } from "zod";

// Antenatal Care schedule points (WHO/Bangladesh simplified): weeks offsets
const ANC_WEEKS = [12, 20, 26, 30, 34, 36, 38, 40];

// Bangladesh EPI (simplified common vaccines timeline in weeks from birth)
// Real schedule can be more granular; hackathon simplification.
const EPI_SCHEDULE: { code: string; labelBn: string; weeks: number }[] = [
  { code: "BCG", labelBn: "বিসিজি", weeks: 0 },
  { code: "OPV1", labelBn: "ওপিভি-১", weeks: 6 },
  { code: "Penta1", labelBn: "পেন্টা-১", weeks: 6 },
  { code: "OPV2", labelBn: "ওপিভি-২", weeks: 10 },
  { code: "Penta2", labelBn: "পেন্টা-২", weeks: 10 },
  { code: "OPV3", labelBn: "ওপিভি-৩", weeks: 14 },
  { code: "Penta3", labelBn: "পেন্টা-৩", weeks: 14 },
  { code: "MR1", labelBn: "এমআর-১", weeks: 36 },
];

export const AncVisitSchema = z.object({
  id: z.string(),
  dueDate: z.string(), // YYYY-MM-DD
  week: z.number(),
  completed: z.boolean(),
});
export type AncVisit = z.infer<typeof AncVisitSchema>;

export const VaccineDoseSchema = z.object({
  id: z.string(),
  code: z.string(),
  labelBn: z.string(),
  dueDate: z.string(),
  weeks: z.number(),
  completed: z.boolean(),
});
export type VaccineDose = z.infer<typeof VaccineDoseSchema>;

export const MaternalProfileSchema = z.object({
  id: z.string(),
  expectedDeliveryDate: z.string(),
  visits: z.array(AncVisitSchema),
});
export type MaternalProfile = z.infer<typeof MaternalProfileSchema>;

export const ChildProfileSchema = z.object({
  id: z.string(),
  birthDate: z.string(),
  doses: z.array(VaccineDoseSchema),
});
export type ChildProfile = z.infer<typeof ChildProfileSchema>;

const MATERNAL_KEY = "monbondhu:maternalProfiles";
const CHILD_KEY = "monbondhu:childProfiles";

function todayYmd(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

function safeLS(): Storage | null { try { if (typeof window !== 'undefined') return window.localStorage; } catch {} return null; }

function read<T>(key: string, schema: z.ZodType<T>): T[] {
  const ls = safeLS(); if (!ls) return [];
  try { const raw = ls.getItem(key); if (!raw) return []; const parsed = JSON.parse(raw); const arr = z.array(schema).safeParse(parsed); return arr.success ? arr.data : []; } catch { return []; }
}
function write<T>(key: string, items: T[]) { const ls = safeLS(); if (!ls) return; ls.setItem(key, JSON.stringify(items)); }

export function listMaternalProfiles(): MaternalProfile[] { return read(MATERNAL_KEY, MaternalProfileSchema); }
export function listChildProfiles(): ChildProfile[] { return read(CHILD_KEY, ChildProfileSchema); }

export function createMaternalProfile(expectedDeliveryDate: string): MaternalProfile {
  const id = (typeof crypto !== 'undefined' && (crypto as any).randomUUID) ? (crypto as any).randomUUID() : `${Date.now()}`;
  const eddDate = new Date(expectedDeliveryDate);
  const visits: AncVisit[] = ANC_WEEKS.map(week => {
    const due = addWeeks(eddDate, -40 + week); // approximate: EDD - (40 - week)
    return { id: `${id}-anc-${week}`, dueDate: todayYmd(due), week, completed: false };
  });
  const profile: MaternalProfile = { id, expectedDeliveryDate, visits };
  const all = listMaternalProfiles(); all.push(profile); write(MATERNAL_KEY, all); return profile;
}

export function createChildProfile(birthDate: string): ChildProfile {
  const id = (typeof crypto !== 'undefined' && (crypto as any).randomUUID) ? (crypto as any).randomUUID() : `${Date.now()}`;
  const bDate = new Date(birthDate);
  const doses: VaccineDose[] = EPI_SCHEDULE.map(v => {
    const due = addWeeks(bDate, v.weeks);
    return { id: `${id}-vac-${v.code}`, code: v.code, labelBn: v.labelBn, dueDate: todayYmd(due), weeks: v.weeks, completed: false };
  });
  const profile: ChildProfile = { id, birthDate, doses };
  const all = listChildProfiles(); all.push(profile); write(CHILD_KEY, all); return profile;
}

export function toggleAncVisit(profileId: string, visitId: string): void {
  const all = listMaternalProfiles();
  const idx = all.findIndex(p => p.id === profileId); if (idx < 0) return;
  all[idx].visits = all[idx].visits.map(v => v.id === visitId ? { ...v, completed: !v.completed } : v);
  write(MATERNAL_KEY, all);
}

export function toggleVaccineDose(profileId: string, doseId: string): void {
  const all = listChildProfiles();
  const idx = all.findIndex(p => p.id === profileId); if (idx < 0) return;
  all[idx].doses = all[idx].doses.map(d => d.id === doseId ? { ...d, completed: !d.completed } : d);
  write(CHILD_KEY, all);
}

export function deleteMaternalProfile(id: string): void {
  const all = listMaternalProfiles().filter(p => p.id !== id); write(MATERNAL_KEY, all);
}
export function deleteChildProfile(id: string): void {
  const all = listChildProfiles().filter(p => p.id !== id); write(CHILD_KEY, all);
}

export const BanglaTrackerCopy = {
  maternalHeader: "মাতৃত্বকালীন সেবা (ANC) সময়সূচি",
  childHeader: "শিশুর টিকাদান সময়সূচি",
  addMaternal: "নতুন গর্ভকালীন প্রোফাইল যোগ করুন",
  addChild: "নতুন শিশুর প্রোফাইল যোগ করুন",
  eddLabel: "প্রত্যাশিত প্রসবের তারিখ",
  birthDateLabel: "জন্ম তারিখ",
  delete: "মুছুন",
  noProfiles: "এখনো কোনো প্রোফাইল নেই। নিচের ফর্ম থেকে শুরু করুন।",
  disclaimer: "এই তথ্য স্থানীয়ভাবে সংরক্ষিত হয়। ভুল বা পরিবর্তন হলে নিজে আপডেট করুন।",
};
