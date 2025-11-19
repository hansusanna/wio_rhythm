// src/components/sections/MasterPick.tsx
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';

import { winelist } from '@/db/type/winelist';
import { WineCard } from '@/components/ui/WineCard';
import type { Wine } from '@/db/type/wine';

type Props = {
  likedWineIds: Wine['id'][];
  onToggleLike?: (id: Wine['id']) => void;
};

// 화살표 아이콘
function ArrowLeftIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );
}

function ArrowRightIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

export function MasterPickSection({ likedWineIds, onToggleLike }: Props) {
  // 특별추천 와인만 필터링
  const masterPickWines = winelist.filter((w) => w.isMasterPick);

  const [pagination, setPagination] = useState({
    current: 1,
    total: masterPickWines.length > 0 ? masterPickWines.length : 1,
  });

  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(null);

  const handlePrev = () => swiperInstance?.slidePrev();
  const handleNext = () => swiperInstance?.slideNext();

  const isBeginning = pagination.current === 1;
  const isEnd = pagination.current === pagination.total;

  // 찜 핸들러는 그냥 상위에서 받은 onToggleLike로 위임
  const handleToggleLike = (id: Wine['id']) => {
    if (!onToggleLike) return;
    onToggleLike(id);
  };

  if (masterPickWines.length === 0) return null;

  return (
    <section className="mt-10 sm:mt-12">
      {/* 섹션 타이틀 */}
      <header className="mb-4 sm:mb-6 text-center">      
        <h2 className="mb-1 text-xl font-semibold text-black sm:text-2xl">
          마스터의 특별 추천
        </h2>
        <p className="text-xs text-gray-500 sm:text-sm">
          전문가만 아는 숨겨진 보석들
        </p>
      </header>

      {/* 와인 카드 스와이퍼 */}
      <div className="px-1">
        <Swiper
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
            setPagination((prev) => ({
              ...prev,
              total: swiper.snapGrid.length || 1,
            }));
          }}
          spaceBetween={16}
          slidesPerView={2.2}
          onSlideChange={(swiper) => {
            setPagination((prev) => ({
              ...prev,
              current: swiper.activeIndex + 1,
            }));
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

      {/* 페이지네이션 + 화살표 */}
      <div className="mt-4 flex items-center justify-center gap-4 text-sm">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isBeginning}
          className="text-gray-500 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-300"
          aria-label="이전 와인"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>

        <div className="flex items-center text-black">
          <span className="font-semibold">{pagination.current}</span>
          <span className="mx-1 text-gray-400">/</span>
          <span>{pagination.total}</span>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={isEnd}
          className="text-gray-500 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-300"
          aria-label="다음 와인"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
