"use client";
import React from "react";

export const OfflineIndicator: React.FC = () => {
  const [online, setOnline] = React.useState<boolean>(true);
  React.useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return (
    <div
      className={`rounded-md border px-3 py-1.5 text-xs inline-flex items-center gap-2 ${
        online
          ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
          : "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
      }`}
      aria-live="polite"
    >
      <span className={`inline-block h-2 w-2 rounded-full ${online ? "bg-emerald-500" : "bg-amber-500"}`} />
      {online ? "অনলাইন" : "অফলাইন — আপনার কাজগুলো সংরক্ষণ হবে এবং সংযোগ এলে পাঠানো হবে"}
    </div>
  );
};

export default OfflineIndicator;
