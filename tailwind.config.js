/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더 내 모든 관련 파일
  ],
  theme: {
    extend: {
       colors: {
        serve:  '#EAE3DC', // servecolor
        point:  '#570E19', // pointcolor
        wineBg: '#370910', // 배경
        text0:  '#000000', // 타이틀
        text1:  '#353535', // 기본 본문
        disable:'#E2E2E2', // 비활성 버튼
      },
      fontFamily: {
        display: ['"Kaushan Script"', 'system-ui', 'sans-serif'], // my pick
        en: ['Caudex', 'serif'],
        ko: ['Pretendard Variable', 'Pretendard', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'mypick': '104.313px',
      },
      // line-height 토큰 (국문 기본 198.5%)
      lineHeight: {
        ko: '1.985',
      },
      letterSpacing: {
        tight: '-0.01em',
      },
      borderRadius: {
        xl2: '1rem', // 카드/버튼 둥근 모서리 맛
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}

