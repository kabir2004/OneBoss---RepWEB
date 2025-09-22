"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
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
  Shield
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Client Not Found</h3>
          <p className="text-muted-foreground mb-4">The requested client could not be found.</p>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Client Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
                  <h1 className="text-xl font-semibold text-gray-900">
                    {client.firstName} {client.surname}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Client ID: {client.clientId}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(client.status)}
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all duration-200"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Profile
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
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="summary" className="h-full">
          <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/60 shadow-sm">
            <div className="max-w-7xl mx-auto px-6">
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <TabsList className="h-14 w-full justify-start bg-transparent p-1 min-w-max">
                    <TabsTrigger 
                      value="summary" 
                      className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Summary
                    </TabsTrigger>
                    <TabsTrigger 
                      value="details" 
                      className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Details
                    </TabsTrigger>
                    <TabsTrigger 
                      value="beneficiaries" 
                      className="text-sm font-medium px-4 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-blue-200 hover:bg-gray-50 transition-all duration-200 flex-shrink-0"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Beneficiaries
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
          </div>

          <TabsContent value="summary" className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            {/* Summary Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information Card */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Contact Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Mailing Address</h4>
                    <div className="text-sm text-gray-600 bg-gray-50/50 p-3 rounded-lg">
                      {client.mailingAddress}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Phone Numbers</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span>Home: {client.homePhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span>Cell: {client.cellPhone}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Email</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <span>{client.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details Card */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Account Details</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Residential Address</h4>
                    <div className="text-sm text-gray-600 bg-gray-50/50 p-3 rounded-lg">
                      {client.residentialAddress}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Account Information</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>Preferred Language: <span className="font-medium">{client.preferredLanguage}</span></div>
                      <div>Representative: <span className="font-medium">{client.currentRepresentative}</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Summary Card */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Financial Summary</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-orange-50/50 p-4 rounded-lg border border-orange-200/50">
                    <div className="text-2xl font-bold text-orange-700">
                      {formatCurrency(client.totalCAD || 0)}
                    </div>
                    <div className="text-sm text-orange-600">Total Assets</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50/50 p-3 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">{client.totalTrades}</div>
                      <div className="text-xs text-gray-600">Total Trades</div>
                    </div>
                    <div className="bg-gray-50/50 p-3 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">{client.status.charAt(0).toUpperCase() + client.status.slice(1)}</div>
                      <div className="text-xs text-gray-600">Status</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information Tabs */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-sm">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Financial Portfolio</h3>
                </div>
                
                <Tabs defaultValue="investments" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-50/50 p-1 rounded-lg">
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

                <TabsContent value="investments" className="mt-6">
                  <div className="space-y-6">
                    {/* RESP Plan Section */}
                    <div className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                      <div 
                        className="p-6 border-b border-gray-200/60 bg-gradient-to-r from-blue-50/80 to-blue-50/40 cursor-pointer hover:from-blue-100/80 hover:to-blue-100/40 transition-all duration-200 rounded-t-xl"
                        onClick={() => togglePlan('resp')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Target className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex items-center gap-3">
                              {expandedPlans.resp ? (
                                <ChevronDown className="h-5 w-5 text-blue-600" />
                              ) : (
                                <ChevronUp className="h-5 w-5 text-blue-600" />
                              )}
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg">
                                  RESP Education Savings Plan
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  Account: 3238677748 • Family Plan • {client.currentRepresentative}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-green-100 hover:text-green-700 transition-all duration-200">
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200">
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-orange-100 hover:text-orange-700 transition-all duration-200">
                              <ArrowLeftRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
                              <MapPin className="h-4 w-4 mr-2" />
                              Location
                            </Button>
                          </div>
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
                                    <TableHead className="font-semibold text-gray-700 py-4 text-right">Market Value</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4 text-center">Actions</TableHead>
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
                                    <TableCell className="py-4 text-sm text-gray-600">3448232822</TableCell>
                                    <TableCell className="py-4">
                                      <div className="max-w-xs">
                                        <div className="text-sm font-medium text-gray-900">FIDELITY NORTHSTAR FUND</div>
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
                                    <TableCell className="py-4 text-sm text-gray-600">Speculation</TableCell>
                                    <TableCell className="py-4 text-right">
                                      <div className="text-lg font-semibold text-green-600">$11,734.85</div>
                                    </TableCell>
                                    <TableCell className="py-4 text-center">
                                      <div className="flex items-center justify-center gap-1">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 transition-all duration-200">
                                          <Plus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200">
                                          <Minus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 transition-all duration-200">
                                          <ArrowLeftRight className="h-3 w-3" />
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
                                    <TableCell className="py-4 text-sm text-gray-600">6503857600</TableCell>
                                    <TableCell className="py-4">
                                      <div className="max-w-xs">
                                        <div className="text-sm font-medium text-gray-900">FIDELITY MONTHLY INCOME FUND</div>
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
                                    <TableCell className="py-4 text-sm text-gray-600">Balanced</TableCell>
                                    <TableCell className="py-4 text-right">
                                      <div className="text-lg font-semibold text-green-600">$30,265.27</div>
                                    </TableCell>
                                    <TableCell className="py-4 text-center">
                                      <div className="flex items-center justify-center gap-1">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 transition-all duration-200">
                                          <Plus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200">
                                          <Minus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 transition-all duration-200">
                                          <ArrowLeftRight className="h-3 w-3" />
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
                              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/40">
                                <div className="text-sm text-gray-600 mb-1">Settled Trust Account Balance CAD</div>
                                <div className="text-lg font-semibold text-gray-900">$0.00</div>
                              </div>
                              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/40">
                                <div className="text-sm text-gray-600 mb-1">Settled Trust Account Balance USD</div>
                                <div className="text-lg font-semibold text-gray-900">$0.00</div>
                              </div>
                              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/40">
                                <div className="text-sm text-gray-600 mb-1">Total in CAD</div>
                                <div className="text-lg font-semibold text-green-600">$42,000.12</div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* RRSP Plan Section */}
                    <div className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                      <div 
                        className="p-6 border-b border-gray-200/60 bg-gradient-to-r from-green-50/80 to-green-50/40 cursor-pointer hover:from-green-100/80 hover:to-green-100/40 transition-all duration-200 rounded-t-xl"
                        onClick={() => togglePlan('rrsp')}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <Target className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex items-center gap-3">
                              {expandedPlans.rrsp ? (
                                <ChevronDown className="h-5 w-5 text-green-600" />
                              ) : (
                                <ChevronUp className="h-5 w-5 text-green-600" />
                              )}
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg">
                                  RRSP Retirement Savings Plan
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  Account: 4761482531 • Individual Plan • {client.currentRepresentative}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-green-100 hover:text-green-700 transition-all duration-200">
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200">
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-orange-100 hover:text-orange-700 transition-all duration-200">
                              <ArrowLeftRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-green-50 hover:border-green-200 transition-all duration-200">
                              <MapPin className="h-4 w-4 mr-2" />
                              Location
                            </Button>
                          </div>
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
                                    <TableHead className="font-semibold text-gray-700 py-4 text-right">Market Value</TableHead>
                                    <TableHead className="font-semibold text-gray-700 py-4 text-center">Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow className="hover:bg-green-50/30 transition-colors duration-200 border-b border-gray-100/60">
                                    <TableCell className="font-medium py-4">
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                                          <span className="text-xs font-bold text-green-700">F</span>
                                        </div>
                                        <span className="text-sm font-medium">FID-225</span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-gray-600">4407777217</TableCell>
                                    <TableCell className="py-4">
                                      <div className="max-w-xs">
                                        <div className="text-sm font-medium text-gray-900">FIDELITY TRUE NORTH FUND</div>
                                        <div className="text-xs text-muted-foreground">Series B ISC</div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">M</Badge>
                                        <div className="flex gap-1">
                                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          <FileText className="h-3 w-3 text-gray-400" />
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-gray-600">Growth</TableCell>
                                    <TableCell className="py-4 text-right">
                                      <div className="text-lg font-semibold text-green-600">$28,455.06</div>
                                    </TableCell>
                                    <TableCell className="py-4 text-center">
                                      <div className="flex items-center justify-center gap-1">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 transition-all duration-200">
                                          <Plus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200">
                                          <Minus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 transition-all duration-200">
                                          <ArrowLeftRight className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="hover:bg-green-50/30 transition-colors duration-200 border-b border-gray-100/60">
                                    <TableCell className="font-medium py-4">
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                                          <span className="text-xs font-bold text-green-700">F</span>
                                        </div>
                                        <span className="text-sm font-medium">FID-234</span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-gray-600">7733783022</TableCell>
                                    <TableCell className="py-4">
                                      <div className="max-w-xs">
                                        <div className="text-sm font-medium text-gray-900">FIDELITY U.S. FOCUSED STOCK FUND</div>
                                        <div className="text-xs text-muted-foreground">Series B ISC</div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">M</Badge>
                                        <div className="flex gap-1">
                                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          <FileText className="h-3 w-3 text-gray-400" />
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-gray-600">Growth</TableCell>
                                    <TableCell className="py-4 text-right">
                                      <div className="text-lg font-semibold text-green-600">$9,977.41</div>
                                    </TableCell>
                                    <TableCell className="py-4 text-center">
                                      <div className="flex items-center justify-center gap-1">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 transition-all duration-200">
                                          <Plus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200">
                                          <Minus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 transition-all duration-200">
                                          <ArrowLeftRight className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="hover:bg-green-50/30 transition-colors duration-200 border-b border-gray-100/60">
                                    <TableCell className="font-medium py-4">
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                                          <span className="text-xs font-bold text-green-700">F</span>
                                        </div>
                                        <span className="text-sm font-medium">FID-253</span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-gray-600">4687151288</TableCell>
                                    <TableCell className="py-4">
                                      <div className="max-w-xs">
                                        <div className="text-sm font-medium text-gray-900">FIDELITY NORTHSTAR FUND</div>
                                        <div className="text-xs text-muted-foreground">Series B ISC</div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">M</Badge>
                                        <div className="flex gap-1">
                                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          <FileText className="h-3 w-3 text-gray-400" />
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-gray-600">Speculation</TableCell>
                                    <TableCell className="py-4 text-right">
                                      <div className="text-lg font-semibold text-green-600">$36,833.79</div>
                                    </TableCell>
                                    <TableCell className="py-4 text-center">
                                      <div className="flex items-center justify-center gap-1">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 transition-all duration-200">
                                          <Plus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200">
                                          <Minus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 transition-all duration-200">
                                          <ArrowLeftRight className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow className="hover:bg-green-50/30 transition-colors duration-200">
                                    <TableCell className="font-medium py-4">
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                                          <span className="text-xs font-bold text-green-700">F</span>
                                        </div>
                                        <span className="text-sm font-medium">FID-265</span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-gray-600">5372678316</TableCell>
                                    <TableCell className="py-4">
                                      <div className="max-w-xs">
                                        <div className="text-sm font-medium text-gray-900">FIDELITY CANADIAN GROWTH COMPANY FUND</div>
                                        <div className="text-xs text-muted-foreground">Series B ISC</div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">MH</Badge>
                                        <div className="flex gap-1">
                                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          <FileText className="h-3 w-3 text-gray-400" />
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-sm text-gray-600">Growth</TableCell>
                                    <TableCell className="py-4 text-right">
                                      <div className="text-lg font-semibold text-green-600">$7,460.02</div>
                                    </TableCell>
                                    <TableCell className="py-4 text-center">
                                      <div className="flex items-center justify-center gap-1">
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 transition-all duration-200">
                                          <Plus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 transition-all duration-200">
                                          <Minus className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-orange-100 hover:text-orange-700 transition-all duration-200">
                                          <ArrowLeftRight className="h-3 w-3" />
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
                              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/40">
                                <div className="text-sm text-gray-600 mb-1">Settled Trust Account Balance CAD</div>
                                <div className="text-lg font-semibold text-gray-900">$0.00</div>
                              </div>
                              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/40">
                                <div className="text-sm text-gray-600 mb-1">Settled Trust Account Balance USD</div>
                                <div className="text-lg font-semibold text-gray-900">$0.00</div>
                              </div>
                              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200/40">
                                <div className="text-sm text-gray-600 mb-1">Total in CAD</div>
                                <div className="text-lg font-semibold text-green-600">$82,726.28</div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                          </div>
                </TabsContent>

                <TabsContent value="cash" className="mt-6">
                  <div className="space-y-6">
                    {/* Cash Balances */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Cash Balances</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* CAD Balances */}
                        <div className="bg-gradient-to-r from-red-50/80 to-red-50/40 border border-red-200/60 rounded-xl p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <DollarSign className="h-4 w-4 text-red-600" />
                          </div>
                            <h4 className="font-semibold text-gray-900">Canadian Dollars (CAD)</h4>
                        </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Cash Available CAD</span>
                              <span className="font-semibold text-gray-900">$0.00</span>
                        </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Cash Used For Trades CAD</span>
                              <span className="font-semibold text-gray-900">$0.00</span>
                      </div>
                            <div className="flex justify-between items-center border-t border-red-200/60 pt-3">
                              <span className="text-sm font-medium text-gray-700">Cash Total CAD</span>
                              <span className="text-lg font-bold text-red-600">$0.00</span>
                    </div>
                  </div>
                        </div>

                        {/* USD Balances */}
                        <div className="bg-gradient-to-r from-green-50/80 to-green-50/40 border border-green-200/60 rounded-xl p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                            <h4 className="font-semibold text-gray-900">United States Dollars (USD)</h4>
                      </div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Cash Available USD</span>
                              <span className="font-semibold text-gray-900">$0.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Cash Used For Trades USD</span>
                              <span className="font-semibold text-gray-900">$0.00</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-green-200/60 pt-3">
                              <span className="text-sm font-medium text-gray-700">Cash Total USD</span>
                              <span className="text-lg font-bold text-green-600">$0.00</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Trust Transactions */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Recent Trust Transactions</h3>
                      </div>
                      
                      <div className="overflow-hidden rounded-lg border border-gray-200/60">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gradient-to-r from-blue-50/80 to-blue-50/40 border-b border-gray-200/60">
                              <TableHead className="font-semibold text-gray-700 py-4">Plan</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-4">Date</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-4">Trust Account Code</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-4">Transaction Type</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-4">Status</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-4">Settled Date</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-4 text-right">Amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8">
                                <div className="text-muted-foreground">
                                  <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                  <p className="text-sm">No Trust Transactions Found</p>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="trading" className="mt-6">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-8 shadow-sm">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Trading Activity</h3>
                      <p className="text-gray-600 mb-4">Recent buy/sell transactions and trade history</p>
                      <div className="bg-gray-50/50 rounded-lg p-4 max-w-md mx-auto">
                        <div className="text-sm text-muted-foreground">Recent trading activity will be displayed here</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-6">
                  <div className="space-y-6">
                    {/* Product Documents Header */}
                    <div className="bg-gradient-to-r from-blue-50/80 to-blue-50/40 border border-blue-200/60 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-3">
                        <ChevronDown className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Product Documents for Active Products</h3>
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      </div>
                      </div>

                    {/* Product Documents Table */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-sm">
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
                                  <div className="text-sm font-medium text-gray-900">FID-225 FIDELITY TRUE NORTH FUND</div>
                                  <div className="text-xs text-muted-foreground">SERIES B ISC</div>
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                                  <option>Fund Facts</option>
                                </select>
                              </TableCell>
                              <TableCell className="py-4 text-sm text-gray-600">Downloaded</TableCell>
                              <TableCell className="py-4 text-sm text-gray-600">02-12-2025 02:02 PM</TableCell>
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
                                  <div className="text-sm font-medium text-gray-900">FID-234 FIDELITY U.S. FOCUSED STOCK FUND</div>
                                  <div className="text-xs text-muted-foreground">SERIES B ISC</div>
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                                  <option>Fund Facts</option>
                                </select>
                              </TableCell>
                              <TableCell className="py-4 text-sm text-gray-600">Downloaded</TableCell>
                              <TableCell className="py-4 text-sm text-gray-600">02-12-2025 02:02 PM</TableCell>
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
                                  <div className="text-sm font-medium text-gray-900">FID-253 FIDELITY NORTHSTAR FUND</div>
                                  <div className="text-xs text-muted-foreground">SERIES B ISC</div>
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                                  <option>Fund Facts</option>
                                </select>
                              </TableCell>
                              <TableCell className="py-4 text-sm text-gray-600">Downloaded</TableCell>
                              <TableCell className="py-4 text-sm text-gray-600">02-12-2025 02:02 PM</TableCell>
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
                                  <div className="text-sm font-medium text-gray-900">FID-265 FIDELITY CANADIAN GROWTH COMPANY FUND</div>
                                  <div className="text-xs text-muted-foreground">SERIES B ISC</div>
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                                  <option>Fund Facts</option>
                                </select>
                              </TableCell>
                              <TableCell className="py-4 text-sm text-gray-600">Downloaded</TableCell>
                              <TableCell className="py-4 text-sm text-gray-600">02-12-2025 02:02 PM</TableCell>
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
                                  <div className="text-sm font-medium text-gray-900">FID-269 FIDELITY MONTHLY INCOME FUND</div>
                                  <div className="text-xs text-muted-foreground">SERIES B ISC</div>
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                                  <option>Fund Facts</option>
                                </select>
                              </TableCell>
                              <TableCell className="py-4 text-sm text-gray-600"></TableCell>
                              <TableCell className="py-4 text-sm text-gray-600"></TableCell>
                              <TableCell className="py-4">
                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Deliver Section */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
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
                          <option>Select</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="max-w-7xl mx-auto px-6 py-8">
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                  Save Client Details
                </Button>
                <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200">
                  Cancel
                </Button>
                <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200" onClick={() => setShowNFCModal(true)}>
                  Non Financial Change
                </Button>
                <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200" onClick={() => setShowNFCSubmissionsModal(true)}>
                  View NFC Submissions
                </Button>
                <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200" onClick={() => setShowNFUMessagesModal(true)}>
                  View NFU Messages
                </Button>
                <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200">
                  Start KYP Review
                </Button>
                </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                        <input type="text" value="20431" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" readOnly />
                </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                          <option>Mrs.</option>
                          <option>Mr.</option>
                          <option>Ms.</option>
                          <option>Dr.</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                          <option>Individual</option>
                          <option>Joint</option>
                          <option>Corporate</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input type="text" defaultValue="Wendi" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                        <input type="text" defaultValue="Castillo" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alias</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                          <option>Female</option>
                          <option>Male</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                          <option>Divorced</option>
                          <option>Single</option>
                          <option>Married</option>
                          <option>Widowed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dependants</label>
                        <input type="number" defaultValue="2" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input type="text" defaultValue="04/22/1976" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                        <input type="text" value="49" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                          <option>English</option>
                          <option>French</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SIN</label>
                        <input type="text" defaultValue="998387088" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CDIC Client Identifier</label>
                        <input type="text" defaultValue="OBMEH3" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">File ID</label>
                        <input type="text" defaultValue="61985927" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Status</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                          <option>eStatements</option>
                          <option>Paper</option>
                          <option>Both</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Status Consent Date</label>
                        <input type="text" defaultValue="02/12/2025" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                          <option>Active</option>
                          <option>Inactive</option>
                          <option>Pending</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tax Code</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                          <option>ONTARIO</option>
                          <option>QUEBEC</option>
                          <option>BRITISH COLUMBIA</option>
                          <option>ALBERTA</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Citizenship</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pro Account</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                          <option>No</option>
                          <option>Yes</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">CASL Permission (consents to receive emails)</label>
                        <input type="checkbox" className="rounded border-gray-300" />
                      </div>
                    </div>
                  </div>

                  {/* Spousal Information */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">Spousal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                          <option>Mr.</option>
                          <option>Mrs.</option>
                          <option>Ms.</option>
                          <option>Dr.</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input type="text" defaultValue="Neil" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                        <input type="text" defaultValue="Castillo" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input type="text" defaultValue="06/08/1974" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SIN</label>
                        <input type="text" defaultValue="998586820" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CDIC Client Identifier</label>
                        <input type="text" defaultValue="OB2R7L8" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                        <input type="text" defaultValue="Sales Rep" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employer</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address</label>
                        <div className="space-y-2">
                          <input type="text" defaultValue="230 Meadowbrook Dr. Unit" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                          <div className="grid grid-cols-3 gap-2">
                            <input type="text" defaultValue="ANCASTER" className="px-3 py-2 border border-gray-300 rounded-md bg-white" />
                            <select className="px-3 py-2 border border-gray-300 rounded-md bg-white">
                              <option>ONTARIO</option>
                            </select>
                            <input type="text" defaultValue="HOH OHO" className="px-3 py-2 border border-gray-300 rounded-md bg-white" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                          <span className="text-sm text-gray-700">Same as residential</span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone/Email Details</label>
                        <div className="space-y-2">
                          <input type="text" defaultValue="555-555-5555" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" placeholder="Home Phone" />
                          <input type="text" defaultValue="555-555-5555" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" placeholder="Work Phone" />
                          <input type="text" defaultValue="555-555-5555" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" placeholder="Cell Phone" />
                          <input type="text" defaultValue="000-000-0000" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" placeholder="Fax" />
                          <input type="email" defaultValue="client@onebosstest.com" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" placeholder="Email" />
                          <input type="email" defaultValue="client20431@onebosstest.com" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" placeholder="Email (Secondary)" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Personal KYC Information */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">Personal KYC Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Liquid Assets</label>
                          <div className="flex gap-2">
                            <input type="text" defaultValue="$2,500.00" className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white" />
                            <input type="text" className="w-20 px-3 py-2 border border-gray-300 rounded-md bg-white" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Fixed Assets</label>
                          <div className="flex gap-2">
                            <input type="text" defaultValue="$1,000,000.00" className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white" />
                            <input type="text" className="w-20 px-3 py-2 border border-gray-300 rounded-md bg-white" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Liabilities</label>
                          <div className="flex gap-2">
                            <input type="text" defaultValue="$240,000.00" className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white" />
                            <input type="text" className="w-20 px-3 py-2 border border-gray-300 rounded-md bg-white" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                          <div className="flex gap-2">
                            <input type="text" defaultValue="$762,500.00" className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white" />
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-sm">Calculate</Button>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Personal Income</label>
                          <input type="text" defaultValue="$265,000.00" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Personal Income (range)</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                            <option>$200,000 - $999,999</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-sm text-gray-700">Income Includes Spouse</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-sm text-gray-700">Assets Includes Spouse</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Investor Knowledge</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                            <option>Fair</option>
                            <option>Good</option>
                            <option>Excellent</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Accredited Investor</label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                            <option>No</option>
                            <option>Yes</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ID Documents */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">ID Documents</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Identification Methods</label>
                        <div className="grid grid-cols-2 gap-2">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                            <span className="text-sm text-gray-700">In Person</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-sm text-gray-700">Video Conference</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-sm text-gray-700">By Agent</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-sm text-gray-700">By Affiliate</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-sm text-gray-700">By CCCSMember</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-sm text-gray-700">Independent Product</span>
                          </label>
                        </div>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm">
                        Add New ID Document
                      </Button>
                      <div className="overflow-hidden rounded-lg border border-gray-200">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="font-semibold text-gray-700 py-2">Type</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-2">ID/License Number</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-2">Description</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-2">Location</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-2">Issued Date</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-2">Expiry Date</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-2">Owner</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-2"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="py-2">Driver's License</TableCell>
                              <TableCell className="py-2">5686781842</TableCell>
                              <TableCell className="py-2"></TableCell>
                              <TableCell className="py-2">ON CA</TableCell>
                              <TableCell className="py-2">01/01/2015</TableCell>
                              <TableCell className="py-2">01/01/2025</TableCell>
                              <TableCell className="py-2">Client</TableCell>
                              <TableCell className="py-2">
                                <Button variant="outline" size="sm" className="text-xs">Edit</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-tabs for Details section */}
              <div className="mt-8">
                <Tabs defaultValue="details-sub" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 bg-gray-50/50 p-1 rounded-lg">
                    <TabsTrigger 
                      value="details-sub"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 hover:bg-white/50 transition-all duration-200"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Details
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notes-sub"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 hover:bg-white/50 transition-all duration-200"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Notes
                    </TabsTrigger>
                    <TabsTrigger 
                      value="plan-attachments-sub"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 hover:bg-white/50 transition-all duration-200"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Plan Attachments
                    </TabsTrigger>
                    <TabsTrigger 
                      value="allocations-sub"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 hover:bg-white/50 transition-all duration-200"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Allocations
                    </TabsTrigger>
                    <TabsTrigger 
                      value="custom-compensation-sub"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 hover:bg-white/50 transition-all duration-200"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Custom Compensation
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="details-sub" className="mt-6">
                    <div className="text-center py-8">
                      <div className="text-muted-foreground">Details content is shown above</div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notes-sub" className="mt-6">
                    <div className="text-center py-8">
                      <div className="text-muted-foreground">Notes content will be displayed here</div>
                    </div>
                  </TabsContent>

                  <TabsContent value="plan-attachments-sub" className="mt-6">
                    <div className="text-center py-8">
                      <div className="text-muted-foreground">Plan Attachments content will be displayed here</div>
                    </div>
                  </TabsContent>

                  <TabsContent value="allocations-sub" className="mt-6">
                    <div className="text-center py-8">
                      <div className="text-muted-foreground">Allocations content will be displayed here</div>
                    </div>
                  </TabsContent>


                  <TabsContent value="custom-compensation-sub" className="mt-6">
                    <div className="text-center py-8">
                      <div className="text-muted-foreground">Custom Compensation content will be displayed here</div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>


          <TabsContent value="beneficiaries" className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center py-12">
              <div className="text-muted-foreground">Beneficiaries content will be displayed here</div>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="max-w-7xl mx-auto px-6 py-8">
            <div className="space-y-6">

              {/* Action Buttons and Filters */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Side - Action Buttons */}
                <div className="flex flex-col gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 w-fit">
                    Add Client Note
                  </Button>
                </div>

                {/* Right Side - View Additional Notes */}
                <div className="flex-1">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">View Additional Notes</h3>
                      <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center">
                        <div className="w-2 h-0.5 bg-muted-foreground"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Column 1 */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="client-notes" defaultChecked />
                          <Label htmlFor="client-notes" className="text-sm font-medium">Client Notes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="fund-account-notes" />
                          <Label htmlFor="fund-account-notes" className="text-sm font-medium">Fund Account Notes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="plan-reviews" />
                          <Label htmlFor="plan-reviews" className="text-sm font-medium">Plan Reviews</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="gic-transaction-notes" />
                          <Label htmlFor="gic-transaction-notes" className="text-sm font-medium">GIC Transaction Notes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="etf-transaction-reviews" />
                          <Label htmlFor="etf-transaction-reviews" className="text-sm font-medium">ETF Transaction Reviews</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="account-opening-notes" />
                          <Label htmlFor="account-opening-notes" className="text-sm font-medium">Include Account Opening Notes</Label>
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="emails-sent" />
                          <Label htmlFor="emails-sent" className="text-sm font-medium">Emails Sent to Client</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="gic-notes" />
                          <Label htmlFor="gic-notes" className="text-sm font-medium">GIC Notes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="fund-transaction-notes" />
                          <Label htmlFor="fund-transaction-notes" className="text-sm font-medium">Fund Transaction Notes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="gic-transaction-reviews" />
                          <Label htmlFor="gic-transaction-reviews" className="text-sm font-medium">GIC Transaction Reviews</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="inactive-plans" />
                          <Label htmlFor="inactive-plans" className="text-sm font-medium">Include Inactive Plans and Accounts</Label>
                        </div>
                      </div>

                      {/* Column 3 */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="plan-notes" />
                          <Label htmlFor="plan-notes" className="text-sm font-medium">Plan Notes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="etf-account-notes" />
                          <Label htmlFor="etf-account-notes" className="text-sm font-medium">ETF Account Notes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="fund-transaction-reviews" />
                          <Label htmlFor="fund-transaction-reviews" className="text-sm font-medium">Fund Transaction Reviews</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="etf-transaction-notes" />
                          <Label htmlFor="etf-transaction-notes" className="text-sm font-medium">ETF Transaction Notes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="kyc-update-notes" />
                          <Label htmlFor="kyc-update-notes" className="text-sm font-medium">Include KYC Update Notes</Label>
                        </div>
                      </div>
                    </div>

                    {/* All/None Buttons */}
                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200">
                        All
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200">
                        None
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Display Area */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-8 shadow-sm">
                <div className="flex justify-end mb-6">
                  <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200">
                    Print Notes
                  </Button>
                </div>
                <div className="text-center py-12">
                  <div className="text-muted-foreground text-lg">No notes found.</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plans" className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex gap-6">
              {/* Left Sidebar */}
              <div className="w-80 space-y-6">
                {/* Client Plans Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Client Plans</h3>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Add New Plan
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox id="include-inactive-plans" />
                    <Label htmlFor="include-inactive-plans" className="text-sm">Include Inactive Plans</Label>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer">
                      <div className="text-sm font-medium text-gray-900">3238677748 (RESP Family Client Name, Individual)</div>
                      <div className="text-xs text-gray-600 mt-1">Education Savings Family</div>
                      <div className="text-sm font-semibold text-blue-600 mt-1">$42,000.12</div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="text-sm font-medium text-gray-900">4761482531 (RRSP Client Name, Individual)</div>
                      <div className="text-xs text-gray-600 mt-1">rrsp - pac</div>
                      <div className="text-sm font-semibold text-gray-600 mt-1">$82,726.28</div>
                    </div>
                  </div>
                </div>

                {/* Fund Accounts Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-4">
                      <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-1">Fund Accounts</button>
                      <button className="text-sm font-medium text-muted-foreground hover:text-gray-700">GICs</button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox id="include-inactive-accounts" />
                    <Label htmlFor="include-inactive-accounts" className="text-sm">Include Inactive Accounts</Label>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">FID-253 3448232822 (M)</div>
                          <div className="text-xs text-gray-600">FIDELITY NORTHSTAR FUND SERIES B ISC FEL CAD</div>
                          <div className="text-sm font-semibold text-gray-600 mt-1">$11,734.85 CAD</div>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-4 h-4 bg-gray-300 rounded"></div>
                          <div className="w-4 h-4 bg-blue-300 rounded"></div>
                          <div className="w-4 h-4 bg-green-300 rounded"></div>
                          <div className="w-4 h-4 bg-yellow-300 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">FID-269 6503857600 (LM)</div>
                          <div className="text-xs text-gray-600">FIDELITY MONTHLY INCOME FUND SERIES B ISC FEL CAD</div>
                          <div className="text-sm font-semibold text-gray-600 mt-1">$30,265.27 CAD</div>
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
                <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Transactions</h3>
                  <div className="text-center py-8">
                    <div className="text-sm text-muted-foreground">Please select a fund account above.</div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-8 shadow-sm">
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
                    <button className="text-sm font-medium text-muted-foreground hover:text-gray-700 pb-2">Beneficiaries</button>
                    <button className="text-sm font-medium text-muted-foreground hover:text-gray-700 pb-2">Actions</button>
                    <button className="text-sm font-medium text-muted-foreground hover:text-gray-700 pb-2">Trust Account</button>
                    <button className="text-sm font-medium text-muted-foreground hover:text-gray-700 pb-2">Reviews</button>
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

                  {/* Conditional Content Based on Active Tab */}
                  {activePlanTab === 'details' && (
                    <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="plan-id" className="text-sm font-medium text-gray-700">ID</Label>
                            <Input id="plan-id" defaultValue="3238677748" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="plan-type" className="text-sm font-medium text-gray-700">Type</Label>
                            <Select>
                              <option>RESP Family</option>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="account-designation" className="text-sm font-medium text-gray-700">Account Designation</Label>
                            <Select>
                              <option>Client Name</option>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="current-representative" className="text-sm font-medium text-gray-700">Current Representative</Label>
                            <Input id="current-representative" defaultValue="9823-2232 Marsh, Antoine" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                            <Input id="description" defaultValue="Education Savings Family" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="intent-of-use" className="text-sm font-medium text-gray-700">Intent Of Use</Label>
                            <Input id="intent-of-use" defaultValue="Education Savings" className="mt-1" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="frozen" />
                              <Label htmlFor="frozen" className="text-sm">Frozen</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="full-freeze" />
                              <Label htmlFor="full-freeze" className="text-sm">Full Freeze</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="group-account" />
                              <Label htmlFor="group-account" className="text-sm">Group Account</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="leveraged" />
                              <Label htmlFor="leveraged" className="text-sm">Leveraged</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="locked-in" />
                              <Label htmlFor="locked-in" className="text-sm">Locked In</Label>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="group-account-id" className="text-sm font-medium text-gray-700">Group Account ID</Label>
                            <Select>
                              <option></option>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="loan-number" className="text-sm font-medium text-gray-700">Loan Number</Label>
                            <Input id="loan-number" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="recipient" className="text-sm font-medium text-gray-700">Recipient</Label>
                            <Select>
                              <option>Individual</option>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="intermediary-code" className="text-sm font-medium text-gray-700">Intermediary Code</Label>
                            <Input id="intermediary-code" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="intermediary-account-code" className="text-sm font-medium text-gray-700">Intermediary Account Code</Label>
                            <Input id="intermediary-account-code" defaultValue="1204355064" className="mt-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Important Dates Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Dates</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="start-date" className="text-sm font-medium text-gray-700">Start Date</Label>
                            <div className="relative mt-1">
                              <Input id="start-date" defaultValue="10/29/2014" className="pr-10" />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Calendar className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="end-date" className="text-sm font-medium text-gray-700">End Date</Label>
                            <div className="relative mt-1">
                              <Input id="end-date" className="pr-10" />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Calendar className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="kyc-on-file-date" className="text-sm font-medium text-gray-700">KYC On File Date</Label>
                            <div className="relative mt-1">
                              <Input id="kyc-on-file-date" defaultValue="02/12/2025" className="pr-10" />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Calendar className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-gray-700">KYC Age</Label>
                            <div className="mt-1 text-sm text-gray-600">217 days Old</div>
                          </div>
                          <div>
                            <Label htmlFor="kyc-original-received-date" className="text-sm font-medium text-gray-700">KYC Original Received Date</Label>
                            <div className="relative mt-1">
                              <Input id="kyc-original-received-date" className="pr-10" />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Calendar className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Revenue Model Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Model</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="revenue-model" className="text-sm font-medium text-gray-700">Revenue Model</Label>
                          <Select>
                            <option>Commissions</option>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="fee-for-service-amount" className="text-sm font-medium text-gray-700">Fee for Service Amount</Label>
                          <Input id="fee-for-service-amount" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="fee-for-service-start-date" className="text-sm font-medium text-gray-700">Fee for Service Start Date</Label>
                          <div className="relative mt-1">
                            <Input id="fee-for-service-start-date" className="pr-10" />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <Calendar className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="fee-for-service-approved" />
                          <Label htmlFor="fee-for-service-approved" className="text-sm">Fee for Service Approved</Label>
                        </div>
                      </div>
                    </div>

                    {/* Plan Fee Settings Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Fee Settings</h3>
                      <div className="overflow-hidden rounded-lg border border-gray-200">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="font-semibold text-gray-700 py-4">Schedule Name</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-4">Setting Option</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-4">Start Date</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-4">Bank Account</TableHead>
                              <TableHead className="font-semibold text-gray-700 py-4">Override Fund</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-12">
                                <div className="text-muted-foreground">No records found.</div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Plan FFS Override Fund Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan FFS Override Fund</h3>
                      <div className="w-64">
                        <Select>
                          <option>None</option>
                        </Select>
                      </div>
                    </div>

                    {/* Additional Financial Interest Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Financial Interest</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Does anyone else have trading authorization?</Label>
                            <Select>
                              <option>No</option>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="trading-auth-name" className="text-sm font-medium text-gray-700">Name</Label>
                            <Input id="trading-auth-name" className="mt-1" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-gray-700">Does anyone else have a Financial Interest?</Label>
                            <Select>
                              <option>No</option>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="financial-interest-name" className="text-sm font-medium text-gray-700">Name</Label>
                            <Input id="financial-interest-name" className="mt-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ensemble Portfolio Details Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Ensemble Portfolio Details</h3>
                      <div className="space-y-4">
                        <div className="text-sm text-gray-600">This plan is not connected to Ensemble Portfolio</div>
                        <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200">
                          Migrate to Ensemble
                        </Button>
                        <div className="text-sm text-muted-foreground">User does not have access to Ensemble</div>
                      </div>
                    </div>

                    {/* Nominee Systematic Payment Banking Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Nominee Systematic Payment Banking</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="nominee-holder-name" className="text-sm font-medium text-gray-700">Holder Name</Label>
                            <Input id="nominee-holder-name" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="nominee-institution-id" className="text-sm font-medium text-gray-700">Institution ID</Label>
                            <Input id="nominee-institution-id" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="nominee-branch-id" className="text-sm font-medium text-gray-700">Branch ID</Label>
                            <Input id="nominee-branch-id" className="mt-1" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="nominee-bank-account" className="text-sm font-medium text-gray-700">Bank Account Number</Label>
                            <Input id="nominee-bank-account" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="nominee-currency" className="text-sm font-medium text-gray-700">Currency</Label>
                            <Input id="nominee-currency" defaultValue="CAD" className="mt-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* EFT Payment Bank Account Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">EFT Payment Bank Account</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="eft-holder-name" className="text-sm font-medium text-gray-700">Holder Name</Label>
                            <Input id="eft-holder-name" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="eft-institution-id" className="text-sm font-medium text-gray-700">Institution ID</Label>
                            <Input id="eft-institution-id" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="eft-branch-id" className="text-sm font-medium text-gray-700">Branch ID</Label>
                            <Input id="eft-branch-id" className="mt-1" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="eft-bank-account" className="text-sm font-medium text-gray-700">Bank Account Number</Label>
                            <Input id="eft-bank-account" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="eft-currency" className="text-sm font-medium text-gray-700">Currency</Label>
                            <Input id="eft-currency" defaultValue="CAD" className="mt-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Average Value Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Value</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="by-month" defaultChecked />
                            <Label htmlFor="by-month" className="text-sm">By Month</Label>
                          </div>
                          <div>
                            <Label htmlFor="month" className="text-sm font-medium text-gray-700">Month</Label>
                            <Select>
                              <option>September</option>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="year" className="text-sm font-medium text-gray-700">Year</Label>
                            <div className="relative mt-1">
                              <Input id="year" defaultValue="2025" className="pr-10" />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="start-date-avg" className="text-sm font-medium text-gray-700">Start Date</Label>
                            <div className="relative mt-1">
                              <Input id="start-date-avg" className="pr-10" />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Calendar className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="end-date-avg" className="text-sm font-medium text-gray-700">End Date</Label>
                            <div className="relative mt-1">
                              <Input id="end-date-avg" className="pr-10" />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <Calendar className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="fee-for-service-only" />
                            <Label htmlFor="fee-for-service-only" className="text-sm">Fee For Service Only</Label>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            Calculate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}

                  {/* Notes Tab Content */}
                  {activePlanTab === 'notes' && (
                    <div className="space-y-6">
                      {/* Plan Notes Section */}
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-semibold text-gray-900">Plan Notes</h2>
                          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                            New Plan Note
                          </Button>
                        </div>
                        
                        {/* Empty Notes Area */}
                        <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg p-12 text-center">
                          <div className="text-muted-foreground text-lg">No plan notes available</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Plan Attachments Tab Content */}
                  {activePlanTab === 'attachments' && (
                    <div className="space-y-6">
                      {/* Pinned Documents Section */}
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pinned Documents</h3>
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="font-semibold text-gray-700 py-4">Document Type</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">On File</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">On File Date</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4 w-20"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-900">LAF</TableCell>
                                <TableCell className="py-4">
                                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                    Yes
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-gray-600">12/31/2014</TableCell>
                                <TableCell className="py-4">
                                  <Button variant="outline" size="sm" className="text-xs">
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-900">Auto Conversion of Units</TableCell>
                                <TableCell className="py-4">
                                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                    No
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-gray-400">-</TableCell>
                                <TableCell className="py-4">
                                  <Button variant="outline" size="sm" className="text-xs" disabled>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-900">Auto Conversion of Units (Express Service / Self Serve)</TableCell>
                                <TableCell className="py-4">
                                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                    No
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-gray-400">-</TableCell>
                                <TableCell className="py-4">
                                  <Button variant="outline" size="sm" className="text-xs" disabled>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-900">Disclosure Document - Loan</TableCell>
                                <TableCell className="py-4">
                                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                    No
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-gray-400">-</TableCell>
                                <TableCell className="py-4">
                                  <Button variant="outline" size="sm" className="text-xs" disabled>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-900">Fee For Service Agreement</TableCell>
                                <TableCell className="py-4">
                                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                    No
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-gray-400">-</TableCell>
                                <TableCell className="py-4">
                                  <Button variant="outline" size="sm" className="text-xs" disabled>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-900">Joint LAF</TableCell>
                                <TableCell className="py-4">
                                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                    No
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-gray-400">-</TableCell>
                                <TableCell className="py-4">
                                  <Button variant="outline" size="sm" className="text-xs" disabled>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-900">Other for Processing (Express Service / Self Serve)</TableCell>
                                <TableCell className="py-4">
                                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                    No
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-gray-400">-</TableCell>
                                <TableCell className="py-4">
                                  <Button variant="outline" size="sm" className="text-xs" disabled>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-900">PAC/SWP form (Express Service / Self Serve)</TableCell>
                                <TableCell className="py-4">
                                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                    No
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-gray-400">-</TableCell>
                                <TableCell className="py-4">
                                  <Button variant="outline" size="sm" className="text-xs" disabled>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-900">Power of Attorney</TableCell>
                                <TableCell className="py-4">
                                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                    No
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-gray-400">-</TableCell>
                                <TableCell className="py-4">
                                  <Button variant="outline" size="sm" className="text-xs" disabled>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-900">Trading Authorization</TableCell>
                                <TableCell className="py-4">
                                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                    No
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-gray-400">-</TableCell>
                                <TableCell className="py-4">
                                  <Button variant="outline" size="sm" className="text-xs" disabled>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-900">Transfer Documents</TableCell>
                                <TableCell className="py-4">
                                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                    No
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-gray-400">-</TableCell>
                                <TableCell className="py-4">
                                  <Button variant="outline" size="sm" className="text-xs" disabled>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-900">Void Cheque</TableCell>
                                <TableCell className="py-4">
                                  <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                    No
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-4 text-sm text-gray-400">-</TableCell>
                                <TableCell className="py-4">
                                  <Button variant="outline" size="sm" className="text-xs" disabled>
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>

                      {/* Plan Attachments Actions Section */}
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Plan Attachments</h3>
                          <div className="h-1 bg-green-600 rounded flex-1"></div>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                          <div className="flex flex-wrap gap-3">
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                              Add New Attachment
                            </Button>
                            <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200">
                              Link Existing Attachment
                            </Button>
                            <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200">
                              Unlink Attachment
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="include-inactive-attachments" />
                              <Label htmlFor="include-inactive-attachments" className="text-sm">Include Inactive</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="include-funds-gics" />
                              <Label htmlFor="include-funds-gics" className="text-sm">Include attachments from Funds, GICs, Transactions, and Trust Transactions</Label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Attachments Table Section */}
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Attachments</h3>
                          <div className="h-1 bg-green-600 rounded flex-1"></div>
                        </div>
                        
                        {/* Pagination Controls - Top */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-600">1-3 of 3 records</div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" disabled>
                              <ChevronLeft className="h-4 w-4" />
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" disabled>
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm">
                              1
                            </Button>
                            <Button variant="outline" size="sm" disabled>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" disabled>
                              <ChevronRight className="h-4 w-4" />
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Select defaultValue="25">
                              <option>25</option>
                            </Select>
                            <span className="text-sm text-gray-600">Select * For All</span>
                          </div>
                        </div>

                        {/* Attachments Table */}
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-gray-50">
                                <TableHead className="font-semibold text-gray-700 py-4">
                                  <div className="flex items-center gap-1">
                                    Date Submitted
                                    <ChevronUp className="h-4 w-4 text-gray-400" />
                                  </div>
                                </TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">
                                  <div className="flex items-center gap-1">
                                    Document Type
                                    <ChevronUp className="h-4 w-4 text-gray-400" />
                                  </div>
                                </TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">
                                  <div className="flex items-center gap-1">
                                    Attachment Description
                                    <ChevronUp className="h-4 w-4 text-gray-400" />
                                  </div>
                                </TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4">Status</TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4 w-8"></TableHead>
                                <TableHead className="font-semibold text-gray-700 py-4 w-8"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-600">02/12/2025</TableCell>
                                <TableCell className="py-4 text-sm text-gray-900">KYC</TableCell>
                                <TableCell className="py-4 text-sm text-gray-600">attachment</TableCell>
                                <TableCell className="py-4">
                                  <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" className="text-xs">
                                      View
                                    </Button>
                                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                      <CheckCircle className="h-3 w-3 text-white" />
                                    </div>
                                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                                  </div>
                                </TableCell>
                                <TableCell className="py-4">
                                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                                </TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-600">07/25/2019</TableCell>
                                <TableCell className="py-4 text-sm text-gray-900">KYC</TableCell>
                                <TableCell className="py-4 text-sm text-gray-600">attachment</TableCell>
                                <TableCell className="py-4">
                                  <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" className="text-xs">
                                      View
                                    </Button>
                                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                      <CheckCircle className="h-3 w-3 text-white" />
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                                <TableCell className="py-4 text-sm text-gray-600">12/16/2016</TableCell>
                                <TableCell className="py-4 text-sm text-gray-900">LAF</TableCell>
                                <TableCell className="py-4 text-sm text-gray-600">attachment</TableCell>
                                <TableCell className="py-4">
                                  <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" className="text-xs">
                                      View
                                    </Button>
                                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                      <CheckCircle className="h-3 w-3 text-white" />
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>

                        {/* Pagination Controls - Bottom */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-sm text-gray-600">1-3 of 3 records</div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" disabled>
                              <ChevronLeft className="h-4 w-4" />
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" disabled>
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm">
                              1
                            </Button>
                            <Button variant="outline" size="sm" disabled>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" disabled>
                              <ChevronRight className="h-4 w-4" />
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Select defaultValue="25">
                              <option>25</option>
                            </Select>
                            <span className="text-sm text-gray-600">Select * For All</span>
                          </div>
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
                          Allocations (Chart)
                        </button>
                        <button 
                          onClick={() => setActiveAllocationTab('table')}
                          className={`text-sm font-medium pb-2 ${
                            activeAllocationTab === 'table' 
                              ? 'text-blue-600 border-b-2 border-blue-600' 
                              : 'text-muted-foreground hover:text-gray-700'
                          }`}
                        >
                          Allocations (Table)
                        </button>
                      </div>

                      {/* Chart View */}
                      {activeAllocationTab === 'chart' && (
                        <div className="space-y-8">
                          {/* Geographic Allocation Chart */}
                          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Geographic Allocation</h3>
                            <div className="flex items-center justify-center">
                              <div className="w-80 h-80 relative">
                                {/* Placeholder for pie chart - would use a charting library like Chart.js or Recharts in production */}
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-green-400 via-blue-400 to-pink-400 flex items-center justify-center">
                                  <div className="text-white font-semibold text-lg">Pie Chart</div>
                                </div>
                                <div className="absolute -right-4 top-0 space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                                    <span>Canada: 37.27%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-blue-400 rounded"></div>
                                    <span>United States: 33.55%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-pink-400 rounded"></div>
                                    <span>European Union: 12.23%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                                    <span>All Others: 4.81%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-muted-foreground rounded"></div>
                                    <span>Asia/Pacific Rim: 4.15%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-orange-300 rounded"></div>
                                    <span>Other: 3.13%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                                    <span>Japan: 3.09%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                                    <span>Latin America: 1.76%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Asset Allocation Chart */}
                          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Allocation</h3>
                            <div className="flex items-center justify-center">
                              <div className="w-80 h-80 relative">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 via-cyan-400 to-yellow-400 flex items-center justify-center">
                                  <div className="text-white font-semibold text-lg">Pie Chart</div>
                                </div>
                                <div className="absolute -right-4 top-0 space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                                    <span>US Equity: 25.08%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-cyan-400 rounded"></div>
                                    <span>International Equity: 22.61%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                                    <span>Canadian Equity: 20.67%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                                    <span>Domestic Bonds: 15.76%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-pink-400 rounded"></div>
                                    <span>Foreign Bonds: 10.39%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-blue-400 rounded"></div>
                                    <span>Cash and Equivalents: 3.14%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-orange-300 rounded"></div>
                                    <span>Other: 1.74%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-muted-foreground rounded"></div>
                                    <span>All Others: 0.61%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Sector Allocation Chart */}
                          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sector Allocation</h3>
                            <div className="flex items-center justify-center">
                              <div className="w-80 h-80 relative">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 via-pink-400 to-orange-400 flex items-center justify-center">
                                  <div className="text-white font-semibold text-lg">Pie Chart</div>
                                </div>
                                <div className="absolute -right-4 top-0 space-y-2">
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-blue-400 rounded"></div>
                                    <span>Fixed Income: 26.14%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-pink-400 rounded"></div>
                                    <span>All Others: 24.69%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-muted-foreground rounded"></div>
                                    <span>Technology: 12.61%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-orange-300 rounded"></div>
                                    <span>Financial Services: 10.80%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                                    <span>Consumer Goods: 10.44%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                                    <span>Consumer Services: 6.92%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                                    <span>Healthcare: 4.26%</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                                    <span>Real Estate: 4.13%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Table View */}
                      {activeAllocationTab === 'table' && (
                        <div className="space-y-8">
                          {/* Geographic Allocation Table */}
                          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Allocation</h3>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Canada</span>
                                <span className="font-semibold text-gray-700">37.27%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">European Union</span>
                                <span className="font-semibold text-gray-700">12.23%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">United States</span>
                                <span className="font-semibold text-gray-700">33.55%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Japan</span>
                                <span className="font-semibold text-gray-700">3.09%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Asia/Pacific Rim</span>
                                <span className="font-semibold text-gray-700">4.15%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Latin America</span>
                                <span className="font-semibold text-gray-700">1.76%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">All Others</span>
                                <span className="font-semibold text-gray-700">4.81%</span>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                <span className="text-gray-900">Other</span>
                                <span className="font-semibold text-gray-700">3.13%</span>
                              </div>
                            </div>
                          </div>

                          {/* Asset Allocation Table */}
                          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Foreign Bonds</span>
                                <span className="font-semibold text-gray-700">10.39%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">International Equity</span>
                                <span className="font-semibold text-gray-700">22.61%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Domestic Bonds</span>
                                <span className="font-semibold text-gray-700">15.76%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">US Equity</span>
                                <span className="font-semibold text-gray-700">25.08%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Cash and Equivalents</span>
                                <span className="font-semibold text-gray-700">3.14%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Canadian Equity</span>
                                <span className="font-semibold text-gray-700">20.67%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">All Others</span>
                                <span className="font-semibold text-gray-700">0.61%</span>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                <span className="text-gray-900">Other</span>
                                <span className="font-semibold text-gray-700">1.74%</span>
                              </div>
                            </div>
                          </div>

                          {/* Sector Allocation Table */}
                          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Allocation</h3>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Financial Services</span>
                                <span className="font-semibold text-gray-700">10.80%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Technology</span>
                                <span className="font-semibold text-gray-700">12.61%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Real Estate</span>
                                <span className="font-semibold text-gray-700">4.13%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Consumer Services</span>
                                <span className="font-semibold text-gray-700">6.92%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Healthcare</span>
                                <span className="font-semibold text-gray-700">4.26%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Consumer Goods</span>
                                <span className="font-semibold text-gray-700">10.44%</span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-900">Fixed Income</span>
                                <span className="font-semibold text-gray-700">26.14%</span>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                <span className="text-gray-900">All Others</span>
                                <span className="font-semibold text-gray-700">24.69%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activePlanTab === 'supplier' && (
                    <div className="space-y-6">
                      {/* Include Inactive Checkbox */}
                      <div className="flex items-center space-x-2 mb-4">
                        <Checkbox id="include-inactive-supplier" />
                        <Label htmlFor="include-inactive-supplier" className="text-sm">Include Inactive</Label>
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
                                <TableHead className="font-semibold">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow className="hover:bg-blue-50/50 transition-all duration-200">
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <Building2 className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="font-medium text-gray-900">FID</span>
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
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-colors">
                                      View
                                    </Button>
                                    <Button variant="ghost" size="sm" className="hover:bg-green-100 transition-colors">
                                      Edit
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-blue-50/50 transition-all duration-200">
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <Building2 className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="font-medium text-gray-900">RBC Direct Investing</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <span className="font-mono text-sm text-gray-700">87654321</span>
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm text-gray-700">07/22/2020</span>
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm text-gray-700">-</span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <span className="font-semibold text-green-700">$87,500.25</span>
                                </TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm text-gray-700">TFSA</span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-colors">
                                      View
                                    </Button>
                                    <Button variant="ghost" size="sm" className="hover:bg-green-100 transition-colors">
                                      Edit
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-blue-50/50 transition-all duration-200">
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                      <Building2 className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span className="font-medium text-gray-900">Scotia iTrade</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <span className="font-mono text-sm text-gray-700">11223344</span>
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm text-gray-700">01/10/2019</span>
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm text-gray-700">-</span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <span className="font-semibold text-green-700">$156,750.00</span>
                                </TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm text-gray-700">Non-Registered</span>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-colors">
                                      View
                                    </Button>
                                    <Button variant="ghost" size="sm" className="hover:bg-green-100 transition-colors">
                                      Edit
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  )}

                  {activePlanTab === 'compensation' && (
                    <CustomCompensation />
                  )}

                  {activePlanTab === 'kyc' && (
                    <KYC />
                  )}

                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trading" className="max-w-7xl mx-auto px-6 py-8">
            <ClientTrading 
              clientId={client.id.toString()} 
              clientName={`${client.firstName}, ${client.surname}`}
            />
          </TabsContent>

          <TabsContent value="questionnaires" className="max-w-7xl mx-auto px-6 py-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-8 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Questionnaires</h3>
                <p className="text-gray-600 mb-4">Risk assessment and client questionnaires</p>
                <div className="bg-gray-50/50 rounded-lg p-4 max-w-md mx-auto">
                  <div className="text-sm text-muted-foreground">Questionnaires will be displayed here</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="max-w-7xl mx-auto px-6 py-8">
            <ClientReports 
              clientId={client.id.toString()} 
              clientName={`${client.firstName}, ${client.surname}`}
            />
          </TabsContent>

          <TabsContent value="charts" className="max-w-7xl mx-auto px-6 py-8">
            <ClientCharts 
              clientId={client.id.toString()} 
              clientName={`${client.firstName}, ${client.surname}`}
            />
          </TabsContent>

          <TabsContent value="approvals" className="max-w-7xl mx-auto px-6 py-8">
            <ClientApprovals 
              clientId={client.id.toString()} 
              clientName={`${client.firstName}, ${client.surname}`}
            />
          </TabsContent>

          <TabsContent value="attachments" className="max-w-7xl mx-auto px-6 py-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 p-8 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Attachments</h3>
                <p className="text-gray-600 mb-4">Documents, files, and client attachments</p>
                <div className="bg-gray-50/50 rounded-lg p-4 max-w-md mx-auto">
                  <div className="text-sm text-muted-foreground">Attachments will be displayed here</div>
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
            <div className="text-sm text-gray-600 mt-2">
              Draft Started: {new Date().toISOString().split('T')[0]} {new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5)}
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Update Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Update Options</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-name" />
                  <Label htmlFor="update-name" className="text-sm font-medium">Update Client's Name</Label>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-address" />
                  <Label htmlFor="update-address" className="text-sm font-medium">Update Client's Address</Label>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-phone" />
                  <Label htmlFor="update-phone" className="text-sm font-medium">Update Client's Phone Number</Label>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-beneficiary" />
                  <Label htmlFor="update-beneficiary" className="text-sm font-medium">Update Beneficiary Information</Label>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-email" />
                  <Label htmlFor="update-email" className="text-sm font-medium">Update Email Address and Statement Delivery Option</Label>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-tax" />
                  <Label htmlFor="update-tax" className="text-sm font-medium">Declaration of Tax Residence</Label>
                </div>
                <hr className="border-gray-200" />
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-banking" />
                  <Label htmlFor="update-banking" className="text-sm font-medium">Update Banking Information</Label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                Save Draft
              </Button>
              <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200">
                Delete Draft
              </Button>
              <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200">
                Generate Paperwork
              </Button>
              <Button variant="outline" className="bg-gray-100 text-gray-400 cursor-not-allowed">
                Use eSignature
              </Button>
            </div>

            {/* Add Attachment Section */}
            <div className="bg-gray-50/50 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Attachment</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="representative" className="text-sm font-medium text-gray-700">Representative:</Label>
                  <Select defaultValue="9823-2232">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select representative" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9823-2232">9823-2232 Marsh, Antoine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox id="visible-to-client" />
                  <Label htmlFor="visible-to-client" className="text-sm font-medium">Visible to Client</Label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Document Source Options:</Label>
                  <RadioGroup defaultValue="scan-upload" className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scan-upload" id="scan-upload" />
                      <Label htmlFor="scan-upload" className="text-sm">Scan/Upload document</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="existing" id="existing" />
                      <Label htmlFor="existing" className="text-sm">Use existing attachment</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="document-type" className="text-sm font-medium text-gray-700">Document Type:</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Please select a document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id">ID Document</SelectItem>
                        <SelectItem value="address">Address Verification</SelectItem>
                        <SelectItem value="bank">Banking Information</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description:</Label>
                    <Input id="description" placeholder="Enter description" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="scanner" />
                  <Label htmlFor="scanner" className="text-sm font-medium">Attach directly from scanner</Label>
                </div>

                <div className="flex items-center gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </div>

                <div className="text-xs text-gray-600 space-y-1">
                  <div>*Only files of type .pdf are accepted.</div>
                  <div>*Maximum allowed file size is 20 MB.</div>
                  <div>*PDF must not be password protected and if digitally signed, certificate must be valid</div>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                Submit Change
              </Button>
              <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200" onClick={() => setShowNFCModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* NFC Submissions Modal */}
      <Dialog open={showNFCSubmissionsModal} onOpenChange={setShowNFCSubmissionsModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Non Financial Change Submissions - {client?.firstName} {client?.surname}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submitted Non Financial Updates</h3>
            
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="font-semibold text-gray-700 py-4 text-left">Draft Started</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 text-center">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 text-right">Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12">
                      <div className="space-y-2">
                        <div className="text-muted-foreground">No records found.</div>
                        <div className="text-muted-foreground italic">No Non Financial Updates Found</div>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-start pt-6">
              <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200" onClick={() => setShowNFCSubmissionsModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* NFU Messages Modal */}
      <Dialog open={showNFUMessagesModal} onOpenChange={setShowNFUMessagesModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              NFU Messages for client {client?.firstName} {client?.surname}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 space-y-8">
            {/* NFU Messages Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">NFU Messages</h3>
              
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700 py-4">Created Date</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">Sent Date</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">NFU Type</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">Description</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">State</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">User</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4 w-32"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-gray-50/50 transition-colors duration-200 border-b border-gray-100">
                      <TableCell className="py-4 text-sm text-gray-600">12/31/2019</TableCell>
                      <TableCell className="py-4 text-sm text-gray-600">12/31/2019</TableCell>
                      <TableCell className="py-4 text-sm text-gray-900">Dealer/Representative Change</TableCell>
                      <TableCell className="py-4 text-sm text-gray-600 max-w-xs">
                        Plan 66509 (RRSP, Client Name, Individual). Old Dealer: 9823
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                          Success
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 text-sm text-gray-600">greenham, stephen</TableCell>
                      <TableCell className="py-4">
                        <Button variant="outline" size="sm" className="text-xs">
                          View Responses
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-gray-50/50 transition-colors duration-200">
                      <TableCell className="py-4 text-sm text-gray-600">12/31/2019</TableCell>
                      <TableCell className="py-4 text-sm text-gray-600">12/31/2019</TableCell>
                      <TableCell className="py-4 text-sm text-gray-900">Dealer/Representative Change</TableCell>
                      <TableCell className="py-4 text-sm text-gray-600 max-w-xs">
                        Plan 119038 (RESP Family, Client Name, Individual). Old Dealer: 9823
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                          Success
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 text-sm text-gray-600">greenham, stephen</TableCell>
                      <TableCell className="py-4">
                        <Button variant="outline" size="sm" className="text-xs">
                          View Responses
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* NFU Responses Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">NFU Responses</h3>
              
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold text-gray-700 py-4">Supplier</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">Error Code</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">Response Date</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">Filename</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">Source Identifier</TableHead>
                      <TableHead className="font-semibold text-gray-700 py-4">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="text-muted-foreground">No records found.</div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-start pt-4 border-t border-gray-200">
              <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-200" onClick={() => setShowNFUMessagesModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
