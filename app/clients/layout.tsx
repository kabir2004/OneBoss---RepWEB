import Layout from "@/components/kokonutui/layout"
import ClientNavigation from "@/components/kokonutui/client-navigation"

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <ClientNavigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </Layout>
  )
}





