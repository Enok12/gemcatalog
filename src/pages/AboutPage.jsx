import React from 'react'
import { useNavigate } from 'react-router-dom'

const STATS = [
  { num: '16+', label: 'Years of Excellence' },
  { num: '3,400+', label: 'Gems Certified' },
  { num: '62', label: 'Countries Served' },
  { num: '100%', label: 'Lab Verified' },
]

const ORIGINS = [
  { country: 'Sri Lanka', gems: 'Sapphire, Ruby, Moonstone', flag: '🇱🇰' },
  { country: 'Myanmar', gems: 'Ruby, Spinel, Jadeite', flag: '🇲🇲' },
  { country: 'Cambodia', gems: 'Emerald', flag: '🇰🇭' },
  { country: 'Tanzania', gems: 'Tanzanite, Spinel, Tsavorite', flag: '🇹🇿' },
  { country: 'Vietnam', gems: 'Alexandrite, Paraiba, Imperial Topaz', flag: '🇻🇳' },
  { country: 'Laos', gems: 'Demantoid, Alexandrite', flag: '🇱🇦' },
]

const CERTS = [
  { name: 'GIA', full: 'Gemological Institute of America', color: '#1a6faf' },
  { name: 'AGL', full: 'American Gemological Laboratories', color: '#2d7d46' },
  { name: 'Gübelin', full: 'Gübelin Gem Lab, Switzerland', color: '#8b1a1a' },
  { name: 'SSEF', full: 'Swiss Gemmological Institute', color: '#6b4a1a' },
]

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="relative overflow-hidden px-6 py-14 md:px-10"
        style={{ background: 'linear-gradient(135deg, #050e2a 0%, #0d1c42 60%, #091535 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #d4a820 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/4 w-40 h-40 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #d4a820 0%, transparent 70%)' }} />
          {/* Gem SVG */}
          <svg className="absolute right-10 top-8 opacity-10 hidden md:block" width="100" height="100" viewBox="0 0 100 100" fill="none">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="#d4a820" strokeWidth="0.8"/>
            <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="rgba(212,168,32,0.08)" stroke="#d4a820" strokeWidth="0.5"/>
            <line x1="50" y1="5" x2="50" y2="95" stroke="#d4a820" strokeWidth="0.3" opacity="0.5"/>
            <line x1="5" y1="27.5" x2="95" y2="72.5" stroke="#d4a820" strokeWidth="0.3" opacity="0.5"/>
            <line x1="95" y1="27.5" x2="5" y2="72.5" stroke="#d4a820" strokeWidth="0.3" opacity="0.5"/>
          </svg>
        </div>

        <div className="relative max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#d4a820' }} />
            <span className="text-[10px] font-body tracking-[0.4em] uppercase" style={{ color: 'rgba(212,168,32,0.7)' }}>
              Our Story
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-white leading-tight">
            About <span className="italic font-light" style={{ color: '#d4a820' }}>CGT</span>
          </h1>
          <p className="mt-4 font-body text-white/55 text-sm leading-relaxed max-w-xl font-light">
            Cambodian Gem Traders (CGT) specialize in mining, buying, cutting, and selling precious and semi precious stones, famous for Gemstones, Rubies and Sapphires , along with Zircon. We are the international Key trading hub in Phnom Penh, cambodia. Cambodian Gem Traders (CGT) introducing cambodia's gemstones to the International market with reliable and sustainable sources
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 md:px-10 py-10 border-b border-[#e0dbd4]" style={{ background: '#faf8f5' }} hidden>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ num, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl font-semibold" style={{ color: '#050e2a' }}>{num}</p>
              <p className="font-body text-[11px] text-[#9ca3af] tracking-[0.2em] uppercase mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 py-12 max-w-4xl mx-auto space-y-14">

        {/* Mission */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #d4a820, transparent)' }} />
            <h2 className="font-display text-2xl font-semibold text-[#1a1a2e] whitespace-nowrap">
              Our <span className="italic font-light" style={{ color: '#d4a820' }}>Mission</span>
            </h2>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #d4a820)' }} />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '◈',
                title: 'Direct Sourcing',
                text: 'We travel directly to mining regions in Sri Lanka, Myanmar, Colombia, and beyond — cutting out intermediaries to bring you exceptional stones at fair prices.',
              },
              {
                icon: '◆',
                title: 'Full Certification',
                text: 'Every stone we sell is accompanied by a reputable laboratory certificate confirming origin, treatment status, and authenticity.',
              },
              {
                icon: '◇',
                title: 'Ethical Practice',
                text: 'We are committed to responsible sourcing. We work only with partners who meet international labor standards and support community development programs.',
              },
            ].map(({ icon, title, text }) => (
              <div key={title} className="p-6 rounded-2xl border border-[#e0dbd4] bg-white hover:border-[#d4a820]/30 transition-colors">
                <div className="text-2xl mb-3" style={{ color: '#d4a820' }}>{icon}</div>
                <h3 className="font-display text-lg font-semibold text-[#1a1a2e] mb-2">{title}</h3>
                <p className="font-body text-[12px] text-[#6b7280] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Origins */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #d4a820, transparent)' }} />
            <h2 className="font-display text-2xl font-semibold text-[#1a1a2e] whitespace-nowrap">
              Global <span className="italic font-light" style={{ color: '#d4a820' }}>Origins</span>
            </h2>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #d4a820)' }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ORIGINS.map(({ country, gems, flag }) => (
              <div key={country} className="flex items-start gap-3 p-4 rounded-xl border border-[#e0dbd4] bg-white hover:bg-[#faf8f5] transition-colors">
                <span className="text-2xl flex-shrink-0 mt-0.5">{flag}</span>
                <div>
                  <p className="font-body text-sm font-medium text-[#1a1a2e]">{country}</p>
                  <p className="font-body text-[10px] text-[#9ca3af] tracking-wide mt-0.5 leading-relaxed">{gems}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #d4a820, transparent)' }} />
            <h2 className="font-display text-2xl font-semibold text-[#1a1a2e] whitespace-nowrap">
              Lab <span className="italic font-light" style={{ color: '#d4a820' }}>Certifications</span>
            </h2>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #d4a820)' }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CERTS.map(({ name, full, color }) => (
              <div key={name}
                className="flex flex-col items-center text-center p-5 rounded-2xl border border-[#e0dbd4] bg-white hover:border-[#d4a820]/30 hover:-translate-y-0.5 transition-all">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 font-display text-lg font-bold text-white"
                  style={{ background: color }}
                >
                  {name}
                </div>
                <p className="font-body text-[10px] text-[#6b7280] tracking-wide leading-relaxed">{full}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="relative overflow-hidden rounded-2xl p-8 md:p-10 text-center"
          style={{ background: 'linear-gradient(135deg, #050e2a, #0d1c42)' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #d4a820 0%, transparent 70%)' }} />
          </div>
          <div className="relative">
            <p className="font-body text-white/40 text-[10px] tracking-[0.4em] uppercase mb-2">Ready to Invest?</p>
            <h3 className="font-display text-3xl font-medium text-white mb-2">
              Browse Our <span className="italic font-light" style={{ color: '#d4a820' }}>Collection</span>
            </h3>
            <p className="font-body text-white/40 text-sm mb-6 font-light">
              Every gem is available for enquiry. Free worldwide insured shipping.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-body text-xs font-medium tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #d4a820, #e8c35a)', color: '#050e2a', boxShadow: '0 4px 20px rgba(212,168,32,0.4)' }}
            >
              View All Gems
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
