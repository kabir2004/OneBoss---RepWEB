"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { Bell, ChevronRight, Mail, Filter, PanelLeftClose, PanelLeftOpen, Users2, Home, FileText, CheckSquare, BarChart2, Search, CheckCircle, Clock, PauseCircle, Grid, List, ShoppingCart as ShoppingCartIcon, Eye, EyeOff, MapPin, User } from "lucide-react"
import Profile01 from "./profile-01"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSidebar } from "@/components/sidebar-context"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { mockClients } from "@/lib/client-data"
import ShoppingCartModal from "./shopping-cart"
import { useActiveTab } from "../active-tab-context"
import { useViewMode } from "../view-mode-context"
import { useNelsonHide } from "../nelson-hide-context"

interface BreadcrumbItem {
  label: string
  href?: string
}

const clientNavItems = [
  {
    href: "/clients",
    label: "All Clients",
    icon: Users2,
    description: "Browse and manage all clients"
  },
  {
    href: "/clients/households",
    label: "Households",
    icon: Home,
    description: "Manage client households and families"
  },
  {
    href: "/clients/income-plans",
    label: "Income Plans",
    icon: FileText,
    description: "View and manage income planning"
  },
  {
    href: "/clients/approval",
    label: "Approvals",
    icon: CheckSquare,
    description: "Pending approvals and reviews"
  },
  {
    href: "/clients/reports",
    label: "Reports",
    icon: BarChart2,
    description: "Client reports and analytics"
  },
  {
    href: "/clients/advanced-search",
    label: "Advanced Search",
    icon: Search,
    description: "Advanced client search tools"
  }
]

export default function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { isCollapsed, toggleSidebar } = useSidebar()
  const { isNelsonHidden, toggleNelsonHide } = useNelsonHide()
  const { viewMode, setViewMode } = useViewMode()
  const { activeTab, setActiveTab, selectedStatuses, toggleStatus } = useActiveTab()
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { label: "OneBoss", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
  ])
  const [clients] = useState(mockClients)
  const [filteredClients, setFilteredClients] = useState(mockClients)
  const [searchQuery, setSearchQuery] = useState('')
  const [showShoppingCart, setShowShoppingCart] = useState(false)
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  useEffect(() => {
    const generateBreadcrumbs = () => {
      const pathSegments = pathname.split('/').filter(Boolean)
      const breadcrumbItems: BreadcrumbItem[] = [
        { label: "OneBoss", href: "/" }
      ]

      if (pathSegments.length === 0) {
        breadcrumbItems.push({ label: "Dashboard", href: "/dashboard" })
      } else if (pathSegments[0] === 'dashboard') {
        breadcrumbItems.push({ label: "Dashboard", href: "/dashboard" })
      } else if (pathSegments[0] === 'clients') {
        breadcrumbItems.push({ label: "Clients", href: "/clients" })
        
        if (pathSegments[1] === 'households') {
          breadcrumbItems.push({ label: "Households", href: "/clients/households" })
        } else if (pathSegments[1] === 'income-plans') {
          breadcrumbItems.push({ label: "Income Plans", href: "/clients/income-plans" })
        } else if (pathSegments[1] === 'approval') {
          breadcrumbItems.push({ label: "Approvals", href: "/clients/approval" })
        } else if (pathSegments[1] === 'reports') {
          breadcrumbItems.push({ label: "Reports", href: "/clients/reports" })
        } else if (pathSegments[1] === 'advanced-search') {
          breadcrumbItems.push({ label: "Advanced Search", href: "/clients/advanced-search" })
        } else if (pathSegments[1] && pathSegments[1] !== 'households' && pathSegments[1] !== 'income-plans' && pathSegments[1] !== 'approval' && pathSegments[1] !== 'reports' && pathSegments[1] !== 'advanced-search') {
          breadcrumbItems.push({ label: "Client Details", href: `/clients/${pathSegments[1]}` })
        }
      } else if (pathSegments[0] === 'trades') {
        breadcrumbItems.push({ label: "Trades", href: "/trades" })
      } else if (pathSegments[0] === 'trust-deposits') {
        breadcrumbItems.push({ label: "Trust Deposits", href: "/trust-deposits" })
      }
      
      setBreadcrumbs(breadcrumbItems)
    }

    generateBreadcrumbs()
  }, [pathname])
  
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [acknowledgedDocuments, setAcknowledgedDocuments] = useState<Set<string>>(new Set())
  const [isClient, setIsClient] = useState(false)

  // Ensure client-side only rendering for state-dependent UI
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleViewDocument = (documentName: string) => {
    setSelectedDocument(documentName)
    setIsDialogOpen(true)
  }

  const handleAcknowledge = () => {
    if (selectedDocument) {
      setAcknowledgedDocuments(prev => new Set([...prev, selectedDocument]))
    }
    setIsDialogOpen(false)
    setSelectedDocument(null)
  }

  const totalDocuments = 4
  const remainingCount = isClient ? totalDocuments - acknowledgedDocuments.size : totalDocuments

  const isDocumentAcknowledged = (documentName: string) => {
    return isClient && acknowledgedDocuments.has(documentName)
  }

  // Client filtering logic
  const getClientsByStatus = (status: string) => {
    return filteredClients.filter(client => client.status === status)
  }

  const activeClients = getClientsByStatus('active')
  const inactiveClients = getClientsByStatus('inactive')
  const prospectClients = getClientsByStatus('pending')
  const allClients = filteredClients

  const isClientsPage = pathname.startsWith('/clients') && !pathname.includes('/clients/') || pathname === '/clients'

  // Enhanced search functionality
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setShowSearchSuggestions(value.length > 0)
    
    if (value.length > 0) {
      const filtered = clients.filter(client => {
        const fullName = `${client.firstName} ${client.surname}`.toLowerCase()
        const email = client.email?.toLowerCase() || ''
        const clientId = client.clientId?.toLowerCase() || ''
        const location = `${client.city}, ${client.province}`.toLowerCase()
        const searchTerm = value.toLowerCase()
        
        return fullName.includes(searchTerm) ||
               email.includes(searchTerm) ||
               clientId.includes(searchTerm) ||
               location.includes(searchTerm) ||
               client.city?.toLowerCase().includes(searchTerm) ||
               client.province?.toLowerCase().includes(searchTerm)
      })
      setSearchResults(filtered.slice(0, 5)) // Limit to 5 results for suggestions
    } else {
      setSearchResults([])
    }
  }

  const handleClientSelect = (client: any) => {
    setSearchQuery('')
    setShowSearchSuggestions(false)
    setSearchResults([])
    router.push(`/clients/${client.id}`)
  }

  return (
    <div className="bg-white border-b border-border relative z-10">
      <nav className="px-3 sm:px-6 flex items-center justify-between h-16 bg-white">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle Button - Moved closer to sidebar edge */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="p-1.5 sm:p-2 hover:bg-accent rounded-full transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            ) : (
              <PanelLeftClose className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            )}
          </button>
          
          {/* Breadcrumbs */}
        <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
          {breadcrumbs.map((item, index) => (
            <div key={item.label} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-card-foreground">{item.label}</span>
              )}
            </div>
          ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-accent rounded-full transition-colors relative"
          onClick={() => setShowShoppingCart(true)}
        >
          <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-500 text-white">
            3
          </Badge>
        </button>

        <button
          type="button"
          className={`p-1.5 sm:p-2 hover:bg-accent rounded-full transition-colors ${
            isNelsonHidden ? 'bg-orange-100 text-orange-600' : 'text-muted-foreground'
          }`}
          onClick={toggleNelsonHide}
          title={isNelsonHidden ? "Show Nelson's Items" : "Hide Nelson's Items"}
        >
          {isNelsonHidden ? (
            <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </button>

        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-accent rounded-full transition-colors"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
        </button>

        <ThemeToggle />

        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="p-1.5 sm:p-2 hover:bg-accent rounded-full transition-colors relative"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              {isClient && remainingCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0 font-medium">
                  {remainingCount}
                </Badge>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[680px] p-0 bg-card border border-border shadow-xl" align="end">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">Attestations</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isClient ? (
                      remainingCount > 0 
                        ? `${remainingCount} document${remainingCount === 1 ? '' : 's'} require your attention`
                        : "All documents have been acknowledged"
                    ) : (
                      "4 documents require your attention"
                    )}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground text-sm">Code of Business Conduct and Ethics 2024</h4>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Version: -</span>
                        <span>Author: Som Houmphanh</span>
                        <span>Date: January 24, 2025</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className={isDocumentAcknowledged("Code of Business Conduct and Ethics 2024") 
                        ? "bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 h-8 cursor-default" 
                        : "bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 h-8"
                      }
                      onClick={() => !isDocumentAcknowledged("Code of Business Conduct and Ethics 2024") && handleViewDocument("Code of Business Conduct and Ethics 2024")}
                      disabled={isDocumentAcknowledged("Code of Business Conduct and Ethics 2024")}
                    >
                      {isDocumentAcknowledged("Code of Business Conduct and Ethics 2024") ? "Acknowledged" : "View and Acknowledge"}
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground text-sm">PPM</h4>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Version: 2023</span>
                        <span>Author: Som Houmphanh</span>
                        <span>Date: June 28, 2024</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className={isDocumentAcknowledged("PPM") 
                        ? "bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 h-8 cursor-default" 
                        : "bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 h-8"
                      }
                      onClick={() => !isDocumentAcknowledged("PPM") && handleViewDocument("PPM")}
                      disabled={isDocumentAcknowledged("PPM")}
                    >
                      {isDocumentAcknowledged("PPM") ? "Acknowledged" : "View and Acknowledge"}
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground text-sm">Code of Business Conduct</h4>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Version: 2023</span>
                        <span>Author: Som Houmphanh</span>
                        <span>Date: October 10, 2023</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className={isDocumentAcknowledged("Code of Business Conduct") 
                        ? "bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 h-8 cursor-default" 
                        : "bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 h-8"
                      }
                      onClick={() => !isDocumentAcknowledged("Code of Business Conduct") && handleViewDocument("Code of Business Conduct")}
                      disabled={isDocumentAcknowledged("Code of Business Conduct")}
                    >
                      {isDocumentAcknowledged("Code of Business Conduct") ? "Acknowledged" : "View and Acknowledge"}
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground text-sm">Client Focused Reforms</h4>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Version: 2021</span>
                        <span>Author: Som Houmphanh</span>
                        <span>Date: December 16, 2021</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className={isDocumentAcknowledged("Client Focused Reforms") 
                        ? "bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 h-8 cursor-default" 
                        : "bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 h-8"
                      }
                      onClick={() => !isDocumentAcknowledged("Client Focused Reforms") && handleViewDocument("Client Focused Reforms")}
                      disabled={isDocumentAcknowledged("Client Focused Reforms")}
                    >
                      {isDocumentAcknowledged("Client Focused Reforms") ? "Acknowledged" : "View and Acknowledge"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Document View Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-card border border-border">
            <DialogHeader className="p-6 border-b border-gray-100 dark:border-gray-800">
              <DialogTitle className="text-xl font-semibold text-card-foreground">
                Attestations
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-card-foreground mb-3">Document Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Document:</span>
                        <span className="ml-2 text-card-foreground font-medium">{selectedDocument}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Author:</span>
                        <span className="ml-2 text-card-foreground">Som Houmphanh</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span>
                        <span className="ml-2 text-card-foreground">January 24, 2025</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <span className="ml-2 text-card-foreground">Pending Acknowledgment</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-card-foreground">Document Content</h3>
                    
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 max-h-96 overflow-y-auto">
                      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                        <p>
                          This document outlines the Code of Business Conduct and Ethics that all employees must follow. 
                          It establishes the standards of behavior expected from our team members and provides guidance 
                          on ethical decision-making in the workplace.
                        </p>
                        
                        <h4 className="font-medium text-card-foreground">Key Principles</h4>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Integrity and honesty in all business dealings</li>
                          <li>Respect for colleagues, clients, and stakeholders</li>
                          <li>Compliance with applicable laws and regulations</li>
                          <li>Confidentiality of company and client information</li>
                          <li>Fair and ethical treatment of all parties</li>
                        </ul>
                        
                        <h4 className="font-medium text-card-foreground">Compliance Requirements</h4>
                        <p>
                          All employees are required to read, understand, and acknowledge this document. 
                          Failure to comply with these standards may result in disciplinary action, up to 
                          and including termination of employment.
                        </p>
                        
                        <h4 className="font-medium text-card-foreground">Reporting Violations</h4>
                        <p>
                          If you become aware of any violations of this code, you are obligated to report 
                          them to your supervisor, Human Resources, or through the company's anonymous 
                          reporting hotline.
                        </p>
                        
                        <h4 className="font-medium text-card-foreground">Updates and Revisions</h4>
                        <p>
                          This document may be updated periodically to reflect changes in business practices, 
                          legal requirements, or company policies. You will be notified of any significant 
                          changes and may be required to re-acknowledge the updated document.
                        </p>
                        
                        <h4 className="font-medium text-card-foreground">Contact Information</h4>
                        <p>
                          If you have questions about this code or need clarification on any provisions, 
                          please contact the Human Resources department or your immediate supervisor.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  By clicking "Acknowledge", you confirm that you have read and understood this document.
                </p>
                <Button
                  onClick={handleAcknowledge}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-medium"
                >
                  Acknowledge
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Image
              src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
              alt="User avatar"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-gray-200 sm:w-8 sm:h-8 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-card border border-border rounded-lg shadow-lg"
          >
            <Profile01 avatar="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" />
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </nav>
      
      {/* Client Navigation and Status Filters - Only show on clients page */}
      {pathname.startsWith('/clients') && (
        <div className="bg-white border-b border-border shadow-sm relative z-10">
          {/* Client Navigation Tabs */}
          <div className="px-4 sm:px-6 lg:px-8 bg-white">
            <div className="flex items-center justify-start py-3">
              <div className="flex items-center gap-1">
                {clientNavItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        group relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded transition-all duration-200
                        ${isActive
                          ? 'text-white bg-blue-800'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Search Field */}
          <div className="px-4 sm:px-6 lg:px-8 pb-4 bg-white">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search clients by name, email, ID, or location..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setShowSearchSuggestions(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                className="pl-10 h-11 text-sm bg-white border-input focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              
              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((client) => (
                    <div
                      key={client.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                      onClick={() => handleClientSelect(client)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {client.firstName} {client.surname}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {client.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {client.clientId}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {client.city}, {client.province}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <Badge 
                            variant={client.status === 'active' ? 'default' : client.status === 'inactive' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {client.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* No Results Message */}
              {showSearchSuggestions && searchQuery.length > 0 && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
                  <div className="text-sm text-gray-600 text-center">
                    No clients found matching "{searchQuery}"
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status Filters */}
          <div className="px-4 sm:px-6 lg:px-8 pb-4 bg-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              {/* Status Checkboxes */}
              <div className="flex items-center gap-8 flex-wrap">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="active-status"
                    checked={selectedStatuses.includes('active')}
                    onCheckedChange={() => toggleStatus('active')}
                  />
                  <label htmlFor="active-status" className="text-sm font-medium text-foreground cursor-pointer flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Active</span>
                    <span className="text-lg font-bold text-muted-foreground">({activeClients.length})</span>
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="inactive-status"
                    checked={selectedStatuses.includes('inactive')}
                    onCheckedChange={() => toggleStatus('inactive')}
                  />
                  <label htmlFor="inactive-status" className="text-sm font-medium text-foreground cursor-pointer flex items-center gap-2">
                    <PauseCircle className="h-4 w-4 text-muted-foreground" />
                    <span>Inactive</span>
                    <span className="text-lg font-bold text-muted-foreground">({inactiveClients.length})</span>
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="prospect-status"
                    checked={selectedStatuses.includes('prospect')}
                    onCheckedChange={() => toggleStatus('prospect')}
                  />
                  <label htmlFor="prospect-status" className="text-sm font-medium text-foreground cursor-pointer flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span>Prospects</span>
                    <span className="text-lg font-bold text-muted-foreground">({prospectClients.length})</span>
                  </label>
                </div>
              </div>

              {/* Right side - View Toggle */}
              <div className="flex items-center gap-3">
                <div className="flex bg-card border border-border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none border-0 h-8 px-3"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none border-0 h-8 px-3"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      <ShoppingCartModal 
        isOpen={showShoppingCart} 
        onClose={() => setShowShoppingCart(false)} 
      />
    </div>
  )
}
