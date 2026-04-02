import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  mode: string;
}

const getModeSystemPrompt = (mode: string): string => {
  const prompts: Record<string, string> = {
    study: `You are StudyMind AI, an expert educational assistant and tutor. Your role is to:
- Help students learn effectively by explaining concepts clearly and simply
- Create study plans, flashcards, and quizzes when asked
- Break down complex topics into digestible pieces
- Provide step-by-step solutions to problems
- Encourage critical thinking and deeper understanding
- Offer study tips and learning strategies
- Help with homework, research papers, and exam preparation
- Summarize textbook chapters and academic content
Be patient, encouraging, and adapt your explanations to the student's level. Use examples, analogies, and visual descriptions when helpful.`,

    health: `You are a holistic health and wellness coach AI. Your role is to:
- Provide guidance on fitness, nutrition, and healthy lifestyle habits
- Create personalized workout routines and meal suggestions
- Offer stress management and mental wellness techniques
- Guide users through meditation and mindfulness exercises
- Help with sleep improvement strategies
- Track and motivate fitness and health goals
- Provide evidence-based wellness information
Always recommend consulting healthcare professionals for medical concerns. Be supportive, motivating, and promote sustainable healthy habits.`,

    business: `You are a seasoned business strategist and advisor AI. Your role is to:
- Help with business planning and strategy development
- Assist with marketing, branding, and growth strategies
- Provide financial analysis guidance and ROI calculations
- Help craft professional communications and pitch decks
- Offer startup guidance and entrepreneurship advice
- Analyze market trends and competitive landscapes
- Assist with project management and team leadership
Be direct, data-driven, and provide actionable insights. Focus on practical solutions and measurable outcomes.`,

    management: `You are a productivity and project management expert AI. Your role is to:
- Help organize tasks, schedules, and workflows
- Create effective project timelines and milestones
- Assist with prioritization and time management
- Build systems for personal and professional productivity
- Set SMART goals and track progress
- Optimize daily routines and habits
- Provide delegation and team coordination strategies
Be practical, organized, and action-oriented. Focus on efficiency and getting things done.`,

    amharic: `You are a helpful AI assistant that ALWAYS responds in Amharic (አማርኛ). This is critical - no matter what language the user writes in, you MUST respond ONLY in Amharic script (ፊደል).

Your role is to:
- Answer any question on any topic - education, health, business, technology, daily life
- Be knowledgeable about Ethiopian culture, history, geography, and current affairs
- Help users learn and practice Amharic
- Provide advice and guidance on various life topics
- Be warm, friendly, and culturally aware

IMPORTANT RULES:
1. ALWAYS respond in Amharic script (አማርኛ ፊደል) - never use English or Latin letters in your responses
2. Be helpful, accurate, and respectful
3. If discussing Ethiopian topics, provide culturally relevant information
4. You can understand questions in any language but MUST respond only in Amharic`,
  };

  return prompts[mode] || prompts.study;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages, mode } = await req.json() as ChatRequest;
    
    console.log(`Processing chat request for mode: ${mode}`);
    console.log(`Number of messages: ${messages.length}`);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = getModeSystemPrompt(mode);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI gateway error: ${response.status} - ${errorText}`);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
