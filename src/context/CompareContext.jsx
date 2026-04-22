import React, { createContext, useContext, useState } from 'react'

const CompareContext = createContext(null)

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([])

  const toggleCompare = (gem) => {
    setCompareList(prev => {
      if (prev.find(g => g.id === gem.id)) {
        return prev.filter(g => g.id !== gem.id)
      }
      if (prev.length >= 3) return prev // max 3
      return [...prev, gem]
    })
  }

  const isComparing = (id) => compareList.some(g => g.id === id)
  const clearCompare = () => setCompareList([])
  const canAdd = compareList.length < 3

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare, isComparing, clearCompare, canAdd }}>
      {children}
    </CompareContext.Provider>
  )
}

export const useCompare = () => useContext(CompareContext)
