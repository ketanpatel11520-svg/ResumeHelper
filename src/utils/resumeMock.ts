export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  profilePhoto: string;
  objective: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  gpa: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  tools: string;
  points: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url: string;
  points: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  title: string;
  company: string;
  contact: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  extracurriculars: string[];
  languages: LanguageItem[];
  interests: string[];
  references: ReferenceItem[];
  selectedTemplate: string;
  themeColor: string;
  sectionOrder: string[];
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "Ketan Patel",
    title: "Computer Science Student",
    email: "ketanpatel11520@gmail.com",
    phone: "+91-9669890980",
    location: "Indore, M.P.",
    website: "",
    github: "",
    linkedin: "linkedin.com/in/ketan-patel-243887395",
    profilePhoto: "",
    objective: "Motivated computer science student with a strong foundation in analytical thinking, data handling, and technical operations. Experienced in computer systems and communication workflows, seeking to contribute effectively in an entry-level technical or operations role.",
  },
  education: [
    {
      id: "edu-1",
      institution: "Sushila Devi Bansal College Of Technology (SDBCT), Indore (M.P)",
      degree: "B.Tech. Computer Science",
      fieldOfStudy: "",
      location: "",
      gpa: "",
      startDate: "Present",
      endDate: "",
      description: "",
    },
    {
      id: "edu-2",
      institution: "Aksa International Institute, Indore (M.P)",
      degree: "Diploma in Aviation",
      fieldOfStudy: "",
      location: "",
      gpa: "",
      startDate: "Completed: 2024",
      endDate: "",
      description: "",
    },
    {
      id: "edu-3",
      institution: "Oxford Academy H.S School / MP Board, Indore",
      degree: "Higher Secondary (Class 12th)",
      fieldOfStudy: "",
      location: "",
      gpa: "",
      startDate: "2022",
      endDate: "2023",
      description: "",
    },
    {
      id: "edu-4",
      institution: "New Era Academy School / MP Board, Indore",
      degree: "High School (Class 10th)",
      fieldOfStudy: "",
      location: "",
      gpa: "",
      startDate: "2020",
      endDate: "2021",
      description: "",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "PrimeOne Private LTD. MPEB Colony, Pologround, Indore (M.P.)",
      position: "Computer Operations Specialist",
      location: "",
      startDate: "May 2023",
      endDate: "Present",
      tools: "Tools Used: Excel, SQL, Relevant Software",
      points: [
        "Processed and standardized a dataset of over 100,000 rows. Assisted in monitoring and maintaining computer systems and network operations, performing routine backups, troubleshooting hardware and software issues, and supporting IT teams to ensure reliable and efficient business operations.",
        "Managed digital databases and administrative files accurately. Operated computer systems and supported daily office operations. Provided basic IT troubleshooting and ensured data security.",
      ],
    },
    {
      id: "exp-2",
      company: "Teaching Experience. Maharana Pratap Nagar, Indore (M.P.)",
      position: "Private Tutor – Self-Employed",
      location: "",
      startDate: "June 2023",
      endDate: "Present",
      tools: "Subjects: Class 1 to 9 (All Major Subjects)",
      points: [
        "Provide personalized tuition to students from Classes 1–9, focusing on conceptual clarity, academic improvement, and confidence building.",
        "Design and implement tailored lesson plans, conduct regular assessments, and track student progress.",
      ],
    },
  ],
  projects: [],
  skills: [
    {
      id: "skill-1",
      category: "Technical Skills",
      items: ["Basic C", "Python", "HTML", "VBA", "Advanced MS Excel", "MS Word", "MS PowerPoint"],
    },
    {
      id: "skill-2",
      category: "Soft Skills",
      items: ["Communication", "Leadership", "Teamwork", "Adaptability"],
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Google Data Analytics Certificate",
      issuer: "Great Learning Academy",
      date: "May 2023",
      url: "",
    },
    {
      id: "cert-2",
      name: "Series Winner Trophy – Interhouse Cricket Tournament",
      issuer: "",
      date: "2023",
      url: "",
    },
    {
      id: "cert-3",
      name: "Participation Certificate – Interhouse Cricket Match",
      issuer: "",
      date: "2023",
      url: "",
    },
  ],
  achievements: [],
  extracurriculars: ["Swimming", "Operations and Safety Protocols Training", "Fire and Safety Certification", "Sports"],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Fluent" },
    { id: "lang-2", name: "French", proficiency: "Basic" },
    { id: "lang-3", name: "Hindi", proficiency: "Native" },
  ],
  interests: [],
  references: [],
  selectedTemplate: "classic-latex",
  themeColor: "#00f0ff",
  sectionOrder: [
    "objective",
    "education",
    "skills",
    "experience",
    "certifications",
    "extracurriculars",
    "languages",
  ],
};