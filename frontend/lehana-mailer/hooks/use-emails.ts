"use client"

import { useState, useEffect } from "react"

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

interface UseEmailsOptions {
  status?: string
  priority?: string
  sentiment?: string
  search?: string
  limit?: number
  offset?: number
}

export function useEmails(options: UseEmailsOptions = {}) {
  const [emails, setEmails] = useState<Email[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEmails = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (options.status) params.append("status", options.status)
      if (options.priority) params.append("priority", options.priority)
      if (options.sentiment) params.append("sentiment", options.sentiment)
      if (options.search) params.append("search", options.search)
      if (options.limit) params.append("limit", options.limit.toString())
      if (options.offset) params.append("offset", options.offset.toString())

      const response = await fetch(`/api/emails?${params}`)
      if (!response.ok) {
        throw new Error("Failed to fetch emails")
      }

      const data = await response.json()
      setEmails(data.emails)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmails()
  }, [options.status, options.priority, options.sentiment, options.search, options.limit, options.offset])

  const updateEmailStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/emails/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update email")
      }

      // Update local state
      setEmails((prev) => prev.map((email) => (email.id === id ? { ...email, status: status as any } : email)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update email")
    }
  }

  const addReply = async (id: string, reply: string) => {
    try {
      const response = await fetch(`/api/emails/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      })

      if (!response.ok) {
        throw new Error("Failed to add reply")
      }

      const data = await response.json()

      // Update local state
      setEmails((prev) => prev.map((email) => (email.id === id ? data.email : email)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add reply")
    }
  }

  return {
    emails,
    loading,
    error,
    refetch: fetchEmails,
    updateEmailStatus,
    addReply,
  }
}
