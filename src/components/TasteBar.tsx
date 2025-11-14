// src/components/result/TasteBar.tsx
import type { QuizAnswers } from '@/db/type/quiz';

type LevelKey = 'body' | 'tannin' | 'acidity' | 'sweetness';

type Props = {
  label: string;
  levelKey: LevelKey;
  answers: QuizAnswers;
};

export function TasteBar({ label, levelKey, answers }: Props) {
  const value = answers[levelKey];
  const activeIndex = valueToIndex(levelKey, value);

  const stepsLabel =
    levelKey === 'body'
      ? ['라이트', '보통', '풀바디']
      : ['약함', '보통', '강함'];

  return (
    <div className="flex items-center gap-3 text-xs">
      <div className="w-16 shrink-0 font-medium text-gray-700">{label}</div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={
                'h-2 flex-1 rounded-full transition-colors ' +
                (activeIndex === i ? 'bg-[#570E19]' : 'bg-gray-200')
              }
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-gray-500">
          {stepsLabel.map((txt) => (
            <span key={txt}>{txt}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function valueToIndex(key: LevelKey, value?: string) {
  if (!value) return -1;
  if (key === 'body') {
    if (value === 'light') return 0;
    if (value === 'medium') return 1;
    if (value === 'full') return 2;
    return -1;
  }
  // tannin / acidity / sweetness
  if (value === 'low') return 0;
  if (value === 'medium') return 1;
  if (value === 'high') return 2;
  return -1;
}
