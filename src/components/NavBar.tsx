"use client";
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import VoiceAssistant from '@/components/VoiceAssistant';

export function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/95 dark:bg-neutral-950/95 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
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
          <Link href="/" className="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
            হোম
          </Link>
          <Link href="/checkin" className="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
            </svg>
            মুড চেক-ইন
          </Link>
          <Link href="/tracker" className="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18 17V9M13 17V5M8 17v-3" />
            </svg>
            ট্র্যাকার
          </Link>
          <Link href="/help" className="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            সহায়তা
          </Link>
          <Link href="/chw" className="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            স্বাস্থ্য কর্মী
          </Link>
          <Link href="/tips" className="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            পরামর্শ
          </Link>
          <VoiceAssistant />
          <ThemeToggle />
        </div>
      </nav>
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 hover:text-primary-600 py-2 transition-colors font-medium">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <path d="M9 22V12h6v10" />
            </svg>
            হোম
          </Link>
          <Link href="/checkin" onClick={() => setOpen(false)} className="flex items-center gap-2 hover:text-primary-600 py-2 transition-colors font-medium">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
            </svg>
            মুড চেক-ইন
          </Link>
          <Link href="/tracker" onClick={() => setOpen(false)} className="flex items-center gap-2 hover:text-primary-600 py-2 transition-colors font-medium">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18 17V9M13 17V5M8 17v-3" />
            </svg>
            ট্র্যাকার
          </Link>
          <Link href="/help" onClick={() => setOpen(false)} className="flex items-center gap-2 hover:text-primary-600 py-2 transition-colors font-medium">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            সহায়তা
          </Link>
          <Link href="/chw" onClick={() => setOpen(false)} className="flex items-center gap-2 hover:text-primary-600 py-2 transition-colors font-medium">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
            স্বাস্থ্য কর্মী
          </Link>
          <Link href="/tips" onClick={() => setOpen(false)} className="flex items-center gap-2 hover:text-primary-600 py-2 transition-colors font-medium">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            পরামর্শ
          </Link>
          <div className="flex items-center gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <VoiceAssistant />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
