"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface ActiveTabContextType {
  activeTab: 'active' | 'inactive' | 'prospect'
  setActiveTab: (tab: 'active' | 'inactive' | 'prospect') => void
  selectedStatuses: ('active' | 'inactive' | 'prospect')[]
  setSelectedStatuses: (statuses: ('active' | 'inactive' | 'prospect')[]) => void
  toggleStatus: (status: 'active' | 'inactive' | 'prospect') => void
}

const ActiveTabContext = createContext<ActiveTabContextType | undefined>(undefined)

export function ActiveTabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive' | 'prospect'>('active')
  const [selectedStatuses, setSelectedStatuses] = useState<('active' | 'inactive' | 'prospect')[]>(['active'])

  const toggleStatus = (status: 'active' | 'inactive' | 'prospect') => {
    setSelectedStatuses(prev => {
      if (prev.includes(status)) {
        // If removing the last status, don't allow it
        if (prev.length === 1) {
          return prev
        }
        return prev.filter(s => s !== status)
      } else {
        return [...prev, status]
      }
    })
  }

  return (
    <ActiveTabContext.Provider value={{ 
      activeTab, 
      setActiveTab, 
      selectedStatuses, 
      setSelectedStatuses, 
      toggleStatus 
    }}>
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
