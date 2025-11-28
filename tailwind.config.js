/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // src 폴더 내 모든 관련 파일
  ],
  theme: {
    screens: { 
      sm: '480px',    // Mobile
      md: '768px',    // Tablet
      lg: '1080px',   // Laptop
      xl: '1440px',   // Desktop
    },
    extend: {
      colors: {
        // 1.브랜드
        brand: {
          primary: '#370910', // mainColor
          accent: '#570E19',   // red
          disabled: '#E2E2E2' , // 비활성화
          dark: '#220D0C',    // footer
        },
        // 2.UI요소 색상
        ui: {
          btnbg: '#EAE3DC',  // 퀴즈버튼
          border: '#DDCFD1',       // barcolor
          gray: '#838383',         //gray (기본 gray와 톤이 다름)
        },
        // 3.테마색상(뱃지,메뉴 등)
        semantic: {
          new: '#CBAB85',    // newBadge/newMenu
          event: {
            DEFAULT: '#85AACB', // eventMenu
            light: '#B6D3EF',   // eventBadge
          },
          best: {
            DEFAULT: '#DC9BA5', // bestMenu
            light: '#EAC9CE',   // bestBadge
          },
          rwine: '#292522', // RwineBadge
          nextbtn: '#e2e2e2',
        },
      },
      fontFamily: {
        logo : ['"La Belle Aurore"', 'cursive'],
        mypick: ['"Kaushan Script"', 'system-ui', 'sans-serif', 'cursive'], // my pick
        ko: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        en: ['Caudex', 'serif'],
      },
      fontSize: {
        picktit:['128px', {
          lineHeight: '1',
        }],
        tit: ['var(--ty-tit-size)', {
          lineHeight: 'var(--ty-tit-lineh)',
        }],
        subtit:'var(--ty-sub-size)',
        body: ['var(--ty-body-size)', {
          lineHeight: 'var(--ty-body-lineh)',
        }],
        h2:'var(--ty-h2-size)',
        findtit:'var(--ty-findtit-size)',
      },
      fontWeight: {
        extralight: '200',
        extrabold: '800',
      }, 
      spacing: {
        xl: 'var(--sp-xl)', // 1440px 기준 64px
        lg: 'var(--sp-lg)', // 1440px 기준 32px
        md: 'var(--sp-md)', // 1440px 기준 16px
        sm: 'var(--sp-sm)', // 1440px 기준 8px
      }, 
  
      letterspacing: {
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

