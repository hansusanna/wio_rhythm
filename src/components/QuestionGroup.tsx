// src/components/QuestionGroup.tsx
import type { QuizAnswers, AnswerKey, StepDef } from '@/db/type/quiz';
import { OptionChip } from '@/components/ui/OptionChip';

export function QuestionGroup({
  step,
  answers,
  onSelect,
}: {
  step: StepDef;
  answers: QuizAnswers;
  onSelect: (key: AnswerKey, value: string) => void;
}) {
  return (
    <div className="space-y-10">
      {step.questions.map(q => (
        <Question
          key={q.key}
          title={q.title}
          hints={q.hints}
          options={q.options}
          selected={answers[q.key] ?? null}
          onChange={v => onSelect(q.key, v)}
        />
      ))}
    </div>
  );
}

function Question({
  title,
  hints,
  options,
  selected,
  onChange,
}: {
  title: string;
  hints?: string[];
  options: { value: string; label: string;}[];
  selected: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="border-b border-gray-300 pt-6 text-center pb-2.5">
      <div className="mb-4">
        <h3 className="pb-5 text-3xl font-semibold">{title}</h3>
        {hints && hints.length > 0 && (
          <div className="text-base text-gray-700 space-y-1">
            {hints.map((hint, index) => (
              <p key={index}>{hint}</p>
            ))}
          </div>
        )}
      </div>     
      <div className="mt-[45px] flex items-center justify-center gap-5 overflow-x-auto mb-[75px]">
        {options.map(opt => (
          
            <OptionChip
              key={opt.value}
              label={opt.label}
              active={selected === opt.value}
              onClick={() => onChange(opt.value)}
            />

        ))}
      </div>
    </div>
  );
}
