import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Star } from "lucide-react"
import { AIResponseComposer } from "./ai-response-composer"
import { useDashboardData } from "@/hooks/use-dashboard-data"
import { Mail } from "lucide-react"
import type { EmailDetailsProps } from "@/components/email-details"

export function EmailDetails({ emailId }: EmailDetailsProps) {
  const { data } = useDashboardData()
  const email = emailId ? data?.emails.find((e) => e.id === emailId) : data?.emails[0]

  if (!email) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Email Selected</h3>
          <p className="text-gray-600">Select an email from the list to view details</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Email Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-12 h-12 ring-2 ring-white shadow-sm">
            <AvatarImage src={email.sender.avatar || "/professional-woman-avatar.png"} />
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white">
              {email.sender.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{email.sender.name}</h3>
            <p className="text-sm text-gray-600">{email.sender.email}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(email.receivedAt).toLocaleString()}</p>
          </div>

          <Badge
            className={
              email.priority === "urgent"
                ? "bg-red-600 text-white font-medium"
                : email.priority === "high"
                  ? "bg-orange-600 text-white font-medium"
                  : email.priority === "medium"
                    ? "bg-yellow-600 text-white font-medium"
                    : "bg-green-600 text-white font-medium"
            }
          >
            {email.priority.charAt(0).toUpperCase() + email.priority.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Customer Intelligence */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-blue-900">Customer Intelligence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-700">Account Tier</span>
            <Badge
              className={
                email.customerIntelligence.accountTier === "gold"
                  ? "bg-yellow-600 text-white font-medium"
                  : email.customerIntelligence.accountTier === "platinum"
                    ? "bg-purple-600 text-white font-medium"
                    : email.customerIntelligence.accountTier === "silver"
                      ? "bg-gray-600 text-white font-medium"
                      : "bg-amber-700 text-white font-medium"
              }
            >
              {email.customerIntelligence.accountTier.charAt(0).toUpperCase() +
                email.customerIntelligence.accountTier.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-blue-600" />
              <span className="text-blue-700">Location</span>
            </div>
            <span className="text-blue-900">{email.customerIntelligence.location}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-blue-600" />
              <span className="text-blue-700">Local Time</span>
            </div>
            <span className="text-blue-900">{email.customerIntelligence.localTime}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-blue-600" />
              <span className="text-blue-700">Satisfaction</span>
            </div>
            <span className="text-blue-900">{email.customerIntelligence.satisfactionScore}/5.0</span>
          </div>
        </CardContent>
      </Card>

      {/* Email Content */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-900 mb-2">{email.subject}</h4>
          <div className="prose prose-sm max-w-none text-gray-700">
            {email.body.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      <AIResponseComposer />
    </div>
  )
}
