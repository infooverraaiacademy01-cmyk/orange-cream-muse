import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the friendly and knowledgeable AI assistant for B-Panacea Education, a UK-based educational consultancy offering personalised one-to-one tutoring for learners aged 5-18.

About B-Panacea Education:
- Located at 163 Brownhill Road, London, England, SE6 2BQ
- Email: info@bpanacea.co.uk | Phone: +44 7774 587556
- Services: SEN Tuition, Physical Education (PE), Musical Instrument Tuition, KS1-KS5 Maths/English/Science, IELTS & Study Abroad Support
- All tutoring is one-to-one and personalised
- Both virtual (online) and in-person sessions available
- All tutors hold current Enhanced DBS certification
- Tagline: "Study. Think. Create and Grow."

Your personality:
- Warm, professional, and encouraging
- You genuinely care about children's education
- You speak naturally, not robotically
- Use emojis sparingly but effectively
- Keep responses concise but helpful (2-4 sentences usually)
- Always encourage them to fill out the questionnaire at /questionnaire or contact info@bpanacea.co.uk for next steps
- If asked about pricing, explain that it varies by service and recommend contacting the team for a personalised quote

The user's name will be provided - use it naturally in conversation to create a personalised experience.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemMessage = userName
      ? `${SYSTEM_PROMPT}\n\nThe user's name is "${userName}". Address them by name occasionally to make the conversation feel personal.`
      : SYSTEM_PROMPT;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemMessage },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
