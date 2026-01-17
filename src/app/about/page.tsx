import { Container } from '@/components/Container';
import { SectionHeader } from '@/components/SectionHeader';

export default function AboutPage() {
  return (
    <Container className="max-w-3xl">
      <SectionHeader title="About">This is a minimal, batteries-included Next.js starter.</SectionHeader>
      <p className="text-neutral-700 dark:text-neutral-300 leading-7">
        It demonstrates a clean structure with Tailwind, testing, and basic content. Extend it with your
        own features—auth, database, CMS, and more.
      </p>
    </Container>
  );
}
