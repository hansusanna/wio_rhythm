
import { Link } from "react-router-dom";

const base = import.meta.env.BASE_URL

export default function Home() {
  return (
    <>
      {/* 배경 섹션 (히어로) */}
      <section className="relative flex items-center justify-center py-10 sm:py-12 md:py-16">
        <div className="relative">
          <img src={`${base}images/mainbg.jpg`}  alt="wine background" className="w-[640px] max-w-[90vw] rounded-2xl shadow-soft"/>
          {/* 중앙 타이틀: 지샵 애니메이션 타겟 */}
          <h1 id="mypick-heading" data-animate="mypick"
            className="pointer-events-none select-none absolute inset-0 flex items-center justify-center
                       text-5xl sm:text-6xl md:text-7xl font-extrabold italic drop-shadow">
            My Pick
          </h1>
          {/* CTA 버튼: 메인색, 이미지 위 오버레이 */}
          <div className="absolute inset-x-0 bottom-6 sm:bottom-8 flex justify-center">
            <Link to="/mypick"
              className="inline-flex items-center justify-center rounded-xl bg-mainColor px-6 py-3
                         text-white text-sm sm:text-base font-semibold shadow-md hover:opacity-95
                         active:opacity-90 transition" aria-label="내 취향 찾기 페이지로 이동">
              내 취향 찾기
            </Link>
          </div>
        </div>
      </section>

      {/* 스크롤 다운 → 실제 컨텐츠 시작 */}
      <div className="bg-white/95 text-neutral-900 rounded-t-[24px] p-4 sm:pt-6 sm:px-6 md:p-8">
        {/* 여기부터 시안 섹션들 */}
          {/* <HeroSlider /> */}
         {/* <SubscribeForm /> */}
      </div>
    </>
  );
}
