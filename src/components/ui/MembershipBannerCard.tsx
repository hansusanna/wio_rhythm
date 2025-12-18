//components/ui/MembershipBannerCard.tsx
import type { Banner } from '@/db/type/banner';
import LongArrowIcon from '../icon/LongArrowIcon';

export function MembershipBannerCard({ banner }: { banner: Banner }) {
 return (
   <a
      href={banner.href ?? '#'}
      className="relative flex w-full h-full overflow-hidden rounded-banner bg-brand-bannerDark text-white 
        px-2 md:px-5 mx-auto">
       {/* 텍스트 영역 좌측 */}
      <div className="flex flex-col justify-center text-left mx-card my-4 md:my-8 w-full">
        <h3 className="text-4xl md:text-6xl font-extrabold leading-tight">
          {banner.title}
        </h3>
        {banner.subtitle && (
          <p className="text-xl md:text-3xl text-ui-textMuted font-bold">
            {banner.subtitle}
          </p>
        )}
        <div className="relative pt-4 md:pt-6 flex flex-row">
          {/* 선물 박스 이미지 */}
          <img
            src={banner.image}
            alt={banner.title}
            className="w-auto max-h-20 md:max-h-32 pb-1 object-contain" 
          />
          {/* 뱃지 이미지 (for you) */}
          {banner.badgeImage && (
            <img
              src={banner.badgeImage}
              alt=""
              className="w-auto max-h-12 md:max-h-20 object-contain -ml-2"
            />
          )}
        </div>
        <div className="flex flex-col items-end -mt-10">
          {banner.ctaLabel && (
            <>
            <span className="text-lg md:text-xl font-medium pr-8 pb-0.5 md:pr-16 leading-none z-10">
              {banner.ctaLabel}
            </span>
            <LongArrowIcon className="-mt-2 md:-mt-3 w-24 h-auto md:w-36 text-white"/>
          </>
        )}
        </div>
      </div>
    </a>
  );
}