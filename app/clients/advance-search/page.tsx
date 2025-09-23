import { Suspense } from "react"
import AdvanceSearch from "@/components/kokonutui/advance-search"

export default function AdvanceSearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading advance search...</div>}>
      <AdvanceSearch />
    </Suspense>
  )
}