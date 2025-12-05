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
    <div className="border-b border-border-default pt-lg text-center pb-md">
      <div className="mb-4">
        <h3 className="pb-5 text-h3 font-semibold">{title}</h3>
        {hints && hints.length > 0 && (
          <div className="text-body text-ui-textSecondary space-y-0.5">
            {hints.map((hint, index) => (
              <p key={index} className="leading-tight">{hint}</p>
            ))}
          </div>
        )}
      </div>     
      <div className="mt-section flex items-center justify-center gap-5 overflow-x-auto mb-section">
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
