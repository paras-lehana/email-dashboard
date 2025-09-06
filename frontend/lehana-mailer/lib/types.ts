export interface EmailData {
  id: string
  sender: {
    name: string
    email: string
    avatar?: string
    phone?: string
    alternateEmail?: string
  }
  subject: string
  body: string
  preview: string
  receivedAt: string
  priority: "urgent" | "high" | "medium" | "low"
  sentiment: {
    score: "very_positive" | "positive" | "neutral" | "negative" | "very_negative"
    emoji: string
    confidence: number
  }
  category: "support" | "billing" | "technical" | "feature_request" | "bug_report" | "account_access" | "general"
  status: "unread" | "read" | "in_progress" | "resolved" | "archived"
  tags: string[]
  hasAttachments: boolean
  attachments?: Array<{
    name: string
    type: string
    size: number
    url: string
  }>
  extractedInfo: {
    contactDetails: {
      phone?: string
      alternateEmail?: string
      company?: string
      location?: string
    }
    requirements: string[]
    urgencyKeywords: string[]
    productMentions: string[]
    sentimentIndicators: {
      positive: string[]
      negative: string[]
    }
  }
  aiResponse?: {
    generatedReply: string
    tone: "professional" | "friendly" | "empathetic" | "formal"
    confidence: number
    suggestions: string[]
    templates: string[]
  }
  customerIntelligence: {
    accountTier: "bronze" | "silver" | "gold" | "platinum"
    satisfactionScore: number
    previousInteractions: number
    location: string
    timezone: string
    localTime: string
  }
}

export interface DashboardStats {
  totalEmails: number
  emailsToday: number
  urgentQueue: number
  avgResponseTime: string
  satisfactionScore: number
  resolutionRate: number
  trends: {
    totalEmails: number
    avgResponseTime: number
    satisfactionScore: number
    resolutionRate: number
  }
}

export interface AnalyticsData {
  emailVolume: Array<{
    date: string
    emails: number
    resolved: number
  }>
  priorityDistribution: Array<{
    name: string
    value: number
    color: string
  }>
  sentimentAnalysis: Array<{
    sentiment: string
    count: number
    percentage: number
  }>
  responseTimeHeatmap: Array<{
    hour: string
    [key: string]: string | number
  }>
  topIssues: Array<{
    text: string
    size: number
    color: string
    count: number
  }>
  teamLeaderboard: Array<{
    id: string
    name: string
    avatar: string
    emailsHandled: number
    avgResponseTime: string
    satisfaction: number
    goalProgress: number
    badge?: string
  }>
}

export interface DashboardData {
  emails: EmailData[]
  stats: DashboardStats
  analytics: AnalyticsData
  filters: {
    categories: string[]
    sentiments: string[]
    priorities: string[]
    timeRanges: string[]
  }
}
