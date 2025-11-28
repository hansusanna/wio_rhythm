// src/pages/ResultPage.tsx
import { useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { winelist } from '@/db/type/winelist';
import type { Wine } from '@/db/type/wine';
import { WineCard } from '@/components/ui/WineCard';

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [likedIds, setLikedIds] = useState<(string | number)[]>([]);

  const { mainWine, wines } = useMemo(() => {
    const listParam = searchParams.get('list') ?? '';
    const mainParam = searchParams.get('main') ?? undefined;

    const ids = listParam
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean); // 빈 문자열 제거

    const wines: Wine[] = winelist.filter((w) =>
     ids.includes(String(w.id)),
    );

    const mainWine =
      wines.find((w) => String(w.id) === mainParam) ?? wines[0] ?? null;

    return { mainWine, wines };
  }, [searchParams]);

  const handleToggleLike = (id: string | number) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const handleGoTest = () => {
    navigate('/'); // 홈 경로
  };

  // 결과 정보 없음
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
            링크가 잘못되었거나, 너무 오래된 링크일 수 있어요.
            <br />
            아래 버튼을 눌러 취향 테스트를 다시 시작해 보세요.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleGoTest}
              className="rounded-2xl bg-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-accent/30 hover:opacity-95 active:opacity-90"
            >
              와인 취향 테스트 하러 가기
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-primary">
      <section className="mx-auto max-w-5xl px-4 py-10 xl:py-14">
        {/* 상단 헤더 */}
        <header className="mb-8 md:mb-10 text-center">
          <div className="mb-3 inline-flex items-center rounded-full bg-white px-4 py-1 text-base font-medium text-brand-accent">
            Wio Rhythm · 와인 취향 결과
          </div>
          <h1 className="text-3xl font-semibold text-white md:text-[2.15rem]">
            나의 와인 취향 결과는?
          </h1>
          {mainWine && (
            <p className="mt-4 text-base text-slate-200 md:text-lg">
              당신에게 딱 맞는 와인은&nbsp;
              <span className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent font-bold">
                ‘{mainWine.nameKo}’
              </span>
              &nbsp;입니다.
            </p>
          )}
        </header>

        {/* 대표 와인 카드 + 설명 영역 */}
        {mainWine && (
          <section className="mb-10 bg-gradient-to-br from-white/5 via-white/3 to-white/5 p-[1px] shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
            <div className="flex flex-col gap-8 bg-stone-500/20 p-6 md:flex-row md:p-8">
              {/* 대표 와인 카드 */}
              <div className="flex w-full justify-center md:w-[40%]">
                <div className="w-full max-w-sm">
                  <WineCard
                    wine={mainWine}
                    isLiked={likedIds.includes(mainWine.id)}
                    onToggleLike={handleToggleLike}
                  />
                </div>
              </div>

              {/* 텍스트 설명 / CTA */}
              <div className="flex w-full flex-col justify-center gap-4 md:w-[60%]">
                <h2 className="text-xl font-semibold text-white md:text-2xl">
                  이 와인이 왜 나와 잘 맞을까요?
                </h2>
                <p className="text-sm leading-relaxed text-slate-300 md:text-[0.95rem]">
                  취향 테스트에서 선택한 향, 바디감, 산도, 당도 선호를 바탕으로
                  Wio Rhythm 알고리즘이 추천한 와인이에요.
                  <br />
                  부담스럽지 않은 한 잔부터, 특별한 날을 위한 페어링까지
                  다양하게 즐겨보세요.
                </p>

                <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-dark" />
                    내 취향 데이터 기반 맞춤 추천
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-dark" />
                    비슷한 스타일의 와인들도 함께 추천
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-dark" />
                    나중에 다시 테스트해도 결과 비교 가능
                  </li>
                </ul>

                <div className="mt-4 flex flex-wrap">
                  <button
                    type="button"
                    onClick={handleGoTest}
                    className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-brand-primary"
                  >
                     이 취향으로 와인 다시 골라보기
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 추천 와인 리스트 */}
        {wines.length > 0 && (
          <section className="mb-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white md:text-xl">
                함께 추천된 와인 리스트
              </h2>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold text-brand-dark">
                총 {wines.length}종 추천
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {wines.map((wine) => (
                <div key={wine.id} className="w-full max-w-[350px]">
                <WineCard
                  wine={wine}
                  isLiked={likedIds.includes(wine.id)}
                  onToggleLike={handleToggleLike}
                  className="h-full"
                />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 하단 안내 */}
        <footer className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="mb-3 text-xs text-slate-400">
            이 결과는 현재 선택하신 취향을 기준으로 생성된 추천이에요.
            <br className="hidden md:inline" />
            기분이나 계절에 따라 취향이 바뀔 수 있으니, 가끔씩 다시 테스트해
            보세요.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleGoTest}
              className="rounded-2xl bg-white px-5 py-2.5 text-xs font-semibold text-slate-900 hover:bg-slate-100"
            >
              취향 테스트 다시 하기
            </button>
            <button
              type="button"
              onClick={handleGoTest}
              className="rounded-2xl border border-white/15 px-5 py-2.5 text-xs font-medium text-slate-200 hover:bg-white/5"
            >
            나도 와인 취향 테스트 해볼래
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}
