
import type { QuizAnswers } from '@/db/type/quiz';
import { QUIZ_MATCH_KEYS } from '@/db/type/wine';
import type { Wine } from '@/db/type/wine';
import { WineCard } from '@/components/ui/WineCard';

// 예시 데이터(실제론 API 또는 DB 쿼리)
const ALL_WINES: Wine[] = [
  { id: 1, name: "헌터스 소비뇽블랑", price: 53000, type: "white", region: "oceania", body: "light", tannin: "low", acidity: "high", sweetness: "low", image: "/images/sample_wine_1.jpg" },
  { id: 2, name: "레드 와인 A", price: 53000, type: "red", region: "europe", body: "full", tannin: "high", acidity: "medium", sweetness: "low", image: "/images/sample_wine_2.jpg" },
  // ...더미
];


export function RecommendedWineList({ answers }: { answers: QuizAnswers }) {
  const filtered = rankByAnswers(ALL_WINES, answers).slice(0, 4);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {filtered.map(w => <WineCard key={w.id} wine={w} />)}
    </div>
  );
}

function rankByAnswers(wines: Wine[], ans: QuizAnswers): Wine[] {
  return [...wines].sort((a, b) => scoreForWine(b, ans) - scoreForWine(a, ans));
}
function scoreForWine(w: Wine, ans: QuizAnswers): number {
  let score = 0;
  for (const k of QUIZ_MATCH_KEYS) {
    const a = ans[k];
    if (!a) continue;

    const wv = w[k] as unknown as string | undefined;

    if (wv === a) score += 2;
    else if (k === 'region' && wv && closeRegion(wv, String(a))) score += 1;
  }
  return score;
}
function closeRegion(a: string, b: string) {
  // 유럽-남미 등 유사 규칙이 있으면 여기에 정의
  if (a === 'europe' && b === 'south-america') {
  return false;
  }
}
