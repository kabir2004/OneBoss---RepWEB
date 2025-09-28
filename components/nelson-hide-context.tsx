"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface NelsonHideContextType {
  isNelsonHidden: boolean
  toggleNelsonHide: () => void
}

const NelsonHideContext = createContext<NelsonHideContextType | undefined>(undefined)

export function NelsonHideProvider({ children }: { children: ReactNode }) {
  const [isNelsonHidden, setIsNelsonHidden] = useState(false)

  const toggleNelsonHide = () => {
    setIsNelsonHidden(!isNelsonHidden)
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
