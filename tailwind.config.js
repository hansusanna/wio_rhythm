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
        mainColor: '#570E19',
        basicColor: '#000',
        serveColor1: '#F5F5F5',
        serveColor2: '#EAE3DC',
        footer: '#220D0C',
        newBadge: '#CBAB85',
        eventBadge: '#B6D3EF',
        bestBadge: '#EAC9CE',
        RwineBadge: '#292522',
        white: '#fff',
        red: '#8F0016',
        gray: '#838383',
        reviewStar: '#F5B15F',
        disable: '#E2E2E2',
        barcolor: '#DDCFD1',
        bestMenu: '#DC9BA5',
        eventMenu: '#85AACB',
        newMenu: '#CBAB85',
      },
      fontFamily: {
        mypick: ['"Kaushan Script"', 'system-ui', 'sans-serif', 'cursive'], // my pick
        en: ['Caudex', 'serif'],
        ko: ['Pretendard', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        picktit: '128px',
        tit: ['var(--ty-tit-size)', {
          lineHeight: 'var(--ty-tit-lineh)',
        }],
        subtit:'28px',
        body: ['var(--ty-body-size)', {
          lineHeight: 'var(--ty-body-lineh)',
        }],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
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

