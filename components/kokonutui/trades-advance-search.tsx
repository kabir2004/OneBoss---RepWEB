"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Building, X } from "lucide-react"

interface TradesAdvanceSearchProps {
  onSearch: (criteria: any) => void
  onReset: () => void
}

export default function TradesAdvanceSearch({ onSearch, onReset }: TradesAdvanceSearchProps) {
  const [searchCriteria, setSearchCriteria] = useState({
    // Advance Search Criteria
    interactiveOrderStatus: "All",
    netSettledCommission: "All",
    transactionId: "",
    zeroAverageCost: false,
    useReviewStatusFilter: false,
    includePlanCriteria: false,
    includeClientCriteria: false,
    docRequired: "All",
    nomineeRedemptionPaymentOption: "All",
    chequePaidToClient: "All",
    contributionType: "All",
    dealerAtTimeOfTrade: "",
    representativeAtTimeOfTrade: "All",
    first60Days: "All",
    useTrustAccounting: "All",
    conversion: "All",

    // Fund Account Search Criteria
    selectSupplier: false,
    selectProduct: false,
    includeInactiveProducts: false,
    includeUnapprovedProducts: false,
    supplier: "",
    product: "",
    productName: "",
    fundataKey: "",
    supplierAccountNumber: "",
    fundClassSeries: "",
    ignoreLeadingZeros: false,
    blankSupplierAccount: false,
    currency: "All",
    status: "All",
    distributionOption: "All",
    rateType: "All",
    risk: "All",
    exemptProduct: "All",
    productType: "All",
    category: "All",
    feeForServiceStatus: "All",
    excludeFromDuplicateExceptionReports: "N/A",
    showOnlyAccountsWithShares: false,
    historical: false,
    searchForPACInstructionsPresent: false,
    searchForSWPInstructionsPresent: false
  })

  const handleInputChange = (field: string, value: any) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSearch = () => {
    onSearch(searchCriteria)
  }

  const handleReset = () => {
    setSearchCriteria({
      interactiveOrderStatus: "All",
      netSettledCommission: "All",
      transactionId: "",
      zeroAverageCost: false,
      useReviewStatusFilter: false,
      includePlanCriteria: false,
      includeClientCriteria: false,
      docRequired: "All",
      nomineeRedemptionPaymentOption: "All",
      chequePaidToClient: "All",
      contributionType: "All",
      dealerAtTimeOfTrade: "",
      representativeAtTimeOfTrade: "All",
      first60Days: "All",
      useTrustAccounting: "All",
      conversion: "All",
      selectSupplier: false,
      selectProduct: false,
      includeInactiveProducts: false,
      includeUnapprovedProducts: false,
      supplier: "",
      product: "",
      productName: "",
      fundataKey: "",
      supplierAccountNumber: "",
      fundClassSeries: "",
      ignoreLeadingZeros: false,
      blankSupplierAccount: false,
      currency: "All",
      status: "All",
      distributionOption: "All",
      rateType: "All",
      risk: "All",
      exemptProduct: "All",
      productType: "All",
      category: "All",
      feeForServiceStatus: "All",
      excludeFromDuplicateExceptionReports: "N/A",
      showOnlyAccountsWithShares: false,
      historical: false,
      searchForPACInstructionsPresent: false,
      searchForSWPInstructionsPresent: false
    })
    onReset()
  }

  const getActiveFiltersCount = () => {
    return Object.values(searchCriteria).filter(value => {
      if (typeof value === 'boolean') {
        return value === true
      }
      return value && value !== "" && value !== "All" && value !== "0" && value !== "N/A"
    }).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Search className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Advanced Trade Search</h1>
            <p className="text-gray-600">Search trades with detailed criteria across all data points</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {getActiveFiltersCount()} filters active
            </Badge>
          )}
          <Button variant="outline" onClick={handleReset}>
            <X className="h-4 w-4 mr-2" />
            Reset All
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Advance Search Criteria */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5 text-blue-600" />
              Advance Search Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Row 1: Status and Commission */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Interactive Order Status</label>
                <Select value={searchCriteria.interactiveOrderStatus} onValueChange={(value) => handleInputChange('interactiveOrderStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Executed">Executed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="Partially Filled">Partially Filled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Net Settled Commission</label>
                <Select value={searchCriteria.netSettledCommission} onValueChange={(value) => handleInputChange('netSettledCommission', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="0-100">$0 - $100</SelectItem>
                    <SelectItem value="100-500">$100 - $500</SelectItem>
                    <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                    <SelectItem value="1000+">$1,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Transaction ID</label>
                <Input
                  placeholder="Enter transaction ID"
                  value={searchCriteria.transactionId}
                  onChange={(e) => handleInputChange('transactionId', e.target.value)}
                />
              </div>
            </div>

            {/* Row 2: Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="zeroAverageCost"
                  checked={searchCriteria.zeroAverageCost}
                  onCheckedChange={(checked) => handleInputChange('zeroAverageCost', checked)}
                />
                <label htmlFor="zeroAverageCost" className="text-sm font-medium text-gray-700">
                  Zero Average Cost
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="useReviewStatusFilter"
                  checked={searchCriteria.useReviewStatusFilter}
                  onCheckedChange={(checked) => handleInputChange('useReviewStatusFilter', checked)}
                />
                <label htmlFor="useReviewStatusFilter" className="text-sm font-medium text-gray-700">
                  Use Review Status Filter
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includePlanCriteria"
                  checked={searchCriteria.includePlanCriteria}
                  onCheckedChange={(checked) => handleInputChange('includePlanCriteria', checked)}
                />
                <label htmlFor="includePlanCriteria" className="text-sm font-medium text-gray-700">
                  Include Plan Criteria
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeClientCriteria"
                  checked={searchCriteria.includeClientCriteria}
                  onCheckedChange={(checked) => handleInputChange('includeClientCriteria', checked)}
                />
                <label htmlFor="includeClientCriteria" className="text-sm font-medium text-gray-700">
                  Include Client Criteria
                </label>
              </div>
            </div>

            {/* Row 3: Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Doc Required</label>
                <Select value={searchCriteria.docRequired} onValueChange={(value) => handleInputChange('docRequired', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Nominee Redemption Payment Option</label>
                <Select value={searchCriteria.nomineeRedemptionPaymentOption} onValueChange={(value) => handleInputChange('nomineeRedemptionPaymentOption', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Reinvest">Reinvest</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Cheque Paid to Client</label>
                <Select value={searchCriteria.chequePaidToClient} onValueChange={(value) => handleInputChange('chequePaidToClient', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 4: More Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Contribution Type</label>
                <Select value={searchCriteria.contributionType} onValueChange={(value) => handleInputChange('contributionType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="RRSP">RRSP</SelectItem>
                    <SelectItem value="TFSA">TFSA</SelectItem>
                    <SelectItem value="RESP">RESP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Representative At Time Of Trade</label>
                <Select value={searchCriteria.representativeAtTimeOfTrade} onValueChange={(value) => handleInputChange('representativeAtTimeOfTrade', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="John Smith">John Smith</SelectItem>
                    <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                    <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                    <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">First 60 Days</label>
                <Select value={searchCriteria.first60Days} onValueChange={(value) => handleInputChange('first60Days', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 5: Text Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Dealer At Time Of Trade</label>
                <Input
                  placeholder="Enter dealer name"
                  value={searchCriteria.dealerAtTimeOfTrade}
                  onChange={(e) => handleInputChange('dealerAtTimeOfTrade', e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Use Trust Accounting</label>
                <Select value={searchCriteria.useTrustAccounting} onValueChange={(value) => handleInputChange('useTrustAccounting', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 6: Final Dropdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Conversion</label>
                <Select value={searchCriteria.conversion} onValueChange={(value) => handleInputChange('conversion', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fund Account Search Criteria */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building className="h-5 w-5 text-green-600" />
              Fund Account Search Criteria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Account Details */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Account Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="selectSupplier"
                    checked={searchCriteria.selectSupplier}
                    onCheckedChange={(checked) => handleInputChange('selectSupplier', checked)}
                  />
                  <label htmlFor="selectSupplier" className="text-sm font-medium text-gray-700">
                    Select Supplier
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="selectProduct"
                    checked={searchCriteria.selectProduct}
                    onCheckedChange={(checked) => handleInputChange('selectProduct', checked)}
                  />
                  <label htmlFor="selectProduct" className="text-sm font-medium text-gray-700">
                    Select Product
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeInactiveProducts"
                    checked={searchCriteria.includeInactiveProducts}
                    onCheckedChange={(checked) => handleInputChange('includeInactiveProducts', checked)}
                  />
                  <label htmlFor="includeInactiveProducts" className="text-sm font-medium text-gray-700">
                    Include Inactive Products
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Supplier</label>
                  <Input
                    placeholder="Enter supplier"
                    value={searchCriteria.supplier}
                    onChange={(e) => handleInputChange('supplier', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Product</label>
                  <Input
                    placeholder="Enter product"
                    value={searchCriteria.product}
                    onChange={(e) => handleInputChange('product', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Identifying Fields */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Identifying Fields</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Product Name *</label>
                  <Input
                    placeholder="Enter product name"
                    value={searchCriteria.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Fundata Key</label>
                  <Input
                    placeholder="Enter fundata key"
                    value={searchCriteria.fundataKey}
                    onChange={(e) => handleInputChange('fundataKey', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Supplier Account Number</label>
                  <Input
                    placeholder="Enter account number"
                    value={searchCriteria.supplierAccountNumber}
                    onChange={(e) => handleInputChange('supplierAccountNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Fund Class/Series</label>
                  <Input
                    placeholder="Enter fund class/series"
                    value={searchCriteria.fundClassSeries}
                    onChange={(e) => handleInputChange('fundClassSeries', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Currency</label>
                  <Select value={searchCriteria.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ignoreLeadingZeros"
                    checked={searchCriteria.ignoreLeadingZeros}
                    onCheckedChange={(checked) => handleInputChange('ignoreLeadingZeros', checked)}
                  />
                  <label htmlFor="ignoreLeadingZeros" className="text-sm font-medium text-gray-700">
                    Ignore Leading Zeros
                  </label>
                </div>
              </div>
            </div>

            {/* Attributes */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4">Attributes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                  <Select value={searchCriteria.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Distribution Option</label>
                  <Select value={searchCriteria.distributionOption} onValueChange={(value) => handleInputChange('distributionOption', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Reinvest">Reinvest</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Rate Type</label>
                  <Select value={searchCriteria.rateType} onValueChange={(value) => handleInputChange('rateType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Fixed">Fixed</SelectItem>
                      <SelectItem value="Variable">Variable</SelectItem>
                      <SelectItem value="Floating">Floating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Risk</label>
                  <Select value={searchCriteria.risk} onValueChange={(value) => handleInputChange('risk', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Product Type</label>
                  <Select value={searchCriteria.productType} onValueChange={(value) => handleInputChange('productType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Mutual Fund">Mutual Fund</SelectItem>
                      <SelectItem value="ETF">ETF</SelectItem>
                      <SelectItem value="Bond">Bond</SelectItem>
                      <SelectItem value="Stock">Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <Select value={searchCriteria.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Equity">Equity</SelectItem>
                      <SelectItem value="Fixed Income">Fixed Income</SelectItem>
                      <SelectItem value="Balanced">Balanced</SelectItem>
                      <SelectItem value="Money Market">Money Market</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Checkboxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showOnlyAccountsWithShares"
                    checked={searchCriteria.showOnlyAccountsWithShares}
                    onCheckedChange={(checked) => handleInputChange('showOnlyAccountsWithShares', checked)}
                  />
                  <label htmlFor="showOnlyAccountsWithShares" className="text-sm font-medium text-gray-700">
                    Show Only Accounts with Shares
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="historical"
                    checked={searchCriteria.historical}
                    onCheckedChange={(checked) => handleInputChange('historical', checked)}
                  />
                  <label htmlFor="historical" className="text-sm font-medium text-gray-700">
                    Historical
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="searchForPACInstructionsPresent"
                    checked={searchCriteria.searchForPACInstructionsPresent}
                    onCheckedChange={(checked) => handleInputChange('searchForPACInstructionsPresent', checked)}
                  />
                  <label htmlFor="searchForPACInstructionsPresent" className="text-sm font-medium text-gray-700">
                    Search for PAC Instructions Present
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="searchForSWPInstructionsPresent"
                    checked={searchCriteria.searchForSWPInstructionsPresent}
                    onCheckedChange={(checked) => handleInputChange('searchForSWPInstructionsPresent', checked)}
                  />
                  <label htmlFor="searchForSWPInstructionsPresent" className="text-sm font-medium text-gray-700">
                    Search for SWP Instructions Present
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Actions */}
        <div className="flex justify-center gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search Trades
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <X className="h-4 w-4 mr-2" />
            Reset All Filters
          </Button>
        </div>
      </div>
    </div>
  )
}