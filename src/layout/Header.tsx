// src/layout/header.tsx
import React, {useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import WineGlassIcon from '@/assets/wglass_ico.svg?react';
import axios from 'axios';
interface NaviItem {
  title: string;
  link: string;
  lang?: 'ko' | 'en';
  external: boolean;
}

type HeaderProps = {
  onStartQuiz?: () => void;
};
const base = import.meta.env.BASE_URL

export default function Header({ onStartQuiz }: HeaderProps) {
  const [ navidata, setNavi ] = useState<NaviItem[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ isMenuOpen, setMenuOpen ] = useState(false);

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
       const parsed: NaviItem[] = items.map((item) => {
          const externalText = item
            .getElementsByTagName('external')[0]
            ?.textContent?.trim();

          return {
            title: item.getElementsByTagName('title')[0]?.textContent || '',
            link: item.getElementsByTagName('link')[0]?.textContent || '',
            lang:
              (item.getElementsByTagName('lang')[0]?.textContent?.trim() as
                | 'ko'
                | 'en') || undefined,
            external: externalText === 'true',
          };
        });

        setNavi(parsed);
      } catch (error) {
        console.error('Error fetching navigation data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNaviData();
  }, []); //  컴포넌트 마운트 시 1회 진행  

   // className 프롭을 받아 반응형 크기 등을 외부에서 제어
  const Logo = ({ className = '' }: { className?: string }) => (
    <Link to="/" className={`inline-flex items-baseline ${className}`} aria-label="WioRhythm 홈으로 이동">
      <WineGlassIcon aria-hidden="true" className='wineicon' />
      {/* PC(5xl)와 모바일/태블릿(4xl) 폰트 크기 분리 
        (PC 헤더는 min-[840px]:block 이므로 5xl이 적용되고,
         모바일 헤더는 min-[840px]:hidden 이므로 4xl이 적용됨)
      */}
      <span className={`text-white font-normal font-logo ${
         // PC(aside)에서는 5xl, 모바일/태블릿(header)에서는 4xl
         className.includes('pc-logo') ? 'text-5xl' : 'text-4xl'
      }`}>
        W<span className="text-ui-gray font-logo">io</span>
        R<span className="text-ui-gray font-logo">hythm</span>
      </span>
    </Link>
  );

  // className 프롭을 받아 반응형 크기 등을 외부에서 제어
  const LogoDark = ({ className = '' }: { className?: string }) => (
    <Link to="/" className={`inline-flex items-baseline ${className}`} aria-label="WioRhythm 홈으로 이동">
      <WineGlassIcon aria-hidden="true" className="text-brand-primary wineicon" />
      {/* 흰색 패널 내부 로고 (모바일 3xl, 태블릿 4xl) */}
      <span className="text-brand-primary font-normal text-3xl font-logo">
        W<span className="text-ui-gray font-logo">io</span>
        R<span className="text-ui-gray font-logo">hythm</span>
      </span>
    </Link>
  );

  // 햄버거/닫기 아이콘
  const HamburgerIcon = ({ isOpen, iconColor = "black" }: { isOpen: boolean, iconColor?: string }) => (
    <svg width="24" height="24" stroke={iconColor} strokeWidth="3" strokeLinecap="round">
      {isOpen ? (
        <path d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path d="M1 6h22M1 12h22M1 18h22" />
      )}
    </svg>
  );

  const badgeLinks = new Set(['/mypick', '/subscribe']); 

  // 네비게이션 링크 렌더링 함수
  const renderNavLinks = (
    isMobile: boolean = false,
    isWhiteBg: boolean = false,
    onStartQuiz?: () => void
  ) => (
    <ul className={`flex flex-col ${isMobile ? 'gap-1' : 'gap-1.5'}`}>
      {loading ? (
        Array.from({ length: 5 }).map((_, idx) => (
          <li
            key={idx}
            className={`h-8 rounded-md animate-pulse ${
              isWhiteBg ? 'bg-gray-200' : 'bg-white/5'
            }`}
          />
        ))
      ) : (
        navidata.map((item) => {
          const isExternal = item.external || item.link.startsWith('http');
          const isMyPick = item.link === '/mypick';

          const closeMobileMenu = () => {
            if (isMobile) setMenuOpen(false);
          };

          const inactiveClass = isWhiteBg
            ? 'text-neutral-800 hover:bg-neutral-100'
            : 'text-white hover:bg-white/10';

          const Label = ({ isActive }: { isActive: boolean }) => (
            <span className="relative inline-block">
              <span lang={item.lang ?? 'ko'}>{item.title}</span>
              {badgeLinks.has(item.link) && (
                <span
                  className={`absolute -top-0 -right-3 z-10 leading-none text-[10px] ${
                    isActive ? 'text-white' : isWhiteBg ? 'text-brand-primary' : 'text-white'
                  }`}
                  aria-hidden="true"
                >
                  ●
                </span>
              )}
            </span>
          );

          // 외부 링크: <a target="_blank">
          if (isExternal) {
            return (
              <li key={item.link}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1 [font-size:var(--ty-navi-size)] font-normal transition-colors duration-150 ${inactiveClass}`}
                  onClick={closeMobileMenu}
                >
                  <Label isActive={false} />
                </a>
              </li>
            );
          }

          // 내부 링크
          return (
            <li key={item.link}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `flex w-full items-center gap-2 rounded-md px-2 py-1 [font-size:var(--ty-navi-size)] font-normal transition-colors duration-150
                  ${
                    isActive
                      ? 'bg-brand-primary text-white'
                      : isWhiteBg
                      ? 'text-neutral-800 hover:bg-neutral-100'
                      : 'text-white hover:bg-white/10'
                  }`
                }
                onClick={(e) => {
                  if (isMyPick && onStartQuiz) {
                    e.preventDefault();
                    onStartQuiz();
                  }
                  closeMobileMenu();
                }}
              >
                {({ isActive }) => <Label isActive={isActive} />}
              </NavLink>
            </li>
          );
        })
      )}
    </ul>
  );

  return (
    <>
      {/* MOBILE + TABLET HEADER (< 840px)*/}
      <header className="sticky top-0 z-50 w-full bg-brand-primary border-b border-white/10 min-[840px]:hidden">
        <div className="mx-auto px-4 min-[641px]:px-6 h-14 flex items-center justify-between">
          <Logo />

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 rounded-md hover:bg-white/10"
            aria-label="메뉴 토글"
          >
            <HamburgerIcon isOpen={isMenuOpen} iconColor="white" />
          </button>
        </div>

        <aside
          className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-all duration-300
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-3/4 max-w-sm h-full bg-white text-neutral-900 p-4 min-[641px]:p-6 shadow-soft flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <LogoDark />
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="메뉴 닫기"
              >
                <HamburgerIcon isOpen={true} iconColor="black" />
              </button>
            </div>

            <nav className="overflow-y-auto">{renderNavLinks(true, true, onStartQuiz)}</nav>
          </div>
        </aside>
      </header>

      {/* PC HEADER / LEFT ASIDE */}
      <aside className="hidden min-[840px]:block z-40 w-[clamp(250px,41vw,590px)]">
        <div className="p-4 md:p-6 lg:p-0">
          <div className="mb-6 md:mb-[70px]">
            <Logo className="pc-logo" />
          </div>

          <div className="mb-8 md:mb-20">
            <h1 className="text-tit font-maru font-bold mb-6">평범함을 특별한 순간으로</h1>
            <h2 className="text-subtit text-white font-extralight">
              매달 찾아오는 와인처럼, 당신의 <span className="font-semibold">바이오리듬에 와인</span>을 더하세요.
            </h2>
          </div>

          <nav>{renderNavLinks(false, false, onStartQuiz)}</nav>
        </div>
      </aside>
    </>
  );
}