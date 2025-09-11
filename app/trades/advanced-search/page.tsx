'use client'

import { useRouter } from 'next/navigation'
import TradesAdvancedSearch from '@/components/kokonutui/trades-advanced-search'

export default function TradesAdvancedSearchPage() {
  const router = useRouter()

  const handleSearch = (criteria: any) => {
    // Store search criteria in localStorage or pass as URL params
    localStorage.setItem('tradesAdvancedSearchCriteria', JSON.stringify(criteria))
    // Navigate back to trades page
    router.push('/trades')
  }

  const handleReset = () => {
    // Clear search criteria
    localStorage.removeItem('tradesAdvancedSearchCriteria')
  }

  return (
    <TradesAdvancedSearch 
      onSearch={handleSearch}
      onReset={handleReset}
    />
  )
}
