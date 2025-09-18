"use client"

import { useState } from "react"
import { 
  ChevronUp,
  ChevronDown,
  Building2,
  Calendar,
  DollarSign,
  Hash,
  Filter
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface SupplierAccount {
  id: number
  supplier: string
  accountNumber: string
  startDate: string
  endDate: string | null
  marketValue: number
  isActive: boolean
  accountType: string
  currency: string
}

const mockSupplierAccounts: SupplierAccount[] = [
  {
    id: 1,
    supplier: "FID",
    accountNumber: "59592949",
    startDate: "11/18/2014",
    endDate: null,
    marketValue: 0.00,
    isActive: true,
    accountType: "Investment Account",
    currency: "CAD"
  },
  {
    id: 2,
    supplier: "TD Waterhouse",
    accountNumber: "12345678",
    startDate: "03/15/2018",
    endDate: "12/31/2023",
    marketValue: 125000.50,
    isActive: false,
    accountType: "RRSP",
    currency: "CAD"
  },
  {
    id: 3,
    supplier: "RBC Direct Investing",
    accountNumber: "87654321",
    startDate: "07/22/2020",
    endDate: null,
    marketValue: 87500.25,
    isActive: true,
    accountType: "TFSA",
    currency: "CAD"
  },
  {
    id: 4,
    supplier: "Scotia iTrade",
    accountNumber: "11223344",
    startDate: "01/10/2019",
    endDate: null,
    marketValue: 156750.00,
    isActive: true,
    accountType: "Non-Registered",
    currency: "CAD"
  },
  {
    id: 5,
    supplier: "CIBC Investor's Edge",
    accountNumber: "55667788",
    startDate: "09/05/2021",
    endDate: "06/30/2024",
    marketValue: 0.00,
    isActive: false,
    accountType: "RESP",
    currency: "CAD"
  }
]

type SortField = 'supplier' | 'accountNumber' | 'startDate' | 'endDate' | 'marketValue'
type SortDirection = 'asc' | 'desc'

export default function SupplierAccounts() {
  const [includeInactive, setIncludeInactive] = useState(false)
  const [sortField, setSortField] = useState<SortField>('supplier')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  // Filter data based on include inactive setting
  const filteredData = includeInactive 
    ? mockSupplierAccounts 
    : mockSupplierAccounts.filter(account => account.isActive)

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    let aValue: string | number
    let bValue: string | number

    switch (sortField) {
      case 'supplier':
        aValue = a.supplier.toLowerCase()
        bValue = b.supplier.toLowerCase()
        break
      case 'accountNumber':
        aValue = a.accountNumber
        bValue = b.accountNumber
        break
      case 'startDate':
        aValue = new Date(a.startDate).getTime()
        bValue = new Date(b.startDate).getTime()
        break
      case 'endDate':
        aValue = a.endDate ? new Date(a.endDate).getTime() : 0
        bValue = b.endDate ? new Date(b.endDate).getTime() : 0
        break
      case 'marketValue':
        aValue = a.marketValue
        bValue = b.marketValue
        break
      default:
        aValue = a.supplier.toLowerCase()
        bValue = b.supplier.toLowerCase()
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
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

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronUp className="h-4 w-4 text-gray-400" />
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-gray-600" />
      : <ChevronDown className="h-4 w-4 text-gray-600" />
  }

  const getStatusBadge = (isActive: boolean) => {
    return isActive 
      ? <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
      : <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Inactive</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Building2 className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supplier Accounts</h1>
          <p className="text-gray-600">Manage client supplier account information and market values</p>
        </div>
      </div>

      {/* Controls */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Filter className="h-5 w-5 text-blue-600" />
              Account Controls
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-inactive" 
                  checked={includeInactive}
                  onCheckedChange={(checked) => setIncludeInactive(checked as boolean)}
                />
                <label 
                  htmlFor="include-inactive" 
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Include Inactive
                </label>
              </div>
              <Button variant="outline" size="sm" className="bg-blue-50 hover:bg-blue-100 border-blue-200">
                <Building2 className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Total</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{mockSupplierAccounts.length}</div>
          <div className="text-xs text-gray-500 mt-1">Supplier Accounts</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-green-50 via-white to-green-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <Hash className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Active</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{mockSupplierAccounts.filter(a => a.isActive).length}</div>
          <div className="text-xs text-gray-500 mt-1">Active Accounts</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Inactive</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{mockSupplierAccounts.filter(a => !a.isActive).length}</div>
          <div className="text-xs text-gray-500 mt-1">Inactive Accounts</div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 via-white to-purple-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Total Value</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(mockSupplierAccounts.reduce((sum, account) => sum + account.marketValue, 0))}
          </div>
          <div className="text-xs text-gray-500 mt-1">Market Value</div>
        </div>
      </div>

      {/* Supplier Accounts Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Building2 className="h-5 w-5 text-blue-600" />
            Supplier Accounts ({sortedData.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80">
                    <TableHead 
                      className="font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('supplier')}
                    >
                      <div className="flex items-center gap-2">
                        Supplier
                        {getSortIcon('supplier')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('accountNumber')}
                    >
                      <div className="flex items-center gap-2">
                        Account Number
                        {getSortIcon('accountNumber')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('startDate')}
                    >
                      <div className="flex items-center gap-2">
                        Start Date
                        {getSortIcon('startDate')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('endDate')}
                    >
                      <div className="flex items-center gap-2">
                        End Date
                        {getSortIcon('endDate')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold text-right cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('marketValue')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        Market Value
                        {getSortIcon('marketValue')}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Account Type</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.map((account) => (
                    <TableRow 
                      key={account.id}
                      className="hover:bg-blue-50/50 transition-all duration-200"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{account.supplier}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm text-gray-700">{account.accountNumber}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">{formatDate(account.startDate)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">
                          {account.endDate ? formatDate(account.endDate) : '-'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`font-semibold ${account.marketValue > 0 ? 'text-green-700' : 'text-gray-500'}`}>
                          {formatCurrency(account.marketValue)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(account.isActive)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">{account.accountType}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-colors">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-green-100 transition-colors">
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
