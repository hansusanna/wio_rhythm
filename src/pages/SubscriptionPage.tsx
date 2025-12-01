// src/pages/SubscriptionPage.tsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, Wine as WineIcon, MessageCircle, Home } from 'lucide-react';
import type { Wine } from '@/db/type/wine';
import { WineCard } from '@/components/ui/WineCard';

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

  return (
    <main className="min-h-screen bg-brand-primary">
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        {/* 화이트 카드 */}
        <div className="mx-auto max-w-[1000px] bg-white px-4 py-10 shadow-lg md:px-10">
          
          {/* 상단 헤더 */}
          <header className="mb-10 text-left">
            <div className="inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-1 text-xs font-medium text-brand-primary mb-3 border border-brand-primary/20">
              Wio Rhythm Membership
            </div>
            <h1 className="text-2xl font-semibold md:text-3xl text-slate-900">
              멤버십 구독 플랜
            </h1>
            <p className="mt-2 text-sm text-slate-600">
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
              className={`rounded-2xl p-6 border cursor-pointer transition-all
                ${
                  selectedPlan === 'BASIC'
                    ? 'border-brand-accent bg-brand-accent/5 shadow-[0_0_12px_rgba(200,40,40,0.25)]'
                    : 'border-slate-200 hover:border-brand-accent/40 hover:bg-brand-accent/5'
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      selectedPlan === 'BASIC' ? 'text-brand-accent' : 'text-slate-900'
                    }`}
                  >
                    Basic Plan
                  </h3>
                  <p className="text-sm text-slate-500">가볍게 시작하는 데일리 와인</p>
                </div>
                {selectedPlan === 'BASIC' && (
                  <div className="bg-brand-accent text-white rounded-full p-1 shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              <p className="mt-4 text-2xl font-bold text-slate-900">월 39,000원</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-700 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-brand-accent" />
                  매월 와인 1병 + 무료 배송
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-brand-accent" />
                  5% 포인트 적립
                </li>
                <li className="text-xs text-slate-500 pl-6">※ 4만원 이하 와인 선택 가능</li>
              </ul>
            </div>

            {/* PREMIUM 플랜 */}
            <div
              onClick={() => {
                setSelectedPlan('PREMIUM');
                setSelectedWineId(null);
              }}
              className={`rounded-2xl p-6 border cursor-pointer transition-all
                ${
                  selectedPlan === 'PREMIUM'
                    ? 'border-brand-accent bg-brand-accent/5 shadow-[0_0_12px_rgba(200,40,40,0.25)]'
                    : 'border-slate-200 hover:border-brand-accent/40 hover:bg-brand-accent/5'
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className={`text-lg font-bold ${
                      selectedPlan === 'PREMIUM'
                        ? 'text-brand-accent'
                        : 'text-slate-900'
                    }`}
                  >
                    Premium Plan
                  </h3>
                  <p className="text-sm text-slate-500">더 풍성하게 즐기는 미식 생활</p>
                </div>
                {selectedPlan === 'PREMIUM' && (
                  <div className="bg-brand-accent text-white rounded-full p-1 shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              <p className="mt-4 text-2xl font-bold text-slate-900">월 59,000원</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-700 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-brand-accent" />
                  와인 1병 + 랜덤 1병 (무료 배송)
                </li>
                <li className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-brand-accent" />
                  10% 포인트 적립
                </li>
                <li className="text-xs text-slate-500 pl-6">※ 6만원 이하 와인 선택 가능</li>
              </ul>
            </div>
          </section>

          {/* 와인 선택 리스트 */}
          <section className="mb-12">
            <div className="mb-4 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
              <h3 className="text-lg font-bold flex items-center text-slate-900 md:text-xl">
                <WineIcon className="w-5 h-5 mr-2 text-brand-accent" />
                첫 달 받아보실 와인 선택
              </h3>
            </div>

            {displayWines.length === 0 ? (
              <div className="text-center py-10 rounded-xl border border-slate-300 bg-slate-50">
                <p className="text-slate-500 text-sm">
                  현재 선택하신 플랜에 맞는 추천 와인이 없어요.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
                      isLiked={false}
                      onToggleLike={() => null}
                      className="h-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* CTA 버튼 */}
          <footer className="mt-6 border-t border-slate-200 pt-8">
            <div className="flex flex-col gap-3 md:flex-row md:justify-center">
              {/* 구독 버튼 */}
              <button
                className="w-full rounded-md bg-brand-primary py-3 text-sm font-bold text-white shadow-md hover:brightness-110 active:scale-[0.98] md:w-auto md:min-w-[200px]"
                disabled={!selectedWineId}
              >
                {selectedWineId ? '이 와인으로 구독 시작' : '와인을 선택해주세요'}
              </button>

              {/* 카카오 버튼 */}
              <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#FEE500] py-3 text-sm font-bold text-black hover:bg-[#FDD835] active:scale-[0.98] md:w-auto md:min-w-[220px]">
                <MessageCircle className="w-5 h-5" />
                카카오로 3초 만에 시작하기
              </button>

              {/* 홈 이동 */}
              <button
                onClick={() => navigate('/')}
                className="w-full rounded-md border border-slate-300 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 active:scale-[0.98] flex items-center justify-center gap-2 md:w-auto md:min-w-[180px]"
              >
                <Home className="w-4 h-4" />
                처음으로 돌아가기
              </button>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
