import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mandala } from "@/components/Mandala";
import { Navbar } from "@/components/Navbar";
import { ConsultForm } from "@/components/ConsultForm";
import { ArrowRight, Activity, PlaySquare, TrendingUp, Building2, Factory, ShieldCheck, Cpu, Network } from "lucide-react";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      {/* 1. Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
        
        {/* ── BACKGROUND LAYER ── */}
        <div className="absolute inset-0 z-0">
          <Mandala />
          
          {/* Logo Background Watermark - Larger & More Visible */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <img
              src="/elixir-kartr-logo.png"
              alt=""
              aria-hidden="true"
              className="w-[80vw] max-w-[1200px] h-auto object-contain opacity-[0.12] mix-blend-screen"
              style={{
                animation: 'pulse-slow 20s ease-in-out infinite'
              }}
            />
          </div>
          
          {/* Add CSS animation keyframes */}
          <style>{`
            @keyframes pulse-slow {
              0%, 100% { opacity: 0.10; transform: scale(1); }
              50% { opacity: 0.14; transform: scale(1.02); }
            }
          `}</style>

          {/* Subtle vignette/gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(13,13,15,0.8)_100%)] z-10 pointer-events-none" />
        </div>

        {/* ── CONTENT LAYER ── */}
        <div className="container relative z-20 px-6 md:px-12 text-center max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-block mb-4">
              <span className="text-primary text-sm font-semibold tracking-[0.3em] uppercase border-b border-primary pb-2">
                The Gold Standard in AI Engineering
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] tracking-tight drop-shadow-2xl">
              Where Intelligence Becomes <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-[#FFD700]">
                Competitive Advantage
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              Elixir Kartr architects enterprise-grade AI/ML systems that redefine industries. We don't just consult — we engineer the future for the world's most demanding enterprises.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <button
                onClick={() => scrollToSection("consult")}
                className="w-full sm:w-auto px-8 py-4 bg-primary/10 backdrop-blur-md border border-primary/50 text-primary text-sm font-bold uppercase tracking-widest hover:bg-primary/20 hover:border-primary/80 hover:shadow-[0_0_24px_rgba(255,215,0,0.25)] transition-all duration-300 relative group overflow-hidden"
                data-testid="button-hero-consult"
              >
                <span className="relative z-10">Request an In-Person Consult</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </button>
              <button 
                onClick={() => scrollToSection('verticals')}
                className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                Explore Verticals
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="py-36 relative bg-background border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.06)_0%,transparent_60%)] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto text-center mb-24"
          >
            <motion.p variants={fadeInUp} className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-6">
              Our Conviction
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-10">
              The future belongs to those who<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#FFD700] to-primary/60">
                architect it first.
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/55 text-xl font-light leading-relaxed max-w-3xl mx-auto">
              Elixir Kartr was built on a single conviction — that most enterprises don't have an AI problem, they have an execution problem. We bridge that gap with production-grade systems engineered for the real world, not the whiteboard.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5"
          >
            {[
              {
                icon: <TrendingUp size={22} />,
                title: "Relentless Precision",
                body: "Every model we engineer is built to operate at the edge of what is technically possible — no shortcuts, no compromises.",
              },
              {
                icon: <ShieldCheck size={22} />,
                title: "Unshakeable Integrity",
                body: "We tell our partners the truth, even when it is uncomfortable. Strategy without honesty is just expensive noise.",
              },
              {
                icon: <Network size={22} />,
                title: "Systems Thinking",
                body: "We see the whole board. Our solutions account for the ripple effects across every layer of your enterprise.",
              },
              {
                icon: <Cpu size={22} />,
                title: "Fearless Innovation",
                body: "We are not constrained by convention. We pursue the approaches that others have not yet imagined.",
              },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-background p-10 group hover:bg-card transition-colors duration-500 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-700" />
                <div className="text-primary mb-6 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {pillar.icon}
                </div>
                <h4 className="text-white font-serif text-xl mb-4">{pillar.title}</h4>
                <p className="text-white/45 text-sm font-light leading-relaxed group-hover:text-white/65 transition-colors duration-500">
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        

      </section>

      {/* 3. Verticals Section */}
      <section id="verticals" className="py-32 relative bg-[#130a1f] border-y border-white/5 overflow-hidden">
        {/* Animated gold peacock & flute background */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <PeacockBackground />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-4">Our Domains</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white">Vertical Excellence</h3>
            <p className="mt-6 text-white/60 font-light">We deploy specialized, state-of-the-art models tailored to the unique complexities of elite industries.</p>
          </motion.div>

          <VerticalsTabs />
        </div>
      </section>

      {/* 4. Process Section */}
      <section id="process" className="py-32 relative bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-20"
          >
            <h2 className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-4">Methodology</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white">The Elixir Kartr Process</h3>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Discovery", desc: "Rigorous analysis of enterprise architecture, identifying untamed data and structural inefficiencies." },
              { num: "02", title: "Strategy", desc: "Designing bespoke ML pipelines and selecting algorithmic paradigms suited for uncompromising scale." },
              { num: "03", title: "Engineering", desc: "Developing models with ruthless precision, employing advanced reinforcement learning and multimodal NLP." },
              { num: "04", title: "Deploy", desc: "Seamless integration into existing infrastructure, establishing autonomous, self-optimizing systems." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }
                }}
                className="relative p-8 border border-white/10 hover:border-primary/40 bg-card/50 backdrop-blur-sm group transition-all duration-500"
              >
                <div className="text-5xl font-serif text-white/10 group-hover:text-primary/20 transition-colors duration-500 absolute top-4 right-6 pointer-events-none">
                  {step.num}
                </div>
                <h4 className="text-xl font-serif text-white mb-4 relative z-10 mt-8">{step.title}</h4>
                <p className="text-white/60 font-light text-sm leading-relaxed relative z-10">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Founder Strip ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto mt-24 px-6 md:px-0"
        >
          <motion.div
            variants={fadeInUp}
            className="relative border border-white/8 bg-card/30 backdrop-blur-sm p-10 md:p-14 flex flex-col md:flex-row gap-10 md:gap-16 items-start overflow-hidden"
          >
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary/40" />
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary/40" />
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />

            {/* Avatar */}
            <div className="shrink-0 flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-2xl font-serif text-primary font-bold select-none">
                KB
              </div>
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-primary/60">Founder & CEO</span>
            </div>

            {/* Bio */}
            <div className="flex-1">
              <h4 className="text-2xl font-serif text-white mb-1">Kushal Bellani</h4>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-6 font-light">AI Engineer · Mumbai, India</p>
              <p className="text-white/60 font-light text-base leading-relaxed mb-8">
                Before founding Elixir Kartr, Kushal built production AI systems across four industries —
                computer vision pipelines for manufacturing quality inspection, financial ML models for
                fintech, NLP and recommendation engines for edtech, and real-time operational AI for
                restaurant technology. That cross-industry depth is the foundation every Elixir Kartr
                engagement is built on.
              </p>

              {/* Credential pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  "NVIDIA Jetson / DeepStream",
                  "YOLO · Computer Vision",
                  "Financial ML · Time Series",
                  "RAG Pipelines · LLMs",
                  "TensorRT · PyTorch",
                  "Multimodal AI (InternVL, Qwen)",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[11px] font-medium tracking-wide border border-white/10 text-white/45 bg-white/3"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: deployment history */}
            <div className="shrink-0 w-full md:w-48 border-t md:border-t-0 md:border-l border-white/8 pt-8 md:pt-0 md:pl-12 flex flex-col gap-5">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-primary/50 mb-2">Deployed Across</p>
              {[
                { label: "Assert AI", domain: "Computer Vision" },
                { label: "Petpooja", domain: "Restaurant Tech" },
                { label: "Thakkar & Co.", domain: "Fintech" },
                { label: "Embibe", domain: "Edtech · NLP" },
              ].map((co) => (
                <div key={co.label}>
                  <p className="text-white/70 text-sm font-medium">{co.label}</p>
                  <p className="text-white/30 text-xs font-light">{co.domain}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 5. CTA Section */}
      <section id="consult" className="py-32 relative bg-[#130a1f] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-4">Private Consultations</h2>
              <h3 className="text-4xl md:text-6xl font-serif text-white mb-6">
                Ready to Transform Your Enterprise?
              </h3>
              <p className="text-xl text-white/60 font-light max-w-2xl mx-auto mb-6">
                We move conversations from screens to boardrooms. Submit your details below and the Elixir Kartr team will personally reach out within 24 hours to schedule your private strategy session.
              </p>
              <div className="inline-flex items-center gap-2 px-5 py-2 border border-primary/25 bg-primary/8 text-primary/70 text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
                Accepting founding enterprise partners — 3 engagements remaining in 2026
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative border border-white/10 bg-card/40 backdrop-blur-xl shadow-2xl p-8 md:p-12"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <ConsultForm />
            </motion.div>

            <motion.p variants={fadeInUp} className="text-center mt-8 text-white/30 text-xs tracking-widest uppercase">
              Or email us directly at&nbsp;
              <a
                href="mailto:elixirkartr.strategy@zohomail.in"
                className="text-primary/60 hover:text-primary transition-colors"
              >
                elixirkartr.strategy@zohomail.in
              </a>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-background border-t border-white/10 py-12">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <span>Elixir</span>
            <span className="text-primary">Kartr</span>
          </div>
          <div className="flex items-center gap-8">
            <a
              href="https://kushal-bellani-18.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-primary/70 transition-colors tracking-widest uppercase font-light"
            >
              Portfolio
            </a>
            <a
              href="https://avm-real-estate.streamlit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-primary/70 transition-colors tracking-widest uppercase font-light"
            >
              Live Demo
            </a>
          </div>
          <div className="text-sm text-white/40 font-light uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Elixir Kartr. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

const DUST_PARTICLES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  size: 1.5 + Math.random() * 3.5,
  startX: -5 + Math.random() * 30,
  startY: 10 + Math.random() * 80,
  endX: 60 + Math.random() * 50,
  endY: -10 + Math.random() * 120,
  duration: 6 + Math.random() * 10,
  delay: Math.random() * 12,
  opacity: 0.18 + Math.random() * 0.45,
  blur: Math.random() > 0.6 ? 1 : 0,
}));

function PeacockBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.08) translate(0%, 0%); }
          50%  { transform: scale(1.14) translate(-1.5%, -1%); }
          100% { transform: scale(1.08) translate(0%, 0%); }
        }
        @keyframes dustDrift {
          0%   { opacity: 0; transform: translate(var(--sx), var(--sy)) scale(0.6); }
          15%  { opacity: var(--op); }
          80%  { opacity: var(--op); }
          100% { opacity: 0; transform: translate(var(--ex), var(--ey)) scale(1.2); }
        }
        @keyframes smokeRise {
          0%   { opacity: 0;    transform: translateY(0px) scaleX(1); }
          20%  { opacity: 0.18; }
          80%  { opacity: 0.10; }
          100% { opacity: 0;    transform: translateY(-60px) scaleX(1.3); }
        }
        .peacock-img {
          animation: kenBurns 18s ease-in-out infinite;
          transform-origin: center center;
        }
        .dust { animation: dustDrift var(--dur) ease-in-out var(--delay) infinite; }
        .smoke { animation: smokeRise var(--sdur) ease-in-out var(--sdelay) infinite; }
      `}</style>

      {/* Photo — full bleed, slow Ken Burns pan */}
      <img
        src="/peacock-bg.png"
        alt=""
        className="peacock-img absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0.28 }}
      />

      {/* Deep dark vignette — keep text readable */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 60% 55%, rgba(10,8,4,0.35) 0%, rgba(10,10,12,0.78) 55%, rgba(10,10,12,0.95) 100%)"
      }}/>

      {/* Left-side gold warmth bloom */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 20% 70%, rgba(255,215,0,0.10) 0%, transparent 55%)"
      }}/>

      {/* Animated gold dust particles drifting right */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {DUST_PARTICLES.map((p) => (
          <circle
            key={p.id}
            className="dust"
            cx="0" cy="0" r={p.size * 0.3}
            fill={p.id % 4 === 0 ? "#fff8dc" : p.id % 3 === 0 ? "#ffd700" : "#e8c04a"}
            style={{
              "--sx": `${p.startX}vw`,
              "--sy": `${p.startY}vh`,
              "--ex": `${p.endX}vw`,
              "--ey": `${p.endY}vh`,
              "--op": p.opacity,
              "--dur": `${p.duration}s`,
              "--delay": `${p.delay}s`,
              filter: p.blur ? `blur(${p.blur}px)` : undefined,
            } as React.CSSProperties}
          />
        ))}

        {/* Larger glint specks */}
        {[
          { x: 15, y: 45, r: 0.8, d: 9, dl: 1 },
          { x: 38, y: 22, r: 0.6, d: 11, dl: 3 },
          { x: 62, y: 68, r: 1.0, d: 8,  dl: 5 },
          { x: 80, y: 35, r: 0.7, d: 13, dl: 0 },
          { x: 50, y: 80, r: 0.9, d: 10, dl: 2 },
        ].map((g, i) => (
          <circle key={`glint-${i}`} cx={g.x} cy={g.y} r={g.r} fill="#fff8dc"
            style={{
              "--sx": `${g.x - 5}vw`, "--sy": `${g.y}vh`,
              "--ex": `${g.x + 20}vw`, "--ey": `${g.y - 15}vh`,
              "--op": 0.7, "--dur": `${g.d}s`, "--delay": `${g.dl}s`,
            } as React.CSSProperties}
            className="dust"
          />
        ))}
      </svg>

      {/* Wisps of gold smoke — wide blurred ellipses drifting up */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[
          { cx: 25, cy: 85, rx: 18, ry: 5, d: 12, dl: 0 },
          { cx: 45, cy: 90, rx: 22, ry: 4, d: 15, dl: 3 },
          { cx: 65, cy: 80, rx: 14, ry: 3, d: 11, dl: 6 },
          { cx: 10, cy: 95, rx: 10, ry: 3, d: 14, dl: 2 },
        ].map((s, i) => (
          <ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry}
            fill="#FFD700"
            style={{
              "--sdur": `${s.d}s`,
              "--sdelay": `${s.dl}s`,
              filter: "blur(8px)",
              opacity: 0,
            } as React.CSSProperties}
            className="smoke"
          />
        ))}
      </svg>
    </div>
  );
}

// Decorative SVG patterns per vertical (rendered as background art)
function VerticalArt({ id, accent }: { id: string; accent: string }) {
  const a = accent;
  if (id === "finance") return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="fin-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={a} stopOpacity="0.18" />
          <stop offset="100%" stopColor={a} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Candlestick chart silhouette */}
      {[
        [60,280,60,160,140,200],[120,260,120,180,200,220],[180,300,180,120,260,160],
        [240,260,240,100,320,140],[300,240,300,80,380,120],[360,220,360,140,440,180],
        [420,260,420,100,500,140],[480,200,480,60,560,100],
      ].map(([x,y1,x2,y2,x3,y3], i) => (
        <g key={i} opacity="0.22">
          <line x1={x} y1={y1} x2={x2} y2={y2} stroke={a} strokeWidth="1.5" />
          <rect x={Number(x)-8} y={y2} width="16" height={Math.abs(y1-y2)*0.5} fill={a} rx="1" />
        </g>
      ))}
      {/* Trend line */}
      <polyline points="60,260 120,240 180,200 240,180 300,150 360,160 420,120 480,90 560,70"
        fill="none" stroke={a} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.3" />
      {/* Grid lines */}
      {[80,160,240,320,380].map((y, i) => (
        <line key={i} x1="40" y1={y} x2="580" y2={y} stroke={a} strokeWidth="0.4" opacity="0.12" />
      ))}
      <ellipse cx="480" cy="90" rx="60" ry="60" fill={a} opacity="0.06" />
    </svg>
  );
  if (id === "realestate") return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {/* Skyline */}
      {[
        [60,340,80,180],[160,340,60,240],[240,340,100,140],[360,340,80,200],
        [460,340,60,260],[530,340,50,300],
      ].map(([x,base,w,h],i)=>(
        <g key={i} opacity="0.15">
          <rect x={x} y={base-h} width={w} height={h} fill={a} rx="2"/>
          {/* Windows */}
          {Array.from({length:Math.floor(h/30)}).map((_,j)=>(
            <rect key={j} x={Number(x)+8} y={Number(base)-Number(h)+10+j*28} width="10" height="14" fill={a} opacity="0.5" rx="1"/>
          ))}
        </g>
      ))}
      {/* Ground line */}
      <line x1="20" y1="340" x2="580" y2="340" stroke={a} strokeWidth="0.8" opacity="0.2"/>
      <ellipse cx="300" cy="420" rx="280" ry="50" fill={a} opacity="0.04"/>
    </svg>
  );
  if (id === "manufacturing") return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {/* Gear shapes */}
      {[[160,200,80],[400,180,60],[500,320,40],[80,320,30]].map(([cx,cy,r],i)=>(
        <g key={i} opacity="0.13">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={a} strokeWidth="6"/>
          <circle cx={cx} cy={cy} r={Number(r)*0.5} fill={a} opacity="0.3"/>
          {Array.from({length:8}).map((_,j)=>{
            const ang=j*(Math.PI/4); const ir=Number(r)+6; const or=Number(r)+16;
            return <line key={j} x1={Number(cx)+Math.cos(ang)*ir} y1={Number(cy)+Math.sin(ang)*ir}
              x2={Number(cx)+Math.cos(ang)*or} y2={Number(cy)+Math.sin(ang)*or}
              stroke={a} strokeWidth="8" strokeLinecap="round"/>;
          })}
        </g>
      ))}
      {/* Circuit paths */}
      <polyline points="280,100 320,100 320,160 380,160 380,200"
        fill="none" stroke={a} strokeWidth="1.5" opacity="0.2" strokeDasharray="4 3"/>
      <polyline points="100,280 160,280 160,320 220,320"
        fill="none" stroke={a} strokeWidth="1.5" opacity="0.2" strokeDasharray="4 3"/>
    </svg>
  );
  if (id === "media") return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {/* Film frames */}
      {[40,160,280,400,520].map((x,i)=>(
        <g key={i} opacity="0.14">
          <rect x={x} y="80" width="100" height="260" rx="4" fill="none" stroke={a} strokeWidth="1.5"/>
          {[0,1,2,3].map(j=>(
            <rect key={j} x={x+8} y={100+j*58} width="84" height="42" rx="2" fill={a} opacity="0.12"/>
          ))}
          {[90,130,170,210,250,280,320].map(j=>(
            <rect key={j} x={x} y={j} width="10" height="16" rx="2" fill={a} opacity="0.35"/>
          ))}
        </g>
      ))}
      {/* Play icon watermark */}
      <polygon points="240,180 240,280 340,230" fill={a} opacity="0.07"/>
    </svg>
  );
  // fitness
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {/* EKG / pulse line */}
      <polyline
        points="0,210 80,210 110,210 130,140 155,300 175,100 200,320 220,210 320,210 340,210 360,160 380,260 400,210 600,210"
        fill="none" stroke={a} strokeWidth="2" opacity="0.25" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Concentric circles — human form */}
      {[30,60,90,120].map((r,i)=>(
        <circle key={i} cx="480" cy="200" r={r} fill="none" stroke={a} strokeWidth="0.8" opacity={0.1-i*0.015}/>
      ))}
      {/* Dot nodes */}
      {[[130,140],[155,300],[175,100],[200,320]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="4" fill={a} opacity="0.4"/>
      ))}
    </svg>
  );
}

function VerticalsTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const verticals = [
    {
      id: "finance",
      icon: <TrendingUp size={18} />,
      title: "Finance (Wall Street)",
      accent: "#38bdf8",
      label: "Capital Markets",
      features: [
        { name: "Sentiment Analysis", desc: "Multimodal processing of Audio and Text for instantaneous market reaction." },
        { name: "Market Microstructure", desc: "Advanced Reinforcement Learning (RL) models for high-frequency algorithmic dominance." },
        { name: "Portfolio Optimization", desc: "RL-driven asset management and dynamic rebalancing protocols." }
      ]
    },
    {
      id: "realestate",
      icon: <Building2 size={18} />,
      title: "Real Estate",
      accent: "#fbbf24",
      label: "Property Intelligence",
      features: [
        { name: "Property Valuation", desc: "Combining Computer Vision with Tabular data for unprecedented appraisal accuracy. Live demo available →", link: "https://avm-real-estate.streamlit.app" },
        { name: "Virtual Property Tours", desc: "Video Intelligence seamlessly integrated with 3D AI generation." },
        { name: "Maintenance Prediction", desc: "Computer Vision paired with IoT sensor data for preventative asset care." }
      ]
    },
    {
      id: "manufacturing",
      icon: <Factory size={18} />,
      title: "Manufacturing",
      accent: "#fb923c",
      label: "Industrial AI",
      badge: "Production Deployed",
      features: [
        { name: "Quality Control", desc: "NVIDIA Jetson-based edge vision system for microscopic defect detection at line speed — no cloud dependency." },
        { name: "Predictive Maintenance", desc: "Advanced time-series forecasting for critical machinery uptime." },
        { name: "Strategic Optimization", desc: "RL applied to Production and complex Supply Chain routing." }
      ]
    },
    {
      id: "media",
      icon: <PlaySquare size={18} />,
      title: "Media & Entertainment",
      accent: "#a78bfa",
      label: "Content Intelligence",
      features: [
        { name: "Content Intelligence", desc: "NLP and Multimodal recommendation engines for hyper-personalized delivery." },
        { name: "Video Analysis", desc: "Automated classification, summarization, and scene extraction." },
        { name: "3D Generative AI", desc: "Pioneering Image-to-3D and Text-to-3D synthetic content creation." }
      ]
    },
    {
      id: "fitness",
      icon: <Activity size={18} />,
      title: "Fitness & Sport",
      accent: "#34d399",
      label: "Human Performance",
      features: [
        { name: "Workout Form Analysis", desc: "Video Intelligence for real-time pose and biomechanical keypoint detection." },
        { name: "Personalized Training", desc: "Multimodal prescriptive recommendations utilizing Video, Audio & User Data." },
        { name: "Wearable Analytics", desc: "Sophisticated audio and biometric sensor data processing." }
      ]
    }
  ];

  const active = verticals[activeTab];

  return (
    <div className="flex flex-col lg:flex-row gap-4 max-w-6xl mx-auto">

      {/* ── Left: Tab List ── */}
      <div
        className="w-full lg:w-64 shrink-0 flex flex-col gap-1 p-1.5 rounded-2xl border border-white/8 backdrop-blur-md"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        {verticals.map((v, i) => {
          const isActive = activeTab === i;
          return (
            <motion.button
              key={v.id}
              onClick={() => setActiveTab(i)}
              animate={{ opacity: isActive ? 1 : 0.38, scale: isActive ? 1 : 0.975 }}
              whileHover={!isActive ? { opacity: 0.7, scale: 0.985 } : {}}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center gap-3 px-4 py-3.5 text-left rounded-xl overflow-hidden"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${v.accent}20 0%, rgba(255,255,255,0.05) 100%)`
                  : "transparent",
                border: `1px solid ${isActive ? v.accent + "40" : "rgba(255,255,255,0.06)"}`,
                boxShadow: isActive ? `0 0 20px ${v.accent}18, inset 0 0 10px ${v.accent}08` : "none",
              }}
            >
              {/* Sliding active bar */}
              {isActive && (
                <motion.div
                  layoutId="tabBar"
                  className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                  style={{ background: `linear-gradient(to bottom, ${v.accent}, ${v.accent}55)` }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="ml-1 transition-colors duration-300" style={{ color: isActive ? v.accent : "rgba(255,255,255,0.4)" }}>
                {v.icon}
              </span>
              <span className="text-sm font-medium tracking-wide transition-colors duration-300"
                style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.45)" }}>
                {v.title}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* ── Right: Content Panel — pure glassmorphism ── */}
      <div className="w-full lg:flex-1 min-h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full min-h-[460px] rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)`,
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              border: `1px solid ${active.accent}30`,
              boxShadow: `0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 80px ${active.accent}10`,
            }}
          >
            {/* ── Decorative SVG art layer ── */}
            <div className="absolute inset-0 pointer-events-none select-none">
              <VerticalArt id={active.id} accent={active.accent} />
            </div>

            {/* ── Radial accent glow ── */}
            <motion.div
              key={`glow-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 85% 15%, ${active.accent}22 0%, transparent 55%)`,
              }}
            />

            {/* ── Top shimmer border ── */}
            <div className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: `linear-gradient(to right, transparent 0%, ${active.accent}70 40%, ${active.accent}30 70%, transparent 100%)` }} />

            {/* ── Bottom shimmer border ── */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{ background: `linear-gradient(to right, transparent, ${active.accent}20, transparent)` }} />

            {/* ── Corner accents ── */}
            <span className="absolute top-3 right-3 w-4 h-4 border-t border-r rounded-tr-sm" style={{ borderColor: `${active.accent}50` }} />
            <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l rounded-bl-sm" style={{ borderColor: `${active.accent}50` }} />

            {/* ── Content ── */}
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="opacity-90" style={{ color: active.accent }}>{active.icon}</span>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase"
                    style={{ color: active.accent }}>
                    {active.label}
                  </span>
                  {/* pill */}
                  <span className="ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider border"
                    style={{
                      color: active.accent,
                      borderColor: `${active.accent}35`,
                      background: `${active.accent}12`,
                    }}>
                    {(active as any).badge ?? "AI-Powered"}
                  </span>
                </div>

                <h4 className="text-3xl md:text-4xl font-serif text-white mb-8 leading-tight">
                  {active.title}<br />
                  <span className="text-white/40 text-2xl font-light">Capabilities</span>
                </h4>

                {/* Features */}
                <div className="space-y-6">
                  {active.features.map((feature, i) => (
                    <motion.div
                      key={`${activeTab}-${i}`}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.09 + 0.1, duration: 0.38, ease: [0.16,1,0.3,1] }}
                      className="flex gap-4 group"
                    >
                      {/* Feature index */}
                      <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold mt-0.5"
                        style={{
                          background: `${active.accent}18`,
                          border: `1px solid ${active.accent}35`,
                          color: active.accent,
                        }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h5 className="text-white font-semibold mb-1 text-base tracking-wide">{feature.name}</h5>
                        <p className="text-white/45 font-light text-sm leading-relaxed group-hover:text-white/65 transition-colors duration-300">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer stat strip */}
              <div className="mt-10 pt-6 border-t flex items-center justify-between"
                style={{ borderColor: `${active.accent}18` }}>
                <span className="text-[11px] text-white/25 uppercase tracking-widest font-medium">
                  Elixir Kartr · {active.label}
                </span>
                <div className="flex gap-1.5">
                  {verticals.map((_, idx) => (
                    <motion.div
                      key={idx}
                      animate={{ width: idx === activeTab ? 20 : 6, opacity: idx === activeTab ? 1 : 0.3 }}
                      transition={{ duration: 0.35 }}
                      className="h-1 rounded-full"
                      style={{ background: idx === activeTab ? active.accent : "rgba(255,255,255,0.3)" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}