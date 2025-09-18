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
  ChevronLeft,
  ChevronRight,
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
  ArrowLeft,
  ArrowLeftRight,
  User,
  Calendar,
  Building,
  Shield,
  MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CustomCompensation from "./custom-compensation"
import KYC from "./kyc"
import ClientTrading from "./client-trading"
import ClientReports from "./client-reports"
import ClientCharts from "./client-charts"
import ClientApprovals from "./client-approvals"
import { mockClients } from "@/lib/client-data"

interface ClientInfoProps {
  clientId: string
}

export default function ClientInfo({ clientId }: ClientInfoProps) {
  const router = useRouter()
  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const handleBack = () => {
    router.push('/clients')
  }

  useEffect(() => {
    const foundClient = mockClients.find(c => c.id.toString() === clientId)
    if (foundClient) {
      setClient(foundClient)
    }
    setLoading(false)
  }, [clientId])

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBack}
                className="hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Clients
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {client.firstName[0]}{client.surname[0]}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    {client.firstName} {client.surname}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                    <span>•</span>
                    <span>ID: {client.clientId}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{client.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{client.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{client.city}, {client.province}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Account Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Client Type</span>
                  <span className="text-sm font-medium text-gray-900">{client.clientType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Join Date</span>
                  <span className="text-sm font-medium text-gray-900">{client.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Trades</span>
                  <span className="text-sm font-medium text-gray-900">{client.totalTrades}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Representative</span>
                  <span className="text-sm font-medium text-gray-900">{client.currentRepresentative}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Simplified client view is currently active.</p>
              <p className="text-sm text-gray-500">Full client details and functionality available in the complete component.</p>
              <Button onClick={handleBack} className="mt-4">
                Return to Client List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}