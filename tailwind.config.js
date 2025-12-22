/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: { 
      sm: '480px',
      md: '768px',
      lg: '1080px',
      xl: '1440px',
    },
    extend: {
      colors: {
        brand: {
          primary: '#370910',
          accent: '#570E19',
          disabled: '#E2E2E2',
          dark: '#220D0C',
          kakao: '#FEE500',
          kakaoHover: '#FDD835',
          bannerDark: '#1E1913',
          lightred: '#efe7e8',
        },
        ui: {
          btnbg: '#EAE3DC',
          border: '#DDCFD1',
          gray: '#838383',
          cardBg: '#F0F0F0',
          textMuted: '#b4b4b4',
          textSecondary: '#353535',
        },
        semantic: {
          new: '#CBAB85',
          event: {
            DEFAULT: '#85AACB',
            light: '#B6D3EF',
          },
          best: {
            DEFAULT: '#DC9BA5',
            light: '#EAC9CE',
          },
          rwine: '#292522',
          stock: '#8A0F29',
          nextbtn: '#e2e2e2',
        },
        border: {
          default: '#DDCFD1',
          light: '#E5E7EB',
          medium: '#CBD5E1',
          dark: '#9CA3AF',
          brand: '#570E19',
          white: 'rgba(255,255,255,0.1)',
          linered: '#ccb9b5',
        },
        gold: {
          100: '#F9F1D8',
          DEFAULT: '#D4AF37',
          500: '#D4AF37',
          600: '#AA8C2C',
        },
      },
      fontFamily: {
        logo : ['"La Belle Aurore"', 'cursive'],
        mypick: ['"Kaushan Script"', 'system-ui', 'sans-serif', 'cursive'], 
        maru: ['"MaruBuri"', 'sans-serif'],
        ko: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        en: ['Caudex', 'serif'],
      },
      fontSize: {
        // 반응형 시맨틱 사이즈 (SCSS 변수 연결)
        // 화면 크기에 따라 알아서 커지는 폰트들입니다.
        picktit: ['var(--ty-picktit-size)', { lineHeight: '1.4' }],
        findtit:'var(--ty-findtit-size)',
        sctit:'var(--ty-sctit-size)',
        h1: ['var(--text-h1)', { lineHeight: 'var(--line-h1)' }], // 기존 tit 대체
        h2: ['var(--text-h2)', { lineHeight: '1.35' }],           // 기존 sctit, findtit 통합
        h3: ['var(--text-h3)', { lineHeight: '1.4' }],            // 기존 subtit 대체
        body: ['var(--text-body)', { lineHeight: 'var(--line-body)' }],

        // 디자인 디테일 잡을 때 쓰는 고정값들입니다.
        xxs: ['10px', { lineHeight: '1' }],      
        xs:  ['0.75rem', { lineHeight: '1.2' }], // 12px
        sm:  ['0.875rem', { lineHeight: '1.2' }],// 14px
        base:['1rem', { lineHeight: '1.2' }],    // 16px
        lg:  ['1.125rem', { lineHeight: '1.2' }], // 18px
        xl:  ['1.25rem', { lineHeight: '1.2' }],  // 20px
        
        // 3. 특수 목적
        caption: ['12px', { lineHeight: '1.5' }],
        badge: ['11px', { lineHeight: '1.2' }],
      },
      fontWeight: {
        extralight: '200',
        extrabold: '800',
      }, 
      spacing: {
        // 반응형 간격 (SCSS 변수 연결)
        xl: 'var(--sp-xl)',
        lg: 'var(--sp-lg)',
        md: 'var(--sp-md)',
        sm: 'var(--sp-sm)',
        
        card: '20px',
        section: '48px',
        button: '12px',
        chip: '20px',
      }, 
      letterSpacing: {
        tight: '-0.01em',
        tight192: '-0.03em',
      },
      borderRadius: {
        xl2: '1rem',
        button: '0.375rem',
        card: '1rem',
        chip: '0.75rem',
        badge: '9999px',
        banner: '1rem',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.08)',
        button: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        card: '0 20px 45px rgba(0,0,0,0.45)',
        cardHover: '0 0 12px rgba(200,40,40,0.25)',
        menu: '0 8px 24px rgba(0,0,0,0.08)',
        text: '0 2px 4px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
}