'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, FileText, Clock, CheckCircle, XCircle, AlertCircle, Filter } from 'lucide-react'

const tradeNavItems = [
  { href: '/trades', label: 'All Trades', icon: FileText },
]

export function TradeNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const handleAdvancedSearch = () => {
    router.push('/trades/advance-search')
  }

  return (
    <div className="bg-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-0.5">
            {tradeNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`h-7 px-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-blue-800 hover:bg-blue-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
            
            {/* Advance Search Button */}
            <Button
              variant={pathname === '/trades/advance-search' ? "default" : "ghost"}
              size="sm"
              onClick={handleAdvancedSearch}
              className={`h-7 px-2 text-sm font-medium transition-colors ${
                pathname === '/trades/advance-search'
                  ? 'text-white bg-blue-800 hover:bg-blue-900'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Advance Search
            </Button>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search trades..."
                className="pl-10 w-80 h-8 text-sm"
              />
            </div>
            <Button size="sm" className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Trade
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
