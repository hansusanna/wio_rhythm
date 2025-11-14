// src/components/RecommendedSection.tsx
import type { QuizAnswers } from '@/db/type/quiz';
import type { Wine } from '@/db/type/wine';
import { winelist } from '@/db/type/winelist';
import { getMatchedWines } from '@/db/quizMatch';
import { WineCard } from '@/components/ui/WineCard';
import { TasteSummary } from './TasteSummary';

type Props = {
  answers: QuizAnswers;
  onConfirm?: () => void;
};

export function RecommendationSection({ answers, onConfirm }: Props) {
  const scored = getMatchedWines(answers, winelist);
  const topWines: Wine[] = scored.slice(0, 4).map((s) => s.wine);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      {/* 상단 헤더 */}
      <header className="mb-4 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="text-2xl">🍷</span>
          <p className="text-sm font-medium text-gray-800">
            나에게 딱 맞는 와인이 궁금하다면?
          </p>
        </div>
      </header>

      {/* 질문 선택 결과 요약 + 그래프 */}
      <TasteSummary answers={answers} />

      {/* 타이틀 / 서브타이틀 */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-gray-900">내 취향에 꼭 맞는 와인</h2>
        <p className="mt-1 text-sm text-gray-600">찾았다! 나만의 보석</p>
      </div>

      {/* 와인 카드 그리드 */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {topWines.map((wine) => (
          <WineCard key={wine.id} wine={wine} />
        ))}
      </div>

      {/* 와인 개수 표시 */}
      <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
        <span>추천 와인 {topWines.length}개</span>
        {/* TODO: 슬라이더/페이지네이션 들어올 자리 */}
      </div>

      {/* 확인 버튼 */}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onConfirm}
          className="w-full max-w-xs rounded-full bg-brand-accent py-3 text-sm font-semibold text-white hover:opacity-95 active:opacity-90"
        >
          확인
        </button>
      </div>
    </section>
  );
}
