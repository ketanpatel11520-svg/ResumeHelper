import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini safely
const apiKey = process.env.GEMINI_API_KEY || "";
const hasApiKey = !!apiKey;
const genAI = hasApiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, resumeData, history } = body;

    // Graceful fallback if API key is not configured in .env
    if (!hasApiKey || !genAI) {
      return NextResponse.json({
        success: false,
        error: "Missing GEMINI_API_KEY in server environment.",
        isMockFallback: true
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format chat history context string
    const historyContext = history && history.length > 0 
      ? history.map((h: any) => `${h.role === 'user' ? 'Candidate' : 'Coach'}: ${h.content}`).join("\n")
      : "No previous messages.";

    const prompt = `You are "AI Resume Copilot", an elite recruiter and executive career coach.
Your mission is to provide specific, highly constructive, and granularly actionable advice to help the candidate elevate their resume.
You have full access to their active resume draft:

Candidate Profile:
- Full Name: ${resumeData.personalInfo.fullName}
- Target Title: ${resumeData.personalInfo.title}
- Personal Info Details: ${JSON.stringify(resumeData.personalInfo)}
- Education History: ${JSON.stringify(resumeData.education)}
- Professional Experience: ${JSON.stringify(resumeData.experience)}
- Projects Portfolio: ${JSON.stringify(resumeData.projects)}
- Technical Skills: ${JSON.stringify(resumeData.skills)}
- Certifications / Optional: ${JSON.stringify({ certs: resumeData.certifications, achievements: resumeData.achievements, langs: resumeData.languages })}

Context Chat History:
${historyContext}

Candidate Question: "${message}"

Please respond directly to their question.
Rules:
- Provide specific, concrete examples. If suggesting a change, write the EXACT improved sentence or bullet.
- Focus on ATS optimization, action verbs, and quantifiable impact.
- Structure your response using clean, bold markdown bullet points.
- Keep the tone highly encouraging, professional, and razor-sharp.
- Limit the response to 3 short paragraphs maximum to maintain dashboard readability.

Coach Response:`;

    const response = await model.generateContent(prompt);
    const reply = response.response.text().trim();

    return NextResponse.json({ success: true, reply });

  } catch (error: any) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "An error occurred during conversational AI processing." 
    }, { status: 500 });
  }
}
