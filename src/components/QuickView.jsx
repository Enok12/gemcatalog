import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'

const WHATSAPP_NUMBER = '66613953588'

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export default function QuickView({ gem, onClose }) {
  const navigate = useNavigate()
  const { toggle, isWished } = useWishlist()
  const wished = isWished(gem.id)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const whatsappMsg = encodeURIComponent(
    `Hello, I'm interested in the ${gem.name} (${gem.carats ? gem.carats + ' ct, ' : ''}${gem.origin}) listed at ${formatPrice(gem.price)}.`
  )

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(2,8,24,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#f8f5f0] rounded-2xl overflow-hidden shadow-2xl"
        style={{
          animation: 'quickViewIn 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-[#050e2a]/80 text-white/70 hover:text-white hover:bg-[#050e2a] transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-2/5 flex-shrink-0 bg-[#e8e4de] relative">
            <div className="aspect-square">
              <img src={gem.image} alt={gem.name} className="w-full h-full object-cover" />
            </div>
            {/* Wishlist heart */}
            <button
              onClick={() => toggle(gem.id)}
              className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: wished ? 'rgba(220,38,38,0.9)' : 'rgba(5,14,42,0.7)',
                backdropFilter: 'blur(4px)',
              }}
              aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? 'white' : 'none'} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </button>
            {gem.treatment === 'None' && (
              <div className="absolute top-3 left-3">
                <span className="text-[9px] font-body tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(212,168,32,0.2)', border: '1px solid rgba(212,168,32,0.5)', color: '#b8900f' }}>
                  ✦ No Heat
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="mb-1">
              <span className="font-body text-[9px] tracking-[0.3em] uppercase font-medium" style={{ color: '#d4a820' }}>
                {gem.category} · {gem.origin}
              </span>
            </div>
            <h2 className="font-display text-2xl font-semibold text-[#1a1a2e] leading-tight mb-3">
              {gem.name}
            </h2>

            <div className="mb-4 p-3.5 rounded-xl" style={{ background: 'linear-gradient(135deg, #050e2a, #091535)' }}>
              <p className="font-display text-3xl font-semibold" style={{ color: '#d4a820' }}>
                {formatPrice(gem.price)}
              </p>
              {gem.carats && (
                <p className="font-body text-xs text-white/45 mt-0.5 tracking-wider">
                  {formatPrice(Math.round(gem.price / gem.carats))}/ct · {gem.carats} carats
                </p>
              )}
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { label: 'Color', val: gem.color },
                { label: 'Cut', val: gem.cut },
                { label: 'Origin', val: gem.origin },
                { label: 'Treatment', val: gem.treatment },
              ].map(({ label, val }) => val && (
                <div key={label} className="bg-[#f0ede8] rounded-lg p-2.5">
                  <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[#9ca3af] mb-0.5">{label}</p>
                  <p className="font-body text-[12px] text-[#1a1a2e] font-medium leading-snug">{val}</p>
                </div>
              ))}
            </div>

            <p className="font-body text-[12px] text-[#6b7280] leading-relaxed mb-5 flex-1 line-clamp-3">
              {gem.description}
            </p>

            <div className="space-y-2.5 mt-auto">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-body text-xs font-medium tracking-widest uppercase text-white transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 4px 14px rgba(37,211,102,0.3)' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Enquire on WhatsApp
              </a>
              <button
                onClick={() => { onClose(); navigate(`/gem/${gem.id}`) }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-body text-xs font-medium tracking-widest uppercase border transition-all hover:bg-[#050e2a] hover:!text-white hover:border-[#050e2a]"
                style={{ color: '#050e2a', borderColor: 'rgba(5,14,42,0.25)' }}
              >
                Full Details
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes quickViewIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0px);  }
        }
      `}</style>
    </div>
  )
}
