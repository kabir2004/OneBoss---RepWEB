"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ClientSelectionContextType {
  selectedClientIds: number[]
  setSelectedClientIds: (ids: number[]) => void
  handleClientSelection: (clientId: number, checked: boolean) => void
  handleSelectAll: (clientIds: number[]) => void
  handleSelectNone: () => void
}

const ClientSelectionContext = createContext<ClientSelectionContextType | undefined>(undefined)

export function ClientSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedClientIds, setSelectedClientIds] = useState<number[]>([])

  const handleClientSelection = (clientId: number, checked: boolean) => {
    if (checked) {
      setSelectedClientIds(prev => [...prev, clientId])
    } else {
      setSelectedClientIds(prev => prev.filter(id => id !== clientId))
    }
  }

  const handleSelectAll = (clientIds: number[]) => {
    setSelectedClientIds(clientIds)
  }

  const handleSelectNone = () => {
    setSelectedClientIds([])
  }

  return (
    <ClientSelectionContext.Provider value={{
      selectedClientIds,
      setSelectedClientIds,
      handleClientSelection,
      handleSelectAll,
      handleSelectNone
    }}>
      {children}
    </ClientSelectionContext.Provider>
  )
}

export function useClientSelection() {
  const context = useContext(ClientSelectionContext)
  if (context === undefined) {
    throw new Error('useClientSelection must be used within a ClientSelectionProvider')
  }
  return context
}
