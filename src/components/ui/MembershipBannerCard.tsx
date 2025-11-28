// src/components/ui/MembershipBannerCard.tsx
import type { Banner } from '@/db/type/banner';

export function MembershipBannerCard({ banner }: { banner: Banner }) {
 return (
   <a
      href={banner.href ?? '#'}
      className="
        relative flex w-full max-w-[640px]
        h-[180px] sm:h-[220px] 
        overflow-hidden rounded-2xl bg-[#1E1913] text-white 
        px-5 sm:px-6 mx-auto
      "
      style={{
        width: '100%',
        minWidth: '340px',
        maxWidth: '640px',
      }}
    >
      {/* 1. 이미지 영역 (좌측) - flex-shrink-0으로 공간 확보 */}
      <div className="relative flex flex-shrink-0 w-1/2 items-center justify-start">
        {/* 선물 박스 이미지 */}
        <img
          src={banner.image}
          alt={banner.title}
          className="relative h-full object-contain -translate-x-5" // 왼쪽으로 살짝 이동
        />
        {/* 뱃지 이미지 (for you) */}
        {banner.badgeImage && (
          <img
            src={banner.badgeImage}
            alt=""
            className="
              absolute
              bottom-12 right-0 // 이미지 우측 상단에 배치
              max-h-[60px] w-auto
            "
          />
        )}
      </div>

      {/* 2. 텍스트 영역 (우측) - flex-1로 남은 공간 채우고 좌측 정렬 */}
      <div className="flex flex-col justify-center flex-1 pl-4">
        <h3 className="text-4xl sm:text-6xl font-extrabold leading-tight">
          {banner.title}
        </h3>
        {banner.subtitle && (
          <p className="mt-2 text-base sm:text-[20px] text-[#b4b4b4]">
            {banner.subtitle}
          </p>
        )}
      </div>

      {/* 3. CTA - 하단 오른쪽 라인 버튼 (Absolute) */}
      {banner.ctaLabel && (
        <span className="absolute bottom-4 right-5 inline-flex items-center text-xs sm:text-sm font-medium">
          {banner.ctaLabel}
          <svg 
            width="140"
            height="15" 
            viewBox="0 0 442 90" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className='text-white' 
          >
            <path d="M352.333 1L440.166 88.8333" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 88.8334H440.167" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
    </a>
  );
}