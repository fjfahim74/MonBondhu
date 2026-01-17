"use client";
import { useState } from 'react';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/Button';

export default function LoginPage() {
  const [status, setStatus] = useState<string | null>(null);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setStatus('Logging in...');
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (res.ok) setStatus('Success (mock)!'); else setStatus(json?.error?.message ?? 'Failed');
  }
  return (
    <Container className="max-w-sm">
      <SectionHeader title="Login">Enter credentials to continue (mock demo).</SectionHeader>
      <form onSubmit={onSubmit} className="max-w-sm space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email</label>
          <input id="email" name="email" type="email" required className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm mb-1">Password</label>
          <input id="password" name="password" type="password" required minLength={6} className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" />
        </div>
        <Button type="submit" className="btn-primary">Login</Button>
      </form>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </Container>
  );
}
