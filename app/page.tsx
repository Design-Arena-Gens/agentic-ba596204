'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Sparkles, Shield, Clock, Users } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface CareCategory {
  id: string
  title: string
  icon: any
  description: string
  color: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const careCategories: CareCategory[] = [
    {
      id: 'emotional',
      title: 'Emotional Support',
      icon: Heart,
      description: 'Talk through feelings, stress, or life challenges',
      color: 'bg-pink-500'
    },
    {
      id: 'health',
      title: 'Health & Wellness',
      icon: Shield,
      description: 'Get health tips, wellness advice, and lifestyle guidance',
      color: 'bg-green-500'
    },
    {
      id: 'productivity',
      title: 'Productivity',
      icon: Clock,
      description: 'Organize tasks, manage time, and boost efficiency',
      color: 'bg-blue-500'
    },
    {
      id: 'learning',
      title: 'Learning & Growth',
      icon: Sparkles,
      description: 'Learn new skills, get tutoring, or explore topics',
      color: 'bg-purple-500'
    },
    {
      id: 'social',
      title: 'Social & Relationships',
      icon: Users,
      description: 'Navigate relationships, social situations, and connections',
      color: 'bg-orange-500'
    },
    {
      id: 'general',
      title: 'General Assistance',
      icon: MessageCircle,
      description: 'Any other help or questions you might have',
      color: 'bg-gray-500'
    }
  ]

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const category = careCategories.find(c => c.id === categoryId)
    if (category) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `I'm here to help with ${category.title.toLowerCase()}. ${category.description}. How can I support you today?`
      }
      setMessages([welcomeMessage])
    }
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          category: selectedCategory
        })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setMessages([])
    setSelectedCategory(null)
    setInput('')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Care Assistant
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your personal AI companion for all your needs
          </p>
        </div>

        {/* Category Selection */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {careCategories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-400 dark:hover:border-blue-600"
                >
                  <div className={`${category.color} w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </button>
              )
            })}
          </div>
        )}

        {/* Chat Interface */}
        {selectedCategory && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
              <h2 className="text-white text-xl font-semibold">
                {careCategories.find(c => c.id === selectedCategory)?.title}
              </h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                Change Category
              </button>
            </div>

            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl rounded-bl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Features Footer */}
        {!selectedCategory && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ✨ Powered by advanced AI to understand and support your unique needs
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500 dark:text-gray-500">
              <span>🔒 Private & Secure</span>
              <span>💬 Conversational</span>
              <span>🎯 Personalized</span>
              <span>⚡ Instant Support</span>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
