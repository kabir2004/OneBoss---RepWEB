"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { Bell, ChevronRight, Mail, Filter } from "lucide-react"
import Profile01 from "./profile-01"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function TopNav() {
  const [breadcrumbs] = useState<BreadcrumbItem[]>([
    { label: "OneBoss", href: "#" },
    { label: "Dashboard", href: "#" },
  ])
  
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [acknowledgedDocuments, setAcknowledgedDocuments] = useState<Set<string>>(new Set())

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
  const remainingCount = totalDocuments - acknowledgedDocuments.size

  const isDocumentAcknowledged = (documentName: string) => {
    return acknowledgedDocuments.has(documentName)
  }

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-white">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
        </button>

        <ThemeToggle />

        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
              {remainingCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0 font-medium">
                  {remainingCount}
                </Badge>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[680px] p-0 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 shadow-xl" align="end">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Attestations</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {remainingCount > 0 
                      ? `${remainingCount} document${remainingCount === 1 ? '' : 's'} require your attention`
                      : "All documents have been acknowledged"
                    }
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
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
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">Code of Business Conduct and Ethics 2024</h4>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
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
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">PPM</h4>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
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
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">Code of Business Conduct</h4>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
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
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">Client Focused Reforms</h4>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
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
          <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
            <DialogHeader className="p-6 border-b border-gray-100 dark:border-gray-800">
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Attestations
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Document Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Document:</span>
                        <span className="ml-2 text-gray-900 dark:text-white font-medium">{selectedDocument}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Author:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">Som Houmphanh</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Date:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">January 24, 2025</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Status:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">Pending Acknowledgment</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Document Content</h3>
                    
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 max-h-96 overflow-y-auto">
                      <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        <p>
                          This document outlines the Code of Business Conduct and Ethics that all employees must follow. 
                          It establishes the standards of behavior expected from our team members and provides guidance 
                          on ethical decision-making in the workplace.
                        </p>
                        
                        <h4 className="font-medium text-gray-900 dark:text-white">Key Principles</h4>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Integrity and honesty in all business dealings</li>
                          <li>Respect for colleagues, clients, and stakeholders</li>
                          <li>Compliance with applicable laws and regulations</li>
                          <li>Confidentiality of company and client information</li>
                          <li>Fair and ethical treatment of all parties</li>
                        </ul>
                        
                        <h4 className="font-medium text-gray-900 dark:text-white">Compliance Requirements</h4>
                        <p>
                          All employees are required to read, understand, and acknowledge this document. 
                          Failure to comply with these standards may result in disciplinary action, up to 
                          and including termination of employment.
                        </p>
                        
                        <h4 className="font-medium text-gray-900 dark:text-white">Reporting Violations</h4>
                        <p>
                          If you become aware of any violations of this code, you are obligated to report 
                          them to your supervisor, Human Resources, or through the company's anonymous 
                          reporting hotline.
                        </p>
                        
                        <h4 className="font-medium text-gray-900 dark:text-white">Updates and Revisions</h4>
                        <p>
                          This document may be updated periodically to reflect changes in business practices, 
                          legal requirements, or company policies. You will be notified of any significant 
                          changes and may be required to re-acknowledge the updated document.
                        </p>
                        
                        <h4 className="font-medium text-gray-900 dark:text-white">Contact Information</h4>
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
                <p className="text-sm text-gray-500 dark:text-gray-400">
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
            className="w-[280px] sm:w-80 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg"
          >
            <Profile01 avatar="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
