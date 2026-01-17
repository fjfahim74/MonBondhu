"use client";
import dynamic from "next/dynamic";

const FacilityMap = dynamic(() => import("@/components/FacilityMap"), {
  ssr: false,
  loading: () => <div className="h-[400px] rounded-md border flex items-center justify-center text-neutral-500">মানচিত্র লোড হচ্ছে...</div>
});

export default function FacilityMapWrapper({ height = 400 }: { height?: number }) {
  return <FacilityMap height={height} />;
}
