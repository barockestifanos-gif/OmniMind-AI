import { ModeConfig } from '@/types/modes';

export const modeConfigs: Record<string, ModeConfig> = {
  study: {
    id: 'study',
    name: 'Study Mode',
    description: 'AI-powered learning assistant for homework, research, and exam prep',
    icon: '📚',
    gradient: 'var(--gradient-study)',
    glowClass: 'glow-study',
    textGradientClass: 'gradient-text-study',
    systemPrompt: 'You are an expert study assistant. Help users learn effectively, explain concepts clearly, create study plans, quiz them on topics, and provide detailed explanations. Be encouraging and patient.',
    suggestions: [
      'Explain quantum physics simply',
      'Create a study plan for calculus',
      'Quiz me on world history',
      'Help me write an essay outline',
      'Summarize this chapter for me',
      'What are the key concepts in biology?'
    ],
    voiceOptions: [
      { id: 'professor', name: 'Professor', description: 'Calm and knowledgeable', pitch: 0.9, rate: 0.95 },
      { id: 'tutor', name: 'Friendly Tutor', description: 'Encouraging and patient', pitch: 1.1, rate: 1.0 },
      { id: 'scholar', name: 'Scholar', description: 'Deep and thoughtful', pitch: 0.8, rate: 0.9 },
    ]
  },
  health: {
    id: 'health',
    name: 'Health Mode',
    description: 'Wellness coach for fitness, nutrition, mental health, and healthy habits',
    icon: '🧘',
    gradient: 'var(--gradient-health)',
    glowClass: 'glow-health',
    textGradientClass: 'gradient-text-health',
    systemPrompt: 'You are a holistic health and wellness coach. Provide guidance on fitness, nutrition, mental health, sleep, and healthy lifestyle habits. Be supportive, motivating, and always encourage consulting healthcare professionals for medical concerns.',
    suggestions: [
      'Create a workout routine for me',
      'What should I eat for more energy?',
      'Help me manage stress',
      'Guide me through meditation',
      'How can I improve my sleep?',
      'Track my fitness goals'
    ],
    voiceOptions: [
      { id: 'coach', name: 'Wellness Coach', description: 'Motivating and energetic', pitch: 1.1, rate: 1.05 },
      { id: 'zen', name: 'Zen Guide', description: 'Calm and soothing', pitch: 0.95, rate: 0.85 },
      { id: 'trainer', name: 'Personal Trainer', description: 'Energetic and pumped', pitch: 1.2, rate: 1.1 },
    ]
  },
  business: {
    id: 'business',
    name: 'Business Mode',
    description: 'Strategic advisor for startups, marketing, finance, and business growth',
    icon: '💼',
    gradient: 'var(--gradient-business)',
    glowClass: 'glow-business',
    textGradientClass: 'gradient-text-business',
    systemPrompt: 'You are a seasoned business strategist and advisor. Help with business planning, marketing strategies, financial analysis, startup guidance, and professional communication. Be direct, insightful, and data-driven.',
    suggestions: [
      'Write a business plan outline',
      'Help me with my pitch deck',
      'Analyze my marketing strategy',
      'Draft a professional email',
      'Calculate ROI for my project',
      'Brainstorm business ideas'
    ],
    voiceOptions: [
      { id: 'executive', name: 'Executive', description: 'Professional and confident', pitch: 0.9, rate: 1.0 },
      { id: 'consultant', name: 'Consultant', description: 'Analytical and clear', pitch: 1.0, rate: 1.05 },
      { id: 'mentor', name: 'Business Mentor', description: 'Wise and experienced', pitch: 0.85, rate: 0.95 },
    ]
  },
  management: {
    id: 'management',
    name: 'Management Mode',
    description: 'Productivity assistant for tasks, projects, time management, and goals',
    icon: '📊',
    gradient: 'var(--gradient-management)',
    glowClass: 'glow-management',
    textGradientClass: 'gradient-text-management',
    systemPrompt: 'You are a productivity and project management expert. Help users organize tasks, manage time effectively, set and track goals, prioritize work, and build efficient systems. Be practical, organized, and action-oriented.',
    suggestions: [
      'Organize my daily schedule',
      'Create a project timeline',
      'Help me prioritize tasks',
      'Set SMART goals with me',
      'Review my weekly progress',
      'Build a productivity system'
    ],
    voiceOptions: [
      { id: 'assistant', name: 'Personal Assistant', description: 'Efficient and helpful', pitch: 1.05, rate: 1.1 },
      { id: 'manager', name: 'Project Manager', description: 'Organized and direct', pitch: 1.0, rate: 1.0 },
      { id: 'planner', name: 'Life Planner', description: 'Thoughtful and strategic', pitch: 0.95, rate: 0.95 },
    ]
  },
  amharic: {
    id: 'amharic',
    name: 'አማርኛ Mode',
    description: 'AI assistant that communicates fluently in Amharic (አማርኛ)',
    icon: '🇪🇹',
    gradient: 'var(--gradient-amharic)',
    glowClass: 'glow-amharic',
    textGradientClass: 'gradient-text-amharic',
    systemPrompt: 'You are a helpful AI assistant that ALWAYS responds in Amharic (አማርኛ). No matter what language the user writes in, you must respond exclusively in Amharic script. Be friendly, helpful, and knowledgeable about Ethiopian culture, history, and current affairs. You can help with any topic - education, health, business, daily life - but always respond in Amharic.',
    suggestions: [
      'ስለ ኢትዮጵያ ታሪክ ንገረኝ',
      'አማርኛ መማር እፈልጋለሁ',
      'ዛሬ ምን ልሥራ?',
      'ስለ ጤና ምክር ስጠኝ',
      'የንግድ ሀሳብ አስፈልገኛል',
      'ስለ ባህላችን አስረዳኝ'
    ],
    voiceOptions: [
      { id: 'native', name: 'Native Speaker', description: 'Natural Amharic speaker', pitch: 1.0, rate: 0.95 },
      { id: 'teacher', name: 'Teacher', description: 'Clear and educational', pitch: 1.05, rate: 0.9 },
      { id: 'storyteller', name: 'Storyteller', description: 'Warm and expressive', pitch: 0.95, rate: 0.85 },
    ]
  }
};

export const getModeConfig = (mode: string): ModeConfig => {
  return modeConfigs[mode] || modeConfigs.study;
};
