// src/pages/ResultPage.tsx
import { useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { winelist } from '@/db/type/winelist';
import type { Wine } from '@/db/type/wine';
import {
  personalityMap,
  type PersonalityProfile,
} from '@/db/type/personalityType';
import { WineCard } from '@/components/ui/WineCard';
import { MessageCircle } from 'lucide-react';

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [likedIds, setLikedIds] = useState<(string | number)[]>([]);

  /* -------------------------------------------------------
     추천 와인 목록 + 대표 와인 계산
  ------------------------------------------------------- */
  const { mainWine, wines } = useMemo(() => {
    const listParam = searchParams.get('list') ?? '';
    const mainParam = searchParams.get('main') ?? undefined;

    const ids = listParam
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);

    const wines: Wine[] = winelist.filter((w) =>
      ids.includes(String(w.id)),
    );

    const mainWine =
      wines.find((w) => String(w.id) === mainParam) ??
      wines[0] ??
      null;

    return { mainWine, wines };
  }, [searchParams]);

  /* -------------------------------------------------------
     취향 유형 매칭 (code → title + description)
  ------------------------------------------------------- */

  // URL 예: ?type=full-strong-low-low
  const typeParam = searchParams.get('type');

  // 1순위 URL 파라미터, 2순위 wine 데이터, 3순위 null
  const code =
    typeParam ??
    mainWine?.personalityTypeCode ??
    null;

  const personalityProfile: PersonalityProfile | null =
    code && personalityMap[code] ? personalityMap[code] : null;

  const personalityTitle =
    personalityProfile?.title ?? '당신만의 와인 스타일';

  const personalityDescription =
    personalityProfile?.description ??
    '당신의 선택을 기반으로 어울리는 와인 스타일을 추천해드렸어요.';


  /* -------------------------------------------------------
     좋아요 토글 / 페이지 이동 핸들러
  ------------------------------------------------------- */
  const handleToggleLike = (id: string | number) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const handleGoHome = () => navigate('/');

  const handleGoSubscription = () => {
    const targetWines =
      wines.length > 0 ? wines : mainWine ? [mainWine] : [];

    navigate('/subscription', {
      state: { matchedWines: targetWines },
    });
  };

  const handleKakaoStart = () => {
    alert('카카오 간편 회원가입 프로세스를 시작합니다.');
    handleGoSubscription();
  };

  /* -------------------------------------------------------
     결과 없음 처리
  ------------------------------------------------------- */
  if (!mainWine && wines.length === 0) {
    return (
      <main className="min-h-screen bg-brand-primary">
        <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
          <div className="mb-3 inline-flex items-center rounded-full bg-white/5 px-4 py-1 text-xs font-medium text-brand-accent">
            Wio Rhythm · Wine Personality
          </div>
          <h1 className="mb-3 text-2xl font-semibold text-white">
            추천 결과를 찾을 수 없어요
          </h1>
          <p className="mb-8 text-sm text-slate-300">
            링크가 잘못되었거나 너무 오래된 링크일 수 있어요.
            <br />
            아래 버튼을 눌러 취향 테스트를 다시 시작해 보세요.
          </p>
          <button
            onClick={handleGoHome}
            className="rounded-2xl bg-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-accent/30 hover:opacity-95 active:opacity-90"
          >
            와인 취향 테스트 하러 가기
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-primary">
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        {/* 상단 My Pick */}
        <header className="mb-2 text-left text-white md:mb-8">
          <h1 className="italic font-en text-4xl font-bold tracking-tight192 md:text-6xl">My Pick<span className="pl-2 text-2xl md:text-3xl font-ko font-medium">당신만을 위한 와인</span> 
          </h1>
        </header>

        {/*중앙 카드 */}
        <div className="mx-auto max-w-[1000px] bg-white px-4 py-8 shadow-[0_20px_45px_rgba(0,0,0,0.45)] md:px-8 md:py-10">
          {/* 취향 유형 박스 */}
          <section className="mb-8 rounded-xl bg-brand-primary px-5 py-7 text-center text-white md:px-8 md:py-9">
            <p className="text-sm md:text-base">
              당신은{' '}
              <span className="font-semibold">"{personalityTitle}"</span>
            </p>

            {/* 설명은 DB에서 줄바꿈(\n) 기준으로 출력 */}
            <p className="mt-4 text-xs leading-relaxed text-slate-100/90 md:text-sm">
              {personalityDescription.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br className="hidden md:block" />
                </span>
              ))}
            </p>
          </section>

          {/* 추천 와인 리스트 */}
          {wines.length > 0 && (
            <section>
              <div className="mb-4 flex flex-col items-start justify-between gap-2 text-left md:flex-row md:items-center">
                <div>
                  <h2 className="text-base font-semibold text-slate-900 md:text-lg">
                    당신의 취향에 가장 잘 맞는 와인 리스트
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 md:text-sm">
                    취향 테스트에서 선택한 바디감, 타닌, 산도, 당도를 기준으로
                    선별한 추천 세트입니다.
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 md:text-sm">
                  총 {wines.length}종 추천
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {wines.map((wine) => (
                  <WineCard
                    key={wine.id}
                    wine={wine}
                    isLiked={likedIds.includes(wine.id)}
                    onToggleLike={handleToggleLike}
                    className="h-full"
                  />
                ))}
              </div>
            </section>
          )}

          {/* 하단 CTA 버튼 */}
          <footer className="mt-10 border-t border-slate-200 pt-8">
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-lg font-bold text-slate-900 md:text-xl">
                이 와인들, 매달 집에서 받아보시겠어요?
              </h3>
              <p className="text-xs text-slate-500 md:text-sm">
                지금 구독을 시작하시면 첫 달에는 특별 혜택과 함께 추천 세트를 보내드려요.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:justify-center">
              {/* 구독 */}
              <button
                onClick={handleGoSubscription}
                className="w-full rounded-md bg-brand-primary py-3 text-sm font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-[0.98] md:w-auto md:min-w-[200px] md:px-6 md:text-base"
              >
                내 취향 와인 구독하기
              </button>

              {/* 카카오 */}
              <button
                onClick={handleKakaoStart}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#FEE500] py-3 text-sm font-bold text-black shadow-md transition-all hover:bg-[#FDD835] active:scale-[0.98] md:w-auto md:min-w-[200px] md:px-6 md:text-base"
              >
                <MessageCircle className="h-5 w-5" />
                카카오 3초 시작하기
              </button>

              {/* 홈 */}
              <button
                onClick={handleGoHome}
                className="w-full rounded-md border border-slate-300 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 active:scale-[0.98] md:w-auto md:min-w-[180px] md:px-6 md:text-base"
              >
                처음으로 돌아가기
              </button>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
