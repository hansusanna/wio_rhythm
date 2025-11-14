// src/Layout.tsx
import { useState } from 'react';
import type { ViewMode, QuizAnswers } from '@/db/type/quiz';
import Header from '@/layout/Header'
import MainSection from '@/pages/MainSection';
import Foot from '@/layout/Foot'

export default function Layout() {
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});

  const isQuizMode = viewMode === 'quiz';

  return (
    // min-[840px]:justify-center   840 ~ 1023: 중앙 정렬
    // PC (min-[840px]): gap-[clamp(80px,8vw,200px)] (PC에서만 Header와 Main 사이 간격)
    <div className="min-h-screen bg-brand-primary text-white flex flex-col items-center
                   min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-center 
                   min-[840px]:gap-[clamp(48px,5vw,200px)]">
      
      {/* Header는 스스로 모바일/태블릿/PC 뷰를 결정함 */}
      <header
        className={
          'stransition ' +
          (isQuizMode ? 'opacity-40 pointer-events-none' : '')
        }
      >
          <Header /> 
      </header>

      {/* 딤 레이어 (네비/배경용) */}
      {isQuizMode && (
        <div className="pointer-events-none fixed inset-0 z-20 bg-black/30" />
      )}

      {/* 기본(모바일): w-full
        태블릿 (min-[641px]): w-full. (태블릿 헤더가 sticky + w-full 이므로 main도 w-full)
        PC (min-[840px]): w-[640px] (PC 레이아웃에서만 640px 너비 고정)
      */}
      <main className={'w-full min-[840px]:w-[640px] ' + (isQuizMode ? 'relative z-30' : '')}>
        <MainSection
          viewMode={viewMode}
          setViewMode={setViewMode}
          quizAnswers={quizAnswers}
          setQuizAnswers={setQuizAnswers}
        />
        <footer className="mt-12 md:mt-16 lg:mt-20">
          <Foot />
        </footer>
      </main>
    </div>
  )
}
