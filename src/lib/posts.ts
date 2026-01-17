export interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO
}

const posts: PostMeta[] = [
  { slug: 'getting-started', title: 'Getting Started', summary: 'How this starter is structured and how to extend it.', date: '2025-01-01' },
  { slug: 'design-system', title: 'Design System Outline', summary: 'Planning a lightweight design system with Tailwind.', date: '2025-02-15' },
];

export function listPosts(): PostMeta[] {
  return posts;
}

export async function getPost(slug: string): Promise<{ meta: PostMeta; content: string } | null> {
  const meta = posts.find(p => p.slug === slug);
  if (!meta) return null;
  const content = `# ${meta.title}\n\n${meta.summary}\n\n*Published:* ${meta.date}`;
  return { meta, content };
}
