"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Users2, 
  Home, 
  FileText, 
  CheckSquare, 
  BarChart2,
  Search
} from "lucide-react"

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
    </div>
  )
}
