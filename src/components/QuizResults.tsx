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
    <div className="mx-auto px-4 py-8 bg-white">
      <RecommendationSection answers={answers} onGoHome={onBackToFirst}/>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onBackToFirst}
          className="rounded-xl bg-mainColor px-5 py-3 text-white font-semibold"
        >
          첫페이지로 돌아가기
        </button>
      </div>
    </div>
  );
}
