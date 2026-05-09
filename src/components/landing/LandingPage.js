"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Shield, Zap, BarChart2, Users, TrendingUp, Star, ChevronRight, Play } from "lucide-react";

// ── Constants ──────────────────────────────────────────────────────────────
const STATS = [
  { value: "50K+", label: "Active Players", color: "#a855f7" },
  { value: "2M+",  label: "Matches Tracked", color: "#22d3ee" },
  { value: "6",    label: "Games Supported", color: "#f97316" },
  { value: "34%",  label: "Avg Improvement", color: "#4ade80" },
];

const GAMES = [
  {
    name: "BGMI",
    logo: "/images/bgmi-logo.png",
    color: "#f9c416e7",
  },
  {
    name: "Call of Duty",
    logo: "/images/cod-logo.png",
    color: "#22c55e",
  },
  {
    name: "Valorant",
    logo: "/images/valorant-logo.png",
    color: "#ef4444",
  },
  {
    name: "CS2",
    logo: "/images/cs2-logo.png",
    color: "#3b82f6",
  },
  {
    name: "Fortnite",
    logo: "/images/fortnite-logo.png",
    color: "#a855f7",
  },
  {
    name: "Apex Legends",
    logo: "/images/apex-logo.png",
    color: "#f43f5e",
  },
];

const FEATURES = [
  { icon: BarChart2, title: "Advanced Analytics",    desc: "K/D trends, radar charts, consistency scores, and deep performance breakdowns.", color: "#a855f7" },
  { icon: Zap,       title: "AI Coaching",           desc: "Smart rule-based tips that identify weaknesses and improve your playstyle.",   color: "#22d3ee" },
  { icon: Shield,    title: "Multi-Game Support",    desc: "BGMI, Valorant, CS2, COD, Fortnite, and Apex — all in one platform.",          color: "#f97316" },
  { icon: Users,     title: "Global Leaderboard",    desc: "Compete worldwide. Earn Diamond/Platinum tiers and showcase your badges.",      color: "#ef4444" },
  { icon: TrendingUp,title: "Performance Trends",    desc: "Weekly and monthly tracking with animated real-time charts.",                  color: "#4ade80" },
  { icon: Star,      title: "Export Reports",        desc: "Download professional PDF analytics with match history and charts.",           color: "#fbbf24" },
];

const TRUST = [
  { icon: "🔒", label: "Secure & Private" },
  { icon: "⚡", label: "Real-time Analytics" },
  { icon: "🤖", label: "AI-Powered Insights" },
];

// ── Particle component ─────────────────────────────────────────────────────
function Particles({ count = 40 }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      color: ["#a855f7", "#22d3ee", "#ef4444", "#f97316", "#4ade80"][Math.floor(Math.random() * 5)],
    }))
  ).current;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ── Animated grid lines ────────────────────────────────────────────────────
function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// ── Counter animation ──────────────────────────────────────────────────────
function AnimatedStat({ value, label, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
      style={{ boxShadow: `0 0 30px ${color}20, inset 0 0 30px ${color}08` }}
    >
      <div className="absolute inset-0 rounded-2xl" style={{ background: `linear-gradient(135deg, ${color}15, transparent)` }} />
      <p className="relative text-3xl font-black [font-family:var(--font-poppins)]" style={{ color }}>
        {value}
      </p>
      <p className="relative mt-1 text-xs text-slate-400">{label}</p>
    </motion.div>
  );
}

// ── Main Landing Page ──────────────────────────────────────────────────────
export default function LandingPage({ onGetStarted }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [dims, setDims] = useState({ w: 1536, h: 800 });
  useEffect(() => {
    setDims({ w: window.innerWidth, h: window.innerHeight });
    const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const bgX = useTransform(mouseX, [0, dims.w], [-15, 15]);
  const bgY = useTransform(mouseY, [0, dims.h], [-10, 10]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050508]" onMouseMove={handleMouseMove}>

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[120vh] flex-col overflow-hidden">

        {/* Background image with parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ x: bgX, y: bgY, scale: 1.02 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center md:bg-contain bg-no-repeat"
            style={{ backgroundImage: "url('/images/hero-bg.png')" }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/85 via-[#050508]/50 to-[#050508]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/40 via-transparent to-[#050508]" />
        </motion.div>

        {/* Neon glow halos for characters */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Left character glow (soldier - blue) */}
          <div className="absolute left-[-5%] top-1/2 h-[700px] w-[400px] -translate-y-1/2 rounded-full bg-blue-500/10 blur-[80px]" />
          <div className="absolute left-[8%] top-1/2 h-[500px] w-[250px] -translate-y-1/2 rounded-full bg-cyan-400/8 blur-[60px]" />
          {/* Right character glow (female - red/pink) */}
          <div className="absolute right-[-5%] top-1/2 h-[700px] w-[400px] -translate-y-1/2 rounded-full bg-red-500/15 blur-[80px]" />
          <div className="absolute right-[8%] top-1/2 h-[500px] w-[250px] -translate-y-1/2 rounded-full bg-pink-500/10 blur-[60px]" />
          {/* Center purple ambient */}
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[100px]" />
        </div>

        {/* Grid + Particles */}
        <GridLines />
        <Particles count={50} />

        {/* ── NAV ──────────────────────────────────────────────────────── */}
        <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <img
              src="/logo.png"
              alt="StatForge"
              className="h-10 w-10 rounded-xl"
            />
            <span className="text-xl font-bold [font-family:var(--font-poppins)] bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              StatForge
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(236,72,153,0.25)",
              }}
              whileTap={{ scale: 0.96 }}
              onClick={onGetStarted}
              className="
                hidden
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-5
                py-2
                text-sm
                font-semibold
                text-slate-300
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-pink-500/40
                hover:bg-pink-500/10
                hover:text-white
                sm:block
              "
            >
              Sign In
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={onGetStarted}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-sm font-bold text-white shadow-lg transition-all duration-300"
              style={{ boxShadow: "0 0 20px rgba(34,211,238,0.45)" }}
            >
              Get Started
            </motion.button>
</motion.div>
        </nav>

        {/* ── HERO CONTENT ─────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-4 text-center md:px-12">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-5 py-2 text-xs font-semibold text-purple-300 backdrop-blur-sm"
            style={{ boxShadow: "0 0 20px rgba(168,85,247,0.15)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
            </span>
            Production-Grade Esports Analytics Platform
          </motion.div>

          {/* Heading */}
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto max-w-6xl text-center text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
          >
            {/* First line */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                Dominate
              </span>

              <span className="text-white/90">
                the
              </span>

              <span
                className="bg-gradient-to-r from-pink-500 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(236,72,153,0.45))",
                }}
              >
                Game
              </span>
            </div>

            {/* Second line */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <span className="text-white/90">
                with
              </span>

              <span
                className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(34,211,238,0.45))",
                }}
              >
                Data-Driven
              </span>
            </div>

            {/* Third line */}
            <div className="mt-4">
              <span className="relative inline-block text-white">
                Insights

                <span className="absolute -bottom-3 left-0 h-1 w-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 opacity-80 blur-sm" />
              </span>
            </div>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mx-auto mt-6 max-w-2xl text-base text-slate-400 md:text-lg"
          >
            Track every match, analyze your performance, and get AI-powered coaching to
            reach your peak competitive potential across all major esports titles.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 45px rgba(34,211,238,0.55)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={onGetStarted}
              className="
                rounded-2xl
                bg-gradient-to-r
                from-cyan-400
                via-sky-500
                to-blue-600
                px-8
                py-4
                text-base
                font-bold
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:from-cyan-300
                hover:via-sky-400
                hover:to-blue-500
              "
              style={{
                boxShadow: "0 0 30px rgba(34,211,238,0.35)",
              }}
            >
              Start Tracking Free
            </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(34,211,238,0.4)",
                  background: "rgba(34,211,238,0.08)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={onGetStarted}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-cyan-400/20
                  bg-white/5
                  px-8
                  py-4
                  text-base
                  font-semibold
                  text-slate-100
                  backdrop-blur-sm
                  transition-all
                  duration-300
                "
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/10">
                  <Play size={10} className="ml-0.5 text-cyan-300" />
                </span>

                View Dashboard
              </motion.button>
            
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6"
          >
            {TRUST.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-xs text-slate-500">
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mx-auto mt-14 grid w-full max-w-2xl grid-cols-2 gap-4 md:grid-cols-4"
          >
            {STATS.map((s, i) => (
              <AnimatedStat key={s.label} {...s} delay={0.7 + i * 0.1} />
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative z-10 mb-6 flex justify-center"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-0.5 rounded-full bg-purple-400"
            />
          </div>
        </motion.div>
      </section>

      {/* ── GAMES SECTION ───────────────────────────────────────────────────── */}
      <section className="relative z-10 overflow-hidden px-6 py-20 md:px-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">Supported Titles</p>
          <h2 className="text-3xl font-bold [font-family:var(--font-poppins)] text-white md:text-4xl">
            Every Game, One Platform
          </h2>
          <p className="mt-3 text-slate-500">Track performance across all major competitive titles</p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {GAMES.map((g, i) => (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.08 }}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm transition-all"
                style={{ "--gcolor": g.color }}
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at center, ${g.color}20, transparent 70%)` }}
                />
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: `0 0 25px ${g.color}40, inset 0 0 20px ${g.color}10`, border: `1px solid ${g.color}40` }}
                />
                <span className="relative text-2xl">{g.emoji}</span>
                <p className="relative mt-2 text-sm font-semibold text-slate-300 transition-colors group-hover:text-white">
                  {g.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES SECTION ────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">Features</p>
            <h2 className="text-3xl font-bold [font-family:var(--font-poppins)] text-white md:text-5xl">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Win</span>
            </h2>
            <p className="mt-4 text-slate-500">A complete analytics ecosystem built for serious competitive gamers.</p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/3 p-6 backdrop-blur-sm transition-all"
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${f.color}12, transparent 60%)` }}
                />
                <div
                  className="absolute inset-0 rounded-2xl border opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ borderColor: `${f.color}30`, boxShadow: `inset 0 0 30px ${f.color}08` }}
                />
                <div
                  className="relative mb-5 inline-flex h-13 w-13 items-center justify-center rounded-xl p-3"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}35`, boxShadow: `0 0 15px ${f.color}20` }}
                >
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="relative font-bold text-white">{f.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                <div
                  className="relative mt-4 flex items-center gap-1 text-xs font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ color: f.color }}
                >
                  Learn more <ChevronRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-24 md:px-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/8 blur-[120px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-12 text-center backdrop-blur-sm"
          style={{ boxShadow: "0 0 80px rgba(168,85,247,0.15), inset 0 0 80px rgba(168,85,247,0.05)" }}
        >
          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl" style={{
            background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }} />
          <Particles count={15} />

          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mx-auto mb-6 text-5xl"
          >
            ⚡
          </motion.div>
          <h2 className="text-3xl font-black [font-family:var(--font-poppins)] text-white md:text-4xl">
            Ready to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Dominate
            </span>
            ?
          </h2>
          <p className="mt-4 text-slate-400">
            Join 50,000+ competitive players using StatForge to reach the next level.
          </p>
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 50px rgba(168,85,247,0.7)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onGetStarted}
            className="relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-10 py-4 text-base font-bold text-white"
            style={{ backgroundSize: "200%", boxShadow: "0 0 30px rgba(168,85,247,0.5)" }}
          >
            ⚡ Get Started Free — It&apos;s Free
          </motion.button>
          <p className="mt-4 text-xs text-slate-600">No credit card required · Cancel anytime</p>
        </motion.div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-8 text-center text-xs text-slate-700">
        <p>© 2025 StatForge · Built with Next.js, Firebase &amp; Recharts · Premium Esports Analytics</p>
      </footer>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
