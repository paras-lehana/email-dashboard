import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { reply } = await request.json()
    const supabase = await createClient()

    // Get current email
    const { data: email, error: fetchError } = await supabase.from("emails").select("replies").eq("id", id).single()

    if (fetchError) {
      console.error("Database error:", fetchError)
      return NextResponse.json({ error: "Email not found" }, { status: 404 })
    }

    // Append new reply to existing replies (pipe-separated)
    const currentReplies = email.replies || ""
    const newReplies = currentReplies ? `${currentReplies}|${reply}` : reply

    // Update email with new reply and mark as replied
    const { data, error } = await supabase
      .from("emails")
      .update({
        replies: newReplies,
        status: "replied",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to add reply" }, { status: 500 })
    }

    return NextResponse.json({ email: data[0] })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
