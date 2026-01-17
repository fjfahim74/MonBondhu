import type { Metadata } from "next";
import { Container } from "@/components/Container";
import TrackerManager from "@/components/TrackerManager";
import OfflineIndicator from "@/components/OfflineIndicator";

export const metadata: Metadata = {
  title: "মনবন্ধু • ট্র্যাকার (ANC & টিকাদান)",
  description: "মাতৃত্বকালীন সেবা ও শিশুর টিকাদান সময়সূচি—লোকাল ডিভাইসে নিরাপদে সংরক্ষিত।",
};

export default function Page() {
  return (
    <Container>
      <div className="mt-6 mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">মাতৃ ও শিশু স্বাস্থ্য ট্র্যাকার</h1>
        <OfflineIndicator />
      </div>
      <TrackerManager />
      <div id="facility-map" className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">নিকটস্থ স্বাস্থ্যসেবা</h2>
        <a
          href="https://www.google.com/maps/search/hospitals+near+me"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          মানচিত্রে সকল হাসপাতাল দেখুন
        </a>
        <div className="rounded-md border p-6 bg-neutral-50 dark:bg-neutral-900">
          <h3 className="font-medium mb-3">প্রধান হাসপাতালসমূহ:</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://maps.app.goo.gl/rDvuCSy3w3tvQQng6" target="_blank" rel="noopener" className="text-primary-600 dark:text-primary-400 hover:underline">
                🏥 ইস্টার্ন মেডিকেল কলেজ এন্ড হাসপাতাল
              </a>
            </li>
            <li>
              <a href="https://maps.app.goo.gl/B5pXDFqckcuHgDD98" target="_blank" rel="noopener" className="text-primary-600 dark:text-primary-400 hover:underline">
                🏥 ময়নামতি ক্যান্টনমেন্ট জেনারেল হসপিটাল
              </a>
            </li>
            <li>
              <a href="https://maps.app.goo.gl/namGpAqUzY8W7yJN9" target="_blank" rel="noopener" className="text-primary-600 dark:text-primary-400 hover:underline">
                🏥 সম্মিলিত সামরিক হাসপাতাল (সিএমএইচ), কুমিল্লা
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
