"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// @ts-ignore - Dynamic import path resolution
const FacilityMap = dynamic(() => import("@/components/FacilityMap"), {
    ssr: false,
    loading: () => <div className="h-[400px] rounded-md border flex items-center justify-center text-neutral-500">মানচিত্র লোড হচ্ছে...</div>
}) as any;

export default function FacilityMapClient({ height = 400 }: { height?: number }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="h-[400px] rounded-md border flex items-center justify-center text-neutral-500">মানচিত্র লোড হচ্ছে...</div>;
    }

    return <FacilityMap height={height} />;
}
