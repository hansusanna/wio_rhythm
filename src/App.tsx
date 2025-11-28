import { Routes, Route } from 'react-router-dom'
import Layout from '@/Layout' 
import Home from '@/pages/Home'  

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {/* 추후 페이지들 추가 */}
        {/* <Route path="/mypick" element={<MyPick />} /> */}
      </Route>
    </Routes>
  )
}
