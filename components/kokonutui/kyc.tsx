"use client"

import { useState } from "react"
import { 
  RefreshCw,
  CheckCircle,
  Clock,
  Eye,
  AlertTriangle,
  BarChart3,
  Target,
  TrendingUp,
  Shield,
  Calendar,
  DollarSign
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface KYCInfo {
  kycOnFileDate: string
  kycAge: number
  riskDistribution: {
    low: number
    lowMedium: number
    medium: number
    mediumHigh: number
    high: number
  }
  investmentObjective: {
    safety: number
    income: number
    growth: number
    speculation: number
  }
  timeHorizon: string
  exemptProducts: boolean
  objectiveTypeOverride: string
}

interface KYCHistory {
  id: number
  dateCreated: string
  status: 'Completed' | 'Pending' | 'In Progress'
  dateSubmitted: string
}

const mockKYCInfo: KYCInfo = {
  kycOnFileDate: "02/12/2025",
  kycAge: 217,
  riskDistribution: {
    low: 0,
    lowMedium: 40,
    medium: 60,
    mediumHigh: 0,
    high: 0
  },
  investmentObjective: {
    safety: 0,
    income: 0,
    growth: 100,
    speculation: 0
  },
  timeHorizon: "10 to <20 years",
  exemptProducts: false,
  objectiveTypeOverride: "Not Set"
}

const mockKYCHistory: KYCHistory[] = [
  {
    id: 1,
    dateCreated: "02/12/2025",
    status: "Completed",
    dateSubmitted: "02/12/2025 16:29"
  },
  {
    id: 2,
    dateCreated: "04/08/2019",
    status: "Completed",
    dateSubmitted: "07/25/2019 13:00"
  }
]

const riskChartData = [
  { category: 'L', actual: 0, kyc: 0 },
  { category: 'LM', actual: 72, kyc: 40 },
  { category: 'M', actual: 28, kyc: 60 },
  { category: 'MH', actual: 0, kyc: 0 },
  { category: 'H', actual: 0, kyc: 0 }
]

const objectiveChartData = [
  { category: 'Safety', actual: 0, kyc: 0 },
  { category: 'Income', actual: 36, kyc: 0 },
  { category: 'Growth', actual: 36, kyc: 100 },
  { category: 'Speculation', actual: 28, kyc: 0 }
]

export default function KYC() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'In Progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* KYC Information Section */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-50/50 border-b border-blue-100">
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Shield className="h-5 w-5" />
            KYC Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">KYC On File Date:</span>
                <span className="text-sm text-card-foreground">{mockKYCInfo.kycOnFileDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">KYC Age:</span>
                <span className="text-sm text-card-foreground">{mockKYCInfo.kycAge} days old</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Time Horizon:</span>
                <span className="text-sm text-card-foreground">{mockKYCInfo.timeHorizon}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Objective Type Override:</span>
                <span className="text-sm text-card-foreground">{mockKYCInfo.objectiveTypeOverride}</span>
              </div>
            </div>

            {/* Risk and Investment Objective */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-card-foreground mb-3">Risk</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Low:</span>
                    <span className="text-xs font-medium">{mockKYCInfo.riskDistribution.low}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Low Medium:</span>
                    <span className="text-xs font-medium">{mockKYCInfo.riskDistribution.lowMedium}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Medium:</span>
                    <span className="text-xs font-medium">{mockKYCInfo.riskDistribution.medium}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Medium High:</span>
                    <span className="text-xs font-medium">{mockKYCInfo.riskDistribution.mediumHigh}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">High:</span>
                    <span className="text-xs font-medium">{mockKYCInfo.riskDistribution.high}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-card-foreground mb-3">Investment Objective</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Safety:</span>
                    <span className="text-xs font-medium">{mockKYCInfo.investmentObjective.safety}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Income:</span>
                    <span className="text-xs font-medium">{mockKYCInfo.investmentObjective.income}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Growth:</span>
                    <span className="text-xs font-medium">{mockKYCInfo.investmentObjective.growth}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Speculation:</span>
                    <span className="text-xs font-medium">{mockKYCInfo.investmentObjective.speculation}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkbox and Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="exempt-products" />
                <Label htmlFor="exempt-products" className="text-sm text-muted-foreground">
                  Plan KYC applies to exempt products
                </Label>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Target className="h-4 w-4 mr-2" />
                Start KYC Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Section */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-50/50 border-b border-gray-100">
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Clock className="h-5 w-5" />
            History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80">
                    <TableHead className="font-semibold">Date Created</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Date Submitted</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockKYCHistory.map((record) => (
                    <TableRow key={record.id} className="hover:bg-blue-50/50 transition-all duration-200">
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{record.dateCreated}</span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(record.status)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{record.dateSubmitted}</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-colors">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="rounded-full"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KYC Graphs Section */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-50/50 border-b border-purple-100">
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <BarChart3 className="h-5 w-5" />
            KYC Graphs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Risk Chart */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Risk</h3>
                <p className="text-sm text-gray-600">Cash Account: $0.00</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis label={{ value: 'Percent', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="actual" fill="#10b981" name="Actual Risk Distribution" />
                    <Bar dataKey="kyc" fill="#3b82f6" name="KYC Risk Tolerance" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Current Risk Score */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Current Risk Score</h3>
                <p className="text-lg font-bold text-card-foreground">Current Risk Score: 153.76</p>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Actual Risk Score</span>
                    <span>153.76</span>
                  </div>
                  <Progress value={78.5} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>KYC Risk Score Tolerance</span>
                    <span>196</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Actual Risk Score</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>KYC Risk Score Tolerance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Objectives Chart */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Investment Objectives</h3>
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-600 font-medium">WARNING: Plan's objectives are offside!</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={objectiveChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis label={{ value: 'Percent', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="actual" fill="#ef4444" name="Actual Objective Distribution" />
                  <Bar dataKey="kyc" fill="#3b82f6" name="KYC Objective Tolerance" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
