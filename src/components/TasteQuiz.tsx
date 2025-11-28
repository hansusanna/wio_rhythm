// src/pages/TasteQuiz.tsx
import { useState } from 'react';
import type { QuizAnswers, AnswerKey, StepDef } from '@/db/type/quiz';
import StepDefs from '@/db/quizDefs.json';
import { QuestionGroup } from '@/components/QuestionGroup';
import { QuizNavigation } from '@/components/QuizNavigation';
import WineGlassIcon from '@/assets/wglass_ico.svg?react';

type Props = {
  onCancelToMain: () => void;                 // "처음으로" 클릭
  onComplete: (answers: QuizAnswers) => void; // 결과보기 
};

const STEP_DEFS = StepDefs as StepDef[];

export default function TasteQuiz({ onCancelToMain, onComplete }: Props) {
  const [stepIdx, setStepIdx] = useState(0); // 0..2
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const step = STEP_DEFS[stepIdx];
  const isLast = stepIdx === STEP_DEFS.length - 1;

  // 현재 스텝의 두 질문 key
  const [q1, q2] = step.questions.map(q => q.key);
  const bothAnswered = Boolean(answers[q1] && answers[q2]); //2개 고정 일때
// const bothAnswered = step.questions.every(q => !!answers[q.key]); 
// 나중에 3개, 1개가 될 수도 있다?로 하면 “현재 step의 모든 질문에 답했는가?”로 의미가 더 명확 > 추후 수정원하면 변경

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
    <section className="mx-auto max-w-3xl px-4 py-6 text-black bg-white">
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
    <header>
      <p className="mt-6 text-xl mb-10 flex items-center text-[#353535] font-normal tracking-[-0.03em]"><WineGlassIcon className="mx-2 w-8 h-8" />나에게 딱 맞는 와인이 궁금하다면?</p>
      <div className="mt-10 font-normal flex justify-center items-baseline">
        <span className="text-3xl text-brand-accent tracking-[0.18rem]">{current}</span>
        <span className="text-lg tracking-[0.1rem]">/{total}</span>
      </div>
    </header>
  );
}
