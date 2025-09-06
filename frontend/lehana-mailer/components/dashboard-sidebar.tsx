import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Inbox,
  AlertCircle,
  Clock,
  CheckCircle,
  FileText,
  Wrench,
  HelpCircle,
  Bug,
  CreditCard,
  Key,
  Rocket,
  Calendar,
} from "lucide-react"

interface DashboardSidebarProps {
  data?: {
    stats?: {
      totalEmails?: number
      urgentQueue?: number
      highPriority?: number
      mediumPriority?: number
      lowPriority?: number
      resolvedToday?: number
    }
    filters?: any
  }
  filters?: any
  onFiltersChange?: any
}

export function DashboardSidebar({ data, filters, onFiltersChange }: DashboardSidebarProps) {
  const stats = data?.stats
  const availableFilters = data?.filters

  return (
    <aside className="w-60 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
      {/* Smart Inbox */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Smart Inbox</h3>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start bg-white shadow-sm border border-gray-100">
            <Inbox className="w-4 h-4 mr-3" />
            All Emails
            <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-800 font-medium">
              {stats?.totalEmails || 247}
            </Badge>
          </Button>

          <Button variant="ghost" className="w-full justify-start hover:bg-red-50">
            <AlertCircle className="w-4 h-4 mr-3 text-red-500" />
            Urgent Priority
            <Badge className="ml-auto bg-red-500 text-white font-medium">{stats?.urgentQueue || 12}</Badge>
          </Button>

          <Button variant="ghost" className="w-full justify-start hover:bg-orange-50">
            <Clock className="w-4 h-4 mr-3 text-orange-500" />
            High Priority
            <Badge className="ml-auto bg-orange-500 text-white font-medium">34</Badge>
          </Button>

          <Button variant="ghost" className="w-full justify-start hover:bg-yellow-50">
            <Clock className="w-4 h-4 mr-3 text-yellow-500" />
            Medium Priority
            <Badge className="ml-auto bg-yellow-600 text-white font-medium">89</Badge>
          </Button>

          <Button variant="ghost" className="w-full justify-start hover:bg-green-50">
            <Clock className="w-4 h-4 mr-3 text-green-500" />
            Low Priority
            <Badge className="ml-auto bg-green-600 text-white font-medium">112</Badge>
          </Button>

          <Button variant="ghost" className="w-full justify-start hover:bg-green-50">
            <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
            Resolved Today
            <Badge className="ml-auto bg-green-600 text-white font-medium">43</Badge>
          </Button>

          <Button variant="ghost" className="w-full justify-start hover:bg-gray-50 text-gray-700">
            <FileText className="w-4 h-4 mr-3 text-gray-500" />
            Drafts
            <Badge variant="outline" className="ml-auto border-gray-400 text-gray-700 font-medium">
              7
            </Badge>
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <div className="w-4 h-4 mr-3 bg-purple-100 rounded flex items-center justify-center">
              <Wrench className="w-3 h-3 text-purple-600" />
            </div>
            Support Requests
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <div className="w-4 h-4 mr-3 bg-blue-100 rounded flex items-center justify-center">
              <HelpCircle className="w-3 h-3 text-blue-600" />
            </div>
            General Queries
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <div className="w-4 h-4 mr-3 bg-red-100 rounded flex items-center justify-center">
              <Bug className="w-3 h-3 text-red-600" />
            </div>
            Bug Reports
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <div className="w-4 h-4 mr-3 bg-green-100 rounded flex items-center justify-center">
              <CreditCard className="w-3 h-3 text-green-600" />
            </div>
            Billing Issues
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <div className="w-4 h-4 mr-3 bg-orange-100 rounded flex items-center justify-center">
              <Key className="w-3 h-3 text-orange-600" />
            </div>
            Account Access
          </Button>

          <Button variant="ghost" className="w-full justify-start">
            <div className="w-4 h-4 mr-3 bg-indigo-100 rounded flex items-center justify-center">
              <Rocket className="w-3 h-3 text-indigo-600" />
            </div>
            Feature Requests
          </Button>
        </div>
      </div>

      {/* Sentiment Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Sentiment Filter</h3>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start hover:bg-red-50">
            <div className="w-4 h-4 mr-3 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-xs">😡</span>
            </div>
            Very Negative
          </Button>

          <Button variant="ghost" className="w-full justify-start hover:bg-orange-50">
            <div className="w-4 h-4 mr-3 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-xs">😟</span>
            </div>
            Negative
          </Button>

          <Button variant="ghost" className="w-full justify-start hover:bg-gray-50">
            <div className="w-4 h-4 mr-3 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-xs">😐</span>
            </div>
            Neutral
          </Button>

          <Button variant="ghost" className="w-full justify-start hover:bg-green-50">
            <div className="w-4 h-4 mr-3 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xs">😊</span>
            </div>
            Positive
          </Button>

          <Button variant="ghost" className="w-full justify-start hover:bg-green-50">
            <div className="w-4 h-4 mr-3 bg-green-200 rounded-full flex items-center justify-center">
              <span className="text-xs">🤩</span>
            </div>
            Very Positive
          </Button>
        </div>
      </div>

      {/* Time Filters */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Time Filters</h3>
        <Button variant="outline" className="w-full justify-start bg-transparent">
          <Calendar className="w-4 h-4 mr-3" />
          Select Date Range
        </Button>
      </div>
    </aside>
  )
}
