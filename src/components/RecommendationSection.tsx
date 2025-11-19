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
import 'swiper/css'; // Swiper 기본 CSS

 
type Props = {
  answers: QuizAnswers;
  onConfirm?: () => void;
  onGoHome: () => void;
};

// 화살표 아이콘
function ArrowLeftIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2} // stroke 두께 조절
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
}
function ArrowRightIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2} // stroke 두께 조절
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
export function RecommendationSection({ answers, onConfirm, onGoHome }: Props) {
  const scored = getMatchedWines(answers, winelist);
  const matchedWines: Wine[] = scored.map((s) => s.wine);

 //페이지네이션을 위한 state (현재 인덱스 / 전체 개수)
  const [pagination, setPagination] = useState({
    current: 1,
    total: matchedWines.length,
  });

 // 찜한 와인 ID 목록을 관리할 state 생성
  const [likedWineIds, setLikedWineIds] = useState<(string | number)[]>([]);

  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null,
  );

  // 찜하기 버튼 클릭 시 호출될 핸들러 함수
  const handleToggleLike = (id: string | number) => {
    setLikedWineIds((prevIds) => {
      // 이미 찜한 ID라면, 목록에서 제거
      if (prevIds.includes(id)) {
        return prevIds.filter((wineId) => wineId !== id);
      }
      // 찜하지 않은 ID라면, 목록에 추가
      else {
        return [...prevIds, id];
      }
    });
  };

  // 버튼 클릭 핸들러
  const handlePrev = () => {
    swiperInstance?.slidePrev(); // Swiper 인스턴스로 이전 슬라이드 실행
  };
  const handleNext = () => {
    swiperInstance?.slideNext(); // Swiper 인스턴스로 다음 슬라이드 실행
  };

  // 버튼 비활성화를 위한 변수
  const isBeginning = pagination.current === 1;
  const isEnd = pagination.current === pagination.total;

  return (
    <section>
      {/* 상단 헤더 */}
      <header className="mb-4 text-center">
        <p className="mt-4 text-xl mb-10 flex items-center text-[#353535] font-normal"><WineGlassIcon className="mx-2 w-8 h-8" />나에게 딱 맞는 와인이 궁금하다면?</p>
      </header>

      {/* 질문 선택 결과 요약 + 그래프 */}
      <TasteSummary answers={answers} />

      {/* 타이틀 / 서브타이틀 */}
      <div className="mt-12 mb-4 text-center">
        <h2 className="text-3xl font-normal text-black">내 취향에 꼭 맞는 와인</h2>
        <p className="mt-5 text-base text-black">찾았다! 나만의 보석</p>
      </div>

      {/* 와인 카드 그리드 */}
     <div className="px-1">
        <Swiper
          onSwiper={setSwiperInstance}
          spaceBetween={16} // 슬라이드 간격
          slidesPerView={2.2} // 2개 + 3번째 와인 일부 노출 (2.1 = 10%, 2.2 = 20%)
          onSlideChange={(swiper) => { 
            setPagination((prev) => ({ ...prev, current: swiper.activeIndex + 1 }));
          }}
        >
          {matchedWines.map((wine) => (
            <SwiperSlide key={wine.id}>
              <WineCard
                wine={wine}
                isLiked={likedWineIds.includes(wine.id)} // 찜 목록에 ID가 포함되어 있는지 여부
                onToggleLike={handleToggleLike} // 찜하기 핸들러 함수 전달
                className="h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex items-center justify-center gap-4 text-sm">
        {/* 왼쪽 화살표 버튼 */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={isBeginning} // 처음일 때 비활성화
          className="text-gray-500 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
          aria-label="이전 와인"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>

        {/* 숫자 표시 */}
        <div className="flex items-center text-black">
          <span className="font-semibold">{pagination.current}</span>
          <span className="mx-1 text-gray-400">/</span>
          <span>{pagination.total}</span>
        </div>

        {/* 오른쪽 화살표 버튼 */}
        <button
          type="button"
          onClick={handleNext}
          disabled={isEnd} // 마지막일 때 비활성화
          className="text-gray-500 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
          aria-label="다음 와인"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* 구독하기 / 카카오톡 버튼 Row */}
      <div className="mt-8 flex w-full flex-col items-center gap-2">       
        <div className="flex w-full items-center gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-2xl bg-brand-accent py-3 text-xl font-semibold text-white hover:opacity-95 active:opacity-90"
          >
            구독하기
          </button>
          {/* 카카오톡 버튼 */}
          <button
            type="button"
            // onClick={handleShareKakao} // (공유 기능은 별도 구현 필요)
            className="flex-1 rounded-2xl bg-[#FEE500] py-3 text-xl font-semibold text-black hover:opacity-95 active:opacity-90"
          >
            카카오톡으로 보내기
          </button>       
        </div>
        {/* 처음으로 가기 버튼 */}
        <button
          type="button"
          onClick={onGoHome}
          className="text-xl text-gray-500 hover:text-gray-800"
        >
          처음으로 가기
        </button>
      </div>
    </section>
  );
}
