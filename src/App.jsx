import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { CompareProvider } from './context/CompareContext.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Sidebar from './components/Sidebar.jsx'
import Home from './pages/Home.jsx'
import GemDetail from './pages/GemDetail.jsx'
import Wishlist from './pages/Wishlist.jsx'
import ComparePage from './pages/ComparePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import logo from './assets/Logo.png'

function MobileNav({ onOpen, wishlistCount }) {
  const navigate = useNavigate()
  return (
    <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3.5 shadow-lg" style={{ background: '#050e2a' }}>
      <button onClick={onOpen} className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Open menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => navigate('/')}>
        {/* <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
          <polygon points="14,2 26,8.5 26,19.5 14,26 2,19.5 2,8.5" fill="none" stroke="#d4a820" strokeWidth="1" opacity="0.7"/>
          <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" fill="rgba(212,168,32,0.1)" stroke="#d4a820" strokeWidth="0.6"/>
        </svg> */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="CGT Logo" className="h-10 w-10 object-contain" />
            <span className="font-display text-lg font-semibold tracking-[0.18em]" style={{ color: '#d4a820' }}>
               CGT
            </span>
         </div>
      </div>

      {/* Wishlist icon */}
      <button
        onClick={() => navigate('/wishlist')}
        className="relative p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
        aria-label="Wishlist"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
        {wishlistCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-body font-semibold flex items-center justify-center"
            style={{ background: '#dc2626', color: 'white' }}>
            {wishlistCount}
          </span>
        )}
      </button>
    </header>
  )
}

function AppShell() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // We can't call useWishlist here without importing, use a separate inner approach
  return (
    <div className="flex min-h-screen bg-[#f0ede8]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="drawer-overlay lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 flex-shrink-0 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Sidebar
          activeCategory={activeCategory}
          setActiveCategory={(cat) => { setActiveCategory(cat); setSidebarOpen(false) }}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav onOpen={() => setSidebarOpen(true)} wishlistCount={0} />

        <main className={`flex-1 overflow-auto ${sidebarOpen ? 'lg:hidden' : ''}`}>
          <ScrollToTop />
          <Routes>
            <Route path="/"        element={<Home activeCategory={activeCategory} setActiveCategory={setActiveCategory} />} />
            <Route path="/gem/:id" element={<GemDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/compare"  element={<ComparePage />} />
            <Route path="/about"    element={<AboutPage />} />
            <Route path="/contact"  element={<ContactPage />} />
            <Route path="*"         element={<Home activeCategory={activeCategory} setActiveCategory={setActiveCategory} />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CompareProvider>
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </CompareProvider>
      </WishlistProvider>
    </ToastProvider>
  )
}
