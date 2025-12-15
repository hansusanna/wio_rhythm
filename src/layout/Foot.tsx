import { Copyright } from "lucide-react";

export default function Foot() {
  return (
    <footer className="bg-brand-dark text-white" aria-label="Footer">
      <div className="w-full px-5 sm:px-6 py-16">
         {/* 콘텐츠 폭 제한 */}    
        <div className="flex flex-col gap-6">
          {/* CS */}
          <div>
            <p className="font-ko text-xl tracking-tight">Cs Center</p>
            <a
              href="tel:02-123-4567"
              className="mt-2 inline-block font-ko text-5xl tracking-tight192 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              02-123-4567
            </a>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6 text-sm">
              {["Wio Rhythm", "개인정보정책", "이용약관"].map((label) => (
                <li key={label}>
                  <a href="#"
                    className="border-b border-white/90 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Info */}
          <address className="not-italic text-sm leading-relaxed text-white/90">
            <div>대표자 이지영</div>
            <div className="mt-1">주소 서울 00구 00동 00길0 00-0</div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>사업자등록번호 123-45-67890</span>
              <span>Email</span>
              <a href="mailto:wiorhythm@gmail.com"
                className="underline underline-offset-2 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">wiorhythm@gmail.com
              </a>
            </div>

            <div className="mt-3 flex items-center gap-1 text-xs text-white/80">
              <Copyright className="size-3" aria-hidden="true" />
              <span>copyright wiorhythm Co., Ltd.</span>
            </div>
          </address>
        </div>
      </div>
    </footer>
  );
}
