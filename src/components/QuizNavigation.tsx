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
    <div className="mt-8 flex gap-3">
      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className={[
          'flex-1 rounded-xl px-4 py-3 font-semibold transition',
          canProceed
            ? 'bg-white text-mainColor hover:opacity-90'
            : 'bg-white/20 text-white/60 cursor-not-allowed',
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
