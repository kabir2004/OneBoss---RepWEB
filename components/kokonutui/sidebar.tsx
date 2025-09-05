"use client"

import {
  BarChart2,
  Building2,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Settings,
  HelpCircle,
  Menu,
  Target,
  User,
  DollarSign,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Clock,
  PauseCircle,
  Home
} from "lucide-react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Mock client data for sidebar search
const mockClients = [
  {
    id: 1,
    firstName: "John",
    surname: "Smith",
    email: "john.smith@email.com",
    city: "New York",
    province: "NY",
    sin: "123-456-789",
    planId: "PL001",
    clientId: "CL001",
    status: "active",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  },
  {
    id: 2,
    firstName: "Sarah",
    surname: "Johnson",
    email: "sarah.j@company.com",
    city: "Los Angeles",
    province: "CA",
    sin: "987-654-321",
    planId: "PL002",
    clientId: "CL002",
    status: "active",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  },
  {
    id: 3,
    firstName: "Michael",
    surname: "Chen",
    email: "m.chen@investments.com",
    city: "San Francisco",
    province: "CA",
    sin: "456-789-012",
    planId: "PL003",
    clientId: "CL003",
    status: "pending",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  },
  {
    id: 4,
    firstName: "Emily",
    surname: "Davis",
    email: "emily.davis@trading.com",
    city: "Chicago",
    province: "IL",
    sin: "321-098-765",
    planId: "PL004",
    clientId: "CL004",
    status: "inactive",
    avatar: "/placeholder-user.jpg",
    hasAlert: true
  },
  {
    id: 5,
    firstName: "Robert",
    surname: "Wilson",
    email: "r.wilson@capital.com",
    city: "Boston",
    province: "MA",
    sin: "654-321-098",
    planId: "PL005",
    clientId: "CL005",
    status: "active",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  },
  {
    id: 6,
    firstName: "Elton",
    surname: "Andrews",
    email: "elton.andrews@email.com",
    city: "Toronto",
    province: "ON",
    sin: "111-222-333",
    planId: "PL006",
    clientId: "CL006",
    status: "active",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  },
  {
    id: 7,
    firstName: "Francoise",
    surname: "Andrews",
    email: "francoise.andrews@email.com",
    city: "Vancouver",
    province: "BC",
    sin: "333-444-555",
    planId: "PL007",
    clientId: "CL007",
    status: "active",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  },
  {
    id: 8,
    firstName: "Amy",
    surname: "Armstrong",
    email: "amy.armstrong@email.com",
    city: "Montreal",
    province: "QC",
    sin: "555-666-777",
    planId: "PL008",
    clientId: "CL008",
    status: "active",
    avatar: "/placeholder-user.jpg",
    hasAlert: false
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClientsExpanded, setIsClientsExpanded] = useState(false)
  const [clientSearchTerm, setClientSearchTerm] = useState("")
  const [searchForm, setSearchForm] = useState({
    firstName: "",
    surname: "",
    city: "",
    province: "",
    sin: "",
    planId: "",
    clientId: ""
  })
  const [selectedClientIds, setSelectedClientIds] = useState<number[]>([])

  // Auto-expand dropdown when on clients page
  useEffect(() => {
    if (pathname === '/clients') {
      setIsClientsExpanded(true)
    }
  }, [pathname])

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  // Filter clients based on search form
  const filteredClients = mockClients.filter(client => {
    const matchesFirstName = !searchForm.firstName || 
      client.firstName?.toLowerCase().includes(searchForm.firstName.toLowerCase())
    const matchesSurname = !searchForm.surname || 
      client.surname?.toLowerCase().includes(searchForm.surname.toLowerCase())
    const matchesCity = !searchForm.city || 
      client.city?.toLowerCase().includes(searchForm.city.toLowerCase())
    const matchesProvince = !searchForm.province || 
      client.province?.toLowerCase().includes(searchForm.province.toLowerCase())
    const matchesSin = !searchForm.sin || 
      client.sin?.includes(searchForm.sin)
    const matchesPlanId = !searchForm.planId || 
      client.planId?.toLowerCase().includes(searchForm.planId.toLowerCase())
    const matchesClientId = !searchForm.clientId || 
      client.clientId?.toLowerCase().includes(searchForm.clientId.toLowerCase())
    
    // Also match simple search term
    const matchesSearchTerm = !clientSearchTerm || 
      client.firstName?.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
      client.surname?.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(clientSearchTerm.toLowerCase())
    
    return (matchesFirstName && matchesSurname && matchesCity && 
            matchesProvince && matchesSin && matchesPlanId && matchesClientId) &&
           matchesSearchTerm
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-2.5 w-2.5 text-green-600" />
      case "pending":
        return <Clock className="h-2.5 w-2.5 text-yellow-600" />
      case "inactive":
        return <PauseCircle className="h-2.5 w-2.5 text-gray-500" />
      default:
        return <div className="h-2.5 w-2.5 rounded-full bg-gray-400" />
    }
  }


  // Handle search form updates
  const handleSearchFormChange = (field: string, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle search execution
  const handleSearch = () => {
    // Build search parameters for URL
    const searchParams = new URLSearchParams()
    
    Object.entries(searchForm).forEach(([key, value]) => {
      if (value.trim()) {
        searchParams.set(key, value.trim())
      }
    })
    
    // Navigate to clients page with search parameters
    const queryString = searchParams.toString()
    router.push(`/clients${queryString ? `?${queryString}` : ''}`)
  }

  // Handle reset
  const handleReset = () => {
    setSearchForm({
      firstName: "",
      surname: "",
      city: "",
      province: "",
      sin: "",
      planId: "",
      clientId: ""
    })
    setSelectedClientIds([])
    setClientSearchTerm("")
  }

  // Handle client selection
  const handleClientSelection = (clientId: number, checked: boolean) => {
    if (checked) {
      setSelectedClientIds(prev => [...prev, clientId])
    } else {
      setSelectedClientIds(prev => prev.filter(id => id !== clientId))
    }
  }

  // Navigate to specific client details
  const handleClientClick = (clientId: number) => {
    router.push(`/clients/${clientId}`)
  }

  // Select all/none functions
  const handleSelectAll = () => {
    setSelectedClientIds(filteredClients.map(client => client.id))
  }

  const handleSelectNone = () => {
    setSelectedClientIds([])
  }



  function NavItem({
    href,
    icon: Icon,
    children,
    isExpandable = false,
    isExpanded = false,
    onToggle,
  }: {
    href: string
    icon: any
    children: React.ReactNode
    isExpandable?: boolean
    isExpanded?: boolean
    onToggle?: () => void
  }) {
    if (isExpandable) {
      return (
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        >
          <div className="flex items-center">
            <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
            {children}
          </div>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      )
    }

    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 px-6 flex items-center bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-900">
                <Building2 className="h-5 w-5 text-gray-50" />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                OneBoss
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4 scrollbar-hide">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Main Navigation
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                      <Link
                        href="/clients"
                        onClick={() => {
                          // Immediately expand dropdown
                          setIsClientsExpanded(true)
                          // Navigate to clients page
                          handleNavigation()
                        }}
                        className="flex items-center flex-1"
                      >
                        <Users2 className="h-4 w-4 mr-3 flex-shrink-0" />
                        Clients
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setIsClientsExpanded(!isClientsExpanded)
                        }}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                      >
                        {isClientsExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Client Search Form */}
                  <div className={`ml-4 space-y-3 pl-4 pr-2 overflow-hidden transition-all duration-500 ease-in-out ${
                    isClientsExpanded 
                      ? 'max-h-[700px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}>
                      {/* Client Search Form */}
                      <div className={`space-y-3 pt-2 transition-all duration-500 delay-100 ${
                        isClientsExpanded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                      }`}>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-gray-900">Client Search</h3>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <label className="text-xs font-medium text-gray-700">First Name *</label>
                            <Input
                              placeholder="Enter first name"
                              className="h-7 text-xs"
                              value={searchForm.firstName}
                              onChange={(e) => handleSearchFormChange('firstName', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700">Surname *</label>
                            <Input
                              placeholder="Enter surname"
                              className="h-7 text-xs"
                              value={searchForm.surname}
                              onChange={(e) => handleSearchFormChange('surname', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700">City *</label>
                            <Input
                              placeholder="Enter city"
                              className="h-7 text-xs"
                              value={searchForm.city}
                              onChange={(e) => handleSearchFormChange('city', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700">Province</label>
                            <Select value={searchForm.province} onValueChange={(value) => handleSearchFormChange('province', value)}>
                              <SelectTrigger className="h-7 text-xs">
                                <SelectValue placeholder="Select province" />
                              </SelectTrigger>
                              <SelectContent>
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
                                <SelectItem value="NT">Northwest Territories</SelectItem>
                                <SelectItem value="NU">Nunavut</SelectItem>
                                <SelectItem value="YT">Yukon</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700">SIN</label>
                            <Input
                              placeholder="Enter SIN"
                              className="h-7 text-xs"
                              value={searchForm.sin}
                              onChange={(e) => handleSearchFormChange('sin', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700">Plan ID</label>
                            <Input
                              placeholder="Enter plan ID"
                              className="h-7 text-xs"
                              value={searchForm.planId}
                              onChange={(e) => handleSearchFormChange('planId', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700">Client ID</label>
                            <Input
                              placeholder="Enter client ID"
                              className="h-7 text-xs"
                              value={searchForm.clientId}
                              onChange={(e) => handleSearchFormChange('clientId', e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500">* Wildcard support ?</p>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button 
                            onClick={handleSearch}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white h-7 text-xs"
                          >
                            Search
                            <ChevronDown className="h-3 w-3 ml-1" />
                          </Button>
                          <Button 
                            variant="outline" 
                            className="h-7 text-xs"
                            onClick={handleReset}
                          >
                            Reset
                          </Button>
                        </div>
                      </div>

                      {/* Client Results */}
                      <div className={`space-y-3 transition-all duration-500 delay-150 ${
                        isClientsExpanded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                      }`}>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-gray-900 bg-blue-50 px-3 py-1 rounded-md border">
                            🔍 {filteredClients.length} Found
                          </h4>
                        </div>
                        
                        <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                          {filteredClients.map((client) => (
                            <div
                              key={client.id}
                              className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 cursor-pointer border border-transparent hover:border-blue-200 transition-all"
                              onClick={() => handleClientClick(client.id)}
                            >
                              <Checkbox 
                                className="h-3.5 w-3.5"
                                checked={selectedClientIds.includes(client.id)}
                                onCheckedChange={(checked) => handleClientSelection(client.id, checked as boolean)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                {getStatusIcon(client.status)}
                                <div className="text-xs font-medium text-gray-900 truncate">
                                  {client.surname}, {client.firstName}
                                </div>
                              </div>
                              {client.hasAlert && (
                                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-1 pt-1 border-t border-gray-200">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs h-7 flex-1"
                            onClick={handleSelectNone}
                          >
                            Clear
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs h-7 flex-1"
                            onClick={handleSelectAll}
                          >
                            All ({filteredClients.length})
                          </Button>
                        </div>
                      </div>
                    </div>
                  
                  <NavItem href="#" icon={BarChart2}>
                    Trades
                  </NavItem>
                  <NavItem href="#" icon={Wallet}>
                    Trust Deposits
                  </NavItem>
                  <NavItem href="#" icon={Target}>
                    Prospects
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Management
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Building2}>
                    Ensemble
                  </NavItem>
                  <NavItem href="#" icon={User}>
                    KYP
                  </NavItem>
                  <NavItem href="#" icon={Folder}>
                    Resources
                  </NavItem>
                  <NavItem href="#" icon={DollarSign}>
                    Earnings
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  System
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Shield}>
                    Notices
                  </NavItem>
                  <NavItem href="#" icon={Settings}>
                    Settings
                  </NavItem>
                  <NavItem href="#" icon={MessagesSquare}>
                    Support
                  </NavItem>
                </div>
              </div>
            </div>
          </div>


        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
