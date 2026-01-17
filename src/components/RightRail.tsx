import Link from 'next/link';

export function RightRail() {
  return (
    <aside className="hidden xl:block w-72 shrink-0">
      <div className="space-y-4 sticky top-20">
        {/* Health Tips */}
        <div className="card p-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            <h3 className="font-semibold text-primary-700 dark:text-primary-300">আজকের পরামর্শ</h3>
          </div>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
            প্রতিদিন অন্তত ৩০ মিনিট হাঁটুন। শারীরিক ব্যায়াম মানসিক স্বাস্থ্যের উন্নতি করে।
          </p>
          <Link href="/tips" className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium">
            আরও পরামর্শ দেখুন →
          </Link>
        </div>

        {/* Support Resources */}
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <h3 className="font-semibold text-primary-700 dark:text-primary-300">সহায়তা লাইন</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">জরুরি হটলাইন</p>
              <p className="text-primary-600 dark:text-primary-400 font-semibold">০৯৬৩৮-০০০-০০০</p>
            </div>
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">মানসিক স্বাস্থ্য সহায়তা</p>
              <p className="text-primary-600 dark:text-primary-400 font-semibold">০১৭৭৭-০০০-০০০</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="card p-4">
          <h3 className="font-semibold mb-3 text-primary-700 dark:text-primary-300">আপনার অগ্রগতি</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">মুড চেক-ইন</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">০ দিন</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">পরামর্শ পড়া</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">০ টি</span>
            </div>
          </div>
          <Link href="/tracker" className="btn-secondary w-full mt-4 text-sm">
            বিস্তারিত দেখুন
          </Link>
        </div>
      </div>
    </aside>
  );
}
