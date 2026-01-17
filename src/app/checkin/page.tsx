import type { Metadata } from "next";
import { Container } from "@/components/Container";
import MoodCheckInForm from "@/components/MoodCheckInForm";
import MoodHistory from "@/components/MoodHistory";
import OfflineIndicator from "@/components/OfflineIndicator";
import { BanglaNudges, CrisisNumbers } from "@/lib/mood";

export const metadata: Metadata = {
  title: "মনবন্ধু • দৈনিক মন চেক-ইন",
  description: "আপনার মন কেমন আছে—নিরাপদে, ব্যক্তিগতভাবে সংরক্ষণ করুন।",
};

export default function Page() {
  return (
    <Container>
      <div className="mt-8 mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium border border-primary-200 dark:border-primary-800 mb-4">
          <span className="text-lg">😊</span>
          মুড চেক-ইন
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">আজ আপনার মন কেমন?</h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">{BanglaNudges.privacy}</p>
        <div className="flex justify-center mt-4">
          <OfflineIndicator />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <MoodCheckInForm />
        </div>
        <div>
          <MoodHistory />
        </div>
      </div>

      {/* Crisis Support Card */}
      <div className="card-elevated bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/40 dark:to-orange-950/40 border-red-200 dark:border-red-800">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl">🆘</span>
          <div>
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-1">জরুরি সহায়তা</h3>
            <p className="text-sm text-neutral-800 dark:text-neutral-200">{BanglaNudges.crisis}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {CrisisNumbers.map((c) => (
            <a
              key={c.label}
              href={`tel:${c.phone}`}
              className="flex items-center justify-between rounded-lg border-2 border-red-300 dark:border-red-700 bg-white dark:bg-neutral-800 p-3 hover:shadow-md transition-all hover:border-red-400 dark:hover:border-red-600"
            >
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{c.label}</span>
              <span className="text-sm font-bold text-green-700 dark:text-green-400">{c.phone}</span>
            </a>
          ))}
        </div>
        <p className="text-xs mt-4 text-neutral-800 dark:text-neutral-200 bg-amber-100/80 dark:bg-amber-900/30 rounded-lg p-3 border border-amber-300 dark:border-amber-700">
          ⚠️ এই অ্যাপ চিকিৎসা পরামর্শ নয়—প্রয়োজনে নিকটস্থ স্বাস্থ্যকেন্দ্রে যান।
        </p>
      </div>
    </Container>
  );
}
