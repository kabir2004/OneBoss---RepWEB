"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  Search,
  Plus,
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  Download,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for trust deposits
const mockDeposits = [
  {
    id: "TD001",
    date: "2025-01-15",
    clientId: "CL001",
    clientName: "John Smith",
    amount: 4000.00,
    currency: "CAD",
    status: "Settled",
    bank: "CIBC",
    accountNumber: "TR-3238677748"
  },
  {
    id: "TD002", 
    date: "2025-01-14",
    clientId: "CL002",
    clientName: "Sarah Johnson",
    amount: 2500.00,
    currency: "USD",
    status: "Pending",
    bank: "RBC",
    accountNumber: "TR-3238677749"
  },
  {
    id: "TD003",
    date: "2025-01-13",
    clientId: "CL003", 
    clientName: "Michael Brown",
    amount: 5500.00,
    currency: "CAD",
    status: "Settled",
    bank: "TD",
    accountNumber: "TR-3238677750"
  },
  {
    id: "TD004",
    date: "2025-01-12",
    clientId: "CL004",
    clientName: "Emily Davis",
    amount: 3200.00,
    currency: "CAD",
    status: "Unsettled",
    bank: "BMO",
    accountNumber: "TR-3238677751"
  },
  {
    id: "TD005",
    date: "2025-01-11",
    clientId: "CL005",
    clientName: "David Wilson",
    amount: 1800.00,
    currency: "USD",
    status: "Settled",
    bank: "Scotia",
    accountNumber: "TR-3238677752"
  }
]

// Mock trust account data
const trustAccountData = {
  cad: {
    balance: 1250.00,
    settled: 1250.00,
    unsettled: 0.00
  },
  usd: {
    balance: 0.00,
    settled: 0.00,
    unsettled: 0.00
  }
}

// Summary statistics
const summaryStats = {
  totalDeposits: 1250000,
  totalDepositsChange: 2.3,
  activeTrusts: 57,
  activeTrustsChange: 1,
  avgDepositSize: 10500,
  avgDepositChange: 5.1,
  recentDeposits: 24,
  recentDepositsChange: 3
}

export default function TrustDepositsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDeposits, setFilteredDeposits] = useState(mockDeposits)
  const [selectedDeposit, setSelectedDeposit] = useState<any>(null)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showAddDepositModal, setShowAddDepositModal] = useState(false)
  const [filters, setFilters] = useState({
    currency: "All",
    status: "All",
    dateRange: "All"
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter deposits based on search and filters
  const filterDeposits = useCallback(() => {
    let filtered = mockDeposits

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(deposit => 
        deposit.clientName.toLowerCase().includes(query) ||
        deposit.clientId.toLowerCase().includes(query) ||
        deposit.id.toLowerCase().includes(query) ||
        deposit.bank.toLowerCase().includes(query) ||
        deposit.status.toLowerCase().includes(query)
      )
    }

    // Currency filter
    if (filters.currency !== "All") {
      filtered = filtered.filter(deposit => deposit.currency === filters.currency)
    }

    // Status filter
    if (filters.status !== "All") {
      filtered = filtered.filter(deposit => deposit.status === filters.status)
    }

    setFilteredDeposits(filtered)
  }, [searchQuery, filters])

  useEffect(() => {
    filterDeposits()
  }, [filterDeposits])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Settled":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Unsettled":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Settled":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Unsettled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const handleDepositClick = (deposit: any) => {
    setSelectedDeposit(deposit)
    setShowDepositModal(true)
  }

  const handleAddDeposit = () => {
    setShowAddDepositModal(true)
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDeposits = filteredDeposits.slice(startIndex, endIndex)

  return (
    <div className="w-full px-6">

          {/* Search Bar */}
          <div className="bg-white rounded-xl border border-gray-200/60 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search deposits by client name, ID, date, amount, or status..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={filters.currency} onValueChange={(value) => setFilters(prev => ({ ...prev, currency: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Currency</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Settled">Settled</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Unsettled">Unsettled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Time</SelectItem>
                    <SelectItem value="Today">Today</SelectItem>
                    <SelectItem value="Week">This Week</SelectItem>
                    <SelectItem value="Month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="border border-gray-200/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Trust Deposits</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(summaryStats.totalDeposits, 'CAD')}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      +{summaryStats.totalDepositsChange}% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Trusts</p>
                    <p className="text-2xl font-bold text-gray-900">{summaryStats.activeTrusts}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      +{summaryStats.activeTrustsChange} this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Deposit Size</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(summaryStats.avgDepositSize, 'CAD')}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      +{summaryStats.avgDepositChange}% last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200/60">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Recent Deposits</p>
                    <p className="text-2xl font-bold text-gray-900">{summaryStats.recentDeposits}</p>
                    <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      {summaryStats.recentDepositsChange} new this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Accounts Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="border border-gray-200/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Trust Account CAD
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(trustAccountData.cad.balance, 'CAD')}</p>
                    <p className="text-sm text-gray-600">Current Balance</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Settled</p>
                      <p className="text-lg font-semibold text-green-700">{formatCurrency(trustAccountData.cad.settled, 'CAD')}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm text-red-600 font-medium">Unsettled</p>
                      <p className="text-lg font-semibold text-red-700">{formatCurrency(trustAccountData.cad.unsettled, 'CAD')}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Deposit
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Trust Account USD
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(trustAccountData.usd.balance, 'USD')}</p>
                    <p className="text-sm text-gray-600">Current Balance</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Settled</p>
                      <p className="text-lg font-semibold text-green-700">{formatCurrency(trustAccountData.usd.settled, 'USD')}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-sm text-red-600 font-medium">Unsettled</p>
                      <p className="text-lg font-semibold text-red-700">{formatCurrency(trustAccountData.usd.unsettled, 'USD')}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Deposit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>


          {/* Deposits History Table */}
          <Card className="border border-gray-200/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Deposits History</CardTitle>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Bank</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentDeposits.map((deposit) => (
                      <TableRow 
                        key={deposit.id} 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleDepositClick(deposit)}
                      >
                        <TableCell className="font-medium">{deposit.date}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{deposit.clientId}</p>
                            <p className="text-sm text-gray-600">{deposit.clientName}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(deposit.amount, deposit.currency)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{deposit.currency}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(deposit.status)} flex items-center gap-1 w-fit`}>
                            {getStatusIcon(deposit.status)}
                            {deposit.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{deposit.bank}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-700">
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, filteredDeposits.length)} of {filteredDeposits.length} deposits
                  </p>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

      {/* Deposit Details Modal */}
      <Dialog open={showDepositModal} onOpenChange={setShowDepositModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              Deposit Details - {selectedDeposit?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedDeposit && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Client Name</label>
                  <p className="text-lg font-semibold">{selectedDeposit.clientName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Client ID</label>
                  <p className="text-lg font-semibold">{selectedDeposit.clientId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Amount</label>
                  <p className="text-lg font-semibold">{formatCurrency(selectedDeposit.amount, selectedDeposit.currency)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <Badge className={`${getStatusColor(selectedDeposit.status)} flex items-center gap-1 w-fit`}>
                    {getStatusIcon(selectedDeposit.status)}
                    {selectedDeposit.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Bank</label>
                  <p className="text-lg font-semibold">{selectedDeposit.bank}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Account Number</label>
                  <p className="text-lg font-semibold">{selectedDeposit.accountNumber}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Deposit Modal */}
      <Dialog open={showAddDepositModal} onOpenChange={setShowAddDepositModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600" />
              Add New Deposit
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cl001">CL001 - John Smith</SelectItem>
                  <SelectItem value="cl002">CL002 - Sarah Johnson</SelectItem>
                  <SelectItem value="cl003">CL003 - Michael Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CIBC">CIBC</SelectItem>
                  <SelectItem value="RBC">RBC</SelectItem>
                  <SelectItem value="TD">TD</SelectItem>
                  <SelectItem value="BMO">BMO</SelectItem>
                  <SelectItem value="Scotia">Scotia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowAddDepositModal(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Deposit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
