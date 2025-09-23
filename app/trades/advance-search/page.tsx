'use client'

import { useRouter } from 'next/navigation'
import TradesAdvanceSearch from '@/components/kokonutui/trades-advance-search'

export default function TradesAdvanceSearchPage() {
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
    <TradesAdvanceSearch 
      onSearch={handleSearch}
      onReset={handleReset}
    />
  )
}
