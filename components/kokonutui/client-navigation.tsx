"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Users2, 
  Home, 
  FileText, 
  CheckSquare, 
  BarChart2,
  Search,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

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

export default function ClientNavigation() {
  const pathname = usePathname()

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-0.5">
            {clientNavItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    group relative flex items-center gap-2 px-2 py-1 text-sm font-medium rounded transition-all duration-200
                    ${isActive 
                      ? 'text-white bg-blue-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients..."
                className="pl-10 w-64 h-8 text-sm"
              />
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
