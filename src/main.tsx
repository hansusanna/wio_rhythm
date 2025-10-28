import { Helmet } from 'react-helmet-async';

export function Home() {
  return (
    <div>
      <Helmet>
        <title>와인 구독 서비스 - 홈</title>
        <meta name="description" content="프리미엄 와인을 매달 집에서 만나보세요." />
      </Helmet>
      {/* ... 페이지 컨텐츠 ... */}
    </div>
  );
}