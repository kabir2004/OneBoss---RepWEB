"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  HelpCircle,
  Printer,
  ZoomIn,
  PieChart,
  BarChart3,
  TrendingUp
} from 'lucide-react'

// Types
interface ChartData {
  label: string
  value: number
  percentage: number
  color: string
}

interface AllocationData {
  equity: ChartData[]
  geographic: ChartData[]
  asset: ChartData[]
  sector: ChartData[]
}

interface ClientChartsProps {
  clientId: string
  clientName: string
}

// Mock data for allocations
const allocationData: AllocationData = {
  equity: [
    { label: 'FID-253', value: 48568.64, percentage: 38.94, color: '#FFD700' },
    { label: 'FID-269', value: 30265.27, percentage: 24.27, color: '#FF6B6B' },
    { label: 'FID-225', value: 28455.06, percentage: 22.81, color: '#4ECDC4' },
    { label: 'FID-234', value: 9977.41, percentage: 8.00, color: '#FF9FF3' },
    { label: 'FID-265', value: 7460.02, percentage: 5.98, color: '#54A0FF' }
  ],
  geographic: [
    { label: 'United States', value: 48702.08, percentage: 39.05, color: '#2ECC71' },
    { label: 'Canada', value: 48407.44, percentage: 38.81, color: '#E74C3C' },
    { label: 'European Union', value: 12649.38, percentage: 10.14, color: '#3498DB' },
    { label: 'Asia/Pacific Rim', value: 4265.72, percentage: 3.42, color: '#1ABC9C' },
    { label: 'Japan', value: 3649.51, percentage: 2.93, color: '#9B59B6' },
    { label: 'All Others', value: 3588.29, percentage: 2.88, color: '#95A5A6' },
    { label: 'Latin America', value: 1725.36, percentage: 1.38, color: '#E67E22' },
    { label: 'Other', value: 1738.63, percentage: 1.39, color: '#34495E' }
  ],
  asset: [
    { label: 'US Equity', value: 43586.28, percentage: 34.95, color: '#FFD700' },
    { label: 'Canadian Equity', value: 40348.94, percentage: 32.35, color: '#87CEEB' },
    { label: 'International Equity', value: 24405.15, percentage: 19.57, color: '#4169E1' },
    { label: 'Domestic Bonds', value: 6734.97, percentage: 5.40, color: '#90EE90' },
    { label: 'Foreign Bonds', value: 4554.28, percentage: 3.65, color: '#FF6B6B' },
    { label: 'Cash and Equivalents', value: 3660.40, percentage: 2.93, color: '#FFB6C1' },
    { label: 'All Others', value: 539.95, percentage: 0.43, color: '#D3D3D3' },
    { label: 'Other', value: 896.44, percentage: 0.72, color: '#696969' }
  ],
  sector: [
    { label: 'All Others', value: 34200.00, percentage: 27.44, color: '#95A5A6' },
    { label: 'Technology', value: 24150.00, percentage: 19.37, color: '#FFD700' },
    { label: 'Financial Services', value: 17425.00, percentage: 13.99, color: '#E74C3C' },
    { label: 'Consumer Services', value: 12275.00, percentage: 9.85, color: '#FF9FF3' },
    { label: 'Consumer Goods', value: 12150.00, percentage: 9.75, color: '#87CEEB' },
    { label: 'Fixed Income', value: 11275.00, percentage: 9.05, color: '#FFB6C1' },
    { label: 'Energy', value: 6875.00, percentage: 5.51, color: '#4169E1' },
    { label: 'Basic Materials', value: 6275.00, percentage: 5.04, color: '#90EE90' }
  ]
}

// Mock financial metrics
const financialMetrics = {
  startDate: { marketValue: 0.00, netInvested: null, gain: null, rateOfReturn: null },
  endDate: { marketValue: 124726.40, netInvested: 62090.19, gain: 62636.21, rateOfReturn: 7.79 }
}

// Pie Chart Component
const PieChartComponent: React.FC<{ data: ChartData[], title: string }> = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="relative w-64 h-64 mx-auto mb-4">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const angle = (percentage / 100) * 360
            const startAngle = data.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.value / total) * 360, 0)
            
            const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180)
            const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180)
            const x2 = 100 + 80 * Math.cos(((startAngle + angle) * Math.PI) / 180)
            const y2 = 100 + 80 * Math.sin(((startAngle + angle) * Math.PI) / 180)
            
            const largeArcFlag = angle > 180 ? 1 : 0
            
            return (
              <path
                key={item.label}
                d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={item.color}
                stroke="white"
                strokeWidth="2"
              />
            )
          })}
        </svg>
      </div>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded" 
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}</span>
            </div>
            <span className="font-medium">{item.percentage.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Allocation Table Component
const AllocationTable: React.FC<{ data: ChartData[] }> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.value - a.value)
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.label} className="border-b border-gray-200">
              <td className="py-2 pr-4">{item.label}</td>
              <td className="py-2 pr-4 text-right">{item.percentage.toFixed(2)}%</td>
              <td className="py-2 text-right font-medium">
                ${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ClientCharts({ clientId, clientName }: ClientChartsProps) {
  const [zoomPan, setZoomPan] = useState(false)
  const [selectedPlans, setSelectedPlans] = useState(['RRSP', 'RESP'])
  
  // Debug log to verify component is rendering
  console.log('ClientCharts rendering for:', clientName)
  
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return ''
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Debug Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-900">Charts Component Loaded</h2>
        <p className="text-sm text-blue-700">Client: {clientName} (ID: {clientId})</p>
      </div>
      
      <Tabs defaultValue="smart-charts" className="space-y-6">
        {/* Header with Tabs */}
        <div className="flex items-center justify-between">
        <div className="flex-1">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="smart-charts" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Smart Charts
              <HelpCircle className="h-3 w-3" />
            </TabsTrigger>
            <TabsTrigger value="allocations" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Allocations
              <HelpCircle className="h-3 w-3" />
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox 
              id="zoom-pan" 
              checked={zoomPan}
              onCheckedChange={setZoomPan}
            />
            <label htmlFor="zoom-pan" className="text-sm">Zoom & Pan</label>
          </div>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Smart Charts Tab */}
      <TabsContent value="smart-charts" className="space-y-6">
        {/* Client Name */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{clientName}</h1>
        </div>

        {/* Financial Metrics Table */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Date</th>
                  <th className="text-right py-2">Market Value</th>
                  <th className="text-right py-2">Net Invested</th>
                  <th className="text-right py-2">Gain</th>
                  <th className="text-right py-2">Rate of Return</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2">May 19, 2008</td>
                  <td className="text-right py-2">{formatCurrency(financialMetrics.startDate.marketValue)}</td>
                  <td className="text-right py-2">{formatCurrency(financialMetrics.startDate.netInvested)}</td>
                  <td className="text-right py-2">{formatCurrency(financialMetrics.startDate.gain)}</td>
                  <td className="text-right py-2">{financialMetrics.startDate.rateOfReturn || ''}</td>
                </tr>
                <tr>
                  <td className="py-2">Sep 16, 2025</td>
                  <td className="text-right py-2">{formatCurrency(financialMetrics.endDate.marketValue)}</td>
                  <td className="text-right py-2">{formatCurrency(financialMetrics.endDate.netInvested)}</td>
                  <td className="text-right py-2">{formatCurrency(financialMetrics.endDate.gain)}</td>
                  <td className="text-right py-2">{financialMetrics.endDate.rateOfReturn}%</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Plan Selection */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Investment Plans</CardTitle>
              <div className="flex gap-4 text-sm">
                <button className="text-blue-600 hover:underline">Select All</button>
                <button className="text-blue-600 hover:underline">Select None</button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rrsp" 
                  checked={selectedPlans.includes('RRSP')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedPlans([...selectedPlans, 'RRSP'])
                    } else {
                      setSelectedPlans(selectedPlans.filter(p => p !== 'RRSP'))
                    }
                  }}
                />
                <label htmlFor="rrsp" className="text-sm">RRSP 4761482531 rrsp - pac</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="resp" 
                  checked={selectedPlans.includes('RESP')}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedPlans([...selectedPlans, 'RESP'])
                    } else {
                      setSelectedPlans(selectedPlans.filter(p => p !== 'RESP'))
                    }
                  }}
                />
                <label htmlFor="resp" className="text-sm">RESP Family 3238677748 Education Savings Family</label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date Range Selection */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm text-gray-600">Start Date:</label>
                <div className="flex gap-2 mt-1">
                  <Select defaultValue="May">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="June">June</SelectItem>
                      <SelectItem value="July">July</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="19">
                    <SelectTrigger className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="19">19</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="21">21</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="2008">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2008">2008</SelectItem>
                      <SelectItem value="2009">2009</SelectItem>
                      <SelectItem value="2010">2010</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">End Date:</label>
                <div className="flex gap-2 mt-1">
                  <Select defaultValue="September">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="September">Sep</SelectItem>
                      <SelectItem value="October">Oct</SelectItem>
                      <SelectItem value="November">Nov</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="16">
                    <SelectTrigger className="w-16">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16">16</SelectItem>
                      <SelectItem value="17">17</SelectItem>
                      <SelectItem value="18">18</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="2025">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Growth Chart Placeholder */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Growth Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Chart</h3>
                <p className="text-gray-600">Interactive chart showing portfolio growth from 2008 to 2025</p>
                <p className="text-sm text-gray-500 mt-2">Market Value: $0 → $124,726.40</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Allocations Tab */}
      <TabsContent value="allocations" className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Asset Allocations</h1>
        </div>

        {/* Top Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <PieChartComponent data={allocationData.equity} title="Equity Product Allocation" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <PieChartComponent data={allocationData.geographic} title="Geographic Allocation" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <PieChartComponent data={allocationData.asset} title="Asset Allocation" />
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row - Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Equity Product Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <AllocationTable data={allocationData.equity} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Geographic Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <AllocationTable data={allocationData.geographic} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <AllocationTable data={allocationData.asset} />
            </CardContent>
          </Card>
        </div>

        {/* Sector Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <PieChartComponent data={allocationData.sector} title="Sector Allocation" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sector Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <AllocationTable data={allocationData.sector} />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      </Tabs>
    </div>
  )
}
