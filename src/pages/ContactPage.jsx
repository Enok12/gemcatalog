import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'


const WHATSAPP_NUMBER = '94768482447'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', interest: 'General Enquiry' })
  const [submitted, setSubmitted] = useState(false)

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    // Simulate submission — real app would POST to a backend
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen">

      {/* SEO Setup */}

      <Helmet>
        <title>Contact Us — Cambodia Gem Trading | CGT</title>
        <meta name="description" content="Contact Cambodia Gem Trading for gemstone enquiries. Available via WhatsApp, Telegram, and email. We respond within 24 hours." />
        <link rel="canonical" href="https://cgt.onl/contact" />
      </Helmet>

      {/* Hero */}
      <div
        className="relative overflow-hidden px-6 py-12 md:px-10"
        style={{ background: 'linear-gradient(135deg, #050e2a 0%, #0d1c42 60%, #091535 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #d4a820 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8" style={{ background: '#d4a820' }} />
            <span className="text-[10px] font-body tracking-[0.4em] uppercase" style={{ color: 'rgba(212,168,32,0.7)' }}>
              Get in Touch
            </span>
          </div>
          <h1 className="font-display text-4xl font-medium text-white">
            Contact <span className="italic font-light" style={{ color: '#d4a820' }}>Us</span>
          </h1>
          <p className="mt-3 font-body text-white/45 text-sm leading-relaxed font-light">
            Our gemologists are available Mon–Sat, 10:00–19:00 (GMT+7). We respond to all enquiries within 24 hours.
          </p>
        </div>
      </div>

      <div className="px-5 md:px-10 py-10 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8">

          {/* Left: Contact cards */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-display text-xl font-semibold text-[#1a1a2e] mb-4">
              Our <span className="italic font-light" style={{ color: '#d4a820' }}>Office</span>
            </h2>

            {/* Phnom Penh office */}
            <div className="p-5 rounded-2xl border border-[#e0dbd4] bg-white">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                  style={{ background: 'rgba(212,168,32,0.12)', color: '#d4a820' }}>
                  🏢
                </div>
                <div>
                  <p className="font-body text-xs font-semibold text-[#1a1a2e] tracking-wider">Phnom Penh Office</p>
                  <p className="font-body text-[11px] text-[#9ca3af] mt-0.5 leading-relaxed">
                    Mekong Royal Residence<br />
                    Office No. 16, Street Gs<br />
                    (National Road No.6)<br />
                    Sangkat Prek Leap, Khan Chroy Changvar<br />
                    Phnom Penh, Cambodia
                  </p>
                </div>
              </div>
            </div>

            {[
              { icon: '📞', label: 'Phone', value: '+855 10 230 970', href: 'tel:+85510230970' },
              { icon: '✉️', label: 'Email', value: 'info@cgt.onl', href: 'mailto:info@cgt.onl' },
            ].map(({ icon, label, value, href }) => (
              <a key={label} href={href}
                className="flex items-center gap-3 p-4 rounded-xl border border-[#e0dbd4] bg-white hover:border-[#d4a820]/40 hover:bg-[#fdf9f0] transition-all group">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
                  style={{ background: 'rgba(212,168,32,0.1)' }}>
                  {icon}
                </div>
                <div>
                  <p className="font-body text-[9px] text-[#9ca3af] tracking-[0.2em] uppercase">{label}</p>
                  <p className="font-body text-xs text-[#1a1a2e] group-hover:text-[#0d1c42] transition-colors">{value}</p>
                </div>
              </a>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-body text-sm font-medium tracking-widest uppercase text-white transition-all hover:scale-[1.02] hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>

            {/* Telegram CTA */}
            <a
              href="https://t.me/cambodiangems"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-body text-sm font-medium tracking-widest uppercase text-white transition-all hover:scale-[1.02] hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #0088cc, #005ba4)', boxShadow: '0 4px 16px rgba(0,136,204,0.3)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.004 0-.009 0-.013 0l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.266 13.26l-2.995-.924c-1.3-.406-1.319-1.304-.203-1.938l11.823-4.56c.883-.38 1.655.212 1.377 1.584z"/>
              </svg>
              Message on Telegram
            </a>

            <div className="p-4 rounded-xl" style={{ background: 'rgba(212,168,32,0.06)', border: '1px solid rgba(212,168,32,0.15)' }}>
              <p className="font-body text-[10px] text-[#9ca3af] tracking-wider uppercase mb-1.5">Business Hours</p>
              <div className="space-y-1">
                {[
                  ['Mon – Fri', '10:00 – 19:00'],
                  ['Saturday', '10:00 – 17:00'],
                  ['Sunday', 'Closed'],
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between font-body text-[11px]">
                    <span className="text-[#6b7280]">{day}</span>
                    <span className="text-[#1a1a2e] font-medium">{hours}</span>
                  </div>
                ))}
              </div>
              <p className="font-body text-[9px] text-[#9ca3af] mt-2 tracking-wider">All times GMT+7 (Cambodia)</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div
                className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #050e2a, #0d1c42)' }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ background: 'rgba(212,168,32,0.15)', border: '1px solid rgba(212,168,32,0.4)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d4a820" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-white mb-2">Message Sent</h3>
                <p className="font-body text-white/45 text-sm font-light mb-6 max-w-xs">
                  Thank you, {form.name}. We'll respond to {form.email} within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-body text-xs text-white/40 hover:text-white/70 tracking-widest uppercase transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h2 className="font-display text-xl font-semibold text-[#1a1a2e] mb-5">
                  Send an <span className="italic font-light" style={{ color: '#d4a820' }}>Enquiry</span>
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] text-[#9ca3af] tracking-[0.2em] uppercase mb-1.5">Name *</label>
                    <input
                      required name="name" value={form.name} onChange={handle}
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 text-sm font-body bg-white border border-[#ddd8d2] rounded-xl outline-none placeholder-[#c5bfb9] text-[#1a1a2e] focus:border-[#d4a820] focus:ring-2 focus:ring-[#d4a820]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] text-[#9ca3af] tracking-[0.2em] uppercase mb-1.5">Email *</label>
                    <input
                      required type="email" name="email" value={form.email} onChange={handle}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 text-sm font-body bg-white border border-[#ddd8d2] rounded-xl outline-none placeholder-[#c5bfb9] text-[#1a1a2e] focus:border-[#d4a820] focus:ring-2 focus:ring-[#d4a820]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[10px] text-[#9ca3af] tracking-[0.2em] uppercase mb-1.5">Phone</label>
                    <input
                      name="phone" value={form.phone} onChange={handle}
                      placeholder="+1 (555) 000 0000"
                      className="w-full px-4 py-2.5 text-sm font-body bg-white border border-[#ddd8d2] rounded-xl outline-none placeholder-[#c5bfb9] text-[#1a1a2e] focus:border-[#d4a820] focus:ring-2 focus:ring-[#d4a820]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] text-[#9ca3af] tracking-[0.2em] uppercase mb-1.5">Interest</label>
                    <div className="relative">
                      <select
                        name="interest" value={form.interest} onChange={handle}
                        className="appearance-none w-full px-4 py-2.5 text-sm font-body bg-white border border-[#ddd8d2] rounded-xl outline-none text-[#1a1a2e] focus:border-[#d4a820] focus:ring-2 focus:ring-[#d4a820]/20 transition-all cursor-pointer"
                      >
                        {['General Enquiry', 'Sapphire', 'Ruby', 'Emerald', 'Investment Stone', 'Paraiba Tourmaline', 'Spinel', 'Custom Order', 'Wholesale'].map(o => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[10px] text-[#9ca3af] tracking-[0.2em] uppercase mb-1.5">Message *</label>
                  <textarea
                    required name="message" value={form.message} onChange={handle}
                    placeholder="Tell us about the gem you are looking for, your budget, or any specific requirements…"
                    rows={5}
                    className="w-full px-4 py-3 text-sm font-body bg-white border border-[#ddd8d2] rounded-xl outline-none placeholder-[#c5bfb9] text-[#1a1a2e] focus:border-[#d4a820] focus:ring-2 focus:ring-[#d4a820]/20 transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="flex items-center gap-2 text-[#9ca3af]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  <p className="font-body text-[10px] tracking-wider">Your information is kept strictly confidential</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-body text-sm font-medium tracking-widest uppercase text-white transition-all hover:scale-[1.01] hover:brightness-110 active:scale-[0.99]"
                  style={{ background: 'linear-gradient(135deg, #050e2a, #0d1c42)', boxShadow: '0 4px 20px rgba(5,14,42,0.25)' }}
                >
                  Send Enquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
