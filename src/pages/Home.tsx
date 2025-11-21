
import { useState } from 'react';
import { MainEventBanner } from '@/components/MainEventBanner';
import { MasterPickSection } from '@/components/MasterPick';
import { ThemeRecommendation } from '@/components/ThemeRecommend';
import { Membership } from '@/db/bannerList';
import type { Wine } from '@/db/type/wine';

type HomeProps = {
  onStart?: () => void;
};

// 위치별로 필터
const topBanners = Membership.filter(
  (b) => b.placement === 'home.top' && b.isActive
);
const bottomBanners = Membership.filter(
  (b) => b.placement === 'home.bottom' && b.isActive
);

export default function Home({ onStart }: HomeProps) {
  // 좋아요 상태는 Home에서 단일 관리
  const [likedWineIds, setLikedWineIds] = useState<Wine['id'][]>([]);

  const handleToggleLike = (id: Wine['id']) => {
    setLikedWineIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* 배경 섹션 */}
      <section className="h-[100svh] flex items-center justify-center text-black">
        {/* 메인 640px 기준 배경 컨테이너 */}
        <div className="w-[640px] max-w-[90vw] h-full bg-[url('/images/mainbg.jpg')] bg-cover bg-center flex items-center justify-center">
          {/* 콘텐츠 박스: 절대포지션 없이 중앙정렬 */}
          <div className="flex flex-col items-center justify-center text-center h-full py-[clamp(40px,8vh,96px)]">
            {/* 타이틀 */}
            <p id="mypick-heading" data-animate="mypick" className="font-mypick text-picktit font-nomal select-none wio-hero-title">
              My Pick
            </p>

            {/* 서브타이틀: 메인 640px 기준 80% */}
            <p className="w-[80%] max-w-[512px] text-h2 font-medium wio-hero-subtitle">
              수 많은 와인 속,<br/>당신만의 보석을 찾아보세요
            </p>

            <button
              type="button"
              onClick={onStart} // 여기서 
              className="w-[80%] max-w-[512px] inline-flex items-center justify-center
                bg-brand-accent text-white text-findtit px-4 py-5 min-h-[44px] shadow-md
                hover:opacity-95 active:opacity-90 transition wio-hero-cta"
              aria-label="내 취향 찾기 모달 열기"
              >
              내 취향 찾기
              </button>
          </div>
        </div>
      </section>
      {/* 실제 컨텐츠 시작 */}
      <div className="bg-white text-black p-4 sm:pt-6 sm:px-6 md:p-8">
         {/* 멤버십 이벤트 배너 */}
        <MainEventBanner banners={topBanners} />
        <MasterPickSection 
            likedWineIds={likedWineIds}
            onToggleLike={handleToggleLike}
          />
        <ThemeRecommendation
          likedWineIds={likedWineIds} 
          onToggleLike={handleToggleLike} 
        />
        {/* 하단 배너(Premium) */}
        <MainEventBanner banners={bottomBanners} />
      </div>
    </>
  );
}
