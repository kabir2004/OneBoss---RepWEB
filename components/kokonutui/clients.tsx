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
  FileSignature,
  ArrowLeftRight,
  X,
  ChevronDown,
  Minus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockClients } from "@/lib/client-data"

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
  const [swapDialogOpen, setSwapDialogOpen] = useState(false)
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null)
  const [selectedNewFund, setSelectedNewFund] = useState("")
  const [addFundDialogOpen, setAddFundDialogOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState("")
  const [selectedFundToAdd, setSelectedFundToAdd] = useState("")
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive' | 'prospect'>('all')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [swapAmount, setSwapAmount] = useState(0)



  // Mock fund data by supplier
  const mockFundsBySupplier = {
    "AGF": [
      { id: "AGF-183", name: "AGF GLOBAL STRATEGIC INCOME FUND FE SERIES T", risk: "LM", value: 0.00 },
      { id: "AGF-201", name: "AGF CANADIAN DIVIDEND FUND", risk: "M", value: 1250.50 },
      { id: "AGF-156", name: "AGF BOND FUND", risk: "L", value: 890.25 },
      { id: "AGF-301", name: "AGF CANADIAN EQUITY FUND", risk: "M", value: 2100.00 },
      { id: "AGF-302", name: "AGF GLOBAL EQUITY FUND", risk: "H", value: 1850.75 },
      { id: "AGF-303", name: "AGF BALANCED FUND", risk: "M", value: 1650.30 },
      { id: "AGF-304", name: "AGF INCOME FUND", risk: "L", value: 1200.45 },
      { id: "AGF-305", name: "AGF REAL ESTATE FUND", risk: "M", value: 1950.60 },
      { id: "AGF-306", name: "AGF EMERGING MARKETS FUND", risk: "H", value: 2200.80 },
      { id: "AGF-307", name: "AGF CANADIAN SMALL CAP FUND", risk: "H", value: 1800.25 },
      { id: "AGF-308", name: "AGF GLOBAL BOND FUND", risk: "L", value: 1100.90 },
      { id: "AGF-309", name: "AGF CANADIAN BOND FUND", risk: "L", value: 950.15 },
      { id: "AGF-310", name: "AGF TECHNOLOGY FUND", risk: "H", value: 2400.00 },
      { id: "AGF-311", name: "AGF HEALTHCARE FUND", risk: "H", value: 2100.50 },
      { id: "AGF-312", name: "AGF INFRASTRUCTURE FUND", risk: "M", value: 1750.25 },
      { id: "AGF-313", name: "AGF SUSTAINABLE FUND", risk: "M", value: 1950.75 },
      { id: "AGF-314", name: "AGF GROWTH FUND", risk: "H", value: 2250.30 },
      { id: "AGF-315", name: "AGF CONSERVATIVE FUND", risk: "L", value: 1050.60 }
    ],
    "GW": [
      { id: "WVN-618", name: "GW CDN FUND (618)", risk: "H", value: 94.38 },
      { id: "WVN-691", name: "GW CDN DIV I (691)", risk: "H", value: 260.56 },
      { id: "WVN-445", name: "GW INTERNATIONAL FUND", risk: "H", value: 1500.75 },
      { id: "WVN-223", name: "GW BOND FUND", risk: "L", value: 750.30 },
      { id: "WVN-123", name: "GW BALANCED FUND (123)", risk: "M", value: 1350.40 },
      { id: "WVN-234", name: "GW DIVIDEND FUND (234)", risk: "M", value: 1250.60 },
      { id: "WVN-345", name: "GW UTILITY FUND (345)", risk: "L", value: 1100.25 },
      { id: "WVN-456", name: "GW GROWTH FUND (456)", risk: "H", value: 1750.80 },
      { id: "WVN-567", name: "GW CONSERVATIVE FUND (567)", risk: "L", value: 900.45 },
      { id: "WVN-678", name: "GW HEALTHCARE FUND (678)", risk: "H", value: 2000.30 },
      { id: "WVN-789", name: "GW TECHNOLOGY FUND (789)", risk: "H", value: 1850.75 },
      { id: "WVN-890", name: "GW INFRASTRUCTURE FUND (890)", risk: "M", value: 1600.50 },
      { id: "WVN-901", name: "GW BALANCED FUND (901)", risk: "M", value: 1400.65 },
      { id: "WVN-012", name: "GW ENERGY FUND (012)", risk: "H", value: 1900.20 },
      { id: "WVN-124", name: "GW FINANCIAL FUND (124)", risk: "M", value: 1650.40 },
      { id: "WVN-235", name: "GW MATERIALS FUND (235)", risk: "H", value: 1800.60 },
      { id: "WVN-346", name: "GW CONSUMER FUND (346)", risk: "M", value: 1550.30 },
      { id: "WVN-457", name: "GW INDUSTRIAL FUND (457)", risk: "M", value: 1700.80 },
      { id: "WVN-568", name: "GW REAL ESTATE FUND (568)", risk: "M", value: 1450.25 }
    ],
    "RBC": [
      { id: "RBC-001", name: "RBC CANADIAN EQUITY FUND", risk: "M", value: 2100.00 },
      { id: "RBC-002", name: "RBC BOND FUND", risk: "L", value: 1800.50 },
      { id: "RBC-003", name: "RBC GLOBAL EQUITY FUND", risk: "H", value: 2250.75 },
      { id: "RBC-004", name: "RBC BALANCED FUND", risk: "M", value: 1950.30 },
      { id: "RBC-005", name: "RBC TECHNOLOGY FUND", risk: "H", value: 2400.00 },
      { id: "RBC-006", name: "RBC HEALTHCARE FUND", risk: "H", value: 2200.50 },
      { id: "RBC-007", name: "RBC ENERGY FUND", risk: "H", value: 2000.25 },
      { id: "RBC-008", name: "RBC FINANCIAL FUND", risk: "M", value: 1850.75 },
      { id: "RBC-009", name: "RBC REAL ESTATE FUND", risk: "M", value: 1750.40 },
      { id: "RBC-010", name: "RBC DIVIDEND FUND", risk: "M", value: 1650.60 }
    ]
  }

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
    setSelectedClientDetails(client)
    setCurrentView('details')
    // Reset all dialog states when viewing a new client
    setSwapDialogOpen(false)
    setAddFundDialogOpen(false)
    setSelectedInvestment(null)
    setSelectedNewFund("")
    setSelectedSupplier("")
    setSelectedFundToAdd("")
    setShowSuccessMessage(false)
    setSwapAmount(0)
  }, [])

  const handleBackToBrowse = useCallback(() => {
    setCurrentView('browse')
    setSelectedClientDetails(null)
    // Reset all dialog states when going back
    setSwapDialogOpen(false)
    setAddFundDialogOpen(false)
    setSelectedInvestment(null)
    setSelectedNewFund("")
    setSelectedSupplier("")
    setSelectedFundToAdd("")
    setShowSuccessMessage(false)
    setSwapAmount(0)
  }, [])

  const handleClearSearch = useCallback(() => {
    router.push('/clients')
    setQuickSearchTerm("")
  }, [router])

  const getAvailableFunds = useCallback((supplier: string) => {
    const funds = mockFundsBySupplier[supplier as keyof typeof mockFundsBySupplier] || []
    return funds
  }, [])

  const handleSwapFund = useCallback((investment: any) => {
    // Set the selected investment first
    setSelectedInvestment(investment)
    setSelectedNewFund("")
    setSwapAmount(investment.marketValue) // Initialize with full amount
    
    // Open the dialog immediately
    setSwapDialogOpen(true)
  }, [])

  const handleConfirmSwap = useCallback(() => {
    if (selectedInvestment && selectedNewFund && swapAmount > 0) {
      // Find the selected fund details
      const availableFunds = getAvailableFunds(selectedInvestment.supplier)
      const newFund = availableFunds.find(fund => fund.id === selectedNewFund)
      
      if (newFund) {
        // Update the client's investments
        const clientId = selectedClientDetails?.id
        if (clientId) {
          // Find the client in the clients array and update their investments
          const updatedClients = clients.map(client => {
            if (client.id === clientId) {
              const updatedInvestments = (client.investments || []).map(investment => {
                if (investment.product === selectedInvestment.product && 
                    investment.supplier === selectedInvestment.supplier) {
                  // Update the current investment
                  const remainingAmount = investment.marketValue - swapAmount
                  if (remainingAmount <= 0) {
                    // Remove the investment if fully swapped
                    return null
                  } else {
                    // Reduce the amount
                    return {
                      ...investment,
                      marketValue: remainingAmount
                    }
                  }
                }
                return investment
              }).filter(Boolean) // Remove null values
              
              // Add the new fund
              updatedInvestments.push({
                supplier: selectedInvestment.supplier,
                account: selectedInvestment.account || `ACC-${Date.now()}`,
                product: newFund.name,
                risk: newFund.risk,
                objective: selectedInvestment.objective || "Growth",
                marketValue: swapAmount
              })
              
              // Update total assets
              const newTotalAssets = updatedInvestments.reduce((sum, inv) => sum + (inv?.marketValue || 0), 0)
              
              return {
                ...client,
                investments: updatedInvestments,
                totalAssets: newTotalAssets,
                totalVolume: newTotalAssets
              }
            }
            return client
          })
          
          // Update the clients state (in a real app, this would be an API call)
          // For now, we'll just show the success message
          console.log('Updated client investments:', updatedClients.find(c => c.id === clientId))
        }
        
        // Show success message
        setShowSuccessMessage(true)
        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 3000)
        
        // Close dialog and reset state
        setSwapDialogOpen(false)
        setSelectedInvestment(null)
        setSelectedNewFund("")
        setSwapAmount(0)
      }
    }
  }, [selectedInvestment, selectedNewFund, swapAmount, selectedClientDetails, getAvailableFunds, clients])

  const handleAddFund = useCallback(() => {
    setSelectedSupplier("")
    setSelectedFundToAdd("")
    setAddFundDialogOpen(true)
  }, [])

  const handleRemoveFund = useCallback((investment: any) => {
    if (confirm(`Are you sure you want to remove ${investment.product}?`)) {
      // Here you would typically remove the investment from the client's portfolio
      console.log(`Removing ${investment.product}`)
    }
  }, [])

  const handleConfirmAddFund = useCallback(() => {
    if (selectedSupplier && selectedFundToAdd) {
      // Here you would typically add the new fund to the client's portfolio
      console.log(`Adding fund ${selectedFundToAdd} from ${selectedSupplier}`)
      setAddFundDialogOpen(false)
      setSelectedSupplier("")
      setSelectedFundToAdd("")
    }
  }, [selectedSupplier, selectedFundToAdd])

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

  const ClientDetails = ({ client }: { client: any }) => (
    <div className="space-y-4">
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
      <Card className="border border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
              <div>
              <CardTitle className="text-lg font-medium text-gray-900">
                {client.firstName} {client.surname}
                </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(client.status)}
                    <Badge 
                  variant="outline"
                  className="text-xs px-2 py-0.5"
                    >
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </Badge>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">ID: {client.clientId}</span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">{client.location}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Portfolio: ${(client.totalVolume / 1000).toFixed(0)}K • {client.totalTrades} trades
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Mail className="h-3 w-3 mr-1" />
                Contact
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Contact Information</h3>
                <div className="space-y-1 text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-gray-400" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 flex items-center justify-center text-gray-400">📞</div>
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 flex items-center justify-center text-gray-400">📍</div>
                    <span>{client.location}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Account Details</h3>
                <div className="space-y-1 text-xs text-gray-700">
                  <div>Client ID: <span className="font-medium">{client.clientId}</span></div>
                  <div>Plan ID: <span className="font-medium">{client.planId}</span></div>
                  <div>Account Type: <span className="font-medium">{client.clientType}</span></div>
                  <div>Join Date: <span className="font-medium">{new Date(client.joinDate).toLocaleDateString()}</span></div>
                  <div>Last Activity: <span className="font-medium">{new Date(client.lastActivity).toLocaleDateString()}</span></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Portfolio Summary</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm font-bold text-gray-900">${(client.totalVolume / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-600">Total Portfolio</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-sm font-bold text-gray-900">{client.totalTrades}</div>
                    <div className="text-xs text-gray-600">Total Trades</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Representative</h3>
                <div className="text-xs text-gray-700">
                  {client.currentRepresentative || 'Not Assigned'}
                </div>
              </div>
            </div>
          </div>

          {/* Investments Section */}
          {client.investments && client.investments.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Investment Holdings</h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Risk</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Market Value</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {client.investments.map((investment: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-3 py-2 text-xs font-medium text-gray-900">{investment.supplier}</td>
                          <td className="px-3 py-2 text-xs text-gray-700">{investment.product}</td>
                          <td className="px-3 py-2">
                            <Badge variant="outline" className="text-xs px-2 py-0.5">{investment.risk}</Badge>
                          </td>
                          <td className="px-3 py-2 text-xs font-medium text-gray-900">${investment.marketValue.toFixed(2)}</td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleAddFund()
                                }}
                                className="h-6 w-6 p-0 text-xs hover:bg-green-50 hover:border-green-200"
                                title="Add Fund"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRemoveFund(investment)
                                }}
                                className="h-6 w-6 p-0 text-xs hover:bg-red-50 hover:border-red-200"
                                title="Remove Fund"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  handleSwapFund(investment)
                                }}
                                className="h-6 px-2 text-xs hover:bg-blue-50 hover:border-blue-200"
                                title="Swap Fund"
                                type="button"
                              >
                                <ArrowLeftRight className="h-3 w-3 mr-1" />
                                Swap
                              </Button>
                            </div>
                          </td>
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
    return (
      <>
        <ClientDetails client={selectedClientDetails} />
        
        {/* Swap Fund Dialog */}
        <Dialog open={swapDialogOpen} onOpenChange={setSwapDialogOpen}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ArrowLeftRight className="h-5 w-5 text-blue-600" />
                Swap Fund
              </DialogTitle>
            </DialogHeader>
            
            {selectedInvestment && (
              <div className="space-y-4">
                {/* Current Fund */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Current Fund</h4>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900">{selectedInvestment.product}</div>
                    <div className="text-xs text-gray-500">Supplier: {selectedInvestment.supplier}</div>
                    <div className="text-xs text-gray-500">Risk: {selectedInvestment.risk}</div>
                    <div className="text-xs text-gray-500">Value: ${selectedInvestment.marketValue.toFixed(2)}</div>
                  </div>
                </div>

                {/* Swap Amount */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Swap Amount</h4>
                  <div className="text-lg font-semibold text-blue-900">
                    ${selectedInvestment.marketValue.toFixed(2)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This amount will be transferred to the new fund
                  </p>
                </div>

                {/* New Fund Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Select New Fund</label>
                    <span className="text-xs text-gray-500">
                      {getAvailableFunds(selectedInvestment.supplier).filter(fund => fund.name !== selectedInvestment.product).length} funds available
                    </span>
                  </div>
                  
                  <Select value={selectedNewFund} onValueChange={setSelectedNewFund}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a fund from the same supplier" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto z-[100]">
                      {(() => {
                        const availableFunds = getAvailableFunds(selectedInvestment.supplier)
                        const filteredFunds = availableFunds.filter(fund => fund.name !== selectedInvestment.product)
                        
                        return filteredFunds.map((fund) => (
                          <SelectItem key={fund.id} value={fund.id} className="py-2">
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">{fund.name}</span>
                              <span className="text-xs text-gray-500">Risk: {fund.risk} • Value: ${fund.value.toFixed(2)}</span>
                            </div>
                          </SelectItem>
                        ))
                      })()}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Only funds from {selectedInvestment.supplier} are available for swapping
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setSwapDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmSwap}
                    disabled={!selectedNewFund || swapAmount <= 0}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {!selectedNewFund ? 'Select a fund first' : swapAmount <= 0 ? 'Enter amount to swap' : 'Confirm Swap'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Fund Dialog */}
        <Dialog open={addFundDialogOpen} onOpenChange={setAddFundDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-600" />
                Add New Fund
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Supplier Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select Supplier</label>
                <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(mockFundsBySupplier).map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>
                        {supplier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fund Selection */}
              {selectedSupplier && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Select Fund</label>
                  <Select value={selectedFundToAdd} onValueChange={setSelectedFundToAdd}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a fund" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableFunds(selectedSupplier).map((fund) => (
                        <SelectItem key={fund.id} value={fund.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{fund.name}</span>
                            <span className="text-xs text-gray-500">Risk: {fund.risk} • Value: ${fund.value.toFixed(2)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setAddFundDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmAddFund}
                  disabled={!selectedSupplier || !selectedFundToAdd}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Add Fund
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right-5 duration-300">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium">Success!</span>
            <span>Fund swap completed successfully</span>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="space-y-6">
      {/* Client Status Tabs */}
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

      {/* Swap Fund Dialog */}
      <Dialog open={swapDialogOpen} onOpenChange={setSwapDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5 text-blue-600" />
              Swap Fund
            </DialogTitle>
          </DialogHeader>
          
          {selectedInvestment && (
            <div className="space-y-4">
              {/* Current Fund */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Fund</h4>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">{selectedInvestment.product}</div>
                  <div className="text-xs text-gray-500">Supplier: {selectedInvestment.supplier}</div>
                  <div className="text-xs text-gray-500">Risk: {selectedInvestment.risk}</div>
                  <div className="text-xs text-gray-500">Value: ${selectedInvestment.marketValue.toFixed(2)}</div>
                </div>
              </div>

              {/* Swap Amount */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Swap Amount</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">$</span>
                    <Input
                      type="number"
                      value={swapAmount}
                      onChange={(e) => setSwapAmount(parseFloat(e.target.value) || 0)}
                      min="0"
                      max={selectedInvestment.marketValue}
                      step="0.01"
                      className="flex-1"
                      placeholder="Enter amount to swap"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Available: ${selectedInvestment.marketValue.toFixed(2)}</span>
                    <button
                      type="button"
                      onClick={() => setSwapAmount(selectedInvestment.marketValue)}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Use Full Amount
                    </button>
                  </div>
                  {swapAmount > 0 && (
                    <div className="text-xs text-gray-600 bg-white p-2 rounded border">
                      <div className="flex justify-between">
                        <span>Swapping:</span>
                        <span className="font-medium">${swapAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Remaining:</span>
                        <span className="font-medium">${(selectedInvestment.marketValue - swapAmount).toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    This amount will be transferred to the new fund
                  </p>
                </div>
              </div>

              {/* New Fund Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select New Fund</label>
                <Select value={selectedNewFund} onValueChange={setSelectedNewFund}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a fund from the same supplier" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto z-[100]">
                    {getAvailableFunds(selectedInvestment.supplier)
                      .filter(fund => fund.name !== selectedInvestment.product)
                      .map((fund) => (
                        <SelectItem key={fund.id} value={fund.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{fund.name}</span>
                            <span className="text-xs text-gray-500">Risk: {fund.risk} • Current Value: ${fund.value.toFixed(2)}</span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Only funds from {selectedInvestment.supplier} are available for swapping
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSwapDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmSwap}
                  disabled={!selectedNewFund}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Confirm Swap
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Fund Dialog */}
      <Dialog open={addFundDialogOpen} onOpenChange={setAddFundDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-green-600" />
              Add New Fund
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Supplier Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Select Supplier</label>
              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a supplier" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(mockFundsBySupplier).map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fund Selection */}
            {selectedSupplier && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Select Fund</label>
                <Select value={selectedFundToAdd} onValueChange={setSelectedFundToAdd}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a fund" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableFunds(selectedSupplier).map((fund) => (
                      <SelectItem key={fund.id} value={fund.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{fund.name}</span>
                          <span className="text-xs text-gray-500">Risk: {fund.risk} • Value: ${fund.value.toFixed(2)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setAddFundDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAddFund}
                disabled={!selectedSupplier || !selectedFundToAdd}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Add Fund
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right-5 duration-300">
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-medium">Success!</span>
          <span>Fund swap completed successfully</span>
        </div>
      )}
    </div>
  )
}