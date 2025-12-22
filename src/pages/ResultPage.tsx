// src/pages/ResultPage.tsx
import { useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { winelist } from '@/db/type/winelist';
import type { Wine } from '@/db/type/wine';
import {
  getPersonalityProfile,
  type PersonalityProfile,
} from '@/db/type/personalityType';
import { getAnswersFromQuery } from '@/utils/queryAnswers';
import { TasteSummary } from '@/components/TasteSummary';
import { WineCard } from '@/components/ui/WineCard';
import { BottomActions } from '@/components/ui/BottomActions';
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  /* 추천 와인 목록 + 대표 와인 계산 */
  const { mainWine, wines } = useMemo(() => {
    const listParam = searchParams.get('list') ?? '';
    const mainParam = searchParams.get('main') ?? undefined;

    const ids = listParam
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);

    const wines: Wine[] = ids
    .map((id) => winelist.find((w) => String(w.id) === id) || null)
    .filter((w): w is Wine => w !== null);

  // 없으면 리스트 첫 번째 와인을 대표로 사용
    const mainWine =
      (mainParam && wines.find((w) => String(w.id) === mainParam)) ??
      wines[0] ??
      null;

    return { mainWine, wines };
  }, [searchParams]);

  // 카카오 SDK 초기화 (1. 카카오톡 공유 기능 연동을 위해 추가)
  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init('a26c283956e6dd289ddaa3c2d8ee3e1b');
      }
    }
  }, []);

  const resultAnswers = useMemo(
    () => getAnswersFromQuery(searchParams, mainWine),
    [searchParams, mainWine],
  );
  /* 취향 유형 매칭 (code → title + description) */
  // URL 예: ?type=full-strong-low-low
  const typeParam = searchParams.get('type');

  const buildCodeFromWine = (wine: Wine) =>
  `${wine.body}-${wine.tannin}-${wine.acidity}-${wine.sweetness}`;
  
  const code =
    typeParam ??
    mainWine?.personalityTypeCode ??
    (mainWine ? buildCodeFromWine(mainWine) : null);

  const personalityProfile: PersonalityProfile = getPersonalityProfile(code);
  const personalityTitle = personalityProfile.title;
  const personalityDescription = personalityProfile.description;

  const handleGoHome = () => navigate('/');

  const handleGoSubscription = () => {
    const targetWines =
      wines.length > 0 ? wines : mainWine ? [mainWine] : [];

    navigate('/subscription', {
      state: { matchedWines: targetWines },
    });
  };

  // 1. 카카오톡 공유하기 기능 구현
  const handleShareKakao = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert('카카오 SDK가 로드되지 않았습니다.');
      return;
    }
    
    if (!mainWine) return;

    const dothomeDomain = 
      import.meta.env.VITE_SITE_URL ?? 'http://wiorhythm.dothome.co.kr';
    
    // 현재 URL 파라미터 재구성
    const listParam = wines.map((w) => w.id).join(',');
    const type = code ?? '';
    const linkUrl = `${dothomeDomain}/result?main=${mainWine.id}&list=${listParam}&type=${type}`;
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

  // 4. 마이페이지에 저장하기 (localStorage 사용 임시 구현)
  const handleSaveToMyPage = () => {
    if (!mainWine) return;

    // 로컬 스토리지에서 'myPageWines' 키로 데이터를 가져옵니다.
    const storedData = localStorage.getItem('myPageWines');
    const myWines = storedData ? JSON.parse(storedData) : [];

    // 중복 저장 방지
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isAlreadySaved = myWines.some((item: any) => item.id === mainWine.id);

    if (isAlreadySaved) {
      alert('이미 마이페이지에 저장된 와인입니다.');
      return;
    }

    // 저장할 데이터 객체 구성 (작은 이미지 형식으로 보여주기 위한 필수 정보)
    const newWineItem = {
      id: mainWine.id,
      nameKo: mainWine.nameKo,
      image: mainWine.image,
      type: mainWine.type,
      savedAt: new Date().toISOString(),
    };

    // 배열 앞에 추가하여 최신순 정렬
    const updatedWines = [newWineItem, ...myWines];
    localStorage.setItem('myPageWines', JSON.stringify(updatedWines));

    alert('마이페이지에 저장되었습니다.\n(임시 저장소: 추후 마이페이지에서 확인 가능합니다.)');
  };

  /* 결과 없음 처리 */
  if (!mainWine && wines.length === 0) {
    return (
      <main className="min-h-screen bg-brand-primary">
        <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
          <div className="mb-3 inline-flex items-center rounded-full bg-border-white px-4 py-1 text-xs font-medium text-brand-accent">
            Wio Rhythm · Wine Personality
          </div>
          <h1 className="mb-3 text-2xl font-semibold text-white">
            추천 결과를 찾을 수 없어요
          </h1>
          <p className="mb-8 text-sm text-ui-textMuted">
            링크가 잘못되었거나 너무 오래된 링크일 수 있어요.
            <br />
            아래 버튼을 눌러 취향 테스트를 다시 시작해 보세요.
          </p>
          <button
            onClick={handleGoHome}
            className="rounded-card bg-brand-accent px-6 py-3 text-sm font-semibold text-white hover:opacity-95 active:opacity-90"
          >
            와인 취향 테스트 하러 가기
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white md:bg-brand-primary">
      <section className="mx-auto max-w-5xl px-0 md:px-4 pb-10 md:pb-14">
        {/* 상단 My Pick */}
        <header className="mb-2 text-left text-brand-accent md:text-white md:mb-8 px-4 md:px-8 pt-16 pb-3 relative seasonBg">
          <div className="absolute inset-0 bg-gradient-to-t from-white/100 to-white/0 md:hidden"></div>
          <h1 className="text-4xl font-bold md:text-6xl z-20 relative">
            <span className='italic font-en tracking-tight192'>My Pick</span>
            <span className="pl-2 text-2xl md:text-3xl font-ko font-medium">당신만을 위한 와인</span> 
          </h1>
        </header>
       
        {/*중앙 카드 */}
        <div className="mx-auto max-w-[1000px] bg-white px-4 pb-8 md:px-8 md:py-10">
          {/* 취향 유형 박스 */}
          <section className="mb-8 rounded-md bg-brand-accent px-5 py-7 text-center text-white md:px-8 md:py-9">
            <p className="text-base md:text-2xl">
              당신은{' '}
              <span className="font-semibold font-maru text-xl md:text-3xl">"{personalityTitle}"</span>
            </p>

            {/* 설명은 DB에서 줄바꿈(\n) 기준으로 출력 */}
            <p className="mt-4 text-sm leading-relaxed text-white md:text-base">
              {personalityDescription.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br className="hidden md:block" />
                </span>
              ))}
            </p>
          </section>
          {/* 퀴즈 선택 결과 요약 + 그래프 */}
            {resultAnswers && (
              <div className="flex justify-center">
                <TasteSummary answers={resultAnswers} />
              </div>
            )}
          {/* 추천 와인 리스트 */}
          {wines.length > 0 && (
            <section>
              <div className="mb-4 flex flex-col items-start justify-between gap-2 text-left md:flex-row md:items-center">
                <div>
                  <h2 className="text-lg font-semibold text-brand-dark tracking-tighter md:text-[26px]">
                    당신의 취향에 가장 잘 맞는 와인 리스트
                  </h2>
                  
                </div>
                <span className="inline-flex items-center rounded-full bg-brand-lightred px-2 py-1 text-xs font-normal text-ui-textSecondary md:text-sm">
                  총 {wines.length}종 추천
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                {wines.map((wine) => (
                  <WineCard
                    key={wine.id}
                    wine={wine}
                    showPrice={false}
                    className="h-full"
                  />
                ))}
              </div>
            </section>
          )}

          {/* 하단 CTA 버튼 */}
          <footer className="mt-12 border-t border-border-light">
            <div className="mt-12 mb-8 text-center">
              <h3 className="mb-2 text-xl font-semibold text-brand-dark md:text-2xl">
                이 와인들, 매달 집에서 받아보시겠어요?
              </h3>
              <p className="text-sm text-brand-dark font-medium md:text-sm flex justify-center flex-col md:flex-row">
                <span className='mr-1'>지금 구독하시면 첫 달에는 특별 혜택과 함께</span><span>‘스타트 선물 세트’를 보내드려요.</span>
              </p>
            </div>

            {/* BottomActions 컴포넌트로 대체 */}
            <BottomActions 
              onSubscribe={handleGoSubscription}
              onShare={handleShareKakao}
              onSave={handleSaveToMyPage} // 저장하기 기능 추가
              onGoHome={handleGoHome}
              shareLabel="카톡으로 공유하기"
              subscribeLabel="내 취향 와인 구독하기"
            />
          </footer>
        </div>
      </section>
    </main>
  );
}
