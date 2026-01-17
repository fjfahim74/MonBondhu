import { feed } from '@/lib/mockFeed';
import { FeedCard } from '@/components/FeedCard';
import { Sidebar } from '@/components/Sidebar';
import { RightRail } from '@/components/RightRail';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <section className="py-12 flex flex-col gap-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-8">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 text-sm font-medium border border-primary-200 dark:border-primary-800">
              <span className="text-lg">🌿</span>
              মানসিক সুস্বাস্থ্য সহায়তা
            </span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary-700 to-primary-900 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
            মনবন্ধু - আপনার মনের সঙ্গী
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            গ্রামীণ বাংলাদেশের জন্য ডিজাইন করা একটি সম্পূর্ণ মানসিক স্বাস্থ্য প্ল্যাটফর্ম। 
            আপনার মুড ট্র্যাক করুন, সহায়তা পান, এবং কমিউনিটি হেলথ ওয়ার্কারদের সাথে সংযুক্ত হন।
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/checkin" className="btn-primary text-base">
              মুড চেক-ইন করুন
            </Link>
            <Link href="/help" className="btn-accent text-base">
              সহায়তা চান
            </Link>
            <Link href="/tracker" className="btn-secondary text-base">
              স্বাস্থ্য ট্র্যাক করুন
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          <Sidebar />
          <div className="flex-1 space-y-4">
            <div className="card p-6">
              <h2 className="text-2xl font-semibold mb-4 text-primary-700 dark:text-primary-400">কমিউনিটি ফিড</h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                আপনার কমিউনিটির সাথে মানসিক স্বাস্থ্য সম্পর্কিত আপডেট, টিপস এবং তথ্য শেয়ার করুন।
              </p>
            </div>
            {feed.map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </div>
          <RightRail />
        </div>
      </section>
    </div>
  );
}
