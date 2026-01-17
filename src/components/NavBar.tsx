"use client";
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import VoiceAssistant from '@/components/VoiceAssistant';

export function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-white/90 dark:bg-neutral-950/90 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16" aria-label="Main navigation">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-bold text-primary-700 dark:text-primary-500 text-xl flex items-center gap-2" aria-label="মনবন্ধু হোম">
            <span className="text-2xl">🌿</span>
            <span>মনবন্ধু</span>
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(o => !o)}
            className="md:hidden rounded-lg p-2 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/checkin" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">মুড চেক-ইন</Link>
          <Link href="/tracker" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">ট্র্যাকার</Link>
          <Link href="/help" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">সহায়তা</Link>
          <Link href="/chw" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">স্বাস্থ্য কর্মী</Link>
          <Link href="/tips" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">পরামর্শ</Link>
          <VoiceAssistant />
          <ThemeToggle />
          <Link href="/login" className="btn-primary text-sm">লগইন</Link>
        </div>
      </nav>
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
          <Link href="/checkin" onClick={() => setOpen(false)} className="hover:text-primary-600 py-2 transition-colors font-medium">মুড চেক-ইন</Link>
          <Link href="/tracker" onClick={() => setOpen(false)} className="hover:text-primary-600 py-2 transition-colors font-medium">ট্র্যাকার</Link>
          <Link href="/help" onClick={() => setOpen(false)} className="hover:text-primary-600 py-2 transition-colors font-medium">সহায়তা</Link>
          <Link href="/chw" onClick={() => setOpen(false)} className="hover:text-primary-600 py-2 transition-colors font-medium">স্বাস্থ্য কর্মী</Link>
          <Link href="/tips" onClick={() => setOpen(false)} className="hover:text-primary-600 py-2 transition-colors font-medium">পরামর্শ</Link>
          <div className="flex items-center gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <VoiceAssistant />
            <ThemeToggle />
          </div>
          <Link href="/login" onClick={() => setOpen(false)} className="btn-primary w-full">লগইন</Link>
        </div>
      )}
    </header>
  );
}
