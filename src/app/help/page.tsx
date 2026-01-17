import type { Metadata } from "next";
import { Container } from "@/components/Container";
import HelpRequestForm from "@/components/HelpRequestForm";
import OfflineIndicator from "@/components/OfflineIndicator";

export const metadata: Metadata = {
  title: "মনবন্ধু • গোপন সহায়তা অনুরোধ",
  description: "নাম/ফোন ছাড়াই, সম্মতি নিয়ে গোপনভাবে সহায়তার অনুরোধ পাঠান।",
};

export default function Page() {
  return (
    <Container>
      <div className="mt-6 mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">গোপন সহায়তা অনুরোধ</h1>
        <OfflineIndicator />
      </div>
      <HelpRequestForm />
    </Container>
  );
}
