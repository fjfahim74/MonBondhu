import { ReactNode } from 'react';

export function SectionHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
      {children && <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">{children}</p>}
    </div>
  );
}
