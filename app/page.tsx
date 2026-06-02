"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const journey = [
  { year: "2020", title: "Started B.Tech", desc: "Computer Engineering at Thapar University, Patiala", icon: "🎓" },
  { year: "2023", title: "BlackRock Hackathon", desc: "Runner-up among 500+ participants building fintech solutions", icon: "🥈" },
  { year: "Jan 2024", title: "Joined ION Trading", desc: "Software Engineering Intern — Angular, Cypress, Nx", icon: "🚀" },
  { year: "Jun 2024", title: "Graduated", desc: "B.Tech Computer Engineering — CGPA 8.56/10", icon: "🎓" },
  { year: "Jul 2024", title: "Promoted to SDE", desc: "Full-time Software Engineer at ION Trading, Noida", icon: "⚡" },
  { year: "2025", title: "Angular OSS Contributor", desc: "Found & reported a framework bug — acknowledged by Angular team", icon: "🐛" },
  { year: "Mar 2026", title: "Looking for Next Chapter", desc: "Open to full-stack and backend engineering roles", icon: "🔭" },
];

const experience = [
  {
    role: "Software Engineer",
    company: "ION Trading India Private Limited",
    period: "Jul 2024 – Mar 2026",
    location: "Noida, India",
    type: "Full-time",
    tags: ["Java", "Spring Boot", "Angular", "Kafka", "PostgreSQL", "GenAI", "CI/CD"],
    bullets: [
      { text: "Architected an automated OWASP ZAP-based DAST framework integrated with GitLab CI/CD and SonarQube, eliminating manual penetration testing and reducing testing effort by 55%.", metric: "55%" },
      { text: "Redesigned Java/Spring Boot service layer architecture for contingent order types in trading systems, improving order execution reliability while supporting 10000+ transactions/sec.", metric: "10000+ TPS" },
      { text: "Developed an AI-powered command interface using GenAI/LLM integration and prompt engineering to convert plain English into backend REST API actions, reducing manual work by 20% across 10,000+ financial instruments.", metric: "10K+ instruments" },
      { text: "Streamlined code review workflows using workflow automation and AI-assisted auditing, reducing code review time by 25% per PR across a team of 12 engineers.", metric: "25% faster" },
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "ION Trading India Private Limited",
    period: "Jan 2024 – Jun 2024",
    location: "Noida, India",
    type: "Internship",
    tags: ["Angular", "TypeScript", "Nx", "Cypress", "RxJS"],
    bullets: [
      { text: "Built a Cypress E2E automation framework covering 28 critical workflows, saving 144+ developer hours annually by replacing manual QA with CI/CD-driven validation.", metric: "144+ hrs/yr" },
      { text: "Engineered 10+ Angular standalone components using TypeScript and implemented Nx modularization, reducing bundle size by 23%.", metric: "23% smaller" },
      { text: "Optimized production Angular components by resolving memory leaks, reducing memory consumption by 33% and eliminating UI latency.", metric: "33% less" },
    ],
  },
];

const projects = [
  {
    name: "PostIt",
    tagline: "Social Platform at Scale",
    description: "Event-driven social platform with real-time notifications, user connections, and content feeds — built with microservices architecture and hybrid SQL/graph persistence.",
    tech: ["Java", "Spring Boot", "Spring Cloud", "Kafka", "PostgreSQL", "Neo4j", "Docker"],
    highlights: [{ label: "Microservices", value: "6" }, { label: "REST Endpoints", value: "15" }, { label: "Kafka Topics", value: "5" }],
    link: "https://github.com/gargdhiren/PostIT",
    accent: "#FF6B9D",
    featured: true,
  },
  {
    name: "AI-Document Assistant",
    tagline: "RAG-Powered Q&A",
    description: "Upload system design documents and ask questions — get context-aware answers using RAG with vector embeddings, cosine similarity, and multi-turn conversations.",
    tech: ["Java", "Spring Boot", "Spring AI", "Ollama", "PostgreSQL", "RAG"],
    highlights: [{ label: "Pipeline", value: "RAG" }, { label: "Search", value: "Vector" }, { label: "Sessions", value: "Multi-turn" }],
    link: "https://github.com/gargdhiren/DesignReviewer",
    accent: "#4ECDC4",
    featured: true,
  },
  {
    name: "Finance Guru",
    tagline: "Hackathon Winner",
    description: "Interactive financial literacy platform with quiz engine and real-time scoring — built at BlackRock Hackathon, secured Runner-up among 500+ participants.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    highlights: [{ label: "Result", value: "Runner-up" }, { label: "Participants", value: "500+" }, { label: "Scoring", value: "Real-time" }],
    link: "https://github.com/gargdhiren/Finance-Guru",
    accent: "#FFE66D",
    featured: false,
  },
  {
    name: "System Design & LLD",
    tagline: "Design Pattern Library",
    description: "Low-level design implementations of real-world systems — applying SOLID principles, GoF patterns, and scalable architecture thinking.",
    tech: ["Java", "Design Patterns", "SOLID", "OOP"],
    highlights: [{ label: "Patterns", value: "10+" }, { label: "Approach", value: "SOLID" }, { label: "Focus", value: "Scalability" }],
    link: "https://github.com/gargdhiren/Low-level-design",
    accent: "#A8E6CF",
    featured: false,
  },
];

const skillsData: Record<string, { items: string[]; icon: string }> = {
  Backend: { items: ["Java", "Spring Boot", "Spring Cloud", "REST APIs", "JPA/Hibernate", "Microservices", "Apache Kafka", "System Design"], icon: "⚙️" },
  Frontend: { items: ["Angular", "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "RxJS", "Nx"], icon: "🎨" },
  "AI / ML": { items: ["GenAI", "LLM Integration", "RAG", "Prompt Engineering", "Vector Databases", "Spring AI"], icon: "🧠" },
  "Data & Cloud": { items: ["PostgreSQL", "MySQL", "Neo4j", "AWS (EC2)", "Docker", "Docker Compose"], icon: "☁️" },
  Testing: { items: ["JUnit", "Jest", "Cypress", "Selenium", "OWASP ZAP"], icon: "🧪" },
  "DevOps & Tools": { items: ["Git", "GitLab CI/CD", "Maven", "SonarQube", "Postman", "JIRA", "Agile/Scrum"], icon: "🔧" },
};

const impactStats = [
  { value: 10000, suffix: "+", label: "Transactions/sec", desc: "High-throughput trading systems" },
  { value: 55, suffix: "%", label: "Testing Reduced", desc: "DAST automation framework" },
  { value: 144, suffix: "+", label: "Dev Hours Saved", desc: "Per year via E2E automation" },
  { value: 600, suffix: "+", label: "LeetCode Solved", desc: "DSA & C++" },
];

const achievementCards = [
  { icon: "🐛", title: "Angular OSS Contributor", desc: "Discovered and reported a bug in Angular\u2019s structural directives — acknowledged by the Angular team and tracked as a confirmed issue.", link: "https://github.com/angular/angular/issues/65666", linkText: "angular/angular#65666", accent: "#4ECDC4" },
  { icon: "🥈", title: "BlackRock Hackathon", desc: "Built Finance Guru — an interactive financial literacy platform. Runner-up among 500+ participants across India.", link: null, linkText: null, accent: "#FFE66D" },
  { icon: "💻", title: "600+ LeetCode Problems", desc: "Consistent daily problem-solving in Data Structures, Algorithms, and C++. Focus on trees, graphs, and dynamic programming.", link: "https://leetcode.com/u/dhirengarg/", linkText: "View LeetCode Profile", accent: "#A8E6CF" },
];

const contactLinks = [
  { label: "Email", value: "1234dhirengarg@gmail.com", href: "mailto:1234dhirengarg@gmail.com", icon: "📧", cta: "Send an email" },
  { label: "LinkedIn", value: "dhiren-garg", href: "https://www.linkedin.com/in/dhiren-garg/", icon: "💼", cta: "Connect with me" },
  { label: "GitHub", value: "gargdhiren", href: "https://github.com/gargdhiren", icon: "💻", cta: "See my code" },
  { label: "Phone", value: "+91-9646000949", href: "tel:+919646000949", icon: "📱", cta: "Give me a call" },
];

const navLinks = ["about", "journey", "experience", "projects", "skills", "contact"];
const heroTags = ["Java", "Spring Boot", "Angular", "TypeScript", "Kafka", "GenAI/LLM", "PostgreSQL", "Docker"];

/* ═══════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════ */

function FadeSection({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  return (
    <div ref={ref} id={id} className={className}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        {children}
      </motion.div>
    </div>
  );
}

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(value / 90);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); } else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function LeetCodeHeatmap({ username }: { username: string }) {
  const [calendarData, setCalendarData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [totalSolved, setTotalSolved] = useState(0);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        if (json.submissionCalendar) {
          const cal = typeof json.submissionCalendar === "string" ? JSON.parse(json.submissionCalendar) : json.submissionCalendar;
          setCalendarData(cal);
        }
        if (json.totalSolved) setTotalSolved(json.totalSolved);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isInView, username]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 363);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weeks: Date[][] = [];
  const cur = new Date(startDate);
  let week: Date[] = [];
  while (cur <= today) {
    week.push(new Date(cur));
    if (week.length === 7) { weeks.push(week); week = []; }
    cur.setDate(cur.getDate() + 1);
  }
  if (week.length > 0) weeks.push(week);

  const getCount = (date: Date): number => {
    const ts = Math.floor(date.getTime() / 1000);
    for (const key of Object.keys(calendarData)) {
      if (Math.abs(Number(key) - ts) < 86400) return calendarData[key];
    }
    return 0;
  };

  const getColor = (count: number): string => {
    if (count === 0) return "#161b22";
    if (count <= 2) return "#0e4429";
    if (count <= 5) return "#006d32";
    if (count <= 10) return "#26a641";
    return "#39d353";
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((w, i) => {
    const m = w[0].getMonth();
    if (m !== lastMonth) { monthLabels.push({ label: months[m], col: i }); lastMonth = m; }
  });

  // Calculate active days in last year
  let activeDays = 0;
  weeks.forEach(w => w.forEach(d => { if (getCount(d) > 0) activeDays++; }));

  return (
    <div ref={ref} className="border border-[#333] bg-[#0d1117] rounded-lg p-6 mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-black text-white">LeetCode Activity</h3>
          <a href={`https://leetcode.com/u/${username}/`} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-[#FF6B9D] uppercase tracking-wider hover:underline">
            @{username} ↗
          </a>
        </div>
        {!loading && !error && (
          <div className="flex gap-6">
            <div className="text-right">
              <div className="text-lg font-black text-white">{totalSolved || "600+"}</div>
              <div className="text-[9px] text-[#666] uppercase tracking-wider">Total Solved</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-[#26a641]">{activeDays}</div>
              <div className="text-[9px] text-[#666] uppercase tracking-wider">Active Days</div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FF6B9D] rounded-full animate-pulse" />
            <span className="text-xs text-[#666]">Loading heatmap...</span>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <p className="text-xs text-[#666] mb-2">Could not load heatmap data</p>
            <a href={`https://leetcode.com/u/${username}/`} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-[#FF6B9D] hover:underline">
              View profile on LeetCode ↗
            </a>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div style={{ minWidth: "750px" }}>
            {/* Month labels */}
            <div className="flex mb-1" style={{ paddingLeft: "32px" }}>
              {monthLabels.map((m, i) => (
                <span key={i} className="text-[9px] text-[#666] absolute" style={{ marginLeft: `${m.col * 15}px` }}>
                  {m.label}
                </span>
              ))}
            </div>
            <div style={{ height: "14px" }} />

            <div className="flex gap-0.5">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] mr-1" style={{ width: "28px" }}>
                {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                  <div key={i} className="text-[9px] text-[#666] h-[12px] flex items-center justify-end pr-1">{d}</div>
                ))}
              </div>

              {/* Heatmap grid */}
              <div className="flex gap-[3px]">
                {weeks.map((wk, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {wk.map((day, di) => {
                      const count = getCount(day);
                      const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
                      return (
                        <div
                          key={di}
                          title={`${dateStr}: ${count} submission${count !== 1 ? "s" : ""}`}
                          className="w-[12px] h-[12px] rounded-sm cursor-default hover:ring-1 hover:ring-white/40 transition-all"
                          style={{ backgroundColor: getColor(count) }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-1 mt-4">
              <span className="text-[9px] text-[#666] mr-1">Less</span>
              {[0, 2, 5, 10, 15].map((v, i) => (
                <div key={i} className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: getColor(v) }} />
              ))}
              <span className="text-[9px] text-[#666] ml-1">More</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════ */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setMounted(true);
    document.documentElement.style.scrollBehavior = "smooth";
    const handleScroll = () => {
      const reversed = [...navLinks].reverse();
      for (const s of reversed) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= 120) { setActiveSection(s); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#FAFAF8]" />;

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1a1a1a] overflow-x-hidden" style={{ fontFamily: "'IBM Plex Mono', 'JetBrains Mono', 'Courier New', monospace" }}>

      <motion.div style={{ width: progressWidth }} className="fixed top-0 left-0 h-[3px] bg-[#FF6B9D] z-[60]" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <a href="#about" className="font-black text-lg tracking-tight hover:text-[#FF6B9D] transition-colors">DG<span className="text-[#FF6B9D]">.</span></a>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((s) => (<a key={s} href={`#${s}`} className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all rounded ${activeSection === s ? "bg-[#1a1a1a] text-white" : "hover:bg-[#f0f0f0]"}`}>{s}</a>))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-[10px] font-bold bg-green-100 text-green-800 border border-green-300 px-2 py-1 rounded-full animate-pulse">● OPEN TO WORK</span>
            <a href="https://drive.google.com/file/d/1uoFo3oyyJbVTlkLfkpK4RZLbHgUpPNUC/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-xs font-bold border-2 border-[#1a1a1a] px-3 py-1.5 hover:bg-[#1a1a1a] hover:text-white transition-all">RESUME ↗</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5">
            <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
            <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t-2 border-[#1a1a1a] bg-white px-6 py-4 space-y-3">
            {navLinks.map((s) => (<a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)} className="block text-sm font-bold uppercase hover:text-[#FF6B9D]">{s}</a>))}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
              <span className="text-[10px] font-bold bg-green-100 text-green-800 border border-green-300 px-2 py-1 rounded-full">● OPEN TO WORK</span>
              <a href="https://drive.google.com/file/d/169wtkSr1N4Ygf0PWCa52bJbD8jzySsVL/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-xs font-bold border-2 border-[#1a1a1a] px-3 py-1.5">RESUME ↗</a>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section id="about" className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF6B9D] mb-3">Full-Stack Software Engineer</p>
              <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter">
                DHIREN<br />
                <span className="relative inline-block">GARG
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none"><path d="M2 8 C50 2, 150 2, 198 8" stroke="#FF6B9D" strokeWidth="4" strokeLinecap="round" /></svg>
                </span>
              </h1>
            </motion.div>
            <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-8 text-sm leading-relaxed max-w-lg text-[#555]">
              I build systems that handle pressure. 2 years at{" "}
              <span className="font-bold text-[#1a1a1a]">ION Trading</span> — engineering microservices for trading platforms processing{" "}
              <span className="font-bold text-[#1a1a1a] bg-yellow-100 px-1">10000+ transactions/sec</span>.
              From event-driven architecture to GenAI-powered interfaces, I turn complex problems into production-ready solutions.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="flex flex-wrap gap-2 mt-6">
              {heroTags.map((s, i) => (<span key={i} className="text-[10px] font-bold border border-[#ddd] px-2 py-1 rounded bg-white hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all cursor-default">{s}</span>))}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="flex flex-wrap gap-3 mt-8">
              <a href="#contact" className="text-xs font-bold bg-[#1a1a1a] text-white px-5 py-2.5 hover:bg-[#FF6B9D] transition-colors">GET IN TOUCH</a>
              <a href="#projects" className="text-xs font-bold border-2 border-[#1a1a1a] px-5 py-2.5 hover:bg-[#1a1a1a] hover:text-white transition-all">VIEW PROJECTS</a>
              <a href="https://drive.google.com/file/d/169wtkSr1N4Ygf0PWCa52bJbD8jzySsVL/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-xs font-bold border-2 border-[#FF6B9D] text-[#FF6B9D] px-5 py-2.5 hover:bg-[#FF6B9D] hover:text-white transition-all">DOWNLOAD RESUME</a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} className="mt-8 text-xs text-[#999]">
              🎓 Thapar University • B.Tech Computer Engineering • CGPA 8.56/10 • Class of 2024
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="hidden md:block relative">
            <div className="w-[280px] h-[340px] border-2 border-[#1a1a1a] overflow-hidden relative bg-[#f0f0f0]">
              <img src="/image.jpeg" alt="Dhiren Garg" className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] text-white px-4 py-2 text-[10px] font-bold tracking-wider">SDE @ ION TRADING • 2024–2026</div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-[#FF6B9D] -z-10" />
          </motion.div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {impactStats.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.15, duration: 0.5 }} className="border border-[#e0e0e0] bg-white p-5 hover:border-[#1a1a1a] transition-colors group">
              <div className="text-3xl font-black group-hover:text-[#FF6B9D] transition-colors"><AnimatedCounter value={m.value} suffix={m.suffix} /></div>
              <div className="text-[10px] font-bold uppercase tracking-wider mt-1">{m.label}</div>
              <div className="text-[10px] text-[#999] mt-0.5">{m.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ JOURNEY ═══════ */}
      <FadeSection id="journey" className="py-20 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B9D] mb-2">My Path</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12">JOURNEY</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#333]" />
            {journey.map((item, i) => (
              <div key={i} className={`relative flex items-start mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                  <p className="text-xs font-bold text-[#FF6B9D] uppercase tracking-wider">{item.year}</p>
                  <h3 className="text-sm font-black mt-1">{item.title}</h3>
                  <p className="text-xs text-[#888] mt-1">{item.desc}</p>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1a1a1a] border-2 border-[#FF6B9D] flex items-center justify-center text-sm z-10">{item.icon}</div>
                <div className="md:hidden pl-14">
                  <p className="text-xs font-bold text-[#FF6B9D] uppercase tracking-wider">{item.year}</p>
                  <h3 className="text-sm font-black mt-1">{item.title}</h3>
                  <p className="text-xs text-[#888] mt-1">{item.desc}</p>
                </div>
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ═══════ EXPERIENCE ═══════ */}
      <FadeSection id="experience" className="py-20 px-6 bg-white border-t border-b border-[#e8e8e8]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B9D] mb-2">Work History</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">EXPERIENCE</h2>
          <p className="text-sm text-[#888] mb-12 max-w-lg">2 years at ION Trading building high-throughput trading systems, from intern to full-time engineer.</p>
          <div className="space-y-16">
            {experience.map((exp, i) => (
              <div key={i} className="grid md:grid-cols-[220px_1fr] gap-8">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[#f0f0f0] border border-[#ddd] px-2 py-0.5 rounded">{exp.type}</span>
                  <p className="text-xs font-bold text-[#999] uppercase mt-3">{exp.period}</p>
                  <p className="text-xs text-[#bbb] mt-1">{exp.location}</p>
                </div>
                <div>
                  <h3 className="text-xl font-black">{exp.role}</h3>
                  <p className="text-sm text-[#777] mb-4">{exp.company}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {exp.tags.map((t, j) => (<span key={j} className="text-[10px] font-bold bg-[#f5f5f5] border border-[#e0e0e0] px-2 py-0.5 rounded">{t}</span>))}
                  </div>
                  <ul className="space-y-4">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-4 group">
                        <span className="text-[#FF6B9D] font-bold mt-0.5 shrink-0">—</span>
                        <p className="text-sm leading-relaxed text-[#444] flex-1">{bullet.text}</p>
                        <span className="hidden md:block shrink-0 text-[9px] font-black uppercase tracking-wider text-[#ccc] group-hover:text-[#FF6B9D] transition-colors mt-1 w-24 text-right">{bullet.metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ═══════ PROJECTS ═══════ */}
      <FadeSection id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B9D] mb-2">What I&apos;ve Built</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">PROJECTS</h2>
          <p className="text-sm text-[#888] mb-12 max-w-lg">Side projects where I experiment with architecture, AI, and scale.</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {projects.filter(p => p.featured).map((p, i) => (
              <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="group block border-2 border-[#e0e0e0] bg-white p-8 hover:border-[#1a1a1a] hover:-translate-y-1 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full" style={{ background: p.accent }} />
                <span className="text-[9px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded" style={{ background: p.accent }}>Featured</span>
                <div className="flex items-start justify-between mt-4 mb-1">
                  <h3 className="text-xl font-black">{p.name}</h3>
                  <span className="text-sm text-[#999] group-hover:text-[#1a1a1a] transition-colors">↗</span>
                </div>
                <p className="text-xs font-bold text-[#999] uppercase tracking-wider mb-3">{p.tagline}</p>
                <p className="text-xs text-[#666] leading-relaxed mb-5">{p.description}</p>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {p.highlights.map((h, j) => (<div key={j} className="text-center"><div className="text-lg font-black">{h.value}</div><div className="text-[9px] text-[#999] uppercase tracking-wider">{h.label}</div></div>))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t, j) => (<span key={j} className="text-[9px] font-bold bg-[#f8f8f8] border border-[#eee] px-1.5 py-0.5 rounded">{t}</span>))}
                </div>
              </a>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.filter(p => !p.featured).map((p, i) => (
              <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="group block border-2 border-[#e0e0e0] bg-white p-6 hover:border-[#1a1a1a] hover:-translate-y-1 transition-all relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full group-hover:w-1.5 transition-all" style={{ background: p.accent }} />
                <div className="flex items-start justify-between mb-1"><h3 className="text-base font-black">{p.name}</h3><span className="text-xs text-[#999] group-hover:text-[#1a1a1a] transition-colors">↗</span></div>
                <p className="text-xs font-bold text-[#999] uppercase tracking-wider mb-2">{p.tagline}</p>
                <p className="text-xs text-[#666] leading-relaxed mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t, j) => (<span key={j} className="text-[9px] font-bold bg-[#f8f8f8] border border-[#eee] px-1.5 py-0.5 rounded">{t}</span>))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ═══════ SKILLS ═══════ */}
      <FadeSection id="skills" className="py-20 px-6 bg-white border-t border-b border-[#e8e8e8]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B9D] mb-2">Technical Stack</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">SKILLS</h2>
          <p className="text-sm text-[#888] mb-12 max-w-lg">Full-stack toolkit refined through trading systems, AI integration, and open-source contribution.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skillsData).map(([category, data], i) => (
              <div key={i} className="border border-[#e8e8e8] p-5 hover:border-[#1a1a1a] transition-colors">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">{data.icon}</span>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF6B9D]">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.items.map((s, j) => (<span key={j} className="text-xs font-medium border border-[#ddd] bg-[#fafafa] px-2.5 py-1 rounded cursor-default hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all">{s}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ═══════ ACHIEVEMENTS + HEATMAP ═══════ */}
      <FadeSection className="py-20 px-6 bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B9D] mb-2">Recognition</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12">ACHIEVEMENTS</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {achievementCards.map((a, i) => (
              <div key={i} onClick={() => a.link && window.open(a.link)} className={`border border-[#333] bg-[#161b22] p-6 hover:border-[#FF6B9D] hover:-translate-y-1 transition-all relative overflow-hidden ${a.link ? "cursor-pointer" : "cursor-default"}`}>
                <div className="absolute top-0 left-0 w-full h-1" style={{ background: a.accent }} />
                <div className="text-3xl mb-4 mt-2">{a.icon}</div>
                <h3 className="text-sm font-black mb-2">{a.title}</h3>
                <p className="text-xs text-[#888] leading-relaxed">{a.desc}</p>
                {a.linkText && (<p className="text-[10px] font-bold text-[#FF6B9D] mt-3 uppercase tracking-wider">{a.linkText} ↗</p>)}
              </div>
            ))}
          </div>

          {/* LEETCODE HEATMAP */}
          <LeetCodeHeatmap username="dhirengarg" />
        </div>
      </FadeSection>

      {/* ═══════ CONTACT ═══════ */}
      <FadeSection id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B9D] mb-2">Get in Touch</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">LET&apos;S BUILD<br />SOMETHING GREAT</h2>
          <p className="text-sm text-[#888] mb-12 max-w-md">Currently open to full-stack and backend engineering roles. I bring 2 years of trading systems experience, a strong DSA foundation, and a passion for building at scale.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contactLinks.map((c, i) => (
              <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block border-2 border-[#e0e0e0] p-5 hover:border-[#1a1a1a] hover:-translate-y-1 transition-all group">
                <div className="text-2xl mb-3">{c.icon}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#999] group-hover:text-[#FF6B9D] transition-colors">{c.label}</div>
                <div className="text-xs font-medium mt-1 text-[#666] group-hover:text-[#1a1a1a] transition-colors break-all">{c.value}</div>
                <p className="text-[9px] text-[#bbb] mt-2 group-hover:text-[#FF6B9D] transition-colors">{c.cta} →</p>
              </a>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* FOOTER */}
      <div className="border-t border-[#e0e0e0] px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#999] font-medium">© 2026 Dhiren Garg. Crafted with Next.js & Framer Motion.</p>
          <div className="flex gap-4">
            {[
              { label: "LinkedIn", href: "https://www.linkedin.com/in/dhiren-garg/" },
              { label: "GitHub", href: "https://github.com/gargdhiren" },
              { label: "LeetCode", href: "https://leetcode.com/u/dhirengarg/" },
            ].map((l, i) => (<a key={i} href={l.href} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-[#999] hover:text-[#FF6B9D] uppercase tracking-wider transition-colors">{l.label}</a>))}
          </div>
        </div>
      </div>
    </div>
  );
}
