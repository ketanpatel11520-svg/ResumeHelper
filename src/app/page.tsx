"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, ChevronRight, Send, HelpCircle, Mail, Cpu,
  ChevronUp, ChevronDown, ShieldCheck, Terminal, FileText
} from "lucide-react";
import Hero3D from "@/components/Hero3D";

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: "", email: "", message: "" });
      setFormSubmitted(false);
      alert("AI Synced! Your message has been routed to KPATEL secure node.");
    }, 1500);
  };

  const faqs = [
    {
      q: "What makes ResumeHelper resumes highly ATS-friendly?",
      a: "Unlike generic builders that export flat canvas/raster images wrapped in PDFs, ResumeHelper outputs true unrasterized, copy-pasteable vector PDFs using browser print engine standard styles, alongside raw LaTeX (.tex) source code files. This guarantees 100% parsing fidelity with Applicant Tracking Systems."
    },
    {
      q: "How does the AI Bullet Points polisher work?",
      a: "Our AI engine is connected directly to Google's advanced Gemini API. By clicking the sparkle icon next to any project or job description, the AI translates raw tasks into high-impact, metrics-driven bullet points utilizing industry-specific action verbs."
    },
    {
      q: "Is my personal data securely stored?",
      a: "Absolutely. All resume edits are persisted locally on your device's secure browser LocalStorage. No confidential text is stored on external databases without your explicit permission, keeping your data entirely private."
    },
    {
      q: "Can I import this into Overleaf or another LaTeX compiler?",
      a: "Yes! ResumeHelper provides a direct 'LaTeX Exporter' that synthesizes a clean, standard, and highly commented .tex file based on Jake's template. You can copy-paste it straight into Overleaf or run it locally."
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#080710] text-[#f3f4f6] font-sans overflow-x-hidden cyber-grid">
      <Hero3D />

      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#080710]/75 backdrop-blur-md px-6 py-4 flex justify-between items-center select-none no-print">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2 rounded-lg text-white font-extrabold shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <Cpu size={18} className="group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <span className="font-display font-black text-lg tracking-wider text-white">ResumeHelper</span>
            <span className="text-[8.5pt] block text-cyan-400 font-bold uppercase tracking-widest leading-none">AI synthesis engine</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-[#131126] border border-cyan-500/20 px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.05)]">
            <span className="text-[7.5pt] uppercase tracking-widest text-gray-400 font-bold mr-1.5">Engineering Node:</span>
            <span className="text-[8.5pt] font-black text-cyan-400 font-display tracking-widest animate-pulse">Made By KPATEL</span>
          </div>
          <Link
            href="/builder"
            className="relative inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-purple-650 hover:from-cyan-400 hover:to-purple-550 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.25)] transition hover:scale-105"
          >
            Start Synthesizing
            <ChevronRight size={14} />
          </Link>
        </div>
      </nav>

      <div className="sm:hidden w-full flex justify-center pt-4 px-6 no-print select-none">
        <div className="bg-[#131126]/80 border border-cyan-500/10 px-4 py-1.5 rounded-full flex items-center gap-2">
          <span className="text-[7pt] uppercase tracking-widest text-gray-400 font-semibold">Creator Signature:</span>
          <span className="text-[8pt] font-black text-cyan-400 tracking-wider">Made By KPATEL</span>
        </div>
      </div>

      {/* BIG RESUMEHELPER NAME */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-4 md:pt-16 md:pb-6 flex flex-col items-center text-center no-print">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white font-display uppercase leading-none select-none">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-purple-650 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(0,240,255,0.25)]">
              ResumeHelper
            </span>
          </h1>
          <p className="text-cyan-400 text-sm md:text-base font-bold uppercase tracking-[0.3em] mt-2">
            AI Resume Synthesis Engine
          </p>
        </motion.div>
      </section>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-4 pb-20 md:pt-8 md:pb-28 flex flex-col items-center text-center no-print">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-purple-950/40 border border-purple-500/30 px-3 py-1 rounded-full text-purple-300 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-1.5 shadow-[0_0_15px_rgba(157,78,221,0.15)]"
        >
          <Sparkles size={13} className="animate-spin text-purple-400" />
          Quantum synthesis active
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white font-display uppercase leading-none max-w-4xl"
        >
          Synthesize Your <br />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-purple-650 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,240,255,0.15)]">
            Futuristic Career
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mt-6 font-medium leading-relaxed"
        >
          Create highly optimized, ATS-grade resumes featuring clean LaTeX code compilers, responsive interactive previews, and Gemini AI career coaching.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center items-center mt-10"
        >
          <Link
            href="/builder"
            className="bg-gradient-to-r from-cyan-500 to-purple-650 hover:from-cyan-400 hover:to-purple-550 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-[0_0_25px_rgba(0,240,255,0.35)] transition hover:scale-105 flex items-center gap-2"
          >
            <Sparkles size={16} />
            SYNTHESIZE NEW RESUME
          </Link>
          <a
            href="#features"
            className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition"
          >
            Explore Features
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 w-full max-w-lg rounded-lg border border-cyan-500/25 bg-[#02010a] p-3 text-left font-mono text-[9pt] text-[#00f0ff] shadow-[0_5px_25px_rgba(0,240,255,0.1)] opacity-85 select-none hidden md:block"
        >
          <div className="flex gap-1.5 border-b border-cyan-500/10 pb-2 mb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/40"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/40"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/40"></span>
            <span className="text-[7.5pt] text-gray-500 uppercase tracking-widest pl-2">System Terminal</span>
          </div>
          <p className="text-gray-400"># kpatel-engine initializing backend nodes...</p>
          <p className="text-purple-400">{">"} Loading templates schema: classic-latex, modern-minimal, cyber-tech</p>
          <p className="text-cyan-400">{">"} Gemini AI Bullet Enhancer fully synced. Ready to compile.</p>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/5 no-print">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">SYSTEM SPECIFICATIONS</span>
          <h2 className="text-3xl md:text-5xl font-black font-display uppercase text-white tracking-tight mt-2">
            Architected for ATS Superiority
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto mt-3">
            Designed with advanced vector rendering pipelines and contextual AI parameters to bypass automated filters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel glass-panel-hover p-6 flex flex-col gap-3.5 relative overflow-hidden">
            <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20 text-cyan-400 self-start">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">ATS Compatible</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Synthesizes crisp, unrasterized vector text. High semantic fidelity scores 100% on standard corporate parsing indices.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-6 flex flex-col gap-3.5 relative overflow-hidden">
            <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20 text-cyan-400 self-start">
              <Terminal size={20} />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">LaTeX Synthesizer</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Compiles data structures directly into valid Overleaf-compliant LaTeX (.tex) packages, completely escaped for compiling.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-6 flex flex-col gap-3.5 relative overflow-hidden">
            <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-purple-400 self-start">
              <Sparkles size={20} />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">AI Bullet Polisher</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Translates draft statements into action-verb-rich descriptions utilizing active Gemini contextual processing.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-6 flex flex-col gap-3.5 relative overflow-hidden">
            <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-purple-400 self-start">
              <FileText size={20} />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">AI Chat Assistant</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Provides granular, real-time advice regarding skills layout and experiences based on recruiter-vetted guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* TEMPLATE SHOWCASE */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 border-t border-white/5 no-print">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest font-display">SELECTION MATRIX</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight mt-1.5">
            Premium Archetype Templates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel overflow-hidden group flex flex-col">
            <div className="bg-white p-6 h-64 border-b border-white/5 flex justify-center items-start overflow-hidden relative">
              <div className="w-full text-black font-serif text-[7.5px] leading-relaxed scale-95 origin-top shadow-md border border-gray-150 p-4 bg-white">
                <div className="text-center font-bold text-[14px] uppercase">KARAN PATEL</div>
                <div className="text-center text-[7px] text-gray-700">karan.patel@kpatel.dev | San Francisco, CA</div>
                <div className="border-b border-black uppercase font-bold text-[8.5px] mt-2 mb-1">Education</div>
                <div className="flex justify-between font-bold"><span>UC Berkeley</span><span>2018 - 2022</span></div>
                <div className="italic">BS in Computer Science</div>
                <div className="border-b border-black uppercase font-bold text-[8.5px] mt-2 mb-1">Experience</div>
                <div className="flex justify-between font-bold"><span>Synthetix AI Systems</span><span>2024 - Present</span></div>
                <div className="italic">Lead Full Stack Developer</div>
                <ul className="list-disc pl-3"><li>Architected real-time Next.js matrix simulations...</li></ul>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <Link href="/builder" className="bg-cyan-550 hover:bg-cyan-500 px-4 py-2 text-xs font-bold rounded-lg text-white">Select Layout</Link>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-white uppercase text-base mb-1.5">Classic LaTeX</h4>
                <p className="text-gray-400 text-xs leading-relaxed">The gold-standard academic and industry ATS template. Styled after classic Times Overleaf distributions.</p>
              </div>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mt-4">Highly Recommended for tech</span>
            </div>
          </div>

          <div className="glass-panel overflow-hidden group flex flex-col">
            <div className="bg-gray-100 p-6 h-64 border-b border-white/5 flex justify-center items-start overflow-hidden relative">
              <div className="w-full text-gray-800 font-sans text-[7.5px] leading-relaxed scale-95 origin-top shadow-md border border-gray-150 p-4 bg-white">
                <div className="border-b-2 border-cyan-800 pb-2 mb-2 flex justify-between">
                  <div>
                    <div className="font-bold text-[13px] text-gray-950">KARAN PATEL</div>
                    <div className="text-[7.5px] text-cyan-800 uppercase tracking-widest font-semibold">Lead Developer</div>
                  </div>
                  <div className="text-right text-[6.5px]">karan.patel@kpatel.dev</div>
                </div>
                <div className="grid grid-cols-[30px_1fr] gap-2">
                  <div className="text-[7px] font-bold text-cyan-800 uppercase border-r pr-1 text-right">History</div>
                  <div>
                    <div className="font-bold">Synthetix AI Systems</div>
                    <ul className="list-disc pl-2"><li>Led Next.js systems architecture optimization...</li></ul>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <Link href="/builder" className="bg-cyan-550 hover:bg-cyan-500 px-4 py-2 text-xs font-bold rounded-lg text-white">Select Layout</Link>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-white uppercase text-base mb-1.5">Modern Minimalist</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Clean, border-grid sans-serif structure. Best for designers, creative developers, and modern startups.</p>
              </div>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mt-4">Contemporary & Sleek</span>
            </div>
          </div>

          <div className="glass-panel overflow-hidden group flex flex-col">
            <div className="bg-[#02010a] p-6 h-64 border-b border-white/5 flex justify-center items-start overflow-hidden relative">
              <div className="w-full text-cyan-900 font-mono text-[7px] leading-relaxed scale-95 origin-top shadow-md border border-cyan-500/20 p-4 bg-white">
                <div className="border border-cyan-500 bg-cyan-50/30 p-2 rounded mb-2 relative">
                  <div className="font-bold text-[11px] text-black">KARAN PATEL</div>
                  <div className="text-[6.5px] text-purple-750 font-bold">[ SENIOR FULL STACK ]</div>
                </div>
                <div className="text-[7.5px] font-bold border-b border-cyan-500 uppercase mt-1 mb-1">// EXPERIENCE.LOG</div>
                <div className="border-l border-cyan-400 pl-2">
                  <div className="font-bold">Synthetix AI</div>
                  <p>Lead websocket-Next.js scaling efforts...</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <Link href="/builder" className="bg-cyan-550 hover:bg-cyan-500 px-4 py-2 text-xs font-bold rounded-lg text-white">Select Layout</Link>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-white uppercase text-base mb-1.5">Cyber Tech</h4>
                <p className="text-gray-400 text-xs leading-relaxed">High contrast monospaced digital layout. Specifically calibrated for cybersecurity, sysops, or web3 roles.</p>
              </div>
              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-4">Futuristic & Cybernetic</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16 border-t border-white/5 no-print">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">HELP SYSTEM</span>
          <h2 className="text-3xl md:text-5xl font-black font-display uppercase text-white tracking-tight mt-1">
            Faq Directory
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel overflow-hidden transition-all duration-300 bg-[#0c0a1a]/40"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-4 flex justify-between items-center text-left text-sm md:text-base font-bold text-white uppercase hover:bg-white/5 transition"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle size={16} className="text-cyan-400" />
                  {faq.q}
                </span>
                {activeFaq === idx ? <ChevronUp size={16} className="text-cyan-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-5 pt-2 border-t border-white/5 text-gray-300 text-xs md:text-sm leading-relaxed bg-[#06050f]/60 font-medium">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-20 border-t border-white/5 no-print">
        <div className="glass-panel p-8 relative overflow-hidden bg-gradient-to-br from-[#0c0a1a] to-[#120822] border-purple-500/25">
          <div className="text-center mb-6">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Mail size={13} />
              Secure Data Transceiver
            </span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight font-display mt-2">
              Contact KPATEL Node
            </h3>
            <p className="text-gray-400 text-xs mt-1.5">Have custom design requests or engineering inquiries? Send a secure ping packet.</p>
          </div>

          <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase">Name / Node</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full bg-[#151326] border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-400 transition"
                  placeholder="Guest Recruiter"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-gray-400 font-bold uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full bg-[#151326] border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-400 transition"
                  placeholder="contact@company.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase">Message Stream</label>
              <textarea
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full bg-[#151326] border border-white/10 rounded-lg p-3 text-white text-xs focus:outline-none focus:border-purple-400 transition"
                placeholder="Type your transmission packets here..."
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-650 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-2.5 rounded-lg text-xs transition uppercase flex items-center justify-center gap-1.5 mt-2 tracking-widest shadow-md"
            >
              <Send size={13} />
              Transmit Ping Packet
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-[#04030a] py-8 text-center text-xs text-gray-500 no-print select-none">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Cpu size={14} className="text-cyan-400" />
            <span className="text-gray-400 font-semibold uppercase tracking-wider">ResumeHelper © 2026</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500 uppercase text-[10px] tracking-wider">Designed & Engineered by</span>
            <span className="text-cyan-400 font-display font-extrabold tracking-widest bg-cyan-950/20 border border-cyan-500/15 px-2 py-0.5 rounded text-[11px] hover:text-white transition duration-300">
              KPATEL
            </span>
          </div>
          <div className="flex gap-4 text-gray-400 font-semibold">
            <Link href="/builder" className="hover:text-cyan-400 transition">Builder Console</Link>
            <span>|</span>
            <span className="text-gray-650">Quantum Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}