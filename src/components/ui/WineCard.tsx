// src/components/ui/WineCard.tsx
import type { Wine } from '@/db/type/wine';
import { countryLabel, regionLabel, typeLabel } from '@/db/wineLabel';
import type { LabelType } from '@/db/type/wine';

type WineCardProps = {
  wine: Wine;
  isLiked?: boolean;
  onToggleLike?: (id: Wine['id']) => void;
  className?: string;
};

const labelTextMap: Record<LabelType, string> = {
  NEW: 'NEW',
  EVENT: 'EVENT',
  BEST: 'BEST',
};

function HeartIcon({ isLiked, className }: { isLiked: boolean; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
    className={className} 
    fill={isLiked ? 'currentColor' : 'none'} 
    stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
    </svg>
  );
}

export function WineCard({ wine, isLiked = false, onToggleLike, className }: WineCardProps) {
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
    country,
    type,
    stockLabel,
  } = wine;

  const hasOriginal = typeof originalPrice === 'number';
  const hasSale = typeof salePrice === 'number';

  const hasDiscount =
    hasOriginal && hasSale && (salePrice as number) < (originalPrice as number);
  
  const displayPrice =
  (hasSale ? salePrice : originalPrice) ?? 0;  

  const discountPercent =
    hasDiscount && originalPrice
      ? Math.round(((originalPrice - salePrice!) / originalPrice) * 100)
      : null;

  const handleLikeClick = () => {
    if (!onToggleLike) return;
    onToggleLike(id);
  };

  return (
    <article className={`flex flex-col ${className}`}>
      <div className="relative bg-[#F0F0F0] p-5 pb-0">
        {/* 와인 이미지 */}
        <div className="relative mb-3 flex items-center justify-center">
          <img
            src={image}
            alt={nameKo}
            className="h-[280px] w-auto object-contain"
          />
        </div>
        {/* 상단 라벨 & 찜버튼 */}
        <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-4">
          <div className="flex flex-col gap-1">
            {labels?.map((label) => (
              <span
                key={label}
                className="inline-block px-1 leading-relaxed text-[11px] font-normal text-black text-center"
                style={{
                  backgroundColor:
                    label === 'NEW'
                      ? '#CBAB85'
                      : label === 'EVENT'
                      ? '#B6D3EF'
                      : '#EAC9CE',
                }}
              >
                {labelTextMap[label] ?? label}
              </span>
            ))}
          </div>

          {/* SVG 하트 버튼 */}
          <button
            type="button"
            onClick={handleLikeClick}
            className="ml-2 leading-none" // 기본 스타일
            aria-label="찜하기"
          >
            <HeartIcon
              isLiked={isLiked}
              className={`h-6 w-6 ${
                isLiked
                  ? 'text-brand-accent' // 찜 되었을 때
                  : 'text-black hover:text-brand-accent' // 기본 상태
              }`}
            />
          </button>
        </div>
        
      </div>
      {/* 텍스트 영역 */}
      <div className="flex flex-1 flex-col gap-1 bg-white p-3">
        {/* 상단 카테고리(나라/타입) */}
        <p className="text-sm text-[#838383] leading-none">
          {type && (
            <>
              {country
                ? countryLabel(country)      // 나라가 있으면 나라 표시
                : region && regionLabel(region) // 없으면 기존 region 사용
              }
              {' / '}
              {typeLabel(type)}
            </>
          )}
        </p>

        {/* 국문 이름 */}
        <h3 className="line-clamp-2 text-lg font-normal text-black leading-normal">
          {nameKo}
        </h3>

        {/* 영문 이름 */}
        {nameEn && (
          <p className="text-sm text-black font-en leading-snug">{nameEn}</p>
        )}

        {/* 가격 영역 */}
        <div className="mt-1 flex items-baseline gap-2 leading-none">
           {/* 할인 있을 때만 정가 취소선 */}
           {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                {originalPrice!.toLocaleString()}원
              </span>
            )}
            {/* 할인 있을 때만 할인 퍼센트 */}
            {hasDiscount && discountPercent !== null && (
              <span className="text-base font-normal text-red-500 leading-none">
                -{discountPercent}%
              </span>
            )}
            {/* 항상 마지막에 실제 표시 가격 */}
            <span className="text-lg font-semibold text-black leading-none">
              {displayPrice.toLocaleString()}
              <span className="ml-1 text-sm font-normal">원</span>
            </span>
        </div>

       {(rating || reviewCount || stockLabel) && (
          <div className="mt-1 flex items-center gap-2 leading-none"> {/* mt-1.5로 통일, gap-2로 간격 */}           
            {/* 평점 / 리뷰 */}
            {(rating || reviewCount) && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
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
            {/* 매진임박 뱃지 (stockLabel이 있을 때만 렌더링) */}
            {stockLabel && (
              <div> {/* 부모의 gap-2로 인해 자동 간격 조절됨 */}
                <span className="rounded-md bg-[#8A0F29] px-2 py-1 text-xs font-bold text-white">
                  {stockLabel}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
