import { type NextRequest, NextResponse } from "next/server"

// Mock user preferences - replace with your database
const userPreferences: any = {}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId") || "anonymous"

    const preferences = userPreferences[userId] || { theme: "nexus" }

    return NextResponse.json({ preferences })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch preferences" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId = "anonymous", theme } = await req.json()

    userPreferences[userId] = { theme, updatedAt: new Date().toISOString() }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save preferences" }, { status: 500 })
  }
}
