"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface NelsonHideContextType {
  isNelsonHidden: boolean
  toggleNelsonHide: () => void
}

const NELSON_HIDE_COOKIE_NAME = "nelson-hide:state"
const NELSON_HIDE_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

const NelsonHideContext = createContext<NelsonHideContextType | undefined>(undefined)

export function NelsonHideProvider({ children }: { children: ReactNode }) {
  const [isNelsonHidden, setIsNelsonHidden] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load initial state from localStorage/cookie on mount
  useEffect(() => {
    const savedState = localStorage.getItem(NELSON_HIDE_COOKIE_NAME)
    if (savedState !== null) {
      setIsNelsonHidden(JSON.parse(savedState))
    }
    setIsLoaded(true)
  }, [])

  const toggleNelsonHide = () => {
    const newState = !isNelsonHidden
    setIsNelsonHidden(newState)
    
    // Save to localStorage for persistence
    localStorage.setItem(NELSON_HIDE_COOKIE_NAME, JSON.stringify(newState))
    
    // Also save to cookie as backup
    document.cookie = `${NELSON_HIDE_COOKIE_NAME}=${newState}; path=/; max-age=${NELSON_HIDE_COOKIE_MAX_AGE}`
  }

  // Don't render until we've loaded the initial state
  if (!isLoaded) {
    return null
  }

  return (
    <NelsonHideContext.Provider value={{ isNelsonHidden, toggleNelsonHide }}>
      {children}
    </NelsonHideContext.Provider>
  )
}

export function useNelsonHide() {
  const context = useContext(NelsonHideContext)
  if (context === undefined) {
    throw new Error('useNelsonHide must be used within a NelsonHideProvider')
  }
  return context
}
