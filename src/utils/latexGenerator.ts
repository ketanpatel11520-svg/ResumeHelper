import { ResumeData } from "./resumeMock";

/**
 * Escapes special LaTeX characters to prevent compilation issues
 */
export function escapeLatex(text: string): string {
  if (!text) return "";
  // Order of replacements is important! Escaping backslash first, then others.
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([&%$#_{}])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}")
    .replace(/\[/g, "{[}")
    .replace(/\]/g, "{]}");
}

export function generateLatex(data: ResumeData): string {
  const p = data.personalInfo;

  // Format social links dynamically
  const phoneStr = p.phone ? `${escapeLatex(p.phone)}` : "";
  const emailStr = p.email ? `\\href{mailto:${escapeLatex(p.email)}}{\\underline{${escapeLatex(p.email)}}}` : "";
  const linkedinStr = p.linkedin ? `\\href{https://${escapeLatex(p.linkedin)}}{\\underline{linkedin.com/in/${escapeLatex(p.linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//, ""))}}}` : "";

  // Combine contact info elements
  const contactParts: string[] = [];
  if (phoneStr) contactParts.push(`\\faPhone\\underline{${phoneStr}}`);
  if (emailStr) contactParts.push(`\\href{mailto:${escapeLatex(p.email)}}{\\faEnvelope\\ \\underline{${escapeLatex(p.email)}}}`);
  if (linkedinStr) contactParts.push(`\\href{https://${escapeLatex(p.linkedin)}}{\\faLinkedin\\ \\underline{linkedin.com/in/${escapeLatex(p.linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//, ""))}}}`);

  const contactLine = contactParts.join(" ~ ");

  let latex = `%-------------------------
% Resume Generated via ResumeHelper (Made by KPATEL)
% Futuristic 3D AI-Powered Resume Builder
%-------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\usepackage{multicol}
\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-.7in}
\\addtolength{\\textheight}{1.4in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-6pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

% Adjusted spacing for better readability
\\newcommand{\\resumeItem}[1]{\\item\\small{{#1 \\vspace{-1pt}}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & \\textbf{\\small #2} \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-4pt}
}
\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textbf{\\small #2}\\\\
    \\end{tabular*}\\vspace{-4pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[noitemsep, topsep=3pt, partopsep=0pt, left=0pt]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-3pt}}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}

\\begin{document}

%----------HEADING----------
\\begin{center}
    {\\Huge \\scshape ${escapeLatex(p.fullName)}} \\\\ \\vspace{4pt}
    \\small ${contactLine}
\\end{center}

`;

  // Career Objective
  if (p.objective) {
    latex += `%-----------Career Objective-----------
\\section{Career Objective}
${escapeLatex(p.objective)}

`;
  }

  // Helper to format Date ranges beautifully
  const formatDate = (start: string, end: string) => {
    const s = escapeLatex(start || "");
    const e = escapeLatex(end || "");
    if (!s && !e) return "";
    if (s && !e) return s;
    if (!s && e) return e;
    return `${s} -- ${e}`;
  };

  // Compile sections in specified order
  data.sectionOrder.forEach((section) => {
    switch (section) {
      case "education":
        if (data.education && data.education.length > 0) {
          latex += `
%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
`;
          data.education.forEach((edu) => {
            const dateStr = edu.startDate && edu.endDate
              ? `${escapeLatex(edu.startDate)} -- ${escapeLatex(edu.endDate)}`
              : edu.startDate || edu.endDate || "-";
            latex += `    \\resumeSubheading
      {${escapeLatex(edu.institution)}}{${escapeLatex(edu.location)}}
      {${escapeLatex(edu.degree)}${edu.fieldOfStudy ? ` in ${escapeLatex(edu.fieldOfStudy)}` : ""}}{${dateStr}}
`;
            if (edu.gpa) {
              latex += `    \\begin{itemize}[leftmargin=0.15in, label={}]
      \\item\\small{\\textbf{GPA:} ${escapeLatex(edu.gpa)}}
    \\end{itemize}
`;
            }
            if (edu.description) {
              latex += `    \\begin{itemize}[leftmargin=0.15in, label={}]
      \\item\\small{${escapeLatex(edu.description)}}
    \\end{itemize}
`;
            }
          });
          latex += `  \\resumeSubHeadingListEnd

`;
        }
        break;

      case "experience":
        if (data.experience && data.experience.length > 0) {
          latex += `
%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
`;
          data.experience.forEach((exp) => {
            latex += `    \\resumeSubheading
      {${escapeLatex(exp.company)}}{${escapeLatex(exp.location)}}
      {${escapeLatex(exp.position)}}{${formatDate(exp.startDate, exp.endDate)}}
      \\resumeItemListStart
`;
            exp.points.forEach((pt) => {
              latex += `        \\resumeItem{${escapeLatex(pt)}}
`;
            });
            latex += `      \\resumeItemListEnd
`;
          });
          latex += `  \\resumeSubHeadingListEnd

`;
        }
        break;

      case "projects":
        if (data.projects && data.projects.length > 0) {
          latex += `
%-----------PROJECTS-----------
\\section{Projects}
  \\resumeSubHeadingListStart
`;
          data.projects.forEach((proj) => {
            const techStr = proj.technologies.length > 0 ? ` $|$ \\textit{${escapeLatex(proj.technologies.join(", "))}}` : "";
            const projTitle = proj.url
              ? `\\href{${escapeLatex(proj.url)}}{\\underline{${escapeLatex(proj.name)}}}${techStr}`
              : `\\textbf{${escapeLatex(proj.name)}}${techStr}`;

            latex += `    \\resumeProjectHeading
      {${projTitle}}{}
      \\resumeItemListStart
`;
            proj.points.forEach((pt) => {
              latex += `        \\resumeItem{${escapeLatex(pt)}}
`;
            });
            latex += `      \\resumeItemListEnd
`;
          });
          latex += `  \\resumeSubHeadingListEnd

`;
        }
        break;

      case "skills":
        if (data.skills && data.skills.length > 0) {
          latex += `
%-----------SKILLS-----------
\\section{Skills}
`;
          data.skills.forEach((skill) => {
            latex += `\\textbf{${escapeLatex(skill.category)}:} ${escapeLatex(skill.items.join(", "))} \\\\
`;
          });
          latex += `
`;
        }
        break;

      case "certifications":
        if (data.certifications && data.certifications.length > 0) {
          latex += `
%-----------AWARDS & CERTIFICATIONS-----------
\\section{Awards \\& Certifications}
  \\resumeItemListStart
`;
          data.certifications.forEach((cert) => {
            const certStr = cert.name + (cert.issuer ? ` – ${cert.issuer}` : "") + (cert.date ? ` (${cert.date})` : "");
            latex += `    \\resumeItem{${escapeLatex(certStr)}}
`;
          });
          latex += `  \\resumeItemListEnd

`;
        }
        break;

      case "extracurriculars":
        if (data.extracurriculars && data.extracurriculars.length > 0) {
          latex += `
%-----------EXTRACURRICULAR ACTIVITIES-----------
\\section{Extracurricular Activities}
  \\resumeItemListStart
`;
          data.extracurriculars.forEach((item) => {
            latex += `    \\resumeItem{${escapeLatex(item)}}
`;
          });
          latex += `  \\resumeItemListEnd

`;
        }
        break;

      case "achievements":
        if (data.achievements && data.achievements.length > 0) {
          latex += `
%-----------ACHIEVEMENTS-----------
\\section{Achievements}
  \\resumeSubHeadingListStart
`;
          data.achievements.forEach((ach) => {
            latex += `    \\resumeProjectHeading
      {\\textbf{${escapeLatex(ach.title)}}: ${escapeLatex(ach.description)}}{${escapeLatex(ach.date)}}
`;
          });
          latex += `  \\resumeSubHeadingListEnd

`;
        }
        break;

      case "languages":
        if (data.languages && data.languages.length > 0) {
          latex += `
%-----------LANGUAGES-----------
\\section{Languages}
  \\resumeItemListStart
`;
          data.languages.forEach((l) => {
            latex += `    \\resumeItem{${escapeLatex(l.name)} -- ${escapeLatex(l.proficiency)}}
`;
          });
          latex += `  \\resumeItemListEnd

`;
        }
        break;

      case "interests":
        if (data.interests && data.interests.length > 0) {
          latex += `
%-----------INTERESTS-----------
\\section{Interests}
  \\resumeItemListStart
`;
          data.interests.forEach((item) => {
            latex += `    \\resumeItem{${escapeLatex(item)}}
`;
          });
          latex += `  \\resumeItemListEnd

`;
        }
        break;

      case "references":
        if (data.references && data.references.length > 0) {
          latex += `
%-----------REFERENCES-----------
\\section{References}
  \\resumeSubHeadingListStart
`;
          data.references.forEach((ref) => {
            latex += `    \\resumeSubheading
      {${escapeLatex(ref.name)}}{${escapeLatex(ref.company)}}
      {${escapeLatex(ref.title)}}{${escapeLatex(ref.contact)}}
`;
          });
          latex += `  \\resumeSubHeadingListEnd

`;
        }
        break;
    }
  });

  latex += `\\end{document}
`;

  return latex;
}