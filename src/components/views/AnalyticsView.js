"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Cell, Pie, PieChart, Radar, RadarChart, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Area, AreaChart,
} from "recharts";
import { Download } from "lucide-react";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { GAME_CONFIGS } from "@/games/gameConfig";
import { useGameMetrics } from "@/hooks/useGameMetrics";
import { useMounted } from "@/hooks/useMounted";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";

const COLORS = ["#a855f7", "#ef4444", "#f97316", "#22d3ee", "#4ade80", "#fbbf24"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-purple-500/20 bg-e-panel/95 p-3 text-xs backdrop-blur-xl shadow-xl">
      <p className="mb-1 font-semibold text-slate-300">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.fill || p.color }}>
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toFixed(2) : p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function AnalyticsView() {
  const { scoped, summary, trend, monthlyTrend, radarData } = useGameMetrics();
  const { selectedGame } = usePerformanceStore();
  const mounted = useMounted();
  const config = GAME_CONFIGS[selectedGame];
  const exportRef = useRef(null);

  const pieData = config.stats.map((stat, idx) => ({
    name: config.labels[stat],
    value: Math.max(scoped.reduce((acc, m) => acc + Number(m[stat] || 0), 0) || 1, 0.1),
  }));

  const exportPdf = async () => {
    if (!exportRef.current) return;
    const canvas = await html2canvas(exportRef.current, { backgroundColor: "#07060b", scale: 1.5 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    // Header
    pdf.setFillColor(7, 6, 11);
    pdf.rect(0, 0, 210, 297, "F");
    pdf.setTextColor(168, 85, 247);
    pdf.setFontSize(22);
    pdf.text("StatForge Analytics Report", 14, 20);
    pdf.setTextColor(148, 163, 184);
    pdf.setFontSize(10);
    pdf.text(`Game: ${selectedGame} · Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    pdf.text(`Matches: ${summary.totalMatches} · Win Rate: ${summary.winRate}% · Avg K/D: ${summary.averageKd}`, 14, 34);

    const width = 182;
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 14, 42, width, Math.min(height, 240));
    pdf.save(`statforge-${selectedGame.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.pdf`);
  };

  return (
    <section className="space-y-5" ref={exportRef}>
      {/* Header with export */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h3 className="text-xl font-bold [font-family:var(--font-poppins)] text-white">
            {selectedGame} Analytics
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">Deep performance breakdown and trend analysis</p>
        </div>
        <button
          type="button"
          onClick={exportPdf}
          className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/15 px-4 py-2 text-sm font-semibold text-purple-300 transition-all hover:bg-purple-500/25 hover:shadow-lg"
        >
          <Download size={15} />
          Export PDF
        </button>
      </motion.div>

      {/* Top stats summary */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Total Damage", value: summary.avgDamage, unit: "/match", color: config.color },
          { label: "Avg Kills", value: summary.avgKills, unit: "/match", color: "#a855f7" },
          { label: "Headshot Rate", value: `${summary.avgHeadshot}%`, unit: "", color: "#ef4444" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass-card p-4"
          >
            <p className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</p>
            <p className="mt-1 text-2xl font-bold [font-family:var(--font-poppins)]" style={{ color: s.color }}>
              {s.value}
              <span className="text-sm font-normal text-slate-500 ml-1">{s.unit}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 xl:grid-cols-2">
        {/* Stat Distribution Pie */}
        <motion.article
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card relative overflow-hidden p-5"
        >
          <Image src={config.banner} alt="" fill className="object-cover opacity-8" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40" />
          <div className="relative z-10">
            <h4 className="font-semibold text-white mb-4">Stat Distribution</h4>
            <div className="h-[260px]">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                    >
                      {pieData.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="skeleton h-full rounded-xl" />
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {pieData.map((d, i) => (
                <span key={d.name} className="flex items-center gap-1 text-xs text-slate-400">
                  <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  {d.name}
                </span>
              ))}
            </div>
          </div>
        </motion.article>

        {/* Radar Chart */}
        <motion.article
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <h4 className="font-semibold text-white mb-4">Skill Radar</h4>
          <div className="h-[280px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
                  <PolarGrid stroke="rgba(255,255,255,0.08)" />
                  <PolarAngleAxis dataKey="stat" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#a855f7"
                    fill="#a855f7"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="skeleton h-full rounded-xl" />
            )}
          </div>
        </motion.article>
      </div>

      {/* Monthly trend */}
      {monthlyTrend.length > 1 && (
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card p-5"
        >
          <h4 className="font-semibold text-white mb-4">Monthly Performance Trend</h4>
          <div className="h-[200px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="monthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={config.color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={config.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" stroke="#475569" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#475569" tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="score" name="Score" stroke={config.color} fill="url(#monthGrad)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="skeleton h-full rounded-xl" />
            )}
          </div>
        </motion.article>
      )}

      {/* Strength / Weakness breakdown */}
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <h4 className="font-semibold text-white mb-4">Strength & Weakness Breakdown</h4>
        <div className="space-y-3">
          {config.stats.map((stat) => {
            const avg = scoped.length
              ? scoped.reduce((a, m) => a + Number(m[stat] || 0), 0) / scoped.length
              : 0;
            const maxVal = stat === "damage" ? 800 : stat === "survivalTime" ? 35 : stat.includes("headshot") || stat.includes("accuracy") ? 100 : 20;
            const pct = Math.min((avg / maxVal) * 100, 100);
            const status = pct >= 60 ? { label: "Strong", color: "#4ade80" } : pct >= 30 ? { label: "Average", color: "#fbbf24" } : { label: "Needs Work", color: "#f87171" };

            return (
              <div key={stat} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-300">{config.labels[stat]}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{avg.toFixed(1)}</span>
                    <span className="rounded-md px-2 py-0.5 text-xs font-semibold" style={{ color: status.color, background: status.color + "18" }}>
                      {status.label}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: status.color, boxShadow: `0 0 6px ${status.color}50` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.article>
    </section>
  );
}