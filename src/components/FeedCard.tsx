import { FeedItem } from '@/lib/mockFeed';
import { Avatar } from '@/components/Avatar';

export function FeedCard({ item }: { item: FeedItem }) {
  return (
    <article className="card p-4">
      <header className="flex items-center gap-3 mb-3">
        <Avatar name={item.author} />
        <div>
          <div className="font-medium leading-tight">{item.author}</div>
          <div className="text-xs text-neutral-500">{item.time}</div>
        </div>
      </header>
      <p className="text-sm leading-relaxed">{item.content}</p>
      <footer className="mt-4 flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
        <button className="btn-secondary px-3 py-1">Like</button>
        <button className="btn-secondary px-3 py-1">Comment</button>
        <button className="btn-secondary px-3 py-1">Share</button>
      </footer>
    </article>
  );
}
