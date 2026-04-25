import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import gems from '../data/gems.json'
import { useWishlist } from '../context/WishlistContext.jsx'
import { Helmet } from 'react-helmet-async'


const WHATSAPP_NUMBER = '94768482447'

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function DetailRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex items-start justify-between py-3 border-b border-[#e8e4de]">
      <span className="font-body text-[11px] text-[#9ca3af] tracking-[0.2em] uppercase font-medium flex-shrink-0 w-28">
        {label}
      </span>
      <span className="font-body text-sm text-[#1a1a2e] text-right font-light">
        {value}
      </span>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function GemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const gem = gems.find(g => g.id === id)
  const [imgLoaded, setImgLoaded] = useState(false)
  // const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedMedia, setSelectedMedia] = useState({ type: 'image', index: 0 })
  const { toggle, isWished } = useWishlist()
  const wished = gem ? isWished(gem.id) : false

  // Get images array (fallback to single image if not available)
  const images = gem?.images ? gem.images : (gem ? [gem.image] : [])

  if (!gem) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="text-6xl mb-4 opacity-20">◆</div>
        <h2 className="font-display text-3xl text-[#1a1a2e]/50 mb-2">Gem Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-8 py-3 font-body text-xs tracking-widest uppercase rounded-full text-white"
          style={{background: 'linear-gradient(135deg, #050e2a, #0d1c42)'}}
        >
          Return to Catalog
        </button>
      </div>
    )
  }

  // Related gems
  // const related = gems.filter(g => g.category === gem.category && g.id !== gem.id).slice(0, 3)

    const primaryCategory = gem.categories ? gem.categories[0] : gem.category
    const related = gems.filter(g => {
    const gCats = g.categories || [g.category]
    return gCats.includes(primaryCategory) && g.id !== gem.id
  }).slice(0, 3)

  const whatsappMsg = encodeURIComponent(`Hello, I'm interested in the ${gem.name} (${gem.carats ? gem.carats + ' ct, ' : ''}${gem.origin}) listed at ${formatPrice(gem.price)}.`)

  const siteUrl = 'https://cgt.onl'
  const gemUrl = `${siteUrl}/gem/${gem.id}`
  const gemImage = gem.image.startsWith('http') ? gem.image : `${siteUrl}${gem.image}`
  const gemTitle = `${gem.name} — ${gem.carats ? gem.carats + 'ct ' : ''}${gem.origin} | CGT`


  return (
    <div className="detail-enter min-h-screen">
      {/* SEO setup */}
      <Helmet>
            <title>{gemTitle}</title>
            <meta name="description" content={gem.description} />
            <link rel="canonical" href={gemUrl} />

            <meta property="og:type" content="product" />
            <meta property="og:title" content={gemTitle} />
            <meta property="og:description" content={gem.description} />
            <meta property="og:image" content={gemImage} />
            <meta property="og:url" content={gemUrl} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={gemTitle} />
            <meta name="twitter:description" content={gem.description} />
            <meta name="twitter:image" content={gemImage} />

            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": gem.name,
                "description": gem.description,
                "image": gemImage,
                "url": gemUrl,
                "brand": {
                  "@type": "Brand",
                  "name": "Cambodia Gem Trading"
                },
                "offers": {
                  "@type": "Offer",
                  "price": gem.price,
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "url": gemUrl,
                  "seller": {
                    "@type": "Organization",
                    "name": "Cambodia Gem Trading"
                  }
                },
                "additionalProperty": [
                  { "@type": "PropertyValue", "name": "Origin", "value": gem.origin },
                  { "@type": "PropertyValue", "name": "Color", "value": gem.color },
                  { "@type": "PropertyValue", "name": "Cut", "value": gem.cut },
                  { "@type": "PropertyValue", "name": "Treatment", "value": gem.treatment },
                  gem.carats && { "@type": "PropertyValue", "name": "Weight", "value": `${gem.carats} carats` }
                ].filter(Boolean)
              })}
            </script>
          </Helmet>

      {/* Back button */}
      <div className="px-5 md:px-10 pt-6 pb-2 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6b7280] hover:text-[#1a1a2e] transition-colors group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="font-body text-xs tracking-[0.2em] uppercase">Back to Catalog</span>
        </button>
        <button
          onClick={() => toggle(gem.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-body text-xs tracking-wider transition-all hover:scale-105 active:scale-95"
          style={{
            background: wished ? 'rgba(220,38,38,0.1)' : 'rgba(5,14,42,0.07)',
            color: wished ? '#dc2626' : '#6b7280',
            border: `1px solid ${wished ? 'rgba(220,38,38,0.3)' : 'rgba(5,14,42,0.12)'}`,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
          {wished ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="px-5 md:px-10 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

            {/* Left: Image */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-[#e8e4de] aspect-square shadow-xl">
                {!imgLoaded && (
                  <div className="absolute inset-0 shimmer" />
                )}
                {/* <img
                  src={images[selectedImageIndex]}
                  alt={gem.name}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImgLoaded(true)}
                /> */}

                {selectedMedia.type === 'video' ? (
                  <video
                    key={selectedMedia.src}
                    src={selectedMedia.src}
                    className="w-full h-full object-cover"
                    controls autoPlay loop muted
                  />
                  ) : (
                    <img
                      src={images[selectedMedia.index]}
                      alt={gem.name}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setImgLoaded(true)}
                    />
                  )}
                {/* Overlay badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-[#050e2a]/80 backdrop-blur-sm text-white/80 text-[9px] font-body tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-white/10">
                    {gem.category}
                  </span>
                  {gem.treatment === 'None' && (
                    <span className="text-[9px] font-body tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border"
                      style={{
                        background: 'rgba(212,168,32,0.2)',
                        borderColor: 'rgba(212,168,32,0.5)',
                        color: '#d4a820',
                        backdropFilter: 'blur(4px)'
                      }}>
                      ✦ No Heat
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail row */}
              {images.length > 1 && (
                <div className="flex gap-3">
                  {/* {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedImageIndex(i)
                        setImgLoaded(false)
                      }}
                      className={`flex-1 aspect-square rounded-xl overflow-hidden cursor-pointer ring-2 transition-all ${selectedImageIndex === i ? 'ring-[#d4a820]' : 'ring-transparent hover:ring-[#d4a820]/40'}`}
                    >
                      <img
                        src={img}
                        alt={`View ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))} */}

                  {images.map((img, i) => (
                      <button
                        key={`img-${i}`}
                        onClick={() => { setSelectedMedia({ type: 'image', index: i }); setImgLoaded(false) }}
                        className={`flex-1 aspect-square rounded-xl overflow-hidden cursor-pointer ring-2 transition-all ${selectedMedia.type === 'image' && selectedMedia.index === i ? 'ring-[#d4a820]' : 'ring-transparent hover:ring-[#d4a820]/40'}`}
                      >
                        <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}

                    {gem.videos && gem.videos.map((vid, i) => (
                      <button
                        key={`vid-${i}`}
                        onClick={() => setSelectedMedia({ type: 'video', src: vid })}
                        className={`flex-1 aspect-square rounded-xl overflow-hidden cursor-pointer ring-2 transition-all relative ${selectedMedia.type === 'video' && selectedMedia.src === vid ? 'ring-[#d4a820]' : 'ring-transparent hover:ring-[#d4a820]/40'}`}
                      >
                        <video src={vid} className="w-full h-full object-cover" muted />
                        <div className="absolute inset-0 flex items-center justify-center"
                          style={{ background: 'rgba(5,14,42,0.45)' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <polygon points="5,3 19,12 5,21"/>
                          </svg>
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-5" style={{background: '#d4a820'}} />
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase" style={{color: '#d4a820'}}>
                    {gem.origin}
                  </span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#1a1a2e] leading-tight">
                  {gem.name}
                </h1>
                {gem.carats && (
                  <p className="font-body text-[#9ca3af] text-sm mt-1 tracking-wide">
                    {gem.carats} carats · {gem.cut} cut
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="mb-6 p-5 rounded-xl" style={{background: 'linear-gradient(135deg, #050e2a, #091535)', boxShadow: '0 8px 30px rgba(5,14,42,0.2)'}}>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/40 mb-1">Price</p>
                    <p className="font-display text-4xl font-semibold" style={{color: '#d4a820', textShadow: '0 0 20px rgba(212,168,32,0.3)'}}>
                      {formatPrice(gem.price)}
                    </p>
                  </div>
                  {gem.carats && (
                    <div className="text-right">
                      <p className="font-body text-[10px] tracking-widest uppercase text-white/30 mb-1">Per Carat</p>
                      <p className="font-body text-lg text-white/70">
                        {formatPrice(Math.round(gem.price / gem.carats))}/ct
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d4a820" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  <span className="font-body text-[10px] text-white/40 tracking-wider">
                    · Certificate included
                  </span>
                </div>
              </div>

              {/* Spec table */}
              <div className="mb-6">
                <DetailRow label="Origin" value={gem.origin} />
                <DetailRow label="Color" value={gem.color} />
                <DetailRow label="Cut" value={gem.cut} />
                {gem.carats && <DetailRow label="Weight" value={`${gem.carats} carats`} />}
                <DetailRow label="Treatment" value={gem.treatment} />
                <DetailRow
                  label="Category"
                  value={gem.categories ? gem.categories.join(', ') : gem.category}
                />
              </div>

              {/* Description */}
              <div className="mb-7">
                <h3 className="font-body text-[10px] tracking-[0.3em] uppercase text-[#9ca3af] mb-2">About This Stone</h3>
                <p className="font-body text-sm text-[#374151] leading-relaxed font-light">
                  {gem.description}
                </p>
              </div>

              {/* CTA buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl font-body text-sm font-medium tracking-widest uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    color: 'white',
                    boxShadow: '0 6px 20px rgba(37,211,102,0.3)',
                  }}
                >
                  <WhatsAppIcon />
                  Enquire via WhatsApp
                </a>

                <a
                  href="https://t.me/cambodiangems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl font-body text-sm font-medium tracking-widest uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #0088cc, #005ba4)',
                    color: 'white',
                    boxShadow: '0 6px 20px rgba(0,136,204,0.3)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.004 0-.009 0-.013 0l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.266 13.26l-2.995-.924c-1.3-.406-1.319-1.304-.203-1.938l11.823-4.56c.883-.38 1.655.212 1.377 1.584z"/>
                  </svg>
                  Message on Telegram
                </a>

                <a
                  href="mailto:info@cgt.onl"
                  className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl font-body text-sm font-medium tracking-widest uppercase border transition-all duration-200 hover:bg-[#050e2a] hover:text-white hover:border-[#050e2a]"
                  style={{
                    color: '#050e2a',
                    borderColor: 'rgba(5,14,42,0.3)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Send Email Enquiry
                </a>
              </div>
            </div>
          </div>

          {/* Related gems */}
          {related.length > 0 && (
            <div className="mt-14">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1" style={{background: 'linear-gradient(90deg, #d4a820, transparent)'}} />
                <h2 className="font-display text-2xl text-[#1a1a2e]">
                  More <span className="italic font-light" style={{color: '#d4a820'}}>{gem.category}</span>
                </h2>
                <div className="h-px flex-1" style={{background: 'linear-gradient(90deg, transparent, #d4a820)'}} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
                {related.map((rg, i) => (
                  <div
                    key={rg.id}
                    className="cursor-pointer group animate-fadeInUp"
                    style={{ animationDelay: `${i * 80}ms` }}
                    onClick={() => { navigate(`/gem/${rg.id}`); window.scrollTo(0, 0) }}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-[#e8e4de] mb-3">
                      <img
                        src={rg.image}
                        alt={rg.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-display text-[15px] font-semibold text-[#1a1a2e] leading-tight line-clamp-2">
                      {rg.name}
                    </h3>
                    <p className="font-body text-[11px] text-[#9ca3af] mt-1 tracking-wider">{rg.origin}</p>
                    <p className="font-display text-base font-semibold mt-1 text-[#0d1c42]">{formatPrice(rg.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
