import { Suspense } from "react"
import AdvancedSearch from "@/components/kokonutui/advanced-search"

export default function AdvancedSearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading advanced search...</div>}>
      <AdvancedSearch />
    </Suspense>
  )
}