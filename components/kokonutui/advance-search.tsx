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
  Grid3X3,
  User,
  Building,
  Phone,
  Mail,
  Briefcase,
  Globe,
  Shield,
  Heart,
  Languages,
  FileCheck,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown } from "lucide-react"

export default function AdvanceSearch() {
  const router = useRouter()
  const [searchCriteria, setSearchCriteria] = useState({
    // Text Input Fields
    alias: "",
    fileId: "",
    businessNumber: "",
    assetValue: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    employer: "",
    occupation: "",
    
    // Dropdowns / Select Menus
    clientType: "All",
    gender: "All",
    title: "All",
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
    caslPermission: "All",
    proAccount: "All",
    province: "All",
    country: "All",
    dobMonth: "All",
    transferFeeAgreement: "All",
    rebatePrimary: "All",
    rebateSecondary: "All",
    
    // Date Pickers / Range Inputs
    dateOfBirth: "",
    dobFrom: "",
    dobTo: "",
    age: "",
    clientCreatedFrom: "",
    clientCreatedTo: "",
    
    // Custom / Multi-Select Fields
    repDefinedField1: "",
    repDefinedField2: "",
    repDefinedField3: "",
    pinnedDocuments: false,
    
    // Status Toggles
    showActive: true,
    showInactive: false,
    showProspects: false,
    
    // Quick Filter Toggles
    showHighValue: false,
    showRecentJoiners: false,
    showAccreditedInvestors: false,
  })

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSearch = () => {
    // Build search URL with parameters
    const params = new URLSearchParams()
    
    // Handle status toggles
    const statusFilters = []
    if (searchCriteria.showActive) statusFilters.push('active')
    if (searchCriteria.showInactive) statusFilters.push('inactive')
    if (searchCriteria.showProspects) statusFilters.push('pending')
    
    if (statusFilters.length > 0) {
      params.set('status', statusFilters.join(','))
    }
    
    // Handle quick filter toggles
    if (searchCriteria.showHighValue) {
      params.set('assetValue', '100000')
    }
    if (searchCriteria.showRecentJoiners) {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      params.set('clientCreatedFrom', thirtyDaysAgo.toISOString().split('T')[0])
    }
    if (searchCriteria.showAccreditedInvestors) {
      params.set('accreditedInvestor', 'Yes')
    }
    
    // Handle other criteria
    Object.entries(searchCriteria).forEach(([key, value]) => {
      // Skip status toggle fields and quick filter toggles as they're handled above
      if (key === 'showActive' || key === 'showInactive' || key === 'showProspects' || 
          key === 'showHighValue' || key === 'showRecentJoiners' || key === 'showAccreditedInvestors') {
        return
      }
      
      if (typeof value === 'boolean') {
        if (value === true) {
          params.set(key, value.toString())
        }
      } else if (value && value !== "" && value !== "All") {
        params.set(key, value.toString())
      }
    })
    
    router.push(`/clients?${params.toString()}`)
  }

  const handleReset = () => {
    setSearchCriteria({
      alias: "",
      fileId: "",
      businessNumber: "",
      assetValue: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
      email: "",
      employer: "",
      occupation: "",
      clientType: "All",
      gender: "All",
      title: "All",
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
      caslPermission: "All",
      proAccount: "All",
      province: "All",
      country: "All",
      dobMonth: "All",
      transferFeeAgreement: "All",
      rebatePrimary: "All",
      rebateSecondary: "All",
      dateOfBirth: "",
      dobFrom: "",
      dobTo: "",
      age: "",
      clientCreatedFrom: "",
      clientCreatedTo: "",
      repDefinedField1: "",
      repDefinedField2: "",
      repDefinedField3: "",
      pinnedDocuments: false,
      showActive: true,
      showInactive: false,
      showProspects: false,
      showHighValue: false,
      showRecentJoiners: false,
      showAccreditedInvestors: false,
    })
  }

  const getActiveFiltersCount = () => {
    return Object.entries(searchCriteria).filter(([key, value]) => {
      if (typeof value === 'boolean') {
        return value === true
      }
      return value && value !== "" && value !== "All"
    }).length
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Search className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-card-foreground">Advanced Client Search</h1>
            <p className="text-muted-foreground">Pinpoint clients with detailed search criteria across all data points</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            {getActiveFiltersCount()} filters active
          </Badge>
          <Button variant="outline" onClick={handleReset}>
            <X className="h-4 w-4 mr-2" />
            Reset All
          </Button>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Search Form */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Text Input Fields */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-blue-600" />
                Text Input Fields
                <Badge variant="outline" className="ml-auto">Free-form typing</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Alias</label>
                  <Input
                    placeholder="Enter alias"
                    value={searchCriteria.alias}
                    onChange={(e) => handleInputChange('alias', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">File ID #</label>
                  <Input
                    placeholder="Enter file ID"
                    value={searchCriteria.fileId}
                    onChange={(e) => handleInputChange('fileId', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Business Number</label>
                  <Input
                    placeholder="Enter business number"
                    value={searchCriteria.businessNumber}
                    onChange={(e) => handleInputChange('businessNumber', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Asset Value</label>
                  <Input
                    type="number"
                    placeholder="Enter asset value"
                    value={searchCriteria.assetValue}
                    onChange={(e) => handleInputChange('assetValue', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Address</label>
                  <Input
                    placeholder="Enter address"
                    value={searchCriteria.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">City</label>
                  <Input
                    placeholder="Enter city"
                    value={searchCriteria.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Postal Code</label>
                  <Input
                    placeholder="Enter postal code"
                    value={searchCriteria.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Phone</label>
                  <Input
                    placeholder="Enter phone number"
                    value={searchCriteria.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={searchCriteria.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Employer</label>
                  <Input
                    placeholder="Enter employer"
                    value={searchCriteria.employer}
                    onChange={(e) => handleInputChange('employer', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Occupation</label>
                  <Input
                    placeholder="Enter occupation"
                    value={searchCriteria.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dropdowns / Select Menus */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="h-5 w-5 text-green-600" />
                Dropdowns / Select Menus
                <Badge variant="outline" className="ml-auto">Fixed values</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Client Type</label>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Gender</label>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Title</label>
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
                      <SelectItem value="Prof.">Prof.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Client Status</label>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Delivery Status</label>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Returned Mail</label>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">POA</label>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">LTA</label>
                  <Select value={searchCriteria.lta} onValueChange={(value) => handleInputChange('lta', value)}>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">FATCA Eligibility</label>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">CRS Eligibility</label>
                  <Select value={searchCriteria.crsEligibility} onValueChange={(value) => handleInputChange('crsEligibility', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Reportable">Reportable</SelectItem>
                      <SelectItem value="Non-Reportable">Non-Reportable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Citizenship</label>
                  <Select value={searchCriteria.citizenship} onValueChange={(value) => handleInputChange('citizenship', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Canadian">Canadian</SelectItem>
                      <SelectItem value="US">US</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Language</label>
                  <Select value={searchCriteria.language} onValueChange={(value) => handleInputChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Marital Status</label>
                  <Select value={searchCriteria.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Accredited Investor</label>
                  <Select value={searchCriteria.accreditedInvestor} onValueChange={(value) => handleInputChange('accreditedInvestor', value)}>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">W-8BEN/W9</label>
                  <Select value={searchCriteria.w8BenW9} onValueChange={(value) => handleInputChange('w8BenW9', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="W-8BEN">W-8BEN</SelectItem>
                      <SelectItem value="W-9">W-9</SelectItem>
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">CASL Permission</label>
                  <Select value={searchCriteria.caslPermission} onValueChange={(value) => handleInputChange('caslPermission', value)}>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Pro Account</label>
                  <Select value={searchCriteria.proAccount} onValueChange={(value) => handleInputChange('proAccount', value)}>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Province</label>
                  <Select value={searchCriteria.province} onValueChange={(value) => handleInputChange('province', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Country</label>
                  <Select value={searchCriteria.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Countries</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Client DOB Month</label>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Transfer Fee Agreement</label>
                  <Select value={searchCriteria.transferFeeAgreement} onValueChange={(value) => handleInputChange('transferFeeAgreement', value)}>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Rebate – Primary</label>
                  <Select value={searchCriteria.rebatePrimary} onValueChange={(value) => handleInputChange('rebatePrimary', value)}>
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
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Rebate – Secondary</label>
                  <Select value={searchCriteria.rebateSecondary} onValueChange={(value) => handleInputChange('rebateSecondary', value)}>
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
              </div>
            </CardContent>
          </Card>

          {/* Date Pickers / Range Inputs */}
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
                Date Pickers / Range Inputs
                <Badge variant="outline" className="ml-auto">Time-based searches</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Date of Birth</label>
                  <Input
                    type="date"
                    value={searchCriteria.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Age</label>
                  <Input
                    type="number"
                    placeholder="Enter age"
                    value={searchCriteria.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Date of Birth Range</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">From</label>
                      <Input
                        type="date"
                        value={searchCriteria.dobFrom}
                        onChange={(e) => handleInputChange('dobFrom', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">To</label>
                      <Input
                        type="date"
                        value={searchCriteria.dobTo}
                        onChange={(e) => handleInputChange('dobTo', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Client Created Date Range</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">From</label>
                      <Input
                        type="date"
                        value={searchCriteria.clientCreatedFrom}
                        onChange={(e) => handleInputChange('clientCreatedFrom', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">To</label>
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

          {/* Custom / Multi-Select Fields */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileSignature className="h-5 w-5 text-purple-600" />
                Custom / Multi-Select Fields
                <Badge variant="outline" className="ml-auto">User-defined criteria</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Representative Defined Field 1</label>
                  <Input
                    placeholder="Enter custom field 1"
                    value={searchCriteria.repDefinedField1}
                    onChange={(e) => handleInputChange('repDefinedField1', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Representative Defined Field 2</label>
                  <Input
                    placeholder="Enter custom field 2"
                    value={searchCriteria.repDefinedField2}
                    onChange={(e) => handleInputChange('repDefinedField2', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Representative Defined Field 3</label>
                  <Input
                    placeholder="Enter custom field 3"
                    value={searchCriteria.repDefinedField3}
                    onChange={(e) => handleInputChange('repDefinedField3', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pinnedDocuments"
                    checked={searchCriteria.pinnedDocuments}
                    onCheckedChange={(checked) => handleInputChange('pinnedDocuments', checked)}
                  />
                  <label htmlFor="pinnedDocuments" className="text-sm font-medium text-muted-foreground">
                    Search By Pinned Documents
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Actions & Quick Searches */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Search Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Client Status Filters Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-left bg-muted border border-border rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-medium text-muted-foreground">Status Filters</span>
                    {(() => {
                      const activeCount = [searchCriteria.showActive, searchCriteria.showInactive, searchCriteria.showProspects, 
                                         searchCriteria.showHighValue, searchCriteria.showRecentJoiners, searchCriteria.showAccreditedInvestors]
                        .filter(Boolean).length
                      return activeCount > 0 ? (
                        <Badge variant="secondary" className="text-xs">
                          {activeCount}
                        </Badge>
                      ) : null
                    })()}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isStatusDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10">
                    <div className="p-3 space-y-3">
                      {/* Status Toggles */}
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Client Status</h4>
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="showActive"
                              checked={searchCriteria.showActive}
                              onCheckedChange={(checked) => handleInputChange('showActive', checked)}
                            />
                            <label htmlFor="showActive" className="text-sm text-muted-foreground flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Active
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="showInactive"
                              checked={searchCriteria.showInactive}
                              onCheckedChange={(checked) => handleInputChange('showInactive', checked)}
                            />
                            <label htmlFor="showInactive" className="text-sm text-muted-foreground flex items-center gap-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              Inactive
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="showProspects"
                              checked={searchCriteria.showProspects}
                              onCheckedChange={(checked) => handleInputChange('showProspects', checked)}
                            />
                            <label htmlFor="showProspects" className="text-sm text-muted-foreground flex items-center gap-1">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              Prospects
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      {/* Additional Filters */}
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Additional</h4>
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="showHighValue"
                              checked={searchCriteria.showHighValue}
                              onCheckedChange={(checked) => handleInputChange('showHighValue', checked)}
                            />
                            <label htmlFor="showHighValue" className="text-sm text-muted-foreground">
                              High Value
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="showRecentJoiners"
                              checked={searchCriteria.showRecentJoiners}
                              onCheckedChange={(checked) => handleInputChange('showRecentJoiners', checked)}
                            />
                            <label htmlFor="showRecentJoiners" className="text-sm text-muted-foreground">
                              Recent
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="showAccreditedInvestors"
                              checked={searchCriteria.showAccreditedInvestors}
                              onCheckedChange={(checked) => handleInputChange('showAccreditedInvestors', checked)}
                            />
                            <label htmlFor="showAccreditedInvestors" className="text-sm text-muted-foreground">
                              Accredited
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search Clients
              </Button>
              <Button variant="outline" className="w-full" onClick={handleReset}>
                <X className="h-4 w-4 mr-2" />
                Reset All Filters
              </Button>
              
              {getActiveFiltersCount() > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-1">
                    {/* Status summary */}
                    {(() => {
                      const statusFilters = []
                      if (searchCriteria.showActive) statusFilters.push('Active')
                      if (searchCriteria.showInactive) statusFilters.push('Inactive')
                      if (searchCriteria.showProspects) statusFilters.push('Prospects')
                      
                      if (statusFilters.length > 0) {
                        return (
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                            Client Status: {statusFilters.join(', ')}
                          </Badge>
                        )
                      }
                      return null
                    })()}
                    
                    {/* Quick filter toggles */}
                    {searchCriteria.showHighValue && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        High Value Clients
                      </Badge>
                    )}
                    {searchCriteria.showRecentJoiners && (
                      <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                        Recent Joiners
                      </Badge>
                    )}
                    {searchCriteria.showAccreditedInvestors && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                        Accredited Investors
                      </Badge>
                    )}
                    
                    {/* Other filters */}
                    {Object.entries(searchCriteria)
                      .filter(([key, value]) => {
                        // Skip status toggle fields, quick filter toggles, and clientStatus
                        if (key === 'showActive' || key === 'showInactive' || key === 'showProspects' || 
                            key === 'showHighValue' || key === 'showRecentJoiners' || key === 'showAccreditedInvestors' || 
                            key === 'clientStatus') {
                          return false
                        }
                        if (typeof value === 'boolean') {
                          return value === true
                        }
                        return value && value !== "" && value !== "All"
                      })
                      .map(([key, value]) => {
                        // Convert field names to user-friendly labels
                        const getFieldLabel = (fieldName: string) => {
                          const labelMap: { [key: string]: string } = {
                            'alias': 'Alias',
                            'fileId': 'File ID',
                            'businessNumber': 'Business Number',
                            'assetValue': 'Asset Value',
                            'address': 'Address',
                            'city': 'City',
                            'postalCode': 'Postal Code',
                            'phone': 'Phone',
                            'email': 'Email',
                            'employer': 'Employer',
                            'occupation': 'Occupation',
                            'clientType': 'Client Type',
                            'gender': 'Gender',
                            'title': 'Title',
                            'deliveryStatus': 'Delivery Status',
                            'returnedMail': 'Returned Mail',
                            'poa': 'POA',
                            'lta': 'LTA',
                            'fatcaEligibility': 'FATCA Eligibility',
                            'crsEligibility': 'CRS Eligibility',
                            'citizenship': 'Citizenship',
                            'language': 'Language',
                            'maritalStatus': 'Marital Status',
                            'accreditedInvestor': 'Accredited Investor',
                            'w8BenW9': 'W-8BEN/W9',
                            'caslPermission': 'CASL Permission',
                            'proAccount': 'Pro Account',
                            'province': 'Province',
                            'country': 'Country',
                            'dobMonth': 'DOB Month',
                            'transferFeeAgreement': 'Transfer Fee Agreement',
                            'rebatePrimary': 'Rebate Primary',
                            'rebateSecondary': 'Rebate Secondary',
                            'dateOfBirth': 'Date of Birth',
                            'dobFrom': 'DOB From',
                            'dobTo': 'DOB To',
                            'age': 'Age',
                            'clientCreatedFrom': 'Created From',
                            'clientCreatedTo': 'Created To',
                            'repDefinedField1': 'Custom Field 1',
                            'repDefinedField2': 'Custom Field 2',
                            'repDefinedField3': 'Custom Field 3',
                            'pinnedDocuments': 'Pinned Documents'
                          }
                          return labelMap[fieldName] || fieldName
                        }

                        return (
                          <Badge key={key} variant="secondary" className="text-xs">
                            {getFieldLabel(key)}: {value.toString()}
                          </Badge>
                        )
                      })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}