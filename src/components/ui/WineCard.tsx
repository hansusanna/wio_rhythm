// src/components/ui/WineCard.tsx
import type { Wine } from '@/db/type/wine';
import { regionLabel, typeLabel } from '@/db/wineLabel';
import type { LabelType } from '@/db/type/wine';

type WineCardProps = {
  wine: Wine;
  isLiked?: boolean;
  onToggleLike?: (id: Wine['id']) => void;
};

const labelTextMap: Record<LabelType, string> = {
  NEW: 'NEW',
  EVENT: 'EVENT',
  BEST: 'BEST',
};

export function WineCard({ wine, isLiked = false, onToggleLike }: WineCardProps) {
  const {
    id,
    image,
    nameKo,
    nameEn,
    originalPrice,
    salePrice,
    labels,
    rating,
    reviewCount,
    region,
    type,
  } = wine;

  const hasOriginal = typeof originalPrice === 'number';
  const hasSale = typeof salePrice === 'number';

  const hasDiscount =
    hasOriginal && hasSale && (salePrice as number) < (originalPrice as number);

  const discountPercent =
    hasDiscount && originalPrice
      ? Math.round(((originalPrice - salePrice!) / originalPrice) * 100)
      : null;

  const handleLikeClick = () => {
    if (!onToggleLike) return;
    onToggleLike(id);
  };

  return (
    <article className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      {/* 상단 라벨 & 찜버튼 */}
      <div className="mb-2 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          {labels?.map((label) => (
            <span
              key={label}
              className="inline-block rounded-sm px-2 py-0.5 text-[10px] font-semibold text-white"
              style={{
                backgroundColor:
                  label === 'NEW'
                    ? '#F4B37D'
                    : label === 'EVENT'
                    ? '#6096FF'
                    : '#F25C7F',
              }}
            >
              {labelTextMap[label] ?? label}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={handleLikeClick}
          className="ml-2 text-xl leading-none text-gray-400 hover:text-red-500"
          aria-label="찜하기"
        >
          {isLiked ? '❤' : '🤍'}
        </button>
      </div>

      {/* 와인 이미지 */}
      <div className="mb-3 flex items-center justify-center">
        <img
          src={image}
          alt={nameKo}
          className="h-40 w-auto object-contain"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-1 flex-col gap-1">
        {/* 상단 카테고리 (지역 / 타입) */}
        <p className="text-xs text-gray-500">
          {region && type && (
            <>
              {regionLabel(region)} / {typeLabel(type)}
            </>
          )}
        </p>

        {/* 국문 이름 */}
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {nameKo}
        </h3>

        {/* 영문 이름 */}
        {nameEn && (
          <p className="text-xs text-gray-400 italic">{nameEn}</p>
        )}

        {/* 가격 영역 */}
        <div className="mt-2 flex items-baseline gap-2">
          {hasOriginal && (
            <span className="text-xs text-gray-400 line-through">
              {originalPrice!.toLocaleString()}원
            </span>
          )}

          {hasDiscount && discountPercent !== null && (
            <span className="text-xs font-semibold text-red-500">
              -{discountPercent}%
            </span>
          )}

          {hasSale && (
            <span className="text-base font-bold text-gray-900">
              {salePrice!.toLocaleString()}원
            </span>
          )}
        </div>

        {/* 평점 / 리뷰 */}
        {(rating || reviewCount) && (
          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            {rating && (
              <>
                <span className="text-[13px] text-amber-400">★</span>
                <span>{rating.toFixed(1)}</span>
              </>
            )}
            {reviewCount !== undefined && (
              <span className="text-gray-400">
                ({reviewCount.toLocaleString()})
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
