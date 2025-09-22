"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ChevronDown,
  ChevronRight,
  FileText,
  BarChart3,
  Calculator,
  TrendingUp,
  PieChart,
  User
} from 'lucide-react'

// Types
interface ReportItem {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: 'portfolio' | 'performance' | 'analysis' | 'tools'
}

interface ClientReportsProps {
  clientId: string
  clientName: string
}

// Report data
const reportItems: ReportItem[] = [
  {
    id: 'portfolio-summary',
    name: 'Portfolio Summary Report',
    description: 'Comprehensive overview of client portfolio holdings and performance',
    icon: FileText,
    category: 'portfolio'
  },
  {
    id: 'crm2-performance',
    name: 'CRM2 Performance Report',
    description: 'Client Relationship Model 2 performance metrics and compliance',
    icon: BarChart3,
    category: 'performance'
  },
  {
    id: 'portfolio-position',
    name: 'Portfolio Position Report',
    description: 'Detailed breakdown of current portfolio positions and allocations',
    icon: PieChart,
    category: 'portfolio'
  },
  {
    id: 'quick-summary',
    name: 'Quick Summary Report',
    description: 'Condensed summary of key portfolio metrics and performance',
    icon: FileText,
    category: 'portfolio'
  },
  {
    id: 'year-over-year',
    name: 'Year Over Year Plan Performance Report',
    description: 'Comparative analysis of plan performance across different time periods',
    icon: TrendingUp,
    category: 'performance'
  },
  {
    id: 'plan-performance',
    name: 'Plan Performance Report',
    description: 'Detailed performance analysis of individual investment plans',
    icon: BarChart3,
    category: 'performance'
  },
  {
    id: 'capital-gain',
    name: 'Capital Gain',
    description: 'Capital gains and losses analysis for tax reporting purposes',
    icon: TrendingUp,
    category: 'analysis'
  },
  {
    id: 'charges-compensation',
    name: 'Charges And Compensation Report',
    description: 'Detailed breakdown of fees, charges, and compensation structures',
    icon: Calculator,
    category: 'analysis'
  },
  {
    id: 'tfsa-calculator',
    name: 'Tax-Free Savings Accounts Calculator',
    description: 'Interactive calculator for TFSA contribution limits and optimization',
    icon: Calculator,
    category: 'tools'
  },
  {
    id: 'systematic-payments',
    name: 'Systematic Payments Summary Report',
    description: 'Analysis of systematic investment plans and payment schedules',
    icon: TrendingUp,
    category: 'analysis'
  },
  {
    id: 'retirement-savings',
    name: 'Retirement Savings Report',
    description: 'Comprehensive retirement planning and savings analysis',
    icon: PieChart,
    category: 'analysis'
  },
  {
    id: 'asset-mix',
    name: 'Asset Mix',
    description: 'Current asset allocation and diversification analysis',
    icon: PieChart,
    category: 'portfolio'
  },
  {
    id: 'client-profiler',
    name: 'Client Profiler',
    description: 'Risk assessment and client profiling for investment suitability',
    icon: User,
    category: 'tools'
  }
]

// Category configuration
const categoryConfig = {
  portfolio: { color: 'bg-blue-50 text-blue-700', label: 'Portfolio Reports' },
  performance: { color: 'bg-green-50 text-green-700', label: 'Performance Reports' },
  analysis: { color: 'bg-purple-50 text-purple-700', label: 'Analysis Reports' },
  tools: { color: 'bg-orange-50 text-orange-700', label: 'Tools & Calculators' }
}

export default function ClientReports({ clientId, clientName }: ClientReportsProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['portfolio']))
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const handleReportClick = (reportId: string) => {
    setSelectedReport(reportId)
  }

  // Group reports by category
  const reportsByCategory = reportItems.reduce((acc, report) => {
    if (!acc[report.category]) {
      acc[report.category] = []
    }
    acc[report.category].push(report)
    return acc
  }, {} as Record<string, ReportItem[]>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">Client Reports</h1>
          <p className="text-muted-foreground">Generate and view reports for {clientName}</p>
        </div>
      </div>

      {/* Reports by Category */}
      <div className="space-y-4">
        {Object.entries(reportsByCategory).map(([category, reports]) => (
          <Card key={category} className="border border-border shadow-sm">
            <CardHeader 
              className={`${categoryConfig[category as keyof typeof categoryConfig].color} cursor-pointer hover:opacity-80 transition-opacity`}
              onClick={() => toggleCategory(category)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {expandedCategories.has(category) ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                  <CardTitle className="text-lg font-semibold">
                    {categoryConfig[category as keyof typeof categoryConfig].label}
                  </CardTitle>
                </div>
                <span className="text-sm font-medium">{reports.length} reports</span>
              </div>
            </CardHeader>
            
            {expandedCategories.has(category) && (
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200">
                  {reports.map((report) => {
                    const Icon = report.icon
                    return (
                      <div
                        key={report.id}
                        className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
                          selectedReport === report.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                        }`}
                        onClick={() => handleReportClick(report.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-card-foreground">{report.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Click to generate
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Report Preview/Generation Area */}
      {selectedReport && (
        <Card className="border border-blue-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-blue-100">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              {reportItems.find(r => r.id === selectedReport)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Report Generation
              </h3>
              <p className="text-muted-foreground mb-6">
                {reportItems.find(r => r.id === selectedReport)?.description}
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Generate Report
                </Button>
                <Button variant="outline">
                  Preview Sample
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
