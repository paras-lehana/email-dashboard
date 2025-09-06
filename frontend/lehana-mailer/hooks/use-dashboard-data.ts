"use client"

import { useState, useEffect } from "react"
import { dataService } from "@/lib/data-service"
import type { DashboardData, EmailData } from "@/lib/types"

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        await dataService.loadData()
        setData(dataService.getData())
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    loadData()

    // Subscribe to data changes
    const unsubscribe = dataService.subscribe((newData) => {
      setData(newData)
    })

    return unsubscribe
  }, [])

  const updateEmailStatus = (emailId: string, status: EmailData["status"]) => {
    dataService.updateEmailStatus(emailId, status)
  }

  const addAIResponse = (emailId: string, response: EmailData["aiResponse"]) => {
    dataService.addAIResponse(emailId, response)
  }

  const getFilteredEmails = (filters: {
    priority?: string[]
    sentiment?: string[]
    category?: string[]
    status?: string[]
    search?: string
  }) => {
    return dataService.getFilteredEmails(filters)
  }

  return {
    data,
    loading,
    error,
    updateEmailStatus,
    addAIResponse,
    getFilteredEmails,
    // Helper methods
    emails: data?.emails || [],
    stats: data?.stats || null,
    analytics: data?.analytics || null,
    filters: data?.filters || null,
  }
}
