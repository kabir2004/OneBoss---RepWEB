"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Eye
} from 'lucide-react'

// Types
interface Approval {
  id: string
  description: string
  dateCreated: string
  dateCompleted: string | null
  type: string
  status: 'Pending' | 'Completed' | 'Cancelled'
  createdFrom: string
}

interface ClientApprovalsProps {
  clientId: string
  clientName: string
}

// Mock approval data
const mockApprovals: Approval[] = [
  {
    id: 'APV-001',
    description: '',
    dateCreated: '04/08/2019 14:29',
    dateCompleted: null,
    type: 'Client Portal Approval',
    status: 'Cancelled',
    createdFrom: 'KYC'
  },
  {
    id: 'APV-002',
    description: 'Annual Review Approval',
    dateCreated: '03/15/2024 09:30',
    dateCompleted: '03/16/2024 11:45',
    type: 'Annual Review',
    status: 'Completed',
    createdFrom: 'Annual Review Process'
  },
  {
    id: 'APV-003',
    description: 'Investment Strategy Change',
    dateCreated: '02/28/2024 14:20',
    dateCompleted: null,
    type: 'Investment Approval',
    status: 'Pending',
    createdFrom: 'Portfolio Management'
  },
  {
    id: 'APV-004',
    description: 'Risk Assessment Update',
    dateCreated: '01/10/2024 16:15',
    dateCompleted: '01/12/2024 10:30',
    type: 'Risk Assessment',
    status: 'Completed',
    createdFrom: 'Risk Management'
  },
  {
    id: 'APV-005',
    description: '',
    dateCreated: '12/05/2023 13:45',
    dateCompleted: null,
    type: 'Document Verification',
    status: 'Cancelled',
    createdFrom: 'Compliance'
  },
  {
    id: 'APV-006',
    description: 'Account Opening Approval',
    dateCreated: '11/20/2023 08:30',
    dateCompleted: '11/22/2023 15:20',
    type: 'Account Setup',
    status: 'Completed',
    createdFrom: 'New Account Process'
  },
  {
    id: 'APV-007',
    description: 'Transfer Authorization',
    dateCreated: '10/15/2023 12:00',
    dateCompleted: null,
    type: 'Transfer Approval',
    status: 'Pending',
    createdFrom: 'Transfer Operations'
  },
  {
    id: 'APV-008',
    description: '',
    dateCreated: '09/08/2023 11:30',
    dateCompleted: null,
    type: 'Client Portal Approval',
    status: 'Cancelled',
    createdFrom: 'KYC'
  }
]

// Status configuration
const STATUS_CONFIG = {
  Pending: { 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    dotColor: 'bg-yellow-500'
  },
  Completed: { 
    color: 'bg-green-100 text-green-800 border-green-200',
    dotColor: 'bg-green-500'
  },
  Cancelled: { 
    color: 'bg-red-100 text-red-800 border-red-200',
    dotColor: 'bg-red-500'
  }
} as const

export default function ClientApprovals({ clientId, clientName }: ClientApprovalsProps) {
  const [includeCompleted, setIncludeCompleted] = useState(false)
  const [includeCancelled, setIncludeCancelled] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [sortField, setSortField] = useState<keyof Approval | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // Filter approvals based on checkboxes
  const filteredApprovals = mockApprovals.filter(approval => {
    if (approval.status === 'Completed' && !includeCompleted) return false
    if (approval.status === 'Cancelled' && !includeCancelled) return false
    return true
  })

  // Sort approvals
  const sortedApprovals = [...filteredApprovals].sort((a, b) => {
    if (!sortField) return 0
    
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (aValue === null || aValue === '') return 1
    if (bValue === null || bValue === '') return -1
    
    const comparison = String(aValue).localeCompare(String(bValue))
    return sortDirection === 'asc' ? comparison : -comparison
  })

  // Pagination
  const totalPages = Math.ceil(sortedApprovals.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedApprovals = sortedApprovals.slice(startIndex, endIndex)

  const handleSort = (field: keyof Approval) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data
    console.log('Refreshing approvals data...')
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    return dateString
  }

  const getSortIcon = (field: keyof Approval) => {
    if (sortField !== field) {
      return <ChevronUp className="h-4 w-4 text-gray-400" />
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 text-blue-600" /> : 
      <ChevronDown className="h-4 w-4 text-blue-600" />
  }

  const getStatusBadge = (status: Approval['status']) => {
    const config = STATUS_CONFIG[status]
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
          {status}
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-completed" 
                  checked={includeCompleted}
                  onCheckedChange={setIncludeCompleted}
                />
                <label htmlFor="include-completed" className="text-sm font-medium">
                  Include Completed
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-cancelled" 
                  checked={includeCancelled}
                  onCheckedChange={setIncludeCancelled}
                />
                <label htmlFor="include-cancelled" className="text-sm font-medium">
                  Include Canceled
                </label>
              </div>
            </div>
            
            <Button onClick={handleRefresh} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Approvals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Approvals</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Top Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">Page {currentPage}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Items per page:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('description')}
                  >
                    <div className="flex items-center gap-2">
                      Description
                      {getSortIcon('description')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('dateCreated')}
                  >
                    <div className="flex items-center gap-2">
                      Date Created
                      {getSortIcon('dateCreated')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('dateCompleted')}
                  >
                    <div className="flex items-center gap-2">
                      Date Completed
                      {getSortIcon('dateCompleted')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('type')}
                  >
                    <div className="flex items-center gap-2">
                      Type
                      {getSortIcon('type')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-2">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('createdFrom')}
                  >
                    <div className="flex items-center gap-2">
                      Created From
                      {getSortIcon('createdFrom')}
                    </div>
                  </TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedApprovals.map((approval) => (
                  <TableRow key={approval.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {approval.description || '-'}
                    </TableCell>
                    <TableCell>
                      {formatDate(approval.dateCreated)}
                    </TableCell>
                    <TableCell>
                      {formatDate(approval.dateCompleted)}
                    </TableCell>
                    <TableCell>
                      {approval.type}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(approval.status)}
                    </TableCell>
                    <TableCell>
                      {approval.createdFrom}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Bottom Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">Page {currentPage}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Items per page:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
