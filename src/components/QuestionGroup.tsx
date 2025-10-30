// src/components/QuestionGroup.tsx
import type { QuizAnswers, AnswerKey, StepDef } from '@/db/type/quiz';

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
      <div className="flex flex-wrap gap-10">
        <div className="flex flex-wrap gap-8">
          {options.map(opt => (
            <OptionChip
              key={opt.value}
              label={opt.label}
              hint={opt.hint}
              isActive={selected === opt.value}
              onClick={() => onChange(opt.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OptionChip({
  label,
  hint,
  isActive,
  onClick,
}: {
  label: string;
  hint?: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={[
        'rounded-xl px-4 py-2 border text-sm transition',
        isActive
          ? 'bg-white text-mainColor border-white'
          : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/15',
      ].join(' ')}
    >
      <span className="font-medium">{label}</span>
      {hint && <span className="ml-2 text-xs opacity-75">({hint})</span>}
    </button>
  );
}
