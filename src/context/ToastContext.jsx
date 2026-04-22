import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ message, type = 'info', icon = null, duration = 2800 }) => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, message, type, icon }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
  }, [])

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} remove={remove} />
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

function ToastContainer({ toasts, remove }) {
  if (toasts.length === 0) return null
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2 pointer-events-none">
      {toasts.map(t => (
        <Toast key={t.id} toast={t} onRemove={() => remove(t.id)} />
      ))}
    </div>
  )
}

function Toast({ toast, onRemove }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  const configs = {
    success: { bg: 'rgba(5,14,42,0.97)', accent: '#d4a820', bar: '#d4a820' },
    wishlist_add: { bg: 'rgba(5,14,42,0.97)', accent: '#ef4444', bar: '#ef4444' },
    wishlist_remove: { bg: 'rgba(5,14,42,0.97)', accent: '#6b7280', bar: '#6b7280' },
    compare: { bg: 'rgba(5,14,42,0.97)', accent: '#60a5fa', bar: '#60a5fa' },
    info: { bg: 'rgba(5,14,42,0.97)', accent: '#d4a820', bar: '#d4a820' },
  }
  const cfg = configs[toast.type] || configs.info

  return (
    <div
      onClick={onRemove}
      className="pointer-events-auto cursor-pointer relative overflow-hidden flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl"
      style={{
        background: cfg.bg,
        border: `1px solid rgba(255,255,255,0.1)`,
        backdropFilter: 'blur(12px)',
        minWidth: 220,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      {/* accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full" style={{ background: cfg.accent }} />

      {toast.icon && (
        <span className="text-base flex-shrink-0" style={{ color: cfg.accent }}>
          {toast.icon}
        </span>
      )}
      <span className="font-body text-xs text-white/85 tracking-wide font-light">
        {toast.message}
      </span>

      {/* progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5"
        style={{
          background: cfg.bar,
          opacity: 0.4,
          animation: 'toastProgress 2.8s linear forwards',
        }}
      />

      <style>{`
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  )
}
