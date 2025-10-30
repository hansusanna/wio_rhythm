// src/pages/TasteQuiz.tsx
import { useState } from 'react';
import type { QuizAnswers, AnswerKey, StepDef } from '@/db/type/quiz';
import StepDefs from '@/db/quizDefs.json';
import { QuestionGroup } from '@/components/QuestionGroup';
import { QuizNavigation } from '@/components/QuizNavigation';

type Props = {
  onCancelToMain: () => void;                 // "처음으로" 클릭
  onComplete: (answers: QuizAnswers) => void; // 결과보기 시 상위로 lift-up
};

const STEP_DEFS = StepDefs as StepDef[];

export default function TasteQuiz({ onCancelToMain, onComplete }: Props) {
  const [stepIdx, setStepIdx] = useState(0); // 0..2
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const step = STEP_DEFS[stepIdx];
  const isLast = stepIdx === STEP_DEFS.length - 1;

  // 현재 스텝의 두 질문 key
  const [q1, q2] = step.questions.map(q => q.key);
  const bothAnswered = Boolean(answers[q1] && answers[q2]);

  const handleSelect = (key: AnswerKey, v: string) => {
    setAnswers(prev => ({ ...prev, [key]: v }));
  };

  const next = () => {
    if (!bothAnswered) return;
    if (isLast) {
      onComplete(answers);
    } else {
      setStepIdx(i => i + 1);
    }
  };

  const resetToMain = () => onCancelToMain();

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <QuizHeader current={stepIdx + 1} total={STEP_DEFS.length} />
      <QuestionGroup
        step={step}
        answers={answers}
        onSelect={handleSelect}
      />
      <QuizNavigation
        isLast={isLast}
        canProceed={bothAnswered}
        onNext={next}
        onCancel={resetToMain}
      />
    </section>
  );
}

function QuizHeader({ current, total }: { current: number; total: number }) {
  return (
    <header className="mb-6">
      <p className="text-sm text-white/70">나에게 딱 맞는 와인이 궁금하다면?</p>
      <div className="mt-2 text-3xl font-bold">
        <span className="text-white">{current}</span>
        <span className="text-white/60 text-xl align-top">/{total}</span>
      </div>
    </header>
  );
}
