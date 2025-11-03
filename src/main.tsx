import { createRoot } from 'react-dom/client'
import { Helmet, HelmetProvider  } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom'
import './styles/_global.scss'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
   <HelmetProvider>
    <BrowserRouter>
      <Helmet>
        <title>WioRhythm - 와인 구독 서비스</title>
        <meta name="description" content="프리미엄 와인을 매달 집에서 만나보세요." />
      </Helmet>
      <App />
      {/* ... 페이지 컨텐츠 ... */}
    </BrowserRouter>
   </HelmetProvider>    
)