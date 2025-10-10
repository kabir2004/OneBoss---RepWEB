"use client"

import { useState } from "react"
import { Lock } from "lucide-react"
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

interface TrustDetailsDialogProps {
  planId: string
  userRole: "client" | "advisor" | "admin"
  isOpen: boolean
  onClose: () => void
}

// Mock trust account data by bank
const getBankData = (bank: string) => {
  const bankDataMap: Record<string, any> = {
    BMO: {
      aggregates: {
        cad: { settled: 6000.00, unsettled: 0.00, total: 6000.00 },
        usd: { settled: 0.00, unsettled: 0.00, total: 0.00 },
      },
      balance: 6000.00,
      currency: "CAD",
      lastTransactionDate: "2025-10-01",
      recentActivity: "2 deposits, $6,000 total, last on 2025-10-01",
      fundedRatio: "$6,000 / $42,000 funded",
      history: [
        {
          securityId: "MD-154 (5656140455)",
          status: "Completed",
          amount: 5000.00,
          salesTax: 250.00,
          platformFee: 50.00,
          balance: 5200.00,
        },
        {
          securityId: "MD-155 (5656140456)",
          status: "Pending",
          amount: 1000.00,
          salesTax: 50.00,
          platformFee: 10.00,
          balance: 1040.00,
        },
      ],
    },
    CIBC: {
      aggregates: {
        cad: { settled: 4000.00, unsettled: 0.00, total: 4000.00 },
        usd: { settled: 0.00, unsettled: 0.00, total: 0.00 },
      },
      balance: 4000.00,
      currency: "CAD",
      lastTransactionDate: "2025-09-15",
      recentActivity: "1 deposit, $4,000 total, last on 2025-09-15",
      fundedRatio: "$4,000 / $42,000 funded",
      history: [
        {
          securityId: "MD-156 (5656140457)",
          status: "Completed",
          amount: 3500.00,
          salesTax: 175.00,
          platformFee: 35.00,
          balance: 3710.00,
        },
        {
          securityId: "MD-157 (5656140458)",
          status: "Pending",
          amount: 500.00,
          salesTax: 25.00,
          platformFee: 5.00,
          balance: 530.00,
        },
      ],
    },
    TD: {
      aggregates: {
        cad: { settled: 0.00, unsettled: 0.00, total: 0.00 },
        usd: { settled: 0.00, unsettled: 0.00, total: 0.00 },
      },
      balance: 0.00,
      currency: "USD",
      lastTransactionDate: null,
      recentActivity: "No recent activity",
      fundedRatio: "$0 / $42,000 funded",
      history: [],
    },
  }
  return bankDataMap[bank] || bankDataMap.BMO
}

export default function TrustDetailsDialog({
  planId,
  userRole,
  isOpen,
  onClose,
}: TrustDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("aggregates")
  const [selectedBank, setSelectedBank] = useState<string>("")
  
  const bankData = selectedBank ? getBankData(selectedBank) : null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-6">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-blue-600" />
            <DialogTitle className="text-base sm:text-xl font-semibold text-gray-900">
              Trust Deposits
            </DialogTitle>
          </div>
          {selectedBank && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-gray-800">
                  RESP Education Savings Plan - Account: {planId} - Family Plan - Smith, John
                </p>
                <Badge variant="secondary" className="ml-2">Active</Badge>
              </div>
              <p className="text-xs text-gray-500">
                Last Updated: October 10, 2025, 11:01 AM EDT
              </p>
              <p className="text-sm text-gray-600">
                Managed by: Marsha Antoine, ID: 9823-2222
              </p>
            </div>
          )}
        </DialogHeader>

        {/* Bank Account Selector */}
        <div className="my-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Select Bank Account
          </label>
          <Select value={selectedBank} onValueChange={setSelectedBank}>
            <SelectTrigger className="w-full sm:w-[300px] bg-white">
              <SelectValue placeholder="Select a bank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BMO">BMO</SelectItem>
              <SelectItem value="CIBC">CIBC</SelectItem>
              <SelectItem value="TD">TD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Deposit and Transfer Buttons */}
        <div className="flex gap-2 my-4">
          <Button disabled className="bg-blue-600 text-white disabled:opacity-50">
            Deposit
          </Button>
          <Button disabled className="bg-blue-600 text-white disabled:opacity-50">
            Transfer
          </Button>
        </div>

        {/* Conditional Account Details - Only show when bank is selected */}
        {selectedBank && bankData && (
          <>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full bg-gray-50/50 p-1 rounded-lg" style={{ gridTemplateColumns: userRole === "admin" ? "1fr 1fr" : "1fr" }}>
            <TabsTrigger
              value="aggregates"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-600 hover:bg-white/50 transition-all duration-200 text-sm sm:text-base"
            >
              Aggregates
            </TabsTrigger>
            {/* Hide Breakdown tab for client/advisor roles */}
            {userRole === "admin" && (
              <TabsTrigger
                value="breakdown"
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-600 hover:bg-white/50 transition-all duration-200 text-sm sm:text-base"
              >
                Breakdown
              </TabsTrigger>
            )}
          </TabsList>

          {/* Aggregates Tab */}
          <TabsContent value="aggregates" className="mt-6 space-y-6">
            <div className="bg-gradient-to-r from-blue-50/50 to-blue-50/30 rounded-xl border border-blue-200/60 p-4 sm:p-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Trust Account Balance</h4>
              
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <Table className="w-full border-collapse">
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead className="font-semibold text-blue-800 text-xs sm:text-sm border border-gray-200 p-2">Currency</TableHead>
                      <TableHead className="font-semibold text-blue-800 text-right text-xs sm:text-sm border border-gray-200 p-2">Settled</TableHead>
                      <TableHead className="font-semibold text-blue-800 text-right text-xs sm:text-sm border border-gray-200 p-2">Unsettled</TableHead>
                      <TableHead className="font-semibold text-blue-800 text-right text-xs sm:text-sm border border-gray-200 p-2">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-white hover:bg-blue-50/30">
                      <TableCell className="font-medium text-sm border border-gray-200 p-2">CAD</TableCell>
                      <TableCell className="text-right text-sm border border-gray-200 p-2">
                        ${bankData.aggregates.cad.settled.toLocaleString("en-CA", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-right text-sm border border-gray-200 p-2">
                        ${bankData.aggregates.cad.unsettled.toLocaleString("en-CA", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-blue-600 text-sm border border-gray-200 p-2">
                        ${bankData.aggregates.cad.total.toLocaleString("en-CA", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white hover:bg-blue-50/30">
                      <TableCell className="font-medium text-sm border border-gray-200 p-2">USD</TableCell>
                      <TableCell className="text-right text-sm border border-gray-200 p-2">
                        ${bankData.aggregates.usd.settled.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-right text-sm border border-gray-200 p-2">
                        ${bankData.aggregates.usd.unsettled.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-blue-600 text-sm border border-gray-200 p-2">
                        ${bankData.aggregates.usd.total.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="my-4 space-y-2">
                <p className="text-sm text-gray-600">
                  Recent Activity: {bankData.recentActivity}
                </p>
                <p className="text-sm text-gray-600">
                  Trust account must be funded to make purchases.
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <Button
                  disabled
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 text-sm"
                >
                  Fund Now
                </Button>
                <p className="text-sm text-gray-600 mt-1">{bankData.fundedRatio}</p>
              </div>
            </div>
          </TabsContent>

          {/* Hide Breakdown tab for client/advisor roles */}
          {userRole === "admin" && (
            <TabsContent value="breakdown" className="mt-6 space-y-6">
              <div className="bg-gradient-to-r from-blue-50/50 to-blue-50/30 rounded-xl border border-blue-200/60 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                  <h4 className="text-sm font-semibold text-gray-900">Bank Account Breakdown</h4>
                  <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                    Admin View
                  </Badge>
                </div>

                {/* Breakdown Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200 mb-6">
                  <Table className="w-full border-collapse">
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="font-semibold text-blue-800 text-xs sm:text-sm border border-gray-200 p-2">Bank</TableHead>
                        <TableHead className="font-semibold text-blue-800 text-xs sm:text-sm border border-gray-200 p-2">Currency</TableHead>
                        <TableHead className="font-semibold text-blue-800 text-right text-xs sm:text-sm border border-gray-200 p-2">Balance</TableHead>
                        <TableHead className="font-semibold text-blue-800 text-xs sm:text-sm border border-gray-200 p-2">Last Tx Date</TableHead>
                        <TableHead className="font-semibold text-blue-800 text-xs sm:text-sm border border-gray-200 p-2">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="bg-white hover:bg-blue-50/30">
                        <TableCell className="font-medium text-sm border border-gray-200 p-2">{selectedBank}</TableCell>
                        <TableCell className="text-sm border border-gray-200 p-2">{bankData.currency}</TableCell>
                        <TableCell className="text-right font-semibold text-sm border border-gray-200 p-2">
                          ${bankData.balance.toLocaleString("en-CA", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell className="text-sm border border-gray-200 p-2">
                          {bankData.lastTransactionDate || "N/A"}
                        </TableCell>
                        <TableCell className="text-sm border border-gray-200 p-2">
                          <div className="flex gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button disabled variant="ghost" size="sm" className="hover:bg-blue-100 disabled:opacity-50">
                                    View
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Admin action pending backend integration</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button disabled variant="ghost" size="sm" className="hover:bg-blue-100 disabled:opacity-50">
                                    Transfer
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Admin action pending backend integration</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button disabled variant="ghost" size="sm" className="hover:bg-blue-100 disabled:opacity-50">
                                    Add
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Admin action pending backend integration</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* History Section */}
                {bankData.history && bankData.history.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-3">History</h4>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                      <Table className="w-full border-collapse">
                        <TableHeader>
                          <TableRow className="bg-blue-50">
                            <TableHead className="font-semibold text-blue-800 text-xs sm:text-sm border border-gray-200 p-2">Security ID</TableHead>
                            <TableHead className="font-semibold text-blue-800 text-xs sm:text-sm border border-gray-200 p-2">Status</TableHead>
                            <TableHead className="font-semibold text-blue-800 text-right text-xs sm:text-sm border border-gray-200 p-2">Amount</TableHead>
                            <TableHead className="font-semibold text-blue-800 text-right text-xs sm:text-sm border border-gray-200 p-2">Sales Tax</TableHead>
                            <TableHead className="font-semibold text-blue-800 text-right text-xs sm:text-sm border border-gray-200 p-2">Platform Fee</TableHead>
                            <TableHead className="font-semibold text-blue-800 text-right text-xs sm:text-sm border border-gray-200 p-2">Balance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bankData.history.map((transaction: any, index: number) => (
                            <TableRow key={index} className="bg-white hover:bg-blue-50/30">
                              <TableCell className="font-medium text-sm border border-gray-200 p-2">
                                {transaction.securityId}
                              </TableCell>
                              <TableCell className="border border-gray-200 p-2">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    transaction.status === "Completed" 
                                      ? "text-green-600 border-green-300 bg-green-50" 
                                      : "text-orange-600 border-orange-300 bg-orange-50"
                                  }`}
                                >
                                  {transaction.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right text-sm border border-gray-200 p-2">
                                ${transaction.amount.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-right text-sm border border-gray-200 p-2">
                                ${transaction.salesTax.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-right text-sm border border-gray-200 p-2">
                                ${transaction.platformFee.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-right font-semibold text-gray-900 text-sm border border-gray-200 p-2">
                                ${transaction.balance.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    This breakdown shows individual bank account allocations. Clients and advisors see only the aggregated total balance.
                  </p>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

