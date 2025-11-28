// src/db/wineLabel.ts
import type { QuizAnswers } from '@/db/type/quiz';

export function typeLabel(value?: string) {
  if (!value) return '-';
  switch (value) {
    case 'red':
      return '레드';
    case 'white':
      return '화이트';
    case 'rose':
      return '로제';
    case 'sparkling':
      return '스파클링';
    case 'champagne':
      return '샴페인';
    default:
      return value;
  }
}

export function regionLabel(value?: string) {
  if (!value) return '-';
  switch (value) {
    case 'europe':
      return '유럽';
    case 'northamerica':
      return '북미';
    case 'southamerica':
      return '남미';
    case 'oceania':
      return '오세아니아';
    case 'etc':
      return '그 외';
    default:
      return value;
  }
}

export function countryLabel(value?: string) {
  if (!value) return '';
  switch (value) {
    case 'france':
      return '프랑스';
    case 'italy':
      return '이탈리아';
    case 'spain':
      return '스페인';
    case 'germany':
      return '독일';
    case 'portugal':
      return '포르투갈';
    case 'usa':
      return '미국';
    case 'chile':
      return '칠레';
    case 'argentina':
      return '아르헨티나';
    case 'australia':
      return '호주';
    case 'new_zealand':
      return '뉴질랜드';
    case 'etc':
      return '기타';
    default:
      return value;
  }
}
// 종류 뱃지
export const typeBadgeImages: Record<QuizAnswers['type'], string> = {
  red: '/images/badge/red.png',
  white: '/images/badge/white.png',
  rose: '/images/badge/rose.png',
  sparkling: '/images/badge/sparkling.png',
  champagne: '/images/badge/cham.png',
};

// 국가 뱃지 정보의 타입을 정의합니다
type CountryBadge = {
  label: string;
  src: string;
};

// 와인 지역키에 따른 뱃지 이미지 경로 맵 */
export const regionCountryBadges: Record<
  QuizAnswers['region'],
  CountryBadge[]
> = {
  europe: [
    // '유럽'을 선택하면 이 배열의 모든 뱃지가 표시됩니다.
    { label: '프랑스', src: '/images/badge/fra.png' },
    { label: '이탈리아', src: '/images/badge/ity.png' },
    { label: '독일', src: '/images/badge/ger.png' },
    { label: '스페인', src: '/images/badge/spa.png' },
    // (필요한 국가 뱃지들을 여기에 추가하세요)
  ],
  northamerica: [
    { label: '미국', src: '/images/badge/usa.png' },
    // (필요한 국가 뱃지들을 여기에 추가하세요)
  ],
  southamerica: [
    { label: '칠레', src: '/images/badge/chi.png' },
    { label: '아르헨티나', src: '/images/badge/arg.png' },
    // (필요한 국가 뱃지들을 여기에 추가하세요)
  ],
  oceania: [
    { label: '호주', src: '/images/badge/aus.png' },
    { label: '뉴질랜드', src: '/images/badge/nez.png' },
    // (필요한 국가 뱃지들을 여기에 추가하세요)
  ],
  etc: [
    { label: '기타', src: '/images/badge/aus.png' },
    { label: '기타', src: '/images/badge/nez.png' },
  ],
};