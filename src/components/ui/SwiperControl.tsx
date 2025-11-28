import { ArrowLeftIcon, ArrowRightIcon } from './Icons'; // 1단계에서 만든 아이콘 임포트

type SwiperControlProps = {
  onPrev: () => void;
  onNext: () => void;
  isBeginning: boolean;
  isEnd: boolean;
  current: number;
  total: number;
  className?: string;
};

export function SwiperControl({
  onPrev,
  onNext,
  isBeginning,
  isEnd,
  current,
  total,
  className = '',
}: SwiperControlProps) {
  return (
    <div className={`flex items-center justify-center gap-3 text-sm ${className}`}>
      <button
        type="button"
        onClick={onPrev}
        disabled={isBeginning}
        className="text-gray-500 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-300"
        aria-label="이전"
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </button>

      <div className="flex items-center text-black">
        <span className="font-semibold text-sm">{current}</span>
        <span className="mx-1 text-gray-400">/</span>
        <span className="text-sm">{total}</span>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isEnd}
        className="text-gray-500 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-300"
        aria-label="다음"
      >
        <ArrowRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
}