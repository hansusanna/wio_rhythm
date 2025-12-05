import { MessageCircle, Home, Check } from 'lucide-react';

interface BottomActionsProps {
  /** 구독하기 버튼 클릭 핸들러 (없으면 버튼 숨김) */
  onSubscribe?: () => void;
  /** 카카오 공유/로그인 버튼 클릭 핸들러 (없으면 버튼 숨김) */
  onShare?: () => void;
  /** 홈으로 가기 버튼 클릭 핸들러 */
  onGoHome: () => void;
  /** 마이페이지 저장 핸들러 (선택 사항) */
  onSave?: () => void;

  /** 구독 버튼 텍스트 (기본값: 내 취향 와인 구독하기) */
  subscribeLabel?: string;
  /** 카카오 버튼 텍스트 (기본값: 카카오톡 공유하기) */
  shareLabel?: string;
  
  /** 구독 버튼 비활성화 여부 */
  isSubscribeDisabled?: boolean;
}

export function BottomActions({
  onSubscribe,
  onShare,
  onGoHome,
  onSave,
  subscribeLabel = '내 취향 와인 구독하기',
  shareLabel = '카톡으로 공유하기',
  isSubscribeDisabled = false,
}: BottomActionsProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:justify-center w-full">
      {/* 1. 카카오 버튼 (공유 또는 로그인) */}
      {onShare && (
        <button
          type="button"
          onClick={onShare}
          className="flex w-full items-center justify-center gap-2 rounded-button bg-brand-kakao py-3 text-sm font-bold text-brand-dark transition-all shadow-button hover:bg-brand-kakaoHover active:scale-[0.98] md:w-auto md:min-w-[200px] md:px-6 md:text-base"
        >
          <MessageCircle className="h-5 w-5" />
          {shareLabel}
        </button>
      )}

      {/* 2. 구독하기 버튼 (메인 액션) */}
      {onSubscribe && (
        <button
          type="button"
          onClick={onSubscribe}
          disabled={isSubscribeDisabled}
          className={`w-full rounded-button py-3 text-sm font-bold text-white transition-all shadow-button md:w-auto md:min-w-[200px] md:px-6 md:text-base
            ${isSubscribeDisabled 
              ? 'bg-ui-gray cursor-not-allowed opacity-50' 
              : 'bg-brand-primary hover:brightness-110 active:scale-[0.98]'
            }`}
        >
          {subscribeLabel}
        </button>
      )}

      {/* 3. 마이페이지 저장 버튼 (옵션) */}
      {onSave && (
        <button
          type="button"
          onClick={onSave}
          className="w-full rounded-button border border-ui-border py-3 text-sm font-semibold text-ui-textSecondary transition-all hover:bg-ui-cardBg hover:text-brand-dark active:scale-[0.98] md:w-auto md:min-w-[180px] md:px-6 md:text-base flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          마이페이지에 저장하기
        </button>
      )}

      {/* 4. 홈으로 가기 버튼 */}
      <button
        type="button"
        onClick={onGoHome}
        className="w-full rounded-button border border-ui-border py-3 text-sm font-semibold text-ui-gray transition-all hover:bg-ui-cardBg hover:text-brand-dark active:scale-[0.98] flex items-center justify-center gap-2 md:w-auto md:min-w-[180px] md:px-6 md:text-base"
      >
        <Home className="w-4 h-4" />
        처음으로 돌아가기
      </button>
    </div>
  );
}