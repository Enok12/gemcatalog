import React, { useRef, useEffect } from 'react'

export default function SearchBar({ value, onChange, resultCount, total }) {
  const inputRef = useRef(null)

  // Cmd/Ctrl+K to focus
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
        <svg
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke={value ? '#d4a820' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="transition-colors"
        >
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search gems, origins, colors…"
        className="w-full pl-10 pr-24 py-2.5 text-sm font-body bg-white/80 border border-[#ddd8d2] rounded-xl outline-none transition-all duration-200 placeholder-[#b0aaa4] text-[#1a1a2e] focus:border-[#d4a820] focus:ring-2 focus:ring-[#d4a820]/20 focus:bg-white"
      />

      <div className="absolute inset-y-0 right-3 flex items-center gap-2">
        {value && (
          <>
            <span className="font-body text-[10px] text-[#9ca3af] tracking-wider">
              {resultCount}/{total}
            </span>
            <button
              onClick={() => onChange('')}
              className="w-5 h-5 rounded-full flex items-center justify-center bg-[#9ca3af]/20 hover:bg-[#9ca3af]/40 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="3" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </>
        )}
        {!value && (
          <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-body text-[#b0aaa4] bg-[#f0ede8] border border-[#ddd8d2]">
            ⌘K
          </kbd>
        )}
      </div>
    </div>
  )
}
