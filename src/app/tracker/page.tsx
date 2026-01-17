import type { Metadata } from "next";
import { Container } from "@/components/Container";
import TrackerManager from "@/components/TrackerManager";
import FacilityMap from "@/components/FacilityMap";
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
        <h2 className="text-lg font-semibold">নিকটস্থ স্বাস্থ্যসেবা মানচিত্র</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">আপনার অনুমতি পেলে লোকেশন ব্যবহার করে কাছের সেবাস্থল দেখায়। ডেটা শুধুমাত্র আপনার ডিভাইসে ব্যবহৃত হয়।</p>
        <FacilityMap height={400} />
      </div>
    </Container>
  );
}
