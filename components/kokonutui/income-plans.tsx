"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Search,
  FileText,
  CheckSquare,
  Plus,
  Download,
  Filter,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AllocationCharts from "./allocation-charts"

const mockIncomeData = [
  {
    id: 1,
    clientName: "Carriere, Dora",
    clientId: "29720",
    planNumber: "S108113354",
    planType: "Locked in RLIF Broker/Nominee, Individual",
    representative: "9823-2232 Marsh, Antoine",
    minimum: 2992.35,
    balanceToMinimum: 1575.79,
    maximum: 4249.71,
    balanceToMaximum: 2833.15,
    ytdPaidToClient: 1374.64,
    ytdWithholdingTax: 41.92,
    clientInstructionStatus: "Payment Scheduled",
    paymentScheduleStatus: "Scheduled"
  },
  {
    id: 2,
    clientName: "Sharma, Melanie",
    clientId: "2663",
    planNumber: "1322488010",
    planType: "RRIF Broker/Nominee, Individual, Fee for Service",
    representative: "9823-2232 Marsh, Antoine",
    minimum: 77219.08,
    balanceToMinimum: 0.00,
    maximum: 0.00,
    balanceToMaximum: -77219.08,
    ytdPaidToClient: 54053.35,
    ytdWithholdingTax: 23165.73,
    clientInstructionStatus: "Payment Scheduled",
    paymentScheduleStatus: "Completed"
  },
  {
    id: 3,
    clientName: "Sharma, Melanie",
    clientId: "2663",
    planNumber: "4527271322",
    planType: "RRIF Broker/Nominee, Spousal, Fee for Service",
    representative: "9823-2232 Marsh, Antoine",
    minimum: 8185.32,
    balanceToMinimum: 0.00,
    maximum: 0.00,
    balanceToMaximum: -8185.32,
    ytdPaidToClient: 5729.73,
    ytdWithholdingTax: 2455.59,
    clientInstructionStatus: "Payment Scheduled",
    paymentScheduleStatus: "Completed"
  },
  {
    id: 4,
    clientName: "Sharma, Melanie",
    clientId: "2663",
    planNumber: "7545538518",
    planType: "Locked in LIF Broker/Nominee, Individual, Fee for Service",
    representative: "9823-2232 Marsh, Antoine",
    minimum: 3299.21,
    balanceToMinimum: 3299.21,
    maximum: 7162.91,
    balanceToMaximum: 7162.91,
    ytdPaidToClient: 0.00,
    ytdWithholdingTax: 0.00,
    clientInstructionStatus: "Instructions Required",
    paymentScheduleStatus: "Completed"
  }
]

export default function IncomePlans() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("2025")
  const [clientInstructionFilter, setClientInstructionFilter] = useState("all")
  const [paymentScheduleFilter, setPaymentScheduleFilter] = useState("all")
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)

  // Filter data based on search and filters
  const filteredData = mockIncomeData.filter(item => {
    const matchesSearch = !searchTerm || 
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.planNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.representative.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesClientInstruction = clientInstructionFilter === "all" || 
      item.clientInstructionStatus.toLowerCase().includes(clientInstructionFilter.toLowerCase())
    
    const matchesPaymentSchedule = paymentScheduleFilter === "all" || 
      item.paymentScheduleStatus.toLowerCase().includes(paymentScheduleFilter.toLowerCase())
    
    return matchesSearch && matchesClientInstruction && matchesPaymentSchedule
  })

  // Calculate statistics
  const totalPlans = mockIncomeData.length
  const uniqueClients = new Set(mockIncomeData.map(item => item.clientId)).size
  const totalYTDPaid = mockIncomeData.reduce((sum, item) => sum + item.ytdPaidToClient, 0)
  const instructionsRequired = mockIncomeData.filter(item => item.clientInstructionStatus === "Instructions Required").length

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getInstructionStatusIcon = (status: string) => {
    switch (status) {
      case "Payment Scheduled":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "Instructions Required":
        return <AlertCircle className="h-3 w-3 text-orange-600" />
      default:
        return <Clock className="h-3 w-3 text-muted-foreground" />
    }
  }

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "Scheduled":
        return <Clock className="h-3 w-3 text-blue-600" />
      default:
        return <div className="h-3 w-3 rounded-full bg-muted-foreground" />
    }
  }

  const getInstructionStatusColor = (status: string) => {
    switch (status) {
      case "Payment Scheduled":
        return 'bg-green-100 text-green-800'
      case "Instructions Required":
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return 'bg-green-100 text-green-800'
      case "Scheduled":
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="p-2 bg-orange-100 rounded-lg">
          <TrendingUp className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">Systematic Income Plans</h1>
          <p className="text-muted-foreground">Manage client recurring income setups (RRIF, LIF, etc.)</p>
        </div>
      </div>

      {/* Statistics Overview - Compact Vercel-like Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-gradient-to-br from-orange-50 via-white to-orange-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Total</span>
          </div>
          <div className="text-2xl font-bold text-card-foreground">{totalPlans}</div>
          <div className="text-xs text-muted-foreground mt-1">Income Plans</div>
        </div>

        <div className="rounded-xl border border-border bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Clients</span>
          </div>
          <div className="text-2xl font-bold text-card-foreground">{uniqueClients}</div>
          <div className="text-xs text-muted-foreground mt-1">With Plans</div>
        </div>

        <div className="rounded-xl border border-border bg-gradient-to-br from-green-50 via-white to-green-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">YTD Paid</span>
          </div>
          <div className="text-2xl font-bold text-card-foreground">{formatCurrency(totalYTDPaid)}</div>
          <div className="text-xs text-muted-foreground mt-1">To Clients</div>
        </div>

        <div className="rounded-xl border border-border bg-gradient-to-br from-red-50 via-white to-red-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Action</span>
          </div>
          <div className="text-2xl font-bold text-card-foreground">{instructionsRequired}</div>
          <div className="text-xs text-muted-foreground mt-1">Instructions Required</div>
        </div>
      </div>

      {/* Main Content - Full Width Layout */}
      <div className={`grid gap-6 ${selectedPlan ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
        <div className={selectedPlan ? 'lg:col-span-3 space-y-6' : 'space-y-6'}>
          
          {/* Filters and Search */}
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-orange-600" />
                  Filters & Search
                </CardTitle>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105">
                  <Download className="h-4 w-4 mr-2" />
                  Export to Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Year</label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="border-border focus:border-orange-300 focus:ring-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Client Instruction Status</label>
                  <Select value={clientInstructionFilter} onValueChange={setClientInstructionFilter}>
                    <SelectTrigger className="border-border focus:border-orange-300 focus:ring-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="payment scheduled">Payment Scheduled</SelectItem>
                      <SelectItem value="instructions required">Instructions Required</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Payment Schedule Status</label>
                  <Select value={paymentScheduleFilter} onValueChange={setPaymentScheduleFilter}>
                    <SelectTrigger className="border-border focus:border-orange-300 focus:ring-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Client, plan, or rep..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 border-border focus:border-orange-300 focus:ring-orange-200 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
                <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                </div>
                <p className="text-xs text-orange-700">
                  <strong>Section Search:</strong> Filter income plans by client, plan number, or representative. Use sidebar for global client search.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Income Plans Table */}
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                Systematic Income Plans ({filteredData.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/80">
                        <TableHead className="font-semibold">Client</TableHead>
                        <TableHead className="font-semibold">Plan</TableHead>
                        <TableHead className="font-semibold">Representative</TableHead>
                        <TableHead className="font-semibold text-right">Minimum</TableHead>
                        <TableHead className="font-semibold text-right">Balance to Min</TableHead>
                        <TableHead className="font-semibold text-right">Maximum</TableHead>
                        <TableHead className="font-semibold text-right">Balance to Max</TableHead>
                        <TableHead className="font-semibold text-right">YTD Paid</TableHead>
                        <TableHead className="font-semibold text-right">YTD Tax</TableHead>
                        <TableHead className="font-semibold">Instruction Status</TableHead>
                        <TableHead className="font-semibold">Payment Status</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item) => (
                        <TableRow 
                          key={item.id}
                          className={`cursor-pointer hover:bg-orange-50/50 transition-all duration-200 ${
                            selectedPlan === item.id 
                              ? 'bg-orange-50 border-l-4 border-l-orange-500' 
                              : 'hover:border-l-4 hover:border-l-orange-200'
                          }`}
                          onClick={() => setSelectedPlan(selectedPlan === item.id ? null : item.id)}
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-card-foreground">{item.clientName}</div>
                              <div className="text-sm text-muted-foreground">ID: {item.clientId}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.planNumber}</div>
                              <div className="text-xs text-muted-foreground">{item.planType}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{item.representative}</TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(item.minimum)}</TableCell>
                          <TableCell className={`text-right font-medium ${item.balanceToMinimum < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {formatCurrency(item.balanceToMinimum)}
                          </TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(item.maximum)}</TableCell>
                          <TableCell className={`text-right font-medium ${item.balanceToMaximum < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {formatCurrency(item.balanceToMaximum)}
                          </TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(item.ytdPaidToClient)}</TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(item.ytdWithholdingTax)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getInstructionStatusIcon(item.clientInstructionStatus)}
                              <Badge className={getInstructionStatusColor(item.clientInstructionStatus)}>
                                {item.clientInstructionStatus}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getPaymentStatusIcon(item.paymentScheduleStatus)}
                              <Badge className={getPaymentStatusColor(item.paymentScheduleStatus)}>
                                {item.paymentScheduleStatus}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="hover:bg-orange-100 transition-colors">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {selectedPlan && (
          <div className="space-y-6">
            <Card className="border border-orange-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50/50 border-b border-orange-100">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  Plan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {(() => {
                  const selectedPlanData = mockIncomeData.find(p => p.id === selectedPlan)
                  if (!selectedPlanData) return null
                  
                  return (
                    <div className="space-y-4">
                      <div className="group relative overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-orange-100/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative">
                          <div className="text-sm text-orange-600 font-medium mb-1">Client & Plan</div>
                          <div className="font-bold text-orange-900 text-lg">{selectedPlanData.clientName}</div>
                          <div className="text-sm text-muted-foreground">{selectedPlanData.planNumber}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Plan Type</div>
                          <div className="text-sm font-medium text-card-foreground">{selectedPlanData.planType}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Representative</div>
                          <div className="text-sm font-medium text-card-foreground">{selectedPlanData.representative}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <div className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-r from-gray-50 to-white p-3 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                          <div className="text-sm text-muted-foreground">Minimum Payment</div>
                          <div className="font-bold text-card-foreground text-lg group-hover:text-orange-700 transition-colors">{formatCurrency(selectedPlanData.minimum)}</div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-r from-gray-50 to-white p-3 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                          <div className="text-sm text-muted-foreground">Maximum Payment</div>
                          <div className="font-bold text-card-foreground text-lg group-hover:text-orange-700 transition-colors">{formatCurrency(selectedPlanData.maximum)}</div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-r from-green-50 to-white p-3 transition-all duration-300 hover:shadow-md hover:border-green-300">
                          <div className="text-sm text-muted-foreground">YTD Paid to Client</div>
                          <div className="font-bold text-green-700 text-lg group-hover:text-green-800 transition-colors">{formatCurrency(selectedPlanData.ytdPaidToClient)}</div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg border border-border bg-gradient-to-r from-red-50 to-white p-3 transition-all duration-300 hover:shadow-md hover:border-red-300">
                          <div className="text-sm text-muted-foreground">YTD Withholding Tax</div>
                          <div className="font-bold text-red-700 text-lg group-hover:text-red-800 transition-colors">{formatCurrency(selectedPlanData.ytdWithholdingTax)}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-2 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Instruction Status</span>
                          <Badge className={getInstructionStatusColor(selectedPlanData.clientInstructionStatus)}>
                            {selectedPlanData.clientInstructionStatus}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Payment Status</span>
                          <Badge className={getPaymentStatusColor(selectedPlanData.paymentScheduleStatus)}>
                            {selectedPlanData.paymentScheduleStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>

            {/* Allocation Charts */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-50/50 border-b border-purple-100">
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                  Portfolio Allocations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <AllocationCharts />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}