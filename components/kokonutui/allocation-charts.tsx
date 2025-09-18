"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AllocationData {
  name: string
  value: number
  color: string
}

interface AllocationChartsProps {
  className?: string
}

const geographicAllocationData: AllocationData[] = [
  { name: 'Canada', value: 37.27, color: '#3B82F6' },
  { name: 'United States', value: 33.55, color: '#10B981' },
  { name: 'European Union', value: 12.23, color: '#F59E0B' },
  { name: 'All Others', value: 4.81, color: '#8B5CF6' },
  { name: 'Asia/Pacific Rim', value: 4.15, color: '#EF4444' },
  { name: 'Other', value: 3.13, color: '#06B6D4' },
  { name: 'Japan', value: 3.09, color: '#84CC16' },
  { name: 'Latin America', value: 1.76, color: '#F97316' }
]

const assetAllocationData: AllocationData[] = [
  { name: 'US Equity', value: 25.08, color: '#3B82F6' },
  { name: 'International Equity', value: 22.61, color: '#10B981' },
  { name: 'Canadian Equity', value: 20.67, color: '#F59E0B' },
  { name: 'Domestic Bonds', value: 15.76, color: '#8B5CF6' },
  { name: 'Foreign Bonds', value: 10.39, color: '#EF4444' },
  { name: 'Cash and Equivalents', value: 3.14, color: '#06B6D4' },
  { name: 'Other', value: 1.74, color: '#84CC16' },
  { name: 'All Others', value: 0.61, color: '#F97316' }
]

const sectorAllocationData: AllocationData[] = [
  { name: 'Technology', value: 28.5, color: '#3B82F6' },
  { name: 'Financial Services', value: 18.2, color: '#10B981' },
  { name: 'Healthcare', value: 12.8, color: '#F59E0B' },
  { name: 'Consumer Discretionary', value: 11.5, color: '#8B5CF6' },
  { name: 'Industrials', value: 9.7, color: '#EF4444' },
  { name: 'Energy', value: 6.3, color: '#06B6D4' },
  { name: 'Materials', value: 5.2, color: '#84CC16' },
  { name: 'Utilities', value: 3.8, color: '#F97316' },
  { name: 'Consumer Staples', value: 2.8, color: '#EC4899' },
  { name: 'Real Estate', value: 2.0, color: '#14B8A6' }
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="font-medium text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-600">{data.value}%</p>
      </div>
    )
  }
  return null
}

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-700">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function AllocationCharts({ className }: AllocationChartsProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Charts Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Geographic Allocation */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-blue-100 pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-900 text-sm">
              <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
              Geographic Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={geographicAllocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={1}
                      dataKey="value"
                    >
                      {geographicAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {geographicAllocationData.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700 truncate">{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-medium">{item.value}%</span>
                  </div>
                ))}
                {geographicAllocationData.length > 4 && (
                  <div className="text-xs text-gray-500 text-center pt-1">
                    +{geographicAllocationData.length - 4} more
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-50/50 border-b border-green-100 pb-3">
            <CardTitle className="flex items-center gap-2 text-green-900 text-sm">
              <div className="w-5 h-5 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              Asset Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={assetAllocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={1}
                      dataKey="value"
                    >
                      {assetAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {assetAllocationData.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700 truncate">{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-medium">{item.value}%</span>
                  </div>
                ))}
                {assetAllocationData.length > 4 && (
                  <div className="text-xs text-gray-500 text-center pt-1">
                    +{assetAllocationData.length - 4} more
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sector Allocation */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-50/50 border-b border-orange-100 pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-900 text-sm">
              <div className="w-5 h-5 bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
              </div>
              Sector Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={sectorAllocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={1}
                      dataKey="value"
                    >
                      {sectorAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {sectorAllocationData.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700 truncate">{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-medium">{item.value}%</span>
                  </div>
                ))}
                {sectorAllocationData.length > 4 && (
                  <div className="text-xs text-gray-500 text-center pt-1">
                    +{sectorAllocationData.length - 4} more
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown Section */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-100">
          <CardTitle className="text-gray-900 text-sm">Detailed Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Geographic Details */}
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-900 text-sm border-b border-blue-100 pb-1">Geographic</h4>
              <div className="space-y-2">
                {geographicAllocationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Asset Details */}
            <div className="space-y-3">
              <h4 className="font-semibold text-green-900 text-sm border-b border-green-100 pb-1">Asset</h4>
              <div className="space-y-2">
                {assetAllocationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sector Details */}
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-900 text-sm border-b border-orange-100 pb-1">Sector</h4>
              <div className="space-y-2">
                {sectorAllocationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
