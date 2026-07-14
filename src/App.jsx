import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer'
import Home from './pages/Home'
import CalendarPage from './pages/Calendar'
import Panchangam from './pages/Panchangam'
import Festival from './pages/Festival'
import Contact from './pages/Contact'
import About from './pages/About'
import ScrollToTop from './components/Scrolltotop'

export default function App() {
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
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
