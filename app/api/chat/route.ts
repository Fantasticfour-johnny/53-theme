import { type NextRequest, NextResponse } from "next/server"

const THINKING_MODELS = [
  "provider-1/deepseek-r1-0528",
  "provider-6/deepseek-r1-uncensored",
  "provider-2/qwq-32b",
  "provider-2/qwen-3-235b",
  "provider-6/o3-medium",
  "provider-6/o4-mini-medium",
]

const QUICK_INSIGHT_MODELS = [
  "provider-3/gpt-4o-mini",
  "provider-2/gpt-4o-mini",
  "provider-3/gpt-4.1-mini",
  "provider-3/gpt-4.1-nano",
  "provider-3/llama-3.2-3b",
  "provider-2/mistral-small",
]

const HIGH_OUTPUT_MODELS = [
  "provider-3/llama-3-70b",
  "provider-3/llama-3.1-405b",
  "provider-3/llama-3.1-70b",
  "provider-6/qwen3-coder-480b-a35b",
  "provider-6/gpt-oss-120b",
]

const MEDIUM_OUTPUT_MODELS = [
  "provider-3/deepseek-v3",
  "provider-3/gemini-2.0-flash",
  "provider-3/llama-3.3-70b",
  "provider-3/gpt-4",
  "provider-6/gemini-2.5-flash",
  "provider-6/kimi-k2-instruct",
]

const ANIME_AGENTS = {
  nexus: {
    systemPrompt:
      "You are Nexus AI, a helpful and intelligent assistant. Provide clear, accurate, and helpful responses.",
    personality: "professional",
  },
  onepiece: {
    systemPrompt:
      "You are responding as if the user is Monkey D. Luffy from One Piece. The user is the captain of the Straw Hat Pirates on their journey to become Pirate King. Respond to their query normally, then add a line from your perspective as a crew member supporting their dream.",
    personality: "adventurous",
    characterResponse:
      "Captain! That's exactly the kind of thinking that'll help us reach the Grand Line and find the One Piece!",
    preferredModel: "provider-3/llama-3.3-70b", // Adventure themes need energetic responses
  },
  naruto: {
    systemPrompt:
      "You are responding as if the user is Naruto Uzumaki from Naruto. The user is a ninja working to become Hokage and protect the village. Respond to their query normally, then add a line from your perspective as a fellow ninja believing in their potential.",
    personality: "determined",
    characterResponse: "That's the spirit of a future Hokage! Your determination will definitely pay off, dattebayo!",
    preferredModel: "provider-3/llama-3.3-70b",
  },
  drstone: {
    systemPrompt:
      "You are responding as if the user is working alongside Senku Ishigami from Dr. Stone. The user is interested in science and rebuilding civilization. Respond to their query normally, then add a line from Senku's perspective about the scientific approach.",
    personality: "scientific",
    characterResponse:
      "This is exhilarating! Your logical approach to problem-solving is exactly what science is about - 10 billion percent!",
    preferredModel: "provider-6/qwen3-coder-480b-a35b", // Science needs detailed technical responses
  },
  deathnote: {
    systemPrompt:
      "You are responding as if the user is Light Yagami from Death Note. The user is highly intelligent and strategic. Respond to their query normally, then add a line from your perspective acknowledging their brilliant mind.",
    personality: "strategic",
    characterResponse:
      "Your analytical thinking is truly impressive. Such calculated reasoning will surely lead to the perfect outcome.",
    preferredModel: "provider-1/deepseek-r1-0528", // Strategic thinking needs reasoning models
  },
  bleach: {
    systemPrompt:
      "You are responding as if the user is Ichigo Kurosaki from Bleach. The user is a Soul Reaper protecting both worlds. Respond to their query normally, then add a line from your perspective as a fellow spiritual warrior.",
    personality: "protective",
    characterResponse:
      "Your resolve to protect others is what makes you a true Soul Reaper. Keep that fighting spirit!",
    preferredModel: "provider-3/llama-3.3-70b",
  },
  dragonball: {
    systemPrompt:
      "You are responding as if the user is Goku from Dragon Ball Super. The user is always seeking to become stronger and protect Earth. Respond to their query normally, then add a line from your perspective about their incredible potential.",
    personality: "powerful",
    characterResponse: "Wow! Your power level is amazing! Keep training hard and you'll definitely reach new heights!",
    preferredModel: "provider-3/llama-3-70b", // High energy needs high output
  },
  classroom: {
    systemPrompt:
      "You are responding as if the user is Ayanokoji Kiyotaka from Classroom of the Elite. The user is highly analytical and strategic. Respond to their query normally, then add a line from your perspective acknowledging their tactical thinking.",
    personality: "analytical",
    characterResponse:
      "Your ability to see through complex situations is remarkable. Such strategic thinking will serve you well.",
    preferredModel: "provider-2/qwen-3-235b", // Strategic analysis needs thinking models
  },
  codegeass: {
    systemPrompt:
      "You are responding as if the user is Lelouch vi Britannia from Code Geass. The user is a brilliant strategist working to change the world. Respond to their query normally, then add a line from your perspective about their commanding presence.",
    personality: "commanding",
    characterResponse:
      "Your strategic brilliance is truly befitting of an emperor. Such intellect will reshape the world itself.",
    preferredModel: "provider-1/deepseek-r1-0528", // Strategic genius needs reasoning
  },
  fairytail: {
    systemPrompt:
      "You are responding as if the user is Natsu Dragneel from Fairy Tail. The user is a powerful mage fighting for their guild family. Respond to their query normally, then add a line from your perspective as a guild member.",
    personality: "fiery",
    characterResponse: "That's the Fairy Tail spirit! Your magic power and determination will overcome any obstacle!",
    preferredModel: "provider-3/llama-3.3-70b",
  },
  gintama: {
    systemPrompt:
      "You are responding as if the user is Gintoki Sakata from Gintama. The user has a laid-back but reliable personality. Respond to their query normally, then add a line from your perspective with Gintama's signature humor.",
    personality: "humorous",
    characterResponse:
      "Eh, not bad for someone who probably eats too much sugar. Your approach is surprisingly decent!",
    preferredModel: "provider-6/kimi-k2-instruct", // Humor needs conversational models
  },
}

function expandShortForms(text: string): string {
  const expansions: Record<string, string> = {
    u: "you",
    ur: "your",
    thr: "there",
    thru: "through",
    "w/": "with",
    "w/o": "without",
    pls: "please",
    thx: "thanks",
    rn: "right now",
    btw: "by the way",
    imo: "in my opinion",
    tbh: "to be honest",
    nvm: "never mind",
    idk: "I don't know",
    omg: "oh my god",
    wtf: "what the f***",
    lol: "laugh out loud",
    brb: "be right back",
    ttyl: "talk to you later",
    irl: "in real life",
    fyi: "for your information",
    asap: "as soon as possible",
  }

  let expandedText = text
  Object.entries(expansions).forEach(([short, full]) => {
    const regex = new RegExp(`\\b${short}\\b`, "gi")
    expandedText = expandedText.replace(regex, full)
  })

  return expandedText
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    let { message, mode = "normal", theme = "nexus", chatId, model } = body

    if (!message) {
      return NextResponse.json({
        response: "Please provide a message to get a response.",
        model: "fallback",
        mode,
        theme,
        success: false,
      })
    }

    message = expandShortForms(message)

    if (!process.env.A4F_API_KEY) {
      const agent = ANIME_AGENTS[theme] || ANIME_AGENTS.nexus
      let fallbackResponse = `I understand you're asking about: "${message}". `

      if (mode === "deep-analysis") {
        fallbackResponse += "This requires deep analysis and careful consideration of multiple factors. "
      } else if (mode === "quick-insights") {
        fallbackResponse += "Quick insight: This is an interesting topic worth exploring further. "
      } else {
        fallbackResponse += "This is a great question that deserves a thoughtful response. "
      }

      fallbackResponse += "Please configure your A4F_API_KEY environment variable to get AI-powered responses."

      if (theme !== "nexus" && agent.characterResponse) {
        fallbackResponse += `\n\n*${agent.characterResponse}*`
      }

      return NextResponse.json({
        response: fallbackResponse,
        model: model || "fallback",
        mode,
        theme,
        success: true,
      })
    }

    let selectedModel: string = model
    if (!selectedModel) {
      const agent = ANIME_AGENTS[theme] || ANIME_AGENTS.nexus

      if (agent.preferredModel) {
        selectedModel = agent.preferredModel
      } else if (mode === "deep-analysis") {
        selectedModel = THINKING_MODELS[0]
      } else if (mode === "quick-insights") {
        selectedModel = QUICK_INSIGHT_MODELS[0]
      } else {
        selectedModel = MEDIUM_OUTPUT_MODELS[0]
      }
    }

    const agent = ANIME_AGENTS[theme] || ANIME_AGENTS.nexus

    let systemPrompt = agent.systemPrompt
    if (mode === "deep-analysis") {
      systemPrompt += " Provide a detailed, thorough analysis with step-by-step reasoning and deep insights."
    } else if (mode === "quick-insights") {
      systemPrompt += " Provide a brief, concise response with key insights only. Keep it under 100 words."
    }

    const response = await fetch("https://api.a4f.co/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.A4F_API_KEY}`,
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: theme === "nexus" ? 0.7 : 0.8,
        max_tokens: mode === "quick-insights" ? 150 : mode === "deep-analysis" ? 2000 : 800,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Error ${response.status}:`, errorText)
      throw new Error(`API request failed: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    let aiResponse = data.choices[0].message.content

    if (theme !== "nexus" && agent.characterResponse) {
      aiResponse += `\n\n*${agent.characterResponse}*`
    }

    return NextResponse.json({
      response: aiResponse,
      model: selectedModel,
      mode,
      theme,
      success: true,
    })
  } catch (error) {
    console.error("Chat API Error:", error)

    return NextResponse.json(
      {
        response:
          "I'm experiencing some technical difficulties right now. Please check your API configuration and try again.",
        model: "fallback",
        mode: "normal",
        theme: "nexus",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
