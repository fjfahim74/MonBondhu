import type { Metadata } from "next";
import { Container } from "@/components/Container";
import ChwDirectory from "@/components/ChwDirectory";
import OfflineIndicator from "@/components/OfflineIndicator";

export const metadata: Metadata = {
  title: "মনবন্ধু • স্বেচ্ছাসেবী স্বাস্থ্যকর্মী নির্দেশিকা",
  description: "কমিউনিটি স্বাস্থ্যকর্মী ও প্রশিক্ষিত সহায়তাকারীর খোঁজ—ফিল্টার ও দক্ষতা অনুযায়ী।",
};

export default function Page() {
  return (
    <Container>
      <div className="mt-6 mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">স্বেচ্ছাসেবী স্বাস্থ্যকর্মী নির্দেশিকা</h1>
        <OfflineIndicator />
      </div>
      <ChwDirectory />
    </Container>
  );
}
