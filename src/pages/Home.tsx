
import { useEffect, useState } from 'react';
import { MainEventBanner } from '@/components/MainEventBanner';
import { MasterPickSection } from '@/components/MasterPick';
import { ThemeRecommendation } from '@/components/ThemeRecommend';
import type { Wine } from '@/db/type/wine';
import type { Banner } from '@/db/type/banner';

type HomeProps = {
  onStart?: () => void;
};

export default function Home({ onStart }: HomeProps) {
  // 좋아요 상태는 Home에서 단일 관리
  const [likedWineIds, setLikedWineIds] = useState<Wine['id'][]>([]);

  const handleToggleLike = (id: Wine['id']) => {
    setLikedWineIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetch('/api/banners.php')
      .then((res) => res.json())
      .then((data) => {
        setBanners(data.items ?? []);
      })
      .catch((err) => {
        console.error('배너 불러오기 실패', err);
      });
  }, []);

    // 위치별로 필터
  const topBanners = banners.filter(
    (b) => b.placement === 'home.top' && b.isActive
  );
  const bottomBanners = banners.filter(
    (b) => b.placement === 'home.bottom' && b.isActive
  );

  return (
    <>
      {/* 배경 섹션 */}
      <section className="h-[100svh] flex justify-center text-black">
        {/* 메인 640px 기준 배경 컨테이너 */}
        <div className="w-[640px] h-full bg-[url('/images/mainbg.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-white/40"></div>
          {/* 콘텐츠 박스: 절대포지션 없이 중앙정렬 */}
          <div className="flex flex-col items-center justify-start text-center p-[clamp(40px,6vh,96px)] gap-10">
            {/* 타이틀 */}
            <p id="mypick-heading" data-animate="mypick" className="font-mypick text-picktit font-nomal select-none mb-5 md:mb-10 z-10">
              My Pick
            </p>

            {/* 서브타이틀: 메인 640px 기준 80% */}
            <p className="max-w-[512px] text-sctit font-medium mb-5 md:mb-10 z-10">
              수 많은 와인 속,<br/>당신만의 보석을 찾아보세요
            </p>

            <button
              type="button"
              onClick={onStart} // 여기서 
              className="inline-flex items-center justify-center
                bg-brand-accent text-white text-findtit px-10 md:px-20 py-5 min-h-[44px] shadow-md
                hover:opacity-95 active:opacity-90 transition rounded-chip z-10"
              aria-label="내 취향 찾기 모달 열기"
              >
              내 취향 찾기
              </button>
          </div>
        </div>
      </section>
      {/* 실제 컨텐츠 시작 */}
      <div className="bg-white text-black p-4 sm:p-8 sm:px-6">
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
