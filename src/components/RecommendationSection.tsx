// src/components/RecommendedSection.tsx
import { useState } from 'react';
import type { QuizAnswers } from '@/db/type/quiz';
import type { Wine } from '@/db/type/wine';
import { winelist } from '@/db/type/winelist';
import { getMatchedWines } from '@/db/quizMatch';
import { WineCard } from '@/components/ui/WineCard';
import { TasteSummary } from './TasteSummary';
import WineGlassIcon from '@/assets/wglass_ico.svg?react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper/types';
import { SwiperControl } from '@/components/ui/SwiperControl';
import 'swiper/css'; // Swiper 기본 CSS
 
type Props = {
  answers: QuizAnswers;
  onConfirm?: () => void;
  onGoHome: () => void;
};

export function RecommendationSection({ answers, onConfirm, onGoHome }: Props) {
  const scored = getMatchedWines(answers, winelist);
  const matchedWines: Wine[] = scored.map((s) => s.wine);

  const [current, setCurrent] = useState(1);
  const totalCount = matchedWines.length;

 // 찜한 와인 ID 목록을 관리할 state 생성
  const [likedWineIds, setLikedWineIds] = useState<(string | number)[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(null);

  const handleToggleLike = (id: string | number) => {
    setLikedWineIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((wineId) => wineId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  // 버튼 클릭 핸들러
  const handlePrev = () => swiperInstance?.slidePrev(); 
  const handleNext = () => swiperInstance?.slideNext(); 

  const isBeginning = current === 1;
  const isEnd = current === totalCount;

  return (
    <section>
      {/* 상단 헤더 */}
      <header className="mb-4 text-center">
        <p className="mt-4 text-xl mb-10 flex items-center text-[#353535] font-normal tracking-[-0.03em]"><WineGlassIcon className="mx-2 w-8 h-8" />나에게 딱 맞는 와인이 궁금하다면?</p>
      </header>

      {/* 질문 선택 결과 요약 + 그래프 */}
      <TasteSummary answers={answers} />

      {/* 타이틀 */}
      <div className="mt-12 mb-6 text-center">
        <h2 className="text-3xl font-normal text-black">내 취향에 꼭 맞는 와인</h2>
        <p className="mt-1.5 text-lg text-black">찾았다! 나만의 보석</p>
      </div>

      {/* 와인 카드 그리드 */}
     <div className="px-1">
       <Swiper
          onSwiper={setSwiperInstance}
          spaceBetween={16} 
          slidesPerView={2.2}
          // 슬라이드 변경 시 current(현재 페이지 번호)만 업데이트
          onSlideChange={(swiper) => { 
            setCurrent(swiper.activeIndex + 1);
          }}
          className='!overflow-visible'
        >
          {matchedWines.map((wine) => (
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
      {/* 구독하기 / 카카오톡 버튼 Row */}
      <div className="mt-12 flex w-full flex-col items-center gap-5">       
        <div className="flex w-full items-center gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-[0.30rem] bg-brand-accent py-3 text-lg font-medium text-white hover:opacity-95 active:opacity-90"
          >
            구독하기
          </button>
          {/* 카카오톡 버튼 */}
          <button
            type="button"
            // onClick={handleShareKakao} // (공유 기능은 별도 구현 필요)
            className="flex-1 rounded-[0.30rem] bg-[#FEE500] py-3 text-lg font-medium text-black hover:opacity-95 active:opacity-90"
          >
            카카오톡으로 보내기
          </button>       
        </div>
        {/* 처음으로 가기 버튼 */}
        <button
          type="button"
          onClick={onGoHome}
          className="text-gray-500 hover:text-gray-800"
        >
          처음으로 가기
        </button>
      </div>
    </section>
  );
}
