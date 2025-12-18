// src/db/personalityType.ts
export type PersonalityProfile = {
  code: string;        // "full-strong-low-low"
  title: string;       // "클래식 감각가형"
  description: string; // 상세 설명
};

export const personalityMap: Record<string, PersonalityProfile> = {
  "medium-mid-medium-low": {
    code: "medium-mid-medium-low",
    title: "정통 밸런스형",
    description:
      "산미·바디·타닌이 고르게 어우러진 클래식 조합을 좋아하는 타입이에요.\n" +
      "음식과 함께해도, 단독으로 마셔도 안정적인 조화를 느낄 수 있습니다.\n" +
      "기본에 충실하고 균형을 중시하는 분이에요.",
  },

  "medium-low-medium-low": {
    code: "medium-low-medium-low",
    title: "부드러운 조화파형",
    description:
      "자극적이지 않고 부드러운 구조 속에서 은근한 산미를 좋아하는 타입이에요.\n" +
      "가볍지 않지만 편안하게 넘어가는 스타일을 선호합니다.\n" +
      "데일리 와인으로도 부담 없어요.",
  },

  "full-mid-medium-low": {
    code: "full-mid-medium-low",
    title: "클래식 감각형",
    description:
      "풍부한 바디감 속에서도 안정적인 산미와 타닌을 원하는 타입이에요.\n" +
      "진득하지만 편안한 흐름을 좋아하는 차분한 취향입니다.\n" +
      "전통적인 매력을 찾는 분에게 잘 맞아요.",
  },

  "medium-mid-high-low": {
    code: "medium-mid-high-low",
    title: "시트러스 청량파형",
    description:
      "조금 더 살아 있는 산미에서 청량감을 즐기는 타입이에요.\n" +
      "입안을 깨우는 산뜻함을 선호하고 와인의 투명한 구조를 좋아합니다.\n" +
      "깔끔한 맛을 추구하는 분이에요.",
  },

  "medium-high-high-low": {
    code: "medium-high-high-low",
    title: "프레시 산도파형",
    description:
      "선명한 산미와 입안을 잡아주는 타닌의 조합을 좋아해요.\n" +
      "시원하고 긴 여운을 선호하며 음식과의 매칭에서도 빛을 발합니다.\n" +
      "활발하고 깔끔한 취향이에요.",
  },

  "full-mid-low-low": {
    code: "full-mid-low-low",
    title: "실키 무드형",
    description:
      "무겁지만 부드러운 구조를 좋아하는 타입이에요.\n" +
      "과하지 않은 타닌과 낮은 당도 속에서 실키한 질감을 찾습니다.\n" +
      "잔잔한 깊이를 사랑하는 분이에요.",
  },

  "light-low-high-low": {
    code: "light-low-high-low",
    title: "프루티 상큼파형",
    description:
      "가볍고 산뜻하며 과일향이 잘 느껴지는 와인을 선호하는 타입이에요.\n" +
      "첫 모금부터 기분이 좋아지는 상큼함을 원합니다.\n" +
      "부담 없이 즐기기 좋아요.",
  },

  "medium-low-low-low": {
    code: "medium-low-low-low",
    title: "스무스 미니멀형",
    description:
      "복잡함보다 부드럽고 단정한 흐름을 좋아하는 타입이에요.\n" +
      "개성보다는 편안함을 중시하고 은은한 맛을 찾습니다.\n" +
      "미니멀한 취향이에요.",
  },

  "full-high-high-low": {
    code: "full-high-high-low",
    title: "파워 임팩트형",
    description:
      "강한 존재감과 묵직한 구조에서 매력을 느끼는 타입이에요.\n" +
      "타닌·바디·산미 모두 힘 있는 스타일을 선호합니다.\n" +
      "강렬한 풍미를 좋아하는 분이에요.",
  },

  "medium-mid-medium-medium": {
    code: "medium-mid-medium-medium",
    title: "라운드 밸런스형",
    description:
      "적당한 당도와 구조적 밸런스를 중심으로 와인을 즐기는 타입이에요.\n" +
      "부드러움 속 은근한 무게감을 좋아합니다.\n" +
      "편안하고 따뜻한 분위기와 잘 맞아요.",
  },

  "light-low-medium-low": {
    code: "light-low-medium-low",
    title: "라이트 스무스형",
    description:
      "가볍고 깔끔하게 떨어지는 스타일을 좋아해요.\n" +
      "부담 없는 산도와 아주 약한 타닌으로 편하게 마실 수 있습니다.\n" +
      "데일리 한 잔에 잘 어울리는 취향이에요.",
  },

  "medium-high-medium-low": {
    code: "medium-high-medium-low",
    title: "스파이시 클래식형",
    description:
      "살짝 도드라지는 타닌과 적당한 산미의 구조를 좋아하는 타입이에요.\n" +
      "풍미 속에서 은근한 힘이 느껴지는 스타일을 선호합니다.\n" +
      "잔잔한 강렬함을 좋아하는 분이에요.",
  },

  "full-mid-high-low": {
    code: "full-mid-high-low",
    title: "딥 아로마형",
    description:
      "풍부한 바디감 속에서 산미가 살아있는 타입이에요.\n" +
      "무겁지만 답답하지 않고 향이 또렷하게 느껴지는 스타일을 찾습니다.\n" +
      "깊고 입체적인 매력을 사랑해요.",
  },

  "medium-low-high-low": {
    code: "medium-low-high-low",
    title: "크리스프 산뜻형",
    description:
      "가벼운 타닌과 상쾌한 산미를 좋아하는 타입이에요.\n" +
      "입안을 환하게 밝혀주는 시원함과 깔끔한 끝맛을 선호합니다.\n" +
      "청량감 있는 스타일을 찾는 분이에요.",
  },

  "light-mid-medium-low": {
    code: "light-mid-medium-low",
    title: "아로마 라이트형",
    description:
      "라이트 바디지만 은근한 타닌과 중간 산도의 조화로운 흐름을 좋아해요.\n" +
      "가벼운 와인 속에서도 디테일을 찾는 편이에요.\n" +
      "향과 질감의 균형을 중시하는 스타일이에요.",
  },

  "full-low-medium-low": {
    code: "full-low-medium-low",
    title: "웜 부드러움형",
    description:
      "묵직하지만 부드러운 느낌을 선호하는 타입이에요.\n" +
      "타닌이 낮아 부담 없고, 풍성한 텍스처가 매력 포인트입니다.\n" +
      "고요하고 따뜻한 취향이에요.",
  },

  "medium-mid-low-low": {
    code: "medium-mid-low-low",
    title: "클린 드라이형",
    description:
      "깔끔한 드라이함 속에서 안정적인 구성력을 좋아하는 타입이에요.\n" +
      "산미와 단맛이 낮아 담백하게 즐기기 좋습니다.\n" +
      "깔끔하고 단정한 취향이에요.",
  },

  "light-low-high-medium": {
    code: "light-low-high-medium",
    title: "프루티 달콤파형",
    description:
      "가볍고 상큼하면서 살짝 달콤한 스타일을 좋아하는 타입이에요.\n" +
      "브런치나 간단한 디저트와도 잘 어울립니다.\n" +
      "기분전환용 와인을 찾는 분이에요.",
  },

  "medium-low-medium-medium": {
    code: "medium-low-medium-medium",
    title: "소프트 스위트형",
    description:
      "부드러운 질감과 은근한 단맛을 좋아하는 타입이에요.\n" +
      "달지도 쓰지도 않은 균형 속에서 여유로운 향미를 즐깁니다.\n" +
      "편안하고 따뜻한 분위기를 선호해요.",
  },

  "light-mid-medium-medium": {
    code: "light-mid-medium-medium",
    title: "라이트 스윗 균형형",
    description:
      "가볍지만 풍미가 밋밋하지 않은 균형 잡힌 달콤함을 좋아해요.\n" +
      "산미와 당도가 조화롭게 어우러지는 타입입니다.\n" +
      "부담 없이 즐기기에 좋아요.",
  },
};

export const DEFAULT_PERSONALITY: PersonalityProfile = {
  code: 'default',
  title: '당신만의 와인 스타일',
  description:
    '당신의 선택을 기반으로 어울리는 와인 스타일을 추천해드렸어요.',
};

export function getPersonalityProfile(
  code: string | null | undefined,
): PersonalityProfile {
  if (!code) return DEFAULT_PERSONALITY;

  // 1) 완전 일치
  const exact = personalityMap[code];
  if (exact) return exact;

  const [body, , acidity, sweetness] = code.split('-');

  const profiles = Object.values(personalityMap);

  // 2) body + acidity + sweetness 우선 매칭
  const match3 = profiles.find((p) => {
    const [b, , a, s] = p.code.split('-');
    return b === body && a === acidity && s === sweetness;
  });
  if (match3) return match3;

  // 3) body 기준 느슨한 매칭
  const match1 = profiles.find((p) =>
    p.code.startsWith(`${body}-`),
  );
  if (match1) return match1;

  // 4) 최종 fallback
  return DEFAULT_PERSONALITY;
}
