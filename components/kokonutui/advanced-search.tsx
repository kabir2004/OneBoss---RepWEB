"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Search,
  ArrowLeft,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Plus,
  FileText,
  TrendingUp,
  CheckSquare,
  FileSignature,
  X,
  Grid3X3
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdvancedSearch() {
  const router = useRouter()
  const [searchCriteria, setSearchCriteria] = useState({
    // Client Search Criteria - Identifying Fields
    alias: "",
    clientType: "All",
    fileId: "",
    gender: "All",
    title: "All",
    
    // Client Search Criteria - Attributes
    clientStatus: "Active",
    deliveryStatus: "All",
    returnedMail: "All",
    poa: "All",
    lta: "All",
    fatcaEligibility: "All",
    crsEligibility: "All",
    citizenship: "All",
    language: "All",
    maritalStatus: "All",
    accreditedInvestor: "All",
    w8BenW9: "All",
    assetValue: "",
    businessNumber: "",
    caslPermission: "All",
    proAccount: "All",
    
    // Client Search Criteria - Address
    address: "",
    city: "",
    province: "All",
    postalCode: "",
    country: "All",
    phone: "",
    email: "",
    
    // Client Search Criteria - Dates
    dobMonth: "All",
    dateOfBirth: "",
    dobFrom: "",
    dobTo: "",
    age: "",
    clientCreatedFrom: "",
    clientCreatedTo: "",
    
    // Client Search Criteria - Employment
    occupation: "",
    employer: "",
    
    // Client Search Criteria - User Defined
    repDefinedField1: "",
    repDefinedField2: "",
    repDefinedField3: "",
    transferFeeAgreement: "All",
    rebatePrimary: "All",
    rebateSecondary: "All",
    
    // Client Search Criteria - Misc
    pinnedDocuments: false,
    repMobilityExemption: "All",
    dealerMobilityExemption: "All",
    politicallyExposedPerson: "All",
    pepTitle: "",
    
    // Plan Search Criteria - Identifying Fields
    dealer: "9823",
    representative: "All",
    representativePerson: "All",
    planIntermediaryCode: "",
    intermediaryAccountCode: "",
    
    // Plan Search Criteria - Attributes
    planTypes: "All",
    registeredPlanTypesOnly: false,
    planStatus: "All",
    planLta: "All",
    accountDesignation: "All",
    groupAccount: "All",
    groupAccountId: "",
    leveragedPlans: "All",
    frozenPlansOnly: false,
    fullFreezePlansOnly: false,
    revenueModel: "All",
    recipient: "All",
    kycExemptProducts: "All",
    offsidePlansOnly: false,
    rebalanceEnabled: "All",
    reportableStatus: "All",
    
    // Plan Search Criteria - Tax
    lockedInJurisdiction: "All",
    loanNumber: "",
    rrifMinimumOverridden: "All",
    rrifMaximumOverridden: "All",
    systematicPaymentPlan: "All",
    
    // Plan Search Criteria - Misc
    useFeeSettingCriteria: false,
    feeForServiceApproved: "All",
    planPinnedDocuments: false,
    kycOnFileDate: "",
    startDate: "",
    startingMonth: "",
    planActiveFrom: "",
    planActiveTo: "",
    kycOriginalReceivedDate: "",
    representativeServiceLevel: "N/A",
    
    // Fund Account Search - Account Details
    selectSupplier: false,
    selectProduct: false,
    supplier: "",
    product: "",
    includeInactiveProducts: false,
    includeUnapprovedProducts: false,
    
    // Fund Account Search - Identifying Fields
    productName: "",
    fundataKey: "",
    supplierAccountNumber: "",
    fundClassSeries: "",
    ignoreLeadingZeros: false,
    blankSupplierAccount: false,
    currency: "All",
    
    // Fund Account Search - Attributes
    fundStatus: "All",
    distributionOption: "All",
    rateType: "All",
    risk: "All",
    exemptProduct: "All",
    productType: "All",
    category: "All",
    feeForServiceStatus: "All",
    excludeDuplicateReports: "N/A",
    showOnlyAccountsWithShares: false,
    historical: false,
    pacInstructions: false,
    swpInstructions: false,
    
    // ETF Account Search - ETF Details
    etfSelectSupplier: false,
    etfSelectProduct: false,
    etfSupplier: "",
    etfProduct: "",
    includeInactiveETF: false,
    includeUnapprovedETF: false,
    
    // ETF Account Search - Attributes
    etfStatus: "All",
    etfShowOnlyShares: false,
    etfHistorical: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSearch = () => {
    // Build search URL with parameters
    const params = new URLSearchParams()
    Object.entries(searchCriteria).forEach(([key, value]) => {
      if (value && value !== "") {
        params.set(key, value.toString())
      }
    })
    
    router.push(`/clients?${params.toString()}`)
  }

  const handleReset = () => {
    setSearchCriteria({
      // Client Search Criteria - Identifying Fields
      alias: "",
      clientType: "All",
      fileId: "",
      gender: "All",
      title: "All",
      
      // Client Search Criteria - Attributes
      clientStatus: "Active",
      deliveryStatus: "All",
      returnedMail: "All",
      poa: "All",
      lta: "All",
      fatcaEligibility: "All",
      crsEligibility: "All",
      citizenship: "All",
      language: "All",
      maritalStatus: "All",
      accreditedInvestor: "All",
      w8BenW9: "All",
      assetValue: "",
      businessNumber: "",
      caslPermission: "All",
      proAccount: "All",
      
      // Client Search Criteria - Address
      address: "",
      city: "",
      province: "All",
      postalCode: "",
      country: "All",
      phone: "",
      email: "",
      
      // Client Search Criteria - Dates
      dobMonth: "All",
      dateOfBirth: "",
      dobFrom: "",
      dobTo: "",
      age: "",
      clientCreatedFrom: "",
      clientCreatedTo: "",
      
      // Client Search Criteria - Employment
      occupation: "",
      employer: "",
      
      // Client Search Criteria - User Defined
      repDefinedField1: "",
      repDefinedField2: "",
      repDefinedField3: "",
      transferFeeAgreement: "All",
      rebatePrimary: "All",
      rebateSecondary: "All",
      
      // Client Search Criteria - Misc
      pinnedDocuments: false,
      repMobilityExemption: "All",
      dealerMobilityExemption: "All",
      politicallyExposedPerson: "All",
      pepTitle: "",
      
      // Plan Search Criteria - Identifying Fields
      dealer: "9823",
      representative: "All",
      representativePerson: "All",
      planIntermediaryCode: "",
      intermediaryAccountCode: "",
      
      // Plan Search Criteria - Attributes
      planTypes: "All",
      registeredPlanTypesOnly: false,
      planStatus: "All",
      planLta: "All",
      accountDesignation: "All",
      groupAccount: "All",
      groupAccountId: "",
      leveragedPlans: "All",
      frozenPlansOnly: false,
      fullFreezePlansOnly: false,
      revenueModel: "All",
      recipient: "All",
      kycExemptProducts: "All",
      offsidePlansOnly: false,
      rebalanceEnabled: "All",
      reportableStatus: "All",
      
      // Plan Search Criteria - Tax
      lockedInJurisdiction: "All",
      loanNumber: "",
      rrifMinimumOverridden: "All",
      rrifMaximumOverridden: "All",
      systematicPaymentPlan: "All",
      
      // Plan Search Criteria - Misc
      useFeeSettingCriteria: false,
      feeForServiceApproved: "All",
      planPinnedDocuments: false,
      kycOnFileDate: "",
      startDate: "",
      startingMonth: "",
      planActiveFrom: "",
      planActiveTo: "",
      kycOriginalReceivedDate: "",
      representativeServiceLevel: "N/A",
      
      // Fund Account Search - Account Details
      selectSupplier: false,
      selectProduct: false,
      supplier: "",
      product: "",
      includeInactiveProducts: false,
      includeUnapprovedProducts: false,
      
      // Fund Account Search - Identifying Fields
      productName: "",
      fundataKey: "",
      supplierAccountNumber: "",
      fundClassSeries: "",
      ignoreLeadingZeros: false,
      blankSupplierAccount: false,
      currency: "All",
      
      // Fund Account Search - Attributes
      fundStatus: "All",
      distributionOption: "All",
      rateType: "All",
      risk: "All",
      exemptProduct: "All",
      productType: "All",
      category: "All",
      feeForServiceStatus: "All",
      excludeDuplicateReports: "N/A",
      showOnlyAccountsWithShares: false,
      historical: false,
      pacInstructions: false,
      swpInstructions: false,
      
      // ETF Account Search - ETF Details
      etfSelectSupplier: false,
      etfSelectProduct: false,
      etfSupplier: "",
      etfProduct: "",
      includeInactiveETF: false,
      includeUnapprovedETF: false,
      
      // ETF Account Search - Attributes
      etfStatus: "All",
      etfShowOnlyShares: false,
      etfHistorical: false
    })
  }

  return (
    <div className="space-y-6">
      {/* Client Navigation Header */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="ghost" size="sm" onClick={() => router.push('/clients')} className="transition-all duration-200 hover:scale-105">
                <Users className="h-4 w-4 mr-2" />
                Client Management
              </Button>
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105">
                <Search className="h-4 w-4 mr-2" />
                Advanced Search
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/clients/households')} className="transition-all duration-200 hover:scale-105">
                <Users className="h-4 w-4 mr-2" />
                Households
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/clients/income-plans')} className="transition-all duration-200 hover:scale-105">
                <TrendingUp className="h-4 w-4 mr-2" />
                Income Plans
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/clients/approval')} className="transition-all duration-200 hover:scale-105">
                <CheckSquare className="h-4 w-4 mr-2" />
                Approvals
              </Button>
              <Button variant="ghost" size="sm" onClick={() => router.push('/clients/reports')} className="transition-all duration-200 hover:scale-105">
                <FileText className="h-4 w-4 mr-2" />
                Reports
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Search className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Client Search</h1>
          <p className="text-gray-600">Use detailed criteria to find specific clients across all data points</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Client Search Criteria */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Client Search Criteria Header */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-blue-900">Client Search Criteria</CardTitle>
            </CardHeader>
          </Card>

          {/* Identifying Fields */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Users className="h-5 w-5 text-blue-600" />
                Identifying Fields
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Alias</label>
                  <Input
                    placeholder="Enter alias"
                    value={searchCriteria.alias}
                    onChange={(e) => handleInputChange('alias', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Client Type</label>
                  <Select value={searchCriteria.clientType} onValueChange={(value) => handleInputChange('clientType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Joint">Joint</SelectItem>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                      <SelectItem value="Trust">Trust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">File ID #</label>
                  <Input
                    placeholder="Enter file ID"
                    value={searchCriteria.fileId}
                    onChange={(e) => handleInputChange('fileId', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Gender</label>
                  <Select value={searchCriteria.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Title</label>
                  <Select value={searchCriteria.title} onValueChange={(value) => handleInputChange('title', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Mr.">Mr.</SelectItem>
                      <SelectItem value="Ms.">Ms.</SelectItem>
                      <SelectItem value="Mrs.">Mrs.</SelectItem>
                      <SelectItem value="Dr.">Dr.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attributes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Filter className="h-5 w-5 text-green-600" />
                Attributes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Client Status</label>
                  <Select value={searchCriteria.clientStatus} onValueChange={(value) => handleInputChange('clientStatus', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="All">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Delivery Status</label>
                  <Select value={searchCriteria.deliveryStatus} onValueChange={(value) => handleInputChange('deliveryStatus', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Electronic">Electronic</SelectItem>
                      <SelectItem value="Mail">Mail</SelectItem>
                      <SelectItem value="Hold">Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Returned Mail</label>
                  <Select value={searchCriteria.returnedMail} onValueChange={(value) => handleInputChange('returnedMail', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">POA</label>
                  <Select value={searchCriteria.poa} onValueChange={(value) => handleInputChange('poa', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">FATCA Eligibility</label>
                  <Select value={searchCriteria.fatcaEligibility} onValueChange={(value) => handleInputChange('fatcaEligibility', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="US Person">US Person</SelectItem>
                      <SelectItem value="Non-US Person">Non-US Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Language</label>
                  <Select value={searchCriteria.language} onValueChange={(value) => handleInputChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Asset Value</label>
                  <Input
                    type="number"
                    placeholder="Enter asset value"
                    value={searchCriteria.assetValue}
                    onChange={(e) => handleInputChange('assetValue', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Business Number</label>
                  <Input
                    placeholder="Enter business number"
                    value={searchCriteria.businessNumber}
                    onChange={(e) => handleInputChange('businessNumber', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="caslPermission"
                    checked={searchCriteria.caslPermission === "Yes"}
                    onCheckedChange={(checked) => handleInputChange('caslPermission', checked ? "Yes" : "All")}
                  />
                  <label htmlFor="caslPermission" className="text-sm font-medium text-gray-700">
                    Only with CASL Permission
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <MapPin className="h-5 w-5 text-purple-600" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Address</label>
                  <Input
                    placeholder="Enter address"
                    value={searchCriteria.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">City</label>
                  <Input
                    placeholder="Enter city"
                    value={searchCriteria.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Province</label>
                  <Select value={searchCriteria.province} onValueChange={(value) => handleInputChange('province', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Provinces</SelectItem>
                      <SelectItem value="AB">Alberta</SelectItem>
                      <SelectItem value="BC">British Columbia</SelectItem>
                      <SelectItem value="MB">Manitoba</SelectItem>
                      <SelectItem value="NB">New Brunswick</SelectItem>
                      <SelectItem value="NL">Newfoundland and Labrador</SelectItem>
                      <SelectItem value="NS">Nova Scotia</SelectItem>
                      <SelectItem value="ON">Ontario</SelectItem>
                      <SelectItem value="PE">Prince Edward Island</SelectItem>
                      <SelectItem value="QC">Quebec</SelectItem>
                      <SelectItem value="SK">Saskatchewan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Postal Code</label>
                  <Input
                    placeholder="Enter postal code"
                    value={searchCriteria.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Phone</label>
                  <Input
                    placeholder="Enter phone number"
                    value={searchCriteria.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={searchCriteria.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Calendar className="h-5 w-5 text-orange-600" />
                Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Client DOB Month</label>
                  <Select value={searchCriteria.dobMonth} onValueChange={(value) => handleInputChange('dobMonth', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Date of Birth</label>
                  <Input
                    type="date"
                    value={searchCriteria.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Age</label>
                  <Input
                    type="number"
                    placeholder="Enter age"
                    value={searchCriteria.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Date of Birth Range</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">From</label>
                      <Input
                        type="date"
                        value={searchCriteria.dobFrom}
                        onChange={(e) => handleInputChange('dobFrom', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">To</label>
                      <Input
                        type="date"
                        value={searchCriteria.dobTo}
                        onChange={(e) => handleInputChange('dobTo', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Client Created Date Range</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">From</label>
                      <Input
                        type="date"
                        value={searchCriteria.clientCreatedFrom}
                        onChange={(e) => handleInputChange('clientCreatedFrom', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">To</label>
                      <Input
                        type="date"
                        value={searchCriteria.clientCreatedTo}
                        onChange={(e) => handleInputChange('clientCreatedTo', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <DollarSign className="h-5 w-5 text-indigo-600" />
                Employment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Occupation</label>
                  <Input
                    placeholder="Enter occupation"
                    value={searchCriteria.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Employer</label>
                  <Input
                    placeholder="Enter employer"
                    value={searchCriteria.employer}
                    onChange={(e) => handleInputChange('employer', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Actions & Results */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Search Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search Clients
              </Button>
              <Button variant="outline" className="w-full" onClick={handleReset}>
                Reset All Filters
              </Button>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(searchCriteria).filter(([key, value]) => value && value !== "").map(([key, value]) => (
                    <Badge key={key} variant="secondary" className="text-xs">
                      {key}: {value.toString()}
                    </Badge>
                  ))}
                  {Object.values(searchCriteria).every(value => !value || value === "") && (
                    <span className="text-xs text-gray-500">No filters applied</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Searches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm hover:bg-green-50" 
                onClick={() => {
                  handleReset()
                  handleInputChange('status', 'active')
                  handleSearch()
                }}
              >
                🟢 Active Clients
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm hover:bg-yellow-50"
                onClick={() => {
                  handleReset()
                  handleInputChange('hasAlert', true)
                  handleSearch()
                }}
              >
                ⚠️ Clients with Alerts
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm hover:bg-blue-50"
                onClick={() => {
                  handleReset()
                  handleInputChange('portfolioMin', '100000')
                  handleSearch()
                }}
              >
                💰 High Value Clients (&gt;$100K)
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm hover:bg-purple-50"
                onClick={() => {
                  handleReset()
                  const thirtyDaysAgo = new Date()
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                  handleInputChange('joinDateFrom', thirtyDaysAgo.toISOString().split('T')[0])
                  handleSearch()
                }}
              >
                📅 Recent Joiners (30 days)
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sm hover:bg-gray-50"
                onClick={() => {
                  handleReset()
                  handleInputChange('status', 'inactive')
                  handleSearch()
                }}
              >
                😴 Inactive Clients
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}