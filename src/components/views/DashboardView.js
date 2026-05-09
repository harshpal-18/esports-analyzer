"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid,
  Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Minus, Flame, Zap, Target, Shield } from "lucide-react";
import { getGameConfig } from "@/games/gameConfig";
import { useGameMetrics } from "@/hooks/useGameMetrics";
import { useMounted } from "@/hooks/useMounted";
import { usePerformanceStore } from "@/hooks/usePerformanceStore";

function StatCard({ label, value, sub, icon: Icon, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card neon-hover p-4 md:p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
          <p className="mt-1.5 text-3xl font-bold [font-family:var(--font-poppins)]" style={{ color }}>
            {value}
          </p>
          {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
        </div>
        {Icon && (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
            style={{ background: `${color}18`, border: `1px solid ${color}33` }}
          >
            <Icon size={18} style={{ color }} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-purple-500/20 bg-e-panel/95 p-3 shadow-xl backdrop-blur-xl text-xs">
      <p className="mb-1.5 font-semibold text-slate-300">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }} className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toFixed(2) : p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function DashboardView() {
  const { summary, trend, recentMatches, tier, badges, trendDirection } = useGameMetrics();
  const { loadingMatches, selectedGame, user } = usePerformanceStore();
  const mounted = useMounted();
  const gameConfig = getGameConfig(selectedGame);

  const TrendIcon = trendDirection === "improving" ? TrendingUp : trendDirection === "declining" ? TrendingDown : Minus;
  const trendColor = trendDirection === "improving" ? "#4ade80" : trendDirection === "declining" ? "#f87171" : "#94a3b8";

  return (
    <section className="space-y-5">
      {/* Hero banner */}
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative overflow-hidden rounded-2xl p-6"
        style={{ borderColor: `${gameConfig.color}22` }}
      >
        <Image
          src={gameConfig.banner}
          alt={`${gameConfig.name} banner`}
          fill
          className="object-cover opacity-15"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.85) 40%, ${gameConfig.color}15 100%)`,
          }}
        />
        <div className="relative z-10 flex flex-wrap items-center gap-4">
          <div className="relative">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
              style={{ background: `${gameConfig.color}22`, border: `1.5px solid ${gameConfig.color}44` }}
            >
              🎮
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Active Game
            </p>
            <h3 className="text-2xl font-bold [font-family:var(--font-poppins)]" style={{ color: gameConfig.color }}>
              {gameConfig.name}
            </h3>
            <p className="text-sm text-slate-400">{gameConfig.description}</p>
          </div>
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            {/* Tier badge */}
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold"
              style={{ background: `${tier?.color}18`, border: `1px solid ${tier?.color}44`, color: tier?.color }}
            >
              {tier?.emoji} {tier?.label}
            </div>
            {/* Streak */}
            {summary.currentStreak > 1 && (
              <div
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold ${
                  summary.streakType === "win"
                    ? "bg-green-500/15 border border-green-500/30 text-green-400"
                    : "bg-red-500/15 border border-red-500/30 text-red-400"
                }`}
              >
                <Flame size={14} />
                {summary.currentStreak}{summary.streakType === "win" ? "W" : "L"} Streak
              </div>
            )}
          </div>
        </div>

        {/* Badges row */}
        {badges.length > 0 && (
          <div className="relative z-10 mt-4 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b.label}
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: `${b.color}18`, border: `1px solid ${b.color}44`, color: b.color }}
              >
                {b.emoji} {b.label}
              </span>
            ))}
          </div>
        )}
      </motion.article>

      {/* Stat grid */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Matches"
          value={summary.totalMatches}
          sub={`${summary.wins}W · ${summary.losses}L`}
          icon={Target}
          color={gameConfig.color}
          delay={0.05}
        />
        <StatCard
          label="Avg K/D Ratio"
          value={summary.averageKd}
          sub={summary.averageKd >= 1.5 ? "Above average 🔥" : "Keep grinding 💪"}
          icon={Zap}
          color="#a855f7"
          delay={0.1}
        />
        <StatCard
          label="Win Rate"
          value={`${summary.winRate}%`}
          sub={summary.winRate >= 50 ? "Positive ratio ✅" : "Needs improvement"}
          icon={TrendIcon}
          color={trendColor}
          delay={0.15}
        />
        <StatCard
          label="Performance Score"
          value={summary.performanceScore}
          sub={`${tier?.emoji} ${tier?.label} Tier`}
          icon={Shield}
          color={tier?.color || "#a855f7"}
          delay={0.2}
        />
      </div>

      {/* Advanced metrics */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Consistency", value: `${summary.consistencyScore}%`, color: "#22d3ee" },
          { label: "Aggression Index", value: `${summary.aggressionIndex}%`, color: "#f97316" },
          { label: "Survival Efficiency", value: `${summary.survivalEfficiency}%`, color: "#4ade80" },
          { label: "Headshot Efficiency", value: `${summary.headshotEfficiency}%`, color: "#ef4444" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.05, duration: 0.4 }}
            className="glass-card p-4"
          >
            <p className="text-xs text-slate-500 uppercase tracking-wider">{m.label}</p>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-2xl font-bold [font-family:var(--font-poppins)]" style={{ color: m.color }}>
                {m.value}
              </p>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: m.value }}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: m.color, boxShadow: `0 0 8px ${m.color}60` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {loadingMatches && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="h-3 w-3 rounded-full border border-purple-500/40 border-t-purple-400 animate-spin" />
          Syncing live match data...
        </div>
      )}

      {/* Charts */}
      <div className="grid gap-4 xl:grid-cols-2">
        {/* Performance trend */}
        <motion.article
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-white">Performance Over Time</h4>
              <p className="text-xs text-slate-500 mt-0.5">Score trend across matches</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: trendColor }}>
              <TrendIcon size={14} />
              {trendDirection}
            </div>
          </div>
          <div className="h-[240px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" stroke="#475569" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#475569" tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="score" name="Score" stroke="#a855f7" strokeWidth={2.5} fill="url(#scoreGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="skeleton h-full rounded-xl" />
            )}
          </div>
        </motion.article>

        {/* K/D Trend */}
        <motion.article
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card p-5"
        >
          <div className="mb-4">
            <h4 className="font-semibold text-white">K/D Progression</h4>
            <p className="text-xs text-slate-500 mt-0.5">Kill/Death ratio per match</p>
          </div>
          <div className="h-[240px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="kdGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={gameConfig.color} stopOpacity={1} />
                      <stop offset="100%" stopColor={gameConfig.color} stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" stroke="#475569" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#475569" tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="kd" name="K/D" fill="url(#kdGrad)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="skeleton h-full rounded-xl" />
            )}
          </div>
        </motion.article>
      </div>

      {/* Recent matches */}
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-5"
      >
        <h4 className="font-semibold text-white">Recent Matches</h4>
        <div className="mt-3 space-y-2">
          {recentMatches.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 py-8 text-center">
              <p className="text-2xl">🎮</p>
              <p className="mt-2 text-sm text-slate-400">No matches yet — add your first match above!</p>
            </div>
          ) : (
            recentMatches.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between rounded-xl bg-white/3 px-4 py-3 text-sm transition-all hover:bg-white/6"
              >
                <span className="text-slate-400 text-xs w-20 shrink-0">{m.date?.slice(5)}</span>
                <span
                  className="rounded-md px-2 py-0.5 text-xs font-semibold shrink-0"
                  style={{
                    background: getGameConfig(m.game).color + "22",
                    color: getGameConfig(m.game).color,
                  }}
                >
                  {m.game}
                </span>
                <span className="text-slate-300">
                  K/D: <span className="font-semibold text-white">{Number(((m.kills || 0) / Math.max(m.deaths || m.losses || 1, 1)).toFixed(2))}</span>
                </span>
                <span className="text-slate-400 text-xs">
                  {m.wins > 0 ? <span className="text-green-400 font-semibold">Win ✓</span> : <span className="text-red-400">Loss ✗</span>}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </motion.article>
    </section>
  );
}