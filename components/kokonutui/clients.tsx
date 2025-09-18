"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { 
  CheckCircle,
  Clock,
  PauseCircle,
  Mail,
  Users,
  Download,
  Search,
  Grid,
  List,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockClients } from "@/lib/client-data"

export default function Clients() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [clients] = useState(mockClients)
  const [selectedClients, setSelectedClients] = useState<number[]>([])
  const [filteredClients, setFilteredClients] = useState(mockClients)
  const [quickSearchTerm, setQuickSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive' | 'prospect'>('all')




  // Handle search parameters from sidebar
  useEffect(() => {
    let filtered = clients
    
    // Get all search parameters
    const firstName = searchParams.get('firstName')
    const surname = searchParams.get('surname')
    const city = searchParams.get('city')
    const province = searchParams.get('province')
    const sin = searchParams.get('sin')
    const planId = searchParams.get('planId')
    const clientId = searchParams.get('clientId')
    
    // Apply filters if parameters exist
    if (firstName || surname || city || province || sin || planId || clientId) {
      filtered = clients.filter(client => {
        const matchesFirstName = !firstName || 
          client.firstName.toLowerCase().includes(firstName.toLowerCase())
        const matchesSurname = !surname || 
          client.surname.toLowerCase().includes(surname.toLowerCase())
        const matchesCity = !city || 
          client.city.toLowerCase().includes(city.toLowerCase())
        const matchesProvince = !province || 
          client.province.toLowerCase().includes(province.toLowerCase())
        const matchesSin = !sin || 
          client.sin.includes(sin)
        const matchesPlanId = !planId || 
          client.planId.toLowerCase().includes(planId.toLowerCase())
        const matchesClientId = !clientId || 
          client.clientId.toLowerCase().includes(clientId.toLowerCase())
        
        return matchesFirstName && matchesSurname && matchesCity && 
               matchesProvince && matchesSin && matchesPlanId && matchesClientId
      })
    }
    
    setFilteredClients(filtered)
  }, [searchParams, clients])

  // Apply quick search filter
  useEffect(() => {
    if (quickSearchTerm) {
      const quickFiltered = filteredClients.filter(client =>
        client.firstName.toLowerCase().includes(quickSearchTerm.toLowerCase()) ||
        client.surname.toLowerCase().includes(quickSearchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(quickSearchTerm.toLowerCase()) ||
        client.clientId.toLowerCase().includes(quickSearchTerm.toLowerCase()) ||
        client.phone.includes(quickSearchTerm)
      )
      setFilteredClients(quickFiltered)
    }
  }, [quickSearchTerm])

  // Filter clients by status
  const getClientsByStatus = useCallback((status: string) => {
    return filteredClients.filter(client => client.status === status)
  }, [filteredClients])

  const activeClients = getClientsByStatus('active')
  const inactiveClients = getClientsByStatus('inactive')
  const prospectClients = getClientsByStatus('pending')
  const allClients = filteredClients

  const getDisplayClients = useCallback(() => {
    switch (activeTab) {
      case 'active':
        return activeClients
      case 'inactive':
        return inactiveClients
      case 'prospect':
        return prospectClients
      default:
        return allClients
    }
  }, [activeTab, activeClients, inactiveClients, prospectClients, allClients])

  // Utility functions
  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "pending":
        return <Clock className="h-3 w-3 text-yellow-600" />
      case "inactive":
        return <PauseCircle className="h-3 w-3 text-gray-500" />
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-400" />
    }
  }, [])

  const handleClientSelection = useCallback((clientId: number, checked: boolean) => {
    if (checked) {
      setSelectedClients(prev => [...prev, clientId])
    } else {
      setSelectedClients(prev => prev.filter(id => id !== clientId))
    }
  }, [])

  const handleSelectAll = useCallback(() => {
    setSelectedClients(getDisplayClients().map(client => client.id))
  }, [getDisplayClients])

  const handleSelectNone = useCallback(() => {
    setSelectedClients([])
  }, [])

  const handleClientClick = useCallback((client: any) => {
    // Navigate to the individual client details page
    router.push(`/clients/${client.id}`)
  }, [router])

  const handleClearSearch = useCallback(() => {
    router.push('/clients')
    setQuickSearchTerm("")
  }, [router])

  const ClientCard = ({ client }: { client: any }) => (
    <Card className="border border-gray-200 hover:shadow-sm transition-all duration-200 cursor-pointer group" onClick={() => handleClientClick(client)}>
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Checkbox 
              checked={selectedClients.includes(client.id)}
              onCheckedChange={(checked) => handleClientSelection(client.id, checked as boolean)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors text-sm">
                {client.firstName} {client.surname}
              </h3>
              {getStatusIcon(client.status)}
              {client.hasAlert && (
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
              )}
            </div>
            <div className="space-y-0.5 text-xs text-gray-600">
              <div>ID: {client.clientId} • {client.location}</div>
              <div>{client.email}</div>
              <div className="flex items-center justify-between">
                <span>Portfolio: ${(client.totalVolume / 1000).toFixed(0)}K</span>
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )



  return (
    <div className="space-y-6">
      {/* Client Status Tabs and Advanced Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All ({allClients.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'active'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active ({activeClients.length})
          </button>
          <button
            onClick={() => setActiveTab('inactive')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'inactive'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Inactive ({inactiveClients.length})
          </button>
          <button
            onClick={() => setActiveTab('prospect')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'prospect'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Prospects ({prospectClients.length})
          </button>
        </div>
        
        {/* Advanced Search Button */}
        <Button 
          onClick={() => router.push('/clients/advanced-search')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
        >
          <Search className="h-4 w-4 mr-2" />
          Advanced Search
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search clients..."
                  value={quickSearchTerm}
                  onChange={(e) => setQuickSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Active Search Filters */}
            {searchParams.toString() && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Search Active</Badge>
                <Button variant="outline" size="sm" onClick={handleClearSearch}>
                  Clear Filters
                </Button>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              {selectedClients.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleSelectNone}>
                    Clear ({selectedClients.length})
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Bulk Contact
                  </Button>
                </div>
              )}
              
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                Select All
              </Button>
              
              <div className="flex border border-gray-200 rounded-md">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-r-none"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-l-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <div className="space-y-4">
        {getDisplayClients().length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
            {getDisplayClients().map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        ) : (
          <Card className="border border-gray-200">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchParams.toString() || quickSearchTerm ? "No clients found" : `No ${activeTab === 'all' ? '' : activeTab} clients to display`}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchParams.toString() || quickSearchTerm 
                  ? "Try adjusting your search criteria or clear the filters to see all clients."
                  : activeTab === 'prospect' 
                    ? "No prospect clients found. These are clients with pending status."
                    : activeTab === 'inactive'
                    ? "No inactive clients found. These are clients with inactive status."
                    : activeTab === 'active'
                    ? "No active clients found. These are clients with active status."
                  : "Start by adding a new client or use the search function to find existing clients."
                }
              </p>
              {(searchParams.toString() || quickSearchTerm) && (
                <Button variant="outline" onClick={handleClearSearch}>
                  Clear Search
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

    </div>
  )
}