"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Download, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Plus
} from 'lucide-react'

// Mock trade data
const mockTrades = [
  {
    id: 'TR-001',
    clientId: 'CL001',
    clientName: 'John Smith',
    type: 'Buy',
    symbol: 'AGF-183',
    product: 'AGF GLOBAL STRATEGIC INCOME FUND',
    quantity: 1000,
    price: 12.50,
    totalValue: 12500.00,
    status: 'Executed',
    executedAt: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-15T09:15:00Z',
    representative: 'Sarah Johnson'
  },
  {
    id: 'TR-002',
    clientId: 'CL002',
    clientName: 'Emily Davis',
    type: 'Sell',
    symbol: 'RBC-567',
    product: 'RBC CANADIAN EQUITY FUND',
    quantity: 500,
    price: 25.75,
    totalValue: 12875.00,
    status: 'Pending',
    createdAt: '2024-01-16T14:22:00Z',
    representative: 'Mike Chen'
  },
  {
    id: 'TR-003',
    clientId: 'CL003',
    clientName: 'Michael Johnson',
    type: 'Buy',
    symbol: 'GW-891',
    product: 'GREAT-WEST LIFECO BALANCED FUND',
    quantity: 750,
    price: 18.30,
    totalValue: 13725.00,
    status: 'Cancelled',
    createdAt: '2024-01-17T11:45:00Z',
    representative: 'Lisa Wang'
  }
]

const statusConfig = {
  'Executed': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
  'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  'Cancelled': { color: 'bg-red-100 text-red-800', icon: XCircle }
}

const typeConfig = {
  'Buy': { color: 'text-green-600', icon: TrendingUp },
  'Sell': { color: 'text-red-600', icon: TrendingDown },
  'Switch': { color: 'text-blue-600', icon: ArrowUpDown }
}

export function Trades() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedTrade, setSelectedTrade] = useState<any>(null)
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(null)
  const [advancedSearchCriteria, setAdvancedSearchCriteria] = useState<any>(null)
  const [activeTab] = useState<'all' | 'pending' | 'executed' | 'cancelled' | 'reports'>('all')

  // Load search criteria from localStorage on component mount
  useEffect(() => {
    const savedCriteria = localStorage.getItem('tradesAdvancedSearchCriteria')
    if (savedCriteria) {
      try {
        setAdvancedSearchCriteria(JSON.parse(savedCriteria))
      } catch (error) {
        console.error('Error parsing saved search criteria:', error)
      }
    }
  }, [])

  const filteredTrades = mockTrades.filter(trade => {
    const matchesSearch = trade.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trade.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trade.product.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || trade.status === statusFilter
    const matchesType = typeFilter === 'all' || trade.type === typeFilter
    
    // Tab filtering
    let matchesTab = true
    if (activeTab === 'pending') {
      matchesTab = trade.status === 'Pending'
    } else if (activeTab === 'executed') {
      matchesTab = trade.status === 'Executed'
    } else if (activeTab === 'cancelled') {
      matchesTab = trade.status === 'Cancelled'
    } else if (activeTab === 'reports') {
      // For reports, we'll show all trades but could add specific criteria
      matchesTab = true
    }
    
    // Advanced search criteria filtering
    let matchesAdvanced = true
    if (advancedSearchCriteria) {
      // Interactive Order Status
      if (advancedSearchCriteria.interactiveOrderStatus !== 'All') {
        matchesAdvanced = matchesAdvanced && trade.status === advancedSearchCriteria.interactiveOrderStatus
      }
      
      // Transaction ID
      if (advancedSearchCriteria.transactionId && advancedSearchCriteria.transactionId !== '0') {
        matchesAdvanced = matchesAdvanced && trade.id.includes(advancedSearchCriteria.transactionId)
      }
      
      // Representative At Time Of Trade
      if (advancedSearchCriteria.representativeAtTimeOfTrade !== 'All') {
        matchesAdvanced = matchesAdvanced && trade.representative === advancedSearchCriteria.representativeAtTimeOfTrade
      }
      
      // Product Name
      if (advancedSearchCriteria.productName) {
        matchesAdvanced = matchesAdvanced && trade.product.toLowerCase().includes(advancedSearchCriteria.productName.toLowerCase())
      }
      
      // Supplier Account Number (using clientId as proxy)
      if (advancedSearchCriteria.supplierAccountNumber) {
        matchesAdvanced = matchesAdvanced && trade.clientId.includes(advancedSearchCriteria.supplierAccountNumber)
      }
      
      // Fund Class/Series (using symbol as proxy)
      if (advancedSearchCriteria.fundClassSeries) {
        matchesAdvanced = matchesAdvanced && trade.symbol.includes(advancedSearchCriteria.fundClassSeries)
      }
      
      // Status
      if (advancedSearchCriteria.status !== 'All') {
        matchesAdvanced = matchesAdvanced && trade.status === advancedSearchCriteria.status
      }
      
      // Product Type (using product name as proxy)
      if (advancedSearchCriteria.productType !== 'All') {
        const productTypeMap: { [key: string]: string[] } = {
          'Mutual Fund': ['AGF', 'GW', 'RBC'],
          'ETF': ['ETF'],
          'Bond': ['BOND'],
          'Stock': ['STOCK']
        }
        const types = productTypeMap[advancedSearchCriteria.productType] || []
        matchesAdvanced = matchesAdvanced && types.some(type => trade.product.includes(type))
      }
      
      // Category (using product name as proxy)
      if (advancedSearchCriteria.category !== 'All') {
        const categoryMap: { [key: string]: string[] } = {
          'Equity': ['EQUITY', 'EQUITY FUND'],
          'Fixed Income': ['BOND', 'INCOME FUND'],
          'Balanced': ['BALANCED'],
          'Money Market': ['MONEY MARKET']
        }
        const categories = categoryMap[advancedSearchCriteria.category] || []
        matchesAdvanced = matchesAdvanced && categories.some(cat => trade.product.toUpperCase().includes(cat))
      }
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesTab && matchesAdvanced
  })

  const handleTradeClick = useCallback((trade: any) => {
    setSelectedTradeId(trade.id)
    setSelectedTrade(trade)
  }, [])

  const handleResetAdvancedSearch = useCallback(() => {
    setAdvancedSearchCriteria(null)
    localStorage.removeItem('tradesAdvancedSearchCriteria')
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    return <Icon className="h-4 w-4" />
  }

  const getTypeIcon = (type: string) => {
    const config = typeConfig[type as keyof typeof typeConfig]
    const Icon = config.icon
    return <Icon className={`h-4 w-4 ${config.color}`} />
  }

  const stats = {
    total: mockTrades.length,
    executed: mockTrades.filter(t => t.status === 'Executed').length,
    pending: mockTrades.filter(t => t.status === 'Pending').length,
    cancelled: mockTrades.filter(t => t.status === 'Cancelled').length,
    totalValue: mockTrades.reduce((sum, t) => sum + t.totalValue, 0)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trades</h1>
            <p className="text-gray-600">Manage and track trading activities</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Trade
          </Button>
        </div>
      </div>

      {/* Statistics Overview - Compact Vercel-like Style */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Total Trades</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </div>
        
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 via-white to-green-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Executed</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.executed}</div>
        </div>
        
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-yellow-50 via-white to-yellow-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Pending</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
        </div>
        
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-red-50 via-white to-red-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Cancelled</span>
          </div>
          <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
        </div>
        
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 via-white to-purple-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Total Value</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{formatCurrency(stats.totalValue)}</div>
        </div>
      </div>

      {/* Main Content - Full Width Layout with Side Panel */}
      <div className={`grid gap-6 ${selectedTradeId ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
        <div className={selectedTradeId ? 'lg:col-span-3 space-y-6' : 'space-y-6'}>
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search trades by client, ID, or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Executed">Executed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Buy">Buy</SelectItem>
                <SelectItem value="Sell">Sell</SelectItem>
                <SelectItem value="Switch">Switch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Search Alert */}
          {advancedSearchCriteria && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Advanced search criteria applied</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetAdvancedSearch}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Clear filters
                </Button>
              </div>
            </div>
          )}

          {/* Trades List */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>All Trades ({filteredTrades.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTrades.map((trade) => (
                  <div
                    key={trade.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedTradeId === trade.id 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleTradeClick(trade)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-medium text-gray-900">{trade.id}</div>
                          <div className="text-sm text-gray-500">{trade.clientName}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          {getTypeIcon(trade.type)}
                          <span className="text-sm font-medium">{trade.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(trade.totalValue)}</div>
                        <div className="text-xs text-gray-500">{trade.quantity} @ {formatCurrency(trade.price)}</div>
                      </div>
                      <Badge className={`${statusConfig[trade.status as keyof typeof statusConfig].color} flex items-center gap-1 text-xs px-2 py-1`}>
                        {getStatusIcon(trade.status)}
                        {trade.status}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm text-gray-600">{trade.product}</div>
                      <div className="text-xs text-gray-500">Created: {formatDate(trade.createdAt)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trade Details Panel */}
        {selectedTradeId && selectedTrade && (
          <div className="space-y-6">
            <Card className="border border-blue-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-blue-100">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Trade Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="group relative overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div className="text-sm text-blue-600 font-medium mb-1">Trade ID</div>
                      <div className="font-bold text-blue-900 text-lg">{selectedTrade.id}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Client</div>
                      <div className="font-medium text-gray-900">{selectedTrade.clientName}</div>
                      <div className="text-xs text-gray-500">{selectedTrade.clientId}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Type & Status</div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {getTypeIcon(selectedTrade.type)}
                          <span className="font-medium">{selectedTrade.type}</span>
                        </div>
                        <Badge className={`${statusConfig[selectedTrade.status as keyof typeof statusConfig].color} flex items-center gap-1 text-xs px-2 py-1`}>
                          {getStatusIcon(selectedTrade.status)}
                          {selectedTrade.status}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-500 mb-2">Product Information</div>
                      <div className="text-sm bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                        <div className="font-medium">{selectedTrade.product}</div>
                        <div className="text-xs text-gray-500 mt-1">Symbol: {selectedTrade.symbol}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-3 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                        <div className="text-sm text-gray-500">Quantity</div>
                        <div className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">{selectedTrade.quantity.toLocaleString()}</div>
                      </div>
                      <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-3 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                        <div className="text-sm text-gray-500">Price</div>
                        <div className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">{formatCurrency(selectedTrade.price)}</div>
                      </div>
                      <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-3 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                        <div className="text-sm text-gray-500">Total Value</div>
                        <div className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">{formatCurrency(selectedTrade.totalValue)}</div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Created</span>
                        <span className="font-medium text-sm">{formatDate(selectedTrade.createdAt)}</span>
                      </div>
                      {selectedTrade.executedAt && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Executed</span>
                          <span className="font-medium text-sm">{formatDate(selectedTrade.executedAt)}</span>
                        </div>
                      )}
                      {selectedTrade.representative && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Representative</span>
                          <span className="font-medium text-sm">{selectedTrade.representative}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}