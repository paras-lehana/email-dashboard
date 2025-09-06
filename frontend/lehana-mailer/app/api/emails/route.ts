import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Mock data fallback when Supabase is not available
const mockEmails = [
  {
    id: "1",
    sender: "sarah.j@company.com",
    subject: "Unable to access my account after password reset",
    body: "Hi, I tried to reset my password yesterday but I'm still unable to log in. The reset email arrived but when I click the link it says 'Invalid or expired token'. I've tried this multiple times and cleared my browser cache...",
    sent_date: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    replies: "",
    priority: "urgent",
    sentiment: "negative",
    status: "unread",
    tags: ["account", "technical"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    sender: "mike.chen@startup.io",
    subject: "Billing discrepancy on latest invoice #INV-2024-0847",
    body: "Hello, I noticed there's a charge on my latest invoice that doesn't match our agreed pricing plan. The invoice shows $299/month but our contract specifies $199/month for the Pro plan. Could you please review this and issue a correction?",
    sent_date: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    replies: "",
    priority: "high",
    sentiment: "neutral",
    status: "unread",
    tags: ["billing"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    sender: "emma.w@design.co",
    subject: "Feature request: Dark mode support",
    body: "Love the platform! Would it be possible to add dark mode support? Many of our team members work late hours and would appreciate a darker interface. We'd also love to see custom theme options if possible.",
    sent_date: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    replies: "",
    priority: "medium",
    sentiment: "positive",
    status: "read",
    tags: ["feature-request"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export async function GET(request: Request) {
  try {
    console.log("[v0] API route called - checking environment variables")
    console.log("[v0] NEXT_PUBLIC_SUPABASE_URL exists:", !!process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log("[v0] NEXT_PUBLIC_SUPABASE_ANON_KEY exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    // Check if environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log("[v0] Supabase environment variables not found, using mock data")

      const { searchParams } = new URL(request.url)
      const status = searchParams.get("status")
      const priority = searchParams.get("priority")
      const sentiment = searchParams.get("sentiment")
      const search = searchParams.get("search")

      let filteredEmails = [...mockEmails]

      // Apply filters to mock data
      if (status && status !== "all") {
        filteredEmails = filteredEmails.filter((email) => email.status === status)
      }

      if (priority && priority !== "all") {
        filteredEmails = filteredEmails.filter((email) => email.priority === priority)
      }

      if (sentiment && sentiment !== "all") {
        filteredEmails = filteredEmails.filter((email) => email.sentiment === sentiment)
      }

      if (search) {
        const searchLower = search.toLowerCase()
        filteredEmails = filteredEmails.filter(
          (email) =>
            email.subject.toLowerCase().includes(searchLower) ||
            email.body.toLowerCase().includes(searchLower) ||
            email.sender.toLowerCase().includes(searchLower),
        )
      }

      return NextResponse.json({
        emails: filteredEmails,
        note: "Using mock data - please configure Supabase environment variables",
      })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const priority = searchParams.get("priority")
    const sentiment = searchParams.get("sentiment")
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    console.log("[v0] Creating Supabase client...")
    const supabase = await createClient()
    console.log("[v0] Supabase client created successfully")

    let query = supabase
      .from("emails")
      .select("*")
      .order("sent_date", { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (priority && priority !== "all") {
      query = query.eq("priority", priority)
    }

    if (sentiment && sentiment !== "all") {
      query = query.eq("sentiment", sentiment)
    }

    if (search) {
      query = query.or(`subject.ilike.%${search}%,body.ilike.%${search}%,sender.ilike.%${search}%`)
    }

    console.log("[v0] Executing query...")
    const { data: emails, error } = await query

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: "Failed to fetch emails", details: error.message }, { status: 500 })
    }

    console.log("[v0] Query successful, found", emails?.length || 0, "emails")
    return NextResponse.json({ emails: emails || [] })
  } catch (error) {
    console.error("[v0] API error:", error)

    // Fallback to mock data on any error
    console.log("[v0] Falling back to mock data due to error")
    return NextResponse.json({
      emails: mockEmails,
      note: "Using mock data due to Supabase connection error",
    })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        {
          error: "Supabase not configured",
          note: "Please configure Supabase environment variables",
        },
        { status: 500 },
      )
    }

    const supabase = await createClient()
    const { data, error } = await supabase.from("emails").insert([body]).select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to create email" }, { status: 500 })
    }

    return NextResponse.json({ email: data[0] })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
