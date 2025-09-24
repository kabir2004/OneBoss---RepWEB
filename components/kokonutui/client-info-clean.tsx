"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  CheckCircle,
  Clock,
  PauseCircle,
  Search,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Filter,
  Download,
  Target,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  BarChart3,
  FileText,
  Users2,
  Home,
  CheckSquare,
  BarChart2,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  HelpCircle,
  ArrowLeft,
  ArrowLeftRight,
  Minus,
  Calendar,
  Building2,
  Shield,
  User,
  MessageSquare,
  PieChart,
  UserCheck,
  MapPin as AddressIcon,
  Phone as PhoneIcon,
  Smartphone,
  AtSign
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CustomCompensation from "./custom-compensation"
import KYC from "./kyc"
import ClientTrading from "./client-trading"
import ClientReports from "./client-reports"
import ClientCharts from "./client-charts"
import ClientApprovals from "./client-approvals"
import { mockClients } from "@/lib/client-data"

interface ClientInfoProps {
  clientId: string
}

export default function ClientInfo({ clientId }: ClientInfoProps) {
  const router = useRouter()
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [expandedPlans, setExpandedPlans] = useState<{[key: string]: boolean}>({
    'resp': true,
    'rrsp': true
  })
  const [showNFCModal, setShowNFCModal] = useState(false)
  const [showNFCSubmissionsModal, setShowNFCSubmissionsModal] = useState(false)
  const [showNFUMessagesModal, setShowNFUMessagesModal] = useState(false)
  const [activePlanTab, setActivePlanTab] = useState('details')
  const [activeAllocationTab, setActiveAllocationTab] = useState('chart')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [showSellModal, setShowSellModal] = useState(false)
  const [showSwitchModal, setShowSwitchModal] = useState(false)
  const [selectedFund, setSelectedFund] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [buyAmount, setBuyAmount] = useState('')
  const [buyUnits, setBuyUnits] = useState('')
  const [sellAmount, setSellAmount] = useState('')
  const [sellUnits, setSellUnits] = useState('')
  const [switchUnits, setSwitchUnits] = useState('')
  const [selectedNewFund, setSelectedNewFund] = useState('')
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  // Utility functions
  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "pending":
        return <Clock className="h-3 w-3 text-yellow-600" />
      case "inactive":
        return <PauseCircle className="h-3 w-3 text-muted-foreground" />
      default:
        return <div className="h-3 w-3 rounded-full bg-muted-foreground" />
    }
  }, [])

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    }).format(amount)
  }, [])

  // Search functionality

  const performSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    const query = searchQuery.toLowerCase()
    const results = mockClients.filter(client => {
      if (client.id === parseInt(clientId)) return false // Exclude current client
      
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
    
    setSearchResults(results)
    setShowSearchResults(true)
  }, [searchQuery, clientId])

  // Trigger search when query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch()
    }, 300) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [searchQuery, performSearch])

  const handleClientSelect = useCallback((selectedClient: any) => {
    router.push(`/clients/${selectedClient.id}`)
    setSearchQuery('')
    setShowSearchResults(false)
  }, [router])

  const handleSearchBlur = useCallback(() => {
    // Delay hiding results to allow clicking on them
    setTimeout(() => {
      setShowSearchResults(false)
    }, 200)
  }, [])

  // Modal handlers
  const handleBuyFund = useCallback((fund: any, plan: string) => {
    setSelectedFund(fund)
    setSelectedPlan(plan)
    setShowBuyModal(true)
  }, [])

  const handleSellFund = useCallback((fund: any, plan: string) => {
    setSelectedFund(fund)
    setSelectedPlan(plan)
    setShowSellModal(true)
  }, [])

  const handleSwitchFund = useCallback((fund: any, plan: string) => {
    setSelectedFund(fund)
    setSelectedPlan(plan)
    setShowSwitchModal(true)
  }, [])

  const closeAllModals = useCallback(() => {
    setShowBuyModal(false)
    setShowSellModal(false)
    setShowSwitchModal(false)
    setSelectedFund(null)
    setSelectedPlan('')
    setBuyAmount('')
    setBuyUnits('')
    setSellAmount('')
    setSellUnits('')
    setSwitchUnits('')
    setSelectedNewFund('')
    setOrderConfirmed(false)
    setOrderDetails(null)
  }, [])

  // Calculation functions
  const calculateBuyUnits = useCallback((amount: string) => {
    if (!amount || !selectedFund?.avgCost) return '0'
    const units = parseFloat(amount) / selectedFund.avgCost
    return units.toFixed(2)
  }, [selectedFund])

  const calculateBuyAmount = useCallback((units: string) => {
    if (!units || !selectedFund?.avgCost) return '0'
    const amount = parseFloat(units) * selectedFund.avgCost
    return amount.toFixed(2)
  }, [selectedFund])

  const calculateSellUnits = useCallback((amount: string) => {
    if (!amount || !selectedFund?.avgCost) return '0'
    const units = parseFloat(amount) / selectedFund.avgCost
    return Math.min(units, selectedFund.units || 0).toFixed(2)
  }, [selectedFund])

  const calculateSellAmount = useCallback((units: string) => {
    if (!units || !selectedFund?.avgCost) return '0'
    const amount = parseFloat(units) * selectedFund.avgCost
    return amount.toFixed(2)
  }, [selectedFund])

  const handlePlaceOrder = useCallback((orderType: 'buy' | 'sell' | 'switch') => {
    const details = {
      type: orderType,
      fund: selectedFund,
      plan: selectedPlan,
      timestamp: new Date().toLocaleString(),
      orderId: `ORD-${Date.now()}`,
      ...(orderType === 'buy' && {
        amount: buyAmount || calculateBuyAmount(buyUnits),
        units: buyUnits || calculateBuyUnits(buyAmount)
      }),
      ...(orderType === 'sell' && {
        amount: sellAmount || calculateSellAmount(sellUnits),
        units: sellUnits || calculateSellUnits(sellAmount)
      }),
      ...(orderType === 'switch' && {
        units: switchUnits,
        newFund: selectedNewFund
      })
    }
    setOrderDetails(details)
    setOrderConfirmed(true)
  }, [selectedFund, selectedPlan, buyAmount, buyUnits, sellAmount, sellUnits, switchUnits, calculateBuyAmount, calculateBuyUnits, calculateSellAmount, calculateSellUnits])

  const togglePlan = useCallback((planKey: string) => {
    setExpandedPlans(prev => ({
      ...prev,
      [planKey]: !prev[planKey]
    }))
  }, [])

  const calculatePlanTotal = useCallback((investments: any[]) => {
    return investments?.reduce((total, investment) => total + (investment.marketValue || 0), 0) || 0
  }, [])

  const calculateGrandTotal = useCallback((client: any) => {
    return calculatePlanTotal(client?.investments || []) + (client?.settledTrustCAD || 0) + (client?.settledTrustUSD || 0)
  }, [calculatePlanTotal])

  // Load client data
  useEffect(() => {
    const foundClient = mockClients.find(c => c.id.toString() === clientId)
    if (foundClient) {
      setClient(foundClient)
    }
    setLoading(false)
  }, [clientId])

  const handleBack = () => {
    router.push('/clients')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading client information...</p>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">Client Not Found</h3>
          <p className="text-muted-foreground mb-4">The requested client could not be found.</p>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
        </div>
      </div>
    )
  }

  const SearchFieldWithResults = ({ className = "", showDropdown = true }: { className?: string, showDropdown?: boolean }) => (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search clients by name, email, ID, or location..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value)
          setShowSearchResults(true)
        }}
        onFocus={() => setShowSearchResults(true)}
        onBlur={handleSearchBlur}
        className="pl-10 h-11 text-sm bg-background border-input"
      />

      {/* Search Results Dropdown */}
      {showDropdown && showSearchResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {searchResults.map((result) => (
            <div
              key={result.id}
              onClick={() => handleClientSelect(result)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                  {result.firstName[0]}{result.surname[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900 truncate">
                    {result.firstName} {result.surname}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: {result.clientId} • {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {showDropdown && showSearchResults && searchQuery.trim().length > 0 && searchResults.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="px-4 py-3 text-sm text-gray-500 text-center">
            No clients found matching the search criteria
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Sticky Search Field */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border pb-6 -mx-6 px-6 -mt-6 pt-6">
        <SearchFieldWithResults />
      </div>

      {/* Client Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBack}
                className="hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Clients
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {client.firstName[0]}{client.surname[0]}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-card-foreground">
                    {client.firstName} {client.surname}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      {getStatusIcon(client.status)}
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                    <span>•</span>
                    <span>ID: {client.clientId}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowNFCModal(true)}
                className="hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Non Financial Change
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowNFCSubmissionsModal(true)}
                className="hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200"
              >
                <FileText className="h-4 w-4 mr-2" />
                NFC Submissions
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowNFUMessagesModal(true)}
                className="hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-all duration-200"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                NFU Messages
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Client
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Client Tabs */}
      <div className="flex-1 overflow-y-auto bg-white">
        <Tabs defaultValue="summary" className="h-full">
          <div className="bg-card shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <TabsList className="h-14 w-full justify-start bg-transparent p-1 min-w-max">
                  <TabsTrigger 
                    value="summary" 
                    className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Summary
                  </TabsTrigger>
                  <TabsTrigger 
                    value="details" 
                    className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notes" 
                    className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger 
                    value="plans" 
                    className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Plans
                  </TabsTrigger>
                  <TabsTrigger 
                    value="trading" 
                    className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trading
                  </TabsTrigger>
                  <TabsTrigger 
                    value="questionnaires" 
                    className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Questionnaires
                  </TabsTrigger>
                  <TabsTrigger 
                    value="kyc" 
                    className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    KYC
                  </TabsTrigger>
                  <TabsTrigger 
                    value="compensation" 
                    className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Compensation
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reports" 
                    className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Reports
                  </TabsTrigger>
                  <TabsTrigger 
                    value="charts" 
                    className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Charts
                  </TabsTrigger>
                  <TabsTrigger 
                    value="approvals" 
                    className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approvals
                  </TabsTrigger>
                  <TabsTrigger 
                    value="attachments" 
                    className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Attachments
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </div>

          {/* Summary Tab */}
          <TabsContent value="summary" className="flex-1 p-6 bg-white">
            <div className="space-y-6">
              {/* Client Overview - Compact Layout */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Client ID */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Client ID</p>
                      <p className="text-sm font-semibold text-card-foreground">{client.clientId}</p>
                    </div>
                  </div>
                  
                  {/* Total Assets */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Assets</p>
                      <p className="text-sm font-semibold text-green-600">{formatCurrency(calculateGrandTotal(client))}</p>
                    </div>
                  </div>
                  
                  {/* Total Trades */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Trades</p>
                      <p className="text-sm font-semibold text-card-foreground">{client.totalTrades || 0}</p>
                    </div>
                  </div>
                  
                  {/* Join Date */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Join Date</p>
                      <p className="text-sm font-semibold text-card-foreground">{client.joinDate || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact & Address Information - Compact Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Mailing Address */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <h3 className="text-sm font-semibold text-card-foreground">Mailing Address</h3>
                  </div>
                  <div className="text-xs text-card-foreground space-y-1">
                    <p>230 Meadowbrook Dr. Unit 4</p>
                    <p>ANCASTER ON L9K 1J3</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="h-4 w-4 text-green-600" />
                    <h3 className="text-sm font-semibold text-card-foreground">Contact Information</h3>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Home:</span>
                      <span className="text-card-foreground">555-555-5555</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cell:</span>
                      <span className="text-card-foreground">555-555-5555</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="text-card-foreground">client@onebosstest.com</span>
                    </div>
                  </div>
                </div>

                {/* Representative & Language */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-4 w-4 text-orange-600" />
                    <h3 className="text-sm font-semibold text-card-foreground">Representative</h3>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="text-card-foreground font-medium">Marsh, Antoine</p>
                    <p className="text-muted-foreground">ID: 9823-2232</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-muted-foreground">Language:</span>
                      <span className="text-card-foreground">English</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Portfolio Section */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                <div className="p-6 border-b border-gray-200/60 bg-gradient-to-r from-blue-50/80 to-blue-50/40 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-card-foreground">Financial Portfolio</h3>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Plan
                    </Button>
                  </div>
                </div>
                
                <Tabs defaultValue="investments" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-50/50 p-1 rounded-lg m-6 mb-0">
                    <TabsTrigger 
                      value="investments"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 hover:bg-white/50 transition-all duration-200"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Investments
                    </TabsTrigger>
                    <TabsTrigger 
                      value="cash"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 hover:bg-white/50 transition-all duration-200"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Cash
                    </TabsTrigger>
                    <TabsTrigger 
                      value="trading"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 hover:bg-white/50 transition-all duration-200"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Trading Activity
                    </TabsTrigger>
                    <TabsTrigger 
                      value="documents"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 hover:bg-white/50 transition-all duration-200 flex items-center gap-1"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Documents
                      <AlertTriangle className="h-3 w-3 text-orange-500" />
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="investments" className="mt-6 bg-white">
                    <div className="space-y-6">
                      {/* RESP Plan Section */}
                      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                        <div
                          className="p-6 border-b border-gray-200/60 bg-gradient-to-r from-blue-50/80 to-blue-50/40 hover:from-blue-100/80 hover:to-blue-100/40 transition-all duration-200 rounded-t-xl"
                        >
                          <div className="flex items-center justify-between">
                            <div
                              className="flex items-center gap-4 cursor-pointer flex-1"
                              onClick={() => togglePlan('resp')}
                            >
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Target className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex items-center justify-between w-full">
                                {/* Left side - Plan info and controls */}
                                <div className="flex items-center gap-3">
                                  {expandedPlans.resp ? (
                                    <ChevronDown className="h-5 w-5 text-blue-600" />
                                  ) : (
                                    <ChevronUp className="h-5 w-5 text-blue-600" />
                                  )}
                                  <div>
                                    <h4 className="font-semibold text-card-foreground text-lg">
                                      RESP Education Savings Plan
                                    </h4>
                                    <div className="flex items-center gap-4 mt-1">
                                      <span className="text-sm text-muted-foreground">
                                        Account: <span className="font-mono text-blue-700">3238677748</span>
                                      </span>
                                      <span className="text-sm text-blue-600">Family Plan</span>
                                      <span className="text-sm text-muted-foreground">{client.currentRepresentative || 'Smith, John'}</span>
                                      <span className="text-xs text-muted-foreground">•</span>
                                      <span className="text-sm text-orange-600">Risk: Medium</span>
                                      <span className="text-sm text-orange-700">Speculation Strategy</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Right side - Financial Card */}
                                <div className="flex items-center gap-6">
                                  {/* Portfolio Value Card */}
                                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center h-10 flex flex-col justify-center min-w-[130px]">
                                    <div className="text-xs text-green-600 font-medium leading-tight">Total Value</div>
                                    <div className="text-sm font-bold text-green-700 leading-tight">$42,000.12</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/80 border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                // Handle add investment logic here
                                console.log('Add Investment to RESP plan')
                              }}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Investment
                            </Button>
                          </div>
                        </div>
                        
                        {expandedPlans.resp && (
                          <>
                            <div className="p-6">
                              <div className="overflow-hidden rounded-lg border border-gray-200/60">
                                <Table>
                                  <TableHeader>
                                    <TableRow className="bg-gradient-to-r from-blue-50/80 to-blue-50/40 border-b border-gray-200/60">
                                      <TableHead className="font-semibold text-gray-700 py-4">Supplier</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4">Account</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4">Product</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4">Risk</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4">Objective</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4 text-right">Units</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4 text-right">Avg. Cost</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4 text-right">Book Value</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4 text-right">Market Value</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4 text-center">Trading</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow className="hover:bg-blue-50/30 transition-colors duration-200 border-b border-gray-100/60">
                                      <TableCell className="font-medium py-4">
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                            <span className="text-xs font-bold text-blue-700">F</span>
                                          </div>
                                          <span className="text-sm font-medium">FID-253</span>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-4 text-sm text-muted-foreground">3448232822</TableCell>
                                      <TableCell className="py-4">
                                        <div className="max-w-xs">
                                          <div className="text-sm font-medium text-card-foreground">FIDELITY NORTHSTAR FUND</div>
                                          <div className="text-xs text-muted-foreground">Series B ISC</div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-4">
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">M</Badge>
                                          <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <FileText className="h-3 w-3 text-gray-400" />
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-4 text-sm text-muted-foreground">Speculation</TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-sm font-medium text-card-foreground">1,247.32</div>
                                        <div className="text-xs text-muted-foreground">Units</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-sm font-medium text-card-foreground">$9.41</div>
                                        <div className="text-xs text-muted-foreground">Per Unit</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-sm font-medium text-blue-600">$11,734.50</div>
                                        <div className="text-xs text-muted-foreground">Purchase</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-lg font-semibold text-green-600">$11,734.85</div>
                                        <div className="text-xs text-green-600">+$0.35 (0.003%)</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 transition-all duration-200"
                                            onClick={() => handleBuyFund({
                                              supplier: 'FID-253',
                                              product: 'FIDELITY NORTHSTAR FUND',
                                              series: 'Series B ISC',
                                              units: 1247.32,
                                              avgCost: 9.41,
                                              marketValue: 11734.85
                                            }, 'RESP')}
                                          >
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200"
                                            onClick={() => handleSellFund({
                                              supplier: 'FID-253',
                                              product: 'FIDELITY NORTHSTAR FUND',
                                              series: 'Series B ISC',
                                              units: 1247.32,
                                              avgCost: 9.41,
                                              marketValue: 11734.85
                                            }, 'RESP')}
                                          >
                                            <Minus className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
                                            onClick={() => handleSwitchFund({
                                              supplier: 'FID-253',
                                              company: 'Fidelity',
                                              product: 'FIDELITY NORTHSTAR FUND',
                                              series: 'Series B ISC',
                                              units: 1247.32,
                                              avgCost: 9.41,
                                              marketValue: 11734.85
                                            }, 'RESP')}
                                          >
                                            <ArrowLeftRight className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                    <TableRow className="hover:bg-blue-50/30 transition-colors duration-200">
                                      <TableCell className="font-medium py-4">
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                            <span className="text-xs font-bold text-blue-700">F</span>
                                          </div>
                                          <span className="text-sm font-medium">FID-269</span>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-4 text-sm text-muted-foreground">6503857600</TableCell>
                                      <TableCell className="py-4">
                                        <div className="max-w-xs">
                                          <div className="text-sm font-medium text-card-foreground">FIDELITY MONTHLY INCOME FUND</div>
                                          <div className="text-xs text-muted-foreground">Series B ISC</div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-4">
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">LM</Badge>
                                          <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <FileText className="h-3 w-3 text-gray-400" />
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-4 text-sm text-muted-foreground">Balanced</TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-sm font-medium text-card-foreground">2,789.44</div>
                                        <div className="text-xs text-muted-foreground">Units</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-sm font-medium text-card-foreground">$10.85</div>
                                        <div className="text-xs text-muted-foreground">Per Unit</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-sm font-medium text-blue-600">$30,265.52</div>
                                        <div className="text-xs text-muted-foreground">Purchase</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-lg font-semibold text-green-600">$30,265.27</div>
                                        <div className="text-xs text-red-500">-$0.25 (-0.001%)</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 transition-all duration-200"
                                            onClick={() => handleBuyFund({
                                              supplier: 'FID-269',
                                              product: 'FIDELITY MONTHLY INCOME FUND',
                                              series: 'Series B ISC',
                                              units: 2789.44,
                                              avgCost: 10.85,
                                              marketValue: 30265.27
                                            }, 'RESP')}
                                          >
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200"
                                            onClick={() => handleSellFund({
                                              supplier: 'FID-269',
                                              product: 'FIDELITY MONTHLY INCOME FUND',
                                              series: 'Series B ISC',
                                              units: 2789.44,
                                              avgCost: 10.85,
                                              marketValue: 30265.27
                                            }, 'RESP')}
                                          >
                                            <Minus className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
                                            onClick={() => handleSwitchFund({
                                              supplier: 'FID-269',
                                              company: 'Fidelity',
                                              product: 'FIDELITY MONTHLY INCOME FUND',
                                              series: 'Series B ISC',
                                              units: 2789.44,
                                              avgCost: 10.85,
                                              marketValue: 30265.27
                                            }, 'RESP')}
                                          >
                                            <ArrowLeftRight className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                            
                            <div className="p-6 border-t border-gray-200/60 bg-gradient-to-r from-blue-50/50 to-blue-50/30">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-4 rounded-lg border border-gray-200/40">
                                  <div className="text-sm text-muted-foreground mb-1">Settled Trust Account Balance CAD</div>
                                  <div className="text-lg font-semibold text-card-foreground">$0.00</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-gray-200/40">
                                  <div className="text-sm text-muted-foreground mb-1">Settled Trust Account Balance USD</div>
                                  <div className="text-lg font-semibold text-card-foreground">$0.00</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-gray-200/40">
                                  <div className="text-sm text-muted-foreground mb-1">Total in CAD</div>
                                  <div className="text-lg font-semibold text-green-600">$42,000.12</div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* RRSP Plan Section */}
                      <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                        <div
                          className="p-6 border-b border-gray-200/60 bg-gradient-to-r from-green-50/80 to-green-50/40 hover:from-green-100/80 hover:to-green-100/40 transition-all duration-200 rounded-t-xl"
                        >
                          <div className="flex items-center justify-between">
                            <div
                              className="flex items-center gap-4 cursor-pointer flex-1"
                              onClick={() => togglePlan('rrsp')}
                            >
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Target className="h-5 w-5 text-green-600" />
                              </div>
                              <div className="flex items-center justify-between w-full">
                                {/* Left side - Plan info and controls */}
                                <div className="flex items-center gap-3">
                                  {expandedPlans.rrsp ? (
                                    <ChevronDown className="h-5 w-5 text-green-600" />
                                  ) : (
                                    <ChevronUp className="h-5 w-5 text-green-600" />
                                  )}
                                  <div>
                                    <h4 className="font-semibold text-card-foreground text-lg">
                                      RRSP Retirement Savings Plan
                                    </h4>
                                    <div className="flex items-center gap-4 mt-1">
                                      <span className="text-sm text-muted-foreground">
                                        Account: <span className="font-mono text-green-700">7545538518</span>
                                      </span>
                                      <span className="text-sm text-green-600">Individual Plan</span>
                                      <span className="text-sm text-muted-foreground">{client.currentRepresentative || 'Smith, John'}</span>
                                      <span className="text-xs text-muted-foreground">•</span>
                                      <span className="text-sm text-blue-600">Risk: Medium</span>
                                      <span className="text-sm text-blue-700">Growth Strategy</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Right side - Financial Card */}
                                <div className="flex items-center gap-6">
                                  {/* Portfolio Value Card */}
                                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center h-10 flex flex-col justify-center min-w-[130px]">
                                    <div className="text-xs text-green-600 font-medium leading-tight">Total Value</div>
                                    <div className="text-sm font-bold text-green-700 leading-tight">$26,700.30</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/80 border-green-300 text-green-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                // Handle add investment logic here
                                console.log('Add Investment to RRSP plan')
                              }}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Investment
                            </Button>
                          </div>
                        </div>
                        
                        {expandedPlans.rrsp && (
                          <>
                            <div className="p-6">
                              <div className="overflow-hidden rounded-lg border border-gray-200/60">
                                <Table>
                                  <TableHeader>
                                    <TableRow className="bg-gradient-to-r from-green-50/80 to-green-50/40 border-b border-gray-200/60">
                                      <TableHead className="font-semibold text-gray-700 py-4">Supplier</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4">Account</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4">Product</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4">Risk</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4">Objective</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4 text-right">Units</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4 text-right">Avg. Cost</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4 text-right">Book Value</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4 text-right">Market Value</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4 text-center">Trading</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow className="hover:bg-green-50/30 transition-colors duration-200 border-b border-gray-100/60">
                                      <TableCell className="font-medium py-4">
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                                            <span className="text-xs font-bold text-green-700">T</span>
                                          </div>
                                          <span className="text-sm font-medium">TD-001</span>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-4 text-sm text-muted-foreground">1234567890</TableCell>
                                      <TableCell className="py-4">
                                        <div className="max-w-xs">
                                          <div className="text-sm font-medium text-card-foreground">TD CANADIAN EQUITY FUND</div>
                                          <div className="text-xs text-muted-foreground">Series A</div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-4">
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">M</Badge>
                                          <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <FileText className="h-3 w-3 text-gray-400" />
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-4 text-sm text-muted-foreground">Growth</TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-sm font-medium text-card-foreground">2,156.78</div>
                                        <div className="text-xs text-muted-foreground">Units</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-sm font-medium text-card-foreground">$11.80</div>
                                        <div className="text-xs text-muted-foreground">Per Unit</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-sm font-medium text-blue-600">$25,450.00</div>
                                        <div className="text-xs text-muted-foreground">Purchase</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-lg font-semibold text-green-600">$25,450.30</div>
                                        <div className="text-xs text-green-600">+$0.30 (0.001%)</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 transition-all duration-200"
                                            onClick={() => handleBuyFund({
                                              supplier: 'TD-001',
                                              product: 'TD CANADIAN EQUITY FUND',
                                              series: 'Series A',
                                              units: 2156.78,
                                              avgCost: 11.80,
                                              marketValue: 25450.30
                                            }, 'RRSP')}
                                          >
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200"
                                            onClick={() => handleSellFund({
                                              supplier: 'TD-001',
                                              product: 'TD CANADIAN EQUITY FUND',
                                              series: 'Series A',
                                              units: 2156.78,
                                              avgCost: 11.80,
                                              marketValue: 25450.30
                                            }, 'RRSP')}
                                          >
                                            <Minus className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
                                            onClick={() => handleSwitchFund({
                                              supplier: 'TD-001',
                                              company: 'TD',
                                              product: 'TD CANADIAN EQUITY FUND',
                                              series: 'Series A',
                                              units: 2156.78,
                                              avgCost: 11.80,
                                              marketValue: 25450.30
                                            }, 'RRSP')}
                                          >
                                            <ArrowLeftRight className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                    <TableRow className="hover:bg-green-50/30 transition-colors duration-200">
                                      <TableCell className="font-medium py-4">
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                                            <span className="text-xs font-bold text-green-700">T</span>
                                          </div>
                                          <span className="text-sm font-medium">TD-142</span>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-4 text-sm text-muted-foreground">9876543210</TableCell>
                                      <TableCell className="py-4">
                                        <div className="max-w-xs">
                                          <div className="text-sm font-medium text-card-foreground">TD BALANCED GROWTH FUND</div>
                                          <div className="text-xs text-muted-foreground">Series F</div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-4">
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">H</Badge>
                                          <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <FileText className="h-3 w-3 text-gray-400" />
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="py-4 text-sm text-muted-foreground">Growth</TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-sm font-medium text-card-foreground">105.50</div>
                                        <div className="text-xs text-muted-foreground">Units</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-sm font-medium text-card-foreground">$12.14</div>
                                        <div className="text-xs text-muted-foreground">Per Unit</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-sm font-medium text-blue-600">$1,280.77</div>
                                        <div className="text-xs text-muted-foreground">Purchase</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-right">
                                        <div className="text-lg font-semibold text-green-600">$1,281.47</div>
                                        <div className="text-xs text-green-600">+$0.70 (0.055%)</div>
                                      </TableCell>
                                      <TableCell className="py-4 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 transition-all duration-200"
                                            onClick={() => handleBuyFund({
                                              supplier: 'TD-142',
                                              product: 'TD BALANCED GROWTH FUND',
                                              series: 'Series F',
                                              units: 105.50,
                                              avgCost: 12.14,
                                              marketValue: 1281.47
                                            }, 'RRSP')}
                                          >
                                            <Plus className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200"
                                            onClick={() => handleSellFund({
                                              supplier: 'TD-142',
                                              product: 'TD BALANCED GROWTH FUND',
                                              series: 'Series F',
                                              units: 105.50,
                                              avgCost: 12.14,
                                              marketValue: 1281.47
                                            }, 'RRSP')}
                                          >
                                            <Minus className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200"
                                            onClick={() => handleSwitchFund({
                                              supplier: 'TD-142',
                                              company: 'TD',
                                              product: 'TD BALANCED GROWTH FUND',
                                              series: 'Series F',
                                              units: 105.50,
                                              avgCost: 12.14,
                                              marketValue: 1281.47
                                            }, 'RRSP')}
                                          >
                                            <ArrowLeftRight className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                            </div>

                            <div className="p-6 border-t border-gray-200/60 bg-gradient-to-r from-green-50/50 to-green-50/30">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-4 rounded-lg border border-gray-200/40">
                                  <div className="text-sm text-muted-foreground mb-1">Settled Trust Account Balance CAD</div>
                                  <div className="text-lg font-semibold text-card-foreground">$1,250.00</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-gray-200/40">
                                  <div className="text-sm text-muted-foreground mb-1">Settled Trust Account Balance USD</div>
                                  <div className="text-lg font-semibold text-card-foreground">$0.00</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-gray-200/40">
                                  <div className="text-sm text-muted-foreground mb-1">Total in CAD</div>
                                  <div className="text-lg font-semibold text-green-600">$26,700.30</div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cash" className="mt-6 bg-white">
                    <div className="space-y-6">
                      {/* Cash Balances */}
                      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-card-foreground mb-6">Cash Balances</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* CAD Balances */}
                          <div className="bg-gradient-to-r from-red-50/80 to-red-50/40 border border-red-200/60 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="h-4 w-4 text-red-600" />
                              </div>
                              <h4 className="font-semibold text-card-foreground">Canadian Dollars (CAD)</h4>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Cash Available CAD</span>
                                <span className="font-semibold text-card-foreground">{formatCurrency(client.settledTrustCAD || 0)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Cash Used For Trades CAD</span>
                                <span className="font-semibold text-card-foreground">$0.00</span>
                              </div>
                              <div className="flex justify-between items-center border-t border-red-200/60 pt-3">
                                <span className="text-sm font-medium text-gray-700">Cash Total CAD</span>
                                <span className="text-lg font-bold text-red-600">{formatCurrency(client.settledTrustCAD || 0)}</span>
                              </div>
                            </div>
                          </div>

                          {/* USD Balances */}
                          <div className="bg-gradient-to-r from-green-50/80 to-green-50/40 border border-green-200/60 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="h-4 w-4 text-green-600" />
                              </div>
                              <h4 className="font-semibold text-card-foreground">United States Dollars (USD)</h4>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Cash Available USD</span>
                                <span className="font-semibold text-card-foreground">{formatCurrency(client.settledTrustUSD || 0)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Cash Used For Trades USD</span>
                                <span className="font-semibold text-card-foreground">$0.00</span>
                              </div>
                              <div className="flex justify-between items-center border-t border-green-200/60 pt-3">
                                <span className="text-sm font-medium text-gray-700">Cash Total USD</span>
                                <span className="text-lg font-bold text-green-600">{formatCurrency(client.settledTrustUSD || 0)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Cash Transactions */}
                      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-card-foreground mb-6">Recent Cash Transactions</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <Plus className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-card-foreground">Cash Deposit</p>
                                <p className="text-xs text-muted-foreground">2 days ago</p>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-green-600">+$1,250.00 CAD</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <ArrowLeftRight className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-card-foreground">Currency Exchange</p>
                                <p className="text-xs text-muted-foreground">1 week ago</p>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-blue-600">$500.00 USD</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="trading" className="mt-6 bg-white">
                    <div className="space-y-6">
                      {/* Trading Summary */}
                      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-card-foreground mb-6">Trading Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="bg-gradient-to-r from-blue-50/80 to-blue-50/40 border border-blue-200/60 rounded-lg p-4">
                            <div className="text-sm text-blue-700 font-medium">Total Trades</div>
                            <div className="text-2xl font-bold text-blue-900">{client.totalTrades || 12}</div>
                          </div>
                          <div className="bg-gradient-to-r from-green-50/80 to-green-50/40 border border-green-200/60 rounded-lg p-4">
                            <div className="text-sm text-green-700 font-medium">Buy Orders</div>
                            <div className="text-2xl font-bold text-green-900">8</div>
                          </div>
                          <div className="bg-gradient-to-r from-red-50/80 to-red-50/40 border border-red-200/60 rounded-lg p-4">
                            <div className="text-sm text-red-700 font-medium">Sell Orders</div>
                            <div className="text-2xl font-bold text-red-900">4</div>
                          </div>
                          <div className="bg-gradient-to-r from-purple-50/80 to-purple-50/40 border border-purple-200/60 rounded-lg p-4">
                            <div className="text-sm text-purple-700 font-medium">Pending</div>
                            <div className="text-2xl font-bold text-purple-900">2</div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Trading Activity */}
                      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-card-foreground mb-6">Recent Trading Activity</h3>
                        <div className="overflow-hidden rounded-lg border border-gray-200/60">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gradient-to-r from-gray-50/80 to-gray-50/40 border-b border-gray-200/60">
                                <TableHead className="font-semibold text-gray-700 py-4">Date</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">Type</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">Security</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">Quantity</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">Price</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow className="hover:bg-gray-50/30 transition-colors duration-200 border-b border-gray-100/60">
                                <TableCell className="py-4 text-sm text-muted-foreground">02/12/2025</TableCell>
                                <TableCell className="py-4">
                                  <Badge className="bg-green-100 text-green-800">Buy</Badge>
                                </TableCell>
                                <TableCell className="py-4">
                                  <div className="max-w-xs">
                                    <div className="text-sm font-medium text-card-foreground">FIDELITY NORTHSTAR FUND</div>
                                    <div className="text-xs text-muted-foreground">Series B ISC</div>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-card-foreground">100</TableCell>
                                <TableCell className="py-4 text-sm text-card-foreground">$117.35</TableCell>
                                <TableCell className="py-4">
                                  <Badge className="bg-green-100 text-green-800">Executed</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/30 transition-colors duration-200 border-b border-gray-100/60">
                                <TableCell className="py-4 text-sm text-muted-foreground">02/10/2025</TableCell>
                                <TableCell className="py-4">
                                  <Badge className="bg-red-100 text-red-800">Sell</Badge>
                                </TableCell>
                                <TableCell className="py-4">
                                  <div className="max-w-xs">
                                    <div className="text-sm font-medium text-card-foreground">FIDELITY MONTHLY INCOME FUND</div>
                                    <div className="text-xs text-muted-foreground">Series B ISC</div>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-card-foreground">50</TableCell>
                                <TableCell className="py-4 text-sm text-card-foreground">$605.31</TableCell>
                                <TableCell className="py-4">
                                  <Badge className="bg-green-100 text-green-800">Executed</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/30 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-muted-foreground">02/08/2025</TableCell>
                                <TableCell className="py-4">
                                  <Badge className="bg-blue-100 text-blue-800">Buy</Badge>
                                </TableCell>
                                <TableCell className="py-4">
                                  <div className="max-w-xs">
                                    <div className="text-sm font-medium text-card-foreground">TD CANADIAN EQUITY FUND</div>
                                    <div className="text-xs text-muted-foreground">Series A</div>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-card-foreground">75</TableCell>
                                <TableCell className="py-4 text-sm text-card-foreground">$339.34</TableCell>
                                <TableCell className="py-4">
                                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="mt-6 bg-white">
                    <div className="space-y-6">
                      {/* Product Documents Header */}
                      <div className="bg-gradient-to-r from-blue-50/80 to-blue-50/40 border border-blue-200/60 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                          <ChevronDown className="h-5 w-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-card-foreground">Product Documents for Active Products</h3>
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                        </div>
                      </div>

                      {/* Product Documents Table */}
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="overflow-hidden rounded-lg">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gradient-to-r from-blue-50/80 to-blue-50/40 border-b border-gray-200/60">
                                <TableHead className="font-semibold text-gray-700 py-4 w-12">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                </TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">Product</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">Document Type</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">Delivery Type</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">Delivery Date</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4 w-12"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow className="hover:bg-blue-50/30 transition-colors duration-200 border-b border-gray-100/60">
                                <TableCell className="py-4">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                </TableCell>
                                <TableCell className="py-4">
                                  <div className="max-w-xs">
                                    <div className="text-sm font-medium text-card-foreground">FID-225 FIDELITY TRUE NORTH FUND</div>
                                    <div className="text-xs text-muted-foreground">SERIES B ISC</div>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4">
                                  <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                                    <option>Fund Facts</option>
                                  </select>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-muted-foreground">Downloaded</TableCell>
                                <TableCell className="py-4 text-sm text-muted-foreground">02-12-2025 02:02 PM</TableCell>
                                <TableCell className="py-4">
                                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-blue-50/30 transition-colors duration-200 border-b border-gray-100/60">
                                <TableCell className="py-4">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                </TableCell>
                                <TableCell className="py-4">
                                  <div className="max-w-xs">
                                    <div className="text-sm font-medium text-card-foreground">FID-234 FIDELITY U.S. FOCUSED STOCK FUND</div>
                                    <div className="text-xs text-muted-foreground">SERIES B ISC</div>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4">
                                  <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                                    <option>Fund Facts</option>
                                  </select>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-muted-foreground">Downloaded</TableCell>
                                <TableCell className="py-4 text-sm text-muted-foreground">02-12-2025 02:02 PM</TableCell>
                                <TableCell className="py-4">
                                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-blue-50/30 transition-colors duration-200 border-b border-gray-100/60">
                                <TableCell className="py-4">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                </TableCell>
                                <TableCell className="py-4">
                                  <div className="max-w-xs">
                                    <div className="text-sm font-medium text-card-foreground">FID-253 FIDELITY NORTHSTAR FUND</div>
                                    <div className="text-xs text-muted-foreground">SERIES B ISC</div>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4">
                                  <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                                    <option>Fund Facts</option>
                                  </select>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-muted-foreground">Downloaded</TableCell>
                                <TableCell className="py-4 text-sm text-muted-foreground">02-12-2025 02:02 PM</TableCell>
                                <TableCell className="py-4">
                                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-blue-50/30 transition-colors duration-200">
                                <TableCell className="py-4">
                                  <input type="checkbox" className="rounded border-gray-300" />
                                </TableCell>
                                <TableCell className="py-4">
                                  <div className="max-w-xs">
                                    <div className="text-sm font-medium text-card-foreground">FID-269 FIDELITY MONTHLY INCOME FUND</div>
                                    <div className="text-xs text-muted-foreground">SERIES B ISC</div>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4">
                                  <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                                    <option>Fund Facts</option>
                                  </select>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-muted-foreground">Downloaded</TableCell>
                                <TableCell className="py-4 text-sm text-muted-foreground">02-12-2025 02:02 PM</TableCell>
                                <TableCell className="py-4">
                                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>

                      {/* Deliver Section */}
                      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center gap-6">
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                            Deliver
                          </Button>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="en" className="rounded border-gray-300" defaultChecked />
                              <label htmlFor="en" className="text-sm text-gray-700">EN</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="fr" className="rounded border-gray-300" />
                              <label htmlFor="fr" className="text-sm text-gray-700">FR</label>
                            </div>
                          </div>
                          <select className="text-sm border border-gray-300 rounded px-3 py-2 bg-white">
                            <option>Select Delivery Method</option>
                            <option>Email</option>
                            <option>Mail</option>
                            <option>Download</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans" className="flex-1 p-6 bg-white">
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Investment Plans</h3>
                <div className="flex gap-6">
                  {/* Left Sidebar */}
                  <div className="w-80 space-y-6">
                    {/* Client Plans Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-card-foreground">Client Plans</h3>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Add New Plan
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <input type="checkbox" id="include-inactive-plans" className="rounded border-gray-300" />
                        <label htmlFor="include-inactive-plans" className="text-sm text-gray-700">Include Inactive Plans</label>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                          <div className="text-sm font-medium text-card-foreground">3238677748 (RESP Family Client Name, Individual)</div>
                          <div className="text-xs text-muted-foreground mt-1">Education Savings Family</div>
                          <div className="text-sm font-semibold text-blue-600 mt-1">$42,000.12</div>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="text-sm font-medium text-card-foreground">4761482531 (RRSP Client Name, Individual)</div>
                          <div className="text-xs text-muted-foreground mt-1">rrsp - pac</div>
                          <div className="text-sm font-semibold text-muted-foreground mt-1">$82,726.28</div>
                        </div>
                      </div>
                    </div>

                    {/* Fund Accounts Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-4">
                          <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-1">Fund Accounts</button>
                          <button className="text-sm font-medium text-muted-foreground hover:text-gray-700">GICs</button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <input type="checkbox" id="include-inactive-accounts" className="rounded border-gray-300" />
                        <label htmlFor="include-inactive-accounts" className="text-sm text-gray-700">Include Inactive Accounts</label>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-card-foreground">FID-253 3448232822 (M)</div>
                              <div className="text-xs text-muted-foreground">FIDELITY NORTHSTAR FUND SERIES B ISC FEL CAD</div>
                              <div className="text-sm font-semibold text-muted-foreground mt-1">$11,734.85 CAD</div>
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-4 h-4 bg-gray-300 rounded"></div>
                              <div className="w-4 h-4 bg-blue-300 rounded"></div>
                              <div className="w-4 h-4 bg-green-300 rounded"></div>
                              <div className="w-4 h-4 bg-yellow-300 rounded"></div>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-card-foreground">FID-269 6503857600 (LM)</div>
                              <div className="text-xs text-muted-foreground">FIDELITY MONTHLY INCOME FUND SERIES B ISC FEL CAD</div>
                              <div className="text-sm font-semibold text-muted-foreground mt-1">$30,265.27 CAD</div>
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-4 h-4 bg-gray-300 rounded"></div>
                              <div className="w-4 h-4 bg-blue-300 rounded"></div>
                              <div className="w-4 h-4 bg-green-300 rounded"></div>
                              <div className="w-4 h-4 bg-yellow-300 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Transactions Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-card-foreground mb-4">Transactions</h3>
                      <div className="text-center py-8">
                        <div className="text-sm text-muted-foreground">Please select a fund account above.</div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1">
                    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                      {/* Sub Navigation */}
                      <div className="flex space-x-6 mb-6 border-b border-gray-200">
                        <button 
                          onClick={() => setActivePlanTab('details')}
                          className={`text-sm font-medium pb-2 ${
                            activePlanTab === 'details' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          Details
                        </button>
                        <button 
                          onClick={() => setActivePlanTab('kyc')}
                          className={`text-sm font-medium pb-2 ${
                            activePlanTab === 'kyc' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          KYC
                        </button>
                        <button 
                          onClick={() => setActivePlanTab('beneficiaries')}
                          className={`text-sm font-medium pb-2 ${
                            activePlanTab === 'beneficiaries' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          Beneficiaries
                        </button>
                        <button 
                          onClick={() => setActivePlanTab('actions')}
                          className={`text-sm font-medium pb-2 ${
                            activePlanTab === 'actions' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          Trading
                        </button>
                        <button 
                          onClick={() => setActivePlanTab('trust')}
                          className={`text-sm font-medium pb-2 ${
                            activePlanTab === 'trust' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          Trust Account
                        </button>
                        <button 
                          onClick={() => setActivePlanTab('reviews')}
                          className={`text-sm font-medium pb-2 ${
                            activePlanTab === 'reviews' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          Reviews
                        </button>
                      </div>

                      {/* Inner Tabs */}
                      <div className="flex space-x-6 mb-8">
                        <button 
                          onClick={() => setActivePlanTab('details')}
                          className={`text-sm font-medium pb-2 ${
                            activePlanTab === 'details' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          Details
                        </button>
                        <button 
                          onClick={() => setActivePlanTab('notes')}
                          className={`text-sm font-medium pb-2 ${
                            activePlanTab === 'notes' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          Notes
                        </button>
                        <button 
                          onClick={() => setActivePlanTab('attachments')}
                          className={`text-sm font-medium pb-2 ${
                            activePlanTab === 'attachments' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          Plan Attachments
                        </button>
                        <button 
                          onClick={() => setActivePlanTab('allocations')}
                          className={`text-sm font-medium pb-2 ${
                            activePlanTab === 'allocations' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          Allocations
                        </button>
                        <button 
                          onClick={() => setActivePlanTab('supplier')}
                          className={`text-sm font-medium pb-2 ${
                            activePlanTab === 'supplier' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          Supplier Accounts
                        </button>
                        <button 
                          onClick={() => setActivePlanTab('compensation')}
                          className={`text-sm font-medium pb-2 ${
                            activePlanTab === 'compensation' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          Custom Compensation
                        </button>
                      </div>

                      {/* Content based on active tab */}
                      {activePlanTab === 'details' && (
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-lg font-semibold text-card-foreground mb-4">Plan Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                                  <input type="text" defaultValue="3238677748" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    <option>RESP Family</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Designation</label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    <option>Client Name</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Representative</label>
                                  <input type="text" defaultValue="9823-2232 Marsh, Antoine" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                  <input type="text" defaultValue="Education Savings Family" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Intent Of Use</label>
                                  <input type="text" defaultValue="Education Savings" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="frozen" className="rounded border-gray-300" />
                                  <label htmlFor="frozen" className="text-sm text-gray-700">Frozen</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="locked" className="rounded border-gray-300" />
                                  <label htmlFor="locked" className="text-sm text-gray-700">Locked</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input type="checkbox" id="closed" className="rounded border-gray-300" />
                                  <label htmlFor="closed" className="text-sm text-gray-700">Closed</label>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Status</label>
                                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                                    <option>Active</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Opened Date</label>
                                  <input type="text" defaultValue="01/15/2020" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Value</label>
                                  <input type="text" defaultValue="$42,000.12" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePlanTab === 'supplier' && (
                        <div className="space-y-6">
                          {/* Include Inactive Checkbox */}
                          <div className="flex items-center space-x-2 mb-4">
                            <input type="checkbox" id="include-inactive-supplier" className="rounded border-gray-300" />
                            <label htmlFor="include-inactive-supplier" className="text-sm text-gray-700">Include Inactive</label>
                          </div>

                          {/* Supplier Accounts Table */}
                          <div className="rounded-lg border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-gray-50/80">
                                    <TableHead className="font-semibold">Supplier</TableHead>
                                    <TableHead className="font-semibold">Account Number</TableHead>
                                    <TableHead className="font-semibold">Start Date</TableHead>
                                    <TableHead className="font-semibold">End Date</TableHead>
                                    <TableHead className="font-semibold text-right">Market Value</TableHead>
                                    <TableHead className="font-semibold">Status</TableHead>
                                    <TableHead className="font-semibold">Account Type</TableHead>
                                    <TableHead className="font-semibold">Trading</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow className="hover:bg-blue-50/50 transition-all duration-200">
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                          <Building2 className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <span className="font-medium text-card-foreground">FID</span>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <span className="font-mono text-sm text-gray-700">59592949</span>
                                    </TableCell>
                                    <TableCell>
                                      <span className="text-sm text-gray-700">11/18/2014</span>
                                    </TableCell>
                                    <TableCell>
                                      <span className="text-sm text-gray-700">-</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <span className="font-semibold text-muted-foreground">$0.00</span>
                                    </TableCell>
                                    <TableCell>
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                                    </TableCell>
                                    <TableCell>
                                      <span className="text-sm text-gray-700">Investment Account</span>
                                    </TableCell>
                                    <TableCell>
                                      <Button size="sm" variant="outline">View</Button>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePlanTab === 'compensation' && (
                        <div className="space-y-6">
                          <CustomCompensation clientId={clientId} />
                        </div>
                      )}

                      {activePlanTab === 'kyc' && (
                        <div className="space-y-6">
                          <KYC clientId={clientId} />
                        </div>
                      )}

                      {activePlanTab === 'beneficiaries' && (
                        <div className="space-y-6">
                          <div className="bg-white rounded-xl border border-gray-200/60 p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                              <h2 className="text-xl font-semibold text-card-foreground">Plan Beneficiaries</h2>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                                Add Beneficiary
                              </Button>
                            </div>
                            
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold text-gray-700 py-4">Name</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4">Relationship</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4">Birth Date</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4">Allocation %</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4">Status</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4">Trading</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow className="hover:bg-gray-50 transition-colors">
                                    <TableCell className="py-4">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                          <User className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                          <div className="text-sm font-medium text-card-foreground">Emma Thompson</div>
                                          <div className="text-xs text-muted-foreground">Daughter</div>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-muted-foreground">Child</TableCell>
                                    <TableCell className="py-4 text-sm text-muted-foreground">03/15/2010</TableCell>
                                    <TableCell className="py-4">
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">50%</span>
                                    </TableCell>
                                    <TableCell className="py-4">
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                                    </TableCell>
                                    <TableCell className="py-4">
                                      <div className="flex gap-2">
                                        <Button size="sm" variant="outline">Edit</Button>
                                        <Button size="sm" variant="outline">Remove</Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="hover:bg-gray-50 transition-colors">
                                    <TableCell className="py-4">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                          <User className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                          <div className="text-sm font-medium text-card-foreground">James Thompson</div>
                                          <div className="text-xs text-muted-foreground">Son</div>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-muted-foreground">Child</TableCell>
                                    <TableCell className="py-4 text-sm text-muted-foreground">07/22/2012</TableCell>
                                    <TableCell className="py-4">
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">50%</span>
                                    </TableCell>
                                    <TableCell className="py-4">
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                                    </TableCell>
                                    <TableCell className="py-4">
                                      <div className="flex gap-2">
                                        <Button size="sm" variant="outline">Edit</Button>
                                        <Button size="sm" variant="outline">Remove</Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>

                            <div className="mt-6 bg-blue-50 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Shield className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-blue-900 mb-1">Contingent Beneficiaries</h4>
                                  <p className="text-sm text-blue-700">If primary beneficiaries are not available, the plan will transfer to contingent beneficiaries according to your wishes.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePlanTab === 'actions' && (
                        <div className="space-y-6">
                          <div className="bg-white rounded-xl border border-gray-200/60 p-8 shadow-sm">
                            <h2 className="text-xl font-semibold text-card-foreground mb-6">Plan Actions</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {/* Plan Management Actions */}
                              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <Target className="h-5 w-5 text-white" />
                                  </div>
                                  <h3 className="text-lg font-semibold text-card-foreground">Plan Management</h3>
                                </div>
                                <div className="space-y-3">
                                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-200">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Modify Plan Details
                                  </Button>
                                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-200">
                                    <PauseCircle className="h-4 w-4 mr-2" />
                                    Suspend Plan
                                  </Button>
                                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-200">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Reactivate Plan
                                  </Button>
                                </div>
                              </div>

                              {/* Investment Actions */}
                              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-white" />
                                  </div>
                                  <h3 className="text-lg font-semibold text-card-foreground">Investments</h3>
                                </div>
                                <div className="space-y-3">
                                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-200">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Investment
                                  </Button>
                                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-200">
                                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                                    Rebalance Portfolio
                                  </Button>
                                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-200">
                                    <DollarSign className="h-4 w-4 mr-2" />
                                    Adjust Contributions
                                  </Button>
                                </div>
                              </div>

                              {/* Administrative Actions */}
                              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-white" />
                                  </div>
                                  <h3 className="text-lg font-semibold text-card-foreground">Administrative</h3>
                                </div>
                                <div className="space-y-3">
                                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-200">
                                    <Download className="h-4 w-4 mr-2" />
                                    Generate Statement
                                  </Button>
                                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-200">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Send Notification
                                  </Button>
                                  <Button className="w-full justify-start bg-white hover:bg-gray-50 text-gray-700 border border-gray-200">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Schedule Review
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Recent Actions */}
                            <div className="mt-8">
                              <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Actions</h3>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <Plus className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-card-foreground">Plan contribution increased</p>
                                      <p className="text-xs text-muted-foreground">2 days ago</p>
                                    </div>
                                  </div>
                                  <span className="text-sm font-semibold text-green-600">+$500.00</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                      <ArrowLeftRight className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-card-foreground">Portfolio rebalanced</p>
                                      <p className="text-xs text-muted-foreground">1 week ago</p>
                                    </div>
                                  </div>
                                  <span className="text-sm font-semibold text-blue-600">Completed</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePlanTab === 'trust' && (
                        <div className="space-y-6">
                          <div className="bg-white rounded-xl border border-gray-200/60 p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                              <h2 className="text-xl font-semibold text-card-foreground">Trust Account Details</h2>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                                Manage Trust
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {/* Trust Account Information */}
                              <div className="space-y-6">
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Account Information</h3>
                                  <div className="space-y-4">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Trust Account Number</span>
                                      <span className="font-semibold text-card-foreground">TR-3238677748</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Account Type</span>
                                      <span className="font-semibold text-card-foreground">Educational Trust</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Trustee</span>
                                      <span className="font-semibold text-card-foreground">Antoine Marsh</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Status</span>
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Trust Balances */}
                                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Trust Balances</h3>
                                  <div className="space-y-4">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Principal Amount</span>
                                      <span className="font-semibold text-card-foreground">$38,500.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Accumulated Interest</span>
                                      <span className="font-semibold text-green-600">+$3,500.12</span>
                                    </div>
                                    <div className="flex justify-between border-t border-green-200 pt-3">
                                      <span className="text-sm font-medium text-gray-700">Total Trust Value</span>
                                      <span className="text-lg font-bold text-green-600">$42,000.12</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Trust Activities */}
                              <div className="space-y-6">
                                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Recent Activities</h3>
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Plus className="h-4 w-4 text-green-600" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm font-medium text-card-foreground">Monthly Contribution</p>
                                        <p className="text-xs text-muted-foreground">$500.00 - 02/01/2025</p>
                                      </div>
                                      <span className="text-sm font-semibold text-green-600">+$500.00</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="h-4 w-4 text-blue-600" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm font-medium text-card-foreground">Interest Accrual</p>
                                        <p className="text-xs text-muted-foreground">Monthly - 01/31/2025</p>
                                      </div>
                                      <span className="text-sm font-semibold text-blue-600">+$125.45</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Shield className="h-4 w-4 text-purple-600" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm font-medium text-card-foreground">Trust Review</p>
                                        <p className="text-xs text-muted-foreground">Annual Review - 01/15/2025</p>
                                      </div>
                                      <span className="text-sm font-semibold text-purple-600">Completed</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Trust Rules */}
                                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Trust Rules</h3>
                                  <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <p className="text-sm text-gray-700">Funds can only be withdrawn for educational purposes</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <p className="text-sm text-gray-700">Maximum withdrawal per beneficiary per year: $25,000</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <p className="text-sm text-gray-700">Trust expires when youngest beneficiary turns 35</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Trust Documents */}
                            <div className="mt-8">
                              <h3 className="text-lg font-semibold text-card-foreground mb-4">Trust Documents</h3>
                              <div className="overflow-hidden rounded-lg border border-gray-200">
                                <Table>
                                  <TableHeader>
                                    <TableRow className="bg-gray-50">
                                      <TableHead className="font-semibold text-gray-700 py-4">Document Type</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4">Date Created</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4">Status</TableHead>
                                      <TableHead className="font-semibold text-gray-700 py-4">Trading</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow className="hover:bg-gray-50 transition-colors">
                                      <TableCell className="py-4 text-sm text-card-foreground">Trust Agreement</TableCell>
                                      <TableCell className="py-4 text-sm text-muted-foreground">01/15/2020</TableCell>
                                      <TableCell className="py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                                      </TableCell>
                                      <TableCell className="py-4">
                                        <div className="flex gap-2">
                                          <Button size="sm" variant="outline">View</Button>
                                          <Button size="sm" variant="outline">Download</Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                    <TableRow className="hover:bg-gray-50 transition-colors">
                                      <TableCell className="py-4 text-sm text-card-foreground">Amendment #1</TableCell>
                                      <TableCell className="py-4 text-sm text-muted-foreground">03/22/2023</TableCell>
                                      <TableCell className="py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                                      </TableCell>
                                      <TableCell className="py-4">
                                        <div className="flex gap-2">
                                          <Button size="sm" variant="outline">View</Button>
                                          <Button size="sm" variant="outline">Download</Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePlanTab === 'notes' && (
                        <div className="space-y-6">
                          <div className="bg-white rounded-xl border border-gray-200/60 p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                              <h2 className="text-xl font-semibold text-card-foreground">Plan Notes</h2>
                              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                                New Plan Note
                              </Button>
                            </div>
                            <div className="text-center py-8">
                              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                              <h4 className="text-lg font-medium text-card-foreground mb-2">No Notes</h4>
                              <p className="text-muted-foreground">Plan-specific notes and comments will be displayed here.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePlanTab === 'attachments' && (
                        <div className="space-y-6">
                          <div className="bg-white rounded-xl border border-gray-200/60 p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-card-foreground mb-4">Pinned Documents</h3>
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-gray-50">
                                    <TableHead className="font-semibold text-gray-700 py-4">Document Type</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4">On File</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4">Date Received</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4">Trading</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow className="hover:bg-gray-50 transition-colors">
                                    <TableCell className="py-4 text-sm text-card-foreground">Application Form</TableCell>
                                    <TableCell className="py-4">
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-muted-foreground">01/15/2020</TableCell>
                                    <TableCell className="py-4">
                                      <Button size="sm" variant="outline">View</Button>
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePlanTab === 'allocations' && (
                        <div className="space-y-6">
                          {/* Allocations Sub-tabs */}
                          <div className="flex space-x-6 border-b border-gray-200">
                            <button 
                              onClick={() => setActiveAllocationTab('chart')}
                              className={`text-sm font-medium pb-2 ${
                                activeAllocationTab === 'chart' 
                                  ? 'text-blue-600 border-b-2 border-blue-600' 
                                  : 'text-muted-foreground hover:text-gray-700'
                              }`}
                            >
                              Chart
                            </button>
                            <button 
                              onClick={() => setActiveAllocationTab('table')}
                              className={`text-sm font-medium pb-2 ${
                                activeAllocationTab === 'table' 
                                  ? 'text-blue-600 border-b-2 border-blue-600' 
                                  : 'text-muted-foreground hover:text-gray-700'
                              }`}
                            >
                              Table
                            </button>
                          </div>

                          {activeAllocationTab === 'chart' && (
                            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8">
                              <div className="text-center">
                                <PieChart className="h-24 w-24 mx-auto mb-4 text-blue-600" />
                                <h4 className="text-lg font-semibold text-card-foreground mb-2">Asset Allocation Chart</h4>
                                <p className="text-muted-foreground">Visual representation of current portfolio allocation</p>
                              </div>
                            </div>
                          )}

                          {activeAllocationTab === 'table' && (
                            <div className="bg-white rounded-xl border border-gray-200/60 p-6 shadow-sm">
                              <h3 className="text-lg font-semibold text-card-foreground mb-4">Asset Allocation</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                                  <h4 className="font-semibold text-card-foreground mb-4">Current Allocation</h4>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Equities</span>
                                      <span className="font-semibold text-card-foreground">60%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Fixed Income</span>
                                      <span className="font-semibold text-card-foreground">30%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Cash</span>
                                      <span className="font-semibold text-card-foreground">10%</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                                  <h4 className="font-semibold text-card-foreground mb-4">Target Allocation</h4>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Equities</span>
                                      <span className="font-semibold text-card-foreground">65%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Fixed Income</span>
                                      <span className="font-semibold text-card-foreground">25%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">Cash</span>
                                      <span className="font-semibold text-card-foreground">10%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {activePlanTab === 'reviews' && (
                        <div className="space-y-6">
                          <div className="bg-white rounded-xl border border-gray-200/60 p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                              <h2 className="text-xl font-semibold text-card-foreground">Plan Reviews</h2>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                                Schedule Review
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {/* Review Schedule */}
                              <div className="space-y-6">
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Review Schedule</h3>
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                          <Calendar className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-card-foreground">Annual Review</p>
                                          <p className="text-xs text-muted-foreground">Due: March 15, 2025</p>
                                        </div>
                                      </div>
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                          <CheckCircle className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-card-foreground">Quarterly Review</p>
                                          <p className="text-xs text-muted-foreground">Completed: January 15, 2025</p>
                                        </div>
                                      </div>
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                          <CheckCircle className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-card-foreground">Risk Assessment</p>
                                          <p className="text-xs text-muted-foreground">Completed: October 10, 2024</p>
                                        </div>
                                      </div>
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Review Checklist */}
                                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Review Checklist</h3>
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                      <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                                      <span className="text-sm text-gray-700">Portfolio performance analysis</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                                      <span className="text-sm text-gray-700">Asset allocation review</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <input type="checkbox" className="rounded border-gray-300" />
                                      <span className="text-sm text-gray-700">Risk tolerance assessment</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <input type="checkbox" className="rounded border-gray-300" />
                                      <span className="text-sm text-gray-700">Contribution adjustments</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <input type="checkbox" className="rounded border-gray-300" />
                                      <span className="text-sm text-gray-700">Beneficiary updates</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Review History */}
                              <div className="space-y-6">
                                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Review History</h3>
                                  <div className="space-y-4">
                                    <div className="border-l-4 border-green-400 pl-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-medium text-card-foreground">Q4 2024 Review</h4>
                                        <span className="text-xs text-muted-foreground">Jan 15, 2025</span>
                                      </div>
                                      <p className="text-xs text-muted-foreground mb-2">Portfolio rebalanced, increased equity allocation by 5%</p>
                                      <div className="flex gap-2">
                                        <Button size="sm" variant="outline">View Report</Button>
                                        <Button size="sm" variant="outline">Download</Button>
                                      </div>
                                    </div>
                                    <div className="border-l-4 border-green-400 pl-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-medium text-card-foreground">Risk Assessment</h4>
                                        <span className="text-xs text-muted-foreground">Oct 10, 2024</span>
                                      </div>
                                      <p className="text-xs text-muted-foreground mb-2">Risk tolerance confirmed as moderate, no changes needed</p>
                                      <div className="flex gap-2">
                                        <Button size="sm" variant="outline">View Report</Button>
                                        <Button size="sm" variant="outline">Download</Button>
                                      </div>
                                    </div>
                                    <div className="border-l-4 border-blue-400 pl-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-medium text-card-foreground">Annual Review 2024</h4>
                                        <span className="text-xs text-muted-foreground">Mar 15, 2024</span>
                                      </div>
                                      <p className="text-xs text-muted-foreground mb-2">Comprehensive review completed, plan adjustments recommended</p>
                                      <div className="flex gap-2">
                                        <Button size="sm" variant="outline">View Report</Button>
                                        <Button size="sm" variant="outline">Download</Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Review Actions */}
                                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Review Actions</h3>
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                          <Clock className="h-4 w-4 text-orange-600" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-card-foreground">Schedule client meeting</p>
                                          <p className="text-xs text-muted-foreground">Review findings and recommendations</p>
                                        </div>
                                      </div>
                                      <Button size="sm" variant="outline">Schedule</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                          <FileText className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-card-foreground">Generate review report</p>
                                          <p className="text-xs text-muted-foreground">Create comprehensive review document</p>
                                        </div>
                                      </div>
                                      <Button size="sm" variant="outline">Generate</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                          <TrendingUp className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-card-foreground">Update investment strategy</p>
                                          <p className="text-xs text-muted-foreground">Implement review recommendations</p>
                                        </div>
                                      </div>
                                      <Button size="sm" variant="outline">Update</Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Review Metrics */}
                            <div className="mt-8">
                              <h3 className="text-lg font-semibold text-card-foreground mb-4">Review Metrics</h3>
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                                  <div className="text-sm text-blue-700 font-medium">Performance</div>
                                  <div className="text-2xl font-bold text-blue-900">+12.5%</div>
                                  <div className="text-xs text-blue-600">YTD Return</div>
                                </div>
                                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                                  <div className="text-sm text-green-700 font-medium">Risk Score</div>
                                  <div className="text-2xl font-bold text-green-900">6.2/10</div>
                                  <div className="text-xs text-green-600">Moderate Risk</div>
                                </div>
                                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                                  <div className="text-sm text-purple-700 font-medium">Diversification</div>
                                  <div className="text-2xl font-bold text-purple-900">85%</div>
                                  <div className="text-xs text-purple-600">Well Diversified</div>
                                </div>
                                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                                  <div className="text-sm text-orange-700 font-medium">Review Score</div>
                                  <div className="text-2xl font-bold text-orange-900">A-</div>
                                  <div className="text-xs text-orange-600">Above Average</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Trading Tab */}
          <TabsContent value="trading" className="flex-1 p-6 bg-white">
            <ClientTrading clientId={clientId} />
          </TabsContent>

          {/* Questionnaires Tab */}
          <TabsContent value="questionnaires" className="flex-1 p-6 bg-white">
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Questionnaires</h3>
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h4 className="text-lg font-medium text-card-foreground mb-2">Questionnaires Coming Soon</h4>
                  <p className="text-muted-foreground">Client questionnaire forms will be displayed here.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* KYC Tab */}
          <TabsContent value="kyc" className="flex-1 p-6 bg-white">
            <KYC clientId={clientId} />
          </TabsContent>

          {/* Compensation Tab */}
          <TabsContent value="compensation" className="flex-1 p-6 bg-white">
            <CustomCompensation clientId={clientId} />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="flex-1 p-6 bg-white">
            <ClientReports clientId={clientId} />
          </TabsContent>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="flex-1 p-6 bg-white">
            <ClientApprovals clientId={clientId} />
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="flex-1 p-6 bg-white">
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Client Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input type="text" defaultValue={client.firstName} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" defaultValue={client.surname} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" defaultValue={client.email} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input type="tel" defaultValue={client.phone} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                      <input type="text" defaultValue={client.clientId} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={client.status}>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                      <input type="date" defaultValue={client.joinDate} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Trades</label>
                      <input type="number" defaultValue={client.totalTrades || 0} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="flex-1 p-6 bg-white">
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-card-foreground">Client Notes</h3>
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                    Add Note
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-card-foreground">Initial Contact</span>
                      <span className="text-xs text-muted-foreground">2024-01-15</span>
                    </div>
                    <p className="text-sm text-gray-700">Initial contact made via phone. Client interested in investment planning services.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-card-foreground">KYC Completed</span>
                      <span className="text-xs text-muted-foreground">2024-01-20</span>
                    </div>
                    <p className="text-sm text-gray-700">All KYC documents received and verified. Client approved for investment services.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-card-foreground">Portfolio Review</span>
                      <span className="text-xs text-muted-foreground">2024-02-01</span>
                    </div>
                    <p className="text-sm text-gray-700">Quarterly portfolio review completed. Client satisfied with current performance.</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Charts Tab */}
          <TabsContent value="charts" className="flex-1 p-6 bg-white">
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-card-foreground mb-4">Client Charts</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8">
                    <div className="text-center">
                      <PieChart className="h-24 w-24 mx-auto mb-4 text-blue-600" />
                      <h4 className="text-lg font-semibold text-card-foreground mb-2">Portfolio Allocation</h4>
                      <p className="text-muted-foreground">Asset allocation breakdown</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-8">
                    <div className="text-center">
                      <BarChart3 className="h-24 w-24 mx-auto mb-4 text-green-600" />
                      <h4 className="text-lg font-semibold text-card-foreground mb-2">Performance Chart</h4>
                      <p className="text-muted-foreground">Historical performance data</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-8">
                    <div className="text-center">
                      <TrendingUp className="h-24 w-24 mx-auto mb-4 text-purple-600" />
                      <h4 className="text-lg font-semibold text-card-foreground mb-2">Growth Trend</h4>
                      <p className="text-muted-foreground">Portfolio growth over time</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-8">
                    <div className="text-center">
                      <Target className="h-24 w-24 mx-auto mb-4 text-orange-600" />
                      <h4 className="text-lg font-semibold text-card-foreground mb-2">Risk Analysis</h4>
                      <p className="text-muted-foreground">Risk assessment metrics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Attachments Tab */}
          <TabsContent value="attachments" className="flex-1 p-6 bg-white">
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-card-foreground">Client Attachments</h3>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                    Upload File
                  </Button>
                </div>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-700 py-4">File Name</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Type</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Upload Date</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Size</TableHead>
                        <TableHead className="font-semibold text-gray-700 py-4">Trading</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="hover:bg-gray-50 transition-colors">
                        <TableCell className="py-4 text-sm text-card-foreground">KYC_Documents.pdf</TableCell>
                        <TableCell className="py-4 text-sm text-muted-foreground">PDF</TableCell>
                        <TableCell className="py-4 text-sm text-muted-foreground">2024-01-20</TableCell>
                        <TableCell className="py-4 text-sm text-muted-foreground">2.4 MB</TableCell>
                        <TableCell className="py-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm" variant="outline">Download</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50 transition-colors">
                        <TableCell className="py-4 text-sm text-card-foreground">Investment_Agreement.pdf</TableCell>
                        <TableCell className="py-4 text-sm text-muted-foreground">PDF</TableCell>
                        <TableCell className="py-4 text-sm text-muted-foreground">2024-01-25</TableCell>
                        <TableCell className="py-4 text-sm text-muted-foreground">1.8 MB</TableCell>
                        <TableCell className="py-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm" variant="outline">Download</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-gray-50 transition-colors">
                        <TableCell className="py-4 text-sm text-card-foreground">Portfolio_Statement.xlsx</TableCell>
                        <TableCell className="py-4 text-sm text-muted-foreground">Excel</TableCell>
                        <TableCell className="py-4 text-sm text-muted-foreground">2024-02-01</TableCell>
                        <TableCell className="py-4 text-sm text-muted-foreground">856 KB</TableCell>
                        <TableCell className="py-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm" variant="outline">Download</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>

        </Tabs>
      </div>

      {/* Non Financial Change Modal */}
      <Dialog open={showNFCModal} onOpenChange={setShowNFCModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              Non Financial Change - {client?.firstName} {client?.surname}
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </DialogTitle>
            <div className="text-sm text-muted-foreground mt-2">
              Submit a non-financial change request for this client
            </div>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="changeType">Change Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select change type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="address">Address Change</SelectItem>
                    <SelectItem value="phone">Phone Number Change</SelectItem>
                    <SelectItem value="email">Email Change</SelectItem>
                    <SelectItem value="name">Name Change</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Describe the requested change..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Input
                id="notes"
                placeholder="Any additional information..."
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowNFCModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowNFCModal(false)}>
                Submit Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* NFC Submissions Modal */}
      <Dialog open={showNFCSubmissionsModal} onOpenChange={setShowNFCSubmissionsModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              NFC Submissions - {client?.firstName} {client?.surname}
            </DialogTitle>
            <div className="text-sm text-muted-foreground mt-2">
              View and manage non-financial change submissions for this client
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center py-8">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h4 className="text-lg font-medium text-card-foreground mb-2">No Submissions Found</h4>
              <p className="text-muted-foreground">This client has no NFC submissions at this time.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* NFU Messages Modal */}
      <Dialog open={showNFUMessagesModal} onOpenChange={setShowNFUMessagesModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
              NFU Messages - {client?.firstName} {client?.surname}
            </DialogTitle>
            <div className="text-sm text-muted-foreground mt-2">
              View and manage NFU messages for this client
            </div>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center py-8">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h4 className="text-lg font-medium text-card-foreground mb-2">No Messages Found</h4>
              <p className="text-muted-foreground">This client has no NFU messages at this time.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Buy Fund Modal */}
      <Dialog open={showBuyModal} onOpenChange={closeAllModals}>
        <DialogContent className="max-w-md">
          {!orderConfirmed ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-green-700">
                  <Plus className="h-5 w-5" />
                  Buy More Units
                </DialogTitle>
                <div className="text-sm text-muted-foreground mt-2">
                  Purchase additional units of {selectedFund?.product}
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="text-sm font-medium text-gray-700">Current Holdings ({selectedPlan}):</div>
                  <div className="text-sm text-gray-600">Units: {selectedFund?.units}</div>
                  <div className="text-sm text-gray-600">Avg. Cost: ${selectedFund?.avgCost}</div>
                  <div className="text-sm text-gray-600">Market Value: ${selectedFund?.marketValue?.toLocaleString()}</div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Investment Amount ($)</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount to invest"
                      value={buyAmount}
                      onChange={(e) => {
                        setBuyAmount(e.target.value)
                        setBuyUnits(calculateBuyUnits(e.target.value))
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Or Number of Units</Label>
                    <Input
                      type="number"
                      placeholder="Enter number of units"
                      value={buyUnits}
                      onChange={(e) => {
                        setBuyUnits(e.target.value)
                        setBuyAmount(calculateBuyAmount(e.target.value))
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-blue-700">
                      Estimated Cost: ${(buyAmount || calculateBuyAmount(buyUnits) || '0')}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      Units to purchase: {buyUnits || calculateBuyUnits(buyAmount) || '0'}
                    </div>
                    <div className="text-xs text-blue-600">Based on avg. cost ${selectedFund?.avgCost}</div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={closeAllModals} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handlePlaceOrder('buy')}
                    disabled={!buyAmount && !buyUnits}
                  >
                    Place Buy Order
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-green-700">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Order Confirmed
                </DialogTitle>
                <div className="text-sm text-muted-foreground mt-2">
                  Your buy order has been placed successfully
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-green-800">Order Details:</div>
                    <div className="text-sm text-green-700">Order ID: {orderDetails?.orderId}</div>
                    <div className="text-sm text-green-700">Fund: {orderDetails?.fund?.product}</div>
                    <div className="text-sm text-green-700">Plan: {orderDetails?.plan}</div>
                    <div className="text-sm text-green-700">Units: {orderDetails?.units}</div>
                    <div className="text-sm text-green-700">Amount: ${orderDetails?.amount}</div>
                    <div className="text-sm text-green-700">Time: {orderDetails?.timestamp}</div>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-700">Processing Status: Pending</div>
                  <div className="text-xs text-blue-600 mt-1">
                    Order will be processed at next market close
                  </div>
                </div>
                <Button onClick={closeAllModals} className="w-full bg-green-600 hover:bg-green-700">
                  Done
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Sell Fund Modal */}
      <Dialog open={showSellModal} onOpenChange={closeAllModals}>
        <DialogContent className="max-w-md">
          {!orderConfirmed ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-red-700">
                  <Minus className="h-5 w-5" />
                  Sell Units
                </DialogTitle>
                <div className="text-sm text-muted-foreground mt-2">
                  Sell units of {selectedFund?.product}
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="text-sm font-medium text-gray-700">Current Holdings ({selectedPlan}):</div>
                  <div className="text-sm text-gray-600">Units Available: {selectedFund?.units}</div>
                  <div className="text-sm text-gray-600">Avg. Cost: ${selectedFund?.avgCost}</div>
                  <div className="text-sm text-gray-600">Market Value: ${selectedFund?.marketValue?.toLocaleString()}</div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Number of Units to Sell</Label>
                    <Input
                      type="number"
                      placeholder={`Max: ${selectedFund?.units}`}
                      value={sellUnits}
                      onChange={(e) => {
                        const units = Math.min(parseFloat(e.target.value) || 0, selectedFund?.units || 0)
                        setSellUnits(units.toString())
                        setSellAmount(calculateSellAmount(units.toString()))
                      }}
                      max={selectedFund?.units}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Or Dollar Amount ($)</Label>
                    <Input
                      type="number"
                      placeholder="Enter dollar amount"
                      value={sellAmount}
                      onChange={(e) => {
                        setSellAmount(e.target.value)
                        setSellUnits(calculateSellUnits(e.target.value))
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="text-sm text-yellow-700">
                      Estimated Proceeds: ${(sellAmount || calculateSellAmount(sellUnits) || '0')}
                    </div>
                    <div className="text-xs text-yellow-600 mt-1">
                      Units to sell: {sellUnits || calculateSellUnits(sellAmount) || '0'}
                    </div>
                    <div className="text-xs text-yellow-600">Before fees and taxes • Based on avg. cost ${selectedFund?.avgCost}</div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={closeAllModals} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={() => handlePlaceOrder('sell')}
                    disabled={!sellAmount && !sellUnits}
                  >
                    Place Sell Order
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-red-700">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Order Confirmed
                </DialogTitle>
                <div className="text-sm text-muted-foreground mt-2">
                  Your sell order has been placed successfully
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-red-800">Order Details:</div>
                    <div className="text-sm text-red-700">Order ID: {orderDetails?.orderId}</div>
                    <div className="text-sm text-red-700">Fund: {orderDetails?.fund?.product}</div>
                    <div className="text-sm text-red-700">Plan: {orderDetails?.plan}</div>
                    <div className="text-sm text-red-700">Units to Sell: {orderDetails?.units}</div>
                    <div className="text-sm text-red-700">Estimated Proceeds: ${orderDetails?.amount}</div>
                    <div className="text-sm text-red-700">Time: {orderDetails?.timestamp}</div>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm text-blue-700">Processing Status: Pending</div>
                  <div className="text-xs text-blue-600 mt-1">
                    Order will be processed at next market close
                  </div>
                </div>
                <Button onClick={closeAllModals} className="w-full bg-red-600 hover:bg-red-700">
                  Done
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Switch Fund Modal */}
      <Dialog open={showSwitchModal} onOpenChange={closeAllModals}>
        <DialogContent className="max-w-lg">
          {!orderConfirmed ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-blue-700">
                  <ArrowLeftRight className="h-5 w-5" />
                  Switch Fund
                </DialogTitle>
                <div className="text-sm text-muted-foreground mt-2">
                  Switch from {selectedFund?.product} to another {selectedFund?.company} fund
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="text-sm font-medium text-gray-700">Current Fund ({selectedPlan}):</div>
                  <div className="text-sm text-gray-600">{selectedFund?.product}</div>
                  <div className="text-sm text-gray-600">Units Available: {selectedFund?.units}</div>
                  <div className="text-sm text-gray-600">Market Value: ${selectedFund?.marketValue?.toLocaleString()}</div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Select New {selectedFund?.company} Fund</Label>
                    <Select value={selectedNewFund} onValueChange={setSelectedNewFund}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose a fund to switch to" />
                      </SelectTrigger>
                      <SelectContent className="z-[9999]" position="popper">
                        {selectedFund?.company === 'Fidelity' ? (
                          <>
                            <SelectItem value="fid-northstar">Fidelity NorthStar Fund - Series B ISC</SelectItem>
                            <SelectItem value="fid-income">Fidelity Monthly Income Fund - Series B ISC</SelectItem>
                            <SelectItem value="fid-growth">Fidelity Growth Fund - Series B ISC</SelectItem>
                            <SelectItem value="fid-balanced">Fidelity Balanced Fund - Series A</SelectItem>
                            <SelectItem value="fid-conservative">Fidelity Conservative Fund - Series A</SelectItem>
                            <SelectItem value="fid-equity">Fidelity Canadian Equity Fund - Series B ISC</SelectItem>
                            <SelectItem value="fid-global">Fidelity Global Equity Fund - Series B ISC</SelectItem>
                            <SelectItem value="fid-dividend">Fidelity Canadian Dividend Fund - Series A</SelectItem>
                          </>
                        ) : selectedFund?.company === 'TD' ? (
                          <>
                            <SelectItem value="td-equity">TD Canadian Equity Fund - Series A</SelectItem>
                            <SelectItem value="td-balanced">TD Balanced Growth Fund - Series F</SelectItem>
                            <SelectItem value="td-income">TD Monthly Income Fund - Series A</SelectItem>
                            <SelectItem value="td-index">TD Canadian Index Fund - Series E</SelectItem>
                            <SelectItem value="td-bond">TD Canadian Bond Fund - Series A</SelectItem>
                            <SelectItem value="td-global">TD Global Equity Fund - Series F</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="other-equity">Canadian Equity Fund</SelectItem>
                            <SelectItem value="other-balanced">Balanced Growth Fund</SelectItem>
                            <SelectItem value="other-income">Monthly Income Fund</SelectItem>
                            <SelectItem value="other-bond">Bond Fund</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Switch Amount</Label>
                    <div className="flex gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSwitchUnits('')}
                      >
                        Partial Switch
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSwitchUnits(selectedFund?.units?.toString() || '')}
                      >
                        Full Switch
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Units to Switch</Label>
                    <Input
                      type="number"
                      placeholder={`Max: ${selectedFund?.units}`}
                      value={switchUnits}
                      onChange={(e) => {
                        const units = Math.min(parseFloat(e.target.value) || 0, selectedFund?.units || 0)
                        setSwitchUnits(units.toString())
                      }}
                      max={selectedFund?.units}
                      className="mt-1"
                    />
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-blue-700">Switch Preview:</div>
                    <div className="text-xs text-blue-600 mt-1">
                      Units to switch: {switchUnits || '0'}
                    </div>
                    <div className="text-xs text-blue-600">
                      Estimated value: ${((parseFloat(switchUnits) || 0) * (selectedFund?.avgCost || 0)).toFixed(2)}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      This will sell your current fund and buy the selected new fund
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={closeAllModals} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handlePlaceOrder('switch')}
                    disabled={!switchUnits}
                  >
                    Execute Switch
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-blue-700">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Switch Order Confirmed
                </DialogTitle>
                <div className="text-sm text-muted-foreground mt-2">
                  Your fund switch order has been placed successfully
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-blue-800">Switch Order Details:</div>
                    <div className="text-sm text-blue-700">Order ID: {orderDetails?.orderId}</div>
                    <div className="text-sm text-blue-700">From: {orderDetails?.fund?.product}</div>
                    <div className="text-sm text-blue-700">To: {orderDetails?.newFund || 'Fund selection required'}</div>
                    <div className="text-sm text-blue-700">Plan: {orderDetails?.plan}</div>
                    <div className="text-sm text-blue-700">Units to Switch: {orderDetails?.units}</div>
                    <div className="text-sm text-blue-700">Time: {orderDetails?.timestamp}</div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="text-sm text-yellow-700">Processing Status: Pending</div>
                  <div className="text-xs text-yellow-600 mt-1">
                    Switch will be processed at next market close
                  </div>
                </div>
                <Button onClick={closeAllModals} className="w-full bg-blue-600 hover:bg-blue-700">
                  Done
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}
