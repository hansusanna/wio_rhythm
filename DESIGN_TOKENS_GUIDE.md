# Wio Rhythm 디자인 토큰 가이드

> 프로젝트 전체 Tailwind CSS 스타일 분석 및 통일된 디자인 토큰 가이드 초안

## 📋 목차
1. [색상 (Colors)](#색상-colors)
2. [텍스트 사이즈 (Typography)](#텍스트-사이즈-typography)
3. [간격 (Spacing)](#간격-spacing)
4. [Border Radius](#border-radius)
5. [Shadow](#shadow)
6. [Border](#border)
7. [파일별 스타일 경향 분석](#파일별-스타일-경향-분석)
8. [개선 권장사항](#개선-권장사항)

---

## 색상 (Colors)

### ✅ 현재 정의된 색상 (tailwind.config.js)

#### 1. Brand 컬러
```javascript
brand: {
  primary: '#370910',    // 메인 배경색
  accent: '#570E19',     // 주요 액센트 (버튼, 강조)
  disabled: '#E2E2E2',   // 비활성화 상태
  dark: '#220D0C',       // Footer 등 어두운 영역
}
```

#### 2. UI 요소 색상
```javascript
ui: {
  btnbg: '#EAE3DC',      // 퀴즈 버튼 배경
  border: '#DDCFD1',     // 바/경계선 색상
  gray: '#838383',       // 기본 gray (기본 gray와 톤이 다름)
}
```

#### 3. Semantic 색상 (뱃지, 메뉴 등)
```javascript
semantic: {
  new: '#CBAB85',        // NEW 뱃지/메뉴
  event: {
    DEFAULT: '#85AACB',  // EVENT 메뉴
    light: '#B6D3EF',    // EVENT 뱃지
  },
  best: {
    DEFAULT: '#DC9BA5',  // BEST 메뉴
    light: '#EAC9CE',    // BEST 뱃지
  },
  rwine: '#292522',      // R-wine 뱃지
  nextbtn: '#e2e2e2',   // 다음 버튼
}
```

#### 4. Gold 컬러
```javascript
gold: {
  100: '#F9F1D8',       // 연한 골드
  DEFAULT: '#D4AF37',   // 정석 메탈릭 골드
  500: '#D4AF37',
  600: '#AA8C2C',       // 어두운 골드
}
```

### ⚠️ 하드코딩된 색상 (정리 필요)

다음 색상들은 코드에 직접 하드코딩되어 있어 디자인 토큰으로 통일이 필요합니다:

| 색상 코드 | 사용 위치 | 권장 토큰명 | 용도 |
|---------|---------|-----------|------|
| `#FEE500` | ResultPage, SubscriptionPage, RecommendationSection | `brand.kakao` | 카카오톡 버튼 |
| `#FDD835` | ResultPage, SubscriptionPage | `brand.kakaoHover` | 카카오톡 버튼 호버 |
| `#F0F0F0` | WineCard | `ui.cardBg` | 카드 배경 |
| `#8A0F29` | WineCard (stockLabel) | `semantic.stock` | 재고 부족 뱃지 |
| `#1E1913` | MembershipBannerCard | `brand.bannerDark` | 배너 다크 배경 |
| `#b4b4b4` | MembershipBannerCard | `ui.textMuted` | 텍스트 뮤트 |
| `#353535` | RecommendationSection | `ui.textSecondary` | 보조 텍스트 |
| `#570E19` | ThemeRecommend (중복) | `brand.accent` (이미 정의됨) | 액센트 색상 |
| `#CBAB85` | WineCard (중복) | `semantic.new` (이미 정의됨) | NEW 뱃지 |
| `#B6D3EF` | WineCard (중복) | `semantic.event.light` (이미 정의됨) | EVENT 뱃지 |
| `#EAC9CE` | WineCard (중복) | `semantic.best.light` (이미 정의됨) | BEST 뱃지 |

### 📊 통일된 색상 토큰 제안

```javascript
// tailwind.config.js에 추가 권장
colors: {
  brand: {
    primary: '#370910',
    accent: '#570E19',
    disabled: '#E2E2E2',
    dark: '#220D0C',
    kakao: '#FEE500',           // 추가
    kakaoHover: '#FDD835',       // 추가
    bannerDark: '#1E1913',      // 추가
  },
  ui: {
    btnbg: '#EAE3DC',
    border: '#DDCFD1',
    gray: '#838383',
    cardBg: '#F0F0F0',          // 추가
    textMuted: '#b4b4b4',       // 추가
    textSecondary: '#353535',    // 추가
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
    stock: '#8A0F29',           // 추가
    nextbtn: '#e2e2e2',
  },
  // ... gold는 유지
}
```

---

## 텍스트 사이즈 (Typography)

### ✅ 현재 사용 중인 폰트 크기

#### CSS 변수 기반 (반응형)
```scss
// _global.scss에서 정의
--ty-tit-size: 24px → 40px (반응형)
--ty-sub-size: 18px → 24px
--ty-body-size: 14px → 18px
--ty-h2-size: 28px → 28px
--ty-findtit-size: 24px → 26px
--ty-navi-size: 16px → 20px
--ty-banner-size: 52px → 60px
```

#### Tailwind 기본값 사용
- `text-xs` (12px) - 뱃지, 작은 텍스트
- `text-sm` (14px) - 보조 텍스트
- `text-base` (16px) - 기본 본문
- `text-lg` (18px) - 강조 본문
- `text-xl` (20px) - 소제목
- `text-2xl` (24px) - 제목
- `text-3xl` (30px) - 큰 제목
- `text-4xl` (36px) - 섹션 제목
- `text-5xl` (48px) - 히어로 제목
- `text-6xl` (60px) - 메인 히어로

#### 커스텀 크기
- `text-picktit` (128px) - "My Pick" 히어로 타이틀

### ⚠️ 문제점

1. **혼재된 사용**: CSS 변수(`text-tit`, `text-body`)와 Tailwind 기본값(`text-lg`, `text-xl`)이 혼재
2. **일관성 부족**: 같은 레벨의 텍스트가 다른 파일에서 다른 크기 사용
   - 예: 제목이 `text-3xl`, `text-4xl`, `text-[40px]` 등으로 혼재

### 📊 통일된 텍스트 사이즈 레벨 제안

```javascript
// tailwind.config.js에 추가 권장
fontSize: {
  // 기존 유지
  picktit: ['128px', { lineHeight: '1' }],
  tit: ['var(--ty-tit-size)', { lineHeight: 'var(--ty-tit-lineh)' }],
  subtit: 'var(--ty-sub-size)',
  body: ['var(--ty-body-size)', { lineHeight: 'var(--ty-body-lineh)' }],
  h2: 'var(--ty-h2-size)',
  findtit: 'var(--ty-findtit-size)',
  
  // 추가 권장: 명확한 레벨 구분
  h1: ['var(--ty-tit-size)', { lineHeight: 'var(--ty-tit-lineh)' }], // = tit
  h3: ['var(--ty-h2-size)', { lineHeight: '1.4' }],
  caption: ['12px', { lineHeight: '1.5' }],  // 작은 설명 텍스트
  badge: ['11px', { lineHeight: '1.2' }],   // 뱃지 텍스트
}
```

**사용 가이드라인:**
- `text-h1` / `text-tit`: 메인 페이지 제목
- `text-h2`: 섹션 제목
- `text-h3`: 서브 섹션 제목
- `text-body`: 본문 텍스트
- `text-caption`: 작은 설명 텍스트
- `text-badge`: 뱃지 내부 텍스트

---

## 간격 (Spacing)

### ✅ 현재 사용 중인 간격

#### CSS 변수 기반 (반응형)
```scss
// _global.scss에서 정의
--sp-xl: 24px → 64px (반응형)
--sp-lg: 12px → 32px
--sp-md: 8px → 16px
--sp-sm: 4px → 8px
```

#### Tailwind 기본값 사용
- `px-1` (4px), `px-2` (8px), `px-3` (12px), `px-4` (16px), `px-5` (20px), `px-6` (24px), `px-7` (28px), `px-8` (32px), `px-10` (40px)
- `py-1` (4px), `py-3` (12px), `py-5` (20px), `py-7` (28px), `py-8` (32px), `py-9` (36px), `py-10` (40px)
- `p-3` (12px), `p-4` (16px), `p-5` (20px), `p-6` (24px)
- `mb-2` (8px), `mb-3` (12px), `mb-4` (16px), `mb-5` (20px), `mb-6` (24px), `mb-8` (32px), `mb-10` (40px), `mb-12` (48px)
- `mt-1` (4px), `mt-2` (8px), `mt-4` (16px), `mt-6` (24px), `mt-8` (32px), `mt-12` (48px), `mt-20` (80px)
- `gap-1` (4px), `gap-2` (8px), `gap-3` (12px), `gap-4` (16px), `gap-5` (20px)
- `space-y-1` (4px), `space-y-2` (8px), `space-y-3` (12px)

### ⚠️ 문제점

1. **혼재된 사용**: CSS 변수(`sp-xl`, `sp-lg`)와 Tailwind 기본값이 혼재
2. **일관성 부족**: 비슷한 간격이 다른 값으로 사용됨
   - 예: 카드 내부 패딩이 `p-3`, `p-4`, `p-5`, `p-6` 등으로 혼재

### 📊 통일된 Spacing 토큰 제안

```javascript
// tailwind.config.js에 추가 권장
spacing: {
  // 기존 유지
  xl: 'var(--sp-xl)',
  lg: 'var(--sp-lg)',
  md: 'var(--sp-md)',
  sm: 'var(--sp-sm)',
  
  // 추가 권장: 의미 있는 네이밍
  card: '20px',        // 카드 내부 패딩
  section: '48px',     // 섹션 간 간격
  button: '12px',      // 버튼 내부 패딩 (py-3)
  chip: '20px',        // 칩 내부 패딩 (px-7 py-5)
}
```

**사용 가이드라인:**
- `p-card` / `px-card` / `py-card`: 카드 내부 패딩
- `mb-section` / `mt-section`: 섹션 간 간격
- `py-button`: 버튼 세로 패딩
- `px-chip` / `py-chip`: 칩 내부 패딩

---

## Border Radius

### ✅ 현재 사용 중인 값

- `rounded-md` (6px) - 작은 요소
- `rounded-lg` (8px) - 중간 요소
- `rounded-xl` (12px) - 큰 요소
- `rounded-2xl` (16px) - 카드, 큰 버튼
- `rounded-full` (9999px) - 원형 뱃지
- `rounded-xl2` (1rem = 16px) - 커스텀 (tailwind.config.js)

### ⚠️ 문제점

1. **중복**: `rounded-2xl` (16px)와 `rounded-xl2` (1rem = 16px)가 동일한 값
2. **일관성 부족**: 같은 용도가 다른 값 사용
   - 예: 카드가 `rounded-xl`, `rounded-2xl` 혼재

### 📊 통일된 Border Radius 토큰 제안

```javascript
// tailwind.config.js에 추가 권장
borderRadius: {
  // 기존 유지
  xl2: '1rem',  // = rounded-2xl과 동일하므로 제거 고려
  
  // 추가 권장: 용도별 명확한 네이밍
  button: '0.375rem',    // 6px - 작은 버튼
  card: '1rem',          // 16px - 카드
  chip: '0.75rem',       // 12px - 칩
  badge: '9999px',       // 원형 뱃지
  banner: '1rem',        // 16px - 배너
}
```

**사용 가이드라인:**
- `rounded-button`: 작은 버튼 (기존 `rounded-md`)
- `rounded-card`: 카드 (기존 `rounded-2xl`)
- `rounded-chip`: 칩 (기존 `rounded-xl`)
- `rounded-badge`: 원형 뱃지 (기존 `rounded-full`)
- `rounded-banner`: 배너 (기존 `rounded-2xl`)

---

## Shadow

### ✅ 현재 사용 중인 Shadow

#### Tailwind 기본값
- `shadow-md` - 버튼, 카드
- `shadow-lg` - 큰 카드
- `shadow-soft` (커스텀) - `0 8px 24px rgba(0,0,0,0.08)` - 헤더 메뉴 패널

#### 하드코딩된 Shadow
- `shadow-[0_20px_45px_rgba(0,0,0,0.45)]` - ResultPage 메인 카드
- `shadow-[0_0_12px_rgba(200,40,40,0.25)]` - SubscriptionPage 선택된 플랜
- `shadow-brand-accent/30` - ResultPage 버튼
- `drop-shadow-lg` - PhotoBannerCard 제목
- `drop-shadow-md` - PhotoBannerCard 부제목

### ⚠️ 문제점

1. **하드코딩된 값**: 많은 shadow가 직접 값으로 작성됨
2. **일관성 부족**: 같은 용도가 다른 shadow 사용

### 📊 통일된 Shadow 토큰 제안

```javascript
// tailwind.config.js에 추가 권장
boxShadow: {
  // 기존 유지
  soft: '0 8px 24px rgba(0,0,0,0.08)',
  
  // 추가 권장: 용도별 명확한 네이밍
  button: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // = shadow-md
  card: '0 20px 45px rgba(0,0,0,0.45)',      // 메인 카드
  cardHover: '0 0 12px rgba(200,40,40,0.25)', // 선택된 카드/플랜
  menu: '0 8px 24px rgba(0,0,0,0.08)',       // = soft
  text: '0 2px 4px rgba(0,0,0,0.1)',         // 텍스트 그림자
}
```

**사용 가이드라인:**
- `shadow-button`: 버튼 (기존 `shadow-md`)
- `shadow-card`: 메인 카드
- `shadow-cardHover`: 선택된 카드/플랜
- `shadow-menu`: 메뉴 패널 (기존 `shadow-soft`)
- `drop-shadow-text`: 텍스트 그림자 (기존 `drop-shadow-md`)

---

## Border

### ✅ 현재 사용 중인 Border

#### Tailwind 기본값
- `border` (1px solid)
- `border-t` (상단만)
- `border-slate-200`, `border-slate-300` - 회색 경계선
- `border-gray-300` - 회색 경계선
- `border-brand-accent` - 브랜드 액센트
- `border-brand-primary/20` - 브랜드 프라이머리 (투명도)
- `border-white/10` - 흰색 (투명도)

#### 하드코딩된 Border
- `border-[#570E19]` - ThemeRecommend (중복, `border-brand-accent` 사용 권장)

### ⚠️ 문제점

1. **중복**: `border-[#570E19]`는 `border-brand-accent`로 대체 가능
2. **일관성 부족**: 같은 용도가 다른 색상 사용
   - 예: 경계선이 `border-slate-200`, `border-slate-300`, `border-gray-300` 혼재

### 📊 통일된 Border 토큰 제안

```javascript
// tailwind.config.js에 추가 권장 (색상 섹션에 추가)
colors: {
  // ... 기존 색상
  border: {
    default: '#DDCFD1',      // = ui.border
    light: '#E5E7EB',        // = slate-200
    medium: '#CBD5E1',       // = slate-300
    dark: '#9CA3AF',         // = gray-300
    brand: '#570E19',        // = brand.accent
    white: 'rgba(255,255,255,0.1)', // = white/10
  }
}
```

**사용 가이드라인:**
- `border-border-default`: 기본 경계선 (기존 `border-ui-border`)
- `border-border-light`: 연한 경계선 (기존 `border-slate-200`)
- `border-border-medium`: 중간 경계선 (기존 `border-slate-300`)
- `border-border-brand`: 브랜드 경계선 (기존 `border-brand-accent`)
- `border-border-white`: 흰색 반투명 경계선 (기존 `border-white/10`)

---

## 파일별 스타일 경향 분석

### 📁 ResultPage.tsx
- **특징**: 메인 결과 페이지, 큰 카드와 여러 버튼 사용
- **색상**: `brand-primary`, `brand-accent` 주로 사용
- **Shadow**: `shadow-[0_20px_45px_rgba(0,0,0,0.45)]` (하드코딩)
- **Border Radius**: `rounded-2xl`, `rounded-xl`, `rounded-md` 혼재
- **Spacing**: `px-4`, `py-8`, `px-8`, `py-10` 등 다양한 값

### 📁 SubscriptionPage.tsx
- **특징**: 구독 플랜 선택 페이지, 카드형 플랜 선택
- **색상**: `brand-accent`, `slate-*` 계열 주로 사용
- **Shadow**: `shadow-lg`, `shadow-[0_0_12px_rgba(200,40,40,0.25)]` (하드코딩)
- **Border Radius**: `rounded-2xl`, `rounded-full` 주로 사용
- **Spacing**: `p-6`, `px-4`, `py-10` 등

### 📁 WineCard.tsx
- **특징**: 와인 카드 컴포넌트, 뱃지와 가격 표시
- **색상**: 하드코딩된 뱃지 색상 (`#CBAB85`, `#B6D3EF`, `#EAC9CE`)
- **Shadow**: 사용 안 함
- **Border Radius**: `rounded-md` (뱃지)
- **Spacing**: `p-5`, `p-4`, `p-3` 등

### 📁 OptionChip.tsx
- **특징**: 퀴즈 옵션 칩, 활성/비활성 상태
- **색상**: `brand-accent`, `ui-btnbg` 사용
- **Border Radius**: `rounded-xl`
- **Spacing**: `px-7 py-5` (비표준 값)

### 📁 ThemeRecommend.tsx
- **특징**: 테마별 추천 탭, 테마 버튼
- **색상**: 하드코딩된 `#570E19` (중복)
- **Border Radius**: `rounded-lg`
- **Spacing**: `px-2.5 py-0.5` (비표준 값)

### 📁 Header.tsx
- **특징**: 헤더/네비게이션, 모바일/데스크톱 분기
- **색상**: `brand-primary`, `white/10` 등
- **Shadow**: `shadow-soft` 사용
- **Border Radius**: `rounded-md`
- **Spacing**: `px-2`, `py-1`, `p-4`, `p-6` 등

---

## 개선 권장사항

### 🔴 긴급 (High Priority)

1. **하드코딩된 색상 제거**
   - `#FEE500`, `#FDD835` → `brand.kakao`, `brand.kakaoHover`
   - `#F0F0F0` → `ui.cardBg`
   - `#8A0F29` → `semantic.stock`
   - `#570E19` (중복) → `brand.accent` 사용
   - `#CBAB85`, `#B6D3EF`, `#EAC9CE` (중복) → `semantic.*` 사용

2. **하드코딩된 Shadow 제거**
   - `shadow-[0_20px_45px_rgba(0,0,0,0.45)]` → `shadow-card`
   - `shadow-[0_0_12px_rgba(200,40,40,0.25)]` → `shadow-cardHover`

3. **Border Radius 통일**
   - `rounded-xl2` 제거 (중복)
   - 카드는 `rounded-card`로 통일
   - 버튼은 `rounded-button`으로 통일

### 🟡 중요 (Medium Priority)

4. **Spacing 통일**
   - 카드 패딩: `p-card` 사용
   - 섹션 간격: `mb-section` / `mt-section` 사용
   - 버튼 패딩: `py-button` 사용

5. **텍스트 사이즈 통일**
   - 제목: `text-h1`, `text-h2`, `text-h3` 사용
   - 본문: `text-body` 사용
   - 뱃지: `text-badge` 사용

6. **Border 색상 통일**
   - `border-slate-200` → `border-border-light`
   - `border-slate-300` → `border-border-medium`
   - `border-gray-300` → `border-border-dark`

### 🟢 개선 (Low Priority)

7. **파일별 스타일 일관성 검토**
   - 각 파일의 스타일 패턴을 위 가이드에 맞게 리팩토링

8. **반응형 스타일 정리**
   - CSS 변수와 Tailwind 반응형 클래스 혼용 정리

---

## 마이그레이션 체크리스트

### Step 1: tailwind.config.js 업데이트
- [ ] 하드코딩된 색상 토큰 추가
- [ ] Shadow 토큰 추가
- [ ] Border Radius 토큰 추가
- [ ] Spacing 토큰 추가

### Step 2: 컴포넌트 파일 수정
- [ ] ResultPage.tsx
- [ ] SubscriptionPage.tsx
- [ ] WineCard.tsx
- [ ] OptionChip.tsx
- [ ] ThemeRecommend.tsx
- [ ] 기타 컴포넌트 파일들

### Step 3: 검증
- [ ] 시각적 회귀 테스트
- [ ] 반응형 테스트
- [ ] 다크모드 테스트 (향후 적용 시)

---

## 참고 자료

- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [디자인 시스템 가이드라인](https://www.designsystems.com/)

---

**작성일**: 2024년
**버전**: 1.0 (초안)
**작성자**: AI Assistant

