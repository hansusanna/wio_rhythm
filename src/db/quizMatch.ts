// src/db/quizMatch.ts
import { QUIZ_MATCH_KEYS } from './type/wine';
import type { QuizAnswers } from './type/quiz';
import type { Wine, QuizMatchKey } from './type/wine';

// 퀴즈 답을 Wine 속성값으로 정규화
export type NormalizedAnswers = Partial<Pick<Wine, QuizMatchKey>>;

export function normalizeAnswers(answers: QuizAnswers): NormalizedAnswers {
  const normalized: NormalizedAnswers = {};

  // type
  if (answers.type) {
    // champagne → sparkling으로 치환
    if (answers.type === 'champagne') {
      normalized.type = 'sparkling';
    } else {
      normalized.type = answers.type as Wine['type'];
    }
  }

  // body / tannin / acidity / sweetness
  if (answers.body) {
    normalized.body = answers.body as Wine['body'];
  }
  if (answers.tannin) {
    normalized.tannin = answers.tannin as Wine['tannin'];
  }
  if (answers.acidity) {
    normalized.acidity = answers.acidity as Wine['acidity'];
  }
  if (answers.sweetness) {
    normalized.sweetness = answers.sweetness as Wine['sweetness'];
  }

  return normalized;
}

export type ScoredWine = {
  wine: Wine;
  score: number;
  matchedKeys: (keyof Wine)[];
};

const REGION_GROUPS: Record<string, string[]> = {
  europe: ['france', 'italy', 'spain', 'germany', 'portugal'],
  new_world: ['usa', 'chile', 'argentina', 'australia', 'new_zealand'],
  asia: ['korea', 'japan'], // 필요하면 이런 식으로
};

export function getMatchedWines(
  answers: QuizAnswers,
  wines: Wine[],
): ScoredWine[] {
  const normalized = normalizeAnswers(answers);
  const preferredType = normalized.type;         
  const preferredRegionGroup = answers.region;    

  return wines
    .map((wine) => {
      let score = 0;
      const matchedKeys: (keyof Wine)[] = [];

       if (preferredType) {
        if (wine.type === preferredType) {
          score += 40;           // 타입 일치 → 큰 가산점
          matchedKeys.push('type');
        } else {
          score -= 10;           // 타입 다르면 약간 페널티
        }
      }
      // 2) 지역 대분류 매칭 (퀴즈: 유럽 ←→ 와인: 국가/지역)
      if (preferredRegionGroup && REGION_GROUPS[preferredRegionGroup]) {
        const groupCountries = REGION_GROUPS[preferredRegionGroup];
        // wine.region이나 wine.country 중 실제 쓰는 필드에 맞춰서 비교
        const wineRegion = String(wine.region).toLowerCase();

        if (groupCountries.includes(wineRegion)) {
          score += 12;          // 지역 대분류 일치 → 가산점
          matchedKeys.push('region');
        }
      }

      QUIZ_MATCH_KEYS.forEach((key) => {
        if (key === 'type' || key === 'region') return; // 위에서 이미 처리

        const answerValue = normalized[key];
        if (!answerValue) return;

        if (wine[key] === answerValue) {
          score += 4; // 일치하면 +4점 (기존 +2보다 살짝 상향)
          matchedKeys.push(key);
        }
      });

      return { wine, score, matchedKeys };
    })
    .filter((item) => item.score > 0) // 아예 안 맞는 애는 제외
    .sort((a, b) => b.score - a.score); // 점수 내림차순
}
