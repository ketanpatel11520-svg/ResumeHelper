"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { ResumeData } from "../utils/resumeMock";

interface ResumePreviewProps {
  data: ResumeData;
  scale: number;
}

export default function ResumePreview({ data, scale }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState<number>(1);
  const p = data.personalInfo;

  // Auto-fit content to single A4 page
  useLayoutEffect(() => {
    const content = contentRef.current;
    const container = containerRef.current;
    if (!content || !container) return;

    requestAnimationFrame(() => {
      // Get container's actual rendered height in pixels
      const containerPxHeight = container.getBoundingClientRect().height;
      if (containerPxHeight <= 0) return;

      // Measure content's natural height by temporarily removing overflow
      const origStyle = container.getAttribute("style") || "";
      container.style.overflow = "visible";
      container.style.maxHeight = "none";

      const contentNaturalHeight = content.scrollHeight;

      // Restore
      container.setAttribute("style", origStyle);

      if (contentNaturalHeight <= 0) return;

      // Calculate fit ratio
      const ratio = containerPxHeight / contentNaturalHeight;
      const fitted = Math.min(scale, ratio);
      setAutoScale(Math.max(Math.min(fitted, 1), 0.4));
    });
  }, [data, scale]);

  // Exact LaTeX Match - renders identically to the user's .tex code
  const renderClassicLatex = () => {
    return (
      <div className="text-[#111111]" style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "11pt", lineHeight: 1.15 }}>
        {/* HEADING - matches \Huge \scshape name */}
        <div style={{ textAlign: "center", marginBottom: "4pt" }}>
          <div style={{ fontSize: "24pt", fontWeight: 400, fontVariant: "small-caps", letterSpacing: "0.5pt", marginBottom: "1pt" }}>
            {p.fullName || "KPatel"}
          </div>
          <div style={{ fontSize: "10pt", lineHeight: 1.3 }}>
            {p.phone && (
              <span>
                <span style={{ fontSize: "10pt" }}>&#9742;</span>
                <span style={{ textDecoration: "underline" }}>{p.phone}</span>
              </span>
            )}
            {p.phone && (p.email || p.linkedin) && <span> ~ </span>}
            {p.email && (
              <span>
                <span style={{ fontSize: "10pt" }}>&#9993;</span>{" "}
                <a href={`mailto:${p.email}`} style={{ textDecoration: "underline", color: "inherit" }}>
                  {p.email}
                </a>
              </span>
            )}
            {(p.phone || p.email) && p.linkedin && <span> ~ </span>}
            {p.linkedin && (
              <span>
                <span style={{ fontSize: "10pt" }}>in</span>{" "}
                <a href={`https://${p.linkedin}`} target="_blank" rel="noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>
                  linkedin.com/in/{p.linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//, "")}
                </a>
              </span>
            )}
          </div>
        </div>

        {/* Career Objective - matches \section{} format */}
        <div style={{ marginBottom: "6pt" }}>
          <div style={{ fontSize: "12pt", fontWeight: 700, fontVariant: "small-caps", borderBottom: "0.5pt solid black", marginBottom: "2pt", paddingBottom: 0 }}>
            Career Objective
          </div>
          <p style={{ fontSize: "10.5pt", margin: "2pt 0", lineHeight: 1.2 }}>
            {p.objective || "Motivated strong foundation in analytical thinking, data handling, and technical operations. Experienced in computer systems and communication workflows, seeking to contribute effectively in an entry-level technical or operations role."}
          </p>
        </div>

        {/* Dynamic Sections */}
        {data.sectionOrder.map((sectionId) => {
          switch (sectionId) {
            case "education":
              if (!data.education || data.education.length === 0) return null;
              return (
                <div key="education" style={{ marginBottom: "6pt" }}>
                  <div style={{ fontSize: "12pt", fontWeight: 700, fontVariant: "small-caps", borderBottom: "0.5pt solid black", marginBottom: "2pt", paddingBottom: 0 }}>
                    Education
                  </div>
                  <div style={{ marginLeft: 0, fontSize: "10.5pt" }}>
                    {data.education.map((edu) => (
                      <div key={edu.id} style={{ marginBottom: "4pt" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <tbody>
                            <tr>
                              <td style={{ fontWeight: 700, verticalAlign: "baseline", padding: 0, textAlign: "left" }}>
                                {edu.institution}
                              </td>
                              <td style={{ fontWeight: 700, verticalAlign: "baseline", padding: 0, textAlign: "right", fontSize: "9.5pt" }}>
                                {edu.location || (edu.startDate && edu.endDate ? `${edu.startDate} -- ${edu.endDate}` : edu.startDate || edu.endDate || "")}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                          <tbody>
                            <tr>
                              <td style={{ fontStyle: "italic", verticalAlign: "baseline", padding: 0, textAlign: "left", fontSize: "10pt" }}>
                                {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                              </td>
                              <td style={{ fontStyle: "italic", verticalAlign: "baseline", padding: 0, textAlign: "right", fontSize: "9.5pt" }}>
                                {edu.location ? (edu.startDate && edu.endDate ? `${edu.startDate} -- ${edu.endDate}` : edu.startDate || edu.endDate || "") : "-"}
                                {!edu.location && edu.startDate && !edu.endDate ? edu.startDate : ""}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {edu.gpa && <div style={{ fontSize: "10pt", marginTop: "1pt" }}><strong>GPA:</strong> {edu.gpa}</div>}
                        {edu.description && <div style={{ fontSize: "10pt", marginTop: "1pt" }}>{edu.description}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              );

            case "skills":
              if (!data.skills || data.skills.length === 0) return null;
              return (
                <div key="skills" style={{ marginBottom: "6pt" }}>
                  <div style={{ fontSize: "12pt", fontWeight: 700, fontVariant: "small-caps", borderBottom: "0.5pt solid black", marginBottom: "2pt", paddingBottom: 0 }}>
                    Skills
                  </div>
                  <div style={{ fontSize: "10.5pt", lineHeight: 1.3 }}>
                    {data.skills.map((skill, idx) => (
                      <div key={skill.id}>
                        <strong>{skill.category}:</strong> {skill.items.join(", ")}{" "}
                        {idx < data.skills.length - 1 && <span>\\ </span>}
                      </div>
                    ))}
                  </div>
                </div>
              );

            case "experience":
              if (!data.experience || data.experience.length === 0) return null;
              return (
                <div key="experience" style={{ marginBottom: "6pt" }}>
                  <div style={{ fontSize: "12pt", fontWeight: 700, fontVariant: "small-caps", borderBottom: "0.5pt solid black", marginBottom: "2pt", paddingBottom: 0 }}>
                    Experience
                  </div>
                  {data.experience.map((exp, idx) => (
                    <div key={exp.id} style={{ marginBottom: "5pt" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                          <tr>
                            <td style={{ fontWeight: 700, verticalAlign: "baseline", padding: 0, textAlign: "left", fontSize: "10.5pt" }}>
                              {exp.company}
                            </td>
                            <td style={{ fontWeight: 700, verticalAlign: "baseline", padding: 0, textAlign: "right", fontSize: "9.5pt" }}>
                              {exp.startDate} -- {exp.endDate}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                          <tr>
                            <td style={{ fontStyle: "italic", verticalAlign: "baseline", padding: 0, textAlign: "left", fontSize: "10pt" }}>
                              {exp.position}
                            </td>
                            <td style={{ fontStyle: "italic", verticalAlign: "baseline", padding: 0, textAlign: "right", fontSize: "9.5pt" }}>
                              {exp.tools || ""}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {exp.points.length > 0 && (
                        <ul style={{ margin: "1pt 0 0 0", paddingLeft: "18pt", listStyleType: "disc", fontSize: "9.5pt", lineHeight: 1.2 }}>
                          {exp.points.map((pt, ptIdx) => (
                            <li key={ptIdx} style={{ marginBottom: "1pt" }}>{pt}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              );

            case "certifications":
              if (!data.certifications || data.certifications.length === 0) return null;
              return (
                <div key="certifications" style={{ marginBottom: "6pt" }}>
                  <div style={{ fontSize: "12pt", fontWeight: 700, fontVariant: "small-caps", borderBottom: "0.5pt solid black", marginBottom: "2pt", paddingBottom: 0 }}>
                    Awards & Certifications
                  </div>
                  <ul style={{ margin: "1pt 0 0 0", paddingLeft: "18pt", listStyleType: "disc", fontSize: "10pt", lineHeight: 1.2 }}>
                    {data.certifications.map((cert) => (
                      <li key={cert.id} style={{ marginBottom: "1pt" }}>
                        <strong>{cert.name}</strong>
                        {cert.issuer ? ` – ${cert.issuer}` : ""}
                        {cert.date ? ` (${cert.date})` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              );

            case "extracurriculars":
              if (!data.extracurriculars || data.extracurriculars.length === 0) return null;
              return (
                <div key="extracurriculars" style={{ marginBottom: "6pt" }}>
                  <div style={{ fontSize: "12pt", fontWeight: 700, fontVariant: "small-caps", borderBottom: "0.5pt solid black", marginBottom: "2pt", paddingBottom: 0 }}>
                    Extracurricular Activities
                  </div>
                  <ul style={{ margin: "1pt 0 0 0", paddingLeft: "18pt", listStyleType: "disc", fontSize: "10pt", lineHeight: 1.2 }}>
                    {data.extracurriculars.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: "1pt" }}>{item}</li>
                    ))}
                  </ul>
                </div>
              );

            case "languages":
              if (!data.languages || data.languages.length === 0) return null;
              return (
                <div key="languages" style={{ marginBottom: "6pt" }}>
                  <div style={{ fontSize: "12pt", fontWeight: 700, fontVariant: "small-caps", borderBottom: "0.5pt solid black", marginBottom: "2pt", paddingBottom: 0 }}>
                    Languages
                  </div>
                  <ul style={{ margin: "1pt 0 0 0", paddingLeft: "18pt", listStyleType: "disc", fontSize: "10pt", lineHeight: 1.2 }}>
                    {data.languages.map((l) => (
                      <li key={l.id} style={{ marginBottom: "1pt" }}>
                        {l.name} – {l.proficiency}
                      </li>
                    ))}
                  </ul>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    );
  };

  // 2. MODERN MINIMALIST TEMPLATE
  const renderModernMinimal = () => {
    return (
      <div className="font-sans leading-relaxed text-[#2c3e50] text-[10pt]">
        <div className="flex justify-between items-start border-b-2 border-cyan-800 pb-4 mb-5">
          <div>
            <h1 className="text-[24pt] font-extrabold tracking-tight text-gray-950 font-display mb-1">
              {p.fullName || "Your Full Name"}
            </h1>
            <p className="text-[11.5pt] font-semibold uppercase tracking-wider text-cyan-800">
              {p.title || "Your Target Job Title"}
            </p>
          </div>
          <div className="text-right text-[9pt] text-gray-700 flex flex-col gap-0.5">
            {p.phone && <p>{p.phone}</p>}
            {p.email && <p className="font-medium text-cyan-800">{p.email}</p>}
            {p.linkedin && <p>linkedin: {p.linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//, "")}</p>}
          </div>
        </div>
        {p.objective && (
          <div className="mb-5">
            <h2 className="text-[10pt] font-extrabold uppercase tracking-widest text-cyan-800 mb-1">Career Objective</h2>
            <p className="text-[9.5pt] text-gray-700 italic leading-snug">{p.objective}</p>
          </div>
        )}
        {data.sectionOrder.map((sectionId) => {
          switch (sectionId) {
            case "education":
              if (!data.education || data.education.length === 0) return null;
              return (
                <div key="education" className="mb-5 grid grid-cols-[140px_1fr] gap-4">
                  <h2 className="text-[10pt] font-extrabold uppercase tracking-widest text-cyan-800 border-r border-gray-300 pr-2 text-right">Education</h2>
                  <div className="flex flex-col gap-3">
                    {data.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-baseline font-bold text-gray-950">
                          <span>{edu.institution || "Institution"}</span>
                          <span className="font-normal text-[9pt] text-gray-500">{edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ""}</span>
                        </div>
                        <p className="text-[9.5pt] font-medium text-cyan-800">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case "experience":
              if (!data.experience || data.experience.length === 0) return null;
              return (
                <div key="experience" className="mb-5 grid grid-cols-[140px_1fr] gap-4">
                  <h2 className="text-[10pt] font-extrabold uppercase tracking-widest text-cyan-800 border-r border-gray-300 pr-2 text-right">Experience</h2>
                  <div className="flex flex-col gap-4">
                    {data.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline font-bold text-gray-950">
                          <span>{exp.company}</span>
                          <span className="font-normal text-[9pt] text-gray-500">{exp.startDate} — {exp.endDate}</span>
                        </div>
                        <p className="text-[9.5pt] font-semibold text-cyan-800 mb-1.5">{exp.position}</p>
                        <ul className="list-disc pl-4 text-[9pt] text-gray-800 flex flex-col gap-1 leading-relaxed">
                          {exp.points.map((pt, idx) => (
                            <li key={idx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case "skills":
              if (!data.skills || data.skills.length === 0) return null;
              return (
                <div key="skills" className="mb-5 grid grid-cols-[140px_1fr] gap-4">
                  <h2 className="text-[10pt] font-extrabold uppercase tracking-widest text-cyan-800 border-r border-gray-300 pr-2 text-right">Skills</h2>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[9pt]">
                    {data.skills.map((skill) => (
                      <div key={skill.id} className="leading-snug">
                        <strong className="text-gray-950 uppercase text-[8pt] block tracking-wider mb-0.5">{skill.category}</strong>
                        <span className="text-gray-800">{skill.items.join(", ")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case "certifications":
              if (!data.certifications || data.certifications.length === 0) return null;
              return (
                <div key="certifications" className="mb-5 grid grid-cols-[140px_1fr] gap-4">
                  <h2 className="text-[10pt] font-extrabold uppercase tracking-widest text-cyan-800 border-r border-gray-300 pr-2 text-right">Awards & Certifications</h2>
                  <ul className="list-disc pl-4 text-[9pt] text-gray-800 flex flex-col gap-1">
                    {data.certifications.map((cert) => (
                      <li key={cert.id}>
                        <strong className="text-gray-900">{cert.name}</strong>
                        {cert.issuer && <span className="text-gray-500 italic"> – {cert.issuer}</span>}
                        {cert.date && <span className="text-gray-500"> ({cert.date})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            case "extracurriculars":
              if (!data.extracurriculars || data.extracurriculars.length === 0) return null;
              return (
                <div key="extracurriculars" className="mb-5 grid grid-cols-[140px_1fr] gap-4">
                  <h2 className="text-[10pt] font-extrabold uppercase tracking-widest text-cyan-800 border-r border-gray-300 pr-2 text-right">Activities</h2>
                  <ul className="list-disc pl-4 text-[9pt] text-gray-800 flex flex-col gap-1">
                    {data.extracurriculars.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            case "languages":
              if (!data.languages || data.languages.length === 0) return null;
              return (
                <div key="languages" className="mb-5 grid grid-cols-[140px_1fr] gap-4">
                  <h2 className="text-[10pt] font-extrabold uppercase tracking-widest text-cyan-800 border-r border-gray-300 pr-2 text-right">Languages</h2>
                  <ul className="list-disc pl-4 text-[9pt] text-gray-800 flex flex-col gap-1">
                    {data.languages.map((l) => (
                      <li key={l.id}><strong>{l.name}</strong> – {l.proficiency}</li>
                    ))}
                  </ul>
                </div>
              );
            default: return null;
          }
        })}
      </div>
    );
  };

  // 3. CYBER TECH TEMPLATE
  const renderCyberTech = () => {
    return (
      <div className="font-mono leading-relaxed text-[#1a202c] text-[9.5pt]">
        <div className="border border-cyan-500 bg-cyan-50/50 p-4 rounded-lg mb-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-cyan-500 text-white text-[7pt] px-1.5 py-0.5 rounded-bl uppercase font-bold tracking-wider">SYNTHESIS SYS v1.0</div>
          <h1 className="text-[20pt] font-black tracking-tighter text-cyan-950 font-display uppercase mb-1 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-cyan-500 inline-block animate-pulse"></span>
            {p.fullName || "Your Full Name"}
          </h1>
          <p className="text-[9.5pt] font-bold text-purple-750 uppercase tracking-widest mb-3">[ {p.title || "Your Target Job Title"} ]</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5 text-[8.5pt] text-gray-800 border-t border-cyan-200 pt-3">
            {p.phone && <span><strong>[TEL]</strong> {p.phone}</span>}
            {p.email && (<span><strong>[NET]</strong> <a href={`mailto:${p.email}`} className="underline text-cyan-900 font-semibold">{p.email}</a></span>)}
            {p.linkedin && (<span><strong>[LNK]</strong> <a href={`https://${p.linkedin}`} className="underline text-cyan-900">{p.linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//, "")}</a></span>)}
            {p.location && <span><strong>[LOC]</strong> {p.location}</span>}
          </div>
        </div>
        {p.objective && (
          <div className="mb-5">
            <h2 className="text-[10.5pt] font-extrabold text-cyan-950 border-b-2 border-cyan-500 uppercase tracking-wider mb-2 pb-1 flex items-center gap-1.5"><span>//</span> OBJECTIVE.SYS</h2>
            <p className="text-[8.5pt] text-gray-700 italic leading-snug border-l border-cyan-300 pl-3">{p.objective}</p>
          </div>
        )}
        {data.sectionOrder.map((sectionId) => {
          switch (sectionId) {
            case "education":
              if (!data.education || data.education.length === 0) return null;
              return (
                <div key="education" className="mb-5">
                  <h2 className="text-[10.5pt] font-extrabold text-cyan-950 border-b-2 border-cyan-500 uppercase tracking-wider mb-2.5 pb-1 flex items-center gap-1.5"><span>//</span> EDUCATION.LOG</h2>
                  {data.education.map((edu) => (
                    <div key={edu.id} className="border-l border-cyan-400 pl-3 mb-2">
                      <div className="flex justify-between items-baseline font-bold text-cyan-950">
                        <span>{edu.institution}</span>
                        <span className="text-[8pt] text-cyan-900 bg-cyan-100 px-1.5 py-0.5 rounded font-semibold">{edu.startDate}{edu.endDate ? ` -- ${edu.endDate}` : ""}</span>
                      </div>
                      <p className="text-[9pt] text-purple-750 font-bold">{edu.degree}</p>
                    </div>
                  ))}
                </div>
              );
            case "experience":
              if (!data.experience || data.experience.length === 0) return null;
              return (
                <div key="experience" className="mb-5">
                  <h2 className="text-[10.5pt] font-extrabold text-cyan-950 border-b-2 border-cyan-500 uppercase tracking-wider mb-2.5 pb-1 flex items-center gap-1.5"><span>//</span> EXPERIENCE.LOG</h2>
                  {data.experience.map((exp) => (
                    <div key={exp.id} className="border-l border-cyan-400 pl-3 mb-3">
                      <div className="flex justify-between items-baseline font-bold text-cyan-950">
                        <span>{exp.company}</span>
                        <span className="text-[8pt] text-cyan-900 bg-cyan-100 px-1.5 py-0.5 rounded font-semibold">{exp.startDate} -- {exp.endDate}</span>
                      </div>
                      <p className="text-[9pt] text-purple-750 font-bold mb-1">{exp.position}</p>
                      <ul className="list-disc pl-4 text-[8.5pt] text-gray-700 flex flex-col gap-1 leading-normal">
                        {exp.points.map((pt, idx) => (<li key={idx}>{pt}</li>))}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            case "skills":
              if (!data.skills || data.skills.length === 0) return null;
              return (
                <div key="skills" className="mb-5">
                  <h2 className="text-[10.5pt] font-extrabold text-cyan-950 border-b-2 border-cyan-500 uppercase tracking-wider mb-2.5 pb-1 flex items-center gap-1.5"><span>//</span> SKILLS_INVENTORY.SYS</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[8.5pt] text-gray-800 bg-gray-50 border border-gray-200 p-3 rounded">
                    {data.skills.map((skill) => (
                      <div key={skill.id} className="leading-snug">
                        <strong className="text-cyan-950 font-bold">{`>>> ${skill.category}:`}</strong>{" "}
                        <span className="text-gray-700">{skill.items.join(", ")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case "certifications":
              if (!data.certifications || data.certifications.length === 0) return null;
              return (
                <div key="certifications" className="mb-5">
                  <h2 className="text-[10.5pt] font-extrabold text-cyan-950 border-b-2 border-cyan-500 uppercase tracking-wider mb-2.5 pb-1 flex items-center gap-1.5"><span>//</span> CERTIFICATIONS.LOG</h2>
                  <ul className="list-disc pl-4 text-[8.5pt] text-gray-700 flex flex-col gap-1">
                    {data.certifications.map((cert) => (
                      <li key={cert.id}><strong>{cert.name}</strong>{cert.issuer && <span className="text-gray-500"> ({cert.issuer})</span>}{cert.date && <span className="text-gray-600 font-semibold"> – {cert.date}</span>}</li>
                    ))}
                  </ul>
                </div>
              );
            case "extracurriculars":
              if (!data.extracurriculars || data.extracurriculars.length === 0) return null;
              return (
                <div key="extracurriculars" className="mb-5">
                  <h2 className="text-[10.5pt] font-extrabold text-cyan-950 border-b-2 border-cyan-500 uppercase tracking-wider mb-2.5 pb-1 flex items-center gap-1.5"><span>//</span> EXTRACURRICULAR.SYS</h2>
                  <ul className="list-disc pl-4 text-[8.5pt] text-gray-700 flex flex-col gap-1">
                    {data.extracurriculars.map((item, idx) => (<li key={idx}>{item}</li>))}
                  </ul>
                </div>
              );
            case "languages":
              if (!data.languages || data.languages.length === 0) return null;
              return (
                <div key="languages" className="mb-5">
                  <h2 className="text-[10.5pt] font-extrabold text-cyan-950 border-b-2 border-cyan-500 uppercase tracking-wider mb-2.5 pb-1 flex items-center gap-1.5"><span>//</span> LANGUAGES.SYS</h2>
                  <ul className="list-disc pl-4 text-[8.5pt] text-gray-700 flex flex-col gap-1">
                    {data.languages.map((l) => (<li key={l.id}><strong>{l.name}</strong> – {l.proficiency}</li>))}
                  </ul>
                </div>
              );
            default: return null;
          }
        })}
      </div>
    );
  };

  const effectiveScale = autoScale || scale;

  return (
    <div className="print-area w-full overflow-auto flex justify-center bg-gray-900/10 dark:bg-black/20 p-6 shadow-inner rounded-xl border border-gray-200/10 select-text">
      <div
        ref={containerRef}
        className="a4-container transition-transform duration-200"
        style={{
          transform: `scale(${effectiveScale})`,
          transformOrigin: "top center",
          marginBottom: `calc((297mm * ${effectiveScale}) - 297mm)`
        }}
      >
        <div ref={contentRef}>
          {data.selectedTemplate === "classic-latex" && renderClassicLatex()}
          {data.selectedTemplate === "modern-minimal" && renderModernMinimal()}
          {data.selectedTemplate === "cyber-tech" && renderCyberTech()}
        </div>
      </div>
    </div>
  );
}
