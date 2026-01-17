import Image from 'next/image';

export function Avatar({ name, src, size = 40 }: { name: string; src?: string; size?: number }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const dimension = size;
  if (src) {
    return (
      <span className="inline-flex rounded-full overflow-hidden" style={{ width: dimension, height: dimension }}>
        <Image src={src} alt={name} width={dimension} height={dimension} />
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-primary text-white"
      style={{ width: dimension, height: dimension }}
      aria-label={name}
    >
      <span className="text-xs font-semibold">{initials}</span>
    </span>
  );
}
