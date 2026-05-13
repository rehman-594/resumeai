import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an expert ATS Resume Coach and Career Advisor. 
Your ONLY purpose is to help users improve their resumes, CVs, and professional profiles.
You MUST follow these strict rules:
1. ONLY answer questions or perform tasks related to resumes, CVs, job applications, cover letters, and career advice.
2. If the user asks about anything unrelated (coding general logic, history, math, random chat), politely decline and remind them you are a Resume AI.
3. Keep your responses concise, professional, and directly useful for a resume. Do not use markdown headers unless necessary.
4. For bullet points, start with strong action verbs and focus on quantifiable achievements.
5. Provide responses in plain text or simple markdown formatting that can be directly pasted into a text area.`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, data, apiKey } = body;

    let userPrompt = "";

    switch (action) {
      case "generate_summary":
        userPrompt = `Write a professional resume summary for a candidate with the following details. Keep it punchy, around 3-4 sentences. Do not use bullet points. Here is the data: ${JSON.stringify(data)}`;
        break;
      case "enhance_experience":
        userPrompt = `Enhance the following work experience for a resume. The job title is "${data.position}" at "${data.company}". Current description: "${data.description}". Provide 3-5 professional, ATS-optimized bullet points focusing on impact and results. Only return the bullet points.`;
        break;
      case "suggest_skills":
        userPrompt = `Based on the following experience/job titles: "${data.experience}", suggest 10-15 highly relevant professional skills (mix of hard and soft skills). Return them as a comma-separated list only, nothing else.`;
        break;
      case "review_resume":
        userPrompt = `Review the following resume data. Provide a brief overall ATS score out of 100, and 3-5 specific, actionable bullet points on how to improve it. Resume Data: ${JSON.stringify(data)}`;
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const API_KEY = process.env.OPENROUTER_API_KEY || apiKey;

    if (!API_KEY) {
      return NextResponse.json({ error: "API Key is missing" }, { status: 401 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/free", // Using the auto-routing free model
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter Error:", errorData);
      return NextResponse.json({ error: "Failed to generate AI response." }, { status: response.status });
    }

    const responseData = await response.json();
    const text = responseData.choices[0]?.message?.content || "";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
