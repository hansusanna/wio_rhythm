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
          accent: '#570E19',  
          disabled: '#E2E2E2' , // 비활성화
          dark: '#220D0C',    // footer
          kakao: '#FEE500',    // 카카오톡 버튼
          kakaoHover: '#FDD835', // 카카오톡 버튼 호버
          bannerDark: '#1E1913', // 배너 다크 배경
          lightred: '#efe7e8',
        },
        // 2.UI요소 색상
        ui: {
          btnbg: '#EAE3DC',  // 퀴즈버튼
          border: '#DDCFD1',       // barcolor
          gray: '#838383',         //gray (기본 gray와 톤이 다름)
          cardBg: '#F0F0F0',      // 카드 배경
          textMuted: '#b4b4b4',   // 텍스트 뮤트
          textSecondary: '#353535', // 보조 텍스트        
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
          stock: '#8A0F29', // 재고 부족 뱃지
          nextbtn: '#e2e2e2',
        },
        // 4.경계선 색상
        border: {
          default: '#DDCFD1',      // 기본 경계선 (= ui.border)
          light: '#E5E7EB',        // 연한 경계선 (= slate-200)
          medium: '#CBD5E1',       // 중간 경계선 (= slate-300)
          dark: '#9CA3AF',         // 어두운 경계선 (= gray-300)
          brand: '#570E19',        // 브랜드 경계선 (= brand.accent)
          white: 'rgba(255,255,255,0.1)', // 흰색 반투명 경계선
        },
        gold: {
          100: '#F9F1D8', // 연한 골드
          DEFAULT: '#D4AF37', // 정석 메탈릭 골드
          500: '#D4AF37',
          600: '#AA8C2C', // 어두운 골드
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
        picktit:['var(--ty-picktit-size)', {
          lineHeight: '1',
        }],
        tit: ['var(--ty-tit-size)', {
          lineHeight: 'var(--ty-tit-lineh)',
        }],
        subtit:'var(--ty-sub-size)',
        body: ['var(--ty-body-size)', {
          lineHeight: 'var(--ty-body-lineh)',
        }],
        h1: ['var(--ty-tit-size)', {
          lineHeight: 'var(--ty-body-lineh)',
        }], // = tit (명확한 레벨 구분용)
        h2:['var(--ty-h2-size)', {
          lineHeight: '1.4',
        }],
        h3: ['var(--ty-h2-size)', {
          lineHeight: '1.4',
        }], // 서브 섹션 제목
        findtit:'var(--ty-findtit-size)',
        caption: ['12px', {
          lineHeight: '1.5',
        }], // 작은 설명 텍스트
        badge: ['11px', {
          lineHeight: '1.2',
        }], // 뱃지 텍스트
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
        card: '20px',        // 카드 내부 패딩
        section: '48px',     // 섹션 간 간격
        button: '12px',      // 버튼 내부 패딩 (py-3)
        chip: '20px',        // 칩 내부 패딩 (px-7 py-5)
      }, 
      letterSpacing: {
        tight: '-0.01em',
        tight192: '-0.03em',
      },
      borderRadius: {
        xl2: '1rem', // 카드/버튼 둥근 모서리 맛 (rounded-2xl과 동일, 제거 고려)
        button: '0.375rem',    // 6px - 작은 버튼
        card: '1rem',          // 16px - 카드
        chip: '0.75rem',       // 12px - 칩
        badge: '9999px',       // 원형 뱃지
        banner: '1rem',        // 16px - 배너
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.08)',
        button: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // = shadow-md
        card: '0 20px 45px rgba(0,0,0,0.45)',      // 메인 카드
        cardHover: '0 0 12px rgba(200,40,40,0.25)', // 선택된 카드/플랜
        menu: '0 8px 24px rgba(0,0,0,0.08)',       // = soft (메뉴 패널)
        text: '0 2px 4px rgba(0,0,0,0.1)',         // 텍스트 그림자
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          /* Firefox */
          "scrollbar-width": "none",
          /* IE / Edge (legacy) */
          "-ms-overflow-style": "none",
          /* WebKit */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
}

