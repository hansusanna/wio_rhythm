import type { Banner } from './type/banner';

export const Membership: Banner[] = [
  {
    id: 'event-1',
    title: 'MEMBERSHIP',
    subtitle: '멤버 only 시크릿 혜택',
    image: '/images/banner_img.png',
    badgeImage: '/images/banner_tag.png',
    ctaLabel: '혜택받기',
    href: '/membership',
    variant: 'membership',
    placement: 'home.top',
    isActive: true,
  },
  {
    id: 'event-2',
    title: 'Premium',
    subtitle: '최고를 알아보는 당신을 위한 가장 완벽한 증명',
    image: '/images/premium_ban.jpg',
    ctaLabel: '프리미엄 제품',
    href: '/premium',
    variant: 'photo',
    placement: 'home.bottom',
    isActive: true,
  },
];