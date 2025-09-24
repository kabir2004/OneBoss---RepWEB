"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  CheckCircle,
  Clock,
  PauseCircle,
  Mail,
  Grid,
  List,
  User,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockClients } from "@/lib/client-data"
import { useClientSelection } from "../client-selection-context"

export default function Clients() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [clients] = useState(mockClients)
  const { selectedClientIds, handleClientSelection, handleSelectAll, handleSelectNone } = useClientSelection()
  const [filteredClients, setFilteredClients] = useState(mockClients)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive' | 'prospect'>('all')
  const [searchQuery, setSearchQuery] = useState('')




  // Handle search parameters from sidebar and local search
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
    
    // Apply URL parameter filters if they exist
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
    
    // Apply local search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(client => {
        const query = searchQuery.toLowerCase()
        return (
          client.firstName.toLowerCase().includes(query) ||
          client.surname.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query) ||
          client.clientId.toLowerCase().includes(query) ||
          client.city.toLowerCase().includes(query) ||
          client.province.toLowerCase().includes(query) ||
          client.location.toLowerCase().includes(query)
        )
      })
    }
    
    setFilteredClients(filtered)
  }, [searchParams, clients, searchQuery])


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

  const handleSelectAllClients = useCallback(() => {
    handleSelectAll(getDisplayClients().map(client => client.id))
  }, [getDisplayClients, handleSelectAll])

  const handleClientClick = useCallback((client: any) => {
    // Navigate to the individual client details page
    router.push(`/clients/${client.id}`)
  }, [router])

  const handleClearSearch = useCallback(() => {
    router.push('/clients')
  }, [router])

  const ClientCard = ({ client }: { client: any }) => (
    <Card className="border border-border hover:shadow-sm transition-all duration-200 cursor-pointer group bg-card" onClick={() => handleClientClick(client)}>
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Checkbox 
              checked={selectedClientIds.includes(client.id)}
              onCheckedChange={(checked) => handleClientSelection(client.id, checked as boolean)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-card-foreground truncate group-hover:text-primary transition-colors text-sm">
                {client.firstName} {client.surname}
              </h3>
              {getStatusIcon(client.status)}
              {client.hasAlert && (
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
              )}
            </div>
            <div className="space-y-0.5 text-xs text-muted-foreground">
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



  const SearchField = ({ className = "" }: { className?: string }) => (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search clients by name, email, ID, or location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 h-11 text-sm bg-background border-input"
      />
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Sticky Search and Status Filters */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border pb-6 -mx-6 px-6 -mt-6 pt-6">
        {/* Search Field */}
        <div className="mb-6">
          <SearchField />
        </div>

        {/* Status Checkboxes and Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Status Checkboxes */}
          <div className="flex items-center gap-8 flex-wrap">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="all-status"
                checked={activeTab === 'all'}
                onCheckedChange={() => setActiveTab('all')}
              />
            <label htmlFor="all-status" className="text-sm font-medium text-foreground cursor-pointer flex items-center gap-2">
              <span>All</span>
              <span className="text-lg font-bold text-muted-foreground">({allClients.length})</span>
            </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <Checkbox
                id="active-status"
                checked={activeTab === 'active'}
                onCheckedChange={() => setActiveTab('active')}
              />
              <label htmlFor="active-status" className="text-sm font-medium text-foreground cursor-pointer flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Active</span>
                <span className="text-lg font-bold text-muted-foreground">({activeClients.length})</span>
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <Checkbox
                id="inactive-status"
                checked={activeTab === 'inactive'}
                onCheckedChange={() => setActiveTab('inactive')}
              />
              <label htmlFor="inactive-status" className="text-sm font-medium text-foreground cursor-pointer flex items-center gap-2">
                <PauseCircle className="h-4 w-4 text-muted-foreground" />
                <span>Inactive</span>
                <span className="text-lg font-bold text-muted-foreground">({inactiveClients.length})</span>
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <Checkbox
                id="prospect-status"
                checked={activeTab === 'prospect'}
                onCheckedChange={() => setActiveTab('prospect')}
              />
              <label htmlFor="prospect-status" className="text-sm font-medium text-foreground cursor-pointer flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span>Prospects</span>
                <span className="text-lg font-bold text-muted-foreground">({prospectClients.length})</span>
              </label>
            </div>
          </div>

          {/* Right side - Select All and View Toggle */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSelectAllClients}
              className="h-8 px-4"
            >
              Select All
            </Button>
            
            <div className="flex bg-card border border-border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none border-0 h-8 px-3"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none border-0 h-8 px-3"
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Client List Content */}
      <div className="space-y-6">

      {/* Active Search Filters and Bulk Actions */}
      {(searchParams.toString() || selectedClientIds.length > 0) && (
        <div className="flex items-center gap-2 flex-wrap">
          {searchParams.toString() && (
            <>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Search Active
              </Badge>
              <Button variant="outline" size="sm" onClick={handleClearSearch} className="h-8">
                Clear Filters
              </Button>
            </>
          )}
          {selectedClientIds.length > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={handleSelectNone} className="h-8 text-xs px-3">
                Clear ({selectedClientIds.length})
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs px-3">
                <Mail className="h-3 w-3 mr-1" />
                Bulk Contact
              </Button>
            </>
          )}
        </div>
      )}

      {/* Clients List */}
      <div className="space-y-6">
        {getDisplayClients().length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {getDisplayClients().map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        ) : (
          <Card className="border border-border bg-card">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {searchParams.toString() ? "No clients found" : `No ${activeTab === 'all' ? '' : activeTab} clients to display`}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchParams.toString() 
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
              {searchParams.toString() && (
                <Button variant="outline" onClick={handleClearSearch}>
                  Clear Search
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </div>
  )
}