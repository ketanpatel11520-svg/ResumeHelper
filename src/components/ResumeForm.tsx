"use client";

import React, { useState } from "react";
import {
  User, BookOpen, Briefcase, Code, Award, Shield,
  Languages, Compass, MessageSquare, ChevronDown, ChevronUp,
  Plus, Trash2, Sparkles, ArrowUp, ArrowDown, HelpCircle, FileText
} from "lucide-react";
import { ResumeData, SkillCategory } from "@/utils/resumeMock";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (updatedData: ResumeData) => void;
  onAiPolish: (text: string, context: string, callback: (polishedText: string) => void) => void;
  onAiGenerateSummary: (title: string, skills: string[], callback: (summary: string) => void) => void;
  isAiLoading: boolean;
}

export default function ResumeForm({
  data,
  onChange,
  onAiPolish,
  onAiGenerateSummary,
  isAiLoading
}: ResumeFormProps) {
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [atsScoreResult, setAtsScoreResult] = useState<{ score: number; suggestions: string[] } | null>(null);
  const [isAtsLoading, setIsAtsLoading] = useState<boolean>(false);

  const p = data.personalInfo;

  // Helper: toggle active accordion section
  const toggleTab = (tab: string) => {
    setActiveTab(activeTab === tab ? "" : tab);
  };

  // State Updaters
  const updatePersonalInfo = (field: string, value: string) => {
    const updated = {
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    };
    onChange(updated);
  };

  const updateListItem = (section: "education" | "experience" | "projects" | "certifications" | "achievements" | "languages" | "references", id: string, field: string, value: any) => {
    const list = data[section] as any[];
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, [section]: updatedList });
  };

  const addListItem = (section: "education" | "experience" | "projects" | "certifications" | "achievements" | "languages" | "references") => {
    const list = data[section] as any[];
    let newItem: any = { id: `${section}-${Date.now()}` };

    if (section === "education") {
      newItem = { ...newItem, institution: "", degree: "", fieldOfStudy: "", location: "", gpa: "", startDate: "", endDate: "", description: "" };
    } else if (section === "experience") {
      newItem = { ...newItem, company: "", position: "", location: "", startDate: "", endDate: "", points: ["Engaged in core business activities."] };
    } else if (section === "projects") {
      newItem = { ...newItem, name: "", description: "", technologies: [], url: "", points: ["Built first version of the system."] };
    } else if (section === "certifications") {
      newItem = { ...newItem, name: "", issuer: "", date: "", url: "" };
    } else if (section === "achievements") {
      newItem = { ...newItem, title: "", description: "", date: "" };
    } else if (section === "languages") {
      newItem = { ...newItem, name: "", proficiency: "Professional Working" };
    } else if (section === "references") {
      newItem = { ...newItem, name: "", title: "", company: "", contact: "" };
    }

    onChange({ ...data, [section]: [...list, newItem] });
  };

  const removeListItem = (section: "education" | "experience" | "projects" | "certifications" | "achievements" | "languages" | "references", id: string) => {
    const list = data[section] as any[];
    const updatedList = list.filter((item) => item.id !== id);
    onChange({ ...data, [section]: updatedList });
  };

  // Bullet Point Updaters (for Jobs and Projects)
  const addBulletPoint = (section: "experience" | "projects", itemId: string) => {
    const list = data[section] as any[];
    const updatedList = list.map((item) => {
      if (item.id === itemId) {
        return { ...item, points: [...item.points, "New accomplishment bullet point."] };
      }
      return item;
    });
    onChange({ ...data, [section]: updatedList });
  };

  const removeBulletPoint = (section: "experience" | "projects", itemId: string, index: number) => {
    const list = data[section] as any[];
    const updatedList = list.map((item) => {
      if (item.id === itemId) {
        const pts = [...item.points];
        pts.splice(index, 1);
        return { ...item, points: pts };
      }
      return item;
    });
    onChange({ ...data, [section]: updatedList });
  };

  const updateBulletPoint = (section: "experience" | "projects", itemId: string, index: number, value: string) => {
    const list = data[section] as any[];
    const updatedList = list.map((item) => {
      if (item.id === itemId) {
        const pts = [...item.points];
        pts[index] = value;
        return { ...item, points: pts };
      }
      return item;
    });
    onChange({ ...data, [section]: updatedList });
  };

  // Skills Updaters
  const updateSkillCategory = (id: string, field: string, value: string) => {
    const updated = data.skills.map((s) =>
      s.id === id ? { ...s, [field]: value } : s
    );
    onChange({ ...data, skills: updated });
  };

  const updateSkillItems = (id: string, itemsStr: string) => {
    const updated = data.skills.map((s) =>
      s.id === id ? { ...s, items: itemsStr.split(",").map(i => i.trim()).filter(Boolean) } : s
    );
    onChange({ ...data, skills: updated });
  };

  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      id: `skill-${Date.now()}`,
      category: "New Skill Group",
      items: ["Skill A", "Skill B"]
    };
    onChange({ ...data, skills: [...data.skills, newCat] });
  };

  const removeSkillCategory = (id: string) => {
    const updated = data.skills.filter((s) => s.id !== id);
    onChange({ ...data, skills: updated });
  };

  // Section Re-ordering
  const moveSection = (index: number, direction: "up" | "down") => {
    const order = [...data.sectionOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= order.length) return;

    // Swap sections
    const temp = order[index];
    order[index] = order[targetIndex];
    order[targetIndex] = temp;

    onChange({ ...data, sectionOrder: order });
  };

  // Optional string items (Interests)
  const updateInterests = (interestsStr: string) => {
    onChange({
      ...data,
      interests: interestsStr.split(",").map(i => i.trim()).filter(Boolean)
    });
  };

  const updateExtracurriculars = (str: string) => {
    onChange({
      ...data,
      extracurriculars: str.split(",").map(i => i.trim()).filter(Boolean)
    });
  };

  const updateObjective = (value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, objective: value }
    });
  };

  // ATS Keyword analysis
  const runAtsScan = async () => {
    if (!jobDescription.trim()) return;
    setIsAtsLoading(true);
    setAtsScoreResult(null);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ats_scan",
          resumeData: data,
          jobDescription: jobDescription
        })
      });

      const result = await response.json();
      if (result.success) {
        setAtsScoreResult({
          score: result.score,
          suggestions: result.suggestions
        });
      } else {
        // Fallback mock assessment
        const mockKeywords = jobDescription.toLowerCase().match(/\b(react|next\.js|typescript|go|docker|kubernetes|aws|python|node\.js|agile|ci\/cd)\b/g) || [];
        const matchingKeywords = Array.from(new Set(mockKeywords));
        const score = Math.min(45 + matchingKeywords.length * 8, 98);
        setAtsScoreResult({
          score: score,
          suggestions: [
            "Integrate more explicit mentions of methodologies mentioned in the description.",
            "Enrich skills section with precise tools referenced (e.g. Docker, AWS) to pass automated semantic parsing checks.",
            "Verify dates formatting matches the standard YYYY-MM structures."
          ]
        });
      }
    } catch (err) {
      setAtsScoreResult({
        score: 72,
        suggestions: ["Failed to contact AI parser. Ensure your GEMINI_API_KEY is configured in .env."]
      });
    } finally {
      setIsAtsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 text-sm pb-10">

      {/* 1. PERSONAL INFORMATION CARD */}
      <div className="glass-panel overflow-hidden">
        <button
          onClick={() => toggleTab("personal")}
          className="w-full px-5 py-4 flex justify-between items-center text-left font-display font-bold text-base hover:bg-white/5 transition-all text-white"
        >
          <span className="flex items-center gap-3 text-cyan-400">
            <User size={18} />
            Personal Information
          </span>
          {activeTab === "personal" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {activeTab === "personal" && (
          <div className="px-5 pb-5 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 bg-[#0e0c1f]/40">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Full Name</label>
              <input
                type="text"
                value={p.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                className="w-full bg-[#1b1931] border border-cyan-500/25 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="Karan Patel"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Target Job Title</label>
              <input
                type="text"
                value={p.title}
                onChange={(e) => updatePersonalInfo("title", e.target.value)}
                className="w-full bg-[#1b1931] border border-cyan-500/25 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="Senior Full Stack Engineer"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Email Address</label>
              <input
                type="email"
                value={p.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                className="w-full bg-[#1b1931] border border-cyan-500/25 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="karan@kpatel.dev"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Phone Number</label>
              <input
                type="text"
                value={p.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                className="w-full bg-[#1b1931] border border-cyan-500/25 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="+1 (555) 321-7654"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Location</label>
              <input
                type="text"
                value={p.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                className="w-full bg-[#1b1931] border border-cyan-500/25 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Website / Portfolio</label>
              <input
                type="text"
                value={p.website}
                onChange={(e) => updatePersonalInfo("website", e.target.value)}
                className="w-full bg-[#1b1931] border border-cyan-500/25 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="https://kpatel.dev"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">GitHub Profile (URL)</label>
              <input
                type="text"
                value={p.github}
                onChange={(e) => updatePersonalInfo("github", e.target.value)}
                className="w-full bg-[#1b1931] border border-cyan-500/25 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="github.com/kpatel-dev"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">LinkedIn Profile (URL)</label>
              <input
                type="text"
                value={p.linkedin}
                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                className="w-full bg-[#1b1931] border border-cyan-500/25 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="linkedin.com/in/kpatel-dev"
              />
            </div>

            {/* Career Objective */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Career Objective / Summary</label>
              <textarea
                value={data.personalInfo.objective}
                onChange={(e) => updateObjective(e.target.value)}
                className="w-full bg-[#1b1931] border border-cyan-500/25 rounded px-3 py-2 text-white text-[12px] focus:outline-none focus:border-cyan-400 transition min-h-[60px]"
                placeholder="Motivated computer science student with a strong foundation..."
                rows={2}
              />
            </div>

            {/* AI Bio Generator */}
            <div className="col-span-1 md:col-span-2 pt-3 mt-2 border-t border-white/5 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-300 font-semibold flex items-center gap-1.5">
                  <Sparkles size={14} className="text-purple-400 animate-pulse" />
                  AI Summary Autogenerator
                </span>
                <button
                  type="button"
                  disabled={isAiLoading || !p.title}
                  onClick={() => {
                    const sks = data.skills.map(s => s.items).flat();
                    onAiGenerateSummary(p.title, sks, (summary) => {
                      updatePersonalInfo("title", p.title);
                      // Custom alert or automatically inject
                      alert(`AI Generated Suggestion:\n\n"${summary}"\n\nYou can use this in your targeted custom objectives or job summaries!`);
                    });
                  }}
                  className="bg-purple-650 hover:bg-purple-600 disabled:opacity-50 text-white text-[11px] px-2.5 py-1 rounded font-semibold transition flex items-center gap-1"
                >
                  {isAiLoading ? "Synthesizing..." : "Synthesize Bio"}
                </button>
              </div>
              <p className="text-[11px] text-gray-400">Creates a high-impact profile objective statement tailored to target title: <strong>{p.title || "Not Specified"}</strong>.</p>
            </div>
          </div>
        )}
      </div>

      {/* 2. EDUCATION CARD */}
      <div className="glass-panel overflow-hidden">
        <button
          onClick={() => toggleTab("education")}
          className="w-full px-5 py-4 flex justify-between items-center text-left font-display font-bold text-base hover:bg-white/5 transition-all text-white"
        >
          <span className="flex items-center gap-3 text-cyan-400">
            <BookOpen size={18} />
            Education
          </span>
          {activeTab === "education" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {activeTab === "education" && (
          <div className="px-5 pb-5 pt-2 flex flex-col gap-4 border-t border-white/5 bg-[#0e0c1f]/40">
            {data.education.map((edu, idx) => (
              <div key={edu.id} className="p-4 rounded border border-white/5 bg-[#17142b]/60 relative flex flex-col gap-3">
                <button
                  onClick={() => removeListItem("education", edu.id)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition"
                  title="Remove Education"
                >
                  <Trash2 size={15} />
                </button>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Entry #{idx + 1}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Institution Name</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateListItem("education", edu.id, "institution", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="University of California, Berkeley"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Location</label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateListItem("education", edu.id, "location", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="Berkeley, CA"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateListItem("education", edu.id, "degree", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Field of Study</label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateListItem("education", edu.id, "fieldOfStudy", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Start Date</label>
                    <input
                      type="text"
                      value={edu.startDate}
                      onChange={(e) => updateListItem("education", edu.id, "startDate", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="2018-09"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">End Date (or Expected)</label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => updateListItem("education", edu.id, "endDate", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="2022-05"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">GPA / Achievements score</label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => updateListItem("education", edu.id, "gpa", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="3.85 / 4.0"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Description / Details</label>
                    <input
                      type="text"
                      value={edu.description}
                      onChange={(e) => updateListItem("education", edu.id, "description", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="Scholarships, notable clubs, course specifics"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => addListItem("education")}
              className="mt-2 border border-dashed border-cyan-500/40 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-500/5 py-2.5 rounded transition flex items-center justify-center gap-1.5 font-semibold"
            >
              <Plus size={16} />
              Add Education Level
            </button>
          </div>
        )}
      </div>

      {/* 3. EXPERIENCE CARD */}
      <div className="glass-panel overflow-hidden">
        <button
          onClick={() => toggleTab("experience")}
          className="w-full px-5 py-4 flex justify-between items-center text-left font-display font-bold text-base hover:bg-white/5 transition-all text-white"
        >
          <span className="flex items-center gap-3 text-cyan-400">
            <Briefcase size={18} />
            Professional Experience
          </span>
          {activeTab === "experience" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {activeTab === "experience" && (
          <div className="px-5 pb-5 pt-2 flex flex-col gap-4 border-t border-white/5 bg-[#0e0c1f]/40">
            {data.experience.map((exp, idx) => (
              <div key={exp.id} className="p-4 rounded border border-white/5 bg-[#17142b]/60 relative flex flex-col gap-3">
                <button
                  onClick={() => removeListItem("experience", exp.id)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition"
                  title="Remove Job"
                >
                  <Trash2 size={15} />
                </button>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Job #{idx + 1}</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Company Name</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateListItem("experience", exp.id, "company", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="Synthetix AI Systems"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Position / Title</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateListItem("experience", exp.id, "position", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="Lead Full Stack Developer"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Job Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateListItem("experience", exp.id, "location", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateListItem("experience", exp.id, "startDate", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="2024-06"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">End Date</label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => updateListItem("experience", exp.id, "endDate", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="Present"
                    />
                  </div>
                </div>

                {/* Job Bullet Points */}
                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-[10px] text-gray-400 font-bold uppercase flex items-center justify-between">
                    <span>Impact & Accomplishment Bullet Points</span>
                    <span className="text-[9px] text-gray-400 lowercase not-italic flex items-center gap-1 font-normal">
                      <Sparkles size={11} className="text-purple-400" />
                      Tip: click sparkle icons to polish a line with AI
                    </span>
                  </label>

                  {exp.points.map((pt, ptIdx) => (
                    <div key={ptIdx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => updateBulletPoint("experience", exp.id, ptIdx, e.target.value)}
                        className="flex-1 bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white text-[12.5px]"
                        placeholder="Polished impact bullet detailing exact tech, metric, and corporate achievement."
                      />

                      {/* AI Bullet Enhancer Button */}
                      <button
                        type="button"
                        disabled={isAiLoading || !pt.trim()}
                        onClick={() => {
                          onAiPolish(pt, `Job position: ${exp.position} at ${exp.company}. Focus on action verbs, ATS keywords, and measurable results.`, (polished) => {
                            updateBulletPoint("experience", exp.id, ptIdx, polished);
                          });
                        }}
                        className="p-1.5 bg-purple-650 hover:bg-purple-600 disabled:opacity-50 text-white rounded transition"
                        title="Polish bullet with AI"
                      >
                        <Sparkles size={14} className={isAiLoading ? "animate-spin" : ""} />
                      </button>

                      <button
                        onClick={() => removeBulletPoint("experience", exp.id, ptIdx)}
                        className="p-1.5 text-red-400 hover:text-red-300 transition"
                        title="Delete Bullet"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addBulletPoint("experience", exp.id)}
                    className="mt-1 max-w-max self-start text-[11.5px] border border-dashed border-cyan-500/20 hover:border-cyan-500/60 px-3 py-1 rounded text-cyan-400 transition flex items-center gap-1"
                  >
                    <Plus size={13} />
                    Add Job Bullet Point
                  </button>
                </div>

              </div>
            ))}
            <button
              onClick={() => addListItem("experience")}
              className="mt-2 border border-dashed border-cyan-500/40 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-500/5 py-2.5 rounded transition flex items-center justify-center gap-1.5 font-semibold"
            >
              <Plus size={16} />
              Add Professional Job Position
            </button>
          </div>
        )}
      </div>

      {/* 4. PROJECTS CARD */}
      <div className="glass-panel overflow-hidden">
        <button
          onClick={() => toggleTab("projects")}
          className="w-full px-5 py-4 flex justify-between items-center text-left font-display font-bold text-base hover:bg-white/5 transition-all text-white"
        >
          <span className="flex items-center gap-3 text-cyan-400">
            <Code size={18} />
            Featured Projects
          </span>
          {activeTab === "projects" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {activeTab === "projects" && (
          <div className="px-5 pb-5 pt-2 flex flex-col gap-4 border-t border-white/5 bg-[#0e0c1f]/40">
            {data.projects.map((proj, idx) => (
              <div key={proj.id} className="p-4 rounded border border-white/5 bg-[#17142b]/60 relative flex flex-col gap-3">
                <button
                  onClick={() => removeListItem("projects", proj.id)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition"
                  title="Remove Project"
                >
                  <Trash2 size={15} />
                </button>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Project #{idx + 1}</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Project Name</label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateListItem("projects", proj.id, "name", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="QuantMatrix.io"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Project URL / Links</label>
                    <input
                      type="text"
                      value={proj.url}
                      onChange={(e) => updateListItem("projects", proj.id, "url", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="https://quantmatrix.io"
                    />
                  </div>
                  <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Technologies Used (comma separated)</label>
                    <input
                      type="text"
                      value={proj.technologies.join(", ")}
                      onChange={(e) => updateListItem("projects", proj.id, "technologies", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="React, Three.js, Node.js"
                    />
                  </div>
                  <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Overview description</label>
                    <input
                      type="text"
                      value={proj.description}
                      onChange={(e) => updateListItem("projects", proj.id, "description", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="High-fidelity WebGL monitoring dashboard providing simulations..."
                    />
                  </div>
                </div>

                {/* Project Bullet Points */}
                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-[10px] text-gray-400 font-bold uppercase">Key Milestones & Architectural Accomplishments</label>

                  {proj.points.map((pt, ptIdx) => (
                    <div key={ptIdx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => updateBulletPoint("projects", proj.id, ptIdx, e.target.value)}
                        className="flex-1 bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white text-[12.5px]"
                        placeholder="Built custom pipelines achieving 40% computation efficiency improvements..."
                      />

                      {/* AI Bullet Enhancer Button */}
                      <button
                        type="button"
                        disabled={isAiLoading || !pt.trim()}
                        onClick={() => {
                          onAiPolish(pt, `Project name: ${proj.name} utilizing ${proj.technologies.join(", ")}. Elevate vocabulary, maximize impact metrics.`, (polished) => {
                            updateBulletPoint("projects", proj.id, ptIdx, polished);
                          });
                        }}
                        className="p-1.5 bg-purple-650 hover:bg-purple-600 disabled:opacity-50 text-white rounded transition"
                        title="Polish bullet with AI"
                      >
                        <Sparkles size={14} className={isAiLoading ? "animate-spin" : ""} />
                      </button>

                      <button
                        onClick={() => removeBulletPoint("projects", proj.id, ptIdx)}
                        className="p-1.5 text-red-400 hover:text-red-300 transition"
                        title="Delete Bullet"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addBulletPoint("projects", proj.id)}
                    className="mt-1 max-w-max self-start text-[11.5px] border border-dashed border-cyan-500/20 hover:border-cyan-500/60 px-3 py-1 rounded text-cyan-400 transition flex items-center gap-1"
                  >
                    <Plus size={13} />
                    Add Project Accomplishment
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => addListItem("projects")}
              className="mt-2 border border-dashed border-cyan-500/40 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-500/5 py-2.5 rounded transition flex items-center justify-center gap-1.5 font-semibold"
            >
              <Plus size={16} />
              Add Project Record
            </button>
          </div>
        )}
      </div>

      {/* 5. SKILLS CARD */}
      <div className="glass-panel overflow-hidden">
        <button
          onClick={() => toggleTab("skills")}
          className="w-full px-5 py-4 flex justify-between items-center text-left font-display font-bold text-base hover:bg-white/5 transition-all text-white"
        >
          <span className="flex items-center gap-3 text-cyan-400">
            <Code size={18} />
            Skills Catalog
          </span>
          {activeTab === "skills" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {activeTab === "skills" && (
          <div className="px-5 pb-5 pt-2 flex flex-col gap-4 border-t border-white/5 bg-[#0e0c1f]/40">
            {data.skills.map((skill) => (
              <div key={skill.id} className="p-4 rounded border border-white/5 bg-[#17142b]/60 relative flex flex-col gap-3">
                <button
                  onClick={() => removeSkillCategory(skill.id)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition"
                  title="Remove Category"
                >
                  <Trash2 size={15} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <div className="flex flex-col gap-1 md:col-span-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Skill Group Name</label>
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => updateSkillCategory(skill.id, "category", e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white font-bold"
                      placeholder="e.g. Languages"
                    />
                  </div>
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-[10px] text-gray-400 font-bold uppercase">Skills (comma separated list)</label>
                    <input
                      type="text"
                      value={skill.items.join(", ")}
                      onChange={(e) => updateSkillItems(skill.id, e.target.value)}
                      className="w-full bg-[#1b1931] border border-white/10 rounded px-2.5 py-1.5 text-white"
                      placeholder="Go, Python, TypeScript"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addSkillCategory}
              className="mt-2 border border-dashed border-cyan-500/40 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-500/5 py-2.5 rounded transition flex items-center justify-center gap-1.5 font-semibold"
            >
              <Plus size={16} />
              Add Skill Category
            </button>
          </div>
        )}
      </div>

      {/* 6. OPTIONAL FIELDS ACCORDION (Certifications, Achievements, Languages, Sorter, etc.) */}
      <div className="glass-panel overflow-hidden">
        <button
          onClick={() => toggleTab("optional")}
          className="w-full px-5 py-4 flex justify-between items-center text-left font-display font-bold text-base hover:bg-white/5 transition-all text-white"
        >
          <span className="flex items-center gap-3 text-cyan-400">
            <Award size={18} />
            Optional Fields & Section Sorter
          </span>
          {activeTab === "optional" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {activeTab === "optional" && (
          <div className="px-5 pb-5 pt-3 flex flex-col gap-5 border-t border-white/5 bg-[#0e0c1f]/40">

            {/* Section 6A: Dynamic Sections Ordering */}
            <div className="p-4 rounded border border-cyan-500/25 bg-[#121025]/50 flex flex-col gap-3">
              <span className="text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Compass size={14} />
                Dynamic Section Layout Re-ordering
              </span>
              <p className="text-[11.5px] text-gray-400">Rearrange the placement structure of your PDF. Click the arrow triggers to slide sections up or down instantly.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                {data.sectionOrder.map((sec, idx) => (
                  <div key={sec} className="bg-[#1b1931] border border-white/5 rounded px-3 py-2 flex justify-between items-center">
                    <span className="font-bold text-white capitalize text-[12px]">{idx + 1}. {sec}</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => moveSection(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 hover:bg-white/10 rounded disabled:opacity-30 text-cyan-400"
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => moveSection(idx, "down")}
                        disabled={idx === data.sectionOrder.length - 1}
                        className="p-1 hover:bg-white/10 rounded disabled:opacity-30 text-cyan-400"
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6B: Certifications List */}
            <div className="p-4 rounded border border-white/5 bg-[#17142b]/60 flex flex-col gap-3">
              <span className="text-cyan-400 font-bold text-xs uppercase flex justify-between items-center">
                <span>Certifications List</span>
                <button
                  onClick={() => addListItem("certifications")}
                  className="text-[11.5px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 border border-cyan-500/20 px-2 py-0.5 rounded"
                >
                  <Plus size={12} /> Add Certification
                </button>
              </span>

              {data.certifications.map((cert) => (
                <div key={cert.id} className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#1b1931]/60 p-2.5 rounded border border-white/5 relative">
                  <button
                    onClick={() => removeListItem("certifications", cert.id)}
                    className="absolute -top-1.5 -right-1.5 bg-red-950/80 border border-red-500/20 hover:bg-red-900 text-red-400 p-0.5 rounded-full transition"
                  >
                    <Trash2 size={12} />
                  </button>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateListItem("certifications", cert.id, "name", e.target.value)}
                    className="bg-[#17142b] border border-white/10 rounded px-2 py-1 text-white text-[12px] col-span-2"
                    placeholder="AWS Certified Solutions Architect"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateListItem("certifications", cert.id, "issuer", e.target.value)}
                    className="bg-[#17142b] border border-white/10 rounded px-2 py-1 text-white text-[12px]"
                    placeholder="Amazon Web Services"
                  />
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => updateListItem("certifications", cert.id, "date", e.target.value)}
                    className="bg-[#17142b] border border-white/10 rounded px-2 py-1 text-white text-[12px]"
                    placeholder="2023-11"
                  />
                </div>
              ))}
            </div>

            {/* Section 6C: Achievements */}
            <div className="p-4 rounded border border-white/5 bg-[#17142b]/60 flex flex-col gap-3">
              <span className="text-cyan-400 font-bold text-xs uppercase flex justify-between items-center">
                <span>Key Achievements</span>
                <button
                  onClick={() => addListItem("achievements")}
                  className="text-[11.5px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 border border-cyan-500/20 px-2 py-0.5 rounded"
                >
                  <Plus size={12} /> Add Achievement
                </button>
              </span>

              {data.achievements.map((ach) => (
                <div key={ach.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-[#1b1931]/60 p-2.5 rounded border border-white/5 relative">
                  <button
                    onClick={() => removeListItem("achievements", ach.id)}
                    className="absolute -top-1.5 -right-1.5 bg-red-950/80 border border-red-500/20 hover:bg-red-900 text-red-400 p-0.5 rounded-full transition"
                  >
                    <Trash2 size={12} />
                  </button>
                  <input
                    type="text"
                    value={ach.title}
                    onChange={(e) => updateListItem("achievements", ach.id, "title", e.target.value)}
                    className="bg-[#17142b] border border-white/10 rounded px-2 py-1 text-white text-[12px] font-bold"
                    placeholder="1st Place - Berkeley Hackathon"
                  />
                  <input
                    type="text"
                    value={ach.description}
                    onChange={(e) => updateListItem("achievements", ach.id, "description", e.target.value)}
                    className="bg-[#17142b] border border-white/10 rounded px-2 py-1 text-white text-[12px] md:col-span-1"
                    placeholder="Defeated 80 teams rendering web matrix solutions..."
                  />
                  <input
                    type="text"
                    value={ach.date}
                    onChange={(e) => updateListItem("achievements", ach.id, "date", e.target.value)}
                    className="bg-[#17142b] border border-white/10 rounded px-2 py-1 text-white text-[12px]"
                    placeholder="2021-11"
                  />
                </div>
              ))}
            </div>

            {/* Section 6D: Languages */}
            <div className="p-4 rounded border border-white/5 bg-[#17142b]/60 flex flex-col gap-3">
              <span className="text-cyan-400 font-bold text-xs uppercase flex justify-between items-center">
                <span>Languages</span>
                <button
                  onClick={() => addListItem("languages")}
                  className="text-[11.5px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 border border-cyan-500/20 px-2 py-0.5 rounded"
                >
                  <Plus size={12} /> Add Language
                </button>
              </span>

              {data.languages.map((l) => (
                <div key={l.id} className="grid grid-cols-2 gap-2 bg-[#1b1931]/60 p-2 rounded border border-white/5 relative">
                  <button
                    onClick={() => removeListItem("languages", l.id)}
                    className="absolute -top-1.5 -right-1.5 bg-red-950/80 border border-red-500/20 hover:bg-red-900 text-red-400 p-0.5 rounded-full transition"
                  >
                    <Trash2 size={12} />
                  </button>
                  <input
                    type="text"
                    value={l.name}
                    onChange={(e) => updateListItem("languages", l.id, "name", e.target.value)}
                    className="bg-[#17142b] border border-white/10 rounded px-2 py-1 text-white text-[12px] font-bold"
                    placeholder="English"
                  />
                  <input
                    type="text"
                    value={l.proficiency}
                    onChange={(e) => updateListItem("languages", l.id, "proficiency", e.target.value)}
                    className="bg-[#17142b] border border-white/10 rounded px-2 py-1 text-white text-[12px]"
                    placeholder="Native / Fluent / Conversational"
                  />
                </div>
              ))}
            </div>

            {/* Section 6E: Extracurricular Activities */}
            <div className="p-4 rounded border border-white/5 bg-[#17142b]/60 flex flex-col gap-3">
              <span className="text-cyan-400 font-bold text-xs uppercase flex items-center gap-1.5">
                <Award size={14} />
                Extracurricular Activities
              </span>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Activities (comma separated)</label>
                <input
                  type="text"
                  value={data.extracurriculars.join(", ")}
                  onChange={(e) => updateExtracurriculars(e.target.value)}
                  className="w-full bg-[#1b1931] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                  placeholder="Swimming, Sports, Fire and Safety Certification"
                />
              </div>
            </div>

            {/* Section 6F: Interests */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Interests & Hobbies (comma separated)</label>
              <input
                type="text"
                value={data.interests.join(", ")}
                onChange={(e) => updateInterests(e.target.value)}
                className="w-full bg-[#1b1931] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400 transition"
                placeholder="Generative Art, Mechanical Keyboards, Backpacker"
              />
            </div>

          </div>
        )}
      </div>

      {/* 7. ATS JOB FIT CHECKER CARD */}
      <div className="glass-panel overflow-hidden border border-purple-500/20">
        <button
          onClick={() => toggleTab("ats-analyzer")}
          className="w-full px-5 py-4 flex justify-between items-center text-left font-display font-bold text-base hover:bg-white/5 transition-all text-white bg-purple-950/10"
        >
          <span className="flex items-center gap-3 text-purple-400">
            <Shield size={18} />
            AI ATS Job Match Optimizer
          </span>
          {activeTab === "ats-analyzer" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {activeTab === "ats-analyzer" && (
          <div className="px-5 pb-5 pt-3 flex flex-col gap-4 border-t border-white/5 bg-[#120a22]/30">
            <p className="text-[12px] text-gray-300">Paste a target job description below. The AI will evaluate your resume, estimate your match score (0-100%), and suggest modifications or missing keywords.</p>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-24 bg-[#1b1931] border border-purple-500/20 rounded p-2.5 text-white text-[12.5px] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Paste job posting details here..."
            />

            <button
              onClick={runAtsScan}
              disabled={isAtsLoading || !jobDescription.trim()}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-2 px-4 rounded transition flex items-center justify-center gap-2"
            >
              {isAtsLoading ? (
                <>
                  <Sparkles size={16} className="animate-spin text-purple-200" />
                  Synthesizing Score...
                </>
              ) : (
                <>
                  <Sparkles size={16} className="text-purple-200" />
                  Compare Resume with Job Description
                </>
              )}
            </button>

            {atsScoreResult && (
              <div className="p-4 rounded bg-purple-950/40 border border-purple-500/30 flex flex-col gap-3 mt-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-200 font-display uppercase tracking-wider text-xs">ATS Compatibility Index</span>
                  <span className={`text-lg font-black font-display px-2 py-0.5 rounded ${atsScoreResult.score >= 80 ? 'text-green-400 bg-green-950/40 border border-green-500/20' : 'text-yellow-400 bg-yellow-950/40 border border-yellow-500/20'}`}>
                    {atsScoreResult.score}%
                  </span>
                </div>

                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${atsScoreResult.score >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                    style={{ width: `${atsScoreResult.score}%` }}
                  />
                </div>

                <div className="flex flex-col gap-1.5 pt-1.5 border-t border-purple-500/10">
                  <span className="font-bold text-[11px] text-purple-300 uppercase tracking-widest">Optimizations Needed:</span>
                  <ul className="list-disc pl-4 text-[12px] text-gray-300 flex flex-col gap-1 leading-snug">
                    {atsScoreResult.suggestions.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
