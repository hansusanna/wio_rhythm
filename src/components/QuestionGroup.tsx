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
  options,
  selected,
  onChange,
}: {
  title: string;
   options: { value: string; label: string; hint?: string }[];
  selected: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="border-t border-white/15 pt-6">
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      <div className="flex items-center gap-4 overflow-x-auto">
        {options.map(opt => (
          
            <OptionChip
              key={opt.value}
              label={opt.label}
              hint={opt.hint}
              active={selected === opt.value}
              onClick={() => onChange(opt.value)}
            />

        ))}
      </div>
    </div>
  );
}
