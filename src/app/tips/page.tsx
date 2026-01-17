import type { Metadata } from "next";
import { Container } from "@/components/Container";
import OfflineIndicator from "@/components/OfflineIndicator";
import SeasonalTips from "@/components/SeasonalTips";

export const metadata: Metadata = {
  title: "মনবন্ধু • মৌসুমি স্বাস্থ্য পরামর্শ",
  description: "বর্ষা/শীত/গ্রীষ্ম—বাংলায় সহজ, ব্যবহারিক টিপস; অফলাইনে দেখুন।",
};

export default function Page() {
  return (
    <Container>
      <div className="mt-6 mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">মৌসুমি স্বাস্থ্য পরামর্শ</h1>
        <OfflineIndicator />
      </div>
      <SeasonalTips />
    </Container>
  );
}
