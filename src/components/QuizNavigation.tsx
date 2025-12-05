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
    <div className="mt-md flex flex-col items-center">
        <button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className={[
          'w-full flex-col rounded-button px-button py-button font-semibold transition',
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
        className="px-button py-3 font-semibold text-ui-gray hover:text-black"
        aria-label="처음으로"
      >
        처음으로
      </button>
      
    </div>
  );
}
