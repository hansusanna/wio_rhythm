// src/components/MasterPick.tsx
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import { SwiperControl } from '@/components/ui/SwiperControl';
import 'swiper/css';
import { winelist } from '@/db/type/winelist';
import { WineCard } from '@/components/ui/WineCard';
import type { Wine } from '@/db/type/wine';

type Props = {
  likedWineIds: Wine['id'][];
  onToggleLike?: (id: Wine['id']) => void;
};

export function MasterPickSection({ likedWineIds, onToggleLike }: Props) {
  // 특별추천 와인만 필터링
  const masterPickWines = winelist.filter((w) => w.isMasterPick);
  const totalCount = masterPickWines.length;
  const [current, setCurrent] = useState(1);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(null);

  const handlePrev = () => swiperInstance?.slidePrev();
  const handleNext = () => swiperInstance?.slideNext();

  const isBeginning = current === 1;
  const isEnd = current === totalCount;

  // 찜 핸들러는 그냥 상위에서 받은 onToggleLike로 위임
  const handleToggleLike = (id: Wine['id']) => {
    if (!onToggleLike) return;
    onToggleLike(id);
  };

  if (masterPickWines.length === 0) return null;

  return (
    <section className="mt-20">
      {/* 섹션 타이틀 */}
      <header className="mb-10 text-center">      
        <h2 className="mb-5 text-[40px] font-normal text-black">
          마스터의 특별 추천
        </h2>
        <p className="text-base text-black">
          전문가만 아는 숨겨진 보석들
        </p>
      </header>

      {/* 와인 카드 스와이퍼 */}
      <div>
        <Swiper
          onSwiper={setSwiperInstance}
          spaceBetween={16}
          slidesPerView={2.2}
          // 슬라이드 변경 시 activeIndex + 1 로 현재 번호 갱신
          onSlideChange={(swiper) => {
            setCurrent(swiper.activeIndex + 1);
          }}
        >
          {masterPickWines.map((wine) => (
            <SwiperSlide key={wine.id}>
              <WineCard
                wine={wine}
                isLiked={likedWineIds.includes(wine.id)}
                onToggleLike={handleToggleLike}
                className="h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
       {/* 화살표+페이지네이션 */}
        <div className="mt-1">
          <SwiperControl
            onPrev={handlePrev}
            onNext={handleNext}
            isBeginning={isBeginning}
            isEnd={isEnd}
            current={current}
            total={totalCount}
          />
        </div>  
    </section>
  );
}
