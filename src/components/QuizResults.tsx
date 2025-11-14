// src/components/QuizResults.tsx
import type { QuizAnswers } from '@/db/type/quiz';
import { RecommendationSection } from './RecommendationSection';

export default function QuizResults({
  answers,
  onBackToFirst,
}: {
  answers: QuizAnswers;
  onBackToFirst: () => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <SummaryChips answers={answers} />

      <h2 className="mt-6 mb-4 text-xl font-semibold text-neutral-900">
        내 취향에 꼭 맞는 와인
      </h2>

      <RecommendationSection answers={answers} />

      <div className="mt-8 flex justify-end">
        <button
          onClick={onBackToFirst}
          className="rounded-xl bg-mainColor px-5 py-3 text-white font-semibold"
        >
          첫페이지로 돌아가기
        </button>
      </div>
    </section>
  );
}

function SummaryChips({ answers }: { answers: QuizAnswers }) {
  const items = [
    { key: 'type', label: '종류' },
    { key: 'region', label: '지역' },
    { key: 'body', label: '바디감' },
    { key: 'tannin', label: '타닌감' },
    { key: 'acidity', label: '산미' },
    { key: 'sweetness', label: '당도' },
  ] as const;

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {items.map(({ key, label }) => (
          <span
            key={key}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm bg-white"
          >
            <strong className="text-neutral-500">{label}</strong>
            <span className="font-medium text-neutral-900">
              {answers[key] ?? '-'}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
