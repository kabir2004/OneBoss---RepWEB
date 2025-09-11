import Layout from "@/components/kokonutui/layout"
import { TradeNavigation } from '@/components/kokonutui/trade-navigation'

export default function TradesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <TradeNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </Layout>
  )
}
