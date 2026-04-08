"use client";

import React from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const projects = [
  {
    name: "🤖 AI System Design Assistant",
    tech: "Java, Spring Boot, Spring AI, PostgreSQL, RAG",
    points: [
      "Conversational AI for system design",
      "Implemented RAG pipeline",
      "Built scalable backend APIs",
    ],
    link: "https://github.com/gargdhiren/DesignReviewer",
  },
  {
    name: "🏀 Basketball Wiki",
    tech: "React, APIs",
    points: [
      "Sports encyclopedia platform",
      "Dynamic API-based content",
      "Responsive UI",
    ],
    link: "https://github.com/gargdhiren/basketballwiki",
  },
  {
    name: "💰 Finance Guru",
    tech: "JavaScript",
    points: [
      "BlackRock hackathon project",
      "Interactive quiz engine",
      "Real-time scoring",
    ],
    link: "https://github.com/gargdhiren/Finance-Guru",
  },
  {
    name: "🌿 Leaf-O-Clean",
    tech: "IoT + Web",
    points: [
      "Smart cleaning automation system",
      "Sensor-based logic",
      "Final year project",
    ],
    link: "https://github.com/gargdhiren/Leaf-O-Clean",
  },
  {
    name: "🧠 System Design & LLD",
    tech: "Design Patterns",
    points: [
      "Low-level design implementations",
      "Applied design patterns",
      "Scalable architecture concepts",
    ],
    link: "https://github.com/gargdhiren/Low-level-design",
  },
];

export default function Portfolio() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    window.addEventListener("mousemove", (e) => {
      if (cursor) cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }, []);

  return (
    <div className="bg-[#f3f3f3] min-h-screen font-mono text-black">
      <div id="cursor" className="fixed w-3 h-3 bg-black rounded-full pointer-events-none z-50"></div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 border-b-4 border-black bg-white">

  {/* LEFT: Logo / Name */}
  
  {/* CENTER: Navigation */}
  <div className="hidden md:flex gap-6 text-sm font-bold">
    <a href="#about" className="hover:underline">ABOUT</a>
    <a href="#experience" className="hover:underline">EXPERIENCE</a>
    <a href="#projects" className="hover:underline">PROJECTS</a>
    <a href="#skills" className="hover:underline">SKILLS</a>
    <a href="#contact" className="hover:underline">CONTACT</a>
  </div>

  {/* RIGHT: Actions */}
  <div className="flex items-center gap-3">

    {/* Open to work badge */}
    <div className="bg-green-300 border-2 border-black px-2 py-1 text-xs font-bold shadow-[3px_3px_0px_black]">
      🟢 Open to Work
    </div>

    {/* Resume button */}
    <motion.button
      whileHover={{ scale: 1.05, rotate: -1 }}
      onClick={() => window.open("https://drive.google.com/file/d/169wtkSr1N4Ygf0PWCa52bJbD8jzySsVL/view?usp=sharing")}
      className="font-bold text-sm border-2 border-black px-3 py-1 shadow-[4px_4px_0px_black] hover:bg-yellow-200 transition"
    >
      📄 Resume
    </motion.button>

  </div>

</nav>


{/* ABOUT (HERO STYLE) */}
<section id="about" className="px-8 py-20 border-b-4 border-black bg-[#f3f3f3] relative overflow-hidden">

  {/* BACKGROUND STRIPES */}
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
    <div className="absolute top-0 left-0 w-40 h-full bg-pink-400"></div>
    <div className="absolute top-0 left-40 w-60 h-full bg-cyan-400 rotate-12 origin-left"></div>
    <div className="absolute top-0 right-0 w-60 h-full bg-yellow-300 rotate-[-12deg] origin-right"></div>
  </div>

  <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <div>

      {/* NAME */}
      <h1 className="text-[64px] font-black leading-tight">
        <span className="text-black drop-shadow-[4px_4px_0px_#ff00aa]">
          DHIREN GARG
        </span>
      </h1>

      {/* SUBTITLE */}
      <p className="mt-4 text-lg font-medium">
        Software Engineer • Full stack • Distributed Systems • CI/CD • AI
      </p>

      {/* HIGHLIGHT CARD */}
  <div className="mt-6 border-4 border-black bg-white p-5 shadow-[8px_8px_0px_black] max-w-md">
  <p className="text-sm leading-relaxed">
    I build scalable, high-performance systems using Angular and Spring Boot, 
    with a focus on microservices and event-driven architecture.

    {" "}I enjoy solving{" "}
    <span
      onClick={() => window.open("https://leetcode.com/u/dhirengarg/")}
      className="font-bold underline cursor-pointer hover:bg-pink-200 px-1"
    >
      complex problems (500+ LeetCode)
    </span>{" "}
    and{" "}
    <span
      onClick={() => window.open("https://github.com/gargdhiren/Low-level-design")}
      className="font-bold underline cursor-pointer hover:bg-yellow-200 px-1"
    >
      designing scalable systems
    </span>.
  </p>
</div>

      {/* ACTION BUTTONS */}

      {/* EDUCATION TAG */}
      <div className="mt-6 inline-block border-4 border-black bg-yellow-200 px-4 py-2 font-bold shadow-[4px_4px_0px_black]">
        🎓Thapar University • B.E. in Computer Engineering • 2020 - 2024 • CGPA 8.5
      </div>

      
    </div>

    {/* RIGHT PHOTO (COOL SHAPE) */}
<div className="relative flex justify-center items-center">

  {/* BACK LAYER */}
  <div className="absolute w-[280px] h-[340px] bg-yellow-300 border-4 border-black rounded-[30%] rotate-3"></div>

  {/* MAIN CARD */}
  <motion.div
    whileHover={{ rotate: 0, scale: 1.03 }}
    className="relative w-[280px] h-[340px] border-4 border-black rounded-[30%] overflow-hidden bg-white shadow-[8px_8px_0px_black] -rotate-2 transition"
  >
    <img
      src="/image.jpeg"
      alt="Dhiren Garg"
      className="w-full h-full object-cover object-top"
    />
  </motion.div>

  {/* FLOATING TAGS (cleaner than random icons) */}
  <div className="absolute -top-4 left-2 bg-cyan-400 border-4 border-black px-3 py-1 text-xs font-bold shadow-[3px_3px_0px_black] rotate-[-6deg]">
    💼 Dev
  </div>

  <div className="absolute top-12 -right-6 bg-pink-400 border-4 border-black px-3 py-1 text-xs font-bold shadow-[3px_3px_0px_black] rotate-[6deg]">
    🚀 Designer
  </div>

  <div className="absolute bottom-2 left-12 bg-green-300 border-4 border-black px-3 py-1 text-xs font-bold shadow-[3px_3px_0px_black] rotate-[-4deg]">
    ⚡ Fast Learner
  </div>

</div>

  </div>
</section>

      {/* EXPERIENCE + IMPACT */}
     {/* EXPERIENCE */}
<section id="experience" className="px-8 py-16 border-b-4 border-black">
  <h2 className="text-3xl font-black mb-8">💼 EXPERIENCE</h2>

  <div className="grid md:grid-cols-2 gap-8">

    {/* LEFT COLUMN */}
    <div className="space-y-8">

      {/* SDE */}
      <div className="border-4 border-black bg-white p-6 shadow-[10px_10px_0px_black]">
        <h3 className="font-black text-xl">
          ION Trading — Software Engineer
        </h3>
        <p className="text-sm mb-3">Jul 2024 – Present • Noida</p>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["Java","Spring Boot","Angular","Kafka","PostgreSQL","GenAI","LLM","RAG"].map((t,i)=>(
            <span
              key={i}
              className="border-2 border-black px-2 py-1 bg-yellow-200 font-bold text-xs shadow-[2px_2px_0px_black]"
            >
              {t}
            </span>
          ))}
        </div>

        <ul className="list-disc ml-6 space-y-2 text-sm">
          <li>
            Engineered Java Spring Boot microservices for trade processing and order lifecycle management in a high throughput environment.
          </li>
          <li>
            Resolved memory leaks in Angular components, reducing memory usage by <b>25%</b>.
          </li>
          <li>
            Designed REST APIs improving data consistency and reducing integration failures.
          </li>
          <li>
            Automated CI/CD branch workflows eliminating manual merge overhead.
          </li>
          <li>
            Led adoption of Generative AI and integrated LLM-powered features into production systems.
          </li>
          <li>
            Designed and delivered scalable systems with robust end-to-end testing.
          </li>
        </ul>
      </div>

      {/* INTERN */}
      <div className="border-4 border-black bg-white p-6 shadow-[10px_10px_0px_black]">
        <h3 className="font-black text-xl">
          ION Trading — Software Engineering Intern
        </h3>
        <p className="text-sm mb-3">Jan 2024 – Jun 2024 • Noida</p>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["Angular","Nx","Cypress","Jest"].map((t,i)=>(
            <span
              key={i}
              className="border-2 border-black px-2 py-1 bg-pink-200 font-bold text-xs shadow-[2px_2px_0px_black]"
            >
              {t}
            </span>
          ))}
        </div>

        <ul className="list-disc ml-6 space-y-2 text-sm">
          <li>
            Built <b>10+</b> Angular standalone components and improved performance using Nx modularization.
          </li>
          <li>
            Reduced bundle size by <b>30%</b>, improving maintainability.
          </li>
          <li>
            Debugged a long-standing Angular production issue and reported it to the framework team.
          </li>
        </ul>
      </div>

    </div>

    {/* RIGHT COLUMN */}
    <div className="space-y-6">
      <h3 className="font-black text-xl">🔥 MOST IMPACTFUL WORK</h3>

      {/* OWASP */}
      <div className="border-4 border-black bg-pink-200 p-5 shadow-[6px_6px_0px_black]">
        <h4 className="font-bold">Automated Security Testing Framework</h4>
        <p className="text-xs mb-2">
          OWASP ZAP, Selenium, Bash, GitLab CI/CD
        </p>
        <ul className="list-disc ml-5 text-sm space-y-2">
          <li>
            Built a DAST framework fully automating security scans that were previously manual.
          </li>
          <li>
            Implemented multi-step authentication workflows for protected routes.
          </li>
          <li>
            Integrated passive and active scans into CI/CD with auto-generated reports.
          </li>
          <li>
            Connected ZAP findings with SonarQube to block high-severity deployments.
          </li>
        </ul>
      </div>

      {/* EDA */}
      <div className="border-4 border-black bg-cyan-200 p-5 shadow-[6px_6px_0px_black]">
        <h4 className="font-bold">Event-Driven Architecture</h4>
        <p className="text-sm mt-2">
          Enabled asynchronous real-time workflows and decoupled <b>3+ interdependent services</b>
          using event-driven architecture and microservices.
        </p>
      </div>

      {/* CYPRESS */}
      <div className="border-4 border-black bg-yellow-200 p-5 shadow-[6px_6px_0px_black]">
        <h4 className="font-bold">Cypress Automation Framework</h4>
        <p className="text-sm mt-2">
          Built E2E automation with <b>25+ test cases</b>, saving <b>144+ developer hours annually</b>
          by replacing manual pre-release verification.
        </p>
      </div>
    </div>

  </div>
</section>

      {/* PROJECTS */}
     <section id="projects" className="px-8 py-16 border-b-4 border-black">
        <h2 className="text-3xl font-black mb-4">🚀 PROJECTS</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04, rotate: -1 }}
              className="relative border-4 border-black p-6 bg-white shadow-[8px_8px_0px_black] cursor-pointer overflow-hidden"
            >

              {/* HOVER OVERLAY */}
              <div
                onClick={() => window.open(p.link)}
                className="absolute inset-0 bg-black text-white opacity-0 hover:opacity-95 transition flex items-center justify-center font-bold"
              >
                🚀 VIEW PROJECT
              </div>

              <h3 className="font-black text-lg">{p.name}</h3>

              {/* TECH TAGS */}
              <div className="flex flex-wrap gap-2 mt-3 mb-3">
                {p.tech.split(",").map((t, idx) => (
                  <span key={idx} className="border-2 border-black px-2 py-1 bg-pink-200 text-xs font-bold shadow-[2px_2px_0px_black]">
                    {t.trim()}
                  </span>
                ))}
              </div>

              {/* BULLETS */}
              <ul className="text-sm list-disc ml-5 space-y-1">
                {p.points.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>

            </motion.div>
          ))}
        </div>
      </section>

      {/* SKILLS (LIKE IMAGE) */}
      <section id="skills" className="px-8 py-16 border-b-4 border-black">
        <div className="inline-block bg-yellow-300 border-4 border-black px-5 py-2 font-black shadow-[6px_6px_0px_black] rotate-[-2deg]">
          SKILLS
        </div>

        <div className="flex flex-wrap gap-4 mt-10">
          {[
            "Java","Spring Boot","Angular","C++","Microservices","RAG","Vector database","GenAI","Kafka","PostgreSQL","MongoDB","C++","CI/CD","Testing","OWASP","SonarQube","HTML 5","LLM"
          ].map((skill,i)=>(
            <div key={i} className={`border-4 border-black px-4 py-2 font-bold shadow-[4px_4px_0px_black] ${i%3===0?"bg-pink-300":i%3===1?"bg-cyan-300":"bg-yellow-200"}`}>
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* RESUME */}

      {/* 🔥 CONTACT + RESUME COMBINED */}
      <section id="contact" className="px-8 py-20 border-b-4 border-black bg-[#f3f3f3]">

        <h2 className="text-3xl font-black mb-6">📬 LET'S CONNECT</h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div
            onClick={() => window.open("https://www.linkedin.com/in/dhiren-garg/")}
            className="bg-cyan-400 border-4 border-black p-5 shadow-[6px_6px_0px_black] text-center cursor-pointer"
          >
            💼
            <h3 className="font-bold mt-2">LinkedIn</h3>
          </div>

          <div
            onClick={() => window.open("https://github.com/gargdhiren")}
            className="bg-purple-300 border-4 border-black p-5 shadow-[6px_6px_0px_black] text-center cursor-pointer"
          >
            💻
            <h3 className="font-bold mt-2">GitHub</h3>
          </div>

          <div className="bg-pink-400 border-4 border-black p-5 shadow-[6px_6px_0px_black] text-center">
            📧
            <h3 className="font-bold mt-2">1234dhirengarg@gmail.com</h3>
          </div>

          <div
            className="bg-yellow-300 border-4 border-black p-5 shadow-[6px_6px_0px_black] text-center cursor-pointer"
          >
            📱
            <h3 className="font-bold mt-2">+91-9646000949</h3>
          </div>

        </div>
      </section>

    </div>
  );
}