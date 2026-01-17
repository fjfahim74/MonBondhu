import { z } from "zod";

export const TipSchema = z.object({
  id: z.string(),
  titleBn: z.string(),
  bodyBn: z.array(z.string()),
  category: z.enum(["dengue", "coldflu", "diarrhea", "heat", "year-round"]),
  monthsActive: z.array(z.number().min(1).max(12)), // 1=Jan ... 12=Dec
});

export type Tip = z.infer<typeof TipSchema>;

const M = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 } as const;

export const TIPS: Tip[] = [
  // Monsoon: dengue (Jun–Sep)
  {
    id: "dengue-basic",
    titleBn: "ডেঙ্গু প্রতিরোধ (বর্ষাকাল)",
    category: "dengue",
    monthsActive: [M.JUN, M.JUL, M.AUG, M.SEP],
    bodyBn: [
      "বাড়ির ভিতর-বাইরে জমে থাকা পানি ফেলে দিন (টব/টাইার/ক্যান ইত্যাদি)",
      "সকাল/সন্ধ্যায় লম্বা হাতা জামা পরুন, মশারি/মশা প্রতিরোধক ব্যবহার করুন",
      "৩ দিনের বেশি জ্বর থাকলে অযথা দেরি না করে ডাক্তার দেখান",
      "পাপড়-ধরনের মুখে রান্না/খাবার ঢেকে রাখুন",
    ],
  },
  {
    id: "dengue-danger",
    titleBn: "ডেঙ্গুর বিপদ চিহ্ন",
    category: "dengue",
    monthsActive: [M.JUN, M.JUL, M.AUG, M.SEP],
    bodyBn: [
      "পেট ব্যথা, বমি, রক্তক্ষরণ (মাড়ি/নাক) হলে জরুরি বিভাগে যান",
      "বাড়িতে স্যালাইন/পানি পান করুন, কিন্তু নিজে নিজে ওষুধ না খাওয়া ভালো",
    ],
  },

  // Winter: Dec–Feb cold/flu/pneumonia
  {
    id: "cold-basic",
    titleBn: "শীতকালে ঠান্ডা/ফ্লু প্রতিরোধ",
    category: "coldflu",
    monthsActive: [M.DEC, M.JAN, M.FEB],
    bodyBn: [
      "শিশু ও বয়স্কদের উষ্ণ রাখুন, ভিড় এড়িয়ে চলুন",
      "হাঁচি/কাশি ঢেকে দিন, নিয়মিত হাত ধুয়ে নিন",
    ],
  },
  {
    id: "cold-danger",
    titleBn: "নিউমোনিয়ার বিপদ চিহ্ন (শিশু)",
    category: "coldflu",
    monthsActive: [M.DEC, M.JAN, M.FEB],
    bodyBn: [
      "শ্বাসকষ্ট, বুক ধড়ফড়, খাওয়া কমে যাওয়া—এসব হলে দ্রুত ডাক্তার দেখান",
      "উচ্চ জ্বর দীর্ঘস্থায়ী হলে হাসপাতালে যান",
    ],
  },

  // Summer: Mar–May diarrhea/heat
  {
    id: "diarrhea-basic",
    titleBn: "গ্রীষ্মে ডায়রিয়া প্রতিরোধ",
    category: "diarrhea",
    monthsActive: [M.MAR, M.APR, M.MAY],
    bodyBn: [
      "সেদ্ধ/ফোটানো পানি পান করুন, রাস্তার কাটা ফল/খাবার এড়িয়ে চলুন",
      "ডায়রিয়া হলে বারবার ওআরএস/স্যালাইন দিন",
    ],
  },
  {
    id: "heat-basic",
    titleBn: "গরমে হিটস্ট্রোক প্রতিরোধ",
    category: "heat",
    monthsActive: [M.MAR, M.APR, M.MAY],
    bodyBn: [
      "রোদে দীর্ঘক্ষণ কাজ করলে টুপি/ছাতা ব্যবহার করুন",
      "অতিরিক্ত ঘাম হলে পানি/লবণ-চিনি মিশ্রণ পান করুন",
    ],
  },

  // Year-round
  {
    id: "yr-handwash",
    titleBn: "সারা বছর—হাত ধোয়ার অভ্যাস",
    category: "year-round",
    monthsActive: [1,2,3,4,5,6,7,8,9,10,11,12],
    bodyBn: ["খাওয়ার আগে/টয়লেটের পরে সাবান দিয়ে ২০ সেকেন্ড হাত ধুয়ে নিন"],
  },
  {
    id: "yr-food",
    titleBn: "খাবার নিরাপত্তা",
    category: "year-round",
    monthsActive: [1,2,3,4,5,6,7,8,9,10,11,12],
    bodyBn: ["ভালো করে রান্না করুন, ঢেকে রাখুন, নোংরা পানি/বরফ এড়িয়ে চলুন"],
  },
  {
    id: "yr-when-to-see",
    titleBn: "কখন ডাক্তার দেখাবেন",
    category: "year-round",
    monthsActive: [1,2,3,4,5,6,7,8,9,10,11,12],
    bodyBn: [
      "উচ্চ জ্বর ৩ দিনের বেশি, প্রচণ্ড ব্যথা, রক্তক্ষরণ, শ্বাসকষ্ট—তৎক্ষণাৎ হাসপাতালে যান",
    ],
  },
];

export function getCurrentMonth(): number { return new Date().getMonth() + 1; }

export function getTipsForMonth(month: number): Tip[] {
  const arr = TIPS.filter(t => t.monthsActive.includes(month));
  // Ensure year-round included (already in data, but guard anyway)
  const year = TIPS.filter(t => t.category === 'year-round');
  const ids = new Set(arr.map(t=>t.id));
  for (const y of year) if (!ids.has(y.id)) arr.push(y);
  return arr;
}

export const BanglaTipsCopy = {
  header: "মৌসুমি স্বাস্থ্য পরামর্শ",
  monthLabel: "মাস",
  disclaimer: "এগুলো সাধারণ সচেতনতার তথ্য। এটি চিকিৎসা পরামর্শ নয়—ঝুঁকি মনে হলে নিকটস্থ স্বাস্থ্যকেন্দ্রে যান।",
};
