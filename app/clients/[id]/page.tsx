import ClientInfo from "@/components/kokonutui/client-info-clean"

export default async function ClientInfoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ClientInfo clientId={id} />
}
