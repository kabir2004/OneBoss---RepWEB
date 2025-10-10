"use client"

import { useState } from "react"
import { LockClosedIcon } from "@heroicons/react/24/outline"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

interface TrustDepositsDialogProps {
  planId: string
  planDetails?: string
  userRole: "client" | "advisor" | "admin"
  isOpen: boolean
  onClose: () => void
}

// Bank-specific data configuration
const bankData = {
  BMO: {
    accounts: [
      { currency: "CAD", settled: 6000.0, unsettled: 0.0, total: 6000.0 },
      { currency: "USD", settled: 0.0, unsettled: 0.0, total: 0.0 },
    ],
    recentActivity: "2 deposits, $6,000 total, last on 2025-10-01",
    fundedAmount: 6000,
    transactions: [
      {
        securityId: "MD-154 (5656140455)",
        status: "Completed",
        amount: 5000.0,
        salesTax: 250.0,
        platformFee: 50.0,
        balance: 5200.0,
      },
      {
        securityId: "MD-155 (5656140456)",
        status: "Pending",
        amount: 1000.0,
        salesTax: 50.0,
        platformFee: 10.0,
        balance: 1040.0,
      },
    ],
  },
  CIBC: {
    accounts: [
      { currency: "CAD", settled: 4000.0, unsettled: 0.0, total: 4000.0 },
      { currency: "USD", settled: 0.0, unsettled: 0.0, total: 0.0 },
    ],
    recentActivity: "1 deposit, $4,000 total, last on 2025-10-01",
    fundedAmount: 4000,
    transactions: [
      {
        securityId: "MD-156 (5656140457)",
        status: "Completed",
        amount: 3500.0,
        salesTax: 175.0,
        platformFee: 35.0,
        balance: 3640.0,
      },
      {
        securityId: "MD-157 (5656140458)",
        status: "Pending",
        amount: 500.0,
        salesTax: 25.0,
        platformFee: 5.0,
        balance: 520.0,
      },
    ],
  },
  TD: {
    accounts: [
      { currency: "USD", settled: 0.0, unsettled: 0.0, total: 0.0 },
      { currency: "CAD", settled: 0.0, unsettled: 0.0, total: 0.0 },
    ],
    recentActivity: "No recent activity",
    fundedAmount: 0,
    transactions: [
      {
        securityId: "N/A",
        status: "N/A",
        amount: 0.0,
        salesTax: 0.0,
        platformFee: 0.0,
        balance: 0.0,
      },
    ],
  },
}

export default function TrustDepositsDialog({
  planId,
  planDetails = "RESP Education Savings Plan - Account: 3238677748 - Family Plan - Smith, John",
  userRole,
  isOpen,
  onClose,
}: TrustDepositsDialogProps) {
  const [selectedBank, setSelectedBank] = useState<string>("")
  const [showDepositDialog, setShowDepositDialog] = useState(false)

  // Reset state when dialog closes
  const handleClose = (open: boolean) => {
    if (!open) {
      setSelectedBank("") // Reset bank selection when closing
      setShowDepositDialog(false)
      onClose()
    }
  }

  // Get selected bank data
  const selectedBankData = selectedBank
    ? bankData[selectedBank as keyof typeof bankData]
    : null

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <>
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <LockClosedIcon className="w-5 h-5 text-blue-600 mr-2" />
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Trust Accounts
            </DialogTitle>
          </div>

          {/* Subheader - Only show when bank is selected */}
          {selectedBank ? (
            <div className="space-y-2">
              <div className="flex items-center flex-wrap gap-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {planDetails}
                </h3>
                <Badge variant="secondary" className="ml-2">Active</Badge>
              </div>
              <p className="text-xs text-gray-500">
                Last Updated: October 10, 2025, 11:11 AM EDT
              </p>
              <p className="text-sm text-gray-600">
                Managed by: Marsha Antoine, ID: 9823-2222
              </p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-semibold text-gray-500">
                Please select a bank
              </p>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-4 my-4">
          {/* Bank Selection Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Bank Account
            </label>
            <Select value={selectedBank} onValueChange={setSelectedBank}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a bank..." />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectItem value="BMO">BMO</SelectItem>
                <SelectItem value="CIBC">CIBC</SelectItem>
                <SelectItem value="TD">TD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Conditional Account Details */}
          {selectedBank && selectedBankData && (
            <>
              {/* Action Buttons - Show only when bank is selected */}
              <div className="flex gap-2">
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 mr-2"
                  onClick={() => setShowDepositDialog(true)}
                >
                  Deposit
                </Button>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  disabled
                >
                  Transfer
                </Button>
              </div>

              <Tabs defaultValue="aggregates" className="w-full">
              <TabsList className="w-full justify-start border-b">
                <TabsTrigger value="aggregates" className="text-purple-600">
                  Aggregates
                </TabsTrigger>
                {/* Hide Breakdown tab for client/advisor roles */}
                {userRole === "admin" && (
                  <TabsTrigger value="breakdown" className="text-purple-600">
                    Breakdown
                  </TabsTrigger>
                )}
              </TabsList>

              {/* Aggregates Tab */}
              <TabsContent value="aggregates" className="space-y-4 mt-4">
                <Table className="w-full border-collapse">
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead className="text-blue-800 border border-gray-200 p-2">
                        Currency
                      </TableHead>
                      <TableHead className="text-blue-800 border border-gray-200 p-2">
                        Settled
                      </TableHead>
                      <TableHead className="text-blue-800 border border-gray-200 p-2">
                        Unsettled
                      </TableHead>
                      <TableHead className="text-blue-800 border border-gray-200 p-2">
                        Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedBankData.accounts.map((account, index) => (
                      <TableRow key={index}>
                        <TableCell className="border border-gray-200 p-2 font-medium">
                          {account.currency}
                        </TableCell>
                        <TableCell className="border border-gray-200 p-2">
                          {formatCurrency(account.settled)}
                        </TableCell>
                        <TableCell className="border border-gray-200 p-2">
                          {formatCurrency(account.unsettled)}
                        </TableCell>
                        <TableCell className="border border-gray-200 p-2 font-semibold">
                          {formatCurrency(account.total)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Recent Activity: {selectedBankData.recentActivity}
                  </p>
                </div>
              </TabsContent>

              {/* Breakdown Tab (Admin Only) */}
              {userRole === "admin" && (
                <TabsContent value="breakdown" className="space-y-4 mt-4">
                  {/* Bank Account Overview */}
                  <Table className="w-full border-collapse">
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="text-blue-800 border border-gray-200 p-2">
                          Bank
                        </TableHead>
                        <TableHead className="text-blue-800 border border-gray-200 p-2">
                          Currency
                        </TableHead>
                        <TableHead className="text-blue-800 border border-gray-200 p-2">
                          Balance
                        </TableHead>
                        <TableHead className="text-blue-800 border border-gray-200 p-2">
                          Last Tx Date
                        </TableHead>
                        <TableHead className="text-blue-800 border border-gray-200 p-2">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="border border-gray-200 p-2 font-medium">
                          {selectedBank}
                        </TableCell>
                        <TableCell className="border border-gray-200 p-2">
                          CAD
                        </TableCell>
                        <TableCell className="border border-gray-200 p-2 font-semibold">
                          {formatCurrency(selectedBankData.fundedAmount)}
                        </TableCell>
                        <TableCell className="border border-gray-200 p-2">
                          2025-10-01
                        </TableCell>
                        <TableCell className="border border-gray-200 p-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:bg-blue-100"
                                  disabled
                                >
                                  View
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Admin action pending backend integration</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  {/* Transaction History */}
                  <div className="mt-4">
                    <h4 className="text-md font-semibold text-gray-800 mt-2 mb-2">
                      History
                    </h4>
                    <Table className="w-full border-collapse">
                      <TableHeader>
                        <TableRow className="bg-blue-50">
                          <TableHead className="text-blue-800 border border-gray-200 p-2">
                            Security ID
                          </TableHead>
                          <TableHead className="text-blue-800 border border-gray-200 p-2">
                            Status
                          </TableHead>
                          <TableHead className="text-blue-800 border border-gray-200 p-2">
                            Amount
                          </TableHead>
                          <TableHead className="text-blue-800 border border-gray-200 p-2">
                            Sales Tax
                          </TableHead>
                          <TableHead className="text-blue-800 border border-gray-200 p-2">
                            Platform Fee
                          </TableHead>
                          <TableHead className="text-blue-800 border border-gray-200 p-2">
                            Balance
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedBankData.transactions.map((tx, index) => (
                          <TableRow key={index}>
                            <TableCell className="border border-gray-200 p-2 text-sm">
                              {tx.securityId}
                            </TableCell>
                            <TableCell className="border border-gray-200 p-2">
                              <Badge
                                variant={
                                  tx.status === "Completed"
                                    ? "default"
                                    : tx.status === "Pending"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="text-xs"
                              >
                                {tx.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="border border-gray-200 p-2">
                              {formatCurrency(tx.amount)}
                            </TableCell>
                            <TableCell className="border border-gray-200 p-2">
                              {formatCurrency(tx.salesTax)}
                            </TableCell>
                            <TableCell className="border border-gray-200 p-2">
                              {formatCurrency(tx.platformFee)}
                            </TableCell>
                            <TableCell className="border border-gray-200 p-2 font-semibold">
                              {formatCurrency(tx.balance)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Admin Note */}
                  <p className="text-sm text-gray-600 mt-2">
                    This breakdown shows individual bank account allocations.
                    Clients and advisors see only the aggregated total balance.
                  </p>
                </TabsContent>
              )}
              </Tabs>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>

    {/* Deposit Dialog with higher z-index - overlays on top of main dialog */}
    <DialogPrimitive.Root open={showDepositDialog} onOpenChange={setShowDepositDialog} modal={false}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[101] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight">
              Make a Deposit - {selectedBank}
            </DialogPrimitive.Title>
          </div>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-gray-600">
              {planDetails}
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Currency</label>
              <Select defaultValue="CAD">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[102]">
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => {
                  // Handle deposit logic here
                  setShowDepositDialog(false)
                }}
              >
                Confirm Deposit
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDepositDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </div>

          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  </>
  )
}
