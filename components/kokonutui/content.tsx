"use client"

import { 
  Clock, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Settings, 
  User, 
  ShoppingCart,
  ChevronDown,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Briefcase
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export default function Content() {
  const [activeWidgets, setActiveWidgets] = useState([
    'assets-by-plan-type',
    'assets-by-supplier', 
    'estatement-signup',
    'top-five-clients'
  ])
  const [showConfig, setShowConfig] = useState(false)

  const allWidgets = [
    { id: 'assets-by-plan-type', name: 'Assets By Plan Type', type: 'pie' },
    { id: 'assets-by-supplier', name: 'Assets By Supplier', type: 'pie' },
    { id: 'estatement-signup', name: 'eStatement Signup', type: 'donut' },
    { id: 'top-five-clients', name: 'Top Five Clients', type: 'bar' },
    { id: 'top-five-products', name: 'Top Five Products', type: 'bar' },
    { id: 'top-five-products-performance', name: 'Top Five Products Performance', type: 'line' }
  ]

  const toggleWidget = (widgetId: string) => {
    if (activeWidgets.includes(widgetId)) {
      setActiveWidgets(activeWidgets.filter(id => id !== widgetId))
    } else if (activeWidgets.length < 4) {
      setActiveWidgets([...activeWidgets, widgetId])
    }
  }

  const renderWidget = (widgetId: string) => {
    switch (widgetId) {
      case 'assets-by-plan-type':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-900">Assets By Plan Type</h3>
            </div>
            <div className="flex-1 flex items-center justify-center mb-3">
              <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 78% 0%, 78% 50%)' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400" style={{ clipPath: 'polygon(50% 50%, 78% 50%, 78% 0%, 100% 0%, 100% 50%)' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">RRSP</span>
                </div>
                <span className="font-medium">28%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">RRIF</span>
                </div>
                <span className="font-medium">20%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">OPEN</span>
                </div>
                <span className="font-medium">16%</span>
              </div>
            </div>
          </div>
        )
      case 'assets-by-supplier':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-900">Assets By Supplier</h3>
            </div>
            <div className="flex-1 flex items-center justify-center mb-3">
              <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 77% 0%, 77% 50%)' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400" style={{ clipPath: 'polygon(50% 50%, 77% 50%, 77% 0%, 100% 0%, 100% 50%)' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">CIG</span>
                </div>
                <span className="font-medium">27%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">MMF</span>
                </div>
                <span className="font-medium">14%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700">MFC</span>
                </div>
                <span className="font-medium">14%</span>
              </div>
            </div>
          </div>
        )
      case 'estatement-signup':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-900">eStatement Signup</h3>
            </div>
            <div className="flex-1 flex items-center justify-center mb-3">
              <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white"></div>
                </div>
                <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-green-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)' }}></div>
                <div className="absolute inset-0 w-24 h-24 rounded-full bg-gray-200" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">eStatement</span>
                </div>
                <span className="font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-gray-700">Mail Delivery</span>
                </div>
                <span className="font-medium">75%</span>
              </div>
            </div>
          </div>
        )
      case 'top-five-clients':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-900">Top Five Clients</h3>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-16 h-3 bg-blue-600 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-gray-900">Sharma, Melanie</div>
                  <div className="text-gray-500">~$1.7M</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-3 bg-green-500 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-gray-900">Martinez, Neil</div>
                  <div className="text-gray-500">~$550K</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-3 bg-purple-600 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-gray-900">Salinas, Gus</div>
                  <div className="text-gray-500">~$400K</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-3 bg-orange-500 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-gray-900">Mueller, Oliver</div>
                  <div className="text-gray-500">~$300K</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-3 bg-red-500 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-gray-900">Robertson, Name</div>
                  <div className="text-gray-500">~$250K</div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'top-five-products':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-900">Top Five Products</h3>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-16 h-3 bg-blue-600 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-gray-900">MANULIFE DIVIDEND INCOME FUND</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-14 h-3 bg-green-500 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-gray-900">CI MONEY MARKET FUND</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-3 bg-purple-600 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-gray-900">NBI ALTAMIRA CASHPERFORMER ACCOUNT</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-3 bg-orange-500 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-gray-900">CI CANADIAN DIVIDEND FUND A ISC</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-3 bg-red-500 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-gray-900">CI HIGH INCOME FUND A ISC</div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'top-five-products-performance':
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-900">Top Five Products Performance</h3>
            </div>
            <div className="flex-1 flex items-center justify-center mb-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">Performance trends over time</p>
                <p className="text-xs text-gray-400 mt-1">Line chart visualization</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-700">Manulife Dividend</span>
                <span className="font-medium text-green-600">+12.5%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-700">CI Money Market</span>
                <span className="font-medium text-green-600">+8.2%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-700">NBI Altamira</span>
                <span className="font-medium text-red-600">-2.1%</span>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }
  return (
    <div className="space-y-6">

      {/* Assets Under Management */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold text-gray-900">Assets Under Management</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </div>
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total AUM */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Total AUM</h3>
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">$127.4M</p>
              <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +2.3% this month
              </p>
            </div>

            {/* Active Accounts */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Active Accounts</h3>
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-blue-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +12 new this week
              </p>
            </div>

            {/* Average Account Size */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Avg. Account Size</h3>
                <Target className="h-4 w-4 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">$102.2K</p>
              <p className="text-sm text-purple-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +5.1% vs last month
              </p>
            </div>

            {/* Fund Families */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Fund Families</h3>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-orange-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                3 new partnerships
              </p>
            </div>
          </div>

          {/* Top Fund Categories */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Top Fund Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Canadian Equity</span>
                  <span className="text-sm font-bold text-gray-900">$45.2M</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35.5%' }}></div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Fixed Income</span>
                  <span className="text-sm font-bold text-gray-900">$38.7M</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '30.4%' }}></div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">US Equity</span>
                  <span className="text-sm font-bold text-gray-900">$28.9M</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '22.7%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Widgets Section */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold text-gray-900">Charts and Analytics</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowConfig(!showConfig)}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                {showConfig ? 'Hide Configure' : 'Configure'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeWidgets.map((widgetId) => (
              <div key={widgetId}>
                {renderWidget(widgetId)}
              </div>
            ))}
          </div>

          {/* Widget Configuration Panel */}
          {showConfig && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Widget Configuration ({activeWidgets.length}/4 Active)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {allWidgets.map((widget) => (
                  <Button
                    key={widget.id}
                    variant={activeWidgets.includes(widget.id) ? "default" : "outline"}
                    size="sm"
                    className="justify-start text-xs"
                    onClick={() => toggleWidget(widget.id)}
                    disabled={!activeWidgets.includes(widget.id) && activeWidgets.length >= 4}
                  >
                    <TrendingUp className="h-3 w-3 mr-2" />
                    {widget.name}
                    {activeWidgets.includes(widget.id) && (
                      <CheckCircle className="h-3 w-3 ml-auto" />
                    )}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Click widgets to toggle them on/off. Maximum 4 widgets can be active at once.
              </p>
            </div>
          )}
        </CardContent>
      </Card>



      {/* Work In Progress */}
      <Card className="border border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold text-gray-900">Work In Progress</CardTitle>
              <Briefcase className="h-4 w-4 text-gray-500" />
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          

          {/* Work Categories */}
          <div className="flex gap-3">
            {/* Trading */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow w-64 h-80 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">Trading</h3>
              </div>
              <div className="flex-1 space-y-2">
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-red-600 border border-gray-300 hover:border-red-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">Unsubmitted Trades</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">2</span>
                </Button>
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-green-600 border border-gray-300 hover:border-green-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">Submit a Trade</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">0</span>
                </Button>
              </div>
            </div>

            {/* Account Opening */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow w-64 h-80 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">Account Opening</h3>
              </div>
              <div className="flex-1 space-y-2">
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-yellow-600 border border-gray-300 hover:border-yellow-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">My Drafts</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">12</span>
                </Button>
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-blue-600 border border-gray-300 hover:border-blue-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">Submitted for Review</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">0</span>
                </Button>
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-yellow-600 border border-gray-300 hover:border-yellow-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">Ensemble Drafts</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">6</span>
                </Button>
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-orange-600 border border-gray-300 hover:border-orange-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">Awaiting Ensemble Response</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">4</span>
                </Button>
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-green-600 border border-gray-300 hover:border-green-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">Imported from Ensemble</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">4</span>
                </Button>
              </div>
            </div>

            {/* KYC Update */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow w-64 h-80 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">KYC Update</h3>
              </div>
              <div className="flex-1 space-y-2">
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-yellow-600 border border-gray-300 hover:border-yellow-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">My Drafts</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">12</span>
                </Button>
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-blue-600 border border-gray-300 hover:border-blue-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">Submitted for Review</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">0</span>
                </Button>
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-red-600 border border-gray-300 hover:border-red-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">Denied Review</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">3</span>
                </Button>
              </div>
            </div>

            {/* Client Approval */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow w-64 h-80 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">Client Approval</h3>
              </div>
              <div className="flex-1 space-y-2">
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-yellow-600 border border-gray-300 hover:border-yellow-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">My Drafts</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">0</span>
                </Button>
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-blue-600 border border-gray-300 hover:border-blue-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">Sent to Client</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">0</span>
                </Button>
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-red-600 border border-gray-300 hover:border-red-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">Expired</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">13</span>
                </Button>
              </div>
            </div>

            {/* Faxing */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow w-64 h-80 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">Faxing</h3>
              </div>
              <div className="flex-1 space-y-2">
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-yellow-600 border border-gray-300 hover:border-yellow-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">My Drafts</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">5</span>
                </Button>
                <Button className="w-full flex items-center justify-between p-2 text-xs bg-white hover:bg-red-600 border border-gray-300 hover:border-red-600 hover:text-white h-8 transition-colors group">
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">Fax Error</span>
                  <span className="text-gray-700 group-hover:text-white text-xs font-medium">5</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Button */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  )
}
