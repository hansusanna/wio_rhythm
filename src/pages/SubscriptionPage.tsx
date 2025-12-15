// src/pages/SubscriptionPage.tsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Wine as WineIcon } from 'lucide-react';
import type { Wine } from '@/db/type/wine';
import { WineCard } from '@/components/ui/WineCard';
import { BottomActions } from '@/components/ui/BottomActions'; 

export default function SubscriptionPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const matchedWines: Wine[] = location.state?.matchedWines || [];

  const [selectedPlan, setSelectedPlan] = useState<'BASIC' | 'PREMIUM'>('BASIC');
  const [selectedWineId, setSelectedWineId] = useState<string | number | null>(null);

  const displayWines = matchedWines
    .filter((wine) => {
      const price = wine.salePrice ?? 0;
      if (selectedPlan === 'BASIC') return price <= 40000;
      return price <= 60000;
    })
    .slice(0, 4);

     // 핸들러 함수 정의
  const handleGoHome = () => navigate('/');
  
  const handleSubscribe = () => {
    // 실제 구독 로직 구현 (예: 결제 페이지 이동 등)
    if (selectedWineId) {
      alert('구독 신청이 완료되었습니다! (추후 결제 연동)');
    }
  };

  const handleKakaoLogin = () => {
    // 카카오 로그인/연동 로직
    alert('카카오 계정 연동 기능 준비중입니다.');
  };

  return (
    <main className="min-h-screen bg-brand-primary">
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        {/* 화이트 카드 */}
        <div className="mx-auto max-w-[1000px] bg-white px-4 py-10 shadow-card md:px-10">
          
          {/* 상단 헤더 */}
          <header className="mb-10 text-left">
            <div className="inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-1 text-xs font-medium text-brand-primary mb-3 border border-brand-primary/20">
              Wio Rhythm Membership
            </div>
            <h1 className="text-2xl font-semibold md:text-3xl text-brand-dark">
              멤버십 구독 플랜
            </h1>
            <p className="mt-2 text-sm text-ui-gray">
              나에게 딱 맞는 플랜과 첫 달 와인을 선택해보세요.
            </p>
          </header>

          {/* 플랜 선택 영역 */}
          <section className="mb-12 flex flex-col gap-5">
            {/* BASIC 플랜 */}
            <div
              onClick={() => {
                setSelectedPlan('BASIC');
                setSelectedWineId(null);
              }}
              className={`rounded-card p-6 border cursor-pointer transition-all
                ${
                  selectedPlan === 'BASIC'
                    ? 'border-brand-accent bg-brand-accent/5 shadow-cardHover'
                    : 'border-ui-border hover:border-brand-accent/40 hover:bg-brand-accent/5'
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      selectedPlan === 'BASIC' ? 'text-brand-accent' : 'text-brand-dark'
                    }`}
                  >
                    Basic Plan
                  </h3>
                  <p className="text-sm text-ui-textMuted">가볍게 시작하는 데일리 와인</p>
                </div>
                {selectedPlan === 'BASIC' && (
                  <div className="bg-brand-accent text-white rounded-full p-1 shadow-button">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              <p className="mt-4 text-2xl font-bold text-brand-dark">월 39,000원</p>

              <ul className="mt-4 space-y-2 text-sm text-ui-textSecondary bg-ui-cardBg/50 rounded-card p-4 border border-ui-border">
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-brand-accent" />
                  매월 와인 1병 + 무료 배송
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-brand-accent" />
                  5% 포인트 적립
                </li>
                <li className="text-xs text-ui-textMuted pl-6">※ 4만원 이하 와인 선택 가능</li>
              </ul>
            </div>

            {/* PREMIUM 플랜 */}
            <div
              onClick={() => {
                setSelectedPlan('PREMIUM');
                setSelectedWineId(null);
              }}
              className={`rounded-card p-6 border cursor-pointer transition-all
                ${
                  selectedPlan === 'PREMIUM'
                    ? 'border-brand-accent bg-brand-accent/5 shadow-cardHover'
                    : 'border-ui-border hover:border-brand-accent/40 hover:bg-brand-accent/5'
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      selectedPlan === 'PREMIUM'
                        ? 'text-brand-accent'
                        : 'text-brand-dark'
                    }`}
                  >
                    Premium Plan
                  </h3>
                  <p className="text-sm text-ui-textMuted">더 풍성하게 즐기는 미식 생활</p>
                </div>
                {selectedPlan === 'PREMIUM' && (
                  <div className="bg-brand-accent text-white rounded-full p-1 shadow-button">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              <p className="mt-4 text-2xl font-bold text-brand-dark">월 59,000원</p>

              <ul className="mt-4 space-y-2 text-sm text-ui-textSecondary bg-ui-cardBg/50 rounded-card p-4 border border-ui-border">
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-brand-accent" />
                  와인 1병 + 랜덤 1병 (무료 배송)
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-brand-accent" />
                  10% 포인트 적립
                </li>
                <li className="text-xs text-ui-textMuted pl-6">※ 6만원 이하 와인 선택 가능</li>
              </ul>
            </div>
          </section>

          {/* 와인 선택 리스트 */}
          <section className="mb-12">
            <div className="mb-4 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
              <h3 className="text-lg font-bold flex items-center text-brand-dark md:text-xl">
                <WineIcon className="w-5 h-5 mr-2 text-brand-accent" />
                첫 달 받아보실 와인 선택
              </h3>
            </div>

            {displayWines.length === 0 ? (
              <div className="text-center py-10 rounded-card border border-ui-border bg-ui-cardBg/30">
                <p className="text-ui-gray text-sm">
                  현재 선택하신 플랜에 맞는 추천 와인이 없어요.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-3">
                {displayWines.map((wine) => (
                  <div
                    key={wine.id}
                    className={`w-full cursor-pointer ${
                      selectedWineId === wine.id
                        ? 'ring-2 ring-brand-accent ring-offset-2 ring-offset-white'
                        : 'hover:ring-2 hover:ring-brand-accent/40 hover:ring-offset-2 hover:ring-offset-white'
                    }`}
                    onClick={() => setSelectedWineId(wine.id)}
                  >
                    <WineCard
                      wine={wine}
                      showPrice={false}
                      className="h-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* CTA 버튼 */}
           <footer className="mt-6 border-t border-ui-border pt-8">
            <BottomActions
              onSubscribe={handleSubscribe}
              onShare={handleKakaoLogin}
              onGoHome={handleGoHome}
              subscribeLabel={selectedWineId ? '이 와인으로 구독 시작' : '와인을 선택해주세요'}
              shareLabel="카카오로 3초 만에 시작하기"
              isSubscribeDisabled={!selectedWineId}
            />
          </footer>
        </div>
      </section>
    </main>
  );
}
