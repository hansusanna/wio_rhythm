// src/layout/header.tsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const base = import.meta.env.BASE_URL

const navItems = [
  { to: '/wio-rhythm', label: 'Wio Rhythm' },
  { to: '/b2b', label: 'B2B' },
  { to: '/custom', label: '맞춤 구독*' },
  { to: '/mypick', label: 'My Pick*' },
  { to: '/products', label: 'All Products' },
  { to: '/premium', label: 'Premium' },
  { to: '/rhythm-table', label: 'Rhythm Table' },
];

const linkBase = 'px-3 py-2 text-sm tracking-tight rounded-md transition hover:bg-white/10 hover:text-white';
const active = 'text-white bg-white/10';
const inactive = 'text-white/80';

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-mainColor/95 text-white">
      {/* 모바일 헤더 */}
      <header className="lg:hidden sticky top-0 z-50 bg-mainColor/95 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={`${base}images/wglass_ico.png`} className="h-6 w-6" alt="icon" />
            <img src={`${base}images/WioRhythm_logo.png`} className="h-5" alt="WioRhythm" />
          </Link>
          <button
            onClick={() => setOpen(v => !v)}
            className="p-2 rounded-md hover:bg-white/10"
            aria-label="toggle menu">
            <svg width="24" height="24" viewBox="0 0 24 24">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
        {open && (
          <nav className="px-4 pb-3 border-t border-white/10 bg-[#400A12]">
            <div className="flex flex-col gap-1 py-2">
              {navItems.map(item => (
                <NavLink key={item.to} to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? active : inactive}`
                  }>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* 데스크톱 사이드바 */}
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 w-[264px] flex-col border-r border-white/10 bg-[#3a0a0e]/95 backdrop-blur">
        <div className="h-16 flex items-center gap-2 px-4 border-b border-white/10">
          <img src={`${base}images/wglass_ico.png`} className="h-6 w-6" alt="icon" />
          <img src={`${base}images/WioRhythm_logo.png`} className="h-5" alt="WioRhythm" />
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) =>`${linkBase} block ${isActive ? active : inactive}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}
