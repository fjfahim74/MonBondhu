import { z } from "zod";

export const HelpCategory = z.enum(["stress", "sadness", "anxious", "other"]);

export const HelpRequestSchema = z.object({
  id: z.string(),
  createdAt: z.string(), // ISO
  category: HelpCategory,
  note: z.string().max(500).optional(),
  consentConfirmed: z.literal(true),
  status: z.union([z.literal("queued"), z.literal("sent"), z.literal("failed")]),
  ref: z.string().optional(),
});

export type HelpRequest = z.infer<typeof HelpRequestSchema>;

const STORAGE_KEY = "monbondhu:helpQueue";

function safeLS(): Storage | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
  } catch {}
  return null;
}

function readQueue(): HelpRequest[] {
  const ls = safeLS();
  if (!ls) return [];
  const raw = ls.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    const arr = z.array(HelpRequestSchema).safeParse(parsed);
    return arr.success ? arr.data : [];
  } catch {
    return [];
  }
}

function writeQueue(items: HelpRequest[]) {
  const ls = safeLS();
  if (!ls) return;
  ls.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getHelpQueue(): HelpRequest[] {
  return readQueue();
}

export function enqueueHelpRequest(input: { category: z.infer<typeof HelpCategory>; note?: string; consentConfirmed: true; }): HelpRequest {
  const req: HelpRequest = {
    id: (typeof crypto !== "undefined" && (crypto as any).randomUUID) ? (crypto as any).randomUUID() : `${Date.now()}`,
    createdAt: new Date().toISOString(),
    category: input.category,
    note: input.note?.trim() || undefined,
    consentConfirmed: true,
    status: "queued",
  };
  const all = readQueue();
  all.push(req);
  writeQueue(all);
  return req;
}

export async function flushHelpQueue(): Promise<{ sent: number; failed: number; lastRef?: string }> {
  const all = readQueue();
  if (!all.length) return { sent: 0, failed: 0 };
  let sent = 0, failed = 0; let lastRef: string | undefined;
  const next: HelpRequest[] = [];
  for (const item of all) {
    if (item.status !== "queued") { next.push(item); continue; }
    try {
      const res = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: item.category, note: item.note, consentConfirmed: true }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const ref = typeof data?.ref === "string" ? data.ref : undefined;
      next.push({ ...item, status: "sent", ref });
      sent++; lastRef = ref;
    } catch {
      // keep queued, but mark failed to show UI feedback
      next.push({ ...item, status: "failed" });
      failed++;
    }
  }
  writeQueue(next);
  return { sent, failed, lastRef };
}

export const BanglaConsent = {
  short: "আপনার অনুরোধ গোপনভাবে পাঠানো হবে। কোনো নাম/ফোন নেওয়া হবে না। আপনার সম্মতি থাকলে অনুগ্রহ করে নিশ্চিত করুন।",
  checkbox: "আমি বুঝেছি এবং সম্মতি দিচ্ছি",
  disclaimer: "এই অ্যাপ চিকিৎসা পরামর্শ নয়। জরুরি অবস্থায় নিকটস্থ স্বাস্থ্যকেন্দ্রে যান বা জরুরি নম্বরে ফোন করুন।",
};
