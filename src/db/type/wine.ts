// src/db/type/wine.ts
export type WineType = 'red' | 'white' | 'rose' | 'sparkling' | 'champagne';
export type Region =
  | 'europe'
  | 'northamerica'
  | 'southamerica'
  | 'oceania'
  | 'etc';
export type Level = 'low' | 'medium' | 'high';

export type LabelType = 'NEW' | 'EVENT' | 'BEST';

export interface Wine {
  // 공통 키
  id: string | number;
  image: string; 

  // 퀴즈 매칭용 키
  type: WineType;
  region: Region;
  body?: 'light' | 'medium' | 'full';
  tannin?: Level;
  acidity?: Level;
  sweetness?: Level;

  // 상품 카드 전시용
  nameKo: string;      // 국문명
  nameEn: string;      // 영문명
  originalPrice?: number;  // 정가
  salePrice?: number;      // 판매가 (세일가)
  labels?: LabelType[];    // NEW / EVENT / BEST
  rating?: number;         // 만족도 점수 (예: 4.5)
  reviewCount?: number;    // 리뷰 개수
}

/*'내 취향 찾기' 퀴즈 답변과 와인 데이터를 매칭할 때 사용할 속성(key) 목록입니다
 * Wine 인터페이스의 key와 일치해야 합니다. */
export const QUIZ_MATCH_KEYS = [
  'type',
  'region',
  'body',
  'tannin',
  'acidity',
  'sweetness'
] as const;

/* QUIZ_MATCH_KEYS 배열의 값들로부터 추론된 유니온 타입입니다.
 * ("type" | "region" | "body" | ...)*/
export type QuizMatchKey = typeof QUIZ_MATCH_KEYS[number];