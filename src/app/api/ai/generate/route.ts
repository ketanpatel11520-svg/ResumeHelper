import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API client safely
const apiKey = process.env.GEMINI_API_KEY || "";
const hasApiKey = !!apiKey;
const genAI = hasApiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    // Graceful fallback if API key is not configured in .env
    if (!hasApiKey || !genAI) {
      return NextResponse.json({
        success: false,
        error: "Missing GEMINI_API_KEY in server environment.",
        isMockFallback: true
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // ACTION 1: Polish a single resume bullet point
    if (action === "polish") {
      const { text, context } = body;
      const prompt = `You are an expert recruitment editor and resume consultant.
Refine the following raw statement into a professional, high-impact, ATS-optimized bullet point.
Guidelines:
- Start with a powerful action verb (e.g. Engineered, Spearheaded, Architected, Designed).
- Focus on business impact or performance metrics.
- Keep it concise, grammatically flawless, and to exactly ONE sentence.
- Do not add bullet point markers (* or -) or quotes around the output.

Context details: ${context || "Software Development"}
Raw input: "${text}"

Polished Resume Bullet Point:`;

      const response = await model.generateContent(prompt);
      const polishedText = response.response.text().trim().replace(/^["']|["']$/g, "");

      return NextResponse.json({ success: true, polishedText });
    }

    // ACTION 2: Generate professional targeted bio summary
    if (action === "summary") {
      const { title, skills } = body;
      const prompt = `You are a professional executive resume writer. 
Generate a compelling 2-3 sentence professional summary/profile objective for a candidate applying for the target position: "${title || "Software Specialist"}".
Incorporate a selection of these key skills: ${skills ? skills.slice(0, 8).join(", ") : "Modern software architectures, team collaboration"}.
Keep the tone highly professional, results-focused, and premium. Do not use generic pronouns.
Do not add quotes around the output.

Target Summary:`;

      const response = await model.generateContent(prompt);
      const summary = response.response.text().trim().replace(/^["']|["']$/g, "");

      return NextResponse.json({ success: true, summary });
    }

    // ACTION 3: Run comprehensive ATS match scanner
    if (action === "ats_scan") {
      const { resumeData, jobDescription } = body;
      const prompt = `You are an applicant tracking system (ATS) auditing engine.
Analyze the following candidate resume against the pasted target job description.

Candidate Resume Details:
- Target Position: ${resumeData.personalInfo.title}
- Skills: ${JSON.stringify((resumeData.skills as any[]).map((s: any) => s.items).flat())}
- Experience Jobs: ${JSON.stringify((resumeData.experience as any[]).map((e: any) => ({ pos: e.position, company: e.company, bullets: e.points })))}
- Projects Details: ${JSON.stringify((resumeData.projects as any[]).map((p: any) => ({ name: p.name, desc: p.description, bullets: p.points })))}

Target Job Description:
"${jobDescription}"

Based on this audit, output a JSON object containing:
1. "score": An integer between 40 and 99 representing the estimated matching index.
2. "suggestions": A string array containing 3 specific, actionable recommendations to modify the resume and improve the matching score (such as exact missing keywords to inject, or sections to expand).

Return ONLY the raw JSON block in this exact structure, with no markdown formatting around it:
{
  "score": 85,
  "suggestions": [
    "Inject keyword X into experience bullets",
    "List framework Y inside skills",
    "Expand details regarding Z"
  ]
}`;

      const response = await model.generateContent(prompt);
      const cleanText = response.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleanText);

      return NextResponse.json({
        success: true,
        score: parsed.score || 75,
        suggestions: parsed.suggestions || ["Integrate precise technical skills.", "Focus bullets on quantifiable results."]
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action type." });

  } catch (error: any) {
    console.error("AI Generation Endpoint Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "An error occurred during AI processing." 
    }, { status: 500 });
  }
}
