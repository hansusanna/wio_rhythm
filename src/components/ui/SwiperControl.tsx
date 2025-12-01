import { ChevronLeft, ChevronRight } from 'lucide-react'; // 라이브러리 임포트

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
        className="p-1 text-gray-500 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-300 transition-colors"
        aria-label="이전"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex items-center text-black font-medium select-none">
        <span className="text-xs">{current}</span>
        <span className="mx-1 text-gray-300">/</span>
        <span className="text-xs text-gray-400">{total}</span>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isEnd}
        className="p-1 text-gray-500 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-300 transition-colors"
        aria-label="다음"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}