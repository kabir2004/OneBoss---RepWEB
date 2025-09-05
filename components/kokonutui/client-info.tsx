"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { 
  CheckCircle,
  Clock,
  PauseCircle,
  Search,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Filter,
  Download,
  Target,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  BarChart3,
  FileText,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  HelpCircle,
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for clients - matching ONEBOSS style
const mockClients = [
  {
    id: 1,
    firstName: "John",
    surname: "Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    city: "New York",
    province: "NY",
    sin: "123-456-789",
    planId: "PL001",
    clientId: "CL001",
    status: "active",
    clientType: "Individual",
    gender: "Male",
    title: "Mr.",
    joinDate: "2024-01-15",
    totalTrades: 45,
    totalVolume: 125000,
    lastActivity: "2024-01-20",
    location: "New York, NY",
    avatar: "/placeholder-user.jpg",
    hasAlert: false,
    // Additional detailed information
    mailingAddress: "123 Main Street, New York, NY 10001",
    residentialAddress: "123 Main Street, New York, NY 10001",
    cellPhone: "+1 (555) 123-4567",
    homePhone: "+1 (555) 123-4568",
    preferredLanguage: "English",
    currentRepresentative: "Smith, John",
    totalAssets: 125000,
    investments: [
      {
        supplier: "AGF-183",
        account: "7133830868",
        product: "AGF GLOBAL STRATEGIC INCOME FUND FE SERIES T",
        risk: "LM",
        objective: "Balanced",
        marketValue: 0.00
      },
      {
        supplier: "WVN-618",
        account: "5587321064",
        product: "GW CDN FUND (618)",
        risk: "H",
        objective: "Speculation",
        marketValue: 94.38
      },
      {
        supplier: "WVN-691",
        account: "3618816142",
        product: "GW CDN DIV I (691)",
        risk: "H",
        objective: "Speculation",
        marketValue: 260.56
      }
    ],
    settledTrustCAD: 0.00,
    settledTrustUSD: 0.00,
    totalCAD: 354.94
  },
  {
    id: 2,
    firstName: "Sarah",
    surname: "Johnson",
    email: "sarah.j@company.com",
    phone: "+1 (555) 987-6543",
    city: "Los Angeles",
    province: "CA",
    sin: "987-654-321",
    planId: "PL002",
    clientId: "CL002",
    status: "active",
    clientType: "Individual",
    gender: "Female",
    title: "Ms.",
    joinDate: "2024-01-10",
    totalTrades: 32,
    totalVolume: 89000,
    lastActivity: "2024-01-19",
    location: "Los Angeles, CA",
    avatar: "/placeholder-user.jpg",
    hasAlert: false,
    // Additional detailed information
    mailingAddress: "456 Oak Avenue, Los Angeles, CA 90210",
    residentialAddress: "456 Oak Avenue, Los Angeles, CA 90210",
    cellPhone: "+1 (555) 987-6543",
    homePhone: "+1 (555) 987-6544",
    preferredLanguage: "English",
    currentRepresentative: "Johnson, Sarah",
    totalAssets: 89000,
    investments: [
      {
        supplier: "CI-001",
        account: "1234567890",
        product: "CI MONEY MARKET FUND",
        risk: "L",
        objective: "Income",
        marketValue: 25000.00
      },
      {
        supplier: "MFC-002",
        account: "0987654321",
        product: "MANULIFE DIVIDEND INCOME FUND",
        risk: "M",
        objective: "Balanced",
        marketValue: 64000.00
      }
    ],
    settledTrustCAD: 0.00,
    settledTrustUSD: 0.00,
    totalCAD: 89000.00
  }
]

interface ClientInfoProps {
  clientId: string
}

export default function ClientInfo({ clientId }: ClientInfoProps) {
  const router = useRouter()
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Utility functions
  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "pending":
        return <Clock className="h-3 w-3 text-yellow-600" />
      case "inactive":
        return <PauseCircle className="h-3 w-3 text-gray-500" />
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-400" />
    }
  }, [])

  // Load client data
  useEffect(() => {
    const foundClient = mockClients.find(c => c.id.toString() === clientId)
    if (foundClient) {
      setClient(foundClient)
    }
    setLoading(false)
  }, [clientId])

  const handleBack = () => {
    router.push('/clients')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading client information...</p>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Client Not Found</h3>
          <p className="text-gray-500 mb-4">The requested client could not be found.</p>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Client Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Client: {client.surname}, {client.firstName}
              </h1>
              <p className="text-sm text-gray-500">ID: {client.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Client Tabs */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="summary" className="h-full">
          <div className="bg-white border-b border-gray-200">
            <TabsList className="h-12 w-full justify-start bg-transparent">
              <TabsTrigger value="summary" className="text-sm">Summary</TabsTrigger>
              <TabsTrigger value="details" className="text-sm">Details</TabsTrigger>
              <TabsTrigger value="notes" className="text-sm">Notes</TabsTrigger>
              <TabsTrigger value="plans" className="text-sm">Plans</TabsTrigger>
              <TabsTrigger value="trading" className="text-sm">Trading</TabsTrigger>
              <TabsTrigger value="questionnaires" className="text-sm">Questionnaires</TabsTrigger>
              <TabsTrigger value="reports" className="text-sm">Client Reports</TabsTrigger>
              <TabsTrigger value="charts" className="text-sm">Charts</TabsTrigger>
              <TabsTrigger value="approvals" className="text-sm">Approvals</TabsTrigger>
              <TabsTrigger value="attachments" className="text-sm">Attachments</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="summary" className="p-6 space-y-6">
            {/* Summary Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Mailing Address</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>{client.mailingAddress}</div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      <span>Home: {client.homePhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      <span>Cell: {client.cellPhone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Residential Address</h3>
                  <div className="text-sm text-gray-600">{client.residentialAddress}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Email Address</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-3 w-3" />
                    <span>{client.email}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Preferred Language</h3>
                  <div className="text-sm text-gray-600">{client.preferredLanguage}</div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Current Representative</h3>
                  <div className="text-sm text-gray-600">{client.currentRepresentative}</div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Total Assets</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BarChart3 className="h-3 w-3" />
                    <span>${client.totalCAD?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information Tabs */}
            <div className="border-t border-gray-200 pt-6">
              <Tabs defaultValue="investments" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="investments">Investments</TabsTrigger>
                  <TabsTrigger value="cash">Cash</TabsTrigger>
                  <TabsTrigger value="trading">Recent Trading Activity</TabsTrigger>
                  <TabsTrigger value="documents" className="flex items-center gap-1">
                    Product Documents
                    <AlertTriangle className="h-3 w-3 text-orange-500" />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="investments" className="mt-4">
                  <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {client.investments?.[0]?.account} (RRSP Broker/Nominee, Individual)
                          </h4>
                          <p className="text-sm text-gray-500">
                            Data Entry Wizard SMI 6351780554 - 9823-2232 {client.currentRepresentative}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <DollarSign className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Account</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Risk</TableHead>
                          <TableHead>Objective</TableHead>
                          <TableHead>Market Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {client.investments?.map((investment: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{investment.supplier}</TableCell>
                            <TableCell>{investment.account}</TableCell>
                            <TableCell>{investment.product}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{investment.risk}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span>{investment.objective}</span>
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 bg-blue-500 rounded"></div>
                                  <div className="w-2 h-2 bg-blue-500 rounded"></div>
                                  <FileText className="h-3 w-3 text-gray-400" />
                                  <HelpCircle className="h-3 w-3 text-gray-400" />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>${investment.marketValue.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Settled Trust Account Balance CAD:</span>
                          <span className="ml-2 font-medium">${client.settledTrustCAD?.toFixed(2) || '0.00'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Settled Trust Account Balance USD:</span>
                          <span className="ml-2 font-medium">${client.settledTrustUSD?.toFixed(2) || '0.00'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Total in CAD:</span>
                          <span className="ml-2 font-medium">${client.totalCAD?.toFixed(2) || '0.00'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cash" className="mt-4">
                  <div className="text-center py-8 text-gray-500">
                    <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Cash information will be displayed here</p>
                  </div>
                </TabsContent>

                <TabsContent value="trading" className="mt-4">
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Recent trading activity will be displayed here</p>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-4">
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Product documents will be displayed here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="details" className="p-6">
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Client details will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="p-6">
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Client notes will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="plans" className="p-6">
            <div className="text-center py-8 text-gray-500">
              <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Client plans will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="trading" className="p-6">
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Trading information will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="questionnaires" className="p-6">
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Questionnaires will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="p-6">
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Client reports will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="charts" className="p-6">
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Charts will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="approvals" className="p-6">
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Approvals will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="attachments" className="p-6">
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Attachments will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
