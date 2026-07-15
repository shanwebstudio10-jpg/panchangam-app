import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer'
import Home from './pages/Home.jsx'
import CalendarPage from './pages/Calendar.jsx'
import Panchangam from './pages/Panchangam.jsx'
import Festival from './pages/Festival.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About'
import RahuKalamPage from './pages/RahuKalam.jsx'
import MuhurthamPage from './pages/Muhurtham.jsx'
import RasiPalanPage from './pages/RasiPalan.jsx'
import ScrollToTop from './components/Scrolltotop'
import { trackPageView } from './utils/googleAnalytics'

export default function App() {
  const location = useLocation()

  // Track page views on route change
  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])
  return (
    <div className="min-h-screen flex flex-col bg-mandala">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/panchangam" element={<Panchangam />} />
          <Route path="/festivals" element={<Festival />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/rahukalam" element={<RahuKalamPage />} />
          <Route path="/ragu-kalam" element={<RahuKalamPage />} />
          <Route path="/muhurtham" element={<MuhurthamPage />} />
          <Route path="/rasipalan" element={<RasiPalanPage />} />
          <Route path="/rasi-palan" element={<RasiPalanPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
