import { type NextRequest, NextResponse } from "next/server"

// Mock database - replace with your actual database
let chatHistory: any[] = []

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId") || "anonymous"

    // Get user's chat history
    const userChats = chatHistory.filter((chat) => chat.userId === userId)

    return NextResponse.json({ chats: userChats })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { chatId, message, response, theme, mode, userId = "anonymous" } = await req.json()

    // Find or create chat
    let chat = chatHistory.find((c) => c.id === chatId)
    if (!chat) {
      chat = {
        id: chatId,
        userId,
        title: message.slice(0, 50) + (message.length > 50 ? "..." : ""),
        theme,
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      chatHistory.push(chat)
    }

    // Add message and response
    chat.messages.push(
      { role: "user", content: message, timestamp: new Date().toISOString() },
      { role: "assistant", content: response, mode, timestamp: new Date().toISOString() },
    )
    chat.updatedAt = new Date().toISOString()

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save chat" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const chatId = searchParams.get("chatId")

    chatHistory = chatHistory.filter((chat) => chat.id !== chatId)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete chat" }, { status: 500 })
  }
}
