// src/components/ui/PhotoBannerCard.tsx
import type { Banner } from '@/db/type/banner';

export function PhotoBannerCard({ banner }: { banner: Banner }) {
  return (
    <a
      href={banner.href ?? '#'}
      className="
        relative block w-full max-w-[640px]
        h-[180px] sm:h-[220px] 
        overflow-hidden rounded-2xl mx-auto text-white"
      style={{
        width: '100%',
        minWidth: '340px', // 340px 이하로 줄어들지 않도록 설정
        maxWidth: '640px', // 기본 너비 제한
      }}
    >
      {/* 백그라운드 이미지 */}
      <img
        src={banner.image}
        alt={banner.title}
        className="absolute inset-0 h-full w-full object-cover" // 이미지가 전체를 덮도록
      />

      {/* 텍스트 오버레이 */}
      <div 
        className="
          absolute inset-0 flex flex-col justify-between 
          p-5 sm:p-6 // 패딩 반응형
          bg-gradient-to-t from-black/70 via-black/20 to-transparent
        "
      >
        {/* 상단 텍스트 영역 */}
        <div>
          <h3 className="text-4xl sm:text-5xl font-normal italic drop-shadow-lg"> 
            {banner.title}
          </h3>
          {banner.subtitle && (
            <p className="mt-2 max-w-[260px] text-base sm:text-lg font-medium text-white/90 drop-shadow-md"> 
              {banner.subtitle}
            </p>
          )}
        </div>

        {/* 하단 CTA 영역 */}
        {banner.ctaLabel && (
          <span className="inline-flex flex-col items-start w-fit">
            {/* CTA 텍스트 */}
            <span className="text-base sm:text-lg font-medium leading-none mb-1">
              {banner.ctaLabel}
            </span>
            <svg 
              // 1. width와 height를 원하는 작은 크기(예: 100x10)로 조정
              width="140" 
              height="15" 
              // 2. viewBox는 원본을 유지 (442x90)하여 path가 잘리지 않도록 함
              viewBox="0 0 442 90" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className='text-white'
            >
              {/* path는 그대로 유지 (큰 좌표를 가지지만, SVG 캔버스에 맞춰 축소되어 보임) */}
              <path d="M352.333 1L440.166 88.8333" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 88.8334H440.167" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </div>
    </a>
  );
}