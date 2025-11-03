import { Outlet } from 'react-router-dom';
import Header from '@/layout/Header';
import Foot from '@/layout/Foot';
// import Quick from '@/layout/Quick'

export default function Layout() {
  return (
    <div className="min-h-screen bg-brand-primary text-white flex flex-col">
      {/* Header는 항상 렌더 → ≤640에서 햄버거, ≥641에서 좌측 네비를 Header 내부에서 제어 */}
      <Header />

      <main className="flex-1">
        <div className="w-full mx-auto px-4 sm:px-6 xl:px-8 py-12">
          <div className="grid grid-cols-1 min-[641px]:grid-cols-[minmax(590px,1fr)_640px_1fr] min-[641px]:gap-[200px] items-start">
            {/* 1열(≥641px): 좌측 네비 자리. Header 내부의 PC용 aside가 여기 영역을 사용 */}
            <div className="hidden min-[641px]:block" />

            {/* 2열: 중앙 640px 패널 */}
            <section className="justify-self-center">
              <Outlet />
            </section>

            {/* 3열: 우측 AUTO 여백 */}
            <div className="hidden min-[641px]:block" />
          </div>
        </div>
      </main>

      {/* 콘텐츠가 짧을 때 바닥에 밀착 */}
      <footer className="mt-auto">
        <Foot />
      </footer>

      {/* <Quick /> */}
    </div>
  );
}
