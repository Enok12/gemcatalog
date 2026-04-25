import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GemCard from '../components/GemCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CompareBar from '../components/CompareBar.jsx'
import gems from '../data/gems.json'
import { Helmet } from 'react-helmet-async'


const CATEGORIES = ['All', 'Investment Stones', 'Gemstones', 'Amber', 'Amethyst', 'Ametrine', 'Aquamarine', 'Citrine', 'Diamond', 'Fancy Color Diamond', 'Emerald', 'Garnet', 'Iolite', 'Jade', 'Kunzite', 'Lapis Lazuli', 'Moonstone', 'Morganite', 'Opal', 'Pearl', 'Peridot', 'Rose Quartz', 'Ruby', 'Sapphire', 'Spinel', 'Sunstone', 'Tanzanite', 'Topaz', 'Tourmaline', 'Turquoise', 'Zircon']

const CATEGORY_DESCRIPTIONS = {
  'All': 'Explore our world-class collection of certified natural gemstones from the finest sources worldwide.',
  'Investment Stones': 'Rare and valuable investment-grade gemstones for collectors and investors seeking tangible wealth.',
  'Gemstones': 'Carefully curated fine gemstones, each certified for authenticity and quality standards.',
  'Amber': 'Ancient fossilized tree resin with warm, golden hues and fascinating inclusions preserved for millions of years.',
  'Amethyst': 'Beautiful purple quartz crystals prized for their calming energy and stunning crystalline formations.',
  'Ametrine': 'Stunning bi-color quartz combining the purple of amethyst and golden hues of citrine in one extraordinary stone.',
  'Aquamarine': 'Serene blue-green beryl gemstones evoking the clarity and beauty of tropical ocean waters.',
  'Citrine': 'Radiant yellow to golden quartz gemstones known for their warm brilliance and positive energy.',
  'Diamond': 'Exceptional diamonds certified for unparalleled brilliance, fire, and timeless elegance.',
  'Fancy Color Diamond': 'Rare colored diamonds in vivid hues—pink, yellow, blue—highly sought by collectors worldwide.',
  'Emerald': 'Lush green beryl gemstones from Colombia, Zambia, and beyond, representing nature\'s finest green.',
  'Garnet': 'Deep red and multi-colored garnet varieties prized for their rich color and brilliant sparkle.',
  'Iolite': 'Striking blue-violet gemstones with unique pleochroic effects, offering remarkable optical properties.',
  'Jade': 'Precious jade in vibrant greens and other colors, revered for its cultural significance and durability.',
  'Kunzite': 'Delicate lavender to pink gemstones from the spodumene family with remarkable transparency.',
  'Lapis Lazuli': 'Deep blue gemstones with golden pyrite flecks, used since ancient times for beauty and spirituality.',
  'Moonstone': 'Ethereal gemstones displaying magical blue-white adularescence effects that appear to glow from within.',
  'Morganite': 'Elegant pink to peach beryl gemstones combining rarity with exceptional clarity and light.',
  'Opal': 'Mesmerizing gemstones displaying spectacular play-of-color with multicolored optical phenomena.',
  'Pearl': 'Lustrous pearls from pristine oceans—South Sea, Freshwater, and Baroque varieties of unmatched elegance.',
  'Peridot': 'Vibrant lime-green olivine gemstones known for their sunny disposition and brilliant luster.',
  'Rose Quartz': 'Gentle pink quartz gemstones symbolizing love and compassion with serene, calming properties.',
  'Ruby': 'Vivid red corundum gemstones—precious, valuable, and considered the king of gemstones.',
  'Sapphire': 'Exquisite blue corundum gemstones from the world\'s finest mining regions, unparalleled in quality.',
  'Spinel': 'Underrated gemstones rivaling sapphires and rubies, available in spectacular vivid colors.',
  'Sunstone': 'Radiant gemstones with golden-orange hues and striking schiller effects resembling captured sunlight.',
  'Tanzanite': 'Extremely rare blue-violet gemstones found only in Tanzania, destined to become a collector\'s treasure.',
  'Topaz': 'Brilliant gemstones in imperial gold, stunning blues, and vibrant multicolored varieties.',
  'Tourmaline': 'Remarkably diverse gemstone family offering virtually every color, including the coveted Paraiba blues.',
  'Turquoise': 'Striking blue-green gemstones prized for their warm beauty and cultural significance across civilizations.',
  'Zircon': 'Brilliant gemstones with exceptional sparkle and fire, available in rich blues, warm golds, and vivid reds.',
}

const PRICE_RANGES = [
  { label: 'Any', min: 0, max: Infinity },
  { label: '< $10k',    min: 0,     max: 10000 },
  { label: '$10–30k',   min: 10000, max: 30000 },
  { label: '$30–60k',   min: 30000, max: 60000 },
  { label: '$60k+',     min: 60000, max: Infinity },
]

const SORT_OPTIONS = [
  { label: 'Featured',  value: 'featured'    },
  { label: 'Price ↑',  value: 'price_asc'   },
  { label: 'Price ↓',  value: 'price_desc'  },
  { label: 'Carats ↓', value: 'carats_desc' },
  { label: 'A–Z',      value: 'name_asc'    },
]

// Collect unique colors from gem data
const GEM_COLORS = [
  { label: 'All Colors', hex: null },
  { label: 'Blue',    hex: '#3b82f6', match: ['blue', 'cornflower', 'cobalt', 'neon blue', 'royal blue', 'peacock', 'teal', 'indicolite'] },
  { label: 'Red',     hex: '#ef4444', match: ["pigeon's blood", 'vivid red', 'red', 'ruby'] },
  { label: 'Green',   hex: '#22c55e', match: ['green', 'vivid green', 'emerald', 'tsavorite', 'neon green', 'chrome', 'mint'] },
  { label: 'Pink',    hex: '#ec4899', match: ['pink', 'hot pink', 'vivid pink', 'pinkish', 'rubellite', 'rose'] },
  { label: 'Yellow',  hex: '#eab308', match: ['yellow', 'golden', 'gold', 'imperial', 'imperial orange'] },
  { label: 'Purple',  hex: '#a855f7', match: ['purple', 'lavender', 'violet', 'royal blue tanzanite'] },
  { label: 'White',   hex: '#f0ede8', match: ['white', 'silver', 'colorless'] },
  { label: 'Orange',  hex: '#f97316', match: ['orange', 'padparadscha', 'pinkish orange'] },
  { label: 'Change',  hex: null,      match: ['color change', 'change'] },
]

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price)
}

// Spotlight gem: highest price unheated stone
const SPOTLIGHT = gems.filter(g => g.treatment === 'None').sort((a, b) => b.price - a.price)[0]

function SpotlightBanner({ gem }) {
  const navigate = useNavigate()
  if (!gem) return null
  return (
      <div
        className="relative overflow-hidden mx-5 md:mx-10 mt-6 rounded-2xl cursor-pointer group transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
        onClick={() => navigate(`/gem/${gem.id}`)}
        style={{ boxShadow: '0 8px 40px rgba(5,14,42,0.18)' }}
      >
      {/* Background image */}
      <div className="aspect-[3/1] md:aspect-[4/1] relative">
        <img src={gem.image} alt={gem.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(5,14,42,0.92) 0%, rgba(5,14,42,0.75) 50%, rgba(5,14,42,0.2) 100%)' }} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center px-7 md:px-10">
        <div className="max-w-md">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-[8px] font-body tracking-[0.4em] uppercase font-medium px-2.5 py-1 rounded-full border"
              style={{ background: 'rgba(212,168,32,0.15)', borderColor: 'rgba(212,168,32,0.4)', color: '#d4a820' }}>
              ✦ Spotlight
            </span>
            {gem.treatment === 'None' && (
              <span className="text-[8px] font-body tracking-[0.3em] uppercase font-medium text-white/50 border border-white/15 px-2 py-1 rounded-full">
                Unheated
              </span>
            )}
          </div>
          <h3 className="font-display text-xl md:text-2xl font-semibold text-white leading-snug">
            {gem.name}
          </h3>
          <p className="font-body text-white/50 text-xs mt-1 tracking-wide">
            {gem.origin} · {gem.carats && `${gem.carats} ct · `}{gem.cut}
          </p>
          <div className="flex items-center gap-4 mt-3">
            <span className="font-display text-2xl font-semibold" style={{ color: '#d4a820' }}>
              {formatPrice(gem.price)}
            </span>
           <span
              className="font-body font-medium text-[10px] tracking-widest uppercase flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group-hover:gap-3"
              style={{
                background: 'rgba(212,168,32,0.15)',
                border: '1px solid rgba(212,168,32,0.4)',
                color: '#d4a820',
              }}
            >
              View Details
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home({ activeCategory, setActiveCategory }) {
  const [search, setSearch]         = useState('')
  const [priceRange, setPriceRange] = useState(0)
  const [sort, setSort]             = useState('featured')
  const [unheatedOnly, setUnheated] = useState(false)
  const [colorFilter, setColor]     = useState(0) // index into GEM_COLORS

  const filtered = useMemo(() => {
    let list = gems

   if (activeCategory !== 'All' && activeCategory !== 'Gemstones') {
    list = list.filter(g =>
    g.categories
      ? g.categories.includes(activeCategory)
      : g.category === activeCategory
  )
}

    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.color.toLowerCase().includes(q) ||
        g.origin.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        (g.description && g.description.toLowerCase().includes(q))
      )
    }

    const { min, max } = PRICE_RANGES[priceRange]
    list = list.filter(g => g.price >= min && g.price <= max)

    if (unheatedOnly) {
      list = list.filter(g => g.treatment === 'None')
    }

    // Color filter
    const cf = GEM_COLORS[colorFilter]
    if (cf.match) {
      list = list.filter(g =>
        cf.match.some(m => g.color.toLowerCase().includes(m) || g.name.toLowerCase().includes(m))
      )
    }

    const sorted = [...list]
    switch (sort) {
      case 'price_asc':   sorted.sort((a, b) => a.price - b.price); break
      case 'price_desc':  sorted.sort((a, b) => b.price - a.price); break
      case 'carats_desc': sorted.sort((a, b) => (b.carats || 0) - (a.carats || 0)); break
      case 'name_asc':    sorted.sort((a, b) => a.name.localeCompare(b.name)); break
      default: break
    }
    return sorted
  }, [activeCategory, search, priceRange, sort, unheatedOnly, colorFilter])

  const hasFilters = search || priceRange !== 0 || sort !== 'featured' || unheatedOnly || colorFilter !== 0
  const showSpotlight = activeCategory === 'All' && !search && !unheatedOnly && colorFilter === 0 && priceRange === 0

  return (
    <div className="min-h-screen pb-24">

      {/* SEO setup */}
      <Helmet>
        <title>CGT — Certified Natural Gemstones | Cambodian Gem Trading</title>
        <meta name="description" content="Buy certified natural gemstones direct from Cambodia. Sapphires from $1,200, Rubies, Emeralds, Paraiba Tourmaline. GIA certified. Free worldwide shipping." />
        <link rel="canonical" href="https://cgt.onl" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Cambodia Gem Trading",
            "url": "https://cgt.onl",
            "description": "Certified natural gemstones direct from Cambodia",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": ["English"]
            }
          })}
        </script>
      </Helmet>

      {/* Hero strip */}
      <div
        className="relative overflow-hidden px-6 py-8 md:px-10"
        style={{ background: 'linear-gradient(135deg, #050e2a 0%, #0d1c42 60%, #091535 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #d4a820 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #d4a820 0%, transparent 70%)' }} />
          <svg className="absolute right-12 top-4 opacity-[0.08] hidden md:block" width="80" height="80" viewBox="0 0 80 80" fill="none">
            <polygon points="40,4 76,22 76,58 40,76 4,58 4,22" fill="none" stroke="#d4a820" strokeWidth="1"/>
            <polygon points="40,16 64,28 64,52 40,64 16,52 16,28" fill="none" stroke="#d4a820" strokeWidth="0.6"/>
            <line x1="40" y1="4"  x2="40" y2="76" stroke="#d4a820" strokeWidth="0.4"/>
            <line x1="4"  y1="22" x2="76" y2="58" stroke="#d4a820" strokeWidth="0.4"/>
            <line x1="76" y1="22" x2="4"  y2="58" stroke="#d4a820" strokeWidth="0.4"/>
          </svg>
        </div>

        <div className="relative max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8" style={{ background: '#d4a820' }} />
            <span className="text-[15px] font-body font-black tracking-[0.17em] uppercase" style={{ color: 'rgba(212,168,32,0.7)' }}>
              Certified Fine Gemstones
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight">
            {activeCategory === 'All' ? (
              <>The World's Finest<br />
                <span className="italic font-light" style={{ color: '#d4a820' }}>Natural Gemstones</span>
              </>
            ) : (
              <><span className="italic font-light" style={{ color: '#d4a820' }}>{activeCategory}</span><br />Collection</>
            )}
          </h2>
          <p className="mt-2 font-body text-white/60 text-sm leading-relaxed font-medium max-w-lg">
            {CATEGORY_DESCRIPTIONS[activeCategory] || 'Every stone individually certified, ethically sourced, with full laboratory documentation.'}
          </p>
          <div className="mt-4 flex items-center gap-4 text-white/60 font-body font-medium text-xs tracking-wider flex-wrap">
            {[`${filtered.length} stones`, 'GIA Certified', 'Free Shipping'].map((txt, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="w-px h-3.5 bg-white/15" />}
                <span className="flex items-center gap-1.5">
                  <span style={{ color: '#d4a820' }}>✦</span>{txt}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Spotlight */}
      {showSpotlight && <SpotlightBanner gem={SPOTLIGHT} />}

      {/* ── Controls bar ── */}
      <div className="sticky top-0 z-20 bg-[#f0ede8]/96 backdrop-blur-md border-b border-[#ddd8d2]">
        {/* Category pills */}
        <div className="px-5 md:px-10 pt-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 text-[10px] font-body font-medium tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? 'text-white shadow-md scale-[1.03]'
                    : 'text-[#6b7280] bg-white/70 hover:bg-white hover:text-[#1a1a2e] border border-[#ddd8d2]'
                }`}
                style={activeCategory === cat ? { background: 'linear-gradient(135deg, #050e2a, #0d1c42)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search + filters row */}
        <div className="px-5 md:px-10 pb-3 pt-1 flex items-center gap-2.5 flex-wrap">
          <div className="flex-1 min-w-44">
            <SearchBar value={search} onChange={setSearch} resultCount={filtered.length} total={gems.length} />
          </div>

          {/* Price range */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {PRICE_RANGES.map((pr, i) => (
              <button key={pr.label} onClick={() => setPriceRange(i)}
                className={`text-[9px] font-body tracking-wider px-2 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  priceRange === i ? 'text-white' : 'text-[#9ca3af] hover:text-[#1a1a2e] bg-white/60 border border-[#ddd8d2]'
                }`}
                style={priceRange === i ? { background: 'linear-gradient(135deg, #050e2a, #0d1c42)' } : {}}
              >
                {pr.label}
              </button>
            ))}
          </div>

          {/* Unheated toggle */}
          <button
            onClick={() => setUnheated(v => !v)}
            className={`flex items-center gap-1.5 text-[9px] font-body tracking-wider px-2.5 py-1.5 rounded-lg transition-all flex-shrink-0 ${
              unheatedOnly ? 'text-[#b8900f]' : 'text-[#9ca3af] bg-white/60 border border-[#ddd8d2] hover:text-[#1a1a2e]'
            }`}
            style={unheatedOnly ? {
              background: 'rgba(212,168,32,0.12)',
              border: '1px solid rgba(212,168,32,0.4)',
              color: '#d4a820',
            } : {}}
          >
            ✦ Unheated
          </button>

          {/* Sort */}
          <div className="relative flex-shrink-0">
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="appearance-none text-[10px] font-body text-[#374151] bg-white/80 border border-[#ddd8d2] rounded-xl px-3 py-1.5 pr-7 outline-none focus:border-[#d4a820] transition-colors cursor-pointer">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={() => { setSearch(''); setPriceRange(0); setSort('featured'); setUnheated(false); setColor(0) }}
              className="flex-shrink-0 text-[9px] font-body tracking-wider text-[#9ca3af] hover:text-[#1a1a2e] flex items-center gap-1 transition-colors"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Clear
            </button>
          )}
        </div>

        {/* Color swatch chips */}
        <div className="px-5 md:px-10 pb-2.5 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {GEM_COLORS.map(({ label, hex, match }, i) => (
            <button
              key={label}
              onClick={() => setColor(i)}
              className={`flex items-center gap-1.5 flex-shrink-0 text-[9px] font-body tracking-wider px-2.5 py-1.5 rounded-full transition-all ${
                colorFilter === i
                  ? 'text-[#1a1a2e] font-semibold'
                  : 'text-[#9ca3af] hover:text-[#1a1a2e] bg-white/40 border border-[#ddd8d2]'
              }`}
              style={colorFilter === i ? {
                background: hex ? `${hex}22` : 'rgba(212,168,32,0.12)',
                border: `1px solid ${hex || '#d4a820'}66`,
              } : {}}
            >
              {hex && (
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-white/30"
                  style={{ background: hex, boxShadow: colorFilter === i ? `0 0 0 2px ${hex}44` : 'none' }}
                />
              )}
              {!hex && label !== 'All Colors' && <span className="text-[8px]" style={{ color: '#d4a820' }}>↔</span>}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="p-5 md:p-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4 opacity-20">◆</div>
            <p className="font-display text-2xl text-[#1a1a2e]/40">No gems found</p>
            <p className="font-body text-sm text-[#9ca3af] mt-2 tracking-wide">
              {search ? `No results for "${search}"` : 'Try adjusting your filters'}
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setSearch(''); setPriceRange(0); setUnheated(false); setColor(0) }}
              className="mt-5 px-6 py-2.5 font-body text-xs tracking-widest uppercase rounded-full text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #050e2a, #0d1c42)' }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="font-body text-xs text-[#9ca3af] tracking-wider">
                <strong className="text-[#1a1a2e]">{filtered.length}</strong> stone{filtered.length !== 1 ? 's' : ''}
                {unheatedOnly && <span className="ml-2 text-[#d4a820]">✦ Unheated only</span>}
              </p>
              {filtered.length > 1 && (
                <p className="font-body text-[10px] text-[#9ca3af] tracking-wider">
                  {formatPrice(Math.min(...filtered.map(g => g.price)))} – {formatPrice(Math.max(...filtered.map(g => g.price)))}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((gem, i) => (
                <GemCard key={gem.id} gem={gem} index={i} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Floating compare bar */}
      <CompareBar />
    </div>
  )
}
