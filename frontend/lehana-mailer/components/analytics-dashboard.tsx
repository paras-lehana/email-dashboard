"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Mail,
  Clock,
  Star,
  Users,
  AlertCircle,
  CheckCircle,
  Calendar,
  Download,
  Filter,
} from "lucide-react"

// Mock data for charts
const emailVolumeData = [
  { date: "Jan 1", emails: 45, resolved: 42 },
  { date: "Jan 2", emails: 52, resolved: 48 },
  { date: "Jan 3", emails: 48, resolved: 45 },
  { date: "Jan 4", emails: 61, resolved: 58 },
  { date: "Jan 5", emails: 55, resolved: 52 },
  { date: "Jan 6", emails: 67, resolved: 63 },
  { date: "Jan 7", emails: 59, resolved: 56 },
]

const priorityData = [
  { name: "Urgent", value: 12, color: "#EF4444" },
  { name: "High", value: 34, color: "#F97316" },
  { name: "Medium", value: 89, color: "#EAB308" },
  { name: "Low", value: 112, color: "#10B981" },
]

const sentimentData = [
  { sentiment: "Very Positive", count: 45, percentage: 18 },
  { sentiment: "Positive", count: 89, percentage: 36 },
  { sentiment: "Neutral", count: 67, percentage: 27 },
  { sentiment: "Negative", count: 32, percentage: 13 },
  { sentiment: "Very Negative", count: 14, percentage: 6 },
]

const responseTimeHeatmap = [
  { hour: "9 AM", Mon: 2.1, Tue: 1.8, Wed: 2.3, Thu: 1.9, Fri: 2.5, Sat: 3.2, Sun: 4.1 },
  { hour: "10 AM", Mon: 1.9, Tue: 1.6, Wed: 2.1, Thu: 1.7, Fri: 2.2, Sat: 2.8, Sun: 3.5 },
  { hour: "11 AM", Mon: 1.7, Tue: 1.4, Wed: 1.9, Thu: 1.5, Fri: 2.0, Sat: 2.5, Sun: 3.2 },
  { hour: "12 PM", Mon: 2.2, Tue: 1.9, Wed: 2.4, Thu: 2.0, Fri: 2.7, Sat: 3.1, Sun: 3.8 },
  { hour: "1 PM", Mon: 2.5, Tue: 2.2, Wed: 2.7, Thu: 2.3, Fri: 3.0, Sat: 3.4, Sun: 4.2 },
  { hour: "2 PM", Mon: 2.3, Tue: 2.0, Wed: 2.5, Thu: 2.1, Fri: 2.8, Sat: 3.2, Sun: 4.0 },
]

const teamLeaderboard = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "/team-alex.png",
    emailsHandled: 89,
    avgResponseTime: "1.2h",
    satisfaction: 4.9,
    goalProgress: 95,
    badge: "top-performer",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    avatar: "/team-sarah.png",
    emailsHandled: 76,
    avgResponseTime: "1.5h",
    satisfaction: 4.7,
    goalProgress: 87,
    badge: null,
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    avatar: "/team-mike.png",
    emailsHandled: 68,
    avgResponseTime: "1.8h",
    satisfaction: 4.6,
    goalProgress: 82,
    badge: null,
  },
  {
    id: 4,
    name: "Emma Thompson",
    avatar: "/team-emma.png",
    emailsHandled: 71,
    avgResponseTime: "1.6h",
    satisfaction: 4.8,
    goalProgress: 85,
    badge: null,
  },
]

const topIssues = [
  { text: "Password Reset", size: 24, color: "#8B5CF6" },
  { text: "Billing", size: 20, color: "#3B82F6" },
  { text: "Account Access", size: 18, color: "#10B981" },
  { text: "Integration", size: 16, color: "#F59E0B" },
  { text: "Bug Report", size: 14, color: "#EF4444" },
  { text: "Feature Request", size: 12, color: "#8B5CF6" },
  { text: "API Issues", size: 10, color: "#6366F1" },
  { text: "Performance", size: 8, color: "#EC4899" },
]

const getHeatmapColor = (value: number) => {
  if (value <= 1.5) return "bg-green-200 text-green-800"
  if (value <= 2.5) return "bg-yellow-200 text-yellow-800"
  if (value <= 3.5) return "bg-orange-200 text-orange-800"
  return "bg-red-200 text-red-800"
}

export function AnalyticsDashboard() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-[#FAFBFC] to-[#F3F4F6] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor your support team's performance and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="7days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hours">Last 24 Hours</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Emails</p>
                <p className="text-3xl font-bold text-blue-900">1,247</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+12.5%</span>
                  <span className="text-sm text-gray-600">vs last week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Avg Response Time</p>
                <p className="text-3xl font-bold text-green-900">2.1h</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">-8.2%</span>
                  <span className="text-sm text-gray-600">vs last week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700">Satisfaction Score</p>
                <p className="text-3xl font-bold text-yellow-900">4.8</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+0.3</span>
                  <span className="text-sm text-gray-600">vs last week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Resolution Rate</p>
                <p className="text-3xl font-bold text-purple-900">94.2%</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">+2.1%</span>
                  <span className="text-sm text-gray-600">vs last week</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Volume Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Email Volume Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={emailVolumeData}>
                <defs>
                  <linearGradient id="emailGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="emails"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#emailGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <span>Priority Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {priorityData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-600">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>Sentiment Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sentimentData.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-24 text-sm font-medium text-gray-700">{item.sentiment}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12">{item.count}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Issues Cloud */}
        <Card>
          <CardHeader>
            <CardTitle>Top Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3 justify-center items-center h-64">
              {topIssues.map((issue, index) => (
                <span
                  key={index}
                  className="font-semibold cursor-pointer hover:scale-110 transition-transform duration-200"
                  style={{
                    fontSize: `${issue.size}px`,
                    color: issue.color,
                    textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  {issue.text}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Response Time Heatmap (Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 gap-2 min-w-96">
              <div></div>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
                  {day}
                </div>
              ))}
              {responseTimeHeatmap.map((row, rowIndex) => (
                <>
                  <div key={`hour-${rowIndex}`} className="text-sm font-medium text-gray-600 p-2">
                    {row.hour}
                  </div>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div
                      key={`${rowIndex}-${day}`}
                      className={`p-2 rounded text-center text-sm font-medium ${getHeatmapColor(
                        row[day as keyof typeof row] as number,
                      )}`}
                    >
                      {row[day as keyof typeof row]}
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Team Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamLeaderboard.map((member, index) => (
              <div
                key={member.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {member.badge === "top-performer" && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.emailsHandled} emails handled</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{member.avgResponseTime}</p>
                    <p className="text-xs text-gray-600">Avg Response</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{member.satisfaction}</p>
                    <p className="text-xs text-gray-600">Satisfaction</p>
                  </div>

                  <div className="w-24">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Goal</span>
                      <span className="text-xs font-medium text-gray-900">{member.goalProgress}%</span>
                    </div>
                    <Progress value={member.goalProgress} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
