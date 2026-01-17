import { z } from "zod";

export const Skill = z.enum([
  "mental-health",
  "maternal-health",
  "child-health",
  "first-aid",
  "chronic-disease",
]);

export type Skill = z.infer<typeof Skill>;

export const ChwSchema = z.object({
  id: z.string(),
  nameBn: z.string(),
  division: z.string(),
  district: z.string(),
  upazila: z.string(),
  union: z.string(),
  skills: z.array(Skill),
  phone: z.string().optional(),
  whatsapp: z.boolean().optional(),
  hours: z.string().optional(),
  availability: z.enum(["available", "away", "offline"]).default("away"),
  verifiedBy: z.string().optional(),
});

export type Chw = z.infer<typeof ChwSchema>;

export const SKILL_LABELS_BN: Record<Skill, string> = {
  "mental-health": "মানসিক সহায়তা",
  "maternal-health": "মাতৃস্বাস্থ্য",
  "child-health": "শিশুস্বাস্থ্য",
  "first-aid": "প্রাথমিক চিকিৎসা",
  "chronic-disease": "দীর্ঘমেয়াদি রোগ",
};

// Seed dataset (mock). In production, fetch from a trusted source and cache.
export const CHW_DATA: Chw[] = [
  {
    id: "chw-1",
    nameBn: "রাশেদা খাতুন",
    division: "Dhaka",
    district: "Gazipur",
    upazila: "Sreepur",
    union: "Gazipur Sadar Union",
    skills: ["mental-health", "maternal-health", "first-aid"],
    phone: "+8801711000001",
    whatsapp: true,
    hours: "সকাল ৯টা – বিকাল ৫টা",
    availability: "available",
    verifiedBy: "BRAC",
  },
  {
    id: "chw-2",
    nameBn: "হাসান মাহমুদ",
    division: "Chittagong",
    district: "Cox's Bazar",
    upazila: "Ukhiya",
    union: "Palong Khali",
    skills: ["first-aid", "child-health"],
    phone: "+8801711000002",
    whatsapp: false,
    hours: "দুপুর ১২টা – রাত ৮টা",
    availability: "away",
    verifiedBy: "Red Crescent",
  },
  {
    id: "chw-3",
    nameBn: "মাহিয়া ইসলাম",
    division: "Rajshahi",
    district: "Naogaon",
    upazila: "Atrai",
    union: "Baraigram",
    skills: ["mental-health", "chronic-disease"],
    phone: "+8801711000003",
    whatsapp: true,
    hours: "সন্ধ্যা ৬টা – রাত ১০টা",
    availability: "available",
    verifiedBy: "Nirapod Jibon NGO",
  },
  {
    id: "chw-4",
    nameBn: "জুবায়ের আলম",
    division: "Sylhet",
    district: "Sunamganj",
    upazila: "Tahirpur",
    union: "South Tahirpur",
    skills: ["maternal-health", "child-health", "first-aid"],
    phone: "+8801711000004",
    whatsapp: true,
    hours: "সকাল ৮টা – দুপুর ২টা",
    availability: "offline",
    verifiedBy: "Community Clinic Program",
  },
];

export function listUpazilas(): string[] {
  return Array.from(new Set(CHW_DATA.map((c) => c.upazila))).sort((a, b) => a.localeCompare(b));
}

export function filterChw(opts: { query?: string; upazila?: string; skills?: Skill[]; availableOnly?: boolean }): Chw[] {
  const q = (opts.query || "").trim().toLowerCase();
  const skillSet = new Set(opts.skills || []);
  return CHW_DATA.filter((c) => {
    if (opts.upazila && c.upazila !== opts.upazila) return false;
    if (opts.availableOnly && c.availability !== "available") return false;
    if (skillSet.size) {
      const hasAll = Array.from(skillSet).every((s) => c.skills.includes(s));
      if (!hasAll) return false;
    }
    if (q) {
      const hay = `${c.nameBn} ${c.union} ${c.upazila} ${c.district} ${c.division} ${c.skills.map((s) => SKILL_LABELS_BN[s]).join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
