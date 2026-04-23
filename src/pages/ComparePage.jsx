import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCompare } from '../context/CompareContext.jsx'

function formatPrice(p) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(p)
}

const FIELDS = [
  { key: 'price',     label: 'Price',      fmt: (v) => <span className="font-display text-xl font-semibold" style={{ color: '#d4a820' }}>{formatPrice(v)}</span> },
  { key: 'carats',    label: 'Weight',     fmt: (v) => v ? `${v} ct` : '—' },
  { key: 'color',     label: 'Color',      fmt: v => v },
  { key: 'origin',    label: 'Origin',     fmt: v => v },
  { key: 'cut',       label: 'Cut',        fmt: v => v },
  { key: 'treatment', label: 'Treatment',
    fmt: (v) => (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
        v === 'None'
          ? 'text-[#d4a820] border border-[#d4a820]/40 bg-[#d4a820]/8'
          : 'text-[#6b7280] border border-gray-200 bg-gray-50'
      }`}>
        {v === 'None' ? '✦ Unheated' : v}
      </span>
    )
  },
{ key: 'categories', label: 'Category', fmt: (v, gem) => {
  if (Array.isArray(v)) return v.join(', ')
  if (v) return v
  return gem?.category || '—'
}},
]

function ScoreBar({ gem }) {
  const rarity = gem.treatment === 'None' ? 95 : 70
  const value = Math.min(100, Math.round((gem.price / 130000) * 100))
  const clarity = gem.carats ? Math.min(100, Math.round(100 - gem.carats * 3)) : 80

  return (
    <div className="space-y-2.5 mt-3">
      {[
        { label: 'Rarity', val: rarity, color: '#d4a820' },
        { label: 'Value Index', val: value, color: '#60a5fa' },
        { label: 'Clarity Est.', val: clarity, color: '#34d399' },
      ].map(({ label, val, color }) => (
        <div key={label}>
          <div className="flex justify-between mb-1">
            <span className="font-body text-[10px] tracking-wider text-[#9ca3af] uppercase">{label}</span>
            <span className="font-body text-[10px] text-[#374151] font-medium">{val}</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#e8e4de] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${val}%`, background: color }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ComparePage() {
  const navigate = useNavigate()
  const { compareList, clearCompare, toggleCompare } = useCompare()

  if (compareList.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="text-5xl mb-4 opacity-20">⚖</div>
        <h2 className="font-display text-3xl text-[#1a1a2e]/40">Nothing to compare</h2>
        <p className="font-body text-sm text-[#9ca3af] mt-2">Select at least 2 gems from the catalog to compare</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-7 py-3 font-body text-xs tracking-widest uppercase rounded-full text-white hover:scale-105 transition-all"
          style={{ background: 'linear-gradient(135deg, #050e2a, #0d1c42)' }}
        >
          Browse Catalog
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="relative overflow-hidden px-6 py-8 md:px-10"
        style={{ background: 'linear-gradient(135deg, #050e2a 0%, #0d1c42 60%, #091535 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #d4a820 0%, transparent 70%)' }} />
        </div>
        <div className="relative flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8" style={{ background: '#d4a820' }} />
              <span className="text-[10px] font-body tracking-[0.4em] uppercase" style={{ color: 'rgba(212,168,32,0.7)' }}>
                Side by Side
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white">
              Gem <span className="italic font-light" style={{ color: '#d4a820' }}>Comparison</span>
            </h2>
            <p className="mt-1 font-body text-white/40 text-sm font-light">
              Comparing {compareList.length} stones
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="font-body text-xs tracking-[0.2em] uppercase hidden sm:inline">Back</span>
          </button>
        </div>
      </div>

      <div className="p-5 md:p-10 max-w-5xl mx-auto">
        {/* Image + name cards row */}
        <div
          className="grid gap-4 mb-6"
          style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}
        >
          {/* Empty corner */}
          <div />
          {compareList.map(gem => (
            <div key={gem.id} className="text-center">
              <div className="relative rounded-2xl overflow-hidden bg-[#e8e4de] aspect-square mb-3 cursor-pointer group"
                onClick={() => navigate(`/gem/${gem.id}`)}>
                <img src={gem.image} alt={gem.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  style={{ background: 'rgba(5,14,42,0.5)' }}>
                  <span className="font-body text-white text-[10px] tracking-widest uppercase">View Details</span>
                </div>
                {/* Remove from compare */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleCompare(gem) }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  style={{ background: 'rgba(220,38,38,0.8)', backdropFilter: 'blur(4px)' }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <h3 className="font-display text-sm font-semibold text-[#1a1a2e] leading-snug line-clamp-2 mb-1">
                {gem.name}
              </h3>
              <span className="font-body text-[10px] text-[#9ca3af] tracking-wider">{gem.origin}</span>

              {/* Score bars */}
              <ScoreBar gem={gem} />
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="rounded-2xl overflow-hidden border border-[#e0dbd4] bg-white shadow-sm">
          {FIELDS.map((field, fi) => (
            <div
              key={field.key}
              className="grid items-center"
              style={{
                gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)`,
                background: fi % 2 === 0 ? 'white' : '#faf8f5',
                borderBottom: fi < FIELDS.length - 1 ? '1px solid #f0ede8' : 'none',
              }}
            >
              {/* Label */}
              <div className="px-5 py-4">
                <span className="font-body text-[11px] text-[#9ca3af] tracking-[0.2em] uppercase font-medium">
                  {field.label}
                </span>
              </div>
              {/* Values */}
              {compareList.map((gem, gi) => {
               const val = field.key === 'categories'
              ? (gem.categories || gem.category)
              : gem[field.key]
                // Highlight best price (lowest)
                let highlight = false
                if (field.key === 'price') {
                  const prices = compareList.map(g => g.price)
                  highlight = val === Math.min(...prices)
                }
                if (field.key === 'carats') {
                  const carats = compareList.map(g => g.carats || 0)
                  highlight = val === Math.max(...carats)
                }

                return (
                  <div
                    key={gem.id}
                    className="px-5 py-4 font-body text-sm text-[#374151] flex items-center"
                    style={{
                      background: highlight ? 'rgba(212,168,32,0.06)' : 'transparent',
                      borderLeft: gi > 0 ? '1px solid #f0ede8' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {field.fmt(val)}
                      {highlight && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#d4a820">
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                        </svg>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Description comparison */}
        <div className="mt-6 rounded-2xl overflow-hidden border border-[#e0dbd4] bg-white shadow-sm">
          <div
            className="grid"
            style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}
          >
            <div className="px-5 py-5 border-b border-[#f0ede8] flex items-start">
              <span className="font-body text-[11px] text-[#9ca3af] tracking-[0.2em] uppercase font-medium mt-0.5">
                About
              </span>
            </div>
            {compareList.map((gem, gi) => (
              <div
                key={gem.id}
                className="px-5 py-5 border-b border-[#f0ede8]"
                style={{ borderLeft: gi > 0 ? '1px solid #f0ede8' : 'none' }}
              >
                <p className="font-body text-[12px] text-[#6b7280] leading-relaxed line-clamp-4">
                  {gem.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div
          className="mt-6 grid gap-4"
          style={{ gridTemplateColumns: `200px repeat(${compareList.length}, 1fr)` }}
        >
          <div className="flex items-center">
            <button
              onClick={clearCompare}
              className="font-body text-xs text-[#9ca3af] hover:text-[#1a1a2e] tracking-wider transition-colors flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Clear all
            </button>
          </div>
          {compareList.map(gem => (
            <button
              key={gem.id}
              onClick={() => navigate(`/gem/${gem.id}`)}
              className="py-3 rounded-xl font-body text-xs font-medium tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #050e2a, #0d1c42)',
                color: '#d4a820',
                boxShadow: '0 4px 14px rgba(5,14,42,0.25)',
              }}
            >
              View Details
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
