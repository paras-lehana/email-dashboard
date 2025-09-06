"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { EmailList } from "@/components/email-list"
import { EmailDetails } from "@/components/email-details"
import { EmailSearch } from "@/components/email-search"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { CommandPalette } from "@/components/command-palette"
import { SmartNotifications } from "@/components/smart-notifications"
import { FloatingActionButton } from "@/components/floating-action-button"
import { GamificationWidget } from "@/components/gamification-widget"
import { useEmails } from "@/hooks/use-emails"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("inbox")
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null)
  const [emailFilters, setEmailFilters] = useState<{
    priority?: string
    sentiment?: string
    status?: string
    search?: string
  }>({})

  const { emails, loading, error, refetch } = useEmails({
    status: emailFilters.status,
    priority: emailFilters.priority,
    sentiment: emailFilters.sentiment,
    search: emailFilters.search,
    limit: 50,
  })

  const handleSearch = (search: string) => {
    setEmailFilters((prev) => ({ ...prev, search }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] to-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] to-[#F3F4F6] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading dashboard: {error}</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFBFC] to-[#F3F4F6]">
      {/* Floating Header */}
      <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} onSearch={handleSearch} />

      {/* Smart Notifications */}
      <SmartNotifications />

      {/* Command Palette */}
      <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Main Dashboard Layout */}
      <div className="pt-20">
        {activeTab === "inbox" ? (
          <div className="flex h-[calc(100vh-80px)]">
            {/* Left Sidebar */}
            <div className="flex flex-col">
              <DashboardSidebar emails={emails} filters={emailFilters} onFiltersChange={setEmailFilters} />
              {/* Gamification Widget */}
              <div className="p-4">
                <GamificationWidget />
              </div>
            </div>

            {/* Center - Email List */}
            <div className="flex-1 min-w-0 border-r border-gray-200 flex flex-col">
              <EmailSearch onSearch={handleSearch} />
              <div className="flex-1 overflow-hidden">
                <EmailList emails={emails} selectedEmailId={selectedEmailId} onEmailSelect={setSelectedEmailId} />
              </div>
            </div>

            {/* Right Panel - Email Details */}
            <div className="w-96 bg-white">
              <EmailDetails emailId={selectedEmailId} />
            </div>
          </div>
        ) : (
          <AnalyticsDashboard />
        )}
      </div>
    </div>
  )
}
