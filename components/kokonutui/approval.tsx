"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Users,
  FileText,
  Search,
  TrendingUp,
  CheckSquare,
  FileSignature,
  Plus,
  Eye,
  PenTool,
  Check,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockApprovalData = [
  {
    id: 1,
    type: "approval",
    module: "Account Opening",
    clientName: "Johnson",
    clientSurname: "Robert",
    clientId: "CL001",
    startDate: "2024-09-01",
    endDate: "2024-09-15",
    status: "pending",
    description: "New RRSP Account Application",
    assignedTo: "Manager Smith"
  },
  {
    id: 2,
    type: "esignature",
    module: "Investment Agreement",
    clientName: "Wilson",
    clientSurname: "Emma",
    clientId: "CL002",
    startDate: "2024-09-02",
    endDate: "2024-09-16",
    status: "signed",
    description: "Investment Advisory Agreement",
    assignedTo: "Advisor Davis"
  },
  {
    id: 3,
    type: "approval",
    module: "Fund Transfer",
    clientName: "Smith",
    clientSurname: "Michael",
    clientId: "CL003",
    startDate: "2024-08-30",
    endDate: "2024-09-13",
    status: "approved",
    description: "Inter-account Transfer Request",
    assignedTo: "Operations Team"
  },
  {
    id: 4,
    type: "esignature",
    module: "KYC Update",
    clientName: "Brown",
    clientSurname: "Sarah",
    clientId: "CL004",
    startDate: "2024-09-03",
    endDate: "2024-09-17",
    status: "pending_signature",
    description: "Know Your Customer Documentation",
    assignedTo: "Compliance Officer"
  },
  {
    id: 5,
    type: "approval",
    module: "Withdrawal Request",
    clientName: "Davis",
    clientSurname: "James",
    clientId: "CL005",
    startDate: "2024-08-28",
    endDate: "2024-09-11",
    status: "rejected",
    description: "Emergency Withdrawal Application",
    assignedTo: "Senior Manager"
  },
  {
    id: 6,
    type: "esignature",
    module: "Fee Agreement",
    clientName: "Miller",
    clientSurname: "Lisa",
    clientId: "CL006",
    startDate: "2024-09-04",
    endDate: "2024-09-18",
    status: "expired",
    description: "Fee Schedule Agreement",
    assignedTo: "Account Manager"
  },
  {
    id: 7,
    type: "approval",
    module: "Risk Assessment",
    clientName: "Taylor",
    clientSurname: "David",
    clientId: "CL007",
    startDate: "2024-09-05",
    endDate: "2024-09-19",
    status: "under_review",
    description: "Investment Risk Profile Update",
    assignedTo: "Risk Manager"
  },
  {
    id: 8,
    type: "esignature",
    module: "Plan Amendment",
    clientName: "Anderson",
    clientSurname: "Jennifer",
    clientId: "CL008",
    startDate: "2024-09-01",
    endDate: "2024-09-15",
    status: "signed",
    description: "Retirement Plan Amendment",
    assignedTo: "Plan Administrator"
  }
]

export default function Approval() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedItem, setSelectedItem] = useState<typeof mockApprovalData[0] | null>(null)

  // Filter data based on search and filters
  const filteredData = mockApprovalData.filter(item => {
    const matchesSearch = !searchTerm || 
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientSurname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !statusFilter || item.status === statusFilter
    const matchesType = !typeFilter || item.type === typeFilter
    const matchesStartDate = !startDate || new Date(item.startDate) >= new Date(startDate)
    const matchesEndDate = !endDate || new Date(item.endDate) <= new Date(endDate)
    
    return matchesSearch && matchesStatus && matchesType && matchesStartDate && matchesEndDate
  })

  // Calculate statistics
  const totalItems = mockApprovalData.length
  const pendingApprovals = mockApprovalData.filter(item => item.status === 'pending').length
  const pendingSignatures = mockApprovalData.filter(item => item.status === 'pending_signature').length
  const completedItems = mockApprovalData.filter(item => item.status === 'approved' || item.status === 'signed').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'under_review':
        return 'bg-blue-100 text-blue-800'
      case 'signed':
        return 'bg-green-100 text-green-800'
      case 'pending_signature':
        return 'bg-orange-100 text-orange-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'approval':
        return 'bg-blue-100 text-blue-800'
      case 'esignature':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-3 w-3 text-yellow-600 mr-1" />
      case 'approved':
        return <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
      case 'rejected':
        return <XCircle className="h-3 w-3 text-red-600 mr-1" />
      case 'under_review':
        return <AlertCircle className="h-3 w-3 text-blue-600 mr-1" />
      case 'signed':
        return <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
      case 'pending_signature':
        return <PenTool className="h-3 w-3 text-orange-600 mr-1" />
      case 'expired':
        return <XCircle className="h-3 w-3 text-gray-600 mr-1" />
      default:
        return <Clock className="h-3 w-3 text-gray-600 mr-1" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckSquare className="h-3 w-3 text-blue-600 mr-1" />
      case 'esignature':
        return <FileSignature className="h-3 w-3 text-purple-600 mr-1" />
      default:
        return <FileText className="h-3 w-3 text-gray-600 mr-1" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <CheckSquare className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Approval & eSignature Management</h1>
          <p className="text-gray-600">Review and process client approvals and electronic signatures</p>
        </div>
      </div>

      {/* Statistics Overview - Clean Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Total</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalItems}</div>
          <div className="text-xs text-gray-500 mt-1">Items</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-amber-50 via-white to-amber-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Pending</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{pendingApprovals}</div>
          <div className="text-xs text-gray-500 mt-1">Approvals</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 via-white to-purple-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <PenTool className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Signatures</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{pendingSignatures}</div>
          <div className="text-xs text-gray-500 mt-1">Pending</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Completed</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{completedItems}</div>
          <div className="text-xs text-gray-500 mt-1">Items</div>
        </div>
      </div>

      {/* Main Content - Full Width Layout */}
      <div className={`grid gap-6 ${selectedItem ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
        <div className={selectedItem ? 'lg:col-span-3 space-y-6' : 'space-y-6'}>
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-green-600" />
                  Approval & eSignature Overview
                </CardTitle>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105">
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search approvals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="signed">Signed</option>
                    <option value="pending_signature">Pending Signature</option>
                    <option value="under_review">Under Review</option>
                    <option value="expired">Expired</option>
                  </select>

                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="approval">Approval</option>
                    <option value="esignature">eSignature</option>
                  </select>

                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />

                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center gap-2 mt-3 p-3 bg-green-50/50 rounded-lg border border-green-100">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="text-xs text-green-700">
                    <strong>Section Search:</strong> Filter approvals and eSignatures by status, type, or date range.
                  </p>
                </div>
              </div>

              {/* Data Table */}
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Surname</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <tr 
                        key={item.id} 
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.startDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.endDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                            {getTypeIcon(item.type)}
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.clientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.clientSurname}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.module}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {(item.status === 'pending' || item.status === 'pending_signature' || item.status === 'under_review') && (
                              <>
                                <button className="text-green-600 hover:text-green-900">
                                  <Check className="h-4 w-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            )}
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conditional Right Sidebar */}
        {selectedItem && (
          <div className="space-y-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedItem.type === 'approval' ? 'Approval Details' : 'eSignature Details'}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Client Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm">
                        <div className="font-medium">{selectedItem.clientName} {selectedItem.clientSurname}</div>
                        <div className="text-gray-500">Module: {selectedItem.module}</div>
                        <div className="text-gray-500">ID: {selectedItem.clientId}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm">
                        {selectedItem.description}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Timeline</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Start Date:</span>
                          <span>{selectedItem.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">End Date:</span>
                          <span>{selectedItem.endDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Assigned To:</span>
                          <span>{selectedItem.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Status</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                      {getStatusIcon(selectedItem.status)}
                      {selectedItem.status}
                    </span>
                  </div>

                  {(selectedItem.status === 'pending' || selectedItem.status === 'pending_signature' || selectedItem.status === 'under_review') && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center justify-center">
                          <Check className="h-4 w-4 mr-2" />
                          {selectedItem.type === 'approval' ? 'Approve' : 'Sign'}
                        </button>
                        <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center justify-center">
                          <X className="h-4 w-4 mr-2" />
                          {selectedItem.type === 'approval' ? 'Reject' : 'Decline'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}