"use client"

import { useState } from "react"
import { 
  RefreshCw,
  ChevronUp,
  ChevronDown,
  DollarSign,
  Calendar,
  Tag
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CompensationRecord {
  id: number
  date: string
  type: string
  amount: number
}

const mockCompensationData: CompensationRecord[] = [
  // Empty for now to show "No records found"
]

type SortField = 'date' | 'type' | 'amount'
type SortDirection = 'asc' | 'desc'

export default function CustomCompensation() {
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronUp className="h-4 w-4 text-gray-400" />
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-gray-600" />
      : <ChevronDown className="h-4 w-4 text-gray-600" />
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">

      {/* Table */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/80">
                <TableHead 
                  className="font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    Date
                    {getSortIcon('date')}
                  </div>
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    Type
                    {getSortIcon('type')}
                  </div>
                </TableHead>
                <TableHead 
                  className="font-semibold text-right cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center justify-end gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    Amount
                    {getSortIcon('amount')}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCompensationData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-12">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <DollarSign className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="text-gray-500 text-lg">No custom compensation records found</div>
                      <div className="text-gray-400 text-sm">Add compensation records to see them here</div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                mockCompensationData.map((record) => (
                  <TableRow key={record.id} className="hover:bg-purple-50/50 transition-all duration-200">
                    <TableCell>
                      <span className="text-sm text-gray-700">{formatDate(record.date)}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">{record.type}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-green-700">{formatCurrency(record.amount)}</span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-blue-200"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Add Record Button */}
      <div className="flex justify-center">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <DollarSign className="h-4 w-4 mr-2" />
          Add Compensation Record
        </Button>
      </div>
    </div>
  )
}
