"use client";
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { useState } from 'react';
import { Button } from '@/components/Button';

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setStatus('Sending...');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (res.ok) setStatus('Message sent!');
    else setStatus(json?.error?.message ?? 'Failed');
    form.reset();
  }
  return (
    <Container className="max-w-2xl">
      <SectionHeader title="Contact">Send a message using the form below.</SectionHeader>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm mb-1">Name</label>
          <input id="name" name="name" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" required minLength={2} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email</label>
          <input id="email" name="email" type="email" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" required />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm mb-1">Message</label>
          <textarea id="message" name="message" className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2" rows={5} required minLength={10} />
        </div>
        <Button type="submit" className="btn-primary">Send</Button>
      </form>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </Container>
  );
}
