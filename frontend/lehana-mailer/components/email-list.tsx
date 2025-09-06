"use client"

import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, MessageCircle, Pin, Archive, Paperclip } from "lucide-react"
import { useState } from "react"
import { useEmails } from "@/hooks/use-emails"

interface Email {
  id: string
  sender: string
  subject: string
  body: string
  sent_date: string
  replies: string
  priority: "urgent" | "high" | "medium" | "low"
  sentiment: "positive" | "negative" | "neutral"
  status: "unread" | "read" | "replied" | "archived"
  tags: string[]
  created_at: string
  updated_at: string
}

interface EmailListProps {
  emails: Email[]
  selectedEmailId: string | null
  onEmailSelect: (emailId: string) => void
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "border-l-red-500 bg-red-50/30 hover:bg-red-50/50"
    case "high":
      return "border-l-orange-500 bg-orange-50/30 hover:bg-orange-50/50"
    case "medium":
      return "border-l-yellow-500 bg-yellow-50/30 hover:bg-yellow-50/50"
    case "low":
      return "border-l-green-500 bg-green-50/30 hover:bg-green-50/50"
    default:
      return "border-l-gray-300 hover:bg-gray-50"
  }
}

const getSentimentEmoji = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return "😊"
    case "negative":
      return "😟"
    case "neutral":
    default:
      return "😐"
  }
}

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "Just now"
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
}

function EmailSkeleton() {
  return (
    <div className="bg-white rounded-lg border-l-4 border-l-gray-300 shadow-sm animate-pulse">
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-48"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="flex space-x-2">
              <div className="h-5 bg-gray-200 rounded w-16"></div>
              <div className="h-5 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-8"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EmailList({ emails, selectedEmailId, onEmailSelect }: EmailListProps) {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const { updateEmailStatus } = useEmails()

  const toggleEmailSelection = (emailId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedEmails((prev) => (prev.includes(emailId) ? prev.filter((id) => id !== emailId) : [...prev, emailId]))
  }

  const handleEmailClick = (emailId: string) => {
    onEmailSelect(emailId)
    // Mark as read when clicked
    const email = emails.find((e) => e.id === emailId)
    if (email && email.status === "unread") {
      updateEmailStatus(emailId, "read")
    }
  }

  const handleQuickAction = async (action: string, emailId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    switch (action) {
      case "resolve":
        await updateEmailStatus(emailId, "replied")
        break
      case "archive":
        await updateEmailStatus(emailId, "archived")
        break
      case "reply":
        onEmailSelect(emailId)
        break
      case "pin":
        // Add pin functionality
        console.log("Pin functionality to be implemented")
        break
    }
  }

  const handleBulkAction = async (action: string) => {
    for (const emailId of selectedEmails) {
      if (action === "markRead") {
        await updateEmailStatus(emailId, "read")
      } else if (action === "archive") {
        await updateEmailStatus(emailId, "archived")
      }
    }
    setSelectedEmails([])
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>
          {selectedEmails.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedEmails.length} selected</span>
              <Button
                size="sm"
                variant="outline"
                className="h-8 bg-transparent"
                onClick={() => handleBulkAction("markRead")}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Mark Read
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 bg-transparent"
                onClick={() => handleBulkAction("archive")}
              >
                <Archive className="w-4 h-4 mr-1" />
                Archive
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {emails.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-600">No emails match your current filters.</p>
            </div>
          ) : (
            emails.map((email) => (
              <div
                key={email.id}
                onClick={() => handleEmailClick(email.id)}
                className={`
                  bg-white rounded-lg border-l-4 ${getPriorityColor(email.priority)} 
                  shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer
                  group hover:-translate-y-1 transform
                  ${selectedEmailId === email.id ? "ring-2 ring-purple-500 ring-offset-2 bg-purple-50/30" : ""}
                  ${selectedEmails.includes(email.id) ? "ring-2 ring-blue-500 ring-offset-2 bg-blue-50/30" : ""}
                `}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="relative">
                        <Avatar
                          className={`w-10 h-10 ring-2 ring-white shadow-sm transition-all duration-200 ${
                            selectedEmails.includes(email.id) ? "ring-blue-500" : ""
                          }`}
                        >
                          <AvatarImage src="/placeholder-user.png" />
                          <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white font-medium">
                            {email.sender
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <button
                          onClick={(e) => toggleEmailSelection(email.id, e)}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-blue-500 transition-colors"
                        >
                          {selectedEmails.includes(email.id) && <CheckCircle className="w-3 h-3 text-blue-500" />}
                        </button>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3
                            className={`font-semibold text-gray-900 transition-colors ${
                              email.status === "unread" ? "font-bold text-gray-900" : "text-gray-700"
                            }`}
                          >
                            {email.sender}
                          </h3>
                          {email.status === "unread" && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          )}
                          {email.replies && <Paperclip className="w-3 h-3 text-gray-400" />}
                        </div>

                        <h4
                          className={`text-sm text-gray-800 mb-2 transition-colors ${
                            email.status === "unread" ? "font-medium text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {email.subject}
                        </h4>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                          {email.body.substring(0, 150)}...
                        </p>

                        <div className="flex items-center space-x-2">
                          {email.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 font-medium">{formatTimeAgo(email.sent_date)}</span>
                        <span className="text-lg transition-transform hover:scale-110">
                          {getSentimentEmoji(email.sentiment)}
                        </span>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex space-x-1 transform translate-y-2 group-hover:translate-y-0">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-green-100 hover:scale-110 transition-all duration-200"
                          onClick={(e) => handleQuickAction("resolve", email.id, e)}
                          title="Mark as Resolved"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-blue-100 hover:scale-110 transition-all duration-200"
                          onClick={(e) => handleQuickAction("reply", email.id, e)}
                          title="Quick Reply"
                        >
                          <MessageCircle className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-yellow-100 hover:scale-110 transition-all duration-200"
                          onClick={(e) => handleQuickAction("pin", email.id, e)}
                          title="Pin Email"
                        >
                          <Pin className="w-4 h-4 text-yellow-600" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gray-100 hover:scale-110 transition-all duration-200"
                          onClick={(e) => handleQuickAction("archive", email.id, e)}
                          title="Archive"
                        >
                          <Archive className="w-4 h-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-1 bg-gray-100">
                  <div
                    className={`h-full transition-all duration-300 ${
                      email.priority === "urgent"
                        ? "bg-red-500 w-full"
                        : email.priority === "high"
                          ? "bg-orange-500 w-3/4"
                          : email.priority === "medium"
                            ? "bg-yellow-500 w-1/2"
                            : "bg-green-500 w-1/4"
                    }`}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
