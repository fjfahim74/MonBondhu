export interface FeedItem {
  id: string;
  author: string;
  content: string;
  time: string;
}

export const feed: FeedItem[] = [
  {
    id: '1',
    author: 'Alex Johnson',
    content: 'Just launched a new Next.js project with Tailwind! Loving the DX and performance.',
    time: '2h',
  },
  {
    id: '2',
    author: 'Priya Singh',
    content: 'Dark mode toggle wired up with class strategy and localStorage persistence. Clean and simple.',
    time: '5h',
  },
  {
    id: '3',
    author: 'Diego Martinez',
    content: 'Tip: Use zod schemas on both client and server to keep validation consistent.',
    time: '1d',
  },
];
