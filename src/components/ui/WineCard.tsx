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
  disableLink?: boolean; // 링크 비활성화 옵션
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
  disableLink = false, // 링크 비활성화 기본값 false
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

  const stockCount = stockLabel?.match(/\d+/)?.[0];
  const mobileStockText = stockCount
  ? `마지막 ${stockCount}병`
  : stockLabel ?? '';

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
  // 공통 내부 컨텐츠 (Article)
  const CardContent = (
    <article className={`flex flex-col ${className}`}>
      <div className="relative bg-ui-cardBg p-sm md:p-5 pb-0">
        {/* 와인 이미지 */}
        <div className="relative mb-3 flex items-center justify-center">
          <img
            src={image}
            alt={nameKo}
            className="h-44 md:h-64 w-auto object-contain"/>
        </div>
        {/* 상단 라벨 & 찜버튼 */}
        <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-2 md:p-4">
          <div className="flex flex-col gap-1">
            {labels?.map((label) => (
            <span
                key={label}
                className={`inline-block px-1 leading-relaxed text-badge font-normal text-black text-center ${labelColorMap[label]}`}
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
        <div className="flex flex-1 flex-col bg-white p-1 md:p-2 mt-1">
          {/* 상단 카테고리(나라/타입) */}
          <p className="text-caption md:text-sm text-ui-gray font-normal pb-1">
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
          <h3 className="truncate text-base md:text-lg font-normal text-black pb-1">
            {nameKo}
          </h3>

          {/* 영문 이름 */}
          {nameEn && (
            <p className="truncate text-sm text-black font-en pb-1.5">{nameEn}</p>
          )}

          {/* 가격 영역 */}
          {showPrice && (
            // 모바일(col-세로), PC(row-가로)
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2 pb-2.5">
              
              {/* 원가 + 할인율 */}
              <div className="flex items-baseline gap-1 md:gap-2">
                {hasDiscount && (
                  <span className="text-xs md:text-sm text-ui-gray line-through">
                    {originalPrice!.toLocaleString()}원
                  </span>
                )}
                {hasDiscount && discountPercent !== null && (
                  <span className="text-xs md:text-sm font-normal text-red-500">
                    -{discountPercent}%
                  </span>
                )}
              </div>
              {/* 최종 판매가 모바일: 위 그룹 밑으로 떨어짐 / PC: 옆으로 붙음 */}
              <span className="mt-0.5 md:mt-0 text-base md:text-lg font-semibold text-black leading-none">
                {displayPrice.toLocaleString()}
                <span className="ml-1 text-sm font-normal">원</span>
              </span>
              
            </div>
          )}

        {(rating || reviewCount || stockLabel) && (
            <div className="flex items-center gap-2 leading-none">           
              {/* 평점 / 리뷰 */}
              {(rating || reviewCount) && (
                <div className="flex items-center gap-1 text-xs md:text-sm text-ui-gray leading-none">
                  {rating && (
                    <>
                      <span className="text-caption text-amber-400 leading-none">★</span>
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
                <div>
                  {/* 모바일 */}
                  <span className="whitespace-nowrap rounded-md bg-semantic-stock px-2 py-1 text-xxs font-medium text-white md:hidden">
                    {mobileStockText}
                  </span>
                  {/* md 이상 */}
                  <span className="hidden whitespace-nowrap rounded-md bg-semantic-stock px-2 py-1 text-caption font-bold text-white md:inline">
                    {stockLabel}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
  );
  // disableLink 값에 따라 태그 분기 처리
  if (disableLink) {
    return (
      <div className="block group cursor-pointer select-none">
        {CardContent}
      </div>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      aria-label={`${nameKo} 카페24 상품 상세로 이동`}
    >
      {CardContent}
    </a>
  );
}
