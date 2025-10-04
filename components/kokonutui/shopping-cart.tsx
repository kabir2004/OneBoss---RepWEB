"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingCart, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Minus, 
  Trash2, 
  DollarSign,
  User,
  Building2,
  FileText,
  TrendingUp,
  TrendingDown
} from "lucide-react"

// Mock data structure
interface Trade {
  id: string
  type: 'buy' | 'sell'
  symbol: string
  shares: number
  price: number
  total: number
}

interface Plan {
  id: string
  name: string
  trades: Trade[]
}

interface Client {
  id: string
  name: string
  plans: Plan[]
}

interface Advisor {
  id: string
  name: string
  clients: Client[]
}

const mockCartData: Advisor[] = [
  {
    id: 'advisor-1',
    name: 'John Smith',
    clients: [
      {
        id: 'client-1',
        name: 'Sarah Johnson',
        plans: [
          {
            id: 'plan-1',
            name: 'Plan A - RRSP',
            trades: [
              {
                id: 'trade-1',
                type: 'buy',
                symbol: 'AAPL',
                shares: 100,
                price: 150.25,
                total: 15025.00
              },
              {
                id: 'trade-2',
                type: 'sell',
                symbol: 'MSFT',
                shares: 50,
                price: 300.50,
                total: 15025.00
              }
            ]
          },
          {
            id: 'plan-2',
            name: 'Plan B - TFSA',
            trades: [
              {
                id: 'trade-3',
                type: 'buy',
                symbol: 'GOOGL',
                shares: 25,
                price: 2500.00,
                total: 62500.00
              },
              {
                id: 'trade-4',
                type: 'buy',
                symbol: 'TSLA',
                shares: 30,
                price: 200.75,
                total: 6022.50
              }
            ]
          }
        ]
      },
      {
        id: 'client-2',
        name: 'Michael Brown',
        plans: [
          {
            id: 'plan-3',
            name: 'Plan C - RESP',
            trades: [
              {
                id: 'trade-5',
                type: 'buy',
                symbol: 'AMZN',
                shares: 20,
                price: 3200.00,
                total: 64000.00
              }
            ]
          },
          {
            id: 'plan-4',
            name: 'Plan D - RRSP',
            trades: [
              {
                id: 'trade-6',
                type: 'sell',
                symbol: 'META',
                shares: 40,
                price: 280.50,
                total: 11220.00
              },
              {
                id: 'trade-7',
                type: 'buy',
                symbol: 'NVDA',
                shares: 15,
                price: 400.00,
                total: 6000.00
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'advisor-2',
    name: 'Emily Davis',
    clients: [
      {
        id: 'client-3',
        name: 'Lisa Wilson',
        plans: [
          {
            id: 'plan-5',
            name: 'Plan E - RRSP',
            trades: [
              {
                id: 'trade-8',
                type: 'buy',
                symbol: 'BRK.A',
                shares: 1,
                price: 450000.00,
                total: 450000.00
              }
            ]
          },
          {
            id: 'plan-6',
            name: 'Plan F - TFSA',
            trades: [
              {
                id: 'trade-9',
                type: 'sell',
                symbol: 'JPM',
                shares: 100,
                price: 150.75,
                total: 15075.00
              },
              {
                id: 'trade-10',
                type: 'buy',
                symbol: 'BAC',
                shares: 200,
                price: 35.25,
                total: 7050.00
              }
            ]
          }
        ]
      },
      {
        id: 'client-4',
        name: 'David Chen',
        plans: [
          {
            id: 'plan-7',
            name: 'Plan G - RESP',
            trades: [
              {
                id: 'trade-11',
                type: 'buy',
                symbol: 'VTI',
                shares: 50,
                price: 220.00,
                total: 11000.00
              }
            ]
          }
        ]
      }
    ]
  }
]

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShoppingCartModal({ isOpen, onClose }: ShoppingCartProps) {
  const [expandedAdvisors, setExpandedAdvisors] = useState<Set<string>>(new Set(['advisor-1']))
  const [expandedClients, setExpandedClients] = useState<Set<string>>(new Set(['client-1']))
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set(['plan-1']))

  const toggleAdvisor = (advisorId: string) => {
    const newExpanded = new Set(expandedAdvisors)
    if (newExpanded.has(advisorId)) {
      newExpanded.delete(advisorId)
    } else {
      newExpanded.add(advisorId)
    }
    setExpandedAdvisors(newExpanded)
  }

  const toggleClient = (clientId: string) => {
    const newExpanded = new Set(expandedClients)
    if (newExpanded.has(clientId)) {
      newExpanded.delete(clientId)
    } else {
      newExpanded.add(clientId)
    }
    setExpandedClients(newExpanded)
  }

  const togglePlan = (planId: string) => {
    const newExpanded = new Set(expandedPlans)
    if (newExpanded.has(planId)) {
      newExpanded.delete(planId)
    } else {
      newExpanded.add(planId)
    }
    setExpandedPlans(newExpanded)
  }

  const calculateAdvisorTotal = (advisor: Advisor) => {
    return advisor.clients.reduce((total, client) => {
      return total + client.plans.reduce((planTotal, plan) => {
        return planTotal + plan.trades.reduce((tradeTotal, trade) => {
          return tradeTotal + trade.total
        }, 0)
      }, 0)
    }, 0)
  }

  const calculateClientTotal = (client: Client) => {
    return client.plans.reduce((total, plan) => {
      return total + plan.trades.reduce((tradeTotal, trade) => {
        return tradeTotal + trade.total
      }, 0)
    }, 0)
  }

  const calculatePlanTotal = (plan: Plan) => {
    return plan.trades.reduce((total, trade) => {
      return total + trade.total
    }, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
            Shopping Cart
          </DialogTitle>
        </DialogHeader>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
          <div className="space-y-4 p-1 pr-2">
            {/* Advisor Level - Aggregates all client carts */}
            {mockCartData.map((advisor) => (
              <div key={advisor.id} className="border border-gray-200 rounded-lg">
                <div 
                  className="p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors border-l-4 border-blue-200"
                  onClick={() => toggleAdvisor(advisor.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{advisor.name}</h3>
                        <p className="text-sm text-gray-600">Advisor Shopping Cart</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {formatCurrency(calculateAdvisorTotal(advisor))}
                        </div>
                        <div className="text-sm text-gray-600">
                          {advisor.clients.length} client{advisor.clients.length !== 1 ? 's' : ''} with pending trades
                        </div>
                      </div>
                      {expandedAdvisors.has(advisor.id) ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Client Level - Each client has their own cart with separate compartments */}
                {expandedAdvisors.has(advisor.id) && (
                  <div className="border-t border-gray-200">
                    {advisor.clients.map((client, clientIndex) => (
                      <div key={client.id} className={`border-b border-gray-100 last:border-b-0 ${clientIndex > 0 ? 'border-t-2 border-green-200' : ''}`}>
                        <div 
                          className="p-4 pl-8 bg-white hover:bg-gray-50 cursor-pointer transition-colors border-l-4 border-green-200"
                          onClick={() => toggleClient(client.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                                <Building2 className="h-3 w-3 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{client.name}</h4>
                                <p className="text-sm text-gray-600">Client Shopping Cart</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="font-medium text-gray-900">
                                  {formatCurrency(calculateClientTotal(client))}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {client.plans.length} plan{client.plans.length !== 1 ? 's' : ''}
                                </div>
                              </div>
                              {expandedClients.has(client.id) ? (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-500" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Plan Level - Each PLAN has its own shopping cart sub-compartment */}
                        {expandedClients.has(client.id) && (
                          <div className="bg-gray-50">
                            {client.plans.map((plan) => (
                              <div key={plan.id} className="border-b border-gray-100 last:border-b-0">
                                <div 
                                  className="p-4 pl-12 bg-white hover:bg-gray-50 cursor-pointer transition-colors border-l-4 border-purple-200"
                                  onClick={() => togglePlan(plan.id)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-5 h-5 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <FileText className="h-3 w-3 text-purple-600" />
                                      </div>
                                      <div>
                                        <h5 className="font-medium text-gray-900">{plan.name}</h5>
                                        <p className="text-sm text-gray-600">Plan Shopping Cart</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <div className="text-right">
                                        <div className="font-medium text-gray-900">
                                          {formatCurrency(calculatePlanTotal(plan))}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                          {plan.trades.length} trade{plan.trades.length !== 1 ? 's' : ''}
                                        </div>
                                      </div>
                                      {expandedPlans.has(plan.id) ? (
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                      ) : (
                                        <ChevronRight className="h-4 w-4 text-gray-500" />
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Trade Level - Individual shopping cart items within each PLAN */}
                                {expandedPlans.has(plan.id) && (
                                  <div className="bg-gray-50 pl-16 border-l-4 border-purple-100">
                                    {plan.trades.map((trade) => (
                                      <div key={trade.id} className="p-3 bg-white border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded flex items-center justify-center ${
                                              trade.type === 'buy' ? 'bg-green-100' : 'bg-red-100'
                                            }`}>
                                              {trade.type === 'buy' ? (
                                                <TrendingUp className="h-2 w-2 text-green-600" />
                                              ) : (
                                                <TrendingDown className="h-2 w-2 text-red-600" />
                                              )}
                                            </div>
                                            <div>
                                              <div className="font-medium text-gray-900">
                                                {trade.type === 'buy' ? 'Buy' : 'Sell'} {trade.shares} shares of {trade.symbol}
                                              </div>
                                              <div className="text-sm text-gray-600">
                                                @ {formatCurrency(trade.price)} per share
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <div className="text-right">
                                              <div className="font-semibold text-gray-900">
                                                {formatCurrency(trade.total)}
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-6 w-6 p-0"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  alert('Add more shares - feature coming soon!')
                                                }}
                                              >
                                                <Plus className="h-3 w-3" />
                                              </Button>
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-6 w-6 p-0"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  alert('Remove shares - feature coming soon!')
                                                }}
                                              >
                                                <Minus className="h-3 w-3" />
                                              </Button>
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  alert('Remove from cart - feature coming soon!')
                                                }}
                                              >
                                                <Trash2 className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Footer with totals and checkout */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-gray-50 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Total items across all advisors
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {formatCurrency(mockCartData.reduce((total, advisor) => total + calculateAdvisorTotal(advisor), 0))}
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => {
                // Mock checkout functionality
                alert('Checkout feature coming soon!')
              }}
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Checkout All Trades
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-gray-300 hover:bg-gray-50 font-medium py-3 text-base"
              onClick={onClose}
            >
              Close Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
