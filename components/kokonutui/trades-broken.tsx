"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  User,
  Building,
  FileText,
  Plus,
  ArrowLeft,
  X
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
    representative: 'Sarah Johnson',
    notes: 'Client requested additional exposure to income funds'
  },
  {
    id: 'TR-002',
    clientId: 'CL002',
    clientName: 'Sarah Johnson',
    type: 'Sell',
    symbol: 'WVN-618',
    product: 'GW CDN FUND (618)',
    quantity: 500,
    price: 8.75,
    totalValue: 4375.00,
    status: 'Pending',
    executedAt: null,
    createdAt: '2024-01-16T14:20:00Z',
    representative: 'Michael Chen',
    notes: 'Partial liquidation for cash needs'
  },
  {
    id: 'TR-003',
    clientId: 'CL003',
    clientName: 'Michael Chen',
    type: 'Switch',
    symbol: 'RBC-001',
    product: 'RBC CANADIAN EQUITY FUND',
    quantity: 750,
    price: 15.20,
    totalValue: 11400.00,
    status: 'Executed',
    executedAt: '2024-01-17T11:45:00Z',
    createdAt: '2024-01-17T10:30:00Z',
    representative: 'Emily Davis',
    notes: 'Switchped from GW fund to RBC for better performance'
  },
  {
    id: 'TR-004',
    clientId: 'CL004',
    clientName: 'Emily Davis',
    type: 'Buy',
    symbol: 'AGF-201',
    product: 'AGF CANADIAN DIVIDEND FUND',
    quantity: 2000,
    price: 11.25,
    totalValue: 22500.00,
    status: 'Cancelled',
    executedAt: null,
    createdAt: '2024-01-18T16:10:00Z',
    representative: 'Robert Wilson',
    notes: 'Client cancelled due to market volatility concerns'
  },
  {
    id: 'TR-005',
    clientId: 'CL005',
    clientName: 'Robert Wilson',
    type: 'Buy',
    symbol: 'WVN-691',
    product: 'GW CDN DIV I (691)',
    quantity: 1500,
    price: 9.80,
    totalValue: 14700.00,
    status: 'Executed',
    executedAt: '2024-01-19T13:15:00Z',
    createdAt: '2024-01-19T12:00:00Z',
    representative: 'Elton Andrews',
    notes: 'Regular monthly investment'
  },
  {
    id: 'TR-006',
    clientId: 'CL006',
    clientName: 'Elton Andrews',
    type: 'Sell',
    symbol: 'RBC-002',
    product: 'RBC BOND FUND',
    quantity: 800,
    price: 7.45,
    totalValue: 5960.00,
    status: 'Pending',
    executedAt: null,
    createdAt: '2024-01-20T09:30:00Z',
    representative: 'Francoise Andrews',
    notes: 'Rebalancing portfolio allocation'
  },
  {
    id: 'TR-007',
    clientId: 'CL007',
    clientName: 'Francoise Andrews',
    type: 'Buy',
    symbol: 'AGF-301',
    product: 'AGF CANADIAN EQUITY FUND',
    quantity: 1200,
    price: 14.75,
    totalValue: 17700.00,
    status: 'Executed',
    executedAt: '2024-01-21T15:20:00Z',
    createdAt: '2024-01-21T14:45:00Z',
    representative: 'Amy Armstrong',
    notes: 'Client requested growth exposure'
  },
  {
    id: 'TR-008',
    clientId: 'CL008',
    clientName: 'Amy Armstrong',
    type: 'Switch',
    symbol: 'WVN-445',
    product: 'GW INTERNATIONAL FUND',
    quantity: 600,
    price: 18.90,
    totalValue: 11340.00,
    status: 'Executed',
    executedAt: '2024-01-22T10:10:00Z',
    createdAt: '2024-01-22T09:30:00Z',
    representative: 'John Smith',
    notes: 'Diversification into international markets'
  },
  {
    id: 'TR-009',
    clientId: 'CL009',
    clientName: 'David Martinez',
    type: 'Buy',
    symbol: 'AGF-302',
    product: 'AGF GLOBAL EQUITY FUND',
    quantity: 1000,
    price: 16.25,
    totalValue: 16250.00,
    status: 'Executed',
    executedAt: '2024-01-23T14:15:00Z',
    createdAt: '2024-01-23T13:00:00Z',
    representative: 'Sarah Johnson',
    notes: 'New client initial investment'
  },
  {
    id: 'TR-010',
    clientId: 'CL010',
    clientName: 'Lisa Wang',
    type: 'Switch',
    symbol: 'WVN-445',
    product: 'GW INTERNATIONAL FUND',
    quantity: 750,
    price: 18.90,
    totalValue: 14175.00,
    status: 'Pending',
    executedAt: null,
    createdAt: '2024-01-24T08:45:00Z',
    representative: 'Michael Chen',
    notes: 'Switching from domestic to international exposure'
  },
  {
    id: 'TR-011',
    clientId: 'CL011',
    clientName: 'James Brown',
    type: 'Sell',
    symbol: 'RBC-003',
    product: 'RBC GLOBAL EQUITY FUND',
    quantity: 1000,
    price: 16.80,
    totalValue: 16800.00,
    status: 'Executed',
    executedAt: '2024-01-25T11:30:00Z',
    createdAt: '2024-01-25T10:15:00Z',
    representative: 'Emily Davis',
    notes: 'Taking profits on global equity position'
  },
  {
    id: 'TR-012',
    clientId: 'CL012',
    clientName: 'Maria Garcia',
    type: 'Buy',
    symbol: 'WVN-223',
    product: 'GW BOND FUND',
    quantity: 800,
    price: 7.50,
    totalValue: 6000.00,
    status: 'Executed',
    executedAt: '2024-01-26T09:20:00Z',
    createdAt: '2024-01-26T08:30:00Z',
    representative: 'Robert Wilson',
    notes: 'Conservative income allocation'
  },
  {
    id: 'TR-013',
    clientId: 'CL013',
    clientName: 'Thomas Anderson',
    type: 'Switch',
    symbol: 'AGF-401',
    product: 'AGF CANADIAN BOND FUND',
    quantity: 1200,
    price: 9.45,
    totalValue: 11340.00,
    status: 'Cancelled',
    executedAt: null,
    createdAt: '2024-01-27T15:45:00Z',
    representative: 'Elton Andrews',
    notes: 'Client changed mind on bond allocation'
  },
  {
    id: 'TR-014',
    clientId: 'CL014',
    clientName: 'Jennifer Lee',
    type: 'Buy',
    symbol: 'RBC-004',
    product: 'RBC INTERNATIONAL EQUITY FUND',
    quantity: 900,
    price: 19.75,
    totalValue: 17775.00,
    status: 'Executed',
    executedAt: '2024-01-28T12:00:00Z',
    createdAt: '2024-01-28T11:15:00Z',
    representative: 'Francoise Andrews',
    notes: 'International diversification strategy'
  },
  {
    id: 'TR-015',
    clientId: 'CL015',
    clientName: 'Christopher Taylor',
    type: 'Sell',
    symbol: 'WVN-691',
    product: 'GW CDN DIV I (691)',
    quantity: 600,
    price: 9.80,
    totalValue: 5880.00,
    status: 'Pending',
    executedAt: null,
    createdAt: '2024-01-29T10:30:00Z',
    representative: 'Amy Armstrong',
    notes: 'Partial liquidation for major purchase'
  },
  {
    id: 'TR-016',
    clientId: 'CL016',
    clientName: 'Amanda White',
    type: 'Buy',
    symbol: 'AGF-501',
    product: 'AGF CANADIAN SMALL CAP FUND',
    quantity: 1500,
    price: 11.20,
    totalValue: 16800.00,
    status: 'Executed',
    executedAt: '2024-01-30T14:45:00Z',
    createdAt: '2024-01-30T13:30:00Z',
    representative: 'John Smith',
    notes: 'Growth strategy for younger client'
  },
  {
    id: 'TR-017',
    clientId: 'CL017',
    clientName: 'Daniel Kim',
    type: 'Switch',
    symbol: 'RBC-005',
    product: 'RBC CANADIAN BOND FUND',
    quantity: 1100,
    price: 8.90,
    totalValue: 9790.00,
    status: 'Executed',
    executedAt: '2024-01-31T11:15:00Z',
    createdAt: '2024-01-31T10:00:00Z',
    representative: 'Sarah Johnson',
    notes: 'Switching to more conservative approach'
  },
  {
    id: 'TR-018',
    clientId: 'CL018',
    clientName: 'Rachel Green',
    type: 'Buy',
    symbol: 'WVN-789',
    product: 'GW BALANCED FUND',
    quantity: 2000,
    price: 13.25,
    totalValue: 26500.00,
    status: 'Pending',
    executedAt: null,
    createdAt: '2024-02-01T09:00:00Z',
    representative: 'Michael Chen',
    notes: 'Balanced approach for retirement planning'
  },
  {
    id: 'TR-019',
    clientId: 'CL019',
    clientName: 'Kevin Johnson',
    type: 'Sell',
    symbol: 'AGF-183',
    product: 'AGF GLOBAL STRATEGIC INCOME FUND',
    quantity: 800,
    price: 12.50,
    totalValue: 10000.00,
    status: 'Executed',
    executedAt: '2024-02-02T16:30:00Z',
    createdAt: '2024-02-02T15:45:00Z',
    representative: 'Emily Davis',
    notes: 'Taking profits on income fund'
  },
  {
    id: 'TR-020',
    clientId: 'CL020',
    clientName: 'Michelle Davis',
    type: 'Buy',
    symbol: 'RBC-006',
    product: 'RBC CANADIAN DIVIDEND FUND',
    quantity: 1300,
    price: 14.80,
    totalValue: 19240.00,
    status: 'Executed',
    executedAt: '2024-02-03T13:20:00Z',
    createdAt: '2024-02-03T12:15:00Z',
    representative: 'Robert Wilson',
    notes: 'Dividend-focused income strategy'
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
  const [currentView, setCurrentView] = useState<'list' | 'details'>('list')
  const [advancedSearchCriteria, setAdvancedSearchCriteria] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'executed' | 'cancelled' | 'reports'>('all')

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
    setSelectedTrade(trade)
    setCurrentView('details')
  }, [])

  const handleBackToList = useCallback(() => {
    setCurrentView('list')
    setSelectedTrade(null)
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

  // if (currentView === 'details' && selectedTrade) {
  //   return (
  //     <div className="space-y-4">
  //       {/* Back Button */}
  //       <Button
  //         variant="ghost"
  //         onClick={handleBackToList}
  //         className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
  //       >
  //         <ArrowLeft className="h-4 w-4" />
  //         Back to Trades
  //       </Button>

  //       {/* Trade Details */}
  //       <Card>
  //         <CardHeader>
  //           <CardTitle className="flex items-center justify-between">
  //             <span>Trade Details - {selectedTrade.id}</span>
  //             <Badge className={`${statusConfig[selectedTrade.status as keyof typeof statusConfig].color} flex items-center gap-1`}>
  //               {getStatusIcon(selectedTrade.status)}
  //               {selectedTrade.status}
  //             </Badge>
  //           </CardTitle>
  //         </CardHeader>
  //         <CardContent className="space-y-6">
  //           {/* Client Information */}
  //           <div>
  //             <h3 className="text-lg font-semibold mb-3">Client Information</h3>
  //             <div className="grid grid-cols-2 gap-4">
  //               <div>
  //                 <label className="text-sm text-gray-500">Client Name</label>
  //                 <p className="font-medium">{selectedTrade.clientName}</p>
  //               </div>
  //               <div>
  //                 <label className="text-sm text-gray-500">Client ID</label>
  //                 <p className="font-medium">{selectedTrade.clientId}</p>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Trade Information */}
  //           <div>
  //             <h3 className="text-lg font-semibold mb-3">Trade Information</h3>
  //             <div className="grid grid-cols-3 gap-4">
  //               <div>
  //                 <label className="text-sm text-gray-500">Type</label>
  //                 <div className="flex items-center gap-1">
  //                   {getTypeIcon(selectedTrade.type)}
  //                   <span className="font-medium">{selectedTrade.type}</span>
  //                 </div>
  //               </div>
  //               <div>
  //                 <label className="text-sm text-gray-500">Symbol</label>
  //                 <p className="font-medium">{selectedTrade.symbol}</p>
  //               </div>
  //               <div>
  //                 <label className="text-sm text-gray-500">Product</label>
  //                 <p className="font-medium">{selectedTrade.product}</p>
  //               </div>
  //               <div>
  //                 <label className="text-sm text-gray-500">Quantity</label>
  //                 <p className="font-medium">{selectedTrade.quantity.toLocaleString()}</p>
  //               </div>
  //               <div>
  //                 <label className="text-sm text-gray-500">Price</label>
  //                 <p className="font-medium">{formatCurrency(selectedTrade.price)}</p>
  //               </div>
  //               <div>
  //                 <label className="text-sm text-gray-500">Total Value</label>
  //                 <p className="font-medium text-lg">{formatCurrency(selectedTrade.totalValue)}</p>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Timeline */}
  //           <div>
  //             <h3 className="text-lg font-semibold mb-3">Timeline</h3>
  //             <div className="grid grid-cols-2 gap-4">
  //               <div>
  //                 <label className="text-sm text-gray-500">Created</label>
  //                 <p className="font-medium">{formatDate(selectedTrade.createdAt)}</p>
  //               </div>
  //               {selectedTrade.executedAt && (
  //                 <div>
  //                   <label className="text-sm text-gray-500">Executed</label>
  //                   <p className="font-medium">{formatDate(selectedTrade.executedAt)}</p>
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     </div>
  //   )
  // }

  const mainContent = (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trades</h1>
            <p className="text-gray-600">Complete trade management and execution overview</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {advancedSearchCriteria && (
            <Button 
              variant="outline" 
              onClick={handleResetAdvancedSearch}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Search
            </Button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'all', label: 'All Trades', count: mockTrades.length },
            { id: 'pending', label: 'Pending', count: mockTrades.filter(t => t.status === 'Pending').length },
            { id: 'executed', label: 'Executed', count: mockTrades.filter(t => t.status === 'Executed').length },
            { id: 'cancelled', label: 'Cancelled', count: mockTrades.filter(t => t.status === 'Cancelled').length },
            { id: 'reports', label: 'Reports', count: mockTrades.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>


      <div className="space-y-4">
      {/* Stats Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ${selectedTrade ? 'lg:grid-cols-3' : ''}`}>
        <div className={`rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 ${selectedTrade ? 'p-2' : 'p-4'}`}>
          <div className={`flex items-center gap-2 ${selectedTrade ? 'mb-1' : 'mb-2'}`}>
            <div className={`${selectedTrade ? 'w-6 h-6' : 'w-8 h-8'} rounded-lg bg-blue-100 flex items-center justify-center`}>
              <FileText className={`${selectedTrade ? 'h-3 w-3' : 'h-4 w-4'} text-blue-600`} />
            </div>
            <span className={`${selectedTrade ? 'text-xs' : 'text-sm'} font-medium text-gray-600`}>Total</span>
          </div>
          <div className={`${selectedTrade ? 'text-lg' : 'text-2xl'} font-bold text-gray-900`}>{stats.total}</div>
          <div className={`text-xs text-gray-500 ${selectedTrade ? 'mt-0.5' : 'mt-1'}`}>Trades</div>
        </div>

        <div className={`rounded-xl border border-gray-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 ${selectedTrade ? 'p-2' : 'p-4'}`}>
          <div className={`flex items-center gap-2 ${selectedTrade ? 'mb-1' : 'mb-2'}`}>
            <div className={`${selectedTrade ? 'w-6 h-6' : 'w-8 h-8'} rounded-lg bg-emerald-100 flex items-center justify-center`}>
              <CheckCircle className={`${selectedTrade ? 'h-3 w-3' : 'h-4 w-4'} text-emerald-600`} />
            </div>
            <span className={`${selectedTrade ? 'text-xs' : 'text-sm'} font-medium text-gray-600`}>Executed</span>
          </div>
          <div className={`${selectedTrade ? 'text-lg' : 'text-2xl'} font-bold text-gray-900`}>{stats.executed}</div>
          <div className={`text-xs text-gray-500 ${selectedTrade ? 'mt-0.5' : 'mt-1'}`}>Trades</div>
        </div>

        <div className={`rounded-xl border border-gray-200 bg-gradient-to-br from-yellow-50 via-white to-yellow-50/30 ${selectedTrade ? 'p-2' : 'p-4'}`}>
          <div className={`flex items-center gap-2 ${selectedTrade ? 'mb-1' : 'mb-2'}`}>
            <div className={`${selectedTrade ? 'w-6 h-6' : 'w-8 h-8'} rounded-lg bg-yellow-100 flex items-center justify-center`}>
              <Clock className={`${selectedTrade ? 'h-3 w-3' : 'h-4 w-4'} text-yellow-600`} />
            </div>
            <span className={`${selectedTrade ? 'text-xs' : 'text-sm'} font-medium text-gray-600`}>Pending</span>
          </div>
          <div className={`${selectedTrade ? 'text-lg' : 'text-2xl'} font-bold text-gray-900`}>{stats.pending}</div>
          <div className={`text-xs text-gray-500 ${selectedTrade ? 'mt-0.5' : 'mt-1'}`}>Trades</div>
        </div>

        <div className={`rounded-xl border border-gray-200 bg-gradient-to-br from-red-50 via-white to-red-50/30 ${selectedTrade ? 'p-2' : 'p-4'}`}>
          <div className={`flex items-center gap-2 ${selectedTrade ? 'mb-1' : 'mb-2'}`}>
            <div className={`${selectedTrade ? 'w-6 h-6' : 'w-8 h-8'} rounded-lg bg-red-100 flex items-center justify-center`}>
              <XCircle className={`${selectedTrade ? 'h-3 w-3' : 'h-4 w-4'} text-red-600`} />
            </div>
            <span className={`${selectedTrade ? 'text-xs' : 'text-sm'} font-medium text-gray-600`}>Cancelled</span>
          </div>
          <div className={`${selectedTrade ? 'text-lg' : 'text-2xl'} font-bold text-gray-900`}>{stats.cancelled}</div>
          <div className={`text-xs text-gray-500 ${selectedTrade ? 'mt-0.5' : 'mt-1'}`}>Trades</div>
        </div>

        <div className={`rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 via-white to-purple-50/30 ${selectedTrade ? 'p-2' : 'p-4'}`}>
          <div className={`flex items-center gap-2 ${selectedTrade ? 'mb-1' : 'mb-2'}`}>
            <div className={`${selectedTrade ? 'w-6 h-6' : 'w-8 h-8'} rounded-lg bg-purple-100 flex items-center justify-center`}>
              <DollarSign className={`${selectedTrade ? 'h-3 w-3' : 'h-4 w-4'} text-purple-600`} />
            </div>
            <span className={`${selectedTrade ? 'text-xs' : 'text-sm'} font-medium text-gray-600`}>Value</span>
          </div>
          <div className={`${selectedTrade ? 'text-lg' : 'text-2xl'} font-bold text-gray-900`}>{formatCurrency(stats.totalValue)}</div>
          <div className={`text-xs text-gray-500 ${selectedTrade ? 'mt-0.5' : 'mt-1'}`}>Total Value</div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search trades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-8 text-sm"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Executed">Executed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Buy">Buy</SelectItem>
                <SelectItem value="Sell">Sell</SelectItem>
                <SelectItem value="Switch">Switch</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-8">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trades List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm">
            <span>
              {activeTab === 'all' && `All Trades (${filteredTrades.length})`}
              {activeTab === 'pending' && `Pending Trades (${filteredTrades.length})`}
              {activeTab === 'executed' && `Executed Trades (${filteredTrades.length})`}
              {activeTab === 'cancelled' && `Cancelled Trades (${filteredTrades.length})`}
              {activeTab === 'reports' && `Trade Reports (${filteredTrades.length})`}
            </span>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-7">
              <Plus className="h-4 w-4 mr-1" />
              New Trade
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[600px] overflow-y-auto">
          <div className="space-y-0">
            {filteredTrades.map((trade, index) => (
              <div
                key={trade.id}
                className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedTrade?.id === trade.id ? 'bg-blue-50 border-blue-200' : ''
                } ${index === filteredTrades.length - 1 ? 'border-b-0' : ''}`}
                onClick={() => handleTradeClick(trade)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {getTypeIcon(trade.type)}
                      <span className="text-sm font-medium text-gray-900">{trade.id}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{trade.clientName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-600 truncate max-w-32">{trade.product}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(trade.totalValue)}</div>
                      <div className="text-xs text-gray-500">{trade.quantity} @ {formatCurrency(trade.price)}</div>
                    </div>
                    <Badge className={`${statusConfig[trade.status as keyof typeof statusConfig].color} flex items-center gap-1 text-xs px-2 py-1`}>
                      {getStatusIcon(trade.status)}
                      {trade.status}
                    </Badge>
                    <div className="text-right text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(trade.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Side - Trade Details */}
      {selectedTrade && (
        <div className="w-[400px] space-y-1">
          <Card>
            <CardHeader className="pb-1 px-2 pt-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold">Trade Details - {selectedTrade.id}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTrade(null)}
                  className="h-5 w-5 p-0 hover:bg-gray-100"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-2 pb-2 space-y-1">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">Status</label>
                  <Badge className={`${statusConfig[selectedTrade.status as keyof typeof statusConfig].color} flex items-center gap-1 w-fit text-xs px-1.5 py-0.5`}>
                    {getStatusIcon(selectedTrade.status)}
                    {selectedTrade.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Type</label>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(selectedTrade.type)}
                    <span className="text-xs font-medium">{selectedTrade.type}</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Total Value</label>
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(selectedTrade.totalValue)}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Quantity</label>
                  <p className="text-xs font-medium">{selectedTrade.quantity.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1 px-2 pt-2">
              <CardTitle className="text-xs font-semibold">Client & Product Info</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-2 space-y-1">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">Client Name</label>
                  <p className="text-xs">{selectedTrade.clientName}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Client ID</label>
                  <p className="text-xs font-mono">{selectedTrade.clientId}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Representative</label>
                  <p className="text-xs">{selectedTrade.representative}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Symbol</label>
                  <p className="text-xs font-mono">{selectedTrade.symbol}</p>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Product</label>
                <p className="text-xs">{selectedTrade.product}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">Price</label>
                  <p className="text-xs font-medium">{formatCurrency(selectedTrade.price)}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Created</label>
                  <p className="text-xs">{formatDate(selectedTrade.createdAt)}</p>
                </div>
              </div>
              {selectedTrade.executedAt && (
                <div>
                  <label className="text-xs text-gray-500">Executed</label>
                  <p className="text-xs">{formatDate(selectedTrade.executedAt)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedTrade.notes && (
            <Card>
              <CardHeader className="pb-1 px-2 pt-2">
                <CardTitle className="text-xs font-semibold">Notes</CardTitle>
              </CardHeader>
              <CardContent className="px-2 pb-2">
                <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">{selectedTrade.notes}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-1 px-2 pt-2">
              <CardTitle className="text-xs font-semibold">Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pb-2">
              <div className="flex gap-1">
                {selectedTrade.status === 'Pending' ? (
                  <>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 h-7 text-xs" size="sm">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Execute
                    </Button>
                    <Button variant="destructive" className="flex-1 h-7 text-xs" size="sm">
                      <XCircle className="h-3 w-3 mr-1" />
                      Cancel
                    </Button>
                    <Button variant="outline" className="flex-1 h-7 text-xs" size="sm">
                      <ArrowUpDown className="h-3 w-3 mr-1" />
                      Switch
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="flex-1 h-7 text-xs" size="sm">
                      <FileText className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                    <Button variant="outline" className="flex-1 h-7 text-xs" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" className="flex-1 h-7 text-xs" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
  
  return mainContent
}
