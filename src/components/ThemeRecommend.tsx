import { useState, useMemo, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import { SwiperControl } from '@/components/ui/SwiperControl';
import { winelist } from '@/db/type/winelist';
import { WineCard } from '@/components/ui/WineCard';
import type { Wine } from '@/db/type/wine';

// 탭 메뉴 설정
const THEMES = [
  { id: 'dessert', label: '# 디저트와인' },
  { id: 'brut', label: '# 브륏스파클링' },
  { id: 'white_sparkling', label: '# 화이트 스파클링' },
  { id: 'organic', label: '# 유기농와인' },
] as const;

type ThemeType = typeof THEMES[number]['id'];


// Props 정의 (찜 기능 연동을 위해 추가)
type Props = {
  likedWineIds: Wine['id'][];
  onToggleLike?: (id: Wine['id']) => void;
};

export function ThemeRecommendation({ likedWineIds, onToggleLike }: Props) {
  // 기본 테마
  const [activeTheme, setActiveTheme] = useState<ThemeType>('dessert');

  // 스와이퍼 및 페이지네이션
  const [current, setCurrent] = useState(1);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(null);

  // 선택된 테마에 따라 와인 필터링
  const filteredWines = useMemo(() => {
    return winelist.filter((wine) => {
      switch (activeTheme) {
        case 'dessert':
          return wine.tannin === 'low' && wine.sweetness === 'high';
        case 'brut':
          return (
            (wine.type === 'sparkling' || wine.type === 'champagne') &&
            wine.sweetness === 'low'
          );
        case 'white_sparkling':
          return wine.type === 'sparkling' || wine.type === 'champagne';
        case 'organic':
          return wine.isOrganic === true;
        default:
          return false;
      }
    });
  }, [activeTheme]);

  //테마 변경 시 스와이퍼 초기화 (첫 페이지로 이동)
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.slideTo(0);
      setCurrent(1); 
    }
  }, [activeTheme, swiperInstance, filteredWines.length]);

  // 핸들러 함수들
  const handlePrev = () => swiperInstance?.slidePrev();
  const handleNext = () => swiperInstance?.slideNext();

  const totalCount = filteredWines.length;
  const isBeginning = current === 1;
  const isEnd = current === totalCount;

  const handleToggleLike = (id: Wine['id']) => {
    if (onToggleLike) onToggleLike(id);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto">
        {/* 섹션 제목 */}
        <h2 className="mb-8 text-center text-[40px] font-normal text-black">
          테마별 추천
        </h2>

        {/* 탭 메뉴 */}
        <div className="mb-5 flex flex-wrap justify-start gap-2">
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme.id)}
              className={`themeTab rounded-md border px-3 py-1 text-md font-normal transition-colors duration-200
                ${
                  activeTheme === theme.id
                    ? 'bg-[#570E19] text-white border-[#570E19]'
                    : 'bg-white text-[#570E19] border-[#570E19] hover:bg-[#570E19] hover:text-white'
                }
              `}
            >
              {theme.label}
            </button>
          ))}
        </div>

        {/* 와인카드 Swiper */}
        {filteredWines.length > 0 ? (
          <div className="relative">
            <Swiper
                onSwiper={setSwiperInstance}
                spaceBetween={16}
                slidesPerView={2.2}
                // [수정] 페이지네이션 로직 단순화
                onSlideChange={(swiper) => {
                setCurrent(swiper.activeIndex + 1);
                }}
                className="px-1 !overflow-visible"
            >
              {filteredWines.map((wine) => (
                <SwiperSlide key={wine.id} className="h-auto">
                  <WineCard
                    wine={wine}
                    isLiked={likedWineIds.includes(wine.id)}
                    onToggleLike={handleToggleLike}
                    className="h-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 화살표+페이지네이션 */}
            <div className="mt-1">
              <SwiperControl
                onPrev={handlePrev}
                onNext={handleNext}
                isBeginning={isBeginning}
                isEnd={isEnd}
                current={current}
                total={totalCount}
              />
            </div>    
          </div>
        ) : (
          // 해당 조건의 와인이 없을 경우 안내 메시지
          <div className="py-20 text-center text-gray-400">
            해당 테마의 와인이 준비중입니다.
          </div>
        )}
      </div>
    </section>
  );
}