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
  // 공통 버튼 클래스들
  const btnBase =
    'w-full rounded-button py-3 text-sm font-semibold transition-all active:scale-[0.98] md:text-base flex items-center justify-center gap-2';
  const btnPrimaryEnabled =
    'bg-brand-primary text-white shadow-button hover:brightness-110';
  const btnPrimaryDisabled =
    'bg-ui-gray text-white cursor-not-allowed opacity-50';
  const btnSecondary =
    'border border-ui-border text-ui-textSecondary hover:bg-ui-cardBg hover:text-brand-dark';
  const btnGhost =
    'border border-ui-border text-ui-gray hover:bg-ui-cardBg hover:text-brand-dark';
  const btnKakao =
    'bg-brand-kakao text-brand-dark shadow-button hover:bg-brand-kakaoHover';

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-center w-full px-2">
      {/* 구독하기 버튼 */}
      {onSubscribe && (
        <button
          type="button"
          onClick={onSubscribe}
          disabled={isSubscribeDisabled}
          className={`${btnBase} ${
            isSubscribeDisabled ? btnPrimaryDisabled : btnPrimaryEnabled
          }`}
        >
          {subscribeLabel}
        </button>
      )}

      {/* 마이페이지 저장 버튼(옵션) */}
      {onSave && (
        <button
          type="button"
          onClick={onSave}
          className={`${btnBase} ${btnSecondary}`}
        >
          <Check className="w-4 h-4" />
          마이페이지에 저장하기
        </button>
      )}

      {/* 홈으로 가기 버튼 */}
      <button
        type="button"
        onClick={onGoHome}
        className={`${btnBase} ${btnGhost}`}
      >
        <Home className="w-4 h-4" />
        처음으로 돌아가기
      </button>

      {/* 카카오 버튼*/}
      {onShare && (
        <button
          type="button"
          onClick={onShare}
          className={`${btnBase} ${btnKakao}`}
        >
          <MessageCircle className="h-5 w-5" />
          {shareLabel}
        </button>
      )}
    </div>
  );
}