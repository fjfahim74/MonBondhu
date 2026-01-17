import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="space-y-4 sticky top-20">
        {/* Quick Actions */}
        <div className="card p-4">
          <h3 className="font-semibold mb-3 text-primary-700 dark:text-primary-400">দ্রুত অ্যাক্সেস</h3>
          <nav className="space-y-2" aria-label="Quick actions">
            <Link href="/checkin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors group">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
              </svg>
              <span className="group-hover:text-primary-700 dark:group-hover:text-primary-400">মুড চেক-ইন</span>
            </Link>
            <Link href="/tracker" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors group">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18 17V9M13 17V5M8 17v-3" />
              </svg>
              <span className="group-hover:text-primary-700 dark:group-hover:text-primary-400">স্বাস্থ্য ট্র্যাকার</span>
            </Link>
            <Link href="/help" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent-50 dark:hover:bg-accent-950 transition-colors group">
              <svg className="w-5 h-5 text-accent-600 dark:text-accent-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="group-hover:text-accent-700 dark:group-hover:text-accent-400">সহায়তা পান</span>
            </Link>
            <Link href="/chw" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors group">
              <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              <span className="group-hover:text-primary-700 dark:group-hover:text-primary-400">স্বাস্থ্য কর্মী</span>
            </Link>
          </nav>
        </div>

        {/* Emergency Support */}
        <div className="card p-4 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-red-900/40 dark:to-orange-900/40 border-accent-200 dark:border-red-700">
          <h3 className="font-semibold mb-2 text-accent-900 dark:text-white">জরুরি সহায়তা</h3>
          <p className="text-sm text-accent-900 dark:text-white mb-3">
            মানসিক স্বাস্থ্য সংকটে আছেন?
          </p>
          <Link href="/help" className="btn-accent w-full text-sm !text-white dark:!text-white">
            এখনই যোগাযোগ করুন
          </Link>
        </div>
      </div>
    </aside>
  );
}
