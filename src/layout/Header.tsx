// src/layout/header.tsx
import React, {useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import WineGlassIcon from '@/assets/wglass_ico.svg?react';
import axios from 'axios';
interface NaviItem {
  title: string;
  link: string;
}

const base = import.meta.env.BASE_URL

export default function Header() {
  const [ navidata, setNavi ] = useState<NaviItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchNaviData = async () => {
      try {
        const response = await axios.get(`${base}db/navi.xml`, {
          headers: { 'Content-Type': 'application/xml' },
        });
  
        const parser = new DOMParser(); //XML 파서 생성
        const xml = parser.parseFromString(response.data, 'application/xml');
        const items = Array.from(xml.getElementsByTagName('item'));

        //js 객채로 변환
       const parsed: NaviItem[] = items.map(item => ({
          title: item.getElementsByTagName('title')[0]?.textContent || '',
          link: item.getElementsByTagName('link')[0]?.textContent || '',
        }));

        setNavi(parsed); //navidata 상태 업데이트

      } catch (error) {
        console.error('Error fetching navigation data:', error);
      } finally {
        setLoading(false); // 로딩완료
      }
    };

    fetchNaviData();
  }, []); //  컴포넌트 마운트 시 1회 진행 

  const Logo = () => (
    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
      <WineGlassIcon className="h-6 w-6 text-white" aria-hidden="true" />
      {/* 웹 폰트 로고 적용 */}
      W<span className="text-ui-gray">io</span>
          R<span className="text-ui-gray">hythm</span>
    </Link>
  );

  // 모바일/PC에서 공통으로 사용할 네비게이션 마크업
  const renderNavLinks = (isMobile: boolean = false) => (
    <ul className={`flex flex-col ${isMobile ? 'gap-1' : 'gap-1.5'}`}>
      {loading ? (
        // 로딩 스켈레톤 UI
        Array.from({ length: 5 }).map((_, idx) => (
          <li key={idx} className="h-8 bg-white/5 rounded-md animate-pulse" />
        ))
      ) : (
        navidata.map((item) => (
          <li key={item.link}>
            <NavLink
              to={item.link}
              // NavLink와 Tailwind로 'active' 상태 스타일링
              className={({ isActive }) =>
                `flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150
                ${
                  isActive
                    ? 'bg-brand-primary text-white' // 활성 상태
                    : 'text-zinc-300 hover:bg-white/10 hover:text-white' // 비활성 상태
                }`
              }
              // 모바일에서 링크 클릭 시 메뉴 닫기
              onClick={isMobile ? () => setMobileMenuOpen(false) : undefined}
            >
              {item.title}
              {/* 예: My Pick에만 아이콘 추가 (옵션) */}
              {item.title === 'My Pick' && (
                <span className="ml-auto text-xs text-brand-accent">●</span>
              )}
            </NavLink>
          </li>
        ))
      )}
    </ul>
  );

 return (
    <>
      {/* 모바일 헤더 (lg:hidden) */}
      <header className="hidden max-[640px]:block sticky top-0 z-50 backdrop-blur-sm border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          <Logo />
          <button
            onClick={() => setMobileMenuOpen(v => !v)}
            className="p-2 rounded-md hover:bg-white/10"
            aria-label="메뉴 토글"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {isMobileMenuOpen && (
          <nav className="px-4 py-3 border-t border-white/10 bg-[#400A12]">
            <div className="sm:text-base text-sm">{renderNavLinks(true)}</div>
          </nav>
        )}
      </header>

      {/* PC 헤더 네비 */}
      <aside className="hidden min-[641px]:flex w-full">
        <div className="min-w-[590px] max-w-[740px] w-full">
          {/* 중앙(640) + 간격(200)만큼 우측으로 빼고, 카드 폭만큼 좌측 보정 */}
          <div className="w-[360px] bg-black/20 backdrop-blur p-6 shadow-soft">
            <div className="mb-6"><Logo /></div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold">평범함을 특별한 순간으로</h1>
              <p className="text-sm text-white/80 mt-2">
                매달 찾아오는 와인처럼, 당신의 <span className="font-semibold">바이오 리듬에 와인</span>을 더하세요.
              </p>
            </div>
            <nav className="flex-1 overflow-y-auto space-y-1">
              {renderNavLinks(false)}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}