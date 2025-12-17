export type BannerVariant = 'membership' | 'photo';

export type Banner = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;       // 메인 이미지 (선물상자 or 포토 백그라운드)
  badgeImage?: string; // "for you" 같은 뱃지 이미지 (있을 수도 / 없을 수도)
  ctaLabel?: string;
  href?: string;
  variant?: BannerVariant; // 'membership' | 'photo'
  placement?: 'home.top' | 'home.bottom' ;
  isActive:  number;
  sortOrder?: number;
};