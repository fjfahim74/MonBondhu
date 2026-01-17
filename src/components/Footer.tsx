import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800 bg-earth-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-bold text-primary-700 dark:text-primary-500 text-xl flex items-center gap-2 mb-3">
              <span className="text-2xl">🌿</span>
              <span>মনবন্ধু</span>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2 max-w-md">
              গ্রামীণ বাংলাদেশের জন্য মানসিক স্বাস্থ্য ও কমিউনিটি সহায়তা প্ল্যাটফর্ম। 
              আপনার মন ভালো রাখতে আমরা আছি পাশে।
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-4 max-w-md">
              মনবন্ধু একটি অলাভজনক উদ্যোগ যা গ্রামীণ বাংলাদেশে মানসিক স্বাস্থ্য সেবা সহজলভ্য করতে কাজ করছে। 
              আমরা বিশ্বাস করি প্রত্যেকেরই মানসিক স্বাস্থ্য সহায়তা পাওয়ার অধিকার রয়েছে।
            </p>
            <div className="flex gap-3">
              <a href="tel:09638000000" className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 flex items-center justify-center hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors" aria-label="Phone">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </a>
              <a href="mailto:support@monbondhu.org" className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 flex items-center justify-center hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors" aria-label="Email">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">সেবাসমূহ</h3>
            <nav className="flex flex-col gap-2" aria-label="Service links">
              <Link href="/checkin" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">মুড চেক-ইন</Link>
              <Link href="/help" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">সহায়তা</Link>
              <Link href="/tracker" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">ট্র্যাকার</Link>
              <Link href="/tips" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">পরামর্শ</Link>
            </nav>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">তথ্য</h3>
            <nav className="flex flex-col gap-2" aria-label="Info links">
              <Link href="/chw" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">কর্মী</Link>
              <a href="mailto:support@monbondhu.org" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">যোগাযোগ</a>
              <a href="tel:09638000000" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">হটলাইন</a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} মনবন্ধু। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">গোপনীয়তা নীতি</Link>
            <Link href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">শর্তাবলী</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
