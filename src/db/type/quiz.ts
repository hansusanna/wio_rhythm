// src/db/type/quiz.ts
export type ViewMode = 'main' | 'quiz' | 'results';

export type AnswerKey =
  | 'type'     // 종류: red / white / rose / champagne / sparkling
  | 'region'   // 지역: europe / northamerica / southamerica / etc
  | 'body'     // 바디감: light / medium / full
  | 'tannin'   // 타닌감: low / medium / high
  | 'acidity'  // 산미: low / medium / high
  | 'sweetness';// 당도: low / medium / high

export type AnswerValue = string; // 위 카테고리별 옵션 라벨

export type QuizAnswers = Partial<Record<AnswerKey, AnswerValue>>;

export type QuestionDef = {
  key: AnswerKey;
  title: string;
  options: { value: AnswerValue; label: string; hint?: string }[];
};

export type StepDef = {
  id: 1 | 2 | 3;
  questions: [QuestionDef, QuestionDef];
};
