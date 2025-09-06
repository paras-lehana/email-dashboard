"use client"

import type React from "react"

import { Search, Settings, Bell, BarChart3 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"

interface DashboardHeaderProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
  onSearch?: (search: string) => void
}

export function DashboardHeader({ activeTab = "inbox", onTabChange, onSearch }: DashboardHeaderProps) {
  const [stats, setStats] = useState({
    totalEmails: 0,
    unreadEmails: 0,
    avgResponseTime: "0h",
    satisfaction: "0★",
  })
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    // Fetch real-time stats from analytics API
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/analytics")
        if (response.ok) {
          const data = await response.json()
          setStats({
            totalEmails: data.totalEmails,
            unreadEmails: data.unreadEmails,
            avgResponseTime: "2.4h", // Calculate from data
            satisfaction: "4.8★", // Calculate from sentiment data
          })
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchValue)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            LehanaMailer
          </h1>

          <Tabs value={activeTab} onValueChange={onTabChange} className="ml-8">
            <TabsList>
              <TabsTrigger value="inbox" className="flex items-center space-x-2">
                <span>Inbox</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Stats Cards */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Total Emails</span>
            <span className="text-lg font-bold text-blue-600">{stats.totalEmails}</span>
          </div>

          <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Unread</span>
            <span className="text-lg font-bold text-red-600">{stats.unreadEmails}</span>
          </div>

          <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Avg Response</span>
            <span className="text-lg font-bold text-green-600">{stats.avgResponseTime}</span>
          </div>

          <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Satisfaction</span>
            <span className="text-lg font-bold text-yellow-600">{stats.satisfaction}</span>
          </div>
        </div>

        {/* Search and User */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search emails..."
              className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>

          <Avatar className="ring-2 ring-green-500 ring-offset-2">
            <AvatarImage src="/placeholder-user.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
