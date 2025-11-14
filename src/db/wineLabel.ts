// src/db/wineLabel.ts
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
