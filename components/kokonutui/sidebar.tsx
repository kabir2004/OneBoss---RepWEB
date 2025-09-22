"use client"

import {
  BarChart2,
  Building2,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Settings,
  Menu,
  Target,
  User,
  DollarSign,
  Home,
  Search,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Clock,
  PauseCircle,
  TrendingUp,
  Plus
} from "lucide-react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { mockClients } from "@/lib/client-data"
import { useClientSelection } from "../client-selection-context"

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClientsExpanded, setIsClientsExpanded] = useState(false)
  const [isTradesExpanded, setIsTradesExpanded] = useState(false)
  const [clientSearchTerm, setClientSearchTerm] = useState("")
  const { selectedClientIds, handleClientSelection, handleSelectAll, handleSelectNone } = useClientSelection()
  const [tradeSearchForm, setTradeSearchForm] = useState({
    orderDateFrom: "",
    orderDateTo: "",
    statuses: [] as string[],
    wireOrderNumber: "",
    sourceIdentifier: "",
    productIndicator: "All",
    wireOrderStatus: "All",
    fundTransactionTypes: [] as string[],
    securityType: "All"
  })

  // Auto-expand dropdown when on clients or trades page
  useEffect(() => {
    if (pathname.startsWith('/clients')) {
      setIsClientsExpanded(true)
    }
    if (pathname.startsWith('/trades')) {
      setIsTradesExpanded(true)
    }
  }, [pathname])

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  // Filter clients based on simple search term
  const filteredClients = mockClients.filter(client => {
    const matchesSearchTerm = !clientSearchTerm || 
      client.firstName?.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
      client.surname?.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
      client.clientId?.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
      client.phone?.includes(clientSearchTerm)
    
    return matchesSearchTerm
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-2.5 w-2.5 text-green-600" />
      case "pending":
        return <Clock className="h-2.5 w-2.5 text-yellow-600" />
      case "inactive":
        return <PauseCircle className="h-2.5 w-2.5 text-gray-500" />
      default:
        return <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
    }
  }


  // Handle trade search form updates
  const handleTradeSearchFormChange = (field: string, value: any) => {
    setTradeSearchForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle trade search execution
  const handleTradeSearch = () => {
    // Build search parameters for URL
    const searchParams = new URLSearchParams()
    
    Object.entries(tradeSearchForm).forEach(([key, value]) => {
      if (value && value !== "All" && (Array.isArray(value) ? value.length > 0 : value.toString().trim())) {
        if (Array.isArray(value)) {
          searchParams.set(key, value.join(','))
        } else {
          searchParams.set(key, value.toString().trim())
        }
      }
    })
    
    // Navigate to trades page with search parameters
    const queryString = searchParams.toString()
    router.push(`/trades${queryString ? `?${queryString}` : ''}`)
  }

  // Handle trade search reset
  const handleTradeReset = () => {
    setTradeSearchForm({
      orderDateFrom: "",
      orderDateTo: "",
      statuses: [],
      wireOrderNumber: "",
      sourceIdentifier: "",
      productIndicator: "All",
      wireOrderStatus: "All",
      fundTransactionTypes: [],
      securityType: "All"
    })
  }

  // Handle status toggle for trades
  const handleTradeStatusToggle = (status: string) => {
    setTradeSearchForm(prev => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status]
    }))
  }

  // Handle transaction type toggle for trades
  const handleTradeTransactionTypeToggle = (type: string) => {
    setTradeSearchForm(prev => ({
      ...prev,
      fundTransactionTypes: prev.fundTransactionTypes.includes(type)
        ? prev.fundTransactionTypes.filter(t => t !== type)
        : [...prev.fundTransactionTypes, type]
    }))
  }


  // Navigate to specific client details
  const handleClientClick = (client: any) => {
    // Navigate to clients page with search parameters to show this specific client
    const searchParams = new URLSearchParams()
    searchParams.set('firstName', client.firstName)
    searchParams.set('surname', client.surname)
    router.push(`/clients?${searchParams.toString()}`)
  }

  // Select all/none functions
  const handleSelectAllClients = () => {
    handleSelectAll(filteredClients.map(client => client.id))
  }

  // Handle Add Client button click
  const handleAddClient = () => {
    router.push('/clients')
    handleNavigation()
  }

  // Handle Advance Search button click
  const handleAdvanceSearch = () => {
    router.push('/clients/advanced-search')
    handleNavigation()
  }




  function NavItem({
    href,
    icon: Icon,
    children,
    isExpandable = false,
    isExpanded = false,
    onToggle,
  }: {
    href: string
    icon: any
    children: React.ReactNode
    isExpandable?: boolean
    isExpanded?: boolean
    onToggle?: () => void
  }) {
    if (isExpandable) {
      return (
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <div className="flex items-center">
            <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
            {children}
          </div>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      )
    }

    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-gray-900 transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 px-6 flex items-center bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-900 dark:bg-gray-700">
                <Building2 className="h-5 w-5 text-gray-50" />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                OneBoss
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4 scrollbar-hide">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Main Navigation
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                      <Link
                        href="/clients"
                        onClick={() => {
                          setIsClientsExpanded(true)
                          handleNavigation()
                        }}
                        className="flex items-center flex-1"
                      >
                        <Users2 className="h-4 w-4 mr-3 flex-shrink-0" />
                        Clients
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setIsClientsExpanded(!isClientsExpanded)
                        }}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                      >
                        {isClientsExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Client Search Form - Clean and Organized */}
                  <div className={`ml-4 space-y-4 pl-4 pr-2 overflow-hidden transition-all duration-300 ease-in-out ${
                    isClientsExpanded 
                      ? 'max-h-[600px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}>
                    <div className={`space-y-3 pt-2 transition-all duration-300 delay-100 ${
                      isClientsExpanded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}>
                      {/* Quick Search */}
                      <div className="space-y-2">
                        <Input
                          placeholder="Quick search..."
                          className="h-8 text-sm"
                          value={clientSearchTerm}
                          onChange={(e) => setClientSearchTerm(e.target.value)}
                        />
                        
                        {/* Action Buttons */}
                        <div className="space-y-1">
                          <Button 
                            onClick={handleAddClient}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-7 text-xs"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Client
                          </Button>
                          <Button 
                            onClick={handleAdvanceSearch}
                            variant="outline"
                            className="w-full h-7 text-xs"
                          >
                            <Search className="h-3 w-3 mr-1" />
                            Advance Search
                          </Button>
                        </div>
                      </div>

                      {/* Client Results */}
                      <div className={`space-y-2 transition-all duration-300 delay-150 ${
                        isClientsExpanded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users2 className="h-4 w-4 text-green-600" />
                            <h4 className="text-xs font-semibold text-gray-900 dark:text-white">
                              {filteredClients.length} Found
                            </h4>
                          </div>
                          {filteredClients.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {filteredClients.length}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
                          <div className="max-h-48 overflow-y-auto space-y-1 p-2">
                            {filteredClients.map((client) => (
                              <div
                                key={client.id}
                                className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-200 group"
                                onClick={() => handleClientClick(client)}
                              >
                                <Checkbox 
                                  className="h-3 w-3"
                                  checked={selectedClientIds.includes(client.id)}
                                  onCheckedChange={(checked) => handleClientSelection(client.id, checked as boolean)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <div className="flex items-center gap-1 flex-1 min-w-0">
                                  {getStatusIcon(client.status)}
                                  <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
                                    {client.surname}, {client.firstName}
                                  </div>
                                </div>
                                {client.hasAlert && (
                                  <div className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse flex-shrink-0"></div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {filteredClients.length > 0 && (
                            <div className="flex gap-1 p-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs h-6 flex-1 rounded-md"
                                onClick={handleSelectNone}
                              >
                                Clear
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs h-6 flex-1 rounded-md"
                                onClick={handleSelectAllClients}
                              >
                                Select All
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                      <Link
                        href="/trades"
                        onClick={() => {
                          setIsTradesExpanded(true)
                          handleNavigation()
                        }}
                        className="flex items-center flex-1"
                      >
                        <TrendingUp className="h-4 w-4 mr-3 flex-shrink-0" />
                    Trades
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setIsTradesExpanded(!isTradesExpanded)
                        }}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                      >
                        {isTradesExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Trade Search Form */}
                  <div className={`ml-4 space-y-4 pl-4 pr-2 overflow-hidden transition-all duration-300 ease-in-out ${
                    isTradesExpanded 
                      ? 'max-h-[800px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}>
                    <div className={`space-y-3 pt-2 transition-all duration-300 delay-100 ${
                      isTradesExpanded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}>
                      {/* Search Header */}
                      <div className="flex items-center gap-2 mb-3">
                        <Search className="h-4 w-4 text-blue-600" />
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Trade Search</h3>
                      </div>
                      
                      {/* Date Type */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Date Type</label>
                        <Select value="Order Date" disabled>
                          <SelectTrigger className="h-7 text-xs">
                            <SelectValue placeholder="Order Date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Order Date">Order Date</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Date Range */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Date Range</label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            type="date"
                            className="h-7 text-xs"
                            value={tradeSearchForm.orderDateFrom}
                            onChange={(e) => handleTradeSearchFormChange('orderDateFrom', e.target.value)}
                          />
                          <Input
                            type="date"
                            className="h-7 text-xs"
                            value={tradeSearchForm.orderDateTo}
                            onChange={(e) => handleTradeSearchFormChange('orderDateTo', e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Statuses */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Statuses</label>
                        <div className="space-y-1">
                          {['Executed', 'Pending', 'Cancelled'].map((status) => (
                            <div key={status} className="flex items-center space-x-2">
                              <Checkbox
                                id={`trade-status-${status}`}
                                className="h-3 w-3"
                                checked={tradeSearchForm.statuses.includes(status)}
                                onCheckedChange={() => handleTradeStatusToggle(status)}
                              />
                              <label htmlFor={`trade-status-${status}`} className="text-xs text-gray-700 dark:text-gray-300">
                                {status}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Wire Order Number */}
                      <div className="space-y-2">
                        <Input
                          placeholder="Wire Order Number"
                          className="h-7 text-xs"
                          value={tradeSearchForm.wireOrderNumber}
                          onChange={(e) => handleTradeSearchFormChange('wireOrderNumber', e.target.value)}
                        />
                      </div>

                      {/* Source Identifier */}
                      <div className="space-y-2">
                        <Input
                          placeholder="Source Identifier"
                          className="h-7 text-xs"
                          value={tradeSearchForm.sourceIdentifier}
                          onChange={(e) => handleTradeSearchFormChange('sourceIdentifier', e.target.value)}
                        />
                      </div>

                      {/* Product Indicator */}
                      <div className="space-y-2">
                        <Select value={tradeSearchForm.productIndicator} onValueChange={(value) => handleTradeSearchFormChange('productIndicator', value)}>
                          <SelectTrigger className="h-7 text-xs">
                            <SelectValue placeholder="Product Indicator" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="AGF">AGF</SelectItem>
                            <SelectItem value="GW">GW</SelectItem>
                            <SelectItem value="RBC">RBC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Wire Order Status */}
                      <div className="space-y-2">
                        <Select value={tradeSearchForm.wireOrderStatus} onValueChange={(value) => handleTradeSearchFormChange('wireOrderStatus', value)}>
                          <SelectTrigger className="h-7 text-xs">
                            <SelectValue placeholder="Wire Order Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="Executed">Executed</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Fund Transaction Types */}
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Fund Transaction Types</label>
                        <div className="space-y-1">
                          {['Buy', 'Sell', 'Switch'].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={`trade-type-${type}`}
                                className="h-3 w-3"
                                checked={tradeSearchForm.fundTransactionTypes.includes(type)}
                                onCheckedChange={() => handleTradeTransactionTypeToggle(type)}
                              />
                              <label htmlFor={`trade-type-${type}`} className="text-xs text-gray-700 dark:text-gray-300">
                                {type}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Security Type */}
                      <div className="space-y-2">
                        <Select value={tradeSearchForm.securityType} onValueChange={(value) => handleTradeSearchFormChange('securityType', value)}>
                          <SelectTrigger className="h-7 text-xs">
                            <SelectValue placeholder="Security Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="Mutual Fund">Mutual Fund</SelectItem>
                            <SelectItem value="ETF">ETF</SelectItem>
                            <SelectItem value="Bond">Bond</SelectItem>
                            <SelectItem value="Stock">Stock</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-1">
                        <Button 
                          onClick={handleTradeSearch}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-7 text-xs"
                        >
                          <Search className="h-3 w-3 mr-1" />
                          Search
                        </Button>
                        <Button 
                          variant="outline" 
                          className="h-7 text-xs px-2"
                          onClick={handleTradeReset}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  </div>
                  <NavItem href="#" icon={Wallet}>
                    Trust Deposits
                  </NavItem>
                  <NavItem href="#" icon={Target}>
                    Prospects
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Management
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Building2}>
                    Ensemble
                  </NavItem>
                  <NavItem href="#" icon={User}>
                    KYP
                  </NavItem>
                  <NavItem href="#" icon={Folder}>
                    Resources
                  </NavItem>
                  <NavItem href="#" icon={DollarSign}>
                    Earnings
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  System
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Shield}>
                    Notices
                  </NavItem>
                  <NavItem href="#" icon={Settings}>
                    Settings
                  </NavItem>
                  <NavItem href="#" icon={MessagesSquare}>
                    Support
                  </NavItem>
                </div>
              </div>
            </div>
          </div>


        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
