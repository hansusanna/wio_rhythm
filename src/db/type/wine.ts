export type WineType = 'red' | 'white' | 'rose' | 'sparkling';
export type Region =
  | 'europe' | 'northamerica' | 'southamerica' | 'oceania' | 'asia' | 'etc';
export type Level = 'low' | 'medium' | 'high';

export interface Wine {
  id: string | number;
  name: string;
  price: number;          // 숫자 권장
  image: string;          // '/images/...'
  type: WineType;
  region: Region;
  body?: 'light' | 'medium' | 'full';
  tannin?: Level;
  acidity?: Level;
  sweetness?: Level;
  badges?: string[];
}

// --- '내 취향 찾기' 퀴즈 관련 상수 및 타입 추가 ---
/**
 * '내 취향 찾기' 퀴즈 답변과 와인 데이터를 매칭할 때 사용할 속성(key) 목록입니다.
 * Wine 인터페이스의 key와 일치해야 합니다.
 */
export const QUIZ_MATCH_KEYS = [
  'type',
  'region',
  'body',
  'tannin',
  'acidity',
  'sweetness'
] as const;

/**
 * QUIZ_MATCH_KEYS 배열의 값들로부터 추론된 유니온 타입입니다.
 * ("type" | "region" | "body" | ...)
 */
export type QuizMatchKey = typeof QUIZ_MATCH_KEYS[number];