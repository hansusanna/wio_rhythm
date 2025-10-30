// src/components/ui/WineCard.tsx
import type { Wine } from '@/db/type/wine';
import { useMemo } from 'react';

type Props = {
  wine: Wine;
  onClick?: (wine: Wine) => void;
};

export function WineCard({ wine, onClick }: Props) {
  const priceStr = useMemo(() => {
    // 혹시 price가 문자열로 올 때 안전 처리
    const n = typeof wine.price === 'number' ? wine.price : Number(wine.price) || 0;
    return n.toLocaleString();
  }, [wine.price]);

  const base = import.meta.env.BASE_URL;
  const imgSrc = wine.image.startsWith('http')
    ? wine.image
    : `${base}${wine.image.replace(/^\/+/, '')}`;

  return (
    <article
      className="rounded-xl bg-white p-3 shadow-sm border hover:shadow-md transition"
      onClick={onClick ? () => onClick(wine) : undefined}
      role={onClick ? 'button' : undefined}
    >
      <div className="aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100">
        <img src={imgSrc} alt={wine.name} className="h-full w-full object-cover" />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-neutral-900 line-clamp-2">
        {wine.name}
      </h3>
      <div className="mt-1 text-sm text-neutral-600">{priceStr} 원</div>
    </article>
  );
}
