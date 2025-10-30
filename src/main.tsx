import { createRoot } from 'react-dom/client'
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './Layout'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Helmet>
        <title>와인 구독 서비스 - 홈</title>
        <meta name="description" content="프리미엄 와인을 매달 집에서 만나보세요." />
        <App />
      </Helmet>
      {/* ... 페이지 컨텐츠 ... */}
</BrowserRouter>
)