import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'
import GemCard from '../components/GemCard.jsx'
import CompareBar from '../components/CompareBar.jsx'
import gems from '../data/gems.json'

export default function Wishlist() {
  const { wishlist } = useWishlist()
  const navigate = useNavigate()
  const wishedGems = gems.filter(g => wishlist.includes(g.id))

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div
        className="relative overflow-hidden px-6 py-8 md:px-10"
        style={{ background: 'linear-gradient(135deg, #050e2a 0%, #0d1c42 60%, #091535 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #d4a820 0%, transparent 70%)' }} />
        </div>
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8" style={{ background: '#d4a820' }} />
              <span className="text-[10px] font-body tracking-[0.4em] uppercase" style={{ color: 'rgba(212,168,32,0.7)' }}>
                Your Collection
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white">
              Saved <span className="italic font-light" style={{ color: '#d4a820' }}>Wishlist</span>
            </h2>
            <p className="mt-1.5 font-body text-white/40 text-sm font-light">
              {wishedGems.length} stone{wishedGems.length !== 1 ? 's' : ''} saved
            </p>
          </div>
          {wishedGems.length > 0 && (
            <button onClick={() => navigate('/')}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-xs tracking-widest uppercase text-white/60 hover:text-white border border-white/15 hover:border-white/30 transition-all">
              Browse More
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="p-5 md:p-10">
        {wishedGems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="mb-5 opacity-15">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </div>
            <p className="font-display text-2xl text-[#1a1a2e]/40">No saved gems yet</p>
            <p className="font-body text-sm text-[#9ca3af] mt-2 tracking-wide max-w-xs">
              Hover over any gem card and click the heart icon to save it here
            </p>
            <button onClick={() => navigate('/')}
              className="mt-6 px-7 py-3 font-body text-xs tracking-widest uppercase rounded-full text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #050e2a, #0d1c42)' }}>
              Browse Catalog
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="font-body text-xs text-[#9ca3af] tracking-wider">
                <strong className="text-[#1a1a2e]">{wishedGems.length}</strong> stone{wishedGems.length !== 1 ? 's' : ''} saved
              </p>
              <p className="font-body text-[10px] text-[#9ca3af] tracking-wider">
                Tip: hover a card and click ⚖ to compare
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {wishedGems.map((gem, i) => (
                <GemCard key={gem.id} gem={gem} index={i} />
              ))}
            </div>
          </>
        )}
      </div>

      <CompareBar />
    </div>
  )
}
