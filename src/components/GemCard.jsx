import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { useCompare } from '../context/CompareContext.jsx'
import QuickView from './QuickView.jsx'

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price)
}

export default function GemCard({ gem, index = 0 }) {
  const navigate = useNavigate()
  const { toggle: wishToggle, isWished } = useWishlist()
  const { addToast } = useToast()
  const { toggleCompare, isComparing, canAdd } = useCompare()
  const [imgLoaded, setImgLoaded] = useState(false)
  const [showQuick, setShowQuick] = useState(false)

  const wished = isWished(gem.id)
  const comparing = isComparing(gem.id)

  const handleWish = (e) => {
    e.stopPropagation()
    wishToggle(gem.id)
    addToast(wished
      ? { message: 'Removed from wishlist', type: 'wishlist_remove', icon: '♡' }
      : { message: 'Saved to wishlist', type: 'wishlist_add', icon: '♥' }
    )
  }

  const handleCompare = (e) => {
    e.stopPropagation()
    if (!comparing && !canAdd) {
      addToast({ message: 'Max 3 gems for comparison', type: 'info', icon: '⚖' })
      return
    }
    toggleCompare(gem)
    addToast(comparing
      ? { message: 'Removed from comparison', type: 'info', icon: '⚖' }
      : { message: 'Added to comparison', type: 'compare', icon: '⚖' }
    )
  }

  return (
    <>
      <div
        className="gem-card group cursor-pointer animate-fadeInUp"
        style={{ animationDelay: `${index * 55}ms`, animationFillMode: 'both' }}
        onClick={() => navigate(`/gem/${gem.id}`)}
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl bg-[#e8e4de] aspect-square">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8e4de] to-[#d8d4ce] shimmer" />
          )}
          <img
            src={gem.image} alt={gem.name} loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={`gem-image w-full h-full object-cover transition-all duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Hover overlay */}
          <div
            className="gem-overlay absolute inset-0 opacity-0 transition-opacity duration-300 flex flex-col justify-between p-3 pb-5"
            style={{ background: 'linear-gradient(to top, rgba(5,14,42,0.92) 0%, rgba(5,14,42,0.4) 50%, transparent 100%)' }}
          >
            {/* Top row: Quick View + Compare */}
            <div className="flex items-center justify-between gap-1.5">
              <button
                className="flex items-center gap-1.5 text-[9px] font-body font-medium tracking-wider uppercase py-1.5 px-2.5 rounded-lg text-white transition-all hover:scale-105 active:scale-95 flex-1 justify-center"
                style={{ background: 'rgba(5,14,42,0.7)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.12)' }}
                onClick={e => { e.stopPropagation(); setShowQuick(true) }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Quick
              </button>
              <button
                className={`flex items-center gap-1.5 text-[9px] font-body font-medium tracking-wider uppercase py-1.5 px-2.5 rounded-lg transition-all hover:scale-105 active:scale-95 flex-1 justify-center ${comparing ? 'text-[#60a5fa]' : 'text-white'}`}
                style={{
                  background: comparing ? 'rgba(96,165,250,0.2)' : 'rgba(5,14,42,0.7)',
                  backdropFilter: 'blur(4px)',
                  border: comparing ? '1px solid rgba(96,165,250,0.4)' : '1px solid rgba(255,255,255,0.12)',
                }}
                onClick={handleCompare}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
                {comparing ? 'Added' : 'Compare'}
              </button>
            </div>

            {/* Bottom snippet */}
            <p className="text-white/70 text-[10px] font-body leading-relaxed line-clamp-2 mb-2">
              {gem.description?.substring(0, 72)}…
            </p>
          </div>

          {/* Category badge */}
          <div className="absolute top-2.5 left-2.5">
            <span className="bg-[#050e2a]/80 backdrop-blur-sm text-white/70 text-[8px] font-body font-medium tracking-[0.18em] uppercase px-2 py-0.5 rounded-full border border-white/10">
             {gem.categories ? gem.categories[0] : gem.category}
            </span>
          </div>

          {/* Unheated badge */}
          {gem.treatment === 'None' && (
            <div className="absolute bottom-2.5 left-2.5">
              <span
                className="text-[7px] font-body font-medium tracking-[0.15em] uppercase px-2 py-0.5 rounded-full border"
                style={{ background: 'rgba(212,168,32,0.15)', borderColor: 'rgba(212,168,32,0.4)', color: '#d4a820' }}
              >
                ✦ Unheated
              </span>
            </div>
          )}

          {/* Heart */}
          <button
            className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 ${wished ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            style={{
              background: wished ? 'rgba(220,38,38,0.88)' : 'rgba(5,14,42,0.65)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            onClick={handleWish}
            aria-label={wished ? 'Remove from wishlist' : 'Save'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill={wished ? 'white' : 'none'} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          </button>

          {/* Compare indicator ring */}
          {comparing && (
            <div className="absolute inset-0 rounded-xl pointer-events-none"
              style={{ boxShadow: 'inset 0 0 0 2px rgba(96,165,250,0.7)' }} />
          )}
        </div>

        {/* Body */}
        <div className="pt-3 pb-1 px-0.5">
          <h3 className="font-display text-[14px] font-semibold text-[#1a1a2e] leading-snug line-clamp-2 group-hover:text-[#0d1c42] transition-colors">
            {gem.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="10" r="3"/>
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 6.9 8 11.7z"/>
            </svg>
            <span className="font-body text-[10px] text-[#9ca3af] tracking-wider">
              {gem.origin}{gem.carats && ` · ${gem.carats} ct`}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="font-display text-base font-semibold text-[#0d1c42]">
              {formatPrice(gem.price)}
            </span>
            <button
              className="flex items-center gap-1 text-[9px] font-body font-medium tracking-[0.15em] uppercase py-1.5 px-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #050e2a, #0d1c42)', color: '#d4a820', boxShadow: '0 2px 6px rgba(5,14,42,0.18)' }}
              onClick={e => { e.stopPropagation(); navigate(`/gem/${gem.id}`) }}
            >
              View
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showQuick && <QuickView gem={gem} onClose={() => setShowQuick(false)} />}
    </>
  )
}
