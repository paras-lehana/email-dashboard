import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Get total counts
    const { count: totalEmails } = await supabase.from("emails").select("*", { count: "exact", head: true })

    const { count: unreadEmails } = await supabase
      .from("emails")
      .select("*", { count: "exact", head: true })
      .eq("status", "unread")

    const { count: repliedEmails } = await supabase
      .from("emails")
      .select("*", { count: "exact", head: true })
      .eq("status", "replied")

    // Get priority distribution
    const { data: priorityData } = await supabase.from("emails").select("priority")

    const priorityDistribution =
      priorityData?.reduce((acc: any, email) => {
        acc[email.priority] = (acc[email.priority] || 0) + 1
        return acc
      }, {}) || {}

    // Get sentiment distribution
    const { data: sentimentData } = await supabase.from("emails").select("sentiment")

    const sentimentDistribution =
      sentimentData?.reduce((acc: any, email) => {
        acc[email.sentiment] = (acc[email.sentiment] || 0) + 1
        return acc
      }, {}) || {}

    // Get recent email volume (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: recentEmails } = await supabase
      .from("emails")
      .select("sent_date")
      .gte("sent_date", sevenDaysAgo.toISOString())
      .order("sent_date", { ascending: true })

    // Group by date
    const emailVolume =
      recentEmails?.reduce((acc: any, email) => {
        const date = new Date(email.sent_date).toISOString().split("T")[0]
        acc[date] = (acc[date] || 0) + 1
        return acc
      }, {}) || {}

    const analytics = {
      totalEmails: totalEmails || 0,
      unreadEmails: unreadEmails || 0,
      repliedEmails: repliedEmails || 0,
      priorityDistribution,
      sentimentDistribution,
      emailVolume,
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
