// src/layout/Layout.tsx
import { Outlet } from 'react-router-dom'
import Header from '@/layout/Header'
import Foot from '@/layout/Foot'

export default function Layout() {
  return (
    // min-[840px]:justify-center   840 ~ 1023: 중앙 정렬
    // PC (min-[840px]): gap-[clamp(80px,8vw,200px)] (PC에서만 Header와 Main 사이 간격)
    <div className="min-h-screen bg-brand-primary text-white flex flex-col items-center
                   min-[840px]:flex-row min-[840px]:items-center min-[840px]:justify-center 
                   min-[840px]:gap-[clamp(48px,5vw,200px)]">
      
      {/* Header는 스스로 모바일/태블릿/PC 뷰를 결정함 */}
      <Header /> 

      {/* 기본(모바일): w-full
        태블릿 (min-[641px]): w-full. (태블릿 헤더가 sticky + w-full 이므로 main도 w-full)
        PC (min-[840px]): w-[640px] (PC 레이아웃에서만 640px 너비 고정)
      */}
      <main className="w-full min-[840px]:w-[640px]">
        <Outlet />
        <footer className="mt-12 md:mt-16 lg:mt-20">
          <Foot />
        </footer>
      </main>
    </div>
  )
}
