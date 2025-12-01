// src/db/personalityType.ts

export type PersonalityProfile = {
  code: string;        // "full-strong-low-low"
  title: string;       // "클래식 감각가형"
  description: string; // 상세 설명
};

export const personalityMap: Record<string, PersonalityProfile> = {
  "full-strong-low-low": {
    code: "full-strong-low-low",
    title: "클래식 감각가형",
    description:
      "전통을 잘 즐길 줄 아시며, 깊이 있는 풍미를 추구하는 타입이에요.\n" +
      "트렌드보다는 균형이 잘 잡힌 조합, 신뢰할 수 있는 가치를 찾아보는 안목을 가지고 계시네요.\n" +
      "시간이 지날수록 깊어지는 관계처럼, 한 잔의 와인에도 충분한 여유를 더할 분과 잘 맞습니다.",
  },
  "full-medium-low-low": {
    code: "full-medium-low-low",
    title: "시크 깊이파형",
    description:
      "강렬하게 튀기보다는 묵직한 존재감을 선호하는 타입이에요.\n" +
      "선 굵은 풍미 속에서도 거칠지 않은 마무리를 좋아하고, 오래 두고 마셔도 질리지 않는 스타일을 찾습니다.\n" +
      "겉으로는 시크하지만, 속은 깊은 취향을 가진 분이에요.",
  },
  "medium-soft-high-mid": {
    code: "medium-soft-high-mid",
    title: "부드러운 균형파형",
    description:
      "과하지 않은 산도와 부드러운 텍스처를 좋아하는, 밸런스 중심 타입이에요.\n" +
      "누구와 함께 마셔도 부담 없는 스타일을 선호하고, 데일리 와인으로 즐기기에 딱 좋습니다.\n" +
      "와인을 어렵지 않게, 편안하게 즐기고 싶은 분께 잘 맞아요.",
  },
  "light-fresh-high-high": {
    code: "light-fresh-high-high",
    title: "프루티 상큼파형",
    description:
      "가볍고 상큼한 산미, 과일 향이 가득한 와인을 사랑하는 타입이에요.\n" +
      "첫 모금부터 기분이 좋아지는 발랄한 스타일을 선호하고, 브런치나 가벼운 모임과도 찰떡궁합입니다.\n" +
      "와인을 기분전환용 한 잔으로 즐기는 분께 특히 잘 어울려요.",
  },
  "medium-strong-mid-mid": {
    code: "medium-strong-mid-mid",
    title: "정통 감성파형",
    description:
      "클래식한 구조와 적당한 힘을 가진 와인을 좋아하는 타입이에요.\n" +
      "산미·바디·타닌이 한쪽으로 치우치지 않은 조화로운 스타일을 선호합니다.\n" +
      "음식과의 페어링까지 생각하며, 정석에 충실한 와인을 찾는 분이에요.",
  },
};
