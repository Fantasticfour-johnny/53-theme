"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Mic,
  ImageIcon,
  FileText,
  Brain,
  Zap,
  Eye,
  Share2,
  Layers,
  Sparkles,
  Volume2,
  Plus,
  MessageSquare,
  Trash2,
  Palette,
  ChevronDown,
} from "lucide-react"

type AnimeTheme =
  | "nexus"
  | "onepiece"
  | "naruto"
  | "deathnote"
  | "bleach"
  | "dragonball"
  | "classroom"
  | "codegeass"
  | "fairytail"
  | "gintama"
  | "hunterxhunter"
  | "bungostray"
  | "mobpsycho"
  | "devilmaycry"
  | "assassinationclassroom"
  | "tokyoghoul"
  | "bluelock"
  | "cyberpunk"

interface ThemeConfig {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    aiAvatar: string
    userAvatar: string
  }
  fonts: {
    heading: string
    body: string
  }
  aiName: string
  aiTitle: string
  placeholder: string
  icon: string
  glowEffect?: string
}

const themes: Record<AnimeTheme, ThemeConfig> = {
  nexus: {
    name: "Nexus AI",
    colors: {
      primary: "cyan",
      secondary: "slate",
      accent: "cyan",
      background: "from-slate-50 via-cyan-50/30 to-slate-50",
      surface: "glass-morphism border-cyan-200/50",
      text: "slate-800",
      aiAvatar: "from-cyan-600 to-cyan-800",
      userAvatar: "slate-600",
    },
    fonts: { heading: "font-bold", body: "font-normal" },
    aiName: "Nexus AI",
    aiTitle: "Strategic Intelligence",
    placeholder: "Ask anything, upload files, or explore insights...",
    icon: "🧠",
  },
  onepiece: {
    name: "Pirate King AI",
    colors: {
      primary: "orange",
      secondary: "red",
      accent: "yellow",
      background: "from-orange-100 via-red-50/30 to-yellow-50",
      surface: "glass-morphism border-orange-300/50 shadow-orange-200/20",
      text: "orange-900",
      aiAvatar: "from-orange-600 to-red-700",
      userAvatar: "red-600",
    },
    fonts: { heading: "font-black", body: "font-semibold" },
    aiName: "Pirate King AI",
    aiTitle: "Grand Line Navigator",
    placeholder: "Set sail for adventure! What treasure shall we seek?",
    icon: "🏴‍☠️",
    glowEffect: "shadow-orange-400/30",
  },
  naruto: {
    name: "Hokage AI",
    colors: {
      primary: "orange",
      secondary: "blue",
      accent: "yellow",
      background: "from-orange-100 via-blue-50/30 to-yellow-50",
      surface: "glass-morphism border-orange-300/50 shadow-blue-200/20",
      text: "orange-900",
      aiAvatar: "from-orange-500 to-blue-600",
      userAvatar: "blue-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Hokage AI",
    aiTitle: "Ninja Intelligence",
    placeholder: "Believe it! What jutsu knowledge do you seek, dattebayo?",
    icon: "🍃",
    glowEffect: "shadow-orange-400/30",
  },
  deathnote: {
    name: "Kira AI",
    colors: {
      primary: "red",
      secondary: "black",
      accent: "red",
      background: "from-gray-900 via-red-950/30 to-black",
      surface: "glass-morphism border-red-500/30 shadow-red-900/20 bg-black/40",
      text: "red-100",
      aiAvatar: "from-red-600 to-black",
      userAvatar: "red-700",
    },
    fonts: { heading: "font-black", body: "font-medium" },
    aiName: "Kira AI",
    aiTitle: "God of New World",
    placeholder: "I am justice... What shall we judge today?",
    icon: "📓",
    glowEffect: "shadow-red-500/40",
  },
  bleach: {
    name: "Thousand Year Blood War AI",
    colors: {
      primary: "red",
      secondary: "black",
      accent: "blue",
      background: "from-black via-red-950/30 to-blue-950",
      surface: "glass-morphism border-red-500/50 shadow-blue-900/20 bg-black/40",
      text: "red-100",
      aiAvatar: "from-red-600 to-blue-700",
      userAvatar: "red-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Quincy War AI",
    aiTitle: "Final Battle Intelligence",
    placeholder: "The war has begun... What power do you seek?",
    icon: "⚔️",
    glowEffect: "shadow-red-500/40",
  },
  dragonball: {
    name: "Saiyan AI",
    colors: {
      primary: "yellow",
      secondary: "orange",
      accent: "blue",
      background: "from-yellow-100 via-orange-50/30 to-blue-50",
      surface: "glass-morphism border-yellow-300/50 shadow-orange-200/20",
      text: "yellow-900",
      aiAvatar: "from-yellow-500 to-orange-600",
      userAvatar: "orange-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Saiyan AI",
    aiTitle: "Ultra Instinct Intelligence",
    placeholder: "Power up! What legendary technique shall we master?",
    icon: "⚡",
    glowEffect: "shadow-yellow-400/40",
  },
  classroom: {
    name: "Elite AI",
    colors: {
      primary: "purple",
      secondary: "indigo",
      accent: "pink",
      background: "from-purple-100 via-indigo-50/30 to-pink-50",
      surface: "glass-morphism border-purple-300/50 shadow-indigo-200/20",
      text: "purple-900",
      aiAvatar: "from-purple-600 to-indigo-700",
      userAvatar: "indigo-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Elite AI",
    aiTitle: "Class A Intelligence",
    placeholder: "Excellence is mandatory. What strategy shall we execute?",
    icon: "🎓",
    glowEffect: "shadow-purple-400/30",
  },
  codegeass: {
    name: "Geass AI",
    colors: {
      primary: "red",
      secondary: "purple",
      accent: "gold",
      background: "from-red-100 via-purple-50/30 to-yellow-50",
      surface: "glass-morphism border-red-300/50 shadow-purple-200/20",
      text: "red-900",
      aiAvatar: "from-red-600 to-purple-700",
      userAvatar: "purple-600",
    },
    fonts: { heading: "font-black", body: "font-semibold" },
    aiName: "Geass AI",
    aiTitle: "Emperor's Command",
    placeholder: "I command you... What shall we strategize, Lelouch?",
    icon: "👁️",
    glowEffect: "shadow-red-400/40",
  },
  fairytail: {
    name: "Dragon Slayer AI",
    colors: {
      primary: "pink",
      secondary: "blue",
      accent: "yellow",
      background: "from-pink-100 via-blue-50/30 to-yellow-50",
      surface: "glass-morphism border-pink-300/50 shadow-blue-200/20",
      text: "pink-900",
      aiAvatar: "from-pink-600 to-blue-700",
      userAvatar: "blue-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Dragon Slayer AI",
    aiTitle: "Guild Master Intelligence",
    placeholder: "We're all fired up! What magical quest awaits us?",
    icon: "🔥",
    glowEffect: "shadow-pink-400/30",
  },
  gintama: {
    name: "Yorozuya AI",
    colors: {
      primary: "blue",
      secondary: "white",
      accent: "red",
      background: "from-blue-100 via-white/30 to-red-50",
      surface: "glass-morphism border-blue-300/50 shadow-white-200/20",
      text: "blue-900",
      aiAvatar: "from-blue-600 to-white",
      userAvatar: "blue-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Yorozuya AI",
    aiTitle: "Odd Jobs Intelligence",
    placeholder: "Got any odd jobs? We'll handle anything for the right price!",
    icon: "🍡",
    glowEffect: "shadow-blue-400/30",
  },
  hunterxhunter: {
    name: "Hunter AI",
    colors: {
      primary: "green",
      secondary: "yellow",
      accent: "blue",
      background: "from-green-100 via-yellow-50/30 to-blue-50",
      surface: "glass-morphism border-green-300/50 shadow-yellow-200/20",
      text: "green-900",
      aiAvatar: "from-green-600 to-yellow-600",
      userAvatar: "green-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Hunter AI",
    aiTitle: "Nen Master Intelligence",
    placeholder: "Ready for the Hunter Exam? What adventure shall we pursue?",
    icon: "🎯",
    glowEffect: "shadow-green-400/30",
  },
  chainsawman: {
    name: "Devil Hunter AI",
    colors: {
      primary: "red",
      secondary: "black",
      accent: "orange",
      background: "from-red-100 via-black/10 to-orange-50",
      surface: "glass-morphism border-red-300/50 shadow-black-200/20",
      text: "red-900",
      aiAvatar: "from-red-600 to-black",
      userAvatar: "red-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Devil Hunter AI",
    aiTitle: "Chainsaw Intelligence",
    placeholder: "Time to hunt devils! What contract shall we make?",
    icon: "🪚",
    glowEffect: "shadow-red-400/40",
  },
  kaiju8: {
    name: "Defense Force AI",
    colors: {
      primary: "green",
      secondary: "gray",
      accent: "red",
      background: "from-green-100 via-gray-50/30 to-red-50",
      surface: "glass-morphism border-green-300/50 shadow-gray-200/20",
      text: "green-900",
      aiAvatar: "from-green-600 to-gray-700",
      userAvatar: "green-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Defense Force AI",
    aiTitle: "Kaiju Combat Intelligence",
    placeholder: "Kaiju detected! What's our battle strategy, soldier?",
    icon: "🦖",
    glowEffect: "shadow-green-400/30",
  },
  drstone: {
    name: "Science AI",
    colors: {
      primary: "emerald",
      secondary: "stone",
      accent: "lime",
      background: "from-emerald-100 via-stone-50/30 to-lime-50",
      surface: "glass-morphism border-emerald-300/50 shadow-stone-200/20",
      text: "emerald-900",
      aiAvatar: "from-emerald-600 to-stone-700",
      userAvatar: "emerald-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Science AI",
    aiTitle: "10 Billion Percent Intelligence",
    placeholder: "This is exhilarating! What scientific breakthrough shall we achieve?",
    icon: "🧪",
    glowEffect: "shadow-emerald-400/30",
  },
  dandadan: {
    name: "Occult AI",
    colors: {
      primary: "violet",
      secondary: "pink",
      accent: "yellow",
      background: "from-violet-100 via-pink-50/30 to-yellow-50",
      surface: "glass-morphism border-violet-300/50 shadow-pink-200/20",
      text: "violet-900",
      aiAvatar: "from-violet-600 to-pink-700",
      userAvatar: "violet-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Occult AI",
    aiTitle: "Supernatural Intelligence",
    placeholder: "That's so occult! What paranormal mystery shall we solve?",
    icon: "👻",
    glowEffect: "shadow-violet-400/40",
  },
  jujutsukaisen: {
    name: "Sorcerer AI",
    colors: {
      primary: "indigo",
      secondary: "red",
      accent: "white",
      background: "from-indigo-100 via-red-50/30 to-white",
      surface: "glass-morphism border-indigo-300/50 shadow-red-200/20",
      text: "indigo-900",
      aiAvatar: "from-indigo-600 to-red-700",
      userAvatar: "indigo-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Sorcerer AI",
    aiTitle: "Cursed Technique Intelligence",
    placeholder: "Domain Expansion! What cursed technique shall we master?",
    icon: "🌀",
    glowEffect: "shadow-indigo-400/40",
  },
  attackontitan: {
    name: "Scout AI",
    colors: {
      primary: "brown",
      secondary: "green",
      accent: "red",
      background: "from-amber-100 via-green-50/30 to-red-50",
      surface: "glass-morphism border-amber-300/50 shadow-green-200/20",
      text: "amber-900",
      aiAvatar: "from-amber-600 to-green-700",
      userAvatar: "amber-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Scout AI",
    aiTitle: "Survey Corps Intelligence",
    placeholder: "Dedicate your heart! What titan shall we defeat today?",
    icon: "🗡️",
    glowEffect: "shadow-amber-400/30",
  },
  fmab: {
    name: "Alchemist AI",
    colors: {
      primary: "red",
      secondary: "gold",
      accent: "blue",
      background: "from-red-100 via-yellow-50/30 to-blue-50",
      surface: "glass-morphism border-red-300/50 shadow-yellow-200/20",
      text: "red-900",
      aiAvatar: "from-red-600 to-yellow-600",
      userAvatar: "red-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Alchemist AI",
    aiTitle: "Truth Intelligence",
    placeholder: "Equivalent exchange! What alchemical formula shall we create?",
    icon: "⚗️",
    glowEffect: "shadow-red-400/40",
  },
  myheroacademia: {
    name: "Hero AI",
    colors: {
      primary: "green",
      secondary: "red",
      accent: "yellow",
      background: "from-green-100 via-red-50/30 to-yellow-50",
      surface: "glass-morphism border-green-300/50 shadow-red-200/20",
      text: "green-900",
      aiAvatar: "from-green-600 to-red-700",
      userAvatar: "green-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Hero AI",
    aiTitle: "Plus Ultra Intelligence",
    placeholder: "Plus Ultra! What heroic quirk shall we develop today?",
    icon: "💪",
    glowEffect: "shadow-green-400/40",
  },
  cowboybebop: {
    name: "Bounty Hunter AI",
    colors: {
      primary: "yellow",
      secondary: "black",
      accent: "red",
      background: "from-yellow-100 via-gray-900/10 to-red-50",
      surface: "glass-morphism border-yellow-300/50 shadow-gray-200/20",
      text: "yellow-900",
      aiAvatar: "from-yellow-600 to-gray-800",
      userAvatar: "yellow-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Bounty Hunter AI",
    aiTitle: "Space Cowboy Intelligence",
    placeholder: "See you space cowboy... What bounty shall we hunt?",
    icon: "🚀",
    glowEffect: "shadow-yellow-400/30",
  },
  jojo: {
    name: "Stand User AI",
    colors: {
      primary: "purple",
      secondary: "gold",
      accent: "pink",
      background: "from-purple-100 via-yellow-50/30 to-pink-50",
      surface: "glass-morphism border-purple-300/50 shadow-yellow-200/20",
      text: "purple-900",
      aiAvatar: "from-purple-600 to-yellow-600",
      userAvatar: "purple-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Stand User AI",
    aiTitle: "Bizarre Adventure Intelligence",
    placeholder: "Yare yare daze... What bizarre adventure awaits us?",
    icon: "✨",
    glowEffect: "shadow-purple-400/40",
  },
  onepunchman: {
    name: "Hero AI",
    colors: {
      primary: "yellow",
      secondary: "red",
      accent: "white",
      background: "from-yellow-100 via-red-50/30 to-white",
      surface: "glass-morphism border-yellow-300/50 shadow-red-200/20",
      text: "yellow-900",
      aiAvatar: "from-yellow-600 to-red-700",
      userAvatar: "yellow-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Hero AI",
    aiTitle: "One Punch Intelligence",
    placeholder: "OK. What hero work shall we do today?",
    icon: "👊",
    glowEffect: "shadow-yellow-400/40",
  },
  pokemon: {
    name: "Trainer AI",
    colors: {
      primary: "blue",
      secondary: "red",
      accent: "yellow",
      background: "from-blue-100 via-red-50/30 to-yellow-50",
      surface: "glass-morphism border-blue-300/50 shadow-red-200/20",
      text: "blue-900",
      aiAvatar: "from-blue-600 to-red-700",
      userAvatar: "blue-600",
    },
    fonts: { heading: "font-black", body: "font-medium" },
    aiName: "Trainer AI",
    aiTitle: "Pokemon Master Intelligence",
    placeholder: "Gotta catch 'em all! What Pokemon adventure awaits?",
    icon: "⚡",
    glowEffect: "shadow-blue-400/30",
  },
  haikyu: {
    name: "Volleyball AI",
    colors: {
      primary: "orange",
      secondary: "black",
      accent: "white",
      background: "from-orange-100 via-gray-900/10 to-white",
      surface: "glass-morphism border-orange-300/50 shadow-gray-200/20",
      text: "orange-900",
      aiAvatar: "from-orange-600 to-gray-800",
      userAvatar: "orange-600",
    },
    fonts: { heading: "font-black", body: "font-medium" },
    aiName: "Volleyball AI",
    aiTitle: "Court Intelligence",
    placeholder: "Fly high! What volleyball strategy shall we master?",
    icon: "🏐",
    glowEffect: "shadow-orange-400/30",
  },
  beyblade: {
    name: "Blader AI",
    colors: {
      primary: "blue",
      secondary: "silver",
      accent: "red",
      background: "from-blue-100 via-gray-50/30 to-red-50",
      surface: "glass-morphism border-blue-300/50 shadow-gray-200/20",
      text: "blue-900",
      aiAvatar: "from-blue-600 to-gray-600",
      userAvatar: "blue-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Blader AI",
    aiTitle: "Bit Beast Intelligence",
    placeholder: "Let it rip! What beyblade technique shall we unleash?",
    icon: "🌪️",
    glowEffect: "shadow-blue-400/40",
  },
  tokyorevengers: {
    name: "Time Leaper AI",
    colors: {
      primary: "black",
      secondary: "yellow",
      accent: "red",
      background: "from-gray-900/20 via-yellow-50/30 to-red-50",
      surface: "glass-morphism border-gray-300/50 shadow-yellow-200/20",
      text: "gray-900",
      aiAvatar: "from-gray-800 to-yellow-600",
      userAvatar: "gray-800",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Time Leaper AI",
    aiTitle: "Gang Intelligence",
    placeholder: "Time to change the future! What timeline shall we fix?",
    icon: "⏰",
    glowEffect: "shadow-gray-400/30",
  },
  windbreaker: {
    name: "Bofurin AI",
    colors: {
      primary: "slate",
      secondary: "red",
      accent: "white",
      background: "from-slate-900 via-red-900/20 to-slate-800",
      surface: "glass-morphism border-slate-600/50 shadow-red-500/20",
      text: "slate-100",
      aiAvatar: "from-slate-700 to-red-600",
      userAvatar: "slate-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Bofurin AI",
    aiTitle: "Street Guardian",
    placeholder: "Ready to protect the town? What's the situation?",
    icon: "👊",
    glowEffect: "shadow-red-500/30",
  },
  bakihanma: {
    name: "Fighter AI",
    colors: {
      primary: "red",
      secondary: "black",
      accent: "yellow",
      background: "from-red-100 via-gray-900/10 to-yellow-50",
      surface: "glass-morphism border-red-300/50 shadow-gray-200/20",
      text: "red-900",
      aiAvatar: "from-red-600 to-gray-800",
      userAvatar: "red-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Fighter AI",
    aiTitle: "Combat Intelligence",
    placeholder: "The strongest! What fighting technique shall we master?",
    icon: "👊",
    glowEffect: "shadow-red-400/40",
  },
  fireforce: {
    name: "Fire Soldier AI",
    colors: {
      primary: "orange",
      secondary: "red",
      accent: "yellow",
      background: "from-orange-100 via-red-50/30 to-yellow-50",
      surface: "glass-morphism border-orange-300/50 shadow-red-200/20",
      text: "orange-900",
      aiAvatar: "from-orange-600 to-red-700",
      userAvatar: "orange-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Fire Soldier AI",
    aiTitle: "Ignition Intelligence",
    placeholder: "Latom! What fire technique shall we ignite today?",
    icon: "🔥",
    glowEffect: "shadow-orange-400/40",
  },
  foodwars: {
    name: "Chef AI",
    colors: {
      primary: "red",
      secondary: "yellow",
      accent: "orange",
      background: "from-red-100 via-yellow-50/30 to-orange-50",
      surface: "glass-morphism border-red-300/50 shadow-yellow-200/20",
      text: "red-900",
      aiAvatar: "from-red-600 to-yellow-600",
      userAvatar: "red-600",
    },
    fonts: { heading: "font-black", body: "font-medium" },
    aiName: "Chef AI",
    aiTitle: "Culinary Intelligence",
    placeholder: "Delicious! What legendary dish shall we create today?",
    icon: "👨‍🍳",
    glowEffect: "shadow-red-400/30",
  },
  kaguyasama: {
    name: "Student Council AI",
    colors: {
      primary: "pink",
      secondary: "red",
      accent: "white",
      background: "from-pink-100 via-red-50/30 to-white",
      surface: "glass-morphism border-pink-300/50 shadow-red-200/20",
      text: "pink-900",
      aiAvatar: "from-pink-600 to-red-700",
      userAvatar: "pink-600",
    },
    fonts: { heading: "font-black", body: "font-medium" },
    aiName: "Student Council AI",
    aiTitle: "Love Strategy Intelligence",
    placeholder: "How cute! What romantic strategy shall we devise?",
    icon: "💕",
    glowEffect: "shadow-pink-400/30",
  },
  hellsparadise: {
    name: "Executioner AI",
    colors: {
      primary: "green",
      secondary: "black",
      accent: "red",
      background: "from-green-100 via-gray-900/10 to-red-50",
      surface: "glass-morphism border-green-300/50 shadow-gray-200/20",
      text: "green-900",
      aiAvatar: "from-green-600 to-gray-800",
      userAvatar: "green-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Executioner AI",
    aiTitle: "Paradise Intelligence",
    placeholder: "Welcome to paradise! What deadly mission awaits us?",
    icon: "🌸",
    glowEffect: "shadow-green-400/40",
  },
  mashle: {
    name: "Magic Muscle AI",
    colors: {
      primary: "yellow",
      secondary: "brown",
      accent: "orange",
      background: "from-yellow-100 via-amber-50/30 to-orange-50",
      surface: "glass-morphism border-yellow-300/50 shadow-amber-200/20",
      text: "yellow-900",
      aiAvatar: "from-yellow-600 to-amber-700",
      userAvatar: "yellow-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Magic Muscle AI",
    aiTitle: "Muscle Intelligence",
    placeholder: "Magic is just muscle! What strength shall we build today?",
    icon: "💪",
    glowEffect: "shadow-yellow-400/40",
  },
  shangrila: {
    name: "Frontier AI",
    colors: {
      primary: "blue",
      secondary: "green",
      accent: "silver",
      background: "from-blue-100 via-green-50/30 to-gray-50",
      surface: "glass-morphism border-blue-300/50 shadow-green-200/20",
      text: "blue-900",
      aiAvatar: "from-blue-600 to-green-700",
      userAvatar: "blue-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Frontier AI",
    aiTitle: "Virtual Intelligence",
    placeholder: "Welcome to Shangri-La! What virtual quest shall we embark on?",
    icon: "🎮",
    glowEffect: "shadow-blue-400/30",
  },
  sao: {
    name: "Kirito AI",
    colors: {
      primary: "black",
      secondary: "blue",
      accent: "white",
      background: "from-gray-900/20 via-blue-50/30 to-white",
      surface: "glass-morphism border-gray-300/50 shadow-blue-200/20",
      text: "gray-900",
      aiAvatar: "from-gray-800 to-blue-700",
      userAvatar: "gray-800",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Kirito AI",
    aiTitle: "Dual Blade Intelligence",
    placeholder: "Link start! What virtual world shall we conquer?",
    icon: "⚔️",
    glowEffect: "shadow-gray-400/30",
  },
  goldenkamuy: {
    name: "Gold Hunter AI",
    colors: {
      primary: "gold",
      secondary: "brown",
      accent: "red",
      background: "from-yellow-100 via-amber-50/30 to-red-50",
      surface: "glass-morphism border-yellow-300/50 shadow-amber-200/20",
      text: "yellow-900",
      aiAvatar: "from-yellow-600 to-amber-700",
      userAvatar: "yellow-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Gold Hunter AI",
    aiTitle: "Treasure Intelligence",
    placeholder: "Hinna hinna! What golden treasure shall we hunt today?",
    icon: "🏆",
    glowEffect: "shadow-yellow-400/40",
  },
  moriarty: {
    name: "Professor AI",
    colors: {
      primary: "purple",
      secondary: "black",
      accent: "gold",
      background: "from-purple-100 via-gray-900/10 to-yellow-50",
      surface: "glass-morphism border-purple-300/50 shadow-gray-200/20",
      text: "purple-900",
      aiAvatar: "from-purple-600 to-gray-800",
      userAvatar: "purple-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Professor AI",
    aiTitle: "Criminal Intelligence",
    placeholder: "Elementary! What perfect crime shall we solve today?",
    icon: "🕵️",
    glowEffect: "shadow-purple-400/30",
  },
  eightysix: {
    name: "Spearhead AI",
    colors: {
      primary: "red",
      secondary: "black",
      accent: "white",
      background: "from-red-100 via-gray-900/10 to-white",
      surface: "glass-morphism border-red-300/50 shadow-gray-200/20",
      text: "red-900",
      aiAvatar: "from-red-600 to-gray-800",
      userAvatar: "red-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Spearhead AI",
    aiTitle: "Squadron Intelligence",
    placeholder: "Glory to the Spearhead Squadron! What mission awaits us?",
    icon: "🤖",
    glowEffect: "shadow-red-400/30",
  },
  psychopass: {
    name: "Sibyl AI",
    colors: {
      primary: "cyan",
      secondary: "black",
      accent: "blue",
      background: "from-cyan-100 via-gray-900/10 to-blue-50",
      surface: "glass-morphism border-cyan-300/50 shadow-gray-200/20",
      text: "cyan-900",
      aiAvatar: "from-cyan-600 to-gray-800",
      userAvatar: "cyan-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Sibyl AI",
    aiTitle: "Crime Coefficient Intelligence",
    placeholder: "Crime coefficient measured. What justice shall we execute?",
    icon: "👁️‍🗨️",
    glowEffect: "shadow-cyan-400/30",
  },
  mushokutensei: {
    name: "Reincarnation AI",
    colors: {
      primary: "blue",
      secondary: "green",
      accent: "yellow",
      background: "from-blue-100 via-green-50/30 to-yellow-50",
      surface: "glass-morphism border-blue-300/50 shadow-green-200/20",
      text: "blue-900",
      aiAvatar: "from-blue-600 to-green-700",
      userAvatar: "blue-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Reincarnation AI",
    aiTitle: "Second Life Intelligence",
    placeholder: "New life, new adventures! What magic shall we learn today?",
    icon: "🔮",
    glowEffect: "shadow-blue-400/30",
  },
  slime: {
    name: "Slime AI",
    colors: {
      primary: "blue",
      secondary: "cyan",
      accent: "white",
      background: "from-blue-100 via-cyan-50/30 to-white",
      surface: "glass-morphism border-blue-300/50 shadow-cyan-200/20",
      text: "blue-900",
      aiAvatar: "from-blue-600 to-cyan-700",
      userAvatar: "blue-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Slime AI",
    aiTitle: "Demon Lord Intelligence",
    placeholder: "That's interesting! What nation shall we build today?",
    icon: "🟦",
    glowEffect: "shadow-blue-400/30",
  },
  nogamenolife: {
    name: "Gamer AI",
    colors: {
      primary: "purple",
      secondary: "pink",
      accent: "cyan",
      background: "from-purple-100 via-pink-50/30 to-cyan-50",
      surface: "glass-morphism border-purple-300/50 shadow-pink-200/20",
      text: "purple-900",
      aiAvatar: "from-purple-600 to-pink-700",
      userAvatar: "purple-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Gamer AI",
    aiTitle: "Game Intelligence",
    placeholder: "No game, no life! What game shall we conquer today?",
    icon: "🎯",
    glowEffect: "shadow-purple-400/30",
  },
  sevendeadlysins: {
    name: "Meliodas AI",
    colors: {
      primary: "emerald",
      secondary: "yellow",
      accent: "orange",
      background: "from-emerald-900 via-yellow-800/30 to-orange-900",
      surface: "glass-morphism border-emerald-500/50 shadow-yellow-400/20",
      text: "emerald-100",
      aiAvatar: "from-emerald-600 to-yellow-500",
      userAvatar: "emerald-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Meliodas AI",
    aiTitle: "Dragon's Sin of Wrath",
    placeholder: "What sin shall we conquer today, Captain?",
    icon: "⚔️",
    glowEffect: "shadow-emerald-400/30",
  },
  friendsgame: {
    name: "Yuuichi AI",
    colors: {
      primary: "purple",
      secondary: "red",
      accent: "black",
      background: "from-purple-900 via-red-900/30 to-black",
      surface: "glass-morphism border-purple-600/50 shadow-red-500/20",
      text: "purple-100",
      aiAvatar: "from-purple-700 to-red-600",
      userAvatar: "purple-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Yuuichi AI",
    aiTitle: "Game Master",
    placeholder: "Ready to play? Trust is the most dangerous game...",
    icon: "🎭",
    glowEffect: "shadow-purple-400/30",
  },
  dungeonmeshi: {
    name: "Laios AI",
    colors: {
      primary: "amber",
      secondary: "green",
      accent: "brown",
      background: "from-amber-800 via-green-700/30 to-amber-900",
      surface: "glass-morphism border-amber-500/50 shadow-green-400/20",
      text: "amber-100",
      aiAvatar: "from-amber-600 to-green-500",
      userAvatar: "amber-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Laios AI",
    aiTitle: "Dungeon Gourmet",
    placeholder: "What monster shall we cook today? Every creature is edible!",
    icon: "🍖",
    glowEffect: "shadow-amber-400/30",
  },
  parasyte: {
    name: "Migi AI",
    colors: {
      primary: "teal",
      secondary: "red",
      accent: "gray",
      background: "from-teal-900 via-red-900/20 to-gray-900",
      surface: "glass-morphism border-teal-600/50 shadow-red-500/20",
      text: "teal-100",
      aiAvatar: "from-teal-700 to-red-600",
      userAvatar: "teal-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Migi AI",
    aiTitle: "Parasitic Intelligence",
    placeholder: "Shinichi, what logical analysis do you require?",
    icon: "🧠",
    glowEffect: "shadow-teal-400/30",
  },
  promisedneverland: {
    name: "Emma AI",
    colors: {
      primary: "orange",
      secondary: "green",
      accent: "white",
      background: "from-orange-800 via-green-700/30 to-orange-900",
      surface: "glass-morphism border-orange-500/50 shadow-green-400/20",
      text: "orange-100",
      aiAvatar: "from-orange-600 to-green-500",
      userAvatar: "orange-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Emma AI",
    aiTitle: "Escape Strategist",
    placeholder: "Let's find a way out! No one gets left behind!",
    icon: "🏃‍♀️",
    glowEffect: "shadow-orange-400/30",
  },
  gurrenlagann: {
    name: "Kamina AI",
    colors: {
      primary: "red",
      secondary: "orange",
      accent: "yellow",
      background: "from-red-900 via-orange-800/30 to-yellow-900",
      surface: "glass-morphism border-red-500/50 shadow-orange-400/20",
      text: "red-100",
      aiAvatar: "from-red-600 to-orange-500",
      userAvatar: "red-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Kamina AI",
    aiTitle: "Spiral Warrior",
    placeholder: "Who the hell do you think I am?! Let's pierce the heavens!",
    icon: "🌀",
    glowEffect: "shadow-red-400/30",
  },
  saikik: {
    name: "Saiki AI",
    colors: {
      primary: "pink",
      secondary: "purple",
      accent: "white",
      background: "from-pink-800 via-purple-700/30 to-pink-900",
      surface: "glass-morphism border-pink-500/50 shadow-purple-400/20",
      text: "pink-100",
      aiAvatar: "from-pink-600 to-purple-500",
      userAvatar: "pink-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Saiki AI",
    aiTitle: "Psychic Intelligence",
    placeholder: "Yare yare... what troublesome question do you have?",
    icon: "🔮",
    glowEffect: "shadow-pink-400/30",
  },
  highschooldxd: {
    name: "Issei AI",
    colors: {
      primary: "red",
      secondary: "gold",
      accent: "black",
      background: "from-red-900 via-yellow-800/30 to-black",
      surface: "glass-morphism border-red-500/50 shadow-yellow-400/20",
      text: "red-100",
      aiAvatar: "from-red-600 to-yellow-500",
      userAvatar: "red-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Issei AI",
    aiTitle: "Red Dragon Emperor",
    placeholder: "Boost! What power do you seek, partner?",
    icon: "🐉",
    glowEffect: "shadow-red-400/30",
  },
  gachiakuta: {
    name: "Trash Beast AI",
    colors: {
      primary: "amber",
      secondary: "orange",
      accent: "red",
      background: "from-amber-900 via-orange-800/30 to-red-900",
      surface: "glass-morphism border-amber-500/50 shadow-orange-400/20",
      text: "amber-100",
      aiAvatar: "from-amber-600 to-red-500",
      userAvatar: "amber-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Trash Beast AI",
    aiTitle: "Waste Warrior",
    placeholder: "Ready to turn trash into treasure?",
    icon: "🗑️",
    glowEffect: "shadow-amber-400/30",
  },
  mystar: {
    name: "Idol AI",
    colors: {
      primary: "pink",
      secondary: "purple",
      accent: "white",
      background: "from-pink-100 via-purple-50/30 to-pink-50",
      surface: "glass-morphism border-pink-300/50 shadow-purple-300/20",
      text: "pink-800",
      aiAvatar: "from-pink-500 to-purple-600",
      userAvatar: "pink-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Idol AI",
    aiTitle: "Shining Star",
    placeholder: "Let's reach for the stars together!",
    icon: "⭐",
    glowEffect: "shadow-pink-400/30",
  },
  apothecarydiaries: {
    name: "Apothecary AI",
    colors: {
      primary: "emerald",
      secondary: "teal",
      accent: "green",
      background: "from-emerald-100 via-teal-50/30 to-green-50",
      surface: "glass-morphism border-emerald-300/50 shadow-teal-300/20",
      text: "emerald-800",
      aiAvatar: "from-emerald-600 to-teal-600",
      userAvatar: "emerald-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Apothecary AI",
    aiTitle: "Medicine Master",
    placeholder: "What remedy shall we concoct today?",
    icon: "🧪",
    glowEffect: "shadow-emerald-400/30",
  },
  bungostray: {
    name: "Dazai AI",
    colors: {
      primary: "amber",
      secondary: "slate",
      accent: "orange",
      background: "from-amber-100 via-slate-50/30 to-orange-50",
      surface: "glass-morphism border-amber-300/50 shadow-slate-200/20",
      text: "amber-900",
      aiAvatar: "from-amber-600 to-slate-700",
      userAvatar: "amber-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Dazai AI",
    aiTitle: "Armed Detective Agency",
    placeholder: "Everything is meaningless... but what shall we investigate?",
    icon: "🕵️",
    glowEffect: "shadow-amber-400/30",
  },
  mobpsycho: {
    name: "Mob AI",
    colors: {
      primary: "purple",
      secondary: "pink",
      accent: "violet",
      background: "from-purple-100 via-pink-50/30 to-violet-50",
      surface: "glass-morphism border-purple-300/50 shadow-pink-200/20",
      text: "purple-900",
      aiAvatar: "from-purple-600 to-pink-700",
      userAvatar: "purple-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Mob AI",
    aiTitle: "Psychic Intelligence",
    placeholder: "100%... What psychic power do you need?",
    icon: "🧠",
    glowEffect: "shadow-purple-400/30",
  },
  devilmaycry: {
    name: "Dante AI",
    colors: {
      primary: "red",
      secondary: "gray",
      accent: "silver",
      background: "from-red-100 via-gray-50/30 to-slate-50",
      surface: "glass-morphism border-red-300/50 shadow-gray-200/20",
      text: "red-900",
      aiAvatar: "from-red-600 to-gray-700",
      userAvatar: "red-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Dante AI",
    aiTitle: "Devil Hunter",
    placeholder: "Let's rock, baby! What demons shall we hunt?",
    icon: "🗡️",
    glowEffect: "shadow-red-400/30",
  },
  assassinationclassroom: {
    name: "Koro-sensei AI",
    colors: {
      primary: "yellow",
      secondary: "green",
      accent: "lime",
      background: "from-yellow-100 via-green-50/30 to-lime-50",
      surface: "glass-morphism border-yellow-300/50 shadow-green-200/20",
      text: "yellow-900",
      aiAvatar: "from-yellow-600 to-green-700",
      userAvatar: "yellow-600",
    },
    fonts: { heading: "font-bold", body: "font-medium" },
    aiName: "Koro-sensei AI",
    aiTitle: "Ultimate Teacher",
    placeholder: "Nurufufufu! What shall we learn today, my students?",
    icon: "🎓",
    glowEffect: "shadow-yellow-400/30",
  },
  tokyoghoul: {
    name: "Ghoul AI",
    colors: {
      primary: "red",
      secondary: "black",
      accent: "crimson",
      background: "from-black via-red-950/30 to-gray-900",
      surface: "glass-morphism border-red-500/50 shadow-black/20 bg-black/40",
      text: "red-100",
      aiAvatar: "from-red-600 to-black",
      userAvatar: "red-700",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Ghoul AI",
    aiTitle: "Kagune Intelligence",
    placeholder: "The hunger never ends... What do you seek?",
    icon: "👁️",
    glowEffect: "shadow-red-500/40",
  },
  bluelock: {
    name: "Ego AI",
    colors: {
      primary: "blue",
      secondary: "navy",
      accent: "cyan",
      background: "from-blue-100 via-navy-50/30 to-cyan-50",
      surface: "glass-morphism border-blue-300/50 shadow-navy-200/20",
      text: "blue-900",
      aiAvatar: "from-blue-600 to-navy-700",
      userAvatar: "blue-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Ego AI",
    aiTitle: "Striker Intelligence",
    placeholder: "Become the world's greatest egoist! What's your goal?",
    icon: "⚽",
    glowEffect: "shadow-blue-400/30",
  },
  cyberpunk: {
    name: "Netrunner AI",
    colors: {
      primary: "cyan",
      secondary: "magenta",
      accent: "yellow",
      background: "from-cyan-100 via-magenta-50/30 to-yellow-50",
      surface: "glass-morphism border-cyan-300/50 shadow-magenta-200/20",
      text: "cyan-900",
      aiAvatar: "from-cyan-600 to-magenta-700",
      userAvatar: "cyan-600",
    },
    fonts: { heading: "font-black", body: "font-bold" },
    aiName: "Netrunner AI",
    aiTitle: "Cybernetic Intelligence",
    placeholder: "Wake the f*ck up, samurai! What data do you need?",
    icon: "🤖",
    glowEffect: "shadow-cyan-400/30",
  },
}

interface Message {
  id: string
  content: string
  isAI: boolean
  timestamp: Date
  type?: "text" | "insight" | "visualization"
  metadata?: {
    confidence?: number
    sources?: string[]
    visualData?: any
  }
}

interface Chat {
  id: string
  title: string
  messages: Message[]
  timestamp: Date
}

export default function AnimeAI() {
  const [currentTheme, setCurrentTheme] = useState<AnimeTheme>("nexus")
  const [showThemeSelector, setShowThemeSelector] = useState(false)
  const [showAnalysisDropdown, setShowAnalysisDropdown] = useState(false)
  const [showThemeChangePopup, setShowThemeChangePopup] = useState(false)
  const [showModelChangePopup, setShowModelChangePopup] = useState(false)
  const [pendingTheme, setPendingTheme] = useState<AnimeTheme | null>(null)
  const [currentModel, setCurrentModel] = useState<string>("provider-3/gpt-4")

  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Epic Adventure Discussion",
      timestamp: new Date(),
      messages: [
        {
          id: "1",
          content:
            "Welcome, brave soul! I've analyzed the current situation and spotted three legendary opportunities that could change your destiny forever!",
          isAI: true,
          timestamp: new Date(),
          type: "insight",
          metadata: {
            confidence: 94,
            sources: ["Ancient Wisdom", "Battle Experience", "Spiritual Energy"],
          },
        },
      ],
    },
  ])

  const [currentChatId, setCurrentChatId] = useState<string>("1")
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [contextSidebarOpen, setContextSidebarOpen] = useState(true)
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const theme = themes[currentTheme]

  const currentChat = chats.find((chat) => chat.id === currentChatId)
  const messages = currentChat?.messages || []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Adventure",
      messages: [],
      timestamp: new Date(),
    }
    setChats((prev) => [newChat, ...prev])
    setCurrentChatId(newChat.id)
  }

  const deleteChat = (chatId: string) => {
    if (chats.length <= 1) return

    setChats((prev) => prev.filter((chat) => chat.id !== chatId))

    if (currentChatId === chatId) {
      const remainingChats = chats.filter((chat) => chat.id !== chatId)
      setCurrentChatId(remainingChats[0]?.id || "")
    }
  }

  const handleSend = async () => {
    if (!input.trim() || !currentChat) return

    // Expand common short forms and abbreviations
    const expandedInput = input
      .replace(/\bthr\b/gi, "there")
      .replace(/\bu\b/gi, "you")
      .replace(/\bur\b/gi, "your")
      .replace(/\br\b/gi, "are")
      .replace(/\bn\b/gi, "and")
      .replace(/\bw\b/gi, "with")
      .replace(/\btho\b/gi, "though")
      .replace(/\bthru\b/gi, "through")
      .replace(/\bcuz\b/gi, "because")
      .replace(/\bwud\b/gi, "would")
      .replace(/\bshud\b/gi, "should")
      .replace(/\bcud\b/gi, "could")
      .replace(/\bwnt\b/gi, "want")
      .replace(/\bdnt\b/gi, "don't")
      .replace(/\bcnt\b/gi, "can't")
      .replace(/\bwnt\b/gi, "won't")
      .replace(/\btmrw\b/gi, "tomorrow")
      .replace(/\btdy\b/gi, "today")
      .replace(/\byk\b/gi, "you know")
      .replace(/\bomg\b/gi, "oh my god")
      .replace(/\bbtw\b/gi, "by the way")
      .replace(/\bidk\b/gi, "I don't know")
      .replace(/\bimo\b/gi, "in my opinion")
      .replace(/\bfyi\b/gi, "for your information")

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input, // Keep original input for display
      isAI: false,
      timestamp: new Date(),
    }

    const updatedTitle =
      currentChat.messages.length === 0 ? input.slice(0, 50) + (input.length > 50 ? "..." : "") : currentChat.title

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              title: updatedTitle,
              messages: [...chat.messages, userMessage],
              timestamp: new Date(),
            }
          : chat,
      ),
    )

    const currentInput = input
    setInput("")
    setIsProcessing(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: expandedInput, // Send expanded input to API
          mode: "normal",
          theme: currentTheme,
          chatId: currentChatId,
          model: currentModel,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isAI: true,
        timestamp: new Date(),
        type: "insight",
        metadata: {
          confidence: Math.floor(Math.random() * 20) + 80,
          sources: ["AI Analysis", "Theme Context", "Real-time Processing"],
        },
      }

      setChats((prev) =>
        prev.map((chat) => (chat.id === currentChatId ? { ...chat, messages: [...chat.messages, aiMessage] } : chat)),
      )

      await fetch("/api/chat-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: currentChatId,
          message: currentInput,
          response: data.response,
          theme: currentTheme,
          mode: data.mode,
        }),
      })
    } catch (error) {
      console.error("Error sending message:", error)

      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I apologize, but I'm experiencing technical difficulties. Please try again in a moment. ${theme.aiName} will be back online shortly!`,
        isAI: true,
        timestamp: new Date(),
        type: "text",
      }

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId ? { ...chat, messages: [...chat.messages, fallbackMessage] } : chat,
        ),
      )
    }

    setIsProcessing(false)
  }

  const handleAnalysisAction = async (action: string) => {
    setShowAnalysisDropdown(false)

    if (!input.trim() || !currentChat) return

    const mode = action === "Deep Analysis" ? "deep-analysis" : "quick-insights"

    // Expand short forms for analysis too
    const expandedInput = input
      .replace(/\bthr\b/gi, "there")
      .replace(/\bu\b/gi, "you")
      .replace(/\bur\b/gi, "your")
      .replace(/\br\b/gi, "are")
      .replace(/\bn\b/gi, "and")
      .replace(/\bw\b/gi, "with")
      .replace(/\btho\b/gi, "though")
      .replace(/\bthru\b/gi, "through")
      .replace(/\bcuz\b/gi, "because")
      .replace(/\bwud\b/gi, "would")
      .replace(/\bshud\b/gi, "should")
      .replace(/\bcud\b/gi, "could")
      .replace(/\bwnt\b/gi, "want")
      .replace(/\bdnt\b/gi, "don't")
      .replace(/\bcnt\b/gi, "can't")
      .replace(/\bwnt\b/gi, "won't")
      .replace(/\btmrw\b/gi, "tomorrow")
      .replace(/\btdy\b/gi, "today")
      .replace(/\byk\b/gi, "you know")
      .replace(/\bomg\b/gi, "oh my god")
      .replace(/\bbtw\b/gi, "by the way")
      .replace(/\bidk\b/gi, "I don't know")
      .replace(/\bimo\b/gi, "in my opinion")
      .replace(/\bfyi\b/gi, "for your information")

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isAI: false,
      timestamp: new Date(),
    }

    const updatedTitle =
      currentChat.messages.length === 0 ? input.slice(0, 50) + (input.length > 50 ? "..." : "") : currentChat.title

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              title: updatedTitle,
              messages: [...chat.messages, userMessage],
              timestamp: new Date(),
            }
          : chat,
      ),
    )

    const currentInput = input
    setInput("")
    setIsProcessing(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: expandedInput, // Send expanded input
          mode: mode,
          theme: currentTheme,
          chatId: currentChatId,
          model: currentModel,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isAI: true,
        timestamp: new Date(),
        type: mode === "deep-analysis" ? "insight" : "text",
        metadata:
          mode === "deep-analysis"
            ? {
                confidence: Math.floor(Math.random() * 15) + 85,
                sources: ["Deep Analysis Engine", "Reasoning Models", "Advanced Processing"],
              }
            : undefined,
      }

      setChats((prev) =>
        prev.map((chat) => (chat.id === currentChatId ? { ...chat, messages: [...chat.messages, aiMessage] } : chat)),
      )

      await fetch("/api/chat-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: currentChatId,
          message: currentInput,
          response: data.response,
          theme: currentTheme,
          mode: data.mode,
        }),
      })
    } catch (error) {
      console.error("Error with analysis:", error)
    }

    setIsProcessing(false)
  }

  const handleThemeChange = (newTheme: AnimeTheme) => {
    if (messages.length > 0) {
      setPendingTheme(newTheme)
      setShowThemeChangePopup(true)
      setShowThemeSelector(false)
    } else {
      // No messages, directly change theme
      setCurrentTheme(newTheme)
      setCurrentModel(getOptimalModelForTheme(newTheme))
      setShowThemeSelector(false)
    }
  }

  const getOptimalModelForTheme = (theme: AnimeTheme): string => {
    const themeModelMap: Record<AnimeTheme, string> = {
      nexus: "provider-3/gpt-4",
      drstone: "provider-6/qwen3-coder-480b-a35b", // Science needs detailed technical responses
      classroom: "provider-2/qwen-3-235b", // Elite analysis needs thinking models
      codegeass: "provider-1/deepseek-r1-0528", // Strategic planning needs reasoning
      psychopass: "provider-1/deepseek-r1-0528", // Crime analysis needs deep thinking
      moriarty: "provider-1/deepseek-r1-0528", // Detective work needs reasoning
      eightysix: "provider-3/deepseek-v3", // Military strategy
      fmab: "provider-3/deepseek-v3", // Alchemical complexity
      attackontitan: "provider-3/deepseek-v3", // Strategic warfare
      jujutsukaisen: "provider-3/gpt-4o-mini", // Quick combat responses
      onepunchman: "provider-3/gpt-4o-mini", // Simple, direct responses
      pokemon: "provider-3/gpt-4o-mini", // Fun, quick interactions
      haikyu: "provider-3/gpt-4o-mini", // Energetic, brief responses
      beyblade: "provider-3/gpt-4o-mini", // Action-packed, quick
      deathnote: "provider-1/deepseek-r1-0528", // Strategic thinking needs reasoning
      // Default to balanced model for other themes
      onepiece: "provider-3/llama-3.3-70b",
      naruto: "provider-3/llama-3.3-70b",
      bleach: "provider-3/llama-3.3-70b",
      dragonball: "provider-3/llama-3-70b",
      fairytail: "provider-3/llama-3.3-70b",
      gintama: "provider-6/kimi-k2-instruct",
      hunterxhunter: "provider-3/gpt-4",
      chainsawman: "provider-3/llama-3.3-70b",
      kaiju8: "provider-3/llama-3.3-70b",
      dandadan: "provider-3/llama-3.3-70b",
      myheroacademia: "provider-3/llama-3.3-70b",
      cowboybebop: "provider-3/gpt-4",
      jojo: "provider-3/llama-3.3-70b",
      tokyorevengers: "provider-3/llama-3.3-70b",
      windbreaker: "provider-3/llama-3.3-70b",
      bakihanma: "provider-3/llama-3.3-70b",
      fireforce: "provider-3/llama-3.3-70b",
      foodwars: "provider-3/gpt-4",
      kaguyasama: "provider-3/gpt-4",
      hellsparadise: "provider-3/llama-3.3-70b",
      mashle: "provider-3/llama-3.3-70b",
      shangrila: "provider-3/gpt-4",
      sao: "provider-3/gpt-4",
      goldenkamuy: "provider-3/gpt-4",
      mushokutensei: "provider-3/llama-3.3-70b",
      slime: "provider-3/llama-3.3-70b",
      nogamenolife: "provider-3/gpt-4",
      sevendeadlysins: "provider-3/llama-3.3-70b",
      friendsgame: "provider-2/qwen-3-235b",
      dungeonmeshi: "provider-3/gpt-4",
      parasyte: "provider-3/deepseek-v3",
      promisedneverland: "provider-2/qwen-3-235b",
      gurrenlagann: "provider-3/llama-3-70b",
      saikik: "provider-3/gpt-4o-mini",
      highschooldxd: "provider-3/gpt-4",
      gachiakuta: "provider-3/llama-3.3-70b",
      mystar: "provider-3/gpt-4",
      apothecarydiaries: "provider-3/deepseek-v3",
      bungostray: "provider-1/deepseek-r1-0528", // Detective work needs reasoning
      mobpsycho: "provider-3/gpt-4o-mini", // Simple psychic responses
      devilmaycry: "provider-3/llama-3.3-70b", // Action-packed responses
      assassinationclassroom: "provider-3/deepseek-v3", // Teaching needs detailed responses
      tokyoghoul: "provider-3/llama-3.3-70b", // Dark, intense responses
      bluelock: "provider-3/gpt-4o-mini", // Quick, competitive responses
      cyberpunk: "provider-3/deepseek-v3", // Tech-heavy responses
    }
    return themeModelMap[theme] || "provider-3/gpt-4"
  }

  const applyThemeToCurrentChat = () => {
    if (!pendingTheme) return

    const newModel = getOptimalModelForTheme(pendingTheme)
    if (newModel !== currentModel) {
      setShowModelChangePopup(true)
    } else {
      setCurrentTheme(pendingTheme)
      setShowThemeChangePopup(false)
      setPendingTheme(null)
    }
  }

  const createNewChatWithTheme = () => {
    if (!pendingTheme) return

    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Adventure",
      messages: [],
      timestamp: new Date(),
    }
    setChats((prev) => [newChat, ...prev])
    setCurrentChatId(newChat.id)
    setCurrentTheme(pendingTheme)
    setCurrentModel(getOptimalModelForTheme(pendingTheme))
    setShowThemeChangePopup(false)
    setPendingTheme(null)
  }

  const confirmModelChange = (useNewModel: boolean) => {
    if (!pendingTheme) return

    setCurrentTheme(pendingTheme)
    if (useNewModel) {
      setCurrentModel(getOptimalModelForTheme(pendingTheme))
    }
    setShowModelChangePopup(false)
    setShowThemeChangePopup(false)
    setPendingTheme(null)
  }

  useEffect(() => {
    // Save theme preference
    fetch("/api/themes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        theme: currentTheme,
      }),
    }).catch(console.error)
  }, [currentTheme])

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await fetch("/api/chat-history")
        if (response.ok) {
          const data = await response.json()
          if (data.chats && data.chats.length > 0) {
            setChats(
              data.chats.map((chat: any) => ({
                ...chat,
                timestamp: new Date(chat.timestamp || chat.createdAt),
                messages: chat.messages.map((msg: any) => ({
                  ...msg,
                  timestamp: new Date(msg.timestamp),
                })),
              })),
            )
            setCurrentChatId(data.chats[0].id)
          }
        }
      } catch (error) {
        console.error("Failed to load chat history:", error)
      }
    }

    loadChatHistory()
  }, [])

  const contextInsights = {
    nexus: [
      "Market volatility increased 15%",
      "3 new competitor features detected",
      "User satisfaction up 8% this week",
    ],
    onepiece: ["New bounties posted in East Blue", "Devil Fruit spotted near Water 7", "Marine activity increased 20%"],
    naruto: ["Chunin Exams approaching fast", "New jutsu techniques discovered", "Village security level raised"],
    deathnote: ["Crime rate decreased 30%", "3 new cases under investigation", "Justice system efficiency up 15%"],
    bleach: ["Hollow activity detected", "Soul Society reports received", "Spiritual pressure levels rising"],
    dragonball: ["New Dragon Balls scattered", "Power level readings off the charts", "Tournament of Power announced"],
    classroom: ["Class rankings updated", "Elite student transfers incoming", "Academic performance peaked"],
    codegeass: ["Britannian forces mobilizing", "Rebellion activity detected", "Geass users identified"],
    fairytail: ["Guild requests flooding in", "Dark guild activity reported", "Magic Council meeting scheduled"],
    gintama: ["Odd jobs requests piling up", "Shogun visit announced", "Sugar prices skyrocketing"],
    hunterxhunter: [
      "Hunter Exam applications open",
      "Phantom Troupe sighting confirmed",
      "Chimera Ant activity detected",
    ],
    chainsawman: ["Devil contracts increasing", "Public Safety recruitment up", "Chainsaw Devil power surge"],
    kaiju8: ["Kaiju threat level elevated", "Defense Force on high alert", "New monster classifications added"],
    drstone: ["Scientific breakthrough achieved", "Stone World population growing", "New formula discovered"],
    dandadan: ["Alien sightings reported", "Occult club membership rising", "Supernatural activity detected"],
    jujutsukaisen: ["Cursed spirit activity increased", "New sorcerer students enrolled", "Domain expansion training"],
    attackontitan: ["Titan movements detected", "Wall maintenance scheduled", "Survey Corps expedition planned"],
    fmab: ["Alchemical research progressing", "Philosopher's Stone rumors", "State Alchemist examinations"],
    myheroacademia: ["Hero license applications up", "Villain activity reported", "UA entrance exams approaching"],
    cowboybebop: ["New bounties posted", "Space travel increased 20%", "Jazz clubs popularity rising"],
    jojo: ["Stand user encounters reported", "Bizarre incidents investigated", "Arrow fragments discovered"],
    onepunchman: ["Monster threat levels rising", "Hero Association recruiting", "Saitama training routine viral"],
    pokemon: ["New Pokemon species discovered", "Gym leader challenges increased", "Pokemon League tournament"],
    haikyu: ["Volleyball tournament season", "New team formations", "Training camp schedules released"],
    beyblade: ["World championship announced", "New beyblade technology", "Bit-beast sightings confirmed"],
    tokyorevengers: ["Gang activity fluctuating", "Time anomalies detected", "Delinquent incidents reported"],
    windbreaker: ["Gang conflict resolved", "New protection mission", "Bofurin team assembly"],
    bakihanma: ["Underground tournament announced", "New fighting techniques", "Strength records broken"],
    fireforce: ["Infernal incidents rising", "Fire Force recruitment", "Adolla research progressing"],
    foodwars: ["Culinary competitions scheduled", "New cooking techniques", "Restaurant reviews updated"],
    kaguyasama: ["Student council elections", "Love confession statistics", "Academic performance data"],
    hellsparadise: ["Paradise expedition planned", "Execution methods studied", "Survival training intensified"],
    mashle: ["Magic academy enrollment", "Muscle training programs", "Anti-magic research advancing"],
    shangrila: ["Virtual world updates", "New game releases", "Digital frontier exploration"],
    sao: ["Virtual reality advances", "New VRMMO launches", "Sword skill development"],
    goldenkamuy: ["Treasure hunting expeditions", "Survival skill workshops", "Ainu culture studies"],
    moriarty: ["Criminal cases solved", "Detective work increased", "Mathematical proofs published"],
    eightysix: ["Military operations planned", "Mech technology advances", "Squadron training exercises"],
    psychopass: ["Crime coefficient analysis", "Sibyl system updates", "Justice enforcement statistics"],
    mushokutensei: ["Magic research progressing", "Reincarnation studies", "World exploration missions"],
    slime: ["Nation building projects", "Monster alliance meetings", "Slime evolution research"],
    nogamenolife: ["Gaming tournaments scheduled", "Strategy guides published", "Sibling coordination studies"],
    sevendeadlysins: ["Holy War approaching", "Sin power awakened", "Sacred treasure located"],
    friendsgame: ["New game initiated", "Trust level critical", "Psychological trap detected"],
    dungeonmeshi: ["New monster discovered", "Recipe perfected", "Dungeon floor cleared"],
    parasyte: ["Parasitic threat detected", "Human behavior analyzed", "Survival probability updated"],
    promisedneverland: ["Escape plan ready", "Demon patrol detected", "New ally recruited"],
    gurrenlagann: ["Spiral power rising", "Impossible barrier detected", "Fighting spirit ignited"],
    saikik: ["Psychic disturbance", "Troublesome situation", "Coffee jelly located"],
    highschooldxd: ["Dragon boost ready", "Supernatural threat", "Harem situation developing"],
    gachiakuta: ["Trash beast awakened", "Waste energy detected", "Scrap metal analyzed"],
    mystar: ["Stage performance ready", "Fan support rising", "Idol training complete"],
    apothecarydiaries: ["Poison identified", "Herb mixture ready", "Medical mystery solved"],
    bungostray: [
      "Armed Detective Agency on the case",
      "Mysterious ability users spotted",
      "Suicide attempts increasing",
    ],
    mobpsycho: ["Psychic energy levels rising", "Evil spirits detected", "Reigen's scams exposed"],
    devilmaycry: ["Demon invasions imminent", "Devil Arms located", "Pizza sales skyrocketing"],
    assassinationclassroom: [
      "Assassination attempts ongoing",
      "Koro-sensei's weaknesses revealed",
      "Class 3-E's grades improving",
    ],
    tokyoghoul: ["Ghoul activity escalating", "CCG investigations intensifying", "Coffee consumption rising"],
    bluelock: ["Striker selection commencing", "Egoist training intensifying", "Goal-scoring records broken"],
    cyberpunk: ["Cyberware malfunctions reported", "Netrunner activity surging", "Megacorp conspiracies uncovered"],
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={`flex h-screen bg-gradient-to-br ${theme.colors.background} transition-all duration-500 ${theme.glowEffect ? `shadow-2xl ${theme.glowEffect}` : ""}`}
    >
      {showThemeChangePopup && pendingTheme && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <Card className={`p-6 ${theme.colors.surface} max-w-md w-full mx-4`}>
            <h3 className={`${theme.fonts.heading} text-xl text-${theme.colors.text} mb-4`}>Change Theme</h3>
            <p className={`text-${theme.colors.text} mb-6`}>
              Would you like to apply the <strong>{themes[pendingTheme].name}</strong> theme to your current chat or
              start a new chat?
            </p>
            <div className="flex gap-3">
              <Button
                onClick={applyThemeToCurrentChat}
                className={`flex-1 bg-${theme.colors.primary}-600 hover:bg-${theme.colors.primary}-700 text-white`}
              >
                Apply to Current Chat
              </Button>
              <Button
                onClick={createNewChatWithTheme}
                variant="outline"
                className={`flex-1 border-${theme.colors.primary}-300 hover:bg-${theme.colors.primary}-50`}
              >
                Start New Chat
              </Button>
            </div>
            <Button
              variant="ghost"
              className="w-full mt-3"
              onClick={() => {
                setShowThemeChangePopup(false)
                setPendingTheme(null)
              }}
            >
              Cancel
            </Button>
          </Card>
        </div>
      )}

      {showModelChangePopup && pendingTheme && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <Card className={`p-6 ${theme.colors.surface} max-w-md w-full mx-4`}>
            <h3 className={`${theme.fonts.heading} text-xl text-${theme.colors.text} mb-4`}>Change AI Model</h3>
            <p className={`text-${theme.colors.text} mb-4`}>
              The <strong>{themes[pendingTheme].name}</strong> theme works best with a different AI model:
            </p>
            <div className={`bg-${theme.colors.primary}-50 p-4 rounded-lg mb-6`}>
              <p className={`text-sm text-${theme.colors.text} mb-2`}>
                <strong>Current:</strong> {currentModel.split("/")[1]}
              </p>
              <p className={`text-sm text-${theme.colors.text}`}>
                <strong>Recommended:</strong> {getOptimalModelForTheme(pendingTheme).split("/")[1]}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => confirmModelChange(true)}
                className={`flex-1 bg-${theme.colors.primary}-600 hover:bg-${theme.colors.primary}-700 text-white`}
              >
                Use Recommended Model
              </Button>
              <Button
                onClick={() => confirmModelChange(false)}
                variant="outline"
                className={`flex-1 border-${theme.colors.primary}-300 hover:bg-${theme.colors.primary}-50`}
              >
                Keep Current Model
              </Button>
            </div>
          </Card>
        </div>
      )}

      {showThemeSelector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <Card className={`p-6 ${theme.colors.surface} max-w-6xl w-full mx-4 max-h-[80vh] overflow-y-auto`}>
            <h3 className={`${theme.fonts.heading} text-xl text-${theme.colors.text} mb-4`}>
              Choose Your Anime Universe
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {Object.entries(themes).map(([key, themeConfig]) => (
                <Button
                  key={key}
                  variant={currentTheme === key ? "default" : "outline"}
                  className={`p-4 h-auto flex flex-col gap-2 transition-all hover:scale-105 ${
                    currentTheme === key
                      ? `bg-${themeConfig.colors.primary}-600 text-white shadow-lg`
                      : `border-${themeConfig.colors.primary}-300 hover:bg-${themeConfig.colors.primary}-50 hover:border-${themeConfig.colors.primary}-400`
                  }`}
                  onClick={() => handleThemeChange(key as AnimeTheme)}
                >
                  <span className="text-2xl">{themeConfig.icon}</span>
                  <span className="text-xs font-semibold text-center leading-tight">{themeConfig.name}</span>
                </Button>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" onClick={() => setShowThemeSelector(false)}>
              Cancel
            </Button>
          </Card>
        </div>
      )}

      <div className={`${contextSidebarOpen ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden`}>
        <div
          className={`h-full ${theme.colors.surface} border-r border-${theme.colors.primary}-200/50 p-6 flex flex-col`}
        >
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.colors.aiAvatar} flex items-center justify-center transition-all duration-300 ${theme.glowEffect ? `shadow-lg ${theme.glowEffect}` : ""}`}
              >
                <span className="text-xl">{theme.icon}</span>
              </div>
              <div>
                <h1 className={`${theme.fonts.heading} text-xl text-${theme.colors.text}`}>{theme.aiName}</h1>
                <p className={`text-sm text-${theme.colors.primary}-600`}>{theme.aiTitle}</p>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <Badge variant="secondary" className={`bg-${theme.colors.primary}-100 text-${theme.colors.primary}-800`}>
                <Eye className="w-3 h-3 mr-1" />
                Live Analysis
              </Badge>
              <Badge variant="secondary" className={`bg-green-100 text-green-800`}>
                {chats.length} Chats
              </Badge>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-semibold text-${theme.colors.text}`}>Chat History</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={createNewChat}
                  className={`h-8 w-8 p-0 hover:bg-${theme.colors.primary}-100`}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all group ${
                      currentChatId === chat.id
                        ? `bg-${theme.colors.primary}-100 border-${theme.colors.primary}-300`
                        : `bg-white/50 border-${theme.colors.primary}-100 hover:bg-${theme.colors.primary}-50`
                    }`}
                    onClick={() => setCurrentChatId(chat.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare className={`w-3 h-3 text-${theme.colors.primary}-600 flex-shrink-0`} />
                          <p className={`text-sm font-medium text-${theme.colors.text} truncate`}>{chat.title}</p>
                        </div>
                        <p className={`text-xs text-${theme.colors.secondary}-500`}>
                          {chat.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                      {chats.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteChat(chat.id)
                          }}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`font-semibold text-${theme.colors.text} mb-3`}>Live Insights</h3>
              <div className="space-y-2">
                {contextInsights[currentTheme].map((insight, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg bg-white/50 border border-${theme.colors.primary}-100 text-sm transition-all duration-300 ${theme.glowEffect ? `hover:${theme.glowEffect}` : ""}`}
                  >
                    {insight}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`${theme.colors.surface} border-b border-${theme.colors.primary}-200/50 p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setContextSidebarOpen(!contextSidebarOpen)}
                className={`hover:bg-${theme.colors.primary}-100`}
              >
                <Layers className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className={`hover:bg-${theme.colors.primary}-100`}
                onClick={() => setShowThemeSelector(true)}
              >
                <Palette className="w-4 h-4 mr-2" />
                <span className="text-lg mr-1">{theme.icon}</span>
                Theme
              </Button>
              <Button variant="ghost" size="sm" className={`hover:bg-${theme.colors.primary}-100`}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Chat
              </Button>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.isAI ? "justify-start" : "justify-end"} transition-all duration-300`}
            >
              {message.isAI && (
                <Avatar
                  className={`w-12 h-12 border-2 border-${theme.colors.primary}-200 transition-all duration-300 ${theme.glowEffect ? `shadow-lg ${theme.glowEffect}` : ""}`}
                >
                  <AvatarFallback
                    className={`bg-gradient-to-br ${theme.colors.aiAvatar} text-white ${theme.fonts.heading}`}
                  >
                    {theme.icon}
                  </AvatarFallback>
                </Avatar>
              )}

              <div className={`max-w-3xl ${message.isAI ? "" : "order-first"}`}>
                <Card
                  className={`p-6 transition-all duration-300 ${
                    message.isAI
                      ? `${theme.colors.surface} shadow-xl ${theme.glowEffect ? theme.glowEffect : ""}`
                      : `bg-${theme.colors.primary}-600 text-white border-${theme.colors.primary}-600 shadow-lg`
                  }`}
                >
                  {message.type === "insight" && message.isAI && (
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className={`w-4 h-4 text-${theme.colors.primary}-600`} />
                      <span className={`text-sm ${theme.fonts.heading} text-${theme.colors.primary}-700`}>
                        Epic Insight
                      </span>
                      {message.metadata?.confidence && (
                        <Badge
                          variant="secondary"
                          className={`bg-${theme.colors.primary}-100 text-${theme.colors.primary}-800 text-xs`}
                        >
                          {message.metadata.confidence}% confidence
                        </Badge>
                      )}
                    </div>
                  )}

                  <p
                    className={`${message.isAI ? `text-${theme.colors.text}` : "text-white"} leading-relaxed text-base ${theme.fonts.body}`}
                  >
                    {message.content}
                  </p>

                  {message.metadata?.sources && (
                    <div className={`mt-4 pt-3 border-t border-${theme.colors.primary}-200/50`}>
                      <div className="flex flex-wrap gap-2">
                        {message.metadata.sources.map((source, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={`text-xs border-${theme.colors.primary}-300 text-${theme.colors.primary}-700`}
                          >
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    className={`flex items-center justify-between mt-4 pt-3 border-t border-${theme.colors.primary}-200/30`}
                  >
                    <p
                      className={`text-xs ${message.isAI ? `text-${theme.colors.primary}-600` : `text-${theme.colors.primary}-200`}`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </Card>
              </div>

              {!message.isAI && (
                <Avatar className={`w-12 h-12 border-2 border-${theme.colors.secondary}-200`}>
                  <AvatarFallback className={`bg-${theme.colors.userAvatar} text-white ${theme.fonts.heading}`}>
                    A
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isProcessing && (
            <div className="flex gap-4 justify-start transition-all duration-300">
              <Avatar
                className={`w-12 h-12 border-2 border-${theme.colors.primary}-200 transition-all duration-300 ${theme.glowEffect ? `shadow-lg ${theme.glowEffect}` : ""}`}
              >
                <AvatarFallback
                  className={`bg-gradient-to-br ${theme.colors.aiAvatar} text-white ${theme.fonts.heading}`}
                >
                  {theme.icon}
                </AvatarFallback>
              </Avatar>
              <Card className={`${theme.colors.surface} shadow-xl p-6 transition-all duration-300`}>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className={`w-2 h-2 bg-${theme.colors.primary}-600 rounded-full animate-bounce`}></div>
                    <div
                      className={`w-2 h-2 bg-${theme.colors.primary}-600 rounded-full animate-bounce`}
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className={`w-2 h-2 bg-${theme.colors.primary}-600 rounded-full animate-bounce`}
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className={`text-sm text-${theme.colors.primary}-700`}>Processing your request...</span>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className={`p-6 ${theme.colors.surface} border-t border-${theme.colors.primary}-200/50`}>
          <div className="flex gap-4 items-end">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={theme.placeholder}
                className={`pr-32 py-4 text-base border-${theme.colors.primary}-200 focus:border-${theme.colors.primary}-400 focus:ring-${theme.colors.primary}-400 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                <div className="relative">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`h-8 px-2 hover:bg-${theme.colors.primary}-100 flex items-center gap-1`}
                    onClick={() => setShowAnalysisDropdown(!showAnalysisDropdown)}
                  >
                    <Brain className={`w-4 h-4 text-${theme.colors.secondary}-500`} />
                    <ChevronDown className={`w-3 h-3 text-${theme.colors.secondary}-500`} />
                  </Button>
                  {showAnalysisDropdown && (
                    <div
                      className={`absolute bottom-full right-0 mb-2 ${theme.colors.surface} border border-${theme.colors.primary}-200 rounded-lg shadow-lg z-10 min-w-40`}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start hover:bg-${theme.colors.primary}-100 rounded-t-lg`}
                        onClick={() => handleAnalysisAction("Deep Analysis")}
                      >
                        <Brain className="w-4 h-4 mr-2" />
                        Deep Analysis
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`w-full justify-start hover:bg-${theme.colors.primary}-100 rounded-b-lg`}
                        onClick={() => handleAnalysisAction("Quick Insights")}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Quick Insights
                      </Button>
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className={`h-8 w-8 p-0 hover:bg-${theme.colors.primary}-100`}
                  onClick={() => setIsVoiceActive(!isVoiceActive)}
                >
                  {isVoiceActive ? (
                    <Volume2 className={`w-4 h-4 text-${theme.colors.primary}-600`} />
                  ) : (
                    <Mic className={`w-4 h-4 text-${theme.colors.secondary}-500`} />
                  )}
                </Button>
                <Button size="sm" variant="ghost" className={`h-8 w-8 p-0 hover:bg-${theme.colors.primary}-100`}>
                  <ImageIcon className={`w-4 h-4 text-${theme.colors.secondary}-500`} />
                </Button>
                <Button size="sm" variant="ghost" className={`h-8 w-8 p-0 hover:bg-${theme.colors.primary}-100`}>
                  <FileText className={`w-4 h-4 text-${theme.colors.secondary}-500`} />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isProcessing}
              className={`bg-${theme.colors.primary}-600 hover:bg-${theme.colors.primary}-700 text-white px-8 py-4 rounded-xl transition-all duration-300 ${theme.glowEffect ? `shadow-lg ${theme.glowEffect}` : ""}`}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
