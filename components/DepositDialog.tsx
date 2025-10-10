"use client"

import { useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface DepositDialogProps {
  isOpen: boolean
  onClose: () => void
  selectedBank: string
  planDetails: string
}

const paymentMethods = [
  "N/A",
  "Cheque",
  "EFT",
  "Wire Payment",
  "Bill Payment",
  "T2033"
]

const depositTypes = [
  "T2033",
  "T2151",
  "CASH(NEW MONEY)",
  "T220",
  "CASH(ANNUITANT)",
  "T2030",
  "CASH INTEREST DISTRIBUTION",
  "TD2",
  "CASH DIVIDEND DISTRIBUTION",
  "OTHER(NO RECEIPT)",
  "REFUND OF PREMIUMS",
  "REFUND OF EXCESS CONTRIBUTIONS",
  "WITHDRAWAL",
  "LLP WITHDRAWAL",
  "HBP WITHDRAWAL"
]

export default function DepositDialog({
  isOpen,
  onClose,
  selectedBank,
  planDetails,
}: DepositDialogProps) {
  const [currency, setCurrency] = useState<"CAD" | "USD">("CAD")
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [depositType, setDepositType] = useState<string>("")

  const handleClose = () => {
    // Reset form when closing
    setCurrency("CAD")
    setPaymentMethod("")
    setAmount("")
    setDepositType("")
    onClose()
  }

  const handleSubmit = () => {
    // Handle deposit submission
    console.log({
      bank: selectedBank,
      currency,
      paymentMethod,
      amount,
      depositType,
    })
    handleClose()
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && handleClose()} modal>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[101] max-w-2xl max-h-[90vh] w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Make a Deposit
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            {planDetails}
          </p>
          <p className="text-sm font-medium text-blue-600 mt-1">
            Bank: {selectedBank}
          </p>
        </DialogHeader>

        <div className="space-y-6 my-4">
          {/* Currency Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Currency <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={currency}
              onValueChange={(value) => setCurrency(value as "CAD" | "USD")}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CAD" id="cad" />
                <Label htmlFor="cad" className="cursor-pointer font-normal">
                  CAD (Canadian Dollar)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="USD" id="usd" />
                <Label htmlFor="usd" className="cursor-pointer font-normal">
                  USD (US Dollar)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Payment Method <span className="text-red-500">*</span>
            </Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment method..." />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                {paymentMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Amount <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {currency === "CAD" ? "$" : "$"}
              </span>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="pl-8"
              />
            </div>
            <p className="text-xs text-gray-500">
              Enter the deposit amount in {currency}
            </p>
          </div>

          {/* Deposit Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Deposit Type <span className="text-red-500">*</span>
            </Label>
            <Select value={depositType} onValueChange={setDepositType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select deposit type..." />
              </SelectTrigger>
              <SelectContent className="z-[9999] max-h-[300px]">
                {depositTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!paymentMethod || !amount || !depositType}
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
          >
            Submit Deposit
          </Button>
        </DialogFooter>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
