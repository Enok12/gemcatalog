import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCompare } from '../context/CompareContext.jsx'

export default function CompareBar() {
  const { compareList, clearCompare } = useCompare()
  const navigate = useNavigate()

  if (compareList.length === 0) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] lg:left-72"
      style={{ animation: 'slideUpBar 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
    >
      <div
        className="mx-auto max-w-3xl mb-4 mx-4 rounded-2xl px-5 py-3.5 flex items-center gap-4 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #050e2a, #0d1c42)',
          border: '1px solid rgba(212,168,32,0.25)',
          boxShadow: '0 8px 40px rgba(5,14,42,0.5), 0 0 0 1px rgba(212,168,32,0.1)',
        }}
      >
        {/* Gem thumbnails */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Slots (always 3) */}
          {[0, 1, 2].map(i => {
            const gem = compareList[i]
            return (
              <div
                key={i}
                className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200"
                style={{
                  border: gem
                    ? '1.5px solid rgba(212,168,32,0.6)'
                    : '1.5px dashed rgba(255,255,255,0.15)',
                  background: gem ? 'transparent' : 'rgba(255,255,255,0.04)',
                }}
              >
                {gem ? (
                  <img src={gem.image} alt={gem.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/20 text-lg font-display">+</span>
                  </div>
                )}
              </div>
            )
          })}

          <div className="min-w-0 ml-1">
            <p className="font-body text-[10px] text-white/40 tracking-wider uppercase">Comparing</p>
            <p className="font-body text-xs text-white/80 truncate">
              {compareList.length === 1
                ? compareList[0].name
                : `${compareList.length} gems selected`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          {compareList.length >= 2 && (
            <button
              onClick={() => navigate('/compare')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-body text-xs font-medium tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #d4a820, #e8c35a)',
                color: '#050e2a',
                boxShadow: '0 3px 12px rgba(212,168,32,0.35)',
              }}
            >
              Compare
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          )}
          {compareList.length < 2 && (
            <span className="font-body text-[10px] text-white/35 tracking-wider">
              Add {2 - compareList.length} more
            </span>
          )}
          <button
            onClick={clearCompare}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Clear comparison"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUpBar {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  )
}
