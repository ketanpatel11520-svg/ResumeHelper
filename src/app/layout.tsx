import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "ResumeHelper | Futuristic 3D AI Resume Builder Platform",
  description: "Create premium, ATS-optimized, high-fidelity professional resumes with real-time LaTeX compilations, responsive interactive previews, and Gemini AI career coaching. Made by KPATEL.",
  keywords: ["resume builder", "latex resume", "ATS friendly resume", "AI resume builder", "career coach", "KPATEL"],
  authors: [{ name: "KPATEL" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
