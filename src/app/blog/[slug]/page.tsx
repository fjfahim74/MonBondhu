import { getPost, listPosts } from '@/lib/posts';
import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return listPosts().map(p => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getPost(slug);
  if (!result) return notFound();
  const { meta, content } = result;
  return (
    <Container>
      <SectionHeader title={meta.title}>{meta.summary}</SectionHeader>
      <article className="prose dark:prose-invert max-w-none">
        <pre className="whitespace-pre-wrap">{content}</pre>
      </article>
    </Container>
  );
}
