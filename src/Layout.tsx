
import { Outlet } from 'react-router-dom'
import Header from '@/layout/Header'
import Foot from '@/layout/Foot'
import Quick from '@/layout/Quick'
// …필요 페이지들

export default function App() {
  return (
    <div className="min-h-screen bg-mainColor/95 text-white">
      <Header />

      {/* 사이드바 폭 확보 (lg↑ 264px) */}
      <main className="lg:pl-[264px]">
        <Outlet />
      </main>

      {/* 고정 사이드 고려해서 동일 패딩 */}
      <footer className="lg:pl-[264px]">
        <Foot />
      </footer>

      {/* 필요시 퀵메뉴 */}
      <Quick />
    </div>
  );
}