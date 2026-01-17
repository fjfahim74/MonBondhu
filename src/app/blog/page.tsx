import { listPosts } from '@/lib/posts';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';

export default function BlogIndexPage() {
  const posts = listPosts();
  return (
    <Container>
      <SectionHeader title="Blog">Sample mock posts (statically rendered)</SectionHeader>
      <ul className="space-y-4">
        {posts.map(p => (
          <li key={p.slug} className="group">
            <Link href={`/blog/${p.slug}`} className="text-lg font-semibold group-hover:underline">
              {p.title}
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{p.summary}</p>
            <time className="text-xs text-neutral-500" dateTime={p.date}>{p.date}</time>
          </li>
        ))}
      </ul>
    </Container>
  );
}
