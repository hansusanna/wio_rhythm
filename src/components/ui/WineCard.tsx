// src/components/ui/WineCard.tsx
import type { Wine } from '@/db/type/wine';
import { countryLabel, regionLabel, typeLabel } from '@/db/wineLabel';
import type { LabelType } from '@/db/type/wine';

type WineCardProps = {
  wine: Wine;
  isLiked?: boolean;
  onToggleLike?: (id: Wine['id']) => void;
  className?: string;
  showPrice?: boolean;
};

const labelTextMap: Record<LabelType, string> = {
  NEW: 'NEW',
  EVENT: 'EVENT',
  BEST: 'BEST',
};

const labelColorMap: Record<LabelType, string> = {
  NEW: 'bg-semantic-new',
  EVENT: 'bg-semantic-event-light',
  BEST: 'bg-semantic-best-light',
};

const DEMO_PRODUCT_URL =
  'https://qhqhchlrh.cafe24.com/product/%EB%A1%9C%EC%B9%B4-%EB%84%A4%EA%B7%B8%EB%9D%BC/254/category/53/display/1/';

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

export function WineCard({
  wine,
  isLiked = false,
  onToggleLike,
  className,
  showPrice = true,
}: WineCardProps) {
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
   
  const href = DEMO_PRODUCT_URL;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      aria-label={`${nameKo} 카페24 상품 상세로 이동`}
    >
    <article className={`flex flex-col ${className}`}>
      <div className="relative bg-ui-cardBg p-5 pb-0">
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
                className={`inline-block px-1 leading-relaxed text-[11px] font-normal text-black text-center ${labelColorMap[label]}`}
              >
                {labelTextMap[label] ?? label}
              </span>
            ))}
          </div>

          {/* SVG 하트 버튼 */}
          {onToggleLike && (
            <button
              type="button"
              onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLikeClick();
            }}
              className="ml-2 leading-none" 
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
          )}
        </div>
      </div>
      {/* 텍스트 영역 */}
      <div className="flex flex-1 flex-col bg-white p-3 mt-1">
        {/* 상단 카테고리(나라/타입) */}
        <p className="text-sm text-ui-gray font-normal leading-none pb-2">
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
        <h3 className="truncate text-lg font-normal text-black leading-none pb-2">
          {nameKo}
        </h3>

        {/* 영문 이름 */}
        {nameEn && (
          <p className="truncate text-sm text-black font-en leading-none pb-2.5">{nameEn}</p>
        )}

        {/* 가격 영역 */}
        {showPrice && (
          <div className="flex items-baseline gap-2 leading-non pb-2.5">
            {/* 할인 있을 때만 정가 취소선 */}
            {hasDiscount && (
              <span className="text-sm text-ui-gray line-through">
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
        )}

       {(rating || reviewCount || stockLabel) && (
          <div className="flex items-center gap-2 leading-none">           
            {/* 평점 / 리뷰 */}
            {(rating || reviewCount) && (
              <div className="flex items-center gap-1 text-sm text-ui-gray leading-none">
                {rating && (
                  <>
                    <span className="text-[13px] text-amber-400 leading-none">★</span>
                    <span>{rating.toFixed(1)}</span>
                  </>
                )}
                {reviewCount !== undefined && (
                  <span className="leading-none">
                    ({reviewCount.toLocaleString()})
                  </span>
                )}
              </div>
            )}
            {/* 매진임박 뱃지*/}
            {stockLabel && (
              <div> {/* 부모의 gap-2로 인해 자동 간격 조절됨 */}
                <span className="rounded-md bg-semantic-stock px-2 py-1 text-xs font-bold text-white">
                  {stockLabel}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
    </a>
  );
}
