// src/components/sections/MainEventBanner.tsx
import type { Banner } from '@/db/type/banner';
import { MembershipBannerCard } from '@/components/ui/MembershipBannerCard';
import { PhotoBannerCard } from '@/components/ui/PhotoBannerCard';

type Props = {
  banners: Banner[];
};

export function MainEventBanner({ banners }: Props) {
  if (!banners.length) return null;

  return (
    <section className="my-8 sm:my-10">
      <div className="flex flex-col gap-4">
        {banners.map((banner) =>
          banner.variant === 'photo' ? (
            <PhotoBannerCard key={banner.id} banner={banner} />
          ) : (
            <MembershipBannerCard key={banner.id} banner={banner} />
          )
        )}
      </div>
    </section>
  );
}
