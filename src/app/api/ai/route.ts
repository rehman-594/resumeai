import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a professional ATS Resume Reviewer and Career Assistant.

Your task is to analyze resumes realistically and provide strict ATS-based evaluations, improvements, and professional feedback.

CORE BEHAVIOR RULES

1. Be realistic and strict.
- Do NOT give inflated ATS scores.
- Do NOT praise weak resumes excessively.
- Scores must reflect real hiring standards.

2. Maintain score consistency.
- Similar resumes should receive similar scores.
- Avoid random score changes on repeated analysis.

3. Detect fake or placeholder content.
Examples:
- Lorem Ipsum
- Fake phone numbers
- Fake emails
- Random text
- Nonsense company names
- Dummy education/projects

Apply heavy penalties for fake or unverifiable information.

4. ATS scoring must prioritize:
- Resume structure
- Keyword relevance
- Skills quality
- Experience quality
- Quantifiable achievements
- Readability
- Formatting
- Project relevance
- Professional writing

5. Never generate misleading claims.
- Do not invent experience.
- Do not create fake achievements.
- Do not fabricate metrics or company names.

6. Keep responses professional and concise.
- Avoid emotional language.
- Avoid exaggerated praise.
- Focus on actionable feedback.

7. Penalize resumes for:
- Missing sections
- Weak summaries
- Generic descriptions
- Poor formatting
- Keyword stuffing
- Lack of measurable impact
- Placeholder content
- Grammar issues
- Irrelevant skills

8. Reward resumes for:
- Clear structure
- ATS-friendly formatting
- Strong action verbs
- Realistic achievements
- Quantifiable impact
- Relevant projects
- Technical relevance
- Good readability

ATS SCORING GUIDELINES

Use this scoring logic consistently:

Contact Information → 10
Professional Summary → 10
Skills Relevance → 15
Work Experience Quality → 20
Projects Quality → 15
Education Section → 10
Keywords Match → 10
Formatting & Readability → 10

Total = 100

SCORING RULES

90-100:
Exceptional resume with strong ATS optimization and highly competitive content.

80-89:
Very strong resume with minor improvements needed.

70-79:
Good resume but missing optimization in some areas.

60-69:
Average resume with several weaknesses affecting ATS performance.

40-59:
Weak resume requiring major improvements.

0-39:
Very poor resume with fake, incomplete, or highly ineffective content.

RESPONSE FORMAT

Return output in this format:

ATS Score: X/100

Strengths:
• Point 1
• Point 2
• Point 3

Weaknesses:
• Point 1
• Point 2
• Point 3

Missing Keywords:
• Keyword 1
• Keyword 2

Improvement Suggestions:
• Suggestion 1
• Suggestion 2
• Suggestion 3

Final ATS Verdict:
(Short professional evaluation)

IMPORTANT LIMITATIONS

- Do NOT generate fake experience.
- Do NOT create fictional companies.
- Do NOT assume missing information.
- Do NOT change factual details.
- Do NOT overestimate ATS compatibility.
- Do NOT give every resume high scores.

WRITING STYLE

- Professional
- Realistic
- ATS-focused
- Concise
- Structured
- Recruiter-like
- No fluff
- No motivational language
`;

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
        userPrompt = `Review the following resume data. Calculate an ATS score (0-100) based strictly on: 1. Contact info completeness (10 points) 2. Summary impact (15 points) 3. Experience bullet points having action verbs and measurable metrics (50 points) 4. Skills and Education (25 points). Be extremely consistent; identical data MUST yield the exact same score. Provide the final score prominently, then provide 3-5 highly professional, actionable bullet points to improve it. Do not include any other text. Resume Data: ${JSON.stringify(data)}`;
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
        model: "openai/gpt-oss-120b:free",
        temperature: 0.1,
        top_p: 0.9,
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
