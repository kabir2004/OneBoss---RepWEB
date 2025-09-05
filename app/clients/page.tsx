import { Suspense } from "react"
import Clients from "@/components/kokonutui/clients"

export default function ClientsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading clients...</div>}>
      <Clients />
    </Suspense>
  )
}



