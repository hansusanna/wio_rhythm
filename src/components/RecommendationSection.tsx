// src/components/RecommendedSection.tsx
import { useState, useEffect} from 'react';
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

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

type Props = {
  answers: QuizAnswers;
  onConfirm?: () => void;
  onGoHome: () => void;
};

export function RecommendationSection({ answers, onConfirm, onGoHome }: Props) {
  const scored = getMatchedWines(answers, winelist);
  const matchedWines: Wine[] = scored.map((s) => s.wine);
  // 카카오 SDK 초기화
  useEffect(() => {
    if (window.Kakao) {
      // 중복 초기화 방지
      if (!window.Kakao.isInitialized()) {
        // 여기에 1단계에서 복사한 'JavaScript 키'를 넣으세요.
        window.Kakao.init('a26c283956e6dd289ddaa3c2d8ee3e1b'); 
      }
    }
  }, []);

  // 카카오톡 공유 핸들러 함수
  const handleShareKakao = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert('카카오 SDK가 로드되지 않았습니다.');
      return;
    }

    // 공유할 대표 와인(첫 번째 추천 와인)
    const mainWine = matchedWines[0];
    const dothomeDomain = 
      import.meta.env.VITE_SITE_URL ?? 'http://wiorhythm.dothome.co.kr';
    // 추천 리스트 id 배열
    const listParam = matchedWines.map((w) => w.id).join(',');

    // 결과 페이지 링크
    const linkUrl = `${dothomeDomain}/result?main=${mainWine.id}&list=${listParam}`;

    // 이미지 URL은 그대로 대표 와인 이미지 사용 이미지는 웹 URL
    const imageUrl = `${dothomeDomain}${mainWine.image}`;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '나의 와인 취향 결과는?',
        description: `당신에게 딱 맞는 와인은 '${mainWine.nameKo}' 입니다.`,
        imageUrl: imageUrl, 
        link: {
          mobileWebUrl: linkUrl,
          webUrl: linkUrl,
        },
      },
      buttons: [
        {
          title: '결과 확인하기',
          link: {
            mobileWebUrl: linkUrl,
            webUrl: linkUrl,
          },
        },
      ],
    });
  };

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
        <p className="mt-4 text-xl mb-10 flex items-center text-[#353535] font-normal"><WineGlassIcon className="mx-2 w-8 h-8" />나에게 딱 맞는 와인이 궁금하다면?</p>
      </header>

      {/* 질문 선택 결과 요약 + 그래프 */}
      <TasteSummary answers={answers} />

      {/* 타이틀 */}
      <div className="mt-12 mb-4 text-center">
        <h2 className="text-3xl font-normal text-black">내 취향에 꼭 맞는 와인</h2>
        <p className="mt-5 text-base text-black">찾았다! 나만의 보석</p>
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
            onClick={handleShareKakao}
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
