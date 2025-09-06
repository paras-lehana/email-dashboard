import type { DashboardData, EmailData, DashboardStats, AnalyticsData } from "./types"

class DataService {
  private data: DashboardData | null = null
  private listeners: Array<(data: DashboardData) => void> = []

  // Load data from JSON (can be from API, file, or direct object)
  async loadData(jsonData?: DashboardData): Promise<DashboardData> {
    if (jsonData) {
      this.data = jsonData
    } else {
      // Load from default mock data if no JSON provided
      this.data = this.getDefaultData()
    }

    // Notify all listeners
    this.listeners.forEach((listener) => listener(this.data!))
    return this.data
  }

  // Get current data
  getData(): DashboardData | null {
    return this.data
  }

  // Subscribe to data changes
  subscribe(listener: (data: DashboardData) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  // Filter emails based on criteria
  getFilteredEmails(filters: {
    priority?: string[]
    sentiment?: string[]
    category?: string[]
    status?: string[]
    search?: string
  }): EmailData[] {
    if (!this.data) return []

    let filtered = this.data.emails

    if (filters.priority?.length) {
      filtered = filtered.filter((email) => filters.priority!.includes(email.priority))
    }

    if (filters.sentiment?.length) {
      filtered = filtered.filter((email) => filters.sentiment!.includes(email.sentiment.score))
    }

    if (filters.category?.length) {
      filtered = filtered.filter((email) => filters.category!.includes(email.category))
    }

    if (filters.status?.length) {
      filtered = filtered.filter((email) => filters.status!.includes(email.status))
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (email) =>
          email.subject.toLowerCase().includes(searchLower) ||
          email.sender.name.toLowerCase().includes(searchLower) ||
          email.sender.email.toLowerCase().includes(searchLower) ||
          email.body.toLowerCase().includes(searchLower),
      )
    }

    return filtered
  }

  // Get emails by priority (for urgent queue, etc.)
  getEmailsByPriority(priority: string): EmailData[] {
    if (!this.data) return []
    return this.data.emails.filter((email) => email.priority === priority)
  }

  // Get dashboard statistics
  getStats(): DashboardStats | null {
    return this.data?.stats || null
  }

  // Get analytics data
  getAnalytics(): AnalyticsData | null {
    return this.data?.analytics || null
  }

  // Update email status
  updateEmailStatus(emailId: string, status: EmailData["status"]): void {
    if (!this.data) return

    const email = this.data.emails.find((e) => e.id === emailId)
    if (email) {
      email.status = status
      this.listeners.forEach((listener) => listener(this.data!))
    }
  }

  // Add AI response to email
  addAIResponse(emailId: string, response: EmailData["aiResponse"]): void {
    if (!this.data) return

    const email = this.data.emails.find((e) => e.id === emailId)
    if (email) {
      email.aiResponse = response
      this.listeners.forEach((listener) => listener(this.data!))
    }
  }

  // Default mock data that matches the new structure
  private getDefaultData(): DashboardData {
    return {
      emails: [
        {
          id: "1",
          sender: {
            name: "Sarah Johnson",
            email: "sarah.j@company.com",
            avatar: "/professional-woman-avatar.png",
            phone: "+1-555-0123",
          },
          subject: "Unable to access my account after password reset",
          body: "Hi, I tried to reset my password yesterday but I'm still unable to log in. The reset email arrived but when I click the link it says 'Invalid or expired token'. I've tried this multiple times and cleared my browser cache. Could you please help me regain access to my account? My account email is sarah.j@company.com. Thanks, Sarah",
          preview:
            "Hi, I tried to reset my password yesterday but I'm still unable to log in. The reset email arrived but when I click the link it says 'Invalid or expired token'...",
          receivedAt: "2024-01-09T14:30:00Z",
          priority: "urgent",
          sentiment: {
            score: "negative",
            emoji: "😟",
            confidence: 0.85,
          },
          category: "account_access",
          status: "unread",
          tags: ["#account", "#technical", "#password-reset"],
          hasAttachments: false,
          extractedInfo: {
            contactDetails: {
              phone: "+1-555-0123",
              company: "Company Inc",
            },
            requirements: ["password reset assistance", "account access"],
            urgencyKeywords: ["unable", "multiple times", "help"],
            productMentions: ["account", "password reset"],
            sentimentIndicators: {
              positive: [],
              negative: ["unable", "invalid", "expired"],
            },
          },
          aiResponse: {
            generatedReply:
              "Hi Sarah, I understand how frustrating this must be. I'll help you regain access to your account right away. Let me generate a new password reset link that will work properly. Please check your email in the next few minutes.",
            tone: "empathetic",
            confidence: 0.92,
            suggestions: ["Offer immediate assistance", "Acknowledge frustration", "Provide clear next steps"],
            templates: ["password-reset-assistance", "account-access-help"],
          },
          customerIntelligence: {
            accountTier: "gold",
            satisfactionScore: 4.8,
            previousInteractions: 3,
            location: "San Francisco, CA",
            timezone: "PST",
            localTime: "2:34 PM PST",
          },
        },
        {
          id: "2",
          sender: {
            name: "Mike Chen",
            email: "mike.chen@startup.io",
            avatar: "/professional-man-avatar.png",
          },
          subject: "Billing discrepancy on latest invoice #INV-2024-0847",
          body: "Hello, I noticed there's a charge on my latest invoice that doesn't match our agreed pricing plan. The invoice shows $299/month but our contract specifies $199/month for the Pro plan. Could you please review this and issue a correction?",
          preview:
            "Hello, I noticed there's a charge on my latest invoice that doesn't match our agreed pricing plan...",
          receivedAt: "2024-01-09T14:15:00Z",
          priority: "high",
          sentiment: {
            score: "neutral",
            emoji: "😐",
            confidence: 0.78,
          },
          category: "billing",
          status: "unread",
          tags: ["#billing", "#invoice", "#pricing"],
          hasAttachments: true,
          attachments: [
            {
              name: "invoice-INV-2024-0847.pdf",
              type: "application/pdf",
              size: 245760,
              url: "/attachments/invoice-INV-2024-0847.pdf",
            },
          ],
          extractedInfo: {
            contactDetails: {
              company: "Startup.io",
            },
            requirements: ["billing review", "invoice correction"],
            urgencyKeywords: ["discrepancy", "review", "correction"],
            productMentions: ["Pro plan", "invoice"],
            sentimentIndicators: {
              positive: ["please"],
              negative: ["discrepancy"],
            },
          },
          customerIntelligence: {
            accountTier: "silver",
            satisfactionScore: 4.5,
            previousInteractions: 1,
            location: "Seattle, WA",
            timezone: "PST",
            localTime: "2:19 PM PST",
          },
        },
        // Add more mock emails following the same pattern...
      ],
      stats: {
        totalEmails: 1247,
        emailsToday: 247,
        urgentQueue: 12,
        avgResponseTime: "2.1h",
        satisfactionScore: 4.8,
        resolutionRate: 94.2,
        trends: {
          totalEmails: 12.5,
          avgResponseTime: -8.2,
          satisfactionScore: 0.3,
          resolutionRate: 2.1,
        },
      },
      analytics: {
        emailVolume: [
          { date: "Jan 1", emails: 45, resolved: 42 },
          { date: "Jan 2", emails: 52, resolved: 48 },
          { date: "Jan 3", emails: 48, resolved: 45 },
          { date: "Jan 4", emails: 61, resolved: 58 },
          { date: "Jan 5", emails: 55, resolved: 52 },
          { date: "Jan 6", emails: 67, resolved: 63 },
          { date: "Jan 7", emails: 59, resolved: 56 },
        ],
        priorityDistribution: [
          { name: "Urgent", value: 12, color: "#EF4444" },
          { name: "High", value: 34, color: "#F97316" },
          { name: "Medium", value: 89, color: "#EAB308" },
          { name: "Low", value: 112, color: "#10B981" },
        ],
        sentimentAnalysis: [
          { sentiment: "Very Positive", count: 45, percentage: 18 },
          { sentiment: "Positive", count: 89, percentage: 36 },
          { sentiment: "Neutral", count: 67, percentage: 27 },
          { sentiment: "Negative", count: 32, percentage: 13 },
          { sentiment: "Very Negative", count: 14, percentage: 6 },
        ],
        responseTimeHeatmap: [
          { hour: "9 AM", Mon: 2.1, Tue: 1.8, Wed: 2.3, Thu: 1.9, Fri: 2.5, Sat: 3.2, Sun: 4.1 },
          { hour: "10 AM", Mon: 1.9, Tue: 1.6, Wed: 2.1, Thu: 1.7, Fri: 2.2, Sat: 2.8, Sun: 3.5 },
          { hour: "11 AM", Mon: 1.7, Tue: 1.4, Wed: 1.9, Thu: 1.5, Fri: 2.0, Sat: 2.5, Sun: 3.2 },
          { hour: "12 PM", Mon: 2.2, Tue: 1.9, Wed: 2.4, Thu: 2.0, Fri: 2.7, Sat: 3.1, Sun: 3.8 },
          { hour: "1 PM", Mon: 2.5, Tue: 2.2, Wed: 2.7, Thu: 2.3, Fri: 3.0, Sat: 3.4, Sun: 4.2 },
          { hour: "2 PM", Mon: 2.3, Tue: 2.0, Wed: 2.5, Thu: 2.1, Fri: 2.8, Sat: 3.2, Sun: 4.0 },
        ],
        topIssues: [
          { text: "Password Reset", size: 24, color: "#8B5CF6", count: 45 },
          { text: "Billing", size: 20, color: "#3B82F6", count: 34 },
          { text: "Account Access", size: 18, color: "#10B981", count: 28 },
          { text: "Integration", size: 16, color: "#F59E0B", count: 22 },
          { text: "Bug Report", size: 14, color: "#EF4444", count: 18 },
          { text: "Feature Request", size: 12, color: "#8B5CF6", count: 15 },
          { text: "API Issues", size: 10, color: "#6366F1", count: 12 },
          { text: "Performance", size: 8, color: "#EC4899", count: 8 },
        ],
        teamLeaderboard: [
          {
            id: "1",
            name: "Alex Chen",
            avatar: "/team-alex.png",
            emailsHandled: 89,
            avgResponseTime: "1.2h",
            satisfaction: 4.9,
            goalProgress: 95,
            badge: "top-performer",
          },
          {
            id: "2",
            name: "Sarah Wilson",
            avatar: "/team-sarah.png",
            emailsHandled: 76,
            avgResponseTime: "1.5h",
            satisfaction: 4.7,
            goalProgress: 87,
          },
          {
            id: "3",
            name: "Mike Rodriguez",
            avatar: "/team-mike.png",
            emailsHandled: 68,
            avgResponseTime: "1.8h",
            satisfaction: 4.6,
            goalProgress: 82,
          },
          {
            id: "4",
            name: "Emma Thompson",
            avatar: "/team-emma.png",
            emailsHandled: 71,
            avgResponseTime: "1.6h",
            satisfaction: 4.8,
            goalProgress: 85,
          },
        ],
      },
      filters: {
        categories: ["support", "billing", "technical", "feature_request", "bug_report", "account_access", "general"],
        sentiments: ["very_positive", "positive", "neutral", "negative", "very_negative"],
        priorities: ["urgent", "high", "medium", "low"],
        timeRanges: ["today", "yesterday", "last_7_days", "last_30_days", "last_90_days"],
      },
    }
  }
}

// Export singleton instance
export const dataService = new DataService()
