import { Routes, Route } from 'react-router-dom'
import Navigation from './components/layout/Navigation.tsx'
import Footer from './components/layout/Footer.tsx'
import HomePage from './pages/HomePage.tsx'
import ServicePage from './pages/ServicePage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import PortfolioPage from './pages/PortfolioPage.tsx'
import ScrollToTop from './components/ui/ScrollToTop.tsx'
import KakaoFloat from './components/ui/KakaoFloat.tsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <KakaoFloat />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  )
}
