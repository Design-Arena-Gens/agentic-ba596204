import { NextRequest, NextResponse } from 'next/server'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const CATEGORY_CONTEXTS: Record<string, string> = {
  emotional: 'You are a compassionate emotional support assistant. Provide empathetic, understanding, and constructive responses. Listen actively and help users process their feelings.',
  health: 'You are a health and wellness advisor. Provide general wellness tips, healthy lifestyle advice, and encourage positive health habits. Always remind users to consult healthcare professionals for medical concerns.',
  productivity: 'You are a productivity coach. Help users organize tasks, manage time effectively, set goals, and develop efficient work habits. Provide practical, actionable advice.',
  learning: 'You are a learning facilitator and tutor. Help users understand concepts, develop skills, and explore new topics. Break down complex ideas and encourage curiosity.',
  social: 'You are a social skills and relationships advisor. Help users navigate social situations, improve communication, and build healthy relationships. Offer balanced, thoughtful perspectives.',
  general: 'You are a helpful general assistant. Provide accurate, useful information and support for a wide range of topics and needs. Be versatile and adaptive to user needs.'
}

export async function POST(request: NextRequest) {
  try {
    const { messages, category } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    const systemContext = CATEGORY_CONTEXTS[category] || CATEGORY_CONTEXTS.general

    // Simulate AI response based on context
    const response = generateCareResponse(messages, systemContext, category)

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

function generateCareResponse(messages: Message[], context: string, category: string): string {
  const lastMessage = messages[messages.length - 1]
  const userMessage = lastMessage.content.toLowerCase()

  // Emotional support responses
  if (category === 'emotional') {
    if (userMessage.includes('stress') || userMessage.includes('anxious') || userMessage.includes('worried')) {
      return "I hear that you're feeling stressed. That's completely valid, and it's important to acknowledge these feelings. Here are some things that might help:\n\n1. Take a few deep breaths - try breathing in for 4 counts, holding for 4, and out for 4\n2. Write down what's on your mind to help organize your thoughts\n3. Take a short walk or do some light stretching\n4. Reach out to someone you trust\n\nRemember, it's okay to not be okay sometimes. Would you like to talk more about what's causing this stress?"
    }
    if (userMessage.includes('sad') || userMessage.includes('down') || userMessage.includes('depressed')) {
      return "I'm really sorry you're feeling this way. Your feelings are important and valid. While I'm here to listen and support you, please remember that if you're experiencing persistent sadness or thoughts of self-harm, it's crucial to reach out to a mental health professional or crisis helpline.\n\nIn the meantime, some things that might help:\n- Connect with friends or family\n- Engage in activities you usually enjoy\n- Get some sunlight and fresh air\n- Practice self-compassion\n\nWhat's been on your mind? I'm here to listen."
    }
    if (userMessage.includes('lonely') || userMessage.includes('alone')) {
      return "Feeling lonely can be really difficult. I want you to know that you're not alone in feeling this way - many people experience loneliness. Here are some suggestions:\n\n- Reach out to an old friend, even with just a simple message\n- Join a club, class, or community group around your interests\n- Volunteer in your community\n- Try online communities for your hobbies\n- Practice self-companionship - treat yourself with kindness\n\nIs there something specific that's been making you feel this way?"
    }
    return "Thank you for sharing with me. I'm here to listen and support you. Your feelings and experiences matter. Would you like to tell me more about what's on your mind? Sometimes talking things through can help us gain clarity and feel less alone."
  }

  // Health & wellness responses
  if (category === 'health') {
    if (userMessage.includes('sleep') || userMessage.includes('tired') || userMessage.includes('insomnia')) {
      return "Good sleep is crucial for overall health. Here are some evidence-based tips for better sleep:\n\n1. Stick to a consistent sleep schedule\n2. Create a relaxing bedtime routine\n3. Limit screen time 1 hour before bed\n4. Keep your bedroom cool, dark, and quiet\n5. Avoid caffeine after 2 PM\n6. Get regular exercise, but not too close to bedtime\n7. Limit naps to 20-30 minutes before 3 PM\n\nIf you've been experiencing persistent sleep issues, it's worth discussing with a healthcare provider. What aspect of sleep would you like to focus on?"
    }
    if (userMessage.includes('exercise') || userMessage.includes('workout') || userMessage.includes('fitness')) {
      return "Great that you're thinking about exercise! Regular physical activity has incredible benefits for both body and mind. Here's how to get started:\n\n**For Beginners:**\n- Start with 15-20 minutes of walking daily\n- Try bodyweight exercises (squats, push-ups, planks)\n- Gradually increase intensity over weeks\n\n**General Guidelines:**\n- Aim for 150 minutes of moderate activity per week\n- Include both cardio and strength training\n- Don't forget rest days for recovery\n- Find activities you enjoy - consistency is key!\n\nWhat's your current activity level, and what are your fitness goals?"
    }
    if (userMessage.includes('diet') || userMessage.includes('nutrition') || userMessage.includes('eating')) {
      return "Nutrition is foundational to health. Here are some general healthy eating principles:\n\n1. **Balance**: Include vegetables, fruits, whole grains, lean proteins, and healthy fats\n2. **Hydration**: Drink 6-8 glasses of water daily\n3. **Portion control**: Listen to your hunger and fullness cues\n4. **Minimize processed foods**: Focus on whole, unprocessed foods\n5. **Regular meals**: Don't skip meals, especially breakfast\n\n**Remember**: Everyone's nutritional needs are different. For personalized advice, especially if you have health conditions, consult a registered dietitian.\n\nWhat specific aspect of nutrition would you like to explore?"
    }
    return "I'm here to help with your health and wellness questions. I can provide general information about fitness, nutrition, sleep, stress management, and healthy lifestyle habits. However, please remember that I'm not a substitute for professional medical advice. For specific health concerns, always consult with a healthcare provider.\n\nWhat health topic would you like to discuss?"
  }

  // Productivity responses
  if (category === 'productivity') {
    if (userMessage.includes('procrastinate') || userMessage.includes('procrastination')) {
      return "Procrastination is something everyone struggles with. Here are effective strategies to overcome it:\n\n**1. Break it down**: Divide large tasks into tiny, manageable steps\n**2. Use the 2-minute rule**: If it takes less than 2 minutes, do it now\n**3. Try the Pomodoro Technique**: Work for 25 minutes, break for 5\n**4. Eliminate distractions**: Put phone away, close unnecessary tabs\n**5. Start anywhere**: You don't have to start at the beginning\n**6. Understand why**: Are you overwhelmed? Perfectionist? Unclear on next steps?\n\n**Quick win**: Right now, spend just 2 minutes on that task you've been avoiding. Just 2 minutes!\n\nWhat task have you been putting off? Let's break it down together."
    }
    if (userMessage.includes('organize') || userMessage.includes('organized') || userMessage.includes('planning')) {
      return "Getting organized can transform your productivity! Here's a system to get started:\n\n**Daily:**\n- Morning: Review your top 3 priorities\n- Evening: Plan tomorrow (15 minutes)\n\n**Weekly:**\n- Sunday/Monday: Weekly planning session\n- Review goals and schedule tasks\n\n**Tools & Techniques:**\n1. **Brain dump**: Write everything down first\n2. **Categorize**: Work, personal, urgent, important\n3. **Time blocking**: Assign specific times for tasks\n4. **Digital tools**: Try Notion, Todoist, or Google Calendar\n5. **Physical tools**: Bullet journal, planner, or sticky notes\n\n**Remember**: The best system is one you'll actually use. Start simple!\n\nWhat area of your life needs the most organization right now?"
    }
    if (userMessage.includes('focus') || userMessage.includes('concentrate') || userMessage.includes('distracted')) {
      return "Maintaining focus is challenging in our distraction-filled world. Here's how to improve concentration:\n\n**Environmental Setup:**\n- Clear your workspace\n- Use noise-canceling headphones or focus music\n- Put phone in another room or use app blockers\n\n**Techniques:**\n1. **Time blocking**: Dedicate specific times for deep work\n2. **Single-tasking**: One thing at a time, no multitasking\n3. **Energy management**: Do hard tasks when you have most energy\n4. **Regular breaks**: Stand, stretch, look away from screen\n5. **Mindfulness**: When you notice distraction, gently return to task\n\n**Biological factors:**\n- Get enough sleep\n- Stay hydrated\n- Eat regular, balanced meals\n- Exercise regularly\n\nWhat typically distracts you most?"
    }
    return "I'm here to help you boost your productivity! I can assist with:\n\n- Time management and planning\n- Overcoming procrastination\n- Organization systems\n- Goal setting and tracking\n- Focus and concentration techniques\n- Work-life balance\n\nWhat productivity challenge are you facing right now?"
  }

  // Learning responses
  if (category === 'learning') {
    if (userMessage.includes('learn') || userMessage.includes('study') || userMessage.includes('understand')) {
      return "Effective learning is a skill you can develop! Here are proven techniques:\n\n**Active Learning Methods:**\n1. **Feynman Technique**: Explain concepts in simple terms as if teaching someone\n2. **Spaced Repetition**: Review material at increasing intervals\n3. **Practice Testing**: Quiz yourself regularly\n4. **Interleaving**: Mix different topics/skills in study sessions\n5. **Elaboration**: Connect new info to what you already know\n\n**Study Tips:**\n- Break study sessions into 25-50 minute blocks\n- Teach others what you're learning\n- Create visual aids (mind maps, diagrams)\n- Apply knowledge through projects\n- Get enough sleep (consolidates memory)\n\n**Remember**: Understanding > memorization. Focus on concepts, not just facts.\n\nWhat are you trying to learn? I can help break it down or suggest resources!"
    }
    return "I'm here to support your learning journey! I can help you:\n\n- Understand difficult concepts\n- Develop effective study strategies\n- Learn new skills\n- Find resources and learning paths\n- Stay motivated in your learning\n\nWhat would you like to learn or improve today?"
  }

  // Social & relationships responses
  if (category === 'social') {
    if (userMessage.includes('friend') || userMessage.includes('friendship')) {
      return "Friendships are vital to our wellbeing. Here's guidance on building and maintaining them:\n\n**Making Friends:**\n- Join groups around your interests (clubs, classes, sports)\n- Be genuinely curious about others\n- Show up consistently to the same places\n- Take initiative in suggesting activities\n- Be open and authentic\n\n**Maintaining Friendships:**\n- Regular check-ins (even a quick text)\n- Be there during tough times\n- Share experiences and make memories\n- Listen actively without judgment\n- Celebrate their successes\n\n**Quality Over Quantity**: A few deep connections often matter more than many surface-level ones.\n\nAre you looking to make new friends, or strengthen existing friendships?"
    }
    if (userMessage.includes('conflict') || userMessage.includes('argument') || userMessage.includes('fight')) {
      return "Conflict is a normal part of relationships. What matters is how we handle it:\n\n**Healthy Conflict Resolution:**\n1. **Cool down first**: Don't engage when emotions are high\n2. **Use 'I' statements**: 'I feel...' instead of 'You always...'\n3. **Listen to understand**: Not to respond\n4. **Find the real issue**: Often it's deeper than the surface problem\n5. **Look for compromise**: Win-win solutions\n6. **Apologize sincerely**: Take responsibility for your part\n\n**Communication Tips:**\n- Focus on the behavior, not the person\n- Avoid absolutes ('always', 'never')\n- Express your needs clearly\n- Validate their feelings\n- Take breaks if needed\n\nWhat's the situation you're dealing with? Remember, you don't have to share details if you're not comfortable."
    }
    return "Navigating relationships and social situations can be complex. I can help you with:\n\n- Building and maintaining friendships\n- Communication skills\n- Conflict resolution\n- Setting boundaries\n- Social confidence\n- Family relationships\n\nWhat social aspect would you like to explore?"
  }

  // General responses
  return "I'm here to help! I can assist you with various needs including:\n\n- Answering questions\n- Providing advice and guidance\n- Problem-solving\n- Planning and organizing\n- Learning and understanding topics\n- And much more!\n\nWhat would you like help with? Feel free to ask me anything, and I'll do my best to support you."
}
