"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  FileText,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  PieChart,
  BarChart3,
  Users,
  DollarSign,
  Clock,
  Eye,
  Search,
  CheckSquare,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const reportCategories = [
  {
    id: "assets",
    name: "Assets",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    hoverColor: "hover:border-emerald-300",
    reports: [
      { name: "Advisor Assets By Supplier", description: "Asset breakdown by fund supplier" },
      { name: "Assets By Client", description: "Client-specific asset overview" },
      { name: "Assets By Household", description: "Household consolidated assets" },
      { name: "ETF Account List", description: "Exchange-traded fund accounts" },
      { name: "Historical Advisor Assets By Supplier", description: "Historical supplier asset trends" },
      { name: "Historical Assets By Client", description: "Historical client asset data" },
      { name: "Historical Book Value", description: "Book value historical analysis" }
    ]
  },
  {
    id: "client_reporting",
    name: "Client Reporting",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    hoverColor: "hover:border-blue-300",
    reports: [
      { name: "Asset Mix", description: "Portfolio asset allocation breakdown" },
      { name: "Cash Balance", description: "Client cash position reports" },
      { name: "Consolidated Charges And Compensation", description: "Fee and compensation summary" },
      { name: "Consolidated Plan Performance", description: "Plan performance metrics" },
      { name: "Consolidated Year Over Year Plan Performance", description: "YoY performance comparison" },
      { name: "Transaction Summary", description: "Transaction activity overview" },
      { name: "Portfolio Summary Reports", description: "Comprehensive portfolio summaries" },
      { name: "Retirement Savings", description: "Retirement account analysis" },
      { name: "Rebalance Instructions", description: "Portfolio rebalancing guidance" }
    ]
  },
  {
    id: "client_lists",
    name: "Client Lists",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    hoverColor: "hover:border-purple-300",
    reports: [
      { name: "Client List And Labels", description: "Labeled client directories" },
      { name: "Client List CRM Export", description: "CRM system export format" },
      { name: "Client List Equisoft Export", description: "Equisoft platform export" },
      { name: "Client List Vcard Export", description: "Contact card export format" },
      { name: "Client List Vision Systems Export", description: "Vision Systems integration export" }
    ]
  },
  {
    id: "client_management",
    name: "Client Management",
    icon: Users,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    hoverColor: "hover:border-indigo-300",
    reports: [
      { name: "Unassigned CDIC Unique Identifiers", description: "Unlinked CDIC identifiers" },
      { name: "Pinned Documents", description: "Client document attachments" },
      { name: "DSC Funds In Nominee Plans", description: "Deferred sales charge analysis" },
      { name: "Expired KYCs", description: "Know Your Customer renewal tracking" },
      { name: "Gain/Loss Search", description: "Capital gains/losses analysis" },
      { name: "GICs", description: "Guaranteed Investment Certificates" },
      { name: "KYC Uniformity", description: "KYC compliance standardization" },
      { name: "PAC/SWP Instructions", description: "Pre-authorized/systematic withdrawal plans" },
      { name: "Plan List", description: "Comprehensive plan directory" },
      { name: "Plan List Fee Schedule", description: "Plan-specific fee structures" },
      { name: "Plan List KYC", description: "Plan KYC compliance status" },
      { name: "Sector Concentration Risk", description: "Portfolio sector risk analysis" },
      { name: "Trust Transaction List", description: "Trust account transaction history" },
      { name: "Unsubmitted Batch Transactions", description: "Pending batch transaction queue" }
    ]
  },
  {
    id: "system",
    name: "System & Management",
    icon: BarChart3,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    hoverColor: "hover:border-orange-300",
    reports: [
      { name: "Queued Reports", description: "Report generation queue" },
      { name: "Report History", description: "Previously generated reports" },
      { name: "Report Schedules", description: "Automated report scheduling" },
      { name: "Work Groups", description: "Team and group management" }
    ]
  }
]

const recentReports = [
  {
    id: "RPT001",
    name: "Monthly Portfolio Summary - Johnson",
    type: "Portfolio Report",
    generatedDate: "2024-09-01",
    status: "completed",
    size: "2.4 MB",
    format: "PDF"
  },
  {
    id: "RPT002", 
    name: "Q3 Performance Analysis - All Clients",
    type: "Performance Report",
    generatedDate: "2024-08-30",
    status: "completed", 
    size: "5.7 MB",
    format: "Excel"
  },
  {
    id: "RPT003",
    name: "Tax Summary 2024 - Williams Trust",
    type: "Client Report",
    generatedDate: "2024-08-28",
    status: "processing",
    size: "1.2 MB",
    format: "PDF"
  },
  {
    id: "RPT004",
    name: "Compliance Review - August 2024",
    type: "Regulatory Report",
    generatedDate: "2024-08-25",
    status: "completed",
    size: "3.1 MB",
    format: "PDF"
  }
]

export default function Reports() {
  const router = useRouter()
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState("")
  const [reportFormat, setReportFormat] = useState("")
  
  // Calculate statistics
  const totalReports = reportCategories.reduce((sum, category) => sum + category.reports.length, 0)
  const totalCategories = reportCategories.length
  const completedReports = recentReports.filter(r => r.status === 'completed').length
  
  // Filter reports based on search term
  const filteredCategories = reportCategories.map(category => ({
    ...category,
    reports: category.reports.filter(report => 
      !searchTerm || 
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.reports.length > 0 || !searchTerm)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <BarChart3 className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and manage client reports</p>
        </div>
      </div>

      {/* Statistics Overview - Compact Vercel-like Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 via-white to-green-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <FileText className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Total</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalReports}</div>
          <div className="text-xs text-gray-500 mt-1">Report Types</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Categories</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalCategories}</div>
          <div className="text-xs text-gray-500 mt-1">Available</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 via-white to-purple-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-sm font-medium text-gray-600">Recent</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{completedReports}</div>
          <div className="text-xs text-gray-500 mt-1">Completed</div>
        </div>
      </div>

      {/* Main Content - Full Width Layout */}
      <div className={`grid gap-6 ${selectedReportType ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
        <div className={selectedReportType ? 'lg:col-span-3 space-y-6' : 'space-y-6'}>
          
          {/* Search and Categories */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Report Categories
                </CardTitle>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search reports by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 border-gray-200 focus:border-green-300 focus:ring-green-200 transition-all duration-200"
                  />
                </div>
                <div className="flex items-center gap-2 mt-3 p-3 bg-green-50/50 rounded-lg border border-green-100">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="text-xs text-green-700">
                    <strong>Section Search:</strong> Find reports by name or description. Use sidebar for global client search.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Card
                      key={category.id}
                      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${category.borderColor} ${category.hoverColor} ${
                        selectedReportType === category.id 
                          ? `ring-2 ring-green-500 ${category.bgColor}` 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedReportType(
                        selectedReportType === category.id ? null : category.id
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${category.bgColor} group-hover:scale-105 transition-transform duration-200`}>
                            <Icon className={`h-5 w-5 ${category.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                            <p className="text-xs text-gray-500 mb-2">{category.reports.length} report{category.reports.length !== 1 ? 's' : ''} available</p>
                            <div className="space-y-1 max-h-20 overflow-hidden">
                              {category.reports.slice(0, 3).map((report, index) => (
                                <div key={index} className="text-xs text-gray-600 truncate">
                                  • {report.name}
                                </div>
                              ))}
                              {category.reports.length > 3 && (
                                <div className="text-xs text-gray-500">
                                  +{category.reports.length - 3} more...
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {selectedReportType && (
            <Card className="border border-green-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-50/50 border-b border-green-100">
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-green-600" />
                  Generate Report
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Date Range</label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger className="border-gray-200 focus:border-green-300 focus:ring-green-200">
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                        <SelectItem value="last_quarter">Last Quarter</SelectItem>
                        <SelectItem value="last_6_months">Last 6 Months</SelectItem>
                        <SelectItem value="last_year">Last Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Format</label>
                    <Select value={reportFormat} onValueChange={setReportFormat}>
                      <SelectTrigger className="border-gray-200 focus:border-green-300 focus:ring-green-200">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/80">
                      <TableHead className="font-semibold">Report ID</TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Generated</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Size</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReports.map((report) => (
                      <TableRow key={report.id} className="hover:bg-green-50/50 transition-colors duration-200">
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell className="font-medium text-gray-900">{report.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.type}</Badge>
                        </TableCell>
                        <TableCell>{new Date(report.generatedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{report.size}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="hover:bg-green-100 transition-colors">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" disabled={report.status !== 'completed'} className="hover:bg-blue-100 transition-colors">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {selectedReportType && (
          <div className="space-y-6">
            <Card className="border border-green-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-50/50 border-b border-green-100">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Category Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {(() => {
                  const selectedCategory = reportCategories.find(c => c.id === selectedReportType)
                  if (!selectedCategory) return null
                  
                  return (
                    <div className="space-y-4">
                      <div className="group relative overflow-hidden rounded-xl border border-green-200 bg-gradient-to-br from-green-50 via-white to-green-50/30 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-green-100/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative">
                          <div className="text-sm text-green-600 font-medium mb-1">Category</div>
                          <div className="font-bold text-green-900 text-lg">{selectedCategory.name}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-2">Available Reports ({selectedCategory.reports.length})</div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {selectedCategory.reports.map((report, index) => (
                            <div key={index} className="group p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all duration-200 cursor-pointer">
                              <div className="font-medium text-gray-900 text-sm mb-1">{report.name}</div>
                              <div className="text-xs text-gray-600">{report.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}