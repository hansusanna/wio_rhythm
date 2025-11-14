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
    // champagne → sparkling으로 치환 (원하는 대로 수정 가능)
    if (answers.type === 'champagne') {
      normalized.type = 'sparkling';
    } else {
      normalized.type = answers.type as Wine['type'];
    }
  }

  // region
  if (answers.region) {
    normalized.region = answers.region as Wine['region'];
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

export function getMatchedWines(
  answers: QuizAnswers,
  wines: Wine[],
): ScoredWine[] {
  const normalized = normalizeAnswers(answers);

  return wines
    .map((wine) => {
      let score = 0;
      const matchedKeys: (keyof Wine)[] = [];

      QUIZ_MATCH_KEYS.forEach((key) => {
        const answerValue = normalized[key];
        if (!answerValue) return;

        if (wine[key] === answerValue) {
          score += 2; // 일치하면 +2점
          matchedKeys.push(key);
        }
      });

      return { wine, score, matchedKeys };
    })
    .filter((item) => item.score > 0) // 아예 안 맞는 애는 제외
    .sort((a, b) => b.score - a.score); // 점수 내림차순
}
