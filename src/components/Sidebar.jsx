import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'
import logo from '../assets/Logo.png'

const WHATSAPP_NUMBER = '94768482447'

const NAV_TREE = [
  {
    label: 'Collections',
    items: [
      { label: 'All Gems',         category: 'All',              icon: '✦', count: null },
      { label: 'Investment Stones', category: 'Investment Stones', icon: '◈', count: null },
      { label: 'Gemstones',        category: 'Gemstones',        icon: '◆', count: null },
      { label: 'Amber',            category: 'Amber',            icon: '◇', count: null },
      { label: 'Amethyst',         category: 'Amethyst',         icon: '◇', count: null },
      { label: 'Ametrine',         category: 'Ametrine',         icon: '◇', count: null },
      { label: 'Aquamarine',       category: 'Aquamarine',       icon: '◇', count: null },
      { label: 'Citrine',          category: 'Citrine',          icon: '◇', count: null },
      { label: 'Diamond',          category: 'Diamond',          icon: '◇', count: null },
      { label: 'Fancy Color Diamond', category: 'Fancy Color Diamond', icon: '◇', count: null },
      { label: 'Emerald',          category: 'Emerald',          icon: '◇', count: null },
      { label: 'Garnet',           category: 'Garnet',           icon: '◇', count: null },
      { label: 'Iolite',           category: 'Iolite',           icon: '◇', count: null },
      { label: 'Jade',             category: 'Jade',             icon: '◇', count: null },
      { label: 'Kunzite',          category: 'Kunzite',          icon: '◇', count: null },
      { label: 'Lapis Lazuli',     category: 'Lapis Lazuli',     icon: '◇', count: null },
      { label: 'Moonstone',        category: 'Moonstone',        icon: '◇', count: null },
      { label: 'Morganite',        category: 'Morganite',        icon: '◇', count: null },
      { label: 'Opal',             category: 'Opal',             icon: '◇', count: null },
      { label: 'Pearl',            category: 'Pearl',            icon: '◇', count: null },
      { label: 'Peridot',          category: 'Peridot',          icon: '◇', count: null },
      { label: 'Rose Quartz',      category: 'Rose Quartz',      icon: '◇', count: null },
      { label: 'Ruby',             category: 'Ruby',             icon: '◇', count: null },
      { label: 'Sapphire',         category: 'Sapphire',         icon: '◇', count: null },
      { label: 'Spinel',           category: 'Spinel',           icon: '◇', count: null },
      { label: 'Sunstone',         category: 'Sunstone',         icon: '◇', count: null },
      { label: 'Tanzanite',        category: 'Tanzanite',        icon: '◇', count: null },
      { label: 'Topaz',            category: 'Topaz',            icon: '◇', count: null },
      { label: 'Tourmaline',       category: 'Tourmaline',       icon: '◇', count: null },
      { label: 'Turquoise',        category: 'Turquoise',        icon: '◇', count: null },
      { label: 'Zircon',           category: 'Zircon',           icon: '◇', count: null },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'Wishlist',      page: '/wishlist', icon: '♡', isWishlist: true },
      { label: 'Compare Gems',  page: '/compare',  icon: '⚖' },
      { label: 'About Us',      page: '/about',    icon: '○' },
      { label: 'Contact Us',    page: '/contact',  icon: '○' },
    ],
  },
]

function GemIcon() {
  return (
    <img 
      src={logo} 
      alt="Company Logo" 
      width="300" 
      height="300" 
      style={{ 
        borderRadius: '8px',
        objectFit: 'contain',
        filter: 'drop-shadow(0 0 8px rgba(212,168,32,0.3))',
        mixBlendMode: 'screen',
        backgroundColor: 'transparent'
      }} 
    />
  )
}

export default function Sidebar({ activeCategory, setActiveCategory, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { wishlist } = useWishlist()

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
    navigate('/')
  }

  return (
    <div
      className="h-full flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020818 0%, #050e2a 40%, #091535 100%)' }}
    >
      {/* Decorative geometric SVG bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-right triangle */}
        <svg className="absolute top-0 right-0 w-44 h-44 opacity-[0.035]" viewBox="0 0 176 176">
          <polygon points="176,0 176,176 0,176" fill="#d4a820"/>
          <line x1="88" y1="0" x2="176" y2="88" stroke="#d4a820" strokeWidth="0.8"/>
          <line x1="0" y1="88" x2="88" y2="176" stroke="#d4a820" strokeWidth="0.8"/>
        </svg>
        {/* Bottom-left circles */}
        <svg className="absolute bottom-24 left-0 w-36 h-36 opacity-[0.04]" viewBox="0 0 144 144">
          <circle cx="72" cy="72" r="68" fill="none" stroke="#d4a820" strokeWidth="0.7"/>
          <circle cx="72" cy="72" r="48" fill="none" stroke="#d4a820" strokeWidth="0.7"/>
          <circle cx="72" cy="72" r="28" fill="none" stroke="#d4a820" strokeWidth="0.7"/>
          <circle cx="72" cy="72" r="8" fill="rgba(212,168,32,0.3)"/>
        </svg>
        {/* Subtle horizontal lines */}
        {[120, 240, 360, 480].map(y => (
          <div key={y} className="absolute w-full" style={{ top: y, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,168,32,0.06), transparent)' }} />
        ))}
      </div>

      {/* Close button (mobile only) */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 z-10 p-2 text-white/40 hover:text-white/80 hover:bg-white/8 rounded-lg transition-colors"
        aria-label="Close menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      {/* ─── Brand Header ─── */}
      <div className="relative px-6 pt-8 pb-5">
        <div className="flex items-center justify-center mb-3">
          <GemIcon />
          {/* 
          COMMENTED OUT - BRAND TEXT FOR CLIENT REVIEW
          <div>
            <h1 className="font-display text-[22px] font-semibold tracking-[0.22em] leading-none"
              style={{ color: '#d4a820', textShadow: '0 0 25px rgba(212,168,32,0.45)' }}>
              CGT
            </h1>
            <p className="text-white/35 text-[9px] tracking-[0.4em] uppercase font-body font-light mt-1">
              Fine Gemstones
            </p>
          </div>
          */}
        </div>

        {/* Gold gradient line */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,168,32,0.5) 30%, rgba(212,168,32,0.5) 70%, transparent)' }} />
        {/* COMMENTED OUT - BRAND INFO FOR CLIENT REVIEW
        <p className="mt-2.5 text-white/20 text-[9px] font-body tracking-[0.3em] uppercase">
          Bangkok · Certified · Since 2008
        </p>
        */}
      </div>

      {/* ─── Contact Section ─── */}
      <div className="relative px-4 pb-4">
        <div className="rounded-xl border p-3.5 space-y-2.5"
          style={{ borderColor: 'rgba(212,168,32,0.12)', background: 'rgba(212,168,32,0.04)', backdropFilter: 'blur(4px)' }}>
          <a href="tel:+85510230970"
            className="flex items-center gap-2.5 text-white/55 hover:text-white/90 transition-colors group">
            <span style={{ color: '#d4a820' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
              </svg>
            </span>
            <span className="font-body text-[11px] tracking-wider">+855 10 230 970</span>
          </a>

          <div style={{ height: '1px', background: 'rgba(212,168,32,0.1)' }} />

          <a href="mailto:info@cgt.onl"
            className="flex items-center gap-2.5 text-white/55 hover:text-white/90 transition-colors">
            <span style={{ color: '#d4a820' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <span className="font-body text-[11px] tracking-wider truncate">info@cgt.onl</span>
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-body text-[11px] font-medium tracking-widest uppercase text-white transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 3px 12px rgba(37,211,102,0.25)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>

          <a
            href="https://t.me/cambodiangems"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-body text-[11px] font-medium tracking-widest uppercase text-white transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #0088cc, #005ba4)', boxShadow: '0 3px 12px rgba(0,136,204,0.25)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.004 0-.009 0-.013 0l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.266 13.26l-2.995-.924c-1.3-.406-1.319-1.304-.203-1.938l11.823-4.56c.883-.38 1.655.212 1.377 1.584z"/>
            </svg>
            Message on Telegram
          </a>
        </div>
      </div>

      {/* Gold divider */}
      <div className="px-4 mb-2">
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,168,32,0.3), transparent)' }} />
      </div>

      {/* ─── Navigation ─── */}
      <nav className="flex-1 px-2.5 pb-5 overflow-y-auto sidebar-scroll relative">
        {NAV_TREE.map((section) => (
          <div key={section.label} className="mb-4">
            <p className="px-3 mb-1.5 text-[9px] font-body font-medium tracking-[0.35em] uppercase"
              style={{ color: 'rgba(212,168,32,0.4)' }}>
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = item.category && activeCategory === item.category
                const isPage = item.page && location.pathname === item.page

                return (
                  <li key={item.label}>
                    <button
                      onClick={() => {
                        if (item.category) {
                          handleCategoryClick(item.category)
                        } else if (item.page) {
                          navigate(item.page)
                          onClose()
                        }
                      }}
                      className={`
                        w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left
                        transition-all duration-150 group relative
                        ${isActive || isPage
                          ? 'text-white'
                          : 'text-white/75 hover:text-white hover:bg-white/5'}
                      `}
                      style={isActive || isPage ? {
                        background: 'linear-gradient(90deg, rgba(212,168,32,0.12), rgba(212,168,32,0.04))',
                        borderLeft: '2px solid #d4a820',
                        paddingLeft: '10px',
                      } : {}}
                    >
                      {/* Active dot */}
                      <span
                        className="text-[10px] flex-shrink-0 transition-colors"
                        style={{ color: isActive || isPage ? '#d4a820' : 'rgba(212,168,32,0.3)' }}
                      >
                        {item.isWishlist ? (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill={wishlist.length > 0 ? '#d4a820' : 'none'} stroke={wishlist.length > 0 ? '#d4a820' : 'rgba(212,168,32,0.5)'} strokeWidth="2" strokeLinecap="round">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                          </svg>
                        ) : item.icon}
                      </span>

                      <span className="font-body text-[12px] tracking-wide font-light flex-1">
                        {item.label}
                      </span>

                      {/* Wishlist count badge */}
                      {item.isWishlist && wishlist.length > 0 && (
                        <span
                          className="text-[9px] font-body font-semibold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(220,38,38,0.8)', color: 'white' }}
                        >
                          {wishlist.length}
                        </span>
                      )}

                      {/* Active indicator */}
                      {(isActive || isPage) && !item.isWishlist && (
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#d4a820' }} />
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ─── Footer ─── */}
      <div className="relative px-5 py-3.5 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between">
          <p className="text-white/18 text-[9px] font-body tracking-widest uppercase">
            © 2025 Lumière Gems
          </p>
          <div className="flex items-center gap-1">
            {['◆', '◇', '◆'].map((s, i) => (
              <span key={i} className="text-[6px]" style={{ color: `rgba(212,168,32,${0.15 + i * 0.1})` }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
