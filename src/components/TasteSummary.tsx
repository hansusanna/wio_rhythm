// src/components/result/TasteSummary.tsx
import type { QuizAnswers } from '@/db/type/quiz';
import { TasteBar } from './TasteBar';
import { regionLabel, typeLabel } from '@/db/wineLabel';

type Props = {
  answers: QuizAnswers;
};

export function TasteSummary({ answers }: Props) {
  return (
    <div className="mb-8 rounded-2xl bg-neutral-50 px-4 py-5 md:px-6 md:py-6">
      {/* 종류 / 지역 배지 */}
      <div className="mb-4 flex flex-col gap-2 text-sm text-gray-700 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="mr-2 font-semibold">종류</span>
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs">
            {typeLabel(answers.type)}
          </span>
        </div>
        <div>
          <span className="mr-2 font-semibold">지역</span>
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs">
            {regionLabel(answers.region)}
          </span>
        </div>
      </div>

      {/* 맛 프로파일 바 */}
      <div className="space-y-3">
        <TasteBar label="바디감" levelKey="body" answers={answers} />
        <TasteBar label="타닌감" levelKey="tannin" answers={answers} />
        <TasteBar label="산미" levelKey="acidity" answers={answers} />
        <TasteBar label="당도" levelKey="sweetness" answers={answers} />
      </div>
    </div>
  );
}
