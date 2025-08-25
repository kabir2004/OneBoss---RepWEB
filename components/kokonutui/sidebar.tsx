"use client"

import {
  BarChart2,
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
  Target,
  User,
  DollarSign,
} from "lucide-react"

import { Home } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: any
    children: React.ReactNode
  }) {
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
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 px-6 flex items-center border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-900">
                <Building2 className="h-5 w-5 text-gray-50" />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                OneBoss
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Main Navigation
                </div>
                <div className="space-y-1">
                  <NavItem href="#" icon={Home}>
                    Dashboard
                  </NavItem>
                  <NavItem href="#" icon={Users2}>
                    Clients
                  </NavItem>
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

          <div className="px-4 py-4 border-t border-gray-200">
            <div className="space-y-1">
              <NavItem href="#" icon={Settings}>
                Settings
              </NavItem>
              <NavItem href="#" icon={HelpCircle}>
                Help
              </NavItem>
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
