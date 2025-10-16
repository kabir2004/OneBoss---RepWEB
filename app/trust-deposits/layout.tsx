import Layout from "@/components/kokonutui/layout"

export default function TrustDepositsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <main className="px-0 py-0">
          {children}
        </main>
      </div>
    </Layout>
  )
}
