"use client"

import React, { useState, useCallback } from 'react'
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
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  DollarSign,
  FileText,
  Plus,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Minus
} from 'lucide-react'

// Types
interface Trade {
  id: string
  clientId: string
  clientName: string
  type: 'Buy' | 'Sell' | 'Switch'
  symbol: string
  product: string
  quantity: number
  price: number
  totalValue: number
  status: 'Executed' | 'Pending' | 'Cancelled'
  executedAt?: string
  createdAt: string
  representative: string
  account: string
  supplier: string
  planId: string
  risk: string
  objective: string
  marketValue: number
}

interface ClientPlan {
  id: string
  name: string
  type: string
  reference: string
  fullName: string
  trades: Trade[]
}

interface ClientTradingProps {
  clientId: string
  clientName: string
}

// Mock client plans with associated trades
const mockClientPlans: ClientPlan[] = [
  {
    id: '3238677748',
    name: 'RESP Family Client Name, Individual',
    type: 'Education Savings Family',
    reference: '9823-2232 Marsh, Antoine',
    fullName: '3238677748 (RESP Family Client Name, Individual) Education Savings Family - 9823-2232 Marsh, Antoine',
    trades: [
      {
        id: 'TR-001',
        clientId: 'CL001',
        clientName: 'Castillo, Wendi',
        type: 'Buy',
        symbol: 'FID-253',
        product: 'FIDELITY NORTHSTAR FUND SERIES B ISC',
        quantity: 1000,
        price: 12.50,
        totalValue: 12500.00,
        status: 'Executed',
        executedAt: '2024-01-15T10:30:00Z',
        createdAt: '2024-01-15T09:15:00Z',
        representative: 'Sarah Johnson',
        account: '3448232822',
        supplier: 'FID-253',
        planId: '3238677748',
        risk: 'M',
        objective: 'Speculation',
        marketValue: 11734.85
      },
      {
        id: 'TR-002',
        clientId: 'CL001',
        clientName: 'Castillo, Wendi',
        type: 'Buy',
        symbol: 'FID-269',
        product: 'FIDELITY MONTHLY INCOME FUND SERIES B ISC',
        quantity: 2500,
        price: 12.10,
        totalValue: 30250.00,
        status: 'Executed',
        executedAt: '2024-01-16T14:22:00Z',
        createdAt: '2024-01-16T13:45:00Z',
        representative: 'Sarah Johnson',
        account: '6503857600',
        supplier: 'FID-269',
        planId: '3238677748',
        risk: 'LM',
        objective: 'Balanced',
        marketValue: 30265.27
      }
    ]
  },
  {
    id: '4761482531',
    name: 'RRSP Client Name, Individual',
    type: 'rrsp - pac',
    reference: '9823-2232 Marsh, Antoine',
    fullName: '4761482531 (RRSP Client Name, Individual) rrsp - pac - 9823-2232 Marsh, Antoine',
    trades: [
      {
        id: 'TR-003',
        clientId: 'CL001',
        clientName: 'Castillo, Wendi',
        type: 'Sell',
        symbol: 'FID-225',
        product: 'FIDELITY TRUE NORTH FUND SERIES B ISC',
        quantity: 500,
        price: 56.91,
        totalValue: 28455.00,
        status: 'Pending',
        createdAt: '2024-01-17T11:45:00Z',
        representative: 'Sarah Johnson',
        account: '4407777217',
        supplier: 'FID-225',
        planId: '4761482531',
        risk: 'M',
        objective: 'Growth',
        marketValue: 28455.06
      },
      {
        id: 'TR-004',
        clientId: 'CL001',
        clientName: 'Castillo, Wendi',
        type: 'Buy',
        symbol: 'FID-234',
        product: 'FIDELITY U.S. FOCUSED STOCK FUND SERIES B ISC',
        quantity: 200,
        price: 49.89,
        totalValue: 9978.00,
        status: 'Executed',
        executedAt: '2024-01-18T09:30:00Z',
        createdAt: '2024-01-18T08:15:00Z',
        representative: 'Sarah Johnson',
        account: '7733783022',
        supplier: 'FID-234',
        planId: '4761482531',
        risk: 'M',
        objective: 'Growth',
        marketValue: 9977.41
      },
      {
        id: 'TR-005',
        clientId: 'CL001',
        clientName: 'Castillo, Wendi',
        type: 'Buy',
        symbol: 'FID-253',
        product: 'FIDELITY NORTHSTAR FUND SERIES B ISC',
        quantity: 3000,
        price: 12.28,
        totalValue: 36840.00,
        status: 'Executed',
        executedAt: '2024-01-19T11:20:00Z',
        createdAt: '2024-01-19T10:30:00Z',
        representative: 'Sarah Johnson',
        account: '4687151288',
        supplier: 'FID-253',
        planId: '4761482531',
        risk: 'M',
        objective: 'Speculation',
        marketValue: 36833.79
      },
      {
        id: 'TR-006',
        clientId: 'CL001',
        clientName: 'Castillo, Wendi',
        type: 'Buy',
        symbol: 'FID-265',
        product: 'FIDELITY CANADIAN GROWTH COMPANY FUND SERIES B ISC',
        quantity: 150,
        price: 49.73,
        totalValue: 7460.00,
        status: 'Executed',
        executedAt: '2024-01-20T14:15:00Z',
        createdAt: '2024-01-20T13:00:00Z',
        representative: 'Sarah Johnson',
        account: '5372678316',
        supplier: 'FID-265',
        planId: '4761482531',
        risk: 'MH',
        objective: 'Growth',
        marketValue: 7460.02
      }
    ]
  }
]

// Configuration objects
const STATUS_CONFIG = {
  Executed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
  Pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  Cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle }
} as const

const TYPE_CONFIG = {
  Buy: { color: 'text-green-600', icon: TrendingUp },
  Sell: { color: 'text-red-600', icon: TrendingDown },
  Switch: { color: 'text-blue-600', icon: TrendingUp } // Using TrendingUp for Switch
} as const

// Utility functions
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD'
  }).format(amount)
}

// StatCard component
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  iconColor: 'blue' | 'green' | 'yellow' | 'purple'
  label: string
  value: string | number
  valueColor: 'gray' | 'green' | 'yellow' | 'purple'
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, iconColor, label, value, valueColor }) => {
  const colorClasses = {
    blue: 'from-blue-50 via-white to-blue-50/30 bg-blue-100 text-blue-600',
    green: 'from-green-50 via-white to-green-50/30 bg-green-100 text-green-600',
    yellow: 'from-yellow-50 via-white to-yellow-50/30 bg-yellow-100 text-yellow-600',
    purple: 'from-purple-50 via-white to-purple-50/30 bg-purple-100 text-purple-600'
  }

  const valueColorClasses = {
    gray: 'text-card-foreground',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600'
  }

  return (
    <div className={`rounded-xl border border-border bg-gradient-to-br ${colorClasses[iconColor]} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center`}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <div className={`text-2xl font-bold ${valueColorClasses[valueColor]}`}>{value}</div>
    </div>
  )
}

export default function ClientTrading({ clientId, clientName }: ClientTradingProps) {
  // State management
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null)
  const [selectedTradeId, setSelectedTradeId] = useState<string | null>(null)
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set())

  // Computed values
  const allTrades = mockClientPlans.flatMap(plan => plan.trades)
  
  const filteredPlans = mockClientPlans
    .map(plan => ({
      ...plan,
      trades: plan.trades.filter(trade => {
        const matchesSearch = trade.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             trade.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             trade.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === 'all' || trade.status === statusFilter
        const matchesType = typeFilter === 'all' || trade.type === typeFilter
        
        return matchesSearch && matchesStatus && matchesType
      })
    }))
    .filter(plan => plan.trades.length > 0)

  const stats = {
    total: allTrades.length,
    executed: allTrades.filter(t => t.status === 'Executed').length,
    pending: allTrades.filter(t => t.status === 'Pending').length,
    cancelled: allTrades.filter(t => t.status === 'Cancelled').length,
    totalValue: allTrades.reduce((sum, t) => sum + t.totalValue, 0)
  }

  // Event handlers
  const togglePlanExpansion = (planId: string) => {
    const newExpanded = new Set(expandedPlans)
    if (newExpanded.has(planId)) {
      newExpanded.delete(planId)
    } else {
      newExpanded.add(planId)
    }
    setExpandedPlans(newExpanded)
  }

  const handleTradeClick = useCallback((trade: Trade) => {
    setSelectedTradeId(trade.id)
    setSelectedTrade(trade)
  }, [])

  // Helper functions
  const getStatusIcon = (status: keyof typeof STATUS_CONFIG) => {
    const config = STATUS_CONFIG[status]
    const Icon = config.icon
    return <Icon className="h-4 w-4" />
  }

  const getTypeIcon = (type: keyof typeof TYPE_CONFIG) => {
    const config = TYPE_CONFIG[type]
    const Icon = config.icon
    return <Icon className={`h-4 w-4 ${config.color}`} />
  }

  return (
    <div className="space-y-6">

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={FileText}
          iconColor="blue"
          label="Total Trades"
          value={stats.total}
          valueColor="gray"
        />
        <StatCard
          icon={CheckCircle}
          iconColor="green"
          label="Executed"
          value={stats.executed}
          valueColor="green"
        />
        <StatCard
          icon={Clock}
          iconColor="yellow"
          label="Pending"
          value={stats.pending}
          valueColor="yellow"
        />
        <StatCard
          icon={DollarSign}
          iconColor="purple"
          label="Total Value"
          value={formatCurrency(stats.totalValue)}
          valueColor="purple"
        />
      </div>

      {/* Plan Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-muted-foreground">Plan:</label>
        <Select defaultValue="all">
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select a Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="3238677748">3238677748 (RESP Family Client Name, Individual) Education Savings Family</SelectItem>
            <SelectItem value="4761482531">4761482531 (RRSP Client Name, Individual) rrsp - pac</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Plans with Trades Table */}
      <div className="space-y-6">
        {filteredPlans.map((plan) => (
          <Card key={plan.id} className="border border-border shadow-sm">
            <CardHeader className="bg-muted">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => togglePlanExpansion(plan.id)}
                    className="flex items-center gap-2 hover:bg-accent p-2 rounded transition-colors"
                  >
                    {expandedPlans.has(plan.id) ? (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium text-card-foreground">{plan.fullName}</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedPlans.has(plan.id) && (
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Supplier</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Account</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Risk</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Objective</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Market value</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {plan.trades.map((trade) => (
                        <tr 
                          key={trade.id}
                          className="hover:bg-muted cursor-pointer"
                          onClick={() => handleTradeClick(trade)}
                        >
                          <td className="px-4 py-3 text-sm text-blue-600 font-medium">{trade.supplier}</td>
                          <td className="px-4 py-3 text-sm text-card-foreground">{trade.account}</td>
                          <td className="px-4 py-3 text-sm text-card-foreground">{trade.product}</td>
                          <td className="px-4 py-3 text-sm text-card-foreground">{trade.risk}</td>
                          <td className="px-4 py-3 text-sm text-card-foreground">
                            <div className="flex items-center gap-2">
                              <span>{trade.objective}</span>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-blue-500 rounded"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded"></div>
                                <div className="w-2 h-2 bg-green-500 rounded"></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-card-foreground font-medium">{formatCurrency(trade.marketValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Summary Section */}
                <div className="bg-muted px-4 py-3 border-t">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Settled Trust Account Balance CAD:</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Settled Trust Account Balance USD:</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-1">
                      <span>Total in CAD:</span>
                      <span>{formatCurrency(plan.trades.reduce((sum, trade) => sum + trade.marketValue, 0))}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

    </div>
  )
}
