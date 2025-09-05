"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft,
  FileText,
  PenTool,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  User,
  Calendar,
  Mail,
  AlertTriangle,
  Eye,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const mockSignatureRequests = [
  {
    id: "ESG001",
    documentName: "Investment Agreement - RRSP",
    clientName: "Robert Johnson",
    clientEmail: "robert.johnson@email.com",
    sentDate: "2024-09-01",
    dueDate: "2024-09-08",
    status: "pending",
    signers: [
      { name: "Robert Johnson", email: "robert.johnson@email.com", status: "pending" },
      { name: "Sarah Johnson", email: "sarah.johnson@email.com", status: "signed", signedDate: "2024-09-02" }
    ],
    documentType: "investment_agreement",
    priority: "high"
  },
  {
    id: "ESG002",
    documentName: "KYC Update Form",
    clientName: "Michael Smith",
    clientEmail: "michael.smith@email.com",
    sentDate: "2024-08-30",
    dueDate: "2024-09-06",
    status: "completed",
    completedDate: "2024-09-01",
    signers: [
      { name: "Michael Smith", email: "michael.smith@email.com", status: "signed", signedDate: "2024-09-01" }
    ],
    documentType: "kyc_form",
    priority: "medium"
  },
  {
    id: "ESG003",
    documentName: "Transfer Authorization",
    clientName: "David Williams",
    clientEmail: "david.williams@email.com",
    sentDate: "2024-08-28",
    dueDate: "2024-09-04",
    status: "expired",
    signers: [
      { name: "David Williams", email: "david.williams@email.com", status: "expired" },
      { name: "Lisa Williams", email: "lisa.williams@email.com", status: "expired" }
    ],
    documentType: "transfer_form",
    priority: "urgent"
  },
  {
    id: "ESG004",
    documentName: "Advisory Agreement Amendment",
    clientName: "Patricia Brown",
    clientEmail: "patricia.brown@email.com",
    sentDate: "2024-09-02",
    dueDate: "2024-09-09",
    status: "in_progress",
    signers: [
      { name: "Patricia Brown", email: "patricia.brown@email.com", status: "signed", signedDate: "2024-09-02" },
      { name: "James Brown", email: "james.brown@email.com", status: "pending" }
    ],
    documentType: "advisory_agreement",
    priority: "low"
  }
]

const documentTemplates = [
  { id: "inv_agreement", name: "Investment Agreement", category: "Investment" },
  { id: "kyc_form", name: "KYC/AML Form", category: "Compliance" },
  { id: "transfer_auth", name: "Transfer Authorization", category: "Operations" },
  { id: "advisory_agreement", name: "Advisory Agreement", category: "Legal" },
  { id: "withdrawal_form", name: "Withdrawal Authorization", category: "Operations" },
  { id: "beneficiary_form", name: "Beneficiary Designation", category: "Estate Planning" }
]

export default function ESignature() {
  const router = useRouter()
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("")
  const [newDocumentForm, setNewDocumentForm] = useState({
    template: "",
    clientEmail: "",
    signers: "",
    dueDate: "",
    message: ""
  })

  const filteredRequests = mockSignatureRequests.filter(request => {
    return (!statusFilter || request.status === statusFilter)
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'in_progress':
        return <PenTool className="h-4 w-4" />
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'expired':
        return <XCircle className="h-4 w-4" />
      case 'cancelled':
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleSendReminder = (id: string) => {
    console.log(`Sending reminder for ${id}`)
  }

  const handleCancelRequest = (id: string) => {
    console.log(`Cancelling request ${id}`)
  }

  const handleCreateDocument = () => {
    console.log("Creating new signature request:", newDocumentForm)
    setNewDocumentForm({
      template: "",
      clientEmail: "",
      signers: "",
      dueDate: "",
      message: ""
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">eSignature Management</h1>
          <p className="text-gray-600">Send, track, and manage digital signatures</p>
        </div>
      </div>

      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList>
          <TabsTrigger value="requests">Signature Requests</TabsTrigger>
          <TabsTrigger value="new">New Document</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <PenTool className="h-5 w-5 text-blue-600" />
                      Signature Requests
                    </CardTitle>
                    <div className="flex gap-2">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        New Request
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Document</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Sent Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow
                          key={request.id}
                          className={`cursor-pointer hover:bg-gray-50 ${selectedRequest === request.id ? 'bg-blue-50' : ''}`}
                          onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                        >
                          <TableCell className="font-medium">{request.id}</TableCell>
                          <TableCell>{request.documentName}</TableCell>
                          <TableCell>{request.clientName}</TableCell>
                          <TableCell>{new Date(request.sentDate).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(request.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge className={getPriorityColor(request.priority)}>
                              {request.priority.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(request.status)}
                              <Badge className={getStatusColor(request.status)}>
                                {request.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSendReminder(request.id)
                                }}
                                disabled={request.status === 'completed' || request.status === 'expired'}
                              >
                                <Send className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Request Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-700">
                      {mockSignatureRequests.filter(r => r.status === 'pending' || r.status === 'in_progress').length}
                    </div>
                    <div className="text-sm text-yellow-600">Active Requests</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">
                      {mockSignatureRequests.filter(r => r.status === 'completed').length}
                    </div>
                    <div className="text-sm text-green-600">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-700">
                      {mockSignatureRequests.filter(r => r.status === 'expired').length}
                    </div>
                    <div className="text-sm text-red-600">Expired</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-700">
                      {mockSignatureRequests.filter(r => r.priority === 'urgent').length}
                    </div>
                    <div className="text-sm text-orange-600">Urgent</div>
                  </div>
                </CardContent>
              </Card>

              {selectedRequest && (
                <Card>
                  <CardHeader>
                    <CardTitle>Request Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const request = mockSignatureRequests.find(r => r.id === selectedRequest)
                      if (!request) return null
                      
                      return (
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-500">Document</div>
                            <div className="font-medium">{request.documentName}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Client Email</div>
                            <div className="font-medium">{request.clientEmail}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Signers Status</div>
                            <div className="space-y-2">
                              {request.signers.map((signer, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <div>
                                    <div className="text-sm font-medium">{signer.name}</div>
                                    <div className="text-xs text-gray-500">{signer.email}</div>
                                  </div>
                                  <div className="text-right">
                                    <Badge className={getStatusColor(signer.status)} variant="secondary">
                                      {signer.status.toUpperCase()}
                                    </Badge>
                                    {signer.signedDate && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        {new Date(signer.signedDate).toLocaleDateString()}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleSendReminder(request.id)}
                              disabled={request.status === 'completed'}
                            >
                              <Send className="h-3 w-3 mr-2" />
                              Remind
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCancelRequest(request.id)}
                              disabled={request.status === 'completed'}
                            >
                              <XCircle className="h-3 w-3 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="new" className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-blue-600" />
                  Create Signature Request
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Document Template</label>
                  <Select value={newDocumentForm.template} onValueChange={(value) => setNewDocumentForm({...newDocumentForm, template: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document template" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} ({template.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Client Email</label>
                  <Input
                    type="email"
                    placeholder="client@example.com"
                    value={newDocumentForm.clientEmail}
                    onChange={(e) => setNewDocumentForm({...newDocumentForm, clientEmail: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Additional Signers (comma-separated emails)</label>
                  <Input
                    placeholder="signer1@example.com, signer2@example.com"
                    value={newDocumentForm.signers}
                    onChange={(e) => setNewDocumentForm({...newDocumentForm, signers: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Due Date</label>
                  <Input
                    type="date"
                    value={newDocumentForm.dueDate}
                    onChange={(e) => setNewDocumentForm({...newDocumentForm, dueDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Message (Optional)</label>
                  <Textarea
                    placeholder="Add a personal message for the signers..."
                    value={newDocumentForm.message}
                    onChange={(e) => setNewDocumentForm({...newDocumentForm, message: e.target.value})}
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleCreateDocument}>
                  <Send className="h-4 w-4 mr-2" />
                  Send for Signature
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Document Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.category}</p>
                          <div className="mt-2 flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3 mr-1" />
                              Preview
                            </Button>
                            <Button size="sm" variant="outline">
                              <Send className="h-3 w-3 mr-1" />
                              Use
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Signature Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-12">
                  <PenTool className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Signature analytics and completion rates would be displayed here</p>
                  <p className="text-sm">Integration with charting library required</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">92%</div>
                  <div className="text-sm text-green-600">Completion Rate</div>
                  <div className="text-xs text-gray-500">Last 30 days</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">1.8</div>
                  <div className="text-sm text-blue-600">Avg Days to Sign</div>
                  <div className="text-xs text-gray-500">Standard documents</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">156</div>
                  <div className="text-sm text-purple-600">Documents Sent</div>
                  <div className="text-xs text-gray-500">This month</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}