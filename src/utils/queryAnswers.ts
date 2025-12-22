import type { QuizAnswers } from '@/db/type/quiz';
import type { Wine } from '@/db/type/wine';

export function getAnswersFromQuery(
  searchParams: URLSearchParams,
  fallbackWine?: Wine | null,
): QuizAnswers | null {
  const type = searchParams.get('atype') ?? '';
  const region = searchParams.get('region') ?? '';
  const body = searchParams.get('body') ?? '';
  const tannin = searchParams.get('tannin') ?? '';
  const acidity = searchParams.get('acidity') ?? '';
  const sweetness = searchParams.get('sweetness') ?? '';

  const hasQueryValue = !!(type || region || body || tannin || acidity || sweetness);

  if (hasQueryValue) {
    return { type, region, body, tannin, acidity, sweetness };
  }

  if (!fallbackWine) return null;

  return {
    type: fallbackWine.type,
    region: fallbackWine.region,
    body: fallbackWine.body,
    tannin: fallbackWine.tannin,
    acidity: fallbackWine.acidity,
    sweetness: fallbackWine.sweetness,
  };
}
