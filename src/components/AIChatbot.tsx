"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Bot, User, X, Sparkles } from "lucide-react";
import { ResumeData } from "../utils/resumeMock";

interface AIChatbotProps {
  resumeData: ResumeData;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatbot({ resumeData }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I am your AI Career Assistant. 🤖\n\nI can analyze your current resume draft (for ${resumeData.personalInfo.fullName || "your target role"}) and give you suggestions on bullet points, ATS formatting, or missing keywords.\n\nWhat would you like assistance with today?`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          resumeData: resumeData,
          history: messages.slice(-6) // Send recent context history
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        // High fidelity custom mock fallback based on input context
        let reply = "I am processing your resume data. To unlock full live AI analysis, please supply a GEMINI_API_KEY inside your .env environment configurations.";
        
        const lower = textToSend.toLowerCase();
        if (lower.includes("experience") || lower.includes("job") || lower.includes("work")) {
          reply = "🔍 **ATS Review - Experience Section**:\n\nYour experience section looks highly detailed! However, standard recruiting engines favor measurable outcomes. Ensure each bullet follows the formula: **[Action Verb] + [Technical Implementation] = [Quantifiable Business Latency/Throughput Metric]**.\n\n*Example:* 'Architected GraphQL resolvers using Node.js, slashing state retrieval latency by 24% across 12k concurrent clients.'";
        } else if (lower.includes("skills") || lower.includes("technolog")) {
          reply = "💡 **Skills Categorization Review**:\n\nTo pass automated parsing filters, separate your core skills into transparent subgroups like **Languages**, **Frameworks**, and **Developer Tools/Cloud**. Try to align your stack directly with job description keywords to boost overall search optimization indexes.";
        } else if (lower.includes("project")) {
          reply = "🛠️ **Projects Optimization Tips**:\n\nSince recruiters scan projects to inspect hands-on architectural skills, highlight the specific dev constraints you overcame (e.g. managing multi-threading, concurrency, low WebGL framerates). List the exact framework names alongside project titles so parsers read them correctly.";
        }
        
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error contacting Career Server. Verify local service runs correctly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  // Quick Action triggers
  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-purple-650 hover:from-cyan-400 hover:to-purple-550 text-white rounded-full p-4 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-105 select-none no-print border border-cyan-400/20"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
        <span className="absolute -top-1 -left-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </span>
      </button>

      {/* Floating Panel Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] z-50 glass-panel border border-cyan-500/25 shadow-[0_15px_45px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden no-print animate-fade-in">
          
          {/* Cyber Title Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#17142b] to-[#25153b] border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-cyan-500/10 p-1.5 rounded-full border border-cyan-500/30">
                <Bot size={18} className="text-cyan-400 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xs text-white uppercase tracking-wider">AI Resume Copilot</h3>
                <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 inline-block animate-pulse"></span>
                  Active Career Guide
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 bg-[#0b0a13]/80">
            {messages.map((m, idx) => (
              <div 
                key={idx}
                className={`flex gap-2.5 max-w-[85%] ${m.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}
              >
                <div className={`p-1.5 rounded-full border h-8 w-8 flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-purple-950/20 border-purple-500/20 text-purple-400" : "bg-cyan-950/20 border-cyan-500/20 text-cyan-400"}`}>
                  {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`rounded-xl px-3.5 py-2.5 text-[12px] leading-relaxed break-words whitespace-pre-wrap ${m.role === "user" ? "bg-purple-650/80 border border-purple-500/20 text-white rounded-tr-none" : "bg-[#181630] border border-cyan-500/15 text-gray-200 rounded-tl-none shadow-sm"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5 self-start items-center">
                <div className="p-1.5 rounded-full bg-cyan-950/20 border border-cyan-500/20 text-cyan-400 h-8 w-8 flex items-center justify-center shrink-0">
                  <Bot size={14} className="animate-spin" />
                </div>
                <div className="bg-[#181630] border border-cyan-500/15 text-gray-400 rounded-xl rounded-tl-none px-3.5 py-2 text-[12px]">
                  Synthesizing coaching response...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-4 py-2 border-t border-white/5 bg-[#0a0910] flex flex-wrap gap-1.5 overflow-x-auto shrink-0 select-none">
            <button
              onClick={() => handleQuickAction("Can you review my experience section for ATS optimization?")}
              className="text-[10px] bg-cyan-950/30 hover:bg-cyan-900/50 border border-cyan-500/20 px-2 py-0.5 rounded-full text-cyan-300 transition"
            >
              🚀 Review Jobs
            </button>
            <button
              onClick={() => handleQuickAction("Suggest skills I should add based on my full stack profile.")}
              className="text-[10px] bg-purple-950/30 hover:bg-purple-900/50 border border-purple-500/20 px-2 py-0.5 rounded-full text-purple-300 transition"
            >
              💡 Skills Advise
            </button>
            <button
              onClick={() => handleQuickAction("What are some strong project points for Next.js?")}
              className="text-[10px] bg-gray-900 hover:bg-gray-800 border border-white/5 px-2 py-0.5 rounded-full text-gray-300 transition"
            >
              🛠️ Project Tips
            </button>
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-white/5 bg-[#0a0812] flex gap-2 items-center shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask the Career Coach..."
              className="flex-1 bg-[#151326] border border-cyan-500/15 rounded-lg px-3.5 py-2 text-[12px] text-white focus:outline-none focus:border-cyan-400 transition"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="bg-cyan-550 hover:bg-cyan-500 disabled:opacity-40 text-white rounded-lg p-2 transition flex items-center justify-center shrink-0"
            >
              <Send size={15} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
