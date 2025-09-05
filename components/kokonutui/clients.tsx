"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { 
  CheckCircle,
  Clock,
  PauseCircle,
  Mail,
  Users,
  Plus,
  Download,
  Search,
  Grid,
  List,
  User,
  FileText,
  TrendingUp,
  CheckSquare,
  FileSignature
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Mock data for clients - matching ONEBOSS style
const mockClients = [
  {
    id: 1,
    firstName: "John",
    surname: "Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    city: "New York",
    province: "NY",
    sin: "123-456-789",
    planId: "PL001",
    clientId: "CL001",
    status: "active",
    clientType: "Individual",
    gender: "Male",
    title: "Mr.",
    joinDate: "2024-01-15",
    totalTrades: 45,
    totalVolume: 125000,
    lastActivity: "2024-01-20",
    location: "New York, NY",
    avatar: "/placeholder-user.jpg",
    hasAlert: false,
    mailingAddress: "123 Main Street, New York, NY 10001",
    residentialAddress: "123 Main Street, New York, NY 10001",
    cellPhone: "+1 (555) 123-4567",
    homePhone: "+1 (555) 123-4568",
    preferredLanguage: "English",
    currentRepresentative: "Smith, John",
    totalAssets: 125000,
    investments: [
      {
        supplier: "AGF-183",
        account: "7133830868",
        product: "AGF GLOBAL STRATEGIC INCOME FUND FE SERIES T",
        risk: "LM",
        objective: "Balanced",
        marketValue: 0.00
      },
      {
        supplier: "WVN-618",
        account: "5587321064",
        product: "GW CDN FUND (618)",
        risk: "H",
        objective: "Speculation",
        marketValue: 94.38
      },
      {
        supplier: "WVN-691",
        account: "3618816142",
        product: "GW CDN DIV I (691)",
        risk: "H",
        objective: "Speculation",
        marketValue: 260.56
      }
    ],
    settledTrustCAD: 0.00,
    settledTrustUSD: 0.00,
    totalCAD: 354.94
  },
  {
    id: 2,
    firstName: "Sarah",
    surname: "Johnson",
    email: "sarah.j@company.com",
    phone: "+1 (555) 987-6543",
    city: "Los Angeles",
    province: "CA",
    sin: "987-654-321",
    planId: "PL002",
    clientId: "CL002",
    status: "active",
    clientType: "Individual",
    gender: "Female",
    title: "Ms.",
    joinDate: "2024-01-10",
    totalTrades: 32,
    totalVolume: 89000,
    lastActivity: "2024-01-19",
    location: "Los Angeles, CA",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  },
  {
    id: 3,
    firstName: "Michael",
    surname: "Chen",
    email: "m.chen@investments.com",
    phone: "+1 (555) 456-7890",
    city: "San Francisco",
    province: "CA",
    sin: "456-789-012",
    planId: "PL003",
    clientId: "CL003",
    status: "pending",
    clientType: "Individual",
    gender: "Male",
    title: "Mr.",
    joinDate: "2024-01-18",
    totalTrades: 0,
    totalVolume: 0,
    lastActivity: "2024-01-18",
    location: "San Francisco, CA",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  },
  {
    id: 4,
    firstName: "Emily",
    surname: "Davis",
    email: "emily.davis@trading.com",
    phone: "+1 (555) 321-0987",
    city: "Chicago",
    province: "IL",
    sin: "321-098-765",
    planId: "PL004",
    clientId: "CL004",
    status: "inactive",
    clientType: "Individual",
    gender: "Female",
    title: "Ms.",
    joinDate: "2023-12-05",
    totalTrades: 78,
    totalVolume: 245000,
    lastActivity: "2024-01-05",
    location: "Chicago, IL",
    avatar: "/placeholder-user.jpg",
    hasAlert: true
  },
  {
    id: 5,
    firstName: "Robert",
    surname: "Wilson",
    email: "r.wilson@capital.com",
    phone: "+1 (555) 654-3210",
    city: "Boston",
    province: "MA",
    sin: "654-321-098",
    planId: "PL005",
    clientId: "CL005",
    status: "active",
    clientType: "Individual",
    gender: "Male",
    title: "Mr.",
    joinDate: "2024-01-12",
    totalTrades: 23,
    totalVolume: 67000,
    lastActivity: "2024-01-20",
    location: "Boston, MA",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  },
  {
    id: 6,
    firstName: "Elton",
    surname: "Andrews",
    email: "elton.andrews@email.com",
    phone: "+1 (555) 111-2222",
    city: "Toronto",
    province: "ON",
    sin: "111-222-333",
    planId: "PL006",
    clientId: "CL006",
    status: "active",
    clientType: "Individual",
    gender: "Male",
    title: "Mr.",
    joinDate: "2024-01-08",
    totalTrades: 15,
    totalVolume: 45000,
    lastActivity: "2024-01-21",
    location: "Toronto, ON",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  },
  {
    id: 7,
    firstName: "Francoise",
    surname: "Andrews",
    email: "francoise.andrews@email.com",
    phone: "+1 (555) 333-4444",
    city: "Vancouver",
    province: "BC",
    sin: "333-444-555",
    planId: "PL007",
    clientId: "CL007",
    status: "active",
    clientType: "Individual",
    gender: "Female",
    title: "Ms.",
    joinDate: "2024-01-14",
    totalTrades: 8,
    totalVolume: 22000,
    lastActivity: "2024-01-20",
    location: "Vancouver, BC",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  },
  {
    id: 8,
    firstName: "Amy",
    surname: "Armstrong",
    email: "amy.armstrong@email.com",
    phone: "+1 (555) 555-6666",
    city: "Montreal",
    province: "QC",
    sin: "555-666-777",
    planId: "PL008",
    clientId: "CL008",
    status: "active",
    clientType: "Individual",
    gender: "Female",
    title: "Ms.",
    joinDate: "2024-01-16",
    totalTrades: 12,
    totalVolume: 38000,
    lastActivity: "2024-01-21",
    location: "Montreal, QC",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  }
]

export default function Clients() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [clients] = useState(mockClients)
  const [selectedClients, setSelectedClients] = useState<number[]>([])
  const [filteredClients, setFilteredClients] = useState(mockClients)
  const [quickSearchTerm, setQuickSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [currentView, setCurrentView] = useState<'browse' | 'details'>('browse')
  const [selectedClientDetails, setSelectedClientDetails] = useState<any>(null)

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
      
      // If filtered to single result, show details automatically
      if (filtered.length === 1) {
        setSelectedClientDetails(filtered[0])
        setCurrentView('details')
      } else {
        setCurrentView('browse')
        setSelectedClientDetails(null)
      }
    } else {
      setCurrentView('browse')
      setSelectedClientDetails(null)
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
    setSelectedClients(filteredClients.map(client => client.id))
  }, [filteredClients])

  const handleSelectNone = useCallback(() => {
    setSelectedClients([])
  }, [])

  const handleClientClick = useCallback((client: any) => {
    setSelectedClientDetails(client)
    setCurrentView('details')
  }, [])

  const handleBackToBrowse = useCallback(() => {
    setCurrentView('browse')
    setSelectedClientDetails(null)
  }, [])

  const handleClearSearch = useCallback(() => {
    router.push('/clients')
    setQuickSearchTerm("")
  }, [router])

  const ClientCard = ({ client }: { client: any }) => (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleClientClick(client)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Checkbox 
              className="mt-1"
              checked={selectedClients.includes(client.id)}
              onCheckedChange={(checked) => handleClientSelection(client.id, checked as boolean)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {client.firstName[0]}{client.surname[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {client.title} {client.firstName} {client.surname}
              </h3>
              {getStatusIcon(client.status)}
              {client.hasAlert && (
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <div>ID: {client.clientId} • {client.location}</div>
              <div>{client.email}</div>
              <div className="flex items-center justify-between">
                <span>Portfolio: ${(client.totalVolume / 1000).toFixed(0)}K</span>
                <Badge variant="outline" className="text-xs">
                  {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ClientDetails = ({ client }: { client: any }) => (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={handleBackToBrowse}>
          ← Back to Clients
        </Button>
        <div className="text-sm text-gray-500">
          Client Details
        </div>
      </div>

      {/* Client Profile Card */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {client.firstName[0]}{client.surname[0]}
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {client.title} {client.firstName} {client.surname}
                </CardTitle>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(client.status)}
                    <Badge 
                      variant={client.status === 'active' ? 'default' : client.status === 'pending' ? 'secondary' : 'outline'}
                      className={`${client.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : ''}`}
                    >
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="text-sm text-gray-600">ID: {client.clientId}</span>
                  <span className="text-sm text-gray-600">•</span>
                  <span className="text-sm text-gray-600">{client.location}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Portfolio Value: ${(client.totalVolume / 1000).toFixed(0)}K • {client.totalTrades} trades
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 flex items-center justify-center text-gray-400">📞</div>
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 flex items-center justify-center text-gray-400">📍</div>
                    <span>{client.location}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Details</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>Client ID: <span className="font-medium">{client.clientId}</span></div>
                  <div>Plan ID: <span className="font-medium">{client.planId}</span></div>
                  <div>Account Type: <span className="font-medium">{client.clientType}</span></div>
                  <div>Join Date: <span className="font-medium">{new Date(client.joinDate).toLocaleDateString()}</span></div>
                  <div>Last Activity: <span className="font-medium">{new Date(client.lastActivity).toLocaleDateString()}</span></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Portfolio Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">${(client.totalVolume / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-gray-600">Total Portfolio</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{client.totalTrades}</div>
                    <div className="text-sm text-gray-600">Total Trades</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Representative</h3>
                <div className="text-sm text-gray-700">
                  {client.currentRepresentative || 'Not Assigned'}
                </div>
              </div>
            </div>
          </div>

          {/* Investments Section */}
          {client.investments && client.investments.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Investment Holdings</h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Market Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {client.investments.map((investment: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{investment.supplier}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{investment.product}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs">{investment.risk}</Badge>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">${investment.marketValue.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  if (currentView === 'details' && selectedClientDetails) {
    return <ClientDetails client={selectedClientDetails} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="ghost" size="sm" onClick={() => router.push('/clients')}>
                <Users className="h-4 w-4 mr-2" />
                Client Management
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/clients/advanced-search')}>
                <Search className="h-4 w-4 mr-2" />
                Advanced Search
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/clients/households')}>
                <Users className="h-4 w-4 mr-2" />
                Households
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/clients/reports')}>
                <FileText className="h-4 w-4 mr-2" />
                Reports
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/clients/income-plans')}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Systematic Income Plans
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/clients/approval')}>
                <CheckSquare className="h-4 w-4 mr-2" />
                Approval
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/clients/esignature')}>
                <FileSignature className="h-4 w-4 mr-2" />
                eSignature
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Quick search clients..."
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
        {filteredClients.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
            {filteredClients.map((client) => (
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
                {searchParams.toString() || quickSearchTerm ? "No clients found" : "No clients to display"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchParams.toString() || quickSearchTerm 
                  ? "Try adjusting your search criteria or clear the filters to see all clients."
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