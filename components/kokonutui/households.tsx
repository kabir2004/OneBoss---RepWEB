"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Home,
  Users,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Search,
  FileText,
  TrendingUp,
  CheckSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockHouseholds = [
  {
    id: "HH001",
    name: "Johnson Family",
    primaryClient: "Robert Johnson",
    members: ["Robert Johnson", "Sarah Johnson", "Emily Johnson"],
    totalAssets: 750000,
    accounts: 4,
    status: "active",
    createdDate: "2023-01-15",
    lastReview: "2024-08-15"
  },
  {
    id: "HH002", 
    name: "Smith Household",
    primaryClient: "Michael Smith",
    members: ["Michael Smith", "Jennifer Smith"],
    totalAssets: 425000,
    accounts: 2,
    status: "active",
    createdDate: "2022-06-10",
    lastReview: "2024-07-22"
  },
  {
    id: "HH003",
    name: "Williams Trust",
    primaryClient: "David Williams",
    members: ["David Williams", "Lisa Williams", "James Williams", "Emma Williams"],
    totalAssets: 1250000,
    accounts: 6,
    status: "active",
    createdDate: "2021-03-20",
    lastReview: "2024-09-01"
  },
  {
    id: "HH004",
    name: "Brown Estate",
    primaryClient: "Patricia Brown",
    members: ["Patricia Brown"],
    totalAssets: 180000,
    accounts: 1,
    status: "pending_review",
    createdDate: "2024-01-08",
    lastReview: "2024-05-12"
  }
]

export default function Households() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHousehold, setSelectedHousehold] = useState<string | null>(null)

  const filteredHouseholds = mockHouseholds.filter(household =>
    household.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    household.primaryClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    household.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalHouseholds = mockHouseholds.length
  const activeHouseholds = mockHouseholds.filter(h => h.status === 'active').length
  const totalAssets = mockHouseholds.reduce((sum, h) => sum + h.totalAssets, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Home className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Household Management</h1>
          <p className="text-gray-600">Manage client households and family groups</p>
        </div>
      </div>

      {/* Statistics Overview - Compact Vercel-like Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Total</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalHouseholds}</div>
          <div className="text-xs text-gray-500 mt-1">Households</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-sm font-medium text-gray-600">Active</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{activeHouseholds}</div>
          <div className="text-xs text-gray-500 mt-1">Households</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 via-white to-purple-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Assets</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalAssets)}</div>
          <div className="text-xs text-gray-500 mt-1">Total Value</div>
        </div>
      </div>

      {/* Main Content - Full Width Layout */}
      <div className={`grid gap-6 ${selectedHousehold ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
        <div className={selectedHousehold ? 'lg:col-span-3 space-y-6' : 'space-y-6'}>
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-purple-600" />
                  Households Overview
                </CardTitle>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 transition-all duration-200 hover:scale-105">
                  <Plus className="h-4 w-4 mr-2" />
                  New Household
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search households by name, ID, or primary client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-all duration-200"
                  />
                </div>
                <div className="flex items-center gap-2 mt-3 p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                  <p className="text-xs text-purple-700">
                    <strong>Section Search:</strong> Find households by name, ID, or primary client. Use sidebar for global client search.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/80">
                      <TableHead className="font-semibold">Household ID</TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Primary Client</TableHead>
                      <TableHead className="font-semibold">Members</TableHead>
                      <TableHead className="font-semibold">Total Assets</TableHead>
                      <TableHead className="font-semibold">Accounts</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHouseholds.map((household) => (
                      <TableRow
                        key={household.id}
                        className={`cursor-pointer hover:bg-purple-50/50 transition-all duration-200 ${
                          selectedHousehold === household.id 
                            ? 'bg-purple-50 border-l-4 border-l-purple-500' 
                            : 'hover:border-l-4 hover:border-l-purple-200'
                        }`}
                        onClick={() => setSelectedHousehold(selectedHousehold === household.id ? null : household.id)}
                      >
                        <TableCell className="font-medium">{household.id}</TableCell>
                        <TableCell className="font-medium text-gray-900">{household.name}</TableCell>
                        <TableCell>{household.primaryClient}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {household.members.length} {household.members.length === 1 ? 'member' : 'members'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{formatCurrency(household.totalAssets)}</TableCell>
                        <TableCell>{household.accounts}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(household.status)}>
                            {household.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="hover:bg-purple-100 transition-colors">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:bg-red-100 text-red-600 transition-colors">
                              <Trash2 className="h-3 w-3" />
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

        {selectedHousehold && (
          <div className="space-y-6">
            <Card className="border border-purple-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-50/50 border-b border-purple-100">
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-purple-600" />
                  Household Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {(() => {
                  const household = mockHouseholds.find(h => h.id === selectedHousehold)
                  if (!household) return null
                  
                  return (
                    <div className="space-y-4">
                      <div className="group relative overflow-hidden rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-purple-50/30 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-100/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative">
                          <div className="text-sm text-purple-600 font-medium mb-1">Household Name</div>
                          <div className="font-bold text-purple-900 text-lg">{household.name}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Primary Client</div>
                          <div className="font-medium text-gray-900">{household.primaryClient}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-2">Members ({household.members.length})</div>
                          <div className="space-y-1">
                            {household.members.map((member, index) => (
                              <div key={index} className="text-sm bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                                {member}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-3 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                          <div className="text-sm text-gray-500">Total Assets</div>
                          <div className="font-bold text-gray-900 text-lg group-hover:text-purple-700 transition-colors">{formatCurrency(household.totalAssets)}</div>
                        </div>
                        <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-3 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                          <div className="text-sm text-gray-500">Accounts</div>
                          <div className="font-bold text-gray-900 text-lg group-hover:text-purple-700 transition-colors">{household.accounts}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-2 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Created</span>
                          <span className="font-medium">{new Date(household.createdDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Last Review</span>
                          <span className="font-medium">{new Date(household.lastReview).toLocaleDateString()}</span>
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