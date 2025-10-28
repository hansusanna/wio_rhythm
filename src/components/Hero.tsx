// src/components/Hero.tsx
// import HeroSlider from './HeroSlider'

export default function Hero() {
  return (
    <section className="relative text-white">
      {/* 배경 컬러 (시안: #370910) */}
      <div className="absolute inset-0 bg-wineBg" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 py-16">
        {/* 상단 슬라이더(옵션) */}
        {/* <HeroSlider /> */}

        {/* my pick 텍스트 */}
        <div className="mt-10 grid place-items-center">
          <h2
            className="font-display leading-trim text-mypick text-black text-center select-none"
            style={{ fontWeight: 400 }}
          >
            my pick
          </h2>
          <p className="mt-4 text-center text-white/90 font-en text-[20px]">
            Hand-picked wines for your monthly subscription
          </p>
        </div>

        {/* CTA 버튼 */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button className="btn btn-primary">구독 시작하기</button>
          <button className="btn btn-ghost">이번 달 셀렉션 보기</button>
        </div>
      </div>
    </section>
  )
}
