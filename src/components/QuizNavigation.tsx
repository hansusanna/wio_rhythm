// src/components/QuizNavigation.tsx
export function QuizNavigation({
  isLast,
  canProceed,
  onNext,
  onCancel,
}: {
  isLast: boolean;
  canProceed: boolean;
  onNext: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
        <button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className={[
          'w-full flex-col rounded-[0.30rem] px-4 py-5 font-semibold transition text-lg',
          canProceed
            ? 'bg-brand-accent text-white border-brand-accent hover:opacity-90'
            : 'bg-brand-disabled text-brand-accent border-brand-accent cursor-not-allowed',
        ].join(' ')}
      >
        {isLast ? '결과보기' : '다음'}
      </button>
      
        <button
        type="button"
        onClick={onCancel}
        className="px-4 py-3 font-semibold text-black/50 hover:text-black"
        aria-label="처음으로"
      >
        처음으로
      </button>
      
    </div>
  );
}
