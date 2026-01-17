import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'মনবন্ধু',
  description: 'মানসিক সুস্বাস্থ্য ও কমিউনিটি হেলথ সহায়তার জন্য একটি সহজ অ্যাপ',
  applicationName: 'মনবন্ধু',
  keywords: ['মনবন্ধু', 'Mental Health', 'Bangladesh', 'Community Health', 'মুড চেক-ইন'],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
  <html lang="bn" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-earth-50 via-white to-primary-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors">
        <NavBar />
        <main className="pt-16 pb-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
