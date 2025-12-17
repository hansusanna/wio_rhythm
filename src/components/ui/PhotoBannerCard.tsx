// src/components/ui/PhotoBannerCard.tsx
import type { Banner } from '@/db/type/banner';
import LongArrowIcon from '../icon/LongArrowIcon';

export function PhotoBannerCard({ banner }: { banner: Banner }) {
  const href = banner.href ?? '#';
  const isExternal = href.startsWith('http');

  return (
    <a href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="
        relative block w-full max-w-[640px]
        h-[250px] md:h-[300px]
        overflow-hidden rounded-banner mx-auto text-white group"
    >
      {/* 백그라운드 이미지 */}
      <img
        src={banner.image}
        alt={banner.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex flex-col justify-between p-card md:p-lg bg-gradient-to-t from-black/80 via-black/30 to-transparent">
        <div>
          <h3 className="font-mypick text-4xl md:text-6xl font-normal italic leading-none">
            {banner.title}
          </h3>
          {banner.subtitle && (
            <p className="mt-sm text-base md:text-xl font-normal">
              {banner.subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col items-start mt-auto">
          {banner.ctaLabel && (
            <div className="flex flex-col">
              <span className="text-base md:text-xl font-medium pl-1 leading-none z-10">
                {banner.ctaLabel}
              </span>
              <LongArrowIcon
                color="white"
                className="w-24 md:w-36 ml-md -mt-sm md:-mt-3"
              />
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
