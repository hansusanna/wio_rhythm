// src/components/RecommendedSection.tsx
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuizAnswers } from '@/db/type/quiz';
import type { Wine } from '@/db/type/wine';
import { winelist } from '@/db/type/winelist';
import { getMatchedWines } from '@/db/quizMatch';
import { WineCard } from '@/components/ui/WineCard';
import { TasteSummary } from './TasteSummary';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper/types';
import { SwiperControl } from '@/components/ui/SwiperControl';
import { BottomActions } from '@/components/ui/BottomActions';
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

export function RecommendationSection({ answers, onGoHome }: Props) {
  const navigate = useNavigate();

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

    const a = answers; // 여기서는 resultAnswers 말고 props answers

    const type = `${a.body}-${a.tannin}-${a.acidity}-${a.sweetness}`; // (ResultPage에서 쓰는 type 구조랑 맞추기)

    const linkUrl =
      `${dothomeDomain}/result` +
      `?main=${mainWine.id}` +
      `&list=${listParam}` +
      `&type=${type}` +
      `&atype=${a.type ?? ''}` +
      `&region=${a.region ?? ''}` +
      `&body=${a.body ?? ''}` +
      `&tannin=${a.tannin ?? ''}` +
      `&acidity=${a.acidity ?? ''}` +
      `&sweetness=${a.sweetness ?? ''}`;

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
        {
          title: '나도 테스트 하기',
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

  const handleSubscribeClick = () => {
    navigate('/subscription', { state: { matchedWines } });
  };

  return (
    <section>
      {/* 상단 헤더 */}
      <header className="mb-2 text-left text-brand-accent md:mb-6">
          <h1 className="text-4xl font-bold md:text-5xl"><span className='italic font-en tracking-tight192'>My Pick</span><span className="pl-2 text-xl md:text-2xl font-ko font-medium">당신만을 위한 와인</span> 
          </h1>
      </header>

      {/* 질문 선택 결과 요약 + 그래프 */}
       <div className="flex justify-center">
        <TasteSummary answers={answers} />
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
      <div className="mt-8 flex w-full flex-col items-center gap-2">       
         <BottomActions 
          onSubscribe={handleSubscribeClick}
          onShare={handleShareKakao}
          onGoHome={onGoHome}
          shareLabel="카카오톡 결과 남기기" // 여기만 라벨 다르게 설정
        />
      </div>
    </section>
  );
}
