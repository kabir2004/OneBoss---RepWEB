"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface ActiveTabContextType {
  activeTab: 'active' | 'inactive' | 'prospect'
  setActiveTab: (tab: 'active' | 'inactive' | 'prospect') => void
}

const ActiveTabContext = createContext<ActiveTabContextType | undefined>(undefined)

export function ActiveTabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive' | 'prospect'>('active')

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  )
}

export function useActiveTab() {
  const context = useContext(ActiveTabContext)
  if (context === undefined) {
    throw new Error('useActiveTab must be used within an ActiveTabProvider')
  }
  return context
}
